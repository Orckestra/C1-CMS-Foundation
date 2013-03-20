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
var i=0,_1d;
while((_1d=_1a[i++])!=null){
this._array.push(_1d);
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
function _BroadcastMessages(){
}
_BroadcastMessages.prototype={APPLICATION_STARTUP:"application startup",APPLICATION_LOGIN:"application login",APPLICATION_LOGOUT:"application logout",APPLICATION_OPERATIONAL:"application operational",APPLICATION_ONSHUTDOWN:"application onshutdown",APPLICATION_SHUTDOWN:"application shutdown",APPLICATION_ERROR:"application error",APPLICATION_BLURRED:"application blurred",APPLICATION_FOCUSED:"application focused",APPLICATION_KICKSTART:"application kickstart",CODEMIRROR_LOADED:"codemirror loaded",MOUSEEVENT_MOUSEDOWN:"mouseevent mousedown",MOUSEEVENT_MOUSEUP:"mouseevent mouseup",MOUSEEVENT_MOUSEMOVE:"mouseevent mousemove",$WINKEY_LOADED:"${windowkey} loaded",$WINKEY_UNLOADED:"${windowkey} unloaded",$WINKEY_EVALUATED:"${windowkey} evaluated",$WINKEY_RESIZED:"${windowkey} resized",$WINKEY_HRESIZED:"${windowkey} horizontally resized",$WINKEY_VRESIZED:"${windowkey} vertically resized",LOADED_NAVIGATOR:"navigator loaded",LOADED_MAINSTAGE:"mainstage loaded",LOCALSTORE_INITIALIZED:"localstore initialized",PERSISTANCE_INITIALIZED:"persistance initialized",STAGE_INITIALIZED:"stage initialized",KEY_SHIFT_DOWN:"shiftkeydown",KEY_SHIFT_UP:"shiftkeyup",KEY_CONTROL_DOWN:"controlkeydown",KEY_CONTROL_UP:"controlkeyup",KEY_ARROW:"arrowkey",KEY_ENTER:"enterkeydown",KEY_ESCAPE:"escapekeydown",KEY_SPACE:"spacekeydown",KEY_TAB:"tabkeydown",KEY_ALT:"altkeydown",KEY_CONTROLTAB:"controltabkeysdown",TYPEDRAG_START:"typedrag start",TYPEDRAG_STOP:"typedrag stop",TYPEDRAG_PAUSE:"typedrag pause",DOCK_MAXIMIZED:"dockmaximized",DOCK_MINIMIZED:"dockminimized",DOCK_NORMALIZED:"docknormalized",DOCKTABBINDING_SELECT:"docktab select",SYSTEMTREEBINDING_REFRESH:"systemtree refresh",SYSTEMTREEBINDING_REFRESHALL:"systemtree refresh all",SYSTEMTREEBINDING_REFRESHING:"systemtree refreshing",SYSTEMTREEBINDING_REFRESHED:"systemtree refreshed",SYSTEMTREEBINDING_FOCUS:"systemtree focus",SYSTEMTREEBINDING_CUT:"systemtree cut",SYSTEMTREEBINDING_COPY:"systemtree copy",SYSTEMTREEBINDING_PASTE:"systemtree paste",SYSTEMTREEBINDING_COLLAPSEALL:"systemtree collapse all",SYSTEMTREENODEBINDING_FOCUS:"systemtreenode focus",SYSTEMTREEBINDING_LOCKTOEDITOR:"systemtreenode lock to editor",SYSTEMTREENODEBINDING_FORCE_OPEN:"systemtreenode force open",SYSTEMTREENODEBINDING_FORCING_OPEN:"systemtreenode forcing open",SYSTEMTREENODEBINDING_FORCED_OPEN:"systemtreenode forced open",START_COMPOSITE:"startcomposite",STOP_COMPOSITE:"stopcomposite",COMPOSITE_START:"compositestart",COMPOSITE_STOP:"compositestop",VIEW_OPENING:"view opening",VIEW_OPENED:"view opened",VIEW_COMPLETED:"view completed",CLOSE_VIEW:"close view",CLOSE_VIEWS:"close views",VIEW_CLOSED:"view closed",TINYMCE_INITIALIZED:"tinymce initialized",CODEPRESS_INITIALIZED:"codepress initialized",VISUALEDITOR_FOCUSED:"visualeditor focused",VISUALEDITOR_BLURRED:"visualditor blurred",PERSPECTIVE_CHANGED:"perspective changed",PERSPECTIVES_NONE:"no perspectives",SYSTEMLOG_OPENED:"systemlog opened",SYSTEMLOG_CLOSED:"systemlog closed",SYSTEMACTION_INVOKE:"systemaction invoke",SYSTEMACTION_INVOKED:"systemaction invoked",SYSTEM_ACTIONPROFILE_PUBLISHED:"system actionprofile published",NAVIGATOR_TREENODE_SELECTED:"navigator treenode selected",MODAL_DIALOG_OPENED:"modal dialog invoked",MODAL_DIALOG_CLOSED:"modal dialog closed",COVERBINDING_MOUSEDOWN:"userinterfacecoverbinding mousedown",SERVER_OFFLINE:"server offline",SERVER_ONLINE:"server online",OFFLINE_FLASH_INITIALIZED:"offline flash initialized",CLOSE_CURRENT:"close current",CLOSE_ALL:"close all",CLOSE_ALL_DONE:"close all done",SAVE_CURRENT:"save current",CURRENT_SAVED:"current saved",SAVE_ALL:"save all",SAVE_ALL_DONE:"save all done",DOCKTAB_DIRTY:"docktab dirty",DOCKTAB_CLEAN:"docktab clean",BINDING_RELATE:"binding relate",LOCALIZATION_CHANGED:"localization changed",XHTML_MARKUP_ON:"xhtml markup on",XHTML_MARKUP_OFF:"xhtml markup off",XHTML_MARKUP_ACTIVATE:"xhtml markup activate",XHTML_MARKUP_DEACTIVATE:"xhtml markup deactivate",HIGHLIGHT_KEYWORDS:"highlight keywords",BIND_TOKEN_TO_VIEW:"bind entitytoken to view",STAGEDIALOG_OPENED:"stage dialog opened",INVOKE_DEFAULT_ACTION:"invoke default action",LANGUAGES_UPDATED:"LocalesUpdated",FROMLANGUAGE_UPDATED:"ForeignLocaleChanged",TOLANGUAGE_UPDATED:"ActiveLocaleChanged",MESSAGEQUEUE_REQUESTED:"messagequeue requested",MESSAGEQUEUE_EVALUATED:"messagequeue evaluated",UPDATE_LANGUAGES:"update languages"};
var BroadcastMessages=new _BroadcastMessages();
function _EventBroadcaster(){
}
_EventBroadcaster.prototype={_broadcasts:{},subscribe:function(_59,_5a){
if(_59!=null){
if(!Interfaces.isImplemented(IBroadcastListener,_5a,true)){
throw ("IBroadcastListener not implemented: "+_59);
}else{
if(!this._broadcasts[_59]){
this._broadcasts[_59]=[_5a];
}else{
this._broadcasts[_59].push(_5a);
}
}
}else{
SystemDebug.stack(arguments);
throw "Undefined broadcast: "+_5a;
}
},unsubscribe:function(_5b,_5c){
if(_5b!=null){
if(Interfaces.isImplemented(IBroadcastListener,_5c)){
var i=0,_5e,_5f=this._broadcasts[_5b];
if(_5f){
while(i<_5f.length){
_5e=_5f[i];
if(_5e==_5c){
_5f.splice(i,1);
break;
}
i++;
}
}
}
}else{
throw "Undefined broadcast"+_5c;
}
},hasSubscribers:function(_60){
var _61=this._broadcasts[_60];
return _61!=null&&_61.length>0;
},broadcast:function(_62,_63){
if(_62!=null){
var i=0,_65=this._broadcasts[_62];
var _66=[];
if(_65!=null){
var _67=new List();
while(i<_65.length){
_66.push(_65[i++]);
}
i=0;
while(i<_66.length){
var _68=_66[i];
if(Application.isDeveloperMode){
_68.handleBroadcast(_62,_63);
}else{
try{
_68.handleBroadcast(_62,_63);
}
catch(exception){
_67.add(_68);
var cry="Exception in "+new String(_68)+" on broadcast '"+_62+"':"+new String(exception);
SystemLogger.getLogger("EventBroadcaster").error(cry);
SystemDebug.stack(arguments);
}
}
i++;
}
if(_67.hasEntries()){
_67.each(function(_6a){
EventBroadcaster.unsubscribe(_62,_6a);
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
_Constants.prototype={COMPOSITE_HOME:"http://www.composite.net",DUMMY_LINK:"javascript:void(false);",APPROOT:temproot,CONFIGROOT:temproot.substring(0,temproot.length-9)+"Frontend/Config/VisualEditor/",TEMPLATESROOT:temproot+"/templates",SKINROOT:temproot+"/skins/system",TINYMCEROOT:temproot+"/content/misc/editors/wysiwygeditor/tiny_mce",TINYROOT:temproot+"/content/misc/editors/visualeditor/tiny_mce",URL_WSDL_SETUPSERVICE:temproot+"/services/Setup/SetupService.asmx?WSDL",URL_WSDL_CONFIGURATION:temproot+"/services/Configuration/ConfigurationService.asmx?WSDL",URL_WSDL_LOGINSERVICE:temproot+"/services/Login/Login.asmx?WSDL",URL_WSDL_INSTALLSERVICE:temproot+"/services/Installation/InstallationService.asmx?WSDL",URL_WSDL_MESSAGEQUEUE:temproot+"/services/ConsoleMessageQueue/ConsoleMessageQueueServices.asmx?WSDL",URL_WSDL_EDITORCONFIG:temproot+"/services/WysiwygEditor/ConfigurationServices.asmx?WSDL",URL_WSDL_FLOWCONTROLLER:temproot+"/services/FlowController/FlowControllerServices.asmx?WSDL",URL_WSDL_STRINGSERVICE:temproot+"/services/StringResource/StringService.asmx?WSDL",URL_WSDL_TREESERVICE:temproot+"/services/Tree/TreeServices.asmx?WSDL",URL_WSDL_XHTMLTRANSFORM:temproot+"/services/WysiwygEditor/XhtmlTransformations.asmx?WSDL",URL_WSDL_SECURITYSERVICE:temproot+"/services/Tree/SecurityServices.asmx?WSDL",URL_WSDL_READYSERVICE:temproot+"/services/Ready/ReadyService.asmx?WSDL",URL_WSDL_LOCALIZATION:temproot+"/services/Localization/LocalizationService.asmx?WSDL",URL_WSDL_SOURCEVALIDATION:temproot+"/services/SourceEditor/SourceValidationService.asmx?WSDL",URL_WSDL_MARKUPFORMAT:temproot+"/services/SourceEditor/MarkupFormatService.asmx?WSDL",URL_WSDL_SEOSERVICE:temproot+"/services/SearchEngineOptimizationKeyword/SearchEngineOptimizationKeyword.asmx?WSDL",URL_WSDL_PAGESERVICE:temproot+"/services/Page/PageService.asmx?WSDL",URL_WSDL_DIFFSERVICE:temproot+"/services/StringResource/DiffService.asmx?WSDL",NS_XHTML:"http://www.w3.org/1999/xhtml",NS_UI:"http://www.w3.org/1999/xhtml",NX_XUL:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",NS_XBL:"http://www.mozilla.org/xbl",NS_WSDL:"http://schemas.xmlsoap.org/wsdl/",NS_SOAP:"http://schemas.xmlsoap.org/wsdl/soap/",NS_ENVELOPE:"http://schemas.xmlsoap.org/soap/envelope/",NS_ENCODING:"http://schemas.xmlsoap.org/soap/encoding/",NS_SCHEMA:"http://www.w3.org/2001/XMLSchema",NS_SCHEMA_INSTANCE:"http://www.w3.org/1999/XMLSchema-instance",NS_DOMPARSEERROR:"http://www.mozilla.org/newlayout/xml/parsererror.xml",NS_NS:"http://www.w3.org/2000/xmlns/",NS_PERSISTANCE:"http://www.composite.net/ns/localstore/persistance",NS_FUNCTION:"http://www.composite.net/ns/function/1.0",SCROLLBAR_DIMENSION_HARDCODED_VALUE:19};
var Constants=new _Constants();
temppath=null;
temproot=null;
function _Client(){
var _6b=navigator.userAgent.toLowerCase();
var _6c=navigator.platform.toLowerCase();
var _6d=navigator.appName=="Microsoft Internet Explorer";
var _6e=!_6d&&typeof document.createTreeWalker!="undefined";
var _6f=_6e&&(_6b.indexOf("webrunner")>-1||_6b.indexOf("prism")>-1);
var _70=history.pushState!=null;
this.isMozilla=_6e;
this.isFirefox=_6b.indexOf("firefox")>-1;
this.isWebKit=_6b.indexOf("webkit")>-1;
this.isExplorer=_6d;
this.isExplorer6=this.isExplorer&&(_6b.indexOf("msie 6.0")>-1||_6b.indexOf("msie 6.1")>-1);
this.isExplorer8=this.isExplorer&&window.XDomainRequest!=null;
this.isPrism=_6f;
this.isWindows=_6c.indexOf("win")>-1;
this.isVista=this.isWindows&&_6b.indexOf("windows nt 6")>-1;
var _71=this._getFlashVersion();
this.hasFlash=(_71&&_71>=9);
this.hasTransitions=_70;
this.canvas=!!document.createElement("canvas").getContext;
this.hasSpellcheck=this.isFirefox||this.isExplorer&&document.documentElement.spellcheck;
return this;
}
_Client.prototype={isExplorer:false,isMozilla:false,isPrism:false,hasFlash:false,isWindows:false,isVista:false,hasTransitions:false,_getFlashVersion:function(){
var _72=null;
var _73=10;
try{
if(this.isMozilla==true){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _74=navigator.plugins["Shockwave Flash"];
if(_74){
var _75=_74.description;
if(_75!=null){
_72=_75.charAt(_75.indexOf(".")-1);
}
}
}
}else{
for(var i=2;i<=_73;i++){
try{
new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
_72=i;
}
catch(exception){
continue;
}
}
}
}
catch(exception){
}
return _72;
},qualifies:function(){
var _77=true;
var _78=false;
if(this.isMozilla&&!this.isWebKit){
_78=(document.documentElement.mozMatchesSelector===undefined);
}
if(window.opera!=null||_78||this.isExplorer&&!this.canvas){
_77=false;
}
return _77;
},fixUI:function(_79){
if(Client.isExplorer){
_79=_79.replace(/<ui:/g,"<").replace(/<\/ui:/g,"</");
_79=_79.replace(/(<(\w+)[^>]*)\/>/g,"$1></$2>");
}
return _79;
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
function SystemLogger(_7a){
this.identifier=_7a;
}
SystemLogger.prototype.info=function(_7b){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_INFO,_7b);
};
SystemLogger.prototype.debug=function(_7c){
if(_7c=="page"){
alert(arguments.caller.callee);
}
SystemLogger.log(this.identifier,SystemLogger.LEVEL_DEBUG,_7c);
};
SystemLogger.prototype.error=function(_7d){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_ERROR,_7d);
};
SystemLogger.prototype.warn=function(_7e){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_WARN,_7e);
};
SystemLogger.prototype.fatal=function(_7f){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FATAL,_7f);
};
SystemLogger.prototype.fine=function(_80){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FINE,_80);
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
SystemLogger.getLogger=function(_82){
var _83=SystemLogger.loggers[_82];
if(!_83){
_83=new SystemLogger(_82);
SystemLogger.loggers[_82]=_83;
}
return _83;
};
SystemLogger.flushBuffer=function(){
SystemLogger.buffer.reset();
SystemLogger.isFlushing=true;
if(SystemLogger.buffer.hasEntries()){
while(SystemLogger.buffer.hasNext()){
var _84=SystemLogger.buffer.getNext();
this.log(_84.identifier,_84.level,_84.message);
}
}
SystemLogger.isFlushing=false;
};
SystemLogger.bufferLog=function(_85,_86,_87){
if(Application.isDeveloperMode){
_87=String(_87);
SystemLogger.buffer.add({identifier:_85,level:_86,message:_87});
}
};
SystemLogger.outputLog=function(_88,_89,_8a){
_8a=String(_8a);
if(!SystemLogger.isFlushing){
SystemLogger.bufferLog(_88,_89,_8a);
}
var win=SystemLogger.outputWindow;
var doc=SystemLogger.outputDocument;
var elm=SystemLogger.outputElement;
var div=doc.createElement("div");
var _8f=doc.createElement("span");
var pre=doc.createElement("pre");
if(Client.isExplorer){
_8a=_8a.replace(/</g,"&lt;");
_8a=_8a.replace(/>/g,"&gt;");
_8a=_8a.replace(/\n/g,"<br/>");
_8a=_8a.replace(/\t/g,SystemLogger.TAB_SEQUENCE);
pre.innerHTML=_8a;
}else{
pre.textContent=_8a;
}
div.className=_89;
_8f.innerHTML=_88;
div.appendChild(_8f);
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
SystemTimer.getTimer=function(_92){
return new SystemTimer(_92.toString());
};
function SystemTimer(id){
this.logger=SystemLogger.getLogger("SystemTimer");
this._id=id;
this._time=new Date().getTime();
}
SystemTimer.prototype.reset=function(){
this._time=new Date().getTime();
};
SystemTimer.prototype.report=function(_94){
this.logger.debug(this._id+": "+this.getTime()+(_94?": "+_94:""));
};
SystemTimer.prototype.getTime=function(){
return new Date().getTime()-this._time;
};
function _SystemDebug(){
}
_SystemDebug.prototype={_logger:SystemLogger.getLogger("SystemDebug"),_stacklength:parseInt(5),stack:function(_95,_96){
this._stackMozilla(_95,_96);
},_stackMozilla:function(_97,_98){
_98=_98?_98:this._stacklength;
if(Client.isMozilla&&_97.callee||_97.caller){
var _99=Client.isMozilla?_97.callee.caller:_97.caller.callee;
var _9a="";
var i=0;
while(_99!=null&&i++<_98){
_9a+="\n#"+i+"\n";
_9a+=_99.toString();
_99=_99.caller;
_9a+="\n";
}
this._logger.error(_9a);
}else{
this._logger.error("(Error stack unreachable!)");
}
}};
var SystemDebug=new _SystemDebug;
function _Interfaces(){
var _9c=SystemLogger.getLogger("Interfaces");
this.isImplemented=function(_9d,_9e,_9f){
var _a0=true;
for(var _a1 in _9d){
if(typeof _9e[_a1]==Types.UNDEFINED){
_a0=false;
}else{
if(typeof _9d[_a1]!=typeof _9e[_a1]){
_a0=false;
}
}
if(!_a0){
break;
}
}
if(!_a0){
if(_9f){
_9c.fine(_9e+" invalid. Interface check abandoned at: "+_a1);
}
}
return _a0;
};
}
var Interfaces=new _Interfaces;
function _Types(){
}
_Types.prototype={_logger:SystemLogger.getLogger("Types"),BOOLEAN:"boolean",STRING:"string",NUMBER:"number",FUNCTION:"function",UNDEFINED:"undefined",castFromString:function(_a2){
var _a3=_a2;
if(parseInt(_a3).toString()===_a3){
_a3=parseInt(_a3);
}else{
if(parseFloat(_a3).toString()===_a3){
_a3=parseFloat(_a3);
}else{
if(_a3==="true"||_a3==="false"){
_a3=(_a3==="true");
}
}
}
return _a3;
},isDefined:function(arg){
return typeof arg!=Types.UNDEFINED;
},isFunction:function(arg){
return typeof arg==Types.FUNCTION;
}};
var Types=new _Types();
var MimeTypes={JPG:"image/jpeg",GIF:"image/gif",PNG:"image/png",CSS:"text/css",JAVASCRIPT:"text/javascript",TEXT:"text/plain",HTML:"text/html",XHTML:"applcication/xhtml+xml",FLASH:"application/x-shockwave-flash",QUICKTIME:"video/quicktime",SHOCKWAVE:"application/x-director",WINMEDIA:"application/x-mplayer2",COMPOSITEPAGES:"application/x-composite-page",COMPOSITEFUNCTION:"application/x-composite-function"};
window.SearchTokens=new function(){
var _a6={"MediaFileElementProvider.WebImages":null,"MediaFileElementProvider.EmbeddableMedia":null,"AllFunctionsElementProvider.VisualEditorFunctions":null,"AllFunctionsElementProvider.XsltFunctionCall":null};
this.getToken=function(key){
var _a8=null;
if(this.hasToken(key)){
_a8=_a6[key];
}else{
throw "Unknown search token key: "+key;
}
return _a8;
};
this.hasToken=function(key){
return typeof _a6[key]!=Types.UNDEFINED;
};
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
new List(TreeService.GetSearchTokens(true)).each(function(_aa){
if(SearchTokens.hasToken(_aa.Key)){
_a6[_aa.Key]=_aa.Value;
}else{
alert("SearchTokens need updating!");
}
});
}});
};
window.StringBundle=new function(){
var _ab=SystemLogger.getLogger("StringBundle");
this.UI="Composite.Management";
var _ac={};
function resolve(_ad,_ae){
var _af=new List(StringService.GetLocalisation(_ad));
if(_af.hasEntries()){
_af.each(function(_b0){
_ae[_b0.Key]=_b0.Value;
});
}else{
throw "No strings from provider: "+_ad;
}
}
this.getString=function(_b1,_b2){
var _b3=null;
if(window.StringService!=null){
try{
if(_b1=="ui"){
_b1=StringBundle.UI;
}
if(!_ac[_b1]){
var _b4=_ac[_b1]={};
resolve(_b1,_b4);
}
if(_ac[_b1]){
_b3=_ac[_b1][_b2];
}
if(!_b3){
throw "No such string: "+_b2;
}
}
catch(exception){
var cry="StringBundle exception in string "+_b1+":"+_b2;
_ab.error(cry);
if(Application.isDeveloperMode){
alert(cry);
}
}
}
return _b3;
};
};
window.LastOpenedSystemNodes=new function(){
var _b6=new List([]);
this.clear=function(){
_b6.clear();
};
this.add=function(_b7){
var _b8=_b7.getHandle();
_b6.add(_b8);
};
this.isOpen=function(_b9){
var _ba=_b9.getHandle();
return _b6.has(_ba);
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
var _bd=false;
if(this._uniqueKeys[key]){
_bd=true;
}
return _bd;
}};
var KeyMaster=new _KeyMaster();
function _ImageProvider(){
}
_ImageProvider.prototype={_logger:SystemLogger.getLogger("ImageProvider"),SERVICE_URL:"services/Icon/GetIcon.ashx",UI:"Composite.Icons",getImageURL:function(_be,_bf){
var _c0=null;
var url=Constants.APPROOT+"/"+this.SERVICE_URL+"?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
var _c2=_be.ResourceNamespace;
var _c3=_be.ResourceName;
_bf=_bf?_bf:"DEFAULT";
if(_c3!=null&&_c2!=null){
_c0=url.replace("${name}",_c3).replace("${hash}",_c2).replace("${size}",_bf);
if(_bf=="DEFAULT"){
_c0=_c0.split("&size=DEFAULT")[0];
}
}else{
throw "Could not compute image URL.";
}
return _c0;
},toGrayScaleURL:function(_c4){
var _c5=document.createElement("canvas");
var ctx=_c5.getContext("2d");
var _c4=new Image();
var _c7=_c4.width;
var _c8=_c4.height;
_c5.width=_c7;
_c5.height=_c8;
ctx.drawImage(_c4,0,0);
var _c9=ctx.getImageData(0,0,_c7,_c8);
for(j=0;j<_c9.height;i++){
for(i=0;i<_c9.width;j++){
var _ca=(i*4)*_c9.width+(j*4);
var red=_c9.data[_ca];
var _cc=_c9.data[_ca+1];
var _cd=_c9.data[_ca+2];
var _ce=_c9.data[_ca+3];
var _cf=(red+_cc+_cd)/3;
_c9.data[_ca]=_cf;
_c9.data[_ca+1]=_cf;
_c9.data[_ca+2]=_cf;
_c9.data[_ca+3]=_ce;
}
}
return _c5.toDataURL();
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_d0){
if(typeof _d0!=Types.UNDEFINED){
_d0=String(_d0);
_d0=_d0.replace("${root}",Constants.APPROOT);
_d0=_d0.replace("${skin}",Constants.SKINROOT);
_d0=_d0.replace("${tinymce}",Constants.TINYMCEROOT);
_d0=_d0.replace("${tiny}",Constants.TINYROOT);
if(_d0.indexOf("${icon:")>-1){
_d0=this._resolveImage(_d0);
}else{
if(_d0.indexOf("${string:")>-1){
_d0=this._resolveString(_d0);
}
}
}
return _d0;
},resolveVars:function(_d1,_d2){
var i=0;
while(i<_d2.length){
_d1=_d1.replace("{"+i+"}",_d2[i]);
i++;
}
return _d1;
},_resolveString:function(_d4){
var _d5=null;
var _d6=null;
var key=_d4.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_d6=key.split(":")[0];
key=key.split(":")[1];
}else{
_d6=StringBundle.UI;
}
_d5=StringBundle.getString(_d6,key);
if(!_d5){
_d5="(?)";
}
return _d5;
},_resolveImage:function(_d8){
var _d9=null;
var _da=null;
var _db=null;
var _dc=null;
_db=_d8.split("${icon:")[1].split("}")[0];
if(_db.indexOf(":")>-1){
_da=_db.split(":")[0];
_db=_db.split(":")[1];
}else{
_da=ImageProvider.UI;
}
if(_db.indexOf("(")>-1){
_dc=_db.split("(")[1].split(")")[0];
_db=_db.split("(")[0];
}
_d9=ImageProvider.getImageURL({ResourceNamespace:_da,ResourceName:_db},_dc);
return _d9;
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
if(!Client.isExplorer){
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
},cleanupEventListeners:function(_124){
this._deleteWrappedHandler(_124);
},isCurrentTarget:function(e){
var _126=false;
if(Client.isMozilla==true){
_126=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_127,_128){
var _129=true;
if(_127==_128){
_129=false;
}
if(_129==true){
while(_128!=null&&_128.nodeType!=Node.DOCUMENT_NODE&&_128!=_127){
_128=_128.parentNode;
}
_129=(_128==_127);
}
return _129;
},_eventListener:function(_12a,_12b,_12c,_12d,_12e,_12f){
if(Interfaces.isImplemented(IEventListener,_12d,true)){
if(typeof _12c!=Types.UNDEFINED){
var _130=this._getAction(_12a);
if(_12b[_130]){
if(Client.isExplorer==true){
switch(_12c){
case DOMEvents.MOUSEDOWN:
case DOMEvents.MOUSEUP:
case DOMEvents.MOUSEOVER:
case DOMEvents.MOUSEOUT:
case DOMEvents.MOUSEMOVE:
_12d=this._getWrappedHandler(_12b,_12c,_12d,_12f);
_12b[_130](_12c,_12d,false);
break;
default:
_12b[_130](_12c,_12d,false);
break;
}
}else{
switch(_12c){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_12c=_12c==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_12b[_130](_12c,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_12d.handleEvent(e);
}
}},_12e?true:false);
break;
default:
_12b[_130](_12c,_12d,_12e?true:false);
break;
}
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_133){
var _134=null;
switch(_133){
case true:
_134="addEventListener";
break;
case false:
_134="removeEventListener";
break;
}
return _134;
},_getWrappedHandler:function(_135,_136,_137,_138){
var _139=null;
try{
if(!_137._domEventHandlers){
_137._domEventHandlers={};
}
if(!_137._domEventHandlers[_135]){
_137._domEventHandlers[_135]={};
}
if(!_137._domEventHandlers[_135][_136]){
var win=_135.nodeType?DOMUtil.getParentWindow(_135):_135;
if(win){
_137._domEventHandlers[_135][_136]=function(e){
if(win.event!=null&&_137!=null){
_137.handleEvent(win.event);
}else{
if(_137!=null){
_137.handleEvent(e);
}
}
};
}
}
_139=_137._domEventHandlers[_135][_136];
}
catch(exception){
this._report(_135,_136,_137,_138);
}
return _139;
},_deleteWrappedHandler:function(_13c){
for(var _13d in _13c._domEventHandlers){
if(_13d){
for(var _13e in _13c._domEventHandlers[_13d]){
if(_13e){
delete _13c._domEventHandlers[_13d][_13e];
}
}
}
delete _13c._domEventHandlers[_13d];
}
},_report:function(_13f,_140,_141,_142){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_13f?_13f.nodeName:_13f)+"\n"+"\tevent: "+_140+"\n"+"\thandler: "+_141+"\n\n"+"Offending invoker: "+(_142.callee?_142.callee.toString():_142.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_144){
var _145=null;
var _146=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_146=node.documentElement;
}
if(_146.xml!=null){
return _146.xml;
}else{
if(this._serializer!=null){
if(_144==true){
_146=_146.cloneNode(true);
_146=DOMFormatter.format(_146,DOMFormatter.INDENTED_TYPE_RESULT);
}
_145=this._serializer.serializeToString(_146);
}
}
return _145;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _149=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_14a){
var doc=_14a.ownerDocument;
var _14c=function(node,_14e){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _14f="",i=0;
while(i++<_14e){
_14f+=TAB;
}
var _151=node.firstChild;
while(_151){
switch(_151.nodeType){
case Node.ELEMENT_NODE:
if(_151==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_14f));
}
node.insertBefore(doc.createTextNode(NEW+_14f+TAB),_151);
_14c(_151,_14e+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_14f+TAB),_151);
break;
}
if(_151.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_151,_14f+TAB);
}
}
_151=_151.nextSibling;
}
}
};
_14c(_14a,0);
}
function strip(_152){
var _153=[];
var _154={acceptNode:function(_155){
return (!_149.test(_155.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _156=_152.ownerDocument.createTreeWalker(_152,NodeFilter.SHOW_TEXT,_154,true);
while(_156.nextNode()){
_153.push(_156.currentNode);
}
var i=0,_158;
while((_158=_153[i++])!=null){
_158.parentNode.removeChild(_158);
}
}
function formatCDATASection(node,_15a){
if(node.textContent.indexOf(NEW)>-1){
var _15b=node.textContent.split(NEW);
var _15c="",line,_15e=0,_15f=true;
while((line=_15b.shift())!=null){
if(_15e==0&&line.charAt(0)==TAB){
while(line.charAt(_15e++)==TAB){
}
}
line=line.substring(_15e,line.length);
if(_15b.length>0){
_15c+=_15a+TAB+line;
_15c+=_15f?"":"\n";
}else{
_15c+=_15a+line;
_15a=_15a.slice(1,_15a.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_15a));
}
_15f=false;
}
node.textContent=_15c;
}
}
this.format=function(_160,_161){
var _162=1;
if(document.createTreeWalker&&!Client.isExplorer){
try{
strip(_160);
if(_161!=_162){
indent(_160);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_160);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_163){
var sig,_165=null,_166=this.MSXML_MAXVERSION;
while(!_165&&_166>=this.MSXML_MINVERSION){
try{
sig=_163.replace("{$version}",_166);
_165=new ActiveXObject(sig);
}
catch(exception){
}
_166--;
}
return _165;
},getXMLHTTPRequest:function(){
var _167=null;
if(Client.isExplorer){
_167=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_167=new XMLHttpRequest();
}
return _167;
},getDOMDocument:function(_168){
var _169=null;
if(Client.isExplorer){
_169=this.getMSComponent(_168?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_169=doc;
}
return _169;
},getMSXMLXSLTemplate:function(){
var _16b=null;
if(Client.isExplorer){
_16b=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _16b;
},getLocalName:function(_16c){
var _16d=null;
if(_16c.localName){
_16d=_16c.localName.replace("ui:","");
}else{
if(_16c.baseName){
_16d=_16c.baseName;
}else{
_16d=_16c.nodeName.toLowerCase();
}
}
return _16d;
},getComputedStyle:function(_16e,_16f){
var _170=null;
if(Client.isExplorer){
if(_16e.currentStyle!=null){
_170=_16e.currentStyle[_16f];
}else{
this._logger.error("Could not compute style for element "+_16e.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _171=_16e.ownerDocument.defaultView.getComputedStyle(_16e,null);
if(_171!=null){
_170=_171.getPropertyValue(_16f);
}else{
this._logger.error("Could not compute style for element "+_16e.nodeName);
SystemDebug.stack(arguments);
}
}
return _170;
},getMaxIndex:function(doc){
var max=0,_174=new List(doc.getElementsByTagName("*"));
_174.each(function(_175){
var _176=CSSComputer.getZIndex(_175);
if(_176>max){
max=_176;
}
});
return max;
},getOrdinalPosition:function(_177,_178){
var _179=null;
var _17a=-1;
var _17b=this.getLocalName(_177);
var _17c=new List(_177.parentNode.childNodes);
while(_17c.hasNext()){
var _17d=_17c.getNext();
if(_17d.nodeType==Node.ELEMENT_NODE){
if(!_178||this.getLocalName(_17d)==_17b){
_17a++;
if(_17d==_177||(_17d.id!=""&&_17d.id==_177.id)){
_179=_17a;
break;
}
}
}
}
return _179;
},isFirstElement:function(_17e,_17f){
return (this.getOrdinalPosition(_17e,_17f)==0);
},isLastElement:function(_180,_181){
var _182=_180.parentNode.getElementsByTagName(_181?this.getLocalName(_180):"*");
return (this.getOrdinalPosition(_180)==_182.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _186=null;
if(node.textContent){
_186=node.textContent;
}else{
if(node.text){
_186=node.text;
}else{
_186=node.innerText;
}
}
return _186;
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
},getAncestorByLocalName:function(_189,node,_18b){
var _18c=null;
while(_18c==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_18b==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_189){
_18c=node;
}
}
return _18c;
},contains:function(_18e,node){
return _18e.contains?_18e!=node&&_18e.contains(node):!!(_18e.compareDocumentPosition(node)&16);
},createElementNS:function(_190,_191,_192){
var _193=null;
if(_192==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_193=_192.createElementNS(_190,_191);
}else{
if(_192.xml!=null){
_193=_192.createNode(Node.ELEMENT_NODE,_191,_190);
}else{
_193=_192.createElement(_191.replace("ui:",""));
}
}
}
return _193;
},getElementsByTagName:function(node,_195){
var _196=null;
if(Client.isMozilla){
_196=node.getElementsByTagNameNS(Constants.NS_XHTML,_195);
}else{
_196=node.getElementsByTagName(_195);
}
return _196;
},getNextElementSibling:function(_197){
return Client.isExplorer?_197.nextSibling:_197.nextElementSibling;
},getPreviousElementSibling:function(_198){
return Client.isExplorer?_198.previousSibling:_198.previousElementSibling;
},cloneNode:function(node){
var _19a=null;
if(Client.isMozilla==true){
_19a=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_19a=node.cloneNode(true);
}
return _19a;
},getLocalPosition:function(_19b){
var _19c=new Point(_19b.offsetLeft,_19b.offsetTop);
if(Client.isExplorer&&_19b.parentNode&&_19b.parentNode.currentStyle){
if(_19b.parentNode.currentStyle.position=="static"){
var _19d=this.getLocalPosition(_19b.parentNode);
_19c.x+=_19d.x;
_19c.y+=_19d.y;
}
}
return _19c;
},getGlobalPosition:function(_19e){
return this._getPosition(_19e,false);
},getUniversalPosition:function(_19f){
return this._getPosition(_19f,true);
},_getPosition:function(_1a0,_1a1){
var _1a2=null;
if(typeof _1a0.getBoundingClientRect!=Types.UNDEFINED){
var rect=_1a0.getBoundingClientRect();
_1a2={x:rect.left,y:rect.top};
if(Client.isMozilla){
_1a2.x-=_1a0.scrollLeft;
_1a2.y-=_1a0.scrollTop;
}
}else{
_1a2={x:_1a0.offsetLeft-_1a0.scrollLeft,y:_1a0.offsetTop-_1a0.scrollTop};
while(_1a0.offsetParent){
_1a0=_1a0.offsetParent;
_1a2.x+=(_1a0.offsetLeft-_1a0.scrollLeft);
_1a2.y+=(_1a0.offsetTop-_1a0.scrollTop);
}
}
if(_1a1){
var win=DOMUtil.getParentWindow(_1a0);
if(win){
var _1a5=win.frameElement;
if(_1a5){
var add=DOMUtil.getUniversalPosition(_1a5);
_1a2.x+=add.x;
_1a2.y+=add.y;
}
}
}
return new Point(_1a2.x,_1a2.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1aa){
var _1ab=DOMEvents.getTarget(e);
var _1ac={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_1ab.ownerDocument;
var win=this.getParentWindow(doc);
_1ac.x-=win.pageXOffset;
_1ac.y-=win.pageYOffset;
}
if(_1aa){
var _1af=this.getParentWindow(_1ab).frameElement;
if(_1af){
var add=this.getUniversalPosition(_1af);
_1ac.x+=add.x;
_1ac.y+=add.y;
}
}
return _1ac;
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
},isWellFormedDocument:function(xml,_1b5){
var _1b6=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1b8=SourceValidationService.IsWellFormedDocument(xml);
if(_1b8!="True"){
_1b6=false;
if(_1b5==true){
this._illFormedDialog(_1b8);
}
}
return _1b6;
},isWellFormedFragment:function(xml,_1ba){
var _1bb=true;
var _1bc=SourceValidationService.IsWellFormedFragment(xml);
if(_1bc!="True"){
_1bb=false;
if(_1ba==true){
this._illFormedDialog(_1bc);
}
}
return _1bb;
},_illFormedDialog:function(_1bd){
setTimeout(function(){
if(Client.isWebKit){
alert(_1bd);
}else{
Dialog.error("Not well-formed",_1bd);
}
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1be){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1bf){
return _1be[_1bf];
}};
}else{
this._nsResolver=_1be;
}
};
XPathResolver.prototype.resolve=function(_1c0,node,_1c2){
var _1c3=null;
try{
if(this._evaluator){
_1c3=this._evaluateDOMXpath(_1c0,node,_1c2?true:false);
}else{
_1c3=this._evaluateMSXpath(_1c0,node,_1c2?true:false);
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
return _1c3;
};
XPathResolver.prototype.resolveAll=function(_1c4,node){
return this.resolve(_1c4,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1c6,node,_1c8){
var _1c9=null;
if(node){
var _1c9=this._evaluator.evaluate(_1c6,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1c8){
var list=new List();
while((node=_1c9.iterateNext())!=null){
list.add(node);
}
_1c9=list;
}else{
_1c9=_1c9.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1c9;
};
XPathResolver.prototype._evaluateMSXpath=function(_1cc,node,_1ce){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1d0="";
for(var _1d1 in this._nsResolver){
_1d0+="xmlns:"+_1d1+"=\""+this._nsResolver[_1d1]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1d0);
if(_1ce){
var list=new List();
var i=0,_1d4=node.selectNodes(_1cc);
while(i<_1d4.length){
list.add(_1d4.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1cc);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1d6=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1d6);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1d6;
}
};
XSLTransformer.prototype._import=function(url){
var _1d8=null;
if(Client.isMozilla){
var _1d9=DOMUtil.getXMLHTTPRequest();
_1d9.open("get",Resolver.resolve(url),false);
_1d9.send(null);
_1d8=_1d9.responseXML;
}else{
var _1d8=DOMUtil.getDOMDocument(true);
_1d8.async=false;
_1d8.load(url);
}
return _1d8;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1db=null;
if(Client.isMozilla){
_1db=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1db;
};
XSLTransformer.prototype.transformToString=function(dom,_1dd){
var _1de=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1de=DOMSerializer.serialize(doc,_1dd);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1de=proc.output;
}
return _1de;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1e1){
var _1e2=_1e1.style?_1e1.className:_1e1.getAttribute("class");
_1e2=_1e2?_1e2:"";
return _1e2;
},_contains:function(_1e3,sub){
return _1e3.indexOf(sub)>-1;
},_attach:function(_1e5,sub){
return _1e5+(_1e5==""?"":" ")+sub;
},_detach:function(_1e7,sub){
if(this._contains(_1e7," "+sub)){
sub=" "+sub;
}
return _1e7.replace(sub,"");
},attachClassName:function(_1e9,_1ea){
if(_1e9.classList!=null){
if(!_1e9.classList.contains(_1ea)){
_1e9.classList.add(_1ea);
}
}else{
var _1eb=this._getCurrent(_1e9);
if(!this._contains(_1eb,_1ea)){
_1eb=this._attach(_1eb,_1ea);
}
if(_1e9.style!=null){
_1e9.className=_1eb;
}else{
_1e9.setAttribute("class",_1eb);
}
}
},detachClassName:function(_1ec,_1ed){
if(_1ec.classList!=null){
if(_1ec.classList.contains(_1ed)){
_1ec.classList.remove(_1ed);
}
}else{
var _1ee=this._getCurrent(_1ec);
if(this._contains(_1ee,_1ed)){
_1ee=this._detach(_1ee,_1ed);
}
if(_1ec.style!=null){
_1ec.className=_1ee;
}else{
if(_1ee==""){
_1ec.removeAttribute("class");
}else{
_1ec.setAttribute("class",_1ee);
}
}
}
},hasClassName:function(_1ef,_1f0){
var _1f1=false;
if(_1ef.classList!=null){
_1f1=_1ef.classList.contains(_1f0);
}else{
_1f1=this._contains(this._getCurrent(_1ef),_1f0);
}
return _1f1;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1f2,_1f3){
var _1f4={};
for(var _1f5 in _1f2){
var ent=parseInt(DOMUtil.getComputedStyle(_1f3,_1f2[_1f5]));
_1f4[_1f5]=isNaN(ent)?0:ent;
}
return _1f4;
},_getMargin:function(_1f7){
return this._getComplexResult(this._margins,_1f7);
},getPadding:function(_1f8){
return this._getComplexResult(this._paddings,_1f8);
},getBorder:function(_1f9){
return this._getComplexResult(this._borders,_1f9);
},getPosition:function(_1fa){
return DOMUtil.getComputedStyle(_1fa,"position");
},getFloat:function(_1fb){
return DOMUtil.getComputedStyle(_1fb,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1fc){
return parseInt(DOMUtil.getComputedStyle(_1fc,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1fd){
return DOMUtil.getComputedStyle(_1fd,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1fe=SystemLogger.getLogger("System");
var root=null;
var _200=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_201){
if(_200==null){
_200={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_202){
_200[_202.Key]=_202.Value;
});
}
return _200[_201];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _203=new List();
var _204=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_204);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_206){
_203.add(new SystemNode(_206));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _203;
};
this.getChildNodes=function(node,_208){
var _209=new List();
var _20a=null;
if(_208){
if(SearchTokens.hasToken(_208)){
_208=SearchTokens.getToken(_208);
}
_20a=TreeService.GetElementsBySearchToken(node.getData(),_208);
}else{
_20a=TreeService.GetElements(node.getData());
}
new List(_20a).each(function(_20b){
var _20c=new SystemNode(_20b);
if(_208){
_20c.searchToken=_208;
}
_209.add(_20c);
});
return _209;
};
this.getDescendantBranch=function(_20d){
var map=new Map();
var arg=[];
_20d.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _211=TreeService.GetMultipleChildren(arg);
var _212=new List(_211);
while(_212.hasNext()){
this._listNodesInMap(_212.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_213,_214,_215){
var map=new Map();
var arg=[];
_215.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _219=TreeService.FindEntityToken(_213,_214,arg);
if(_219 instanceof SOAPFault){
_1fe.error(_219.getFaultString());
if(Application.isDeveloperMode){
alert(_219.getFaultString());
}
map=null;
}else{
var _21a=new List(_219);
while(_21a.hasNext()){
this._listNodesInMap(_21a.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_21b,map){
var list=new List();
var key=_21b.ElementKey;
var _21f=new List(_21b.ClientElements);
map.set(key,list);
while(_21f.hasNext()){
var _220=_21f.getNext();
list.add(new SystemNode(_220));
}
};
this.getChildNodesBySearchToken=function(node,_222){
return this.getChildNodes(node,_222);
};
this.getNamedRoots=function(key,_224){
var _225=new List();
var _226=null;
if(_224){
if(SearchTokens.hasToken(_224)){
_224=SearchTokens.getToken(_224);
}
_226=TreeService.GetNamedRootsBySearchToken(key,_224);
}else{
_226=TreeService.GetNamedRoots(key);
}
new List(_226).each(function(_227){
var node=new SystemNode(_227);
if(_224){
node.searchToken=_224;
}
_225.add(node);
});
return _225;
};
this.getNamedRootsBySearchToken=function(key,_22a){
return this.getNamedRoots(key,_22a);
};
function compileActionList(node,_22c,_22d){
var _22e=_22c.ClientElementActionGroupId;
if(_22e!=null){
var _22f=_22d.get(_22e).ClientElementActionGroupItems;
if(_22f&&_22f.length>0){
node.setActionList(new List(_22f));
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
new List(self._data.Actions).each(function(_235){
var _236=_235.ActionCategory.Name;
if(SystemAction.hasCategory(_236)){
var _237=new SystemAction(_235);
SystemAction.actionMap.set(_235.ActionKey,_237);
}else{
throw "No such action category: "+_236;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _238=null;
if(this.searchToken){
_238=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_238=System.getChildNodes(this);
}
return _238;
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
var _23a=this._data.Piggybag;
if(_23a==null){
_23a="";
}
return _23a;
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
var _23c=null;
if(typeof this._data.ToolTip!="undefined"){
_23c=this._data.ToolTip;
}
return _23c;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_23e){
map[_23e.Key]=_23e.Value;
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
var _242=SystemAction.actionMap.get(key);
var _243=true;
if(_242.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_243=false;
}
}
if(_243){
var id=_242.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_242);
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
SystemAction.invoke=function(_246,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_246.logger.debug("Execute \""+_246.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_246.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_249,_24a){
action=SystemAction.taggedActions.get(_249);
node=SystemNode.taggedNodes.get(_24a);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_24b){
return SystemAction.categories[_24b]?true:false;
};
function SystemAction(_24c){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_24c;
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
var _24d=null;
if(this.isInFolder()){
_24d=this._data.ActionCategory.FolderName;
}
return _24d;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _24e=null;
if(typeof this._data.TagValue!="undefined"){
_24e=this._data.TagValue;
}
return _24e;
};
SystemAction.prototype.isChecked=function(){
var _24f=null;
if(this.isCheckBox()){
_24f=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _24f;
};
function _UpdateManager(){
var _250=null;
if(!window.UpdateManager){
this._construct();
_250=this;
}
return _250;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_251){
var root=document.documentElement;
var _253=root.namespaceURI;
if(_253==null){
_253=new String(root.getAttribute("xmlns"));
}
if(_253=="http://www.w3.org/1999/xhtml"){
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
var _254=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_254);
}else{
throw new TypeError();
}
}else{
var _255=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_255.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _257=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_257=true;
}
},this);
return _257;
},_setupForm:function(form){
var _25a=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_25a.isEnabled){
_25a._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_25b,type){
if(_25b.addEventListener!=null){
_25b.addEventListener(type,this,false);
}else{
var _25d=this;
_25b.attachEvent("on"+type,function(){
_25d.handleEvent(window.event);
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
var _262=UpdateAssistant.getUpdateZones(dom);
var _263=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_262.forEach(function(_264,_265){
var _266=_263[_265];
this._crawl(_264,_266);
},this);
this._updates.forEach(function(_267,_268){
_267.update();
_267.dispose();
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
},_crawl:function(_26a,_26b,_26c,id){
var _26e=true;
var _26f=_26b.getAttribute("class");
if(_26f==null||_26f.indexOf(this.CLASSNAME_GONE)==-1){
if(_26b.nodeType==Node.ELEMENT_NODE){
var _270=_26b.getAttribute("id");
if(_270!=null){
_26c=_26a;
id=_270;
}
}
if(_26e=this._check(_26a,_26b,_26c,id)){
var _271=_26a.firstChild;
var _272=_26b.firstChild;
while(_271!=null&&_272!=null&&!this._replaced[id]){
switch(_271.nodeType){
case Node.TEXT_NODE:
_26e=this._check(_271,_272,_26c,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_26e=this._crawl(_271,_272,_26c,id);
break;
}
if(this._replaced[id]){
_26e=false;
}else{
_271=_271.nextSibling;
_272=_272.nextSibling;
}
}
}
}
return _26e;
},_check:function(_273,_274,_275,id){
var _277=true;
var _278=null;
var _279=false;
var _27a=false;
if((_273!=null&&_274==null)||(_273==null&&_274!=null)){
_277=false;
}else{
if(_277=_273.nodeType==_274.nodeType){
switch(_274.nodeType){
case Node.ELEMENT_NODE:
if(_273.namespaceURI!=_274.namespaceURI||_273.nodeName!=_274.nodeName){
_277=false;
}else{
if(_277=(_273.nodeName==_274.nodeName)){
var _27b=_274.getAttribute("id");
var _27c=_273.getAttribute("id");
if(_27b!=null&&_27c!=null){
if(_27b!=_27c){
_277=false;
}else{
if((_278=this._getPlugin(_273,_274))!=null){
if(_278.updateElement(_273,_274)){
_27a=true;
_277=false;
}
}
}
}
if(_277){
if(_277=this._checkAttributes(_273,_274)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_273)&&this._hasSoftChildren(_274)){
if(this._validateSoftChildren(_273,_274)){
this._updateSoftChildren(_273,_274);
_279=true;
}
_277=false;
}else{
_277=_273.childNodes.length==_274.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_273.data.trim()!=_274.data.trim()){
_277=false;
}
break;
}
}
}
if(_277==false&&!_279&&!_27a){
if(id!=null&&_275!=null){
this.addUpdate(new ReplaceUpdate(id,_275));
}
}
return _277;
},_checkAttributes:function(_27d,_27e){
var _27f=true;
var _280=false;
var _281=_27d.attributes;
var _282=_27e.attributes;
if(_281.length!=_282.length){
_280=true;
}else{
_280=!Array.every(_281,function(att1,i){
var att2=_282.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_280){
var _286=_27d.getAttribute("id");
var _287=_27e.getAttribute("id");
if(this.hasSoftAttributes&&_286!=null&&_286==_287){
this.addUpdate(new AttributesUpdate(_287,_27d,_27e));
}else{
_27f=false;
}
}
return _27f;
},_hasSoftChildren:function(_288){
var _289=true;
if(_288.hasChildNodes()){
_289=Array.every(_288.childNodes,function(node){
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
return _289;
},_validateSoftChildren:function(_28c,_28d){
var _28e=true;
var _28f=-1;
var _290=-1;
var _291=-1;
var news=this._toMap(_28c.childNodes,true);
var olds=this._toMap(_28d.childNodes,true);
for(var id in olds){
if(_28e){
var _295=olds[id];
_28e=_295>=_28f;
if(news[id]!=null){
_291=news[id];
_28e=_291>=_290;
}
}
_28f=_295;
if(_291>-1){
_290=_291;
}
}
return _28e;
},_updateSoftChildren:function(_296,_297){
var news=this._toMap(_296.childNodes);
var olds=this._toMap(_297.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _29b=null;
for(id in news){
if(olds[id]==null){
var _29c=news[id];
if(_29b==null){
var _29d=_297.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29d,_29c,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29b,_29c,false));
}
}
_29b=id;
}
},addUpdate:function(_29e){
this._updates.push(_29e);
if(_29e instanceof ReplaceUpdate){
this._replaced[_29e.id]=true;
}
},_getPlugin:function(_29f,_2a0){
var _2a1=null;
this.plugins.every(function(_2a2){
if(_2a2.handleElement(_29f,_2a0)){
_2a1=_2a2;
}
return _2a1==null;
});
return _2a1;
},_toMap:function(_2a3,_2a4){
var _2a5={};
Array.forEach(_2a3,function(node,_2a7){
if(node.nodeType==Node.ELEMENT_NODE){
_2a5[node.getAttribute("id")]=_2a4?_2a7:node;
}
});
return _2a5;
},_getPost:function(form){
var _2a9=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2ab){
if(_2ab.name==null||_2ab.name==""){
return;
}
var name=_2ab.name;
var _2ad=encodeURIComponent(_2ab.value);
switch(_2ab.type){
case "button":
case "submit":
var _2ae=UpdateAssistant.getActiveElement();
if(_2ab==_2ae&&name!=""){
_2a9+=name+"="+_2ad+"&";
}
break;
case "radio":
if(_2ab.checked){
_2a9+=name+"="+_2ad+"&";
}
break;
case "checkbox":
if(_2ab.checked){
if(_2ab.name==last){
if(_2a9.lastIndexOf("&")==_2a9.length-1){
_2a9=_2a9.substr(0,_2a9.length-1);
}
_2a9+=","+_2ad;
}else{
_2a9+=name+"="+_2ab.value;
}
last=name;
_2a9+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2a9+=name+"="+_2ad+"&";
break;
}
});
}
return _2a9.substr(0,_2a9.length-1);
},_postRequest:function(form){
var _2b0=form.method!=""?form.method:"get";
var _2b1=form.action!=""?form.action:window.location.toString();
var _2b2=this._getPost(form);
if(_2b0=="get"){
if(_2b1.indexOf("?")>-1){
_2b1=_2b1+"&"+_2b2;
}else{
_2b1+"?"+_2b2;
}
}
var _2b3=this;
var _2b4=UpdateAssistant.getXMLHttpRequest(_2b0,_2b1,this);
if(_2b0=="post"){
_2b4.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2b4.send(_2b0=="post"?_2b2:null);
},_fixdotnet:function(dom,id){
var _2b7=document.getElementById(id);
if(_2b7!=null){
var _2b8=UpdateAssistant.getElementById(dom,id);
if(_2b8!=null){
var _2b9=_2b8.getAttribute("value");
if(_2b9!==_2b7.value){
_2b7.value=_2b9;
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
},report:function(_2bc){
this.summary+=_2bc+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2bd=null;
if(!window.UpdateAssistant){
this._construct();
_2bd=this;
}
return _2bd;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2be,fun){
var _2c0=true;
var len=_2be.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c2=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2be[i]!="undefined"){
if(!fun.call(_2c2,_2be[i],i,_2be)){
_2c0=false;
break;
}
}
}
}
return _2c0;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2c5=arguments[1];
return Array.every(this,fun,_2c5);
};
}
if(!Array.forEach){
Array.forEach=function(_2c6,fun){
var len=_2c6.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c9=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c6[i]!="undefined"){
fun.call(_2c9,_2c6[i],i,_2c6);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2cc=arguments[1];
Array.forEach(this,fun,_2cc);
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
},getXMLHttpRequest:function(_2ce,_2cf,_2d0){
var _2d1=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2d1!=null){
_2d1.open(_2ce,_2cf,(_2d0!=null?true:false));
if(_2d0!=null){
function action(){
if(_2d1.readyState==4){
var text=_2d1.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2d0.handleResponse(dom);
}
}
}
if(_2d1.addEventListener!=null){
_2d1.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2d1.onreadystatechange=action;
}
}
}
return _2d1;
},dispatchEvent:function(_2d4,name){
var _2d6=true;
var _2d7=document.createEvent("UIEvents");
_2d7.initEvent(name,true,true);
_2d6=_2d4.dispatchEvent(_2d7);
return _2d6;
},getUpdateZones:function(dom){
var _2d9="//*[@id and contains(@class,'updatezone')]";
var _2da=[];
var _2db=null;
var _2dc=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2db=dom.evaluate(_2d9,dom,null,type,null);
while((_2dc=_2db.iterateNext())!=null){
_2da.push(_2dc);
}
}else{
_2db=dom.documentElement.selectNodes(_2d9);
Array.forEach(_2db,function(_2de){
_2da.push(_2de);
});
}
return _2da;
},getElementById:function(dom,id){
var _2e1="//*[@id='"+id+"']";
var _2e2=null;
var _2e3=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2e2=dom.evaluate(_2e1,dom,null,type,null);
_2e3=_2e2.singleNodeValue;
}else{
_2e3=dom.documentElement.selectNodes(_2e1)[0];
}
return _2e3;
},_getIds:function(dom){
var _2e6="//*[@id]";
var _2e7=null;
var _2e8=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e7=dom.evaluate(_2e6,dom,null,type,null);
while((element=_2e7.iterateNext())!=null){
_2e8.push(element.getAttribute("id"));
}
}else{
_2e7=dom.documentElement.selectNodes(_2e6);
Array.forEach(_2e7,function(_2ea){
_2e8.push(_2ea.getAttribute("id"));
});
}
return _2e8;
},toHTMLElement:function(_2eb){
var _2ec=this.serialize(_2eb);
var temp=document.createElement("temp");
temp.innerHTML=_2ec;
return temp.firstChild;
},getActiveElement:function(){
var _2ee=document.activeElement;
if(_2ee==null||_2ee==document.body){
_2ee=this._activeElement;
}
return _2ee;
},serialize:function(_2ef){
var _2f0=null;
if(_2ef.xml!=null){
_2f0=_2ef.xml;
}else{
if(this._serializer!=null){
_2f0=this._serializer.serializeToString(_2ef);
}
}
return _2f0;
},hasDifferences:function(_2f1,_2f2){
var s1=null;
var s2=null;
if(_2f1.xml!=null){
s1=_2f1.xml;
s2=_2f2.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2f1);
s2=this._serializer.serializeToString(_2f2);
}
}
return s1!=s2;
},parse:function(_2f5){
var _2f6=null;
if(this._parser!=null&&window.XPathResult!=null){
_2f6=this._parser.parseFromString(_2f5,"text/xml");
}else{
_2f6=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2f6.setProperty("SelectionLanguage","XPath");
_2f6.loadXML(_2f5);
}
return this._validate(_2f6);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f9=dom.getElementsByTagName("parsererror").item(0);
if(_2f9!=null){
out=_2f9.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2fd=!has[id];
has[id]=true;
if(!_2fd){
out="Element \""+id+"\" encountered twice.";
}
return _2fd;
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
this.handleElement=function(_2fe,_2ff){
var _300=false;
switch(_2fe.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2fe.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_300=false;
break;
}
break;
}
return _300;
};
this.updateElement=function(_301,_302){
var id=_301.getAttribute("id");
var _304=document.getElementById(id);
if(_304!=null){
var _305=null;
switch(_304.nodeName.toLowerCase()){
case "input":
_305=_301.getAttribute("value");
break;
case "textarea":
_305=_301.textContent?_301.textContent:_301.text;
break;
}
if(_305==null){
_305="";
}
if(_305!=_304.value){
_304.value=_305;
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
},_beforeUpdate:function(_306){
var _307=true;
if(_306!=null){
_306.__updateType=this.type;
_307=UpdateAssistant.dispatchEvent(_306,Update.EVENT_BEFOREUPDATE);
}
return _307;
},_afterUpdate:function(_308){
var _309=true;
if(_308!=null){
_308.__updateType=this.type;
_309=UpdateAssistant.dispatchEvent(_308,Update.EVENT_AFTERUPDATE);
}
return _309;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_30b){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_30b;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _30c,_30d,_30e=UpdateAssistant.toHTMLElement(this.element);
if((_30c=document.getElementById(this.id))!=null){
if((_30d=_30c.parentNode)!=null){
var _30f=UserInterface.getBinding(_30c);
if(_30f!=null){
_30e.__isAttached=_30f.isAttached;
}
if(this._beforeUpdate(_30c)){
_30d.replaceChild(_30e,_30c);
this._afterUpdate(_30e);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_310){
var _311=ReplaceUpdate.superclass._afterUpdate.call(this,_310);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_310.nodeName=="form"||_310.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _311;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_314,_315){
this.type=type;
this.id=id;
this.element=_314;
this.isFirst=_315;
return this;
}
SiblingUpdate.prototype.update=function(){
var _316=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_316);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_316);
break;
}
};
SiblingUpdate.prototype._remove=function(_317){
var _318=_317.parentNode;
if(_318!=null){
if(this._beforeUpdate(_317)){
_318.removeChild(_317);
this._afterUpdate(_318);
}
}
};
SiblingUpdate.prototype._insert=function(_319,_31a){
var _31b=UpdateAssistant.toHTMLElement(_319);
if(this.isFirst){
var _31c=_31a;
if(_31c!=null){
if(this._beforeUpdate(_31c)){
_31c.insertBefore(_31b,_31c.firstChild);
this._afterUpdate(_31b);
}
}
}else{
var _31c=_31a.parentNode;
if(_31c!=null){
if(this._beforeUpdate(_31c)){
_31c.insertBefore(_31b,_31a.nextSibling);
this._afterUpdate(_31b);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_31d){
var _31e=SiblingUpdate.superclass._beforeUpdate.call(this,_31d);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_31d.id+"\"");
}
return _31e;
};
SiblingUpdate.prototype._afterUpdate=function(_31f){
var _320=true;
if(_31f!=null){
_320=SiblingUpdate.superclass._afterUpdate.call(this,_31f);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_31f.id+"\"");
if(_31f.nodeName=="form"||_31f.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _320;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_322,_323){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_322;
this.currentElement=_323;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _324=document.getElementById(this.id);
if(this._beforeUpdate(_324)){
this._updateAttributes(_324);
this._afterUpdate(_324);
}
};
AttributesUpdate.prototype._updateAttributes=function(_325){
Array.forEach(this.element.attributes,function(_326){
var _327=this.currentElement.getAttribute(_326.nodeName);
if(_327==null||_327!=_326.nodeValue){
this._setAttribute(_325,_326.nodeName,_326.nodeValue);
this._summary.push("@"+_326.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_328){
if(this.element.getAttribute(_328.nodeName)==null){
this._setAttribute(_325,_328.nodeName,null);
this._summary.push("@"+_328.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_329,name,_32b){
if(_329==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_32b);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _32c=(_32b==null);
if(_32c){
_329.removeAttribute(name);
}else{
_329.setAttribute(name,_32b);
}
if(document.all!=null){
if(_32c){
_32b="";
}
switch(name.toLowerCase()){
case "class":
_329.className=_32b;
break;
case "disabled":
_329.disabled=!_32c;
break;
case "checked":
_329.checked=!_32c;
break;
case "readonly":
_329.readOnly=!_32c;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_32d){
AttributesUpdate.superclass._afterUpdate.call(this,_32d);
UpdateManager.report("Attributes updated on element id=\""+this.id+"\": "+this._summary.toString());
};
AttributesUpdate.prototype.dispose=function(){
Update.prototype.dispose.call(this);
this.currentElement=null;
};
if(!window.Node){
window.Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};
}
window.KeyEventCodes={VK_BACK:8,VK_TAB:9,VK_ENTER:13,VK_SHIFT:16,VK_CONTROL:17,VK_ALT:null,VK_ESCAPE:27,VK_SPACE:32,VK_PAGE_UP:33,VK_PAGE_DOWN:34,VK_END:35,VK_HOME:36,VK_LEFT:37,VK_UP:38,VK_RIGHT:39,VK_DOWN:40,VK_INSERT:null,VK_DELETE:127,VK_PLUS:187,VK_MINUS:189,VK_NUMPLUS:107,VK_NUMMINUS:109,VK_F1:112};
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_32e,key){
return _32e.replace("${windowkey}",document.location+":"+key);
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
var _332=this._newDimensions.w!=this._currentDimensions.w;
var _333=this._newDimensions.h!=this._currentDimensions.h;
if(_332||_333){
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
},fireOnDOM:function(_335){
if(Interfaces.isImplemented(IDOMHandler,_335,true)){
this._ondomstatements.add(_335);
}
},fireOnLoad:function(_336){
if(Interfaces.isImplemented(ILoadHandler,_336,true)){
this._onloadstatements.add(_336);
}
},fireOnResize:function(_337){
if(Interfaces.isImplemented(IResizeHandler,_337,true)){
this._onresizestatements.add(_337);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_338){
return eval(_338);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_339,_33a){
SystemLogger.unsuspend(_33a);
}});
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_CLOSED,{handleBroadcast:function(){
SystemLogger.suspend();
}});
EventBroadcaster.subscribe(BroadcastMessages.STAGE_INITIALIZED,{handleBroadcast:function(){
if(Application.isDeveloperMode){
StageBinding.handleViewPresentation("Composite.Management.SystemLog");
StageBinding.handleViewPresentation("Composite.Management.Developer");
}
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_33b,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _33e=top.app.bindingMap.broadcasterHasDirtyTabs;
_33e.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_33f,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _342=top.app.bindingMap.broadcasterHasDirtyTabs;
_342.disable();
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
var _343=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_343=LoginService.Logout(true);
if(!_343){
alert("Logout failed.");
}
}
return _343;
},lock:function(_344){
if(_344!=null){
this._lockthings[_344]=true;
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
},unlock:function(_345,_346){
if(_345!=null){
delete this._lockthings[_345];
if(top.bindingMap.mastercover!=null){
if(_346||this._lockers>0){
if(_346){
var out="Unlocked by "+new String(_345)+"\n";
for(var _348 in this._lockthings){
out+="Locked by "+new String(_348)+". ";
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
},hasLock:function(_349){
return this._lockthings[_349]==true;
},activate:function(_34a){
var _34b=this._activeBinding;
this._activeBinding=_34a;
this._activatedBindings.add(_34a);
if(_34b&&_34b.isActive){
_34b.deActivate();
}
},deActivate:function(_34c){
var _34d=null;
var _34e=null;
if(_34c==this._activeBinding){
while(!_34e&&this._activatedBindings.hasEntries()){
_34d=this._activatedBindings.extractLast();
if(_34d!=_34c&&_34d.isActivatable){
_34e=_34d;
}
}
if(!_34e){
_34e=app.bindingMap.explorerdock;
}
_34e.activate();
}
},focused:function(_34f){
this.isFocused=_34f;
if(_34f){
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
},handleAction:function(_354){
switch(_354.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _356=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_358){
var src=_358.src;
if(src.indexOf(_356)>-1){
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
var _35d=false;
if(this._isMousePositionTracking){
_35d=true;
if(Client.isExplorer&&e.button!=1){
_35d=false;
}
if(_35d){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _35d;
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
},onDragStart:function(_35f){
var _360=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_360,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_360.getImage());
this._cursorStartPoint=_35f;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_360.showDrag){
_360.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_360.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _362=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_362);
}
},onDragStop:function(diff){
if(this._isDragging){
var _364=BindingDragger.draggedBinding;
if(_364.hideDrag){
_364.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_364.dragType);
this._isDragging=false;
_364=BindingAcceptor.acceptingBinding;
if(_364!=null){
if(Interfaces.isImplemented(IAcceptable,_364,true)==true){
_364.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_364);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_365){
if(this.isDeveloperMode||_365){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_366){
if(_366==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_367){
switch(_367){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_369){
switch(_369.Key){
case "ProductVersion":
this.versionString=_369.Value;
break;
case "ProductTitle":
this.versionPrettyString=_369.Value;
break;
case "InstallationId":
this.installationID=_369.Value;
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
var _36c=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _36d={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _36e=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_36e){
for(var key in _36e){
_36d[key]=_36e[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_36d);
}
}});
this.getPref=function(key){
var _371=null;
if(key){
_371=_36d[key];
}else{
throw "No such preference.";
}
return _371;
};
this.setPref=function(key,_373){
if(key){
_36d[key]=_373;
}else{
throw "No such preference.";
}
};
function debug(_374){
var _375=_374?"Persisted preferences":"No persisted preferences. Using defaults";
_375+=":\n";
for(var key in _36d){
var pref=_36d[key];
_375+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_36c.fine(_375);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _37a=null;
if(this.isInitialized==true){
if(this._persistance){
var _37b=this._persistance[id];
if(_37b){
_37a=_37b[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _37a;
},setPersistedProperty:function(id,prop,_37e){
if(this.isInitialized==true){
if(this._persistance){
if(_37e!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_37e);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_37f){
switch(_37f){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _380=top.bindingMap.persistance;
_380.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _381=top.bindingMap.persistance;
var map=_381.getPersistanceMap();
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
};
StandardEventHandler.isBackAllowed=false;
function StandardEventHandler(doc,_384){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_384;
this._addListeners();
}
StandardEventHandler.prototype._addListeners=function(){
var doc=this._contextDocument;
DOMEvents.addEventListener(doc,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEUP,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEMOVE,this);
if(Client.isExplorer){
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
var _388={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_388);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_388);
}
if(Client.isMozilla){
doc.addEventListener(DOMEvents.KEYDOWN,{handleEvent:function(e){
var s=83;
if(e.ctrlKey&&e.keyCode==s){
e.preventDefault();
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
var _38f=UserInterface.getBinding(node);
if(_38f!=null){
_38f.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_38f!=null?null:node.parentNode;
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
var _392=Application.trackMousePosition(e);
if(_392){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_394){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_394){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_394=true;
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
var _395=KeySetBinding.handleKey(this._contextDocument,e);
if(!_395){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _396=this._contextWindow.frameElement;
if(_396!=null){
var _397=DOMUtil.getParentWindow(_396);
if(_397.standardEventHandler!=null){
_397.standardEventHandler._handleKeyDown(e,_394);
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
var _39a=false;
var _39b=DOMEvents.getTarget(e);
var name=_39b.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_39a=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_39a;
}
if(_39a){
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
StandardEventHandler.prototype.enableNativeKeys=function(_39e){
this._isAllowTabs=(_39e==true?true:false);
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
function Action(_3a1,type){
this.target=_3a1;
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
function Animation(_3a3){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3a4 in _3a3){
this[_3a4]=_3a3[_3a4];
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
Animation.prototype.onstart=function(_3a8){
};
Animation.prototype.onstep=function(_3a9){
};
Animation.prototype.onstop=function(_3aa){
};
Point.isEqual=function(p1,p2){
var _3ad=false;
if(p1&&p2){
_3ad=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3ad;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3b2=false;
if(dim1&&dim2){
_3b2=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3b2;
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
function BindingAcceptor(_3b9){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b9;
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
var _3ba=new List(this._binding.dragAccept.split(" "));
while(_3ba.hasNext()){
var type=_3ba.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3bc,arg){
var type=arg;
try{
switch(_3bc){
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
function BindingBoxObject(_3c1){
this._domElement=_3c1.getBindingElement();
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
function BindingDragger(_3c3){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3c3;
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
BindingDragger.prototype.registerHandler=function(_3c5){
if(Interfaces.isImplemented(IDragHandler,_3c5)==true){
this.handler=_3c5;
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
var _3c8=e.button==(e.target?0:1);
if(_3c8){
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
var _3ca=Application.getMousePosition();
var dx=_3ca.x-this.startPoint.x;
var dy=_3ca.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3cd,e){
switch(_3cd){
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
function BindingParser(_3cf){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3cf;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3d0){
var _3d1=new List();
var xml=BindingParser.XML.replace("${markup}",_3d0);
var doc=XMLParser.parse(_3d0);
if(doc){
var _3d4=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3d4);
var node=_3d4.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3d1.add(node);
}
node=node.nextSibling;
}
}
return _3d1;
};
BindingParser.prototype._iterate=function(_3d6,_3d7){
var _3d8=null;
switch(_3d6.nodeType){
case Node.ELEMENT_NODE:
_3d8=this._cloneElement(_3d6);
UserInterface.registerBinding(_3d8);
break;
case Node.TEXT_NODE:
_3d8=this._ownerDocument.createTextNode(_3d6.nodeValue);
break;
}
if(_3d8){
_3d7.appendChild(_3d8);
}
if(_3d8&&_3d6.hasChildNodes()){
var _3d9=_3d6.firstChild;
while(_3d9){
this._iterate(_3d9,_3d8);
_3d9=_3d9.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3da){
var _3db=DOMUtil.createElementNS(_3da.namespaceURI?_3da.namespaceURI:Constants.NS_XHTML,_3da.nodeName,this._ownerDocument);
var i=0;
while(i<_3da.attributes.length){
var attr=_3da.attributes.item(i++);
_3db.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3db;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3de){
var _3df=null;
var _3e0=false;
var _3e1=_3de.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3de)){
var _3e2=UserInterface.getBinding(_3de);
_3e0=BindingSerializer.activeInstance.indexBinding(_3e2);
if(_3e0){
_3df=_3e2.key;
_3de.setAttribute(BindingSerializer.KEYPOINTER,_3df);
}
}
_3df=_3df?_3df:_3e1;
var _3e3=new List(_3de.childNodes);
_3e3.each(function(_3e4){
if(_3e4.nodeType==Node.ELEMENT_NODE){
_3e4.setAttribute(BindingSerializer.KEYPOINTER,_3df);
}
});
if(_3e0){
BindingSerializer.activeInstance.append(_3df,_3e1);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3e5){
BindingSerializer.activeInstance=this;
_3e5.bindingWindow.ElementIterator.iterate(_3e5.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e6){
var _3e7=false;
var _3e8=_3e6.serialize();
if(_3e8!=false){
_3e7=true;
var _3e9="ui:"+DOMUtil.getLocalName(_3e6.bindingElement);
var _3ea=DOMUtil.createElementNS(Constants.NS_UI,_3e9,this._dom);
this._pointers[_3e6.key]=_3ea;
for(var prop in _3e8){
if(_3e8[prop]!=null){
_3ea.setAttribute(prop,String(_3e8[prop]));
}
}
}
return _3e7;
};
BindingSerializer.prototype.append=function(_3ec,_3ed){
var _3ee=this._pointers[_3ec];
var _3ef=_3ed?this._pointers[_3ed]:this._dom;
_3ef.appendChild(_3ee);
};
function ImageProfile(_3f0){
this._default=_3f0.image;
this._hover=_3f0.imageHover;
this._active=_3f0.imageActive;
this._disabled=_3f0.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3f1){
this._default=_3f1;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3f2){
this._hover=_3f2;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3f3){
this._active=_3f3;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3f4){
this._disabled=_3f4;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f5,_3f6,_3f7){
var _3f8=null;
if(_3f5.isAttached){
_3f8=new List();
var _3f9=_3f7?_3f5.getChildElementsByLocalName(_3f6):_3f5.getDescendantElementsByLocalName(_3f6);
_3f9.each(function(_3fa){
var _3fb=UserInterface.getBinding(_3fa);
if(_3fb){
_3f8.add(_3fb);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f5.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f8;
},getAncestorBindingByType:function(_3fd,impl,_3ff){
var _400=null;
if(Binding.exists(_3fd)){
var node=_3fd.bindingElement;
while(_400==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _402=UserInterface.getBinding(node);
if(_402 instanceof impl){
_400=_402;
}
}else{
if(_3ff&&node.nodeType==Node.DOCUMENT_NODE){
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
return _400;
},getAncestorBindingByLocalName:function(_404,_405,_406){
var _407=null;
if(_405=="*"){
var node=_404.bindingElement;
while(!_407&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_407=UserInterface.getBinding(node);
}
}
}else{
_407=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_405,_404.bindingElement,_406));
}
return _407;
},getChildElementsByLocalName:function(_409,_40a){
var _40b=new List();
var _40c=new List(_409.bindingElement.childNodes);
_40c.each(function(_40d){
if(_40d.nodeType==Node.ELEMENT_NODE){
if(_40a=="*"||DOMUtil.getLocalName(_40d)==_40a){
_40b.add(_40d);
}
}
});
return _40b;
},getChildBindingByType:function(_40e,impl){
var _410=null;
_40e.getChildElementsByLocalName("*").each(function(_411){
var _412=UserInterface.getBinding(_411);
if(_412!=null&&_412 instanceof impl){
_410=_412;
return false;
}else{
return true;
}
});
return _410;
},getDescendantBindingByType:function(_413,impl){
var _415=null;
_413.getDescendantElementsByLocalName("*").each(function(_416){
var _417=UserInterface.getBinding(_416);
if(_417!=null&&_417 instanceof impl){
_415=_417;
return false;
}else{
return true;
}
});
return _415;
},getDescendantBindingsByType:function(_418,impl){
var _41a=new List();
_418.getDescendantElementsByLocalName("*").each(function(_41b){
var _41c=UserInterface.getBinding(_41b);
if(_41c!=null&&_41c instanceof impl){
_41a.add(_41c);
}
return true;
});
return _41a;
},getNextBindingByLocalName:function(_41d,name){
var _41f=null;
var _420=_41d.bindingElement;
while((_420=DOMUtil.getNextElementSibling(_420))!=null&&DOMUtil.getLocalName(_420)!=name){
}
if(_420!=null){
_41f=UserInterface.getBinding(_420);
}
return _41f;
},getPreviousBindingByLocalName:function(_421,name){
var _423=null;
var _424=_421.bindingElement;
while((_424=DOMUtil.getPreviousElementSibling(_424))!=null&&DOMUtil.getLocalName(_424)!=name){
}
if(_424!=null){
_423=UserInterface.getBinding(_424);
}
return _423;
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
},addFilter:function(_425){
this._filters.add(_425);
},removeFilter:function(_426){
var _427=-1;
this._filters.each(function(fil){
_427++;
var _429=true;
if(fil==_426){
_429=false;
}
return _429;
});
if(_427>-1){
this._filters.del(_427);
}
},_applyFilters:function(node,arg){
var _42c=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _42f=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _430=true;
while(this._filters.hasNext()&&_430==true){
var _431=this._filters.getNext();
var res=_431.call(this,node,arg);
if(res!=null){
_42c=res;
switch(res){
case stop:
case skip:
case skip+_42f:
_430=false;
break;
}
}
}
return _42c;
},crawl:function(_433,arg){
this.contextDocument=_433.ownerDocument;
this.onCrawlStart();
var _435=this.type==NodeCrawler.TYPE_ASCENDING;
var _436=this._applyFilters(_433,arg);
if(_436!=NodeCrawler.STOP_CRAWLING){
if(_435&&_436==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_435?_433.parentNode:_433;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_438,arg){
var _43a=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_43a=this._crawlDescending(_438,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_43a=this._crawlAscending(_438,arg);
break;
}
return _43a;
},_crawlDescending:function(_43b,arg){
var skip=NodeCrawler.SKIP_NODE;
var _43e=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _440=null;
if(_43b.hasChildNodes()){
var node=_43b.firstChild;
while(node!=null&&_440!=stop){
this.currentNode=node;
_440=this._applyFilters(node,arg);
switch(_440){
case stop:
case _43e:
case skip+_43e:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_440=stop;
break;
}
}
}
if(_440!=stop&&_440!=skip){
this.previousNode=node;
}
break;
}
if(_440!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _440;
},_crawlAscending:function(_443,arg){
var _445=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_443!=null){
this.currentNode=_443;
_445=this._applyFilters(_443,arg);
if(_445!=stop){
var next=this.nextNode?this.nextNode:_443.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_443;
_445=this._crawl(next,arg);
}
}
}else{
_445=stop;
}
return _445;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _449 in this){
this[_449]=null;
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
var _44c=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_44c=NodeCrawler.SKIP_NODE;
}
return _44c;
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
this.addFilter(function(_44d,arg){
var _44f=null;
if(!UserInterface.hasBinding(_44d)){
_44f=NodeCrawler.SKIP_NODE;
}
return _44f;
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
this.addFilter(function(_451,arg){
var _453=null;
var _454=UserInterface.getBinding(_451);
if(Interfaces.isImplemented(ICrawlerHandler,_454)==true){
self.response=null;
_454.handleCrawler(self);
_453=self.response;
}
return _453;
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
this.addFilter(function(_456,list){
var _458=null;
var _459=UserInterface.getBinding(_456);
if(Interfaces.isImplemented(IFlexible,_459)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_459);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_459.isFlexSuspended==true){
_458=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_459);
}
break;
}
}
return _458;
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
this.addFilter(function(_45a,list){
var _45c=null;
var _45d=UserInterface.getBinding(_45a);
if(_45d.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_45d)==true){
if(_45d.isFocusable&&_45d.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_45d);
break;
case FocusCrawler.MODE_FOCUS:
if(!_45d.isFocused){
_45d.focus();
}
_45c=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_45d.isFocused==true){
_45d.blur();
_45c=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _45c;
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
this.addFilter(function(_45e,list){
var _460=null;
var _461=UserInterface.getBinding(_45e);
if(!_461.isVisible){
_460=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _460;
});
this.addFilter(function(_462,list){
var _464=null;
var _465=UserInterface.getBinding(_462);
if(_465.isAttached){
if(Interfaces.isImplemented(IFit,_465)){
if(!_465.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_465);
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
if(Client.isMozilla){
UpdateAssistant.serialize=function(_466){
_466=_466.cloneNode(true);
_466.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_466.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_466);
};
}
},handleEvent:function(e){
var _468=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_468);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_468);
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
},_beforeUpdate:function(_469){
var _46a=(_469==document.documentElement);
if(_46a){
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
var _46d=FocusBinding.focusedBinding;
if(_46d!=null){
this._focusID=_46d.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_469.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_469);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_469,false);
break;
}
}
},_afterUpdate:function(_46e){
var _46f=(_46e==document.documentElement);
if(_46f){
var _470=this._elementsbuffer;
if(_470.hasEntries()){
_470.each(function(_471){
DocumentManager.attachBindings(_471);
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
var _474=FocusBinding.focusedBinding;
if(_474==null){
var _475=document.getElementById(this._focusID);
if(_475!=null){
var _474=UserInterface.getBinding(_475);
if(_474!=null){
_474.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _476=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _477="NEW DOM: "+document.title+"\n\n"+_476+"\n\n";
_477+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_477);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_46e.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_46e.__isAttached!==false){
this._elementsbuffer.add(_46e);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46e,true);
break;
}
switch(_46e.id){
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
var _474=UserInterface.getBinding(_46e);
while(_474==null&&_46e!=null){
_474=UserInterface.getBinding(_46e);
_46e=_46e.parentNode;
}
if(_474!=null){
_474.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_479,_47a){
var _47b=UserInterface.getBinding(_479);
if(_47b!=null){
if(_47a){
var _47c=this._attributesbuffer;
var map=new Map();
_47c.each(function(name,old){
var now=_479.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_479.attributes).each(function(att){
if(att.specified){
if(!_47c.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_483){
var _484=_47b.propertyMethodMap[name];
if(_484!=null){
_484.call(_47b,_483);
}
});
}else{
var map=new Map();
new List(_479.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_486,_487){
var _488=window.bindingMap[_486.getAttribute("id")];
if(_488!=null){
return _488.handleElement(_486,_487);
}
},updateElement:function(_489,_48a){
var _48b=window.bindingMap[_489.getAttribute("id")];
if(_48b!=null){
return _48b.updateElement(_489,_48a);
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
this.addFilter(function(_48d,list){
var _48f=UserInterface.getBinding(_48d);
var _490=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_48f==null){
UserInterface.registerBinding(_48d);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_48f!=null){
if(!_48f.isAttached){
list.add(_48f);
}
if(_48f.isLazy==true){
_490=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_48f!=null){
list.add(_48f);
}
break;
}
return _490;
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
},handleBroadcast:function(_491,arg){
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
var _494=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_494)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_494!=null){
if(_494.href!=null&&_494.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _495=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_495!=null){
var map={};
var _497=DOMUtil.getElementsByTagName(_495,"bindingmapping");
new List(_497).each(function(_498){
var _499=_498.getAttribute("element");
var _49a=_498.getAttribute("binding");
map[_499]=eval(_49a);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_49b){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_49b;
}else{
this.customUserInterfaceMapping.merge(_49b);
}
},_registerBindings:function(_49c){
var _49d=new DocumentCrawler();
_49d.mode=DocumentCrawler.MODE_REGISTER;
_49d.crawl(_49c);
_49d.dispose();
},_attachBindings:function(_49e){
var _49f=new DocumentCrawler();
_49f.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_49f.crawl(_49e,list);
var _4a1=false;
while(list.hasNext()){
var _4a2=list.getNext();
if(!_4a2.isAttached){
_4a2.onBindingAttach();
if(!_4a2.memberDependencies){
_4a2.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4a2)){
_4a1=true;
}
}
}
if(_4a1){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49f.dispose();
list.dispose();
},attachBindings:function(_4a4){
this._registerBindings(_4a4);
this._attachBindings(_4a4);
},detachBindings:function(_4a5,_4a6){
var _4a7=new DocumentCrawler();
_4a7.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a7.crawl(_4a5,list);
if(_4a6==true){
list.extractFirst();
}
var _4a9=false;
list.reverse().each(function(_4aa){
if(Interfaces.isImplemented(IData,_4aa)){
_4a9=true;
}
_4aa.dispose(true);
});
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
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4ac){
return (/textarea|input/.test(DOMUtil.getLocalName(_4ac)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4ad){
this.isDirty=true;
var _4ae=false;
if(_4ad!=null&&!_4ad.isDirty){
_4ad.isDirty=true;
_4ad.dispatchAction(Binding.ACTION_DIRTY);
_4ae=true;
}
return _4ae;
},clean:function(_4af){
if(_4af.isDirty){
_4af.isDirty=false;
}
},registerDataBinding:function(name,_4b1){
if(Interfaces.isImplemented(IData,_4b1,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4b1;
}
}else{
throw "Invalid DataBinding: "+_4b1;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4b4=null;
if(this._dataBindings[name]!=null){
_4b4=this._dataBindings[name];
}
return _4b4;
},getAllDataBindings:function(_4b5){
var list=new List();
for(var name in this._dataBindings){
var _4b8=this._dataBindings[name];
list.add(_4b8);
if(_4b5&&_4b8 instanceof WindowBinding){
var _4b9=_4b8.getContentWindow().DataManager;
if(_4b9!=null){
list.merge(_4b9.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4ba=false;
for(var name in this._dataBindings){
_4ba=true;
break;
}
return _4ba;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4be){
var _4bf=this._dataBindings[name];
if(_4bf!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4bf.setResult(_4be);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4bf);
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
var _4c0=new DataBindingMap();
_4c0.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4c2=this._dataBindings[name];
if(_4c2 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4c0[name]=_4c2.getValue();
}
return _4c0;
},getDataBindingResultMap:function(){
var _4c3=new DataBindingMap();
_4c3.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c5=this._dataBindings[name];
var res=_4c5.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c8){
_4c3.set(name,_4c8);
});
}else{
_4c3.set(name,res);
}
}
return _4c3;
},getPostBackString:function(){
var _4c9="";
var form=document.forms[0];
if(form!=null){
var _4cb="";
new List(form.elements).each(function(_4cc){
var name=_4cc.name;
var _4ce=encodeURIComponent(_4cc.value);
switch(_4cc.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c9+=name+"="+_4ce+"&";
break;
case "submit":
if(document.activeElement==_4cc){
_4c9+=name+"="+_4ce+"&";
}
break;
case "radio":
if(_4cc.checked){
_4c9+=name+"="+_4ce+"&";
}
break;
case "checkbox":
if(_4cc.checked){
if(_4cc.name==_4cb){
if(_4c9.lastIndexOf("&")==_4c9.length-1){
_4c9=_4c9.substr(0,_4c9.length-1);
}
_4c9+=","+_4ce;
}else{
_4c9+=name+"="+_4cc.value;
}
_4cb=name;
_4c9+="&";
}
break;
}
});
}
return _4c9.substr(0,_4c9.length-1);
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
var _4d7=null;
var _4d8=null;
var _4d9=false;
if(!this._cache[name]){
_4d9=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4db=DOMUtil.getXMLHTTPRequest();
_4db.open("get",uri,false);
_4db.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4db.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d8=_4db.responseText;
break;
default:
_4d8=_4db.responseXML;
break;
}
if(_4d8==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d8;
}
}
_4d8=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d7=_4d8;
break;
case this._modes.MODE_DOCUMENT:
_4d7=DOMUtil.cloneNode(_4d8,true);
break;
case this._modes.MODE_ELEMENT:
_4d7=DOMUtil.cloneNode(_4d8.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d7=DOMSerializer.serialize(_4d8,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d7=DOMSerializer.serialize(_4d8.documentElement,true);
break;
}
if(_4d9&&Application.isDeveloperMode){
}
return _4d7;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4de){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4de];
},invoke:function(url,_4e0,_4e1){
this._logger.error("Not implemented");
},invokeModal:function(url,_4e3,_4e4){
var _4e5=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4e3,argument:_4e4});
StageBinding.presentViewDefinition(_4e5);
return _4e5;
},invokeDefinition:function(_4e6){
if(_4e6 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e6);
}
return _4e6;
},question:function(_4e7,text,_4e9,_4ea){
if(!_4e9){
_4e9=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e7,text,_4e9,_4ea);
},message:function(_4eb,text,_4ed,_4ee){
if(!_4ed){
_4ed=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4eb,text,_4ed,_4ee);
},error:function(_4ef,text,_4f1,_4f2){
if(!_4f1){
_4f1=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4ef,text,_4f1,_4f2);
},warning:function(_4f3,text,_4f5,_4f6){
if(!_4f5){
_4f5=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4f3,text,_4f5,_4f6);
},_standardDialog:function(type,_4f8,text,_4fa,_4fb){
var _4fc=null;
if(!_4fa){
_4fc=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4fc=new List();
new List(_4fa).each(function(_4fd){
var _4fe=null;
switch(typeof _4fd){
case "object":
_4fe=_4fd;
break;
case "string":
var _4ff=false;
if(_4fd.indexOf(":")>-1){
_4fd=_4fd.split(":")[0];
_4ff=true;
}
_4fe=Dialog.dialogButton(_4fd);
if(_4ff){
_4fe.isDefault=true;
}
break;
}
_4fc.add(_4fe);
});
}
var _500={title:_4f8,text:text,type:type,image:this._dialogImages[type],buttons:_4fc};
var _501=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4fb,argument:_500});
StageBinding.presentViewDefinition(_501);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_503,arg){
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
},saveAll:function(_506){
var self=this;
var _508=Application.getDirtyDockTabsTabs();
if(_508.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_509,_50a){
switch(_509){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_50a,_506);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_508);
}else{
if(_506){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_50b,_50c){
var _50d=false;
var list=new List();
_50b.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_50d=true;
var _511=list.getLength();
var _512={handleBroadcast:function(_513,tab){
if(--_511==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_50c){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_512);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _50d;
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
var _517="Composite.Management.Help";
if(!StageBinding.isViewOpen(_517)){
StageBinding.handleViewPresentation(_517);
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
var _519=document.createEvent("Events");
_519.initEvent(type,true,true);
window.dispatchEvent(_519);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function CompositeUrl(url){
var _51b=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _51c=_51b.exec(url);
if(_51c){
var _51d={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_51d[$1]=$3;
});
this.queryString=_51d;
this.path=url.replace(/\?.*/g,"");
if(_51c[3]=="media"){
this.isMedia=true;
}else{
if(_51c[3]=="page"){
this.isPage=true;
}
}
}
return this;
}
CompositeUrl.prototype.getPath=function(){
return this.path;
};
CompositeUrl.prototype.hasParam=function(key){
return this.queryString[key]!=null;
};
CompositeUrl.prototype.getParam=function(key){
return this.queryString[key];
};
CompositeUrl.prototype.setParam=function(key,_525){
this.queryString[key]=_525;
};
CompositeUrl.prototype.toString=function(){
var url=this.path;
var _527=[];
for(var key in this.queryString){
_527.push(key+"="+this.queryString[key]);
}
if(_527.length>0){
url+="?"+_527.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_529,_52a){
var _52b=null;
var _52c=ViewDefinitions[_529];
if(_52c.isMutable){
var impl=null;
if(_52c instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_52a!=null&&impl!=null){
var def=new impl();
for(var prop in _52c){
def[prop]=ViewDefinition.cloneProperty(_52c[prop]);
}
def.handle=_52a;
_52b=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _52b;
};
ViewDefinition.cloneProperty=function(_530){
if(null==_530){
return _530;
}
if(typeof _530==="object"){
var _531=(_530.constructor===Array)?[]:{};
for(var prop in _530){
_531[prop]=ViewDefinition.cloneProperty(_530[prop]);
}
return _531;
}
return _530;
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
Binding.evaluate=function(_538,_539){
var _53a=null;
var _53b=_539.bindingWindow.WindowManager;
if(_53b!=null){
var _53c=Binding.parseScriptStatement(_538,_539.key);
_53a=_53b.evaluate(_53c);
}
return _53a;
};
Binding.parseScriptStatement=function(_53d,key){
if(_53d!=null&&key!=null){
var _53f="UserInterface.getBindingByKey ( \""+key+"\" )";
_53d=_53d.replace(/(\W|^)this(,| +|\)|;)/g,_53f);
_53d=_53d.replace(/(\W|^)this(\.)/g,_53f+".");
}
return _53d;
};
Binding.exists=function(_540){
var _541=false;
try{
if(_540&&_540.bindingElement&&_540.bindingElement.nodeType&&_540.isDisposed==false){
_541=true;
}
}
catch(accessDeniedException){
_541=false;
}
finally{
return _541;
}
};
Binding.destroy=function(_542){
if(!_542.isDisposed){
if(_542.acceptor!=null){
_542.acceptor.dispose();
}
if(_542.dragger!=null){
_542.disableDragging();
}
if(_542.boxObject!=null){
_542.boxObject.dispose();
}
if(_542._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_542);
}
for(var _543 in _542.shadowTree){
var _544=_542.shadowTree[_543];
if(_544 instanceof Binding&&Binding.exists(_544)){
_544.dispose(true);
}
_542.shadowTree[_543]=null;
}
_542.isDisposed=true;
_542=null;
}
};
Binding.dotnetify=function(_545,_546){
var _547=_545.getCallBackID();
if(_547!=null){
var _548=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_545.bindingDocument);
_548.type="hidden";
_548.id=_547;
_548.name=_547;
_548.value=_546!=null?_546:"";
_545.bindingElement.appendChild(_548);
_545.shadowTree.dotnetinput=_548;
}else{
throw _545.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_549){
var _54a=_549.getProperty("image");
var _54b=_549.getProperty("image-hover");
var _54c=_549.getProperty("image-active");
var _54d=_549.getProperty("image-disabled");
if(_549.imageProfile==null){
if(_549.image==null&&_54a!=null){
_549.image=_54a;
}
if(_549.imageHover==null&&_54b!=null){
_549.imageHover=_54a;
}
if(_549.imageActive==null&&_54c!=null){
_549.imageActive=_54c;
}
if(_549.imageDisabled==null&&_54d!=null){
_549.imageDisabled=_54d;
}
if(_549.image||_549.imageHover||_549.imageActive||_549.imageDisabled){
_549.imageProfile=new ImageProfile(_549);
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
var _54f=this.dependentBindings[key];
_54f.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_550){
if(_550){
this.memberDependencies[_550.key]=true;
var _551=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_551=false;
break;
}
}
if(_551){
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
Binding.prototype.detachRecursive=function(_553){
if(_553==null){
_553=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_553);
};
Binding.prototype.addMember=function(_554){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_554.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_554.key]=false;
_554.registerDependentBinding(this);
}
}
return _554;
};
Binding.prototype.addMembers=function(_555){
while(_555.hasNext()){
var _556=_555.getNext();
if(!_556.isInitialized){
this.addMember(_556);
}
}
return _555;
};
Binding.prototype.registerDependentBinding=function(_557){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_557.key]=_557;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _558=this.getProperty("persist");
if(_558&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _55a=new List(_558.split(" "));
while(_55a.hasNext()){
var prop=_55a.getNext();
var _55c=Persistance.getPersistedProperty(id,prop);
if(_55c!=null){
this._persist[prop]=_55c;
this.setProperty(prop,_55c);
}else{
_55c=this.getProperty(prop);
if(_55c!=null){
this._persist[prop]=_55c;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _55d=this.getProperty("disabled");
var _55e=this.getProperty("contextmenu");
var _55f=this.getProperty("observes");
var _560=this.getProperty("onattach");
var _561=this.getProperty("hidden");
var _562=this.getProperty("blockactionevents");
if(_561==true&&this.isVisible==true){
this.hide();
}
if(_55d&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_55e){
this.setContextMenu(_55e);
}
if(_55f){
this.observe(this.getBindingForArgument(_55f));
}
if(_562==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_560!=null){
Binding.evaluate(_560,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _564=this.getProperty("draggable");
var _565=this.getProperty("dragtype");
var _566=this.getProperty("dragaccept");
var _567=this.getProperty("dragreject");
if(_564!=null){
this.isDraggable=_564;
}
if(_565!=null){
this.dragType=_565;
if(_564!=false){
this.isDraggable=true;
}
}
if(_566!=null){
this.dragAccept=_566;
}
if(_567!=null){
this.dragReject=_567;
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
Binding.prototype._updateBindingMap=function(_568){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _56b=null;
if(_568){
_56b=map[id];
if(_56b!=null&&_56b!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_56b=map[id];
if(_56b!=null&&_56b==this){
delete map[id];
}
}
}else{
var _56d=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_568);
if(Application.isDeveloperMode==true){
alert(_56d);
}else{
this.logger.error(_56d);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_56f){
};
Binding.prototype.handleBroadcast=function(_570,arg){
};
Binding.prototype.handleElement=function(_572){
return false;
};
Binding.prototype.updateElement=function(_573){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _575=null;
switch(typeof arg){
case "object":
_575=arg;
break;
case "string":
_575=this.bindingDocument.getElementById(arg);
if(_575==null){
_575=Binding.evaluate(arg,this);
}
break;
}
if(_575!=null&&_575.nodeType!=null){
_575=UserInterface.getBinding(_575);
}
return _575;
};
Binding.prototype.serialize=function(){
var _576={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_576.id=id;
}
var _578=this.getProperty("binding");
if(_578){
_576.binding=_578;
}
return _576;
};
Binding.prototype.serializeToString=function(){
var _579=null;
if(this.isAttached){
_579=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _579;
};
Binding.prototype.subTreeFromString=function(_57a){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_57a);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_57b){
var _57c=this.bindingElement.getAttribute(_57b);
if(_57c){
_57c=Types.castFromString(_57c);
}
return _57c;
};
Binding.prototype.setProperty=function(prop,_57e){
if(_57e!=null){
_57e=_57e.toString();
if(String(this.bindingElement.getAttribute(prop))!=_57e){
this.bindingElement.setAttribute(prop,_57e);
if(this.isAttached==true){
if(Persistance.isEnabled&&_57e!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_57e;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_57e);
}
}
var _57f=this.propertyMethodMap[prop];
if(_57f){
_57f.call(this,this.getProperty(prop));
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
var _581=null;
if(Binding.exists(this)){
_581=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _581;
};
Binding.prototype.attachClassName=function(_582){
CSSUtil.attachClassName(this.bindingElement,_582);
};
Binding.prototype.detachClassName=function(_583){
CSSUtil.detachClassName(this.bindingElement,_583);
};
Binding.prototype.hasClassName=function(_584){
return CSSUtil.hasClassName(this.bindingElement,_584);
};
Binding.prototype.addActionListener=function(type,_586){
_586=_586!=null?_586:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_586)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_586);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_586+")");
}
};
Binding.prototype.removeActionListener=function(type,_588){
_588=_588?_588:this;
if(Action.isValid(type)){
var _589=this.actionListeners[type];
if(_589){
var i=0,_58b;
while((_58b=_589[i])!=null){
if(_58b==_588){
_589.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_58d){
_58d=_58d?_58d:this;
DOMEvents.addEventListener(this.bindingElement,type,_58d);
};
Binding.prototype.removeEventListener=function(type,_58f){
_58f=_58f?_58f:this;
DOMEvents.removeEventListener(this.bindingElement,type,_58f);
};
Binding.prototype.subscribe=function(_590){
if(!this.hasSubscription(_590)){
this._subscriptions.set(_590,true);
EventBroadcaster.subscribe(_590,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_590);
}
};
Binding.prototype.unsubscribe=function(_591){
if(this.hasSubscription(_591)){
this._subscriptions.del(_591);
EventBroadcaster.unsubscribe(_591,this);
}
};
Binding.prototype.hasSubscription=function(_592){
return this._subscriptions.has(_592);
};
Binding.prototype.observe=function(_593,_594){
_593.addObserver(this,_594);
};
Binding.prototype.unObserve=function(_595,_596){
_595.removeObserver(this,_596);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _59b={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_59b);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_59b);
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
var _59d=null;
var _59e=null;
var _59f=false;
if(arg instanceof Action){
_59d=arg;
}else{
if(Action.isValid(arg)){
_59d=new Action(this,arg);
_59f=true;
}
}
if(_59d!=null&&Action.isValid(_59d.type)==true){
if(_59d.isConsumed==true){
_59e=_59d;
}else{
var _5a0=this.actionListeners[_59d.type];
if(_5a0!=null){
_59d.listener=this;
var i=0,_5a2;
while((_5a2=_5a0[i++])!=null){
if(_5a2&&_5a2.handleAction){
_5a2.handleAction(_59d);
}
}
}
var _5a3=true;
if(this.isBlockingActions==true){
switch(_59d.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_59f){
_5a3=false;
}
break;
}
}
if(_5a3){
_59e=this.migrateAction(_59d);
}else{
_59e=_59d;
}
}
}
return _59e;
};
Binding.prototype.migrateAction=function(_5a4){
var _5a5=null;
var _5a6=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5a5&&node.nodeType!=Node.DOCUMENT_NODE){
_5a5=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5a5){
_5a6=_5a5.dispatchAction(_5a4);
}else{
_5a6=_5a4;
}
}
return _5a6;
};
Binding.prototype.reflex=function(_5a8){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5a8);
}
};
Binding.prototype.getMigrationParent=function(){
var _5a9=null;
if(true){
try{
var _5aa=this.bindingElement.parentNode;
if(_5aa!=null){
_5a9=_5aa;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5a9=null;
}
}
return _5a9;
};
Binding.prototype.add=function(_5ab){
if(_5ab.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5ab.bindingElement);
}else{
throw "Could not add "+_5ab.toString()+" of different document origin.";
}
return _5ab;
};
Binding.prototype.addFirst=function(_5ac){
if(_5ac.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5ac.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5ac.toString()+" of different document origin.";
}
return _5ac;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5ad,_5ae){
return BindingFinder.getAncestorBindingByLocalName(this,_5ad,_5ae);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b0){
return BindingFinder.getAncestorBindingByType(this,impl,_5b0);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b2){
return BindingFinder.getChildElementsByLocalName(this,_5b2);
};
Binding.prototype.getChildElementByLocalName=function(_5b3){
return this.getChildElementsByLocalName(_5b3).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5b4){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5b4));
};
Binding.prototype.getChildBindingsByLocalName=function(_5b5){
return this.getDescendantBindingsByLocalName(_5b5,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5b6){
return this.getChildBindingsByLocalName(_5b6).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5b7,_5b8){
return BindingFinder.getDescendantBindingsByLocalName(this,_5b7,_5b8);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5b9){
return this.getDescendantBindingsByLocalName(_5b9,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5bc){
return BindingFinder.getNextBindingByLocalName(this,_5bc);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5bd){
return BindingFinder.getPreviousBindingByLocalName(this,_5bd);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5be){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5be);
};
Binding.prototype.isFirstBinding=function(_5bf){
return (this.getOrdinalPosition(_5bf)==0);
};
Binding.prototype.isLastBinding=function(_5c0){
return DOMUtil.isLastElement(this.bindingElement,_5c0);
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
Binding.prototype.setCallBackArg=function(_5c2){
this.setProperty(Binding.CALLBACKARG,_5c2);
};
Binding.prototype.dispose=function(_5c3){
if(!this.isDisposed){
if(!_5c3){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5c4=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5c4){
if(Client.isExplorer){
_5c4.outerHTML="";
}else{
_5c4.parentNode.removeChild(_5c4);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5c7){
list.add(_5c7);
});
list.each(function(_5c8){
self.unsubscribe(_5c8);
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
Binding.prototype.wakeUp=function(_5ca,_5cb){
_5cb=_5cb?_5cb:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5ca!==undefined){
self[_5ca]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5cb);
},0);
}
};
Binding.prototype.handleCrawler=function(_5cd){
if(_5cd.response==null&&this.isLazy==true){
if(_5cd.id==DocumentCrawler.ID&&_5cd.mode==DocumentCrawler.MODE_REGISTER){
_5cd.response=NodeCrawler.NORMAL;
}else{
_5cd.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5cd.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5cd.id)){
_5cd.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5cd.response==null){
switch(_5cd.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5cd.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5ce){
var _5cf=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5ce);
return UserInterface.registerBinding(_5cf,Binding);
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
var _5d0=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d0.each(function(_5d1){
DataBinding.expressions[_5d1.Key]=new RegExp(_5d1.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d2){
var _5d3=null;
var _5d4=_5d2.getAncestorBindingByLocalName("field");
if(_5d4&&_5d4 instanceof FieldBinding){
var desc=_5d4.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d3=desc.getLabel();
}
}
return _5d3;
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
var _5d7=this.bindingWindow.DataManager;
_5d7.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5d9=this.bindingWindow.DataManager;
if(_5d9.getDataBinding(name)){
_5d9.unRegisterDataBinding(name);
}
_5d9.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5da,arg){
RootBinding.superclass.handleBroadcast.call(this,_5da,arg);
var _5dc=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5da){
case _5dc:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5dc);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5dd){
var _5de=_5dd?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5dd!=this.isActivated){
this.isActivated=_5dd;
this.dispatchAction(_5de);
var _5df=new List();
var self=this;
this._activationawares.each(function(_5e1){
if(_5e1.isActivationAware){
try{
if(_5dd){
if(!_5e1.isActivated){
_5e1.onActivate();
}
}else{
if(_5e1.isActivated){
_5e1.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5df.add(_5e1);
}
}
});
_5df.each(function(_5e2){
this._activationawares.del(_5e2);
});
_5df.dispose();
}else{
var _5e3="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e3);
}else{
this.logger.error(_5e3);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5e4,_5e5){
if(Interfaces.isImplemented(IActivationAware,_5e4,true)==true){
if(_5e5==false){
this._activationawares.del(_5e4);
}else{
this._activationawares.add(_5e4);
if(this.isActivated==true){
_5e4.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5e4+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5e6){
var _5e7=this.getMigrationParent();
if(_5e7!=null){
var root=_5e7.ownerDocument.body;
var _5e9=UserInterface.getBinding(root);
if(_5e9!=null){
_5e9.makeActivationAware(this,_5e6);
}
}
};
RootBinding.prototype.handleCrawler=function(_5ea){
RootBinding.superclass.handleCrawler.call(this,_5ea);
if(_5ea.type==NodeCrawler.TYPE_ASCENDING){
_5ea.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5eb=null;
if(this.bindingWindow.parent){
_5eb=this.bindingWindow.frameElement;
}
return _5eb;
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
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
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
if(_611!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_611)+"px";
}
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
LabelBinding.DEFAULT_IMAGE="${root}/images/blank.png";
LabelBinding.EXPLORER_IMAGE_FILTER="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${url}',sizingMethod='crop');";
LabelBinding.CLASSNAME_TEXTOVERFLOW="textoverflow";
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
var _61b=this._getBuildElement("labeltext");
if(_61b){
this.shadowTree.labelText=_61b;
this.shadowTree.text=_61b.firstChild;
this.hasLabel=true;
}
}else{
var _61c=this.getProperty("label");
var _61d=this.getProperty("image");
var _61e=this.getProperty("tooltip");
if(_61c){
this.setLabel(_61c,false);
}
if(_61d){
this.setImage(_61d,false);
}
if(_61e){
this.setToolTip(_61e);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_61f,_620){
_61f=_61f!=null?_61f:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_61f);
this.setProperty("label",_61f);
if(!_620){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_622){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_622){
this.buildClassName();
}
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.buildClassName();
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
LabelBinding.prototype.setToolTip=function(_625){
this.setProperty("tooltip",_625);
if(_625!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_625));
}
};
LabelBinding.prototype.getToolTip=function(_626){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_627){
_627=_627==null?true:_627;
var _628=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_627;
if(_627){
this.attachClassName(_628);
}else{
this.detachClassName(_628);
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
if(Client.isMozilla){
}
var _629="textonly";
var _62a="imageonly";
var _62b="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_629);
this.detachClassName(_62a);
this.attachClassName(_62b);
}else{
if(this.hasLabel){
this.detachClassName(_62b);
this.detachClassName(_62a);
this.attachClassName(_629);
}else{
if(this.hasImage){
this.detachClassName(_62b);
this.detachClassName(_629);
this.attachClassName(_62a);
}
}
}
};
LabelBinding.prototype._buildOverflowClassName=function(){
if(Client.isMozilla&&this.isAttached&&this.getLabel()){
if(this.isAttached&&this.shadowTree.labelText){
this.detachClassName(LabelBinding.CLASSNAME_TEXTOVERFLOW);
if(this.shadowTree.labelText.offsetWidth>this.shadowTree.labelBody.offsetWidth){
this.attachClassName(LabelBinding.CLASSNAME_TEXTOVERFLOW);
}
}
}
};
LabelBinding.newInstance=function(_62c){
var _62d=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_62c);
return UserInterface.registerBinding(_62d,LabelBinding);
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
var _62e=this.getProperty("label");
if(!_62e){
_62e=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_62e));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_630){
this.setProperty("label",_630);
};
TextBinding.newInstance=function(_631){
var _632=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_631);
return UserInterface.registerBinding(_632,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_633,_634){
BroadcasterBinding.superclass.setProperty.call(this,_633,_634);
function update(list){
if(list){
list.each(function(_636){
_636.setProperty(_633,_634);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _637=this._observers[_633];
if(_637){
update(_637);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_638){
BroadcasterBinding.superclass.deleteProperty.call(this,_638);
function update(list){
if(list){
list.each(function(_63a){
_63a.deleteProperty(_638);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _63b=this._observers[_638];
if(_63b){
update(_63b);
}
};
BroadcasterBinding.prototype.addObserver=function(_63c,_63d){
_63d=_63d?_63d:"*";
_63d=new List(_63d.split(" "));
while(_63d.hasNext()){
var _63e=_63d.getNext();
switch(_63e){
case "*":
this._setAllProperties(_63c);
break;
default:
var _63f=this.getProperty(_63e);
_63c.setProperty(_63e,_63f);
break;
}
if(!this._observers[_63e]){
this._observers[_63e]=new List();
}
this._observers[_63e].add(_63c);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_640){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _643=att.nodeName;
switch(_643){
case "id":
case "key":
break;
default:
var _644=this.getProperty(_643);
_640.setProperty(_643,_644);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_645,_646){
_646=_646?_646:"*";
_646=new List(_646.split(" "));
while(_646.hasNext()){
var list=this._observers[_646.getNext()];
if(list){
while(list.hasNext()){
var _648=list.getNext();
if(_648==_645){
list.del(_648);
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
BroadcasterBinding.prototype.setDisabled=function(_649){
this.setProperty("isdisabled",_649);
};
BroadcasterBinding.prototype.isDisabled=function(){
return this.getProperty("isdisabled")==true;
};
ButtonBinding.prototype=new MatrixBinding;
ButtonBinding.prototype.constructor=ButtonBinding;
ButtonBinding.superclass=MatrixBinding.prototype;
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
var _64b=this.getProperty("width");
var _64c=this.getProperty("label");
var type=this.getProperty("type");
var _64e=this.getProperty("popup");
var _64f=this.getProperty("tooltip");
var _650=this.getProperty("isdisabled");
var _651=this.getProperty("response");
var _652=this.getProperty("oncommand");
var _653=this.getProperty("value");
var _654=this.getProperty("ischecked");
var _655=this.getProperty("callbackid");
var _656=this.getProperty("focusable");
var _657=this.getProperty("focused");
var _658=this.getProperty("default");
var url=this.getProperty("url");
var _65a=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_65a){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_64c!=null){
this.setLabel(_64c);
}
if(type!=null){
this.setType(type);
}
if(_64f!=null){
this.setToolTip(_64f);
}
if(_64b!=null){
this.setWidth(_64b);
}
if(_64e!=null){
this.setPopup(_64e);
}
if(_651!=null){
this.response=_651;
}
if(_654==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_652!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_652,this);
};
}
if(_656||this.isFocusable){
this._makeFocusable();
if(_658||this.isDefault){
this.isDefault=true;
}
if(_657){
this.focus();
}
}
if(_650==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_655!=null){
this.bindingWindow.DataManager.registerDataBinding(_655,this);
if(_653!=null){
Binding.dotnetify(this,_653);
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
ButtonBinding.prototype.setImage=function(_65b){
if(this.isAttached){
this.labelBinding.setImage(_65b);
}
this.setProperty("image",_65b);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_65c){
if(this.isAttached){
this.labelBinding.setLabel(_65c);
}
this.setProperty("label",_65c);
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
ButtonBinding.prototype.setToolTip=function(_65e){
this.setProperty("tooltip",_65e);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_65e));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_65f){
this.imageProfile=new _65f(this);
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
ButtonBinding.prototype.flip=function(_664){
_664=_664==null?true:_664;
this.isFlipped=_664;
this.setProperty("flip",_664);
if(this.isAttached){
this.labelBinding.flip(_664);
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
ButtonBinding.prototype.check=function(_665){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_665==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_666){
this.isActive=true;
this.isChecked=true;
if(!_666){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_667){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_667==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_668){
this.isActive=false;
this.isChecked=false;
if(!_668){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_669,_66a){
if(_669==null){
_669==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_669){
case true:
this.check(_66a);
break;
case false:
this.uncheck(_66a);
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
var _66c=this.getProperty("tooltip");
if(_66c){
this.setToolTip(_66c);
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
var _66d=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_66d=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _66d;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _66f=this.getEqualSizeWidth();
if(goal>_66f){
var diff=goal-_66f;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _672=null;
if(this.isAttached==true){
var _673=CSSComputer.getPadding(this.bindingElement);
var _674=CSSComputer.getPadding(this.bindingElement);
_672=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_672=_672+_673.left+_673.right;
_672=_672+_674.left+_674.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _672;
};
ButtonBinding.prototype.setWidth=function(_675){
if(this.isAttached==true){
var _676=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _677=CSSComputer.getPadding(this.shadowTree.c);
var _678=_675-_676;
_678=_678-_677.left-_677.right;
this.shadowTree.c.style.width=String(_678)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_678-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_675);
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
ButtonBinding.prototype.setValue=function(_679){
this.shadowTree.dotnetinput.value=_679;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_67a){
this.setValue(_67a);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_67b){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_67b;
this.imageProfile=_67b.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_67c){
var _67d=_67c?"addEventListener":"removeEventListener";
this.binding[_67d](DOMEvents.MOUSEENTER,this);
this.binding[_67d](DOMEvents.MOUSELEAVE,this);
this.binding[_67d](DOMEvents.MOUSEDOWN,this);
this.binding[_67d](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _67f=false,_680=false,_681=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_681=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_681=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_681=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_681=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_681==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67f=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_681=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_681=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_681=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_681=ButtonStateManager.STATE_NORMAL;
var _682=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_682 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_681=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_681==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_680=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_681=ButtonStateManager.STATE_NORMAL;
_67f=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_681=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_681=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_681=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_681=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_681==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67f=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_681=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_681=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_681=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_681=ButtonStateManager.STATE_NORMAL;
_67f=true;
break;
}
}
}
}
}
switch(_681){
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
if(_67f){
this.binding.fireCommand();
}
if(_680){
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
var _686=this.imageProfile.getDisabledImage();
if(_686){
this.binding.setImage(_686);
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
ClickButtonBinding.newInstance=function(_687){
var _688=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_687);
return UserInterface.registerBinding(_688,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_689){
var _68a=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_689);
return UserInterface.registerBinding(_68a,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_68b){
var _68c=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_68b);
return UserInterface.registerBinding(_68c,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_68d){
this._binding=_68d;
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
var _68e=this.getDescendantBindingsByLocalName("control");
_68e.each(function(_68f){
_68f.setControlType(_68f.controlType);
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
ControlGroupBinding.newInstance=function(_691){
var _692=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_691);
return UserInterface.registerBinding(_692,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_695){
ControlBinding.superclass.handleAction.call(this,_695);
switch(_695.type){
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
function ControlImageProfile(_696){
this.binding=_696;
}
ControlImageProfile.prototype._getImage=function(_697){
var _698=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_698=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_698=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_698=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_698=this.constructor.IMAGE_CLOSE;
break;
}
return _698.replace("${string}",_697);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _699=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_699=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _699?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_69a){
ControlBoxBinding.superclass.handleAction.call(this,_69a);
switch(_69a.type){
case ControlBinding.ACTION_COMMAND:
var _69b=_69a.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_69b);
Application.unlock(self);
},0);
_69a.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_69d){
switch(_69d.controlType){
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
ControlBoxBinding.prototype.setState=function(_69e){
var _69f=this.getState();
this.setProperty("state",_69e);
this.detachClassName(_69f);
this.attachClassName(_69e);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6a0=this.getProperty("state");
if(!_6a0){
_6a0=ControlBoxBinding.STATE_NORMAL;
}
return _6a0;
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
MenuContainerBinding.prototype.isOpen=function(_6a1){
var _6a2=null;
if(!_6a1){
_6a2=this._isOpen;
}else{
_6a2=(_6a1==this._openElement);
}
return _6a2;
};
MenuContainerBinding.prototype.setOpenElement=function(_6a3){
if(_6a3){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6a3;
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
var _6a4=this.getChildBindingByLocalName("menupopup");
if(_6a4&&_6a4!=this.menuPopupBinding){
this.menuPopupBinding=_6a4;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6a5=this.getMenuContainerBinding();
_6a5.setOpenElement(this);
var _6a6=this.getMenuPopupBinding();
_6a6.snapTo(this.bindingElement);
_6a6.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6a7){
MenuContainerBinding.superclass.handleAction.call(this,_6a7);
if(_6a7.type==PopupBinding.ACTION_HIDE){
var _6a8=this.getMenuContainerBinding();
_6a8.setOpenElement(false);
this.reset();
_6a7.consume();
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
MenuBarBinding.prototype.handleAction=function(_6a9){
MenuBarBinding.superclass.handleAction.call(this,_6a9);
switch(_6a9.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6aa=_6a9.target;
var _6ab=this.getChildBindingsByLocalName("menu");
while(_6ab.hasNext()){
var menu=_6ab.getNext();
}
switch(_6aa.arrowKey){
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
var _6ad=this.getProperty("image");
var _6ae=this.getProperty("label");
var _6af=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6ae){
this.setLabel(_6ae);
}
if(_6ad){
this.setImage(_6ad);
}
if(_6af){
this.setToolTip(_6af);
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
MenuBinding.prototype.setLabel=function(_6b1){
this.setProperty("label",_6b1);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6b1));
}
};
MenuBinding.prototype.setToolTip=function(_6b2){
this.setProperty("tooltip",_6b2);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6b2));
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
var _6b4=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6b4.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6b4.isOpen()&&!_6b4.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6b4.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6b4.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6b5,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6b5){
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
var self=this;
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6ba){
switch(_6ba.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6bb=null;
var _6bc=true;
self._lastFocused.focus();
self.grabKeyboard();
_6ba.consume();
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
}
};
MenuBodyBinding.prototype.handleFocusedItem=function(_6be){
for(var key in this._focused){
if(key!=_6be.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6be.key]=_6be;
this._lastFocused=_6be;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6c1){
delete this._focused[_6c1.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6c2){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6c2);
}
if(_6c2){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6c5=this.getChildBindingsByLocalName("menugroup");
var _6c6=null;
var _6c7=null;
while(_6c5.hasNext()){
var _6c8=_6c5.getNext();
if(!_6c8.isDefaultContent){
_6c8.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6c6&&_6c8.isVisible){
_6c6=_6c8;
}
if(_6c8.isVisible){
_6c7=_6c8;
}
}
}
if(_6c6&&_6c7){
_6c6.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6c7.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6c9){
MenuBodyBinding.activeInstance=this;
if(_6c9){
var _6ca=this._getMenuItems().getFirst();
if(_6ca){
_6ca.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6cb=this._lastFocused;
if((_6cb!=null)&&(!_6cb.isMenuContainer)){
_6cb.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6cd=this._getMenuItems();
var _6ce=null;
var next=null;
if(this._lastFocused){
_6ce=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6cd.getPreceding(_6ce);
break;
case KeyEventCodes.VK_DOWN:
next=_6cd.getFollowing(_6ce);
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
next=_6cd.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6d1=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6d2){
_6d1=_6d2.getChildBindingsByLocalName("menuitem");
_6d1.each(function(item){
list.add(item);
});
});
_6d1=this.getChildBindingsByLocalName("menuitem");
_6d1.each(function(item){
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
MenuBodyBinding.newInstance=function(_6d5){
var _6d6=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6d5);
return UserInterface.registerBinding(_6d6,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6d7){
switch(_6d7){
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
MenuGroupBinding.newInstance=function(_6d8){
var _6d9=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6d8);
return UserInterface.registerBinding(_6d9,MenuGroupBinding);
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
var _6da=this.getProperty("image");
var _6db=this.getProperty("image-hover");
var _6dc=this.getProperty("image-active");
var _6dd=this.getProperty("image-disabled");
if(!this.image&&_6da){
this.image=_6da;
}
if(!this.imageHover&&_6db){
this.imageHover=_6da;
}
if(!this.imageActive&&_6dc){
this.imageActive=_6dc;
}
if(!this.imageDisabled&&_6dd){
this.imageDisabled=_6dd;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6de=this.getProperty("label");
var _6df=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6e1=this.getProperty("isdisabled");
var _6e2=this.getProperty("image");
var _6e3=this.getProperty("image-hover");
var _6e4=this.getProperty("image-active");
var _6e5=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6e6=this.getMenuPopupBinding();
if(_6e6){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
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
if(this.image||this.imageHover||this.imageActive||this.imageDisabled){
this.imageProfile=new ImageProfile(this);
}
}
if(this.imageProfile){
this.setImage(this.imageProfile.getDefaultImage());
}else{
this.setImage(null);
}
if(_6de!=null){
this.setLabel(_6de);
}
if(_6df){
this.setToolTip(_6df);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6e1==true){
this.disable();
}
var _6e7=this.getProperty("oncommand");
if(_6e7){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6e7);
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
this.labelBinding.setImage(Resolver.resolve(url));
}
};
MenuItemBinding.prototype.setLabel=function(_6ea){
this.setProperty("label",_6ea);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6ea));
}
};
MenuItemBinding.prototype.setToolTip=function(_6eb){
this.setProperty("tooltip",_6eb);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6eb));
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
var _6ed=this.bindingDocument.createElement("div");
_6ed.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6ed.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6ee=this.labelBinding.bindingElement;
_6ee.insertBefore(_6ed,_6ee.firstChild);
_6ed.style.display="none";
this.shadowTree.checkBoxIndicator=_6ed;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6ed=this.bindingDocument.createElement("div");
_6ed.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6ed.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6ee=this.labelBinding.bindingElement;
_6ee.insertBefore(_6ed,_6ee.firstChild);
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
var _6f0=this.imageProfile.getDisabledImage();
if(_6f0){
this.setImage(_6f0);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6f0=this.imageProfile.getDefaultImage();
if(_6f0){
this.setImage(_6f0);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6f2=this.getMenuContainerBinding();
if(_6f2.isOpen()&&!_6f2.isOpen(this)){
_6f2._openElement.hide();
_6f2.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6f2=this.getMenuContainerBinding();
if(!_6f2.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6f4){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6f5=this.getMenuContainerBinding();
if(!_6f5||!_6f5.isOpen(this)||_6f4){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6f6){
this.setChecked(true,_6f6);
};
MenuItemBinding.prototype.uncheck=function(_6f7){
this.setChecked(false,_6f7);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6f8,_6f9){
this.setProperty("ischecked",_6f8);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6f8){
this.isChecked=_6f8;
this.shadowTree.checkBoxIndicator.style.display=_6f8?"block":"none";
if(!_6f9){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6fa){
var _6fb=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6fa);
UserInterface.registerBinding(_6fb,MenuItemBinding);
return UserInterface.getBinding(_6fb);
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
PopupBinding.handleBroadcast=function(_6fc,arg){
switch(_6fc){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _700=PopupBinding.activeInstances.get(key);
var _701=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_700);
if(!_701){
list.add(_700);
}
});
list.each(function(_702){
_702.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _704=PopupBinding.activeInstances.get(key);
_704.hide();
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
var _705=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _706=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_705){
this._bodyBinding=UserInterface.getBinding(_705);
}else{
if(_706){
this._bodyBinding=UserInterface.getBinding(_706);
}else{
if(this.bindingElement.childElementCount>0){
throw new Error(this+": DOM structure invalid.");
}else{
this._bodyBinding=this.add(MenuBodyBinding.newInstance(this.bindingDocument)).attach();
}
}
}
if(Client.hasTransitions){
this.bindingElement.style.opacity="0";
}
};
PopupBinding.prototype.parseDOMProperties=function(){
if(!this.position){
var _707=this.getProperty("position");
this.position=_707?_707:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_708){
var _709=null;
if(this._bodyBinding){
this._bodyBinding.add(_708);
_709=_708;
}else{
_709=PopupBinding.superclass.add.call(this,_708);
}
return _709;
};
PopupBinding.prototype.addFirst=function(_70a){
var _70b=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_70a);
_70b=_70a;
}else{
_70b=PopupBinding.superclass.addFirst.call(this,_70a);
}
return _70b;
};
PopupBinding.prototype.handleAction=function(_70c){
PopupBinding.superclass.handleAction.call(this,_70c);
var _70d=_70c.target;
switch(_70c.type){
case Binding.ACTION_ATTACHED:
if(_70d instanceof MenuItemBinding){
this._count(true);
_70c.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_70d instanceof MenuItemBinding){
this._count(false);
_70c.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_70e){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_70e?1:-1);
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
PopupBinding.prototype.snapTo=function(_70f){
var _710=this._getElementPosition(_70f);
switch(this.position){
case PopupBinding.POSITION_TOP:
_710.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_710.x+=_70f.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_710.y+=_70f.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_710.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_70f;
this.bindingElement.style.display="block";
this.setPosition(_710.x,_710.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_712){
this.bindingElement.style.display="block";
this.setPosition(_712.x,_712.y);
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
PopupBinding.prototype._getElementPosition=function(_717){
return _717.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_717):DOMUtil.getUniversalPosition(_717);
};
PopupBinding.prototype._getMousePosition=function(e){
var _719=DOMEvents.getTarget(e);
return _719.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_71a){
var _71b=this.bindingElement;
if(_71a){
if(Client.hasTransitions){
_71b.style.visibility="visible";
_71b.style.opacity="1";
}else{
_71b.style.visibility="visible";
}
}else{
_71b.style.visibility="hidden";
_71b.style.display="none";
if(Client.hasTransitions){
_71b.style.opacity="0";
}
}
this.isVisible=_71a;
};
PopupBinding.prototype._enableTab=function(_71c){
var self=this;
var _71e=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_71e.each(function(_71f){
_71f.bindingElement.tabIndex=_71c?0:-1;
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
var _727=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_727.y<0){
y=-_727.y;
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
PopupBinding.prototype.grabKeyboard=function(_729){
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
var _72f=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_72f=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _72f;
};
PopupBinding.prototype.clear=function(){
var _730=this._bodyBinding;
if(_730){
_730.detachRecursive();
_730.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_731){
var _732=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_731);
return UserInterface.registerBinding(_732,PopupBinding);
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
PopupBodyBinding.newInstance=function(_734){
var _735=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_734);
return UserInterface.registerBinding(_735,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_736){
return new Point(_736.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_737){
var _738=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_737);
return UserInterface.registerBinding(_738,MenuPopupBinding);
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
var _739=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_739){
this._body=UserInterface.getBinding(_739);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _73a=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_73a.hasNext()){
var _73b=DialogBorderBinding.newInstance(this.bindingDocument);
_73b.setType(_73a.getNext());
this.add(_73b);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _73c=this.getProperty("controls");
if(_73c){
var _73d=new List(_73c.split(" "));
while(_73d.hasNext()){
var type=_73d.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _73f=DialogControlBinding.newInstance(this.bindingDocument);
_73f.setControlType(type);
this._titlebar.addControl(_73f);
this.controlBindings[type]=_73f;
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
var _740=this.getProperty("image");
var _741=this.getProperty("label");
var _742=this.getProperty("draggable");
var _743=this.getProperty("resizable");
var _744=this.getProperty("modal");
if(_740){
this.setImage(_740);
}
if(_741){
this.setLabel(_741);
}
if(_742==false){
this.isDialogDraggable=false;
}
if(_743==false){
this.isPanelResizable=false;
}
if(_744==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_745){
this.isModal=_745;
};
DialogBinding.prototype.setLabel=function(_746){
this.setProperty("label",_746);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_746));
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
DialogBinding.prototype.handleAction=function(_748){
DialogBinding.superclass.handleAction.call(this,_748);
switch(_748.type){
case Binding.ACTION_DRAG:
var _749=_748.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_749.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_749.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_749;
_749.dragger.registerHandler(this);
}
break;
}
}
_748.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_748.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_74a,arg){
DialogBinding.superclass.handleBroadcast.call(this,_74a,arg);
switch(_74a){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_74c){
DialogBinding.superclass.handleInvokedControl.call(this,_74c);
switch(_74c.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_74d){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_74d){
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
doit();
}else{
var _74f=self.bindingElement;
setTimeout(function(){
_74f.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_750){
this.bindingElement.style.zIndex=new String(_750);
};
DialogBinding.prototype.onDragStart=function(_751){
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
DialogBinding.prototype.setResizable=function(_763){
if(this._isResizable!=_763){
if(_763){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_763;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _764=null;
var _765=this.bindingDocument.body.offsetWidth;
var _766=this.bindingDocument.body.offsetHeight;
_764={x:0.125*_765,y:0.125*_766,w:0.75*_765,h:0.5*_766};
return _764;
};
DialogBinding.prototype.centerOnScreen=function(){
var _767=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_767.w-dim.w),0.5*(_767.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _769=this;
var i=0;
function blink(){
if(i%2==0){
_769.detachClassName("active");
}else{
_769.attachClassName("active");
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
var _76d="";
while(list.hasNext()){
var type=list.getNext();
_76d+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_76d);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_76e){
var _76f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_76e);
return UserInterface.registerBinding(_76f,DialogBinding);
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
DialogHeadBinding.newInstance=function(_770){
var _771=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_770);
return UserInterface.registerBinding(_771,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_774){
var _775=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_774);
return UserInterface.registerBinding(_775,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_776){
var _777=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_776);
return UserInterface.registerBinding(_777,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_778){
DialogSetBinding.superclass.handleAction.call(this,_778);
var _779=_778.target;
switch(_778.type){
case Binding.ACTION_MOVETOTOP:
if(_779 instanceof DialogBinding){
this._moveToTop(_779);
}
break;
case Binding.ACTION_MOVEDONTOP:
_778.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_77a){
var _77b=0;
var _77c=this.getChildBindingsByLocalName("dialog");
_77c.each(function(_77d){
var _77e=_77d.getZIndex();
_77b=_77e>_77b?_77e:_77b;
});
_77a.setZIndex(_77b+2);
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
DialogBorderBinding.newInstance=function(_780){
var _781=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_780);
return UserInterface.registerBinding(_781,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_782){
this._dialogBinding=_782;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_784){
DialogCoverBinding.superclass.handleAction.call(this,_784);
var _785=_784.target;
if(this._dialogBinding.isModal){
switch(_784.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_785==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_785.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_786,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_786,arg);
switch(_786){
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
var _789=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_789);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _78a=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_78a);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_78b){
var _78c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_78b);
return UserInterface.registerBinding(_78c,DialogCoverBinding);
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
var _78d=this.getProperty("image");
if(_78d){
this.setImage(_78d);
}
var _78e=this.getProperty("label");
if(_78e){
this.setLabel(_78e);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_78f){
if(this.isAttached){
this.labelBinding.setLabel(_78f);
}
this.setProperty("label",_78f);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_791){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_791);
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
DialogTitleBarBinding.newInstance=function(_792){
var _793=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_792);
return UserInterface.registerBinding(_793,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_794){
var _795=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_794);
return UserInterface.registerBinding(_795,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_796){
var _797=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_796);
return UserInterface.registerBinding(_797,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_798){
this.binding=_798;
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
var _79b=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _79c=node.nodeName.toLowerCase();
switch(_79c){
case "script":
case "style":
case "textarea":
_79b=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _79b;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a3=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a3=false;
}
return _7a3;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7a4,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7a4,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7a8=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7a8+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7ae){
var _7af="";
var _7b0="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b1="</span>";
var self=this;
function iterate(_7b3){
var _7b4=-1;
var _7b5=null;
self._map.each(function(key,exp){
var low=_7b3.toLowerCase();
var _7b9=low.search(exp);
if(_7b9>-1){
if(_7b4==-1){
_7b4=_7b9;
}
if(_7b9<=_7b4){
_7b4=_7b9;
_7b5=key;
}
}
});
if(_7b4>-1&&_7b5!=null){
var pre=_7b3.substring(0,_7b4);
var hit=_7b3.substring(_7b4,_7b4+_7b5.length);
var pst=_7b3.substring(_7b4+_7b5.length,_7b3.length);
_7af+=pre+_7b0+hit+_7b1;
iterate(pst);
}else{
_7af+=_7b3;
}
}
iterate(_7ae);
return _7af;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7bd){
var _7be=new List(_7bd.getElementsByTagName("span"));
_7be.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7bd.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c1){
var _7c2=null;
if(_7c1.isAttached){
var doc=_7c1.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c2=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c2 instanceof SOAPFault){
_7c2=null;
}
}
}
return _7c2;
};
WindowBinding.highlightKeywords=function(_7c6,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7c6.isAttached){
var doc=_7c6.getContentDocument();
if(doc!=null){
var _7c9=WindowBinding._highlightcrawler;
_7c9.reset(doc.body);
if(list!=null){
_7c9.setKeys(list);
_7c9.crawl(doc.body);
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
var _7ca=WindowBinding.superclass.serialize.call(this);
if(_7ca){
_7ca.url=this.getURL();
}
return _7ca;
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
var _7cc=this.getContentWindow().DocumentManager;
if(_7cc!=null){
_7cc.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7cd){
WindowBinding.superclass.handleAction.call(this,_7cd);
var _7ce=_7cd.target;
switch(_7cd.type){
case RootBinding.ACTION_PHASE_3:
if(_7ce.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7ce);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7cd.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7cf){
if(!this.isFit||_7cf){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7d0){
if(this._pageBinding==null){
if(_7d0.bindingWindow==this.getContentWindow()){
this._pageBinding=_7d0;
}
}
};
WindowBinding.prototype.buildDOMContent=function(){
this.shadowTree.iframe=DOMUtil.createElementNS(Constants.NS_XHTML,"iframe",this.bindingDocument);
this.shadowTree.iframe.setAttribute("frameborder","0");
this.shadowTree.iframe.frameBorder=0;
this.bindingElement.appendChild(this.shadowTree.iframe);
this._registerOnloadListener(true);
};
WindowBinding.prototype._registerOnloadListener=function(_7d1){
var _7d2=this.shadowTree.iframe;
var _7d3=_7d1?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7d6=true;
if(Client.isExplorer){
_7d6=_7d2.readyState=="complete";
}
if(_7d6==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d3](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7d7){
var _7d8=_7d7?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7d8](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
}
}
}
};
WindowBinding.prototype.setURL=function(url){
this.setProperty("url",url);
this._hasLoadActionFired=false;
if(this.isAttached==true){
this._disposeContentDocument();
this.getFrameElement().src=Resolver.resolve(url);
}
};
WindowBinding.prototype.getURL=function(){
var _7dc=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7dc=url;
}
return _7dc;
};
WindowBinding.prototype.reload=function(_7de){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7df=null;
if(this.shadowTree.iframe!=null){
_7df=this.shadowTree.iframe;
}
return _7df;
};
WindowBinding.prototype.getContentWindow=function(){
var _7e0=null,_7e1=this.getFrameElement();
if(_7e1!==null){
try{
_7e0=_7e1.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7e0;
};
WindowBinding.prototype.getContentDocument=function(){
var _7e2=null,win=this.getContentWindow();
if(win){
_7e2=win.document;
}
return _7e2;
};
WindowBinding.prototype.getRootBinding=function(){
var _7e4=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7e4=UserInterface.getBinding(doc.body);
}
return _7e4;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7e6){
this.bindingElement.style.height=_7e6+"px";
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
WindowBinding.prototype.handleCrawler=function(_7e7){
WindowBinding.superclass.handleCrawler.call(this,_7e7);
if(_7e7.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7e7.nextNode=root.bindingElement;
}else{
_7e7.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7ec){
var _7ed=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7ec);
var _7ee=UserInterface.registerBinding(_7ed,WindowBinding);
return _7ee;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f2){
_7f2.target.show();
_7f2.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f4){
_7f4.target.show();
_7f4.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7f6){
PreviewWindowBinding.superclass.handleAction.call(this,_7f6);
switch(_7f6.type){
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
var _7f7=null;
this._getRadioButtonBindings().each(function(_7f8){
if(_7f8.getProperty("ischecked")){
_7f7=_7f8;
return false;
}else{
return true;
}
});
if(_7f7){
this._checkedRadioBinding=_7f7;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7f9){
RadioGroupBinding.superclass.handleAction.call(this,_7f9);
var _7fa=_7f9.target;
switch(_7f9.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7f9.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7fa.isRadioButton&&!_7fa.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7fa);
}
this._checkedRadioBinding=_7fa;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7f9.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7fb,_7fc){
if(_7fb instanceof RadioDataBinding){
_7fb=_7fb.getButton();
}
if(_7fb.isRadioButton){
switch(_7fc){
case true:
this._unCheckRadioBindingsExcept(_7fb);
this._checkedRadioBinding=_7fb;
_7fb.check(true);
break;
default:
_7fb.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7fd){
var _7fe=this._getRadioButtonBindings();
_7fe.each(function(_7ff){
if(_7ff.isChecked&&_7ff!=_7fd){
_7ff.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _800=new Crawler();
var list=new List();
_800.addFilter(function(_802){
var _803=true;
var _804=UserInterface.getBinding(_802);
if(_804 instanceof RadioGroupBinding){
_803=NodeCrawler.SKIP_CHILDREN;
}else{
if(_804 instanceof ButtonBinding&&_804.isRadioButton){
list.add(_804);
}
}
return _803;
});
_800.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_805){
var _806=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_805);
return UserInterface.registerBinding(_806,RadioGroupBinding);
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
if(Client.isExplorer&&this.isFocused){
this.unsubscribe(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,this);
}
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
var _808=this.getProperty("regexrule");
if(_808!=null){
this.expression=new RegExp(_808);
}
var _809=this.getProperty("onbindingblur");
if(_809!=null){
this.onblur=function(){
Binding.evaluate(_809,this);
};
}
var _80a=this.getProperty("onvaluechange");
if(_80a!=null){
this.onValueChange=function(){
Binding.evaluate(_80a,this);
};
}
if(this.error==null&&this.type!=null){
var _80b=DataBinding.errors[this.type];
if(_80b!=null){
this.error=_80b;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _80c=this.getProperty("value");
if(_80c!=null){
this.setValue(String(_80c));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _80e=this.getProperty("isdisabled");
if(_80e==true){
this.setDisabled(true);
}
var _80f=this.getProperty("readonly");
if(_80f==true){
this.setReadOnly(true);
}
var _810=this.getProperty("autoselect");
if(_810==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _811=Localization.currentLang();
if(_811!=null){
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
var _812=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_812.type=this.isPassword==true?"password":"text";
_812.tabIndex=-1;
return _812;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_815){
if(_815){
this.focus(true);
this.bindingWindow.standardEventHandler.enableNativeKeys();
if(Client.isExplorer==true){
var self=this;
setTimeout(function(){
if(Binding.exists(self)==true){
self.subscribe(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
},0);
}
}else{
this.blur(true);
this.bindingWindow.standardEventHandler.disableNativeKeys();
if(Client.isExplorer==true){
this.unsubscribe(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
}
};
DataInputBinding.prototype._handleEnterKey=function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
EventBroadcaster.broadcast(BroadcastMessages.KEY_ENTER);
};
DataInputBinding.prototype.handleBroadcast=function(_818,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_818,arg);
var self=this;
switch(_818){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _81b=DOMEvents.getTarget(arg);
if(_81b!=this.shadowTree.input){
setTimeout(function(){
if(Binding.exists(self)==true){
if(self.isFocused==true){
self.blur();
}
}
},100);
}
}
break;
}
};
DataInputBinding.prototype.focus=function(_81c){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_81c){
var self=this,_81e=this.bindingElement,_81f={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_81e,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_81e,DOMEvents.MOUSEUP,_81f);
}else{
this.select();
}
}
this.onfocus();
if(!_81c){
var _820=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_820);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _821=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _822=_821.createTextRange();
_822.moveStart("character",0);
_822.moveEnd("character",_821.value.length);
_822.select();
}else{
_821.setSelectionRange(0,_821.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_823){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_823){
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
DataInputBinding.prototype.validate=function(_827){
if(_827==true||this._isValid){
var _828=this.isValid();
if(_828!=this._isValid){
this._isValid=_828;
if(!_828){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _829=null;
if(this._isInvalidBecauseRequired==true){
_829=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_829=DataBinding.warnings["minlength"];
_829=_829.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_829=DataBinding.warnings["maxlength"];
_829=_829.replace("${count}",String(this.maxlength));
}else{
_829=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_829!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_829);
}
}else{
this.setValue(_829);
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
if(this._timeout!=null){
top.window.clearTimeout(this._timeout);
}
if(this.hasClassName(DataBinding.CLASSNAME_INVALID)){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}
this.shadowTree.input.className="";
this.dispatchAction(Binding.ACTION_VALID);
}
};
DataInputBinding.prototype.isValid=function(){
var _82a=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _82b=this.getValue();
if(_82b==""){
if(this.isRequired==true){
_82a=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _82c=DataBinding.expressions[this.type];
if(!_82c.test(_82b)){
_82a=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_82b)){
_82a=false;
}
}
}
}
if(_82a&&this.minlength!=null){
if(_82b.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_82a=false;
}
}
if(_82a&&this.maxlength!=null){
if(_82b.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_82a=false;
}
}
return _82a;
};
DataInputBinding.prototype.setDisabled=function(_82d){
if(_82d!=this.isDisabled){
if(_82d){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _82e=this.shadowTree.input;
if(_82d){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_82e,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_82e,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_82d;
this.shadowTree.input.unselectable=_82d?"on":"off";
}
this.isDisabled=_82d;
this.isFocusable=!_82d;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_830){
if(_830!=this.isReadOnly){
if(_830){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_830;
this.isReadOnly=_830;
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
DataInputBinding.prototype.handleElement=function(_831){
return true;
};
DataInputBinding.prototype.updateElement=function(_832){
var _833=_832.getAttribute("value");
var _834=_832.getAttribute("type");
var _835=_832.getAttribute("maxlength");
var _836=_832.getAttribute("minlength");
if(_833==null){
_833="";
}
var _837=this.bindingWindow.UpdateManager;
if(this.getValue()!=_833){
_837.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_833);
}
if(this.type!=_834){
_837.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_834;
}
if(this.maxlength!=_835){
_837.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_835;
}
if(this.minlength!=_836){
_837.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_836;
}
return true;
};
DataInputBinding.prototype.manifest=function(){
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
DataInputBinding.prototype.setValue=function(_838){
if(_838===null){
_838="";
}
if(_838!=this.getValue()){
this.setProperty("value",_838);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_838);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _839=null;
if(this.shadowTree.input!=null){
_839=this.shadowTree.input.value;
}else{
_839=this.getProperty("value");
}
return _839;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _83b=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_83b=Number(_83b);
break;
}
return _83b;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_83c){
var _83d=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_83c);
return UserInterface.registerBinding(_83d,DataInputBinding);
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
var _83e=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_83e!=null){
this.setValue(_83e.value);
_83e.parentNode.removeChild(_83e);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _83f=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_83f.tabIndex=-1;
return _83f;
};
TextBoxBinding.prototype.handleElement=function(_840){
return true;
};
TextBoxBinding.prototype.updateElement=function(_841){
var _842,area=_841.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_842=DOMUtil.getTextContent(area);
}
if(_842==null){
_842="";
}
var _844=this.bindingWindow.UpdateManager;
if(this.getValue()!=_842){
_844.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_842);
}
var _845=_841.getAttribute("type");
if(this.type!=_845){
_844.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_845;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_849){
var _84a=this.bindingDocument.selection.createRange();
var _84b=_84a.text=="";
if(_84b&&!_849){
_84a.text="\t";
}else{
var text="";
var _84d=_84a.text.length;
while((_84a.moveStart("word",-1)&&_84a.text.charAt(1)!="\n")){
}
_84a.moveStart("character",1);
var _84e=0;
var i=0,line,_851=_84a.text.split("\n");
while((line=_851[i++])!=null){
if(_849){
line=line.replace(/^(\s)/mg,"");
_84e++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_851[i+1]?"\n":"");
}
_84a.text=text;
_84a.moveStart("character",-_84d);
if(_849){
_84a.moveStart("character",2*_851.length-2);
}
_84a.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _852=this.bindingDocument.selection.createRange();
var _853=_852.duplicate();
while((_853.moveStart("word",-1)&&_853.text.indexOf("\n")==-1)){
}
_853.moveStart("character",1);
_852.text="\n"+_853.text.match(/^(\s)*/)[0]+"!";
_852.moveStart("character",-1);
_852.select();
_852.text="";
_852.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_854){
var _855;
var _856;
var oss;
var osy;
var i;
var fnd;
var _85b=this._getSelectedText();
var el=this.shadowTree.input;
_855=el.scrollLeft;
_856=el.scrollTop;
if(!_85b.match(/\n/)){
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
_85b=this._getSelectedText();
if(_854){
ntext=_85b.replace(/^(\s)/mg,"");
}else{
ntext=_85b.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_85b.length);
}
el.scrollLeft=_855;
el.scrollTop=_856;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _85d;
var _85e;
var oss;
var osy;
var el=this.shadowTree.input;
_85d=el.scrollLeft;
_85e=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_85d;
el.scrollTop=_85e;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _865=this.shadowTree.input.value;
var _866=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _865.substr(_866,end-_866);
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
var _868=this.getProperty("isdisabled");
if(this.isDisabled||_868){
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
var _86a=this.getProperty("label");
var _86b=this.getProperty("value");
var _86c=this.getProperty("width");
var _86d=this.getProperty("onchange");
var _86e=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_86a!=null){
this.label=_86a;
}
if(!this.value&&_86b!=null){
this.value=_86b;
}
if(!this.width&&_86c){
this.width=_86c;
}
if(_86e){
this.isRequired=true;
}
if(_86d){
this.onValueChange=function(){
Binding.evaluate(_86d,this);
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
var _86f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_86f.name=this.getName();
_86f.value=this.getValue();
_86f.type="hidden";
if(this.hasCallBackID()){
_86f.id=this.getCallBackID();
}
this.shadowTree.input=_86f;
this.bindingElement.appendChild(_86f);
};
SelectorBinding.prototype.buildButton=function(){
var _870=this.BUTTON_IMPLEMENTATION;
var _871=this.add(_870.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_871.imageProfile=this.imageProfile;
}
if(this.width!=null){
_871.setWidth(this.width);
}
this._buttonBinding=_871;
this.shadowTree.button=_871;
_871.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _873=top.app.bindingMap.selectorpopupset;
var doc=_873.bindingDocument;
var _875=_873.add(PopupBinding.newInstance(doc));
var _876=_875.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_875;
this._menuBodyBinding=_876;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_875.attachClassName("selectorpopup");
_875.addActionListener(PopupBinding.ACTION_SHOW,this);
_875.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_875.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_875);
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
var _879=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_879).each(function(_87a){
var _87b=_87a.getAttribute("label");
var _87c=_87a.getAttribute("value");
var _87d=_87a.getAttribute("selected");
var _87e=_87a.getAttribute("image");
var _87f=_87a.getAttribute("image-hover");
var _880=_87a.getAttribute("image-active");
var _881=_87a.getAttribute("image-disabled");
var _882=null;
if(_87e||_87f||_880||_881){
_882=new ImageProfile({image:_87e,imageHover:_87f,imageActive:_880,imageDisabled:_881});
}
list.add(new SelectorBindingSelection(_87b?_87b:null,_87c?_87c:null,_87d&&_87d=="true",_882));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _884=null;
while(list.hasNext()){
var _885=list.getNext();
var item=this.addSelection(_885);
if(_885.isSelected){
this.select(item,true);
}
if(!_884){
_884=item;
}
}
if(!this._selectedItemBinding){
this.select(_884,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_887,_888){
var _889=this.MENUITEM_IMPLEMENTATION;
var _88a=this._menuBodyBinding;
var _88b=_88a.bindingDocument;
var _88c=_889.newInstance(_88b);
_88c.imageProfile=_887.imageProfile;
_88c.setLabel(_887.label);
if(_887.tooltip!=null){
_88c.setToolTip(_887.tooltip);
}
_88c.selectionValue=_887.value;
_887.menuItemBinding=_88c;
if(_888){
_88a.addFirst(_88c);
this.selections.addFirst(_887);
}else{
_88a.add(_88c);
this.selections.add(_887);
}
this._isUpToDate=false;
return _88c;
};
SelectorBinding.prototype.addSelectionFirst=function(_88d){
return this.addSelection(_88d,true);
};
SelectorBinding.prototype.clear=function(_88e){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_88e&&this.defaultSelection!=null){
var _88f=this.addSelection(this.defaultSelection);
this.select(_88f,true);
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
SelectorBinding.prototype.setDisabled=function(_890){
if(this.isAttached==true){
var _891=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_890?"none":"block";
_891.setDisabled(_890);
}
if(_890){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_892){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_892);
}
};
SelectorBinding.prototype.handleAction=function(_893){
SelectorBinding.superclass.handleAction.call(this,_893);
switch(_893.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_893.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_893.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_893.target);
_893.consume();
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
_893.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_895){
this.select(_895);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _896=this._buttonBinding.bindingElement.offsetWidth+"px";
var _897=this._popupBinding.bindingElement;
_897.style.minWidth=_896;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _899=Client.isExplorer?e.keyCode:e.which;
if(_899==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _899=Client.isExplorer?e.keyCode:e.which;
if(_899>=32){
this._buttonBinding.check();
var _89a=String.fromCharCode(_899);
this._pushSearchSelection(_89a);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_89b){
this._searchString+=_89b.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_89c){
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
var _89d=this._menuBodyBinding;
if(_89d!=null){
var _89e=this.MENUITEM_IMPLEMENTATION;
var _89f=_89d.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8a1=list.getNext();
if(_8a1.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8a1);
}
}
}
this._attachSelections();
var _8a2=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8a3=_89d.getDescendantBindingsByType(_89e);
if(_8a3.hasEntries()){
while(_8a3.hasNext()){
var _8a4=_8a3.getNext();
var _8a5=_8a4.labelBinding;
if(_8a5!=null&&_8a5.shadowTree!=null&&_8a5.shadowTree.labelText!=null){
_8a5.shadowTree.labelText.innerHTML=_8a5.shadowTree.labelText.innerHTML.replace(_8a2,"<b>$&</b>");
}
}
_8a3.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8a5=LabelBinding.newInstance(_89f);
_8a5.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_89d.add(_8a5);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8a1=list.getNext();
var item=this.addSelection(_8a1);
if(this._selectionValue==_8a1.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8a7,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8a7,arg);
switch(_8a7){
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
SelectorBinding.prototype.select=function(_8aa,_8ab){
var _8ac=false;
if(_8aa!=this._selectedItemBinding){
this._selectedItemBinding=_8aa;
_8ac=true;
var _8ad=this._buttonBinding;
this._selectionValue=_8aa.selectionValue;
this._selectionLabel=_8aa.getLabel();
_8ad.setLabel(_8aa.getLabel());
if(_8aa.imageProfile!=null){
_8ad.imageProfile=_8aa.imageProfile;
}
if(_8ad.imageProfile!=null){
_8ad.setImage(this.isDisabled==true?_8ad.imageProfile.getDisabledImage():_8ad.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8ab){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8ab)){
this.validate();
}
}
return _8ac;
};
SelectorBinding.prototype._relate=function(){
var _8ae=this.getProperty("relate");
if(_8ae){
var _8af=this.bindingDocument.getElementById(_8ae);
if(_8af){
var _8b0=UserInterface.getBinding(_8af);
if(_8b0){
if(this.isChecked){
_8b0.show();
}else{
_8b0.hide();
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
SelectorBinding.prototype.selectByValue=function(_8b1,_8b2){
var _8b3=false;
var _8b4=this._menuBodyBinding;
var _8b5=_8b4.getDescendantElementsByLocalName("menuitem");
while(_8b5.hasNext()){
var _8b6=UserInterface.getBinding(_8b5.getNext());
if(_8b6.selectionValue==_8b1){
_8b3=this.select(_8b6,_8b2);
break;
}
}
return _8b3;
};
SelectorBinding.prototype.getValue=function(){
var _8b7=this._selectionValue;
if(_8b7!=null){
_8b7=String(_8b7);
}
return _8b7;
};
SelectorBinding.prototype.setValue=function(_8b8){
this.selectByValue(String(_8b8),true);
};
SelectorBinding.prototype.getResult=function(){
var _8b9=this._selectionValue;
if(_8b9=="null"){
_8b9=null;
}
if(_8b9){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8b9=Number(_8b9);
break;
}
}
return _8b9;
};
SelectorBinding.prototype.setResult=function(_8ba){
this.selectByValue(_8ba,true);
};
SelectorBinding.prototype.validate=function(){
var _8bb=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8bc=this.getValue();
if(_8bc==this.defaultSelection.value){
_8bb=false;
}
if(_8bb!=this._isValid){
if(_8bb){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8bb;
}
return _8bb;
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
var _8bd=this._popupBinding;
if(!this._isUpToDate){
_8bd.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8be,_8bf){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8be));
return true;
};
SelectorBinding.newInstance=function(_8c0){
var _8c1=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8c0);
return UserInterface.registerBinding(_8c1,SelectorBinding);
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
var _8c4=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8c4){
this.onValueChange=function(){
Binding.evaluate(_8c4,this);
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
SimpleSelectorBinding.prototype.focus=function(_8c7){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8c7){
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
SimpleSelectorBinding.prototype._hack=function(_8c8){
if(Client.isExplorer){
this._select.style.width=_8c8?"auto":this._cachewidth+"px";
if(_8c8){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8c9=true;
if(this.isRequired){
if(this.getValue()==null){
_8c9=false;
}
}
if(_8c9!=this._isValid){
if(_8c9){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8ca=this._select;
var _8cb=_8ca.options[_8ca.selectedIndex];
var text=DOMUtil.getTextContent(_8cb);
_8ca.blur();
_8ca.style.color="#A40000";
_8ca.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8cb,DataBinding.warnings["required"]);
}
_8ca.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8cb,text);
}
};
}
this._isValid=_8c9;
}
return _8c9;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8cd=null;
var _8ce=this._select;
var _8cf=_8ce.options[_8ce.selectedIndex];
var _8d0=true;
if(Client.isExplorer){
var html=_8cf.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8d0=false;
}
}
if(_8d0){
_8cd=_8cf.getAttribute("value");
}
return _8cd;
};
SimpleSelectorBinding.prototype.setValue=function(_8d2){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8d3){
this.setValue(_8d3);
};
SimpleSelectorBinding.newInstance=function(_8d4){
var _8d5=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8d4);
return UserInterface.registerBinding(_8d5,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8d6,_8d7,_8d8,_8d9,_8da){
this._init(_8d6,_8d7,_8d8,_8d9,_8da);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8db,_8dc,_8dd,_8de,_8df){
if(_8db!=null){
this.label=String(_8db);
}
if(_8dc!=null){
this.value=String(_8dc);
}
if(_8de!=null){
this.imageProfile=_8de;
}
if(_8df!=null){
this.tooltip=_8df;
}
this.isSelected=_8dd?true:false;
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
var _8e0=this.getProperty("image");
if(_8e0){
this.setImage(_8e0);
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
var _8e3=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8e3.popupBindingTargetElement=this.shadowTree.input;
_8e3.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8e3.attach();
var self=this;
_8e3.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8e3;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8e6=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8e6).each(function(_8e7){
if(_8e7.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8e8=_8e7.getAttribute("value");
var _8e9=_8e7.getAttribute("selected");
var _8ea=_8e7.getAttribute("tooltip");
list.add({value:_8e8?_8e8:null,toolTip:_8ea?_8ea:null,isSelected:(_8e9&&_8e9=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8ec=this._menuBodyBinding;
var _8ed=_8ec.bindingDocument;
while(_8ec.bindingElement.hasChildNodes()){
var node=_8ec.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8ec.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8ef=this.getProperty("emptyentrylabel");
if(_8ef){
var _8f0=MenuItemBinding.newInstance(_8ed);
_8f0.setLabel(_8ef);
_8f0.selectionValue="";
_8ec.add(_8f0);
}
while(list.hasNext()){
var _8f1=list.getNext();
var _8f0=MenuItemBinding.newInstance(_8ed);
_8f0.setLabel(_8f1.label?_8f1.label:_8f1.value);
_8f0.selectionValue=_8f1.value;
if(_8f1.image){
_8f0.setImage(_8f1.image);
}
if(_8f1.toolTip){
_8f0.setToolTip(_8f1.toolTip);
}
if(_8f1.isSelected){
this.select(_8f0,true);
}
_8ec.add(_8f0);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8f2){
this.select(_8f2);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8f3,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8f3,arg);
switch(_8f3){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8f3,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8f5){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8f5);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8f6){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8f6);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8f7=this.bindingElement.offsetWidth+"px";
var _8f8=this._popupBinding.bindingElement;
_8f8.style.minWidth=_8f7;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8f9=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8fa=this.getValue();
var _8fb=null;
_8f9.each(function(item){
if(item.getLabel()==_8fa){
_8fb=item;
}
});
if(_8fb){
_8fb.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8fe){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8fe){
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
DataInputSelectorBinding.prototype.setValue=function(_8ff){
var _900=this.isReadOnly;
var _901=null;
if(_8ff!=null&&_8ff!=""){
var _902=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_902.hasNext()){
var item=_902.getNext();
if(item.selectionValue==_8ff){
_901=item.getLabel();
break;
}
}
}
if(_901!=null){
this.value=_8ff;
this.shadowTree.input.value=_901;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_8ff);
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
var _905="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_905);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_905);
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
var _907=ToolBarButtonBinding.newInstance(this.bindingDocument);
_907.setImage("${icon:popup}");
this.addFirst(_907);
_907.attach();
var self=this;
_907.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _909=self.getProperty("handle");
var _90a=ViewDefinition.clone(_909,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_90a instanceof DialogViewDefinition){
_90a.handler={handleDialogResponse:function(_90b,_90c){
self._isButtonClicked=false;
if(_90b==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _90d=_90c.getFirst();
self.setValue(_90d);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_90a.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_90a);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_907.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_907;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _90f=this._dialogButtonBinding;
if(_90f!=null){
_90f.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _911=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_911=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _911;
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
var _914=ToolBarButtonBinding.newInstance(this.bindingDocument);
_914.setImage("${icon:editor-sourceview}");
_914.bindingElement.style.left="-24px";
_914.bindingElement.style.width="24px";
this.addFirst(_914);
_914.attach();
_914.hide();
var self=this;
_914.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_914;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_915){
UrlInputDialogBinding.superclass.setValue.call(this,_915);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_915);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _916=TreeService.GetCompositeUrlLabel(_915);
if(_916!=_915){
this.setLabel(_916);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_917){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_917;
};
UrlInputDialogBinding.prototype.clearLabel=function(){
this.setReadOnly(false);
this.editButtonBinding.hide();
this.shadowTree.input.style.display="block";
this.shadowTree.labelInput.style.display="none";
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
var _918=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _919=this.getProperty("image");
if(_919!=null){
_918.setImage(_919);
}else{
_918.setImage("${icon:popup}");
}
this.addFirst(_918);
_918.attach();
var self=this;
_918.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_918;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _91b=this._dialogButtonBinding;
if(_91b!=null){
_91b.oncommand();
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
DataDialogBinding.prototype.onBindingAttach=function(){
DataDialogBinding.superclass.onBindingAttach.call(this);
Binding.imageProfile(this);
this._buildButton();
if(this.getProperty("handle")!=null||this.getProperty("url")){
this._buildIndicator();
}
this.bindingElement.tabIndex=0;
if(Client.isExplorer){
this.bindingElement.hideFocus=true;
}
};
DataDialogBinding.prototype._buildButton=function(){
var _91c=this.getProperty("label");
var _91d=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_91c!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_91c+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_91c);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_91d!=null){
this._buttonBinding.setToolTip(_91d);
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
DataDialogBinding.prototype.handleAction=function(_91f){
DataDialogBinding.superclass.handleAction.call(this,_91f);
var _920=_91f.target;
var self=this;
switch(_91f.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_922,_923){
if(_922==Dialog.RESPONSE_ACCEPT){
if(_923 instanceof DataBindingMap){
self._map=_923;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_920==this._buttonBinding){
_91f.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_924,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_924,arg);
switch(_924){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _927=this.getProperty("handle");
var url=this.getURL();
var _929=null;
if(_927!=null||def!=null){
if(def!=null){
_929=def;
}else{
_929=ViewDefinitions[_927];
}
if(_929 instanceof DialogViewDefinition){
_929.handler=this._handler;
if(this._map!=null){
_929.argument=this._map;
}
StageBinding.presentViewDefinition(_929);
}
}else{
if(url!=null){
_929=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_929!=null){
this._dialogViewHandle=_929.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_92a){
this.setProperty("label",_92a);
if(this.isAttached){
this._buttonBinding.setLabel(_92a+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_92b){
this.setProperty("image",_92b);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_92b);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_92c){
this.setProperty("tooltip",_92c);
if(this.isAttached){
this._buttonBinding.setToolTip(_92c);
}
};
DataDialogBinding.prototype.setHandle=function(_92d){
this.setProperty("handle",_92d);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_92f){
this._handler=_92f;
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
return true;
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
DataDialogBinding.newInstance=function(_931){
var _932=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_931);
return UserInterface.registerBinding(_932,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_934,_935){
if(_934==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_935);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_936){
_936=new String(_936);
this.dirty();
this.setValue(encodeURIComponent(_936));
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
var _93a=this.getValue();
if(_93a==null){
_93a="";
}
this.shadowTree.dotnetinput.value=_93a;
};
PostBackDataDialogBinding.prototype.setValue=function(_93b){
this.setProperty("value",_93b);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_93c){
};
PostBackDataDialogBinding.newInstance=function(_93d){
var _93e=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_93d);
return UserInterface.registerBinding(_93e,PostBackDataDialogBinding);
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
var _93f=this.getProperty("dialoglabel");
var _940=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _942=this.getProperty("handle");
var _943=this.getProperty("selectedtoken");
if(_942!=null){
var def=ViewDefinition.clone(_942,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_93f!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_93f;
}
if(_940!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_940;
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
if(_943!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_943;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_945){
var _946=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_945);
return UserInterface.registerBinding(_946,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_948){
self._datathing.setValue(_948);
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
var _94b=self.getValue();
if(_94b==""||_94b==null){
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
var _94c=this.getProperty("value");
var _94d=this.getProperty("selectorlabel");
if(_94d==null){
_94d=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_94c==null));
list.add(new SelectorBindingSelection(_94d+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_94c!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _94c=this.getValue();
if(_94c==""||_94c==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_94f){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_94f);
switch(_94f.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_94f.target==this._datathing){
var _950=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_950){
self._selector.setLabel(_950);
}
},500);
_94f.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_952){
this.setProperty("label",_952);
if(this._selector!=null){
this._selector.setLabel(_952);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_953){
this._datathing.setValue(_953);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_955,_956){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_955,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_957){
this._buttonBinding.setLabel(_957);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_958){
this._buttonBinding.setToolTip(_958);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_959){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_959);
switch(_959.type){
case MenuItemBinding.ACTION_COMMAND:
var _95a=_959.target;
var _95b=this.master;
if(_95a.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_95a.getLabel());
setTimeout(function(){
_95b.action();
},0);
}else{
if(_95b.getValue()){
_95b.dirty();
}
_95b.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_95c){
var _95d=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_95c);
return UserInterface.registerBinding(_95d,NullPostBackDataDialogSelectorBinding);
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
var _95e=this._dataDialogBinding;
if(_95e!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_95e.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _95f=this.getProperty("editable");
var _960=this.getProperty("selectable");
var _961=this.getProperty("display");
if(_95f!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_960){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_961){
this._display=_961;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _962=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_962.selections=this.selections;
this.add(_962);
_962.attach();
this._dataDialogBinding=_962;
this.shadowTree.datadialog=_962;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _964=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _965=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_964=_965.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_964=_965.isSelected!=true;
break;
}
if(_964){
this.shadowTree.box.appendChild(this._getElementForSelection(_965));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_967){
var box=this.shadowTree.box;
var _969=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _96a=list.getNext();
if(_967){
_96a.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_969=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_969=_96a.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_969=_96a.isSelected!=true;
break;
}
}
if(_969){
var _96b=this._getElementForSelection(_96a);
box.insertBefore(_96b,box.firstChild);
CSSUtil.attachClassName(_96b,"selected");
this._selectionMap.set(_96a.value,_96b);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_96c){
var _96d=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_96d.appendChild(this.bindingDocument.createTextNode(_96c.label));
_96d.setAttribute("label",_96c.label);
_96d.setAttribute("value",_96c.value);
return _96d;
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
var _96f=DOMEvents.getTarget(e);
var _970=DOMUtil.getLocalName(_96f);
if(_970=="div"){
this._handleMouseDown(_96f);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_971){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _972=this._getElements();
var _973=_971.getAttribute("value");
var _974=this._lastSelectedElement.getAttribute("value");
var _975=false;
while(_972.hasNext()){
var el=_972.getNext();
switch(el.getAttribute("value")){
case _973:
case _974:
_975=!_975;
break;
}
if(_975){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_971);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_971)){
this._unhilite(_971);
}else{
this._hilite(_971);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_971){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_971;
};
MultiSelectorBinding.prototype._hilite=function(_979){
var _97a=_979.getAttribute("value");
if(!this._selectionMap.has(_97a)){
CSSUtil.attachClassName(_979,"selected");
this._selectionMap.set(_97a,_979);
}
};
MultiSelectorBinding.prototype._unhilite=function(_97b){
var _97c=_97b.getAttribute("value");
if(this._selectionMap.has(_97c)){
CSSUtil.detachClassName(_97b,"selected");
this._selectionMap.del(_97c);
}
};
MultiSelectorBinding.prototype._isHilited=function(_97d){
return CSSUtil.hasClassName(_97d,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_97e){
MultiSelectorBinding.superclass.handleAction.call(this,_97e);
var _97f=_97e.target;
switch(_97e.type){
case DataDialogBinding.ACTION_COMMAND:
if(_97f==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_97e.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_97f.result);
this.dirty();
_97f.result=null;
_97e.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _980=null;
if(this.isSelectable){
_980=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_982){
if(self._isHilited(_982)){
_982.parentNode.removeChild(_982);
_980.add(new SelectorBindingSelection(_982.getAttribute("label"),_982.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _980;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _984=this._getElements();
if(!isUp){
_984.reverse();
}
var _985=true;
while(_985&&_984.hasNext()){
var _986=_984.getNext();
if(this._isHilited(_986)){
switch(isUp){
case true:
if(_986.previousSibling){
_986.parentNode.insertBefore(_986,_986.previousSibling);
}else{
_985=false;
}
break;
case false:
if(_986.nextSibling){
_986.parentNode.insertBefore(_986,_986.nextSibling.nextSibling);
}else{
_985=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _987=new List();
var _988=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_98a){
var _98b=new SelectorBindingSelection(_98a.getAttribute("label"),_98a.getAttribute("value"),_988);
_98b.isHighlighted=self._isHilited(_98a);
_987.add(_98b);
});
return _987;
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
var _98c=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_98c.hasEntries()){
_98c.each(function(_98d){
_98d.parentNode.removeChild(_98d);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _98e=this.selections.getNext();
if(_98e.isSelected){
var _98f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_98f.name=this._name;
_98f.value=_98e.value;
this.bindingElement.appendChild(_98f);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_990){
alert(_990);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_991){
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
var _992={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _993=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_993.handler=this._handler;
_993.argument=_992;
StageBinding.presentViewDefinition(_993);
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
var _994={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _996={handleDialogResponse:function(_997,_998){
if(_997==Dialog.RESPONSE_ACCEPT){
self.result=_998;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _999=ViewDefinitions[this._dialogViewHandle];
_999.handler=_996;
_999.argument=_994;
StageBinding.presentViewDefinition(_999);
};
MultiSelectorDataDialogBinding.newInstance=function(_99a){
var _99b=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_99a);
return UserInterface.registerBinding(_99b,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_99c){
var id=_99c.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _99e=_99c.bindingDocument.getElementById(id);
if(_99e!=null){
var _99f=UserInterface.getBinding(_99e);
_99f.setResult(true);
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
var _9a1=this.bindingDocument.getElementById(id);
if(_9a1!=null){
var _9a2=UserInterface.getBinding(_9a1);
if(_9a2&&!_9a2.isAttached){
_9a2.isLazy=true;
}else{
_9a1.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9a3){
this._isLazy=_9a3;
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
var _9a5=this.getProperty("stateprovider");
var _9a6=this.getProperty("handle");
if(_9a5!=null&&_9a6!=null){
url=url.replace("${stateprovider}",_9a5).replace("${handle}",_9a6);
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
EditorDataBinding.prototype._onPageInitialize=function(_9a7){
EditorDataBinding.superclass._onPageInitialize.call(this,_9a7);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9a8){
EditorDataBinding.superclass.handleAction.call(this,_9a8);
switch(_9a8.type){
case Binding.ACTION_DIRTY:
if(_9a8.target!=this){
if(!this.isDirty){
this.dirty();
}
_9a8.consume();
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
EditorDataBinding.prototype.setValue=function(_9a9){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9aa){
};
FunctionEditorDataBinding.prototype=new EditorDataBinding;
FunctionEditorDataBinding.prototype.constructor=FunctionEditorDataBinding;
FunctionEditorDataBinding.superclass=EditorDataBinding.prototype;
function FunctionEditorDataBinding(){
this.logger=SystemLogger.getLogger("FunctionEditorDataBinding");
this._url="${root}/content/misc/editors/functioncalleditor/functioncalleditor.aspx?StateProvider=${stateprovider}&Handle=${handle}";
return this;
}
FunctionEditorDataBinding.prototype.toString=function(){
return "[FunctionEditorDataBinding]";
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
var _9af=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9af=fake.getValue()!="";
}
if(!_9af&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9af&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9af;
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
var _9b3=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9b3!=null){
_9b3.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9b4){
_9b4=_9b4!=null?_9b4:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9b4;
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
FieldGroupBinding.prototype=new Binding;
FieldGroupBinding.prototype.constructor=FieldGroupBinding;
FieldGroupBinding.superclass=Binding.prototype;
FieldGroupBinding.CENTER="group-c";
FieldGroupBinding.NORTH="group-n";
FieldGroupBinding.SOUTH="group-s";
FieldGroupBinding.EAST="group-e";
FieldGroupBinding.WEST="group-w";
FieldGroupBinding.NORTHEAST="group-ne";
FieldGroupBinding.NORTHWEST="group-nw";
FieldGroupBinding.SOUTHEAST="group-se";
FieldGroupBinding.SOUTHWEST="group-sw";
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
this._innerHTML();
this._buildDOMContent();
};
FieldGroupBinding.prototype._innerHTML=function(){
var _9b5=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9b6=_9b5.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9b6;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9b6=_9b6.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9b6;
}
var self=this;
var _9b8=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9b8.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9bb=this.getProperty("label");
if(_9bb){
this.setLabel(_9bb);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9bc){
this.setProperty("label",_9bc);
if(this.shadowTree.labelBinding==null){
var _9bd=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9bd.attachClassName("fieldgrouplabel");
cell.insertBefore(_9bd.bindingElement,cell.getElementsByTagName("div").item(1));
_9bd.attach();
this.shadowTree.labelBinding=_9bd;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9bc));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9bf){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9bf.bindingElement);
return _9bf;
};
FieldGroupBinding.prototype.addFirst=function(_9c0){
var _9c1=this.shadowTree[FieldGroupBinding.CENTER];
_9c1.insertBefore(_9c0.bindingElement,_9c1.firstChild);
return _9c0;
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
var _9c2=this.getProperty("relation");
if(_9c2!=null){
this.bindingRelation=_9c2;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9c3,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9c3,arg);
switch(_9c3){
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
FieldBinding.newInstance=function(_9c5){
var _9c6=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9c5);
return UserInterface.registerBinding(_9c6,FieldBinding);
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
var _9c7=this.getDescendantBindingByLocalName("fieldgroup");
if(_9c7!=null){
_9c7.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9c8=true;
var _9c9=this.getDescendantBindingsByLocalName("*");
while(_9c9.hasNext()){
var _9ca=_9c9.getNext();
if(Interfaces.isImplemented(IData,_9ca)){
var _9cb=_9ca.validate();
if(_9c8&&!_9cb){
_9c8=false;
}
}
}
return _9c8;
};
FieldsBinding.prototype.handleAction=function(_9cc){
FieldsBinding.superclass.handleAction.call(this,_9cc);
var _9cd=_9cc.target;
if(_9cd!=this){
switch(_9cc.type){
case Binding.ACTION_INVALID:
var _9ce=DataBinding.getAssociatedLabel(_9cd);
if(_9ce){
this._invalidFieldLabels.set(_9cd.key,_9ce);
}
if(_9cd.error){
if(!_9cd.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9cd.error},_9cd);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9cc.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9cd.key)){
this._invalidFieldLabels.del(_9cd.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9cc.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9cf=null;
if(this._invalidFieldLabels.hasEntries()){
_9cf=this._invalidFieldLabels.toList();
}
return _9cf;
};
FieldsBinding.newInstance=function(_9d0){
var _9d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9d0);
return UserInterface.registerBinding(_9d1,FieldsBinding);
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
var _9d2=this.getProperty("image");
if(_9d2){
this.setImage(_9d2);
}
var _9d3=this.getProperty("tooltip");
if(_9d3){
this.setToolTip(_9d3);
}
var _9d4=this.getProperty("label");
if(_9d4){
this.setLabel(_9d4);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9d6=this.getAncestorBindingByLocalName("field");
if(_9d6){
var _9d7=true;
_9d6.getDescendantBindingsByLocalName("*").each(function(_9d8){
if(Interfaces.isImplemented(IData,_9d8)){
_9d8.focus();
_9d7=false;
}
return _9d7;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9d9){
this.setProperty("label",_9d9);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9d9);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9da=this.getProperty("label");
if(!_9da){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9da=node.data;
}
}
return _9da;
};
FieldDescBinding.prototype.setImage=function(_9dc){
this.setProperty("image",_9dc);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9dd){
this.setProperty("tooltip",_9dd);
if(this.isAttached){
this.bindingElement.title=_9dd;
}
};
FieldDescBinding.newInstance=function(_9de){
var _9df=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9de);
return UserInterface.registerBinding(_9df,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9e0){
var _9e1=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9e0);
return UserInterface.registerBinding(_9e1,FieldDataBinding);
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
var _9e2=this._fieldHelpPopupBinding;
if(_9e2){
_9e2.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9e3=app.bindingMap.fieldhelpopupset;
var doc=_9e3.bindingDocument;
var _9e5=_9e3.add(PopupBinding.newInstance(doc));
var _9e6=_9e5.add(PopupBodyBinding.newInstance(doc));
_9e5.position=PopupBinding.POSITION_RIGHT;
_9e5.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9e6.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9e7=this.getProperty("label");
if(_9e7){
_9e6.bindingElement.innerHTML=Resolver.resolve(_9e7);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9e5;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9e8=this.getAncestorBindingByLocalName("field");
if(_9e8){
_9e8.attachClassName("fieldhelp");
var _9e9=ClickButtonBinding.newInstance(this.bindingDocument);
_9e9.attachClassName("fieldhelp");
_9e9.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9e9);
_9e9.attach();
var self=this;
_9e9.oncommand=function(){
self.attachPopupBinding();
};
_9e9.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9e9;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9eb=this._fieldHelpPopupBinding;
if(_9eb&&!_9eb.isAttached){
_9eb.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9ed){
RadioDataGroupBinding.superclass.handleAction.call(this,_9ed);
switch(_9ed.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9ef,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9ef,arg);
switch(_9ef){
case BroadcastMessages.KEY_ARROW:
var _9f1=null;
var next=null;
var _9f3=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9f3=this.getChildBindingsByLocalName("radio");
while(!_9f1&&_9f3.hasNext()){
var _9f4=_9f3.getNext();
if(_9f4.getProperty("ischecked")){
_9f1=_9f4;
}
}
break;
}
if(_9f1){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9f3.getFollowing(_9f1);
while(next!=null&&next.isDisabled){
next=_9f3.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9f3.getPreceding(_9f1);
while(next!=null&&next.isDisabled){
next=_9f3.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9f5){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9f5){
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
var _9f6=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9f6.type="hidden";
_9f6.name=this._name;
this.bindingElement.appendChild(_9f6);
this.shadowTree.input=_9f6;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9f7=null;
var _9f8=this.getChildBindingsByLocalName("radio");
while(!_9f7&&_9f8.hasNext()){
var _9f9=_9f8.getNext();
if(_9f9.isChecked){
_9f7=_9f9.getProperty("value");
}
}
return _9f7;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9fa){
};
RadioDataGroupBinding.prototype.setResult=function(_9fb){
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
this.propertyMethodMap["checked"]=function(_9fc){
if(_9fc!=this.isChecked){
this.setChecked(_9fc,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9fd=this.getProperty("ischecked");
if(_9fd!=this.isChecked){
this.setChecked(_9fd,true);
}
};
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
var _9fe=this.getProperty("relate");
var _9ff=this.getProperty("oncommand");
var _a00=this.getProperty("isdisabled");
if(_9fe){
this.bindingRelate=_9fe;
this.relate();
}
if(_9ff){
this.oncommand=function(){
Binding.evaluate(_9ff,this);
};
}
if(_a00==true){
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
var _a02=this.getCallBackID();
this._buttonBinding.check=function(_a03){
RadioButtonBinding.prototype.check.call(this,_a03);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a04){
RadioButtonBinding.prototype.uncheck.call(this,_a04);
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
RadioDataBinding.prototype.setChecked=function(_a05,_a06){
this._buttonBinding.setChecked(_a05,_a06);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a05);
};
RadioDataBinding.prototype.check=function(_a07){
this.setChecked(true,_a07);
};
RadioDataBinding.prototype.uncheck=function(_a08){
this.setChecked(false,_a08);
};
RadioDataBinding.prototype.setDisabled=function(_a09){
if(_a09!=this.isDisabled){
this.isDisabled=_a09;
this._buttonBinding.setDisabled(_a09);
if(_a09){
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
var _a0b=DOMEvents.getTarget(e);
switch(_a0b){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a0c=this.getProperty("label");
if(_a0c){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a0c)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a0d){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a0d;
}
this.setProperty("label",_a0d);
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
this.propertyMethodMap["checked"]=function(_a0e){
if(_a0e!=this.isChecked){
this.setChecked(_a0e,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a0f=this.getProperty("ischecked");
if(_a0f!=this.isChecked){
this.setChecked(_a0f,true);
}
};
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
var _a11=DOMEvents.getTarget(e);
switch(_a11){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a12,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a12,arg);
switch(_a12){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a15){
_a15.consume();
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
var _a17=this.getCallBackID();
this._buttonBinding.check=function(_a18){
ButtonBinding.prototype.check.call(this,_a18);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a18){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a19){
ButtonBinding.prototype.uncheck.call(this,_a19);
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
if(_a17!=null){
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
var _a1a=true;
var _a1b=this.bindingElement.parentNode;
if(_a1b){
var _a1c=UserInterface.getBinding(_a1b);
if(_a1c&&_a1c instanceof CheckBoxGroupBinding){
if(_a1c.isRequired){
if(_a1c.isValid){
_a1a=_a1c.validate();
}else{
_a1a=false;
}
}
}
}
return _a1a;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a1d=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a1d.type="hidden";
_a1d.name=this._name;
_a1d.style.display="none";
this.bindingElement.appendChild(_a1d);
this.shadowTree.input=_a1d;
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
var _a1e=null;
var _a1f=this.getProperty("value");
if(this.isChecked){
_a1e=_a1f?_a1f:"on";
}
return _a1e;
};
CheckBoxBinding.prototype.setValue=function(_a20){
if(_a20==this.getValue()||_a20=="on"){
this.check(true);
}else{
if(_a20!="on"){
this.setPropety("value",_a20);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a21=false;
if(this.isChecked){
_a21=this._result!=null?this._result:true;
}
return _a21;
};
CheckBoxBinding.prototype.setResult=function(_a22){
if(typeof _a22=="boolean"){
this.setChecked(_a22,true);
}else{
this._result=_a22;
}
};
CheckBoxBinding.newInstance=function(_a23){
var _a24=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a23);
return UserInterface.registerBinding(_a24,CheckBoxBinding);
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
var _a25=true;
if(this.isRequired){
var _a26=this.getDescendantBindingsByLocalName("checkbox");
if(_a26.hasEntries()){
_a25=false;
while(_a26.hasNext()&&!_a25){
if(_a26.getNext().isChecked){
_a25=true;
}
}
}
if(_a25==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a25;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a27){
if(_a27){
if(!this._labelBinding){
var _a28=LabelBinding.newInstance(this.bindingDocument);
_a28.attachClassName("invalid");
_a28.setImage("${icon:error}");
_a28.setLabel("Selection required");
this._labelBinding=this.addFirst(_a28);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a29){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a29);
switch(_a29.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a2a){
var _a2b=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a2a);
return UserInterface.registerBinding(_a2b,CheckBoxGroupBinding);
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
var _a2c=DialogControlBinding.newInstance(this.bindingDocument);
_a2c.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a2c);
this._controlGroupBinding.attachRecursive();
var _a2d=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a2d);
var _a2e=this.getLabel();
if(_a2e!=null){
this.setLabel(_a2e);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a2f=this._snapTargetBinding;
if(Binding.exists(_a2f)==true){
_a2f.removeActionListener(Binding.ACTION_BLURRED,this);
_a2f.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a30){
if(Interfaces.isImplemented(IData,_a30)){
this._snapTargetBinding=_a30;
var _a31=_a30.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a31&&_a31.isConsumed){
this._environmentBinding=_a31.listener;
}
if(this._environmentBinding){
_a30.addActionListener(Binding.ACTION_BLURRED,this);
_a30.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a30)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a30.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a33=this._snapTargetBinding;
var _a34=this._environmentBinding;
var root=UserInterface.getBinding(_a33.bindingDocument.body);
if(Binding.exists(_a33)&&Binding.exists(_a34)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a33.isAttached&&_a34.isAttached){
var _a36=_a33.boxObject.getUniversalPosition();
var _a37=_a34.boxObject.getUniversalPosition();
_a37.y+=_a34.bindingElement.scrollTop;
_a37.x+=_a34.bindingElement.scrollLeft;
var tDim=_a33.boxObject.getDimension();
var eDim=_a34.boxObject.getDimension();
var _a3a=false;
if(_a36.y+tDim.h<_a37.y){
_a3a=true;
}else{
if(_a36.x+tDim.w<_a37.x){
_a3a=true;
}else{
if(_a36.y>_a37.y+eDim.h){
_a3a=true;
}else{
if(_a36.x>_a37.x+eDim.w){
_a3a=true;
}
}
}
}
if(!_a3a){
this._setComputedPosition(_a36,_a37,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a3b,_a3c,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a41=_a3b;
var _a42=false;
if(_a3b.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a42=true;
}else{
if(_a3b.x+tDim.w>=_a3c.x+eDim.w){
_a42=true;
}
}
if(_a42){
_a41.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a41.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a41.y-=(bDim.h);
_a41.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a41);
};
BalloonBinding.prototype.handleBroadcast=function(_a43,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a43,arg);
switch(_a43){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a45){
var _a46=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a45){
_a46=true;
}
}
return _a46;
};
BalloonBinding.prototype._setPosition=function(_a48){
var _a49=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a49=true;
}
}
if(!_a49){
this.bindingElement.style.left=_a48.x+"px";
this.bindingElement.style.top=_a48.y+"px";
this._point=_a48;
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
BalloonBinding.prototype.handleAction=function(_a4b){
BalloonBinding.superclass.handleAction.call(this,_a4b);
var _a4c=_a4b.target;
switch(_a4b.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a4b.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a4c==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a4c)){
self.dispose();
}else{
if(_a4c.validate()){
var _a4e=true;
if(_a4b.type==Binding.ACTION_BLURRED){
var root=_a4c.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a4e=false;
}
}
if(_a4e){
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
BalloonBinding.prototype.setLabel=function(_a51){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a52=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a51);
_a52.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a52);
}
this.setProperty("label",_a51);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a54){
var _a55=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a54);
var _a56=UserInterface.registerBinding(_a55,BalloonBinding);
_a56.hide();
return _a56;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a57,_a58){
if(Interfaces.isImplemented(IData,_a58)==true){
var _a59,_a5a=_a58.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a5a&&_a5a.isConsumed){
switch(_a5a.listener.constructor){
case StageBinding:
_a59=false;
break;
case StageDialogBinding:
_a59=true;
break;
}
}
var _a5b=_a59?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a5c=_a5b.add(BalloonBinding.newInstance(top.app.document));
_a5c.setLabel(_a57.text);
_a5c.snapTo(_a58);
_a5c.attach();
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
var _a5d=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a60=_a5d.getDataBinding(name);
if(_a60){
ErrorBinding.presentError({text:text},_a60);
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
FocusBinding.focusElement=function(_a61){
var _a62=true;
try{
_a61.focus();
Application.focused(true);
}
catch(exception){
var _a63=UserInterface.getBinding(_a61);
var _a64=SystemLogger.getLogger("FocusBinding.focusElement");
_a64.warn("Could not focus "+(_a63?_a63.toString():String(_a61)));
_a62=false;
}
return _a62;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a65){
var win=_a65.bindingWindow;
var id=_a65.bindingElement.id;
return {getBinding:function(){
var _a68=null;
try{
if(Binding.exists(_a65)){
_a68=win.bindingMap[id];
}
}
catch(exception){
}
return _a68;
}};
};
FocusBinding.navigateNext=function(_a69){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a69);
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
var _a6a=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a6a&&_a6a.isConsumed){
if(_a6a.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a6b){
FocusBinding.superclass.handleAction.call(this,_a6b);
var _a6c=_a6b.target;
var _a6d=null;
if(this._isFocusManager){
switch(_a6b.type){
case FocusBinding.ACTION_ATTACHED:
if(_a6c!=this){
this._isUpToDate=false;
}
_a6b.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a6c!=this){
this._isUpToDate=false;
_a6b.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a6d=new FocusCrawler();
_a6d.mode=FocusCrawler.MODE_BLUR;
_a6d.crawl(_a6c.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a6b.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a6c!=this){
_a6d=new FocusCrawler();
_a6d.mode=FocusCrawler.MODE_FOCUS;
_a6d.crawl(_a6c.bindingElement);
}
_a6b.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a6c)){
this.claimFocus();
this._onFocusableFocused(_a6c);
}
_a6b.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a6c)){
this._onFocusableBlurred(_a6c);
}
_a6b.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a6e){
var _a6f=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a6f==null&&list.hasNext()){
var _a71=list.getNext();
if(this._cachedFocus&&_a71==this._cachedFocus.getBinding()){
_a6f=_a71;
}
}
if(_a6f!=null){
if(_a71.isFocused){
var next=_a6e?list.getPreceding(_a6f):list.getFollowing(_a6f);
if(!next){
next=_a6e?list.getLast():list.getFirst();
}
next.focus();
}else{
_a6f.focus();
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
var _a73=new FocusCrawler();
var list=new List();
_a73.mode=FocusCrawler.MODE_INDEX;
_a73.crawl(this.bindingElement,list);
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
var _a76=this._cachedFocus.getBinding();
if(_a76&&!_a76.isFocused){
_a76.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a77){
if(_a77!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a77;
_a77.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a77);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a78){
_a78.deleteProperty(FocusBinding.MARKER);
if(_a78==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a7a){
this.bindingElement.style.left=_a7a+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a7b){
this.hiddenTabBindings.add(_a7b);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a7c=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a7c.getLabel());
item.setImage(_a7c.getImage());
item.associatedTabBinding=_a7c;
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
TabsButtonBinding.prototype.handleAction=function(_a7f){
TabsButtonBinding.superclass.handleAction.call(this,_a7f);
switch(_a7f.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a80=this.selectedTabBinding;
if(_a80){
this.containingTabBoxBinding.moveToOrdinalPosition(_a80,0);
this.containingTabBoxBinding.select(_a80);
}
_a7f.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a81){
var _a82=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a81);
_a82.setAttribute("type","checkbox");
_a82.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a82.className="tabbutton";
return UserInterface.registerBinding(_a82,TabsButtonBinding);
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
var _a83=TabBoxBinding.currentActiveInstance;
if(_a83!=null&&Binding.exists(_a83)){
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
var _a84=this.getTabElements().getLength();
var _a85=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a84!=_a85){
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
var _a86=this.getTabPanelElements();
while(_a86.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a86.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a87=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a88=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a89=_a87>_a88?"tabsbelow":"tabsontop";
this.attachClassName(_a89);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a8b=this.getTabPanelElements();
var _a8c=null;
var _a8d=this.getProperty("selectedindex");
if(_a8d!=null){
if(_a8d>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a8e=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a90=_a8b.getNext();
this.registerTabBoxPair(tab,_a90);
if(_a8d&&_a8e==_a8d){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a8c=tab;
}
}
_a8e++;
}
if(!_a8c){
_a8c=tabs.getFirst();
_a8c.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a91){
var _a92=null;
var _a93=null;
if(this.isEqualSize){
var _a94=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a96=this.getTabPanelElements();
_a96.each(function(_a97){
max=_a97.offsetHeight>max?_a97.offsetHeight:max;
});
_a93=max+_a94.top+_a94.bottom;
if(_a91&&this._tabPanelsElement.style.height!=null){
_a92=this._tabPanelsElement.offsetHeight;
}
if(_a92!=null||_a93>_a92){
this._tabPanelsElement.style.height=_a93+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a98){
_a98._invalidCount=0;
_a98.addActionListener(Binding.ACTION_INVALID,this);
_a98.addActionListener(Binding.ACTION_VALID,this);
_a98.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a99){
TabBoxBinding.superclass.handleAction.call(this,_a99);
var _a9a=_a99.target;
var _a9b=_a99.listener;
switch(_a99.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a9a.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a99.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a9a.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a9b._invalidCount++;
if(_a9b._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a9b.isSelected){
self._showWarning(_a9b,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a9b._invalidCount>0){
_a9b._invalidCount--;
if(_a9b._invalidCount==0){
if(_a9b.isSelected){
this._showWarning(_a9b,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a9b,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a99._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a99._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a9e=DOMEvents.getTarget(e);
if(_a9e==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _aa0=this.getTabPanelElements();
tabs.each(function(tab,_aa2){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _aa3=_aa0.get(_aa2);
this.registerTabBoxPair(tab,_aa3);
}
},this);
var _aa4=this._tabBoxPairs;
for(var key in _aa4){
var tab=_aa4[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a9e);
switch(_a9e.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _aa8=_a9e.parentNode;
if(_aa8==this._tabsElement||_aa8==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a9e==this._tabsElement||_a9e==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_aaa){
var _aab=this.getBindingForArgument(arg);
if(_aab!=null&&!_aab.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_aab.select(_aaa);
this.getTabPanelBinding(_aab).select(_aaa);
var _aac=this.getProperty("selectedindex");
if(_aac!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_aab.bindingElement,true));
}
this._selectedTabBinding=_aab;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_aab.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _aad=this.getTabPanelBinding(_aab);
this._showBalloon(_aad,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_aaf){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_aaf.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_aaf};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ab3){
var _ab4=null;
try{
var key=_ab3.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ab6=this._tabBoxPairs[key].tabPanel;
_ab4=UserInterface.getBinding(_ab6);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ab4;
};
TabBoxBinding.prototype.getTabBinding=function(_ab7){
var key=_ab7.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ab9=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ab9);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _aba=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_aba);
return _aba;
};
TabBoxBinding.prototype.appendTabByBindings=function(_abb,_abc){
var _abd=_abb.bindingElement;
_abb.setProperty("selected",true);
var _abe=this.summonTabPanelBinding();
var _abf=_abe.bindingElement;
if(_abc){
_abf.appendChild(_abc instanceof Binding?_abc.bindingElement:_abc);
}
this.registerTabBoxPair(_abd,_abf);
UserInterface.getBinding(this._tabsElement).add(_abb);
this._tabPanelsElement.appendChild(_abf);
_abb.attach();
UserInterface.getBinding(_abf).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _abb;
};
TabBoxBinding.prototype.importTabBinding=function(_ac0){
var that=_ac0.containingTabBoxBinding;
var _ac2=that.getTabPanelBinding(_ac0);
var _ac3=_ac2.getBindingElement();
var _ac4=_ac0.getBindingElement();
that.dismissTabBinding(_ac0);
this._tabsElement.appendChild(_ac4);
this._tabPanelsElement.appendChild(_ac3);
this.registerTabBoxPair(_ac4,_ac3);
_ac0.containingTabBoxBinding=this;
this.select(_ac0);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ac5){
var _ac6=null;
if(_ac5.isSelected){
_ac6=this.getBestTab(_ac5);
this._selectedTabBinding=null;
}
var _ac7=this.getTabPanelBinding(_ac5);
this.unRegisterTabBoxPair(_ac5.bindingElement);
_ac5.dispose();
_ac7.dispose();
if(_ac6!=null){
this.select(_ac6);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_ac8){
if(_ac8.isSelected){
this.selectBestTab(_ac8);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ac9){
var _aca=this.getBestTab(_ac9);
if(_aca){
this.select(_aca);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_acb){
var _acc=null;
var _acd=_acb.getOrdinalPosition(true);
var _ace=this.getTabBindings();
var _acf=_ace.getLength();
var _ad0=_acf-1;
if(_acf==1){
_acc=null;
}else{
if(_acd==_ad0){
_acc=_ace.get(_acd-1);
}else{
_acc=_ace.get(_acd+1);
}
}
return _acc;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ad1,_ad2){
var _ad3=this.bindingDocument.getElementById(_ad1.bindingElement.id);
var tab=this.getTabElements().get(_ad2);
this._tabsElement.insertBefore(_ad3,tab);
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
var _ad5=this._nodename_tab;
var _ad6=new List(this._tabsElement.childNodes);
var _ad7=new List();
while(_ad6.hasNext()){
var _ad8=_ad6.getNext();
if(_ad8.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ad8)==_ad5){
_ad7.add(_ad8);
}
}
return _ad7;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ad9=this._nodename_tabpanel;
var _ada=new List(this._tabPanelsElement.childNodes);
var _adb=new List();
_ada.each(function(_adc){
if(_adc.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_adc)==_ad9){
_adb.add(_adc);
}
});
return _adb;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _add=new List();
var _ade=this.getTabElements();
_ade.each(function(_adf){
_add.add(UserInterface.getBinding(_adf));
});
return _add;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _ae0=new List();
this.getTabPanelElements().each(function(_ae1){
_ae0.add(UserInterface.getBinding(_ae1));
});
return _ae0;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _ae2=null;
if(this._selectedTabBinding){
_ae2=this.getTabPanelBinding(this._selectedTabBinding);
}
return _ae2;
};
TabBoxBinding.prototype._showWarning=function(_ae3,_ae4){
var _ae5=this.getTabBinding(_ae3);
if(_ae4){
if(_ae5.labelBinding.hasImage){
_ae5._backupImage=_ae5.getImage();
}
_ae5.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ae5._backupImage){
_ae5.setImage(_ae5._backupImage);
}else{
_ae5.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ae6,_ae7){
var _ae8=this.getTabBinding(_ae6);
if((_ae7&&!_ae8.isSelected)||!_ae7){
if(_ae8.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ae7){
if(_ae8.labelBinding.hasImage){
_ae8._backupImage=_ae8.getImage();
}
_ae8.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_ae8._backupImage!=null){
_ae8.setImage(_ae8._backupImage);
}else{
_ae8.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_ae9){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _aec=tab.getOrdinalPosition(true);
var next=null;
var _aee=new List();
tabs.each(function(t){
if(t.isVisible){
_aee.add(t);
}
});
if(_aee.getLength()>1){
if(_aec==0&&!_ae9){
next=_aee.getLast();
}else{
if(_aec==_aee.getLength()-1&&_ae9){
next=_aee.getFirst();
}else{
if(_ae9){
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
var _af1=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_af1.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_af2){
TabsBinding.superclass.handleAction.call(this,_af2);
switch(_af2.type){
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
var _af5=self.bindingElement.offsetWidth;
if(_af5!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_af5;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_af6){
if(_af6 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_af6);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _af7=false;
var _af8,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _afb=this.constructor.TABBUTTON_IMPLEMENTATION;
var _afc=this.bindingElement.offsetWidth-_afb.RESERVED_SPACE;
var _afd=null;
var sum=0,_aff=0;
var _b00=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b00){
tab=tabs.getNext();
_af8=UserInterface.getBinding(tab);
if(!_afd){
_afd=_af8;
}
sum+=tab.offsetWidth;
if(sum>=_afc){
_af7=true;
if(_af8.isSelected){
if(!DOMUtil.isFirstElement(_af8.bindingElement,true)){
this.isManaging=false;
if(_afd){
_afd.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_af8,_aff-1);
_b00=false;
}
}else{
_af8.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_af8);
}
}else{
_af8.show();
_afd=_af8;
_aff++;
}
}
if(_b00){
if(_af7&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b01=_afd.getBindingElement();
var _b02=_b01.offsetLeft+_b01.offsetWidth;
var _b03=this.tabsButtonBinding;
setTimeout(function(){
_b03.show(_b02+4);
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
var _b04=TabBinding.superclass.serialize.call(this);
if(_b04){
_b04.label=this.getLabel();
_b04.image=this.getImage();
_b04.tooltip=this.getToolTip();
}
return _b04;
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
this.containingTabBoxBinding.select(this);
}
};
TabBinding.prototype.buildDOMContent=function(){
var _b05=this.bindingElement.getAttribute("image");
var _b06=this.bindingElement.getAttribute("label");
var _b07=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b06){
this.setLabel(_b06);
}
if(_b05){
this.setImage(_b05);
}
if(_b07){
this.setToolTip(_b07);
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
TabBinding.prototype.setLabel=function(_b09){
if(_b09!=null){
this.setProperty("label",_b09);
if(this.isAttached){
this.labelBinding.setLabel(_b09);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b0a){
if(_b0a){
this.setProperty("tooltip",_b0a);
if(this.isAttached){
this.labelBinding.setToolTip(_b0a);
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
var _b0c=false;
if(Client.isMozilla==true){
}
if(!_b0c){
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
TabBinding.prototype.select=function(_b0d){
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
TabBinding.newInstance=function(_b0e){
var _b0f=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b0e);
return UserInterface.registerBinding(_b0f,TabBinding);
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
var _b10=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b10=true;
this._lastKnownDimension=dim1;
}
return _b10;
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
TabPanelBinding.prototype.select=function(_b13){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b13!=true){
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
TabPanelBinding.prototype.handleAction=function(_b14){
TabPanelBinding.superclass.handleAction.call(this,_b14);
var _b15=_b14.target;
switch(_b14.type){
case BalloonBinding.ACTION_INITIALIZE:
_b14.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b16){
var _b17=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b16);
UserInterface.registerBinding(_b17,TabPanelBinding);
return UserInterface.getBinding(_b17);
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
var _b18=SplitBoxBinding.superclass.serialize.call(this);
if(_b18){
_b18.orient=this.getOrient();
_b18.layout=this.getLayout();
}
return _b18;
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
var _b19=this.getSplitPanelElements();
if(_b19.hasEntries()){
var _b1a=new List(this.getLayout().split(":"));
if(_b1a.getLength()!=_b19.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b19.each(function(_b1b){
_b1b.setAttribute("ratio",_b1a.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b1c=this.getProperty("orient");
if(_b1c){
this._orient=_b1c;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b1d=this.getSplitterBindings();
while(_b1d.hasNext()){
var _b1e=_b1d.getNext();
if(_b1e&&_b1e.getProperty("collapsed")==true){
_b1e.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b1f){
SplitBoxBinding.superclass.handleAction.call(this,_b1f);
switch(_b1f.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b1f.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b1f.target);
_b1f.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b1f.target);
_b1f.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b20){
this._getSplitPanelBindingForSplitter(_b20).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b21){
this._getSplitPanelBindingForSplitter(_b21).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b22){
var _b23=DOMUtil.getOrdinalPosition(_b22.bindingElement,true);
var _b24,_b25=this.getSplitPanelElements();
switch(_b22.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b24=_b25.get(_b23);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b24=_b25.get(_b23+1);
break;
}
return UserInterface.getBinding(_b24);
};
SplitBoxBinding.prototype.invokeLayout=function(_b26){
var _b27=this.isHorizontalOrient();
var _b28=this.getSplitPanelBindings();
var _b29=this.getSplitterBindings();
var _b2a=new List();
var _b2b,sum=0;
var _b2d=0;
_b28.each(function(_b2e){
if(_b2e.isFixed==true){
if(!_b28.hasNext()){
_b2d+=_b2e.getFix();
}
_b2a.add(0);
sum+=0;
}else{
_b2b=_b2e.getRatio();
_b2a.add(_b2b);
sum+=_b2b;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b2a.getLength()!=_b28.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b2f=_b27?this.getInnerWidth():this.getInnerHeight();
_b2f-=_b2d;
_b29.each(function(_b30){
if(_b30.isVisible){
_b2f-=SplitterBinding.DIMENSION;
}
});
var unit=_b2f/sum;
var _b32=0;
var self=this;
_b28.each(function(_b34){
var span=0;
var _b36=_b2a.getNext();
if(_b34.isFixed){
span=_b34.getFix();
}else{
span=Math.round(unit*_b36);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b32+=span;
while(_b32>_b2f){
_b32--;
span--;
}
if(!_b34.isFixed){
if(_b27){
_b34.setWidth(span);
}else{
_b34.setHeight(span);
}
}
});
}
if(_b26!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b37=this.getLayout();
if(_b37){
this.setProperty("layout",_b37);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b38=this.isHorizontalOrient();
var _b39=this.getSplitPanelBindings();
var _b3a=this.getSplitterBindings();
var _b3b=null;
var _b3c=null;
var unit=null;
var _b3e=null;
var span=null;
_b39.each(function(_b40){
if(!unit){
unit=_b38?_b40.getWidth():_b40.getHeight();
}
span=_b38?_b40.getWidth():_b40.getHeight();
if(_b3e){
span-=_b3e;
_b3e=null;
}
_b3b=_b3a.getNext();
if(_b3b&&_b3b.offset){
_b3e=_b3b.offset;
span+=_b3e;
}
_b40.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b41){
this.logger.debug(_b41);
this.setProperty("layout",_b41);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b42="",_b43=this.getSplitPanelBindings();
_b43.each(function(_b44){
_b42+=_b44.getRatio().toString();
_b42+=_b43.hasNext()?":":"";
});
this.setProperty("layout",_b42);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b45=this.getSplitPanelElements();
_b45.each(function(_b46){
layout+="1"+(_b45.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b47){
this.bindingElement.style.width=_b47+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b48){
this.bindingElement.style.height=_b48+"px";
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
SplitBoxBinding.prototype.fit=function(_b49){
if(!this.isFit||_b49){
if(this.isHorizontalOrient()){
var max=0;
var _b4b=this.getSplitPanelBindings();
_b4b.each(function(_b4c){
var _b4d=_b4c.bindingElement.offsetHeight;
max=_b4d>max?_b4d:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b4e){
var _b4f=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b4e);
return UserInterface.registerBinding(_b4f,SplitBoxBinding);
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
var _b52=this.getProperty("hidden");
if(_b52){
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
var _b53=this.getProperty("ratiocache");
if(_b53){
this.setRatio(_b53);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b54){
if(!this.isFixed){
if(_b54!=this.getWidth()){
if(_b54<0){
_b54=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b54+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b54);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b55=null;
if(this.isFixed){
_b55=this.getFix();
}else{
_b55=this.bindingElement.offsetWidth;
}
return _b55;
};
SplitPanelBinding.prototype.setHeight=function(_b56){
if(!this.isFixed){
if(_b56!=this.getHeight()){
try{
this.bindingElement.style.height=_b56+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b57=null;
if(this.isFixed){
_b57=this.getFix();
}else{
_b57=this.bindingElement.offsetHeight;
}
return _b57;
};
SplitPanelBinding.prototype.setRatio=function(_b58){
this.setProperty("ratio",_b58);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b59){
if(_b59){
this._fixedSpan=_b59;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b59);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b59);
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
SplitPanelBinding.newInstance=function(_b5a){
var _b5b=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b5a);
return UserInterface.registerBinding(_b5b,SplitPanelBinding);
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
var _b5c=SplitBoxBinding.superclass.serialize.call(this);
if(_b5c){
_b5c.collapse=this.getProperty("collapse");
_b5c.collapsed=this.getProperty("collapsed");
_b5c.disabled=this.getProperty("isdisabled");
}
return _b5c;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b5d=this.getProperty("hidden");
if(_b5d){
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
SplitterBinding.prototype.setCollapseDirection=function(_b5f){
this.setProperty("collapse",_b5f);
this._collapseDirection=_b5f;
};
SplitterBinding.prototype.handleAction=function(_b60){
SplitterBinding.superclass.handleAction.call(this,_b60);
switch(_b60.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b60.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b62=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b62.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b62.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b63){
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
SplitterBinding.newInstance=function(_b6e){
var _b6f=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b6e);
return UserInterface.registerBinding(_b6f,SplitterBinding);
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
var _b70=this.getProperty("selectedindex");
var _b71=this.getDeckElements();
if(_b71.hasEntries()){
var _b72=false;
var _b73=0;
while(_b71.hasNext()){
var deck=_b71.getNext();
if(_b70&&_b73==_b70){
deck.setAttribute("selected","true");
_b72=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b72=true;
}
}
_b73++;
}
if(!_b72){
_b71.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b76=this.getBindingForArgument(arg);
if(_b76!=null){
if(_b76!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b76.select();
this._selectedDeckBinding=_b76;
var _b77=this.getProperty("selectedindex");
if(_b77!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b76.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b78=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b78=true;
this._lastKnownDimension=dim1;
}
return _b78;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b7b){
var _b7c=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b7b);
return UserInterface.registerBinding(_b7c,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b7d){
DeckBinding.superclass.handleAction.call(this,_b7d);
var _b7e=_b7d.target;
switch(_b7d.type){
case BalloonBinding.ACTION_INITIALIZE:
_b7d.consume();
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
DeckBinding.newInstance=function(_b80){
var _b81=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b80);
return UserInterface.registerBinding(_b81,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b82){
if(_b82 instanceof ToolBarBodyBinding){
if(_b82.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b82;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b82;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b82);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b83=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b83){
this.setImageSize(_b83);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b85=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b85.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b85.isDefaultContent=true;
this.add(_b85);
_b85.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b87=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b87);
}
if(_b87!=null&&_b87.hasClassName("max")){
this._maxToolBarGroup(_b87,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b89){
var _b8a=this.boxObject.getDimension().w;
var _b8b=CSSComputer.getPadding(this.bindingElement);
_b8a-=(_b8b.left+_b8b.right);
if(_b89!=null){
_b8a-=_b89.boxObject.getDimension().w;
if(!Client.isWindows){
_b8a-=1;
}
if(Client.isExplorer){
_b8a-=15;
}
}
max.bindingElement.style.width=_b8a+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b8c){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b8c);
};
ToolBarBinding.prototype.addLeft=function(_b8d,_b8e){
var _b8f=null;
if(this._toolBarBodyLeft!=null){
_b8f=this._toolBarBodyLeft.add(_b8d,_b8e);
}else{
throw new Error("No left toolbarbody");
}
return _b8f;
};
ToolBarBinding.prototype.addLeftFirst=function(_b90,_b91){
var _b92=null;
if(this._toolBarBodyLeft){
_b92=this._toolBarBodyLeft.addFirst(_b90,_b91);
}else{
throw new Error("No left toolbarbody");
}
return _b92;
};
ToolBarBinding.prototype.addRight=function(_b93){
var _b94=null;
if(this._toolBarBodyRight){
_b94=this._toolBarBodyRight.add(_b93);
}else{
throw new Error("No left toolbarbody");
}
return _b94;
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
ToolBarBinding.newInstance=function(_b97){
var _b98=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b97);
return UserInterface.registerBinding(_b98,ToolBarBinding);
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
var _b99=this.getDescendantBindingsByLocalName("toolbargroup");
var _b9a=new List();
var _b9b=true;
_b99.each(function(_b9c){
if(_b9c.isVisible&&!_b9c.isDefaultContent){
_b9a.add(_b9c);
}
});
while(_b9a.hasNext()){
var _b9d=_b9a.getNext();
_b9d.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b9b){
_b9d.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b9b=false;
}
if(!_b9a.hasNext()){
_b9d.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _ba0=list.getNext();
var _ba1=_ba0.getEqualSizeWidth();
if(_ba1>max){
max=_ba1;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _ba0=list.getNext();
_ba0.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_ba2,_ba3){
var _ba4=ToolBarBinding.superclass.add.call(this,_ba2);
if(!_ba3){
if(_ba2 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba4;
};
ToolBarBodyBinding.prototype.addFirst=function(_ba5,_ba6){
var _ba7=ToolBarBinding.superclass.addFirst.call(this,_ba5);
if(!_ba6){
if(_ba5 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba7;
};
ToolBarBodyBinding.newInstance=function(_ba8){
var _ba9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_ba8);
return UserInterface.registerBinding(_ba9,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_baa){
switch(_baa){
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
var _bab=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bab)=="toolbarbody"){
UserInterface.getBinding(_bab).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bac=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bac)=="toolbarbody"){
UserInterface.getBinding(_bac).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bad){
var _bae=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bad);
return UserInterface.registerBinding(_bae,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_baf){
var _bb0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_baf);
return UserInterface.registerBinding(_bb0,ToolBarButtonBinding);
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
var _bb1=this.getProperty("label");
var _bb2=this.getProperty("image");
if(_bb1){
this.setLabel(_bb1);
}
if(_bb2){
this.setImage(_bb2);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bb3,_bb4){
if(this.isAttached){
this._labelBinding.setLabel(_bb3,_bb4);
}
this.setProperty("label",_bb3);
};
ToolBarLabelBinding.prototype.setImage=function(_bb5,_bb6){
if(this.isAttached){
this._labelBinding.setImage(_bb5,_bb6);
}
this.setProperty("image",_bb5);
};
ToolBarLabelBinding.newInstance=function(_bb7){
var _bb8=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bb7);
return UserInterface.registerBinding(_bb8,ToolBarLabelBinding);
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
var _bb9=this.getDescendantBindingsByLocalName("clickbutton");
if(_bb9.hasEntries()){
while(_bb9.hasNext()){
var _bba=_bb9.getNext();
if(_bba.isDefault){
this._defaultButton=_bba;
_bba.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bba.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bb9;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bbb,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bbb,arg);
switch(_bbb){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bbd=this.getAncestorBindingByType(DialogBinding,true);
if(_bbd!=null&&_bbd.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bbe){
DialogToolBarBinding.superclass.handleAction.call(this,_bbe);
var _bbf=_bbe.target;
var _bc0=false;
var _bc1=this._buttons.reset();
if(_bbf instanceof ClickButtonBinding){
switch(_bbe.type){
case Binding.ACTION_FOCUSED:
_bbf.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bbf;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bbf.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bc0&&_bc1.hasNext()){
var _bc2=_bc1.getNext();
_bc0=_bc2.isFocused;
}
if(!_bc0){
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
ComboBoxBinding.newInstance=function(_bc4){
var _bc5=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bc4);
return UserInterface.registerBinding(_bc5,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bc6,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bc6,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bca=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bca.each(function(_bcb){
var _bcc=_bcb.getProperty("oncommand");
_bcb.setProperty("hiddencommand",_bcc);
_bcb.deleteProperty("oncommand");
_bcb.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bcd=null;
var _bce=this.getActiveMenuItemId();
_bca.reset();
while(_bca.hasNext()){
var _bcf=_bca.getNext();
if(_bcf.getProperty("id")==_bce){
_bcd=_bcf;
break;
}
}
if(_bcd==null&&_bca.hasEntries()){
_bcd=_bca.getFirst();
}
if(_bcd!=null){
this.setButton(_bcd);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bd0){
if(_bd0 instanceof MenuItemBinding){
var _bd1=_bd0.getProperty("label");
var _bd2=_bd0.getProperty("image");
var _bd3=_bd0.getProperty("image-hover");
var _bd4=_bd0.getProperty("image-active");
var _bd5=_bd0.getProperty("image-disabled");
var _bd6=_bd0.getProperty("hiddencommand");
this.setLabel(_bd1?_bd1:"");
this.image=_bd2;
this.imageHover=_bd2;
this.imageActive=_bd4;
this.imageDisabled=_bd5;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bd6,this);
};
this.hideActiveItem(_bd0);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bd7){
if(_bd7 instanceof MenuItemBinding){
this.setButton(_bd7);
this.setActiveMenuItemId(_bd7.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bd8){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bd9){
if(_bd9==_bd8){
Binding.prototype.hide.call(_bd9);
}else{
Binding.prototype.show.call(_bd9);
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
var _bdb=this._views;
for(var _bdc in ViewDefinitions){
var def=ViewDefinitions[_bdc];
var key=def.perspective;
if(key!=null){
if(!_bdb.has(key)){
_bdb.set(key,new List());
}
var list=_bdb.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_be0,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_be0,arg);
switch(_be0){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _be3=this.bindingWindow.bindingMap.toolboxpopupgroup;
_be3.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_be3.add(StageViewMenuItemBinding.newInstance(_be3.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_be3.show();
}else{
_be3.hide();
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
TreeBinding.grid=function(_be7){
var _be8=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_be7);
var _bea=_be7%_be8;
if(_bea>0){
_be7=_be7-_bea+_be8;
}
return _be7+TreeBodyBinding.PADDING_TOP;
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
var _beb=this.getProperty("focusable");
if(_beb!=null){
this._isFocusable=_beb;
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
var _bed=this.getProperty("builder");
if(_bed){
this._buildFromTextArea(_bed);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bee=this.getProperty("selectable");
var _bef=this.getProperty("selectionproperty");
var _bf0=this.getProperty("selectionvalue");
if(_bee){
this.setSelectable(true);
if(_bef){
this.setSelectionProperty(_bef);
}
if(_bf0){
this.setSelectionValue(_bf0);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _bf3=UserInterface.getBinding(area);
var _bf4=this._treeBodyBinding;
function build(){
_bf4.subTreeFromString(area.value);
}
_bf3.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_bf5){
var _bf6=_bf5.getHandle();
if(this._treeNodeBindings.has(_bf6)){
throw "Duplicate treenodehandles registered: "+_bf5.getLabel();
}else{
this._treeNodeBindings.set(_bf6,_bf5);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_bf6)){
_bf5.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_bf8){
this._treeNodeBindings.del(_bf8.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_bf9){
var _bfa=null;
if(this._treeNodeBindings.has(_bf9)){
_bfa=this._treeNodeBindings.get(_bf9);
}else{
throw "No such treenode: "+_bf9;
}
return _bfa;
};
TreeBinding.prototype.handleAction=function(_bfb){
TreeBinding.superclass.handleAction.call(this,_bfb);
var _bfc=_bfb.target;
switch(_bfb.type){
case TreeNodeBinding.ACTION_OPEN:
_bfb.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bfc);
_bfb.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bfc;
this.focusSingleTreeNodeBinding(_bfc);
if(!this.isFocused){
this.focus();
}
_bfb.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bfc;
this.focusSingleTreeNodeBinding(_bfc);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bfc;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bfc;
this.focusSingleTreeNodeBinding(_bfc);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bfb.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bfc.isFocused){
this.blurSelectedTreeNodes();
}
_bfb.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bfd,_bfe){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bff){
if(_bff!=null&&!_bff.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bff);
_bff.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c00){
this.blurSelectedTreeNodes();
while(_c00.hasNext()){
var _c01=_c00.getNext();
this._focusedTreeNodeBindings.add(_c01);
_c01.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c02=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c03=false;
var _c04=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c05=this._focusedTreeNodeBindings.getNext();
var _c06=_c05.getProperty(this._selectionProperty);
if(_c06!=null){
if(!this._selectionValue||this._selectionValue[_c06]){
_c04=(this._selectedTreeNodeBindings[_c05.key]=_c05);
var _c07=_c02[_c05.key];
if(!_c07||_c07!=_c04){
_c03=true;
}
}
}
}
if(_c04){
if(_c03){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c02){
for(var key in _c02){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c09=new List();
for(var key in this._selectedTreeNodeBindings){
_c09.add(this._selectedTreeNodeBindings[key]);
}
return _c09;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c0b){
_c0b.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c0c){
var _c0d=_c0c.getDescendantBindingsByLocalName("treenode");
var _c0e=true;
var self=this;
_c0d.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c0e;
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
var _c11=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c11!=null){
this.focusSingleTreeNodeBinding(_c11);
_c11.callback();
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
TreeBinding.prototype.add=function(_c12){
var _c13=null;
if(this._treeBodyBinding){
_c13=this._treeBodyBinding.add(_c12);
}else{
this._treeNodeBuffer.add(_c12);
_c13=_c12;
}
return _c13;
};
TreeBinding.prototype.addFirst=function(_c14){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c15=this._treeBodyBinding.bindingElement;
_c15.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c16,_c17){
if(_c17.isContainer&&_c17.isOpen){
_c17.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c18){
this._isSelectable=_c18;
if(_c18){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c19){
this._selectionProperty=_c19;
};
TreeBinding.prototype.setSelectionValue=function(_c1a){
if(_c1a){
var list=new List(_c1a.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c1c,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c1c,arg);
switch(_c1c){
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
var _c1e=this.getFocusedTreeNodeBindings();
if(_c1e.hasEntries()){
var node=_c1e.getFirst();
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
var _c21=this.getFocusedTreeNodeBindings();
if(_c21.hasEntries()){
var node=_c21.getFirst();
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
var _c24=null;
while(next==null&&(_c24=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c24!=null){
next=_c24.getNextBindingByLocalName("treenode");
}
node=_c24;
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
var _c26=DOMEvents.getTarget(e);
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
var _c27=new TreeCrawler();
var list=new List();
_c27.mode=TreeCrawler.MODE_GETOPEN;
_c27.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c2a=list.getNext();
map.set(_c2a.getHandle(),true);
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
var _c2f=this._positionIndicatorBinding;
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
if(y!=_c2f.getPosition().y){
_c2f.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c2f.isVisible){
_c2f.show();
}
}else{
if(_c2f.isVisible){
_c2f.hide();
}
}
}else{
if(_c2f.isVisible){
_c2f.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c32){
this._acceptingTreeNodeBinding=_c32;
this._acceptingPosition=_c32.boxObject.getLocalPosition();
this._acceptingDimension=_c32.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c32);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c33){
var map={};
var _c35=_c33.getChildBindingsByLocalName("treenode");
var _c36,pos,dim,y;
y=TreeBinding.grid(_c33.boxObject.getLocalPosition().y);
map[y]=true;
while(_c35.hasNext()){
_c36=_c35.getNext();
pos=_c36.boxObject.getLocalPosition();
dim=_c36.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c3c in this._acceptingPositions){
if(_c3c==y){
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
TreeBinding.newInstance=function(_c3d){
var _c3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c3d);
var _c3f=UserInterface.registerBinding(_c3e,TreeBinding);
_c3f.treeBodyBinding=TreeBodyBinding.newInstance(_c3d);
return _c3f;
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
TreeBodyBinding.prototype.accept=function(_c40){
if(_c40 instanceof TreeNodeBinding){
this.logger.debug(_c40);
}
};
TreeBodyBinding.prototype.handleAction=function(_c41){
TreeBodyBinding.superclass.handleAction.call(this,_c41);
switch(_c41.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c41.target);
_c41.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c42){
var a=this.boxObject.getDimension().h;
var y=_c42.boxObject.getLocalPosition().y;
var h=_c42.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c48=_c42.labelBinding.bindingElement;
if(y-t<0){
_c48.scrollIntoView(true);
}else{
if(y-t+h>a){
_c48.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c49){
var _c4a=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c49);
return UserInterface.registerBinding(_c4a,TreeBodyBinding);
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
var _c4b=TreeNodeBinding.superclass.serialize.call(this);
if(_c4b){
_c4b.label=this.getLabel();
_c4b.image=this.getImage();
var _c4c=this.getHandle();
if(_c4c&&_c4c!=this.key){
_c4b.handle=_c4c;
}
if(this.isOpen){
_c4b.open=true;
}
if(this.isDisabled){
_c4b.disabled=true;
}
if(this.dragType){
_c4b.dragtype=this.dragType;
}
if(this.dragAccept){
_c4b.dragaccept=this.dragAccept;
}
}
return _c4b;
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
var _c4e=UserInterface.getBinding(node);
if(_c4e&&_c4e.containingTreeBinding){
this.containingTreeBinding=_c4e.containingTreeBinding;
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
var _c4f=this.key;
var _c50=this.getProperty("handle");
if(_c50){
_c4f=_c50;
}
return _c4f;
};
TreeNodeBinding.prototype.setHandle=function(_c51){
this.setProperty("handle",_c51);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c53=this.getProperty("label");
var _c54=this.getProperty("tooltip");
var _c55=this.getProperty("oncommand");
var _c56=this.getProperty("onbindingfocus");
var _c57=this.getProperty("onbindingblur");
var _c58=this.getProperty("focused");
var _c59=this.getProperty("callbackid");
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
if(_c53!=null){
this.setLabel(_c53);
}
if(_c54!=null){
this.setToolTip(_c54);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c5b=this.bindingWindow.WindowManager;
if(_c55!=null){
this.oncommand=function(){
Binding.evaluate(_c55,this);
};
}
if(_c56!=null){
this.onfocus=function(){
Binding.evaluate(_c56,this);
};
}
if(_c57!=null){
this.onblur=function(){
Binding.evaluate(_c57,this);
};
}
if(_c58==true){
this.focus();
}
if(_c59!=null){
Binding.dotnetify(this,_c59);
}
};
TreeNodeBinding.prototype.handleAction=function(_c5c){
TreeNodeBinding.superclass.handleAction.call(this,_c5c);
switch(_c5c.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c5c.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c5d,_c5e){
var _c5f=true;
if(_c5d instanceof TreeNodeBinding){
var _c60=false;
var _c61=this.bindingElement;
var _c62=this.containingTreeBinding.bindingElement;
while(!_c60&&_c61!=_c62){
if(_c61==_c5d.getBindingElement()){
_c60=true;
}else{
_c61=_c61.parentNode;
}
}
if(_c60){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c5f=false;
}else{
this.acceptTreeNodeBinding(_c5d,_c5e);
}
}else{
_c5f=false;
}
return _c5f;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c63,_c64){
var _c65=_c63.serializeToString();
var _c66=new BindingParser(this.bindingDocument);
var _c67=_c66.parseFromString(_c65).getFirst();
_c64=_c64?_c64:this.containingTreeBinding.getDropIndex();
var _c68=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c67,_c68.get(_c64));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c63.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c69=this.getProperty("image");
var _c6a=this.getProperty("image-active");
var _c6b=this.getProperty("image-disabled");
_c6a=_c6a?_c6a:this.isContainer?_c69?_c69:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c69?_c69:TreeNodeBinding.DEFAULT_ITEM;
_c6b=_c6b?_c6b:this.isContainer?_c69?_c69:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c69?_c69:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c69=_c69?_c69:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c69,imageHover:null,imageActive:_c6a,imageDisabled:_c6b});
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
TreeNodeBinding.prototype.setLabel=function(_c6d){
this.setProperty("label",String(_c6d));
if(this.isAttached){
this.labelBinding.setLabel(String(_c6d));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c6e){
this.setProperty("tooltip",String(_c6e));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c6e));
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
var _c6f=this.imageProfile.getDefaultImage();
var _c70=this.imageProfile.getActiveImage();
_c70=_c70?_c70:_c6f;
return this.isOpen?_c70:_c6f;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c72=DOMEvents.getTarget(e);
var _c73=this.labelBinding.bindingElement;
var _c74=this.labelBinding.shadowTree.labelBody;
var _c75=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c72){
case _c73:
this._onAction(e);
break;
case _c74:
case _c75:
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
if(_c72.parentNode==this.bindingElement&&_c72.__updateType==Update.TYPE_INSERT){
var _c73=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c72)=="treenode"){
if(_c72==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c72,_c73.nextSibling);
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
switch(_c72){
case _c73:
case _c74:
case _c75:
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
var _c79=true;
if(e.type=="mousedown"){
var _c7a=e.button==(e.target?0:1);
if(!_c7a){
_c79=false;
}
}
if(_c79){
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
var _c7c=false;
if(e!=null){
_c7c=e.shiftKey;
}
this.dispatchAction(_c7c?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c7f=this.getDescendantBindingsByLocalName("treenode");
_c7f.each(function(_c80){
_c80.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c81){
var _c82=_c81.getAttribute("focused");
if(_c82=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c83){
var _c84=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c83);
return UserInterface.registerBinding(_c84,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c85){
var _c86=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c85);
return UserInterface.registerBinding(_c86,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c87){
this.bindingElement.style.left=_c87.x+"px";
this.bindingElement.style.top=_c87.y+"px";
this._geometry.x=_c87.x;
this._geometry.y=_c87.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c88){
var _c89=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c88);
return UserInterface.registerBinding(_c89,TreePositionIndicatorBinding);
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
this.addFilter(function(_c8b){
var _c8c=UserInterface.getBinding(_c8b);
var _c8d=null;
var _c8d=null;
if(!_c8c instanceof TreeNodeBinding){
_c8d=NodeCrawler.SKIP_NODE;
}
return _c8d;
});
this.addFilter(function(_c8e,list){
var _c90=UserInterface.getBinding(_c8e);
var _c91=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c90.isOpen){
list.add(_c90);
}
break;
}
return _c91;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c92){
this.binding=_c92;
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
DockTabsButtonBinding.newInstance=function(_c93){
var _c94=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c93);
_c94.setAttribute("type","checkbox");
_c94.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c94.className="tabbutton";
return UserInterface.registerBinding(_c94,DockTabsButtonBinding);
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
var _c95=DockBinding.superclass.serialize.call(this);
if(_c95){
_c95.active=this.isActive?true:null;
_c95.collapsed=this.isCollapsed?true:null;
}
return _c95;
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
var _c96=UserInterface.getBinding(this.bindingElement.parentNode);
var _c97=MatrixBinding.newInstance(this.bindingDocument);
_c97.attachClassName("dockliner");
this.shadowTree.dockLiner=_c97;
_c96.add(_c97);
_c97.attach();
_c97.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c99){
var _c9a=this.getSelectedTabPanelBinding();
if(_c9a){
_c9a.isVisible=_c99;
_c9a.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c9b){
var _c9c=this._getBindingForDefinition(_c9b);
var _c9d=DockTabBinding.newInstance(this.bindingDocument);
_c9d.setHandle(_c9b.handle);
_c9d.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c9b.label);
_c9d.setImage(_c9b.image);
_c9d.setToolTip(_c9b.toolTip);
_c9d.setEntityToken(_c9b.entityToken);
_c9d.setAssociatedView(_c9c);
this.appendTabByBindings(_c9d,null);
this._setupPageBindingListeners(_c9d);
var _c9e=this.getTabPanelBinding(_c9d);
_c9c.snapToBinding(_c9e);
var _c9f=this.bindingWindow.bindingMap.views;
_c9f.add(_c9c);
if(!this.isActive){
this.activate();
}
_c9c.attach();
};
DockBinding.prototype.prepareOpenView=function(_ca0,_ca1){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_ca1.setLabel(_ca0.label);
_ca1.setImage(_ca0.image);
_ca1.setToolTip(_ca0.toolTip);
this._setupPageBindingListeners(_ca1);
var _ca2=this.getTabPanelBinding(_ca1);
var _ca3=this._getBindingForDefinition(_ca0);
_ca1.setAssociatedView(_ca3);
_ca3.snapToBinding(_ca2);
UserInterface.getBinding(this.bindingDocument.body).add(_ca3);
_ca3.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_ca4){
var _ca5=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_ca5.bindingDocument);
view.setDefinition(_ca4);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_ca7){
var _ca8=this.getTabPanelBinding(_ca7);
var self=this;
var _caa={handleAction:function(_cab){
var _cac=_cab.target;
switch(_cab.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cac.reflex(true);
var view=_ca7.getAssociatedView();
if(_cac.bindingWindow==view.getContentWindow()){
_ca7.updateDisplay(_cac);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_ca7.onPageInitialize(_cac);
_cab.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_ca7.updateDisplay(_cac);
_cab.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_ca7.updateEntityToken(_cac);
_cab.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_ca7.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_ca7.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_ca7);
_cab.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_ca7,true);
_cab.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_ca7);
break;
case Binding.ACTION_FORCE_REFLEX:
_ca8.reflex(true);
_cab.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_ca7.isDirty){
_ca7.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cae){
_ca8.addActionListener(_cae,_caa);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_caf){
DockBinding.superclass.handleAction.call(this,_caf);
var _cb0=_caf.target;
switch(_caf.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_caf.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cb0 instanceof DockBinding){
if(_cb0.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cb0);
if(this.isActive){
_cb0.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cb0);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cb1,arg){
DockBinding.superclass.handleBroadcast.call(this,_cb1,arg);
switch(_cb1){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cb3=arg;
if(_cb3.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cb3.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cb4){
var tabs=this.getTabBindings();
var _cb6=false;
while(tabs.hasNext()&&!_cb6){
var tab=tabs.getNext();
var _cb8=tab.getEntityToken();
if(_cb8!=null&&_cb8==_cb4){
if(!tab.isSelected){
this.select(tab,true);
_cb6=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cb9){
this._handleCollapse(true,_cb9);
};
DockBinding.prototype.unCollapse=function(_cba){
this._handleCollapse(false,_cba);
};
DockBinding.prototype._handleCollapse=function(_cbb,_cbc){
var _cbd=this.getChildBindingByLocalName("dockpanels");
var _cbe=this.getAncestorBindingByLocalName("splitbox");
if(_cbb){
_cbd.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cbc&&_cbe.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cbd.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cbc){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cbb);
this.isCollapsed=_cbb;
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
DockBinding.prototype.closeTab=function(_cc3,_cc4){
if(_cc3.isDirty&&!_cc4){
var _cc5=Resolver.resolve(_cc3.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cc5),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cc7){
switch(_cc7){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cc3);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cc3);
break;
}
}});
}else{
this.removeTab(_cc3);
}
};
DockBinding.prototype.closeTabsExcept=function(_cc8){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cc8){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_ccb){
var _ccc=_ccb.getAssociatedView();
_ccc.saveContainedEditor();
var self=this;
var _cce={handleBroadcast:function(_ccf,arg){
switch(_ccf){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_ccc.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cce);
if(arg.isSuccess){
self.removeTab(_ccb);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cce);
};
DockBinding.prototype.appendTabByBindings=function(_cd1,_cd2){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cd1,_cd2);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cd3){
_cd3=_cd3?_cd3+"px":"100%";
this.bindingElement.style.width=_cd3;
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
DockBinding.prototype.showControls=function(_cd4){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cd4){
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
var _cd7=DockControlBinding.newInstance(this.bindingDocument);
_cd7.setControlType(type);
return _cd7;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cd9=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cd9)){
_cd9=_cd9>0?_cd9-1:0;
self.bindingElement.style.width=new String(_cd9)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cda){
DockTabsBinding.superclass.handleCrawler.call(this,_cda);
switch(_cda.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cdc=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cdc)){
_cdc=_cdc>0?_cdc-1:0;
self.bindingElement.style.width=new String(_cdc)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cdd){
var _cde=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cdd);
return UserInterface.registerBinding(_cde,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cdf){
this._viewBinding=_cdf;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _ce0=DockTabBinding.superclass.serialize.call(this);
if(_ce0){
_ce0.label=null;
_ce0.image=null;
_ce0.handle=this.getHandle();
}
return _ce0;
};
DockTabBinding.prototype.setHandle=function(_ce1){
this.setProperty("handle",_ce1);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_ce2){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_ce2;
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
var _ce3=DialogControlBinding.newInstance(this.bindingDocument);
_ce3.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_ce3);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_ce4){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_ce4){
this.isDirty=_ce4;
if(Binding.exists(this.labelBinding)){
var _ce5=this.labelBinding.getLabel();
if(_ce5!=null){
this.labelBinding.setLabel(_ce4?"*"+_ce5:_ce5.slice(1,_ce5.length));
}else{
this.labelBinding.setLabel(_ce4?"*":"");
}
}
}
var _ce6=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_ce6.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_ce6.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_ce7){
this.setLabel(_ce7.getLabel());
this.setImage(_ce7.getImage());
this.setToolTip(_ce7.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_ce8){
this.setEntityToken(_ce8.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_ce9){
DockTabBinding.superclass.handleAction.call(this,_ce9);
var _cea=_ce9.target;
switch(_ce9.type){
case ControlBinding.ACTION_COMMAND:
if(_cea.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_ce9.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cea);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_ceb){
var cmd=_ceb.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_ced){
if(!_ced){
if(!this.getLabel()){
_ced=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_ced=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_ced);
};
DockTabBinding.prototype.setImage=function(_cee){
if(!_cee){
if(!this.getImage()){
_cee=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cee=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cee);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cf1=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cf1;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cf1;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cf1;
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
var _cf3=this.bindingElement;
setTimeout(function(){
_cf3.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cf4,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cf4,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cf4){
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
DockTabBinding.prototype.select=function(_cf9){
DockTabBinding.superclass.select.call(this,_cf9);
this._updateBroadcasters();
if(_cf9!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cfa=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cfb=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cfb.enable();
if(this.isDirty){
_cfa.enable();
}else{
_cfa.disable();
}
}else{
_cfb.disable();
_cfa.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cfc){
if(this._canUpdateTree||_cfc){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cfd=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cff=win.bindingMap.savebutton;
if(_cff!=null){
_cfd=true;
}
}
}
return _cfd;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d00){
var _d01=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d00);
return UserInterface.registerBinding(_d01,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d02){
var _d03=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d02);
return UserInterface.registerBinding(_d03,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d04){
DockPanelBinding.superclass.select.call(this,_d04);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d05){
DockPanelBinding.superclass.handleCrawler.call(this,_d05);
if(_d05.response==null){
if(_d05.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d05.id==FocusCrawler.ID){
_d05.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d06){
var _d07=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d06);
return UserInterface.registerBinding(_d07,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d08){
var _d09=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d08);
return UserInterface.registerBinding(_d09,DockControlBinding);
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
ViewBinding.getInstance=function(_d0a){
var _d0b=ViewBinding._instances.get(_d0a);
if(!_d0b){
var cry="ViewBinding.getInstance: No such instance: "+_d0a;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d0b;
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
var _d0e=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d0e){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d0f=snap.boxObject.getGlobalPosition();
var _d10=snap.boxObject.getDimension();
if(!Point.isEqual(_d0f,this._lastknownposition)){
this.setPosition(_d0f);
this._lastknownposition=_d0f;
}
if(!Dimension.isEqual(_d10,this._lastknowndimension)){
this.setDimension(_d10);
this._lastknowndimension=_d10;
var _d11=_d10.h-ViewBinding.VERTICAL_ADJUST;
_d11=_d11<0?0:_d11;
this.windowBinding.getBindingElement().style.height=new String(_d11)+"px";
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
var _d12=this._viewDefinition.flowHandle;
if(_d12!=null){
FlowControllerService.CancelFlow(_d12);
}
}
if(this._viewDefinition!=null){
var _d13=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d13);
this.logger.fine("ViewBinding closed: \""+_d13+"\"");
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
var _d15=null;
if(this._viewDefinition!=null){
_d15=this._viewDefinition.handle;
}
return _d15;
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
ViewBinding.prototype.setDefinition=function(_d16){
this._viewDefinition=_d16;
if(_d16.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d17){
ViewBinding.superclass.handleAction.call(this,_d17);
var _d18=_d17.target;
switch(_d17.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d17.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d18.isActivated){
_d18.onActivate();
}
}
_d17.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d18==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d17.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d18==this._snapBinding){
if(_d18.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d18.getContentWindow().isPostBackDocument){
if(_d17.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d18.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d18==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d18.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d17.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d17.type==WindowBinding.ACTION_ONLOAD){
var win=_d18.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d18);
}
}
}
_d17.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d18.label&&this._viewDefinition.label){
_d18.label=this._viewDefinition.label;
}
if(!_d18.image&&this._viewDefinition.image){
_d18.image=this._viewDefinition.image;
}
if(_d18.bindingWindow==this.getContentWindow()){
this._pageBinding=_d18;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d18.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d18==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d17.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d17.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d1d,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d1d,arg);
switch(_d1d){
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
var _d21=def.argument;
if(_d21!=null){
page.setPageArgument(_d21);
}
var _d22=def.width;
if(_d22!=null){
page.width=_d22;
}
var _d23=def.height;
if(_d23!=null){
page.height=_d23;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d24){
ViewBinding.superclass.handleCrawler.call(this,_d24);
switch(_d24.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d24.id==FocusCrawler.ID){
if(_d24.previousNode!=this._snapBinding.bindingElement){
_d24.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d24.nextNode=this._snapBinding.bindingElement;
}
break;
}
};
ViewBinding.prototype.show=function(){
if(!this.isVisible){
if(this.isFreeFloating==true){
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
this.isVisible=false;
}else{
ViewBinding.superclass.hide.call(this);
}
}
};
ViewBinding.prototype.setPosition=function(_d25){
_d25.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d25.x+"px";
this.bindingElement.style.top=_d25.y+"px";
};
ViewBinding.prototype.setDimension=function(_d26){
_d26.h-=ViewBinding.VERTICAL_ADJUST;
_d26.w-=ViewBinding.HORIZONTAL_ADJUST;
_d26.w-=1;
if(_d26.h<0){
_d26.h=0;
}
if(_d26.w<0){
_d26.w=0;
}
this.bindingElement.style.width=String(_d26.w)+"px";
this.bindingElement.style.height=String(_d26.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d27){
this.isFlexBoxBehavior=false;
_d27.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d27.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d27.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d27;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d28=null;
if(this.isFreeFloating==true){
_d28=this._snapBinding.getBindingElement();
}else{
_d28=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d28;
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
ViewBinding.prototype.reload=function(_d29){
this._isLoaded=false;
this.windowBinding.reload(_d29);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d2a=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d2a=true;
}
}
if(!_d2a){
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
ViewBinding.newInstance=function(_d2e){
var _d2f=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d2e);
var _d30=UserInterface.registerBinding(_d2f,ViewBinding);
_d30.windowBinding=_d30.add(WindowBinding.newInstance(_d2e));
_d30.windowBinding.isFlexible=false;
return _d30;
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
this.label=this.getProperty("label");
this.image=this.getProperty("image");
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
var _d38=this.bindingWindow.__doPostBack;
var _d39=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d39){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d3a,_d3b){
if(!form.__isSetup){
Application.lock(self);
_d39=true;
}
self.manifestAllDataBindings();
_d38(_d3a,_d3b);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d3c,list){
var _d3e=this.bindingWindow.bindingMap.__REQUEST;
if(_d3e!=null&&this._isDotNet()){
switch(_d3c){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d3e.postback(_d3c);
}
}
break;
default:
_d3e.postback(_d3c);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d3c,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d3f,list){
var _d41=this.getDescendantBindingsByType(WindowBinding);
_d41.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d3f,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d45){
if(_d45.name==null||_d45.name==""){
return;
}
list.add({name:_d45.name,value:_d45.value});
});
var out="";
list.each(function(_d47){
out+=_d47.name+": "+_d47.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d48){
PageBinding.superclass.handleAction.call(this,_d48);
var _d49=_d48.target;
switch(_d48.type){
case RootBinding.ACTION_PHASE_3:
if(_d49==UserInterface.getBinding(this.bindingDocument.body)){
_d49.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d49);
}
_d48.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d4a=this.validateAllDataBindings();
if(_d4a){
this.doPostBack(_d49);
}
}
_d48.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d48.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d49.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d49.key)){
this._initBlockers.del(_d49.key);
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
var _d4c={handleAction:function(_d4d){
if(_d4d.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d4c);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d4c);
}else{
MessageQueue.udpdate();
}
_d48.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d4e,arg){
PageBinding.superclass.handleBroadcast.call(this,_d4e,arg);
switch(_d4e){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d50=arg;
if(!this._canPostBack&&!_d50){
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
PageBinding.prototype.doPostBack=function(_d52){
if(this._canPostBack){
if(_d52!=null&&this._isDotNet()){
var _d53=_d52.getCallBackID();
var _d54=_d52.getCallBackArg();
if(_d53!=null){
_d53=_d53.replace(/_/g,"$");
}else{
_d53="";
}
if(_d54==null){
_d54="";
}
this.bindingWindow.__doPostBack(_d53,_d54);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d55){
var _d56=true;
var _d57=this.bindingWindow.DataManager.getAllDataBindings();
while(_d57.hasNext()&&_d56){
var _d58=_d57.getNext();
if(_d58.isAttached){
var _d59=_d58.validate();
if(_d56&&!_d59){
_d56=false;
this.logger.debug("Invalid DataBinding: "+_d58.toString()+" ("+_d58.getName()+")");
if(_d55){
var _d5a=_d58.getAncestorBindingByType(TabPanelBinding);
if(_d5a!=null&&!_d5a.isVisible){
var _d5b=_d5a.getAncestorBindingByType(TabBoxBinding);
var _d5c=_d5b.getTabBinding(_d5a);
_d5b.select(_d5c);
}
}
break;
}
}
}
return _d56;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d5e=this.bindingWindow.DataManager.getAllDataBindings();
while(_d5e.hasNext()){
var _d5f=_d5e.getNext();
if(_d5f.isAttached){
var _d60=_d5f.manifest();
if(_d60!=null){
list.add(_d60);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d61=this.bindingWindow.DataManager.getAllDataBindings();
while(_d61.hasNext()){
var _d62=_d61.getNext();
if(_d62.isAttached){
_d62.clean();
}
}
};
PageBinding.prototype.getLabel=function(){
return this.label;
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
var _d65=this._cachedFocus.getBinding();
if(_d65){
_d65.blur();
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
var _d66=this.getProperty("width");
if(!_d66){
_d66=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d66;
}
if(this.height==null){
var _d67=this.getProperty("height");
this.height=_d67?_d67:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d68=this.getProperty("minheight");
if(_d68!=null){
this.minheight=_d68;
}
}
if(this.controls==null){
var _d69=this.getProperty("controls");
this.controls=_d69?_d69:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d6a=this.getProperty("resizable");
this.isResizable=_d6a?_d6a:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d6b){
if(_d6b!=this.isAutoHeightLayoutMode){
if(_d6b){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d6b;
}
};
DialogPageBinding.prototype.handleAction=function(_d6c){
DialogPageBinding.superclass.handleAction.call(this,_d6c);
var _d6d=_d6c.target;
switch(_d6c.type){
case PageBinding.ACTION_ATTACHED:
if(_d6d!=this&&_d6d.isFitAsDialogSubPage){
_d6d.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d6c.consume();
if(_d6d.response!=null){
this.response=_d6d.response;
switch(_d6d.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d6e){
var _d6f=this.bindingWindow.bindingMap.buttonAccept;
if(_d6f!=null){
_d6f.setDisabled(_d6e);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d70){
var _d71=CSSComputer.getPadding(this.bindingElement);
var _d72=CSSComputer.getBorder(this.bindingElement);
_d70+=_d71.top+_d71.bottom;
_d70+=_d72.top+_d72.bottom;
if(_d70>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d70+"px";
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
EditorPageBinding.prototype.handleAction=function(_d7a){
EditorPageBinding.superclass.handleAction.call(this,_d7a);
var _d7b=_d7a.target;
switch(_d7a.type){
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
var _d7c=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d7b.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d7c==-1){
_d7c=0;
}
}else{
_d7c++;
}
return res;
});
if(_d7c>-1){
this._messengers.del(_d7c);
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
_d7a.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d7b.key,_d7b);
if(_d7b instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d7b.key);
if(_d7b instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d7b==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d7b.getSelectedTabBinding();
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
_d7a.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d7b==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d7a.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d7b==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d7a.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d7b==this._windowBinding){
if(_d7b.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d81=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d81);
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
var _d82=this.bindingWindow.bindingMap.savebutton;
if(_d82!=null&&!_d82.isDisabled){
_d82.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d83=this.bindingWindow.bindingMap.__REQUEST;
if(_d83!=null){
_d83.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d84=this.bindingWindow.bindingMap.__REQUEST;
if(_d84!=null){
_d84.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d85){
this._message=null;
switch(_d85){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d85,this._messengers);
if(!this._messengers.hasEntries()){
if(_d85==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d85;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d85;
EditorPageBinding.superclass.postMessage.call(this,_d85,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d85,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d86,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d86,arg);
switch(_d86){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d88=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d88);
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
var _d89=new List();
this._invalidBindings.each(function(key,_d8b){
var list=_d8b.getInvalidLabels();
if(list){
list.each(function(_d8d){
_d89.add(_d8d);
});
}
});
if(_d89.hasEntries()){
var _d8e="";
while(_d89.hasNext()){
_d8e+=_d89.getNext().toLowerCase();
if(_d89.hasNext()){
_d8e+=", ";
}else{
_d8e+=".";
}
}
var _d8f=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d8f+" "+_d8e);
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
EditorPageBinding.prototype.enableSave=function(_d90){
var _d91=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d91){
var _d92=UserInterface.getBinding(_d91);
if(_d90){
_d92.enable();
}else{
_d92.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d93=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d93!=null){
UserInterface.getBinding(_d93).enable();
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
var _d94=this._windowBinding.getContentDocument().title;
if(_d94==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d95=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d97){
if(_d97.name=="__EVENTTARGET"&&_d95){
_d97.value=_d95;
}
list.add({name:_d97.name,value:_d97.value});
});
var url=String(this.bindingDocument.location);
this._windowBinding.getContentWindow().submit(list,url);
this._latestPostbackList=list.reset();
}else{
this.handleInvalidData();
}
}
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
WizardPageBinding.prototype.handleAction=function(_d99){
WizardPageBinding.superclass.handleAction.call(this,_d99);
var _d9a=_d99.target;
switch(_d99.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d9a);
}else{
_d99.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d9a);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d99.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d99.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d9b){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d9d=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d9b);
}
if(_d9d){
_d9d.setDisabled(!_d9b);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d9e,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d9e,arg);
var self=this;
switch(_d9e){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_da2){
};
MarkupAwarePageBinding.prototype._activate=function(_da3){
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
var _da4=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_da4.boxObject.getDimension().w;
_da4.hide();
var _da5=this.boxObject.getDimension().h;
this.bindingElement.style.height=_da5+"px";
var self=this;
var _da7=this.bindingWindow.bindingMap.moreactionsbutton;
_da7.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_da8){
self._showMoreActions();
_da8.consume();
}});
var _da9=this.bindingWindow.bindingMap.moreactionspopup;
_da9.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_daa){
var item=_daa.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dac,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dac,arg);
switch(_dac){
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
var _db0=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_db0!=null){
_db0.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _db1=this.bindingWindow.WindowManager;
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
var _db2=new String("");
this._actionProfile.each(function(_db3,list){
list.each(function(_db5){
_db2+=_db5.getHandle()+";"+_db5.getKey()+";";
if(_db5.isDisabled()){
_db2+="isDisabled='true';";
}
});
});
return _db2;
};
SystemToolBarBinding.prototype.handleAction=function(_db6){
SystemToolBarBinding.superclass.handleAction.call(this,_db6);
switch(_db6.type){
case ButtonBinding.ACTION_COMMAND:
var _db7=_db6.target;
this._handleSystemAction(_db7.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_db8){
if(_db8!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dba=list.getFirst();
var _dbb=_dba.node;
}
SystemAction.invoke(_db8,_dbb);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dbe,list){
var _dc0=new List();
list.reset();
while(list.hasNext()){
var _dc1=list.getNext();
var _dc2=null;
if(_dc1.isInToolBar()){
if(_dc1.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dc2=self.getToolBarButtonBinding(_dc1);
}
}
if(_dc2!=null){
_dc0.add(_dc2);
}
}
if(_dc0.hasEntries()){
var _dc3=ToolBarGroupBinding.newInstance(doc);
_dc0.each(function(_dc4){
_dc3.add(_dc4);
});
self.addLeft(_dc3);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dc5=this.bindingWindow.bindingMap.toolsbutton;
var _dc6=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dc7=_dc5.bindingElement.offsetLeft-this._moreActionsWidth;
var _dc8=0;
var _dc9=new List();
var _dca,_dcb=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dca=_dcb.getNext())!=null){
if(!_dca.isVisible){
_dca.show();
}
_dc8+=_dca.boxObject.getDimension().w;
if(_dc8>=_dc7){
_dc9.add(_dca);
_dca.hide();
}
}
if(_dc9.hasEntries()){
var _dcc=_dc9.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dcc).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dca=_dc9.getNext())!=null){
this._moreActions.add(_dca.associatedSystemAction);
}
_dc6.show();
}else{
this._moreActions=null;
_dc6.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dcd=this.bindingWindow.bindingMap.moreactionspopup;
_dcd.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dcd.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dcd.add(item);
}
_dcd.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dcf){
var _dd0=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dd1=_dcf.getLabel();
var _dd2=_dcf.getToolTip();
var _dd3=_dcf.getImage();
var _dd4=_dcf.isDisabled();
if(_dd3&&_dd3.indexOf("size=")==-1){
_dd3=_dd3+"&size="+this.getImageSize();
_dd0.imageProfile=new ImageProfile({image:_dd3});
}
if(_dd1){
_dd0.setLabel(_dd1);
}
if(_dd2){
_dd0.setToolTip(_dd2);
}
if(_dcf.isDisabled()){
_dd0.disable();
}
_dd0.associatedSystemAction=_dcf;
return _dd0;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dd5=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dd5!=null){
_dd5.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dd6){
var _dd7=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dd6);
return UserInterface.registerBinding(_dd7,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dd8){
var _dd9=SystemTreeBinding.superclass.add.call(this,_dd8);
if(!this._defaultTreeNode){
if(_dd8 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dd8;
}
}
return _dd9;
};
SystemTreeBinding.prototype.handleAction=function(_dda){
SystemTreeBinding.superclass.handleAction.call(this,_dda);
var _ddb=_dda.target;
switch(_dda.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_ddb.key);
this._updateFocusedNode();
_dda.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dda.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_ddb.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dda.consume();
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
var _ddd=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_ddd);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_dde){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_dde);
var reg=this._entityTokenRegistry;
var _de0=_dde.node.getEntityToken();
if(reg.has(_de0)){
reg.get(_de0).add(_dde);
}else{
reg.set(_de0,new List([_dde]));
}
var _de1=null;
if(this.isLockedToEditor){
if(_de0==StageBinding.entityToken){
if(_dde.node.isTreeLockEnabled()){
_de1=_dde;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_dde.node.getHandle()){
_de1=_dde;
}
}
}
if(_de1!=null){
this.focusSingleTreeNodeBinding(_de1);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_de2){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_de2);
var reg=this._entityTokenRegistry;
var _de4=_de2.node.getEntityToken();
if(reg.has(_de4)){
var list=reg.get(_de4);
list.del(_de2);
if(!list.hasEntries()){
reg.del(_de4);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_de2.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_de2.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _de8=this._refreshingTreeNodes;
if(_de8.hasEntries()&&_de8.has(key)){
_de8.del(key);
if(!_de8.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _de9=StageBinding.entityToken;
if(_de9!=null){
this._focusTreeNodeByEntityToken(_de9);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _dea=false;
var _deb=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_dea=false;
}else{
if(_deb.hasEntries()){
_dea=true;
while(_dea&&_deb.hasNext()){
var _dec=_deb.getNext();
if(!_dec.isDraggable){
_dea=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_dea;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_ded,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_ded,arg);
switch(_ded){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_ded,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_ded);
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
var self=this,_df1=arg;
setTimeout(function(){
if(_df1!=null){
self._focusTreeNodeByEntityToken(_df1);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _df3=tab.perspectiveNode==null;
if(!_df3){
_df3=tab.perspectiveNode==this.perspectiveNode;
}
if(_df3){
var self=this,_df5=tab.getEntityToken();
setTimeout(function(){
if(_df5==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_df5);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_df6,_df7){
this.isLockFeatureFocus=true;
var _df8=null;
if(this._entityTokenRegistry.has(_df6)){
var list=this._entityTokenRegistry.get(_df6);
list.each(function(tn){
var _dfb=true;
if(tn.node.isTreeLockEnabled()){
_df8=tn;
_dfb=false;
}
return _dfb;
});
if(_df8!=null){
if(!_df8.isFocused){
this.focusSingleTreeNodeBinding(_df8,true);
}else{
_df8.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_df8==null&&_df7!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_df6);
self._focusTreeNodeByEntityToken(_df6,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_dfd){
var _dfe=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _dff=this.getRootTreeNodeBindings();
while(_dff.hasNext()){
var _e00=_dff.getNext();
_dfe.add(_e00.node.getEntityToken());
}
}else{
_dfe.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_dfe.hasNext()){
var _e01=_dfe.getNext();
var _e02=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e01,_dfd,_e02);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e05=this._treeNodeBindings;
var _e06=new Map();
function fix(_e07,list){
if(!_e07.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e05.has(node.getHandle())){
var _e0a=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e06.set(node.getHandle(),_e0a);
_e07.add(_e0a);
}
});
_e07.attachRecursive();
}
}
_e07.open(true);
}
map.each(function(_e0b,list){
if(_e05.has(_e0b)){
var _e0d=_e05.get(_e0b);
fix(_e0d,list);
}else{
if(_e06.has(_e0b)){
var _e0e=_e06.get(_e0b);
fix(_e0e,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e0f,arg){
switch(_e0f){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e11=arg;
if(_e11!=null){
this._invokeServerRefresh(_e11);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e12=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e12;
_e12.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e12=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e12;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e13){
if(_e13!=null&&_e13=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e13)){
var list=this._entityTokenRegistry.get(_e13).reset();
this._refreshToken=_e13;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e15=list.getNext();
this._refreshingTreeNodes.set(_e15.key,true);
setTimeout(function(){
_e15.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e16=this.getFocusedTreeNodeBindings().getFirst();
if(_e16){
var _e17=_e16.getLabel();
var _e18=_e16.getAncestorBindingByLocalName("treenode");
if(_e18){
_e16=_e18;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e16.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e19=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e19,[_e17]);
}
_e16.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e1a=SystemTreeBinding.clipboard;
if(_e1a){
var type=_e1a.dragType;
var _e1c=this.getFocusedTreeNodeBindings().getFirst();
if(_e1c.dragAccept){
if(_e1c.acceptor.isAccepting(type)){
this._performPaste(_e1c);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e1d){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e1d.node.hasDetailedDropSupport()){
if(_e1d.node.hasChildren()){
var _e1f=_e1d.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e20,_e21){
if(_e20==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e22=_e21.get("switch");
var _e23=_e21.get("sibling");
if(_e22=="after"){
_e23++;
}
var _e24=_e1d.accept(SystemTreeBinding.clipboard,_e23);
if(_e24){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e1f);
}else{
Application.lock(self);
var _e25=_e1d.accept(SystemTreeBinding.clipboard,0);
if(_e25){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e25=_e1d.accept(SystemTreeBinding.clipboard,0);
if(_e25){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e26=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e26!=null){
this._focusTreeNodeByEntityToken(_e26);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e27){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e27){
this.blurSelectedTreeNodes();
var _e28=this.getRootTreeNodeBindings();
_e28.each(function(_e29){
if(_e29.isContainer&&_e29.isOpen){
_e29.close();
_e29.hasBeenOpened=false;
_e29.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e2a){
if(_e2a!=this.isLockedToEditor){
this.isLockedToEditor=_e2a;
if(_e2a){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e2c=this.getRootTreeNodeBindings();
_e2c.each(function(_e2d){
var _e2e=_e2d.getOpenSystemNodes();
if(_e2e!=null&&_e2e.hasEntries()){
list.merge(_e2e);
}else{
if(_e2d.isOpen){
list.add(_e2d.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e2f){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e2f);
if(_e2f!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e30=new Map();
var _e31=this.getFocusedTreeNodeBindings();
var _e32=_e31.getFirst().node.getActionProfile();
if(_e32!=null){
var self=this;
_e32.each(function(_e34,list){
var _e36=new List();
list.each(function(_e37){
if(_e37.getActivePositions()&self._activePosition){
_e36.add(_e37);
}
});
if(_e36.hasEntries()){
_e30.set(_e34,_e36);
}
});
}
_e30.activePosition=this._activePosition;
return _e30;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e38,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e38,arg);
switch(_e38){
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
var _e3d=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e3d.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e3e=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e3e.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e3f){
SystemTreePopupBinding.superclass.handleAction.call(this,_e3f);
switch(_e3f.type){
case MenuItemBinding.ACTION_COMMAND:
var _e40=_e3f.target;
var _e41=_e40.associatedSystemAction;
if(_e41){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e43=list.getFirst();
var _e44=_e43.node;
}
SystemAction.invoke(_e41,_e44);
}else{
var cmd=_e40.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e47=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e47=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e47=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e47=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e47=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e47){
setTimeout(function(){
EventBroadcaster.broadcast(_e47);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e48=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e48.hasNext()){
var _e49=UserInterface.getBinding(_e48.getNext());
if(!_e49.getProperty("rel")){
_e49.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e4b=new List();
var self=this;
this._actionProfile.each(function(_e4d,list){
var _e4f=MenuGroupBinding.newInstance(doc);
list.each(function(_e50){
var _e51=self.getMenuItemBinding(_e50);
_e4f.add(_e51);
});
_e4b.add(_e4f);
});
_e4b.reverse();
while(_e4b.hasNext()){
this._bodyBinding.addFirst(_e4b.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e52){
var _e53=MenuItemBinding.newInstance(this.bindingDocument);
var _e54=_e52.getLabel();
var _e55=_e52.getToolTip();
var _e56=_e52.getImage();
var _e57=_e52.getDisabledImage();
var _e58=_e52.isCheckBox();
if(_e54){
_e53.setLabel(_e54);
}
if(_e55){
_e53.setToolTip(_e55);
}
if(_e56){
_e53.imageProfile=new ImageProfile({image:_e56,imageDisabled:_e57});
}
if(_e58){
_e53.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e52.isChecked()){
_e53.check(true);
}
}
if(_e52.isDisabled()){
_e53.disable();
}
_e53.associatedSystemAction=_e52;
return _e53;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e5c=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e5c=UserInterface.getBinding(node);
if(_e5c.isDisabled){
_e5c=null;
}
}
break;
}
if(_e5c!=null&&_e5c.node!=null&&_e5c.node.getActionProfile()!=null){
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
var _e5d=this.node.getLabel();
if(_e5d){
this.setLabel(_e5d);
}
var _e5e=this.node.getToolTip();
if(_e5e){
this.setToolTip(_e5e);
}
var _e5f=this.node.getHandle();
if(_e5f){
this.setHandle(_e5f);
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
var _e62="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e62+=list.getNext();
if(list.hasNext()){
_e62+=" ";
}
}
this.setProperty("dragaccept",_e62);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e64){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e64);
switch(_e64.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e64.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e64.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e65,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e65,arg);
switch(_e65){
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
var _e68=null;
var _e69=this.node.getImageProfile();
if(_e69){
if(this.isOpen){
_e68=_e69.getActiveImage();
}else{
_e68=_e69.getDefaultImage();
}
}
if(!_e68){
_e68=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e68;
};
SystemTreeNodeBinding.prototype.open=function(_e6a){
var _e6b=this.isContainer&&!this.isOpen;
var _e6c=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e6b&&(_e6c||SystemTreeBinding.HAS_NO_MEMORY)&&_e6a!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e6d=null;
if(this.isContainer){
_e6d=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e6d);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e6f){
if(_e6f!=null){
this._refreshBranch(_e6f);
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
var _e70=new List();
var _e71=this.node.getChildren();
this.empty();
if(_e71.hasEntries()){
this._insertTreeNodesRegulated(_e71);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e72){
var _e73=0;
var _e74=new List([]);
while(_e72.hasEntries()&&_e73<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e75=SystemTreeNodeBinding.newInstance(_e72.extractFirst(),this.bindingDocument);
_e75.autoExpand=this.autoExpand;
this.add(_e75);
_e75.attach();
_e73++;
if(this.autoExpand){
if(_e73==1&&!_e72.hasEntries()||LastOpenedSystemNodes.isOpen(_e75)){
_e74.add(_e75);
}
}
}
if(_e72.hasEntries()){
this._insertBufferTreeNode(_e72);
}
_e74.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e78){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e7a=this.node.getDescendantBranch(list);
if(_e7a.hasEntries()){
this.XXX(_e7a);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e7b){
var self=this;
var map=new Map();
this.empty();
_e7b.each(function(key,_e7f){
if(_e7f.hasEntries()){
_e7f.each(function(node){
var _e81=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e81);
if(map.has(key)){
var _e82=map.get(key);
_e82.add(_e81);
_e82.isOpen=true;
_e82.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e81);
}else{
}
}
});
}
});
this.attachRecursive();
_e7b.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e83=new TreeCrawler();
var _e84=new List();
_e83.mode=TreeCrawler.MODE_GETOPEN;
_e83.crawl(this.bindingElement,_e84);
if(_e84.hasEntries()){
_e84.extractFirst();
}
_e83.dispose();
return _e84;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e85=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e85=new List([this.node]);
list.each(function(_e87){
_e85.add(_e87.node);
});
}
return _e85;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e88,_e89){
var _e8a=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e88 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e88.node.getData(),this.node.getData(),_e89?_e89:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e8a);
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
SystemTreeNodeBinding.newInstance=function(node,_e8e){
var _e8f=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e8e);
var _e90=UserInterface.registerBinding(_e8f,SystemTreeNodeBinding);
_e90.node=node;
return _e90;
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
SystemPageBinding.prototype.setPageArgument=function(_e91){
this.node=_e91;
SystemPageBinding.superclass.setPageArgument.call(this,_e91);
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
var _e92=this.node.getChildren();
if(_e92.hasEntries()){
while(_e92.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e92.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e94=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e94.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e96=new TreeCrawler();
var _e97=new List();
_e96.mode=TreeCrawler.MODE_GETOPEN;
_e96.crawl(this.bindingElement,_e97);
_e96.dispose();
var list=new List([this.node]);
_e97.each(function(_e99){
list.add(_e99.node);
});
this._tree.empty();
var _e9a=this.node.getDescendantBranch(list);
if(_e9a.hasEntries()){
var self=this;
var map=new Map();
_e9a.each(function(key,_e9e){
_e9e.each(function(node){
var _ea0=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ea0);
if(map.has(key)){
var _ea1=map.get(key);
_ea1.add(_ea0);
_ea1.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ea0);
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
SystemPageBinding.prototype.handleAction=function(_ea2){
SystemPageBinding.superclass.handleAction.call(this,_ea2);
switch(_ea2.type){
case ButtonBinding.ACTION_COMMAND:
var _ea3=_ea2.target;
switch(_ea3.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ea3.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ea4,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ea4,arg);
switch(_ea4){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ea6=arg;
if(this.node&&this.node.getEntityToken()==_ea6){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ea6);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ea6);
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
StageContainerBinding.prototype.handleBroadcast=function(_ea8,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ea8,arg);
var _eaa=this.bindingWindow.WindowManager;
switch(_ea8){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_eaa.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _eaa.WINDOW_RESIZED_BROADCAST:
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
var _eac=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eac.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_ead){
if(StageBinding.isViewOpen(_ead)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ead);
}else{
var _eae=ViewDefinitions[_ead];
StageBinding.presentViewDefinition(_eae);
}
};
StageBinding.isViewOpen=function(_eaf){
return StageBinding.bindingInstance._activeViewDefinitions[_eaf]!=null;
};
StageBinding.presentViewDefinition=function(_eb0){
if(_eb0.label!=null){
var _eb1=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_eb1,[_eb0.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_eb0);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_eb3,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _eb5=System.getPerspectiveNodes();
if(_eb5.hasEntries()){
this._initializeSystemViewDefinitions(_eb5);
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
var _eb7=null;
if(LocalStore.isEnabled){
_eb7=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_eb7&&ViewDefinitions[_eb7]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_eb7));
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
var _eb9=root.getActionProfile();
if(_eb9&&_eb9.hasEntries()){
var _eba=top.app.bindingMap.toolsmenugroup;
if(_eba){
_eb9.each(function(_ebb,list){
list.each(function(_ebd){
var item=MenuItemBinding.newInstance(_eba.bindingDocument);
item.setLabel(_ebd.getLabel());
item.setToolTip(_ebd.getToolTip());
item.setImage(_ebd.getImage());
item.setDisabled(_ebd.isDisabled());
item.associatedSystemAction=_ebd;
var _ebf=_eba;
var tag=_ebd.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ebf=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ebf.add(item);
});
});
_eba.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ec1){
while(_ec1.hasNext()){
var node=_ec1.getNext();
var _ec3=node.getHandle();
ViewDefinitions[_ec3]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ec4){
StageBinding.superclass.handleAction.call(this,_ec4);
var _ec5=_ec4.target;
switch(_ec4.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ec5;
this._inflateBinding(_ec5);
_ec4.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ec5;
this._inflateBinding(_ec5);
_ec4.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ec5);
_ec4.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ec5 instanceof DockBinding){
switch(_ec5.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ec5.reference,_ec5);
break;
}
this.handleAttachedDock(_ec5);
_ec4.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ec5 instanceof DockBinding){
this.handleSelectedDockTab(_ec5.getSelectedTabBinding());
_ec4.consume();
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
_ec4.consume();
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
_ec4.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ec4);
};
StageBinding.prototype.handleBroadcast=function(_ec7,arg){
StageBinding.superclass.handleBroadcast.call(this,_ec7,arg);
switch(_ec7){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ec9=arg;
this._dontView(_ec9);
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
StageBinding.prototype._showStart=function(_ecb){
if(_ecb!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ece=this.bindingWindow.bindingMap.maindecks;
if(_ecb){
_ece.select("startdeck");
view.show();
}else{
view.hide();
_ece.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ecb;
}
};
StageBinding.prototype._inflateBinding=function(_ecf){
for(var _ed0 in ViewDefinitions){
var _ed1=ViewDefinitions[_ed0];
if(_ed1 instanceof SystemViewDefinition){
_ecf.mountDefinition(_ed1);
}
}
var _ed2=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ed2){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ed5=new StageCrawler();
_ed5.mode=mode;
_ed5.crawl(this.bindingElement);
_ed5.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ed6){
var _ed7=_ed6.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ed7);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ed7));
}
};
StageBinding.prototype.handleAttachedDock=function(_ed8){
var _ed9=_ed8.getTabBindings();
if(_ed9.hasEntries()){
while(_ed9.hasNext()){
var _eda=_ed9.getNext();
var _edb=_eda.getHandle();
if(_edb){
if(_edb=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _edc=ViewDefinitions[_edb];
if(_edc){
this._view(_ed8,_eda,_edc,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_edb+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_edd){
var _ede=null;
var _edf=false;
switch(_edd.position){
case Dialog.MODAL:
_ede=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ede=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_edd.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ede=this._dockBindings.get(_edd.position);
break;
case DockBinding.EXTERNAL:
window.open(_edd.url);
_edf=true;
break;
default:
var _ee0=this._decksBinding.getSelectedDeckBinding();
_ede=_ee0.getDockBindingByReference(_edd.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ee1=this.bindingWindow.bindingMap.maindecks;
_ee1.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_edf=true;
}
break;
}
if(!_edf){
if(_ede!=null){
this._view(_ede,null,_edd,true);
}else{
throw "StageBinding: Could not position view: "+_edd.handle;
}
}
};
StageBinding.prototype._view=function(_ee2,_ee3,_ee4,_ee5){
var _ee6=_ee4.handle;
if(_ee4.isMutable){
_ee6+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ee6]){
var _ee7=ViewBinding.getInstance(_ee6);
if(_ee7!=null){
_ee7.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ee6);
}
}else{
this._activeViewDefinitions[_ee6]=_ee4;
Application.lock(this);
switch(_ee2.constructor){
case DockBinding:
if(_ee5){
_ee2.prepareNewView(_ee4);
}else{
_ee2.prepareOpenView(_ee4,_ee3);
}
break;
case StageDialogBinding:
if(_ee5){
_ee2.prepareNewView(_ee4);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ee8){
if(this._activeViewDefinitions[_ee8]!=null){
delete this._activeViewDefinitions[_ee8];
}else{
this.logger.debug("Could not unregister active view: "+_ee8);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ee9){
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
this.addFilter(function(_eeb){
var _eec=UserInterface.getBinding(_eeb);
var _eed=null;
if(_eec){
switch(_eec.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_eec.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_eec.handleUnMaximization();
break;
}
break;
case DockBinding:
_eed=NodeCrawler.SKIP_NODE;
break;
}
}
return _eed;
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
var _eee=null;
this._dialogs.each(function(_eef){
if(!_eef.isVisible){
_eee=_eef;
}
return _eee!=null;
});
if(!_eee){
this._newInstance();
_eee=this._dialogs.getLast();
}
_eee.setModal(false);
return _eee;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _ef0=this.getInstance();
_ef0.setModal(true);
return _ef0;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _ef1=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_ef1);
_ef1.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ef2){
if(_ef2 instanceof DialogViewDefinition){
var _ef3=ViewBinding.newInstance(this.bindingDocument);
_ef3.setDefinition(_ef2);
_ef3.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ef2.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ef2.handler)){
this._dialogResponseHandler=_ef2.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ef3;
this._body.add(_ef3);
_ef3.attach();
_ef3.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ef4){
StageDialogBinding.superclass.handleAction.call(this,_ef4);
var _ef5=_ef4.target;
switch(_ef4.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ef5);
_ef4.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ef5.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ef4.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ef5.response){
this._handleDialogPageResponse(_ef5);
}
_ef4.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ef4.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ef4.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ef5.dispose();
_ef4.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ef4.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ef4.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ef4.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ef4.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ef4.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ef5==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ef6,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ef6,arg);
switch(_ef6){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_ef8){
var _ef9=new FitnessCrawler();
var list=new List();
if(_ef8){
_ef9.mode=FitnessCrawler.MODE_BRUTAL;
}
_ef9.crawl(this.bindingElement,list);
_ef9.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_efb){
_efb.fit(_ef8);
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
var _efc=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_efc){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_efe){
var cmd=_efe.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f00){
if(_f00.bindingDocument==this._viewBinding.getContentDocument()){
if(_f00 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f00);
}
this._pageBinding=_f00;
if(_f00.height=="auto"){
_f00.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f00);
_f00.enableAutoHeightLayoutMode(false);
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
if(_f00.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f00);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f01){
var _f02=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f02){
var _f03=UserInterface.getBinding(_f02);
_f03.setDisabled(_f01);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f04){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f04.response,_f04.result!=null?_f04.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f06){
if(_f06.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f06);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f08){
switch(_f08.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f08.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f08.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f09){
var _f0a=_f09.label;
var _f0b=_f09.image;
var _f0c=_f09.width;
var _f0d=_f09.height;
var _f0e=_f09.controls;
var _f0f=_f09.isResizable;
if(_f0a){
this.setLabel(_f0a);
}
if(_f0b){
this.setImage(_f0b);
}
if(_f0c||_f0d){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f0c?_f0c:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f0d!=null&&_f0d!="auto")?_f0d:old.h;
this.setDimension(nev);
}
if(_f0e){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f13=new List(_f0e.split(" "));
while((type=_f13.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f0f!=this._isResizable){
this.setResizable(_f0f);
}
if(_f0d=="auto"){
this._fixAutoHeight(_f09);
}
if(_f09==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f14){
var dim=this.getDimension();
var _f16=0;
var _f17=0;
if(_f14.isDialogSubPage){
_f14=this._pageBinding;
}
if(this._isFirstPage){
_f16=_f14.width!=null?_f14.width:dim.w;
}else{
_f16=dim.w;
}
_f17=_f14.bindingElement.offsetHeight;
_f17+=this._titlebar.bindingElement.offsetHeight;
_f17+=4;
if(_f17<dim.h){
_f17=dim.h;
}
if(_f14.minheight!=null){
if(_f17<_f14.minheight){
_f17=_f14.minheight;
}
}
this.setDimension(new Dimension(_f16,_f17));
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
StageDialogBinding.newInstance=function(_f1a){
var _f1b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f1a);
var _f1c=UserInterface.registerBinding(_f1b,StageDialogBinding);
_f1c.setProperty("controls","minimize maximize close");
return _f1c;
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
this.addFilter(function(_f1d,list){
var _f1f=null;
var _f20=UserInterface.getBinding(_f1d);
if(!_f20.isVisible){
_f1f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f1f;
});
this.addFilter(function(_f21,list){
var _f23=null;
var _f24=UserInterface.getBinding(_f21);
if(_f24.isAttached){
if(Interfaces.isImplemented(IFit,_f24)){
if(!_f24.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f24);
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
StageDecksBinding.prototype.mountDefinition=function(_f25){
var _f26=StageDeckBinding.newInstance(this.bindingDocument);
_f26.handle=_f25.handle;
_f26.perspectiveNode=_f25.node;
this._decks[_f26.handle]=_f26;
this.add(_f26);
_f26.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f27){
var _f28=this._decks[_f27];
StageBinding.perspectiveNode=_f28.perspectiveNode;
this.select(_f28);
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
StageDeckBinding.prototype.handleAction=function(_f29){
StageDeckBinding.superclass.handleAction.call(this,_f29);
var _f2a=_f29.target;
switch(_f29.type){
case WindowBinding.ACTION_LOADED:
if(_f2a==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f29.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f2a instanceof DockBinding){
this._dockBindings.set(_f2a.reference,_f2a);
_f2a.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f29.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f29.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f29);
StageDeckBinding.superclass.handleAction.call(this,_f29);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f2c=new StageCrawler();
_f2c.mode=mode;
_f2c.crawl(this.windowBinding.getContentDocument().body);
_f2c.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f2d){
return this._dockBindings.get(_f2d);
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
StageDeckBinding.newInstance=function(_f2f){
var _f30=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f2f);
var _f31=UserInterface.registerBinding(_f30,StageDeckBinding);
return _f31;
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
StageSplitBoxBinding.prototype.handleAction=function(_f32){
StageSplitBoxBinding.superclass.handleAction.call(this,_f32);
StageBoxAbstraction.handleAction.call(this,_f32);
var _f33=_f32.target;
var _f34=null;
var _f35=null;
switch(_f32.type){
case DockBinding.ACTION_EMPTIED:
_f35=this.getChildBindingByLocalName("splitter");
if(_f35.isVisible){
_f35.hide();
}
_f34=this.getDescendantBindingsByLocalName("dock");
if(_f34.getFirst().isEmpty&&_f34.getLast().isEmpty){
if(_f34.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f32.consume();
break;
case DockBinding.ACTION_OPENED:
_f34=this.getDescendantBindingsByLocalName("dock");
if(!_f34.getFirst().isEmpty&&!_f34.getLast().isEmpty){
_f35=this.getChildBindingByLocalName("splitter");
if(!_f35.isVisible){
_f35.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f32.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f33!=this){
_f35=this.getChildBindingByLocalName("splitter");
if(_f35.isVisible){
_f35.hide();
}
this.invokeLayout();
_f32.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f33!=this){
var _f36=this.getChildBindingsByLocalName("splitpanel");
if(_f36.getFirst().isVisible&&_f36.getLast().isVisible){
_f35=this.getChildBindingByLocalName("splitter");
if(!_f35.isVisible){
_f35.show();
}
}
this.invokeLayout();
_f32.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f37){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f37);
switch(_f37.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f37.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f38=this.getChildBindingsByLocalName("splitpanel");
return _f38.getFirst().isVisible&&_f38.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f39=this.getChildBindingsByLocalName("splitpanel");
return _f39.getFirst().isFixed&&_f39.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f3a){
StageSplitPanelBinding.superclass.handleAction.call(this,_f3a);
StageBoxAbstraction.handleAction.call(this,_f3a);
switch(_f3a.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f3a.type==StageSplitBoxBinding.ACTION_HIDE){
_f3a.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f3a.type==DockBinding.ACTION_EMPTIED){
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
if(_f3a.type==StageSplitBoxBinding.ACTION_SHOW){
_f3a.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f3d=_f3a.target;
if(_f3d!=this&&_f3d.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f3e=_f3d._containingSplitBoxBinding;
if(_f3e.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f3f=_f3e.getChildBindingsByLocalName("splitpanel");
var _f40=_f3f.getFirst();
var _f41=_f3f.getLast();
if(this.isFixed==true){
if(!_f40.isFixed||!_f41.isFixed||(!_f3e.hasBothPanelsVisible()&&_f3d.isMinimizedForReal)){
this.setFix(false);
_f3a.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f3e.hasBothPanelsFixed()||(!_f3e.hasBothPanelsVisible()&&_f3d.isMinimizedForReal)){
this.setFix(_f3d.getContainedDock().getHeight());
_f3a.consume();
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
var _f42=this.getContainedDock();
if(_f42){
if(this.isMaximizePrepared==true){
}else{
_f42.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f43=this.getContainedDock();
if(_f43){
if(_f43.type==DockBinding.TYPE_EDITORS){
if(_f43.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f43.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f44=this.getContainedDock();
if(_f44){
_f44.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f44);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f45=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f46=this.getContainedDock();
if(_f46){
_f46.collapse(_f45);
if(!_f45){
this.setFix(_f46.getHeight());
}else{
this.setFix(_f46.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f46&&_f46.isActive){
_f46.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f46);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f47){
var _f48=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f49=this.getContainedDock();
if(_f49){
if(this.isMinimized==true){
_f49.unCollapse(_f48);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f47){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f49){
_f49.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f49);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f4a){
var _f4b=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f4b=false;
}
}
if(_f4b==true){
this._invisibilize(_f4a);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f4d){
if(_f4d!=this._isInvisibilized){
if(_f4d){
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
StageSplitterBinding.prototype.onDragStart=function(_f4e){
var _f4f=top.app.bindingMap.stagesplittercover;
var _f50=this._containingSplitBoxBinding.getOrient();
switch(_f50){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f4f.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f4f.bindingElement.style.cursor="n-resize";
break;
}
_f4f.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f50);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f56){
this._orient=_f56;
this.attachClassName(_f56);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f58=true;
var _f59=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f59=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f58=false;
break;
}
if(_f58){
this.bindingElement.style.left=pos.x+"px";
}
if(_f59){
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
StageBoxAbstraction.handleAction=function(_f5b){
switch(_f5b.type){
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
if(_f5b.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f5b.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f5c=this.bindingElement.style;
_f5c.position="absolute";
_f5c.width="100%";
_f5c.height="100%";
_f5c.top="0";
_f5c.left="0";
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
var _f5d=this.bindingElement.style;
_f5d.position="relative";
_f5d.width="auto";
_f5d.height="auto";
_f5d.top="auto";
_f5d.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f5e,_f5f){
var _f60=_f5e.bindingElement.style;
var _f61=_f5e.bindingElement.parentNode;
var box=_f5e._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f5f){
_f5e._unmodifiedFlexMethod=_f5e.flex;
_f5e.flex=function(){
_f60.width=_f61.offsetWidth+"px";
_f60.height=_f61.offsetHeight+"px";
};
}else{
_f60.width="100%";
_f60.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f60.width="auto";
_f60.height="auto";
box.reflex(true);
},0);
}
_f5e.flex=_f5e._unmodifiedFlexMethod;
_f5e._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f63){
var _f64=_f63.target;
switch(_f63.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f64 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f63);
_f63.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f63.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f65){
var mode=null;
switch(_f65.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f67){
StageMenuBarBinding.superclass.handleAction.call(this,_f67);
switch(_f67.type){
case MenuItemBinding.ACTION_COMMAND:
var _f68=_f67.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f68){
SystemAction.invoke(_f68,this._rootNode);
}
}
_f67.consume();
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
var _f69=this.getProperty("handle");
if(_f69){
this._handle=_f69;
if(StageBinding.isViewOpen(_f69)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f69);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f6b){
this.setProperty("handle",_f6b);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f6c,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f6c,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f6c){
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
StageViewMenuItemBinding.newInstance=function(_f6e){
var _f6f=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f6e);
UserInterface.registerBinding(_f6f,StageViewMenuItemBinding);
return UserInterface.getBinding(_f6f);
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
StageStatusBarBinding.prototype.setLabel=function(_f70){
this._label.setLabel(_f70);
};
StageStatusBarBinding.prototype.setImage=function(_f71){
this._label.setImage(_f71);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f72){
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
var _f73=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f74=_f73.getAssociatedView();
var _f75=_f74.getContentWindow().bindingMap.tree;
var _f76=_f75.getFocusedTreeNodeBindings();
if(!_f76.hasEntries()&&StageBinding.treeSelector){
_f76=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f76;
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
ExplorerBinding.prototype.handleAction=function(_f77){
ExplorerBinding.superclass.handleAction.call(this,_f77);
var _f78=_f77.target;
switch(_f77.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f77.consume();
break;
case Binding.ACTION_DRAG:
if(_f78 instanceof ExplorerSplitterBinding){
_f78.dragger.registerHandler(this);
}
_f77.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f7a){
this._menuBinding.setSelectionByHandle(_f7a);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f7b){
if(_f7b instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f7b);
this._menuBinding.mountDefinition(_f7b);
}
};
ExplorerBinding.prototype.onDragStart=function(_f7c){
var _f7d=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f7d.hasEntries()){
var _f7e=_f7d.getFirst();
this._dragStart=_f7e.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f7e.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f82){
if(_f82 instanceof SystemViewDefinition){
var _f83=ViewBinding.newInstance(this.bindingDocument);
_f83.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f83.setDefinition(_f82);
var _f84=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f84.setAssociatedView(_f83);
this._decks[_f82.handle]=_f84;
_f84.add(_f83);
this.add(_f84);
function attach(){
_f84.attach();
_f83.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f85){
var _f86=this._decks[_f85];
this.select(_f86);
};
DecksBinding.prototype.expandBy=function(_f87){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f89=this.bindingElement.offsetHeight+_f87;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f89+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f8b){
var _f8c=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f8b);
return UserInterface.registerBinding(_f8c,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f8d){
this._viewBinding=_f8d;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f8e=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f8f=this._viewBinding.getDefinition().label;
StatusBar.busy(_f8e,[_f8f]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f90){
ExplorerDeckBinding.superclass.handleAction.call(this,_f90);
var _f91=_f90.target;
switch(_f90.type){
case PageBinding.ACTION_INITIALIZED:
if(_f91 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f91.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f92,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f92,arg);
switch(_f92){
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
var _f94=null;
if(this._isExplorerDeckBindingInitialized){
_f94=this._viewBinding.getDefinition().label;
}else{
_f94=DockTabBinding.LABEL_TABLOADING;
}
return _f94;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f95=null;
if(this._isExplorerDeckBindingInitialized){
_f95=this._viewBinding.getDefinition().image;
}else{
_f95=DockTabBinding.IMG_TABLOADING;
}
return _f95;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f96=null;
if(this._isExplorerDeckBindingInitialized){
_f96=this._viewBinding.getDefinition().toolTip;
}
return _f96;
};
ExplorerDeckBinding.newInstance=function(_f97){
var _f98=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f97);
return UserInterface.registerBinding(_f98,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f99){
switch(_f99.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f99.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f99.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f99);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f9a){
this._maxButtons.set(_f9a.handle,this._mountMaxButton(_f9a));
this._minButtons.set(_f9a.handle,this._mountMinButton(_f9a));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f9b){
var _f9c=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f9c.setLabel(_f9b.label);
_f9c.setToolTip(_f9b.toolTip);
_f9c.handle=_f9b.handle;
_f9c.node=_f9b.node;
this._maxGroup.add(_f9c);
this._maxList.add(_f9c);
_f9c.attach();
return _f9c;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f9d){
var _f9e=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f9e.setLabel(_f9d.label);
_f9e.setToolTip(_f9d.label);
_f9e.handle=_f9d.handle;
_f9e.node=_f9d.node;
this._minGroup.addFirst(_f9e);
this._minList.add(_f9e);
_f9e.attach();
_f9e.hide();
return _f9e;
};
ExplorerMenuBinding.prototype.handleAction=function(_f9f){
ExplorerMenuBinding.superclass.handleAction.call(this,_f9f);
switch(_f9f.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fa0=_f9f.target;
var _fa1=_fa0.getCheckedButtonBinding();
var _fa2=_fa1.handle;
switch(_fa0){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fa2),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fa2),true);
break;
}
this._selectedHandle=_fa2;
this._selectedTag=_fa1.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f9f.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fa3){
var _fa4=this._maxButtons.get(_fa3);
if(_fa4){
_fa4.check();
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
var _fa5=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fa5=true;
}
return _fa5;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fa7=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fa7=true;
}
return _fa7;
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
ExplorerToolBarBinding.newInstance=function(_fa8){
var _fa9=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fa8);
return UserInterface.registerBinding(_fa9,ExplorerToolBarBinding);
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
var _faa=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fab=_faa?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fab);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fac,_fad){
var _fae=(_fad==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _faf=DOMUtil.createElementNS(Constants.NS_UI,_fae,_fac);
var _fb0=UserInterface.registerBinding(_faf,ExplorerToolBarButtonBinding);
_fb0.explorerToolBarButtonType=_fad;
return _fb0;
};
EditorBinding.prototype=new WindowBinding;
EditorBinding.prototype.constructor=EditorBinding;
EditorBinding.superclass=WindowBinding.prototype;
EditorBinding.isActive=false;
EditorBinding.ACTION_ATTACHED=null;
EditorBinding.URL_DIALOG_MOZ_CONFIGURE="${root}/content/dialogs/wysiwygeditor/mozsecuritynote/mozsecuritynote.aspx";
EditorBinding.ABSURD_NUMBER=-999999999;
EditorBinding.LINE_BREAK_ENTITY_HACK="C1.LINE.BREAK.ENTITY.HACK";
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_fb1,_fb2){
var _fb3=EditorBinding._components;
var _fb4=EditorBinding._editors;
var key=_fb2.key;
var _fb6=Interfaces.isImplemented(IWysiwygEditorComponent,_fb1);
if(!_fb6){
_fb6=Interfaces.isImplemented(ISourceEditorComponent,_fb1);
}
if(_fb6){
if(_fb4.has(key)){
_fb4.get(key).initializeEditorComponent(_fb1);
}else{
if(!_fb3.has(key)){
_fb3.set(key,new List());
}
_fb3.get(key).add(_fb1);
}
}else{
throw "Editor component interface not implemented: "+_fb1;
}
};
EditorBinding.claimComponents=function(_fb7,_fb8){
var _fb9=EditorBinding._components;
var _fba=EditorBinding._editors;
var key=_fb8.key;
_fba.set(key,_fb7);
var list=null;
if(_fb9.has(key)){
list=_fb9.get(key).copy();
_fb9.del(key);
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
var name=this.getProperty("name");
if(name==null||name==""){
name="generated"+KeyMaster.getUniqueKey();
}
this._registerWithDataManager(name);
var _fbe=this.getProperty("value");
if(_fbe!=null){
_fbe=decodeURIComponent(_fbe);
this._startContent=_fbe;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fc0=this.bindingWindow.DataManager;
_fc0.unRegisterDataBinding(name);
}
};
EditorBinding.prototype._initialize=function(){
this.subscribe(BroadcastMessages.APPLICATION_BLURRED);
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
EditorBinding.prototype.initializeEditorComponents=function(_fc2){
var _fc3=EditorBinding.claimComponents(this,_fc2);
if(_fc3!=null){
while(_fc3.hasNext()){
this.initializeEditorComponent(_fc3.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fc5=this.bindingWindow.DataManager;
if(_fc5.getDataBinding(name)){
_fc5.unRegisterDataBinding(name);
}
_fc5.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fc6=this.getEditorDocument();
if(_fc6!=null){
Application.framework(_fc6);
DOMEvents.addEventListener(_fc6,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fc6,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fc6,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fc6,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fc8){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fc8==true){
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
var _fca=this.getCheckSum();
if(_fca!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fca;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fcb=null;
if(Binding.exists(this._pageBinding)){
_fcb=this._pageBinding.getCheckSum(this._checksum);
}
return _fcb;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fcd=DOMEvents.getTarget(e);
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
if(_fcd.ownerDocument==this.getEditorDocument()){
if(!this._isActivated||this.isFocusable&&!this.isFocused){
this._activateEditor(true);
}
}
break;
case DOMEvents.MOUSEMOVE:
if(Client.isExplorer){
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
EditorBinding.prototype.handleBroadcast=function(_fcf,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fcf,arg);
var _fd1=null;
switch(_fcf){
case BroadcastMessages.APPLICATION_BLURRED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _fd2=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fd2=false;
}
}
}else{
_fd1=DOMEvents.getTarget(arg);
if(_fd1&&_fd1.ownerDocument==this.getEditorDocument()){
_fd2=false;
}
}
if(_fd2){
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
EditorBinding.prototype._activateEditor=function(_fd3){
if(_fd3!=this._isActivated){
this._isActivated=_fd3;
EditorBinding.isActive=_fd3;
var _fd4=this.getEditorWindow().standardEventHandler;
var _fd5=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fd5!=null){
if(_fd3){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fd5.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fd4.enableNativeKeys(true);
}else{
_fd5.disable();
_fd4.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fd6=this.getEditorDocument().selection.createRange();
_fd6.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fd7=false;
try{
if(!Client.isExplorer){
var _fd8=this.getEditorWindow().getSelection();
if(_fd8!=null){
_fd7=_fd8.toString().length>0;
if(!_fd7){
var _fd9=_fd8.getRangeAt(0);
var frag=_fd9.cloneContents();
var _fdb=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fdb.appendChild(frag.firstChild);
}
var img=_fdb.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fd7=true;
}
}
}
}
}else{
var _fd9=this.getEditorDocument().selection.createRange();
_fd7=(_fd9&&_fd9.text)&&_fd9.text.length>0;
if(_fd9.commonParentElement&&VisualEditorBinding.isImageElement(_fd9.commonParentElement())){
_fd7=true;
}
}
}
catch(exception){
}
return _fd7;
};
EditorBinding.prototype.isCommandEnabled=function(_fdd){
var _fde=true;
switch(_fdd){
case "Cut":
case "Copy":
case "Paste":
_fde=this.getEditorDocument().queryCommandEnabled(_fdd);
break;
}
return _fde;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fe2=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fe3=null;
if(cmd=="Paste"){
_fe3=null;
}else{
_fe3=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fe3);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fe2=true;
}
break;
}
return _fe2;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fe5=this.getContentWindow().bindingMap.toolbar;
var _fe6=_fe5.getButtonForCommand(cmd);
if(!_fe6){
throw "No button for command "+cmd;
}
return _fe6;
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
var _fe9=this.getContentDocument().getElementById("focusableinput");
if(_fe9!=null){
_fe9.style.display="block";
FocusBinding.focusElement(_fe9);
_fe9.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fea){
EditorBinding.superclass.handleAction.call(this,_fea);
var _feb=_fea.target;
var self=this;
var _fed=this.shadowTree.iframe;
switch(_fea.type){
case Binding.ACTION_DIRTY:
if(_fea.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fee){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fee);
};
EditorBinding.prototype.handleElement=function(_fef){
return true;
};
EditorBinding.prototype.updateElement=function(_ff0){
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
var _ff3=this._menuGroups[rel];
if(_ff3 instanceof List){
_ff3.each(function(_ff4){
_ff4.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _ff6=this._menuGroups[rel];
if(_ff6 instanceof List){
_ff6.each(function(_ff7){
_ff7.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_ff8){
EditorPopupBinding.superclass.handleAction.call(this,_ff8);
var _ff9=_ff8.target;
if(_ff8.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_ff9.getProperty("cmd");
var gui=_ff9.getProperty("gui");
var val=_ff9.getProperty("val");
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
var _ffd=this.bindingWindow.bindingMap.tinywindow;
var _ffe=this.bindingWindow.bindingMap.codepresswindow;
if(_ffd){
EditorBinding.registerComponent(this,_ffd);
}else{
if(_ffe){
EditorBinding.registerComponent(this,_ffe);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_fff,_1000,_1001,theme){
this._editorBinding=_fff;
this._tinyEngine=_1000;
this._tinyInstance=_1001;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1003,frame,_1005){
this._editorBinding=_1003;
this._codePressFrame=frame;
this._codePressEngine=_1005;
};
EditorClickButtonBinding.prototype._buildDesignModeSanitizer=function(){
if(Client.isExplorer){
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
var _1008=this._editorBinding;
if(_1008!=null){
var self=this;
var _100a={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1008.hasBookmark()){
_1008.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1008.hasBookmark()){
_1008.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_100a);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_100a);
}
};
EditorClickButtonBinding.newInstance=function(_100c){
var _100d=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_100c);
return UserInterface.registerBinding(_100d,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_100e){
var _100f=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_100e);
return UserInterface.registerBinding(_100f,EditorToolBarButtonBinding);
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
var _1010=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1010);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_1011,_1012,_1013,theme){
this._editorBinding=_1011;
this._tinyEngine=_1012;
this._tinyInstance=_1013;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1015){
EditorSelectorBinding.superclass.handleAction.call(this,_1015);
switch(_1015.type){
case MenuItemBinding.ACTION_COMMAND:
if(this._editorBinding.hasBookmark()){
var self=this;
setTimeout(function(){
if(!self._editorBinding.isDialogMode){
self._editorBinding.restoreBookmark();
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
if(Client.isExplorer){
this._buildDesignModeSanitizer();
}
};
EditorMenuItemBinding.prototype._buildDesignModeSanitizer=function(){
if(Client.isExplorer){
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
EditorMenuItemBinding.newInstance=function(_1019){
var _101a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1019);
return UserInterface.registerBinding(_101a,EditorMenuItemBinding);
};
VisualEditorBinding.prototype=new EditorBinding;
VisualEditorBinding.prototype.constructor=VisualEditorBinding;
VisualEditorBinding.superclass=EditorBinding.prototype;
VisualEditorBinding.FUNCTION_CLASSNAME="compositeFunctionWysiwygRepresentation";
VisualEditorBinding.FIELD_CLASSNAME="compositeFieldReferenceWysiwygRepresentation";
VisualEditorBinding.HTML_CLASSNAME="compositeHtmlWysiwygRepresentation";
VisualEditorBinding.ACTION_INITIALIZED="visualeditor initialized";
VisualEditorBinding.DEFAULT_CONTENT="<p><br/></p>";
VisualEditorBinding.URL_DIALOG_CONTENTERROR="${root}/content/dialogs/wysiwygeditor/errors/contenterror.aspx";
VisualEditorBinding.XHTML="<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<head>${head}</head>\n\t<body>\n${body}\n\t</body>\n</html>";
VisualEditorBinding.getTinyLessClassName=function(_101b){
var i=0,_101d,_101e=[],split=_101b.split(" ");
while((_101d=split[i++])!=null){
if(_101d.length>=3&&_101d.substring(0,3)=="mce"){
continue;
}else{
if(_101d.length>=14&&_101d.substring(0,14)=="compositemedia"){
continue;
}
}
_101e.push(_101d);
}
return _101e.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1020){
var _1021=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1020);
if(soap instanceof SOAPFault){
}else{
_1021=soap.XhtmlFragment;
if(!_1021){
_1021="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1021;
};
VisualEditorBinding.getTinyContent=function(_1023,_1024){
var _1025=null;
if(_1023==null||_1023==""){
_1023=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_1023);
if(soap instanceof SOAPFault){
var _1027=soap;
var _1028={handleDialogResponse:function(){
_1024.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1028,_1027);
}else{
_1025=soap.XhtmlFragment;
if(_1025==null){
_1025=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1025;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _102b=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _102d=new List(doc.documentElement.childNodes);
var _102e=new List();
_102d.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_102e.add(child);
}
});
var _1030=_102e.get(index);
if(_1030==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_1030.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_1030.hasChildNodes()){
frag.appendChild(_1030.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_102b=DOMSerializer.serialize(doc.documentElement);
_102b=_102b.substring(_102b.indexOf(">")+1,_102b.length);
_102b=_102b.substring(0,_102b.lastIndexOf("<"));
}
}
}
if(_102b==null){
_102b=new String("");
}
return _102b;
};
VisualEditorBinding.isImage=function(_1032){
result=_1032&&_1032.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_1033){
return VisualEditorBinding.isImage(_1033)&&!VisualEditorBinding.isReservedElement(_1033);
};
VisualEditorBinding.isReservedElement=function(_1034){
if(VisualEditorBinding.isFunctionElement(_1034)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1034)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1034)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1035){
return VisualEditorBinding.isImage(_1035)&&CSSUtil.hasClassName(_1035,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1036){
return VisualEditorBinding.isImage(_1036)&&CSSUtil.hasClassName(_1036,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1037){
return VisualEditorBinding.isImage(_1037)&&CSSUtil.hasClassName(_1037,VisualEditorBinding.HTML_CLASSNAME);
};
function VisualEditorBinding(){
this.logger=SystemLogger.getLogger("VisualEditorBinding");
this.action_initialized=VisualEditorBinding.ACTION_INITIALIZED;
this.url_default="${root}/content/misc/editors/visualeditor/visualeditor.aspx";
this._tinyEngine=null;
this._tinyInstance=null;
this._tinyTheme=null;
this.embedableFieldConfiguration=null;
this._head=null;
return this;
}
VisualEditorBinding.prototype.onBindingRegister=function(){
VisualEditorBinding.superclass.onBindingRegister.call(this);
StringBundle.getString("Composite.Web.VisualEditor","Preload.Key");
};
VisualEditorBinding.prototype.onBindingAttach=function(){
var _1038=this.getProperty("embedablefieldstypenames");
if(_1038!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1038);
}
var _1039=this.getProperty("formattingconfiguration");
if(_1039!=null){
this._url+="?config="+_1039;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_103a,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_103a,arg);
var _103c=this.getContentWindow().bindingMap.tinywindow;
var _103d=_103c.getContentWindow();
switch(_103a){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_103d){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
if(this._startContent==" "){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
this._startContent=this.normalizeToDocument(this._startContent);
this.extractHead(this._startContent);
this._startContent=this.extractBody(this._startContent);
arg.tinyInstance.setContent(VisualEditorBinding.getTinyContent(this._startContent),{format:"raw"});
this.initializeEditorComponents(_103c);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_103e){
_103e.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_103f){
VisualEditorBinding.superclass._onPageInitialize.call(this,_103f);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._maybeShowEditor=function(){
if(this._isFinalized&&this._pageBinding!=null){
this._checksum=this.getCheckSum();
this._pageBinding.showEditor(true);
}
};
VisualEditorBinding.prototype.extractHead=function(html){
this._head=VisualEditorBinding.extractByIndex(html,0);
};
VisualEditorBinding.prototype.extractBody=function(html){
return VisualEditorBinding.extractByIndex(html,1);
};
VisualEditorBinding.prototype.normalizeToDocument=function(_1042){
var _1043=_1042;
if(!this._isNormalizedDocument(_1042)){
_1043=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_1042);
}
return _1043;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1044){
var _1045=false;
var doc=XMLParser.parse(_1044,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1045=true;
}
}
if(Client.isWebKit){
if(_1044.indexOf("<html")!==0){
_1045=false;
}
}
return _1045;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _104a=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_104a){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_104a=true;
}
return _104a;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _104c=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_104c);
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
VisualEditorBinding.prototype.focus=function(){
VisualEditorBinding.superclass.focus.call(this);
if(Client.isExplorer&&this._tinyInstance){
this._tinyInstance.selection.setRng(this._tinyInstance.selection.getRng());
}
};
VisualEditorBinding.prototype.setResult=function(_104e){
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
VisualEditorPopupBinding.prototype.configure=function(_104f,_1050,_1051){
var _1052=this.editorBinding.hasSelection();
this.tinyInstance=_104f;
this.tinyEngine=_1050;
this.tinyElement=_1051;
this.hasSelection=_1052;
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
var _1056=false;
if(this.hasSelection){
_1056=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1056=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1056=true;
}
}
}
}
if(_1056){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1057=this.getMenuItemForCommand("compositeInsertLink");
var _1058=this.getMenuItemForCommand("unlink");
var _1059=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _105a=this.editorBinding.getButtonForCommand("unlink");
_1058.setDisabled(_105a.isDisabled);
if(_1058.isDisabled){
_1057.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1057.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _105b=this.editorBinding.embedableFieldConfiguration;
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
if(_105b){
var _105e=_105b.getGroupNames();
if(_105e.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_105e.each(function(_1062){
var _1063=_105b.getFieldNames(_1062);
_1063.each(function(_1064){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1064);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1062+":"+_1064);
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
var _1066=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1067=null;
var _1068=null;
if(_1066){
if(_1066.nodeName=="TD"){
_1067=_1066.getAttribute("colspan");
_1068=_1066.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1067=="1"&&_1068=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1066){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1069){
var _106a=VisualEditorFormattingConfiguration._configurations;
if(!_106a.has(_1069)){
_106a.set(_1069,new VisualEditorFormattingConfiguration());
}
return _106a.get(_1069);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_106c){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_106d){
var _106e=null;
var _106f=VisualEditorFieldGroupConfiguration._configurations;
if(!_106f.has(_106d)){
_106f.set(_106d,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_106d)));
}
return _106f.get(_106d);
};
function VisualEditorFieldGroupConfiguration(_1070){
var _1071=new Map();
new List(_1070).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1071.set(group.GroupName,map);
});
this._groups=_1071;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1075){
return this._groups.get(_1075).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1076,_1077){
return this._groups.get(_1076).get(_1077).xhtml;
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
this._heads=null;
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
this._heads=new Map();
var _1079=this.getDescendantElementsByLocalName("textarea");
while(_1079.hasNext()){
var _107a=_1079.getNext();
if(_107a.getAttribute("selected")=="true"){
this._startContent=_107a.value;
this._textareaname=_107a.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _107c=this.getContentWindow().bindingMap.templatetree;
_107c.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_107d){
var _107e=_107c.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_107e.textareaname);
_107d.consume();
}});
_107c.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_107f){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1080=this.getContentWindow().bindingMap.toolsplitter;
_1080.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1081=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1081.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1081);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1082){
this._textareas=new Map();
while(_1082.hasNext()){
var _1083=_1082.getNext();
var _1084=_1083.getAttribute("placeholderid");
this._textareas.set(_1084,{placeholderid:_1084,placeholdername:_1083.getAttribute("placeholdername"),placeholdermarkup:_1083.value,textareaelement:_1083,isSelected:_1083.getAttribute("selected")=="true"});
}
var _1085=new Map();
this._textareas.each(function(name,_1087){
var _1088=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1088.setLabel(_1087.placeholdername);
_1088.setImage("${icon:placeholder}");
_1088.setProperty("placeholder",true);
_1088.textareaname=name;
_1085.set(_1087.placeholdername,_1088);
if(_1087.isSelected){
selected=_1088;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1089=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1089.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _108a=this.getContentWindow().bindingMap.templatetree;
var _108b=_108a.add(TreeNodeBinding.newInstance(_108a.bindingDocument));
_108b.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_108b.setImage("${icon:warning}");
_108b.attach();
var _108c=this.getContentWindow().bindingMap.statusbar;
_108c.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _108e=this._textareas.get(name);
var _108f=_108e.placeholdermarkup;
this.setValue(this.normalizeToDocument(_108f));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1090){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1090;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1091=this.getContentWindow().bindingMap.statusbar;
_1091.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1090);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1094="";
if(this._heads.has(this._textareaname)){
_1094=this._heads.get(this._textareaname);
if(_1094==null){
_1094=new String("");
}
}
return _1094;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1096){
_1096.textareaelement.value=_1096.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1097,_1098){
var _1099=_1097.getElementsByTagName("div").item(0);
var _109a=_1098.getElementsByTagName("div").item(0);
var _109b=new List(_1099.getElementsByTagName("textarea"));
var _109c=new List(_109a.getElementsByTagName("textarea"));
var _109d=false;
if(_109b.getLength()!=_109c.getLength()){
_109d=true;
}else{
var index=0;
_109b.each(function(_109f,index){
var _10a1=_109c.get(index);
var newid=_109f.getAttribute("placeholderid");
var oldid=_10a1.getAttribute("placeholderid");
var _10a4=_109f.getAttribute("placeholdername");
var _10a5=_10a1.getAttribute("placeholdername");
if(newid!=oldid||_10a4!=_10a5){
_109d=true;
}
return !_109d;
});
}
if(_109d){
var html=null;
if(_1099.innerHTML!=null){
html=_1099.innerHTML;
}else{
html=DOMSerializer.serialize(_1099);
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
return this;
}
VisualMultiTemplateEditorBinding.prototype.toString=function(){
return "[VisualMultiTemplateEditorBinding]";
};
VisualMultiTemplateEditorBinding.prototype.onBindingAttach=function(){
VisualMultiTemplateEditorBinding.superclass.onBindingAttach.call(this);
this._oldtextareas=new Map();
};
VisualMultiTemplateEditorBinding.prototype._initialize=function(){
var self=this;
var _10a9=this.getDescendantBindingByLocalName("selector");
_10a9.attach();
this._populateTemplateSelector();
var _10aa=this.getContentWindow().bindingMap.templateselector;
_10aa.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10ab=this.getDescendantBindingByLocalName("selector");
var _10ac=this.getContentWindow().bindingMap.templateselector;
_10ab.selections.each(function(_10ad){
_10ad.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10ac.populateFromList(_10ab.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10ae=this.getDescendantBindingByLocalName("selector");
var _10af=this.getContentWindow().bindingMap.templateselector;
_10ae.selectByValue(_10af.getValue());
_10ae.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10b0){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10b5,_10b6){
var _10b7=_10b6;
if(old.has(_10b5)){
_10b7=old.get(_10b5).placeholdermarkup;
}
return _10b7;
}
while(_10b0.hasNext()){
var _10b8=_10b0.getNext();
var _10b9=_10b8.getAttribute("placeholderid");
this._textareas.set(_10b9,{placeholderid:_10b9,placeholdername:_10b8.getAttribute("placeholdername"),placeholdermarkup:compute(_10b9,_10b8.value),textareaelement:_10b8,isSelected:_10b8.getAttribute("selected")=="true"});
}
var _10ba=null;
var _10bb=this.getContentWindow().bindingMap.templatetree;
var _10bc=new Map();
this._textareas.each(function(name,_10be){
var _10bf=_10bb.add(TreeNodeBinding.newInstance(_10bb.bindingDocument));
_10bf.setLabel(_10be.placeholdername);
_10bf.setImage("${icon:placeholder}");
_10bf.setProperty("placeholder",true);
_10bf.textareaname=name;
_10bc.set(_10be.placeholdername,_10bf);
if(_10be.isSelected){
_10ba=_10bf;
}
});
_10bb.attachRecursive();
if(_10ba!=null){
var _10c0=true;
if(this._oldtextareas.hasEntries()){
_10c0=false;
var map=new Map();
this._textareas.each(function(id,_10c3){
map.set(_10c3.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10c0=true;
}
}
if(_10c0){
var _10c4=this._textareas.get(_10ba.textareaname);
this._textareaname=_10ba.textareaname;
this._placeholdername=_10c4.placeholdername;
this._setContentFromPlaceHolder(_10ba.textareaname);
_10ba.focus();
}else{
var _10c5=_10bc.get(this._placeholdername);
this._textareaname=_10c5.textareaname;
_10c5.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10c6,_10c7){
var _10c8=_10c6.getElementsByTagName("ui:selector").item(0);
var _10c9=_10c7.getElementsByTagName("ui:selector").item(0);
var _10ca=false;
if(_10c8!=null&&_10c9!=null){
var _10cb=new List(_10c8.getElementsByTagName("ui:selection"));
var _10cc=new List(_10c9.getElementsByTagName("ui:selection"));
if(_10cb.getLength()!=_10cc.getLength()){
_10ca=true;
}else{
_10cb.each(function(_10cd,index){
var _10cf=_10cd.getAttribute("value");
var _10d0=_10cc.get(index).getAttribute("value");
if(_10cf!=_10d0){
_10ca=true;
}
return !_10ca;
});
}
}
if(_10ca){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10c8);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10c6,_10c7);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10d2,frame,_10d4){
this._editorBinding=_10d2;
this._codePressFrame=frame;
this._codePressEngine=_10d4;
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
CodeMirrorEditorBinding.syntax={TEXT:"text",XML:"xml",XSL:"xsl",HTML:"html",CSS:"css",JAVASCRIPT:"js",CSHARP:"cs",CSHTML:"cshtml",ASPX:"aspx",SQL:"sql"};
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
var _10da=this.getProperty("validate");
if(_10da==true){
this._hasStrictValidation=true;
}
var _10db=this.getProperty("validator");
if(_10db!=null){
this._validator=_10db;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10dc,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10dc,arg);
switch(_10dc){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10de=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10de!=null){
var _10df=_10de.getContentWindow();
if(arg.broadcastWindow==_10df){
this._codemirrorWindow=_10df;
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
case CodeMirrorEditorBinding.syntax.SQL:
this._codemirrorEditor.setOption("mode","");
break;
case CodeMirrorEditorBinding.syntax.TEXT:
this._codemirrorEditor.setOption("mode","");
break;
}
this.initializeEditorComponents(_10de);
var self=this;
this._codemirrorEditor.setOption("onChange",function(e){
self.checkForDirty();
});
this._codemirrorEditor.setOption("onFocus",function(e){
self._activateEditor(true);
});
if(this._pageBinding!=null){
this._initialize();
}
this.unsubscribe(_10dc);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10e3){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10e3);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10e4){
if(_10e4!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10e4;
EditorBinding.isActive=_10e4;
var _10e5=this.getContentWindow().standardEventHandler;
if(_10e4){
_10e5.enableNativeKeys(true);
}else{
_10e5.disableNativeKeys();
}
var _10e6=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10e6!=null){
if(_10e4){
_10e6.enable();
}else{
_10e6.disable();
}
}
if(_10e4){
this.focus();
var _10e7=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10eb=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10eb;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10ec){
_10ec.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10ee){
if(!this._isFinalized){
if(_10ee!=this._startContent){
this._startContent=_10ee;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10ee);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10ef=this.getContentWindow().bindingMap.editorpage.getContent();
if(_10ef!=null){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10ef=_10ef.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
break;
}
}
return _10ef?_10ef:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_10f0){
if(this._pageBinding!=null){
this._pageBinding.cover(_10f0);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10f1){
if(_10f1!=null&&this.shadowTree.dotnetinput!=null){
var value=_10f1.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10f3=true;
var _10f4=this.getContent();
if(this._validator!=null){
_10f3=Validator.validateInformed(_10f4,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10f3=XMLParser.isWellFormedDocument(_10f4,true);
if(_10f3==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10f3=this._isValidHTML(_10f4);
break;
}
}
break;
}
}
return _10f3;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10f6=true;
var doc=XMLParser.parse(xml);
var _10f8=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10f8.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10f8.add("NamespaceURI");
}
var head=null,body=null;
var _10fc=new List(root.childNodes);
while(_10fc.hasNext()){
var child=_10fc.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10f8.add("MultipleHead");
}
if(body!=null){
_10f8.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10f8.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10f8.add("MissingHead");
}
if(body==null){
_10f8.add("MissingBody");
}
}
if(_10f8.hasEntries()){
_10f6=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f8.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f8.getFirst()));
}
}
return _10f6;
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
var _10fe=null;
var page=this._pageBinding;
if(page!=null){
_10fe=page.getCheckSum();
}
return _10fe;
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
ThrobberBinding.prototype.handleBroadcast=function(_1100,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1100,arg);
switch(_1100){
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
ProgressBarBinding.notch=function(_1103){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1103);
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
ProgressBarBinding.prototype.notch=function(_1105){
_1105=_1105?_1105:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1105);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1107,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1107,arg);
switch(_1107){
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
StartMenuItemBinding.prototype.setChecked=function(_1109,_110a){
StartMenuItemBinding.superclass.setChecked.call(this,_1109,_110a);
if(!_110a){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_110b){
var _110c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_110b);
UserInterface.registerBinding(_110c,StartMenuItemBinding);
return UserInterface.getBinding(_110c);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_110f,_1110){
var _1111=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1110,true)==true){
if(_110f!="*"){
_110f=KeySetBinding._sanitizeKeyModifiers(_110f);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1111[doc]){
_1111[doc]={};
}
if(!_1111[doc][code]){
_1111[doc][code]={};
}
_1111[doc][code][_110f]=_1110;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1115=false;
var code=e.keyCode;
var _1117=KeySetBinding.keyEventHandlers;
if(_1117[doc]&&_1117[doc][code]){
var _1118="[default]";
_1118+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1118+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _1119=_1117[doc][code][_1118];
if(_1119==null){
_1119=_1117[doc][code]["*"];
}
if(_1119!=null){
_1119.handleKeyEvent(e);
_1115=true;
}
}
return _1115;
};
KeySetBinding._sanitizeKeyModifiers=function(_111a){
var _111b="[default]";
var mods={};
if(_111a){
new List(_111a.split(" ")).each(function(_111d){
mods[_111d]=true;
});
function check(_111e){
if(mods[_111e]){
_111b+=" "+_111e;
}
}
check("shift");
check("control");
}
return _111b;
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
var _1122=key.getAttribute("oncommand");
var _1123=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1123){
DOMEvents.preventDefault(e);
}
var _1125=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1122,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1126){
if(_1126 instanceof CursorBinding){
_1126.setOpacity(0);
_1126.show();
new Animation({modifier:9,onstep:function(_1127){
_1126.setOpacity(Math.sin(_1127*Math.PI/180));
},onstop:function(){
_1126.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1128){
if(_1128 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1129){
_1128.setOpacity(Math.cos(_1129*Math.PI/180));
},onstop:function(){
_1128.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_112a,_112b,_112c){
if(_112a instanceof CursorBinding){
_112c.x-=16;
_112c.y-=16;
new Animation({modifier:3,onstep:function(_112d){
var tal=Math.sin(_112d*Math.PI/180);
_112a.setPosition(new Point(((1-tal)*_112b.x)+((0+tal)*_112c.x),((1-tal)*_112b.y)+((0+tal)*_112c.y)));
},onstop:function(){
CursorBinding.fadeOut(_112a);
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
CursorBinding.prototype.setOpacity=function(_1133){
this.bindingElement.style.opacity=new String(_1133);
this._opacity=_1133;
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
function setOpacity(_1136){
cover.bindingElement.style.opacity=new String(_1136);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1137){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1137*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1139){
cover.bindingElement.style.MozOpacity=new String(_1139);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_113a){
if(Binding.exists(cover)){
setOpacity(Math.sin(_113a*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_113c){
if(_113c!=this._isBusy){
if(_113c){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_113c;
}
};
CoverBinding.prototype.setTransparent=function(_113d){
if(_113d!=this._isTransparent){
if(_113d){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_113d;
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
CoverBinding.prototype.setHeight=function(_113f){
if(_113f>=0){
this.bindingElement.style.height=new String(_113f+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1140){
var _1141=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1140);
return UserInterface.registerBinding(_1141,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1143=UncoverBinding._bindingInstance;
if(Binding.exists(_1143)){
_1143.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1147){
this._isFading=_1147==true;
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
var _1148=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1148.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1148.clearRect(0,0,300,150);
_1148.fillRect(0,0,300,150);
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
var _114a=this._canvas.getContext("2d");
_114a.clearRect(0,0,300,150);
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
var _114b=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_114b);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _114c=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_114c){
this._startcontent=_114c.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_114d){
SourceCodeViewerBinding.superclass.handleAction.call(this,_114d);
switch(_114d.type){
case WindowBinding.ACTION_ONLOAD:
if(_114d.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_114d.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_114d);
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
var _1151=this._transformer.transformToString(doc);
this._inject(_1151);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1154){
this.getContentDocument().body.innerHTML=_1154;
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
var _115c=list.getNext();
var id=_115c.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_115c);
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
var _1166=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1166.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1166.appendChild(att);
}
elm.appendChild(_1166);
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
var _1170=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1170){
doc=XMLParser.parse(_1170);
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
var _1174=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1174;
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
this._populateFromLanguages(Localization.languages);
};
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1175,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1175,arg);
switch(_1175){
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
var _1178=new List();
list.each(function(lang){
_1178.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1178);
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
var self=this;
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_117c){
switch(_117c){
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
var _117f=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_117f,root);
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
var _1180=this.getProperty("status");
if(_1180!=null){
switch(_1180){
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
MessageQueue.update();
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
UserInterfaceMapping.prototype.merge=function(_1184){
for(var _1185 in _1184.map){
this.map[_1185]=_1184.getBindingImplementation(_1185);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1186){
var _1187=null;
var name=_1186.nodeName.toLowerCase();
if(this.map[name]){
_1187=this.map[name];
}
return _1187;
};
var UserInterface=new function(){
var _1189=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _118a=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1189,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _118b=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_118d,impl){
var _118f=null;
if(!this.hasBinding(_118d)){
var _1190=DOMUtil.getParentWindow(_118d);
if(DOMUtil.getLocalName(_118d)!="bindingmapping"){
if(!impl&&_118d.getAttribute("binding")!=null){
var _1191=_118d.getAttribute("binding");
impl=_1190[_1191];
if(impl==null){
throw "No such binding in scope: "+_1191;
}
}
if(!impl){
var _1192=_1190.DocumentManager;
if(_1192){
var _1193=_1192.customUserInterfaceMapping;
if(_1193){
impl=_1193.getBindingImplementation(_118d);
}
}
}
if(!impl){
impl=_118a.getBindingImplementation(_118d);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_118f=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_118f){
var key=KeyMaster.getUniqueKey();
_118d.setAttribute("key",key);
_118f.key=key;
if(!_118d.id){
_118d.id=key;
}
keys[key]={element:_118d,binding:_118f};
_118f.onBindingRegister();
}
}
}
return _118f;
};
this.unRegisterBinding=function(_1195){
terminate(_1195);
};
function terminate(_1196){
if(Binding.exists(_1196)==true){
var key=_1196.key;
Binding.destroy(_1196);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1196=null;
}else{
_118b.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1198){
var _1199=null;
if(keys[_1198.key]){
_1199=keys[_1198.key].element;
}
return _1199;
};
this.getBinding=function(_119a){
var _119b=null;
if(_119a&&_119a.nodeType==Node.ELEMENT_NODE){
try{
var key=_119a.getAttribute("key");
if(key&&keys[key]){
_119b=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_119a);
if(exception.stack){
alert(exception.stack);
}
}
}
return _119b;
};
this.getBindingByKey=function(key){
var _119e=null;
if(keys[key]){
_119e=keys[key].binding;
}
return _119e;
};
this.hasBinding=function(_119f){
return this.getBinding(_119f)!=null;
};
this.isBindingVisible=function(_11a0){
var _11a1=Application.isOperational;
if(_11a1==true){
var _11a2=new Crawler();
_11a2.type=NodeCrawler.TYPE_ASCENDING;
_11a2.id="visibilitycrawler";
_11a2.addFilter(function(_11a3){
var b=UserInterface.getBinding(_11a3);
var res=0;
if(!b.isVisible){
_11a1=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11a2.crawl(_11a0.bindingElement);
_11a2.dispose();
}
return _11a1;
};
var _11a6=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11a6={};
for(var key in keys){
_11a6[key]=true;
}
};
this.getPoint=function(){
var _11aa=null;
if(_11a6){
_11aa=new List();
for(var key in keys){
if(!_11a6[key]){
_11aa.add(key);
}
}
}
return _11aa;
};
this.clearPoint=function(){
_11a6=null;
};
this.trackUndisposedBindings=function(){
var _11ac=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11ac){
_11ac="Bindings illdisposed: ";
}
_11ac+=entry.binding+" ";
}
}
if(_11ac!=null){
_118b.error(_11ac);
}
};
this.autoTrackDisposedBindings=function(_11af){
if(_11af){
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
SOAPRequest.newInstance=function(_11b0,_11b1){
var _11b2=_11b0+"/"+_11b1;
var _11b3=new SOAPRequest(_11b2);
var _11b4=SOAPRequest.resolver;
_11b3.document=Templates.getTemplateDocument("soapenvelope.xml");
_11b3.envelope=_11b4.resolve("soap:Envelope",_11b3.document);
_11b3.header=_11b4.resolve("soap:Header",_11b3.envelope);
_11b3.body=_11b4.resolve("soap:Body",_11b3.envelope);
return _11b3;
};
SOAPRequest._parseResponse=function(_11b5){
var _11b6=null;
var _11b7=false;
var doc=_11b5.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11b6=SOAPRequestResponse.newInstance(_11b5.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11b5.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11b7=true;
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
var text=_11b5.responseText;
if(_11b5.status==503||text.indexOf("id=\"offline\"")>-1){
_11b7=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11b5.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11b5.responseText);
}
}
}
}
if(_11b7==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11b6;
};
function SOAPRequest(_11bc){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11bc;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11be=DOMUtil.getXMLHTTPRequest();
var _11bf=null;
_11be.open("post",url,false);
_11be.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11be.setRequestHeader("SOAPAction",this.action);
try{
_11be.send(this.document);
_11bf=SOAPRequest._parseResponse(_11be);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11be=null;
return _11bf;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11c2){
var _11c3=DOMUtil.getXMLHTTPRequest();
_11c3.open("post",url,true);
_11c3.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11c3.setRequestHeader("SOAPAction",this.action);
_11c3.onreadystatechange=function(){
if(_11c3.readyState==4){
var _11c4=SOAPRequest._parseResponse(_11c3);
_11c2(_11c4);
_11c3=null;
}
};
_11c3.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11c5 in this){
this[_11c5]=null;
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
var _11c7=null;
if(doc&&doc.documentElement){
_11c7=new SOAPRequestResponse();
var _11c8=SOAPRequestResponse.resolver;
_11c7.document=doc;
_11c7.envelope=_11c8.resolve("soap:Envelope",_11c7.document);
_11c7.header=_11c8.resolve("soap:Header",_11c7.envelope);
_11c7.body=_11c8.resolve("soap:Body",_11c7.envelope);
var fault=_11c8.resolve("soap:Fault",_11c7.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11c7.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11c8.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11c8.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11c7;
};
function SOAPFault(_11ca,_11cb,_11cc){
this._operationName=_11ca;
this._operationAddress=_11cb;
this._faultString=_11cc;
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
SOAPFault.newInstance=function(_11cd,fault){
return new SOAPFault(_11cd.name,_11cd.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11d0){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11d0;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11d2=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11d2.body,this._operation);
var _11d4=this._wsdl.getSchema();
var _11d5=_11d4.lookup(this._operation);
var _11d6=_11d5.getListedDefinitions();
while(_11d6.hasNext()){
var def=_11d6.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11d2;
};
SOAPEncoder.prototype._resolve=function(_11da,_11db,value){
var _11dd=this._wsdl.getSchema();
if(_11db.isSimpleValue){
this._appendText(_11da,value,_11db.type=="string");
}else{
var _11de=_11dd.lookup(_11db.type);
if(_11de instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11de.getListedDefinitions();
if(_11de.isArray){
var _11e0=new List(value);
var def=defs.getNext();
while(_11e0.hasNext()){
var elm=this._appendElement(_11da,def.name);
var val=_11e0.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11da,def.name);
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
};
SOAPEncoder.prototype._appendElement=function(node,name){
var child=DOMUtil.createElementNS(this._namespace,name,node.ownerDocument);
node.appendChild(child);
return child;
};
SOAPEncoder.prototype._appendText=function(_11e7,value,_11e9){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11ec=false;
var i=0,c;
while(c=chars[i++]){
var _11ef=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11ef=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11ef=false;
}
break;
}
if(!_11ef){
safe+=c;
}else{
_11ec=true;
}
}
if(_11ec){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11e7.appendChild(_11e7.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11f2){
this._wsdl=wsdl;
this._operation=_11f2;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11f7){
var _11f8=null;
var _11f9=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11fb=this.resolve(id,_11f7.body);
var _11fc=_11f9.lookup(id);
var _11fd=_11fc.getListedDefinitions();
while(!_11f8&&_11fd.hasNext()){
var def=_11fd.getNext();
var elm=this.resolve(def.name,_11fb);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11f8=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11f8.importNode!=Types.UNDEFINED){
_11f8.appendChild(_11f8.importNode(e,true));
}else{
_11f8.loadXML(DOMSerializer.serialize(e));
}
}else{
_11f8=this._compute(elm,def);
}
}
return _11f8;
};
SOAPDecoder.prototype._compute=function(_1201,_1202){
var _1203=null;
var _1204=this._wsdl.getSchema();
if(_1202.isSimpleValue){
_1203=this._getSimpleValue(_1201,_1202.type);
}else{
var _1205=_1204.lookup(_1202.type);
if(_1205 instanceof SchemaSimpleType){
_1203=this._getSimpleValue(_1201,_1205.restrictionType);
}else{
var defs=_1205.getListedDefinitions();
if(_1205.isArray){
_1203=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1201);
while(elms.hasNext()){
var elm=elms.getNext();
_1203.push(this._compute(elm,def));
}
}else{
_1203={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1201);
if(elm){
_1203[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1203;
};
SOAPDecoder.prototype._getSimpleValue=function(_120a,type){
var _120c=null;
if(_120a!=null&&_120a.firstChild&&_120a.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_120a.childNodes.length>1){
_120a.normalize();
}
_120c=_120a.firstChild.data;
switch(type){
case Schema.types.STRING:
_120c=_120c;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_120c=Number(_120c);
break;
case Schema.types.BOOLEAN:
_120c=_120c=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _120c;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_120d){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_120d);
}
Schema.prototype._parseSchema=function(_120e){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _120f={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_120e);
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
_120f[rule.getAttribute("name")]=entry;
}
return _120f;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1214){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1214);
}
SchemaDefinition.prototype._parse=function(_1215){
var min=_1215.getAttribute("minOccurs");
var max=_1215.getAttribute("maxOccurs");
var type=_1215.getAttribute("type");
this.name=_1215.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _121b=split[1];
this.isSimpleValue=sort!="tns";
this.type=_121b;
}else{
var elm=_1215.getElementsByTagName("*").item(0);
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
function SchemaElementType(_121d,_121e){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_121d,_121e);
}
SchemaElementType.prototype._parseListedDefinitions=function(_121f,_1220){
var els=_121f.resolveAll("s:complexType/s:sequence/s:element",_1220);
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
function SchemaComplexType(_1222,_1223){
this._definitions=new List();
this._parseListedDefinitions(_1222,_1223);
this.isArray=_1223.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1224,_1225){
var els=_1224.resolveAll("s:sequence/s:element",_1225);
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
function SchemaSimpleType(_1228,_1229){
this.restrictionType=null;
this._parse(_1228,_1229);
}
SchemaSimpleType.prototype._parse=function(_122a,_122b){
var _122c=_122a.resolve("s:restriction",_122b);
if(_122c){
this.restrictionType=_122c.getAttribute("base").split(":")[1];
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
var _122f=null;
var _1230=DOMUtil.getXMLHTTPRequest();
_1230.open("get",url,false);
_1230.send(null);
if(_1230.responseXML){
_122f=_1230.responseXML.documentElement;
}else{
alert(_1230.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _122f;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1231=new List();
var _1232=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1232.hasEntries()){
while(_1232.hasNext()){
var _1233=_1232.getNext();
var name=_1233.getAttribute("name");
_1231.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1231;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1236,_1237,_1238){
this.name=name;
this.address=_1236;
this.encoder=_1237;
this.decoder=_1238;
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
var _123c=wsdl.getOperations();
_123c.each(function(_123d){
proxy[_123d.name]=WebServiceProxy.createProxyOperation(_123d);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_123e,_123f){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_123f){
var log=_123f instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_123e.address+": "+_123e.name+"\n\n";
log+=DOMSerializer.serialize(_123f.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1241){
return function(){
var _1242=new List(arguments);
var _1243=null;
if(typeof (_1242.getLast())=="function"){
var _1244=_1242.extractLast();
var _1245=_1241.encoder.encode(_1242);
this._log(_1241,_1245);
var self=this;
var _1247=_1245.asyncInvoke(_1241.address,function(_1248){
self._log(_1241,_1248);
if(_1248){
if(_1248.fault){
_1243=SOAPFault.newInstance(_1241,_1248.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1243,_1245,_1248);
}
}else{
if(WebServiceProxy.isDOMResult){
_1243=_1248.document;
}else{
_1243=_1241.decoder.decode(_1248);
}
}
}
_1245.dispose();
_1244(_1243);
});
}else{
var _1245=_1241.encoder.encode(new List(arguments));
this._log(_1241,_1245);
var _1247=_1245.invoke(_1241.address);
this._log(_1241,_1247);
if(_1247){
if(_1247.fault){
_1243=SOAPFault.newInstance(_1241,_1247.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1243,_1245,_1247);
}
}else{
if(WebServiceProxy.isDOMResult){
_1243=_1247.document;
}else{
_1243=_1241.decoder.decode(_1247);
}
}
}
_1245.dispose();
return _1243;
}
};
};
WebServiceProxy.handleFault=function(_1249,_124a,_124b){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1249,soapRequest:_124a,soapResponse:_124b});
}
catch(exception){
alert(_1249.getFaultString());
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
window.MessageQueue=new function(){
this.INTERVAL_ONLINE=5*1000;
this.INTERVAL_OFFLINE=1*1000;
this._actions=new List();
this._index={};
this.index=0;
var _124c=SystemLogger.getLogger("MessageQueue");
var _124d=null;
var _124e=0;
var _124f=null;
var _1250=new Map();
var _1251=new Map();
var _1252=false;
var _1253=false;
var _1254=false;
var _1255=false;
var _1256={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_124d=ConsoleMessageQueueService;
_124e=_124d.GetCurrentSequenceNumber("dummyparam!");
this.index=_124e;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1252){
if(!MessageQueue._actions.hasEntries()){
var _1257=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1253=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1257;
_1253=false;
}
}
}
};
this._pokeserver=function(){
if(_1252==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1253);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_1254){
_1255=true;
}else{
_1254=true;
var self=this;
_124d.GetMessages(Application.CONSOLE_ID,this.index,function(_1259){
if(_1259!=null){
if(Types.isDefined(_1259.CurrentSequenceNumber)){
var _125a=_1259.CurrentSequenceNumber;
if(_125a<self.index){
_124c.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_125a);
}
self.index=_125a;
var _125b=new List(_1259.ConsoleActions);
if(_125b.hasEntries()){
self.evaluate(_125b);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_124c.error("No sequencenumber in MessageQueue response!");
}
}
_1254=false;
if(_1255){
_1255=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_125c){
var _125d=new List();
if(_125c.hasEntries()){
_125c.each(function(_125e){
if(this._index[_125e.Id]!=true){
_125d.add(_125e);
}
this._index[_125e.Id]=true;
},this);
if(_125d.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_125d);
}else{
this._actions=_125d;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_125f){
var _1260="(No reason)";
if(_125f!=null){
_1260=_125f.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1260);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1264){
if(_1264==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1265=null;
if(this._actions.hasEntries()){
var _1266=this._actions.extractFirst();
_124e=_1266.SequenceNumber;
_124c.debug("MessageQueue action: "+_1266.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_124e+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1266.ActionType){
case "OpenView":
_1265=_1266.OpenViewParams;
if(_1265.ViewType=="ModalDialog"){
openDialogView(_1265);
}else{
_124f=_1265.ViewId;
openView(_1265);
}
break;
case "CloseView":
_1265=_1266.CloseViewParams;
_124f=_1265.ViewId;
closeView(_1265);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1266.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_1250.countEntries()+"\n";
_1250.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_124c.debug(debug);
if(!_1250.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1266.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1266.MessageBoxParams);
break;
case "OpenViewDefinition":
_1265=_1266.OpenViewDefinitionParams;
_124f=_1265.Handle;
openViewDefinition(_1265);
break;
case "LogEntry":
logEntry(_1266.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1265=_1266.BroadcastMessageParams;
_124c.debug("Server says: EventBroadcaster.broadcast ( \""+_1265.Name+"\", "+_1265.Value+" )");
EventBroadcaster.broadcast(_1265.Name,_1265.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1250.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1266.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1266.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1266.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1265=_1266.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1265.ViewId,entityToken:_1265.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1265=_1266.OpenGenericViewParams;
openGenericView(_1265);
break;
case "OpenExternalView":
_1265=_1266.OpenExternalViewParams;
openExternalView(_1265);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1266.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1253);
}
function logEntry(_1269){
var _126a=_1269.Level.toLowerCase();
SystemLogger.getLogger(_1269.SenderId)[_126a](_1269.Message);
}
function openView(_126b){
var list=paramsToList(_126b.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_126b.ViewId);
def.entityToken=_126b.EntityToken;
def.flowHandle=_126b.FlowHandle;
def.position=_1256[_126b.ViewType],def.label=_126b.Label;
def.image=_126b.Image;
def.toolTip=_126b.ToolTip;
def.argument={"url":_126b.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_126b.ViewId,entityToken:_126b.EntityToken,flowHandle:_126b.FlowHandle,position:_1256[_126b.ViewType],url:_126b.Url,label:_126b.Label,image:_126b.Image,toolTip:_126b.ToolTip}));
}
}
function openDialogView(_126e){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_126e.ViewId,flowHandle:_126e.FlowHandle,position:Dialog.MODAL,url:_126e.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_126f){
var _1270=_126f.DialogType.toLowerCase();
if(_1270=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_126f.Title+"\n"+_126f.Message);
}else{
Dialog[_1270](_126f.Title,_126f.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_1271){
var map={};
var _1273=false;
new List(_1271.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1273=true;
});
var proto=ViewDefinitions[_1271.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1271.ViewId;
}
def.argument=_1273?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1278){
var def=ViewDefinition.clone("Composite.Management.GenericView",_1278.ViewId);
def.label=_1278.Label;
def.toolTip=_1278.ToolTip;
def.image=_1278.Image;
def.argument={"url":_1278.Url,"list":paramsToList(_1278.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_127a){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_127a.ViewId);
def.label=_127a.Label;
def.toolTip=_127a.ToolTip;
def.image=_127a.Image;
def.url=_127a.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_127c){
if(StageBinding.isViewOpen(_127c.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_127c.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_127d){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_127d.ViewId,isSuccess:_127d.Succeeded});
}
this._lockSystem=function(_127e){
var _127f=top.bindingMap.offlinetheatre;
if(_127e){
_127f.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_127f.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1252=_127e;
};
this.handleBroadcast=function(_1281,arg){
switch(_1281){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_124f!=null&&arg==_124f){
_124f=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_1250.set(arg,true);
}else{
_124c.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1250.hasEntries()){
_1250.del(arg);
_124c.debug("Refreshed tree: "+arg+"\n("+_1250.countEntries()+" trees left!)");
if(!_1250.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1251.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1251.hasEntries()==true){
_1251.del(arg);
if(!_1251.hasEntries()){
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
function paramsToList(_1283){
var list=new List();
new List(_1283).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _1286=false;
var _1287=null;
var _1288=false;
var _1289=Client.qualifies();
var _128a="admin";
var _128b="123456";
if(!_1289){
document.location="unsupported.aspx";
return;
}
this.fireOnLoad=function(){
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
this.handleBroadcast=function(_128c){
switch(_128c){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_128c);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _128d=window.bindingMap.appwindow;
_128d.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_128e){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_128f){
if(_128e){
EventBroadcaster.subscribe(_128f,KickStart);
}else{
EventBroadcaster.unsubscribe(_128f,KickStart);
}
});
}
function kickStart(_1290){
switch(_1290){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1286=true;
break;
}
if(_1286){
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
DataManager.getDataBinding("username").setValue(_128a);
DataManager.getDataBinding("password").setValue(_128b);
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
this.doLogin=function(_1293,_1294){
var _1295=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1296=false;
var _1297=LoginService.ValidateAndLogin(_1293,_1294);
if(_1297 instanceof SOAPFault){
alert(_1297.getFaultString());
}else{
_1296=_1297;
}
if(_1296){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1295){
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
var _1298=DataManager.getDataBinding("username");
var _1299=DataManager.getDataBinding("password");
_1298.blur();
_1299.blur();
_1298.setValue("");
_1299.setValue("");
_1298.clean();
_1299.clean();
_1298.focus();
document.getElementById("loginerror").style.display="block";
var _129a={handleAction:function(_129b){
document.getElementById("loginerror").style.display="none";
_129b.target.removeActionListener(Binding.ACTION_DIRTY,_129a);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_129a);
}
WindowManager.fireOnLoad(this);
if(!_1289){
UpdateManager.isEnabled=false;
}
};

