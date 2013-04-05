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
var _2d2=_2d1.getResponseHeader("X-Error-Type");
if(_2d2){
var _2d3="";
for(var i=0;i<10;i++){
var _2d5=i?i:"";
var _2d2=_2d1.getResponseHeader("X-Error-Type"+_2d5);
if(!_2d2){
break;
}
var _2d6=_2d1.getResponseHeader("X-Error-Message"+_2d5);
_2d3+=_2d2+"\n"+_2d6+"\n";
}
Dialog.error("Error",_2d3);
}else{
var text=_2d1.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2d0.handleResponse(dom);
}
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
},dispatchEvent:function(_2d9,name){
var _2db=true;
var _2dc=document.createEvent("UIEvents");
_2dc.initEvent(name,true,true);
_2db=_2d9.dispatchEvent(_2dc);
return _2db;
},getUpdateZones:function(dom){
var _2de="//*[@id and contains(@class,'updatezone')]";
var _2df=[];
var _2e0=null;
var _2e1=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e0=dom.evaluate(_2de,dom,null,type,null);
while((_2e1=_2e0.iterateNext())!=null){
_2df.push(_2e1);
}
}else{
_2e0=dom.documentElement.selectNodes(_2de);
Array.forEach(_2e0,function(_2e3){
_2df.push(_2e3);
});
}
return _2df;
},getElementById:function(dom,id){
var _2e6="//*[@id='"+id+"']";
var _2e7=null;
var _2e8=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2e7=dom.evaluate(_2e6,dom,null,type,null);
_2e8=_2e7.singleNodeValue;
}else{
_2e8=dom.documentElement.selectNodes(_2e6)[0];
}
return _2e8;
},_getIds:function(dom){
var _2eb="//*[@id]";
var _2ec=null;
var _2ed=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2ec=dom.evaluate(_2eb,dom,null,type,null);
while((element=_2ec.iterateNext())!=null){
_2ed.push(element.getAttribute("id"));
}
}else{
_2ec=dom.documentElement.selectNodes(_2eb);
Array.forEach(_2ec,function(_2ef){
_2ed.push(_2ef.getAttribute("id"));
});
}
return _2ed;
},toHTMLElement:function(_2f0){
var _2f1=this.serialize(_2f0);
var temp=document.createElement("temp");
temp.innerHTML=_2f1;
return temp.firstChild;
},getActiveElement:function(){
var _2f3=document.activeElement;
if(_2f3==null||_2f3==document.body){
_2f3=this._activeElement;
}
return _2f3;
},serialize:function(_2f4){
var _2f5=null;
if(_2f4.xml!=null){
_2f5=_2f4.xml;
}else{
if(this._serializer!=null){
_2f5=this._serializer.serializeToString(_2f4);
}
}
return _2f5;
},hasDifferences:function(_2f6,_2f7){
var s1=null;
var s2=null;
if(_2f6.xml!=null){
s1=_2f6.xml;
s2=_2f7.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2f6);
s2=this._serializer.serializeToString(_2f7);
}
}
return s1!=s2;
},parse:function(_2fa){
var _2fb=null;
if(this._parser!=null&&window.XPathResult!=null){
_2fb=this._parser.parseFromString(_2fa,"text/xml");
}else{
_2fb=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2fb.setProperty("SelectionLanguage","XPath");
_2fb.loadXML(_2fa);
}
return this._validate(_2fb);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2fe=dom.getElementsByTagName("parsererror").item(0);
if(_2fe!=null){
out=_2fe.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _302=!has[id];
has[id]=true;
if(!_302){
out="Element \""+id+"\" encountered twice.";
}
return _302;
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
this.handleElement=function(_303,_304){
var _305=false;
switch(_303.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_303.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_305=false;
break;
}
break;
}
return _305;
};
this.updateElement=function(_306,_307){
var id=_306.getAttribute("id");
var _309=document.getElementById(id);
if(_309!=null){
var _30a=null;
switch(_309.nodeName.toLowerCase()){
case "input":
_30a=_306.getAttribute("value");
break;
case "textarea":
_30a=_306.textContent?_306.textContent:_306.text;
break;
}
if(_30a==null){
_30a="";
}
if(_30a!=_309.value){
_309.value=_30a;
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
},_beforeUpdate:function(_30b){
var _30c=true;
if(_30b!=null){
_30b.__updateType=this.type;
_30c=UpdateAssistant.dispatchEvent(_30b,Update.EVENT_BEFOREUPDATE);
}
return _30c;
},_afterUpdate:function(_30d){
var _30e=true;
if(_30d!=null){
_30d.__updateType=this.type;
_30e=UpdateAssistant.dispatchEvent(_30d,Update.EVENT_AFTERUPDATE);
}
return _30e;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_310){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_310;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _311,_312,_313=UpdateAssistant.toHTMLElement(this.element);
if((_311=document.getElementById(this.id))!=null){
if((_312=_311.parentNode)!=null){
var _314=UserInterface.getBinding(_311);
if(_314!=null){
_313.__isAttached=_314.isAttached;
}
if(this._beforeUpdate(_311)){
_312.replaceChild(_313,_311);
this._afterUpdate(_313);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_315){
var _316=ReplaceUpdate.superclass._afterUpdate.call(this,_315);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_315.nodeName=="form"||_315.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _316;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_319,_31a){
this.type=type;
this.id=id;
this.element=_319;
this.isFirst=_31a;
return this;
}
SiblingUpdate.prototype.update=function(){
var _31b=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_31b);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_31b);
break;
}
};
SiblingUpdate.prototype._remove=function(_31c){
var _31d=_31c.parentNode;
if(_31d!=null){
if(this._beforeUpdate(_31c)){
_31d.removeChild(_31c);
this._afterUpdate(_31d);
}
}
};
SiblingUpdate.prototype._insert=function(_31e,_31f){
var _320=UpdateAssistant.toHTMLElement(_31e);
if(this.isFirst){
var _321=_31f;
if(_321!=null){
if(this._beforeUpdate(_321)){
_321.insertBefore(_320,_321.firstChild);
this._afterUpdate(_320);
}
}
}else{
var _321=_31f.parentNode;
if(_321!=null){
if(this._beforeUpdate(_321)){
_321.insertBefore(_320,_31f.nextSibling);
this._afterUpdate(_320);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_322){
var _323=SiblingUpdate.superclass._beforeUpdate.call(this,_322);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_322.id+"\"");
}
return _323;
};
SiblingUpdate.prototype._afterUpdate=function(_324){
var _325=true;
if(_324!=null){
_325=SiblingUpdate.superclass._afterUpdate.call(this,_324);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_324.id+"\"");
if(_324.nodeName=="form"||_324.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _325;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_327,_328){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_327;
this.currentElement=_328;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _329=document.getElementById(this.id);
if(this._beforeUpdate(_329)){
this._updateAttributes(_329);
this._afterUpdate(_329);
}
};
AttributesUpdate.prototype._updateAttributes=function(_32a){
Array.forEach(this.element.attributes,function(_32b){
var _32c=this.currentElement.getAttribute(_32b.nodeName);
if(_32c==null||_32c!=_32b.nodeValue){
this._setAttribute(_32a,_32b.nodeName,_32b.nodeValue);
this._summary.push("@"+_32b.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_32d){
if(this.element.getAttribute(_32d.nodeName)==null){
this._setAttribute(_32a,_32d.nodeName,null);
this._summary.push("@"+_32d.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_32e,name,_330){
if(_32e==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_330);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _331=(_330==null);
if(_331){
_32e.removeAttribute(name);
}else{
_32e.setAttribute(name,_330);
}
if(document.all!=null){
if(_331){
_330="";
}
switch(name.toLowerCase()){
case "class":
_32e.className=_330;
break;
case "disabled":
_32e.disabled=!_331;
break;
case "checked":
_32e.checked=!_331;
break;
case "readonly":
_32e.readOnly=!_331;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_332){
AttributesUpdate.superclass._afterUpdate.call(this,_332);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_333,key){
return _333.replace("${windowkey}",document.location+":"+key);
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
var _337=this._newDimensions.w!=this._currentDimensions.w;
var _338=this._newDimensions.h!=this._currentDimensions.h;
if(_337||_338){
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
},fireOnDOM:function(_33a){
if(Interfaces.isImplemented(IDOMHandler,_33a,true)){
this._ondomstatements.add(_33a);
}
},fireOnLoad:function(_33b){
if(Interfaces.isImplemented(ILoadHandler,_33b,true)){
this._onloadstatements.add(_33b);
}
},fireOnResize:function(_33c){
if(Interfaces.isImplemented(IResizeHandler,_33c,true)){
this._onresizestatements.add(_33c);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_33d){
return eval(_33d);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_33e,_33f){
SystemLogger.unsuspend(_33f);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_340,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _343=top.app.bindingMap.broadcasterHasDirtyTabs;
_343.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_344,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _347=top.app.bindingMap.broadcasterHasDirtyTabs;
_347.disable();
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
var _348=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_348=LoginService.Logout(true);
if(!_348){
alert("Logout failed.");
}
}
return _348;
},lock:function(_349){
if(_349!=null){
this._lockthings[_349]=true;
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
},unlock:function(_34a,_34b){
if(_34a!=null){
delete this._lockthings[_34a];
if(top.bindingMap.mastercover!=null){
if(_34b||this._lockers>0){
if(_34b){
var out="Unlocked by "+new String(_34a)+"\n";
for(var _34d in this._lockthings){
out+="Locked by "+new String(_34d)+". ";
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
},hasLock:function(_34e){
return this._lockthings[_34e]==true;
},activate:function(_34f){
var _350=this._activeBinding;
this._activeBinding=_34f;
this._activatedBindings.add(_34f);
if(_350&&_350.isActive){
_350.deActivate();
}
},deActivate:function(_351){
var _352=null;
var _353=null;
if(_351==this._activeBinding){
while(!_353&&this._activatedBindings.hasEntries()){
_352=this._activatedBindings.extractLast();
if(_352!=_351&&_352.isActivatable){
_353=_352;
}
}
if(!_353){
_353=app.bindingMap.explorerdock;
}
_353.activate();
}
},focused:function(_354){
this.isFocused=_354;
if(_354){
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
},handleAction:function(_359){
switch(_359.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _35b=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_35d){
var src=_35d.src;
if(src.indexOf(_35b)>-1){
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
var _362=false;
if(this._isMousePositionTracking){
_362=true;
if(Client.isExplorer&&e.button!=1){
_362=false;
}
if(_362){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _362;
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
},onDragStart:function(_364){
var _365=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_365,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_365.getImage());
this._cursorStartPoint=_364;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_365.showDrag){
_365.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_365.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _367=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_367);
}
},onDragStop:function(diff){
if(this._isDragging){
var _369=BindingDragger.draggedBinding;
if(_369.hideDrag){
_369.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_369.dragType);
this._isDragging=false;
_369=BindingAcceptor.acceptingBinding;
if(_369!=null){
if(Interfaces.isImplemented(IAcceptable,_369,true)==true){
_369.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_369);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_36a){
if(this.isDeveloperMode||_36a){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_36b){
if(_36b==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_36c){
switch(_36c){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_36e){
switch(_36e.Key){
case "ProductVersion":
this.versionString=_36e.Value;
break;
case "ProductTitle":
this.versionPrettyString=_36e.Value;
break;
case "InstallationId":
this.installationID=_36e.Value;
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
var _371=SystemLogger.getLogger("Preferences");
this.LOGIN="login";
var _372={"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _373=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_373){
for(var key in _373){
_372[key]=_373[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_372);
}
}});
this.getPref=function(key){
var _376=null;
if(key){
_376=_372[key];
}else{
throw "No such preference.";
}
return _376;
};
this.setPref=function(key,_378){
if(key){
_372[key]=_378;
}else{
throw "No such preference.";
}
};
function debug(_379){
var _37a=_379?"Persisted preferences":"No persisted preferences. Using defaults";
_37a+=":\n";
for(var key in _372){
var pref=_372[key];
_37a+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_371.fine(_37a);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _37f=null;
if(this.isInitialized==true){
if(this._persistance){
var _380=this._persistance[id];
if(_380){
_37f=_380[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _37f;
},setPersistedProperty:function(id,prop,_383){
if(this.isInitialized==true){
if(this._persistance){
if(_383!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_383);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_384){
switch(_384){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _385=top.bindingMap.persistance;
_385.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _386=top.bindingMap.persistance;
var map=_386.getPersistanceMap();
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
function StandardEventHandler(doc,_389){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_389;
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
var _38d={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_38d);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_38d);
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
var _394=UserInterface.getBinding(node);
if(_394!=null){
_394.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_394!=null?null:node.parentNode;
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
var _397=Application.trackMousePosition(e);
if(_397){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_399){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_399){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_399=true;
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
var _39a=KeySetBinding.handleKey(this._contextDocument,e);
if(!_39a){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _39b=this._contextWindow.frameElement;
if(_39b!=null){
var _39c=DOMUtil.getParentWindow(_39b);
if(_39c.standardEventHandler!=null){
_39c.standardEventHandler._handleKeyDown(e,_399);
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
var _39f=false;
var _3a0=DOMEvents.getTarget(e);
var name=_3a0.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_39f=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_39f;
}
if(_39f){
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
StandardEventHandler.prototype.enableNativeKeys=function(_3a3){
this._isAllowTabs=(_3a3==true?true:false);
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
function Action(_3a6,type){
this.target=_3a6;
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
function Animation(_3a8){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3a9 in _3a8){
this[_3a9]=_3a8[_3a9];
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
Animation.prototype.onstart=function(_3ad){
};
Animation.prototype.onstep=function(_3ae){
};
Animation.prototype.onstop=function(_3af){
};
Point.isEqual=function(p1,p2){
var _3b2=false;
if(p1&&p2){
_3b2=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3b2;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3b7=false;
if(dim1&&dim2){
_3b7=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3b7;
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
function BindingAcceptor(_3be){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3be;
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
var _3bf=new List(this._binding.dragAccept.split(" "));
while(_3bf.hasNext()){
var type=_3bf.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3c1,arg){
var type=arg;
try{
switch(_3c1){
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
function BindingBoxObject(_3c6){
this._domElement=_3c6.getBindingElement();
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
function BindingDragger(_3c8){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3c8;
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
BindingDragger.prototype.registerHandler=function(_3ca){
if(Interfaces.isImplemented(IDragHandler,_3ca)==true){
this.handler=_3ca;
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
var _3cd=e.button==(e.target?0:1);
if(_3cd){
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
var _3cf=Application.getMousePosition();
var dx=_3cf.x-this.startPoint.x;
var dy=_3cf.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3d2,e){
switch(_3d2){
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
function BindingParser(_3d4){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3d4;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3d5){
var _3d6=new List();
var xml=BindingParser.XML.replace("${markup}",_3d5);
var doc=XMLParser.parse(_3d5);
if(doc){
var _3d9=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3d9);
var node=_3d9.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3d6.add(node);
}
node=node.nextSibling;
}
}
return _3d6;
};
BindingParser.prototype._iterate=function(_3db,_3dc){
var _3dd=null;
switch(_3db.nodeType){
case Node.ELEMENT_NODE:
_3dd=this._cloneElement(_3db);
UserInterface.registerBinding(_3dd);
break;
case Node.TEXT_NODE:
_3dd=this._ownerDocument.createTextNode(_3db.nodeValue);
break;
}
if(_3dd){
_3dc.appendChild(_3dd);
}
if(_3dd&&_3db.hasChildNodes()){
var _3de=_3db.firstChild;
while(_3de){
this._iterate(_3de,_3dd);
_3de=_3de.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3df){
var _3e0=DOMUtil.createElementNS(_3df.namespaceURI?_3df.namespaceURI:Constants.NS_XHTML,_3df.nodeName,this._ownerDocument);
var i=0;
while(i<_3df.attributes.length){
var attr=_3df.attributes.item(i++);
_3e0.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3e0;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3e3){
var _3e4=null;
var _3e5=false;
var _3e6=_3e3.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3e3)){
var _3e7=UserInterface.getBinding(_3e3);
_3e5=BindingSerializer.activeInstance.indexBinding(_3e7);
if(_3e5){
_3e4=_3e7.key;
_3e3.setAttribute(BindingSerializer.KEYPOINTER,_3e4);
}
}
_3e4=_3e4?_3e4:_3e6;
var _3e8=new List(_3e3.childNodes);
_3e8.each(function(_3e9){
if(_3e9.nodeType==Node.ELEMENT_NODE){
_3e9.setAttribute(BindingSerializer.KEYPOINTER,_3e4);
}
});
if(_3e5){
BindingSerializer.activeInstance.append(_3e4,_3e6);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3ea){
BindingSerializer.activeInstance=this;
_3ea.bindingWindow.ElementIterator.iterate(_3ea.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3eb){
var _3ec=false;
var _3ed=_3eb.serialize();
if(_3ed!=false){
_3ec=true;
var _3ee="ui:"+DOMUtil.getLocalName(_3eb.bindingElement);
var _3ef=DOMUtil.createElementNS(Constants.NS_UI,_3ee,this._dom);
this._pointers[_3eb.key]=_3ef;
for(var prop in _3ed){
if(_3ed[prop]!=null){
_3ef.setAttribute(prop,String(_3ed[prop]));
}
}
}
return _3ec;
};
BindingSerializer.prototype.append=function(_3f1,_3f2){
var _3f3=this._pointers[_3f1];
var _3f4=_3f2?this._pointers[_3f2]:this._dom;
_3f4.appendChild(_3f3);
};
function ImageProfile(_3f5){
this._default=_3f5.image;
this._hover=_3f5.imageHover;
this._active=_3f5.imageActive;
this._disabled=_3f5.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3f6){
this._default=_3f6;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3f7){
this._hover=_3f7;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3f8){
this._active=_3f8;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3f9){
this._disabled=_3f9;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3fa,_3fb,_3fc){
var _3fd=null;
if(_3fa.isAttached){
_3fd=new List();
var _3fe=_3fc?_3fa.getChildElementsByLocalName(_3fb):_3fa.getDescendantElementsByLocalName(_3fb);
_3fe.each(function(_3ff){
var _400=UserInterface.getBinding(_3ff);
if(_400){
_3fd.add(_400);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3fa.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3fd;
},getAncestorBindingByType:function(_402,impl,_404){
var _405=null;
if(Binding.exists(_402)){
var node=_402.bindingElement;
while(_405==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _407=UserInterface.getBinding(node);
if(_407 instanceof impl){
_405=_407;
}
}else{
if(_404&&node.nodeType==Node.DOCUMENT_NODE){
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
return _405;
},getAncestorBindingByLocalName:function(_409,_40a,_40b){
var _40c=null;
if(_40a=="*"){
var node=_409.bindingElement;
while(!_40c&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_40c=UserInterface.getBinding(node);
}
}
}else{
_40c=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_40a,_409.bindingElement,_40b));
}
return _40c;
},getChildElementsByLocalName:function(_40e,_40f){
var _410=new List();
var _411=new List(_40e.bindingElement.childNodes);
_411.each(function(_412){
if(_412.nodeType==Node.ELEMENT_NODE){
if(_40f=="*"||DOMUtil.getLocalName(_412)==_40f){
_410.add(_412);
}
}
});
return _410;
},getChildBindingByType:function(_413,impl){
var _415=null;
_413.getChildElementsByLocalName("*").each(function(_416){
var _417=UserInterface.getBinding(_416);
if(_417!=null&&_417 instanceof impl){
_415=_417;
return false;
}else{
return true;
}
});
return _415;
},getDescendantBindingByType:function(_418,impl){
var _41a=null;
_418.getDescendantElementsByLocalName("*").each(function(_41b){
var _41c=UserInterface.getBinding(_41b);
if(_41c!=null&&_41c instanceof impl){
_41a=_41c;
return false;
}else{
return true;
}
});
return _41a;
},getDescendantBindingsByType:function(_41d,impl){
var _41f=new List();
_41d.getDescendantElementsByLocalName("*").each(function(_420){
var _421=UserInterface.getBinding(_420);
if(_421!=null&&_421 instanceof impl){
_41f.add(_421);
}
return true;
});
return _41f;
},getNextBindingByLocalName:function(_422,name){
var _424=null;
var _425=_422.bindingElement;
while((_425=DOMUtil.getNextElementSibling(_425))!=null&&DOMUtil.getLocalName(_425)!=name){
}
if(_425!=null){
_424=UserInterface.getBinding(_425);
}
return _424;
},getPreviousBindingByLocalName:function(_426,name){
var _428=null;
var _429=_426.bindingElement;
while((_429=DOMUtil.getPreviousElementSibling(_429))!=null&&DOMUtil.getLocalName(_429)!=name){
}
if(_429!=null){
_428=UserInterface.getBinding(_429);
}
return _428;
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
},addFilter:function(_42a){
this._filters.add(_42a);
},removeFilter:function(_42b){
var _42c=-1;
this._filters.each(function(fil){
_42c++;
var _42e=true;
if(fil==_42b){
_42e=false;
}
return _42e;
});
if(_42c>-1){
this._filters.del(_42c);
}
},_applyFilters:function(node,arg){
var _431=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _434=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _435=true;
while(this._filters.hasNext()&&_435==true){
var _436=this._filters.getNext();
var res=_436.call(this,node,arg);
if(res!=null){
_431=res;
switch(res){
case stop:
case skip:
case skip+_434:
_435=false;
break;
}
}
}
return _431;
},crawl:function(_438,arg){
this.contextDocument=_438.ownerDocument;
this.onCrawlStart();
var _43a=this.type==NodeCrawler.TYPE_ASCENDING;
var _43b=this._applyFilters(_438,arg);
if(_43b!=NodeCrawler.STOP_CRAWLING){
if(_43a&&_43b==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_43a?_438.parentNode:_438;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_43d,arg){
var _43f=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_43f=this._crawlDescending(_43d,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_43f=this._crawlAscending(_43d,arg);
break;
}
return _43f;
},_crawlDescending:function(_440,arg){
var skip=NodeCrawler.SKIP_NODE;
var _443=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _445=null;
if(_440.hasChildNodes()){
var node=_440.firstChild;
while(node!=null&&_445!=stop){
this.currentNode=node;
_445=this._applyFilters(node,arg);
switch(_445){
case stop:
case _443:
case skip+_443:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_445=stop;
break;
}
}
}
if(_445!=stop&&_445!=skip){
this.previousNode=node;
}
break;
}
if(_445!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _445;
},_crawlAscending:function(_448,arg){
var _44a=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_448!=null){
this.currentNode=_448;
_44a=this._applyFilters(_448,arg);
if(_44a!=stop){
var next=this.nextNode?this.nextNode:_448.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_448;
_44a=this._crawl(next,arg);
}
}
}else{
_44a=stop;
}
return _44a;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _44e in this){
this[_44e]=null;
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
var _451=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_451=NodeCrawler.SKIP_NODE;
}
return _451;
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
this.addFilter(function(_452,arg){
var _454=null;
if(!UserInterface.hasBinding(_452)){
_454=NodeCrawler.SKIP_NODE;
}
return _454;
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
this.addFilter(function(_456,arg){
var _458=null;
var _459=UserInterface.getBinding(_456);
if(Interfaces.isImplemented(ICrawlerHandler,_459)==true){
self.response=null;
_459.handleCrawler(self);
_458=self.response;
}
return _458;
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
this.addFilter(function(_45b,list){
var _45d=null;
var _45e=UserInterface.getBinding(_45b);
if(Interfaces.isImplemented(IFlexible,_45e)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_45e);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_45e.isFlexSuspended==true){
_45d=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_45e);
}
break;
}
}
return _45d;
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
this.addFilter(function(_45f,list){
var _461=null;
var _462=UserInterface.getBinding(_45f);
if(_462.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_462)==true){
if(_462.isFocusable&&_462.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_462);
break;
case FocusCrawler.MODE_FOCUS:
if(!_462.isFocused){
_462.focus();
}
_461=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_462.isFocused==true){
_462.blur();
_461=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _461;
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
this.addFilter(function(_463,list){
var _465=null;
var _466=UserInterface.getBinding(_463);
if(!_466.isVisible){
_465=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _465;
});
this.addFilter(function(_467,list){
var _469=null;
var _46a=UserInterface.getBinding(_467);
if(_46a.isAttached){
if(Interfaces.isImplemented(IFit,_46a)){
if(!_46a.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_46a);
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
UpdateAssistant.serialize=function(_46b){
_46b=_46b.cloneNode(true);
_46b.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_46b.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_46b);
};
}
},handleEvent:function(e){
var _46d=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_46d);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_46d);
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
},_beforeUpdate:function(_46e){
var _46f=(_46e==document.documentElement);
if(_46f){
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
var _472=FocusBinding.focusedBinding;
if(_472!=null){
this._focusID=_472.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_46e.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_46e);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46e,false);
break;
}
}
},_afterUpdate:function(_473){
var _474=(_473==document.documentElement);
if(_474){
var _475=this._elementsbuffer;
if(_475.hasEntries()){
_475.each(function(_476){
DocumentManager.attachBindings(_476);
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
var _479=FocusBinding.focusedBinding;
if(_479==null){
var _47a=document.getElementById(this._focusID);
if(_47a!=null){
var _479=UserInterface.getBinding(_47a);
if(_479!=null){
_479.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _47b=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _47c="NEW DOM: "+document.title+"\n\n"+_47b+"\n\n";
_47c+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_47c);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_473.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_473.__isAttached!==false){
this._elementsbuffer.add(_473);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_473,true);
break;
}
switch(_473.id){
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
var _479=UserInterface.getBinding(_473);
while(_479==null&&_473!=null){
_479=UserInterface.getBinding(_473);
_473=_473.parentNode;
}
if(_479!=null){
_479.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_47e,_47f){
var _480=UserInterface.getBinding(_47e);
if(_480!=null){
if(_47f){
var _481=this._attributesbuffer;
var map=new Map();
_481.each(function(name,old){
var now=_47e.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_47e.attributes).each(function(att){
if(att.specified){
if(!_481.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_488){
var _489=_480.propertyMethodMap[name];
if(_489!=null){
_489.call(_480,_488);
}
});
}else{
var map=new Map();
new List(_47e.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_48b,_48c){
var _48d=window.bindingMap[_48b.getAttribute("id")];
if(_48d!=null){
return _48d.handleElement(_48b,_48c);
}
},updateElement:function(_48e,_48f){
var _490=window.bindingMap[_48e.getAttribute("id")];
if(_490!=null){
return _490.updateElement(_48e,_48f);
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
this.addFilter(function(_492,list){
var _494=UserInterface.getBinding(_492);
var _495=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_494==null){
UserInterface.registerBinding(_492);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_494!=null){
if(!_494.isAttached){
list.add(_494);
}
if(_494.isLazy==true){
_495=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_494!=null){
list.add(_494);
}
break;
}
return _495;
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
},handleBroadcast:function(_496,arg){
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
var _499=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_499)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_499!=null){
if(_499.href!=null&&_499.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _49a=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_49a!=null){
var map={};
var _49c=DOMUtil.getElementsByTagName(_49a,"bindingmapping");
new List(_49c).each(function(_49d){
var _49e=_49d.getAttribute("element");
var _49f=_49d.getAttribute("binding");
map[_49e]=eval(_49f);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_4a0){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_4a0;
}else{
this.customUserInterfaceMapping.merge(_4a0);
}
},_registerBindings:function(_4a1){
var _4a2=new DocumentCrawler();
_4a2.mode=DocumentCrawler.MODE_REGISTER;
_4a2.crawl(_4a1);
_4a2.dispose();
},_attachBindings:function(_4a3){
var _4a4=new DocumentCrawler();
_4a4.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_4a4.crawl(_4a3,list);
var _4a6=false;
while(list.hasNext()){
var _4a7=list.getNext();
if(!_4a7.isAttached){
_4a7.onBindingAttach();
if(!_4a7.memberDependencies){
_4a7.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4a7)){
_4a6=true;
}
}
}
if(_4a6){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a4.dispose();
list.dispose();
},attachBindings:function(_4a9){
this._registerBindings(_4a9);
this._attachBindings(_4a9);
},detachBindings:function(_4aa,_4ab){
var _4ac=new DocumentCrawler();
_4ac.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4ac.crawl(_4aa,list);
if(_4ab==true){
list.extractFirst();
}
var _4ae=false;
list.reverse().each(function(_4af){
if(Interfaces.isImplemented(IData,_4af)){
_4ae=true;
}
_4af.dispose(true);
});
if(_4ae){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4ac.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4b1){
return (/textarea|input/.test(DOMUtil.getLocalName(_4b1)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4b2){
this.isDirty=true;
var _4b3=false;
if(_4b2!=null&&!_4b2.isDirty){
_4b2.isDirty=true;
_4b2.dispatchAction(Binding.ACTION_DIRTY);
_4b3=true;
}
return _4b3;
},clean:function(_4b4){
if(_4b4.isDirty){
_4b4.isDirty=false;
}
},registerDataBinding:function(name,_4b6){
if(Interfaces.isImplemented(IData,_4b6,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4b6;
}
}else{
throw "Invalid DataBinding: "+_4b6;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4b9=null;
if(this._dataBindings[name]!=null){
_4b9=this._dataBindings[name];
}
return _4b9;
},getAllDataBindings:function(_4ba){
var list=new List();
for(var name in this._dataBindings){
var _4bd=this._dataBindings[name];
list.add(_4bd);
if(_4ba&&_4bd instanceof WindowBinding){
var _4be=_4bd.getContentWindow().DataManager;
if(_4be!=null){
list.merge(_4be.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4bf=false;
for(var name in this._dataBindings){
_4bf=true;
break;
}
return _4bf;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4c3){
var _4c4=this._dataBindings[name];
if(_4c4!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4c4.setResult(_4c3);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4c4);
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
var _4c5=new DataBindingMap();
_4c5.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4c7=this._dataBindings[name];
if(_4c7 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4c5[name]=_4c7.getValue();
}
return _4c5;
},getDataBindingResultMap:function(){
var _4c8=new DataBindingMap();
_4c8.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4ca=this._dataBindings[name];
var res=_4ca.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4cd){
_4c8.set(name,_4cd);
});
}else{
_4c8.set(name,res);
}
}
return _4c8;
},getPostBackString:function(){
var _4ce="";
var form=document.forms[0];
if(form!=null){
var _4d0="";
new List(form.elements).each(function(_4d1){
var name=_4d1.name;
var _4d3=encodeURIComponent(_4d1.value);
switch(_4d1.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4ce+=name+"="+_4d3+"&";
break;
case "submit":
if(document.activeElement==_4d1){
_4ce+=name+"="+_4d3+"&";
}
break;
case "radio":
if(_4d1.checked){
_4ce+=name+"="+_4d3+"&";
}
break;
case "checkbox":
if(_4d1.checked){
if(_4d1.name==_4d0){
if(_4ce.lastIndexOf("&")==_4ce.length-1){
_4ce=_4ce.substr(0,_4ce.length-1);
}
_4ce+=","+_4d3;
}else{
_4ce+=name+"="+_4d1.value;
}
_4d0=name;
_4ce+="&";
}
break;
}
});
}
return _4ce.substr(0,_4ce.length-1);
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
var _4dc=null;
var _4dd=null;
var _4de=false;
if(!this._cache[name]){
_4de=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4e0=DOMUtil.getXMLHTTPRequest();
_4e0.open("get",uri,false);
_4e0.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4e0.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4dd=_4e0.responseText;
break;
default:
_4dd=_4e0.responseXML;
break;
}
if(_4dd==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4dd;
}
}
_4dd=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4dc=_4dd;
break;
case this._modes.MODE_DOCUMENT:
_4dc=DOMUtil.cloneNode(_4dd,true);
break;
case this._modes.MODE_ELEMENT:
_4dc=DOMUtil.cloneNode(_4dd.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4dc=DOMSerializer.serialize(_4dd,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4dc=DOMSerializer.serialize(_4dd.documentElement,true);
break;
}
if(_4de&&Application.isDeveloperMode){
}
return _4dc;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4e3){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4e3];
},invoke:function(url,_4e5,_4e6){
this._logger.error("Not implemented");
},invokeModal:function(url,_4e8,_4e9){
var _4ea=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4e8,argument:_4e9});
StageBinding.presentViewDefinition(_4ea);
return _4ea;
},invokeDefinition:function(_4eb){
if(_4eb instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4eb);
}
return _4eb;
},question:function(_4ec,text,_4ee,_4ef){
if(!_4ee){
_4ee=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4ec,text,_4ee,_4ef);
},message:function(_4f0,text,_4f2,_4f3){
if(!_4f2){
_4f2=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4f0,text,_4f2,_4f3);
},error:function(_4f4,text,_4f6,_4f7){
if(!_4f6){
_4f6=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4f4,text,_4f6,_4f7);
},warning:function(_4f8,text,_4fa,_4fb){
if(!_4fa){
_4fa=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4f8,text,_4fa,_4fb);
},_standardDialog:function(type,_4fd,text,_4ff,_500){
var _501=null;
if(!_4ff){
_501=new List(Dialog.BUTTONS_ACCEPT);
}else{
_501=new List();
new List(_4ff).each(function(_502){
var _503=null;
switch(typeof _502){
case "object":
_503=_502;
break;
case "string":
var _504=false;
if(_502.indexOf(":")>-1){
_502=_502.split(":")[0];
_504=true;
}
_503=Dialog.dialogButton(_502);
if(_504){
_503.isDefault=true;
}
break;
}
_501.add(_503);
});
}
var _505={title:_4fd,text:text,type:type,image:this._dialogImages[type],buttons:_501};
var _506=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_500,argument:_505});
StageBinding.presentViewDefinition(_506);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_508,arg){
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
},saveAll:function(_50b){
var self=this;
var _50d=Application.getDirtyDockTabsTabs();
if(_50d.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_50e,_50f){
switch(_50e){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_50f,_50b);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_50d);
}else{
if(_50b){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_510,_511){
var _512=false;
var list=new List();
_510.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_512=true;
var _516=list.getLength();
var _517={handleBroadcast:function(_518,tab){
if(--_516==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_511){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_517);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _512;
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
var _51c="Composite.Management.Help";
if(!StageBinding.isViewOpen(_51c)){
StageBinding.handleViewPresentation(_51c);
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
var _51e=document.createEvent("Events");
_51e.initEvent(type,true,true);
window.dispatchEvent(_51e);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function CompositeUrl(url){
var _520=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _521=_520.exec(url);
if(_521){
var _522={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_522[$1]=$3;
});
this.queryString=_522;
this.path=url.replace(/\?.*/g,"");
if(_521[3]=="media"){
this.isMedia=true;
}else{
if(_521[3]=="page"){
this.isPage=true;
}
}
}
return this;
}
CompositeUrl.isMedia=function(url){
return new CompositeUrl(url).isMedia;
};
CompositeUrl.prototype.getPath=function(){
return this.path;
};
CompositeUrl.prototype.hasParam=function(key){
return this.queryString[key]!=null;
};
CompositeUrl.prototype.getParam=function(key){
return this.queryString[key];
};
CompositeUrl.prototype.setParam=function(key,_52b){
if(_52b==undefined){
delete this.queryString[key];
}else{
this.queryString[key]=_52b;
}
};
CompositeUrl.prototype.toString=function(){
var url=this.path;
var _52d=[];
for(var key in this.queryString){
_52d.push(key+"="+this.queryString[key]);
}
if(_52d.length>0){
url+="?"+_52d.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_52f,_530){
var _531=null;
var _532=ViewDefinitions[_52f];
if(_532.isMutable){
var impl=null;
if(_532 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_530!=null&&impl!=null){
var def=new impl();
for(var prop in _532){
def[prop]=ViewDefinition.cloneProperty(_532[prop]);
}
def.handle=_530;
_531=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _531;
};
ViewDefinition.cloneProperty=function(_536){
if(null==_536){
return _536;
}
if(typeof _536==="object"){
var _537=(_536.constructor===Array)?[]:{};
for(var prop in _536){
_537[prop]=ViewDefinition.cloneProperty(_536[prop]);
}
return _537;
}
return _536;
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
Binding.evaluate=function(_53e,_53f){
var _540=null;
var _541=_53f.bindingWindow.WindowManager;
if(_541!=null){
var _542=Binding.parseScriptStatement(_53e,_53f.key);
_540=_541.evaluate(_542);
}
return _540;
};
Binding.parseScriptStatement=function(_543,key){
if(_543!=null&&key!=null){
var _545="UserInterface.getBindingByKey ( \""+key+"\" )";
_543=_543.replace(/(\W|^)this(,| +|\)|;)/g,_545);
_543=_543.replace(/(\W|^)this(\.)/g,_545+".");
}
return _543;
};
Binding.exists=function(_546){
var _547=false;
try{
if(_546&&_546.bindingElement&&_546.bindingElement.nodeType&&_546.isDisposed==false){
_547=true;
}
}
catch(accessDeniedException){
_547=false;
}
finally{
return _547;
}
};
Binding.destroy=function(_548){
if(!_548.isDisposed){
if(_548.acceptor!=null){
_548.acceptor.dispose();
}
if(_548.dragger!=null){
_548.disableDragging();
}
if(_548.boxObject!=null){
_548.boxObject.dispose();
}
if(_548._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_548);
}
for(var _549 in _548.shadowTree){
var _54a=_548.shadowTree[_549];
if(_54a instanceof Binding&&Binding.exists(_54a)){
_54a.dispose(true);
}
_548.shadowTree[_549]=null;
}
_548.isDisposed=true;
_548=null;
}
};
Binding.dotnetify=function(_54b,_54c){
var _54d=_54b.getCallBackID();
if(_54d!=null){
var _54e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_54b.bindingDocument);
_54e.type="hidden";
_54e.id=_54d;
_54e.name=_54d;
_54e.value=_54c!=null?_54c:"";
_54b.bindingElement.appendChild(_54e);
_54b.shadowTree.dotnetinput=_54e;
}else{
throw _54b.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_54f){
var _550=_54f.getProperty("image");
var _551=_54f.getProperty("image-hover");
var _552=_54f.getProperty("image-active");
var _553=_54f.getProperty("image-disabled");
if(_54f.imageProfile==null){
if(_54f.image==null&&_550!=null){
_54f.image=_550;
}
if(_54f.imageHover==null&&_551!=null){
_54f.imageHover=_550;
}
if(_54f.imageActive==null&&_552!=null){
_54f.imageActive=_552;
}
if(_54f.imageDisabled==null&&_553!=null){
_54f.imageDisabled=_553;
}
if(_54f.image||_54f.imageHover||_54f.imageActive||_54f.imageDisabled){
_54f.imageProfile=new ImageProfile(_54f);
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
var _555=this.dependentBindings[key];
_555.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_556){
if(_556){
this.memberDependencies[_556.key]=true;
var _557=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_557=false;
break;
}
}
if(_557){
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
Binding.prototype.detachRecursive=function(_559){
if(_559==null){
_559=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_559);
};
Binding.prototype.addMember=function(_55a){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_55a.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_55a.key]=false;
_55a.registerDependentBinding(this);
}
}
return _55a;
};
Binding.prototype.addMembers=function(_55b){
while(_55b.hasNext()){
var _55c=_55b.getNext();
if(!_55c.isInitialized){
this.addMember(_55c);
}
}
return _55b;
};
Binding.prototype.registerDependentBinding=function(_55d){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_55d.key]=_55d;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _55e=this.getProperty("persist");
if(_55e&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _560=new List(_55e.split(" "));
while(_560.hasNext()){
var prop=_560.getNext();
var _562=Persistance.getPersistedProperty(id,prop);
if(_562!=null){
this._persist[prop]=_562;
this.setProperty(prop,_562);
}else{
_562=this.getProperty(prop);
if(_562!=null){
this._persist[prop]=_562;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _563=this.getProperty("disabled");
var _564=this.getProperty("contextmenu");
var _565=this.getProperty("observes");
var _566=this.getProperty("onattach");
var _567=this.getProperty("hidden");
var _568=this.getProperty("blockactionevents");
if(_567==true&&this.isVisible==true){
this.hide();
}
if(_563&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_564){
this.setContextMenu(_564);
}
if(_565){
this.observe(this.getBindingForArgument(_565));
}
if(_568==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_566!=null){
Binding.evaluate(_566,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _56a=this.getProperty("draggable");
var _56b=this.getProperty("dragtype");
var _56c=this.getProperty("dragaccept");
var _56d=this.getProperty("dragreject");
if(_56a!=null){
this.isDraggable=_56a;
}
if(_56b!=null){
this.dragType=_56b;
if(_56a!=false){
this.isDraggable=true;
}
}
if(_56c!=null){
this.dragAccept=_56c;
}
if(_56d!=null){
this.dragReject=_56d;
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
Binding.prototype._updateBindingMap=function(_56e){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _571=null;
if(_56e){
_571=map[id];
if(_571!=null&&_571!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_571=map[id];
if(_571!=null&&_571==this){
delete map[id];
}
}
}else{
var _573=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_56e);
if(Application.isDeveloperMode==true){
alert(_573);
}else{
this.logger.error(_573);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_575){
};
Binding.prototype.handleBroadcast=function(_576,arg){
};
Binding.prototype.handleElement=function(_578){
return false;
};
Binding.prototype.updateElement=function(_579){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _57b=null;
switch(typeof arg){
case "object":
_57b=arg;
break;
case "string":
_57b=this.bindingDocument.getElementById(arg);
if(_57b==null){
_57b=Binding.evaluate(arg,this);
}
break;
}
if(_57b!=null&&_57b.nodeType!=null){
_57b=UserInterface.getBinding(_57b);
}
return _57b;
};
Binding.prototype.serialize=function(){
var _57c={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_57c.id=id;
}
var _57e=this.getProperty("binding");
if(_57e){
_57c.binding=_57e;
}
return _57c;
};
Binding.prototype.serializeToString=function(){
var _57f=null;
if(this.isAttached){
_57f=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _57f;
};
Binding.prototype.subTreeFromString=function(_580){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_580);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_581){
var _582=this.bindingElement.getAttribute(_581);
if(_582){
_582=Types.castFromString(_582);
}
return _582;
};
Binding.prototype.setProperty=function(prop,_584){
if(_584!=null){
_584=_584.toString();
if(String(this.bindingElement.getAttribute(prop))!=_584){
this.bindingElement.setAttribute(prop,_584);
if(this.isAttached==true){
if(Persistance.isEnabled&&_584!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_584;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_584);
}
}
var _585=this.propertyMethodMap[prop];
if(_585){
_585.call(this,this.getProperty(prop));
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
var _587=null;
if(Binding.exists(this)){
_587=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _587;
};
Binding.prototype.attachClassName=function(_588){
CSSUtil.attachClassName(this.bindingElement,_588);
};
Binding.prototype.detachClassName=function(_589){
CSSUtil.detachClassName(this.bindingElement,_589);
};
Binding.prototype.hasClassName=function(_58a){
return CSSUtil.hasClassName(this.bindingElement,_58a);
};
Binding.prototype.addActionListener=function(type,_58c){
_58c=_58c!=null?_58c:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_58c)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_58c);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_58c+")");
}
};
Binding.prototype.removeActionListener=function(type,_58e){
_58e=_58e?_58e:this;
if(Action.isValid(type)){
var _58f=this.actionListeners[type];
if(_58f){
var i=0,_591;
while((_591=_58f[i])!=null){
if(_591==_58e){
_58f.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_593){
_593=_593?_593:this;
DOMEvents.addEventListener(this.bindingElement,type,_593);
};
Binding.prototype.removeEventListener=function(type,_595){
_595=_595?_595:this;
DOMEvents.removeEventListener(this.bindingElement,type,_595);
};
Binding.prototype.subscribe=function(_596){
if(!this.hasSubscription(_596)){
this._subscriptions.set(_596,true);
EventBroadcaster.subscribe(_596,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_596);
}
};
Binding.prototype.unsubscribe=function(_597){
if(this.hasSubscription(_597)){
this._subscriptions.del(_597);
EventBroadcaster.unsubscribe(_597,this);
}
};
Binding.prototype.hasSubscription=function(_598){
return this._subscriptions.has(_598);
};
Binding.prototype.observe=function(_599,_59a){
_599.addObserver(this,_59a);
};
Binding.prototype.unObserve=function(_59b,_59c){
_59b.removeObserver(this,_59c);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _5a1={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_5a1);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_5a1);
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
var _5a3=null;
var _5a4=null;
var _5a5=false;
if(arg instanceof Action){
_5a3=arg;
}else{
if(Action.isValid(arg)){
_5a3=new Action(this,arg);
_5a5=true;
}
}
if(_5a3!=null&&Action.isValid(_5a3.type)==true){
if(_5a3.isConsumed==true){
_5a4=_5a3;
}else{
var _5a6=this.actionListeners[_5a3.type];
if(_5a6!=null){
_5a3.listener=this;
var i=0,_5a8;
while((_5a8=_5a6[i++])!=null){
if(_5a8&&_5a8.handleAction){
_5a8.handleAction(_5a3);
}
}
}
var _5a9=true;
if(this.isBlockingActions==true){
switch(_5a3.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a5){
_5a9=false;
}
break;
}
}
if(_5a9){
_5a4=this.migrateAction(_5a3);
}else{
_5a4=_5a3;
}
}
}
return _5a4;
};
Binding.prototype.migrateAction=function(_5aa){
var _5ab=null;
var _5ac=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5ab&&node.nodeType!=Node.DOCUMENT_NODE){
_5ab=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5ab){
_5ac=_5ab.dispatchAction(_5aa);
}else{
_5ac=_5aa;
}
}
return _5ac;
};
Binding.prototype.reflex=function(_5ae){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5ae);
}
};
Binding.prototype.getMigrationParent=function(){
var _5af=null;
if(true){
try{
var _5b0=this.bindingElement.parentNode;
if(_5b0!=null){
_5af=_5b0;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5af=null;
}
}
return _5af;
};
Binding.prototype.add=function(_5b1){
if(_5b1.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5b1.bindingElement);
}else{
throw "Could not add "+_5b1.toString()+" of different document origin.";
}
return _5b1;
};
Binding.prototype.addFirst=function(_5b2){
if(_5b2.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5b2.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5b2.toString()+" of different document origin.";
}
return _5b2;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5b3,_5b4){
return BindingFinder.getAncestorBindingByLocalName(this,_5b3,_5b4);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b6){
return BindingFinder.getAncestorBindingByType(this,impl,_5b6);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b8){
return BindingFinder.getChildElementsByLocalName(this,_5b8);
};
Binding.prototype.getChildElementByLocalName=function(_5b9){
return this.getChildElementsByLocalName(_5b9).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5ba){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5ba));
};
Binding.prototype.getChildBindingsByLocalName=function(_5bb){
return this.getDescendantBindingsByLocalName(_5bb,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5bc){
return this.getChildBindingsByLocalName(_5bc).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5bd,_5be){
return BindingFinder.getDescendantBindingsByLocalName(this,_5bd,_5be);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5bf){
return this.getDescendantBindingsByLocalName(_5bf,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5c2){
return BindingFinder.getNextBindingByLocalName(this,_5c2);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5c3){
return BindingFinder.getPreviousBindingByLocalName(this,_5c3);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5c4){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5c4);
};
Binding.prototype.isFirstBinding=function(_5c5){
return (this.getOrdinalPosition(_5c5)==0);
};
Binding.prototype.isLastBinding=function(_5c6){
return DOMUtil.isLastElement(this.bindingElement,_5c6);
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
Binding.prototype.setCallBackArg=function(_5c8){
this.setProperty(Binding.CALLBACKARG,_5c8);
};
Binding.prototype.dispose=function(_5c9){
if(!this.isDisposed){
if(!_5c9){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5ca=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5ca){
if(Client.isExplorer){
_5ca.outerHTML="";
}else{
_5ca.parentNode.removeChild(_5ca);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5cd){
list.add(_5cd);
});
list.each(function(_5ce){
self.unsubscribe(_5ce);
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
Binding.prototype.wakeUp=function(_5d0,_5d1){
_5d1=_5d1?_5d1:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5d0!==undefined){
self[_5d0]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5d1);
},0);
}
};
Binding.prototype.handleCrawler=function(_5d3){
if(_5d3.response==null&&this.isLazy==true){
if(_5d3.id==DocumentCrawler.ID&&_5d3.mode==DocumentCrawler.MODE_REGISTER){
_5d3.response=NodeCrawler.NORMAL;
}else{
_5d3.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d3.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5d3.id)){
_5d3.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d3.response==null){
switch(_5d3.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5d3.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5d4){
var _5d5=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5d4);
return UserInterface.registerBinding(_5d5,Binding);
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
var _5d6=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d6.each(function(_5d7){
DataBinding.expressions[_5d7.Key]=new RegExp(_5d7.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d8){
var _5d9=null;
var _5da=_5d8.getAncestorBindingByLocalName("field");
if(_5da&&_5da instanceof FieldBinding){
var desc=_5da.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d9=desc.getLabel();
}
}
return _5d9;
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
var _5dd=this.bindingWindow.DataManager;
_5dd.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5df=this.bindingWindow.DataManager;
if(_5df.getDataBinding(name)){
_5df.unRegisterDataBinding(name);
}
_5df.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5e0,arg){
RootBinding.superclass.handleBroadcast.call(this,_5e0,arg);
var _5e2=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5e0){
case _5e2:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5e2);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5e3){
var _5e4=_5e3?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5e3!=this.isActivated){
this.isActivated=_5e3;
this.dispatchAction(_5e4);
var _5e5=new List();
var self=this;
this._activationawares.each(function(_5e7){
if(_5e7.isActivationAware){
try{
if(_5e3){
if(!_5e7.isActivated){
_5e7.onActivate();
}
}else{
if(_5e7.isActivated){
_5e7.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e5.add(_5e7);
}
}
});
_5e5.each(function(_5e8){
this._activationawares.del(_5e8);
});
_5e5.dispose();
}else{
var _5e9="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e9);
}else{
this.logger.error(_5e9);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5ea,_5eb){
if(Interfaces.isImplemented(IActivationAware,_5ea,true)==true){
if(_5eb==false){
this._activationawares.del(_5ea);
}else{
this._activationawares.add(_5ea);
if(this.isActivated==true){
_5ea.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5ea+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5ec){
var _5ed=this.getMigrationParent();
if(_5ed!=null){
var root=_5ed.ownerDocument.body;
var _5ef=UserInterface.getBinding(root);
if(_5ef!=null){
_5ef.makeActivationAware(this,_5ec);
}
}
};
RootBinding.prototype.handleCrawler=function(_5f0){
RootBinding.superclass.handleCrawler.call(this,_5f0);
if(_5f0.type==NodeCrawler.TYPE_ASCENDING){
_5f0.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5f1=null;
if(this.bindingWindow.parent){
_5f1=this.bindingWindow.frameElement;
}
return _5f1;
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
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
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
if(_617!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_617)+"px";
}
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
var _621=this._getBuildElement("labeltext");
if(_621){
this.shadowTree.labelText=_621;
this.shadowTree.text=_621.firstChild;
this.hasLabel=true;
}
}else{
var _622=this.getProperty("label");
var _623=this.getProperty("image");
var _624=this.getProperty("tooltip");
if(_622){
this.setLabel(_622,false);
}
if(_623){
this.setImage(_623,false);
}
if(_624){
this.setToolTip(_624);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_625,_626){
_625=_625!=null?_625:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_625);
this.setProperty("label",_625);
if(!_626){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_628){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_628){
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
LabelBinding.prototype.setToolTip=function(_62b){
this.setProperty("tooltip",_62b);
if(_62b!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_62b));
}
};
LabelBinding.prototype.getToolTip=function(_62c){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_62d){
_62d=_62d==null?true:_62d;
var _62e=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_62d;
if(_62d){
this.attachClassName(_62e);
}else{
this.detachClassName(_62e);
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
var _62f="textonly";
var _630="imageonly";
var _631="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_62f);
this.detachClassName(_630);
this.attachClassName(_631);
}else{
if(this.hasLabel){
this.detachClassName(_631);
this.detachClassName(_630);
this.attachClassName(_62f);
}else{
if(this.hasImage){
this.detachClassName(_631);
this.detachClassName(_62f);
this.attachClassName(_630);
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
LabelBinding.newInstance=function(_632){
var _633=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_632);
return UserInterface.registerBinding(_633,LabelBinding);
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
var _634=this.getProperty("label");
if(!_634){
_634=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_634));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_636){
this.setProperty("label",_636);
};
TextBinding.newInstance=function(_637){
var _638=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_637);
return UserInterface.registerBinding(_638,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_639,_63a){
BroadcasterBinding.superclass.setProperty.call(this,_639,_63a);
function update(list){
if(list){
list.each(function(_63c){
_63c.setProperty(_639,_63a);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _63d=this._observers[_639];
if(_63d){
update(_63d);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_63e){
BroadcasterBinding.superclass.deleteProperty.call(this,_63e);
function update(list){
if(list){
list.each(function(_640){
_640.deleteProperty(_63e);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _641=this._observers[_63e];
if(_641){
update(_641);
}
};
BroadcasterBinding.prototype.addObserver=function(_642,_643){
_643=_643?_643:"*";
_643=new List(_643.split(" "));
while(_643.hasNext()){
var _644=_643.getNext();
switch(_644){
case "*":
this._setAllProperties(_642);
break;
default:
var _645=this.getProperty(_644);
_642.setProperty(_644,_645);
break;
}
if(!this._observers[_644]){
this._observers[_644]=new List();
}
this._observers[_644].add(_642);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_646){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _649=att.nodeName;
switch(_649){
case "id":
case "key":
break;
default:
var _64a=this.getProperty(_649);
_646.setProperty(_649,_64a);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_64b,_64c){
_64c=_64c?_64c:"*";
_64c=new List(_64c.split(" "));
while(_64c.hasNext()){
var list=this._observers[_64c.getNext()];
if(list){
while(list.hasNext()){
var _64e=list.getNext();
if(_64e==_64b){
list.del(_64e);
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
BroadcasterBinding.prototype.setDisabled=function(_64f){
this.setProperty("isdisabled",_64f);
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
var _651=this.getProperty("width");
var _652=this.getProperty("label");
var type=this.getProperty("type");
var _654=this.getProperty("popup");
var _655=this.getProperty("tooltip");
var _656=this.getProperty("isdisabled");
var _657=this.getProperty("response");
var _658=this.getProperty("oncommand");
var _659=this.getProperty("value");
var _65a=this.getProperty("ischecked");
var _65b=this.getProperty("callbackid");
var _65c=this.getProperty("focusable");
var _65d=this.getProperty("focused");
var _65e=this.getProperty("default");
var url=this.getProperty("url");
var _660=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_660){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_652!=null){
this.setLabel(_652);
}
if(type!=null){
this.setType(type);
}
if(_655!=null){
this.setToolTip(_655);
}
if(_651!=null){
this.setWidth(_651);
}
if(_654!=null){
this.setPopup(_654);
}
if(_657!=null){
this.response=_657;
}
if(_65a==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_658!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_658,this);
};
}
if(_65c||this.isFocusable){
this._makeFocusable();
if(_65e||this.isDefault){
this.isDefault=true;
}
if(_65d){
this.focus();
}
}
if(_656==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_65b!=null){
this.bindingWindow.DataManager.registerDataBinding(_65b,this);
if(_659!=null){
Binding.dotnetify(this,_659);
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
ButtonBinding.prototype.setImage=function(_661){
if(this.isAttached){
this.labelBinding.setImage(_661);
}
this.setProperty("image",_661);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_662){
if(this.isAttached){
this.labelBinding.setLabel(_662);
}
this.setProperty("label",_662);
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
ButtonBinding.prototype.setToolTip=function(_664){
this.setProperty("tooltip",_664);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_664));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_665){
this.imageProfile=new _665(this);
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
ButtonBinding.prototype.flip=function(_66a){
_66a=_66a==null?true:_66a;
this.isFlipped=_66a;
this.setProperty("flip",_66a);
if(this.isAttached){
this.labelBinding.flip(_66a);
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
ButtonBinding.prototype.check=function(_66b){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_66b==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_66c){
this.isActive=true;
this.isChecked=true;
if(!_66c){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_66d){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_66d==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_66e){
this.isActive=false;
this.isChecked=false;
if(!_66e){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_66f,_670){
if(_66f==null){
_66f==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_66f){
case true:
this.check(_670);
break;
case false:
this.uncheck(_670);
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
var _672=this.getProperty("tooltip");
if(_672){
this.setToolTip(_672);
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
var _673=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_673=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _673;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _675=this.getEqualSizeWidth();
if(goal>_675){
var diff=goal-_675;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _678=null;
if(this.isAttached==true){
var _679=CSSComputer.getPadding(this.bindingElement);
var _67a=CSSComputer.getPadding(this.bindingElement);
_678=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_678=_678+_679.left+_679.right;
_678=_678+_67a.left+_67a.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _678;
};
ButtonBinding.prototype.setWidth=function(_67b){
if(this.isAttached==true){
var _67c=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _67d=CSSComputer.getPadding(this.shadowTree.c);
var _67e=_67b-_67c;
_67e=_67e-_67d.left-_67d.right;
this.shadowTree.c.style.width=String(_67e)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_67e-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_67b);
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
ButtonBinding.prototype.setValue=function(_67f){
this.shadowTree.dotnetinput.value=_67f;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_680){
this.setValue(_680);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_681){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_681;
this.imageProfile=_681.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_682){
var _683=_682?"addEventListener":"removeEventListener";
this.binding[_683](DOMEvents.MOUSEENTER,this);
this.binding[_683](DOMEvents.MOUSELEAVE,this);
this.binding[_683](DOMEvents.MOUSEDOWN,this);
this.binding[_683](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _685=false,_686=false,_687=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_687=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_687=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_687=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_687=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_687==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_685=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_687=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_687=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_687=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_687=ButtonStateManager.STATE_NORMAL;
var _688=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_688 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_687=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_687==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_686=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_687=ButtonStateManager.STATE_NORMAL;
_685=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_687=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_687=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_687=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_687=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_687==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_685=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_687=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_687=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_687=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_687=ButtonStateManager.STATE_NORMAL;
_685=true;
break;
}
}
}
}
}
switch(_687){
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
if(_685){
this.binding.fireCommand();
}
if(_686){
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
var _68c=this.imageProfile.getDisabledImage();
if(_68c){
this.binding.setImage(_68c);
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
ClickButtonBinding.newInstance=function(_68d){
var _68e=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_68d);
return UserInterface.registerBinding(_68e,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_68f){
var _690=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_68f);
return UserInterface.registerBinding(_690,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_691){
var _692=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_691);
return UserInterface.registerBinding(_692,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_693){
this._binding=_693;
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
var _694=this.getDescendantBindingsByLocalName("control");
_694.each(function(_695){
_695.setControlType(_695.controlType);
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
ControlGroupBinding.newInstance=function(_697){
var _698=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_697);
return UserInterface.registerBinding(_698,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_69b){
ControlBinding.superclass.handleAction.call(this,_69b);
switch(_69b.type){
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
function ControlImageProfile(_69c){
this.binding=_69c;
}
ControlImageProfile.prototype._getImage=function(_69d){
var _69e=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_69e=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_69e=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_69e=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_69e=this.constructor.IMAGE_CLOSE;
break;
}
return _69e.replace("${string}",_69d);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _69f=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_69f=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _69f?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_6a0){
ControlBoxBinding.superclass.handleAction.call(this,_6a0);
switch(_6a0.type){
case ControlBinding.ACTION_COMMAND:
var _6a1=_6a0.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_6a1);
Application.unlock(self);
},0);
_6a0.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6a3){
switch(_6a3.controlType){
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
ControlBoxBinding.prototype.setState=function(_6a4){
var _6a5=this.getState();
this.setProperty("state",_6a4);
this.detachClassName(_6a5);
this.attachClassName(_6a4);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6a6=this.getProperty("state");
if(!_6a6){
_6a6=ControlBoxBinding.STATE_NORMAL;
}
return _6a6;
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
MenuContainerBinding.prototype.isOpen=function(_6a7){
var _6a8=null;
if(!_6a7){
_6a8=this._isOpen;
}else{
_6a8=(_6a7==this._openElement);
}
return _6a8;
};
MenuContainerBinding.prototype.setOpenElement=function(_6a9){
if(_6a9){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6a9;
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
var _6aa=this.getChildBindingByLocalName("menupopup");
if(_6aa&&_6aa!=this.menuPopupBinding){
this.menuPopupBinding=_6aa;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6ab=this.getMenuContainerBinding();
_6ab.setOpenElement(this);
var _6ac=this.getMenuPopupBinding();
_6ac.snapTo(this.bindingElement);
_6ac.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6ad){
MenuContainerBinding.superclass.handleAction.call(this,_6ad);
if(_6ad.type==PopupBinding.ACTION_HIDE){
var _6ae=this.getMenuContainerBinding();
_6ae.setOpenElement(false);
this.reset();
_6ad.consume();
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
MenuBarBinding.prototype.handleAction=function(_6af){
MenuBarBinding.superclass.handleAction.call(this,_6af);
switch(_6af.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6b0=_6af.target;
var _6b1=this.getChildBindingsByLocalName("menu");
while(_6b1.hasNext()){
var menu=_6b1.getNext();
}
switch(_6b0.arrowKey){
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
var _6b3=this.getProperty("image");
var _6b4=this.getProperty("label");
var _6b5=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6b4){
this.setLabel(_6b4);
}
if(_6b3){
this.setImage(_6b3);
}
if(_6b5){
this.setToolTip(_6b5);
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
MenuBinding.prototype.setLabel=function(_6b7){
this.setProperty("label",_6b7);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6b7));
}
};
MenuBinding.prototype.setToolTip=function(_6b8){
this.setProperty("tooltip",_6b8);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6b8));
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
var _6ba=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6ba.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6ba.isOpen()&&!_6ba.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6ba.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6ba.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6bb,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6bb){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6c0){
switch(_6c0.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6c1=null;
var _6c2=true;
self._lastFocused.focus();
self.grabKeyboard();
_6c0.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6c4){
for(var key in this._focused){
if(key!=_6c4.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6c4.key]=_6c4;
this._lastFocused=_6c4;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6c7){
delete this._focused[_6c7.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6c8){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6c8);
}
if(_6c8){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6cb=this.getChildBindingsByLocalName("menugroup");
var _6cc=null;
var _6cd=null;
while(_6cb.hasNext()){
var _6ce=_6cb.getNext();
if(!_6ce.isDefaultContent){
_6ce.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6cc&&_6ce.isVisible){
_6cc=_6ce;
}
if(_6ce.isVisible){
_6cd=_6ce;
}
}
}
if(_6cc&&_6cd){
_6cc.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6cd.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6cf){
MenuBodyBinding.activeInstance=this;
if(_6cf){
var _6d0=this._getMenuItems().getFirst();
if(_6d0){
_6d0.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6d1=this._lastFocused;
if((_6d1!=null)&&(!_6d1.isMenuContainer)){
_6d1.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6d3=this._getMenuItems();
var _6d4=null;
var next=null;
if(this._lastFocused){
_6d4=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6d3.getPreceding(_6d4);
break;
case KeyEventCodes.VK_DOWN:
next=_6d3.getFollowing(_6d4);
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
next=_6d3.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6d7=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6d8){
_6d7=_6d8.getChildBindingsByLocalName("menuitem");
_6d7.each(function(item){
list.add(item);
});
});
_6d7=this.getChildBindingsByLocalName("menuitem");
_6d7.each(function(item){
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
MenuBodyBinding.newInstance=function(_6db){
var _6dc=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6db);
return UserInterface.registerBinding(_6dc,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6dd){
switch(_6dd){
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
MenuGroupBinding.newInstance=function(_6de){
var _6df=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6de);
return UserInterface.registerBinding(_6df,MenuGroupBinding);
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
var _6e0=this.getProperty("image");
var _6e1=this.getProperty("image-hover");
var _6e2=this.getProperty("image-active");
var _6e3=this.getProperty("image-disabled");
if(!this.image&&_6e0){
this.image=_6e0;
}
if(!this.imageHover&&_6e1){
this.imageHover=_6e0;
}
if(!this.imageActive&&_6e2){
this.imageActive=_6e2;
}
if(!this.imageDisabled&&_6e3){
this.imageDisabled=_6e3;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6e4=this.getProperty("label");
var _6e5=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6e7=this.getProperty("isdisabled");
var _6e8=this.getProperty("image");
var _6e9=this.getProperty("image-hover");
var _6ea=this.getProperty("image-active");
var _6eb=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6ec=this.getMenuPopupBinding();
if(_6ec){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6e8){
this.image=_6e8;
}
if(!this.imageHover&&_6e9){
this.imageHover=_6e8;
}
if(!this.imageActive&&_6ea){
this.imageActive=_6ea;
}
if(!this.imageDisabled&&_6eb){
this.imageDisabled=_6eb;
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
if(_6e4!=null){
this.setLabel(_6e4);
}
if(_6e5){
this.setToolTip(_6e5);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6e7==true){
this.disable();
}
var _6ed=this.getProperty("oncommand");
if(_6ed){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6ed);
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
MenuItemBinding.prototype.setLabel=function(_6f0){
this.setProperty("label",_6f0);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6f0));
}
};
MenuItemBinding.prototype.setToolTip=function(_6f1){
this.setProperty("tooltip",_6f1);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6f1));
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
var _6f3=this.bindingDocument.createElement("div");
_6f3.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6f3.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6f4=this.labelBinding.bindingElement;
_6f4.insertBefore(_6f3,_6f4.firstChild);
_6f3.style.display="none";
this.shadowTree.checkBoxIndicator=_6f3;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6f3=this.bindingDocument.createElement("div");
_6f3.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6f3.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6f4=this.labelBinding.bindingElement;
_6f4.insertBefore(_6f3,_6f4.firstChild);
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
var _6f6=this.imageProfile.getDisabledImage();
if(_6f6){
this.setImage(_6f6);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6f6=this.imageProfile.getDefaultImage();
if(_6f6){
this.setImage(_6f6);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6f8=this.getMenuContainerBinding();
if(_6f8.isOpen()&&!_6f8.isOpen(this)){
_6f8._openElement.hide();
_6f8.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6f8=this.getMenuContainerBinding();
if(!_6f8.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6fa){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6fb=this.getMenuContainerBinding();
if(!_6fb||!_6fb.isOpen(this)||_6fa){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6fc){
this.setChecked(true,_6fc);
};
MenuItemBinding.prototype.uncheck=function(_6fd){
this.setChecked(false,_6fd);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6fe,_6ff){
this.setProperty("ischecked",_6fe);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6fe){
this.isChecked=_6fe;
this.shadowTree.checkBoxIndicator.style.display=_6fe?"block":"none";
if(!_6ff){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_700){
var _701=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_700);
UserInterface.registerBinding(_701,MenuItemBinding);
return UserInterface.getBinding(_701);
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
PopupBinding.handleBroadcast=function(_702,arg){
switch(_702){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _706=PopupBinding.activeInstances.get(key);
var _707=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_706);
if(!_707){
list.add(_706);
}
});
list.each(function(_708){
_708.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _70a=PopupBinding.activeInstances.get(key);
_70a.hide();
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
var _70b=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _70c=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_70b){
this._bodyBinding=UserInterface.getBinding(_70b);
}else{
if(_70c){
this._bodyBinding=UserInterface.getBinding(_70c);
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
var _70d=this.getProperty("position");
this.position=_70d?_70d:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_70e){
var _70f=null;
if(this._bodyBinding){
this._bodyBinding.add(_70e);
_70f=_70e;
}else{
_70f=PopupBinding.superclass.add.call(this,_70e);
}
return _70f;
};
PopupBinding.prototype.addFirst=function(_710){
var _711=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_710);
_711=_710;
}else{
_711=PopupBinding.superclass.addFirst.call(this,_710);
}
return _711;
};
PopupBinding.prototype.handleAction=function(_712){
PopupBinding.superclass.handleAction.call(this,_712);
var _713=_712.target;
switch(_712.type){
case Binding.ACTION_ATTACHED:
if(_713 instanceof MenuItemBinding){
this._count(true);
_712.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_713 instanceof MenuItemBinding){
this._count(false);
_712.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_714){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_714?1:-1);
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
PopupBinding.prototype.snapTo=function(_715){
var _716=this._getElementPosition(_715);
switch(this.position){
case PopupBinding.POSITION_TOP:
_716.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_716.x+=_715.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_716.y+=_715.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_716.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_715;
this.bindingElement.style.display="block";
this.setPosition(_716.x,_716.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_718){
this.bindingElement.style.display="block";
this.setPosition(_718.x,_718.y);
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
PopupBinding.prototype._getElementPosition=function(_71d){
return _71d.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_71d):DOMUtil.getUniversalPosition(_71d);
};
PopupBinding.prototype._getMousePosition=function(e){
var _71f=DOMEvents.getTarget(e);
return _71f.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_720){
var _721=this.bindingElement;
if(_720){
if(Client.hasTransitions){
_721.style.visibility="visible";
_721.style.opacity="1";
}else{
_721.style.visibility="visible";
}
}else{
_721.style.visibility="hidden";
_721.style.display="none";
if(Client.hasTransitions){
_721.style.opacity="0";
}
}
this.isVisible=_720;
};
PopupBinding.prototype._enableTab=function(_722){
var self=this;
var _724=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_724.each(function(_725){
_725.bindingElement.tabIndex=_722?0:-1;
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
var _72d=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_72d.y<0){
y=-_72d.y;
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
PopupBinding.prototype.grabKeyboard=function(_72f){
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
var _735=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_735=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _735;
};
PopupBinding.prototype.clear=function(){
var _736=this._bodyBinding;
if(_736){
_736.detachRecursive();
_736.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_737){
var _738=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_737);
return UserInterface.registerBinding(_738,PopupBinding);
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
PopupBodyBinding.newInstance=function(_73a){
var _73b=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_73a);
return UserInterface.registerBinding(_73b,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_73c){
return new Point(_73c.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_73d){
var _73e=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_73d);
return UserInterface.registerBinding(_73e,MenuPopupBinding);
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
var _73f=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_73f){
this._body=UserInterface.getBinding(_73f);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _740=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_740.hasNext()){
var _741=DialogBorderBinding.newInstance(this.bindingDocument);
_741.setType(_740.getNext());
this.add(_741);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _742=this.getProperty("controls");
if(_742){
var _743=new List(_742.split(" "));
while(_743.hasNext()){
var type=_743.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _745=DialogControlBinding.newInstance(this.bindingDocument);
_745.setControlType(type);
this._titlebar.addControl(_745);
this.controlBindings[type]=_745;
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
var _746=this.getProperty("image");
var _747=this.getProperty("label");
var _748=this.getProperty("draggable");
var _749=this.getProperty("resizable");
var _74a=this.getProperty("modal");
if(_746){
this.setImage(_746);
}
if(_747){
this.setLabel(_747);
}
if(_748==false){
this.isDialogDraggable=false;
}
if(_749==false){
this.isPanelResizable=false;
}
if(_74a==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_74b){
this.isModal=_74b;
};
DialogBinding.prototype.setLabel=function(_74c){
this.setProperty("label",_74c);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_74c));
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
DialogBinding.prototype.handleAction=function(_74e){
DialogBinding.superclass.handleAction.call(this,_74e);
switch(_74e.type){
case Binding.ACTION_DRAG:
var _74f=_74e.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_74f.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_74f.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_74f;
_74f.dragger.registerHandler(this);
}
break;
}
}
_74e.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_74e.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_750,arg){
DialogBinding.superclass.handleBroadcast.call(this,_750,arg);
switch(_750){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_752){
DialogBinding.superclass.handleInvokedControl.call(this,_752);
switch(_752.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_753){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_753){
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
var _755=self.bindingElement;
setTimeout(function(){
_755.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_756){
this.bindingElement.style.zIndex=new String(_756);
};
DialogBinding.prototype.onDragStart=function(_757){
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
DialogBinding.prototype.setResizable=function(_769){
if(this._isResizable!=_769){
if(_769){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_769;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _76a=null;
var _76b=this.bindingDocument.body.offsetWidth;
var _76c=this.bindingDocument.body.offsetHeight;
_76a={x:0.125*_76b,y:0.125*_76c,w:0.75*_76b,h:0.5*_76c};
return _76a;
};
DialogBinding.prototype.centerOnScreen=function(){
var _76d=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_76d.w-dim.w),0.5*(_76d.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _76f=this;
var i=0;
function blink(){
if(i%2==0){
_76f.detachClassName("active");
}else{
_76f.attachClassName("active");
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
var _773="";
while(list.hasNext()){
var type=list.getNext();
_773+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_773);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_774){
var _775=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_774);
return UserInterface.registerBinding(_775,DialogBinding);
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
DialogHeadBinding.newInstance=function(_776){
var _777=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_776);
return UserInterface.registerBinding(_777,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_77a){
var _77b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_77a);
return UserInterface.registerBinding(_77b,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_77c){
var _77d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_77c);
return UserInterface.registerBinding(_77d,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_77e){
DialogSetBinding.superclass.handleAction.call(this,_77e);
var _77f=_77e.target;
switch(_77e.type){
case Binding.ACTION_MOVETOTOP:
if(_77f instanceof DialogBinding){
this._moveToTop(_77f);
}
break;
case Binding.ACTION_MOVEDONTOP:
_77e.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_780){
var _781=0;
var _782=this.getChildBindingsByLocalName("dialog");
_782.each(function(_783){
var _784=_783.getZIndex();
_781=_784>_781?_784:_781;
});
_780.setZIndex(_781+2);
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
DialogBorderBinding.newInstance=function(_786){
var _787=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_786);
return UserInterface.registerBinding(_787,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_788){
this._dialogBinding=_788;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_78a){
DialogCoverBinding.superclass.handleAction.call(this,_78a);
var _78b=_78a.target;
if(this._dialogBinding.isModal){
switch(_78a.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_78b==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_78b.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_78c,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_78c,arg);
switch(_78c){
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
var _78f=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_78f);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _790=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_790);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_791){
var _792=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_791);
return UserInterface.registerBinding(_792,DialogCoverBinding);
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
var _793=this.getProperty("image");
if(_793){
this.setImage(_793);
}
var _794=this.getProperty("label");
if(_794){
this.setLabel(_794);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_795){
if(this.isAttached){
this.labelBinding.setLabel(_795);
}
this.setProperty("label",_795);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_797){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_797);
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
DialogTitleBarBinding.newInstance=function(_798){
var _799=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_798);
return UserInterface.registerBinding(_799,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_79a){
var _79b=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_79a);
return UserInterface.registerBinding(_79b,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_79c){
var _79d=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_79c);
return UserInterface.registerBinding(_79d,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_79e){
this.binding=_79e;
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
var _7a1=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a2=node.nodeName.toLowerCase();
switch(_7a2){
case "script":
case "style":
case "textarea":
_7a1=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _7a1;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a9=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a9=false;
}
return _7a9;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7aa,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7aa,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7ae=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7ae+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b4){
var _7b5="";
var _7b6="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b7="</span>";
var self=this;
function iterate(_7b9){
var _7ba=-1;
var _7bb=null;
self._map.each(function(key,exp){
var low=_7b9.toLowerCase();
var _7bf=low.search(exp);
if(_7bf>-1){
if(_7ba==-1){
_7ba=_7bf;
}
if(_7bf<=_7ba){
_7ba=_7bf;
_7bb=key;
}
}
});
if(_7ba>-1&&_7bb!=null){
var pre=_7b9.substring(0,_7ba);
var hit=_7b9.substring(_7ba,_7ba+_7bb.length);
var pst=_7b9.substring(_7ba+_7bb.length,_7b9.length);
_7b5+=pre+_7b6+hit+_7b7;
iterate(pst);
}else{
_7b5+=_7b9;
}
}
iterate(_7b4);
return _7b5;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c3){
var _7c4=new List(_7c3.getElementsByTagName("span"));
_7c4.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c3.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c7){
var _7c8=null;
if(_7c7.isAttached){
var doc=_7c7.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c8=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c8 instanceof SOAPFault){
_7c8=null;
}
}
}
return _7c8;
};
WindowBinding.highlightKeywords=function(_7cc,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7cc.isAttached){
var doc=_7cc.getContentDocument();
if(doc!=null){
var _7cf=WindowBinding._highlightcrawler;
_7cf.reset(doc.body);
if(list!=null){
_7cf.setKeys(list);
_7cf.crawl(doc.body);
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
var _7d0=WindowBinding.superclass.serialize.call(this);
if(_7d0){
_7d0.url=this.getURL();
}
return _7d0;
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
var _7d2=this.getContentWindow().DocumentManager;
if(_7d2!=null){
_7d2.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d3){
WindowBinding.superclass.handleAction.call(this,_7d3);
var _7d4=_7d3.target;
switch(_7d3.type){
case RootBinding.ACTION_PHASE_3:
if(_7d4.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d4);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d3.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7d5){
if(!this.isFit||_7d5){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7d6){
if(this._pageBinding==null){
if(_7d6.bindingWindow==this.getContentWindow()){
this._pageBinding=_7d6;
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
WindowBinding.prototype._registerOnloadListener=function(_7d7){
var _7d8=this.shadowTree.iframe;
var _7d9=_7d7?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7dc=true;
if(Client.isExplorer){
_7dc=_7d8.readyState=="complete";
}
if(_7dc==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d9](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7dd){
var _7de=_7dd?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7de](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7e2=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7e2=url;
}
return _7e2;
};
WindowBinding.prototype.reload=function(_7e4){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7e5=null;
if(this.shadowTree.iframe!=null){
_7e5=this.shadowTree.iframe;
}
return _7e5;
};
WindowBinding.prototype.getContentWindow=function(){
var _7e6=null,_7e7=this.getFrameElement();
if(_7e7!==null){
try{
_7e6=_7e7.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7e6;
};
WindowBinding.prototype.getContentDocument=function(){
var _7e8=null,win=this.getContentWindow();
if(win){
_7e8=win.document;
}
return _7e8;
};
WindowBinding.prototype.getRootBinding=function(){
var _7ea=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7ea=UserInterface.getBinding(doc.body);
}
return _7ea;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7ec){
this.bindingElement.style.height=_7ec+"px";
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
WindowBinding.prototype.handleCrawler=function(_7ed){
WindowBinding.superclass.handleCrawler.call(this,_7ed);
if(_7ed.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7ed.nextNode=root.bindingElement;
}else{
_7ed.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7f2){
var _7f3=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7f2);
var _7f4=UserInterface.registerBinding(_7f3,WindowBinding);
return _7f4;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f8){
_7f8.target.show();
_7f8.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7fa){
_7fa.target.show();
_7fa.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7fc){
PreviewWindowBinding.superclass.handleAction.call(this,_7fc);
switch(_7fc.type){
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
var _7fd=null;
this._getRadioButtonBindings().each(function(_7fe){
if(_7fe.getProperty("ischecked")){
_7fd=_7fe;
return false;
}else{
return true;
}
});
if(_7fd){
this._checkedRadioBinding=_7fd;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7ff){
RadioGroupBinding.superclass.handleAction.call(this,_7ff);
var _800=_7ff.target;
switch(_7ff.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7ff.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_800.isRadioButton&&!_800.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_800);
}
this._checkedRadioBinding=_800;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7ff.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_801,_802){
if(_801 instanceof RadioDataBinding){
_801=_801.getButton();
}
if(_801.isRadioButton){
switch(_802){
case true:
this._unCheckRadioBindingsExcept(_801);
this._checkedRadioBinding=_801;
_801.check(true);
break;
default:
_801.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_803){
var _804=this._getRadioButtonBindings();
_804.each(function(_805){
if(_805.isChecked&&_805!=_803){
_805.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _806=new Crawler();
var list=new List();
_806.addFilter(function(_808){
var _809=true;
var _80a=UserInterface.getBinding(_808);
if(_80a instanceof RadioGroupBinding){
_809=NodeCrawler.SKIP_CHILDREN;
}else{
if(_80a instanceof ButtonBinding&&_80a.isRadioButton){
list.add(_80a);
}
}
return _809;
});
_806.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_80b){
var _80c=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_80b);
return UserInterface.registerBinding(_80c,RadioGroupBinding);
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
var _80e=this.getProperty("regexrule");
if(_80e!=null){
this.expression=new RegExp(_80e);
}
var _80f=this.getProperty("onbindingblur");
if(_80f!=null){
this.onblur=function(){
Binding.evaluate(_80f,this);
};
}
var _810=this.getProperty("onvaluechange");
if(_810!=null){
this.onValueChange=function(){
Binding.evaluate(_810,this);
};
}
if(this.error==null&&this.type!=null){
var _811=DataBinding.errors[this.type];
if(_811!=null){
this.error=_811;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _812=this.getProperty("value");
if(_812!=null){
this.setValue(String(_812));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _814=this.getProperty("isdisabled");
if(_814==true){
this.setDisabled(true);
}
var _815=this.getProperty("readonly");
if(_815==true){
this.setReadOnly(true);
}
var _816=this.getProperty("autoselect");
if(_816==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _817=Localization.currentLang();
if(_817!=null){
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
var _818=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_818.type=this.isPassword==true?"password":"text";
_818.tabIndex=-1;
return _818;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_81b){
if(_81b){
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
DataInputBinding.prototype.focus=function(_81d){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_81d){
var self=this,_81f=this.bindingElement,_820={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_81f,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_81f,DOMEvents.MOUSEUP,_820);
}else{
this.select();
}
}
this.onfocus();
if(!_81d){
var _821=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_821);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _822=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _823=_822.createTextRange();
_823.moveStart("character",0);
_823.moveEnd("character",_822.value.length);
_823.select();
}else{
_822.setSelectionRange(0,_822.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_824){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_824){
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
DataInputBinding.prototype.validate=function(_828){
if(_828==true||this._isValid){
var _829=this.isValid();
if(_829!=this._isValid){
this._isValid=_829;
if(!_829){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _82a=null;
if(this._isInvalidBecauseRequired==true){
_82a=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_82a=DataBinding.warnings["minlength"];
_82a=_82a.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_82a=DataBinding.warnings["maxlength"];
_82a=_82a.replace("${count}",String(this.maxlength));
}else{
_82a=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_82a!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_82a);
}
}else{
this.setValue(_82a);
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
var _82b=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _82c=this.getValue();
if(_82c==""){
if(this.isRequired==true){
_82b=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _82d=DataBinding.expressions[this.type];
if(!_82d.test(_82c)){
_82b=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_82c)){
_82b=false;
}
}
}
}
if(_82b&&this.minlength!=null){
if(_82c.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_82b=false;
}
}
if(_82b&&this.maxlength!=null){
if(_82c.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_82b=false;
}
}
return _82b;
};
DataInputBinding.prototype.setDisabled=function(_82e){
if(_82e!=this.isDisabled){
if(_82e){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _82f=this.shadowTree.input;
if(_82e){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_82f,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_82f,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_82e;
this.shadowTree.input.unselectable=_82e?"on":"off";
}
this.isDisabled=_82e;
this.isFocusable=!_82e;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_831){
if(_831!=this.isReadOnly){
if(_831){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_831;
this.isReadOnly=_831;
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
DataInputBinding.prototype.handleElement=function(_832){
return true;
};
DataInputBinding.prototype.updateElement=function(_833){
var _834=_833.getAttribute("value");
var _835=_833.getAttribute("type");
var _836=_833.getAttribute("maxlength");
var _837=_833.getAttribute("minlength");
if(_834==null){
_834="";
}
var _838=this.bindingWindow.UpdateManager;
if(this.getValue()!=_834){
_838.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_834);
}
if(this.type!=_835){
_838.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_835;
}
if(this.maxlength!=_836){
_838.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_836;
}
if(this.minlength!=_837){
_838.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_837;
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
DataInputBinding.prototype.setValue=function(_839){
if(_839===null){
_839="";
}
if(_839!=this.getValue()){
this.setProperty("value",_839);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_839);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _83a=null;
if(this.shadowTree.input!=null){
_83a=this.shadowTree.input.value;
}else{
_83a=this.getProperty("value");
}
return _83a;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _83c=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_83c=Number(_83c);
break;
}
return _83c;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_83d){
var _83e=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_83d);
return UserInterface.registerBinding(_83e,DataInputBinding);
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
var _83f=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_83f!=null){
this.setValue(_83f.value);
_83f.parentNode.removeChild(_83f);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _840=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_840.tabIndex=-1;
return _840;
};
TextBoxBinding.prototype.handleElement=function(_841){
return true;
};
TextBoxBinding.prototype.updateElement=function(_842){
var _843,area=_842.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_843=DOMUtil.getTextContent(area);
}
if(_843==null){
_843="";
}
var _845=this.bindingWindow.UpdateManager;
if(this.getValue()!=_843){
_845.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_843);
}
var _846=_842.getAttribute("type");
if(this.type!=_846){
_845.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_846;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_84a){
var _84b=this.bindingDocument.selection.createRange();
var _84c=_84b.text=="";
if(_84c&&!_84a){
_84b.text="\t";
}else{
var text="";
var _84e=_84b.text.length;
while((_84b.moveStart("word",-1)&&_84b.text.charAt(1)!="\n")){
}
_84b.moveStart("character",1);
var _84f=0;
var i=0,line,_852=_84b.text.split("\n");
while((line=_852[i++])!=null){
if(_84a){
line=line.replace(/^(\s)/mg,"");
_84f++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_852[i+1]?"\n":"");
}
_84b.text=text;
_84b.moveStart("character",-_84e);
if(_84a){
_84b.moveStart("character",2*_852.length-2);
}
_84b.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _853=this.bindingDocument.selection.createRange();
var _854=_853.duplicate();
while((_854.moveStart("word",-1)&&_854.text.indexOf("\n")==-1)){
}
_854.moveStart("character",1);
_853.text="\n"+_854.text.match(/^(\s)*/)[0]+"!";
_853.moveStart("character",-1);
_853.select();
_853.text="";
_853.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_855){
var _856;
var _857;
var oss;
var osy;
var i;
var fnd;
var _85c=this._getSelectedText();
var el=this.shadowTree.input;
_856=el.scrollLeft;
_857=el.scrollTop;
if(!_85c.match(/\n/)){
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
_85c=this._getSelectedText();
if(_855){
ntext=_85c.replace(/^(\s)/mg,"");
}else{
ntext=_85c.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_85c.length);
}
el.scrollLeft=_856;
el.scrollTop=_857;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _85e;
var _85f;
var oss;
var osy;
var el=this.shadowTree.input;
_85e=el.scrollLeft;
_85f=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_85e;
el.scrollTop=_85f;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _866=this.shadowTree.input.value;
var _867=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _866.substr(_867,end-_867);
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
var _869=this.getProperty("isdisabled");
if(this.isDisabled||_869){
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
var _86b=this.getProperty("label");
var _86c=this.getProperty("value");
var _86d=this.getProperty("width");
var _86e=this.getProperty("onchange");
var _86f=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_86b!=null){
this.label=_86b;
}
if(!this.value&&_86c!=null){
this.value=_86c;
}
if(!this.width&&_86d){
this.width=_86d;
}
if(_86f){
this.isRequired=true;
}
if(_86e){
this.onValueChange=function(){
Binding.evaluate(_86e,this);
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
var _870=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_870.name=this.getName();
_870.value=this.getValue();
_870.type="hidden";
if(this.hasCallBackID()){
_870.id=this.getCallBackID();
}
this.shadowTree.input=_870;
this.bindingElement.appendChild(_870);
};
SelectorBinding.prototype.buildButton=function(){
var _871=this.BUTTON_IMPLEMENTATION;
var _872=this.add(_871.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_872.imageProfile=this.imageProfile;
}
if(this.width!=null){
_872.setWidth(this.width);
}
this._buttonBinding=_872;
this.shadowTree.button=_872;
_872.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _874=top.app.bindingMap.selectorpopupset;
var doc=_874.bindingDocument;
var _876=_874.add(PopupBinding.newInstance(doc));
var _877=_876.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_876;
this._menuBodyBinding=_877;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_876.attachClassName("selectorpopup");
_876.addActionListener(PopupBinding.ACTION_SHOW,this);
_876.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_876.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_876);
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
var _87a=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_87a).each(function(_87b){
var _87c=_87b.getAttribute("label");
var _87d=_87b.getAttribute("value");
var _87e=_87b.getAttribute("selected");
var _87f=_87b.getAttribute("image");
var _880=_87b.getAttribute("image-hover");
var _881=_87b.getAttribute("image-active");
var _882=_87b.getAttribute("image-disabled");
var _883=null;
if(_87f||_880||_881||_882){
_883=new ImageProfile({image:_87f,imageHover:_880,imageActive:_881,imageDisabled:_882});
}
list.add(new SelectorBindingSelection(_87c?_87c:null,_87d?_87d:null,_87e&&_87e=="true",_883));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _885=null;
while(list.hasNext()){
var _886=list.getNext();
var item=this.addSelection(_886);
if(_886.isSelected){
this.select(item,true);
}
if(!_885){
_885=item;
}
}
if(!this._selectedItemBinding){
this.select(_885,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_888,_889){
var _88a=this.MENUITEM_IMPLEMENTATION;
var _88b=this._menuBodyBinding;
var _88c=_88b.bindingDocument;
var _88d=_88a.newInstance(_88c);
_88d.imageProfile=_888.imageProfile;
_88d.setLabel(_888.label);
if(_888.tooltip!=null){
_88d.setToolTip(_888.tooltip);
}
_88d.selectionValue=_888.value;
_888.menuItemBinding=_88d;
if(_889){
_88b.addFirst(_88d);
this.selections.addFirst(_888);
}else{
_88b.add(_88d);
this.selections.add(_888);
}
this._isUpToDate=false;
return _88d;
};
SelectorBinding.prototype.addSelectionFirst=function(_88e){
return this.addSelection(_88e,true);
};
SelectorBinding.prototype.clear=function(_88f){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_88f&&this.defaultSelection!=null){
var _890=this.addSelection(this.defaultSelection);
this.select(_890,true);
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
SelectorBinding.prototype.setDisabled=function(_891){
if(this.isAttached==true){
var _892=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_891?"none":"block";
_892.setDisabled(_891);
}
if(_891){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_893){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_893);
}
};
SelectorBinding.prototype.handleAction=function(_894){
SelectorBinding.superclass.handleAction.call(this,_894);
switch(_894.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_894.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_894.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_894.target);
_894.consume();
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
_894.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_896){
this.select(_896);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _897=this._buttonBinding.bindingElement.offsetWidth+"px";
var _898=this._popupBinding.bindingElement;
_898.style.minWidth=_897;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _89a=Client.isExplorer?e.keyCode:e.which;
if(_89a==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _89a=Client.isExplorer?e.keyCode:e.which;
if(_89a>=32){
this._buttonBinding.check();
var _89b=String.fromCharCode(_89a);
this._pushSearchSelection(_89b);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_89c){
this._searchString+=_89c.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_89d){
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
var _89e=this._menuBodyBinding;
if(_89e!=null){
var _89f=this.MENUITEM_IMPLEMENTATION;
var _8a0=_89e.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8a2=list.getNext();
if(_8a2.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8a2);
}
}
}
this._attachSelections();
var _8a3=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8a4=_89e.getDescendantBindingsByType(_89f);
if(_8a4.hasEntries()){
while(_8a4.hasNext()){
var _8a5=_8a4.getNext();
var _8a6=_8a5.labelBinding;
if(_8a6!=null&&_8a6.shadowTree!=null&&_8a6.shadowTree.labelText!=null){
_8a6.shadowTree.labelText.innerHTML=_8a6.shadowTree.labelText.innerHTML.replace(_8a3,"<b>$&</b>");
}
}
_8a4.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8a6=LabelBinding.newInstance(_8a0);
_8a6.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_89e.add(_8a6);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8a2=list.getNext();
var item=this.addSelection(_8a2);
if(this._selectionValue==_8a2.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8a8,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8a8,arg);
switch(_8a8){
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
SelectorBinding.prototype.select=function(_8ab,_8ac){
var _8ad=false;
if(_8ab!=this._selectedItemBinding){
this._selectedItemBinding=_8ab;
_8ad=true;
var _8ae=this._buttonBinding;
this._selectionValue=_8ab.selectionValue;
this._selectionLabel=_8ab.getLabel();
_8ae.setLabel(_8ab.getLabel());
if(_8ab.imageProfile!=null){
_8ae.imageProfile=_8ab.imageProfile;
}
if(_8ae.imageProfile!=null){
_8ae.setImage(this.isDisabled==true?_8ae.imageProfile.getDisabledImage():_8ae.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8ac){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8ac)){
this.validate();
}
}
return _8ad;
};
SelectorBinding.prototype._relate=function(){
var _8af=this.getProperty("relate");
if(_8af){
var _8b0=this.bindingDocument.getElementById(_8af);
if(_8b0){
var _8b1=UserInterface.getBinding(_8b0);
if(_8b1){
if(this.isChecked){
_8b1.show();
}else{
_8b1.hide();
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
SelectorBinding.prototype.selectByValue=function(_8b2,_8b3){
var _8b4=false;
var _8b5=this._menuBodyBinding;
var _8b6=_8b5.getDescendantElementsByLocalName("menuitem");
while(_8b6.hasNext()){
var _8b7=UserInterface.getBinding(_8b6.getNext());
if(_8b7.selectionValue==_8b2){
_8b4=this.select(_8b7,_8b3);
break;
}
}
return _8b4;
};
SelectorBinding.prototype.getValue=function(){
var _8b8=this._selectionValue;
if(_8b8!=null){
_8b8=String(_8b8);
}
return _8b8;
};
SelectorBinding.prototype.setValue=function(_8b9){
this.selectByValue(String(_8b9),true);
};
SelectorBinding.prototype.getResult=function(){
var _8ba=this._selectionValue;
if(_8ba=="null"){
_8ba=null;
}
if(_8ba){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8ba=Number(_8ba);
break;
}
}
return _8ba;
};
SelectorBinding.prototype.setResult=function(_8bb){
this.selectByValue(_8bb,true);
};
SelectorBinding.prototype.validate=function(){
var _8bc=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8bd=this.getValue();
if(_8bd==this.defaultSelection.value){
_8bc=false;
}
if(_8bc!=this._isValid){
if(_8bc){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8bc;
}
return _8bc;
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
var _8be=this._popupBinding;
if(!this._isUpToDate){
_8be.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8bf,_8c0){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8bf));
return true;
};
SelectorBinding.newInstance=function(_8c1){
var _8c2=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8c1);
return UserInterface.registerBinding(_8c2,SelectorBinding);
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
var _8c5=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8c5){
this.onValueChange=function(){
Binding.evaluate(_8c5,this);
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
SimpleSelectorBinding.prototype.focus=function(_8c8){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8c8){
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
SimpleSelectorBinding.prototype._hack=function(_8c9){
if(Client.isExplorer){
this._select.style.width=_8c9?"auto":this._cachewidth+"px";
if(_8c9){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8ca=true;
if(this.isRequired){
if(this.getValue()==null){
_8ca=false;
}
}
if(_8ca!=this._isValid){
if(_8ca){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8cb=this._select;
var _8cc=_8cb.options[_8cb.selectedIndex];
var text=DOMUtil.getTextContent(_8cc);
_8cb.blur();
_8cb.style.color="#A40000";
_8cb.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8cc,DataBinding.warnings["required"]);
}
_8cb.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8cc,text);
}
};
}
this._isValid=_8ca;
}
return _8ca;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8ce=null;
var _8cf=this._select;
var _8d0=_8cf.options[_8cf.selectedIndex];
var _8d1=true;
if(Client.isExplorer){
var html=_8d0.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8d1=false;
}
}
if(_8d1){
_8ce=_8d0.getAttribute("value");
}
return _8ce;
};
SimpleSelectorBinding.prototype.setValue=function(_8d3){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8d4){
this.setValue(_8d4);
};
SimpleSelectorBinding.newInstance=function(_8d5){
var _8d6=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8d5);
return UserInterface.registerBinding(_8d6,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8d7,_8d8,_8d9,_8da,_8db){
this._init(_8d7,_8d8,_8d9,_8da,_8db);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8dc,_8dd,_8de,_8df,_8e0){
if(_8dc!=null){
this.label=String(_8dc);
}
if(_8dd!=null){
this.value=String(_8dd);
}
if(_8df!=null){
this.imageProfile=_8df;
}
if(_8e0!=null){
this.tooltip=_8e0;
}
this.isSelected=_8de?true:false;
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
var _8e1=this.getProperty("image");
if(_8e1){
this.setImage(_8e1);
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
var _8e4=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8e4.popupBindingTargetElement=this.shadowTree.input;
_8e4.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8e4.attach();
var self=this;
_8e4.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8e4;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8e7=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8e7).each(function(_8e8){
if(_8e8.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8e9=_8e8.getAttribute("value");
var _8ea=_8e8.getAttribute("selected");
var _8eb=_8e8.getAttribute("tooltip");
list.add({value:_8e9?_8e9:null,toolTip:_8eb?_8eb:null,isSelected:(_8ea&&_8ea=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8ed=this._menuBodyBinding;
var _8ee=_8ed.bindingDocument;
while(_8ed.bindingElement.hasChildNodes()){
var node=_8ed.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8ed.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8f0=this.getProperty("emptyentrylabel");
if(_8f0){
var _8f1=MenuItemBinding.newInstance(_8ee);
_8f1.setLabel(_8f0);
_8f1.selectionValue="";
_8ed.add(_8f1);
}
while(list.hasNext()){
var _8f2=list.getNext();
var _8f1=MenuItemBinding.newInstance(_8ee);
_8f1.setLabel(_8f2.label?_8f2.label:_8f2.value);
_8f1.selectionValue=_8f2.value;
if(_8f2.image){
_8f1.setImage(_8f2.image);
}
if(_8f2.toolTip){
_8f1.setToolTip(_8f2.toolTip);
}
if(_8f2.isSelected){
this.select(_8f1,true);
}
_8ed.add(_8f1);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8f3){
this.select(_8f3);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8f4,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8f4,arg);
switch(_8f4){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8f4,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8f6){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8f6);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8f7){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8f7);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8f8=this.bindingElement.offsetWidth+"px";
var _8f9=this._popupBinding.bindingElement;
_8f9.style.minWidth=_8f8;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8fa=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8fb=this.getValue();
var _8fc=null;
_8fa.each(function(item){
if(item.getLabel()==_8fb){
_8fc=item;
}
});
if(_8fc){
_8fc.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8ff){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8ff){
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
DataInputSelectorBinding.prototype.setValue=function(_900){
var _901=this.isReadOnly;
var _902=null;
if(_900!=null&&_900!=""){
var _903=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_903.hasNext()){
var item=_903.getNext();
if(item.selectionValue==_900){
_902=item.getLabel();
break;
}
}
}
if(_902!=null){
this.value=_900;
this.shadowTree.input.value=_902;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_900);
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
var _906="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_906);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_906);
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
var _908=ToolBarButtonBinding.newInstance(this.bindingDocument);
_908.setImage("${icon:popup}");
this.addFirst(_908);
_908.attach();
var self=this;
_908.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _90a=self.getProperty("handle");
var _90b=ViewDefinition.clone(_90a,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_90b instanceof DialogViewDefinition){
_90b.handler={handleDialogResponse:function(_90c,_90d){
self._isButtonClicked=false;
if(_90c==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _90e=_90d.getFirst();
self.setValue(_90e);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_90b.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_90b);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_908.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_908;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _910=this._dialogButtonBinding;
if(_910!=null){
_910.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _912=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_912=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _912;
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
var _915=ToolBarButtonBinding.newInstance(this.bindingDocument);
_915.setImage("${icon:editor-sourceview}");
_915.bindingElement.style.left="-24px";
_915.bindingElement.style.width="24px";
this.addFirst(_915);
_915.attach();
_915.hide();
var self=this;
_915.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_915;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_916){
UrlInputDialogBinding.superclass.setValue.call(this,_916);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_916);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _917=TreeService.GetCompositeUrlLabel(_916);
if(_917!=_916){
this.setLabel(_917);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_918){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_918;
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
var _919=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _91a=this.getProperty("image");
if(_91a!=null){
_919.setImage(_91a);
}else{
_919.setImage("${icon:popup}");
}
this.addFirst(_919);
_919.attach();
var self=this;
_919.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_919;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _91c=this._dialogButtonBinding;
if(_91c!=null){
_91c.oncommand();
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
var _91d=this.getProperty("label");
var _91e=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_91d!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_91d+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_91d);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_91e!=null){
this._buttonBinding.setToolTip(_91e);
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
DataDialogBinding.prototype.handleAction=function(_920){
DataDialogBinding.superclass.handleAction.call(this,_920);
var _921=_920.target;
var self=this;
switch(_920.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_923,_924){
if(_923==Dialog.RESPONSE_ACCEPT){
if(_924 instanceof DataBindingMap){
self._map=_924;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_921==this._buttonBinding){
_920.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_925,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_925,arg);
switch(_925){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _928=this.getProperty("handle");
var url=this.getURL();
var _92a=null;
if(_928!=null||def!=null){
if(def!=null){
_92a=def;
}else{
_92a=ViewDefinitions[_928];
}
if(_92a instanceof DialogViewDefinition){
_92a.handler=this._handler;
if(this._map!=null){
_92a.argument=this._map;
}
StageBinding.presentViewDefinition(_92a);
}
}else{
if(url!=null){
_92a=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_92a!=null){
this._dialogViewHandle=_92a.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_92b){
this.setProperty("label",_92b);
if(this.isAttached){
this._buttonBinding.setLabel(_92b+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_92c){
this.setProperty("image",_92c);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_92c);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_92d){
this.setProperty("tooltip",_92d);
if(this.isAttached){
this._buttonBinding.setToolTip(_92d);
}
};
DataDialogBinding.prototype.setHandle=function(_92e){
this.setProperty("handle",_92e);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_930){
this._handler=_930;
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
DataDialogBinding.newInstance=function(_932){
var _933=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_932);
return UserInterface.registerBinding(_933,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_935,_936){
if(_935==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_936);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_937){
_937=new String(_937);
this.dirty();
this.setValue(encodeURIComponent(_937));
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
var _93b=this.getValue();
if(_93b==null){
_93b="";
}
this.shadowTree.dotnetinput.value=_93b;
};
PostBackDataDialogBinding.prototype.setValue=function(_93c){
this.setProperty("value",_93c);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_93d){
};
PostBackDataDialogBinding.newInstance=function(_93e){
var _93f=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_93e);
return UserInterface.registerBinding(_93f,PostBackDataDialogBinding);
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
var _940=this.getProperty("dialoglabel");
var _941=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _943=this.getProperty("handle");
var _944=this.getProperty("selectedtoken");
if(_943!=null){
var def=ViewDefinition.clone(_943,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_940!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_940;
}
if(_941!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_941;
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
if(_944!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_944;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_946){
var _947=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_946);
return UserInterface.registerBinding(_947,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_949){
self._datathing.setValue(_949);
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
var _94c=self.getValue();
if(_94c==""||_94c==null){
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
var _94d=this.getProperty("value");
var _94e=this.getProperty("selectorlabel");
if(_94e==null){
_94e=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_94d==null));
list.add(new SelectorBindingSelection(_94e+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_94d!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _94d=this.getValue();
if(_94d==""||_94d==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_950){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_950);
switch(_950.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_950.target==this._datathing){
var _951=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_951){
self._selector.setLabel(_951);
}
},500);
_950.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_953){
this.setProperty("label",_953);
if(this._selector!=null){
this._selector.setLabel(_953);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_954){
this._datathing.setValue(_954);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_956,_957){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_956,true)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_958){
this._buttonBinding.setLabel(_958);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_959){
this._buttonBinding.setToolTip(_959);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_95a){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_95a);
switch(_95a.type){
case MenuItemBinding.ACTION_COMMAND:
var _95b=_95a.target;
var _95c=this.master;
if(_95b.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_95b.getLabel());
setTimeout(function(){
_95c.action();
},0);
}else{
if(_95c.getValue()){
_95c.dirty();
}
_95c.setValue("");
}
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_95d){
var _95e=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_95d);
return UserInterface.registerBinding(_95e,NullPostBackDataDialogSelectorBinding);
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
var _95f=this._dataDialogBinding;
if(_95f!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_95f.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _960=this.getProperty("editable");
var _961=this.getProperty("selectable");
var _962=this.getProperty("display");
if(_960!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_961){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_962){
this._display=_962;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _963=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_963.selections=this.selections;
this.add(_963);
_963.attach();
this._dataDialogBinding=_963;
this.shadowTree.datadialog=_963;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _965=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _966=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_965=_966.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_965=_966.isSelected!=true;
break;
}
if(_965){
this.shadowTree.box.appendChild(this._getElementForSelection(_966));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_968){
var box=this.shadowTree.box;
var _96a=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _96b=list.getNext();
if(_968){
_96b.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_96a=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_96a=_96b.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_96a=_96b.isSelected!=true;
break;
}
}
if(_96a){
var _96c=this._getElementForSelection(_96b);
box.insertBefore(_96c,box.firstChild);
CSSUtil.attachClassName(_96c,"selected");
this._selectionMap.set(_96b.value,_96c);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_96d){
var _96e=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_96e.appendChild(this.bindingDocument.createTextNode(_96d.label));
_96e.setAttribute("label",_96d.label);
_96e.setAttribute("value",_96d.value);
return _96e;
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
var _970=DOMEvents.getTarget(e);
var _971=DOMUtil.getLocalName(_970);
if(_971=="div"){
this._handleMouseDown(_970);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_972){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _973=this._getElements();
var _974=_972.getAttribute("value");
var _975=this._lastSelectedElement.getAttribute("value");
var _976=false;
while(_973.hasNext()){
var el=_973.getNext();
switch(el.getAttribute("value")){
case _974:
case _975:
_976=!_976;
break;
}
if(_976){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_972);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_972)){
this._unhilite(_972);
}else{
this._hilite(_972);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_972){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_972;
};
MultiSelectorBinding.prototype._hilite=function(_97a){
var _97b=_97a.getAttribute("value");
if(!this._selectionMap.has(_97b)){
CSSUtil.attachClassName(_97a,"selected");
this._selectionMap.set(_97b,_97a);
}
};
MultiSelectorBinding.prototype._unhilite=function(_97c){
var _97d=_97c.getAttribute("value");
if(this._selectionMap.has(_97d)){
CSSUtil.detachClassName(_97c,"selected");
this._selectionMap.del(_97d);
}
};
MultiSelectorBinding.prototype._isHilited=function(_97e){
return CSSUtil.hasClassName(_97e,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_97f){
MultiSelectorBinding.superclass.handleAction.call(this,_97f);
var _980=_97f.target;
switch(_97f.type){
case DataDialogBinding.ACTION_COMMAND:
if(_980==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_97f.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_980.result);
this.dirty();
_980.result=null;
_97f.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _981=null;
if(this.isSelectable){
_981=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_983){
if(self._isHilited(_983)){
_983.parentNode.removeChild(_983);
_981.add(new SelectorBindingSelection(_983.getAttribute("label"),_983.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _981;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _985=this._getElements();
if(!isUp){
_985.reverse();
}
var _986=true;
while(_986&&_985.hasNext()){
var _987=_985.getNext();
if(this._isHilited(_987)){
switch(isUp){
case true:
if(_987.previousSibling){
_987.parentNode.insertBefore(_987,_987.previousSibling);
}else{
_986=false;
}
break;
case false:
if(_987.nextSibling){
_987.parentNode.insertBefore(_987,_987.nextSibling.nextSibling);
}else{
_986=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _988=new List();
var _989=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_98b){
var _98c=new SelectorBindingSelection(_98b.getAttribute("label"),_98b.getAttribute("value"),_989);
_98c.isHighlighted=self._isHilited(_98b);
_988.add(_98c);
});
return _988;
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
var _98d=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_98d.hasEntries()){
_98d.each(function(_98e){
_98e.parentNode.removeChild(_98e);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _98f=this.selections.getNext();
if(_98f.isSelected){
var _990=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_990.name=this._name;
_990.value=_98f.value;
this.bindingElement.appendChild(_990);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_991){
alert(_991);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_992){
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
var _993={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _994=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_994.handler=this._handler;
_994.argument=_993;
StageBinding.presentViewDefinition(_994);
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
var _995={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _997={handleDialogResponse:function(_998,_999){
if(_998==Dialog.RESPONSE_ACCEPT){
self.result=_999;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _99a=ViewDefinitions[this._dialogViewHandle];
_99a.handler=_997;
_99a.argument=_995;
StageBinding.presentViewDefinition(_99a);
};
MultiSelectorDataDialogBinding.newInstance=function(_99b){
var _99c=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_99b);
return UserInterface.registerBinding(_99c,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_99d){
var id=_99d.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _99f=_99d.bindingDocument.getElementById(id);
if(_99f!=null){
var _9a0=UserInterface.getBinding(_99f);
_9a0.setResult(true);
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
var _9a2=this.bindingDocument.getElementById(id);
if(_9a2!=null){
var _9a3=UserInterface.getBinding(_9a2);
if(_9a3&&!_9a3.isAttached){
_9a3.isLazy=true;
}else{
_9a2.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9a4){
this._isLazy=_9a4;
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
var _9a6=this.getProperty("stateprovider");
var _9a7=this.getProperty("handle");
if(_9a6!=null&&_9a7!=null){
url=url.replace("${stateprovider}",_9a6).replace("${handle}",_9a7);
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
EditorDataBinding.prototype._onPageInitialize=function(_9a8){
EditorDataBinding.superclass._onPageInitialize.call(this,_9a8);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9a9){
EditorDataBinding.superclass.handleAction.call(this,_9a9);
switch(_9a9.type){
case Binding.ACTION_DIRTY:
if(_9a9.target!=this){
if(!this.isDirty){
this.dirty();
}
_9a9.consume();
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
EditorDataBinding.prototype.setValue=function(_9aa){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9ab){
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
var _9b0=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9b0=fake.getValue()!="";
}
if(!_9b0&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9b0&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9b0;
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
var _9b4=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9b4!=null){
_9b4.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9b5){
_9b5=_9b5!=null?_9b5:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9b5;
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
var _9b6=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9b7=_9b6.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9b7;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9b7=_9b7.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9b7;
}
var self=this;
var _9b9=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9b9.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9bc=this.getProperty("label");
if(_9bc){
this.setLabel(_9bc);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9bd){
this.setProperty("label",_9bd);
if(this.shadowTree.labelBinding==null){
var _9be=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9be.attachClassName("fieldgrouplabel");
cell.insertBefore(_9be.bindingElement,cell.getElementsByTagName("div").item(1));
_9be.attach();
this.shadowTree.labelBinding=_9be;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9bd));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9c0){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9c0.bindingElement);
return _9c0;
};
FieldGroupBinding.prototype.addFirst=function(_9c1){
var _9c2=this.shadowTree[FieldGroupBinding.CENTER];
_9c2.insertBefore(_9c1.bindingElement,_9c2.firstChild);
return _9c1;
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
var _9c3=this.getProperty("relation");
if(_9c3!=null){
this.bindingRelation=_9c3;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9c4,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9c4,arg);
switch(_9c4){
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
FieldBinding.newInstance=function(_9c6){
var _9c7=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9c6);
return UserInterface.registerBinding(_9c7,FieldBinding);
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
var _9c8=this.getDescendantBindingByLocalName("fieldgroup");
if(_9c8!=null){
_9c8.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9c9=true;
var _9ca=this.getDescendantBindingsByLocalName("*");
while(_9ca.hasNext()){
var _9cb=_9ca.getNext();
if(Interfaces.isImplemented(IData,_9cb)){
var _9cc=_9cb.validate();
if(_9c9&&!_9cc){
_9c9=false;
}
}
}
return _9c9;
};
FieldsBinding.prototype.handleAction=function(_9cd){
FieldsBinding.superclass.handleAction.call(this,_9cd);
var _9ce=_9cd.target;
if(_9ce!=this){
switch(_9cd.type){
case Binding.ACTION_INVALID:
var _9cf=DataBinding.getAssociatedLabel(_9ce);
if(_9cf){
this._invalidFieldLabels.set(_9ce.key,_9cf);
}
if(_9ce.error){
if(!_9ce.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9ce.error},_9ce);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9cd.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9ce.key)){
this._invalidFieldLabels.del(_9ce.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9cd.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9d0=null;
if(this._invalidFieldLabels.hasEntries()){
_9d0=this._invalidFieldLabels.toList();
}
return _9d0;
};
FieldsBinding.newInstance=function(_9d1){
var _9d2=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9d1);
return UserInterface.registerBinding(_9d2,FieldsBinding);
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
var _9d3=this.getProperty("image");
if(_9d3){
this.setImage(_9d3);
}
var _9d4=this.getProperty("tooltip");
if(_9d4){
this.setToolTip(_9d4);
}
var _9d5=this.getProperty("label");
if(_9d5){
this.setLabel(_9d5);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9d7=this.getAncestorBindingByLocalName("field");
if(_9d7){
var _9d8=true;
_9d7.getDescendantBindingsByLocalName("*").each(function(_9d9){
if(Interfaces.isImplemented(IData,_9d9)){
_9d9.focus();
_9d8=false;
}
return _9d8;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9da){
this.setProperty("label",_9da);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9da);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9db=this.getProperty("label");
if(!_9db){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9db=node.data;
}
}
return _9db;
};
FieldDescBinding.prototype.setImage=function(_9dd){
this.setProperty("image",_9dd);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9de){
this.setProperty("tooltip",_9de);
if(this.isAttached){
this.bindingElement.title=_9de;
}
};
FieldDescBinding.newInstance=function(_9df){
var _9e0=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9df);
return UserInterface.registerBinding(_9e0,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9e1){
var _9e2=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9e1);
return UserInterface.registerBinding(_9e2,FieldDataBinding);
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
var _9e3=this._fieldHelpPopupBinding;
if(_9e3){
_9e3.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9e4=app.bindingMap.fieldhelpopupset;
var doc=_9e4.bindingDocument;
var _9e6=_9e4.add(PopupBinding.newInstance(doc));
var _9e7=_9e6.add(PopupBodyBinding.newInstance(doc));
_9e6.position=PopupBinding.POSITION_RIGHT;
_9e6.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9e7.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9e8=this.getProperty("label");
if(_9e8){
_9e7.bindingElement.innerHTML=Resolver.resolve(_9e8);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9e6;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9e9=this.getAncestorBindingByLocalName("field");
if(_9e9){
_9e9.attachClassName("fieldhelp");
var _9ea=ClickButtonBinding.newInstance(this.bindingDocument);
_9ea.attachClassName("fieldhelp");
_9ea.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9ea);
_9ea.attach();
var self=this;
_9ea.oncommand=function(){
self.attachPopupBinding();
};
_9ea.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9ea;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9ec=this._fieldHelpPopupBinding;
if(_9ec&&!_9ec.isAttached){
_9ec.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9ee){
RadioDataGroupBinding.superclass.handleAction.call(this,_9ee);
switch(_9ee.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9f0,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9f0,arg);
switch(_9f0){
case BroadcastMessages.KEY_ARROW:
var _9f2=null;
var next=null;
var _9f4=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9f4=this.getChildBindingsByLocalName("radio");
while(!_9f2&&_9f4.hasNext()){
var _9f5=_9f4.getNext();
if(_9f5.getProperty("ischecked")){
_9f2=_9f5;
}
}
break;
}
if(_9f2){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9f4.getFollowing(_9f2);
while(next!=null&&next.isDisabled){
next=_9f4.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9f4.getPreceding(_9f2);
while(next!=null&&next.isDisabled){
next=_9f4.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9f6){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9f6){
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
var _9f7=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9f7.type="hidden";
_9f7.name=this._name;
this.bindingElement.appendChild(_9f7);
this.shadowTree.input=_9f7;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9f8=null;
var _9f9=this.getChildBindingsByLocalName("radio");
while(!_9f8&&_9f9.hasNext()){
var _9fa=_9f9.getNext();
if(_9fa.isChecked){
_9f8=_9fa.getProperty("value");
}
}
return _9f8;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9fb){
};
RadioDataGroupBinding.prototype.setResult=function(_9fc){
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
this.propertyMethodMap["checked"]=function(_9fd){
if(_9fd!=this.isChecked){
this.setChecked(_9fd,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9fe=this.getProperty("ischecked");
if(_9fe!=this.isChecked){
this.setChecked(_9fe,true);
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
var _9ff=this.getProperty("relate");
var _a00=this.getProperty("oncommand");
var _a01=this.getProperty("isdisabled");
if(_9ff){
this.bindingRelate=_9ff;
this.relate();
}
if(_a00){
this.oncommand=function(){
Binding.evaluate(_a00,this);
};
}
if(_a01==true){
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
var _a03=this.getCallBackID();
this._buttonBinding.check=function(_a04){
RadioButtonBinding.prototype.check.call(this,_a04);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a05){
RadioButtonBinding.prototype.uncheck.call(this,_a05);
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
RadioDataBinding.prototype.setChecked=function(_a06,_a07){
this._buttonBinding.setChecked(_a06,_a07);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a06);
};
RadioDataBinding.prototype.check=function(_a08){
this.setChecked(true,_a08);
};
RadioDataBinding.prototype.uncheck=function(_a09){
this.setChecked(false,_a09);
};
RadioDataBinding.prototype.setDisabled=function(_a0a){
if(_a0a!=this.isDisabled){
this.isDisabled=_a0a;
this._buttonBinding.setDisabled(_a0a);
if(_a0a){
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
var _a0c=DOMEvents.getTarget(e);
switch(_a0c){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a0d=this.getProperty("label");
if(_a0d){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a0d)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a0e){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a0e;
}
this.setProperty("label",_a0e);
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
this.propertyMethodMap["checked"]=function(_a0f){
if(_a0f!=this.isChecked){
this.setChecked(_a0f,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a10=this.getProperty("ischecked");
if(_a10!=this.isChecked){
this.setChecked(_a10,true);
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
var _a12=DOMEvents.getTarget(e);
switch(_a12){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a13,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a13,arg);
switch(_a13){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a16){
_a16.consume();
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
var _a18=this.getCallBackID();
this._buttonBinding.check=function(_a19){
ButtonBinding.prototype.check.call(this,_a19);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a19){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a1a){
ButtonBinding.prototype.uncheck.call(this,_a1a);
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
if(_a18!=null){
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
var _a1b=true;
var _a1c=this.bindingElement.parentNode;
if(_a1c){
var _a1d=UserInterface.getBinding(_a1c);
if(_a1d&&_a1d instanceof CheckBoxGroupBinding){
if(_a1d.isRequired){
if(_a1d.isValid){
_a1b=_a1d.validate();
}else{
_a1b=false;
}
}
}
}
return _a1b;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a1e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a1e.type="hidden";
_a1e.name=this._name;
_a1e.style.display="none";
this.bindingElement.appendChild(_a1e);
this.shadowTree.input=_a1e;
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
var _a1f=null;
var _a20=this.getProperty("value");
if(this.isChecked){
_a1f=_a20?_a20:"on";
}
return _a1f;
};
CheckBoxBinding.prototype.setValue=function(_a21){
if(_a21==this.getValue()||_a21=="on"){
this.check(true);
}else{
if(_a21!="on"){
this.setPropety("value",_a21);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a22=false;
if(this.isChecked){
_a22=this._result!=null?this._result:true;
}
return _a22;
};
CheckBoxBinding.prototype.setResult=function(_a23){
if(typeof _a23=="boolean"){
this.setChecked(_a23,true);
}else{
this._result=_a23;
}
};
CheckBoxBinding.newInstance=function(_a24){
var _a25=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a24);
return UserInterface.registerBinding(_a25,CheckBoxBinding);
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
var _a26=true;
if(this.isRequired){
var _a27=this.getDescendantBindingsByLocalName("checkbox");
if(_a27.hasEntries()){
_a26=false;
while(_a27.hasNext()&&!_a26){
if(_a27.getNext().isChecked){
_a26=true;
}
}
}
if(_a26==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a26;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a28){
if(_a28){
if(!this._labelBinding){
var _a29=LabelBinding.newInstance(this.bindingDocument);
_a29.attachClassName("invalid");
_a29.setImage("${icon:error}");
_a29.setLabel("Selection required");
this._labelBinding=this.addFirst(_a29);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a2a){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a2a);
switch(_a2a.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a2b){
var _a2c=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a2b);
return UserInterface.registerBinding(_a2c,CheckBoxGroupBinding);
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
var _a2d=DialogControlBinding.newInstance(this.bindingDocument);
_a2d.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a2d);
this._controlGroupBinding.attachRecursive();
var _a2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a2e);
var _a2f=this.getLabel();
if(_a2f!=null){
this.setLabel(_a2f);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a30=this._snapTargetBinding;
if(Binding.exists(_a30)==true){
_a30.removeActionListener(Binding.ACTION_BLURRED,this);
_a30.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a31){
if(Interfaces.isImplemented(IData,_a31)){
this._snapTargetBinding=_a31;
var _a32=_a31.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a32&&_a32.isConsumed){
this._environmentBinding=_a32.listener;
}
if(this._environmentBinding){
_a31.addActionListener(Binding.ACTION_BLURRED,this);
_a31.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a31)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a31.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a34=this._snapTargetBinding;
var _a35=this._environmentBinding;
var root=UserInterface.getBinding(_a34.bindingDocument.body);
if(Binding.exists(_a34)&&Binding.exists(_a35)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a34.isAttached&&_a35.isAttached){
var _a37=_a34.boxObject.getUniversalPosition();
var _a38=_a35.boxObject.getUniversalPosition();
_a38.y+=_a35.bindingElement.scrollTop;
_a38.x+=_a35.bindingElement.scrollLeft;
var tDim=_a34.boxObject.getDimension();
var eDim=_a35.boxObject.getDimension();
var _a3b=false;
if(_a37.y+tDim.h<_a38.y){
_a3b=true;
}else{
if(_a37.x+tDim.w<_a38.x){
_a3b=true;
}else{
if(_a37.y>_a38.y+eDim.h){
_a3b=true;
}else{
if(_a37.x>_a38.x+eDim.w){
_a3b=true;
}
}
}
}
if(!_a3b){
this._setComputedPosition(_a37,_a38,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a3c,_a3d,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a42=_a3c;
var _a43=false;
if(_a3c.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a43=true;
}else{
if(_a3c.x+tDim.w>=_a3d.x+eDim.w){
_a43=true;
}
}
if(_a43){
_a42.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a42.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a42.y-=(bDim.h);
_a42.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a42);
};
BalloonBinding.prototype.handleBroadcast=function(_a44,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a44,arg);
switch(_a44){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a46){
var _a47=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a46){
_a47=true;
}
}
return _a47;
};
BalloonBinding.prototype._setPosition=function(_a49){
var _a4a=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a4a=true;
}
}
if(!_a4a){
this.bindingElement.style.left=_a49.x+"px";
this.bindingElement.style.top=_a49.y+"px";
this._point=_a49;
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
BalloonBinding.prototype.handleAction=function(_a4c){
BalloonBinding.superclass.handleAction.call(this,_a4c);
var _a4d=_a4c.target;
switch(_a4c.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a4c.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a4d==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a4d)){
self.dispose();
}else{
if(_a4d.validate()){
var _a4f=true;
if(_a4c.type==Binding.ACTION_BLURRED){
var root=_a4d.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a4f=false;
}
}
if(_a4f){
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
BalloonBinding.prototype.setLabel=function(_a52){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a53=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a52);
_a53.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a53);
}
this.setProperty("label",_a52);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a55){
var _a56=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a55);
var _a57=UserInterface.registerBinding(_a56,BalloonBinding);
_a57.hide();
return _a57;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a58,_a59){
if(Interfaces.isImplemented(IData,_a59)==true){
var _a5a,_a5b=_a59.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a5b&&_a5b.isConsumed){
switch(_a5b.listener.constructor){
case StageBinding:
_a5a=false;
break;
case StageDialogBinding:
_a5a=true;
break;
}
}
var _a5c=_a5a?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a5d=_a5c.add(BalloonBinding.newInstance(top.app.document));
_a5d.setLabel(_a58.text);
_a5d.snapTo(_a59);
_a5d.attach();
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
var _a5e=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a61=_a5e.getDataBinding(name);
if(_a61){
ErrorBinding.presentError({text:text},_a61);
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
FocusBinding.focusElement=function(_a62){
var _a63=true;
try{
_a62.focus();
Application.focused(true);
}
catch(exception){
var _a64=UserInterface.getBinding(_a62);
var _a65=SystemLogger.getLogger("FocusBinding.focusElement");
_a65.warn("Could not focus "+(_a64?_a64.toString():String(_a62)));
_a63=false;
}
return _a63;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a66){
var win=_a66.bindingWindow;
var id=_a66.bindingElement.id;
return {getBinding:function(){
var _a69=null;
try{
if(Binding.exists(_a66)){
_a69=win.bindingMap[id];
}
}
catch(exception){
}
return _a69;
}};
};
FocusBinding.navigateNext=function(_a6a){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a6a);
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
var _a6b=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a6b&&_a6b.isConsumed){
if(_a6b.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a6c){
FocusBinding.superclass.handleAction.call(this,_a6c);
var _a6d=_a6c.target;
var _a6e=null;
if(this._isFocusManager){
switch(_a6c.type){
case FocusBinding.ACTION_ATTACHED:
if(_a6d!=this){
this._isUpToDate=false;
}
_a6c.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a6d!=this){
this._isUpToDate=false;
_a6c.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a6e=new FocusCrawler();
_a6e.mode=FocusCrawler.MODE_BLUR;
_a6e.crawl(_a6d.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a6c.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a6d!=this){
_a6e=new FocusCrawler();
_a6e.mode=FocusCrawler.MODE_FOCUS;
_a6e.crawl(_a6d.bindingElement);
}
_a6c.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a6d)){
this.claimFocus();
this._onFocusableFocused(_a6d);
}
_a6c.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a6d)){
this._onFocusableBlurred(_a6d);
}
_a6c.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a6f){
var _a70=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a70==null&&list.hasNext()){
var _a72=list.getNext();
if(this._cachedFocus&&_a72==this._cachedFocus.getBinding()){
_a70=_a72;
}
}
if(_a70!=null){
if(_a72.isFocused){
var next=_a6f?list.getPreceding(_a70):list.getFollowing(_a70);
if(!next){
next=_a6f?list.getLast():list.getFirst();
}
next.focus();
}else{
_a70.focus();
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
var _a74=new FocusCrawler();
var list=new List();
_a74.mode=FocusCrawler.MODE_INDEX;
_a74.crawl(this.bindingElement,list);
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
var _a77=this._cachedFocus.getBinding();
if(_a77&&!_a77.isFocused){
_a77.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a78){
if(_a78!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a78;
_a78.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a78);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a79){
_a79.deleteProperty(FocusBinding.MARKER);
if(_a79==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a7b){
this.bindingElement.style.left=_a7b+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a7c){
this.hiddenTabBindings.add(_a7c);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a7d=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a7d.getLabel());
item.setImage(_a7d.getImage());
item.associatedTabBinding=_a7d;
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
TabsButtonBinding.prototype.handleAction=function(_a80){
TabsButtonBinding.superclass.handleAction.call(this,_a80);
switch(_a80.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a81=this.selectedTabBinding;
if(_a81){
this.containingTabBoxBinding.moveToOrdinalPosition(_a81,0);
this.containingTabBoxBinding.select(_a81);
}
_a80.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a82){
var _a83=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a82);
_a83.setAttribute("type","checkbox");
_a83.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a83.className="tabbutton";
return UserInterface.registerBinding(_a83,TabsButtonBinding);
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
var _a84=TabBoxBinding.currentActiveInstance;
if(_a84!=null&&Binding.exists(_a84)){
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
var _a85=this.getTabElements().getLength();
var _a86=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a85!=_a86){
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
var _a87=this.getTabPanelElements();
while(_a87.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a87.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a88=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a89=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a8a=_a88>_a89?"tabsbelow":"tabsontop";
this.attachClassName(_a8a);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a8c=this.getTabPanelElements();
var _a8d=null;
var _a8e=this.getProperty("selectedindex");
if(_a8e!=null){
if(_a8e>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a8f=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a91=_a8c.getNext();
this.registerTabBoxPair(tab,_a91);
if(_a8e&&_a8f==_a8e){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a8d=tab;
}
}
_a8f++;
}
if(!_a8d){
_a8d=tabs.getFirst();
_a8d.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a92){
var _a93=null;
var _a94=null;
if(this.isEqualSize){
var _a95=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a97=this.getTabPanelElements();
_a97.each(function(_a98){
max=_a98.offsetHeight>max?_a98.offsetHeight:max;
});
_a94=max+_a95.top+_a95.bottom;
if(_a92&&this._tabPanelsElement.style.height!=null){
_a93=this._tabPanelsElement.offsetHeight;
}
if(_a93!=null||_a94>_a93){
this._tabPanelsElement.style.height=_a94+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a99){
_a99._invalidCount=0;
_a99.addActionListener(Binding.ACTION_INVALID,this);
_a99.addActionListener(Binding.ACTION_VALID,this);
_a99.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a9a){
TabBoxBinding.superclass.handleAction.call(this,_a9a);
var _a9b=_a9a.target;
var _a9c=_a9a.listener;
switch(_a9a.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a9b.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a9a.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a9b.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a9c._invalidCount++;
if(_a9c._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a9c.isSelected){
self._showWarning(_a9c,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a9c._invalidCount>0){
_a9c._invalidCount--;
if(_a9c._invalidCount==0){
if(_a9c.isSelected){
this._showWarning(_a9c,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a9c,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a9a._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a9a._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a9f=DOMEvents.getTarget(e);
if(_a9f==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _aa1=this.getTabPanelElements();
tabs.each(function(tab,_aa3){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _aa4=_aa1.get(_aa3);
this.registerTabBoxPair(tab,_aa4);
}
},this);
var _aa5=this._tabBoxPairs;
for(var key in _aa5){
var tab=_aa5[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a9f);
switch(_a9f.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _aa9=_a9f.parentNode;
if(_aa9==this._tabsElement||_aa9==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a9f==this._tabsElement||_a9f==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_aab){
var _aac=this.getBindingForArgument(arg);
if(_aac!=null&&!_aac.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_aac.select(_aab);
this.getTabPanelBinding(_aac).select(_aab);
var _aad=this.getProperty("selectedindex");
if(_aad!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_aac.bindingElement,true));
}
this._selectedTabBinding=_aac;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_aac.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _aae=this.getTabPanelBinding(_aac);
this._showBalloon(_aae,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ab0){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ab0.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ab0};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ab4){
var _ab5=null;
try{
var key=_ab4.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ab7=this._tabBoxPairs[key].tabPanel;
_ab5=UserInterface.getBinding(_ab7);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ab5;
};
TabBoxBinding.prototype.getTabBinding=function(_ab8){
var key=_ab8.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aba=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_aba);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _abb=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_abb);
return _abb;
};
TabBoxBinding.prototype.appendTabByBindings=function(_abc,_abd){
var _abe=_abc.bindingElement;
_abc.setProperty("selected",true);
var _abf=this.summonTabPanelBinding();
var _ac0=_abf.bindingElement;
if(_abd){
_ac0.appendChild(_abd instanceof Binding?_abd.bindingElement:_abd);
}
this.registerTabBoxPair(_abe,_ac0);
UserInterface.getBinding(this._tabsElement).add(_abc);
this._tabPanelsElement.appendChild(_ac0);
_abc.attach();
UserInterface.getBinding(_ac0).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _abc;
};
TabBoxBinding.prototype.importTabBinding=function(_ac1){
var that=_ac1.containingTabBoxBinding;
var _ac3=that.getTabPanelBinding(_ac1);
var _ac4=_ac3.getBindingElement();
var _ac5=_ac1.getBindingElement();
that.dismissTabBinding(_ac1);
this._tabsElement.appendChild(_ac5);
this._tabPanelsElement.appendChild(_ac4);
this.registerTabBoxPair(_ac5,_ac4);
_ac1.containingTabBoxBinding=this;
this.select(_ac1);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ac6){
var _ac7=null;
if(_ac6.isSelected){
_ac7=this.getBestTab(_ac6);
this._selectedTabBinding=null;
}
var _ac8=this.getTabPanelBinding(_ac6);
this.unRegisterTabBoxPair(_ac6.bindingElement);
_ac6.dispose();
_ac8.dispose();
if(_ac7!=null){
this.select(_ac7);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_ac9){
if(_ac9.isSelected){
this.selectBestTab(_ac9);
}
};
TabBoxBinding.prototype.selectBestTab=function(_aca){
var _acb=this.getBestTab(_aca);
if(_acb){
this.select(_acb);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_acc){
var _acd=null;
var _ace=_acc.getOrdinalPosition(true);
var _acf=this.getTabBindings();
var _ad0=_acf.getLength();
var _ad1=_ad0-1;
if(_ad0==1){
_acd=null;
}else{
if(_ace==_ad1){
_acd=_acf.get(_ace-1);
}else{
_acd=_acf.get(_ace+1);
}
}
return _acd;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ad2,_ad3){
var _ad4=this.bindingDocument.getElementById(_ad2.bindingElement.id);
var tab=this.getTabElements().get(_ad3);
this._tabsElement.insertBefore(_ad4,tab);
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
var _ad6=this._nodename_tab;
var _ad7=new List(this._tabsElement.childNodes);
var _ad8=new List();
while(_ad7.hasNext()){
var _ad9=_ad7.getNext();
if(_ad9.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ad9)==_ad6){
_ad8.add(_ad9);
}
}
return _ad8;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ada=this._nodename_tabpanel;
var _adb=new List(this._tabPanelsElement.childNodes);
var _adc=new List();
_adb.each(function(_add){
if(_add.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_add)==_ada){
_adc.add(_add);
}
});
return _adc;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _ade=new List();
var _adf=this.getTabElements();
_adf.each(function(_ae0){
_ade.add(UserInterface.getBinding(_ae0));
});
return _ade;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _ae1=new List();
this.getTabPanelElements().each(function(_ae2){
_ae1.add(UserInterface.getBinding(_ae2));
});
return _ae1;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _ae3=null;
if(this._selectedTabBinding){
_ae3=this.getTabPanelBinding(this._selectedTabBinding);
}
return _ae3;
};
TabBoxBinding.prototype._showWarning=function(_ae4,_ae5){
var _ae6=this.getTabBinding(_ae4);
if(_ae5){
if(_ae6.labelBinding.hasImage){
_ae6._backupImage=_ae6.getImage();
}
_ae6.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ae6._backupImage){
_ae6.setImage(_ae6._backupImage);
}else{
_ae6.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ae7,_ae8){
var _ae9=this.getTabBinding(_ae7);
if((_ae8&&!_ae9.isSelected)||!_ae8){
if(_ae9.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ae8){
if(_ae9.labelBinding.hasImage){
_ae9._backupImage=_ae9.getImage();
}
_ae9.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_ae9._backupImage!=null){
_ae9.setImage(_ae9._backupImage);
}else{
_ae9.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_aea){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _aed=tab.getOrdinalPosition(true);
var next=null;
var _aef=new List();
tabs.each(function(t){
if(t.isVisible){
_aef.add(t);
}
});
if(_aef.getLength()>1){
if(_aed==0&&!_aea){
next=_aef.getLast();
}else{
if(_aed==_aef.getLength()-1&&_aea){
next=_aef.getFirst();
}else{
if(_aea){
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
var _af2=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_af2.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_af3){
TabsBinding.superclass.handleAction.call(this,_af3);
switch(_af3.type){
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
var _af6=self.bindingElement.offsetWidth;
if(_af6!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_af6;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_af7){
if(_af7 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_af7);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _af8=false;
var _af9,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _afc=this.constructor.TABBUTTON_IMPLEMENTATION;
var _afd=this.bindingElement.offsetWidth-_afc.RESERVED_SPACE;
var _afe=null;
var sum=0,_b00=0;
var _b01=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b01){
tab=tabs.getNext();
_af9=UserInterface.getBinding(tab);
if(!_afe){
_afe=_af9;
}
sum+=tab.offsetWidth;
if(sum>=_afd){
_af8=true;
if(_af9.isSelected){
if(!DOMUtil.isFirstElement(_af9.bindingElement,true)){
this.isManaging=false;
if(_afe){
_afe.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_af9,_b00-1);
_b01=false;
}
}else{
_af9.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_af9);
}
}else{
_af9.show();
_afe=_af9;
_b00++;
}
}
if(_b01){
if(_af8&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b02=_afe.getBindingElement();
var _b03=_b02.offsetLeft+_b02.offsetWidth;
var _b04=this.tabsButtonBinding;
setTimeout(function(){
_b04.show(_b03+4);
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
var _b05=TabBinding.superclass.serialize.call(this);
if(_b05){
_b05.label=this.getLabel();
_b05.image=this.getImage();
_b05.tooltip=this.getToolTip();
}
return _b05;
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
var _b06=this.bindingElement.getAttribute("image");
var _b07=this.bindingElement.getAttribute("label");
var _b08=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b07){
this.setLabel(_b07);
}
if(_b06){
this.setImage(_b06);
}
if(_b08){
this.setToolTip(_b08);
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
TabBinding.prototype.setLabel=function(_b0a){
if(_b0a!=null){
this.setProperty("label",_b0a);
if(this.isAttached){
this.labelBinding.setLabel(_b0a);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b0b){
if(_b0b){
this.setProperty("tooltip",_b0b);
if(this.isAttached){
this.labelBinding.setToolTip(_b0b);
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
var _b0d=false;
if(Client.isMozilla==true){
}
if(!_b0d){
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
TabBinding.prototype.select=function(_b0e){
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
TabBinding.newInstance=function(_b0f){
var _b10=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b0f);
return UserInterface.registerBinding(_b10,TabBinding);
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
var _b11=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b11=true;
this._lastKnownDimension=dim1;
}
return _b11;
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
TabPanelBinding.prototype.select=function(_b14){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b14!=true){
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
TabPanelBinding.prototype.handleAction=function(_b15){
TabPanelBinding.superclass.handleAction.call(this,_b15);
var _b16=_b15.target;
switch(_b15.type){
case BalloonBinding.ACTION_INITIALIZE:
_b15.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b17){
var _b18=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b17);
UserInterface.registerBinding(_b18,TabPanelBinding);
return UserInterface.getBinding(_b18);
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
var _b19=SplitBoxBinding.superclass.serialize.call(this);
if(_b19){
_b19.orient=this.getOrient();
_b19.layout=this.getLayout();
}
return _b19;
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
var _b1a=this.getSplitPanelElements();
if(_b1a.hasEntries()){
var _b1b=new List(this.getLayout().split(":"));
if(_b1b.getLength()!=_b1a.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b1a.each(function(_b1c){
_b1c.setAttribute("ratio",_b1b.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b1d=this.getProperty("orient");
if(_b1d){
this._orient=_b1d;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b1e=this.getSplitterBindings();
while(_b1e.hasNext()){
var _b1f=_b1e.getNext();
if(_b1f&&_b1f.getProperty("collapsed")==true){
_b1f.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b20){
SplitBoxBinding.superclass.handleAction.call(this,_b20);
switch(_b20.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b20.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b20.target);
_b20.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b20.target);
_b20.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b21){
this._getSplitPanelBindingForSplitter(_b21).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b22){
this._getSplitPanelBindingForSplitter(_b22).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b23){
var _b24=DOMUtil.getOrdinalPosition(_b23.bindingElement,true);
var _b25,_b26=this.getSplitPanelElements();
switch(_b23.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b25=_b26.get(_b24);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b25=_b26.get(_b24+1);
break;
}
return UserInterface.getBinding(_b25);
};
SplitBoxBinding.prototype.invokeLayout=function(_b27){
var _b28=this.isHorizontalOrient();
var _b29=this.getSplitPanelBindings();
var _b2a=this.getSplitterBindings();
var _b2b=new List();
var _b2c,sum=0;
var _b2e=0;
_b29.each(function(_b2f){
if(_b2f.isFixed==true){
if(!_b29.hasNext()){
_b2e+=_b2f.getFix();
}
_b2b.add(0);
sum+=0;
}else{
_b2c=_b2f.getRatio();
_b2b.add(_b2c);
sum+=_b2c;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b2b.getLength()!=_b29.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b30=_b28?this.getInnerWidth():this.getInnerHeight();
_b30-=_b2e;
_b2a.each(function(_b31){
if(_b31.isVisible){
_b30-=SplitterBinding.DIMENSION;
}
});
var unit=_b30/sum;
var _b33=0;
var self=this;
_b29.each(function(_b35){
var span=0;
var _b37=_b2b.getNext();
if(_b35.isFixed){
span=_b35.getFix();
}else{
span=Math.floor(unit*_b37);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b33+=span;
while(_b33>_b30){
_b33--;
span--;
}
if(!_b35.isFixed){
if(_b28){
_b35.setWidth(span);
}else{
_b35.setHeight(span);
}
}
});
}
if(_b27!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b38=this.getLayout();
if(_b38){
this.setProperty("layout",_b38);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b39=this.isHorizontalOrient();
var _b3a=this.getSplitPanelBindings();
var _b3b=this.getSplitterBindings();
var _b3c=null;
var _b3d=null;
var unit=null;
var _b3f=null;
var span=null;
_b3a.each(function(_b41){
if(!unit){
unit=_b39?_b41.getWidth():_b41.getHeight();
}
span=_b39?_b41.getWidth():_b41.getHeight();
if(_b3f){
span-=_b3f;
_b3f=null;
}
_b3c=_b3b.getNext();
if(_b3c&&_b3c.offset){
_b3f=_b3c.offset;
span+=_b3f;
}
_b41.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b42){
this.logger.debug(_b42);
this.setProperty("layout",_b42);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b43="",_b44=this.getSplitPanelBindings();
_b44.each(function(_b45){
_b43+=_b45.getRatio().toString();
_b43+=_b44.hasNext()?":":"";
});
this.setProperty("layout",_b43);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b46=this.getSplitPanelElements();
_b46.each(function(_b47){
layout+="1"+(_b46.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b48){
this.bindingElement.style.width=_b48+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b49){
this.bindingElement.style.height=_b49+"px";
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
SplitBoxBinding.prototype.fit=function(_b4a){
if(!this.isFit||_b4a){
if(this.isHorizontalOrient()){
var max=0;
var _b4c=this.getSplitPanelBindings();
_b4c.each(function(_b4d){
var _b4e=_b4d.bindingElement.offsetHeight;
max=_b4e>max?_b4e:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b4f){
var _b50=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b4f);
return UserInterface.registerBinding(_b50,SplitBoxBinding);
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
var _b53=this.getProperty("hidden");
if(_b53){
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
var _b54=this.getProperty("ratiocache");
if(_b54){
this.setRatio(_b54);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b55){
if(!this.isFixed){
if(_b55!=this.getWidth()){
if(_b55<0){
_b55=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b55+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b55);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b56=null;
if(this.isFixed){
_b56=this.getFix();
}else{
_b56=this.bindingElement.offsetWidth;
}
return _b56;
};
SplitPanelBinding.prototype.setHeight=function(_b57){
if(!this.isFixed){
if(_b57!=this.getHeight()){
try{
this.bindingElement.style.height=_b57+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b58=null;
if(this.isFixed){
_b58=this.getFix();
}else{
_b58=this.bindingElement.offsetHeight;
}
return _b58;
};
SplitPanelBinding.prototype.setRatio=function(_b59){
this.setProperty("ratio",_b59);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b5a){
if(_b5a){
this._fixedSpan=_b5a;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b5a);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b5a);
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
SplitPanelBinding.newInstance=function(_b5b){
var _b5c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b5b);
return UserInterface.registerBinding(_b5c,SplitPanelBinding);
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
var _b5d=SplitBoxBinding.superclass.serialize.call(this);
if(_b5d){
_b5d.collapse=this.getProperty("collapse");
_b5d.collapsed=this.getProperty("collapsed");
_b5d.disabled=this.getProperty("isdisabled");
}
return _b5d;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b5e=this.getProperty("hidden");
if(_b5e){
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
SplitterBinding.prototype.setCollapseDirection=function(_b60){
this.setProperty("collapse",_b60);
this._collapseDirection=_b60;
};
SplitterBinding.prototype.handleAction=function(_b61){
SplitterBinding.superclass.handleAction.call(this,_b61);
switch(_b61.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b61.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b63=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b63.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b63.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b64){
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
SplitterBinding.newInstance=function(_b6f){
var _b70=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b6f);
return UserInterface.registerBinding(_b70,SplitterBinding);
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
var _b71=this.getProperty("selectedindex");
var _b72=this.getDeckElements();
if(_b72.hasEntries()){
var _b73=false;
var _b74=0;
while(_b72.hasNext()){
var deck=_b72.getNext();
if(_b71&&_b74==_b71){
deck.setAttribute("selected","true");
_b73=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b73=true;
}
}
_b74++;
}
if(!_b73){
_b72.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b77=this.getBindingForArgument(arg);
if(_b77!=null){
if(_b77!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b77.select();
this._selectedDeckBinding=_b77;
var _b78=this.getProperty("selectedindex");
if(_b78!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b77.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b79=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b79=true;
this._lastKnownDimension=dim1;
}
return _b79;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b7c){
var _b7d=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b7c);
return UserInterface.registerBinding(_b7d,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b7e){
DeckBinding.superclass.handleAction.call(this,_b7e);
var _b7f=_b7e.target;
switch(_b7e.type){
case BalloonBinding.ACTION_INITIALIZE:
_b7e.consume();
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
DeckBinding.newInstance=function(_b81){
var _b82=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b81);
return UserInterface.registerBinding(_b82,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b83){
if(_b83 instanceof ToolBarBodyBinding){
if(_b83.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b83;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b83;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b83);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b84=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b84){
this.setImageSize(_b84);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b86=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b86.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b86.isDefaultContent=true;
this.add(_b86);
_b86.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b88=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b88);
}
if(_b88!=null&&_b88.hasClassName("max")){
this._maxToolBarGroup(_b88,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b8a){
var _b8b=this.boxObject.getDimension().w;
var _b8c=CSSComputer.getPadding(this.bindingElement);
_b8b-=(_b8c.left+_b8c.right);
if(_b8a!=null){
_b8b-=_b8a.boxObject.getDimension().w;
if(!Client.isWindows){
_b8b-=1;
}
if(Client.isExplorer){
_b8b-=15;
}
}
max.bindingElement.style.width=_b8b+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b8d){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b8d);
};
ToolBarBinding.prototype.addLeft=function(_b8e,_b8f){
var _b90=null;
if(this._toolBarBodyLeft!=null){
_b90=this._toolBarBodyLeft.add(_b8e,_b8f);
}else{
throw new Error("No left toolbarbody");
}
return _b90;
};
ToolBarBinding.prototype.addLeftFirst=function(_b91,_b92){
var _b93=null;
if(this._toolBarBodyLeft){
_b93=this._toolBarBodyLeft.addFirst(_b91,_b92);
}else{
throw new Error("No left toolbarbody");
}
return _b93;
};
ToolBarBinding.prototype.addRight=function(_b94){
var _b95=null;
if(this._toolBarBodyRight){
_b95=this._toolBarBodyRight.add(_b94);
}else{
throw new Error("No left toolbarbody");
}
return _b95;
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
ToolBarBinding.newInstance=function(_b98){
var _b99=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b98);
return UserInterface.registerBinding(_b99,ToolBarBinding);
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
var _b9a=this.getDescendantBindingsByLocalName("toolbargroup");
var _b9b=new List();
var _b9c=true;
_b9a.each(function(_b9d){
if(_b9d.isVisible&&!_b9d.isDefaultContent){
_b9b.add(_b9d);
}
});
while(_b9b.hasNext()){
var _b9e=_b9b.getNext();
_b9e.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b9c){
_b9e.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b9c=false;
}
if(!_b9b.hasNext()){
_b9e.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _ba1=list.getNext();
var _ba2=_ba1.getEqualSizeWidth();
if(_ba2>max){
max=_ba2;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _ba1=list.getNext();
_ba1.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_ba3,_ba4){
var _ba5=ToolBarBinding.superclass.add.call(this,_ba3);
if(!_ba4){
if(_ba3 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba5;
};
ToolBarBodyBinding.prototype.addFirst=function(_ba6,_ba7){
var _ba8=ToolBarBinding.superclass.addFirst.call(this,_ba6);
if(!_ba7){
if(_ba6 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba8;
};
ToolBarBodyBinding.newInstance=function(_ba9){
var _baa=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_ba9);
return UserInterface.registerBinding(_baa,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bab){
switch(_bab){
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
var _bac=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bac)=="toolbarbody"){
UserInterface.getBinding(_bac).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bad=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bad)=="toolbarbody"){
UserInterface.getBinding(_bad).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bae){
var _baf=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bae);
return UserInterface.registerBinding(_baf,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bb0){
var _bb1=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bb0);
return UserInterface.registerBinding(_bb1,ToolBarButtonBinding);
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
var _bb2=this.getProperty("label");
var _bb3=this.getProperty("image");
if(_bb2){
this.setLabel(_bb2);
}
if(_bb3){
this.setImage(_bb3);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bb4,_bb5){
if(this.isAttached){
this._labelBinding.setLabel(_bb4,_bb5);
}
this.setProperty("label",_bb4);
};
ToolBarLabelBinding.prototype.setImage=function(_bb6,_bb7){
if(this.isAttached){
this._labelBinding.setImage(_bb6,_bb7);
}
this.setProperty("image",_bb6);
};
ToolBarLabelBinding.newInstance=function(_bb8){
var _bb9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bb8);
return UserInterface.registerBinding(_bb9,ToolBarLabelBinding);
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
var _bba=this.getDescendantBindingsByLocalName("clickbutton");
if(_bba.hasEntries()){
while(_bba.hasNext()){
var _bbb=_bba.getNext();
if(_bbb.isDefault){
this._defaultButton=_bbb;
_bbb.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bbb.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bba;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bbc,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bbc,arg);
switch(_bbc){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bbe=this.getAncestorBindingByType(DialogBinding,true);
if(_bbe!=null&&_bbe.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bbf){
DialogToolBarBinding.superclass.handleAction.call(this,_bbf);
var _bc0=_bbf.target;
var _bc1=false;
var _bc2=this._buttons.reset();
if(_bc0 instanceof ClickButtonBinding){
switch(_bbf.type){
case Binding.ACTION_FOCUSED:
_bc0.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bc0;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bc0.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bc1&&_bc2.hasNext()){
var _bc3=_bc2.getNext();
_bc1=_bc3.isFocused;
}
if(!_bc1){
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
ComboBoxBinding.newInstance=function(_bc5){
var _bc6=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bc5);
return UserInterface.registerBinding(_bc6,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bc7,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bc7,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bcb=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bcb.each(function(_bcc){
var _bcd=_bcc.getProperty("oncommand");
_bcc.setProperty("hiddencommand",_bcd);
_bcc.deleteProperty("oncommand");
_bcc.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bce=null;
var _bcf=this.getActiveMenuItemId();
_bcb.reset();
while(_bcb.hasNext()){
var _bd0=_bcb.getNext();
if(_bd0.getProperty("id")==_bcf){
_bce=_bd0;
break;
}
}
if(_bce==null&&_bcb.hasEntries()){
_bce=_bcb.getFirst();
}
if(_bce!=null){
this.setButton(_bce);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bd1){
if(_bd1 instanceof MenuItemBinding){
var _bd2=_bd1.getProperty("label");
var _bd3=_bd1.getProperty("image");
var _bd4=_bd1.getProperty("image-hover");
var _bd5=_bd1.getProperty("image-active");
var _bd6=_bd1.getProperty("image-disabled");
var _bd7=_bd1.getProperty("hiddencommand");
this.setLabel(_bd2?_bd2:"");
this.image=_bd3;
this.imageHover=_bd3;
this.imageActive=_bd5;
this.imageDisabled=_bd6;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bd7,this);
};
this.hideActiveItem(_bd1);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bd8){
if(_bd8 instanceof MenuItemBinding){
this.setButton(_bd8);
this.setActiveMenuItemId(_bd8.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bd9){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bda){
if(_bda==_bd9){
Binding.prototype.hide.call(_bda);
}else{
Binding.prototype.show.call(_bda);
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
var _bdc=this._views;
for(var _bdd in ViewDefinitions){
var def=ViewDefinitions[_bdd];
var key=def.perspective;
if(key!=null){
if(!_bdc.has(key)){
_bdc.set(key,new List());
}
var list=_bdc.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_be1,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_be1,arg);
switch(_be1){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _be4=this.bindingWindow.bindingMap.toolboxpopupgroup;
_be4.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_be4.add(StageViewMenuItemBinding.newInstance(_be4.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_be4.show();
}else{
_be4.hide();
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
TreeBinding.grid=function(_be8){
var _be9=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_be8);
var _beb=_be8%_be9;
if(_beb>0){
_be8=_be8-_beb+_be9;
}
return _be8+TreeBodyBinding.PADDING_TOP;
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
var _bec=this.getProperty("focusable");
if(_bec!=null){
this._isFocusable=_bec;
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
var _bee=this.getProperty("builder");
if(_bee){
this._buildFromTextArea(_bee);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bef=this.getProperty("selectable");
var _bf0=this.getProperty("selectionproperty");
var _bf1=this.getProperty("selectionvalue");
if(_bef){
this.setSelectable(true);
if(_bf0){
this.setSelectionProperty(_bf0);
}
if(_bf1){
this.setSelectionValue(_bf1);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _bf4=UserInterface.getBinding(area);
var _bf5=this._treeBodyBinding;
function build(){
_bf5.subTreeFromString(area.value);
}
_bf4.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_bf6){
var _bf7=_bf6.getHandle();
if(this._treeNodeBindings.has(_bf7)){
throw "Duplicate treenodehandles registered: "+_bf6.getLabel();
}else{
this._treeNodeBindings.set(_bf7,_bf6);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_bf7)){
_bf6.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_bf9){
this._treeNodeBindings.del(_bf9.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_bfa){
var _bfb=null;
if(this._treeNodeBindings.has(_bfa)){
_bfb=this._treeNodeBindings.get(_bfa);
}else{
throw "No such treenode: "+_bfa;
}
return _bfb;
};
TreeBinding.prototype.handleAction=function(_bfc){
TreeBinding.superclass.handleAction.call(this,_bfc);
var _bfd=_bfc.target;
switch(_bfc.type){
case TreeNodeBinding.ACTION_OPEN:
_bfc.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bfd);
_bfc.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bfd;
this.focusSingleTreeNodeBinding(_bfd);
if(!this.isFocused){
this.focus();
}
_bfc.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bfd;
this.focusSingleTreeNodeBinding(_bfd);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bfd;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bfd;
this.focusSingleTreeNodeBinding(_bfd);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bfc.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bfd.isFocused){
this.blurSelectedTreeNodes();
}
_bfc.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bfe,_bff){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c00){
if(_c00!=null&&!_c00.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c00);
_c00.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c01){
this.blurSelectedTreeNodes();
while(_c01.hasNext()){
var _c02=_c01.getNext();
this._focusedTreeNodeBindings.add(_c02);
_c02.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c03=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c04=false;
var _c05=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c06=this._focusedTreeNodeBindings.getNext();
var _c07=_c06.getProperty(this._selectionProperty);
if(_c07!=null){
if(!this._selectionValue||this._selectionValue[_c07]){
_c05=(this._selectedTreeNodeBindings[_c06.key]=_c06);
var _c08=_c03[_c06.key];
if(!_c08||_c08!=_c05){
_c04=true;
}
}
}
}
if(_c05){
if(_c04){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c03){
for(var key in _c03){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c0a=new List();
for(var key in this._selectedTreeNodeBindings){
_c0a.add(this._selectedTreeNodeBindings[key]);
}
return _c0a;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c0c){
_c0c.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c0d){
var _c0e=_c0d.getDescendantBindingsByLocalName("treenode");
var _c0f=true;
var self=this;
_c0e.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c0f;
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
var _c12=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c12!=null){
this.focusSingleTreeNodeBinding(_c12);
_c12.callback();
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
TreeBinding.prototype.add=function(_c13){
var _c14=null;
if(this._treeBodyBinding){
_c14=this._treeBodyBinding.add(_c13);
}else{
this._treeNodeBuffer.add(_c13);
_c14=_c13;
}
return _c14;
};
TreeBinding.prototype.addFirst=function(_c15){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c16=this._treeBodyBinding.bindingElement;
_c16.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c17,_c18){
if(_c18.isContainer&&_c18.isOpen){
_c18.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c19){
this._isSelectable=_c19;
if(_c19){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c1a){
this._selectionProperty=_c1a;
};
TreeBinding.prototype.setSelectionValue=function(_c1b){
if(_c1b){
var list=new List(_c1b.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c1d,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c1d,arg);
switch(_c1d){
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
var _c1f=this.getFocusedTreeNodeBindings();
if(_c1f.hasEntries()){
var node=_c1f.getFirst();
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
var _c22=this.getFocusedTreeNodeBindings();
if(_c22.hasEntries()){
var node=_c22.getFirst();
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
var _c25=null;
while(next==null&&(_c25=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c25!=null){
next=_c25.getNextBindingByLocalName("treenode");
}
node=_c25;
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
var _c27=DOMEvents.getTarget(e);
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
var _c28=new TreeCrawler();
var list=new List();
_c28.mode=TreeCrawler.MODE_GETOPEN;
_c28.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c2b=list.getNext();
map.set(_c2b.getHandle(),true);
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
var _c30=this._positionIndicatorBinding;
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
if(y!=_c30.getPosition().y){
_c30.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c30.isVisible){
_c30.show();
}
}else{
if(_c30.isVisible){
_c30.hide();
}
}
}else{
if(_c30.isVisible){
_c30.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c33){
this._acceptingTreeNodeBinding=_c33;
this._acceptingPosition=_c33.boxObject.getLocalPosition();
this._acceptingDimension=_c33.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c33);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c34){
var map={};
var _c36=_c34.getChildBindingsByLocalName("treenode");
var _c37,pos,dim,y;
y=TreeBinding.grid(_c34.boxObject.getLocalPosition().y);
map[y]=true;
while(_c36.hasNext()){
_c37=_c36.getNext();
pos=_c37.boxObject.getLocalPosition();
dim=_c37.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c3d in this._acceptingPositions){
if(_c3d==y){
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
TreeBinding.newInstance=function(_c3e){
var _c3f=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c3e);
var _c40=UserInterface.registerBinding(_c3f,TreeBinding);
_c40.treeBodyBinding=TreeBodyBinding.newInstance(_c3e);
return _c40;
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
TreeBodyBinding.prototype.accept=function(_c41){
if(_c41 instanceof TreeNodeBinding){
this.logger.debug(_c41);
}
};
TreeBodyBinding.prototype.handleAction=function(_c42){
TreeBodyBinding.superclass.handleAction.call(this,_c42);
switch(_c42.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c42.target);
_c42.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c43){
var a=this.boxObject.getDimension().h;
var y=_c43.boxObject.getLocalPosition().y;
var h=_c43.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c49=_c43.labelBinding.bindingElement;
if(y-t<0){
_c49.scrollIntoView(true);
}else{
if(y-t+h>a){
_c49.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c4a){
var _c4b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c4a);
return UserInterface.registerBinding(_c4b,TreeBodyBinding);
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
var _c4c=TreeNodeBinding.superclass.serialize.call(this);
if(_c4c){
_c4c.label=this.getLabel();
_c4c.image=this.getImage();
var _c4d=this.getHandle();
if(_c4d&&_c4d!=this.key){
_c4c.handle=_c4d;
}
if(this.isOpen){
_c4c.open=true;
}
if(this.isDisabled){
_c4c.disabled=true;
}
if(this.dragType){
_c4c.dragtype=this.dragType;
}
if(this.dragAccept){
_c4c.dragaccept=this.dragAccept;
}
}
return _c4c;
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
var _c4f=UserInterface.getBinding(node);
if(_c4f&&_c4f.containingTreeBinding){
this.containingTreeBinding=_c4f.containingTreeBinding;
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
var _c50=this.key;
var _c51=this.getProperty("handle");
if(_c51){
_c50=_c51;
}
return _c50;
};
TreeNodeBinding.prototype.setHandle=function(_c52){
this.setProperty("handle",_c52);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c54=this.getProperty("label");
var _c55=this.getProperty("tooltip");
var _c56=this.getProperty("oncommand");
var _c57=this.getProperty("onbindingfocus");
var _c58=this.getProperty("onbindingblur");
var _c59=this.getProperty("focused");
var _c5a=this.getProperty("callbackid");
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
if(_c54!=null){
this.setLabel(_c54);
}
if(_c55!=null){
this.setToolTip(_c55);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c5c=this.bindingWindow.WindowManager;
if(_c56!=null){
this.oncommand=function(){
Binding.evaluate(_c56,this);
};
}
if(_c57!=null){
this.onfocus=function(){
Binding.evaluate(_c57,this);
};
}
if(_c58!=null){
this.onblur=function(){
Binding.evaluate(_c58,this);
};
}
if(_c59==true){
this.focus();
}
if(_c5a!=null){
Binding.dotnetify(this,_c5a);
}
};
TreeNodeBinding.prototype.handleAction=function(_c5d){
TreeNodeBinding.superclass.handleAction.call(this,_c5d);
switch(_c5d.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c5d.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c5e,_c5f){
var _c60=true;
if(_c5e instanceof TreeNodeBinding){
var _c61=false;
var _c62=this.bindingElement;
var _c63=this.containingTreeBinding.bindingElement;
while(!_c61&&_c62!=_c63){
if(_c62==_c5e.getBindingElement()){
_c61=true;
}else{
_c62=_c62.parentNode;
}
}
if(_c61){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c60=false;
}else{
this.acceptTreeNodeBinding(_c5e,_c5f);
}
}else{
_c60=false;
}
return _c60;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c64,_c65){
var _c66=_c64.serializeToString();
var _c67=new BindingParser(this.bindingDocument);
var _c68=_c67.parseFromString(_c66).getFirst();
_c65=_c65?_c65:this.containingTreeBinding.getDropIndex();
var _c69=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c68,_c69.get(_c65));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c64.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c6a=this.getProperty("image");
var _c6b=this.getProperty("image-active");
var _c6c=this.getProperty("image-disabled");
_c6b=_c6b?_c6b:this.isContainer?_c6a?_c6a:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c6a?_c6a:TreeNodeBinding.DEFAULT_ITEM;
_c6c=_c6c?_c6c:this.isContainer?_c6a?_c6a:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c6a?_c6a:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c6a=_c6a?_c6a:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c6a,imageHover:null,imageActive:_c6b,imageDisabled:_c6c});
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
TreeNodeBinding.prototype.setLabel=function(_c6e){
this.setProperty("label",String(_c6e));
if(this.isAttached){
this.labelBinding.setLabel(String(_c6e));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c6f){
this.setProperty("tooltip",String(_c6f));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c6f));
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
var _c70=this.imageProfile.getDefaultImage();
var _c71=this.imageProfile.getActiveImage();
_c71=_c71?_c71:_c70;
return this.isOpen?_c71:_c70;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c73=DOMEvents.getTarget(e);
var _c74=this.labelBinding.bindingElement;
var _c75=this.labelBinding.shadowTree.labelBody;
var _c76=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c73){
case _c74:
this._onAction(e);
break;
case _c75:
case _c76:
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
if(_c73.parentNode==this.bindingElement&&_c73.__updateType==Update.TYPE_INSERT){
var _c74=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c73)=="treenode"){
if(_c73==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c73,_c74.nextSibling);
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
switch(_c73){
case _c74:
case _c75:
case _c76:
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
var _c7a=true;
if(e.type=="mousedown"){
var _c7b=e.button==(e.target?0:1);
if(!_c7b){
_c7a=false;
}
}
if(_c7a){
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
var _c7d=false;
if(e!=null){
_c7d=e.shiftKey;
}
this.dispatchAction(_c7d?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c80=this.getDescendantBindingsByLocalName("treenode");
_c80.each(function(_c81){
_c81.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c82){
var _c83=_c82.getAttribute("focused");
if(_c83=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c84){
var _c85=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c84);
return UserInterface.registerBinding(_c85,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c86){
var _c87=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c86);
return UserInterface.registerBinding(_c87,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c88){
this.bindingElement.style.left=_c88.x+"px";
this.bindingElement.style.top=_c88.y+"px";
this._geometry.x=_c88.x;
this._geometry.y=_c88.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c89){
var _c8a=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c89);
return UserInterface.registerBinding(_c8a,TreePositionIndicatorBinding);
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
this.addFilter(function(_c8c){
var _c8d=UserInterface.getBinding(_c8c);
var _c8e=null;
var _c8e=null;
if(!_c8d instanceof TreeNodeBinding){
_c8e=NodeCrawler.SKIP_NODE;
}
return _c8e;
});
this.addFilter(function(_c8f,list){
var _c91=UserInterface.getBinding(_c8f);
var _c92=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c91.isOpen){
list.add(_c91);
}
break;
}
return _c92;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c93){
this.binding=_c93;
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
DockTabsButtonBinding.newInstance=function(_c94){
var _c95=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c94);
_c95.setAttribute("type","checkbox");
_c95.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c95.className="tabbutton";
return UserInterface.registerBinding(_c95,DockTabsButtonBinding);
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
var _c96=DockBinding.superclass.serialize.call(this);
if(_c96){
_c96.active=this.isActive?true:null;
_c96.collapsed=this.isCollapsed?true:null;
}
return _c96;
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
var _c97=UserInterface.getBinding(this.bindingElement.parentNode);
var _c98=MatrixBinding.newInstance(this.bindingDocument);
_c98.attachClassName("dockliner");
this.shadowTree.dockLiner=_c98;
_c97.add(_c98);
_c98.attach();
_c98.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c9a){
var _c9b=this.getSelectedTabPanelBinding();
if(_c9b){
_c9b.isVisible=_c9a;
_c9b.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c9c){
var _c9d=this._getBindingForDefinition(_c9c);
var _c9e=DockTabBinding.newInstance(this.bindingDocument);
_c9e.setHandle(_c9c.handle);
_c9e.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c9c.label);
_c9e.setImage(_c9c.image);
_c9e.setToolTip(_c9c.toolTip);
_c9e.setEntityToken(_c9c.entityToken);
_c9e.setAssociatedView(_c9d);
this.appendTabByBindings(_c9e,null);
this._setupPageBindingListeners(_c9e);
var _c9f=this.getTabPanelBinding(_c9e);
_c9d.snapToBinding(_c9f);
var _ca0=this.bindingWindow.bindingMap.views;
_ca0.add(_c9d);
if(!this.isActive){
this.activate();
}
_c9d.attach();
};
DockBinding.prototype.prepareOpenView=function(_ca1,_ca2){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_ca2.setLabel(_ca1.label);
_ca2.setImage(_ca1.image);
_ca2.setToolTip(_ca1.toolTip);
this._setupPageBindingListeners(_ca2);
var _ca3=this.getTabPanelBinding(_ca2);
var _ca4=this._getBindingForDefinition(_ca1);
_ca2.setAssociatedView(_ca4);
_ca4.snapToBinding(_ca3);
UserInterface.getBinding(this.bindingDocument.body).add(_ca4);
_ca4.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_ca5){
var _ca6=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_ca6.bindingDocument);
view.setDefinition(_ca5);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_ca8){
var _ca9=this.getTabPanelBinding(_ca8);
var self=this;
var _cab={handleAction:function(_cac){
var _cad=_cac.target;
switch(_cac.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cad.reflex(true);
var view=_ca8.getAssociatedView();
if(_cad.bindingWindow==view.getContentWindow()){
_ca8.updateDisplay(_cad);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_ca8.onPageInitialize(_cad);
_cac.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_ca8.updateDisplay(_cad);
_cac.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_ca8.updateEntityToken(_cad);
_cac.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_ca8.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_ca8.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_ca8);
_cac.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_ca8,true);
_cac.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_ca8);
break;
case Binding.ACTION_FORCE_REFLEX:
_ca9.reflex(true);
_cac.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_ca8.isDirty){
_ca8.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_caf){
_ca9.addActionListener(_caf,_cab);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cb0){
DockBinding.superclass.handleAction.call(this,_cb0);
var _cb1=_cb0.target;
switch(_cb0.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cb0.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cb1 instanceof DockBinding){
if(_cb1.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cb1);
if(this.isActive){
_cb1.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cb1);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cb2,arg){
DockBinding.superclass.handleBroadcast.call(this,_cb2,arg);
switch(_cb2){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cb4=arg;
if(_cb4.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cb4.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cb5){
var tabs=this.getTabBindings();
var _cb7=false;
while(tabs.hasNext()&&!_cb7){
var tab=tabs.getNext();
var _cb9=tab.getEntityToken();
if(_cb9!=null&&_cb9==_cb5){
if(!tab.isSelected){
this.select(tab,true);
_cb7=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cba){
this._handleCollapse(true,_cba);
};
DockBinding.prototype.unCollapse=function(_cbb){
this._handleCollapse(false,_cbb);
};
DockBinding.prototype._handleCollapse=function(_cbc,_cbd){
var _cbe=this.getChildBindingByLocalName("dockpanels");
var _cbf=this.getAncestorBindingByLocalName("splitbox");
if(_cbc){
_cbe.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cbd&&_cbf.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cbe.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cbd){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cbc);
this.isCollapsed=_cbc;
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
DockBinding.prototype.closeTab=function(_cc4,_cc5){
if(_cc4.isDirty&&!_cc5){
var _cc6=Resolver.resolve(_cc4.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cc6),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cc8){
switch(_cc8){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cc4);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cc4);
break;
}
}});
}else{
this.removeTab(_cc4);
}
};
DockBinding.prototype.closeTabsExcept=function(_cc9){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cc9){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_ccc){
var _ccd=_ccc.getAssociatedView();
_ccd.saveContainedEditor();
var self=this;
var _ccf={handleBroadcast:function(_cd0,arg){
switch(_cd0){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_ccd.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ccf);
if(arg.isSuccess){
self.removeTab(_ccc);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ccf);
};
DockBinding.prototype.appendTabByBindings=function(_cd2,_cd3){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cd2,_cd3);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cd4){
_cd4=_cd4?_cd4+"px":"100%";
this.bindingElement.style.width=_cd4;
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
DockBinding.prototype.showControls=function(_cd5){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cd5){
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
var _cd8=DockControlBinding.newInstance(this.bindingDocument);
_cd8.setControlType(type);
return _cd8;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cda=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cda)){
_cda=_cda>0?_cda-1:0;
self.bindingElement.style.width=new String(_cda)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cdb){
DockTabsBinding.superclass.handleCrawler.call(this,_cdb);
switch(_cdb.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cdd=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cdd)){
_cdd=_cdd>0?_cdd-1:0;
self.bindingElement.style.width=new String(_cdd)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cde){
var _cdf=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cde);
return UserInterface.registerBinding(_cdf,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_ce0){
this._viewBinding=_ce0;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _ce1=DockTabBinding.superclass.serialize.call(this);
if(_ce1){
_ce1.label=null;
_ce1.image=null;
_ce1.handle=this.getHandle();
}
return _ce1;
};
DockTabBinding.prototype.setHandle=function(_ce2){
this.setProperty("handle",_ce2);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_ce3){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_ce3;
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
var _ce4=DialogControlBinding.newInstance(this.bindingDocument);
_ce4.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_ce4);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_ce5){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_ce5){
this.isDirty=_ce5;
if(Binding.exists(this.labelBinding)){
var _ce6=this.labelBinding.getLabel();
if(_ce6!=null){
this.labelBinding.setLabel(_ce5?"*"+_ce6:_ce6.slice(1,_ce6.length));
}else{
this.labelBinding.setLabel(_ce5?"*":"");
}
}
}
var _ce7=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_ce7.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_ce7.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_ce8){
this.setLabel(_ce8.getLabel());
this.setImage(_ce8.getImage());
this.setToolTip(_ce8.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_ce9){
this.setEntityToken(_ce9.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cea){
DockTabBinding.superclass.handleAction.call(this,_cea);
var _ceb=_cea.target;
switch(_cea.type){
case ControlBinding.ACTION_COMMAND:
if(_ceb.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cea.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_ceb);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cec){
var cmd=_cec.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cee){
if(!_cee){
if(!this.getLabel()){
_cee=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cee=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_cee);
};
DockTabBinding.prototype.setImage=function(_cef){
if(!_cef){
if(!this.getImage()){
_cef=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cef=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cef);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cf2=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cf2;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cf2;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cf2;
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
var _cf4=this.bindingElement;
setTimeout(function(){
_cf4.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cf5,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cf5,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cf5){
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
DockTabBinding.prototype.select=function(_cfa){
DockTabBinding.superclass.select.call(this,_cfa);
this._updateBroadcasters();
if(_cfa!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cfb=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cfc=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cfc.enable();
if(this.isDirty){
_cfb.enable();
}else{
_cfb.disable();
}
}else{
_cfc.disable();
_cfb.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cfd){
if(this._canUpdateTree||_cfd){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cfe=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d00=win.bindingMap.savebutton;
if(_d00!=null){
_cfe=true;
}
}
}
return _cfe;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d01){
var _d02=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d01);
return UserInterface.registerBinding(_d02,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d03){
var _d04=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d03);
return UserInterface.registerBinding(_d04,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d05){
DockPanelBinding.superclass.select.call(this,_d05);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d06){
DockPanelBinding.superclass.handleCrawler.call(this,_d06);
if(_d06.response==null){
if(_d06.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d06.id==FocusCrawler.ID){
_d06.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d07){
var _d08=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d07);
return UserInterface.registerBinding(_d08,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d09){
var _d0a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d09);
return UserInterface.registerBinding(_d0a,DockControlBinding);
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
ViewBinding.getInstance=function(_d0b){
var _d0c=ViewBinding._instances.get(_d0b);
if(!_d0c){
var cry="ViewBinding.getInstance: No such instance: "+_d0b;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d0c;
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
var _d0f=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d0f){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d10=snap.boxObject.getGlobalPosition();
var _d11=snap.boxObject.getDimension();
if(!Point.isEqual(_d10,this._lastknownposition)){
this.setPosition(_d10);
this._lastknownposition=_d10;
}
if(!Dimension.isEqual(_d11,this._lastknowndimension)){
this.setDimension(_d11);
this._lastknowndimension=_d11;
var _d12=_d11.h-ViewBinding.VERTICAL_ADJUST;
_d12=_d12<0?0:_d12;
this.windowBinding.getBindingElement().style.height=new String(_d12)+"px";
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
var _d13=this._viewDefinition.flowHandle;
if(_d13!=null){
FlowControllerService.CancelFlow(_d13);
}
}
if(this._viewDefinition!=null){
var _d14=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d14);
this.logger.fine("ViewBinding closed: \""+_d14+"\"");
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
var _d16=null;
if(this._viewDefinition!=null){
_d16=this._viewDefinition.handle;
}
return _d16;
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
ViewBinding.prototype.setDefinition=function(_d17){
this._viewDefinition=_d17;
if(_d17.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d18){
ViewBinding.superclass.handleAction.call(this,_d18);
var _d19=_d18.target;
switch(_d18.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d18.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d19.isActivated){
_d19.onActivate();
}
}
_d18.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d19==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d18.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d19==this._snapBinding){
if(_d19.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d19.getContentWindow().isPostBackDocument){
if(_d18.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d19.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d19==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d19.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d18.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d18.type==WindowBinding.ACTION_ONLOAD){
var win=_d19.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d19);
}
}
}
_d18.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d19.label&&this._viewDefinition.label){
_d19.label=this._viewDefinition.label;
}
if(!_d19.image&&this._viewDefinition.image){
_d19.image=this._viewDefinition.image;
}
if(_d19.bindingWindow==this.getContentWindow()){
this._pageBinding=_d19;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d19.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d19==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d18.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d18.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d1e,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d1e,arg);
switch(_d1e){
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
var _d22=def.argument;
if(_d22!=null){
page.setPageArgument(_d22);
}
var _d23=def.width;
if(_d23!=null){
page.width=_d23;
}
var _d24=def.height;
if(_d24!=null){
page.height=_d24;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d25){
ViewBinding.superclass.handleCrawler.call(this,_d25);
switch(_d25.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d25.id==FocusCrawler.ID){
if(_d25.previousNode!=this._snapBinding.bindingElement){
_d25.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d25.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d26){
_d26.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d26.x+"px";
this.bindingElement.style.top=_d26.y+"px";
};
ViewBinding.prototype.setDimension=function(_d27){
_d27.h-=ViewBinding.VERTICAL_ADJUST;
_d27.w-=ViewBinding.HORIZONTAL_ADJUST;
_d27.w-=1;
if(_d27.h<0){
_d27.h=0;
}
if(_d27.w<0){
_d27.w=0;
}
this.bindingElement.style.width=String(_d27.w)+"px";
this.bindingElement.style.height=String(_d27.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d28){
this.isFlexBoxBehavior=false;
_d28.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d28.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d28.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d28;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d29=null;
if(this.isFreeFloating==true){
_d29=this._snapBinding.getBindingElement();
}else{
_d29=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d29;
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
ViewBinding.prototype.reload=function(_d2a){
this._isLoaded=false;
this.windowBinding.reload(_d2a);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d2b=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d2b=true;
}
}
if(!_d2b){
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
ViewBinding.newInstance=function(_d2f){
var _d30=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d2f);
var _d31=UserInterface.registerBinding(_d30,ViewBinding);
_d31.windowBinding=_d31.add(WindowBinding.newInstance(_d2f));
_d31.windowBinding.isFlexible=false;
return _d31;
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
var _d39=this.bindingWindow.__doPostBack;
var _d3a=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d3a){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d3b,_d3c){
if(!form.__isSetup){
Application.lock(self);
_d3a=true;
}
self.manifestAllDataBindings();
_d39(_d3b,_d3c);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d3d,list){
var _d3f=this.bindingWindow.bindingMap.__REQUEST;
if(_d3f!=null&&this._isDotNet()){
switch(_d3d){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d3f.postback(_d3d);
}
}
break;
default:
_d3f.postback(_d3d);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d3d,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d40,list){
var _d42=this.getDescendantBindingsByType(WindowBinding);
_d42.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d40,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d46){
if(_d46.name==null||_d46.name==""){
return;
}
list.add({name:_d46.name,value:_d46.value});
});
var out="";
list.each(function(_d48){
out+=_d48.name+": "+_d48.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d49){
PageBinding.superclass.handleAction.call(this,_d49);
var _d4a=_d49.target;
switch(_d49.type){
case RootBinding.ACTION_PHASE_3:
if(_d4a==UserInterface.getBinding(this.bindingDocument.body)){
_d4a.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d4a);
}
_d49.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d4b=this.validateAllDataBindings();
if(_d4b){
this.doPostBack(_d4a);
}
}
_d49.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d49.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d4a.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d4a.key)){
this._initBlockers.del(_d4a.key);
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
var _d4d={handleAction:function(_d4e){
if(_d4e.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d4d);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d4d);
}else{
MessageQueue.udpdate();
}
_d49.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d4f,arg){
PageBinding.superclass.handleBroadcast.call(this,_d4f,arg);
switch(_d4f){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d51=arg;
if(!this._canPostBack&&!_d51){
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
PageBinding.prototype.doPostBack=function(_d53){
if(this._canPostBack){
if(_d53!=null&&this._isDotNet()){
var _d54=_d53.getCallBackID();
var _d55=_d53.getCallBackArg();
if(_d54!=null){
_d54=_d54.replace(/_/g,"$");
}else{
_d54="";
}
if(_d55==null){
_d55="";
}
this.bindingWindow.__doPostBack(_d54,_d55);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d56){
var _d57=true;
var _d58=this.bindingWindow.DataManager.getAllDataBindings();
while(_d58.hasNext()&&_d57){
var _d59=_d58.getNext();
if(_d59.isAttached){
var _d5a=_d59.validate();
if(_d57&&!_d5a){
_d57=false;
this.logger.debug("Invalid DataBinding: "+_d59.toString()+" ("+_d59.getName()+")");
if(_d56){
var _d5b=_d59.getAncestorBindingByType(TabPanelBinding);
if(_d5b!=null&&!_d5b.isVisible){
var _d5c=_d5b.getAncestorBindingByType(TabBoxBinding);
var _d5d=_d5c.getTabBinding(_d5b);
_d5c.select(_d5d);
}
}
break;
}
}
}
return _d57;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d5f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d5f.hasNext()){
var _d60=_d5f.getNext();
if(_d60.isAttached){
var _d61=_d60.manifest();
if(_d61!=null){
list.add(_d61);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d62=this.bindingWindow.DataManager.getAllDataBindings();
while(_d62.hasNext()){
var _d63=_d62.getNext();
if(_d63.isAttached){
_d63.clean();
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
var _d66=this._cachedFocus.getBinding();
if(_d66){
_d66.blur();
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
var _d67=this.getProperty("width");
if(!_d67){
_d67=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d67;
}
if(this.height==null){
var _d68=this.getProperty("height");
this.height=_d68?_d68:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d69=this.getProperty("minheight");
if(_d69!=null){
this.minheight=_d69;
}
}
if(this.controls==null){
var _d6a=this.getProperty("controls");
this.controls=_d6a?_d6a:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d6b=this.getProperty("resizable");
this.isResizable=_d6b?_d6b:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d6c){
if(_d6c!=this.isAutoHeightLayoutMode){
if(_d6c){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d6c;
}
};
DialogPageBinding.prototype.handleAction=function(_d6d){
DialogPageBinding.superclass.handleAction.call(this,_d6d);
var _d6e=_d6d.target;
switch(_d6d.type){
case PageBinding.ACTION_ATTACHED:
if(_d6e!=this&&_d6e.isFitAsDialogSubPage){
_d6e.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d6d.consume();
if(_d6e.response!=null){
this.response=_d6e.response;
switch(_d6e.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d6f){
var _d70=this.bindingWindow.bindingMap.buttonAccept;
if(_d70!=null){
_d70.setDisabled(_d6f);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d71){
var _d72=CSSComputer.getPadding(this.bindingElement);
var _d73=CSSComputer.getBorder(this.bindingElement);
_d71+=_d72.top+_d72.bottom;
_d71+=_d73.top+_d73.bottom;
if(_d71>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d71+"px";
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
EditorPageBinding.prototype.handleAction=function(_d7b){
EditorPageBinding.superclass.handleAction.call(this,_d7b);
var _d7c=_d7b.target;
switch(_d7b.type){
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
var _d7d=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d7c.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d7d==-1){
_d7d=0;
}
}else{
_d7d++;
}
return res;
});
if(_d7d>-1){
this._messengers.del(_d7d);
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
_d7b.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d7c.key,_d7c);
if(_d7c instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d7c.key);
if(_d7c instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d7c==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d7c.getSelectedTabBinding();
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
_d7b.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d7c==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d7b.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d7c==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d7b.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d7c==this._windowBinding){
if(_d7c.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d82=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d82);
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
var _d83=this.bindingWindow.bindingMap.savebutton;
if(_d83!=null&&!_d83.isDisabled){
_d83.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d84=this.bindingWindow.bindingMap.__REQUEST;
if(_d84!=null){
_d84.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d85=this.bindingWindow.bindingMap.__REQUEST;
if(_d85!=null){
_d85.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d86){
this._message=null;
switch(_d86){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d86,this._messengers);
if(!this._messengers.hasEntries()){
if(_d86==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d86;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d86;
EditorPageBinding.superclass.postMessage.call(this,_d86,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d86,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d87,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d87,arg);
switch(_d87){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d89=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d89);
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
var _d8a=new List();
this._invalidBindings.each(function(key,_d8c){
var list=_d8c.getInvalidLabels();
if(list){
list.each(function(_d8e){
_d8a.add(_d8e);
});
}
});
if(_d8a.hasEntries()){
var _d8f="";
while(_d8a.hasNext()){
_d8f+=_d8a.getNext().toLowerCase();
if(_d8a.hasNext()){
_d8f+=", ";
}else{
_d8f+=".";
}
}
var _d90=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d90+" "+_d8f);
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
EditorPageBinding.prototype.enableSave=function(_d91){
var _d92=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d92){
var _d93=UserInterface.getBinding(_d92);
if(_d91){
_d93.enable();
}else{
_d93.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d94=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d94!=null){
UserInterface.getBinding(_d94).enable();
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
var _d95=this._windowBinding.getContentDocument().title;
if(_d95==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d96=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d98){
if(_d98.name=="__EVENTTARGET"&&_d96){
_d98.value=_d96;
}
list.add({name:_d98.name,value:_d98.value});
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
WizardPageBinding.prototype.handleAction=function(_d9a){
WizardPageBinding.superclass.handleAction.call(this,_d9a);
var _d9b=_d9a.target;
switch(_d9a.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d9b);
}else{
_d9a.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d9b);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d9a.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d9a.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d9c){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d9e=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d9c);
}
if(_d9e){
_d9e.setDisabled(!_d9c);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d9f,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d9f,arg);
var self=this;
switch(_d9f){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_da3){
};
MarkupAwarePageBinding.prototype._activate=function(_da4){
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
var _da5=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_da5.boxObject.getDimension().w;
_da5.hide();
var _da6=this.boxObject.getDimension().h;
this.bindingElement.style.height=_da6+"px";
var self=this;
var _da8=this.bindingWindow.bindingMap.moreactionsbutton;
_da8.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_da9){
self._showMoreActions();
_da9.consume();
}});
var _daa=this.bindingWindow.bindingMap.moreactionspopup;
_daa.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dab){
var item=_dab.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dad,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dad,arg);
switch(_dad){
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
var _db1=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_db1!=null){
_db1.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _db2=this.bindingWindow.WindowManager;
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
var _db3=new String("");
this._actionProfile.each(function(_db4,list){
list.each(function(_db6){
_db3+=_db6.getHandle()+";"+_db6.getKey()+";";
if(_db6.isDisabled()){
_db3+="isDisabled='true';";
}
});
});
return _db3;
};
SystemToolBarBinding.prototype.handleAction=function(_db7){
SystemToolBarBinding.superclass.handleAction.call(this,_db7);
switch(_db7.type){
case ButtonBinding.ACTION_COMMAND:
var _db8=_db7.target;
this._handleSystemAction(_db8.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_db9){
if(_db9!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dbb=list.getFirst();
var _dbc=_dbb.node;
}
SystemAction.invoke(_db9,_dbc);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dbf,list){
var _dc1=new List();
list.reset();
while(list.hasNext()){
var _dc2=list.getNext();
var _dc3=null;
if(_dc2.isInToolBar()){
if(_dc2.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dc3=self.getToolBarButtonBinding(_dc2);
}
}
if(_dc3!=null){
_dc1.add(_dc3);
}
}
if(_dc1.hasEntries()){
var _dc4=ToolBarGroupBinding.newInstance(doc);
_dc1.each(function(_dc5){
_dc4.add(_dc5);
});
self.addLeft(_dc4);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dc6=this.bindingWindow.bindingMap.toolsbutton;
var _dc7=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dc8=_dc6.bindingElement.offsetLeft-this._moreActionsWidth;
var _dc9=0;
var _dca=new List();
var _dcb,_dcc=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dcb=_dcc.getNext())!=null){
if(!_dcb.isVisible){
_dcb.show();
}
_dc9+=_dcb.boxObject.getDimension().w;
if(_dc9>=_dc8){
_dca.add(_dcb);
_dcb.hide();
}
}
if(_dca.hasEntries()){
var _dcd=_dca.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dcd).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dcb=_dca.getNext())!=null){
this._moreActions.add(_dcb.associatedSystemAction);
}
_dc7.show();
}else{
this._moreActions=null;
_dc7.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dce=this.bindingWindow.bindingMap.moreactionspopup;
_dce.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dce.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dce.add(item);
}
_dce.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dd0){
var _dd1=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dd2=_dd0.getLabel();
var _dd3=_dd0.getToolTip();
var _dd4=_dd0.getImage();
var _dd5=_dd0.isDisabled();
if(_dd4&&_dd4.indexOf("size=")==-1){
_dd4=_dd4+"&size="+this.getImageSize();
_dd1.imageProfile=new ImageProfile({image:_dd4});
}
if(_dd2){
_dd1.setLabel(_dd2);
}
if(_dd3){
_dd1.setToolTip(_dd3);
}
if(_dd0.isDisabled()){
_dd1.disable();
}
_dd1.associatedSystemAction=_dd0;
return _dd1;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dd6=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dd6!=null){
_dd6.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dd7){
var _dd8=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dd7);
return UserInterface.registerBinding(_dd8,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dd9){
var _dda=SystemTreeBinding.superclass.add.call(this,_dd9);
if(!this._defaultTreeNode){
if(_dd9 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dd9;
}
}
return _dda;
};
SystemTreeBinding.prototype.handleAction=function(_ddb){
SystemTreeBinding.superclass.handleAction.call(this,_ddb);
var _ddc=_ddb.target;
switch(_ddb.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_ddc.key);
this._updateFocusedNode();
_ddb.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_ddb.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_ddc.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_ddb.consume();
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
var _dde=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_dde);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_ddf){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_ddf);
var reg=this._entityTokenRegistry;
var _de1=_ddf.node.getEntityToken();
if(reg.has(_de1)){
reg.get(_de1).add(_ddf);
}else{
reg.set(_de1,new List([_ddf]));
}
var _de2=null;
if(this.isLockedToEditor){
if(_de1==StageBinding.entityToken){
if(_ddf.node.isTreeLockEnabled()){
_de2=_ddf;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_ddf.node.getHandle()){
_de2=_ddf;
}
}
}
if(_de2!=null){
this.focusSingleTreeNodeBinding(_de2);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_de3){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_de3);
var reg=this._entityTokenRegistry;
var _de5=_de3.node.getEntityToken();
if(reg.has(_de5)){
var list=reg.get(_de5);
list.del(_de3);
if(!list.hasEntries()){
reg.del(_de5);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_de3.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_de3.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _de9=this._refreshingTreeNodes;
if(_de9.hasEntries()&&_de9.has(key)){
_de9.del(key);
if(!_de9.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _dea=StageBinding.entityToken;
if(_dea!=null){
this._focusTreeNodeByEntityToken(_dea);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _deb=false;
var _dec=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_deb=false;
}else{
if(_dec.hasEntries()){
_deb=true;
while(_deb&&_dec.hasNext()){
var _ded=_dec.getNext();
if(!_ded.isDraggable){
_deb=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_deb;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_dee,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_dee,arg);
switch(_dee){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_dee,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_dee);
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
var self=this,_df2=arg;
setTimeout(function(){
if(_df2!=null){
self._focusTreeNodeByEntityToken(_df2);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _df4=tab.perspectiveNode==null;
if(!_df4){
_df4=tab.perspectiveNode==this.perspectiveNode;
}
if(_df4){
var self=this,_df6=tab.getEntityToken();
setTimeout(function(){
if(_df6==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_df6);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_df7,_df8){
this.isLockFeatureFocus=true;
var _df9=null;
if(this._entityTokenRegistry.has(_df7)){
var list=this._entityTokenRegistry.get(_df7);
list.each(function(tn){
var _dfc=true;
if(tn.node.isTreeLockEnabled()){
_df9=tn;
_dfc=false;
}
return _dfc;
});
if(_df9!=null){
if(!_df9.isFocused){
this.focusSingleTreeNodeBinding(_df9,true);
}else{
_df9.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_df9==null&&_df8!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_df7);
self._focusTreeNodeByEntityToken(_df7,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_dfe){
var _dff=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e00=this.getRootTreeNodeBindings();
while(_e00.hasNext()){
var _e01=_e00.getNext();
_dff.add(_e01.node.getEntityToken());
}
}else{
_dff.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_dff.hasNext()){
var _e02=_dff.getNext();
var _e03=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e02,_dfe,_e03);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e06=this._treeNodeBindings;
var _e07=new Map();
function fix(_e08,list){
if(!_e08.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e06.has(node.getHandle())){
var _e0b=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e07.set(node.getHandle(),_e0b);
_e08.add(_e0b);
}
});
_e08.attachRecursive();
}
}
_e08.open(true);
}
map.each(function(_e0c,list){
if(_e06.has(_e0c)){
var _e0e=_e06.get(_e0c);
fix(_e0e,list);
}else{
if(_e07.has(_e0c)){
var _e0f=_e07.get(_e0c);
fix(_e0f,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e10,arg){
switch(_e10){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e12=arg;
if(_e12!=null){
this._invokeServerRefresh(_e12);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e13=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e13;
_e13.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e13=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e13;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e14){
if(_e14!=null&&_e14=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e14)){
var list=this._entityTokenRegistry.get(_e14).reset();
this._refreshToken=_e14;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e16=list.getNext();
this._refreshingTreeNodes.set(_e16.key,true);
setTimeout(function(){
_e16.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e17=this.getFocusedTreeNodeBindings().getFirst();
if(_e17){
var _e18=_e17.getLabel();
var _e19=_e17.getAncestorBindingByLocalName("treenode");
if(_e19){
_e17=_e19;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e17.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e1a=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e1a,[_e18]);
}
_e17.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e1b=SystemTreeBinding.clipboard;
if(_e1b){
var type=_e1b.dragType;
var _e1d=this.getFocusedTreeNodeBindings().getFirst();
if(_e1d.dragAccept){
if(_e1d.acceptor.isAccepting(type)){
this._performPaste(_e1d);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e1e){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e1e.node.hasDetailedDropSupport()){
if(_e1e.node.hasChildren()){
var _e20=_e1e.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e21,_e22){
if(_e21==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e23=_e22.get("switch");
var _e24=_e22.get("sibling");
if(_e23=="after"){
_e24++;
}
var _e25=_e1e.accept(SystemTreeBinding.clipboard,_e24);
if(_e25){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e20);
}else{
Application.lock(self);
var _e26=_e1e.accept(SystemTreeBinding.clipboard,0);
if(_e26){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e26=_e1e.accept(SystemTreeBinding.clipboard,0);
if(_e26){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e27=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e27!=null){
this._focusTreeNodeByEntityToken(_e27);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e28){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e28){
this.blurSelectedTreeNodes();
var _e29=this.getRootTreeNodeBindings();
_e29.each(function(_e2a){
if(_e2a.isContainer&&_e2a.isOpen){
_e2a.close();
_e2a.hasBeenOpened=false;
_e2a.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e2b){
if(_e2b!=this.isLockedToEditor){
this.isLockedToEditor=_e2b;
if(_e2b){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e2d=this.getRootTreeNodeBindings();
_e2d.each(function(_e2e){
var _e2f=_e2e.getOpenSystemNodes();
if(_e2f!=null&&_e2f.hasEntries()){
list.merge(_e2f);
}else{
if(_e2e.isOpen){
list.add(_e2e.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e30){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e30);
if(_e30!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var _e31=new Map();
var _e32=this.getFocusedTreeNodeBindings();
var _e33=_e32.getFirst().node.getActionProfile();
if(_e33!=null){
var self=this;
_e33.each(function(_e35,list){
var _e37=new List();
list.each(function(_e38){
if(_e38.getActivePositions()&self._activePosition){
_e37.add(_e38);
}
});
if(_e37.hasEntries()){
_e31.set(_e35,_e37);
}
});
}
_e31.activePosition=this._activePosition;
return _e31;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e39,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e39,arg);
switch(_e39){
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
var _e3e=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e3e.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e3f=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e3f.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e40){
SystemTreePopupBinding.superclass.handleAction.call(this,_e40);
switch(_e40.type){
case MenuItemBinding.ACTION_COMMAND:
var _e41=_e40.target;
var _e42=_e41.associatedSystemAction;
if(_e42){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e44=list.getFirst();
var _e45=_e44.node;
}
SystemAction.invoke(_e42,_e45);
}else{
var cmd=_e41.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e48=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e48=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e48=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e48=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e48=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e48){
setTimeout(function(){
EventBroadcaster.broadcast(_e48);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e49=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e49.hasNext()){
var _e4a=UserInterface.getBinding(_e49.getNext());
if(!_e4a.getProperty("rel")){
_e4a.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e4c=new List();
var self=this;
this._actionProfile.each(function(_e4e,list){
var _e50=MenuGroupBinding.newInstance(doc);
list.each(function(_e51){
var _e52=self.getMenuItemBinding(_e51);
_e50.add(_e52);
});
_e4c.add(_e50);
});
_e4c.reverse();
while(_e4c.hasNext()){
this._bodyBinding.addFirst(_e4c.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e53){
var _e54=MenuItemBinding.newInstance(this.bindingDocument);
var _e55=_e53.getLabel();
var _e56=_e53.getToolTip();
var _e57=_e53.getImage();
var _e58=_e53.getDisabledImage();
var _e59=_e53.isCheckBox();
if(_e55){
_e54.setLabel(_e55);
}
if(_e56){
_e54.setToolTip(_e56);
}
if(_e57){
_e54.imageProfile=new ImageProfile({image:_e57,imageDisabled:_e58});
}
if(_e59){
_e54.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e53.isChecked()){
_e54.check(true);
}
}
if(_e53.isDisabled()){
_e54.disable();
}
_e54.associatedSystemAction=_e53;
return _e54;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e5d=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e5d=UserInterface.getBinding(node);
if(_e5d.isDisabled){
_e5d=null;
}
}
break;
}
if(_e5d!=null&&_e5d.node!=null&&_e5d.node.getActionProfile()!=null){
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
var _e5e=this.node.getLabel();
if(_e5e){
this.setLabel(_e5e);
}
var _e5f=this.node.getToolTip();
if(_e5f){
this.setToolTip(_e5f);
}
var _e60=this.node.getHandle();
if(_e60){
this.setHandle(_e60);
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
var _e63="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e63+=list.getNext();
if(list.hasNext()){
_e63+=" ";
}
}
this.setProperty("dragaccept",_e63);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e65){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e65);
switch(_e65.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e65.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e65.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e66,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e66,arg);
switch(_e66){
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
var _e69=null;
var _e6a=this.node.getImageProfile();
if(_e6a){
if(this.isOpen){
_e69=_e6a.getActiveImage();
}else{
_e69=_e6a.getDefaultImage();
}
}
if(!_e69){
_e69=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e69;
};
SystemTreeNodeBinding.prototype.open=function(_e6b){
var _e6c=this.isContainer&&!this.isOpen;
var _e6d=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e6c&&(_e6d||SystemTreeBinding.HAS_NO_MEMORY)&&_e6b!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e6e=null;
if(this.isContainer){
_e6e=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e6e);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e70){
if(_e70!=null){
this._refreshBranch(_e70);
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
var _e71=new List();
var _e72=this.node.getChildren();
this.empty();
if(_e72.hasEntries()){
this._insertTreeNodesRegulated(_e72);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e73){
var _e74=0;
var _e75=new List([]);
while(_e73.hasEntries()&&_e74<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e76=SystemTreeNodeBinding.newInstance(_e73.extractFirst(),this.bindingDocument);
_e76.autoExpand=this.autoExpand;
this.add(_e76);
_e76.attach();
_e74++;
if(this.autoExpand){
if(_e74==1&&!_e73.hasEntries()||LastOpenedSystemNodes.isOpen(_e76)){
_e75.add(_e76);
}
}
}
if(_e73.hasEntries()){
this._insertBufferTreeNode(_e73);
}
_e75.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e79){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e7b=this.node.getDescendantBranch(list);
if(_e7b.hasEntries()){
this.XXX(_e7b);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e7c){
var self=this;
var map=new Map();
this.empty();
_e7c.each(function(key,_e80){
if(_e80.hasEntries()){
_e80.each(function(node){
var _e82=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e82);
if(map.has(key)){
var _e83=map.get(key);
_e83.add(_e82);
_e83.isOpen=true;
_e83.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e82);
}else{
}
}
});
}
});
this.attachRecursive();
_e7c.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e84=new TreeCrawler();
var _e85=new List();
_e84.mode=TreeCrawler.MODE_GETOPEN;
_e84.crawl(this.bindingElement,_e85);
if(_e85.hasEntries()){
_e85.extractFirst();
}
_e84.dispose();
return _e85;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e86=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e86=new List([this.node]);
list.each(function(_e88){
_e86.add(_e88.node);
});
}
return _e86;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e89,_e8a){
var _e8b=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e89 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e89.node.getData(),this.node.getData(),_e8a?_e8a:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e8b);
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
SystemTreeNodeBinding.newInstance=function(node,_e8f){
var _e90=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e8f);
var _e91=UserInterface.registerBinding(_e90,SystemTreeNodeBinding);
_e91.node=node;
return _e91;
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
SystemPageBinding.prototype.setPageArgument=function(_e92){
this.node=_e92;
SystemPageBinding.superclass.setPageArgument.call(this,_e92);
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
var _e93=this.node.getChildren();
if(_e93.hasEntries()){
while(_e93.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e93.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e95=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e95.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e97=new TreeCrawler();
var _e98=new List();
_e97.mode=TreeCrawler.MODE_GETOPEN;
_e97.crawl(this.bindingElement,_e98);
_e97.dispose();
var list=new List([this.node]);
_e98.each(function(_e9a){
list.add(_e9a.node);
});
this._tree.empty();
var _e9b=this.node.getDescendantBranch(list);
if(_e9b.hasEntries()){
var self=this;
var map=new Map();
_e9b.each(function(key,_e9f){
_e9f.each(function(node){
var _ea1=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ea1);
if(map.has(key)){
var _ea2=map.get(key);
_ea2.add(_ea1);
_ea2.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ea1);
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
SystemPageBinding.prototype.handleAction=function(_ea3){
SystemPageBinding.superclass.handleAction.call(this,_ea3);
switch(_ea3.type){
case ButtonBinding.ACTION_COMMAND:
var _ea4=_ea3.target;
switch(_ea4.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ea4.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ea5,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ea5,arg);
switch(_ea5){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ea7=arg;
if(this.node&&this.node.getEntityToken()==_ea7){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ea7);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ea7);
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
StageContainerBinding.prototype.handleBroadcast=function(_ea9,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ea9,arg);
var _eab=this.bindingWindow.WindowManager;
switch(_ea9){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_eab.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _eab.WINDOW_RESIZED_BROADCAST:
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
var _ead=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ead.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_eae){
if(StageBinding.isViewOpen(_eae)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_eae);
}else{
var _eaf=ViewDefinitions[_eae];
StageBinding.presentViewDefinition(_eaf);
}
};
StageBinding.isViewOpen=function(_eb0){
return StageBinding.bindingInstance._activeViewDefinitions[_eb0]!=null;
};
StageBinding.presentViewDefinition=function(_eb1){
if(_eb1.label!=null){
var _eb2=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_eb2,[_eb1.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_eb1);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_eb4,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _eb6=System.getPerspectiveNodes();
if(_eb6.hasEntries()){
this._initializeSystemViewDefinitions(_eb6);
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
var _eb8=null;
if(LocalStore.isEnabled){
_eb8=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_eb8&&ViewDefinitions[_eb8]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_eb8));
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
var _eba=root.getActionProfile();
if(_eba&&_eba.hasEntries()){
var _ebb=top.app.bindingMap.toolsmenugroup;
if(_ebb){
_eba.each(function(_ebc,list){
list.each(function(_ebe){
var item=MenuItemBinding.newInstance(_ebb.bindingDocument);
item.setLabel(_ebe.getLabel());
item.setToolTip(_ebe.getToolTip());
item.setImage(_ebe.getImage());
item.setDisabled(_ebe.isDisabled());
item.associatedSystemAction=_ebe;
var _ec0=_ebb;
var tag=_ebe.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ec0=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ec0.add(item);
});
});
_ebb.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ec2){
while(_ec2.hasNext()){
var node=_ec2.getNext();
var _ec4=node.getHandle();
ViewDefinitions[_ec4]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ec5){
StageBinding.superclass.handleAction.call(this,_ec5);
var _ec6=_ec5.target;
switch(_ec5.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ec6;
this._inflateBinding(_ec6);
_ec5.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ec6;
this._inflateBinding(_ec6);
_ec5.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ec6);
_ec5.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ec6 instanceof DockBinding){
switch(_ec6.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ec6.reference,_ec6);
break;
}
this.handleAttachedDock(_ec6);
_ec5.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ec6 instanceof DockBinding){
this.handleSelectedDockTab(_ec6.getSelectedTabBinding());
_ec5.consume();
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
_ec5.consume();
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
_ec5.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ec5);
};
StageBinding.prototype.handleBroadcast=function(_ec8,arg){
StageBinding.superclass.handleBroadcast.call(this,_ec8,arg);
switch(_ec8){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _eca=arg;
this._dontView(_eca);
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
StageBinding.prototype._showStart=function(_ecc){
if(_ecc!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ecf=this.bindingWindow.bindingMap.maindecks;
if(_ecc){
_ecf.select("startdeck");
view.show();
}else{
view.hide();
_ecf.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ecc;
}
};
StageBinding.prototype._inflateBinding=function(_ed0){
for(var _ed1 in ViewDefinitions){
var _ed2=ViewDefinitions[_ed1];
if(_ed2 instanceof SystemViewDefinition){
_ed0.mountDefinition(_ed2);
}
}
var _ed3=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ed3){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ed6=new StageCrawler();
_ed6.mode=mode;
_ed6.crawl(this.bindingElement);
_ed6.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ed7){
var _ed8=_ed7.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ed8);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ed8));
}
};
StageBinding.prototype.handleAttachedDock=function(_ed9){
var _eda=_ed9.getTabBindings();
if(_eda.hasEntries()){
while(_eda.hasNext()){
var _edb=_eda.getNext();
var _edc=_edb.getHandle();
if(_edc){
if(_edc=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _edd=ViewDefinitions[_edc];
if(_edd){
this._view(_ed9,_edb,_edd,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_edc+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ede){
var _edf=null;
var _ee0=false;
switch(_ede.position){
case Dialog.MODAL:
_edf=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_edf=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ede.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_edf=this._dockBindings.get(_ede.position);
break;
case DockBinding.EXTERNAL:
window.open(_ede.url);
_ee0=true;
break;
default:
var _ee1=this._decksBinding.getSelectedDeckBinding();
_edf=_ee1.getDockBindingByReference(_ede.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ee2=this.bindingWindow.bindingMap.maindecks;
_ee2.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ee0=true;
}
break;
}
if(!_ee0){
if(_edf!=null){
this._view(_edf,null,_ede,true);
}else{
throw "StageBinding: Could not position view: "+_ede.handle;
}
}
};
StageBinding.prototype._view=function(_ee3,_ee4,_ee5,_ee6){
var _ee7=_ee5.handle;
if(_ee5.isMutable){
_ee7+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ee7]){
var _ee8=ViewBinding.getInstance(_ee7);
if(_ee8!=null){
_ee8.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ee7);
}
}else{
this._activeViewDefinitions[_ee7]=_ee5;
Application.lock(this);
switch(_ee3.constructor){
case DockBinding:
if(_ee6){
_ee3.prepareNewView(_ee5);
}else{
_ee3.prepareOpenView(_ee5,_ee4);
}
break;
case StageDialogBinding:
if(_ee6){
_ee3.prepareNewView(_ee5);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ee9){
if(this._activeViewDefinitions[_ee9]!=null){
delete this._activeViewDefinitions[_ee9];
}else{
this.logger.debug("Could not unregister active view: "+_ee9);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_eea){
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
this.addFilter(function(_eec){
var _eed=UserInterface.getBinding(_eec);
var _eee=null;
if(_eed){
switch(_eed.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_eed.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_eed.handleUnMaximization();
break;
}
break;
case DockBinding:
_eee=NodeCrawler.SKIP_NODE;
break;
}
}
return _eee;
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
var _eef=null;
this._dialogs.each(function(_ef0){
if(!_ef0.isVisible){
_eef=_ef0;
}
return _eef!=null;
});
if(!_eef){
this._newInstance();
_eef=this._dialogs.getLast();
}
_eef.setModal(false);
return _eef;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _ef1=this.getInstance();
_ef1.setModal(true);
return _ef1;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _ef2=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_ef2);
_ef2.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ef3){
if(_ef3 instanceof DialogViewDefinition){
var _ef4=ViewBinding.newInstance(this.bindingDocument);
_ef4.setDefinition(_ef3);
_ef4.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ef3.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ef3.handler)){
this._dialogResponseHandler=_ef3.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ef4;
this._body.add(_ef4);
_ef4.attach();
_ef4.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ef5){
StageDialogBinding.superclass.handleAction.call(this,_ef5);
var _ef6=_ef5.target;
switch(_ef5.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ef6);
_ef5.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ef6.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ef5.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ef6.response){
this._handleDialogPageResponse(_ef6);
}
_ef5.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ef5.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ef5.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ef6.dispose();
_ef5.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ef5.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ef5.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ef5.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ef5.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ef5.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ef6==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ef7,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ef7,arg);
switch(_ef7){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_ef9){
var _efa=new FitnessCrawler();
var list=new List();
if(_ef9){
_efa.mode=FitnessCrawler.MODE_BRUTAL;
}
_efa.crawl(this.bindingElement,list);
_efa.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_efc){
_efc.fit(_ef9);
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
var _efd=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_efd){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_eff){
var cmd=_eff.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f01){
if(_f01.bindingDocument==this._viewBinding.getContentDocument()){
if(_f01 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f01);
}
this._pageBinding=_f01;
if(_f01.height=="auto"){
_f01.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f01);
_f01.enableAutoHeightLayoutMode(false);
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
if(_f01.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f01);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f02){
var _f03=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f03){
var _f04=UserInterface.getBinding(_f03);
_f04.setDisabled(_f02);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f05){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f05.response,_f05.result!=null?_f05.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f07){
if(_f07.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f07);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f09){
switch(_f09.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f09.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f09.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f0a){
var _f0b=_f0a.label;
var _f0c=_f0a.image;
var _f0d=_f0a.width;
var _f0e=_f0a.height;
var _f0f=_f0a.controls;
var _f10=_f0a.isResizable;
if(_f0b){
this.setLabel(_f0b);
}
if(_f0c){
this.setImage(_f0c);
}
if(_f0d||_f0e){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f0d?_f0d:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f0e!=null&&_f0e!="auto")?_f0e:old.h;
this.setDimension(nev);
}
if(_f0f){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f14=new List(_f0f.split(" "));
while((type=_f14.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f10!=this._isResizable){
this.setResizable(_f10);
}
if(_f0e=="auto"){
this._fixAutoHeight(_f0a);
}
if(_f0a==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f15){
var dim=this.getDimension();
var _f17=0;
var _f18=0;
if(_f15.isDialogSubPage){
_f15=this._pageBinding;
}
if(this._isFirstPage){
_f17=_f15.width!=null?_f15.width:dim.w;
}else{
_f17=dim.w;
}
_f18=_f15.bindingElement.offsetHeight;
_f18+=this._titlebar.bindingElement.offsetHeight;
_f18+=4;
if(_f18<dim.h){
_f18=dim.h;
}
if(_f15.minheight!=null){
if(_f18<_f15.minheight){
_f18=_f15.minheight;
}
}
this.setDimension(new Dimension(_f17,_f18));
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
StageDialogBinding.newInstance=function(_f1b){
var _f1c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f1b);
var _f1d=UserInterface.registerBinding(_f1c,StageDialogBinding);
_f1d.setProperty("controls","minimize maximize close");
return _f1d;
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
this.addFilter(function(_f1e,list){
var _f20=null;
var _f21=UserInterface.getBinding(_f1e);
if(!_f21.isVisible){
_f20=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f20;
});
this.addFilter(function(_f22,list){
var _f24=null;
var _f25=UserInterface.getBinding(_f22);
if(_f25.isAttached){
if(Interfaces.isImplemented(IFit,_f25)){
if(!_f25.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f25);
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
StageDecksBinding.prototype.mountDefinition=function(_f26){
var _f27=StageDeckBinding.newInstance(this.bindingDocument);
_f27.handle=_f26.handle;
_f27.perspectiveNode=_f26.node;
this._decks[_f27.handle]=_f27;
this.add(_f27);
_f27.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f28){
var _f29=this._decks[_f28];
StageBinding.perspectiveNode=_f29.perspectiveNode;
this.select(_f29);
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
StageDeckBinding.prototype.handleAction=function(_f2a){
StageDeckBinding.superclass.handleAction.call(this,_f2a);
var _f2b=_f2a.target;
switch(_f2a.type){
case WindowBinding.ACTION_LOADED:
if(_f2b==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f2a.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f2b instanceof DockBinding){
this._dockBindings.set(_f2b.reference,_f2b);
_f2b.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f2a.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f2a.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f2a);
StageDeckBinding.superclass.handleAction.call(this,_f2a);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f2d=new StageCrawler();
_f2d.mode=mode;
_f2d.crawl(this.windowBinding.getContentDocument().body);
_f2d.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f2e){
return this._dockBindings.get(_f2e);
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
StageDeckBinding.newInstance=function(_f30){
var _f31=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f30);
var _f32=UserInterface.registerBinding(_f31,StageDeckBinding);
return _f32;
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
StageSplitBoxBinding.prototype.handleAction=function(_f33){
StageSplitBoxBinding.superclass.handleAction.call(this,_f33);
StageBoxAbstraction.handleAction.call(this,_f33);
var _f34=_f33.target;
var _f35=null;
var _f36=null;
switch(_f33.type){
case DockBinding.ACTION_EMPTIED:
_f36=this.getChildBindingByLocalName("splitter");
if(_f36.isVisible){
_f36.hide();
}
_f35=this.getDescendantBindingsByLocalName("dock");
if(_f35.getFirst().isEmpty&&_f35.getLast().isEmpty){
if(_f35.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f33.consume();
break;
case DockBinding.ACTION_OPENED:
_f35=this.getDescendantBindingsByLocalName("dock");
if(!_f35.getFirst().isEmpty&&!_f35.getLast().isEmpty){
_f36=this.getChildBindingByLocalName("splitter");
if(!_f36.isVisible){
_f36.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f33.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f34!=this){
_f36=this.getChildBindingByLocalName("splitter");
if(_f36.isVisible){
_f36.hide();
}
this.invokeLayout();
_f33.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f34!=this){
var _f37=this.getChildBindingsByLocalName("splitpanel");
if(_f37.getFirst().isVisible&&_f37.getLast().isVisible){
_f36=this.getChildBindingByLocalName("splitter");
if(!_f36.isVisible){
_f36.show();
}
}
this.invokeLayout();
_f33.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f38){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f38);
switch(_f38.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f38.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f39=this.getChildBindingsByLocalName("splitpanel");
return _f39.getFirst().isVisible&&_f39.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f3a=this.getChildBindingsByLocalName("splitpanel");
return _f3a.getFirst().isFixed&&_f3a.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f3b){
StageSplitPanelBinding.superclass.handleAction.call(this,_f3b);
StageBoxAbstraction.handleAction.call(this,_f3b);
switch(_f3b.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f3b.type==StageSplitBoxBinding.ACTION_HIDE){
_f3b.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f3b.type==DockBinding.ACTION_EMPTIED){
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
if(_f3b.type==StageSplitBoxBinding.ACTION_SHOW){
_f3b.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f3e=_f3b.target;
if(_f3e!=this&&_f3e.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f3f=_f3e._containingSplitBoxBinding;
if(_f3f.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f40=_f3f.getChildBindingsByLocalName("splitpanel");
var _f41=_f40.getFirst();
var _f42=_f40.getLast();
if(this.isFixed==true){
if(!_f41.isFixed||!_f42.isFixed||(!_f3f.hasBothPanelsVisible()&&_f3e.isMinimizedForReal)){
this.setFix(false);
_f3b.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f3f.hasBothPanelsFixed()||(!_f3f.hasBothPanelsVisible()&&_f3e.isMinimizedForReal)){
this.setFix(_f3e.getContainedDock().getHeight());
_f3b.consume();
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
var _f43=this.getContainedDock();
if(_f43){
if(this.isMaximizePrepared==true){
}else{
_f43.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f44=this.getContainedDock();
if(_f44){
if(_f44.type==DockBinding.TYPE_EDITORS){
if(_f44.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f44.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f45=this.getContainedDock();
if(_f45){
_f45.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f45);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f46=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f47=this.getContainedDock();
if(_f47){
_f47.collapse(_f46);
if(!_f46){
this.setFix(_f47.getHeight());
}else{
this.setFix(_f47.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f47&&_f47.isActive){
_f47.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f47);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f48){
var _f49=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f4a=this.getContainedDock();
if(_f4a){
if(this.isMinimized==true){
_f4a.unCollapse(_f49);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f48){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f4a){
_f4a.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f4a);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f4b){
var _f4c=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f4c=false;
}
}
if(_f4c==true){
this._invisibilize(_f4b);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f4e){
if(_f4e!=this._isInvisibilized){
if(_f4e){
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
StageSplitterBinding.prototype.onDragStart=function(_f4f){
var _f50=top.app.bindingMap.stagesplittercover;
var _f51=this._containingSplitBoxBinding.getOrient();
switch(_f51){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f50.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f50.bindingElement.style.cursor="n-resize";
break;
}
_f50.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f51);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f57){
this._orient=_f57;
this.attachClassName(_f57);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f59=true;
var _f5a=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f5a=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f59=false;
break;
}
if(_f59){
this.bindingElement.style.left=pos.x+"px";
}
if(_f5a){
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
StageBoxAbstraction.handleAction=function(_f5c){
switch(_f5c.type){
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
if(_f5c.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f5c.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f5d=this.bindingElement.style;
_f5d.position="absolute";
_f5d.width="100%";
_f5d.height="100%";
_f5d.top="0";
_f5d.left="0";
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
var _f5e=this.bindingElement.style;
_f5e.position="relative";
_f5e.width="auto";
_f5e.height="auto";
_f5e.top="auto";
_f5e.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f5f,_f60){
var _f61=_f5f.bindingElement.style;
var _f62=_f5f.bindingElement.parentNode;
var box=_f5f._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f60){
_f5f._unmodifiedFlexMethod=_f5f.flex;
_f5f.flex=function(){
_f61.width=_f62.offsetWidth+"px";
_f61.height=_f62.offsetHeight+"px";
};
}else{
_f61.width="100%";
_f61.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f61.width="auto";
_f61.height="auto";
box.reflex(true);
},0);
}
_f5f.flex=_f5f._unmodifiedFlexMethod;
_f5f._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f64){
var _f65=_f64.target;
switch(_f64.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f65 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f64);
_f64.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f64.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f66){
var mode=null;
switch(_f66.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f68){
StageMenuBarBinding.superclass.handleAction.call(this,_f68);
switch(_f68.type){
case MenuItemBinding.ACTION_COMMAND:
var _f69=_f68.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f69){
SystemAction.invoke(_f69,this._rootNode);
}
}
_f68.consume();
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
var _f6a=this.getProperty("handle");
if(_f6a){
this._handle=_f6a;
if(StageBinding.isViewOpen(_f6a)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f6a);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f6c){
this.setProperty("handle",_f6c);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f6d,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f6d,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f6d){
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
StageViewMenuItemBinding.newInstance=function(_f6f){
var _f70=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f6f);
UserInterface.registerBinding(_f70,StageViewMenuItemBinding);
return UserInterface.getBinding(_f70);
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
StageStatusBarBinding.prototype.setLabel=function(_f71){
this._label.setLabel(_f71);
};
StageStatusBarBinding.prototype.setImage=function(_f72){
this._label.setImage(_f72);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f73){
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
var _f74=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f75=_f74.getAssociatedView();
var _f76=_f75.getContentWindow().bindingMap.tree;
var _f77=_f76.getFocusedTreeNodeBindings();
if(!_f77.hasEntries()&&StageBinding.treeSelector){
_f77=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f77;
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
ExplorerBinding.prototype.handleAction=function(_f78){
ExplorerBinding.superclass.handleAction.call(this,_f78);
var _f79=_f78.target;
switch(_f78.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f78.consume();
break;
case Binding.ACTION_DRAG:
if(_f79 instanceof ExplorerSplitterBinding){
_f79.dragger.registerHandler(this);
}
_f78.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f7b){
this._menuBinding.setSelectionByHandle(_f7b);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f7c){
if(_f7c instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f7c);
this._menuBinding.mountDefinition(_f7c);
}
};
ExplorerBinding.prototype.onDragStart=function(_f7d){
var _f7e=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f7e.hasEntries()){
var _f7f=_f7e.getFirst();
this._dragStart=_f7f.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f7f.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f83){
if(_f83 instanceof SystemViewDefinition){
var _f84=ViewBinding.newInstance(this.bindingDocument);
_f84.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f84.setDefinition(_f83);
var _f85=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f85.setAssociatedView(_f84);
this._decks[_f83.handle]=_f85;
_f85.add(_f84);
this.add(_f85);
function attach(){
_f85.attach();
_f84.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f86){
var _f87=this._decks[_f86];
this.select(_f87);
};
DecksBinding.prototype.expandBy=function(_f88){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f8a=this.bindingElement.offsetHeight+_f88;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f8a+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f8c){
var _f8d=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f8c);
return UserInterface.registerBinding(_f8d,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f8e){
this._viewBinding=_f8e;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f8f=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f90=this._viewBinding.getDefinition().label;
StatusBar.busy(_f8f,[_f90]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f91){
ExplorerDeckBinding.superclass.handleAction.call(this,_f91);
var _f92=_f91.target;
switch(_f91.type){
case PageBinding.ACTION_INITIALIZED:
if(_f92 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f92.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f93,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f93,arg);
switch(_f93){
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
var _f95=null;
if(this._isExplorerDeckBindingInitialized){
_f95=this._viewBinding.getDefinition().label;
}else{
_f95=DockTabBinding.LABEL_TABLOADING;
}
return _f95;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f96=null;
if(this._isExplorerDeckBindingInitialized){
_f96=this._viewBinding.getDefinition().image;
}else{
_f96=DockTabBinding.IMG_TABLOADING;
}
return _f96;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f97=null;
if(this._isExplorerDeckBindingInitialized){
_f97=this._viewBinding.getDefinition().toolTip;
}
return _f97;
};
ExplorerDeckBinding.newInstance=function(_f98){
var _f99=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f98);
return UserInterface.registerBinding(_f99,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f9a){
switch(_f9a.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f9a.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f9a.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f9a);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f9b){
this._maxButtons.set(_f9b.handle,this._mountMaxButton(_f9b));
this._minButtons.set(_f9b.handle,this._mountMinButton(_f9b));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f9c){
var _f9d=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f9d.setLabel(_f9c.label);
_f9d.setToolTip(_f9c.toolTip);
_f9d.handle=_f9c.handle;
_f9d.node=_f9c.node;
this._maxGroup.add(_f9d);
this._maxList.add(_f9d);
_f9d.attach();
return _f9d;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f9e){
var _f9f=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f9f.setLabel(_f9e.label);
_f9f.setToolTip(_f9e.label);
_f9f.handle=_f9e.handle;
_f9f.node=_f9e.node;
this._minGroup.addFirst(_f9f);
this._minList.add(_f9f);
_f9f.attach();
_f9f.hide();
return _f9f;
};
ExplorerMenuBinding.prototype.handleAction=function(_fa0){
ExplorerMenuBinding.superclass.handleAction.call(this,_fa0);
switch(_fa0.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fa1=_fa0.target;
var _fa2=_fa1.getCheckedButtonBinding();
var _fa3=_fa2.handle;
switch(_fa1){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fa3),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fa3),true);
break;
}
this._selectedHandle=_fa3;
this._selectedTag=_fa2.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fa0.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fa4){
var _fa5=this._maxButtons.get(_fa4);
if(_fa5){
_fa5.check();
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
var _fa6=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fa6=true;
}
return _fa6;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fa8=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fa8=true;
}
return _fa8;
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
ExplorerToolBarBinding.newInstance=function(_fa9){
var _faa=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fa9);
return UserInterface.registerBinding(_faa,ExplorerToolBarBinding);
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
var _fab=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fac=_fab?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fac);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fad,_fae){
var _faf=(_fae==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fb0=DOMUtil.createElementNS(Constants.NS_UI,_faf,_fad);
var _fb1=UserInterface.registerBinding(_fb0,ExplorerToolBarButtonBinding);
_fb1.explorerToolBarButtonType=_fae;
return _fb1;
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
EditorBinding.registerComponent=function(_fb2,_fb3){
var _fb4=EditorBinding._components;
var _fb5=EditorBinding._editors;
var key=_fb3.key;
var _fb7=Interfaces.isImplemented(IWysiwygEditorComponent,_fb2);
if(!_fb7){
_fb7=Interfaces.isImplemented(ISourceEditorComponent,_fb2);
}
if(_fb7){
if(_fb5.has(key)){
_fb5.get(key).initializeEditorComponent(_fb2);
}else{
if(!_fb4.has(key)){
_fb4.set(key,new List());
}
_fb4.get(key).add(_fb2);
}
}else{
throw "Editor component interface not implemented: "+_fb2;
}
};
EditorBinding.claimComponents=function(_fb8,_fb9){
var _fba=EditorBinding._components;
var _fbb=EditorBinding._editors;
var key=_fb9.key;
_fbb.set(key,_fb8);
var list=null;
if(_fba.has(key)){
list=_fba.get(key).copy();
_fba.del(key);
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
var _fbf=this.getProperty("value");
if(_fbf!=null){
_fbf=decodeURIComponent(_fbf);
this._startContent=_fbf;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fc1=this.bindingWindow.DataManager;
_fc1.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fc3){
var _fc4=EditorBinding.claimComponents(this,_fc3);
if(_fc4!=null){
while(_fc4.hasNext()){
this.initializeEditorComponent(_fc4.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fc6=this.bindingWindow.DataManager;
if(_fc6.getDataBinding(name)){
_fc6.unRegisterDataBinding(name);
}
_fc6.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fc7=this.getEditorDocument();
if(_fc7!=null){
Application.framework(_fc7);
DOMEvents.addEventListener(_fc7,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fc7,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fc7,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fc7,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fc9){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fc9==true){
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
var _fcb=this.getCheckSum();
if(_fcb!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fcb;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fcc=null;
if(Binding.exists(this._pageBinding)){
_fcc=this._pageBinding.getCheckSum(this._checksum);
}
return _fcc;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fce=DOMEvents.getTarget(e);
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
if(_fce.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fd0,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fd0,arg);
var _fd2=null;
switch(_fd0){
case BroadcastMessages.STAGEDIALOG_OPENED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _fd3=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fd3=false;
}
}
}else{
_fd2=DOMEvents.getTarget(arg);
if(_fd2&&_fd2.ownerDocument==this.getEditorDocument()){
_fd3=false;
}
}
if(_fd3){
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
EditorBinding.prototype._activateEditor=function(_fd4){
if(_fd4!=this._isActivated){
this._isActivated=_fd4;
EditorBinding.isActive=_fd4;
var _fd5=this.getEditorWindow().standardEventHandler;
var _fd6=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fd6!=null){
if(_fd4){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fd6.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fd5.enableNativeKeys(true);
}else{
_fd6.disable();
_fd5.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fd7=this.getEditorDocument().selection.createRange();
_fd7.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fd8=false;
try{
if(!Client.isExplorer){
var _fd9=this.getEditorWindow().getSelection();
if(_fd9!=null){
_fd8=_fd9.toString().length>0;
if(!_fd8){
var _fda=_fd9.getRangeAt(0);
var frag=_fda.cloneContents();
var _fdc=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fdc.appendChild(frag.firstChild);
}
var img=_fdc.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fd8=true;
}
}
}
}
}else{
var _fda=this.getEditorDocument().selection.createRange();
_fd8=(_fda&&_fda.text)&&_fda.text.length>0;
if(_fda.commonParentElement&&VisualEditorBinding.isImageElement(_fda.commonParentElement())){
_fd8=true;
}
}
}
catch(exception){
}
return _fd8;
};
EditorBinding.prototype.isCommandEnabled=function(_fde){
var _fdf=true;
switch(_fde){
case "Cut":
case "Copy":
case "Paste":
_fdf=this.getEditorDocument().queryCommandEnabled(_fde);
break;
}
return _fdf;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fe3=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fe4=null;
if(cmd=="Paste"){
_fe4=null;
}else{
_fe4=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fe4);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fe3=true;
}
break;
}
return _fe3;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fe6=this.getContentWindow().bindingMap.toolbar;
var _fe7=_fe6.getButtonForCommand(cmd);
if(!_fe7){
throw "No button for command "+cmd;
}
return _fe7;
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
var _fea=this.getContentDocument().getElementById("focusableinput");
if(_fea!=null){
_fea.style.display="block";
FocusBinding.focusElement(_fea);
_fea.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_feb){
EditorBinding.superclass.handleAction.call(this,_feb);
var _fec=_feb.target;
var self=this;
var _fee=this.shadowTree.iframe;
switch(_feb.type){
case Binding.ACTION_DIRTY:
if(_feb.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fef){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fef);
};
EditorBinding.prototype.handleElement=function(_ff0){
return true;
};
EditorBinding.prototype.updateElement=function(_ff1){
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
var _ff4=this._menuGroups[rel];
if(_ff4 instanceof List){
_ff4.each(function(_ff5){
_ff5.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _ff7=this._menuGroups[rel];
if(_ff7 instanceof List){
_ff7.each(function(_ff8){
_ff8.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_ff9){
EditorPopupBinding.superclass.handleAction.call(this,_ff9);
var _ffa=_ff9.target;
if(_ff9.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_ffa.getProperty("cmd");
var gui=_ffa.getProperty("gui");
var val=_ffa.getProperty("val");
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
var _ffe=this.bindingWindow.bindingMap.tinywindow;
var _fff=this.bindingWindow.bindingMap.codepresswindow;
if(_ffe){
EditorBinding.registerComponent(this,_ffe);
}else{
if(_fff){
EditorBinding.registerComponent(this,_fff);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1000,_1001,_1002,theme){
this._editorBinding=_1000;
this._tinyEngine=_1001;
this._tinyInstance=_1002;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1004,frame,_1006){
this._editorBinding=_1004;
this._codePressFrame=frame;
this._codePressEngine=_1006;
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
var _1009=this._editorBinding;
if(_1009!=null){
var self=this;
var _100b={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1009.hasBookmark()){
_1009.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1009.hasBookmark()){
_1009.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_100b);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_100b);
}
};
EditorClickButtonBinding.newInstance=function(_100d){
var _100e=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_100d);
return UserInterface.registerBinding(_100e,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_100f){
var _1010=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_100f);
return UserInterface.registerBinding(_1010,EditorToolBarButtonBinding);
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
var _1011=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1011);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_1012,_1013,_1014,theme){
this._editorBinding=_1012;
this._tinyEngine=_1013;
this._tinyInstance=_1014;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1016){
EditorSelectorBinding.superclass.handleAction.call(this,_1016);
switch(_1016.type){
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
EditorMenuItemBinding.newInstance=function(_101a){
var _101b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_101a);
return UserInterface.registerBinding(_101b,EditorMenuItemBinding);
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
VisualEditorBinding.XHTML="<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<head>${head}</head>\n\t<body>\n${body}\n\t</body>\n</html>";
VisualEditorBinding.getTinyLessClassName=function(_101c){
var i=0,_101e,_101f=[],split=_101c.split(" ");
while((_101e=split[i++])!=null){
if(_101e.length>=3&&_101e.substring(0,3)=="mce"){
continue;
}else{
if(_101e.length>=14&&_101e.substring(0,14)=="compositemedia"){
continue;
}
}
_101f.push(_101e);
}
return _101f.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1021){
var _1022=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1021);
if(soap instanceof SOAPFault){
}else{
_1022=soap.XhtmlFragment;
if(!_1022){
_1022="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1022;
};
VisualEditorBinding.getTinyContent=function(_1024,_1025){
var _1026=null;
if(_1024==null||_1024==""){
_1024=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_1024);
if(soap instanceof SOAPFault){
var _1028=soap;
var _1029={handleDialogResponse:function(){
_1025.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1029,_1028);
}else{
_1026=soap.XhtmlFragment;
if(_1026==null){
_1026=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1026;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _102c=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _102e=new List(doc.documentElement.childNodes);
var _102f=new List();
_102e.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_102f.add(child);
}
});
var _1031=_102f.get(index);
if(_1031==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_1031.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_1031.hasChildNodes()){
frag.appendChild(_1031.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_102c=DOMSerializer.serialize(doc.documentElement);
_102c=_102c.substring(_102c.indexOf(">")+1,_102c.length);
_102c=_102c.substring(0,_102c.lastIndexOf("<"));
}
}
}
if(_102c==null){
_102c=new String("");
}
return _102c;
};
VisualEditorBinding.isImage=function(_1033){
result=_1033&&_1033.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_1034){
return VisualEditorBinding.isImage(_1034)&&!VisualEditorBinding.isReservedElement(_1034);
};
VisualEditorBinding.isReservedElement=function(_1035){
if(VisualEditorBinding.isFunctionElement(_1035)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1035)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1035)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1036){
return VisualEditorBinding.isImage(_1036)&&CSSUtil.hasClassName(_1036,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1037){
return VisualEditorBinding.isImage(_1037)&&CSSUtil.hasClassName(_1037,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1038){
return VisualEditorBinding.isImage(_1038)&&CSSUtil.hasClassName(_1038,VisualEditorBinding.HTML_CLASSNAME);
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
var _1039=this.getProperty("embedablefieldstypenames");
if(_1039!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1039);
}
var _103a=this.getProperty("formattingconfiguration");
if(_103a!=null){
this._url+="?config="+_103a;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_103b,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_103b,arg);
var _103d=this.getContentWindow().bindingMap.tinywindow;
var _103e=_103d.getContentWindow();
switch(_103b){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_103e){
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
this.initializeEditorComponents(_103d);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_103f){
_103f.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1040){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1040);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_1043){
var _1044=_1043;
if(!this._isNormalizedDocument(_1043)){
_1044=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_1043);
}
return _1044;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1045){
var _1046=false;
var doc=XMLParser.parse(_1045,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1046=true;
}
}
if(Client.isWebKit){
if(_1045.indexOf("<html")!==0){
_1046=false;
}
}
return _1046;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _104b=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_104b){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_104b=true;
}
return _104b;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _104d=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_104d);
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
VisualEditorBinding.prototype.setResult=function(_104f){
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
VisualEditorPopupBinding.prototype.configure=function(_1050,_1051,_1052){
var _1053=this.editorBinding.hasSelection();
this.tinyInstance=_1050;
this.tinyEngine=_1051;
this.tinyElement=_1052;
this.hasSelection=_1053;
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
var _1057=false;
if(this.hasSelection){
_1057=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1057=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1057=true;
}
}
}
}
if(_1057){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1058=this.getMenuItemForCommand("compositeInsertLink");
var _1059=this.getMenuItemForCommand("unlink");
var _105a=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _105b=this.editorBinding.getButtonForCommand("unlink");
_1059.setDisabled(_105b.isDisabled);
if(_1059.isDisabled){
_1058.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1058.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _105c=this.editorBinding.embedableFieldConfiguration;
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
if(_105c){
var _105f=_105c.getGroupNames();
if(_105f.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_105f.each(function(_1063){
var _1064=_105c.getFieldNames(_1063);
_1064.each(function(_1065){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1065);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1063+":"+_1065);
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
var _1067=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1068=null;
var _1069=null;
if(_1067){
if(_1067.nodeName=="TD"){
_1068=_1067.getAttribute("colspan");
_1069=_1067.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1068=="1"&&_1069=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1067){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_106a){
var _106b=VisualEditorFormattingConfiguration._configurations;
if(!_106b.has(_106a)){
_106b.set(_106a,new VisualEditorFormattingConfiguration());
}
return _106b.get(_106a);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_106d){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_106e){
var _106f=null;
var _1070=VisualEditorFieldGroupConfiguration._configurations;
if(!_1070.has(_106e)){
_1070.set(_106e,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_106e)));
}
return _1070.get(_106e);
};
function VisualEditorFieldGroupConfiguration(_1071){
var _1072=new Map();
new List(_1071).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1072.set(group.GroupName,map);
});
this._groups=_1072;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1076){
return this._groups.get(_1076).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1077,_1078){
return this._groups.get(_1077).get(_1078).xhtml;
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
var _107a=this.getDescendantElementsByLocalName("textarea");
while(_107a.hasNext()){
var _107b=_107a.getNext();
if(_107b.getAttribute("selected")=="true"){
this._startContent=_107b.value;
this._textareaname=_107b.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _107d=this.getContentWindow().bindingMap.templatetree;
_107d.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_107e){
var _107f=_107d.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_107f.textareaname);
_107e.consume();
}});
_107d.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1080){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1081=this.getContentWindow().bindingMap.toolsplitter;
_1081.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1082=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1082.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1082);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1083){
this._textareas=new Map();
while(_1083.hasNext()){
var _1084=_1083.getNext();
var _1085=_1084.getAttribute("placeholderid");
this._textareas.set(_1085,{placeholderid:_1085,placeholdername:_1084.getAttribute("placeholdername"),placeholdermarkup:_1084.value,textareaelement:_1084,isSelected:_1084.getAttribute("selected")=="true"});
}
var _1086=new Map();
this._textareas.each(function(name,_1088){
var _1089=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1089.setLabel(_1088.placeholdername);
_1089.setImage("${icon:placeholder}");
_1089.setProperty("placeholder",true);
_1089.textareaname=name;
_1086.set(_1088.placeholdername,_1089);
if(_1088.isSelected){
selected=_1089;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _108a=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_108a.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _108b=this.getContentWindow().bindingMap.templatetree;
var _108c=_108b.add(TreeNodeBinding.newInstance(_108b.bindingDocument));
_108c.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_108c.setImage("${icon:warning}");
_108c.attach();
var _108d=this.getContentWindow().bindingMap.statusbar;
_108d.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _108f=this._textareas.get(name);
var _1090=_108f.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1090));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1091){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1091;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1092=this.getContentWindow().bindingMap.statusbar;
_1092.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1091);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1095="";
if(this._heads.has(this._textareaname)){
_1095=this._heads.get(this._textareaname);
if(_1095==null){
_1095=new String("");
}
}
return _1095;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1097){
_1097.textareaelement.value=_1097.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1098,_1099){
var _109a=_1098.getElementsByTagName("div").item(0);
var _109b=_1099.getElementsByTagName("div").item(0);
var _109c=new List(_109a.getElementsByTagName("textarea"));
var _109d=new List(_109b.getElementsByTagName("textarea"));
var _109e=false;
if(_109c.getLength()!=_109d.getLength()){
_109e=true;
}else{
var index=0;
_109c.each(function(_10a0,index){
var _10a2=_109d.get(index);
var newid=_10a0.getAttribute("placeholderid");
var oldid=_10a2.getAttribute("placeholderid");
var _10a5=_10a0.getAttribute("placeholdername");
var _10a6=_10a2.getAttribute("placeholdername");
if(newid!=oldid||_10a5!=_10a6){
_109e=true;
}
return !_109e;
});
}
if(_109e){
var html=null;
if(_109a.innerHTML!=null){
html=_109a.innerHTML;
}else{
html=DOMSerializer.serialize(_109a);
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
var _10aa=this.getDescendantBindingByLocalName("selector");
_10aa.attach();
this._populateTemplateSelector();
var _10ab=this.getContentWindow().bindingMap.templateselector;
_10ab.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10ac=this.getDescendantBindingByLocalName("selector");
var _10ad=this.getContentWindow().bindingMap.templateselector;
_10ac.selections.each(function(_10ae){
_10ae.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10ad.populateFromList(_10ac.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10af=this.getDescendantBindingByLocalName("selector");
var _10b0=this.getContentWindow().bindingMap.templateselector;
_10af.selectByValue(_10b0.getValue());
_10af.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10b1){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10b6,_10b7){
var _10b8=_10b7;
if(old.has(_10b6)){
_10b8=old.get(_10b6).placeholdermarkup;
}
return _10b8;
}
while(_10b1.hasNext()){
var _10b9=_10b1.getNext();
var _10ba=_10b9.getAttribute("placeholderid");
this._textareas.set(_10ba,{placeholderid:_10ba,placeholdername:_10b9.getAttribute("placeholdername"),placeholdermarkup:compute(_10ba,_10b9.value),textareaelement:_10b9,isSelected:_10b9.getAttribute("selected")=="true"});
}
var _10bb=null;
var _10bc=this.getContentWindow().bindingMap.templatetree;
var _10bd=new Map();
this._textareas.each(function(name,_10bf){
var _10c0=_10bc.add(TreeNodeBinding.newInstance(_10bc.bindingDocument));
_10c0.setLabel(_10bf.placeholdername);
_10c0.setImage("${icon:placeholder}");
_10c0.setProperty("placeholder",true);
_10c0.textareaname=name;
_10bd.set(_10bf.placeholdername,_10c0);
if(_10bf.isSelected){
_10bb=_10c0;
}
});
_10bc.attachRecursive();
if(_10bb!=null){
var _10c1=true;
if(this._oldtextareas.hasEntries()){
_10c1=false;
var map=new Map();
this._textareas.each(function(id,_10c4){
map.set(_10c4.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10c1=true;
}
}
if(_10c1){
var _10c5=this._textareas.get(_10bb.textareaname);
this._textareaname=_10bb.textareaname;
this._placeholdername=_10c5.placeholdername;
this._setContentFromPlaceHolder(_10bb.textareaname);
_10bb.focus();
}else{
var _10c6=_10bd.get(this._placeholdername);
this._textareaname=_10c6.textareaname;
_10c6.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10c7,_10c8){
var _10c9=_10c7.getElementsByTagName("ui:selector").item(0);
var _10ca=_10c8.getElementsByTagName("ui:selector").item(0);
var _10cb=false;
if(_10c9!=null&&_10ca!=null){
var _10cc=new List(_10c9.getElementsByTagName("ui:selection"));
var _10cd=new List(_10ca.getElementsByTagName("ui:selection"));
if(_10cc.getLength()!=_10cd.getLength()){
_10cb=true;
}else{
_10cc.each(function(_10ce,index){
var _10d0=_10ce.getAttribute("value");
var _10d1=_10cd.get(index).getAttribute("value");
if(_10d0!=_10d1){
_10cb=true;
}
return !_10cb;
});
}
}
if(_10cb){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10c9);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10c7,_10c8);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10d3,frame,_10d5){
this._editorBinding=_10d3;
this._codePressFrame=frame;
this._codePressEngine=_10d5;
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
var _10db=this.getProperty("validate");
if(_10db==true){
this._hasStrictValidation=true;
}
var _10dc=this.getProperty("validator");
if(_10dc!=null){
this._validator=_10dc;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10dd,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10dd,arg);
switch(_10dd){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10df=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10df!=null){
var _10e0=_10df.getContentWindow();
if(arg.broadcastWindow==_10e0){
this._codemirrorWindow=_10e0;
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
this.initializeEditorComponents(_10df);
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
this.unsubscribe(_10dd);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10e4){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10e4);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10e5){
if(_10e5!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10e5;
EditorBinding.isActive=_10e5;
var _10e6=this.getContentWindow().standardEventHandler;
if(_10e5){
_10e6.enableNativeKeys(true);
}else{
_10e6.disableNativeKeys();
}
var _10e7=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10e7!=null){
if(_10e5){
_10e7.enable();
}else{
_10e7.disable();
}
}
if(_10e5){
this.focus();
var _10e8=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10ec=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10ec;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10ed){
_10ed.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10ef){
if(!this._isFinalized){
if(_10ef!=this._startContent){
this._startContent=_10ef;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10ef);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10f0=this.getContentWindow().bindingMap.editorpage.getContent();
return _10f0?_10f0:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_10f1){
if(this._pageBinding!=null){
this._pageBinding.cover(_10f1);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10f2){
if(_10f2!=null&&this.shadowTree.dotnetinput!=null){
var value=_10f2.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10f4=true;
var _10f5=this.getContent();
if(this._validator!=null){
_10f4=Validator.validateInformed(_10f5,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
newSource=_10f5.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
if(newSource!=_10f5){
_10f5=newSource;
this.setContent(newSource);
}
_10f4=XMLParser.isWellFormedDocument(_10f5,true);
if(_10f4==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10f4=this._isValidHTML(_10f5);
break;
}
}
break;
}
}
return _10f4;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10f7=true;
var doc=XMLParser.parse(xml);
var _10f9=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10f9.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10f9.add("NamespaceURI");
}
var head=null,body=null;
var _10fd=new List(root.childNodes);
while(_10fd.hasNext()){
var child=_10fd.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10f9.add("MultipleHead");
}
if(body!=null){
_10f9.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10f9.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10f9.add("MissingHead");
}
if(body==null){
_10f9.add("MissingBody");
}
}
if(_10f9.hasEntries()){
_10f7=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f9.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f9.getFirst()));
}
}
return _10f7;
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
var _10ff=null;
var page=this._pageBinding;
if(page!=null){
_10ff=page.getCheckSum();
}
return _10ff;
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
ThrobberBinding.prototype.handleBroadcast=function(_1101,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1101,arg);
switch(_1101){
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
ProgressBarBinding.notch=function(_1104){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1104);
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
ProgressBarBinding.prototype.notch=function(_1106){
_1106=_1106?_1106:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1106);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1108,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1108,arg);
switch(_1108){
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
StartMenuItemBinding.prototype.setChecked=function(_110a,_110b){
StartMenuItemBinding.superclass.setChecked.call(this,_110a,_110b);
if(!_110b){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_110c){
var _110d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_110c);
UserInterface.registerBinding(_110d,StartMenuItemBinding);
return UserInterface.getBinding(_110d);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1110,_1111){
var _1112=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1111,true)==true){
if(_1110!="*"){
_1110=KeySetBinding._sanitizeKeyModifiers(_1110);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1112[doc]){
_1112[doc]={};
}
if(!_1112[doc][code]){
_1112[doc][code]={};
}
_1112[doc][code][_1110]=_1111;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1116=false;
var code=e.keyCode;
var _1118=KeySetBinding.keyEventHandlers;
if(_1118[doc]&&_1118[doc][code]){
var _1119="[default]";
_1119+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1119+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _111a=_1118[doc][code][_1119];
if(_111a==null){
_111a=_1118[doc][code]["*"];
}
if(_111a!=null){
_111a.handleKeyEvent(e);
_1116=true;
}
}
return _1116;
};
KeySetBinding._sanitizeKeyModifiers=function(_111b){
var _111c="[default]";
var mods={};
if(_111b){
new List(_111b.split(" ")).each(function(_111e){
mods[_111e]=true;
});
function check(_111f){
if(mods[_111f]){
_111c+=" "+_111f;
}
}
check("shift");
check("control");
}
return _111c;
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
var _1123=key.getAttribute("oncommand");
var _1124=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1124){
DOMEvents.preventDefault(e);
}
var _1126=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1123,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1127){
if(_1127 instanceof CursorBinding){
_1127.setOpacity(0);
_1127.show();
new Animation({modifier:9,onstep:function(_1128){
_1127.setOpacity(Math.sin(_1128*Math.PI/180));
},onstop:function(){
_1127.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1129){
if(_1129 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_112a){
_1129.setOpacity(Math.cos(_112a*Math.PI/180));
},onstop:function(){
_1129.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_112b,_112c,_112d){
if(_112b instanceof CursorBinding){
_112d.x-=16;
_112d.y-=16;
new Animation({modifier:3,onstep:function(_112e){
var tal=Math.sin(_112e*Math.PI/180);
_112b.setPosition(new Point(((1-tal)*_112c.x)+((0+tal)*_112d.x),((1-tal)*_112c.y)+((0+tal)*_112d.y)));
},onstop:function(){
CursorBinding.fadeOut(_112b);
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
CursorBinding.prototype.setOpacity=function(_1134){
this.bindingElement.style.opacity=new String(_1134);
this._opacity=_1134;
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
function setOpacity(_1137){
cover.bindingElement.style.opacity=new String(_1137);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1138){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1138*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_113a){
cover.bindingElement.style.MozOpacity=new String(_113a);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_113b){
if(Binding.exists(cover)){
setOpacity(Math.sin(_113b*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_113d){
if(_113d!=this._isBusy){
if(_113d){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_113d;
}
};
CoverBinding.prototype.setTransparent=function(_113e){
if(_113e!=this._isTransparent){
if(_113e){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_113e;
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
CoverBinding.prototype.setHeight=function(_1140){
if(_1140>=0){
this.bindingElement.style.height=new String(_1140+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1141){
var _1142=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1141);
return UserInterface.registerBinding(_1142,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1144=UncoverBinding._bindingInstance;
if(Binding.exists(_1144)){
_1144.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1148){
this._isFading=_1148==true;
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
var _1149=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1149.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1149.clearRect(0,0,300,150);
_1149.fillRect(0,0,300,150);
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
var _114b=this._canvas.getContext("2d");
_114b.clearRect(0,0,300,150);
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
var _114c=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_114c);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _114d=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_114d){
this._startcontent=_114d.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_114e){
SourceCodeViewerBinding.superclass.handleAction.call(this,_114e);
switch(_114e.type){
case WindowBinding.ACTION_ONLOAD:
if(_114e.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_114e.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_114e);
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
var _1152=this._transformer.transformToString(doc);
this._inject(_1152);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1155){
this.getContentDocument().body.innerHTML=_1155;
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
var _115d=list.getNext();
var id=_115d.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_115d);
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
var _1167=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1167.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1167.appendChild(att);
}
elm.appendChild(_1167);
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
var _1171=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1171){
doc=XMLParser.parse(_1171);
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
var _1175=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1175;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1176,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1176,arg);
switch(_1176){
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
var _1179=new List();
list.each(function(lang){
_1179.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1179);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_117d){
switch(_117d){
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
var _1180=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1180,root);
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
var _1181=this.getProperty("status");
if(_1181!=null){
switch(_1181){
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
UserInterfaceMapping.prototype.merge=function(_1185){
for(var _1186 in _1185.map){
this.map[_1186]=_1185.getBindingImplementation(_1186);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1187){
var _1188=null;
var name=_1187.nodeName.toLowerCase();
if(this.map[name]){
_1188=this.map[name];
}
return _1188;
};
var UserInterface=new function(){
var _118a=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _118b=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_118a,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _118c=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_118e,impl){
var _1190=null;
if(!this.hasBinding(_118e)){
var _1191=DOMUtil.getParentWindow(_118e);
if(DOMUtil.getLocalName(_118e)!="bindingmapping"){
if(!impl&&_118e.getAttribute("binding")!=null){
var _1192=_118e.getAttribute("binding");
impl=_1191[_1192];
if(impl==null){
throw "No such binding in scope: "+_1192;
}
}
if(!impl){
var _1193=_1191.DocumentManager;
if(_1193){
var _1194=_1193.customUserInterfaceMapping;
if(_1194){
impl=_1194.getBindingImplementation(_118e);
}
}
}
if(!impl){
impl=_118b.getBindingImplementation(_118e);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1190=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1190){
var key=KeyMaster.getUniqueKey();
_118e.setAttribute("key",key);
_1190.key=key;
if(!_118e.id){
_118e.id=key;
}
keys[key]={element:_118e,binding:_1190};
_1190.onBindingRegister();
}
}
}
return _1190;
};
this.unRegisterBinding=function(_1196){
terminate(_1196);
};
function terminate(_1197){
if(Binding.exists(_1197)==true){
var key=_1197.key;
Binding.destroy(_1197);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1197=null;
}else{
_118c.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1199){
var _119a=null;
if(keys[_1199.key]){
_119a=keys[_1199.key].element;
}
return _119a;
};
this.getBinding=function(_119b){
var _119c=null;
if(_119b&&_119b.nodeType==Node.ELEMENT_NODE){
try{
var key=_119b.getAttribute("key");
if(key&&keys[key]){
_119c=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_119b);
if(exception.stack){
alert(exception.stack);
}
}
}
return _119c;
};
this.getBindingByKey=function(key){
var _119f=null;
if(keys[key]){
_119f=keys[key].binding;
}
return _119f;
};
this.hasBinding=function(_11a0){
return this.getBinding(_11a0)!=null;
};
this.isBindingVisible=function(_11a1){
var _11a2=Application.isOperational;
if(_11a2==true){
var _11a3=new Crawler();
_11a3.type=NodeCrawler.TYPE_ASCENDING;
_11a3.id="visibilitycrawler";
_11a3.addFilter(function(_11a4){
var b=UserInterface.getBinding(_11a4);
var res=0;
if(!b.isVisible){
_11a2=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11a3.crawl(_11a1.bindingElement);
_11a3.dispose();
}
return _11a2;
};
var _11a7=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11a7={};
for(var key in keys){
_11a7[key]=true;
}
};
this.getPoint=function(){
var _11ab=null;
if(_11a7){
_11ab=new List();
for(var key in keys){
if(!_11a7[key]){
_11ab.add(key);
}
}
}
return _11ab;
};
this.clearPoint=function(){
_11a7=null;
};
this.trackUndisposedBindings=function(){
var _11ad=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11ad){
_11ad="Bindings illdisposed: ";
}
_11ad+=entry.binding+" ";
}
}
if(_11ad!=null){
_118c.error(_11ad);
}
};
this.autoTrackDisposedBindings=function(_11b0){
if(_11b0){
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
SOAPRequest.newInstance=function(_11b1,_11b2){
var _11b3=_11b1+"/"+_11b2;
var _11b4=new SOAPRequest(_11b3);
var _11b5=SOAPRequest.resolver;
_11b4.document=Templates.getTemplateDocument("soapenvelope.xml");
_11b4.envelope=_11b5.resolve("soap:Envelope",_11b4.document);
_11b4.header=_11b5.resolve("soap:Header",_11b4.envelope);
_11b4.body=_11b5.resolve("soap:Body",_11b4.envelope);
return _11b4;
};
SOAPRequest._parseResponse=function(_11b6){
var _11b7=null;
var _11b8=false;
var doc=_11b6.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11b7=SOAPRequestResponse.newInstance(_11b6.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11b6.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11b8=true;
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
var text=_11b6.responseText;
if(_11b6.status==503||text.indexOf("id=\"offline\"")>-1){
_11b8=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11b6.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11b6.responseText);
}
}
}
}
if(_11b8==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11b7;
};
function SOAPRequest(_11bd){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11bd;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11bf=DOMUtil.getXMLHTTPRequest();
var _11c0=null;
_11bf.open("post",url,false);
_11bf.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11bf.setRequestHeader("SOAPAction",this.action);
try{
_11bf.send(this.document);
_11c0=SOAPRequest._parseResponse(_11bf);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11bf=null;
return _11c0;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11c3){
var _11c4=DOMUtil.getXMLHTTPRequest();
_11c4.open("post",url,true);
_11c4.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11c4.setRequestHeader("SOAPAction",this.action);
_11c4.onreadystatechange=function(){
if(_11c4.readyState==4){
var _11c5=SOAPRequest._parseResponse(_11c4);
_11c3(_11c5);
_11c4=null;
}
};
_11c4.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11c6 in this){
this[_11c6]=null;
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
var _11c8=null;
if(doc&&doc.documentElement){
_11c8=new SOAPRequestResponse();
var _11c9=SOAPRequestResponse.resolver;
_11c8.document=doc;
_11c8.envelope=_11c9.resolve("soap:Envelope",_11c8.document);
_11c8.header=_11c9.resolve("soap:Header",_11c8.envelope);
_11c8.body=_11c9.resolve("soap:Body",_11c8.envelope);
var fault=_11c9.resolve("soap:Fault",_11c8.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11c8.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11c9.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11c9.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11c8;
};
function SOAPFault(_11cb,_11cc,_11cd){
this._operationName=_11cb;
this._operationAddress=_11cc;
this._faultString=_11cd;
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
SOAPFault.newInstance=function(_11ce,fault){
return new SOAPFault(_11ce.name,_11ce.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11d1){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11d1;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11d3=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11d3.body,this._operation);
var _11d5=this._wsdl.getSchema();
var _11d6=_11d5.lookup(this._operation);
var _11d7=_11d6.getListedDefinitions();
while(_11d7.hasNext()){
var def=_11d7.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11d3;
};
SOAPEncoder.prototype._resolve=function(_11db,_11dc,value){
var _11de=this._wsdl.getSchema();
if(_11dc.isSimpleValue){
this._appendText(_11db,value,_11dc.type=="string");
}else{
var _11df=_11de.lookup(_11dc.type);
if(_11df instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11df.getListedDefinitions();
if(_11df.isArray){
var _11e1=new List(value);
var def=defs.getNext();
while(_11e1.hasNext()){
var elm=this._appendElement(_11db,def.name);
var val=_11e1.getNext();
this._resolve(elm,def,val);
}
}else{
if(typeof value==="undefined"){
this.logger.error("SOAPEncoder: value is undefined");
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11db,def.name);
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
SOAPEncoder.prototype._appendText=function(_11e8,value,_11ea){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11ed=false;
var i=0,c;
while(c=chars[i++]){
var _11f0=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11f0=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11f0=false;
}
break;
}
if(!_11f0){
safe+=c;
}else{
_11ed=true;
}
}
if(_11ed){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11e8.appendChild(_11e8.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11f3){
this._wsdl=wsdl;
this._operation=_11f3;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11f8){
var _11f9=null;
var _11fa=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11fc=this.resolve(id,_11f8.body);
var _11fd=_11fa.lookup(id);
var _11fe=_11fd.getListedDefinitions();
while(!_11f9&&_11fe.hasNext()){
var def=_11fe.getNext();
var elm=this.resolve(def.name,_11fc);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11f9=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11f9.importNode!=Types.UNDEFINED){
_11f9.appendChild(_11f9.importNode(e,true));
}else{
_11f9.loadXML(DOMSerializer.serialize(e));
}
}else{
_11f9=this._compute(elm,def);
}
}
return _11f9;
};
SOAPDecoder.prototype._compute=function(_1202,_1203){
var _1204=null;
var _1205=this._wsdl.getSchema();
if(_1203.isSimpleValue){
_1204=this._getSimpleValue(_1202,_1203.type);
}else{
var _1206=_1205.lookup(_1203.type);
if(_1206 instanceof SchemaSimpleType){
_1204=this._getSimpleValue(_1202,_1206.restrictionType);
}else{
var defs=_1206.getListedDefinitions();
if(_1206.isArray){
_1204=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1202);
while(elms.hasNext()){
var elm=elms.getNext();
_1204.push(this._compute(elm,def));
}
}else{
_1204={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1202);
if(elm){
_1204[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1204;
};
SOAPDecoder.prototype._getSimpleValue=function(_120b,type){
var _120d=null;
if(_120b!=null&&_120b.firstChild&&_120b.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_120b.childNodes.length>1){
_120b.normalize();
}
_120d=_120b.firstChild.data;
switch(type){
case Schema.types.STRING:
_120d=_120d;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_120d=Number(_120d);
break;
case Schema.types.BOOLEAN:
_120d=_120d=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _120d;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_120e){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_120e);
}
Schema.prototype._parseSchema=function(_120f){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1210={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_120f);
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
_1210[rule.getAttribute("name")]=entry;
}
return _1210;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1215){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1215);
}
SchemaDefinition.prototype._parse=function(_1216){
var min=_1216.getAttribute("minOccurs");
var max=_1216.getAttribute("maxOccurs");
var type=_1216.getAttribute("type");
this.name=_1216.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _121c=split[1];
this.isSimpleValue=sort!="tns";
this.type=_121c;
}else{
var elm=_1216.getElementsByTagName("*").item(0);
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
function SchemaElementType(_121e,_121f){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_121e,_121f);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1220,_1221){
var els=_1220.resolveAll("s:complexType/s:sequence/s:element",_1221);
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
function SchemaComplexType(_1223,_1224){
this._definitions=new List();
this._parseListedDefinitions(_1223,_1224);
this.isArray=_1224.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1225,_1226){
var els=_1225.resolveAll("s:sequence/s:element",_1226);
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
function SchemaSimpleType(_1229,_122a){
this.restrictionType=null;
this._parse(_1229,_122a);
}
SchemaSimpleType.prototype._parse=function(_122b,_122c){
var _122d=_122b.resolve("s:restriction",_122c);
if(_122d){
this.restrictionType=_122d.getAttribute("base").split(":")[1];
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
var _1230=null;
var _1231=DOMUtil.getXMLHTTPRequest();
_1231.open("get",url,false);
_1231.send(null);
if(_1231.responseXML){
_1230=_1231.responseXML.documentElement;
}else{
alert(_1231.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1230;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1232=new List();
var _1233=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1233.hasEntries()){
while(_1233.hasNext()){
var _1234=_1233.getNext();
var name=_1234.getAttribute("name");
_1232.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1232;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1237,_1238,_1239){
this.name=name;
this.address=_1237;
this.encoder=_1238;
this.decoder=_1239;
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
var _123d=wsdl.getOperations();
_123d.each(function(_123e){
proxy[_123e.name]=WebServiceProxy.createProxyOperation(_123e);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_123f,_1240){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1240){
var log=_1240 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_123f.address+": "+_123f.name+"\n\n";
log+=DOMSerializer.serialize(_1240.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1242){
return function(){
var _1243=new List(arguments);
var _1244=null;
if(typeof (_1243.getLast())=="function"){
var _1245=_1243.extractLast();
var _1246=_1242.encoder.encode(_1243);
this._log(_1242,_1246);
var self=this;
var _1248=_1246.asyncInvoke(_1242.address,function(_1249){
self._log(_1242,_1249);
if(_1249){
if(_1249.fault){
_1244=SOAPFault.newInstance(_1242,_1249.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1244,_1246,_1249);
}
}else{
if(WebServiceProxy.isDOMResult){
_1244=_1249.document;
}else{
_1244=_1242.decoder.decode(_1249);
}
}
}
_1246.dispose();
_1245(_1244);
});
}else{
var _1246=_1242.encoder.encode(new List(arguments));
this._log(_1242,_1246);
var _1248=_1246.invoke(_1242.address);
this._log(_1242,_1248);
if(_1248){
if(_1248.fault){
_1244=SOAPFault.newInstance(_1242,_1248.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1244,_1246,_1248);
}
}else{
if(WebServiceProxy.isDOMResult){
_1244=_1248.document;
}else{
_1244=_1242.decoder.decode(_1248);
}
}
}
_1246.dispose();
return _1244;
}
};
};
WebServiceProxy.handleFault=function(_124a,_124b,_124c){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_124a,soapRequest:_124b,soapResponse:_124c});
}
catch(exception){
alert(_124a.getFaultString());
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
var _124d=SystemLogger.getLogger("MessageQueue");
var _124e=null;
var _124f=0;
var _1250=null;
var _1251=new Map();
var _1252=new Map();
var _1253=false;
var _1254=false;
var _1255=false;
var _1256=false;
var _1257={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_124e=ConsoleMessageQueueService;
_124f=_124e.GetCurrentSequenceNumber("dummyparam!");
this.index=_124f;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1253){
if(!MessageQueue._actions.hasEntries()){
var _1258=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1254=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1258;
_1254=false;
}
}
}
};
this._pokeserver=function(){
if(_1253==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1254);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_1255){
_1256=true;
}else{
_1255=true;
var self=this;
_124e.GetMessages(Application.CONSOLE_ID,this.index,function(_125a){
if(_125a!=null){
if(Types.isDefined(_125a.CurrentSequenceNumber)){
var _125b=_125a.CurrentSequenceNumber;
if(_125b<self.index){
_124d.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_125b);
}
self.index=_125b;
var _125c=new List(_125a.ConsoleActions);
if(_125c.hasEntries()){
self.evaluate(_125c);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_124d.error("No sequencenumber in MessageQueue response!");
}
}
_1255=false;
if(_1256){
_1256=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_125d){
var _125e=new List();
if(_125d.hasEntries()){
_125d.each(function(_125f){
if(this._index[_125f.Id]!=true){
_125e.add(_125f);
}
this._index[_125f.Id]=true;
},this);
if(_125e.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_125e);
}else{
this._actions=_125e;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1260){
var _1261="(No reason)";
if(_1260!=null){
_1261=_1260.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1261);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1265){
if(_1265==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1266=null;
if(this._actions.hasEntries()){
var _1267=this._actions.extractFirst();
_124f=_1267.SequenceNumber;
_124d.debug("MessageQueue action: "+_1267.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_124f+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1267.ActionType){
case "OpenView":
_1266=_1267.OpenViewParams;
if(_1266.ViewType=="ModalDialog"){
openDialogView(_1266);
}else{
_1250=_1266.ViewId;
openView(_1266);
}
break;
case "CloseView":
_1266=_1267.CloseViewParams;
_1250=_1266.ViewId;
closeView(_1266);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1267.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_1251.countEntries()+"\n";
_1251.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_124d.debug(debug);
if(!_1251.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1267.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1267.MessageBoxParams);
break;
case "OpenViewDefinition":
_1266=_1267.OpenViewDefinitionParams;
_1250=_1266.Handle;
openViewDefinition(_1266);
break;
case "LogEntry":
logEntry(_1267.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1266=_1267.BroadcastMessageParams;
_124d.debug("Server says: EventBroadcaster.broadcast ( \""+_1266.Name+"\", "+_1266.Value+" )");
EventBroadcaster.broadcast(_1266.Name,_1266.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1251.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1267.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1267.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1267.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1266=_1267.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1266.ViewId,entityToken:_1266.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1266=_1267.OpenGenericViewParams;
openGenericView(_1266);
break;
case "OpenExternalView":
_1266=_1267.OpenExternalViewParams;
openExternalView(_1266);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1267.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1254);
}
function logEntry(_126a){
var _126b=_126a.Level.toLowerCase();
SystemLogger.getLogger(_126a.SenderId)[_126b](_126a.Message);
}
function openView(_126c){
var list=paramsToList(_126c.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_126c.ViewId);
def.entityToken=_126c.EntityToken;
def.flowHandle=_126c.FlowHandle;
def.position=_1257[_126c.ViewType],def.label=_126c.Label;
def.image=_126c.Image;
def.toolTip=_126c.ToolTip;
def.argument={"url":_126c.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_126c.ViewId,entityToken:_126c.EntityToken,flowHandle:_126c.FlowHandle,position:_1257[_126c.ViewType],url:_126c.Url,label:_126c.Label,image:_126c.Image,toolTip:_126c.ToolTip}));
}
}
function openDialogView(_126f){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_126f.ViewId,flowHandle:_126f.FlowHandle,position:Dialog.MODAL,url:_126f.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1270){
var _1271=_1270.DialogType.toLowerCase();
if(_1271=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_1270.Title+"\n"+_1270.Message);
}else{
Dialog[_1271](_1270.Title,_1270.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_1272){
var map={};
var _1274=false;
new List(_1272.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1274=true;
});
var proto=ViewDefinitions[_1272.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1272.ViewId;
}
def.argument=_1274?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1279){
var def=ViewDefinition.clone("Composite.Management.GenericView",_1279.ViewId);
def.label=_1279.Label;
def.toolTip=_1279.ToolTip;
def.image=_1279.Image;
def.argument={"url":_1279.Url,"list":paramsToList(_1279.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_127b){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_127b.ViewId);
def.label=_127b.Label;
def.toolTip=_127b.ToolTip;
def.image=_127b.Image;
def.url=_127b.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_127d){
if(StageBinding.isViewOpen(_127d.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_127d.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_127e){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_127e.ViewId,isSuccess:_127e.Succeeded});
}
this._lockSystem=function(_127f){
var _1280=top.bindingMap.offlinetheatre;
if(_127f){
_1280.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1280.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1253=_127f;
};
this.handleBroadcast=function(_1282,arg){
switch(_1282){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1250!=null&&arg==_1250){
_1250=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_1251.set(arg,true);
}else{
_124d.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1251.hasEntries()){
_1251.del(arg);
_124d.debug("Refreshed tree: "+arg+"\n("+_1251.countEntries()+" trees left!)");
if(!_1251.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1252.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1252.hasEntries()==true){
_1252.del(arg);
if(!_1252.hasEntries()){
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
function paramsToList(_1284){
var list=new List();
new List(_1284).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _1287=false;
var _1288=null;
var _1289=false;
var _128a=Client.qualifies();
var _128b="admin";
var _128c="123456";
if(!_128a){
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
this.handleBroadcast=function(_128d){
switch(_128d){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_128d);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _128e=window.bindingMap.appwindow;
_128e.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_128f){
new List([BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1290){
if(_128f){
EventBroadcaster.subscribe(_1290,KickStart);
}else{
EventBroadcaster.unsubscribe(_1290,KickStart);
}
});
}
function kickStart(_1291){
switch(_1291){
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1287=true;
break;
}
if(_1287){
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
DataManager.getDataBinding("username").setValue(_128b);
DataManager.getDataBinding("password").setValue(_128c);
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
this.doLogin=function(_1294,_1295){
var _1296=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1297=false;
var _1298=LoginService.ValidateAndLogin(_1294,_1295);
if(_1298 instanceof SOAPFault){
alert(_1298.getFaultString());
}else{
_1297=_1298;
}
if(_1297){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1296){
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
var _1299=DataManager.getDataBinding("username");
var _129a=DataManager.getDataBinding("password");
_1299.blur();
_129a.blur();
_1299.setValue("");
_129a.setValue("");
_1299.clean();
_129a.clean();
_1299.focus();
document.getElementById("loginerror").style.display="block";
var _129b={handleAction:function(_129c){
document.getElementById("loginerror").style.display="none";
_129c.target.removeActionListener(Binding.ACTION_DIRTY,_129b);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_129b);
}
WindowManager.fireOnLoad(this);
if(!_128a){
UpdateManager.isEnabled=false;
}
};

