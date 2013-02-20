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
_BroadcastMessages.prototype={APPLICATION_STARTUP:"application startup",APPLICATION_LOGIN:"application login",APPLICATION_LOGOUT:"application logout",APPLICATION_OPERATIONAL:"application operational",APPLICATION_ONSHUTDOWN:"application onshutdown",APPLICATION_SHUTDOWN:"application shutdown",APPLICATION_ERROR:"application error",APPLICATION_BLURRED:"application blurred",APPLICATION_FOCUSED:"application focused",APPLICATION_KICKSTART:"application kickstart",CODEMIRROR_LOADED:"codemirror loaded",MOUSEEVENT_MOUSEDOWN:"mouseevent mousedown",MOUSEEVENT_MOUSEUP:"mouseevent mouseup",MOUSEEVENT_MOUSEMOVE:"mouseevent mousemove",$WINKEY_LOADED:"${windowkey} loaded",$WINKEY_UNLOADED:"${windowkey} unloaded",$WINKEY_EVALUATED:"${windowkey} evaluated",$WINKEY_RESIZED:"${windowkey} resized",$WINKEY_HRESIZED:"${windowkey} horizontally resized",$WINKEY_VRESIZED:"${windowkey} vertically resized",LOADED_NAVIGATOR:"navigator loaded",LOADED_MAINSTAGE:"mainstage loaded",LOCALSTORE_INITIALIZED:"localstore initialized",PERSISTANCE_INITIALIZED:"persistance initialized",AUDIO_INITIALIZED:"audio initialized",STAGE_INITIALIZED:"stage initialized",KEY_SHIFT_DOWN:"shiftkeydown",KEY_SHIFT_UP:"shiftkeyup",KEY_CONTROL_DOWN:"controlkeydown",KEY_CONTROL_UP:"controlkeyup",KEY_ARROW:"arrowkey",KEY_ENTER:"enterkeydown",KEY_ESCAPE:"escapekeydown",KEY_SPACE:"spacekeydown",KEY_TAB:"tabkeydown",KEY_ALT:"altkeydown",KEY_CONTROLTAB:"controltabkeysdown",TYPEDRAG_START:"typedrag start",TYPEDRAG_STOP:"typedrag stop",TYPEDRAG_PAUSE:"typedrag pause",DOCK_MAXIMIZED:"dockmaximized",DOCK_MINIMIZED:"dockminimized",DOCK_NORMALIZED:"docknormalized",DOCKTABBINDING_SELECT:"docktab select",SYSTEMTREEBINDING_REFRESH:"systemtree refresh",SYSTEMTREEBINDING_REFRESHALL:"systemtree refresh all",SYSTEMTREEBINDING_REFRESHING:"systemtree refreshing",SYSTEMTREEBINDING_REFRESHED:"systemtree refreshed",SYSTEMTREEBINDING_FOCUS:"systemtree focus",SYSTEMTREEBINDING_CUT:"systemtree cut",SYSTEMTREEBINDING_COPY:"systemtree copy",SYSTEMTREEBINDING_PASTE:"systemtree paste",SYSTEMTREEBINDING_COLLAPSEALL:"systemtree collapse all",SYSTEMTREENODEBINDING_FOCUS:"systemtreenode focus",SYSTEMTREEBINDING_LOCKTOEDITOR:"systemtreenode lock to editor",SYSTEMTREENODEBINDING_FORCE_OPEN:"systemtreenode force open",SYSTEMTREENODEBINDING_FORCING_OPEN:"systemtreenode forcing open",SYSTEMTREENODEBINDING_FORCED_OPEN:"systemtreenode forced open",START_COMPOSITE:"startcomposite",STOP_COMPOSITE:"stopcomposite",COMPOSITE_START:"compositestart",COMPOSITE_STOP:"compositestop",VIEW_OPENING:"view opening",VIEW_OPENED:"view opened",VIEW_COMPLETED:"view completed",CLOSE_VIEW:"close view",CLOSE_VIEWS:"close views",VIEW_CLOSED:"view closed",TINYMCE_INITIALIZED:"tinymce initialized",CODEPRESS_INITIALIZED:"codepress initialized",VISUALEDITOR_FOCUSED:"visualeditor focused",VISUALEDITOR_BLURRED:"visualditor blurred",PERSPECTIVE_CHANGED:"perspective changed",PERSPECTIVES_NONE:"no perspectives",SYSTEMLOG_OPENED:"systemlog opened",SYSTEMLOG_CLOSED:"systemlog closed",SYSTEMACTION_INVOKE:"systemaction invoke",SYSTEMACTION_INVOKED:"systemaction invoked",SYSTEM_ACTIONPROFILE_PUBLISHED:"system actionprofile published",NAVIGATOR_TREENODE_SELECTED:"navigator treenode selected",MODAL_DIALOG_OPENED:"modal dialog invoked",MODAL_DIALOG_CLOSED:"modal dialog closed",COVERBINDING_MOUSEDOWN:"userinterfacecoverbinding mousedown",SERVER_OFFLINE:"server offline",SERVER_ONLINE:"server online",OFFLINE_FLASH_INITIALIZED:"offline flash initialized",CLOSE_CURRENT:"close current",CLOSE_ALL:"close all",CLOSE_ALL_DONE:"close all done",SAVE_CURRENT:"save current",CURRENT_SAVED:"current saved",SAVE_ALL:"save all",SAVE_ALL_DONE:"save all done",DOCKTAB_DIRTY:"docktab dirty",DOCKTAB_CLEAN:"docktab clean",BINDING_RELATE:"binding relate",LOCALIZATION_CHANGED:"localization changed",XHTML_MARKUP_ON:"xhtml markup on",XHTML_MARKUP_OFF:"xhtml markup off",XHTML_MARKUP_ACTIVATE:"xhtml markup activate",XHTML_MARKUP_DEACTIVATE:"xhtml markup deactivate",HIGHLIGHT_KEYWORDS:"highlight keywords",BIND_TOKEN_TO_VIEW:"bind entitytoken to view",STAGEDIALOG_OPENED:"stage dialog opened",INVOKE_DEFAULT_ACTION:"invoke default action",LANGUAGES_UPDATED:"LocalesUpdated",FROMLANGUAGE_UPDATED:"ForeignLocaleChanged",TOLANGUAGE_UPDATED:"ActiveLocaleChanged",MESSAGEQUEUE_REQUESTED:"messagequeue requested",MESSAGEQUEUE_EVALUATED:"messagequeue evaluated",UPDATE_LANGUAGES:"update languages"};
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
},isCurrentTarget:function(e){
var _125=false;
if(Client.isMozilla==true){
_125=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_126,_127){
var _128=true;
if(_126==_127){
_128=false;
}
if(_128==true){
while(_127!=null&&_127.nodeType!=Node.DOCUMENT_NODE&&_127!=_126){
_127=_127.parentNode;
}
_128=(_127==_126);
}
return _128;
},_eventListener:function(_129,_12a,_12b,_12c,_12d,_12e){
if(Interfaces.isImplemented(IEventListener,_12c,true)){
if(typeof _12b!=Types.UNDEFINED){
switch(_12b){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_12b=_12b==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_12a[this._getAction(_129)](_12b,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_12c.handleEvent(e);
}
}},_12d?true:false);
break;
default:
_12a[this._getAction(_129)](_12b,_12c,_12d?true:false);
break;
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_131){
var _132=null;
switch(_131){
case true:
_132="addEventListener";
break;
case false:
_132="removeEventListener";
break;
}
return _132;
},};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_134){
var _135=null;
var _136=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_136=node.documentElement;
}
if(_136.xml!=null){
return _136.xml;
}else{
if(this._serializer!=null){
if(_134==true){
_136=_136.cloneNode(true);
_136=DOMFormatter.format(_136,DOMFormatter.INDENTED_TYPE_RESULT);
}
_135=this._serializer.serializeToString(_136);
}
}
return _135;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _139=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_13a){
var doc=_13a.ownerDocument;
var _13c=function(node,_13e){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _13f="",i=0;
while(i++<_13e){
_13f+=TAB;
}
var _141=node.firstChild;
while(_141){
switch(_141.nodeType){
case Node.ELEMENT_NODE:
if(_141==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_13f));
}
node.insertBefore(doc.createTextNode(NEW+_13f+TAB),_141);
_13c(_141,_13e+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_13f+TAB),_141);
break;
}
if(_141.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_141,_13f+TAB);
}
}
_141=_141.nextSibling;
}
}
};
_13c(_13a,0);
}
function strip(_142){
var _143=[];
var _144={acceptNode:function(_145){
return (!_139.test(_145.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _146=_142.ownerDocument.createTreeWalker(_142,NodeFilter.SHOW_TEXT,_144,true);
while(_146.nextNode()){
_143.push(_146.currentNode);
}
var i=0,_148;
while((_148=_143[i++])!=null){
_148.parentNode.removeChild(_148);
}
}
function formatCDATASection(node,_14a){
if(node.textContent.indexOf(NEW)>-1){
var _14b=node.textContent.split(NEW);
var _14c="",line,_14e=0,_14f=true;
while((line=_14b.shift())!=null){
if(_14e==0&&line.charAt(0)==TAB){
while(line.charAt(_14e++)==TAB){
}
}
line=line.substring(_14e,line.length);
if(_14b.length>0){
_14c+=_14a+TAB+line;
_14c+=_14f?"":"\n";
}else{
_14c+=_14a+line;
_14a=_14a.slice(1,_14a.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_14a));
}
_14f=false;
}
node.textContent=_14c;
}
}
this.format=function(_150,_151){
var _152=1;
if(document.createTreeWalker&&!Client.isExplorer){
try{
strip(_150);
if(_151!=_152){
indent(_150);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_150);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_153){
var sig,_155=null,_156=this.MSXML_MAXVERSION;
while(!_155&&_156>=this.MSXML_MINVERSION){
try{
sig=_153.replace("{$version}",_156);
_155=new ActiveXObject(sig);
}
catch(exception){
}
_156--;
}
return _155;
},getXMLHTTPRequest:function(){
var _157=null;
if(Client.isExplorer){
_157=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_157=new XMLHttpRequest();
}
return _157;
},getDOMDocument:function(_158){
var _159=null;
if(Client.isExplorer){
_159=this.getMSComponent(_158?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_159=doc;
}
return _159;
},getMSXMLXSLTemplate:function(){
var _15b=null;
if(Client.isExplorer){
_15b=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _15b;
},getLocalName:function(_15c){
var _15d=null;
if(_15c.localName){
_15d=_15c.localName.replace("ui:","");
}else{
if(_15c.baseName){
_15d=_15c.baseName;
}else{
_15d=_15c.nodeName.toLowerCase();
}
}
return _15d;
},getComputedStyle:function(_15e,_15f){
var _160=null;
if(Client.isExplorer){
if(_15e.currentStyle!=null){
_160=_15e.currentStyle[_15f];
}else{
this._logger.error("Could not compute style for element "+_15e.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _161=_15e.ownerDocument.defaultView.getComputedStyle(_15e,null);
if(_161!=null){
_160=_161.getPropertyValue(_15f);
}else{
this._logger.error("Could not compute style for element "+_15e.nodeName);
SystemDebug.stack(arguments);
}
}
return _160;
},getMaxIndex:function(doc){
var max=0,_164=new List(doc.getElementsByTagName("*"));
_164.each(function(_165){
var _166=CSSComputer.getZIndex(_165);
if(_166>max){
max=_166;
}
});
return max;
},getOrdinalPosition:function(_167,_168){
var _169=null;
var _16a=-1;
var _16b=this.getLocalName(_167);
var _16c=new List(_167.parentNode.childNodes);
while(_16c.hasNext()){
var _16d=_16c.getNext();
if(_16d.nodeType==Node.ELEMENT_NODE){
if(!_168||this.getLocalName(_16d)==_16b){
_16a++;
if(_16d==_167||(_16d.id!=""&&_16d.id==_167.id)){
_169=_16a;
break;
}
}
}
}
return _169;
},isFirstElement:function(_16e,_16f){
return (this.getOrdinalPosition(_16e,_16f)==0);
},isLastElement:function(_170,_171){
var _172=_170.parentNode.getElementsByTagName(_171?this.getLocalName(_170):"*");
return (this.getOrdinalPosition(_170)==_172.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _176=null;
if(node.textContent){
_176=node.textContent;
}else{
if(node.text){
_176=node.text;
}else{
_176=node.innerText;
}
}
return _176;
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
},getAncestorByLocalName:function(_179,node,_17b){
var _17c=null;
while(_17c==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_17b==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_179){
_17c=node;
}
}
return _17c;
},contains:function(_17e,node){
return _17e.contains?_17e!=node&&_17e.contains(node):!!(_17e.compareDocumentPosition(node)&16);
},createElementNS:function(_180,_181,_182){
var _183=null;
if(_182==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_183=_182.createElementNS(_180,_181);
}else{
if(_182.xml!=null){
_183=_182.createNode(Node.ELEMENT_NODE,_181,_180);
}else{
_183=_182.createElement(_181.replace("ui:",""));
}
}
}
return _183;
},getElementsByTagName:function(node,_185){
var _186=null;
if(Client.isMozilla){
_186=node.getElementsByTagNameNS(Constants.NS_XHTML,_185);
}else{
_186=node.getElementsByTagName(_185);
}
return _186;
},getNextElementSibling:function(_187){
return Client.isExplorer?_187.nextSibling:_187.nextElementSibling;
},getPreviousElementSibling:function(_188){
return Client.isExplorer?_188.previousSibling:_188.previousElementSibling;
},cloneNode:function(node){
var _18a=null;
if(Client.isMozilla==true){
_18a=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_18a=node.cloneNode(true);
}
return _18a;
},getLocalPosition:function(_18b){
var _18c=new Point(_18b.offsetLeft,_18b.offsetTop);
if(Client.isExplorer&&_18b.parentNode&&_18b.parentNode.currentStyle){
if(_18b.parentNode.currentStyle.position=="static"){
var _18d=this.getLocalPosition(_18b.parentNode);
_18c.x+=_18d.x;
_18c.y+=_18d.y;
}
}
return _18c;
},getGlobalPosition:function(_18e){
return this._getPosition(_18e,false);
},getUniversalPosition:function(_18f){
return this._getPosition(_18f,true);
},_getPosition:function(_190,_191){
var _192=null;
if(typeof _190.getBoundingClientRect!=Types.UNDEFINED){
var rect=_190.getBoundingClientRect();
_192={x:rect.left,y:rect.top};
if(Client.isMozilla){
_192.x-=_190.scrollLeft;
_192.y-=_190.scrollTop;
}
}else{
_192={x:_190.offsetLeft-_190.scrollLeft,y:_190.offsetTop-_190.scrollTop};
while(_190.offsetParent){
_190=_190.offsetParent;
_192.x+=(_190.offsetLeft-_190.scrollLeft);
_192.y+=(_190.offsetTop-_190.scrollTop);
}
}
if(_191){
var win=DOMUtil.getParentWindow(_190);
if(win){
var _195=win.frameElement;
if(_195){
var add=DOMUtil.getUniversalPosition(_195);
_192.x+=add.x;
_192.y+=add.y;
}
}
}
return new Point(_192.x,_192.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_19a){
var _19b=DOMEvents.getTarget(e);
var _19c={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_19b.ownerDocument;
var win=this.getParentWindow(doc);
_19c.x-=win.pageXOffset;
_19c.y-=win.pageYOffset;
}
if(_19a){
var _19f=this.getParentWindow(_19b).frameElement;
if(_19f){
var add=this.getUniversalPosition(_19f);
_19c.x+=add.x;
_19c.y+=add.y;
}
}
return _19c;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1a2){
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
if(!_1a2){
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
if(!_1a2){
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
},isWellFormedDocument:function(xml,_1a5){
var _1a6=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1a8=SourceValidationService.IsWellFormedDocument(xml);
if(_1a8!="True"){
_1a6=false;
if(_1a5==true){
this._illFormedDialog(_1a8);
}
}
return _1a6;
},isWellFormedFragment:function(xml,_1aa){
var _1ab=true;
var _1ac=SourceValidationService.IsWellFormedFragment(xml);
if(_1ac!="True"){
_1ab=false;
if(_1aa==true){
this._illFormedDialog(_1ac);
}
}
return _1ab;
},_illFormedDialog:function(_1ad){
setTimeout(function(){
if(Client.isWebKit){
alert(_1ad);
}else{
Dialog.error("Not well-formed",_1ad);
}
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1ae){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1af){
return _1ae[_1af];
}};
}else{
this._nsResolver=_1ae;
}
};
XPathResolver.prototype.resolve=function(_1b0,node,_1b2){
var _1b3=null;
try{
if(this._evaluator){
_1b3=this._evaluateDOMXpath(_1b0,node,_1b2?true:false);
}else{
_1b3=this._evaluateMSXpath(_1b0,node,_1b2?true:false);
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
return _1b3;
};
XPathResolver.prototype.resolveAll=function(_1b4,node){
return this.resolve(_1b4,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1b6,node,_1b8){
var _1b9=null;
if(node){
var _1b9=this._evaluator.evaluate(_1b6,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1b8){
var list=new List();
while((node=_1b9.iterateNext())!=null){
list.add(node);
}
_1b9=list;
}else{
_1b9=_1b9.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1b9;
};
XPathResolver.prototype._evaluateMSXpath=function(_1bc,node,_1be){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1c0="";
for(var _1c1 in this._nsResolver){
_1c0+="xmlns:"+_1c1+"=\""+this._nsResolver[_1c1]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1c0);
if(_1be){
var list=new List();
var i=0,_1c4=node.selectNodes(_1bc);
while(i<_1c4.length){
list.add(_1c4.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1bc);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1c6=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1c6);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1c6;
}
};
XSLTransformer.prototype._import=function(url){
var _1c8=null;
if(Client.isMozilla){
var _1c9=DOMUtil.getXMLHTTPRequest();
_1c9.open("get",Resolver.resolve(url),false);
_1c9.send(null);
_1c8=_1c9.responseXML;
}else{
var _1c8=DOMUtil.getDOMDocument(true);
_1c8.async=false;
_1c8.load(url);
}
return _1c8;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1cb=null;
if(Client.isMozilla){
_1cb=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1cb;
};
XSLTransformer.prototype.transformToString=function(dom,_1cd){
var _1ce=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1ce=DOMSerializer.serialize(doc,_1cd);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1ce=proc.output;
}
return _1ce;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1d1){
var _1d2=_1d1.style?_1d1.className:_1d1.getAttribute("class");
_1d2=_1d2?_1d2:"";
return _1d2;
},_contains:function(_1d3,sub){
return _1d3.indexOf(sub)>-1;
},_attach:function(_1d5,sub){
return _1d5+(_1d5==""?"":" ")+sub;
},_detach:function(_1d7,sub){
if(this._contains(_1d7," "+sub)){
sub=" "+sub;
}
return _1d7.replace(sub,"");
},attachClassName:function(_1d9,_1da){
if(_1d9.classList!=null){
if(!_1d9.classList.contains(_1da)){
_1d9.classList.add(_1da);
}
}else{
var _1db=this._getCurrent(_1d9);
if(!this._contains(_1db,_1da)){
_1db=this._attach(_1db,_1da);
}
if(_1d9.style!=null){
_1d9.className=_1db;
}else{
_1d9.setAttribute("class",_1db);
}
}
},detachClassName:function(_1dc,_1dd){
if(_1dc.classList!=null){
if(_1dc.classList.contains(_1dd)){
_1dc.classList.remove(_1dd);
}
}else{
var _1de=this._getCurrent(_1dc);
if(this._contains(_1de,_1dd)){
_1de=this._detach(_1de,_1dd);
}
if(_1dc.style!=null){
_1dc.className=_1de;
}else{
if(_1de==""){
_1dc.removeAttribute("class");
}else{
_1dc.setAttribute("class",_1de);
}
}
}
},hasClassName:function(_1df,_1e0){
var _1e1=false;
if(_1df.classList!=null){
_1e1=_1df.classList.contains(_1e0);
}else{
_1e1=this._contains(this._getCurrent(_1df),_1e0);
}
return _1e1;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1e2,_1e3){
var _1e4={};
for(var _1e5 in _1e2){
var ent=parseInt(DOMUtil.getComputedStyle(_1e3,_1e2[_1e5]));
_1e4[_1e5]=isNaN(ent)?0:ent;
}
return _1e4;
},_getMargin:function(_1e7){
return this._getComplexResult(this._margins,_1e7);
},getPadding:function(_1e8){
return this._getComplexResult(this._paddings,_1e8);
},getBorder:function(_1e9){
return this._getComplexResult(this._borders,_1e9);
},getPosition:function(_1ea){
return DOMUtil.getComputedStyle(_1ea,"position");
},getFloat:function(_1eb){
return DOMUtil.getComputedStyle(_1eb,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1ec){
return parseInt(DOMUtil.getComputedStyle(_1ec,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1ed){
return DOMUtil.getComputedStyle(_1ed,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1ee=SystemLogger.getLogger("System");
var root=null;
var _1f0=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_1f1){
if(_1f0==null){
_1f0={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_1f2){
_1f0[_1f2.Key]=_1f2.Value;
});
}
return _1f0[_1f1];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1f3=new List();
var _1f4=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1f4);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1f6){
_1f3.add(new SystemNode(_1f6));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1f3;
};
this.getChildNodes=function(node,_1f8){
var _1f9=new List();
var _1fa=null;
if(_1f8){
if(SearchTokens.hasToken(_1f8)){
_1f8=SearchTokens.getToken(_1f8);
}
_1fa=TreeService.GetElementsBySearchToken(node.getData(),_1f8);
}else{
_1fa=TreeService.GetElements(node.getData());
}
new List(_1fa).each(function(_1fb){
var _1fc=new SystemNode(_1fb);
if(_1f8){
_1fc.searchToken=_1f8;
}
_1f9.add(_1fc);
});
return _1f9;
};
this.getDescendantBranch=function(_1fd){
var map=new Map();
var arg=[];
_1fd.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _201=TreeService.GetMultipleChildren(arg);
var _202=new List(_201);
while(_202.hasNext()){
this._listNodesInMap(_202.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_203,_204,_205){
var map=new Map();
var arg=[];
_205.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _209=TreeService.FindEntityToken(_203,_204,arg);
if(_209 instanceof SOAPFault){
_1ee.error(_209.getFaultString());
if(Application.isDeveloperMode){
alert(_209.getFaultString());
}
map=null;
}else{
var _20a=new List(_209);
while(_20a.hasNext()){
this._listNodesInMap(_20a.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_20b,map){
var list=new List();
var key=_20b.ElementKey;
var _20f=new List(_20b.ClientElements);
map.set(key,list);
while(_20f.hasNext()){
var _210=_20f.getNext();
list.add(new SystemNode(_210));
}
};
this.getChildNodesBySearchToken=function(node,_212){
return this.getChildNodes(node,_212);
};
this.getNamedRoots=function(key,_214){
var _215=new List();
var _216=null;
if(_214){
if(SearchTokens.hasToken(_214)){
_214=SearchTokens.getToken(_214);
}
_216=TreeService.GetNamedRootsBySearchToken(key,_214);
}else{
_216=TreeService.GetNamedRoots(key);
}
new List(_216).each(function(_217){
var node=new SystemNode(_217);
if(_214){
node.searchToken=_214;
}
_215.add(node);
});
return _215;
};
this.getNamedRootsBySearchToken=function(key,_21a){
return this.getNamedRoots(key,_21a);
};
function compileActionList(node,_21c,_21d){
var _21e=_21c.ClientElementActionGroupId;
if(_21e!=null){
var _21f=_21d.get(_21e).ClientElementActionGroupItems;
if(_21f&&_21f.length>0){
node.setActionList(new List(_21f));
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
new List(self._data.Actions).each(function(_225){
var _226=_225.ActionCategory.Name;
if(SystemAction.hasCategory(_226)){
var _227=new SystemAction(_225);
SystemAction.actionMap.set(_225.ActionKey,_227);
}else{
throw "No such action category: "+_226;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _228=null;
if(this.searchToken){
_228=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_228=System.getChildNodes(this);
}
return _228;
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
var _22a=this._data.Piggybag;
if(_22a==null){
_22a="";
}
return _22a;
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
var _22c=null;
if(typeof this._data.ToolTip!="undefined"){
_22c=this._data.ToolTip;
}
return _22c;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_22e){
map[_22e.Key]=_22e.Value;
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
var _232=SystemAction.actionMap.get(key);
var _233=true;
if(_232.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_233=false;
}
}
if(_233){
var id=_232.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_232);
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
SystemAction.invoke=function(_236,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_236.logger.debug("Execute \""+_236.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_236.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_239,_23a){
action=SystemAction.taggedActions.get(_239);
node=SystemNode.taggedNodes.get(_23a);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_23b){
return SystemAction.categories[_23b]?true:false;
};
function SystemAction(_23c){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_23c;
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
var _23d=null;
if(this.isInFolder()){
_23d=this._data.ActionCategory.FolderName;
}
return _23d;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _23e=null;
if(typeof this._data.TagValue!="undefined"){
_23e=this._data.TagValue;
}
return _23e;
};
SystemAction.prototype.isChecked=function(){
var _23f=null;
if(this.isCheckBox()){
_23f=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _23f;
};
function _UpdateManager(){
var _240=null;
if(!window.UpdateManager){
this._construct();
_240=this;
}
return _240;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_241){
var root=document.documentElement;
var _243=root.namespaceURI;
if(_243==null){
_243=new String(root.getAttribute("xmlns"));
}
if(_243=="http://www.w3.org/1999/xhtml"){
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
var _244=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_244);
}else{
throw new TypeError();
}
}else{
var _245=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_245.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _247=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_247=true;
}
},this);
return _247;
},_setupForm:function(form){
var _24a=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_24a.isEnabled){
_24a._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_24b,type){
if(_24b.addEventListener!=null){
_24b.addEventListener(type,this,false);
}else{
var _24d=this;
_24b.attachEvent("on"+type,function(){
_24d.handleEvent(window.event);
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
var _252=UpdateAssistant.getUpdateZones(dom);
var _253=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_252.forEach(function(_254,_255){
var _256=_253[_255];
this._crawl(_254,_256);
},this);
this._updates.forEach(function(_257,_258){
_257.update();
_257.dispose();
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
},_crawl:function(_25a,_25b,_25c,id){
var _25e=true;
var _25f=_25b.getAttribute("class");
if(_25f==null||_25f.indexOf(this.CLASSNAME_GONE)==-1){
if(_25b.nodeType==Node.ELEMENT_NODE){
var _260=_25b.getAttribute("id");
if(_260!=null){
_25c=_25a;
id=_260;
}
}
if(_25e=this._check(_25a,_25b,_25c,id)){
var _261=_25a.firstChild;
var _262=_25b.firstChild;
while(_261!=null&&_262!=null&&!this._replaced[id]){
switch(_261.nodeType){
case Node.TEXT_NODE:
_25e=this._check(_261,_262,_25c,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_25e=this._crawl(_261,_262,_25c,id);
break;
}
if(this._replaced[id]){
_25e=false;
}else{
_261=_261.nextSibling;
_262=_262.nextSibling;
}
}
}
}
return _25e;
},_check:function(_263,_264,_265,id){
var _267=true;
var _268=null;
var _269=false;
var _26a=false;
if((_263!=null&&_264==null)||(_263==null&&_264!=null)){
_267=false;
}else{
if(_267=_263.nodeType==_264.nodeType){
switch(_264.nodeType){
case Node.ELEMENT_NODE:
if(_263.namespaceURI!=_264.namespaceURI||_263.nodeName!=_264.nodeName){
_267=false;
}else{
if(_267=(_263.nodeName==_264.nodeName)){
var _26b=_264.getAttribute("id");
var _26c=_263.getAttribute("id");
if(_26b!=null&&_26c!=null){
if(_26b!=_26c){
_267=false;
}else{
if((_268=this._getPlugin(_263,_264))!=null){
if(_268.updateElement(_263,_264)){
_26a=true;
_267=false;
}
}
}
}
if(_267){
if(_267=this._checkAttributes(_263,_264)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_263)&&this._hasSoftChildren(_264)){
if(this._validateSoftChildren(_263,_264)){
this._updateSoftChildren(_263,_264);
_269=true;
}
_267=false;
}else{
_267=_263.childNodes.length==_264.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_263.data.trim()!=_264.data.trim()){
_267=false;
}
break;
}
}
}
if(_267==false&&!_269&&!_26a){
if(id!=null&&_265!=null){
this.addUpdate(new ReplaceUpdate(id,_265));
}
}
return _267;
},_checkAttributes:function(_26d,_26e){
var _26f=true;
var _270=false;
var _271=_26d.attributes;
var _272=_26e.attributes;
if(_271.length!=_272.length){
_270=true;
}else{
_270=!Array.every(_271,function(att1,i){
var att2=_272.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_270){
var _276=_26d.getAttribute("id");
var _277=_26e.getAttribute("id");
if(this.hasSoftAttributes&&_276!=null&&_276==_277){
this.addUpdate(new AttributesUpdate(_277,_26d,_26e));
}else{
_26f=false;
}
}
return _26f;
},_hasSoftChildren:function(_278){
var _279=true;
if(_278.hasChildNodes()){
_279=Array.every(_278.childNodes,function(node){
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
return _279;
},_validateSoftChildren:function(_27c,_27d){
var _27e=true;
var _27f=-1;
var _280=-1;
var _281=-1;
var news=this._toMap(_27c.childNodes,true);
var olds=this._toMap(_27d.childNodes,true);
for(var id in olds){
if(_27e){
var _285=olds[id];
_27e=_285>=_27f;
if(news[id]!=null){
_281=news[id];
_27e=_281>=_280;
}
}
_27f=_285;
if(_281>-1){
_280=_281;
}
}
return _27e;
},_updateSoftChildren:function(_286,_287){
var news=this._toMap(_286.childNodes);
var olds=this._toMap(_287.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _28b=null;
for(id in news){
if(olds[id]==null){
var _28c=news[id];
if(_28b==null){
var _28d=_287.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_28d,_28c,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_28b,_28c,false));
}
}
_28b=id;
}
},addUpdate:function(_28e){
this._updates.push(_28e);
if(_28e instanceof ReplaceUpdate){
this._replaced[_28e.id]=true;
}
},_getPlugin:function(_28f,_290){
var _291=null;
this.plugins.every(function(_292){
if(_292.handleElement(_28f,_290)){
_291=_292;
}
return _291==null;
});
return _291;
},_toMap:function(_293,_294){
var _295={};
Array.forEach(_293,function(node,_297){
if(node.nodeType==Node.ELEMENT_NODE){
_295[node.getAttribute("id")]=_294?_297:node;
}
});
return _295;
},_getPost:function(form){
var _299=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_29b){
if(_29b.name==null||_29b.name==""){
return;
}
var name=_29b.name;
var _29d=encodeURIComponent(_29b.value);
switch(_29b.type){
case "button":
case "submit":
var _29e=UpdateAssistant.getActiveElement();
if(_29b==_29e&&name!=""){
_299+=name+"="+_29d+"&";
}
break;
case "radio":
if(_29b.checked){
_299+=name+"="+_29d+"&";
}
break;
case "checkbox":
if(_29b.checked){
if(_29b.name==last){
if(_299.lastIndexOf("&")==_299.length-1){
_299=_299.substr(0,_299.length-1);
}
_299+=","+_29d;
}else{
_299+=name+"="+_29b.value;
}
last=name;
_299+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_299+=name+"="+_29d+"&";
break;
}
});
}
return _299.substr(0,_299.length-1);
},_postRequest:function(form){
var _2a0=form.method!=""?form.method:"get";
var _2a1=form.action!=""?form.action:window.location.toString();
var _2a2=this._getPost(form);
if(_2a0=="get"){
if(_2a1.indexOf("?")>-1){
_2a1=_2a1+"&"+_2a2;
}else{
_2a1+"?"+_2a2;
}
}
var _2a3=this;
var _2a4=UpdateAssistant.getXMLHttpRequest(_2a0,_2a1,this);
if(_2a0=="post"){
_2a4.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2a4.send(_2a0=="post"?_2a2:null);
},_fixdotnet:function(dom,id){
var _2a7=document.getElementById(id);
if(_2a7!=null){
var _2a8=UpdateAssistant.getElementById(dom,id);
if(_2a8!=null){
var _2a9=_2a8.getAttribute("value");
if(_2a9!==_2a7.value){
_2a7.value=_2a9;
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
},report:function(_2ac){
this.summary+=_2ac+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2ad=null;
if(!window.UpdateAssistant){
this._construct();
_2ad=this;
}
return _2ad;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2ae,fun){
var _2b0=true;
var len=_2ae.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2b2=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2ae[i]!="undefined"){
if(!fun.call(_2b2,_2ae[i],i,_2ae)){
_2b0=false;
break;
}
}
}
}
return _2b0;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2b5=arguments[1];
return Array.every(this,fun,_2b5);
};
}
if(!Array.forEach){
Array.forEach=function(_2b6,fun){
var len=_2b6.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2b9=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b6[i]!="undefined"){
fun.call(_2b9,_2b6[i],i,_2b6);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2bc=arguments[1];
Array.forEach(this,fun,_2bc);
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
},getXMLHttpRequest:function(_2be,_2bf,_2c0){
var _2c1=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2c1!=null){
_2c1.open(_2be,_2bf,(_2c0!=null?true:false));
if(_2c0!=null){
function action(){
if(_2c1.readyState==4){
var text=_2c1.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2c0.handleResponse(dom);
}
}
}
if(_2c1.addEventListener!=null){
_2c1.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2c1.onreadystatechange=action;
}
}
}
return _2c1;
},dispatchEvent:function(_2c4,name){
var _2c6=true;
if(_2c4.fireEvent!=null){
_2c6=_2c4.fireEvent("on"+name);
}else{
var _2c7=document.createEvent("UIEvents");
_2c7.initEvent(name,true,true);
_2c6=_2c4.dispatchEvent(_2c7);
}
return _2c6;
},getUpdateZones:function(dom){
var _2c9="//*[@id and contains(@class,'updatezone')]";
var _2ca=[];
var _2cb=null;
var _2cc=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2cb=dom.evaluate(_2c9,dom,null,type,null);
while((_2cc=_2cb.iterateNext())!=null){
_2ca.push(_2cc);
}
}else{
_2cb=dom.documentElement.selectNodes(_2c9);
Array.forEach(_2cb,function(_2ce){
_2ca.push(_2ce);
});
}
return _2ca;
},getElementById:function(dom,id){
var _2d1="//*[@id='"+id+"']";
var _2d2=null;
var _2d3=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2d2=dom.evaluate(_2d1,dom,null,type,null);
_2d3=_2d2.singleNodeValue;
}else{
_2d3=dom.documentElement.selectNodes(_2d1)[0];
}
return _2d3;
},_getIds:function(dom){
var _2d6="//*[@id]";
var _2d7=null;
var _2d8=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d7=dom.evaluate(_2d6,dom,null,type,null);
while((element=_2d7.iterateNext())!=null){
_2d8.push(element.getAttribute("id"));
}
}else{
_2d7=dom.documentElement.selectNodes(_2d6);
Array.forEach(_2d7,function(_2da){
_2d8.push(_2da.getAttribute("id"));
});
}
return _2d8;
},toHTMLElement:function(_2db){
var _2dc=this.serialize(_2db);
var temp=document.createElement("temp");
temp.innerHTML=_2dc;
return temp.firstChild;
},getActiveElement:function(){
var _2de=document.activeElement;
if(_2de==null||_2de==document.body){
_2de=this._activeElement;
}
return _2de;
},serialize:function(_2df){
var _2e0=null;
if(_2df.xml!=null){
_2e0=_2df.xml;
}else{
if(this._serializer!=null){
_2e0=this._serializer.serializeToString(_2df);
}
}
return _2e0;
},hasDifferences:function(_2e1,_2e2){
var s1=null;
var s2=null;
if(_2e1.xml!=null){
s1=_2e1.xml;
s2=_2e2.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2e1);
s2=this._serializer.serializeToString(_2e2);
}
}
return s1!=s2;
},parse:function(_2e5){
var _2e6=null;
if(this._parser!=null&&window.XPathResult!=null){
_2e6=this._parser.parseFromString(_2e5,"text/xml");
}else{
_2e6=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2e6.setProperty("SelectionLanguage","XPath");
_2e6.loadXML(_2e5);
}
return this._validate(_2e6);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2e9=dom.getElementsByTagName("parsererror").item(0);
if(_2e9!=null){
out=_2e9.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2ed=!has[id];
has[id]=true;
if(!_2ed){
out="Element \""+id+"\" encountered twice.";
}
return _2ed;
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
this.handleElement=function(_2ee,_2ef){
var _2f0=false;
switch(_2ee.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2ee.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2f0=false;
break;
}
break;
}
return _2f0;
};
this.updateElement=function(_2f1,_2f2){
var id=_2f1.getAttribute("id");
var _2f4=document.getElementById(id);
if(_2f4!=null){
var _2f5=null;
switch(_2f4.nodeName.toLowerCase()){
case "input":
_2f5=_2f1.getAttribute("value");
break;
case "textarea":
_2f5=_2f1.textContent?_2f1.textContent:_2f1.text;
break;
}
if(_2f5==null){
_2f5="";
}
if(_2f5!=_2f4.value){
_2f4.value=_2f5;
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
},_beforeUpdate:function(_2f6){
var _2f7=true;
if(_2f6!=null){
_2f6.__updateType=this.type;
_2f7=UpdateAssistant.dispatchEvent(_2f6,Update.EVENT_BEFOREUPDATE);
}
return _2f7;
},_afterUpdate:function(_2f8){
var _2f9=true;
if(_2f8!=null){
_2f8.__updateType=this.type;
_2f9=UpdateAssistant.dispatchEvent(_2f8,Update.EVENT_AFTERUPDATE);
}
return _2f9;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_2fb){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_2fb;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _2fc,_2fd,_2fe=UpdateAssistant.toHTMLElement(this.element);
if((_2fc=document.getElementById(this.id))!=null){
if((_2fd=_2fc.parentNode)!=null){
var _2ff=UserInterface.getBinding(_2fc);
if(_2ff!=null){
_2fe.__isAttached=_2ff.isAttached;
}
if(this._beforeUpdate(_2fc)){
_2fd.replaceChild(_2fe,_2fc);
this._afterUpdate(_2fe);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_300){
var _301=ReplaceUpdate.superclass._afterUpdate.call(this,_300);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_300.nodeName=="form"||_300.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _301;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_304,_305){
this.type=type;
this.id=id;
this.element=_304;
this.isFirst=_305;
return this;
}
SiblingUpdate.prototype.update=function(){
var _306=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_306);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_306);
break;
}
};
SiblingUpdate.prototype._remove=function(_307){
var _308=_307.parentNode;
if(_308!=null){
if(this._beforeUpdate(_307)){
_308.removeChild(_307);
this._afterUpdate(_308);
}
}
};
SiblingUpdate.prototype._insert=function(_309,_30a){
var _30b=UpdateAssistant.toHTMLElement(_309);
if(this.isFirst){
var _30c=_30a;
if(_30c!=null){
if(this._beforeUpdate(_30c)){
_30c.insertBefore(_30b,_30c.firstChild);
this._afterUpdate(_30b);
}
}
}else{
var _30c=_30a.parentNode;
if(_30c!=null){
if(this._beforeUpdate(_30c)){
_30c.insertBefore(_30b,_30a.nextSibling);
this._afterUpdate(_30b);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_30d){
var _30e=SiblingUpdate.superclass._beforeUpdate.call(this,_30d);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_30d.id+"\"");
}
return _30e;
};
SiblingUpdate.prototype._afterUpdate=function(_30f){
var _310=true;
if(_30f!=null){
_310=SiblingUpdate.superclass._afterUpdate.call(this,_30f);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_30f.id+"\"");
if(_30f.nodeName=="form"||_30f.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _310;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_312,_313){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_312;
this.currentElement=_313;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _314=document.getElementById(this.id);
if(this._beforeUpdate(_314)){
this._updateAttributes(_314);
this._afterUpdate(_314);
}
};
AttributesUpdate.prototype._updateAttributes=function(_315){
Array.forEach(this.element.attributes,function(_316){
var _317=this.currentElement.getAttribute(_316.nodeName);
if(_317==null||_317!=_316.nodeValue){
this._setAttribute(_315,_316.nodeName,_316.nodeValue);
this._summary.push("@"+_316.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_318){
if(this.element.getAttribute(_318.nodeName)==null){
this._setAttribute(_315,_318.nodeName,null);
this._summary.push("@"+_318.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_319,name,_31b){
if(_319==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_31b);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _31c=(_31b==null);
if(_31c){
_319.removeAttribute(name);
}else{
_319.setAttribute(name,_31b);
}
if(document.all!=null){
if(_31c){
_31b="";
}
switch(name.toLowerCase()){
case "class":
_319.className=_31b;
break;
case "disabled":
_319.disabled=!_31c;
break;
case "checked":
_319.checked=!_31c;
break;
case "readonly":
_319.readOnly=!_31c;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_31d){
AttributesUpdate.superclass._afterUpdate.call(this,_31d);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_31e,key){
return _31e.replace("${windowkey}",document.location+":"+key);
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
var _322=this._newDimensions.w!=this._currentDimensions.w;
var _323=this._newDimensions.h!=this._currentDimensions.h;
if(_322||_323){
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
},fireOnDOM:function(_325){
if(Interfaces.isImplemented(IDOMHandler,_325,true)){
this._ondomstatements.add(_325);
}
},fireOnLoad:function(_326){
if(Interfaces.isImplemented(ILoadHandler,_326,true)){
this._onloadstatements.add(_326);
}
},fireOnResize:function(_327){
if(Interfaces.isImplemented(IResizeHandler,_327,true)){
this._onresizestatements.add(_327);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_328){
return eval(_328);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_329,_32a){
SystemLogger.unsuspend(_32a);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_32b,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _32e=top.app.bindingMap.broadcasterHasDirtyTabs;
_32e.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_32f,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _332=top.app.bindingMap.broadcasterHasDirtyTabs;
_332.disable();
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
var _333=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_333=LoginService.Logout(true);
if(!_333){
alert("Logout failed.");
}
}
return _333;
},lock:function(_334){
if(_334!=null){
this._lockthings[_334]=true;
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
},unlock:function(_335,_336){
if(_335!=null){
delete this._lockthings[_335];
if(top.bindingMap.mastercover!=null){
if(_336||this._lockers>0){
if(_336){
var out="Unlocked by "+new String(_335)+"\n";
for(var _338 in this._lockthings){
out+="Locked by "+new String(_338)+". ";
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
},hasLock:function(_339){
return this._lockthings[_339]==true;
},activate:function(_33a){
var _33b=this._activeBinding;
this._activeBinding=_33a;
this._activatedBindings.add(_33a);
if(_33b&&_33b.isActive){
_33b.deActivate();
}
},deActivate:function(_33c){
var _33d=null;
var _33e=null;
if(_33c==this._activeBinding){
while(!_33e&&this._activatedBindings.hasEntries()){
_33d=this._activatedBindings.extractLast();
if(_33d!=_33c&&_33d.isActivatable){
_33e=_33d;
}
}
if(!_33e){
_33e=app.bindingMap.explorerdock;
}
_33e.activate();
}
},focused:function(_33f){
this.isFocused=_33f;
if(_33f){
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
},handleAction:function(_344){
switch(_344.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _346=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_348){
var src=_348.src;
if(src.indexOf(_346)>-1){
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
var _34d=false;
if(this._isMousePositionTracking){
_34d=true;
if(Client.isExplorer&&e.button!=1){
_34d=false;
}
if(_34d){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _34d;
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
},onDragStart:function(_34f){
var _350=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_350,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_350.getImage());
this._cursorStartPoint=_34f;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_350.showDrag){
_350.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_350.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _352=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_352);
}
},onDragStop:function(diff){
if(this._isDragging){
var _354=BindingDragger.draggedBinding;
if(_354.hideDrag){
_354.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_354.dragType);
this._isDragging=false;
_354=BindingAcceptor.acceptingBinding;
if(_354!=null){
if(Interfaces.isImplemented(IAcceptable,_354,true)==true){
_354.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_354);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_355){
if(this.isDeveloperMode||_355){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_356){
if(_356==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_357){
switch(_357){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_359){
switch(_359.Key){
case "ProductVersion":
this.versionString=_359.Value;
break;
case "ProductTitle":
this.versionPrettyString=_359.Value;
break;
case "InstallationId":
this.installationID=_359.Value;
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
function _Audio(){
this._construct();
}
_Audio.prototype={SPLASH:"${root}/audio/splash.mp3",LOGIN:"${root}/audio/login.mp3",FATAL:"${root}/audio/fatal.mp3",_logger:SystemLogger.getLogger("Audio"),_audio:null,isInitialized:false,isEnabled:false,_construct:function(){
if(!Client.hasFlash){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_KICKSTART,{handleBroadcast:function(){
Audio.initialize(null);
}});
}
},initialize:function(_35c){
if(!this.isInitialized){
this.isInitialized=true;
if(_35c){
this._audio=_35c;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _35e=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_35e=true;
}
return _35e;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _35f=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _360={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _361=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_361){
for(var key in _361){
_360[key]=_361[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_360);
}
}});
this.getPref=function(key){
var _364=null;
if(key){
_364=_360[key];
}else{
throw "No such preference.";
}
return _364;
};
this.setPref=function(key,_366){
if(key){
_360[key]=_366;
}else{
throw "No such preference.";
}
};
function debug(_367){
var _368=_367?"Persisted preferences":"No persisted preferences. Using defaults";
_368+=":\n";
for(var key in _360){
var pref=_360[key];
_368+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_35f.fine(_368);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _36d=null;
if(this.isInitialized==true){
if(this._persistance){
var _36e=this._persistance[id];
if(_36e){
_36d=_36e[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _36d;
},setPersistedProperty:function(id,prop,_371){
if(this.isInitialized==true){
if(this._persistance){
if(_371!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_371);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_372){
switch(_372){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _373=top.bindingMap.persistance;
_373.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _374=top.bindingMap.persistance;
var map=_374.getPersistanceMap();
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
function StandardEventHandler(doc,_377){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_377;
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
var _37b={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_37b);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_37b);
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
var _382=UserInterface.getBinding(node);
if(_382!=null){
_382.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_382!=null?null:node.parentNode;
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
var _385=Application.trackMousePosition(e);
if(_385){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_387){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_387){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_387=true;
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
if(!StandardEventHandler.isBackAllowed){
DOMEvents.preventDefault(e);
}
}
var _388=KeySetBinding.handleKey(this._contextDocument,e);
if(!_388){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _389=this._contextWindow.frameElement;
if(_389!=null){
var _38a=DOMUtil.getParentWindow(_389);
if(_38a.standardEventHandler!=null){
_38a.standardEventHandler._handleKeyDown(e,_387);
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
var _38d=false;
var _38e=DOMEvents.getTarget(e);
var name=_38e.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_38d=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_38d;
}
if(_38d){
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
StandardEventHandler.prototype.enableNativeKeys=function(_391){
this._isAllowTabs=(_391==true?true:false);
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
function Action(_394,type){
this.target=_394;
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
function Animation(_396){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _397 in _396){
this[_397]=_396[_397];
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
Animation.prototype.onstart=function(_39b){
};
Animation.prototype.onstep=function(_39c){
};
Animation.prototype.onstop=function(_39d){
};
Point.isEqual=function(p1,p2){
var _3a0=false;
if(p1&&p2){
_3a0=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a0;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3a5=false;
if(dim1&&dim2){
_3a5=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3a5;
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
function BindingAcceptor(_3ac){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3ac;
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
var _3ad=new List(this._binding.dragAccept.split(" "));
while(_3ad.hasNext()){
var type=_3ad.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3af,arg){
var type=arg;
try{
switch(_3af){
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
function BindingBoxObject(_3b4){
this._domElement=_3b4.getBindingElement();
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
function BindingDragger(_3b6){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3b6;
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
BindingDragger.prototype.registerHandler=function(_3b8){
if(Interfaces.isImplemented(IDragHandler,_3b8)==true){
this.handler=_3b8;
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
var _3bb=e.button==(e.target?0:1);
if(_3bb){
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
var _3bd=Application.getMousePosition();
var dx=_3bd.x-this.startPoint.x;
var dy=_3bd.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c0,e){
switch(_3c0){
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
function BindingParser(_3c2){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3c2;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3c3){
var _3c4=new List();
var xml=BindingParser.XML.replace("${markup}",_3c3);
var doc=XMLParser.parse(_3c3);
if(doc){
var _3c7=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3c7);
var node=_3c7.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3c4.add(node);
}
node=node.nextSibling;
}
}
return _3c4;
};
BindingParser.prototype._iterate=function(_3c9,_3ca){
var _3cb=null;
switch(_3c9.nodeType){
case Node.ELEMENT_NODE:
_3cb=this._cloneElement(_3c9);
UserInterface.registerBinding(_3cb);
break;
case Node.TEXT_NODE:
_3cb=this._ownerDocument.createTextNode(_3c9.nodeValue);
break;
}
if(_3cb){
_3ca.appendChild(_3cb);
}
if(_3cb&&_3c9.hasChildNodes()){
var _3cc=_3c9.firstChild;
while(_3cc){
this._iterate(_3cc,_3cb);
_3cc=_3cc.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3cd){
var _3ce=DOMUtil.createElementNS(_3cd.namespaceURI?_3cd.namespaceURI:Constants.NS_XHTML,_3cd.nodeName,this._ownerDocument);
var i=0;
while(i<_3cd.attributes.length){
var attr=_3cd.attributes.item(i++);
_3ce.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3ce;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3d1){
var _3d2=null;
var _3d3=false;
var _3d4=_3d1.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d1)){
var _3d5=UserInterface.getBinding(_3d1);
_3d3=BindingSerializer.activeInstance.indexBinding(_3d5);
if(_3d3){
_3d2=_3d5.key;
_3d1.setAttribute(BindingSerializer.KEYPOINTER,_3d2);
}
}
_3d2=_3d2?_3d2:_3d4;
var _3d6=new List(_3d1.childNodes);
_3d6.each(function(_3d7){
if(_3d7.nodeType==Node.ELEMENT_NODE){
_3d7.setAttribute(BindingSerializer.KEYPOINTER,_3d2);
}
});
if(_3d3){
BindingSerializer.activeInstance.append(_3d2,_3d4);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3d8){
BindingSerializer.activeInstance=this;
_3d8.bindingWindow.ElementIterator.iterate(_3d8.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3d9){
var _3da=false;
var _3db=_3d9.serialize();
if(_3db!=false){
_3da=true;
var _3dc="ui:"+DOMUtil.getLocalName(_3d9.bindingElement);
var _3dd=DOMUtil.createElementNS(Constants.NS_UI,_3dc,this._dom);
this._pointers[_3d9.key]=_3dd;
for(var prop in _3db){
if(_3db[prop]!=null){
_3dd.setAttribute(prop,String(_3db[prop]));
}
}
}
return _3da;
};
BindingSerializer.prototype.append=function(_3df,_3e0){
var _3e1=this._pointers[_3df];
var _3e2=_3e0?this._pointers[_3e0]:this._dom;
_3e2.appendChild(_3e1);
};
function ImageProfile(_3e3){
this._default=_3e3.image;
this._hover=_3e3.imageHover;
this._active=_3e3.imageActive;
this._disabled=_3e3.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3e4){
this._default=_3e4;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3e5){
this._hover=_3e5;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3e6){
this._active=_3e6;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3e7){
this._disabled=_3e7;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3e8,_3e9,_3ea){
var _3eb=null;
if(_3e8.isAttached){
_3eb=new List();
var _3ec=_3ea?_3e8.getChildElementsByLocalName(_3e9):_3e8.getDescendantElementsByLocalName(_3e9);
_3ec.each(function(_3ed){
var _3ee=UserInterface.getBinding(_3ed);
if(_3ee){
_3eb.add(_3ee);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3e8.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3eb;
},getAncestorBindingByType:function(_3f0,impl,_3f2){
var _3f3=null;
if(Binding.exists(_3f0)){
var node=_3f0.bindingElement;
while(_3f3==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3f5=UserInterface.getBinding(node);
if(_3f5 instanceof impl){
_3f3=_3f5;
}
}else{
if(_3f2&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3f3;
},getAncestorBindingByLocalName:function(_3f7,_3f8,_3f9){
var _3fa=null;
if(_3f8=="*"){
var node=_3f7.bindingElement;
while(!_3fa&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3fa=UserInterface.getBinding(node);
}
}
}else{
_3fa=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3f8,_3f7.bindingElement,_3f9));
}
return _3fa;
},getChildElementsByLocalName:function(_3fc,_3fd){
var _3fe=new List();
var _3ff=new List(_3fc.bindingElement.childNodes);
_3ff.each(function(_400){
if(_400.nodeType==Node.ELEMENT_NODE){
if(_3fd=="*"||DOMUtil.getLocalName(_400)==_3fd){
_3fe.add(_400);
}
}
});
return _3fe;
},getChildBindingByType:function(_401,impl){
var _403=null;
_401.getChildElementsByLocalName("*").each(function(_404){
var _405=UserInterface.getBinding(_404);
if(_405!=null&&_405 instanceof impl){
_403=_405;
return false;
}else{
return true;
}
});
return _403;
},getDescendantBindingByType:function(_406,impl){
var _408=null;
_406.getDescendantElementsByLocalName("*").each(function(_409){
var _40a=UserInterface.getBinding(_409);
if(_40a!=null&&_40a instanceof impl){
_408=_40a;
return false;
}else{
return true;
}
});
return _408;
},getDescendantBindingsByType:function(_40b,impl){
var _40d=new List();
_40b.getDescendantElementsByLocalName("*").each(function(_40e){
var _40f=UserInterface.getBinding(_40e);
if(_40f!=null&&_40f instanceof impl){
_40d.add(_40f);
}
return true;
});
return _40d;
},getNextBindingByLocalName:function(_410,name){
var _412=null;
var _413=_410.bindingElement;
while((_413=DOMUtil.getNextElementSibling(_413))!=null&&DOMUtil.getLocalName(_413)!=name){
}
if(_413!=null){
_412=UserInterface.getBinding(_413);
}
return _412;
},getPreviousBindingByLocalName:function(_414,name){
var _416=null;
var _417=_414.bindingElement;
while((_417=DOMUtil.getPreviousElementSibling(_417))!=null&&DOMUtil.getLocalName(_417)!=name){
}
if(_417!=null){
_416=UserInterface.getBinding(_417);
}
return _416;
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
},addFilter:function(_418){
this._filters.add(_418);
},removeFilter:function(_419){
var _41a=-1;
this._filters.each(function(fil){
_41a++;
var _41c=true;
if(fil==_419){
_41c=false;
}
return _41c;
});
if(_41a>-1){
this._filters.del(_41a);
}
},_applyFilters:function(node,arg){
var _41f=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _422=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _423=true;
while(this._filters.hasNext()&&_423==true){
var _424=this._filters.getNext();
var res=_424.call(this,node,arg);
if(res!=null){
_41f=res;
switch(res){
case stop:
case skip:
case skip+_422:
_423=false;
break;
}
}
}
return _41f;
},crawl:function(_426,arg){
this.contextDocument=_426.ownerDocument;
this.onCrawlStart();
var _428=this.type==NodeCrawler.TYPE_ASCENDING;
var _429=this._applyFilters(_426,arg);
if(_429!=NodeCrawler.STOP_CRAWLING){
if(_428&&_429==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_428?_426.parentNode:_426;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_42b,arg){
var _42d=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_42d=this._crawlDescending(_42b,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_42d=this._crawlAscending(_42b,arg);
break;
}
return _42d;
},_crawlDescending:function(_42e,arg){
var skip=NodeCrawler.SKIP_NODE;
var _431=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _433=null;
if(_42e.hasChildNodes()){
var node=_42e.firstChild;
while(node!=null&&_433!=stop){
this.currentNode=node;
_433=this._applyFilters(node,arg);
switch(_433){
case stop:
case _431:
case skip+_431:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_433=stop;
break;
}
}
}
if(_433!=stop&&_433!=skip){
this.previousNode=node;
}
break;
}
if(_433!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _433;
},_crawlAscending:function(_436,arg){
var _438=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_436!=null){
this.currentNode=_436;
_438=this._applyFilters(_436,arg);
if(_438!=stop){
var next=this.nextNode?this.nextNode:_436.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_436;
_438=this._crawl(next,arg);
}
}
}else{
_438=stop;
}
return _438;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _43c in this){
this[_43c]=null;
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
var _43f=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_43f=NodeCrawler.SKIP_NODE;
}
return _43f;
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
this.addFilter(function(_440,arg){
var _442=null;
if(!UserInterface.hasBinding(_440)){
_442=NodeCrawler.SKIP_NODE;
}
return _442;
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
this.addFilter(function(_444,arg){
var _446=null;
var _447=UserInterface.getBinding(_444);
if(Interfaces.isImplemented(ICrawlerHandler,_447)==true){
self.response=null;
_447.handleCrawler(self);
_446=self.response;
}
return _446;
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
this.addFilter(function(_449,list){
var _44b=null;
var _44c=UserInterface.getBinding(_449);
if(Interfaces.isImplemented(IFlexible,_44c)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_44c);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_44c.isFlexSuspended==true){
_44b=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_44c);
}
break;
}
}
return _44b;
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
this.addFilter(function(_44d,list){
var _44f=null;
var _450=UserInterface.getBinding(_44d);
if(_450.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_450)==true){
if(_450.isFocusable&&_450.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_450);
break;
case FocusCrawler.MODE_FOCUS:
if(!_450.isFocused){
_450.focus();
}
_44f=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_450.isFocused==true){
_450.blur();
_44f=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _44f;
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
this.addFilter(function(_451,list){
var _453=null;
var _454=UserInterface.getBinding(_451);
if(!_454.isVisible){
_453=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _453;
});
this.addFilter(function(_455,list){
var _457=null;
var _458=UserInterface.getBinding(_455);
if(_458.isAttached){
if(Interfaces.isImplemented(IFit,_458)){
if(!_458.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_458);
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
UpdateAssistant.serialize=function(_459){
_459=_459.cloneNode(true);
_459.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_459.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_459);
};
}
},handleEvent:function(e){
var _45b=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_45b);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_45b);
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
},_beforeUpdate:function(_45c){
var _45d=(_45c==document.documentElement);
if(_45d){
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
var _460=FocusBinding.focusedBinding;
if(_460!=null){
this._focusID=_460.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_45c.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_45c);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_45c,false);
break;
}
}
},_afterUpdate:function(_461){
var _462=(_461==document.documentElement);
if(_462){
var _463=this._elementsbuffer;
if(_463.hasEntries()){
_463.each(function(_464){
DocumentManager.attachBindings(_464);
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
var _467=FocusBinding.focusedBinding;
if(_467==null){
var _468=document.getElementById(this._focusID);
if(_468!=null){
var _467=UserInterface.getBinding(_468);
if(_467!=null){
_467.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _469=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _46a="NEW DOM: "+document.title+"\n\n"+_469+"\n\n";
_46a+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_46a);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_461.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_461.__isAttached!==false){
this._elementsbuffer.add(_461);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_461,true);
break;
}
switch(_461.id){
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
var _467=UserInterface.getBinding(_461);
while(_467==null&&_461!=null){
_467=UserInterface.getBinding(_461);
_461=_461.parentNode;
}
if(_467!=null){
_467.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_46c,_46d){
var _46e=UserInterface.getBinding(_46c);
if(_46e!=null){
if(_46d){
var _46f=this._attributesbuffer;
var map=new Map();
_46f.each(function(name,old){
var now=_46c.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_46c.attributes).each(function(att){
if(att.specified){
if(!_46f.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_476){
var _477=_46e.propertyMethodMap[name];
if(_477!=null){
_477.call(_46e,_476);
}
});
}else{
var map=new Map();
new List(_46c.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_479,_47a){
var _47b=window.bindingMap[_479.getAttribute("id")];
if(_47b!=null){
return _47b.handleElement(_479,_47a);
}
},updateElement:function(_47c,_47d){
var _47e=window.bindingMap[_47c.getAttribute("id")];
if(_47e!=null){
return _47e.updateElement(_47c,_47d);
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
this.addFilter(function(_480,list){
var _482=UserInterface.getBinding(_480);
var _483=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_482==null){
UserInterface.registerBinding(_480);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_482!=null){
if(!_482.isAttached){
list.add(_482);
}
if(_482.isLazy==true){
_483=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_482!=null){
list.add(_482);
}
break;
}
return _483;
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
},handleBroadcast:function(_484,arg){
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
var _487=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_487)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_487!=null){
if(_487.href!=null&&_487.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _488=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_488!=null){
var map={};
var _48a=DOMUtil.getElementsByTagName(_488,"bindingmapping");
new List(_48a).each(function(_48b){
var _48c=_48b.getAttribute("element");
var _48d=_48b.getAttribute("binding");
map[_48c]=eval(_48d);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_48e){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_48e;
}else{
this.customUserInterfaceMapping.merge(_48e);
}
},_registerBindings:function(_48f){
var _490=new DocumentCrawler();
_490.mode=DocumentCrawler.MODE_REGISTER;
_490.crawl(_48f);
_490.dispose();
},_attachBindings:function(_491){
var _492=new DocumentCrawler();
_492.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_492.crawl(_491,list);
var _494=false;
while(list.hasNext()){
var _495=list.getNext();
if(!_495.isAttached){
_495.onBindingAttach();
if(!_495.memberDependencies){
_495.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_495)){
_494=true;
}
}
}
if(_494){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_492.dispose();
list.dispose();
},attachBindings:function(_497){
this._registerBindings(_497);
this._attachBindings(_497);
},detachBindings:function(_498,_499){
var _49a=new DocumentCrawler();
_49a.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_49a.crawl(_498,list);
if(_499==true){
list.extractFirst();
}
var _49c=false;
list.reverse().each(function(_49d){
if(Interfaces.isImplemented(IData,_49d)){
_49c=true;
}
_49d.dispose(true);
});
if(_49c){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49a.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_49f){
return (/textarea|input/.test(DOMUtil.getLocalName(_49f)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a0){
this.isDirty=true;
var _4a1=false;
if(_4a0!=null&&!_4a0.isDirty){
_4a0.isDirty=true;
_4a0.dispatchAction(Binding.ACTION_DIRTY);
_4a1=true;
}
return _4a1;
},clean:function(_4a2){
if(_4a2.isDirty){
_4a2.isDirty=false;
}
},registerDataBinding:function(name,_4a4){
if(Interfaces.isImplemented(IData,_4a4,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4a4;
}
}else{
throw "Invalid DataBinding: "+_4a4;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4a7=null;
if(this._dataBindings[name]!=null){
_4a7=this._dataBindings[name];
}
return _4a7;
},getAllDataBindings:function(_4a8){
var list=new List();
for(var name in this._dataBindings){
var _4ab=this._dataBindings[name];
list.add(_4ab);
if(_4a8&&_4ab instanceof WindowBinding){
var _4ac=_4ab.getContentWindow().DataManager;
if(_4ac!=null){
list.merge(_4ac.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4ad=false;
for(var name in this._dataBindings){
_4ad=true;
break;
}
return _4ad;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4b1){
var _4b2=this._dataBindings[name];
if(_4b2!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4b2.setResult(_4b1);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4b2);
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
var _4b3=new DataBindingMap();
_4b3.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4b5=this._dataBindings[name];
if(_4b5 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4b3[name]=_4b5.getValue();
}
return _4b3;
},getDataBindingResultMap:function(){
var _4b6=new DataBindingMap();
_4b6.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4b8=this._dataBindings[name];
var res=_4b8.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4bb){
_4b6.set(name,_4bb);
});
}else{
_4b6.set(name,res);
}
}
return _4b6;
},getPostBackString:function(){
var _4bc="";
var form=document.forms[0];
if(form!=null){
var _4be="";
new List(form.elements).each(function(_4bf){
var name=_4bf.name;
var _4c1=encodeURIComponent(_4bf.value);
switch(_4bf.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4bc+=name+"="+_4c1+"&";
break;
case "submit":
if(document.activeElement==_4bf){
_4bc+=name+"="+_4c1+"&";
}
break;
case "radio":
if(_4bf.checked){
_4bc+=name+"="+_4c1+"&";
}
break;
case "checkbox":
if(_4bf.checked){
if(_4bf.name==_4be){
if(_4bc.lastIndexOf("&")==_4bc.length-1){
_4bc=_4bc.substr(0,_4bc.length-1);
}
_4bc+=","+_4c1;
}else{
_4bc+=name+"="+_4bf.value;
}
_4be=name;
_4bc+="&";
}
break;
}
});
}
return _4bc.substr(0,_4bc.length-1);
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
var _4ca=null;
var _4cb=null;
var _4cc=false;
if(!this._cache[name]){
_4cc=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4ce=DOMUtil.getXMLHTTPRequest();
_4ce.open("get",uri,false);
_4ce.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4ce.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4cb=_4ce.responseText;
break;
default:
_4cb=_4ce.responseXML;
break;
}
if(_4cb==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4cb;
}
}
_4cb=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4ca=_4cb;
break;
case this._modes.MODE_DOCUMENT:
_4ca=DOMUtil.cloneNode(_4cb,true);
break;
case this._modes.MODE_ELEMENT:
_4ca=DOMUtil.cloneNode(_4cb.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4ca=DOMSerializer.serialize(_4cb,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4ca=DOMSerializer.serialize(_4cb.documentElement,true);
break;
}
if(_4cc&&Application.isDeveloperMode){
}
return _4ca;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4d1){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4d1];
},invoke:function(url,_4d3,_4d4){
this._logger.error("Not implemented");
},invokeModal:function(url,_4d6,_4d7){
var _4d8=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4d6,argument:_4d7});
StageBinding.presentViewDefinition(_4d8);
return _4d8;
},invokeDefinition:function(_4d9){
if(_4d9 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4d9);
}
return _4d9;
},question:function(_4da,text,_4dc,_4dd){
if(!_4dc){
_4dc=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4da,text,_4dc,_4dd);
},message:function(_4de,text,_4e0,_4e1){
if(!_4e0){
_4e0=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4de,text,_4e0,_4e1);
},error:function(_4e2,text,_4e4,_4e5){
if(!_4e4){
_4e4=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4e2,text,_4e4,_4e5);
},warning:function(_4e6,text,_4e8,_4e9){
if(!_4e8){
_4e8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4e6,text,_4e8,_4e9);
},_standardDialog:function(type,_4eb,text,_4ed,_4ee){
var _4ef=null;
if(!_4ed){
_4ef=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4ef=new List();
new List(_4ed).each(function(_4f0){
var _4f1=null;
switch(typeof _4f0){
case "object":
_4f1=_4f0;
break;
case "string":
var _4f2=false;
if(_4f0.indexOf(":")>-1){
_4f0=_4f0.split(":")[0];
_4f2=true;
}
_4f1=Dialog.dialogButton(_4f0);
if(_4f2){
_4f1.isDefault=true;
}
break;
}
_4ef.add(_4f1);
});
}
var _4f3={title:_4eb,text:text,type:type,image:this._dialogImages[type],buttons:_4ef};
var _4f4=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4ee,argument:_4f3});
StageBinding.presentViewDefinition(_4f4);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4f6,arg){
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
},saveAll:function(_4f9){
var self=this;
var _4fb=Application.getDirtyDockTabsTabs();
if(_4fb.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_4fc,_4fd){
switch(_4fc){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_4fd,_4f9);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_4fb);
}else{
if(_4f9){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_4fe,_4ff){
var _500=false;
var list=new List();
_4fe.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_500=true;
var _504=list.getLength();
var _505={handleBroadcast:function(_506,tab){
if(--_504==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_4ff){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_505);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _500;
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
var _50a="Composite.Management.Help";
if(!StageBinding.isViewOpen(_50a)){
StageBinding.handleViewPresentation(_50a);
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
var _50c=document.createEvent("Events");
_50c.initEvent(type,true,true);
window.dispatchEvent(_50c);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function CompositeUrl(url){
var _50e=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _50f=_50e.exec(url);
if(_50f){
var _510={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_510[$1]=$3;
});
this.queryString=_510;
this.path=url.replace(/\?.*/g,"");
if(_50f[3]=="media"){
this.isMedia=true;
}else{
if(_50f[3]=="page"){
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
CompositeUrl.prototype.setParam=function(key,_518){
this.queryString[key]=_518;
};
CompositeUrl.prototype.toString=function(){
var url=this.path;
var _51a=[];
for(var key in this.queryString){
_51a.push(key+"="+this.queryString[key]);
}
if(_51a.length>0){
url+="?"+_51a.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_51c,_51d){
var _51e=null;
var _51f=ViewDefinitions[_51c];
if(_51f.isMutable){
var impl=null;
if(_51f instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_51d!=null&&impl!=null){
var def=new impl();
for(var prop in _51f){
def[prop]=ViewDefinition.cloneProperty(_51f[prop]);
}
def.handle=_51d;
_51e=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _51e;
};
ViewDefinition.cloneProperty=function(_523){
if(null==_523){
return _523;
}
if(typeof _523==="object"){
var _524=(_523.constructor===Array)?[]:{};
for(var prop in _523){
_524[prop]=ViewDefinition.cloneProperty(_523[prop]);
}
return _524;
}
return _523;
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
Binding.evaluate=function(_52b,_52c){
var _52d=null;
var _52e=_52c.bindingWindow.WindowManager;
if(_52e!=null){
var _52f=Binding.parseScriptStatement(_52b,_52c.key);
_52d=_52e.evaluate(_52f);
}
return _52d;
};
Binding.parseScriptStatement=function(_530,key){
if(_530!=null&&key!=null){
var _532="UserInterface.getBindingByKey ( \""+key+"\" )";
_530=_530.replace(/(\W|^)this(,| +|\)|;)/g,_532);
_530=_530.replace(/(\W|^)this(\.)/g,_532+".");
}
return _530;
};
Binding.exists=function(_533){
var _534=false;
try{
if(_533&&_533.bindingElement&&_533.bindingElement.nodeType&&_533.isDisposed==false){
_534=true;
}
}
catch(accessDeniedException){
_534=false;
}
finally{
return _534;
}
};
Binding.destroy=function(_535){
if(!_535.isDisposed){
if(_535.acceptor!=null){
_535.acceptor.dispose();
}
if(_535.dragger!=null){
_535.disableDragging();
}
if(_535.boxObject!=null){
_535.boxObject.dispose();
}
for(var _536 in _535.shadowTree){
var _537=_535.shadowTree[_536];
if(_537 instanceof Binding&&Binding.exists(_537)){
_537.dispose(true);
}
_535.shadowTree[_536]=null;
}
_535.isDisposed=true;
_535=null;
}
};
Binding.dotnetify=function(_538,_539){
var _53a=_538.getCallBackID();
if(_53a!=null){
var _53b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_538.bindingDocument);
_53b.type="hidden";
_53b.id=_53a;
_53b.name=_53a;
_53b.value=_539!=null?_539:"";
_538.bindingElement.appendChild(_53b);
_538.shadowTree.dotnetinput=_53b;
}else{
throw _538.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_53c){
var _53d=_53c.getProperty("image");
var _53e=_53c.getProperty("image-hover");
var _53f=_53c.getProperty("image-active");
var _540=_53c.getProperty("image-disabled");
if(_53c.imageProfile==null){
if(_53c.image==null&&_53d!=null){
_53c.image=_53d;
}
if(_53c.imageHover==null&&_53e!=null){
_53c.imageHover=_53d;
}
if(_53c.imageActive==null&&_53f!=null){
_53c.imageActive=_53f;
}
if(_53c.imageDisabled==null&&_540!=null){
_53c.imageDisabled=_540;
}
if(_53c.image||_53c.imageHover||_53c.imageActive||_53c.imageDisabled){
_53c.imageProfile=new ImageProfile(_53c);
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
var _542=this.dependentBindings[key];
_542.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_543){
if(_543){
this.memberDependencies[_543.key]=true;
var _544=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_544=false;
break;
}
}
if(_544){
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
Binding.prototype.detachRecursive=function(_546){
if(_546==null){
_546=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_546);
};
Binding.prototype.addMember=function(_547){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_547.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_547.key]=false;
_547.registerDependentBinding(this);
}
}
return _547;
};
Binding.prototype.addMembers=function(_548){
while(_548.hasNext()){
var _549=_548.getNext();
if(!_549.isInitialized){
this.addMember(_549);
}
}
return _548;
};
Binding.prototype.registerDependentBinding=function(_54a){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_54a.key]=_54a;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _54b=this.getProperty("persist");
if(_54b&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _54d=new List(_54b.split(" "));
while(_54d.hasNext()){
var prop=_54d.getNext();
var _54f=Persistance.getPersistedProperty(id,prop);
if(_54f!=null){
this._persist[prop]=_54f;
this.setProperty(prop,_54f);
}else{
_54f=this.getProperty(prop);
if(_54f!=null){
this._persist[prop]=_54f;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _550=this.getProperty("disabled");
var _551=this.getProperty("contextmenu");
var _552=this.getProperty("observes");
var _553=this.getProperty("onattach");
var _554=this.getProperty("hidden");
var _555=this.getProperty("blockactionevents");
if(_554==true&&this.isVisible==true){
this.hide();
}
if(_550&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_551){
this.setContextMenu(_551);
}
if(_552){
this.observe(this.getBindingForArgument(_552));
}
if(_555==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_553!=null){
Binding.evaluate(_553,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _557=this.getProperty("draggable");
var _558=this.getProperty("dragtype");
var _559=this.getProperty("dragaccept");
var _55a=this.getProperty("dragreject");
if(_557!=null){
this.isDraggable=_557;
}
if(_558!=null){
this.dragType=_558;
if(_557!=false){
this.isDraggable=true;
}
}
if(_559!=null){
this.dragAccept=_559;
}
if(_55a!=null){
this.dragReject=_55a;
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
Binding.prototype._updateBindingMap=function(_55b){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _55e=null;
if(_55b){
_55e=map[id];
if(_55e!=null&&_55e!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_55e=map[id];
if(_55e!=null&&_55e==this){
delete map[id];
}
}
}else{
var _560=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_55b);
if(Application.isDeveloperMode==true){
alert(_560);
}else{
this.logger.error(_560);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_562){
};
Binding.prototype.handleBroadcast=function(_563,arg){
};
Binding.prototype.handleElement=function(_565){
return false;
};
Binding.prototype.updateElement=function(_566){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _568=null;
switch(typeof arg){
case "object":
_568=arg;
break;
case "string":
_568=this.bindingDocument.getElementById(arg);
if(_568==null){
_568=Binding.evaluate(arg,this);
}
break;
}
if(_568!=null&&_568.nodeType!=null){
_568=UserInterface.getBinding(_568);
}
return _568;
};
Binding.prototype.serialize=function(){
var _569={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_569.id=id;
}
var _56b=this.getProperty("binding");
if(_56b){
_569.binding=_56b;
}
return _569;
};
Binding.prototype.serializeToString=function(){
var _56c=null;
if(this.isAttached){
_56c=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _56c;
};
Binding.prototype.subTreeFromString=function(_56d){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_56d);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_56e){
var _56f=this.bindingElement.getAttribute(_56e);
if(_56f){
_56f=Types.castFromString(_56f);
}
return _56f;
};
Binding.prototype.setProperty=function(prop,_571){
if(_571!=null){
_571=_571.toString();
if(String(this.bindingElement.getAttribute(prop))!=_571){
this.bindingElement.setAttribute(prop,_571);
if(this.isAttached==true){
if(Persistance.isEnabled&&_571!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_571;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_571);
}
}
var _572=this.propertyMethodMap[prop];
if(_572){
_572.call(this,this.getProperty(prop));
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
var _574=null;
if(Binding.exists(this)){
_574=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _574;
};
Binding.prototype.attachClassName=function(_575){
CSSUtil.attachClassName(this.bindingElement,_575);
};
Binding.prototype.detachClassName=function(_576){
CSSUtil.detachClassName(this.bindingElement,_576);
};
Binding.prototype.hasClassName=function(_577){
return CSSUtil.hasClassName(this.bindingElement,_577);
};
Binding.prototype.addActionListener=function(type,_579){
_579=_579!=null?_579:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_579)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_579);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_579+")");
}
};
Binding.prototype.removeActionListener=function(type,_57b){
_57b=_57b?_57b:this;
if(Action.isValid(type)){
var _57c=this.actionListeners[type];
if(_57c){
var i=0,_57e;
while((_57e=_57c[i])!=null){
if(_57e==_57b){
_57c.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_580){
_580=_580?_580:this;
DOMEvents.addEventListener(this.bindingElement,type,_580);
};
Binding.prototype.removeEventListener=function(type,_582){
_582=_582?_582:this;
DOMEvents.removeEventListener(this.bindingElement,type,_582);
};
Binding.prototype.subscribe=function(_583){
if(!this.hasSubscription(_583)){
this._subscriptions.set(_583,true);
EventBroadcaster.subscribe(_583,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_583);
}
};
Binding.prototype.unsubscribe=function(_584){
if(this.hasSubscription(_584)){
this._subscriptions.del(_584);
EventBroadcaster.unsubscribe(_584,this);
}
};
Binding.prototype.hasSubscription=function(_585){
return this._subscriptions.has(_585);
};
Binding.prototype.observe=function(_586,_587){
_586.addObserver(this,_587);
};
Binding.prototype.unObserve=function(_588,_589){
_588.removeObserver(this,_589);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _58e={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_58e);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_58e);
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
var _590=null;
var _591=null;
var _592=false;
if(arg instanceof Action){
_590=arg;
}else{
if(Action.isValid(arg)){
_590=new Action(this,arg);
_592=true;
}
}
if(_590!=null&&Action.isValid(_590.type)==true){
if(_590.isConsumed==true){
_591=_590;
}else{
var _593=this.actionListeners[_590.type];
if(_593!=null){
_590.listener=this;
var i=0,_595;
while((_595=_593[i++])!=null){
if(_595&&_595.handleAction){
_595.handleAction(_590);
}
}
}
var _596=true;
if(this.isBlockingActions==true){
switch(_590.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_592){
_596=false;
}
break;
}
}
if(_596){
_591=this.migrateAction(_590);
}else{
_591=_590;
}
}
}
return _591;
};
Binding.prototype.migrateAction=function(_597){
var _598=null;
var _599=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_598&&node.nodeType!=Node.DOCUMENT_NODE){
_598=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_598){
_599=_598.dispatchAction(_597);
}else{
_599=_597;
}
}
return _599;
};
Binding.prototype.reflex=function(_59b){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_59b);
}
};
Binding.prototype.getMigrationParent=function(){
var _59c=null;
if(true){
try{
var _59d=this.bindingElement.parentNode;
if(_59d!=null){
_59c=_59d;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_59c=null;
}
}
return _59c;
};
Binding.prototype.add=function(_59e){
if(_59e.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_59e.bindingElement);
}else{
throw "Could not add "+_59e.toString()+" of different document origin.";
}
return _59e;
};
Binding.prototype.addFirst=function(_59f){
if(_59f.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_59f.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_59f.toString()+" of different document origin.";
}
return _59f;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5a0,_5a1){
return BindingFinder.getAncestorBindingByLocalName(this,_5a0,_5a1);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5a3){
return BindingFinder.getAncestorBindingByType(this,impl,_5a3);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5a5){
return BindingFinder.getChildElementsByLocalName(this,_5a5);
};
Binding.prototype.getChildElementByLocalName=function(_5a6){
return this.getChildElementsByLocalName(_5a6).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5a7){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5a7));
};
Binding.prototype.getChildBindingsByLocalName=function(_5a8){
return this.getDescendantBindingsByLocalName(_5a8,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5a9){
return this.getChildBindingsByLocalName(_5a9).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5aa,_5ab){
return BindingFinder.getDescendantBindingsByLocalName(this,_5aa,_5ab);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5ac){
return this.getDescendantBindingsByLocalName(_5ac,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5af){
return BindingFinder.getNextBindingByLocalName(this,_5af);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5b0){
return BindingFinder.getPreviousBindingByLocalName(this,_5b0);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5b1){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5b1);
};
Binding.prototype.isFirstBinding=function(_5b2){
return (this.getOrdinalPosition(_5b2)==0);
};
Binding.prototype.isLastBinding=function(_5b3){
return DOMUtil.isLastElement(this.bindingElement,_5b3);
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
Binding.prototype.setCallBackArg=function(_5b5){
this.setProperty(Binding.CALLBACKARG,_5b5);
};
Binding.prototype.dispose=function(_5b6){
if(!this.isDisposed){
if(!_5b6){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5b7=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5b7){
if(Client.isExplorer){
_5b7.outerHTML="";
}else{
_5b7.parentNode.removeChild(_5b7);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5ba){
list.add(_5ba);
});
list.each(function(_5bb){
self.unsubscribe(_5bb);
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
Binding.prototype.wakeUp=function(_5bd,_5be){
_5be=_5be?_5be:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5bd!==undefined){
self[_5bd]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5be);
},0);
}
};
Binding.prototype.handleCrawler=function(_5c0){
if(_5c0.response==null&&this.isLazy==true){
if(_5c0.id==DocumentCrawler.ID&&_5c0.mode==DocumentCrawler.MODE_REGISTER){
_5c0.response=NodeCrawler.NORMAL;
}else{
_5c0.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5c0.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5c0.id)){
_5c0.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5c0.response==null){
switch(_5c0.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5c0.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5c1){
var _5c2=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5c1);
return UserInterface.registerBinding(_5c2,Binding);
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
var _5c3=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5c3.each(function(_5c4){
DataBinding.expressions[_5c4.Key]=new RegExp(_5c4.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5c5){
var _5c6=null;
var _5c7=_5c5.getAncestorBindingByLocalName("field");
if(_5c7&&_5c7 instanceof FieldBinding){
var desc=_5c7.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5c6=desc.getLabel();
}
}
return _5c6;
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
var _5ca=this.bindingWindow.DataManager;
_5ca.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5cc=this.bindingWindow.DataManager;
if(_5cc.getDataBinding(name)){
_5cc.unRegisterDataBinding(name);
}
_5cc.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5cd,arg){
RootBinding.superclass.handleBroadcast.call(this,_5cd,arg);
var _5cf=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5cd){
case _5cf:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5cf);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5d0){
var _5d1=_5d0?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5d0!=this.isActivated){
this.isActivated=_5d0;
this.dispatchAction(_5d1);
var _5d2=new List();
var self=this;
this._activationawares.each(function(_5d4){
if(_5d4.isActivationAware){
try{
if(_5d0){
if(!_5d4.isActivated){
_5d4.onActivate();
}
}else{
if(_5d4.isActivated){
_5d4.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5d2.add(_5d4);
}
}
});
_5d2.each(function(_5d5){
this._activationawares.del(_5d5);
});
_5d2.dispose();
}else{
var _5d6="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5d6);
}else{
this.logger.error(_5d6);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5d7,_5d8){
if(Interfaces.isImplemented(IActivationAware,_5d7,true)==true){
if(_5d8==false){
this._activationawares.del(_5d7);
}else{
this._activationawares.add(_5d7);
if(this.isActivated==true){
_5d7.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5d7+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5d9){
var _5da=this.getMigrationParent();
if(_5da!=null){
var root=_5da.ownerDocument.body;
var _5dc=UserInterface.getBinding(root);
if(_5dc!=null){
_5dc.makeActivationAware(this,_5d9);
}
}
};
RootBinding.prototype.handleCrawler=function(_5dd){
RootBinding.superclass.handleCrawler.call(this,_5dd);
if(_5dd.type==NodeCrawler.TYPE_ASCENDING){
_5dd.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5de=null;
if(this.bindingWindow.parent){
_5de=this.bindingWindow.frameElement;
}
return _5de;
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
var _5df=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5df.hasNext()){
var cell=_5df.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5e1){
var _5e2=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5e1.bindingElement);
_5e2=_5e1;
}else{
_5e2=MatrixBinding.superclass.add.call(this,_5e1);
}
return _5e2;
};
MatrixBinding.prototype.addFirst=function(_5e3){
var _5e4=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5e5=this.shadowTree[MatrixBinding.CENTER];
_5e5.insertBefore(_5e3.bindingElement,_5e5.firstChild);
_5e4=_5e3;
}else{
_5e4=MatrixBinding.superclass.addFirst.call(this,_5e3);
}
return _5e3;
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
MatrixBinding.newInstance=function(_5e7){
var _5e8=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5e7);
return UserInterface.registerBinding(_5e8,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5e9,_5ea){
var list=new List();
var _5ec=new FlexBoxCrawler();
_5ec.mode=_5ea?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5ec.startBinding=_5e9;
_5ec.crawl(_5e9.bindingElement,list);
list.each(function(_5ed){
_5ed.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5ee){
if(Binding.exists(_5ee)){
_5ee.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5ef){
if(Binding.exists(_5ef)){
_5ef.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5ec.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5f0){
FlexBoxBinding.superclass.handleAction.call(this,_5f0);
switch(_5f0.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5f1){
var _5f2=0;
var _5f3=new List(this.bindingElement.parentNode.childNodes);
while(_5f3.hasNext()){
var _5f4=_5f3.getNext();
if(_5f4.nodeType==Node.ELEMENT_NODE&&_5f4!=this.bindingElement){
if(!this._isOutOfFlow(_5f4)){
var rect=_5f4.getBoundingClientRect();
if(_5f1){
height+=(rect.right-rect.left);
}else{
_5f2+=(rect.bottom-rect.top);
}
}
}
}
return _5f2;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5f6){
var _5f7=CSSComputer.getPosition(_5f6);
var _5f8=CSSComputer.getFloat(_5f6);
return (_5f7=="absolute"||_5f8!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5f9=this.bindingElement.parentNode;
var rect=_5f9.getBoundingClientRect();
var _5fb=rect.bottom-rect.top;
var _5fc=CSSComputer.getPadding(_5f9);
var _5fd=CSSComputer.getBorder(_5f9);
_5fb-=(_5fc.top+_5fc.bottom);
_5fb-=(_5fd.top+_5fd.bottom);
return _5fb;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5fe=this.bindingElement.parentNode;
var rect=_5fe.getBoundingClientRect();
var _600=rect.right-rect.left;
var _601=CSSComputer.getPadding(_5fe);
var _602=CSSComputer.getBorder(_5fe);
_600-=(_601.left+_601.right);
_600-=(_602.left+_602.right);
return _600;
};
FlexBoxBinding.prototype.setFlexibility=function(_603){
if(_603!=this.isFlexible){
if(_603){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_603;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _604=this._getSiblingsSpan();
_604=this._getCalculatedHeight()-_604;
if(!isNaN(_604)&&_604>=0){
if(_604!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_604)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_605){
if(!this.isFit||_605){
var _606=0;
new List(this.bindingElement.childNodes).each(function(_607){
if(_607.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_607)){
var rect=_607.getBoundingClientRect();
_606+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_606);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_609){
var _60a=CSSComputer.getPadding(this.bindingElement);
var _60b=CSSComputer.getBorder(this.bindingElement);
_609+=_60a.top+_60a.bottom;
_609+=_60b.top+_60b.bottom;
this.bindingElement.style.height=_609+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_60c){
ScrollBoxBinding.superclass.handleAction.call(this,_60c);
switch(_60c.type){
case BalloonBinding.ACTION_INITIALIZE:
_60c.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_60d){
this.bindingElement.scrollLeft=_60d.x;
this.bindingElement.scrollTop=_60d.y;
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
var _60e=this._getBuildElement("labeltext");
if(_60e){
this.shadowTree.labelText=_60e;
this.shadowTree.text=_60e.firstChild;
this.hasLabel=true;
}
}else{
var _60f=this.getProperty("label");
var _610=this.getProperty("image");
var _611=this.getProperty("tooltip");
if(_60f){
this.setLabel(_60f,false);
}
if(_610){
this.setImage(_610,false);
}
if(_611){
this.setToolTip(_611);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_612,_613){
_612=_612!=null?_612:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_612);
this.setProperty("label",_612);
if(!_613){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_615){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_615){
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
LabelBinding.prototype.setToolTip=function(_618){
this.setProperty("tooltip",_618);
if(_618!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_618));
}
};
LabelBinding.prototype.getToolTip=function(_619){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_61a){
_61a=_61a==null?true:_61a;
var _61b=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_61a;
if(_61a){
this.attachClassName(_61b);
}else{
this.detachClassName(_61b);
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
var _61c="textonly";
var _61d="imageonly";
var _61e="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_61c);
this.detachClassName(_61d);
this.attachClassName(_61e);
}else{
if(this.hasLabel){
this.detachClassName(_61e);
this.detachClassName(_61d);
this.attachClassName(_61c);
}else{
if(this.hasImage){
this.detachClassName(_61e);
this.detachClassName(_61c);
this.attachClassName(_61d);
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
LabelBinding.newInstance=function(_61f){
var _620=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_61f);
return UserInterface.registerBinding(_620,LabelBinding);
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
var _621=this.getProperty("label");
if(!_621){
_621=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_621));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_623){
this.setProperty("label",_623);
};
TextBinding.newInstance=function(_624){
var _625=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_624);
return UserInterface.registerBinding(_625,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_626,_627){
BroadcasterBinding.superclass.setProperty.call(this,_626,_627);
function update(list){
if(list){
list.each(function(_629){
_629.setProperty(_626,_627);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _62a=this._observers[_626];
if(_62a){
update(_62a);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_62b){
BroadcasterBinding.superclass.deleteProperty.call(this,_62b);
function update(list){
if(list){
list.each(function(_62d){
_62d.deleteProperty(_62b);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _62e=this._observers[_62b];
if(_62e){
update(_62e);
}
};
BroadcasterBinding.prototype.addObserver=function(_62f,_630){
_630=_630?_630:"*";
_630=new List(_630.split(" "));
while(_630.hasNext()){
var _631=_630.getNext();
switch(_631){
case "*":
this._setAllProperties(_62f);
break;
default:
var _632=this.getProperty(_631);
_62f.setProperty(_631,_632);
break;
}
if(!this._observers[_631]){
this._observers[_631]=new List();
}
this._observers[_631].add(_62f);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_633){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _636=att.nodeName;
switch(_636){
case "id":
case "key":
break;
default:
var _637=this.getProperty(_636);
_633.setProperty(_636,_637);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_638,_639){
_639=_639?_639:"*";
_639=new List(_639.split(" "));
while(_639.hasNext()){
var list=this._observers[_639.getNext()];
if(list){
while(list.hasNext()){
var _63b=list.getNext();
if(_63b==_638){
list.del(_63b);
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
BroadcasterBinding.prototype.setDisabled=function(_63c){
this.setProperty("isdisabled",_63c);
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
var _63e=this.getProperty("width");
var _63f=this.getProperty("label");
var type=this.getProperty("type");
var _641=this.getProperty("popup");
var _642=this.getProperty("tooltip");
var _643=this.getProperty("isdisabled");
var _644=this.getProperty("response");
var _645=this.getProperty("oncommand");
var _646=this.getProperty("value");
var _647=this.getProperty("ischecked");
var _648=this.getProperty("callbackid");
var _649=this.getProperty("focusable");
var _64a=this.getProperty("focused");
var _64b=this.getProperty("default");
var url=this.getProperty("url");
var _64d=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_64d){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_63f!=null){
this.setLabel(_63f);
}
if(type!=null){
this.setType(type);
}
if(_642!=null){
this.setToolTip(_642);
}
if(_63e!=null){
this.setWidth(_63e);
}
if(_641!=null){
this.setPopup(_641);
}
if(_644!=null){
this.response=_644;
}
if(_647==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_645!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_645,this);
};
}
if(_649||this.isFocusable){
this._makeFocusable();
if(_64b||this.isDefault){
this.isDefault=true;
}
if(_64a){
this.focus();
}
}
if(_643==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_648!=null){
this.bindingWindow.DataManager.registerDataBinding(_648,this);
if(_646!=null){
Binding.dotnetify(this,_646);
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
ButtonBinding.prototype.setImage=function(_64e){
if(this.isAttached){
this.labelBinding.setImage(_64e);
}
this.setProperty("image",_64e);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_64f){
if(this.isAttached){
this.labelBinding.setLabel(_64f);
}
this.setProperty("label",_64f);
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
ButtonBinding.prototype.setToolTip=function(_651){
this.setProperty("tooltip",_651);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_651));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_652){
this.imageProfile=new _652(this);
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
ButtonBinding.prototype.flip=function(_657){
_657=_657==null?true:_657;
this.isFlipped=_657;
this.setProperty("flip",_657);
if(this.isAttached){
this.labelBinding.flip(_657);
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
ButtonBinding.prototype.check=function(_658){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_658==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_659){
this.isActive=true;
this.isChecked=true;
if(!_659){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_65a){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_65a==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_65b){
this.isActive=false;
this.isChecked=false;
if(!_65b){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_65c,_65d){
if(_65c==null){
_65c==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_65c){
case true:
this.check(_65d);
break;
case false:
this.uncheck(_65d);
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
var _65f=this.getProperty("tooltip");
if(_65f){
this.setToolTip(_65f);
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
var _660=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_660=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _660;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _662=this.getEqualSizeWidth();
if(goal>_662){
var diff=goal-_662;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _665=null;
if(this.isAttached==true){
var _666=CSSComputer.getPadding(this.bindingElement);
var _667=CSSComputer.getPadding(this.bindingElement);
_665=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_665=_665+_666.left+_666.right;
_665=_665+_667.left+_667.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _665;
};
ButtonBinding.prototype.setWidth=function(_668){
if(this.isAttached==true){
var _669=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _66a=CSSComputer.getPadding(this.shadowTree.c);
var _66b=_668-_669;
_66b=_66b-_66a.left-_66a.right;
this.shadowTree.c.style.width=String(_66b)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_66b-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_668);
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
ButtonBinding.prototype.setValue=function(_66c){
this.shadowTree.dotnetinput.value=_66c;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_66d){
this.setValue(_66d);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_66e){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_66e;
this.imageProfile=_66e.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_66f){
var _670=_66f?"addEventListener":"removeEventListener";
this.binding[_670](DOMEvents.MOUSEENTER,this);
this.binding[_670](DOMEvents.MOUSELEAVE,this);
this.binding[_670](DOMEvents.MOUSEDOWN,this);
this.binding[_670](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _672=false,_673=false,_674=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_674=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_674=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_674=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_674=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_674==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_672=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_674=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_674=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_674=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_674=ButtonStateManager.STATE_NORMAL;
var _675=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_675 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_674=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_674==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_673=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_674=ButtonStateManager.STATE_NORMAL;
_672=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_674=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_674=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_674=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_674=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_674==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_672=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_674=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_674=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_674=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_674=ButtonStateManager.STATE_NORMAL;
_672=true;
break;
}
}
}
}
}
switch(_674){
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
if(_672){
this.binding.fireCommand();
}
if(_673){
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
var _679=this.imageProfile.getDisabledImage();
if(_679){
this.binding.setImage(_679);
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
ClickButtonBinding.newInstance=function(_67a){
var _67b=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_67a);
return UserInterface.registerBinding(_67b,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_67c){
var _67d=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_67c);
return UserInterface.registerBinding(_67d,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_67e){
var _67f=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_67e);
return UserInterface.registerBinding(_67f,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_680){
this._binding=_680;
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
var _681=this.getDescendantBindingsByLocalName("control");
_681.each(function(_682){
_682.setControlType(_682.controlType);
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
ControlGroupBinding.newInstance=function(_684){
var _685=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_684);
return UserInterface.registerBinding(_685,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_688){
ControlBinding.superclass.handleAction.call(this,_688);
switch(_688.type){
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
function ControlImageProfile(_689){
this.binding=_689;
}
ControlImageProfile.prototype._getImage=function(_68a){
var _68b=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_68b=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_68b=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_68b=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_68b=this.constructor.IMAGE_CLOSE;
break;
}
return _68b.replace("${string}",_68a);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _68c=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_68c=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _68c?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_68d){
ControlBoxBinding.superclass.handleAction.call(this,_68d);
switch(_68d.type){
case ControlBinding.ACTION_COMMAND:
var _68e=_68d.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_68e);
Application.unlock(self);
},0);
_68d.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_690){
switch(_690.controlType){
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
ControlBoxBinding.prototype.setState=function(_691){
var _692=this.getState();
this.setProperty("state",_691);
this.detachClassName(_692);
this.attachClassName(_691);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _693=this.getProperty("state");
if(!_693){
_693=ControlBoxBinding.STATE_NORMAL;
}
return _693;
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
MenuContainerBinding.prototype.isOpen=function(_694){
var _695=null;
if(!_694){
_695=this._isOpen;
}else{
_695=(_694==this._openElement);
}
return _695;
};
MenuContainerBinding.prototype.setOpenElement=function(_696){
if(_696){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_696;
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
var _697=this.getChildBindingByLocalName("menupopup");
if(_697&&_697!=this.menuPopupBinding){
this.menuPopupBinding=_697;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _698=this.getMenuContainerBinding();
_698.setOpenElement(this);
var _699=this.getMenuPopupBinding();
_699.snapTo(this.bindingElement);
_699.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_69a){
MenuContainerBinding.superclass.handleAction.call(this,_69a);
if(_69a.type==PopupBinding.ACTION_HIDE){
var _69b=this.getMenuContainerBinding();
_69b.setOpenElement(false);
this.reset();
_69a.consume();
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
MenuBarBinding.prototype.handleAction=function(_69c){
MenuBarBinding.superclass.handleAction.call(this,_69c);
switch(_69c.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _69d=_69c.target;
var _69e=this.getChildBindingsByLocalName("menu");
while(_69e.hasNext()){
var menu=_69e.getNext();
}
switch(_69d.arrowKey){
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
var _6a0=this.getProperty("image");
var _6a1=this.getProperty("label");
var _6a2=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6a1){
this.setLabel(_6a1);
}
if(_6a0){
this.setImage(_6a0);
}
if(_6a2){
this.setToolTip(_6a2);
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
MenuBinding.prototype.setLabel=function(_6a4){
this.setProperty("label",_6a4);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6a4));
}
};
MenuBinding.prototype.setToolTip=function(_6a5){
this.setProperty("tooltip",_6a5);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6a5));
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
var _6a7=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6a7.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6a7.isOpen()&&!_6a7.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6a7.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6a7.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6a8,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6a8){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6ad){
switch(_6ad.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6ae=null;
var _6af=true;
self._lastFocused.focus();
self.grabKeyboard();
_6ad.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6b1){
for(var key in this._focused){
if(key!=_6b1.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6b1.key]=_6b1;
this._lastFocused=_6b1;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6b4){
delete this._focused[_6b4.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6b5){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6b5);
}
if(_6b5){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6b8=this.getChildBindingsByLocalName("menugroup");
var _6b9=null;
var _6ba=null;
while(_6b8.hasNext()){
var _6bb=_6b8.getNext();
if(!_6bb.isDefaultContent){
_6bb.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6b9&&_6bb.isVisible){
_6b9=_6bb;
}
if(_6bb.isVisible){
_6ba=_6bb;
}
}
}
if(_6b9&&_6ba){
_6b9.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6ba.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6bc){
MenuBodyBinding.activeInstance=this;
if(_6bc){
var _6bd=this._getMenuItems().getFirst();
if(_6bd){
_6bd.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6be=this._lastFocused;
if((_6be!=null)&&(!_6be.isMenuContainer)){
_6be.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6c0=this._getMenuItems();
var _6c1=null;
var next=null;
if(this._lastFocused){
_6c1=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6c0.getPreceding(_6c1);
break;
case KeyEventCodes.VK_DOWN:
next=_6c0.getFollowing(_6c1);
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
next=_6c0.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6c4=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6c5){
_6c4=_6c5.getChildBindingsByLocalName("menuitem");
_6c4.each(function(item){
list.add(item);
});
});
_6c4=this.getChildBindingsByLocalName("menuitem");
_6c4.each(function(item){
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
MenuBodyBinding.newInstance=function(_6c8){
var _6c9=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6c8);
return UserInterface.registerBinding(_6c9,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6ca){
switch(_6ca){
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
MenuGroupBinding.newInstance=function(_6cb){
var _6cc=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6cb);
return UserInterface.registerBinding(_6cc,MenuGroupBinding);
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
var _6cd=this.getProperty("image");
var _6ce=this.getProperty("image-hover");
var _6cf=this.getProperty("image-active");
var _6d0=this.getProperty("image-disabled");
if(!this.image&&_6cd){
this.image=_6cd;
}
if(!this.imageHover&&_6ce){
this.imageHover=_6cd;
}
if(!this.imageActive&&_6cf){
this.imageActive=_6cf;
}
if(!this.imageDisabled&&_6d0){
this.imageDisabled=_6d0;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6d1=this.getProperty("label");
var _6d2=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6d4=this.getProperty("isdisabled");
var _6d5=this.getProperty("image");
var _6d6=this.getProperty("image-hover");
var _6d7=this.getProperty("image-active");
var _6d8=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6d9=this.getMenuPopupBinding();
if(_6d9){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6d5){
this.image=_6d5;
}
if(!this.imageHover&&_6d6){
this.imageHover=_6d5;
}
if(!this.imageActive&&_6d7){
this.imageActive=_6d7;
}
if(!this.imageDisabled&&_6d8){
this.imageDisabled=_6d8;
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
if(_6d1!=null){
this.setLabel(_6d1);
}
if(_6d2){
this.setToolTip(_6d2);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6d4==true){
this.disable();
}
var _6da=this.getProperty("oncommand");
if(_6da){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6da);
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
MenuItemBinding.prototype.setLabel=function(_6dd){
this.setProperty("label",_6dd);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6dd));
}
};
MenuItemBinding.prototype.setToolTip=function(_6de){
this.setProperty("tooltip",_6de);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6de));
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
var _6e0=this.bindingDocument.createElement("div");
_6e0.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6e0.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6e1=this.labelBinding.bindingElement;
_6e1.insertBefore(_6e0,_6e1.firstChild);
_6e0.style.display="none";
this.shadowTree.checkBoxIndicator=_6e0;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6e0=this.bindingDocument.createElement("div");
_6e0.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6e0.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6e1=this.labelBinding.bindingElement;
_6e1.insertBefore(_6e0,_6e1.firstChild);
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
var _6e3=this.imageProfile.getDisabledImage();
if(_6e3){
this.setImage(_6e3);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6e3=this.imageProfile.getDefaultImage();
if(_6e3){
this.setImage(_6e3);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6e5=this.getMenuContainerBinding();
if(_6e5.isOpen()&&!_6e5.isOpen(this)){
_6e5._openElement.hide();
_6e5.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6e5=this.getMenuContainerBinding();
if(!_6e5.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6e7){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6e8=this.getMenuContainerBinding();
if(!_6e8||!_6e8.isOpen(this)||_6e7){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6e9){
this.setChecked(true,_6e9);
};
MenuItemBinding.prototype.uncheck=function(_6ea){
this.setChecked(false,_6ea);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6eb,_6ec){
this.setProperty("ischecked",_6eb);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6eb){
this.isChecked=_6eb;
this.shadowTree.checkBoxIndicator.style.display=_6eb?"block":"none";
if(!_6ec){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6ed){
var _6ee=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6ed);
UserInterface.registerBinding(_6ee,MenuItemBinding);
return UserInterface.getBinding(_6ee);
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
PopupBinding.handleBroadcast=function(_6ef,arg){
switch(_6ef){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6f3=PopupBinding.activeInstances.get(key);
var _6f4=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6f3);
if(!_6f4){
list.add(_6f3);
}
});
list.each(function(_6f5){
_6f5.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6f7=PopupBinding.activeInstances.get(key);
_6f7.hide();
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
var _6f8=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6f9=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6f8){
this._bodyBinding=UserInterface.getBinding(_6f8);
}else{
if(_6f9){
this._bodyBinding=UserInterface.getBinding(_6f9);
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
var _6fa=this.getProperty("position");
this.position=_6fa?_6fa:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_6fb){
var _6fc=null;
if(this._bodyBinding){
this._bodyBinding.add(_6fb);
_6fc=_6fb;
}else{
_6fc=PopupBinding.superclass.add.call(this,_6fb);
}
return _6fc;
};
PopupBinding.prototype.addFirst=function(_6fd){
var _6fe=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6fd);
_6fe=_6fd;
}else{
_6fe=PopupBinding.superclass.addFirst.call(this,_6fd);
}
return _6fe;
};
PopupBinding.prototype.handleAction=function(_6ff){
PopupBinding.superclass.handleAction.call(this,_6ff);
var _700=_6ff.target;
switch(_6ff.type){
case Binding.ACTION_ATTACHED:
if(_700 instanceof MenuItemBinding){
this._count(true);
_6ff.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_700 instanceof MenuItemBinding){
this._count(false);
_6ff.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_701){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_701?1:-1);
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
PopupBinding.prototype.snapTo=function(_702){
var _703=this._getElementPosition(_702);
switch(this.position){
case PopupBinding.POSITION_TOP:
_703.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_703.x+=_702.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_703.y+=_702.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_703.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_702;
this.bindingElement.style.display="block";
this.setPosition(_703.x,_703.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_705){
this.bindingElement.style.display="block";
this.setPosition(_705.x,_705.y);
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
PopupBinding.prototype._getElementPosition=function(_70a){
return _70a.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_70a):DOMUtil.getUniversalPosition(_70a);
};
PopupBinding.prototype._getMousePosition=function(e){
var _70c=DOMEvents.getTarget(e);
return _70c.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_70d){
var _70e=this.bindingElement;
if(_70d){
if(Client.hasTransitions){
_70e.style.visibility="visible";
_70e.style.opacity="1";
}else{
_70e.style.visibility="visible";
}
}else{
_70e.style.visibility="hidden";
_70e.style.display="none";
if(Client.hasTransitions){
_70e.style.opacity="0";
}
}
this.isVisible=_70d;
};
PopupBinding.prototype._enableTab=function(_70f){
var self=this;
var _711=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_711.each(function(_712){
_712.bindingElement.tabIndex=_70f?0:-1;
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
var _71a=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_71a.y<0){
y=-_71a.y;
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
PopupBinding.prototype.grabKeyboard=function(_71c){
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
var _722=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_722=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _722;
};
PopupBinding.prototype.clear=function(){
var _723=this._bodyBinding;
if(_723){
_723.detachRecursive();
_723.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_724){
var _725=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_724);
return UserInterface.registerBinding(_725,PopupBinding);
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
PopupBodyBinding.newInstance=function(_727){
var _728=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_727);
return UserInterface.registerBinding(_728,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_729){
return new Point(_729.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_72a){
var _72b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_72a);
return UserInterface.registerBinding(_72b,MenuPopupBinding);
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
var _72c=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_72c){
this._body=UserInterface.getBinding(_72c);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _72d=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_72d.hasNext()){
var _72e=DialogBorderBinding.newInstance(this.bindingDocument);
_72e.setType(_72d.getNext());
this.add(_72e);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _72f=this.getProperty("controls");
if(_72f){
var _730=new List(_72f.split(" "));
while(_730.hasNext()){
var type=_730.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _732=DialogControlBinding.newInstance(this.bindingDocument);
_732.setControlType(type);
this._titlebar.addControl(_732);
this.controlBindings[type]=_732;
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
var _733=this.getProperty("image");
var _734=this.getProperty("label");
var _735=this.getProperty("draggable");
var _736=this.getProperty("resizable");
var _737=this.getProperty("modal");
if(_733){
this.setImage(_733);
}
if(_734){
this.setLabel(_734);
}
if(_735==false){
this.isDialogDraggable=false;
}
if(_736==false){
this.isPanelResizable=false;
}
if(_737==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_738){
this.isModal=_738;
};
DialogBinding.prototype.setLabel=function(_739){
this.setProperty("label",_739);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_739));
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
DialogBinding.prototype.handleAction=function(_73b){
DialogBinding.superclass.handleAction.call(this,_73b);
switch(_73b.type){
case Binding.ACTION_DRAG:
var _73c=_73b.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_73c.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_73c.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_73c;
_73c.dragger.registerHandler(this);
}
break;
}
}
_73b.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_73b.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_73d,arg){
DialogBinding.superclass.handleBroadcast.call(this,_73d,arg);
switch(_73d){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_73f){
DialogBinding.superclass.handleInvokedControl.call(this,_73f);
switch(_73f.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_740){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_740){
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
var _742=self.bindingElement;
setTimeout(function(){
_742.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_743){
this.bindingElement.style.zIndex=new String(_743);
};
DialogBinding.prototype.onDragStart=function(_744){
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
DialogBinding.prototype.setResizable=function(_756){
if(this._isResizable!=_756){
if(_756){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_756;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _757=null;
var _758=this.bindingDocument.body.offsetWidth;
var _759=this.bindingDocument.body.offsetHeight;
_757={x:0.125*_758,y:0.125*_759,w:0.75*_758,h:0.5*_759};
return _757;
};
DialogBinding.prototype.centerOnScreen=function(){
var _75a=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_75a.w-dim.w),0.5*(_75a.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _75c=this;
var i=0;
function blink(){
if(i%2==0){
_75c.detachClassName("active");
}else{
_75c.attachClassName("active");
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
var _760="";
while(list.hasNext()){
var type=list.getNext();
_760+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_760);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_761){
var _762=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_761);
return UserInterface.registerBinding(_762,DialogBinding);
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
DialogHeadBinding.newInstance=function(_763){
var _764=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_763);
return UserInterface.registerBinding(_764,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_767){
var _768=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_767);
return UserInterface.registerBinding(_768,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_769){
var _76a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_769);
return UserInterface.registerBinding(_76a,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_76b){
DialogSetBinding.superclass.handleAction.call(this,_76b);
var _76c=_76b.target;
switch(_76b.type){
case Binding.ACTION_MOVETOTOP:
if(_76c instanceof DialogBinding){
this._moveToTop(_76c);
}
break;
case Binding.ACTION_MOVEDONTOP:
_76b.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_76d){
var _76e=0;
var _76f=this.getChildBindingsByLocalName("dialog");
_76f.each(function(_770){
var _771=_770.getZIndex();
_76e=_771>_76e?_771:_76e;
});
_76d.setZIndex(_76e+2);
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
DialogBorderBinding.newInstance=function(_773){
var _774=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_773);
return UserInterface.registerBinding(_774,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_775){
this._dialogBinding=_775;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_777){
DialogCoverBinding.superclass.handleAction.call(this,_777);
var _778=_777.target;
if(this._dialogBinding.isModal){
switch(_777.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_778==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_778.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_779,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_779,arg);
switch(_779){
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
var _77c=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_77c);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _77d=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_77d);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_77e){
var _77f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_77e);
return UserInterface.registerBinding(_77f,DialogCoverBinding);
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
var _780=this.getProperty("image");
if(_780){
this.setImage(_780);
}
var _781=this.getProperty("label");
if(_781){
this.setLabel(_781);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_782){
if(this.isAttached){
this.labelBinding.setLabel(_782);
}
this.setProperty("label",_782);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_784){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_784);
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
DialogTitleBarBinding.newInstance=function(_785){
var _786=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_785);
return UserInterface.registerBinding(_786,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_787){
var _788=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_787);
return UserInterface.registerBinding(_788,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_789){
var _78a=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_789);
return UserInterface.registerBinding(_78a,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_78b){
this.binding=_78b;
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
var _78e=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _78f=node.nodeName.toLowerCase();
switch(_78f){
case "script":
case "style":
case "textarea":
_78e=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _78e;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _796=true;
if(exp.test(text)){
self._textnodes.add(node);
_796=false;
}
return _796;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_797,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_797,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _79b=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_79b+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7a1){
var _7a2="";
var _7a3="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7a4="</span>";
var self=this;
function iterate(_7a6){
var _7a7=-1;
var _7a8=null;
self._map.each(function(key,exp){
var low=_7a6.toLowerCase();
var _7ac=low.search(exp);
if(_7ac>-1){
if(_7a7==-1){
_7a7=_7ac;
}
if(_7ac<=_7a7){
_7a7=_7ac;
_7a8=key;
}
}
});
if(_7a7>-1&&_7a8!=null){
var pre=_7a6.substring(0,_7a7);
var hit=_7a6.substring(_7a7,_7a7+_7a8.length);
var pst=_7a6.substring(_7a7+_7a8.length,_7a6.length);
_7a2+=pre+_7a3+hit+_7a4;
iterate(pst);
}else{
_7a2+=_7a6;
}
}
iterate(_7a1);
return _7a2;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7b0){
var _7b1=new List(_7b0.getElementsByTagName("span"));
_7b1.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7b0.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7b4){
var _7b5=null;
if(_7b4.isAttached){
var doc=_7b4.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7b5=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7b5 instanceof SOAPFault){
_7b5=null;
}
}
}
return _7b5;
};
WindowBinding.highlightKeywords=function(_7b9,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7b9.isAttached){
var doc=_7b9.getContentDocument();
if(doc!=null){
var _7bc=WindowBinding._highlightcrawler;
_7bc.reset(doc.body);
if(list!=null){
_7bc.setKeys(list);
_7bc.crawl(doc.body);
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
var _7bd=WindowBinding.superclass.serialize.call(this);
if(_7bd){
_7bd.url=this.getURL();
}
return _7bd;
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
var _7bf=this.getContentWindow().DocumentManager;
if(_7bf!=null){
_7bf.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7c0){
WindowBinding.superclass.handleAction.call(this,_7c0);
var _7c1=_7c0.target;
switch(_7c0.type){
case RootBinding.ACTION_PHASE_3:
if(_7c1.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7c1);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7c0.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7c2){
if(!this.isFit||_7c2){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7c3){
if(this._pageBinding==null){
if(_7c3.bindingWindow==this.getContentWindow()){
this._pageBinding=_7c3;
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
WindowBinding.prototype._registerOnloadListener=function(_7c4){
var _7c5=this.shadowTree.iframe;
var _7c6=_7c4?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7c9=true;
if(Client.isExplorer){
_7c9=_7c5.readyState=="complete";
}
if(_7c9==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7c6](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7ca){
var _7cb=_7ca?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7cb](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7cf=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7cf=url;
}
return _7cf;
};
WindowBinding.prototype.reload=function(_7d1){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7d2=null;
if(this.shadowTree.iframe!=null){
_7d2=this.shadowTree.iframe;
}
return _7d2;
};
WindowBinding.prototype.getContentWindow=function(){
var _7d3=null,_7d4=this.getFrameElement();
if(_7d4!==null){
try{
_7d3=_7d4.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7d3;
};
WindowBinding.prototype.getContentDocument=function(){
var _7d5=null,win=this.getContentWindow();
if(win){
_7d5=win.document;
}
return _7d5;
};
WindowBinding.prototype.getRootBinding=function(){
var _7d7=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7d7=UserInterface.getBinding(doc.body);
}
return _7d7;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7d9){
this.bindingElement.style.height=_7d9+"px";
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
WindowBinding.prototype.handleCrawler=function(_7da){
WindowBinding.superclass.handleCrawler.call(this,_7da);
if(_7da.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7da.nextNode=root.bindingElement;
}else{
_7da.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7df){
var _7e0=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7df);
var _7e1=UserInterface.registerBinding(_7e0,WindowBinding);
return _7e1;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7e5){
_7e5.target.show();
_7e5.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7e7){
_7e7.target.show();
_7e7.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7e9){
PreviewWindowBinding.superclass.handleAction.call(this,_7e9);
switch(_7e9.type){
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
var _7ea=null;
this._getRadioButtonBindings().each(function(_7eb){
if(_7eb.getProperty("ischecked")){
_7ea=_7eb;
return false;
}else{
return true;
}
});
if(_7ea){
this._checkedRadioBinding=_7ea;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7ec){
RadioGroupBinding.superclass.handleAction.call(this,_7ec);
var _7ed=_7ec.target;
switch(_7ec.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7ec.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7ed.isRadioButton&&!_7ed.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7ed);
}
this._checkedRadioBinding=_7ed;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7ec.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7ee,_7ef){
if(_7ee instanceof RadioDataBinding){
_7ee=_7ee.getButton();
}
if(_7ee.isRadioButton){
switch(_7ef){
case true:
this._unCheckRadioBindingsExcept(_7ee);
this._checkedRadioBinding=_7ee;
_7ee.check(true);
break;
default:
_7ee.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7f0){
var _7f1=this._getRadioButtonBindings();
_7f1.each(function(_7f2){
if(_7f2.isChecked&&_7f2!=_7f0){
_7f2.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7f3=new Crawler();
var list=new List();
_7f3.addFilter(function(_7f5){
var _7f6=true;
var _7f7=UserInterface.getBinding(_7f5);
if(_7f7 instanceof RadioGroupBinding){
_7f6=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7f7 instanceof ButtonBinding&&_7f7.isRadioButton){
list.add(_7f7);
}
}
return _7f6;
});
_7f3.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7f8){
var _7f9=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7f8);
return UserInterface.registerBinding(_7f9,RadioGroupBinding);
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
var _7fb=this.getProperty("regexrule");
if(_7fb!=null){
this.expression=new RegExp(_7fb);
}
var _7fc=this.getProperty("onbindingblur");
if(_7fc!=null){
this.onblur=function(){
Binding.evaluate(_7fc,this);
};
}
var _7fd=this.getProperty("onvaluechange");
if(_7fd!=null){
this.onValueChange=function(){
Binding.evaluate(_7fd,this);
};
}
if(this.error==null&&this.type!=null){
var _7fe=DataBinding.errors[this.type];
if(_7fe!=null){
this.error=_7fe;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7ff=this.getProperty("value");
if(_7ff!=null){
this.setValue(String(_7ff));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _801=this.getProperty("isdisabled");
if(_801==true){
this.setDisabled(true);
}
var _802=this.getProperty("readonly");
if(_802==true){
this.setReadOnly(true);
}
var _803=this.getProperty("autoselect");
if(_803==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _804=Localization.currentLang();
if(_804!=null){
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
var _805=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_805.type=this.isPassword==true?"password":"text";
_805.tabIndex=-1;
return _805;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_808){
if(_808){
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
DataInputBinding.prototype.handleBroadcast=function(_80b,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_80b,arg);
var self=this;
switch(_80b){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _80e=DOMEvents.getTarget(arg);
if(_80e!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_80f){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_80f){
var self=this,_811=this.bindingElement,_812={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_811,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_811,DOMEvents.MOUSEUP,_812);
}else{
this.select();
}
}
this.onfocus();
if(!_80f){
var _813=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_813);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _814=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _815=_814.createTextRange();
_815.moveStart("character",0);
_815.moveEnd("character",_814.value.length);
_815.select();
}else{
_814.setSelectionRange(0,_814.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_816){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_816){
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
DataInputBinding.prototype.validate=function(_81a){
if(_81a==true||this._isValid){
var _81b=this.isValid();
if(_81b!=this._isValid){
this._isValid=_81b;
if(!_81b){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _81c=null;
if(this._isInvalidBecauseRequired==true){
_81c=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_81c=DataBinding.warnings["minlength"];
_81c=_81c.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_81c=DataBinding.warnings["maxlength"];
_81c=_81c.replace("${count}",String(this.maxlength));
}else{
_81c=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_81c!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_81c);
}
}else{
this.setValue(_81c);
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
var _81d=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _81e=this.getValue();
if(_81e==""){
if(this.isRequired==true){
_81d=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _81f=DataBinding.expressions[this.type];
if(!_81f.test(_81e)){
_81d=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_81e)){
_81d=false;
}
}
}
}
if(_81d&&this.minlength!=null){
if(_81e.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_81d=false;
}
}
if(_81d&&this.maxlength!=null){
if(_81e.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_81d=false;
}
}
return _81d;
};
DataInputBinding.prototype.setDisabled=function(_820){
if(_820!=this.isDisabled){
if(_820){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _821=this.shadowTree.input;
if(_820){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_821,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_821,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_820;
this.shadowTree.input.unselectable=_820?"on":"off";
}
this.isDisabled=_820;
this.isFocusable=!_820;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_823){
if(_823!=this.isReadOnly){
if(_823){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_823;
this.isReadOnly=_823;
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
DataInputBinding.prototype.handleElement=function(_824){
return true;
};
DataInputBinding.prototype.updateElement=function(_825){
var _826=_825.getAttribute("value");
var _827=_825.getAttribute("type");
var _828=_825.getAttribute("maxlength");
var _829=_825.getAttribute("minlength");
if(_826==null){
_826="";
}
var _82a=this.bindingWindow.UpdateManager;
if(this.getValue()!=_826){
_82a.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_826);
}
if(this.type!=_827){
_82a.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_827;
}
if(this.maxlength!=_828){
_82a.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_828;
}
if(this.minlength!=_829){
_82a.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_829;
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
DataInputBinding.prototype.setValue=function(_82b){
if(_82b===null){
_82b="";
}
if(_82b!=this.getValue()){
this.setProperty("value",_82b);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_82b);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _82c=null;
if(this.shadowTree.input!=null){
_82c=this.shadowTree.input.value;
}else{
_82c=this.getProperty("value");
}
return _82c;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _82e=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_82e=Number(_82e);
break;
}
return _82e;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_82f){
var _830=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_82f);
return UserInterface.registerBinding(_830,DataInputBinding);
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
var _831=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_831!=null){
this.setValue(_831.value);
_831.parentNode.removeChild(_831);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _832=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_832.tabIndex=-1;
return _832;
};
TextBoxBinding.prototype.handleElement=function(_833){
return true;
};
TextBoxBinding.prototype.updateElement=function(_834){
var _835,area=_834.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_835=DOMUtil.getTextContent(area);
}
if(_835==null){
_835="";
}
var _837=this.bindingWindow.UpdateManager;
if(this.getValue()!=_835){
_837.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_835);
}
var _838=_834.getAttribute("type");
if(this.type!=_838){
_837.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_838;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_83c){
var _83d=this.bindingDocument.selection.createRange();
var _83e=_83d.text=="";
if(_83e&&!_83c){
_83d.text="\t";
}else{
var text="";
var _840=_83d.text.length;
while((_83d.moveStart("word",-1)&&_83d.text.charAt(1)!="\n")){
}
_83d.moveStart("character",1);
var _841=0;
var i=0,line,_844=_83d.text.split("\n");
while((line=_844[i++])!=null){
if(_83c){
line=line.replace(/^(\s)/mg,"");
_841++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_844[i+1]?"\n":"");
}
_83d.text=text;
_83d.moveStart("character",-_840);
if(_83c){
_83d.moveStart("character",2*_844.length-2);
}
_83d.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _845=this.bindingDocument.selection.createRange();
var _846=_845.duplicate();
while((_846.moveStart("word",-1)&&_846.text.indexOf("\n")==-1)){
}
_846.moveStart("character",1);
_845.text="\n"+_846.text.match(/^(\s)*/)[0]+"!";
_845.moveStart("character",-1);
_845.select();
_845.text="";
_845.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_847){
var _848;
var _849;
var oss;
var osy;
var i;
var fnd;
var _84e=this._getSelectedText();
var el=this.shadowTree.input;
_848=el.scrollLeft;
_849=el.scrollTop;
if(!_84e.match(/\n/)){
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
_84e=this._getSelectedText();
if(_847){
ntext=_84e.replace(/^(\s)/mg,"");
}else{
ntext=_84e.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_84e.length);
}
el.scrollLeft=_848;
el.scrollTop=_849;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _850;
var _851;
var oss;
var osy;
var el=this.shadowTree.input;
_850=el.scrollLeft;
_851=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_850;
el.scrollTop=_851;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _858=this.shadowTree.input.value;
var _859=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _858.substr(_859,end-_859);
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
var _85b=this.getProperty("isdisabled");
if(this.isDisabled||_85b){
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
var _85d=this.getProperty("label");
var _85e=this.getProperty("value");
var _85f=this.getProperty("width");
var _860=this.getProperty("onchange");
var _861=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_85d!=null){
this.label=_85d;
}
if(!this.value&&_85e!=null){
this.value=_85e;
}
if(!this.width&&_85f){
this.width=_85f;
}
if(_861){
this.isRequired=true;
}
if(_860){
this.onValueChange=function(){
Binding.evaluate(_860,this);
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
var _862=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_862.name=this.getName();
_862.value=this.getValue();
_862.type="hidden";
if(this.hasCallBackID()){
_862.id=this.getCallBackID();
}
this.shadowTree.input=_862;
this.bindingElement.appendChild(_862);
};
SelectorBinding.prototype.buildButton=function(){
var _863=this.BUTTON_IMPLEMENTATION;
var _864=this.add(_863.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_864.imageProfile=this.imageProfile;
}
if(this.width!=null){
_864.setWidth(this.width);
}
this._buttonBinding=_864;
this.shadowTree.button=_864;
_864.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _866=top.app.bindingMap.selectorpopupset;
var doc=_866.bindingDocument;
var _868=_866.add(PopupBinding.newInstance(doc));
var _869=_868.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_868;
this._menuBodyBinding=_869;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_868.attachClassName("selectorpopup");
_868.addActionListener(PopupBinding.ACTION_SHOW,this);
_868.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_868.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_868);
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
var _86c=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_86c).each(function(_86d){
var _86e=_86d.getAttribute("label");
var _86f=_86d.getAttribute("value");
var _870=_86d.getAttribute("selected");
var _871=_86d.getAttribute("image");
var _872=_86d.getAttribute("image-hover");
var _873=_86d.getAttribute("image-active");
var _874=_86d.getAttribute("image-disabled");
var _875=null;
if(_871||_872||_873||_874){
_875=new ImageProfile({image:_871,imageHover:_872,imageActive:_873,imageDisabled:_874});
}
list.add(new SelectorBindingSelection(_86e?_86e:null,_86f?_86f:null,_870&&_870=="true",_875));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _877=null;
while(list.hasNext()){
var _878=list.getNext();
var item=this.addSelection(_878);
if(_878.isSelected){
this.select(item,true);
}
if(!_877){
_877=item;
}
}
if(!this._selectedItemBinding){
this.select(_877,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_87a,_87b){
var _87c=this.MENUITEM_IMPLEMENTATION;
var _87d=this._menuBodyBinding;
var _87e=_87d.bindingDocument;
var _87f=_87c.newInstance(_87e);
_87f.imageProfile=_87a.imageProfile;
_87f.setLabel(_87a.label);
if(_87a.tooltip!=null){
_87f.setToolTip(_87a.tooltip);
}
_87f.selectionValue=_87a.value;
_87a.menuItemBinding=_87f;
if(_87b){
_87d.addFirst(_87f);
this.selections.addFirst(_87a);
}else{
_87d.add(_87f);
this.selections.add(_87a);
}
this._isUpToDate=false;
return _87f;
};
SelectorBinding.prototype.addSelectionFirst=function(_880){
return this.addSelection(_880,true);
};
SelectorBinding.prototype.clear=function(_881){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_881&&this.defaultSelection!=null){
var _882=this.addSelection(this.defaultSelection);
this.select(_882,true);
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
SelectorBinding.prototype.setDisabled=function(_883){
if(this.isAttached==true){
var _884=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_883?"none":"block";
_884.setDisabled(_883);
}
if(_883){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_885){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_885);
}
};
SelectorBinding.prototype.handleAction=function(_886){
SelectorBinding.superclass.handleAction.call(this,_886);
switch(_886.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_886.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_886.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_886.target);
_886.consume();
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
_886.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_888){
this.select(_888);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _889=this._buttonBinding.bindingElement.offsetWidth+"px";
var _88a=this._popupBinding.bindingElement;
_88a.style.minWidth=_889;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _88c=Client.isExplorer?e.keyCode:e.which;
if(_88c==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _88c=Client.isExplorer?e.keyCode:e.which;
if(_88c>=32){
this._buttonBinding.check();
var _88d=String.fromCharCode(_88c);
this._pushSearchSelection(_88d);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_88e){
this._searchString+=_88e.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_88f){
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
var _890=this._menuBodyBinding;
if(_890!=null){
var _891=this.MENUITEM_IMPLEMENTATION;
var _892=_890.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _894=list.getNext();
if(_894.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_894);
}
}
}
this._attachSelections();
var _895=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _896=_890.getDescendantBindingsByType(_891);
if(_896.hasEntries()){
while(_896.hasNext()){
var _897=_896.getNext();
var _898=_897.labelBinding;
if(_898!=null&&_898.shadowTree!=null&&_898.shadowTree.labelText!=null){
_898.shadowTree.labelText.innerHTML=_898.shadowTree.labelText.innerHTML.replace(_895,"<b>$&</b>");
}
}
_896.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_898=LabelBinding.newInstance(_892);
_898.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_890.add(_898);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _894=list.getNext();
var item=this.addSelection(_894);
if(this._selectionValue==_894.value){
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
if(Client.isExplorer){
this._popupBinding._bodyBinding.setDimension(this._popupBinding.getDimension());
}
this._popupBinding._enableTab(true);
}
}
};
SelectorBinding.prototype.handleBroadcast=function(_89a,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_89a,arg);
switch(_89a){
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
SelectorBinding.prototype.select=function(_89d,_89e){
var _89f=false;
if(_89d!=this._selectedItemBinding){
this._selectedItemBinding=_89d;
_89f=true;
var _8a0=this._buttonBinding;
this._selectionValue=_89d.selectionValue;
this._selectionLabel=_89d.getLabel();
_8a0.setLabel(_89d.getLabel());
if(_89d.imageProfile!=null){
_8a0.imageProfile=_89d.imageProfile;
}
if(_8a0.imageProfile!=null){
_8a0.setImage(this.isDisabled==true?_8a0.imageProfile.getDisabledImage():_8a0.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_89e){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_89e)){
this.validate();
}
}
return _89f;
};
SelectorBinding.prototype._relate=function(){
var _8a1=this.getProperty("relate");
if(_8a1){
var _8a2=this.bindingDocument.getElementById(_8a1);
if(_8a2){
var _8a3=UserInterface.getBinding(_8a2);
if(_8a3){
if(this.isChecked){
_8a3.show();
}else{
_8a3.hide();
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
SelectorBinding.prototype.selectByValue=function(_8a4,_8a5){
var _8a6=false;
var _8a7=this._menuBodyBinding;
var _8a8=_8a7.getDescendantElementsByLocalName("menuitem");
while(_8a8.hasNext()){
var _8a9=UserInterface.getBinding(_8a8.getNext());
if(_8a9.selectionValue==_8a4){
_8a6=this.select(_8a9,_8a5);
break;
}
}
return _8a6;
};
SelectorBinding.prototype.getValue=function(){
var _8aa=this._selectionValue;
if(_8aa!=null){
_8aa=String(_8aa);
}
return _8aa;
};
SelectorBinding.prototype.setValue=function(_8ab){
this.selectByValue(String(_8ab),true);
};
SelectorBinding.prototype.getResult=function(){
var _8ac=this._selectionValue;
if(_8ac=="null"){
_8ac=null;
}
if(_8ac){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8ac=Number(_8ac);
break;
}
}
return _8ac;
};
SelectorBinding.prototype.setResult=function(_8ad){
this.selectByValue(_8ad,true);
};
SelectorBinding.prototype.validate=function(){
var _8ae=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8af=this.getValue();
if(_8af==this.defaultSelection.value){
_8ae=false;
}
if(_8ae!=this._isValid){
if(_8ae){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8ae;
}
return _8ae;
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
var _8b0=this._popupBinding;
if(!this._isUpToDate){
_8b0.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8b1,_8b2){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8b1));
return true;
};
SelectorBinding.newInstance=function(_8b3){
var _8b4=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8b3);
return UserInterface.registerBinding(_8b4,SelectorBinding);
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
var _8b7=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8b7){
this.onValueChange=function(){
Binding.evaluate(_8b7,this);
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
SimpleSelectorBinding.prototype.focus=function(_8ba){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8ba){
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
SimpleSelectorBinding.prototype._hack=function(_8bb){
if(Client.isExplorer){
this._select.style.width=_8bb?"auto":this._cachewidth+"px";
if(_8bb){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8bc=true;
if(this.isRequired){
if(this.getValue()==null){
_8bc=false;
}
}
if(_8bc!=this._isValid){
if(_8bc){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8bd=this._select;
var _8be=_8bd.options[_8bd.selectedIndex];
var text=DOMUtil.getTextContent(_8be);
_8bd.blur();
_8bd.style.color="#A40000";
_8bd.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8be,DataBinding.warnings["required"]);
}
_8bd.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8be,text);
}
};
}
this._isValid=_8bc;
}
return _8bc;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8c0=null;
var _8c1=this._select;
var _8c2=_8c1.options[_8c1.selectedIndex];
var _8c3=true;
if(Client.isExplorer){
var html=_8c2.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8c3=false;
}
}
if(_8c3){
_8c0=_8c2.getAttribute("value");
}
return _8c0;
};
SimpleSelectorBinding.prototype.setValue=function(_8c5){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8c6){
this.setValue(_8c6);
};
SimpleSelectorBinding.newInstance=function(_8c7){
var _8c8=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8c7);
return UserInterface.registerBinding(_8c8,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8c9,_8ca,_8cb,_8cc,_8cd){
this._init(_8c9,_8ca,_8cb,_8cc,_8cd);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8ce,_8cf,_8d0,_8d1,_8d2){
if(_8ce!=null){
this.label=String(_8ce);
}
if(_8cf!=null){
this.value=String(_8cf);
}
if(_8d1!=null){
this.imageProfile=_8d1;
}
if(_8d2!=null){
this.tooltip=_8d2;
}
this.isSelected=_8d0?true:false;
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
var _8d3=this.getProperty("image");
if(_8d3){
this.setImage(_8d3);
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
var _8d6=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8d6.popupBindingTargetElement=this.shadowTree.input;
_8d6.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8d6.attach();
var self=this;
_8d6.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8d6;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8d9=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8d9).each(function(_8da){
if(_8da.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8db=_8da.getAttribute("value");
var _8dc=_8da.getAttribute("selected");
var _8dd=_8da.getAttribute("tooltip");
list.add({value:_8db?_8db:null,toolTip:_8dd?_8dd:null,isSelected:(_8dc&&_8dc=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8df=this._menuBodyBinding;
var _8e0=_8df.bindingDocument;
while(_8df.bindingElement.hasChildNodes()){
var node=_8df.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8df.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8e2=this.getProperty("emptyentrylabel");
if(_8e2){
var _8e3=MenuItemBinding.newInstance(_8e0);
_8e3.setLabel(_8e2);
_8e3.selectionValue="";
_8df.add(_8e3);
}
while(list.hasNext()){
var _8e4=list.getNext();
var _8e3=MenuItemBinding.newInstance(_8e0);
_8e3.setLabel(_8e4.label?_8e4.label:_8e4.value);
_8e3.selectionValue=_8e4.value;
if(_8e4.image){
_8e3.setImage(_8e4.image);
}
if(_8e4.toolTip){
_8e3.setToolTip(_8e4.toolTip);
}
if(_8e4.isSelected){
this.select(_8e3,true);
}
_8df.add(_8e3);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8e5){
this.select(_8e5);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8e6,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8e6,arg);
switch(_8e6){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8e6,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8e8){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8e8);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8e9){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8e9);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8ea=this.bindingElement.offsetWidth+"px";
var _8eb=this._popupBinding.bindingElement;
_8eb.style.minWidth=_8ea;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8ec=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8ed=this.getValue();
var _8ee=null;
_8ec.each(function(item){
if(item.getLabel()==_8ed){
_8ee=item;
}
});
if(_8ee){
_8ee.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8f1){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8f1){
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
DataInputSelectorBinding.prototype.setValue=function(_8f2){
var _8f3=this.isReadOnly;
var _8f4=null;
if(_8f2!=null&&_8f2!=""){
var _8f5=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_8f5.hasNext()){
var item=_8f5.getNext();
if(item.selectionValue==_8f2){
_8f4=item.getLabel();
break;
}
}
}
if(_8f4!=null){
this.value=_8f2;
this.shadowTree.input.value=_8f4;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_8f2);
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
var _8f8="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_8f8);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_8f8);
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
var _8fa=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8fa.setImage("${icon:popup}");
this.addFirst(_8fa);
_8fa.attach();
var self=this;
_8fa.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8fc=self.getProperty("handle");
var _8fd=ViewDefinition.clone(_8fc,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_8fd instanceof DialogViewDefinition){
_8fd.handler={handleDialogResponse:function(_8fe,_8ff){
self._isButtonClicked=false;
if(_8fe==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _900=_8ff.getFirst();
self.setValue(_900);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_8fd.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8fd);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8fa.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8fa;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _902=this._dialogButtonBinding;
if(_902!=null){
_902.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _904=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_904=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _904;
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
var _907=ToolBarButtonBinding.newInstance(this.bindingDocument);
_907.setImage("${icon:editor-sourceview}");
_907.bindingElement.style.left="-24px";
_907.bindingElement.style.width="24px";
this.addFirst(_907);
_907.attach();
_907.hide();
var self=this;
_907.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_907;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_908){
UrlInputDialogBinding.superclass.setValue.call(this,_908);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_908);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _909=TreeService.GetCompositeUrlLabel(_908);
if(_909!=_908){
this.setLabel(_909);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_90a){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_90a;
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
var _90b=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _90c=this.getProperty("image");
if(_90c!=null){
_90b.setImage(_90c);
}else{
_90b.setImage("${icon:popup}");
}
this.addFirst(_90b);
_90b.attach();
var self=this;
_90b.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_90b;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _90e=this._dialogButtonBinding;
if(_90e!=null){
_90e.oncommand();
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
var _90f=this.getProperty("label");
var _910=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_90f!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_90f+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_90f);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_910!=null){
this._buttonBinding.setToolTip(_910);
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
DataDialogBinding.prototype.handleAction=function(_912){
DataDialogBinding.superclass.handleAction.call(this,_912);
var _913=_912.target;
var self=this;
switch(_912.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_915,_916){
if(_915==Dialog.RESPONSE_ACCEPT){
if(_916 instanceof DataBindingMap){
self._map=_916;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_913==this._buttonBinding){
_912.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_917,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_917,arg);
switch(_917){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _91a=this.getProperty("handle");
var url=this.getURL();
var _91c=null;
if(_91a!=null||def!=null){
if(def!=null){
_91c=def;
}else{
_91c=ViewDefinitions[_91a];
}
if(_91c instanceof DialogViewDefinition){
_91c.handler=this._handler;
if(this._map!=null){
_91c.argument=this._map;
}
StageBinding.presentViewDefinition(_91c);
}
}else{
if(url!=null){
_91c=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_91c!=null){
this._dialogViewHandle=_91c.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_91d){
this.setProperty("label",_91d);
if(this.isAttached){
this._buttonBinding.setLabel(_91d+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_91e){
this.setProperty("image",_91e);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_91e);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_91f){
this.setProperty("tooltip",_91f);
if(this.isAttached){
this._buttonBinding.setToolTip(_91f);
}
};
DataDialogBinding.prototype.setHandle=function(_920){
this.setProperty("handle",_920);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_922){
this._handler=_922;
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
DataDialogBinding.newInstance=function(_924){
var _925=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_924);
return UserInterface.registerBinding(_925,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_927,_928){
if(_927==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_928);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_929){
_929=new String(_929);
this.dirty();
this.setValue(encodeURIComponent(_929));
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
var _92d=this.getValue();
if(_92d==null){
_92d="";
}
this.shadowTree.dotnetinput.value=_92d;
};
PostBackDataDialogBinding.prototype.setValue=function(_92e){
this.setProperty("value",_92e);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_92f){
};
PostBackDataDialogBinding.newInstance=function(_930){
var _931=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_930);
return UserInterface.registerBinding(_931,PostBackDataDialogBinding);
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
var _932=this.getProperty("dialoglabel");
var _933=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _935=this.getProperty("handle");
var _936=this.getProperty("selectedtoken");
if(_935!=null){
var def=ViewDefinition.clone(_935,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_932!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_932;
}
if(_933!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_933;
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
if(_936!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_936;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_938){
var _939=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_938);
return UserInterface.registerBinding(_939,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_93b){
self._datathing.setValue(_93b);
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
var _93e=self.getValue();
if(_93e==""||_93e==null){
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
var _93f=this.getProperty("value");
var _940=this.getProperty("selectorlabel");
if(_940==null){
_940=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_93f==null));
list.add(new SelectorBindingSelection(_940+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_93f!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _93f=this.getValue();
if(_93f==""||_93f==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_942){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_942);
switch(_942.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_942.target==this._datathing){
var _943=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_943){
self._selector.setLabel(_943);
}
},500);
_942.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_945){
this.setProperty("label",_945);
if(this._selector!=null){
this._selector.setLabel(_945);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_946){
this._datathing.setValue(_946);
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
NullPostBackDataDialogBinding.prototype.action=function(){
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_947,_948){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_947,_948)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_949){
this._buttonBinding.setLabel(_949);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_94a){
this._buttonBinding.setToolTip(_94a);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_94b){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_94b);
switch(_94b.type){
case MenuItemBinding.ACTION_COMMAND:
var _94c=_94b.target;
var _94d=this.master;
if(_94c.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_94c.getLabel());
setTimeout(function(){
_94d.action();
},0);
}else{
this.master.setValue("");
}
_94d.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_94e){
var _94f=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_94e);
return UserInterface.registerBinding(_94f,NullPostBackDataDialogSelectorBinding);
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
var _950=this._dataDialogBinding;
if(_950!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_950.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _951=this.getProperty("editable");
var _952=this.getProperty("selectable");
var _953=this.getProperty("display");
if(_951!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_952){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_953){
this._display=_953;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _954=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_954.selections=this.selections;
this.add(_954);
_954.attach();
this._dataDialogBinding=_954;
this.shadowTree.datadialog=_954;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _956=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _957=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_956=_957.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_956=_957.isSelected!=true;
break;
}
if(_956){
this.shadowTree.box.appendChild(this._getElementForSelection(_957));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_959){
var box=this.shadowTree.box;
var _95b=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _95c=list.getNext();
if(_959){
_95c.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_95b=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_95b=_95c.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_95b=_95c.isSelected!=true;
break;
}
}
if(_95b){
var _95d=this._getElementForSelection(_95c);
box.insertBefore(_95d,box.firstChild);
CSSUtil.attachClassName(_95d,"selected");
this._selectionMap.set(_95c.value,_95d);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_95e){
var _95f=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_95f.appendChild(this.bindingDocument.createTextNode(_95e.label));
_95f.setAttribute("label",_95e.label);
_95f.setAttribute("value",_95e.value);
return _95f;
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
var _961=DOMEvents.getTarget(e);
var _962=DOMUtil.getLocalName(_961);
if(_962=="div"){
this._handleMouseDown(_961);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_963){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _964=this._getElements();
var _965=_963.getAttribute("value");
var _966=this._lastSelectedElement.getAttribute("value");
var _967=false;
while(_964.hasNext()){
var el=_964.getNext();
switch(el.getAttribute("value")){
case _965:
case _966:
_967=!_967;
break;
}
if(_967){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_963);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_963)){
this._unhilite(_963);
}else{
this._hilite(_963);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_963){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_963;
};
MultiSelectorBinding.prototype._hilite=function(_96b){
var _96c=_96b.getAttribute("value");
if(!this._selectionMap.has(_96c)){
CSSUtil.attachClassName(_96b,"selected");
this._selectionMap.set(_96c,_96b);
}
};
MultiSelectorBinding.prototype._unhilite=function(_96d){
var _96e=_96d.getAttribute("value");
if(this._selectionMap.has(_96e)){
CSSUtil.detachClassName(_96d,"selected");
this._selectionMap.del(_96e);
}
};
MultiSelectorBinding.prototype._isHilited=function(_96f){
return CSSUtil.hasClassName(_96f,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_970){
MultiSelectorBinding.superclass.handleAction.call(this,_970);
var _971=_970.target;
switch(_970.type){
case DataDialogBinding.ACTION_COMMAND:
if(_971==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_970.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_971.result);
this.dirty();
_971.result=null;
_970.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _972=null;
if(this.isSelectable){
_972=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_974){
if(self._isHilited(_974)){
_974.parentNode.removeChild(_974);
_972.add(new SelectorBindingSelection(_974.getAttribute("label"),_974.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _972;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _976=this._getElements();
if(!isUp){
_976.reverse();
}
var _977=true;
while(_977&&_976.hasNext()){
var _978=_976.getNext();
if(this._isHilited(_978)){
switch(isUp){
case true:
if(_978.previousSibling){
_978.parentNode.insertBefore(_978,_978.previousSibling);
}else{
_977=false;
}
break;
case false:
if(_978.nextSibling){
_978.parentNode.insertBefore(_978,_978.nextSibling.nextSibling);
}else{
_977=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _979=new List();
var _97a=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_97c){
var _97d=new SelectorBindingSelection(_97c.getAttribute("label"),_97c.getAttribute("value"),_97a);
_97d.isHighlighted=self._isHilited(_97c);
_979.add(_97d);
});
return _979;
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
var _97e=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_97e.hasEntries()){
_97e.each(function(_97f){
_97f.parentNode.removeChild(_97f);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _980=this.selections.getNext();
if(_980.isSelected){
var _981=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_981.name=this._name;
_981.value=_980.value;
this.bindingElement.appendChild(_981);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_982){
alert(_982);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_983){
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
var _984={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _985=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_985.handler=this._handler;
_985.argument=_984;
StageBinding.presentViewDefinition(_985);
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
var _986={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _988={handleDialogResponse:function(_989,_98a){
if(_989==Dialog.RESPONSE_ACCEPT){
self.result=_98a;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _98b=ViewDefinitions[this._dialogViewHandle];
_98b.handler=_988;
_98b.argument=_986;
StageBinding.presentViewDefinition(_98b);
};
MultiSelectorDataDialogBinding.newInstance=function(_98c){
var _98d=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_98c);
return UserInterface.registerBinding(_98d,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_98e){
var id=_98e.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _990=_98e.bindingDocument.getElementById(id);
if(_990!=null){
var _991=UserInterface.getBinding(_990);
_991.setResult(true);
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
var _993=this.bindingDocument.getElementById(id);
if(_993!=null){
var _994=UserInterface.getBinding(_993);
if(_994&&!_994.isAttached){
_994.isLazy=true;
}else{
_993.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_995){
this._isLazy=_995;
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
var _997=this.getProperty("stateprovider");
var _998=this.getProperty("handle");
if(_997!=null&&_998!=null){
url=url.replace("${stateprovider}",_997).replace("${handle}",_998);
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
EditorDataBinding.prototype._onPageInitialize=function(_999){
EditorDataBinding.superclass._onPageInitialize.call(this,_999);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_99a){
EditorDataBinding.superclass.handleAction.call(this,_99a);
switch(_99a.type){
case Binding.ACTION_DIRTY:
if(_99a.target!=this){
if(!this.isDirty){
this.dirty();
}
_99a.consume();
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
EditorDataBinding.prototype.setValue=function(_99b){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_99c){
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
var _9a1=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9a1=fake.getValue()!="";
}
if(!_9a1&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9a1&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9a1;
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
var _9a5=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9a5!=null){
_9a5.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9a6){
_9a6=_9a6!=null?_9a6:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9a6;
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
var _9a7=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9a8=_9a7.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9a8;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9a8=_9a8.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9a8;
}
var self=this;
var _9aa=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9aa.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9ad=this.getProperty("label");
if(_9ad){
this.setLabel(_9ad);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9ae){
this.setProperty("label",_9ae);
if(this.shadowTree.labelBinding==null){
var _9af=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9af.attachClassName("fieldgrouplabel");
cell.insertBefore(_9af.bindingElement,cell.getElementsByTagName("div").item(1));
_9af.attach();
this.shadowTree.labelBinding=_9af;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9ae));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9b1){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9b1.bindingElement);
return _9b1;
};
FieldGroupBinding.prototype.addFirst=function(_9b2){
var _9b3=this.shadowTree[FieldGroupBinding.CENTER];
_9b3.insertBefore(_9b2.bindingElement,_9b3.firstChild);
return _9b2;
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
var _9b4=this.getProperty("relation");
if(_9b4!=null){
this.bindingRelation=_9b4;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9b5,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9b5,arg);
switch(_9b5){
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
FieldBinding.newInstance=function(_9b7){
var _9b8=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9b7);
return UserInterface.registerBinding(_9b8,FieldBinding);
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
var _9b9=this.getDescendantBindingByLocalName("fieldgroup");
if(_9b9!=null){
_9b9.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9ba=true;
var _9bb=this.getDescendantBindingsByLocalName("*");
while(_9bb.hasNext()){
var _9bc=_9bb.getNext();
if(Interfaces.isImplemented(IData,_9bc)){
var _9bd=_9bc.validate();
if(_9ba&&!_9bd){
_9ba=false;
}
}
}
return _9ba;
};
FieldsBinding.prototype.handleAction=function(_9be){
FieldsBinding.superclass.handleAction.call(this,_9be);
var _9bf=_9be.target;
if(_9bf!=this){
switch(_9be.type){
case Binding.ACTION_INVALID:
var _9c0=DataBinding.getAssociatedLabel(_9bf);
if(_9c0){
this._invalidFieldLabels.set(_9bf.key,_9c0);
}
if(_9bf.error){
if(!_9bf.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9bf.error},_9bf);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9be.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9bf.key)){
this._invalidFieldLabels.del(_9bf.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9be.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9c1=null;
if(this._invalidFieldLabels.hasEntries()){
_9c1=this._invalidFieldLabels.toList();
}
return _9c1;
};
FieldsBinding.newInstance=function(_9c2){
var _9c3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9c2);
return UserInterface.registerBinding(_9c3,FieldsBinding);
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
var _9c4=this.getProperty("image");
if(_9c4){
this.setImage(_9c4);
}
var _9c5=this.getProperty("tooltip");
if(_9c5){
this.setToolTip(_9c5);
}
var _9c6=this.getProperty("label");
if(_9c6){
this.setLabel(_9c6);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9c8=this.getAncestorBindingByLocalName("field");
if(_9c8){
var _9c9=true;
_9c8.getDescendantBindingsByLocalName("*").each(function(_9ca){
if(Interfaces.isImplemented(IData,_9ca)){
_9ca.focus();
_9c9=false;
}
return _9c9;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9cb){
this.setProperty("label",_9cb);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9cb);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9cc=this.getProperty("label");
if(!_9cc){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9cc=node.data;
}
}
return _9cc;
};
FieldDescBinding.prototype.setImage=function(_9ce){
this.setProperty("image",_9ce);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9cf){
this.setProperty("tooltip",_9cf);
if(this.isAttached){
this.bindingElement.title=_9cf;
}
};
FieldDescBinding.newInstance=function(_9d0){
var _9d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9d0);
return UserInterface.registerBinding(_9d1,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9d2){
var _9d3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9d2);
return UserInterface.registerBinding(_9d3,FieldDataBinding);
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
var _9d4=this._fieldHelpPopupBinding;
if(_9d4){
_9d4.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9d5=app.bindingMap.fieldhelpopupset;
var doc=_9d5.bindingDocument;
var _9d7=_9d5.add(PopupBinding.newInstance(doc));
var _9d8=_9d7.add(PopupBodyBinding.newInstance(doc));
_9d7.position=PopupBinding.POSITION_RIGHT;
_9d7.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9d8.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9d9=this.getProperty("label");
if(_9d9){
_9d8.bindingElement.innerHTML=Resolver.resolve(_9d9);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9d7;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9da=this.getAncestorBindingByLocalName("field");
if(_9da){
_9da.attachClassName("fieldhelp");
var _9db=ClickButtonBinding.newInstance(this.bindingDocument);
_9db.attachClassName("fieldhelp");
_9db.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9db);
_9db.attach();
var self=this;
_9db.oncommand=function(){
self.attachPopupBinding();
};
_9db.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9db;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9dd=this._fieldHelpPopupBinding;
if(_9dd&&!_9dd.isAttached){
_9dd.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9df){
RadioDataGroupBinding.superclass.handleAction.call(this,_9df);
switch(_9df.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9e1,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9e1,arg);
switch(_9e1){
case BroadcastMessages.KEY_ARROW:
var _9e3=null;
var next=null;
var _9e5=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9e5=this.getChildBindingsByLocalName("radio");
while(!_9e3&&_9e5.hasNext()){
var _9e6=_9e5.getNext();
if(_9e6.getProperty("ischecked")){
_9e3=_9e6;
}
}
break;
}
if(_9e3){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9e5.getFollowing(_9e3);
while(next!=null&&next.isDisabled){
next=_9e5.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9e5.getPreceding(_9e3);
while(next!=null&&next.isDisabled){
next=_9e5.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9e7){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9e7){
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
var _9e8=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9e8.type="hidden";
_9e8.name=this._name;
this.bindingElement.appendChild(_9e8);
this.shadowTree.input=_9e8;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9e9=null;
var _9ea=this.getChildBindingsByLocalName("radio");
while(!_9e9&&_9ea.hasNext()){
var _9eb=_9ea.getNext();
if(_9eb.isChecked){
_9e9=_9eb.getProperty("value");
}
}
return _9e9;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9ec){
};
RadioDataGroupBinding.prototype.setResult=function(_9ed){
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
this.propertyMethodMap["checked"]=function(_9ee){
if(_9ee!=this.isChecked){
this.setChecked(_9ee,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9ef=this.getProperty("ischecked");
if(_9ef!=this.isChecked){
this.setChecked(_9ef,true);
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
var _9f0=this.getProperty("relate");
var _9f1=this.getProperty("oncommand");
var _9f2=this.getProperty("isdisabled");
if(_9f0){
this.bindingRelate=_9f0;
this.relate();
}
if(_9f1){
this.oncommand=function(){
Binding.evaluate(_9f1,this);
};
}
if(_9f2==true){
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
var _9f4=this.getCallBackID();
this._buttonBinding.check=function(_9f5){
RadioButtonBinding.prototype.check.call(this,_9f5);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9f6){
RadioButtonBinding.prototype.uncheck.call(this,_9f6);
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
RadioDataBinding.prototype.setChecked=function(_9f7,_9f8){
this._buttonBinding.setChecked(_9f7,_9f8);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9f7);
};
RadioDataBinding.prototype.check=function(_9f9){
this.setChecked(true,_9f9);
};
RadioDataBinding.prototype.uncheck=function(_9fa){
this.setChecked(false,_9fa);
};
RadioDataBinding.prototype.setDisabled=function(_9fb){
if(_9fb!=this.isDisabled){
this.isDisabled=_9fb;
this._buttonBinding.setDisabled(_9fb);
if(_9fb){
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
var _9fd=DOMEvents.getTarget(e);
switch(_9fd){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9fe=this.getProperty("label");
if(_9fe){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9fe)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9ff){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9ff;
}
this.setProperty("label",_9ff);
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
this.propertyMethodMap["checked"]=function(_a00){
if(_a00!=this.isChecked){
this.setChecked(_a00,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a01=this.getProperty("ischecked");
if(_a01!=this.isChecked){
this.setChecked(_a01,true);
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
var _a03=DOMEvents.getTarget(e);
switch(_a03){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a04,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a04,arg);
switch(_a04){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a07){
_a07.consume();
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
var _a09=this.getCallBackID();
this._buttonBinding.check=function(_a0a){
ButtonBinding.prototype.check.call(this,_a0a);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a0a){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a0b){
ButtonBinding.prototype.uncheck.call(this,_a0b);
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
if(_a09!=null){
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
var _a0c=true;
var _a0d=this.bindingElement.parentNode;
if(_a0d){
var _a0e=UserInterface.getBinding(_a0d);
if(_a0e&&_a0e instanceof CheckBoxGroupBinding){
if(_a0e.isRequired){
if(_a0e.isValid){
_a0c=_a0e.validate();
}else{
_a0c=false;
}
}
}
}
return _a0c;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a0f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a0f.type="hidden";
_a0f.name=this._name;
_a0f.style.display="none";
this.bindingElement.appendChild(_a0f);
this.shadowTree.input=_a0f;
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
var _a10=null;
var _a11=this.getProperty("value");
if(this.isChecked){
_a10=_a11?_a11:"on";
}
return _a10;
};
CheckBoxBinding.prototype.setValue=function(_a12){
if(_a12==this.getValue()||_a12=="on"){
this.check(true);
}else{
if(_a12!="on"){
this.setPropety("value",_a12);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a13=false;
if(this.isChecked){
_a13=this._result!=null?this._result:true;
}
return _a13;
};
CheckBoxBinding.prototype.setResult=function(_a14){
if(typeof _a14=="boolean"){
this.setChecked(_a14,true);
}else{
this._result=_a14;
}
};
CheckBoxBinding.newInstance=function(_a15){
var _a16=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a15);
return UserInterface.registerBinding(_a16,CheckBoxBinding);
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
var _a17=true;
if(this.isRequired){
var _a18=this.getDescendantBindingsByLocalName("checkbox");
if(_a18.hasEntries()){
_a17=false;
while(_a18.hasNext()&&!_a17){
if(_a18.getNext().isChecked){
_a17=true;
}
}
}
if(_a17==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a17;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a19){
if(_a19){
if(!this._labelBinding){
var _a1a=LabelBinding.newInstance(this.bindingDocument);
_a1a.attachClassName("invalid");
_a1a.setImage("${icon:error}");
_a1a.setLabel("Selection required");
this._labelBinding=this.addFirst(_a1a);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a1b){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a1b);
switch(_a1b.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a1c){
var _a1d=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a1c);
return UserInterface.registerBinding(_a1d,CheckBoxGroupBinding);
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
var _a1e=DialogControlBinding.newInstance(this.bindingDocument);
_a1e.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a1e);
this._controlGroupBinding.attachRecursive();
var _a1f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a1f);
var _a20=this.getLabel();
if(_a20!=null){
this.setLabel(_a20);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a21=this._snapTargetBinding;
if(Binding.exists(_a21)==true){
_a21.removeActionListener(Binding.ACTION_BLURRED,this);
_a21.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a22){
if(Interfaces.isImplemented(IData,_a22)){
this._snapTargetBinding=_a22;
var _a23=_a22.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a23&&_a23.isConsumed){
this._environmentBinding=_a23.listener;
}
if(this._environmentBinding){
_a22.addActionListener(Binding.ACTION_BLURRED,this);
_a22.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a22)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a22.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a25=this._snapTargetBinding;
var _a26=this._environmentBinding;
var root=UserInterface.getBinding(_a25.bindingDocument.body);
if(Binding.exists(_a25)&&Binding.exists(_a26)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a25.isAttached&&_a26.isAttached){
var _a28=_a25.boxObject.getUniversalPosition();
var _a29=_a26.boxObject.getUniversalPosition();
_a29.y+=_a26.bindingElement.scrollTop;
_a29.x+=_a26.bindingElement.scrollLeft;
var tDim=_a25.boxObject.getDimension();
var eDim=_a26.boxObject.getDimension();
var _a2c=false;
if(_a28.y+tDim.h<_a29.y){
_a2c=true;
}else{
if(_a28.x+tDim.w<_a29.x){
_a2c=true;
}else{
if(_a28.y>_a29.y+eDim.h){
_a2c=true;
}else{
if(_a28.x>_a29.x+eDim.w){
_a2c=true;
}
}
}
}
if(!_a2c){
this._setComputedPosition(_a28,_a29,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a2d,_a2e,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a33=_a2d;
var _a34=false;
if(_a2d.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a34=true;
}else{
if(_a2d.x+tDim.w>=_a2e.x+eDim.w){
_a34=true;
}
}
if(_a34){
_a33.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a33.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a33.y-=(bDim.h);
_a33.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a33);
};
BalloonBinding.prototype.handleBroadcast=function(_a35,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a35,arg);
switch(_a35){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a37){
var _a38=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a37){
_a38=true;
}
}
return _a38;
};
BalloonBinding.prototype._setPosition=function(_a3a){
var _a3b=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a3b=true;
}
}
if(!_a3b){
this.bindingElement.style.left=_a3a.x+"px";
this.bindingElement.style.top=_a3a.y+"px";
this._point=_a3a;
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
BalloonBinding.prototype.handleAction=function(_a3d){
BalloonBinding.superclass.handleAction.call(this,_a3d);
var _a3e=_a3d.target;
switch(_a3d.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a3d.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a3e==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a3e)){
self.dispose();
}else{
if(_a3e.validate()){
var _a40=true;
if(_a3d.type==Binding.ACTION_BLURRED){
var root=_a3e.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a40=false;
}
}
if(_a40){
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
BalloonBinding.prototype.setLabel=function(_a43){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a44=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a43);
_a44.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a44);
}
this.setProperty("label",_a43);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a46){
var _a47=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a46);
var _a48=UserInterface.registerBinding(_a47,BalloonBinding);
_a48.hide();
return _a48;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a49,_a4a){
if(Interfaces.isImplemented(IData,_a4a)==true){
var _a4b,_a4c=_a4a.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a4c&&_a4c.isConsumed){
switch(_a4c.listener.constructor){
case StageBinding:
_a4b=false;
break;
case StageDialogBinding:
_a4b=true;
break;
}
}
var _a4d=_a4b?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a4e=_a4d.add(BalloonBinding.newInstance(top.app.document));
_a4e.setLabel(_a49.text);
_a4e.snapTo(_a4a);
_a4e.attach();
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
var _a4f=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a52=_a4f.getDataBinding(name);
if(_a52){
ErrorBinding.presentError({text:text},_a52);
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
FocusBinding.focusElement=function(_a53){
var _a54=true;
try{
_a53.focus();
Application.focused(true);
}
catch(exception){
var _a55=UserInterface.getBinding(_a53);
var _a56=SystemLogger.getLogger("FocusBinding.focusElement");
_a56.warn("Could not focus "+(_a55?_a55.toString():String(_a53)));
_a54=false;
}
return _a54;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a57){
var win=_a57.bindingWindow;
var id=_a57.bindingElement.id;
return {getBinding:function(){
var _a5a=null;
try{
if(Binding.exists(_a57)){
_a5a=win.bindingMap[id];
}
}
catch(exception){
}
return _a5a;
}};
};
FocusBinding.navigateNext=function(_a5b){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a5b);
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
var _a5c=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a5c&&_a5c.isConsumed){
if(_a5c.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a5d){
FocusBinding.superclass.handleAction.call(this,_a5d);
var _a5e=_a5d.target;
var _a5f=null;
if(this._isFocusManager){
switch(_a5d.type){
case FocusBinding.ACTION_ATTACHED:
if(_a5e!=this){
this._isUpToDate=false;
}
_a5d.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a5e!=this){
this._isUpToDate=false;
_a5d.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a5f=new FocusCrawler();
_a5f.mode=FocusCrawler.MODE_BLUR;
_a5f.crawl(_a5e.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a5d.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a5e!=this){
_a5f=new FocusCrawler();
_a5f.mode=FocusCrawler.MODE_FOCUS;
_a5f.crawl(_a5e.bindingElement);
}
_a5d.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a5e)){
this.claimFocus();
this._onFocusableFocused(_a5e);
}
_a5d.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a5e)){
this._onFocusableBlurred(_a5e);
}
_a5d.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a60){
var _a61=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a61==null&&list.hasNext()){
var _a63=list.getNext();
if(this._cachedFocus&&_a63==this._cachedFocus.getBinding()){
_a61=_a63;
}
}
if(_a61!=null){
if(_a63.isFocused){
var next=_a60?list.getPreceding(_a61):list.getFollowing(_a61);
if(!next){
next=_a60?list.getLast():list.getFirst();
}
next.focus();
}else{
_a61.focus();
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
var _a65=new FocusCrawler();
var list=new List();
_a65.mode=FocusCrawler.MODE_INDEX;
_a65.crawl(this.bindingElement,list);
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
var _a68=this._cachedFocus.getBinding();
if(_a68&&!_a68.isFocused){
_a68.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a69){
if(_a69!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a69;
_a69.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a69);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a6a){
_a6a.deleteProperty(FocusBinding.MARKER);
if(_a6a==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a6c){
this.bindingElement.style.left=_a6c+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a6d){
this.hiddenTabBindings.add(_a6d);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a6e=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a6e.getLabel());
item.setImage(_a6e.getImage());
item.associatedTabBinding=_a6e;
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
TabsButtonBinding.prototype.handleAction=function(_a71){
TabsButtonBinding.superclass.handleAction.call(this,_a71);
switch(_a71.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a72=this.selectedTabBinding;
if(_a72){
this.containingTabBoxBinding.moveToOrdinalPosition(_a72,0);
this.containingTabBoxBinding.select(_a72);
}
_a71.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a73){
var _a74=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a73);
_a74.setAttribute("type","checkbox");
_a74.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a74.className="tabbutton";
return UserInterface.registerBinding(_a74,TabsButtonBinding);
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
var _a75=TabBoxBinding.currentActiveInstance;
if(_a75!=null&&Binding.exists(_a75)){
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
var _a76=this.getTabElements().getLength();
var _a77=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a76!=_a77){
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
var _a78=this.getTabPanelElements();
while(_a78.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a78.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a79=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a7a=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a7b=_a79>_a7a?"tabsbelow":"tabsontop";
this.attachClassName(_a7b);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a7d=this.getTabPanelElements();
var _a7e=null;
var _a7f=this.getProperty("selectedindex");
if(_a7f!=null){
if(_a7f>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a80=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a82=_a7d.getNext();
this.registerTabBoxPair(tab,_a82);
if(_a7f&&_a80==_a7f){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a7e=tab;
}
}
_a80++;
}
if(!_a7e){
_a7e=tabs.getFirst();
_a7e.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a83){
var _a84=null;
var _a85=null;
if(this.isEqualSize){
var _a86=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a88=this.getTabPanelElements();
_a88.each(function(_a89){
max=_a89.offsetHeight>max?_a89.offsetHeight:max;
});
_a85=max+_a86.top+_a86.bottom;
if(_a83&&this._tabPanelsElement.style.height!=null){
_a84=this._tabPanelsElement.offsetHeight;
}
if(_a84!=null||_a85>_a84){
this._tabPanelsElement.style.height=_a85+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a8a){
_a8a._invalidCount=0;
_a8a.addActionListener(Binding.ACTION_INVALID,this);
_a8a.addActionListener(Binding.ACTION_VALID,this);
_a8a.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a8b){
TabBoxBinding.superclass.handleAction.call(this,_a8b);
var _a8c=_a8b.target;
var _a8d=_a8b.listener;
switch(_a8b.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a8c.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a8b.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a8c.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a8d._invalidCount++;
if(_a8d._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a8d.isSelected){
self._showWarning(_a8d,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a8d._invalidCount>0){
_a8d._invalidCount--;
if(_a8d._invalidCount==0){
if(_a8d.isSelected){
this._showWarning(_a8d,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a8d,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a8b._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a8b._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a90=DOMEvents.getTarget(e);
if(_a90==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a92=this.getTabPanelElements();
tabs.each(function(tab,_a94){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a95=_a92.get(_a94);
this.registerTabBoxPair(tab,_a95);
}
},this);
var _a96=this._tabBoxPairs;
for(var key in _a96){
var tab=_a96[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a90);
switch(_a90.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a9a=_a90.parentNode;
if(_a9a==this._tabsElement||_a9a==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a90==this._tabsElement||_a90==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a9c){
var _a9d=this.getBindingForArgument(arg);
if(_a9d!=null&&!_a9d.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a9d.select(_a9c);
this.getTabPanelBinding(_a9d).select(_a9c);
var _a9e=this.getProperty("selectedindex");
if(_a9e!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a9d.bindingElement,true));
}
this._selectedTabBinding=_a9d;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a9d.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a9f=this.getTabPanelBinding(_a9d);
this._showBalloon(_a9f,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_aa1){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_aa1.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_aa1};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_aa5){
var _aa6=null;
try{
var key=_aa5.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aa8=this._tabBoxPairs[key].tabPanel;
_aa6=UserInterface.getBinding(_aa8);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _aa6;
};
TabBoxBinding.prototype.getTabBinding=function(_aa9){
var key=_aa9.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aab=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_aab);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _aac=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_aac);
return _aac;
};
TabBoxBinding.prototype.appendTabByBindings=function(_aad,_aae){
var _aaf=_aad.bindingElement;
_aad.setProperty("selected",true);
var _ab0=this.summonTabPanelBinding();
var _ab1=_ab0.bindingElement;
if(_aae){
_ab1.appendChild(_aae instanceof Binding?_aae.bindingElement:_aae);
}
this.registerTabBoxPair(_aaf,_ab1);
UserInterface.getBinding(this._tabsElement).add(_aad);
this._tabPanelsElement.appendChild(_ab1);
_aad.attach();
UserInterface.getBinding(_ab1).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _aad;
};
TabBoxBinding.prototype.importTabBinding=function(_ab2){
var that=_ab2.containingTabBoxBinding;
var _ab4=that.getTabPanelBinding(_ab2);
var _ab5=_ab4.getBindingElement();
var _ab6=_ab2.getBindingElement();
that.dismissTabBinding(_ab2);
this._tabsElement.appendChild(_ab6);
this._tabPanelsElement.appendChild(_ab5);
this.registerTabBoxPair(_ab6,_ab5);
_ab2.containingTabBoxBinding=this;
this.select(_ab2);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ab7){
var _ab8=null;
if(_ab7.isSelected){
_ab8=this.getBestTab(_ab7);
this._selectedTabBinding=null;
}
var _ab9=this.getTabPanelBinding(_ab7);
this.unRegisterTabBoxPair(_ab7.bindingElement);
_ab7.dispose();
_ab9.dispose();
if(_ab8!=null){
this.select(_ab8);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_aba){
if(_aba.isSelected){
this.selectBestTab(_aba);
}
};
TabBoxBinding.prototype.selectBestTab=function(_abb){
var _abc=this.getBestTab(_abb);
if(_abc){
this.select(_abc);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_abd){
var _abe=null;
var _abf=_abd.getOrdinalPosition(true);
var _ac0=this.getTabBindings();
var _ac1=_ac0.getLength();
var _ac2=_ac1-1;
if(_ac1==1){
_abe=null;
}else{
if(_abf==_ac2){
_abe=_ac0.get(_abf-1);
}else{
_abe=_ac0.get(_abf+1);
}
}
return _abe;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ac3,_ac4){
var _ac5=this.bindingDocument.getElementById(_ac3.bindingElement.id);
var tab=this.getTabElements().get(_ac4);
this._tabsElement.insertBefore(_ac5,tab);
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
var _ac7=this._nodename_tab;
var _ac8=new List(this._tabsElement.childNodes);
var _ac9=new List();
while(_ac8.hasNext()){
var _aca=_ac8.getNext();
if(_aca.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aca)==_ac7){
_ac9.add(_aca);
}
}
return _ac9;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _acb=this._nodename_tabpanel;
var _acc=new List(this._tabPanelsElement.childNodes);
var _acd=new List();
_acc.each(function(_ace){
if(_ace.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ace)==_acb){
_acd.add(_ace);
}
});
return _acd;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _acf=new List();
var _ad0=this.getTabElements();
_ad0.each(function(_ad1){
_acf.add(UserInterface.getBinding(_ad1));
});
return _acf;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _ad2=new List();
this.getTabPanelElements().each(function(_ad3){
_ad2.add(UserInterface.getBinding(_ad3));
});
return _ad2;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _ad4=null;
if(this._selectedTabBinding){
_ad4=this.getTabPanelBinding(this._selectedTabBinding);
}
return _ad4;
};
TabBoxBinding.prototype._showWarning=function(_ad5,_ad6){
var _ad7=this.getTabBinding(_ad5);
if(_ad6){
if(_ad7.labelBinding.hasImage){
_ad7._backupImage=_ad7.getImage();
}
_ad7.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ad7._backupImage){
_ad7.setImage(_ad7._backupImage);
}else{
_ad7.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ad8,_ad9){
var _ada=this.getTabBinding(_ad8);
if((_ad9&&!_ada.isSelected)||!_ad9){
if(_ada.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ad9){
if(_ada.labelBinding.hasImage){
_ada._backupImage=_ada.getImage();
}
_ada.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_ada._backupImage!=null){
_ada.setImage(_ada._backupImage);
}else{
_ada.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_adb){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _ade=tab.getOrdinalPosition(true);
var next=null;
var _ae0=new List();
tabs.each(function(t){
if(t.isVisible){
_ae0.add(t);
}
});
if(_ae0.getLength()>1){
if(_ade==0&&!_adb){
next=_ae0.getLast();
}else{
if(_ade==_ae0.getLength()-1&&_adb){
next=_ae0.getFirst();
}else{
if(_adb){
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
var _ae3=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_ae3.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_ae4){
TabsBinding.superclass.handleAction.call(this,_ae4);
switch(_ae4.type){
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
var _ae7=self.bindingElement.offsetWidth;
if(_ae7!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_ae7;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_ae8){
if(_ae8 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_ae8);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _ae9=false;
var _aea,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _aed=this.constructor.TABBUTTON_IMPLEMENTATION;
var _aee=this.bindingElement.offsetWidth-_aed.RESERVED_SPACE;
var _aef=null;
var sum=0,_af1=0;
var _af2=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_af2){
tab=tabs.getNext();
_aea=UserInterface.getBinding(tab);
if(!_aef){
_aef=_aea;
}
sum+=tab.offsetWidth;
if(sum>=_aee){
_ae9=true;
if(_aea.isSelected){
if(!DOMUtil.isFirstElement(_aea.bindingElement,true)){
this.isManaging=false;
if(_aef){
_aef.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_aea,_af1-1);
_af2=false;
}
}else{
_aea.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_aea);
}
}else{
_aea.show();
_aef=_aea;
_af1++;
}
}
if(_af2){
if(_ae9&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _af3=_aef.getBindingElement();
var _af4=_af3.offsetLeft+_af3.offsetWidth;
var _af5=this.tabsButtonBinding;
setTimeout(function(){
_af5.show(_af4+4);
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
var _af6=TabBinding.superclass.serialize.call(this);
if(_af6){
_af6.label=this.getLabel();
_af6.image=this.getImage();
_af6.tooltip=this.getToolTip();
}
return _af6;
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
var _af7=this.bindingElement.getAttribute("image");
var _af8=this.bindingElement.getAttribute("label");
var _af9=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_af8){
this.setLabel(_af8);
}
if(_af7){
this.setImage(_af7);
}
if(_af9){
this.setToolTip(_af9);
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
TabBinding.prototype.setLabel=function(_afb){
if(_afb!=null){
this.setProperty("label",_afb);
if(this.isAttached){
this.labelBinding.setLabel(_afb);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_afc){
if(_afc){
this.setProperty("tooltip",_afc);
if(this.isAttached){
this.labelBinding.setToolTip(_afc);
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
var _afe=false;
if(Client.isMozilla==true){
}
if(!_afe){
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
TabBinding.prototype.select=function(_aff){
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
TabBinding.newInstance=function(_b00){
var _b01=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b00);
return UserInterface.registerBinding(_b01,TabBinding);
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
var _b02=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b02=true;
this._lastKnownDimension=dim1;
}
return _b02;
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
TabPanelBinding.prototype.select=function(_b05){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b05!=true){
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
TabPanelBinding.prototype.handleAction=function(_b06){
TabPanelBinding.superclass.handleAction.call(this,_b06);
var _b07=_b06.target;
switch(_b06.type){
case BalloonBinding.ACTION_INITIALIZE:
_b06.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b08){
var _b09=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b08);
UserInterface.registerBinding(_b09,TabPanelBinding);
return UserInterface.getBinding(_b09);
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
var _b0a=SplitBoxBinding.superclass.serialize.call(this);
if(_b0a){
_b0a.orient=this.getOrient();
_b0a.layout=this.getLayout();
}
return _b0a;
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
var _b0b=this.getSplitPanelElements();
if(_b0b.hasEntries()){
var _b0c=new List(this.getLayout().split(":"));
if(_b0c.getLength()!=_b0b.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b0b.each(function(_b0d){
_b0d.setAttribute("ratio",_b0c.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b0e=this.getProperty("orient");
if(_b0e){
this._orient=_b0e;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b0f=this.getSplitterBindings();
while(_b0f.hasNext()){
var _b10=_b0f.getNext();
if(_b10&&_b10.getProperty("collapsed")==true){
_b10.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b11){
SplitBoxBinding.superclass.handleAction.call(this,_b11);
switch(_b11.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b11.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b11.target);
_b11.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b11.target);
_b11.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b12){
this._getSplitPanelBindingForSplitter(_b12).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b13){
this._getSplitPanelBindingForSplitter(_b13).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b14){
var _b15=DOMUtil.getOrdinalPosition(_b14.bindingElement,true);
var _b16,_b17=this.getSplitPanelElements();
switch(_b14.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b16=_b17.get(_b15);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b16=_b17.get(_b15+1);
break;
}
return UserInterface.getBinding(_b16);
};
SplitBoxBinding.prototype.invokeLayout=function(_b18){
var _b19=this.isHorizontalOrient();
var _b1a=this.getSplitPanelBindings();
var _b1b=this.getSplitterBindings();
var _b1c=new List();
var _b1d,sum=0;
var _b1f=0;
_b1a.each(function(_b20){
if(_b20.isFixed==true){
if(!_b1a.hasNext()){
_b1f+=_b20.getFix();
}
_b1c.add(0);
sum+=0;
}else{
_b1d=_b20.getRatio();
_b1c.add(_b1d);
sum+=_b1d;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b1c.getLength()!=_b1a.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b21=_b19?this.getInnerWidth():this.getInnerHeight();
_b21-=_b1f;
_b1b.each(function(_b22){
if(_b22.isVisible){
_b21-=SplitterBinding.DIMENSION;
}
});
var unit=_b21/sum;
var _b24=0;
var self=this;
_b1a.each(function(_b26){
var span=0;
var _b28=_b1c.getNext();
if(_b26.isFixed){
span=_b26.getFix();
}else{
span=Math.round(unit*_b28);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b24+=span;
while(_b24>_b21){
_b24--;
span--;
}
if(!_b26.isFixed){
if(_b19){
_b26.setWidth(span);
}else{
_b26.setHeight(span);
}
}
});
}
if(_b18!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b29=this.getLayout();
if(_b29){
this.setProperty("layout",_b29);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b2a=this.isHorizontalOrient();
var _b2b=this.getSplitPanelBindings();
var _b2c=this.getSplitterBindings();
var _b2d=null;
var _b2e=null;
var unit=null;
var _b30=null;
var span=null;
_b2b.each(function(_b32){
if(!unit){
unit=_b2a?_b32.getWidth():_b32.getHeight();
}
span=_b2a?_b32.getWidth():_b32.getHeight();
if(_b30){
span-=_b30;
_b30=null;
}
_b2d=_b2c.getNext();
if(_b2d&&_b2d.offset){
_b30=_b2d.offset;
span+=_b30;
}
_b32.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b33){
this.logger.debug(_b33);
this.setProperty("layout",_b33);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b34="",_b35=this.getSplitPanelBindings();
_b35.each(function(_b36){
_b34+=_b36.getRatio().toString();
_b34+=_b35.hasNext()?":":"";
});
this.setProperty("layout",_b34);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b37=this.getSplitPanelElements();
_b37.each(function(_b38){
layout+="1"+(_b37.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b39){
this.bindingElement.style.width=_b39+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b3a){
this.bindingElement.style.height=_b3a+"px";
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
SplitBoxBinding.prototype.fit=function(_b3b){
if(!this.isFit||_b3b){
if(this.isHorizontalOrient()){
var max=0;
var _b3d=this.getSplitPanelBindings();
_b3d.each(function(_b3e){
var _b3f=_b3e.bindingElement.offsetHeight;
max=_b3f>max?_b3f:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b40){
var _b41=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b40);
return UserInterface.registerBinding(_b41,SplitBoxBinding);
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
var _b44=this.getProperty("hidden");
if(_b44){
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
var _b45=this.getProperty("ratiocache");
if(_b45){
this.setRatio(_b45);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b46){
if(!this.isFixed){
if(_b46!=this.getWidth()){
if(_b46<0){
_b46=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b46+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b46);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b47=null;
if(this.isFixed){
_b47=this.getFix();
}else{
_b47=this.bindingElement.offsetWidth;
}
return _b47;
};
SplitPanelBinding.prototype.setHeight=function(_b48){
if(!this.isFixed){
if(_b48!=this.getHeight()){
try{
this.bindingElement.style.height=_b48+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b49=null;
if(this.isFixed){
_b49=this.getFix();
}else{
_b49=this.bindingElement.offsetHeight;
}
return _b49;
};
SplitPanelBinding.prototype.setRatio=function(_b4a){
this.setProperty("ratio",_b4a);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b4b){
if(_b4b){
this._fixedSpan=_b4b;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b4b);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b4b);
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
SplitPanelBinding.newInstance=function(_b4c){
var _b4d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b4c);
return UserInterface.registerBinding(_b4d,SplitPanelBinding);
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
var _b4e=SplitBoxBinding.superclass.serialize.call(this);
if(_b4e){
_b4e.collapse=this.getProperty("collapse");
_b4e.collapsed=this.getProperty("collapsed");
_b4e.disabled=this.getProperty("isdisabled");
}
return _b4e;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b4f=this.getProperty("hidden");
if(_b4f){
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
SplitterBinding.prototype.setCollapseDirection=function(_b51){
this.setProperty("collapse",_b51);
this._collapseDirection=_b51;
};
SplitterBinding.prototype.handleAction=function(_b52){
SplitterBinding.superclass.handleAction.call(this,_b52);
switch(_b52.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b52.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b54=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b54.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b54.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b55){
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
SplitterBinding.newInstance=function(_b60){
var _b61=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b60);
return UserInterface.registerBinding(_b61,SplitterBinding);
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
var _b62=this.getProperty("selectedindex");
var _b63=this.getDeckElements();
if(_b63.hasEntries()){
var _b64=false;
var _b65=0;
while(_b63.hasNext()){
var deck=_b63.getNext();
if(_b62&&_b65==_b62){
deck.setAttribute("selected","true");
_b64=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b64=true;
}
}
_b65++;
}
if(!_b64){
_b63.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b68=this.getBindingForArgument(arg);
if(_b68!=null){
if(_b68!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b68.select();
this._selectedDeckBinding=_b68;
var _b69=this.getProperty("selectedindex");
if(_b69!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b68.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b6a=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b6a=true;
this._lastKnownDimension=dim1;
}
return _b6a;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b6d){
var _b6e=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b6d);
return UserInterface.registerBinding(_b6e,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b6f){
DeckBinding.superclass.handleAction.call(this,_b6f);
var _b70=_b6f.target;
switch(_b6f.type){
case BalloonBinding.ACTION_INITIALIZE:
_b6f.consume();
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
DeckBinding.newInstance=function(_b72){
var _b73=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b72);
return UserInterface.registerBinding(_b73,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b74){
if(_b74 instanceof ToolBarBodyBinding){
if(_b74.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b74;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b74;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b74);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b75=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b75){
this.setImageSize(_b75);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b77=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b77.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b77.isDefaultContent=true;
this.add(_b77);
_b77.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b79=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b79);
}
if(_b79!=null&&_b79.hasClassName("max")){
this._maxToolBarGroup(_b79,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b7b){
var _b7c=this.boxObject.getDimension().w;
var _b7d=CSSComputer.getPadding(this.bindingElement);
_b7c-=(_b7d.left+_b7d.right);
if(_b7b!=null){
_b7c-=_b7b.boxObject.getDimension().w;
if(!Client.isWindows){
_b7c-=1;
}
if(Client.isExplorer){
_b7c-=15;
}
}
max.bindingElement.style.width=_b7c+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b7e){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b7e);
};
ToolBarBinding.prototype.addLeft=function(_b7f,_b80){
var _b81=null;
if(this._toolBarBodyLeft!=null){
_b81=this._toolBarBodyLeft.add(_b7f,_b80);
}else{
throw new Error("No left toolbarbody");
}
return _b81;
};
ToolBarBinding.prototype.addLeftFirst=function(_b82,_b83){
var _b84=null;
if(this._toolBarBodyLeft){
_b84=this._toolBarBodyLeft.addFirst(_b82,_b83);
}else{
throw new Error("No left toolbarbody");
}
return _b84;
};
ToolBarBinding.prototype.addRight=function(_b85){
var _b86=null;
if(this._toolBarBodyRight){
_b86=this._toolBarBodyRight.add(_b85);
}else{
throw new Error("No left toolbarbody");
}
return _b86;
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
ToolBarBinding.newInstance=function(_b89){
var _b8a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b89);
return UserInterface.registerBinding(_b8a,ToolBarBinding);
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
var _b8b=this.getDescendantBindingsByLocalName("toolbargroup");
var _b8c=new List();
var _b8d=true;
_b8b.each(function(_b8e){
if(_b8e.isVisible&&!_b8e.isDefaultContent){
_b8c.add(_b8e);
}
});
while(_b8c.hasNext()){
var _b8f=_b8c.getNext();
_b8f.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b8d){
_b8f.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b8d=false;
}
if(!_b8c.hasNext()){
_b8f.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b92=list.getNext();
var _b93=_b92.getEqualSizeWidth();
if(_b93>max){
max=_b93;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b92=list.getNext();
_b92.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b94,_b95){
var _b96=ToolBarBinding.superclass.add.call(this,_b94);
if(!_b95){
if(_b94 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b96;
};
ToolBarBodyBinding.prototype.addFirst=function(_b97,_b98){
var _b99=ToolBarBinding.superclass.addFirst.call(this,_b97);
if(!_b98){
if(_b97 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b99;
};
ToolBarBodyBinding.newInstance=function(_b9a){
var _b9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b9a);
return UserInterface.registerBinding(_b9b,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b9c){
switch(_b9c){
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
var _b9d=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b9d)=="toolbarbody"){
UserInterface.getBinding(_b9d).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b9e=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b9e)=="toolbarbody"){
UserInterface.getBinding(_b9e).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b9f){
var _ba0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b9f);
return UserInterface.registerBinding(_ba0,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_ba1){
var _ba2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ba1);
return UserInterface.registerBinding(_ba2,ToolBarButtonBinding);
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
var _ba3=this.getProperty("label");
var _ba4=this.getProperty("image");
if(_ba3){
this.setLabel(_ba3);
}
if(_ba4){
this.setImage(_ba4);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_ba5,_ba6){
if(this.isAttached){
this._labelBinding.setLabel(_ba5,_ba6);
}
this.setProperty("label",_ba5);
};
ToolBarLabelBinding.prototype.setImage=function(_ba7,_ba8){
if(this.isAttached){
this._labelBinding.setImage(_ba7,_ba8);
}
this.setProperty("image",_ba7);
};
ToolBarLabelBinding.newInstance=function(_ba9){
var _baa=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_ba9);
return UserInterface.registerBinding(_baa,ToolBarLabelBinding);
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
var _bab=this.getDescendantBindingsByLocalName("clickbutton");
if(_bab.hasEntries()){
while(_bab.hasNext()){
var _bac=_bab.getNext();
if(_bac.isDefault){
this._defaultButton=_bac;
_bac.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bac.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bab;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bad,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bad,arg);
switch(_bad){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _baf=this.getAncestorBindingByType(DialogBinding,true);
if(_baf!=null&&_baf.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bb0){
DialogToolBarBinding.superclass.handleAction.call(this,_bb0);
var _bb1=_bb0.target;
var _bb2=false;
var _bb3=this._buttons.reset();
if(_bb1 instanceof ClickButtonBinding){
switch(_bb0.type){
case Binding.ACTION_FOCUSED:
_bb1.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bb1;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bb1.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bb2&&_bb3.hasNext()){
var _bb4=_bb3.getNext();
_bb2=_bb4.isFocused;
}
if(!_bb2){
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
ComboBoxBinding.newInstance=function(_bb6){
var _bb7=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bb6);
return UserInterface.registerBinding(_bb7,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bb8,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bb8,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bbc=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bbc.each(function(_bbd){
var _bbe=_bbd.getProperty("oncommand");
_bbd.setProperty("hiddencommand",_bbe);
_bbd.deleteProperty("oncommand");
_bbd.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bbf=null;
var _bc0=this.getActiveMenuItemId();
_bbc.reset();
while(_bbc.hasNext()){
var _bc1=_bbc.getNext();
if(_bc1.getProperty("id")==_bc0){
_bbf=_bc1;
break;
}
}
if(_bbf==null&&_bbc.hasEntries()){
_bbf=_bbc.getFirst();
}
if(_bbf!=null){
this.setButton(_bbf);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bc2){
if(_bc2 instanceof MenuItemBinding){
var _bc3=_bc2.getProperty("label");
var _bc4=_bc2.getProperty("image");
var _bc5=_bc2.getProperty("image-hover");
var _bc6=_bc2.getProperty("image-active");
var _bc7=_bc2.getProperty("image-disabled");
var _bc8=_bc2.getProperty("hiddencommand");
this.setLabel(_bc3?_bc3:"");
this.image=_bc4;
this.imageHover=_bc4;
this.imageActive=_bc6;
this.imageDisabled=_bc7;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bc8,this);
};
this.hideActiveItem(_bc2);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bc9){
if(_bc9 instanceof MenuItemBinding){
this.setButton(_bc9);
this.setActiveMenuItemId(_bc9.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bca){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bcb){
if(_bcb==_bca){
Binding.prototype.hide.call(_bcb);
}else{
Binding.prototype.show.call(_bcb);
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
var _bcd=this._views;
for(var _bce in ViewDefinitions){
var def=ViewDefinitions[_bce];
var key=def.perspective;
if(key!=null){
if(!_bcd.has(key)){
_bcd.set(key,new List());
}
var list=_bcd.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bd2,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bd2,arg);
switch(_bd2){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bd5=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bd5.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bd5.add(StageViewMenuItemBinding.newInstance(_bd5.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bd5.show();
}else{
_bd5.hide();
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
TreeBinding.grid=function(_bd9){
var _bda=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bd9);
var _bdc=_bd9%_bda;
if(_bdc>0){
_bd9=_bd9-_bdc+_bda;
}
return _bd9+TreeBodyBinding.PADDING_TOP;
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
var _bdd=this.getProperty("focusable");
if(_bdd!=null){
this._isFocusable=_bdd;
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
var _bdf=this.getProperty("builder");
if(_bdf){
this._buildFromTextArea(_bdf);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _be0=this.getProperty("selectable");
var _be1=this.getProperty("selectionproperty");
var _be2=this.getProperty("selectionvalue");
if(_be0){
this.setSelectable(true);
if(_be1){
this.setSelectionProperty(_be1);
}
if(_be2){
this.setSelectionValue(_be2);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _be5=UserInterface.getBinding(area);
var _be6=this._treeBodyBinding;
function build(){
_be6.subTreeFromString(area.value);
}
_be5.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_be7){
var _be8=_be7.getHandle();
if(this._treeNodeBindings.has(_be8)){
throw "Duplicate treenodehandles registered: "+_be7.getLabel();
}else{
this._treeNodeBindings.set(_be8,_be7);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_be8)){
_be7.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_bea){
this._treeNodeBindings.del(_bea.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_beb){
var _bec=null;
if(this._treeNodeBindings.has(_beb)){
_bec=this._treeNodeBindings.get(_beb);
}else{
throw "No such treenode: "+_beb;
}
return _bec;
};
TreeBinding.prototype.handleAction=function(_bed){
TreeBinding.superclass.handleAction.call(this,_bed);
var _bee=_bed.target;
switch(_bed.type){
case TreeNodeBinding.ACTION_OPEN:
_bed.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bee);
_bed.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bee;
this.focusSingleTreeNodeBinding(_bee);
if(!this.isFocused){
this.focus();
}
_bed.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bee;
this.focusSingleTreeNodeBinding(_bee);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bee;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bee;
this.focusSingleTreeNodeBinding(_bee);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bed.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bee.isFocused){
this.blurSelectedTreeNodes();
}
_bed.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bef,_bf0){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bf1){
if(_bf1!=null&&!_bf1.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bf1);
_bf1.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_bf2){
this.blurSelectedTreeNodes();
while(_bf2.hasNext()){
var _bf3=_bf2.getNext();
this._focusedTreeNodeBindings.add(_bf3);
_bf3.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _bf4=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _bf5=false;
var _bf6=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _bf7=this._focusedTreeNodeBindings.getNext();
var _bf8=_bf7.getProperty(this._selectionProperty);
if(_bf8!=null){
if(!this._selectionValue||this._selectionValue[_bf8]){
_bf6=(this._selectedTreeNodeBindings[_bf7.key]=_bf7);
var _bf9=_bf4[_bf7.key];
if(!_bf9||_bf9!=_bf6){
_bf5=true;
}
}
}
}
if(_bf6){
if(_bf5){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_bf4){
for(var key in _bf4){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _bfb=new List();
for(var key in this._selectedTreeNodeBindings){
_bfb.add(this._selectedTreeNodeBindings[key]);
}
return _bfb;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_bfd){
_bfd.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_bfe){
var _bff=_bfe.getDescendantBindingsByLocalName("treenode");
var _c00=true;
var self=this;
_bff.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c00;
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
var _c03=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c03!=null){
this.focusSingleTreeNodeBinding(_c03);
_c03.callback();
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
TreeBinding.prototype.add=function(_c04){
var _c05=null;
if(this._treeBodyBinding){
_c05=this._treeBodyBinding.add(_c04);
}else{
this._treeNodeBuffer.add(_c04);
_c05=_c04;
}
return _c05;
};
TreeBinding.prototype.addFirst=function(_c06){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c07=this._treeBodyBinding.bindingElement;
_c07.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c08,_c09){
if(_c09.isContainer&&_c09.isOpen){
_c09.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c0a){
this._isSelectable=_c0a;
if(_c0a){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c0b){
this._selectionProperty=_c0b;
};
TreeBinding.prototype.setSelectionValue=function(_c0c){
if(_c0c){
var list=new List(_c0c.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c0e,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c0e,arg);
switch(_c0e){
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
var _c10=this.getFocusedTreeNodeBindings();
if(_c10.hasEntries()){
var node=_c10.getFirst();
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
var _c13=this.getFocusedTreeNodeBindings();
if(_c13.hasEntries()){
var node=_c13.getFirst();
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
var _c16=null;
while(next==null&&(_c16=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c16!=null){
next=_c16.getNextBindingByLocalName("treenode");
}
node=_c16;
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
var _c18=DOMEvents.getTarget(e);
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
var _c19=new TreeCrawler();
var list=new List();
_c19.mode=TreeCrawler.MODE_GETOPEN;
_c19.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c1c=list.getNext();
map.set(_c1c.getHandle(),true);
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
var _c21=this._positionIndicatorBinding;
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
if(y!=_c21.getPosition().y){
_c21.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c21.isVisible){
_c21.show();
}
}else{
if(_c21.isVisible){
_c21.hide();
}
}
}else{
if(_c21.isVisible){
_c21.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c24){
this._acceptingTreeNodeBinding=_c24;
this._acceptingPosition=_c24.boxObject.getLocalPosition();
this._acceptingDimension=_c24.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c24);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c25){
var map={};
var _c27=_c25.getChildBindingsByLocalName("treenode");
var _c28,pos,dim,y;
y=TreeBinding.grid(_c25.boxObject.getLocalPosition().y);
map[y]=true;
while(_c27.hasNext()){
_c28=_c27.getNext();
pos=_c28.boxObject.getLocalPosition();
dim=_c28.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c2e in this._acceptingPositions){
if(_c2e==y){
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
TreeBinding.newInstance=function(_c2f){
var _c30=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c2f);
var _c31=UserInterface.registerBinding(_c30,TreeBinding);
_c31.treeBodyBinding=TreeBodyBinding.newInstance(_c2f);
return _c31;
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
TreeBodyBinding.prototype.accept=function(_c32){
if(_c32 instanceof TreeNodeBinding){
this.logger.debug(_c32);
}
};
TreeBodyBinding.prototype.handleAction=function(_c33){
TreeBodyBinding.superclass.handleAction.call(this,_c33);
switch(_c33.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c33.target);
_c33.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c34){
var a=this.boxObject.getDimension().h;
var y=_c34.boxObject.getLocalPosition().y;
var h=_c34.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c3a=_c34.labelBinding.bindingElement;
if(y-t<0){
_c3a.scrollIntoView(true);
}else{
if(y-t+h>a){
_c3a.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c3b){
var _c3c=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c3b);
return UserInterface.registerBinding(_c3c,TreeBodyBinding);
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
var _c3d=TreeNodeBinding.superclass.serialize.call(this);
if(_c3d){
_c3d.label=this.getLabel();
_c3d.image=this.getImage();
var _c3e=this.getHandle();
if(_c3e&&_c3e!=this.key){
_c3d.handle=_c3e;
}
if(this.isOpen){
_c3d.open=true;
}
if(this.isDisabled){
_c3d.disabled=true;
}
if(this.dragType){
_c3d.dragtype=this.dragType;
}
if(this.dragAccept){
_c3d.dragaccept=this.dragAccept;
}
}
return _c3d;
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
var _c40=UserInterface.getBinding(node);
if(_c40&&_c40.containingTreeBinding){
this.containingTreeBinding=_c40.containingTreeBinding;
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
var _c41=this.key;
var _c42=this.getProperty("handle");
if(_c42){
_c41=_c42;
}
return _c41;
};
TreeNodeBinding.prototype.setHandle=function(_c43){
this.setProperty("handle",_c43);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c45=this.getProperty("label");
var _c46=this.getProperty("tooltip");
var _c47=this.getProperty("oncommand");
var _c48=this.getProperty("onbindingfocus");
var _c49=this.getProperty("onbindingblur");
var _c4a=this.getProperty("focused");
var _c4b=this.getProperty("callbackid");
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
if(_c45!=null){
this.setLabel(_c45);
}
if(_c46!=null){
this.setToolTip(_c46);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c4d=this.bindingWindow.WindowManager;
if(_c47!=null){
this.oncommand=function(){
Binding.evaluate(_c47,this);
};
}
if(_c48!=null){
this.onfocus=function(){
Binding.evaluate(_c48,this);
};
}
if(_c49!=null){
this.onblur=function(){
Binding.evaluate(_c49,this);
};
}
if(_c4a==true){
this.focus();
}
if(_c4b!=null){
Binding.dotnetify(this,_c4b);
}
};
TreeNodeBinding.prototype.handleAction=function(_c4e){
TreeNodeBinding.superclass.handleAction.call(this,_c4e);
switch(_c4e.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c4e.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c4f,_c50){
var _c51=true;
if(_c4f instanceof TreeNodeBinding){
var _c52=false;
var _c53=this.bindingElement;
var _c54=this.containingTreeBinding.bindingElement;
while(!_c52&&_c53!=_c54){
if(_c53==_c4f.getBindingElement()){
_c52=true;
}else{
_c53=_c53.parentNode;
}
}
if(_c52){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c51=false;
}else{
this.acceptTreeNodeBinding(_c4f,_c50);
}
}else{
_c51=false;
}
return _c51;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c55,_c56){
var _c57=_c55.serializeToString();
var _c58=new BindingParser(this.bindingDocument);
var _c59=_c58.parseFromString(_c57).getFirst();
_c56=_c56?_c56:this.containingTreeBinding.getDropIndex();
var _c5a=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c59,_c5a.get(_c56));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c55.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c5b=this.getProperty("image");
var _c5c=this.getProperty("image-active");
var _c5d=this.getProperty("image-disabled");
_c5c=_c5c?_c5c:this.isContainer?_c5b?_c5b:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c5b?_c5b:TreeNodeBinding.DEFAULT_ITEM;
_c5d=_c5d?_c5d:this.isContainer?_c5b?_c5b:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c5b?_c5b:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c5b=_c5b?_c5b:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c5b,imageHover:null,imageActive:_c5c,imageDisabled:_c5d});
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
TreeNodeBinding.prototype.setLabel=function(_c5f){
this.setProperty("label",String(_c5f));
if(this.isAttached){
this.labelBinding.setLabel(String(_c5f));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c60){
this.setProperty("tooltip",String(_c60));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c60));
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
var _c61=this.imageProfile.getDefaultImage();
var _c62=this.imageProfile.getActiveImage();
_c62=_c62?_c62:_c61;
return this.isOpen?_c62:_c61;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c64=DOMEvents.getTarget(e);
var _c65=this.labelBinding.bindingElement;
var _c66=this.labelBinding.shadowTree.labelBody;
var _c67=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c64){
case _c65:
this._onAction(e);
break;
case _c66:
case _c67:
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
if(_c64.parentNode==this.bindingElement&&_c64.__updateType==Update.TYPE_INSERT){
var _c65=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c64)=="treenode"){
if(_c64==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c64,_c65.nextSibling);
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
switch(_c64){
case _c65:
case _c66:
case _c67:
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
var _c6b=true;
if(e.type=="mousedown"){
var _c6c=e.button==(e.target?0:1);
if(!_c6c){
_c6b=false;
}
}
if(_c6b){
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
var _c6e=false;
if(e!=null){
_c6e=e.shiftKey;
}
this.dispatchAction(_c6e?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c71=this.getDescendantBindingsByLocalName("treenode");
_c71.each(function(_c72){
_c72.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c73){
var _c74=_c73.getAttribute("focused");
if(_c74=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c75){
var _c76=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c75);
return UserInterface.registerBinding(_c76,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c77){
var _c78=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c77);
return UserInterface.registerBinding(_c78,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c79){
this.bindingElement.style.left=_c79.x+"px";
this.bindingElement.style.top=_c79.y+"px";
this._geometry.x=_c79.x;
this._geometry.y=_c79.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c7a){
var _c7b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c7a);
return UserInterface.registerBinding(_c7b,TreePositionIndicatorBinding);
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
this.addFilter(function(_c7d){
var _c7e=UserInterface.getBinding(_c7d);
var _c7f=null;
var _c7f=null;
if(!_c7e instanceof TreeNodeBinding){
_c7f=NodeCrawler.SKIP_NODE;
}
return _c7f;
});
this.addFilter(function(_c80,list){
var _c82=UserInterface.getBinding(_c80);
var _c83=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c82.isOpen){
list.add(_c82);
}
break;
}
return _c83;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c84){
this.binding=_c84;
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
DockTabsButtonBinding.newInstance=function(_c85){
var _c86=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c85);
_c86.setAttribute("type","checkbox");
_c86.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c86.className="tabbutton";
return UserInterface.registerBinding(_c86,DockTabsButtonBinding);
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
var _c87=DockBinding.superclass.serialize.call(this);
if(_c87){
_c87.active=this.isActive?true:null;
_c87.collapsed=this.isCollapsed?true:null;
}
return _c87;
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
var _c88=UserInterface.getBinding(this.bindingElement.parentNode);
var _c89=MatrixBinding.newInstance(this.bindingDocument);
_c89.attachClassName("dockliner");
this.shadowTree.dockLiner=_c89;
_c88.add(_c89);
_c89.attach();
_c89.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c8b){
var _c8c=this.getSelectedTabPanelBinding();
if(_c8c){
_c8c.isVisible=_c8b;
_c8c.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c8d){
var _c8e=this._getBindingForDefinition(_c8d);
var _c8f=DockTabBinding.newInstance(this.bindingDocument);
_c8f.setHandle(_c8d.handle);
_c8f.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c8d.label);
_c8f.setImage(_c8d.image);
_c8f.setToolTip(_c8d.toolTip);
_c8f.setEntityToken(_c8d.entityToken);
_c8f.setAssociatedView(_c8e);
this.appendTabByBindings(_c8f,null);
this._setupPageBindingListeners(_c8f);
var _c90=this.getTabPanelBinding(_c8f);
_c8e.snapToBinding(_c90);
var _c91=this.bindingWindow.bindingMap.views;
_c91.add(_c8e);
if(!this.isActive){
this.activate();
}
_c8e.attach();
};
DockBinding.prototype.prepareOpenView=function(_c92,_c93){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c93.setLabel(_c92.label);
_c93.setImage(_c92.image);
_c93.setToolTip(_c92.toolTip);
this._setupPageBindingListeners(_c93);
var _c94=this.getTabPanelBinding(_c93);
var _c95=this._getBindingForDefinition(_c92);
_c93.setAssociatedView(_c95);
_c95.snapToBinding(_c94);
UserInterface.getBinding(this.bindingDocument.body).add(_c95);
_c95.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c96){
var _c97=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c97.bindingDocument);
view.setDefinition(_c96);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c99){
var _c9a=this.getTabPanelBinding(_c99);
var self=this;
var _c9c={handleAction:function(_c9d){
var _c9e=_c9d.target;
switch(_c9d.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c9e.reflex(true);
var view=_c99.getAssociatedView();
if(_c9e.bindingWindow==view.getContentWindow()){
_c99.updateDisplay(_c9e);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c99.onPageInitialize(_c9e);
_c9d.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c99.updateDisplay(_c9e);
_c9d.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c99.updateEntityToken(_c9e);
_c9d.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c99.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_c99.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c99);
_c9d.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c99,true);
_c9d.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c99);
break;
case Binding.ACTION_FORCE_REFLEX:
_c9a.reflex(true);
_c9d.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c99.isDirty){
_c99.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_ca0){
_c9a.addActionListener(_ca0,_c9c);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_ca1){
DockBinding.superclass.handleAction.call(this,_ca1);
var _ca2=_ca1.target;
switch(_ca1.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_ca1.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_ca2 instanceof DockBinding){
if(_ca2.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_ca2);
if(this.isActive){
_ca2.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_ca2);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_ca3,arg){
DockBinding.superclass.handleBroadcast.call(this,_ca3,arg);
switch(_ca3){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _ca5=arg;
if(_ca5.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_ca5.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_ca6){
var tabs=this.getTabBindings();
var _ca8=false;
while(tabs.hasNext()&&!_ca8){
var tab=tabs.getNext();
var _caa=tab.getEntityToken();
if(_caa!=null&&_caa==_ca6){
if(!tab.isSelected){
this.select(tab,true);
_ca8=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cab){
this._handleCollapse(true,_cab);
};
DockBinding.prototype.unCollapse=function(_cac){
this._handleCollapse(false,_cac);
};
DockBinding.prototype._handleCollapse=function(_cad,_cae){
var _caf=this.getChildBindingByLocalName("dockpanels");
var _cb0=this.getAncestorBindingByLocalName("splitbox");
if(_cad){
_caf.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cae&&_cb0.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_caf.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cae){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cad);
this.isCollapsed=_cad;
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
DockBinding.prototype.closeTab=function(_cb5,_cb6){
if(_cb5.isDirty&&!_cb6){
var _cb7=Resolver.resolve(_cb5.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cb7),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cb9){
switch(_cb9){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cb5);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cb5);
break;
}
}});
}else{
this.removeTab(_cb5);
}
};
DockBinding.prototype.closeTabsExcept=function(_cba){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cba){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cbd){
var _cbe=_cbd.getAssociatedView();
_cbe.saveContainedEditor();
var self=this;
var _cc0={handleBroadcast:function(_cc1,arg){
switch(_cc1){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cbe.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cc0);
if(arg.isSuccess){
self.removeTab(_cbd);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cc0);
};
DockBinding.prototype.appendTabByBindings=function(_cc3,_cc4){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cc3,_cc4);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cc5){
_cc5=_cc5?_cc5+"px":"100%";
this.bindingElement.style.width=_cc5;
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
DockBinding.prototype.showControls=function(_cc6){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cc6){
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
var _cc9=DockControlBinding.newInstance(this.bindingDocument);
_cc9.setControlType(type);
return _cc9;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ccb=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ccb)){
_ccb=_ccb>0?_ccb-1:0;
self.bindingElement.style.width=new String(_ccb)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ccc){
DockTabsBinding.superclass.handleCrawler.call(this,_ccc);
switch(_ccc.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cce=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cce)){
_cce=_cce>0?_cce-1:0;
self.bindingElement.style.width=new String(_cce)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_ccf){
var _cd0=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_ccf);
return UserInterface.registerBinding(_cd0,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cd1){
this._viewBinding=_cd1;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cd2=DockTabBinding.superclass.serialize.call(this);
if(_cd2){
_cd2.label=null;
_cd2.image=null;
_cd2.handle=this.getHandle();
}
return _cd2;
};
DockTabBinding.prototype.setHandle=function(_cd3){
this.setProperty("handle",_cd3);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cd4){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cd4;
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
var _cd5=DialogControlBinding.newInstance(this.bindingDocument);
_cd5.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cd5);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cd6){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cd6){
this.isDirty=_cd6;
if(Binding.exists(this.labelBinding)){
var _cd7=this.labelBinding.getLabel();
if(_cd7!=null){
this.labelBinding.setLabel(_cd6?"*"+_cd7:_cd7.slice(1,_cd7.length));
}else{
this.labelBinding.setLabel(_cd6?"*":"");
}
}
}
var _cd8=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cd8.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cd8.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cd9){
this.setLabel(_cd9.getLabel());
this.setImage(_cd9.getImage());
this.setToolTip(_cd9.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cda){
this.setEntityToken(_cda.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cdb){
DockTabBinding.superclass.handleAction.call(this,_cdb);
var _cdc=_cdb.target;
switch(_cdb.type){
case ControlBinding.ACTION_COMMAND:
if(_cdc.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cdb.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cdc);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cdd){
var cmd=_cdd.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cdf){
if(!_cdf){
if(!this.getLabel()){
_cdf=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cdf=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_cdf);
};
DockTabBinding.prototype.setImage=function(_ce0){
if(!_ce0){
if(!this.getImage()){
_ce0=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_ce0=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_ce0);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _ce3=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_ce3;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_ce3;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_ce3;
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
var _ce5=this.bindingElement;
setTimeout(function(){
_ce5.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_ce6,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_ce6,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_ce6){
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
DockTabBinding.prototype.select=function(_ceb){
DockTabBinding.superclass.select.call(this,_ceb);
this._updateBroadcasters();
if(_ceb!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cec=top.app.bindingMap.broadcasterCurrentTabDirty;
var _ced=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_ced.enable();
if(this.isDirty){
_cec.enable();
}else{
_cec.disable();
}
}else{
_ced.disable();
_cec.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cee){
if(this._canUpdateTree||_cee){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cef=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cf1=win.bindingMap.savebutton;
if(_cf1!=null){
_cef=true;
}
}
}
return _cef;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cf2){
var _cf3=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cf2);
return UserInterface.registerBinding(_cf3,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_cf4){
var _cf5=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_cf4);
return UserInterface.registerBinding(_cf5,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_cf6){
DockPanelBinding.superclass.select.call(this,_cf6);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_cf7){
DockPanelBinding.superclass.handleCrawler.call(this,_cf7);
if(_cf7.response==null){
if(_cf7.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_cf7.id==FocusCrawler.ID){
_cf7.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_cf8){
var _cf9=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_cf8);
return UserInterface.registerBinding(_cf9,DockPanelBinding);
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
DockControlBinding.newInstance=function(_cfa){
var _cfb=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cfa);
return UserInterface.registerBinding(_cfb,DockControlBinding);
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
ViewBinding.getInstance=function(_cfc){
var _cfd=ViewBinding._instances.get(_cfc);
if(!_cfd){
var cry="ViewBinding.getInstance: No such instance: "+_cfc;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _cfd;
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
var _d00=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d00){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d01=snap.boxObject.getGlobalPosition();
var _d02=snap.boxObject.getDimension();
if(!Point.isEqual(_d01,this._lastknownposition)){
this.setPosition(_d01);
this._lastknownposition=_d01;
}
if(!Dimension.isEqual(_d02,this._lastknowndimension)){
this.setDimension(_d02);
this._lastknowndimension=_d02;
var _d03=_d02.h-ViewBinding.VERTICAL_ADJUST;
_d03=_d03<0?0:_d03;
this.windowBinding.getBindingElement().style.height=new String(_d03)+"px";
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
var _d04=this._viewDefinition.flowHandle;
if(_d04!=null){
FlowControllerService.CancelFlow(_d04);
}
}
if(this._viewDefinition!=null){
var _d05=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d05);
this.logger.fine("ViewBinding closed: \""+_d05+"\"");
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
var _d07=null;
if(this._viewDefinition!=null){
_d07=this._viewDefinition.handle;
}
return _d07;
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
ViewBinding.prototype.setDefinition=function(_d08){
this._viewDefinition=_d08;
if(_d08.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d09){
ViewBinding.superclass.handleAction.call(this,_d09);
var _d0a=_d09.target;
switch(_d09.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d09.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d0a.isActivated){
_d0a.onActivate();
}
}
_d09.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d0a==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d09.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d0a==this._snapBinding){
if(_d0a.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d0a.getContentWindow().isPostBackDocument){
if(_d09.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d0a.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d0a==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d0a.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d09.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d09.type==WindowBinding.ACTION_ONLOAD){
var win=_d0a.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d0a);
}
}
}
_d09.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d0a.label&&this._viewDefinition.label){
_d0a.label=this._viewDefinition.label;
}
if(!_d0a.image&&this._viewDefinition.image){
_d0a.image=this._viewDefinition.image;
}
if(_d0a.bindingWindow==this.getContentWindow()){
this._pageBinding=_d0a;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d0a.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d0a==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d09.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d09.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d0f,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d0f,arg);
switch(_d0f){
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
var _d13=def.argument;
if(_d13!=null){
page.setPageArgument(_d13);
}
var _d14=def.width;
if(_d14!=null){
page.width=_d14;
}
var _d15=def.height;
if(_d15!=null){
page.height=_d15;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d16){
ViewBinding.superclass.handleCrawler.call(this,_d16);
switch(_d16.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d16.id==FocusCrawler.ID){
if(_d16.previousNode!=this._snapBinding.bindingElement){
_d16.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d16.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d17){
_d17.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d17.x+"px";
this.bindingElement.style.top=_d17.y+"px";
};
ViewBinding.prototype.setDimension=function(_d18){
_d18.h-=ViewBinding.VERTICAL_ADJUST;
_d18.w-=ViewBinding.HORIZONTAL_ADJUST;
_d18.w-=1;
if(_d18.h<0){
_d18.h=0;
}
if(_d18.w<0){
_d18.w=0;
}
this.bindingElement.style.width=String(_d18.w)+"px";
this.bindingElement.style.height=String(_d18.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d19){
this.isFlexBoxBehavior=false;
_d19.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d19.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d19.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d19;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d1a=null;
if(this.isFreeFloating==true){
_d1a=this._snapBinding.getBindingElement();
}else{
_d1a=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d1a;
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
ViewBinding.prototype.reload=function(_d1b){
this._isLoaded=false;
this.windowBinding.reload(_d1b);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d1c=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d1c=true;
}
}
if(!_d1c){
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
ViewBinding.newInstance=function(_d20){
var _d21=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d20);
var _d22=UserInterface.registerBinding(_d21,ViewBinding);
_d22.windowBinding=_d22.add(WindowBinding.newInstance(_d20));
_d22.windowBinding.isFlexible=false;
return _d22;
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
var _d2a=this.bindingWindow.__doPostBack;
var _d2b=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d2b){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d2c,_d2d){
if(!form.__isSetup){
Application.lock(self);
_d2b=true;
}
self.manifestAllDataBindings();
_d2a(_d2c,_d2d);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d2e,list){
var _d30=this.bindingWindow.bindingMap.__REQUEST;
if(_d30!=null&&this._isDotNet()){
switch(_d2e){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d30.postback(_d2e);
}
}
break;
default:
_d30.postback(_d2e);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d2e,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d31,list){
var _d33=this.getDescendantBindingsByType(WindowBinding);
_d33.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d31,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d37){
if(_d37.name==null||_d37.name==""){
return;
}
list.add({name:_d37.name,value:_d37.value});
});
var out="";
list.each(function(_d39){
out+=_d39.name+": "+_d39.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d3a){
PageBinding.superclass.handleAction.call(this,_d3a);
var _d3b=_d3a.target;
switch(_d3a.type){
case RootBinding.ACTION_PHASE_3:
if(_d3b==UserInterface.getBinding(this.bindingDocument.body)){
_d3b.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d3b);
}
_d3a.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d3c=this.validateAllDataBindings();
if(_d3c){
this.doPostBack(_d3b);
}
}
_d3a.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d3a.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d3b.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d3b.key)){
this._initBlockers.del(_d3b.key);
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
var _d3e={handleAction:function(_d3f){
if(_d3f.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d3e);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d3e);
}else{
MessageQueue.udpdate();
}
_d3a.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d40,arg){
PageBinding.superclass.handleBroadcast.call(this,_d40,arg);
switch(_d40){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d42=arg;
if(!this._canPostBack&&!_d42){
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
PageBinding.prototype.doPostBack=function(_d44){
if(this._canPostBack){
if(_d44!=null&&this._isDotNet()){
var _d45=_d44.getCallBackID();
var _d46=_d44.getCallBackArg();
if(_d45!=null){
_d45=_d45.replace(/_/g,"$");
}else{
_d45="";
}
if(_d46==null){
_d46="";
}
this.bindingWindow.__doPostBack(_d45,_d46);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d47){
var _d48=true;
var _d49=this.bindingWindow.DataManager.getAllDataBindings();
while(_d49.hasNext()&&_d48){
var _d4a=_d49.getNext();
if(_d4a.isAttached){
var _d4b=_d4a.validate();
if(_d48&&!_d4b){
_d48=false;
this.logger.debug("Invalid DataBinding: "+_d4a.toString()+" ("+_d4a.getName()+")");
if(_d47){
var _d4c=_d4a.getAncestorBindingByType(TabPanelBinding);
if(_d4c!=null&&!_d4c.isVisible){
var _d4d=_d4c.getAncestorBindingByType(TabBoxBinding);
var _d4e=_d4d.getTabBinding(_d4c);
_d4d.select(_d4e);
}
}
break;
}
}
}
return _d48;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d50=this.bindingWindow.DataManager.getAllDataBindings();
while(_d50.hasNext()){
var _d51=_d50.getNext();
if(_d51.isAttached){
var _d52=_d51.manifest();
if(_d52!=null){
list.add(_d52);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d53=this.bindingWindow.DataManager.getAllDataBindings();
while(_d53.hasNext()){
var _d54=_d53.getNext();
if(_d54.isAttached){
_d54.clean();
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
var _d57=this._cachedFocus.getBinding();
if(_d57){
_d57.blur();
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
var _d58=this.getProperty("width");
if(!_d58){
_d58=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d58;
}
if(this.height==null){
var _d59=this.getProperty("height");
this.height=_d59?_d59:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d5a=this.getProperty("minheight");
if(_d5a!=null){
this.minheight=_d5a;
}
}
if(this.controls==null){
var _d5b=this.getProperty("controls");
this.controls=_d5b?_d5b:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d5c=this.getProperty("resizable");
this.isResizable=_d5c?_d5c:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d5d){
if(_d5d!=this.isAutoHeightLayoutMode){
if(_d5d){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d5d;
}
};
DialogPageBinding.prototype.handleAction=function(_d5e){
DialogPageBinding.superclass.handleAction.call(this,_d5e);
var _d5f=_d5e.target;
switch(_d5e.type){
case PageBinding.ACTION_ATTACHED:
if(_d5f!=this&&_d5f.isFitAsDialogSubPage){
_d5f.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d5e.consume();
if(_d5f.response!=null){
this.response=_d5f.response;
switch(_d5f.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d60){
var _d61=this.bindingWindow.bindingMap.buttonAccept;
if(_d61!=null){
_d61.setDisabled(_d60);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d62){
var _d63=CSSComputer.getPadding(this.bindingElement);
var _d64=CSSComputer.getBorder(this.bindingElement);
_d62+=_d63.top+_d63.bottom;
_d62+=_d64.top+_d64.bottom;
if(_d62>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d62+"px";
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
EditorPageBinding.prototype.handleAction=function(_d6c){
EditorPageBinding.superclass.handleAction.call(this,_d6c);
var _d6d=_d6c.target;
switch(_d6c.type){
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
var _d6e=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d6d.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d6e==-1){
_d6e=0;
}
}else{
_d6e++;
}
return res;
});
if(_d6e>-1){
this._messengers.del(_d6e);
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
_d6c.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d6d.key,_d6d);
if(_d6d instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d6d.key);
if(_d6d instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d6d==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d6d.getSelectedTabBinding();
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
_d6c.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d6d==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d6c.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d6d==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d6c.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d6d==this._windowBinding){
if(_d6d.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d73=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d73);
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
var _d74=this.bindingWindow.bindingMap.savebutton;
if(_d74!=null&&!_d74.isDisabled){
_d74.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d75=this.bindingWindow.bindingMap.__REQUEST;
if(_d75!=null){
_d75.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d76=this.bindingWindow.bindingMap.__REQUEST;
if(_d76!=null){
_d76.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d77){
this._message=null;
switch(_d77){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d77,this._messengers);
if(!this._messengers.hasEntries()){
if(_d77==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d77;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d77;
EditorPageBinding.superclass.postMessage.call(this,_d77,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d77,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d78,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d78,arg);
switch(_d78){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d7a=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d7a);
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
var _d7b=new List();
this._invalidBindings.each(function(key,_d7d){
var list=_d7d.getInvalidLabels();
if(list){
list.each(function(_d7f){
_d7b.add(_d7f);
});
}
});
if(_d7b.hasEntries()){
var _d80="";
while(_d7b.hasNext()){
_d80+=_d7b.getNext().toLowerCase();
if(_d7b.hasNext()){
_d80+=", ";
}else{
_d80+=".";
}
}
var _d81=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d81+" "+_d80);
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
EditorPageBinding.prototype.enableSave=function(_d82){
var _d83=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d83){
var _d84=UserInterface.getBinding(_d83);
if(_d82){
_d84.enable();
}else{
_d84.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d85=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d85!=null){
UserInterface.getBinding(_d85).enable();
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
var _d86=this._windowBinding.getContentDocument().title;
if(_d86==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d87=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d89){
if(_d89.name=="__EVENTTARGET"&&_d87){
_d89.value=_d87;
}
list.add({name:_d89.name,value:_d89.value});
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
WizardPageBinding.prototype.handleAction=function(_d8b){
WizardPageBinding.superclass.handleAction.call(this,_d8b);
var _d8c=_d8b.target;
switch(_d8b.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d8c);
}else{
_d8b.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d8c);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d8b.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d8b.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d8d){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d8f=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d8d);
}
if(_d8f){
_d8f.setDisabled(!_d8d);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d90,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d90,arg);
var self=this;
switch(_d90){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d94){
};
MarkupAwarePageBinding.prototype._activate=function(_d95){
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
var _d96=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d96.boxObject.getDimension().w;
_d96.hide();
var _d97=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d97+"px";
var self=this;
var _d99=this.bindingWindow.bindingMap.moreactionsbutton;
_d99.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d9a){
self._showMoreActions();
_d9a.consume();
}});
var _d9b=this.bindingWindow.bindingMap.moreactionspopup;
_d9b.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d9c){
var item=_d9c.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d9e,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d9e,arg);
switch(_d9e){
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
var _da2=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_da2!=null){
_da2.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _da3=this.bindingWindow.WindowManager;
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
var _da4=new String("");
this._actionProfile.each(function(_da5,list){
list.each(function(_da7){
_da4+=_da7.getHandle()+";"+_da7.getKey()+";";
if(_da7.isDisabled()){
_da4+="isDisabled='true';";
}
});
});
return _da4;
};
SystemToolBarBinding.prototype.handleAction=function(_da8){
SystemToolBarBinding.superclass.handleAction.call(this,_da8);
switch(_da8.type){
case ButtonBinding.ACTION_COMMAND:
var _da9=_da8.target;
this._handleSystemAction(_da9.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_daa){
if(_daa!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dac=list.getFirst();
var _dad=_dac.node;
}
SystemAction.invoke(_daa,_dad);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_db0,list){
var _db2=new List();
list.reset();
while(list.hasNext()){
var _db3=list.getNext();
var _db4=null;
if(_db3.isInToolBar()){
if(_db3.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_db4=self.getToolBarButtonBinding(_db3);
}
}
if(_db4!=null){
_db2.add(_db4);
}
}
if(_db2.hasEntries()){
var _db5=ToolBarGroupBinding.newInstance(doc);
_db2.each(function(_db6){
_db5.add(_db6);
});
self.addLeft(_db5);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _db7=this.bindingWindow.bindingMap.toolsbutton;
var _db8=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _db9=_db7.bindingElement.offsetLeft-this._moreActionsWidth;
var _dba=0;
var _dbb=new List();
var _dbc,_dbd=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dbc=_dbd.getNext())!=null){
if(!_dbc.isVisible){
_dbc.show();
}
_dba+=_dbc.boxObject.getDimension().w;
if(_dba>=_db9){
_dbb.add(_dbc);
_dbc.hide();
}
}
if(_dbb.hasEntries()){
var _dbe=_dbb.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dbe).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dbc=_dbb.getNext())!=null){
this._moreActions.add(_dbc.associatedSystemAction);
}
_db8.show();
}else{
this._moreActions=null;
_db8.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dbf=this.bindingWindow.bindingMap.moreactionspopup;
_dbf.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dbf.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dbf.add(item);
}
_dbf.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dc1){
var _dc2=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dc3=_dc1.getLabel();
var _dc4=_dc1.getToolTip();
var _dc5=_dc1.getImage();
var _dc6=_dc1.isDisabled();
if(_dc5&&_dc5.indexOf("size=")==-1){
_dc5=_dc5+"&size="+this.getImageSize();
_dc2.imageProfile=new ImageProfile({image:_dc5});
}
if(_dc3){
_dc2.setLabel(_dc3);
}
if(_dc4){
_dc2.setToolTip(_dc4);
}
if(_dc1.isDisabled()){
_dc2.disable();
}
_dc2.associatedSystemAction=_dc1;
return _dc2;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dc7=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dc7!=null){
_dc7.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dc8){
var _dc9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dc8);
return UserInterface.registerBinding(_dc9,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dca){
var _dcb=SystemTreeBinding.superclass.add.call(this,_dca);
if(!this._defaultTreeNode){
if(_dca instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dca;
}
}
return _dcb;
};
SystemTreeBinding.prototype.handleAction=function(_dcc){
SystemTreeBinding.superclass.handleAction.call(this,_dcc);
var _dcd=_dcc.target;
switch(_dcc.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_dcd.key);
this._updateFocusedNode();
_dcc.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dcc.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_dcd.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dcc.consume();
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
var _dcf=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_dcf);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_dd0){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_dd0);
var reg=this._entityTokenRegistry;
var _dd2=_dd0.node.getEntityToken();
if(reg.has(_dd2)){
reg.get(_dd2).add(_dd0);
}else{
reg.set(_dd2,new List([_dd0]));
}
var _dd3=null;
if(this.isLockedToEditor){
if(_dd2==StageBinding.entityToken){
if(_dd0.node.isTreeLockEnabled()){
_dd3=_dd0;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_dd0.node.getHandle()){
_dd3=_dd0;
}
}
}
if(_dd3!=null){
this.focusSingleTreeNodeBinding(_dd3);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_dd4){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_dd4);
var reg=this._entityTokenRegistry;
var _dd6=_dd4.node.getEntityToken();
if(reg.has(_dd6)){
var list=reg.get(_dd6);
list.del(_dd4);
if(!list.hasEntries()){
reg.del(_dd6);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_dd4.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_dd4.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _dda=this._refreshingTreeNodes;
if(_dda.hasEntries()&&_dda.has(key)){
_dda.del(key);
if(!_dda.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _ddb=StageBinding.entityToken;
if(_ddb!=null){
this._focusTreeNodeByEntityToken(_ddb);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _ddc=false;
var _ddd=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_ddc=false;
}else{
if(_ddd.hasEntries()){
_ddc=true;
while(_ddc&&_ddd.hasNext()){
var _dde=_ddd.getNext();
if(!_dde.isDraggable){
_ddc=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_ddc;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_ddf,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_ddf,arg);
switch(_ddf){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_ddf,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_ddf);
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
var self=this,_de3=arg;
setTimeout(function(){
if(_de3!=null){
self._focusTreeNodeByEntityToken(_de3);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _de5=tab.perspectiveNode==null;
if(!_de5){
_de5=tab.perspectiveNode==this.perspectiveNode;
}
if(_de5){
var self=this,_de7=tab.getEntityToken();
setTimeout(function(){
if(_de7==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_de7);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_de8,_de9){
this.isLockFeatureFocus=true;
var _dea=null;
if(this._entityTokenRegistry.has(_de8)){
var list=this._entityTokenRegistry.get(_de8);
list.each(function(tn){
var _ded=true;
if(tn.node.isTreeLockEnabled()){
_dea=tn;
_ded=false;
}
return _ded;
});
if(_dea!=null){
if(!_dea.isFocused){
this.focusSingleTreeNodeBinding(_dea,true);
}else{
_dea.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_dea==null&&_de9!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_de8);
self._focusTreeNodeByEntityToken(_de8,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_def){
var _df0=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _df1=this.getRootTreeNodeBindings();
while(_df1.hasNext()){
var _df2=_df1.getNext();
_df0.add(_df2.node.getEntityToken());
}
}else{
_df0.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_df0.hasNext()){
var _df3=_df0.getNext();
var _df4=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_df3,_def,_df4);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _df7=this._treeNodeBindings;
var _df8=new Map();
function fix(_df9,list){
if(!_df9.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_df7.has(node.getHandle())){
var _dfc=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_df8.set(node.getHandle(),_dfc);
_df9.add(_dfc);
}
});
_df9.attachRecursive();
}
}
_df9.open(true);
}
map.each(function(_dfd,list){
if(_df7.has(_dfd)){
var _dff=_df7.get(_dfd);
fix(_dff,list);
}else{
if(_df8.has(_dfd)){
var _e00=_df8.get(_dfd);
fix(_e00,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e01,arg){
switch(_e01){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e03=arg;
if(_e03!=null){
this._invokeServerRefresh(_e03);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e04=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e04;
_e04.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e04=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e04;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e05){
if(_e05!=null&&_e05=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e05)){
var list=this._entityTokenRegistry.get(_e05).reset();
this._refreshToken=_e05;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e07=list.getNext();
this._refreshingTreeNodes.set(_e07.key,true);
setTimeout(function(){
_e07.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e08=this.getFocusedTreeNodeBindings().getFirst();
if(_e08){
var _e09=_e08.getLabel();
var _e0a=_e08.getAncestorBindingByLocalName("treenode");
if(_e0a){
_e08=_e0a;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e08.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e0b=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e0b,[_e09]);
}
_e08.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e0c=SystemTreeBinding.clipboard;
if(_e0c){
var type=_e0c.dragType;
var _e0e=this.getFocusedTreeNodeBindings().getFirst();
if(_e0e.dragAccept){
if(_e0e.acceptor.isAccepting(type)){
this._performPaste(_e0e);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e0f){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e0f.node.hasDetailedDropSupport()){
if(_e0f.node.hasChildren()){
var _e11=_e0f.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e12,_e13){
if(_e12==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e14=_e13.get("switch");
var _e15=_e13.get("sibling");
if(_e14=="after"){
_e15++;
}
var _e16=_e0f.accept(SystemTreeBinding.clipboard,_e15);
if(_e16){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e11);
}else{
Application.lock(self);
var _e17=_e0f.accept(SystemTreeBinding.clipboard,0);
if(_e17){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e17=_e0f.accept(SystemTreeBinding.clipboard,0);
if(_e17){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e18=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e18!=null){
this._focusTreeNodeByEntityToken(_e18);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e19){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e19){
this.blurSelectedTreeNodes();
var _e1a=this.getRootTreeNodeBindings();
_e1a.each(function(_e1b){
if(_e1b.isContainer&&_e1b.isOpen){
_e1b.close();
_e1b.hasBeenOpened=false;
_e1b.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e1c){
if(_e1c!=this.isLockedToEditor){
this.isLockedToEditor=_e1c;
if(_e1c){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e1e=this.getRootTreeNodeBindings();
_e1e.each(function(_e1f){
var _e20=_e1f.getOpenSystemNodes();
if(_e20!=null&&_e20.hasEntries()){
list.merge(_e20);
}else{
if(_e1f.isOpen){
list.add(_e1f.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e21){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e21);
if(_e21!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e23=new Map();
var _e24=this.getFocusedTreeNodeBindings();
var _e25=_e24.getFirst().node.getActionProfile();
var self=this;
_e25.each(function(_e27,list){
var _e29=new List();
list.each(function(_e2a){
if(_e2a.getActivePositions()&self._activePosition){
_e29.add(_e2a);
}
});
if(_e29.hasEntries()){
_e23.set(_e27,_e29);
}
});
_e23.activePosition=this._activePosition;
return _e23;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e2b,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e2b,arg);
switch(_e2b){
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
var _e30=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e30.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e31=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e31.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e32){
SystemTreePopupBinding.superclass.handleAction.call(this,_e32);
switch(_e32.type){
case MenuItemBinding.ACTION_COMMAND:
var _e33=_e32.target;
var _e34=_e33.associatedSystemAction;
if(_e34){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e36=list.getFirst();
var _e37=_e36.node;
}
SystemAction.invoke(_e34,_e37);
}else{
var cmd=_e33.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e3a=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e3a=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e3a=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e3a=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e3a=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e3a){
setTimeout(function(){
EventBroadcaster.broadcast(_e3a);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e3b=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e3b.hasNext()){
var _e3c=UserInterface.getBinding(_e3b.getNext());
if(!_e3c.getProperty("rel")){
_e3c.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e3e=new List();
var self=this;
this._actionProfile.each(function(_e40,list){
var _e42=MenuGroupBinding.newInstance(doc);
list.each(function(_e43){
var _e44=self.getMenuItemBinding(_e43);
_e42.add(_e44);
});
_e3e.add(_e42);
});
_e3e.reverse();
while(_e3e.hasNext()){
this._bodyBinding.addFirst(_e3e.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e45){
var _e46=MenuItemBinding.newInstance(this.bindingDocument);
var _e47=_e45.getLabel();
var _e48=_e45.getToolTip();
var _e49=_e45.getImage();
var _e4a=_e45.getDisabledImage();
var _e4b=_e45.isCheckBox();
if(_e47){
_e46.setLabel(_e47);
}
if(_e48){
_e46.setToolTip(_e48);
}
if(_e49){
_e46.imageProfile=new ImageProfile({image:_e49,imageDisabled:_e4a});
}
if(_e4b){
_e46.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e45.isChecked()){
_e46.check(true);
}
}
if(_e45.isDisabled()){
_e46.disable();
}
_e46.associatedSystemAction=_e45;
return _e46;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e4f=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e4f=UserInterface.getBinding(node);
if(_e4f.isDisabled){
_e4f=null;
}
}
break;
}
if(_e4f!=null&&_e4f.node!=null&&_e4f.node.getActionProfile()!=null){
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
var _e50=this.node.getLabel();
if(_e50){
this.setLabel(_e50);
}
var _e51=this.node.getToolTip();
if(_e51){
this.setToolTip(_e51);
}
var _e52=this.node.getHandle();
if(_e52){
this.setHandle(_e52);
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
var _e55="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e55+=list.getNext();
if(list.hasNext()){
_e55+=" ";
}
}
this.setProperty("dragaccept",_e55);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e57){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e57);
switch(_e57.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e57.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e57.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e58,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e58,arg);
switch(_e58){
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
var _e5b=null;
var _e5c=this.node.getImageProfile();
if(_e5c){
if(this.isOpen){
_e5b=_e5c.getActiveImage();
}else{
_e5b=_e5c.getDefaultImage();
}
}
if(!_e5b){
_e5b=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e5b;
};
SystemTreeNodeBinding.prototype.open=function(_e5d){
var _e5e=this.isContainer&&!this.isOpen;
var _e5f=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e5e&&(_e5f||SystemTreeBinding.HAS_NO_MEMORY)&&_e5d!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e60=null;
if(this.isContainer){
_e60=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e60);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e62){
if(_e62!=null){
this._refreshBranch(_e62);
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
var _e63=new List();
var _e64=this.node.getChildren();
this.empty();
if(_e64.hasEntries()){
this._insertTreeNodesRegulated(_e64);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e65){
var _e66=0;
var _e67=new List([]);
while(_e65.hasEntries()&&_e66<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e68=SystemTreeNodeBinding.newInstance(_e65.extractFirst(),this.bindingDocument);
_e68.autoExpand=this.autoExpand;
this.add(_e68);
_e68.attach();
_e66++;
if(this.autoExpand){
if(_e66==1&&!_e65.hasEntries()||LastOpenedSystemNodes.isOpen(_e68)){
_e67.add(_e68);
}
}
}
if(_e65.hasEntries()){
this._insertBufferTreeNode(_e65);
}
_e67.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e6b){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e6d=this.node.getDescendantBranch(list);
if(_e6d.hasEntries()){
this.XXX(_e6d);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e6e){
var self=this;
var map=new Map();
this.empty();
_e6e.each(function(key,_e72){
if(_e72.hasEntries()){
_e72.each(function(node){
var _e74=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e74);
if(map.has(key)){
var _e75=map.get(key);
_e75.add(_e74);
_e75.isOpen=true;
_e75.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e74);
}else{
}
}
});
}
});
this.attachRecursive();
_e6e.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e76=new TreeCrawler();
var _e77=new List();
_e76.mode=TreeCrawler.MODE_GETOPEN;
_e76.crawl(this.bindingElement,_e77);
if(_e77.hasEntries()){
_e77.extractFirst();
}
_e76.dispose();
return _e77;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e78=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e78=new List([this.node]);
list.each(function(_e7a){
_e78.add(_e7a.node);
});
}
return _e78;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e7b,_e7c){
var _e7d=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e7b instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e7b.node.getData(),this.node.getData(),_e7c?_e7c:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e7d);
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
SystemTreeNodeBinding.newInstance=function(node,_e81){
var _e82=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e81);
var _e83=UserInterface.registerBinding(_e82,SystemTreeNodeBinding);
_e83.node=node;
return _e83;
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
SystemPageBinding.prototype.setPageArgument=function(_e84){
this.node=_e84;
SystemPageBinding.superclass.setPageArgument.call(this,_e84);
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
var _e85=this.node.getChildren();
if(_e85.hasEntries()){
while(_e85.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e85.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e87=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e87.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e89=new TreeCrawler();
var _e8a=new List();
_e89.mode=TreeCrawler.MODE_GETOPEN;
_e89.crawl(this.bindingElement,_e8a);
_e89.dispose();
var list=new List([this.node]);
_e8a.each(function(_e8c){
list.add(_e8c.node);
});
this._tree.empty();
var _e8d=this.node.getDescendantBranch(list);
if(_e8d.hasEntries()){
var self=this;
var map=new Map();
_e8d.each(function(key,_e91){
_e91.each(function(node){
var _e93=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e93);
if(map.has(key)){
var _e94=map.get(key);
_e94.add(_e93);
_e94.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e93);
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
SystemPageBinding.prototype.handleAction=function(_e95){
SystemPageBinding.superclass.handleAction.call(this,_e95);
switch(_e95.type){
case ButtonBinding.ACTION_COMMAND:
var _e96=_e95.target;
switch(_e96.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e96.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e97,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e97,arg);
switch(_e97){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e99=arg;
if(this.node&&this.node.getEntityToken()==_e99){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e99);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e99);
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
StageContainerBinding.prototype.handleBroadcast=function(_e9b,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e9b,arg);
var _e9d=this.bindingWindow.WindowManager;
switch(_e9b){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e9d.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e9d.WINDOW_RESIZED_BROADCAST:
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
var _e9f=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e9f.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_ea0){
if(StageBinding.isViewOpen(_ea0)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ea0);
}else{
var _ea1=ViewDefinitions[_ea0];
StageBinding.presentViewDefinition(_ea1);
}
};
StageBinding.isViewOpen=function(_ea2){
return StageBinding.bindingInstance._activeViewDefinitions[_ea2]!=null;
};
StageBinding.presentViewDefinition=function(_ea3){
if(_ea3.label!=null){
var _ea4=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ea4,[_ea3.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ea3);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ea6,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ea8=System.getPerspectiveNodes();
if(_ea8.hasEntries()){
this._initializeSystemViewDefinitions(_ea8);
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
var _eaa=null;
if(LocalStore.isEnabled){
_eaa=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_eaa&&ViewDefinitions[_eaa]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_eaa));
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
var _eac=root.getActionProfile();
if(_eac&&_eac.hasEntries()){
var _ead=top.app.bindingMap.toolsmenugroup;
if(_ead){
_eac.each(function(_eae,list){
list.each(function(_eb0){
var item=MenuItemBinding.newInstance(_ead.bindingDocument);
item.setLabel(_eb0.getLabel());
item.setToolTip(_eb0.getToolTip());
item.setImage(_eb0.getImage());
item.setDisabled(_eb0.isDisabled());
item.associatedSystemAction=_eb0;
var _eb2=_ead;
var tag=_eb0.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_eb2=top.app.bindingMap.translationsmenugroup;
break;
}
}
_eb2.add(item);
});
});
_ead.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_eb4){
while(_eb4.hasNext()){
var node=_eb4.getNext();
var _eb6=node.getHandle();
ViewDefinitions[_eb6]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_eb7){
StageBinding.superclass.handleAction.call(this,_eb7);
var _eb8=_eb7.target;
switch(_eb7.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_eb8;
this._inflateBinding(_eb8);
_eb7.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_eb8;
this._inflateBinding(_eb8);
_eb7.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_eb8);
_eb7.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_eb8 instanceof DockBinding){
switch(_eb8.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_eb8.reference,_eb8);
break;
}
this.handleAttachedDock(_eb8);
_eb7.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_eb8 instanceof DockBinding){
this.handleSelectedDockTab(_eb8.getSelectedTabBinding());
_eb7.consume();
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
_eb7.consume();
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
_eb7.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_eb7);
};
StageBinding.prototype.handleBroadcast=function(_eba,arg){
StageBinding.superclass.handleBroadcast.call(this,_eba,arg);
switch(_eba){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ebc=arg;
this._dontView(_ebc);
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
StageBinding.prototype._showStart=function(_ebe){
if(_ebe!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ec1=this.bindingWindow.bindingMap.maindecks;
if(_ebe){
_ec1.select("startdeck");
view.show();
}else{
view.hide();
_ec1.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ebe;
}
};
StageBinding.prototype._inflateBinding=function(_ec2){
for(var _ec3 in ViewDefinitions){
var _ec4=ViewDefinitions[_ec3];
if(_ec4 instanceof SystemViewDefinition){
_ec2.mountDefinition(_ec4);
}
}
var _ec5=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ec5){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ec8=new StageCrawler();
_ec8.mode=mode;
_ec8.crawl(this.bindingElement);
_ec8.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ec9){
var _eca=_ec9.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_eca);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_eca));
}
};
StageBinding.prototype.handleAttachedDock=function(_ecb){
var _ecc=_ecb.getTabBindings();
if(_ecc.hasEntries()){
while(_ecc.hasNext()){
var _ecd=_ecc.getNext();
var _ece=_ecd.getHandle();
if(_ece){
if(_ece=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ecf=ViewDefinitions[_ece];
if(_ecf){
this._view(_ecb,_ecd,_ecf,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ece+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ed0){
var _ed1=null;
var _ed2=false;
switch(_ed0.position){
case Dialog.MODAL:
_ed1=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ed1=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ed0.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ed1=this._dockBindings.get(_ed0.position);
break;
case DockBinding.EXTERNAL:
window.open(_ed0.url);
_ed2=true;
break;
default:
var _ed3=this._decksBinding.getSelectedDeckBinding();
_ed1=_ed3.getDockBindingByReference(_ed0.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ed4=this.bindingWindow.bindingMap.maindecks;
_ed4.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ed2=true;
}
break;
}
if(!_ed2){
if(_ed1!=null){
this._view(_ed1,null,_ed0,true);
}else{
throw "StageBinding: Could not position view: "+_ed0.handle;
}
}
};
StageBinding.prototype._view=function(_ed5,_ed6,_ed7,_ed8){
var _ed9=_ed7.handle;
if(_ed7.isMutable){
_ed9+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ed9]){
var _eda=ViewBinding.getInstance(_ed9);
if(_eda!=null){
_eda.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ed9);
}
}else{
this._activeViewDefinitions[_ed9]=_ed7;
Application.lock(this);
switch(_ed5.constructor){
case DockBinding:
if(_ed8){
_ed5.prepareNewView(_ed7);
}else{
_ed5.prepareOpenView(_ed7,_ed6);
}
break;
case StageDialogBinding:
if(_ed8){
_ed5.prepareNewView(_ed7);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_edb){
if(this._activeViewDefinitions[_edb]!=null){
delete this._activeViewDefinitions[_edb];
}else{
this.logger.debug("Could not unregister active view: "+_edb);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_edc){
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
this.addFilter(function(_ede){
var _edf=UserInterface.getBinding(_ede);
var _ee0=null;
if(_edf){
switch(_edf.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_edf.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_edf.handleUnMaximization();
break;
}
break;
case DockBinding:
_ee0=NodeCrawler.SKIP_NODE;
break;
}
}
return _ee0;
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
var _ee1=null;
this._dialogs.each(function(_ee2){
if(!_ee2.isVisible){
_ee1=_ee2;
}
return _ee1!=null;
});
if(!_ee1){
this._newInstance();
_ee1=this._dialogs.getLast();
}
_ee1.setModal(false);
return _ee1;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _ee3=this.getInstance();
_ee3.setModal(true);
return _ee3;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _ee4=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_ee4);
_ee4.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ee5){
if(_ee5 instanceof DialogViewDefinition){
var _ee6=ViewBinding.newInstance(this.bindingDocument);
_ee6.setDefinition(_ee5);
_ee6.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ee5.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ee5.handler)){
this._dialogResponseHandler=_ee5.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ee6;
this._body.add(_ee6);
_ee6.attach();
_ee6.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ee7){
StageDialogBinding.superclass.handleAction.call(this,_ee7);
var _ee8=_ee7.target;
switch(_ee7.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ee8);
_ee7.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ee8.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ee7.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ee8.response){
this._handleDialogPageResponse(_ee8);
}
_ee7.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ee7.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ee7.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ee8.dispose();
_ee7.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ee7.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ee7.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ee7.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ee7.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ee7.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ee8==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ee9,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ee9,arg);
switch(_ee9){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_eeb){
var _eec=new FitnessCrawler();
var list=new List();
if(_eeb){
_eec.mode=FitnessCrawler.MODE_BRUTAL;
}
_eec.crawl(this.bindingElement,list);
_eec.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_eee){
_eee.fit(_eeb);
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
var _eef=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_eef){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_ef1){
var cmd=_ef1.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_ef3){
if(_ef3.bindingDocument==this._viewBinding.getContentDocument()){
if(_ef3 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_ef3);
}
this._pageBinding=_ef3;
if(_ef3.height=="auto"){
_ef3.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_ef3);
_ef3.enableAutoHeightLayoutMode(false);
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
if(_ef3.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_ef3);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_ef4){
var _ef5=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_ef5){
var _ef6=UserInterface.getBinding(_ef5);
_ef6.setDisabled(_ef4);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_ef7){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_ef7.response,_ef7.result!=null?_ef7.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_ef9){
if(_ef9.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_ef9);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_efb){
switch(_efb.type){
case MenuItemBinding.ACTION_COMMAND:
if(_efb.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_efb.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_efc){
var _efd=_efc.label;
var _efe=_efc.image;
var _eff=_efc.width;
var _f00=_efc.height;
var _f01=_efc.controls;
var _f02=_efc.isResizable;
if(_efd){
this.setLabel(_efd);
}
if(_efe){
this.setImage(_efe);
}
if(_eff||_f00){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_eff?_eff:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f00!=null&&_f00!="auto")?_f00:old.h;
this.setDimension(nev);
}
if(_f01){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f06=new List(_f01.split(" "));
while((type=_f06.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f02!=this._isResizable){
this.setResizable(_f02);
}
if(_f00=="auto"){
this._fixAutoHeight(_efc);
}
if(_efc==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f07){
var dim=this.getDimension();
var _f09=0;
var _f0a=0;
if(_f07.isDialogSubPage){
_f07=this._pageBinding;
}
if(this._isFirstPage){
_f09=_f07.width!=null?_f07.width:dim.w;
}else{
_f09=dim.w;
}
_f0a=_f07.bindingElement.offsetHeight;
_f0a+=this._titlebar.bindingElement.offsetHeight;
_f0a+=4;
if(_f0a<dim.h){
_f0a=dim.h;
}
if(_f07.minheight!=null){
if(_f0a<_f07.minheight){
_f0a=_f07.minheight;
}
}
this.setDimension(new Dimension(_f09,_f0a));
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
StageDialogBinding.newInstance=function(_f0d){
var _f0e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f0d);
var _f0f=UserInterface.registerBinding(_f0e,StageDialogBinding);
_f0f.setProperty("controls","minimize maximize close");
return _f0f;
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
this.addFilter(function(_f10,list){
var _f12=null;
var _f13=UserInterface.getBinding(_f10);
if(!_f13.isVisible){
_f12=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f12;
});
this.addFilter(function(_f14,list){
var _f16=null;
var _f17=UserInterface.getBinding(_f14);
if(_f17.isAttached){
if(Interfaces.isImplemented(IFit,_f17)){
if(!_f17.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f17);
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
StageDecksBinding.prototype.mountDefinition=function(_f18){
var _f19=StageDeckBinding.newInstance(this.bindingDocument);
_f19.handle=_f18.handle;
_f19.perspectiveNode=_f18.node;
this._decks[_f19.handle]=_f19;
this.add(_f19);
_f19.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f1a){
var _f1b=this._decks[_f1a];
StageBinding.perspectiveNode=_f1b.perspectiveNode;
this.select(_f1b);
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
StageDeckBinding.prototype.handleAction=function(_f1c){
StageDeckBinding.superclass.handleAction.call(this,_f1c);
var _f1d=_f1c.target;
switch(_f1c.type){
case WindowBinding.ACTION_LOADED:
if(_f1d==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f1c.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f1d instanceof DockBinding){
this._dockBindings.set(_f1d.reference,_f1d);
_f1d.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f1c.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f1c.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f1c);
StageDeckBinding.superclass.handleAction.call(this,_f1c);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f1f=new StageCrawler();
_f1f.mode=mode;
_f1f.crawl(this.windowBinding.getContentDocument().body);
_f1f.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f20){
return this._dockBindings.get(_f20);
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
StageDeckBinding.newInstance=function(_f22){
var _f23=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f22);
var _f24=UserInterface.registerBinding(_f23,StageDeckBinding);
return _f24;
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
StageSplitBoxBinding.prototype.handleAction=function(_f25){
StageSplitBoxBinding.superclass.handleAction.call(this,_f25);
StageBoxAbstraction.handleAction.call(this,_f25);
var _f26=_f25.target;
var _f27=null;
var _f28=null;
switch(_f25.type){
case DockBinding.ACTION_EMPTIED:
_f28=this.getChildBindingByLocalName("splitter");
if(_f28.isVisible){
_f28.hide();
}
_f27=this.getDescendantBindingsByLocalName("dock");
if(_f27.getFirst().isEmpty&&_f27.getLast().isEmpty){
if(_f27.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f25.consume();
break;
case DockBinding.ACTION_OPENED:
_f27=this.getDescendantBindingsByLocalName("dock");
if(!_f27.getFirst().isEmpty&&!_f27.getLast().isEmpty){
_f28=this.getChildBindingByLocalName("splitter");
if(!_f28.isVisible){
_f28.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f25.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f26!=this){
_f28=this.getChildBindingByLocalName("splitter");
if(_f28.isVisible){
_f28.hide();
}
this.invokeLayout();
_f25.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f26!=this){
var _f29=this.getChildBindingsByLocalName("splitpanel");
if(_f29.getFirst().isVisible&&_f29.getLast().isVisible){
_f28=this.getChildBindingByLocalName("splitter");
if(!_f28.isVisible){
_f28.show();
}
}
this.invokeLayout();
_f25.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f2a){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f2a);
switch(_f2a.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f2a.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f2b=this.getChildBindingsByLocalName("splitpanel");
return _f2b.getFirst().isVisible&&_f2b.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f2c=this.getChildBindingsByLocalName("splitpanel");
return _f2c.getFirst().isFixed&&_f2c.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f2d){
StageSplitPanelBinding.superclass.handleAction.call(this,_f2d);
StageBoxAbstraction.handleAction.call(this,_f2d);
switch(_f2d.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f2d.type==StageSplitBoxBinding.ACTION_HIDE){
_f2d.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f2d.type==DockBinding.ACTION_EMPTIED){
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
if(_f2d.type==StageSplitBoxBinding.ACTION_SHOW){
_f2d.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f30=_f2d.target;
if(_f30!=this&&_f30.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f31=_f30._containingSplitBoxBinding;
if(_f31.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f32=_f31.getChildBindingsByLocalName("splitpanel");
var _f33=_f32.getFirst();
var _f34=_f32.getLast();
if(this.isFixed==true){
if(!_f33.isFixed||!_f34.isFixed||(!_f31.hasBothPanelsVisible()&&_f30.isMinimizedForReal)){
this.setFix(false);
_f2d.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f31.hasBothPanelsFixed()||(!_f31.hasBothPanelsVisible()&&_f30.isMinimizedForReal)){
this.setFix(_f30.getContainedDock().getHeight());
_f2d.consume();
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
var _f35=this.getContainedDock();
if(_f35){
if(this.isMaximizePrepared==true){
}else{
_f35.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f36=this.getContainedDock();
if(_f36){
if(_f36.type==DockBinding.TYPE_EDITORS){
if(_f36.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f36.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f37=this.getContainedDock();
if(_f37){
_f37.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f37);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f38=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f39=this.getContainedDock();
if(_f39){
_f39.collapse(_f38);
if(!_f38){
this.setFix(_f39.getHeight());
}else{
this.setFix(_f39.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f39&&_f39.isActive){
_f39.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f39);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f3a){
var _f3b=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f3c=this.getContainedDock();
if(_f3c){
if(this.isMinimized==true){
_f3c.unCollapse(_f3b);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f3a){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f3c){
_f3c.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f3c);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f3d){
var _f3e=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f3e=false;
}
}
if(_f3e==true){
this._invisibilize(_f3d);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f40){
if(_f40!=this._isInvisibilized){
if(_f40){
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
StageSplitterBinding.prototype.onDragStart=function(_f41){
var _f42=top.app.bindingMap.stagesplittercover;
var _f43=this._containingSplitBoxBinding.getOrient();
switch(_f43){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f42.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f42.bindingElement.style.cursor="n-resize";
break;
}
_f42.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f43);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f49){
this._orient=_f49;
this.attachClassName(_f49);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f4b=true;
var _f4c=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f4c=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f4b=false;
break;
}
if(_f4b){
this.bindingElement.style.left=pos.x+"px";
}
if(_f4c){
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
StageBoxAbstraction.handleAction=function(_f4e){
switch(_f4e.type){
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
if(_f4e.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f4e.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f4f=this.bindingElement.style;
_f4f.position="absolute";
_f4f.width="100%";
_f4f.height="100%";
_f4f.top="0";
_f4f.left="0";
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
var _f50=this.bindingElement.style;
_f50.position="relative";
_f50.width="auto";
_f50.height="auto";
_f50.top="auto";
_f50.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f51,_f52){
var _f53=_f51.bindingElement.style;
var _f54=_f51.bindingElement.parentNode;
var box=_f51._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f52){
_f51._unmodifiedFlexMethod=_f51.flex;
_f51.flex=function(){
_f53.width=_f54.offsetWidth+"px";
_f53.height=_f54.offsetHeight+"px";
};
}else{
_f53.width="100%";
_f53.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f53.width="auto";
_f53.height="auto";
box.reflex(true);
},0);
}
_f51.flex=_f51._unmodifiedFlexMethod;
_f51._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f56){
var _f57=_f56.target;
switch(_f56.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f57 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f56);
_f56.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f56.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f58){
var mode=null;
switch(_f58.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f5a){
StageMenuBarBinding.superclass.handleAction.call(this,_f5a);
switch(_f5a.type){
case MenuItemBinding.ACTION_COMMAND:
var _f5b=_f5a.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f5b){
SystemAction.invoke(_f5b,this._rootNode);
}
}
_f5a.consume();
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
var _f5c=this.getProperty("handle");
if(_f5c){
this._handle=_f5c;
if(StageBinding.isViewOpen(_f5c)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f5c);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f5e){
this.setProperty("handle",_f5e);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f5f,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f5f,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f5f){
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
StageViewMenuItemBinding.newInstance=function(_f61){
var _f62=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f61);
UserInterface.registerBinding(_f62,StageViewMenuItemBinding);
return UserInterface.getBinding(_f62);
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
StageStatusBarBinding.prototype.setLabel=function(_f63){
this._label.setLabel(_f63);
};
StageStatusBarBinding.prototype.setImage=function(_f64){
this._label.setImage(_f64);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f65){
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
var _f66=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f67=_f66.getAssociatedView();
var _f68=_f67.getContentWindow().bindingMap.tree;
var _f69=_f68.getFocusedTreeNodeBindings();
if(!_f69.hasEntries()&&StageBinding.treeSelector){
_f69=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f69;
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
ExplorerBinding.prototype.handleAction=function(_f6a){
ExplorerBinding.superclass.handleAction.call(this,_f6a);
var _f6b=_f6a.target;
switch(_f6a.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f6a.consume();
break;
case Binding.ACTION_DRAG:
if(_f6b instanceof ExplorerSplitterBinding){
_f6b.dragger.registerHandler(this);
}
_f6a.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f6d){
this._menuBinding.setSelectionByHandle(_f6d);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f6e){
if(_f6e instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f6e);
this._menuBinding.mountDefinition(_f6e);
}
};
ExplorerBinding.prototype.onDragStart=function(_f6f){
var _f70=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f70.hasEntries()){
var _f71=_f70.getFirst();
this._dragStart=_f71.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f71.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f75){
if(_f75 instanceof SystemViewDefinition){
var _f76=ViewBinding.newInstance(this.bindingDocument);
_f76.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f76.setDefinition(_f75);
var _f77=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f77.setAssociatedView(_f76);
this._decks[_f75.handle]=_f77;
_f77.add(_f76);
this.add(_f77);
function attach(){
_f77.attach();
_f76.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f78){
var _f79=this._decks[_f78];
this.select(_f79);
};
DecksBinding.prototype.expandBy=function(_f7a){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f7c=this.bindingElement.offsetHeight+_f7a;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f7c+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f7e){
var _f7f=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f7e);
return UserInterface.registerBinding(_f7f,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f80){
this._viewBinding=_f80;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f81=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f82=this._viewBinding.getDefinition().label;
StatusBar.busy(_f81,[_f82]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f83){
ExplorerDeckBinding.superclass.handleAction.call(this,_f83);
var _f84=_f83.target;
switch(_f83.type){
case PageBinding.ACTION_INITIALIZED:
if(_f84 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f84.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f85,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f85,arg);
switch(_f85){
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
var _f87=null;
if(this._isExplorerDeckBindingInitialized){
_f87=this._viewBinding.getDefinition().label;
}else{
_f87=DockTabBinding.LABEL_TABLOADING;
}
return _f87;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f88=null;
if(this._isExplorerDeckBindingInitialized){
_f88=this._viewBinding.getDefinition().image;
}else{
_f88=DockTabBinding.IMG_TABLOADING;
}
return _f88;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f89=null;
if(this._isExplorerDeckBindingInitialized){
_f89=this._viewBinding.getDefinition().toolTip;
}
return _f89;
};
ExplorerDeckBinding.newInstance=function(_f8a){
var _f8b=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f8a);
return UserInterface.registerBinding(_f8b,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f8c){
switch(_f8c.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f8c.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f8c.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f8c);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f8d){
this._maxButtons.set(_f8d.handle,this._mountMaxButton(_f8d));
this._minButtons.set(_f8d.handle,this._mountMinButton(_f8d));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f8e){
var _f8f=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f8f.setLabel(_f8e.label);
_f8f.setToolTip(_f8e.toolTip);
_f8f.handle=_f8e.handle;
_f8f.node=_f8e.node;
this._maxGroup.add(_f8f);
this._maxList.add(_f8f);
_f8f.attach();
return _f8f;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f90){
var _f91=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f91.setLabel(_f90.label);
_f91.setToolTip(_f90.label);
_f91.handle=_f90.handle;
_f91.node=_f90.node;
this._minGroup.addFirst(_f91);
this._minList.add(_f91);
_f91.attach();
_f91.hide();
return _f91;
};
ExplorerMenuBinding.prototype.handleAction=function(_f92){
ExplorerMenuBinding.superclass.handleAction.call(this,_f92);
switch(_f92.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f93=_f92.target;
var _f94=_f93.getCheckedButtonBinding();
var _f95=_f94.handle;
switch(_f93){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f95),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f95),true);
break;
}
this._selectedHandle=_f95;
this._selectedTag=_f94.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f92.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f96){
var _f97=this._maxButtons.get(_f96);
if(_f97){
_f97.check();
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
var _f98=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f98=true;
}
return _f98;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f9a=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f9a=true;
}
return _f9a;
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
ExplorerToolBarBinding.newInstance=function(_f9b){
var _f9c=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f9b);
return UserInterface.registerBinding(_f9c,ExplorerToolBarBinding);
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
var _f9d=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f9e=_f9d?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f9e);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f9f,_fa0){
var _fa1=(_fa0==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fa2=DOMUtil.createElementNS(Constants.NS_UI,_fa1,_f9f);
var _fa3=UserInterface.registerBinding(_fa2,ExplorerToolBarButtonBinding);
_fa3.explorerToolBarButtonType=_fa0;
return _fa3;
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
EditorBinding.registerComponent=function(_fa4,_fa5){
var _fa6=EditorBinding._components;
var _fa7=EditorBinding._editors;
var key=_fa5.key;
var _fa9=Interfaces.isImplemented(IWysiwygEditorComponent,_fa4);
if(!_fa9){
_fa9=Interfaces.isImplemented(ISourceEditorComponent,_fa4);
}
if(_fa9){
if(_fa7.has(key)){
_fa7.get(key).initializeEditorComponent(_fa4);
}else{
if(!_fa6.has(key)){
_fa6.set(key,new List());
}
_fa6.get(key).add(_fa4);
}
}else{
throw "Editor component interface not implemented: "+_fa4;
}
};
EditorBinding.claimComponents=function(_faa,_fab){
var _fac=EditorBinding._components;
var _fad=EditorBinding._editors;
var key=_fab.key;
_fad.set(key,_faa);
var list=null;
if(_fac.has(key)){
list=_fac.get(key).copy();
_fac.del(key);
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
var _fb1=this.getProperty("value");
if(_fb1!=null){
_fb1=decodeURIComponent(_fb1);
this._startContent=_fb1;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fb3=this.bindingWindow.DataManager;
_fb3.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fb5){
var _fb6=EditorBinding.claimComponents(this,_fb5);
if(_fb6!=null){
while(_fb6.hasNext()){
this.initializeEditorComponent(_fb6.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fb8=this.bindingWindow.DataManager;
if(_fb8.getDataBinding(name)){
_fb8.unRegisterDataBinding(name);
}
_fb8.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fb9=this.getEditorDocument();
if(_fb9!=null){
Application.framework(_fb9);
DOMEvents.addEventListener(_fb9,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fb9,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fb9,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fb9,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fbb){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fbb==true){
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
var _fbd=this.getCheckSum();
if(_fbd!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fbd;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fbe=null;
if(Binding.exists(this._pageBinding)){
_fbe=this._pageBinding.getCheckSum(this._checksum);
}
return _fbe;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fc0=DOMEvents.getTarget(e);
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
if(_fc0.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fc2,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fc2,arg);
var _fc4=null;
switch(_fc2){
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
var _fc5=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fc5=false;
}
}
}else{
_fc4=DOMEvents.getTarget(arg);
if(_fc4&&_fc4.ownerDocument==this.getEditorDocument()){
_fc5=false;
}
}
if(_fc5){
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
EditorBinding.prototype._activateEditor=function(_fc6){
if(_fc6!=this._isActivated){
this._isActivated=_fc6;
EditorBinding.isActive=_fc6;
var _fc7=this.getEditorWindow().standardEventHandler;
var _fc8=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fc8!=null){
if(_fc6){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fc8.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fc7.enableNativeKeys(true);
}else{
_fc8.disable();
_fc7.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fc9=this.getEditorDocument().selection.createRange();
_fc9.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fca=false;
try{
if(!Client.isExplorer){
var _fcb=this.getEditorWindow().getSelection();
if(_fcb!=null){
_fca=_fcb.toString().length>0;
if(!_fca){
var _fcc=_fcb.getRangeAt(0);
var frag=_fcc.cloneContents();
var _fce=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fce.appendChild(frag.firstChild);
}
var img=_fce.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fca=true;
}
}
}
}
}else{
var _fcc=this.getEditorDocument().selection.createRange();
_fca=(_fcc&&_fcc.text)&&_fcc.text.length>0;
if(_fcc.commonParentElement&&VisualEditorBinding.isImageElement(_fcc.commonParentElement())){
_fca=true;
}
}
}
catch(exception){
}
return _fca;
};
EditorBinding.prototype.isCommandEnabled=function(_fd0){
var _fd1=true;
switch(_fd0){
case "Cut":
case "Copy":
case "Paste":
_fd1=this.getEditorDocument().queryCommandEnabled(_fd0);
break;
}
return _fd1;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fd5=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fd6=null;
if(cmd=="Paste"){
_fd6=null;
}else{
_fd6=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fd6);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fd5=true;
}
break;
}
return _fd5;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fd8=this.getContentWindow().bindingMap.toolbar;
var _fd9=_fd8.getButtonForCommand(cmd);
if(!_fd9){
throw "No button for command "+cmd;
}
return _fd9;
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
var _fdc=this.getContentDocument().getElementById("focusableinput");
if(_fdc!=null){
_fdc.style.display="block";
FocusBinding.focusElement(_fdc);
_fdc.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fdd){
EditorBinding.superclass.handleAction.call(this,_fdd);
var _fde=_fdd.target;
var self=this;
var _fe0=this.shadowTree.iframe;
switch(_fdd.type){
case Binding.ACTION_DIRTY:
if(_fdd.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fe1){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fe1);
};
EditorBinding.prototype.handleElement=function(_fe2){
return true;
};
EditorBinding.prototype.updateElement=function(_fe3){
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
var _fe6=this._menuGroups[rel];
if(_fe6 instanceof List){
_fe6.each(function(_fe7){
_fe7.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _fe9=this._menuGroups[rel];
if(_fe9 instanceof List){
_fe9.each(function(_fea){
_fea.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_feb){
EditorPopupBinding.superclass.handleAction.call(this,_feb);
var _fec=_feb.target;
if(_feb.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_fec.getProperty("cmd");
var gui=_fec.getProperty("gui");
var val=_fec.getProperty("val");
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
var _ff0=this.bindingWindow.bindingMap.tinywindow;
var _ff1=this.bindingWindow.bindingMap.codepresswindow;
if(_ff0){
EditorBinding.registerComponent(this,_ff0);
}else{
if(_ff1){
EditorBinding.registerComponent(this,_ff1);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_ff2,_ff3,_ff4,_ff5){
this._editorBinding=_ff2;
this._tinyEngine=_ff3;
this._tinyInstance=_ff4;
this._tinyTheme=_ff5;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_ff6,_ff7,_ff8){
this._editorBinding=_ff6;
this._codePressFrame=_ff7;
this._codePressEngine=_ff8;
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
var _ffb=this._editorBinding;
if(_ffb!=null){
var self=this;
var _ffd={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_ffb.hasBookmark()){
_ffb.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_ffb.hasBookmark()){
_ffb.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_ffd);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_ffd);
}
};
EditorClickButtonBinding.newInstance=function(_fff){
var _1000=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_fff);
return UserInterface.registerBinding(_1000,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1001){
var _1002=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1001);
return UserInterface.registerBinding(_1002,EditorToolBarButtonBinding);
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
var _1003=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1003);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_1004,_1005,_1006,theme){
this._editorBinding=_1004;
this._tinyEngine=_1005;
this._tinyInstance=_1006;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1008){
EditorSelectorBinding.superclass.handleAction.call(this,_1008);
switch(_1008.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_1008);
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
EditorMenuItemBinding.newInstance=function(_100c){
var _100d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_100c);
return UserInterface.registerBinding(_100d,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_100e){
var i=0,_1010,_1011=[],split=_100e.split(" ");
while((_1010=split[i++])!=null){
if(_1010.length>=3&&_1010.substring(0,3)=="mce"){
continue;
}else{
if(_1010.length>=14&&_1010.substring(0,14)=="compositemedia"){
continue;
}
}
_1011.push(_1010);
}
return _1011.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1013){
var _1014=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1013);
if(soap instanceof SOAPFault){
}else{
_1014=soap.XhtmlFragment;
if(!_1014){
_1014="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1014;
};
VisualEditorBinding.getTinyContent=function(_1016,_1017){
var _1018=null;
if(_1016==null||_1016==""){
_1016=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_1016);
if(soap instanceof SOAPFault){
var _101a=soap;
var _101b={handleDialogResponse:function(){
_1017.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_101b,_101a);
}else{
_1018=soap.XhtmlFragment;
if(_1018==null){
_1018=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1018;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _101e=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1020=new List(doc.documentElement.childNodes);
var _1021=new List();
_1020.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_1021.add(child);
}
});
var _1023=_1021.get(index);
if(_1023==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_1023.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_1023.hasChildNodes()){
frag.appendChild(_1023.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_101e=DOMSerializer.serialize(doc.documentElement);
_101e=_101e.substring(_101e.indexOf(">")+1,_101e.length);
_101e=_101e.substring(0,_101e.lastIndexOf("<"));
}
}
}
if(_101e==null){
_101e=new String("");
}
return _101e;
};
VisualEditorBinding.isImage=function(_1025){
result=_1025&&_1025.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_1026){
return VisualEditorBinding.isImage(_1026)&&!VisualEditorBinding.isReservedElement(_1026);
};
VisualEditorBinding.isReservedElement=function(_1027){
if(VisualEditorBinding.isFunctionElement(_1027)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1027)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1027)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1028){
return VisualEditorBinding.isImage(_1028)&&CSSUtil.hasClassName(_1028,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1029){
return VisualEditorBinding.isImage(_1029)&&CSSUtil.hasClassName(_1029,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_102a){
return VisualEditorBinding.isImage(_102a)&&CSSUtil.hasClassName(_102a,VisualEditorBinding.HTML_CLASSNAME);
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
var _102b=this.getProperty("embedablefieldstypenames");
if(_102b!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_102b);
}
var _102c=this.getProperty("formattingconfiguration");
if(_102c!=null){
this._url+="?config="+_102c;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_102d,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_102d,arg);
var _102f=this.getContentWindow().bindingMap.tinywindow;
var _1030=_102f.getContentWindow();
switch(_102d){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1030){
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
this.initializeEditorComponents(_102f);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1031){
_1031.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1032){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1032);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_1035){
var _1036=_1035;
if(!this._isNormalizedDocument(_1035)){
_1036=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_1035);
}
return _1036;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1037){
var _1038=false;
var doc=XMLParser.parse(_1037,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1038=true;
}
}
if(Client.isWebKit){
if(_1037.indexOf("<html")!==0){
_1038=false;
}
}
return _1038;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _103d=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_103d){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_103d=true;
}
return _103d;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _103f=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_103f);
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
VisualEditorBinding.prototype.setResult=function(_1041){
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
VisualEditorPopupBinding.prototype.configure=function(_1042,_1043,_1044){
var _1045=this.editorBinding.hasSelection();
this.tinyInstance=_1042;
this.tinyEngine=_1043;
this.tinyElement=_1044;
this.hasSelection=_1045;
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
var _1049=false;
if(this.hasSelection){
_1049=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1049=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1049=true;
}
}
}
}
if(_1049){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _104a=this.getMenuItemForCommand("compositeInsertLink");
var _104b=this.getMenuItemForCommand("unlink");
var _104c=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _104d=this.editorBinding.getButtonForCommand("unlink");
_104b.setDisabled(_104d.isDisabled);
if(_104b.isDisabled){
_104a.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_104a.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _104e=this.editorBinding.embedableFieldConfiguration;
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
if(_104e){
var _1051=_104e.getGroupNames();
if(_1051.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1051.each(function(_1055){
var _1056=_104e.getFieldNames(_1055);
_1056.each(function(_1057){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1057);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1055+":"+_1057);
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
var _1059=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _105a=null;
var _105b=null;
if(_1059){
if(_1059.nodeName=="TD"){
_105a=_1059.getAttribute("colspan");
_105b=_1059.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_105a=="1"&&_105b=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1059){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_105c){
var _105d=VisualEditorFormattingConfiguration._configurations;
if(!_105d.has(_105c)){
_105d.set(_105c,new VisualEditorFormattingConfiguration());
}
return _105d.get(_105c);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_105f){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1060){
var _1061=null;
var _1062=VisualEditorFieldGroupConfiguration._configurations;
if(!_1062.has(_1060)){
_1062.set(_1060,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1060)));
}
return _1062.get(_1060);
};
function VisualEditorFieldGroupConfiguration(_1063){
var _1064=new Map();
new List(_1063).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1064.set(group.GroupName,map);
});
this._groups=_1064;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1068){
return this._groups.get(_1068).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1069,_106a){
return this._groups.get(_1069).get(_106a).xhtml;
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
var _106c=this.getDescendantElementsByLocalName("textarea");
while(_106c.hasNext()){
var _106d=_106c.getNext();
if(_106d.getAttribute("selected")=="true"){
this._startContent=_106d.value;
this._textareaname=_106d.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _106f=this.getContentWindow().bindingMap.templatetree;
_106f.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1070){
var _1071=_106f.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1071.textareaname);
_1070.consume();
}});
_106f.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1072){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1073=this.getContentWindow().bindingMap.toolsplitter;
_1073.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1074=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1074.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1074);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1075){
this._textareas=new Map();
while(_1075.hasNext()){
var _1076=_1075.getNext();
var _1077=_1076.getAttribute("placeholderid");
this._textareas.set(_1077,{placeholderid:_1077,placeholdername:_1076.getAttribute("placeholdername"),placeholdermarkup:_1076.value,textareaelement:_1076,isSelected:_1076.getAttribute("selected")=="true"});
}
var _1078=new Map();
this._textareas.each(function(name,_107a){
var _107b=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_107b.setLabel(_107a.placeholdername);
_107b.setImage("${icon:placeholder}");
_107b.setProperty("placeholder",true);
_107b.textareaname=name;
_1078.set(_107a.placeholdername,_107b);
if(_107a.isSelected){
selected=_107b;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _107c=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_107c.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _107d=this.getContentWindow().bindingMap.templatetree;
var _107e=_107d.add(TreeNodeBinding.newInstance(_107d.bindingDocument));
_107e.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_107e.setImage("${icon:warning}");
_107e.attach();
var _107f=this.getContentWindow().bindingMap.statusbar;
_107f.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1081=this._textareas.get(name);
var _1082=_1081.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1082));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1083){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1083;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1084=this.getContentWindow().bindingMap.statusbar;
_1084.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1083);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1087="";
if(this._heads.has(this._textareaname)){
_1087=this._heads.get(this._textareaname);
if(_1087==null){
_1087=new String("");
}
}
return _1087;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1089){
_1089.textareaelement.value=_1089.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_108a,_108b){
var _108c=_108a.getElementsByTagName("div").item(0);
var _108d=_108b.getElementsByTagName("div").item(0);
var _108e=new List(_108c.getElementsByTagName("textarea"));
var _108f=new List(_108d.getElementsByTagName("textarea"));
var _1090=false;
if(_108e.getLength()!=_108f.getLength()){
_1090=true;
}else{
var index=0;
_108e.each(function(_1092,index){
var _1094=_108f.get(index);
var newid=_1092.getAttribute("placeholderid");
var oldid=_1094.getAttribute("placeholderid");
var _1097=_1092.getAttribute("placeholdername");
var _1098=_1094.getAttribute("placeholdername");
if(newid!=oldid||_1097!=_1098){
_1090=true;
}
return !_1090;
});
}
if(_1090){
var html=null;
if(_108c.innerHTML!=null){
html=_108c.innerHTML;
}else{
html=DOMSerializer.serialize(_108c);
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
var _109c=this.getDescendantBindingByLocalName("selector");
_109c.attach();
this._populateTemplateSelector();
var _109d=this.getContentWindow().bindingMap.templateselector;
_109d.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _109e=this.getDescendantBindingByLocalName("selector");
var _109f=this.getContentWindow().bindingMap.templateselector;
_109e.selections.each(function(_10a0){
_10a0.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_109f.populateFromList(_109e.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10a1=this.getDescendantBindingByLocalName("selector");
var _10a2=this.getContentWindow().bindingMap.templateselector;
_10a1.selectByValue(_10a2.getValue());
_10a1.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10a3){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10a8,_10a9){
var _10aa=_10a9;
if(old.has(_10a8)){
_10aa=old.get(_10a8).placeholdermarkup;
}
return _10aa;
}
while(_10a3.hasNext()){
var _10ab=_10a3.getNext();
var _10ac=_10ab.getAttribute("placeholderid");
this._textareas.set(_10ac,{placeholderid:_10ac,placeholdername:_10ab.getAttribute("placeholdername"),placeholdermarkup:compute(_10ac,_10ab.value),textareaelement:_10ab,isSelected:_10ab.getAttribute("selected")=="true"});
}
var _10ad=null;
var _10ae=this.getContentWindow().bindingMap.templatetree;
var _10af=new Map();
this._textareas.each(function(name,_10b1){
var _10b2=_10ae.add(TreeNodeBinding.newInstance(_10ae.bindingDocument));
_10b2.setLabel(_10b1.placeholdername);
_10b2.setImage("${icon:placeholder}");
_10b2.setProperty("placeholder",true);
_10b2.textareaname=name;
_10af.set(_10b1.placeholdername,_10b2);
if(_10b1.isSelected){
_10ad=_10b2;
}
});
_10ae.attachRecursive();
if(_10ad!=null){
var _10b3=true;
if(this._oldtextareas.hasEntries()){
_10b3=false;
var map=new Map();
this._textareas.each(function(id,_10b6){
map.set(_10b6.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10b3=true;
}
}
if(_10b3){
var _10b7=this._textareas.get(_10ad.textareaname);
this._textareaname=_10ad.textareaname;
this._placeholdername=_10b7.placeholdername;
this._setContentFromPlaceHolder(_10ad.textareaname);
_10ad.focus();
}else{
var _10b8=_10af.get(this._placeholdername);
this._textareaname=_10b8.textareaname;
_10b8.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10b9,_10ba){
var _10bb=_10b9.getElementsByTagName("ui:selector").item(0);
var _10bc=_10ba.getElementsByTagName("ui:selector").item(0);
var _10bd=false;
if(_10bb!=null&&_10bc!=null){
var _10be=new List(_10bb.getElementsByTagName("ui:selection"));
var _10bf=new List(_10bc.getElementsByTagName("ui:selection"));
if(_10be.getLength()!=_10bf.getLength()){
_10bd=true;
}else{
_10be.each(function(_10c0,index){
var _10c2=_10c0.getAttribute("value");
var _10c3=_10bf.get(index).getAttribute("value");
if(_10c2!=_10c3){
_10bd=true;
}
return !_10bd;
});
}
}
if(_10bd){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10bb);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10b9,_10ba);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10c5,frame,_10c7){
this._editorBinding=_10c5;
this._codePressFrame=frame;
this._codePressEngine=_10c7;
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
var _10cd=this.getProperty("validate");
if(_10cd==true){
this._hasStrictValidation=true;
}
var _10ce=this.getProperty("validator");
if(_10ce!=null){
this._validator=_10ce;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10cf,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10cf,arg);
switch(_10cf){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10d1=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10d1!=null){
var _10d2=_10d1.getContentWindow();
if(arg.broadcastWindow==_10d2){
this._codemirrorWindow=_10d2;
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
case CodeMirrorEditorBinding.syntax.TEXT:
this._codemirrorEditor.setOption("mode","");
break;
}
this.initializeEditorComponents(_10d1);
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
this.unsubscribe(_10cf);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10d6){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10d6);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10d7){
if(_10d7!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10d7;
EditorBinding.isActive=_10d7;
var _10d8=this.getContentWindow().standardEventHandler;
if(_10d7){
_10d8.enableNativeKeys(true);
}else{
_10d8.disableNativeKeys();
}
var _10d9=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10d9!=null){
if(_10d7){
_10d9.enable();
}else{
_10d9.disable();
}
}
if(_10d7){
this.focus();
var _10da=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10de=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10de;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10df){
_10df.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10e1){
if(!this._isFinalized){
if(_10e1!=this._startContent){
this._startContent=_10e1;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10e1);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10e2=this.getContentWindow().bindingMap.editorpage.getContent();
if(_10e2!=null){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10e2=_10e2.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
break;
}
}
return _10e2?_10e2:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_10e3){
if(this._pageBinding!=null){
this._pageBinding.cover(_10e3);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10e4){
if(_10e4!=null&&this.shadowTree.dotnetinput!=null){
var value=_10e4.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10e6=true;
var _10e7=this.getContent();
if(this._validator!=null){
_10e6=Validator.validateInformed(_10e7,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10e6=XMLParser.isWellFormedDocument(_10e7,true);
if(_10e6==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10e6=this._isValidHTML(_10e7);
break;
}
}
break;
}
}
return _10e6;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10e9=true;
var doc=XMLParser.parse(xml);
var _10eb=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10eb.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10eb.add("NamespaceURI");
}
var head=null,body=null;
var _10ef=new List(root.childNodes);
while(_10ef.hasNext()){
var child=_10ef.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10eb.add("MultipleHead");
}
if(body!=null){
_10eb.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10eb.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10eb.add("MissingHead");
}
if(body==null){
_10eb.add("MissingBody");
}
}
if(_10eb.hasEntries()){
_10e9=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10eb.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10eb.getFirst()));
}
}
return _10e9;
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
var _10f1=null;
var page=this._pageBinding;
if(page!=null){
_10f1=page.getCheckSum();
}
return _10f1;
};
AudioWindowBinding.prototype=new WindowBinding;
AudioWindowBinding.prototype.constructor=AudioWindowBinding;
AudioWindowBinding.superclass=WindowBinding.prototype;
AudioWindowBinding.URL="${root}/content/misc/audioloader/audio.aspx";
function AudioWindowBinding(){
this.isFlexible=false;
return this;
}
AudioWindowBinding.prototype.toString=function(){
return "[AudioWindowBinding]";
};
AudioWindowBinding.prototype.onBindingRegister=function(){
AudioWindowBinding.superclass.onBindingRegister.call(this);
if(Client.hasFlash==true){
this.setURL(AudioWindowBinding.URL);
}
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
ThrobberBinding.prototype.handleBroadcast=function(_10f3,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10f3,arg);
switch(_10f3){
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
ProgressBarBinding.notch=function(_10f6){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10f6);
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
ProgressBarBinding.prototype.notch=function(_10f8){
_10f8=_10f8?_10f8:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_10f8);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_10fa,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_10fa,arg);
switch(_10fa){
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
StartMenuItemBinding.prototype.setChecked=function(_10fc,_10fd){
StartMenuItemBinding.superclass.setChecked.call(this,_10fc,_10fd);
if(!_10fd){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_10fe){
var _10ff=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_10fe);
UserInterface.registerBinding(_10ff,StartMenuItemBinding);
return UserInterface.getBinding(_10ff);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1102,_1103){
var _1104=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1103,true)==true){
if(_1102!="*"){
_1102=KeySetBinding._sanitizeKeyModifiers(_1102);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1104[doc]){
_1104[doc]={};
}
if(!_1104[doc][code]){
_1104[doc][code]={};
}
_1104[doc][code][_1102]=_1103;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1108=false;
var code=e.keyCode;
var _110a=KeySetBinding.keyEventHandlers;
if(_110a[doc]&&_110a[doc][code]){
var _110b="[default]";
_110b+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_110b+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _110c=_110a[doc][code][_110b];
if(_110c==null){
_110c=_110a[doc][code]["*"];
}
if(_110c!=null){
_110c.handleKeyEvent(e);
_1108=true;
}
}
return _1108;
};
KeySetBinding._sanitizeKeyModifiers=function(_110d){
var _110e="[default]";
var mods={};
if(_110d){
new List(_110d.split(" ")).each(function(_1110){
mods[_1110]=true;
});
function check(_1111){
if(mods[_1111]){
_110e+=" "+_1111;
}
}
check("shift");
check("control");
}
return _110e;
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
var _1115=key.getAttribute("oncommand");
var _1116=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1116){
DOMEvents.preventDefault(e);
}
var _1118=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1115,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1119){
if(_1119 instanceof CursorBinding){
_1119.setOpacity(0);
_1119.show();
new Animation({modifier:9,onstep:function(_111a){
_1119.setOpacity(Math.sin(_111a*Math.PI/180));
},onstop:function(){
_1119.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_111b){
if(_111b instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_111c){
_111b.setOpacity(Math.cos(_111c*Math.PI/180));
},onstop:function(){
_111b.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_111d,_111e,_111f){
if(_111d instanceof CursorBinding){
_111f.x-=16;
_111f.y-=16;
new Animation({modifier:3,onstep:function(_1120){
var tal=Math.sin(_1120*Math.PI/180);
_111d.setPosition(new Point(((1-tal)*_111e.x)+((0+tal)*_111f.x),((1-tal)*_111e.y)+((0+tal)*_111f.y)));
},onstop:function(){
CursorBinding.fadeOut(_111d);
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
CursorBinding.prototype.setOpacity=function(_1126){
this.bindingElement.style.opacity=new String(_1126);
this._opacity=_1126;
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
function setOpacity(_1129){
cover.bindingElement.style.opacity=new String(_1129);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_112a){
if(Binding.exists(cover)){
setOpacity(Math.cos(_112a*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_112c){
cover.bindingElement.style.MozOpacity=new String(_112c);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_112d){
if(Binding.exists(cover)){
setOpacity(Math.sin(_112d*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_112f){
if(_112f!=this._isBusy){
if(_112f){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_112f;
}
};
CoverBinding.prototype.setTransparent=function(_1130){
if(_1130!=this._isTransparent){
if(_1130){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1130;
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
CoverBinding.prototype.setHeight=function(_1132){
if(_1132>=0){
this.bindingElement.style.height=new String(_1132+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1133){
var _1134=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1133);
return UserInterface.registerBinding(_1134,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1136=UncoverBinding._bindingInstance;
if(Binding.exists(_1136)){
_1136.setPosition(pos);
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
TheatreBinding.prototype.play=function(_113a){
this._isFading=_113a==true;
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
var _113b=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_113b.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_113b.clearRect(0,0,300,150);
_113b.fillRect(0,0,300,150);
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
var _113d=this._canvas.getContext("2d");
_113d.clearRect(0,0,300,150);
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
var _113e=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_113e);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _113f=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_113f){
this._startcontent=_113f.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1140){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1140);
switch(_1140.type){
case WindowBinding.ACTION_ONLOAD:
if(_1140.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1140.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1140);
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
var _1144=this._transformer.transformToString(doc);
this._inject(_1144);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1147){
this.getContentDocument().body.innerHTML=_1147;
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
var _114f=list.getNext();
var id=_114f.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_114f);
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
var _1159=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1159.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1159.appendChild(att);
}
elm.appendChild(_1159);
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
var _1163=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1163){
doc=XMLParser.parse(_1163);
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
var _1167=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1167;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1168,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1168,arg);
switch(_1168){
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
var _116b=new List();
list.each(function(lang){
_116b.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_116b);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_116f){
switch(_116f){
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
var _1172=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1172,root);
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
var _1173=this.getProperty("status");
if(_1173!=null){
switch(_1173){
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
UserInterfaceMapping.prototype.merge=function(_1177){
for(var _1178 in _1177.map){
this.map[_1178]=_1177.getBindingImplementation(_1178);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1179){
var _117a=null;
var name=_1179.nodeName.toLowerCase();
if(this.map[name]){
_117a=this.map[name];
}
return _117a;
};
var UserInterface=new function(){
var _117c=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _117d=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_117c,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _117e=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1180,impl){
var _1182=null;
if(!this.hasBinding(_1180)){
var _1183=DOMUtil.getParentWindow(_1180);
if(DOMUtil.getLocalName(_1180)!="bindingmapping"){
if(!impl&&_1180.getAttribute("binding")!=null){
var _1184=_1180.getAttribute("binding");
impl=_1183[_1184];
if(impl==null){
throw "No such binding in scope: "+_1184;
}
}
if(!impl){
var _1185=_1183.DocumentManager;
if(_1185){
var _1186=_1185.customUserInterfaceMapping;
if(_1186){
impl=_1186.getBindingImplementation(_1180);
}
}
}
if(!impl){
impl=_117d.getBindingImplementation(_1180);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1182=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1182){
var key=KeyMaster.getUniqueKey();
_1180.setAttribute("key",key);
_1182.key=key;
if(!_1180.id){
_1180.id=key;
}
keys[key]={element:_1180,binding:_1182};
_1182.onBindingRegister();
}
}
}
return _1182;
};
this.unRegisterBinding=function(_1188){
terminate(_1188);
};
function terminate(_1189){
if(Binding.exists(_1189)==true){
var key=_1189.key;
Binding.destroy(_1189);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1189=null;
}else{
_117e.error("URGH: "+key);
}
}
}
}
this.getElement=function(_118b){
var _118c=null;
if(keys[_118b.key]){
_118c=keys[_118b.key].element;
}
return _118c;
};
this.getBinding=function(_118d){
var _118e=null;
if(_118d&&_118d.nodeType==Node.ELEMENT_NODE){
try{
var key=_118d.getAttribute("key");
if(key&&keys[key]){
_118e=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_118d);
if(exception.stack){
alert(exception.stack);
}
}
}
return _118e;
};
this.getBindingByKey=function(key){
var _1191=null;
if(keys[key]){
_1191=keys[key].binding;
}
return _1191;
};
this.hasBinding=function(_1192){
return this.getBinding(_1192)!=null;
};
this.isBindingVisible=function(_1193){
var _1194=Application.isOperational;
if(_1194==true){
var _1195=new Crawler();
_1195.type=NodeCrawler.TYPE_ASCENDING;
_1195.id="visibilitycrawler";
_1195.addFilter(function(_1196){
var b=UserInterface.getBinding(_1196);
var res=0;
if(!b.isVisible){
_1194=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_1195.crawl(_1193.bindingElement);
_1195.dispose();
}
return _1194;
};
var _1199=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_1199={};
for(var key in keys){
_1199[key]=true;
}
};
this.getPoint=function(){
var _119d=null;
if(_1199){
_119d=new List();
for(var key in keys){
if(!_1199[key]){
_119d.add(key);
}
}
}
return _119d;
};
this.clearPoint=function(){
_1199=null;
};
this.trackUndisposedBindings=function(){
var _119f=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_119f){
_119f="Bindings illdisposed: ";
}
_119f+=entry.binding+" ";
}
}
if(_119f!=null){
_117e.error(_119f);
}
};
this.autoTrackDisposedBindings=function(_11a2){
if(_11a2){
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
SOAPRequest.newInstance=function(_11a3,_11a4){
var _11a5=_11a3+"/"+_11a4;
var _11a6=new SOAPRequest(_11a5);
var _11a7=SOAPRequest.resolver;
_11a6.document=Templates.getTemplateDocument("soapenvelope.xml");
_11a6.envelope=_11a7.resolve("soap:Envelope",_11a6.document);
_11a6.header=_11a7.resolve("soap:Header",_11a6.envelope);
_11a6.body=_11a7.resolve("soap:Body",_11a6.envelope);
return _11a6;
};
SOAPRequest._parseResponse=function(_11a8){
var _11a9=null;
var _11aa=false;
var doc=_11a8.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11a9=SOAPRequestResponse.newInstance(_11a8.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11a8.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11aa=true;
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
var text=_11a8.responseText;
if(_11a8.status==503||text.indexOf("id=\"offline\"")>-1){
_11aa=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11a8.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11a8.responseText);
}
}
}
}
if(_11aa==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11a9;
};
function SOAPRequest(_11af){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11af;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11b1=DOMUtil.getXMLHTTPRequest();
var _11b2=null;
_11b1.open("post",url,false);
_11b1.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11b1.setRequestHeader("SOAPAction",this.action);
try{
_11b1.send(this.document);
_11b2=SOAPRequest._parseResponse(_11b1);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11b1=null;
return _11b2;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11b5){
var _11b6=DOMUtil.getXMLHTTPRequest();
_11b6.open("post",url,true);
_11b6.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11b6.setRequestHeader("SOAPAction",this.action);
_11b6.onreadystatechange=function(){
if(_11b6.readyState==4){
var _11b7=SOAPRequest._parseResponse(_11b6);
_11b5(_11b7);
_11b6=null;
}
};
_11b6.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11b8 in this){
this[_11b8]=null;
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
var _11ba=null;
if(doc&&doc.documentElement){
_11ba=new SOAPRequestResponse();
var _11bb=SOAPRequestResponse.resolver;
_11ba.document=doc;
_11ba.envelope=_11bb.resolve("soap:Envelope",_11ba.document);
_11ba.header=_11bb.resolve("soap:Header",_11ba.envelope);
_11ba.body=_11bb.resolve("soap:Body",_11ba.envelope);
var fault=_11bb.resolve("soap:Fault",_11ba.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11ba.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11bb.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11bb.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11ba;
};
function SOAPFault(_11bd,_11be,_11bf){
this._operationName=_11bd;
this._operationAddress=_11be;
this._faultString=_11bf;
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
SOAPFault.newInstance=function(_11c0,fault){
return new SOAPFault(_11c0.name,_11c0.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11c3){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11c3;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11c5=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11c5.body,this._operation);
var _11c7=this._wsdl.getSchema();
var _11c8=_11c7.lookup(this._operation);
var _11c9=_11c8.getListedDefinitions();
while(_11c9.hasNext()){
var def=_11c9.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11c5;
};
SOAPEncoder.prototype._resolve=function(_11cd,_11ce,value){
var _11d0=this._wsdl.getSchema();
if(_11ce.isSimpleValue){
this._appendText(_11cd,value,_11ce.type=="string");
}else{
var _11d1=_11d0.lookup(_11ce.type);
if(_11d1 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11d1.getListedDefinitions();
if(_11d1.isArray){
var _11d3=new List(value);
var def=defs.getNext();
while(_11d3.hasNext()){
var elm=this._appendElement(_11cd,def.name);
var val=_11d3.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11cd,def.name);
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
SOAPEncoder.prototype._appendText=function(_11da,value,_11dc){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11df=false;
var i=0,c;
while(c=chars[i++]){
var _11e2=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11e2=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11e2=false;
}
break;
}
if(!_11e2){
safe+=c;
}else{
_11df=true;
}
}
if(_11df){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11da.appendChild(_11da.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11e5){
this._wsdl=wsdl;
this._operation=_11e5;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11ea){
var _11eb=null;
var _11ec=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11ee=this.resolve(id,_11ea.body);
var _11ef=_11ec.lookup(id);
var _11f0=_11ef.getListedDefinitions();
while(!_11eb&&_11f0.hasNext()){
var def=_11f0.getNext();
var elm=this.resolve(def.name,_11ee);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11eb=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11eb.importNode!=Types.UNDEFINED){
_11eb.appendChild(_11eb.importNode(e,true));
}else{
_11eb.loadXML(DOMSerializer.serialize(e));
}
}else{
_11eb=this._compute(elm,def);
}
}
return _11eb;
};
SOAPDecoder.prototype._compute=function(_11f4,_11f5){
var _11f6=null;
var _11f7=this._wsdl.getSchema();
if(_11f5.isSimpleValue){
_11f6=this._getSimpleValue(_11f4,_11f5.type);
}else{
var _11f8=_11f7.lookup(_11f5.type);
if(_11f8 instanceof SchemaSimpleType){
_11f6=this._getSimpleValue(_11f4,_11f8.restrictionType);
}else{
var defs=_11f8.getListedDefinitions();
if(_11f8.isArray){
_11f6=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11f4);
while(elms.hasNext()){
var elm=elms.getNext();
_11f6.push(this._compute(elm,def));
}
}else{
_11f6={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11f4);
if(elm){
_11f6[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11f6;
};
SOAPDecoder.prototype._getSimpleValue=function(_11fd,type){
var _11ff=null;
if(_11fd!=null&&_11fd.firstChild&&_11fd.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_11fd.childNodes.length>1){
_11fd.normalize();
}
_11ff=_11fd.firstChild.data;
switch(type){
case Schema.types.STRING:
_11ff=_11ff;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_11ff=Number(_11ff);
break;
case Schema.types.BOOLEAN:
_11ff=_11ff=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _11ff;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1200){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1200);
}
Schema.prototype._parseSchema=function(_1201){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1202={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1201);
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
_1202[rule.getAttribute("name")]=entry;
}
return _1202;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1207){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1207);
}
SchemaDefinition.prototype._parse=function(_1208){
var min=_1208.getAttribute("minOccurs");
var max=_1208.getAttribute("maxOccurs");
var type=_1208.getAttribute("type");
this.name=_1208.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _120e=split[1];
this.isSimpleValue=sort!="tns";
this.type=_120e;
}else{
var elm=_1208.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1210,_1211){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1210,_1211);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1212,_1213){
var els=_1212.resolveAll("s:complexType/s:sequence/s:element",_1213);
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
function SchemaComplexType(_1215,_1216){
this._definitions=new List();
this._parseListedDefinitions(_1215,_1216);
this.isArray=_1216.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1217,_1218){
var els=_1217.resolveAll("s:sequence/s:element",_1218);
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
function SchemaSimpleType(_121b,_121c){
this.restrictionType=null;
this._parse(_121b,_121c);
}
SchemaSimpleType.prototype._parse=function(_121d,_121e){
var _121f=_121d.resolve("s:restriction",_121e);
if(_121f){
this.restrictionType=_121f.getAttribute("base").split(":")[1];
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
var _1222=null;
var _1223=DOMUtil.getXMLHTTPRequest();
_1223.open("get",url,false);
_1223.send(null);
if(_1223.responseXML){
_1222=_1223.responseXML.documentElement;
}else{
alert(_1223.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1222;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1224=new List();
var _1225=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1225.hasEntries()){
while(_1225.hasNext()){
var _1226=_1225.getNext();
var name=_1226.getAttribute("name");
_1224.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1224;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1229,_122a,_122b){
this.name=name;
this.address=_1229;
this.encoder=_122a;
this.decoder=_122b;
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
var _122f=wsdl.getOperations();
_122f.each(function(_1230){
proxy[_1230.name]=WebServiceProxy.createProxyOperation(_1230);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1231,_1232){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1232){
var log=_1232 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1231.address+": "+_1231.name+"\n\n";
log+=DOMSerializer.serialize(_1232.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1234){
return function(){
var _1235=new List(arguments);
var _1236=null;
if(typeof (_1235.getLast())=="function"){
var _1237=_1235.extractLast();
var _1238=_1234.encoder.encode(_1235);
this._log(_1234,_1238);
var self=this;
var _123a=_1238.asyncInvoke(_1234.address,function(_123b){
self._log(_1234,_123b);
if(_123b){
if(_123b.fault){
_1236=SOAPFault.newInstance(_1234,_123b.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1236,_1238,_123b);
}
}else{
if(WebServiceProxy.isDOMResult){
_1236=_123b.document;
}else{
_1236=_1234.decoder.decode(_123b);
}
}
}
_1238.dispose();
_1237(_1236);
});
}else{
var _1238=_1234.encoder.encode(new List(arguments));
this._log(_1234,_1238);
var _123a=_1238.invoke(_1234.address);
this._log(_1234,_123a);
if(_123a){
if(_123a.fault){
_1236=SOAPFault.newInstance(_1234,_123a.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1236,_1238,_123a);
}
}else{
if(WebServiceProxy.isDOMResult){
_1236=_123a.document;
}else{
_1236=_1234.decoder.decode(_123a);
}
}
}
_1238.dispose();
return _1236;
}
};
};
WebServiceProxy.handleFault=function(_123c,_123d,_123e){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_123c,soapRequest:_123d,soapResponse:_123e});
}
catch(exception){
alert(_123c.getFaultString());
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
var _123f=SystemLogger.getLogger("MessageQueue");
var _1240=null;
var _1241=0;
var _1242=null;
var _1243=new Map();
var _1244=new Map();
var _1245=false;
var _1246=false;
var _1247=false;
var _1248=false;
var _1249={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1240=ConsoleMessageQueueService;
_1241=_1240.GetCurrentSequenceNumber("dummyparam!");
this.index=_1241;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1245){
if(!MessageQueue._actions.hasEntries()){
var _124a=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1246=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_124a;
_1246=false;
}
}
}
};
this._pokeserver=function(){
if(_1245==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1246);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_1247){
_1248=true;
}else{
_1247=true;
var self=this;
_1240.GetMessages(Application.CONSOLE_ID,this.index,function(_124c){
if(_124c!=null){
if(Types.isDefined(_124c.CurrentSequenceNumber)){
var _124d=_124c.CurrentSequenceNumber;
if(_124d<self.index){
_123f.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_124d);
}
self.index=_124d;
var _124e=new List(_124c.ConsoleActions);
if(_124e.hasEntries()){
self.evaluate(_124e);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_123f.error("No sequencenumber in MessageQueue response!");
}
}
_1247=false;
if(_1248){
_1248=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_124f){
var _1250=new List();
if(_124f.hasEntries()){
_124f.each(function(_1251){
if(this._index[_1251.Id]!=true){
_1250.add(_1251);
}
this._index[_1251.Id]=true;
},this);
if(_1250.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1250);
}else{
this._actions=_1250;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1252){
var _1253="(No reason)";
if(_1252!=null){
_1253=_1252.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1253);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1257){
if(_1257==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1258=null;
if(this._actions.hasEntries()){
var _1259=this._actions.extractFirst();
_1241=_1259.SequenceNumber;
_123f.debug("MessageQueue action: "+_1259.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1241+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1259.ActionType){
case "OpenView":
_1258=_1259.OpenViewParams;
if(_1258.ViewType=="ModalDialog"){
openDialogView(_1258);
}else{
_1242=_1258.ViewId;
openView(_1258);
}
break;
case "CloseView":
_1258=_1259.CloseViewParams;
_1242=_1258.ViewId;
closeView(_1258);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1259.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_1243.countEntries()+"\n";
_1243.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_123f.debug(debug);
if(!_1243.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1259.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1259.MessageBoxParams);
break;
case "OpenViewDefinition":
_1258=_1259.OpenViewDefinitionParams;
_1242=_1258.Handle;
openViewDefinition(_1258);
break;
case "LogEntry":
logEntry(_1259.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1258=_1259.BroadcastMessageParams;
_123f.debug("Server says: EventBroadcaster.broadcast ( \""+_1258.Name+"\", "+_1258.Value+" )");
EventBroadcaster.broadcast(_1258.Name,_1258.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1243.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1259.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1259.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1259.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1258=_1259.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1258.ViewId,entityToken:_1258.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1258=_1259.OpenGenericViewParams;
openGenericView(_1258);
break;
case "OpenExternalView":
_1258=_1259.OpenExternalViewParams;
openExternalView(_1258);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1259.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1246);
}
function logEntry(_125c){
var _125d=_125c.Level.toLowerCase();
SystemLogger.getLogger(_125c.SenderId)[_125d](_125c.Message);
}
function openView(_125e){
var list=paramsToList(_125e.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_125e.ViewId);
def.entityToken=_125e.EntityToken;
def.flowHandle=_125e.FlowHandle;
def.position=_1249[_125e.ViewType],def.label=_125e.Label;
def.image=_125e.Image;
def.toolTip=_125e.ToolTip;
def.argument={"url":_125e.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_125e.ViewId,entityToken:_125e.EntityToken,flowHandle:_125e.FlowHandle,position:_1249[_125e.ViewType],url:_125e.Url,label:_125e.Label,image:_125e.Image,toolTip:_125e.ToolTip}));
}
}
function openDialogView(_1261){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1261.ViewId,flowHandle:_1261.FlowHandle,position:Dialog.MODAL,url:_1261.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1262){
var _1263=_1262.DialogType.toLowerCase();
if(_1263=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_1262.Title+"\n"+_1262.Message);
}else{
Dialog[_1263](_1262.Title,_1262.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_1264){
var map={};
var _1266=false;
new List(_1264.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1266=true;
});
var proto=ViewDefinitions[_1264.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1264.ViewId;
}
def.argument=_1266?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_126b){
var def=ViewDefinition.clone("Composite.Management.GenericView",_126b.ViewId);
def.label=_126b.Label;
def.toolTip=_126b.ToolTip;
def.image=_126b.Image;
def.argument={"url":_126b.Url,"list":paramsToList(_126b.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_126d){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_126d.ViewId);
def.label=_126d.Label;
def.toolTip=_126d.ToolTip;
def.image=_126d.Image;
def.url=_126d.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_126f){
if(StageBinding.isViewOpen(_126f.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_126f.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1270){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1270.ViewId,isSuccess:_1270.Succeeded});
}
this._lockSystem=function(_1271){
var _1272=top.bindingMap.offlinetheatre;
if(_1271){
_1272.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1272.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1245=_1271;
};
this.handleBroadcast=function(_1274,arg){
switch(_1274){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1242!=null&&arg==_1242){
_1242=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_1243.set(arg,true);
}else{
_123f.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1243.hasEntries()){
_1243.del(arg);
_123f.debug("Refreshed tree: "+arg+"\n("+_1243.countEntries()+" trees left!)");
if(!_1243.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1244.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1244.hasEntries()==true){
_1244.del(arg);
if(!_1244.hasEntries()){
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
function paramsToList(_1276){
var list=new List();
new List(_1276).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _1279=false;
var _127a=false;
var _127b=null;
var _127c=false;
var _127d=Client.qualifies();
var _127e="admin";
var _127f="123456";
if(!_127d){
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
};
this.handleBroadcast=function(_1280){
switch(_1280){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1280);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1281=window.bindingMap.appwindow;
_1281.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1282){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1283){
if(_1282){
EventBroadcaster.subscribe(_1283,KickStart);
}else{
EventBroadcaster.unsubscribe(_1283,KickStart);
}
});
}
function kickStart(_1284){
switch(_1284){
case BroadcastMessages.AUDIO_INITIALIZED:
_127a=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1279=true;
break;
}
if(_1279&&_127a){
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
DataManager.getDataBinding("username").setValue(_127e);
DataManager.getDataBinding("password").setValue(_127f);
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
this.doLogin=function(_1287,_1288){
var _1289=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _128a=false;
var _128b=LoginService.ValidateAndLogin(_1287,_1288);
if(_128b instanceof SOAPFault){
alert(_128b.getFaultString());
}else{
_128a=_128b;
}
if(_128a){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1289){
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
var _128c=DataManager.getDataBinding("username");
var _128d=DataManager.getDataBinding("password");
_128c.blur();
_128d.blur();
_128c.setValue("");
_128d.setValue("");
_128c.clean();
_128d.clean();
_128c.focus();
document.getElementById("loginerror").style.display="block";
var _128e={handleAction:function(_128f){
document.getElementById("loginerror").style.display="none";
_128f.target.removeActionListener(Binding.ACTION_DIRTY,_128e);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_128e);
}
WindowManager.fireOnLoad(this);
if(!_127d){
UpdateManager.isEnabled=false;
}
};

