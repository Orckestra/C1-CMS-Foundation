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
function _Audio(){
this._construct();
}
_Audio.prototype={SPLASH:"${root}/audio/splash.mp3",LOGIN:"${root}/audio/login.mp3",FATAL:"${root}/audio/fatal.mp3",_logger:SystemLogger.getLogger("Audio"),_audio:null,isInitialized:false,isEnabled:false,_construct:function(){
if(!Client.hasFlash){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_KICKSTART,{handleBroadcast:function(){
Audio.initialize(null);
}});
}
},initialize:function(_36c){
if(!this.isInitialized){
this.isInitialized=true;
if(_36c){
this._audio=_36c;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _36e=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_36e=true;
}
return _36e;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _36f=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _370={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _371=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_371){
for(var key in _371){
_370[key]=_371[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_370);
}
}});
this.getPref=function(key){
var _374=null;
if(key){
_374=_370[key];
}else{
throw "No such preference.";
}
return _374;
};
this.setPref=function(key,_376){
if(key){
_370[key]=_376;
}else{
throw "No such preference.";
}
};
function debug(_377){
var _378=_377?"Persisted preferences":"No persisted preferences. Using defaults";
_378+=":\n";
for(var key in _370){
var pref=_370[key];
_378+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_36f.fine(_378);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _37d=null;
if(this.isInitialized==true){
if(this._persistance){
var _37e=this._persistance[id];
if(_37e){
_37d=_37e[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _37d;
},setPersistedProperty:function(id,prop,_381){
if(this.isInitialized==true){
if(this._persistance){
if(_381!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_381);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_382){
switch(_382){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _383=top.bindingMap.persistance;
_383.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _384=top.bindingMap.persistance;
var map=_384.getPersistanceMap();
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
function StandardEventHandler(doc,_387){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_387;
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
var _38b={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_38b);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_38b);
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
var _392=UserInterface.getBinding(node);
if(_392!=null){
_392.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_392!=null?null:node.parentNode;
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
var _395=Application.trackMousePosition(e);
if(_395){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_397){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_397){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_397=true;
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
var _398=KeySetBinding.handleKey(this._contextDocument,e);
if(!_398){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _399=this._contextWindow.frameElement;
if(_399!=null){
var _39a=DOMUtil.getParentWindow(_399);
if(_39a.standardEventHandler!=null){
_39a.standardEventHandler._handleKeyDown(e,_397);
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
var _39d=false;
var _39e=DOMEvents.getTarget(e);
var name=_39e.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_39d=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_39d;
}
if(_39d){
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
StandardEventHandler.prototype.enableNativeKeys=function(_3a1){
this._isAllowTabs=(_3a1==true?true:false);
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
function Action(_3a4,type){
this.target=_3a4;
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
function Animation(_3a6){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3a7 in _3a6){
this[_3a7]=_3a6[_3a7];
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
Animation.prototype.onstart=function(_3ab){
};
Animation.prototype.onstep=function(_3ac){
};
Animation.prototype.onstop=function(_3ad){
};
Point.isEqual=function(p1,p2){
var _3b0=false;
if(p1&&p2){
_3b0=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3b0;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3b5=false;
if(dim1&&dim2){
_3b5=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3b5;
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
function BindingAcceptor(_3bc){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3bc;
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
var _3bd=new List(this._binding.dragAccept.split(" "));
while(_3bd.hasNext()){
var type=_3bd.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3bf,arg){
var type=arg;
try{
switch(_3bf){
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
function BindingBoxObject(_3c4){
this._domElement=_3c4.getBindingElement();
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
function BindingDragger(_3c6){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3c6;
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
BindingDragger.prototype.registerHandler=function(_3c8){
if(Interfaces.isImplemented(IDragHandler,_3c8)==true){
this.handler=_3c8;
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
var _3cb=e.button==(e.target?0:1);
if(_3cb){
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
var _3cd=Application.getMousePosition();
var dx=_3cd.x-this.startPoint.x;
var dy=_3cd.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3d0,e){
switch(_3d0){
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
function BindingParser(_3d2){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3d2;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3d3){
var _3d4=new List();
var xml=BindingParser.XML.replace("${markup}",_3d3);
var doc=XMLParser.parse(_3d3);
if(doc){
var _3d7=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3d7);
var node=_3d7.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3d4.add(node);
}
node=node.nextSibling;
}
}
return _3d4;
};
BindingParser.prototype._iterate=function(_3d9,_3da){
var _3db=null;
switch(_3d9.nodeType){
case Node.ELEMENT_NODE:
_3db=this._cloneElement(_3d9);
UserInterface.registerBinding(_3db);
break;
case Node.TEXT_NODE:
_3db=this._ownerDocument.createTextNode(_3d9.nodeValue);
break;
}
if(_3db){
_3da.appendChild(_3db);
}
if(_3db&&_3d9.hasChildNodes()){
var _3dc=_3d9.firstChild;
while(_3dc){
this._iterate(_3dc,_3db);
_3dc=_3dc.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3dd){
var _3de=DOMUtil.createElementNS(_3dd.namespaceURI?_3dd.namespaceURI:Constants.NS_XHTML,_3dd.nodeName,this._ownerDocument);
var i=0;
while(i<_3dd.attributes.length){
var attr=_3dd.attributes.item(i++);
_3de.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3de;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3e1){
var _3e2=null;
var _3e3=false;
var _3e4=_3e1.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3e1)){
var _3e5=UserInterface.getBinding(_3e1);
_3e3=BindingSerializer.activeInstance.indexBinding(_3e5);
if(_3e3){
_3e2=_3e5.key;
_3e1.setAttribute(BindingSerializer.KEYPOINTER,_3e2);
}
}
_3e2=_3e2?_3e2:_3e4;
var _3e6=new List(_3e1.childNodes);
_3e6.each(function(_3e7){
if(_3e7.nodeType==Node.ELEMENT_NODE){
_3e7.setAttribute(BindingSerializer.KEYPOINTER,_3e2);
}
});
if(_3e3){
BindingSerializer.activeInstance.append(_3e2,_3e4);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3e8){
BindingSerializer.activeInstance=this;
_3e8.bindingWindow.ElementIterator.iterate(_3e8.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e9){
var _3ea=false;
var _3eb=_3e9.serialize();
if(_3eb!=false){
_3ea=true;
var _3ec="ui:"+DOMUtil.getLocalName(_3e9.bindingElement);
var _3ed=DOMUtil.createElementNS(Constants.NS_UI,_3ec,this._dom);
this._pointers[_3e9.key]=_3ed;
for(var prop in _3eb){
if(_3eb[prop]!=null){
_3ed.setAttribute(prop,String(_3eb[prop]));
}
}
}
return _3ea;
};
BindingSerializer.prototype.append=function(_3ef,_3f0){
var _3f1=this._pointers[_3ef];
var _3f2=_3f0?this._pointers[_3f0]:this._dom;
_3f2.appendChild(_3f1);
};
function ImageProfile(_3f3){
this._default=_3f3.image;
this._hover=_3f3.imageHover;
this._active=_3f3.imageActive;
this._disabled=_3f3.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3f4){
this._default=_3f4;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3f5){
this._hover=_3f5;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3f6){
this._active=_3f6;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3f7){
this._disabled=_3f7;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f8,_3f9,_3fa){
var _3fb=null;
if(_3f8.isAttached){
_3fb=new List();
var _3fc=_3fa?_3f8.getChildElementsByLocalName(_3f9):_3f8.getDescendantElementsByLocalName(_3f9);
_3fc.each(function(_3fd){
var _3fe=UserInterface.getBinding(_3fd);
if(_3fe){
_3fb.add(_3fe);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f8.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3fb;
},getAncestorBindingByType:function(_400,impl,_402){
var _403=null;
if(Binding.exists(_400)){
var node=_400.bindingElement;
while(_403==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _405=UserInterface.getBinding(node);
if(_405 instanceof impl){
_403=_405;
}
}else{
if(_402&&node.nodeType==Node.DOCUMENT_NODE){
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
return _403;
},getAncestorBindingByLocalName:function(_407,_408,_409){
var _40a=null;
if(_408=="*"){
var node=_407.bindingElement;
while(!_40a&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_40a=UserInterface.getBinding(node);
}
}
}else{
_40a=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_408,_407.bindingElement,_409));
}
return _40a;
},getChildElementsByLocalName:function(_40c,_40d){
var _40e=new List();
var _40f=new List(_40c.bindingElement.childNodes);
_40f.each(function(_410){
if(_410.nodeType==Node.ELEMENT_NODE){
if(_40d=="*"||DOMUtil.getLocalName(_410)==_40d){
_40e.add(_410);
}
}
});
return _40e;
},getChildBindingByType:function(_411,impl){
var _413=null;
_411.getChildElementsByLocalName("*").each(function(_414){
var _415=UserInterface.getBinding(_414);
if(_415!=null&&_415 instanceof impl){
_413=_415;
return false;
}else{
return true;
}
});
return _413;
},getDescendantBindingByType:function(_416,impl){
var _418=null;
_416.getDescendantElementsByLocalName("*").each(function(_419){
var _41a=UserInterface.getBinding(_419);
if(_41a!=null&&_41a instanceof impl){
_418=_41a;
return false;
}else{
return true;
}
});
return _418;
},getDescendantBindingsByType:function(_41b,impl){
var _41d=new List();
_41b.getDescendantElementsByLocalName("*").each(function(_41e){
var _41f=UserInterface.getBinding(_41e);
if(_41f!=null&&_41f instanceof impl){
_41d.add(_41f);
}
return true;
});
return _41d;
},getNextBindingByLocalName:function(_420,name){
var _422=null;
var _423=_420.bindingElement;
while((_423=DOMUtil.getNextElementSibling(_423))!=null&&DOMUtil.getLocalName(_423)!=name){
}
if(_423!=null){
_422=UserInterface.getBinding(_423);
}
return _422;
},getPreviousBindingByLocalName:function(_424,name){
var _426=null;
var _427=_424.bindingElement;
while((_427=DOMUtil.getPreviousElementSibling(_427))!=null&&DOMUtil.getLocalName(_427)!=name){
}
if(_427!=null){
_426=UserInterface.getBinding(_427);
}
return _426;
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
},addFilter:function(_428){
this._filters.add(_428);
},removeFilter:function(_429){
var _42a=-1;
this._filters.each(function(fil){
_42a++;
var _42c=true;
if(fil==_429){
_42c=false;
}
return _42c;
});
if(_42a>-1){
this._filters.del(_42a);
}
},_applyFilters:function(node,arg){
var _42f=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _432=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _433=true;
while(this._filters.hasNext()&&_433==true){
var _434=this._filters.getNext();
var res=_434.call(this,node,arg);
if(res!=null){
_42f=res;
switch(res){
case stop:
case skip:
case skip+_432:
_433=false;
break;
}
}
}
return _42f;
},crawl:function(_436,arg){
this.contextDocument=_436.ownerDocument;
this.onCrawlStart();
var _438=this.type==NodeCrawler.TYPE_ASCENDING;
var _439=this._applyFilters(_436,arg);
if(_439!=NodeCrawler.STOP_CRAWLING){
if(_438&&_439==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_438?_436.parentNode:_436;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_43b,arg){
var _43d=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_43d=this._crawlDescending(_43b,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_43d=this._crawlAscending(_43b,arg);
break;
}
return _43d;
},_crawlDescending:function(_43e,arg){
var skip=NodeCrawler.SKIP_NODE;
var _441=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _443=null;
if(_43e.hasChildNodes()){
var node=_43e.firstChild;
while(node!=null&&_443!=stop){
this.currentNode=node;
_443=this._applyFilters(node,arg);
switch(_443){
case stop:
case _441:
case skip+_441:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_443=stop;
break;
}
}
}
if(_443!=stop&&_443!=skip){
this.previousNode=node;
}
break;
}
if(_443!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _443;
},_crawlAscending:function(_446,arg){
var _448=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_446!=null){
this.currentNode=_446;
_448=this._applyFilters(_446,arg);
if(_448!=stop){
var next=this.nextNode?this.nextNode:_446.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_446;
_448=this._crawl(next,arg);
}
}
}else{
_448=stop;
}
return _448;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _44c in this){
this[_44c]=null;
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
var _44f=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_44f=NodeCrawler.SKIP_NODE;
}
return _44f;
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
this.addFilter(function(_450,arg){
var _452=null;
if(!UserInterface.hasBinding(_450)){
_452=NodeCrawler.SKIP_NODE;
}
return _452;
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
this.addFilter(function(_454,arg){
var _456=null;
var _457=UserInterface.getBinding(_454);
if(Interfaces.isImplemented(ICrawlerHandler,_457)==true){
self.response=null;
_457.handleCrawler(self);
_456=self.response;
}
return _456;
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
this.addFilter(function(_459,list){
var _45b=null;
var _45c=UserInterface.getBinding(_459);
if(Interfaces.isImplemented(IFlexible,_45c)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_45c);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_45c.isFlexSuspended==true){
_45b=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_45c);
}
break;
}
}
return _45b;
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
this.addFilter(function(_45d,list){
var _45f=null;
var _460=UserInterface.getBinding(_45d);
if(_460.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_460)==true){
if(_460.isFocusable&&_460.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_460);
break;
case FocusCrawler.MODE_FOCUS:
if(!_460.isFocused){
_460.focus();
}
_45f=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_460.isFocused==true){
_460.blur();
_45f=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _45f;
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
this.addFilter(function(_461,list){
var _463=null;
var _464=UserInterface.getBinding(_461);
if(!_464.isVisible){
_463=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _463;
});
this.addFilter(function(_465,list){
var _467=null;
var _468=UserInterface.getBinding(_465);
if(_468.isAttached){
if(Interfaces.isImplemented(IFit,_468)){
if(!_468.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_468);
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
UpdateAssistant.serialize=function(_469){
_469=_469.cloneNode(true);
_469.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_469.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_469);
};
}
},handleEvent:function(e){
var _46b=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_46b);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_46b);
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
},_beforeUpdate:function(_46c){
var _46d=(_46c==document.documentElement);
if(_46d){
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
var _470=FocusBinding.focusedBinding;
if(_470!=null){
this._focusID=_470.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_46c.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_46c);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46c,false);
break;
}
}
},_afterUpdate:function(_471){
var _472=(_471==document.documentElement);
if(_472){
var _473=this._elementsbuffer;
if(_473.hasEntries()){
_473.each(function(_474){
DocumentManager.attachBindings(_474);
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
var _477=FocusBinding.focusedBinding;
if(_477==null){
var _478=document.getElementById(this._focusID);
if(_478!=null){
var _477=UserInterface.getBinding(_478);
if(_477!=null){
_477.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _479=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _47a="NEW DOM: "+document.title+"\n\n"+_479+"\n\n";
_47a+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_47a);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_471.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_471.__isAttached!==false){
this._elementsbuffer.add(_471);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_471,true);
break;
}
switch(_471.id){
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
var _477=UserInterface.getBinding(_471);
while(_477==null&&_471!=null){
_477=UserInterface.getBinding(_471);
_471=_471.parentNode;
}
if(_477!=null){
_477.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_47c,_47d){
var _47e=UserInterface.getBinding(_47c);
if(_47e!=null){
if(_47d){
var _47f=this._attributesbuffer;
var map=new Map();
_47f.each(function(name,old){
var now=_47c.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_47c.attributes).each(function(att){
if(att.specified){
if(!_47f.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_486){
var _487=_47e.propertyMethodMap[name];
if(_487!=null){
_487.call(_47e,_486);
}
});
}else{
var map=new Map();
new List(_47c.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_489,_48a){
var _48b=window.bindingMap[_489.getAttribute("id")];
if(_48b!=null){
return _48b.handleElement(_489,_48a);
}
},updateElement:function(_48c,_48d){
var _48e=window.bindingMap[_48c.getAttribute("id")];
if(_48e!=null){
return _48e.updateElement(_48c,_48d);
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
this.addFilter(function(_490,list){
var _492=UserInterface.getBinding(_490);
var _493=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_492==null){
UserInterface.registerBinding(_490);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_492!=null){
if(!_492.isAttached){
list.add(_492);
}
if(_492.isLazy==true){
_493=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_492!=null){
list.add(_492);
}
break;
}
return _493;
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
},handleBroadcast:function(_494,arg){
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
var _497=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_497)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_497!=null){
if(_497.href!=null&&_497.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _498=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_498!=null){
var map={};
var _49a=DOMUtil.getElementsByTagName(_498,"bindingmapping");
new List(_49a).each(function(_49b){
var _49c=_49b.getAttribute("element");
var _49d=_49b.getAttribute("binding");
map[_49c]=eval(_49d);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_49e){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_49e;
}else{
this.customUserInterfaceMapping.merge(_49e);
}
},_registerBindings:function(_49f){
var _4a0=new DocumentCrawler();
_4a0.mode=DocumentCrawler.MODE_REGISTER;
_4a0.crawl(_49f);
_4a0.dispose();
},_attachBindings:function(_4a1){
var _4a2=new DocumentCrawler();
_4a2.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_4a2.crawl(_4a1,list);
var _4a4=false;
while(list.hasNext()){
var _4a5=list.getNext();
if(!_4a5.isAttached){
_4a5.onBindingAttach();
if(!_4a5.memberDependencies){
_4a5.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4a5)){
_4a4=true;
}
}
}
if(_4a4){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a2.dispose();
list.dispose();
},attachBindings:function(_4a7){
this._registerBindings(_4a7);
this._attachBindings(_4a7);
},detachBindings:function(_4a8,_4a9){
var _4aa=new DocumentCrawler();
_4aa.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4aa.crawl(_4a8,list);
if(_4a9==true){
list.extractFirst();
}
var _4ac=false;
list.reverse().each(function(_4ad){
if(Interfaces.isImplemented(IData,_4ad)){
_4ac=true;
}
_4ad.dispose(true);
});
if(_4ac){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4aa.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4af){
return (/textarea|input/.test(DOMUtil.getLocalName(_4af)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4b0){
this.isDirty=true;
var _4b1=false;
if(_4b0!=null&&!_4b0.isDirty){
_4b0.isDirty=true;
_4b0.dispatchAction(Binding.ACTION_DIRTY);
_4b1=true;
}
return _4b1;
},clean:function(_4b2){
if(_4b2.isDirty){
_4b2.isDirty=false;
}
},registerDataBinding:function(name,_4b4){
if(Interfaces.isImplemented(IData,_4b4,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4b4;
}
}else{
throw "Invalid DataBinding: "+_4b4;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4b7=null;
if(this._dataBindings[name]!=null){
_4b7=this._dataBindings[name];
}
return _4b7;
},getAllDataBindings:function(_4b8){
var list=new List();
for(var name in this._dataBindings){
var _4bb=this._dataBindings[name];
list.add(_4bb);
if(_4b8&&_4bb instanceof WindowBinding){
var _4bc=_4bb.getContentWindow().DataManager;
if(_4bc!=null){
list.merge(_4bc.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4bd=false;
for(var name in this._dataBindings){
_4bd=true;
break;
}
return _4bd;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4c1){
var _4c2=this._dataBindings[name];
if(_4c2!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4c2.setResult(_4c1);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4c2);
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
var _4c3=new DataBindingMap();
_4c3.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4c5=this._dataBindings[name];
if(_4c5 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4c3[name]=_4c5.getValue();
}
return _4c3;
},getDataBindingResultMap:function(){
var _4c6=new DataBindingMap();
_4c6.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c8=this._dataBindings[name];
var res=_4c8.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4cb){
_4c6.set(name,_4cb);
});
}else{
_4c6.set(name,res);
}
}
return _4c6;
},getPostBackString:function(){
var _4cc="";
var form=document.forms[0];
if(form!=null){
var _4ce="";
new List(form.elements).each(function(_4cf){
var name=_4cf.name;
var _4d1=encodeURIComponent(_4cf.value);
switch(_4cf.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4cc+=name+"="+_4d1+"&";
break;
case "submit":
if(document.activeElement==_4cf){
_4cc+=name+"="+_4d1+"&";
}
break;
case "radio":
if(_4cf.checked){
_4cc+=name+"="+_4d1+"&";
}
break;
case "checkbox":
if(_4cf.checked){
if(_4cf.name==_4ce){
if(_4cc.lastIndexOf("&")==_4cc.length-1){
_4cc=_4cc.substr(0,_4cc.length-1);
}
_4cc+=","+_4d1;
}else{
_4cc+=name+"="+_4cf.value;
}
_4ce=name;
_4cc+="&";
}
break;
}
});
}
return _4cc.substr(0,_4cc.length-1);
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
var _4da=null;
var _4db=null;
var _4dc=false;
if(!this._cache[name]){
_4dc=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4de=DOMUtil.getXMLHTTPRequest();
_4de.open("get",uri,false);
_4de.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4de.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4db=_4de.responseText;
break;
default:
_4db=_4de.responseXML;
break;
}
if(_4db==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4db;
}
}
_4db=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4da=_4db;
break;
case this._modes.MODE_DOCUMENT:
_4da=DOMUtil.cloneNode(_4db,true);
break;
case this._modes.MODE_ELEMENT:
_4da=DOMUtil.cloneNode(_4db.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4da=DOMSerializer.serialize(_4db,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4da=DOMSerializer.serialize(_4db.documentElement,true);
break;
}
if(_4dc&&Application.isDeveloperMode){
}
return _4da;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4e1){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4e1];
},invoke:function(url,_4e3,_4e4){
this._logger.error("Not implemented");
},invokeModal:function(url,_4e6,_4e7){
var _4e8=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4e6,argument:_4e7});
StageBinding.presentViewDefinition(_4e8);
return _4e8;
},invokeDefinition:function(_4e9){
if(_4e9 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e9);
}
return _4e9;
},question:function(_4ea,text,_4ec,_4ed){
if(!_4ec){
_4ec=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4ea,text,_4ec,_4ed);
},message:function(_4ee,text,_4f0,_4f1){
if(!_4f0){
_4f0=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4ee,text,_4f0,_4f1);
},error:function(_4f2,text,_4f4,_4f5){
if(!_4f4){
_4f4=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4f2,text,_4f4,_4f5);
},warning:function(_4f6,text,_4f8,_4f9){
if(!_4f8){
_4f8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4f6,text,_4f8,_4f9);
},_standardDialog:function(type,_4fb,text,_4fd,_4fe){
var _4ff=null;
if(!_4fd){
_4ff=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4ff=new List();
new List(_4fd).each(function(_500){
var _501=null;
switch(typeof _500){
case "object":
_501=_500;
break;
case "string":
var _502=false;
if(_500.indexOf(":")>-1){
_500=_500.split(":")[0];
_502=true;
}
_501=Dialog.dialogButton(_500);
if(_502){
_501.isDefault=true;
}
break;
}
_4ff.add(_501);
});
}
var _503={title:_4fb,text:text,type:type,image:this._dialogImages[type],buttons:_4ff};
var _504=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4fe,argument:_503});
StageBinding.presentViewDefinition(_504);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_506,arg){
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
},saveAll:function(_509){
var self=this;
var _50b=Application.getDirtyDockTabsTabs();
if(_50b.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_50c,_50d){
switch(_50c){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_50d,_509);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_50b);
}else{
if(_509){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_50e,_50f){
var _510=false;
var list=new List();
_50e.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_510=true;
var _514=list.getLength();
var _515={handleBroadcast:function(_516,tab){
if(--_514==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_50f){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_515);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _510;
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
var _51a="Composite.Management.Help";
if(!StageBinding.isViewOpen(_51a)){
StageBinding.handleViewPresentation(_51a);
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
var _51c=document.createEvent("Events");
_51c.initEvent(type,true,true);
window.dispatchEvent(_51c);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function CompositeUrl(url){
var _51e=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _51f=_51e.exec(url);
if(_51f){
var _520={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_520[$1]=$3;
});
this.queryString=_520;
this.path=url.replace(/\?.*/g,"");
if(_51f[3]=="media"){
this.isMedia=true;
}else{
if(_51f[3]=="page"){
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
CompositeUrl.prototype.setParam=function(key,_528){
this.queryString[key]=_528;
};
CompositeUrl.prototype.toString=function(){
var url=this.path;
var _52a=[];
for(var key in this.queryString){
_52a.push(key+"="+this.queryString[key]);
}
if(_52a.length>0){
url+="?"+_52a.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_52c,_52d){
var _52e=null;
var _52f=ViewDefinitions[_52c];
if(_52f.isMutable){
var impl=null;
if(_52f instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_52d!=null&&impl!=null){
var def=new impl();
for(var prop in _52f){
def[prop]=ViewDefinition.cloneProperty(_52f[prop]);
}
def.handle=_52d;
_52e=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _52e;
};
ViewDefinition.cloneProperty=function(_533){
if(null==_533){
return _533;
}
if(typeof _533==="object"){
var _534=(_533.constructor===Array)?[]:{};
for(var prop in _533){
_534[prop]=ViewDefinition.cloneProperty(_533[prop]);
}
return _534;
}
return _533;
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
Binding.evaluate=function(_53b,_53c){
var _53d=null;
var _53e=_53c.bindingWindow.WindowManager;
if(_53e!=null){
var _53f=Binding.parseScriptStatement(_53b,_53c.key);
_53d=_53e.evaluate(_53f);
}
return _53d;
};
Binding.parseScriptStatement=function(_540,key){
if(_540!=null&&key!=null){
var _542="UserInterface.getBindingByKey ( \""+key+"\" )";
_540=_540.replace(/(\W|^)this(,| +|\)|;)/g,_542);
_540=_540.replace(/(\W|^)this(\.)/g,_542+".");
}
return _540;
};
Binding.exists=function(_543){
var _544=false;
try{
if(_543&&_543.bindingElement&&_543.bindingElement.nodeType&&_543.isDisposed==false){
_544=true;
}
}
catch(accessDeniedException){
_544=false;
}
finally{
return _544;
}
};
Binding.destroy=function(_545){
if(!_545.isDisposed){
if(_545.acceptor!=null){
_545.acceptor.dispose();
}
if(_545.dragger!=null){
_545.disableDragging();
}
if(_545.boxObject!=null){
_545.boxObject.dispose();
}
if(_545._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_545);
}
for(var _546 in _545.shadowTree){
var _547=_545.shadowTree[_546];
if(_547 instanceof Binding&&Binding.exists(_547)){
_547.dispose(true);
}
_545.shadowTree[_546]=null;
}
_545.isDisposed=true;
_545=null;
}
};
Binding.dotnetify=function(_548,_549){
var _54a=_548.getCallBackID();
if(_54a!=null){
var _54b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_548.bindingDocument);
_54b.type="hidden";
_54b.id=_54a;
_54b.name=_54a;
_54b.value=_549!=null?_549:"";
_548.bindingElement.appendChild(_54b);
_548.shadowTree.dotnetinput=_54b;
}else{
throw _548.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_54c){
var _54d=_54c.getProperty("image");
var _54e=_54c.getProperty("image-hover");
var _54f=_54c.getProperty("image-active");
var _550=_54c.getProperty("image-disabled");
if(_54c.imageProfile==null){
if(_54c.image==null&&_54d!=null){
_54c.image=_54d;
}
if(_54c.imageHover==null&&_54e!=null){
_54c.imageHover=_54d;
}
if(_54c.imageActive==null&&_54f!=null){
_54c.imageActive=_54f;
}
if(_54c.imageDisabled==null&&_550!=null){
_54c.imageDisabled=_550;
}
if(_54c.image||_54c.imageHover||_54c.imageActive||_54c.imageDisabled){
_54c.imageProfile=new ImageProfile(_54c);
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
var _552=this.dependentBindings[key];
_552.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_553){
if(_553){
this.memberDependencies[_553.key]=true;
var _554=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_554=false;
break;
}
}
if(_554){
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
Binding.prototype.detachRecursive=function(_556){
if(_556==null){
_556=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_556);
};
Binding.prototype.addMember=function(_557){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_557.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_557.key]=false;
_557.registerDependentBinding(this);
}
}
return _557;
};
Binding.prototype.addMembers=function(_558){
while(_558.hasNext()){
var _559=_558.getNext();
if(!_559.isInitialized){
this.addMember(_559);
}
}
return _558;
};
Binding.prototype.registerDependentBinding=function(_55a){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_55a.key]=_55a;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _55b=this.getProperty("persist");
if(_55b&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _55d=new List(_55b.split(" "));
while(_55d.hasNext()){
var prop=_55d.getNext();
var _55f=Persistance.getPersistedProperty(id,prop);
if(_55f!=null){
this._persist[prop]=_55f;
this.setProperty(prop,_55f);
}else{
_55f=this.getProperty(prop);
if(_55f!=null){
this._persist[prop]=_55f;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _560=this.getProperty("disabled");
var _561=this.getProperty("contextmenu");
var _562=this.getProperty("observes");
var _563=this.getProperty("onattach");
var _564=this.getProperty("hidden");
var _565=this.getProperty("blockactionevents");
if(_564==true&&this.isVisible==true){
this.hide();
}
if(_560&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_561){
this.setContextMenu(_561);
}
if(_562){
this.observe(this.getBindingForArgument(_562));
}
if(_565==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_563!=null){
Binding.evaluate(_563,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _567=this.getProperty("draggable");
var _568=this.getProperty("dragtype");
var _569=this.getProperty("dragaccept");
var _56a=this.getProperty("dragreject");
if(_567!=null){
this.isDraggable=_567;
}
if(_568!=null){
this.dragType=_568;
if(_567!=false){
this.isDraggable=true;
}
}
if(_569!=null){
this.dragAccept=_569;
}
if(_56a!=null){
this.dragReject=_56a;
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
Binding.prototype._updateBindingMap=function(_56b){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _56e=null;
if(_56b){
_56e=map[id];
if(_56e!=null&&_56e!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_56e=map[id];
if(_56e!=null&&_56e==this){
delete map[id];
}
}
}else{
var _570=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_56b);
if(Application.isDeveloperMode==true){
alert(_570);
}else{
this.logger.error(_570);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_572){
};
Binding.prototype.handleBroadcast=function(_573,arg){
};
Binding.prototype.handleElement=function(_575){
return false;
};
Binding.prototype.updateElement=function(_576){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _578=null;
switch(typeof arg){
case "object":
_578=arg;
break;
case "string":
_578=this.bindingDocument.getElementById(arg);
if(_578==null){
_578=Binding.evaluate(arg,this);
}
break;
}
if(_578!=null&&_578.nodeType!=null){
_578=UserInterface.getBinding(_578);
}
return _578;
};
Binding.prototype.serialize=function(){
var _579={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_579.id=id;
}
var _57b=this.getProperty("binding");
if(_57b){
_579.binding=_57b;
}
return _579;
};
Binding.prototype.serializeToString=function(){
var _57c=null;
if(this.isAttached){
_57c=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _57c;
};
Binding.prototype.subTreeFromString=function(_57d){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_57d);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_57e){
var _57f=this.bindingElement.getAttribute(_57e);
if(_57f){
_57f=Types.castFromString(_57f);
}
return _57f;
};
Binding.prototype.setProperty=function(prop,_581){
if(_581!=null){
_581=_581.toString();
if(String(this.bindingElement.getAttribute(prop))!=_581){
this.bindingElement.setAttribute(prop,_581);
if(this.isAttached==true){
if(Persistance.isEnabled&&_581!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_581;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_581);
}
}
var _582=this.propertyMethodMap[prop];
if(_582){
_582.call(this,this.getProperty(prop));
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
var _584=null;
if(Binding.exists(this)){
_584=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _584;
};
Binding.prototype.attachClassName=function(_585){
CSSUtil.attachClassName(this.bindingElement,_585);
};
Binding.prototype.detachClassName=function(_586){
CSSUtil.detachClassName(this.bindingElement,_586);
};
Binding.prototype.hasClassName=function(_587){
return CSSUtil.hasClassName(this.bindingElement,_587);
};
Binding.prototype.addActionListener=function(type,_589){
_589=_589!=null?_589:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_589)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_589);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_589+")");
}
};
Binding.prototype.removeActionListener=function(type,_58b){
_58b=_58b?_58b:this;
if(Action.isValid(type)){
var _58c=this.actionListeners[type];
if(_58c){
var i=0,_58e;
while((_58e=_58c[i])!=null){
if(_58e==_58b){
_58c.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_590){
_590=_590?_590:this;
DOMEvents.addEventListener(this.bindingElement,type,_590);
};
Binding.prototype.removeEventListener=function(type,_592){
_592=_592?_592:this;
DOMEvents.removeEventListener(this.bindingElement,type,_592);
};
Binding.prototype.subscribe=function(_593){
if(!this.hasSubscription(_593)){
this._subscriptions.set(_593,true);
EventBroadcaster.subscribe(_593,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_593);
}
};
Binding.prototype.unsubscribe=function(_594){
if(this.hasSubscription(_594)){
this._subscriptions.del(_594);
EventBroadcaster.unsubscribe(_594,this);
}
};
Binding.prototype.hasSubscription=function(_595){
return this._subscriptions.has(_595);
};
Binding.prototype.observe=function(_596,_597){
_596.addObserver(this,_597);
};
Binding.prototype.unObserve=function(_598,_599){
_598.removeObserver(this,_599);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _59e={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_59e);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_59e);
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
var _5a0=null;
var _5a1=null;
var _5a2=false;
if(arg instanceof Action){
_5a0=arg;
}else{
if(Action.isValid(arg)){
_5a0=new Action(this,arg);
_5a2=true;
}
}
if(_5a0!=null&&Action.isValid(_5a0.type)==true){
if(_5a0.isConsumed==true){
_5a1=_5a0;
}else{
var _5a3=this.actionListeners[_5a0.type];
if(_5a3!=null){
_5a0.listener=this;
var i=0,_5a5;
while((_5a5=_5a3[i++])!=null){
if(_5a5&&_5a5.handleAction){
_5a5.handleAction(_5a0);
}
}
}
var _5a6=true;
if(this.isBlockingActions==true){
switch(_5a0.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a2){
_5a6=false;
}
break;
}
}
if(_5a6){
_5a1=this.migrateAction(_5a0);
}else{
_5a1=_5a0;
}
}
}
return _5a1;
};
Binding.prototype.migrateAction=function(_5a7){
var _5a8=null;
var _5a9=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5a8&&node.nodeType!=Node.DOCUMENT_NODE){
_5a8=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5a8){
_5a9=_5a8.dispatchAction(_5a7);
}else{
_5a9=_5a7;
}
}
return _5a9;
};
Binding.prototype.reflex=function(_5ab){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5ab);
}
};
Binding.prototype.getMigrationParent=function(){
var _5ac=null;
if(true){
try{
var _5ad=this.bindingElement.parentNode;
if(_5ad!=null){
_5ac=_5ad;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5ac=null;
}
}
return _5ac;
};
Binding.prototype.add=function(_5ae){
if(_5ae.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5ae.bindingElement);
}else{
throw "Could not add "+_5ae.toString()+" of different document origin.";
}
return _5ae;
};
Binding.prototype.addFirst=function(_5af){
if(_5af.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5af.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5af.toString()+" of different document origin.";
}
return _5af;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5b0,_5b1){
return BindingFinder.getAncestorBindingByLocalName(this,_5b0,_5b1);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b3){
return BindingFinder.getAncestorBindingByType(this,impl,_5b3);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b5){
return BindingFinder.getChildElementsByLocalName(this,_5b5);
};
Binding.prototype.getChildElementByLocalName=function(_5b6){
return this.getChildElementsByLocalName(_5b6).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5b7){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5b7));
};
Binding.prototype.getChildBindingsByLocalName=function(_5b8){
return this.getDescendantBindingsByLocalName(_5b8,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5b9){
return this.getChildBindingsByLocalName(_5b9).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5ba,_5bb){
return BindingFinder.getDescendantBindingsByLocalName(this,_5ba,_5bb);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5bc){
return this.getDescendantBindingsByLocalName(_5bc,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5bf){
return BindingFinder.getNextBindingByLocalName(this,_5bf);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5c0){
return BindingFinder.getPreviousBindingByLocalName(this,_5c0);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5c1){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5c1);
};
Binding.prototype.isFirstBinding=function(_5c2){
return (this.getOrdinalPosition(_5c2)==0);
};
Binding.prototype.isLastBinding=function(_5c3){
return DOMUtil.isLastElement(this.bindingElement,_5c3);
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
Binding.prototype.setCallBackArg=function(_5c5){
this.setProperty(Binding.CALLBACKARG,_5c5);
};
Binding.prototype.dispose=function(_5c6){
if(!this.isDisposed){
if(!_5c6){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5c7=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5c7){
if(Client.isExplorer){
_5c7.outerHTML="";
}else{
_5c7.parentNode.removeChild(_5c7);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5ca){
list.add(_5ca);
});
list.each(function(_5cb){
self.unsubscribe(_5cb);
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
Binding.prototype.wakeUp=function(_5cd,_5ce){
_5ce=_5ce?_5ce:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5cd!==undefined){
self[_5cd]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5ce);
},0);
}
};
Binding.prototype.handleCrawler=function(_5d0){
if(_5d0.response==null&&this.isLazy==true){
if(_5d0.id==DocumentCrawler.ID&&_5d0.mode==DocumentCrawler.MODE_REGISTER){
_5d0.response=NodeCrawler.NORMAL;
}else{
_5d0.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d0.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5d0.id)){
_5d0.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d0.response==null){
switch(_5d0.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5d0.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5d1){
var _5d2=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5d1);
return UserInterface.registerBinding(_5d2,Binding);
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
var _5d3=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d3.each(function(_5d4){
DataBinding.expressions[_5d4.Key]=new RegExp(_5d4.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d5){
var _5d6=null;
var _5d7=_5d5.getAncestorBindingByLocalName("field");
if(_5d7&&_5d7 instanceof FieldBinding){
var desc=_5d7.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d6=desc.getLabel();
}
}
return _5d6;
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
var _5da=this.bindingWindow.DataManager;
_5da.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5dc=this.bindingWindow.DataManager;
if(_5dc.getDataBinding(name)){
_5dc.unRegisterDataBinding(name);
}
_5dc.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5dd,arg){
RootBinding.superclass.handleBroadcast.call(this,_5dd,arg);
var _5df=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5dd){
case _5df:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5df);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5e0){
var _5e1=_5e0?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5e0!=this.isActivated){
this.isActivated=_5e0;
this.dispatchAction(_5e1);
var _5e2=new List();
var self=this;
this._activationawares.each(function(_5e4){
if(_5e4.isActivationAware){
try{
if(_5e0){
if(!_5e4.isActivated){
_5e4.onActivate();
}
}else{
if(_5e4.isActivated){
_5e4.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e2.add(_5e4);
}
}
});
_5e2.each(function(_5e5){
this._activationawares.del(_5e5);
});
_5e2.dispose();
}else{
var _5e6="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e6);
}else{
this.logger.error(_5e6);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5e7,_5e8){
if(Interfaces.isImplemented(IActivationAware,_5e7,true)==true){
if(_5e8==false){
this._activationawares.del(_5e7);
}else{
this._activationawares.add(_5e7);
if(this.isActivated==true){
_5e7.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5e7+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5e9){
var _5ea=this.getMigrationParent();
if(_5ea!=null){
var root=_5ea.ownerDocument.body;
var _5ec=UserInterface.getBinding(root);
if(_5ec!=null){
_5ec.makeActivationAware(this,_5e9);
}
}
};
RootBinding.prototype.handleCrawler=function(_5ed){
RootBinding.superclass.handleCrawler.call(this,_5ed);
if(_5ed.type==NodeCrawler.TYPE_ASCENDING){
_5ed.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5ee=null;
if(this.bindingWindow.parent){
_5ee=this.bindingWindow.frameElement;
}
return _5ee;
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
var _5ef=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5ef.hasNext()){
var cell=_5ef.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5f1){
var _5f2=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5f1.bindingElement);
_5f2=_5f1;
}else{
_5f2=MatrixBinding.superclass.add.call(this,_5f1);
}
return _5f2;
};
MatrixBinding.prototype.addFirst=function(_5f3){
var _5f4=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5f5=this.shadowTree[MatrixBinding.CENTER];
_5f5.insertBefore(_5f3.bindingElement,_5f5.firstChild);
_5f4=_5f3;
}else{
_5f4=MatrixBinding.superclass.addFirst.call(this,_5f3);
}
return _5f3;
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
MatrixBinding.newInstance=function(_5f7){
var _5f8=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5f7);
return UserInterface.registerBinding(_5f8,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5f9,_5fa){
var list=new List();
var _5fc=new FlexBoxCrawler();
_5fc.mode=_5fa?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5fc.startBinding=_5f9;
_5fc.crawl(_5f9.bindingElement,list);
list.each(function(_5fd){
_5fd.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5fe){
if(Binding.exists(_5fe)){
_5fe.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5ff){
if(Binding.exists(_5ff)){
_5ff.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5fc.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_600){
FlexBoxBinding.superclass.handleAction.call(this,_600);
switch(_600.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_601){
var _602=0;
var _603=new List(this.bindingElement.parentNode.childNodes);
while(_603.hasNext()){
var _604=_603.getNext();
if(_604.nodeType==Node.ELEMENT_NODE&&_604!=this.bindingElement){
if(!this._isOutOfFlow(_604)){
var rect=_604.getBoundingClientRect();
if(_601){
height+=(rect.right-rect.left);
}else{
_602+=(rect.bottom-rect.top);
}
}
}
}
return _602;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_606){
var _607=CSSComputer.getPosition(_606);
var _608=CSSComputer.getFloat(_606);
return (_607=="absolute"||_608!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _609=this.bindingElement.parentNode;
var rect=_609.getBoundingClientRect();
var _60b=rect.bottom-rect.top;
var _60c=CSSComputer.getPadding(_609);
var _60d=CSSComputer.getBorder(_609);
_60b-=(_60c.top+_60c.bottom);
_60b-=(_60d.top+_60d.bottom);
return _60b;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _60e=this.bindingElement.parentNode;
var rect=_60e.getBoundingClientRect();
var _610=rect.right-rect.left;
var _611=CSSComputer.getPadding(_60e);
var _612=CSSComputer.getBorder(_60e);
_610-=(_611.left+_611.right);
_610-=(_612.left+_612.right);
return _610;
};
FlexBoxBinding.prototype.setFlexibility=function(_613){
if(_613!=this.isFlexible){
if(_613){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_613;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _614=this._getSiblingsSpan();
_614=this._getCalculatedHeight()-_614;
if(!isNaN(_614)&&_614>=0){
if(_614!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_614)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_615){
if(!this.isFit||_615){
var _616=0;
new List(this.bindingElement.childNodes).each(function(_617){
if(_617.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_617)){
var rect=_617.getBoundingClientRect();
_616+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_616);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_619){
var _61a=CSSComputer.getPadding(this.bindingElement);
var _61b=CSSComputer.getBorder(this.bindingElement);
_619+=_61a.top+_61a.bottom;
_619+=_61b.top+_61b.bottom;
this.bindingElement.style.height=_619+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_61c){
ScrollBoxBinding.superclass.handleAction.call(this,_61c);
switch(_61c.type){
case BalloonBinding.ACTION_INITIALIZE:
_61c.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_61d){
this.bindingElement.scrollLeft=_61d.x;
this.bindingElement.scrollTop=_61d.y;
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
var _61e=this._getBuildElement("labeltext");
if(_61e){
this.shadowTree.labelText=_61e;
this.shadowTree.text=_61e.firstChild;
this.hasLabel=true;
}
}else{
var _61f=this.getProperty("label");
var _620=this.getProperty("image");
var _621=this.getProperty("tooltip");
if(_61f){
this.setLabel(_61f,false);
}
if(_620){
this.setImage(_620,false);
}
if(_621){
this.setToolTip(_621);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_622,_623){
_622=_622!=null?_622:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_622);
this.setProperty("label",_622);
if(!_623){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_625){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_625){
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
LabelBinding.prototype.setToolTip=function(_628){
this.setProperty("tooltip",_628);
if(_628!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_628));
}
};
LabelBinding.prototype.getToolTip=function(_629){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_62a){
_62a=_62a==null?true:_62a;
var _62b=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_62a;
if(_62a){
this.attachClassName(_62b);
}else{
this.detachClassName(_62b);
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
var _62c="textonly";
var _62d="imageonly";
var _62e="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_62c);
this.detachClassName(_62d);
this.attachClassName(_62e);
}else{
if(this.hasLabel){
this.detachClassName(_62e);
this.detachClassName(_62d);
this.attachClassName(_62c);
}else{
if(this.hasImage){
this.detachClassName(_62e);
this.detachClassName(_62c);
this.attachClassName(_62d);
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
LabelBinding.newInstance=function(_62f){
var _630=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_62f);
return UserInterface.registerBinding(_630,LabelBinding);
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
var _631=this.getProperty("label");
if(!_631){
_631=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_631));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_633){
this.setProperty("label",_633);
};
TextBinding.newInstance=function(_634){
var _635=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_634);
return UserInterface.registerBinding(_635,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_636,_637){
BroadcasterBinding.superclass.setProperty.call(this,_636,_637);
function update(list){
if(list){
list.each(function(_639){
_639.setProperty(_636,_637);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _63a=this._observers[_636];
if(_63a){
update(_63a);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_63b){
BroadcasterBinding.superclass.deleteProperty.call(this,_63b);
function update(list){
if(list){
list.each(function(_63d){
_63d.deleteProperty(_63b);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _63e=this._observers[_63b];
if(_63e){
update(_63e);
}
};
BroadcasterBinding.prototype.addObserver=function(_63f,_640){
_640=_640?_640:"*";
_640=new List(_640.split(" "));
while(_640.hasNext()){
var _641=_640.getNext();
switch(_641){
case "*":
this._setAllProperties(_63f);
break;
default:
var _642=this.getProperty(_641);
_63f.setProperty(_641,_642);
break;
}
if(!this._observers[_641]){
this._observers[_641]=new List();
}
this._observers[_641].add(_63f);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_643){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _646=att.nodeName;
switch(_646){
case "id":
case "key":
break;
default:
var _647=this.getProperty(_646);
_643.setProperty(_646,_647);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_648,_649){
_649=_649?_649:"*";
_649=new List(_649.split(" "));
while(_649.hasNext()){
var list=this._observers[_649.getNext()];
if(list){
while(list.hasNext()){
var _64b=list.getNext();
if(_64b==_648){
list.del(_64b);
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
BroadcasterBinding.prototype.setDisabled=function(_64c){
this.setProperty("isdisabled",_64c);
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
var _64e=this.getProperty("width");
var _64f=this.getProperty("label");
var type=this.getProperty("type");
var _651=this.getProperty("popup");
var _652=this.getProperty("tooltip");
var _653=this.getProperty("isdisabled");
var _654=this.getProperty("response");
var _655=this.getProperty("oncommand");
var _656=this.getProperty("value");
var _657=this.getProperty("ischecked");
var _658=this.getProperty("callbackid");
var _659=this.getProperty("focusable");
var _65a=this.getProperty("focused");
var _65b=this.getProperty("default");
var url=this.getProperty("url");
var _65d=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_65d){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_64f!=null){
this.setLabel(_64f);
}
if(type!=null){
this.setType(type);
}
if(_652!=null){
this.setToolTip(_652);
}
if(_64e!=null){
this.setWidth(_64e);
}
if(_651!=null){
this.setPopup(_651);
}
if(_654!=null){
this.response=_654;
}
if(_657==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_655!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_655,this);
};
}
if(_659||this.isFocusable){
this._makeFocusable();
if(_65b||this.isDefault){
this.isDefault=true;
}
if(_65a){
this.focus();
}
}
if(_653==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_658!=null){
this.bindingWindow.DataManager.registerDataBinding(_658,this);
if(_656!=null){
Binding.dotnetify(this,_656);
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
ButtonBinding.prototype.setImage=function(_65e){
if(this.isAttached){
this.labelBinding.setImage(_65e);
}
this.setProperty("image",_65e);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_65f){
if(this.isAttached){
this.labelBinding.setLabel(_65f);
}
this.setProperty("label",_65f);
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
ButtonBinding.prototype.setToolTip=function(_661){
this.setProperty("tooltip",_661);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_661));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_662){
this.imageProfile=new _662(this);
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
ButtonBinding.prototype.flip=function(_667){
_667=_667==null?true:_667;
this.isFlipped=_667;
this.setProperty("flip",_667);
if(this.isAttached){
this.labelBinding.flip(_667);
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
ButtonBinding.prototype.check=function(_668){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_668==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_669){
this.isActive=true;
this.isChecked=true;
if(!_669){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_66a){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_66a==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_66b){
this.isActive=false;
this.isChecked=false;
if(!_66b){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_66c,_66d){
if(_66c==null){
_66c==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_66c){
case true:
this.check(_66d);
break;
case false:
this.uncheck(_66d);
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
var _66f=this.getProperty("tooltip");
if(_66f){
this.setToolTip(_66f);
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
var _670=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_670=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _670;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _672=this.getEqualSizeWidth();
if(goal>_672){
var diff=goal-_672;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _675=null;
if(this.isAttached==true){
var _676=CSSComputer.getPadding(this.bindingElement);
var _677=CSSComputer.getPadding(this.bindingElement);
_675=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_675=_675+_676.left+_676.right;
_675=_675+_677.left+_677.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _675;
};
ButtonBinding.prototype.setWidth=function(_678){
if(this.isAttached==true){
var _679=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _67a=CSSComputer.getPadding(this.shadowTree.c);
var _67b=_678-_679;
_67b=_67b-_67a.left-_67a.right;
this.shadowTree.c.style.width=String(_67b)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_67b-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_678);
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
ButtonBinding.prototype.setValue=function(_67c){
this.shadowTree.dotnetinput.value=_67c;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_67d){
this.setValue(_67d);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_67e){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_67e;
this.imageProfile=_67e.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_67f){
var _680=_67f?"addEventListener":"removeEventListener";
this.binding[_680](DOMEvents.MOUSEENTER,this);
this.binding[_680](DOMEvents.MOUSELEAVE,this);
this.binding[_680](DOMEvents.MOUSEDOWN,this);
this.binding[_680](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _682=false,_683=false,_684=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_684=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_684=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_684=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_684=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_684==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_682=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_684=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_684=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_684=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_684=ButtonStateManager.STATE_NORMAL;
var _685=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_685 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_684=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_684==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_683=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_684=ButtonStateManager.STATE_NORMAL;
_682=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_684=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_684=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_684=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_684=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_684==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_682=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_684=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_684=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_684=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_684=ButtonStateManager.STATE_NORMAL;
_682=true;
break;
}
}
}
}
}
switch(_684){
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
if(_682){
this.binding.fireCommand();
}
if(_683){
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
var _689=this.imageProfile.getDisabledImage();
if(_689){
this.binding.setImage(_689);
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
ClickButtonBinding.newInstance=function(_68a){
var _68b=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_68a);
return UserInterface.registerBinding(_68b,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_68c){
var _68d=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_68c);
return UserInterface.registerBinding(_68d,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_68e){
var _68f=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_68e);
return UserInterface.registerBinding(_68f,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_690){
this._binding=_690;
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
var _691=this.getDescendantBindingsByLocalName("control");
_691.each(function(_692){
_692.setControlType(_692.controlType);
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
ControlGroupBinding.newInstance=function(_694){
var _695=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_694);
return UserInterface.registerBinding(_695,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_698){
ControlBinding.superclass.handleAction.call(this,_698);
switch(_698.type){
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
function ControlImageProfile(_699){
this.binding=_699;
}
ControlImageProfile.prototype._getImage=function(_69a){
var _69b=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_69b=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_69b=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_69b=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_69b=this.constructor.IMAGE_CLOSE;
break;
}
return _69b.replace("${string}",_69a);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _69c=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_69c=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _69c?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_69d){
ControlBoxBinding.superclass.handleAction.call(this,_69d);
switch(_69d.type){
case ControlBinding.ACTION_COMMAND:
var _69e=_69d.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_69e);
Application.unlock(self);
},0);
_69d.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6a0){
switch(_6a0.controlType){
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
ControlBoxBinding.prototype.setState=function(_6a1){
var _6a2=this.getState();
this.setProperty("state",_6a1);
this.detachClassName(_6a2);
this.attachClassName(_6a1);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6a3=this.getProperty("state");
if(!_6a3){
_6a3=ControlBoxBinding.STATE_NORMAL;
}
return _6a3;
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
MenuContainerBinding.prototype.isOpen=function(_6a4){
var _6a5=null;
if(!_6a4){
_6a5=this._isOpen;
}else{
_6a5=(_6a4==this._openElement);
}
return _6a5;
};
MenuContainerBinding.prototype.setOpenElement=function(_6a6){
if(_6a6){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6a6;
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
var _6a7=this.getChildBindingByLocalName("menupopup");
if(_6a7&&_6a7!=this.menuPopupBinding){
this.menuPopupBinding=_6a7;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6a8=this.getMenuContainerBinding();
_6a8.setOpenElement(this);
var _6a9=this.getMenuPopupBinding();
_6a9.snapTo(this.bindingElement);
_6a9.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6aa){
MenuContainerBinding.superclass.handleAction.call(this,_6aa);
if(_6aa.type==PopupBinding.ACTION_HIDE){
var _6ab=this.getMenuContainerBinding();
_6ab.setOpenElement(false);
this.reset();
_6aa.consume();
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
MenuBarBinding.prototype.handleAction=function(_6ac){
MenuBarBinding.superclass.handleAction.call(this,_6ac);
switch(_6ac.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6ad=_6ac.target;
var _6ae=this.getChildBindingsByLocalName("menu");
while(_6ae.hasNext()){
var menu=_6ae.getNext();
}
switch(_6ad.arrowKey){
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
var _6b0=this.getProperty("image");
var _6b1=this.getProperty("label");
var _6b2=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6b1){
this.setLabel(_6b1);
}
if(_6b0){
this.setImage(_6b0);
}
if(_6b2){
this.setToolTip(_6b2);
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
MenuBinding.prototype.setLabel=function(_6b4){
this.setProperty("label",_6b4);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6b4));
}
};
MenuBinding.prototype.setToolTip=function(_6b5){
this.setProperty("tooltip",_6b5);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6b5));
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
var _6b7=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6b7.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6b7.isOpen()&&!_6b7.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6b7.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6b7.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6b8,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6b8){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6bd){
switch(_6bd.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6be=null;
var _6bf=true;
self._lastFocused.focus();
self.grabKeyboard();
_6bd.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6c1){
for(var key in this._focused){
if(key!=_6c1.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6c1.key]=_6c1;
this._lastFocused=_6c1;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6c4){
delete this._focused[_6c4.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6c5){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6c5);
}
if(_6c5){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6c8=this.getChildBindingsByLocalName("menugroup");
var _6c9=null;
var _6ca=null;
while(_6c8.hasNext()){
var _6cb=_6c8.getNext();
if(!_6cb.isDefaultContent){
_6cb.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6c9&&_6cb.isVisible){
_6c9=_6cb;
}
if(_6cb.isVisible){
_6ca=_6cb;
}
}
}
if(_6c9&&_6ca){
_6c9.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6ca.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6cc){
MenuBodyBinding.activeInstance=this;
if(_6cc){
var _6cd=this._getMenuItems().getFirst();
if(_6cd){
_6cd.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6ce=this._lastFocused;
if((_6ce!=null)&&(!_6ce.isMenuContainer)){
_6ce.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6d0=this._getMenuItems();
var _6d1=null;
var next=null;
if(this._lastFocused){
_6d1=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6d0.getPreceding(_6d1);
break;
case KeyEventCodes.VK_DOWN:
next=_6d0.getFollowing(_6d1);
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
next=_6d0.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6d4=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6d5){
_6d4=_6d5.getChildBindingsByLocalName("menuitem");
_6d4.each(function(item){
list.add(item);
});
});
_6d4=this.getChildBindingsByLocalName("menuitem");
_6d4.each(function(item){
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
MenuBodyBinding.newInstance=function(_6d8){
var _6d9=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6d8);
return UserInterface.registerBinding(_6d9,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6da){
switch(_6da){
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
MenuGroupBinding.newInstance=function(_6db){
var _6dc=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6db);
return UserInterface.registerBinding(_6dc,MenuGroupBinding);
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
var _6dd=this.getProperty("image");
var _6de=this.getProperty("image-hover");
var _6df=this.getProperty("image-active");
var _6e0=this.getProperty("image-disabled");
if(!this.image&&_6dd){
this.image=_6dd;
}
if(!this.imageHover&&_6de){
this.imageHover=_6dd;
}
if(!this.imageActive&&_6df){
this.imageActive=_6df;
}
if(!this.imageDisabled&&_6e0){
this.imageDisabled=_6e0;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6e1=this.getProperty("label");
var _6e2=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6e4=this.getProperty("isdisabled");
var _6e5=this.getProperty("image");
var _6e6=this.getProperty("image-hover");
var _6e7=this.getProperty("image-active");
var _6e8=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6e9=this.getMenuPopupBinding();
if(_6e9){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6e5){
this.image=_6e5;
}
if(!this.imageHover&&_6e6){
this.imageHover=_6e5;
}
if(!this.imageActive&&_6e7){
this.imageActive=_6e7;
}
if(!this.imageDisabled&&_6e8){
this.imageDisabled=_6e8;
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
if(_6e1!=null){
this.setLabel(_6e1);
}
if(_6e2){
this.setToolTip(_6e2);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6e4==true){
this.disable();
}
var _6ea=this.getProperty("oncommand");
if(_6ea){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6ea);
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
MenuItemBinding.prototype.setLabel=function(_6ed){
this.setProperty("label",_6ed);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6ed));
}
};
MenuItemBinding.prototype.setToolTip=function(_6ee){
this.setProperty("tooltip",_6ee);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6ee));
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
var _6f0=this.bindingDocument.createElement("div");
_6f0.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6f0.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6f1=this.labelBinding.bindingElement;
_6f1.insertBefore(_6f0,_6f1.firstChild);
_6f0.style.display="none";
this.shadowTree.checkBoxIndicator=_6f0;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6f0=this.bindingDocument.createElement("div");
_6f0.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6f0.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6f1=this.labelBinding.bindingElement;
_6f1.insertBefore(_6f0,_6f1.firstChild);
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
var _6f3=this.imageProfile.getDisabledImage();
if(_6f3){
this.setImage(_6f3);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6f3=this.imageProfile.getDefaultImage();
if(_6f3){
this.setImage(_6f3);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6f5=this.getMenuContainerBinding();
if(_6f5.isOpen()&&!_6f5.isOpen(this)){
_6f5._openElement.hide();
_6f5.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6f5=this.getMenuContainerBinding();
if(!_6f5.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6f7){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6f8=this.getMenuContainerBinding();
if(!_6f8||!_6f8.isOpen(this)||_6f7){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6f9){
this.setChecked(true,_6f9);
};
MenuItemBinding.prototype.uncheck=function(_6fa){
this.setChecked(false,_6fa);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6fb,_6fc){
this.setProperty("ischecked",_6fb);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6fb){
this.isChecked=_6fb;
this.shadowTree.checkBoxIndicator.style.display=_6fb?"block":"none";
if(!_6fc){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6fd){
var _6fe=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6fd);
UserInterface.registerBinding(_6fe,MenuItemBinding);
return UserInterface.getBinding(_6fe);
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
PopupBinding.handleBroadcast=function(_6ff,arg){
switch(_6ff){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _703=PopupBinding.activeInstances.get(key);
var _704=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_703);
if(!_704){
list.add(_703);
}
});
list.each(function(_705){
_705.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _707=PopupBinding.activeInstances.get(key);
_707.hide();
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
var _708=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _709=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_708){
this._bodyBinding=UserInterface.getBinding(_708);
}else{
if(_709){
this._bodyBinding=UserInterface.getBinding(_709);
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
var _70a=this.getProperty("position");
this.position=_70a?_70a:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_70b){
var _70c=null;
if(this._bodyBinding){
this._bodyBinding.add(_70b);
_70c=_70b;
}else{
_70c=PopupBinding.superclass.add.call(this,_70b);
}
return _70c;
};
PopupBinding.prototype.addFirst=function(_70d){
var _70e=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_70d);
_70e=_70d;
}else{
_70e=PopupBinding.superclass.addFirst.call(this,_70d);
}
return _70e;
};
PopupBinding.prototype.handleAction=function(_70f){
PopupBinding.superclass.handleAction.call(this,_70f);
var _710=_70f.target;
switch(_70f.type){
case Binding.ACTION_ATTACHED:
if(_710 instanceof MenuItemBinding){
this._count(true);
_70f.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_710 instanceof MenuItemBinding){
this._count(false);
_70f.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_711){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_711?1:-1);
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
PopupBinding.prototype.snapTo=function(_712){
var _713=this._getElementPosition(_712);
switch(this.position){
case PopupBinding.POSITION_TOP:
_713.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_713.x+=_712.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_713.y+=_712.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_713.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_712;
this.bindingElement.style.display="block";
this.setPosition(_713.x,_713.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_715){
this.bindingElement.style.display="block";
this.setPosition(_715.x,_715.y);
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
PopupBinding.prototype._getElementPosition=function(_71a){
return _71a.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_71a):DOMUtil.getUniversalPosition(_71a);
};
PopupBinding.prototype._getMousePosition=function(e){
var _71c=DOMEvents.getTarget(e);
return _71c.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_71d){
var _71e=this.bindingElement;
if(_71d){
if(Client.hasTransitions){
_71e.style.visibility="visible";
_71e.style.opacity="1";
}else{
_71e.style.visibility="visible";
}
}else{
_71e.style.visibility="hidden";
_71e.style.display="none";
if(Client.hasTransitions){
_71e.style.opacity="0";
}
}
this.isVisible=_71d;
};
PopupBinding.prototype._enableTab=function(_71f){
var self=this;
var _721=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_721.each(function(_722){
_722.bindingElement.tabIndex=_71f?0:-1;
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
var _72a=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_72a.y<0){
y=-_72a.y;
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
PopupBinding.prototype.grabKeyboard=function(_72c){
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
var _732=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_732=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _732;
};
PopupBinding.prototype.clear=function(){
var _733=this._bodyBinding;
if(_733){
_733.detachRecursive();
_733.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_734){
var _735=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_734);
return UserInterface.registerBinding(_735,PopupBinding);
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
PopupBodyBinding.newInstance=function(_737){
var _738=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_737);
return UserInterface.registerBinding(_738,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_739){
return new Point(_739.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_73a){
var _73b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_73a);
return UserInterface.registerBinding(_73b,MenuPopupBinding);
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
var _73c=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_73c){
this._body=UserInterface.getBinding(_73c);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _73d=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_73d.hasNext()){
var _73e=DialogBorderBinding.newInstance(this.bindingDocument);
_73e.setType(_73d.getNext());
this.add(_73e);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _73f=this.getProperty("controls");
if(_73f){
var _740=new List(_73f.split(" "));
while(_740.hasNext()){
var type=_740.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _742=DialogControlBinding.newInstance(this.bindingDocument);
_742.setControlType(type);
this._titlebar.addControl(_742);
this.controlBindings[type]=_742;
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
var _743=this.getProperty("image");
var _744=this.getProperty("label");
var _745=this.getProperty("draggable");
var _746=this.getProperty("resizable");
var _747=this.getProperty("modal");
if(_743){
this.setImage(_743);
}
if(_744){
this.setLabel(_744);
}
if(_745==false){
this.isDialogDraggable=false;
}
if(_746==false){
this.isPanelResizable=false;
}
if(_747==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_748){
this.isModal=_748;
};
DialogBinding.prototype.setLabel=function(_749){
this.setProperty("label",_749);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_749));
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
DialogBinding.prototype.handleAction=function(_74b){
DialogBinding.superclass.handleAction.call(this,_74b);
switch(_74b.type){
case Binding.ACTION_DRAG:
var _74c=_74b.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_74c.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_74c.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_74c;
_74c.dragger.registerHandler(this);
}
break;
}
}
_74b.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_74b.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_74d,arg){
DialogBinding.superclass.handleBroadcast.call(this,_74d,arg);
switch(_74d){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_74f){
DialogBinding.superclass.handleInvokedControl.call(this,_74f);
switch(_74f.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_750){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_750){
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
var _752=self.bindingElement;
setTimeout(function(){
_752.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_753){
this.bindingElement.style.zIndex=new String(_753);
};
DialogBinding.prototype.onDragStart=function(_754){
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
DialogBinding.prototype.setResizable=function(_766){
if(this._isResizable!=_766){
if(_766){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_766;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _767=null;
var _768=this.bindingDocument.body.offsetWidth;
var _769=this.bindingDocument.body.offsetHeight;
_767={x:0.125*_768,y:0.125*_769,w:0.75*_768,h:0.5*_769};
return _767;
};
DialogBinding.prototype.centerOnScreen=function(){
var _76a=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_76a.w-dim.w),0.5*(_76a.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _76c=this;
var i=0;
function blink(){
if(i%2==0){
_76c.detachClassName("active");
}else{
_76c.attachClassName("active");
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
var _770="";
while(list.hasNext()){
var type=list.getNext();
_770+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_770);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_771){
var _772=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_771);
return UserInterface.registerBinding(_772,DialogBinding);
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
DialogHeadBinding.newInstance=function(_773){
var _774=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_773);
return UserInterface.registerBinding(_774,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_777){
var _778=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_777);
return UserInterface.registerBinding(_778,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_779){
var _77a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_779);
return UserInterface.registerBinding(_77a,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_77b){
DialogSetBinding.superclass.handleAction.call(this,_77b);
var _77c=_77b.target;
switch(_77b.type){
case Binding.ACTION_MOVETOTOP:
if(_77c instanceof DialogBinding){
this._moveToTop(_77c);
}
break;
case Binding.ACTION_MOVEDONTOP:
_77b.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_77d){
var _77e=0;
var _77f=this.getChildBindingsByLocalName("dialog");
_77f.each(function(_780){
var _781=_780.getZIndex();
_77e=_781>_77e?_781:_77e;
});
_77d.setZIndex(_77e+2);
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
DialogBorderBinding.newInstance=function(_783){
var _784=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_783);
return UserInterface.registerBinding(_784,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_785){
this._dialogBinding=_785;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_787){
DialogCoverBinding.superclass.handleAction.call(this,_787);
var _788=_787.target;
if(this._dialogBinding.isModal){
switch(_787.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_788==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_788.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_789,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_789,arg);
switch(_789){
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
var _78c=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_78c);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _78d=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_78d);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_78e){
var _78f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_78e);
return UserInterface.registerBinding(_78f,DialogCoverBinding);
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
var _790=this.getProperty("image");
if(_790){
this.setImage(_790);
}
var _791=this.getProperty("label");
if(_791){
this.setLabel(_791);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_792){
if(this.isAttached){
this.labelBinding.setLabel(_792);
}
this.setProperty("label",_792);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_794){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_794);
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
DialogTitleBarBinding.newInstance=function(_795){
var _796=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_795);
return UserInterface.registerBinding(_796,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_797){
var _798=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_797);
return UserInterface.registerBinding(_798,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_799){
var _79a=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_799);
return UserInterface.registerBinding(_79a,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_79b){
this.binding=_79b;
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
var _79e=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _79f=node.nodeName.toLowerCase();
switch(_79f){
case "script":
case "style":
case "textarea":
_79e=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _79e;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a6=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a6=false;
}
return _7a6;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7a7,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7a7,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7ab=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7ab+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b1){
var _7b2="";
var _7b3="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b4="</span>";
var self=this;
function iterate(_7b6){
var _7b7=-1;
var _7b8=null;
self._map.each(function(key,exp){
var low=_7b6.toLowerCase();
var _7bc=low.search(exp);
if(_7bc>-1){
if(_7b7==-1){
_7b7=_7bc;
}
if(_7bc<=_7b7){
_7b7=_7bc;
_7b8=key;
}
}
});
if(_7b7>-1&&_7b8!=null){
var pre=_7b6.substring(0,_7b7);
var hit=_7b6.substring(_7b7,_7b7+_7b8.length);
var pst=_7b6.substring(_7b7+_7b8.length,_7b6.length);
_7b2+=pre+_7b3+hit+_7b4;
iterate(pst);
}else{
_7b2+=_7b6;
}
}
iterate(_7b1);
return _7b2;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c0){
var _7c1=new List(_7c0.getElementsByTagName("span"));
_7c1.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c0.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c4){
var _7c5=null;
if(_7c4.isAttached){
var doc=_7c4.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c5=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c5 instanceof SOAPFault){
_7c5=null;
}
}
}
return _7c5;
};
WindowBinding.highlightKeywords=function(_7c9,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7c9.isAttached){
var doc=_7c9.getContentDocument();
if(doc!=null){
var _7cc=WindowBinding._highlightcrawler;
_7cc.reset(doc.body);
if(list!=null){
_7cc.setKeys(list);
_7cc.crawl(doc.body);
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
var _7cd=WindowBinding.superclass.serialize.call(this);
if(_7cd){
_7cd.url=this.getURL();
}
return _7cd;
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
var _7cf=this.getContentWindow().DocumentManager;
if(_7cf!=null){
_7cf.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d0){
WindowBinding.superclass.handleAction.call(this,_7d0);
var _7d1=_7d0.target;
switch(_7d0.type){
case RootBinding.ACTION_PHASE_3:
if(_7d1.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d1);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d0.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7d2){
if(!this.isFit||_7d2){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7d3){
if(this._pageBinding==null){
if(_7d3.bindingWindow==this.getContentWindow()){
this._pageBinding=_7d3;
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
WindowBinding.prototype._registerOnloadListener=function(_7d4){
var _7d5=this.shadowTree.iframe;
var _7d6=_7d4?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7d9=true;
if(Client.isExplorer){
_7d9=_7d5.readyState=="complete";
}
if(_7d9==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d6](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7da){
var _7db=_7da?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7db](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7df=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7df=url;
}
return _7df;
};
WindowBinding.prototype.reload=function(_7e1){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7e2=null;
if(this.shadowTree.iframe!=null){
_7e2=this.shadowTree.iframe;
}
return _7e2;
};
WindowBinding.prototype.getContentWindow=function(){
var _7e3=null,_7e4=this.getFrameElement();
if(_7e4!==null){
try{
_7e3=_7e4.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7e3;
};
WindowBinding.prototype.getContentDocument=function(){
var _7e5=null,win=this.getContentWindow();
if(win){
_7e5=win.document;
}
return _7e5;
};
WindowBinding.prototype.getRootBinding=function(){
var _7e7=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7e7=UserInterface.getBinding(doc.body);
}
return _7e7;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7e9){
this.bindingElement.style.height=_7e9+"px";
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
WindowBinding.prototype.handleCrawler=function(_7ea){
WindowBinding.superclass.handleCrawler.call(this,_7ea);
if(_7ea.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7ea.nextNode=root.bindingElement;
}else{
_7ea.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7ef){
var _7f0=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7ef);
var _7f1=UserInterface.registerBinding(_7f0,WindowBinding);
return _7f1;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f5){
_7f5.target.show();
_7f5.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f7){
_7f7.target.show();
_7f7.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7f9){
PreviewWindowBinding.superclass.handleAction.call(this,_7f9);
switch(_7f9.type){
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
var _7fa=null;
this._getRadioButtonBindings().each(function(_7fb){
if(_7fb.getProperty("ischecked")){
_7fa=_7fb;
return false;
}else{
return true;
}
});
if(_7fa){
this._checkedRadioBinding=_7fa;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7fc){
RadioGroupBinding.superclass.handleAction.call(this,_7fc);
var _7fd=_7fc.target;
switch(_7fc.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7fc.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7fd.isRadioButton&&!_7fd.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7fd);
}
this._checkedRadioBinding=_7fd;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7fc.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7fe,_7ff){
if(_7fe instanceof RadioDataBinding){
_7fe=_7fe.getButton();
}
if(_7fe.isRadioButton){
switch(_7ff){
case true:
this._unCheckRadioBindingsExcept(_7fe);
this._checkedRadioBinding=_7fe;
_7fe.check(true);
break;
default:
_7fe.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_800){
var _801=this._getRadioButtonBindings();
_801.each(function(_802){
if(_802.isChecked&&_802!=_800){
_802.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _803=new Crawler();
var list=new List();
_803.addFilter(function(_805){
var _806=true;
var _807=UserInterface.getBinding(_805);
if(_807 instanceof RadioGroupBinding){
_806=NodeCrawler.SKIP_CHILDREN;
}else{
if(_807 instanceof ButtonBinding&&_807.isRadioButton){
list.add(_807);
}
}
return _806;
});
_803.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_808){
var _809=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_808);
return UserInterface.registerBinding(_809,RadioGroupBinding);
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
var _80b=this.getProperty("regexrule");
if(_80b!=null){
this.expression=new RegExp(_80b);
}
var _80c=this.getProperty("onbindingblur");
if(_80c!=null){
this.onblur=function(){
Binding.evaluate(_80c,this);
};
}
var _80d=this.getProperty("onvaluechange");
if(_80d!=null){
this.onValueChange=function(){
Binding.evaluate(_80d,this);
};
}
if(this.error==null&&this.type!=null){
var _80e=DataBinding.errors[this.type];
if(_80e!=null){
this.error=_80e;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _80f=this.getProperty("value");
if(_80f!=null){
this.setValue(String(_80f));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _811=this.getProperty("isdisabled");
if(_811==true){
this.setDisabled(true);
}
var _812=this.getProperty("readonly");
if(_812==true){
this.setReadOnly(true);
}
var _813=this.getProperty("autoselect");
if(_813==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _814=Localization.currentLang();
if(_814!=null){
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
var _815=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_815.type=this.isPassword==true?"password":"text";
_815.tabIndex=-1;
return _815;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_818){
if(_818){
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
DataInputBinding.prototype.handleBroadcast=function(_81b,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_81b,arg);
var self=this;
switch(_81b){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _81e=DOMEvents.getTarget(arg);
if(_81e!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_81f){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_81f){
var self=this,_821=this.bindingElement,_822={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_821,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_821,DOMEvents.MOUSEUP,_822);
}else{
this.select();
}
}
this.onfocus();
if(!_81f){
var _823=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_823);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _824=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _825=_824.createTextRange();
_825.moveStart("character",0);
_825.moveEnd("character",_824.value.length);
_825.select();
}else{
_824.setSelectionRange(0,_824.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_826){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_826){
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
DataInputBinding.prototype.validate=function(_82a){
if(_82a==true||this._isValid){
var _82b=this.isValid();
if(_82b!=this._isValid){
this._isValid=_82b;
if(!_82b){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _82c=null;
if(this._isInvalidBecauseRequired==true){
_82c=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_82c=DataBinding.warnings["minlength"];
_82c=_82c.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_82c=DataBinding.warnings["maxlength"];
_82c=_82c.replace("${count}",String(this.maxlength));
}else{
_82c=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_82c!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_82c);
}
}else{
this.setValue(_82c);
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
var _82d=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _82e=this.getValue();
if(_82e==""){
if(this.isRequired==true){
_82d=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _82f=DataBinding.expressions[this.type];
if(!_82f.test(_82e)){
_82d=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_82e)){
_82d=false;
}
}
}
}
if(_82d&&this.minlength!=null){
if(_82e.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_82d=false;
}
}
if(_82d&&this.maxlength!=null){
if(_82e.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_82d=false;
}
}
return _82d;
};
DataInputBinding.prototype.setDisabled=function(_830){
if(_830!=this.isDisabled){
if(_830){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _831=this.shadowTree.input;
if(_830){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_831,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_831,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_830;
this.shadowTree.input.unselectable=_830?"on":"off";
}
this.isDisabled=_830;
this.isFocusable=!_830;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_833){
if(_833!=this.isReadOnly){
if(_833){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_833;
this.isReadOnly=_833;
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
DataInputBinding.prototype.handleElement=function(_834){
return true;
};
DataInputBinding.prototype.updateElement=function(_835){
var _836=_835.getAttribute("value");
var _837=_835.getAttribute("type");
var _838=_835.getAttribute("maxlength");
var _839=_835.getAttribute("minlength");
if(_836==null){
_836="";
}
var _83a=this.bindingWindow.UpdateManager;
if(this.getValue()!=_836){
_83a.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_836);
}
if(this.type!=_837){
_83a.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_837;
}
if(this.maxlength!=_838){
_83a.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_838;
}
if(this.minlength!=_839){
_83a.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_839;
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
DataInputBinding.prototype.setValue=function(_83b){
if(_83b===null){
_83b="";
}
if(_83b!=this.getValue()){
this.setProperty("value",_83b);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_83b);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _83c=null;
if(this.shadowTree.input!=null){
_83c=this.shadowTree.input.value;
}else{
_83c=this.getProperty("value");
}
return _83c;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _83e=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_83e=Number(_83e);
break;
}
return _83e;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_83f){
var _840=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_83f);
return UserInterface.registerBinding(_840,DataInputBinding);
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
var _841=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_841!=null){
this.setValue(_841.value);
_841.parentNode.removeChild(_841);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _842=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_842.tabIndex=-1;
return _842;
};
TextBoxBinding.prototype.handleElement=function(_843){
return true;
};
TextBoxBinding.prototype.updateElement=function(_844){
var _845,area=_844.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_845=DOMUtil.getTextContent(area);
}
if(_845==null){
_845="";
}
var _847=this.bindingWindow.UpdateManager;
if(this.getValue()!=_845){
_847.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_845);
}
var _848=_844.getAttribute("type");
if(this.type!=_848){
_847.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_848;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_84c){
var _84d=this.bindingDocument.selection.createRange();
var _84e=_84d.text=="";
if(_84e&&!_84c){
_84d.text="\t";
}else{
var text="";
var _850=_84d.text.length;
while((_84d.moveStart("word",-1)&&_84d.text.charAt(1)!="\n")){
}
_84d.moveStart("character",1);
var _851=0;
var i=0,line,_854=_84d.text.split("\n");
while((line=_854[i++])!=null){
if(_84c){
line=line.replace(/^(\s)/mg,"");
_851++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_854[i+1]?"\n":"");
}
_84d.text=text;
_84d.moveStart("character",-_850);
if(_84c){
_84d.moveStart("character",2*_854.length-2);
}
_84d.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _855=this.bindingDocument.selection.createRange();
var _856=_855.duplicate();
while((_856.moveStart("word",-1)&&_856.text.indexOf("\n")==-1)){
}
_856.moveStart("character",1);
_855.text="\n"+_856.text.match(/^(\s)*/)[0]+"!";
_855.moveStart("character",-1);
_855.select();
_855.text="";
_855.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_857){
var _858;
var _859;
var oss;
var osy;
var i;
var fnd;
var _85e=this._getSelectedText();
var el=this.shadowTree.input;
_858=el.scrollLeft;
_859=el.scrollTop;
if(!_85e.match(/\n/)){
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
_85e=this._getSelectedText();
if(_857){
ntext=_85e.replace(/^(\s)/mg,"");
}else{
ntext=_85e.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_85e.length);
}
el.scrollLeft=_858;
el.scrollTop=_859;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _860;
var _861;
var oss;
var osy;
var el=this.shadowTree.input;
_860=el.scrollLeft;
_861=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_860;
el.scrollTop=_861;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _868=this.shadowTree.input.value;
var _869=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _868.substr(_869,end-_869);
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
var _86b=this.getProperty("isdisabled");
if(this.isDisabled||_86b){
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
var _86d=this.getProperty("label");
var _86e=this.getProperty("value");
var _86f=this.getProperty("width");
var _870=this.getProperty("onchange");
var _871=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_86d!=null){
this.label=_86d;
}
if(!this.value&&_86e!=null){
this.value=_86e;
}
if(!this.width&&_86f){
this.width=_86f;
}
if(_871){
this.isRequired=true;
}
if(_870){
this.onValueChange=function(){
Binding.evaluate(_870,this);
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
var _872=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_872.name=this.getName();
_872.value=this.getValue();
_872.type="hidden";
if(this.hasCallBackID()){
_872.id=this.getCallBackID();
}
this.shadowTree.input=_872;
this.bindingElement.appendChild(_872);
};
SelectorBinding.prototype.buildButton=function(){
var _873=this.BUTTON_IMPLEMENTATION;
var _874=this.add(_873.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_874.imageProfile=this.imageProfile;
}
if(this.width!=null){
_874.setWidth(this.width);
}
this._buttonBinding=_874;
this.shadowTree.button=_874;
_874.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _876=top.app.bindingMap.selectorpopupset;
var doc=_876.bindingDocument;
var _878=_876.add(PopupBinding.newInstance(doc));
var _879=_878.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_878;
this._menuBodyBinding=_879;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_878.attachClassName("selectorpopup");
_878.addActionListener(PopupBinding.ACTION_SHOW,this);
_878.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_878.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_878);
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
var _87c=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_87c).each(function(_87d){
var _87e=_87d.getAttribute("label");
var _87f=_87d.getAttribute("value");
var _880=_87d.getAttribute("selected");
var _881=_87d.getAttribute("image");
var _882=_87d.getAttribute("image-hover");
var _883=_87d.getAttribute("image-active");
var _884=_87d.getAttribute("image-disabled");
var _885=null;
if(_881||_882||_883||_884){
_885=new ImageProfile({image:_881,imageHover:_882,imageActive:_883,imageDisabled:_884});
}
list.add(new SelectorBindingSelection(_87e?_87e:null,_87f?_87f:null,_880&&_880=="true",_885));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _887=null;
while(list.hasNext()){
var _888=list.getNext();
var item=this.addSelection(_888);
if(_888.isSelected){
this.select(item,true);
}
if(!_887){
_887=item;
}
}
if(!this._selectedItemBinding){
this.select(_887,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_88a,_88b){
var _88c=this.MENUITEM_IMPLEMENTATION;
var _88d=this._menuBodyBinding;
var _88e=_88d.bindingDocument;
var _88f=_88c.newInstance(_88e);
_88f.imageProfile=_88a.imageProfile;
_88f.setLabel(_88a.label);
if(_88a.tooltip!=null){
_88f.setToolTip(_88a.tooltip);
}
_88f.selectionValue=_88a.value;
_88a.menuItemBinding=_88f;
if(_88b){
_88d.addFirst(_88f);
this.selections.addFirst(_88a);
}else{
_88d.add(_88f);
this.selections.add(_88a);
}
this._isUpToDate=false;
return _88f;
};
SelectorBinding.prototype.addSelectionFirst=function(_890){
return this.addSelection(_890,true);
};
SelectorBinding.prototype.clear=function(_891){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_891&&this.defaultSelection!=null){
var _892=this.addSelection(this.defaultSelection);
this.select(_892,true);
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
SelectorBinding.prototype.setDisabled=function(_893){
if(this.isAttached==true){
var _894=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_893?"none":"block";
_894.setDisabled(_893);
}
if(_893){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_895){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_895);
}
};
SelectorBinding.prototype.handleAction=function(_896){
SelectorBinding.superclass.handleAction.call(this,_896);
switch(_896.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_896.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_896.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_896.target);
_896.consume();
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
_896.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_898){
this.select(_898);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _899=this._buttonBinding.bindingElement.offsetWidth+"px";
var _89a=this._popupBinding.bindingElement;
_89a.style.minWidth=_899;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _89c=Client.isExplorer?e.keyCode:e.which;
if(_89c==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _89c=Client.isExplorer?e.keyCode:e.which;
if(_89c>=32){
this._buttonBinding.check();
var _89d=String.fromCharCode(_89c);
this._pushSearchSelection(_89d);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_89e){
this._searchString+=_89e.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_89f){
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
var _8a0=this._menuBodyBinding;
if(_8a0!=null){
var _8a1=this.MENUITEM_IMPLEMENTATION;
var _8a2=_8a0.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8a4=list.getNext();
if(_8a4.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8a4);
}
}
}
this._attachSelections();
var _8a5=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8a6=_8a0.getDescendantBindingsByType(_8a1);
if(_8a6.hasEntries()){
while(_8a6.hasNext()){
var _8a7=_8a6.getNext();
var _8a8=_8a7.labelBinding;
if(_8a8!=null&&_8a8.shadowTree!=null&&_8a8.shadowTree.labelText!=null){
_8a8.shadowTree.labelText.innerHTML=_8a8.shadowTree.labelText.innerHTML.replace(_8a5,"<b>$&</b>");
}
}
_8a6.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8a8=LabelBinding.newInstance(_8a2);
_8a8.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8a0.add(_8a8);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8a4=list.getNext();
var item=this.addSelection(_8a4);
if(this._selectionValue==_8a4.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8aa,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8aa,arg);
switch(_8aa){
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
SelectorBinding.prototype.select=function(_8ad,_8ae){
var _8af=false;
if(_8ad!=this._selectedItemBinding){
this._selectedItemBinding=_8ad;
_8af=true;
var _8b0=this._buttonBinding;
this._selectionValue=_8ad.selectionValue;
this._selectionLabel=_8ad.getLabel();
_8b0.setLabel(_8ad.getLabel());
if(_8ad.imageProfile!=null){
_8b0.imageProfile=_8ad.imageProfile;
}
if(_8b0.imageProfile!=null){
_8b0.setImage(this.isDisabled==true?_8b0.imageProfile.getDisabledImage():_8b0.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8ae){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8ae)){
this.validate();
}
}
return _8af;
};
SelectorBinding.prototype._relate=function(){
var _8b1=this.getProperty("relate");
if(_8b1){
var _8b2=this.bindingDocument.getElementById(_8b1);
if(_8b2){
var _8b3=UserInterface.getBinding(_8b2);
if(_8b3){
if(this.isChecked){
_8b3.show();
}else{
_8b3.hide();
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
SelectorBinding.prototype.selectByValue=function(_8b4,_8b5){
var _8b6=false;
var _8b7=this._menuBodyBinding;
var _8b8=_8b7.getDescendantElementsByLocalName("menuitem");
while(_8b8.hasNext()){
var _8b9=UserInterface.getBinding(_8b8.getNext());
if(_8b9.selectionValue==_8b4){
_8b6=this.select(_8b9,_8b5);
break;
}
}
return _8b6;
};
SelectorBinding.prototype.getValue=function(){
var _8ba=this._selectionValue;
if(_8ba!=null){
_8ba=String(_8ba);
}
return _8ba;
};
SelectorBinding.prototype.setValue=function(_8bb){
this.selectByValue(String(_8bb),true);
};
SelectorBinding.prototype.getResult=function(){
var _8bc=this._selectionValue;
if(_8bc=="null"){
_8bc=null;
}
if(_8bc){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8bc=Number(_8bc);
break;
}
}
return _8bc;
};
SelectorBinding.prototype.setResult=function(_8bd){
this.selectByValue(_8bd,true);
};
SelectorBinding.prototype.validate=function(){
var _8be=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8bf=this.getValue();
if(_8bf==this.defaultSelection.value){
_8be=false;
}
if(_8be!=this._isValid){
if(_8be){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8be;
}
return _8be;
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
var _8c0=this._popupBinding;
if(!this._isUpToDate){
_8c0.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8c1,_8c2){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8c1));
return true;
};
SelectorBinding.newInstance=function(_8c3){
var _8c4=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8c3);
return UserInterface.registerBinding(_8c4,SelectorBinding);
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
var _8c7=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8c7){
this.onValueChange=function(){
Binding.evaluate(_8c7,this);
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
SimpleSelectorBinding.prototype.focus=function(_8ca){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8ca){
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
SimpleSelectorBinding.prototype._hack=function(_8cb){
if(Client.isExplorer){
this._select.style.width=_8cb?"auto":this._cachewidth+"px";
if(_8cb){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8cc=true;
if(this.isRequired){
if(this.getValue()==null){
_8cc=false;
}
}
if(_8cc!=this._isValid){
if(_8cc){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8cd=this._select;
var _8ce=_8cd.options[_8cd.selectedIndex];
var text=DOMUtil.getTextContent(_8ce);
_8cd.blur();
_8cd.style.color="#A40000";
_8cd.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8ce,DataBinding.warnings["required"]);
}
_8cd.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8ce,text);
}
};
}
this._isValid=_8cc;
}
return _8cc;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8d0=null;
var _8d1=this._select;
var _8d2=_8d1.options[_8d1.selectedIndex];
var _8d3=true;
if(Client.isExplorer){
var html=_8d2.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8d3=false;
}
}
if(_8d3){
_8d0=_8d2.getAttribute("value");
}
return _8d0;
};
SimpleSelectorBinding.prototype.setValue=function(_8d5){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8d6){
this.setValue(_8d6);
};
SimpleSelectorBinding.newInstance=function(_8d7){
var _8d8=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8d7);
return UserInterface.registerBinding(_8d8,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8d9,_8da,_8db,_8dc,_8dd){
this._init(_8d9,_8da,_8db,_8dc,_8dd);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8de,_8df,_8e0,_8e1,_8e2){
if(_8de!=null){
this.label=String(_8de);
}
if(_8df!=null){
this.value=String(_8df);
}
if(_8e1!=null){
this.imageProfile=_8e1;
}
if(_8e2!=null){
this.tooltip=_8e2;
}
this.isSelected=_8e0?true:false;
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
var _8e3=this.getProperty("image");
if(_8e3){
this.setImage(_8e3);
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
var _8e6=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8e6.popupBindingTargetElement=this.shadowTree.input;
_8e6.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8e6.attach();
var self=this;
_8e6.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8e6;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8e9=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8e9).each(function(_8ea){
if(_8ea.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8eb=_8ea.getAttribute("value");
var _8ec=_8ea.getAttribute("selected");
var _8ed=_8ea.getAttribute("tooltip");
list.add({value:_8eb?_8eb:null,toolTip:_8ed?_8ed:null,isSelected:(_8ec&&_8ec=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8ef=this._menuBodyBinding;
var _8f0=_8ef.bindingDocument;
while(_8ef.bindingElement.hasChildNodes()){
var node=_8ef.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8ef.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8f2=this.getProperty("emptyentrylabel");
if(_8f2){
var _8f3=MenuItemBinding.newInstance(_8f0);
_8f3.setLabel(_8f2);
_8f3.selectionValue="";
_8ef.add(_8f3);
}
while(list.hasNext()){
var _8f4=list.getNext();
var _8f3=MenuItemBinding.newInstance(_8f0);
_8f3.setLabel(_8f4.label?_8f4.label:_8f4.value);
_8f3.selectionValue=_8f4.value;
if(_8f4.image){
_8f3.setImage(_8f4.image);
}
if(_8f4.toolTip){
_8f3.setToolTip(_8f4.toolTip);
}
if(_8f4.isSelected){
this.select(_8f3,true);
}
_8ef.add(_8f3);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8f5){
this.select(_8f5);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8f6,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8f6,arg);
switch(_8f6){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8f6,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8f8){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8f8);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8f9){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8f9);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8fa=this.bindingElement.offsetWidth+"px";
var _8fb=this._popupBinding.bindingElement;
_8fb.style.minWidth=_8fa;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8fc=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8fd=this.getValue();
var _8fe=null;
_8fc.each(function(item){
if(item.getLabel()==_8fd){
_8fe=item;
}
});
if(_8fe){
_8fe.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_901){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_901){
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
DataInputSelectorBinding.prototype.setValue=function(_902){
var _903=this.isReadOnly;
var _904=null;
if(_902!=null&&_902!=""){
var _905=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_905.hasNext()){
var item=_905.getNext();
if(item.selectionValue==_902){
_904=item.getLabel();
break;
}
}
}
if(_904!=null){
this.value=_902;
this.shadowTree.input.value=_904;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_902);
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
var _908="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_908);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_908);
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
var _90a=ToolBarButtonBinding.newInstance(this.bindingDocument);
_90a.setImage("${icon:popup}");
this.addFirst(_90a);
_90a.attach();
var self=this;
_90a.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _90c=self.getProperty("handle");
var _90d=ViewDefinition.clone(_90c,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_90d instanceof DialogViewDefinition){
_90d.handler={handleDialogResponse:function(_90e,_90f){
self._isButtonClicked=false;
if(_90e==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _910=_90f.getFirst();
self.setValue(_910);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_90d.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_90d);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_90a.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_90a;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _912=this._dialogButtonBinding;
if(_912!=null){
_912.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _914=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_914=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _914;
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
var _917=ToolBarButtonBinding.newInstance(this.bindingDocument);
_917.setImage("${icon:editor-sourceview}");
_917.bindingElement.style.left="-24px";
_917.bindingElement.style.width="24px";
this.addFirst(_917);
_917.attach();
_917.hide();
var self=this;
_917.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_917;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_918){
UrlInputDialogBinding.superclass.setValue.call(this,_918);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_918);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _919=TreeService.GetCompositeUrlLabel(_918);
if(_919!=_918){
this.setLabel(_919);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_91a){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_91a;
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
var _91b=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _91c=this.getProperty("image");
if(_91c!=null){
_91b.setImage(_91c);
}else{
_91b.setImage("${icon:popup}");
}
this.addFirst(_91b);
_91b.attach();
var self=this;
_91b.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_91b;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _91e=this._dialogButtonBinding;
if(_91e!=null){
_91e.oncommand();
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
var _91f=this.getProperty("label");
var _920=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_91f!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_91f+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_91f);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_920!=null){
this._buttonBinding.setToolTip(_920);
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
DataDialogBinding.prototype.handleAction=function(_922){
DataDialogBinding.superclass.handleAction.call(this,_922);
var _923=_922.target;
var self=this;
switch(_922.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_925,_926){
if(_925==Dialog.RESPONSE_ACCEPT){
if(_926 instanceof DataBindingMap){
self._map=_926;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_923==this._buttonBinding){
_922.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_927,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_927,arg);
switch(_927){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _92a=this.getProperty("handle");
var url=this.getURL();
var _92c=null;
if(_92a!=null||def!=null){
if(def!=null){
_92c=def;
}else{
_92c=ViewDefinitions[_92a];
}
if(_92c instanceof DialogViewDefinition){
_92c.handler=this._handler;
if(this._map!=null){
_92c.argument=this._map;
}
StageBinding.presentViewDefinition(_92c);
}
}else{
if(url!=null){
_92c=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_92c!=null){
this._dialogViewHandle=_92c.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_92d){
this.setProperty("label",_92d);
if(this.isAttached){
this._buttonBinding.setLabel(_92d+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_92e){
this.setProperty("image",_92e);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_92e);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_92f){
this.setProperty("tooltip",_92f);
if(this.isAttached){
this._buttonBinding.setToolTip(_92f);
}
};
DataDialogBinding.prototype.setHandle=function(_930){
this.setProperty("handle",_930);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_932){
this._handler=_932;
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
DataDialogBinding.newInstance=function(_934){
var _935=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_934);
return UserInterface.registerBinding(_935,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_937,_938){
if(_937==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_938);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_939){
_939=new String(_939);
this.dirty();
this.setValue(encodeURIComponent(_939));
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
var _93d=this.getValue();
if(_93d==null){
_93d="";
}
this.shadowTree.dotnetinput.value=_93d;
};
PostBackDataDialogBinding.prototype.setValue=function(_93e){
this.setProperty("value",_93e);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_93f){
};
PostBackDataDialogBinding.newInstance=function(_940){
var _941=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_940);
return UserInterface.registerBinding(_941,PostBackDataDialogBinding);
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
var _942=this.getProperty("dialoglabel");
var _943=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _945=this.getProperty("handle");
var _946=this.getProperty("selectedtoken");
if(_945!=null){
var def=ViewDefinition.clone(_945,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_942!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_942;
}
if(_943!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_943;
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
if(_946!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_946;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_948){
var _949=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_948);
return UserInterface.registerBinding(_949,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_94b){
self._datathing.setValue(_94b);
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
var _94e=self.getValue();
if(_94e==""||_94e==null){
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
var _94f=this.getProperty("value");
var _950=this.getProperty("selectorlabel");
if(_950==null){
_950=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_94f==null));
list.add(new SelectorBindingSelection(_950+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_94f!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _94f=this.getValue();
if(_94f==""||_94f==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_952){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_952);
switch(_952.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_952.target==this._datathing){
var _953=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_953){
self._selector.setLabel(_953);
}
},500);
_952.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_955){
this.setProperty("label",_955);
if(this._selector!=null){
this._selector.setLabel(_955);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_956){
this._datathing.setValue(_956);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_957,_958){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_957,_958)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_959){
this._buttonBinding.setLabel(_959);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_95a){
this._buttonBinding.setToolTip(_95a);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_95b){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_95b);
switch(_95b.type){
case MenuItemBinding.ACTION_COMMAND:
var _95c=_95b.target;
var _95d=this.master;
if(_95c.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_95c.getLabel());
setTimeout(function(){
_95d.action();
},0);
}else{
this.master.setValue("");
}
_95d.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_95e){
var _95f=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_95e);
return UserInterface.registerBinding(_95f,NullPostBackDataDialogSelectorBinding);
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
var _960=this._dataDialogBinding;
if(_960!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_960.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _961=this.getProperty("editable");
var _962=this.getProperty("selectable");
var _963=this.getProperty("display");
if(_961!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_962){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_963){
this._display=_963;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _964=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_964.selections=this.selections;
this.add(_964);
_964.attach();
this._dataDialogBinding=_964;
this.shadowTree.datadialog=_964;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _966=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _967=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_966=_967.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_966=_967.isSelected!=true;
break;
}
if(_966){
this.shadowTree.box.appendChild(this._getElementForSelection(_967));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_969){
var box=this.shadowTree.box;
var _96b=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _96c=list.getNext();
if(_969){
_96c.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_96b=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_96b=_96c.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_96b=_96c.isSelected!=true;
break;
}
}
if(_96b){
var _96d=this._getElementForSelection(_96c);
box.insertBefore(_96d,box.firstChild);
CSSUtil.attachClassName(_96d,"selected");
this._selectionMap.set(_96c.value,_96d);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_96e){
var _96f=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_96f.appendChild(this.bindingDocument.createTextNode(_96e.label));
_96f.setAttribute("label",_96e.label);
_96f.setAttribute("value",_96e.value);
return _96f;
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
var _971=DOMEvents.getTarget(e);
var _972=DOMUtil.getLocalName(_971);
if(_972=="div"){
this._handleMouseDown(_971);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_973){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _974=this._getElements();
var _975=_973.getAttribute("value");
var _976=this._lastSelectedElement.getAttribute("value");
var _977=false;
while(_974.hasNext()){
var el=_974.getNext();
switch(el.getAttribute("value")){
case _975:
case _976:
_977=!_977;
break;
}
if(_977){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_973);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_973)){
this._unhilite(_973);
}else{
this._hilite(_973);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_973){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_973;
};
MultiSelectorBinding.prototype._hilite=function(_97b){
var _97c=_97b.getAttribute("value");
if(!this._selectionMap.has(_97c)){
CSSUtil.attachClassName(_97b,"selected");
this._selectionMap.set(_97c,_97b);
}
};
MultiSelectorBinding.prototype._unhilite=function(_97d){
var _97e=_97d.getAttribute("value");
if(this._selectionMap.has(_97e)){
CSSUtil.detachClassName(_97d,"selected");
this._selectionMap.del(_97e);
}
};
MultiSelectorBinding.prototype._isHilited=function(_97f){
return CSSUtil.hasClassName(_97f,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_980){
MultiSelectorBinding.superclass.handleAction.call(this,_980);
var _981=_980.target;
switch(_980.type){
case DataDialogBinding.ACTION_COMMAND:
if(_981==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_980.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_981.result);
this.dirty();
_981.result=null;
_980.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _982=null;
if(this.isSelectable){
_982=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_984){
if(self._isHilited(_984)){
_984.parentNode.removeChild(_984);
_982.add(new SelectorBindingSelection(_984.getAttribute("label"),_984.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _982;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _986=this._getElements();
if(!isUp){
_986.reverse();
}
var _987=true;
while(_987&&_986.hasNext()){
var _988=_986.getNext();
if(this._isHilited(_988)){
switch(isUp){
case true:
if(_988.previousSibling){
_988.parentNode.insertBefore(_988,_988.previousSibling);
}else{
_987=false;
}
break;
case false:
if(_988.nextSibling){
_988.parentNode.insertBefore(_988,_988.nextSibling.nextSibling);
}else{
_987=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _989=new List();
var _98a=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_98c){
var _98d=new SelectorBindingSelection(_98c.getAttribute("label"),_98c.getAttribute("value"),_98a);
_98d.isHighlighted=self._isHilited(_98c);
_989.add(_98d);
});
return _989;
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
var _98e=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_98e.hasEntries()){
_98e.each(function(_98f){
_98f.parentNode.removeChild(_98f);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _990=this.selections.getNext();
if(_990.isSelected){
var _991=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_991.name=this._name;
_991.value=_990.value;
this.bindingElement.appendChild(_991);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_992){
alert(_992);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_993){
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
var _994={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _995=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_995.handler=this._handler;
_995.argument=_994;
StageBinding.presentViewDefinition(_995);
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
var _996={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _998={handleDialogResponse:function(_999,_99a){
if(_999==Dialog.RESPONSE_ACCEPT){
self.result=_99a;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _99b=ViewDefinitions[this._dialogViewHandle];
_99b.handler=_998;
_99b.argument=_996;
StageBinding.presentViewDefinition(_99b);
};
MultiSelectorDataDialogBinding.newInstance=function(_99c){
var _99d=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_99c);
return UserInterface.registerBinding(_99d,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_99e){
var id=_99e.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9a0=_99e.bindingDocument.getElementById(id);
if(_9a0!=null){
var _9a1=UserInterface.getBinding(_9a0);
_9a1.setResult(true);
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
var _9a3=this.bindingDocument.getElementById(id);
if(_9a3!=null){
var _9a4=UserInterface.getBinding(_9a3);
if(_9a4&&!_9a4.isAttached){
_9a4.isLazy=true;
}else{
_9a3.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9a5){
this._isLazy=_9a5;
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
var _9a7=this.getProperty("stateprovider");
var _9a8=this.getProperty("handle");
if(_9a7!=null&&_9a8!=null){
url=url.replace("${stateprovider}",_9a7).replace("${handle}",_9a8);
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
EditorDataBinding.prototype._onPageInitialize=function(_9a9){
EditorDataBinding.superclass._onPageInitialize.call(this,_9a9);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9aa){
EditorDataBinding.superclass.handleAction.call(this,_9aa);
switch(_9aa.type){
case Binding.ACTION_DIRTY:
if(_9aa.target!=this){
if(!this.isDirty){
this.dirty();
}
_9aa.consume();
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
EditorDataBinding.prototype.setValue=function(_9ab){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9ac){
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
var _9b1=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9b1=fake.getValue()!="";
}
if(!_9b1&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9b1&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9b1;
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
var _9b5=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9b5!=null){
_9b5.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9b6){
_9b6=_9b6!=null?_9b6:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9b6;
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
var _9b7=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9b8=_9b7.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9b8;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9b8=_9b8.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9b8;
}
var self=this;
var _9ba=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9ba.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9bd=this.getProperty("label");
if(_9bd){
this.setLabel(_9bd);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9be){
this.setProperty("label",_9be);
if(this.shadowTree.labelBinding==null){
var _9bf=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9bf.attachClassName("fieldgrouplabel");
cell.insertBefore(_9bf.bindingElement,cell.getElementsByTagName("div").item(1));
_9bf.attach();
this.shadowTree.labelBinding=_9bf;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9be));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9c1){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9c1.bindingElement);
return _9c1;
};
FieldGroupBinding.prototype.addFirst=function(_9c2){
var _9c3=this.shadowTree[FieldGroupBinding.CENTER];
_9c3.insertBefore(_9c2.bindingElement,_9c3.firstChild);
return _9c2;
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
var _9c4=this.getProperty("relation");
if(_9c4!=null){
this.bindingRelation=_9c4;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9c5,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9c5,arg);
switch(_9c5){
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
FieldBinding.newInstance=function(_9c7){
var _9c8=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9c7);
return UserInterface.registerBinding(_9c8,FieldBinding);
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
var _9c9=this.getDescendantBindingByLocalName("fieldgroup");
if(_9c9!=null){
_9c9.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9ca=true;
var _9cb=this.getDescendantBindingsByLocalName("*");
while(_9cb.hasNext()){
var _9cc=_9cb.getNext();
if(Interfaces.isImplemented(IData,_9cc)){
var _9cd=_9cc.validate();
if(_9ca&&!_9cd){
_9ca=false;
}
}
}
return _9ca;
};
FieldsBinding.prototype.handleAction=function(_9ce){
FieldsBinding.superclass.handleAction.call(this,_9ce);
var _9cf=_9ce.target;
if(_9cf!=this){
switch(_9ce.type){
case Binding.ACTION_INVALID:
var _9d0=DataBinding.getAssociatedLabel(_9cf);
if(_9d0){
this._invalidFieldLabels.set(_9cf.key,_9d0);
}
if(_9cf.error){
if(!_9cf.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9cf.error},_9cf);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9ce.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9cf.key)){
this._invalidFieldLabels.del(_9cf.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9ce.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9d1=null;
if(this._invalidFieldLabels.hasEntries()){
_9d1=this._invalidFieldLabels.toList();
}
return _9d1;
};
FieldsBinding.newInstance=function(_9d2){
var _9d3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9d2);
return UserInterface.registerBinding(_9d3,FieldsBinding);
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
var _9d4=this.getProperty("image");
if(_9d4){
this.setImage(_9d4);
}
var _9d5=this.getProperty("tooltip");
if(_9d5){
this.setToolTip(_9d5);
}
var _9d6=this.getProperty("label");
if(_9d6){
this.setLabel(_9d6);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9d8=this.getAncestorBindingByLocalName("field");
if(_9d8){
var _9d9=true;
_9d8.getDescendantBindingsByLocalName("*").each(function(_9da){
if(Interfaces.isImplemented(IData,_9da)){
_9da.focus();
_9d9=false;
}
return _9d9;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9db){
this.setProperty("label",_9db);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9db);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9dc=this.getProperty("label");
if(!_9dc){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9dc=node.data;
}
}
return _9dc;
};
FieldDescBinding.prototype.setImage=function(_9de){
this.setProperty("image",_9de);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9df){
this.setProperty("tooltip",_9df);
if(this.isAttached){
this.bindingElement.title=_9df;
}
};
FieldDescBinding.newInstance=function(_9e0){
var _9e1=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9e0);
return UserInterface.registerBinding(_9e1,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9e2){
var _9e3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9e2);
return UserInterface.registerBinding(_9e3,FieldDataBinding);
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
var _9e4=this._fieldHelpPopupBinding;
if(_9e4){
_9e4.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9e5=app.bindingMap.fieldhelpopupset;
var doc=_9e5.bindingDocument;
var _9e7=_9e5.add(PopupBinding.newInstance(doc));
var _9e8=_9e7.add(PopupBodyBinding.newInstance(doc));
_9e7.position=PopupBinding.POSITION_RIGHT;
_9e7.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9e8.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9e9=this.getProperty("label");
if(_9e9){
_9e8.bindingElement.innerHTML=Resolver.resolve(_9e9);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9e7;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9ea=this.getAncestorBindingByLocalName("field");
if(_9ea){
_9ea.attachClassName("fieldhelp");
var _9eb=ClickButtonBinding.newInstance(this.bindingDocument);
_9eb.attachClassName("fieldhelp");
_9eb.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9eb);
_9eb.attach();
var self=this;
_9eb.oncommand=function(){
self.attachPopupBinding();
};
_9eb.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9eb;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9ed=this._fieldHelpPopupBinding;
if(_9ed&&!_9ed.isAttached){
_9ed.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9ef){
RadioDataGroupBinding.superclass.handleAction.call(this,_9ef);
switch(_9ef.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9f1,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9f1,arg);
switch(_9f1){
case BroadcastMessages.KEY_ARROW:
var _9f3=null;
var next=null;
var _9f5=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9f5=this.getChildBindingsByLocalName("radio");
while(!_9f3&&_9f5.hasNext()){
var _9f6=_9f5.getNext();
if(_9f6.getProperty("ischecked")){
_9f3=_9f6;
}
}
break;
}
if(_9f3){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9f5.getFollowing(_9f3);
while(next!=null&&next.isDisabled){
next=_9f5.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9f5.getPreceding(_9f3);
while(next!=null&&next.isDisabled){
next=_9f5.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9f7){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9f7){
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
var _9f8=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9f8.type="hidden";
_9f8.name=this._name;
this.bindingElement.appendChild(_9f8);
this.shadowTree.input=_9f8;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9f9=null;
var _9fa=this.getChildBindingsByLocalName("radio");
while(!_9f9&&_9fa.hasNext()){
var _9fb=_9fa.getNext();
if(_9fb.isChecked){
_9f9=_9fb.getProperty("value");
}
}
return _9f9;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9fc){
};
RadioDataGroupBinding.prototype.setResult=function(_9fd){
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
this.propertyMethodMap["checked"]=function(_9fe){
if(_9fe!=this.isChecked){
this.setChecked(_9fe,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9ff=this.getProperty("ischecked");
if(_9ff!=this.isChecked){
this.setChecked(_9ff,true);
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
var _a00=this.getProperty("relate");
var _a01=this.getProperty("oncommand");
var _a02=this.getProperty("isdisabled");
if(_a00){
this.bindingRelate=_a00;
this.relate();
}
if(_a01){
this.oncommand=function(){
Binding.evaluate(_a01,this);
};
}
if(_a02==true){
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
var _a04=this.getCallBackID();
this._buttonBinding.check=function(_a05){
RadioButtonBinding.prototype.check.call(this,_a05);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a06){
RadioButtonBinding.prototype.uncheck.call(this,_a06);
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
RadioDataBinding.prototype.setChecked=function(_a07,_a08){
this._buttonBinding.setChecked(_a07,_a08);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a07);
};
RadioDataBinding.prototype.check=function(_a09){
this.setChecked(true,_a09);
};
RadioDataBinding.prototype.uncheck=function(_a0a){
this.setChecked(false,_a0a);
};
RadioDataBinding.prototype.setDisabled=function(_a0b){
if(_a0b!=this.isDisabled){
this.isDisabled=_a0b;
this._buttonBinding.setDisabled(_a0b);
if(_a0b){
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
var _a0d=DOMEvents.getTarget(e);
switch(_a0d){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a0e=this.getProperty("label");
if(_a0e){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a0e)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a0f){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a0f;
}
this.setProperty("label",_a0f);
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
this.propertyMethodMap["checked"]=function(_a10){
if(_a10!=this.isChecked){
this.setChecked(_a10,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a11=this.getProperty("ischecked");
if(_a11!=this.isChecked){
this.setChecked(_a11,true);
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
var _a13=DOMEvents.getTarget(e);
switch(_a13){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a14,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a14,arg);
switch(_a14){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a17){
_a17.consume();
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
var _a19=this.getCallBackID();
this._buttonBinding.check=function(_a1a){
ButtonBinding.prototype.check.call(this,_a1a);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a1a){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a1b){
ButtonBinding.prototype.uncheck.call(this,_a1b);
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
if(_a19!=null){
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
var _a1c=true;
var _a1d=this.bindingElement.parentNode;
if(_a1d){
var _a1e=UserInterface.getBinding(_a1d);
if(_a1e&&_a1e instanceof CheckBoxGroupBinding){
if(_a1e.isRequired){
if(_a1e.isValid){
_a1c=_a1e.validate();
}else{
_a1c=false;
}
}
}
}
return _a1c;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a1f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a1f.type="hidden";
_a1f.name=this._name;
_a1f.style.display="none";
this.bindingElement.appendChild(_a1f);
this.shadowTree.input=_a1f;
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
var _a20=null;
var _a21=this.getProperty("value");
if(this.isChecked){
_a20=_a21?_a21:"on";
}
return _a20;
};
CheckBoxBinding.prototype.setValue=function(_a22){
if(_a22==this.getValue()||_a22=="on"){
this.check(true);
}else{
if(_a22!="on"){
this.setPropety("value",_a22);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a23=false;
if(this.isChecked){
_a23=this._result!=null?this._result:true;
}
return _a23;
};
CheckBoxBinding.prototype.setResult=function(_a24){
if(typeof _a24=="boolean"){
this.setChecked(_a24,true);
}else{
this._result=_a24;
}
};
CheckBoxBinding.newInstance=function(_a25){
var _a26=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a25);
return UserInterface.registerBinding(_a26,CheckBoxBinding);
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
var _a27=true;
if(this.isRequired){
var _a28=this.getDescendantBindingsByLocalName("checkbox");
if(_a28.hasEntries()){
_a27=false;
while(_a28.hasNext()&&!_a27){
if(_a28.getNext().isChecked){
_a27=true;
}
}
}
if(_a27==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a27;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a29){
if(_a29){
if(!this._labelBinding){
var _a2a=LabelBinding.newInstance(this.bindingDocument);
_a2a.attachClassName("invalid");
_a2a.setImage("${icon:error}");
_a2a.setLabel("Selection required");
this._labelBinding=this.addFirst(_a2a);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a2b){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a2b);
switch(_a2b.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a2c){
var _a2d=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a2c);
return UserInterface.registerBinding(_a2d,CheckBoxGroupBinding);
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
var _a2e=DialogControlBinding.newInstance(this.bindingDocument);
_a2e.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a2e);
this._controlGroupBinding.attachRecursive();
var _a2f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a2f);
var _a30=this.getLabel();
if(_a30!=null){
this.setLabel(_a30);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a31=this._snapTargetBinding;
if(Binding.exists(_a31)==true){
_a31.removeActionListener(Binding.ACTION_BLURRED,this);
_a31.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a32){
if(Interfaces.isImplemented(IData,_a32)){
this._snapTargetBinding=_a32;
var _a33=_a32.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a33&&_a33.isConsumed){
this._environmentBinding=_a33.listener;
}
if(this._environmentBinding){
_a32.addActionListener(Binding.ACTION_BLURRED,this);
_a32.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a32)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a32.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a35=this._snapTargetBinding;
var _a36=this._environmentBinding;
var root=UserInterface.getBinding(_a35.bindingDocument.body);
if(Binding.exists(_a35)&&Binding.exists(_a36)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a35.isAttached&&_a36.isAttached){
var _a38=_a35.boxObject.getUniversalPosition();
var _a39=_a36.boxObject.getUniversalPosition();
_a39.y+=_a36.bindingElement.scrollTop;
_a39.x+=_a36.bindingElement.scrollLeft;
var tDim=_a35.boxObject.getDimension();
var eDim=_a36.boxObject.getDimension();
var _a3c=false;
if(_a38.y+tDim.h<_a39.y){
_a3c=true;
}else{
if(_a38.x+tDim.w<_a39.x){
_a3c=true;
}else{
if(_a38.y>_a39.y+eDim.h){
_a3c=true;
}else{
if(_a38.x>_a39.x+eDim.w){
_a3c=true;
}
}
}
}
if(!_a3c){
this._setComputedPosition(_a38,_a39,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a3d,_a3e,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a43=_a3d;
var _a44=false;
if(_a3d.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a44=true;
}else{
if(_a3d.x+tDim.w>=_a3e.x+eDim.w){
_a44=true;
}
}
if(_a44){
_a43.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a43.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a43.y-=(bDim.h);
_a43.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a43);
};
BalloonBinding.prototype.handleBroadcast=function(_a45,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a45,arg);
switch(_a45){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a47){
var _a48=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a47){
_a48=true;
}
}
return _a48;
};
BalloonBinding.prototype._setPosition=function(_a4a){
var _a4b=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a4b=true;
}
}
if(!_a4b){
this.bindingElement.style.left=_a4a.x+"px";
this.bindingElement.style.top=_a4a.y+"px";
this._point=_a4a;
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
BalloonBinding.prototype.handleAction=function(_a4d){
BalloonBinding.superclass.handleAction.call(this,_a4d);
var _a4e=_a4d.target;
switch(_a4d.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a4d.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a4e==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a4e)){
self.dispose();
}else{
if(_a4e.validate()){
var _a50=true;
if(_a4d.type==Binding.ACTION_BLURRED){
var root=_a4e.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a50=false;
}
}
if(_a50){
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
BalloonBinding.prototype.setLabel=function(_a53){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a54=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a53);
_a54.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a54);
}
this.setProperty("label",_a53);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a56){
var _a57=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a56);
var _a58=UserInterface.registerBinding(_a57,BalloonBinding);
_a58.hide();
return _a58;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a59,_a5a){
if(Interfaces.isImplemented(IData,_a5a)==true){
var _a5b,_a5c=_a5a.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a5c&&_a5c.isConsumed){
switch(_a5c.listener.constructor){
case StageBinding:
_a5b=false;
break;
case StageDialogBinding:
_a5b=true;
break;
}
}
var _a5d=_a5b?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a5e=_a5d.add(BalloonBinding.newInstance(top.app.document));
_a5e.setLabel(_a59.text);
_a5e.snapTo(_a5a);
_a5e.attach();
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
var _a5f=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a62=_a5f.getDataBinding(name);
if(_a62){
ErrorBinding.presentError({text:text},_a62);
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
FocusBinding.focusElement=function(_a63){
var _a64=true;
try{
_a63.focus();
Application.focused(true);
}
catch(exception){
var _a65=UserInterface.getBinding(_a63);
var _a66=SystemLogger.getLogger("FocusBinding.focusElement");
_a66.warn("Could not focus "+(_a65?_a65.toString():String(_a63)));
_a64=false;
}
return _a64;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a67){
var win=_a67.bindingWindow;
var id=_a67.bindingElement.id;
return {getBinding:function(){
var _a6a=null;
try{
if(Binding.exists(_a67)){
_a6a=win.bindingMap[id];
}
}
catch(exception){
}
return _a6a;
}};
};
FocusBinding.navigateNext=function(_a6b){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a6b);
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
var _a6c=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a6c&&_a6c.isConsumed){
if(_a6c.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a6d){
FocusBinding.superclass.handleAction.call(this,_a6d);
var _a6e=_a6d.target;
var _a6f=null;
if(this._isFocusManager){
switch(_a6d.type){
case FocusBinding.ACTION_ATTACHED:
if(_a6e!=this){
this._isUpToDate=false;
}
_a6d.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a6e!=this){
this._isUpToDate=false;
_a6d.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a6f=new FocusCrawler();
_a6f.mode=FocusCrawler.MODE_BLUR;
_a6f.crawl(_a6e.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a6d.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a6e!=this){
_a6f=new FocusCrawler();
_a6f.mode=FocusCrawler.MODE_FOCUS;
_a6f.crawl(_a6e.bindingElement);
}
_a6d.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a6e)){
this.claimFocus();
this._onFocusableFocused(_a6e);
}
_a6d.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a6e)){
this._onFocusableBlurred(_a6e);
}
_a6d.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a70){
var _a71=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a71==null&&list.hasNext()){
var _a73=list.getNext();
if(this._cachedFocus&&_a73==this._cachedFocus.getBinding()){
_a71=_a73;
}
}
if(_a71!=null){
if(_a73.isFocused){
var next=_a70?list.getPreceding(_a71):list.getFollowing(_a71);
if(!next){
next=_a70?list.getLast():list.getFirst();
}
next.focus();
}else{
_a71.focus();
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
var _a75=new FocusCrawler();
var list=new List();
_a75.mode=FocusCrawler.MODE_INDEX;
_a75.crawl(this.bindingElement,list);
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
var _a78=this._cachedFocus.getBinding();
if(_a78&&!_a78.isFocused){
_a78.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a79){
if(_a79!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a79;
_a79.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a79);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a7a){
_a7a.deleteProperty(FocusBinding.MARKER);
if(_a7a==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a7c){
this.bindingElement.style.left=_a7c+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a7d){
this.hiddenTabBindings.add(_a7d);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a7e=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a7e.getLabel());
item.setImage(_a7e.getImage());
item.associatedTabBinding=_a7e;
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
TabsButtonBinding.prototype.handleAction=function(_a81){
TabsButtonBinding.superclass.handleAction.call(this,_a81);
switch(_a81.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a82=this.selectedTabBinding;
if(_a82){
this.containingTabBoxBinding.moveToOrdinalPosition(_a82,0);
this.containingTabBoxBinding.select(_a82);
}
_a81.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a83){
var _a84=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a83);
_a84.setAttribute("type","checkbox");
_a84.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a84.className="tabbutton";
return UserInterface.registerBinding(_a84,TabsButtonBinding);
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
var _a85=TabBoxBinding.currentActiveInstance;
if(_a85!=null&&Binding.exists(_a85)){
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
var _a86=this.getTabElements().getLength();
var _a87=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a86!=_a87){
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
var _a88=this.getTabPanelElements();
while(_a88.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a88.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a89=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a8a=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a8b=_a89>_a8a?"tabsbelow":"tabsontop";
this.attachClassName(_a8b);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a8d=this.getTabPanelElements();
var _a8e=null;
var _a8f=this.getProperty("selectedindex");
if(_a8f!=null){
if(_a8f>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a90=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a92=_a8d.getNext();
this.registerTabBoxPair(tab,_a92);
if(_a8f&&_a90==_a8f){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a8e=tab;
}
}
_a90++;
}
if(!_a8e){
_a8e=tabs.getFirst();
_a8e.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a93){
var _a94=null;
var _a95=null;
if(this.isEqualSize){
var _a96=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a98=this.getTabPanelElements();
_a98.each(function(_a99){
max=_a99.offsetHeight>max?_a99.offsetHeight:max;
});
_a95=max+_a96.top+_a96.bottom;
if(_a93&&this._tabPanelsElement.style.height!=null){
_a94=this._tabPanelsElement.offsetHeight;
}
if(_a94!=null||_a95>_a94){
this._tabPanelsElement.style.height=_a95+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a9a){
_a9a._invalidCount=0;
_a9a.addActionListener(Binding.ACTION_INVALID,this);
_a9a.addActionListener(Binding.ACTION_VALID,this);
_a9a.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a9b){
TabBoxBinding.superclass.handleAction.call(this,_a9b);
var _a9c=_a9b.target;
var _a9d=_a9b.listener;
switch(_a9b.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a9c.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a9b.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a9c.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a9d._invalidCount++;
if(_a9d._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a9d.isSelected){
self._showWarning(_a9d,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a9d._invalidCount>0){
_a9d._invalidCount--;
if(_a9d._invalidCount==0){
if(_a9d.isSelected){
this._showWarning(_a9d,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a9d,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a9b._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a9b._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _aa0=DOMEvents.getTarget(e);
if(_aa0==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _aa2=this.getTabPanelElements();
tabs.each(function(tab,_aa4){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _aa5=_aa2.get(_aa4);
this.registerTabBoxPair(tab,_aa5);
}
},this);
var _aa6=this._tabBoxPairs;
for(var key in _aa6){
var tab=_aa6[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_aa0);
switch(_aa0.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _aaa=_aa0.parentNode;
if(_aaa==this._tabsElement||_aaa==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_aa0==this._tabsElement||_aa0==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_aac){
var _aad=this.getBindingForArgument(arg);
if(_aad!=null&&!_aad.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_aad.select(_aac);
this.getTabPanelBinding(_aad).select(_aac);
var _aae=this.getProperty("selectedindex");
if(_aae!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_aad.bindingElement,true));
}
this._selectedTabBinding=_aad;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_aad.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _aaf=this.getTabPanelBinding(_aad);
this._showBalloon(_aaf,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ab1){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ab1.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ab1};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ab5){
var _ab6=null;
try{
var key=_ab5.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ab8=this._tabBoxPairs[key].tabPanel;
_ab6=UserInterface.getBinding(_ab8);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ab6;
};
TabBoxBinding.prototype.getTabBinding=function(_ab9){
var key=_ab9.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _abb=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_abb);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _abc=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_abc);
return _abc;
};
TabBoxBinding.prototype.appendTabByBindings=function(_abd,_abe){
var _abf=_abd.bindingElement;
_abd.setProperty("selected",true);
var _ac0=this.summonTabPanelBinding();
var _ac1=_ac0.bindingElement;
if(_abe){
_ac1.appendChild(_abe instanceof Binding?_abe.bindingElement:_abe);
}
this.registerTabBoxPair(_abf,_ac1);
UserInterface.getBinding(this._tabsElement).add(_abd);
this._tabPanelsElement.appendChild(_ac1);
_abd.attach();
UserInterface.getBinding(_ac1).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _abd;
};
TabBoxBinding.prototype.importTabBinding=function(_ac2){
var that=_ac2.containingTabBoxBinding;
var _ac4=that.getTabPanelBinding(_ac2);
var _ac5=_ac4.getBindingElement();
var _ac6=_ac2.getBindingElement();
that.dismissTabBinding(_ac2);
this._tabsElement.appendChild(_ac6);
this._tabPanelsElement.appendChild(_ac5);
this.registerTabBoxPair(_ac6,_ac5);
_ac2.containingTabBoxBinding=this;
this.select(_ac2);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ac7){
var _ac8=null;
if(_ac7.isSelected){
_ac8=this.getBestTab(_ac7);
this._selectedTabBinding=null;
}
var _ac9=this.getTabPanelBinding(_ac7);
this.unRegisterTabBoxPair(_ac7.bindingElement);
_ac7.dispose();
_ac9.dispose();
if(_ac8!=null){
this.select(_ac8);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_aca){
if(_aca.isSelected){
this.selectBestTab(_aca);
}
};
TabBoxBinding.prototype.selectBestTab=function(_acb){
var _acc=this.getBestTab(_acb);
if(_acc){
this.select(_acc);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_acd){
var _ace=null;
var _acf=_acd.getOrdinalPosition(true);
var _ad0=this.getTabBindings();
var _ad1=_ad0.getLength();
var _ad2=_ad1-1;
if(_ad1==1){
_ace=null;
}else{
if(_acf==_ad2){
_ace=_ad0.get(_acf-1);
}else{
_ace=_ad0.get(_acf+1);
}
}
return _ace;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ad3,_ad4){
var _ad5=this.bindingDocument.getElementById(_ad3.bindingElement.id);
var tab=this.getTabElements().get(_ad4);
this._tabsElement.insertBefore(_ad5,tab);
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
var _ad7=this._nodename_tab;
var _ad8=new List(this._tabsElement.childNodes);
var _ad9=new List();
while(_ad8.hasNext()){
var _ada=_ad8.getNext();
if(_ada.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ada)==_ad7){
_ad9.add(_ada);
}
}
return _ad9;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _adb=this._nodename_tabpanel;
var _adc=new List(this._tabPanelsElement.childNodes);
var _add=new List();
_adc.each(function(_ade){
if(_ade.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ade)==_adb){
_add.add(_ade);
}
});
return _add;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _adf=new List();
var _ae0=this.getTabElements();
_ae0.each(function(_ae1){
_adf.add(UserInterface.getBinding(_ae1));
});
return _adf;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _ae2=new List();
this.getTabPanelElements().each(function(_ae3){
_ae2.add(UserInterface.getBinding(_ae3));
});
return _ae2;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _ae4=null;
if(this._selectedTabBinding){
_ae4=this.getTabPanelBinding(this._selectedTabBinding);
}
return _ae4;
};
TabBoxBinding.prototype._showWarning=function(_ae5,_ae6){
var _ae7=this.getTabBinding(_ae5);
if(_ae6){
if(_ae7.labelBinding.hasImage){
_ae7._backupImage=_ae7.getImage();
}
_ae7.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ae7._backupImage){
_ae7.setImage(_ae7._backupImage);
}else{
_ae7.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ae8,_ae9){
var _aea=this.getTabBinding(_ae8);
if((_ae9&&!_aea.isSelected)||!_ae9){
if(_aea.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ae9){
if(_aea.labelBinding.hasImage){
_aea._backupImage=_aea.getImage();
}
_aea.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_aea._backupImage!=null){
_aea.setImage(_aea._backupImage);
}else{
_aea.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_aeb){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _aee=tab.getOrdinalPosition(true);
var next=null;
var _af0=new List();
tabs.each(function(t){
if(t.isVisible){
_af0.add(t);
}
});
if(_af0.getLength()>1){
if(_aee==0&&!_aeb){
next=_af0.getLast();
}else{
if(_aee==_af0.getLength()-1&&_aeb){
next=_af0.getFirst();
}else{
if(_aeb){
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
var _af3=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_af3.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_af4){
TabsBinding.superclass.handleAction.call(this,_af4);
switch(_af4.type){
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
var _af7=self.bindingElement.offsetWidth;
if(_af7!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_af7;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_af8){
if(_af8 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_af8);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _af9=false;
var _afa,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _afd=this.constructor.TABBUTTON_IMPLEMENTATION;
var _afe=this.bindingElement.offsetWidth-_afd.RESERVED_SPACE;
var _aff=null;
var sum=0,_b01=0;
var _b02=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b02){
tab=tabs.getNext();
_afa=UserInterface.getBinding(tab);
if(!_aff){
_aff=_afa;
}
sum+=tab.offsetWidth;
if(sum>=_afe){
_af9=true;
if(_afa.isSelected){
if(!DOMUtil.isFirstElement(_afa.bindingElement,true)){
this.isManaging=false;
if(_aff){
_aff.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_afa,_b01-1);
_b02=false;
}
}else{
_afa.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_afa);
}
}else{
_afa.show();
_aff=_afa;
_b01++;
}
}
if(_b02){
if(_af9&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b03=_aff.getBindingElement();
var _b04=_b03.offsetLeft+_b03.offsetWidth;
var _b05=this.tabsButtonBinding;
setTimeout(function(){
_b05.show(_b04+4);
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
var _b06=TabBinding.superclass.serialize.call(this);
if(_b06){
_b06.label=this.getLabel();
_b06.image=this.getImage();
_b06.tooltip=this.getToolTip();
}
return _b06;
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
var _b07=this.bindingElement.getAttribute("image");
var _b08=this.bindingElement.getAttribute("label");
var _b09=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b08){
this.setLabel(_b08);
}
if(_b07){
this.setImage(_b07);
}
if(_b09){
this.setToolTip(_b09);
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
TabBinding.prototype.setLabel=function(_b0b){
if(_b0b!=null){
this.setProperty("label",_b0b);
if(this.isAttached){
this.labelBinding.setLabel(_b0b);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b0c){
if(_b0c){
this.setProperty("tooltip",_b0c);
if(this.isAttached){
this.labelBinding.setToolTip(_b0c);
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
var _b0e=false;
if(Client.isMozilla==true){
}
if(!_b0e){
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
TabBinding.prototype.select=function(_b0f){
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
TabBinding.newInstance=function(_b10){
var _b11=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b10);
return UserInterface.registerBinding(_b11,TabBinding);
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
var _b12=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b12=true;
this._lastKnownDimension=dim1;
}
return _b12;
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
TabPanelBinding.prototype.select=function(_b15){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b15!=true){
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
TabPanelBinding.prototype.handleAction=function(_b16){
TabPanelBinding.superclass.handleAction.call(this,_b16);
var _b17=_b16.target;
switch(_b16.type){
case BalloonBinding.ACTION_INITIALIZE:
_b16.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b18){
var _b19=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b18);
UserInterface.registerBinding(_b19,TabPanelBinding);
return UserInterface.getBinding(_b19);
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
var _b1a=SplitBoxBinding.superclass.serialize.call(this);
if(_b1a){
_b1a.orient=this.getOrient();
_b1a.layout=this.getLayout();
}
return _b1a;
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
var _b1b=this.getSplitPanelElements();
if(_b1b.hasEntries()){
var _b1c=new List(this.getLayout().split(":"));
if(_b1c.getLength()!=_b1b.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b1b.each(function(_b1d){
_b1d.setAttribute("ratio",_b1c.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b1e=this.getProperty("orient");
if(_b1e){
this._orient=_b1e;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b1f=this.getSplitterBindings();
while(_b1f.hasNext()){
var _b20=_b1f.getNext();
if(_b20&&_b20.getProperty("collapsed")==true){
_b20.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b21){
SplitBoxBinding.superclass.handleAction.call(this,_b21);
switch(_b21.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b21.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b21.target);
_b21.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b21.target);
_b21.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b22){
this._getSplitPanelBindingForSplitter(_b22).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b23){
this._getSplitPanelBindingForSplitter(_b23).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b24){
var _b25=DOMUtil.getOrdinalPosition(_b24.bindingElement,true);
var _b26,_b27=this.getSplitPanelElements();
switch(_b24.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b26=_b27.get(_b25);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b26=_b27.get(_b25+1);
break;
}
return UserInterface.getBinding(_b26);
};
SplitBoxBinding.prototype.invokeLayout=function(_b28){
var _b29=this.isHorizontalOrient();
var _b2a=this.getSplitPanelBindings();
var _b2b=this.getSplitterBindings();
var _b2c=new List();
var _b2d,sum=0;
var _b2f=0;
_b2a.each(function(_b30){
if(_b30.isFixed==true){
if(!_b2a.hasNext()){
_b2f+=_b30.getFix();
}
_b2c.add(0);
sum+=0;
}else{
_b2d=_b30.getRatio();
_b2c.add(_b2d);
sum+=_b2d;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b2c.getLength()!=_b2a.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b31=_b29?this.getInnerWidth():this.getInnerHeight();
_b31-=_b2f;
_b2b.each(function(_b32){
if(_b32.isVisible){
_b31-=SplitterBinding.DIMENSION;
}
});
var unit=_b31/sum;
var _b34=0;
var self=this;
_b2a.each(function(_b36){
var span=0;
var _b38=_b2c.getNext();
if(_b36.isFixed){
span=_b36.getFix();
}else{
span=Math.round(unit*_b38);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b34+=span;
while(_b34>_b31){
_b34--;
span--;
}
if(!_b36.isFixed){
if(_b29){
_b36.setWidth(span);
}else{
_b36.setHeight(span);
}
}
});
}
if(_b28!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b39=this.getLayout();
if(_b39){
this.setProperty("layout",_b39);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b3a=this.isHorizontalOrient();
var _b3b=this.getSplitPanelBindings();
var _b3c=this.getSplitterBindings();
var _b3d=null;
var _b3e=null;
var unit=null;
var _b40=null;
var span=null;
_b3b.each(function(_b42){
if(!unit){
unit=_b3a?_b42.getWidth():_b42.getHeight();
}
span=_b3a?_b42.getWidth():_b42.getHeight();
if(_b40){
span-=_b40;
_b40=null;
}
_b3d=_b3c.getNext();
if(_b3d&&_b3d.offset){
_b40=_b3d.offset;
span+=_b40;
}
_b42.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b43){
this.logger.debug(_b43);
this.setProperty("layout",_b43);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b44="",_b45=this.getSplitPanelBindings();
_b45.each(function(_b46){
_b44+=_b46.getRatio().toString();
_b44+=_b45.hasNext()?":":"";
});
this.setProperty("layout",_b44);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b47=this.getSplitPanelElements();
_b47.each(function(_b48){
layout+="1"+(_b47.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b49){
this.bindingElement.style.width=_b49+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b4a){
this.bindingElement.style.height=_b4a+"px";
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
SplitBoxBinding.prototype.fit=function(_b4b){
if(!this.isFit||_b4b){
if(this.isHorizontalOrient()){
var max=0;
var _b4d=this.getSplitPanelBindings();
_b4d.each(function(_b4e){
var _b4f=_b4e.bindingElement.offsetHeight;
max=_b4f>max?_b4f:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b50){
var _b51=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b50);
return UserInterface.registerBinding(_b51,SplitBoxBinding);
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
var _b54=this.getProperty("hidden");
if(_b54){
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
var _b55=this.getProperty("ratiocache");
if(_b55){
this.setRatio(_b55);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b56){
if(!this.isFixed){
if(_b56!=this.getWidth()){
if(_b56<0){
_b56=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b56+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b56);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b57=null;
if(this.isFixed){
_b57=this.getFix();
}else{
_b57=this.bindingElement.offsetWidth;
}
return _b57;
};
SplitPanelBinding.prototype.setHeight=function(_b58){
if(!this.isFixed){
if(_b58!=this.getHeight()){
try{
this.bindingElement.style.height=_b58+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b59=null;
if(this.isFixed){
_b59=this.getFix();
}else{
_b59=this.bindingElement.offsetHeight;
}
return _b59;
};
SplitPanelBinding.prototype.setRatio=function(_b5a){
this.setProperty("ratio",_b5a);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b5b){
if(_b5b){
this._fixedSpan=_b5b;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b5b);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b5b);
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
SplitPanelBinding.newInstance=function(_b5c){
var _b5d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b5c);
return UserInterface.registerBinding(_b5d,SplitPanelBinding);
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
var _b5e=SplitBoxBinding.superclass.serialize.call(this);
if(_b5e){
_b5e.collapse=this.getProperty("collapse");
_b5e.collapsed=this.getProperty("collapsed");
_b5e.disabled=this.getProperty("isdisabled");
}
return _b5e;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b5f=this.getProperty("hidden");
if(_b5f){
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
SplitterBinding.prototype.setCollapseDirection=function(_b61){
this.setProperty("collapse",_b61);
this._collapseDirection=_b61;
};
SplitterBinding.prototype.handleAction=function(_b62){
SplitterBinding.superclass.handleAction.call(this,_b62);
switch(_b62.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b62.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b64=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b64.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b64.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b65){
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
SplitterBinding.newInstance=function(_b70){
var _b71=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b70);
return UserInterface.registerBinding(_b71,SplitterBinding);
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
var _b72=this.getProperty("selectedindex");
var _b73=this.getDeckElements();
if(_b73.hasEntries()){
var _b74=false;
var _b75=0;
while(_b73.hasNext()){
var deck=_b73.getNext();
if(_b72&&_b75==_b72){
deck.setAttribute("selected","true");
_b74=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b74=true;
}
}
_b75++;
}
if(!_b74){
_b73.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b78=this.getBindingForArgument(arg);
if(_b78!=null){
if(_b78!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b78.select();
this._selectedDeckBinding=_b78;
var _b79=this.getProperty("selectedindex");
if(_b79!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b78.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b7a=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b7a=true;
this._lastKnownDimension=dim1;
}
return _b7a;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b7d){
var _b7e=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b7d);
return UserInterface.registerBinding(_b7e,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b7f){
DeckBinding.superclass.handleAction.call(this,_b7f);
var _b80=_b7f.target;
switch(_b7f.type){
case BalloonBinding.ACTION_INITIALIZE:
_b7f.consume();
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
DeckBinding.newInstance=function(_b82){
var _b83=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b82);
return UserInterface.registerBinding(_b83,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b84){
if(_b84 instanceof ToolBarBodyBinding){
if(_b84.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b84;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b84;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b84);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b85=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b85){
this.setImageSize(_b85);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b87=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b87.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b87.isDefaultContent=true;
this.add(_b87);
_b87.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b89=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b89);
}
if(_b89!=null&&_b89.hasClassName("max")){
this._maxToolBarGroup(_b89,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b8b){
var _b8c=this.boxObject.getDimension().w;
var _b8d=CSSComputer.getPadding(this.bindingElement);
_b8c-=(_b8d.left+_b8d.right);
if(_b8b!=null){
_b8c-=_b8b.boxObject.getDimension().w;
if(!Client.isWindows){
_b8c-=1;
}
if(Client.isExplorer){
_b8c-=15;
}
}
max.bindingElement.style.width=_b8c+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b8e){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b8e);
};
ToolBarBinding.prototype.addLeft=function(_b8f,_b90){
var _b91=null;
if(this._toolBarBodyLeft!=null){
_b91=this._toolBarBodyLeft.add(_b8f,_b90);
}else{
throw new Error("No left toolbarbody");
}
return _b91;
};
ToolBarBinding.prototype.addLeftFirst=function(_b92,_b93){
var _b94=null;
if(this._toolBarBodyLeft){
_b94=this._toolBarBodyLeft.addFirst(_b92,_b93);
}else{
throw new Error("No left toolbarbody");
}
return _b94;
};
ToolBarBinding.prototype.addRight=function(_b95){
var _b96=null;
if(this._toolBarBodyRight){
_b96=this._toolBarBodyRight.add(_b95);
}else{
throw new Error("No left toolbarbody");
}
return _b96;
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
ToolBarBinding.newInstance=function(_b99){
var _b9a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b99);
return UserInterface.registerBinding(_b9a,ToolBarBinding);
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
var _b9b=this.getDescendantBindingsByLocalName("toolbargroup");
var _b9c=new List();
var _b9d=true;
_b9b.each(function(_b9e){
if(_b9e.isVisible&&!_b9e.isDefaultContent){
_b9c.add(_b9e);
}
});
while(_b9c.hasNext()){
var _b9f=_b9c.getNext();
_b9f.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b9d){
_b9f.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b9d=false;
}
if(!_b9c.hasNext()){
_b9f.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _ba2=list.getNext();
var _ba3=_ba2.getEqualSizeWidth();
if(_ba3>max){
max=_ba3;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _ba2=list.getNext();
_ba2.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_ba4,_ba5){
var _ba6=ToolBarBinding.superclass.add.call(this,_ba4);
if(!_ba5){
if(_ba4 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba6;
};
ToolBarBodyBinding.prototype.addFirst=function(_ba7,_ba8){
var _ba9=ToolBarBinding.superclass.addFirst.call(this,_ba7);
if(!_ba8){
if(_ba7 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba9;
};
ToolBarBodyBinding.newInstance=function(_baa){
var _bab=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_baa);
return UserInterface.registerBinding(_bab,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bac){
switch(_bac){
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
var _bad=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bad)=="toolbarbody"){
UserInterface.getBinding(_bad).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bae=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bae)=="toolbarbody"){
UserInterface.getBinding(_bae).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_baf){
var _bb0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_baf);
return UserInterface.registerBinding(_bb0,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bb1){
var _bb2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bb1);
return UserInterface.registerBinding(_bb2,ToolBarButtonBinding);
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
var _bb3=this.getProperty("label");
var _bb4=this.getProperty("image");
if(_bb3){
this.setLabel(_bb3);
}
if(_bb4){
this.setImage(_bb4);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bb5,_bb6){
if(this.isAttached){
this._labelBinding.setLabel(_bb5,_bb6);
}
this.setProperty("label",_bb5);
};
ToolBarLabelBinding.prototype.setImage=function(_bb7,_bb8){
if(this.isAttached){
this._labelBinding.setImage(_bb7,_bb8);
}
this.setProperty("image",_bb7);
};
ToolBarLabelBinding.newInstance=function(_bb9){
var _bba=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bb9);
return UserInterface.registerBinding(_bba,ToolBarLabelBinding);
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
var _bbb=this.getDescendantBindingsByLocalName("clickbutton");
if(_bbb.hasEntries()){
while(_bbb.hasNext()){
var _bbc=_bbb.getNext();
if(_bbc.isDefault){
this._defaultButton=_bbc;
_bbc.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bbc.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bbb;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bbd,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bbd,arg);
switch(_bbd){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bbf=this.getAncestorBindingByType(DialogBinding,true);
if(_bbf!=null&&_bbf.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bc0){
DialogToolBarBinding.superclass.handleAction.call(this,_bc0);
var _bc1=_bc0.target;
var _bc2=false;
var _bc3=this._buttons.reset();
if(_bc1 instanceof ClickButtonBinding){
switch(_bc0.type){
case Binding.ACTION_FOCUSED:
_bc1.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bc1;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bc1.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bc2&&_bc3.hasNext()){
var _bc4=_bc3.getNext();
_bc2=_bc4.isFocused;
}
if(!_bc2){
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
ComboBoxBinding.newInstance=function(_bc6){
var _bc7=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bc6);
return UserInterface.registerBinding(_bc7,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bc8,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bc8,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bcc=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bcc.each(function(_bcd){
var _bce=_bcd.getProperty("oncommand");
_bcd.setProperty("hiddencommand",_bce);
_bcd.deleteProperty("oncommand");
_bcd.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bcf=null;
var _bd0=this.getActiveMenuItemId();
_bcc.reset();
while(_bcc.hasNext()){
var _bd1=_bcc.getNext();
if(_bd1.getProperty("id")==_bd0){
_bcf=_bd1;
break;
}
}
if(_bcf==null&&_bcc.hasEntries()){
_bcf=_bcc.getFirst();
}
if(_bcf!=null){
this.setButton(_bcf);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bd2){
if(_bd2 instanceof MenuItemBinding){
var _bd3=_bd2.getProperty("label");
var _bd4=_bd2.getProperty("image");
var _bd5=_bd2.getProperty("image-hover");
var _bd6=_bd2.getProperty("image-active");
var _bd7=_bd2.getProperty("image-disabled");
var _bd8=_bd2.getProperty("hiddencommand");
this.setLabel(_bd3?_bd3:"");
this.image=_bd4;
this.imageHover=_bd4;
this.imageActive=_bd6;
this.imageDisabled=_bd7;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bd8,this);
};
this.hideActiveItem(_bd2);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bd9){
if(_bd9 instanceof MenuItemBinding){
this.setButton(_bd9);
this.setActiveMenuItemId(_bd9.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bda){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bdb){
if(_bdb==_bda){
Binding.prototype.hide.call(_bdb);
}else{
Binding.prototype.show.call(_bdb);
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
var _bdd=this._views;
for(var _bde in ViewDefinitions){
var def=ViewDefinitions[_bde];
var key=def.perspective;
if(key!=null){
if(!_bdd.has(key)){
_bdd.set(key,new List());
}
var list=_bdd.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_be2,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_be2,arg);
switch(_be2){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _be5=this.bindingWindow.bindingMap.toolboxpopupgroup;
_be5.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_be5.add(StageViewMenuItemBinding.newInstance(_be5.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_be5.show();
}else{
_be5.hide();
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
TreeBinding.grid=function(_be9){
var _bea=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_be9);
var _bec=_be9%_bea;
if(_bec>0){
_be9=_be9-_bec+_bea;
}
return _be9+TreeBodyBinding.PADDING_TOP;
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
var _bed=this.getProperty("focusable");
if(_bed!=null){
this._isFocusable=_bed;
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
var _bef=this.getProperty("builder");
if(_bef){
this._buildFromTextArea(_bef);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bf0=this.getProperty("selectable");
var _bf1=this.getProperty("selectionproperty");
var _bf2=this.getProperty("selectionvalue");
if(_bf0){
this.setSelectable(true);
if(_bf1){
this.setSelectionProperty(_bf1);
}
if(_bf2){
this.setSelectionValue(_bf2);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _bf5=UserInterface.getBinding(area);
var _bf6=this._treeBodyBinding;
function build(){
_bf6.subTreeFromString(area.value);
}
_bf5.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_bf7){
var _bf8=_bf7.getHandle();
if(this._treeNodeBindings.has(_bf8)){
throw "Duplicate treenodehandles registered: "+_bf7.getLabel();
}else{
this._treeNodeBindings.set(_bf8,_bf7);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_bf8)){
_bf7.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_bfa){
this._treeNodeBindings.del(_bfa.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_bfb){
var _bfc=null;
if(this._treeNodeBindings.has(_bfb)){
_bfc=this._treeNodeBindings.get(_bfb);
}else{
throw "No such treenode: "+_bfb;
}
return _bfc;
};
TreeBinding.prototype.handleAction=function(_bfd){
TreeBinding.superclass.handleAction.call(this,_bfd);
var _bfe=_bfd.target;
switch(_bfd.type){
case TreeNodeBinding.ACTION_OPEN:
_bfd.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bfe);
_bfd.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bfe;
this.focusSingleTreeNodeBinding(_bfe);
if(!this.isFocused){
this.focus();
}
_bfd.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bfe;
this.focusSingleTreeNodeBinding(_bfe);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bfe;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bfe;
this.focusSingleTreeNodeBinding(_bfe);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bfd.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bfe.isFocused){
this.blurSelectedTreeNodes();
}
_bfd.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bff,_c00){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c01){
if(_c01!=null&&!_c01.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c01);
_c01.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c02){
this.blurSelectedTreeNodes();
while(_c02.hasNext()){
var _c03=_c02.getNext();
this._focusedTreeNodeBindings.add(_c03);
_c03.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c04=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c05=false;
var _c06=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c07=this._focusedTreeNodeBindings.getNext();
var _c08=_c07.getProperty(this._selectionProperty);
if(_c08!=null){
if(!this._selectionValue||this._selectionValue[_c08]){
_c06=(this._selectedTreeNodeBindings[_c07.key]=_c07);
var _c09=_c04[_c07.key];
if(!_c09||_c09!=_c06){
_c05=true;
}
}
}
}
if(_c06){
if(_c05){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c04){
for(var key in _c04){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c0b=new List();
for(var key in this._selectedTreeNodeBindings){
_c0b.add(this._selectedTreeNodeBindings[key]);
}
return _c0b;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c0d){
_c0d.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c0e){
var _c0f=_c0e.getDescendantBindingsByLocalName("treenode");
var _c10=true;
var self=this;
_c0f.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c10;
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
var _c13=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c13!=null){
this.focusSingleTreeNodeBinding(_c13);
_c13.callback();
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
TreeBinding.prototype.add=function(_c14){
var _c15=null;
if(this._treeBodyBinding){
_c15=this._treeBodyBinding.add(_c14);
}else{
this._treeNodeBuffer.add(_c14);
_c15=_c14;
}
return _c15;
};
TreeBinding.prototype.addFirst=function(_c16){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c17=this._treeBodyBinding.bindingElement;
_c17.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c18,_c19){
if(_c19.isContainer&&_c19.isOpen){
_c19.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c1a){
this._isSelectable=_c1a;
if(_c1a){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c1b){
this._selectionProperty=_c1b;
};
TreeBinding.prototype.setSelectionValue=function(_c1c){
if(_c1c){
var list=new List(_c1c.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c1e,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c1e,arg);
switch(_c1e){
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
var _c20=this.getFocusedTreeNodeBindings();
if(_c20.hasEntries()){
var node=_c20.getFirst();
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
var _c23=this.getFocusedTreeNodeBindings();
if(_c23.hasEntries()){
var node=_c23.getFirst();
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
var _c26=null;
while(next==null&&(_c26=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c26!=null){
next=_c26.getNextBindingByLocalName("treenode");
}
node=_c26;
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
var _c28=DOMEvents.getTarget(e);
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
var _c29=new TreeCrawler();
var list=new List();
_c29.mode=TreeCrawler.MODE_GETOPEN;
_c29.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c2c=list.getNext();
map.set(_c2c.getHandle(),true);
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
var _c31=this._positionIndicatorBinding;
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
if(y!=_c31.getPosition().y){
_c31.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c31.isVisible){
_c31.show();
}
}else{
if(_c31.isVisible){
_c31.hide();
}
}
}else{
if(_c31.isVisible){
_c31.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c34){
this._acceptingTreeNodeBinding=_c34;
this._acceptingPosition=_c34.boxObject.getLocalPosition();
this._acceptingDimension=_c34.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c34);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c35){
var map={};
var _c37=_c35.getChildBindingsByLocalName("treenode");
var _c38,pos,dim,y;
y=TreeBinding.grid(_c35.boxObject.getLocalPosition().y);
map[y]=true;
while(_c37.hasNext()){
_c38=_c37.getNext();
pos=_c38.boxObject.getLocalPosition();
dim=_c38.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c3e in this._acceptingPositions){
if(_c3e==y){
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
TreeBinding.newInstance=function(_c3f){
var _c40=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c3f);
var _c41=UserInterface.registerBinding(_c40,TreeBinding);
_c41.treeBodyBinding=TreeBodyBinding.newInstance(_c3f);
return _c41;
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
TreeBodyBinding.prototype.accept=function(_c42){
if(_c42 instanceof TreeNodeBinding){
this.logger.debug(_c42);
}
};
TreeBodyBinding.prototype.handleAction=function(_c43){
TreeBodyBinding.superclass.handleAction.call(this,_c43);
switch(_c43.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c43.target);
_c43.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c44){
var a=this.boxObject.getDimension().h;
var y=_c44.boxObject.getLocalPosition().y;
var h=_c44.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c4a=_c44.labelBinding.bindingElement;
if(y-t<0){
_c4a.scrollIntoView(true);
}else{
if(y-t+h>a){
_c4a.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c4b){
var _c4c=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c4b);
return UserInterface.registerBinding(_c4c,TreeBodyBinding);
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
var _c4d=TreeNodeBinding.superclass.serialize.call(this);
if(_c4d){
_c4d.label=this.getLabel();
_c4d.image=this.getImage();
var _c4e=this.getHandle();
if(_c4e&&_c4e!=this.key){
_c4d.handle=_c4e;
}
if(this.isOpen){
_c4d.open=true;
}
if(this.isDisabled){
_c4d.disabled=true;
}
if(this.dragType){
_c4d.dragtype=this.dragType;
}
if(this.dragAccept){
_c4d.dragaccept=this.dragAccept;
}
}
return _c4d;
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
var _c50=UserInterface.getBinding(node);
if(_c50&&_c50.containingTreeBinding){
this.containingTreeBinding=_c50.containingTreeBinding;
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
var _c51=this.key;
var _c52=this.getProperty("handle");
if(_c52){
_c51=_c52;
}
return _c51;
};
TreeNodeBinding.prototype.setHandle=function(_c53){
this.setProperty("handle",_c53);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c55=this.getProperty("label");
var _c56=this.getProperty("tooltip");
var _c57=this.getProperty("oncommand");
var _c58=this.getProperty("onbindingfocus");
var _c59=this.getProperty("onbindingblur");
var _c5a=this.getProperty("focused");
var _c5b=this.getProperty("callbackid");
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
if(_c55!=null){
this.setLabel(_c55);
}
if(_c56!=null){
this.setToolTip(_c56);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c5d=this.bindingWindow.WindowManager;
if(_c57!=null){
this.oncommand=function(){
Binding.evaluate(_c57,this);
};
}
if(_c58!=null){
this.onfocus=function(){
Binding.evaluate(_c58,this);
};
}
if(_c59!=null){
this.onblur=function(){
Binding.evaluate(_c59,this);
};
}
if(_c5a==true){
this.focus();
}
if(_c5b!=null){
Binding.dotnetify(this,_c5b);
}
};
TreeNodeBinding.prototype.handleAction=function(_c5e){
TreeNodeBinding.superclass.handleAction.call(this,_c5e);
switch(_c5e.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c5e.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c5f,_c60){
var _c61=true;
if(_c5f instanceof TreeNodeBinding){
var _c62=false;
var _c63=this.bindingElement;
var _c64=this.containingTreeBinding.bindingElement;
while(!_c62&&_c63!=_c64){
if(_c63==_c5f.getBindingElement()){
_c62=true;
}else{
_c63=_c63.parentNode;
}
}
if(_c62){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c61=false;
}else{
this.acceptTreeNodeBinding(_c5f,_c60);
}
}else{
_c61=false;
}
return _c61;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c65,_c66){
var _c67=_c65.serializeToString();
var _c68=new BindingParser(this.bindingDocument);
var _c69=_c68.parseFromString(_c67).getFirst();
_c66=_c66?_c66:this.containingTreeBinding.getDropIndex();
var _c6a=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c69,_c6a.get(_c66));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c65.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c6b=this.getProperty("image");
var _c6c=this.getProperty("image-active");
var _c6d=this.getProperty("image-disabled");
_c6c=_c6c?_c6c:this.isContainer?_c6b?_c6b:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c6b?_c6b:TreeNodeBinding.DEFAULT_ITEM;
_c6d=_c6d?_c6d:this.isContainer?_c6b?_c6b:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c6b?_c6b:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c6b=_c6b?_c6b:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c6b,imageHover:null,imageActive:_c6c,imageDisabled:_c6d});
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
TreeNodeBinding.prototype.setLabel=function(_c6f){
this.setProperty("label",String(_c6f));
if(this.isAttached){
this.labelBinding.setLabel(String(_c6f));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c70){
this.setProperty("tooltip",String(_c70));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c70));
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
var _c71=this.imageProfile.getDefaultImage();
var _c72=this.imageProfile.getActiveImage();
_c72=_c72?_c72:_c71;
return this.isOpen?_c72:_c71;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c74=DOMEvents.getTarget(e);
var _c75=this.labelBinding.bindingElement;
var _c76=this.labelBinding.shadowTree.labelBody;
var _c77=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c74){
case _c75:
this._onAction(e);
break;
case _c76:
case _c77:
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
if(_c74.parentNode==this.bindingElement&&_c74.__updateType==Update.TYPE_INSERT){
var _c75=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c74)=="treenode"){
if(_c74==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c74,_c75.nextSibling);
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
switch(_c74){
case _c75:
case _c76:
case _c77:
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
var _c7b=true;
if(e.type=="mousedown"){
var _c7c=e.button==(e.target?0:1);
if(!_c7c){
_c7b=false;
}
}
if(_c7b){
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
var _c7e=false;
if(e!=null){
_c7e=e.shiftKey;
}
this.dispatchAction(_c7e?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c81=this.getDescendantBindingsByLocalName("treenode");
_c81.each(function(_c82){
_c82.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c83){
var _c84=_c83.getAttribute("focused");
if(_c84=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c85){
var _c86=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c85);
return UserInterface.registerBinding(_c86,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c87){
var _c88=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c87);
return UserInterface.registerBinding(_c88,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c89){
this.bindingElement.style.left=_c89.x+"px";
this.bindingElement.style.top=_c89.y+"px";
this._geometry.x=_c89.x;
this._geometry.y=_c89.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c8a){
var _c8b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c8a);
return UserInterface.registerBinding(_c8b,TreePositionIndicatorBinding);
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
this.addFilter(function(_c8d){
var _c8e=UserInterface.getBinding(_c8d);
var _c8f=null;
var _c8f=null;
if(!_c8e instanceof TreeNodeBinding){
_c8f=NodeCrawler.SKIP_NODE;
}
return _c8f;
});
this.addFilter(function(_c90,list){
var _c92=UserInterface.getBinding(_c90);
var _c93=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c92.isOpen){
list.add(_c92);
}
break;
}
return _c93;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c94){
this.binding=_c94;
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
DockTabsButtonBinding.newInstance=function(_c95){
var _c96=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c95);
_c96.setAttribute("type","checkbox");
_c96.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c96.className="tabbutton";
return UserInterface.registerBinding(_c96,DockTabsButtonBinding);
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
var _c97=DockBinding.superclass.serialize.call(this);
if(_c97){
_c97.active=this.isActive?true:null;
_c97.collapsed=this.isCollapsed?true:null;
}
return _c97;
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
var _c98=UserInterface.getBinding(this.bindingElement.parentNode);
var _c99=MatrixBinding.newInstance(this.bindingDocument);
_c99.attachClassName("dockliner");
this.shadowTree.dockLiner=_c99;
_c98.add(_c99);
_c99.attach();
_c99.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c9b){
var _c9c=this.getSelectedTabPanelBinding();
if(_c9c){
_c9c.isVisible=_c9b;
_c9c.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c9d){
var _c9e=this._getBindingForDefinition(_c9d);
var _c9f=DockTabBinding.newInstance(this.bindingDocument);
_c9f.setHandle(_c9d.handle);
_c9f.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c9d.label);
_c9f.setImage(_c9d.image);
_c9f.setToolTip(_c9d.toolTip);
_c9f.setEntityToken(_c9d.entityToken);
_c9f.setAssociatedView(_c9e);
this.appendTabByBindings(_c9f,null);
this._setupPageBindingListeners(_c9f);
var _ca0=this.getTabPanelBinding(_c9f);
_c9e.snapToBinding(_ca0);
var _ca1=this.bindingWindow.bindingMap.views;
_ca1.add(_c9e);
if(!this.isActive){
this.activate();
}
_c9e.attach();
};
DockBinding.prototype.prepareOpenView=function(_ca2,_ca3){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_ca3.setLabel(_ca2.label);
_ca3.setImage(_ca2.image);
_ca3.setToolTip(_ca2.toolTip);
this._setupPageBindingListeners(_ca3);
var _ca4=this.getTabPanelBinding(_ca3);
var _ca5=this._getBindingForDefinition(_ca2);
_ca3.setAssociatedView(_ca5);
_ca5.snapToBinding(_ca4);
UserInterface.getBinding(this.bindingDocument.body).add(_ca5);
_ca5.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_ca6){
var _ca7=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_ca7.bindingDocument);
view.setDefinition(_ca6);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_ca9){
var _caa=this.getTabPanelBinding(_ca9);
var self=this;
var _cac={handleAction:function(_cad){
var _cae=_cad.target;
switch(_cad.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cae.reflex(true);
var view=_ca9.getAssociatedView();
if(_cae.bindingWindow==view.getContentWindow()){
_ca9.updateDisplay(_cae);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_ca9.onPageInitialize(_cae);
_cad.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_ca9.updateDisplay(_cae);
_cad.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_ca9.updateEntityToken(_cae);
_cad.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_ca9.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_ca9.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_ca9);
_cad.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_ca9,true);
_cad.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_ca9);
break;
case Binding.ACTION_FORCE_REFLEX:
_caa.reflex(true);
_cad.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_ca9.isDirty){
_ca9.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cb0){
_caa.addActionListener(_cb0,_cac);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cb1){
DockBinding.superclass.handleAction.call(this,_cb1);
var _cb2=_cb1.target;
switch(_cb1.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cb1.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cb2 instanceof DockBinding){
if(_cb2.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cb2);
if(this.isActive){
_cb2.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cb2);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cb3,arg){
DockBinding.superclass.handleBroadcast.call(this,_cb3,arg);
switch(_cb3){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cb5=arg;
if(_cb5.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cb5.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cb6){
var tabs=this.getTabBindings();
var _cb8=false;
while(tabs.hasNext()&&!_cb8){
var tab=tabs.getNext();
var _cba=tab.getEntityToken();
if(_cba!=null&&_cba==_cb6){
if(!tab.isSelected){
this.select(tab,true);
_cb8=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cbb){
this._handleCollapse(true,_cbb);
};
DockBinding.prototype.unCollapse=function(_cbc){
this._handleCollapse(false,_cbc);
};
DockBinding.prototype._handleCollapse=function(_cbd,_cbe){
var _cbf=this.getChildBindingByLocalName("dockpanels");
var _cc0=this.getAncestorBindingByLocalName("splitbox");
if(_cbd){
_cbf.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cbe&&_cc0.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cbf.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cbe){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cbd);
this.isCollapsed=_cbd;
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
DockBinding.prototype.closeTab=function(_cc5,_cc6){
if(_cc5.isDirty&&!_cc6){
var _cc7=Resolver.resolve(_cc5.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cc7),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cc9){
switch(_cc9){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cc5);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cc5);
break;
}
}});
}else{
this.removeTab(_cc5);
}
};
DockBinding.prototype.closeTabsExcept=function(_cca){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cca){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_ccd){
var _cce=_ccd.getAssociatedView();
_cce.saveContainedEditor();
var self=this;
var _cd0={handleBroadcast:function(_cd1,arg){
switch(_cd1){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cce.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cd0);
if(arg.isSuccess){
self.removeTab(_ccd);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cd0);
};
DockBinding.prototype.appendTabByBindings=function(_cd3,_cd4){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cd3,_cd4);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cd5){
_cd5=_cd5?_cd5+"px":"100%";
this.bindingElement.style.width=_cd5;
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
DockBinding.prototype.showControls=function(_cd6){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cd6){
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
var _cd9=DockControlBinding.newInstance(this.bindingDocument);
_cd9.setControlType(type);
return _cd9;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cdb=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cdb)){
_cdb=_cdb>0?_cdb-1:0;
self.bindingElement.style.width=new String(_cdb)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cdc){
DockTabsBinding.superclass.handleCrawler.call(this,_cdc);
switch(_cdc.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cde=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cde)){
_cde=_cde>0?_cde-1:0;
self.bindingElement.style.width=new String(_cde)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cdf){
var _ce0=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cdf);
return UserInterface.registerBinding(_ce0,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_ce1){
this._viewBinding=_ce1;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _ce2=DockTabBinding.superclass.serialize.call(this);
if(_ce2){
_ce2.label=null;
_ce2.image=null;
_ce2.handle=this.getHandle();
}
return _ce2;
};
DockTabBinding.prototype.setHandle=function(_ce3){
this.setProperty("handle",_ce3);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_ce4){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_ce4;
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
var _ce5=DialogControlBinding.newInstance(this.bindingDocument);
_ce5.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_ce5);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_ce6){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_ce6){
this.isDirty=_ce6;
if(Binding.exists(this.labelBinding)){
var _ce7=this.labelBinding.getLabel();
if(_ce7!=null){
this.labelBinding.setLabel(_ce6?"*"+_ce7:_ce7.slice(1,_ce7.length));
}else{
this.labelBinding.setLabel(_ce6?"*":"");
}
}
}
var _ce8=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_ce8.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_ce8.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_ce9){
this.setLabel(_ce9.getLabel());
this.setImage(_ce9.getImage());
this.setToolTip(_ce9.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cea){
this.setEntityToken(_cea.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_ceb){
DockTabBinding.superclass.handleAction.call(this,_ceb);
var _cec=_ceb.target;
switch(_ceb.type){
case ControlBinding.ACTION_COMMAND:
if(_cec.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_ceb.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cec);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_ced){
var cmd=_ced.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cef){
if(!_cef){
if(!this.getLabel()){
_cef=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cef=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_cef);
};
DockTabBinding.prototype.setImage=function(_cf0){
if(!_cf0){
if(!this.getImage()){
_cf0=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cf0=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cf0);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cf3=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cf3;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cf3;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cf3;
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
var _cf5=this.bindingElement;
setTimeout(function(){
_cf5.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cf6,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cf6,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cf6){
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
DockTabBinding.prototype.select=function(_cfb){
DockTabBinding.superclass.select.call(this,_cfb);
this._updateBroadcasters();
if(_cfb!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cfc=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cfd=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cfd.enable();
if(this.isDirty){
_cfc.enable();
}else{
_cfc.disable();
}
}else{
_cfd.disable();
_cfc.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cfe){
if(this._canUpdateTree||_cfe){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cff=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d01=win.bindingMap.savebutton;
if(_d01!=null){
_cff=true;
}
}
}
return _cff;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d02){
var _d03=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d02);
return UserInterface.registerBinding(_d03,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d04){
var _d05=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d04);
return UserInterface.registerBinding(_d05,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d06){
DockPanelBinding.superclass.select.call(this,_d06);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d07){
DockPanelBinding.superclass.handleCrawler.call(this,_d07);
if(_d07.response==null){
if(_d07.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d07.id==FocusCrawler.ID){
_d07.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d08){
var _d09=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d08);
return UserInterface.registerBinding(_d09,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d0a){
var _d0b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d0a);
return UserInterface.registerBinding(_d0b,DockControlBinding);
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
ViewBinding.getInstance=function(_d0c){
var _d0d=ViewBinding._instances.get(_d0c);
if(!_d0d){
var cry="ViewBinding.getInstance: No such instance: "+_d0c;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d0d;
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
var _d10=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d10){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d11=snap.boxObject.getGlobalPosition();
var _d12=snap.boxObject.getDimension();
if(!Point.isEqual(_d11,this._lastknownposition)){
this.setPosition(_d11);
this._lastknownposition=_d11;
}
if(!Dimension.isEqual(_d12,this._lastknowndimension)){
this.setDimension(_d12);
this._lastknowndimension=_d12;
var _d13=_d12.h-ViewBinding.VERTICAL_ADJUST;
_d13=_d13<0?0:_d13;
this.windowBinding.getBindingElement().style.height=new String(_d13)+"px";
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
var _d14=this._viewDefinition.flowHandle;
if(_d14!=null){
FlowControllerService.CancelFlow(_d14);
}
}
if(this._viewDefinition!=null){
var _d15=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d15);
this.logger.fine("ViewBinding closed: \""+_d15+"\"");
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
var _d17=null;
if(this._viewDefinition!=null){
_d17=this._viewDefinition.handle;
}
return _d17;
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
ViewBinding.prototype.setDefinition=function(_d18){
this._viewDefinition=_d18;
if(_d18.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d19){
ViewBinding.superclass.handleAction.call(this,_d19);
var _d1a=_d19.target;
switch(_d19.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d19.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d1a.isActivated){
_d1a.onActivate();
}
}
_d19.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d1a==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d19.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d1a==this._snapBinding){
if(_d1a.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d1a.getContentWindow().isPostBackDocument){
if(_d19.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d1a.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d1a==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d1a.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d19.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d19.type==WindowBinding.ACTION_ONLOAD){
var win=_d1a.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d1a);
}
}
}
_d19.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d1a.label&&this._viewDefinition.label){
_d1a.label=this._viewDefinition.label;
}
if(!_d1a.image&&this._viewDefinition.image){
_d1a.image=this._viewDefinition.image;
}
if(_d1a.bindingWindow==this.getContentWindow()){
this._pageBinding=_d1a;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d1a.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d1a==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d19.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d19.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d1f,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d1f,arg);
switch(_d1f){
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
var _d23=def.argument;
if(_d23!=null){
page.setPageArgument(_d23);
}
var _d24=def.width;
if(_d24!=null){
page.width=_d24;
}
var _d25=def.height;
if(_d25!=null){
page.height=_d25;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d26){
ViewBinding.superclass.handleCrawler.call(this,_d26);
switch(_d26.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d26.id==FocusCrawler.ID){
if(_d26.previousNode!=this._snapBinding.bindingElement){
_d26.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d26.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d27){
_d27.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d27.x+"px";
this.bindingElement.style.top=_d27.y+"px";
};
ViewBinding.prototype.setDimension=function(_d28){
_d28.h-=ViewBinding.VERTICAL_ADJUST;
_d28.w-=ViewBinding.HORIZONTAL_ADJUST;
_d28.w-=1;
if(_d28.h<0){
_d28.h=0;
}
if(_d28.w<0){
_d28.w=0;
}
this.bindingElement.style.width=String(_d28.w)+"px";
this.bindingElement.style.height=String(_d28.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d29){
this.isFlexBoxBehavior=false;
_d29.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d29.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d29.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d29;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d2a=null;
if(this.isFreeFloating==true){
_d2a=this._snapBinding.getBindingElement();
}else{
_d2a=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d2a;
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
ViewBinding.prototype.reload=function(_d2b){
this._isLoaded=false;
this.windowBinding.reload(_d2b);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d2c=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d2c=true;
}
}
if(!_d2c){
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
ViewBinding.newInstance=function(_d30){
var _d31=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d30);
var _d32=UserInterface.registerBinding(_d31,ViewBinding);
_d32.windowBinding=_d32.add(WindowBinding.newInstance(_d30));
_d32.windowBinding.isFlexible=false;
return _d32;
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
var _d3a=this.bindingWindow.__doPostBack;
var _d3b=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d3b){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d3c,_d3d){
if(!form.__isSetup){
Application.lock(self);
_d3b=true;
}
self.manifestAllDataBindings();
_d3a(_d3c,_d3d);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d3e,list){
var _d40=this.bindingWindow.bindingMap.__REQUEST;
if(_d40!=null&&this._isDotNet()){
switch(_d3e){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d40.postback(_d3e);
}
}
break;
default:
_d40.postback(_d3e);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d3e,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d41,list){
var _d43=this.getDescendantBindingsByType(WindowBinding);
_d43.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d41,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d47){
if(_d47.name==null||_d47.name==""){
return;
}
list.add({name:_d47.name,value:_d47.value});
});
var out="";
list.each(function(_d49){
out+=_d49.name+": "+_d49.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d4a){
PageBinding.superclass.handleAction.call(this,_d4a);
var _d4b=_d4a.target;
switch(_d4a.type){
case RootBinding.ACTION_PHASE_3:
if(_d4b==UserInterface.getBinding(this.bindingDocument.body)){
_d4b.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d4b);
}
_d4a.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d4c=this.validateAllDataBindings();
if(_d4c){
this.doPostBack(_d4b);
}
}
_d4a.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d4a.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d4b.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d4b.key)){
this._initBlockers.del(_d4b.key);
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
var _d4e={handleAction:function(_d4f){
if(_d4f.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d4e);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d4e);
}else{
MessageQueue.udpdate();
}
_d4a.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d50,arg){
PageBinding.superclass.handleBroadcast.call(this,_d50,arg);
switch(_d50){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d52=arg;
if(!this._canPostBack&&!_d52){
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
PageBinding.prototype.doPostBack=function(_d54){
if(this._canPostBack){
if(_d54!=null&&this._isDotNet()){
var _d55=_d54.getCallBackID();
var _d56=_d54.getCallBackArg();
if(_d55!=null){
_d55=_d55.replace(/_/g,"$");
}else{
_d55="";
}
if(_d56==null){
_d56="";
}
this.bindingWindow.__doPostBack(_d55,_d56);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d57){
var _d58=true;
var _d59=this.bindingWindow.DataManager.getAllDataBindings();
while(_d59.hasNext()&&_d58){
var _d5a=_d59.getNext();
if(_d5a.isAttached){
var _d5b=_d5a.validate();
if(_d58&&!_d5b){
_d58=false;
this.logger.debug("Invalid DataBinding: "+_d5a.toString()+" ("+_d5a.getName()+")");
if(_d57){
var _d5c=_d5a.getAncestorBindingByType(TabPanelBinding);
if(_d5c!=null&&!_d5c.isVisible){
var _d5d=_d5c.getAncestorBindingByType(TabBoxBinding);
var _d5e=_d5d.getTabBinding(_d5c);
_d5d.select(_d5e);
}
}
break;
}
}
}
return _d58;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d60=this.bindingWindow.DataManager.getAllDataBindings();
while(_d60.hasNext()){
var _d61=_d60.getNext();
if(_d61.isAttached){
var _d62=_d61.manifest();
if(_d62!=null){
list.add(_d62);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d63=this.bindingWindow.DataManager.getAllDataBindings();
while(_d63.hasNext()){
var _d64=_d63.getNext();
if(_d64.isAttached){
_d64.clean();
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
var _d67=this._cachedFocus.getBinding();
if(_d67){
_d67.blur();
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
var _d68=this.getProperty("width");
if(!_d68){
_d68=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d68;
}
if(this.height==null){
var _d69=this.getProperty("height");
this.height=_d69?_d69:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d6a=this.getProperty("minheight");
if(_d6a!=null){
this.minheight=_d6a;
}
}
if(this.controls==null){
var _d6b=this.getProperty("controls");
this.controls=_d6b?_d6b:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d6c=this.getProperty("resizable");
this.isResizable=_d6c?_d6c:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d6d){
if(_d6d!=this.isAutoHeightLayoutMode){
if(_d6d){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d6d;
}
};
DialogPageBinding.prototype.handleAction=function(_d6e){
DialogPageBinding.superclass.handleAction.call(this,_d6e);
var _d6f=_d6e.target;
switch(_d6e.type){
case PageBinding.ACTION_ATTACHED:
if(_d6f!=this&&_d6f.isFitAsDialogSubPage){
_d6f.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d6e.consume();
if(_d6f.response!=null){
this.response=_d6f.response;
switch(_d6f.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d70){
var _d71=this.bindingWindow.bindingMap.buttonAccept;
if(_d71!=null){
_d71.setDisabled(_d70);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d72){
var _d73=CSSComputer.getPadding(this.bindingElement);
var _d74=CSSComputer.getBorder(this.bindingElement);
_d72+=_d73.top+_d73.bottom;
_d72+=_d74.top+_d74.bottom;
if(_d72>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d72+"px";
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
EditorPageBinding.prototype.handleAction=function(_d7c){
EditorPageBinding.superclass.handleAction.call(this,_d7c);
var _d7d=_d7c.target;
switch(_d7c.type){
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
var _d7e=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d7d.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d7e==-1){
_d7e=0;
}
}else{
_d7e++;
}
return res;
});
if(_d7e>-1){
this._messengers.del(_d7e);
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
_d7c.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d7d.key,_d7d);
if(_d7d instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d7d.key);
if(_d7d instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d7d==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d7d.getSelectedTabBinding();
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
_d7c.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d7d==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d7c.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d7d==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d7c.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d7d==this._windowBinding){
if(_d7d.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d83=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d83);
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
var _d84=this.bindingWindow.bindingMap.savebutton;
if(_d84!=null&&!_d84.isDisabled){
_d84.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d85=this.bindingWindow.bindingMap.__REQUEST;
if(_d85!=null){
_d85.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d86=this.bindingWindow.bindingMap.__REQUEST;
if(_d86!=null){
_d86.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d87){
this._message=null;
switch(_d87){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d87,this._messengers);
if(!this._messengers.hasEntries()){
if(_d87==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d87;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d87;
EditorPageBinding.superclass.postMessage.call(this,_d87,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d87,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d88,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d88,arg);
switch(_d88){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d8a=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d8a);
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
var _d8b=new List();
this._invalidBindings.each(function(key,_d8d){
var list=_d8d.getInvalidLabels();
if(list){
list.each(function(_d8f){
_d8b.add(_d8f);
});
}
});
if(_d8b.hasEntries()){
var _d90="";
while(_d8b.hasNext()){
_d90+=_d8b.getNext().toLowerCase();
if(_d8b.hasNext()){
_d90+=", ";
}else{
_d90+=".";
}
}
var _d91=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d91+" "+_d90);
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
EditorPageBinding.prototype.enableSave=function(_d92){
var _d93=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d93){
var _d94=UserInterface.getBinding(_d93);
if(_d92){
_d94.enable();
}else{
_d94.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d95=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d95!=null){
UserInterface.getBinding(_d95).enable();
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
var _d96=this._windowBinding.getContentDocument().title;
if(_d96==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d97=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d99){
if(_d99.name=="__EVENTTARGET"&&_d97){
_d99.value=_d97;
}
list.add({name:_d99.name,value:_d99.value});
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
WizardPageBinding.prototype.handleAction=function(_d9b){
WizardPageBinding.superclass.handleAction.call(this,_d9b);
var _d9c=_d9b.target;
switch(_d9b.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d9c);
}else{
_d9b.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d9c);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d9b.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d9b.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d9d){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d9f=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d9d);
}
if(_d9f){
_d9f.setDisabled(!_d9d);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_da0,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_da0,arg);
var self=this;
switch(_da0){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_da4){
};
MarkupAwarePageBinding.prototype._activate=function(_da5){
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
var _da6=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_da6.boxObject.getDimension().w;
_da6.hide();
var _da7=this.boxObject.getDimension().h;
this.bindingElement.style.height=_da7+"px";
var self=this;
var _da9=this.bindingWindow.bindingMap.moreactionsbutton;
_da9.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_daa){
self._showMoreActions();
_daa.consume();
}});
var _dab=this.bindingWindow.bindingMap.moreactionspopup;
_dab.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_dac){
var item=_dac.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_dae,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_dae,arg);
switch(_dae){
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
var _db2=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_db2!=null){
_db2.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _db3=this.bindingWindow.WindowManager;
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
var _db4=new String("");
this._actionProfile.each(function(_db5,list){
list.each(function(_db7){
_db4+=_db7.getHandle()+";"+_db7.getKey()+";";
if(_db7.isDisabled()){
_db4+="isDisabled='true';";
}
});
});
return _db4;
};
SystemToolBarBinding.prototype.handleAction=function(_db8){
SystemToolBarBinding.superclass.handleAction.call(this,_db8);
switch(_db8.type){
case ButtonBinding.ACTION_COMMAND:
var _db9=_db8.target;
this._handleSystemAction(_db9.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dba){
if(_dba!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dbc=list.getFirst();
var _dbd=_dbc.node;
}
SystemAction.invoke(_dba,_dbd);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dc0,list){
var _dc2=new List();
list.reset();
while(list.hasNext()){
var _dc3=list.getNext();
var _dc4=null;
if(_dc3.isInToolBar()){
if(_dc3.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dc4=self.getToolBarButtonBinding(_dc3);
}
}
if(_dc4!=null){
_dc2.add(_dc4);
}
}
if(_dc2.hasEntries()){
var _dc5=ToolBarGroupBinding.newInstance(doc);
_dc2.each(function(_dc6){
_dc5.add(_dc6);
});
self.addLeft(_dc5);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dc7=this.bindingWindow.bindingMap.toolsbutton;
var _dc8=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dc9=_dc7.bindingElement.offsetLeft-this._moreActionsWidth;
var _dca=0;
var _dcb=new List();
var _dcc,_dcd=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dcc=_dcd.getNext())!=null){
if(!_dcc.isVisible){
_dcc.show();
}
_dca+=_dcc.boxObject.getDimension().w;
if(_dca>=_dc9){
_dcb.add(_dcc);
_dcc.hide();
}
}
if(_dcb.hasEntries()){
var _dce=_dcb.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dce).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dcc=_dcb.getNext())!=null){
this._moreActions.add(_dcc.associatedSystemAction);
}
_dc8.show();
}else{
this._moreActions=null;
_dc8.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dcf=this.bindingWindow.bindingMap.moreactionspopup;
_dcf.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dcf.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dcf.add(item);
}
_dcf.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dd1){
var _dd2=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dd3=_dd1.getLabel();
var _dd4=_dd1.getToolTip();
var _dd5=_dd1.getImage();
var _dd6=_dd1.isDisabled();
if(_dd5&&_dd5.indexOf("size=")==-1){
_dd5=_dd5+"&size="+this.getImageSize();
_dd2.imageProfile=new ImageProfile({image:_dd5});
}
if(_dd3){
_dd2.setLabel(_dd3);
}
if(_dd4){
_dd2.setToolTip(_dd4);
}
if(_dd1.isDisabled()){
_dd2.disable();
}
_dd2.associatedSystemAction=_dd1;
return _dd2;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dd7=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dd7!=null){
_dd7.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dd8){
var _dd9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dd8);
return UserInterface.registerBinding(_dd9,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dda){
var _ddb=SystemTreeBinding.superclass.add.call(this,_dda);
if(!this._defaultTreeNode){
if(_dda instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dda;
}
}
return _ddb;
};
SystemTreeBinding.prototype.handleAction=function(_ddc){
SystemTreeBinding.superclass.handleAction.call(this,_ddc);
var _ddd=_ddc.target;
switch(_ddc.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_ddd.key);
this._updateFocusedNode();
_ddc.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_ddc.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_ddd.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_ddc.consume();
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
var _ddf=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_ddf);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_de0){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_de0);
var reg=this._entityTokenRegistry;
var _de2=_de0.node.getEntityToken();
if(reg.has(_de2)){
reg.get(_de2).add(_de0);
}else{
reg.set(_de2,new List([_de0]));
}
var _de3=null;
if(this.isLockedToEditor){
if(_de2==StageBinding.entityToken){
if(_de0.node.isTreeLockEnabled()){
_de3=_de0;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_de0.node.getHandle()){
_de3=_de0;
}
}
}
if(_de3!=null){
this.focusSingleTreeNodeBinding(_de3);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_de4){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_de4);
var reg=this._entityTokenRegistry;
var _de6=_de4.node.getEntityToken();
if(reg.has(_de6)){
var list=reg.get(_de6);
list.del(_de4);
if(!list.hasEntries()){
reg.del(_de6);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_de4.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_de4.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _dea=this._refreshingTreeNodes;
if(_dea.hasEntries()&&_dea.has(key)){
_dea.del(key);
if(!_dea.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _deb=StageBinding.entityToken;
if(_deb!=null){
this._focusTreeNodeByEntityToken(_deb);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _dec=false;
var _ded=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_dec=false;
}else{
if(_ded.hasEntries()){
_dec=true;
while(_dec&&_ded.hasNext()){
var _dee=_ded.getNext();
if(!_dee.isDraggable){
_dec=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_dec;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_def,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_def,arg);
switch(_def){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_def,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_def);
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
var self=this,_df3=arg;
setTimeout(function(){
if(_df3!=null){
self._focusTreeNodeByEntityToken(_df3);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _df5=tab.perspectiveNode==null;
if(!_df5){
_df5=tab.perspectiveNode==this.perspectiveNode;
}
if(_df5){
var self=this,_df7=tab.getEntityToken();
setTimeout(function(){
if(_df7==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_df7);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_df8,_df9){
this.isLockFeatureFocus=true;
var _dfa=null;
if(this._entityTokenRegistry.has(_df8)){
var list=this._entityTokenRegistry.get(_df8);
list.each(function(tn){
var _dfd=true;
if(tn.node.isTreeLockEnabled()){
_dfa=tn;
_dfd=false;
}
return _dfd;
});
if(_dfa!=null){
if(!_dfa.isFocused){
this.focusSingleTreeNodeBinding(_dfa,true);
}else{
_dfa.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_dfa==null&&_df9!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_df8);
self._focusTreeNodeByEntityToken(_df8,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_dff){
var _e00=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e01=this.getRootTreeNodeBindings();
while(_e01.hasNext()){
var _e02=_e01.getNext();
_e00.add(_e02.node.getEntityToken());
}
}else{
_e00.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e00.hasNext()){
var _e03=_e00.getNext();
var _e04=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e03,_dff,_e04);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e07=this._treeNodeBindings;
var _e08=new Map();
function fix(_e09,list){
if(!_e09.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e07.has(node.getHandle())){
var _e0c=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e08.set(node.getHandle(),_e0c);
_e09.add(_e0c);
}
});
_e09.attachRecursive();
}
}
_e09.open(true);
}
map.each(function(_e0d,list){
if(_e07.has(_e0d)){
var _e0f=_e07.get(_e0d);
fix(_e0f,list);
}else{
if(_e08.has(_e0d)){
var _e10=_e08.get(_e0d);
fix(_e10,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e11,arg){
switch(_e11){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e13=arg;
if(_e13!=null){
this._invokeServerRefresh(_e13);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e14=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e14;
_e14.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e14=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e14;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e15){
if(_e15!=null&&_e15=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e15)){
var list=this._entityTokenRegistry.get(_e15).reset();
this._refreshToken=_e15;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e17=list.getNext();
this._refreshingTreeNodes.set(_e17.key,true);
setTimeout(function(){
_e17.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e18=this.getFocusedTreeNodeBindings().getFirst();
if(_e18){
var _e19=_e18.getLabel();
var _e1a=_e18.getAncestorBindingByLocalName("treenode");
if(_e1a){
_e18=_e1a;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e18.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e1b=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e1b,[_e19]);
}
_e18.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e1c=SystemTreeBinding.clipboard;
if(_e1c){
var type=_e1c.dragType;
var _e1e=this.getFocusedTreeNodeBindings().getFirst();
if(_e1e.dragAccept){
if(_e1e.acceptor.isAccepting(type)){
this._performPaste(_e1e);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e1f){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e1f.node.hasDetailedDropSupport()){
if(_e1f.node.hasChildren()){
var _e21=_e1f.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e22,_e23){
if(_e22==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e24=_e23.get("switch");
var _e25=_e23.get("sibling");
if(_e24=="after"){
_e25++;
}
var _e26=_e1f.accept(SystemTreeBinding.clipboard,_e25);
if(_e26){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e21);
}else{
Application.lock(self);
var _e27=_e1f.accept(SystemTreeBinding.clipboard,0);
if(_e27){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e27=_e1f.accept(SystemTreeBinding.clipboard,0);
if(_e27){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e28=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e28!=null){
this._focusTreeNodeByEntityToken(_e28);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e29){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e29){
this.blurSelectedTreeNodes();
var _e2a=this.getRootTreeNodeBindings();
_e2a.each(function(_e2b){
if(_e2b.isContainer&&_e2b.isOpen){
_e2b.close();
_e2b.hasBeenOpened=false;
_e2b.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e2c){
if(_e2c!=this.isLockedToEditor){
this.isLockedToEditor=_e2c;
if(_e2c){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e2e=this.getRootTreeNodeBindings();
_e2e.each(function(_e2f){
var _e30=_e2f.getOpenSystemNodes();
if(_e30!=null&&_e30.hasEntries()){
list.merge(_e30);
}else{
if(_e2f.isOpen){
list.add(_e2f.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e31){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e31);
if(_e31!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e33=new Map();
var _e34=this.getFocusedTreeNodeBindings();
var _e35=_e34.getFirst().node.getActionProfile();
var self=this;
_e35.each(function(_e37,list){
var _e39=new List();
list.each(function(_e3a){
if(_e3a.getActivePositions()&self._activePosition){
_e39.add(_e3a);
}
});
if(_e39.hasEntries()){
_e33.set(_e37,_e39);
}
});
_e33.activePosition=this._activePosition;
return _e33;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e3b,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e3b,arg);
switch(_e3b){
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
var _e40=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e40.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e41=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e41.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e42){
SystemTreePopupBinding.superclass.handleAction.call(this,_e42);
switch(_e42.type){
case MenuItemBinding.ACTION_COMMAND:
var _e43=_e42.target;
var _e44=_e43.associatedSystemAction;
if(_e44){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e46=list.getFirst();
var _e47=_e46.node;
}
SystemAction.invoke(_e44,_e47);
}else{
var cmd=_e43.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e4a=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e4a=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e4a=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e4a=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e4a=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e4a){
setTimeout(function(){
EventBroadcaster.broadcast(_e4a);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e4b=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e4b.hasNext()){
var _e4c=UserInterface.getBinding(_e4b.getNext());
if(!_e4c.getProperty("rel")){
_e4c.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e4e=new List();
var self=this;
this._actionProfile.each(function(_e50,list){
var _e52=MenuGroupBinding.newInstance(doc);
list.each(function(_e53){
var _e54=self.getMenuItemBinding(_e53);
_e52.add(_e54);
});
_e4e.add(_e52);
});
_e4e.reverse();
while(_e4e.hasNext()){
this._bodyBinding.addFirst(_e4e.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e55){
var _e56=MenuItemBinding.newInstance(this.bindingDocument);
var _e57=_e55.getLabel();
var _e58=_e55.getToolTip();
var _e59=_e55.getImage();
var _e5a=_e55.getDisabledImage();
var _e5b=_e55.isCheckBox();
if(_e57){
_e56.setLabel(_e57);
}
if(_e58){
_e56.setToolTip(_e58);
}
if(_e59){
_e56.imageProfile=new ImageProfile({image:_e59,imageDisabled:_e5a});
}
if(_e5b){
_e56.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e55.isChecked()){
_e56.check(true);
}
}
if(_e55.isDisabled()){
_e56.disable();
}
_e56.associatedSystemAction=_e55;
return _e56;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e5f=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e5f=UserInterface.getBinding(node);
if(_e5f.isDisabled){
_e5f=null;
}
}
break;
}
if(_e5f!=null&&_e5f.node!=null&&_e5f.node.getActionProfile()!=null){
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
var _e60=this.node.getLabel();
if(_e60){
this.setLabel(_e60);
}
var _e61=this.node.getToolTip();
if(_e61){
this.setToolTip(_e61);
}
var _e62=this.node.getHandle();
if(_e62){
this.setHandle(_e62);
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
var _e65="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e65+=list.getNext();
if(list.hasNext()){
_e65+=" ";
}
}
this.setProperty("dragaccept",_e65);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e67){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e67);
switch(_e67.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e67.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e67.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e68,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e68,arg);
switch(_e68){
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
var _e6b=null;
var _e6c=this.node.getImageProfile();
if(_e6c){
if(this.isOpen){
_e6b=_e6c.getActiveImage();
}else{
_e6b=_e6c.getDefaultImage();
}
}
if(!_e6b){
_e6b=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e6b;
};
SystemTreeNodeBinding.prototype.open=function(_e6d){
var _e6e=this.isContainer&&!this.isOpen;
var _e6f=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e6e&&(_e6f||SystemTreeBinding.HAS_NO_MEMORY)&&_e6d!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e70=null;
if(this.isContainer){
_e70=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e70);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e72){
if(_e72!=null){
this._refreshBranch(_e72);
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
var _e73=new List();
var _e74=this.node.getChildren();
this.empty();
if(_e74.hasEntries()){
this._insertTreeNodesRegulated(_e74);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e75){
var _e76=0;
var _e77=new List([]);
while(_e75.hasEntries()&&_e76<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e78=SystemTreeNodeBinding.newInstance(_e75.extractFirst(),this.bindingDocument);
_e78.autoExpand=this.autoExpand;
this.add(_e78);
_e78.attach();
_e76++;
if(this.autoExpand){
if(_e76==1&&!_e75.hasEntries()||LastOpenedSystemNodes.isOpen(_e78)){
_e77.add(_e78);
}
}
}
if(_e75.hasEntries()){
this._insertBufferTreeNode(_e75);
}
_e77.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e7b){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e7d=this.node.getDescendantBranch(list);
if(_e7d.hasEntries()){
this.XXX(_e7d);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e7e){
var self=this;
var map=new Map();
this.empty();
_e7e.each(function(key,_e82){
if(_e82.hasEntries()){
_e82.each(function(node){
var _e84=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e84);
if(map.has(key)){
var _e85=map.get(key);
_e85.add(_e84);
_e85.isOpen=true;
_e85.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e84);
}else{
}
}
});
}
});
this.attachRecursive();
_e7e.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e86=new TreeCrawler();
var _e87=new List();
_e86.mode=TreeCrawler.MODE_GETOPEN;
_e86.crawl(this.bindingElement,_e87);
if(_e87.hasEntries()){
_e87.extractFirst();
}
_e86.dispose();
return _e87;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e88=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e88=new List([this.node]);
list.each(function(_e8a){
_e88.add(_e8a.node);
});
}
return _e88;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e8b,_e8c){
var _e8d=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e8b instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e8b.node.getData(),this.node.getData(),_e8c?_e8c:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e8d);
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
SystemTreeNodeBinding.newInstance=function(node,_e91){
var _e92=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e91);
var _e93=UserInterface.registerBinding(_e92,SystemTreeNodeBinding);
_e93.node=node;
return _e93;
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
SystemPageBinding.prototype.setPageArgument=function(_e94){
this.node=_e94;
SystemPageBinding.superclass.setPageArgument.call(this,_e94);
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
var _e95=this.node.getChildren();
if(_e95.hasEntries()){
while(_e95.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e95.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e97=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e97.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e99=new TreeCrawler();
var _e9a=new List();
_e99.mode=TreeCrawler.MODE_GETOPEN;
_e99.crawl(this.bindingElement,_e9a);
_e99.dispose();
var list=new List([this.node]);
_e9a.each(function(_e9c){
list.add(_e9c.node);
});
this._tree.empty();
var _e9d=this.node.getDescendantBranch(list);
if(_e9d.hasEntries()){
var self=this;
var map=new Map();
_e9d.each(function(key,_ea1){
_ea1.each(function(node){
var _ea3=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ea3);
if(map.has(key)){
var _ea4=map.get(key);
_ea4.add(_ea3);
_ea4.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ea3);
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
SystemPageBinding.prototype.handleAction=function(_ea5){
SystemPageBinding.superclass.handleAction.call(this,_ea5);
switch(_ea5.type){
case ButtonBinding.ACTION_COMMAND:
var _ea6=_ea5.target;
switch(_ea6.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ea6.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ea7,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ea7,arg);
switch(_ea7){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ea9=arg;
if(this.node&&this.node.getEntityToken()==_ea9){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ea9);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ea9);
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
StageContainerBinding.prototype.handleBroadcast=function(_eab,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_eab,arg);
var _ead=this.bindingWindow.WindowManager;
switch(_eab){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ead.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ead.WINDOW_RESIZED_BROADCAST:
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
var _eaf=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eaf.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_eb0){
if(StageBinding.isViewOpen(_eb0)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_eb0);
}else{
var _eb1=ViewDefinitions[_eb0];
StageBinding.presentViewDefinition(_eb1);
}
};
StageBinding.isViewOpen=function(_eb2){
return StageBinding.bindingInstance._activeViewDefinitions[_eb2]!=null;
};
StageBinding.presentViewDefinition=function(_eb3){
if(_eb3.label!=null){
var _eb4=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_eb4,[_eb3.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_eb3);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_eb6,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _eb8=System.getPerspectiveNodes();
if(_eb8.hasEntries()){
this._initializeSystemViewDefinitions(_eb8);
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
var _eba=null;
if(LocalStore.isEnabled){
_eba=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_eba&&ViewDefinitions[_eba]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_eba));
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
var _ebc=root.getActionProfile();
if(_ebc&&_ebc.hasEntries()){
var _ebd=top.app.bindingMap.toolsmenugroup;
if(_ebd){
_ebc.each(function(_ebe,list){
list.each(function(_ec0){
var item=MenuItemBinding.newInstance(_ebd.bindingDocument);
item.setLabel(_ec0.getLabel());
item.setToolTip(_ec0.getToolTip());
item.setImage(_ec0.getImage());
item.setDisabled(_ec0.isDisabled());
item.associatedSystemAction=_ec0;
var _ec2=_ebd;
var tag=_ec0.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ec2=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ec2.add(item);
});
});
_ebd.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ec4){
while(_ec4.hasNext()){
var node=_ec4.getNext();
var _ec6=node.getHandle();
ViewDefinitions[_ec6]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ec7){
StageBinding.superclass.handleAction.call(this,_ec7);
var _ec8=_ec7.target;
switch(_ec7.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ec8;
this._inflateBinding(_ec8);
_ec7.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ec8;
this._inflateBinding(_ec8);
_ec7.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ec8);
_ec7.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ec8 instanceof DockBinding){
switch(_ec8.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ec8.reference,_ec8);
break;
}
this.handleAttachedDock(_ec8);
_ec7.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ec8 instanceof DockBinding){
this.handleSelectedDockTab(_ec8.getSelectedTabBinding());
_ec7.consume();
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
_ec7.consume();
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
_ec7.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ec7);
};
StageBinding.prototype.handleBroadcast=function(_eca,arg){
StageBinding.superclass.handleBroadcast.call(this,_eca,arg);
switch(_eca){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ecc=arg;
this._dontView(_ecc);
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
StageBinding.prototype._showStart=function(_ece){
if(_ece!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ed1=this.bindingWindow.bindingMap.maindecks;
if(_ece){
_ed1.select("startdeck");
view.show();
}else{
view.hide();
_ed1.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ece;
}
};
StageBinding.prototype._inflateBinding=function(_ed2){
for(var _ed3 in ViewDefinitions){
var _ed4=ViewDefinitions[_ed3];
if(_ed4 instanceof SystemViewDefinition){
_ed2.mountDefinition(_ed4);
}
}
var _ed5=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ed5){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ed8=new StageCrawler();
_ed8.mode=mode;
_ed8.crawl(this.bindingElement);
_ed8.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ed9){
var _eda=_ed9.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_eda);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_eda));
}
};
StageBinding.prototype.handleAttachedDock=function(_edb){
var _edc=_edb.getTabBindings();
if(_edc.hasEntries()){
while(_edc.hasNext()){
var _edd=_edc.getNext();
var _ede=_edd.getHandle();
if(_ede){
if(_ede=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _edf=ViewDefinitions[_ede];
if(_edf){
this._view(_edb,_edd,_edf,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ede+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ee0){
var _ee1=null;
var _ee2=false;
switch(_ee0.position){
case Dialog.MODAL:
_ee1=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ee1=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ee0.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ee1=this._dockBindings.get(_ee0.position);
break;
case DockBinding.EXTERNAL:
window.open(_ee0.url);
_ee2=true;
break;
default:
var _ee3=this._decksBinding.getSelectedDeckBinding();
_ee1=_ee3.getDockBindingByReference(_ee0.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ee4=this.bindingWindow.bindingMap.maindecks;
_ee4.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ee2=true;
}
break;
}
if(!_ee2){
if(_ee1!=null){
this._view(_ee1,null,_ee0,true);
}else{
throw "StageBinding: Could not position view: "+_ee0.handle;
}
}
};
StageBinding.prototype._view=function(_ee5,_ee6,_ee7,_ee8){
var _ee9=_ee7.handle;
if(_ee7.isMutable){
_ee9+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ee9]){
var _eea=ViewBinding.getInstance(_ee9);
if(_eea!=null){
_eea.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ee9);
}
}else{
this._activeViewDefinitions[_ee9]=_ee7;
Application.lock(this);
switch(_ee5.constructor){
case DockBinding:
if(_ee8){
_ee5.prepareNewView(_ee7);
}else{
_ee5.prepareOpenView(_ee7,_ee6);
}
break;
case StageDialogBinding:
if(_ee8){
_ee5.prepareNewView(_ee7);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_eeb){
if(this._activeViewDefinitions[_eeb]!=null){
delete this._activeViewDefinitions[_eeb];
}else{
this.logger.debug("Could not unregister active view: "+_eeb);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_eec){
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
this.addFilter(function(_eee){
var _eef=UserInterface.getBinding(_eee);
var _ef0=null;
if(_eef){
switch(_eef.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_eef.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_eef.handleUnMaximization();
break;
}
break;
case DockBinding:
_ef0=NodeCrawler.SKIP_NODE;
break;
}
}
return _ef0;
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
var _ef1=null;
this._dialogs.each(function(_ef2){
if(!_ef2.isVisible){
_ef1=_ef2;
}
return _ef1!=null;
});
if(!_ef1){
this._newInstance();
_ef1=this._dialogs.getLast();
}
_ef1.setModal(false);
return _ef1;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _ef3=this.getInstance();
_ef3.setModal(true);
return _ef3;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _ef4=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_ef4);
_ef4.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ef5){
if(_ef5 instanceof DialogViewDefinition){
var _ef6=ViewBinding.newInstance(this.bindingDocument);
_ef6.setDefinition(_ef5);
_ef6.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ef5.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ef5.handler)){
this._dialogResponseHandler=_ef5.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ef6;
this._body.add(_ef6);
_ef6.attach();
_ef6.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ef7){
StageDialogBinding.superclass.handleAction.call(this,_ef7);
var _ef8=_ef7.target;
switch(_ef7.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ef8);
_ef7.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ef8.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ef7.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ef8.response){
this._handleDialogPageResponse(_ef8);
}
_ef7.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ef7.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ef7.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ef8.dispose();
_ef7.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ef7.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ef7.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ef7.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ef7.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ef7.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ef8==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ef9,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ef9,arg);
switch(_ef9){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_efb){
var _efc=new FitnessCrawler();
var list=new List();
if(_efb){
_efc.mode=FitnessCrawler.MODE_BRUTAL;
}
_efc.crawl(this.bindingElement,list);
_efc.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_efe){
_efe.fit(_efb);
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
var _eff=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_eff){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f01){
var cmd=_f01.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f03){
if(_f03.bindingDocument==this._viewBinding.getContentDocument()){
if(_f03 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f03);
}
this._pageBinding=_f03;
if(_f03.height=="auto"){
_f03.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f03);
_f03.enableAutoHeightLayoutMode(false);
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
if(_f03.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f03);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f04){
var _f05=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f05){
var _f06=UserInterface.getBinding(_f05);
_f06.setDisabled(_f04);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f07){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f07.response,_f07.result!=null?_f07.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f09){
if(_f09.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f09);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f0b){
switch(_f0b.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f0b.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f0b.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f0c){
var _f0d=_f0c.label;
var _f0e=_f0c.image;
var _f0f=_f0c.width;
var _f10=_f0c.height;
var _f11=_f0c.controls;
var _f12=_f0c.isResizable;
if(_f0d){
this.setLabel(_f0d);
}
if(_f0e){
this.setImage(_f0e);
}
if(_f0f||_f10){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f0f?_f0f:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f10!=null&&_f10!="auto")?_f10:old.h;
this.setDimension(nev);
}
if(_f11){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f16=new List(_f11.split(" "));
while((type=_f16.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f12!=this._isResizable){
this.setResizable(_f12);
}
if(_f10=="auto"){
this._fixAutoHeight(_f0c);
}
if(_f0c==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f17){
var dim=this.getDimension();
var _f19=0;
var _f1a=0;
if(_f17.isDialogSubPage){
_f17=this._pageBinding;
}
if(this._isFirstPage){
_f19=_f17.width!=null?_f17.width:dim.w;
}else{
_f19=dim.w;
}
_f1a=_f17.bindingElement.offsetHeight;
_f1a+=this._titlebar.bindingElement.offsetHeight;
_f1a+=4;
if(_f1a<dim.h){
_f1a=dim.h;
}
if(_f17.minheight!=null){
if(_f1a<_f17.minheight){
_f1a=_f17.minheight;
}
}
this.setDimension(new Dimension(_f19,_f1a));
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
StageDialogBinding.newInstance=function(_f1d){
var _f1e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f1d);
var _f1f=UserInterface.registerBinding(_f1e,StageDialogBinding);
_f1f.setProperty("controls","minimize maximize close");
return _f1f;
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
this.addFilter(function(_f20,list){
var _f22=null;
var _f23=UserInterface.getBinding(_f20);
if(!_f23.isVisible){
_f22=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f22;
});
this.addFilter(function(_f24,list){
var _f26=null;
var _f27=UserInterface.getBinding(_f24);
if(_f27.isAttached){
if(Interfaces.isImplemented(IFit,_f27)){
if(!_f27.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f27);
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
StageDecksBinding.prototype.mountDefinition=function(_f28){
var _f29=StageDeckBinding.newInstance(this.bindingDocument);
_f29.handle=_f28.handle;
_f29.perspectiveNode=_f28.node;
this._decks[_f29.handle]=_f29;
this.add(_f29);
_f29.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f2a){
var _f2b=this._decks[_f2a];
StageBinding.perspectiveNode=_f2b.perspectiveNode;
this.select(_f2b);
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
StageDeckBinding.prototype.handleAction=function(_f2c){
StageDeckBinding.superclass.handleAction.call(this,_f2c);
var _f2d=_f2c.target;
switch(_f2c.type){
case WindowBinding.ACTION_LOADED:
if(_f2d==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f2c.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f2d instanceof DockBinding){
this._dockBindings.set(_f2d.reference,_f2d);
_f2d.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f2c.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f2c.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f2c);
StageDeckBinding.superclass.handleAction.call(this,_f2c);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f2f=new StageCrawler();
_f2f.mode=mode;
_f2f.crawl(this.windowBinding.getContentDocument().body);
_f2f.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f30){
return this._dockBindings.get(_f30);
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
StageDeckBinding.newInstance=function(_f32){
var _f33=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f32);
var _f34=UserInterface.registerBinding(_f33,StageDeckBinding);
return _f34;
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
StageSplitBoxBinding.prototype.handleAction=function(_f35){
StageSplitBoxBinding.superclass.handleAction.call(this,_f35);
StageBoxAbstraction.handleAction.call(this,_f35);
var _f36=_f35.target;
var _f37=null;
var _f38=null;
switch(_f35.type){
case DockBinding.ACTION_EMPTIED:
_f38=this.getChildBindingByLocalName("splitter");
if(_f38.isVisible){
_f38.hide();
}
_f37=this.getDescendantBindingsByLocalName("dock");
if(_f37.getFirst().isEmpty&&_f37.getLast().isEmpty){
if(_f37.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f35.consume();
break;
case DockBinding.ACTION_OPENED:
_f37=this.getDescendantBindingsByLocalName("dock");
if(!_f37.getFirst().isEmpty&&!_f37.getLast().isEmpty){
_f38=this.getChildBindingByLocalName("splitter");
if(!_f38.isVisible){
_f38.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f35.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f36!=this){
_f38=this.getChildBindingByLocalName("splitter");
if(_f38.isVisible){
_f38.hide();
}
this.invokeLayout();
_f35.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f36!=this){
var _f39=this.getChildBindingsByLocalName("splitpanel");
if(_f39.getFirst().isVisible&&_f39.getLast().isVisible){
_f38=this.getChildBindingByLocalName("splitter");
if(!_f38.isVisible){
_f38.show();
}
}
this.invokeLayout();
_f35.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f3a){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f3a);
switch(_f3a.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f3a.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f3b=this.getChildBindingsByLocalName("splitpanel");
return _f3b.getFirst().isVisible&&_f3b.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f3c=this.getChildBindingsByLocalName("splitpanel");
return _f3c.getFirst().isFixed&&_f3c.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f3d){
StageSplitPanelBinding.superclass.handleAction.call(this,_f3d);
StageBoxAbstraction.handleAction.call(this,_f3d);
switch(_f3d.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f3d.type==StageSplitBoxBinding.ACTION_HIDE){
_f3d.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f3d.type==DockBinding.ACTION_EMPTIED){
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
if(_f3d.type==StageSplitBoxBinding.ACTION_SHOW){
_f3d.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f40=_f3d.target;
if(_f40!=this&&_f40.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f41=_f40._containingSplitBoxBinding;
if(_f41.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f42=_f41.getChildBindingsByLocalName("splitpanel");
var _f43=_f42.getFirst();
var _f44=_f42.getLast();
if(this.isFixed==true){
if(!_f43.isFixed||!_f44.isFixed||(!_f41.hasBothPanelsVisible()&&_f40.isMinimizedForReal)){
this.setFix(false);
_f3d.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f41.hasBothPanelsFixed()||(!_f41.hasBothPanelsVisible()&&_f40.isMinimizedForReal)){
this.setFix(_f40.getContainedDock().getHeight());
_f3d.consume();
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
var _f45=this.getContainedDock();
if(_f45){
if(this.isMaximizePrepared==true){
}else{
_f45.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f46=this.getContainedDock();
if(_f46){
if(_f46.type==DockBinding.TYPE_EDITORS){
if(_f46.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f46.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f47=this.getContainedDock();
if(_f47){
_f47.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f47);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f48=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f49=this.getContainedDock();
if(_f49){
_f49.collapse(_f48);
if(!_f48){
this.setFix(_f49.getHeight());
}else{
this.setFix(_f49.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f49&&_f49.isActive){
_f49.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f49);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f4a){
var _f4b=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f4c=this.getContainedDock();
if(_f4c){
if(this.isMinimized==true){
_f4c.unCollapse(_f4b);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f4a){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f4c){
_f4c.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f4c);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f4d){
var _f4e=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f4e=false;
}
}
if(_f4e==true){
this._invisibilize(_f4d);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f50){
if(_f50!=this._isInvisibilized){
if(_f50){
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
StageSplitterBinding.prototype.onDragStart=function(_f51){
var _f52=top.app.bindingMap.stagesplittercover;
var _f53=this._containingSplitBoxBinding.getOrient();
switch(_f53){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f52.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f52.bindingElement.style.cursor="n-resize";
break;
}
_f52.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f53);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f59){
this._orient=_f59;
this.attachClassName(_f59);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f5b=true;
var _f5c=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f5c=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f5b=false;
break;
}
if(_f5b){
this.bindingElement.style.left=pos.x+"px";
}
if(_f5c){
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
StageBoxAbstraction.handleAction=function(_f5e){
switch(_f5e.type){
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
if(_f5e.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f5e.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f5f=this.bindingElement.style;
_f5f.position="absolute";
_f5f.width="100%";
_f5f.height="100%";
_f5f.top="0";
_f5f.left="0";
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
var _f60=this.bindingElement.style;
_f60.position="relative";
_f60.width="auto";
_f60.height="auto";
_f60.top="auto";
_f60.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f61,_f62){
var _f63=_f61.bindingElement.style;
var _f64=_f61.bindingElement.parentNode;
var box=_f61._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f62){
_f61._unmodifiedFlexMethod=_f61.flex;
_f61.flex=function(){
_f63.width=_f64.offsetWidth+"px";
_f63.height=_f64.offsetHeight+"px";
};
}else{
_f63.width="100%";
_f63.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f63.width="auto";
_f63.height="auto";
box.reflex(true);
},0);
}
_f61.flex=_f61._unmodifiedFlexMethod;
_f61._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f66){
var _f67=_f66.target;
switch(_f66.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f67 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f66);
_f66.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f66.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f68){
var mode=null;
switch(_f68.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f6a){
StageMenuBarBinding.superclass.handleAction.call(this,_f6a);
switch(_f6a.type){
case MenuItemBinding.ACTION_COMMAND:
var _f6b=_f6a.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f6b){
SystemAction.invoke(_f6b,this._rootNode);
}
}
_f6a.consume();
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
var _f6c=this.getProperty("handle");
if(_f6c){
this._handle=_f6c;
if(StageBinding.isViewOpen(_f6c)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f6c);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f6e){
this.setProperty("handle",_f6e);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f6f,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f6f,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f6f){
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
StageViewMenuItemBinding.newInstance=function(_f71){
var _f72=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f71);
UserInterface.registerBinding(_f72,StageViewMenuItemBinding);
return UserInterface.getBinding(_f72);
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
StageStatusBarBinding.prototype.setLabel=function(_f73){
this._label.setLabel(_f73);
};
StageStatusBarBinding.prototype.setImage=function(_f74){
this._label.setImage(_f74);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f75){
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
var _f76=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f77=_f76.getAssociatedView();
var _f78=_f77.getContentWindow().bindingMap.tree;
var _f79=_f78.getFocusedTreeNodeBindings();
if(!_f79.hasEntries()&&StageBinding.treeSelector){
_f79=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f79;
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
ExplorerBinding.prototype.handleAction=function(_f7a){
ExplorerBinding.superclass.handleAction.call(this,_f7a);
var _f7b=_f7a.target;
switch(_f7a.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f7a.consume();
break;
case Binding.ACTION_DRAG:
if(_f7b instanceof ExplorerSplitterBinding){
_f7b.dragger.registerHandler(this);
}
_f7a.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f7d){
this._menuBinding.setSelectionByHandle(_f7d);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f7e){
if(_f7e instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f7e);
this._menuBinding.mountDefinition(_f7e);
}
};
ExplorerBinding.prototype.onDragStart=function(_f7f){
var _f80=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f80.hasEntries()){
var _f81=_f80.getFirst();
this._dragStart=_f81.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f81.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f85){
if(_f85 instanceof SystemViewDefinition){
var _f86=ViewBinding.newInstance(this.bindingDocument);
_f86.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f86.setDefinition(_f85);
var _f87=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f87.setAssociatedView(_f86);
this._decks[_f85.handle]=_f87;
_f87.add(_f86);
this.add(_f87);
function attach(){
_f87.attach();
_f86.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f88){
var _f89=this._decks[_f88];
this.select(_f89);
};
DecksBinding.prototype.expandBy=function(_f8a){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f8c=this.bindingElement.offsetHeight+_f8a;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f8c+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f8e){
var _f8f=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f8e);
return UserInterface.registerBinding(_f8f,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f90){
this._viewBinding=_f90;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f91=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f92=this._viewBinding.getDefinition().label;
StatusBar.busy(_f91,[_f92]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f93){
ExplorerDeckBinding.superclass.handleAction.call(this,_f93);
var _f94=_f93.target;
switch(_f93.type){
case PageBinding.ACTION_INITIALIZED:
if(_f94 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f94.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f95,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f95,arg);
switch(_f95){
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
var _f97=null;
if(this._isExplorerDeckBindingInitialized){
_f97=this._viewBinding.getDefinition().label;
}else{
_f97=DockTabBinding.LABEL_TABLOADING;
}
return _f97;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f98=null;
if(this._isExplorerDeckBindingInitialized){
_f98=this._viewBinding.getDefinition().image;
}else{
_f98=DockTabBinding.IMG_TABLOADING;
}
return _f98;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f99=null;
if(this._isExplorerDeckBindingInitialized){
_f99=this._viewBinding.getDefinition().toolTip;
}
return _f99;
};
ExplorerDeckBinding.newInstance=function(_f9a){
var _f9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f9a);
return UserInterface.registerBinding(_f9b,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f9c){
switch(_f9c.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f9c.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f9c.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f9c);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f9d){
this._maxButtons.set(_f9d.handle,this._mountMaxButton(_f9d));
this._minButtons.set(_f9d.handle,this._mountMinButton(_f9d));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f9e){
var _f9f=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f9f.setLabel(_f9e.label);
_f9f.setToolTip(_f9e.toolTip);
_f9f.handle=_f9e.handle;
_f9f.node=_f9e.node;
this._maxGroup.add(_f9f);
this._maxList.add(_f9f);
_f9f.attach();
return _f9f;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fa0){
var _fa1=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fa1.setLabel(_fa0.label);
_fa1.setToolTip(_fa0.label);
_fa1.handle=_fa0.handle;
_fa1.node=_fa0.node;
this._minGroup.addFirst(_fa1);
this._minList.add(_fa1);
_fa1.attach();
_fa1.hide();
return _fa1;
};
ExplorerMenuBinding.prototype.handleAction=function(_fa2){
ExplorerMenuBinding.superclass.handleAction.call(this,_fa2);
switch(_fa2.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fa3=_fa2.target;
var _fa4=_fa3.getCheckedButtonBinding();
var _fa5=_fa4.handle;
switch(_fa3){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fa5),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fa5),true);
break;
}
this._selectedHandle=_fa5;
this._selectedTag=_fa4.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fa2.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fa6){
var _fa7=this._maxButtons.get(_fa6);
if(_fa7){
_fa7.check();
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
var _fa8=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fa8=true;
}
return _fa8;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _faa=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_faa=true;
}
return _faa;
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
ExplorerToolBarBinding.newInstance=function(_fab){
var _fac=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fab);
return UserInterface.registerBinding(_fac,ExplorerToolBarBinding);
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
var _fad=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fae=_fad?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fae);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_faf,_fb0){
var _fb1=(_fb0==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fb2=DOMUtil.createElementNS(Constants.NS_UI,_fb1,_faf);
var _fb3=UserInterface.registerBinding(_fb2,ExplorerToolBarButtonBinding);
_fb3.explorerToolBarButtonType=_fb0;
return _fb3;
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
EditorBinding.registerComponent=function(_fb4,_fb5){
var _fb6=EditorBinding._components;
var _fb7=EditorBinding._editors;
var key=_fb5.key;
var _fb9=Interfaces.isImplemented(IWysiwygEditorComponent,_fb4);
if(!_fb9){
_fb9=Interfaces.isImplemented(ISourceEditorComponent,_fb4);
}
if(_fb9){
if(_fb7.has(key)){
_fb7.get(key).initializeEditorComponent(_fb4);
}else{
if(!_fb6.has(key)){
_fb6.set(key,new List());
}
_fb6.get(key).add(_fb4);
}
}else{
throw "Editor component interface not implemented: "+_fb4;
}
};
EditorBinding.claimComponents=function(_fba,_fbb){
var _fbc=EditorBinding._components;
var _fbd=EditorBinding._editors;
var key=_fbb.key;
_fbd.set(key,_fba);
var list=null;
if(_fbc.has(key)){
list=_fbc.get(key).copy();
_fbc.del(key);
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
var _fc1=this.getProperty("value");
if(_fc1!=null){
_fc1=decodeURIComponent(_fc1);
this._startContent=_fc1;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fc3=this.bindingWindow.DataManager;
_fc3.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fc5){
var _fc6=EditorBinding.claimComponents(this,_fc5);
if(_fc6!=null){
while(_fc6.hasNext()){
this.initializeEditorComponent(_fc6.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fc8=this.bindingWindow.DataManager;
if(_fc8.getDataBinding(name)){
_fc8.unRegisterDataBinding(name);
}
_fc8.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fc9=this.getEditorDocument();
if(_fc9!=null){
Application.framework(_fc9);
DOMEvents.addEventListener(_fc9,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fc9,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fc9,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fc9,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fcb){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fcb==true){
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
var _fcd=this.getCheckSum();
if(_fcd!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fcd;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fce=null;
if(Binding.exists(this._pageBinding)){
_fce=this._pageBinding.getCheckSum(this._checksum);
}
return _fce;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fd0=DOMEvents.getTarget(e);
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
if(_fd0.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fd2,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fd2,arg);
var _fd4=null;
switch(_fd2){
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
var _fd5=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fd5=false;
}
}
}else{
_fd4=DOMEvents.getTarget(arg);
if(_fd4&&_fd4.ownerDocument==this.getEditorDocument()){
_fd5=false;
}
}
if(_fd5){
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
EditorBinding.prototype._activateEditor=function(_fd6){
if(_fd6!=this._isActivated){
this._isActivated=_fd6;
EditorBinding.isActive=_fd6;
var _fd7=this.getEditorWindow().standardEventHandler;
var _fd8=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fd8!=null){
if(_fd6){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fd8.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fd7.enableNativeKeys(true);
}else{
_fd8.disable();
_fd7.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fd9=this.getEditorDocument().selection.createRange();
_fd9.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fda=false;
try{
if(!Client.isExplorer){
var _fdb=this.getEditorWindow().getSelection();
if(_fdb!=null){
_fda=_fdb.toString().length>0;
if(!_fda){
var _fdc=_fdb.getRangeAt(0);
var frag=_fdc.cloneContents();
var _fde=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fde.appendChild(frag.firstChild);
}
var img=_fde.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fda=true;
}
}
}
}
}else{
var _fdc=this.getEditorDocument().selection.createRange();
_fda=(_fdc&&_fdc.text)&&_fdc.text.length>0;
if(_fdc.commonParentElement&&VisualEditorBinding.isImageElement(_fdc.commonParentElement())){
_fda=true;
}
}
}
catch(exception){
}
return _fda;
};
EditorBinding.prototype.isCommandEnabled=function(_fe0){
var _fe1=true;
switch(_fe0){
case "Cut":
case "Copy":
case "Paste":
_fe1=this.getEditorDocument().queryCommandEnabled(_fe0);
break;
}
return _fe1;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fe5=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fe6=null;
if(cmd=="Paste"){
_fe6=null;
}else{
_fe6=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fe6);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fe5=true;
}
break;
}
return _fe5;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fe8=this.getContentWindow().bindingMap.toolbar;
var _fe9=_fe8.getButtonForCommand(cmd);
if(!_fe9){
throw "No button for command "+cmd;
}
return _fe9;
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
var _fec=this.getContentDocument().getElementById("focusableinput");
if(_fec!=null){
_fec.style.display="block";
FocusBinding.focusElement(_fec);
_fec.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fed){
EditorBinding.superclass.handleAction.call(this,_fed);
var _fee=_fed.target;
var self=this;
var _ff0=this.shadowTree.iframe;
switch(_fed.type){
case Binding.ACTION_DIRTY:
if(_fed.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_ff1){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_ff1);
};
EditorBinding.prototype.handleElement=function(_ff2){
return true;
};
EditorBinding.prototype.updateElement=function(_ff3){
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
var _ff6=this._menuGroups[rel];
if(_ff6 instanceof List){
_ff6.each(function(_ff7){
_ff7.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _ff9=this._menuGroups[rel];
if(_ff9 instanceof List){
_ff9.each(function(_ffa){
_ffa.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_ffb){
EditorPopupBinding.superclass.handleAction.call(this,_ffb);
var _ffc=_ffb.target;
if(_ffb.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_ffc.getProperty("cmd");
var gui=_ffc.getProperty("gui");
var val=_ffc.getProperty("val");
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
var _1000=this.bindingWindow.bindingMap.tinywindow;
var _1001=this.bindingWindow.bindingMap.codepresswindow;
if(_1000){
EditorBinding.registerComponent(this,_1000);
}else{
if(_1001){
EditorBinding.registerComponent(this,_1001);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1002,_1003,_1004,theme){
this._editorBinding=_1002;
this._tinyEngine=_1003;
this._tinyInstance=_1004;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1006,frame,_1008){
this._editorBinding=_1006;
this._codePressFrame=frame;
this._codePressEngine=_1008;
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
var _100b=this._editorBinding;
if(_100b!=null){
var self=this;
var _100d={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_100b.hasBookmark()){
_100b.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_100b.hasBookmark()){
_100b.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_100d);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_100d);
}
};
EditorClickButtonBinding.newInstance=function(_100f){
var _1010=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_100f);
return UserInterface.registerBinding(_1010,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1011){
var _1012=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1011);
return UserInterface.registerBinding(_1012,EditorToolBarButtonBinding);
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
var _1013=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1013);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_1014,_1015,_1016,theme){
this._editorBinding=_1014;
this._tinyEngine=_1015;
this._tinyInstance=_1016;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1018){
EditorSelectorBinding.superclass.handleAction.call(this,_1018);
switch(_1018.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_1018);
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
EditorMenuItemBinding.newInstance=function(_101c){
var _101d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_101c);
return UserInterface.registerBinding(_101d,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_101e){
var i=0,_1020,_1021=[],split=_101e.split(" ");
while((_1020=split[i++])!=null){
if(_1020.length>=3&&_1020.substring(0,3)=="mce"){
continue;
}else{
if(_1020.length>=14&&_1020.substring(0,14)=="compositemedia"){
continue;
}
}
_1021.push(_1020);
}
return _1021.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1023){
var _1024=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1023);
if(soap instanceof SOAPFault){
}else{
_1024=soap.XhtmlFragment;
if(!_1024){
_1024="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1024;
};
VisualEditorBinding.getTinyContent=function(_1026,_1027){
var _1028=null;
if(_1026==null||_1026==""){
_1026=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_1026);
if(soap instanceof SOAPFault){
var _102a=soap;
var _102b={handleDialogResponse:function(){
_1027.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_102b,_102a);
}else{
_1028=soap.XhtmlFragment;
if(_1028==null){
_1028=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1028;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _102e=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1030=new List(doc.documentElement.childNodes);
var _1031=new List();
_1030.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_1031.add(child);
}
});
var _1033=_1031.get(index);
if(_1033==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_1033.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_1033.hasChildNodes()){
frag.appendChild(_1033.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_102e=DOMSerializer.serialize(doc.documentElement);
_102e=_102e.substring(_102e.indexOf(">")+1,_102e.length);
_102e=_102e.substring(0,_102e.lastIndexOf("<"));
}
}
}
if(_102e==null){
_102e=new String("");
}
return _102e;
};
VisualEditorBinding.isImage=function(_1035){
result=_1035&&_1035.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_1036){
return VisualEditorBinding.isImage(_1036)&&!VisualEditorBinding.isReservedElement(_1036);
};
VisualEditorBinding.isReservedElement=function(_1037){
if(VisualEditorBinding.isFunctionElement(_1037)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1037)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1037)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1038){
return VisualEditorBinding.isImage(_1038)&&CSSUtil.hasClassName(_1038,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1039){
return VisualEditorBinding.isImage(_1039)&&CSSUtil.hasClassName(_1039,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_103a){
return VisualEditorBinding.isImage(_103a)&&CSSUtil.hasClassName(_103a,VisualEditorBinding.HTML_CLASSNAME);
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
var _103b=this.getProperty("embedablefieldstypenames");
if(_103b!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_103b);
}
var _103c=this.getProperty("formattingconfiguration");
if(_103c!=null){
this._url+="?config="+_103c;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_103d,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_103d,arg);
var _103f=this.getContentWindow().bindingMap.tinywindow;
var _1040=_103f.getContentWindow();
switch(_103d){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1040){
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
this.initializeEditorComponents(_103f);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1041){
_1041.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1042){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1042);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_1045){
var _1046=_1045;
if(!this._isNormalizedDocument(_1045)){
_1046=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_1045);
}
return _1046;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1047){
var _1048=false;
var doc=XMLParser.parse(_1047,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1048=true;
}
}
if(Client.isWebKit){
if(_1047.indexOf("<html")!==0){
_1048=false;
}
}
return _1048;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _104d=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_104d){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_104d=true;
}
return _104d;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _104f=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_104f);
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
if(Client.isExplorer&&this._tinyInstance.selection){
this._tinyInstance.selection.setRng(this._tinyInstance.selection.getRng());
}
};
VisualEditorBinding.prototype.setResult=function(_1051){
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
VisualEditorPopupBinding.prototype.configure=function(_1052,_1053,_1054){
var _1055=this.editorBinding.hasSelection();
this.tinyInstance=_1052;
this.tinyEngine=_1053;
this.tinyElement=_1054;
this.hasSelection=_1055;
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
var _1059=false;
if(this.hasSelection){
_1059=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1059=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1059=true;
}
}
}
}
if(_1059){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _105a=this.getMenuItemForCommand("compositeInsertLink");
var _105b=this.getMenuItemForCommand("unlink");
var _105c=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _105d=this.editorBinding.getButtonForCommand("unlink");
_105b.setDisabled(_105d.isDisabled);
if(_105b.isDisabled){
_105a.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_105a.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _105e=this.editorBinding.embedableFieldConfiguration;
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
if(_105e){
var _1061=_105e.getGroupNames();
if(_1061.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1061.each(function(_1065){
var _1066=_105e.getFieldNames(_1065);
_1066.each(function(_1067){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1067);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1065+":"+_1067);
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
var _1069=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _106a=null;
var _106b=null;
if(_1069){
if(_1069.nodeName=="TD"){
_106a=_1069.getAttribute("colspan");
_106b=_1069.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_106a=="1"&&_106b=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1069){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_106c){
var _106d=VisualEditorFormattingConfiguration._configurations;
if(!_106d.has(_106c)){
_106d.set(_106c,new VisualEditorFormattingConfiguration());
}
return _106d.get(_106c);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_106f){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1070){
var _1071=null;
var _1072=VisualEditorFieldGroupConfiguration._configurations;
if(!_1072.has(_1070)){
_1072.set(_1070,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1070)));
}
return _1072.get(_1070);
};
function VisualEditorFieldGroupConfiguration(_1073){
var _1074=new Map();
new List(_1073).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1074.set(group.GroupName,map);
});
this._groups=_1074;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1078){
return this._groups.get(_1078).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1079,_107a){
return this._groups.get(_1079).get(_107a).xhtml;
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
var _107c=this.getDescendantElementsByLocalName("textarea");
while(_107c.hasNext()){
var _107d=_107c.getNext();
if(_107d.getAttribute("selected")=="true"){
this._startContent=_107d.value;
this._textareaname=_107d.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _107f=this.getContentWindow().bindingMap.templatetree;
_107f.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1080){
var _1081=_107f.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1081.textareaname);
_1080.consume();
}});
_107f.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1082){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1083=this.getContentWindow().bindingMap.toolsplitter;
_1083.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1084=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1084.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1084);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1085){
this._textareas=new Map();
while(_1085.hasNext()){
var _1086=_1085.getNext();
var _1087=_1086.getAttribute("placeholderid");
this._textareas.set(_1087,{placeholderid:_1087,placeholdername:_1086.getAttribute("placeholdername"),placeholdermarkup:_1086.value,textareaelement:_1086,isSelected:_1086.getAttribute("selected")=="true"});
}
var _1088=new Map();
this._textareas.each(function(name,_108a){
var _108b=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_108b.setLabel(_108a.placeholdername);
_108b.setImage("${icon:placeholder}");
_108b.setProperty("placeholder",true);
_108b.textareaname=name;
_1088.set(_108a.placeholdername,_108b);
if(_108a.isSelected){
selected=_108b;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _108c=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_108c.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _108d=this.getContentWindow().bindingMap.templatetree;
var _108e=_108d.add(TreeNodeBinding.newInstance(_108d.bindingDocument));
_108e.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_108e.setImage("${icon:warning}");
_108e.attach();
var _108f=this.getContentWindow().bindingMap.statusbar;
_108f.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1091=this._textareas.get(name);
var _1092=_1091.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1092));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1093){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1093;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1094=this.getContentWindow().bindingMap.statusbar;
_1094.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1093);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1097="";
if(this._heads.has(this._textareaname)){
_1097=this._heads.get(this._textareaname);
if(_1097==null){
_1097=new String("");
}
}
return _1097;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1099){
_1099.textareaelement.value=_1099.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_109a,_109b){
var _109c=_109a.getElementsByTagName("div").item(0);
var _109d=_109b.getElementsByTagName("div").item(0);
var _109e=new List(_109c.getElementsByTagName("textarea"));
var _109f=new List(_109d.getElementsByTagName("textarea"));
var _10a0=false;
if(_109e.getLength()!=_109f.getLength()){
_10a0=true;
}else{
var index=0;
_109e.each(function(_10a2,index){
var _10a4=_109f.get(index);
var newid=_10a2.getAttribute("placeholderid");
var oldid=_10a4.getAttribute("placeholderid");
var _10a7=_10a2.getAttribute("placeholdername");
var _10a8=_10a4.getAttribute("placeholdername");
if(newid!=oldid||_10a7!=_10a8){
_10a0=true;
}
return !_10a0;
});
}
if(_10a0){
var html=null;
if(_109c.innerHTML!=null){
html=_109c.innerHTML;
}else{
html=DOMSerializer.serialize(_109c);
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
var _10ac=this.getDescendantBindingByLocalName("selector");
_10ac.attach();
this._populateTemplateSelector();
var _10ad=this.getContentWindow().bindingMap.templateselector;
_10ad.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10ae=this.getDescendantBindingByLocalName("selector");
var _10af=this.getContentWindow().bindingMap.templateselector;
_10ae.selections.each(function(_10b0){
_10b0.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10af.populateFromList(_10ae.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10b1=this.getDescendantBindingByLocalName("selector");
var _10b2=this.getContentWindow().bindingMap.templateselector;
_10b1.selectByValue(_10b2.getValue());
_10b1.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10b3){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10b8,_10b9){
var _10ba=_10b9;
if(old.has(_10b8)){
_10ba=old.get(_10b8).placeholdermarkup;
}
return _10ba;
}
while(_10b3.hasNext()){
var _10bb=_10b3.getNext();
var _10bc=_10bb.getAttribute("placeholderid");
this._textareas.set(_10bc,{placeholderid:_10bc,placeholdername:_10bb.getAttribute("placeholdername"),placeholdermarkup:compute(_10bc,_10bb.value),textareaelement:_10bb,isSelected:_10bb.getAttribute("selected")=="true"});
}
var _10bd=null;
var _10be=this.getContentWindow().bindingMap.templatetree;
var _10bf=new Map();
this._textareas.each(function(name,_10c1){
var _10c2=_10be.add(TreeNodeBinding.newInstance(_10be.bindingDocument));
_10c2.setLabel(_10c1.placeholdername);
_10c2.setImage("${icon:placeholder}");
_10c2.setProperty("placeholder",true);
_10c2.textareaname=name;
_10bf.set(_10c1.placeholdername,_10c2);
if(_10c1.isSelected){
_10bd=_10c2;
}
});
_10be.attachRecursive();
if(_10bd!=null){
var _10c3=true;
if(this._oldtextareas.hasEntries()){
_10c3=false;
var map=new Map();
this._textareas.each(function(id,_10c6){
map.set(_10c6.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10c3=true;
}
}
if(_10c3){
var _10c7=this._textareas.get(_10bd.textareaname);
this._textareaname=_10bd.textareaname;
this._placeholdername=_10c7.placeholdername;
this._setContentFromPlaceHolder(_10bd.textareaname);
_10bd.focus();
}else{
var _10c8=_10bf.get(this._placeholdername);
this._textareaname=_10c8.textareaname;
_10c8.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10c9,_10ca){
var _10cb=_10c9.getElementsByTagName("ui:selector").item(0);
var _10cc=_10ca.getElementsByTagName("ui:selector").item(0);
var _10cd=false;
if(_10cb!=null&&_10cc!=null){
var _10ce=new List(_10cb.getElementsByTagName("ui:selection"));
var _10cf=new List(_10cc.getElementsByTagName("ui:selection"));
if(_10ce.getLength()!=_10cf.getLength()){
_10cd=true;
}else{
_10ce.each(function(_10d0,index){
var _10d2=_10d0.getAttribute("value");
var _10d3=_10cf.get(index).getAttribute("value");
if(_10d2!=_10d3){
_10cd=true;
}
return !_10cd;
});
}
}
if(_10cd){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10cb);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10c9,_10ca);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10d5,frame,_10d7){
this._editorBinding=_10d5;
this._codePressFrame=frame;
this._codePressEngine=_10d7;
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
var _10dd=this.getProperty("validate");
if(_10dd==true){
this._hasStrictValidation=true;
}
var _10de=this.getProperty("validator");
if(_10de!=null){
this._validator=_10de;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10df,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10df,arg);
switch(_10df){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10e1=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10e1!=null){
var _10e2=_10e1.getContentWindow();
if(arg.broadcastWindow==_10e2){
this._codemirrorWindow=_10e2;
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
this.initializeEditorComponents(_10e1);
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
this.unsubscribe(_10df);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10e6){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10e6);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10e7){
if(_10e7!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10e7;
EditorBinding.isActive=_10e7;
var _10e8=this.getContentWindow().standardEventHandler;
if(_10e7){
_10e8.enableNativeKeys(true);
}else{
_10e8.disableNativeKeys();
}
var _10e9=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10e9!=null){
if(_10e7){
_10e9.enable();
}else{
_10e9.disable();
}
}
if(_10e7){
this.focus();
var _10ea=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10ee=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10ee;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10ef){
_10ef.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10f1){
if(!this._isFinalized){
if(_10f1!=this._startContent){
this._startContent=_10f1;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10f1);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10f2=this.getContentWindow().bindingMap.editorpage.getContent();
if(_10f2!=null){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10f2=_10f2.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
break;
}
}
return _10f2?_10f2:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_10f3){
if(this._pageBinding!=null){
this._pageBinding.cover(_10f3);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10f4){
if(_10f4!=null&&this.shadowTree.dotnetinput!=null){
var value=_10f4.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10f6=true;
var _10f7=this.getContent();
if(this._validator!=null){
_10f6=Validator.validateInformed(_10f7,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10f6=XMLParser.isWellFormedDocument(_10f7,true);
if(_10f6==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10f6=this._isValidHTML(_10f7);
break;
}
}
break;
}
}
return _10f6;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10f9=true;
var doc=XMLParser.parse(xml);
var _10fb=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10fb.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10fb.add("NamespaceURI");
}
var head=null,body=null;
var _10ff=new List(root.childNodes);
while(_10ff.hasNext()){
var child=_10ff.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10fb.add("MultipleHead");
}
if(body!=null){
_10fb.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10fb.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10fb.add("MissingHead");
}
if(body==null){
_10fb.add("MissingBody");
}
}
if(_10fb.hasEntries()){
_10f9=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10fb.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10fb.getFirst()));
}
}
return _10f9;
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
var _1101=null;
var page=this._pageBinding;
if(page!=null){
_1101=page.getCheckSum();
}
return _1101;
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
ThrobberBinding.prototype.handleBroadcast=function(_1103,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1103,arg);
switch(_1103){
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
ProgressBarBinding.notch=function(_1106){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1106);
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
ProgressBarBinding.prototype.notch=function(_1108){
_1108=_1108?_1108:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1108);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_110a,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_110a,arg);
switch(_110a){
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
StartMenuItemBinding.prototype.setChecked=function(_110c,_110d){
StartMenuItemBinding.superclass.setChecked.call(this,_110c,_110d);
if(!_110d){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_110e){
var _110f=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_110e);
UserInterface.registerBinding(_110f,StartMenuItemBinding);
return UserInterface.getBinding(_110f);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1112,_1113){
var _1114=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1113,true)==true){
if(_1112!="*"){
_1112=KeySetBinding._sanitizeKeyModifiers(_1112);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1114[doc]){
_1114[doc]={};
}
if(!_1114[doc][code]){
_1114[doc][code]={};
}
_1114[doc][code][_1112]=_1113;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1118=false;
var code=e.keyCode;
var _111a=KeySetBinding.keyEventHandlers;
if(_111a[doc]&&_111a[doc][code]){
var _111b="[default]";
_111b+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_111b+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _111c=_111a[doc][code][_111b];
if(_111c==null){
_111c=_111a[doc][code]["*"];
}
if(_111c!=null){
_111c.handleKeyEvent(e);
_1118=true;
}
}
return _1118;
};
KeySetBinding._sanitizeKeyModifiers=function(_111d){
var _111e="[default]";
var mods={};
if(_111d){
new List(_111d.split(" ")).each(function(_1120){
mods[_1120]=true;
});
function check(_1121){
if(mods[_1121]){
_111e+=" "+_1121;
}
}
check("shift");
check("control");
}
return _111e;
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
var _1125=key.getAttribute("oncommand");
var _1126=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1126){
DOMEvents.preventDefault(e);
}
var _1128=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1125,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1129){
if(_1129 instanceof CursorBinding){
_1129.setOpacity(0);
_1129.show();
new Animation({modifier:9,onstep:function(_112a){
_1129.setOpacity(Math.sin(_112a*Math.PI/180));
},onstop:function(){
_1129.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_112b){
if(_112b instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_112c){
_112b.setOpacity(Math.cos(_112c*Math.PI/180));
},onstop:function(){
_112b.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_112d,_112e,_112f){
if(_112d instanceof CursorBinding){
_112f.x-=16;
_112f.y-=16;
new Animation({modifier:3,onstep:function(_1130){
var tal=Math.sin(_1130*Math.PI/180);
_112d.setPosition(new Point(((1-tal)*_112e.x)+((0+tal)*_112f.x),((1-tal)*_112e.y)+((0+tal)*_112f.y)));
},onstop:function(){
CursorBinding.fadeOut(_112d);
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
CursorBinding.prototype.setOpacity=function(_1136){
this.bindingElement.style.opacity=new String(_1136);
this._opacity=_1136;
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
function setOpacity(_1139){
cover.bindingElement.style.opacity=new String(_1139);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_113a){
if(Binding.exists(cover)){
setOpacity(Math.cos(_113a*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_113c){
cover.bindingElement.style.MozOpacity=new String(_113c);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_113d){
if(Binding.exists(cover)){
setOpacity(Math.sin(_113d*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_113f){
if(_113f!=this._isBusy){
if(_113f){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_113f;
}
};
CoverBinding.prototype.setTransparent=function(_1140){
if(_1140!=this._isTransparent){
if(_1140){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1140;
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
CoverBinding.prototype.setHeight=function(_1142){
if(_1142>=0){
this.bindingElement.style.height=new String(_1142+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1143){
var _1144=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1143);
return UserInterface.registerBinding(_1144,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1146=UncoverBinding._bindingInstance;
if(Binding.exists(_1146)){
_1146.setPosition(pos);
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
TheatreBinding.prototype.play=function(_114a){
this._isFading=_114a==true;
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
var _114b=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_114b.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_114b.clearRect(0,0,300,150);
_114b.fillRect(0,0,300,150);
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
var _114d=this._canvas.getContext("2d");
_114d.clearRect(0,0,300,150);
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
var _114e=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_114e);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _114f=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_114f){
this._startcontent=_114f.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1150){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1150);
switch(_1150.type){
case WindowBinding.ACTION_ONLOAD:
if(_1150.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1150.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1150);
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
var _1154=this._transformer.transformToString(doc);
this._inject(_1154);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1157){
this.getContentDocument().body.innerHTML=_1157;
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
var _115f=list.getNext();
var id=_115f.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_115f);
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
var _1169=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1169.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1169.appendChild(att);
}
elm.appendChild(_1169);
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
var _1173=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1173){
doc=XMLParser.parse(_1173);
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
var _1177=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1177;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1178,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1178,arg);
switch(_1178){
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
var _117b=new List();
list.each(function(lang){
_117b.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_117b);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_117f){
switch(_117f){
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
var _1182=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1182,root);
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
var _1183=this.getProperty("status");
if(_1183!=null){
switch(_1183){
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
UserInterfaceMapping.prototype.merge=function(_1187){
for(var _1188 in _1187.map){
this.map[_1188]=_1187.getBindingImplementation(_1188);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1189){
var _118a=null;
var name=_1189.nodeName.toLowerCase();
if(this.map[name]){
_118a=this.map[name];
}
return _118a;
};
var UserInterface=new function(){
var _118c=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _118d=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_118c,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _118e=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1190,impl){
var _1192=null;
if(!this.hasBinding(_1190)){
var _1193=DOMUtil.getParentWindow(_1190);
if(DOMUtil.getLocalName(_1190)!="bindingmapping"){
if(!impl&&_1190.getAttribute("binding")!=null){
var _1194=_1190.getAttribute("binding");
impl=_1193[_1194];
if(impl==null){
throw "No such binding in scope: "+_1194;
}
}
if(!impl){
var _1195=_1193.DocumentManager;
if(_1195){
var _1196=_1195.customUserInterfaceMapping;
if(_1196){
impl=_1196.getBindingImplementation(_1190);
}
}
}
if(!impl){
impl=_118d.getBindingImplementation(_1190);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1192=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1192){
var key=KeyMaster.getUniqueKey();
_1190.setAttribute("key",key);
_1192.key=key;
if(!_1190.id){
_1190.id=key;
}
keys[key]={element:_1190,binding:_1192};
_1192.onBindingRegister();
}
}
}
return _1192;
};
this.unRegisterBinding=function(_1198){
terminate(_1198);
};
function terminate(_1199){
if(Binding.exists(_1199)==true){
var key=_1199.key;
Binding.destroy(_1199);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1199=null;
}else{
_118e.error("URGH: "+key);
}
}
}
}
this.getElement=function(_119b){
var _119c=null;
if(keys[_119b.key]){
_119c=keys[_119b.key].element;
}
return _119c;
};
this.getBinding=function(_119d){
var _119e=null;
if(_119d&&_119d.nodeType==Node.ELEMENT_NODE){
try{
var key=_119d.getAttribute("key");
if(key&&keys[key]){
_119e=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_119d);
if(exception.stack){
alert(exception.stack);
}
}
}
return _119e;
};
this.getBindingByKey=function(key){
var _11a1=null;
if(keys[key]){
_11a1=keys[key].binding;
}
return _11a1;
};
this.hasBinding=function(_11a2){
return this.getBinding(_11a2)!=null;
};
this.isBindingVisible=function(_11a3){
var _11a4=Application.isOperational;
if(_11a4==true){
var _11a5=new Crawler();
_11a5.type=NodeCrawler.TYPE_ASCENDING;
_11a5.id="visibilitycrawler";
_11a5.addFilter(function(_11a6){
var b=UserInterface.getBinding(_11a6);
var res=0;
if(!b.isVisible){
_11a4=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11a5.crawl(_11a3.bindingElement);
_11a5.dispose();
}
return _11a4;
};
var _11a9=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11a9={};
for(var key in keys){
_11a9[key]=true;
}
};
this.getPoint=function(){
var _11ad=null;
if(_11a9){
_11ad=new List();
for(var key in keys){
if(!_11a9[key]){
_11ad.add(key);
}
}
}
return _11ad;
};
this.clearPoint=function(){
_11a9=null;
};
this.trackUndisposedBindings=function(){
var _11af=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11af){
_11af="Bindings illdisposed: ";
}
_11af+=entry.binding+" ";
}
}
if(_11af!=null){
_118e.error(_11af);
}
};
this.autoTrackDisposedBindings=function(_11b2){
if(_11b2){
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
SOAPRequest.newInstance=function(_11b3,_11b4){
var _11b5=_11b3+"/"+_11b4;
var _11b6=new SOAPRequest(_11b5);
var _11b7=SOAPRequest.resolver;
_11b6.document=Templates.getTemplateDocument("soapenvelope.xml");
_11b6.envelope=_11b7.resolve("soap:Envelope",_11b6.document);
_11b6.header=_11b7.resolve("soap:Header",_11b6.envelope);
_11b6.body=_11b7.resolve("soap:Body",_11b6.envelope);
return _11b6;
};
SOAPRequest._parseResponse=function(_11b8){
var _11b9=null;
var _11ba=false;
var doc=_11b8.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11b9=SOAPRequestResponse.newInstance(_11b8.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11b8.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11ba=true;
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
var text=_11b8.responseText;
if(_11b8.status==503||text.indexOf("id=\"offline\"")>-1){
_11ba=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11b8.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11b8.responseText);
}
}
}
}
if(_11ba==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11b9;
};
function SOAPRequest(_11bf){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11bf;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11c1=DOMUtil.getXMLHTTPRequest();
var _11c2=null;
_11c1.open("post",url,false);
_11c1.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11c1.setRequestHeader("SOAPAction",this.action);
try{
_11c1.send(this.document);
_11c2=SOAPRequest._parseResponse(_11c1);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11c1=null;
return _11c2;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11c5){
var _11c6=DOMUtil.getXMLHTTPRequest();
_11c6.open("post",url,true);
_11c6.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11c6.setRequestHeader("SOAPAction",this.action);
_11c6.onreadystatechange=function(){
if(_11c6.readyState==4){
var _11c7=SOAPRequest._parseResponse(_11c6);
_11c5(_11c7);
_11c6=null;
}
};
_11c6.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11c8 in this){
this[_11c8]=null;
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
var _11ca=null;
if(doc&&doc.documentElement){
_11ca=new SOAPRequestResponse();
var _11cb=SOAPRequestResponse.resolver;
_11ca.document=doc;
_11ca.envelope=_11cb.resolve("soap:Envelope",_11ca.document);
_11ca.header=_11cb.resolve("soap:Header",_11ca.envelope);
_11ca.body=_11cb.resolve("soap:Body",_11ca.envelope);
var fault=_11cb.resolve("soap:Fault",_11ca.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11ca.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11cb.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11cb.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11ca;
};
function SOAPFault(_11cd,_11ce,_11cf){
this._operationName=_11cd;
this._operationAddress=_11ce;
this._faultString=_11cf;
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
SOAPFault.newInstance=function(_11d0,fault){
return new SOAPFault(_11d0.name,_11d0.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11d3){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11d3;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11d5=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11d5.body,this._operation);
var _11d7=this._wsdl.getSchema();
var _11d8=_11d7.lookup(this._operation);
var _11d9=_11d8.getListedDefinitions();
while(_11d9.hasNext()){
var def=_11d9.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11d5;
};
SOAPEncoder.prototype._resolve=function(_11dd,_11de,value){
var _11e0=this._wsdl.getSchema();
if(_11de.isSimpleValue){
this._appendText(_11dd,value,_11de.type=="string");
}else{
var _11e1=_11e0.lookup(_11de.type);
if(_11e1 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11e1.getListedDefinitions();
if(_11e1.isArray){
var _11e3=new List(value);
var def=defs.getNext();
while(_11e3.hasNext()){
var elm=this._appendElement(_11dd,def.name);
var val=_11e3.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11dd,def.name);
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
SOAPEncoder.prototype._appendText=function(_11ea,value,_11ec){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11ef=false;
var i=0,c;
while(c=chars[i++]){
var _11f2=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11f2=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11f2=false;
}
break;
}
if(!_11f2){
safe+=c;
}else{
_11ef=true;
}
}
if(_11ef){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11ea.appendChild(_11ea.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11f5){
this._wsdl=wsdl;
this._operation=_11f5;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11fa){
var _11fb=null;
var _11fc=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11fe=this.resolve(id,_11fa.body);
var _11ff=_11fc.lookup(id);
var _1200=_11ff.getListedDefinitions();
while(!_11fb&&_1200.hasNext()){
var def=_1200.getNext();
var elm=this.resolve(def.name,_11fe);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11fb=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11fb.importNode!=Types.UNDEFINED){
_11fb.appendChild(_11fb.importNode(e,true));
}else{
_11fb.loadXML(DOMSerializer.serialize(e));
}
}else{
_11fb=this._compute(elm,def);
}
}
return _11fb;
};
SOAPDecoder.prototype._compute=function(_1204,_1205){
var _1206=null;
var _1207=this._wsdl.getSchema();
if(_1205.isSimpleValue){
_1206=this._getSimpleValue(_1204,_1205.type);
}else{
var _1208=_1207.lookup(_1205.type);
if(_1208 instanceof SchemaSimpleType){
_1206=this._getSimpleValue(_1204,_1208.restrictionType);
}else{
var defs=_1208.getListedDefinitions();
if(_1208.isArray){
_1206=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1204);
while(elms.hasNext()){
var elm=elms.getNext();
_1206.push(this._compute(elm,def));
}
}else{
_1206={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1204);
if(elm){
_1206[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1206;
};
SOAPDecoder.prototype._getSimpleValue=function(_120d,type){
var _120f=null;
if(_120d!=null&&_120d.firstChild&&_120d.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_120d.childNodes.length>1){
_120d.normalize();
}
_120f=_120d.firstChild.data;
switch(type){
case Schema.types.STRING:
_120f=_120f;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_120f=Number(_120f);
break;
case Schema.types.BOOLEAN:
_120f=_120f=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _120f;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1210){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1210);
}
Schema.prototype._parseSchema=function(_1211){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1212={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1211);
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
_1212[rule.getAttribute("name")]=entry;
}
return _1212;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1217){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1217);
}
SchemaDefinition.prototype._parse=function(_1218){
var min=_1218.getAttribute("minOccurs");
var max=_1218.getAttribute("maxOccurs");
var type=_1218.getAttribute("type");
this.name=_1218.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _121e=split[1];
this.isSimpleValue=sort!="tns";
this.type=_121e;
}else{
var elm=_1218.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1220,_1221){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1220,_1221);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1222,_1223){
var els=_1222.resolveAll("s:complexType/s:sequence/s:element",_1223);
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
function SchemaComplexType(_1225,_1226){
this._definitions=new List();
this._parseListedDefinitions(_1225,_1226);
this.isArray=_1226.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1227,_1228){
var els=_1227.resolveAll("s:sequence/s:element",_1228);
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
function SchemaSimpleType(_122b,_122c){
this.restrictionType=null;
this._parse(_122b,_122c);
}
SchemaSimpleType.prototype._parse=function(_122d,_122e){
var _122f=_122d.resolve("s:restriction",_122e);
if(_122f){
this.restrictionType=_122f.getAttribute("base").split(":")[1];
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
var _1232=null;
var _1233=DOMUtil.getXMLHTTPRequest();
_1233.open("get",url,false);
_1233.send(null);
if(_1233.responseXML){
_1232=_1233.responseXML.documentElement;
}else{
alert(_1233.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1232;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1234=new List();
var _1235=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1235.hasEntries()){
while(_1235.hasNext()){
var _1236=_1235.getNext();
var name=_1236.getAttribute("name");
_1234.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1234;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1239,_123a,_123b){
this.name=name;
this.address=_1239;
this.encoder=_123a;
this.decoder=_123b;
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
var _123f=wsdl.getOperations();
_123f.each(function(_1240){
proxy[_1240.name]=WebServiceProxy.createProxyOperation(_1240);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1241,_1242){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1242){
var log=_1242 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1241.address+": "+_1241.name+"\n\n";
log+=DOMSerializer.serialize(_1242.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1244){
return function(){
var _1245=new List(arguments);
var _1246=null;
if(typeof (_1245.getLast())=="function"){
var _1247=_1245.extractLast();
var _1248=_1244.encoder.encode(_1245);
this._log(_1244,_1248);
var self=this;
var _124a=_1248.asyncInvoke(_1244.address,function(_124b){
self._log(_1244,_124b);
if(_124b){
if(_124b.fault){
_1246=SOAPFault.newInstance(_1244,_124b.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1246,_1248,_124b);
}
}else{
if(WebServiceProxy.isDOMResult){
_1246=_124b.document;
}else{
_1246=_1244.decoder.decode(_124b);
}
}
}
_1248.dispose();
_1247(_1246);
});
}else{
var _1248=_1244.encoder.encode(new List(arguments));
this._log(_1244,_1248);
var _124a=_1248.invoke(_1244.address);
this._log(_1244,_124a);
if(_124a){
if(_124a.fault){
_1246=SOAPFault.newInstance(_1244,_124a.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1246,_1248,_124a);
}
}else{
if(WebServiceProxy.isDOMResult){
_1246=_124a.document;
}else{
_1246=_1244.decoder.decode(_124a);
}
}
}
_1248.dispose();
return _1246;
}
};
};
WebServiceProxy.handleFault=function(_124c,_124d,_124e){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_124c,soapRequest:_124d,soapResponse:_124e});
}
catch(exception){
alert(_124c.getFaultString());
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
var _124f=SystemLogger.getLogger("MessageQueue");
var _1250=null;
var _1251=0;
var _1252=null;
var _1253=new Map();
var _1254=new Map();
var _1255=false;
var _1256=false;
var _1257=false;
var _1258=false;
var _1259={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1250=ConsoleMessageQueueService;
_1251=_1250.GetCurrentSequenceNumber("dummyparam!");
this.index=_1251;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1255){
if(!MessageQueue._actions.hasEntries()){
var _125a=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1256=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_125a;
_1256=false;
}
}
}
};
this._pokeserver=function(){
if(_1255==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1256);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_1257){
_1258=true;
}else{
_1257=true;
var self=this;
_1250.GetMessages(Application.CONSOLE_ID,this.index,function(_125c){
if(_125c!=null){
if(Types.isDefined(_125c.CurrentSequenceNumber)){
var _125d=_125c.CurrentSequenceNumber;
if(_125d<self.index){
_124f.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_125d);
}
self.index=_125d;
var _125e=new List(_125c.ConsoleActions);
if(_125e.hasEntries()){
self.evaluate(_125e);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_124f.error("No sequencenumber in MessageQueue response!");
}
}
_1257=false;
if(_1258){
_1258=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_125f){
var _1260=new List();
if(_125f.hasEntries()){
_125f.each(function(_1261){
if(this._index[_1261.Id]!=true){
_1260.add(_1261);
}
this._index[_1261.Id]=true;
},this);
if(_1260.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1260);
}else{
this._actions=_1260;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1262){
var _1263="(No reason)";
if(_1262!=null){
_1263=_1262.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1263);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1267){
if(_1267==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1268=null;
if(this._actions.hasEntries()){
var _1269=this._actions.extractFirst();
_1251=_1269.SequenceNumber;
_124f.debug("MessageQueue action: "+_1269.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1251+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1269.ActionType){
case "OpenView":
_1268=_1269.OpenViewParams;
if(_1268.ViewType=="ModalDialog"){
openDialogView(_1268);
}else{
_1252=_1268.ViewId;
openView(_1268);
}
break;
case "CloseView":
_1268=_1269.CloseViewParams;
_1252=_1268.ViewId;
closeView(_1268);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1269.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_1253.countEntries()+"\n";
_1253.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_124f.debug(debug);
if(!_1253.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1269.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1269.MessageBoxParams);
break;
case "OpenViewDefinition":
_1268=_1269.OpenViewDefinitionParams;
_1252=_1268.Handle;
openViewDefinition(_1268);
break;
case "LogEntry":
logEntry(_1269.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1268=_1269.BroadcastMessageParams;
_124f.debug("Server says: EventBroadcaster.broadcast ( \""+_1268.Name+"\", "+_1268.Value+" )");
EventBroadcaster.broadcast(_1268.Name,_1268.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1253.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1269.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1269.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1269.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1268=_1269.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1268.ViewId,entityToken:_1268.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1268=_1269.OpenGenericViewParams;
openGenericView(_1268);
break;
case "OpenExternalView":
_1268=_1269.OpenExternalViewParams;
openExternalView(_1268);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1269.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1256);
}
function logEntry(_126c){
var _126d=_126c.Level.toLowerCase();
SystemLogger.getLogger(_126c.SenderId)[_126d](_126c.Message);
}
function openView(_126e){
var list=paramsToList(_126e.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_126e.ViewId);
def.entityToken=_126e.EntityToken;
def.flowHandle=_126e.FlowHandle;
def.position=_1259[_126e.ViewType],def.label=_126e.Label;
def.image=_126e.Image;
def.toolTip=_126e.ToolTip;
def.argument={"url":_126e.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_126e.ViewId,entityToken:_126e.EntityToken,flowHandle:_126e.FlowHandle,position:_1259[_126e.ViewType],url:_126e.Url,label:_126e.Label,image:_126e.Image,toolTip:_126e.ToolTip}));
}
}
function openDialogView(_1271){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1271.ViewId,flowHandle:_1271.FlowHandle,position:Dialog.MODAL,url:_1271.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1272){
var _1273=_1272.DialogType.toLowerCase();
if(_1273=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_1272.Title+"\n"+_1272.Message);
}else{
Dialog[_1273](_1272.Title,_1272.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_1274){
var map={};
var _1276=false;
new List(_1274.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1276=true;
});
var proto=ViewDefinitions[_1274.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1274.ViewId;
}
def.argument=_1276?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_127b){
var def=ViewDefinition.clone("Composite.Management.GenericView",_127b.ViewId);
def.label=_127b.Label;
def.toolTip=_127b.ToolTip;
def.image=_127b.Image;
def.argument={"url":_127b.Url,"list":paramsToList(_127b.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_127d){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_127d.ViewId);
def.label=_127d.Label;
def.toolTip=_127d.ToolTip;
def.image=_127d.Image;
def.url=_127d.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_127f){
if(StageBinding.isViewOpen(_127f.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_127f.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1280){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1280.ViewId,isSuccess:_1280.Succeeded});
}
this._lockSystem=function(_1281){
var _1282=top.bindingMap.offlinetheatre;
if(_1281){
_1282.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1282.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1255=_1281;
};
this.handleBroadcast=function(_1284,arg){
switch(_1284){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1252!=null&&arg==_1252){
_1252=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_1253.set(arg,true);
}else{
_124f.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1253.hasEntries()){
_1253.del(arg);
_124f.debug("Refreshed tree: "+arg+"\n("+_1253.countEntries()+" trees left!)");
if(!_1253.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1254.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1254.hasEntries()==true){
_1254.del(arg);
if(!_1254.hasEntries()){
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
function paramsToList(_1286){
var list=new List();
new List(_1286).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _1289=false;
var _128a=false;
var _128b=null;
var _128c=false;
var _128d=Client.qualifies();
var _128e="admin";
var _128f="123456";
if(!_128d){
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
this.handleBroadcast=function(_1290){
switch(_1290){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1290);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1291=window.bindingMap.appwindow;
_1291.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1292){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1293){
if(_1292){
EventBroadcaster.subscribe(_1293,KickStart);
}else{
EventBroadcaster.unsubscribe(_1293,KickStart);
}
});
}
function kickStart(_1294){
switch(_1294){
case BroadcastMessages.AUDIO_INITIALIZED:
_128a=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1289=true;
break;
}
if(_1289&&_128a){
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
DataManager.getDataBinding("username").setValue(_128e);
DataManager.getDataBinding("password").setValue(_128f);
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
this.doLogin=function(_1297,_1298){
var _1299=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _129a=false;
var _129b=LoginService.ValidateAndLogin(_1297,_1298);
if(_129b instanceof SOAPFault){
alert(_129b.getFaultString());
}else{
_129a=_129b;
}
if(_129a){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1299){
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
var _129c=DataManager.getDataBinding("username");
var _129d=DataManager.getDataBinding("password");
_129c.blur();
_129d.blur();
_129c.setValue("");
_129d.setValue("");
_129c.clean();
_129d.clean();
_129c.focus();
document.getElementById("loginerror").style.display="block";
var _129e={handleAction:function(_129f){
document.getElementById("loginerror").style.display="none";
_129f.target.removeActionListener(Binding.ACTION_DIRTY,_129e);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_129e);
}
WindowManager.fireOnLoad(this);
if(!_128d){
UpdateManager.isEnabled=false;
}
};

