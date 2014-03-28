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
var i=0;
for(var i=0;i<_1a.length;i++){
this._array.push(_1a[i]);
}
}
this.reset();
};
List.prototype.add=function(_1d){
this._array.push(_1d);
return _1d;
};
List.prototype.addFirst=function(_1e){
this._array.unshift(_1e);
return _1e;
};
List.prototype.get=function(_1f){
var _20=null;
if(this._array[_1f]){
_20=this._array[_1f];
}
return _20;
};
List.prototype.set=function(_21,_22){
this._array[_21]=_22;
};
List.prototype.del=function(_23){
this._array.splice(_23,1);
};
List.prototype.has=function(_24){
var _25=false;
var i=0,e;
while((e=this._array[i++])!==undefined){
if(e==_24){
_25=true;
break;
}
}
return _25;
};
List.prototype.getLength=function(){
return this._array.length;
};
List.prototype.hasEntries=function(){
return this.getLength()>0;
};
List.prototype.hasNext=function(){
var _28=false;
if(this._array!=null){
_28=this._index<this._array.length;
}else{
SystemLogger.getLogger("List").error("Mysterious List#hasNext exception in IE");
}
return _28;
};
List.prototype.getNext=function(){
var _29=null;
if(this.hasNext()){
_29=this._array[this._index++];
}
return _29;
};
List.prototype.getFollowing=function(_2a){
var _2b=null;
var i=0,e=null;
while((e=this._array[i])!=null&&!_2b){
if(e==_2a&&this._array[i+1]){
_2b=this._array[i+1];
}
i++;
}
return _2b;
};
List.prototype.getPreceding=function(_2e){
var _2f=null;
var i=1,e=null;
while((e=this._array[i])!=null&&!_2f){
if(e==_2e&&this._array[i-1]){
_2f=this._array[i-1];
}
i++;
}
return _2f;
};
List.prototype.getIndex=function(_32){
var _33=-1;
if(this._array.indexOf!=null){
_33=this._array.indexOf(_32);
}else{
var _34=0;
this.each(function(e){
var res=true;
if(e==_32){
_33=_34;
res=false;
}
_34++;
return res;
});
}
return _33;
};
List.prototype.reset=function(){
this._index=0;
return this;
};
List.prototype.clear=function(){
this._array=[];
return this.reset();
};
List.prototype.each=function(_37,_38){
this.reset();
var _39,is=true;
while(is!=false&&this.hasNext()){
if(_38===undefined){
_38=null;
}
var _3b=this._index;
var _3c=this.getNext();
is=_37.call(_38,_3c,_3b);
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
List.prototype.merge=function(_3d){
_3d.reset();
while(_3d.hasNext()){
this.add(_3d.getNext());
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
var _42=null;
if(this.has(key)){
_42=this._map[key];
}else{
var cry="Map: Invalid key: "+key;
SystemLogger.getLogger("Map").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _42;
};
Map.prototype.set=function(key,_45){
this._map[key]=_45;
};
Map.prototype.del=function(key){
delete this._map[key];
};
Map.prototype.has=function(key){
return typeof this._map[key]!="undefined";
};
Map.prototype.each=function(_48){
for(var key in this._map){
var _4a=_48(key,this._map[key]);
if(_4a==false){
break;
}
}
};
Map.prototype.hasEntries=function(){
var _4b=false;
for(var key in this._map){
_4b=true;
break;
}
return _4b;
};
Map.prototype.countEntries=function(){
var _4d=0;
for(var key in this._map){
_4d++;
}
return _4d;
};
Map.prototype.toList=function(_4f){
var _50=new List();
for(var key in this._map){
_50.add(_4f?key:this._map[key]);
}
return _50;
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
SystemNodeList.prototype.add=function(_58){
if(_58.getEntityToken){
var _59=_58.getEntityToken();
this._entityTokens.add(_59);
}
};
SystemNodeList.prototype.has=function(_5a){
if(_5a.getEntityToken){
var _5b=_5a.getEntityToken();
return this._entityTokens.has(_5b);
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
_EventBroadcaster.prototype={_broadcasts:{},subscribe:function(_5c,_5d){
if(_5c!=null){
if(!Interfaces.isImplemented(IBroadcastListener,_5d,true)){
throw ("IBroadcastListener not implemented: "+_5c);
}else{
if(!this._broadcasts[_5c]){
this._broadcasts[_5c]=[_5d];
}else{
this._broadcasts[_5c].push(_5d);
}
}
}else{
SystemDebug.stack(arguments);
throw "Undefined broadcast: "+_5d;
}
},unsubscribe:function(_5e,_5f){
if(_5e!=null){
if(Interfaces.isImplemented(IBroadcastListener,_5f)){
var i=0,_61,_62=this._broadcasts[_5e];
if(_62){
while(i<_62.length){
_61=_62[i];
if(_61==_5f){
_62.splice(i,1);
break;
}
i++;
}
}
}
}else{
throw "Undefined broadcast"+_5f;
}
},hasSubscribers:function(_63){
var _64=this._broadcasts[_63];
return _64!=null&&_64.length>0;
},broadcast:function(_65,_66){
if(_65!=null){
var i=0,_68=this._broadcasts[_65];
var _69=[];
if(_68!=null){
var _6a=new List();
while(i<_68.length){
_69.push(_68[i++]);
}
i=0;
while(i<_69.length){
var _6b=_69[i];
if(Application.isDeveloperMode){
_6b.handleBroadcast(_65,_66);
}else{
try{
_6b.handleBroadcast(_65,_66);
}
catch(exception){
_6a.add(_6b);
var cry="Exception in "+new String(_6b)+" on broadcast '"+_65+"':"+new String(exception);
SystemLogger.getLogger("EventBroadcaster").error(cry);
SystemDebug.stack(arguments);
}
}
i++;
}
if(_6a.hasEntries()){
_6a.each(function(_6d){
EventBroadcaster.unsubscribe(_65,_6d);
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
var _6e=navigator.userAgent.toLowerCase();
var _6f=navigator.platform.toLowerCase();
var _70=navigator.appName=="Microsoft Internet Explorer";
var _71=!_70&&typeof document.createTreeWalker!="undefined";
var _72=_71&&(_6e.indexOf("webrunner")>-1||_6e.indexOf("prism")>-1);
var _73=history.pushState!=null;
this.isMozilla=_71;
this.isFirefox=_6e.indexOf("firefox")>-1;
this.isWebKit=_6e.indexOf("webkit")>-1;
this.isExplorer=_70;
this.isExplorer6=this.isExplorer&&(_6e.indexOf("msie 6.0")>-1||_6e.indexOf("msie 6.1")>-1);
this.isExplorer8=this.isExplorer&&window.XDomainRequest!=null;
this.isExplorer11=!!navigator.userAgent.match(/Trident\/7\./);
this.isPrism=_72;
this.isWindows=_6f.indexOf("win")>-1;
this.isVista=this.isWindows&&_6e.indexOf("windows nt 6")>-1;
this.isMac=_6f.indexOf("mac")>-1;
this.isPad=navigator.userAgent.match(/iPad/i)!=null;
this.isOS7=navigator.userAgent.match(/CPU.*OS 7_\d/i)!=null;
var _74=this._getFlashVersion();
this.hasFlash=(_74&&_74>=9);
this.hasTransitions=_73;
this.canvas=!!document.createElement("canvas").getContext;
this.hasSpellcheck=this.isFirefox||this.isExplorer&&document.documentElement.spellcheck;
this.hasXSLTProcessor=this.isMozilla&&!this.isExplorer11;
return this;
}
_Client.prototype={isExplorer:false,isMozilla:false,isPrism:false,hasFlash:false,isWindows:false,isVista:false,hasTransitions:false,_getFlashVersion:function(){
var _75=null;
var _76=10;
try{
if(this.isMozilla==true){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _77=navigator.plugins["Shockwave Flash"];
if(_77){
var _78=_77.description;
if(_78!=null){
_75=_78.charAt(_78.indexOf(".")-1);
}
}
}
}else{
for(var i=2;i<=_76;i++){
try{
new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
_75=i;
}
catch(exception){
continue;
}
}
}
}
catch(exception){
}
return _75;
},qualifies:function(){
var _7a=true;
var _7b=false;
if(this.isMozilla&&!this.isWebKit&&!this.isExplorer11){
_7b=(document.documentElement.mozMatchesSelector===undefined);
}
if(window.opera!=null||_7b||this.isExplorer&&!this.canvas){
_7a=false;
}
return _7a;
},fixUI:function(_7c){
if(Client.isExplorer){
_7c=_7c.replace(/<ui:/g,"<").replace(/<\/ui:/g,"</");
_7c=_7c.replace(/(<(\w+)[^>]*)\/>/g,"$1></$2>");
}
return _7c;
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
function SystemLogger(_7d){
this.identifier=_7d;
}
SystemLogger.prototype.info=function(_7e){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_INFO,_7e);
};
SystemLogger.prototype.debug=function(_7f){
if(_7f=="page"){
alert(arguments.caller.callee);
}
SystemLogger.log(this.identifier,SystemLogger.LEVEL_DEBUG,_7f);
};
SystemLogger.prototype.error=function(_80){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_ERROR,_80);
};
SystemLogger.prototype.warn=function(_81){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_WARN,_81);
};
SystemLogger.prototype.fatal=function(_82){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FATAL,_82);
};
SystemLogger.prototype.fine=function(_83){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FINE,_83);
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
SystemLogger.getLogger=function(_85){
var _86=SystemLogger.loggers[_85];
if(!_86){
_86=new SystemLogger(_85);
SystemLogger.loggers[_85]=_86;
}
return _86;
};
SystemLogger.flushBuffer=function(){
SystemLogger.buffer.reset();
SystemLogger.isFlushing=true;
if(SystemLogger.buffer.hasEntries()){
while(SystemLogger.buffer.hasNext()){
var _87=SystemLogger.buffer.getNext();
this.log(_87.identifier,_87.level,_87.message);
}
}
SystemLogger.isFlushing=false;
};
SystemLogger.bufferLog=function(_88,_89,_8a){
if(Application.isDeveloperMode){
_8a=String(_8a);
SystemLogger.buffer.add({identifier:_88,level:_89,message:_8a});
}
};
SystemLogger.outputLog=function(_8b,_8c,_8d){
_8d=String(_8d);
if(!SystemLogger.isFlushing){
SystemLogger.bufferLog(_8b,_8c,_8d);
}
var win=SystemLogger.outputWindow;
var doc=SystemLogger.outputDocument;
var elm=SystemLogger.outputElement;
var div=doc.createElement("div");
var _92=doc.createElement("span");
var pre=doc.createElement("pre");
if(Client.isExplorer){
_8d=_8d.replace(/</g,"&lt;");
_8d=_8d.replace(/>/g,"&gt;");
_8d=_8d.replace(/\n/g,"<br/>");
_8d=_8d.replace(/\t/g,SystemLogger.TAB_SEQUENCE);
pre.innerHTML=_8d;
}else{
pre.textContent=_8d;
}
div.className=_8c;
_92.innerHTML=_8b;
div.appendChild(_92);
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
SystemTimer.getTimer=function(_95){
return new SystemTimer(_95.toString());
};
function SystemTimer(id){
this.logger=SystemLogger.getLogger("SystemTimer");
this._id=id;
this._time=new Date().getTime();
}
SystemTimer.prototype.reset=function(){
this._time=new Date().getTime();
};
SystemTimer.prototype.report=function(_97){
this.logger.debug(this._id+": "+this.getTime()+(_97?": "+_97:""));
};
SystemTimer.prototype.getTime=function(){
return new Date().getTime()-this._time;
};
function _SystemDebug(){
}
_SystemDebug.prototype={_logger:SystemLogger.getLogger("SystemDebug"),_stacklength:parseInt(5),stack:function(_98,_99){
this._stackMozilla(_98,_99);
},_stackMozilla:function(_9a,_9b){
_9b=_9b?_9b:this._stacklength;
if(Client.isMozilla&&_9a.callee||_9a.caller){
var _9c=Client.isMozilla?_9a.callee.caller:_9a.caller.callee;
var _9d="";
var i=0;
while(_9c!=null&&i++<_9b){
_9d+="\n#"+i+"\n";
_9d+=_9c.toString();
_9c=_9c.caller;
_9d+="\n";
}
this._logger.error(_9d);
}else{
this._logger.error("(Error stack unreachable!)");
}
}};
var SystemDebug=new _SystemDebug;
function _Interfaces(){
var _9f=SystemLogger.getLogger("Interfaces");
this.isImplemented=function(_a0,_a1,_a2){
var _a3=true;
for(var _a4 in _a0){
if(typeof _a1[_a4]==Types.UNDEFINED){
_a3=false;
}else{
if(typeof _a0[_a4]!=typeof _a1[_a4]){
_a3=false;
}
}
if(!_a3){
break;
}
}
if(!_a3){
if(_a2){
_9f.fine(_a1+" invalid. Interface check abandoned at: "+_a4);
}
}
return _a3;
};
}
var Interfaces=new _Interfaces;
function _Types(){
}
_Types.prototype={_logger:SystemLogger.getLogger("Types"),BOOLEAN:"boolean",STRING:"string",NUMBER:"number",FUNCTION:"function",UNDEFINED:"undefined",castFromString:function(_a5){
var _a6=_a5;
if(parseInt(_a6).toString()===_a6){
_a6=parseInt(_a6);
}else{
if(parseFloat(_a6).toString()===_a6){
_a6=parseFloat(_a6);
}else{
if(_a6==="true"||_a6==="false"){
_a6=(_a6==="true");
}
}
}
return _a6;
},isDefined:function(arg){
return typeof arg!=Types.UNDEFINED;
},isFunction:function(arg){
return typeof arg==Types.FUNCTION;
}};
var Types=new _Types();
var MimeTypes={JPG:"image/jpeg",GIF:"image/gif",PNG:"image/png",CSS:"text/css",JAVASCRIPT:"text/javascript",TEXT:"text/plain",HTML:"text/html",XHTML:"applcication/xhtml+xml",FLASH:"application/x-shockwave-flash",QUICKTIME:"video/quicktime",SHOCKWAVE:"application/x-director",WINMEDIA:"application/x-mplayer2",COMPOSITEPAGES:"application/x-composite-page",COMPOSITEFUNCTION:"application/x-composite-function"};
window.SearchTokens=new function(){
var _a9={"MediaFileElementProvider.WebImages":null,"MediaFileElementProvider.EmbeddableMedia":null,"MediaFileElementProvider.WritableFolders":null,"AllFunctionsElementProvider.VisualEditorFunctions":null,"AllFunctionsElementProvider.XsltFunctionCall":null};
this.getToken=function(key){
var _ab=null;
if(this.hasToken(key)){
_ab=_a9[key];
}else{
throw "Unknown search token key: "+key;
}
return _ab;
};
this.hasToken=function(key){
return typeof _a9[key]!=Types.UNDEFINED;
};
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
new List(TreeService.GetSearchTokens(true)).each(function(_ad){
if(SearchTokens.hasToken(_ad.Key)){
_a9[_ad.Key]=_ad.Value;
}else{
alert("SearchTokens need updating!");
}
});
}});
};
window.StringBundle=new function(){
var _ae=SystemLogger.getLogger("StringBundle");
this.UI="Composite.Management";
var _af={};
function resolve(_b0,_b1){
var _b2=new List(StringService.GetLocalisation(_b0));
if(_b2.hasEntries()){
_b2.each(function(_b3){
_b1[_b3.Key]=_b3.Value;
});
}else{
throw "No strings from provider: "+_b0;
}
}
this.getString=function(_b4,_b5){
var _b6=null;
if(window.StringService!=null){
try{
if(_b4=="ui"){
_b4=StringBundle.UI;
}
if(!_af[_b4]){
var _b7=_af[_b4]={};
resolve(_b4,_b7);
}
if(_af[_b4]){
_b6=_af[_b4][_b5];
}
if(!_b6){
throw "No such string: "+_b5;
}
}
catch(exception){
var cry="StringBundle exception in string "+_b4+":"+_b5;
_ae.error(cry);
if(Application.isDeveloperMode){
alert(cry);
}
}
}
return _b6;
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
var _bb=false;
if(this._uniqueKeys[key]){
_bb=true;
}
return _bb;
}};
var KeyMaster=new _KeyMaster();
function _ImageProvider(){
}
_ImageProvider.prototype={_logger:SystemLogger.getLogger("ImageProvider"),SERVICE_URL:"services/Icon/GetIcon.ashx",UI:"Composite.Icons",getImageURL:function(_bc,_bd){
var _be=null;
var url=Constants.APPROOT+"/"+this.SERVICE_URL+"?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
var _c0=_bc.ResourceNamespace;
var _c1=_bc.ResourceName;
_bd=_bd?_bd:"DEFAULT";
if(_c1!=null&&_c0!=null){
_be=url.replace("${name}",_c1).replace("${hash}",_c0).replace("${size}",_bd);
if(_bd=="DEFAULT"){
_be=_be.split("&size=DEFAULT")[0];
}
}else{
throw "Could not compute image URL.";
}
return _be;
},toGrayScaleURL:function(_c2){
var _c3=document.createElement("canvas");
var ctx=_c3.getContext("2d");
var _c2=new Image();
var _c5=_c2.width;
var _c6=_c2.height;
_c3.width=_c5;
_c3.height=_c6;
ctx.drawImage(_c2,0,0);
var _c7=ctx.getImageData(0,0,_c5,_c6);
for(j=0;j<_c7.height;i++){
for(i=0;i<_c7.width;j++){
var _c8=(i*4)*_c7.width+(j*4);
var red=_c7.data[_c8];
var _ca=_c7.data[_c8+1];
var _cb=_c7.data[_c8+2];
var _cc=_c7.data[_c8+3];
var _cd=(red+_ca+_cb)/3;
_c7.data[_c8]=_cd;
_c7.data[_c8+1]=_cd;
_c7.data[_c8+2]=_cd;
_c7.data[_c8+3]=_cc;
}
}
return _c3.toDataURL();
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_ce){
if(typeof _ce!=Types.UNDEFINED){
_ce=String(_ce);
_ce=_ce.replace("${root}",Constants.APPROOT);
_ce=_ce.replace("${skin}",Constants.SKINROOT);
_ce=_ce.replace("${tiny}",Constants.TINYROOT);
if(_ce.indexOf("${icon:")>-1){
_ce=this._resolveImage(_ce);
}else{
if(_ce.indexOf("${class:")>-1){
_ce=this._resolveClasses(_ce);
}else{
if(_ce.indexOf("${string:")>-1){
_ce=this._resolveString(_ce);
}
}
}
}
return _ce;
},resolveVars:function(_cf,_d0){
var i=0;
while(i<_d0.length){
_cf=_cf.replace("{"+i+"}",_d0[i]);
i++;
}
return _cf;
},_resolveString:function(_d2){
var _d3=null;
var _d4=null;
var key=_d2.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_d4=key.split(":")[0];
key=key.split(":")[1];
}else{
_d4=StringBundle.UI;
}
_d3=StringBundle.getString(_d4,key);
if(!_d3){
_d3="(?)";
}
return _d3;
},_resolveImage:function(_d6){
var _d7=null;
var _d8=null;
var _d9=null;
var _da=null;
_d9=_d6.split("${icon:")[1].split("}")[0];
if(_d9.indexOf(":")>-1){
_d8=_d9.split(":")[0];
_d9=_d9.split(":")[1];
}else{
_d8=ImageProvider.UI;
}
if(_d9.indexOf("(")>-1){
_da=_d9.split("(")[1].split(")")[0];
_d9=_d9.split("(")[0];
}
_d7=ImageProvider.getImageURL({ResourceNamespace:_d8,ResourceName:_d9},_da);
return _d7;
},_resolveClasses:function(_db){
var _dc={};
resource=_db.split("${class:")[1].split("}")[0];
_dc.classes=resource;
return _dc;
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
_Cookies.prototype={createCookie:function(_df,_e0,_e1){
var _e2="";
if(_e1){
var _e3=new Date();
_e3.setTime(_e3.getTime()+(_e1*24*60*60*1000));
_e2="; expires="+_e3.toGMTString();
}
document.cookie=_df+"="+escape(_e0)+_e2+"; path=/";
return this.readCookie(_df);
},readCookie:function(_e4){
var _e5=null;
var _e6=_e4+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_e6)==0){
_e5=unescape(c.substring(_e6.length,c.length));
}
}
return _e5;
},eraseCookie:function(_ea){
this.createCookie(_ea,"",-1);
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
var _eb=SystemLogger.getLogger("StatusBar");
var _ec=null;
var _ed="${icon:error}";
var _ee="${icon:warning}";
var _ef="${icon:loading}";
var _f0="${icon:message}";
var _f1=null;
var _f2=null;
var _f3=null;
var _f4=null;
this.initialize=function(_f5){
_f1=StringBundle.getString("ui","Website.App.StatusBar.Error");
_f2=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_f3=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_f4=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_ec=_f5;
this.document=_f5.bindingDocument;
};
this.error=function(_f6,_f7){
this.state=StatusBar.ERROR;
_f6=_f6?_f6:_f1;
show(_f6,_ed,_f7,false);
};
this.warn=function(_f8,_f9){
this.state=StatusBar.WARN;
_f8=_f8?_f8:_f2;
show(_f8,_ee,_f9,false);
};
this.busy=function(_fa,_fb){
this.state=StatusBar.BUSY;
_fa=_fa?_fa:_f3;
show(_fa,_ef,_fb,false);
};
this.ready=function(_fc,_fd){
this.state=StatusBar.READY;
_fc=_fc?_fc:_f4;
show(_fc,_f0,_fd,true);
};
this.report=function(_fe,_ff,vars,_101){
this.state=null;
show(_fe,_ff,vars,_101);
};
this.clear=function(){
this.state=null;
if(_ec){
_ec.clear();
}
};
function show(_102,icon,vars,_105){
if(vars){
_102=Resolver.resolveVars(_102,vars);
}
if(_ec){
_ec.setLabel(_102);
_ec.setImage(icon);
if(_105){
_ec.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_eb.error("Message not initialized for display: "+_102);
}
}
this.addToGroup=function(name,_107){
if(!this._groups.has(name)){
this._groups.set(name,_ec.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(name).add(_107);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,handleBroadcast:function(_108,arg){
switch(_108){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
var _10a=LocalizationService.GetActiveLocales(true);
if(_10a.length>=1){
this.languages=new List(_10a);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_108){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _10b=LocalizationService.GetLocales(true);
this.source=_10b.ForeignLocaleName;
this.target=_10b.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_10b.ForeignLocaleName,target:_10b.ActiveLocaleName});
break;
}
},currentLang:function(){
if(this.languages!=null){
var _10c=this.languages.copy();
while(_10c.hasNext()){
var lang=_10c.getNext();
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
_Validator.prototype={validate:function(_10e,key,_110){
var _111=true;
var _112=SourceValidationService.ValidateSource(_10e,key);
if(_112!="True"){
if(_110==true){
this._dialog(_112);
}
_111=false;
}
return _111;
},validateInformed:function(_113,key){
return this.validate(_113,key,true);
},_dialog:function(_115){
setTimeout(function(){
Dialog.error("Source Invalid",_115);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",HELP:"help",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_116,_117,_118,_119){
this._count++;
this._eventListener(true,_116,_117,_118,_119);
if(!Client.isExplorer&&!Client.isExplorer11){
if(_116&&typeof _116.nodeType!=Types.UNDEFINED){
if(_116.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_116);
if(win){
var _11b={handleEvent:function(){
DOMEvents.removeEventListener(_116,_117,_118,_119);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_11b);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_11b);
}
}
}
}
},removeEventListener:function(_11c,_11d,_11e,_11f){
this._count--;
this._eventListener(false,_11c,_11d,_11e,_11f);
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
},cleanupEventListeners:function(_125){
this._deleteWrappedHandler(_125);
},isCurrentTarget:function(e){
var _127=false;
if(Client.isMozilla==true){
_127=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_128,_129){
var _12a=true;
if(_128==_129){
_12a=false;
}
if(_12a==true){
while(_129!=null&&_129.nodeType!=Node.DOCUMENT_NODE&&_129!=_128){
_129=_129.parentNode;
}
_12a=(_129==_128);
}
return _12a;
},_eventListener:function(_12b,_12c,_12d,_12e,_12f,_130){
if(Interfaces.isImplemented(IEventListener,_12e,true)){
if(typeof _12d!=Types.UNDEFINED){
var _131=this._getAction(_12b);
if(_12c[_131]){
if(Client.isExplorer||Client.isExplorer11){
switch(_12d){
case DOMEvents.MOUSEDOWN:
case DOMEvents.MOUSEUP:
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
case DOMEvents.MOUSEMOVE:
_12e=this._getWrappedHandler(_12c,_12d,_12e,_130);
_12c[_131](_12d,_12e,false);
break;
default:
_12c[_131](_12d,_12e,false);
break;
}
}else{
switch(_12d){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_12d=_12d==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_12c[_131](_12d,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_12e.handleEvent(e);
}
}},_12f?true:false);
break;
default:
_12c[_131](_12d,_12e,_12f?true:false);
break;
}
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_134){
var _135=null;
switch(_134){
case true:
_135="addEventListener";
break;
case false:
_135="removeEventListener";
break;
}
return _135;
},_getWrappedHandler:function(_136,_137,_138,_139){
var _13a=null;
try{
if(!_138._domEventHandlers){
_138._domEventHandlers={};
}
if(!_138._domEventHandlers[_136]){
_138._domEventHandlers[_136]={};
}
if(!_138._domEventHandlers[_136][_137]){
var win=_136.nodeType?DOMUtil.getParentWindow(_136):_136;
if(win){
_138._domEventHandlers[_136][_137]=function(e){
if(win.event!=null&&_138!=null){
_138.handleEvent(win.event);
}else{
if(_138!=null){
_138.handleEvent(e);
}
}
};
}
}
_13a=_138._domEventHandlers[_136][_137];
}
catch(exception){
this._report(_136,_137,_138,_139);
}
return _13a;
},_deleteWrappedHandler:function(_13d){
for(var _13e in _13d._domEventHandlers){
if(_13e){
for(var _13f in _13d._domEventHandlers[_13e]){
if(_13f){
delete _13d._domEventHandlers[_13e][_13f];
}
}
}
delete _13d._domEventHandlers[_13e];
}
},_report:function(_140,_141,_142,_143){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_140?_140.nodeName:_140)+"\n"+"\tevent: "+_141+"\n"+"\thandler: "+_142+"\n\n"+"Offending invoker: "+(_143.callee?_143.callee.toString():_143.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_145){
var _146=null;
var _147=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_147=node.documentElement;
}
if(_147.xml!=null){
return _147.xml;
}else{
if(this._serializer!=null){
if(_145==true){
_147=_147.cloneNode(true);
_147=DOMFormatter.format(_147,DOMFormatter.INDENTED_TYPE_RESULT);
}
_146=this._serializer.serializeToString(_147);
}
}
return _146;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _14a=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_14b){
var doc=_14b.ownerDocument;
var _14d=function(node,_14f){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _150="",i=0;
while(i++<_14f){
_150+=TAB;
}
var _152=node.firstChild;
while(_152){
switch(_152.nodeType){
case Node.ELEMENT_NODE:
if(_152==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_150));
}
node.insertBefore(doc.createTextNode(NEW+_150+TAB),_152);
_14d(_152,_14f+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_150+TAB),_152);
break;
}
if(_152.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_152,_150+TAB);
}
}
_152=_152.nextSibling;
}
}
};
_14d(_14b,0);
}
function strip(_153){
var _154=[];
var _155={acceptNode:function(_156){
return (!_14a.test(_156.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _157=_153.ownerDocument.createTreeWalker(_153,NodeFilter.SHOW_TEXT,_155,true);
while(_157.nextNode()){
_154.push(_157.currentNode);
}
var i=0,_159;
while((_159=_154[i++])!=null){
_159.parentNode.removeChild(_159);
}
}
function formatCDATASection(node,_15b){
if(node.textContent.indexOf(NEW)>-1){
var _15c=node.textContent.split(NEW);
var _15d="",line,_15f=0,_160=true;
while((line=_15c.shift())!=null){
if(_15f==0&&line.charAt(0)==TAB){
while(line.charAt(_15f++)==TAB){
}
}
line=line.substring(_15f,line.length);
if(_15c.length>0){
_15d+=_15b+TAB+line;
_15d+=_160?"":"\n";
}else{
_15d+=_15b+line;
_15b=_15b.slice(1,_15b.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_15b));
}
_160=false;
}
node.textContent=_15d;
}
}
this.format=function(_161,_162){
var _163=1;
if(document.createTreeWalker&&!Client.isExplorer&&!Client.isExplorer11){
try{
strip(_161);
if(_162!=_163){
indent(_161);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_161);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_164){
var sig,_166=null,_167=this.MSXML_MAXVERSION;
while(!_166&&_167>=this.MSXML_MINVERSION){
try{
sig=_164.replace("{$version}",_167);
_166=new ActiveXObject(sig);
}
catch(exception){
}
_167--;
}
return _166;
},getXMLHTTPRequest:function(){
var _168=null;
if(Client.isExplorer||Client.isExplorer11){
_168=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_168=new XMLHttpRequest();
}
return _168;
},getDOMDocument:function(_169){
var _16a=null;
if(Client.isExplorer||Client.isExplorer11){
_16a=this.getMSComponent(_169?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_16a=doc;
}
return _16a;
},getMSXMLXSLTemplate:function(){
var _16c=null;
if(Client.isExplorer||Client.isExplorer11){
_16c=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _16c;
},getLocalName:function(_16d){
var _16e=null;
if(_16d.localName){
_16e=_16d.localName.replace("ui:","");
}else{
if(_16d.baseName){
_16e=_16d.baseName;
}else{
_16e=_16d.nodeName.toLowerCase();
}
}
return _16e;
},getComputedStyle:function(_16f,_170){
var _171=null;
if(Client.isExplorer){
if(_16f.currentStyle!=null){
_171=_16f.currentStyle[_170];
}else{
this._logger.error("Could not compute style for element "+_16f.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _172=_16f.ownerDocument.defaultView.getComputedStyle(_16f,null);
if(_172!=null){
_171=_172.getPropertyValue(_170);
}else{
this._logger.error("Could not compute style for element "+_16f.nodeName);
SystemDebug.stack(arguments);
}
}
return _171;
},getMaxIndex:function(doc){
var max=0,_175=new List(doc.getElementsByTagName("*"));
_175.each(function(_176){
var _177=CSSComputer.getZIndex(_176);
if(_177>max){
max=_177;
}
});
return max;
},getOrdinalPosition:function(_178,_179){
var _17a=null;
var _17b=-1;
var _17c=this.getLocalName(_178);
var _17d=new List(_178.parentNode.childNodes);
while(_17d.hasNext()){
var _17e=_17d.getNext();
if(_17e.nodeType==Node.ELEMENT_NODE){
if(!_179||this.getLocalName(_17e)==_17c){
_17b++;
if(_17e==_178||(_17e.id!=""&&_17e.id==_178.id)){
_17a=_17b;
break;
}
}
}
}
return _17a;
},isFirstElement:function(_17f,_180){
return (this.getOrdinalPosition(_17f,_180)==0);
},isLastElement:function(_181,_182){
var _183=_181.parentNode.getElementsByTagName(_182?this.getLocalName(_181):"*");
return (this.getOrdinalPosition(_181)==_183.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _187=null;
if(node.textContent){
_187=node.textContent;
}else{
if(node.text){
_187=node.text;
}else{
_187=node.innerText;
}
}
return _187;
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
},getAncestorByLocalName:function(_18a,node,_18c){
var _18d=null;
while(_18d==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_18c==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_18a){
_18d=node;
}
}
return _18d;
},contains:function(_18f,node){
return _18f.contains?_18f!=node&&_18f.contains(node):!!(_18f.compareDocumentPosition(node)&16);
},createElementNS:function(_191,_192,_193){
var _194=null;
if(_193==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(!Client.isExplorer&&!Client.isExplorer11){
_194=_193.createElementNS(_191,_192);
}else{
if(_193.xml!=null){
_194=_193.createNode(Node.ELEMENT_NODE,_192,_191);
}else{
_194=_193.createElement(_192.replace("ui:",""));
}
}
}
return _194;
},getElementsByTagName:function(node,_196){
var _197=null;
if(Client.isMozilla){
_197=node.getElementsByTagNameNS(Constants.NS_XHTML,_196);
}else{
_197=node.getElementsByTagName(_196);
}
return _197;
},getNextElementSibling:function(_198){
return Client.isExplorer?_198.nextSibling:_198.nextElementSibling;
},getPreviousElementSibling:function(_199){
return Client.isExplorer?_199.previousSibling:_199.previousElementSibling;
},cloneNode:function(node){
var _19b=null;
if(Client.isMozilla==true){
_19b=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_19b=node.cloneNode(true);
}
return _19b;
},getLocalPosition:function(_19c){
var _19d=new Point(_19c.offsetLeft,_19c.offsetTop);
if(Client.isExplorer&&_19c.parentNode&&_19c.parentNode.currentStyle){
if(_19c.parentNode.currentStyle.position=="static"){
var _19e=this.getLocalPosition(_19c.parentNode);
_19d.x+=_19e.x;
_19d.y+=_19e.y;
}
}
return _19d;
},getGlobalPosition:function(_19f){
return this._getPosition(_19f,false);
},getUniversalPosition:function(_1a0){
return this._getPosition(_1a0,true);
},_getPosition:function(_1a1,_1a2){
var _1a3=null;
if(typeof _1a1.getBoundingClientRect!=Types.UNDEFINED){
var rect=_1a1.getBoundingClientRect();
_1a3={x:rect.left,y:rect.top};
if(Client.isMozilla){
_1a3.x-=_1a1.scrollLeft;
_1a3.y-=_1a1.scrollTop;
}
}else{
_1a3={x:_1a1.offsetLeft-_1a1.scrollLeft,y:_1a1.offsetTop-_1a1.scrollTop};
while(_1a1.offsetParent){
_1a1=_1a1.offsetParent;
_1a3.x+=(_1a1.offsetLeft-_1a1.scrollLeft);
_1a3.y+=(_1a1.offsetTop-_1a1.scrollTop);
}
}
if(_1a2){
var win=DOMUtil.getParentWindow(_1a1);
if(win){
var _1a6=win.frameElement;
if(_1a6){
var add=DOMUtil.getUniversalPosition(_1a6);
_1a3.x+=add.x;
_1a3.y+=add.y;
}
}
}
return new Point(_1a3.x,_1a3.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1ab){
var _1ac=DOMEvents.getTarget(e);
var _1ad={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_1ac.ownerDocument;
var win=this.getParentWindow(doc);
_1ad.x-=win.pageXOffset;
_1ad.y-=win.pageYOffset;
}
if(_1ab){
var _1b0=this.getParentWindow(_1ac).frameElement;
if(_1b0){
var add=this.getUniversalPosition(_1b0);
_1ad.x+=add.x;
_1ad.y+=add.y;
}
}
return _1ad;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1b3){
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
if(!_1b3){
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
if(!_1b3){
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
},isWellFormedDocument:function(xml,_1b6,_1b7){
var _1b8=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1ba=SourceValidationService.IsWellFormedDocument(xml);
if(_1ba!="True"){
_1b8=false;
if(_1b6==true){
if(_1b7){
if(confirm("Not well-formed\n"+_1ba+"\nContinue?")){
_1b8=true;
}
}else{
this._illFormedDialog(_1ba);
}
}
}
return _1b8;
},isWellFormedFragment:function(xml,_1bc){
var _1bd=true;
var _1be=SourceValidationService.IsWellFormedFragment(xml);
if(_1be!="True"){
_1bd=false;
if(_1bc==true){
this._illFormedDialog(_1be);
}
}
return _1bd;
},_illFormedDialog:function(_1bf){
setTimeout(function(){
Dialog.error("Not well-formed",_1bf);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1c0){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1c1){
return _1c0[_1c1];
}};
}else{
this._nsResolver=_1c0;
}
};
XPathResolver.prototype.resolve=function(_1c2,node,_1c4){
var _1c5=null;
try{
if(this._evaluator){
_1c5=this._evaluateDOMXpath(_1c2,node,_1c4?true:false);
}else{
_1c5=this._evaluateMSXpath(_1c2,node,_1c4?true:false);
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
return _1c5;
};
XPathResolver.prototype.resolveAll=function(_1c6,node){
return this.resolve(_1c6,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1c8,node,_1ca){
var _1cb=null;
if(node){
var _1cb=this._evaluator.evaluate(_1c8,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1ca){
var list=new List();
while((node=_1cb.iterateNext())!=null){
list.add(node);
}
_1cb=list;
}else{
_1cb=_1cb.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1cb;
};
XPathResolver.prototype._evaluateMSXpath=function(_1ce,node,_1d0){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1d2="";
for(var _1d3 in this._nsResolver){
_1d2+="xmlns:"+_1d3+"=\""+this._nsResolver[_1d3]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1d2);
if(_1d0){
var list=new List();
var i=0,_1d6=node.selectNodes(_1ce);
while(i<_1d6.length){
list.add(_1d6.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1ce);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1d8=this._import(Resolver.resolve(url));
if(Client.hasXSLTProcessor){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1d8);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1d8;
}
};
XSLTransformer.prototype._import=function(url){
var _1da=null;
if(Client.hasXSLTProcessor){
var _1db=DOMUtil.getXMLHTTPRequest();
_1db.open("get",Resolver.resolve(url),false);
_1db.send(null);
_1da=_1db.responseXML;
}else{
var _1da=DOMUtil.getDOMDocument(true);
_1da.async=false;
_1da.load(url);
}
return _1da;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1dd=null;
if(Client.hasXSLTProcessor){
_1dd=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1dd;
};
XSLTransformer.prototype.transformToString=function(dom,_1df){
var _1e0=null;
if(Client.hasXSLTProcessor){
var doc=this.transformToDocument(dom);
_1e0=DOMSerializer.serialize(doc,_1df);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1e0=proc.output;
}
return _1e0;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1e3){
var _1e4=_1e3.style?_1e3.className:_1e3.getAttribute("class");
_1e4=_1e4?_1e4:"";
return _1e4;
},_contains:function(_1e5,sub){
return _1e5.indexOf(sub)>-1;
},_attach:function(_1e7,sub){
return _1e7+(_1e7==""?"":" ")+sub;
},_detach:function(_1e9,sub){
if(this._contains(_1e9," "+sub)){
sub=" "+sub;
}
return _1e9.replace(sub,"");
},attachClassName:function(_1eb,_1ec){
if(_1eb.classList!=null){
if(!_1eb.classList.contains(_1ec)){
_1eb.classList.add(_1ec);
}
}else{
var _1ed=this._getCurrent(_1eb);
if(!this._contains(_1ed,_1ec)){
_1ed=this._attach(_1ed,_1ec);
}
if(_1eb.style!=null){
_1eb.className=_1ed;
}else{
_1eb.setAttribute("class",_1ed);
}
}
},detachClassName:function(_1ee,_1ef){
if(_1ee.classList!=null){
if(_1ee.classList.contains(_1ef)){
_1ee.classList.remove(_1ef);
}
}else{
var _1f0=this._getCurrent(_1ee);
if(this._contains(_1f0,_1ef)){
_1f0=this._detach(_1f0,_1ef);
}
if(_1ee.style!=null){
_1ee.className=_1f0;
}else{
if(_1f0==""){
_1ee.removeAttribute("class");
}else{
_1ee.setAttribute("class",_1f0);
}
}
}
},hasClassName:function(_1f1,_1f2){
var _1f3=false;
if(_1f1.classList!=null){
_1f3=_1f1.classList.contains(_1f2);
}else{
_1f3=this._contains(this._getCurrent(_1f1),_1f2);
}
return _1f3;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1f4,_1f5){
var _1f6={};
for(var _1f7 in _1f4){
var ent=parseInt(DOMUtil.getComputedStyle(_1f5,_1f4[_1f7]));
_1f6[_1f7]=isNaN(ent)?0:ent;
}
return _1f6;
},_getMargin:function(_1f9){
return this._getComplexResult(this._margins,_1f9);
},getPadding:function(_1fa){
return this._getComplexResult(this._paddings,_1fa);
},getBorder:function(_1fb){
return this._getComplexResult(this._borders,_1fb);
},getPosition:function(_1fc){
return DOMUtil.getComputedStyle(_1fc,"position");
},getFloat:function(_1fd){
return DOMUtil.getComputedStyle(_1fd,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1fe){
return parseInt(DOMUtil.getComputedStyle(_1fe,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1ff){
return DOMUtil.getComputedStyle(_1ff,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _200=SystemLogger.getLogger("System");
var root=null;
var _202=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_203){
if(_202==null){
_202={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_204){
_202[_204.Key]=_204.Value;
});
}
return _202[_203];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _205=new List();
var _206=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_206);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_208){
_205.add(new SystemNode(_208));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _205;
};
this.getChildNodes=function(node,_20a){
var _20b=new List();
var _20c=null;
if(_20a){
if(SearchTokens.hasToken(_20a)){
_20a=SearchTokens.getToken(_20a);
}
_20c=TreeService.GetElementsBySearchToken(node.getData(),_20a);
}else{
_20c=TreeService.GetElements(node.getData());
}
new List(_20c).each(function(_20d){
var _20e=new SystemNode(_20d);
if(_20a){
_20e.searchToken=_20a;
}
_20b.add(_20e);
});
return _20b;
};
this.getDescendantBranch=function(_20f){
var map=new Map();
var arg=[];
_20f.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag(),SearchToken:node.searchToken,});
});
var _213=TreeService.GetMultipleChildren(arg);
var _214=new List(_213);
while(_214.hasNext()){
this._listNodesInMap(_214.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_215,_216,_217){
var map=new Map();
var arg=[];
_217.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _21b=TreeService.FindEntityToken(_215,_216,arg);
if(_21b instanceof SOAPFault){
_200.error(_21b.getFaultString());
if(Application.isDeveloperMode){
alert(_21b.getFaultString());
}
map=null;
}else{
var _21c=new List(_21b);
while(_21c.hasNext()){
this._listNodesInMap(_21c.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_21d,map){
var list=new List();
var key=_21d.ElementKey;
var _221=new List(_21d.ClientElements);
map.set(key,list);
while(_221.hasNext()){
var _222=_221.getNext();
list.add(new SystemNode(_222));
}
};
this.getChildNodesBySearchToken=function(node,_224){
return this.getChildNodes(node,_224);
};
this.getNamedRoots=function(key,_226){
var _227=new List();
var _228=null;
if(_226){
if(SearchTokens.hasToken(_226)){
_226=SearchTokens.getToken(_226);
}
_228=TreeService.GetNamedRootsBySearchToken(key,_226);
}else{
_228=TreeService.GetNamedRoots(key);
}
new List(_228).each(function(_229){
var node=new SystemNode(_229);
if(_226){
node.searchToken=_226;
}
_227.add(node);
});
return _227;
};
this.getNamedRootsBySearchToken=function(key,_22c){
return this.getNamedRoots(key,_22c);
};
function compileActionList(node,_22e,_22f){
var _230=_22e.ClientElementActionGroupId;
if(_230!=null){
var _231=_22f.get(_230).ClientElementActionGroupItems;
if(_231&&_231.length>0){
node.setActionList(new List(_231));
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
new List(self._data.Actions).each(function(_237){
var _238=_237.ActionCategory.Name;
if(SystemAction.hasCategory(_238)){
var _239=new SystemAction(_237);
SystemAction.actionMap.set(_237.ActionKey,_239);
}else{
throw "No such action category: "+_238;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _23a=null;
if(this.searchToken){
_23a=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_23a=System.getChildNodes(this);
}
return _23a;
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
var _23c=this._data.Piggybag;
if(_23c==null){
_23c="";
}
return _23c;
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
var _23e=null;
if(typeof this._data.ToolTip!="undefined"){
_23e=this._data.ToolTip;
}
return _23e;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_240){
map[_240.Key]=_240.Value;
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
var _244=SystemAction.actionMap.get(key);
var _245=true;
if(_244.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_245=false;
}
}
if(_245){
var id=_244.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_244);
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
SystemAction.invoke=function(_248,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_248.logger.debug("Execute \""+_248.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_248.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_24b,_24c){
action=SystemAction.taggedActions.get(_24b);
node=SystemNode.taggedNodes.get(_24c);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_24d){
return SystemAction.categories[_24d]?true:false;
};
function SystemAction(_24e){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_24e;
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
var _24f=null;
if(this.isInFolder()){
_24f=this._data.ActionCategory.FolderName;
}
return _24f;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _250=null;
if(typeof this._data.TagValue!="undefined"){
_250=this._data.TagValue;
}
return _250;
};
SystemAction.prototype.isChecked=function(){
var _251=null;
if(this.isCheckBox()){
_251=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _251;
};
function _UpdateManager(){
var _252=null;
if(!window.UpdateManager){
this._construct();
_252=this;
}
return _252;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_253){
var root=document.documentElement;
var _255=root.namespaceURI;
if(_255==null){
_255=new String(root.getAttribute("xmlns"));
}
if(_255=="http://www.w3.org/1999/xhtml"){
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
var _256=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_256);
}else{
throw new TypeError();
}
}else{
var _257=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_257.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _259=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_259=true;
}
},this);
return _259;
},_setupForm:function(form){
var _25c=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_25c.isEnabled){
_25c._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_25d,type){
if(_25d.addEventListener!=null){
_25d.addEventListener(type,this,false);
}else{
var _25f=this;
_25d.attachEvent("on"+type,function(){
_25f.handleEvent(window.event);
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
var _264=UpdateAssistant.getUpdateZones(dom);
var _265=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_264.forEach(function(_266,_267){
var _268=_265[_267];
this._crawl(_266,_268);
},this);
this._updates.forEach(function(_269,_26a){
_269.update();
_269.dispose();
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
},_crawl:function(_26c,_26d,_26e,id){
var _270=true;
var _271=_26d.getAttribute("class");
if(_271==null||_271.indexOf(this.CLASSNAME_GONE)==-1){
if(_26d.nodeType==Node.ELEMENT_NODE){
var _272=_26d.getAttribute("id");
if(_272!=null){
_26e=_26c;
id=_272;
}
}
if(_270=this._check(_26c,_26d,_26e,id)){
var _273=_26c.firstChild;
var _274=_26d.firstChild;
while(_273!=null&&_274!=null&&!this._replaced[id]){
switch(_273.nodeType){
case Node.TEXT_NODE:
_270=this._check(_273,_274,_26e,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_270=this._crawl(_273,_274,_26e,id);
break;
}
if(this._replaced[id]){
_270=false;
}else{
_273=_273.nextSibling;
_274=_274.nextSibling;
}
}
}
}
return _270;
},_check:function(_275,_276,_277,id){
var _279=true;
var _27a=null;
var _27b=false;
var _27c=false;
if((_275!=null&&_276==null)||(_275==null&&_276!=null)){
_279=false;
}else{
if(_279=_275.nodeType==_276.nodeType){
switch(_276.nodeType){
case Node.ELEMENT_NODE:
if(_275.namespaceURI!=_276.namespaceURI||_275.nodeName!=_276.nodeName){
_279=false;
}else{
if(_279=(_275.nodeName==_276.nodeName)){
var _27d=_276.getAttribute("id");
var _27e=_275.getAttribute("id");
if(_27d!=null&&_27e!=null){
if(_27d!=_27e){
_279=false;
}else{
if((_27a=this._getPlugin(_275,_276))!=null){
if(_27a.updateElement(_275,_276)){
_27c=true;
_279=false;
}
}
}
}
if(_279){
if(_279=this._checkAttributes(_275,_276)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_275)&&this._hasSoftChildren(_276)){
if(this._validateSoftChildren(_275,_276)){
this._updateSoftChildren(_275,_276);
_27b=true;
}
_279=false;
}else{
_279=_275.childNodes.length==_276.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_275.data.trim()!=_276.data.trim()){
_279=false;
}
break;
}
}
}
if(_279==false&&!_27b&&!_27c){
if(id!=null&&_277!=null){
this.addUpdate(new ReplaceUpdate(id,_277));
}
}
return _279;
},_checkAttributes:function(_27f,_280){
var _281=true;
var _282=false;
var _283=_27f.attributes;
var _284=_280.attributes;
if(_283.length!=_284.length){
_282=true;
}else{
_282=!Array.every(_283,function(att1,i){
var att2=_284.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_282){
var _288=_27f.getAttribute("id");
var _289=_280.getAttribute("id");
if(this.hasSoftAttributes&&_288!=null&&_288==_289){
this.addUpdate(new AttributesUpdate(_289,_27f,_280));
}else{
_281=false;
}
}
return _281;
},_hasSoftChildren:function(_28a){
var _28b=true;
if(_28a.hasChildNodes()){
_28b=Array.every(_28a.childNodes,function(node){
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
return _28b;
},_validateSoftChildren:function(_28e,_28f){
var _290=true;
var _291=-1;
var _292=-1;
var _293=-1;
var news=this._toMap(_28e.childNodes,true);
var olds=this._toMap(_28f.childNodes,true);
for(var id in olds){
if(_290){
var _297=olds[id];
_290=_297>=_291;
if(news[id]!=null){
_293=news[id];
_290=_293>=_292;
}
}
_291=_297;
if(_293>-1){
_292=_293;
}
}
return _290;
},_updateSoftChildren:function(_298,_299){
var news=this._toMap(_298.childNodes);
var olds=this._toMap(_299.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _29d=null;
for(id in news){
if(olds[id]==null){
var _29e=news[id];
if(_29d==null){
var _29f=_299.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29f,_29e,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29d,_29e,false));
}
}
_29d=id;
}
},addUpdate:function(_2a0){
this._updates.push(_2a0);
if(_2a0 instanceof ReplaceUpdate){
this._replaced[_2a0.id]=true;
}
},_getPlugin:function(_2a1,_2a2){
var _2a3=null;
this.plugins.every(function(_2a4){
if(_2a4.handleElement(_2a1,_2a2)){
_2a3=_2a4;
}
return _2a3==null;
});
return _2a3;
},_toMap:function(_2a5,_2a6){
var _2a7={};
Array.forEach(_2a5,function(node,_2a9){
if(node.nodeType==Node.ELEMENT_NODE){
_2a7[node.getAttribute("id")]=_2a6?_2a9:node;
}
});
return _2a7;
},_getPost:function(form){
var _2ab=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2ad){
if(_2ad.name==null||_2ad.name==""){
return;
}
var name=_2ad.name;
var _2af=encodeURIComponent(_2ad.value);
switch(_2ad.type){
case "button":
case "submit":
var _2b0=UpdateAssistant.getActiveElement();
if(_2ad==_2b0&&name!=""){
_2ab+=name+"="+_2af+"&";
}
break;
case "radio":
if(_2ad.checked){
_2ab+=name+"="+_2af+"&";
}
break;
case "checkbox":
if(_2ad.checked){
if(_2ad.name==last){
if(_2ab.lastIndexOf("&")==_2ab.length-1){
_2ab=_2ab.substr(0,_2ab.length-1);
}
_2ab+=","+_2af;
}else{
_2ab+=name+"="+_2ad.value;
}
last=name;
_2ab+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2ab+=name+"="+_2af+"&";
break;
}
});
}
return _2ab.substr(0,_2ab.length-1);
},_postRequest:function(form){
var _2b2=form.method!=""?form.method:"get";
var _2b3=form.action!=""?form.action:window.location.toString();
var _2b4=this._getPost(form);
if(_2b2=="get"){
if(_2b3.indexOf("?")>-1){
_2b3=_2b3+"&"+_2b4;
}else{
_2b3+"?"+_2b4;
}
}
var _2b5=this;
var _2b6=UpdateAssistant.getXMLHttpRequest(_2b2,_2b3,this);
if(_2b2=="post"){
_2b6.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2b6.send(_2b2=="post"?_2b4:null);
},_fixdotnet:function(dom,id){
var _2b9=document.getElementById(id);
if(_2b9!=null){
var _2ba=UpdateAssistant.getElementById(dom,id);
if(_2ba!=null){
var _2bb=_2ba.getAttribute("value");
if(_2bb!==_2b9.value){
_2b9.value=_2bb;
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
},report:function(_2be){
this.summary+=_2be+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2bf=null;
if(!window.UpdateAssistant){
this._construct();
_2bf=this;
}
return _2bf;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2c0,fun){
var _2c2=true;
var len=_2c0.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c4=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c0[i]!="undefined"){
if(!fun.call(_2c4,_2c0[i],i,_2c0)){
_2c2=false;
break;
}
}
}
}
return _2c2;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2c7=arguments[1];
return Array.every(this,fun,_2c7);
};
}
if(!Array.forEach){
Array.forEach=function(_2c8,fun){
var len=_2c8.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2cb=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c8[i]!="undefined"){
fun.call(_2cb,_2c8[i],i,_2c8);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2ce=arguments[1];
Array.forEach(this,fun,_2ce);
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
},getXMLHttpRequest:function(_2d0,_2d1,_2d2){
var _2d3=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2d3!=null){
_2d3.open(_2d0,_2d1,(_2d2!=null?true:false));
if(_2d2!=null){
function action(){
if(_2d3.readyState==4){
var _2d4=_2d3.getResponseHeader("X-Error-Type");
if(_2d4){
var _2d5="";
for(var i=0;i<10;i++){
var _2d7=i?i:"";
var _2d4=_2d3.getResponseHeader("X-Error-Type"+_2d7);
if(!_2d4){
break;
}
var _2d8=_2d3.getResponseHeader("X-Error-Message"+_2d7);
_2d5+=_2d4+"\n"+_2d8+"\n";
}
Dialog.error("Error",_2d5);
}else{
var text=_2d3.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2d2.handleResponse(dom);
}
}
}
}
if(_2d3.addEventListener!=null){
_2d3.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2d3.onreadystatechange=action;
}
}
}
return _2d3;
},dispatchEvent:function(_2db,name){
var _2dd=true;
var _2de=document.createEvent("UIEvents");
_2de.initEvent(name,true,true);
_2dd=_2db.dispatchEvent(_2de);
return _2dd;
},getUpdateZones:function(dom){
var _2e0="//*[@id and contains(@class,'updatezone')]";
var _2e1=[];
var _2e2=null;
var _2e3=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e2=dom.evaluate(_2e0,dom,null,type,null);
while((_2e3=_2e2.iterateNext())!=null){
_2e1.push(_2e3);
}
}else{
_2e2=dom.documentElement.selectNodes(_2e0);
Array.forEach(_2e2,function(_2e5){
_2e1.push(_2e5);
});
}
return _2e1;
},getElementById:function(dom,id){
var _2e8="//*[@id='"+id+"']";
var _2e9=null;
var _2ea=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2e9=dom.evaluate(_2e8,dom,null,type,null);
_2ea=_2e9.singleNodeValue;
}else{
_2ea=dom.documentElement.selectNodes(_2e8)[0];
}
return _2ea;
},_getIds:function(dom){
var _2ed="//*[@id]";
var _2ee=null;
var _2ef=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2ee=dom.evaluate(_2ed,dom,null,type,null);
while((element=_2ee.iterateNext())!=null){
_2ef.push(element.getAttribute("id"));
}
}else{
_2ee=dom.documentElement.selectNodes(_2ed);
Array.forEach(_2ee,function(_2f1){
_2ef.push(_2f1.getAttribute("id"));
});
}
return _2ef;
},toHTMLElement:function(_2f2){
var _2f3=this.serialize(_2f2);
var temp=document.createElement("temp");
temp.innerHTML=_2f3;
return temp.firstChild;
},getActiveElement:function(){
var _2f5=document.activeElement;
if(_2f5==null||_2f5==document.body){
_2f5=this._activeElement;
}
return _2f5;
},serialize:function(_2f6){
var _2f7=null;
if(_2f6.xml!=null){
_2f7=_2f6.xml;
}else{
if(this._serializer!=null){
_2f7=this._serializer.serializeToString(_2f6);
}
}
return _2f7;
},hasDifferences:function(_2f8,_2f9){
var s1=null;
var s2=null;
if(_2f8.xml!=null){
s1=_2f8.xml;
s2=_2f9.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2f8);
s2=this._serializer.serializeToString(_2f9);
}
}
return s1!=s2;
},parse:function(_2fc){
var _2fd=null;
if(this._parser!=null&&window.XPathResult!=null){
_2fd=this._parser.parseFromString(_2fc,"text/xml");
}else{
_2fd=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2fd.setProperty("SelectionLanguage","XPath");
_2fd.loadXML(_2fc);
}
return this._validate(_2fd);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _300=dom.getElementsByTagName("parsererror").item(0);
if(_300!=null){
out=_300.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _304=!has[id];
has[id]=true;
if(!_304){
out="Element \""+id+"\" encountered twice.";
}
return _304;
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
this.handleElement=function(_305,_306){
var _307=false;
switch(_305.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_305.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_307=false;
break;
}
break;
}
return _307;
};
this.updateElement=function(_308,_309){
var id=_308.getAttribute("id");
var _30b=document.getElementById(id);
if(_30b!=null){
var _30c=null;
switch(_30b.nodeName.toLowerCase()){
case "input":
_30c=_308.getAttribute("value");
break;
case "textarea":
_30c=_308.textContent?_308.textContent:_308.text;
break;
}
if(_30c==null){
_30c="";
}
if(_30c!=_30b.value){
_30b.value=_30c;
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
},_beforeUpdate:function(_30d){
var _30e=true;
if(_30d!=null){
_30d.__updateType=this.type;
_30e=UpdateAssistant.dispatchEvent(_30d,Update.EVENT_BEFOREUPDATE);
}
return _30e;
},_afterUpdate:function(_30f){
var _310=true;
if(_30f!=null){
_30f.__updateType=this.type;
_310=UpdateAssistant.dispatchEvent(_30f,Update.EVENT_AFTERUPDATE);
}
return _310;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_312){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_312;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _313,_314,_315=UpdateAssistant.toHTMLElement(this.element);
if((_313=document.getElementById(this.id))!=null){
if((_314=_313.parentNode)!=null){
var _316=UserInterface.getBinding(_313);
if(_316!=null){
_315.__isAttached=_316.isAttached;
}
if(this._beforeUpdate(_313)){
_314.replaceChild(_315,_313);
this._afterUpdate(_315);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_317){
var _318=ReplaceUpdate.superclass._afterUpdate.call(this,_317);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_317.nodeName=="form"||_317.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _318;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_31b,_31c){
this.type=type;
this.id=id;
this.element=_31b;
this.isFirst=_31c;
return this;
}
SiblingUpdate.prototype.update=function(){
var _31d=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_31d);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_31d);
break;
}
};
SiblingUpdate.prototype._remove=function(_31e){
var _31f=_31e.parentNode;
if(_31f!=null){
if(this._beforeUpdate(_31e)){
_31f.removeChild(_31e);
this._afterUpdate(_31f);
}
}
};
SiblingUpdate.prototype._insert=function(_320,_321){
var _322=UpdateAssistant.toHTMLElement(_320);
if(this.isFirst){
var _323=_321;
if(_323!=null){
if(this._beforeUpdate(_323)){
_323.insertBefore(_322,_323.firstChild);
this._afterUpdate(_322);
}
}
}else{
var _323=_321.parentNode;
if(_323!=null){
if(this._beforeUpdate(_323)){
_323.insertBefore(_322,_321.nextSibling);
this._afterUpdate(_322);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_324){
var _325=SiblingUpdate.superclass._beforeUpdate.call(this,_324);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_324.id+"\"");
}
return _325;
};
SiblingUpdate.prototype._afterUpdate=function(_326){
var _327=true;
if(_326!=null){
_327=SiblingUpdate.superclass._afterUpdate.call(this,_326);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_326.id+"\"");
if(_326.nodeName=="form"||_326.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _327;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_329,_32a){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_329;
this.currentElement=_32a;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _32b=document.getElementById(this.id);
if(this._beforeUpdate(_32b)){
this._updateAttributes(_32b);
this._afterUpdate(_32b);
}
};
AttributesUpdate.prototype._updateAttributes=function(_32c){
Array.forEach(this.element.attributes,function(_32d){
var _32e=this.currentElement.getAttribute(_32d.nodeName);
if(_32e==null||_32e!=_32d.nodeValue){
this._setAttribute(_32c,_32d.nodeName,_32d.nodeValue);
this._summary.push("@"+_32d.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_32f){
if(this.element.getAttribute(_32f.nodeName)==null){
this._setAttribute(_32c,_32f.nodeName,null);
this._summary.push("@"+_32f.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_330,name,_332){
if(_330==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_332);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _333=(_332==null);
if(_333){
_330.removeAttribute(name);
}else{
_330.setAttribute(name,_332);
}
if(document.all!=null){
if(_333){
_332="";
}
switch(name.toLowerCase()){
case "class":
_330.className=_332;
break;
case "disabled":
_330.disabled=!_333;
break;
case "checked":
_330.checked=!_333;
break;
case "readonly":
_330.readOnly=!_333;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_334){
AttributesUpdate.superclass._afterUpdate.call(this,_334);
UpdateManager.report("Attributes updated on element id=\""+this.id+"\": "+this._summary.toString());
};
AttributesUpdate.prototype.dispose=function(){
Update.prototype.dispose.call(this);
this.currentElement=null;
};
if(!window.Node){
window.Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};
}
window.KeyEventCodes={VK_BACK:8,VK_TAB:9,VK_ENTER:13,VK_SHIFT:16,VK_CONTROL:17,VK_ALT:null,VK_ESCAPE:27,VK_SPACE:32,VK_PAGE_UP:33,VK_PAGE_DOWN:34,VK_END:35,VK_HOME:36,VK_LEFT:37,VK_UP:38,VK_RIGHT:39,VK_DOWN:40,VK_COMMAND:91,VK_INSERT:null,VK_DELETE:127,VK_PLUS:187,VK_MINUS:189,VK_NUMPLUS:107,VK_NUMMINUS:109,VK_F1:112};
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_335,key){
return _335.replace("${windowkey}",document.location+":"+key);
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
var _339=this._newDimensions.w!=this._currentDimensions.w;
var _33a=this._newDimensions.h!=this._currentDimensions.h;
if(_339||_33a){
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
},fireOnDOM:function(_33c){
if(Interfaces.isImplemented(IDOMHandler,_33c,true)){
this._ondomstatements.add(_33c);
}
},fireOnLoad:function(_33d){
if(Interfaces.isImplemented(ILoadHandler,_33d,true)){
this._onloadstatements.add(_33d);
}
},fireOnResize:function(_33e){
if(Interfaces.isImplemented(IResizeHandler,_33e,true)){
this._onresizestatements.add(_33e);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_33f){
return eval(_33f);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_340,_341){
SystemLogger.unsuspend(_341);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_342,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _345=top.app.bindingMap.broadcasterHasDirtyTabs;
_345.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_346,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _349=top.app.bindingMap.broadcasterHasDirtyTabs;
_349.disable();
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
var _34a=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_34a=LoginService.Logout(true);
if(!_34a){
alert("Logout failed.");
}
}
return _34a;
},lock:function(_34b){
if(_34b!=null){
this._lockthings[_34b]=true;
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
},unlock:function(_34c,_34d){
if(_34c!=null){
delete this._lockthings[_34c];
if(top.bindingMap.mastercover!=null){
if(_34d||this._lockers>0){
if(_34d){
var out="Unlocked by "+new String(_34c)+"\n";
for(var _34f in this._lockthings){
out+="Locked by "+new String(_34f)+". ";
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
},hasLock:function(_350){
return this._lockthings[_350]==true;
},activate:function(_351){
var _352=this._activeBinding;
this._activeBinding=_351;
this._activatedBindings.add(_351);
if(_352&&_352.isActive){
_352.deActivate();
}
},deActivate:function(_353){
var _354=null;
var _355=null;
if(_353==this._activeBinding){
while(!_355&&this._activatedBindings.hasEntries()){
_354=this._activatedBindings.extractLast();
if(_354!=_353&&_354.isActivatable){
_355=_354;
}
}
if(!_355){
_355=app.bindingMap.explorerdock;
}
_355.activate();
}
},focused:function(_356){
this.isFocused=_356;
if(_356){
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
},handleAction:function(_35b){
switch(_35b.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _35d=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_35f){
var src=_35f.src;
if(src.indexOf(_35d)>-1){
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
var _364=false;
if(this._isMousePositionTracking){
_364=true;
if(Client.isExplorer&&e.button!=1){
_364=false;
}
if(_364){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _364;
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
},onDragStart:function(_366){
var _367=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_367,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_367.getImage());
this._cursorStartPoint=_366;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_367.showDrag){
_367.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_367.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _369=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_369);
}
},onDragStop:function(diff){
if(this._isDragging){
var _36b=BindingDragger.draggedBinding;
if(_36b.hideDrag){
_36b.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_36b.dragType);
this._isDragging=false;
_36b=BindingAcceptor.acceptingBinding;
if(_36b!=null){
if(Interfaces.isImplemented(IAcceptable,_36b,true)==true){
_36b.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_36b);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_36c){
if(this.isDeveloperMode||_36c){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_36d){
if(_36d==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_36e){
switch(_36e){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_370){
switch(_370.Key){
case "ProductVersion":
this.versionString=_370.Value;
break;
case "ProductTitle":
this.versionPrettyString=_370.Value;
break;
case "InstallationId":
this.installationID=_370.Value;
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
var _373=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _374={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _375=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_375){
for(var key in _375){
_374[key]=_375[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_374);
}
}});
this.getPref=function(key){
var _378=null;
if(key){
_378=_374[key];
}else{
throw "No such preference.";
}
return _378;
};
this.setPref=function(key,_37a){
if(key){
_374[key]=_37a;
}else{
throw "No such preference.";
}
};
function debug(_37b){
var _37c=_37b?"Persisted preferences":"No persisted preferences. Using defaults";
_37c+=":\n";
for(var key in _374){
var pref=_374[key];
_37c+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_373.fine(_37c);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _381=null;
if(this.isInitialized==true){
if(this._persistance){
var _382=this._persistance[id];
if(_382){
_381=_382[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _381;
},setPersistedProperty:function(id,prop,_385){
if(this.isInitialized==true){
if(this._persistance){
if(_385!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_385);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_386){
switch(_386){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _387=top.bindingMap.persistance;
_387.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _388=top.bindingMap.persistance;
var map=_388.getPersistanceMap();
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
function StandardEventHandler(doc,_38b){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_38b;
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
var _38f={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_38f);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_38f);
}
if(Client.isMozilla){
doc.addEventListener(DOMEvents.KEYDOWN,{handleEvent:function(e){
var s=83;
if(Client.isMac){
if(e.metaKey&&e.keyCode==s){
e.preventDefault();
}
}else{
if(e.ctrlKey&&e.keyCode==s){
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
var _396=UserInterface.getBinding(node);
if(_396!=null){
_396.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_396!=null?null:node.parentNode;
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
var _399=Application.trackMousePosition(e);
if(_399){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
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
if(_475.__isAttached!==false){
this._elementsbuffer.add(_475);
}
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
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _5a3={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_5a3);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_5a3);
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
var _5a5=null;
var _5a6=null;
var _5a7=false;
if(arg instanceof Action){
_5a5=arg;
}else{
if(Action.isValid(arg)){
_5a5=new Action(this,arg);
_5a7=true;
}
}
if(_5a5!=null&&Action.isValid(_5a5.type)==true){
if(_5a5.isConsumed==true){
_5a6=_5a5;
}else{
var _5a8=this.actionListeners[_5a5.type];
if(_5a8!=null){
_5a5.listener=this;
var i=0,_5aa;
while((_5aa=_5a8[i++])!=null){
if(_5aa&&_5aa.handleAction){
_5aa.handleAction(_5a5);
}
}
}
var _5ab=true;
if(this.isBlockingActions==true){
switch(_5a5.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a7){
_5ab=false;
}
break;
}
}
if(_5ab){
_5a6=this.migrateAction(_5a5);
}else{
_5a6=_5a5;
}
}
}
return _5a6;
};
Binding.prototype.migrateAction=function(_5ac){
var _5ad=null;
var _5ae=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5ad&&node.nodeType!=Node.DOCUMENT_NODE){
_5ad=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5ad){
_5ae=_5ad.dispatchAction(_5ac);
}else{
_5ae=_5ac;
}
}
return _5ae;
};
Binding.prototype.reflex=function(_5b0){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5b0);
}
};
Binding.prototype.getMigrationParent=function(){
var _5b1=null;
if(true){
try{
var _5b2=this.bindingElement.parentNode;
if(_5b2!=null){
_5b1=_5b2;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5b1=null;
}
}
return _5b1;
};
Binding.prototype.add=function(_5b3){
if(_5b3.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5b3.bindingElement);
}else{
throw "Could not add "+_5b3.toString()+" of different document origin.";
}
return _5b3;
};
Binding.prototype.addFirst=function(_5b4){
if(_5b4.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5b4.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5b4.toString()+" of different document origin.";
}
return _5b4;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5b5,_5b6){
return BindingFinder.getAncestorBindingByLocalName(this,_5b5,_5b6);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b8){
return BindingFinder.getAncestorBindingByType(this,impl,_5b8);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5ba){
return BindingFinder.getChildElementsByLocalName(this,_5ba);
};
Binding.prototype.getChildElementByLocalName=function(_5bb){
return this.getChildElementsByLocalName(_5bb).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5bc){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5bc));
};
Binding.prototype.getChildBindingsByLocalName=function(_5bd){
return this.getDescendantBindingsByLocalName(_5bd,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5be){
return this.getChildBindingsByLocalName(_5be).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5bf,_5c0){
return BindingFinder.getDescendantBindingsByLocalName(this,_5bf,_5c0);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5c1){
return this.getDescendantBindingsByLocalName(_5c1,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5c4){
return BindingFinder.getNextBindingByLocalName(this,_5c4);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5c5){
return BindingFinder.getPreviousBindingByLocalName(this,_5c5);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5c6){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5c6);
};
Binding.prototype.isFirstBinding=function(_5c7){
return (this.getOrdinalPosition(_5c7)==0);
};
Binding.prototype.isLastBinding=function(_5c8){
return DOMUtil.isLastElement(this.bindingElement,_5c8);
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
Binding.prototype.setCallBackArg=function(_5ca){
this.setProperty(Binding.CALLBACKARG,_5ca);
};
Binding.prototype.dispose=function(_5cb){
if(!this.isDisposed){
if(!_5cb){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5cc=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5cc){
if(Client.isExplorer){
_5cc.outerHTML="";
}else{
_5cc.parentNode.removeChild(_5cc);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5cf){
list.add(_5cf);
});
list.each(function(_5d0){
self.unsubscribe(_5d0);
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
Binding.prototype.wakeUp=function(_5d2,_5d3){
_5d3=_5d3?_5d3:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5d2!==undefined){
self[_5d2]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5d3);
},0);
}
};
Binding.prototype.handleCrawler=function(_5d5){
if(_5d5.response==null&&this.isLazy==true){
if(_5d5.id==DocumentCrawler.ID&&_5d5.mode==DocumentCrawler.MODE_REGISTER){
_5d5.response=NodeCrawler.NORMAL;
}else{
_5d5.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d5.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5d5.id)){
_5d5.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d5.response==null){
switch(_5d5.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5d5.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5d6){
var _5d7=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5d6);
return UserInterface.registerBinding(_5d7,Binding);
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
var _5d8=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d8.each(function(_5d9){
DataBinding.expressions[_5d9.Key]=new RegExp(_5d9.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5da){
var _5db=null;
var _5dc=_5da.getAncestorBindingByLocalName("field");
if(_5dc&&_5dc instanceof FieldBinding){
var desc=_5dc.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5db=desc.getLabel();
}
}
return _5db;
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
var _5df=this.bindingWindow.DataManager;
_5df.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5e1=this.bindingWindow.DataManager;
if(_5e1.getDataBinding(name)){
_5e1.unRegisterDataBinding(name);
}
_5e1.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5e2,arg){
RootBinding.superclass.handleBroadcast.call(this,_5e2,arg);
var _5e4=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5e2){
case _5e4:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5e4);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5e5){
var _5e6=_5e5?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5e5!=this.isActivated){
this.isActivated=_5e5;
this.dispatchAction(_5e6);
var _5e7=new List();
var self=this;
this._activationawares.each(function(_5e9){
if(_5e9.isActivationAware){
try{
if(_5e5){
if(!_5e9.isActivated){
_5e9.onActivate();
}
}else{
if(_5e9.isActivated){
_5e9.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e7.add(_5e9);
}
}
});
_5e7.each(function(_5ea){
this._activationawares.del(_5ea);
});
_5e7.dispose();
}else{
var _5eb="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5eb);
}else{
this.logger.error(_5eb);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5ec,_5ed){
if(Interfaces.isImplemented(IActivationAware,_5ec,true)==true){
if(_5ed==false){
this._activationawares.del(_5ec);
}else{
this._activationawares.add(_5ec);
if(this.isActivated==true){
_5ec.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5ec+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5ee){
var _5ef=this.getMigrationParent();
if(_5ef!=null){
var root=_5ef.ownerDocument.body;
var _5f1=UserInterface.getBinding(root);
if(_5f1!=null){
_5f1.makeActivationAware(this,_5ee);
}
}
};
RootBinding.prototype.handleCrawler=function(_5f2){
RootBinding.superclass.handleCrawler.call(this,_5f2);
if(_5f2.type==NodeCrawler.TYPE_ASCENDING){
_5f2.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5f3=null;
if(this.bindingWindow.parent){
_5f3=this.bindingWindow.frameElement;
}
return _5f3;
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
var _5f4=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5f4.hasNext()){
var cell=_5f4.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5f6){
var _5f7=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5f6.bindingElement);
_5f7=_5f6;
}else{
_5f7=MatrixBinding.superclass.add.call(this,_5f6);
}
return _5f7;
};
MatrixBinding.prototype.addFirst=function(_5f8){
var _5f9=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5fa=this.shadowTree[MatrixBinding.CENTER];
_5fa.insertBefore(_5f8.bindingElement,_5fa.firstChild);
_5f9=_5f8;
}else{
_5f9=MatrixBinding.superclass.addFirst.call(this,_5f8);
}
return _5f8;
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
MatrixBinding.newInstance=function(_5fc){
var _5fd=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5fc);
return UserInterface.registerBinding(_5fd,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5fe,_5ff){
var list=new List();
var _601=new FlexBoxCrawler();
_601.mode=_5ff?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_601.startBinding=_5fe;
_601.crawl(_5fe.bindingElement,list);
list.each(function(_602){
_602.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_603){
if(Binding.exists(_603)){
_603.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_604){
if(Binding.exists(_604)){
_604.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_601.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_605){
FlexBoxBinding.superclass.handleAction.call(this,_605);
switch(_605.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_606){
var _607=0;
var _608=new List(this.bindingElement.parentNode.childNodes);
while(_608.hasNext()){
var _609=_608.getNext();
if(_609.nodeType==Node.ELEMENT_NODE&&_609!=this.bindingElement){
if(!this._isOutOfFlow(_609)){
var rect=_609.getBoundingClientRect();
if(_606){
height+=(rect.right-rect.left);
}else{
_607+=(rect.bottom-rect.top);
}
}
}
}
return _607;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_60b){
var _60c=CSSComputer.getPosition(_60b);
var _60d=CSSComputer.getFloat(_60b);
return (_60c=="absolute"||_60d!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _60e=this.bindingElement.parentNode;
var rect=_60e.getBoundingClientRect();
var _610=rect.bottom-rect.top;
var _611=CSSComputer.getPadding(_60e);
var _612=CSSComputer.getBorder(_60e);
_610-=(_611.top+_611.bottom);
_610-=(_612.top+_612.bottom);
return _610;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _613=this.bindingElement.parentNode;
var rect=_613.getBoundingClientRect();
var _615=rect.right-rect.left;
var _616=CSSComputer.getPadding(_613);
var _617=CSSComputer.getBorder(_613);
_615-=(_616.left+_616.right);
_615-=(_617.left+_617.right);
return _615;
};
FlexBoxBinding.prototype.setFlexibility=function(_618){
if(_618!=this.isFlexible){
if(_618){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_618;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _619=this._getSiblingsSpan();
_619=this._getCalculatedHeight()-_619;
if(!isNaN(_619)&&_619>=0){
this.bindingElement.style.height=String(_619)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_61a){
if(!this.isFit||_61a){
var _61b=0;
new List(this.bindingElement.childNodes).each(function(_61c){
if(_61c.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_61c)){
var rect=_61c.getBoundingClientRect();
_61b+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_61b);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_61e){
var _61f=CSSComputer.getPadding(this.bindingElement);
var _620=CSSComputer.getBorder(this.bindingElement);
_61e+=_61f.top+_61f.bottom;
_61e+=_620.top+_620.bottom;
this.bindingElement.style.height=_61e+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_621){
ScrollBoxBinding.superclass.handleAction.call(this,_621);
switch(_621.type){
case BalloonBinding.ACTION_INITIALIZE:
_621.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_622){
this.bindingElement.scrollLeft=_622.x;
this.bindingElement.scrollTop=_622.y;
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
var _623=this._getBuildElement("labeltext");
if(_623){
this.shadowTree.labelText=_623;
this.shadowTree.text=_623.firstChild;
this.hasLabel=true;
}
}else{
var _624=this.getProperty("label");
var _625=this.getProperty("image");
var _626=this.getProperty("tooltip");
if(_624){
this.setLabel(_624,false);
}
if(_625){
this.setImage(_625,false);
}
if(_626){
this.setToolTip(_626);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_627,_628){
_627=_627!=null?_627:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_627);
this.setProperty("label",_627);
if(!_628){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_62a){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _62b=Resolver.resolve(url);
if(_62b.classes){
this.setAlphaTransparentBackdrop(false);
this.setImageClasses(_62b.classes);
}else{
this.setImageClasses();
this.setAlphaTransparentBackdrop(_62b);
}
this.setProperty("image",url);
this.hasImage=true;
if(!_62a){
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
LabelBinding.prototype.setImageClasses=function(_62c){
if(this.shadowTree.labelBody){
this.shadowTree.labelBody.className=_62c;
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
LabelBinding.prototype.setToolTip=function(_62f){
this.setProperty("tooltip",_62f);
if(_62f!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_62f));
}
};
LabelBinding.prototype.getToolTip=function(_630){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_631){
_631=_631==null?true:_631;
var _632=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_631;
if(_631){
this.attachClassName(_632);
}else{
this.detachClassName(_632);
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
var _633="textonly";
var _634="imageonly";
var _635="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_633);
this.detachClassName(_634);
this.attachClassName(_635);
}else{
if(this.hasLabel){
this.detachClassName(_635);
this.detachClassName(_634);
this.attachClassName(_633);
}else{
if(this.hasImage){
this.detachClassName(_635);
this.detachClassName(_633);
this.attachClassName(_634);
}
}
}
};
LabelBinding.newInstance=function(_636){
var _637=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_636);
return UserInterface.registerBinding(_637,LabelBinding);
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
var _638=this.getProperty("label");
if(!_638){
_638=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_638));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_63a){
this.setProperty("label",_63a);
};
TextBinding.newInstance=function(_63b){
var _63c=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_63b);
return UserInterface.registerBinding(_63c,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_63d,_63e){
BroadcasterBinding.superclass.setProperty.call(this,_63d,_63e);
function update(list){
if(list){
list.each(function(_640){
_640.setProperty(_63d,_63e);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _641=this._observers[_63d];
if(_641){
update(_641);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_642){
BroadcasterBinding.superclass.deleteProperty.call(this,_642);
function update(list){
if(list){
list.each(function(_644){
_644.deleteProperty(_642);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _645=this._observers[_642];
if(_645){
update(_645);
}
};
BroadcasterBinding.prototype.addObserver=function(_646,_647){
_647=_647?_647:"*";
_647=new List(_647.split(" "));
while(_647.hasNext()){
var _648=_647.getNext();
switch(_648){
case "*":
this._setAllProperties(_646);
break;
default:
var _649=this.getProperty(_648);
_646.setProperty(_648,_649);
break;
}
if(!this._observers[_648]){
this._observers[_648]=new List();
}
this._observers[_648].add(_646);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_64a){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _64d=att.nodeName;
switch(_64d){
case "id":
case "key":
break;
default:
var _64e=this.getProperty(_64d);
_64a.setProperty(_64d,_64e);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_64f,_650){
_650=_650?_650:"*";
_650=new List(_650.split(" "));
while(_650.hasNext()){
var list=this._observers[_650.getNext()];
if(list){
while(list.hasNext()){
var _652=list.getNext();
if(_652==_64f){
list.del(_652);
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
BroadcasterBinding.prototype.setDisabled=function(_653){
this.setProperty("isdisabled",_653);
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
var _655=this.getProperty("width");
var _656=this.getProperty("label");
var type=this.getProperty("type");
var _658=this.getProperty("popup");
var _659=this.getProperty("tooltip");
var _65a=this.getProperty("isdisabled");
var _65b=this.getProperty("response");
var _65c=this.getProperty("oncommand");
var _65d=this.getProperty("value");
var _65e=this.getProperty("ischecked");
var _65f=this.getProperty("callbackid");
var _660=this.getProperty("focusable");
var _661=this.getProperty("focused");
var _662=this.getProperty("default");
var url=this.getProperty("url");
var _664=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_664){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_656!=null){
this.setLabel(_656);
}
if(type!=null){
this.setType(type);
}
if(_659!=null){
this.setToolTip(_659);
}
if(_655!=null){
this.setWidth(_655);
}
if(_658!=null){
this.setPopup(_658);
}
if(_65b!=null){
this.response=_65b;
}
if(_65e==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_65c!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_65c,this);
};
}
if(_660||this.isFocusable){
this._makeFocusable();
if(_662||this.isDefault){
this.isDefault=true;
}
if(_661){
this.focus();
}
}
if(_65a==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_65f!=null){
this.bindingWindow.DataManager.registerDataBinding(_65f,this);
if(_65d!=null){
Binding.dotnetify(this,_65d);
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
ButtonBinding.prototype.setImage=function(_665){
if(this.isAttached){
this.labelBinding.setImage(_665);
}
this.setProperty("image",_665);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_666){
if(this.isAttached){
this.labelBinding.setLabel(_666);
}
this.setProperty("label",_666);
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
ButtonBinding.prototype.setToolTip=function(_668){
this.setProperty("tooltip",_668);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_668));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_669){
this.imageProfile=new _669(this);
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
ButtonBinding.prototype.flip=function(_66e){
_66e=_66e==null?true:_66e;
this.isFlipped=_66e;
this.setProperty("flip",_66e);
if(this.isAttached){
this.labelBinding.flip(_66e);
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
ButtonBinding.prototype.check=function(_66f){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_66f==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_670){
this.isActive=true;
this.isChecked=true;
if(!_670){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_671){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_671==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_672){
this.isActive=false;
this.isChecked=false;
if(!_672){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_673,_674){
if(_673==null){
_673==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_673){
case true:
this.check(_674);
break;
case false:
this.uncheck(_674);
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
var _676=this.getProperty("tooltip");
if(_676){
this.setToolTip(_676);
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
var _677=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_677=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _677;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _679=this.getEqualSizeWidth();
if(goal>_679){
var diff=goal-_679;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _67c=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_67d){
if(_67d>=0){
this.bindingElement.style.width=new String(_67d+"px");
}
this.setProperty("width",_67d);
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
ButtonBinding.prototype.setValue=function(_67e){
this.shadowTree.dotnetinput.value=_67e;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_67f){
this.setValue(_67f);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_680){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_680;
this.imageProfile=_680.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_681){
var _682=_681?"addEventListener":"removeEventListener";
this.binding[_682](DOMEvents.MOUSEENTER,this);
this.binding[_682](DOMEvents.MOUSELEAVE,this);
this.binding[_682](DOMEvents.MOUSEDOWN,this);
this.binding[_682](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _684=false,_685=false,_686=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_686=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_686=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_686=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_686=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_686==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_684=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_686=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_686=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_686=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_686=ButtonStateManager.STATE_NORMAL;
var _687=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_687 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_686=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_686==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_685=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_686=ButtonStateManager.STATE_NORMAL;
_684=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_686=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_686=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_686=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_686=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_686==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_684=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_686=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_686=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_686=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_686=ButtonStateManager.STATE_NORMAL;
_684=true;
break;
}
}
}
}
}
switch(_686){
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
if(_684){
this.binding.fireCommand();
}
if(_685){
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
var _68b=this.imageProfile.getDisabledImage();
if(_68b){
this.binding.setImage(_68b);
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
ClickButtonBinding.newInstance=function(_68c){
var _68d=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_68c);
return UserInterface.registerBinding(_68d,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_68e){
var _68f=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_68e);
return UserInterface.registerBinding(_68f,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_690){
var _691=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_690);
return UserInterface.registerBinding(_691,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_692){
this._binding=_692;
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
var _693=this.getDescendantBindingsByLocalName("control");
_693.each(function(_694){
_694.setControlType(_694.controlType);
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
ControlGroupBinding.newInstance=function(_696){
var _697=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_696);
return UserInterface.registerBinding(_697,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_69a){
ControlBinding.superclass.handleAction.call(this,_69a);
switch(_69a.type){
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
function ControlImageProfile(_69b){
this.binding=_69b;
}
ControlImageProfile.prototype._getImage=function(_69c){
var _69d=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_69d=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_69d=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_69d=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_69d=this.constructor.IMAGE_CLOSE;
break;
}
return _69d.replace("${string}",_69c);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _69e=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_69e=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _69e?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_69f){
ControlBoxBinding.superclass.handleAction.call(this,_69f);
switch(_69f.type){
case ControlBinding.ACTION_COMMAND:
var _6a0=_69f.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6a0);
Application.unlock(self);
},0);
_69f.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6a2){
switch(_6a2.controlType){
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
ControlBoxBinding.prototype.setState=function(_6a3){
var _6a4=this.getState();
this.setProperty("state",_6a3);
this.detachClassName(_6a4);
this.attachClassName(_6a3);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6a5=this.getProperty("state");
if(!_6a5){
_6a5=ControlBoxBinding.STATE_NORMAL;
}
return _6a5;
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
MenuContainerBinding.prototype.isOpen=function(_6a6){
var _6a7=null;
if(!_6a6){
_6a7=this._isOpen;
}else{
_6a7=(_6a6==this._openElement);
}
return _6a7;
};
MenuContainerBinding.prototype.setOpenElement=function(_6a8){
if(_6a8){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6a8;
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
var _6a9=this.getChildBindingByLocalName("menupopup");
if(_6a9&&_6a9!=this.menuPopupBinding){
this.menuPopupBinding=_6a9;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6aa=this.getMenuContainerBinding();
_6aa.setOpenElement(this);
var _6ab=this.getMenuPopupBinding();
_6ab.snapTo(this.bindingElement);
_6ab.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6ac){
MenuContainerBinding.superclass.handleAction.call(this,_6ac);
if(_6ac.type==PopupBinding.ACTION_HIDE){
var _6ad=this.getMenuContainerBinding();
_6ad.setOpenElement(false);
this.reset();
_6ac.consume();
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
MenuBarBinding.prototype.handleAction=function(_6ae){
MenuBarBinding.superclass.handleAction.call(this,_6ae);
switch(_6ae.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6af=_6ae.target;
var _6b0=this.getChildBindingsByLocalName("menu");
while(_6b0.hasNext()){
var menu=_6b0.getNext();
}
switch(_6af.arrowKey){
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
var _6b2=this.getProperty("image");
var _6b3=this.getProperty("label");
var _6b4=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6b3){
this.setLabel(_6b3);
}
if(_6b2){
this.setImage(_6b2);
}
if(_6b4){
this.setToolTip(_6b4);
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
MenuBinding.prototype.setLabel=function(_6b6){
this.setProperty("label",_6b6);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6b6));
}
};
MenuBinding.prototype.setToolTip=function(_6b7){
this.setProperty("tooltip",_6b7);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6b7));
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
var _6b9=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6b9.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6b9.isOpen()&&!_6b9.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6b9.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6b9.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6ba,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6ba){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6bf){
switch(_6bf.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6c0=null;
var _6c1=true;
self._lastFocused.focus();
self.grabKeyboard();
_6bf.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6c3){
for(var key in this._focused){
if(key!=_6c3.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6c3.key]=_6c3;
this._lastFocused=_6c3;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6c6){
delete this._focused[_6c6.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6c7){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6c7);
}
if(_6c7){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6ca=this.getChildBindingsByLocalName("menugroup");
var _6cb=null;
var _6cc=null;
while(_6ca.hasNext()){
var _6cd=_6ca.getNext();
if(!_6cd.isDefaultContent){
_6cd.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6cb&&_6cd.isVisible){
_6cb=_6cd;
}
if(_6cd.isVisible){
_6cc=_6cd;
}
}
}
if(_6cb&&_6cc){
_6cb.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6cc.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6ce){
MenuBodyBinding.activeInstance=this;
if(_6ce){
var _6cf=this._getMenuItems().getFirst();
if(_6cf){
_6cf.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6d0=this._lastFocused;
if((_6d0!=null)&&(!_6d0.isMenuContainer)){
_6d0.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6d2=this._getMenuItems();
var _6d3=null;
var next=null;
if(this._lastFocused){
_6d3=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6d2.getPreceding(_6d3);
break;
case KeyEventCodes.VK_DOWN:
next=_6d2.getFollowing(_6d3);
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
next=_6d2.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6d6=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6d7){
_6d6=_6d7.getChildBindingsByLocalName("menuitem");
_6d6.each(function(item){
list.add(item);
});
});
_6d6=this.getChildBindingsByLocalName("menuitem");
_6d6.each(function(item){
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
MenuBodyBinding.newInstance=function(_6da){
var _6db=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6da);
return UserInterface.registerBinding(_6db,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6dc){
switch(_6dc){
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
MenuGroupBinding.newInstance=function(_6dd){
var _6de=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6dd);
return UserInterface.registerBinding(_6de,MenuGroupBinding);
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
var _6df=this.getProperty("image");
var _6e0=this.getProperty("image-hover");
var _6e1=this.getProperty("image-active");
var _6e2=this.getProperty("image-disabled");
if(!this.image&&_6df){
this.image=_6df;
}
if(!this.imageHover&&_6e0){
this.imageHover=_6df;
}
if(!this.imageActive&&_6e1){
this.imageActive=_6e1;
}
if(!this.imageDisabled&&_6e2){
this.imageDisabled=_6e2;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6e3=this.getProperty("label");
var _6e4=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6e6=this.getProperty("isdisabled");
var _6e7=this.getProperty("image");
var _6e8=this.getProperty("image-hover");
var _6e9=this.getProperty("image-active");
var _6ea=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6eb=this.getMenuPopupBinding();
if(_6eb){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
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
if(this.image||this.imageHover||this.imageActive||this.imageDisabled){
this.imageProfile=new ImageProfile(this);
}
}
if(this.imageProfile){
this.setImage(this.imageProfile.getDefaultImage());
}else{
this.setImage(null);
}
if(_6e3!=null){
this.setLabel(_6e3);
}
if(_6e4){
this.setToolTip(_6e4);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6e6==true){
this.disable();
}
var _6ec=this.getProperty("oncommand");
if(_6ec){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6ec);
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
MenuItemBinding.prototype.setLabel=function(_6ef){
this.setProperty("label",_6ef);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6ef));
}
};
MenuItemBinding.prototype.setToolTip=function(_6f0){
this.setProperty("tooltip",_6f0);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6f0));
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
var _6f2=this.bindingDocument.createElement("div");
_6f2.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6f2.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6f3=this.labelBinding.bindingElement;
_6f3.insertBefore(_6f2,_6f3.firstChild);
_6f2.style.display="none";
this.shadowTree.checkBoxIndicator=_6f2;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6f2=this.bindingDocument.createElement("div");
_6f2.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6f2.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6f3=this.labelBinding.bindingElement;
_6f3.insertBefore(_6f2,_6f3.firstChild);
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
var _6f5=this.imageProfile.getDisabledImage();
if(_6f5){
this.setImage(_6f5);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6f5=this.imageProfile.getDefaultImage();
if(_6f5){
this.setImage(_6f5);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6f7=this.getMenuContainerBinding();
if(_6f7.isOpen()&&!_6f7.isOpen(this)){
_6f7._openElement.hide();
_6f7.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6f7=this.getMenuContainerBinding();
if(!_6f7.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6f9){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6fa=this.getMenuContainerBinding();
if(!_6fa||!_6fa.isOpen(this)||_6f9){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6fb){
this.setChecked(true,_6fb);
};
MenuItemBinding.prototype.uncheck=function(_6fc){
this.setChecked(false,_6fc);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6fd,_6fe){
this.setProperty("ischecked",_6fd);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6fd){
this.isChecked=_6fd;
this.shadowTree.checkBoxIndicator.style.display=_6fd?"block":"none";
if(!_6fe){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6ff){
var _700=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6ff);
UserInterface.registerBinding(_700,MenuItemBinding);
return UserInterface.getBinding(_700);
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
PopupBinding.handleBroadcast=function(_701,arg){
switch(_701){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _705=PopupBinding.activeInstances.get(key);
var _706=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_705);
if(!_706){
list.add(_705);
}
});
list.each(function(_707){
_707.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _709=PopupBinding.activeInstances.get(key);
_709.hide();
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
var _70a=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _70b=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_70a){
this._bodyBinding=UserInterface.getBinding(_70a);
}else{
if(_70b){
this._bodyBinding=UserInterface.getBinding(_70b);
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
var _70c=this.getProperty("position");
this.position=_70c?_70c:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_70d){
var _70e=null;
if(this._bodyBinding){
this._bodyBinding.add(_70d);
_70e=_70d;
}else{
_70e=PopupBinding.superclass.add.call(this,_70d);
}
return _70e;
};
PopupBinding.prototype.addFirst=function(_70f){
var _710=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_70f);
_710=_70f;
}else{
_710=PopupBinding.superclass.addFirst.call(this,_70f);
}
return _710;
};
PopupBinding.prototype.handleAction=function(_711){
PopupBinding.superclass.handleAction.call(this,_711);
var _712=_711.target;
switch(_711.type){
case Binding.ACTION_ATTACHED:
if(_712 instanceof MenuItemBinding){
this._count(true);
_711.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_712 instanceof MenuItemBinding){
this._count(false);
_711.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_713){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_713?1:-1);
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
PopupBinding.prototype.snapTo=function(_714){
var _715=this._getElementPosition(_714);
switch(this.position){
case PopupBinding.POSITION_TOP:
_715.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_715.x+=_714.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_715.y+=_714.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_715.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_714;
this.bindingElement.style.display="block";
this.setPosition(_715.x,_715.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_717){
this.bindingElement.style.display="block";
this.setPosition(_717.x,_717.y);
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
PopupBinding.prototype._getElementPosition=function(_71c){
return _71c.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_71c):DOMUtil.getUniversalPosition(_71c);
};
PopupBinding.prototype._getMousePosition=function(e){
var _71e=DOMEvents.getTarget(e);
return _71e.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_71f){
var _720=this.bindingElement;
if(_71f){
_720.style.visibility="visible";
}else{
_720.style.visibility="hidden";
_720.style.display="none";
}
this.isVisible=_71f;
};
PopupBinding.prototype._enableTab=function(_721){
var self=this;
var _723=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_723.each(function(_724){
_724.bindingElement.tabIndex=_721?0:-1;
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
var _72c=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_72c.y<0){
y=-_72c.y;
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
PopupBinding.prototype.grabKeyboard=function(_72e){
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
var _734=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_734=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _734;
};
PopupBinding.prototype.clear=function(){
var _735=this._bodyBinding;
if(_735){
_735.detachRecursive();
_735.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_736){
var _737=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_736);
return UserInterface.registerBinding(_737,PopupBinding);
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
PopupBodyBinding.newInstance=function(_739){
var _73a=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_739);
return UserInterface.registerBinding(_73a,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_73b){
return new Point(_73b.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_73c){
var _73d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_73c);
return UserInterface.registerBinding(_73d,MenuPopupBinding);
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
var _73e=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_73e){
this._body=UserInterface.getBinding(_73e);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _73f=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_73f.hasNext()){
var _740=DialogBorderBinding.newInstance(this.bindingDocument);
_740.setType(_73f.getNext());
this.add(_740);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _741=this.getProperty("controls");
if(_741){
var _742=new List(_741.split(" "));
while(_742.hasNext()){
var type=_742.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _744=DialogControlBinding.newInstance(this.bindingDocument);
_744.setControlType(type);
this._titlebar.addControl(_744);
this.controlBindings[type]=_744;
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
var _745=this.getProperty("image");
var _746=this.getProperty("label");
var _747=this.getProperty("draggable");
var _748=this.getProperty("resizable");
var _749=this.getProperty("modal");
if(_745){
this.setImage(_745);
}
if(_746){
this.setLabel(_746);
}
if(_747==false){
this.isDialogDraggable=false;
}
if(_748==false){
this.isPanelResizable=false;
}
if(_749==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_74a){
this.isModal=_74a;
};
DialogBinding.prototype.setLabel=function(_74b){
this.setProperty("label",_74b);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_74b));
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
DialogBinding.prototype.handleAction=function(_74d){
DialogBinding.superclass.handleAction.call(this,_74d);
switch(_74d.type){
case Binding.ACTION_DRAG:
var _74e=_74d.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_74e.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_74e.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_74e;
_74e.dragger.registerHandler(this);
}
break;
}
}
_74d.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_74d.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_74f,arg){
DialogBinding.superclass.handleBroadcast.call(this,_74f,arg);
switch(_74f){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_751){
DialogBinding.superclass.handleInvokedControl.call(this,_751);
switch(_751.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_752){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_752){
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
var _754=self.bindingElement;
setTimeout(function(){
_754.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_755){
this.bindingElement.style.zIndex=new String(_755);
};
DialogBinding.prototype.onDragStart=function(_756){
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
DialogBinding.prototype.setResizable=function(_768){
if(this._isResizable!=_768){
if(_768){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_768;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _769=null;
var _76a=this.bindingDocument.body.offsetWidth;
var _76b=this.bindingDocument.body.offsetHeight;
_769={x:0.125*_76a,y:0.125*_76b,w:0.75*_76a,h:0.5*_76b};
return _769;
};
DialogBinding.prototype.centerOnScreen=function(){
var _76c=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_76c.w-dim.w),0.5*(_76c.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _76e=this;
var i=0;
function blink(){
if(i%2==0){
_76e.detachClassName("active");
}else{
_76e.attachClassName("active");
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
var _772="";
while(list.hasNext()){
var type=list.getNext();
_772+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_772);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_773){
var _774=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_773);
return UserInterface.registerBinding(_774,DialogBinding);
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
DialogHeadBinding.newInstance=function(_775){
var _776=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_775);
return UserInterface.registerBinding(_776,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_779){
var _77a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_779);
return UserInterface.registerBinding(_77a,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_77b){
var _77c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_77b);
return UserInterface.registerBinding(_77c,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_77d){
DialogSetBinding.superclass.handleAction.call(this,_77d);
var _77e=_77d.target;
switch(_77d.type){
case Binding.ACTION_MOVETOTOP:
if(_77e instanceof DialogBinding){
this._moveToTop(_77e);
}
break;
case Binding.ACTION_MOVEDONTOP:
_77d.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_77f){
var _780=0;
var _781=this.getChildBindingsByLocalName("dialog");
_781.each(function(_782){
var _783=_782.getZIndex();
_780=_783>_780?_783:_780;
});
_77f.setZIndex(_780+2);
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
DialogBorderBinding.newInstance=function(_785){
var _786=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_785);
return UserInterface.registerBinding(_786,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_787){
this._dialogBinding=_787;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_789){
DialogCoverBinding.superclass.handleAction.call(this,_789);
var _78a=_789.target;
if(this._dialogBinding.isModal){
switch(_789.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_78a==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_78a.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_78b,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_78b,arg);
switch(_78b){
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
var _78e=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_78e);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _78f=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_78f);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_790){
var _791=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_790);
return UserInterface.registerBinding(_791,DialogCoverBinding);
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
var _792=this.getProperty("image");
if(_792){
this.setImage(_792);
}
var _793=this.getProperty("label");
if(_793){
this.setLabel(_793);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_794){
if(this.isAttached){
this.labelBinding.setLabel(_794);
}
this.setProperty("label",_794);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_796){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_796);
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
DialogTitleBarBinding.newInstance=function(_797){
var _798=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_797);
return UserInterface.registerBinding(_798,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_799){
var _79a=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_799);
return UserInterface.registerBinding(_79a,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_79b){
var _79c=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_79b);
return UserInterface.registerBinding(_79c,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_79d){
this.binding=_79d;
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
var _7a0=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a1=node.nodeName.toLowerCase();
switch(_7a1){
case "script":
case "style":
case "textarea":
_7a0=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7a0;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a8=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a8=false;
}
return _7a8;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7a9,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7a9,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7ad=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7ad+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b3){
var _7b4="";
var _7b5="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b6="</span>";
var self=this;
function iterate(_7b8){
var _7b9=-1;
var _7ba=null;
self._map.each(function(key,exp){
var low=_7b8.toLowerCase();
var _7be=low.search(exp);
if(_7be>-1){
if(_7b9==-1){
_7b9=_7be;
}
if(_7be<=_7b9){
_7b9=_7be;
_7ba=key;
}
}
});
if(_7b9>-1&&_7ba!=null){
var pre=_7b8.substring(0,_7b9);
var hit=_7b8.substring(_7b9,_7b9+_7ba.length);
var pst=_7b8.substring(_7b9+_7ba.length,_7b8.length);
_7b4+=pre+_7b5+hit+_7b6;
iterate(pst);
}else{
_7b4+=_7b8;
}
}
iterate(_7b3);
return _7b4;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c2){
var _7c3=new List(_7c2.getElementsByTagName("span"));
_7c3.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c2.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c6){
var _7c7=null;
if(_7c6.isAttached){
var doc=_7c6.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c7=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c7 instanceof SOAPFault){
_7c7=null;
}
}
}
return _7c7;
};
WindowBinding.highlightKeywords=function(_7cb,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7cb.isAttached){
var doc=_7cb.getContentDocument();
if(doc!=null){
var _7ce=WindowBinding._highlightcrawler;
_7ce.reset(doc.body);
if(list!=null){
_7ce.setKeys(list);
_7ce.crawl(doc.body);
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
var _7cf=WindowBinding.superclass.serialize.call(this);
if(_7cf){
_7cf.url=this.getURL();
}
return _7cf;
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
var _7d1=this.getContentWindow().DocumentManager;
if(_7d1!=null){
_7d1.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d2){
WindowBinding.superclass.handleAction.call(this,_7d2);
var _7d3=_7d2.target;
switch(_7d2.type){
case RootBinding.ACTION_PHASE_3:
if(_7d3.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d3);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d2.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7d4){
if(!this.isFit||_7d4){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7d5){
if(this._pageBinding==null){
if(_7d5.bindingWindow==this.getContentWindow()){
this._pageBinding=_7d5;
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
WindowBinding.prototype._registerOnloadListener=function(_7d6){
var _7d7=this.shadowTree.iframe;
var _7d8=_7d6?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7db=true;
if(Client.isExplorer){
_7db=_7d7.readyState=="complete";
}
if(_7db==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d8](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7dc){
var _7dd=_7dc?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7dd](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7e2=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7e2.getQueryString().each(function(name,_7e4){
if(_7e4.length>512){
data.set(name,_7e4);
_7e2.setParam(name,null);
}
});
url=_7e2.toString();
}
if(data){
var self=this;
var _7e6=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7e6.id;
form.setAttribute("target",_7e6.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7e9){
var _7ea=self.bindingDocument.createElement("input");
_7ea.name=name;
_7ea.value=_7e9;
_7ea.type="hidden";
form.appendChild(_7ea);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7eb=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7eb=url;
}
return _7eb;
};
WindowBinding.prototype.reload=function(_7ed){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7ee=null;
if(this.shadowTree.iframe!=null){
_7ee=this.shadowTree.iframe;
}
return _7ee;
};
WindowBinding.prototype.getContentWindow=function(){
var _7ef=null,_7f0=this.getFrameElement();
if(_7f0!==null){
try{
_7ef=_7f0.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7ef;
};
WindowBinding.prototype.getContentDocument=function(){
var _7f1=null,win=this.getContentWindow();
if(win){
_7f1=win.document;
}
return _7f1;
};
WindowBinding.prototype.getRootBinding=function(){
var _7f3=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7f3=UserInterface.getBinding(doc.body);
}
return _7f3;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7f5){
this.bindingElement.style.height=_7f5+"px";
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
WindowBinding.prototype.handleCrawler=function(_7f6){
WindowBinding.superclass.handleCrawler.call(this,_7f6);
if(_7f6.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7f6.nextNode=root.bindingElement;
}else{
_7f6.response=NodeCrawler.SKIP_CHILDREN;
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
var _7fb=this.getContentWindow();
if(_7fb!=null&&_7fb.document!=null&&_7fb.document.body!=null){
_7fb.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
}
};
WindowBinding.newInstance=function(_7fc){
var _7fd=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7fc);
var _7fe=UserInterface.registerBinding(_7fd,WindowBinding);
return _7fe;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_802){
_802.target.show();
_802.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_804){
_804.target.show();
_804.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_806){
PreviewWindowBinding.superclass.handleAction.call(this,_806);
switch(_806.type){
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
var _807=null;
this._getRadioButtonBindings().each(function(_808){
if(_808.getProperty("ischecked")){
_807=_808;
return false;
}else{
return true;
}
});
if(_807){
this._checkedRadioBinding=_807;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_809){
RadioGroupBinding.superclass.handleAction.call(this,_809);
var _80a=_809.target;
switch(_809.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_809.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_80a.isRadioButton&&!_80a.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_80a);
}
this._checkedRadioBinding=_80a;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_809.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_80b,_80c){
if(_80b instanceof RadioDataBinding){
_80b=_80b.getButton();
}
if(_80b.isRadioButton){
switch(_80c){
case true:
this._unCheckRadioBindingsExcept(_80b);
this._checkedRadioBinding=_80b;
_80b.check(true);
break;
default:
_80b.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_80d){
var _80e=this._getRadioButtonBindings();
_80e.each(function(_80f){
if(_80f.isChecked&&_80f!=_80d){
_80f.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _810=new Crawler();
var list=new List();
_810.addFilter(function(_812){
var _813=true;
var _814=UserInterface.getBinding(_812);
if(_814 instanceof RadioGroupBinding){
_813=NodeCrawler.SKIP_CHILDREN;
}else{
if(_814 instanceof ButtonBinding&&_814.isRadioButton){
list.add(_814);
}
}
return _813;
});
_810.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_815){
var _816=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_815);
return UserInterface.registerBinding(_816,RadioGroupBinding);
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
var _818=this.getProperty("regexrule");
if(_818!=null){
this.expression=new RegExp(_818);
}
var _819=this.getProperty("onbindingblur");
if(_819!=null){
this.onblur=function(){
Binding.evaluate(_819,this);
};
}
var _81a=this.getProperty("onvaluechange");
if(_81a!=null){
this.onValueChange=function(){
Binding.evaluate(_81a,this);
};
}
if(this.error==null&&this.type!=null){
var _81b=DataBinding.errors[this.type];
if(_81b!=null){
this.error=_81b;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _81c=this.getProperty("value");
if(_81c!=null){
this.setValue(String(_81c));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _81e=this.getProperty("isdisabled");
if(_81e==true){
this.setDisabled(true);
}
var _81f=this.getProperty("readonly");
if(_81f==true){
this.setReadOnly(true);
}
var _820=this.getProperty("autoselect");
if(_820==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _821=Localization.currentLang();
if(_821!=null){
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
var _822=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_822.type=this.isPassword==true?"password":"text";
_822.tabIndex=-1;
return _822;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_825){
if(_825){
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
DataInputBinding.prototype.focus=function(_827){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_827){
var self=this,_829=this.bindingElement,_82a={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_829,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_829,DOMEvents.MOUSEUP,_82a);
}else{
this.select();
}
}
this.onfocus();
if(!_827){
var _82b=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_82b);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _82c=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _82d=_82c.createTextRange();
_82d.moveStart("character",0);
_82d.moveEnd("character",_82c.value.length);
_82d.select();
}else{
_82c.setSelectionRange(0,_82c.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_82e){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_82e){
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
DataInputBinding.prototype.validate=function(_832){
if(_832==true||this._isValid){
var _833=this.isValid();
if(_833!=this._isValid){
this._isValid=_833;
if(!_833){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _834=null;
if(this._isInvalidBecauseRequired==true){
_834=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_834=DataBinding.warnings["minlength"];
_834=_834.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_834=DataBinding.warnings["maxlength"];
_834=_834.replace("${count}",String(this.maxlength));
}else{
_834=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_834!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_834);
}
}else{
this.setValue(_834);
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
var _835=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _836=this.getValue();
if(_836==""){
if(this.isRequired==true){
_835=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _837=DataBinding.expressions[this.type];
if(!_837.test(_836)){
_835=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_836)){
_835=false;
}
}
}
}
if(_835&&this.minlength!=null){
if(_836.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_835=false;
}
}
if(_835&&this.maxlength!=null){
if(_836.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_835=false;
}
}
return _835;
};
DataInputBinding.prototype.setDisabled=function(_838){
if(_838!=this.isDisabled){
if(_838){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _839=this.shadowTree.input;
if(_838){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_839,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_839,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_838;
this.shadowTree.input.unselectable=_838?"on":"off";
}
this.isDisabled=_838;
this.isFocusable=!_838;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_83b){
if(_83b!=this.isReadOnly){
if(_83b){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_83b;
this.isReadOnly=_83b;
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
DataInputBinding.prototype.handleElement=function(_83c){
return true;
};
DataInputBinding.prototype.updateElement=function(_83d){
var _83e=_83d.getAttribute("value");
var _83f=_83d.getAttribute("type");
var _840=_83d.getAttribute("maxlength");
var _841=_83d.getAttribute("minlength");
var _842=_83d.getAttribute("required")==="true";
if(_83e==null){
_83e="";
}
var _843=this.bindingWindow.UpdateManager;
if(this.getValue()!=_83e){
_843.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_83e);
}
if(this.type!=_83f){
_843.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_83f;
}
if(this.maxlength!=_840){
_843.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_840;
}
if(this.minlength!=_841){
_843.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_841;
}
if(this.isRequired!=_842){
_843.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_842;
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
DataInputBinding.prototype.setValue=function(_844){
if(_844===null){
_844="";
}
if(_844!=this.getValue()){
this.setProperty("value",_844);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_844);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _845=null;
if(this.shadowTree.input!=null){
_845=this.shadowTree.input.value;
}else{
_845=this.getProperty("value");
}
return _845;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _847=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_847=Number(_847);
break;
}
return _847;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_848){
var _849=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_848);
return UserInterface.registerBinding(_849,DataInputBinding);
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
var _84a=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_84a!=null){
this.setValue(_84a.value);
_84a.parentNode.removeChild(_84a);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _84b=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_84b.tabIndex=-1;
return _84b;
};
TextBoxBinding.prototype.handleElement=function(_84c){
return true;
};
TextBoxBinding.prototype.updateElement=function(_84d){
var _84e,area=_84d.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_84e=DOMUtil.getTextContent(area);
}
if(_84e==null){
_84e="";
}
var _850=this.bindingWindow.UpdateManager;
if(this.getValue()!=_84e){
_850.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_84e);
}
var _851=_84d.getAttribute("type");
if(this.type!=_851){
_850.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_851;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_855){
var _856=this.bindingDocument.selection.createRange();
var _857=_856.text=="";
if(_857&&!_855){
_856.text="\t";
}else{
var text="";
var _859=_856.text.length;
while((_856.moveStart("word",-1)&&_856.text.charAt(1)!="\n")){
}
_856.moveStart("character",1);
var _85a=0;
var i=0,line,_85d=_856.text.split("\n");
while((line=_85d[i++])!=null){
if(_855){
line=line.replace(/^(\s)/mg,"");
_85a++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_85d[i+1]?"\n":"");
}
_856.text=text;
_856.moveStart("character",-_859);
if(_855){
_856.moveStart("character",2*_85d.length-2);
}
_856.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _85e=this.bindingDocument.selection.createRange();
var _85f=_85e.duplicate();
while((_85f.moveStart("word",-1)&&_85f.text.indexOf("\n")==-1)){
}
_85f.moveStart("character",1);
_85e.text="\n"+_85f.text.match(/^(\s)*/)[0]+"!";
_85e.moveStart("character",-1);
_85e.select();
_85e.text="";
_85e.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_860){
var _861;
var _862;
var oss;
var osy;
var i;
var fnd;
var _867=this._getSelectedText();
var el=this.shadowTree.input;
_861=el.scrollLeft;
_862=el.scrollTop;
if(!_867.match(/\n/)){
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
_867=this._getSelectedText();
if(_860){
ntext=_867.replace(/^(\s)/mg,"");
}else{
ntext=_867.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_867.length);
}
el.scrollLeft=_861;
el.scrollTop=_862;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _869;
var _86a;
var oss;
var osy;
var el=this.shadowTree.input;
_869=el.scrollLeft;
_86a=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_869;
el.scrollTop=_86a;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _871=this.shadowTree.input.value;
var _872=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _871.substr(_872,end-_872);
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
var _874=this.getProperty("isdisabled");
if(this.isDisabled||_874){
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
var _876=this.getProperty("label");
var _877=this.getProperty("value");
var _878=this.getProperty("width");
var _879=this.getProperty("onchange");
var _87a=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_876!=null){
this.label=_876;
}
if(!this.value&&_877!=null){
this.value=_877;
}
if(!this.width&&_878){
this.width=_878;
}
if(_87a){
this.isRequired=true;
}
if(_879){
this.onValueChange=function(){
Binding.evaluate(_879,this);
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
var _87b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_87b.name=this.getName();
_87b.value=this.getValue();
_87b.type="hidden";
if(this.hasCallBackID()){
_87b.id=this.getCallBackID();
}
this.shadowTree.input=_87b;
this.bindingElement.appendChild(_87b);
};
SelectorBinding.prototype.buildButton=function(){
var _87c=this.BUTTON_IMPLEMENTATION;
var _87d=this.add(_87c.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_87d.imageProfile=this.imageProfile;
}
if(this.width!=null){
_87d.setWidth(this.width);
}
this._buttonBinding=_87d;
this.shadowTree.button=_87d;
_87d.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.labelBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _87f=top.app.bindingMap.selectorpopupset;
var doc=_87f.bindingDocument;
var _881=_87f.add(PopupBinding.newInstance(doc));
var _882=_881.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_881;
this._menuBodyBinding=_882;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_881.attachClassName("selectorpopup");
_881.addActionListener(PopupBinding.ACTION_SHOW,this);
_881.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_881.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_881);
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
var _885=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_885).each(function(_886){
var _887=_886.getAttribute("label");
var _888=_886.getAttribute("value");
var _889=_886.getAttribute("selected");
var _88a=_886.getAttribute("image");
var _88b=_886.getAttribute("image-hover");
var _88c=_886.getAttribute("image-active");
var _88d=_886.getAttribute("image-disabled");
var _88e=null;
if(_88a||_88b||_88c||_88d){
_88e=new ImageProfile({image:_88a,imageHover:_88b,imageActive:_88c,imageDisabled:_88d});
}
list.add(new SelectorBindingSelection(_887?_887:null,_888?_888:null,_889&&_889=="true",_88e));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _890=null;
while(list.hasNext()){
var _891=list.getNext();
var item=this.addSelection(_891);
if(_891.isSelected){
this.select(item,true);
}
if(!_890){
_890=item;
}
}
if(!this._selectedItemBinding){
this.select(_890,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_893,_894){
var _895=this.MENUITEM_IMPLEMENTATION;
var _896=this._menuBodyBinding;
var _897=_896.bindingDocument;
var _898=_895.newInstance(_897);
_898.imageProfile=_893.imageProfile;
_898.setLabel(_893.label);
if(_893.tooltip!=null){
_898.setToolTip(_893.tooltip);
}
_898.selectionValue=_893.value;
_893.menuItemBinding=_898;
if(_894){
_896.addFirst(_898);
this.selections.addFirst(_893);
}else{
_896.add(_898);
this.selections.add(_893);
}
this._isUpToDate=false;
return _898;
};
SelectorBinding.prototype.addSelectionFirst=function(_899){
return this.addSelection(_899,true);
};
SelectorBinding.prototype.clear=function(_89a){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_89a&&this.defaultSelection!=null){
var _89b=this.addSelection(this.defaultSelection);
this.select(_89b,true);
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
SelectorBinding.prototype.setDisabled=function(_89c){
if(this.isAttached==true){
var _89d=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_89c?"none":"block";
_89d.setDisabled(_89c);
}
if(_89c){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_89e){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_89e);
}
};
SelectorBinding.prototype.handleAction=function(_89f){
SelectorBinding.superclass.handleAction.call(this,_89f);
switch(_89f.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_89f.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_89f.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_89f.target);
_89f.consume();
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
_89f.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8a1){
this.select(_8a1);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8a2=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8a3=this._popupBinding.bindingElement;
_8a3.style.minWidth=_8a2;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8a5=Client.isExplorer?e.keyCode:e.which;
if(_8a5==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8a5=Client.isExplorer?e.keyCode:e.which;
if(_8a5>=32){
this._buttonBinding.check();
var _8a6=String.fromCharCode(_8a5);
this._pushSearchSelection(_8a6);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8a7){
this._searchString+=_8a7.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8a8){
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
var _8a9=this._menuBodyBinding;
if(_8a9!=null){
var _8aa=this.MENUITEM_IMPLEMENTATION;
var _8ab=_8a9.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8ad=list.getNext();
if(_8ad.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8ad);
}
}
}
this._attachSelections();
var _8ae=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8af=_8a9.getDescendantBindingsByType(_8aa);
if(_8af.hasEntries()){
while(_8af.hasNext()){
var _8b0=_8af.getNext();
var _8b1=_8b0.labelBinding;
if(_8b1!=null&&_8b1.shadowTree!=null&&_8b1.shadowTree.labelText!=null){
_8b1.shadowTree.labelText.innerHTML=_8b1.shadowTree.labelText.innerHTML.replace(_8ae,"<b>$&</b>");
}
}
_8af.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8b1=LabelBinding.newInstance(_8ab);
_8b1.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8a9.add(_8b1);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8ad=list.getNext();
var item=this.addSelection(_8ad);
if(this._selectionValue==_8ad.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8b3,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8b3,arg);
switch(_8b3){
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
SelectorBinding.prototype.select=function(_8b6,_8b7){
var _8b8=false;
if(_8b6!=this._selectedItemBinding){
this._selectedItemBinding=_8b6;
_8b8=true;
var _8b9=this._buttonBinding;
this._selectionValue=_8b6.selectionValue;
this._selectionLabel=_8b6.getLabel();
_8b9.setLabel(_8b6.getLabel());
if(_8b6.imageProfile!=null){
_8b9.imageProfile=_8b6.imageProfile;
}
if(_8b9.imageProfile!=null){
_8b9.setImage(this.isDisabled==true?_8b9.imageProfile.getDisabledImage():_8b9.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8b7){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8b7)){
this.validate();
}
}
return _8b8;
};
SelectorBinding.prototype._relate=function(){
var _8ba=this.getProperty("relate");
if(_8ba){
var _8bb=this.bindingDocument.getElementById(_8ba);
if(_8bb){
var _8bc=UserInterface.getBinding(_8bb);
if(_8bc){
if(this.isChecked){
_8bc.show();
}else{
_8bc.hide();
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
SelectorBinding.prototype.selectByValue=function(_8bd,_8be){
var _8bf=false;
var _8c0=this._menuBodyBinding;
var _8c1=_8c0.getDescendantElementsByLocalName("menuitem");
while(_8c1.hasNext()){
var _8c2=UserInterface.getBinding(_8c1.getNext());
if(_8c2.selectionValue==_8bd){
_8bf=this.select(_8c2,_8be);
break;
}
}
return _8bf;
};
SelectorBinding.prototype.getValue=function(){
var _8c3=this._selectionValue;
if(_8c3!=null){
_8c3=String(_8c3);
}
return _8c3;
};
SelectorBinding.prototype.setValue=function(_8c4){
this.selectByValue(String(_8c4),true);
};
SelectorBinding.prototype.getResult=function(){
var _8c5=this._selectionValue;
if(_8c5=="null"){
_8c5=null;
}
if(_8c5){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8c5=Number(_8c5);
break;
}
}
return _8c5;
};
SelectorBinding.prototype.setResult=function(_8c6){
this.selectByValue(_8c6,true);
};
SelectorBinding.prototype.validate=function(){
var _8c7=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8c8=this.getValue();
if(_8c8==this.defaultSelection.value){
_8c7=false;
}
if(_8c7!=this._isValid){
if(_8c7){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8c7;
}
return _8c7;
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
var _8c9=this._popupBinding;
if(!this._isUpToDate){
_8c9.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8ca,_8cb){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8ca));
return true;
};
SelectorBinding.newInstance=function(_8cc){
var _8cd=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8cc);
return UserInterface.registerBinding(_8cd,SelectorBinding);
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
var _8d0=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8d0){
this.onValueChange=function(){
Binding.evaluate(_8d0,this);
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
SimpleSelectorBinding.prototype.focus=function(_8d3){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8d3){
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
SimpleSelectorBinding.prototype._hack=function(_8d4){
if(Client.isExplorer){
this._select.style.width=_8d4?"auto":this._cachewidth+"px";
if(_8d4){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8d5=true;
if(this.isRequired){
if(this.getValue()==null){
_8d5=false;
}
}
if(_8d5!=this._isValid){
if(_8d5){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8d6=this._select;
var _8d7=_8d6.options[_8d6.selectedIndex];
var text=DOMUtil.getTextContent(_8d7);
_8d6.blur();
_8d6.style.color="#A40000";
_8d6.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8d7,DataBinding.warnings["required"]);
}
_8d6.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8d7,text);
}
};
}
this._isValid=_8d5;
}
return _8d5;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8d9=null;
var _8da=this._select;
var _8db=_8da.options[_8da.selectedIndex];
var _8dc=true;
if(Client.isExplorer){
var html=_8db.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8dc=false;
}
}
if(_8dc){
_8d9=_8db.getAttribute("value");
}
return _8d9;
};
SimpleSelectorBinding.prototype.setValue=function(_8de){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8df){
this.setValue(_8df);
};
SimpleSelectorBinding.newInstance=function(_8e0){
var _8e1=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8e0);
return UserInterface.registerBinding(_8e1,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8e2,_8e3,_8e4,_8e5,_8e6){
this._init(_8e2,_8e3,_8e4,_8e5,_8e6);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8e7,_8e8,_8e9,_8ea,_8eb){
if(_8e7!=null){
this.label=String(_8e7);
}
if(_8e8!=null){
this.value=String(_8e8);
}
if(_8ea!=null){
this.imageProfile=_8ea;
}
if(_8eb!=null){
this.tooltip=_8eb;
}
this.isSelected=_8e9?true:false;
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
var _8ec=this.getProperty("image");
if(_8ec){
this.setImage(_8ec);
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
var _8ef=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8ef.popupBindingTargetElement=this.shadowTree.input;
_8ef.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8ef.attach();
var self=this;
_8ef.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8ef;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8f2=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8f2).each(function(_8f3){
if(_8f3.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8f4=_8f3.getAttribute("value");
var _8f5=_8f3.getAttribute("selected");
var _8f6=_8f3.getAttribute("tooltip");
list.add({value:_8f4?_8f4:null,toolTip:_8f6?_8f6:null,isSelected:(_8f5&&_8f5=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8f8=this._menuBodyBinding;
var _8f9=_8f8.bindingDocument;
while(_8f8.bindingElement.hasChildNodes()){
var node=_8f8.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8f8.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8fb=this.getProperty("emptyentrylabel");
if(_8fb){
var _8fc=MenuItemBinding.newInstance(_8f9);
_8fc.setLabel(_8fb);
_8fc.selectionValue="";
_8f8.add(_8fc);
}
while(list.hasNext()){
var _8fd=list.getNext();
var _8fc=MenuItemBinding.newInstance(_8f9);
_8fc.setLabel(_8fd.label?_8fd.label:_8fd.value);
_8fc.selectionValue=_8fd.value;
if(_8fd.image){
_8fc.setImage(_8fd.image);
}
if(_8fd.toolTip){
_8fc.setToolTip(_8fd.toolTip);
}
if(_8fd.isSelected){
this.select(_8fc,true);
}
_8f8.add(_8fc);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8fe){
this.select(_8fe);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8ff,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8ff,arg);
switch(_8ff){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8ff,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_901){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_901);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_902){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_902);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _903=this.bindingElement.offsetWidth+"px";
var _904=this._popupBinding.bindingElement;
_904.style.minWidth=_903;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _905=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _906=this.getValue();
var _907=null;
_905.each(function(item){
if(item.getLabel()==_906){
_907=item;
}
});
if(_907){
_907.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_90a){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_90a){
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
DataInputSelectorBinding.prototype.setValue=function(_90b){
var _90c=this.isReadOnly;
var _90d=null;
if(_90b!=null&&_90b!=""){
var _90e=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_90e.hasNext()){
var item=_90e.getNext();
if(item.selectionValue==_90b){
_90d=item.getLabel();
break;
}
}
}
if(_90d!=null){
this.value=_90b;
this.shadowTree.input.value=_90d;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_90b);
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
var _911="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_911);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_911);
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
var _913=ToolBarButtonBinding.newInstance(this.bindingDocument);
_913.setImage("${icon:popup}");
this.addFirst(_913);
_913.attach();
var self=this;
_913.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _915=self.getProperty("handle");
var _916=ViewDefinition.clone(_915,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_916 instanceof DialogViewDefinition){
_916.handler={handleDialogResponse:function(_917,_918){
self._isButtonClicked=false;
if(_917==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _919=_918.getFirst();
self.setValue(_919);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_916.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_916);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_913.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_913;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _91b=this._dialogButtonBinding;
if(_91b!=null){
_91b.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _91d=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_91d=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _91d;
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
var _920=ToolBarButtonBinding.newInstance(this.bindingDocument);
_920.setImage("${icon:editor-sourceview}");
_920.bindingElement.style.left="-24px";
_920.bindingElement.style.width="24px";
this.addFirst(_920);
_920.attach();
_920.hide();
var self=this;
_920.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_920;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_921){
UrlInputDialogBinding.superclass.setValue.call(this,_921);
if(this.isAttached){
this.compositeUrl=new Uri(_921);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _922=TreeService.GetCompositeUrlLabel(_921);
if(_922!=_921){
this.setLabel(_922);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_923){
if(this.shadowTree.labelInput){
if(_923){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_923;
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
var _924=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _925=this.getProperty("image");
if(_925!=null){
_924.setImage(_925);
}else{
_924.setImage("${icon:popup}");
}
this.addFirst(_924);
_924.attach();
var self=this;
_924.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_924;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _927=this._dialogButtonBinding;
if(_927!=null){
_927.oncommand();
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
var _928=this.getProperty("required")==true;
if(_928){
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
var _929=this.getProperty("label");
var _92a=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_929!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_929+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_929);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_92a!=null){
this._buttonBinding.setToolTip(_92a);
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
DataDialogBinding.prototype.handleAction=function(_92c){
DataDialogBinding.superclass.handleAction.call(this,_92c);
var _92d=_92c.target;
var self=this;
switch(_92c.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_92f,_930){
if(_92f==Dialog.RESPONSE_ACCEPT){
if(_930 instanceof DataBindingMap){
self._map=_930;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_92d==this._buttonBinding){
_92c.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_931,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_931,arg);
switch(_931){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _934=this.getProperty("handle");
var url=this.getURL();
var _936=null;
if(_934!=null||def!=null){
if(def!=null){
_936=def;
}else{
_936=ViewDefinitions[_934];
}
if(_936 instanceof DialogViewDefinition){
_936.handler=this._handler;
if(this._map!=null){
_936.argument=this._map;
}
StageBinding.presentViewDefinition(_936);
}
}else{
if(url!=null){
_936=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_936!=null){
this._dialogViewHandle=_936.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_937){
this.setProperty("label",_937);
if(this.isAttached){
this._buttonBinding.setLabel(_937+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_938){
this.setProperty("image",_938);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_938);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_939){
this.setProperty("tooltip",_939);
if(this.isAttached){
this._buttonBinding.setToolTip(_939);
}
};
DataDialogBinding.prototype.setHandle=function(_93a){
this.setProperty("handle",_93a);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_93c){
this._handler=_93c;
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
var _93d=true;
if(this.isRequired==true){
var _93e=this.getValue();
if(_93e==null||_93e==""){
_93d=false;
}
if(_93d!=this._isValid){
if(_93d){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_93d;
}
return _93d;
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
DataDialogBinding.newInstance=function(_940){
var _941=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_940);
return UserInterface.registerBinding(_941,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_943,_944){
if(_943==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_944);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_945){
_945=new String(_945);
this.dirty();
this.setValue(encodeURIComponent(_945));
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
var _949=this.getValue();
if(_949==null){
_949="";
}
this.shadowTree.dotnetinput.value=_949;
};
PostBackDataDialogBinding.prototype.setValue=function(_94a){
this.setProperty("value",_94a);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_94b){
};
PostBackDataDialogBinding.newInstance=function(_94c){
var _94d=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_94c);
return UserInterface.registerBinding(_94d,PostBackDataDialogBinding);
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
var _94e=this.getProperty("dialoglabel");
var _94f=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _951=this.getProperty("handle");
var _952=this.getProperty("selectedtoken");
if(_951!=null){
var def=ViewDefinition.clone(_951,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_94e!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_94e;
}
if(_94f!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_94f;
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
if(_952!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_952;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_954){
var _955=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_954);
return UserInterface.registerBinding(_955,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_957){
self._datathing.setValue(_957);
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
var _95a=self.getValue();
if(_95a==""||_95a==null){
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
var _95b=this.getProperty("value");
var _95c=this.getProperty("selectorlabel");
if(_95c==null){
_95c=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_95b==null));
list.add(new SelectorBindingSelection(_95c+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_95b!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _95b=this.getValue();
if(_95b==""||_95b==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_95e){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_95e);
switch(_95e.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_95e.target==this._datathing){
var _95f=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_95f){
self._selector.setLabel(_95f);
}
},500);
_95e.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_961){
this.setProperty("label",_961);
if(this._selector!=null){
this._selector.setLabel(_961);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_962){
this._datathing.setValue(_962);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_964,_965){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_964,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_966){
this._buttonBinding.setLabel(_966);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_967){
this._buttonBinding.setToolTip(_967);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_968){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_968);
switch(_968.type){
case MenuItemBinding.ACTION_COMMAND:
var _969=_968.target;
var _96a=this.master;
if(_969.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_969.getLabel());
setTimeout(function(){
_96a.action();
},0);
}else{
if(_96a.getValue()){
_96a.dirty();
}
_96a.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_96b){
var _96c=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_96b);
return UserInterface.registerBinding(_96c,NullPostBackDataDialogSelectorBinding);
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
var _96d=this._dataDialogBinding;
if(_96d!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_96d.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _96e=this.getProperty("editable");
var _96f=this.getProperty("selectable");
var _970=this.getProperty("display");
if(_96e!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_96f){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_970){
this._display=_970;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _971=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_971.selections=this.selections;
this.add(_971);
_971.attach();
this._dataDialogBinding=_971;
this.shadowTree.datadialog=_971;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _973=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _974=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_973=_974.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_973=_974.isSelected!=true;
break;
}
if(_973){
this.shadowTree.box.appendChild(this._getElementForSelection(_974));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_976){
var box=this.shadowTree.box;
var _978=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _979=list.getNext();
if(_976){
_979.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_978=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_978=_979.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_978=_979.isSelected!=true;
break;
}
}
if(_978){
var _97a=this._getElementForSelection(_979);
box.insertBefore(_97a,box.firstChild);
CSSUtil.attachClassName(_97a,"selected");
this._selectionMap.set(_979.value,_97a);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_97b){
var _97c=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_97c.appendChild(this.bindingDocument.createTextNode(_97b.label));
_97c.setAttribute("label",_97b.label);
_97c.setAttribute("value",_97b.value);
return _97c;
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
var _97e=DOMEvents.getTarget(e);
var _97f=DOMUtil.getLocalName(_97e);
if(_97f=="div"){
this._handleMouseDown(_97e);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_980){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _981=this._getElements();
var _982=_980.getAttribute("value");
var _983=this._lastSelectedElement.getAttribute("value");
var _984=false;
while(_981.hasNext()){
var el=_981.getNext();
switch(el.getAttribute("value")){
case _982:
case _983:
_984=!_984;
break;
}
if(_984){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_980);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_980)){
this._unhilite(_980);
}else{
this._hilite(_980);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_980){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_980;
};
MultiSelectorBinding.prototype._hilite=function(_988){
var _989=_988.getAttribute("value");
if(!this._selectionMap.has(_989)){
CSSUtil.attachClassName(_988,"selected");
this._selectionMap.set(_989,_988);
}
};
MultiSelectorBinding.prototype._unhilite=function(_98a){
var _98b=_98a.getAttribute("value");
if(this._selectionMap.has(_98b)){
CSSUtil.detachClassName(_98a,"selected");
this._selectionMap.del(_98b);
}
};
MultiSelectorBinding.prototype._isHilited=function(_98c){
return CSSUtil.hasClassName(_98c,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_98d){
MultiSelectorBinding.superclass.handleAction.call(this,_98d);
var _98e=_98d.target;
switch(_98d.type){
case DataDialogBinding.ACTION_COMMAND:
if(_98e==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_98d.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_98e.result);
this.dirty();
_98e.result=null;
_98d.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _98f=null;
if(this.isSelectable){
_98f=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_991){
if(self._isHilited(_991)){
_991.parentNode.removeChild(_991);
_98f.add(new SelectorBindingSelection(_991.getAttribute("label"),_991.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _98f;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _993=this._getElements();
if(!isUp){
_993.reverse();
}
var _994=true;
while(_994&&_993.hasNext()){
var _995=_993.getNext();
if(this._isHilited(_995)){
switch(isUp){
case true:
if(_995.previousSibling){
_995.parentNode.insertBefore(_995,_995.previousSibling);
}else{
_994=false;
}
break;
case false:
if(_995.nextSibling){
_995.parentNode.insertBefore(_995,_995.nextSibling.nextSibling);
}else{
_994=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _996=new List();
var _997=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_999){
var _99a=new SelectorBindingSelection(_999.getAttribute("label"),_999.getAttribute("value"),_997);
_99a.isHighlighted=self._isHilited(_999);
_996.add(_99a);
});
return _996;
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
var _99b=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_99b.hasEntries()){
_99b.each(function(_99c){
_99c.parentNode.removeChild(_99c);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _99d=this.selections.getNext();
if(_99d.isSelected){
var _99e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_99e.name=this._name;
_99e.value=_99d.value;
this.bindingElement.appendChild(_99e);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_99f){
alert(_99f);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9a0){
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
var _9a1={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9a2=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9a2.handler=this._handler;
_9a2.argument=_9a1;
StageBinding.presentViewDefinition(_9a2);
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
var _9a3={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9a5={handleDialogResponse:function(_9a6,_9a7){
if(_9a6==Dialog.RESPONSE_ACCEPT){
self.result=_9a7;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9a8=ViewDefinitions[this._dialogViewHandle];
_9a8.handler=_9a5;
_9a8.argument=_9a3;
StageBinding.presentViewDefinition(_9a8);
};
MultiSelectorDataDialogBinding.newInstance=function(_9a9){
var _9aa=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9a9);
return UserInterface.registerBinding(_9aa,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9ab){
var id=_9ab.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9ad=_9ab.bindingDocument.getElementById(id);
if(_9ad!=null){
var _9ae=UserInterface.getBinding(_9ad);
_9ae.setResult(true);
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
var _9b0=this.bindingDocument.getElementById(id);
if(_9b0!=null){
var _9b1=UserInterface.getBinding(_9b0);
if(_9b1&&!_9b1.isAttached){
_9b1.isLazy=true;
}else{
_9b0.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9b2){
this._isLazy=_9b2;
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
var _9b4=this.getProperty("stateprovider");
var _9b5=this.getProperty("handle");
if(_9b4!=null&&_9b5!=null){
url=url.replace("${stateprovider}",_9b4).replace("${handle}",_9b5);
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
EditorDataBinding.prototype._onPageInitialize=function(_9b6){
EditorDataBinding.superclass._onPageInitialize.call(this,_9b6);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9b7){
EditorDataBinding.superclass.handleAction.call(this,_9b7);
switch(_9b7.type){
case Binding.ACTION_DIRTY:
if(_9b7.target!=this){
if(!this.isDirty){
this.dirty();
}
_9b7.consume();
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
EditorDataBinding.prototype.setValue=function(_9b8){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9b9){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9ba){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9ba);
if(this.hasBasic===false){
var _9bb=this.getContentWindow().bindingMap.basicgroup;
if(_9bb){
_9bb.hide();
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
var _9c0=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9c0=fake.getValue()!="";
}
if(!_9c0&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9c0&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9c0;
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
var _9c4=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9c4!=null){
_9c4.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9c5){
_9c5=_9c5!=null?_9c5:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9c5;
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
var _9c6=this.getProperty("label");
if(_9c6){
this.setLabel(_9c6);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9c7){
this.setProperty("label",_9c7);
if(this.shadowTree.labelBinding==null){
var _9c8=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9c8.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9c8.bindingElement,this.bindingElement.firstChild);
_9c8.attach();
this.shadowTree.labelBinding=_9c8;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9c7));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9ca){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9ca.bindingElement);
return _9ca;
};
FieldGroupBinding.prototype.addFirst=function(_9cb){
var _9cc=this.shadowTree[FieldGroupBinding.CENTER];
_9cc.insertBefore(_9cb.bindingElement,_9cc.firstChild);
return _9cb;
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
var _9cd=this.getProperty("relation");
if(_9cd!=null){
this.bindingRelation=_9cd;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9ce,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9ce,arg);
switch(_9ce){
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
FieldBinding.newInstance=function(_9d0){
var _9d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9d0);
return UserInterface.registerBinding(_9d1,FieldBinding);
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
var _9d2=this.getDescendantBindingByLocalName("fieldgroup");
if(_9d2!=null){
_9d2.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9d3=true;
var _9d4=this.getDescendantBindingsByLocalName("*");
while(_9d4.hasNext()){
var _9d5=_9d4.getNext();
if(Interfaces.isImplemented(IData,_9d5)){
var _9d6=_9d5.validate();
if(_9d3&&!_9d6){
_9d3=false;
}
}
}
return _9d3;
};
FieldsBinding.prototype.handleAction=function(_9d7){
FieldsBinding.superclass.handleAction.call(this,_9d7);
var _9d8=_9d7.target;
if(_9d8!=this){
switch(_9d7.type){
case Binding.ACTION_INVALID:
var _9d9=DataBinding.getAssociatedLabel(_9d8);
if(_9d9){
this._invalidFieldLabels.set(_9d8.key,_9d9);
}
if(_9d8.error){
if(!_9d8.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9d8.error},_9d8);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9d7.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9d8.key)){
this._invalidFieldLabels.del(_9d8.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9d7.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9da=null;
if(this._invalidFieldLabels.hasEntries()){
_9da=this._invalidFieldLabels.toList();
}
return _9da;
};
FieldsBinding.newInstance=function(_9db){
var _9dc=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9db);
return UserInterface.registerBinding(_9dc,FieldsBinding);
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
var _9dd=this.getProperty("image");
if(_9dd){
this.setImage(_9dd);
}
var _9de=this.getProperty("tooltip");
if(_9de){
this.setToolTip(_9de);
}
var _9df=this.getProperty("label");
if(_9df){
this.setLabel(_9df);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9e1=this.getAncestorBindingByLocalName("field");
if(_9e1){
var _9e2=true;
_9e1.getDescendantBindingsByLocalName("*").each(function(_9e3){
if(Interfaces.isImplemented(IData,_9e3)){
_9e3.focus();
_9e2=false;
}
return _9e2;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9e4){
this.setProperty("label",_9e4);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9e4);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9e5=this.getProperty("label");
if(!_9e5){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9e5=node.data;
}
}
return _9e5;
};
FieldDescBinding.prototype.setImage=function(_9e7){
this.setProperty("image",_9e7);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9e8){
this.setProperty("tooltip",_9e8);
if(this.isAttached){
this.bindingElement.title=_9e8;
}
};
FieldDescBinding.newInstance=function(_9e9){
var _9ea=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9e9);
return UserInterface.registerBinding(_9ea,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9eb){
var _9ec=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9eb);
return UserInterface.registerBinding(_9ec,FieldDataBinding);
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
var _9ed=this._fieldHelpPopupBinding;
if(_9ed){
_9ed.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9ee=app.bindingMap.fieldhelpopupset;
var doc=_9ee.bindingDocument;
var _9f0=_9ee.add(PopupBinding.newInstance(doc));
var _9f1=_9f0.add(PopupBodyBinding.newInstance(doc));
_9f0.position=PopupBinding.POSITION_RIGHT;
_9f0.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9f1.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9f2=this.getProperty("label");
if(_9f2){
_9f1.bindingElement.innerHTML=Resolver.resolve(_9f2);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9f0;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9f3=this.getAncestorBindingByLocalName("field");
if(_9f3){
_9f3.attachClassName("fieldhelp");
var _9f4=ClickButtonBinding.newInstance(this.bindingDocument);
_9f4.attachClassName("fieldhelp");
_9f4.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9f4);
_9f4.attach();
var self=this;
_9f4.oncommand=function(){
self.attachPopupBinding();
};
_9f4.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9f4;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9f6=this._fieldHelpPopupBinding;
if(_9f6&&!_9f6.isAttached){
_9f6.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9f8){
RadioDataGroupBinding.superclass.handleAction.call(this,_9f8);
switch(_9f8.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9fa,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9fa,arg);
switch(_9fa){
case BroadcastMessages.KEY_ARROW:
var _9fc=null;
var next=null;
var _9fe=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9fe=this.getChildBindingsByLocalName("radio");
while(!_9fc&&_9fe.hasNext()){
var _9ff=_9fe.getNext();
if(_9ff.getProperty("ischecked")){
_9fc=_9ff;
}
}
break;
}
if(_9fc){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9fe.getFollowing(_9fc);
while(next!=null&&next.isDisabled){
next=_9fe.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9fe.getPreceding(_9fc);
while(next!=null&&next.isDisabled){
next=_9fe.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a00){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a00){
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
var _a01=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a01.type="hidden";
_a01.name=this._name;
this.bindingElement.appendChild(_a01);
this.shadowTree.input=_a01;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a02=null;
var _a03=this.getChildBindingsByLocalName("radio");
while(!_a02&&_a03.hasNext()){
var _a04=_a03.getNext();
if(_a04.isChecked){
_a02=_a04.getProperty("value");
}
}
return _a02;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a05){
};
RadioDataGroupBinding.prototype.setResult=function(_a06){
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
var _a07=this.getProperty("relate");
var _a08=this.getProperty("oncommand");
var _a09=this.getProperty("isdisabled");
if(_a07){
this.bindingRelate=_a07;
this.relate();
}
if(_a08){
this.oncommand=function(){
Binding.evaluate(_a08,this);
};
}
if(_a09==true){
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
var _a0b=this.getCallBackID();
this._buttonBinding.check=function(_a0c){
RadioButtonBinding.prototype.check.call(this,_a0c);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a0d){
RadioButtonBinding.prototype.uncheck.call(this,_a0d);
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
RadioDataBinding.prototype.setChecked=function(_a0e,_a0f){
this._buttonBinding.setChecked(_a0e,_a0f);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a0e);
};
RadioDataBinding.prototype.check=function(_a10){
this.setChecked(true,_a10);
};
RadioDataBinding.prototype.uncheck=function(_a11){
this.setChecked(false,_a11);
};
RadioDataBinding.prototype.setDisabled=function(_a12){
if(_a12!=this.isDisabled){
this.isDisabled=_a12;
this._buttonBinding.setDisabled(_a12);
if(_a12){
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
var _a14=DOMEvents.getTarget(e);
switch(_a14){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a15=this.getProperty("label");
if(_a15){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a15)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a16){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a16;
}
this.setProperty("label",_a16);
};
RadioDataBinding.prototype.handleElement=function(_a17){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a18){
var _a19=_a18.getAttribute("ischecked")==="true";
if(this.isChecked!=_a19){
this.setChecked(_a19,true);
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
var _a1b=DOMEvents.getTarget(e);
switch(_a1b){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a1c,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a1c,arg);
switch(_a1c){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a1f){
_a1f.consume();
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
var _a21=this.getCallBackID();
this._buttonBinding.check=function(_a22){
ButtonBinding.prototype.check.call(this,_a22);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a22){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a23){
ButtonBinding.prototype.uncheck.call(this,_a23);
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
if(_a21!=null){
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
var _a24=true;
var _a25=this.bindingElement.parentNode;
if(_a25){
var _a26=UserInterface.getBinding(_a25);
if(_a26&&_a26 instanceof CheckBoxGroupBinding){
if(_a26.isRequired){
if(_a26.isValid){
_a24=_a26.validate();
}else{
_a24=false;
}
}
}
}
return _a24;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a27=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a27.type="hidden";
_a27.name=this._name;
_a27.style.display="none";
this.bindingElement.appendChild(_a27);
this.shadowTree.input=_a27;
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
var _a28=null;
var _a29=this.getProperty("value");
if(this.isChecked){
_a28=_a29?_a29:"on";
}
return _a28;
};
CheckBoxBinding.prototype.setValue=function(_a2a){
if(_a2a==this.getValue()||_a2a=="on"){
this.check(true);
}else{
if(_a2a!="on"){
this.setPropety("value",_a2a);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a2b=false;
if(this.isChecked){
_a2b=this._result!=null?this._result:true;
}
return _a2b;
};
CheckBoxBinding.prototype.setResult=function(_a2c){
if(typeof _a2c=="boolean"){
this.setChecked(_a2c,true);
}else{
this._result=_a2c;
}
};
CheckBoxBinding.newInstance=function(_a2d){
var _a2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a2d);
return UserInterface.registerBinding(_a2e,CheckBoxBinding);
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
var _a2f=true;
if(this.isRequired){
var _a30=this.getDescendantBindingsByLocalName("checkbox");
if(_a30.hasEntries()){
_a2f=false;
while(_a30.hasNext()&&!_a2f){
if(_a30.getNext().isChecked){
_a2f=true;
}
}
}
if(_a2f==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a2f;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a31){
if(_a31){
if(!this._labelBinding){
var _a32=LabelBinding.newInstance(this.bindingDocument);
_a32.attachClassName("invalid");
_a32.setImage("${icon:error}");
_a32.setLabel("Selection required");
this._labelBinding=this.addFirst(_a32);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a33){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a33);
switch(_a33.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a34){
var _a35=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a34);
return UserInterface.registerBinding(_a35,CheckBoxGroupBinding);
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
var _a36=DialogControlBinding.newInstance(this.bindingDocument);
_a36.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a36);
this._controlGroupBinding.attachRecursive();
var _a37=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a37);
var _a38=this.getLabel();
if(_a38!=null){
this.setLabel(_a38);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a39=this._snapTargetBinding;
if(Binding.exists(_a39)==true){
_a39.removeActionListener(Binding.ACTION_BLURRED,this);
_a39.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a3a){
if(Interfaces.isImplemented(IData,_a3a)){
this._snapTargetBinding=_a3a;
var _a3b=_a3a.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a3b&&_a3b.isConsumed){
this._environmentBinding=_a3b.listener;
}
if(this._environmentBinding){
_a3a.addActionListener(Binding.ACTION_BLURRED,this);
_a3a.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a3a)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a3a.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a3d=this._snapTargetBinding;
var _a3e=this._environmentBinding;
var root=UserInterface.getBinding(_a3d.bindingDocument.body);
if(Binding.exists(_a3d)&&Binding.exists(_a3e)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a3d.isAttached&&_a3e.isAttached){
var _a40=_a3d.boxObject.getUniversalPosition();
var _a41=_a3e.boxObject.getUniversalPosition();
_a41.y+=_a3e.bindingElement.scrollTop;
_a41.x+=_a3e.bindingElement.scrollLeft;
var tDim=_a3d.boxObject.getDimension();
var eDim=_a3e.boxObject.getDimension();
var _a44=false;
if(_a40.y+tDim.h<_a41.y){
_a44=true;
}else{
if(_a40.x+tDim.w<_a41.x){
_a44=true;
}else{
if(_a40.y>_a41.y+eDim.h){
_a44=true;
}else{
if(_a40.x>_a41.x+eDim.w){
_a44=true;
}
}
}
}
if(!_a44){
this._setComputedPosition(_a40,_a41,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a45,_a46,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a4b=_a45;
var _a4c=false;
if(_a45.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a4c=true;
}else{
if(_a45.x+tDim.w>=_a46.x+eDim.w){
_a4c=true;
}
}
if(_a4c){
_a4b.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a4b.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a4b.y-=(bDim.h);
_a4b.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a4b);
};
BalloonBinding.prototype.handleBroadcast=function(_a4d,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a4d,arg);
switch(_a4d){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a4f){
var _a50=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a4f){
_a50=true;
}
}
return _a50;
};
BalloonBinding.prototype._setPosition=function(_a52){
var _a53=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a53=true;
}
}
if(!_a53){
this.bindingElement.style.left=_a52.x+"px";
this.bindingElement.style.top=_a52.y+"px";
this._point=_a52;
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
BalloonBinding.prototype.handleAction=function(_a55){
BalloonBinding.superclass.handleAction.call(this,_a55);
var _a56=_a55.target;
switch(_a55.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a55.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a56==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a56)){
self.dispose();
}else{
if(_a56.validate()){
var _a58=true;
if(_a55.type==Binding.ACTION_BLURRED){
var root=_a56.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a58=false;
}
}
if(_a58){
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
BalloonBinding.prototype.setLabel=function(_a5b){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a5c=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a5b);
_a5c.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a5c);
}
this.setProperty("label",_a5b);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a5e){
var _a5f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a5e);
var _a60=UserInterface.registerBinding(_a5f,BalloonBinding);
_a60.hide();
return _a60;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a61,_a62){
if(Interfaces.isImplemented(IData,_a62)==true){
var _a63,_a64=_a62.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a64&&_a64.isConsumed){
switch(_a64.listener.constructor){
case StageBinding:
_a63=false;
break;
case StageDialogBinding:
_a63=true;
break;
}
}
var _a65=_a63?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a66=_a65.add(BalloonBinding.newInstance(top.app.document));
_a66.setLabel(_a61.text);
_a66.snapTo(_a62);
_a66.attach();
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
var _a67=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a6a=_a67.getDataBinding(name);
if(_a6a){
ErrorBinding.presentError({text:text},_a6a);
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
FocusBinding.focusElement=function(_a6b){
var _a6c=true;
try{
_a6b.focus();
Application.focused(true);
}
catch(exception){
var _a6d=UserInterface.getBinding(_a6b);
var _a6e=SystemLogger.getLogger("FocusBinding.focusElement");
_a6e.warn("Could not focus "+(_a6d?_a6d.toString():String(_a6b)));
_a6c=false;
}
return _a6c;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a6f){
var win=_a6f.bindingWindow;
var id=_a6f.bindingElement.id;
return {getBinding:function(){
var _a72=null;
try{
if(Binding.exists(_a6f)){
_a72=win.bindingMap[id];
}
}
catch(exception){
}
return _a72;
}};
};
FocusBinding.navigateNext=function(_a73){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a73);
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
var _a74=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a74&&_a74.isConsumed){
if(_a74.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a75){
FocusBinding.superclass.handleAction.call(this,_a75);
var _a76=_a75.target;
var _a77=null;
if(this._isFocusManager){
switch(_a75.type){
case FocusBinding.ACTION_ATTACHED:
if(_a76!=this){
this._isUpToDate=false;
}
_a75.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a76!=this){
this._isUpToDate=false;
_a75.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a77=new FocusCrawler();
_a77.mode=FocusCrawler.MODE_BLUR;
_a77.crawl(_a76.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a75.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a76!=this){
_a77=new FocusCrawler();
_a77.mode=FocusCrawler.MODE_FOCUS;
_a77.crawl(_a76.bindingElement);
}
_a75.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a76)){
this.claimFocus();
this._onFocusableFocused(_a76);
}
_a75.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a76)){
this._onFocusableBlurred(_a76);
}
_a75.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a78){
var _a79=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a79==null&&list.hasNext()){
var _a7b=list.getNext();
if(this._cachedFocus&&_a7b==this._cachedFocus.getBinding()){
_a79=_a7b;
}
}
if(_a79!=null){
if(_a7b.isFocused){
var next=_a78?list.getPreceding(_a79):list.getFollowing(_a79);
if(!next){
next=_a78?list.getLast():list.getFirst();
}
next.focus();
}else{
_a79.focus();
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
var _a7d=new FocusCrawler();
var list=new List();
_a7d.mode=FocusCrawler.MODE_INDEX;
_a7d.crawl(this.bindingElement,list);
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
var _a80=this._cachedFocus.getBinding();
if(_a80&&!_a80.isFocused){
_a80.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a81){
if(_a81!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a81;
_a81.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a81);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a82){
_a82.deleteProperty(FocusBinding.MARKER);
if(_a82==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a84){
this.bindingElement.style.left=_a84+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a85){
this.hiddenTabBindings.add(_a85);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a86=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a86.getLabel());
item.setImage(_a86.getImage());
item.associatedTabBinding=_a86;
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
TabsButtonBinding.prototype.handleAction=function(_a89){
TabsButtonBinding.superclass.handleAction.call(this,_a89);
switch(_a89.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a8a=this.selectedTabBinding;
if(_a8a){
this.containingTabBoxBinding.moveToOrdinalPosition(_a8a,0);
this.containingTabBoxBinding.select(_a8a);
}
_a89.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a8b){
var _a8c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a8b);
_a8c.setAttribute("type","checkbox");
_a8c.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a8c.className="tabbutton";
return UserInterface.registerBinding(_a8c,TabsButtonBinding);
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
var _a8d=TabBoxBinding.currentActiveInstance;
if(_a8d!=null&&Binding.exists(_a8d)){
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
var _a8e=this.getTabElements().getLength();
var _a8f=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a8e!=_a8f){
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
var _a90=this.getTabPanelElements();
while(_a90.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a90.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a91=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a92=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a93=_a91>_a92?"tabsbelow":"tabsontop";
this.attachClassName(_a93);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a95=this.getTabPanelElements();
var _a96=null;
var _a97=this.getProperty("selectedindex");
if(_a97!=null){
if(_a97>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a98=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a9a=_a95.getNext();
this.registerTabBoxPair(tab,_a9a);
if(_a97&&_a98==_a97){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a96=tab;
}
}
_a98++;
}
if(!_a96){
_a96=tabs.getFirst();
_a96.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a9b){
var _a9c=null;
var _a9d=null;
if(this.isEqualSize){
var _a9e=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aa0=this.getTabPanelElements();
_aa0.each(function(_aa1){
max=_aa1.offsetHeight>max?_aa1.offsetHeight:max;
});
_a9d=max+_a9e.top+_a9e.bottom;
if(_a9b&&this._tabPanelsElement.style.height!=null){
_a9c=this._tabPanelsElement.offsetHeight;
}
if(_a9c!=null||_a9d>_a9c){
this._tabPanelsElement.style.height=_a9d+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_aa2){
_aa2._invalidCount=0;
_aa2.addActionListener(Binding.ACTION_INVALID,this);
_aa2.addActionListener(Binding.ACTION_VALID,this);
_aa2.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_aa3){
TabBoxBinding.superclass.handleAction.call(this,_aa3);
var _aa4=_aa3.target;
var _aa5=_aa3.listener;
switch(_aa3.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_aa4.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_aa3.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_aa4.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_aa5._invalidCount++;
if(_aa5._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_aa5.isSelected){
self._showWarning(_aa5,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_aa5._invalidCount>0){
_aa5._invalidCount--;
if(_aa5._invalidCount==0){
if(_aa5.isSelected){
this._showWarning(_aa5,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_aa5,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_aa3._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_aa3._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _aa8=DOMEvents.getTarget(e);
if(_aa8==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _aaa=this.getTabPanelElements();
tabs.each(function(tab,_aac){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _aad=_aaa.get(_aac);
this.registerTabBoxPair(tab,_aad);
}
},this);
var _aae=this._tabBoxPairs;
for(var key in _aae){
var tab=_aae[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_aa8);
switch(_aa8.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ab2=_aa8.parentNode;
if(_ab2==this._tabsElement||_ab2==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_aa8==this._tabsElement||_aa8==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_ab4){
var _ab5=this.getBindingForArgument(arg);
if(_ab5!=null&&!_ab5.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_ab5.select(_ab4);
this.getTabPanelBinding(_ab5).select(_ab4);
var _ab6=this.getProperty("selectedindex");
if(_ab6!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ab5.bindingElement,true));
}
this._selectedTabBinding=_ab5;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_ab5.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _ab7=this.getTabPanelBinding(_ab5);
this._showBalloon(_ab7,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ab9){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ab9.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ab9};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_abd){
var _abe=null;
try{
var key=_abd.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ac0=this._tabBoxPairs[key].tabPanel;
_abe=UserInterface.getBinding(_ac0);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _abe;
};
TabBoxBinding.prototype.getTabBinding=function(_ac1){
var key=_ac1.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ac3=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ac3);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ac4=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ac4);
return _ac4;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ac5,_ac6){
var _ac7=_ac5.bindingElement;
_ac5.setProperty("selected",true);
var _ac8=this.summonTabPanelBinding();
var _ac9=_ac8.bindingElement;
if(_ac6){
_ac9.appendChild(_ac6 instanceof Binding?_ac6.bindingElement:_ac6);
}
this.registerTabBoxPair(_ac7,_ac9);
UserInterface.getBinding(this._tabsElement).add(_ac5);
this._tabPanelsElement.appendChild(_ac9);
_ac5.attach();
UserInterface.getBinding(_ac9).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ac5;
};
TabBoxBinding.prototype.importTabBinding=function(_aca){
var that=_aca.containingTabBoxBinding;
var _acc=that.getTabPanelBinding(_aca);
var _acd=_acc.getBindingElement();
var _ace=_aca.getBindingElement();
that.dismissTabBinding(_aca);
this._tabsElement.appendChild(_ace);
this._tabPanelsElement.appendChild(_acd);
this.registerTabBoxPair(_ace,_acd);
_aca.containingTabBoxBinding=this;
this.select(_aca);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_acf){
var _ad0=null;
if(_acf.isSelected){
_ad0=this.getBestTab(_acf);
this._selectedTabBinding=null;
}
var _ad1=this.getTabPanelBinding(_acf);
this.unRegisterTabBoxPair(_acf.bindingElement);
_acf.dispose();
_ad1.dispose();
if(_ad0!=null){
this.select(_ad0,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ad2){
if(_ad2.isSelected){
this.selectBestTab(_ad2);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ad3){
var _ad4=this.getBestTab(_ad3);
if(_ad4){
this.select(_ad4);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ad5){
var _ad6=null;
var _ad7=_ad5.getOrdinalPosition(true);
var _ad8=this.getTabBindings();
var _ad9=_ad8.getLength();
var _ada=_ad9-1;
if(_ad9==1){
_ad6=null;
}else{
if(_ad7==_ada){
_ad6=_ad8.get(_ad7-1);
}else{
_ad6=_ad8.get(_ad7+1);
}
}
return _ad6;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_adb,_adc){
var _add=this.bindingDocument.getElementById(_adb.bindingElement.id);
var tab=this.getTabElements().get(_adc);
this._tabsElement.insertBefore(_add,tab);
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
var _adf=this._nodename_tab;
var _ae0=new List(this._tabsElement.childNodes);
var _ae1=new List();
while(_ae0.hasNext()){
var _ae2=_ae0.getNext();
if(_ae2.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ae2)==_adf){
_ae1.add(_ae2);
}
}
return _ae1;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ae3=this._nodename_tabpanel;
var _ae4=new List(this._tabPanelsElement.childNodes);
var _ae5=new List();
_ae4.each(function(_ae6){
if(_ae6.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ae6)==_ae3){
_ae5.add(_ae6);
}
});
return _ae5;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _ae7=new List();
var _ae8=this.getTabElements();
_ae8.each(function(_ae9){
_ae7.add(UserInterface.getBinding(_ae9));
});
return _ae7;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _aea=new List();
this.getTabPanelElements().each(function(_aeb){
_aea.add(UserInterface.getBinding(_aeb));
});
return _aea;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _aec=null;
if(this._selectedTabBinding){
_aec=this.getTabPanelBinding(this._selectedTabBinding);
}
return _aec;
};
TabBoxBinding.prototype._showWarning=function(_aed,_aee){
var _aef=this.getTabBinding(_aed);
if(_aee){
if(_aef.labelBinding.hasImage){
_aef._backupImage=_aef.getImage();
}
_aef.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_aef._backupImage){
_aef.setImage(_aef._backupImage);
}else{
_aef.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_af0,_af1){
var _af2=this.getTabBinding(_af0);
if((_af1&&!_af2.isSelected)||!_af1){
if(_af2.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_af1){
if(_af2.labelBinding.hasImage){
_af2._backupImage=_af2.getImage();
}
_af2.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_af2._backupImage!=null){
_af2.setImage(_af2._backupImage);
}else{
_af2.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_af3){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _af6=tab.getOrdinalPosition(true);
var next=null;
var _af8=new List();
tabs.each(function(t){
if(t.isVisible){
_af8.add(t);
}
});
if(_af8.getLength()>1){
if(_af6==0&&!_af3){
next=_af8.getLast();
}else{
if(_af6==_af8.getLength()-1&&_af3){
next=_af8.getFirst();
}else{
if(_af3){
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
var _afb=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_afb.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_afc){
TabsBinding.superclass.handleAction.call(this,_afc);
switch(_afc.type){
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
var _aff=self.bindingElement.offsetWidth;
if(_aff!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_aff;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b00){
if(_b00 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b00);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b01=false;
var _b02,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b05=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b06=this.bindingElement.offsetWidth-_b05.RESERVED_SPACE;
var _b07=null;
var sum=0,_b09=0;
var _b0a=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b0a){
tab=tabs.getNext();
_b02=UserInterface.getBinding(tab);
if(!_b07){
_b07=_b02;
}
sum+=tab.offsetWidth;
if(sum>=_b06){
_b01=true;
if(_b02.isSelected){
if(!DOMUtil.isFirstElement(_b02.bindingElement,true)){
this.isManaging=false;
if(_b07){
_b07.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b02,_b09-1);
_b0a=false;
}
}else{
_b02.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b02);
}
}else{
_b02.show();
_b07=_b02;
_b09++;
}
}
if(_b0a){
if(_b01&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b0b=_b07.getBindingElement();
var _b0c=_b0b.offsetLeft+_b0b.offsetWidth;
var _b0d=this.tabsButtonBinding;
setTimeout(function(){
_b0d.show(_b0c+4);
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
var _b0e=TabBinding.superclass.serialize.call(this);
if(_b0e){
_b0e.label=this.getLabel();
_b0e.image=this.getImage();
_b0e.tooltip=this.getToolTip();
}
return _b0e;
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
var _b0f=this.bindingElement.getAttribute("image");
var _b10=this.bindingElement.getAttribute("label");
var _b11=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b10){
this.setLabel(_b10);
}
if(_b0f){
this.setImage(_b0f);
}
if(_b11){
this.setToolTip(_b11);
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
TabBinding.prototype.setLabel=function(_b13){
if(_b13!=null){
this.setProperty("label",_b13);
if(this.isAttached){
this.labelBinding.setLabel(_b13);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b14){
if(_b14){
this.setProperty("tooltip",_b14);
if(this.isAttached){
this.labelBinding.setToolTip(_b14);
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
var _b16=false;
if(Client.isMozilla==true){
}
if(!_b16){
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
TabBinding.prototype.select=function(_b17){
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
TabBinding.newInstance=function(_b18){
var _b19=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b18);
return UserInterface.registerBinding(_b19,TabBinding);
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
var _b1a=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b1a=true;
this._lastKnownDimension=dim1;
}
return _b1a;
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
TabPanelBinding.prototype.select=function(_b1d){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b1d!=true){
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
TabPanelBinding.prototype.handleAction=function(_b1e){
TabPanelBinding.superclass.handleAction.call(this,_b1e);
var _b1f=_b1e.target;
switch(_b1e.type){
case BalloonBinding.ACTION_INITIALIZE:
_b1e.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b20){
var _b21=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b20);
UserInterface.registerBinding(_b21,TabPanelBinding);
return UserInterface.getBinding(_b21);
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
var _b22=SplitBoxBinding.superclass.serialize.call(this);
if(_b22){
_b22.orient=this.getOrient();
_b22.layout=this.getLayout();
}
return _b22;
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
var _b23=this.getSplitPanelElements();
if(_b23.hasEntries()){
var _b24=new List(this.getLayout().split(":"));
if(_b24.getLength()!=_b23.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b23.each(function(_b25){
_b25.setAttribute("ratio",_b24.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b26=this.getProperty("orient");
if(_b26){
this._orient=_b26;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b27=this.getSplitterBindings();
while(_b27.hasNext()){
var _b28=_b27.getNext();
if(_b28&&_b28.getProperty("collapsed")==true){
_b28.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b29){
SplitBoxBinding.superclass.handleAction.call(this,_b29);
switch(_b29.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b29.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b29.target);
_b29.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b29.target);
_b29.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b2a){
this._getSplitPanelBindingForSplitter(_b2a).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b2b){
this._getSplitPanelBindingForSplitter(_b2b).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b2c){
var _b2d=DOMUtil.getOrdinalPosition(_b2c.bindingElement,true);
var _b2e,_b2f=this.getSplitPanelElements();
switch(_b2c.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b2e=_b2f.get(_b2d);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b2e=_b2f.get(_b2d+1);
break;
}
return UserInterface.getBinding(_b2e);
};
SplitBoxBinding.prototype.invokeLayout=function(_b30){
var _b31=this.isHorizontalOrient();
var _b32=this.getSplitPanelBindings();
var _b33=this.getSplitterBindings();
var _b34=new List();
var _b35,sum=0;
var _b37=0;
_b32.each(function(_b38){
if(_b38.isFixed==true){
if(!_b32.hasNext()){
_b37+=_b38.getFix();
}
_b34.add(0);
sum+=0;
}else{
_b35=_b38.getRatio();
_b34.add(_b35);
sum+=_b35;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b34.getLength()!=_b32.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b39=_b31?this.getInnerWidth():this.getInnerHeight();
_b39-=_b37;
_b33.each(function(_b3a){
if(_b3a.isVisible){
_b39-=SplitterBinding.DIMENSION;
}
});
var unit=_b39/sum;
var _b3c=0;
var self=this;
_b32.each(function(_b3e){
var span=0;
var _b40=_b34.getNext();
if(_b3e.isFixed){
span=_b3e.getFix();
}else{
span=Math.floor(unit*_b40);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b3c+=span;
while(_b3c>_b39){
_b3c--;
span--;
}
if(!_b3e.isFixed){
if(_b31){
_b3e.setWidth(span);
}else{
_b3e.setHeight(span);
}
}
});
}
if(_b30!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b41=this.getLayout();
if(_b41){
this.setProperty("layout",_b41);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b42=this.isHorizontalOrient();
var _b43=this.getSplitPanelBindings();
var _b44=this.getSplitterBindings();
var _b45=null;
var _b46=null;
var unit=null;
var _b48=null;
var span=null;
_b43.each(function(_b4a){
if(!unit){
unit=_b42?_b4a.getWidth():_b4a.getHeight();
}
span=_b42?_b4a.getWidth():_b4a.getHeight();
if(_b48){
span-=_b48;
_b48=null;
}
_b45=_b44.getNext();
if(_b45&&_b45.offset){
_b48=_b45.offset;
span+=_b48;
}
_b4a.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b4b){
this.logger.debug(_b4b);
this.setProperty("layout",_b4b);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b4c="",_b4d=this.getSplitPanelBindings();
_b4d.each(function(_b4e){
_b4c+=_b4e.getRatio().toString();
_b4c+=_b4d.hasNext()?":":"";
});
this.setProperty("layout",_b4c);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b4f=this.getSplitPanelElements();
_b4f.each(function(_b50){
layout+="1"+(_b4f.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b51){
this.bindingElement.style.width=_b51+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b52){
this.bindingElement.style.height=_b52+"px";
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
SplitBoxBinding.prototype.fit=function(_b53){
if(!this.isFit||_b53){
if(this.isHorizontalOrient()){
var max=0;
var _b55=this.getSplitPanelBindings();
_b55.each(function(_b56){
var _b57=_b56.bindingElement.offsetHeight;
max=_b57>max?_b57:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b58){
var _b59=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b58);
return UserInterface.registerBinding(_b59,SplitBoxBinding);
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
var _b5c=this.getProperty("hidden");
if(_b5c){
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
var _b5d=this.getProperty("ratiocache");
if(_b5d){
this.setRatio(_b5d);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b5e){
if(!this.isFixed){
if(_b5e!=this.getWidth()){
if(_b5e<0){
_b5e=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b5e+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b5e);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b5f=null;
if(this.isFixed){
_b5f=this.getFix();
}else{
_b5f=this.bindingElement.offsetWidth;
}
return _b5f;
};
SplitPanelBinding.prototype.setHeight=function(_b60){
if(!this.isFixed){
if(_b60!=this.getHeight()){
try{
this.bindingElement.style.height=_b60+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b61=null;
if(this.isFixed){
_b61=this.getFix();
}else{
_b61=this.bindingElement.offsetHeight;
}
return _b61;
};
SplitPanelBinding.prototype.setRatio=function(_b62){
this.setProperty("ratio",_b62);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b63){
if(_b63){
this._fixedSpan=_b63;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b63);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b63);
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
SplitPanelBinding.newInstance=function(_b64){
var _b65=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b64);
return UserInterface.registerBinding(_b65,SplitPanelBinding);
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
var _b66=SplitBoxBinding.superclass.serialize.call(this);
if(_b66){
_b66.collapse=this.getProperty("collapse");
_b66.collapsed=this.getProperty("collapsed");
_b66.disabled=this.getProperty("isdisabled");
}
return _b66;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b67=this.getProperty("hidden");
if(_b67){
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
SplitterBinding.prototype.setCollapseDirection=function(_b69){
this.setProperty("collapse",_b69);
this._collapseDirection=_b69;
};
SplitterBinding.prototype.handleAction=function(_b6a){
SplitterBinding.superclass.handleAction.call(this,_b6a);
switch(_b6a.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b6a.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b6c=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b6c.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b6c.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b6d){
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
SplitterBinding.newInstance=function(_b78){
var _b79=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b78);
return UserInterface.registerBinding(_b79,SplitterBinding);
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
var _b7a=this.getProperty("selectedindex");
var _b7b=this.getDeckElements();
if(_b7b.hasEntries()){
var _b7c=false;
var _b7d=0;
while(_b7b.hasNext()){
var deck=_b7b.getNext();
if(_b7a&&_b7d==_b7a){
deck.setAttribute("selected","true");
_b7c=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b7c=true;
}
}
_b7d++;
}
if(!_b7c){
_b7b.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b80=this.getBindingForArgument(arg);
if(_b80!=null){
if(_b80!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b80.select();
this._selectedDeckBinding=_b80;
var _b81=this.getProperty("selectedindex");
if(_b81!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b80.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b82=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b82=true;
this._lastKnownDimension=dim1;
}
return _b82;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b85){
var _b86=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b85);
return UserInterface.registerBinding(_b86,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b87){
DeckBinding.superclass.handleAction.call(this,_b87);
var _b88=_b87.target;
switch(_b87.type){
case BalloonBinding.ACTION_INITIALIZE:
_b87.consume();
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
DeckBinding.newInstance=function(_b8a){
var _b8b=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b8a);
return UserInterface.registerBinding(_b8b,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b8c){
if(_b8c instanceof ToolBarBodyBinding){
if(_b8c.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b8c;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b8c;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b8c);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b8d=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b8d){
this.setImageSize(_b8d);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b8f=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b8f.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b8f.isDefaultContent=true;
this.add(_b8f);
_b8f.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b91=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b91);
}
if(_b91!=null&&_b91.hasClassName("max")){
this._maxToolBarGroup(_b91,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b93){
var _b94=this.boxObject.getDimension().w;
var _b95=CSSComputer.getPadding(this.bindingElement);
_b94-=(_b95.left+_b95.right);
if(_b93!=null){
_b94-=_b93.boxObject.getDimension().w;
if(!Client.isWindows){
_b94-=1;
}
if(Client.isExplorer){
_b94-=15;
}
}
max.bindingElement.style.width=_b94+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b96){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b96);
};
ToolBarBinding.prototype.addLeft=function(_b97,_b98){
var _b99=null;
if(this._toolBarBodyLeft!=null){
_b99=this._toolBarBodyLeft.add(_b97,_b98);
}else{
throw new Error("No left toolbarbody");
}
return _b99;
};
ToolBarBinding.prototype.addLeftFirst=function(_b9a,_b9b){
var _b9c=null;
if(this._toolBarBodyLeft){
_b9c=this._toolBarBodyLeft.addFirst(_b9a,_b9b);
}else{
throw new Error("No left toolbarbody");
}
return _b9c;
};
ToolBarBinding.prototype.addRight=function(_b9d){
var _b9e=null;
if(this._toolBarBodyRight){
_b9e=this._toolBarBodyRight.add(_b9d);
}else{
throw new Error("No left toolbarbody");
}
return _b9e;
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
ToolBarBinding.newInstance=function(_ba1){
var _ba2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_ba1);
return UserInterface.registerBinding(_ba2,ToolBarBinding);
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
var _ba3=this.getDescendantBindingsByLocalName("toolbargroup");
var _ba4=new List();
var _ba5=true;
_ba3.each(function(_ba6){
if(_ba6.isVisible&&!_ba6.isDefaultContent){
_ba4.add(_ba6);
}
});
while(_ba4.hasNext()){
var _ba7=_ba4.getNext();
_ba7.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_ba5){
_ba7.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_ba5=false;
}
if(!_ba4.hasNext()){
_ba7.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _baa=list.getNext();
var _bab=_baa.getEqualSizeWidth();
if(_bab>max){
max=_bab;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _baa=list.getNext();
_baa.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bac,_bad){
var _bae=ToolBarBinding.superclass.add.call(this,_bac);
if(!_bad){
if(_bac instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bae;
};
ToolBarBodyBinding.prototype.addFirst=function(_baf,_bb0){
var _bb1=ToolBarBinding.superclass.addFirst.call(this,_baf);
if(!_bb0){
if(_baf instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bb1;
};
ToolBarBodyBinding.newInstance=function(_bb2){
var _bb3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bb2);
return UserInterface.registerBinding(_bb3,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bb4){
switch(_bb4){
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
var _bb5=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bb5)=="toolbarbody"){
UserInterface.getBinding(_bb5).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bb6=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bb6)=="toolbarbody"){
UserInterface.getBinding(_bb6).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bb7){
var _bb8=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bb7);
return UserInterface.registerBinding(_bb8,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bb9){
var _bba=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bb9);
return UserInterface.registerBinding(_bba,ToolBarButtonBinding);
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
var _bbb=this.getProperty("label");
var _bbc=this.getProperty("image");
if(_bbb){
this.setLabel(_bbb);
}
if(_bbc){
this.setImage(_bbc);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bbd,_bbe){
if(this.isAttached){
this._labelBinding.setLabel(_bbd,_bbe);
}
this.setProperty("label",_bbd);
};
ToolBarLabelBinding.prototype.setImage=function(_bbf,_bc0){
if(this.isAttached){
this._labelBinding.setImage(_bbf,_bc0);
}
this.setProperty("image",_bbf);
};
ToolBarLabelBinding.newInstance=function(_bc1){
var _bc2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bc1);
return UserInterface.registerBinding(_bc2,ToolBarLabelBinding);
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
var _bc3=this.getDescendantBindingsByLocalName("clickbutton");
if(_bc3.hasEntries()){
while(_bc3.hasNext()){
var _bc4=_bc3.getNext();
if(_bc4.isDefault){
this._defaultButton=_bc4;
_bc4.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bc4.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bc3;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bc5,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bc5,arg);
switch(_bc5){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bc7=this.getAncestorBindingByType(DialogBinding,true);
if(_bc7!=null&&_bc7.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bc8){
DialogToolBarBinding.superclass.handleAction.call(this,_bc8);
var _bc9=_bc8.target;
var _bca=false;
var _bcb=this._buttons.reset();
if(_bc9 instanceof ClickButtonBinding){
switch(_bc8.type){
case Binding.ACTION_FOCUSED:
_bc9.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bc9;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bc9.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bca&&_bcb.hasNext()){
var _bcc=_bcb.getNext();
_bca=_bcc.isFocused;
}
if(!_bca){
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
ComboBoxBinding.newInstance=function(_bce){
var _bcf=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bce);
return UserInterface.registerBinding(_bcf,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bd0,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bd0,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bd4=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bd4.each(function(_bd5){
var _bd6=_bd5.getProperty("oncommand");
_bd5.setProperty("hiddencommand",_bd6);
_bd5.deleteProperty("oncommand");
_bd5.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bd7=null;
var _bd8=this.getActiveMenuItemId();
_bd4.reset();
while(_bd4.hasNext()){
var _bd9=_bd4.getNext();
if(_bd9.getProperty("id")==_bd8){
_bd7=_bd9;
break;
}
}
if(_bd7==null&&_bd4.hasEntries()){
_bd7=_bd4.getFirst();
}
if(_bd7!=null){
this.setButton(_bd7);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bda){
if(_bda instanceof MenuItemBinding){
var _bdb=_bda.getProperty("label");
var _bdc=_bda.getProperty("image");
var _bdd=_bda.getProperty("image-hover");
var _bde=_bda.getProperty("image-active");
var _bdf=_bda.getProperty("image-disabled");
var _be0=_bda.getProperty("hiddencommand");
this.setLabel(_bdb?_bdb:"");
this.image=_bdc;
this.imageHover=_bdc;
this.imageActive=_bde;
this.imageDisabled=_bdf;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_be0,this);
};
this.hideActiveItem(_bda);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_be1){
if(_be1 instanceof MenuItemBinding){
this.setButton(_be1);
this.setActiveMenuItemId(_be1.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_be2){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_be3){
if(_be3==_be2){
Binding.prototype.hide.call(_be3);
}else{
Binding.prototype.show.call(_be3);
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
var _be5=this._views;
for(var _be6 in ViewDefinitions){
var def=ViewDefinitions[_be6];
var key=def.perspective;
if(key!=null){
if(!_be5.has(key)){
_be5.set(key,new List());
}
var list=_be5.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bea,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bea,arg);
switch(_bea){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bed=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bed.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bed.add(StageViewMenuItemBinding.newInstance(_bed.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bed.show();
}else{
_bed.hide();
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
TreeBinding.grid=function(_bf1){
var _bf2=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bf1);
var _bf4=_bf1%_bf2;
if(_bf4>0){
_bf1=_bf1-_bf4+_bf2;
}
return _bf1+TreeBodyBinding.PADDING_TOP;
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
var _bf5=this.getProperty("focusable");
if(_bf5!=null){
this._isFocusable=_bf5;
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
var _bf7=this.getProperty("builder");
if(_bf7){
this._buildFromTextArea(_bf7);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bf8=this.getProperty("selectable");
var _bf9=this.getProperty("selectionproperty");
var _bfa=this.getProperty("selectionvalue");
if(_bf8){
this.setSelectable(true);
if(_bf9){
this.setSelectionProperty(_bf9);
}
if(_bfa){
this.setSelectionValue(_bfa);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _bfd=UserInterface.getBinding(area);
var _bfe=this._treeBodyBinding;
function build(){
_bfe.subTreeFromString(area.value);
}
_bfd.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_bff){
var _c00=_bff.getHandle();
if(this._treeNodeBindings.has(_c00)){
throw "Duplicate treenodehandles registered: "+_bff.getLabel();
}else{
this._treeNodeBindings.set(_c00,_bff);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c00)){
_bff.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c02){
this._treeNodeBindings.del(_c02.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c03){
var _c04=null;
if(this._treeNodeBindings.has(_c03)){
_c04=this._treeNodeBindings.get(_c03);
}else{
throw "No such treenode: "+_c03;
}
return _c04;
};
TreeBinding.prototype.handleAction=function(_c05){
TreeBinding.superclass.handleAction.call(this,_c05);
var _c06=_c05.target;
switch(_c05.type){
case TreeNodeBinding.ACTION_OPEN:
_c05.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c06);
_c05.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c06;
this.focusSingleTreeNodeBinding(_c06);
if(!this.isFocused){
this.focus();
}
_c05.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c06;
this.focusSingleTreeNodeBinding(_c06);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c06;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c06;
this.focusSingleTreeNodeBinding(_c06);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c05.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c06.isFocused){
this.blurSelectedTreeNodes();
}
_c05.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c07,_c08){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c09){
if(_c09!=null&&!_c09.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c09);
_c09.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c0a){
this.blurSelectedTreeNodes();
while(_c0a.hasNext()){
var _c0b=_c0a.getNext();
this._focusedTreeNodeBindings.add(_c0b);
_c0b.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c0c=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c0d=false;
var _c0e=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c0f=this._focusedTreeNodeBindings.getNext();
var _c10=_c0f.getProperty(this._selectionProperty);
if(_c10!=null){
if(!this._selectionValue||this._selectionValue[_c10]){
_c0e=(this._selectedTreeNodeBindings[_c0f.key]=_c0f);
var _c11=_c0c[_c0f.key];
if(!_c11||_c11!=_c0e){
_c0d=true;
}
}
}
}
if(_c0e){
if(_c0d){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c0c){
for(var key in _c0c){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c13=new List();
for(var key in this._selectedTreeNodeBindings){
_c13.add(this._selectedTreeNodeBindings[key]);
}
return _c13;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c15){
_c15.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c16){
var _c17=_c16.getDescendantBindingsByLocalName("treenode");
var _c18=true;
var self=this;
_c17.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c18;
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
var _c1b=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c1b!=null){
this.focusSingleTreeNodeBinding(_c1b);
_c1b.callback();
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
TreeBinding.prototype.add=function(_c1c){
var _c1d=null;
if(this._treeBodyBinding){
_c1d=this._treeBodyBinding.add(_c1c);
}else{
this._treeNodeBuffer.add(_c1c);
_c1d=_c1c;
}
return _c1d;
};
TreeBinding.prototype.addFirst=function(_c1e){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c1f=this._treeBodyBinding.bindingElement;
_c1f.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c20,_c21){
if(_c21.isContainer&&_c21.isOpen){
_c21.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c22){
this._isSelectable=_c22;
if(_c22){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c23){
this._selectionProperty=_c23;
};
TreeBinding.prototype.setSelectionValue=function(_c24){
if(_c24){
var list=new List(_c24.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c26,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c26,arg);
switch(_c26){
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
var _c28=this.getFocusedTreeNodeBindings();
if(_c28.hasEntries()){
var node=_c28.getFirst();
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
var _c2b=this.getFocusedTreeNodeBindings();
if(_c2b.hasEntries()){
var node=_c2b.getFirst();
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
var _c2e=null;
while(next==null&&(_c2e=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c2e!=null){
next=_c2e.getNextBindingByLocalName("treenode");
}
node=_c2e;
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
var _c30=DOMEvents.getTarget(e);
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
var _c31=new TreeCrawler();
var list=new List();
_c31.mode=TreeCrawler.MODE_GETOPEN;
_c31.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c34=list.getNext();
map.set(_c34.getHandle(),true);
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
var _c39=this._positionIndicatorBinding;
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
if(y!=_c39.getPosition().y){
_c39.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c39.isVisible){
_c39.show();
}
}else{
if(_c39.isVisible){
_c39.hide();
}
}
}else{
if(_c39.isVisible){
_c39.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c3c){
this._acceptingTreeNodeBinding=_c3c;
this._acceptingPosition=_c3c.boxObject.getLocalPosition();
this._acceptingDimension=_c3c.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c3c);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c3d){
var map={};
var _c3f=_c3d.getChildBindingsByLocalName("treenode");
var _c40,pos,dim,y;
y=TreeBinding.grid(_c3d.boxObject.getLocalPosition().y);
map[y]=true;
while(_c3f.hasNext()){
_c40=_c3f.getNext();
pos=_c40.boxObject.getLocalPosition();
dim=_c40.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c46 in this._acceptingPositions){
if(_c46==y){
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
TreeBinding.newInstance=function(_c47){
var _c48=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c47);
var _c49=UserInterface.registerBinding(_c48,TreeBinding);
_c49.treeBodyBinding=TreeBodyBinding.newInstance(_c47);
return _c49;
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
TreeBodyBinding.prototype.accept=function(_c4a){
if(_c4a instanceof TreeNodeBinding){
this.logger.debug(_c4a);
}
};
TreeBodyBinding.prototype.handleAction=function(_c4b){
TreeBodyBinding.superclass.handleAction.call(this,_c4b);
switch(_c4b.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c4b.target);
_c4b.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c4c){
var _c4d=_c4c.labelBinding.bindingElement;
var a=this.bindingElement.clientHeight;
var y=_c4d.offsetTop;
var h=_c4d.offsetHeight;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
if(y-t<0){
_c4d.scrollIntoView(true);
}else{
if(y-t+h>a){
_c4d.scrollIntoView(false);
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
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c9c){
this.binding=_c9c;
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
DockTabsButtonBinding.newInstance=function(_c9d){
var _c9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c9d);
_c9e.setAttribute("type","checkbox");
_c9e.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c9e.className="tabbutton";
return UserInterface.registerBinding(_c9e,DockTabsButtonBinding);
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
var _c9f=DockBinding.superclass.serialize.call(this);
if(_c9f){
_c9f.active=this.isActive?true:null;
_c9f.collapsed=this.isCollapsed?true:null;
}
return _c9f;
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
var _ca0=UserInterface.getBinding(this.bindingElement.parentNode);
var _ca1=MatrixBinding.newInstance(this.bindingDocument);
_ca1.attachClassName("dockliner");
this.shadowTree.dockLiner=_ca1;
_ca0.add(_ca1);
_ca1.attach();
_ca1.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_ca3){
var _ca4=this.getSelectedTabPanelBinding();
if(_ca4){
_ca4.isVisible=_ca3;
_ca4.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_ca5){
var _ca6=this._getBindingForDefinition(_ca5);
var _ca7=DockTabBinding.newInstance(this.bindingDocument);
_ca7.setHandle(_ca5.handle);
_ca7.setLabel(_ca5.flowHandle?null:_ca5.label);
_ca7.setImage(_ca5.image);
_ca7.setToolTip(_ca5.toolTip);
_ca7.setEntityToken(_ca5.entityToken);
_ca7.setAssociatedView(_ca6);
this.appendTabByBindings(_ca7,null);
this._setupPageBindingListeners(_ca7);
var _ca8=this.getTabPanelBinding(_ca7);
_ca6.snapToBinding(_ca8);
var _ca9=this.bindingWindow.bindingMap.views;
_ca9.add(_ca6);
if(!this.isActive){
this.activate();
}
_ca6.attach();
};
DockBinding.prototype.prepareOpenView=function(_caa,_cab){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cab.setLabel(_caa.label);
_cab.setImage(_caa.image);
_cab.setToolTip(_caa.toolTip);
this._setupPageBindingListeners(_cab);
var _cac=this.getTabPanelBinding(_cab);
var _cad=this._getBindingForDefinition(_caa);
_cab.setAssociatedView(_cad);
_cad.snapToBinding(_cac);
UserInterface.getBinding(this.bindingDocument.body).add(_cad);
_cad.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cae){
var _caf=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_caf.bindingDocument);
view.setDefinition(_cae);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cb1){
var _cb2=this.getTabPanelBinding(_cb1);
var self=this;
var _cb4={handleAction:function(_cb5){
var _cb6=_cb5.target;
switch(_cb5.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cb6.reflex(true);
var view=_cb1.getAssociatedView();
if(_cb6.bindingWindow==view.getContentWindow()){
_cb1.updateDisplay(_cb6);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cb1.onPageInitialize(_cb6);
_cb5.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cb1.getAssociatedView();
if(_cb6.bindingWindow==view.getContentWindow()){
_cb1.updateDisplay(_cb6);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cb1.updateDisplay(_cb6);
_cb5.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cb1.updateEntityToken(_cb6);
_cb5.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cb1.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cb1.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cb1);
_cb5.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cb1,true);
_cb5.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cb1);
break;
case Binding.ACTION_FORCE_REFLEX:
_cb2.reflex(true);
_cb5.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cb1.isDirty){
_cb1.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cb8){
_cb2.addActionListener(_cb8,_cb4);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cb9){
DockBinding.superclass.handleAction.call(this,_cb9);
var _cba=_cb9.target;
switch(_cb9.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cb9.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cba instanceof DockBinding){
if(_cba.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cba);
if(this.isActive){
_cba.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cba);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cbb,arg){
DockBinding.superclass.handleBroadcast.call(this,_cbb,arg);
switch(_cbb){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cbd=arg;
if(_cbd.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cbd.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cbe){
var tabs=this.getTabBindings();
var _cc0=false;
while(tabs.hasNext()&&!_cc0){
var tab=tabs.getNext();
var _cc2=tab.getEntityToken();
if(_cc2!=null&&_cc2==_cbe){
if(!tab.isSelected){
this.select(tab,true);
_cc0=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cc3){
this._handleCollapse(true,_cc3);
};
DockBinding.prototype.unCollapse=function(_cc4){
this._handleCollapse(false,_cc4);
};
DockBinding.prototype._handleCollapse=function(_cc5,_cc6){
var _cc7=this.getChildBindingByLocalName("dockpanels");
var _cc8=this.getAncestorBindingByLocalName("splitbox");
if(_cc5){
_cc7.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cc6&&_cc8.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cc7.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cc6){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cc5);
this.isCollapsed=_cc5;
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
DockBinding.prototype.closeTab=function(_ccd,_cce){
if(_ccd.isDirty&&!_cce){
var _ccf=Resolver.resolve(_ccd.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_ccf),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cd1){
switch(_cd1){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_ccd);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_ccd);
break;
}
}});
}else{
this.removeTab(_ccd);
}
};
DockBinding.prototype.closeTabsExcept=function(_cd2){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cd2){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cd5){
var _cd6=_cd5.getAssociatedView();
_cd6.saveContainedEditor();
var self=this;
var _cd8={handleBroadcast:function(_cd9,arg){
switch(_cd9){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cd6.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cd8);
if(arg.isSuccess){
self.removeTab(_cd5);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cd8);
};
DockBinding.prototype.appendTabByBindings=function(_cdb,_cdc){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cdb,_cdc);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cdd){
_cdd=_cdd?_cdd+"px":"100%";
this.bindingElement.style.width=_cdd;
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
DockBinding.prototype.showControls=function(_cde){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cde){
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
var _ce1=DockControlBinding.newInstance(this.bindingDocument);
_ce1.setControlType(type);
return _ce1;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ce3=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ce3)){
_ce3=_ce3>0?_ce3-1:0;
self.bindingElement.style.width=new String(_ce3)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ce4){
DockTabsBinding.superclass.handleCrawler.call(this,_ce4);
switch(_ce4.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ce6=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ce6)){
_ce6=_ce6>0?_ce6-1:0;
self.bindingElement.style.width=new String(_ce6)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_ce7){
var _ce8=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_ce7);
return UserInterface.registerBinding(_ce8,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_ce9){
this._viewBinding=_ce9;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cea=DockTabBinding.superclass.serialize.call(this);
if(_cea){
_cea.label=null;
_cea.image=null;
_cea.handle=this.getHandle();
}
return _cea;
};
DockTabBinding.prototype.setHandle=function(_ceb){
this.setProperty("handle",_ceb);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cec){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cec;
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
var _ced=DialogControlBinding.newInstance(this.bindingDocument);
_ced.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_ced);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cee){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cee){
this.isDirty=_cee;
if(Binding.exists(this.labelBinding)){
var _cef=this.labelBinding.getLabel();
if(_cef!=null){
this.labelBinding.setLabel(_cee?"*"+_cef:_cef.slice(1,_cef.length));
}else{
this.labelBinding.setLabel(_cee?"*":"");
}
}
}
var _cf0=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cf0.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cf0.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cf1){
this.setLabel(_cf1.getLabel());
this.setImage(_cf1.getImage());
this.setToolTip(_cf1.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cf2){
this.setEntityToken(_cf2.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cf3){
DockTabBinding.superclass.handleAction.call(this,_cf3);
var _cf4=_cf3.target;
switch(_cf3.type){
case ControlBinding.ACTION_COMMAND:
if(_cf4.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cf3.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cf4);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cf5){
var cmd=_cf5.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cf7){
if(!_cf7){
if(!this.getLabel()){
_cf7=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cf7=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_cf7=this.isDirty?"*"+_cf7:_cf7;
DockTabBinding.superclass.setLabel.call(this,_cf7);
};
DockTabBinding.prototype.setImage=function(_cf8){
if(!_cf8){
if(!this.getImage()){
_cf8=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cf8=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cf8);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cfb=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cfb;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cfb;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cfb;
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
var _cfd=this.bindingElement;
setTimeout(function(){
_cfd.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cfe,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cfe,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cfe){
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
DockTabBinding.prototype.select=function(_d03){
DockTabBinding.superclass.select.call(this,_d03);
this._updateBroadcasters();
if(_d03!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _d04=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d05=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d05.enable();
if(this.isDirty){
_d04.enable();
}else{
_d04.disable();
}
}else{
_d05.disable();
_d04.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d06){
if(this._canUpdateTree||_d06){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d07=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d09=win.bindingMap.savebutton;
if(_d09!=null){
_d07=true;
}
}
}
return _d07;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d0a){
var _d0b=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d0a);
return UserInterface.registerBinding(_d0b,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d0c){
var _d0d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d0c);
return UserInterface.registerBinding(_d0d,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d0e){
DockPanelBinding.superclass.select.call(this,_d0e);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d0f){
DockPanelBinding.superclass.handleCrawler.call(this,_d0f);
if(_d0f.response==null){
if(_d0f.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d0f.id==FocusCrawler.ID){
_d0f.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d10){
var _d11=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d10);
return UserInterface.registerBinding(_d11,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d12){
var _d13=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d12);
return UserInterface.registerBinding(_d13,DockControlBinding);
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
ViewBinding.getInstance=function(_d14){
var _d15=ViewBinding._instances.get(_d14);
if(!_d15){
var cry="ViewBinding.getInstance: No such instance: "+_d14;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d15;
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
var _d18=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d18){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d19=snap.boxObject.getGlobalPosition();
var _d1a=snap.boxObject.getDimension();
if(!Point.isEqual(_d19,this._lastknownposition)){
this.setPosition(_d19);
this._lastknownposition=_d19;
}
if(!Dimension.isEqual(_d1a,this._lastknowndimension)){
this.setDimension(_d1a);
this._lastknowndimension=_d1a;
var _d1b=_d1a.h-ViewBinding.VERTICAL_ADJUST;
_d1b=_d1b<0?0:_d1b;
this.windowBinding.getBindingElement().style.height=new String(_d1b)+"px";
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
var _d1c=this._viewDefinition.flowHandle;
if(_d1c!=null){
FlowControllerService.CancelFlow(_d1c);
}
}
if(this._viewDefinition!=null){
var _d1d=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d1d);
this.logger.fine("ViewBinding closed: \""+_d1d+"\"");
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
var _d1f=null;
if(this._viewDefinition!=null){
_d1f=this._viewDefinition.handle;
}
return _d1f;
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
ViewBinding.prototype.setDefinition=function(_d20){
this._viewDefinition=_d20;
if(_d20.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d21){
ViewBinding.superclass.handleAction.call(this,_d21);
var _d22=_d21.target;
switch(_d21.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d21.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d22.isActivated){
_d22.onActivate();
}
}
_d21.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d22==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d21.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d22==this._snapBinding){
if(_d22.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d22.getContentWindow().isPostBackDocument){
if(_d21.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d22.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d22==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d22.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d21.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d21.type==WindowBinding.ACTION_ONLOAD){
var win=_d22.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d22);
}
}
}
_d21.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d22.label&&this._viewDefinition.label){
_d22.label=this._viewDefinition.label;
}
if(!_d22.image&&this._viewDefinition.image){
_d22.image=this._viewDefinition.image;
}
if(_d22.bindingWindow==this.getContentWindow()){
this._pageBinding=_d22;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d22.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d22==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d21.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d21.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d27,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d27,arg);
switch(_d27){
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
var _d2b=def.argument;
if(_d2b!=null){
page.setPageArgument(_d2b);
}
var _d2c=def.width;
if(_d2c!=null){
page.width=_d2c;
}
var _d2d=def.height;
if(_d2d!=null){
page.height=_d2d;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d2e){
ViewBinding.superclass.handleCrawler.call(this,_d2e);
switch(_d2e.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d2e.id==FocusCrawler.ID){
if(_d2e.previousNode!=this._snapBinding.bindingElement){
_d2e.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d2e.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d2f){
_d2f.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d2f.x+"px";
this.bindingElement.style.top=_d2f.y+"px";
};
ViewBinding.prototype.setDimension=function(_d30){
_d30.h-=ViewBinding.VERTICAL_ADJUST;
_d30.w-=ViewBinding.HORIZONTAL_ADJUST;
_d30.w-=1;
if(_d30.h<0){
_d30.h=0;
}
if(_d30.w<0){
_d30.w=0;
}
this.bindingElement.style.width=String(_d30.w)+"px";
this.bindingElement.style.height=String(_d30.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d31){
this.isFlexBoxBehavior=false;
_d31.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d31.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d31.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d31;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d32=null;
if(this.isFreeFloating==true){
_d32=this._snapBinding.getBindingElement();
}else{
_d32=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d32;
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
ViewBinding.prototype.reload=function(_d33){
this._isLoaded=false;
this.windowBinding.reload(_d33);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d34=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d34=true;
}
}
if(!_d34){
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
ViewBinding.newInstance=function(_d38){
var _d39=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d38);
var _d3a=UserInterface.registerBinding(_d39,ViewBinding);
_d3a.windowBinding=_d3a.add(WindowBinding.newInstance(_d38));
return _d3a;
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
var _d42=this.bindingWindow.__doPostBack;
var _d43=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d43){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d44,_d45){
if(!form.__isSetup){
Application.lock(self);
_d43=true;
}
self.manifestAllDataBindings();
_d42(_d44,_d45);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d46,list){
var _d48=this.bindingWindow.bindingMap.__REQUEST;
if(_d48!=null&&this._isDotNet()){
switch(_d46){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d48.postback(_d46);
}
}
break;
default:
_d48.postback(_d46);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d46,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d49,list){
var _d4b=this.getDescendantBindingsByType(WindowBinding);
_d4b.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d49,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d4f){
if(_d4f.name==null||_d4f.name==""){
return;
}
list.add({name:_d4f.name,value:_d4f.value});
});
var out="";
list.each(function(_d51){
out+=_d51.name+": "+_d51.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d52){
PageBinding.superclass.handleAction.call(this,_d52);
var _d53=_d52.target;
switch(_d52.type){
case RootBinding.ACTION_PHASE_3:
if(_d53==UserInterface.getBinding(this.bindingDocument.body)){
_d53.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d53);
}
_d52.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d54=this.validateAllDataBindings();
if(_d54){
this.doPostBack(_d53);
}
}
_d52.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d52.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d53.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d53.key)){
this._initBlockers.del(_d53.key);
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
var _d56={handleAction:function(_d57){
if(_d57.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d56);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d56);
}else{
MessageQueue.udpdate();
}
_d52.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d58,arg){
PageBinding.superclass.handleBroadcast.call(this,_d58,arg);
switch(_d58){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d5a=arg;
if(!this._canPostBack&&!_d5a){
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
PageBinding.prototype.doPostBack=function(_d5c){
if(this._canPostBack){
if(_d5c!=null&&this._isDotNet()){
var _d5d=_d5c.getCallBackID();
var _d5e=_d5c.getCallBackArg();
if(_d5d!=null){
_d5d=_d5d.replace(/_/g,"$");
}else{
_d5d="";
}
if(_d5e==null){
_d5e="";
}
this.bindingWindow.__doPostBack(_d5d,_d5e);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d5f){
var _d60=true;
var _d61=this.bindingWindow.DataManager.getAllDataBindings();
while(_d61.hasNext()&&_d60){
var _d62=_d61.getNext();
if(_d62.isAttached){
var _d63=_d62.validate();
if(_d60&&!_d63){
_d60=false;
this.logger.debug("Invalid DataBinding: "+_d62.toString()+" ("+_d62.getName()+")");
if(_d5f){
var _d64=_d62.getAncestorBindingByType(TabPanelBinding);
if(_d64!=null&&!_d64.isVisible){
var _d65=_d64.getAncestorBindingByType(TabBoxBinding);
var _d66=_d65.getTabBinding(_d64);
_d65.select(_d66);
}
}
break;
}
}
}
return _d60;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d68=this.bindingWindow.DataManager.getAllDataBindings();
while(_d68.hasNext()){
var _d69=_d68.getNext();
if(_d69.isAttached){
var _d6a=_d69.manifest();
if(_d6a!=null){
list.add(_d6a);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d6b=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6b.hasNext()){
var _d6c=_d6b.getNext();
if(_d6c.isAttached){
_d6c.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d6d="";
if(!_d6d&&this.labelfield){
var _d6e=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d6e!=null&&_d6e.getLabel){
_d6d=_d6e.getLabel();
}else{
if(_d6e!=null&&_d6e.getValue){
_d6d=_d6e.getValue();
}
}
}
if(!_d6d&&this.label){
_d6d=this.label;
}
return _d6d;
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
var _d71=this._cachedFocus.getBinding();
if(_d71){
_d71.blur();
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
var _d72=this.getProperty("width");
if(!_d72){
_d72=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d72;
}
if(this.height==null){
var _d73=this.getProperty("height");
this.height=_d73?_d73:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d74=this.getProperty("minheight");
if(_d74!=null){
this.minheight=_d74;
}
}
if(this.controls==null){
var _d75=this.getProperty("controls");
this.controls=_d75?_d75:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d76=this.getProperty("resizable");
this.isResizable=_d76?_d76:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d77){
if(_d77!=this.isAutoHeightLayoutMode){
if(_d77){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d77;
}
};
DialogPageBinding.prototype.handleAction=function(_d78){
DialogPageBinding.superclass.handleAction.call(this,_d78);
var _d79=_d78.target;
switch(_d78.type){
case PageBinding.ACTION_ATTACHED:
if(_d79!=this&&_d79.isFitAsDialogSubPage){
_d79.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d78.consume();
if(_d79.response!=null){
this.response=_d79.response;
switch(_d79.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d7a){
var _d7b=this.bindingWindow.bindingMap.buttonAccept;
if(_d7b!=null){
_d7b.setDisabled(_d7a);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d7c){
var _d7d=CSSComputer.getPadding(this.bindingElement);
var _d7e=CSSComputer.getBorder(this.bindingElement);
_d7c+=_d7d.top+_d7d.bottom;
_d7c+=_d7e.top+_d7e.bottom;
if(_d7c>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d7c+"px";
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
EditorPageBinding.prototype.handleAction=function(_d86){
EditorPageBinding.superclass.handleAction.call(this,_d86);
var _d87=_d86.target;
switch(_d86.type){
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
var _d88=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d87.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d88==-1){
_d88=0;
}
}else{
_d88++;
}
return res;
});
if(_d88>-1){
this._messengers.del(_d88);
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
_d86.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d87.key,_d87);
if(_d87 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d87.key);
if(_d87 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d87==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d87.getSelectedTabBinding();
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
_d86.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d87==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d86.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d87==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d86.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d87==this._windowBinding){
if(_d87.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d8d=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d8d);
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
var _d8e=this.bindingWindow.bindingMap.savebutton;
if(_d8e!=null&&!_d8e.isDisabled){
_d8e.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d8f=this.bindingWindow.bindingMap.__REQUEST;
if(_d8f!=null){
_d8f.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d90=this.bindingWindow.bindingMap.__REQUEST;
if(_d90!=null){
_d90.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d91){
this._message=null;
switch(_d91){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d91,this._messengers);
if(!this._messengers.hasEntries()){
if(_d91==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d91;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d91;
EditorPageBinding.superclass.postMessage.call(this,_d91,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d91,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d92,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d92,arg);
switch(_d92){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d94=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d94);
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
var _d95=new List();
this._invalidBindings.each(function(key,_d97){
var list=_d97.getInvalidLabels();
if(list){
list.each(function(_d99){
_d95.add(_d99);
});
}
});
if(_d95.hasEntries()){
var _d9a="";
while(_d95.hasNext()){
_d9a+=_d95.getNext().toLowerCase();
if(_d95.hasNext()){
_d9a+=", ";
}else{
_d9a+=".";
}
}
var _d9b=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d9b+" "+_d9a);
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
EditorPageBinding.prototype.enableSave=function(_d9c){
var _d9d=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d9d){
var _d9e=UserInterface.getBinding(_d9d);
if(_d9c){
_d9e.enable();
}else{
_d9e.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d9f=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d9f!=null){
UserInterface.getBinding(_d9f).enable();
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
var _da0=this._windowBinding.getContentDocument().title;
if(_da0==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _da1=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_da3){
if(_da3.name=="__EVENTTARGET"&&_da1){
_da3.value=_da1;
}
list.add({name:_da3.name,value:_da3.value});
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
var _da5=this.getProperty("responseid");
this.responseid=_da5;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_da6){
ResponsePageBinding.superclass.handleAction.call(this,_da6);
switch(_da6.type){
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
WizardPageBinding.prototype.handleAction=function(_da7){
WizardPageBinding.superclass.handleAction.call(this,_da7);
var _da8=_da7.target;
switch(_da7.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_da8);
}else{
_da7.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_da8);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_da7.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_da7.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_da9){
var next=this.bindingWindow.bindingMap.nextbutton;
var _dab=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_da9);
}
if(_dab){
_dab.setDisabled(!_da9);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_dac,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_dac,arg);
var self=this;
switch(_dac){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_db0){
};
MarkupAwarePageBinding.prototype._activate=function(_db1){
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
var _db2=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_db2.boxObject.getDimension().w;
_db2.hide();
var _db3=this.boxObject.getDimension().h;
this.bindingElement.style.height=_db3+"px";
var self=this;
var _db5=this.bindingWindow.bindingMap.moreactionsbutton;
_db5.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_db6){
self._showMoreActions();
_db6.consume();
}});
var _db7=this.bindingWindow.bindingMap.moreactionspopup;
_db7.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_db8){
var item=_db8.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dba,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dba,arg);
switch(_dba){
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
var _dbe=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dbe!=null){
_dbe.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dbf=this.bindingWindow.WindowManager;
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
var _dc0=new String("");
this._actionProfile.each(function(_dc1,list){
list.each(function(_dc3){
_dc0+=_dc3.getHandle()+";"+_dc3.getKey()+";";
if(_dc3.isDisabled()){
_dc0+="isDisabled='true';";
}
});
});
return _dc0;
};
SystemToolBarBinding.prototype.handleAction=function(_dc4){
SystemToolBarBinding.superclass.handleAction.call(this,_dc4);
switch(_dc4.type){
case ButtonBinding.ACTION_COMMAND:
var _dc5=_dc4.target;
this._handleSystemAction(_dc5.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dc6){
if(_dc6!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dc8=list.getFirst();
var _dc9=_dc8.node;
}
SystemAction.invoke(_dc6,_dc9);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dcc,list){
var _dce=new List();
list.reset();
while(list.hasNext()){
var _dcf=list.getNext();
var _dd0=null;
if(_dcf.isInToolBar()){
if(_dcf.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dd0=self.getToolBarButtonBinding(_dcf);
}
}
if(_dd0!=null){
_dce.add(_dd0);
}
}
if(_dce.hasEntries()){
var _dd1=ToolBarGroupBinding.newInstance(doc);
_dce.each(function(_dd2){
_dd1.add(_dd2);
});
self.addLeft(_dd1);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dd3=this.bindingWindow.bindingMap.toolsbutton;
var _dd4=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dd5=_dd3.bindingElement.offsetLeft-this._moreActionsWidth;
var _dd6=0;
var _dd7=new List();
var _dd8,_dd9=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dd8=_dd9.getNext())!=null){
if(!_dd8.isVisible){
_dd8.show();
}
_dd6+=_dd8.boxObject.getDimension().w;
if(_dd6>=_dd5){
_dd7.add(_dd8);
_dd8.hide();
}
}
if(_dd7.hasEntries()){
var _dda=_dd7.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dda).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dd8=_dd7.getNext())!=null){
this._moreActions.add(_dd8.associatedSystemAction);
}
_dd4.show();
}else{
this._moreActions=null;
_dd4.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _ddb=this.bindingWindow.bindingMap.moreactionspopup;
_ddb.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_ddb.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_ddb.add(item);
}
_ddb.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_ddd){
var _dde=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _ddf=_ddd.getLabel();
var _de0=_ddd.getToolTip();
var _de1=_ddd.getImage();
var _de2=_ddd.isDisabled();
if(_de1&&_de1.indexOf("size=")==-1){
_de1=_de1+"&size="+this.getImageSize();
_dde.imageProfile=new ImageProfile({image:_de1});
}
if(_ddf){
_dde.setLabel(_ddf);
}
if(_de0){
_dde.setToolTip(_de0);
}
if(_ddd.isDisabled()){
_dde.disable();
}
_dde.associatedSystemAction=_ddd;
return _dde;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _de3=this.getDescendantBindingByLocalName("toolbarbutton");
if(_de3!=null){
_de3.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_de4){
var _de5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_de4);
return UserInterface.registerBinding(_de5,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_de6){
var _de7=SystemTreeBinding.superclass.add.call(this,_de6);
if(!this._defaultTreeNode){
if(_de6 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_de6;
}
}
return _de7;
};
SystemTreeBinding.prototype.handleAction=function(_de8){
SystemTreeBinding.superclass.handleAction.call(this,_de8);
var _de9=_de8.target;
switch(_de8.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_de9.key);
this._updateFocusedNode();
_de8.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_de8.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_de9.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_de8.consume();
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
var _deb=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_deb);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_dec){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_dec);
var reg=this._entityTokenRegistry;
var _dee=_dec.node.getEntityToken();
if(reg.has(_dee)){
reg.get(_dee).add(_dec);
}else{
reg.set(_dee,new List([_dec]));
}
var _def=null;
if(this.isLockedToEditor){
if(_dee==StageBinding.entityToken){
if(_dec.node.isTreeLockEnabled()){
_def=_dec;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_dec.node.getHandle()){
_def=_dec;
}
}
}
if(_def!=null){
this.focusSingleTreeNodeBinding(_def);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_df0){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_df0);
var reg=this._entityTokenRegistry;
var _df2=_df0.node.getEntityToken();
if(reg.has(_df2)){
var list=reg.get(_df2);
list.del(_df0);
if(!list.hasEntries()){
reg.del(_df2);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_df0.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_df0.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _df6=this._refreshingTreeNodes;
if(_df6.hasEntries()&&_df6.has(key)){
_df6.del(key);
if(!_df6.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _df7=StageBinding.entityToken;
if(_df7!=null){
this._focusTreeNodeByEntityToken(_df7);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _df8=false;
var _df9=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_df8=false;
}else{
if(_df9.hasEntries()){
_df8=true;
while(_df8&&_df9.hasNext()){
var _dfa=_df9.getNext();
if(!_dfa.isDraggable){
_df8=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_df8;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_dfb,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_dfb,arg);
switch(_dfb){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_dfb,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_dfb);
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
var self=this,_dff=arg;
setTimeout(function(){
if(_dff!=null){
self._focusTreeNodeByEntityToken(_dff);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e01=tab.perspectiveNode==null;
if(!_e01){
_e01=tab.perspectiveNode==this.perspectiveNode;
}
if(_e01){
var self=this,_e03=tab.getEntityToken();
setTimeout(function(){
if(_e03!=null){
self._focusTreeNodeByEntityToken(_e03);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e04,_e05){
this.isLockFeatureFocus=true;
var _e06=null;
if(this._entityTokenRegistry.has(_e04)){
var list=this._entityTokenRegistry.get(_e04);
list.each(function(tn){
var _e09=true;
if(tn.node.isTreeLockEnabled()){
_e06=tn;
_e09=false;
}
return _e09;
});
if(_e06!=null){
if(!_e06.isFocused){
this.focusSingleTreeNodeBinding(_e06,true);
}else{
_e06.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e06==null&&_e05!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e04);
self._focusTreeNodeByEntityToken(_e04,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e0b){
var _e0c=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e0d=this.getRootTreeNodeBindings();
while(_e0d.hasNext()){
var _e0e=_e0d.getNext();
_e0c.add(_e0e.node.getEntityToken());
}
}else{
_e0c.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e0c.hasNext()){
var _e0f=_e0c.getNext();
var _e10=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e0f,_e0b,_e10);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e13=this._treeNodeBindings;
var _e14=new Map();
function fix(_e15,list){
if(!_e15.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e13.has(node.getHandle())){
var _e18=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e14.set(node.getHandle(),_e18);
_e15.add(_e18);
}
});
_e15.attachRecursive();
}
}
_e15.open(true);
}
map.each(function(_e19,list){
if(_e13.has(_e19)){
var _e1b=_e13.get(_e19);
fix(_e1b,list);
}else{
if(_e14.has(_e19)){
var _e1c=_e14.get(_e19);
fix(_e1c,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e1d,arg){
switch(_e1d){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e1f=arg;
if(_e1f!=null){
this._invokeServerRefresh(_e1f);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e20=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e20;
_e20.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e20=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e20;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e21){
if(_e21!=null&&_e21=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e21)){
var list=this._entityTokenRegistry.get(_e21).reset();
this._refreshToken=_e21;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e23=list.getNext();
this._refreshingTreeNodes.set(_e23.key,true);
setTimeout(function(){
_e23.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e24=this.getFocusedTreeNodeBindings().getFirst();
if(_e24){
var _e25=_e24.getLabel();
var _e26=_e24.getAncestorBindingByLocalName("treenode");
if(_e26){
_e24=_e26;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e24.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e27=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e27,[_e25]);
}
_e24.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e28=SystemTreeBinding.clipboard;
if(_e28){
var type=_e28.dragType;
var _e2a=this.getFocusedTreeNodeBindings().getFirst();
if(_e2a.dragAccept){
if(_e2a.acceptor.isAccepting(type)){
this._performPaste(_e2a);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e2b){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e2b.node.hasDetailedDropSupport()){
if(_e2b.node.hasChildren()){
var _e2d=_e2b.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e2e,_e2f){
if(_e2e==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e30=_e2f.get("switch");
var _e31=_e2f.get("sibling");
if(_e30=="after"){
_e31++;
}
var _e32=_e2b.accept(SystemTreeBinding.clipboard,_e31);
if(_e32){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e2d);
}else{
Application.lock(self);
var _e33=_e2b.accept(SystemTreeBinding.clipboard,0);
if(_e33){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e33=_e2b.accept(SystemTreeBinding.clipboard,0);
if(_e33){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e34=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e34!=null){
this._focusTreeNodeByEntityToken(_e34);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e35){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e35){
this.blurSelectedTreeNodes();
var _e36=this.getRootTreeNodeBindings();
_e36.each(function(_e37){
if(_e37.isContainer&&_e37.isOpen){
_e37.close();
_e37.hasBeenOpened=false;
_e37.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e38){
if(_e38!=this.isLockedToEditor){
this.isLockedToEditor=_e38;
if(_e38){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e3a=this.getRootTreeNodeBindings();
_e3a.each(function(_e3b){
var _e3c=_e3b.getOpenSystemNodes();
if(_e3c!=null&&_e3c.hasEntries()){
list.merge(_e3c);
}else{
if(_e3b.isOpen){
list.add(_e3b.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e3d){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e3d);
if(_e3d!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e3e){
if(_e3e){
var list=new List(_e3e.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e40=new Map();
var _e41=this.getFocusedTreeNodeBindings();
var _e42=_e41.getFirst().node.getActionProfile();
if(_e42!=null){
var self=this;
_e42.each(function(_e44,list){
var _e46=new List();
list.each(function(_e47){
if(_e47.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e47.getGroupName()]){
_e46.add(_e47);
}
}
});
if(_e46.hasEntries()){
_e40.set(_e44,_e46);
}
});
}
_e40.activePosition=this._activePosition;
return _e40;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e48,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e48,arg);
switch(_e48){
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
var _e4d=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e4d.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e4e=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e4e.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e4f){
SystemTreePopupBinding.superclass.handleAction.call(this,_e4f);
switch(_e4f.type){
case MenuItemBinding.ACTION_COMMAND:
var _e50=_e4f.target;
var _e51=_e50.associatedSystemAction;
if(_e51){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e53=list.getFirst();
var _e54=_e53.node;
}
SystemAction.invoke(_e51,_e54);
}else{
var cmd=_e50.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e57=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e57=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e57=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e57=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e57=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e57){
setTimeout(function(){
EventBroadcaster.broadcast(_e57);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e58=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e58.hasNext()){
var _e59=UserInterface.getBinding(_e58.getNext());
if(!_e59.getProperty("rel")){
_e59.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e5b=new List();
var self=this;
this._actionProfile.each(function(_e5d,list){
var _e5f=MenuGroupBinding.newInstance(doc);
list.each(function(_e60){
var _e61=self.getMenuItemBinding(_e60);
_e5f.add(_e61);
});
_e5b.add(_e5f);
});
_e5b.reverse();
while(_e5b.hasNext()){
this._bodyBinding.addFirst(_e5b.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e62){
var _e63=MenuItemBinding.newInstance(this.bindingDocument);
var _e64=_e62.getLabel();
var _e65=_e62.getToolTip();
var _e66=_e62.getImage();
var _e67=_e62.getDisabledImage();
var _e68=_e62.isCheckBox();
if(_e64){
_e63.setLabel(_e64);
}
if(_e65){
_e63.setToolTip(_e65);
}
if(_e66){
_e63.imageProfile=new ImageProfile({image:_e66,imageDisabled:_e67});
}
if(_e68){
_e63.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e62.isChecked()){
_e63.check(true);
}
}
if(_e62.isDisabled()){
_e63.disable();
}
_e63.associatedSystemAction=_e62;
return _e63;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e6c=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e6c=UserInterface.getBinding(node);
if(_e6c.isDisabled){
_e6c=null;
}
}
break;
}
if(_e6c!=null&&_e6c.node!=null&&_e6c.node.getActionProfile()!=null){
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
var _e6d=this.node.getLabel();
if(_e6d){
this.setLabel(_e6d);
}
var _e6e=this.node.getToolTip();
if(_e6e){
this.setToolTip(_e6e);
}
var _e6f=this.node.getHandle();
if(_e6f){
this.setHandle(_e6f);
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
var _e72="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e72+=list.getNext();
if(list.hasNext()){
_e72+=" ";
}
}
this.setProperty("dragaccept",_e72);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e74){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e74);
switch(_e74.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e74.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e74.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e75,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e75,arg);
switch(_e75){
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
var _e78=null;
var _e79=this.node.getImageProfile();
if(_e79){
if(this.isOpen){
_e78=_e79.getActiveImage();
}else{
_e78=_e79.getDefaultImage();
}
}
if(!_e78){
_e78=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e78;
};
SystemTreeNodeBinding.prototype.open=function(_e7a){
var _e7b=this.isContainer&&!this.isOpen;
var _e7c=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e7b&&(_e7c||SystemTreeBinding.HAS_NO_MEMORY)&&_e7a!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e7d=null;
if(this.isContainer){
_e7d=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e7d);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e7f){
if(_e7f!=null){
this._refreshBranch(_e7f);
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
var _e80=new List();
var _e81=this.node.getChildren();
this.empty();
if(_e81.hasEntries()){
this._insertTreeNodesRegulated(_e81);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e82){
var _e83=0;
var _e84=new List([]);
while(_e82.hasEntries()&&_e83<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e85=SystemTreeNodeBinding.newInstance(_e82.extractFirst(),this.bindingDocument);
_e85.autoExpand=this.autoExpand;
this.add(_e85);
_e85.attach();
_e83++;
if(this.autoExpand){
if(_e83==1&&!_e82.hasEntries()||LocalStore.openedNodes.has(_e85.node)){
_e84.add(_e85);
}
}
}
if(_e82.hasEntries()){
this._insertBufferTreeNode(_e82);
}
_e84.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e88){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e8a=this.node.getDescendantBranch(list);
if(_e8a.hasEntries()){
this.XXX(_e8a);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e8b){
var self=this;
var map=new Map();
this.empty();
_e8b.each(function(key,_e8f){
if(_e8f.hasEntries()){
_e8f.each(function(node){
var _e91=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e91);
if(map.has(key)){
var _e92=map.get(key);
_e92.add(_e91);
_e92.isOpen=true;
_e92.hasBeenOpened=true;
node.searchToken=_e92.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e91);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e8b.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e93=new TreeCrawler();
var _e94=new List();
_e93.mode=TreeCrawler.MODE_GETOPEN;
_e93.crawl(this.bindingElement,_e94);
if(_e94.hasEntries()){
_e94.extractFirst();
}
_e93.dispose();
return _e94;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e95=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e95=new List([this.node]);
list.each(function(_e97){
_e95.add(_e97.node);
});
}
return _e95;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e98,_e99){
var _e9a=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e98 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e98.node.getData(),this.node.getData(),_e99?_e99:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e9a);
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
SystemTreeNodeBinding.newInstance=function(node,_e9e){
var _e9f=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e9e);
var _ea0=UserInterface.registerBinding(_e9f,SystemTreeNodeBinding);
_ea0.node=node;
return _ea0;
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
SystemPageBinding.prototype.setPageArgument=function(_ea1){
this.node=_ea1;
SystemPageBinding.superclass.setPageArgument.call(this,_ea1);
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
var _ea2=this.node.getChildren();
if(_ea2.hasEntries()){
while(_ea2.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_ea2.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ea4=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ea4.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ea6=new TreeCrawler();
var _ea7=new List();
_ea6.mode=TreeCrawler.MODE_GETOPEN;
_ea6.crawl(this.bindingElement,_ea7);
_ea6.dispose();
var list=new List([this.node]);
_ea7.each(function(_ea9){
list.add(_ea9.node);
});
this._tree.empty();
var _eaa=this.node.getDescendantBranch(list);
if(_eaa.hasEntries()){
var self=this;
var map=new Map();
_eaa.each(function(key,_eae){
_eae.each(function(node){
var _eb0=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eb0);
if(map.has(key)){
var _eb1=map.get(key);
_eb1.add(_eb0);
_eb1.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_eb0);
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
SystemPageBinding.prototype.handleAction=function(_eb2){
SystemPageBinding.superclass.handleAction.call(this,_eb2);
switch(_eb2.type){
case ButtonBinding.ACTION_COMMAND:
var _eb3=_eb2.target;
switch(_eb3.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eb3.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_eb4,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_eb4,arg);
switch(_eb4){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _eb6=arg;
if(this.node&&this.node.getEntityToken()==_eb6){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_eb6);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_eb6);
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
StageContainerBinding.prototype.handleBroadcast=function(_eb8,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_eb8,arg);
var _eba=this.bindingWindow.WindowManager;
switch(_eb8){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_eba.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _eba.WINDOW_RESIZED_BROADCAST:
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
var _ebc=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ebc.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ebd){
if(StageBinding.isViewOpen(_ebd)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ebd);
}else{
var _ebe=ViewDefinitions[_ebd];
StageBinding.presentViewDefinition(_ebe);
}
};
StageBinding.isViewOpen=function(_ebf){
return StageBinding.bindingInstance._activeViewDefinitions[_ebf]!=null;
};
StageBinding.presentViewDefinition=function(_ec0){
if(_ec0.label!=null){
var _ec1=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ec1,[_ec0.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ec0);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ec3,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ec5=System.getPerspectiveNodes();
if(_ec5.hasEntries()){
this._initializeSystemViewDefinitions(_ec5);
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
var _ec7=null;
if(LocalStore.isEnabled){
_ec7=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ec7&&ViewDefinitions[_ec7]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ec7));
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
var _ec9=root.getActionProfile();
if(_ec9&&_ec9.hasEntries()){
var _eca=top.app.bindingMap.toolsmenugroup;
if(_eca){
_ec9.each(function(_ecb,list){
list.each(function(_ecd){
var item=MenuItemBinding.newInstance(_eca.bindingDocument);
item.setLabel(_ecd.getLabel());
item.setToolTip(_ecd.getToolTip());
item.setImage(_ecd.getImage());
item.setDisabled(_ecd.isDisabled());
item.associatedSystemAction=_ecd;
var _ecf=_eca;
var tag=_ecd.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ecf=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ecf.add(item);
});
});
_eca.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ed1){
while(_ed1.hasNext()){
var node=_ed1.getNext();
var _ed3=node.getHandle();
ViewDefinitions[_ed3]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ed4){
StageBinding.superclass.handleAction.call(this,_ed4);
var _ed5=_ed4.target;
switch(_ed4.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ed5;
this._inflateBinding(_ed5);
_ed4.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ed5;
this._inflateBinding(_ed5);
_ed4.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ed5);
_ed4.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ed5 instanceof DockBinding){
switch(_ed5.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ed5.reference,_ed5);
break;
}
this.handleAttachedDock(_ed5);
_ed4.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ed5 instanceof DockBinding){
this.handleSelectedDockTab(_ed5.getSelectedTabBinding());
_ed4.consume();
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
_ed4.consume();
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
_ed4.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ed4);
};
StageBinding.prototype.handleBroadcast=function(_ed7,arg){
StageBinding.superclass.handleBroadcast.call(this,_ed7,arg);
switch(_ed7){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ed9=arg;
this._dontView(_ed9);
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
StageBinding.prototype._showStart=function(_edb){
if(_edb!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ede=this.bindingWindow.bindingMap.maindecks;
if(_edb){
_ede.select("startdeck");
view.show();
}else{
view.hide();
_ede.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_edb;
}
};
StageBinding.prototype._inflateBinding=function(_edf){
for(var _ee0 in ViewDefinitions){
var _ee1=ViewDefinitions[_ee0];
if(_ee1 instanceof SystemViewDefinition){
_edf.mountDefinition(_ee1);
}
}
var _ee2=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ee2){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ee5=new StageCrawler();
_ee5.mode=mode;
_ee5.crawl(this.bindingElement);
_ee5.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ee6){
var _ee7=_ee6.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ee7);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ee7));
}
};
StageBinding.prototype.handleAttachedDock=function(_ee8){
var _ee9=_ee8.getTabBindings();
if(_ee9.hasEntries()){
while(_ee9.hasNext()){
var _eea=_ee9.getNext();
var _eeb=_eea.getHandle();
if(_eeb){
if(_eeb=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _eec=ViewDefinitions[_eeb];
if(_eec){
this._view(_ee8,_eea,_eec,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_eeb+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_eed){
var _eee=null;
var _eef=false;
switch(_eed.position){
case Dialog.MODAL:
_eee=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_eee=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_eed.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_eee=this._dockBindings.get(_eed.position);
break;
case DockBinding.EXTERNAL:
window.open(_eed.url);
_eef=true;
break;
default:
var _ef0=this._decksBinding.getSelectedDeckBinding();
_eee=_ef0.getDockBindingByReference(_eed.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ef1=this.bindingWindow.bindingMap.maindecks;
_ef1.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_eef=true;
}
break;
}
if(!_eef){
if(_eee!=null){
this._view(_eee,null,_eed,true);
}else{
throw "StageBinding: Could not position view: "+_eed.handle;
}
}
};
StageBinding.prototype._view=function(_ef2,_ef3,_ef4,_ef5){
var _ef6=_ef4.handle;
if(_ef4.isMutable){
_ef6+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ef6]){
var _ef7=ViewBinding.getInstance(_ef6);
if(_ef7!=null){
_ef7.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ef6);
}
}else{
this._activeViewDefinitions[_ef6]=_ef4;
Application.lock(this);
switch(_ef2.constructor){
case DockBinding:
if(_ef5){
_ef2.prepareNewView(_ef4);
}else{
_ef2.prepareOpenView(_ef4,_ef3);
}
break;
case StageDialogBinding:
if(_ef5){
_ef2.prepareNewView(_ef4);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ef8){
if(this._activeViewDefinitions[_ef8]!=null){
delete this._activeViewDefinitions[_ef8];
}else{
this.logger.debug("Could not unregister active view: "+_ef8);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ef9){
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
this.addFilter(function(_efb){
var _efc=UserInterface.getBinding(_efb);
var _efd=null;
if(_efc){
switch(_efc.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_efc.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_efc.handleUnMaximization();
break;
}
break;
case DockBinding:
_efd=NodeCrawler.SKIP_NODE;
break;
}
}
return _efd;
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
var _efe=null;
this._dialogs.each(function(_eff){
if(!_eff.isVisible){
_efe=_eff;
}
return _efe!=null;
});
if(!_efe){
this._newInstance();
_efe=this._dialogs.getLast();
}
_efe.setModal(false);
return _efe;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f00=this.getInstance();
_f00.setModal(true);
return _f00;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f01=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f01);
_f01.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f02){
if(_f02 instanceof DialogViewDefinition){
var _f03=ViewBinding.newInstance(this.bindingDocument);
_f03.setDefinition(_f02);
_f03.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f02.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f02.handler)){
this._dialogResponseHandler=_f02.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f03;
this._body.add(_f03);
_f03.attach();
_f03.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f04){
StageDialogBinding.superclass.handleAction.call(this,_f04);
var _f05=_f04.target;
switch(_f04.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f05);
_f04.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f05.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f04.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f05.response){
this._handleDialogPageResponse(_f05);
}
_f04.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f04.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f04.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f04.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f04.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f04.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f04.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f04.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f04.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f05==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f06,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f06,arg);
switch(_f06){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f08){
var _f09=new FitnessCrawler();
var list=new List();
if(_f08){
_f09.mode=FitnessCrawler.MODE_BRUTAL;
}
_f09.crawl(this.bindingElement,list);
_f09.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f0b){
_f0b.fit(_f08);
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
var _f0c=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f0c){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f0e){
var cmd=_f0e.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f10){
if(_f10.bindingDocument==this._viewBinding.getContentDocument()){
if(_f10 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f10);
}
this._pageBinding=_f10;
if(_f10.height=="auto"){
_f10.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f10);
_f10.enableAutoHeightLayoutMode(false);
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
if(_f10.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f10);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f11){
var _f12=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f12){
var _f13=UserInterface.getBinding(_f12);
_f13.setDisabled(_f11);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f14){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f14.response,_f14.result!=null?_f14.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f16){
if(_f16.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f16);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f18){
switch(_f18.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f18.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f18.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f19){
var _f1a=_f19.label;
var _f1b=_f19.image;
var _f1c=_f19.width;
var _f1d=_f19.height;
var _f1e=_f19.controls;
var _f1f=_f19.isResizable;
if(_f1a){
this.setLabel(_f1a);
}
if(_f1b){
this.setImage(_f1b);
}
if(_f1c||_f1d){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f1c?_f1c:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f1d!=null&&_f1d!="auto")?_f1d:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f1e){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f23=new List(_f1e.split(" "));
while((type=_f23.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f1f!=this._isResizable){
this.setResizable(_f1f);
}
if(_f1d=="auto"){
this._fixAutoHeight(_f19);
}
if(_f19==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f24){
var dim=this.getDimension();
var _f26=0;
var _f27=0;
if(_f24.isDialogSubPage){
_f24=this._pageBinding;
}
if(this._isFirstPage){
_f26=_f24.width!=null?_f24.width:dim.w;
}else{
_f26=dim.w;
}
_f27=_f24.bindingElement.offsetHeight;
_f27+=this._titlebar.bindingElement.offsetHeight;
_f27+=4;
_f27+=4;
if(_f27<dim.h){
_f27=dim.h;
}
if(_f24.minheight!=null){
if(_f27<_f24.minheight){
_f27=_f24.minheight;
}
}
this.setDimension(new Dimension(_f26,_f27));
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
StageDialogBinding.newInstance=function(_f2a){
var _f2b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f2a);
var _f2c=UserInterface.registerBinding(_f2b,StageDialogBinding);
_f2c.setProperty("controls","minimize maximize close");
return _f2c;
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
this.addFilter(function(_f2d,list){
var _f2f=null;
var _f30=UserInterface.getBinding(_f2d);
if(!_f30.isVisible){
_f2f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f2f;
});
this.addFilter(function(_f31,list){
var _f33=null;
var _f34=UserInterface.getBinding(_f31);
if(_f34.isAttached){
if(Interfaces.isImplemented(IFit,_f34)){
if(!_f34.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f34);
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
StageDecksBinding.prototype.mountDefinition=function(_f35){
var _f36=StageDeckBinding.newInstance(this.bindingDocument);
_f36.handle=_f35.handle;
_f36.perspectiveNode=_f35.node;
this._decks[_f36.handle]=_f36;
this.add(_f36);
_f36.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f37){
var _f38=this._decks[_f37];
StageBinding.perspectiveNode=_f38.perspectiveNode;
this.select(_f38);
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
StageDeckBinding.prototype.handleAction=function(_f39){
StageDeckBinding.superclass.handleAction.call(this,_f39);
var _f3a=_f39.target;
switch(_f39.type){
case WindowBinding.ACTION_LOADED:
if(_f3a==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f39.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f3a instanceof DockBinding){
this._dockBindings.set(_f3a.reference,_f3a);
_f3a.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f39.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f39.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f39);
StageDeckBinding.superclass.handleAction.call(this,_f39);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f3c=new StageCrawler();
_f3c.mode=mode;
_f3c.crawl(this.windowBinding.getContentDocument().body);
_f3c.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f3d){
return this._dockBindings.get(_f3d);
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
StageDeckBinding.newInstance=function(_f3f){
var _f40=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f3f);
var _f41=UserInterface.registerBinding(_f40,StageDeckBinding);
return _f41;
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
StageSplitBoxBinding.prototype.handleAction=function(_f42){
StageSplitBoxBinding.superclass.handleAction.call(this,_f42);
StageBoxAbstraction.handleAction.call(this,_f42);
var _f43=_f42.target;
var _f44=null;
var _f45=null;
switch(_f42.type){
case DockBinding.ACTION_EMPTIED:
_f45=this.getChildBindingByLocalName("splitter");
if(_f45.isVisible){
_f45.hide();
}
_f44=this.getDescendantBindingsByLocalName("dock");
if(_f44.getFirst().isEmpty&&_f44.getLast().isEmpty){
if(_f44.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f42.consume();
break;
case DockBinding.ACTION_OPENED:
_f44=this.getDescendantBindingsByLocalName("dock");
if(!_f44.getFirst().isEmpty&&!_f44.getLast().isEmpty){
_f45=this.getChildBindingByLocalName("splitter");
if(!_f45.isVisible){
_f45.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f42.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f43!=this){
_f45=this.getChildBindingByLocalName("splitter");
if(_f45.isVisible){
_f45.hide();
}
this.invokeLayout();
_f42.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f43!=this){
var _f46=this.getChildBindingsByLocalName("splitpanel");
if(_f46.getFirst().isVisible&&_f46.getLast().isVisible){
_f45=this.getChildBindingByLocalName("splitter");
if(!_f45.isVisible){
_f45.show();
}
}
this.invokeLayout();
_f42.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f47){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f47);
switch(_f47.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f47.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f48=this.getChildBindingsByLocalName("splitpanel");
return _f48.getFirst().isVisible&&_f48.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f49=this.getChildBindingsByLocalName("splitpanel");
return _f49.getFirst().isFixed&&_f49.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f4a){
StageSplitPanelBinding.superclass.handleAction.call(this,_f4a);
StageBoxAbstraction.handleAction.call(this,_f4a);
switch(_f4a.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f4a.type==StageSplitBoxBinding.ACTION_HIDE){
_f4a.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f4a.type==DockBinding.ACTION_EMPTIED){
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
if(_f4a.type==StageSplitBoxBinding.ACTION_SHOW){
_f4a.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f4d=_f4a.target;
if(_f4d!=this&&_f4d.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f4e=_f4d._containingSplitBoxBinding;
if(_f4e.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f4f=_f4e.getChildBindingsByLocalName("splitpanel");
var _f50=_f4f.getFirst();
var _f51=_f4f.getLast();
if(this.isFixed==true){
if(!_f50.isFixed||!_f51.isFixed||(!_f4e.hasBothPanelsVisible()&&_f4d.isMinimizedForReal)){
this.setFix(false);
_f4a.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f4e.hasBothPanelsFixed()||(!_f4e.hasBothPanelsVisible()&&_f4d.isMinimizedForReal)){
this.setFix(_f4d.getContainedDock().getHeight());
_f4a.consume();
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
var _f52=this.getContainedDock();
if(_f52){
if(this.isMaximizePrepared==true){
}else{
_f52.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f53=this.getContainedDock();
if(_f53){
if(_f53.type==DockBinding.TYPE_EDITORS){
if(_f53.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f53.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f54=this.getContainedDock();
if(_f54){
_f54.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f54);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f55=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f56=this.getContainedDock();
if(_f56){
_f56.collapse(_f55);
if(!_f55){
this.setFix(_f56.getHeight());
}else{
this.setFix(_f56.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f56&&_f56.isActive){
_f56.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f56);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f57){
var _f58=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f59=this.getContainedDock();
if(_f59){
if(this.isMinimized==true){
_f59.unCollapse(_f58);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f57){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f59){
_f59.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f59);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f5a){
var _f5b=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f5b=false;
}
}
if(_f5b==true){
this._invisibilize(_f5a);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f5d){
if(_f5d!=this._isInvisibilized){
if(_f5d){
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
StageSplitterBinding.prototype.onDragStart=function(_f5e){
var _f5f=top.app.bindingMap.stagesplittercover;
var _f60=this._containingSplitBoxBinding.getOrient();
switch(_f60){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f5f.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f5f.bindingElement.style.cursor="n-resize";
break;
}
_f5f.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f60);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f66){
this._orient=_f66;
this.attachClassName(_f66);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f68=true;
var _f69=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f69=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f68=false;
break;
}
if(_f68){
this.bindingElement.style.left=pos.x+"px";
}
if(_f69){
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
StageBoxAbstraction.handleAction=function(_f6b){
switch(_f6b.type){
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
if(_f6b.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f6b.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f6c=this.bindingElement.style;
_f6c.position="absolute";
_f6c.width="100%";
_f6c.height="100%";
_f6c.top="0";
_f6c.left="0";
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
var _f6d=this.bindingElement.style;
_f6d.position="relative";
_f6d.width="auto";
_f6d.height="auto";
_f6d.top="auto";
_f6d.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f6e,_f6f){
var _f70=_f6e.bindingElement.style;
var _f71=_f6e.bindingElement.parentNode;
var box=_f6e._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f6f){
_f6e._unmodifiedFlexMethod=_f6e.flex;
_f6e.flex=function(){
_f70.width=_f71.offsetWidth+"px";
_f70.height=_f71.offsetHeight+"px";
};
}else{
_f70.width="100%";
_f70.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f70.width="auto";
_f70.height="auto";
box.reflex(true);
},0);
}
_f6e.flex=_f6e._unmodifiedFlexMethod;
_f6e._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f73){
var _f74=_f73.target;
switch(_f73.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f74 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f73);
_f73.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f73.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f75){
var mode=null;
switch(_f75.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f77){
StageMenuBarBinding.superclass.handleAction.call(this,_f77);
switch(_f77.type){
case MenuItemBinding.ACTION_COMMAND:
var _f78=_f77.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f78){
SystemAction.invoke(_f78,this._rootNode);
}
}
_f77.consume();
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
var _f79=this.getProperty("handle");
if(_f79){
this._handle=_f79;
if(StageBinding.isViewOpen(_f79)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f79);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f7b){
this.setProperty("handle",_f7b);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f7c,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f7c,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f7c){
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
StageViewMenuItemBinding.newInstance=function(_f7e){
var _f7f=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f7e);
UserInterface.registerBinding(_f7f,StageViewMenuItemBinding);
return UserInterface.getBinding(_f7f);
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
StageStatusBarBinding.prototype.setLabel=function(_f80){
this._label.setLabel(_f80);
};
StageStatusBarBinding.prototype.setImage=function(_f81){
this._label.setImage(_f81);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f82){
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
var _f83=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f84=_f83.getAssociatedView();
var _f85=_f84.getContentWindow().bindingMap.tree;
var _f86=_f85.getFocusedTreeNodeBindings();
if(!_f86.hasEntries()&&StageBinding.treeSelector){
_f86=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f86;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f87=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f87.each(function(_f88){
LocalStore.focuseNodes.add(_f88.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f89=LocalStore.focuseNodes.getEntityTokens();
var _f8a=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f8b=_f8a.getAssociatedView();
var _f8c=_f8b.getContentWindow().bindingMap.tree;
_f89=new List(TreeService.GetCurrentLocaleEntityTokens(_f89.toArray()));
_f89.each(function(_f8d){
_f8c._focusTreeNodeByEntityToken(_f8d);
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
ExplorerBinding.prototype.handleAction=function(_f8e){
ExplorerBinding.superclass.handleAction.call(this,_f8e);
var _f8f=_f8e.target;
switch(_f8e.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f8e.consume();
break;
case Binding.ACTION_DRAG:
if(_f8f instanceof ExplorerSplitterBinding){
_f8f.dragger.registerHandler(this);
}
_f8e.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f91){
this._menuBinding.setSelectionByHandle(_f91);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f92){
if(_f92 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f92);
this._menuBinding.mountDefinition(_f92);
}
};
ExplorerBinding.prototype.onDragStart=function(_f93){
var _f94=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f94.hasEntries()){
var _f95=_f94.getFirst();
this._dragStart=_f95.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f95.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f99){
if(_f99 instanceof SystemViewDefinition){
var _f9a=ViewBinding.newInstance(this.bindingDocument);
_f9a.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f9a.setDefinition(_f99);
var _f9b=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f9b.setAssociatedView(_f9a);
this._decks[_f99.handle]=_f9b;
_f9b.add(_f9a);
this.add(_f9b);
function attach(){
_f9b.attach();
_f9a.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f9c){
var _f9d=this._decks[_f9c];
this.select(_f9d);
};
DecksBinding.prototype.expandBy=function(_f9e){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fa0=this.bindingElement.offsetHeight+_f9e;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fa0+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fa2){
var _fa3=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fa2);
return UserInterface.registerBinding(_fa3,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fa4){
this._viewBinding=_fa4;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fa5=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fa6=this._viewBinding.getDefinition().label;
StatusBar.busy(_fa5,[_fa6]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fa7){
ExplorerDeckBinding.superclass.handleAction.call(this,_fa7);
var _fa8=_fa7.target;
switch(_fa7.type){
case PageBinding.ACTION_INITIALIZED:
if(_fa8 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fa8.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fa9,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fa9,arg);
switch(_fa9){
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
var _fab=null;
if(this._isExplorerDeckBindingInitialized){
_fab=this._viewBinding.getDefinition().label;
}else{
_fab=DockTabBinding.LABEL_TABLOADING;
}
return _fab;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fac=null;
if(this._isExplorerDeckBindingInitialized){
_fac=this._viewBinding.getDefinition().image;
}else{
_fac=DockTabBinding.IMG_TABLOADING;
}
return _fac;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fad=null;
if(this._isExplorerDeckBindingInitialized){
_fad=this._viewBinding.getDefinition().toolTip;
}
return _fad;
};
ExplorerDeckBinding.newInstance=function(_fae){
var _faf=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fae);
return UserInterface.registerBinding(_faf,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fb0){
switch(_fb0.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fb0.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fb0.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fb0);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fb1){
this._maxButtons.set(_fb1.handle,this._mountMaxButton(_fb1));
this._minButtons.set(_fb1.handle,this._mountMinButton(_fb1));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fb2){
var _fb3=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fb3.setLabel(_fb2.label);
_fb3.setToolTip(_fb2.toolTip);
_fb3.handle=_fb2.handle;
_fb3.node=_fb2.node;
this._maxGroup.add(_fb3);
this._maxList.add(_fb3);
_fb3.attach();
if(Client.isPad){
_fb3.hide();
}
return _fb3;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fb4){
var _fb5=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fb5.setLabel(_fb4.label);
_fb5.setToolTip(_fb4.label);
_fb5.handle=_fb4.handle;
_fb5.node=_fb4.node;
this._minGroup.addFirst(_fb5);
this._minList.add(_fb5);
_fb5.attach();
if(!Client.isPad){
_fb5.hide();
}
return _fb5;
};
ExplorerMenuBinding.prototype.handleAction=function(_fb6){
ExplorerMenuBinding.superclass.handleAction.call(this,_fb6);
switch(_fb6.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fb7=_fb6.target;
var _fb8=_fb7.getCheckedButtonBinding();
var _fb9=_fb8.handle;
switch(_fb7){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fb9),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fb9),true);
break;
}
this._selectedHandle=_fb9;
this._selectedTag=_fb8.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fb6.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fba){
var _fbb=this._maxButtons.get(_fba);
if(_fbb){
_fbb.check();
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
var _fbc=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fbc=true;
}
return _fbc;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fbe=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fbe=true;
}
return _fbe;
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
ExplorerToolBarBinding.newInstance=function(_fbf){
var _fc0=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fbf);
return UserInterface.registerBinding(_fc0,ExplorerToolBarBinding);
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
var _fc1=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fc2=_fc1?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fc2);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fc3,_fc4){
var _fc5=(_fc4==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fc6=DOMUtil.createElementNS(Constants.NS_UI,_fc5,_fc3);
var _fc7=UserInterface.registerBinding(_fc6,ExplorerToolBarButtonBinding);
_fc7.explorerToolBarButtonType=_fc4;
return _fc7;
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
EditorBinding.invokeFunctionEditorDialog=function(_fc8,_fc9,type){
type=type?type:"";
var _fcb=FunctionService.GetCustomEditorSettingsByMarkup(_fc8);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fcb){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fcb.Width?(_fcb.Width>dim.w?dim.w:_fcb.Width):undefined;
def.height=_fcb.Height?(_fcb.Height>dim.h?dim.h:_fcb.Height):undefined;
if(_fcb.Url){
_fcb.Url=_fcb.Url.indexOf("?")>-1?_fcb.Url+"&consoleId="+Application.CONSOLE_ID:_fcb.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fc9;
def.argument={url:_fcb?_fcb.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fc8}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fce,_fcf){
var _fd0=EditorBinding._components;
var _fd1=EditorBinding._editors;
var key=_fcf.key;
var _fd3=Interfaces.isImplemented(IWysiwygEditorComponent,_fce);
if(!_fd3){
_fd3=Interfaces.isImplemented(ISourceEditorComponent,_fce);
}
if(_fd3){
if(_fd1.has(key)){
_fd1.get(key).initializeEditorComponent(_fce);
}else{
if(!_fd0.has(key)){
_fd0.set(key,new List());
}
_fd0.get(key).add(_fce);
}
}else{
throw "Editor component interface not implemented: "+_fce;
}
};
EditorBinding.claimComponents=function(_fd4,_fd5){
var _fd6=EditorBinding._components;
var _fd7=EditorBinding._editors;
var key=_fd5.key;
_fd7.set(key,_fd4);
var list=null;
if(_fd6.has(key)){
list=_fd6.get(key).copy();
_fd6.del(key);
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
var _fdb=this.getProperty("value");
if(_fdb!=null){
_fdb=decodeURIComponent(_fdb);
this._startContent=_fdb;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fdd=this.bindingWindow.DataManager;
_fdd.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fdf){
var _fe0=EditorBinding.claimComponents(this,_fdf);
if(_fe0!=null){
while(_fe0.hasNext()){
this.initializeEditorComponent(_fe0.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fe2=this.bindingWindow.DataManager;
if(_fe2.getDataBinding(name)){
_fe2.unRegisterDataBinding(name);
}
_fe2.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fe3=this.getEditorDocument();
if(_fe3!=null){
Application.framework(_fe3);
DOMEvents.addEventListener(_fe3,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fe3,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fe3,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fe3,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fe5){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fe5==true){
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
var _fe7=this.getCheckSum();
if(_fe7!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fe7;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fe8=null;
if(Binding.exists(this._pageBinding)){
_fe8=this._pageBinding.getCheckSum(this._checksum);
}
return _fe8;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fea=DOMEvents.getTarget(e);
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
if(_fea.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fec,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fec,arg);
var _fee=null;
switch(_fec){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _fef=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fef=false;
}
}
}else{
_fee=DOMEvents.getTarget(arg);
if(_fee&&_fee.ownerDocument==this.getEditorDocument()){
_fef=false;
}
}
if(_fef){
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
EditorBinding.prototype._activateEditor=function(_ff0){
if(_ff0!=this._isActivated){
this._isActivated=_ff0;
EditorBinding.isActive=_ff0;
var _ff1=this.getEditorWindow().standardEventHandler;
var _ff2=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ff2!=null){
if(_ff0){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ff2.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_ff1.enableNativeKeys(true);
}else{
_ff2.disable();
_ff1.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _ff3=this.getEditorDocument().selection.createRange();
_ff3.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _ff4=false;
try{
var _ff5=this.getEditorWindow().getSelection();
if(_ff5!=null){
_ff4=_ff5.toString().length>0;
if(!_ff4){
var _ff6=_ff5.getRangeAt(0);
var frag=_ff6.cloneContents();
var _ff8=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_ff8.appendChild(frag.firstChild);
}
var img=_ff8.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_ff4=true;
}
}
}
}
}
catch(exception){
}
return _ff4;
};
EditorBinding.prototype.isCommandEnabled=function(_ffa){
var _ffb=true;
switch(_ffa){
case "Cut":
case "Copy":
case "Paste":
_ffb=this.getEditorDocument().queryCommandEnabled(_ffa);
break;
}
return _ffb;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fff=false;
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
_fff=true;
}
break;
}
return _fff;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1002=this.getContentWindow().bindingMap.toolbar;
var _1003=_1002.getButtonForCommand(cmd);
if(!_1003){
throw "No button for command "+cmd;
}
return _1003;
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
EditorBinding.prototype.handleAction=function(_1007){
EditorBinding.superclass.handleAction.call(this,_1007);
var _1008=_1007.target;
var self=this;
var _100a=this.shadowTree.iframe;
switch(_1007.type){
case Binding.ACTION_DIRTY:
if(_1007.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_100b){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_100b);
};
EditorBinding.prototype.handleElement=function(_100c){
return true;
};
EditorBinding.prototype.updateElement=function(_100d){
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
var _1010=this._menuGroups[rel];
if(_1010 instanceof List){
_1010.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1013=this._menuGroups[rel];
if(_1013 instanceof List){
_1013.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1015){
EditorPopupBinding.superclass.handleAction.call(this,_1015);
var _1016=_1015.target;
if(_1015.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1016.getProperty("cmd");
var gui=_1016.getProperty("gui");
var val=_1016.getProperty("val");
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
var _101a=this.bindingWindow.bindingMap.tinywindow;
var _101b=this.bindingWindow.bindingMap.codepresswindow;
if(_101a){
EditorBinding.registerComponent(this,_101a);
}else{
if(_101b){
EditorBinding.registerComponent(this,_101b);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_101c,_101d,_101e,theme){
this._editorBinding=_101c;
this._tinyEngine=_101d;
this._tinyInstance=_101e;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1020,frame,_1022){
this._editorBinding=_1020;
this._codePressFrame=frame;
this._codePressEngine=_1022;
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
var _1025=this._editorBinding;
if(_1025!=null){
var self=this;
var _1027={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1025.hasBookmark()){
_1025.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1025.hasBookmark()){
_1025.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1027);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1027);
}
};
EditorClickButtonBinding.newInstance=function(_1029){
var _102a=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1029);
return UserInterface.registerBinding(_102a,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_102b){
var _102c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_102b);
return UserInterface.registerBinding(_102c,EditorToolBarButtonBinding);
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
var _102d=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_102d);
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
EditorSelectorBinding.prototype.initializeComponent=function(_102e,_102f,_1030,theme){
this._editorBinding=_102e;
this._tinyEngine=_102f;
this._tinyInstance=_1030;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1032){
EditorSelectorBinding.superclass.handleAction.call(this,_1032);
switch(_1032.type){
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
EditorMenuItemBinding.newInstance=function(_1036){
var _1037=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1036);
return UserInterface.registerBinding(_1037,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1038){
var i=0,_103a,_103b=[],split=_1038.split(" ");
while((_103a=split[i++])!=null){
if(_103a.length>=3&&_103a.substring(0,3)=="mce"){
continue;
}else{
if(_103a.length>=14&&_103a.substring(0,14)=="compositemedia"){
continue;
}
}
_103b.push(_103a);
}
return _103b.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_103d){
var _103e=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_103d);
if(soap instanceof SOAPFault){
}else{
_103e=soap.XhtmlFragment;
if(!_103e){
_103e="";
}
}
WebServiceProxy.isFaultHandler=true;
return _103e;
};
VisualEditorBinding.getTinyContent=function(_1040,_1041){
var _1042=null;
if(_1040==null||!_1040.replace(/\s*/gm,"").length){
_1040=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1041.getSoapTinyContent(_1040);
if(soap instanceof SOAPFault){
var _1044=soap;
var _1045={handleDialogResponse:function(){
_1041.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1045,_1044);
}else{
_1042=soap.XhtmlFragment;
if(_1042==null){
_1042=new String("");
}
_1042=_1042.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1042;
};
VisualEditorBinding.isImage=function(_1046){
return _1046&&_1046.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_1047){
return VisualEditorBinding.isImage(_1047)&&!VisualEditorBinding.isReservedElement(_1047);
};
VisualEditorBinding.isReservedElement=function(_1048){
if(VisualEditorBinding.isFunctionElement(_1048)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1048)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1048)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1049){
return VisualEditorBinding.isImage(_1049)&&CSSUtil.hasClassName(_1049,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_104a){
return VisualEditorBinding.isImage(_104a)&&CSSUtil.hasClassName(_104a,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_104b){
return VisualEditorBinding.isImage(_104b)&&CSSUtil.hasClassName(_104b,VisualEditorBinding.HTML_CLASSNAME);
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
var _104c=this.getProperty("embedablefieldstypenames");
if(_104c!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_104c);
}
var _104d=this.getProperty("formattingconfiguration");
if(_104d!=null){
this._url+="?config="+_104d;
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
VisualEditorBinding.prototype.handleBroadcast=function(_104e,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_104e,arg);
var _1050=this.getContentWindow().bindingMap.tinywindow;
var _1051=_1050.getContentWindow();
switch(_104e){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1051){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1050);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1052){
_1052.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1053=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1053.replace(/\s*/gm,"").length==0){
_1053=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1053,{format:"raw"});
this.updateBodyWidth();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1054){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1054);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _1056=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_1056=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_1056=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _1056;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1059){
var _105a=_1059;
if(!this._isNormalizedDocument(_1059)){
_105a=this._getHtmlMarkup().replace("${body}",_1059);
}
return _105a;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_105b){
var _105c=false;
var doc=XMLParser.parse(_105b,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_105c=true;
}
}
if(Client.isWebKit){
if(_105b.indexOf("<html")!==0){
_105c=false;
}
}
return _105c;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1061=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1061){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1061=true;
}
return _1061;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1063=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1063);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1065){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1065,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_1067){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1067,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _106a=CSSComputer.getPadding(body);
var _106b=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_106b.bindingElement.offsetWidth-52;
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
}
};
VisualEditorBinding.prototype.focus=function(){
VisualEditorBinding.superclass.focus.call(this);
if(Client.isExplorer&&this._tinyInstance){
this._tinyInstance.selection.setRng(this._tinyInstance.selection.getRng());
}
};
VisualEditorBinding.prototype.setResult=function(_106e){
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
VisualEditorPopupBinding.prototype.configure=function(_106f,_1070,_1071){
var _1072=this.editorBinding.hasSelection();
this.tinyInstance=_106f;
this.tinyEngine=_1070;
this.tinyElement=_1071;
this.hasSelection=_1072;
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
var _1076=false;
if(this.hasSelection){
_1076=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1076=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1076=true;
}
}
}
}
if(_1076){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1077=this.getMenuItemForCommand("compositeInsertLink");
var _1078=this.getMenuItemForCommand("unlink");
var _1079=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _107a=this.editorBinding.getButtonForCommand("unlink");
_1078.setDisabled(_107a.isDisabled);
if(_1078.isDisabled){
_1077.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1077.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _107b=this.editorBinding.embedableFieldConfiguration;
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
if(_107b){
var _107e=_107b.getGroupNames();
if(_107e.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_107e.each(function(_1082){
var _1083=_107b.getFieldNames(_1082);
_1083.each(function(_1084){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1084);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1082+":"+_1084);
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
var _1086=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1087=null;
var _1088=null;
if(_1086){
if(_1086.nodeName=="TD"){
_1087=_1086.getAttribute("colspan");
_1088=_1086.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1087=="1"&&_1088=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1086){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1089){
var _108a=VisualEditorFormattingConfiguration._configurations;
if(!_108a.has(_1089)){
_108a.set(_1089,new VisualEditorFormattingConfiguration());
}
return _108a.get(_1089);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_108c){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_108d){
var _108e=null;
var _108f=VisualEditorFieldGroupConfiguration._configurations;
if(!_108f.has(_108d)){
_108f.set(_108d,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_108d)));
}
return _108f.get(_108d);
};
function VisualEditorFieldGroupConfiguration(_1090){
var _1091=new Map();
new List(_1090).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1091.set(group.GroupName,map);
});
this._groups=_1091;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1095){
return this._groups.get(_1095).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1096,_1097){
return this._groups.get(_1096).get(_1097).xhtml;
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
var _1099=this.getDescendantElementsByLocalName("textarea");
while(_1099.hasNext()){
var _109a=_1099.getNext();
if(_109a.getAttribute("selected")=="true"){
this._startContent=_109a.value;
this._textareaname=_109a.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _109c=this.getContentWindow().bindingMap.templatetree;
_109c.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_109d){
var _109e=_109c.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_109e.textareaname);
_109d.consume();
}});
_109c.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_109f){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10a0=this.getContentWindow().bindingMap.toolsplitter;
_10a0.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10a1=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10a1.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10a1);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10a2){
this._textareas=new Map();
while(_10a2.hasNext()){
var _10a3=_10a2.getNext();
var _10a4=_10a3.getAttribute("placeholderid");
this._textareas.set(_10a4,{placeholderid:_10a4,placeholdername:_10a3.getAttribute("placeholdername"),placeholdermarkup:_10a3.value,textareaelement:_10a3,isSelected:_10a3.getAttribute("selected")=="true"});
}
var _10a5=new Map();
this._textareas.each(function(name,_10a7){
var _10a8=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10a8.setLabel(_10a7.placeholdername);
_10a8.setImage("${icon:placeholder}");
_10a8.setProperty("placeholder",true);
_10a8.textareaname=name;
_10a5.set(_10a7.placeholdername,_10a8);
if(_10a7.isSelected){
selected=_10a8;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10a9=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10a9.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10aa=this.getContentWindow().bindingMap.templatetree;
var _10ab=_10aa.add(TreeNodeBinding.newInstance(_10aa.bindingDocument));
_10ab.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10ab.setImage("${icon:warning}");
_10ab.attach();
var _10ac=this.getContentWindow().bindingMap.statusbar;
_10ac.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10ae=this._textareas.get(name);
var _10af=_10ae.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10af));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10b0){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10b0;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10b1=this.getContentWindow().bindingMap.statusbar;
_10b1.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10b0);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10b4=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10b4;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10b5=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10b5=this._xhtmls.get(this._textareaname);
if(_10b5==null){
_10b5=VisualEditorBinding.XHTML;
}
}
return _10b5;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10b7){
_10b7.textareaelement.value=_10b7.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10b8,_10b9){
var _10ba=_10b8.getElementsByTagName("div").item(0);
var _10bb=_10b9.getElementsByTagName("div").item(0);
var _10bc=new List(_10ba.getElementsByTagName("textarea"));
var _10bd=new List(_10bb.getElementsByTagName("textarea"));
var _10be=false;
if(_10bc.getLength()!=_10bd.getLength()){
_10be=true;
}else{
var index=0;
_10bc.each(function(_10c0,index){
var _10c2=_10bd.get(index);
var newid=_10c0.getAttribute("placeholderid");
var oldid=_10c2.getAttribute("placeholderid");
var _10c5=_10c0.getAttribute("placeholdername");
var _10c6=_10c2.getAttribute("placeholdername");
if(newid!=oldid||_10c5!=_10c6){
_10be=true;
}
return !_10be;
});
}
if(_10be){
var html=null;
if(_10ba.innerHTML!=null){
html=_10ba.innerHTML;
}else{
html=DOMSerializer.serialize(_10ba);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10c9){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10c9);
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
var _10cc=this.getDescendantBindingByLocalName("selector");
_10cc.attach();
this._populateTemplateSelector();
var _10cd=this.getContentWindow().bindingMap.templateselector;
_10cd.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10ce=this.getDescendantBindingByLocalName("selector");
var _10cf=this.getContentWindow().bindingMap.templateselector;
_10ce.selections.each(function(_10d0){
_10d0.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10cf.populateFromList(_10ce.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10d1=this.getDescendantBindingByLocalName("selector");
var _10d2=this.getContentWindow().bindingMap.templateselector;
_10d1.selectByValue(_10d2.getValue());
_10d1.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10d3){
this.updateTemplatePreview();
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10d8,_10d9){
var _10da=_10d9;
if(old.has(_10d8)){
_10da=old.get(_10d8).placeholdermarkup;
}
return _10da;
}
while(_10d3.hasNext()){
var _10db=_10d3.getNext();
var _10dc=_10db.getAttribute("placeholderid");
this._textareas.set(_10dc,{placeholderid:_10dc,placeholdername:_10db.getAttribute("placeholdername"),placeholdermarkup:compute(_10dc,_10db.value),textareaelement:_10db,isSelected:_10db.getAttribute("selected")=="true"});
}
var _10dd=null;
var _10de=this.getContentWindow().bindingMap.templatetree;
var _10df=new Map();
this._textareas.each(function(name,_10e1){
var _10e2=_10de.add(TreeNodeBinding.newInstance(_10de.bindingDocument));
_10e2.setLabel(_10e1.placeholdername);
_10e2.setImage("${icon:placeholder}");
_10e2.setProperty("placeholder",true);
_10e2.textareaname=name;
_10df.set(_10e1.placeholdername,_10e2);
if(_10e1.isSelected){
_10dd=_10e2;
}
});
_10de.attachRecursive();
if(_10dd!=null){
var _10e3=true;
if(this._oldtextareas.hasEntries()){
_10e3=false;
var map=new Map();
this._textareas.each(function(id,_10e6){
map.set(_10e6.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10e3=true;
}
}
if(_10e3){
var _10e7=this._textareas.get(_10dd.textareaname);
this._textareaname=_10dd.textareaname;
this._placeholdername=_10e7.placeholdername;
this._setContentFromPlaceHolder(_10dd.textareaname);
_10dd.focus();
}else{
var _10e8=_10df.get(this._placeholdername);
this._textareaname=_10e8.textareaname;
_10e8.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10ea,_10eb){
var _10ec=_10ea.getElementsByTagName("ui:selector").item(0);
var _10ed=_10eb.getElementsByTagName("ui:selector").item(0);
var _10ee=false;
if(_10ec!=null&&_10ed!=null){
var _10ef=new List(_10ec.getElementsByTagName("ui:selection"));
var _10f0=new List(_10ed.getElementsByTagName("ui:selection"));
if(_10ef.getLength()!=_10f0.getLength()){
_10ee=true;
}else{
_10ef.each(function(_10f1,index){
var _10f3=_10f1.getAttribute("value");
var _10f4=_10f0.get(index).getAttribute("value");
if(_10f3!=_10f4){
_10ee=true;
}
return !_10ee;
});
}
}
if(_10ee){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10ec);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10ea,_10eb);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_10f6){
var _10f7=null;
if(_10f6==undefined){
_10f6=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_10f9){
if(_10f9.PlaceholderId==_10f6){
_10f7=_10f9.ClientRectangle.Width;
return false;
}
});
}
return _10f7;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(){
var _10fa=this._pageId;
var _10fb=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_10fa,_10fb,function(_10fd){
self._templatePreview=_10fd;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_10fe){
var _10ff=this._pageId;
var _1100=this._textareaname;
var _1101=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_10fe,_10ff,_1101,_1100,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_1103){
var _1104=this._pageId;
var _1105=this._textareaname;
var _1106=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1103,_1104,_1106,_1105,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1108,frame,_110a){
this._editorBinding=_1108;
this._codePressFrame=frame;
this._codePressEngine=_110a;
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
var _1110=this.getProperty("validate");
if(_1110==true){
this._hasStrictValidation=true;
}
var _1111=this.getProperty("strictsave");
if(_1111===false){
this._strictSave=false;
}
var _1112=this.getProperty("validator");
if(_1112!=null){
this._validator=_1112;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_1113,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_1113,arg);
switch(_1113){
case BroadcastMessages.CODEMIRROR_LOADED:
var _1115=this.getContentWindow().bindingMap.codemirrorwindow;
if(_1115!=null){
var _1116=_1115.getContentWindow();
if(arg.broadcastWindow==_1116){
this._codemirrorWindow=_1116;
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
this.initializeEditorComponents(_1115);
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
this.unsubscribe(_1113);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_111a){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_111a);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_111b){
if(_111b!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_111b;
EditorBinding.isActive=_111b;
var _111c=this._codemirrorWindow.standardEventHandler;
if(_111b){
_111c.enableNativeKeys(true);
}else{
_111c.disableNativeKeys();
}
var _111d=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_111d!=null){
if(_111b){
_111d.enable();
}else{
_111d.disable();
}
}
if(_111b){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1121=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1121;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1122){
_1122.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_1124){
if(!this._isFinalized){
if(_1124!=this._startContent){
this._startContent=_1124;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1124);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _1125=this.getContentWindow().bindingMap.editorpage.getContent();
return _1125?_1125:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_1126){
if(this._pageBinding!=null){
this._pageBinding.cover(_1126);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_1127){
if(_1127!=null&&this.shadowTree.dotnetinput!=null){
var value=_1127.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1129=true;
var _112a=this.getContent();
if(this._validator!=null){
_1129=Validator.validateInformed(_112a,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _112b=_112a.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_112b!=_112a){
_112a=_112b;
this.setContent(_112b);
}
_1129=XMLParser.isWellFormedDocument(_112a,true,!this._strictSave);
if(_1129==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1129=this._isValidHTML(_112a);
break;
}
}
break;
}
}
return _1129;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _112d=true;
var doc=XMLParser.parse(xml);
var _112f=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_112f.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_112f.add("NamespaceURI");
}
var head=null,body=null;
var _1133=new List(root.childNodes);
while(_1133.hasNext()){
var child=_1133.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_112f.add("MultipleHead");
}
if(body!=null){
_112f.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_112f.add("MultipleBody");
}
body=child;
break;
default:
_112f.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_112f.add("MissingHead");
}
if(body==null){
_112f.add("MissingBody");
}
}
if(_112f.hasEntries()){
_112d=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_112f.getFirst()));
}
return _112d;
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
var _1135=null;
var page=this._pageBinding;
if(page!=null){
_1135=page.getCheckSum();
}
return _1135;
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
ThrobberBinding.prototype.handleBroadcast=function(_1137,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1137,arg);
switch(_1137){
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
ProgressBarBinding.notch=function(_113a){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_113a);
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
ProgressBarBinding.prototype.notch=function(_113c){
_113c=_113c?_113c:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_113c);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_113e,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_113e,arg);
switch(_113e){
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
StartMenuItemBinding.prototype.setChecked=function(_1140,_1141){
StartMenuItemBinding.superclass.setChecked.call(this,_1140,_1141);
if(!_1141){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1142){
var _1143=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1142);
UserInterface.registerBinding(_1143,StartMenuItemBinding);
return UserInterface.getBinding(_1143);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1146,_1147){
var _1148=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1147,true)==true){
if(_1146!="*"){
_1146=KeySetBinding._sanitizeKeyModifiers(_1146);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1148[doc]){
_1148[doc]={};
}
if(!_1148[doc][code]){
_1148[doc][code]={};
}
_1148[doc][code][_1146]=_1147;
}
};
KeySetBinding.handleKey=function(doc,e){
var _114c=false;
var code=e.keyCode;
var _114e=KeySetBinding.keyEventHandlers;
if(_114e[doc]&&_114e[doc][code]){
var _114f="[default]";
_114f+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_114f+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_114f+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
var _1150=_114e[doc][code][_114f];
if(_1150==null){
_1150=_114e[doc][code]["*"];
}
if(_1150!=null){
_1150.handleKeyEvent(e);
_114c=true;
}
}
return _114c;
};
KeySetBinding._sanitizeKeyModifiers=function(_1151){
var _1152="[default]";
var mods={};
if(_1151){
new List(_1151.split(" ")).each(function(_1154){
mods[_1154]=true;
});
function check(_1155){
if(mods[_1155]){
_1152+=" "+_1155;
}
}
check("shift");
check("control");
}
return _1152;
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
var _1159=key.getAttribute("oncommand");
var _115a=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_115a){
DOMEvents.preventDefault(e);
}
var _115c=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1159,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_115d){
if(_115d instanceof CursorBinding){
_115d.setOpacity(0);
_115d.show();
new Animation({modifier:9,onstep:function(_115e){
_115d.setOpacity(Math.sin(_115e*Math.PI/180));
},onstop:function(){
_115d.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_115f){
if(_115f instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1160){
_115f.setOpacity(Math.cos(_1160*Math.PI/180));
},onstop:function(){
_115f.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1161,_1162,_1163){
if(_1161 instanceof CursorBinding){
_1163.x-=16;
_1163.y-=16;
new Animation({modifier:3,onstep:function(_1164){
var tal=Math.sin(_1164*Math.PI/180);
_1161.setPosition(new Point(((1-tal)*_1162.x)+((0+tal)*_1163.x),((1-tal)*_1162.y)+((0+tal)*_1163.y)));
},onstop:function(){
CursorBinding.fadeOut(_1161);
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
CursorBinding.prototype.setOpacity=function(_116a){
this.bindingElement.style.opacity=new String(_116a);
this._opacity=_116a;
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
function setOpacity(_116d){
cover.bindingElement.style.opacity=new String(_116d);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_116e){
if(Binding.exists(cover)){
setOpacity(Math.cos(_116e*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1170){
cover.bindingElement.style.MozOpacity=new String(_1170);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1171){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1171*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1173){
if(_1173!=this._isBusy){
if(_1173){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1173;
}
};
CoverBinding.prototype.setTransparent=function(_1174){
if(_1174!=this._isTransparent){
if(_1174){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1174;
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
CoverBinding.prototype.setHeight=function(_1176){
if(_1176>=0){
this.bindingElement.style.height=new String(_1176+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1177){
var _1178=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1177);
return UserInterface.registerBinding(_1178,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _117a=UncoverBinding._bindingInstance;
if(Binding.exists(_117a)){
_117a.setPosition(pos);
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
TheatreBinding.prototype.play=function(_117e){
this._isFading=_117e==true;
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
var _117f=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_117f.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_117f.clearRect(0,0,300,150);
_117f.fillRect(0,0,300,150);
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
var _1181=this._canvas.getContext("2d");
_1181.clearRect(0,0,300,150);
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
var _1182=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1182);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1183=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1183){
this._startcontent=_1183.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1184){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1184);
switch(_1184.type){
case WindowBinding.ACTION_ONLOAD:
if(_1184.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1184.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1184);
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
var _1188=this._transformer.transformToString(doc);
this._inject(_1188);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_118b){
this.getContentDocument().body.innerHTML=_118b;
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
var _1193=list.getNext();
var id=_1193.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1193);
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
var _119d=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_119d.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_119d.appendChild(att);
}
elm.appendChild(_119d);
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
var _11a7=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11a7){
doc=XMLParser.parse(_11a7);
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
var _11ab=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11ab;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11ac,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11ac,arg);
switch(_11ac){
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
var _11af=new List();
list.each(function(lang){
_11af.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11af);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11b3){
switch(_11b3){
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
var _11b6=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11b6,root);
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
var _11b7=this.getProperty("status");
if(_11b7!=null){
switch(_11b7){
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
UserInterfaceMapping.prototype.merge=function(_11bb){
for(var _11bc in _11bb.map){
this.map[_11bc]=_11bb.getBindingImplementation(_11bc);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11bd){
var _11be=null;
var name=_11bd.nodeName.toLowerCase();
if(this.map[name]){
_11be=this.map[name];
}
return _11be;
};
var UserInterface=new function(){
var _11c0=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11c1=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11c0,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _11c2=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11c4,impl){
var _11c6=null;
if(!this.hasBinding(_11c4)){
var _11c7=DOMUtil.getParentWindow(_11c4);
if(DOMUtil.getLocalName(_11c4)!="bindingmapping"){
if(!impl&&_11c4.getAttribute("binding")!=null){
var _11c8=_11c4.getAttribute("binding");
impl=_11c7[_11c8];
if(impl==null){
throw "No such binding in scope: "+_11c8;
}
}
if(!impl){
var _11c9=_11c7.DocumentManager;
if(_11c9){
var _11ca=_11c9.customUserInterfaceMapping;
if(_11ca){
impl=_11ca.getBindingImplementation(_11c4);
}
}
}
if(!impl){
impl=_11c1.getBindingImplementation(_11c4);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11c6=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11c6){
var key=KeyMaster.getUniqueKey();
_11c4.setAttribute("key",key);
_11c6.key=key;
if(!_11c4.id){
_11c4.id=key;
}
keys[key]={element:_11c4,binding:_11c6};
_11c6.onBindingRegister();
}
}
}
return _11c6;
};
this.unRegisterBinding=function(_11cc){
terminate(_11cc);
};
function terminate(_11cd){
if(Binding.exists(_11cd)==true){
var key=_11cd.key;
Binding.destroy(_11cd);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11cd=null;
}else{
_11c2.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11cf){
var _11d0=null;
if(keys[_11cf.key]){
_11d0=keys[_11cf.key].element;
}
return _11d0;
};
this.getBinding=function(_11d1){
var _11d2=null;
if(_11d1&&_11d1.nodeType==Node.ELEMENT_NODE){
try{
var key=_11d1.getAttribute("key");
if(key&&keys[key]){
_11d2=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_11d1);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11d2;
};
this.getBindingByKey=function(key){
var _11d5=null;
if(keys[key]){
_11d5=keys[key].binding;
}
return _11d5;
};
this.hasBinding=function(_11d6){
return this.getBinding(_11d6)!=null;
};
this.isBindingVisible=function(_11d7){
var _11d8=Application.isOperational;
if(_11d8==true){
var _11d9=new Crawler();
_11d9.type=NodeCrawler.TYPE_ASCENDING;
_11d9.id="visibilitycrawler";
_11d9.addFilter(function(_11da){
var b=UserInterface.getBinding(_11da);
var res=0;
if(!b.isVisible){
_11d8=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11d9.crawl(_11d7.bindingElement);
_11d9.dispose();
}
return _11d8;
};
var _11dd=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11dd={};
for(var key in keys){
_11dd[key]=true;
}
};
this.getPoint=function(){
var _11e1=null;
if(_11dd){
_11e1=new List();
for(var key in keys){
if(!_11dd[key]){
_11e1.add(key);
}
}
}
return _11e1;
};
this.clearPoint=function(){
_11dd=null;
};
this.trackUndisposedBindings=function(){
var _11e3=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11e3){
_11e3="Bindings illdisposed: ";
}
_11e3+=entry.binding+" ";
}
}
if(_11e3!=null){
_11c2.error(_11e3);
}
};
this.autoTrackDisposedBindings=function(_11e6){
if(_11e6){
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
SOAPRequest.newInstance=function(_11e7,_11e8){
var _11e9=_11e7+"/"+_11e8;
var _11ea=new SOAPRequest(_11e9);
var _11eb=SOAPRequest.resolver;
_11ea.document=Templates.getTemplateDocument("soapenvelope.xml");
_11ea.envelope=_11eb.resolve("soap:Envelope",_11ea.document);
_11ea.header=_11eb.resolve("soap:Header",_11ea.envelope);
_11ea.body=_11eb.resolve("soap:Body",_11ea.envelope);
return _11ea;
};
SOAPRequest._parseResponse=function(_11ec){
var _11ed=null;
var _11ee=false;
var doc=_11ec.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11ed=SOAPRequestResponse.newInstance(_11ec.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11ec.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11ee=true;
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
var text=_11ec.responseText;
if(_11ec.status==503||text.indexOf("id=\"offline\"")>-1){
_11ee=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11ec.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11ec.responseText);
}
}
}
}
if(_11ee==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11ed;
};
function SOAPRequest(_11f3){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11f3;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11f5=DOMUtil.getXMLHTTPRequest();
var _11f6=null;
_11f5.open("post",url,false);
_11f5.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11f5.setRequestHeader("SOAPAction",this.action);
try{
_11f5.send(this.document);
_11f6=SOAPRequest._parseResponse(_11f5);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11f5=null;
return _11f6;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11f9){
var _11fa=DOMUtil.getXMLHTTPRequest();
_11fa.open("post",url,true);
_11fa.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11fa.setRequestHeader("SOAPAction",this.action);
_11fa.onreadystatechange=function(){
if(_11fa.readyState==4){
var _11fb=SOAPRequest._parseResponse(_11fa);
_11f9(_11fb);
_11fa=null;
}
};
_11fa.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11fc in this){
this[_11fc]=null;
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
var _11fe=null;
if(doc&&doc.documentElement){
_11fe=new SOAPRequestResponse();
var _11ff=SOAPRequestResponse.resolver;
_11fe.document=doc;
_11fe.envelope=_11ff.resolve("soap:Envelope",_11fe.document);
_11fe.header=_11ff.resolve("soap:Header",_11fe.envelope);
_11fe.body=_11ff.resolve("soap:Body",_11fe.envelope);
var fault=_11ff.resolve("soap:Fault",_11fe.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11fe.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11ff.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11ff.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11fe;
};
function SOAPFault(_1201,_1202,_1203){
this._operationName=_1201;
this._operationAddress=_1202;
this._faultString=_1203;
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
SOAPFault.newInstance=function(_1204,fault){
return new SOAPFault(_1204.name,_1204.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1207){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1207;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1209=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1209.body,this._operation);
var _120b=this._wsdl.getSchema();
var _120c=_120b.lookup(this._operation);
var _120d=_120c.getListedDefinitions();
while(_120d.hasNext()){
var def=_120d.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1209;
};
SOAPEncoder.prototype._resolve=function(_1211,_1212,value){
var _1214=this._wsdl.getSchema();
if(_1212.isSimpleValue){
this._appendText(_1211,value,_1212.type=="string");
}else{
var _1215=_1214.lookup(_1212.type);
if(_1215 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1215.getListedDefinitions();
if(_1215.isArray){
var _1217=new List(value);
var def=defs.getNext();
while(_1217.hasNext()){
var elm=this._appendElement(_1211,def.name);
var val=_1217.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1211,def.name);
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
SOAPEncoder.prototype._appendText=function(_121e,value,_1220){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1223=false;
var i=0,c;
while(c=chars[i++]){
var _1226=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1226=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1226=false;
}
break;
}
if(!_1226){
safe+=c;
}else{
_1223=true;
}
}
if(_1223){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_121e.appendChild(_121e.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1229){
this._wsdl=wsdl;
this._operation=_1229;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_122e){
var _122f=null;
var _1230=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1232=this.resolve(id,_122e.body);
var _1233=_1230.lookup(id);
var _1234=_1233.getListedDefinitions();
while(!_122f&&_1234.hasNext()){
var def=_1234.getNext();
var elm=this.resolve(def.name,_1232);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_122f=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_122f.appendChild(_122f.importNode(e,true));
}else{
_122f=this._compute(elm,def);
}
}
return _122f;
};
SOAPDecoder.prototype._compute=function(_1238,_1239){
var _123a=null;
var _123b=this._wsdl.getSchema();
if(_1239.isSimpleValue){
_123a=this._getSimpleValue(_1238,_1239.type);
}else{
var _123c=_123b.lookup(_1239.type);
if(_123c instanceof SchemaSimpleType){
_123a=this._getSimpleValue(_1238,_123c.restrictionType);
}else{
var defs=_123c.getListedDefinitions();
if(_123c.isArray){
_123a=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1238);
while(elms.hasNext()){
var elm=elms.getNext();
_123a.push(this._compute(elm,def));
}
}else{
if(_1238==null){
_123a=null;
}else{
_123a={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1238);
if(elm){
_123a[def.name]=this._compute(elm,def);
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
return _123a;
};
SOAPDecoder.prototype._getSimpleValue=function(_1241,type){
var _1243=null;
if(_1241!=null&&_1241.firstChild&&_1241.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1241.childNodes.length>1){
_1241.normalize();
}
_1243=_1241.firstChild.data;
switch(type){
case Schema.types.STRING:
_1243=_1243;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1243=Number(_1243);
break;
case Schema.types.BOOLEAN:
_1243=_1243=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1243;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1244){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1244);
}
Schema.prototype._parseSchema=function(_1245){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1246={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1245);
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
_1246[rule.getAttribute("name")]=entry;
}
return _1246;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_124b){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_124b);
}
SchemaDefinition.prototype._parse=function(_124c){
var min=_124c.getAttribute("minOccurs");
var max=_124c.getAttribute("maxOccurs");
var type=_124c.getAttribute("type");
this.name=_124c.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1252=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1252;
}else{
var elm=_124c.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1254,_1255){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1254,_1255);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1256,_1257){
var els=_1256.resolveAll("s:complexType/s:sequence/s:element",_1257);
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
function SchemaComplexType(_1259,_125a){
this._definitions=new List();
this._parseListedDefinitions(_1259,_125a);
this.isArray=_125a.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_125b,_125c){
var els=_125b.resolveAll("s:sequence/s:element",_125c);
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
function SchemaSimpleType(_125f,_1260){
this.restrictionType=null;
this._parse(_125f,_1260);
}
SchemaSimpleType.prototype._parse=function(_1261,_1262){
var _1263=_1261.resolve("s:restriction",_1262);
if(_1263){
this.restrictionType=_1263.getAttribute("base").split(":")[1];
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
var _1266=null;
var _1267=DOMUtil.getXMLHTTPRequest();
_1267.open("get",url,false);
_1267.send(null);
if(_1267.responseXML){
_1266=_1267.responseXML.documentElement;
}else{
alert(_1267.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1266;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1268=new List();
var _1269=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1269.hasEntries()){
while(_1269.hasNext()){
var _126a=_1269.getNext();
var name=_126a.getAttribute("name");
_1268.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1268;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_126d,_126e,_126f){
this.name=name;
this.address=_126d;
this.encoder=_126e;
this.decoder=_126f;
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
var _1273=wsdl.getOperations();
_1273.each(function(_1274){
proxy[_1274.name]=WebServiceProxy.createProxyOperation(_1274);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1275,_1276){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1276){
var log=_1276 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1275.address+": "+_1275.name+"\n\n";
log+=DOMSerializer.serialize(_1276.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1278){
return function(){
var _1279=new List(arguments);
var _127a=null;
if(typeof (_1279.getLast())=="function"){
var _127b=_1279.extractLast();
var _127c=_1278.encoder.encode(_1279);
this._log(_1278,_127c);
var self=this;
var _127e=_127c.asyncInvoke(_1278.address,function(_127f){
self._log(_1278,_127f);
if(_127f){
if(_127f.fault){
_127a=SOAPFault.newInstance(_1278,_127f.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_127a,_127c,_127f);
}
}else{
if(WebServiceProxy.isDOMResult){
_127a=_127f.document;
}else{
_127a=_1278.decoder.decode(_127f);
}
}
}
_127c.dispose();
_127b(_127a);
});
}else{
var _127c=_1278.encoder.encode(new List(arguments));
this._log(_1278,_127c);
var _127e=_127c.invoke(_1278.address);
this._log(_1278,_127e);
if(_127e){
if(_127e.fault){
_127a=SOAPFault.newInstance(_1278,_127e.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_127a,_127c,_127e);
}
}else{
if(WebServiceProxy.isDOMResult){
_127a=_127e.document;
}else{
_127a=_1278.decoder.decode(_127e);
}
}
}
_127c.dispose();
return _127a;
}
};
};
WebServiceProxy.handleFault=function(_1280,_1281,_1282){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1280,soapRequest:_1281,soapResponse:_1282});
}
catch(exception){
alert(_1280.getFaultString());
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
var _1283=SystemLogger.getLogger("MessageQueue");
var _1284=null;
var _1285=0;
var _1286=null;
var _1287=new Map();
var _1288=new Map();
var _1289=false;
var _128a=false;
var _128b=false;
var _128c=false;
var _128d={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1284=ConsoleMessageQueueService;
_1285=_1284.GetCurrentSequenceNumber("dummyparam!");
this.index=_1285;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1289){
if(!MessageQueue._actions.hasEntries()){
var _128e=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_128a=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_128e;
_128a=false;
}
}
}
};
this._pokeserver=function(){
if(_1289==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_128f){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_128a);
this._updateMessages(_128f);
}
};
this._updateMessages=function(_1290){
if(_128b){
_128c=true;
}else{
_128b=true;
var self=this;
var _1292=function(_1293){
if(_1293!=null){
if(Types.isDefined(_1293.CurrentSequenceNumber)){
var _1294=_1293.CurrentSequenceNumber;
if(_1294<self.index){
_1283.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_1294);
}
self.index=_1294;
var _1295=new List(_1293.ConsoleActions);
if(_1295.hasEntries()){
self.evaluate(_1295);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1283.error("No sequencenumber in MessageQueue response!");
}
}
_128b=false;
if(_128c){
_128c=false;
self._updateMessages();
}
};
if(_1290){
_1292(_1284.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_1284.GetMessages(Application.CONSOLE_ID,this.index,_1292);
}
}
};
this.evaluate=function(_1296){
var _1297=new List();
if(_1296.hasEntries()){
_1296.each(function(_1298){
if(this._index[_1298.Id]!=true){
_1297.add(_1298);
}
this._index[_1298.Id]=true;
},this);
if(_1297.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1297);
}else{
this._actions=_1297;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1299){
var _129a="(No reason)";
if(_1299!=null){
_129a=_1299.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_129a);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_129e){
if(_129e==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _129f=null;
if(this._actions.hasEntries()){
var _12a0=this._actions.extractFirst();
_1285=_12a0.SequenceNumber;
_1283.debug("MessageQueue action: "+_12a0.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1285+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12a0.ActionType){
case "OpenView":
_129f=_12a0.OpenViewParams;
if(_129f.ViewType=="ModalDialog"){
openDialogView(_129f);
}else{
_1286=_129f.ViewId;
openView(_129f);
}
break;
case "CloseView":
_129f=_12a0.CloseViewParams;
_1286=_129f.ViewId;
closeView(_129f);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12a0.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_1287.countEntries()+"\n";
_1287.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1283.debug(debug);
if(!_1287.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12a0.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12a0.MessageBoxParams);
break;
case "OpenViewDefinition":
_129f=_12a0.OpenViewDefinitionParams;
_1286=_129f.Handle;
openViewDefinition(_129f);
break;
case "LogEntry":
logEntry(_12a0.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_129f=_12a0.BroadcastMessageParams;
_1283.debug("Server says: EventBroadcaster.broadcast ( \""+_129f.Name+"\", "+_129f.Value+" )");
EventBroadcaster.broadcast(_129f.Name,_129f.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1287.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12a0.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12a0.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12a0.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_129f=_12a0.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_129f.ViewId,entityToken:_129f.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_129f=_12a0.OpenGenericViewParams;
openGenericView(_129f);
break;
case "OpenExternalView":
_129f=_12a0.OpenExternalViewParams;
openExternalView(_129f);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12a0.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_128a);
}
function logEntry(_12a3){
var _12a4=_12a3.Level.toLowerCase();
SystemLogger.getLogger(_12a3.SenderId)[_12a4](_12a3.Message);
}
function openView(_12a5){
var list=paramsToList(_12a5.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12a5.ViewId);
def.entityToken=_12a5.EntityToken;
def.flowHandle=_12a5.FlowHandle;
def.position=_128d[_12a5.ViewType],def.label=_12a5.Label;
def.image=_12a5.Image;
def.toolTip=_12a5.ToolTip;
def.argument={"url":_12a5.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12a5.ViewId,entityToken:_12a5.EntityToken,flowHandle:_12a5.FlowHandle,position:_128d[_12a5.ViewType],url:_12a5.Url,label:_12a5.Label,image:_12a5.Image,toolTip:_12a5.ToolTip}));
}
}
function openDialogView(_12a8){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12a8.ViewId,flowHandle:_12a8.FlowHandle,position:Dialog.MODAL,url:_12a8.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12a9){
var _12aa=_12a9.DialogType.toLowerCase();
if(_12aa=="question"){
throw "Not supported!";
}else{
Dialog[_12aa](_12a9.Title,_12a9.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12ab){
var map={};
var _12ad=false;
new List(_12ab.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12ad=true;
});
var proto=ViewDefinitions[_12ab.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12ab.ViewId;
}
def.argument=_12ad?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12b2){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12b2.ViewId);
def.label=_12b2.Label;
def.toolTip=_12b2.ToolTip;
def.image=_12b2.Image;
def.argument={"url":_12b2.Url,"list":paramsToList(_12b2.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12b4){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12b4.ViewId);
def.label=_12b4.Label;
def.toolTip=_12b4.ToolTip;
def.image=_12b4.Image;
def.url=_12b4.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12b6){
if(StageBinding.isViewOpen(_12b6.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12b6.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12b7){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12b7.ViewId,isSuccess:_12b7.Succeeded});
}
this._lockSystem=function(_12b8){
var _12b9=top.bindingMap.offlinetheatre;
if(_12b8){
_12b9.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12b9.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1289=_12b8;
};
this.handleBroadcast=function(_12bb,arg){
switch(_12bb){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1286!=null&&arg==_1286){
_1286=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_1287.set(arg,true);
}else{
_1283.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1287.hasEntries()){
_1287.del(arg);
_1283.debug("Refreshed tree: "+arg+"\n("+_1287.countEntries()+" trees left!)");
if(!_1287.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1288.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1288.hasEntries()==true){
_1288.del(arg);
if(!_1288.hasEntries()){
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
function paramsToList(_12bd){
var list=new List();
new List(_12bd).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12c0=false;
var _12c1=null;
var _12c2=false;
var _12c3=Client.qualifies();
var _12c4="admin";
var _12c5="123456";
if(!_12c3){
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
this.handleBroadcast=function(_12c6){
switch(_12c6){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12c6);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _12c7=window.bindingMap.appwindow;
_12c7.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_12c8){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12c9){
if(_12c8){
EventBroadcaster.subscribe(_12c9,KickStart);
}else{
EventBroadcaster.unsubscribe(_12c9,KickStart);
}
});
}
function kickStart(_12ca){
switch(_12ca){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12c0=true;
break;
}
if(_12c0){
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
DataManager.getDataBinding("username").setValue(_12c4);
DataManager.getDataBinding("password").setValue(_12c5);
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
this.doLogin=function(_12cd,_12ce){
var _12cf=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12d0=false;
var _12d1=LoginService.ValidateAndLogin(_12cd,_12ce);
if(_12d1 instanceof SOAPFault){
alert(_12d1.getFaultString());
}else{
_12d0=_12d1;
}
if(_12d0){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_12cf){
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
var _12d2=DataManager.getDataBinding("username");
var _12d3=DataManager.getDataBinding("password");
_12d2.blur();
_12d3.blur();
_12d2.setValue("");
_12d3.setValue("");
_12d2.clean();
_12d3.clean();
_12d2.focus();
document.getElementById("loginerror").style.display="block";
var _12d4={handleAction:function(_12d5){
document.getElementById("loginerror").style.display="none";
_12d5.target.removeActionListener(Binding.ACTION_DIRTY,_12d4);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12d4);
}
WindowManager.fireOnLoad(this);
if(!_12c3){
UpdateManager.isEnabled=false;
}
};

