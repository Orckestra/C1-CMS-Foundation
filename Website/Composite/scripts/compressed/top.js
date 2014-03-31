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
PopupSetBinding.newInstance=function(_701){
var _702=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_701);
return UserInterface.registerBinding(_702,PopupSetBinding);
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
PopupBinding.handleBroadcast=function(_703,arg){
switch(_703){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _707=PopupBinding.activeInstances.get(key);
var _708=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_707);
if(!_708){
list.add(_707);
}
});
list.each(function(_709){
_709.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _70b=PopupBinding.activeInstances.get(key);
_70b.hide();
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
var _70c=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _70d=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_70c){
this._bodyBinding=UserInterface.getBinding(_70c);
}else{
if(_70d){
this._bodyBinding=UserInterface.getBinding(_70d);
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
var _70e=this.getProperty("position");
this.position=_70e?_70e:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_70f){
var _710=null;
if(this._bodyBinding){
this._bodyBinding.add(_70f);
_710=_70f;
}else{
_710=PopupBinding.superclass.add.call(this,_70f);
}
return _710;
};
PopupBinding.prototype.addFirst=function(_711){
var _712=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_711);
_712=_711;
}else{
_712=PopupBinding.superclass.addFirst.call(this,_711);
}
return _712;
};
PopupBinding.prototype.handleAction=function(_713){
PopupBinding.superclass.handleAction.call(this,_713);
var _714=_713.target;
switch(_713.type){
case Binding.ACTION_ATTACHED:
if(_714 instanceof MenuItemBinding){
this._count(true);
_713.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_714 instanceof MenuItemBinding){
this._count(false);
_713.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_715){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_715?1:-1);
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
PopupBinding.prototype.snapTo=function(_716){
var _717=this._getElementPosition(_716);
switch(this.position){
case PopupBinding.POSITION_TOP:
_717.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_717.x+=_716.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_717.y+=_716.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_717.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_716;
this.bindingElement.style.display="block";
this.setPosition(_717.x,_717.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_719){
this.bindingElement.style.display="block";
this.setPosition(_719.x,_719.y);
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
PopupBinding.prototype._getElementPosition=function(_71e){
return _71e.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_71e):DOMUtil.getUniversalPosition(_71e);
};
PopupBinding.prototype._getMousePosition=function(e){
var _720=DOMEvents.getTarget(e);
return _720.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_721){
var _722=this.bindingElement;
if(_721){
_722.style.visibility="visible";
}else{
_722.style.visibility="hidden";
_722.style.display="none";
}
this.isVisible=_721;
};
PopupBinding.prototype._enableTab=function(_723){
var self=this;
var _725=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_725.each(function(_726){
_726.bindingElement.tabIndex=_723?0:-1;
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
var _72e=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_72e.y<0){
y=-_72e.y;
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
PopupBinding.prototype.grabKeyboard=function(_730){
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
var _736=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_736=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _736;
};
PopupBinding.prototype.clear=function(){
var _737=this._bodyBinding;
if(_737){
_737.detachRecursive();
_737.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_738){
var _739=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_738);
return UserInterface.registerBinding(_739,PopupBinding);
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
PopupBodyBinding.newInstance=function(_73b){
var _73c=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_73b);
return UserInterface.registerBinding(_73c,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_73d){
return new Point(_73d.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_73e){
var _73f=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_73e);
return UserInterface.registerBinding(_73f,MenuPopupBinding);
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
var _740=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_740){
this._body=UserInterface.getBinding(_740);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _741=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_741.hasNext()){
var _742=DialogBorderBinding.newInstance(this.bindingDocument);
_742.setType(_741.getNext());
this.add(_742);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _743=this.getProperty("controls");
if(_743){
var _744=new List(_743.split(" "));
while(_744.hasNext()){
var type=_744.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _746=DialogControlBinding.newInstance(this.bindingDocument);
_746.setControlType(type);
this._titlebar.addControl(_746);
this.controlBindings[type]=_746;
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
var _747=this.getProperty("image");
var _748=this.getProperty("label");
var _749=this.getProperty("draggable");
var _74a=this.getProperty("resizable");
var _74b=this.getProperty("modal");
if(_747){
this.setImage(_747);
}
if(_748){
this.setLabel(_748);
}
if(_749==false){
this.isDialogDraggable=false;
}
if(_74a==false){
this.isPanelResizable=false;
}
if(_74b==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_74c){
this.isModal=_74c;
};
DialogBinding.prototype.setLabel=function(_74d){
this.setProperty("label",_74d);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_74d));
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
DialogBinding.prototype.handleAction=function(_74f){
DialogBinding.superclass.handleAction.call(this,_74f);
switch(_74f.type){
case Binding.ACTION_DRAG:
var _750=_74f.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_750.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_750.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_750;
_750.dragger.registerHandler(this);
}
break;
}
}
_74f.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_74f.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_751,arg){
DialogBinding.superclass.handleBroadcast.call(this,_751,arg);
switch(_751){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_753){
DialogBinding.superclass.handleInvokedControl.call(this,_753);
switch(_753.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_754){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_754){
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
var _756=self.bindingElement;
setTimeout(function(){
_756.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_757){
this.bindingElement.style.zIndex=new String(_757);
};
DialogBinding.prototype.onDragStart=function(_758){
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
DialogBinding.prototype.setResizable=function(_76a){
if(this._isResizable!=_76a){
if(_76a){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_76a;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _76b=null;
var _76c=this.bindingDocument.body.offsetWidth;
var _76d=this.bindingDocument.body.offsetHeight;
_76b={x:0.125*_76c,y:0.125*_76d,w:0.75*_76c,h:0.5*_76d};
return _76b;
};
DialogBinding.prototype.centerOnScreen=function(){
var _76e=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_76e.w-dim.w),0.5*(_76e.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _770=this;
var i=0;
function blink(){
if(i%2==0){
_770.detachClassName("active");
}else{
_770.attachClassName("active");
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
var _774="";
while(list.hasNext()){
var type=list.getNext();
_774+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_774);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_775){
var _776=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_775);
return UserInterface.registerBinding(_776,DialogBinding);
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
DialogHeadBinding.newInstance=function(_777){
var _778=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_777);
return UserInterface.registerBinding(_778,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_77b){
var _77c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_77b);
return UserInterface.registerBinding(_77c,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_77d){
var _77e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_77d);
return UserInterface.registerBinding(_77e,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_77f){
DialogSetBinding.superclass.handleAction.call(this,_77f);
var _780=_77f.target;
switch(_77f.type){
case Binding.ACTION_MOVETOTOP:
if(_780 instanceof DialogBinding){
this._moveToTop(_780);
}
break;
case Binding.ACTION_MOVEDONTOP:
_77f.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_781){
var _782=0;
var _783=this.getChildBindingsByLocalName("dialog");
_783.each(function(_784){
var _785=_784.getZIndex();
_782=_785>_782?_785:_782;
});
_781.setZIndex(_782+2);
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
DialogBorderBinding.newInstance=function(_787){
var _788=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_787);
return UserInterface.registerBinding(_788,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_789){
this._dialogBinding=_789;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_78b){
DialogCoverBinding.superclass.handleAction.call(this,_78b);
var _78c=_78b.target;
if(this._dialogBinding.isModal){
switch(_78b.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_78c==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_78c.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_78d,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_78d,arg);
switch(_78d){
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
var _790=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_790);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _791=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_791);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_792){
var _793=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_792);
return UserInterface.registerBinding(_793,DialogCoverBinding);
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
var _794=this.getProperty("image");
if(_794){
this.setImage(_794);
}
var _795=this.getProperty("label");
if(_795){
this.setLabel(_795);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_796){
if(this.isAttached){
this.labelBinding.setLabel(_796);
}
this.setProperty("label",_796);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_798){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_798);
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
DialogTitleBarBinding.newInstance=function(_799){
var _79a=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_799);
return UserInterface.registerBinding(_79a,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_79b){
var _79c=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_79b);
return UserInterface.registerBinding(_79c,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_79d){
var _79e=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_79d);
return UserInterface.registerBinding(_79e,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_79f){
this.binding=_79f;
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
var _7a2=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a3=node.nodeName.toLowerCase();
switch(_7a3){
case "script":
case "style":
case "textarea":
_7a2=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7a2;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7aa=true;
if(exp.test(text)){
self._textnodes.add(node);
_7aa=false;
}
return _7aa;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7ab,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7ab,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7af=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7af+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b5){
var _7b6="";
var _7b7="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b8="</span>";
var self=this;
function iterate(_7ba){
var _7bb=-1;
var _7bc=null;
self._map.each(function(key,exp){
var low=_7ba.toLowerCase();
var _7c0=low.search(exp);
if(_7c0>-1){
if(_7bb==-1){
_7bb=_7c0;
}
if(_7c0<=_7bb){
_7bb=_7c0;
_7bc=key;
}
}
});
if(_7bb>-1&&_7bc!=null){
var pre=_7ba.substring(0,_7bb);
var hit=_7ba.substring(_7bb,_7bb+_7bc.length);
var pst=_7ba.substring(_7bb+_7bc.length,_7ba.length);
_7b6+=pre+_7b7+hit+_7b8;
iterate(pst);
}else{
_7b6+=_7ba;
}
}
iterate(_7b5);
return _7b6;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c4){
var _7c5=new List(_7c4.getElementsByTagName("span"));
_7c5.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c4.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c8){
var _7c9=null;
if(_7c8.isAttached){
var doc=_7c8.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c9=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c9 instanceof SOAPFault){
_7c9=null;
}
}
}
return _7c9;
};
WindowBinding.highlightKeywords=function(_7cd,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7cd.isAttached){
var doc=_7cd.getContentDocument();
if(doc!=null){
var _7d0=WindowBinding._highlightcrawler;
_7d0.reset(doc.body);
if(list!=null){
_7d0.setKeys(list);
_7d0.crawl(doc.body);
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
var _7d1=WindowBinding.superclass.serialize.call(this);
if(_7d1){
_7d1.url=this.getURL();
}
return _7d1;
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
var _7d3=this.getContentWindow().DocumentManager;
if(_7d3!=null){
_7d3.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d4){
WindowBinding.superclass.handleAction.call(this,_7d4);
var _7d5=_7d4.target;
switch(_7d4.type){
case RootBinding.ACTION_PHASE_3:
if(_7d5.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d5);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d4.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7d6){
if(!this.isFit||_7d6){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7d7){
if(this._pageBinding==null){
if(_7d7.bindingWindow==this.getContentWindow()){
this._pageBinding=_7d7;
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
WindowBinding.prototype._registerOnloadListener=function(_7d8){
var _7d9=this.shadowTree.iframe;
var _7da=_7d8?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7dd=true;
if(Client.isExplorer){
_7dd=_7d9.readyState=="complete";
}
if(_7dd==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7da](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7de){
var _7df=_7de?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7df](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7e4=new Uri(Resolver.resolve(url));
if(!data){
data=new Map();
}
_7e4.getQueryString().each(function(name,_7e6){
if(_7e6.length>512){
data.set(name,_7e6);
_7e4.setParam(name,null);
}
});
url=_7e4.toString();
}
if(data){
var self=this;
var _7e8=this.getFrameElement();
if(typeof this.shadowTree.form=="undefined"){
this.shadowTree.form=DOMUtil.createElementNS(Constants.NS_XHTML,"form",this.bindingDocument);
this.shadowTree.form.style.display="none";
this.shadowTree.form.enctype="application/x-www-form-urlencoded";
this.shadowTree.form.method="POST";
this.bindingElement.appendChild(this.shadowTree.form);
}
var form=this.shadowTree.form;
form.action=url;
form.target=_7e8.id;
form.setAttribute("target",_7e8.id);
while(form.firstChild){
form.removeChild(form.firstChild);
}
data.each(function(name,_7eb){
var _7ec=self.bindingDocument.createElement("input");
_7ec.name=name;
_7ec.value=_7eb;
_7ec.type="hidden";
form.appendChild(_7ec);
});
form.submit();
}else{
this.getFrameElement().src=Resolver.resolve(url);
}
}
};
WindowBinding.prototype.getURL=function(){
var _7ed=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7ed=url;
}
return _7ed;
};
WindowBinding.prototype.reload=function(_7ef){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7f0=null;
if(this.shadowTree.iframe!=null){
_7f0=this.shadowTree.iframe;
}
return _7f0;
};
WindowBinding.prototype.getContentWindow=function(){
var _7f1=null,_7f2=this.getFrameElement();
if(_7f2!==null){
try{
_7f1=_7f2.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7f1;
};
WindowBinding.prototype.getContentDocument=function(){
var _7f3=null,win=this.getContentWindow();
if(win){
_7f3=win.document;
}
return _7f3;
};
WindowBinding.prototype.getRootBinding=function(){
var _7f5=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7f5=UserInterface.getBinding(doc.body);
}
return _7f5;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7f7){
this.bindingElement.style.height=_7f7+"px";
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
WindowBinding.prototype.handleCrawler=function(_7f8){
WindowBinding.superclass.handleCrawler.call(this,_7f8);
if(_7f8.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7f8.nextNode=root.bindingElement;
}else{
_7f8.response=NodeCrawler.SKIP_CHILDREN;
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
var _7fd=this.getContentWindow();
if(_7fd!=null&&_7fd.document!=null&&_7fd.document.body!=null){
_7fd.document.body.style.height=this.bindingElement.offsetHeight+"px";
}
}
};
WindowBinding.newInstance=function(_7fe){
var _7ff=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7fe);
var _800=UserInterface.registerBinding(_7ff,WindowBinding);
return _800;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_804){
_804.target.show();
_804.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_806){
_806.target.show();
_806.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_808){
PreviewWindowBinding.superclass.handleAction.call(this,_808);
switch(_808.type){
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
var _809=null;
this._getRadioButtonBindings().each(function(_80a){
if(_80a.getProperty("ischecked")){
_809=_80a;
return false;
}else{
return true;
}
});
if(_809){
this._checkedRadioBinding=_809;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_80b){
RadioGroupBinding.superclass.handleAction.call(this,_80b);
var _80c=_80b.target;
switch(_80b.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_80b.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_80c.isRadioButton&&!_80c.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_80c);
}
this._checkedRadioBinding=_80c;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_80b.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_80d,_80e){
if(_80d instanceof RadioDataBinding){
_80d=_80d.getButton();
}
if(_80d.isRadioButton){
switch(_80e){
case true:
this._unCheckRadioBindingsExcept(_80d);
this._checkedRadioBinding=_80d;
_80d.check(true);
break;
default:
_80d.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_80f){
var _810=this._getRadioButtonBindings();
_810.each(function(_811){
if(_811.isChecked&&_811!=_80f){
_811.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _812=new Crawler();
var list=new List();
_812.addFilter(function(_814){
var _815=true;
var _816=UserInterface.getBinding(_814);
if(_816 instanceof RadioGroupBinding){
_815=NodeCrawler.SKIP_CHILDREN;
}else{
if(_816 instanceof ButtonBinding&&_816.isRadioButton){
list.add(_816);
}
}
return _815;
});
_812.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_817){
var _818=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_817);
return UserInterface.registerBinding(_818,RadioGroupBinding);
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
var _81a=this.getProperty("regexrule");
if(_81a!=null){
this.expression=new RegExp(_81a);
}
var _81b=this.getProperty("onbindingblur");
if(_81b!=null){
this.onblur=function(){
Binding.evaluate(_81b,this);
};
}
var _81c=this.getProperty("onvaluechange");
if(_81c!=null){
this.onValueChange=function(){
Binding.evaluate(_81c,this);
};
}
if(this.error==null&&this.type!=null){
var _81d=DataBinding.errors[this.type];
if(_81d!=null){
this.error=_81d;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _81e=this.getProperty("value");
if(_81e!=null){
this.setValue(String(_81e));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _820=this.getProperty("isdisabled");
if(_820==true){
this.setDisabled(true);
}
var _821=this.getProperty("readonly");
if(_821==true){
this.setReadOnly(true);
}
var _822=this.getProperty("autoselect");
if(_822==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _823=Localization.currentLang();
if(_823!=null){
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
var _824=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_824.type=this.isPassword==true?"password":"text";
_824.tabIndex=-1;
return _824;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_827){
if(_827){
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
DataInputBinding.prototype.focus=function(_829){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_829){
var self=this,_82b=this.bindingElement,_82c={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_82b,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_82b,DOMEvents.MOUSEUP,_82c);
}else{
this.select();
}
}
this.onfocus();
if(!_829){
var _82d=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_82d);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _82e=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _82f=_82e.createTextRange();
_82f.moveStart("character",0);
_82f.moveEnd("character",_82e.value.length);
_82f.select();
}else{
_82e.setSelectionRange(0,_82e.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_830){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_830){
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
DataInputBinding.prototype.validate=function(_834){
if(_834==true||this._isValid){
var _835=this.isValid();
if(_835!=this._isValid){
this._isValid=_835;
if(!_835){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _836=null;
if(this._isInvalidBecauseRequired==true){
_836=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_836=DataBinding.warnings["minlength"];
_836=_836.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_836=DataBinding.warnings["maxlength"];
_836=_836.replace("${count}",String(this.maxlength));
}else{
_836=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_836!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_836);
}
}else{
this.setValue(_836);
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
var _837=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _838=this.getValue();
if(_838==""){
if(this.isRequired==true){
_837=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _839=DataBinding.expressions[this.type];
if(!_839.test(_838)){
_837=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_838)){
_837=false;
}
}
}
}
if(_837&&this.minlength!=null){
if(_838.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_837=false;
}
}
if(_837&&this.maxlength!=null){
if(_838.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_837=false;
}
}
return _837;
};
DataInputBinding.prototype.setDisabled=function(_83a){
if(_83a!=this.isDisabled){
if(_83a){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _83b=this.shadowTree.input;
if(_83a){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_83b,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_83b,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_83a;
this.shadowTree.input.unselectable=_83a?"on":"off";
}
this.isDisabled=_83a;
this.isFocusable=!_83a;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_83d){
if(_83d!=this.isReadOnly){
if(_83d){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_83d;
this.isReadOnly=_83d;
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
DataInputBinding.prototype.handleElement=function(_83e){
return true;
};
DataInputBinding.prototype.updateElement=function(_83f){
var _840=_83f.getAttribute("value");
var _841=_83f.getAttribute("type");
var _842=_83f.getAttribute("maxlength");
var _843=_83f.getAttribute("minlength");
var _844=_83f.getAttribute("required")==="true";
if(_840==null){
_840="";
}
var _845=this.bindingWindow.UpdateManager;
if(this.getValue()!=_840){
_845.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_840);
}
if(this.type!=_841){
_845.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_841;
}
if(this.maxlength!=_842){
_845.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_842;
}
if(this.minlength!=_843){
_845.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_843;
}
if(this.isRequired!=_844){
_845.report("Property [required] updated on binding \""+this.getID()+"\"");
this.isRequired=_844;
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
DataInputBinding.prototype.setValue=function(_846){
if(_846===null){
_846="";
}
if(_846!=this.getValue()){
this.setProperty("value",_846);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_846);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _847=null;
if(this.shadowTree.input!=null){
_847=this.shadowTree.input.value;
}else{
_847=this.getProperty("value");
}
return _847;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _849=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_849=Number(_849);
break;
}
return _849;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_84a){
var _84b=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_84a);
return UserInterface.registerBinding(_84b,DataInputBinding);
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
var _84c=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_84c!=null){
this.setValue(_84c.value);
_84c.parentNode.removeChild(_84c);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _84d=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_84d.tabIndex=-1;
return _84d;
};
TextBoxBinding.prototype.handleElement=function(_84e){
return true;
};
TextBoxBinding.prototype.updateElement=function(_84f){
var _850,area=_84f.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_850=DOMUtil.getTextContent(area);
}
if(_850==null){
_850="";
}
var _852=this.bindingWindow.UpdateManager;
if(this.getValue()!=_850){
_852.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_850);
}
var _853=_84f.getAttribute("type");
if(this.type!=_853){
_852.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_853;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_857){
var _858=this.bindingDocument.selection.createRange();
var _859=_858.text=="";
if(_859&&!_857){
_858.text="\t";
}else{
var text="";
var _85b=_858.text.length;
while((_858.moveStart("word",-1)&&_858.text.charAt(1)!="\n")){
}
_858.moveStart("character",1);
var _85c=0;
var i=0,line,_85f=_858.text.split("\n");
while((line=_85f[i++])!=null){
if(_857){
line=line.replace(/^(\s)/mg,"");
_85c++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_85f[i+1]?"\n":"");
}
_858.text=text;
_858.moveStart("character",-_85b);
if(_857){
_858.moveStart("character",2*_85f.length-2);
}
_858.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _860=this.bindingDocument.selection.createRange();
var _861=_860.duplicate();
while((_861.moveStart("word",-1)&&_861.text.indexOf("\n")==-1)){
}
_861.moveStart("character",1);
_860.text="\n"+_861.text.match(/^(\s)*/)[0]+"!";
_860.moveStart("character",-1);
_860.select();
_860.text="";
_860.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_862){
var _863;
var _864;
var oss;
var osy;
var i;
var fnd;
var _869=this._getSelectedText();
var el=this.shadowTree.input;
_863=el.scrollLeft;
_864=el.scrollTop;
if(!_869.match(/\n/)){
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
_869=this._getSelectedText();
if(_862){
ntext=_869.replace(/^(\s)/mg,"");
}else{
ntext=_869.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_869.length);
}
el.scrollLeft=_863;
el.scrollTop=_864;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _86b;
var _86c;
var oss;
var osy;
var el=this.shadowTree.input;
_86b=el.scrollLeft;
_86c=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_86b;
el.scrollTop=_86c;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _873=this.shadowTree.input.value;
var _874=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _873.substr(_874,end-_874);
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
var _876=this.getProperty("isdisabled");
if(this.isDisabled||_876){
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
var _878=this.getProperty("label");
var _879=this.getProperty("value");
var _87a=this.getProperty("width");
var _87b=this.getProperty("onchange");
var _87c=this.getProperty("required")==true;
var _87d=this.getProperty("local");
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_878!=null){
this.label=_878;
}
if(!this.value&&_879!=null){
this.value=_879;
}
if(!this.width&&_87a){
this.width=_87a;
}
if(_87c){
this.isRequired=true;
}
if(_87d){
this._isLocal=true;
}
if(_87b){
this.onValueChange=function(){
Binding.evaluate(_87b,this);
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
var _87e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_87e.name=this.getName();
_87e.value=this.getValue();
_87e.type="hidden";
if(this.hasCallBackID()){
_87e.id=this.getCallBackID();
}
this.shadowTree.input=_87e;
this.bindingElement.appendChild(_87e);
};
SelectorBinding.prototype.buildButton=function(){
var _87f=this.BUTTON_IMPLEMENTATION;
var _880=this.add(_87f.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_880.imageProfile=this.imageProfile;
}
if(this.width!=null){
_880.setWidth(this.width);
}
this._buttonBinding=_880;
this.shadowTree.button=_880;
_880.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.labelBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _882;
if(this._isLocal){
if(!this.bindingWindow.bindingMap.selectorpopupset){
var _883=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupset",this.bindingDocument);
_883.id="selectorpopupset";
_882=UserInterface.registerBinding(_883,PopupSetBinding);
this.bindingDocument.body.appendChild(_882.bindingElement);
}else{
_882=this.bindingWindow.bindingMap.selectorpopupset;
}
}else{
_882=top.app.bindingMap.selectorpopupset;
}
var doc=_882.bindingDocument;
var _885=_882.add(PopupBinding.newInstance(doc));
var _886=_885.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_885;
this._menuBodyBinding=_886;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_885.attachClassName("selectorpopup");
_885.addActionListener(PopupBinding.ACTION_SHOW,this);
_885.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_885.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_885);
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
var _889=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_889).each(function(_88a){
var _88b=_88a.getAttribute("label");
var _88c=_88a.getAttribute("value");
var _88d=_88a.getAttribute("selected");
var _88e=_88a.getAttribute("image");
var _88f=_88a.getAttribute("image-hover");
var _890=_88a.getAttribute("image-active");
var _891=_88a.getAttribute("image-disabled");
var _892=null;
if(_88e||_88f||_890||_891){
_892=new ImageProfile({image:_88e,imageHover:_88f,imageActive:_890,imageDisabled:_891});
}
list.add(new SelectorBindingSelection(_88b?_88b:null,_88c?_88c:null,_88d&&_88d=="true",_892));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _894=null;
while(list.hasNext()){
var _895=list.getNext();
var item=this.addSelection(_895);
if(_895.isSelected){
this.select(item,true);
}
if(!_894){
_894=item;
}
}
if(!this._selectedItemBinding){
this.select(_894,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_897,_898){
var _899=this.MENUITEM_IMPLEMENTATION;
var _89a=this._menuBodyBinding;
var _89b=_89a.bindingDocument;
var _89c=_899.newInstance(_89b);
_89c.imageProfile=_897.imageProfile;
_89c.setLabel(_897.label);
if(_897.tooltip!=null){
_89c.setToolTip(_897.tooltip);
}
_89c.selectionValue=_897.value;
_897.menuItemBinding=_89c;
if(_898){
_89a.addFirst(_89c);
this.selections.addFirst(_897);
}else{
_89a.add(_89c);
this.selections.add(_897);
}
this._isUpToDate=false;
return _89c;
};
SelectorBinding.prototype.addSelectionFirst=function(_89d){
return this.addSelection(_89d,true);
};
SelectorBinding.prototype.clear=function(_89e){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_89e&&this.defaultSelection!=null){
var _89f=this.addSelection(this.defaultSelection);
this.select(_89f,true);
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
SelectorBinding.prototype.setDisabled=function(_8a0){
if(this.isAttached==true){
var _8a1=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_8a0?"none":"block";
_8a1.setDisabled(_8a0);
}
if(_8a0){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_8a2){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_8a2);
}
};
SelectorBinding.prototype.handleAction=function(_8a3){
SelectorBinding.superclass.handleAction.call(this,_8a3);
switch(_8a3.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_8a3.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_8a3.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_8a3.target);
_8a3.consume();
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
_8a3.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_8a5){
this.select(_8a5);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _8a6=this._buttonBinding.bindingElement.offsetWidth+"px";
var _8a7=this._popupBinding.bindingElement;
_8a7.style.minWidth=_8a6;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _8a9=Client.isExplorer?e.keyCode:e.which;
if(_8a9==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _8a9=Client.isExplorer?e.keyCode:e.which;
if(_8a9>=32){
this._buttonBinding.check();
var _8aa=String.fromCharCode(_8a9);
this._pushSearchSelection(_8aa);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_8ab){
this._searchString+=_8ab.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8ac){
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
var _8ad=this._menuBodyBinding;
if(_8ad!=null){
var _8ae=this.MENUITEM_IMPLEMENTATION;
var _8af=_8ad.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8b1=list.getNext();
if(_8b1.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8b1);
}
}
}
this._attachSelections();
var _8b2=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8b3=_8ad.getDescendantBindingsByType(_8ae);
if(_8b3.hasEntries()){
while(_8b3.hasNext()){
var _8b4=_8b3.getNext();
var _8b5=_8b4.labelBinding;
if(_8b5!=null&&_8b5.shadowTree!=null&&_8b5.shadowTree.labelText!=null){
_8b5.shadowTree.labelText.innerHTML=_8b5.shadowTree.labelText.innerHTML.replace(_8b2,"<b>$&</b>");
}
}
_8b3.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8b5=LabelBinding.newInstance(_8af);
_8b5.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8ad.add(_8b5);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8b1=list.getNext();
var item=this.addSelection(_8b1);
if(this._selectionValue==_8b1.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8b7,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8b7,arg);
switch(_8b7){
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
SelectorBinding.prototype.select=function(_8ba,_8bb){
var _8bc=false;
if(_8ba!=this._selectedItemBinding){
this._selectedItemBinding=_8ba;
_8bc=true;
var _8bd=this._buttonBinding;
this._selectionValue=_8ba.selectionValue;
this._selectionLabel=_8ba.getLabel();
_8bd.setLabel(_8ba.getLabel());
if(_8ba.imageProfile!=null){
_8bd.imageProfile=_8ba.imageProfile;
}
if(_8bd.imageProfile!=null){
_8bd.setImage(this.isDisabled==true?_8bd.imageProfile.getDisabledImage():_8bd.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8bb){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8bb)){
this.validate();
}
}
return _8bc;
};
SelectorBinding.prototype._relate=function(){
var _8be=this.getProperty("relate");
if(_8be){
var _8bf=this.bindingDocument.getElementById(_8be);
if(_8bf){
var _8c0=UserInterface.getBinding(_8bf);
if(_8c0){
if(this.isChecked){
_8c0.show();
}else{
_8c0.hide();
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
SelectorBinding.prototype.selectByValue=function(_8c1,_8c2){
var _8c3=false;
var _8c4=this._menuBodyBinding;
var _8c5=_8c4.getDescendantElementsByLocalName("menuitem");
while(_8c5.hasNext()){
var _8c6=UserInterface.getBinding(_8c5.getNext());
if(_8c6.selectionValue==_8c1){
_8c3=this.select(_8c6,_8c2);
break;
}
}
return _8c3;
};
SelectorBinding.prototype.getValue=function(){
var _8c7=this._selectionValue;
if(_8c7!=null){
_8c7=String(_8c7);
}
return _8c7;
};
SelectorBinding.prototype.setValue=function(_8c8){
this.selectByValue(String(_8c8),true);
};
SelectorBinding.prototype.getResult=function(){
var _8c9=this._selectionValue;
if(_8c9=="null"){
_8c9=null;
}
if(_8c9){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8c9=Number(_8c9);
break;
}
}
return _8c9;
};
SelectorBinding.prototype.setResult=function(_8ca){
this.selectByValue(_8ca,true);
};
SelectorBinding.prototype.validate=function(){
var _8cb=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8cc=this.getValue();
if(_8cc==this.defaultSelection.value){
_8cb=false;
}
if(_8cb!=this._isValid){
if(_8cb){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8cb;
}
return _8cb;
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
var _8cd=this._popupBinding;
if(!this._isUpToDate){
_8cd.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8ce,_8cf){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8ce));
return true;
};
SelectorBinding.newInstance=function(_8d0){
var _8d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8d0);
return UserInterface.registerBinding(_8d1,SelectorBinding);
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
var _8d4=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8d4){
this.onValueChange=function(){
Binding.evaluate(_8d4,this);
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
SimpleSelectorBinding.prototype.focus=function(_8d7){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8d7){
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
SimpleSelectorBinding.prototype._hack=function(_8d8){
if(Client.isExplorer){
this._select.style.width=_8d8?"auto":this._cachewidth+"px";
if(_8d8){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8d9=true;
if(this.isRequired){
if(this.getValue()==null){
_8d9=false;
}
}
if(_8d9!=this._isValid){
if(_8d9){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8da=this._select;
var _8db=_8da.options[_8da.selectedIndex];
var text=DOMUtil.getTextContent(_8db);
_8da.blur();
_8da.style.color="#A40000";
_8da.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8db,DataBinding.warnings["required"]);
}
_8da.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8db,text);
}
};
}
this._isValid=_8d9;
}
return _8d9;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8dd=null;
var _8de=this._select;
var _8df=_8de.options[_8de.selectedIndex];
var _8e0=true;
if(Client.isExplorer){
var html=_8df.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8e0=false;
}
}
if(_8e0){
_8dd=_8df.getAttribute("value");
}
return _8dd;
};
SimpleSelectorBinding.prototype.setValue=function(_8e2){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8e3){
this.setValue(_8e3);
};
SimpleSelectorBinding.newInstance=function(_8e4){
var _8e5=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8e4);
return UserInterface.registerBinding(_8e5,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8e6,_8e7,_8e8,_8e9,_8ea){
this._init(_8e6,_8e7,_8e8,_8e9,_8ea);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8eb,_8ec,_8ed,_8ee,_8ef){
if(_8eb!=null){
this.label=String(_8eb);
}
if(_8ec!=null){
this.value=String(_8ec);
}
if(_8ee!=null){
this.imageProfile=_8ee;
}
if(_8ef!=null){
this.tooltip=_8ef;
}
this.isSelected=_8ed?true:false;
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
var _8f0=this.getProperty("image");
if(_8f0){
this.setImage(_8f0);
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
var _8f3=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8f3.popupBindingTargetElement=this.shadowTree.input;
_8f3.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8f3.attach();
var self=this;
_8f3.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8f3;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8f6=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8f6).each(function(_8f7){
if(_8f7.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8f8=_8f7.getAttribute("value");
var _8f9=_8f7.getAttribute("selected");
var _8fa=_8f7.getAttribute("tooltip");
list.add({value:_8f8?_8f8:null,toolTip:_8fa?_8fa:null,isSelected:(_8f9&&_8f9=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8fc=this._menuBodyBinding;
var _8fd=_8fc.bindingDocument;
while(_8fc.bindingElement.hasChildNodes()){
var node=_8fc.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8fc.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8ff=this.getProperty("emptyentrylabel");
if(_8ff){
var _900=MenuItemBinding.newInstance(_8fd);
_900.setLabel(_8ff);
_900.selectionValue="";
_8fc.add(_900);
}
while(list.hasNext()){
var _901=list.getNext();
var _900=MenuItemBinding.newInstance(_8fd);
_900.setLabel(_901.label?_901.label:_901.value);
_900.selectionValue=_901.value;
if(_901.image){
_900.setImage(_901.image);
}
if(_901.toolTip){
_900.setToolTip(_901.toolTip);
}
if(_901.isSelected){
this.select(_900,true);
}
_8fc.add(_900);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_902){
this.select(_902);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_903,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_903,arg);
switch(_903){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_903,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_905){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_905);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_906){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_906);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _907=this.bindingElement.offsetWidth+"px";
var _908=this._popupBinding.bindingElement;
_908.style.minWidth=_907;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _909=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _90a=this.getValue();
var _90b=null;
_909.each(function(item){
if(item.getLabel()==_90a){
_90b=item;
}
});
if(_90b){
_90b.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_90e){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_90e){
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
DataInputSelectorBinding.prototype.setValue=function(_90f){
var _910=this.isReadOnly;
var _911=null;
if(_90f!=null&&_90f!=""){
var _912=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_912.hasNext()){
var item=_912.getNext();
if(item.selectionValue==_90f){
_911=item.getLabel();
break;
}
}
}
if(_911!=null){
this.value=_90f;
this.shadowTree.input.value=_911;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_90f);
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
var _915="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_915);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_915);
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
var _917=ToolBarButtonBinding.newInstance(this.bindingDocument);
_917.setImage("${icon:popup}");
this.addFirst(_917);
_917.attach();
var self=this;
_917.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _919=self.getProperty("handle");
var _91a=ViewDefinition.clone(_919,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_91a instanceof DialogViewDefinition){
_91a.handler={handleDialogResponse:function(_91b,_91c){
self._isButtonClicked=false;
if(_91b==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _91d=_91c.getFirst();
self.setValue(_91d);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_91a.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_91a);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_917.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_917;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _91f=this._dialogButtonBinding;
if(_91f!=null){
_91f.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _921=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_921=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _921;
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
var _924=ToolBarButtonBinding.newInstance(this.bindingDocument);
_924.setImage("${icon:editor-sourceview}");
_924.bindingElement.style.left="-24px";
_924.bindingElement.style.width="24px";
this.addFirst(_924);
_924.attach();
_924.hide();
var self=this;
_924.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_924;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_925){
UrlInputDialogBinding.superclass.setValue.call(this,_925);
if(this.isAttached){
this.compositeUrl=new Uri(_925);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _926=TreeService.GetCompositeUrlLabel(_925);
if(_926!=_925){
this.setLabel(_926);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
}
};
UrlInputDialogBinding.prototype.setLabel=function(_927){
if(this.shadowTree.labelInput){
if(_927){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_927;
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
var _928=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _929=this.getProperty("image");
if(_929!=null){
_928.setImage(_929);
}else{
_928.setImage("${icon:popup}");
}
this.addFirst(_928);
_928.attach();
var self=this;
_928.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_928;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _92b=this._dialogButtonBinding;
if(_92b!=null){
_92b.oncommand();
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
var _92c=this.getProperty("required")==true;
if(_92c){
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
var _92d=this.getProperty("label");
var _92e=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_92d!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_92d+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_92d);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_92e!=null){
this._buttonBinding.setToolTip(_92e);
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
DataDialogBinding.prototype.handleAction=function(_930){
DataDialogBinding.superclass.handleAction.call(this,_930);
var _931=_930.target;
var self=this;
switch(_930.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_933,_934){
if(_933==Dialog.RESPONSE_ACCEPT){
if(_934 instanceof DataBindingMap){
self._map=_934;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_931==this._buttonBinding){
_930.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_935,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_935,arg);
switch(_935){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _938=this.getProperty("handle");
var url=this.getURL();
var _93a=null;
if(_938!=null||def!=null){
if(def!=null){
_93a=def;
}else{
_93a=ViewDefinitions[_938];
}
if(_93a instanceof DialogViewDefinition){
_93a.handler=this._handler;
if(this._map!=null){
_93a.argument=this._map;
}
StageBinding.presentViewDefinition(_93a);
}
}else{
if(url!=null){
_93a=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_93a!=null){
this._dialogViewHandle=_93a.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_93b){
this.setProperty("label",_93b);
if(this.isAttached){
this._buttonBinding.setLabel(_93b+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
DataDialogBinding.prototype.setImage=function(_93c){
this.setProperty("image",_93c);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_93c);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_93d){
this.setProperty("tooltip",_93d);
if(this.isAttached){
this._buttonBinding.setToolTip(_93d);
}
};
DataDialogBinding.prototype.setHandle=function(_93e){
this.setProperty("handle",_93e);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_940){
this._handler=_940;
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
var _941=true;
if(this.isRequired==true){
var _942=this.getValue();
if(_942==null||_942==""){
_941=false;
}
if(_941!=this._isValid){
if(_941){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_941;
}
return _941;
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
DataDialogBinding.newInstance=function(_944){
var _945=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_944);
return UserInterface.registerBinding(_945,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_947,_948){
if(_947==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_948);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_949){
_949=new String(_949);
this.dirty();
this.setValue(encodeURIComponent(_949));
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
var _94d=this.getValue();
if(_94d==null){
_94d="";
}
this.shadowTree.dotnetinput.value=_94d;
};
PostBackDataDialogBinding.prototype.setValue=function(_94e){
this.setProperty("value",_94e);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_94f){
};
PostBackDataDialogBinding.newInstance=function(_950){
var _951=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_950);
return UserInterface.registerBinding(_951,PostBackDataDialogBinding);
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
var _952=this.getProperty("dialoglabel");
var _953=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _955=this.getProperty("handle");
var _956=this.getProperty("selectedtoken");
if(_955!=null){
var def=ViewDefinition.clone(_955,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_952!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_952;
}
if(_953!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_953;
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
if(_956!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_956;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_958){
var _959=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_958);
return UserInterface.registerBinding(_959,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_95b){
self._datathing.setValue(_95b);
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
var _95e=self.getValue();
if(_95e==""||_95e==null){
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
var _95f=this.getProperty("value");
var _960=this.getProperty("selectorlabel");
if(_960==null){
_960=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_95f==null));
list.add(new SelectorBindingSelection(_960+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_95f!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _95f=this.getValue();
if(_95f==""||_95f==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_962){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_962);
switch(_962.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_962.target==this._datathing){
var _963=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_963){
self._selector.setLabel(_963);
}
},500);
_962.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_965){
this.setProperty("label",_965);
if(this._selector!=null){
this._selector.setLabel(_965);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_966){
this._datathing.setValue(_966);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_968,_969){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_968,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_96a){
this._buttonBinding.setLabel(_96a);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_96b){
this._buttonBinding.setToolTip(_96b);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_96c){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_96c);
switch(_96c.type){
case MenuItemBinding.ACTION_COMMAND:
var _96d=_96c.target;
var _96e=this.master;
if(_96d.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_96d.getLabel());
setTimeout(function(){
_96e.action();
},0);
}else{
if(_96e.getValue()){
_96e.dirty();
}
_96e.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_96f){
var _970=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_96f);
return UserInterface.registerBinding(_970,NullPostBackDataDialogSelectorBinding);
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
var _971=this._dataDialogBinding;
if(_971!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_971.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _972=this.getProperty("editable");
var _973=this.getProperty("selectable");
var _974=this.getProperty("display");
if(_972!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_973){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_974){
this._display=_974;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _975=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_975.selections=this.selections;
this.add(_975);
_975.attach();
this._dataDialogBinding=_975;
this.shadowTree.datadialog=_975;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _977=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _978=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_977=_978.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_977=_978.isSelected!=true;
break;
}
if(_977){
this.shadowTree.box.appendChild(this._getElementForSelection(_978));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_97a){
var box=this.shadowTree.box;
var _97c=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _97d=list.getNext();
if(_97a){
_97d.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_97c=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_97c=_97d.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_97c=_97d.isSelected!=true;
break;
}
}
if(_97c){
var _97e=this._getElementForSelection(_97d);
box.insertBefore(_97e,box.firstChild);
CSSUtil.attachClassName(_97e,"selected");
this._selectionMap.set(_97d.value,_97e);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_97f){
var _980=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_980.appendChild(this.bindingDocument.createTextNode(_97f.label));
_980.setAttribute("label",_97f.label);
_980.setAttribute("value",_97f.value);
return _980;
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
var _982=DOMEvents.getTarget(e);
var _983=DOMUtil.getLocalName(_982);
if(_983=="div"){
this._handleMouseDown(_982);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_984){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _985=this._getElements();
var _986=_984.getAttribute("value");
var _987=this._lastSelectedElement.getAttribute("value");
var _988=false;
while(_985.hasNext()){
var el=_985.getNext();
switch(el.getAttribute("value")){
case _986:
case _987:
_988=!_988;
break;
}
if(_988){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_984);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_984)){
this._unhilite(_984);
}else{
this._hilite(_984);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_984){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_984;
};
MultiSelectorBinding.prototype._hilite=function(_98c){
var _98d=_98c.getAttribute("value");
if(!this._selectionMap.has(_98d)){
CSSUtil.attachClassName(_98c,"selected");
this._selectionMap.set(_98d,_98c);
}
};
MultiSelectorBinding.prototype._unhilite=function(_98e){
var _98f=_98e.getAttribute("value");
if(this._selectionMap.has(_98f)){
CSSUtil.detachClassName(_98e,"selected");
this._selectionMap.del(_98f);
}
};
MultiSelectorBinding.prototype._isHilited=function(_990){
return CSSUtil.hasClassName(_990,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_991){
MultiSelectorBinding.superclass.handleAction.call(this,_991);
var _992=_991.target;
switch(_991.type){
case DataDialogBinding.ACTION_COMMAND:
if(_992==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_991.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_992.result);
this.dirty();
_992.result=null;
_991.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _993=null;
if(this.isSelectable){
_993=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_995){
if(self._isHilited(_995)){
_995.parentNode.removeChild(_995);
_993.add(new SelectorBindingSelection(_995.getAttribute("label"),_995.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _993;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _997=this._getElements();
if(!isUp){
_997.reverse();
}
var _998=true;
while(_998&&_997.hasNext()){
var _999=_997.getNext();
if(this._isHilited(_999)){
switch(isUp){
case true:
if(_999.previousSibling){
_999.parentNode.insertBefore(_999,_999.previousSibling);
}else{
_998=false;
}
break;
case false:
if(_999.nextSibling){
_999.parentNode.insertBefore(_999,_999.nextSibling.nextSibling);
}else{
_998=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _99a=new List();
var _99b=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_99d){
var _99e=new SelectorBindingSelection(_99d.getAttribute("label"),_99d.getAttribute("value"),_99b);
_99e.isHighlighted=self._isHilited(_99d);
_99a.add(_99e);
});
return _99a;
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
var _99f=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_99f.hasEntries()){
_99f.each(function(_9a0){
_9a0.parentNode.removeChild(_9a0);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _9a1=this.selections.getNext();
if(_9a1.isSelected){
var _9a2=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9a2.name=this._name;
_9a2.value=_9a1.value;
this.bindingElement.appendChild(_9a2);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_9a3){
alert(_9a3);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_9a4){
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
var _9a5={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames"),"previewtemplateid":this.getProperty("previewtemplateid"),"previewplaceholder":this.getProperty("previewplaceholder"),"previewpageid":this.getProperty("previewpageid")}};
var _9a6=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_9a6.handler=this._handler;
_9a6.argument=_9a5;
StageBinding.presentViewDefinition(_9a6);
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
var _9a7={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _9a9={handleDialogResponse:function(_9aa,_9ab){
if(_9aa==Dialog.RESPONSE_ACCEPT){
self.result=_9ab;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _9ac=ViewDefinitions[this._dialogViewHandle];
_9ac.handler=_9a9;
_9ac.argument=_9a7;
StageBinding.presentViewDefinition(_9ac);
};
MultiSelectorDataDialogBinding.newInstance=function(_9ad){
var _9ae=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_9ad);
return UserInterface.registerBinding(_9ae,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_9af){
var id=_9af.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9b1=_9af.bindingDocument.getElementById(id);
if(_9b1!=null){
var _9b2=UserInterface.getBinding(_9b1);
_9b2.setResult(true);
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
var _9b4=this.bindingDocument.getElementById(id);
if(_9b4!=null){
var _9b5=UserInterface.getBinding(_9b4);
if(_9b5&&!_9b5.isAttached){
_9b5.isLazy=true;
}else{
_9b4.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9b6){
this._isLazy=_9b6;
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
var _9b8=this.getProperty("stateprovider");
var _9b9=this.getProperty("handle");
if(_9b8!=null&&_9b9!=null){
url=url.replace("${stateprovider}",_9b8).replace("${handle}",_9b9);
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
EditorDataBinding.prototype._onPageInitialize=function(_9ba){
EditorDataBinding.superclass._onPageInitialize.call(this,_9ba);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9bb){
EditorDataBinding.superclass.handleAction.call(this,_9bb);
switch(_9bb.type){
case Binding.ACTION_DIRTY:
if(_9bb.target!=this){
if(!this.isDirty){
this.dirty();
}
_9bb.consume();
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
EditorDataBinding.prototype.setValue=function(_9bc){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9bd){
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
FunctionEditorDataBinding.prototype._onPageInitialize=function(_9be){
FunctionEditorDataBinding.superclass._onPageInitialize.call(this,_9be);
if(this.hasBasic===false){
var _9bf=this.getContentWindow().bindingMap.basicgroup;
if(_9bf){
_9bf.hide();
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
var _9c4=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9c4=fake.getValue()!="";
}
if(!_9c4&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9c4&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9c4;
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
var _9c8=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9c8!=null){
_9c8.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9c9){
_9c9=_9c9!=null?_9c9:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9c9;
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
var _9ca=this.getProperty("label");
if(_9ca){
this.setLabel(_9ca);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9cb){
this.setProperty("label",_9cb);
if(this.shadowTree.labelBinding==null){
var _9cc=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9cc.attachClassName("fieldgrouplabel");
this.bindingElement.insertBefore(_9cc.bindingElement,this.bindingElement.firstChild);
_9cc.attach();
this.shadowTree.labelBinding=_9cc;
this.shadowTree.labelBinding.bindingElement.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument));
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9cb));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9ce){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9ce.bindingElement);
return _9ce;
};
FieldGroupBinding.prototype.addFirst=function(_9cf){
var _9d0=this.shadowTree[FieldGroupBinding.CENTER];
_9d0.insertBefore(_9cf.bindingElement,_9d0.firstChild);
return _9cf;
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
var _9d1=this.getProperty("relation");
if(_9d1!=null){
this.bindingRelation=_9d1;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9d2,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9d2,arg);
switch(_9d2){
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
FieldBinding.newInstance=function(_9d4){
var _9d5=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9d4);
return UserInterface.registerBinding(_9d5,FieldBinding);
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
var _9d6=this.getDescendantBindingByLocalName("fieldgroup");
if(_9d6!=null){
_9d6.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9d7=true;
var _9d8=this.getDescendantBindingsByLocalName("*");
while(_9d8.hasNext()){
var _9d9=_9d8.getNext();
if(Interfaces.isImplemented(IData,_9d9)){
var _9da=_9d9.validate();
if(_9d7&&!_9da){
_9d7=false;
}
}
}
return _9d7;
};
FieldsBinding.prototype.handleAction=function(_9db){
FieldsBinding.superclass.handleAction.call(this,_9db);
var _9dc=_9db.target;
if(_9dc!=this){
switch(_9db.type){
case Binding.ACTION_INVALID:
var _9dd=DataBinding.getAssociatedLabel(_9dc);
if(_9dd){
this._invalidFieldLabels.set(_9dc.key,_9dd);
}
if(_9dc.error){
if(!_9dc.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9dc.error},_9dc);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9db.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9dc.key)){
this._invalidFieldLabels.del(_9dc.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9db.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9de=null;
if(this._invalidFieldLabels.hasEntries()){
_9de=this._invalidFieldLabels.toList();
}
return _9de;
};
FieldsBinding.newInstance=function(_9df){
var _9e0=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9df);
return UserInterface.registerBinding(_9e0,FieldsBinding);
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
var _9e1=this.getProperty("image");
if(_9e1){
this.setImage(_9e1);
}
var _9e2=this.getProperty("tooltip");
if(_9e2){
this.setToolTip(_9e2);
}
var _9e3=this.getProperty("label");
if(_9e3){
this.setLabel(_9e3);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9e5=this.getAncestorBindingByLocalName("field");
if(_9e5){
var _9e6=true;
_9e5.getDescendantBindingsByLocalName("*").each(function(_9e7){
if(Interfaces.isImplemented(IData,_9e7)){
_9e7.focus();
_9e6=false;
}
return _9e6;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9e8){
this.setProperty("label",_9e8);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9e8);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9e9=this.getProperty("label");
if(!_9e9){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9e9=node.data;
}
}
return _9e9;
};
FieldDescBinding.prototype.setImage=function(_9eb){
this.setProperty("image",_9eb);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9ec){
this.setProperty("tooltip",_9ec);
if(this.isAttached){
this.bindingElement.title=_9ec;
}
};
FieldDescBinding.newInstance=function(_9ed){
var _9ee=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9ed);
return UserInterface.registerBinding(_9ee,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9ef){
var _9f0=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9ef);
return UserInterface.registerBinding(_9f0,FieldDataBinding);
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
var _9f1=this._fieldHelpPopupBinding;
if(_9f1){
_9f1.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9f2=app.bindingMap.fieldhelpopupset;
var doc=_9f2.bindingDocument;
var _9f4=_9f2.add(PopupBinding.newInstance(doc));
var _9f5=_9f4.add(PopupBodyBinding.newInstance(doc));
_9f4.position=PopupBinding.POSITION_RIGHT;
_9f4.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9f5.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9f6=this.getProperty("label");
if(_9f6){
_9f5.bindingElement.innerHTML=Resolver.resolve(_9f6);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9f4;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9f7=this.getAncestorBindingByLocalName("field");
if(_9f7){
_9f7.attachClassName("fieldhelp");
var _9f8=ClickButtonBinding.newInstance(this.bindingDocument);
_9f8.attachClassName("fieldhelp");
_9f8.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9f8);
_9f8.attach();
var self=this;
_9f8.oncommand=function(){
self.attachPopupBinding();
};
_9f8.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9f8;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9fa=this._fieldHelpPopupBinding;
if(_9fa&&!_9fa.isAttached){
_9fa.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9fc){
RadioDataGroupBinding.superclass.handleAction.call(this,_9fc);
switch(_9fc.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9fe,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9fe,arg);
switch(_9fe){
case BroadcastMessages.KEY_ARROW:
var _a00=null;
var next=null;
var _a02=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_a02=this.getChildBindingsByLocalName("radio");
while(!_a00&&_a02.hasNext()){
var _a03=_a02.getNext();
if(_a03.getProperty("ischecked")){
_a00=_a03;
}
}
break;
}
if(_a00){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_a02.getFollowing(_a00);
while(next!=null&&next.isDisabled){
next=_a02.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_a02.getPreceding(_a00);
while(next!=null&&next.isDisabled){
next=_a02.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_a04){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_a04){
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
var _a05=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a05.type="hidden";
_a05.name=this._name;
this.bindingElement.appendChild(_a05);
this.shadowTree.input=_a05;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _a06=null;
var _a07=this.getChildBindingsByLocalName("radio");
while(!_a06&&_a07.hasNext()){
var _a08=_a07.getNext();
if(_a08.isChecked){
_a06=_a08.getProperty("value");
}
}
return _a06;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_a09){
};
RadioDataGroupBinding.prototype.setResult=function(_a0a){
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
var _a0b=this.getProperty("relate");
var _a0c=this.getProperty("oncommand");
var _a0d=this.getProperty("isdisabled");
if(_a0b){
this.bindingRelate=_a0b;
this.relate();
}
if(_a0c){
this.oncommand=function(){
Binding.evaluate(_a0c,this);
};
}
if(_a0d==true){
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
var _a0f=this.getCallBackID();
this._buttonBinding.check=function(_a10){
RadioButtonBinding.prototype.check.call(this,_a10);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a11){
RadioButtonBinding.prototype.uncheck.call(this,_a11);
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
RadioDataBinding.prototype.setChecked=function(_a12,_a13){
this._buttonBinding.setChecked(_a12,_a13);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a12);
};
RadioDataBinding.prototype.check=function(_a14){
this.setChecked(true,_a14);
};
RadioDataBinding.prototype.uncheck=function(_a15){
this.setChecked(false,_a15);
};
RadioDataBinding.prototype.setDisabled=function(_a16){
if(_a16!=this.isDisabled){
this.isDisabled=_a16;
this._buttonBinding.setDisabled(_a16);
if(_a16){
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
var _a18=DOMEvents.getTarget(e);
switch(_a18){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a19=this.getProperty("label");
if(_a19){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a19)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a1a){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a1a;
}
this.setProperty("label",_a1a);
};
RadioDataBinding.prototype.handleElement=function(_a1b){
return true;
};
RadioDataBinding.prototype.updateElement=function(_a1c){
var _a1d=_a1c.getAttribute("ischecked")==="true";
if(this.isChecked!=_a1d){
this.setChecked(_a1d,true);
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
var _a1f=DOMEvents.getTarget(e);
switch(_a1f){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a20,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a20,arg);
switch(_a20){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a23){
_a23.consume();
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
var _a25=this.getCallBackID();
this._buttonBinding.check=function(_a26){
ButtonBinding.prototype.check.call(this,_a26);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a26){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a27){
ButtonBinding.prototype.uncheck.call(this,_a27);
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
if(_a25!=null){
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
var _a28=true;
var _a29=this.bindingElement.parentNode;
if(_a29){
var _a2a=UserInterface.getBinding(_a29);
if(_a2a&&_a2a instanceof CheckBoxGroupBinding){
if(_a2a.isRequired){
if(_a2a.isValid){
_a28=_a2a.validate();
}else{
_a28=false;
}
}
}
}
return _a28;
};
CheckBoxBinding.prototype.handleElement=RadioDataBinding.prototype.handleElement;
CheckBoxBinding.prototype.updateElement=RadioDataBinding.prototype.updateElement;
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a2b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a2b.type="hidden";
_a2b.name=this._name;
_a2b.style.display="none";
this.bindingElement.appendChild(_a2b);
this.shadowTree.input=_a2b;
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
var _a2c=null;
var _a2d=this.getProperty("value");
if(this.isChecked){
_a2c=_a2d?_a2d:"on";
}
return _a2c;
};
CheckBoxBinding.prototype.setValue=function(_a2e){
if(_a2e==this.getValue()||_a2e=="on"){
this.check(true);
}else{
if(_a2e!="on"){
this.setPropety("value",_a2e);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a2f=false;
if(this.isChecked){
_a2f=this._result!=null?this._result:true;
}
return _a2f;
};
CheckBoxBinding.prototype.setResult=function(_a30){
if(typeof _a30=="boolean"){
this.setChecked(_a30,true);
}else{
this._result=_a30;
}
};
CheckBoxBinding.newInstance=function(_a31){
var _a32=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a31);
return UserInterface.registerBinding(_a32,CheckBoxBinding);
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
var _a33=true;
if(this.isRequired){
var _a34=this.getDescendantBindingsByLocalName("checkbox");
if(_a34.hasEntries()){
_a33=false;
while(_a34.hasNext()&&!_a33){
if(_a34.getNext().isChecked){
_a33=true;
}
}
}
if(_a33==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a33;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a35){
if(_a35){
if(!this._labelBinding){
var _a36=LabelBinding.newInstance(this.bindingDocument);
_a36.attachClassName("invalid");
_a36.setImage("${icon:error}");
_a36.setLabel("Selection required");
this._labelBinding=this.addFirst(_a36);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a37){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a37);
switch(_a37.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a38){
var _a39=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a38);
return UserInterface.registerBinding(_a39,CheckBoxGroupBinding);
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
var _a3a=DialogControlBinding.newInstance(this.bindingDocument);
_a3a.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a3a);
this._controlGroupBinding.attachRecursive();
var _a3b=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a3b);
var _a3c=this.getLabel();
if(_a3c!=null){
this.setLabel(_a3c);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a3d=this._snapTargetBinding;
if(Binding.exists(_a3d)==true){
_a3d.removeActionListener(Binding.ACTION_BLURRED,this);
_a3d.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a3e){
if(Interfaces.isImplemented(IData,_a3e)){
this._snapTargetBinding=_a3e;
var _a3f=_a3e.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a3f&&_a3f.isConsumed){
this._environmentBinding=_a3f.listener;
}
if(this._environmentBinding){
_a3e.addActionListener(Binding.ACTION_BLURRED,this);
_a3e.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a3e)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a3e.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a41=this._snapTargetBinding;
var _a42=this._environmentBinding;
var root=UserInterface.getBinding(_a41.bindingDocument.body);
if(Binding.exists(_a41)&&Binding.exists(_a42)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a41.isAttached&&_a42.isAttached){
var _a44=_a41.boxObject.getUniversalPosition();
var _a45=_a42.boxObject.getUniversalPosition();
_a45.y+=_a42.bindingElement.scrollTop;
_a45.x+=_a42.bindingElement.scrollLeft;
var tDim=_a41.boxObject.getDimension();
var eDim=_a42.boxObject.getDimension();
var _a48=false;
if(_a44.y+tDim.h<_a45.y){
_a48=true;
}else{
if(_a44.x+tDim.w<_a45.x){
_a48=true;
}else{
if(_a44.y>_a45.y+eDim.h){
_a48=true;
}else{
if(_a44.x>_a45.x+eDim.w){
_a48=true;
}
}
}
}
if(!_a48){
this._setComputedPosition(_a44,_a45,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a49,_a4a,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a4f=_a49;
var _a50=false;
if(_a49.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a50=true;
}else{
if(_a49.x+tDim.w>=_a4a.x+eDim.w){
_a50=true;
}
}
if(_a50){
_a4f.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a4f.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a4f.y-=(bDim.h);
_a4f.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a4f);
};
BalloonBinding.prototype.handleBroadcast=function(_a51,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a51,arg);
switch(_a51){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a53){
var _a54=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a53){
_a54=true;
}
}
return _a54;
};
BalloonBinding.prototype._setPosition=function(_a56){
var _a57=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a57=true;
}
}
if(!_a57){
this.bindingElement.style.left=_a56.x+"px";
this.bindingElement.style.top=_a56.y+"px";
this._point=_a56;
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
BalloonBinding.prototype.handleAction=function(_a59){
BalloonBinding.superclass.handleAction.call(this,_a59);
var _a5a=_a59.target;
switch(_a59.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a59.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a5a==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a5a)){
self.dispose();
}else{
if(_a5a.validate()){
var _a5c=true;
if(_a59.type==Binding.ACTION_BLURRED){
var root=_a5a.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a5c=false;
}
}
if(_a5c){
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
BalloonBinding.prototype.setLabel=function(_a5f){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a60=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a5f);
_a60.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a60);
}
this.setProperty("label",_a5f);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a62){
var _a63=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a62);
var _a64=UserInterface.registerBinding(_a63,BalloonBinding);
_a64.hide();
return _a64;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a65,_a66){
if(Interfaces.isImplemented(IData,_a66)==true){
var _a67,_a68=_a66.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a68&&_a68.isConsumed){
switch(_a68.listener.constructor){
case StageBinding:
_a67=false;
break;
case StageDialogBinding:
_a67=true;
break;
}
}
var _a69=_a67?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a6a=_a69.add(BalloonBinding.newInstance(top.app.document));
_a6a.setLabel(_a65.text);
_a6a.snapTo(_a66);
_a6a.attach();
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
var _a6b=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a6e=_a6b.getDataBinding(name);
if(_a6e){
ErrorBinding.presentError({text:text},_a6e);
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
FocusBinding.focusElement=function(_a6f){
var _a70=true;
try{
_a6f.focus();
Application.focused(true);
}
catch(exception){
var _a71=UserInterface.getBinding(_a6f);
var _a72=SystemLogger.getLogger("FocusBinding.focusElement");
_a72.warn("Could not focus "+(_a71?_a71.toString():String(_a6f)));
_a70=false;
}
return _a70;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a73){
var win=_a73.bindingWindow;
var id=_a73.bindingElement.id;
return {getBinding:function(){
var _a76=null;
try{
if(Binding.exists(_a73)){
_a76=win.bindingMap[id];
}
}
catch(exception){
}
return _a76;
}};
};
FocusBinding.navigateNext=function(_a77){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a77);
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
var _a78=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a78&&_a78.isConsumed){
if(_a78.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a79){
FocusBinding.superclass.handleAction.call(this,_a79);
var _a7a=_a79.target;
var _a7b=null;
if(this._isFocusManager){
switch(_a79.type){
case FocusBinding.ACTION_ATTACHED:
if(_a7a!=this){
this._isUpToDate=false;
}
_a79.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a7a!=this){
this._isUpToDate=false;
_a79.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a7b=new FocusCrawler();
_a7b.mode=FocusCrawler.MODE_BLUR;
_a7b.crawl(_a7a.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a79.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a7a!=this){
_a7b=new FocusCrawler();
_a7b.mode=FocusCrawler.MODE_FOCUS;
_a7b.crawl(_a7a.bindingElement);
}
_a79.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a7a)){
this.claimFocus();
this._onFocusableFocused(_a7a);
}
_a79.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a7a)){
this._onFocusableBlurred(_a7a);
}
_a79.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a7c){
var _a7d=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a7d==null&&list.hasNext()){
var _a7f=list.getNext();
if(this._cachedFocus&&_a7f==this._cachedFocus.getBinding()){
_a7d=_a7f;
}
}
if(_a7d!=null){
if(_a7f.isFocused){
var next=_a7c?list.getPreceding(_a7d):list.getFollowing(_a7d);
if(!next){
next=_a7c?list.getLast():list.getFirst();
}
next.focus();
}else{
_a7d.focus();
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
var _a81=new FocusCrawler();
var list=new List();
_a81.mode=FocusCrawler.MODE_INDEX;
_a81.crawl(this.bindingElement,list);
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
var _a84=this._cachedFocus.getBinding();
if(_a84&&!_a84.isFocused){
_a84.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a85){
if(_a85!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a85;
_a85.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a85);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a86){
_a86.deleteProperty(FocusBinding.MARKER);
if(_a86==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a88){
this.bindingElement.style.left=_a88+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a89){
this.hiddenTabBindings.add(_a89);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a8a=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a8a.getLabel());
item.setImage(_a8a.getImage());
item.associatedTabBinding=_a8a;
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
TabsButtonBinding.prototype.handleAction=function(_a8d){
TabsButtonBinding.superclass.handleAction.call(this,_a8d);
switch(_a8d.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a8e=this.selectedTabBinding;
if(_a8e){
this.containingTabBoxBinding.moveToOrdinalPosition(_a8e,0);
this.containingTabBoxBinding.select(_a8e);
}
_a8d.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a8f){
var _a90=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a8f);
_a90.setAttribute("type","checkbox");
_a90.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a90.className="tabbutton";
return UserInterface.registerBinding(_a90,TabsButtonBinding);
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
var _a91=TabBoxBinding.currentActiveInstance;
if(_a91!=null&&Binding.exists(_a91)){
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
var _a92=this.getTabElements().getLength();
var _a93=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a92!=_a93){
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
var _a94=this.getTabPanelElements();
while(_a94.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a94.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a95=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a96=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a97=_a95>_a96?"tabsbelow":"tabsontop";
this.attachClassName(_a97);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a99=this.getTabPanelElements();
var _a9a=null;
var _a9b=this.getProperty("selectedindex");
if(_a9b!=null){
if(_a9b>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a9c=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a9e=_a99.getNext();
this.registerTabBoxPair(tab,_a9e);
if(_a9b&&_a9c==_a9b){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a9a=tab;
}
}
_a9c++;
}
if(!_a9a){
_a9a=tabs.getFirst();
_a9a.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a9f){
var _aa0=null;
var _aa1=null;
if(this.isEqualSize){
var _aa2=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_aa4=this.getTabPanelElements();
_aa4.each(function(_aa5){
max=_aa5.offsetHeight>max?_aa5.offsetHeight:max;
});
_aa1=max+_aa2.top+_aa2.bottom;
if(_a9f&&this._tabPanelsElement.style.height!=null){
_aa0=this._tabPanelsElement.offsetHeight;
}
if(_aa0!=null||_aa1>_aa0){
this._tabPanelsElement.style.height=_aa1+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_aa6){
_aa6._invalidCount=0;
_aa6.addActionListener(Binding.ACTION_INVALID,this);
_aa6.addActionListener(Binding.ACTION_VALID,this);
_aa6.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_aa7){
TabBoxBinding.superclass.handleAction.call(this,_aa7);
var _aa8=_aa7.target;
var _aa9=_aa7.listener;
switch(_aa7.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_aa8.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_aa7.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_aa8.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_aa9._invalidCount++;
if(_aa9._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_aa9.isSelected){
self._showWarning(_aa9,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_aa9._invalidCount>0){
_aa9._invalidCount--;
if(_aa9._invalidCount==0){
if(_aa9.isSelected){
this._showWarning(_aa9,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_aa9,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_aa7._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_aa7._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _aac=DOMEvents.getTarget(e);
if(_aac==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _aae=this.getTabPanelElements();
tabs.each(function(tab,_ab0){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _ab1=_aae.get(_ab0);
this.registerTabBoxPair(tab,_ab1);
}
},this);
var _ab2=this._tabBoxPairs;
for(var key in _ab2){
var tab=_ab2[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_aac);
switch(_aac.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _ab6=_aac.parentNode;
if(_ab6==this._tabsElement||_ab6==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_aac==this._tabsElement||_aac==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_ab8){
var _ab9=this.getBindingForArgument(arg);
if(_ab9!=null&&!_ab9.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_ab9.select(_ab8);
this.getTabPanelBinding(_ab9).select(_ab8);
var _aba=this.getProperty("selectedindex");
if(_aba!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_ab9.bindingElement,true));
}
this._selectedTabBinding=_ab9;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_ab9.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _abb=this.getTabPanelBinding(_ab9);
this._showBalloon(_abb,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_abd){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_abd.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_abd};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ac1){
var _ac2=null;
try{
var key=_ac1.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ac4=this._tabBoxPairs[key].tabPanel;
_ac2=UserInterface.getBinding(_ac4);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ac2;
};
TabBoxBinding.prototype.getTabBinding=function(_ac5){
var key=_ac5.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ac7=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ac7);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ac8=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ac8);
return _ac8;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ac9,_aca){
var _acb=_ac9.bindingElement;
_ac9.setProperty("selected",true);
var _acc=this.summonTabPanelBinding();
var _acd=_acc.bindingElement;
if(_aca){
_acd.appendChild(_aca instanceof Binding?_aca.bindingElement:_aca);
}
this.registerTabBoxPair(_acb,_acd);
UserInterface.getBinding(this._tabsElement).add(_ac9);
this._tabPanelsElement.appendChild(_acd);
_ac9.attach();
UserInterface.getBinding(_acd).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ac9;
};
TabBoxBinding.prototype.importTabBinding=function(_ace){
var that=_ace.containingTabBoxBinding;
var _ad0=that.getTabPanelBinding(_ace);
var _ad1=_ad0.getBindingElement();
var _ad2=_ace.getBindingElement();
that.dismissTabBinding(_ace);
this._tabsElement.appendChild(_ad2);
this._tabPanelsElement.appendChild(_ad1);
this.registerTabBoxPair(_ad2,_ad1);
_ace.containingTabBoxBinding=this;
this.select(_ace);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ad3){
var _ad4=null;
if(_ad3.isSelected){
_ad4=this.getBestTab(_ad3);
this._selectedTabBinding=null;
}
var _ad5=this.getTabPanelBinding(_ad3);
this.unRegisterTabBoxPair(_ad3.bindingElement);
_ad3.dispose();
_ad5.dispose();
if(_ad4!=null){
this.select(_ad4,true);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
this.deActivate();
};
TabBoxBinding.prototype.dismissTabBinding=function(_ad6){
if(_ad6.isSelected){
this.selectBestTab(_ad6);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ad7){
var _ad8=this.getBestTab(_ad7);
if(_ad8){
this.select(_ad8);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ad9){
var _ada=null;
var _adb=_ad9.getOrdinalPosition(true);
var _adc=this.getTabBindings();
var _add=_adc.getLength();
var _ade=_add-1;
if(_add==1){
_ada=null;
}else{
if(_adb==_ade){
_ada=_adc.get(_adb-1);
}else{
_ada=_adc.get(_adb+1);
}
}
return _ada;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_adf,_ae0){
var _ae1=this.bindingDocument.getElementById(_adf.bindingElement.id);
var tab=this.getTabElements().get(_ae0);
this._tabsElement.insertBefore(_ae1,tab);
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
var _ae3=this._nodename_tab;
var _ae4=new List(this._tabsElement.childNodes);
var _ae5=new List();
while(_ae4.hasNext()){
var _ae6=_ae4.getNext();
if(_ae6.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ae6)==_ae3){
_ae5.add(_ae6);
}
}
return _ae5;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ae7=this._nodename_tabpanel;
var _ae8=new List(this._tabPanelsElement.childNodes);
var _ae9=new List();
_ae8.each(function(_aea){
if(_aea.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aea)==_ae7){
_ae9.add(_aea);
}
});
return _ae9;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _aeb=new List();
var _aec=this.getTabElements();
_aec.each(function(_aed){
_aeb.add(UserInterface.getBinding(_aed));
});
return _aeb;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _aee=new List();
this.getTabPanelElements().each(function(_aef){
_aee.add(UserInterface.getBinding(_aef));
});
return _aee;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _af0=null;
if(this._selectedTabBinding){
_af0=this.getTabPanelBinding(this._selectedTabBinding);
}
return _af0;
};
TabBoxBinding.prototype._showWarning=function(_af1,_af2){
var _af3=this.getTabBinding(_af1);
if(_af2){
if(_af3.labelBinding.hasImage){
_af3._backupImage=_af3.getImage();
}
_af3.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_af3._backupImage){
_af3.setImage(_af3._backupImage);
}else{
_af3.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_af4,_af5){
var _af6=this.getTabBinding(_af4);
if((_af5&&!_af6.isSelected)||!_af5){
if(_af6.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_af5){
if(_af6.labelBinding.hasImage){
_af6._backupImage=_af6.getImage();
}
_af6.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_af6._backupImage!=null){
_af6.setImage(_af6._backupImage);
}else{
_af6.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_af7){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _afa=tab.getOrdinalPosition(true);
var next=null;
var _afc=new List();
tabs.each(function(t){
if(t.isVisible){
_afc.add(t);
}
});
if(_afc.getLength()>1){
if(_afa==0&&!_af7){
next=_afc.getLast();
}else{
if(_afa==_afc.getLength()-1&&_af7){
next=_afc.getFirst();
}else{
if(_af7){
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
var _aff=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_aff.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_b00){
TabsBinding.superclass.handleAction.call(this,_b00);
switch(_b00.type){
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
var _b03=self.bindingElement.offsetWidth;
if(_b03!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_b03;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_b04){
if(_b04 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_b04);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _b05=false;
var _b06,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _b09=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b0a=this.bindingElement.offsetWidth-_b09.RESERVED_SPACE;
var _b0b=null;
var sum=0,_b0d=0;
var _b0e=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b0e){
tab=tabs.getNext();
_b06=UserInterface.getBinding(tab);
if(!_b0b){
_b0b=_b06;
}
sum+=tab.offsetWidth;
if(sum>=_b0a){
_b05=true;
if(_b06.isSelected){
if(!DOMUtil.isFirstElement(_b06.bindingElement,true)){
this.isManaging=false;
if(_b0b){
_b0b.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_b06,_b0d-1);
_b0e=false;
}
}else{
_b06.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_b06);
}
}else{
_b06.show();
_b0b=_b06;
_b0d++;
}
}
if(_b0e){
if(_b05&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b0f=_b0b.getBindingElement();
var _b10=_b0f.offsetLeft+_b0f.offsetWidth;
var _b11=this.tabsButtonBinding;
setTimeout(function(){
_b11.show(_b10+4);
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
var _b12=TabBinding.superclass.serialize.call(this);
if(_b12){
_b12.label=this.getLabel();
_b12.image=this.getImage();
_b12.tooltip=this.getToolTip();
}
return _b12;
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
var _b13=this.bindingElement.getAttribute("image");
var _b14=this.bindingElement.getAttribute("label");
var _b15=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b14){
this.setLabel(_b14);
}
if(_b13){
this.setImage(_b13);
}
if(_b15){
this.setToolTip(_b15);
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
TabBinding.prototype.setLabel=function(_b17){
if(_b17!=null){
this.setProperty("label",_b17);
if(this.isAttached){
this.labelBinding.setLabel(_b17);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b18){
if(_b18){
this.setProperty("tooltip",_b18);
if(this.isAttached){
this.labelBinding.setToolTip(_b18);
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
var _b1a=false;
if(Client.isMozilla==true){
}
if(!_b1a){
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
TabBinding.prototype.select=function(_b1b){
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
TabBinding.newInstance=function(_b1c){
var _b1d=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b1c);
return UserInterface.registerBinding(_b1d,TabBinding);
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
var _b1e=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b1e=true;
this._lastKnownDimension=dim1;
}
return _b1e;
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
TabPanelBinding.prototype.select=function(_b21){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b21!=true){
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
TabPanelBinding.prototype.handleAction=function(_b22){
TabPanelBinding.superclass.handleAction.call(this,_b22);
var _b23=_b22.target;
switch(_b22.type){
case BalloonBinding.ACTION_INITIALIZE:
_b22.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b24){
var _b25=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b24);
UserInterface.registerBinding(_b25,TabPanelBinding);
return UserInterface.getBinding(_b25);
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
var _b26=SplitBoxBinding.superclass.serialize.call(this);
if(_b26){
_b26.orient=this.getOrient();
_b26.layout=this.getLayout();
}
return _b26;
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
var _b27=this.getSplitPanelElements();
if(_b27.hasEntries()){
var _b28=new List(this.getLayout().split(":"));
if(_b28.getLength()!=_b27.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b27.each(function(_b29){
_b29.setAttribute("ratio",_b28.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b2a=this.getProperty("orient");
if(_b2a){
this._orient=_b2a;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b2b=this.getSplitterBindings();
while(_b2b.hasNext()){
var _b2c=_b2b.getNext();
if(_b2c&&_b2c.getProperty("collapsed")==true){
_b2c.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b2d){
SplitBoxBinding.superclass.handleAction.call(this,_b2d);
switch(_b2d.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b2d.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b2d.target);
_b2d.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b2d.target);
_b2d.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b2e){
this._getSplitPanelBindingForSplitter(_b2e).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b2f){
this._getSplitPanelBindingForSplitter(_b2f).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b30){
var _b31=DOMUtil.getOrdinalPosition(_b30.bindingElement,true);
var _b32,_b33=this.getSplitPanelElements();
switch(_b30.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b32=_b33.get(_b31);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b32=_b33.get(_b31+1);
break;
}
return UserInterface.getBinding(_b32);
};
SplitBoxBinding.prototype.invokeLayout=function(_b34){
var _b35=this.isHorizontalOrient();
var _b36=this.getSplitPanelBindings();
var _b37=this.getSplitterBindings();
var _b38=new List();
var _b39,sum=0;
var _b3b=0;
_b36.each(function(_b3c){
if(_b3c.isFixed==true){
if(!_b36.hasNext()){
_b3b+=_b3c.getFix();
}
_b38.add(0);
sum+=0;
}else{
_b39=_b3c.getRatio();
_b38.add(_b39);
sum+=_b39;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b38.getLength()!=_b36.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b3d=_b35?this.getInnerWidth():this.getInnerHeight();
_b3d-=_b3b;
_b37.each(function(_b3e){
if(_b3e.isVisible){
_b3d-=SplitterBinding.DIMENSION;
}
});
var unit=_b3d/sum;
var _b40=0;
var self=this;
_b36.each(function(_b42){
var span=0;
var _b44=_b38.getNext();
if(_b42.isFixed){
span=_b42.getFix();
}else{
span=Math.floor(unit*_b44);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b40+=span;
while(_b40>_b3d){
_b40--;
span--;
}
if(!_b42.isFixed){
if(_b35){
_b42.setWidth(span);
}else{
_b42.setHeight(span);
}
}
});
}
if(_b34!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b45=this.getLayout();
if(_b45){
this.setProperty("layout",_b45);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b46=this.isHorizontalOrient();
var _b47=this.getSplitPanelBindings();
var _b48=this.getSplitterBindings();
var _b49=null;
var _b4a=null;
var unit=null;
var _b4c=null;
var span=null;
_b47.each(function(_b4e){
if(!unit){
unit=_b46?_b4e.getWidth():_b4e.getHeight();
}
span=_b46?_b4e.getWidth():_b4e.getHeight();
if(_b4c){
span-=_b4c;
_b4c=null;
}
_b49=_b48.getNext();
if(_b49&&_b49.offset){
_b4c=_b49.offset;
span+=_b4c;
}
_b4e.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b4f){
this.logger.debug(_b4f);
this.setProperty("layout",_b4f);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b50="",_b51=this.getSplitPanelBindings();
_b51.each(function(_b52){
_b50+=_b52.getRatio().toString();
_b50+=_b51.hasNext()?":":"";
});
this.setProperty("layout",_b50);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b53=this.getSplitPanelElements();
_b53.each(function(_b54){
layout+="1"+(_b53.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b55){
this.bindingElement.style.width=_b55+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b56){
this.bindingElement.style.height=_b56+"px";
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
SplitBoxBinding.prototype.fit=function(_b57){
if(!this.isFit||_b57){
if(this.isHorizontalOrient()){
var max=0;
var _b59=this.getSplitPanelBindings();
_b59.each(function(_b5a){
var _b5b=_b5a.bindingElement.offsetHeight;
max=_b5b>max?_b5b:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b5c){
var _b5d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b5c);
return UserInterface.registerBinding(_b5d,SplitBoxBinding);
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
var _b60=this.getProperty("hidden");
if(_b60){
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
var _b61=this.getProperty("ratiocache");
if(_b61){
this.setRatio(_b61);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b62){
if(!this.isFixed){
if(_b62!=this.getWidth()){
if(_b62<0){
_b62=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b62+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b62);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b63=null;
if(this.isFixed){
_b63=this.getFix();
}else{
_b63=this.bindingElement.offsetWidth;
}
return _b63;
};
SplitPanelBinding.prototype.setHeight=function(_b64){
if(!this.isFixed){
if(_b64!=this.getHeight()){
try{
this.bindingElement.style.height=_b64+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b65=null;
if(this.isFixed){
_b65=this.getFix();
}else{
_b65=this.bindingElement.offsetHeight;
}
return _b65;
};
SplitPanelBinding.prototype.setRatio=function(_b66){
this.setProperty("ratio",_b66);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b67){
if(_b67){
this._fixedSpan=_b67;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b67);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b67);
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
SplitPanelBinding.newInstance=function(_b68){
var _b69=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b68);
return UserInterface.registerBinding(_b69,SplitPanelBinding);
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
var _b6a=SplitBoxBinding.superclass.serialize.call(this);
if(_b6a){
_b6a.collapse=this.getProperty("collapse");
_b6a.collapsed=this.getProperty("collapsed");
_b6a.disabled=this.getProperty("isdisabled");
}
return _b6a;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b6b=this.getProperty("hidden");
if(_b6b){
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
SplitterBinding.prototype.setCollapseDirection=function(_b6d){
this.setProperty("collapse",_b6d);
this._collapseDirection=_b6d;
};
SplitterBinding.prototype.handleAction=function(_b6e){
SplitterBinding.superclass.handleAction.call(this,_b6e);
switch(_b6e.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b6e.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b70=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b70.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b70.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b71){
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
SplitterBinding.newInstance=function(_b7c){
var _b7d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b7c);
return UserInterface.registerBinding(_b7d,SplitterBinding);
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
var _b7e=this.getProperty("selectedindex");
var _b7f=this.getDeckElements();
if(_b7f.hasEntries()){
var _b80=false;
var _b81=0;
while(_b7f.hasNext()){
var deck=_b7f.getNext();
if(_b7e&&_b81==_b7e){
deck.setAttribute("selected","true");
_b80=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b80=true;
}
}
_b81++;
}
if(!_b80){
_b7f.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b84=this.getBindingForArgument(arg);
if(_b84!=null){
if(_b84!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b84.select();
this._selectedDeckBinding=_b84;
var _b85=this.getProperty("selectedindex");
if(_b85!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b84.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b86=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b86=true;
this._lastKnownDimension=dim1;
}
return _b86;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b89){
var _b8a=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b89);
return UserInterface.registerBinding(_b8a,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b8b){
DeckBinding.superclass.handleAction.call(this,_b8b);
var _b8c=_b8b.target;
switch(_b8b.type){
case BalloonBinding.ACTION_INITIALIZE:
_b8b.consume();
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
DeckBinding.newInstance=function(_b8e){
var _b8f=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b8e);
return UserInterface.registerBinding(_b8f,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b90){
if(_b90 instanceof ToolBarBodyBinding){
if(_b90.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b90;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b90;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b90);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b91=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b91){
this.setImageSize(_b91);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b93=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b93.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b93.isDefaultContent=true;
this.add(_b93);
_b93.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b95=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b95);
}
if(_b95!=null&&_b95.hasClassName("max")){
this._maxToolBarGroup(_b95,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b97){
var _b98=this.boxObject.getDimension().w;
var _b99=CSSComputer.getPadding(this.bindingElement);
_b98-=(_b99.left+_b99.right);
if(_b97!=null){
_b98-=_b97.boxObject.getDimension().w;
if(!Client.isWindows){
_b98-=1;
}
if(Client.isExplorer){
_b98-=15;
}
}
max.bindingElement.style.width=_b98+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b9a){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b9a);
};
ToolBarBinding.prototype.addLeft=function(_b9b,_b9c){
var _b9d=null;
if(this._toolBarBodyLeft!=null){
_b9d=this._toolBarBodyLeft.add(_b9b,_b9c);
}else{
throw new Error("No left toolbarbody");
}
return _b9d;
};
ToolBarBinding.prototype.addLeftFirst=function(_b9e,_b9f){
var _ba0=null;
if(this._toolBarBodyLeft){
_ba0=this._toolBarBodyLeft.addFirst(_b9e,_b9f);
}else{
throw new Error("No left toolbarbody");
}
return _ba0;
};
ToolBarBinding.prototype.addRight=function(_ba1){
var _ba2=null;
if(this._toolBarBodyRight){
_ba2=this._toolBarBodyRight.add(_ba1);
}else{
throw new Error("No left toolbarbody");
}
return _ba2;
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
ToolBarBinding.newInstance=function(_ba5){
var _ba6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_ba5);
return UserInterface.registerBinding(_ba6,ToolBarBinding);
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
var _ba7=this.getDescendantBindingsByLocalName("toolbargroup");
var _ba8=new List();
var _ba9=true;
_ba7.each(function(_baa){
if(_baa.isVisible&&!_baa.isDefaultContent){
_ba8.add(_baa);
}
});
while(_ba8.hasNext()){
var _bab=_ba8.getNext();
_bab.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_ba9){
_bab.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_ba9=false;
}
if(!_ba8.hasNext()){
_bab.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _bae=list.getNext();
var _baf=_bae.getEqualSizeWidth();
if(_baf>max){
max=_baf;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _bae=list.getNext();
_bae.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_bb0,_bb1){
var _bb2=ToolBarBinding.superclass.add.call(this,_bb0);
if(!_bb1){
if(_bb0 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bb2;
};
ToolBarBodyBinding.prototype.addFirst=function(_bb3,_bb4){
var _bb5=ToolBarBinding.superclass.addFirst.call(this,_bb3);
if(!_bb4){
if(_bb3 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bb5;
};
ToolBarBodyBinding.newInstance=function(_bb6){
var _bb7=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bb6);
return UserInterface.registerBinding(_bb7,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bb8){
switch(_bb8){
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
var _bb9=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bb9)=="toolbarbody"){
UserInterface.getBinding(_bb9).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bba=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bba)=="toolbarbody"){
UserInterface.getBinding(_bba).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bbb){
var _bbc=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bbb);
return UserInterface.registerBinding(_bbc,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bbd){
var _bbe=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bbd);
return UserInterface.registerBinding(_bbe,ToolBarButtonBinding);
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
var _bbf=this.getProperty("label");
var _bc0=this.getProperty("image");
if(_bbf){
this.setLabel(_bbf);
}
if(_bc0){
this.setImage(_bc0);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bc1,_bc2){
if(this.isAttached){
this._labelBinding.setLabel(_bc1,_bc2);
}
this.setProperty("label",_bc1);
};
ToolBarLabelBinding.prototype.setImage=function(_bc3,_bc4){
if(this.isAttached){
this._labelBinding.setImage(_bc3,_bc4);
}
this.setProperty("image",_bc3);
};
ToolBarLabelBinding.newInstance=function(_bc5){
var _bc6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bc5);
return UserInterface.registerBinding(_bc6,ToolBarLabelBinding);
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
var _bc7=this.getDescendantBindingsByLocalName("clickbutton");
if(_bc7.hasEntries()){
while(_bc7.hasNext()){
var _bc8=_bc7.getNext();
if(_bc8.isDefault){
this._defaultButton=_bc8;
_bc8.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bc8.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bc7;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bc9,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bc9,arg);
switch(_bc9){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bcb=this.getAncestorBindingByType(DialogBinding,true);
if(_bcb!=null&&_bcb.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bcc){
DialogToolBarBinding.superclass.handleAction.call(this,_bcc);
var _bcd=_bcc.target;
var _bce=false;
var _bcf=this._buttons.reset();
if(_bcd instanceof ClickButtonBinding){
switch(_bcc.type){
case Binding.ACTION_FOCUSED:
_bcd.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bcd;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bcd.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bce&&_bcf.hasNext()){
var _bd0=_bcf.getNext();
_bce=_bd0.isFocused;
}
if(!_bce){
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
ComboBoxBinding.newInstance=function(_bd2){
var _bd3=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bd2);
return UserInterface.registerBinding(_bd3,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bd4,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bd4,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bd8=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bd8.each(function(_bd9){
var _bda=_bd9.getProperty("oncommand");
_bd9.setProperty("hiddencommand",_bda);
_bd9.deleteProperty("oncommand");
_bd9.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bdb=null;
var _bdc=this.getActiveMenuItemId();
_bd8.reset();
while(_bd8.hasNext()){
var _bdd=_bd8.getNext();
if(_bdd.getProperty("id")==_bdc){
_bdb=_bdd;
break;
}
}
if(_bdb==null&&_bd8.hasEntries()){
_bdb=_bd8.getFirst();
}
if(_bdb!=null){
this.setButton(_bdb);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bde){
if(_bde instanceof MenuItemBinding){
var _bdf=_bde.getProperty("label");
var _be0=_bde.getProperty("image");
var _be1=_bde.getProperty("image-hover");
var _be2=_bde.getProperty("image-active");
var _be3=_bde.getProperty("image-disabled");
var _be4=_bde.getProperty("hiddencommand");
this.setLabel(_bdf?_bdf:"");
this.image=_be0;
this.imageHover=_be0;
this.imageActive=_be2;
this.imageDisabled=_be3;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_be4,this);
};
this.hideActiveItem(_bde);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_be5){
if(_be5 instanceof MenuItemBinding){
this.setButton(_be5);
this.setActiveMenuItemId(_be5.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_be6){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_be7){
if(_be7==_be6){
Binding.prototype.hide.call(_be7);
}else{
Binding.prototype.show.call(_be7);
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
var _be9=this._views;
for(var _bea in ViewDefinitions){
var def=ViewDefinitions[_bea];
var key=def.perspective;
if(key!=null){
if(!_be9.has(key)){
_be9.set(key,new List());
}
var list=_be9.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bee,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bee,arg);
switch(_bee){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bf1=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bf1.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bf1.add(StageViewMenuItemBinding.newInstance(_bf1.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bf1.show();
}else{
_bf1.hide();
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
TreeBinding.grid=function(_bf5){
var _bf6=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bf5);
var _bf8=_bf5%_bf6;
if(_bf8>0){
_bf5=_bf5-_bf8+_bf6;
}
return _bf5+TreeBodyBinding.PADDING_TOP;
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
var _bf9=this.getProperty("focusable");
if(_bf9!=null){
this._isFocusable=_bf9;
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
var _bfb=this.getProperty("builder");
if(_bfb){
this._buildFromTextArea(_bfb);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bfc=this.getProperty("selectable");
var _bfd=this.getProperty("selectionproperty");
var _bfe=this.getProperty("selectionvalue");
if(_bfc){
this.setSelectable(true);
if(_bfd){
this.setSelectionProperty(_bfd);
}
if(_bfe){
this.setSelectionValue(_bfe);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _c01=UserInterface.getBinding(area);
var _c02=this._treeBodyBinding;
function build(){
_c02.subTreeFromString(area.value);
}
_c01.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_c03){
var _c04=_c03.getHandle();
if(this._treeNodeBindings.has(_c04)){
throw "Duplicate treenodehandles registered: "+_c03.getLabel();
}else{
this._treeNodeBindings.set(_c04,_c03);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_c04)){
_c03.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_c06){
this._treeNodeBindings.del(_c06.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_c07){
var _c08=null;
if(this._treeNodeBindings.has(_c07)){
_c08=this._treeNodeBindings.get(_c07);
}else{
throw "No such treenode: "+_c07;
}
return _c08;
};
TreeBinding.prototype.handleAction=function(_c09){
TreeBinding.superclass.handleAction.call(this,_c09);
var _c0a=_c09.target;
switch(_c09.type){
case TreeNodeBinding.ACTION_OPEN:
_c09.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c0a);
_c09.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c0a;
this.focusSingleTreeNodeBinding(_c0a);
if(!this.isFocused){
this.focus();
}
_c09.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c0a;
this.focusSingleTreeNodeBinding(_c0a);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c0a;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c0a;
this.focusSingleTreeNodeBinding(_c0a);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_c09.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c0a.isFocused){
this.blurSelectedTreeNodes();
}
_c09.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c0b,_c0c){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c0d){
if(_c0d!=null&&!_c0d.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c0d);
_c0d.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c0e){
this.blurSelectedTreeNodes();
while(_c0e.hasNext()){
var _c0f=_c0e.getNext();
this._focusedTreeNodeBindings.add(_c0f);
_c0f.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c10=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c11=false;
var _c12=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c13=this._focusedTreeNodeBindings.getNext();
var _c14=_c13.getProperty(this._selectionProperty);
if(_c14!=null){
if(!this._selectionValue||this._selectionValue[_c14]){
_c12=(this._selectedTreeNodeBindings[_c13.key]=_c13);
var _c15=_c10[_c13.key];
if(!_c15||_c15!=_c12){
_c11=true;
}
}
}
}
if(_c12){
if(_c11){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c10){
for(var key in _c10){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c17=new List();
for(var key in this._selectedTreeNodeBindings){
_c17.add(this._selectedTreeNodeBindings[key]);
}
return _c17;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c19){
_c19.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c1a){
var _c1b=_c1a.getDescendantBindingsByLocalName("treenode");
var _c1c=true;
var self=this;
_c1b.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c1c;
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
var _c1f=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c1f!=null){
this.focusSingleTreeNodeBinding(_c1f);
_c1f.callback();
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
TreeBinding.prototype.add=function(_c20){
var _c21=null;
if(this._treeBodyBinding){
_c21=this._treeBodyBinding.add(_c20);
}else{
this._treeNodeBuffer.add(_c20);
_c21=_c20;
}
return _c21;
};
TreeBinding.prototype.addFirst=function(_c22){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c23=this._treeBodyBinding.bindingElement;
_c23.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c24,_c25){
if(_c25.isContainer&&_c25.isOpen){
_c25.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c26){
this._isSelectable=_c26;
if(_c26){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c27){
this._selectionProperty=_c27;
};
TreeBinding.prototype.setSelectionValue=function(_c28){
if(_c28){
var list=new List(_c28.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c2a,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c2a,arg);
switch(_c2a){
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
var _c2c=this.getFocusedTreeNodeBindings();
if(_c2c.hasEntries()){
var node=_c2c.getFirst();
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
var _c2f=this.getFocusedTreeNodeBindings();
if(_c2f.hasEntries()){
var node=_c2f.getFirst();
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
var _c32=null;
while(next==null&&(_c32=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c32!=null){
next=_c32.getNextBindingByLocalName("treenode");
}
node=_c32;
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
var _c34=DOMEvents.getTarget(e);
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
var _c35=new TreeCrawler();
var list=new List();
_c35.mode=TreeCrawler.MODE_GETOPEN;
_c35.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c38=list.getNext();
map.set(_c38.getHandle(),true);
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
var _c3d=this._positionIndicatorBinding;
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
if(y!=_c3d.getPosition().y){
_c3d.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c3d.isVisible){
_c3d.show();
}
}else{
if(_c3d.isVisible){
_c3d.hide();
}
}
}else{
if(_c3d.isVisible){
_c3d.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c40){
this._acceptingTreeNodeBinding=_c40;
this._acceptingPosition=_c40.boxObject.getLocalPosition();
this._acceptingDimension=_c40.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c40);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c41){
var map={};
var _c43=_c41.getChildBindingsByLocalName("treenode");
var _c44,pos,dim,y;
y=TreeBinding.grid(_c41.boxObject.getLocalPosition().y);
map[y]=true;
while(_c43.hasNext()){
_c44=_c43.getNext();
pos=_c44.boxObject.getLocalPosition();
dim=_c44.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c4a in this._acceptingPositions){
if(_c4a==y){
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
TreeBinding.newInstance=function(_c4b){
var _c4c=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c4b);
var _c4d=UserInterface.registerBinding(_c4c,TreeBinding);
_c4d.treeBodyBinding=TreeBodyBinding.newInstance(_c4b);
return _c4d;
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
TreeBodyBinding.prototype.accept=function(_c4e){
if(_c4e instanceof TreeNodeBinding){
this.logger.debug(_c4e);
}
};
TreeBodyBinding.prototype.handleAction=function(_c4f){
TreeBodyBinding.superclass.handleAction.call(this,_c4f);
switch(_c4f.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c4f.target);
_c4f.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c50){
var _c51=_c50.labelBinding.bindingElement;
var a=this.bindingElement.clientHeight;
var y=_c51.offsetTop;
var h=_c51.offsetHeight;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
if(y-t<0){
_c51.scrollIntoView(true);
}else{
if(y-t+h>a){
_c51.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c57){
var _c58=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c57);
return UserInterface.registerBinding(_c58,TreeBodyBinding);
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
var _c59=TreeNodeBinding.superclass.serialize.call(this);
if(_c59){
_c59.label=this.getLabel();
_c59.image=this.getImage();
var _c5a=this.getHandle();
if(_c5a&&_c5a!=this.key){
_c59.handle=_c5a;
}
if(this.isOpen){
_c59.open=true;
}
if(this.isDisabled){
_c59.disabled=true;
}
if(this.dragType){
_c59.dragtype=this.dragType;
}
if(this.dragAccept){
_c59.dragaccept=this.dragAccept;
}
}
return _c59;
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
var _c5c=UserInterface.getBinding(node);
if(_c5c&&_c5c.containingTreeBinding){
this.containingTreeBinding=_c5c.containingTreeBinding;
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
var _c5d=this.key;
var _c5e=this.getProperty("handle");
if(_c5e){
_c5d=_c5e;
}
return _c5d;
};
TreeNodeBinding.prototype.setHandle=function(_c5f){
this.setProperty("handle",_c5f);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c61=this.getProperty("label");
var _c62=this.getProperty("tooltip");
var _c63=this.getProperty("oncommand");
var _c64=this.getProperty("onbindingfocus");
var _c65=this.getProperty("onbindingblur");
var _c66=this.getProperty("focused");
var _c67=this.getProperty("callbackid");
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
if(_c61!=null){
this.setLabel(_c61);
}
if(_c62!=null){
this.setToolTip(_c62);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c69=this.bindingWindow.WindowManager;
if(_c63!=null){
this.oncommand=function(){
Binding.evaluate(_c63,this);
};
}
if(_c64!=null){
this.onfocus=function(){
Binding.evaluate(_c64,this);
};
}
if(_c65!=null){
this.onblur=function(){
Binding.evaluate(_c65,this);
};
}
if(_c66==true){
this.focus();
}
if(_c67!=null){
Binding.dotnetify(this,_c67);
}
};
TreeNodeBinding.prototype.handleAction=function(_c6a){
TreeNodeBinding.superclass.handleAction.call(this,_c6a);
switch(_c6a.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c6a.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c6b,_c6c){
var _c6d=true;
if(_c6b instanceof TreeNodeBinding){
var _c6e=false;
var _c6f=this.bindingElement;
var _c70=this.containingTreeBinding.bindingElement;
while(!_c6e&&_c6f!=_c70){
if(_c6f==_c6b.getBindingElement()){
_c6e=true;
}else{
_c6f=_c6f.parentNode;
}
}
if(_c6e){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c6d=false;
}else{
this.acceptTreeNodeBinding(_c6b,_c6c);
}
}else{
_c6d=false;
}
return _c6d;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c71,_c72){
var _c73=_c71.serializeToString();
var _c74=new BindingParser(this.bindingDocument);
var _c75=_c74.parseFromString(_c73).getFirst();
_c72=_c72?_c72:this.containingTreeBinding.getDropIndex();
var _c76=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c75,_c76.get(_c72));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c71.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c77=this.getProperty("image");
var _c78=this.getProperty("image-active");
var _c79=this.getProperty("image-disabled");
_c78=_c78?_c78:this.isContainer?_c77?_c77:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c77?_c77:TreeNodeBinding.DEFAULT_ITEM;
_c79=_c79?_c79:this.isContainer?_c77?_c77:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c77?_c77:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c77=_c77?_c77:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c77,imageHover:null,imageActive:_c78,imageDisabled:_c79});
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
TreeNodeBinding.prototype.setLabel=function(_c7b){
this.setProperty("label",String(_c7b));
if(this.isAttached){
this.labelBinding.setLabel(String(_c7b));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c7c){
this.setProperty("tooltip",String(_c7c));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c7c));
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
var _c7d=this.imageProfile.getDefaultImage();
var _c7e=this.imageProfile.getActiveImage();
_c7e=_c7e?_c7e:_c7d;
return this.isOpen?_c7e:_c7d;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c80=DOMEvents.getTarget(e);
var _c81=this.labelBinding.bindingElement;
var _c82=this.labelBinding.shadowTree.labelBody;
var _c83=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c80){
case _c81:
this._onAction(e);
break;
case _c82:
case _c83:
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
if(_c80.parentNode==this.bindingElement&&_c80.__updateType==Update.TYPE_INSERT){
var _c81=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c80)=="treenode"){
if(_c80==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c80,_c81.nextSibling);
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
switch(_c80){
case _c81:
case _c82:
case _c83:
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
var _c87=true;
if(e.type=="mousedown"){
var _c88=e.button==(e.target?0:1);
if(!_c88){
_c87=false;
}
}
if(_c87){
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
var _c8a=false;
if(e!=null){
_c8a=e.shiftKey;
}
this.dispatchAction(_c8a?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c8d=this.getDescendantBindingsByLocalName("treenode");
_c8d.each(function(_c8e){
_c8e.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c8f){
var _c90=_c8f.getAttribute("focused");
if(_c90=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c91){
var _c92=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c91);
return UserInterface.registerBinding(_c92,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c93){
var _c94=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c93);
return UserInterface.registerBinding(_c94,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c95){
this.bindingElement.style.left=_c95.x+"px";
this.bindingElement.style.top=_c95.y+"px";
this._geometry.x=_c95.x;
this._geometry.y=_c95.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c96){
var _c97=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c96);
return UserInterface.registerBinding(_c97,TreePositionIndicatorBinding);
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
this.addFilter(function(_c99){
var _c9a=UserInterface.getBinding(_c99);
var _c9b=null;
var _c9b=null;
if(!_c9a instanceof TreeNodeBinding){
_c9b=NodeCrawler.SKIP_NODE;
}
return _c9b;
});
this.addFilter(function(_c9c,list){
var _c9e=UserInterface.getBinding(_c9c);
var _c9f=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c9e.isOpen){
list.add(_c9e);
}
break;
}
return _c9f;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_ca0){
this.binding=_ca0;
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
DockTabsButtonBinding.newInstance=function(_ca1){
var _ca2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ca1);
_ca2.setAttribute("type","checkbox");
_ca2.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_ca2.className="tabbutton";
return UserInterface.registerBinding(_ca2,DockTabsButtonBinding);
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
var _ca3=DockBinding.superclass.serialize.call(this);
if(_ca3){
_ca3.active=this.isActive?true:null;
_ca3.collapsed=this.isCollapsed?true:null;
}
return _ca3;
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
var _ca4=UserInterface.getBinding(this.bindingElement.parentNode);
var _ca5=MatrixBinding.newInstance(this.bindingDocument);
_ca5.attachClassName("dockliner");
this.shadowTree.dockLiner=_ca5;
_ca4.add(_ca5);
_ca5.attach();
_ca5.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_ca7){
var _ca8=this.getSelectedTabPanelBinding();
if(_ca8){
_ca8.isVisible=_ca7;
_ca8.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_ca9){
var _caa=this._getBindingForDefinition(_ca9);
var _cab=DockTabBinding.newInstance(this.bindingDocument);
_cab.setHandle(_ca9.handle);
_cab.setLabel(_ca9.flowHandle?null:_ca9.label);
_cab.setImage(_ca9.image);
_cab.setToolTip(_ca9.toolTip);
_cab.setEntityToken(_ca9.entityToken);
_cab.setAssociatedView(_caa);
this.appendTabByBindings(_cab,null);
this._setupPageBindingListeners(_cab);
var _cac=this.getTabPanelBinding(_cab);
_caa.snapToBinding(_cac);
var _cad=this.bindingWindow.bindingMap.views;
_cad.add(_caa);
if(!this.isActive){
this.activate();
}
_caa.attach();
};
DockBinding.prototype.prepareOpenView=function(_cae,_caf){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_caf.setLabel(_cae.label);
_caf.setImage(_cae.image);
_caf.setToolTip(_cae.toolTip);
this._setupPageBindingListeners(_caf);
var _cb0=this.getTabPanelBinding(_caf);
var _cb1=this._getBindingForDefinition(_cae);
_caf.setAssociatedView(_cb1);
_cb1.snapToBinding(_cb0);
UserInterface.getBinding(this.bindingDocument.body).add(_cb1);
_cb1.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cb2){
var _cb3=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cb3.bindingDocument);
view.setDefinition(_cb2);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cb5){
var _cb6=this.getTabPanelBinding(_cb5);
var self=this;
var _cb8={handleAction:function(_cb9){
var _cba=_cb9.target;
switch(_cb9.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cba.reflex(true);
var view=_cb5.getAssociatedView();
if(_cba.bindingWindow==view.getContentWindow()){
_cb5.updateDisplay(_cba);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cb5.onPageInitialize(_cba);
_cb9.consume();
break;
case PageBinding.ACTION_UPDATED:
var view=_cb5.getAssociatedView();
if(_cba.bindingWindow==view.getContentWindow()){
_cb5.updateDisplay(_cba);
}
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cb5.updateDisplay(_cba);
_cb9.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cb5.updateEntityToken(_cba);
_cb9.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cb5.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cb5.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cb5);
_cb9.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cb5,true);
_cb9.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cb5);
break;
case Binding.ACTION_FORCE_REFLEX:
_cb6.reflex(true);
_cb9.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cb5.isDirty){
_cb5.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,PageBinding.ACTION_UPDATED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cbc){
_cb6.addActionListener(_cbc,_cb8);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cbd){
DockBinding.superclass.handleAction.call(this,_cbd);
var _cbe=_cbd.target;
switch(_cbd.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cbd.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cbe instanceof DockBinding){
if(_cbe.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cbe);
if(this.isActive){
_cbe.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cbe);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cbf,arg){
DockBinding.superclass.handleBroadcast.call(this,_cbf,arg);
switch(_cbf){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cc1=arg;
if(_cc1.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cc1.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cc2){
var tabs=this.getTabBindings();
var _cc4=false;
while(tabs.hasNext()&&!_cc4){
var tab=tabs.getNext();
var _cc6=tab.getEntityToken();
if(_cc6!=null&&_cc6==_cc2){
if(!tab.isSelected){
this.select(tab,true);
_cc4=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cc7){
this._handleCollapse(true,_cc7);
};
DockBinding.prototype.unCollapse=function(_cc8){
this._handleCollapse(false,_cc8);
};
DockBinding.prototype._handleCollapse=function(_cc9,_cca){
var _ccb=this.getChildBindingByLocalName("dockpanels");
var _ccc=this.getAncestorBindingByLocalName("splitbox");
if(_cc9){
_ccb.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cca&&_ccc.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_ccb.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cca){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cc9);
this.isCollapsed=_cc9;
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
DockBinding.prototype.closeTab=function(_cd1,_cd2){
if(_cd1.isDirty&&!_cd2){
var _cd3=Resolver.resolve(_cd1.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cd3),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cd5){
switch(_cd5){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cd1);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cd1);
break;
}
}});
}else{
this.removeTab(_cd1);
}
};
DockBinding.prototype.closeTabsExcept=function(_cd6){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cd6){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cd9){
var _cda=_cd9.getAssociatedView();
_cda.saveContainedEditor();
var self=this;
var _cdc={handleBroadcast:function(_cdd,arg){
switch(_cdd){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cda.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cdc);
if(arg.isSuccess){
self.removeTab(_cd9);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cdc);
};
DockBinding.prototype.appendTabByBindings=function(_cdf,_ce0){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cdf,_ce0);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_ce1){
_ce1=_ce1?_ce1+"px":"100%";
this.bindingElement.style.width=_ce1;
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
DockBinding.prototype.showControls=function(_ce2){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_ce2){
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
var _ce5=DockControlBinding.newInstance(this.bindingDocument);
_ce5.setControlType(type);
return _ce5;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ce7=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ce7)){
_ce7=_ce7>0?_ce7-1:0;
self.bindingElement.style.width=new String(_ce7)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ce8){
DockTabsBinding.superclass.handleCrawler.call(this,_ce8);
switch(_ce8.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
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
};
DockTabsBinding.newInstance=function(_ceb){
var _cec=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_ceb);
return UserInterface.registerBinding(_cec,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_ced){
this._viewBinding=_ced;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cee=DockTabBinding.superclass.serialize.call(this);
if(_cee){
_cee.label=null;
_cee.image=null;
_cee.handle=this.getHandle();
}
return _cee;
};
DockTabBinding.prototype.setHandle=function(_cef){
this.setProperty("handle",_cef);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cf0){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cf0;
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
var _cf1=DialogControlBinding.newInstance(this.bindingDocument);
_cf1.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cf1);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cf2){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cf2){
this.isDirty=_cf2;
if(Binding.exists(this.labelBinding)){
var _cf3=this.labelBinding.getLabel();
if(_cf3!=null){
this.labelBinding.setLabel(_cf2?"*"+_cf3:_cf3.slice(1,_cf3.length));
}else{
this.labelBinding.setLabel(_cf2?"*":"");
}
}
}
var _cf4=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cf4.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cf4.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cf5){
this.setLabel(_cf5.getLabel());
this.setImage(_cf5.getImage());
this.setToolTip(_cf5.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cf6){
this.setEntityToken(_cf6.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cf7){
DockTabBinding.superclass.handleAction.call(this,_cf7);
var _cf8=_cf7.target;
switch(_cf7.type){
case ControlBinding.ACTION_COMMAND:
if(_cf8.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cf7.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cf8);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cf9){
var cmd=_cf9.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cfb){
if(!_cfb){
if(!this.getLabel()){
_cfb=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cfb=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
_cfb=this.isDirty?"*"+_cfb:_cfb;
DockTabBinding.superclass.setLabel.call(this,_cfb);
};
DockTabBinding.prototype.setImage=function(_cfc){
if(!_cfc){
if(!this.getImage()){
_cfc=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cfc=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cfc);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cff=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cff;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cff;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cff;
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
var _d01=this.bindingElement;
setTimeout(function(){
_d01.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d02,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d02,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d02){
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
DockTabBinding.prototype.select=function(_d07){
DockTabBinding.superclass.select.call(this,_d07);
this._updateBroadcasters();
if(_d07!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _d08=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d09=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d09.enable();
if(this.isDirty){
_d08.enable();
}else{
_d08.disable();
}
}else{
_d09.disable();
_d08.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d0a){
if(this._canUpdateTree||_d0a){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d0b=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d0d=win.bindingMap.savebutton;
if(_d0d!=null){
_d0b=true;
}
}
}
return _d0b;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d0e){
var _d0f=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d0e);
return UserInterface.registerBinding(_d0f,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d10){
var _d11=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d10);
return UserInterface.registerBinding(_d11,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d12){
DockPanelBinding.superclass.select.call(this,_d12);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d13){
DockPanelBinding.superclass.handleCrawler.call(this,_d13);
if(_d13.response==null){
if(_d13.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d13.id==FocusCrawler.ID){
_d13.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d14){
var _d15=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d14);
return UserInterface.registerBinding(_d15,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d16){
var _d17=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d16);
return UserInterface.registerBinding(_d17,DockControlBinding);
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
ViewBinding.getInstance=function(_d18){
var _d19=ViewBinding._instances.get(_d18);
if(!_d19){
var cry="ViewBinding.getInstance: No such instance: "+_d18;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d19;
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
var _d1c=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d1c){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d1d=snap.boxObject.getGlobalPosition();
var _d1e=snap.boxObject.getDimension();
if(!Point.isEqual(_d1d,this._lastknownposition)){
this.setPosition(_d1d);
this._lastknownposition=_d1d;
}
if(!Dimension.isEqual(_d1e,this._lastknowndimension)){
this.setDimension(_d1e);
this._lastknowndimension=_d1e;
var _d1f=_d1e.h-ViewBinding.VERTICAL_ADJUST;
_d1f=_d1f<0?0:_d1f;
this.windowBinding.getBindingElement().style.height=new String(_d1f)+"px";
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
var _d20=this._viewDefinition.flowHandle;
if(_d20!=null){
FlowControllerService.CancelFlow(_d20);
}
}
if(this._viewDefinition!=null){
var _d21=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d21);
this.logger.fine("ViewBinding closed: \""+_d21+"\"");
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
var _d23=null;
if(this._viewDefinition!=null){
_d23=this._viewDefinition.handle;
}
return _d23;
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
ViewBinding.prototype.setDefinition=function(_d24){
this._viewDefinition=_d24;
if(_d24.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d25){
ViewBinding.superclass.handleAction.call(this,_d25);
var _d26=_d25.target;
switch(_d25.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d25.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d26.isActivated){
_d26.onActivate();
}
}
_d25.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d26==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d25.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d26==this._snapBinding){
if(_d26.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d26.getContentWindow().isPostBackDocument){
if(_d25.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d26.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d26==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d26.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d25.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d25.type==WindowBinding.ACTION_ONLOAD){
var win=_d26.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d26);
}
}
}
_d25.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d26.label&&this._viewDefinition.label){
_d26.label=this._viewDefinition.label;
}
if(!_d26.image&&this._viewDefinition.image){
_d26.image=this._viewDefinition.image;
}
if(_d26.bindingWindow==this.getContentWindow()){
this._pageBinding=_d26;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d26.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d26==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d25.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d25.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d2b,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d2b,arg);
switch(_d2b){
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
var _d2f=def.argument;
if(_d2f!=null){
page.setPageArgument(_d2f);
}
var _d30=def.width;
if(_d30!=null){
page.width=_d30;
}
var _d31=def.height;
if(_d31!=null){
page.height=_d31;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d32){
ViewBinding.superclass.handleCrawler.call(this,_d32);
switch(_d32.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d32.id==FocusCrawler.ID){
if(_d32.previousNode!=this._snapBinding.bindingElement){
_d32.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d32.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d33){
_d33.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d33.x+"px";
this.bindingElement.style.top=_d33.y+"px";
};
ViewBinding.prototype.setDimension=function(_d34){
_d34.h-=ViewBinding.VERTICAL_ADJUST;
_d34.w-=ViewBinding.HORIZONTAL_ADJUST;
_d34.w-=1;
if(_d34.h<0){
_d34.h=0;
}
if(_d34.w<0){
_d34.w=0;
}
this.bindingElement.style.width=String(_d34.w)+"px";
this.bindingElement.style.height=String(_d34.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d35){
this.isFlexBoxBehavior=false;
_d35.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d35.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d35.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d35;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d36=null;
if(this.isFreeFloating==true){
_d36=this._snapBinding.getBindingElement();
}else{
_d36=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d36;
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
ViewBinding.prototype.reload=function(_d37){
this._isLoaded=false;
this.windowBinding.reload(_d37);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d38=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d38=true;
}
}
if(!_d38){
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
ViewBinding.newInstance=function(_d3c){
var _d3d=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d3c);
var _d3e=UserInterface.registerBinding(_d3d,ViewBinding);
_d3e.windowBinding=_d3e.add(WindowBinding.newInstance(_d3c));
return _d3e;
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
var _d46=this.bindingWindow.__doPostBack;
var _d47=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d47){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d48,_d49){
if(!form.__isSetup){
Application.lock(self);
_d47=true;
}
self.manifestAllDataBindings();
_d46(_d48,_d49);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d4a,list){
var _d4c=this.bindingWindow.bindingMap.__REQUEST;
if(_d4c!=null&&this._isDotNet()){
switch(_d4a){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d4c.postback(_d4a);
}
}
break;
default:
_d4c.postback(_d4a);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d4a,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d4d,list){
var _d4f=this.getDescendantBindingsByType(WindowBinding);
_d4f.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d4d,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d53){
if(_d53.name==null||_d53.name==""){
return;
}
list.add({name:_d53.name,value:_d53.value});
});
var out="";
list.each(function(_d55){
out+=_d55.name+": "+_d55.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d56){
PageBinding.superclass.handleAction.call(this,_d56);
var _d57=_d56.target;
switch(_d56.type){
case RootBinding.ACTION_PHASE_3:
if(_d57==UserInterface.getBinding(this.bindingDocument.body)){
_d57.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d57);
}
_d56.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d58=this.validateAllDataBindings();
if(_d58){
this.doPostBack(_d57);
}
}
_d56.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d56.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d57.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d57.key)){
this._initBlockers.del(_d57.key);
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
var _d5a={handleAction:function(_d5b){
if(_d5b.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d5a);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d5a);
}else{
MessageQueue.udpdate();
}
_d56.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d5c,arg){
PageBinding.superclass.handleBroadcast.call(this,_d5c,arg);
switch(_d5c){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d5e=arg;
if(!this._canPostBack&&!_d5e){
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
PageBinding.prototype.doPostBack=function(_d60){
if(this._canPostBack){
if(_d60!=null&&this._isDotNet()){
var _d61=_d60.getCallBackID();
var _d62=_d60.getCallBackArg();
if(_d61!=null){
_d61=_d61.replace(/_/g,"$");
}else{
_d61="";
}
if(_d62==null){
_d62="";
}
this.bindingWindow.__doPostBack(_d61,_d62);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d63){
var _d64=true;
var _d65=this.bindingWindow.DataManager.getAllDataBindings();
while(_d65.hasNext()&&_d64){
var _d66=_d65.getNext();
if(_d66.isAttached){
var _d67=_d66.validate();
if(_d64&&!_d67){
_d64=false;
this.logger.debug("Invalid DataBinding: "+_d66.toString()+" ("+_d66.getName()+")");
if(_d63){
var _d68=_d66.getAncestorBindingByType(TabPanelBinding);
if(_d68!=null&&!_d68.isVisible){
var _d69=_d68.getAncestorBindingByType(TabBoxBinding);
var _d6a=_d69.getTabBinding(_d68);
_d69.select(_d6a);
}
}
break;
}
}
}
return _d64;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d6c=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6c.hasNext()){
var _d6d=_d6c.getNext();
if(_d6d.isAttached){
var _d6e=_d6d.manifest();
if(_d6e!=null){
list.add(_d6e);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d6f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6f.hasNext()){
var _d70=_d6f.getNext();
if(_d70.isAttached){
_d70.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
var _d71="";
if(!_d71&&this.labelfield){
var _d72=this.bindingWindow.DataManager.getDataBinding(this.labelfield);
if(_d72!=null&&_d72.getLabel){
_d71=_d72.getLabel();
}else{
if(_d72!=null&&_d72.getValue){
_d71=_d72.getValue();
}
}
}
if(!_d71&&this.label){
_d71=this.label;
}
return _d71;
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
var _d75=this._cachedFocus.getBinding();
if(_d75){
_d75.blur();
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
var _d76=this.getProperty("width");
if(!_d76){
_d76=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d76;
}
if(this.height==null){
var _d77=this.getProperty("height");
this.height=_d77?_d77:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d78=this.getProperty("minheight");
if(_d78!=null){
this.minheight=_d78;
}
}
if(this.controls==null){
var _d79=this.getProperty("controls");
this.controls=_d79?_d79:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d7a=this.getProperty("resizable");
this.isResizable=_d7a?_d7a:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d7b){
if(_d7b!=this.isAutoHeightLayoutMode){
if(_d7b){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d7b;
}
};
DialogPageBinding.prototype.handleAction=function(_d7c){
DialogPageBinding.superclass.handleAction.call(this,_d7c);
var _d7d=_d7c.target;
switch(_d7c.type){
case PageBinding.ACTION_ATTACHED:
if(_d7d!=this&&_d7d.isFitAsDialogSubPage){
_d7d.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d7c.consume();
if(_d7d.response!=null){
this.response=_d7d.response;
switch(_d7d.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d7e){
var _d7f=this.bindingWindow.bindingMap.buttonAccept;
if(_d7f!=null){
_d7f.setDisabled(_d7e);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d80){
var _d81=CSSComputer.getPadding(this.bindingElement);
var _d82=CSSComputer.getBorder(this.bindingElement);
_d80+=_d81.top+_d81.bottom;
_d80+=_d82.top+_d82.bottom;
if(_d80>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d80+"px";
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
EditorPageBinding.prototype.handleAction=function(_d8a){
EditorPageBinding.superclass.handleAction.call(this,_d8a);
var _d8b=_d8a.target;
switch(_d8a.type){
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
var _d8c=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d8b.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d8c==-1){
_d8c=0;
}
}else{
_d8c++;
}
return res;
});
if(_d8c>-1){
this._messengers.del(_d8c);
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
_d8a.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d8b.key,_d8b);
if(_d8b instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d8b.key);
if(_d8b instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d8b==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d8b.getSelectedTabBinding();
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
_d8a.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d8b==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d8a.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d8b==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d8a.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d8b==this._windowBinding){
if(_d8b.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d91=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d91);
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
var _d92=this.bindingWindow.bindingMap.savebutton;
if(_d92!=null&&!_d92.isDisabled){
_d92.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d93=this.bindingWindow.bindingMap.__REQUEST;
if(_d93!=null){
_d93.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d94=this.bindingWindow.bindingMap.__REQUEST;
if(_d94!=null){
_d94.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d95){
this._message=null;
switch(_d95){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d95,this._messengers);
if(!this._messengers.hasEntries()){
if(_d95==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d95;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d95;
EditorPageBinding.superclass.postMessage.call(this,_d95,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d95,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d96,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d96,arg);
switch(_d96){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d98=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d98);
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
var _d99=new List();
this._invalidBindings.each(function(key,_d9b){
var list=_d9b.getInvalidLabels();
if(list){
list.each(function(_d9d){
_d99.add(_d9d);
});
}
});
if(_d99.hasEntries()){
var _d9e="";
while(_d99.hasNext()){
_d9e+=_d99.getNext().toLowerCase();
if(_d99.hasNext()){
_d9e+=", ";
}else{
_d9e+=".";
}
}
var _d9f=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d9f+" "+_d9e);
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
EditorPageBinding.prototype.enableSave=function(_da0){
var _da1=this.bindingDocument.getElementById("broadcasterCanSave");
if(_da1){
var _da2=UserInterface.getBinding(_da1);
if(_da0){
_da2.enable();
}else{
_da2.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _da3=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_da3!=null){
UserInterface.getBinding(_da3).enable();
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
var _da4=this._windowBinding.getContentDocument().title;
if(_da4==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _da5=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_da7){
if(_da7.name=="__EVENTTARGET"&&_da5){
_da7.value=_da5;
}
list.add({name:_da7.name,value:_da7.value});
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
var _da9=this.getProperty("responseid");
this.responseid=_da9;
};
ResponsePageBinding.prototype.onBindingAttach=function(){
ResponsePageBinding.superclass.onBindingAttach.call(this);
this.addActionListener(ResponseBinding.ACTION_SUCCESS);
this.addActionListener(ResponseBinding.ACTION_FAILURE);
this.addActionListener(ResponseBinding.ACTION_OOOOKAY);
};
ResponsePageBinding.prototype.handleAction=function(_daa){
ResponsePageBinding.superclass.handleAction.call(this,_daa);
switch(_daa.type){
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
WizardPageBinding.prototype.handleAction=function(_dab){
WizardPageBinding.superclass.handleAction.call(this,_dab);
var _dac=_dab.target;
switch(_dab.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_dac);
}else{
_dab.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_dac);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_dab.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_dab.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_dad){
var next=this.bindingWindow.bindingMap.nextbutton;
var _daf=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_dad);
}
if(_daf){
_daf.setDisabled(!_dad);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_db0,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_db0,arg);
var self=this;
switch(_db0){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_db4){
};
MarkupAwarePageBinding.prototype._activate=function(_db5){
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
var _db6=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_db6.boxObject.getDimension().w;
_db6.hide();
var _db7=this.boxObject.getDimension().h;
this.bindingElement.style.height=_db7+"px";
var self=this;
var _db9=this.bindingWindow.bindingMap.moreactionsbutton;
_db9.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_dba){
self._showMoreActions();
_dba.consume();
}});
var _dbb=this.bindingWindow.bindingMap.moreactionspopup;
_dbb.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dbc){
var item=_dbc.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dbe,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dbe,arg);
switch(_dbe){
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
var _dc2=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dc2!=null){
_dc2.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dc3=this.bindingWindow.WindowManager;
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
var _dc4=new String("");
this._actionProfile.each(function(_dc5,list){
list.each(function(_dc7){
_dc4+=_dc7.getHandle()+";"+_dc7.getKey()+";";
if(_dc7.isDisabled()){
_dc4+="isDisabled='true';";
}
});
});
return _dc4;
};
SystemToolBarBinding.prototype.handleAction=function(_dc8){
SystemToolBarBinding.superclass.handleAction.call(this,_dc8);
switch(_dc8.type){
case ButtonBinding.ACTION_COMMAND:
var _dc9=_dc8.target;
this._handleSystemAction(_dc9.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dca){
if(_dca!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dcc=list.getFirst();
var _dcd=_dcc.node;
}
SystemAction.invoke(_dca,_dcd);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dd0,list){
var _dd2=new List();
list.reset();
while(list.hasNext()){
var _dd3=list.getNext();
var _dd4=null;
if(_dd3.isInToolBar()){
if(_dd3.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dd4=self.getToolBarButtonBinding(_dd3);
}
}
if(_dd4!=null){
_dd2.add(_dd4);
}
}
if(_dd2.hasEntries()){
var _dd5=ToolBarGroupBinding.newInstance(doc);
_dd2.each(function(_dd6){
_dd5.add(_dd6);
});
self.addLeft(_dd5);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dd7=this.bindingWindow.bindingMap.toolsbutton;
var _dd8=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dd9=_dd7.bindingElement.offsetLeft-this._moreActionsWidth;
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
if(_de5&&_de5.indexOf("size=")==-1){
_de5=_de5+"&size="+this.getImageSize();
_de2.imageProfile=new ImageProfile({image:_de5});
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
SystemTreeBinding.prototype.add=function(_dea){
var _deb=SystemTreeBinding.superclass.add.call(this,_dea);
if(!this._defaultTreeNode){
if(_dea instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dea;
}
}
return _deb;
};
SystemTreeBinding.prototype.handleAction=function(_dec){
SystemTreeBinding.superclass.handleAction.call(this,_dec);
var _ded=_dec.target;
switch(_dec.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_ded.key);
this._updateFocusedNode();
_dec.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dec.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_ded.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dec.consume();
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
var _def=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_def);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_df0){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_df0);
var reg=this._entityTokenRegistry;
var _df2=_df0.node.getEntityToken();
if(reg.has(_df2)){
reg.get(_df2).add(_df0);
}else{
reg.set(_df2,new List([_df0]));
}
var _df3=null;
if(this.isLockedToEditor){
if(_df2==StageBinding.entityToken){
if(_df0.node.isTreeLockEnabled()){
_df3=_df0;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_df0.node.getHandle()){
_df3=_df0;
}
}
}
if(_df3!=null){
this.focusSingleTreeNodeBinding(_df3);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_df4){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_df4);
var reg=this._entityTokenRegistry;
var _df6=_df4.node.getEntityToken();
if(reg.has(_df6)){
var list=reg.get(_df6);
list.del(_df4);
if(!list.hasEntries()){
reg.del(_df6);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_df4.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_df4.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _dfa=this._refreshingTreeNodes;
if(_dfa.hasEntries()&&_dfa.has(key)){
_dfa.del(key);
if(!_dfa.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _dfb=StageBinding.entityToken;
if(_dfb!=null){
this._focusTreeNodeByEntityToken(_dfb);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _dfc=false;
var _dfd=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_dfc=false;
}else{
if(_dfd.hasEntries()){
_dfc=true;
while(_dfc&&_dfd.hasNext()){
var _dfe=_dfd.getNext();
if(!_dfe.isDraggable){
_dfc=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_dfc;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_dff,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_dff,arg);
switch(_dff){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_dff,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_dff);
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
var self=this,_e03=arg;
setTimeout(function(){
if(_e03!=null){
self._focusTreeNodeByEntityToken(_e03);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _e05=tab.perspectiveNode==null;
if(!_e05){
_e05=tab.perspectiveNode==this.perspectiveNode;
}
if(_e05){
var self=this,_e07=tab.getEntityToken();
setTimeout(function(){
if(_e07!=null){
self._focusTreeNodeByEntityToken(_e07);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e08,_e09){
this.isLockFeatureFocus=true;
var _e0a=null;
if(this._entityTokenRegistry.has(_e08)){
var list=this._entityTokenRegistry.get(_e08);
list.each(function(tn){
var _e0d=true;
if(tn.node.isTreeLockEnabled()){
_e0a=tn;
_e0d=false;
}
return _e0d;
});
if(_e0a!=null){
if(!_e0a.isFocused){
this.focusSingleTreeNodeBinding(_e0a,true);
}else{
_e0a.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e0a==null&&_e09!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e08);
self._focusTreeNodeByEntityToken(_e08,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e0f){
var _e10=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e11=this.getRootTreeNodeBindings();
while(_e11.hasNext()){
var _e12=_e11.getNext();
_e10.add(_e12.node.getEntityToken());
}
}else{
_e10.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e10.hasNext()){
var _e13=_e10.getNext();
var _e14=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e13,_e0f,_e14);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e17=this._treeNodeBindings;
var _e18=new Map();
function fix(_e19,list){
if(!_e19.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e17.has(node.getHandle())){
var _e1c=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e18.set(node.getHandle(),_e1c);
_e19.add(_e1c);
}
});
_e19.attachRecursive();
}
}
_e19.open(true);
}
map.each(function(_e1d,list){
if(_e17.has(_e1d)){
var _e1f=_e17.get(_e1d);
fix(_e1f,list);
}else{
if(_e18.has(_e1d)){
var _e20=_e18.get(_e1d);
fix(_e20,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e21,arg){
switch(_e21){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e23=arg;
if(_e23!=null){
this._invokeServerRefresh(_e23);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e24=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e24;
_e24.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e24=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e24;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e25){
if(_e25!=null&&_e25=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e25)){
var list=this._entityTokenRegistry.get(_e25).reset();
this._refreshToken=_e25;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e27=list.getNext();
this._refreshingTreeNodes.set(_e27.key,true);
setTimeout(function(){
_e27.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e28=this.getFocusedTreeNodeBindings().getFirst();
if(_e28){
var _e29=_e28.getLabel();
var _e2a=_e28.getAncestorBindingByLocalName("treenode");
if(_e2a){
_e28=_e2a;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e28.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e2b=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e2b,[_e29]);
}
_e28.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e2c=SystemTreeBinding.clipboard;
if(_e2c){
var type=_e2c.dragType;
var _e2e=this.getFocusedTreeNodeBindings().getFirst();
if(_e2e.dragAccept){
if(_e2e.acceptor.isAccepting(type)){
this._performPaste(_e2e);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e2f){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e2f.node.hasDetailedDropSupport()){
if(_e2f.node.hasChildren()){
var _e31=_e2f.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e32,_e33){
if(_e32==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e34=_e33.get("switch");
var _e35=_e33.get("sibling");
if(_e34=="after"){
_e35++;
}
var _e36=_e2f.accept(SystemTreeBinding.clipboard,_e35);
if(_e36){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e31);
}else{
Application.lock(self);
var _e37=_e2f.accept(SystemTreeBinding.clipboard,0);
if(_e37){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e37=_e2f.accept(SystemTreeBinding.clipboard,0);
if(_e37){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e38=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e38!=null){
this._focusTreeNodeByEntityToken(_e38);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e39){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e39){
this.blurSelectedTreeNodes();
var _e3a=this.getRootTreeNodeBindings();
_e3a.each(function(_e3b){
if(_e3b.isContainer&&_e3b.isOpen){
_e3b.close();
_e3b.hasBeenOpened=false;
_e3b.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e3c){
if(_e3c!=this.isLockedToEditor){
this.isLockedToEditor=_e3c;
if(_e3c){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e3e=this.getRootTreeNodeBindings();
_e3e.each(function(_e3f){
var _e40=_e3f.getOpenSystemNodes();
if(_e40!=null&&_e40.hasEntries()){
list.merge(_e40);
}else{
if(_e3f.isOpen){
list.add(_e3f.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e41){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e41);
if(_e41!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.setActionGroup=function(_e42){
if(_e42){
var list=new List(_e42.split(" "));
this._actionGroup={};
while(list.hasNext()){
this._actionGroup[list.getNext()]=true;
}
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e44=new Map();
var _e45=this.getFocusedTreeNodeBindings();
var _e46=_e45.getFirst().node.getActionProfile();
if(_e46!=null){
var self=this;
_e46.each(function(_e48,list){
var _e4a=new List();
list.each(function(_e4b){
if(_e4b.getActivePositions()&self._activePosition){
if(!self._actionGroup||self._actionGroup[_e4b.getGroupName()]){
_e4a.add(_e4b);
}
}
});
if(_e4a.hasEntries()){
_e44.set(_e48,_e4a);
}
});
}
_e44.activePosition=this._activePosition;
return _e44;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e4c,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e4c,arg);
switch(_e4c){
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
var _e51=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e51.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e52=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e52.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e53){
SystemTreePopupBinding.superclass.handleAction.call(this,_e53);
switch(_e53.type){
case MenuItemBinding.ACTION_COMMAND:
var _e54=_e53.target;
var _e55=_e54.associatedSystemAction;
if(_e55){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e57=list.getFirst();
var _e58=_e57.node;
}
SystemAction.invoke(_e55,_e58);
}else{
var cmd=_e54.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e5b=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e5b=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e5b=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e5b=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e5b=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e5b){
setTimeout(function(){
EventBroadcaster.broadcast(_e5b);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e5c=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e5c.hasNext()){
var _e5d=UserInterface.getBinding(_e5c.getNext());
if(!_e5d.getProperty("rel")){
_e5d.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e5f=new List();
var self=this;
this._actionProfile.each(function(_e61,list){
var _e63=MenuGroupBinding.newInstance(doc);
list.each(function(_e64){
var _e65=self.getMenuItemBinding(_e64);
_e63.add(_e65);
});
_e5f.add(_e63);
});
_e5f.reverse();
while(_e5f.hasNext()){
this._bodyBinding.addFirst(_e5f.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e66){
var _e67=MenuItemBinding.newInstance(this.bindingDocument);
var _e68=_e66.getLabel();
var _e69=_e66.getToolTip();
var _e6a=_e66.getImage();
var _e6b=_e66.getDisabledImage();
var _e6c=_e66.isCheckBox();
if(_e68){
_e67.setLabel(_e68);
}
if(_e69){
_e67.setToolTip(_e69);
}
if(_e6a){
_e67.imageProfile=new ImageProfile({image:_e6a,imageDisabled:_e6b});
}
if(_e6c){
_e67.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e66.isChecked()){
_e67.check(true);
}
}
if(_e66.isDisabled()){
_e67.disable();
}
_e67.associatedSystemAction=_e66;
return _e67;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e70=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e70=UserInterface.getBinding(node);
if(_e70.isDisabled){
_e70=null;
}
}
break;
}
if(_e70!=null&&_e70.node!=null&&_e70.node.getActionProfile()!=null){
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
var _e71=this.node.getLabel();
if(_e71){
this.setLabel(_e71);
}
var _e72=this.node.getToolTip();
if(_e72){
this.setToolTip(_e72);
}
var _e73=this.node.getHandle();
if(_e73){
this.setHandle(_e73);
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
var _e76="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e76+=list.getNext();
if(list.hasNext()){
_e76+=" ";
}
}
this.setProperty("dragaccept",_e76);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e78){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e78);
switch(_e78.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e78.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e78.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e79,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e79,arg);
switch(_e79){
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
var _e7c=null;
var _e7d=this.node.getImageProfile();
if(_e7d){
if(this.isOpen){
_e7c=_e7d.getActiveImage();
}else{
_e7c=_e7d.getDefaultImage();
}
}
if(!_e7c){
_e7c=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e7c;
};
SystemTreeNodeBinding.prototype.open=function(_e7e){
var _e7f=this.isContainer&&!this.isOpen;
var _e80=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e7f&&(_e80||SystemTreeBinding.HAS_NO_MEMORY)&&_e7e!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e81=null;
if(this.isContainer){
_e81=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e81);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e83){
if(_e83!=null){
this._refreshBranch(_e83);
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
var _e84=new List();
var _e85=this.node.getChildren();
this.empty();
if(_e85.hasEntries()){
this._insertTreeNodesRegulated(_e85);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e86){
var _e87=0;
var _e88=new List([]);
while(_e86.hasEntries()&&_e87<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e89=SystemTreeNodeBinding.newInstance(_e86.extractFirst(),this.bindingDocument);
_e89.autoExpand=this.autoExpand;
this.add(_e89);
_e89.attach();
_e87++;
if(this.autoExpand){
if(_e87==1&&!_e86.hasEntries()||LocalStore.openedNodes.has(_e89.node)){
_e88.add(_e89);
}
}
}
if(_e86.hasEntries()){
this._insertBufferTreeNode(_e86);
}
_e88.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e8c){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e8e=this.node.getDescendantBranch(list);
if(_e8e.hasEntries()){
this.XXX(_e8e);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e8f){
var self=this;
var map=new Map();
this.empty();
_e8f.each(function(key,_e93){
if(_e93.hasEntries()){
_e93.each(function(node){
var _e95=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e95);
if(map.has(key)){
var _e96=map.get(key);
_e96.add(_e95);
_e96.isOpen=true;
_e96.hasBeenOpened=true;
node.searchToken=_e96.node.searchToken;
}else{
if(key==self.node.getHandle()){
self.add(_e95);
node.searchToken=self.node.searchToken;
}else{
}
}
});
}
});
this.attachRecursive();
_e8f.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e97=new TreeCrawler();
var _e98=new List();
_e97.mode=TreeCrawler.MODE_GETOPEN;
_e97.crawl(this.bindingElement,_e98);
if(_e98.hasEntries()){
_e98.extractFirst();
}
_e97.dispose();
return _e98;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e99=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e99=new List([this.node]);
list.each(function(_e9b){
_e99.add(_e9b.node);
});
}
return _e99;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e9c,_e9d){
var _e9e=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e9c instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e9c.node.getData(),this.node.getData(),_e9d?_e9d:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e9e);
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
SystemTreeNodeBinding.newInstance=function(node,_ea2){
var _ea3=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_ea2);
var _ea4=UserInterface.registerBinding(_ea3,SystemTreeNodeBinding);
_ea4.node=node;
return _ea4;
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
SystemPageBinding.prototype.setPageArgument=function(_ea5){
this.node=_ea5;
SystemPageBinding.superclass.setPageArgument.call(this,_ea5);
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
var _ea6=this.node.getChildren();
if(_ea6.hasEntries()){
while(_ea6.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_ea6.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ea8=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ea8.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _eaa=new TreeCrawler();
var _eab=new List();
_eaa.mode=TreeCrawler.MODE_GETOPEN;
_eaa.crawl(this.bindingElement,_eab);
_eaa.dispose();
var list=new List([this.node]);
_eab.each(function(_ead){
list.add(_ead.node);
});
this._tree.empty();
var _eae=this.node.getDescendantBranch(list);
if(_eae.hasEntries()){
var self=this;
var map=new Map();
_eae.each(function(key,_eb2){
_eb2.each(function(node){
var _eb4=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eb4);
if(map.has(key)){
var _eb5=map.get(key);
_eb5.add(_eb4);
_eb5.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_eb4);
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
SystemPageBinding.prototype.handleAction=function(_eb6){
SystemPageBinding.superclass.handleAction.call(this,_eb6);
switch(_eb6.type){
case ButtonBinding.ACTION_COMMAND:
var _eb7=_eb6.target;
switch(_eb7.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eb7.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_eb8,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_eb8,arg);
switch(_eb8){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _eba=arg;
if(this.node&&this.node.getEntityToken()==_eba){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_eba);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_eba);
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
StageContainerBinding.prototype.handleBroadcast=function(_ebc,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ebc,arg);
var _ebe=this.bindingWindow.WindowManager;
switch(_ebc){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ebe.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ebe.WINDOW_RESIZED_BROADCAST:
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
var _ec0=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ec0.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.placeholderWidth=null;
StageBinding.handleViewPresentation=function(_ec1){
if(StageBinding.isViewOpen(_ec1)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ec1);
}else{
var _ec2=ViewDefinitions[_ec1];
StageBinding.presentViewDefinition(_ec2);
}
};
StageBinding.isViewOpen=function(_ec3){
return StageBinding.bindingInstance._activeViewDefinitions[_ec3]!=null;
};
StageBinding.presentViewDefinition=function(_ec4){
if(_ec4.label!=null){
var _ec5=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ec5,[_ec4.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ec4);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ec7,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ec9=System.getPerspectiveNodes();
if(_ec9.hasEntries()){
this._initializeSystemViewDefinitions(_ec9);
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
var _ecb=null;
if(LocalStore.isEnabled){
_ecb=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ecb&&ViewDefinitions[_ecb]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ecb));
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
var _ecd=root.getActionProfile();
if(_ecd&&_ecd.hasEntries()){
var _ece=top.app.bindingMap.toolsmenugroup;
if(_ece){
_ecd.each(function(_ecf,list){
list.each(function(_ed1){
var item=MenuItemBinding.newInstance(_ece.bindingDocument);
item.setLabel(_ed1.getLabel());
item.setToolTip(_ed1.getToolTip());
item.setImage(_ed1.getImage());
item.setDisabled(_ed1.isDisabled());
item.associatedSystemAction=_ed1;
var _ed3=_ece;
var tag=_ed1.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ed3=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ed3.add(item);
});
});
_ece.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ed5){
while(_ed5.hasNext()){
var node=_ed5.getNext();
var _ed7=node.getHandle();
ViewDefinitions[_ed7]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ed8){
StageBinding.superclass.handleAction.call(this,_ed8);
var _ed9=_ed8.target;
switch(_ed8.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ed9;
this._inflateBinding(_ed9);
_ed8.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ed9;
this._inflateBinding(_ed9);
_ed8.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ed9);
_ed8.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ed9 instanceof DockBinding){
switch(_ed9.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ed9.reference,_ed9);
break;
}
this.handleAttachedDock(_ed9);
_ed8.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ed9 instanceof DockBinding){
this.handleSelectedDockTab(_ed9.getSelectedTabBinding());
_ed8.consume();
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
_ed8.consume();
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
_ed8.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ed8);
};
StageBinding.prototype.handleBroadcast=function(_edb,arg){
StageBinding.superclass.handleBroadcast.call(this,_edb,arg);
switch(_edb){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _edd=arg;
this._dontView(_edd);
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
StageBinding.prototype._showStart=function(_edf){
if(_edf!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ee2=this.bindingWindow.bindingMap.maindecks;
if(_edf){
_ee2.select("startdeck");
view.show();
}else{
view.hide();
_ee2.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_edf;
}
};
StageBinding.prototype._inflateBinding=function(_ee3){
for(var _ee4 in ViewDefinitions){
var _ee5=ViewDefinitions[_ee4];
if(_ee5 instanceof SystemViewDefinition){
_ee3.mountDefinition(_ee5);
}
}
var _ee6=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ee6){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ee9=new StageCrawler();
_ee9.mode=mode;
_ee9.crawl(this.bindingElement);
_ee9.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_eea){
var _eeb=_eea.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_eeb);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_eeb));
}
};
StageBinding.prototype.handleAttachedDock=function(_eec){
var _eed=_eec.getTabBindings();
if(_eed.hasEntries()){
while(_eed.hasNext()){
var _eee=_eed.getNext();
var _eef=_eee.getHandle();
if(_eef){
if(_eef=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ef0=ViewDefinitions[_eef];
if(_ef0){
this._view(_eec,_eee,_ef0,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_eef+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ef1){
var _ef2=null;
var _ef3=false;
switch(_ef1.position){
case Dialog.MODAL:
_ef2=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ef2=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ef1.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ef2=this._dockBindings.get(_ef1.position);
break;
case DockBinding.EXTERNAL:
window.open(_ef1.url);
_ef3=true;
break;
default:
var _ef4=this._decksBinding.getSelectedDeckBinding();
_ef2=_ef4.getDockBindingByReference(_ef1.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ef5=this.bindingWindow.bindingMap.maindecks;
_ef5.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ef3=true;
}
break;
}
if(!_ef3){
if(_ef2!=null){
this._view(_ef2,null,_ef1,true);
}else{
throw "StageBinding: Could not position view: "+_ef1.handle;
}
}
};
StageBinding.prototype._view=function(_ef6,_ef7,_ef8,_ef9){
var _efa=_ef8.handle;
if(_ef8.isMutable){
_efa+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_efa]){
var _efb=ViewBinding.getInstance(_efa);
if(_efb!=null){
_efb.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_efa);
}
}else{
this._activeViewDefinitions[_efa]=_ef8;
Application.lock(this);
switch(_ef6.constructor){
case DockBinding:
if(_ef9){
_ef6.prepareNewView(_ef8);
}else{
_ef6.prepareOpenView(_ef8,_ef7);
}
break;
case StageDialogBinding:
if(_ef9){
_ef6.prepareNewView(_ef8);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_efc){
if(this._activeViewDefinitions[_efc]!=null){
delete this._activeViewDefinitions[_efc];
}else{
this.logger.debug("Could not unregister active view: "+_efc);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_efd){
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
this.addFilter(function(_eff){
var _f00=UserInterface.getBinding(_eff);
var _f01=null;
if(_f00){
switch(_f00.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_f00.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_f00.handleUnMaximization();
break;
}
break;
case DockBinding:
_f01=NodeCrawler.SKIP_NODE;
break;
}
}
return _f01;
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
var _f02=null;
this._dialogs.each(function(_f03){
if(!_f03.isVisible){
_f02=_f03;
}
return _f02!=null;
});
if(!_f02){
this._newInstance();
_f02=this._dialogs.getLast();
}
_f02.setModal(false);
return _f02;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _f04=this.getInstance();
_f04.setModal(true);
return _f04;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _f05=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_f05);
_f05.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_f06){
if(_f06 instanceof DialogViewDefinition){
var _f07=ViewBinding.newInstance(this.bindingDocument);
_f07.setDefinition(_f06);
_f07.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_f06.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_f06.handler)){
this._dialogResponseHandler=_f06.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_f07;
this._body.add(_f07);
_f07.attach();
_f07.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f08){
StageDialogBinding.superclass.handleAction.call(this,_f08);
var _f09=_f08.target;
switch(_f08.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f09);
_f08.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f09.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f08.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f09.response){
this._handleDialogPageResponse(_f09);
}
_f08.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f08.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f08.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f08.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f08.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f08.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f08.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f08.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f08.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f09==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f0a,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f0a,arg);
switch(_f0a){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f0c){
var _f0d=new FitnessCrawler();
var list=new List();
if(_f0c){
_f0d.mode=FitnessCrawler.MODE_BRUTAL;
}
_f0d.crawl(this.bindingElement,list);
_f0d.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f0f){
_f0f.fit(_f0c);
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
var _f10=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f10){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f12){
var cmd=_f12.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f14){
if(_f14.bindingDocument==this._viewBinding.getContentDocument()){
if(_f14 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f14);
}
this._pageBinding=_f14;
if(_f14.height=="auto"){
_f14.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f14);
_f14.enableAutoHeightLayoutMode(false);
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
if(_f14.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f14);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f15){
var _f16=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f16){
var _f17=UserInterface.getBinding(_f16);
_f17.setDisabled(_f15);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f18){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f18.response,_f18.result!=null?_f18.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f1a){
if(_f1a.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f1a);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f1c){
switch(_f1c.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f1c.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f1c.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f1d){
var _f1e=_f1d.label;
var _f1f=_f1d.image;
var _f20=_f1d.width;
var _f21=_f1d.height;
var _f22=_f1d.controls;
var _f23=_f1d.isResizable;
if(_f1e){
this.setLabel(_f1e);
}
if(_f1f){
this.setImage(_f1f);
}
if(_f20||_f21){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f20?_f20:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f21!=null&&_f21!="auto")?_f21:old.h;
if(this._isResizable){
nev.h=(top.window.innerHeight<nev.h)?top.window.innerHeight:nev.h;
nev.w=(top.window.innerWidth<nev.w)?top.window.innerWidth:nev.w;
}
this.setDimension(nev);
}
if(_f22){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f27=new List(_f22.split(" "));
while((type=_f27.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f23!=this._isResizable){
this.setResizable(_f23);
}
if(_f21=="auto"){
this._fixAutoHeight(_f1d);
}
if(_f1d==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f28){
var dim=this.getDimension();
var _f2a=0;
var _f2b=0;
if(_f28.isDialogSubPage){
_f28=this._pageBinding;
}
if(this._isFirstPage){
_f2a=_f28.width!=null?_f28.width:dim.w;
}else{
_f2a=dim.w;
}
_f2b=_f28.bindingElement.offsetHeight;
_f2b+=this._titlebar.bindingElement.offsetHeight;
_f2b+=4;
_f2b+=4;
if(_f2b<dim.h){
_f2b=dim.h;
}
if(_f28.minheight!=null){
if(_f2b<_f28.minheight){
_f2b=_f28.minheight;
}
}
this.setDimension(new Dimension(_f2a,_f2b));
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
StageDialogBinding.newInstance=function(_f2e){
var _f2f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f2e);
var _f30=UserInterface.registerBinding(_f2f,StageDialogBinding);
_f30.setProperty("controls","minimize maximize close");
return _f30;
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
this.addFilter(function(_f31,list){
var _f33=null;
var _f34=UserInterface.getBinding(_f31);
if(!_f34.isVisible){
_f33=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f33;
});
this.addFilter(function(_f35,list){
var _f37=null;
var _f38=UserInterface.getBinding(_f35);
if(_f38.isAttached){
if(Interfaces.isImplemented(IFit,_f38)){
if(!_f38.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f38);
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
StageDecksBinding.prototype.mountDefinition=function(_f39){
var _f3a=StageDeckBinding.newInstance(this.bindingDocument);
_f3a.handle=_f39.handle;
_f3a.perspectiveNode=_f39.node;
this._decks[_f3a.handle]=_f3a;
this.add(_f3a);
_f3a.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f3b){
var _f3c=this._decks[_f3b];
StageBinding.perspectiveNode=_f3c.perspectiveNode;
this.select(_f3c);
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
StageDeckBinding.prototype.handleAction=function(_f3d){
StageDeckBinding.superclass.handleAction.call(this,_f3d);
var _f3e=_f3d.target;
switch(_f3d.type){
case WindowBinding.ACTION_LOADED:
if(_f3e==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f3d.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f3e instanceof DockBinding){
this._dockBindings.set(_f3e.reference,_f3e);
_f3e.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f3d.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f3d.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f3d);
StageDeckBinding.superclass.handleAction.call(this,_f3d);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f40=new StageCrawler();
_f40.mode=mode;
_f40.crawl(this.windowBinding.getContentDocument().body);
_f40.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f41){
return this._dockBindings.get(_f41);
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
StageDeckBinding.newInstance=function(_f43){
var _f44=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f43);
var _f45=UserInterface.registerBinding(_f44,StageDeckBinding);
return _f45;
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
StageSplitBoxBinding.prototype.handleAction=function(_f46){
StageSplitBoxBinding.superclass.handleAction.call(this,_f46);
StageBoxAbstraction.handleAction.call(this,_f46);
var _f47=_f46.target;
var _f48=null;
var _f49=null;
switch(_f46.type){
case DockBinding.ACTION_EMPTIED:
_f49=this.getChildBindingByLocalName("splitter");
if(_f49.isVisible){
_f49.hide();
}
_f48=this.getDescendantBindingsByLocalName("dock");
if(_f48.getFirst().isEmpty&&_f48.getLast().isEmpty){
if(_f48.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f46.consume();
break;
case DockBinding.ACTION_OPENED:
_f48=this.getDescendantBindingsByLocalName("dock");
if(!_f48.getFirst().isEmpty&&!_f48.getLast().isEmpty){
_f49=this.getChildBindingByLocalName("splitter");
if(!_f49.isVisible){
_f49.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f46.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f47!=this){
_f49=this.getChildBindingByLocalName("splitter");
if(_f49.isVisible){
_f49.hide();
}
this.invokeLayout();
_f46.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f47!=this){
var _f4a=this.getChildBindingsByLocalName("splitpanel");
if(_f4a.getFirst().isVisible&&_f4a.getLast().isVisible){
_f49=this.getChildBindingByLocalName("splitter");
if(!_f49.isVisible){
_f49.show();
}
}
this.invokeLayout();
_f46.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f4b){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f4b);
switch(_f4b.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f4b.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f4c=this.getChildBindingsByLocalName("splitpanel");
return _f4c.getFirst().isVisible&&_f4c.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f4d=this.getChildBindingsByLocalName("splitpanel");
return _f4d.getFirst().isFixed&&_f4d.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f4e){
StageSplitPanelBinding.superclass.handleAction.call(this,_f4e);
StageBoxAbstraction.handleAction.call(this,_f4e);
switch(_f4e.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f4e.type==StageSplitBoxBinding.ACTION_HIDE){
_f4e.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f4e.type==DockBinding.ACTION_EMPTIED){
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
if(_f4e.type==StageSplitBoxBinding.ACTION_SHOW){
_f4e.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f51=_f4e.target;
if(_f51!=this&&_f51.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f52=_f51._containingSplitBoxBinding;
if(_f52.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f53=_f52.getChildBindingsByLocalName("splitpanel");
var _f54=_f53.getFirst();
var _f55=_f53.getLast();
if(this.isFixed==true){
if(!_f54.isFixed||!_f55.isFixed||(!_f52.hasBothPanelsVisible()&&_f51.isMinimizedForReal)){
this.setFix(false);
_f4e.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f52.hasBothPanelsFixed()||(!_f52.hasBothPanelsVisible()&&_f51.isMinimizedForReal)){
this.setFix(_f51.getContainedDock().getHeight());
_f4e.consume();
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
var _f56=this.getContainedDock();
if(_f56){
if(this.isMaximizePrepared==true){
}else{
_f56.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f57=this.getContainedDock();
if(_f57){
if(_f57.type==DockBinding.TYPE_EDITORS){
if(_f57.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f57.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f58=this.getContainedDock();
if(_f58){
_f58.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f58);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f59=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f5a=this.getContainedDock();
if(_f5a){
_f5a.collapse(_f59);
if(!_f59){
this.setFix(_f5a.getHeight());
}else{
this.setFix(_f5a.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f5a&&_f5a.isActive){
_f5a.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f5a);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f5b){
var _f5c=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f5d=this.getContainedDock();
if(_f5d){
if(this.isMinimized==true){
_f5d.unCollapse(_f5c);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f5b){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f5d){
_f5d.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f5d);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f5e){
var _f5f=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f5f=false;
}
}
if(_f5f==true){
this._invisibilize(_f5e);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f61){
if(_f61!=this._isInvisibilized){
if(_f61){
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
StageSplitterBinding.prototype.onDragStart=function(_f62){
var _f63=top.app.bindingMap.stagesplittercover;
var _f64=this._containingSplitBoxBinding.getOrient();
switch(_f64){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f63.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f63.bindingElement.style.cursor="n-resize";
break;
}
_f63.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f64);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f6a){
this._orient=_f6a;
this.attachClassName(_f6a);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f6c=true;
var _f6d=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f6d=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f6c=false;
break;
}
if(_f6c){
this.bindingElement.style.left=pos.x+"px";
}
if(_f6d){
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
StageBoxAbstraction.handleAction=function(_f6f){
switch(_f6f.type){
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
if(_f6f.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f6f.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f70=this.bindingElement.style;
_f70.position="absolute";
_f70.width="100%";
_f70.height="100%";
_f70.top="0";
_f70.left="0";
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
var _f71=this.bindingElement.style;
_f71.position="relative";
_f71.width="auto";
_f71.height="auto";
_f71.top="auto";
_f71.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f72,_f73){
var _f74=_f72.bindingElement.style;
var _f75=_f72.bindingElement.parentNode;
var box=_f72._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f73){
_f72._unmodifiedFlexMethod=_f72.flex;
_f72.flex=function(){
_f74.width=_f75.offsetWidth+"px";
_f74.height=_f75.offsetHeight+"px";
};
}else{
_f74.width="100%";
_f74.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f74.width="auto";
_f74.height="auto";
box.reflex(true);
},0);
}
_f72.flex=_f72._unmodifiedFlexMethod;
_f72._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f77){
var _f78=_f77.target;
switch(_f77.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f78 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f77);
_f77.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f77.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f79){
var mode=null;
switch(_f79.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f7b){
StageMenuBarBinding.superclass.handleAction.call(this,_f7b);
switch(_f7b.type){
case MenuItemBinding.ACTION_COMMAND:
var _f7c=_f7b.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f7c){
SystemAction.invoke(_f7c,this._rootNode);
}
}
_f7b.consume();
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
var _f7d=this.getProperty("handle");
if(_f7d){
this._handle=_f7d;
if(StageBinding.isViewOpen(_f7d)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f7d);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f7f){
this.setProperty("handle",_f7f);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f80,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f80,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f80){
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
StageViewMenuItemBinding.newInstance=function(_f82){
var _f83=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f82);
UserInterface.registerBinding(_f83,StageViewMenuItemBinding);
return UserInterface.getBinding(_f83);
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
StageStatusBarBinding.prototype.setLabel=function(_f84){
this._label.setLabel(_f84);
};
StageStatusBarBinding.prototype.setImage=function(_f85){
this._label.setImage(_f85);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f86){
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
var _f87=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f88=_f87.getAssociatedView();
var _f89=_f88.getContentWindow().bindingMap.tree;
var _f8a=_f89.getFocusedTreeNodeBindings();
if(!_f8a.hasEntries()&&StageBinding.treeSelector){
_f8a=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f8a;
};
ExplorerBinding.saveFocusedNodes=function(){
var _f8b=this.getFocusedTreeNodeBindings();
LocalStore.focuseNodes.clear();
_f8b.each(function(_f8c){
LocalStore.focuseNodes.add(_f8c.node);
});
};
ExplorerBinding.restoreFocuseNodes=function(){
var _f8d=LocalStore.focuseNodes.getEntityTokens();
var _f8e=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f8f=_f8e.getAssociatedView();
var _f90=_f8f.getContentWindow().bindingMap.tree;
_f8d=new List(TreeService.GetCurrentLocaleEntityTokens(_f8d.toArray()));
_f8d.each(function(_f91){
_f90._focusTreeNodeByEntityToken(_f91);
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
ExplorerBinding.prototype.handleAction=function(_f92){
ExplorerBinding.superclass.handleAction.call(this,_f92);
var _f93=_f92.target;
switch(_f92.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f92.consume();
break;
case Binding.ACTION_DRAG:
if(_f93 instanceof ExplorerSplitterBinding){
_f93.dragger.registerHandler(this);
}
_f92.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f95){
this._menuBinding.setSelectionByHandle(_f95);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f96){
if(_f96 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f96);
this._menuBinding.mountDefinition(_f96);
}
};
ExplorerBinding.prototype.onDragStart=function(_f97){
var _f98=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f98.hasEntries()){
var _f99=_f98.getFirst();
this._dragStart=_f99.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f99.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f9d){
if(_f9d instanceof SystemViewDefinition){
var _f9e=ViewBinding.newInstance(this.bindingDocument);
_f9e.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f9e.setDefinition(_f9d);
var _f9f=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f9f.setAssociatedView(_f9e);
this._decks[_f9d.handle]=_f9f;
_f9f.add(_f9e);
this.add(_f9f);
function attach(){
_f9f.attach();
_f9e.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_fa0){
var _fa1=this._decks[_fa0];
this.select(_fa1);
};
DecksBinding.prototype.expandBy=function(_fa2){
var deck=this.getSelectedDeckBinding();
if(deck){
var _fa4=this.bindingElement.offsetHeight+_fa2;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_fa4+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_fa6){
var _fa7=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_fa6);
return UserInterface.registerBinding(_fa7,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_fa8){
this._viewBinding=_fa8;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _fa9=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _faa=this._viewBinding.getDefinition().label;
StatusBar.busy(_fa9,[_faa]);
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
ExplorerDeckBinding.prototype.handleAction=function(_fab){
ExplorerDeckBinding.superclass.handleAction.call(this,_fab);
var _fac=_fab.target;
switch(_fab.type){
case PageBinding.ACTION_INITIALIZED:
if(_fac instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_fac.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_fad,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_fad,arg);
switch(_fad){
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
var _faf=null;
if(this._isExplorerDeckBindingInitialized){
_faf=this._viewBinding.getDefinition().label;
}else{
_faf=DockTabBinding.LABEL_TABLOADING;
}
return _faf;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fb0=null;
if(this._isExplorerDeckBindingInitialized){
_fb0=this._viewBinding.getDefinition().image;
}else{
_fb0=DockTabBinding.IMG_TABLOADING;
}
return _fb0;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fb1=null;
if(this._isExplorerDeckBindingInitialized){
_fb1=this._viewBinding.getDefinition().toolTip;
}
return _fb1;
};
ExplorerDeckBinding.newInstance=function(_fb2){
var _fb3=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fb2);
return UserInterface.registerBinding(_fb3,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fb4){
switch(_fb4.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fb4.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fb4.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fb4);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fb5){
this._maxButtons.set(_fb5.handle,this._mountMaxButton(_fb5));
this._minButtons.set(_fb5.handle,this._mountMinButton(_fb5));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fb6){
var _fb7=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fb7.setLabel(_fb6.label);
_fb7.setToolTip(_fb6.toolTip);
_fb7.handle=_fb6.handle;
_fb7.node=_fb6.node;
this._maxGroup.add(_fb7);
this._maxList.add(_fb7);
_fb7.attach();
if(Client.isPad){
_fb7.hide();
}
return _fb7;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fb8){
var _fb9=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fb9.setLabel(_fb8.label);
_fb9.setToolTip(_fb8.label);
_fb9.handle=_fb8.handle;
_fb9.node=_fb8.node;
this._minGroup.addFirst(_fb9);
this._minList.add(_fb9);
_fb9.attach();
if(!Client.isPad){
_fb9.hide();
}
return _fb9;
};
ExplorerMenuBinding.prototype.handleAction=function(_fba){
ExplorerMenuBinding.superclass.handleAction.call(this,_fba);
switch(_fba.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fbb=_fba.target;
var _fbc=_fbb.getCheckedButtonBinding();
var _fbd=_fbc.handle;
switch(_fbb){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fbd),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fbd),true);
break;
}
this._selectedHandle=_fbd;
this._selectedTag=_fbc.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fba.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fbe){
var _fbf=this._maxButtons.get(_fbe);
if(_fbf){
_fbf.check();
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
var _fc0=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fc0=true;
}
return _fc0;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fc2=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fc2=true;
}
return _fc2;
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
ExplorerToolBarBinding.newInstance=function(_fc3){
var _fc4=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fc3);
return UserInterface.registerBinding(_fc4,ExplorerToolBarBinding);
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
var _fc5=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fc6=_fc5?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fc6);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fc7,_fc8){
var _fc9=(_fc8==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fca=DOMUtil.createElementNS(Constants.NS_UI,_fc9,_fc7);
var _fcb=UserInterface.registerBinding(_fca,ExplorerToolBarButtonBinding);
_fcb.explorerToolBarButtonType=_fc8;
return _fcb;
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
EditorBinding.invokeFunctionEditorDialog=function(_fcc,_fcd,type){
type=type?type:"";
var _fcf=FunctionService.GetCustomEditorSettingsByMarkup(_fcc);
var def=ViewDefinitions["Composite.Management.PostBackDialog"];
if(!_fcf){
def.width=500;
def.height=520;
}else{
var dim=top.WindowManager.getWindowDimensions();
def.width=_fcf.Width?(_fcf.Width>dim.w?dim.w:_fcf.Width):undefined;
def.height=_fcf.Height?(_fcf.Height>dim.h?dim.h:_fcf.Height):undefined;
if(_fcf.Url){
_fcf.Url=_fcf.Url.indexOf("?")>-1?_fcf.Url+"&consoleId="+Application.CONSOLE_ID:_fcf.Url+"?consoleId="+Application.CONSOLE_ID;
}
}
def.label="${string:Composite.Web.FormControl.FunctionCallsDesigner:DialogTitle}";
def.image="${icon:parameter_overloaded}";
def.handler=_fcd;
def.argument={url:_fcf?_fcf.Url:EditorBinding.URL_UPDATERENDERING.replace("{0}",type),list:new List([{name:"functionmarkup",value:_fcc}])};
StageBinding.presentViewDefinition(def);
};
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fd2,_fd3){
var _fd4=EditorBinding._components;
var _fd5=EditorBinding._editors;
var key=_fd3.key;
var _fd7=Interfaces.isImplemented(IWysiwygEditorComponent,_fd2);
if(!_fd7){
_fd7=Interfaces.isImplemented(ISourceEditorComponent,_fd2);
}
if(_fd7){
if(_fd5.has(key)){
_fd5.get(key).initializeEditorComponent(_fd2);
}else{
if(!_fd4.has(key)){
_fd4.set(key,new List());
}
_fd4.get(key).add(_fd2);
}
}else{
throw "Editor component interface not implemented: "+_fd2;
}
};
EditorBinding.claimComponents=function(_fd8,_fd9){
var _fda=EditorBinding._components;
var _fdb=EditorBinding._editors;
var key=_fd9.key;
_fdb.set(key,_fd8);
var list=null;
if(_fda.has(key)){
list=_fda.get(key).copy();
_fda.del(key);
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
var _fdf=this.getProperty("value");
if(_fdf!=null){
_fdf=decodeURIComponent(_fdf);
this._startContent=_fdf;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fe1=this.bindingWindow.DataManager;
_fe1.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fe3){
var _fe4=EditorBinding.claimComponents(this,_fe3);
if(_fe4!=null){
while(_fe4.hasNext()){
this.initializeEditorComponent(_fe4.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fe6=this.bindingWindow.DataManager;
if(_fe6.getDataBinding(name)){
_fe6.unRegisterDataBinding(name);
}
_fe6.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fe7=this.getEditorDocument();
if(_fe7!=null){
Application.framework(_fe7);
DOMEvents.addEventListener(_fe7,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fe7,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fe7,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fe7,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fe9){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fe9==true){
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
var _feb=this.getCheckSum();
if(_feb!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_feb;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fec=null;
if(Binding.exists(this._pageBinding)){
_fec=this._pageBinding.getCheckSum(this._checksum);
}
return _fec;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fee=DOMEvents.getTarget(e);
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
if(_fee.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_ff0,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ff0,arg);
var _ff2=null;
switch(_ff0){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ff3=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ff3=false;
}
}
}else{
_ff2=DOMEvents.getTarget(arg);
if(_ff2&&_ff2.ownerDocument==this.getEditorDocument()){
_ff3=false;
}
}
if(_ff3){
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
EditorBinding.prototype._activateEditor=function(_ff4){
if(_ff4!=this._isActivated){
this._isActivated=_ff4;
EditorBinding.isActive=_ff4;
var _ff5=this.getEditorWindow().standardEventHandler;
var _ff6=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ff6!=null){
if(_ff4){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ff6.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_ff5.enableNativeKeys(true);
}else{
_ff6.disable();
_ff5.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _ff7=this.getEditorDocument().selection.createRange();
_ff7.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _ff8=false;
try{
var _ff9=this.getEditorWindow().getSelection();
if(_ff9!=null){
_ff8=_ff9.toString().length>0;
if(!_ff8){
var _ffa=_ff9.getRangeAt(0);
var frag=_ffa.cloneContents();
var _ffc=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_ffc.appendChild(frag.firstChild);
}
var img=_ffc.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_ff8=true;
}
}
}
}
}
catch(exception){
}
return _ff8;
};
EditorBinding.prototype.isCommandEnabled=function(_ffe){
var _fff=true;
switch(_ffe){
case "Cut":
case "Copy":
case "Paste":
_fff=this.getEditorDocument().queryCommandEnabled(_ffe);
break;
}
return _fff;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1003=false;
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
_1003=true;
}
break;
}
return _1003;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _1006=this.getContentWindow().bindingMap.toolbar;
var _1007=_1006.getButtonForCommand(cmd);
if(!_1007){
throw "No button for command "+cmd;
}
return _1007;
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
EditorBinding.prototype.handleAction=function(_100b){
EditorBinding.superclass.handleAction.call(this,_100b);
var _100c=_100b.target;
var self=this;
var _100e=this.shadowTree.iframe;
switch(_100b.type){
case Binding.ACTION_DIRTY:
if(_100b.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_100f){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_100f);
};
EditorBinding.prototype.handleElement=function(_1010){
return true;
};
EditorBinding.prototype.updateElement=function(_1011){
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
var _1014=this._menuGroups[rel];
if(_1014 instanceof List){
_1014.each(function(group){
group.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1017=this._menuGroups[rel];
if(_1017 instanceof List){
_1017.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1019){
EditorPopupBinding.superclass.handleAction.call(this,_1019);
var _101a=_1019.target;
if(_1019.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_101a.getProperty("cmd");
var gui=_101a.getProperty("gui");
var val=_101a.getProperty("val");
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
var _101e=this.bindingWindow.bindingMap.tinywindow;
var _101f=this.bindingWindow.bindingMap.codepresswindow;
if(_101e){
EditorBinding.registerComponent(this,_101e);
}else{
if(_101f){
EditorBinding.registerComponent(this,_101f);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1020,_1021,_1022,theme){
this._editorBinding=_1020;
this._tinyEngine=_1021;
this._tinyInstance=_1022;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1024,frame,_1026){
this._editorBinding=_1024;
this._codePressFrame=frame;
this._codePressEngine=_1026;
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
var _1029=this._editorBinding;
if(_1029!=null){
var self=this;
var _102b={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1029.hasBookmark()){
_1029.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1029.hasBookmark()){
_1029.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_102b);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_102b);
}
};
EditorClickButtonBinding.newInstance=function(_102d){
var _102e=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_102d);
return UserInterface.registerBinding(_102e,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_102f){
var _1030=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_102f);
return UserInterface.registerBinding(_1030,EditorToolBarButtonBinding);
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
var _1031=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1031);
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
EditorSelectorBinding.prototype.initializeComponent=function(_1032,_1033,_1034,theme){
this._editorBinding=_1032;
this._tinyEngine=_1033;
this._tinyInstance=_1034;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1036){
EditorSelectorBinding.superclass.handleAction.call(this,_1036);
switch(_1036.type){
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
EditorMenuItemBinding.newInstance=function(_103a){
var _103b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_103a);
return UserInterface.registerBinding(_103b,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_103c){
var i=0,_103e,_103f=[],split=_103c.split(" ");
while((_103e=split[i++])!=null){
if(_103e.length>=3&&_103e.substring(0,3)=="mce"){
continue;
}else{
if(_103e.length>=14&&_103e.substring(0,14)=="compositemedia"){
continue;
}
}
_103f.push(_103e);
}
return _103f.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1041){
var _1042=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1041);
if(soap instanceof SOAPFault){
}else{
_1042=soap.XhtmlFragment;
if(!_1042){
_1042="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1042;
};
VisualEditorBinding.getTinyContent=function(_1044,_1045){
var _1046=null;
if(_1044==null||!_1044.replace(/\s*/gm,"").length){
_1044=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=_1045.getSoapTinyContent(_1044);
if(soap instanceof SOAPFault){
var _1048=soap;
var _1049={handleDialogResponse:function(){
_1045.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1049,_1048);
}else{
_1046=soap.XhtmlFragment;
if(_1046==null){
_1046=new String("");
}
_1046=_1046.replace(/\s+<li>/g,"<li>");
}
WebServiceProxy.isFaultHandler=true;
return _1046;
};
VisualEditorBinding.isImage=function(_104a){
return _104a&&_104a.nodeName=="IMG";
};
VisualEditorBinding.isImageElement=function(_104b){
return VisualEditorBinding.isImage(_104b)&&!VisualEditorBinding.isReservedElement(_104b);
};
VisualEditorBinding.isReservedElement=function(_104c){
if(VisualEditorBinding.isFunctionElement(_104c)){
return true;
}
if(VisualEditorBinding.isFieldElement(_104c)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_104c)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_104d){
return VisualEditorBinding.isImage(_104d)&&CSSUtil.hasClassName(_104d,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_104e){
return VisualEditorBinding.isImage(_104e)&&CSSUtil.hasClassName(_104e,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_104f){
return VisualEditorBinding.isImage(_104f)&&CSSUtil.hasClassName(_104f,VisualEditorBinding.HTML_CLASSNAME);
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
var _1050=this.getProperty("embedablefieldstypenames");
if(_1050!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1050);
}
var _1051=this.getProperty("formattingconfiguration");
if(_1051!=null){
this._url+="?config="+_1051;
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
VisualEditorBinding.prototype.handleBroadcast=function(_1052,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1052,arg);
var _1054=this.getContentWindow().bindingMap.tinywindow;
var _1055=_1054.getContentWindow();
switch(_1052){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1055){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1054);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.handleCommand("CompositeUpdateLayout",false,null);
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1056){
_1056.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
this._startContent=this.normalizeToDocument(this._startContent);
this._startContent=this.extractBody(this._startContent);
var _1057=VisualEditorBinding.getTinyContent(this._startContent,this);
if(_1057.replace(/\s*/gm,"").length==0){
_1057=VisualEditorBinding.DEFAULT_CONTENT;
}
this._tinyInstance.setContent(_1057,{format:"raw"});
this.updateBodyWidth();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1058){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1058);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractBody=function(html){
var _105a=null;
var re=/(<body\s*[^>]*>)([\S\s]*)(<\/body>)/i;
var match=html.match(re);
if(match){
_105a=match[2];
this._xhtml=html.replace(re,"$1\n${body}\n\t$3");
}else{
_105a=new String("");
this._xhtml=VisualEditorBinding.XHTML;
}
return _105a;
};
VisualEditorBinding.prototype.normalizeToDocument=function(_105d){
var _105e=_105d;
if(!this._isNormalizedDocument(_105d)){
_105e=this._getHtmlMarkup().replace("${body}",_105d);
}
return _105e;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_105f){
var _1060=false;
var doc=XMLParser.parse(_105f,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1060=true;
}
}
if(Client.isWebKit){
if(_105f.indexOf("<html")!==0){
_1060=false;
}
}
return _1060;
};
VisualEditorBinding.prototype._getHtmlMarkup=function(){
return this._xhtml!=null?this._xhtml:VisualEditorBinding.XHTML;
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1065=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1065){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1065=true;
}
return _1065;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1067=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1067);
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
VisualEditorBinding.prototype.getSoapTinyContent=function(_1069){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1069,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getImageTagForFunctionCall=function(_106b){
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_106b,this._previewPageId,this._previewTemplateId,this._previewPlaceholder,width);
};
VisualEditorBinding.prototype.getEffectiveWidth=function(){
var body=this._tinyInstance.getBody();
var _106e=CSSComputer.getPadding(body);
var _106f=this.getContentWindow().bindingMap.editorsplitpanel;
var width=_106f.bindingElement.offsetWidth-52;
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
VisualEditorBinding.prototype.setResult=function(_1072){
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
VisualEditorPopupBinding.prototype.configure=function(_1073,_1074,_1075){
var _1076=this.editorBinding.hasSelection();
this.tinyInstance=_1073;
this.tinyEngine=_1074;
this.tinyElement=_1075;
this.hasSelection=_1076;
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
var _107a=false;
if(this.hasSelection){
_107a=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_107a=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_107a=true;
}
}
}
}
if(_107a){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _107b=this.getMenuItemForCommand("compositeInsertLink");
var _107c=this.getMenuItemForCommand("unlink");
var _107d=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _107e=this.editorBinding.getButtonForCommand("unlink");
_107c.setDisabled(_107e.isDisabled);
if(_107c.isDisabled){
_107b.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_107b.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _107f=this.editorBinding.embedableFieldConfiguration;
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
if(_107f){
var _1082=_107f.getGroupNames();
if(_1082.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1082.each(function(_1086){
var _1087=_107f.getFieldNames(_1086);
_1087.each(function(_1088){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1088);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1086+":"+_1088);
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
var _108a=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _108b=null;
var _108c=null;
if(_108a){
if(_108a.nodeName=="TD"){
_108b=_108a.getAttribute("colspan");
_108c=_108a.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_108b=="1"&&_108c=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_108a){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_108d){
var _108e=VisualEditorFormattingConfiguration._configurations;
if(!_108e.has(_108d)){
_108e.set(_108d,new VisualEditorFormattingConfiguration());
}
return _108e.get(_108d);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1090){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1091){
var _1092=null;
var _1093=VisualEditorFieldGroupConfiguration._configurations;
if(!_1093.has(_1091)){
_1093.set(_1091,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1091)));
}
return _1093.get(_1091);
};
function VisualEditorFieldGroupConfiguration(_1094){
var _1095=new Map();
new List(_1094).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1095.set(group.GroupName,map);
});
this._groups=_1095;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1099){
return this._groups.get(_1099).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_109a,_109b){
return this._groups.get(_109a).get(_109b).xhtml;
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
var _109d=this.getDescendantElementsByLocalName("textarea");
while(_109d.hasNext()){
var _109e=_109d.getNext();
if(_109e.getAttribute("selected")=="true"){
this._startContent=_109e.value;
this._textareaname=_109e.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _10a0=this.getContentWindow().bindingMap.templatetree;
_10a0.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_10a1){
var _10a2=_10a0.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_10a2.textareaname);
_10a1.consume();
}});
_10a0.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_10a3){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _10a4=this.getContentWindow().bindingMap.toolsplitter;
_10a4.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _10a5=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_10a5.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_10a5);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_10a6){
this._textareas=new Map();
while(_10a6.hasNext()){
var _10a7=_10a6.getNext();
var _10a8=_10a7.getAttribute("placeholderid");
this._textareas.set(_10a8,{placeholderid:_10a8,placeholdername:_10a7.getAttribute("placeholdername"),placeholdermarkup:_10a7.value,textareaelement:_10a7,isSelected:_10a7.getAttribute("selected")=="true"});
}
var _10a9=new Map();
this._textareas.each(function(name,_10ab){
var _10ac=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_10ac.setLabel(_10ab.placeholdername);
_10ac.setImage("${icon:placeholder}");
_10ac.setProperty("placeholder",true);
_10ac.textareaname=name;
_10a9.set(_10ab.placeholdername,_10ac);
if(_10ab.isSelected){
selected=_10ac;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _10ad=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_10ad.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _10ae=this.getContentWindow().bindingMap.templatetree;
var _10af=_10ae.add(TreeNodeBinding.newInstance(_10ae.bindingDocument));
_10af.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_10af.setImage("${icon:warning}");
_10af.attach();
var _10b0=this.getContentWindow().bindingMap.statusbar;
_10b0.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _10b2=this._textareas.get(name);
var _10b3=_10b2.placeholdermarkup;
this.setValue(this.normalizeToDocument(_10b3));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_10b4){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_10b4;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _10b5=this.getContentWindow().bindingMap.statusbar;
_10b5.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_10b4);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractBody=function(html){
var _10b8=VisualMultiEditorBinding.superclass.extractBody.call(this,html);
this._xhtmls.set(this._textareaname,this._xhtml);
return _10b8;
};
VisualMultiEditorBinding.prototype._getHtmlMarkup=function(){
var _10b9=VisualEditorBinding.XHTML;
if(this._xhtmls.has(this._textareaname)){
_10b9=this._xhtmls.get(this._textareaname);
if(_10b9==null){
_10b9=VisualEditorBinding.XHTML;
}
}
return _10b9;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_10bb){
_10bb.textareaelement.value=_10bb.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10bc,_10bd){
var _10be=_10bc.getElementsByTagName("div").item(0);
var _10bf=_10bd.getElementsByTagName("div").item(0);
var _10c0=new List(_10be.getElementsByTagName("textarea"));
var _10c1=new List(_10bf.getElementsByTagName("textarea"));
var _10c2=false;
if(_10c0.getLength()!=_10c1.getLength()){
_10c2=true;
}else{
var index=0;
_10c0.each(function(_10c4,index){
var _10c6=_10c1.get(index);
var newid=_10c4.getAttribute("placeholderid");
var oldid=_10c6.getAttribute("placeholderid");
var _10c9=_10c4.getAttribute("placeholdername");
var _10ca=_10c6.getAttribute("placeholdername");
if(newid!=oldid||_10c9!=_10ca){
_10c2=true;
}
return !_10c2;
});
}
if(_10c2){
var html=null;
if(_10be.innerHTML!=null){
html=_10be.innerHTML;
}else{
html=DOMSerializer.serialize(_10be);
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
VisualMultiTemplateEditorBinding.prototype._onPageInitialize=function(_10cd){
VisualMultiTemplateEditorBinding.superclass._onPageInitialize.call(this,_10cd);
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
var _10d0=this.getDescendantBindingByLocalName("selector");
_10d0.attach();
this._populateTemplateSelector();
var _10d1=this.getContentWindow().bindingMap.templateselector;
_10d1.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10d2=this.getDescendantBindingByLocalName("selector");
var _10d3=this.getContentWindow().bindingMap.templateselector;
_10d2.selections.each(function(_10d4){
_10d4.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10d3.populateFromList(_10d2.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10d5=this.getDescendantBindingByLocalName("selector");
var _10d6=this.getContentWindow().bindingMap.templateselector;
_10d5.selectByValue(_10d6.getValue());
_10d5.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10d7){
this.updateTemplatePreview();
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10dc,_10dd){
var _10de=_10dd;
if(old.has(_10dc)){
_10de=old.get(_10dc).placeholdermarkup;
}
return _10de;
}
while(_10d7.hasNext()){
var _10df=_10d7.getNext();
var _10e0=_10df.getAttribute("placeholderid");
this._textareas.set(_10e0,{placeholderid:_10e0,placeholdername:_10df.getAttribute("placeholdername"),placeholdermarkup:compute(_10e0,_10df.value),textareaelement:_10df,isSelected:_10df.getAttribute("selected")=="true"});
}
var _10e1=null;
var _10e2=this.getContentWindow().bindingMap.templatetree;
var _10e3=new Map();
this._textareas.each(function(name,_10e5){
var _10e6=_10e2.add(TreeNodeBinding.newInstance(_10e2.bindingDocument));
_10e6.setLabel(_10e5.placeholdername);
_10e6.setImage("${icon:placeholder}");
_10e6.setProperty("placeholder",true);
_10e6.textareaname=name;
_10e3.set(_10e5.placeholdername,_10e6);
if(_10e5.isSelected){
_10e1=_10e6;
}
});
_10e2.attachRecursive();
if(_10e1!=null){
var _10e7=true;
if(this._oldtextareas.hasEntries()){
_10e7=false;
var map=new Map();
this._textareas.each(function(id,_10ea){
map.set(_10ea.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10e7=true;
}
}
if(_10e7){
var _10eb=this._textareas.get(_10e1.textareaname);
this._textareaname=_10e1.textareaname;
this._placeholdername=_10eb.placeholdername;
this._setContentFromPlaceHolder(_10e1.textareaname);
_10e1.focus();
}else{
var _10ec=_10e3.get(this._placeholdername);
this._textareaname=_10ec.textareaname;
_10ec.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype._placeHolderSelected=function(name){
VisualMultiTemplateEditorBinding.superclass._placeHolderSelected.call(this,name);
this.updateBodyWidth();
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10ee,_10ef){
var _10f0=_10ee.getElementsByTagName("ui:selector").item(0);
var _10f1=_10ef.getElementsByTagName("ui:selector").item(0);
var _10f2=false;
if(_10f0!=null&&_10f1!=null){
var _10f3=new List(_10f0.getElementsByTagName("ui:selection"));
var _10f4=new List(_10f1.getElementsByTagName("ui:selection"));
if(_10f3.getLength()!=_10f4.getLength()){
_10f2=true;
}else{
_10f3.each(function(_10f5,index){
var _10f7=_10f5.getAttribute("value");
var _10f8=_10f4.get(index).getAttribute("value");
if(_10f7!=_10f8){
_10f2=true;
}
return !_10f2;
});
}
}
if(_10f2){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10f0);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10ee,_10ef);
};
VisualMultiTemplateEditorBinding.prototype.enableDialogMode=function(){
StageBinding.placeholderWidth=this.getPlaceholderWidth();
VisualMultiTemplateEditorBinding.superclass.enableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.disableDialogMode=function(){
StageBinding.placeholderWidth=null;
VisualMultiTemplateEditorBinding.superclass.disableDialogMode.call(this);
};
VisualMultiTemplateEditorBinding.prototype.getPlaceholderWidth=function(_10fa){
var _10fb=null;
if(_10fa==undefined){
_10fa=this._textareaname;
}
var self=this;
if(this._templatePreview){
new List(this._templatePreview.Placeholders).each(function(_10fd){
if(_10fd.PlaceholderId==_10fa){
_10fb=_10fd.ClientRectangle.Width;
return false;
}
});
}
return _10fb;
};
VisualMultiTemplateEditorBinding.prototype.updateTemplatePreview=function(){
var _10fe=this._pageId;
var _10ff=this.getDescendantBindingByLocalName("selector").getValue();
this._templatePreview=null;
var self=this;
PageTemplateService.GetTemplatePreviewInformation(_10fe,_10ff,function(_1101){
self._templatePreview=_1101;
self.updateBodyWidth();
});
};
VisualMultiTemplateEditorBinding.prototype.getSoapTinyContent=function(_1102){
var _1103=this._pageId;
var _1104=this._textareaname;
var _1105=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.StructuredContentToTinyContentMultiTemplate(_1102,_1103,_1105,_1104,width);
};
VisualMultiTemplateEditorBinding.prototype.getImageTagForFunctionCall=function(_1107){
var _1108=this._pageId;
var _1109=this._textareaname;
var _110a=this.getDescendantBindingByLocalName("selector").getValue();
var width=this.getEffectiveWidth();
return XhtmlTransformationsService.GetImageTagForFunctionCall2(_1107,_1108,_110a,_1109,width);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_110c,frame,_110e){
this._editorBinding=_110c;
this._codePressFrame=frame;
this._codePressEngine=_110e;
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
var _1114=this.getProperty("validate");
if(_1114==true){
this._hasStrictValidation=true;
}
var _1115=this.getProperty("strictsave");
if(_1115===false){
this._strictSave=false;
}
var _1116=this.getProperty("validator");
if(_1116!=null){
this._validator=_1116;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_1117,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_1117,arg);
switch(_1117){
case BroadcastMessages.CODEMIRROR_LOADED:
var _1119=this.getContentWindow().bindingMap.codemirrorwindow;
if(_1119!=null){
var _111a=_1119.getContentWindow();
if(arg.broadcastWindow==_111a){
this._codemirrorWindow=_111a;
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
this.initializeEditorComponents(_1119);
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
this.unsubscribe(_1117);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_111e){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_111e);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_111f){
if(_111f!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_111f;
EditorBinding.isActive=_111f;
var _1120=this._codemirrorWindow.standardEventHandler;
if(_111f){
_1120.enableNativeKeys(true);
}else{
_1120.disableNativeKeys();
}
var _1121=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1121!=null){
if(_111f){
_1121.enable();
}else{
_1121.disable();
}
}
if(_111f){
this.focus();
this._codemirrorWindow.focus();
}else{
this._codemirrorWindow.blur();
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1125=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1125;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_1126){
_1126.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_1128){
if(!this._isFinalized){
if(_1128!=this._startContent){
this._startContent=_1128;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1128);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _1129=this.getContentWindow().bindingMap.editorpage.getContent();
return _1129?_1129:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_112a){
if(this._pageBinding!=null){
this._pageBinding.cover(_112a);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_112b){
if(_112b!=null&&this.shadowTree.dotnetinput!=null){
var value=_112b.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _112d=true;
var _112e=this.getContent();
if(this._validator!=null){
_112d=Validator.validateInformed(_112e,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
var _112f=_112e.replace("&nbsp;","&#160;").replace("&ldquo;","\xe2\u20ac\u0153").replace("&rdguo;","\xe2\u20ac\ufffd").replace("&lsquo;","\xe2\u20ac\u02dc").replace("&rsquo;","\xe2\u20ac\u2122").replace("&laquo;","\xc2\xab").replace("&raquo;","\xc2\xbb").replace("&lsaquo;","\xe2\u20ac\xb9").replace("&rsaquo;","\xe2\u20ac\xba").replace("&bull;","\xe2\u20ac\xa2").replace("&deg;","\xc2\xb0").replace("&hellip;","\xe2\u20ac\xa6").replace("&trade;","\xe2\u201e\xa2").replace("&copy;","\xc2\xa9").replace("&reg;","\xc2\xae").replace("&mdash;","\xe2\u20ac\u201d").replace("&ndash;","\xe2\u20ac\u201c").replace("&sup2;","\xc2\xb2").replace("&sup3;","\xc2\xb3").replace("&frac14;","\xc2\xbc").replace("&frac12;","\xc2\xbd").replace("&frac34;","\xc2\xbe").replace("&times;","\xc3\u2014").replace("&larr;","\xe2\u2020\ufffd").replace("&rarr;","\xe2\u2020\u2019").replace("&uarr;","\xe2\u2020\u2018").replace("&darr;","\xe2\u2020\u201c").replace("&middot;","\xc2\xb7").replace("<!doctype","<!DOCTYPE");
if(_112f!=_112e){
_112e=_112f;
this.setContent(_112f);
}
_112d=XMLParser.isWellFormedDocument(_112e,true,!this._strictSave);
if(_112d==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_112d=this._isValidHTML(_112e);
break;
}
}
break;
}
}
return _112d;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _1131=true;
var doc=XMLParser.parse(xml);
var _1133=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1133.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1133.add("NamespaceURI");
}
var head=null,body=null;
var _1137=new List(root.childNodes);
while(_1137.hasNext()){
var child=_1137.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1133.add("MultipleHead");
}
if(body!=null){
_1133.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1133.add("MultipleBody");
}
body=child;
break;
default:
_1133.add("NotAllowedHtmlChild");
}
}
}
if(head==null){
_1133.add("MissingHead");
}
if(body==null){
_1133.add("MissingBody");
}
}
if(_1133.hasEntries()){
_1131=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1133.getFirst()));
}
return _1131;
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
var _1139=null;
var page=this._pageBinding;
if(page!=null){
_1139=page.getCheckSum();
}
return _1139;
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
ThrobberBinding.prototype.handleBroadcast=function(_113b,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_113b,arg);
switch(_113b){
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
ProgressBarBinding.notch=function(_113e){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_113e);
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
ProgressBarBinding.prototype.notch=function(_1140){
_1140=_1140?_1140:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1140);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1142,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1142,arg);
switch(_1142){
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
StartMenuItemBinding.prototype.setChecked=function(_1144,_1145){
StartMenuItemBinding.superclass.setChecked.call(this,_1144,_1145);
if(!_1145){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1146){
var _1147=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1146);
UserInterface.registerBinding(_1147,StartMenuItemBinding);
return UserInterface.getBinding(_1147);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_114a,_114b){
var _114c=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_114b,true)==true){
if(_114a!="*"){
_114a=KeySetBinding._sanitizeKeyModifiers(_114a);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_114c[doc]){
_114c[doc]={};
}
if(!_114c[doc][code]){
_114c[doc][code]={};
}
_114c[doc][code][_114a]=_114b;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1150=false;
var code=e.keyCode;
var _1152=KeySetBinding.keyEventHandlers;
if(_1152[doc]&&_1152[doc][code]){
var _1153="[default]";
_1153+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
if(Client.isMac){
_1153+=code!=KeyEventCodes.VK_COMMAND?e.metaKey?" control":"":"";
}else{
_1153+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
}
var _1154=_1152[doc][code][_1153];
if(_1154==null){
_1154=_1152[doc][code]["*"];
}
if(_1154!=null){
_1154.handleKeyEvent(e);
_1150=true;
}
}
return _1150;
};
KeySetBinding._sanitizeKeyModifiers=function(_1155){
var _1156="[default]";
var mods={};
if(_1155){
new List(_1155.split(" ")).each(function(_1158){
mods[_1158]=true;
});
function check(_1159){
if(mods[_1159]){
_1156+=" "+_1159;
}
}
check("shift");
check("control");
}
return _1156;
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
var _115d=key.getAttribute("oncommand");
var _115e=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_115e){
DOMEvents.preventDefault(e);
}
var _1160=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_115d,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1161){
if(_1161 instanceof CursorBinding){
_1161.setOpacity(0);
_1161.show();
new Animation({modifier:9,onstep:function(_1162){
_1161.setOpacity(Math.sin(_1162*Math.PI/180));
},onstop:function(){
_1161.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1163){
if(_1163 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1164){
_1163.setOpacity(Math.cos(_1164*Math.PI/180));
},onstop:function(){
_1163.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1165,_1166,_1167){
if(_1165 instanceof CursorBinding){
_1167.x-=16;
_1167.y-=16;
new Animation({modifier:3,onstep:function(_1168){
var tal=Math.sin(_1168*Math.PI/180);
_1165.setPosition(new Point(((1-tal)*_1166.x)+((0+tal)*_1167.x),((1-tal)*_1166.y)+((0+tal)*_1167.y)));
},onstop:function(){
CursorBinding.fadeOut(_1165);
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
CursorBinding.prototype.setOpacity=function(_116e){
this.bindingElement.style.opacity=new String(_116e);
this._opacity=_116e;
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
function setOpacity(_1171){
cover.bindingElement.style.opacity=new String(_1171);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1172){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1172*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1174){
cover.bindingElement.style.MozOpacity=new String(_1174);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1175){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1175*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1177){
if(_1177!=this._isBusy){
if(_1177){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1177;
}
};
CoverBinding.prototype.setTransparent=function(_1178){
if(_1178!=this._isTransparent){
if(_1178){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1178;
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
CoverBinding.prototype.setHeight=function(_117a){
if(_117a>=0){
this.bindingElement.style.height=new String(_117a+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_117b){
var _117c=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_117b);
return UserInterface.registerBinding(_117c,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _117e=UncoverBinding._bindingInstance;
if(Binding.exists(_117e)){
_117e.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1182){
this._isFading=_1182==true;
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
var _1183=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1183.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1183.clearRect(0,0,300,150);
_1183.fillRect(0,0,300,150);
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
var _1185=this._canvas.getContext("2d");
_1185.clearRect(0,0,300,150);
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
var _1186=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1186);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1187=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1187){
this._startcontent=_1187.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1188){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1188);
switch(_1188.type){
case WindowBinding.ACTION_ONLOAD:
if(_1188.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1188.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1188);
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
var _118c=this._transformer.transformToString(doc);
this._inject(_118c);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_118f){
this.getContentDocument().body.innerHTML=_118f;
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
var _1197=list.getNext();
var id=_1197.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1197);
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
var _11a1=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_11a1.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_11a1.appendChild(att);
}
elm.appendChild(_11a1);
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
var _11ab=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_11ab){
doc=XMLParser.parse(_11ab);
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
var _11af=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_11af;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_11b0,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_11b0,arg);
switch(_11b0){
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
var _11b3=new List();
list.each(function(lang){
_11b3.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_11b3);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11b7){
switch(_11b7){
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
var _11ba=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_11ba,root);
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
var _11bb=this.getProperty("status");
if(_11bb!=null){
switch(_11bb){
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
UserInterfaceMapping.prototype.merge=function(_11bf){
for(var _11c0 in _11bf.map){
this.map[_11c0]=_11bf.getBindingImplementation(_11c0);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_11c1){
var _11c2=null;
var name=_11c1.nodeName.toLowerCase();
if(this.map[name]){
_11c2=this.map[name];
}
return _11c2;
};
var UserInterface=new function(){
var _11c4=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _11c5=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_11c4,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _11c6=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_11c8,impl){
var _11ca=null;
if(!this.hasBinding(_11c8)){
var _11cb=DOMUtil.getParentWindow(_11c8);
if(DOMUtil.getLocalName(_11c8)!="bindingmapping"){
if(!impl&&_11c8.getAttribute("binding")!=null){
var _11cc=_11c8.getAttribute("binding");
impl=_11cb[_11cc];
if(impl==null){
throw "No such binding in scope: "+_11cc;
}
}
if(!impl){
var _11cd=_11cb.DocumentManager;
if(_11cd){
var _11ce=_11cd.customUserInterfaceMapping;
if(_11ce){
impl=_11ce.getBindingImplementation(_11c8);
}
}
}
if(!impl){
impl=_11c5.getBindingImplementation(_11c8);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_11ca=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_11ca){
var key=KeyMaster.getUniqueKey();
_11c8.setAttribute("key",key);
_11ca.key=key;
if(!_11c8.id){
_11c8.id=key;
}
keys[key]={element:_11c8,binding:_11ca};
_11ca.onBindingRegister();
}
}
}
return _11ca;
};
this.unRegisterBinding=function(_11d0){
terminate(_11d0);
};
function terminate(_11d1){
if(Binding.exists(_11d1)==true){
var key=_11d1.key;
Binding.destroy(_11d1);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_11d1=null;
}else{
_11c6.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11d3){
var _11d4=null;
if(keys[_11d3.key]){
_11d4=keys[_11d3.key].element;
}
return _11d4;
};
this.getBinding=function(_11d5){
var _11d6=null;
if(_11d5&&_11d5.nodeType==Node.ELEMENT_NODE){
try{
var key=_11d5.getAttribute("key");
if(key&&keys[key]){
_11d6=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_11d5);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11d6;
};
this.getBindingByKey=function(key){
var _11d9=null;
if(keys[key]){
_11d9=keys[key].binding;
}
return _11d9;
};
this.hasBinding=function(_11da){
return this.getBinding(_11da)!=null;
};
this.isBindingVisible=function(_11db){
var _11dc=Application.isOperational;
if(_11dc==true){
var _11dd=new Crawler();
_11dd.type=NodeCrawler.TYPE_ASCENDING;
_11dd.id="visibilitycrawler";
_11dd.addFilter(function(_11de){
var b=UserInterface.getBinding(_11de);
var res=0;
if(!b.isVisible){
_11dc=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11dd.crawl(_11db.bindingElement);
_11dd.dispose();
}
return _11dc;
};
var _11e1=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11e1={};
for(var key in keys){
_11e1[key]=true;
}
};
this.getPoint=function(){
var _11e5=null;
if(_11e1){
_11e5=new List();
for(var key in keys){
if(!_11e1[key]){
_11e5.add(key);
}
}
}
return _11e5;
};
this.clearPoint=function(){
_11e1=null;
};
this.trackUndisposedBindings=function(){
var _11e7=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11e7){
_11e7="Bindings illdisposed: ";
}
_11e7+=entry.binding+" ";
}
}
if(_11e7!=null){
_11c6.error(_11e7);
}
};
this.autoTrackDisposedBindings=function(_11ea){
if(_11ea){
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
SOAPRequest.newInstance=function(_11eb,_11ec){
var _11ed=_11eb+"/"+_11ec;
var _11ee=new SOAPRequest(_11ed);
var _11ef=SOAPRequest.resolver;
_11ee.document=Templates.getTemplateDocument("soapenvelope.xml");
_11ee.envelope=_11ef.resolve("soap:Envelope",_11ee.document);
_11ee.header=_11ef.resolve("soap:Header",_11ee.envelope);
_11ee.body=_11ef.resolve("soap:Body",_11ee.envelope);
return _11ee;
};
SOAPRequest._parseResponse=function(_11f0){
var _11f1=null;
var _11f2=false;
var doc=_11f0.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11f1=SOAPRequestResponse.newInstance(_11f0.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11f0.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11f2=true;
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
var text=_11f0.responseText;
if(_11f0.status==503||text.indexOf("id=\"offline\"")>-1){
_11f2=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11f0.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11f0.responseText);
}
}
}
}
if(_11f2==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11f1;
};
function SOAPRequest(_11f7){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11f7;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11f9=DOMUtil.getXMLHTTPRequest();
var _11fa=null;
_11f9.open("post",url,false);
_11f9.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11f9.setRequestHeader("SOAPAction",this.action);
try{
_11f9.send(this.document);
_11fa=SOAPRequest._parseResponse(_11f9);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11f9=null;
return _11fa;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11fd){
var _11fe=DOMUtil.getXMLHTTPRequest();
_11fe.open("post",url,true);
_11fe.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11fe.setRequestHeader("SOAPAction",this.action);
_11fe.onreadystatechange=function(){
if(_11fe.readyState==4){
var _11ff=SOAPRequest._parseResponse(_11fe);
_11fd(_11ff);
_11fe=null;
}
};
_11fe.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1200 in this){
this[_1200]=null;
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
var _1202=null;
if(doc&&doc.documentElement){
_1202=new SOAPRequestResponse();
var _1203=SOAPRequestResponse.resolver;
_1202.document=doc;
_1202.envelope=_1203.resolve("soap:Envelope",_1202.document);
_1202.header=_1203.resolve("soap:Header",_1202.envelope);
_1202.body=_1203.resolve("soap:Body",_1202.envelope);
var fault=_1203.resolve("soap:Fault",_1202.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1202.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1203.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1203.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1202;
};
function SOAPFault(_1205,_1206,_1207){
this._operationName=_1205;
this._operationAddress=_1206;
this._faultString=_1207;
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
SOAPFault.newInstance=function(_1208,fault){
return new SOAPFault(_1208.name,_1208.address,fault.faultString);
};
function SOAPEncoder(wsdl,_120b){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_120b;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _120d=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_120d.body,this._operation);
var _120f=this._wsdl.getSchema();
var _1210=_120f.lookup(this._operation);
var _1211=_1210.getListedDefinitions();
while(_1211.hasNext()){
var def=_1211.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _120d;
};
SOAPEncoder.prototype._resolve=function(_1215,_1216,value){
var _1218=this._wsdl.getSchema();
if(_1216.isSimpleValue){
this._appendText(_1215,value,_1216.type=="string");
}else{
var _1219=_1218.lookup(_1216.type);
if(_1219 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1219.getListedDefinitions();
if(_1219.isArray){
var _121b=new List(value);
var def=defs.getNext();
while(_121b.hasNext()){
var elm=this._appendElement(_1215,def.name);
var val=_121b.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1215,def.name);
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
SOAPEncoder.prototype._appendText=function(_1222,value,_1224){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1227=false;
var i=0,c;
while(c=chars[i++]){
var _122a=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_122a=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_122a=false;
}
break;
}
if(!_122a){
safe+=c;
}else{
_1227=true;
}
}
if(_1227){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1222.appendChild(_1222.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_122d){
this._wsdl=wsdl;
this._operation=_122d;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1232){
var _1233=null;
var _1234=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1236=this.resolve(id,_1232.body);
var _1237=_1234.lookup(id);
var _1238=_1237.getListedDefinitions();
while(!_1233&&_1238.hasNext()){
var def=_1238.getNext();
var elm=this.resolve(def.name,_1236);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1233=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
_1233.appendChild(_1233.importNode(e,true));
}else{
_1233=this._compute(elm,def);
}
}
return _1233;
};
SOAPDecoder.prototype._compute=function(_123c,_123d){
var _123e=null;
var _123f=this._wsdl.getSchema();
if(_123d.isSimpleValue){
_123e=this._getSimpleValue(_123c,_123d.type);
}else{
var _1240=_123f.lookup(_123d.type);
if(_1240 instanceof SchemaSimpleType){
_123e=this._getSimpleValue(_123c,_1240.restrictionType);
}else{
var defs=_1240.getListedDefinitions();
if(_1240.isArray){
_123e=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_123c);
while(elms.hasNext()){
var elm=elms.getNext();
_123e.push(this._compute(elm,def));
}
}else{
if(_123c==null){
_123e=null;
}else{
_123e={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_123c);
if(elm){
_123e[def.name]=this._compute(elm,def);
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
return _123e;
};
SOAPDecoder.prototype._getSimpleValue=function(_1245,type){
var _1247=null;
if(_1245!=null&&_1245.firstChild&&_1245.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1245.childNodes.length>1){
_1245.normalize();
}
_1247=_1245.firstChild.data;
switch(type){
case Schema.types.STRING:
_1247=_1247;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1247=Number(_1247);
break;
case Schema.types.BOOLEAN:
_1247=_1247=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1247;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1248){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1248);
}
Schema.prototype._parseSchema=function(_1249){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _124a={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1249);
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
_124a[rule.getAttribute("name")]=entry;
}
return _124a;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_124f){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_124f);
}
SchemaDefinition.prototype._parse=function(_1250){
var min=_1250.getAttribute("minOccurs");
var max=_1250.getAttribute("maxOccurs");
var type=_1250.getAttribute("type");
this.name=_1250.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1256=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1256;
}else{
var elm=_1250.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1258,_1259){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1258,_1259);
}
SchemaElementType.prototype._parseListedDefinitions=function(_125a,_125b){
var els=_125a.resolveAll("s:complexType/s:sequence/s:element",_125b);
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
function SchemaComplexType(_125d,_125e){
this._definitions=new List();
this._parseListedDefinitions(_125d,_125e);
this.isArray=_125e.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_125f,_1260){
var els=_125f.resolveAll("s:sequence/s:element",_1260);
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
function SchemaSimpleType(_1263,_1264){
this.restrictionType=null;
this._parse(_1263,_1264);
}
SchemaSimpleType.prototype._parse=function(_1265,_1266){
var _1267=_1265.resolve("s:restriction",_1266);
if(_1267){
this.restrictionType=_1267.getAttribute("base").split(":")[1];
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
var _126a=null;
var _126b=DOMUtil.getXMLHTTPRequest();
_126b.open("get",url,false);
_126b.send(null);
if(_126b.responseXML){
_126a=_126b.responseXML.documentElement;
}else{
alert(_126b.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _126a;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _126c=new List();
var _126d=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_126d.hasEntries()){
while(_126d.hasNext()){
var _126e=_126d.getNext();
var name=_126e.getAttribute("name");
_126c.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _126c;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1271,_1272,_1273){
this.name=name;
this.address=_1271;
this.encoder=_1272;
this.decoder=_1273;
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
var _1277=wsdl.getOperations();
_1277.each(function(_1278){
proxy[_1278.name]=WebServiceProxy.createProxyOperation(_1278);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1279,_127a){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_127a){
var log=_127a instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1279.address+": "+_1279.name+"\n\n";
log+=DOMSerializer.serialize(_127a.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_127c){
return function(){
var _127d=new List(arguments);
var _127e=null;
if(typeof (_127d.getLast())=="function"){
var _127f=_127d.extractLast();
var _1280=_127c.encoder.encode(_127d);
this._log(_127c,_1280);
var self=this;
var _1282=_1280.asyncInvoke(_127c.address,function(_1283){
self._log(_127c,_1283);
if(_1283){
if(_1283.fault){
_127e=SOAPFault.newInstance(_127c,_1283.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_127e,_1280,_1283);
}
}else{
if(WebServiceProxy.isDOMResult){
_127e=_1283.document;
}else{
_127e=_127c.decoder.decode(_1283);
}
}
}
_1280.dispose();
_127f(_127e);
});
}else{
var _1280=_127c.encoder.encode(new List(arguments));
this._log(_127c,_1280);
var _1282=_1280.invoke(_127c.address);
this._log(_127c,_1282);
if(_1282){
if(_1282.fault){
_127e=SOAPFault.newInstance(_127c,_1282.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_127e,_1280,_1282);
}
}else{
if(WebServiceProxy.isDOMResult){
_127e=_1282.document;
}else{
_127e=_127c.decoder.decode(_1282);
}
}
}
_1280.dispose();
return _127e;
}
};
};
WebServiceProxy.handleFault=function(_1284,_1285,_1286){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1284,soapRequest:_1285,soapResponse:_1286});
}
catch(exception){
alert(_1284.getFaultString());
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
var _1287=SystemLogger.getLogger("MessageQueue");
var _1288=null;
var _1289=0;
var _128a=null;
var _128b=new Map();
var _128c=new Map();
var _128d=false;
var _128e=false;
var _128f=false;
var _1290=false;
var _1291={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1288=ConsoleMessageQueueService;
_1289=_1288.GetCurrentSequenceNumber("dummyparam!");
this.index=_1289;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_128d){
if(!MessageQueue._actions.hasEntries()){
var _1292=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_128e=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1292;
_128e=false;
}
}
}
};
this._pokeserver=function(){
if(_128d==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(_1293){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_128e);
this._updateMessages(_1293);
}
};
this._updateMessages=function(_1294){
if(_128f){
_1290=true;
}else{
_128f=true;
var self=this;
var _1296=function(_1297){
if(_1297!=null){
if(Types.isDefined(_1297.CurrentSequenceNumber)){
var _1298=_1297.CurrentSequenceNumber;
if(_1298<self.index){
_1287.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_1298);
}
self.index=_1298;
var _1299=new List(_1297.ConsoleActions);
if(_1299.hasEntries()){
self.evaluate(_1299);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1287.error("No sequencenumber in MessageQueue response!");
}
}
_128f=false;
if(_1290){
_1290=false;
self._updateMessages();
}
};
if(_1294){
_1296(_1288.GetMessages(Application.CONSOLE_ID,this.index));
}else{
_1288.GetMessages(Application.CONSOLE_ID,this.index,_1296);
}
}
};
this.evaluate=function(_129a){
var _129b=new List();
if(_129a.hasEntries()){
_129a.each(function(_129c){
if(this._index[_129c.Id]!=true){
_129b.add(_129c);
}
this._index[_129c.Id]=true;
},this);
if(_129b.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_129b);
}else{
this._actions=_129b;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_129d){
var _129e="(No reason)";
if(_129d!=null){
_129e=_129d.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_129e);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_12a2){
if(_12a2==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _12a3=null;
if(this._actions.hasEntries()){
var _12a4=this._actions.extractFirst();
_1289=_12a4.SequenceNumber;
_1287.debug("MessageQueue action: "+_12a4.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1289+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_12a4.ActionType){
case "OpenView":
_12a3=_12a4.OpenViewParams;
if(_12a3.ViewType=="ModalDialog"){
openDialogView(_12a3);
}else{
_128a=_12a3.ViewId;
openView(_12a3);
}
break;
case "CloseView":
_12a3=_12a4.CloseViewParams;
_128a=_12a3.ViewId;
closeView(_12a3);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_12a4.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_128b.countEntries()+"\n";
_128b.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1287.debug(debug);
if(!_128b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_12a4.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_12a4.MessageBoxParams);
break;
case "OpenViewDefinition":
_12a3=_12a4.OpenViewDefinitionParams;
_128a=_12a3.Handle;
openViewDefinition(_12a3);
break;
case "LogEntry":
logEntry(_12a4.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_12a3=_12a4.BroadcastMessageParams;
_1287.debug("Server says: EventBroadcaster.broadcast ( \""+_12a3.Name+"\", "+_12a3.Value+" )");
EventBroadcaster.broadcast(_12a3.Name,_12a3.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_128b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_12a4.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_12a4.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_12a4.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_12a3=_12a4.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_12a3.ViewId,entityToken:_12a3.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_12a3=_12a4.OpenGenericViewParams;
openGenericView(_12a3);
break;
case "OpenExternalView":
_12a3=_12a4.OpenExternalViewParams;
openExternalView(_12a3);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_12a4.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_128e);
}
function logEntry(_12a7){
var _12a8=_12a7.Level.toLowerCase();
SystemLogger.getLogger(_12a7.SenderId)[_12a8](_12a7.Message);
}
function openView(_12a9){
var list=paramsToList(_12a9.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_12a9.ViewId);
def.entityToken=_12a9.EntityToken;
def.flowHandle=_12a9.FlowHandle;
def.position=_1291[_12a9.ViewType],def.label=_12a9.Label;
def.image=_12a9.Image;
def.toolTip=_12a9.ToolTip;
def.argument={"url":_12a9.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_12a9.ViewId,entityToken:_12a9.EntityToken,flowHandle:_12a9.FlowHandle,position:_1291[_12a9.ViewType],url:_12a9.Url,label:_12a9.Label,image:_12a9.Image,toolTip:_12a9.ToolTip}));
}
}
function openDialogView(_12ac){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_12ac.ViewId,flowHandle:_12ac.FlowHandle,position:Dialog.MODAL,url:_12ac.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_12ad){
var _12ae=_12ad.DialogType.toLowerCase();
if(_12ae=="question"){
throw "Not supported!";
}else{
Dialog[_12ae](_12ad.Title,_12ad.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_12af){
var map={};
var _12b1=false;
new List(_12af.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_12b1=true;
});
var proto=ViewDefinitions[_12af.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_12af.ViewId;
}
def.argument=_12b1?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_12b6){
var def=ViewDefinition.clone("Composite.Management.GenericView",_12b6.ViewId);
def.label=_12b6.Label;
def.toolTip=_12b6.ToolTip;
def.image=_12b6.Image;
def.argument={"url":_12b6.Url,"list":paramsToList(_12b6.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_12b8){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_12b8.ViewId);
def.label=_12b8.Label;
def.toolTip=_12b8.ToolTip;
def.image=_12b8.Image;
def.url=_12b8.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_12ba){
if(StageBinding.isViewOpen(_12ba.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_12ba.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_12bb){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_12bb.ViewId,isSuccess:_12bb.Succeeded});
}
this._lockSystem=function(_12bc){
var _12bd=top.bindingMap.offlinetheatre;
if(_12bc){
_12bd.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_12bd.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_128d=_12bc;
};
this.handleBroadcast=function(_12bf,arg){
switch(_12bf){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_128a!=null&&arg==_128a){
_128a=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_128b.set(arg,true);
}else{
_1287.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_128b.hasEntries()){
_128b.del(arg);
_1287.debug("Refreshed tree: "+arg+"\n("+_128b.countEntries()+" trees left!)");
if(!_128b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_128c.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_128c.hasEntries()==true){
_128c.del(arg);
if(!_128c.hasEntries()){
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
function paramsToList(_12c1){
var list=new List();
new List(_12c1).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:1280,height:800,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"${string:Composite.Management:Browser.Label}",image:"${icon:page-view-administrated-scope}",toolTip:"${string:Composite.Management:Browser.ToolTip}",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"${string:Composite.Web.SEOAssistant:SEOAssistant.ToolTip}"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff image/svg+xml",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.MediaWritableFolderSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MediaWritableFolderSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Folder.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ReadOnly",selectionValue:"False",selectionResult:"EntityToken",actionGroup:"Folder",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WritableFolders"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _12c4=false;
var _12c5=null;
var _12c6=false;
var _12c7=Client.qualifies();
var _12c8="admin";
var _12c9="123456";
if(!_12c7){
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
this.handleBroadcast=function(_12ca){
switch(_12ca){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_12ca);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _12cb=window.bindingMap.appwindow;
_12cb.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_12cc){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_12cd){
if(_12cc){
EventBroadcaster.subscribe(_12cd,KickStart);
}else{
EventBroadcaster.unsubscribe(_12cd,KickStart);
}
});
}
function kickStart(_12ce){
switch(_12ce){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_12c4=true;
break;
}
if(_12c4){
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
DataManager.getDataBinding("username").setValue(_12c8);
DataManager.getDataBinding("password").setValue(_12c9);
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
this.doLogin=function(_12d1,_12d2){
var _12d3=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12d4=false;
var _12d5=LoginService.ValidateAndLogin(_12d1,_12d2);
if(_12d5 instanceof SOAPFault){
alert(_12d5.getFaultString());
}else{
_12d4=_12d5;
}
if(_12d4){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_12d3){
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
var _12d6=DataManager.getDataBinding("username");
var _12d7=DataManager.getDataBinding("password");
_12d6.blur();
_12d7.blur();
_12d6.setValue("");
_12d7.setValue("");
_12d6.clean();
_12d7.clean();
_12d6.focus();
document.getElementById("loginerror").style.display="block";
var _12d8={handleAction:function(_12d9){
document.getElementById("loginerror").style.display="none";
_12d9.target.removeActionListener(Binding.ACTION_DIRTY,_12d8);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12d8);
}
WindowManager.fireOnLoad(this);
if(!_12c7){
UpdateManager.isEnabled=false;
}
};

