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
StyleBinding.prototype.handleElement=function(_5f4){
return true;
};
StyleBinding.prototype.updateElement=function(_5f5){
var href=_5f5.getAttribute("link");
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
var _5f7=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5f7.hasNext()){
var cell=_5f7.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5f9){
var _5fa=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5f9.bindingElement);
_5fa=_5f9;
}else{
_5fa=MatrixBinding.superclass.add.call(this,_5f9);
}
return _5fa;
};
MatrixBinding.prototype.addFirst=function(_5fb){
var _5fc=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5fd=this.shadowTree[MatrixBinding.CENTER];
_5fd.insertBefore(_5fb.bindingElement,_5fd.firstChild);
_5fc=_5fb;
}else{
_5fc=MatrixBinding.superclass.addFirst.call(this,_5fb);
}
return _5fb;
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
MatrixBinding.newInstance=function(_5ff){
var _600=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5ff);
return UserInterface.registerBinding(_600,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_601,_602){
var list=new List();
var _604=new FlexBoxCrawler();
_604.mode=_602?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_604.startBinding=_601;
_604.crawl(_601.bindingElement,list);
list.each(function(_605){
_605.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_606){
if(Binding.exists(_606)){
_606.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_607){
if(Binding.exists(_607)){
_607.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_604.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_608){
FlexBoxBinding.superclass.handleAction.call(this,_608);
switch(_608.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_609){
var _60a=0;
var _60b=new List(this.bindingElement.parentNode.childNodes);
while(_60b.hasNext()){
var _60c=_60b.getNext();
if(_60c.nodeType==Node.ELEMENT_NODE&&_60c!=this.bindingElement){
if(!this._isOutOfFlow(_60c)){
var rect=_60c.getBoundingClientRect();
if(_609){
height+=(rect.right-rect.left);
}else{
_60a+=(rect.bottom-rect.top);
}
}
}
}
return _60a;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_60e){
var _60f=CSSComputer.getPosition(_60e);
var _610=CSSComputer.getFloat(_60e);
return (_60f=="absolute"||_610!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _611=this.bindingElement.parentNode;
var rect=_611.getBoundingClientRect();
var _613=rect.bottom-rect.top;
var _614=CSSComputer.getPadding(_611);
var _615=CSSComputer.getBorder(_611);
_613-=(_614.top+_614.bottom);
_613-=(_615.top+_615.bottom);
return _613;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _616=this.bindingElement.parentNode;
var rect=_616.getBoundingClientRect();
var _618=rect.right-rect.left;
var _619=CSSComputer.getPadding(_616);
var _61a=CSSComputer.getBorder(_616);
_618-=(_619.left+_619.right);
_618-=(_61a.left+_61a.right);
return _618;
};
FlexBoxBinding.prototype.setFlexibility=function(_61b){
if(_61b!=this.isFlexible){
if(_61b){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_61b;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _61c=this._getSiblingsSpan();
_61c=this._getCalculatedHeight()-_61c;
if(!isNaN(_61c)&&_61c>=0){
this.bindingElement.style.height=String(_61c)+"px";
}
}
}
};
FlexBoxBinding.prototype.fit=function(_61d){
if(!this.isFit||_61d){
var _61e=0;
new List(this.bindingElement.childNodes).each(function(_61f){
if(_61f.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_61f)){
var rect=_61f.getBoundingClientRect();
_61e+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_61e);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_621){
var _622=CSSComputer.getPadding(this.bindingElement);
var _623=CSSComputer.getBorder(this.bindingElement);
_621+=_622.top+_622.bottom;
_621+=_623.top+_623.bottom;
this.bindingElement.style.height=_621+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_624){
ScrollBoxBinding.superclass.handleAction.call(this,_624);
switch(_624.type){
case BalloonBinding.ACTION_INITIALIZE:
_624.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_625){
this.bindingElement.scrollLeft=_625.x;
this.bindingElement.scrollTop=_625.y;
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
var _626=this._getBuildElement("labeltext");
if(_626){
this.shadowTree.labelText=_626;
this.shadowTree.text=_626.firstChild;
this.hasLabel=true;
}
}else{
var _627=this.getProperty("label");
var _628=this.getProperty("image");
var _629=this.getProperty("tooltip");
if(_627){
this.setLabel(_627,false);
}
if(_628){
this.setImage(_628,false);
}
if(_629){
this.setToolTip(_629);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_62a,_62b){
_62a=_62a!=null?_62a:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_62a);
this.setProperty("label",_62a);
if(!_62b){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_62d){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
var _62e=Resolver.resolve(url);
if(_62e.classes){
this.setAlphaTransparentBackdrop(false);
this.setImageClasses(_62e.classes);
}else{
this.setImageClasses();
this.setAlphaTransparentBackdrop(_62e);
}
this.setProperty("image",url);
this.hasImage=true;
if(!_62d){
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
LabelBinding.prototype.setImageClasses=function(_62f){
if(this.shadowTree.labelBody){
this.shadowTree.labelBody.className=_62f;
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
LabelBinding.prototype.setToolTip=function(_632){
this.setProperty("tooltip",_632);
if(_632!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_632));
}
};
LabelBinding.prototype.getToolTip=function(_633){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_634){
_634=_634==null?true:_634;
var _635=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_634;
if(_634){
this.attachClassName(_635);
}else{
this.detachClassName(_635);
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
var _636="textonly";
var _637="imageonly";
var _638="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_636);
this.detachClassName(_637);
this.attachClassName(_638);
}else{
if(this.hasLabel){
this.detachClassName(_638);
this.detachClassName(_637);
this.attachClassName(_636);
}else{
if(this.hasImage){
this.detachClassName(_638);
this.detachClassName(_636);
this.attachClassName(_637);
}
}
}
};
LabelBinding.newInstance=function(_639){
var _63a=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_639);
return UserInterface.registerBinding(_63a,LabelBinding);
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
var _63b=this.getProperty("label");
if(!_63b){
_63b=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_63b));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_63d){
this.setProperty("label",_63d);
};
TextBinding.newInstance=function(_63e){
var _63f=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_63e);
return UserInterface.registerBinding(_63f,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_640,_641){
BroadcasterBinding.superclass.setProperty.call(this,_640,_641);
function update(list){
if(list){
list.each(function(_643){
_643.setProperty(_640,_641);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _644=this._observers[_640];
if(_644){
update(_644);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_645){
BroadcasterBinding.superclass.deleteProperty.call(this,_645);
function update(list){
if(list){
list.each(function(_647){
_647.deleteProperty(_645);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _648=this._observers[_645];
if(_648){
update(_648);
}
};
BroadcasterBinding.prototype.addObserver=function(_649,_64a){
_64a=_64a?_64a:"*";
_64a=new List(_64a.split(" "));
while(_64a.hasNext()){
var _64b=_64a.getNext();
switch(_64b){
case "*":
this._setAllProperties(_649);
break;
default:
var _64c=this.getProperty(_64b);
_649.setProperty(_64b,_64c);
break;
}
if(!this._observers[_64b]){
this._observers[_64b]=new List();
}
this._observers[_64b].add(_649);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_64d){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _650=att.nodeName;
switch(_650){
case "id":
case "key":
break;
default:
var _651=this.getProperty(_650);
_64d.setProperty(_650,_651);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_652,_653){
_653=_653?_653:"*";
_653=new List(_653.split(" "));
while(_653.hasNext()){
var list=this._observers[_653.getNext()];
if(list){
while(list.hasNext()){
var _655=list.getNext();
if(_655==_652){
list.del(_655);
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
BroadcasterBinding.prototype.setDisabled=function(_656){
this.setProperty("isdisabled",_656);
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
var _658=this.getProperty("width");
var _659=this.getProperty("label");
var type=this.getProperty("type");
var _65b=this.getProperty("popup");
var _65c=this.getProperty("tooltip");
var _65d=this.getProperty("isdisabled");
var _65e=this.getProperty("response");
var _65f=this.getProperty("oncommand");
var _660=this.getProperty("value");
var _661=this.getProperty("ischecked");
var _662=this.getProperty("callbackid");
var _663=this.getProperty("focusable");
var _664=this.getProperty("focused");
var _665=this.getProperty("default");
var url=this.getProperty("url");
var _667=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_667){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_659!=null){
this.setLabel(_659);
}
if(type!=null){
this.setType(type);
}
if(_65c!=null){
this.setToolTip(_65c);
}
if(_658!=null){
this.setWidth(_658);
}
if(_65b!=null){
this.setPopup(_65b);
}
if(_65e!=null){
this.response=_65e;
}
if(_661==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_65f!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_65f,this);
};
}
if(_663||this.isFocusable){
this._makeFocusable();
if(_665||this.isDefault){
this.isDefault=true;
}
if(_664){
this.focus();
}
}
if(_65d==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_662!=null){
this.bindingWindow.DataManager.registerDataBinding(_662,this);
if(_660!=null){
Binding.dotnetify(this,_660);
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
ButtonBinding.prototype.setImage=function(_668){
if(this.isAttached){
this.labelBinding.setImage(_668);
}
this.setProperty("image",_668);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_669){
if(this.isAttached){
this.labelBinding.setLabel(_669);
}
this.setProperty("label",_669);
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
ButtonBinding.prototype.setToolTip=function(_66b){
this.setProperty("tooltip",_66b);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_66b));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_66c){
this.imageProfile=new _66c(this);
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
ButtonBinding.prototype.flip=function(_671){
_671=_671==null?true:_671;
this.isFlipped=_671;
this.setProperty("flip",_671);
if(this.isAttached){
this.labelBinding.flip(_671);
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
ButtonBinding.prototype.check=function(_672){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_672==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_673){
this.isActive=true;
this.isChecked=true;
if(!_673){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_674){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_674==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_675){
this.isActive=false;
this.isChecked=false;
if(!_675){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_676,_677){
if(_676==null){
_676==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_676){
case true:
this.check(_677);
break;
case false:
this.uncheck(_677);
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
var _679=this.getProperty("tooltip");
if(_679){
this.setToolTip(_679);
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
var _67a=null;
if(this.isAttached==true){
this.labelBinding.shadowTree.labelBody.style.marginLeft="0";
this.labelBinding.shadowTree.labelBody.style.marginRight="0";
_67a=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _67a;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _67c=this.getEqualSizeWidth();
if(goal>_67c){
var diff=goal-_67c;
var marg=Math.floor(diff*0.5);
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-left",marg+"px","important");
this.labelBinding.shadowTree.labelBody.style.setProperty("margin-right",marg+"px","important");
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _67f=null;
return this.bindingElement.offsetWidth;
};
ButtonBinding.prototype.setWidth=function(_680){
if(_680>=0){
this.bindingElement.style.width=new String(_680+"px");
}
this.setProperty("width",_680);
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
ButtonBinding.prototype.setValue=function(_681){
this.shadowTree.dotnetinput.value=_681;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_682){
this.setValue(_682);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_683){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_683;
this.imageProfile=_683.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_684){
var _685=_684?"addEventListener":"removeEventListener";
this.binding[_685](DOMEvents.MOUSEENTER,this);
this.binding[_685](DOMEvents.MOUSELEAVE,this);
this.binding[_685](DOMEvents.MOUSEDOWN,this);
this.binding[_685](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _687=false,_688=false,_689=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_689=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_689=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_689=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_689=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_689==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_687=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_689=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_689=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_689=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_689=ButtonStateManager.STATE_NORMAL;
var _68a=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_68a instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_689=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_689==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_688=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_689=ButtonStateManager.STATE_NORMAL;
_687=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_689=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_689=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_689=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_689=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_689==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_687=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_689=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_689=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_689=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_689=ButtonStateManager.STATE_NORMAL;
_687=true;
break;
}
}
}
}
}
switch(_689){
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
if(_687){
this.binding.fireCommand();
}
if(_688){
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
var _68e=this.imageProfile.getDisabledImage();
if(_68e){
this.binding.setImage(_68e);
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
ClickButtonBinding.newInstance=function(_68f){
var _690=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_68f);
return UserInterface.registerBinding(_690,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_691){
var _692=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_691);
return UserInterface.registerBinding(_692,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_693){
var _694=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_693);
return UserInterface.registerBinding(_694,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_695){
this._binding=_695;
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
var _696=this.getDescendantBindingsByLocalName("control");
_696.each(function(_697){
_697.setControlType(_697.controlType);
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
ControlGroupBinding.newInstance=function(_699){
var _69a=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_699);
return UserInterface.registerBinding(_69a,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_69d){
ControlBinding.superclass.handleAction.call(this,_69d);
switch(_69d.type){
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
function ControlImageProfile(_69e){
this.binding=_69e;
}
ControlImageProfile.prototype._getImage=function(_69f){
var _6a0=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_6a0=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_6a0=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_6a0=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_6a0=this.constructor.IMAGE_CLOSE;
break;
}
return _6a0.replace("${string}",_69f);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _6a1=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_6a1=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _6a1?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_6a2){
ControlBoxBinding.superclass.handleAction.call(this,_6a2);
switch(_6a2.type){
case ControlBinding.ACTION_COMMAND:
var _6a3=_6a2.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6a3);
Application.unlock(self);
},0);
_6a2.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6a5){
switch(_6a5.controlType){
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
ControlBoxBinding.prototype.setState=function(_6a6){
var _6a7=this.getState();
this.setProperty("state",_6a6);
this.detachClassName(_6a7);
this.attachClassName(_6a6);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6a8=this.getProperty("state");
if(!_6a8){
_6a8=ControlBoxBinding.STATE_NORMAL;
}
return _6a8;
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
MenuContainerBinding.prototype.isOpen=function(_6a9){
var _6aa=null;
if(!_6a9){
_6aa=this._isOpen;
}else{
_6aa=(_6a9==this._openElement);
}
return _6aa;
};
MenuContainerBinding.prototype.setOpenElement=function(_6ab){
if(_6ab){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6ab;
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
var _6ac=this.getChildBindingByLocalName("menupopup");
if(_6ac&&_6ac!=this.menuPopupBinding){
this.menuPopupBinding=_6ac;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6ad=this.getMenuContainerBinding();
_6ad.setOpenElement(this);
var _6ae=this.getMenuPopupBinding();
_6ae.snapTo(this.bindingElement);
_6ae.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6af){
MenuContainerBinding.superclass.handleAction.call(this,_6af);
if(_6af.type==PopupBinding.ACTION_HIDE){
var _6b0=this.getMenuContainerBinding();
_6b0.setOpenElement(false);
this.reset();
_6af.consume();
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
MenuBarBinding.prototype.handleAction=function(_6b1){
MenuBarBinding.superclass.handleAction.call(this,_6b1);
switch(_6b1.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6b2=_6b1.target;
var _6b3=this.getChildBindingsByLocalName("menu");
while(_6b3.hasNext()){
var menu=_6b3.getNext();
}
switch(_6b2.arrowKey){
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
var _6b5=this.getProperty("image");
var _6b6=this.getProperty("label");
var _6b7=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6b6){
this.setLabel(_6b6);
}
if(_6b5){
this.setImage(_6b5);
}
if(_6b7){
this.setToolTip(_6b7);
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
MenuBinding.prototype.setLabel=function(_6b9){
this.setProperty("label",_6b9);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6b9));
}
};
MenuBinding.prototype.setToolTip=function(_6ba){
this.setProperty("tooltip",_6ba);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6ba));
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
var _6bc=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6bc.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6bc.isOpen()&&!_6bc.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6bc.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6bc.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6bd,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6bd){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6c2){
switch(_6c2.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6c3=null;
var _6c4=true;
self._lastFocused.focus();
self.grabKeyboard();
_6c2.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6c6){
for(var key in this._focused){
if(key!=_6c6.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6c6.key]=_6c6;
this._lastFocused=_6c6;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6c9){
delete this._focused[_6c9.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6ca){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6ca);
}
if(_6ca){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6cd=this.getChildBindingsByLocalName("menugroup");
var _6ce=null;
var _6cf=null;
while(_6cd.hasNext()){
var _6d0=_6cd.getNext();
if(!_6d0.isDefaultContent){
_6d0.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6ce&&_6d0.isVisible){
_6ce=_6d0;
}
if(_6d0.isVisible){
_6cf=_6d0;
}
}
}
if(_6ce&&_6cf){
_6ce.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6cf.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6d1){
MenuBodyBinding.activeInstance=this;
if(_6d1){
var _6d2=this._getMenuItems().getFirst();
if(_6d2){
_6d2.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6d3=this._lastFocused;
if((_6d3!=null)&&(!_6d3.isMenuContainer)){
_6d3.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6d5=this._getMenuItems();
var _6d6=null;
var next=null;
if(this._lastFocused){
_6d6=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6d5.getPreceding(_6d6);
break;
case KeyEventCodes.VK_DOWN:
next=_6d5.getFollowing(_6d6);
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
next=_6d5.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6d9=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6da){
_6d9=_6da.getChildBindingsByLocalName("menuitem");
_6d9.each(function(item){
list.add(item);
});
});
_6d9=this.getChildBindingsByLocalName("menuitem");
_6d9.each(function(item){
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
MenuBodyBinding.newInstance=function(_6dd){
var _6de=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6dd);
return UserInterface.registerBinding(_6de,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6df){
switch(_6df){
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
MenuGroupBinding.newInstance=function(_6e0){
var _6e1=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6e0);
return UserInterface.registerBinding(_6e1,MenuGroupBinding);
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
var _6e2=this.getProperty("image");
var _6e3=this.getProperty("image-hover");
var _6e4=this.getProperty("image-active");
var _6e5=this.getProperty("image-disabled");
if(!this.image&&_6e2){
this.image=_6e2;
}
if(!this.imageHover&&_6e3){
this.imageHover=_6e2;
}
if(!this.imageActive&&_6e4){
this.imageActive=_6e4;
}
if(!this.imageDisabled&&_6e5){
this.imageDisabled=_6e5;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6e6=this.getProperty("label");
var _6e7=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6e9=this.getProperty("isdisabled");
var _6ea=this.getProperty("image");
var _6eb=this.getProperty("image-hover");
var _6ec=this.getProperty("image-active");
var _6ed=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6ee=this.getMenuPopupBinding();
if(_6ee){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6ea){
this.image=_6ea;
}
if(!this.imageHover&&_6eb){
this.imageHover=_6ea;
}
if(!this.imageActive&&_6ec){
this.imageActive=_6ec;
}
if(!this.imageDisabled&&_6ed){
this.imageDisabled=_6ed;
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
if(_6e6!=null){
this.setLabel(_6e6);
}
if(_6e7){
this.setToolTip(_6e7);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6e9==true){
this.disable();
}
var _6ef=this.getProperty("oncommand");
if(_6ef){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6ef);
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
MenuItemBinding.prototype.setLabel=function(_6f2){
this.setProperty("label",_6f2);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6f2));
}
};
MenuItemBinding.prototype.setToolTip=function(_6f3){
this.setProperty("tooltip",_6f3);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6f3));
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
var _6f5=this.bindingDocument.createElement("div");
_6f5.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6f5.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6f6=this.labelBinding.bindingElement;
_6f6.insertBefore(_6f5,_6f6.firstChild);
_6f5.style.display="none";
this.shadowTree.checkBoxIndicator=_6f5;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6f5=this.bindingDocument.createElement("div");
_6f5.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6f5.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6f6=this.labelBinding.bindingElement;
_6f6.insertBefore(_6f5,_6f6.firstChild);
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
var _6f8=this.imageProfile.getDisabledImage();
if(_6f8){
this.setImage(_6f8);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6f8=this.imageProfile.getDefaultImage();
if(_6f8){
this.setImage(_6f8);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6fa=this.getMenuContainerBinding();
if(_6fa.isOpen()&&!_6fa.isOpen(this)){
_6fa._openElement.hide();
_6fa.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6fa=this.getMenuContainerBinding();
if(!_6fa.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6fc){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6fd=this.getMenuContainerBinding();
if(!_6fd||!_6fd.isOpen(this)||_6fc){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6fe){
this.setChecked(true,_6fe);
};
MenuItemBinding.prototype.uncheck=function(_6ff){
this.setChecked(false,_6ff);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_700,_701){
this.setProperty("ischecked",_700);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_700){
this.isChecked=_700;
this.shadowTree.checkBoxIndicator.style.display=_700?"block":"none";
if(!_701){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_702){
var _703=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_702);
UserInterface.registerBinding(_703,MenuItemBinding);
return UserInterface.getBinding(_703);
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
PopupSetBinding.newInstance=function(_704){
var _705=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_704);
return UserInterface.registerBinding(_705,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_706,arg){
switch(_706){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _70a=PopupBinding.activeInstances.get(key);
var _70b=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_70a);
if(!_70b){
list.add(_70a);
}
});
list.each(function(_70c){
_70c.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _70e=PopupBinding.activeInstances.get(key);
_70e.hide();
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
var _70f=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _710=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_70f){
this._bodyBinding=UserInterface.getBinding(_70f);
}else{
if(_710){
this._bodyBinding=UserInterface.getBinding(_710);
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
var _711=this.getProperty("position");
this.position=_711?_711:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_712){
var _713=null;
if(this._bodyBinding){
this._bodyBinding.add(_712);
_713=_712;
}else{
_713=PopupBinding.superclass.add.call(this,_712);
}
return _713;
};
PopupBinding.prototype.addFirst=function(_714){
var _715=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_714);
_715=_714;
}else{
_715=PopupBinding.superclass.addFirst.call(this,_714);
}
return _715;
};
PopupBinding.prototype.handleAction=function(_716){
PopupBinding.superclass.handleAction.call(this,_716);
var _717=_716.target;
switch(_716.type){
case Binding.ACTION_ATTACHED:
if(_717 instanceof MenuItemBinding){
this._count(true);
_716.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_717 instanceof MenuItemBinding){
this._count(false);
_716.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_718){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_718?1:-1);
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
PopupBinding.prototype.snapTo=function(_719){
var _71a=this._getElementPosition(_719);
switch(this.position){
case PopupBinding.POSITION_TOP:
_71a.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_71a.x+=_719.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_71a.y+=_719.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_71a.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_719;
this.bindingElement.style.display="block";
this.setPosition(_71a.x,_71a.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_71c){
this.bindingElement.style.display="block";
this.setPosition(_71c.x,_71c.y);
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
PopupBinding.prototype._getElementPosition=function(_721){
return _721.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_721):DOMUtil.getUniversalPosition(_721);
};
PopupBinding.prototype._getMousePosition=function(e){
var _723=DOMEvents.getTarget(e);
return _723.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_724){
var _725=this.bindingElement;
if(_724){
_725.style.visibility="visible";
}else{
_725.style.visibility="hidden";
_725.style.display="none";
}
this.isVisible=_724;
};
PopupBinding.prototype._enableTab=function(_726){
var self=this;
var _728=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_728.each(function(_729){
_729.bindingElement.tabIndex=_726?0:-1;
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
var _731=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_731.y<0){
y=-_731.y;
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
PopupBinding.prototype.grabKeyboard=function(_733){
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
var _739=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_739=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _739;
};
PopupBinding.prototype.clear=function(){
var _73a=this._bodyBinding;
if(_73a){
_73a.detachRecursive();
_73a.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_73b){
var _73c=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_73b);
return UserInterface.registerBinding(_73c,PopupBinding);
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
PopupBodyBinding.newInstance=function(_73e){
var _73f=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_73e);
return UserInterface.registerBinding(_73f,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_740){
return new Point(_740.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_741){
var _742=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_741);
return UserInterface.registerBinding(_742,MenuPopupBinding);
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
var _743=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_743){
this._body=UserInterface.getBinding(_743);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _744=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_744.hasNext()){
var _745=DialogBorderBinding.newInstance(this.bindingDocument);
_745.setType(_744.getNext());
this.add(_745);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _746=this.getProperty("controls");
if(_746){
var _747=new List(_746.split(" "));
while(_747.hasNext()){
var type=_747.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _749=DialogControlBinding.newInstance(this.bindingDocument);
_749.setControlType(type);
this._titlebar.addControl(_749);
this.controlBindings[type]=_749;
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
var _74a=this.getProperty("image");
var _74b=this.getProperty("label");
var _74c=this.getProperty("draggable");
var _74d=this.getProperty("resizable");
var _74e=this.getProperty("modal");
if(_74a){
this.setImage(_74a);
}
if(_74b){
this.setLabel(_74b);
}
if(_74c==false){
this.isDialogDraggable=false;
}
if(_74d==false){
this.isPanelResizable=false;
}
if(_74e==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_74f){
this.isModal=_74f;
};
DialogBinding.prototype.setLabel=function(_750){
this.setProperty("label",_750);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_750));
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
DialogBinding.prototype.handleAction=function(_752){
DialogBinding.superclass.handleAction.call(this,_752);
switch(_752.type){
case Binding.ACTION_DRAG:
var _753=_752.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_753.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_753.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_753;
_753.dragger.registerHandler(this);
}
break;
}
}
_752.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_752.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_754,arg){
DialogBinding.superclass.handleBroadcast.call(this,_754,arg);
switch(_754){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_756){
DialogBinding.superclass.handleInvokedControl.call(this,_756);
switch(_756.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_757){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_757){
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
var _759=self.bindingElement;
setTimeout(function(){
_759.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_75a){
this.bindingElement.style.zIndex=new String(_75a);
};
DialogBinding.prototype.onDragStart=function(_75b){
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
DialogBinding.prototype.setResizable=function(_76d){
if(this._isResizable!=_76d){
if(_76d){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_76d;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _76e=null;
var _76f=this.bindingDocument.body.offsetWidth;
var _770=this.bindingDocument.body.offsetHeight;
_76e={x:0.125*_76f,y:0.125*_770,w:0.75*_76f,h:0.5*_770};
return _76e;
};
DialogBinding.prototype.centerOnScreen=function(){
var _771=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_771.w-dim.w),0.5*(_771.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _773=this;
var i=0;
function blink(){
if(i%2==0){
_773.detachClassName("active");
}else{
_773.attachClassName("active");
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
var _777="";
while(list.hasNext()){
var type=list.getNext();
_777+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_777);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_778){
var _779=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_778);
return UserInterface.registerBinding(_779,DialogBinding);
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
DialogHeadBinding.newInstance=function(_77a){
var _77b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_77a);
return UserInterface.registerBinding(_77b,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_77e){
var _77f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_77e);
return UserInterface.registerBinding(_77f,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_780){
var _781=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_780);
return UserInterface.registerBinding(_781,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_782){
DialogSetBinding.superclass.handleAction.call(this,_782);
var _783=_782.target;
switch(_782.type){
case Binding.ACTION_MOVETOTOP:
if(_783 instanceof DialogBinding){
this._moveToTop(_783);
}
break;
case Binding.ACTION_MOVEDONTOP:
_782.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_784){
var _785=0;
var _786=this.getChildBindingsByLocalName("dialog");
_786.each(function(_787){
var _788=_787.getZIndex();
_785=_788>_785?_788:_785;
});
_784.setZIndex(_785+2);
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
DialogBorderBinding.newInstance=function(_78a){
var _78b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_78a);
return UserInterface.registerBinding(_78b,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_78c){
this._dialogBinding=_78c;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_78e){
DialogCoverBinding.superclass.handleAction.call(this,_78e);
var _78f=_78e.target;
if(this._dialogBinding.isModal){
switch(_78e.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_78f==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_78f.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_790,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_790,arg);
switch(_790){
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
var _793=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_793);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _794=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_794);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_795){
var _796=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_795);
return UserInterface.registerBinding(_796,DialogCoverBinding);
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
var _797=this.getProperty("image");
if(_797){
this.setImage(_797);
}
var _798=this.getProperty("label");
if(_798){
this.setLabel(_798);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_799){
if(this.isAttached){
this.labelBinding.setLabel(_799);
}
this.setProperty("label",_799);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_79b){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_79b);
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
DialogTitleBarBinding.newInstance=function(_79c){
var _79d=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_79c);
return UserInterface.registerBinding(_79d,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_79e){
var _79f=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_79e);
return UserInterface.registerBinding(_79f,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_7a0){
var _7a1=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_7a0);
return UserInterface.registerBinding(_7a1,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_7a2){
this.binding=_7a2;
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
var _7a5=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a6=node.nodeName.toLowerCase();
switch(_7a6){
case "script":
case "style":
case "textarea":
_7a5=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7a5;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7ad=true;
if(exp.test(text)){
self._textnodes.add(node);
_7ad=false;
}
return _7ad;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7ae,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7ae,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7b2=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7b2+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b8){
var _7b9="";
var _7ba="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7bb="</span>";
var self=this;
function iterate(_7bd){
var _7be=-1;
var _7bf=null;
self._map.each(function(key,exp){
var low=_7bd.toLowerCase();
var _7c3=low.search(exp);
if(_7c3>-1){
if(_7be==-1){
_7be=_7c3;
}
if(_7c3<=_7be){
_7be=_7c3;
_7bf=key;
}
}
});
if(_7be>-1&&_7bf!=null){
var pre=_7bd.substring(0,_7be);
var hit=_7bd.substring(_7be,_7be+_7bf.length);
var pst=_7bd.substring(_7be+_7bf.length,_7bd.length);
_7b9+=pre+_7ba+hit+_7bb;
iterate(pst);
}else{
_7b9+=_7bd;
}
}
iterate(_7b8);
return _7b9;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c7){
var _7c8=new List(_7c7.getElementsByTagName("span"));
_7c8.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c7.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7cb){
var _7cc=null;
if(_7cb.isAttached){
var doc=_7cb.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7cc=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7cc instanceof SOAPFault){
_7cc=null;
}
}
}
return _7cc;
};
WindowBinding.highlightKeywords=function(_7d0,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7d0.isAttached){
var doc=_7d0.getContentDocument();
if(doc!=null){
var _7d3=WindowBinding._highlightcrawler;
_7d3.reset(doc.body);
if(list!=null){
_7d3.setKeys(list);
_7d3.crawl(doc.body);
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
var _7d4=WindowBinding.superclass.serialize.call(this);
if(_7d4){
_7d4.url=this.getURL();
}
return _7d4;
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
var _7d6=this.getContentWindow().DocumentManager;
if(_7d6!=null){
_7d6.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d7){
WindowBinding.superclass.handleAction.call(this,_7d7);
var _7d8=_7d7.target;
switch(_7d7.type){
case RootBinding.ACTION_PHASE_3:
if(_7d8.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d8);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d7.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7d9){
if(!this.isFit||_7d9){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7da){
if(this._pageBinding==null){
if(_7da.bindingWindow==this.getContentWindow()){
this._pageBinding=_7da;
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
WindowBinding.prototype._registerOnloadListener=function(_7db){
var _7dc=this.shadowTree.iframe;
var _7dd=_7db?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7e0=true;
if(Client.isExplorer){
_7e0=_7dc.readyState=="complete";
}
if(_7e0==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7dd](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7e1){
var _7e2=_7e1?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7e2](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7e7=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7e7.getQueryString().each(function(name,_7e9){
if(_7e9.length>512){
data.set(name,_7e9);
_7e7.setParam(name,null);
}
});
url=_7e7.toString();
}
if(data){
var self=this;
var _7eb=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7eb.id;
form.setAttribute("target",_7eb.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7ee){
var _7ef=self.bindingDocument.createElement("input");
_7ef.name=name;
_7ef.value=_7ee;
_7ef.type="hidden";
form.appendChild(_7ef);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7f0=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7f0=url;
}
return _7f0;
};
WindowBinding.prototype.reload=function(_7f2){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7f3=null;
if(this.shadowTree.iframe!=null){
_7f3=this.shadowTree.iframe;
}
return _7f3;
};
WindowBinding.prototype.getContentWindow=function(){
var _7f4=null,_7f5=this.getFrameElement();
if(_7f5!==null){
try{
_7f4=_7f5.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7f4;
};
WindowBinding.prototype.getContentDocument=function(){
var _7f6=null,win=this.getContentWindow();
if(win){
_7f6=win.document;
}
return _7f6;
};
WindowBinding.prototype.getRootBinding=function(){
var _7f8=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7f8=UserInterface.getBinding(doc.body);
}
return _7f8;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7fa){
this.bindingElement.style.height=_7fa+"px";
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
WindowBinding.prototype.handleCrawler=function(_7fb){
WindowBinding.superclass.handleCrawler.call(this,_7fb);
if(_7fb.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7fb.nextNode=root.bindingElement;
}else{
_7fb.response=NodeCrawler.SKIP_CHILDREN;
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
var _800=this.getContentWindow();
if(_800!=null&&_800.document!=null&&_800.document.body!=null){
_800.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
}
};
WindowBinding.newInstance=function(_801){
var _802=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_801);
var _803=UserInterface.registerBinding(_802,WindowBinding);
return _803;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_807){
_807.target.show();
_807.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_809){
_809.target.show();
_809.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_80b){
PreviewWindowBinding.superclass.handleAction.call(this,_80b);
switch(_80b.type){
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
var _80c=null;
this._getRadioButtonBindings().each(function(_80d){
if(_80d.getProperty("ischecked")){
_80c=_80d;
return false;
}else{
return true;
}
});
if(_80c){
this._checkedRadioBinding=_80c;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_80e){
RadioGroupBinding.superclass.handleAction.call(this,_80e);
var _80f=_80e.target;
switch(_80e.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_80e.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_80f.isRadioButton&&!_80f.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_80f);
}
this._checkedRadioBinding=_80f;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_80e.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_810,_811){
if(_810 instanceof RadioDataBinding){
_810=_810.getButton();
}
if(_810.isRadioButton){
switch(_811){
case true:
this._unCheckRadioBindingsExcept(_810);
this._checkedRadioBinding=_810;
_810.check(true);
break;
default:
_810.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_812){
var _813=this._getRadioButtonBindings();
_813.each(function(_814){
if(_814.isChecked&&_814!=_812){
_814.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _815=new Crawler();
var list=new List();
_815.addFilter(function(_817){
var _818=true;
var _819=UserInterface.getBinding(_817);
if(_819 instanceof RadioGroupBinding){
_818=NodeCrawler.SKIP_CHILDREN;
}else{
if(_819 instanceof ButtonBinding&&_819.isRadioButton){
list.add(_819);
}
}
return _818;
});
_815.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_81a){
var _81b=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_81a);
return UserInterface.registerBinding(_81b,RadioGroupBinding);
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
var _81d=this.getProperty("regexrule");
if(_81d!=null){
this.expression=new RegExp(_81d);
}
var _81e=this.getProperty("onbindingblur");
if(_81e!=null){
this.onblur=function(){
Binding.evaluate(_81e,this);
};
}
var _81f=this.getProperty("onvaluechange");
if(_81f!=null){
this.onValueChange=function(){
Binding.evaluate(_81f,this);
};
}
if(this.error==null&&this.type!=null){
var _820=DataBinding.errors[this.type];
if(_820!=null){
this.error=_820;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _821=this.getProperty("value");
if(_821!=null){
this.setValue(String(_821));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _823=this.getProperty("isdisabled");
if(_823==true){
this.setDisabled(true);
}
var _824=this.getProperty("readonly");
if(_824==true){
this.setReadOnly(true);
}
var _825=this.getProperty("autoselect");
if(_825==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _826=Localization.currentLang();
if(_826!=null){
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
var _827=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_827.type=this.isPassword==true?"password":"text";
_827.tabIndex=-1;
return _827;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_82a){
if(_82a){
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
DataInputBinding.prototype.focus=function(_82c){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_82c){
var self=this,_82e=this.bindingElement,_82f={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_82e,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_82e,DOMEvents.MOUSEUP,_82f);
}else{
this.select();
}
}
this.onfocus();
if(!_82c){
var _830=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_830);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _831=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _832=_831.createTextRange();
_832.moveStart("character",0);
_832.moveEnd("character",_831.value.length);
_832.select();
}else{
_831.setSelectionRange(0,_831.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_833){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_833){
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
DataInputBinding.prototype.validate=function(_837){
if(_837==true||this._isValid){
var _838=this.isValid();
if(_838!=this._isValid){
this._isValid=_838;
if(!_838){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _839=null;
if(this._isInvalidBecauseRequired==true){
_839=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_839=DataBinding.warnings["minlength"];
_839=_839.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_839=DataBinding.warnings["maxlength"];
_839=_839.replace("${count}",String(this.maxlength));
}else{
_839=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_839!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_839);
}
}else{
this.setValue(_839);
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
var _83a=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _83b=this.getValue();
if(_83b==""){
if(this.isRequired==true){
_83a=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _83c=DataBinding.expressions[this.type];
if(!_83c.test(_83b)){
_83a=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_83b)){
_83a=false;
}
}
}
}
if(_83a&&this.minlength!=null){
if(_83b.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_83a=false;
}
}
if(_83a&&this.maxlength!=null){
if(_83b.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_83a=false;
}
}
return _83a;
};
DataInputBinding.prototype.setDisabled=function(_83d){
if(_83d!=this.isDisabled){
if(_83d){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _83e=this.shadowTree.input;
if(_83d){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_83e,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_83e,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_83d;
this.shadowTree.input.unselectable=_83d?"on":"off";
}
this.isDisabled=_83d;
this.isFocusable=!_83d;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_840){
if(_840!=this.isReadOnly){
if(_840){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_840;
this.isReadOnly=_840;
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
DataInputBinding.prototype.handleElement=function(_841){
return true;
};
DataInputBinding.prototype.updateElement=function(_842){
var _843=_842.getAttribute("value");
var _844=_842.getAttribute("type");
var _845=_842.getAttribute("maxlength");
var _846=_842.getAttribute("minlength");
var _847=_842.getAttribute("required")==="true";
if(_843==null){
_843="";
}
var _848=this.bindingWindow.UpdateManager;
if(this.getValue()!=_843){
_848.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_843);
}
if(this.type!=_844){
_848.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_844;
}
if(this.maxlength!=_845){
_848.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_845;
}
if(this.minlength!=_846){
_848.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_846;
}
if(this.isRequired!=_847){
_848.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_847;
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
DataInputBinding.prototype.setValue=function(_849){
if(_849===null){
_849="";
}
if(_849!=this.getValue()){
this.setProperty("value",_849);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_849);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _84a=null;
if(this.shadowTree.input!=null){
_84a=this.shadowTree.input.value;
}else{
_84a=this.getProperty("value");
}
return _84a;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _84c=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_84c=Number(_84c);
break;
}
return _84c;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_84d){
var _84e=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_84d);
return UserInterface.registerBinding(_84e,DataInputBinding);
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
var _84f=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_84f!=null){
this.setValue(_84f.value);
_84f.parentNode.removeChild(_84f);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _850=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_850.tabIndex=-1;
return _850;
};
TextBoxBinding.prototype.handleElement=function(_851){
return true;
};
TextBoxBinding.prototype.updateElement=function(_852){
var _853,area=_852.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_853=DOMUtil.getTextContent(area);
}
if(_853==null){
_853="";
}
var _855=this.bindingWindow.UpdateManager;
if(this.getValue()!=_853){
_855.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_853);
}
var _856=_852.getAttribute("type");
if(this.type!=_856){
_855.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_856;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_85a){
var _85b=this.bindingDocument.selection.createRange();
var _85c=_85b.text=="";
if(_85c&&!_85a){
_85b.text="\t";
}else{
var text="";
var _85e=_85b.text.length;
while((_85b.moveStart("word",-1)&&_85b.text.charAt(1)!="\n")){
}
_85b.moveStart("character",1);
var _85f=0;
var i=0,line,_862=_85b.text.split("\n");
while((line=_862[i++])!=null){
if(_85a){
line=line.replace(/^(\s)/mg,"");
_85f++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_862[i+1]?"\n":"");
}
_85b.text=text;
_85b.moveStart("character",-_85e);
if(_85a){
_85b.moveStart("character",2*_862.length-2);
}
_85b.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _863=this.bindingDocument.selection.createRange();
var _864=_863.duplicate();
while((_864.moveStart("word",-1)&&_864.text.indexOf("\n")==-1)){
}
_864.moveStart("character",1);
_863.text="\n"+_864.text.match(/^(\s)*/)[0]+"!";
_863.moveStart("character",-1);
_863.select();
_863.text="";
_863.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_865){
var _866;
var _867;
var oss;
var osy;
var i;
var fnd;
var _86c=this._getSelectedText();
var el=this.shadowTree.input;
_866=el.scrollLeft;
_867=el.scrollTop;
if(!_86c.match(/\n/)){
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
_86c=this._getSelectedText();
if(_865){
ntext=_86c.replace(/^(\s)/mg,"");
}else{
ntext=_86c.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_86c.length);
}
el.scrollLeft=_866;
el.scrollTop=_867;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _86e;
var _86f;
var oss;
var osy;
var el=this.shadowTree.input;
_86e=el.scrollLeft;
_86f=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_86e;
el.scrollTop=_86f;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _876=this.shadowTree.input.value;
var _877=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _876.substr(_877,end-_877);
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
var _879=this.getProperty("isdisabled");
if(this.isDisabled||_879){
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
var _87b=this.getProperty("label");
var _87c=this.getProperty("value");
var _87d=this.getProperty("width");
var _87e=this.getProperty("onchange");
var _87f=this.getProperty("required")==true;
var _880=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_87b!=null){
this.label=_87b;
}
if(!this.value&&_87c!=null){
this.value=_87c;
}
if(!this.width&&_87d){
this.width=_87d;
}
if(_87f){
this.isRequired=true;
}
if(_880){
this._isLocal=true;
}
if(_87e){
this.onValueChange=function(){
Binding.evaluate(_87e,this);
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
var _881=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_881.name=this.getName();
_881.value=this.getValue();
_881.type="hidden";
if(this.hasCallBackID()){
_881.id=this.getCallBackID();
}
this.shadowTree.input=_881;
this.bindingElement.appendChild(_881);
};
SelectorBinding.prototype.buildButton=function(){
var _882=this.BUTTON_IMPLEMENTATION;
var _883=this.add(_882.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_883.imageProfile=this.imageProfile;
}
if(this.width!=null){
_883.setWidth(this.width);
}
this._buttonBinding=_883;
this.shadowTree.button=_883;
_883.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.labelBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _885;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _886=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_886.id="selectorpopupset";
_885=UserInterface.registerBinding(_886,PopupSetBinding);
this.bindingDocument.body.appendChild(_885.bindingElement);
}else{
_885=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_885=top.app.bindingMap.selectorpopupset;
}
var doc=_885.bindingDocument;
var _888=_885.add(PopupBinding.newInstance(doc));
var _889=_888.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_888;
this._menuBodyBinding=_889;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_888.attachClassName("selectorpopup");
_888.addActionListener(PopupBinding.ACTION_SHOW,this);
_888.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_888.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_888);
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
var _88c=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_88c).each(function(_88d){
var _88e=_88d.getAttribute("label");
var _88f=_88d.getAttribute("value");
var _890=_88d.getAttribute("selected");
var _891=_88d.getAttribute("image");
var _892=_88d.getAttribute("image-hover");
var _893=_88d.getAttribute("image-active");
var _894=_88d.getAttribute("image-disabled");
var _895=null;
if(_891||_892||_893||_894){
_895=new ImageProfile({image:_891,imageHover:_892,imageActive:_893,imageDisabled:_894});
}
list.add(new SelectorBindingSelection(_88e?_88e:null,_88f?_88f:null,_890&&_890=="true",_895));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _897=null;
while(list.hasNext()){
var _898=list.getNext();
var item=this.addSelection(_898);
if(_898.isSelected){
this.select(item,true);
}
if(!_897){
_897=item;
}
}
if(!this._selectedItemBinding){
this.select(_897,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_89a,_89b){
var _89c=this.MENUITEM_IMPLEMENTATION;
var _89d=this._menuBodyBinding;
var _89e=_89d.bindingDocument;
var _89f=_89c.newInstance(_89e);
_89f.imageProfile=_89a.imageProfile;
_89f.setLabel(_89a.label);
if(_89a.tooltip!=null){
_89f.setToolTip(_89a.tooltip);
}
_89f.selectionValue=_89a.value;
_89a.menuItemBinding=_89f;
if(_89b){
_89d.addFirst(_89f);
this.selections.addFirst(_89a);
}else{
_89d.add(_89f);
this.selections.add(_89a);
}
this._isUpToDate=false;
return _89f;
};
SelectorBinding.prototype.addSelectionFirst=function(_8a0){
return this.addSelection(_8a0,true);
};
SelectorBinding.prototype.clear=function(_8a1){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_8a1&&this.defaultSelection!=null){
var _8a2=this.addSelection(this.defaultSelection);
this.select(_8a2,true);
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
SelectorBinding.prototype.setDisabled=function(_8a3){
if(this.isAttached==true){
var _8a4=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_8a3?"none":"block";
_8a4.setDisabled(_8a3);
}
if(_8a3){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8a5){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8a5);
}
};
SelectorBinding.prototype.handleAction=function(_8a6){
SelectorBinding.superclass.handleAction.call(this,_8a6);
switch(_8a6.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8a6.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8a6.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8a6.target);
_8a6.consume();
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
_8a6.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8a8){
this.select(_8a8);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8a9=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8aa=this._popupBinding.bindingElement;
_8aa.style.minWidth=_8a9;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8ac=Client.isExplorer?e.keyCode:e.which;
if(_8ac==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8ac=Client.isExplorer?e.keyCode:e.which;
if(_8ac>=32){
this._buttonBinding.check();
var _8ad=String.fromCharCode(_8ac);
this._pushSearchSelection(_8ad);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8ae){
this._searchString+=_8ae.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8af){
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
var _8b0=this._menuBodyBinding;
if(_8b0!=null){
var _8b1=this.MENUITEM_IMPLEMENTATION;
var _8b2=_8b0.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8b4=list.getNext();
if(_8b4.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8b4);
}
}
}
this._attachSelections();
var _8b5=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8b6=_8b0.getDescendantBindingsByType(_8b1);
if(_8b6.hasEntries()){
while(_8b6.hasNext()){
var _8b7=_8b6.getNext();
var _8b8=_8b7.labelBinding;
if(_8b8!=null&&_8b8.shadowTree!=null&&_8b8.shadowTree.labelText!=null){
_8b8.shadowTree.labelText.innerHTML=_8b8.shadowTree.labelText.innerHTML.replace(_8b5,"<b>$&</b>");
}
}
_8b6.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8b8=LabelBinding.newInstance(_8b2);
_8b8.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8b0.add(_8b8);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8b4=list.getNext();
var item=this.addSelection(_8b4);
if(this._selectionValue==_8b4.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8ba,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8ba,arg);
switch(_8ba){
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
SelectorBinding.prototype.select=function(_8bd,_8be){
var _8bf=false;
if(_8bd!=this._selectedItemBinding){
this._selectedItemBinding=_8bd;
_8bf=true;
var _8c0=this._buttonBinding;
this._selectionValue=_8bd.selectionValue;
this._selectionLabel=_8bd.getLabel();
_8c0.setLabel(_8bd.getLabel());
if(_8bd.imageProfile!=null){
_8c0.imageProfile=_8bd.imageProfile;
}
if(_8c0.imageProfile!=null){
_8c0.setImage(this.isDisabled==true?_8c0.imageProfile.getDisabledImage():_8c0.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8be){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8be)){
this.validate();
}
}
return _8bf;
};
SelectorBinding.prototype._relate=function(){
var _8c1=this.getProperty("relate");
if(_8c1){
var _8c2=this.bindingDocument.getElementById(_8c1);
if(_8c2){
var _8c3=UserInterface.getBinding(_8c2);
if(_8c3){
if(this.isChecked){
_8c3.show();
}else{
_8c3.hide();
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
SelectorBinding.prototype.selectByValue=function(_8c4,_8c5){
var _8c6=false;
var _8c7=this._menuBodyBinding;
var _8c8=_8c7.getDescendantElementsByLocalName("menuitem");
while(_8c8.hasNext()){
var _8c9=UserInterface.getBinding(_8c8.getNext());
if(_8c9.selectionValue==_8c4){
_8c6=this.select(_8c9,_8c5);
break;
}
}
return _8c6;
};
SelectorBinding.prototype.getValue=function(){
var _8ca=this._selectionValue;
if(_8ca!=null){
_8ca=String(_8ca);
}
return _8ca;
};
SelectorBinding.prototype.setValue=function(_8cb){
this.selectByValue(String(_8cb),true);
};
SelectorBinding.prototype.getResult=function(){
var _8cc=this._selectionValue;
if(_8cc=="null"){
_8cc=null;
}
if(_8cc){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8cc=Number(_8cc);
break;
}
}
return _8cc;
};
SelectorBinding.prototype.setResult=function(_8cd){
this.selectByValue(_8cd,true);
};
SelectorBinding.prototype.validate=function(){
var _8ce=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8cf=this.getValue();
if(_8cf==this.defaultSelection.value){
_8ce=false;
}
if(_8ce!=this._isValid){
if(_8ce){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8ce;
}
return _8ce;
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
var _8d0=this._popupBinding;
if(!this._isUpToDate){
_8d0.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8d1,_8d2){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8d1));
return true;
};
SelectorBinding.newInstance=function(_8d3){
var _8d4=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8d3);
return UserInterface.registerBinding(_8d4,SelectorBinding);
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
var _8d7=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8d7){
this.onValueChange=function(){
Binding.evaluate(_8d7,this);
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
SimpleSelectorBinding.prototype.focus=function(_8da){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8da){
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
SimpleSelectorBinding.prototype._hack=function(_8db){
if(Client.isExplorer){
this._select.style.width=_8db?"auto":this._cachewidth+"px";
if(_8db){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8dc=true;
if(this.isRequired){
if(this.getValue()==null){
_8dc=false;
}
}
if(_8dc!=this._isValid){
if(_8dc){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8dd=this._select;
var _8de=_8dd.options[_8dd.selectedIndex];
var text=DOMUtil.getTextContent(_8de);
_8dd.blur();
_8dd.style.color="#A40000";
_8dd.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8de,DataBinding.warnings["required"]);
}
_8dd.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8de,text);
}
};
}
this._isValid=_8dc;
}
return _8dc;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8e0=null;
var _8e1=this._select;
var _8e2=_8e1.options[_8e1.selectedIndex];
var _8e3=true;
if(Client.isExplorer){
var html=_8e2.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8e3=false;
}
}
if(_8e3){
_8e0=_8e2.getAttribute("value");
}
return _8e0;
};
SimpleSelectorBinding.prototype.setValue=function(_8e5){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8e6){
this.setValue(_8e6);
};
SimpleSelectorBinding.newInstance=function(_8e7){
var _8e8=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8e7);
return UserInterface.registerBinding(_8e8,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8e9,_8ea,_8eb,_8ec,_8ed){
this._init(_8e9,_8ea,_8eb,_8ec,_8ed);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8ee,_8ef,_8f0,_8f1,_8f2){
if(_8ee!=null){
this.label=String(_8ee);
}
if(_8ef!=null){
this.value=String(_8ef);
}
if(_8f1!=null){
this.imageProfile=_8f1;
}
if(_8f2!=null){
this.tooltip=_8f2;
}
this.isSelected=_8f0?true:false;
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
var _8f3=this.getProperty("image");
if(_8f3){
this.setImage(_8f3);
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
var _8f6=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8f6.popupBindingTargetElement=this.shadowTree.input;
_8f6.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8f6.attach();
var self=this;
_8f6.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8f6;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8f9=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8f9).each(function(_8fa){
if(_8fa.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8fb=_8fa.getAttribute("value");
var _8fc=_8fa.getAttribute("selected");
var _8fd=_8fa.getAttribute("tooltip");
list.add({value:_8fb?_8fb:null,toolTip:_8fd?_8fd:null,isSelected:(_8fc&&_8fc=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8ff=this._menuBodyBinding;
var _900=_8ff.bindingDocument;
while(_8ff.bindingElement.hasChildNodes()){
var node=_8ff.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8ff.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _902=this.getProperty("emptyentrylabel");
if(_902){
var _903=MenuItemBinding.newInstance(_900);
_903.setLabel(_902);
_903.selectionValue="";
_8ff.add(_903);
}
while(list.hasNext()){
var _904=list.getNext();
var _903=MenuItemBinding.newInstance(_900);
_903.setLabel(_904.label?_904.label:_904.value);
_903.selectionValue=_904.value;
if(_904.image){
_903.setImage(_904.image);
}
if(_904.toolTip){
_903.setToolTip(_904.toolTip);
}
if(_904.isSelected){
this.select(_903,true);
}
_8ff.add(_903);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_905){
this.select(_905);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_906,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_906,arg);
switch(_906){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_906,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_908){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_908);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_909){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_909);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _90a=this.bindingElement.offsetWidth+"px";
var _90b=this._popupBinding.bindingElement;
_90b.style.minWidth=_90a;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _90c=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _90d=this.getValue();
var _90e=null;
_90c.each(function(item){
if(item.getLabel()==_90d){
_90e=item;
}
});
if(_90e){
_90e.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_911){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_911){
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
DataInputSelectorBinding.prototype.setValue=function(_912){
var _913=this.isReadOnly;
var _914=null;
if(_912!=null&&_912!=""){
var _915=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_915.hasNext()){
var item=_915.getNext();
if(item.selectionValue==_912){
_914=item.getLabel();
break;
}
}
}
if(_914!=null){
this.value=_912;
this.shadowTree.input.value=_914;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_912);
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
var _918="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_918);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_918);
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
var _91a=ToolBarButtonBinding.newInstance(this.bindingDocument);
_91a.setImage("${icon:popup}");
this.addFirst(_91a);
_91a.attach();
var self=this;
_91a.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _91c=self.getProperty("handle");
var _91d=ViewDefinition.clone(_91c,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_91d instanceof DialogViewDefinition){
_91d.handler={handleDialogResponse:function(_91e,_91f){
self._isButtonClicked=false;
if(_91e==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _920=_91f.getFirst();
self.setValue(_920);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_91d.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_91d);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_91a.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_91a;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _922=this._dialogButtonBinding;
if(_922!=null){
_922.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _924=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_924=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _924;
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
var _927=ToolBarButtonBinding.newInstance(this.bindingDocument);
_927.setImage("${icon:editor-sourceview}");
_927.bindingElement.style.left="-24px";
_927.bindingElement.style.width="24px";
this.addFirst(_927);
_927.attach();
_927.hide();
var self=this;
_927.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_927;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_928){
UrlInputDialogBinding.superclass.setValue.call(this,_928);
if(this.isAttached){
this.compositeUrl=new Uri(_928);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _929=TreeService.GetCompositeUrlLabel(_928);
if(_929!=_928){
this.setLabel(_929);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_92a){
if(this.shadowTree.labelInput){
if(_92a){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_92a;
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
var _92b=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _92c=this.getProperty("image");
if(_92c!=null){
_92b.setImage(_92c);
}else{
_92b.setImage("${icon:popup}");
}
this.addFirst(_92b);
_92b.attach();
var self=this;
_92b.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_92b;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _92e=this._dialogButtonBinding;
if(_92e!=null){
_92e.oncommand();
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
var _92f=this.getProperty("required")==true;
if(_92f){
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
var _930=this.getProperty("label");
var _931=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_930!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_930+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_930);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_931!=null){
this._buttonBinding.setToolTip(_931);
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
DataDialogBinding.prototype.handleAction=function(_933){
DataDialogBinding.superclass.handleAction.call(this,_933);
var _934=_933.target;
var self=this;
switch(_933.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_936,_937){
if(_936==Dialog.RESPONSE_ACCEPT){
if(_937 instanceof DataBindingMap){
self._map=_937;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_934==this._buttonBinding){
_933.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_938,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_938,arg);
switch(_938){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _93b=this.getProperty("handle");
var url=this.getURL();
var _93d=null;
if(_93b!=null||def!=null){
if(def!=null){
_93d=def;
}else{
_93d=ViewDefinitions[_93b];
}
if(_93d instanceof DialogViewDefinition){
_93d.handler=this._handler;
if(this._map!=null){
_93d.argument=this._map;
}
StageBinding.presentViewDefinition(_93d);
}
}else{
if(url!=null){
_93d=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_93d!=null){
this._dialogViewHandle=_93d.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_93e){
this.setProperty("label",_93e);
if(this.isAttached){
this._buttonBinding.setLabel(_93e+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_93f){
this.setProperty("image",_93f);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_93f);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_940){
this.setProperty("tooltip",_940);
if(this.isAttached){
this._buttonBinding.setToolTip(_940);
}
};
DataDialogBinding.prototype.setHandle=function(_941){
this.setProperty("handle",_941);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_943){
this._handler=_943;
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
var _944=true;
if(this.isRequired==true){
var _945=this.getValue();
if(_945==null||_945==""){
_944=false;
}
if(_944!=this._isValid){
if(_944){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_944;
}
return _944;
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
DataDialogBinding.newInstance=function(_947){
var _948=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_947);
return UserInterface.registerBinding(_948,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_94a,_94b){
if(_94a==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_94b);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_94c){
_94c=new String(_94c);
this.dirty();
this.setValue(encodeURIComponent(_94c));
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
var _950=this.getValue();
if(_950==null){
_950="";
}
this.shadowTree.dotnetinput.value=_950;
};
PostBackDataDialogBinding.prototype.setValue=function(_951){
this.setProperty("value",_951);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_952){
};
PostBackDataDialogBinding.newInstance=function(_953){
var _954=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_953);
return UserInterface.registerBinding(_954,PostBackDataDialogBinding);
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
var _955=this.getProperty("dialoglabel");
var _956=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _958=this.getProperty("handle");
var _959=this.getProperty("selectedtoken");
if(_958!=null){
var def=ViewDefinition.clone(_958,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_955!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_955;
}
if(_956!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_956;
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
if(_959!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_959;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_95b){
var _95c=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_95b);
return UserInterface.registerBinding(_95c,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_95e){
self._datathing.setValue(_95e);
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
var _961=self.getValue();
if(_961==""||_961==null){
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
var _962=this.getProperty("value");
var _963=this.getProperty("selectorlabel");
if(_963==null){
_963=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_962==null));
list.add(new SelectorBindingSelection(_963+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_962!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _962=this.getValue();
if(_962==""||_962==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_965){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_965);
switch(_965.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_965.target==this._datathing){
var _966=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_966){
self._selector.setLabel(_966);
}
},500);
_965.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_968){
this.setProperty("label",_968);
if(this._selector!=null){
this._selector.setLabel(_968);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_969){
this._datathing.setValue(_969);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_96b,_96c){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_96b,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_96d){
this._buttonBinding.setLabel(_96d);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_96e){
this._buttonBinding.setToolTip(_96e);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_96f){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_96f);
switch(_96f.type){
case MenuItemBinding.ACTION_COMMAND:
var _970=_96f.target;
var _971=this.master;
if(_970.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_970.getLabel());
setTimeout(function(){
_971.action();
},0);
}else{
if(_971.getValue()){
_971.dirty();
}
_971.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_972){
var _973=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_972);
return UserInterface.registerBinding(_973,NullPostBackDataDialogSelectorBinding);
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
var _974=this._dataDialogBinding;
if(_974!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_974.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _975=this.getProperty("editable");
var _976=this.getProperty("selectable");
var _977=this.getProperty("display");
if(_975!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_976){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_977){
this._display=_977;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _978=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_978.selections=this.selections;
this.add(_978);
_978.attach();
this._dataDialogBinding=_978;
this.shadowTree.datadialog=_978;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _97a=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _97b=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_97a=_97b.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_97a=_97b.isSelected!=true;
break;
}
if(_97a){
this.shadowTree.box.appendChild(this._getElementForSelection(_97b));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_97d){
var box=this.shadowTree.box;
var _97f=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _980=list.getNext();
if(_97d){
_980.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_97f=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_97f=_980.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_97f=_980.isSelected!=true;
break;
}
}
if(_97f){
var _981=this._getElementForSelection(_980);
box.insertBefore(_981,box.firstChild);
CSSUtil.attachClassName(_981,"selected");
this._selectionMap.set(_980.value,_981);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_982){
var _983=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_983.appendChild(this.bindingDocument.createTextNode(_982.label));
_983.setAttribute("label",_982.label);
_983.setAttribute("value",_982.value);
return _983;
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
var _985=DOMEvents.getTarget(e);
var _986=DOMUtil.getLocalName(_985);
if(_986=="div"){
this._handleMouseDown(_985);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_987){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _988=this._getElements();
var _989=_987.getAttribute("value");
var _98a=this._lastSelectedElement.getAttribute("value");
var _98b=false;
while(_988.hasNext()){
var el=_988.getNext();
switch(el.getAttribute("value")){
case _989:
case _98a:
_98b=!_98b;
break;
}
if(_98b){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_987);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_987)){
this._unhilite(_987);
}else{
this._hilite(_987);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_987){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_987;
};
MultiSelectorBinding.prototype._hilite=function(_98f){
var _990=_98f.getAttribute("value");
if(!this._selectionMap.has(_990)){
CSSUtil.attachClassName(_98f,"selected");
this._selectionMap.set(_990,_98f);
}
};
MultiSelectorBinding.prototype._unhilite=function(_991){
var _992=_991.getAttribute("value");
if(this._selectionMap.has(_992)){
CSSUtil.detachClassName(_991,"selected");
this._selectionMap.del(_992);
}
};
MultiSelectorBinding.prototype._isHilited=function(_993){
return CSSUtil.hasClassName(_993,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_994){
MultiSelectorBinding.superclass.handleAction.call(this,_994);
var _995=_994.target;
switch(_994.type){
case DataDialogBinding.ACTION_COMMAND:
if(_995==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_994.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_995.result);
this.dirty();
_995.result=null;
_994.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _996=null;
if(this.isSelectable){
_996=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_998){
if(self._isHilited(_998)){
_998.parentNode.removeChild(_998);
_996.add(new SelectorBindingSelection(_998.getAttribute("label"),_998.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _996;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _99a=this._getElements();
if(!isUp){
_99a.reverse();
}
var _99b=true;
while(_99b&&_99a.hasNext()){
var _99c=_99a.getNext();
if(this._isHilited(_99c)){
switch(isUp){
case true:
if(_99c.previousSibling){
_99c.parentNode.insertBefore(_99c,_99c.previousSibling);
}else{
_99b=false;
}
break;
case false:
if(_99c.nextSibling){
_99c.parentNode.insertBefore(_99c,_99c.nextSibling.nextSibling);
}else{
_99b=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _99d=new List();
var _99e=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_9a0){
var _9a1=new SelectorBindingSelection(_9a0.getAttribute("label"),_9a0.getAttribute("value"),_99e);
_9a1.isHighlighted=self._isHilited(_9a0);
_99d.add(_9a1);
});
return _99d;
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
var _9a2=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_9a2.hasEntries()){
_9a2.each(function(_9a3){
_9a3.parentNode.removeChild(_9a3);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9a4=this.selections.getNext();
if(_9a4.isSelected){
var _9a5=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9a5.name=this._name;
_9a5.value=_9a4.value;
this.bindingElement.appendChild(_9a5);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9a6){
alert(_9a6);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9a7){
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
var _9a8={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9a9=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9a9.handler=this._handler;
_9a9.argument=_9a8;
StageBinding.presentViewDefinition(_9a9);
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
var _9aa={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9ac={handleDialogResponse:function(_9ad,_9ae){
if(_9ad==Dialog.RESPONSE_ACCEPT){
self.result=_9ae;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9af=ViewDefinitions[this._dialogViewHandle];
_9af.handler=_9ac;
_9af.argument=_9aa;
StageBinding.presentViewDefinition(_9af);
};
MultiSelectorDataDialogBinding.newInstance=function(_9b0){
var _9b1=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9b0);
return UserInterface.registerBinding(_9b1,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9b2){
var id=_9b2.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9b4=_9b2.bindingDocument.getElementById(id);
if(_9b4!=null){
var _9b5=UserInterface.getBinding(_9b4);
_9b5.setResult(true);
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
var _9b7=this.bindingDocument.getElementById(id);
if(_9b7!=null){
var _9b8=UserInterface.getBinding(_9b7);
if(_9b8&&!_9b8.isAttached){
_9b8.isLazy=true;
}else{
_9b7.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9b9){
this._isLazy=_9b9;
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
var _9bb=this.getProperty("stateprovider");
var _9bc=this.getProperty("handle");
if(_9bb!=null&&_9bc!=null){
url=url.replace("${stateprovider}",_9bb).replace("${handle}",_9bc);
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
EditorDataBinding.prototype._onPageInitialize=function(_9bd){
EditorDataBinding.superclass._onPageInitialize.call(this,_9bd);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9be){
EditorDataBinding.superclass.handleAction.call(this,_9be);
switch(_9be.type){
case Binding.ACTION_DIRTY:
if(_9be.target!=this){
if(!this.isDirty){
this.dirty();
}
_9be.consume();
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
EditorDataBinding.prototype.setValue=function(_9bf){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9c0){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9c1){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9c1);
if(this.hasBasic===false){
var _9c2=this.getContentWindow().bindingMap.basicgroup;
if(_9c2){
_9c2.hide();
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
var _9c7=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9c7=fake.getValue()!="";
}
if(!_9c7&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9c7&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9c7;
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
var _9cb=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9cb!=null){
_9cb.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9cc){
_9cc=_9cc!=null?_9cc:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9cc;
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
var _9cd=this.getProperty("label");
if(_9cd){
this.setLabel(_9cd);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9ce){
this.setProperty("label",_9ce);
if(this.shadowTree.labelBinding==null){
var _9cf=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9cf.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9cf.bindingElement,this.bindingElement.firstChild);
_9cf.attach();
this.shadowTree.labelBinding=_9cf;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9ce));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9d1){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9d1.bindingElement);
return _9d1;
};
FieldGroupBinding.prototype.addFirst=function(_9d2){
var _9d3=this.shadowTree[FieldGroupBinding.CENTER];
_9d3.insertBefore(_9d2.bindingElement,_9d3.firstChild);
return _9d2;
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
var _9d4=this.getProperty("relation");
if(_9d4!=null){
this.bindingRelation=_9d4;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9d5,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9d5,arg);
switch(_9d5){
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
FieldBinding.newInstance=function(_9d7){
var _9d8=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9d7);
return UserInterface.registerBinding(_9d8,FieldBinding);
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
var _9d9=this.getDescendantBindingByLocalName("fieldgroup");
if(_9d9!=null){
_9d9.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9da=true;
var _9db=this.getDescendantBindingsByLocalName("*");
while(_9db.hasNext()){
var _9dc=_9db.getNext();
if(Interfaces.isImplemented(IData,_9dc)){
var _9dd=_9dc.validate();
if(_9da&&!_9dd){
_9da=false;
}
}
}
return _9da;
};
FieldsBinding.prototype.handleAction=function(_9de){
FieldsBinding.superclass.handleAction.call(this,_9de);
var _9df=_9de.target;
if(_9df!=this){
switch(_9de.type){
case Binding.ACTION_INVALID:
var _9e0=DataBinding.getAssociatedLabel(_9df);
if(_9e0){
this._invalidFieldLabels.set(_9df.key,_9e0);
}
if(_9df.error){
if(!_9df.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9df.error},_9df);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9de.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9df.key)){
this._invalidFieldLabels.del(_9df.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9de.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9e1=null;
if(this._invalidFieldLabels.hasEntries()){
_9e1=this._invalidFieldLabels.toList();
}
return _9e1;
};
FieldsBinding.newInstance=function(_9e2){
var _9e3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9e2);
return UserInterface.registerBinding(_9e3,FieldsBinding);
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
var _9e4=this.getProperty("image");
if(_9e4){
this.setImage(_9e4);
}
var _9e5=this.getProperty("tooltip");
if(_9e5){
this.setToolTip(_9e5);
}
var _9e6=this.getProperty("label");
if(_9e6){
this.setLabel(_9e6);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9e8=this.getAncestorBindingByLocalName("field");
if(_9e8){
var _9e9=true;
_9e8.getDescendantBindingsByLocalName("*").each(function(_9ea){
if(Interfaces.isImplemented(IData,_9ea)){
_9ea.focus();
_9e9=false;
}
return _9e9;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9eb){
this.setProperty("label",_9eb);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9eb);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9ec=this.getProperty("label");
if(!_9ec){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9ec=node.data;
}
}
return _9ec;
};
FieldDescBinding.prototype.setImage=function(_9ee){
this.setProperty("image",_9ee);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9ef){
this.setProperty("tooltip",_9ef);
if(this.isAttached){
this.bindingElement.title=_9ef;
}
};
FieldDescBinding.newInstance=function(_9f0){
var _9f1=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9f0);
return UserInterface.registerBinding(_9f1,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9f2){
var _9f3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9f2);
return UserInterface.registerBinding(_9f3,FieldDataBinding);
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
var _9f4=this._fieldHelpPopupBinding;
if(_9f4){
_9f4.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9f5=app.bindingMap.fieldhelpopupset;
var doc=_9f5.bindingDocument;
var _9f7=_9f5.add(PopupBinding.newInstance(doc));
var _9f8=_9f7.add(PopupBodyBinding.newInstance(doc));
_9f7.position=PopupBinding.POSITION_RIGHT;
_9f7.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9f8.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9f9=this.getProperty("label");
if(_9f9){
_9f8.bindingElement.innerHTML=Resolver.resolve(_9f9);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9f7;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9fa=this.getAncestorBindingByLocalName("field");
if(_9fa){
_9fa.attachClassName("fieldhelp");
var _9fb=ClickButtonBinding.newInstance(this.bindingDocument);
_9fb.attachClassName("fieldhelp");
_9fb.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9fb);
_9fb.attach();
var self=this;
_9fb.oncommand=function(){
self.attachPopupBinding();
};
_9fb.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9fb;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9fd=this._fieldHelpPopupBinding;
if(_9fd&&!_9fd.isAttached){
_9fd.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9ff){
RadioDataGroupBinding.superclass.handleAction.call(this,_9ff);
switch(_9ff.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_a01,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_a01,arg);
switch(_a01){
case BroadcastMessages.KEY_ARROW:
var _a03=null;
var next=null;
var _a05=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a05=this.getChildBindingsByLocalName("radio");
while(!_a03&&_a05.hasNext()){
var _a06=_a05.getNext();
if(_a06.getProperty("ischecked")){
_a03=_a06;
}
}
break;
}
if(_a03){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a05.getFollowing(_a03);
while(next!=null&&next.isDisabled){
next=_a05.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a05.getPreceding(_a03);
while(next!=null&&next.isDisabled){
next=_a05.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a07){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a07){
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
var _a08=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a08.type="hidden";
_a08.name=this._name;
this.bindingElement.appendChild(_a08);
this.shadowTree.input=_a08;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a09=null;
var _a0a=this.getChildBindingsByLocalName("radio");
while(!_a09&&_a0a.hasNext()){
var _a0b=_a0a.getNext();
if(_a0b.isChecked){
_a09=_a0b.getProperty("value");
}
}
return _a09;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a0c){
};
RadioDataGroupBinding.prototype.setResult=function(_a0d){
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
var _a0e=this.getProperty("relate");
var _a0f=this.getProperty("oncommand");
var _a10=this.getProperty("isdisabled");
if(_a0e){
this.bindingRelate=_a0e;
this.relate();
}
if(_a0f){
this.oncommand=function(){
Binding.evaluate(_a0f,this);
};
}
if(_a10==true){
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
var _a12=this.getCallBackID();
this._buttonBinding.check=function(_a13){
RadioButtonBinding.prototype.check.call(this,_a13);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a14){
RadioButtonBinding.prototype.uncheck.call(this,_a14);
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
RadioDataBinding.prototype.setChecked=function(_a15,_a16){
this._buttonBinding.setChecked(_a15,_a16);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a15);
};
RadioDataBinding.prototype.check=function(_a17){
this.setChecked(true,_a17);
};
RadioDataBinding.prototype.uncheck=function(_a18){
this.setChecked(false,_a18);
};
RadioDataBinding.prototype.setDisabled=function(_a19){
if(_a19!=this.isDisabled){
this.isDisabled=_a19;
this._buttonBinding.setDisabled(_a19);
if(_a19){
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
var _a1b=DOMEvents.getTarget(e);
switch(_a1b){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a1c=this.getProperty("label");
if(_a1c){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a1c)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a1d){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a1d;
}
this.setProperty("label",_a1d);
};
RadioDataBinding.prototype.handleElement=function(_a1e){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a1f){
var _a20=_a1f.getAttribute("ischecked")==="true";
if(this.isChecked!=_a20){
this.setChecked(_a20,true);
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
var _a22=DOMEvents.getTarget(e);
switch(_a22){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a23,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a23,arg);
switch(_a23){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a26){
_a26.consume();
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
var _a28=this.getCallBackID();
this._buttonBinding.check=function(_a29){
ButtonBinding.prototype.check.call(this,_a29);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a29){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a2a){
ButtonBinding.prototype.uncheck.call(this,_a2a);
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
if(_a28!=null){
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
var _a2b=true;
var _a2c=this.bindingElement.parentNode;
if(_a2c){
var _a2d=UserInterface.getBinding(_a2c);
if(_a2d&&_a2d instanceof CheckBoxGroupBinding){
if(_a2d.isRequired){
if(_a2d.isValid){
_a2b=_a2d.validate();
}else{
_a2b=false;
}
}
}
}
return _a2b;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a2e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a2e.type="hidden";
_a2e.name=this._name;
_a2e.style.display="none";
this.bindingElement.appendChild(_a2e);
this.shadowTree.input=_a2e;
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
var _a2f=null;
var _a30=this.getProperty("value");
if(this.isChecked){
_a2f=_a30?_a30:"on";
}
return _a2f;
};
CheckBoxBinding.prototype.setValue=function(_a31){
if(_a31==this.getValue()||_a31=="on"){
this.check(true);
}else{
if(_a31!="on"){
this.setPropety("value",_a31);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a32=false;
if(this.isChecked){
_a32=this._result!=null?this._result:true;
}
return _a32;
};
CheckBoxBinding.prototype.setResult=function(_a33){
if(typeof _a33=="boolean"){
this.setChecked(_a33,true);
}else{
this._result=_a33;
}
};
CheckBoxBinding.newInstance=function(_a34){
var _a35=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a34);
return UserInterface.registerBinding(_a35,CheckBoxBinding);
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
var _a36=true;
if(this.isRequired){
var _a37=this.getDescendantBindingsByLocalName("checkbox");
if(_a37.hasEntries()){
_a36=false;
while(_a37.hasNext()&&!_a36){
if(_a37.getNext().isChecked){
_a36=true;
}
}
}
if(_a36==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a36;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a38){
if(_a38){
if(!this._labelBinding){
var _a39=LabelBinding.newInstance(this.bindingDocument);
_a39.attachClassName("invalid");
_a39.setImage("${icon:error}");
_a39.setLabel("Selection required");
this._labelBinding=this.addFirst(_a39);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a3a){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a3a);
switch(_a3a.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a3b){
var _a3c=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a3b);
return UserInterface.registerBinding(_a3c,CheckBoxGroupBinding);
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
var _a3d=DialogControlBinding.newInstance(this.bindingDocument);
_a3d.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a3d);
this._controlGroupBinding.attachRecursive();
var _a3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a3e);
var _a3f=this.getLabel();
if(_a3f!=null){
this.setLabel(_a3f);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a40=this._snapTargetBinding;
if(Binding.exists(_a40)==true){
_a40.removeActionListener(Binding.ACTION_BLURRED,this);
_a40.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a41){
if(Interfaces.isImplemented(IData,_a41)){
this._snapTargetBinding=_a41;
var _a42=_a41.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a42&&_a42.isConsumed){
this._environmentBinding=_a42.listener;
}
if(this._environmentBinding){
_a41.addActionListener(Binding.ACTION_BLURRED,this);
_a41.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a41)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a41.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a44=this._snapTargetBinding;
var _a45=this._environmentBinding;
var root=UserInterface.getBinding(_a44.bindingDocument.body);
if(Binding.exists(_a44)&&Binding.exists(_a45)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a44.isAttached&&_a45.isAttached){
var _a47=_a44.boxObject.getUniversalPosition();
var _a48=_a45.boxObject.getUniversalPosition();
_a48.y+=_a45.bindingElement.scrollTop;
_a48.x+=_a45.bindingElement.scrollLeft;
var tDim=_a44.boxObject.getDimension();
var eDim=_a45.boxObject.getDimension();
var _a4b=false;
if(_a47.y+tDim.h<_a48.y){
_a4b=true;
}else{
if(_a47.x+tDim.w<_a48.x){
_a4b=true;
}else{
if(_a47.y>_a48.y+eDim.h){
_a4b=true;
}else{
if(_a47.x>_a48.x+eDim.w){
_a4b=true;
}
}
}
}
if(!_a4b){
this._setComputedPosition(_a47,_a48,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a4c,_a4d,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a52=_a4c;
var _a53=false;
if(_a4c.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a53=true;
}else{
if(_a4c.x+tDim.w>=_a4d.x+eDim.w){
_a53=true;
}
}
if(_a53){
_a52.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a52.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a52.y-=(bDim.h);
_a52.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a52);
};
BalloonBinding.prototype.handleBroadcast=function(_a54,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a54,arg);
switch(_a54){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a56){
var _a57=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a56){
_a57=true;
}
}
return _a57;
};
BalloonBinding.prototype._setPosition=function(_a59){
var _a5a=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a5a=true;
}
}
if(!_a5a){
this.bindingElement.style.left=_a59.x+"px";
this.bindingElement.style.top=_a59.y+"px";
this._point=_a59;
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
BalloonBinding.prototype.handleAction=function(_a5c){
BalloonBinding.superclass.handleAction.call(this,_a5c);
var _a5d=_a5c.target;
switch(_a5c.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a5c.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a5d==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a5d)){
self.dispose();
}else{
if(_a5d.validate()){
var _a5f=true;
if(_a5c.type==Binding.ACTION_BLURRED){
var root=_a5d.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a5f=false;
}
}
if(_a5f){
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
BalloonBinding.prototype.setLabel=function(_a62){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a63=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a62);
_a63.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a63);
}
this.setProperty("label",_a62);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a65){
var _a66=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a65);
var _a67=UserInterface.registerBinding(_a66,BalloonBinding);
_a67.hide();
return _a67;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a68,_a69){
if(Interfaces.isImplemented(IData,_a69)==true){
var _a6a,_a6b=_a69.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a6b&&_a6b.isConsumed){
switch(_a6b.listener.constructor){
case StageBinding:
_a6a=false;
break;
case StageDialogBinding:
_a6a=true;
break;
}
}
var _a6c=_a6a?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a6d=_a6c.add(BalloonBinding.newInstance(top.app.document));
_a6d.setLabel(_a68.text);
_a6d.snapTo(_a69);
_a6d.attach();
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
var _a6e=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a71=_a6e.getDataBinding(name);
if(_a71){
ErrorBinding.presentError({text:text},_a71);
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
FocusBinding.focusElement=function(_a72){
var _a73=true;
try{
_a72.focus();
Application.focused(true);
}
catch(exception){
var _a74=UserInterface.getBinding(_a72);
var _a75=SystemLogger.getLogger("FocusBinding.focusElement");
_a75.warn("Could not focus "+(_a74?_a74.toString():String(_a72)));
_a73=false;
}
return _a73;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a76){
var win=_a76.bindingWindow;
var id=_a76.bindingElement.id;
return {getBinding:function(){
var _a79=null;
try{
if(Binding.exists(_a76)){
_a79=win.bindingMap[id];
}
}
catch(exception){
}
return _a79;
}};
};
FocusBinding.navigateNext=function(_a7a){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a7a);
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
var _a7b=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a7b&&_a7b.isConsumed){
if(_a7b.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a7c){
FocusBinding.superclass.handleAction.call(this,_a7c);
var _a7d=_a7c.target;
var _a7e=null;
if(this._isFocusManager){
switch(_a7c.type){
case FocusBinding.ACTION_ATTACHED:
if(_a7d!=this){
this._isUpToDate=false;
}
_a7c.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a7d!=this){
this._isUpToDate=false;
_a7c.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a7e=new FocusCrawler();
_a7e.mode=FocusCrawler.MODE_BLUR;
_a7e.crawl(_a7d.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a7c.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a7d!=this){
_a7e=new FocusCrawler();
_a7e.mode=FocusCrawler.MODE_FOCUS;
_a7e.crawl(_a7d.bindingElement);
}
_a7c.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a7d)){
this.claimFocus();
this._onFocusableFocused(_a7d);
}
_a7c.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a7d)){
this._onFocusableBlurred(_a7d);
}
_a7c.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a7f){
var _a80=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a80==null&&list.hasNext()){
var _a82=list.getNext();
if(this._cachedFocus&&_a82==this._cachedFocus.getBinding()){
_a80=_a82;
}
}
if(_a80!=null){
if(_a82.isFocused){
var next=_a7f?list.getPreceding(_a80):list.getFollowing(_a80);
if(!next){
next=_a7f?list.getLast():list.getFirst();
}
next.focus();
}else{
_a80.focus();
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
var _a84=new FocusCrawler();
var list=new List();
_a84.mode=FocusCrawler.MODE_INDEX;
_a84.crawl(this.bindingElement,list);
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
var _a87=this._cachedFocus.getBinding();
if(_a87&&!_a87.isFocused){
_a87.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a88){
if(_a88!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a88;
_a88.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a88);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a89){
_a89.deleteProperty(FocusBinding.MARKER);
if(_a89==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a8b){
this.bindingElement.style.left=_a8b+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a8c){
this.hiddenTabBindings.add(_a8c);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a8d=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a8d.getLabel());
item.setImage(_a8d.getImage());
item.associatedTabBinding=_a8d;
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
TabsButtonBinding.prototype.handleAction=function(_a90){
TabsButtonBinding.superclass.handleAction.call(this,_a90);
switch(_a90.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a91=this.selectedTabBinding;
if(_a91){
this.containingTabBoxBinding.moveToOrdinalPosition(_a91,0);
this.containingTabBoxBinding.select(_a91);
}
_a90.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a92){
var _a93=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a92);
_a93.setAttribute("type","checkbox");
_a93.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a93.className="tabbutton";
return UserInterface.registerBinding(_a93,TabsButtonBinding);
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
var _a94=TabBoxBinding.currentActiveInstance;
if(_a94!=null&&Binding.exists(_a94)){
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
var _a95=this.getTabElements().getLength();
var _a96=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a95!=_a96){
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
var _a97=this.getTabPanelElements();
while(_a97.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a97.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a98=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a99=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a9a=_a98>_a99?"tabsbelow":"tabsontop";
this.attachClassName(_a9a);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a9c=this.getTabPanelElements();
var _a9d=null;
var _a9e=this.getProperty("selectedindex");
if(_a9e!=null){
if(_a9e>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a9f=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _aa1=_a9c.getNext();
this.registerTabBoxPair(tab,_aa1);
if(_a9e&&_a9f==_a9e){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a9d=tab;
}
}
_a9f++;
}
if(!_a9d){
_a9d=tabs.getFirst();
_a9d.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_aa2){
var _aa3=null;
var _aa4=null;
if(this.isEqualSize){
var _aa5=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aa7=this.getTabPanelElements();
_aa7.each(function(_aa8){
max=_aa8.offsetHeight>max?_aa8.offsetHeight:max;
});
_aa4=max+_aa5.top+_aa5.bottom;
if(_aa2&&this._tabPanelsElement.style.height!=null){
_aa3=this._tabPanelsElement.offsetHeight;
}
if(_aa3!=null||_aa4>_aa3){
this._tabPanelsElement.style.height=_aa4+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_aa9){
_aa9._invalidCount=0;
_aa9.addActionListener(Binding.ACTION_INVALID,this);
_aa9.addActionListener(Binding.ACTION_VALID,this);
_aa9.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_aaa){
TabBoxBinding.superclass.handleAction.call(this,_aaa);
var _aab=_aaa.target;
var _aac=_aaa.listener;
switch(_aaa.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_aab.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_aaa.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_aab.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_aac._invalidCount++;
if(_aac._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_aac.isSelected){
self._showWarning(_aac,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_aac._invalidCount>0){
_aac._invalidCount--;
if(_aac._invalidCount==0){
if(_aac.isSelected){
this._showWarning(_aac,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_aac,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_aaa._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_aaa._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _aaf=DOMEvents.getTarget(e);
if(_aaf==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _ab1=this.getTabPanelElements();
tabs.each(function(tab,_ab3){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ab4=_ab1.get(_ab3);
this.registerTabBoxPair(tab,_ab4);
}
},this);
var _ab5=this._tabBoxPairs;
for(var key in _ab5){
var tab=_ab5[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_aaf);
switch(_aaf.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ab9=_aaf.parentNode;
if(_ab9==this._tabsElement||_ab9==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_aaf==this._tabsElement||_aaf==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_abb){
var _abc=this.getBindingForArgument(arg);
if(_abc!=null&&!_abc.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_abc.select(_abb);
this.getTabPanelBinding(_abc).select(_abb);
var _abd=this.getProperty("selectedindex");
if(_abd!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_abc.bindingElement,true));
}
this._selectedTabBinding=_abc;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_abc.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _abe=this.getTabPanelBinding(_abc);
this._showBalloon(_abe,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ac0){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ac0.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ac0};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ac4){
var _ac5=null;
try{
var key=_ac4.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ac7=this._tabBoxPairs[key].tabPanel;
_ac5=UserInterface.getBinding(_ac7);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ac5;
};
TabBoxBinding.prototype.getTabBinding=function(_ac8){
var key=_ac8.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aca=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_aca);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _acb=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_acb);
return _acb;
};
TabBoxBinding.prototype.appendTabByBindings=function(_acc,_acd){
var _ace=_acc.bindingElement;
_acc.setProperty("selected",true);
var _acf=this.summonTabPanelBinding();
var _ad0=_acf.bindingElement;
if(_acd){
_ad0.appendChild(_acd instanceof Binding?_acd.bindingElement:_acd);
}
this.registerTabBoxPair(_ace,_ad0);
UserInterface.getBinding(this._tabsElement).add(_acc);
this._tabPanelsElement.appendChild(_ad0);
_acc.attach();
UserInterface.getBinding(_ad0).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _acc;
};
TabBoxBinding.prototype.importTabBinding=function(_ad1){
var that=_ad1.containingTabBoxBinding;
var _ad3=that.getTabPanelBinding(_ad1);
var _ad4=_ad3.getBindingElement();
var _ad5=_ad1.getBindingElement();
that.dismissTabBinding(_ad1);
this._tabsElement.appendChild(_ad5);
this._tabPanelsElement.appendChild(_ad4);
this.registerTabBoxPair(_ad5,_ad4);
_ad1.containingTabBoxBinding=this;
this.select(_ad1);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ad6){
var _ad7=null;
if(_ad6.isSelected){
_ad7=this.getBestTab(_ad6);
this._selectedTabBinding=null;
}
var _ad8=this.getTabPanelBinding(_ad6);
this.unRegisterTabBoxPair(_ad6.bindingElement);
_ad6.dispose();
_ad8.dispose();
if(_ad7!=null){
this.select(_ad7,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ad9){
if(_ad9.isSelected){
this.selectBestTab(_ad9);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ada){
var _adb=this.getBestTab(_ada);
if(_adb){
this.select(_adb);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_adc){
var _add=null;
var _ade=_adc.getOrdinalPosition(true);
var _adf=this.getTabBindings();
var _ae0=_adf.getLength();
var _ae1=_ae0-1;
if(_ae0==1){
_add=null;
}else{
if(_ade==_ae1){
_add=_adf.get(_ade-1);
}else{
_add=_adf.get(_ade+1);
}
}
return _add;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ae2,_ae3){
var _ae4=this.bindingDocument.getElementById(_ae2.bindingElement.id);
var tab=this.getTabElements().get(_ae3);
this._tabsElement.insertBefore(_ae4,tab);
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
var _ae6=this._nodename_tab;
var _ae7=new List(this._tabsElement.childNodes);
var _ae8=new List();
while(_ae7.hasNext()){
var _ae9=_ae7.getNext();
if(_ae9.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ae9)==_ae6){
_ae8.add(_ae9);
}
}
return _ae8;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _aea=this._nodename_tabpanel;
var _aeb=new List(this._tabPanelsElement.childNodes);
var _aec=new List();
_aeb.each(function(_aed){
if(_aed.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aed)==_aea){
_aec.add(_aed);
}
});
return _aec;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _aee=new List();
var _aef=this.getTabElements();
_aef.each(function(_af0){
_aee.add(UserInterface.getBinding(_af0));
});
return _aee;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _af1=new List();
this.getTabPanelElements().each(function(_af2){
_af1.add(UserInterface.getBinding(_af2));
});
return _af1;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _af3=null;
if(this._selectedTabBinding){
_af3=this.getTabPanelBinding(this._selectedTabBinding);
}
return _af3;
};
TabBoxBinding.prototype._showWarning=function(_af4,_af5){
var _af6=this.getTabBinding(_af4);
if(_af5){
if(_af6.labelBinding.hasImage){
_af6._backupImage=_af6.getImage();
}
_af6.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_af6._backupImage){
_af6.setImage(_af6._backupImage);
}else{
_af6.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_af7,_af8){
var _af9=this.getTabBinding(_af7);
if((_af8&&!_af9.isSelected)||!_af8){
if(_af9.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_af8){
if(_af9.labelBinding.hasImage){
_af9._backupImage=_af9.getImage();
}
_af9.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_af9._backupImage!=null){
_af9.setImage(_af9._backupImage);
}else{
_af9.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_afa){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _afd=tab.getOrdinalPosition(true);
var next=null;
var _aff=new List();
tabs.each(function(t){
if(t.isVisible){
_aff.add(t);
}
});
if(_aff.getLength()>1){
if(_afd==0&&!_afa){
next=_aff.getLast();
}else{
if(_afd==_aff.getLength()-1&&_afa){
next=_aff.getFirst();
}else{
if(_afa){
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
var _b02=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_b02.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b03){
TabsBinding.superclass.handleAction.call(this,_b03);
switch(_b03.type){
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
var _b06=self.bindingElement.offsetWidth;
if(_b06!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b06;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b07){
if(_b07 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b07);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b08=false;
var _b09,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b0c=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b0d=this.bindingElement.offsetWidth-_b0c.RESERVED_SPACE;
var _b0e=null;
var sum=0,_b10=0;
var _b11=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b11){
tab=tabs.getNext();
_b09=UserInterface.getBinding(tab);
if(!_b0e){
_b0e=_b09;
}
sum+=tab.offsetWidth;
if(sum>=_b0d){
_b08=true;
if(_b09.isSelected){
if(!DOMUtil.isFirstElement(_b09.bindingElement,true)){
this.isManaging=false;
if(_b0e){
_b0e.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b09,_b10-1);
_b11=false;
}
}else{
_b09.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b09);
}
}else{
_b09.show();
_b0e=_b09;
_b10++;
}
}
if(_b11){
if(_b08&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b12=_b0e.getBindingElement();
var _b13=_b12.offsetLeft+_b12.offsetWidth;
var _b14=this.tabsButtonBinding;
setTimeout(function(){
_b14.show(_b13+4);
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
var _b15=TabBinding.superclass.serialize.call(this);
if(_b15){
_b15.label=this.getLabel();
_b15.image=this.getImage();
_b15.tooltip=this.getToolTip();
}
return _b15;
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
var _b16=this.bindingElement.getAttribute("image");
var _b17=this.bindingElement.getAttribute("label");
var _b18=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b17){
this.setLabel(_b17);
}
if(_b16){
this.setImage(_b16);
}
if(_b18){
this.setToolTip(_b18);
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
TabBinding.prototype.setLabel=function(_b1a){
if(_b1a!=null){
this.setProperty("label",_b1a);
if(this.isAttached){
this.labelBinding.setLabel(_b1a);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b1b){
if(_b1b){
this.setProperty("tooltip",_b1b);
if(this.isAttached){
this.labelBinding.setToolTip(_b1b);
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
var _b1d=false;
if(Client.isMozilla==true){
}
if(!_b1d){
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
TabBinding.prototype.select=function(_b1e){
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
TabBinding.newInstance=function(_b1f){
var _b20=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b1f);
return UserInterface.registerBinding(_b20,TabBinding);
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
var _b21=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b21=true;
this._lastKnownDimension=dim1;
}
return _b21;
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
TabPanelBinding.prototype.select=function(_b24){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b24!=true){
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
TabPanelBinding.prototype.handleAction=function(_b25){
TabPanelBinding.superclass.handleAction.call(this,_b25);
var _b26=_b25.target;
switch(_b25.type){
case BalloonBinding.ACTION_INITIALIZE:
_b25.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b27){
var _b28=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b27);
UserInterface.registerBinding(_b28,TabPanelBinding);
return UserInterface.getBinding(_b28);
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
var _b29=SplitBoxBinding.superclass.serialize.call(this);
if(_b29){
_b29.orient=this.getOrient();
_b29.layout=this.getLayout();
}
return _b29;
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
var _b2a=this.getSplitPanelElements();
if(_b2a.hasEntries()){
var _b2b=new List(this.getLayout().split(":"));
if(_b2b.getLength()!=_b2a.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b2a.each(function(_b2c){
_b2c.setAttribute("ratio",_b2b.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b2d=this.getProperty("orient");
if(_b2d){
this._orient=_b2d;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b2e=this.getSplitterBindings();
while(_b2e.hasNext()){
var _b2f=_b2e.getNext();
if(_b2f&&_b2f.getProperty("collapsed")==true){
_b2f.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b30){
SplitBoxBinding.superclass.handleAction.call(this,_b30);
switch(_b30.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b30.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b30.target);
_b30.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b30.target);
_b30.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b31){
this._getSplitPanelBindingForSplitter(_b31).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b32){
this._getSplitPanelBindingForSplitter(_b32).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b33){
var _b34=DOMUtil.getOrdinalPosition(_b33.bindingElement,true);
var _b35,_b36=this.getSplitPanelElements();
switch(_b33.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b35=_b36.get(_b34);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b35=_b36.get(_b34+1);
break;
}
return UserInterface.getBinding(_b35);
};
SplitBoxBinding.prototype.invokeLayout=function(_b37){
var _b38=this.isHorizontalOrient();
var _b39=this.getSplitPanelBindings();
var _b3a=this.getSplitterBindings();
var _b3b=new List();
var _b3c,sum=0;
var _b3e=0;
_b39.each(function(_b3f){
if(_b3f.isFixed==true){
if(!_b39.hasNext()){
_b3e+=_b3f.getFix();
}
_b3b.add(0);
sum+=0;
}else{
_b3c=_b3f.getRatio();
_b3b.add(_b3c);
sum+=_b3c;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b3b.getLength()!=_b39.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b40=_b38?this.getInnerWidth():this.getInnerHeight();
_b40-=_b3e;
_b3a.each(function(_b41){
if(_b41.isVisible){
_b40-=SplitterBinding.DIMENSION;
}
});
var unit=_b40/sum;
var _b43=0;
var self=this;
_b39.each(function(_b45){
var span=0;
var _b47=_b3b.getNext();
if(_b45.isFixed){
span=_b45.getFix();
}else{
span=Math.floor(unit*_b47);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b43+=span;
while(_b43>_b40){
_b43--;
span--;
}
if(!_b45.isFixed){
if(_b38){
_b45.setWidth(span);
}else{
_b45.setHeight(span);
}
}
});
}
if(_b37!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b48=this.getLayout();
if(_b48){
this.setProperty("layout",_b48);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b49=this.isHorizontalOrient();
var _b4a=this.getSplitPanelBindings();
var _b4b=this.getSplitterBindings();
var _b4c=null;
var _b4d=null;
var unit=null;
var _b4f=null;
var span=null;
_b4a.each(function(_b51){
if(!unit){
unit=_b49?_b51.getWidth():_b51.getHeight();
}
span=_b49?_b51.getWidth():_b51.getHeight();
if(_b4f){
span-=_b4f;
_b4f=null;
}
_b4c=_b4b.getNext();
if(_b4c&&_b4c.offset){
_b4f=_b4c.offset;
span+=_b4f;
}
_b51.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b52){
this.logger.debug(_b52);
this.setProperty("layout",_b52);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b53="",_b54=this.getSplitPanelBindings();
_b54.each(function(_b55){
_b53+=_b55.getRatio().toString();
_b53+=_b54.hasNext()?":":"";
});
this.setProperty("layout",_b53);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b56=this.getSplitPanelElements();
_b56.each(function(_b57){
layout+="1"+(_b56.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b58){
this.bindingElement.style.width=_b58+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b59){
this.bindingElement.style.height=_b59+"px";
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
SplitBoxBinding.prototype.fit=function(_b5a){
if(!this.isFit||_b5a){
if(this.isHorizontalOrient()){
var max=0;
var _b5c=this.getSplitPanelBindings();
_b5c.each(function(_b5d){
var _b5e=_b5d.bindingElement.offsetHeight;
max=_b5e>max?_b5e:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b5f){
var _b60=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b5f);
return UserInterface.registerBinding(_b60,SplitBoxBinding);
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
var _b63=this.getProperty("hidden");
if(_b63){
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
var _b64=this.getProperty("ratiocache");
if(_b64){
this.setRatio(_b64);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b65){
if(!this.isFixed){
if(_b65!=this.getWidth()){
if(_b65<0){
_b65=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b65+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b65);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b66=null;
if(this.isFixed){
_b66=this.getFix();
}else{
_b66=this.bindingElement.offsetWidth;
}
return _b66;
};
SplitPanelBinding.prototype.setHeight=function(_b67){
if(!this.isFixed){
if(_b67!=this.getHeight()){
try{
this.bindingElement.style.height=_b67+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b68=null;
if(this.isFixed){
_b68=this.getFix();
}else{
_b68=this.bindingElement.offsetHeight;
}
return _b68;
};
SplitPanelBinding.prototype.setRatio=function(_b69){
this.setProperty("ratio",_b69);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b6a){
if(_b6a){
this._fixedSpan=_b6a;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b6a);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b6a);
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
SplitPanelBinding.newInstance=function(_b6b){
var _b6c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b6b);
return UserInterface.registerBinding(_b6c,SplitPanelBinding);
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
var _b6d=SplitBoxBinding.superclass.serialize.call(this);
if(_b6d){
_b6d.collapse=this.getProperty("collapse");
_b6d.collapsed=this.getProperty("collapsed");
_b6d.disabled=this.getProperty("isdisabled");
}
return _b6d;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b6e=this.getProperty("hidden");
if(_b6e){
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
SplitterBinding.prototype.setCollapseDirection=function(_b70){
this.setProperty("collapse",_b70);
this._collapseDirection=_b70;
};
SplitterBinding.prototype.handleAction=function(_b71){
SplitterBinding.superclass.handleAction.call(this,_b71);
switch(_b71.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b71.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b73=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b73.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b73.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b74){
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
SplitterBinding.newInstance=function(_b7f){
var _b80=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b7f);
return UserInterface.registerBinding(_b80,SplitterBinding);
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
var _b81=this.getProperty("selectedindex");
var _b82=this.getDeckElements();
if(_b82.hasEntries()){
var _b83=false;
var _b84=0;
while(_b82.hasNext()){
var deck=_b82.getNext();
if(_b81&&_b84==_b81){
deck.setAttribute("selected","true");
_b83=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b83=true;
}
}
_b84++;
}
if(!_b83){
_b82.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b87=this.getBindingForArgument(arg);
if(_b87!=null){
if(_b87!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b87.select();
this._selectedDeckBinding=_b87;
var _b88=this.getProperty("selectedindex");
if(_b88!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b87.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b89=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b89=true;
this._lastKnownDimension=dim1;
}
return _b89;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b8c){
var _b8d=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b8c);
return UserInterface.registerBinding(_b8d,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b8e){
DeckBinding.superclass.handleAction.call(this,_b8e);
var _b8f=_b8e.target;
switch(_b8e.type){
case BalloonBinding.ACTION_INITIALIZE:
_b8e.consume();
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
DeckBinding.newInstance=function(_b91){
var _b92=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b91);
return UserInterface.registerBinding(_b92,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b93){
if(_b93 instanceof ToolBarBodyBinding){
if(_b93.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b93;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b93;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b93);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b94=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b94){
this.setImageSize(_b94);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b96=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b96.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b96.isDefaultContent=true;
this.add(_b96);
_b96.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b98=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b98);
}
if(_b98!=null&&_b98.hasClassName("max")){
this._maxToolBarGroup(_b98,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b9a){
var _b9b=this.boxObject.getDimension().w;
var _b9c=CSSComputer.getPadding(this.bindingElement);
_b9b-=(_b9c.left+_b9c.right);
if(_b9a!=null){
_b9b-=_b9a.boxObject.getDimension().w;
if(!Client.isWindows){
_b9b-=1;
}
if(Client.isExplorer){
_b9b-=15;
}
}
max.bindingElement.style.width=_b9b+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b9d){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b9d);
};
ToolBarBinding.prototype.addLeft=function(_b9e,_b9f){
var _ba0=null;
if(this._toolBarBodyLeft!=null){
_ba0=this._toolBarBodyLeft.add(_b9e,_b9f);
}else{
throw new Error("No left toolbarbody");
}
return _ba0;
};
ToolBarBinding.prototype.addLeftFirst=function(_ba1,_ba2){
var _ba3=null;
if(this._toolBarBodyLeft){
_ba3=this._toolBarBodyLeft.addFirst(_ba1,_ba2);
}else{
throw new Error("No left toolbarbody");
}
return _ba3;
};
ToolBarBinding.prototype.addRight=function(_ba4){
var _ba5=null;
if(this._toolBarBodyRight){
_ba5=this._toolBarBodyRight.add(_ba4);
}else{
throw new Error("No left toolbarbody");
}
return _ba5;
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
ToolBarBinding.newInstance=function(_ba8){
var _ba9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_ba8);
return UserInterface.registerBinding(_ba9,ToolBarBinding);
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
var _baa=this.getDescendantBindingsByLocalName("toolbargroup");
var _bab=new List();
var _bac=true;
_baa.each(function(_bad){
if(_bad.isVisible&&!_bad.isDefaultContent){
_bab.add(_bad);
}
});
while(_bab.hasNext()){
var _bae=_bab.getNext();
_bae.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_bac){
_bae.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_bac=false;
}
if(!_bab.hasNext()){
_bae.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bb1=list.getNext();
var _bb2=_bb1.getEqualSizeWidth();
if(_bb2>max){
max=_bb2;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bb1=list.getNext();
_bb1.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bb3,_bb4){
var _bb5=ToolBarBinding.superclass.add.call(this,_bb3);
if(!_bb4){
if(_bb3 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bb5;
};
ToolBarBodyBinding.prototype.addFirst=function(_bb6,_bb7){
var _bb8=ToolBarBinding.superclass.addFirst.call(this,_bb6);
if(!_bb7){
if(_bb6 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bb8;
};
ToolBarBodyBinding.newInstance=function(_bb9){
var _bba=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bb9);
return UserInterface.registerBinding(_bba,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bbb){
switch(_bbb){
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
var _bbc=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bbc)=="toolbarbody"){
UserInterface.getBinding(_bbc).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bbd=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bbd)=="toolbarbody"){
UserInterface.getBinding(_bbd).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bbe){
var _bbf=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bbe);
return UserInterface.registerBinding(_bbf,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bc0){
var _bc1=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bc0);
return UserInterface.registerBinding(_bc1,ToolBarButtonBinding);
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
var _bc2=this.getProperty("label");
var _bc3=this.getProperty("image");
if(_bc2){
this.setLabel(_bc2);
}
if(_bc3){
this.setImage(_bc3);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bc4,_bc5){
if(this.isAttached){
this._labelBinding.setLabel(_bc4,_bc5);
}
this.setProperty("label",_bc4);
};
ToolBarLabelBinding.prototype.setImage=function(_bc6,_bc7){
if(this.isAttached){
this._labelBinding.setImage(_bc6,_bc7);
}
this.setProperty("image",_bc6);
};
ToolBarLabelBinding.newInstance=function(_bc8){
var _bc9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bc8);
return UserInterface.registerBinding(_bc9,ToolBarLabelBinding);
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
var _bca=this.getDescendantBindingsByLocalName("clickbutton");
if(_bca.hasEntries()){
while(_bca.hasNext()){
var _bcb=_bca.getNext();
if(_bcb.isDefault){
this._defaultButton=_bcb;
_bcb.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bcb.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bca;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bcc,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bcc,arg);
switch(_bcc){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bce=this.getAncestorBindingByType(DialogBinding,true);
if(_bce!=null&&_bce.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bcf){
DialogToolBarBinding.superclass.handleAction.call(this,_bcf);
var _bd0=_bcf.target;
var _bd1=false;
var _bd2=this._buttons.reset();
if(_bd0 instanceof ClickButtonBinding){
switch(_bcf.type){
case Binding.ACTION_FOCUSED:
_bd0.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bd0;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bd0.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bd1&&_bd2.hasNext()){
var _bd3=_bd2.getNext();
_bd1=_bd3.isFocused;
}
if(!_bd1){
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
ComboBoxBinding.newInstance=function(_bd5){
var _bd6=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bd5);
return UserInterface.registerBinding(_bd6,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bd7,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bd7,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bdb=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bdb.each(function(_bdc){
var _bdd=_bdc.getProperty("oncommand");
_bdc.setProperty("hiddencommand",_bdd);
_bdc.deleteProperty("oncommand");
_bdc.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bde=null;
var _bdf=this.getActiveMenuItemId();
_bdb.reset();
while(_bdb.hasNext()){
var _be0=_bdb.getNext();
if(_be0.getProperty("id")==_bdf){
_bde=_be0;
break;
}
}
if(_bde==null&&_bdb.hasEntries()){
_bde=_bdb.getFirst();
}
if(_bde!=null){
this.setButton(_bde);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_be1){
if(_be1 instanceof MenuItemBinding){
var _be2=_be1.getProperty("label");
var _be3=_be1.getProperty("image");
var _be4=_be1.getProperty("image-hover");
var _be5=_be1.getProperty("image-active");
var _be6=_be1.getProperty("image-disabled");
var _be7=_be1.getProperty("hiddencommand");
this.setLabel(_be2?_be2:"");
this.image=_be3;
this.imageHover=_be3;
this.imageActive=_be5;
this.imageDisabled=_be6;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_be7,this);
};
this.hideActiveItem(_be1);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_be8){
if(_be8 instanceof MenuItemBinding){
this.setButton(_be8);
this.setActiveMenuItemId(_be8.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_be9){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bea){
if(_bea==_be9){
Binding.prototype.hide.call(_bea);
}else{
Binding.prototype.show.call(_bea);
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
var _bec=this._views;
for(var _bed in ViewDefinitions){
var def=ViewDefinitions[_bed];
var key=def.perspective;
if(key!=null){
if(!_bec.has(key)){
_bec.set(key,new List());
}
var list=_bec.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bf1,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bf1,arg);
switch(_bf1){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bf4=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bf4.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bf4.add(StageViewMenuItemBinding.newInstance(_bf4.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bf4.show();
}else{
_bf4.hide();
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
TreeBinding.grid=function(_bf8){
var _bf9=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bf8);
var _bfb=_bf8%_bf9;
if(_bfb>0){
_bf8=_bf8-_bfb+_bf9;
}
return _bf8+TreeBodyBinding.PADDING_TOP;
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
var _bfc=this.getProperty("focusable");
if(_bfc!=null){
this._isFocusable=_bfc;
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
var _bfe=this.getProperty("builder");
if(_bfe){
this._buildFromTextArea(_bfe);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bff=this.getProperty("selectable");
var _c00=this.getProperty("selectionproperty");
var _c01=this.getProperty("selectionvalue");
if(_bff){
this.setSelectable(true);
if(_c00){
this.setSelectionProperty(_c00);
}
if(_c01){
this.setSelectionValue(_c01);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c04=UserInterface.getBinding(area);
var _c05=this._treeBodyBinding;
function build(){
_c05.subTreeFromString(area.value);
}
_c04.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c06){
var _c07=_c06.getHandle();
if(this._treeNodeBindings.has(_c07)){
throw "Duplicate treenodehandles registered: "+_c06.getLabel();
}else{
this._treeNodeBindings.set(_c07,_c06);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c07)){
_c06.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c09){
this._treeNodeBindings.del(_c09.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c0a){
var _c0b=null;
if(this._treeNodeBindings.has(_c0a)){
_c0b=this._treeNodeBindings.get(_c0a);
}else{
throw "No such treenode: "+_c0a;
}
return _c0b;
};
TreeBinding.prototype.handleAction=function(_c0c){
TreeBinding.superclass.handleAction.call(this,_c0c);
var _c0d=_c0c.target;
switch(_c0c.type){
case TreeNodeBinding.ACTION_OPEN:
_c0c.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c0d);
_c0c.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c0d;
this.focusSingleTreeNodeBinding(_c0d);
if(!this.isFocused){
this.focus();
}
_c0c.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c0d;
this.focusSingleTreeNodeBinding(_c0d);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c0d;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c0d;
this.focusSingleTreeNodeBinding(_c0d);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c0c.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c0d.isFocused){
this.blurSelectedTreeNodes();
}
_c0c.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c0e,_c0f){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c10){
if(_c10!=null&&!_c10.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c10);
_c10.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c11){
this.blurSelectedTreeNodes();
while(_c11.hasNext()){
var _c12=_c11.getNext();
this._focusedTreeNodeBindings.add(_c12);
_c12.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c13=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c14=false;
var _c15=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c16=this._focusedTreeNodeBindings.getNext();
var _c17=_c16.getProperty(this._selectionProperty);
if(_c17!=null){
if(!this._selectionValue||this._selectionValue[_c17]){
_c15=(this._selectedTreeNodeBindings[_c16.key]=_c16);
var _c18=_c13[_c16.key];
if(!_c18||_c18!=_c15){
_c14=true;
}
}
}
}
if(_c15){
if(_c14){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c13){
for(var key in _c13){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c1a=new List();
for(var key in this._selectedTreeNodeBindings){
_c1a.add(this._selectedTreeNodeBindings[key]);
}
return _c1a;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c1c){
_c1c.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c1d){
var _c1e=_c1d.getDescendantBindingsByLocalName("treenode");
var _c1f=true;
var self=this;
_c1e.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c1f;
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
var _c22=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c22!=null){
this.focusSingleTreeNodeBinding(_c22);
_c22.callback();
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
TreeBinding.prototype.add=function(_c23){
var _c24=null;
if(this._treeBodyBinding){
_c24=this._treeBodyBinding.add(_c23);
}else{
this._treeNodeBuffer.add(_c23);
_c24=_c23;
}
return _c24;
};
TreeBinding.prototype.addFirst=function(_c25){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c26=this._treeBodyBinding.bindingElement;
_c26.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c27,_c28){
if(_c28.isContainer&&_c28.isOpen){
_c28.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c29){
this._isSelectable=_c29;
if(_c29){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c2a){
this._selectionProperty=_c2a;
};
TreeBinding.prototype.setSelectionValue=function(_c2b){
if(_c2b){
var list=new List(_c2b.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c2d,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c2d,arg);
switch(_c2d){
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
var _c2f=this.getFocusedTreeNodeBindings();
if(_c2f.hasEntries()){
var node=_c2f.getFirst();
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
var _c32=this.getFocusedTreeNodeBindings();
if(_c32.hasEntries()){
var node=_c32.getFirst();
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
var _c35=null;
while(next==null&&(_c35=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c35!=null){
next=_c35.getNextBindingByLocalName("treenode");
}
node=_c35;
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
var _c37=DOMEvents.getTarget(e);
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
var _c38=new TreeCrawler();
var list=new List();
_c38.mode=TreeCrawler.MODE_GETOPEN;
_c38.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c3b=list.getNext();
map.set(_c3b.getHandle(),true);
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
var _c40=this._positionIndicatorBinding;
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
if(y!=_c40.getPosition().y){
_c40.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c40.isVisible){
_c40.show();
}
}else{
if(_c40.isVisible){
_c40.hide();
}
}
}else{
if(_c40.isVisible){
_c40.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c43){
this._acceptingTreeNodeBinding=_c43;
this._acceptingPosition=_c43.boxObject.getLocalPosition();
this._acceptingDimension=_c43.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c43);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c44){
var map={};
var _c46=_c44.getChildBindingsByLocalName("treenode");
var _c47,pos,dim,y;
y=TreeBinding.grid(_c44.boxObject.getLocalPosition().y);
map[y]=true;
while(_c46.hasNext()){
_c47=_c46.getNext();
pos=_c47.boxObject.getLocalPosition();
dim=_c47.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c4d in this._acceptingPositions){
if(_c4d==y){
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
TreeBinding.newInstance=function(_c4e){
var _c4f=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c4e);
var _c50=UserInterface.registerBinding(_c4f,TreeBinding);
_c50.treeBodyBinding=TreeBodyBinding.newInstance(_c4e);
return _c50;
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
TreeBodyBinding.prototype.accept=function(_c51){
if(_c51 instanceof TreeNodeBinding){
this.logger.debug(_c51);
}
};
TreeBodyBinding.prototype.handleAction=function(_c52){
TreeBodyBinding.superclass.handleAction.call(this,_c52);
switch(_c52.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c52.target);
_c52.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c53){
var _c54=_c53.labelBinding.bindingElement;
var a=this.bindingElement.clientHeight;
var y=_c54.offsetTop;
var h=_c54.offsetHeight;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
if(y-t<0){
_c54.scrollIntoView(true);
}else{
if(y-t+h>a){
_c54.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c5a){
var _c5b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c5a);
return UserInterface.registerBinding(_c5b,TreeBodyBinding);
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
var _c5c=TreeNodeBinding.superclass.serialize.call(this);
if(_c5c){
_c5c.label=this.getLabel();
_c5c.image=this.getImage();
var _c5d=this.getHandle();
if(_c5d&&_c5d!=this.key){
_c5c.handle=_c5d;
}
if(this.isOpen){
_c5c.open=true;
}
if(this.isDisabled){
_c5c.disabled=true;
}
if(this.dragType){
_c5c.dragtype=this.dragType;
}
if(this.dragAccept){
_c5c.dragaccept=this.dragAccept;
}
}
return _c5c;
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
var _c5f=UserInterface.getBinding(node);
if(_c5f&&_c5f.containingTreeBinding){
this.containingTreeBinding=_c5f.containingTreeBinding;
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
var _c60=this.key;
var _c61=this.getProperty("handle");
if(_c61){
_c60=_c61;
}
return _c60;
};
TreeNodeBinding.prototype.setHandle=function(_c62){
this.setProperty("handle",_c62);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c64=this.getProperty("label");
var _c65=this.getProperty("tooltip");
var _c66=this.getProperty("oncommand");
var _c67=this.getProperty("onbindingfocus");
var _c68=this.getProperty("onbindingblur");
var _c69=this.getProperty("focused");
var _c6a=this.getProperty("callbackid");
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
if(_c64!=null){
this.setLabel(_c64);
}
if(_c65!=null){
this.setToolTip(_c65);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c6c=this.bindingWindow.WindowManager;
if(_c66!=null){
this.oncommand=function(){
Binding.evaluate(_c66,this);
};
}
if(_c67!=null){
this.onfocus=function(){
Binding.evaluate(_c67,this);
};
}
if(_c68!=null){
this.onblur=function(){
Binding.evaluate(_c68,this);
};
}
if(_c69==true){
this.focus();
}
if(_c6a!=null){
Binding.dotnetify(this,_c6a);
}
};
TreeNodeBinding.prototype.handleAction=function(_c6d){
TreeNodeBinding.superclass.handleAction.call(this,_c6d);
switch(_c6d.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c6d.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c6e,_c6f){
var _c70=true;
if(_c6e instanceof TreeNodeBinding){
var _c71=false;
var _c72=this.bindingElement;
var _c73=this.containingTreeBinding.bindingElement;
while(!_c71&&_c72!=_c73){
if(_c72==_c6e.getBindingElement()){
_c71=true;
}else{
_c72=_c72.parentNode;
}
}
if(_c71){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c70=false;
}else{
this.acceptTreeNodeBinding(_c6e,_c6f);
}
}else{
_c70=false;
}
return _c70;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c74,_c75){
var _c76=_c74.serializeToString();
var _c77=new BindingParser(this.bindingDocument);
var _c78=_c77.parseFromString(_c76).getFirst();
_c75=_c75?_c75:this.containingTreeBinding.getDropIndex();
var _c79=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c78,_c79.get(_c75));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c74.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c7a=this.getProperty("image");
var _c7b=this.getProperty("image-active");
var _c7c=this.getProperty("image-disabled");
_c7b=_c7b?_c7b:this.isContainer?_c7a?_c7a:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c7a?_c7a:TreeNodeBinding.DEFAULT_ITEM;
_c7c=_c7c?_c7c:this.isContainer?_c7a?_c7a:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c7a?_c7a:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c7a=_c7a?_c7a:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c7a,imageHover:null,imageActive:_c7b,imageDisabled:_c7c});
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
TreeNodeBinding.prototype.setLabel=function(_c7e){
this.setProperty("label",String(_c7e));
if(this.isAttached){
this.labelBinding.setLabel(String(_c7e));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c7f){
this.setProperty("tooltip",String(_c7f));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c7f));
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
var _c80=this.imageProfile.getDefaultImage();
var _c81=this.imageProfile.getActiveImage();
_c81=_c81?_c81:_c80;
return this.isOpen?_c81:_c80;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c83=DOMEvents.getTarget(e);
var _c84=this.labelBinding.bindingElement;
var _c85=this.labelBinding.shadowTree.labelBody;
var _c86=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c83){
case _c84:
this._onAction(e);
break;
case _c85:
case _c86:
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
if(_c83.parentNode==this.bindingElement&&_c83.__updateType==Update.TYPE_INSERT){
var _c84=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c83)=="treenode"){
if(_c83==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c83,_c84.nextSibling);
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
switch(_c83){
case _c84:
case _c85:
case _c86:
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
var _c8a=true;
if(e.type=="mousedown"){
var _c8b=e.button==(e.target?0:1);
if(!_c8b){
_c8a=false;
}
}
if(_c8a){
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
var _c8d=false;
if(e!=null){
_c8d=e.shiftKey;
}
this.dispatchAction(_c8d?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c90=this.getDescendantBindingsByLocalName("treenode");
_c90.each(function(_c91){
_c91.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c92){
var _c93=_c92.getAttribute("focused");
if(_c93=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c94){
var _c95=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c94);
return UserInterface.registerBinding(_c95,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c96){
var _c97=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c96);
return UserInterface.registerBinding(_c97,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c98){
this.bindingElement.style.left=_c98.x+"px";
this.bindingElement.style.top=_c98.y+"px";
this._geometry.x=_c98.x;
this._geometry.y=_c98.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c99){
var _c9a=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c99);
return UserInterface.registerBinding(_c9a,TreePositionIndicatorBinding);
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
this.addFilter(function(_c9c){
var _c9d=UserInterface.getBinding(_c9c);
var _c9e=null;
var _c9e=null;
if(!_c9d instanceof TreeNodeBinding){
_c9e=NodeCrawler.SKIP_NODE;
}
return _c9e;
});
this.addFilter(function(_c9f,list){
var _ca1=UserInterface.getBinding(_c9f);
var _ca2=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_ca1.isOpen){
list.add(_ca1);
}
break;
}
return _ca2;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_ca3){
this.binding=_ca3;
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
DockTabsButtonBinding.newInstance=function(_ca4){
var _ca5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ca4);
_ca5.setAttribute("type","checkbox");
_ca5.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_ca5.className="tabbutton";
return UserInterface.registerBinding(_ca5,DockTabsButtonBinding);
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
var _ca6=DockBinding.superclass.serialize.call(this);
if(_ca6){
_ca6.active=this.isActive?true:null;
_ca6.collapsed=this.isCollapsed?true:null;
}
return _ca6;
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
var _ca7=UserInterface.getBinding(this.bindingElement.parentNode);
var _ca8=MatrixBinding.newInstance(this.bindingDocument);
_ca8.attachClassName("dockliner");
this.shadowTree.dockLiner=_ca8;
_ca7.add(_ca8);
_ca8.attach();
_ca8.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_caa){
var _cab=this.getSelectedTabPanelBinding();
if(_cab){
_cab.isVisible=_caa;
_cab.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_cac){
var _cad=this._getBindingForDefinition(_cac);
var _cae=DockTabBinding.newInstance(this.bindingDocument);
_cae.setHandle(_cac.handle);
_cae.setLabel(_cac.flowHandle?null:_cac.label);
_cae.setImage(_cac.image);
_cae.setToolTip(_cac.toolTip);
_cae.setEntityToken(_cac.entityToken);
_cae.setAssociatedView(_cad);
this.appendTabByBindings(_cae,null);
this._setupPageBindingListeners(_cae);
var _caf=this.getTabPanelBinding(_cae);
_cad.snapToBinding(_caf);
var _cb0=this.bindingWindow.bindingMap.views;
_cb0.add(_cad);
if(!this.isActive){
this.activate();
}
_cad.attach();
};
DockBinding.prototype.prepareOpenView=function(_cb1,_cb2){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cb2.setLabel(_cb1.label);
_cb2.setImage(_cb1.image);
_cb2.setToolTip(_cb1.toolTip);
this._setupPageBindingListeners(_cb2);
var _cb3=this.getTabPanelBinding(_cb2);
var _cb4=this._getBindingForDefinition(_cb1);
_cb2.setAssociatedView(_cb4);
_cb4.snapToBinding(_cb3);
UserInterface.getBinding(this.bindingDocument.body).add(_cb4);
_cb4.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cb5){
var _cb6=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cb6.bindingDocument);
view.setDefinition(_cb5);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cb8){
var _cb9=this.getTabPanelBinding(_cb8);
var self=this;
var _cbb={handleAction:function(_cbc){
var _cbd=_cbc.target;
switch(_cbc.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cbd.reflex(true);
var view=_cb8.getAssociatedView();
if(_cbd.bindingWindow==view.getContentWindow()){
_cb8.updateDisplay(_cbd);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cb8.onPageInitialize(_cbd);
_cbc.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cb8.getAssociatedView();
if(_cbd.bindingWindow==view.getContentWindow()){
_cb8.updateDisplay(_cbd);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cb8.updateDisplay(_cbd);
_cbc.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cb8.updateEntityToken(_cbd);
_cbc.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cb8.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cb8.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cb8);
_cbc.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cb8,true);
_cbc.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cb8);
break;
case Binding.ACTION_FORCE_REFLEX:
_cb9.reflex(true);
_cbc.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cb8.isDirty){
_cb8.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cbf){
_cb9.addActionListener(_cbf,_cbb);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cc0){
DockBinding.superclass.handleAction.call(this,_cc0);
var _cc1=_cc0.target;
switch(_cc0.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cc0.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cc1 instanceof DockBinding){
if(_cc1.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cc1);
if(this.isActive){
_cc1.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cc1);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cc2,arg){
DockBinding.superclass.handleBroadcast.call(this,_cc2,arg);
switch(_cc2){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cc4=arg;
if(_cc4.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cc4.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cc5){
var tabs=this.getTabBindings();
var _cc7=false;
while(tabs.hasNext()&&!_cc7){
var tab=tabs.getNext();
var _cc9=tab.getEntityToken();
if(_cc9!=null&&_cc9==_cc5){
if(!tab.isSelected){
this.select(tab,true);
_cc7=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cca){
this._handleCollapse(true,_cca);
};
DockBinding.prototype.unCollapse=function(_ccb){
this._handleCollapse(false,_ccb);
};
DockBinding.prototype._handleCollapse=function(_ccc,_ccd){
var _cce=this.getChildBindingByLocalName("dockpanels");
var _ccf=this.getAncestorBindingByLocalName("splitbox");
if(_ccc){
_cce.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_ccd&&_ccf.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cce.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_ccd){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_ccc);
this.isCollapsed=_ccc;
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
DockBinding.prototype.closeTab=function(_cd4,_cd5){
if(_cd4.isDirty&&!_cd5){
var _cd6=Resolver.resolve(_cd4.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cd6),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cd8){
switch(_cd8){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cd4);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cd4);
break;
}
}});
}else{
this.removeTab(_cd4);
}
};
DockBinding.prototype.closeTabsExcept=function(_cd9){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cd9){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cdc){
var _cdd=_cdc.getAssociatedView();
_cdd.saveContainedEditor();
var self=this;
var _cdf={handleBroadcast:function(_ce0,arg){
switch(_ce0){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cdd.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cdf);
if(arg.isSuccess){
self.removeTab(_cdc);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cdf);
};
DockBinding.prototype.appendTabByBindings=function(_ce2,_ce3){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_ce2,_ce3);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_ce4){
_ce4=_ce4?_ce4+"px":"100%";
this.bindingElement.style.width=_ce4;
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
DockBinding.prototype.showControls=function(_ce5){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_ce5){
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
var _ce8=DockControlBinding.newInstance(this.bindingDocument);
_ce8.setControlType(type);
return _ce8;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cea=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cea)){
_cea=_cea>0?_cea-1:0;
self.bindingElement.style.width=new String(_cea)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ceb){
DockTabsBinding.superclass.handleCrawler.call(this,_ceb);
switch(_ceb.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ced=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ced)){
_ced=_ced>0?_ced-1:0;
self.bindingElement.style.width=new String(_ced)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cee){
var _cef=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cee);
return UserInterface.registerBinding(_cef,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cf0){
this._viewBinding=_cf0;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cf1=DockTabBinding.superclass.serialize.call(this);
if(_cf1){
_cf1.label=null;
_cf1.image=null;
_cf1.handle=this.getHandle();
}
return _cf1;
};
DockTabBinding.prototype.setHandle=function(_cf2){
this.setProperty("handle",_cf2);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cf3){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cf3;
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
var _cf4=DialogControlBinding.newInstance(this.bindingDocument);
_cf4.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cf4);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cf5){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cf5){
this.isDirty=_cf5;
if(Binding.exists(this.labelBinding)){
var _cf6=this.labelBinding.getLabel();
if(_cf6!=null){
this.labelBinding.setLabel(_cf5?"*"+_cf6:_cf6.slice(1,_cf6.length));
}else{
this.labelBinding.setLabel(_cf5?"*":"");
}
}
}
var _cf7=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cf7.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cf7.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cf8){
this.setLabel(_cf8.getLabel());
this.setImage(_cf8.getImage());
this.setToolTip(_cf8.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cf9){
this.setEntityToken(_cf9.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cfa){
DockTabBinding.superclass.handleAction.call(this,_cfa);
var _cfb=_cfa.target;
switch(_cfa.type){
case ControlBinding.ACTION_COMMAND:
if(_cfb.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cfa.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cfb);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cfc){
var cmd=_cfc.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cfe){
if(!_cfe){
if(!this.getLabel()){
_cfe=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cfe=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_cfe=this.isDirty?"*"+_cfe:_cfe;
DockTabBinding.superclass.setLabel.call(this,_cfe);
};
DockTabBinding.prototype.setImage=function(_cff){
if(!_cff){
if(!this.getImage()){
_cff=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cff=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cff);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _d02=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_d02;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_d02;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_d02;
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
var _d04=this.bindingElement;
setTimeout(function(){
_d04.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d05,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d05,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d05){
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
DockTabBinding.prototype.select=function(_d0a){
DockTabBinding.superclass.select.call(this,_d0a);
this._updateBroadcasters();
if(_d0a!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _d0b=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d0c=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d0c.enable();
if(this.isDirty){
_d0b.enable();
}else{
_d0b.disable();
}
}else{
_d0c.disable();
_d0b.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d0d){
if(this._canUpdateTree||_d0d){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d0e=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d10=win.bindingMap.savebutton;
if(_d10!=null){
_d0e=true;
}
}
}
return _d0e;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d11){
var _d12=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d11);
return UserInterface.registerBinding(_d12,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d13){
var _d14=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d13);
return UserInterface.registerBinding(_d14,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d15){
DockPanelBinding.superclass.select.call(this,_d15);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d16){
DockPanelBinding.superclass.handleCrawler.call(this,_d16);
if(_d16.response==null){
if(_d16.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d16.id==FocusCrawler.ID){
_d16.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d17){
var _d18=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d17);
return UserInterface.registerBinding(_d18,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d19){
var _d1a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d19);
return UserInterface.registerBinding(_d1a,DockControlBinding);
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
ViewBinding.getInstance=function(_d1b){
var _d1c=ViewBinding._instances.get(_d1b);
if(!_d1c){
var cry="ViewBinding.getInstance: No such instance: "+_d1b;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d1c;
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
var _d1f=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d1f){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d20=snap.boxObject.getGlobalPosition();
var _d21=snap.boxObject.getDimension();
if(!Point.isEqual(_d20,this._lastknownposition)){
this.setPosition(_d20);
this._lastknownposition=_d20;
}
if(!Dimension.isEqual(_d21,this._lastknowndimension)){
this.setDimension(_d21);
this._lastknowndimension=_d21;
var _d22=_d21.h-ViewBinding.VERTICAL_ADJUST;
_d22=_d22<0?0:_d22;
this.windowBinding.getBindingElement().style.height=new String(_d22)+"px";
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
var _d23=this._viewDefinition.flowHandle;
if(_d23!=null){
FlowControllerService.CancelFlow(_d23);
}
}
if(this._viewDefinition!=null){
var _d24=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d24);
this.logger.fine("ViewBinding closed: \""+_d24+"\"");
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
var _d26=null;
if(this._viewDefinition!=null){
_d26=this._viewDefinition.handle;
}
return _d26;
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
ViewBinding.prototype.setDefinition=function(_d27){
this._viewDefinition=_d27;
if(_d27.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d28){
ViewBinding.superclass.handleAction.call(this,_d28);
var _d29=_d28.target;
switch(_d28.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d28.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d29.isActivated){
_d29.onActivate();
}
}
_d28.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d29==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d28.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d29==this._snapBinding){
if(_d29.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d29.getContentWindow().isPostBackDocument){
if(_d28.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d29.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d29==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d29.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d28.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d28.type==WindowBinding.ACTION_ONLOAD){
var win=_d29.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d29);
}
}
}
_d28.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d29.label&&this._viewDefinition.label){
_d29.label=this._viewDefinition.label;
}
if(!_d29.image&&this._viewDefinition.image){
_d29.image=this._viewDefinition.image;
}
if(_d29.bindingWindow==this.getContentWindow()){
this._pageBinding=_d29;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d29.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d29==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d28.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d28.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d2e,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d2e,arg);
switch(_d2e){
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
var _d32=def.argument;
if(_d32!=null){
page.setPageArgument(_d32);
}
var _d33=def.width;
if(_d33!=null){
page.width=_d33;
}
var _d34=def.height;
if(_d34!=null){
page.height=_d34;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d35){
ViewBinding.superclass.handleCrawler.call(this,_d35);
switch(_d35.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d35.id==FocusCrawler.ID){
if(_d35.previousNode!=this._snapBinding.bindingElement){
_d35.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d35.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d36){
_d36.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d36.x+"px";
this.bindingElement.style.top=_d36.y+"px";
};
ViewBinding.prototype.setDimension=function(_d37){
_d37.h-=ViewBinding.VERTICAL_ADJUST;
_d37.w-=ViewBinding.HORIZONTAL_ADJUST;
_d37.w-=1;
if(_d37.h<0){
_d37.h=0;
}
if(_d37.w<0){
_d37.w=0;
}
this.bindingElement.style.width=String(_d37.w)+"px";
this.bindingElement.style.height=String(_d37.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d38){
this.isFlexBoxBehavior=false;
_d38.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d38.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d38.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d38;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d39=null;
if(this.isFreeFloating==true){
_d39=this._snapBinding.getBindingElement();
}else{
_d39=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d39;
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
ViewBinding.prototype.reload=function(_d3a){
this._isLoaded=false;
this.windowBinding.reload(_d3a);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d3b=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d3b=true;
}
}
if(!_d3b){
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
ViewBinding.newInstance=function(_d3f){
var _d40=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d3f);
var _d41=UserInterface.registerBinding(_d40,ViewBinding);
_d41.windowBinding=_d41.add(WindowBinding.newInstance(_d3f));
return _d41;
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
var _d49=this.bindingWindow.__doPostBack;
var _d4a=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d4a){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d4b,_d4c){
if(!form.__isSetup){
Application.lock(self);
_d4a=true;
}
self.manifestAllDataBindings();
_d49(_d4b,_d4c);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d4d,list){
var _d4f=this.bindingWindow.bindingMap.__REQUEST;
if(_d4f!=null&&this._isDotNet()){
switch(_d4d){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d4f.postback(_d4d);
}
}
break;
default:
_d4f.postback(_d4d);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d4d,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d50,list){
var _d52=this.getDescendantBindingsByType(WindowBinding);
_d52.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d50,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d56){
if(_d56.name==null||_d56.name==""){
return;
}
list.add({name:_d56.name,value:_d56.value});
});
var out="";
list.each(function(_d58){
out+=_d58.name+": "+_d58.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d59){
PageBinding.superclass.handleAction.call(this,_d59);
var _d5a=_d59.target;
switch(_d59.type){
case RootBinding.ACTION_PHASE_3:
if(_d5a==UserInterface.getBinding(this.bindingDocument.body)){
_d5a.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d5a);
}
_d59.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d5b=this.validateAllDataBindings();
if(_d5b){
this.doPostBack(_d5a);
}
}
_d59.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d59.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d5a.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d5a.key)){
this._initBlockers.del(_d5a.key);
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
var _d5d={handleAction:function(_d5e){
if(_d5e.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d5d);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d5d);
}else{
MessageQueue.udpdate();
}
_d59.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d5f,arg){
PageBinding.superclass.handleBroadcast.call(this,_d5f,arg);
switch(_d5f){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d61=arg;
if(!this._canPostBack&&!_d61){
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
PageBinding.prototype.doPostBack=function(_d63){
if(this._canPostBack){
if(_d63!=null&&this._isDotNet()){
var _d64=_d63.getCallBackID();
var _d65=_d63.getCallBackArg();
if(_d64!=null){
_d64=_d64.replace(/_/g,"$");
}else{
_d64="";
}
if(_d65==null){
_d65="";
}
this.bindingWindow.__doPostBack(_d64,_d65);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d66){
var _d67=true;
var _d68=this.bindingWindow.DataManager.getAllDataBindings();
while(_d68.hasNext()&&_d67){
var _d69=_d68.getNext();
if(_d69.isAttached){
var _d6a=_d69.validate();
if(_d67&&!_d6a){
_d67=false;
this.logger.debug("Invalid DataBinding: "+_d69.toString()+" ("+_d69.getName()+")");
if(_d66){
var _d6b=_d69.getAncestorBindingByType(TabPanelBinding);
if(_d6b!=null&&!_d6b.isVisible){
var _d6c=_d6b.getAncestorBindingByType(TabBoxBinding);
var _d6d=_d6c.getTabBinding(_d6b);
_d6c.select(_d6d);
}
}
break;
}
}
}
return _d67;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d6f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6f.hasNext()){
var _d70=_d6f.getNext();
if(_d70.isAttached){
var _d71=_d70.manifest();
if(_d71!=null){
list.add(_d71);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d72=this.bindingWindow.DataManager.getAllDataBindings();
while(_d72.hasNext()){
var _d73=_d72.getNext();
if(_d73.isAttached){
_d73.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d74="";
if(!_d74&&this.labelfield){
var _d75=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d75!=null&&_d75.getLabel){
_d74=_d75.getLabel();
}else{
if(_d75!=null&&_d75.getValue){
_d74=_d75.getValue();
}
}
}
if(!_d74&&this.label){
_d74=this.label;
}
return _d74;
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
var _d78=this._cachedFocus.getBinding();
if(_d78){
_d78.blur();
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
var _d79=this.getProperty("width");
if(!_d79){
_d79=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d79;
}
if(this.height==null){
var _d7a=this.getProperty("height");
this.height=_d7a?_d7a:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d7b=this.getProperty("minheight");
if(_d7b!=null){
this.minheight=_d7b;
}
}
if(this.controls==null){
var _d7c=this.getProperty("controls");
this.controls=_d7c?_d7c:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d7d=this.getProperty("resizable");
this.isResizable=_d7d?_d7d:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d7e){
if(_d7e!=this.isAutoHeightLayoutMode){
if(_d7e){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d7e;
}
};
DialogPageBinding.prototype.handleAction=function(_d7f){
DialogPageBinding.superclass.handleAction.call(this,_d7f);
var _d80=_d7f.target;
switch(_d7f.type){
case PageBinding.ACTION_ATTACHED:
if(_d80!=this&&_d80.isFitAsDialogSubPage){
_d80.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d7f.consume();
if(_d80.response!=null){
this.response=_d80.response;
switch(_d80.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d81){
var _d82=this.bindingWindow.bindingMap.buttonAccept;
if(_d82!=null){
_d82.setDisabled(_d81);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d83){
var _d84=CSSComputer.getPadding(this.bindingElement);
var _d85=CSSComputer.getBorder(this.bindingElement);
_d83+=_d84.top+_d84.bottom;
_d83+=_d85.top+_d85.bottom;
if(_d83>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d83+"px";
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
EditorPageBinding.prototype.handleAction=function(_d8d){
EditorPageBinding.superclass.handleAction.call(this,_d8d);
var _d8e=_d8d.target;
switch(_d8d.type){
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
var _d8f=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d8e.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d8f==-1){
_d8f=0;
}
}else{
_d8f++;
}
return res;
});
if(_d8f>-1){
this._messengers.del(_d8f);
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
_d8d.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d8e.key,_d8e);
if(_d8e instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d8e.key);
if(_d8e instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d8e==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d8e.getSelectedTabBinding();
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
_d8d.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d8e==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d8d.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d8e==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d8d.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d8e==this._windowBinding){
if(_d8e.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d94=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d94);
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
var _d95=this.bindingWindow.bindingMap.savebutton;
if(_d95!=null&&!_d95.isDisabled){
_d95.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d96=this.bindingWindow.bindingMap.__REQUEST;
if(_d96!=null){
_d96.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d97=this.bindingWindow.bindingMap.__REQUEST;
if(_d97!=null){
_d97.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d98){
this._message=null;
switch(_d98){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d98,this._messengers);
if(!this._messengers.hasEntries()){
if(_d98==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d98;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d98;
EditorPageBinding.superclass.postMessage.call(this,_d98,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d98,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d99,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d99,arg);
switch(_d99){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d9b=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d9b);
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
var _d9c=new List();
this._invalidBindings.each(function(key,_d9e){
var list=_d9e.getInvalidLabels();
if(list){
list.each(function(_da0){
_d9c.add(_da0);
});
}
});
if(_d9c.hasEntries()){
var _da1="";
while(_d9c.hasNext()){
_da1+=_d9c.getNext().toLowerCase();
if(_d9c.hasNext()){
_da1+=", ";
}else{
_da1+=".";
}
}
var _da2=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_da2+" "+_da1);
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
EditorPageBinding.prototype.enableSave=function(_da3){
var _da4=this.bindingDocument.getElementById("broadcasterCanSave");
if(_da4){
var _da5=UserInterface.getBinding(_da4);
if(_da3){
_da5.enable();
}else{
_da5.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _da6=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_da6!=null){
UserInterface.getBinding(_da6).enable();
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
var _da7=this._windowBinding.getContentDocument().title;
if(_da7==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _da8=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_daa){
if(_daa.name=="__EVENTTARGET"&&_da8){
_daa.value=_da8;
}
list.add({name:_daa.name,value:_daa.value});
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
var _dac=this.getProperty("responseid");
this.responseid=_dac;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_dad){
ResponsePageBinding.superclass.handleAction.call(this,_dad);
switch(_dad.type){
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
WizardPageBinding.prototype.handleAction=function(_dae){
WizardPageBinding.superclass.handleAction.call(this,_dae);
var _daf=_dae.target;
switch(_dae.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_daf);
}else{
_dae.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_daf);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_dae.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_dae.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_db0){
var next=this.bindingWindow.bindingMap.nextbutton;
var _db2=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_db0);
}
if(_db2){
_db2.setDisabled(!_db0);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_db3,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_db3,arg);
var self=this;
switch(_db3){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_db7){
};
MarkupAwarePageBinding.prototype._activate=function(_db8){
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
var _db9=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_db9.boxObject.getDimension().w;
_db9.hide();
var _dba=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dba+"px";
var self=this;
var _dbc=this.bindingWindow.bindingMap.moreactionsbutton;
_dbc.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dbd){
self._showMoreActions();
_dbd.consume();
}});
var _dbe=this.bindingWindow.bindingMap.moreactionspopup;
_dbe.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dbf){
var item=_dbf.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dc1,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dc1,arg);
switch(_dc1){
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
var _dc5=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dc5!=null){
_dc5.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dc6=this.bindingWindow.WindowManager;
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
var _dc7=new String("");
this._actionProfile.each(function(_dc8,list){
list.each(function(_dca){
_dc7+=_dca.getHandle()+";"+_dca.getKey()+";";
if(_dca.isDisabled()){
_dc7+="isDisabled='true';";
}
});
});
return _dc7;
};
SystemToolBarBinding.prototype.handleAction=function(_dcb){
SystemToolBarBinding.superclass.handleAction.call(this,_dcb);
switch(_dcb.type){
case ButtonBinding.ACTION_COMMAND:
var _dcc=_dcb.target;
this._handleSystemAction(_dcc.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dcd){
if(_dcd!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dcf=list.getFirst();
var _dd0=_dcf.node;
}
SystemAction.invoke(_dcd,_dd0);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dd3,list){
var _dd5=new List();
list.reset();
while(list.hasNext()){
var _dd6=list.getNext();
var _dd7=null;
if(_dd6.isInToolBar()){
if(_dd6.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dd7=self.getToolBarButtonBinding(_dd6);
}
}
if(_dd7!=null){
_dd5.add(_dd7);
}
}
if(_dd5.hasEntries()){
var _dd8=ToolBarGroupBinding.newInstance(doc);
_dd5.each(function(_dd9){
_dd8.add(_dd9);
});
self.addLeft(_dd8);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dda=this.bindingWindow.bindingMap.toolsbutton;
var _ddb=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _ddc=_dda.bindingElement.offsetLeft-this._moreActionsWidth;
var _ddd=0;
var _dde=new List();
var _ddf,_de0=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_ddf=_de0.getNext())!=null){
if(!_ddf.isVisible){
_ddf.show();
}
_ddd+=_ddf.boxObject.getDimension().w;
if(_ddd>=_ddc){
_dde.add(_ddf);
_ddf.hide();
}
}
if(_dde.hasEntries()){
var _de1=_dde.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_de1).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_ddf=_dde.getNext())!=null){
this._moreActions.add(_ddf.associatedSystemAction);
}
_ddb.show();
}else{
this._moreActions=null;
_ddb.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _de2=this.bindingWindow.bindingMap.moreactionspopup;
_de2.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_de2.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_de2.add(item);
}
_de2.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_de4){
var _de5=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _de6=_de4.getLabel();
var _de7=_de4.getToolTip();
var _de8=_de4.getImage();
var _de9=_de4.isDisabled();
if(_de8&&_de8.indexOf("size=")==-1){
_de8=_de8+"&size="+this.getImageSize();
_de5.imageProfile=new ImageProfile({image:_de8});
}
if(_de6){
_de5.setLabel(_de6);
}
if(_de7){
_de5.setToolTip(_de7);
}
if(_de4.isDisabled()){
_de5.disable();
}
_de5.associatedSystemAction=_de4;
return _de5;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dea=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dea!=null){
_dea.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_deb){
var _dec=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_deb);
return UserInterface.registerBinding(_dec,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_ded){
var _dee=SystemTreeBinding.superclass.add.call(this,_ded);
if(!this._defaultTreeNode){
if(_ded instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_ded;
}
}
return _dee;
};
SystemTreeBinding.prototype.handleAction=function(_def){
SystemTreeBinding.superclass.handleAction.call(this,_def);
var _df0=_def.target;
switch(_def.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_df0.key);
this._updateFocusedNode();
_def.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_def.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_df0.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_def.consume();
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
var _df2=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_df2);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_df3){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_df3);
var reg=this._entityTokenRegistry;
var _df5=_df3.node.getEntityToken();
if(reg.has(_df5)){
reg.get(_df5).add(_df3);
}else{
reg.set(_df5,new List([_df3]));
}
var _df6=null;
if(this.isLockedToEditor){
if(_df5==StageBinding.entityToken){
if(_df3.node.isTreeLockEnabled()){
_df6=_df3;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_df3.node.getHandle()){
_df6=_df3;
}
}
}
if(_df6!=null){
this.focusSingleTreeNodeBinding(_df6);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_df7){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_df7);
var reg=this._entityTokenRegistry;
var _df9=_df7.node.getEntityToken();
if(reg.has(_df9)){
var list=reg.get(_df9);
list.del(_df7);
if(!list.hasEntries()){
reg.del(_df9);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_df7.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_df7.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _dfd=this._refreshingTreeNodes;
if(_dfd.hasEntries()&&_dfd.has(key)){
_dfd.del(key);
if(!_dfd.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _dfe=StageBinding.entityToken;
if(_dfe!=null){
this._focusTreeNodeByEntityToken(_dfe);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _dff=false;
var _e00=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_dff=false;
}else{
if(_e00.hasEntries()){
_dff=true;
while(_dff&&_e00.hasNext()){
var _e01=_e00.getNext();
if(!_e01.isDraggable){
_dff=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_dff;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_e02,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_e02,arg);
switch(_e02){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_e02,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_e02);
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
var self=this,_e06=arg;
setTimeout(function(){
if(_e06!=null){
self._focusTreeNodeByEntityToken(_e06);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e08=tab.perspectiveNode==null;
if(!_e08){
_e08=tab.perspectiveNode==this.perspectiveNode;
}
if(_e08){
var self=this,_e0a=tab.getEntityToken();
setTimeout(function(){
if(_e0a!=null){
self._focusTreeNodeByEntityToken(_e0a);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e0b,_e0c){
this.isLockFeatureFocus=true;
var _e0d=null;
if(this._entityTokenRegistry.has(_e0b)){
var list=this._entityTokenRegistry.get(_e0b);
list.each(function(tn){
var _e10=true;
if(tn.node.isTreeLockEnabled()){
_e0d=tn;
_e10=false;
}
return _e10;
});
if(_e0d!=null){
if(!_e0d.isFocused){
this.focusSingleTreeNodeBinding(_e0d,true);
}else{
_e0d.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e0d==null&&_e0c!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e0b);
self._focusTreeNodeByEntityToken(_e0b,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e12){
var _e13=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e14=this.getRootTreeNodeBindings();
while(_e14.hasNext()){
var _e15=_e14.getNext();
_e13.add(_e15.node.getEntityToken());
}
}else{
_e13.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e13.hasNext()){
var _e16=_e13.getNext();
var _e17=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e16,_e12,_e17);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e1a=this._treeNodeBindings;
var _e1b=new Map();
function fix(_e1c,list){
if(!_e1c.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e1a.has(node.getHandle())){
var _e1f=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e1b.set(node.getHandle(),_e1f);
_e1c.add(_e1f);
}
});
_e1c.attachRecursive();
}
}
_e1c.open(true);
}
map.each(function(_e20,list){
if(_e1a.has(_e20)){
var _e22=_e1a.get(_e20);
fix(_e22,list);
}else{
if(_e1b.has(_e20)){
var _e23=_e1b.get(_e20);
fix(_e23,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e24,arg){
switch(_e24){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e26=arg;
if(_e26!=null){
this._invokeServerRefresh(_e26);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e27=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e27;
_e27.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e27=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e27;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e28){
if(_e28!=null&&_e28=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e28)){
var list=this._entityTokenRegistry.get(_e28).reset();
this._refreshToken=_e28;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e2a=list.getNext();
this._refreshingTreeNodes.set(_e2a.key,true);
setTimeout(function(){
_e2a.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e2b=this.getFocusedTreeNodeBindings().getFirst();
if(_e2b){
var _e2c=_e2b.getLabel();
var _e2d=_e2b.getAncestorBindingByLocalName("treenode");
if(_e2d){
_e2b=_e2d;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e2b.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e2e=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e2e,[_e2c]);
}
_e2b.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e2f=SystemTreeBinding.clipboard;
if(_e2f){
var type=_e2f.dragType;
var _e31=this.getFocusedTreeNodeBindings().getFirst();
if(_e31.dragAccept){
if(_e31.acceptor.isAccepting(type)){
this._performPaste(_e31);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e32){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e32.node.hasDetailedDropSupport()){
if(_e32.node.hasChildren()){
var _e34=_e32.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e35,_e36){
if(_e35==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e37=_e36.get("switch");
var _e38=_e36.get("sibling");
if(_e37=="after"){
_e38++;
}
var _e39=_e32.accept(SystemTreeBinding.clipboard,_e38);
if(_e39){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e34);
}else{
Application.lock(self);
var _e3a=_e32.accept(SystemTreeBinding.clipboard,0);
if(_e3a){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e3a=_e32.accept(SystemTreeBinding.clipboard,0);
if(_e3a){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e3b=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e3b!=null){
this._focusTreeNodeByEntityToken(_e3b);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e3c){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e3c){
this.blurSelectedTreeNodes();
var _e3d=this.getRootTreeNodeBindings();
_e3d.each(function(_e3e){
if(_e3e.isContainer&&_e3e.isOpen){
_e3e.close();
_e3e.hasBeenOpened=false;
_e3e.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e3f){
if(_e3f!=this.isLockedToEditor){
this.isLockedToEditor=_e3f;
if(_e3f){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e41=this.getRootTreeNodeBindings();
_e41.each(function(_e42){
var _e43=_e42.getOpenSystemNodes();
if(_e43!=null&&_e43.hasEntries()){
list.merge(_e43);
}else{
if(_e42.isOpen){
list.add(_e42.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e44){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e44);
if(_e44!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e45){
if(_e45){
var list=new List(_e45.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e47=new Map();
var _e48=this.getFocusedTreeNodeBindings();
var _e49=_e48.getFirst().node.getActionProfile();
if(_e49!=null){
var self=this;
_e49.each(function(_e4b,list){
var _e4d=new List();
list.each(function(_e4e){
if(_e4e.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e4e.getGroupName()]){
_e4d.add(_e4e);
}
}
});
if(_e4d.hasEntries()){
_e47.set(_e4b,_e4d);
}
});
}
_e47.activePosition=this._activePosition;
return _e47;
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
StageBinding.presentViewDefinition=function(_ec7){
if(_ec7.label!=null){
var _ec8=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ec8,[_ec7.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ec7);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_eca,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ecc=System.getPerspectiveNodes();
if(_ecc.hasEntries()){
this._initializeSystemViewDefinitions(_ecc);
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
var _ece=null;
if(LocalStore.isEnabled){
_ece=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ece&&ViewDefinitions[_ece]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ece));
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
var _ed0=root.getActionProfile();
if(_ed0&&_ed0.hasEntries()){
var _ed1=top.app.bindingMap.toolsmenugroup;
if(_ed1){
_ed0.each(function(_ed2,list){
list.each(function(_ed4){
var item=MenuItemBinding.newInstance(_ed1.bindingDocument);
item.setLabel(_ed4.getLabel());
item.setToolTip(_ed4.getToolTip());
item.setImage(_ed4.getImage());
item.setDisabled(_ed4.isDisabled());
item.associatedSystemAction=_ed4;
var _ed6=_ed1;
var tag=_ed4.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ed6=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ed6.add(item);
});
});
_ed1.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ed8){
while(_ed8.hasNext()){
var node=_ed8.getNext();
var _eda=node.getHandle();
ViewDefinitions[_eda]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_edb){
StageBinding.superclass.handleAction.call(this,_edb);
var _edc=_edb.target;
switch(_edb.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_edc;
this._inflateBinding(_edc);
_edb.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_edc;
this._inflateBinding(_edc);
_edb.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_edc);
_edb.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_edc instanceof DockBinding){
switch(_edc.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_edc.reference,_edc);
break;
}
this.handleAttachedDock(_edc);
_edb.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_edc instanceof DockBinding){
this.handleSelectedDockTab(_edc.getSelectedTabBinding());
_edb.consume();
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
_edb.consume();
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
_edb.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_edb);
};
StageBinding.prototype.handleBroadcast=function(_ede,arg){
StageBinding.superclass.handleBroadcast.call(this,_ede,arg);
switch(_ede){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ee0=arg;
this._dontView(_ee0);
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
StageBinding.prototype._showStart=function(_ee2){
if(_ee2!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ee5=this.bindingWindow.bindingMap.maindecks;
if(_ee2){
_ee5.select("startdeck");
view.show();
}else{
view.hide();
_ee5.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ee2;
}
};
StageBinding.prototype._inflateBinding=function(_ee6){
for(var _ee7 in ViewDefinitions){
var _ee8=ViewDefinitions[_ee7];
if(_ee8 instanceof SystemViewDefinition){
_ee6.mountDefinition(_ee8);
}
}
var _ee9=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ee9){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _eec=new StageCrawler();
_eec.mode=mode;
_eec.crawl(this.bindingElement);
_eec.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_eed){
var _eee=_eed.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_eee);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_eee));
}
};
StageBinding.prototype.handleAttachedDock=function(_eef){
var _ef0=_eef.getTabBindings();
if(_ef0.hasEntries()){
while(_ef0.hasNext()){
var _ef1=_ef0.getNext();
var _ef2=_ef1.getHandle();
if(_ef2){
if(_ef2=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ef3=ViewDefinitions[_ef2];
if(_ef3){
this._view(_eef,_ef1,_ef3,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ef2+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ef4){
var _ef5=null;
var _ef6=false;
switch(_ef4.position){
case Dialog.MODAL:
_ef5=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ef5=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ef4.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ef5=this._dockBindings.get(_ef4.position);
break;
case DockBinding.EXTERNAL:
window.open(_ef4.url);
_ef6=true;
break;
default:
var _ef7=this._decksBinding.getSelectedDeckBinding();
_ef5=_ef7.getDockBindingByReference(_ef4.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ef8=this.bindingWindow.bindingMap.maindecks;
_ef8.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ef6=true;
}
break;
}
if(!_ef6){
if(_ef5!=null){
this._view(_ef5,null,_ef4,true);
}else{
throw "StageBinding: Could not position view: "+_ef4.handle;
}
}
};
StageBinding.prototype._view=function(_ef9,_efa,_efb,_efc){
var _efd=_efb.handle;
if(_efb.isMutable){
_efd+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_efd]){
var _efe=ViewBinding.getInstance(_efd);
if(_efe!=null){
_efe.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_efd);
}
}else{
this._activeViewDefinitions[_efd]=_efb;
Application.lock(this);
switch(_ef9.constructor){
case DockBinding:
if(_efc){
_ef9.prepareNewView(_efb);
}else{
_ef9.prepareOpenView(_efb,_efa);
}
break;
case StageDialogBinding:
if(_efc){
_ef9.prepareNewView(_efb);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_eff){
if(this._activeViewDefinitions[_eff]!=null){
delete this._activeViewDefinitions[_eff];
}else{
this.logger.debug("Could not unregister active view: "+_eff);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_f00){
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
this.addFilter(function(_f02){
var _f03=UserInterface.getBinding(_f02);
var _f04=null;
if(_f03){
switch(_f03.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f03.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f03.handleUnMaximization();
break;
}
break;
case DockBinding:
_f04=NodeCrawler.SKIP_NODE;
break;
}
}
return _f04;
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
var _f05=null;
this._dialogs.each(function(_f06){
if(!_f06.isVisible){
_f05=_f06;
}
return _f05!=null;
});
if(!_f05){
this._newInstance();
_f05=this._dialogs.getLast();
}
_f05.setModal(false);
return _f05;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f07=this.getInstance();
_f07.setModal(true);
return _f07;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f08=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f08);
_f08.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f09){
if(_f09 instanceof DialogViewDefinition){
var _f0a=ViewBinding.newInstance(this.bindingDocument);
_f0a.setDefinition(_f09);
_f0a.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f09.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f09.handler)){
this._dialogResponseHandler=_f09.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f0a;
this._body.add(_f0a);
_f0a.attach();
_f0a.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f0b){
StageDialogBinding.superclass.handleAction.call(this,_f0b);
var _f0c=_f0b.target;
switch(_f0b.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f0c);
_f0b.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f0c.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f0b.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f0c.response){
this._handleDialogPageResponse(_f0c);
}
_f0b.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f0b.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f0b.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f0b.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f0b.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f0b.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f0b.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f0b.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f0b.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f0c==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f0d,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f0d,arg);
switch(_f0d){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f0f){
var _f10=new FitnessCrawler();
var list=new List();
if(_f0f){
_f10.mode=FitnessCrawler.MODE_BRUTAL;
}
_f10.crawl(this.bindingElement,list);
_f10.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f12){
_f12.fit(_f0f);
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
var _f13=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f13){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f15){
var cmd=_f15.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f17){
if(_f17.bindingDocument==this._viewBinding.getContentDocument()){
if(_f17 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f17);
}
this._pageBinding=_f17;
if(_f17.height=="auto"){
_f17.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f17);
_f17.enableAutoHeightLayoutMode(false);
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
if(_f17.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f17);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f18){
var _f19=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f19){
var _f1a=UserInterface.getBinding(_f19);
_f1a.setDisabled(_f18);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f1b){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f1b.response,_f1b.result!=null?_f1b.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f1d){
if(_f1d.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f1d);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f1f){
switch(_f1f.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f1f.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f1f.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f20){
var _f21=_f20.label;
var _f22=_f20.image;
var _f23=_f20.width;
var _f24=_f20.height;
var _f25=_f20.controls;
var _f26=_f20.isResizable;
if(_f21){
this.setLabel(_f21);
}
if(_f22){
this.setImage(_f22);
}
if(_f23||_f24){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f23?_f23:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f24!=null&&_f24!="auto")?_f24:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f25){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f2a=new List(_f25.split(" "));
while((type=_f2a.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f26!=this._isResizable){
this.setResizable(_f26);
}
if(_f24=="auto"){
this._fixAutoHeight(_f20);
}
if(_f20==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f2b){
var dim=this.getDimension();
var _f2d=0;
var _f2e=0;
if(_f2b.isDialogSubPage){
_f2b=this._pageBinding;
}
if(this._isFirstPage){
_f2d=_f2b.width!=null?_f2b.width:dim.w;
}else{
_f2d=dim.w;
}
_f2e=_f2b.bindingElement.offsetHeight;
_f2e+=this._titlebar.bindingElement.offsetHeight;
_f2e+=4;
_f2e+=4;
if(_f2e<dim.h){
_f2e=dim.h;
}
if(_f2b.minheight!=null){
if(_f2e<_f2b.minheight){
_f2e=_f2b.minheight;
}
}
this.setDimension(new Dimension(_f2d,_f2e));
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
StageDialogBinding.newInstance=function(_f31){
var _f32=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f31);
var _f33=UserInterface.registerBinding(_f32,StageDialogBinding);
_f33.setProperty("controls","minimize maximize close");
return _f33;
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
this.addFilter(function(_f34,list){
var _f36=null;
var _f37=UserInterface.getBinding(_f34);
if(!_f37.isVisible){
_f36=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f36;
});
this.addFilter(function(_f38,list){
var _f3a=null;
var _f3b=UserInterface.getBinding(_f38);
if(_f3b.isAttached){
if(Interfaces.isImplemented(IFit,_f3b)){
if(!_f3b.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f3b);
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
StageDecksBinding.prototype.mountDefinition=function(_f3c){
var _f3d=StageDeckBinding.newInstance(this.bindingDocument);
_f3d.handle=_f3c.handle;
_f3d.perspectiveNode=_f3c.node;
this._decks[_f3d.handle]=_f3d;
this.add(_f3d);
_f3d.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f3e){
var _f3f=this._decks[_f3e];
StageBinding.perspectiveNode=_f3f.perspectiveNode;
this.select(_f3f);
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
StageDeckBinding.prototype.handleAction=function(_f40){
StageDeckBinding.superclass.handleAction.call(this,_f40);
var _f41=_f40.target;
switch(_f40.type){
case WindowBinding.ACTION_LOADED:
if(_f41==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f40.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f41 instanceof DockBinding){
this._dockBindings.set(_f41.reference,_f41);
_f41.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f40.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f40.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f40);
StageDeckBinding.superclass.handleAction.call(this,_f40);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f43=new StageCrawler();
_f43.mode=mode;
_f43.crawl(this.windowBinding.getContentDocument().body);
_f43.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f44){
return this._dockBindings.get(_f44);
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
StageDeckBinding.newInstance=function(_f46){
var _f47=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f46);
var _f48=UserInterface.registerBinding(_f47,StageDeckBinding);
return _f48;
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
StageSplitBoxBinding.prototype.handleAction=function(_f49){
StageSplitBoxBinding.superclass.handleAction.call(this,_f49);
StageBoxAbstraction.handleAction.call(this,_f49);
var _f4a=_f49.target;
var _f4b=null;
var _f4c=null;
switch(_f49.type){
case DockBinding.ACTION_EMPTIED:
_f4c=this.getChildBindingByLocalName("splitter");
if(_f4c.isVisible){
_f4c.hide();
}
_f4b=this.getDescendantBindingsByLocalName("dock");
if(_f4b.getFirst().isEmpty&&_f4b.getLast().isEmpty){
if(_f4b.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f49.consume();
break;
case DockBinding.ACTION_OPENED:
_f4b=this.getDescendantBindingsByLocalName("dock");
if(!_f4b.getFirst().isEmpty&&!_f4b.getLast().isEmpty){
_f4c=this.getChildBindingByLocalName("splitter");
if(!_f4c.isVisible){
_f4c.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f49.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f4a!=this){
_f4c=this.getChildBindingByLocalName("splitter");
if(_f4c.isVisible){
_f4c.hide();
}
this.invokeLayout();
_f49.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f4a!=this){
var _f4d=this.getChildBindingsByLocalName("splitpanel");
if(_f4d.getFirst().isVisible&&_f4d.getLast().isVisible){
_f4c=this.getChildBindingByLocalName("splitter");
if(!_f4c.isVisible){
_f4c.show();
}
}
this.invokeLayout();
_f49.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f4e){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f4e);
switch(_f4e.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f4e.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f4f=this.getChildBindingsByLocalName("splitpanel");
return _f4f.getFirst().isVisible&&_f4f.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f50=this.getChildBindingsByLocalName("splitpanel");
return _f50.getFirst().isFixed&&_f50.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f51){
StageSplitPanelBinding.superclass.handleAction.call(this,_f51);
StageBoxAbstraction.handleAction.call(this,_f51);
switch(_f51.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f51.type==StageSplitBoxBinding.ACTION_HIDE){
_f51.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f51.type==DockBinding.ACTION_EMPTIED){
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
if(_f51.type==StageSplitBoxBinding.ACTION_SHOW){
_f51.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f54=_f51.target;
if(_f54!=this&&_f54.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f55=_f54._containingSplitBoxBinding;
if(_f55.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f56=_f55.getChildBindingsByLocalName("splitpanel");
var _f57=_f56.getFirst();
var _f58=_f56.getLast();
if(this.isFixed==true){
if(!_f57.isFixed||!_f58.isFixed||(!_f55.hasBothPanelsVisible()&&_f54.isMinimizedForReal)){
this.setFix(false);
_f51.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f55.hasBothPanelsFixed()||(!_f55.hasBothPanelsVisible()&&_f54.isMinimizedForReal)){
this.setFix(_f54.getContainedDock().getHeight());
_f51.consume();
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
var _f59=this.getContainedDock();
if(_f59){
if(this.isMaximizePrepared==true){
}else{
_f59.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f5a=this.getContainedDock();
if(_f5a){
if(_f5a.type==DockBinding.TYPE_EDITORS){
if(_f5a.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f5a.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f5b=this.getContainedDock();
if(_f5b){
_f5b.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f5b);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f5c=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f5d=this.getContainedDock();
if(_f5d){
_f5d.collapse(_f5c);
if(!_f5c){
this.setFix(_f5d.getHeight());
}else{
this.setFix(_f5d.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f5d&&_f5d.isActive){
_f5d.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f5d);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f5e){
var _f5f=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f60=this.getContainedDock();
if(_f60){
if(this.isMinimized==true){
_f60.unCollapse(_f5f);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f5e){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f60){
_f60.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f60);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f61){
var _f62=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f62=false;
}
}
if(_f62==true){
this._invisibilize(_f61);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f64){
if(_f64!=this._isInvisibilized){
if(_f64){
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
StageSplitterBinding.prototype.onDragStart=function(_f65){
var _f66=top.app.bindingMap.stagesplittercover;
var _f67=this._containingSplitBoxBinding.getOrient();
switch(_f67){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f66.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f66.bindingElement.style.cursor="n-resize";
break;
}
_f66.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f67);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f6d){
this._orient=_f6d;
this.attachClassName(_f6d);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f6f=true;
var _f70=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f70=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f6f=false;
break;
}
if(_f6f){
this.bindingElement.style.left=pos.x+"px";
}
if(_f70){
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
StageBoxAbstraction.handleAction=function(_f72){
switch(_f72.type){
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
if(_f72.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f72.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f73=this.bindingElement.style;
_f73.position="absolute";
_f73.width="100%";
_f73.height="100%";
_f73.top="0";
_f73.left="0";
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
var _f74=this.bindingElement.style;
_f74.position="relative";
_f74.width="auto";
_f74.height="auto";
_f74.top="auto";
_f74.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f75,_f76){
var _f77=_f75.bindingElement.style;
var _f78=_f75.bindingElement.parentNode;
var box=_f75._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f76){
_f75._unmodifiedFlexMethod=_f75.flex;
_f75.flex=function(){
_f77.width=_f78.offsetWidth+"px";
_f77.height=_f78.offsetHeight+"px";
};
}else{
_f77.width="100%";
_f77.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f77.width="auto";
_f77.height="auto";
box.reflex(true);
},0);
}
_f75.flex=_f75._unmodifiedFlexMethod;
_f75._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f7a){
var _f7b=_f7a.target;
switch(_f7a.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f7b instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f7a);
_f7a.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f7a.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f7c){
var mode=null;
switch(_f7c.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f7e){
StageMenuBarBinding.superclass.handleAction.call(this,_f7e);
switch(_f7e.type){
case MenuItemBinding.ACTION_COMMAND:
var _f7f=_f7e.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f7f){
SystemAction.invoke(_f7f,this._rootNode);
}
}
_f7e.consume();
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
var _f80=this.getProperty("handle");
if(_f80){
this._handle=_f80;
if(StageBinding.isViewOpen(_f80)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f80);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f82){
this.setProperty("handle",_f82);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f83,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f83,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f83){
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
StageViewMenuItemBinding.newInstance=function(_f85){
var _f86=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f85);
UserInterface.registerBinding(_f86,StageViewMenuItemBinding);
return UserInterface.getBinding(_f86);
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
StageStatusBarBinding.prototype.setLabel=function(_f87){
this._label.setLabel(_f87);
};
StageStatusBarBinding.prototype.setImage=function(_f88){
this._label.setImage(_f88);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f89){
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
var _f8a=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f8b=_f8a.getAssociatedView();
var _f8c=_f8b.getContentWindow().bindingMap.tree;
var _f8d=_f8c.getFocusedTreeNodeBindings();
if(!_f8d.hasEntries()&&StageBinding.treeSelector){
_f8d=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f8d;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f8e=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f8e.each(function(_f8f){
LocalStore.focuseNodes.add(_f8f.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f90=LocalStore.focuseNodes.getEntityTokens();
var _f91=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f92=_f91.getAssociatedView();
var _f93=_f92.getContentWindow().bindingMap.tree;
_f90=new List(TreeService.GetCurrentLocaleEntityTokens(_f90.toArray()));
_f90.each(function(_f94){
_f93._focusTreeNodeByEntityToken(_f94);
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
ExplorerBinding.prototype.handleAction=function(_f95){
ExplorerBinding.superclass.handleAction.call(this,_f95);
var _f96=_f95.target;
switch(_f95.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f95.consume();
break;
case Binding.ACTION_DRAG:
if(_f96 instanceof ExplorerSplitterBinding){
_f96.dragger.registerHandler(this);
}
_f95.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f98){
this._menuBinding.setSelectionByHandle(_f98);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f99){
if(_f99 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f99);
this._menuBinding.mountDefinition(_f99);
}
};
ExplorerBinding.prototype.onDragStart=function(_f9a){
var _f9b=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f9b.hasEntries()){
var _f9c=_f9b.getFirst();
this._dragStart=_f9c.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f9c.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_fa0){
if(_fa0 instanceof SystemViewDefinition){
var _fa1=ViewBinding.newInstance(this.bindingDocument);
_fa1.setType(ViewBinding.TYPE_EXPLORERVIEW);
_fa1.setDefinition(_fa0);
var _fa2=ExplorerDeckBinding.newInstance(this.bindingDocument);
_fa2.setAssociatedView(_fa1);
this._decks[_fa0.handle]=_fa2;
_fa2.add(_fa1);
this.add(_fa2);
function attach(){
_fa2.attach();
_fa1.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fa3){
var _fa4=this._decks[_fa3];
this.select(_fa4);
};
DecksBinding.prototype.expandBy=function(_fa5){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fa7=this.bindingElement.offsetHeight+_fa5;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fa7+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fa9){
var _faa=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fa9);
return UserInterface.registerBinding(_faa,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fab){
this._viewBinding=_fab;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fac=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _fad=this._viewBinding.getDefinition().label;
StatusBar.busy(_fac,[_fad]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fae){
ExplorerDeckBinding.superclass.handleAction.call(this,_fae);
var _faf=_fae.target;
switch(_fae.type){
case PageBinding.ACTION_INITIALIZED:
if(_faf instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_faf.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fb0,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fb0,arg);
switch(_fb0){
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
var _fb2=null;
if(this._isExplorerDeckBindingInitialized){
_fb2=this._viewBinding.getDefinition().label;
}else{
_fb2=DockTabBinding.LABEL_TABLOADING;
}
return _fb2;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fb3=null;
if(this._isExplorerDeckBindingInitialized){
_fb3=this._viewBinding.getDefinition().image;
}else{
_fb3=DockTabBinding.IMG_TABLOADING;
}
return _fb3;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fb4=null;
if(this._isExplorerDeckBindingInitialized){
_fb4=this._viewBinding.getDefinition().toolTip;
}
return _fb4;
};
ExplorerDeckBinding.newInstance=function(_fb5){
var _fb6=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fb5);
return UserInterface.registerBinding(_fb6,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fb7){
switch(_fb7.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fb7.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fb7.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fb7);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fb8){
this._maxButtons.set(_fb8.handle,this._mountMaxButton(_fb8));
this._minButtons.set(_fb8.handle,this._mountMinButton(_fb8));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fb9){
var _fba=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fba.setLabel(_fb9.label);
_fba.setToolTip(_fb9.toolTip);
_fba.handle=_fb9.handle;
_fba.node=_fb9.node;
this._maxGroup.add(_fba);
this._maxList.add(_fba);
_fba.attach();
if(Client.isPad){
_fba.hide();
}
return _fba;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fbb){
var _fbc=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fbc.setLabel(_fbb.label);
_fbc.setToolTip(_fbb.label);
_fbc.handle=_fbb.handle;
_fbc.node=_fbb.node;
this._minGroup.addFirst(_fbc);
this._minList.add(_fbc);
_fbc.attach();
if(!Client.isPad){
_fbc.hide();
}
return _fbc;
};
ExplorerMenuBinding.prototype.handleAction=function(_fbd){
ExplorerMenuBinding.superclass.handleAction.call(this,_fbd);
switch(_fbd.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fbe=_fbd.target;
var _fbf=_fbe.getCheckedButtonBinding();
var _fc0=_fbf.handle;
switch(_fbe){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fc0),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fc0),true);
break;
}
this._selectedHandle=_fc0;
this._selectedTag=_fbf.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fbd.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fc1){
var _fc2=this._maxButtons.get(_fc1);
if(_fc2){
_fc2.check();
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
var _fc3=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fc3=true;
}
return _fc3;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fc5=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fc5=true;
}
return _fc5;
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
ExplorerToolBarBinding.newInstance=function(_fc6){
var _fc7=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fc6);
return UserInterface.registerBinding(_fc7,ExplorerToolBarBinding);
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
var _fc8=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fc9=_fc8?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fc9);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fca,_fcb){
var _fcc=(_fcb==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fcd=DOMUtil.createElementNS(Constants.NS_UI,_fcc,_fca);
var _fce=UserInterface.registerBinding(_fcd,ExplorerToolBarButtonBinding);
_fce.explorerToolBarButtonType=_fcb;
return _fce;
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
EditorBinding.invokeFunctionEditorDialog=function(_fcf,_fd0,type){
type=type?type:"";
var _fd2=FunctionService.GetCustomEditorSettingsByMarkup(_fcf);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fd2){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fd2.Width?(_fd2.Width>dim.w?dim.w:_fd2.Width):undefined;
def.height=_fd2.Height?(_fd2.Height>dim.h?dim.h:_fd2.Height):undefined;
if(_fd2.Url){
_fd2.Url=_fd2.Url.indexOf("?")>-1?_fd2.Url+"&consoleId="+Application.CONSOLE_ID:_fd2.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fd0;
def.argument={url:_fd2?_fd2.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fcf}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fd5,_fd6){
var _fd7=EditorBinding._components;
var _fd8=EditorBinding._editors;
var key=_fd6.key;
var _fda=Interfaces.isImplemented(IWysiwygEditorComponent,_fd5);
if(!_fda){
_fda=Interfaces.isImplemented(ISourceEditorComponent,_fd5);
}
if(_fda){
if(_fd8.has(key)){
_fd8.get(key).initializeEditorComponent(_fd5);
}else{
if(!_fd7.has(key)){
_fd7.set(key,new List());
}
_fd7.get(key).add(_fd5);
}
}else{
throw "Editor component interface not implemented: "+_fd5;
}
};
EditorBinding.claimComponents=function(_fdb,_fdc){
var _fdd=EditorBinding._components;
var _fde=EditorBinding._editors;
var key=_fdc.key;
_fde.set(key,_fdb);
var list=null;
if(_fdd.has(key)){
list=_fdd.get(key).copy();
_fdd.del(key);
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
var _fe2=this.getProperty("value");
if(_fe2!=null){
_fe2=decodeURIComponent(_fe2);
this._startContent=_fe2;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fe4=this.bindingWindow.DataManager;
_fe4.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fe6){
var _fe7=EditorBinding.claimComponents(this,_fe6);
if(_fe7!=null){
while(_fe7.hasNext()){
this.initializeEditorComponent(_fe7.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fe9=this.bindingWindow.DataManager;
if(_fe9.getDataBinding(name)){
_fe9.unRegisterDataBinding(name);
}
_fe9.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fea=this.getEditorDocument();
if(_fea!=null){
Application.framework(_fea);
DOMEvents.addEventListener(_fea,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fea,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fea,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fea,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fec){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fec==true){
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
var _fee=this.getCheckSum();
if(_fee!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fee;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fef=null;
if(Binding.exists(this._pageBinding)){
_fef=this._pageBinding.getCheckSum(this._checksum);
}
return _fef;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _ff1=DOMEvents.getTarget(e);
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
if(_ff1.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_ff3,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ff3,arg);
var _ff5=null;
switch(_ff3){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ff6=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ff6=false;
}
}
}else{
_ff5=DOMEvents.getTarget(arg);
if(_ff5&&_ff5.ownerDocument==this.getEditorDocument()){
_ff6=false;
}
}
if(_ff6){
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
EditorBinding.prototype._activateEditor=function(_ff7){
if(_ff7!=this._isActivated){
this._isActivated=_ff7;
EditorBinding.isActive=_ff7;
var _ff8=this.getEditorWindow().standardEventHandler;
var _ff9=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ff9!=null){
if(_ff7){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ff9.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_ff8.enableNativeKeys(true);
}else{
_ff9.disable();
_ff8.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _ffa=this.getEditorDocument().selection.createRange();
_ffa.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _ffb=false;
try{
var _ffc=this.getEditorWindow().getSelection();
if(_ffc!=null){
_ffb=_ffc.toString().length>0;
if(!_ffb){
var _ffd=_ffc.getRangeAt(0);
var frag=_ffd.cloneContents();
var _fff=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fff.appendChild(frag.firstChild);
}
var img=_fff.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_ffb=true;
}
}
}
}
}
catch(exception){
}
return _ffb;
};
EditorBinding.prototype.isCommandEnabled=function(_1001){
var _1002=true;
switch(_1001){
case "Cut":
case "Copy":
case "Paste":
_1002=this.getEditorDocument().queryCommandEnabled(_1001);
break;
}
return _1002;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1006=false;
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
_1006=true;
}
break;
}
return _1006;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1009=this.getContentWindow().bindingMap.toolbar;
var _100a=_1009.getButtonForCommand(cmd);
if(!_100a){
throw "No button for command "+cmd;
}
return _100a;
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
EditorBinding.prototype.handleAction=function(_100e){
EditorBinding.superclass.handleAction.call(this,_100e);
var _100f=_100e.target;
var self=this;
var _1011=this.shadowTree.iframe;
switch(_100e.type){
case Binding.ACTION_DIRTY:
if(_100e.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_1012){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_1012);
};
EditorBinding.prototype.handleElement=function(_1013){
return true;
};
EditorBinding.prototype.updateElement=function(_1014){
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
var _1017=this._menuGroups[rel];
if(_1017 instanceof List){
_1017.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _101a=this._menuGroups[rel];
if(_101a instanceof List){
_101a.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_101c){
EditorPopupBinding.superclass.handleAction.call(this,_101c);
var _101d=_101c.target;
if(_101c.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_101d.getProperty("cmd");
var gui=_101d.getProperty("gui");
var val=_101d.getProperty("val");
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
var _1021=this.bindingWindow.bindingMap.tinywindow;
var _1022=this.bindingWindow.bindingMap.codepresswindow;
if(_1021){
EditorBinding.registerComponent(this,_1021);
}else{
if(_1022){
EditorBinding.registerComponent(this,_1022);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1023,_1024,_1025,theme){
this._editorBinding=_1023;
this._tinyEngine=_1024;
this._tinyInstance=_1025;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1027,frame,_1029){
this._editorBinding=_1027;
this._codePressFrame=frame;
this._codePressEngine=_1029;
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
var _102c=this._editorBinding;
if(_102c!=null){
var self=this;
var _102e={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_102c.hasBookmark()){
_102c.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_102c.hasBookmark()){
_102c.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_102e);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_102e);
}
};
EditorClickButtonBinding.newInstance=function(_1030){
var _1031=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1030);
return UserInterface.registerBinding(_1031,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1032){
var _1033=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1032);
return UserInterface.registerBinding(_1033,EditorToolBarButtonBinding);
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
var _1034=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1034);
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
EditorSelectorBinding.prototype.initializeComponent=function(_1035,_1036,_1037,theme){
this._editorBinding=_1035;
this._tinyEngine=_1036;
this._tinyInstance=_1037;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1039){
EditorSelectorBinding.superclass.handleAction.call(this,_1039);
switch(_1039.type){
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
EditorMenuItemBinding.newInstance=function(_103d){
var _103e=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_103d);
return UserInterface.registerBinding(_103e,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_103f){
var i=0,_1041,_1042=[],split=_103f.split(" ");
while((_1041=split[i++])!=null){
if(_1041.length>=3&&_1041.substring(0,3)=="mce"){
continue;
}else{
if(_1041.length>=14&&_1041.substring(0,14)=="compositemedia"){
continue;
}
}
_1042.push(_1041);
}
return _1042.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1044){
var _1045=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1044);
if(soap instanceof SOAPFault){
}else{
_1045=soap.XhtmlFragment;
if(!_1045){
_1045="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1045;
};
VisualEditorBinding.getTinyContent=function(_1047,_1048){
var _1049=null;
if(_1047==null||!_1047.replace(/\s*/gm,"").length){
_1047=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1048.getSoapTinyContent(_1047);
if(soap instanceof SOAPFault){
var _104b=soap;
var _104c={handleDialogResponse:function(){
_1048.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_104c,_104b);
}else{
_1049=soap.XhtmlFragment;
if(_1049==null){
_1049=new String("");
}
_1049=_1049.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1049;
};
VisualEditorBinding.isImage=function(_104d){
return _104d&&_104d.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_104e){
return VisualEditorBinding.isImage(_104e)&&!VisualEditorBinding.isReservedElement(_104e);
};
VisualEditorBinding.isReservedElement=function(_104f){
if(VisualEditorBinding.isFunctionElement(_104f)){
return true;
}
if(VisualEditorBinding.isFieldElement(_104f)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_104f)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1050){
return VisualEditorBinding.isImage(_1050)&&CSSUtil.hasClassName(_1050,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1051){
return VisualEditorBinding.isImage(_1051)&&CSSUtil.hasClassName(_1051,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1052){
return VisualEditorBinding.isImage(_1052)&&CSSUtil.hasClassName(_1052,VisualEditorBinding.HTML_CLASSNAME);
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
var _1053=this.getProperty("embedablefieldstypenames");
if(_1053!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1053);
}
var _1054=this.getProperty("formattingconfiguration");
if(_1054!=null){
this._url+="?config="+_1054;
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
VisualEditorBinding.prototype.handleBroadcast=function(_1055,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1055,arg);
var _1057=this.getContentWindow().bindingMap.tinywindow;
var _1058=_1057.getContentWindow();
switch(_1055){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1058){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1057);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1059){
_1059.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _105a=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_105a.replace(/\s*/gm,"").length==0){
_105a=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_105a,{format:"raw"});
this.updateBodyWidth();
};
VisualEditorBinding.prototype._onPageInitialize=function(_105b){
VisualEditorBinding.superclass._onPageInitialize.call(this,_105b);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _105d=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_105d=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_105d=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _105d;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1060){
var _1061=_1060;
if(!this._isNormalizedDocument(_1060)){
_1061=this._getHtmlMarkup().replace("${body}",_1060);
}
return _1061;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1062){
var _1063=false;
var doc=XMLParser.parse(_1062,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1063=true;
}
}
if(Client.isWebKit){
if(_1062.indexOf("<html")!==0){
_1063=false;
}
}
return _1063;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1068=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1068){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1068=true;
}
return _1068;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _106a=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_106a);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_106c){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_106c,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_106e){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_106e,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _1071=CSSComputer.getPadding(body);
var _1072=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_1072.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_1075){
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
VisualEditorPopupBinding.prototype.configure=function(_1076,_1077,_1078){
var _1079=this.editorBinding.hasSelection();
this.tinyInstance=_1076;
this.tinyEngine=_1077;
this.tinyElement=_1078;
this.hasSelection=_1079;
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
var _107d=false;
if(this.hasSelection){
_107d=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_107d=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_107d=true;
}
}
}
}
if(_107d){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _107e=this.getMenuItemForCommand("compositeInsertLink");
var _107f=this.getMenuItemForCommand("unlink");
var _1080=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1081=this.editorBinding.getButtonForCommand("unlink");
_107f.setDisabled(_1081.isDisabled);
if(_107f.isDisabled){
_107e.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_107e.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1082=this.editorBinding.embedableFieldConfiguration;
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
if(_1082){
var _1085=_1082.getGroupNames();
if(_1085.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1085.each(function(_1089){
var _108a=_1082.getFieldNames(_1089);
_108a.each(function(_108b){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_108b);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1089+":"+_108b);
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
var _108d=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _108e=null;
var _108f=null;
if(_108d){
if(_108d.nodeName=="TD"){
_108e=_108d.getAttribute("colspan");
_108f=_108d.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_108e=="1"&&_108f=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_108d){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1090){
var _1091=VisualEditorFormattingConfiguration._configurations;
if(!_1091.has(_1090)){
_1091.set(_1090,new VisualEditorFormattingConfiguration());
}
return _1091.get(_1090);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1093){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1094){
var _1095=null;
var _1096=VisualEditorFieldGroupConfiguration._configurations;
if(!_1096.has(_1094)){
_1096.set(_1094,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1094)));
}
return _1096.get(_1094);
};
function VisualEditorFieldGroupConfiguration(_1097){
var _1098=new Map();
new List(_1097).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1098.set(group.GroupName,map);
});
this._groups=_1098;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_109c){
return this._groups.get(_109c).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_109d,_109e){
return this._groups.get(_109d).get(_109e).xhtml;
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
var _10a0=this.getDescendantElementsByLocalName("textarea");
while(_10a0.hasNext()){
var _10a1=_10a0.getNext();
if(_10a1.getAttribute("selected")=="true"){
this._startContent=_10a1.value;
this._textareaname=_10a1.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _10a3=this.getContentWindow().bindingMap.templatetree;
_10a3.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10a4){
var _10a5=_10a3.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10a5.textareaname);
_10a4.consume();
}});
_10a3.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10a6){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10a7=this.getContentWindow().bindingMap.toolsplitter;
_10a7.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10a8=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10a8.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10a8);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10a9){
this._textareas=new Map();
while(_10a9.hasNext()){
var _10aa=_10a9.getNext();
var _10ab=_10aa.getAttribute("placeholderid");
this._textareas.set(_10ab,{placeholderid:_10ab,placeholdername:_10aa.getAttribute("placeholdername"),placeholdermarkup:_10aa.value,textareaelement:_10aa,isSelected:_10aa.getAttribute("selected")=="true"});
}
var _10ac=new Map();
this._textareas.each(function(name,_10ae){
var _10af=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10af.setLabel(_10ae.placeholdername);
_10af.setImage("${icon:placeholder}");
_10af.setProperty("placeholder",true);
_10af.textareaname=name;
_10ac.set(_10ae.placeholdername,_10af);
if(_10ae.isSelected){
selected=_10af;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10b0=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10b0.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10b1=this.getContentWindow().bindingMap.templatetree;
var _10b2=_10b1.add(TreeNodeBinding.newInstance(_10b1.bindingDocument));
_10b2.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10b2.setImage("${icon:warning}");
_10b2.attach();
var _10b3=this.getContentWindow().bindingMap.statusbar;
_10b3.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10b5=this._textareas.get(name);
var _10b6=_10b5.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10b6));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10b7){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10b7;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10b8=this.getContentWindow().bindingMap.statusbar;
_10b8.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10b7);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10bb=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10bb;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10bc=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10bc=this._xhtmls.get(this._textareaname);
if(_10bc==null){
_10bc=VisualEditorBinding.XHTML;
}
}
return _10bc;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10be){
_10be.textareaelement.value=_10be.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10bf,_10c0){
var _10c1=_10bf.getElementsByTagName("div").item(0);
var _10c2=_10c0.getElementsByTagName("div").item(0);
var _10c3=new List(_10c1.getElementsByTagName("textarea"));
var _10c4=new List(_10c2.getElementsByTagName("textarea"));
var _10c5=false;
if(_10c3.getLength()!=_10c4.getLength()){
_10c5=true;
}else{
var index=0;
_10c3.each(function(_10c7,index){
var _10c9=_10c4.get(index);
var newid=_10c7.getAttribute("placeholderid");
var oldid=_10c9.getAttribute("placeholderid");
var _10cc=_10c7.getAttribute("placeholdername");
var _10cd=_10c9.getAttribute("placeholdername");
if(newid!=oldid||_10cc!=_10cd){
_10c5=true;
}
return !_10c5;
});
}
if(_10c5){
var html=null;
if(_10c1.innerHTML!=null){
html=_10c1.innerHTML;
}else{
html=DOMSerializer.serialize(_10c1);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10d0){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10d0);
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
var _10d3=this.getDescendantBindingByLocalName("selector");
_10d3.attach();
this._populateTemplateSelector();
var _10d4=this.getContentWindow().bindingMap.templateselector;
_10d4.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10d5=this.getDescendantBindingByLocalName("selector");
var _10d6=this.getContentWindow().bindingMap.templateselector;
_10d5.selections.each(function(_10d7){
_10d7.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10d6.populateFromList(_10d5.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10d8=this.getDescendantBindingByLocalName("selector");
var _10d9=this.getContentWindow().bindingMap.templateselector;
_10d8.selectByValue(_10d9.getValue());
_10d8.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10da){
this.updateTemplatePreview();
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10df,_10e0){
var _10e1=_10e0;
if(old.has(_10df)){
_10e1=old.get(_10df).placeholdermarkup;
}
return _10e1;
}
while(_10da.hasNext()){
var _10e2=_10da.getNext();
var _10e3=_10e2.getAttribute("placeholderid");
this._textareas.set(_10e3,{placeholderid:_10e3,placeholdername:_10e2.getAttribute("placeholdername"),placeholdermarkup:compute(_10e3,_10e2.value),textareaelement:_10e2,isSelected:_10e2.getAttribute("selected")=="true"});
}
var _10e4=null;
var _10e5=this.getContentWindow().bindingMap.templatetree;
var _10e6=new Map();
this._textareas.each(function(name,_10e8){
var _10e9=_10e5.add(TreeNodeBinding.newInstance(_10e5.bindingDocument));
_10e9.setLabel(_10e8.placeholdername);
_10e9.setImage("${icon:placeholder}");
_10e9.setProperty("placeholder",true);
_10e9.textareaname=name;
_10e6.set(_10e8.placeholdername,_10e9);
if(_10e8.isSelected){
_10e4=_10e9;
}
});
_10e5.attachRecursive();
if(_10e4!=null){
var _10ea=true;
if(this._oldtextareas.hasEntries()){
_10ea=false;
var map=new Map();
this._textareas.each(function(id,_10ed){
map.set(_10ed.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10ea=true;
}
}
if(_10ea){
var _10ee=this._textareas.get(_10e4.textareaname);
this._textareaname=_10e4.textareaname;
this._placeholdername=_10ee.placeholdername;
this._setContentFromPlaceHolder(_10e4.textareaname);
_10e4.focus();
}else{
var _10ef=_10e6.get(this._placeholdername);
this._textareaname=_10ef.textareaname;
_10ef.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10f1,_10f2){
var _10f3=_10f1.getElementsByTagName("ui:selector").item(0);
var _10f4=_10f2.getElementsByTagName("ui:selector").item(0);
var _10f5=false;
if(_10f3!=null&&_10f4!=null){
var _10f6=new List(_10f3.getElementsByTagName("ui:selection"));
var _10f7=new List(_10f4.getElementsByTagName("ui:selection"));
if(_10f6.getLength()!=_10f7.getLength()){
_10f5=true;
}else{
_10f6.each(function(_10f8,index){
var _10fa=_10f8.getAttribute("value");
var _10fb=_10f7.get(index).getAttribute("value");
if(_10fa!=_10fb){
_10f5=true;
}
return !_10f5;
});
}
}
if(_10f5){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10f3);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10f1,_10f2);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_10fd){
var _10fe=null;
if(_10fd==undefined){
_10fd=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_1100){
if(_1100.PlaceholderId==_10fd){
_10fe=_1100.ClientRectangle.Width;
return false;
}
});
}
return _10fe;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(){
var _1101=this._pageId;
var _1102=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_1101,_1102,function(_1104){
self._templatePreview=_1104;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1105){
var _1106=this._pageId;
var _1107=this._textareaname;
var _1108=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1105,_1106,_1108,_1107,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_110a){
var _110b=this._pageId;
var _110c=this._textareaname;
var _110d=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_110a,_110b,_110d,_110c,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_110f,frame,_1111){
this._editorBinding=_110f;
this._codePressFrame=frame;
this._codePressEngine=_1111;
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
var _1117=this.getProperty("validate");
if(_1117==true){
this._hasStrictValidation=true;
}
var _1118=this.getProperty("strictsave");
if(_1118===false){
this._strictSave=false;
}
var _1119=this.getProperty("validator");
if(_1119!=null){
this._validator=_1119;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_111a,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_111a,arg);
switch(_111a){
case BroadcastMessages.CODEMIRROR_LOADED:
var _111c=this.getContentWindow().bindingMap.codemirrorwindow;
if(_111c!=null){
var _111d=_111c.getContentWindow();
if(arg.broadcastWindow==_111d){
this._codemirrorWindow=_111d;
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
this.initializeEditorComponents(_111c);
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
this.unsubscribe(_111a);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1121){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1121);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1122){
if(_1122!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1122;
EditorBinding.isActive=_1122;
var _1123=this._codemirrorWindow.standardEventHandler;
if(_1122){
_1123.enableNativeKeys(true);
}else{
_1123.disableNativeKeys();
}
var _1124=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1124!=null){
if(_1122){
_1124.enable();
}else{
_1124.disable();
}
}
if(_1122){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1128=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1128;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1129){
_1129.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_112b){
if(!this._isFinalized){
if(_112b!=this._startContent){
this._startContent=_112b;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_112b);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _112c=this.getContentWindow().bindingMap.editorpage.getContent();
return _112c?_112c:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_112d){
if(this._pageBinding!=null){
this._pageBinding.cover(_112d);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_112e){
if(_112e!=null&&this.shadowTree.dotnetinput!=null){
var value=_112e.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _1130=true;
var _1131=this.getContent();
if(this._validator!=null){
_1130=Validator.validateInformed(_1131,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _1132=_1131.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_1132!=_1131){
_1131=_1132;
this.setContent(_1132);
}
_1130=XMLParser.isWellFormedDocument(_1131,true,!this._strictSave);
if(_1130==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_1130=this._isValidHTML(_1131);
break;
}
}
break;
}
}
return _1130;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1134=true;
var doc=XMLParser.parse(xml);
var _1136=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1136.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1136.add("NamespaceURI");
}
var head=null,body=null;
var _113a=new List(root.childNodes);
while(_113a.hasNext()){
var child=_113a.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1136.add("MultipleHead");
}
if(body!=null){
_1136.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1136.add("MultipleBody");
}
body=child;
break;
default:
_1136.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1136.add("MissingHead");
}
if(body==null){
_1136.add("MissingBody");
}
}
if(_1136.hasEntries()){
_1134=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1136.getFirst()));
}
return _1134;
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
var _113c=null;
var page=this._pageBinding;
if(page!=null){
_113c=page.getCheckSum();
}
return _113c;
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
ThrobberBinding.prototype.handleBroadcast=function(_113e,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_113e,arg);
switch(_113e){
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
ProgressBarBinding.notch=function(_1141){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1141);
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
ProgressBarBinding.prototype.notch=function(_1143){
_1143=_1143?_1143:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1143);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1145,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1145,arg);
switch(_1145){
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
StartMenuItemBinding.prototype.setChecked=function(_1147,_1148){
StartMenuItemBinding.superclass.setChecked.call(this,_1147,_1148);
if(!_1148){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1149){
var _114a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1149);
UserInterface.registerBinding(_114a,StartMenuItemBinding);
return UserInterface.getBinding(_114a);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_114d,_114e){
var _114f=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_114e,true)==true){
if(_114d!="*"){
_114d=KeySetBinding._sanitizeKeyModifiers(_114d);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_114f[doc]){
_114f[doc]={};
}
if(!_114f[doc][code]){
_114f[doc][code]={};
}
_114f[doc][code][_114d]=_114e;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1153=false;
var code=e.keyCode;
var _1155=KeySetBinding.keyEventHandlers;
if(_1155[doc]&&_1155[doc][code]){
var _1156="[default]";
_1156+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1156+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1156+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
_1156+=code!=KeyEventCodes.VK_ALT?e.altKey?" alt":"":"";
var _1157=_1155[doc][code][_1156];
if(_1157==null){
_1157=_1155[doc][code]["*"];
}
if(_1157!=null){
_1157.handleKeyEvent(e);
_1153=true;
}
}
return _1153;
};
KeySetBinding._sanitizeKeyModifiers=function(_1158){
var _1159="[default]";
var mods={};
if(_1158){
new List(_1158.split(" ")).each(function(_115b){
mods[_115b]=true;
});
function check(_115c){
if(mods[_115c]){
_1159+=" "+_115c;
}
}
check("shift");
check("control");
}
return _1159;
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
var _1160=key.getAttribute("oncommand");
var _1161=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1161){
DOMEvents.preventDefault(e);
}
var _1163=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1160,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1164){
if(_1164 instanceof CursorBinding){
_1164.setOpacity(0);
_1164.show();
new Animation({modifier:9,onstep:function(_1165){
_1164.setOpacity(Math.sin(_1165*Math.PI/180));
},onstop:function(){
_1164.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1166){
if(_1166 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1167){
_1166.setOpacity(Math.cos(_1167*Math.PI/180));
},onstop:function(){
_1166.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1168,_1169,_116a){
if(_1168 instanceof CursorBinding){
_116a.x-=16;
_116a.y-=16;
new Animation({modifier:3,onstep:function(_116b){
var tal=Math.sin(_116b*Math.PI/180);
_1168.setPosition(new Point(((1-tal)*_1169.x)+((0+tal)*_116a.x),((1-tal)*_1169.y)+((0+tal)*_116a.y)));
},onstop:function(){
CursorBinding.fadeOut(_1168);
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
CursorBinding.prototype.setOpacity=function(_1171){
this.bindingElement.style.opacity=new String(_1171);
this._opacity=_1171;
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
function setOpacity(_1174){
cover.bindingElement.style.opacity=new String(_1174);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1175){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1175*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1177){
cover.bindingElement.style.MozOpacity=new String(_1177);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1178){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1178*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_117a){
if(_117a!=this._isBusy){
if(_117a){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_117a;
}
};
CoverBinding.prototype.setTransparent=function(_117b){
if(_117b!=this._isTransparent){
if(_117b){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_117b;
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
CoverBinding.prototype.setHeight=function(_117d){
if(_117d>=0){
this.bindingElement.style.height=new String(_117d+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_117e){
var _117f=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_117e);
return UserInterface.registerBinding(_117f,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1181=UncoverBinding._bindingInstance;
if(Binding.exists(_1181)){
_1181.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1185){
this._isFading=_1185==true;
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
var _1186=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1186.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1186.clearRect(0,0,300,150);
_1186.fillRect(0,0,300,150);
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
var _1188=this._canvas.getContext("2d");
_1188.clearRect(0,0,300,150);
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
var _1189=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1189);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _118a=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_118a){
this._startcontent=_118a.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_118b){
SourceCodeViewerBinding.superclass.handleAction.call(this,_118b);
switch(_118b.type){
case WindowBinding.ACTION_ONLOAD:
if(_118b.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_118b.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_118b);
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
var _118f=this._transformer.transformToString(doc);
this._inject(_118f);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1192){
this.getContentDocument().body.innerHTML=_1192;
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
var _119a=list.getNext();
var id=_119a.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_119a);
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
var _11a4=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11a4.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11a4.appendChild(att);
}
elm.appendChild(_11a4);
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
var _11ae=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11ae){
doc=XMLParser.parse(_11ae);
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
var _11b2=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11b2;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11b3,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11b3,arg);
switch(_11b3){
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
var _11b6=new List();
list.each(function(lang){
_11b6.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11b6);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11ba){
switch(_11ba){
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
var _11bd=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11bd,root);
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
var _11be=this.getProperty("status");
if(_11be!=null){
switch(_11be){
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
UserInterfaceMapping.prototype.merge=function(_11c2){
for(var _11c3 in _11c2.map){
this.map[_11c3]=_11c2.getBindingImplementation(_11c3);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11c4){
var _11c5=null;
var name=_11c4.nodeName.toLowerCase();
if(this.map[name]){
_11c5=this.map[name];
}
return _11c5;
};
var UserInterface=new function(){
var _11c7=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11c8=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11c7,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding,"ui:stylesheet":StyleBinding});
var _11c9=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11cb,impl){
var _11cd=null;
if(!this.hasBinding(_11cb)){
var _11ce=DOMUtil.getParentWindow(_11cb);
if(DOMUtil.getLocalName(_11cb)!="bindingmapping"){
if(!impl&&_11cb.getAttribute("binding")!=null){
var _11cf=_11cb.getAttribute("binding");
impl=_11ce[_11cf];
if(impl==null){
throw "No such binding in scope: "+_11cf;
}
}
if(!impl){
var _11d0=_11ce.DocumentManager;
if(_11d0){
var _11d1=_11d0.customUserInterfaceMapping;
if(_11d1){
impl=_11d1.getBindingImplementation(_11cb);
}
}
}
if(!impl){
impl=_11c8.getBindingImplementation(_11cb);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11cd=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11cd){
var key=KeyMaster.getUniqueKey();
_11cb.setAttribute("key",key);
_11cd.key=key;
if(!_11cb.id){
_11cb.id=key;
}
keys[key]={element:_11cb,binding:_11cd};
_11cd.onBindingRegister();
}
}
}
return _11cd;
};
this.unRegisterBinding=function(_11d3){
terminate(_11d3);
};
function terminate(_11d4){
if(Binding.exists(_11d4)==true){
var key=_11d4.key;
Binding.destroy(_11d4);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11d4=null;
}else{
_11c9.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11d6){
var _11d7=null;
if(keys[_11d6.key]){
_11d7=keys[_11d6.key].element;
}
return _11d7;
};
this.getBinding=function(_11d8){
var _11d9=null;
if(_11d8&&_11d8.nodeType==Node.ELEMENT_NODE){
try{
var key=_11d8.getAttribute("key");
if(key&&keys[key]){
_11d9=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_11d8);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11d9;
};
this.getBindingByKey=function(key){
var _11dc=null;
if(keys[key]){
_11dc=keys[key].binding;
}
return _11dc;
};
this.hasBinding=function(_11dd){
return this.getBinding(_11dd)!=null;
};
this.isBindingVisible=function(_11de){
var _11df=Application.isOperational;
if(_11df==true){
var _11e0=new Crawler();
_11e0.type=NodeCrawler.TYPE_ASCENDING;
_11e0.id="visibilitycrawler";
_11e0.addFilter(function(_11e1){
var b=UserInterface.getBinding(_11e1);
var res=0;
if(!b.isVisible){
_11df=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11e0.crawl(_11de.bindingElement);
_11e0.dispose();
}
return _11df;
};
var _11e4=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11e4={};
for(var key in keys){
_11e4[key]=true;
}
};
this.getPoint=function(){
var _11e8=null;
if(_11e4){
_11e8=new List();
for(var key in keys){
if(!_11e4[key]){
_11e8.add(key);
}
}
}
return _11e8;
};
this.clearPoint=function(){
_11e4=null;
};
this.trackUndisposedBindings=function(){
var _11ea=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11ea){
_11ea="Bindings illdisposed: ";
}
_11ea+=entry.binding+" ";
}
}
if(_11ea!=null){
_11c9.error(_11ea);
}
};
this.autoTrackDisposedBindings=function(_11ed){
if(_11ed){
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
SOAPRequest.newInstance=function(_11ee,_11ef){
var _11f0=_11ee+"/"+_11ef;
var _11f1=new SOAPRequest(_11f0);
var _11f2=SOAPRequest.resolver;
_11f1.document=Templates.getTemplateDocument("soapenvelope.xml");
_11f1.envelope=_11f2.resolve("soap:Envelope",_11f1.document);
_11f1.header=_11f2.resolve("soap:Header",_11f1.envelope);
_11f1.body=_11f2.resolve("soap:Body",_11f1.envelope);
return _11f1;
};
SOAPRequest._parseResponse=function(_11f3){
var _11f4=null;
var _11f5=false;
var doc=_11f3.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11f4=SOAPRequestResponse.newInstance(_11f3.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11f3.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11f5=true;
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
var text=_11f3.responseText;
if(_11f3.status==503||text.indexOf("id=\"offline\"")>-1){
_11f5=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11f3.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11f3.responseText);
}
}
}
}
if(_11f5==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11f4;
};
function SOAPRequest(_11fa){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11fa;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11fc=DOMUtil.getXMLHTTPRequest();
var _11fd=null;
_11fc.open("post",url,false);
_11fc.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11fc.setRequestHeader("SOAPAction",this.action);
try{
_11fc.send(this.document);
_11fd=SOAPRequest._parseResponse(_11fc);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11fc=null;
return _11fd;
};
SOAPRequest.prototype.asyncInvoke=function(url,_1200){
var _1201=DOMUtil.getXMLHTTPRequest();
_1201.open("post",url,true);
_1201.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1201.setRequestHeader("SOAPAction",this.action);
_1201.onreadystatechange=function(){
if(_1201.readyState==4){
var _1202=SOAPRequest._parseResponse(_1201);
_1200(_1202);
_1201=null;
}
};
_1201.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1203 in this){
this[_1203]=null;
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
var _1205=null;
if(doc&&doc.documentElement){
_1205=new SOAPRequestResponse();
var _1206=SOAPRequestResponse.resolver;
_1205.document=doc;
_1205.envelope=_1206.resolve("soap:Envelope",_1205.document);
_1205.header=_1206.resolve("soap:Header",_1205.envelope);
_1205.body=_1206.resolve("soap:Body",_1205.envelope);
var fault=_1206.resolve("soap:Fault",_1205.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1205.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1206.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1206.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1205;
};
function SOAPFault(_1208,_1209,_120a){
this._operationName=_1208;
this._operationAddress=_1209;
this._faultString=_120a;
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
SOAPFault.newInstance=function(_120b,fault){
return new SOAPFault(_120b.name,_120b.address,fault.faultString);
};
function SOAPEncoder(wsdl,_120e){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_120e;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1210=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1210.body,this._operation);
var _1212=this._wsdl.getSchema();
var _1213=_1212.lookup(this._operation);
var _1214=_1213.getListedDefinitions();
while(_1214.hasNext()){
var def=_1214.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1210;
};
SOAPEncoder.prototype._resolve=function(_1218,_1219,value){
var _121b=this._wsdl.getSchema();
if(_1219.isSimpleValue){
this._appendText(_1218,value,_1219.type=="string");
}else{
var _121c=_121b.lookup(_1219.type);
if(_121c instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_121c.getListedDefinitions();
if(_121c.isArray){
var _121e=new List(value);
var def=defs.getNext();
while(_121e.hasNext()){
var elm=this._appendElement(_1218,def.name);
var val=_121e.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1218,def.name);
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
SOAPEncoder.prototype._appendText=function(_1225,value,_1227){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _122a=false;
var i=0,c;
while(c=chars[i++]){
var _122d=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_122d=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_122d=false;
}
break;
}
if(!_122d){
safe+=c;
}else{
_122a=true;
}
}
if(_122a){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1225.appendChild(_1225.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1230){
this._wsdl=wsdl;
this._operation=_1230;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1235){
var _1236=null;
var _1237=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1239=this.resolve(id,_1235.body);
var _123a=_1237.lookup(id);
var _123b=_123a.getListedDefinitions();
while(!_1236&&_123b.hasNext()){
var def=_123b.getNext();
var elm=this.resolve(def.name,_1239);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1236=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_1236.appendChild(_1236.importNode(e,true));
}else{
_1236=this._compute(elm,def);
}
}
return _1236;
};
SOAPDecoder.prototype._compute=function(_123f,_1240){
var _1241=null;
var _1242=this._wsdl.getSchema();
if(_1240.isSimpleValue){
_1241=this._getSimpleValue(_123f,_1240.type);
}else{
var _1243=_1242.lookup(_1240.type);
if(_1243 instanceof SchemaSimpleType){
_1241=this._getSimpleValue(_123f,_1243.restrictionType);
}else{
var defs=_1243.getListedDefinitions();
if(_1243.isArray){
_1241=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_123f);
while(elms.hasNext()){
var elm=elms.getNext();
_1241.push(this._compute(elm,def));
}
}else{
if(_123f==null){
_1241=null;
}else{
_1241={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_123f);
if(elm){
_1241[def.name]=this._compute(elm,def);
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
return _1241;
};
SOAPDecoder.prototype._getSimpleValue=function(_1248,type){
var _124a=null;
if(_1248!=null&&_1248.firstChild&&_1248.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1248.childNodes.length>1){
_1248.normalize();
}
_124a=_1248.firstChild.data;
switch(type){
case Schema.types.STRING:
_124a=_124a;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_124a=Number(_124a);
break;
case Schema.types.BOOLEAN:
_124a=_124a=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _124a;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_124b){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_124b);
}
Schema.prototype._parseSchema=function(_124c){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _124d={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_124c);
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
_124d[rule.getAttribute("name")]=entry;
}
return _124d;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1252){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1252);
}
SchemaDefinition.prototype._parse=function(_1253){
var min=_1253.getAttribute("minOccurs");
var max=_1253.getAttribute("maxOccurs");
var type=_1253.getAttribute("type");
this.name=_1253.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1259=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1259;
}else{
var elm=_1253.getElementsByTagName("*").item(0);
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
function SchemaElementType(_125b,_125c){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_125b,_125c);
}
SchemaElementType.prototype._parseListedDefinitions=function(_125d,_125e){
var els=_125d.resolveAll("s:complexType/s:sequence/s:element",_125e);
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
function SchemaComplexType(_1260,_1261){
this._definitions=new List();
this._parseListedDefinitions(_1260,_1261);
this.isArray=_1261.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1262,_1263){
var els=_1262.resolveAll("s:sequence/s:element",_1263);
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
function SchemaSimpleType(_1266,_1267){
this.restrictionType=null;
this._parse(_1266,_1267);
}
SchemaSimpleType.prototype._parse=function(_1268,_1269){
var _126a=_1268.resolve("s:restriction",_1269);
if(_126a){
this.restrictionType=_126a.getAttribute("base").split(":")[1];
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
var _126d=null;
var _126e=DOMUtil.getXMLHTTPRequest();
_126e.open("get",url,false);
_126e.send(null);
if(_126e.responseXML){
_126d=_126e.responseXML.documentElement;
}else{
alert(_126e.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _126d;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _126f=new List();
var _1270=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1270.hasEntries()){
while(_1270.hasNext()){
var _1271=_1270.getNext();
var name=_1271.getAttribute("name");
_126f.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _126f;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1274,_1275,_1276){
this.name=name;
this.address=_1274;
this.encoder=_1275;
this.decoder=_1276;
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
var _127a=wsdl.getOperations();
_127a.each(function(_127b){
proxy[_127b.name]=WebServiceProxy.createProxyOperation(_127b);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_127c,_127d){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_127d){
var log=_127d instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_127c.address+": "+_127c.name+"\n\n";
log+=DOMSerializer.serialize(_127d.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_127f){
return function(){
var _1280=new List(arguments);
var _1281=null;
if(typeof (_1280.getLast())=="function"){
var _1282=_1280.extractLast();
var _1283=_127f.encoder.encode(_1280);
this._log(_127f,_1283);
var self=this;
var _1285=_1283.asyncInvoke(_127f.address,function(_1286){
self._log(_127f,_1286);
if(_1286){
if(_1286.fault){
_1281=SOAPFault.newInstance(_127f,_1286.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1281,_1283,_1286);
}
}else{
if(WebServiceProxy.isDOMResult){
_1281=_1286.document;
}else{
_1281=_127f.decoder.decode(_1286);
}
}
}
_1283.dispose();
_1282(_1281);
});
}else{
var _1283=_127f.encoder.encode(new List(arguments));
this._log(_127f,_1283);
var _1285=_1283.invoke(_127f.address);
this._log(_127f,_1285);
if(_1285){
if(_1285.fault){
_1281=SOAPFault.newInstance(_127f,_1285.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1281,_1283,_1285);
}
}else{
if(WebServiceProxy.isDOMResult){
_1281=_1285.document;
}else{
_1281=_127f.decoder.decode(_1285);
}
}
}
_1283.dispose();
return _1281;
}
};
};
WebServiceProxy.handleFault=function(_1287,_1288,_1289){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1287,soapRequest:_1288,soapResponse:_1289});
}
catch(exception){
alert(_1287.getFaultString());
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
var _128a=SystemLogger.getLogger("MessageQueue");
var _128b=null;
var _128c=0;
var _128d=null;
var _128e=new Map();
var _128f=new Map();
var _1290=false;
var _1291=false;
var _1292=false;
var _1293=false;
var _1294={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_128b=ConsoleMessageQueueService;
_128c=_128b.GetCurrentSequenceNumber("dummyparam!");
this.index=_128c;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1290){
if(!MessageQueue._actions.hasEntries()){
var _1295=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1291=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1295;
_1291=false;
}
}
}
};
this._pokeserver=function(){
if(_1290==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_1296){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1291);
this._updateMessages(_1296);
}
};
this._updateMessages=function(_1297){
if(_1292){
_1293=true;
}else{
_1292=true;
var self=this;
var _1299=function(_129a){
if(_129a!=null){
if(Types.isDefined(_129a.CurrentSequenceNumber)){
var _129b=_129a.CurrentSequenceNumber;
if(_129b<self.index){
_128a.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_129b);
}
self.index=_129b;
var _129c=new List(_129a.ConsoleActions);
if(_129c.hasEntries()){
self.evaluate(_129c);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_128a.error("No sequencenumber in MessageQueue response!");
}
}
_1292=false;
if(_1293){
_1293=false;
self._updateMessages();
}
};
if(_1297){
_1299(_128b.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_128b.GetMessages(Application.CONSOLE_ID,this.index,_1299);
}
}
};
this.evaluate=function(_129d){
var _129e=new List();
if(_129d.hasEntries()){
_129d.each(function(_129f){
if(this._index[_129f.Id]!=true){
_129e.add(_129f);
}
this._index[_129f.Id]=true;
},this);
if(_129e.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_129e);
}else{
this._actions=_129e;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_12a0){
var _12a1="(No reason)";
if(_12a0!=null){
_12a1=_12a0.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_12a1);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12a5){
if(_12a5==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12a6=null;
if(this._actions.hasEntries()){
var _12a7=this._actions.extractFirst();
_128c=_12a7.SequenceNumber;
_128a.debug("MessageQueue action: "+_12a7.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_128c+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12a7.ActionType){
case "OpenView":
_12a6=_12a7.OpenViewParams;
if(_12a6.ViewType=="ModalDialog"){
openDialogView(_12a6);
}else{
_128d=_12a6.ViewId;
openView(_12a6);
}
break;
case "CloseView":
_12a6=_12a7.CloseViewParams;
_128d=_12a6.ViewId;
closeView(_12a6);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12a7.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_128e.countEntries()+"\n";
_128e.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_128a.debug(debug);
if(!_128e.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12a7.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12a7.MessageBoxParams);
break;
case "OpenViewDefinition":
_12a6=_12a7.OpenViewDefinitionParams;
_128d=_12a6.Handle;
openViewDefinition(_12a6);
break;
case "LogEntry":
logEntry(_12a7.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12a6=_12a7.BroadcastMessageParams;
_128a.debug("Server says: EventBroadcaster.broadcast ( \""+_12a6.Name+"\", "+_12a6.Value+" )");
EventBroadcaster.broadcast(_12a6.Name,_12a6.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_128e.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12a7.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12a7.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12a7.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12a6=_12a7.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12a6.ViewId,entityToken:_12a6.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12a6=_12a7.OpenGenericViewParams;
openGenericView(_12a6);
break;
case "OpenExternalView":
_12a6=_12a7.OpenExternalViewParams;
openExternalView(_12a6);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12a7.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1291);
}
function logEntry(_12aa){
var _12ab=_12aa.Level.toLowerCase();
SystemLogger.getLogger(_12aa.SenderId)[_12ab](_12aa.Message);
}
function openView(_12ac){
var list=paramsToList(_12ac.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12ac.ViewId);
def.entityToken=_12ac.EntityToken;
def.flowHandle=_12ac.FlowHandle;
def.position=_1294[_12ac.ViewType],def.label=_12ac.Label;
def.image=_12ac.Image;
def.toolTip=_12ac.ToolTip;
def.argument={"url":_12ac.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12ac.ViewId,entityToken:_12ac.EntityToken,flowHandle:_12ac.FlowHandle,position:_1294[_12ac.ViewType],url:_12ac.Url,label:_12ac.Label,image:_12ac.Image,toolTip:_12ac.ToolTip}));
}
}
function openDialogView(_12af){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12af.ViewId,flowHandle:_12af.FlowHandle,position:Dialog.MODAL,url:_12af.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12b0){
var _12b1=_12b0.DialogType.toLowerCase();
if(_12b1=="question"){
throw "Not supported!";
}else{
Dialog[_12b1](_12b0.Title,_12b0.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12b2){
var map={};
var _12b4=false;
new List(_12b2.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12b4=true;
});
var proto=ViewDefinitions[_12b2.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12b2.ViewId;
}
def.argument=_12b4?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12b9){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12b9.ViewId);
def.label=_12b9.Label;
def.toolTip=_12b9.ToolTip;
def.image=_12b9.Image;
def.argument={"url":_12b9.Url,"list":paramsToList(_12b9.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12bb){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12bb.ViewId);
def.label=_12bb.Label;
def.toolTip=_12bb.ToolTip;
def.image=_12bb.Image;
def.url=_12bb.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12bd){
if(StageBinding.isViewOpen(_12bd.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12bd.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12be){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12be.ViewId,isSuccess:_12be.Succeeded});
}
this._lockSystem=function(_12bf){
var _12c0=top.bindingMap.offlinetheatre;
if(_12bf){
_12c0.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12c0.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1290=_12bf;
};
this.handleBroadcast=function(_12c2,arg){
switch(_12c2){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_128d!=null&&arg==_128d){
_128d=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_128e.set(arg,true);
}else{
_128a.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_128e.hasEntries()){
_128e.del(arg);
_128a.debug("Refreshed tree: "+arg+"\n("+_128e.countEntries()+" trees left!)");
if(!_128e.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_128f.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_128f.hasEntries()==true){
_128f.del(arg);
if(!_128f.hasEntries()){
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
function paramsToList(_12c4){
var list=new List();
new List(_12c4).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12c7=false;
var _12c8=null;
var _12c9=false;
var _12ca=Client.qualifies();
var _12cb="admin";
var _12cc="123456";
if(!_12ca){
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
this.handleBroadcast=function(_12cd){
switch(_12cd){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12cd);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _12ce=window.bindingMap.appwindow;
_12ce.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_12cf){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12d0){
if(_12cf){
EventBroadcaster.subscribe(_12d0,KickStart);
}else{
EventBroadcaster.unsubscribe(_12d0,KickStart);
}
});
}
function kickStart(_12d1){
switch(_12d1){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12c7=true;
break;
}
if(_12c7){
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
DataManager.getDataBinding("username").setValue(_12cb);
DataManager.getDataBinding("password").setValue(_12cc);
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
this.doLogin=function(_12d4,_12d5){
var _12d6=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12d7=false;
var _12d8=LoginService.ValidateAndLogin(_12d4,_12d5);
if(_12d8 instanceof SOAPFault){
alert(_12d8.getFaultString());
}else{
_12d7=_12d8;
}
if(_12d7){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_12d6){
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
var _12d9=DataManager.getDataBinding("username");
var _12da=DataManager.getDataBinding("password");
_12d9.blur();
_12da.blur();
_12d9.setValue("");
_12da.setValue("");
_12d9.clean();
_12da.clean();
_12d9.focus();
document.getElementById("loginerror").style.display="block";
var _12db={handleAction:function(_12dc){
document.getElementById("loginerror").style.display="none";
_12dc.target.removeActionListener(Binding.ACTION_DIRTY,_12db);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12db);
}
WindowManager.fireOnLoad(this);
if(!_12ca){
UpdateManager.isEnabled=false;
}
};

