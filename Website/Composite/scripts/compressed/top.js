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
try{
_68.handleBroadcast(_62,_63);
}
catch(exception){
_67.add(_68);
var cry="Exception in "+new String(_68)+" on broadcast '"+_62+"':"+new String(exception);
SystemLogger.getLogger("EventBroadcaster").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
throw (exception);
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
if(window.opera!=null||_78||this.isExplorer6){
_77=false;
}
return _77;
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
function SystemLogger(_79){
this.identifier=_79;
}
SystemLogger.prototype.info=function(_7a){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_INFO,_7a);
};
SystemLogger.prototype.debug=function(_7b){
if(_7b=="page"){
alert(arguments.caller.callee);
}
SystemLogger.log(this.identifier,SystemLogger.LEVEL_DEBUG,_7b);
};
SystemLogger.prototype.error=function(_7c){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_ERROR,_7c);
};
SystemLogger.prototype.warn=function(_7d){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_WARN,_7d);
};
SystemLogger.prototype.fatal=function(_7e){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FATAL,_7e);
};
SystemLogger.prototype.fine=function(_7f){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FINE,_7f);
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
SystemLogger.getLogger=function(_81){
var _82=SystemLogger.loggers[_81];
if(!_82){
_82=new SystemLogger(_81);
SystemLogger.loggers[_81]=_82;
}
return _82;
};
SystemLogger.flushBuffer=function(){
SystemLogger.buffer.reset();
SystemLogger.isFlushing=true;
if(SystemLogger.buffer.hasEntries()){
while(SystemLogger.buffer.hasNext()){
var _83=SystemLogger.buffer.getNext();
this.log(_83.identifier,_83.level,_83.message);
}
}
SystemLogger.isFlushing=false;
};
SystemLogger.bufferLog=function(_84,_85,_86){
if(Application.isDeveloperMode){
_86=String(_86);
SystemLogger.buffer.add({identifier:_84,level:_85,message:_86});
}
};
SystemLogger.outputLog=function(_87,_88,_89){
_89=String(_89);
if(!SystemLogger.isFlushing){
SystemLogger.bufferLog(_87,_88,_89);
}
var win=SystemLogger.outputWindow;
var doc=SystemLogger.outputDocument;
var elm=SystemLogger.outputElement;
var div=doc.createElement("div");
var _8e=doc.createElement("span");
var pre=doc.createElement("pre");
if(Client.isExplorer){
_89=_89.replace(/</g,"&lt;");
_89=_89.replace(/>/g,"&gt;");
_89=_89.replace(/\n/g,"<br/>");
_89=_89.replace(/\t/g,SystemLogger.TAB_SEQUENCE);
pre.innerHTML=_89;
}else{
pre.textContent=_89;
}
div.className=_88;
_8e.innerHTML=_87;
div.appendChild(_8e);
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
SystemTimer.getTimer=function(_91){
return new SystemTimer(_91.toString());
};
function SystemTimer(id){
this.logger=SystemLogger.getLogger("SystemTimer");
this._id=id;
this._time=new Date().getTime();
}
SystemTimer.prototype.reset=function(){
this._time=new Date().getTime();
};
SystemTimer.prototype.report=function(_93){
this.logger.debug(this._id+": "+this.getTime()+(_93?": "+_93:""));
};
SystemTimer.prototype.getTime=function(){
return new Date().getTime()-this._time;
};
function _SystemDebug(){
}
_SystemDebug.prototype={_logger:SystemLogger.getLogger("SystemDebug"),_stacklength:parseInt(5),stack:function(_94,_95){
this._stackMozilla(_94,_95);
},_stackMozilla:function(_96,_97){
_97=_97?_97:this._stacklength;
if(Client.isMozilla&&_96.callee||_96.caller){
var _98=Client.isMozilla?_96.callee.caller:_96.caller.callee;
var _99="";
var i=0;
while(_98!=null&&i++<_97){
_99+="\n#"+i+"\n";
_99+=_98.toString();
_98=_98.caller;
_99+="\n";
}
this._logger.error(_99);
}else{
this._logger.error("(Error stack unreachable!)");
}
}};
var SystemDebug=new _SystemDebug;
function _Interfaces(){
var _9b=SystemLogger.getLogger("Interfaces");
this.isImplemented=function(_9c,_9d,_9e){
var _9f=true;
for(var _a0 in _9c){
if(typeof _9d[_a0]==Types.UNDEFINED){
_9f=false;
}else{
if(typeof _9c[_a0]!=typeof _9d[_a0]){
_9f=false;
}
}
if(!_9f){
break;
}
}
if(!_9f){
if(_9e){
_9b.fine(_9d+" invalid. Interface check abandoned at: "+_a0);
}
}
return _9f;
};
}
var Interfaces=new _Interfaces;
function _Types(){
}
_Types.prototype={_logger:SystemLogger.getLogger("Types"),BOOLEAN:"boolean",STRING:"string",NUMBER:"number",FUNCTION:"function",UNDEFINED:"undefined",castFromString:function(_a1){
var _a2=_a1;
if(parseInt(_a2).toString()===_a2){
_a2=parseInt(_a2);
}else{
if(parseFloat(_a2).toString()===_a2){
_a2=parseFloat(_a2);
}else{
if(_a2==="true"||_a2==="false"){
_a2=(_a2==="true");
}
}
}
return _a2;
},isDefined:function(arg){
return typeof arg!=Types.UNDEFINED;
},isFunction:function(arg){
return typeof arg==Types.FUNCTION;
}};
var Types=new _Types();
var MimeTypes={JPG:"image/jpeg",GIF:"image/gif",PNG:"image/png",CSS:"text/css",JAVASCRIPT:"text/javascript",TEXT:"text/plain",HTML:"text/html",XHTML:"applcication/xhtml+xml",FLASH:"application/x-shockwave-flash",QUICKTIME:"video/quicktime",SHOCKWAVE:"application/x-director",WINMEDIA:"application/x-mplayer2",COMPOSITEPAGES:"application/x-composite-page",COMPOSITEFUNCTION:"application/x-composite-function"};
window.SearchTokens=new function(){
var _a5={"MediaFileElementProvider.WebImages":null,"MediaFileElementProvider.EmbeddableMedia":null,"AllFunctionsElementProvider.VisualEditorFunctions":null,"AllFunctionsElementProvider.XsltFunctionCall":null};
this.getToken=function(key){
var _a7=null;
if(this.hasToken(key)){
_a7=_a5[key];
}else{
throw "Unknown search token key: "+key;
}
return _a7;
};
this.hasToken=function(key){
return typeof _a5[key]!=Types.UNDEFINED;
};
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
new List(TreeService.GetSearchTokens(true)).each(function(_a9){
if(SearchTokens.hasToken(_a9.Key)){
_a5[_a9.Key]=_a9.Value;
}else{
alert("SearchTokens need updating!");
}
});
}});
};
window.StringBundle=new function(){
var _aa=SystemLogger.getLogger("StringBundle");
this.UI="Composite.Management";
var _ab={};
function resolve(_ac,_ad){
var _ae=new List(StringService.GetLocalisation(_ac));
if(_ae.hasEntries()){
_ae.each(function(_af){
_ad[_af.Key]=_af.Value;
});
}else{
throw "No strings from provider: "+_ac;
}
}
this.getString=function(_b0,_b1){
var _b2=null;
if(window.StringService!=null){
try{
if(_b0=="ui"){
_b0=StringBundle.UI;
}
if(!_ab[_b0]){
var _b3=_ab[_b0]={};
resolve(_b0,_b3);
}
if(_ab[_b0]){
_b2=_ab[_b0][_b1];
}
if(!_b2){
throw "No such string: "+_b1;
}
}
catch(exception){
var cry="StringBundle exception in string "+_b0+":"+_b1;
_aa.error(cry);
if(Application.isDeveloperMode){
alert(cry);
}
}
}
return _b2;
};
};
window.LastOpenedSystemNodes=new function(){
var _b5=new List([]);
this.clear=function(){
_b5.clear();
};
this.add=function(_b6){
var _b7=_b6.getHandle();
_b5.add(_b7);
};
this.isOpen=function(_b8){
var _b9=_b8.getHandle();
return _b5.has(_b9);
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
_cf=_cf.replace("${tinymce}",Constants.TINYMCEROOT);
_cf=_cf.replace("${tiny}",Constants.TINYROOT);
if(_cf.indexOf("${icon:")>-1){
_cf=this._resolveImage(_cf);
}else{
if(_cf.indexOf("${string:")>-1){
_cf=this._resolveString(_cf);
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
_Cookies.prototype={createCookie:function(_de,_df,_e0){
var _e1="";
if(_e0){
var _e2=new Date();
_e2.setTime(_e2.getTime()+(_e0*24*60*60*1000));
_e1="; expires="+_e2.toGMTString();
}
document.cookie=_de+"="+escape(_df)+_e1+"; path=/";
return this.readCookie(_de);
},readCookie:function(_e3){
var _e4=null;
var _e5=_e3+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_e5)==0){
_e4=unescape(c.substring(_e5.length,c.length));
}
}
return _e4;
},eraseCookie:function(_e9){
this.createCookie(_e9,"",-1);
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
var _ea=SystemLogger.getLogger("StatusBar");
var _eb=null;
var _ec="${icon:error}";
var _ed="${icon:warning}";
var _ee="${icon:loading}";
var _ef="${icon:message}";
var _f0=null;
var _f1=null;
var _f2=null;
var _f3=null;
this.initialize=function(_f4){
_f0=StringBundle.getString("ui","Website.App.StatusBar.Error");
_f1=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_f2=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_f3=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_eb=_f4;
this.document=_f4.bindingDocument;
};
this.error=function(_f5,_f6){
this.state=StatusBar.ERROR;
_f5=_f5?_f5:_f0;
show(_f5,_ec,_f6,false);
};
this.warn=function(_f7,_f8){
this.state=StatusBar.WARN;
_f7=_f7?_f7:_f1;
show(_f7,_ed,_f8,false);
};
this.busy=function(_f9,_fa){
this.state=StatusBar.BUSY;
_f9=_f9?_f9:_f2;
show(_f9,_ee,_fa,false);
};
this.ready=function(_fb,_fc){
this.state=StatusBar.READY;
_fb=_fb?_fb:_f3;
show(_fb,_ef,_fc,true);
};
this.report=function(_fd,_fe,_ff,_100){
this.state=null;
show(_fd,_fe,_ff,_100);
};
this.clear=function(){
this.state=null;
if(_eb){
_eb.clear();
}
};
function show(_101,icon,vars,_104){
if(vars){
_101=Resolver.resolveVars(_101,vars);
}
if(_eb){
_eb.setLabel(_101);
_eb.setImage(icon);
if(_104){
_eb.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_ea.error("Message not initialized for display: "+_101);
}
}
this.addToGroup=function(name,_106){
if(!this._groups.has(name)){
this._groups.set(name,_eb.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(name).add(_106);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,handleBroadcast:function(_107,arg){
switch(_107){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
var _109=LocalizationService.GetActiveLocales(true);
if(_109.length>=1){
this.languages=new List(_109);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_107){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _10a=LocalizationService.GetLocales(true);
this.source=_10a.ForeignLocaleName;
this.target=_10a.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_10a.ForeignLocaleName,target:_10a.ActiveLocaleName});
break;
}
},currentLang:function(){
if(this.languages!=null){
var _10b=this.languages.copy();
while(_10b.hasNext()){
var lang=_10b.getNext();
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
_Validator.prototype={validate:function(_10d,key,_10f){
var _110=true;
var _111=SourceValidationService.ValidateSource(_10d,key);
if(_111!="True"){
if(_10f==true){
this._dialog(_111);
}
_110=false;
}
return _110;
},validateInformed:function(_112,key){
return this.validate(_112,key,true);
},_dialog:function(_114){
setTimeout(function(){
Dialog.error("Source Invalid",_114);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_115,_116,_117,_118){
this._count++;
this._eventListener(true,_115,_116,_117,_118);
if(_115&&typeof _115.nodeType!=Types.UNDEFINED){
if(_115.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_115);
if(win){
var _11a={handleEvent:function(){
DOMEvents.removeEventListener(_115,_116,_117,_118);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_11a);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_11a);
}
}
}
},removeEventListener:function(_11b,_11c,_11d,_11e){
this._count--;
this._eventListener(false,_11b,_11c,_11d,_11e);
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
},cleanupEventListeners:function(_123){
this._deleteWrappedHandler(_123);
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
if(Client.isExplorer==true){
_12c=this._getWrappedHandler(_12a,_12b,_12c,_12e);
_12a[this._getAction(_129)]("on"+_12b,_12c);
}else{
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
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_131){
var _132=null;
switch(_131){
case true:
_132=Client.isMozilla==true?"addEventListener":"attachEvent";
break;
case false:
_132=Client.isMozilla==true?"removeEventListener":"detachEvent";
break;
}
return _132;
},_getWrappedHandler:function(_133,_134,_135,_136){
var _137=null;
try{
if(!_135._domEventHandlers){
_135._domEventHandlers={};
}
if(!_135._domEventHandlers[_133]){
_135._domEventHandlers[_133]={};
}
if(!_135._domEventHandlers[_133][_134]){
var win=_133.nodeType?DOMUtil.getParentWindow(_133):_133;
if(win){
_135._domEventHandlers[_133][_134]=function(){
if(win.event!=null&&_135!=null){
_135.handleEvent(win.event);
}
};
}
}
_137=_135._domEventHandlers[_133][_134];
}
catch(exception){
this._report(_133,_134,_135,_136);
}
return _137;
},_deleteWrappedHandler:function(_139){
for(var _13a in _139._domEventHandlers){
if(_13a){
for(var _13b in _139._domEventHandlers[_13a]){
if(_13b){
delete _139._domEventHandlers[_13a][_13b];
}
}
}
delete _139._domEventHandlers[_13a];
}
},_report:function(_13c,_13d,_13e,_13f){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_13c?_13c.nodeName:_13c)+"\n"+"\tevent: "+_13d+"\n"+"\thandler: "+_13e+"\n\n"+"Offending invoker: "+(_13f.callee?_13f.callee.toString():_13f.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(Client.isMozilla?new XMLSerializer():null),serialize:function(node,_141){
var _142=null;
var _143=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_143=node.documentElement;
}
if(Client.isMozilla==true){
if(_141==true){
_143=_143.cloneNode(true);
_143=DOMFormatter.format(_143,DOMFormatter.INDENTED_TYPE_RESULT);
}
_142=this._serializer.serializeToString(_143);
}else{
_142=_143.xml;
}
return _142;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _146=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_147){
var doc=_147.ownerDocument;
var _149=function(node,_14b){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _14c="",i=0;
while(i++<_14b){
_14c+=TAB;
}
var _14e=node.firstChild;
while(_14e){
switch(_14e.nodeType){
case Node.ELEMENT_NODE:
if(_14e==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_14c));
}
node.insertBefore(doc.createTextNode(NEW+_14c+TAB),_14e);
_149(_14e,_14b+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_14c+TAB),_14e);
break;
}
if(_14e.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_14e,_14c+TAB);
}
}
_14e=_14e.nextSibling;
}
}
};
_149(_147,0);
}
function strip(_14f){
var _150=[];
var _151={acceptNode:function(_152){
return (!_146.test(_152.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _153=_14f.ownerDocument.createTreeWalker(_14f,NodeFilter.SHOW_TEXT,_151,true);
while(_153.nextNode()){
_150.push(_153.currentNode);
}
var i=0,_155;
while((_155=_150[i++])!=null){
_155.parentNode.removeChild(_155);
}
}
function formatCDATASection(node,_157){
if(node.textContent.indexOf(NEW)>-1){
var _158=node.textContent.split(NEW);
var _159="",line,_15b=0,_15c=true;
while((line=_158.shift())!=null){
if(_15b==0&&line.charAt(0)==TAB){
while(line.charAt(_15b++)==TAB){
}
}
line=line.substring(_15b,line.length);
if(_158.length>0){
_159+=_157+TAB+line;
_159+=_15c?"":"\n";
}else{
_159+=_157+line;
_157=_157.slice(1,_157.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_157));
}
_15c=false;
}
node.textContent=_159;
}
}
this.format=function(_15d,_15e){
var _15f=1;
if(document.createTreeWalker){
try{
strip(_15d);
if(_15e!=_15f){
indent(_15d);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_15d);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_160){
var sig,_162=null,_163=this.MSXML_MAXVERSION;
while(!_162&&_163>=this.MSXML_MINVERSION){
try{
sig=_160.replace("{$version}",_163);
_162=new ActiveXObject(sig);
}
catch(exception){
}
_163--;
}
return _162;
},getXMLHTTPRequest:function(){
var _164=null;
if(Client.isExplorer){
_164=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_164=new XMLHttpRequest();
}
return _164;
},getDOMDocument:function(_165){
var _166=null;
if(Client.isExplorer){
_166=this.getMSComponent(_165?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_166=doc;
}
return _166;
},getMSXMLXSLTemplate:function(){
var _168=null;
if(Client.isExplorer){
_168=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _168;
},getLocalName:function(_169){
var _16a=null;
if(_169.localName){
_16a=_169.localName;
}else{
if(_169.baseName){
_16a=_169.baseName;
}else{
_16a=_169.nodeName.toLowerCase();
}
}
return _16a;
},getComputedStyle:function(_16b,_16c){
var _16d=null;
if(Client.isExplorer){
if(_16b.currentStyle!=null){
_16d=_16b.currentStyle[_16c];
}else{
this._logger.error("Could not compute style for element "+_16b.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _16e=_16b.ownerDocument.defaultView.getComputedStyle(_16b,null);
if(_16e!=null){
_16d=_16e.getPropertyValue(_16c);
}else{
this._logger.error("Could not compute style for element "+_16b.nodeName);
SystemDebug.stack(arguments);
}
}
return _16d;
},getMaxIndex:function(doc){
var max=0,_171=new List(doc.getElementsByTagName("*"));
_171.each(function(_172){
var _173=CSSComputer.getZIndex(_172);
if(_173>max){
max=_173;
}
});
return max;
},getOrdinalPosition:function(_174,_175){
var _176=null;
var _177=-1;
var _178=this.getLocalName(_174);
var _179=new List(_174.parentNode.childNodes);
while(_179.hasNext()){
var _17a=_179.getNext();
if(_17a.nodeType==Node.ELEMENT_NODE){
if(!_175||this.getLocalName(_17a)==_178){
_177++;
if(_17a==_174||(_17a.id!=""&&_17a.id==_174.id)){
_176=_177;
break;
}
}
}
}
return _176;
},isFirstElement:function(_17b,_17c){
return (this.getOrdinalPosition(_17b,_17c)==0);
},isLastElement:function(_17d,_17e){
var _17f=_17d.parentNode.getElementsByTagName(_17e?this.getLocalName(_17d):"*");
return (this.getOrdinalPosition(_17d)==_17f.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _183=null;
if(node.textContent){
_183=node.textContent;
}else{
if(node.text){
_183=node.text;
}else{
_183=node.innerText;
}
}
return _183;
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
},getAncestorByLocalName:function(_186,node,_188){
var _189=null;
while(_189==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_188==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_186){
_189=node;
}
}
return _189;
},contains:function(_18b,node){
return _18b.contains?_18b!=node&&_18b.contains(node):!!(_18b.compareDocumentPosition(node)&16);
},createElementNS:function(_18d,_18e,_18f){
var _190=null;
if(_18f==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_190=_18f.createElementNS(_18d,_18e);
}else{
if(_18f.xml!=null){
_190=_18f.createNode(Node.ELEMENT_NODE,_18e,_18d);
}else{
_190=_18f.createElement(_18e);
}
}
}
return _190;
},getElementsByTagName:function(node,_192){
var _193=null;
if(Client.isMozilla){
_193=node.getElementsByTagNameNS(Constants.NS_XHTML,_192);
}else{
_193=node.getElementsByTagName(_192);
}
return _193;
},getNextElementSibling:function(_194){
return Client.isExplorer?_194.nextSibling:_194.nextElementSibling;
},getPreviousElementSibling:function(_195){
return Client.isExplorer?_195.previousSibling:_195.previousElementSibling;
},cloneNode:function(node){
var _197=null;
if(Client.isMozilla==true){
_197=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_197=node.cloneNode(true);
}
return _197;
},getLocalPosition:function(_198){
var _199=new Point(_198.offsetLeft,_198.offsetTop);
if(Client.isExplorer&&_198.parentNode&&_198.parentNode.currentStyle){
if(_198.parentNode.currentStyle.position=="static"){
var _19a=this.getLocalPosition(_198.parentNode);
_199.x+=_19a.x;
_199.y+=_19a.y;
}
}
return _199;
},getGlobalPosition:function(_19b){
return this._getPosition(_19b,false);
},getUniversalPosition:function(_19c){
return this._getPosition(_19c,true);
},_getPosition:function(_19d,_19e){
var _19f=null;
if(typeof _19d.getBoundingClientRect!=Types.UNDEFINED){
var rect=_19d.getBoundingClientRect();
_19f={x:rect.left,y:rect.top};
if(Client.isMozilla){
_19f.x-=_19d.scrollLeft;
_19f.y-=_19d.scrollTop;
}
}else{
_19f={x:_19d.offsetLeft-_19d.scrollLeft,y:_19d.offsetTop-_19d.scrollTop};
while(_19d.offsetParent){
_19d=_19d.offsetParent;
_19f.x+=(_19d.offsetLeft-_19d.scrollLeft);
_19f.y+=(_19d.offsetTop-_19d.scrollTop);
}
}
if(_19e){
var win=DOMUtil.getParentWindow(_19d);
if(win){
var _1a2=win.frameElement;
if(_1a2){
var add=DOMUtil.getUniversalPosition(_1a2);
_19f.x+=add.x;
_19f.y+=add.y;
}
}
}
return new Point(_19f.x,_19f.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1a7){
var _1a8=DOMEvents.getTarget(e);
var _1a9={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_1a8.ownerDocument;
var win=this.getParentWindow(doc);
_1a9.x-=win.pageXOffset;
_1a9.y-=win.pageYOffset;
}
if(_1a7){
var _1ac=this.getParentWindow(_1a8).frameElement;
if(_1ac){
var add=this.getUniversalPosition(_1ac);
_1a9.x+=add.x;
_1a9.y+=add.y;
}
}
return _1a9;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null?new DOMParser():null),parse:function(xml,_1af){
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
if(!_1af){
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
if(!_1af){
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
},isWellFormedDocument:function(xml,_1b2){
var _1b3=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1b5=SourceValidationService.IsWellFormedDocument(xml);
if(_1b5!="True"){
_1b3=false;
if(_1b2==true){
this._illFormedDialog(_1b5);
}
}
return _1b3;
},isWellFormedFragment:function(xml,_1b7){
var _1b8=true;
var _1b9=SourceValidationService.IsWellFormedFragment(xml);
if(_1b9!="True"){
_1b8=false;
if(_1b7==true){
this._illFormedDialog(_1b9);
}
}
return _1b8;
},_illFormedDialog:function(_1ba){
setTimeout(function(){
if(Client.isWebKit){
alert(_1ba);
}else{
Dialog.error("Not well-formed",_1ba);
}
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1bb){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1bc){
return _1bb[_1bc];
}};
}else{
this._nsResolver=_1bb;
}
};
XPathResolver.prototype.resolve=function(_1bd,node,_1bf){
var _1c0=null;
try{
if(this._evaluator){
_1c0=this._evaluateDOMXpath(_1bd,node,_1bf?true:false);
}else{
_1c0=this._evaluateMSXpath(_1bd,node,_1bf?true:false);
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
return _1c0;
};
XPathResolver.prototype.resolveAll=function(_1c1,node){
return this.resolve(_1c1,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1c3,node,_1c5){
var _1c6=null;
if(node){
var _1c6=this._evaluator.evaluate(_1c3,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1c5){
var list=new List();
while((node=_1c6.iterateNext())!=null){
list.add(node);
}
_1c6=list;
}else{
_1c6=_1c6.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1c6;
};
XPathResolver.prototype._evaluateMSXpath=function(_1c9,node,_1cb){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1cd="";
for(var _1ce in this._nsResolver){
_1cd+="xmlns:"+_1ce+"=\""+this._nsResolver[_1ce]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1cd);
if(_1cb){
var list=new List();
var i=0,_1d1=node.selectNodes(_1c9);
while(i<_1d1.length){
list.add(_1d1.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1c9);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1d3=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1d3);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1d3;
}
};
XSLTransformer.prototype._import=function(url){
var _1d5=null;
if(Client.isMozilla){
var _1d6=DOMUtil.getXMLHTTPRequest();
_1d6.open("get",Resolver.resolve(url),false);
_1d6.send(null);
_1d5=_1d6.responseXML;
}else{
var _1d5=DOMUtil.getDOMDocument(true);
_1d5.async=false;
_1d5.load(url);
}
return _1d5;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1d8=null;
if(Client.isMozilla){
_1d8=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1d8;
};
XSLTransformer.prototype.transformToString=function(dom,_1da){
var _1db=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1db=DOMSerializer.serialize(doc,_1da);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1db=proc.output;
}
return _1db;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1de){
var _1df=_1de.style?_1de.className:_1de.getAttribute("class");
_1df=_1df?_1df:"";
return _1df;
},_contains:function(_1e0,sub){
return _1e0.indexOf(sub)>-1;
},_attach:function(_1e2,sub){
return _1e2+(_1e2==""?"":" ")+sub;
},_detach:function(_1e4,sub){
if(this._contains(_1e4," "+sub)){
sub=" "+sub;
}
return _1e4.replace(sub,"");
},attachClassName:function(_1e6,_1e7){
if(_1e6.classList!=null){
if(!_1e6.classList.contains(_1e7)){
_1e6.classList.add(_1e7);
}
}else{
var _1e8=this._getCurrent(_1e6);
if(!this._contains(_1e8,_1e7)){
_1e8=this._attach(_1e8,_1e7);
}
if(_1e6.style!=null){
_1e6.className=_1e8;
}else{
_1e6.setAttribute("class",_1e8);
}
}
},detachClassName:function(_1e9,_1ea){
if(_1e9.classList!=null){
if(_1e9.classList.contains(_1ea)){
_1e9.classList.remove(_1ea);
}
}else{
var _1eb=this._getCurrent(_1e9);
if(this._contains(_1eb,_1ea)){
_1eb=this._detach(_1eb,_1ea);
}
if(_1e9.style!=null){
_1e9.className=_1eb;
}else{
if(_1eb==""){
_1e9.removeAttribute("class");
}else{
_1e9.setAttribute("class",_1eb);
}
}
}
},hasClassName:function(_1ec,_1ed){
var _1ee=false;
if(_1ec.classList!=null){
_1ee=_1ec.classList.contains(_1ed);
}else{
_1ee=this._contains(this._getCurrent(_1ec),_1ed);
}
return _1ee;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1ef,_1f0){
var _1f1={};
for(var _1f2 in _1ef){
var ent=parseInt(DOMUtil.getComputedStyle(_1f0,_1ef[_1f2]));
_1f1[_1f2]=isNaN(ent)?0:ent;
}
return _1f1;
},_getMargin:function(_1f4){
return this._getComplexResult(this._margins,_1f4);
},getPadding:function(_1f5){
return this._getComplexResult(this._paddings,_1f5);
},getBorder:function(_1f6){
return this._getComplexResult(this._borders,_1f6);
},getPosition:function(_1f7){
return DOMUtil.getComputedStyle(_1f7,"position");
},getFloat:function(_1f8){
return DOMUtil.getComputedStyle(_1f8,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1f9){
return parseInt(DOMUtil.getComputedStyle(_1f9,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1fa){
return DOMUtil.getComputedStyle(_1fa,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1fb=SystemLogger.getLogger("System");
var root=null;
this.hasActivePerspectives=false;
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1fd=new List();
var _1fe=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1fe);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_200){
_1fd.add(new SystemNode(_200));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1fd;
};
this.getChildNodes=function(node,_202){
var _203=new List();
var _204=null;
if(_202){
if(SearchTokens.hasToken(_202)){
_202=SearchTokens.getToken(_202);
}
_204=TreeService.GetElementsBySearchToken(node.getData(),_202);
}else{
_204=TreeService.GetElements(node.getData());
}
new List(_204).each(function(_205){
var _206=new SystemNode(_205);
if(_202){
_206.searchToken=_202;
}
_203.add(_206);
});
return _203;
};
this.getDescendantBranch=function(_207){
var map=new Map();
var arg=[];
_207.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _20b=TreeService.GetMultipleChildren(arg);
var _20c=new List(_20b);
while(_20c.hasNext()){
this._listNodesInMap(_20c.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_20d,_20e,_20f){
var map=new Map();
var arg=[];
_20f.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _213=TreeService.FindEntityToken(_20d,_20e,arg);
if(_213 instanceof SOAPFault){
_1fb.error(_213.getFaultString());
if(Application.isDeveloperMode){
alert(_213.getFaultString());
}
map=null;
}else{
var _214=new List(_213);
while(_214.hasNext()){
this._listNodesInMap(_214.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_215,map){
var list=new List();
var key=_215.ElementKey;
var _219=new List(_215.ClientElements);
map.set(key,list);
while(_219.hasNext()){
var _21a=_219.getNext();
list.add(new SystemNode(_21a));
}
};
this.getChildNodesBySearchToken=function(node,_21c){
return this.getChildNodes(node,_21c);
};
this.getNamedRoots=function(key,_21e){
var _21f=new List();
var _220=null;
if(_21e){
if(SearchTokens.hasToken(_21e)){
_21e=SearchTokens.getToken(_21e);
}
_220=TreeService.GetNamedRootsBySearchToken(key,_21e);
}else{
_220=TreeService.GetNamedRoots(key);
}
new List(_220).each(function(_221){
var node=new SystemNode(_221);
if(_21e){
node.searchToken=_21e;
}
_21f.add(node);
});
return _21f;
};
this.getNamedRootsBySearchToken=function(key,_224){
return this.getNamedRoots(key,_224);
};
function compileActionList(node,_226,_227){
var _228=_226.ClientElementActionGroupId;
if(_228!=null){
var _229=_227.get(_228).ClientElementActionGroupItems;
if(_229&&_229.length>0){
node.setActionList(new List(_229));
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
new List(self._data.Actions).each(function(_22f){
var _230=_22f.ActionCategory.Name;
if(SystemAction.hasCategory(_230)){
var _231=new SystemAction(_22f);
SystemAction.actionMap.set(_22f.ActionKey,_231);
}else{
throw "No such action category: "+_230;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _232=null;
if(this.searchToken){
_232=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_232=System.getChildNodes(this);
}
return _232;
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
var _234=this._data.Piggybag;
if(_234==null){
_234="";
}
return _234;
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
var _236=null;
if(typeof this._data.ToolTip!="undefined"){
_236=this._data.ToolTip;
}
return _236;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_238){
map[_238.Key]=_238.Value;
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
var _23c=SystemAction.actionMap.get(key);
var _23d=true;
if(_23c.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_23d=false;
}
}
if(_23d){
var id=_23c.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_23c);
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
SystemAction.invoke=function(_240,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_240.logger.debug("Execute \""+_240.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_240.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_243,_244){
action=SystemAction.taggedActions.get(_243);
node=SystemNode.taggedNodes.get(_244);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_245){
return SystemAction.categories[_245]?true:false;
};
function SystemAction(_246){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_246;
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
var _247=null;
if(this.isInFolder()){
_247=this._data.ActionCategory.FolderName;
}
return _247;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _248=null;
if(typeof this._data.TagValue!="undefined"){
_248=this._data.TagValue;
}
return _248;
};
SystemAction.prototype.isChecked=function(){
var _249=null;
if(this.isCheckBox()){
_249=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _249;
};
function _UpdateManager(){
var _24a=null;
if(!window.UpdateManager){
this._construct();
_24a=this;
}
return _24a;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_24b){
var root=document.documentElement;
var _24d=root.namespaceURI;
if(_24d==null){
_24d=new String(root.getAttribute("xmlns"));
}
if(_24d=="http://www.w3.org/1999/xhtml"){
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
var _24e=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_24e);
}else{
throw new TypeError();
}
}else{
var _24f=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_24f.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _251=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_251=true;
}
},this);
return _251;
},_setupForm:function(form){
var _254=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_254.isEnabled){
_254._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_255,type){
if(_255.addEventListener!=null){
_255.addEventListener(type,this,false);
}else{
var _257=this;
_255.attachEvent("on"+type,function(){
_257.handleEvent(window.event);
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
var _25c=UpdateAssistant.getUpdateZones(dom);
var _25d=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_25c.forEach(function(_25e,_25f){
var _260=_25d[_25f];
this._crawl(_25e,_260);
},this);
this._updates.forEach(function(_261,_262){
_261.update();
_261.dispose();
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
},_crawl:function(_264,_265,_266,id){
var _268=true;
var _269=_265.getAttribute("class");
if(_269==null||_269.indexOf(this.CLASSNAME_GONE)==-1){
if(_265.nodeType==Node.ELEMENT_NODE){
var _26a=_265.getAttribute("id");
if(_26a!=null){
_266=_264;
id=_26a;
}
}
if(_268=this._check(_264,_265,_266,id)){
var _26b=_264.firstChild;
var _26c=_265.firstChild;
while(_26b!=null&&_26c!=null&&!this._replaced[id]){
switch(_26b.nodeType){
case Node.TEXT_NODE:
_268=this._check(_26b,_26c,_266,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_268=this._crawl(_26b,_26c,_266,id);
break;
}
if(this._replaced[id]){
_268=false;
}else{
_26b=_26b.nextSibling;
_26c=_26c.nextSibling;
}
}
}
}
return _268;
},_check:function(_26d,_26e,_26f,id){
var _271=true;
var _272=null;
var _273=false;
var _274=false;
if((_26d!=null&&_26e==null)||(_26d==null&&_26e!=null)){
_271=false;
}else{
if(_271=_26d.nodeType==_26e.nodeType){
switch(_26e.nodeType){
case Node.ELEMENT_NODE:
if(_26d.namespaceURI!=_26e.namespaceURI||_26d.nodeName!=_26e.nodeName){
_271=false;
}else{
if(_271=(_26d.nodeName==_26e.nodeName)){
var _275=_26e.getAttribute("id");
var _276=_26d.getAttribute("id");
if(_275!=null&&_276!=null){
if(_275!=_276){
_271=false;
}else{
if((_272=this._getPlugin(_26d,_26e))!=null){
if(_272.updateElement(_26d,_26e)){
_274=true;
_271=false;
}
}
}
}
if(_271){
if(_271=this._checkAttributes(_26d,_26e)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_26d)&&this._hasSoftChildren(_26e)){
if(this._validateSoftChildren(_26d,_26e)){
this._updateSoftChildren(_26d,_26e);
_273=true;
}
_271=false;
}else{
_271=_26d.childNodes.length==_26e.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_26d.data.trim()!=_26e.data.trim()){
_271=false;
}
break;
}
}
}
if(_271==false&&!_273&&!_274){
if(id!=null&&_26f!=null){
this.addUpdate(new ReplaceUpdate(id,_26f));
}
}
return _271;
},_checkAttributes:function(_277,_278){
var _279=true;
var _27a=false;
var _27b=_277.attributes;
var _27c=_278.attributes;
if(_27b.length!=_27c.length){
_27a=true;
}else{
_27a=!Array.every(_27b,function(att1,i){
var att2=_27c.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_27a){
var _280=_277.getAttribute("id");
var _281=_278.getAttribute("id");
if(this.hasSoftAttributes&&_280!=null&&_280==_281){
this.addUpdate(new AttributesUpdate(_281,_277,_278));
}else{
_279=false;
}
}
return _279;
},_hasSoftChildren:function(_282){
var _283=true;
if(_282.hasChildNodes()){
_283=Array.every(_282.childNodes,function(node){
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
return _283;
},_validateSoftChildren:function(_286,_287){
var _288=true;
var _289=-1;
var _28a=-1;
var _28b=-1;
var news=this._toMap(_286.childNodes,true);
var olds=this._toMap(_287.childNodes,true);
for(var id in olds){
if(_288){
var _28f=olds[id];
_288=_28f>=_289;
if(news[id]!=null){
_28b=news[id];
_288=_28b>=_28a;
}
}
_289=_28f;
if(_28b>-1){
_28a=_28b;
}
}
return _288;
},_updateSoftChildren:function(_290,_291){
var news=this._toMap(_290.childNodes);
var olds=this._toMap(_291.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _295=null;
for(id in news){
if(olds[id]==null){
var _296=news[id];
if(_295==null){
var _297=_291.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_297,_296,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_295,_296,false));
}
}
_295=id;
}
},addUpdate:function(_298){
this._updates.push(_298);
if(_298 instanceof ReplaceUpdate){
this._replaced[_298.id]=true;
}
},_getPlugin:function(_299,_29a){
var _29b=null;
this.plugins.every(function(_29c){
if(_29c.handleElement(_299,_29a)){
_29b=_29c;
}
return _29b==null;
});
return _29b;
},_toMap:function(_29d,_29e){
var _29f={};
Array.forEach(_29d,function(node,_2a1){
if(node.nodeType==Node.ELEMENT_NODE){
_29f[node.getAttribute("id")]=_29e?_2a1:node;
}
});
return _29f;
},_getPost:function(form){
var _2a3=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2a5){
var name=_2a5.name;
var _2a7=encodeURIComponent(_2a5.value);
switch(_2a5.type){
case "button":
case "submit":
var _2a8=UpdateAssistant.getActiveElement();
if(_2a5==_2a8&&name!=""){
_2a3+=name+"="+_2a7+"&";
}
break;
case "radio":
if(_2a5.checked){
_2a3+=name+"="+_2a7+"&";
}
break;
case "checkbox":
if(_2a5.checked){
if(_2a5.name==last){
if(_2a3.lastIndexOf("&")==_2a3.length-1){
_2a3=_2a3.substr(0,_2a3.length-1);
}
_2a3+=","+_2a7;
}else{
_2a3+=name+"="+_2a5.value;
}
last=name;
_2a3+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2a3+=name+"="+_2a7+"&";
break;
}
});
}
return _2a3.substr(0,_2a3.length-1);
},_postRequest:function(form){
var _2aa=form.method!=""?form.method:"get";
var _2ab=form.action!=""?form.action:window.location.toString();
var _2ac=this._getPost(form);
if(_2aa=="get"){
if(_2ab.indexOf("?")>-1){
_2ab=_2ab+"&"+_2ac;
}else{
_2ab+"?"+_2ac;
}
}
var _2ad=this;
var _2ae=UpdateAssistant.getXMLHttpRequest(_2aa,_2ab,this);
if(_2aa=="post"){
_2ae.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2ae.send(_2aa=="post"?_2ac:null);
},_fixdotnet:function(dom,id){
var _2b1=document.getElementById(id);
if(_2b1!=null){
var _2b2=UpdateAssistant.getElementById(dom,id);
if(_2b2!=null){
var _2b3=_2b2.getAttribute("value");
if(_2b3!==_2b1.value){
_2b1.value=_2b3;
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
},report:function(_2b6){
this.summary+=_2b6+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2b7=null;
if(!window.UpdateAssistant){
this._construct();
_2b7=this;
}
return _2b7;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2b8,fun){
var _2ba=true;
var len=_2b8.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2bc=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b8[i]!="undefined"){
if(!fun.call(_2bc,_2b8[i],i,_2b8)){
_2ba=false;
break;
}
}
}
}
return _2ba;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2bf=arguments[1];
return Array.every(this,fun,_2bf);
};
}
if(!Array.forEach){
Array.forEach=function(_2c0,fun){
var len=_2c0.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c3=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c0[i]!="undefined"){
fun.call(_2c3,_2c0[i],i,_2c0);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2c6=arguments[1];
Array.forEach(this,fun,_2c6);
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
},getXMLHttpRequest:function(_2c8,_2c9,_2ca){
var _2cb=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2cb!=null){
_2cb.open(_2c8,_2c9,(_2ca!=null?true:false));
if(_2ca!=null){
function action(){
if(_2cb.readyState==4){
var text=_2cb.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2ca.handleResponse(dom);
}
}
}
if(_2cb.addEventListener!=null){
_2cb.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2cb.onreadystatechange=action;
}
}
}
return _2cb;
},dispatchEvent:function(_2ce,name){
var _2d0=true;
if(_2ce.fireEvent!=null){
_2d0=_2ce.fireEvent("on"+name);
}else{
var _2d1=document.createEvent("UIEvents");
_2d1.initEvent(name,true,true);
_2d0=_2ce.dispatchEvent(_2d1);
}
return _2d0;
},getUpdateZones:function(dom){
var _2d3="//*[@id and contains(@class,'updatezone')]";
var _2d4=[];
var _2d5=null;
var _2d6=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d5=dom.evaluate(_2d3,dom,null,type,null);
while((_2d6=_2d5.iterateNext())!=null){
_2d4.push(_2d6);
}
}else{
_2d5=dom.documentElement.selectNodes(_2d3);
Array.forEach(_2d5,function(_2d8){
_2d4.push(_2d8);
});
}
return _2d4;
},getElementById:function(dom,id){
var _2db="//*[@id='"+id+"']";
var _2dc=null;
var _2dd=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2dc=dom.evaluate(_2db,dom,null,type,null);
_2dd=_2dc.singleNodeValue;
}else{
_2dd=dom.documentElement.selectNodes(_2db)[0];
}
return _2dd;
},_getIds:function(dom){
var _2e0="//*[@id]";
var _2e1=null;
var _2e2=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e1=dom.evaluate(_2e0,dom,null,type,null);
while((element=_2e1.iterateNext())!=null){
_2e2.push(element.getAttribute("id"));
}
}else{
_2e1=dom.documentElement.selectNodes(_2e0);
Array.forEach(_2e1,function(_2e4){
_2e2.push(_2e4.getAttribute("id"));
});
}
return _2e2;
},toHTMLElement:function(_2e5){
var _2e6=this.serialize(_2e5);
var temp=document.createElement("temp");
temp.innerHTML=_2e6;
return temp.firstChild;
},getActiveElement:function(){
var _2e8=document.activeElement;
if(_2e8==null||_2e8==document.body){
_2e8=this._activeElement;
}
return _2e8;
},serialize:function(_2e9){
var _2ea=null;
if(this._serializer!=null){
_2ea=this._serializer.serializeToString(_2e9);
}else{
_2ea=_2e9.xml;
}
return _2ea;
},hasDifferences:function(_2eb,_2ec){
var s1=null;
var s2=null;
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2eb);
s2=this._serializer.serializeToString(_2ec);
}else{
s1=_2eb.xml;
s2=_2ec.xml;
}
return s1!=s2;
},parse:function(_2ef){
var _2f0=null;
if(this._parser!=null){
_2f0=this._parser.parseFromString(_2ef,"text/xml");
}else{
_2f0=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2f0.setProperty("SelectionLanguage","XPath");
_2f0.loadXML(_2ef);
}
return this._validate(_2f0);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f3=dom.getElementsByTagName("parsererror").item(0);
if(_2f3!=null){
out=_2f3.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2f7=!has[id];
has[id]=true;
if(!_2f7){
out="Element \""+id+"\" encountered twice.";
}
return _2f7;
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
this.handleElement=function(_2f8,_2f9){
var _2fa=false;
switch(_2f8.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2f8.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2fa=false;
break;
}
break;
}
return _2fa;
};
this.updateElement=function(_2fb,_2fc){
var id=_2fb.getAttribute("id");
var _2fe=document.getElementById(id);
if(_2fe!=null){
var _2ff=null;
switch(_2fe.nodeName.toLowerCase()){
case "input":
_2ff=_2fb.getAttribute("value");
break;
case "textarea":
_2ff=_2fb.textContent?_2fb.textContent:_2fb.text;
break;
}
if(_2ff==null){
_2ff="";
}
if(_2ff!=_2fe.value){
_2fe.value=_2ff;
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
},_beforeUpdate:function(_300){
var _301=true;
if(_300!=null){
_300.__updateType=this.type;
_301=UpdateAssistant.dispatchEvent(_300,Update.EVENT_BEFOREUPDATE);
}
return _301;
},_afterUpdate:function(_302){
var _303=true;
if(_302!=null){
_302.__updateType=this.type;
_303=UpdateAssistant.dispatchEvent(_302,Update.EVENT_AFTERUPDATE);
}
return _303;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_305){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_305;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _306,_307,_308=UpdateAssistant.toHTMLElement(this.element);
if((_306=document.getElementById(this.id))!=null){
if((_307=_306.parentNode)!=null){
if(this._beforeUpdate(_306)){
_307.replaceChild(_308,_306);
this._afterUpdate(_308);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_309){
var _30a=ReplaceUpdate.superclass._afterUpdate.call(this,_309);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_309.nodeName=="form"||_309.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _30a;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_30d,_30e){
this.type=type;
this.id=id;
this.element=_30d;
this.isFirst=_30e;
return this;
}
SiblingUpdate.prototype.update=function(){
var _30f=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_30f);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_30f);
break;
}
};
SiblingUpdate.prototype._remove=function(_310){
var _311=_310.parentNode;
if(_311!=null){
if(this._beforeUpdate(_310)){
_311.removeChild(_310);
this._afterUpdate(_311);
}
}
};
SiblingUpdate.prototype._insert=function(_312,_313){
var _314=UpdateAssistant.toHTMLElement(_312);
if(this.isFirst){
var _315=_313;
if(_315!=null){
if(this._beforeUpdate(_315)){
_315.insertBefore(_314,_315.firstChild);
this._afterUpdate(_314);
}
}
}else{
var _315=_313.parentNode;
if(_315!=null){
if(this._beforeUpdate(_315)){
_315.insertBefore(_314,_313.nextSibling);
this._afterUpdate(_314);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_316){
var _317=SiblingUpdate.superclass._beforeUpdate.call(this,_316);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_316.id+"\"");
}
return _317;
};
SiblingUpdate.prototype._afterUpdate=function(_318){
var _319=true;
if(_318!=null){
_319=SiblingUpdate.superclass._afterUpdate.call(this,_318);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_318.id+"\"");
if(_318.nodeName=="form"||_318.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _319;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_31b,_31c){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_31b;
this.currentElement=_31c;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _31d=document.getElementById(this.id);
if(this._beforeUpdate(_31d)){
this._updateAttributes(_31d);
this._afterUpdate(_31d);
}
};
AttributesUpdate.prototype._updateAttributes=function(_31e){
Array.forEach(this.element.attributes,function(_31f){
var _320=this.currentElement.getAttribute(_31f.nodeName);
if(_320==null||_320!=_31f.nodeValue){
this._setAttribute(_31e,_31f.nodeName,_31f.nodeValue);
this._summary.push("@"+_31f.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_321){
if(this.element.getAttribute(_321.nodeName)==null){
this._setAttribute(_31e,_321.nodeName,null);
this._summary.push("@"+_321.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_322,name,_324){
if(_322==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_324);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _325=(_324==null);
if(_325){
_322.removeAttribute(name);
}else{
_322.setAttribute(name,_324);
}
if(document.all!=null){
if(_325){
_324="";
}
switch(name.toLowerCase()){
case "class":
_322.className=_324;
break;
case "disabled":
_322.disabled=!_325;
break;
case "checked":
_322.checked=!_325;
break;
case "readonly":
_322.readOnly=!_325;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_326){
AttributesUpdate.superclass._afterUpdate.call(this,_326);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_327,key){
return _327.replace("${windowkey}",document.location+":"+key);
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
var _32b=this._newDimensions.w!=this._currentDimensions.w;
var _32c=this._newDimensions.h!=this._currentDimensions.h;
if(_32b||_32c){
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
},fireOnDOM:function(_32e){
if(Interfaces.isImplemented(IDOMHandler,_32e,true)){
this._ondomstatements.add(_32e);
}
},fireOnLoad:function(_32f){
if(Interfaces.isImplemented(ILoadHandler,_32f,true)){
this._onloadstatements.add(_32f);
}
},fireOnResize:function(_330){
if(Interfaces.isImplemented(IResizeHandler,_330,true)){
this._onresizestatements.add(_330);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_331){
return eval(_331);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_332,_333){
SystemLogger.unsuspend(_333);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_334,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _337=top.app.bindingMap.broadcasterHasDirtyTabs;
_337.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_338,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _33b=top.app.bindingMap.broadcasterHasDirtyTabs;
_33b.disable();
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
var _33c=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_33c=LoginService.Logout(true);
if(!_33c){
alert("Logout failed.");
}
}
return _33c;
},lock:function(_33d){
if(_33d!=null){
this._lockthings[_33d]=true;
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
},unlock:function(_33e,_33f){
if(_33e!=null){
delete this._lockthings[_33e];
if(top.bindingMap.mastercover!=null){
if(_33f||this._lockers>0){
if(_33f){
var out="Unlocked by "+new String(_33e)+"\n";
for(var _341 in this._lockthings){
out+="Locked by "+new String(_341)+". ";
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
},hasLock:function(_342){
return this._lockthings[_342]==true;
},activate:function(_343){
var _344=this._activeBinding;
this._activeBinding=_343;
this._activatedBindings.add(_343);
if(_344&&_344.isActive){
_344.deActivate();
}
},deActivate:function(_345){
var _346=null;
var _347=null;
if(_345==this._activeBinding){
while(!_347&&this._activatedBindings.hasEntries()){
_346=this._activatedBindings.extractLast();
if(_346!=_345&&_346.isActivatable){
_347=_346;
}
}
if(!_347){
_347=app.bindingMap.explorerdock;
}
_347.activate();
}
},focused:function(_348){
this.isFocused=_348;
if(_348){
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
},handleAction:function(_34d){
switch(_34d.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _34f=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_351){
var src=_351.src;
if(src.indexOf(_34f)>-1){
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
var _356=false;
if(this._isMousePositionTracking){
_356=true;
if(Client.isExplorer&&e.button!=1){
_356=false;
}
if(_356){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _356;
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
},onDragStart:function(_358){
var _359=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_359,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_359.getImage());
this._cursorStartPoint=_358;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_359.showDrag){
_359.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_359.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _35b=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_35b);
}
},onDragStop:function(diff){
if(this._isDragging){
var _35d=BindingDragger.draggedBinding;
if(_35d.hideDrag){
_35d.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_35d.dragType);
this._isDragging=false;
_35d=BindingAcceptor.acceptingBinding;
if(_35d!=null){
if(Interfaces.isImplemented(IAcceptable,_35d,true)==true){
_35d.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_35d);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_35e){
if(this.isDeveloperMode||_35e){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_35f){
if(_35f==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_360){
switch(_360){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_362){
switch(_362.Key){
case "ProductVersion":
this.versionString=_362.Value;
break;
case "ProductTitle":
this.versionPrettyString=_362.Value;
break;
case "InstallationId":
this.installationID=_362.Value;
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
},initialize:function(_365){
if(!this.isInitialized){
this.isInitialized=true;
if(_365){
this._audio=_365;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _367=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_367=true;
}
return _367;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _368=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _369={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _36a=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_36a){
for(var key in _36a){
_369[key]=_36a[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_369);
}
}});
this.getPref=function(key){
var _36d=null;
if(key){
_36d=_369[key];
}else{
throw "No such preference.";
}
return _36d;
};
this.setPref=function(key,_36f){
if(key){
_369[key]=_36f;
}else{
throw "No such preference.";
}
};
function debug(_370){
var _371=_370?"Persisted preferences":"No persisted preferences. Using defaults";
_371+=":\n";
for(var key in _369){
var pref=_369[key];
_371+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_368.fine(_371);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _376=null;
if(this.isInitialized==true){
if(this._persistance){
var _377=this._persistance[id];
if(_377){
_376=_377[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _376;
},setPersistedProperty:function(id,prop,_37a){
if(this.isInitialized==true){
if(this._persistance){
if(_37a!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_37a);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_37b){
switch(_37b){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _37c=top.bindingMap.persistance;
_37c.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _37d=top.bindingMap.persistance;
var map=_37d.getPersistanceMap();
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
function StandardEventHandler(doc,_380){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_380;
this._addListeners();
}
StandardEventHandler.prototype._addListeners=function(){
var doc=this._contextDocument;
DOMEvents.addEventListener(doc,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEUP,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEMOVE,this);
if(Client.isExplorer){
function supress(){
return false;
}
this._contextDocument.onhelp=supress;
this._contextWindow.onhelp=supress;
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
var _382={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_382);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_382);
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
var _389=UserInterface.getBinding(node);
if(_389!=null){
_389.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_389!=null?null:node.parentNode;
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
var _38c=Application.trackMousePosition(e);
if(_38c){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_38e){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_38e){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_38e=true;
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
var _38f=KeySetBinding.handleKey(this._contextDocument,e);
if(!_38f){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _390=this._contextWindow.frameElement;
if(_390!=null){
var _391=DOMUtil.getParentWindow(_390);
if(_391.standardEventHandler!=null){
_391.standardEventHandler._handleKeyDown(e,_38e);
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
var _394=false;
var _395=DOMEvents.getTarget(e);
var name=_395.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_394=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_394;
}
if(_394){
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
StandardEventHandler.prototype.enableNativeKeys=function(_398){
this._isAllowTabs=(_398==true?true:false);
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
function Action(_39b,type){
this.target=_39b;
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
function Animation(_39d){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _39e in _39d){
this[_39e]=_39d[_39e];
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
Animation.prototype.onstart=function(_3a2){
};
Animation.prototype.onstep=function(_3a3){
};
Animation.prototype.onstop=function(_3a4){
};
Point.isEqual=function(p1,p2){
var _3a7=false;
if(p1&&p2){
_3a7=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a7;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3ac=false;
if(dim1&&dim2){
_3ac=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3ac;
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
function BindingAcceptor(_3b3){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b3;
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
var _3b4=new List(this._binding.dragAccept.split(" "));
while(_3b4.hasNext()){
var type=_3b4.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3b6,arg){
var type=arg;
try{
switch(_3b6){
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
function BindingBoxObject(_3bb){
this._domElement=_3bb.getBindingElement();
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
function BindingDragger(_3bd){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3bd;
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
BindingDragger.prototype.registerHandler=function(_3bf){
if(Interfaces.isImplemented(IDragHandler,_3bf)==true){
this.handler=_3bf;
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
var _3c2=e.button==(e.target?0:1);
if(_3c2){
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
var _3c4=Application.getMousePosition();
var dx=_3c4.x-this.startPoint.x;
var dy=_3c4.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c7,e){
switch(_3c7){
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
function BindingParser(_3c9){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3c9;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3ca){
var _3cb=new List();
var xml=BindingParser.XML.replace("${markup}",_3ca);
var doc=XMLParser.parse(_3ca);
if(doc){
var _3ce=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3ce);
var node=_3ce.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3cb.add(node);
}
node=node.nextSibling;
}
}
return _3cb;
};
BindingParser.prototype._iterate=function(_3d0,_3d1){
var _3d2=null;
switch(_3d0.nodeType){
case Node.ELEMENT_NODE:
_3d2=this._cloneElement(_3d0);
UserInterface.registerBinding(_3d2);
break;
case Node.TEXT_NODE:
_3d2=this._ownerDocument.createTextNode(_3d0.nodeValue);
break;
}
if(_3d2){
_3d1.appendChild(_3d2);
}
if(_3d2&&_3d0.hasChildNodes()){
var _3d3=_3d0.firstChild;
while(_3d3){
this._iterate(_3d3,_3d2);
_3d3=_3d3.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3d4){
var _3d5=DOMUtil.createElementNS(_3d4.namespaceURI?_3d4.namespaceURI:Constants.NS_XHTML,_3d4.nodeName,this._ownerDocument);
var i=0;
while(i<_3d4.attributes.length){
var attr=_3d4.attributes.item(i++);
_3d5.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3d5;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3d8){
var _3d9=null;
var _3da=false;
var _3db=_3d8.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d8)){
var _3dc=UserInterface.getBinding(_3d8);
_3da=BindingSerializer.activeInstance.indexBinding(_3dc);
if(_3da){
_3d9=_3dc.key;
_3d8.setAttribute(BindingSerializer.KEYPOINTER,_3d9);
}
}
_3d9=_3d9?_3d9:_3db;
var _3dd=new List(_3d8.childNodes);
_3dd.each(function(_3de){
if(_3de.nodeType==Node.ELEMENT_NODE){
_3de.setAttribute(BindingSerializer.KEYPOINTER,_3d9);
}
});
if(_3da){
BindingSerializer.activeInstance.append(_3d9,_3db);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3df,_3e0){
BindingSerializer.includeShadowTreeBindings=_3e0?true:false;
BindingSerializer.activeInstance=this;
_3df.bindingWindow.ElementIterator.iterate(_3df.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e1){
var _3e2=false;
var _3e3=_3e1.serialize();
if(_3e3!=false){
_3e2=true;
var _3e4="ui:"+DOMUtil.getLocalName(_3e1.bindingElement);
var _3e5=DOMUtil.createElementNS(Constants.NS_UI,_3e4,this._dom);
this._pointers[_3e1.key]=_3e5;
for(var prop in _3e3){
if(_3e3[prop]!=null){
_3e5.setAttribute(prop,String(_3e3[prop]));
}
}
}
return _3e2;
};
BindingSerializer.prototype.append=function(_3e7,_3e8){
var _3e9=this._pointers[_3e7];
var _3ea=_3e8?this._pointers[_3e8]:this._dom;
_3ea.appendChild(_3e9);
};
function ImageProfile(_3eb){
this._default=_3eb.image;
this._hover=_3eb.imageHover;
this._active=_3eb.imageActive;
this._disabled=_3eb.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3ec){
this._default=_3ec;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3ed){
this._hover=_3ed;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3ee){
this._active=_3ee;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3ef){
this._disabled=_3ef;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f0,_3f1,_3f2){
var _3f3=null;
if(_3f0.isAttached){
_3f3=new List();
var _3f4=_3f2?_3f0.getChildElementsByLocalName(_3f1):_3f0.getDescendantElementsByLocalName(_3f1);
_3f4.each(function(_3f5){
var _3f6=UserInterface.getBinding(_3f5);
if(_3f6){
_3f3.add(_3f6);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f0.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f3;
},getAncestorBindingByType:function(_3f8,impl,_3fa){
var _3fb=null;
if(Binding.exists(_3f8)){
var node=_3f8.bindingElement;
while(_3fb==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3fd=UserInterface.getBinding(node);
if(_3fd instanceof impl){
_3fb=_3fd;
}
}else{
if(_3fa&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3fb;
},getAncestorBindingByLocalName:function(_3ff,_400,_401){
var _402=null;
if(_400=="*"){
var node=_3ff.bindingElement;
while(!_402&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_402=UserInterface.getBinding(node);
}
}
}else{
_402=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_400,_3ff.bindingElement,_401));
}
return _402;
},getChildElementsByLocalName:function(_404,_405){
var _406=new List();
var _407=new List(_404.bindingElement.childNodes);
_407.each(function(_408){
if(_408.nodeType==Node.ELEMENT_NODE){
if(_405=="*"||DOMUtil.getLocalName(_408)==_405){
_406.add(_408);
}
}
});
return _406;
},getChildBindingByType:function(_409,impl){
var _40b=null;
_409.getChildElementsByLocalName("*").each(function(_40c){
var _40d=UserInterface.getBinding(_40c);
if(_40d!=null&&_40d instanceof impl){
_40b=_40d;
return false;
}else{
return true;
}
});
return _40b;
},getDescendantBindingByType:function(_40e,impl){
var _410=null;
_40e.getDescendantElementsByLocalName("*").each(function(_411){
var _412=UserInterface.getBinding(_411);
if(_412!=null&&_412 instanceof impl){
_410=_412;
return false;
}else{
return true;
}
});
return _410;
},getDescendantBindingsByType:function(_413,impl){
var _415=new List();
_413.getDescendantElementsByLocalName("*").each(function(_416){
var _417=UserInterface.getBinding(_416);
if(_417!=null&&_417 instanceof impl){
_415.add(_417);
}
return true;
});
return _415;
},getNextBindingByLocalName:function(_418,name){
var _41a=null;
var _41b=_418.bindingElement;
while((_41b=DOMUtil.getNextElementSibling(_41b))!=null&&DOMUtil.getLocalName(_41b)!=name){
}
if(_41b!=null){
_41a=UserInterface.getBinding(_41b);
}
return _41a;
},getPreviousBindingByLocalName:function(_41c,name){
var _41e=null;
var _41f=_41c.bindingElement;
while((_41f=DOMUtil.getPreviousElementSibling(_41f))!=null&&DOMUtil.getLocalName(_41f)!=name){
}
if(_41f!=null){
_41e=UserInterface.getBinding(_41f);
}
return _41e;
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
},addFilter:function(_420){
this._filters.add(_420);
},removeFilter:function(_421){
var _422=-1;
this._filters.each(function(fil){
_422++;
var _424=true;
if(fil==_421){
_424=false;
}
return _424;
});
if(_422>-1){
this._filters.del(_422);
}
},_applyFilters:function(node,arg){
var _427=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _42a=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _42b=true;
while(this._filters.hasNext()&&_42b==true){
var _42c=this._filters.getNext();
var res=_42c.call(this,node,arg);
if(res!=null){
_427=res;
switch(res){
case stop:
case skip:
case skip+_42a:
_42b=false;
break;
}
}
}
return _427;
},crawl:function(_42e,arg){
this.contextDocument=_42e.ownerDocument;
this.onCrawlStart();
var _430=this.type==NodeCrawler.TYPE_ASCENDING;
var _431=this._applyFilters(_42e,arg);
if(_431!=NodeCrawler.STOP_CRAWLING){
if(_430&&_431==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_430?_42e.parentNode:_42e;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_433,arg){
var _435=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_435=this._crawlDescending(_433,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_435=this._crawlAscending(_433,arg);
break;
}
return _435;
},_crawlDescending:function(_436,arg){
var skip=NodeCrawler.SKIP_NODE;
var _439=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _43b=null;
if(_436.hasChildNodes()){
var node=_436.firstChild;
while(node!=null&&_43b!=stop){
this.currentNode=node;
_43b=this._applyFilters(node,arg);
switch(_43b){
case stop:
case _439:
case skip+_439:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_43b=stop;
break;
}
}
}
if(_43b!=stop&&_43b!=skip){
this.previousNode=node;
}
break;
}
if(_43b!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _43b;
},_crawlAscending:function(_43e,arg){
var _440=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_43e!=null){
this.currentNode=_43e;
_440=this._applyFilters(_43e,arg);
if(_440!=stop){
var next=this.nextNode?this.nextNode:_43e.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_43e;
_440=this._crawl(next,arg);
}
}
}else{
_440=stop;
}
return _440;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _444 in this){
this[_444]=null;
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
var _447=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_447=NodeCrawler.SKIP_NODE;
}
return _447;
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
this.addFilter(function(_448,arg){
var _44a=null;
if(!UserInterface.hasBinding(_448)){
_44a=NodeCrawler.SKIP_NODE;
}
return _44a;
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
this.addFilter(function(_44c,arg){
var _44e=null;
var _44f=UserInterface.getBinding(_44c);
if(Interfaces.isImplemented(ICrawlerHandler,_44f)==true){
self.response=null;
_44f.handleCrawler(self);
_44e=self.response;
}
return _44e;
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
this.addFilter(function(_451,list){
var _453=null;
var _454=UserInterface.getBinding(_451);
if(Interfaces.isImplemented(IFlexible,_454)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_454);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_454.isFlexSuspended==true){
_453=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_454);
}
break;
}
}
return _453;
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
this.addFilter(function(_455,list){
var _457=null;
var _458=UserInterface.getBinding(_455);
if(_458.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_458)==true){
if(_458.isFocusable&&_458.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_458);
break;
case FocusCrawler.MODE_FOCUS:
if(!_458.isFocused){
_458.focus();
}
_457=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_458.isFocused==true){
_458.blur();
_457=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _457;
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
this.addFilter(function(_459,list){
var _45b=null;
var _45c=UserInterface.getBinding(_459);
if(!_45c.isVisible){
_45b=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _45b;
});
this.addFilter(function(_45d,list){
var _45f=null;
var _460=UserInterface.getBinding(_45d);
if(_460.isAttached){
if(Interfaces.isImplemented(IFit,_460)){
if(!_460.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_460);
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
UpdateAssistant.serialize=function(_461){
_461=_461.cloneNode(true);
_461.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_461.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_461);
};
}
},handleEvent:function(e){
var _463=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_463);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_463);
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
},_beforeUpdate:function(_464){
var _465=(_464==document.documentElement);
if(_465){
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
var _468=FocusBinding.focusedBinding;
if(_468!=null){
this._focusID=_468.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_464.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_464);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_464,false);
break;
}
}
},_afterUpdate:function(_469){
var _46a=(_469==document.documentElement);
if(_46a){
var _46b=this._elementsbuffer;
if(_46b.hasEntries()){
_46b.each(function(_46c){
DocumentManager.attachBindings(_46c);
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
var _46f=FocusBinding.focusedBinding;
if(_46f==null){
var _470=document.getElementById(this._focusID);
if(_470!=null){
var _46f=UserInterface.getBinding(_470);
if(_46f!=null){
_46f.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _471=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _472="NEW DOM: "+document.title+"\n\n"+_471+"\n\n";
_472+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_472);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_469.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_469);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_469,true);
break;
}
switch(_469.id){
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
var _46f=UserInterface.getBinding(_469);
while(_46f==null&&_469!=null){
_46f=UserInterface.getBinding(_469);
_469=_469.parentNode;
}
if(_46f!=null){
_46f.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_474,_475){
var _476=UserInterface.getBinding(_474);
if(_476!=null){
if(_475){
var _477=this._attributesbuffer;
var map=new Map();
_477.each(function(name,old){
var now=_474.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_474.attributes).each(function(att){
if(att.specified){
if(!_477.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_47e){
var _47f=_476.propertyMethodMap[name];
if(_47f!=null){
_47f.call(_476,_47e);
}
});
}else{
var map=new Map();
new List(_474.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_481,_482){
var _483=window.bindingMap[_481.getAttribute("id")];
if(_483!=null){
return _483.handleElement(_481,_482);
}
},updateElement:function(_484,_485){
var _486=window.bindingMap[_484.getAttribute("id")];
if(_486!=null){
return _486.updateElement(_484,_485);
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
this.addFilter(function(_488,list){
var _48a=UserInterface.getBinding(_488);
var _48b=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_48a==null){
UserInterface.registerBinding(_488);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_48a!=null){
if(!_48a.isAttached){
list.add(_48a);
}
if(_48a.isLazy==true){
_48b=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_48a!=null){
list.add(_48a);
}
break;
}
return _48b;
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
},handleBroadcast:function(_48c,arg){
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
var _48f=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_48f)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_48f!=null){
if(_48f.href!=null&&_48f.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _490=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_490!=null){
var map={};
var _492=DOMUtil.getElementsByTagName(_490,"bindingmapping");
new List(_492).each(function(_493){
var _494=_493.getAttribute("element");
var _495=_493.getAttribute("binding");
map[_494]=eval(_495);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_496){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_496;
}else{
this.customUserInterfaceMapping.merge(_496);
}
},_registerBindings:function(_497){
var _498=new DocumentCrawler();
_498.mode=DocumentCrawler.MODE_REGISTER;
_498.crawl(_497);
_498.dispose();
},_attachBindings:function(_499){
var _49a=new DocumentCrawler();
_49a.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_49a.crawl(_499,list);
var _49c=false;
while(list.hasNext()){
var _49d=list.getNext();
if(!_49d.isAttached){
_49d.onBindingAttach();
if(!_49d.memberDependencies){
_49d.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_49d)){
_49c=true;
}
}
}
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
},attachBindings:function(_49f){
this._registerBindings(_49f);
this._attachBindings(_49f);
},detachBindings:function(_4a0,_4a1){
var _4a2=new DocumentCrawler();
_4a2.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a2.crawl(_4a0,list);
if(_4a1==true){
list.extractFirst();
}
var _4a4=false;
list.reverse().each(function(_4a5){
if(Interfaces.isImplemented(IData,_4a5)){
_4a4=true;
}
_4a5.dispose(true);
});
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
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4a7){
return (/textarea|input/.test(DOMUtil.getLocalName(_4a7)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a8){
this.isDirty=true;
var _4a9=false;
if(_4a8!=null&&!_4a8.isDirty){
_4a8.isDirty=true;
_4a8.dispatchAction(Binding.ACTION_DIRTY);
_4a9=true;
}
return _4a9;
},clean:function(_4aa){
if(_4aa.isDirty){
_4aa.isDirty=false;
}
},registerDataBinding:function(name,_4ac){
if(Interfaces.isImplemented(IData,_4ac,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4ac;
}
}else{
throw "Invalid DataBinding: "+_4ac;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4af=null;
if(this._dataBindings[name]!=null){
_4af=this._dataBindings[name];
}
return _4af;
},getAllDataBindings:function(_4b0){
var list=new List();
for(var name in this._dataBindings){
var _4b3=this._dataBindings[name];
list.add(_4b3);
if(_4b0&&_4b3 instanceof WindowBinding){
var _4b4=_4b3.getContentWindow().DataManager;
if(_4b4!=null){
list.merge(_4b4.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4b5=false;
for(var name in this._dataBindings){
_4b5=true;
break;
}
return _4b5;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4b9){
var _4ba=this._dataBindings[name];
if(_4ba!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4ba.setResult(_4b9);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4ba);
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
var _4bb=new DataBindingMap();
_4bb.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4bd=this._dataBindings[name];
if(_4bd instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4bb[name]=_4bd.getValue();
}
return _4bb;
},getDataBindingResultMap:function(){
var _4be=new DataBindingMap();
_4be.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c0=this._dataBindings[name];
var res=_4c0.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c3){
_4be.set(name,_4c3);
});
}else{
_4be.set(name,res);
}
}
return _4be;
},getPostBackString:function(){
var _4c4="";
var form=document.forms[0];
if(form!=null){
var _4c6="";
new List(form.elements).each(function(_4c7){
var name=_4c7.name;
var _4c9=encodeURIComponent(_4c7.value);
switch(_4c7.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c4+=name+"="+_4c9+"&";
break;
case "submit":
if(document.activeElement==_4c7){
_4c4+=name+"="+_4c9+"&";
}
break;
case "radio":
if(_4c7.checked){
_4c4+=name+"="+_4c9+"&";
}
break;
case "checkbox":
if(_4c7.checked){
if(_4c7.name==_4c6){
if(_4c4.lastIndexOf("&")==_4c4.length-1){
_4c4=_4c4.substr(0,_4c4.length-1);
}
_4c4+=","+_4c9;
}else{
_4c4+=name+"="+_4c7.value;
}
_4c6=name;
_4c4+="&";
}
break;
}
});
}
return _4c4.substr(0,_4c4.length-1);
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
var _4d2=null;
var _4d3=null;
var _4d4=false;
if(!this._cache[name]){
_4d4=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4d6=DOMUtil.getXMLHTTPRequest();
_4d6.open("get",uri,false);
_4d6.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4d6.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d3=_4d6.responseText;
break;
default:
_4d3=_4d6.responseXML;
break;
}
if(_4d3==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d3;
}
}
_4d3=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d2=_4d3;
break;
case this._modes.MODE_DOCUMENT:
_4d2=DOMUtil.cloneNode(_4d3,true);
break;
case this._modes.MODE_ELEMENT:
_4d2=DOMUtil.cloneNode(_4d3.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d2=DOMSerializer.serialize(_4d3,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d2=DOMSerializer.serialize(_4d3.documentElement,true);
break;
}
if(_4d4&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4d2));
}
return _4d2;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4d9){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4d9];
},invoke:function(url,_4db,_4dc){
this._logger.error("Not implemented");
},invokeModal:function(url,_4de,_4df){
var _4e0=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4de,argument:_4df});
StageBinding.presentViewDefinition(_4e0);
return _4e0;
},invokeDefinition:function(_4e1){
if(_4e1 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e1);
}
return _4e1;
},question:function(_4e2,text,_4e4,_4e5){
if(!_4e4){
_4e4=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e2,text,_4e4,_4e5);
},message:function(_4e6,text,_4e8,_4e9){
if(!_4e8){
_4e8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4e6,text,_4e8,_4e9);
},error:function(_4ea,text,_4ec,_4ed){
if(!_4ec){
_4ec=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4ea,text,_4ec,_4ed);
},warning:function(_4ee,text,_4f0,_4f1){
if(!_4f0){
_4f0=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4ee,text,_4f0,_4f1);
},_standardDialog:function(type,_4f3,text,_4f5,_4f6){
var _4f7=null;
if(!_4f5){
_4f7=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4f7=new List();
new List(_4f5).each(function(_4f8){
var _4f9=null;
switch(typeof _4f8){
case "object":
_4f9=_4f8;
break;
case "string":
var _4fa=false;
if(_4f8.indexOf(":")>-1){
_4f8=_4f8.split(":")[0];
_4fa=true;
}
_4f9=Dialog.dialogButton(_4f8);
if(_4fa){
_4f9.isDefault=true;
}
break;
}
_4f7.add(_4f9);
});
}
var _4fb={title:_4f3,text:text,type:type,image:this._dialogImages[type],buttons:_4f7};
var _4fc=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4f6,argument:_4fb});
StageBinding.presentViewDefinition(_4fc);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4fe,arg){
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
},saveAll:function(_501){
var self=this;
var _503=Application.getDirtyDockTabsTabs();
if(_503.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_504,_505){
switch(_504){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_505,_501);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_503);
}else{
if(_501){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_506,_507){
var _508=false;
var list=new List();
_506.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_508=true;
var _50c=list.getLength();
var _50d={handleBroadcast:function(_50e,tab){
if(--_50c==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_507){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_50d);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _508;
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
var _512="Composite.Management.Help";
if(!StageBinding.isViewOpen(_512)){
StageBinding.handleViewPresentation(_512);
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
var _514=document.createEvent("Events");
_514.initEvent(type,true,true);
window.dispatchEvent(_514);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function MediaUrl(url){
var _516=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)media(\(|%28)[\w\d-\:]+(\)|%29)/;
if(_516.test(url)){
var _517={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_517[$1]=$3;
});
this.queryString=_517;
this.path=url.replace(/\?.*/g,"");
this.isMedia=true;
}
return this;
}
MediaUrl.prototype.getPath=function(){
return this.path;
};
MediaUrl.prototype.hasParam=function(key){
return this.queryString[key]!=null;
};
MediaUrl.prototype.getParam=function(key){
return this.queryString[key];
};
MediaUrl.prototype.setParam=function(key,_51f){
this.queryString[key]=_51f;
};
MediaUrl.prototype.toString=function(){
var url=this.path;
var _521=[];
for(var key in this.queryString){
_521.push(key+"="+this.queryString[key]);
}
if(_521.length>0){
url+="?"+_521.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_523,_524){
var _525=null;
var _526=ViewDefinitions[_523];
if(_526.isMutable){
var impl=null;
if(_526 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_524!=null&&impl!=null){
var def=new impl();
for(var prop in _526){
def[prop]=ViewDefinition.cloneProperty(_526[prop]);
}
def.handle=_524;
_525=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _525;
};
ViewDefinition.cloneProperty=function(_52a){
if(null==_52a){
return _52a;
}
if(typeof _52a==="object"){
var _52b=(_52a.constructor===Array)?[]:{};
for(var prop in _52a){
_52b[prop]=ViewDefinition.cloneProperty(_52a[prop]);
}
return _52b;
}
return _52a;
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
Binding.ACTION_POSITIONCHANGED="bindingpositionchanged";
Binding.ACTION_DIMENSIONCHANGED="bindingdimensionchanged";
Binding.ACTION_VISIBILITYCHANGED="bindingvisibilitychanged";
Binding.ABSTRACT_METHOD=function(){
SystemDebug.stack(arguments);
throw (this.toString()+" abstract method not implemented");
};
Binding.evaluate=function(_532,_533){
var _534=null;
var _535=_533.bindingWindow.WindowManager;
if(_535!=null){
var _536=Binding.parseScriptStatement(_532,_533.key);
_534=_535.evaluate(_536);
}
return _534;
};
Binding.parseScriptStatement=function(_537,key){
if(_537!=null&&key!=null){
var _539="UserInterface.getBindingByKey ( \""+key+"\" )";
_537=_537.replace(/(\W|^)this(,| +|\)|;)/g,_539);
_537=_537.replace(/(\W|^)this(\.)/g,_539+".");
}
return _537;
};
Binding.exists=function(_53a){
var _53b=false;
try{
if(_53a&&_53a.bindingElement&&_53a.bindingElement.nodeType&&_53a.isDisposed==false){
_53b=true;
}
}
catch(accessDeniedException){
_53b=false;
}
finally{
return _53b;
}
};
Binding.destroy=function(_53c){
if(!_53c.isDisposed){
if(_53c.acceptor!=null){
_53c.acceptor.dispose();
}
if(_53c.dragger!=null){
_53c.disableDragging();
}
if(_53c.boxObject!=null){
_53c.boxObject.dispose();
}
if(_53c._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_53c);
}
for(var _53d in _53c.shadowTree){
var _53e=_53c.shadowTree[_53d];
if(_53e instanceof Binding&&Binding.exists(_53e)){
_53e.dispose(true);
}
_53c.shadowTree[_53d]=null;
}
_53c.isDisposed=true;
_53c=null;
}
};
Binding.dotnetify=function(_53f,_540){
var _541=_53f.getCallBackID();
if(_541!=null){
var _542=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_53f.bindingDocument);
_542.type="hidden";
_542.id=_541;
_542.name=_541;
_542.value=_540!=null?_540:"";
_53f.bindingElement.appendChild(_542);
_53f.shadowTree.dotnetinput=_542;
}else{
throw _53f.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_543){
var _544=_543.getProperty("image");
var _545=_543.getProperty("image-hover");
var _546=_543.getProperty("image-active");
var _547=_543.getProperty("image-disabled");
if(_543.imageProfile==null){
if(_543.image==null&&_544!=null){
_543.image=_544;
}
if(_543.imageHover==null&&_545!=null){
_543.imageHover=_544;
}
if(_543.imageActive==null&&_546!=null){
_543.imageActive=_546;
}
if(_543.imageDisabled==null&&_547!=null){
_543.imageDisabled=_547;
}
if(_543.image||_543.imageHover||_543.imageActive||_543.imageDisabled){
_543.imageProfile=new ImageProfile(_543);
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
this.isShadowBinding=false;
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
var _549=this.dependentBindings[key];
_549.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_54a){
if(_54a){
this.memberDependencies[_54a.key]=true;
var _54b=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_54b=false;
break;
}
}
if(_54b){
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
Binding.prototype.detachRecursive=function(_54d){
if(_54d==null){
_54d=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_54d);
};
Binding.prototype.addMember=function(_54e){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_54e.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_54e.key]=false;
_54e.registerDependentBinding(this);
}
}
return _54e;
};
Binding.prototype.addMembers=function(_54f){
while(_54f.hasNext()){
var _550=_54f.getNext();
if(!_550.isInitialized){
this.addMember(_550);
}
}
return _54f;
};
Binding.prototype.registerDependentBinding=function(_551){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_551.key]=_551;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _552=this.getProperty("persist");
if(_552&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _554=new List(_552.split(" "));
while(_554.hasNext()){
var prop=_554.getNext();
var _556=Persistance.getPersistedProperty(id,prop);
if(_556!=null){
this._persist[prop]=_556;
this.setProperty(prop,_556);
}else{
_556=this.getProperty(prop);
if(_556!=null){
this._persist[prop]=_556;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _557=this.getProperty("disabled");
var _558=this.getProperty("contextmenu");
var _559=this.getProperty("observes");
var _55a=this.getProperty("onattach");
var _55b=this.getProperty("hidden");
var _55c=this.getProperty("blockactionevents");
if(_55b==true&&this.isVisible==true){
this.hide();
}
if(_557&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_558){
this.setContextMenu(_558);
}
if(_559){
this.observe(this.getBindingForArgument(_559));
}
if(_55c==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_55a!=null){
Binding.evaluate(_55a,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _55e=this.getProperty("draggable");
var _55f=this.getProperty("dragtype");
var _560=this.getProperty("dragaccept");
var _561=this.getProperty("dragreject");
if(_55e!=null){
this.isDraggable=_55e;
}
if(_55f!=null){
this.dragType=_55f;
if(_55e!=false){
this.isDraggable=true;
}
}
if(_560!=null){
this.dragAccept=_560;
}
if(_561!=null){
this.dragReject=_561;
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
Binding.prototype._updateBindingMap=function(_562){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _565=null;
if(_562){
_565=map[id];
if(_565!=null&&_565!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_565=map[id];
if(_565!=null&&_565==this){
delete map[id];
}
}
}else{
var _567=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_562);
if(Application.isDeveloperMode==true){
alert(_567);
}else{
this.logger.error(_567);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_569){
};
Binding.prototype.handleBroadcast=function(_56a,arg){
};
Binding.prototype.handleElement=function(_56c){
return false;
};
Binding.prototype.updateElement=function(_56d){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _56f=null;
switch(typeof arg){
case "object":
_56f=arg;
break;
case "string":
_56f=this.bindingDocument.getElementById(arg);
if(_56f==null){
_56f=Binding.evaluate(arg,this);
}
break;
}
if(_56f!=null&&_56f.nodeType!=null){
_56f=UserInterface.getBinding(_56f);
}
return _56f;
};
Binding.prototype.serialize=function(){
var _570={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_570.id=id;
}
var _572=this.getProperty("binding");
if(_572){
_570.binding=_572;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _573=this.getAncestorBindingByLocalName("*");
if(_573){
if(_573.isShadowBinding){
this.isShadowBinding=true;
_570=false;
}else{
var tree=_573.shadowTree;
for(var key in tree){
var _576=tree[key];
if(_576==this){
this.isShadowBinding=true;
_570=false;
}
}
}
}
}
return _570;
};
Binding.prototype.serializeToString=function(_577){
var _578=null;
if(this.isAttached){
_578=new BindingSerializer().serializeBinding(this,_577);
}else{
throw "cannot serialize unattached binding";
}
return _578;
};
Binding.prototype.subTreeFromString=function(_579){
this.detachRecursive();
this.bindingElement.innerHTML=_579;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_57a){
var _57b=this.bindingElement.getAttribute(_57a);
if(_57b){
_57b=Types.castFromString(_57b);
}
return _57b;
};
Binding.prototype.setProperty=function(prop,_57d){
if(_57d!=null){
_57d=_57d.toString();
if(String(this.bindingElement.getAttribute(prop))!=_57d){
this.bindingElement.setAttribute(prop,_57d);
if(this.isAttached==true){
if(Persistance.isEnabled&&_57d!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_57d;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_57d);
}
}
var _57e=this.propertyMethodMap[prop];
if(_57e){
_57e.call(this,this.getProperty(prop));
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
var _580=null;
if(Binding.exists(this)){
_580=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _580;
};
Binding.prototype.attachClassName=function(_581){
CSSUtil.attachClassName(this.bindingElement,_581);
};
Binding.prototype.detachClassName=function(_582){
CSSUtil.detachClassName(this.bindingElement,_582);
};
Binding.prototype.hasClassName=function(_583){
return CSSUtil.hasClassName(this.bindingElement,_583);
};
Binding.prototype.addActionListener=function(type,_585){
_585=_585!=null?_585:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_585)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_585);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_585+")");
}
};
Binding.prototype.removeActionListener=function(type,_587){
_587=_587?_587:this;
if(Action.isValid(type)){
var _588=this.actionListeners[type];
if(_588){
var i=0,_58a;
while((_58a=_588[i])!=null){
if(_58a==_587){
_588.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_58c){
_58c=_58c?_58c:this;
DOMEvents.addEventListener(this.bindingElement,type,_58c);
};
Binding.prototype.removeEventListener=function(type,_58e){
_58e=_58e?_58e:this;
DOMEvents.removeEventListener(this.bindingElement,type,_58e);
};
Binding.prototype.subscribe=function(_58f){
if(!this.hasSubscription(_58f)){
this._subscriptions.set(_58f,true);
EventBroadcaster.subscribe(_58f,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_58f);
}
};
Binding.prototype.unsubscribe=function(_590){
if(this.hasSubscription(_590)){
this._subscriptions.del(_590);
EventBroadcaster.unsubscribe(_590,this);
}
};
Binding.prototype.hasSubscription=function(_591){
return this._subscriptions.has(_591);
};
Binding.prototype.observe=function(_592,_593){
_592.addObserver(this,_593);
};
Binding.prototype.unObserve=function(_594,_595){
_594.removeObserver(this,_595);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _59a={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_59a);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_59a);
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
var _59c=null;
var _59d=null;
var _59e=false;
if(arg instanceof Action){
_59c=arg;
}else{
if(Action.isValid(arg)){
_59c=new Action(this,arg);
_59e=true;
}
}
if(_59c!=null&&Action.isValid(_59c.type)==true){
if(_59c.isConsumed==true){
_59d=_59c;
}else{
var _59f=this.actionListeners[_59c.type];
if(_59f!=null){
_59c.listener=this;
var i=0,_5a1;
while((_5a1=_59f[i++])!=null){
if(_5a1&&_5a1.handleAction){
_5a1.handleAction(_59c);
}
}
}
var _5a2=true;
if(this.isBlockingActions==true){
switch(_59c.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_59e){
_5a2=false;
}
break;
}
}
if(_5a2){
_59d=this.migrateAction(_59c);
}else{
_59d=_59c;
}
}
}
return _59d;
};
Binding.prototype.migrateAction=function(_5a3){
var _5a4=null;
var _5a5=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5a4&&node.nodeType!=Node.DOCUMENT_NODE){
_5a4=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5a4){
_5a5=_5a4.dispatchAction(_5a3);
}else{
_5a5=_5a3;
}
}
return _5a5;
};
Binding.prototype.reflex=function(_5a7){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5a7);
}
};
Binding.prototype.getMigrationParent=function(){
var _5a8=null;
if(true){
try{
var _5a9=this.bindingElement.parentNode;
if(_5a9!=null){
_5a8=_5a9;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5a8=null;
}
}
return _5a8;
};
Binding.prototype.add=function(_5aa){
if(_5aa.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5aa.bindingElement);
}else{
throw "Could not add "+_5aa.toString()+" of different document origin.";
}
return _5aa;
};
Binding.prototype.addFirst=function(_5ab){
if(_5ab.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5ab.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5ab.toString()+" of different document origin.";
}
return _5ab;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5ac,_5ad){
return BindingFinder.getAncestorBindingByLocalName(this,_5ac,_5ad);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5af){
return BindingFinder.getAncestorBindingByType(this,impl,_5af);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b1){
return BindingFinder.getChildElementsByLocalName(this,_5b1);
};
Binding.prototype.getChildElementByLocalName=function(_5b2){
return this.getChildElementsByLocalName(_5b2).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5b3){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5b3));
};
Binding.prototype.getChildBindingsByLocalName=function(_5b4){
return this.getDescendantBindingsByLocalName(_5b4,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5b5){
return this.getChildBindingsByLocalName(_5b5).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5b6,_5b7){
return BindingFinder.getDescendantBindingsByLocalName(this,_5b6,_5b7);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5b8){
return this.getDescendantBindingsByLocalName(_5b8,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5bb){
return BindingFinder.getNextBindingByLocalName(this,_5bb);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5bc){
return BindingFinder.getPreviousBindingByLocalName(this,_5bc);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5bd){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5bd);
};
Binding.prototype.isFirstBinding=function(_5be){
return (this.getOrdinalPosition(_5be)==0);
};
Binding.prototype.isLastBinding=function(_5bf){
return DOMUtil.isLastElement(this.bindingElement,_5bf);
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
Binding.prototype.setCallBackArg=function(_5c1){
this.setProperty(Binding.CALLBACKARG,_5c1);
};
Binding.prototype.dispose=function(_5c2){
if(!this.isDisposed){
if(!_5c2){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5c3=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5c3){
if(Client.isExplorer){
_5c3.outerHTML="";
}else{
_5c3.parentNode.removeChild(_5c3);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5c6){
list.add(_5c6);
});
list.each(function(_5c7){
self.unsubscribe(_5c7);
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
Binding.prototype.wakeUp=function(_5c9,_5ca){
_5ca=_5ca?_5ca:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5c9!==undefined){
self[_5c9]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5ca);
},0);
}
};
Binding.prototype.handleCrawler=function(_5cc){
if(_5cc.response==null&&this.isLazy==true){
if(_5cc.id==DocumentCrawler.ID&&_5cc.mode==DocumentCrawler.MODE_REGISTER){
_5cc.response=NodeCrawler.NORMAL;
}else{
_5cc.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5cc.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5cc.id)){
_5cc.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5cc.response==null){
switch(_5cc.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5cc.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5cd){
var _5ce=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5cd);
return UserInterface.registerBinding(_5ce,Binding);
};
DataBinding.prototype=new Binding;
DataBinding.prototype.constructor=DataBinding;
DataBinding.superclass=Binding.prototype;
DataBinding.AUTOGENERATED="autogenerateddatabindingname";
DataBinding.TYPE_NUMBER="number";
DataBinding.TYPE_INTEGER="integer";
DataBinding.TYPE_STRING="string";
DataBinding.CLASSNAME_INVALID="invalid";
DataBinding.CLASSNAME_WARNING="warning";
DataBinding.CLASSNAME_FOCUSED="focused";
DataBinding.CLASSNAME_DISABLED="disabled";
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
var _5cf=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5cf.each(function(_5d0){
DataBinding.expressions[_5d0.Key]=new RegExp(_5d0.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d1){
var _5d2=null;
var _5d3=_5d1.getAncestorBindingByLocalName("field");
if(_5d3&&_5d3 instanceof FieldBinding){
var desc=_5d3.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d2=desc.getLabel();
}
}
return _5d2;
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
var _5d6=this.bindingWindow.DataManager;
_5d6.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5d8=this.bindingWindow.DataManager;
if(_5d8.getDataBinding(name)){
_5d8.unRegisterDataBinding(name);
}
_5d8.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5d9,arg){
RootBinding.superclass.handleBroadcast.call(this,_5d9,arg);
var _5db=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5d9){
case _5db:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5db);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5dc){
var _5dd=_5dc?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5dc!=this.isActivated){
this.isActivated=_5dc;
this.dispatchAction(_5dd);
var _5de=new List();
var self=this;
this._activationawares.each(function(_5e0){
if(_5e0.isActivationAware){
try{
if(_5dc){
if(!_5e0.isActivated){
_5e0.onActivate();
}
}else{
if(_5e0.isActivated){
_5e0.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5de.add(_5e0);
}
}
});
_5de.each(function(_5e1){
this._activationawares.del(_5e1);
});
_5de.dispose();
}else{
var _5e2="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e2);
}else{
this.logger.error(_5e2);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5e3,_5e4){
if(Interfaces.isImplemented(IActivationAware,_5e3,true)==true){
if(_5e4==false){
this._activationawares.del(_5e3);
}else{
this._activationawares.add(_5e3);
if(this.isActivated==true){
_5e3.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5e3+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5e5){
var _5e6=this.getMigrationParent();
if(_5e6!=null){
var root=_5e6.ownerDocument.body;
var _5e8=UserInterface.getBinding(root);
if(_5e8!=null){
_5e8.makeActivationAware(this,_5e5);
}
}
};
RootBinding.prototype.handleCrawler=function(_5e9){
RootBinding.superclass.handleCrawler.call(this,_5e9);
if(_5e9.type==NodeCrawler.TYPE_ASCENDING){
_5e9.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5ea=null;
if(this.bindingWindow.parent){
_5ea=this.bindingWindow.frameElement;
}
return _5ea;
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
if(this.bindingElement.hasChildNodes()){
throw new Error("MatrixBinding: No support for childnodes!");
}else{
this.bindingElement.innerHTML=Templates.getTemplateElementText(this.template);
this.shadowTree.table=this.bindingElement.firstChild;
}
}
};
MatrixBinding.prototype._indexTable=function(){
var _5eb=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5eb.hasNext()){
var cell=_5eb.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5ed){
var _5ee=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5ed.bindingElement);
_5ee=_5ed;
}else{
_5ee=MatrixBinding.superclass.add.call(this,_5ed);
}
return _5ee;
};
MatrixBinding.prototype.addFirst=function(_5ef){
var _5f0=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5f1=this.shadowTree[MatrixBinding.CENTER];
_5f1.insertBefore(_5ef.bindingElement,_5f1.firstChild);
_5f0=_5ef;
}else{
_5f0=MatrixBinding.superclass.addFirst.call(this,_5ef);
}
return _5ef;
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
MatrixBinding.newInstance=function(_5f3){
var _5f4=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5f3);
return UserInterface.registerBinding(_5f4,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5f5,_5f6){
var list=new List();
var _5f8=new FlexBoxCrawler();
_5f8.mode=_5f6?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5f8.startBinding=_5f5;
_5f8.crawl(_5f5.bindingElement,list);
list.each(function(_5f9){
_5f9.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5fa){
if(Binding.exists(_5fa)){
_5fa.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5fb){
if(Binding.exists(_5fb)){
_5fb.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5f8.dispose();
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
if(Client.isMozilla){
if(this.isFlexible){
this.attachClassName(FlexBoxBinding.CLASSNAME);
}
}
};
FlexBoxBinding.prototype.onBindingAttach=function(){
FlexBoxBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_UPDATED);
if(Client.isExplorer){
if(this.isFlexible){
this.attachClassName(FlexBoxBinding.CLASSNAME);
}
}
};
FlexBoxBinding.prototype.handleAction=function(_5fc){
FlexBoxBinding.superclass.handleAction.call(this,_5fc);
switch(_5fc.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5fd){
var _5fe=0;
var _5ff=new List(this.bindingElement.parentNode.childNodes);
while(_5ff.hasNext()){
var _600=_5ff.getNext();
if(_600.nodeType==Node.ELEMENT_NODE&&_600!=this.bindingElement){
if(!this._isOutOfFlow(_600)){
var rect=_600.getBoundingClientRect();
if(_5fd){
height+=(rect.right-rect.left);
}else{
_5fe+=(rect.bottom-rect.top);
}
}
}
}
return _5fe;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_602){
var _603=CSSComputer.getPosition(_602);
var _604=CSSComputer.getFloat(_602);
return (_603=="absolute"||_604!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _605=this.bindingElement.parentNode;
var rect=_605.getBoundingClientRect();
var _607=rect.bottom-rect.top;
var _608=CSSComputer.getPadding(_605);
var _609=CSSComputer.getBorder(_605);
_607-=(_608.top+_608.bottom);
_607-=(_609.top+_609.bottom);
return _607;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _60a=this.bindingElement.parentNode;
var rect=_60a.getBoundingClientRect();
var _60c=rect.right-rect.left;
var _60d=CSSComputer.getPadding(_60a);
var _60e=CSSComputer.getBorder(_60a);
_60c-=(_60d.left+_60d.right);
_60c-=(_60e.left+_60e.right);
return _60c;
};
FlexBoxBinding.prototype.setFlexibility=function(_60f){
if(_60f!=this.isFlexible){
if(_60f){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_60f;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _610=this._getSiblingsSpan();
_610=this._getCalculatedHeight()-_610;
if(!isNaN(_610)&&_610>=0){
if(_610!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_610)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_611){
if(!this.isFit||_611){
var _612=0;
new List(this.bindingElement.childNodes).each(function(_613){
if(_613.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_613)){
var rect=_613.getBoundingClientRect();
_612+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_612);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_615){
var _616=CSSComputer.getPadding(this.bindingElement);
var _617=CSSComputer.getBorder(this.bindingElement);
_615+=_616.top+_616.bottom;
_615+=_617.top+_617.bottom;
this.bindingElement.style.height=_615+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_618){
ScrollBoxBinding.superclass.handleAction.call(this,_618);
switch(_618.type){
case BalloonBinding.ACTION_INITIALIZE:
_618.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_619){
this.bindingElement.scrollLeft=_619.x;
this.bindingElement.scrollTop=_619.y;
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
var _61a=this._getBuildElement("labeltext");
if(_61a){
this.shadowTree.labelText=_61a;
this.shadowTree.text=_61a.firstChild;
this.hasLabel=true;
}
}else{
var _61b=this.getProperty("label");
var _61c=this.getProperty("image");
var _61d=this.getProperty("tooltip");
if(_61b){
this.setLabel(_61b,false);
}
if(_61c){
this.setImage(_61c,false);
}
if(_61d){
this.setToolTip(_61d);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_61e,_61f){
_61e=_61e!=null?_61e:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_61e);
this.setProperty("label",_61e);
if(!_61f){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_621){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_621){
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
LabelBinding.prototype.setToolTip=function(_624){
this.setProperty("tooltip",_624);
if(_624!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_624));
}
};
LabelBinding.prototype.getToolTip=function(_625){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_626){
_626=_626==null?true:_626;
var _627=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_626;
if(_626){
this.attachClassName(_627);
}else{
this.detachClassName(_627);
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
var _628="textonly";
var _629="imageonly";
var _62a="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_628);
this.detachClassName(_629);
this.attachClassName(_62a);
}else{
if(this.hasLabel){
this.detachClassName(_62a);
this.detachClassName(_629);
this.attachClassName(_628);
}else{
if(this.hasImage){
this.detachClassName(_62a);
this.detachClassName(_628);
this.attachClassName(_629);
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
LabelBinding.newInstance=function(_62b){
var _62c=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_62b);
return UserInterface.registerBinding(_62c,LabelBinding);
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
var _62d=this.getProperty("label");
if(!_62d){
_62d=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_62d));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_62f){
this.setProperty("label",_62f);
};
TextBinding.newInstance=function(_630){
var _631=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_630);
return UserInterface.registerBinding(_631,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_632,_633){
BroadcasterBinding.superclass.setProperty.call(this,_632,_633);
function update(list){
if(list){
list.each(function(_635){
_635.setProperty(_632,_633);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _636=this._observers[_632];
if(_636){
update(_636);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_637){
BroadcasterBinding.superclass.deleteProperty.call(this,_637);
function update(list){
if(list){
list.each(function(_639){
_639.deleteProperty(_637);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _63a=this._observers[_637];
if(_63a){
update(_63a);
}
};
BroadcasterBinding.prototype.addObserver=function(_63b,_63c){
_63c=_63c?_63c:"*";
_63c=new List(_63c.split(" "));
while(_63c.hasNext()){
var _63d=_63c.getNext();
switch(_63d){
case "*":
this._setAllProperties(_63b);
break;
default:
var _63e=this.getProperty(_63d);
_63b.setProperty(_63d,_63e);
break;
}
if(!this._observers[_63d]){
this._observers[_63d]=new List();
}
this._observers[_63d].add(_63b);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_63f){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _642=att.nodeName;
switch(_642){
case "id":
case "key":
break;
default:
var _643=this.getProperty(_642);
_63f.setProperty(_642,_643);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_644,_645){
_645=_645?_645:"*";
_645=new List(_645.split(" "));
while(_645.hasNext()){
var list=this._observers[_645.getNext()];
if(list){
while(list.hasNext()){
var _647=list.getNext();
if(_647==_644){
list.del(_647);
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
BroadcasterBinding.prototype.setDisabled=function(_648){
this.setProperty("isdisabled",_648);
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
var _64a=this.getProperty("width");
var _64b=this.getProperty("label");
var type=this.getProperty("type");
var _64d=this.getProperty("popup");
var _64e=this.getProperty("tooltip");
var _64f=this.getProperty("isdisabled");
var _650=this.getProperty("response");
var _651=this.getProperty("oncommand");
var _652=this.getProperty("value");
var _653=this.getProperty("ischecked");
var _654=this.getProperty("callbackid");
var _655=this.getProperty("focusable");
var _656=this.getProperty("focused");
var _657=this.getProperty("default");
var url=this.getProperty("url");
var _659=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_659){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_64b!=null){
this.setLabel(_64b);
}
if(type!=null){
this.setType(type);
}
if(_64e!=null){
this.setToolTip(_64e);
}
if(_64a!=null){
this.setWidth(_64a);
}
if(_64d!=null){
this.setPopup(_64d);
}
if(_650!=null){
this.response=_650;
}
if(_653==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_651!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_651,this);
};
}
if(_655||this.isFocusable){
this._makeFocusable();
if(_657||this.isDefault){
this.isDefault=true;
}
if(_656){
this.focus();
}
}
if(_64f==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_654!=null){
this.bindingWindow.DataManager.registerDataBinding(_654,this);
if(_652!=null){
Binding.dotnetify(this,_652);
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
ButtonBinding.prototype.setImage=function(_65a){
if(this.isAttached){
this.labelBinding.setImage(_65a);
}
this.setProperty("image",_65a);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_65b){
if(this.isAttached){
this.labelBinding.setLabel(_65b);
}
this.setProperty("label",_65b);
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
ButtonBinding.prototype.setToolTip=function(_65d){
this.setProperty("tooltip",_65d);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_65d));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_65e){
this.imageProfile=new _65e(this);
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
ButtonBinding.prototype.flip=function(_663){
_663=_663==null?true:_663;
this.isFlipped=_663;
this.setProperty("flip",_663);
if(this.isAttached){
this.labelBinding.flip(_663);
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
ButtonBinding.prototype.check=function(_664){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_664==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_665){
this.isActive=true;
this.isChecked=true;
if(!_665){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_666){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_666==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_667){
this.isActive=false;
this.isChecked=false;
if(!_667){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_668,_669){
if(_668==null){
_668==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_668){
case true:
this.check(_669);
break;
case false:
this.uncheck(_669);
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
var _66b=this.getProperty("tooltip");
if(_66b){
this.setToolTip(_66b);
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
var _66c=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_66c=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _66c;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _66e=this.getEqualSizeWidth();
if(goal>_66e){
var diff=goal-_66e;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _671=null;
if(this.isAttached==true){
var _672=CSSComputer.getPadding(this.bindingElement);
var _673=CSSComputer.getPadding(this.bindingElement);
_671=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_671=_671+_672.left+_672.right;
_671=_671+_673.left+_673.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _671;
};
ButtonBinding.prototype.setWidth=function(_674){
if(this.isAttached==true){
var _675=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _676=CSSComputer.getPadding(this.shadowTree.c);
var _677=_674-_675;
_677=_677-_676.left-_676.right;
this.shadowTree.c.style.width=String(_677)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_677-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_674);
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
ButtonBinding.prototype.setValue=function(_678){
this.shadowTree.dotnetinput.value=_678;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_679){
this.setValue(_679);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_67a){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_67a;
this.imageProfile=_67a.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_67b){
var _67c=_67b?"addEventListener":"removeEventListener";
this.binding[_67c](DOMEvents.MOUSEENTER,this);
this.binding[_67c](DOMEvents.MOUSELEAVE,this);
this.binding[_67c](DOMEvents.MOUSEDOWN,this);
this.binding[_67c](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _67e=false,_67f=false,_680=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_680=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_680=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_680=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_680=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_680==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67e=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_680=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_680=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_680=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_680=ButtonStateManager.STATE_NORMAL;
var _681=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_681 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_680=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_680==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67f=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_680=ButtonStateManager.STATE_NORMAL;
_67e=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_680=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_680=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_680=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_680=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_680==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67e=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_680=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_680=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_680=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_680=ButtonStateManager.STATE_NORMAL;
_67e=true;
break;
}
}
}
}
}
switch(_680){
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
if(_67e){
this.binding.fireCommand();
}
if(_67f){
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
var _685=this.imageProfile.getDisabledImage();
if(_685){
this.binding.setImage(_685);
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
ClickButtonBinding.newInstance=function(_686){
var _687=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_686);
return UserInterface.registerBinding(_687,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_688){
var _689=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_688);
return UserInterface.registerBinding(_689,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_68a){
var _68b=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_68a);
return UserInterface.registerBinding(_68b,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_68c){
this._binding=_68c;
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
var _68d=this.getDescendantBindingsByLocalName("control");
_68d.each(function(_68e){
_68e.setControlType(_68e.controlType);
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
ControlGroupBinding.newInstance=function(_690){
var _691=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_690);
return UserInterface.registerBinding(_691,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_694){
ControlBinding.superclass.handleAction.call(this,_694);
switch(_694.type){
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
function ControlImageProfile(_695){
this.binding=_695;
}
ControlImageProfile.prototype._getImage=function(_696){
var _697=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_697=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_697=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_697=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_697=this.constructor.IMAGE_CLOSE;
break;
}
return _697.replace("${string}",_696);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _698=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_698=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _698?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_699){
ControlBoxBinding.superclass.handleAction.call(this,_699);
switch(_699.type){
case ControlBinding.ACTION_COMMAND:
var _69a=_699.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_69a);
Application.unlock(self);
},0);
_699.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_69c){
switch(_69c.controlType){
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
ControlBoxBinding.prototype.setState=function(_69d){
var _69e=this.getState();
this.setProperty("state",_69d);
this.detachClassName(_69e);
this.attachClassName(_69d);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _69f=this.getProperty("state");
if(!_69f){
_69f=ControlBoxBinding.STATE_NORMAL;
}
return _69f;
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
MenuContainerBinding.prototype.isOpen=function(_6a0){
var _6a1=null;
if(!_6a0){
_6a1=this._isOpen;
}else{
_6a1=(_6a0==this._openElement);
}
return _6a1;
};
MenuContainerBinding.prototype.setOpenElement=function(_6a2){
if(_6a2){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6a2;
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
var _6a3=this.getChildBindingByLocalName("menupopup");
if(_6a3&&_6a3!=this.menuPopupBinding){
this.menuPopupBinding=_6a3;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6a4=this.getMenuContainerBinding();
_6a4.setOpenElement(this);
var _6a5=this.getMenuPopupBinding();
_6a5.snapTo(this.bindingElement);
_6a5.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6a6){
MenuContainerBinding.superclass.handleAction.call(this,_6a6);
if(_6a6.type==PopupBinding.ACTION_HIDE){
var _6a7=this.getMenuContainerBinding();
_6a7.setOpenElement(false);
this.reset();
_6a6.consume();
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
MenuBarBinding.prototype.handleAction=function(_6a8){
MenuBarBinding.superclass.handleAction.call(this,_6a8);
switch(_6a8.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6a9=_6a8.target;
var _6aa=this.getChildBindingsByLocalName("menu");
while(_6aa.hasNext()){
var menu=_6aa.getNext();
}
switch(_6a9.arrowKey){
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
var _6ac=this.getProperty("image");
var _6ad=this.getProperty("label");
var _6ae=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6ad){
this.setLabel(_6ad);
}
if(_6ac){
this.setImage(_6ac);
}
if(_6ae){
this.setToolTip(_6ae);
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
MenuBinding.prototype.setLabel=function(_6b0){
this.setProperty("label",_6b0);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6b0));
}
};
MenuBinding.prototype.setToolTip=function(_6b1){
this.setProperty("tooltip",_6b1);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6b1));
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
var _6b3=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6b3.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6b3.isOpen()&&!_6b3.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6b3.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6b3.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6b4,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6b4){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6b9){
switch(_6b9.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6ba=null;
var _6bb=true;
self._lastFocused.focus();
self.grabKeyboard();
_6b9.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6bd){
for(var key in this._focused){
if(key!=_6bd.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6bd.key]=_6bd;
this._lastFocused=_6bd;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6c0){
delete this._focused[_6c0.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6c1){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6c1);
}
if(_6c1){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6c4=this.getChildBindingsByLocalName("menugroup");
var _6c5=null;
var _6c6=null;
while(_6c4.hasNext()){
var _6c7=_6c4.getNext();
if(!_6c7.isDefaultContent){
_6c7.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6c5&&_6c7.isVisible){
_6c5=_6c7;
}
if(_6c7.isVisible){
_6c6=_6c7;
}
}
}
if(_6c5&&_6c6){
_6c5.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6c6.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6c8){
MenuBodyBinding.activeInstance=this;
if(_6c8){
var _6c9=this._getMenuItems().getFirst();
if(_6c9){
_6c9.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6ca=this._lastFocused;
if((_6ca!=null)&&(!_6ca.isMenuContainer)){
_6ca.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6cc=this._getMenuItems();
var _6cd=null;
var next=null;
if(this._lastFocused){
_6cd=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6cc.getPreceding(_6cd);
break;
case KeyEventCodes.VK_DOWN:
next=_6cc.getFollowing(_6cd);
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
next=_6cc.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6d0=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6d1){
_6d0=_6d1.getChildBindingsByLocalName("menuitem");
_6d0.each(function(item){
list.add(item);
});
});
_6d0=this.getChildBindingsByLocalName("menuitem");
_6d0.each(function(item){
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
MenuBodyBinding.prototype.setDimension=function(dim){
this.getBindingElement().style.width=new String(dim.w)+"px";
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
this._shadowBinding=null;
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
if(Client.isExplorer){
this.buildShadowBinding();
}
};
PopupBinding.prototype.onBindingDispose=function(){
PopupBinding.superclass.onBindingDispose.call(this);
if(PopupBinding.activeInstances.has(this.key)){
PopupBinding.activeInstances.del(this.key);
}
if(this._shadowBinding!=null){
this._shadowBinding.dispose();
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
if(this.bindingElement.hasChildNodes()){
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
PopupBinding.prototype.buildShadowBinding=function(){
this._shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this._shadowBinding.attachClassName("popupshadow");
this._shadowBinding.offset=3;
this._shadowBinding.expand=6;
this._shadowBinding.shadow(this);
this._shadowBinding.attach();
this.shadowTree.shadow=this._shadowBinding;
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
if(Client.isExplorer){
this._bodyBinding.setDimension(this.getDimension());
}
this._enableTab(true);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
this.dispatchAction(Binding.ACTION_POSITIONCHANGED);
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
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
this.shadowBinding=null;
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
if(Client.isExplorer){
this.buildShadowBinding();
}
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
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
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
if(self.shadowBinding!=null){
self.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
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
if(this.shadowBinding!=null){
this.dispatchAction(Binding.ACTION_POSITIONCHANGED);
}
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
if(this.shadowBinding!=null){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
}
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
if(this.spellcheck&&Client.isFirefox){
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
if(_887.isSelected){
this.select(_88c,true);
}
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
if(Client.isMozilla==true){
_897.style.minWidth=_896;
}else{
_897.style.width=_896;
}
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
}
};
SelectorBinding.prototype.handleBroadcast=function(_899,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_899,arg);
switch(_899){
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
SelectorBinding.prototype.select=function(_89c,_89d){
var _89e=false;
if(_89c!=this._selectedItemBinding){
this._selectedItemBinding=_89c;
_89e=true;
var _89f=this._buttonBinding;
this._selectionValue=_89c.selectionValue;
_89f.setLabel(_89c.getLabel());
if(_89c.imageProfile!=null){
_89f.imageProfile=_89c.imageProfile;
}
if(_89f.imageProfile!=null){
_89f.setImage(this.isDisabled==true?_89f.imageProfile.getDisabledImage():_89f.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_89d){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_89d)){
this.validate();
}
}
return _89e;
};
SelectorBinding.prototype._relate=function(){
var _8a0=this.getProperty("relate");
if(_8a0){
var _8a1=this.bindingDocument.getElementById(_8a0);
if(_8a1){
var _8a2=UserInterface.getBinding(_8a1);
if(_8a2){
if(this.isChecked){
_8a2.show();
}else{
_8a2.hide();
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
SelectorBinding.prototype.selectByValue=function(_8a3,_8a4){
var _8a5=false;
var _8a6=this._menuBodyBinding;
var _8a7=_8a6.getDescendantElementsByLocalName("menuitem");
while(_8a7.hasNext()){
var _8a8=UserInterface.getBinding(_8a7.getNext());
if(_8a8.selectionValue==_8a3){
_8a5=this.select(_8a8,_8a4);
break;
}
}
return _8a5;
};
SelectorBinding.prototype.getValue=function(){
var _8a9=this._selectionValue;
if(_8a9!=null){
_8a9=String(_8a9);
}
return _8a9;
};
SelectorBinding.prototype.setValue=function(_8aa){
this.selectByValue(String(_8aa),true);
};
SelectorBinding.prototype.getResult=function(){
var _8ab=this._selectionValue;
if(_8ab=="null"){
_8ab=null;
}
if(_8ab){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8ab=Number(_8ab);
break;
}
}
return _8ab;
};
SelectorBinding.prototype.setResult=function(_8ac){
this.selectByValue(_8ac,true);
};
SelectorBinding.prototype.validate=function(){
var _8ad=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8ae=this.getValue();
if(_8ae==this.defaultSelection.value){
_8ad=false;
}
if(_8ad!=this._isValid){
if(_8ad){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8ad;
}
return _8ad;
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
var _8af=this._popupBinding;
if(!this._isUpToDate){
_8af.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8b0,_8b1){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8b0));
return true;
};
SelectorBinding.newInstance=function(_8b2){
var _8b3=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8b2);
return UserInterface.registerBinding(_8b3,SelectorBinding);
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
var _8b6=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8b6){
this.onValueChange=function(){
Binding.evaluate(_8b6,this);
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
SimpleSelectorBinding.prototype.focus=function(_8b9){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8b9){
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
SimpleSelectorBinding.prototype._hack=function(_8ba){
if(Client.isExplorer){
this._select.style.width=_8ba?"auto":this._cachewidth+"px";
if(_8ba){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8bb=true;
if(this.isRequired){
if(this.getValue()==null){
_8bb=false;
}
}
if(_8bb!=this._isValid){
if(_8bb){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8bc=this._select;
var _8bd=_8bc.options[_8bc.selectedIndex];
var text=DOMUtil.getTextContent(_8bd);
_8bc.blur();
_8bc.style.color="#A40000";
_8bc.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8bd,DataBinding.warnings["required"]);
}
_8bc.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8bd,text);
}
};
}
this._isValid=_8bb;
}
return _8bb;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8bf=null;
var _8c0=this._select;
var _8c1=_8c0.options[_8c0.selectedIndex];
var _8c2=true;
if(Client.isExplorer){
var html=_8c1.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8c2=false;
}
}
if(_8c2){
_8bf=_8c1.getAttribute("value");
}
return _8bf;
};
SimpleSelectorBinding.prototype.setValue=function(_8c4){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8c5){
this.setValue(_8c5);
};
SimpleSelectorBinding.newInstance=function(_8c6){
var _8c7=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8c6);
return UserInterface.registerBinding(_8c7,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8c8,_8c9,_8ca,_8cb,_8cc){
this._init(_8c8,_8c9,_8ca,_8cb,_8cc);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8cd,_8ce,_8cf,_8d0,_8d1){
if(_8cd!=null){
this.label=String(_8cd);
}
if(_8ce!=null){
this.value=String(_8ce);
}
if(_8d0!=null){
this.imageProfile=_8d0;
}
if(_8d1!=null){
this.tooltip=_8d1;
}
this.isSelected=_8cf?true:false;
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
var _8d2=this.getProperty("image");
if(_8d2){
this.setImage(_8d2);
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
var _8d5=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8d5.popupBindingTargetElement=this.shadowTree.input;
_8d5.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8d5.attach();
var self=this;
_8d5.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8d5;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8d8=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8d8).each(function(_8d9){
if(_8d9.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8da=_8d9.getAttribute("value");
var _8db=_8d9.getAttribute("selected");
var _8dc=_8d9.getAttribute("tooltip");
list.add({value:_8da?_8da:null,toolTip:_8dc?_8dc:null,isSelected:(_8db&&_8db=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8de=this._menuBodyBinding;
var _8df=_8de.bindingDocument;
while(_8de.bindingElement.hasChildNodes()){
var node=_8de.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8de.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8e1=this.getProperty("emptyentrylabel");
if(_8e1){
var _8e2=MenuItemBinding.newInstance(_8df);
_8e2.setLabel(_8e1);
_8e2.selectionValue="";
_8de.add(_8e2);
}
while(list.hasNext()){
var _8e3=list.getNext();
var _8e2=MenuItemBinding.newInstance(_8df);
_8e2.setLabel(_8e3.label?_8e3.label:_8e3.value);
_8e2.selectionValue=_8e3.value;
if(_8e3.image){
_8e2.setImage(_8e3.image);
}
if(_8e3.toolTip){
_8e2.setToolTip(_8e3.toolTip);
}
if(_8e3.isSelected){
this.select(_8e2,true);
}
_8de.add(_8e2);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8e4){
this.select(_8e4);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8e5,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8e5,arg);
switch(_8e5){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8e5,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8e7){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8e7);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8e8){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8e8);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8e9=this.bindingElement.offsetWidth+"px";
var _8ea=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8ea.style.minWidth=_8e9;
}else{
_8ea.style.width=_8e9;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8eb=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8ec=this.getValue();
var _8ed=null;
_8eb.each(function(item){
if(item.getLabel()==_8ec){
_8ed=item;
}
});
if(_8ed){
_8ed.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8f0){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8f0){
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
DataInputSelectorBinding.prototype.setValue=function(_8f1){
var _8f2=this.isReadOnly;
var _8f3=null;
if(_8f1!=null&&_8f1!=""){
var _8f4=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_8f4.hasNext()){
var item=_8f4.getNext();
if(item.selectionValue==_8f1){
_8f3=item.getLabel();
break;
}
}
}
if(_8f3!=null){
this.value=_8f1;
this.shadowTree.input.value=_8f3;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_8f1);
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
var _8f7="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_8f7);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_8f7);
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
var _8f9=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8f9.setImage("${icon:popup}");
this.addFirst(_8f9);
_8f9.attach();
var self=this;
_8f9.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8fb=self.getProperty("handle");
var _8fc=ViewDefinitions[_8fb];
if(_8fc instanceof DialogViewDefinition){
_8fc.handler={handleDialogResponse:function(_8fd,_8fe){
self._isButtonClicked=false;
if(_8fd==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8ff=_8fe.getFirst();
self.setValue(_8ff);
self.validate(true);
}
self.focus();
}};
_8fc.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8fc);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8f9.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8f9;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _901=this._dialogButtonBinding;
if(_901!=null){
_901.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _903=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_903=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _903;
};
ImageInputDialogBinding.prototype=new DataInputBinding;
ImageInputDialogBinding.prototype.constructor=ImageInputDialogBinding;
ImageInputDialogBinding.superclass=DataInputBinding.prototype;
ImageInputDialogBinding.IMAGE_SELECTED="image input image selected";
function ImageInputDialogBinding(){
this.logger=SystemLogger.getLogger("ImageInputDialogBinding");
this.handle="Composite.Management.ImageSelectorDialog";
this._dialogButtonBinding=null;
this._isButtonClicked=false;
this.value=null;
}
ImageInputDialogBinding.prototype.toString=function(){
return "[ImageInputDialogBinding]";
};
ImageInputDialogBinding.prototype._buildDOMContent=function(){
DataInputSelectorBinding.superclass._buildDOMContent.call(this);
this.buildButton();
var self=this;
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.DOUBLECLICK,{handleEvent:function(e){
self.setReadOnly(false);
self.focus();
}});
};
ImageInputDialogBinding.prototype.buildButton=function(){
var _906=ToolBarButtonBinding.newInstance(this.bindingDocument);
_906.setImage("${icon:popup}");
this.addFirst(_906);
_906.attach();
var self=this;
_906.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _908=ViewDefinitions[self.handle];
if(_908 instanceof DialogViewDefinition){
_908.handler={handleDialogResponse:function(_909,_90a){
self._isButtonClicked=false;
if(_909==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into ImageInputDialogBinding#buildButton");
var _90b=_90a.getFirst();
self.setValue(_90b);
self.validate(true);
self.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
}
self.focus();
}};
_908.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_908);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_906.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_906;
};
ImageInputDialogBinding.prototype.oncommand=function(){
var _90d=this._dialogButtonBinding;
if(_90d!=null){
_90d.oncommand();
}
};
ImageInputDialogBinding.prototype.onblur=function(){
ImageInputDialogBinding.superclass.onblur.call(this);
this.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
};
ImageInputDialogBinding.prototype.validate=function(arg){
var _90f=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_90f=ImageInputDialogBinding.superclass.validate.call(this,arg);
}
return _90f;
};
ImageInputDialogBinding.prototype.setValue=function(_910){
if(this.isReadOnly){
this.value=_910;
this.shadowTree.input.value=TreeService.GetMediaLabel(_910);
}else{
ImageInputDialogBinding.superclass.setValue.call(this,_910);
}
};
ImageInputDialogBinding.prototype.getValue=function(){
if(this.isReadOnly){
result=this.value;
}else{
result=ImageInputDialogBinding.superclass.getValue.call(this);
}
return result;
};
ImageInputDialogBinding.prototype.setReadOnly=function(_911){
var _912=this.isReadOnly;
ImageInputDialogBinding.superclass.setReadOnly.call(this,_911);
if(_912==true&&_911==false){
ImageInputDialogBinding.superclass.setValue.call(this,this.value);
}
if(_912==false&&_911==true){
this.value=ImageInputDialogBinding.superclass.getValue.call(this);
var _913=TreeService.GetMediaLabel(this.value);
this.shadowTree.input.value=_913;
this.shadowTree.input.title=_913;
}
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
var _914=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _915=this.getProperty("image");
if(_915!=null){
_914.setImage(_915);
}else{
_914.setImage("${icon:popup}");
}
this.addFirst(_914);
_914.attach();
var self=this;
_914.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_914;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _917=this._dialogButtonBinding;
if(_917!=null){
_917.oncommand();
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
var _918=this.getProperty("label");
var _919=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_918!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_918+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_918);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_919!=null){
this._buttonBinding.setToolTip(_919);
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
DataDialogBinding.prototype.handleAction=function(_91b){
DataDialogBinding.superclass.handleAction.call(this,_91b);
var _91c=_91b.target;
var self=this;
switch(_91b.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_91e,_91f){
if(_91e==Dialog.RESPONSE_ACCEPT){
if(_91f instanceof DataBindingMap){
self._map=_91f;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_91c==this._buttonBinding){
_91b.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_920,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_920,arg);
switch(_920){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _923=this.getProperty("handle");
var url=this.getURL();
var _925=null;
if(_923!=null||def!=null){
if(def!=null){
_925=def;
}else{
_925=ViewDefinitions[_923];
}
if(_925 instanceof DialogViewDefinition){
_925.handler=this._handler;
if(this._map!=null){
_925.argument=this._map;
}
StageBinding.presentViewDefinition(_925);
}
}else{
if(url!=null){
_925=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_925!=null){
this._dialogViewHandle=_925.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_926){
this.setProperty("label",_926);
if(this.isAttached){
this._buttonBinding.setLabel(_926+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_927){
this.setProperty("image",_927);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_927);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_928){
this.setProperty("tooltip",_928);
if(this.isAttached){
this._buttonBinding.setToolTip(_928);
}
};
DataDialogBinding.prototype.setHandle=function(_929){
this.setProperty("handle",_929);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_92b){
this._handler=_92b;
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
DataDialogBinding.newInstance=function(_92d){
var _92e=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_92d);
return UserInterface.registerBinding(_92e,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_930,_931){
if(_930==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_931);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_932){
_932=new String(_932);
this.dirty();
this.setValue(encodeURIComponent(_932));
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
var _936=this.getValue();
if(_936==null){
_936="";
}
this.shadowTree.dotnetinput.value=_936;
};
PostBackDataDialogBinding.prototype.setValue=function(_937){
this.setProperty("value",_937);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_938){
};
PostBackDataDialogBinding.newInstance=function(_939){
var _93a=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_939);
return UserInterface.registerBinding(_93a,PostBackDataDialogBinding);
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
var _93b=this.getProperty("dialoglabel");
var _93c=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _93e=this.getProperty("handle");
if(_93e!=null){
var def=ViewDefinition.clone(_93e,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_93b!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_93b;
}
if(_93c!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_93c;
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
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_940){
var _941=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_940);
return UserInterface.registerBinding(_941,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_943){
self._datathing.setValue(_943);
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
var _946=self.getValue();
if(_946==""||_946==null){
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
var _947=this.getProperty("value");
var _948=this.getProperty("selectorlabel");
if(_948==null){
_948=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_947==null));
list.add(new SelectorBindingSelection(_948+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_947!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _947=this.getValue();
if(_947==""||_947==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_94a){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_94a);
switch(_94a.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_94a.target==this._datathing){
var _94b=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_94b){
self._selector.setLabel(_94b);
}
},500);
_94a.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_94d){
this.setProperty("label",_94d);
if(this._selector!=null){
this._selector.setLabel(_94d);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_94e){
this._datathing.setValue(_94e);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_94f,_950){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_94f,_950)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_951){
this._buttonBinding.setLabel(_951);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_952){
this._buttonBinding.setToolTip(_952);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_953){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_953);
switch(_953.type){
case MenuItemBinding.ACTION_COMMAND:
var _954=_953.target;
var _955=this.master;
if(_954.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_954.getLabel());
setTimeout(function(){
_955.action();
},0);
}else{
this.master.setValue("");
}
_955.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_956){
var _957=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_956);
return UserInterface.registerBinding(_957,NullPostBackDataDialogSelectorBinding);
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
var _958=this._dataDialogBinding;
if(_958!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_958.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _959=this.getProperty("editable");
var _95a=this.getProperty("selectable");
var _95b=this.getProperty("display");
if(_959!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_95a){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_95b){
this._display=_95b;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _95c=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_95c.selections=this.selections;
this.add(_95c);
_95c.attach();
this._dataDialogBinding=_95c;
this.shadowTree.datadialog=_95c;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _95e=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _95f=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_95e=_95f.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_95e=_95f.isSelected!=true;
break;
}
if(_95e){
this.shadowTree.box.appendChild(this._getElementForSelection(_95f));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_961){
var box=this.shadowTree.box;
var _963=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _964=list.getNext();
if(_961){
_964.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_963=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_963=_964.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_963=_964.isSelected!=true;
break;
}
}
if(_963){
var _965=this._getElementForSelection(_964);
box.insertBefore(_965,box.firstChild);
CSSUtil.attachClassName(_965,"selected");
this._selectionMap.set(_964.value,_965);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_966){
var _967=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_967.appendChild(this.bindingDocument.createTextNode(_966.label));
_967.setAttribute("label",_966.label);
_967.setAttribute("value",_966.value);
return _967;
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
var _969=DOMEvents.getTarget(e);
var _96a=DOMUtil.getLocalName(_969);
if(_96a=="div"){
this._handleMouseDown(_969);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_96b){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _96c=this._getElements();
var _96d=_96b.getAttribute("value");
var _96e=this._lastSelectedElement.getAttribute("value");
var _96f=false;
while(_96c.hasNext()){
var el=_96c.getNext();
switch(el.getAttribute("value")){
case _96d:
case _96e:
_96f=!_96f;
break;
}
if(_96f){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_96b);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_96b)){
this._unhilite(_96b);
}else{
this._hilite(_96b);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_96b){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_96b;
};
MultiSelectorBinding.prototype._hilite=function(_973){
var _974=_973.getAttribute("value");
if(!this._selectionMap.has(_974)){
CSSUtil.attachClassName(_973,"selected");
this._selectionMap.set(_974,_973);
}
};
MultiSelectorBinding.prototype._unhilite=function(_975){
var _976=_975.getAttribute("value");
if(this._selectionMap.has(_976)){
CSSUtil.detachClassName(_975,"selected");
this._selectionMap.del(_976);
}
};
MultiSelectorBinding.prototype._isHilited=function(_977){
return CSSUtil.hasClassName(_977,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_978){
MultiSelectorBinding.superclass.handleAction.call(this,_978);
var _979=_978.target;
switch(_978.type){
case DataDialogBinding.ACTION_COMMAND:
if(_979==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_978.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_979.result);
this.dirty();
_979.result=null;
_978.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _97a=null;
if(this.isSelectable){
_97a=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_97c){
if(self._isHilited(_97c)){
_97c.parentNode.removeChild(_97c);
_97a.add(new SelectorBindingSelection(_97c.getAttribute("label"),_97c.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _97a;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _97e=this._getElements();
if(!isUp){
_97e.reverse();
}
var _97f=true;
while(_97f&&_97e.hasNext()){
var _980=_97e.getNext();
if(this._isHilited(_980)){
switch(isUp){
case true:
if(_980.previousSibling){
_980.parentNode.insertBefore(_980,_980.previousSibling);
}else{
_97f=false;
}
break;
case false:
if(_980.nextSibling){
_980.parentNode.insertBefore(_980,_980.nextSibling.nextSibling);
}else{
_97f=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _981=new List();
var _982=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_984){
var _985=new SelectorBindingSelection(_984.getAttribute("label"),_984.getAttribute("value"),_982);
_985.isHighlighted=self._isHilited(_984);
_981.add(_985);
});
return _981;
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
var _986=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_986.hasEntries()){
_986.each(function(_987){
_987.parentNode.removeChild(_987);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _988=this.selections.getNext();
if(_988.isSelected){
var _989=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_989.name=this._name;
_989.value=_988.value;
this.bindingElement.appendChild(_989);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_98a){
alert(_98a);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_98b){
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
var _98c={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _98d=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_98d.handler=this._handler;
_98d.argument=_98c;
StageBinding.presentViewDefinition(_98d);
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
var _98e={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _990={handleDialogResponse:function(_991,_992){
if(_991==Dialog.RESPONSE_ACCEPT){
self.result=_992;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _993=ViewDefinitions[this._dialogViewHandle];
_993.handler=_990;
_993.argument=_98e;
StageBinding.presentViewDefinition(_993);
};
MultiSelectorDataDialogBinding.newInstance=function(_994){
var _995=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_994);
return UserInterface.registerBinding(_995,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_996){
var id=_996.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _998=_996.bindingDocument.getElementById(id);
if(_998!=null){
var _999=UserInterface.getBinding(_998);
_999.setResult(true);
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
var _99b=this.bindingDocument.getElementById(id);
if(_99b!=null){
var _99c=UserInterface.getBinding(_99b);
if(_99c&&!_99c.isAttached){
_99c.isLazy=true;
}else{
_99b.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_99d){
this._isLazy=_99d;
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
var _99f=this.getProperty("stateprovider");
var _9a0=this.getProperty("handle");
if(_99f!=null&&_9a0!=null){
url=url.replace("${stateprovider}",_99f).replace("${handle}",_9a0);
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
EditorDataBinding.prototype._onPageInitialize=function(_9a1){
EditorDataBinding.superclass._onPageInitialize.call(this,_9a1);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9a2){
EditorDataBinding.superclass.handleAction.call(this,_9a2);
switch(_9a2.type){
case Binding.ACTION_DIRTY:
if(_9a2.target!=this){
if(!this.isDirty){
this.dirty();
}
_9a2.consume();
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
EditorDataBinding.prototype.setValue=function(_9a3){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9a4){
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
var _9a9=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9a9=fake.getValue()!="";
}
if(!_9a9&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9a9&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9a9;
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
var _9ad=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9ad!=null){
_9ad.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9ae){
_9ae=_9ae!=null?_9ae:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9ae;
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
var _9af=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9b0=_9af.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9b0;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9b0=_9b0.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9b0;
}
var self=this;
var _9b2=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9b2.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9b5=this.getProperty("label");
if(_9b5){
this.setLabel(_9b5);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9b6){
this.setProperty("label",_9b6);
if(this.shadowTree.labelBinding==null){
var _9b7=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9b7.attachClassName("fieldgrouplabel");
cell.insertBefore(_9b7.bindingElement,cell.getElementsByTagName("div").item(1));
_9b7.attach();
this.shadowTree.labelBinding=_9b7;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9b6));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9b9){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9b9.bindingElement);
return _9b9;
};
FieldGroupBinding.prototype.addFirst=function(_9ba){
var _9bb=this.shadowTree[FieldGroupBinding.CENTER];
_9bb.insertBefore(_9ba.bindingElement,_9bb.firstChild);
return _9ba;
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
var _9bc=this.getProperty("relation");
if(_9bc!=null){
this.bindingRelation=_9bc;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9bd,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9bd,arg);
switch(_9bd){
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
FieldBinding.newInstance=function(_9bf){
var _9c0=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9bf);
return UserInterface.registerBinding(_9c0,FieldBinding);
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
var _9c1=this.getDescendantBindingByLocalName("fieldgroup");
if(_9c1!=null){
_9c1.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9c2=true;
var _9c3=this.getDescendantBindingsByLocalName("*");
while(_9c3.hasNext()){
var _9c4=_9c3.getNext();
if(Interfaces.isImplemented(IData,_9c4)){
var _9c5=_9c4.validate();
if(_9c2&&!_9c5){
_9c2=false;
}
}
}
return _9c2;
};
FieldsBinding.prototype.handleAction=function(_9c6){
FieldsBinding.superclass.handleAction.call(this,_9c6);
var _9c7=_9c6.target;
if(_9c7!=this){
switch(_9c6.type){
case Binding.ACTION_INVALID:
var _9c8=DataBinding.getAssociatedLabel(_9c7);
if(_9c8){
this._invalidFieldLabels.set(_9c7.key,_9c8);
}
if(_9c7.error){
if(!_9c7.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9c7.error},_9c7);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9c6.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9c7.key)){
this._invalidFieldLabels.del(_9c7.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9c6.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9c9=null;
if(this._invalidFieldLabels.hasEntries()){
_9c9=this._invalidFieldLabels.toList();
}
return _9c9;
};
FieldsBinding.newInstance=function(_9ca){
var _9cb=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9ca);
return UserInterface.registerBinding(_9cb,FieldsBinding);
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
var _9cc=this.getProperty("image");
if(_9cc){
this.setImage(_9cc);
}
var _9cd=this.getProperty("tooltip");
if(_9cd){
this.setToolTip(_9cd);
}
var _9ce=this.getProperty("label");
if(_9ce){
this.setLabel(_9ce);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9d0=this.getAncestorBindingByLocalName("field");
if(_9d0){
var _9d1=true;
_9d0.getDescendantBindingsByLocalName("*").each(function(_9d2){
if(Interfaces.isImplemented(IData,_9d2)){
_9d2.focus();
_9d1=false;
}
return _9d1;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9d3){
this.setProperty("label",_9d3);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9d3);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9d4=this.getProperty("label");
if(!_9d4){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9d4=node.data;
}
}
return _9d4;
};
FieldDescBinding.prototype.setImage=function(_9d6){
this.setProperty("image",_9d6);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9d7){
this.setProperty("tooltip",_9d7);
if(this.isAttached){
this.bindingElement.title=_9d7;
}
};
FieldDescBinding.newInstance=function(_9d8){
var _9d9=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9d8);
return UserInterface.registerBinding(_9d9,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9da){
var _9db=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9da);
return UserInterface.registerBinding(_9db,FieldDataBinding);
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
var _9dc=this._fieldHelpPopupBinding;
if(_9dc){
_9dc.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9dd=app.bindingMap.fieldhelpopupset;
var doc=_9dd.bindingDocument;
var _9df=_9dd.add(PopupBinding.newInstance(doc));
var _9e0=_9df.add(PopupBodyBinding.newInstance(doc));
_9df.position=PopupBinding.POSITION_RIGHT;
_9df.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9e0.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9e1=this.getProperty("label");
if(_9e1){
_9e0.bindingElement.innerHTML=Resolver.resolve(_9e1);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9df;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9e2=this.getAncestorBindingByLocalName("field");
if(_9e2){
_9e2.attachClassName("fieldhelp");
var _9e3=ClickButtonBinding.newInstance(this.bindingDocument);
_9e3.attachClassName("fieldhelp");
_9e3.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9e3);
_9e3.attach();
var self=this;
_9e3.oncommand=function(){
self.attachPopupBinding();
};
_9e3.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9e3;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9e5=this._fieldHelpPopupBinding;
if(_9e5&&!_9e5.isAttached){
_9e5.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9e7){
RadioDataGroupBinding.superclass.handleAction.call(this,_9e7);
switch(_9e7.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9e9,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9e9,arg);
switch(_9e9){
case BroadcastMessages.KEY_ARROW:
var _9eb=null;
var next=null;
var _9ed=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9ed=this.getChildBindingsByLocalName("radio");
while(!_9eb&&_9ed.hasNext()){
var _9ee=_9ed.getNext();
if(_9ee.getProperty("ischecked")){
_9eb=_9ee;
}
}
break;
}
if(_9eb){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9ed.getFollowing(_9eb);
while(next!=null&&next.isDisabled){
next=_9ed.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9ed.getPreceding(_9eb);
while(next!=null&&next.isDisabled){
next=_9ed.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9ef){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9ef){
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
var _9f0=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9f0.type="hidden";
_9f0.name=this._name;
this.bindingElement.appendChild(_9f0);
this.shadowTree.input=_9f0;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9f1=null;
var _9f2=this.getChildBindingsByLocalName("radio");
while(!_9f1&&_9f2.hasNext()){
var _9f3=_9f2.getNext();
if(_9f3.isChecked){
_9f1=_9f3.getProperty("value");
}
}
return _9f1;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9f4){
};
RadioDataGroupBinding.prototype.setResult=function(_9f5){
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
this.propertyMethodMap["checked"]=function(_9f6){
if(_9f6!=this.isChecked){
this.setChecked(_9f6,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9f7=this.getProperty("ischecked");
if(_9f7!=this.isChecked){
this.setChecked(_9f7,true);
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
var _9f8=this.getProperty("relate");
var _9f9=this.getProperty("oncommand");
var _9fa=this.getProperty("isdisabled");
if(_9f8){
this.bindingRelate=_9f8;
this.relate();
}
if(_9f9){
this.oncommand=function(){
Binding.evaluate(_9f9,this);
};
}
if(_9fa==true){
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
var _9fc=this.getCallBackID();
this._buttonBinding.check=function(_9fd){
RadioButtonBinding.prototype.check.call(this,_9fd);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9fe){
RadioButtonBinding.prototype.uncheck.call(this,_9fe);
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
RadioDataBinding.prototype.setChecked=function(_9ff,_a00){
this._buttonBinding.setChecked(_9ff,_a00);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9ff);
};
RadioDataBinding.prototype.check=function(_a01){
this.setChecked(true,_a01);
};
RadioDataBinding.prototype.uncheck=function(_a02){
this.setChecked(false,_a02);
};
RadioDataBinding.prototype.setDisabled=function(_a03){
if(_a03!=this.isDisabled){
this.isDisabled=_a03;
this._buttonBinding.setDisabled(_a03);
if(_a03){
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
var _a05=DOMEvents.getTarget(e);
switch(_a05){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a06=this.getProperty("label");
if(_a06){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a06)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a07){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a07;
}
this.setProperty("label",_a07);
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
this.propertyMethodMap["checked"]=function(_a08){
if(_a08!=this.isChecked){
this.setChecked(_a08,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a09=this.getProperty("ischecked");
if(_a09!=this.isChecked){
this.setChecked(_a09,true);
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
var _a0b=DOMEvents.getTarget(e);
switch(_a0b){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a0c,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a0c,arg);
switch(_a0c){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a0f){
_a0f.consume();
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
var _a11=this.getCallBackID();
this._buttonBinding.check=function(_a12){
ButtonBinding.prototype.check.call(this,_a12);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a12){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a13){
ButtonBinding.prototype.uncheck.call(this,_a13);
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
if(_a11!=null){
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
var _a14=true;
var _a15=this.bindingElement.parentNode;
if(_a15){
var _a16=UserInterface.getBinding(_a15);
if(_a16&&_a16 instanceof CheckBoxGroupBinding){
if(_a16.isRequired){
if(_a16.isValid){
_a14=_a16.validate();
}else{
_a14=false;
}
}
}
}
return _a14;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a17=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a17.type="hidden";
_a17.name=this._name;
_a17.style.display="none";
this.bindingElement.appendChild(_a17);
this.shadowTree.input=_a17;
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
var _a18=null;
var _a19=this.getProperty("value");
if(this.isChecked){
_a18=_a19?_a19:"on";
}
return _a18;
};
CheckBoxBinding.prototype.setValue=function(_a1a){
if(_a1a==this.getValue()||_a1a=="on"){
this.check(true);
}else{
if(_a1a!="on"){
this.setPropety("value",_a1a);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a1b=false;
if(this.isChecked){
_a1b=this._result!=null?this._result:true;
}
return _a1b;
};
CheckBoxBinding.prototype.setResult=function(_a1c){
if(typeof _a1c=="boolean"){
this.setChecked(_a1c,true);
}else{
this._result=_a1c;
}
};
CheckBoxBinding.newInstance=function(_a1d){
var _a1e=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a1d);
return UserInterface.registerBinding(_a1e,CheckBoxBinding);
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
var _a1f=true;
if(this.isRequired){
var _a20=this.getDescendantBindingsByLocalName("checkbox");
if(_a20.hasEntries()){
_a1f=false;
while(_a20.hasNext()&&!_a1f){
if(_a20.getNext().isChecked){
_a1f=true;
}
}
}
if(_a1f==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a1f;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a21){
if(_a21){
if(!this._labelBinding){
var _a22=LabelBinding.newInstance(this.bindingDocument);
_a22.attachClassName("invalid");
_a22.setImage("${icon:error}");
_a22.setLabel("Selection required");
this._labelBinding=this.addFirst(_a22);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a23){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a23);
switch(_a23.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a24){
var _a25=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a24);
return UserInterface.registerBinding(_a25,CheckBoxGroupBinding);
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
var _a26=DialogControlBinding.newInstance(this.bindingDocument);
_a26.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a26);
this._controlGroupBinding.attachRecursive();
var _a27=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a27);
var _a28=this.getLabel();
if(_a28!=null){
this.setLabel(_a28);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a29=this._snapTargetBinding;
if(Binding.exists(_a29)==true){
_a29.removeActionListener(Binding.ACTION_BLURRED,this);
_a29.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a2a){
if(Interfaces.isImplemented(IData,_a2a)){
this._snapTargetBinding=_a2a;
var _a2b=_a2a.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a2b&&_a2b.isConsumed){
this._environmentBinding=_a2b.listener;
}
if(this._environmentBinding){
_a2a.addActionListener(Binding.ACTION_BLURRED,this);
_a2a.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a2a)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a2a.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a2d=this._snapTargetBinding;
var _a2e=this._environmentBinding;
var root=UserInterface.getBinding(_a2d.bindingDocument.body);
if(Binding.exists(_a2d)&&Binding.exists(_a2e)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a2d.isAttached&&_a2e.isAttached){
var _a30=_a2d.boxObject.getUniversalPosition();
var _a31=_a2e.boxObject.getUniversalPosition();
_a31.y+=_a2e.bindingElement.scrollTop;
_a31.x+=_a2e.bindingElement.scrollLeft;
var tDim=_a2d.boxObject.getDimension();
var eDim=_a2e.boxObject.getDimension();
var _a34=false;
if(_a30.y+tDim.h<_a31.y){
_a34=true;
}else{
if(_a30.x+tDim.w<_a31.x){
_a34=true;
}else{
if(_a30.y>_a31.y+eDim.h){
_a34=true;
}else{
if(_a30.x>_a31.x+eDim.w){
_a34=true;
}
}
}
}
if(!_a34){
this._setComputedPosition(_a30,_a31,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a35,_a36,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a3b=_a35;
var _a3c=false;
if(_a35.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a3c=true;
}else{
if(_a35.x+tDim.w>=_a36.x+eDim.w){
_a3c=true;
}
}
if(_a3c){
_a3b.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a3b.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a3b.y-=(bDim.h);
_a3b.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a3b);
};
BalloonBinding.prototype.handleBroadcast=function(_a3d,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a3d,arg);
switch(_a3d){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a3f){
var _a40=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a3f){
_a40=true;
}
}
return _a40;
};
BalloonBinding.prototype._setPosition=function(_a42){
var _a43=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a43=true;
}
}
if(!_a43){
this.bindingElement.style.left=_a42.x+"px";
this.bindingElement.style.top=_a42.y+"px";
this._point=_a42;
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
BalloonBinding.prototype.handleAction=function(_a45){
BalloonBinding.superclass.handleAction.call(this,_a45);
var _a46=_a45.target;
switch(_a45.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a45.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a46==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a46)){
self.dispose();
}else{
if(_a46.validate()){
var _a48=true;
if(_a45.type==Binding.ACTION_BLURRED){
var root=_a46.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a48=false;
}
}
if(_a48){
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
BalloonBinding.prototype.setLabel=function(_a4b){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a4c=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a4b);
_a4c.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a4c);
}
this.setProperty("label",_a4b);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a4e){
var _a4f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a4e);
var _a50=UserInterface.registerBinding(_a4f,BalloonBinding);
_a50.hide();
return _a50;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a51,_a52){
if(Interfaces.isImplemented(IData,_a52)==true){
var _a53,_a54=_a52.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a54&&_a54.isConsumed){
switch(_a54.listener.constructor){
case StageBinding:
_a53=false;
break;
case StageDialogBinding:
_a53=true;
break;
}
}
var _a55=_a53?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a56=_a55.add(BalloonBinding.newInstance(top.app.document));
_a56.setLabel(_a51.text);
_a56.snapTo(_a52);
_a56.attach();
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
var _a57=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a5a=_a57.getDataBinding(name);
if(_a5a){
ErrorBinding.presentError({text:text},_a5a);
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
FocusBinding.focusElement=function(_a5b){
var _a5c=true;
try{
_a5b.focus();
Application.focused(true);
}
catch(exception){
var _a5d=UserInterface.getBinding(_a5b);
var _a5e=SystemLogger.getLogger("FocusBinding.focusElement");
_a5e.warn("Could not focus "+(_a5d?_a5d.toString():String(_a5b)));
_a5c=false;
}
return _a5c;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a5f){
var win=_a5f.bindingWindow;
var id=_a5f.bindingElement.id;
return {getBinding:function(){
var _a62=null;
try{
if(Binding.exists(_a5f)){
_a62=win.bindingMap[id];
}
}
catch(exception){
}
return _a62;
}};
};
FocusBinding.navigateNext=function(_a63){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a63);
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
var _a64=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a64&&_a64.isConsumed){
if(_a64.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a65){
FocusBinding.superclass.handleAction.call(this,_a65);
var _a66=_a65.target;
var _a67=null;
if(this._isFocusManager){
switch(_a65.type){
case FocusBinding.ACTION_ATTACHED:
if(_a66!=this){
this._isUpToDate=false;
}
_a65.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a66!=this){
this._isUpToDate=false;
_a65.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a67=new FocusCrawler();
_a67.mode=FocusCrawler.MODE_BLUR;
_a67.crawl(_a66.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a65.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a66!=this){
_a67=new FocusCrawler();
_a67.mode=FocusCrawler.MODE_FOCUS;
_a67.crawl(_a66.bindingElement);
}
_a65.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a66)){
this.claimFocus();
this._onFocusableFocused(_a66);
}
_a65.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a66)){
this._onFocusableBlurred(_a66);
}
_a65.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a68){
var _a69=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a69==null&&list.hasNext()){
var _a6b=list.getNext();
if(this._cachedFocus&&_a6b==this._cachedFocus.getBinding()){
_a69=_a6b;
}
}
if(_a69!=null){
if(_a6b.isFocused){
var next=_a68?list.getPreceding(_a69):list.getFollowing(_a69);
if(!next){
next=_a68?list.getLast():list.getFirst();
}
next.focus();
}else{
_a69.focus();
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
var _a6d=new FocusCrawler();
var list=new List();
_a6d.mode=FocusCrawler.MODE_INDEX;
_a6d.crawl(this.bindingElement,list);
this._focusableList=list;
this._isUpToDate=true;
}
return this._focusableList;
};
FocusBinding.prototype._focusFirstFocusable=function(){
if(this._isFocusManager&&this.isActivated){
try{
var win=this.bindingWindow;
win.focus();
}
catch(exception){
}
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
var _a71=this._cachedFocus.getBinding();
if(_a71&&!_a71.isFocused){
_a71.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a72){
if(_a72!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a72;
_a72.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a72);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a73){
_a73.deleteProperty(FocusBinding.MARKER);
if(_a73==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a75){
this.bindingElement.style.left=_a75+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a76){
this.hiddenTabBindings.add(_a76);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a77=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a77.getLabel());
item.setImage(_a77.getImage());
item.associatedTabBinding=_a77;
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
TabsButtonBinding.prototype.handleAction=function(_a7a){
TabsButtonBinding.superclass.handleAction.call(this,_a7a);
switch(_a7a.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a7b=this.selectedTabBinding;
if(_a7b){
this.containingTabBoxBinding.moveToOrdinalPosition(_a7b,0);
this.containingTabBoxBinding.select(_a7b);
}
_a7a.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a7c){
var _a7d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a7c);
_a7d.setAttribute("type","checkbox");
_a7d.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a7d.className="tabbutton";
return UserInterface.registerBinding(_a7d,TabsButtonBinding);
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
var _a7e=TabBoxBinding.currentActiveInstance;
if(_a7e!=null&&Binding.exists(_a7e)){
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
var _a7f=this.getTabElements().getLength();
var _a80=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a7f!=_a80){
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
var _a81=this.getTabPanelElements();
while(_a81.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a81.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a82=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a83=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a84=_a82>_a83?"tabsbelow":"tabsontop";
this.attachClassName(_a84);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a86=this.getTabPanelElements();
var _a87=null;
var _a88=this.getProperty("selectedindex");
if(_a88!=null){
if(_a88>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a89=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a8b=_a86.getNext();
this.registerTabBoxPair(tab,_a8b);
if(_a88&&_a89==_a88){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a87=tab;
}
}
_a89++;
}
if(!_a87){
_a87=tabs.getFirst();
_a87.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a8c){
var _a8d=null;
var _a8e=null;
if(this.isEqualSize){
var _a8f=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a91=this.getTabPanelElements();
_a91.each(function(_a92){
max=_a92.offsetHeight>max?_a92.offsetHeight:max;
});
_a8e=max+_a8f.top+_a8f.bottom;
if(_a8c&&this._tabPanelsElement.style.height!=null){
_a8d=this._tabPanelsElement.offsetHeight;
}
if(_a8d!=null||_a8e>_a8d){
this._tabPanelsElement.style.height=_a8e+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a93){
_a93._invalidCount=0;
_a93.addActionListener(Binding.ACTION_INVALID,this);
_a93.addActionListener(Binding.ACTION_VALID,this);
_a93.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a94){
TabBoxBinding.superclass.handleAction.call(this,_a94);
var _a95=_a94.target;
var _a96=_a94.listener;
switch(_a94.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a95.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a94.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a95.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a96._invalidCount++;
if(_a96._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a96.isSelected){
self._showWarning(_a96,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a96._invalidCount>0){
_a96._invalidCount--;
if(_a96._invalidCount==0){
if(_a96.isSelected){
this._showWarning(_a96,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a96,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a94._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a94._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a99=DOMEvents.getTarget(e);
if(_a99==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a9b=this.getTabPanelElements();
tabs.each(function(tab,_a9d){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a9e=_a9b.get(_a9d);
this.registerTabBoxPair(tab,_a9e);
}
},this);
var _a9f=this._tabBoxPairs;
for(var key in _a9f){
var tab=_a9f[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a99);
switch(_a99.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _aa3=_a99.parentNode;
if(_aa3==this._tabsElement||_aa3==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a99==this._tabsElement||_a99==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_aa5){
var _aa6=this.getBindingForArgument(arg);
if(_aa6!=null&&!_aa6.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_aa6.select(_aa5);
this.getTabPanelBinding(_aa6).select(_aa5);
var _aa7=this.getProperty("selectedindex");
if(_aa7!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_aa6.bindingElement,true));
}
this._selectedTabBinding=_aa6;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_aa6.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _aa8=this.getTabPanelBinding(_aa6);
this._showBalloon(_aa8,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_aaa){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_aaa.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_aaa};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_aae){
var _aaf=null;
try{
var key=_aae.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ab1=this._tabBoxPairs[key].tabPanel;
_aaf=UserInterface.getBinding(_ab1);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _aaf;
};
TabBoxBinding.prototype.getTabBinding=function(_ab2){
var key=_ab2.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ab4=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ab4);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ab5=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ab5);
return _ab5;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ab6,_ab7){
var _ab8=_ab6.bindingElement;
_ab6.setProperty("selected",true);
var _ab9=this.summonTabPanelBinding();
var _aba=_ab9.bindingElement;
if(_ab7){
_aba.appendChild(_ab7 instanceof Binding?_ab7.bindingElement:_ab7);
}
this.registerTabBoxPair(_ab8,_aba);
UserInterface.getBinding(this._tabsElement).add(_ab6);
this._tabPanelsElement.appendChild(_aba);
_ab6.attach();
UserInterface.getBinding(_aba).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ab6;
};
TabBoxBinding.prototype.importTabBinding=function(_abb){
var that=_abb.containingTabBoxBinding;
var _abd=that.getTabPanelBinding(_abb);
var _abe=_abd.getBindingElement();
var _abf=_abb.getBindingElement();
that.dismissTabBinding(_abb);
this._tabsElement.appendChild(_abf);
this._tabPanelsElement.appendChild(_abe);
this.registerTabBoxPair(_abf,_abe);
_abb.containingTabBoxBinding=this;
this.select(_abb);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ac0){
var _ac1=null;
if(_ac0.isSelected){
_ac1=this.getBestTab(_ac0);
this._selectedTabBinding=null;
}
var _ac2=this.getTabPanelBinding(_ac0);
this.unRegisterTabBoxPair(_ac0.bindingElement);
_ac0.dispose();
_ac2.dispose();
if(_ac1!=null){
this.select(_ac1);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_ac3){
if(_ac3.isSelected){
this.selectBestTab(_ac3);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ac4){
var _ac5=this.getBestTab(_ac4);
if(_ac5){
this.select(_ac5);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ac6){
var _ac7=null;
var _ac8=_ac6.getOrdinalPosition(true);
var _ac9=this.getTabBindings();
var _aca=_ac9.getLength();
var _acb=_aca-1;
if(_aca==1){
_ac7=null;
}else{
if(_ac8==_acb){
_ac7=_ac9.get(_ac8-1);
}else{
_ac7=_ac9.get(_ac8+1);
}
}
return _ac7;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_acc,_acd){
var _ace=this.bindingDocument.getElementById(_acc.bindingElement.id);
var tab=this.getTabElements().get(_acd);
this._tabsElement.insertBefore(_ace,tab);
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
var _ad0=this._nodename_tab;
var _ad1=new List(this._tabsElement.childNodes);
var _ad2=new List();
while(_ad1.hasNext()){
var _ad3=_ad1.getNext();
if(_ad3.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ad3)==_ad0){
_ad2.add(_ad3);
}
}
return _ad2;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ad4=this._nodename_tabpanel;
var _ad5=new List(this._tabPanelsElement.childNodes);
var _ad6=new List();
_ad5.each(function(_ad7){
if(_ad7.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ad7)==_ad4){
_ad6.add(_ad7);
}
});
return _ad6;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _ad8=new List();
var _ad9=this.getTabElements();
_ad9.each(function(_ada){
_ad8.add(UserInterface.getBinding(_ada));
});
return _ad8;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _adb=new List();
this.getTabPanelElements().each(function(_adc){
_adb.add(UserInterface.getBinding(_adc));
});
return _adb;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _add=null;
if(this._selectedTabBinding){
_add=this.getTabPanelBinding(this._selectedTabBinding);
}
return _add;
};
TabBoxBinding.prototype._showWarning=function(_ade,_adf){
var _ae0=this.getTabBinding(_ade);
if(_adf){
if(_ae0.labelBinding.hasImage){
_ae0._backupImage=_ae0.getImage();
}
_ae0.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ae0._backupImage){
_ae0.setImage(_ae0._backupImage);
}else{
_ae0.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ae1,_ae2){
var _ae3=this.getTabBinding(_ae1);
if((_ae2&&!_ae3.isSelected)||!_ae2){
if(_ae3.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ae2){
if(_ae3.labelBinding.hasImage){
_ae3._backupImage=_ae3.getImage();
}
_ae3.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_ae3._backupImage!=null){
_ae3.setImage(_ae3._backupImage);
}else{
_ae3.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_ae4){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _ae7=tab.getOrdinalPosition(true);
var next=null;
var _ae9=new List();
tabs.each(function(t){
if(t.isVisible){
_ae9.add(t);
}
});
if(_ae9.getLength()>1){
if(_ae7==0&&!_ae4){
next=_ae9.getLast();
}else{
if(_ae7==_ae9.getLength()-1&&_ae4){
next=_ae9.getFirst();
}else{
if(_ae4){
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
var _aec=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_aec.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_aed){
TabsBinding.superclass.handleAction.call(this,_aed);
switch(_aed.type){
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
var _af0=self.bindingElement.offsetWidth;
if(_af0!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_af0;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_af1){
if(_af1 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_af1);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _af2=false;
var _af3,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _af6=this.constructor.TABBUTTON_IMPLEMENTATION;
var _af7=this.bindingElement.offsetWidth-_af6.RESERVED_SPACE;
var _af8=null;
var sum=0,_afa=0;
var _afb=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_afb){
tab=tabs.getNext();
_af3=UserInterface.getBinding(tab);
if(!_af8){
_af8=_af3;
}
sum+=tab.offsetWidth;
if(sum>=_af7){
_af2=true;
if(_af3.isSelected){
if(!DOMUtil.isFirstElement(_af3.bindingElement,true)){
this.isManaging=false;
if(_af8){
_af8.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_af3,_afa-1);
_afb=false;
}
}else{
_af3.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_af3);
}
}else{
_af3.show();
_af8=_af3;
_afa++;
}
}
if(_afb){
if(_af2&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _afc=_af8.getBindingElement();
var _afd=_afc.offsetLeft+_afc.offsetWidth;
var _afe=this.tabsButtonBinding;
setTimeout(function(){
_afe.show(_afd+4);
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
var _aff=TabBinding.superclass.serialize.call(this);
if(_aff){
_aff.label=this.getLabel();
_aff.image=this.getImage();
_aff.tooltip=this.getToolTip();
}
return _aff;
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
var _b00=this.bindingElement.getAttribute("image");
var _b01=this.bindingElement.getAttribute("label");
var _b02=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b01){
this.setLabel(_b01);
}
if(_b00){
this.setImage(_b00);
}
if(_b02){
this.setToolTip(_b02);
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
TabBinding.prototype.setLabel=function(_b04){
if(_b04!=null){
this.setProperty("label",_b04);
if(this.isAttached){
this.labelBinding.setLabel(_b04);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b05){
if(_b05){
this.setProperty("tooltip",_b05);
if(this.isAttached){
this.labelBinding.setToolTip(_b05);
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
var _b07=false;
if(Client.isMozilla==true){
}
if(!_b07){
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
TabBinding.prototype.select=function(_b08){
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
TabBinding.newInstance=function(_b09){
var _b0a=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b09);
return UserInterface.registerBinding(_b0a,TabBinding);
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
var _b0b=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b0b=true;
this._lastKnownDimension=dim1;
}
return _b0b;
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
TabPanelBinding.prototype.select=function(_b0e){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b0e!=true){
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
TabPanelBinding.prototype.handleAction=function(_b0f){
TabPanelBinding.superclass.handleAction.call(this,_b0f);
var _b10=_b0f.target;
switch(_b0f.type){
case BalloonBinding.ACTION_INITIALIZE:
_b0f.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b11){
var _b12=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b11);
UserInterface.registerBinding(_b12,TabPanelBinding);
return UserInterface.getBinding(_b12);
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
var _b13=SplitBoxBinding.superclass.serialize.call(this);
if(_b13){
_b13.orient=this.getOrient();
_b13.layout=this.getLayout();
}
return _b13;
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
var _b14=this.getSplitPanelElements();
if(_b14.hasEntries()){
var _b15=new List(this.getLayout().split(":"));
if(_b15.getLength()!=_b14.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b14.each(function(_b16){
_b16.setAttribute("ratio",_b15.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b17=this.getProperty("orient");
if(_b17){
this._orient=_b17;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b18=this.getSplitterBindings();
while(_b18.hasNext()){
var _b19=_b18.getNext();
if(_b19&&_b19.getProperty("collapsed")==true){
_b19.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b1a){
SplitBoxBinding.superclass.handleAction.call(this,_b1a);
switch(_b1a.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b1a.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b1a.target);
_b1a.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b1a.target);
_b1a.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b1b){
this._getSplitPanelBindingForSplitter(_b1b).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b1c){
this._getSplitPanelBindingForSplitter(_b1c).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b1d){
var _b1e=DOMUtil.getOrdinalPosition(_b1d.bindingElement,true);
var _b1f,_b20=this.getSplitPanelElements();
switch(_b1d.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b1f=_b20.get(_b1e);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b1f=_b20.get(_b1e+1);
break;
}
return UserInterface.getBinding(_b1f);
};
SplitBoxBinding.prototype.invokeLayout=function(_b21){
var _b22=this.isHorizontalOrient();
var _b23=this.getSplitPanelBindings();
var _b24=this.getSplitterBindings();
var _b25=new List();
var _b26,sum=0;
var _b28=0;
_b23.each(function(_b29){
if(_b29.isFixed==true){
if(!_b23.hasNext()){
_b28+=_b29.getFix();
}
_b25.add(0);
sum+=0;
}else{
_b26=_b29.getRatio();
_b25.add(_b26);
sum+=_b26;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b25.getLength()!=_b23.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b2a=_b22?this.getInnerWidth():this.getInnerHeight();
_b2a-=_b28;
_b24.each(function(_b2b){
if(_b2b.isVisible){
_b2a-=SplitterBinding.DIMENSION;
}
});
var unit=_b2a/sum;
var _b2d=0;
var self=this;
_b23.each(function(_b2f){
var span=0;
var _b31=_b25.getNext();
if(_b2f.isFixed){
span=_b2f.getFix();
}else{
span=Math.round(unit*_b31);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b2d+=span;
while(_b2d>_b2a){
_b2d--;
span--;
}
if(!_b2f.isFixed){
if(_b22){
_b2f.setWidth(span);
}else{
_b2f.setHeight(span);
}
}
});
}
if(_b21!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b32=this.getLayout();
if(_b32){
this.setProperty("layout",_b32);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b33=this.isHorizontalOrient();
var _b34=this.getSplitPanelBindings();
var _b35=this.getSplitterBindings();
var _b36=null;
var _b37=null;
var unit=null;
var _b39=null;
var span=null;
_b34.each(function(_b3b){
if(!unit){
unit=_b33?_b3b.getWidth():_b3b.getHeight();
}
span=_b33?_b3b.getWidth():_b3b.getHeight();
if(_b39){
span-=_b39;
_b39=null;
}
_b36=_b35.getNext();
if(_b36&&_b36.offset){
_b39=_b36.offset;
span+=_b39;
}
_b3b.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b3c){
this.logger.debug(_b3c);
this.setProperty("layout",_b3c);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b3d="",_b3e=this.getSplitPanelBindings();
_b3e.each(function(_b3f){
_b3d+=_b3f.getRatio().toString();
_b3d+=_b3e.hasNext()?":":"";
});
this.setProperty("layout",_b3d);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b40=this.getSplitPanelElements();
_b40.each(function(_b41){
layout+="1"+(_b40.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b42){
this.bindingElement.style.width=_b42+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b43){
this.bindingElement.style.height=_b43+"px";
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
SplitBoxBinding.prototype.fit=function(_b44){
if(!this.isFit||_b44){
if(this.isHorizontalOrient()){
var max=0;
var _b46=this.getSplitPanelBindings();
_b46.each(function(_b47){
var _b48=_b47.bindingElement.offsetHeight;
max=_b48>max?_b48:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b49){
var _b4a=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b49);
return UserInterface.registerBinding(_b4a,SplitBoxBinding);
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
var _b4d=this.getProperty("hidden");
if(_b4d){
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
var _b4e=this.getProperty("ratiocache");
if(_b4e){
this.setRatio(_b4e);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b4f){
if(!this.isFixed){
if(_b4f!=this.getWidth()){
if(_b4f<0){
_b4f=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b4f+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b4f);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b50=null;
if(this.isFixed){
_b50=this.getFix();
}else{
_b50=this.bindingElement.offsetWidth;
}
return _b50;
};
SplitPanelBinding.prototype.setHeight=function(_b51){
if(!this.isFixed){
if(_b51!=this.getHeight()){
try{
this.bindingElement.style.height=_b51+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b52=null;
if(this.isFixed){
_b52=this.getFix();
}else{
_b52=this.bindingElement.offsetHeight;
}
return _b52;
};
SplitPanelBinding.prototype.setRatio=function(_b53){
this.setProperty("ratio",_b53);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b54){
if(_b54){
this._fixedSpan=_b54;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b54);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b54);
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
SplitPanelBinding.newInstance=function(_b55){
var _b56=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b55);
return UserInterface.registerBinding(_b56,SplitPanelBinding);
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
var _b57=SplitBoxBinding.superclass.serialize.call(this);
if(_b57){
_b57.collapse=this.getProperty("collapse");
_b57.collapsed=this.getProperty("collapsed");
_b57.disabled=this.getProperty("isdisabled");
}
return _b57;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b58=this.getProperty("hidden");
if(_b58){
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
SplitterBinding.prototype.setCollapseDirection=function(_b5a){
this.setProperty("collapse",_b5a);
this._collapseDirection=_b5a;
};
SplitterBinding.prototype.handleAction=function(_b5b){
SplitterBinding.superclass.handleAction.call(this,_b5b);
switch(_b5b.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b5b.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b5d=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b5d.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b5d.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b5e){
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
SplitterBinding.newInstance=function(_b69){
var _b6a=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b69);
return UserInterface.registerBinding(_b6a,SplitterBinding);
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
var _b6b=this.getProperty("selectedindex");
var _b6c=this.getDeckElements();
if(_b6c.hasEntries()){
var _b6d=false;
var _b6e=0;
while(_b6c.hasNext()){
var deck=_b6c.getNext();
if(_b6b&&_b6e==_b6b){
deck.setAttribute("selected","true");
_b6d=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b6d=true;
}
}
_b6e++;
}
if(!_b6d){
_b6c.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b71=this.getBindingForArgument(arg);
if(_b71!=null){
if(_b71!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b71.select();
this._selectedDeckBinding=_b71;
var _b72=this.getProperty("selectedindex");
if(_b72!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b71.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b73=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b73=true;
this._lastKnownDimension=dim1;
}
return _b73;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b76){
var _b77=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b76);
return UserInterface.registerBinding(_b77,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b78){
DeckBinding.superclass.handleAction.call(this,_b78);
var _b79=_b78.target;
switch(_b78.type){
case BalloonBinding.ACTION_INITIALIZE:
_b78.consume();
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
DeckBinding.newInstance=function(_b7b){
var _b7c=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b7b);
return UserInterface.registerBinding(_b7c,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b7d){
if(_b7d instanceof ToolBarBodyBinding){
if(_b7d.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b7d;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b7d;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b7d);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b7e=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b7e){
this.setImageSize(_b7e);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b80=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b80.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b80.isDefaultContent=true;
this.add(_b80);
_b80.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b82=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b82);
}
if(_b82!=null&&_b82.hasClassName("max")){
this._maxToolBarGroup(_b82,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b84){
var _b85=this.boxObject.getDimension().w;
var _b86=CSSComputer.getPadding(this.bindingElement);
_b85-=(_b86.left+_b86.right);
if(_b84!=null){
_b85-=_b84.boxObject.getDimension().w;
if(!Client.isWindows){
_b85-=1;
}
if(Client.isExplorer){
_b85-=15;
}
}
max.bindingElement.style.width=_b85+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b87){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b87);
};
ToolBarBinding.prototype.addLeft=function(_b88,_b89){
var _b8a=null;
if(this._toolBarBodyLeft!=null){
_b8a=this._toolBarBodyLeft.add(_b88,_b89);
}else{
throw new Error("No left toolbarbody");
}
return _b8a;
};
ToolBarBinding.prototype.addLeftFirst=function(_b8b,_b8c){
var _b8d=null;
if(this._toolBarBodyLeft){
_b8d=this._toolBarBodyLeft.addFirst(_b8b,_b8c);
}else{
throw new Error("No left toolbarbody");
}
return _b8d;
};
ToolBarBinding.prototype.addRight=function(_b8e){
var _b8f=null;
if(this._toolBarBodyRight){
_b8f=this._toolBarBodyRight.add(_b8e);
}else{
throw new Error("No left toolbarbody");
}
return _b8f;
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
ToolBarBinding.newInstance=function(_b92){
var _b93=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b92);
return UserInterface.registerBinding(_b93,ToolBarBinding);
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
var _b94=this.getDescendantBindingsByLocalName("toolbargroup");
var _b95=new List();
var _b96=true;
_b94.each(function(_b97){
if(_b97.isVisible&&!_b97.isDefaultContent){
_b95.add(_b97);
}
});
while(_b95.hasNext()){
var _b98=_b95.getNext();
_b98.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b96){
_b98.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b96=false;
}
if(!_b95.hasNext()){
_b98.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b9b=list.getNext();
var _b9c=_b9b.getEqualSizeWidth();
if(_b9c>max){
max=_b9c;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b9b=list.getNext();
_b9b.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b9d,_b9e){
var _b9f=ToolBarBinding.superclass.add.call(this,_b9d);
if(!_b9e){
if(_b9d instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b9f;
};
ToolBarBodyBinding.prototype.addFirst=function(_ba0,_ba1){
var _ba2=ToolBarBinding.superclass.addFirst.call(this,_ba0);
if(!_ba1){
if(_ba0 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba2;
};
ToolBarBodyBinding.newInstance=function(_ba3){
var _ba4=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_ba3);
return UserInterface.registerBinding(_ba4,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_ba5){
switch(_ba5){
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
var _ba6=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_ba6)=="toolbarbody"){
UserInterface.getBinding(_ba6).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _ba7=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_ba7)=="toolbarbody"){
UserInterface.getBinding(_ba7).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_ba8){
var _ba9=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_ba8);
return UserInterface.registerBinding(_ba9,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_baa){
var _bab=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_baa);
return UserInterface.registerBinding(_bab,ToolBarButtonBinding);
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
var _bac=this.getProperty("label");
var _bad=this.getProperty("image");
if(_bac){
this.setLabel(_bac);
}
if(_bad){
this.setImage(_bad);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bae,_baf){
if(this.isAttached){
this._labelBinding.setLabel(_bae,_baf);
}
this.setProperty("label",_bae);
};
ToolBarLabelBinding.prototype.setImage=function(_bb0,_bb1){
if(this.isAttached){
this._labelBinding.setImage(_bb0,_bb1);
}
this.setProperty("image",_bb0);
};
ToolBarLabelBinding.newInstance=function(_bb2){
var _bb3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bb2);
return UserInterface.registerBinding(_bb3,ToolBarLabelBinding);
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
var _bb4=this.getDescendantBindingsByLocalName("clickbutton");
if(_bb4.hasEntries()){
while(_bb4.hasNext()){
var _bb5=_bb4.getNext();
if(_bb5.isDefault){
this._defaultButton=_bb5;
_bb5.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bb5.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bb4;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bb6,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bb6,arg);
switch(_bb6){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bb8=this.getAncestorBindingByType(DialogBinding,true);
if(_bb8!=null&&_bb8.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bb9){
DialogToolBarBinding.superclass.handleAction.call(this,_bb9);
var _bba=_bb9.target;
var _bbb=false;
var _bbc=this._buttons.reset();
if(_bba instanceof ClickButtonBinding){
switch(_bb9.type){
case Binding.ACTION_FOCUSED:
_bba.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bba;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bba.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bbb&&_bbc.hasNext()){
var _bbd=_bbc.getNext();
_bbb=_bbd.isFocused;
}
if(!_bbb){
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
ComboBoxBinding.newInstance=function(_bbf){
var _bc0=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bbf);
return UserInterface.registerBinding(_bc0,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bc1,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bc1,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bc5=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bc5.each(function(_bc6){
var _bc7=_bc6.getProperty("oncommand");
_bc6.setProperty("hiddencommand",_bc7);
_bc6.deleteProperty("oncommand");
_bc6.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bc8=null;
var _bc9=this.getActiveMenuItemId();
_bc5.reset();
while(_bc5.hasNext()){
var _bca=_bc5.getNext();
if(_bca.getProperty("id")==_bc9){
_bc8=_bca;
break;
}
}
if(_bc8==null&&_bc5.hasEntries()){
_bc8=_bc5.getFirst();
}
if(_bc8!=null){
this.setButton(_bc8);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bcb){
if(_bcb instanceof MenuItemBinding){
var _bcc=_bcb.getProperty("label");
var _bcd=_bcb.getProperty("image");
var _bce=_bcb.getProperty("image-hover");
var _bcf=_bcb.getProperty("image-active");
var _bd0=_bcb.getProperty("image-disabled");
var _bd1=_bcb.getProperty("hiddencommand");
this.setLabel(_bcc?_bcc:"");
this.image=_bcd;
this.imageHover=_bcd;
this.imageActive=_bcf;
this.imageDisabled=_bd0;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bd1,this);
};
this.hideActiveItem(_bcb);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bd2){
if(_bd2 instanceof MenuItemBinding){
this.setButton(_bd2);
this.setActiveMenuItemId(_bd2.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bd3){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bd4){
if(_bd4==_bd3){
Binding.prototype.hide.call(_bd4);
}else{
Binding.prototype.show.call(_bd4);
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
var _bd6=this._views;
for(var _bd7 in ViewDefinitions){
var def=ViewDefinitions[_bd7];
var key=def.perspective;
if(key!=null){
if(!_bd6.has(key)){
_bd6.set(key,new List());
}
var list=_bd6.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bdb,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bdb,arg);
switch(_bdb){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bde=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bde.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bde.add(StageViewMenuItemBinding.newInstance(_bde.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bde.show();
}else{
_bde.hide();
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
TreeBinding.grid=function(_be2){
var _be3=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_be2);
var _be5=_be2%_be3;
if(_be5>0){
_be2=_be2-_be5+_be3;
}
return _be2+TreeBodyBinding.PADDING_TOP;
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
var _be6=this.getProperty("focusable");
if(_be6!=null){
this._isFocusable=_be6;
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
var _be8=this.getProperty("builder");
if(_be8){
this._buildFromTextArea(_be8);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _be9=this.getProperty("selectable");
var _bea=this.getProperty("selectionproperty");
var _beb=this.getProperty("selectionvalue");
if(_be9){
this.setSelectable(true);
if(_bea){
this.setSelectionProperty(_bea);
}
if(_beb){
this.setSelectionValue(_beb);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _bee=UserInterface.getBinding(area);
var _bef=this._treeBodyBinding;
function build(){
_bef.subTreeFromString(area.value);
}
_bee.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_bf0){
var _bf1=_bf0.getHandle();
if(this._treeNodeBindings.has(_bf1)){
throw "Duplicate treenodehandles registered: "+_bf0.getLabel();
}else{
this._treeNodeBindings.set(_bf1,_bf0);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_bf1)){
_bf0.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_bf3){
this._treeNodeBindings.del(_bf3.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_bf4){
var _bf5=null;
if(this._treeNodeBindings.has(_bf4)){
_bf5=this._treeNodeBindings.get(_bf4);
}else{
throw "No such treenode: "+_bf4;
}
return _bf5;
};
TreeBinding.prototype.handleAction=function(_bf6){
TreeBinding.superclass.handleAction.call(this,_bf6);
var _bf7=_bf6.target;
switch(_bf6.type){
case TreeNodeBinding.ACTION_OPEN:
_bf6.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bf7);
_bf6.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bf7;
this.focusSingleTreeNodeBinding(_bf7);
if(!this.isFocused){
this.focus();
}
_bf6.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bf7;
this.focusSingleTreeNodeBinding(_bf7);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bf7;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bf7;
this.focusSingleTreeNodeBinding(_bf7);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bf6.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bf7.isFocused){
this.blurSelectedTreeNodes();
}
_bf6.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bf8,_bf9){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bfa){
if(_bfa!=null&&!_bfa.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bfa);
_bfa.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_bfb){
this.blurSelectedTreeNodes();
while(_bfb.hasNext()){
var _bfc=_bfb.getNext();
this._focusedTreeNodeBindings.add(_bfc);
_bfc.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _bfd=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _bfe=false;
var _bff=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c00=this._focusedTreeNodeBindings.getNext();
var _c01=_c00.getProperty(this._selectionProperty);
if(_c01!=null){
if(!this._selectionValue||this._selectionValue[_c01]){
_bff=(this._selectedTreeNodeBindings[_c00.key]=_c00);
var _c02=_bfd[_c00.key];
if(!_c02||_c02!=_bff){
_bfe=true;
}
}
}
}
if(_bff){
if(_bfe){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_bfd){
for(var key in _bfd){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c04=new List();
for(var key in this._selectedTreeNodeBindings){
_c04.add(this._selectedTreeNodeBindings[key]);
}
return _c04;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c06){
_c06.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c07){
var _c08=_c07.getDescendantBindingsByLocalName("treenode");
var _c09=true;
var self=this;
_c08.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c09;
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
var _c0c=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c0c!=null){
this.focusSingleTreeNodeBinding(_c0c);
_c0c.callback();
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
TreeBinding.prototype.add=function(_c0d){
var _c0e=null;
if(this._treeBodyBinding){
_c0e=this._treeBodyBinding.add(_c0d);
}else{
this._treeNodeBuffer.add(_c0d);
_c0e=_c0d;
}
return _c0e;
};
TreeBinding.prototype.addFirst=function(_c0f){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c10=this._treeBodyBinding.bindingElement;
_c10.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c11,_c12){
if(_c12.isContainer&&_c12.isOpen){
_c12.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c13){
this._isSelectable=_c13;
if(_c13){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c14){
this._selectionProperty=_c14;
};
TreeBinding.prototype.setSelectionValue=function(_c15){
if(_c15){
var list=new List(_c15.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c17,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c17,arg);
switch(_c17){
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
var _c19=this.getFocusedTreeNodeBindings();
if(_c19.hasEntries()){
var node=_c19.getFirst();
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
var _c1c=this.getFocusedTreeNodeBindings();
if(_c1c.hasEntries()){
var node=_c1c.getFirst();
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
var _c1f=null;
while(next==null&&(_c1f=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c1f!=null){
next=_c1f.getNextBindingByLocalName("treenode");
}
node=_c1f;
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
var _c21=DOMEvents.getTarget(e);
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
var _c22=new TreeCrawler();
var list=new List();
_c22.mode=TreeCrawler.MODE_GETOPEN;
_c22.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c25=list.getNext();
map.set(_c25.getHandle(),true);
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
var _c2a=this._positionIndicatorBinding;
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
if(y!=_c2a.getPosition().y){
_c2a.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c2a.isVisible){
_c2a.show();
}
}else{
if(_c2a.isVisible){
_c2a.hide();
}
}
}else{
if(_c2a.isVisible){
_c2a.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c2d){
this._acceptingTreeNodeBinding=_c2d;
this._acceptingPosition=_c2d.boxObject.getLocalPosition();
this._acceptingDimension=_c2d.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c2d);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c2e){
var map={};
var _c30=_c2e.getChildBindingsByLocalName("treenode");
var _c31,pos,dim,y;
y=TreeBinding.grid(_c2e.boxObject.getLocalPosition().y);
map[y]=true;
while(_c30.hasNext()){
_c31=_c30.getNext();
pos=_c31.boxObject.getLocalPosition();
dim=_c31.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c37 in this._acceptingPositions){
if(_c37==y){
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
TreeBinding.newInstance=function(_c38){
var _c39=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c38);
var _c3a=UserInterface.registerBinding(_c39,TreeBinding);
_c3a.treeBodyBinding=TreeBodyBinding.newInstance(_c38);
return _c3a;
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
TreeBodyBinding.prototype.accept=function(_c3b){
if(_c3b instanceof TreeNodeBinding){
this.logger.debug(_c3b);
}
};
TreeBodyBinding.prototype.handleAction=function(_c3c){
TreeBodyBinding.superclass.handleAction.call(this,_c3c);
switch(_c3c.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c3c.target);
_c3c.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c3d){
var a=this.boxObject.getDimension().h;
var y=_c3d.boxObject.getLocalPosition().y;
var h=_c3d.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c43=_c3d.labelBinding.bindingElement;
if(y-t<0){
_c43.scrollIntoView(true);
}else{
if(y-t+h>a){
_c43.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c44){
var _c45=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c44);
return UserInterface.registerBinding(_c45,TreeBodyBinding);
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
var _c46=TreeNodeBinding.superclass.serialize.call(this);
if(_c46){
_c46.label=this.getLabel();
_c46.image=this.getImage();
var _c47=this.getHandle();
if(_c47&&_c47!=this.key){
_c46.handle=_c47;
}
if(this.isOpen){
_c46.open=true;
}
if(this.isDisabled){
_c46.disabled=true;
}
if(this.dragType){
_c46.dragtype=this.dragType;
}
if(this.dragAccept){
_c46.dragaccept=this.dragAccept;
}
}
return _c46;
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
var _c49=UserInterface.getBinding(node);
if(_c49&&_c49.containingTreeBinding){
this.containingTreeBinding=_c49.containingTreeBinding;
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
var _c4a=this.key;
var _c4b=this.getProperty("handle");
if(_c4b){
_c4a=_c4b;
}
return _c4a;
};
TreeNodeBinding.prototype.setHandle=function(_c4c){
this.setProperty("handle",_c4c);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c4e=this.getProperty("label");
var _c4f=this.getProperty("tooltip");
var _c50=this.getProperty("oncommand");
var _c51=this.getProperty("onbindingfocus");
var _c52=this.getProperty("onbindingblur");
var _c53=this.getProperty("focused");
var _c54=this.getProperty("callbackid");
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
if(_c4e!=null){
this.setLabel(_c4e);
}
if(_c4f!=null){
this.setToolTip(_c4f);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c56=this.bindingWindow.WindowManager;
if(_c50!=null){
this.oncommand=function(){
Binding.evaluate(_c50,this);
};
}
if(_c51!=null){
this.onfocus=function(){
Binding.evaluate(_c51,this);
};
}
if(_c52!=null){
this.onblur=function(){
Binding.evaluate(_c52,this);
};
}
if(_c53==true){
this.focus();
}
if(_c54!=null){
Binding.dotnetify(this,_c54);
}
};
TreeNodeBinding.prototype.handleAction=function(_c57){
TreeNodeBinding.superclass.handleAction.call(this,_c57);
switch(_c57.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c57.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c58,_c59){
var _c5a=true;
if(_c58 instanceof TreeNodeBinding){
var _c5b=false;
var _c5c=this.bindingElement;
var _c5d=this.containingTreeBinding.bindingElement;
while(!_c5b&&_c5c!=_c5d){
if(_c5c==_c58.getBindingElement()){
_c5b=true;
}else{
_c5c=_c5c.parentNode;
}
}
if(_c5b){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c5a=false;
}else{
this.acceptTreeNodeBinding(_c58,_c59);
}
}else{
_c5a=false;
}
return _c5a;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c5e,_c5f){
var _c60=_c5e.serializeToString();
var _c61=new BindingParser(this.bindingDocument);
var _c62=_c61.parseFromString(_c60).getFirst();
_c5f=_c5f?_c5f:this.containingTreeBinding.getDropIndex();
var _c63=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c62,_c63.get(_c5f));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c5e.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c64=this.getProperty("image");
var _c65=this.getProperty("image-active");
var _c66=this.getProperty("image-disabled");
_c65=_c65?_c65:this.isContainer?_c64?_c64:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c64?_c64:TreeNodeBinding.DEFAULT_ITEM;
_c66=_c66?_c66:this.isContainer?_c64?_c64:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c64?_c64:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c64=_c64?_c64:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c64,imageHover:null,imageActive:_c65,imageDisabled:_c66});
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
TreeNodeBinding.prototype.setLabel=function(_c68){
this.setProperty("label",String(_c68));
if(this.isAttached){
this.labelBinding.setLabel(String(_c68));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c69){
this.setProperty("tooltip",String(_c69));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c69));
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
var _c6a=this.imageProfile.getDefaultImage();
var _c6b=this.imageProfile.getActiveImage();
_c6b=_c6b?_c6b:_c6a;
return this.isOpen?_c6b:_c6a;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c6d=DOMEvents.getTarget(e);
var _c6e=this.labelBinding.bindingElement;
var _c6f=this.labelBinding.shadowTree.labelBody;
var _c70=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c6d){
case _c6e:
this._onAction(e);
break;
case _c6f:
case _c70:
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
if(_c6d.parentNode==this.bindingElement&&_c6d.__updateType==Update.TYPE_INSERT){
var _c6e=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c6d)=="treenode"){
if(_c6d==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c6d,_c6e.nextSibling);
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
switch(_c6d){
case _c6e:
case _c6f:
case _c70:
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
var _c74=true;
if(e.type=="mousedown"){
var _c75=e.button==(e.target?0:1);
if(!_c75){
_c74=false;
}
}
if(_c74){
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
var _c77=false;
if(e!=null){
_c77=e.shiftKey;
}
this.dispatchAction(_c77?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c7a=this.getDescendantBindingsByLocalName("treenode");
_c7a.each(function(_c7b){
_c7b.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c7c){
var _c7d=_c7c.getAttribute("focused");
if(_c7d=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c7e){
var _c7f=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c7e);
return UserInterface.registerBinding(_c7f,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c80){
var _c81=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c80);
return UserInterface.registerBinding(_c81,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c82){
this.bindingElement.style.left=_c82.x+"px";
this.bindingElement.style.top=_c82.y+"px";
this._geometry.x=_c82.x;
this._geometry.y=_c82.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c83){
var _c84=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c83);
return UserInterface.registerBinding(_c84,TreePositionIndicatorBinding);
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
this.addFilter(function(_c86){
var _c87=UserInterface.getBinding(_c86);
var _c88=null;
var _c88=null;
if(!_c87 instanceof TreeNodeBinding){
_c88=NodeCrawler.SKIP_NODE;
}
return _c88;
});
this.addFilter(function(_c89,list){
var _c8b=UserInterface.getBinding(_c89);
var _c8c=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c8b.isOpen){
list.add(_c8b);
}
break;
}
return _c8c;
});
};
ShadowBinding.prototype=new MatrixBinding;
ShadowBinding.prototype.constructor=ShadowBinding;
ShadowBinding.superclass=MatrixBinding.prototype;
function ShadowBinding(){
this.logger=SystemLogger.getLogger("ShadowBinding");
this.targetBinding=null;
this.offset=4;
this.expand=14;
this.isVisible=true;
this.crawlerFilters=new List([DocumentCrawler.ID,FlexBoxCrawler.ID,FocusCrawler.ID]);
}
ShadowBinding.prototype.toString=function(){
return "[ShadowBinding]";
};
ShadowBinding.prototype.onBindingRegister=function(){
ShadowBinding.superclass.onBindingRegister.call(this);
this.hide();
};
ShadowBinding.prototype.shadow=function(_c8d){
this.targetBinding=_c8d;
_c8d.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c8d.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c8d.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c8d.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c8d.isVisible){
this.show();
this.setPosition(_c8d.getPosition());
this.setDimension(_c8d.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c8e){
ShadowBinding.superclass.handleAction.call(this,_c8e);
var _c8f=_c8e.target;
if(_c8f==this.targetBinding){
switch(_c8e.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c8e.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c8f.isVisible){
this.show();
this.setPosition(_c8f.getPosition());
this.setDimension(_c8f.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c90){
var _c91=this.offset-this.expand;
this.bindingElement.style.left=new String(_c90.x+_c91)+"px";
this.bindingElement.style.top=new String(_c90.y+_c91)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c93){
var _c94=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c93);
return UserInterface.registerBinding(_c94,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c95){
this.binding=_c95;
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
DockTabsButtonBinding.newInstance=function(_c96){
var _c97=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c96);
_c97.setAttribute("type","checkbox");
_c97.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c97.className="tabbutton";
return UserInterface.registerBinding(_c97,DockTabsButtonBinding);
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
var _c98=DockBinding.superclass.serialize.call(this);
if(_c98){
_c98.active=this.isActive?true:null;
_c98.collapsed=this.isCollapsed?true:null;
}
return _c98;
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
var _c99=UserInterface.getBinding(this.bindingElement.parentNode);
var _c9a=MatrixBinding.newInstance(this.bindingDocument);
_c9a.attachClassName("dockliner");
this.shadowTree.dockLiner=_c9a;
_c99.add(_c9a);
_c9a.attach();
_c9a.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c9c){
var _c9d=this.getSelectedTabPanelBinding();
if(_c9d){
_c9d.isVisible=_c9c;
_c9d.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c9e){
var _c9f=this._getBindingForDefinition(_c9e);
var _ca0=DockTabBinding.newInstance(this.bindingDocument);
_ca0.setHandle(_c9e.handle);
_ca0.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c9e.label);
_ca0.setImage(_c9e.image);
_ca0.setToolTip(_c9e.toolTip);
_ca0.setEntityToken(_c9e.entityToken);
_ca0.setAssociatedView(_c9f);
this.appendTabByBindings(_ca0,null);
this._setupPageBindingListeners(_ca0);
var _ca1=this.getTabPanelBinding(_ca0);
_c9f.snapToBinding(_ca1);
var _ca2=this.bindingWindow.bindingMap.views;
_ca2.add(_c9f);
if(!this.isActive){
this.activate();
}
_c9f.attach();
};
DockBinding.prototype.prepareOpenView=function(_ca3,_ca4){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_ca4.setLabel(_ca3.label);
_ca4.setImage(_ca3.image);
_ca4.setToolTip(_ca3.toolTip);
this._setupPageBindingListeners(_ca4);
var _ca5=this.getTabPanelBinding(_ca4);
var _ca6=this._getBindingForDefinition(_ca3);
_ca4.setAssociatedView(_ca6);
_ca6.snapToBinding(_ca5);
UserInterface.getBinding(this.bindingDocument.body).add(_ca6);
_ca6.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_ca7){
var _ca8=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_ca8.bindingDocument);
view.setDefinition(_ca7);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_caa){
var _cab=this.getTabPanelBinding(_caa);
var self=this;
var _cad={handleAction:function(_cae){
var _caf=_cae.target;
switch(_cae.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_caf.reflex(true);
var view=_caa.getAssociatedView();
if(_caf.bindingWindow==view.getContentWindow()){
_caa.updateDisplay(_caf);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_caa.onPageInitialize(_caf);
_cae.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_caa.updateDisplay(_caf);
_cae.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_caa.updateEntityToken(_caf);
_cae.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_caa.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_caa.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_caa);
_cae.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_caa,true);
_cae.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_caa);
break;
case Binding.ACTION_FORCE_REFLEX:
_cab.reflex(true);
_cae.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_caa.isDirty){
_caa.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cb1){
_cab.addActionListener(_cb1,_cad);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cb2){
DockBinding.superclass.handleAction.call(this,_cb2);
var _cb3=_cb2.target;
switch(_cb2.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cb2.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cb3 instanceof DockBinding){
if(_cb3.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cb3);
if(this.isActive){
_cb3.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cb3);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cb4,arg){
DockBinding.superclass.handleBroadcast.call(this,_cb4,arg);
switch(_cb4){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cb6=arg;
if(_cb6.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cb6.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cb7){
var tabs=this.getTabBindings();
var _cb9=false;
while(tabs.hasNext()&&!_cb9){
var tab=tabs.getNext();
var _cbb=tab.getEntityToken();
if(_cbb!=null&&_cbb==_cb7){
if(!tab.isSelected){
this.select(tab,true);
_cb9=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cbc){
this._handleCollapse(true,_cbc);
};
DockBinding.prototype.unCollapse=function(_cbd){
this._handleCollapse(false,_cbd);
};
DockBinding.prototype._handleCollapse=function(_cbe,_cbf){
var _cc0=this.getChildBindingByLocalName("dockpanels");
var _cc1=this.getAncestorBindingByLocalName("splitbox");
if(_cbe){
_cc0.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cbf&&_cc1.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cc0.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cbf){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cbe);
this.isCollapsed=_cbe;
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
DockBinding.prototype.closeTab=function(_cc6,_cc7){
if(_cc6.isDirty&&!_cc7){
var _cc8=Resolver.resolve(_cc6.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cc8),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cca){
switch(_cca){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cc6);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cc6);
break;
}
}});
}else{
this.removeTab(_cc6);
}
};
DockBinding.prototype.closeTabsExcept=function(_ccb){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_ccb){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cce){
var _ccf=_cce.getAssociatedView();
_ccf.saveContainedEditor();
var self=this;
var _cd1={handleBroadcast:function(_cd2,arg){
switch(_cd2){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_ccf.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cd1);
if(arg.isSuccess){
self.removeTab(_cce);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cd1);
};
DockBinding.prototype.appendTabByBindings=function(_cd4,_cd5){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cd4,_cd5);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cd6){
_cd6=_cd6?_cd6+"px":"100%";
this.bindingElement.style.width=_cd6;
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
DockBinding.prototype.showControls=function(_cd7){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cd7){
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
var _cda=DockControlBinding.newInstance(this.bindingDocument);
_cda.setControlType(type);
return _cda;
};
DockTabsBinding.prototype.flex=function(){
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
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cdd){
DockTabsBinding.superclass.handleCrawler.call(this,_cdd);
switch(_cdd.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cdf=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cdf)){
_cdf=_cdf>0?_cdf-1:0;
self.bindingElement.style.width=new String(_cdf)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_ce0){
var _ce1=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_ce0);
return UserInterface.registerBinding(_ce1,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_ce2){
this._viewBinding=_ce2;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _ce3=DockTabBinding.superclass.serialize.call(this);
if(_ce3){
_ce3.label=null;
_ce3.image=null;
_ce3.handle=this.getHandle();
}
return _ce3;
};
DockTabBinding.prototype.setHandle=function(_ce4){
this.setProperty("handle",_ce4);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_ce5){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_ce5;
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
var _ce6=DialogControlBinding.newInstance(this.bindingDocument);
_ce6.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_ce6);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_ce7){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_ce7){
this.isDirty=_ce7;
if(Binding.exists(this.labelBinding)){
var _ce8=this.labelBinding.getLabel();
if(_ce8!=null){
this.labelBinding.setLabel(_ce7?"*"+_ce8:_ce8.slice(1,_ce8.length));
}else{
this.labelBinding.setLabel(_ce7?"*":"");
}
}
}
var _ce9=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_ce9.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_ce9.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cea){
this.setLabel(_cea.getLabel());
this.setImage(_cea.getImage());
this.setToolTip(_cea.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_ceb){
this.setEntityToken(_ceb.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cec){
DockTabBinding.superclass.handleAction.call(this,_cec);
var _ced=_cec.target;
switch(_cec.type){
case ControlBinding.ACTION_COMMAND:
if(_ced.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cec.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_ced);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cee){
var cmd=_cee.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cf0){
if(!_cf0){
if(!this.getLabel()){
_cf0=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cf0=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_cf0);
};
DockTabBinding.prototype.setImage=function(_cf1){
if(!_cf1){
if(!this.getImage()){
_cf1=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cf1=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cf1);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cf4=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cf4;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cf4;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cf4;
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
var _cf6=this.bindingElement;
setTimeout(function(){
_cf6.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cf7,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cf7,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cf7){
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
DockTabBinding.prototype.select=function(_cfc){
DockTabBinding.superclass.select.call(this,_cfc);
this._updateBroadcasters();
if(_cfc!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cfd=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cfe=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cfe.enable();
if(this.isDirty){
_cfd.enable();
}else{
_cfd.disable();
}
}else{
_cfe.disable();
_cfd.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cff){
if(this._canUpdateTree||_cff){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d00=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d02=win.bindingMap.savebutton;
if(_d02!=null){
_d00=true;
}
}
}
return _d00;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d03){
var _d04=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d03);
return UserInterface.registerBinding(_d04,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d05){
var _d06=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d05);
return UserInterface.registerBinding(_d06,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d07){
DockPanelBinding.superclass.select.call(this,_d07);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d08){
DockPanelBinding.superclass.handleCrawler.call(this,_d08);
if(_d08.response==null){
if(_d08.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d08.id==FocusCrawler.ID){
_d08.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d09){
var _d0a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d09);
return UserInterface.registerBinding(_d0a,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d0b){
var _d0c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d0b);
return UserInterface.registerBinding(_d0c,DockControlBinding);
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
ViewBinding.getInstance=function(_d0d){
var _d0e=ViewBinding._instances.get(_d0d);
if(!_d0e){
var cry="ViewBinding.getInstance: No such instance: "+_d0d;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d0e;
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
var _d11=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d11){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d12=snap.boxObject.getGlobalPosition();
var _d13=snap.boxObject.getDimension();
if(!Point.isEqual(_d12,this._lastknownposition)){
this.setPosition(_d12);
this._lastknownposition=_d12;
}
if(!Dimension.isEqual(_d13,this._lastknowndimension)){
this.setDimension(_d13);
this._lastknowndimension=_d13;
var _d14=_d13.h-ViewBinding.VERTICAL_ADJUST;
_d14=_d14<0?0:_d14;
this.windowBinding.getBindingElement().style.height=new String(_d14)+"px";
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
var _d15=this._viewDefinition.flowHandle;
if(_d15!=null){
FlowControllerService.CancelFlow(_d15);
}
}
if(this._viewDefinition!=null){
var _d16=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d16);
this.logger.fine("ViewBinding closed: \""+_d16+"\"");
}
this.dispatchAction(ViewBinding.ACTION_CLOSED);
};
ViewBinding.prototype.setType=function(type){
this._type=type;
if(type==ViewBinding.TYPE_DIALOGVIEW){
this.windowBinding.isFlexible=true;
}else{
this.windowBinding.isFlexible=false;
}
};
ViewBinding.prototype.getType=function(){
return this._type;
};
ViewBinding.prototype.getHandle=function(){
var _d18=null;
if(this._viewDefinition!=null){
_d18=this._viewDefinition.handle;
}
return _d18;
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
ViewBinding.prototype.setDefinition=function(_d19){
this._viewDefinition=_d19;
if(_d19.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d1a){
ViewBinding.superclass.handleAction.call(this,_d1a);
var _d1b=_d1a.target;
switch(_d1a.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d1a.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d1b.isActivated){
_d1b.onActivate();
}
}
_d1a.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d1b==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d1a.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d1b==this._snapBinding){
if(_d1b.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d1b.getContentWindow().isPostBackDocument){
if(_d1a.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d1b.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d1b==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d1b.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d1a.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d1a.type==WindowBinding.ACTION_ONLOAD){
var win=_d1b.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d1b);
}
}
}
_d1a.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d1b.label&&this._viewDefinition.label){
_d1b.label=this._viewDefinition.label;
}
if(!_d1b.image&&this._viewDefinition.image){
_d1b.image=this._viewDefinition.image;
}
if(_d1b.bindingWindow==this.getContentWindow()){
this._pageBinding=_d1b;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d1b.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d1b==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d1a.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d1a.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d20,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d20,arg);
switch(_d20){
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
var _d24=def.argument;
if(_d24!=null){
page.setPageArgument(_d24);
}
var _d25=def.width;
if(_d25!=null){
page.width=_d25;
}
var _d26=def.height;
if(_d26!=null){
page.height=_d26;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d27){
ViewBinding.superclass.handleCrawler.call(this,_d27);
switch(_d27.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d27.id==FocusCrawler.ID){
if(_d27.previousNode!=this._snapBinding.bindingElement){
_d27.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d27.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d28){
_d28.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d28.x+"px";
this.bindingElement.style.top=_d28.y+"px";
};
ViewBinding.prototype.setDimension=function(_d29){
_d29.h-=ViewBinding.VERTICAL_ADJUST;
_d29.w-=ViewBinding.HORIZONTAL_ADJUST;
_d29.w-=1;
if(_d29.h<0){
_d29.h=0;
}
if(_d29.w<0){
_d29.w=0;
}
this.bindingElement.style.width=String(_d29.w)+"px";
this.bindingElement.style.height=String(_d29.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d2a){
this.isFlexBoxBehavior=false;
_d2a.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d2a.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_d2a.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d2a.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d2a;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d2b=null;
if(this.isFreeFloating==true){
_d2b=this._snapBinding.getBindingElement();
}else{
_d2b=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d2b;
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
ViewBinding.prototype.reload=function(_d2c){
this._isLoaded=false;
this.windowBinding.reload(_d2c);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d2d=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d2d=true;
}
}
if(!_d2d){
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
ViewBinding.newInstance=function(_d31){
var _d32=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d31);
var _d33=UserInterface.registerBinding(_d32,ViewBinding);
_d33.windowBinding=_d33.add(WindowBinding.newInstance(_d31));
_d33.windowBinding.isFlexible=false;
return _d33;
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
var _d3b=this.bindingWindow.__doPostBack;
var _d3c=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d3c){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d3d,_d3e){
if(!form.__isSetup){
Application.lock(self);
_d3c=true;
}
self.manifestAllDataBindings();
_d3b(_d3d,_d3e);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d3f,list){
var _d41=this.bindingWindow.bindingMap.__REQUEST;
if(_d41!=null&&this._isDotNet()){
switch(_d3f){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d41.postback(_d3f);
}
}
break;
default:
_d41.postback(_d3f);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d3f,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d42,list){
var _d44=this.getDescendantBindingsByType(WindowBinding);
_d44.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d42,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d48){
list.add({name:_d48.name,value:_d48.value});
});
var out="";
list.each(function(_d4a){
out+=_d4a.name+": "+_d4a.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d4b){
PageBinding.superclass.handleAction.call(this,_d4b);
var _d4c=_d4b.target;
switch(_d4b.type){
case RootBinding.ACTION_PHASE_3:
if(_d4c==UserInterface.getBinding(this.bindingDocument.body)){
_d4c.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d4c);
}
_d4b.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d4d=this.validateAllDataBindings();
if(_d4d){
this.doPostBack(_d4c);
}
}
_d4b.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d4b.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d4c.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d4c.key)){
this._initBlockers.del(_d4c.key);
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
var _d4f={handleAction:function(_d50){
if(_d50.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d4f);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d4f);
}else{
MessageQueue.udpdate();
}
_d4b.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d51,arg){
PageBinding.superclass.handleBroadcast.call(this,_d51,arg);
switch(_d51){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d53=arg;
if(!this._canPostBack&&!_d53){
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
PageBinding.prototype.doPostBack=function(_d55){
if(this._canPostBack){
if(_d55!=null&&this._isDotNet()){
var _d56=_d55.getCallBackID();
var _d57=_d55.getCallBackArg();
if(_d56!=null){
_d56=_d56.replace(/_/g,"$");
}else{
_d56="";
}
if(_d57==null){
_d57="";
}
this.bindingWindow.__doPostBack(_d56,_d57);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _d58=true;
var _d59=this.bindingWindow.DataManager.getAllDataBindings();
while(_d59.hasNext()&&_d58){
var _d5a=_d59.getNext();
if(_d5a.isAttached){
var _d5b=_d5a.validate();
if(_d58&&!_d5b){
_d58=false;
this.logger.debug("Invalid DataBinding: "+_d5a.toString()+" ("+_d5a.getName()+")");
break;
}
}
}
return _d58;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d5d=this.bindingWindow.DataManager.getAllDataBindings();
while(_d5d.hasNext()){
var _d5e=_d5d.getNext();
if(_d5e.isAttached){
var _d5f=_d5e.manifest();
if(_d5f!=null){
list.add(_d5f);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d60=this.bindingWindow.DataManager.getAllDataBindings();
while(_d60.hasNext()){
var _d61=_d60.getNext();
if(_d61.isAttached){
_d61.clean();
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
var _d63=this._cachedFocus.getBinding();
if(_d63){
_d63.blur();
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
var _d64=this.getProperty("width");
if(!_d64){
_d64=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d64;
}
if(this.height==null){
var _d65=this.getProperty("height");
this.height=_d65?_d65:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d66=this.getProperty("minheight");
if(_d66!=null){
this.minheight=_d66;
}
}
if(this.controls==null){
var _d67=this.getProperty("controls");
this.controls=_d67?_d67:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d68=this.getProperty("resizable");
this.isResizable=_d68?_d68:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d69){
if(_d69!=this.isAutoHeightLayoutMode){
if(_d69){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d69;
}
};
DialogPageBinding.prototype.handleAction=function(_d6a){
DialogPageBinding.superclass.handleAction.call(this,_d6a);
var _d6b=_d6a.target;
switch(_d6a.type){
case PageBinding.ACTION_ATTACHED:
if(_d6b!=this&&_d6b.isFitAsDialogSubPage){
_d6b.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d6a.consume();
if(_d6b.response!=null){
this.response=_d6b.response;
switch(_d6b.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d6c){
var _d6d=this.bindingWindow.bindingMap.buttonAccept;
if(_d6d!=null){
_d6d.setDisabled(_d6c);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d6e){
var _d6f=CSSComputer.getPadding(this.bindingElement);
var _d70=CSSComputer.getBorder(this.bindingElement);
_d6e+=_d6f.top+_d6f.bottom;
_d6e+=_d70.top+_d70.bottom;
if(_d6e>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d6e+"px";
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
EditorPageBinding.prototype.handleAction=function(_d78){
EditorPageBinding.superclass.handleAction.call(this,_d78);
var _d79=_d78.target;
switch(_d78.type){
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
var _d7a=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d79.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d7a==-1){
_d7a=0;
}
}else{
_d7a++;
}
return res;
});
if(_d7a>-1){
this._messengers.del(_d7a);
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
_d78.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d79.key,_d79);
if(_d79 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d79.key);
if(_d79 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d79==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d79.getSelectedTabBinding();
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
_d78.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d79==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d78.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d79==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d78.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d79==this._windowBinding){
if(_d79.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d7f=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d7f);
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
var _d80=this.bindingWindow.bindingMap.savebutton;
if(_d80!=null&&!_d80.isDisabled){
_d80.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d81=this.bindingWindow.bindingMap.__REQUEST;
if(_d81!=null){
_d81.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d82=this.bindingWindow.bindingMap.__REQUEST;
if(_d82!=null){
_d82.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._refresh=function(){
if(Application.isDeveloperMode){
}
this.postMessage(EditorPageBinding.MESSAGE_REFRESH);
};
EditorPageBinding.prototype.postMessage=function(_d83){
this._message=null;
switch(_d83){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d83,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d83;
}
break;
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d83,this._messengers);
if(!this._messengers.hasEntries()){
this._saveAndPublishEditorPage();
}else{
this._message=_d83;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d83;
EditorPageBinding.superclass.postMessage.call(this,_d83,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d83,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d84,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d84,arg);
switch(_d84){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d86=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d86);
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
var _d87=new List();
this._invalidBindings.each(function(key,_d89){
var list=_d89.getInvalidLabels();
if(list){
list.each(function(_d8b){
_d87.add(_d8b);
});
}
});
if(_d87.hasEntries()){
var _d8c="";
while(_d87.hasNext()){
_d8c+=_d87.getNext().toLowerCase();
if(_d87.hasNext()){
_d8c+=", ";
}else{
_d8c+=".";
}
}
var _d8d=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d8d+" "+_d8c);
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
EditorPageBinding.prototype.enableSave=function(_d8e){
var _d8f=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d8f){
var _d90=UserInterface.getBinding(_d8f);
if(_d8e){
_d90.enable();
}else{
_d90.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d91=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d91!=null){
UserInterface.getBinding(_d91).enable();
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
var _d92=this._windowBinding.getContentDocument().title;
if(_d92==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d93=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d95){
if(_d95.name=="__EVENTTARGET"&&_d93){
_d95.value=_d93;
}
list.add({name:_d95.name,value:_d95.value});
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
WizardPageBinding.prototype.handleAction=function(_d97){
WizardPageBinding.superclass.handleAction.call(this,_d97);
var _d98=_d97.target;
switch(_d97.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d98);
}else{
_d97.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d98);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d97.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d97.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d99){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d9b=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d99);
}
if(_d9b){
_d9b.setDisabled(!_d99);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d9c,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d9c,arg);
var self=this;
switch(_d9c){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_da0){
};
MarkupAwarePageBinding.prototype._activate=function(_da1){
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
var _da2=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_da2.boxObject.getDimension().w;
_da2.hide();
var _da3=this.boxObject.getDimension().h;
this.bindingElement.style.height=_da3+"px";
var self=this;
var _da5=this.bindingWindow.bindingMap.moreactionsbutton;
_da5.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_da6){
self._showMoreActions();
_da6.consume();
}});
var _da7=this.bindingWindow.bindingMap.moreactionspopup;
_da7.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_da8){
var item=_da8.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_daa,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_daa,arg);
switch(_daa){
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
var _dae=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dae!=null){
_dae.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _daf=this.bindingWindow.WindowManager;
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
var _db0=new String("");
this._actionProfile.each(function(_db1,list){
list.each(function(_db3){
_db0+=_db3.getHandle()+";"+_db3.getKey()+";";
if(_db3.isDisabled()){
_db0+="isDisabled='true';";
}
});
});
return _db0;
};
SystemToolBarBinding.prototype.handleAction=function(_db4){
SystemToolBarBinding.superclass.handleAction.call(this,_db4);
switch(_db4.type){
case ButtonBinding.ACTION_COMMAND:
var _db5=_db4.target;
this._handleSystemAction(_db5.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_db6){
if(_db6!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _db8=list.getFirst();
var _db9=_db8.node;
}
SystemAction.invoke(_db6,_db9);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dbc,list){
var _dbe=new List();
list.reset();
while(list.hasNext()){
var _dbf=list.getNext();
var _dc0=null;
if(_dbf.isInToolBar()){
if(_dbf.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dc0=self.getToolBarButtonBinding(_dbf);
}
}
if(_dc0!=null){
_dbe.add(_dc0);
}
}
if(_dbe.hasEntries()){
var _dc1=ToolBarGroupBinding.newInstance(doc);
_dbe.each(function(_dc2){
_dc1.add(_dc2);
});
self.addLeft(_dc1);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dc3=this.bindingWindow.bindingMap.toolsbutton;
var _dc4=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dc5=_dc3.bindingElement.offsetLeft-this._moreActionsWidth;
var _dc6=0;
var _dc7=new List();
var _dc8,_dc9=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dc8=_dc9.getNext())!=null){
if(!_dc8.isVisible){
_dc8.show();
}
_dc6+=_dc8.boxObject.getDimension().w;
if(_dc6>=_dc5){
_dc7.add(_dc8);
_dc8.hide();
}
}
if(_dc7.hasEntries()){
var _dca=_dc7.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dca).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dc8=_dc7.getNext())!=null){
this._moreActions.add(_dc8.associatedSystemAction);
}
_dc4.show();
}else{
this._moreActions=null;
_dc4.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dcb=this.bindingWindow.bindingMap.moreactionspopup;
_dcb.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dcb.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dcb.add(item);
}
_dcb.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dcd){
var _dce=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dcf=_dcd.getLabel();
var _dd0=_dcd.getToolTip();
var _dd1=_dcd.getImage();
var _dd2=_dcd.isDisabled();
if(_dd1&&_dd1.indexOf("size=")==-1){
_dd1=_dd1+"&size="+this.getImageSize();
_dce.imageProfile=new ImageProfile({image:_dd1});
}
if(_dcf){
_dce.setLabel(_dcf);
}
if(_dd0){
_dce.setToolTip(_dd0);
}
if(_dcd.isDisabled()){
_dce.disable();
}
_dce.associatedSystemAction=_dcd;
return _dce;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dd3=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dd3!=null){
_dd3.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dd4){
var _dd5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dd4);
return UserInterface.registerBinding(_dd5,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dd6){
var _dd7=SystemTreeBinding.superclass.add.call(this,_dd6);
if(!this._defaultTreeNode){
if(_dd6 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dd6;
}
}
return _dd7;
};
SystemTreeBinding.prototype.handleAction=function(_dd8){
SystemTreeBinding.superclass.handleAction.call(this,_dd8);
var _dd9=_dd8.target;
switch(_dd8.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_dd9.key);
this._updateFocusedNode();
_dd8.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dd8.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_dd9.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dd8.consume();
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
var _ddb=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_ddb);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_ddc){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_ddc);
var reg=this._entityTokenRegistry;
var _dde=_ddc.node.getEntityToken();
if(reg.has(_dde)){
reg.get(_dde).add(_ddc);
}else{
reg.set(_dde,new List([_ddc]));
}
var _ddf=null;
if(this.isLockedToEditor){
if(_dde==StageBinding.entityToken){
if(_ddc.node.isTreeLockEnabled()){
_ddf=_ddc;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_ddc.node.getHandle()){
_ddf=_ddc;
}
}
}
if(_ddf!=null){
this.focusSingleTreeNodeBinding(_ddf);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_de0){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_de0);
var reg=this._entityTokenRegistry;
var _de2=_de0.node.getEntityToken();
if(reg.has(_de2)){
var list=reg.get(_de2);
list.del(_de0);
if(!list.hasEntries()){
reg.del(_de2);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_de0.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_de0.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _de6=this._refreshingTreeNodes;
if(_de6.hasEntries()&&_de6.has(key)){
_de6.del(key);
if(!_de6.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _de7=StageBinding.entityToken;
if(_de7!=null){
this._focusTreeNodeByEntityToken(_de7);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _de8=false;
var _de9=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_de8=false;
}else{
if(_de9.hasEntries()){
_de8=true;
while(_de8&&_de9.hasNext()){
var _dea=_de9.getNext();
if(!_dea.isDraggable){
_de8=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_de8;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_deb,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_deb,arg);
switch(_deb){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_deb,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_deb);
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
var self=this,_def=arg;
setTimeout(function(){
if(_def!=null){
self._focusTreeNodeByEntityToken(_def);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _df1=tab.perspectiveNode==null;
if(!_df1){
_df1=tab.perspectiveNode==this.perspectiveNode;
}
if(_df1){
var self=this,_df3=tab.getEntityToken();
setTimeout(function(){
if(_df3==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_df3);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_df4,_df5){
this.isLockFeatureFocus=true;
var _df6=null;
if(this._entityTokenRegistry.has(_df4)){
var list=this._entityTokenRegistry.get(_df4);
list.each(function(tn){
var _df9=true;
if(tn.node.isTreeLockEnabled()){
_df6=tn;
_df9=false;
}
return _df9;
});
if(_df6!=null){
if(!_df6.isFocused){
this.focusSingleTreeNodeBinding(_df6,true);
}else{
_df6.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_df6==null&&_df5!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_df4);
self._focusTreeNodeByEntityToken(_df4,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_dfb){
var _dfc=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _dfd=this.getRootTreeNodeBindings();
while(_dfd.hasNext()){
var _dfe=_dfd.getNext();
_dfc.add(_dfe.node.getEntityToken());
}
}else{
_dfc.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_dfc.hasNext()){
var _dff=_dfc.getNext();
var _e00=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_dff,_dfb,_e00);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e03=this._treeNodeBindings;
var _e04=new Map();
function fix(_e05,list){
if(!_e05.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e03.has(node.getHandle())){
var _e08=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e04.set(node.getHandle(),_e08);
_e05.add(_e08);
}
});
_e05.attachRecursive();
}
}
_e05.open(true);
}
map.each(function(_e09,list){
if(_e03.has(_e09)){
var _e0b=_e03.get(_e09);
fix(_e0b,list);
}else{
if(_e04.has(_e09)){
var _e0c=_e04.get(_e09);
fix(_e0c,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e0d,arg){
switch(_e0d){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e0f=arg;
if(_e0f!=null){
this._invokeServerRefresh(_e0f);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e10=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e10;
_e10.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e10=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e10;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e11){
if(_e11!=null&&_e11=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e11)){
var list=this._entityTokenRegistry.get(_e11).reset();
this._refreshToken=_e11;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e13=list.getNext();
this._refreshingTreeNodes.set(_e13.key,true);
setTimeout(function(){
_e13.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e14=this.getFocusedTreeNodeBindings().getFirst();
if(_e14){
var _e15=_e14.getLabel();
var _e16=_e14.getAncestorBindingByLocalName("treenode");
if(_e16){
_e14=_e16;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e14.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e17=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e17,[_e15]);
}
_e14.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e18=SystemTreeBinding.clipboard;
if(_e18){
var type=_e18.dragType;
var _e1a=this.getFocusedTreeNodeBindings().getFirst();
if(_e1a.dragAccept){
if(_e1a.acceptor.isAccepting(type)){
this._performPaste(_e1a);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e1b){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e1b.node.hasDetailedDropSupport()){
if(_e1b.node.hasChildren()){
var _e1d=_e1b.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e1e,_e1f){
if(_e1e==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e20=_e1f.get("switch");
var _e21=_e1f.get("sibling");
if(_e20=="after"){
_e21++;
}
var _e22=_e1b.accept(SystemTreeBinding.clipboard,_e21);
if(_e22){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e1d);
}else{
Application.lock(self);
var _e23=_e1b.accept(SystemTreeBinding.clipboard,0);
if(_e23){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e23=_e1b.accept(SystemTreeBinding.clipboard,0);
if(_e23){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
};
SystemTreeBinding.prototype.collapse=function(_e24){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e24){
this.blurSelectedTreeNodes();
var _e25=this.getRootTreeNodeBindings();
_e25.each(function(_e26){
if(_e26.isContainer&&_e26.isOpen){
_e26.close();
_e26.hasBeenOpened=false;
_e26.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e27){
if(_e27!=this.isLockedToEditor){
this.isLockedToEditor=_e27;
if(_e27){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e29=this.getRootTreeNodeBindings();
_e29.each(function(_e2a){
var _e2b=_e2a.getOpenSystemNodes();
if(_e2b!=null&&_e2b.hasEntries()){
list.merge(_e2b);
}else{
if(_e2a.isOpen){
list.add(_e2a.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e2c){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e2c);
if(_e2c!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e2e=new Map();
var _e2f=this.getFocusedTreeNodeBindings();
var _e30=_e2f.getFirst().node.getActionProfile();
var self=this;
_e30.each(function(_e32,list){
var _e34=new List();
list.each(function(_e35){
if(_e35.getActivePositions()&self._activePosition){
_e34.add(_e35);
}
});
if(_e34.hasEntries()){
_e2e.set(_e32,_e34);
}
});
_e2e.activePosition=this._activePosition;
return _e2e;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e36,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e36,arg);
switch(_e36){
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
var _e3b=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e3b.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e3c=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e3c.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e3d){
SystemTreePopupBinding.superclass.handleAction.call(this,_e3d);
switch(_e3d.type){
case MenuItemBinding.ACTION_COMMAND:
var _e3e=_e3d.target;
var _e3f=_e3e.associatedSystemAction;
if(_e3f){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e41=list.getFirst();
var _e42=_e41.node;
}
SystemAction.invoke(_e3f,_e42);
}else{
var cmd=_e3e.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e45=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e45=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e45=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e45=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e45=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e45){
setTimeout(function(){
EventBroadcaster.broadcast(_e45);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e46=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e46.hasNext()){
var _e47=UserInterface.getBinding(_e46.getNext());
if(!_e47.getProperty("rel")){
_e47.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e49=new List();
var self=this;
this._actionProfile.each(function(_e4b,list){
var _e4d=MenuGroupBinding.newInstance(doc);
list.each(function(_e4e){
var _e4f=self.getMenuItemBinding(_e4e);
_e4d.add(_e4f);
});
_e49.add(_e4d);
});
_e49.reverse();
while(_e49.hasNext()){
this._bodyBinding.addFirst(_e49.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e50){
var _e51=MenuItemBinding.newInstance(this.bindingDocument);
var _e52=_e50.getLabel();
var _e53=_e50.getToolTip();
var _e54=_e50.getImage();
var _e55=_e50.getDisabledImage();
var _e56=_e50.isCheckBox();
if(_e52){
_e51.setLabel(_e52);
}
if(_e53){
_e51.setToolTip(_e53);
}
if(_e54){
_e51.imageProfile=new ImageProfile({image:_e54,imageDisabled:_e55});
}
if(_e56){
_e51.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e50.isChecked()){
_e51.check(true);
}
}
if(_e50.isDisabled()){
_e51.disable();
}
_e51.associatedSystemAction=_e50;
return _e51;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e5a=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e5a=UserInterface.getBinding(node);
if(_e5a.isDisabled){
_e5a=null;
}
}
break;
}
if(_e5a!=null&&_e5a.node!=null&&_e5a.node.getActionProfile()!=null){
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
var _e5b=this.node.getLabel();
if(_e5b){
this.setLabel(_e5b);
}
var _e5c=this.node.getToolTip();
if(_e5c){
this.setToolTip(_e5c);
}
var _e5d=this.node.getHandle();
if(_e5d){
this.setHandle(_e5d);
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
var _e60="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e60+=list.getNext();
if(list.hasNext()){
_e60+=" ";
}
}
this.setProperty("dragaccept",_e60);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e62){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e62);
switch(_e62.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e62.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e62.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e63,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e63,arg);
switch(_e63){
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
var _e66=null;
var _e67=this.node.getImageProfile();
if(_e67){
if(this.isOpen){
_e66=_e67.getActiveImage();
}else{
_e66=_e67.getDefaultImage();
}
}
if(!_e66){
_e66=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e66;
};
SystemTreeNodeBinding.prototype.open=function(_e68){
var _e69=this.isContainer&&!this.isOpen;
var _e6a=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e69&&(_e6a||SystemTreeBinding.HAS_NO_MEMORY)&&_e68!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e6b=null;
if(this.isContainer){
_e6b=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e6b);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e6d){
if(_e6d!=null){
this._refreshBranch(_e6d);
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
var _e6e=new List();
var _e6f=this.node.getChildren();
this.empty();
if(_e6f.hasEntries()){
this._insertTreeNodesRegulated(_e6f);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e70){
var _e71=0;
var _e72=new List([]);
while(_e70.hasEntries()&&_e71<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e73=SystemTreeNodeBinding.newInstance(_e70.extractFirst(),this.bindingDocument);
_e73.autoExpand=this.autoExpand;
this.add(_e73);
_e73.attach();
_e71++;
if(this.autoExpand){
if(_e71==1&&!_e70.hasEntries()||LastOpenedSystemNodes.isOpen(_e73)){
_e72.add(_e73);
}
}
}
if(_e70.hasEntries()){
this._insertBufferTreeNode(_e70);
}
_e72.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e76){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e78=this.node.getDescendantBranch(list);
if(_e78.hasEntries()){
this.XXX(_e78);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e79){
var self=this;
var map=new Map();
this.empty();
_e79.each(function(key,_e7d){
if(_e7d.hasEntries()){
_e7d.each(function(node){
var _e7f=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e7f);
if(map.has(key)){
var _e80=map.get(key);
_e80.add(_e7f);
_e80.isOpen=true;
_e80.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e7f);
}else{
}
}
});
}
});
this.attachRecursive();
_e79.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e81=new TreeCrawler();
var _e82=new List();
_e81.mode=TreeCrawler.MODE_GETOPEN;
_e81.crawl(this.bindingElement,_e82);
if(_e82.hasEntries()){
_e82.extractFirst();
}
_e81.dispose();
return _e82;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e83=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e83=new List([this.node]);
list.each(function(_e85){
_e83.add(_e85.node);
});
}
return _e83;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e86,_e87){
var _e88=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e86 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e86.node.getData(),this.node.getData(),_e87?_e87:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e88);
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
SystemTreeNodeBinding.newInstance=function(node,_e8c){
var _e8d=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e8c);
var _e8e=UserInterface.registerBinding(_e8d,SystemTreeNodeBinding);
_e8e.node=node;
return _e8e;
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
SystemPageBinding.prototype.setPageArgument=function(_e8f){
this.node=_e8f;
SystemPageBinding.superclass.setPageArgument.call(this,_e8f);
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
var _e90=this.node.getChildren();
if(_e90.hasEntries()){
while(_e90.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e90.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e92=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e92.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e94=new TreeCrawler();
var _e95=new List();
_e94.mode=TreeCrawler.MODE_GETOPEN;
_e94.crawl(this.bindingElement,_e95);
_e94.dispose();
var list=new List([this.node]);
_e95.each(function(_e97){
list.add(_e97.node);
});
this._tree.empty();
var _e98=this.node.getDescendantBranch(list);
if(_e98.hasEntries()){
var self=this;
var map=new Map();
_e98.each(function(key,_e9c){
_e9c.each(function(node){
var _e9e=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e9e);
if(map.has(key)){
var _e9f=map.get(key);
_e9f.add(_e9e);
_e9f.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e9e);
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
SystemPageBinding.prototype.handleAction=function(_ea0){
SystemPageBinding.superclass.handleAction.call(this,_ea0);
switch(_ea0.type){
case ButtonBinding.ACTION_COMMAND:
var _ea1=_ea0.target;
switch(_ea1.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ea1.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ea2,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ea2,arg);
switch(_ea2){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ea4=arg;
if(this.node&&this.node.getEntityToken()==_ea4){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ea4);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ea4);
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
StageContainerBinding.prototype.handleBroadcast=function(_ea6,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ea6,arg);
var _ea8=this.bindingWindow.WindowManager;
switch(_ea6){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ea8.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ea8.WINDOW_RESIZED_BROADCAST:
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
var _eaa=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eaa.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_eab){
if(StageBinding.isViewOpen(_eab)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_eab);
}else{
var _eac=ViewDefinitions[_eab];
StageBinding.presentViewDefinition(_eac);
}
};
StageBinding.isViewOpen=function(_ead){
return StageBinding.bindingInstance._activeViewDefinitions[_ead]!=null;
};
StageBinding.presentViewDefinition=function(_eae){
if(_eae.label!=null){
var _eaf=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_eaf,[_eae.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_eae);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_eb1,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _eb3=System.getPerspectiveNodes();
if(_eb3.hasEntries()){
this._initializeSystemViewDefinitions(_eb3);
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
var _eb5=null;
if(LocalStore.isEnabled){
_eb5=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_eb5&&ViewDefinitions[_eb5]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_eb5));
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
var _eb7=root.getActionProfile();
if(_eb7&&_eb7.hasEntries()){
var _eb8=top.app.bindingMap.toolsmenugroup;
if(_eb8){
_eb7.each(function(_eb9,list){
list.each(function(_ebb){
var item=MenuItemBinding.newInstance(_eb8.bindingDocument);
item.setLabel(_ebb.getLabel());
item.setToolTip(_ebb.getToolTip());
item.setImage(_ebb.getImage());
item.setDisabled(_ebb.isDisabled());
item.associatedSystemAction=_ebb;
var _ebd=_eb8;
var tag=_ebb.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ebd=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ebd.add(item);
});
});
_eb8.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ebf){
while(_ebf.hasNext()){
var node=_ebf.getNext();
var _ec1=node.getHandle();
ViewDefinitions[_ec1]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ec2){
StageBinding.superclass.handleAction.call(this,_ec2);
var _ec3=_ec2.target;
switch(_ec2.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ec3;
this._inflateBinding(_ec3);
_ec2.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ec3;
this._inflateBinding(_ec3);
_ec2.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ec3);
_ec2.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ec3 instanceof DockBinding){
switch(_ec3.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ec3.reference,_ec3);
break;
}
this.handleAttachedDock(_ec3);
_ec2.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ec3 instanceof DockBinding){
this.handleSelectedDockTab(_ec3.getSelectedTabBinding());
_ec2.consume();
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
_ec2.consume();
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
_ec2.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ec2);
};
StageBinding.prototype.handleBroadcast=function(_ec5,arg){
StageBinding.superclass.handleBroadcast.call(this,_ec5,arg);
switch(_ec5){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ec7=arg;
this._dontView(_ec7);
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
StageBinding.prototype._showStart=function(_ec9){
if(_ec9!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ecc=this.bindingWindow.bindingMap.maindecks;
if(_ec9){
_ecc.select("startdeck");
view.show();
}else{
view.hide();
_ecc.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ec9;
}
};
StageBinding.prototype._inflateBinding=function(_ecd){
for(var _ece in ViewDefinitions){
var _ecf=ViewDefinitions[_ece];
if(_ecf instanceof SystemViewDefinition){
_ecd.mountDefinition(_ecf);
}
}
var _ed0=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ed0){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ed3=new StageCrawler();
_ed3.mode=mode;
_ed3.crawl(this.bindingElement);
_ed3.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ed4){
var _ed5=_ed4.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ed5);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ed5));
}
};
StageBinding.prototype.handleAttachedDock=function(_ed6){
var _ed7=_ed6.getTabBindings();
if(_ed7.hasEntries()){
while(_ed7.hasNext()){
var _ed8=_ed7.getNext();
var _ed9=_ed8.getHandle();
if(_ed9){
if(_ed9=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _eda=ViewDefinitions[_ed9];
if(_eda){
this._view(_ed6,_ed8,_eda,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ed9+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_edb){
var _edc=null;
var _edd=false;
switch(_edb.position){
case Dialog.MODAL:
_edc=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_edc=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_edb.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_edc=this._dockBindings.get(_edb.position);
break;
case DockBinding.EXTERNAL:
window.open(_edb.url);
_edd=true;
break;
default:
var _ede=this._decksBinding.getSelectedDeckBinding();
_edc=_ede.getDockBindingByReference(_edb.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _edf=this.bindingWindow.bindingMap.maindecks;
_edf.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_edd=true;
}
break;
}
if(!_edd){
if(_edc!=null){
this._view(_edc,null,_edb,true);
}else{
throw "StageBinding: Could not position view: "+_edb.handle;
}
}
};
StageBinding.prototype._view=function(_ee0,_ee1,_ee2,_ee3){
var _ee4=_ee2.handle;
if(_ee2.isMutable){
_ee4+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ee4]){
var _ee5=ViewBinding.getInstance(_ee4);
if(_ee5!=null){
_ee5.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ee4);
}
}else{
this._activeViewDefinitions[_ee4]=_ee2;
Application.lock(this);
switch(_ee0.constructor){
case DockBinding:
if(_ee3){
_ee0.prepareNewView(_ee2);
}else{
_ee0.prepareOpenView(_ee2,_ee1);
}
break;
case StageDialogBinding:
if(_ee3){
_ee0.prepareNewView(_ee2);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ee6){
if(this._activeViewDefinitions[_ee6]!=null){
delete this._activeViewDefinitions[_ee6];
}else{
this.logger.debug("Could not unregister active view: "+_ee6);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ee7){
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
this.addFilter(function(_ee9){
var _eea=UserInterface.getBinding(_ee9);
var _eeb=null;
if(_eea){
switch(_eea.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_eea.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_eea.handleUnMaximization();
break;
}
break;
case DockBinding:
_eeb=NodeCrawler.SKIP_NODE;
break;
}
}
return _eeb;
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
var _eec=null;
this._dialogs.each(function(_eed){
if(!_eed.isVisible){
_eec=_eed;
}
return _eec!=null;
});
if(!_eec){
this._newInstance();
_eec=this._dialogs.getLast();
}
_eec.setModal(false);
return _eec;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _eee=this.getInstance();
_eee.setModal(true);
return _eee;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _eef=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_eef);
_eef.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ef0){
if(_ef0 instanceof DialogViewDefinition){
var _ef1=ViewBinding.newInstance(this.bindingDocument);
_ef1.setDefinition(_ef0);
_ef1.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ef0.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ef0.handler)){
this._dialogResponseHandler=_ef0.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ef1;
this._body.add(_ef1);
_ef1.attach();
_ef1.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ef2){
StageDialogBinding.superclass.handleAction.call(this,_ef2);
var _ef3=_ef2.target;
switch(_ef2.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ef3);
_ef2.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ef3.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ef2.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ef3.response){
this._handleDialogPageResponse(_ef3);
}
_ef2.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ef2.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ef2.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ef3.dispose();
_ef2.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ef2.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ef2.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ef2.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ef2.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ef2.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ef3==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ef4,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ef4,arg);
switch(_ef4){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_ef6){
var _ef7=new FitnessCrawler();
var list=new List();
if(_ef6){
_ef7.mode=FitnessCrawler.MODE_BRUTAL;
}
_ef7.crawl(this.bindingElement,list);
_ef7.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_ef9){
_ef9.fit(_ef6);
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
var _efa=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_efa){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_efc){
var cmd=_efc.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_efe){
if(_efe.bindingDocument==this._viewBinding.getContentDocument()){
if(_efe instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_efe);
}
this._pageBinding=_efe;
if(_efe.height=="auto"){
_efe.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_efe);
_efe.enableAutoHeightLayoutMode(false);
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
if(_efe.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_efe);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_eff){
var _f00=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f00){
var _f01=UserInterface.getBinding(_f00);
_f01.setDisabled(_eff);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f02){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f02.response,_f02.result!=null?_f02.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_f03){
if(_f03.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f03);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f05){
switch(_f05.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f05.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f05.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f06){
var _f07=_f06.label;
var _f08=_f06.image;
var _f09=_f06.width;
var _f0a=_f06.height;
var _f0b=_f06.controls;
var _f0c=_f06.isResizable;
if(_f07){
this.setLabel(_f07);
}
if(_f08){
this.setImage(_f08);
}
if(_f09||_f0a){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f09?_f09:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f0a!=null&&_f0a!="auto")?_f0a:old.h;
this.setDimension(nev);
}
if(_f0b){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f10=new List(_f0b.split(" "));
while((type=_f10.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f0c!=this._isResizable){
this.setResizable(_f0c);
}
if(_f0a=="auto"){
this._fixAutoHeight(_f06);
}
if(_f06==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f11){
var dim=this.getDimension();
var _f13=0;
var _f14=0;
if(_f11.isDialogSubPage){
_f11=this._pageBinding;
}
if(this._isFirstPage){
_f13=_f11.width!=null?_f11.width:dim.w;
}else{
_f13=dim.w;
}
_f14=_f11.bindingElement.offsetHeight;
_f14+=this._titlebar.bindingElement.offsetHeight;
_f14+=4;
if(_f14<dim.h){
_f14=dim.h;
}
if(_f11.minheight!=null){
if(_f14<_f11.minheight){
_f14=_f11.minheight;
}
}
this.setDimension(new Dimension(_f13,_f14));
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
StageDialogBinding.newInstance=function(_f17){
var _f18=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f17);
var _f19=UserInterface.registerBinding(_f18,StageDialogBinding);
_f19.setProperty("controls","minimize maximize close");
return _f19;
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
this.addFilter(function(_f1a,list){
var _f1c=null;
var _f1d=UserInterface.getBinding(_f1a);
if(!_f1d.isVisible){
_f1c=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f1c;
});
this.addFilter(function(_f1e,list){
var _f20=null;
var _f21=UserInterface.getBinding(_f1e);
if(_f21.isAttached){
if(Interfaces.isImplemented(IFit,_f21)){
if(!_f21.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f21);
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
StageDecksBinding.prototype.mountDefinition=function(_f22){
var _f23=StageDeckBinding.newInstance(this.bindingDocument);
_f23.handle=_f22.handle;
_f23.perspectiveNode=_f22.node;
this._decks[_f23.handle]=_f23;
this.add(_f23);
_f23.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f24){
var _f25=this._decks[_f24];
StageBinding.perspectiveNode=_f25.perspectiveNode;
this.select(_f25);
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
StageDeckBinding.prototype.handleAction=function(_f26){
StageDeckBinding.superclass.handleAction.call(this,_f26);
var _f27=_f26.target;
switch(_f26.type){
case WindowBinding.ACTION_LOADED:
if(_f27==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f26.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f27 instanceof DockBinding){
this._dockBindings.set(_f27.reference,_f27);
_f27.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f26.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f26.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f26);
StageDeckBinding.superclass.handleAction.call(this,_f26);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f29=new StageCrawler();
_f29.mode=mode;
_f29.crawl(this.windowBinding.getContentDocument().body);
_f29.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f2a){
return this._dockBindings.get(_f2a);
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
StageDeckBinding.newInstance=function(_f2c){
var _f2d=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f2c);
var _f2e=UserInterface.registerBinding(_f2d,StageDeckBinding);
return _f2e;
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
StageSplitBoxBinding.prototype.handleAction=function(_f2f){
StageSplitBoxBinding.superclass.handleAction.call(this,_f2f);
StageBoxAbstraction.handleAction.call(this,_f2f);
var _f30=_f2f.target;
var _f31=null;
var _f32=null;
switch(_f2f.type){
case DockBinding.ACTION_EMPTIED:
_f32=this.getChildBindingByLocalName("splitter");
if(_f32.isVisible){
_f32.hide();
}
_f31=this.getDescendantBindingsByLocalName("dock");
if(_f31.getFirst().isEmpty&&_f31.getLast().isEmpty){
if(_f31.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f2f.consume();
break;
case DockBinding.ACTION_OPENED:
_f31=this.getDescendantBindingsByLocalName("dock");
if(!_f31.getFirst().isEmpty&&!_f31.getLast().isEmpty){
_f32=this.getChildBindingByLocalName("splitter");
if(!_f32.isVisible){
_f32.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f2f.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f30!=this){
_f32=this.getChildBindingByLocalName("splitter");
if(_f32.isVisible){
_f32.hide();
}
this.invokeLayout();
_f2f.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f30!=this){
var _f33=this.getChildBindingsByLocalName("splitpanel");
if(_f33.getFirst().isVisible&&_f33.getLast().isVisible){
_f32=this.getChildBindingByLocalName("splitter");
if(!_f32.isVisible){
_f32.show();
}
}
this.invokeLayout();
_f2f.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f34){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f34);
switch(_f34.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f34.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f35=this.getChildBindingsByLocalName("splitpanel");
return _f35.getFirst().isVisible&&_f35.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f36=this.getChildBindingsByLocalName("splitpanel");
return _f36.getFirst().isFixed&&_f36.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f37){
StageSplitPanelBinding.superclass.handleAction.call(this,_f37);
StageBoxAbstraction.handleAction.call(this,_f37);
switch(_f37.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f37.type==StageSplitBoxBinding.ACTION_HIDE){
_f37.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f37.type==DockBinding.ACTION_EMPTIED){
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
if(_f37.type==StageSplitBoxBinding.ACTION_SHOW){
_f37.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f3a=_f37.target;
if(_f3a!=this&&_f3a.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f3b=_f3a._containingSplitBoxBinding;
if(_f3b.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f3c=_f3b.getChildBindingsByLocalName("splitpanel");
var _f3d=_f3c.getFirst();
var _f3e=_f3c.getLast();
if(this.isFixed==true){
if(!_f3d.isFixed||!_f3e.isFixed||(!_f3b.hasBothPanelsVisible()&&_f3a.isMinimizedForReal)){
this.setFix(false);
_f37.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f3b.hasBothPanelsFixed()||(!_f3b.hasBothPanelsVisible()&&_f3a.isMinimizedForReal)){
this.setFix(_f3a.getContainedDock().getHeight());
_f37.consume();
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
var _f3f=this.getContainedDock();
if(_f3f){
if(this.isMaximizePrepared==true){
}else{
_f3f.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f40=this.getContainedDock();
if(_f40){
if(_f40.type==DockBinding.TYPE_EDITORS){
if(_f40.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f40.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f41=this.getContainedDock();
if(_f41){
_f41.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f41);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f42=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f43=this.getContainedDock();
if(_f43){
_f43.collapse(_f42);
if(!_f42){
this.setFix(_f43.getHeight());
}else{
this.setFix(_f43.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f43&&_f43.isActive){
_f43.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f43);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f44){
var _f45=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f46=this.getContainedDock();
if(_f46){
if(this.isMinimized==true){
_f46.unCollapse(_f45);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f44){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f46){
_f46.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f46);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f47){
var _f48=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f48=false;
}
}
if(_f48==true){
this._invisibilize(_f47);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f4a){
if(_f4a!=this._isInvisibilized){
if(_f4a){
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
StageSplitterBinding.prototype.onDragStart=function(_f4b){
var _f4c=top.app.bindingMap.stagesplittercover;
var _f4d=this._containingSplitBoxBinding.getOrient();
switch(_f4d){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f4c.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f4c.bindingElement.style.cursor="n-resize";
break;
}
_f4c.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f4d);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f53){
this._orient=_f53;
this.attachClassName(_f53);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f55=true;
var _f56=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f56=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f55=false;
break;
}
if(_f55){
this.bindingElement.style.left=pos.x+"px";
}
if(_f56){
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
StageBoxAbstraction.handleAction=function(_f58){
switch(_f58.type){
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
if(_f58.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f58.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f59=this.bindingElement.style;
_f59.position="absolute";
_f59.width="100%";
_f59.height="100%";
_f59.top="0";
_f59.left="0";
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
var _f5a=this.bindingElement.style;
_f5a.position="relative";
_f5a.width="auto";
_f5a.height="auto";
_f5a.top="auto";
_f5a.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f5b,_f5c){
var _f5d=_f5b.bindingElement.style;
var _f5e=_f5b.bindingElement.parentNode;
var box=_f5b._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f5c){
_f5b._unmodifiedFlexMethod=_f5b.flex;
_f5b.flex=function(){
_f5d.width=_f5e.offsetWidth+"px";
_f5d.height=_f5e.offsetHeight+"px";
};
}else{
_f5d.width="100%";
_f5d.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f5d.width="auto";
_f5d.height="auto";
box.reflex(true);
},0);
}
_f5b.flex=_f5b._unmodifiedFlexMethod;
_f5b._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f60){
var _f61=_f60.target;
switch(_f60.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f61 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f60);
_f60.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f60.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f62){
var mode=null;
switch(_f62.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f64){
StageMenuBarBinding.superclass.handleAction.call(this,_f64);
switch(_f64.type){
case MenuItemBinding.ACTION_COMMAND:
var _f65=_f64.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f65){
SystemAction.invoke(_f65,this._rootNode);
}
}
_f64.consume();
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
var _f66=this.getProperty("handle");
if(_f66){
this._handle=_f66;
if(StageBinding.isViewOpen(_f66)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f66);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f68){
this.setProperty("handle",_f68);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f69,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f69,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f69){
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
StageViewMenuItemBinding.newInstance=function(_f6b){
var _f6c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f6b);
UserInterface.registerBinding(_f6c,StageViewMenuItemBinding);
return UserInterface.getBinding(_f6c);
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
StageStatusBarBinding.prototype.setLabel=function(_f6d){
this._label.setLabel(_f6d);
};
StageStatusBarBinding.prototype.setImage=function(_f6e){
this._label.setImage(_f6e);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f6f){
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
var _f70=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f71=_f70.getAssociatedView();
var _f72=_f71.getContentWindow().bindingMap.tree;
var _f73=_f72.getFocusedTreeNodeBindings();
if(!_f73.hasEntries()&&StageBinding.treeSelector){
_f73=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f73;
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
ExplorerBinding.prototype.handleAction=function(_f74){
ExplorerBinding.superclass.handleAction.call(this,_f74);
var _f75=_f74.target;
switch(_f74.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f74.consume();
break;
case Binding.ACTION_DRAG:
if(_f75 instanceof ExplorerSplitterBinding){
_f75.dragger.registerHandler(this);
}
_f74.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f77){
this._menuBinding.setSelectionByHandle(_f77);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f78){
if(_f78 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f78);
this._menuBinding.mountDefinition(_f78);
}
};
ExplorerBinding.prototype.onDragStart=function(_f79){
var _f7a=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f7a.hasEntries()){
var _f7b=_f7a.getFirst();
this._dragStart=_f7b.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f7b.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f7f){
if(_f7f instanceof SystemViewDefinition){
var _f80=ViewBinding.newInstance(this.bindingDocument);
_f80.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f80.setDefinition(_f7f);
var _f81=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f81.setAssociatedView(_f80);
this._decks[_f7f.handle]=_f81;
_f81.add(_f80);
this.add(_f81);
function attach(){
_f81.attach();
_f80.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f82){
var _f83=this._decks[_f82];
this.select(_f83);
};
DecksBinding.prototype.expandBy=function(_f84){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f86=this.bindingElement.offsetHeight+_f84;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f86+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f88){
var _f89=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f88);
return UserInterface.registerBinding(_f89,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f8a){
this._viewBinding=_f8a;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f8b=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f8c=this._viewBinding.getDefinition().label;
StatusBar.busy(_f8b,[_f8c]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f8d){
ExplorerDeckBinding.superclass.handleAction.call(this,_f8d);
var _f8e=_f8d.target;
switch(_f8d.type){
case PageBinding.ACTION_INITIALIZED:
if(_f8e instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f8e.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f8f,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f8f,arg);
switch(_f8f){
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
var _f91=null;
if(this._isExplorerDeckBindingInitialized){
_f91=this._viewBinding.getDefinition().label;
}else{
_f91=DockTabBinding.LABEL_TABLOADING;
}
return _f91;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f92=null;
if(this._isExplorerDeckBindingInitialized){
_f92=this._viewBinding.getDefinition().image;
}else{
_f92=DockTabBinding.IMG_TABLOADING;
}
return _f92;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f93=null;
if(this._isExplorerDeckBindingInitialized){
_f93=this._viewBinding.getDefinition().toolTip;
}
return _f93;
};
ExplorerDeckBinding.newInstance=function(_f94){
var _f95=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f94);
return UserInterface.registerBinding(_f95,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f96){
switch(_f96.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f96.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f96.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f96);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f97){
this._maxButtons.set(_f97.handle,this._mountMaxButton(_f97));
this._minButtons.set(_f97.handle,this._mountMinButton(_f97));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f98){
var _f99=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f99.setLabel(_f98.label);
_f99.setToolTip(_f98.toolTip);
_f99.handle=_f98.handle;
_f99.node=_f98.node;
this._maxGroup.add(_f99);
this._maxList.add(_f99);
_f99.attach();
return _f99;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f9a){
var _f9b=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f9b.setLabel(_f9a.label);
_f9b.setToolTip(_f9a.label);
_f9b.handle=_f9a.handle;
_f9b.node=_f9a.node;
this._minGroup.addFirst(_f9b);
this._minList.add(_f9b);
_f9b.attach();
_f9b.hide();
return _f9b;
};
ExplorerMenuBinding.prototype.handleAction=function(_f9c){
ExplorerMenuBinding.superclass.handleAction.call(this,_f9c);
switch(_f9c.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f9d=_f9c.target;
var _f9e=_f9d.getCheckedButtonBinding();
var _f9f=_f9e.handle;
switch(_f9d){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f9f),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f9f),true);
break;
}
this._selectedHandle=_f9f;
this._selectedTag=_f9e.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f9c.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fa0){
var _fa1=this._maxButtons.get(_fa0);
if(_fa1){
_fa1.check();
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
var _fa2=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fa2=true;
}
return _fa2;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fa4=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fa4=true;
}
return _fa4;
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
ExplorerToolBarBinding.newInstance=function(_fa5){
var _fa6=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fa5);
return UserInterface.registerBinding(_fa6,ExplorerToolBarBinding);
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
var _fa7=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fa8=_fa7?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fa8);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fa9,_faa){
var _fab=(_faa==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fac=DOMUtil.createElementNS(Constants.NS_UI,_fab,_fa9);
var _fad=UserInterface.registerBinding(_fac,ExplorerToolBarButtonBinding);
_fad.explorerToolBarButtonType=_faa;
return _fad;
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
EditorBinding.registerComponent=function(_fae,_faf){
var _fb0=EditorBinding._components;
var _fb1=EditorBinding._editors;
var key=_faf.key;
var _fb3=Interfaces.isImplemented(IWysiwygEditorComponent,_fae);
if(!_fb3){
_fb3=Interfaces.isImplemented(ISourceEditorComponent,_fae);
}
if(_fb3){
if(_fb1.has(key)){
_fb1.get(key).initializeEditorComponent(_fae);
}else{
if(!_fb0.has(key)){
_fb0.set(key,new List());
}
_fb0.get(key).add(_fae);
}
}else{
throw "Editor component interface not implemented: "+_fae;
}
};
EditorBinding.claimComponents=function(_fb4,_fb5){
var _fb6=EditorBinding._components;
var _fb7=EditorBinding._editors;
var key=_fb5.key;
_fb7.set(key,_fb4);
var list=null;
if(_fb6.has(key)){
list=_fb6.get(key).copy();
_fb6.del(key);
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
var _fbb=this.getProperty("value");
if(_fbb!=null){
_fbb=decodeURIComponent(_fbb);
this._startContent=_fbb;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fbd=this.bindingWindow.DataManager;
_fbd.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fbf){
var _fc0=EditorBinding.claimComponents(this,_fbf);
if(_fc0!=null){
while(_fc0.hasNext()){
this.initializeEditorComponent(_fc0.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fc2=this.bindingWindow.DataManager;
if(_fc2.getDataBinding(name)){
_fc2.unRegisterDataBinding(name);
}
_fc2.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fc3=this.getEditorDocument();
if(_fc3!=null){
Application.framework(_fc3);
DOMEvents.addEventListener(_fc3,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fc3,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fc3,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fc3,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fc5){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fc5==true){
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
var _fc7=this.getCheckSum();
if(_fc7!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fc7;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fc8=null;
if(Binding.exists(this._pageBinding)){
_fc8=this._pageBinding.getCheckSum(this._checksum);
}
return _fc8;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fca=DOMEvents.getTarget(e);
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
if(_fca.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fcc,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fcc,arg);
var _fce=null;
switch(_fcc){
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
var _fcf=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fcf=false;
}
}
}else{
_fce=DOMEvents.getTarget(arg);
if(_fce&&_fce.ownerDocument==this.getEditorDocument()){
_fcf=false;
}
}
if(_fcf){
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
EditorBinding.prototype._activateEditor=function(_fd0){
if(_fd0!=this._isActivated){
this._isActivated=_fd0;
EditorBinding.isActive=_fd0;
var _fd1=this.getEditorWindow().standardEventHandler;
var _fd2=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fd2!=null){
if(_fd0){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fd2.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fd1.enableNativeKeys(true);
}else{
_fd2.disable();
_fd1.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fd3=this.getEditorDocument().selection.createRange();
_fd3.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fd4=false;
try{
if(!Client.isExplorer){
var _fd5=this.getEditorWindow().getSelection();
if(_fd5!=null){
_fd4=_fd5.toString().length>0;
if(!_fd4){
var _fd6=_fd5.getRangeAt(0);
var frag=_fd6.cloneContents();
var _fd8=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fd8.appendChild(frag.firstChild);
}
var img=_fd8.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fd4=true;
}
}
}
}
}else{
var _fd6=this.getEditorDocument().selection.createRange();
_fd4=(_fd6&&_fd6.text)&&_fd6.text.length>0;
if(_fd6.commonParentElement&&VisualEditorBinding.isImageElement(_fd6.commonParentElement())){
_fd4=true;
}
}
}
catch(exception){
}
return _fd4;
};
EditorBinding.prototype.isCommandEnabled=function(_fda){
var _fdb=true;
switch(_fda){
case "Cut":
case "Copy":
case "Paste":
_fdb=this.getEditorDocument().queryCommandEnabled(_fda);
break;
}
return _fdb;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fdf=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fe0=null;
if(cmd=="Paste"){
_fe0=null;
}else{
_fe0=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fe0);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fdf=true;
}
break;
}
return _fdf;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fe2=this.getContentWindow().bindingMap.toolbar;
var _fe3=_fe2.getButtonForCommand(cmd);
if(!_fe3){
throw "No button for command "+cmd;
}
return _fe3;
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
var _fe6=this.getContentDocument().getElementById("focusableinput");
if(_fe6!=null){
_fe6.style.display="block";
FocusBinding.focusElement(_fe6);
_fe6.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fe7){
EditorBinding.superclass.handleAction.call(this,_fe7);
var _fe8=_fe7.target;
var self=this;
var _fea=this.shadowTree.iframe;
switch(_fe7.type){
case Binding.ACTION_DIRTY:
if(_fe7.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_feb){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_feb);
};
EditorBinding.prototype.handleElement=function(_fec){
return true;
};
EditorBinding.prototype.updateElement=function(_fed){
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
var _ff0=this._menuGroups[rel];
if(_ff0 instanceof List){
_ff0.each(function(_ff1){
_ff1.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _ff3=this._menuGroups[rel];
if(_ff3 instanceof List){
_ff3.each(function(_ff4){
_ff4.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_ff5){
EditorPopupBinding.superclass.handleAction.call(this,_ff5);
var _ff6=_ff5.target;
if(_ff5.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_ff6.getProperty("cmd");
var gui=_ff6.getProperty("gui");
var val=_ff6.getProperty("val");
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
var _ffa=this.bindingWindow.bindingMap.tinywindow;
var _ffb=this.bindingWindow.bindingMap.codepresswindow;
if(_ffa){
EditorBinding.registerComponent(this,_ffa);
}else{
if(_ffb){
EditorBinding.registerComponent(this,_ffb);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_ffc,_ffd,_ffe,_fff){
this._editorBinding=_ffc;
this._tinyEngine=_ffd;
this._tinyInstance=_ffe;
this._tinyTheme=_fff;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1000,frame,_1002){
this._editorBinding=_1000;
this._codePressFrame=frame;
this._codePressEngine=_1002;
};
EditorClickButtonBinding.prototype._buildDesignModeSanitizer=function(){
if(Client.isExplorer){
var img=this.bindingDocument.createElement("img");
img.className="designmodesanitizer";
img.src=Resolver.resolve("${root}/images/blank.png");
this.shadowTree.designmodesanitizer=img;
this.bindingElement.appendChild(img);
}
};
EditorClickButtonBinding.prototype._setupEditorBookmarking=function(){
var _1004=this._editorBinding;
if(_1004!=null){
var self=this;
var _1006={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1004.hasBookmark()){
_1004.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1004.hasBookmark()){
_1004.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1006);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1006);
}
};
EditorClickButtonBinding.newInstance=function(_1008){
var _1009=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1008);
return UserInterface.registerBinding(_1009,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_100a){
var _100b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_100a);
return UserInterface.registerBinding(_100b,EditorToolBarButtonBinding);
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
var _100c=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_100c);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_100d,_100e,_100f,theme){
this._editorBinding=_100d;
this._tinyEngine=_100e;
this._tinyInstance=_100f;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1011){
EditorSelectorBinding.superclass.handleAction.call(this,_1011);
switch(_1011.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_1011);
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
this.shadowTree.designmodesanitizer=img;
this.bindingElement.appendChild(img);
}
};
EditorMenuItemBinding.newInstance=function(_1014){
var _1015=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1014);
return UserInterface.registerBinding(_1015,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1016){
var i=0,_1018,_1019=[],split=_1016.split(" ");
while((_1018=split[i++])!=null){
if(_1018.length>=3&&_1018.substring(0,3)=="mce"){
continue;
}else{
if(_1018.length>=14&&_1018.substring(0,14)=="compositemedia"){
continue;
}
}
_1019.push(_1018);
}
return _1019.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_101b){
var _101c=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_101b);
if(soap instanceof SOAPFault){
}else{
_101c=soap.XhtmlFragment;
if(!_101c){
_101c="";
}
}
WebServiceProxy.isFaultHandler=true;
return _101c;
};
VisualEditorBinding.getTinyContent=function(_101e,_101f){
var _1020=null;
if(_101e==null||_101e==""){
_101e=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_101e);
if(soap instanceof SOAPFault){
var _1022=soap;
var _1023={handleDialogResponse:function(){
_101f.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1023,_1022);
}else{
_1020=soap.XhtmlFragment;
if(_1020==null){
_1020=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1020;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _1026=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1028=new List(doc.documentElement.childNodes);
var _1029=new List();
_1028.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_1029.add(child);
}
});
var _102b=_1029.get(index);
if(_102b==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_102b.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_102b.hasChildNodes()){
frag.appendChild(_102b.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_1026=DOMSerializer.serialize(doc.documentElement);
_1026=_1026.substring(_1026.indexOf(">")+1,_1026.length);
_1026=_1026.substring(0,_1026.lastIndexOf("<"));
}
}
}
if(_1026==null){
_1026=new String("");
}
return _1026;
};
VisualEditorBinding.isImage=function(_102d){
result=_102d&&_102d.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_102e){
return VisualEditorBinding.isImage(_102e)&&!VisualEditorBinding.isReservedElement(_102e);
};
VisualEditorBinding.isReservedElement=function(_102f){
if(VisualEditorBinding.isFunctionElement(_102f)){
return true;
}
if(VisualEditorBinding.isFieldElement(_102f)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_102f)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1030){
return VisualEditorBinding.isImage(_1030)&&CSSUtil.hasClassName(_1030,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1031){
return VisualEditorBinding.isImage(_1031)&&CSSUtil.hasClassName(_1031,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1032){
return VisualEditorBinding.isImage(_1032)&&CSSUtil.hasClassName(_1032,VisualEditorBinding.HTML_CLASSNAME);
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
var _1033=this.getProperty("embedablefieldstypenames");
if(_1033!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1033);
}
var _1034=this.getProperty("formattingconfiguration");
if(_1034!=null){
this._url+="?config="+_1034;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1035,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1035,arg);
var _1037=this.getContentWindow().bindingMap.tinywindow;
var _1038=_1037.getContentWindow();
switch(_1035){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1038){
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
this.initializeEditorComponents(_1037);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1039){
_1039.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_103a){
VisualEditorBinding.superclass._onPageInitialize.call(this,_103a);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_103d){
var _103e=_103d;
if(!this._isNormalizedDocument(_103d)){
_103e=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_103d);
}
return _103e;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_103f){
var _1040=false;
var doc=XMLParser.parse(_103f,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1040=true;
}
}
if(Client.isWebKit){
if(_103f.indexOf("<html")!==0){
_1040=false;
}
}
return _1040;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1045=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1045){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1045=true;
}
return _1045;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1047=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1047);
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
VisualEditorBinding.prototype.setResult=function(_1049){
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
VisualEditorPopupBinding.prototype.configure=function(_104a,_104b,_104c){
var _104d=this.editorBinding.hasSelection();
this.tinyInstance=_104a;
this.tinyEngine=_104b;
this.tinyElement=_104c;
this.hasSelection=_104d;
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
var _1051=false;
if(this.hasSelection){
_1051=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1051=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1051=true;
}
}
}
}
if(_1051){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1052=this.getMenuItemForCommand("compositeInsertLink");
var _1053=this.getMenuItemForCommand("unlink");
var _1054=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1055=this.editorBinding.getButtonForCommand("unlink");
_1053.setDisabled(_1055.isDisabled);
if(_1053.isDisabled){
_1052.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1052.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1056=this.editorBinding.embedableFieldConfiguration;
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
if(_1056){
var _1059=_1056.getGroupNames();
if(_1059.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1059.each(function(_105d){
var _105e=_1056.getFieldNames(_105d);
_105e.each(function(_105f){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_105f);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_105d+":"+_105f);
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
var _1061=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1062=null;
var _1063=null;
if(_1061){
if(_1061.nodeName=="TD"){
_1062=_1061.getAttribute("colspan");
_1063=_1061.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1062=="1"&&_1063=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1061){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1064){
var _1065=VisualEditorFormattingConfiguration._configurations;
if(!_1065.has(_1064)){
_1065.set(_1064,new VisualEditorFormattingConfiguration());
}
return _1065.get(_1064);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1067){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1068){
var _1069=null;
var _106a=VisualEditorFieldGroupConfiguration._configurations;
if(!_106a.has(_1068)){
_106a.set(_1068,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1068)));
}
return _106a.get(_1068);
};
function VisualEditorFieldGroupConfiguration(_106b){
var _106c=new Map();
new List(_106b).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_106c.set(group.GroupName,map);
});
this._groups=_106c;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1070){
return this._groups.get(_1070).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1071,_1072){
return this._groups.get(_1071).get(_1072).xhtml;
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
var _1074=this.getDescendantElementsByLocalName("textarea");
while(_1074.hasNext()){
var _1075=_1074.getNext();
if(_1075.getAttribute("selected")=="true"){
this._startContent=_1075.value;
this._textareaname=_1075.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1077=this.getContentWindow().bindingMap.templatetree;
_1077.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1078){
var _1079=_1077.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1079.textareaname);
_1078.consume();
}});
_1077.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_107a){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _107b=this.getContentWindow().bindingMap.toolsplitter;
_107b.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _107c=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_107c.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_107c);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_107d){
this._textareas=new Map();
while(_107d.hasNext()){
var _107e=_107d.getNext();
var _107f=_107e.getAttribute("placeholderid");
this._textareas.set(_107f,{placeholderid:_107f,placeholdername:_107e.getAttribute("placeholdername"),placeholdermarkup:_107e.value,textareaelement:_107e,isSelected:_107e.getAttribute("selected")=="true"});
}
var _1080=new Map();
this._textareas.each(function(name,_1082){
var _1083=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1083.setLabel(_1082.placeholdername);
_1083.setImage("${icon:placeholder}");
_1083.setProperty("placeholder",true);
_1083.textareaname=name;
_1080.set(_1082.placeholdername,_1083);
if(_1082.isSelected){
selected=_1083;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1084=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1084.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1085=this.getContentWindow().bindingMap.templatetree;
var _1086=_1085.add(TreeNodeBinding.newInstance(_1085.bindingDocument));
_1086.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1086.setImage("${icon:warning}");
_1086.attach();
var _1087=this.getContentWindow().bindingMap.statusbar;
_1087.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1089=this._textareas.get(name);
var _108a=_1089.placeholdermarkup;
this.setValue(this.normalizeToDocument(_108a));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_108b){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_108b;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _108c=this.getContentWindow().bindingMap.statusbar;
_108c.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_108b);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _108f="";
if(this._heads.has(this._textareaname)){
_108f=this._heads.get(this._textareaname);
if(_108f==null){
_108f=new String("");
}
}
return _108f;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1091){
_1091.textareaelement.value=_1091.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1092,_1093){
var _1094=_1092.getElementsByTagName("div").item(0);
var _1095=_1093.getElementsByTagName("div").item(0);
var _1096=new List(_1094.getElementsByTagName("textarea"));
var _1097=new List(_1095.getElementsByTagName("textarea"));
var _1098=false;
if(_1096.getLength()!=_1097.getLength()){
_1098=true;
}else{
var index=0;
_1096.each(function(_109a,index){
var _109c=_1097.get(index);
var newid=_109a.getAttribute("placeholderid");
var oldid=_109c.getAttribute("placeholderid");
var _109f=_109a.getAttribute("placeholdername");
var _10a0=_109c.getAttribute("placeholdername");
if(newid!=oldid||_109f!=_10a0){
_1098=true;
}
return !_1098;
});
}
if(_1098){
var html=null;
if(_1094.innerHTML!=null){
html=_1094.innerHTML;
}else{
html=DOMSerializer.serialize(_1094);
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
var _10a4=this.getDescendantBindingByLocalName("selector");
_10a4.attach();
this._populateTemplateSelector();
var _10a5=this.getContentWindow().bindingMap.templateselector;
_10a5.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10a6=this.getDescendantBindingByLocalName("selector");
var _10a7=this.getContentWindow().bindingMap.templateselector;
_10a6.selections.each(function(_10a8){
_10a8.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10a7.populateFromList(_10a6.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10a9=this.getDescendantBindingByLocalName("selector");
var _10aa=this.getContentWindow().bindingMap.templateselector;
_10a9.selectByValue(_10aa.getValue());
_10a9.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10ab){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10b0,_10b1){
var _10b2=_10b1;
if(old.has(_10b0)){
_10b2=old.get(_10b0).placeholdermarkup;
}
return _10b2;
}
while(_10ab.hasNext()){
var _10b3=_10ab.getNext();
var _10b4=_10b3.getAttribute("placeholderid");
this._textareas.set(_10b4,{placeholderid:_10b4,placeholdername:_10b3.getAttribute("placeholdername"),placeholdermarkup:compute(_10b4,_10b3.value),textareaelement:_10b3,isSelected:_10b3.getAttribute("selected")=="true"});
}
var _10b5=null;
var _10b6=this.getContentWindow().bindingMap.templatetree;
var _10b7=new Map();
this._textareas.each(function(name,_10b9){
var _10ba=_10b6.add(TreeNodeBinding.newInstance(_10b6.bindingDocument));
_10ba.setLabel(_10b9.placeholdername);
_10ba.setImage("${icon:placeholder}");
_10ba.setProperty("placeholder",true);
_10ba.textareaname=name;
_10b7.set(_10b9.placeholdername,_10ba);
if(_10b9.isSelected){
_10b5=_10ba;
}
});
_10b6.attachRecursive();
if(_10b5!=null){
var _10bb=true;
if(this._oldtextareas.hasEntries()){
_10bb=false;
var map=new Map();
this._textareas.each(function(id,_10be){
map.set(_10be.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10bb=true;
}
}
if(_10bb){
var _10bf=this._textareas.get(_10b5.textareaname);
this._textareaname=_10b5.textareaname;
this._placeholdername=_10bf.placeholdername;
this._setContentFromPlaceHolder(_10b5.textareaname);
_10b5.focus();
}else{
var _10c0=_10b7.get(this._placeholdername);
this._textareaname=_10c0.textareaname;
_10c0.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10c1,_10c2){
var _10c3=_10c1.getElementsByTagName("ui:selector").item(0);
var _10c4=_10c2.getElementsByTagName("ui:selector").item(0);
var _10c5=false;
if(_10c3!=null&&_10c4!=null){
var _10c6=new List(_10c3.getElementsByTagName("ui:selection"));
var _10c7=new List(_10c4.getElementsByTagName("ui:selection"));
if(_10c6.getLength()!=_10c7.getLength()){
_10c5=true;
}else{
_10c6.each(function(_10c8,index){
var _10ca=_10c8.getAttribute("value");
var _10cb=_10c7.get(index).getAttribute("value");
if(_10ca!=_10cb){
_10c5=true;
}
return !_10c5;
});
}
}
if(_10c5){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10c3);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10c1,_10c2);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10cd,frame,_10cf){
this._editorBinding=_10cd;
this._codePressFrame=frame;
this._codePressEngine=_10cf;
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
CodeMirrorEditorBinding.syntax={TEXT:"text",XML:"xml",XSL:"xsl",HTML:"html",CSS:"css",JAVASCRIPT:"js",CSHARP:"cs",CSHTML:"cshtml",SQL:"sql"};
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
var _10d5=this.getProperty("validate");
if(_10d5==true){
this._hasStrictValidation=true;
}
var _10d6=this.getProperty("validator");
if(_10d6!=null){
this._validator=_10d6;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10d7,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10d7,arg);
switch(_10d7){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10d9=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10d9!=null){
var _10da=_10d9.getContentWindow();
if(arg.broadcastWindow==_10da){
this._codemirrorWindow=_10da;
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
this._codemirrorEditor.setOption("mode","text/x-csharp");
break;
case CodeMirrorEditorBinding.syntax.JAVASCRIPT:
this._codemirrorEditor.setOption("mode","text/javascript");
break;
case CodeMirrorEditorBinding.syntax.SQL:
this._codemirrorEditor.setOption("mode","");
case CodeMirrorEditorBinding.syntax.TEXT:
this._codemirrorEditor.setOption("mode","");
break;
}
this.initializeEditorComponents(_10d9);
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
this.unsubscribe(_10d7);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10de){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10de);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10df){
if(_10df!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10df;
EditorBinding.isActive=_10df;
var _10e0=this.getContentWindow().standardEventHandler;
if(_10df){
_10e0.enableNativeKeys(true);
}else{
_10e0.disableNativeKeys();
}
var _10e1=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10e1!=null){
if(_10df){
_10e1.enable();
}else{
_10e1.disable();
}
}
if(_10df){
this.focus();
var _10e2=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10e6=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10e6;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10e7){
_10e7.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10e9){
if(!this._isFinalized){
if(_10e9!=this._startContent){
this._startContent=_10e9;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10e9);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10ea=this.getContentWindow().bindingMap.editorpage.getContent();
return _10ea?_10ea:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10eb){
if(this._pageBinding!=null){
this._pageBinding.cover(_10eb);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10ec){
if(_10ec!=null&&this.shadowTree.dotnetinput!=null){
var value=_10ec.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10ee=true;
var _10ef=this.getContent();
if(this._validator!=null){
_10ee=Validator.validateInformed(_10ef,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10ee=XMLParser.isWellFormedDocument(_10ef,true);
if(_10ee==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10ee=this._isValidHTML(_10ef);
break;
}
}
break;
}
}
return _10ee;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10f1=true;
var doc=XMLParser.parse(xml);
var _10f3=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10f3.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10f3.add("NamespaceURI");
}
var head=null,body=null;
var _10f7=new List(root.childNodes);
while(_10f7.hasNext()){
var child=_10f7.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10f3.add("MultipleHead");
}
if(body!=null){
_10f3.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10f3.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10f3.add("MissingHead");
}
if(body==null){
_10f3.add("MissingBody");
}
}
if(_10f3.hasEntries()){
_10f1=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f3.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f3.getFirst()));
}
}
return _10f1;
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
var _10f9=null;
var page=this._pageBinding;
if(page!=null){
_10f9=page.getCheckSum();
}
return _10f9;
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
ThrobberBinding.prototype.handleBroadcast=function(_10fb,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10fb,arg);
switch(_10fb){
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
ProgressBarBinding.notch=function(_10fe){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10fe);
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
ProgressBarBinding.prototype.notch=function(_1100){
_1100=_1100?_1100:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1100);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1102,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1102,arg);
switch(_1102){
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
StartMenuItemBinding.prototype.setChecked=function(_1104,_1105){
StartMenuItemBinding.superclass.setChecked.call(this,_1104,_1105);
if(!_1105){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1106){
var _1107=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1106);
UserInterface.registerBinding(_1107,StartMenuItemBinding);
return UserInterface.getBinding(_1107);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_110a,_110b){
var _110c=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_110b,true)==true){
if(_110a!="*"){
_110a=KeySetBinding._sanitizeKeyModifiers(_110a);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_110c[doc]){
_110c[doc]={};
}
if(!_110c[doc][code]){
_110c[doc][code]={};
}
_110c[doc][code][_110a]=_110b;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1110=false;
var code=e.keyCode;
var _1112=KeySetBinding.keyEventHandlers;
if(_1112[doc]&&_1112[doc][code]){
var _1113="[default]";
_1113+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1113+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _1114=_1112[doc][code][_1113];
if(_1114==null){
_1114=_1112[doc][code]["*"];
}
if(_1114!=null){
_1114.handleKeyEvent(e);
_1110=true;
}
}
return _1110;
};
KeySetBinding._sanitizeKeyModifiers=function(_1115){
var _1116="[default]";
var mods={};
if(_1115){
new List(_1115.split(" ")).each(function(_1118){
mods[_1118]=true;
});
function check(_1119){
if(mods[_1119]){
_1116+=" "+_1119;
}
}
check("shift");
check("control");
}
return _1116;
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
var _111d=key.getAttribute("oncommand");
var _111e=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_111e){
DOMEvents.preventDefault(e);
}
var _1120=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_111d,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1121){
if(_1121 instanceof CursorBinding){
_1121.setOpacity(0);
_1121.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_1122){
_1121.setOpacity(Math.sin(_1122*Math.PI/180));
},onstop:function(){
_1121.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1123){
if(_1123 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_1124){
_1123.setOpacity(Math.cos(_1124*Math.PI/180));
},onstop:function(){
_1123.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1125,_1126,_1127){
if(_1125 instanceof CursorBinding){
_1127.x-=16;
_1127.y-=16;
new Animation({modifier:3,onstep:function(_1128){
var tal=Math.sin(_1128*Math.PI/180);
_1125.setPosition(new Point(((1-tal)*_1126.x)+((0+tal)*_1127.x),((1-tal)*_1126.y)+((0+tal)*_1127.y)));
},onstop:function(){
CursorBinding.fadeOut(_1125);
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
CursorBinding.prototype.setOpacity=function(_112e){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_112e);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_112e*100)+")";
}
this._opacity=_112e;
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
function setOpacity(_1131){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_1131);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1131*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_1132){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1132*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1134){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_1134);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1134*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1135){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1135*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1137){
if(_1137!=this._isBusy){
if(_1137){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1137;
}
};
CoverBinding.prototype.setTransparent=function(_1138){
if(_1138!=this._isTransparent){
if(_1138){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1138;
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
CoverBinding.prototype.setHeight=function(_113a){
if(_113a>=0){
this.bindingElement.style.height=new String(_113a+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_113b){
var _113c=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_113b);
return UserInterface.registerBinding(_113c,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _113e=UncoverBinding._bindingInstance;
if(Binding.exists(_113e)){
_113e.setPosition(pos);
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
if(Client.isExplorer){
this._canvas.style.filter="progid:DXImageTransform.Microsoft.Fade(duration=30) progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
}
this.bindingElement.appendChild(this._canvas);
};
TheatreBinding.prototype.play=function(_1142){
this._isFading=_1142==true;
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
if(Client.isMozilla){
var _1143=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1143.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1143.clearRect(0,0,300,150);
_1143.fillRect(0,0,300,150);
alpha+=0.002;
}else{
top.clearInterval(TheatreBinding._interval);
TheatreBinding._interval=null;
}
},50);
}else{
this._canvas.filters[0].Apply();
this._canvas.style.backgroundColor="black";
this._canvas.filters[0].Play();
}
};
TheatreBinding.prototype.stop=function(){
if(this._isPlaying){
if(this._isFading){
if(TheatreBinding._interval!=null){
top.clearInterval(TheatreBinding._interval);
}
if(Client.isExplorer){
this._canvas.style.backgroundColor="transparent";
}else{
var _1145=this._canvas.getContext("2d");
_1145.clearRect(0,0,300,150);
}
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
var _1146=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1146);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1147=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1147){
this._startcontent=_1147.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1148){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1148);
switch(_1148.type){
case WindowBinding.ACTION_ONLOAD:
if(_1148.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1148.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1148);
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
var _114c=this._transformer.transformToString(doc);
this._inject(_114c);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_114f){
this.getContentDocument().body.innerHTML=_114f;
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
var _1157=list.getNext();
var id=_1157.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1157);
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
var _1161=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1161.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1161.appendChild(att);
}
elm.appendChild(_1161);
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
var _116b=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_116b){
doc=XMLParser.parse(_116b);
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
var _116f=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_116f;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1170,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1170,arg);
switch(_1170){
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
var _1173=new List();
list.each(function(lang){
_1173.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1173);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1177){
switch(_1177){
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
var _117a=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_117a,root);
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
var _117b=this.getProperty("status");
if(_117b!=null){
switch(_117b){
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
this.map=map;
}
UserInterfaceMapping.prototype.merge=function(_117e){
for(var _117f in _117e.map){
this.map[_117f]=_117e.getBindingImplementation(_117f);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1180){
var _1181=null;
var name=_1180.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_1181=this.map[name];
}
return _1181;
};
var UserInterface=new function(){
var _1184=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1185=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:imageinputdialog":ImageInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1184,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1186=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1188,impl){
var _118a=null;
if(!this.hasBinding(_1188)){
var _118b=DOMUtil.getParentWindow(_1188);
if(DOMUtil.getLocalName(_1188)!="bindingmapping"){
if(!impl&&_1188.getAttribute("binding")!=null){
var _118c=_1188.getAttribute("binding");
impl=_118b[_118c];
if(impl==null){
throw "No such binding in scope: "+_118c;
}
}
if(!impl){
var _118d=_118b.DocumentManager;
if(_118d){
var _118e=_118d.customUserInterfaceMapping;
if(_118e){
impl=_118e.getBindingImplementation(_1188);
}
}
}
if(!impl){
impl=_1185.getBindingImplementation(_1188);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_118a=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_118a){
var key=KeyMaster.getUniqueKey();
_1188.setAttribute("key",key);
_118a.key=key;
if(!_1188.id){
_1188.id=key;
}
keys[key]={element:_1188,binding:_118a};
_118a.onBindingRegister();
}
}
}
return _118a;
};
this.unRegisterBinding=function(_1190){
terminate(_1190);
};
function terminate(_1191){
if(Binding.exists(_1191)==true){
var key=_1191.key;
Binding.destroy(_1191);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1191=null;
}else{
_1186.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1193){
var _1194=null;
if(keys[_1193.key]){
_1194=keys[_1193.key].element;
}
return _1194;
};
this.getBinding=function(_1195){
var _1196=null;
if(_1195&&_1195.nodeType==Node.ELEMENT_NODE){
try{
var key=_1195.getAttribute("key");
if(key&&keys[key]){
_1196=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1195);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1196;
};
this.getBindingByKey=function(key){
var _1199=null;
if(keys[key]){
_1199=keys[key].binding;
}
return _1199;
};
this.hasBinding=function(_119a){
return this.getBinding(_119a)!=null;
};
this.isBindingVisible=function(_119b){
var _119c=Application.isOperational;
if(_119c==true){
var _119d=new Crawler();
_119d.type=NodeCrawler.TYPE_ASCENDING;
_119d.id="visibilitycrawler";
_119d.addFilter(function(_119e){
var b=UserInterface.getBinding(_119e);
var res=0;
if(!b.isVisible){
_119c=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_119d.crawl(_119b.bindingElement);
_119d.dispose();
}
return _119c;
};
var _11a1=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11a1={};
for(var key in keys){
_11a1[key]=true;
}
};
this.getPoint=function(){
var _11a5=null;
if(_11a1){
_11a5=new List();
for(var key in keys){
if(!_11a1[key]){
_11a5.add(key);
}
}
}
return _11a5;
};
this.clearPoint=function(){
_11a1=null;
};
this.trackUndisposedBindings=function(){
var _11a7=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11a7){
_11a7="Bindings illdisposed: ";
}
_11a7+=entry.binding+" ";
}
}
if(_11a7!=null){
_1186.error(_11a7);
}
};
this.autoTrackDisposedBindings=function(_11aa){
if(_11aa){
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
SOAPRequest.newInstance=function(_11ab,_11ac){
var _11ad=_11ab+"/"+_11ac;
var _11ae=new SOAPRequest(_11ad);
var _11af=SOAPRequest.resolver;
_11ae.document=Templates.getTemplateDocument("soapenvelope.xml");
_11ae.envelope=_11af.resolve("soap:Envelope",_11ae.document);
_11ae.header=_11af.resolve("soap:Header",_11ae.envelope);
_11ae.body=_11af.resolve("soap:Body",_11ae.envelope);
return _11ae;
};
SOAPRequest._parseResponse=function(_11b0){
var _11b1=null;
var _11b2=false;
var doc=_11b0.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11b1=SOAPRequestResponse.newInstance(_11b0.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11b0.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11b2=true;
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
var text=_11b0.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_11b2=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11b0.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11b0.responseText);
}
}
}
}
if(_11b2==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11b1;
};
function SOAPRequest(_11b7){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11b7;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11b9=DOMUtil.getXMLHTTPRequest();
var _11ba=null;
_11b9.open("post",url,false);
_11b9.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11b9.setRequestHeader("SOAPAction",this.action);
try{
_11b9.send(this.document);
_11ba=SOAPRequest._parseResponse(_11b9);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11b9=null;
return _11ba;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11bd){
var _11be=DOMUtil.getXMLHTTPRequest();
_11be.open("post",url,true);
_11be.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11be.setRequestHeader("SOAPAction",this.action);
_11be.onreadystatechange=function(){
if(_11be.readyState==4){
var _11bf=SOAPRequest._parseResponse(_11be);
_11bd(_11bf);
_11be=null;
}
};
_11be.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11c0 in this){
this[_11c0]=null;
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
var _11c2=null;
if(doc&&doc.documentElement){
_11c2=new SOAPRequestResponse();
var _11c3=SOAPRequestResponse.resolver;
_11c2.document=doc;
_11c2.envelope=_11c3.resolve("soap:Envelope",_11c2.document);
_11c2.header=_11c3.resolve("soap:Header",_11c2.envelope);
_11c2.body=_11c3.resolve("soap:Body",_11c2.envelope);
var fault=_11c3.resolve("soap:Fault",_11c2.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11c2.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11c3.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11c3.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11c2;
};
function SOAPFault(_11c5,_11c6,_11c7){
this._operationName=_11c5;
this._operationAddress=_11c6;
this._faultString=_11c7;
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
SOAPFault.newInstance=function(_11c8,fault){
return new SOAPFault(_11c8.name,_11c8.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11cb){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11cb;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11cd=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11cd.body,this._operation);
var _11cf=this._wsdl.getSchema();
var _11d0=_11cf.lookup(this._operation);
var _11d1=_11d0.getListedDefinitions();
while(_11d1.hasNext()){
var def=_11d1.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11cd;
};
SOAPEncoder.prototype._resolve=function(_11d5,_11d6,value){
var _11d8=this._wsdl.getSchema();
if(_11d6.isSimpleValue){
this._appendText(_11d5,value,_11d6.type=="string");
}else{
var _11d9=_11d8.lookup(_11d6.type);
if(_11d9 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11d9.getListedDefinitions();
if(_11d9.isArray){
var _11db=new List(value);
var def=defs.getNext();
while(_11db.hasNext()){
var elm=this._appendElement(_11d5,def.name);
var val=_11db.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11d5,def.name);
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
SOAPEncoder.prototype._appendText=function(_11e2,value,_11e4){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11e7=false;
var i=0,c;
while(c=chars[i++]){
var _11ea=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11ea=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11ea=false;
}
break;
}
if(!_11ea){
safe+=c;
}else{
_11e7=true;
}
}
if(_11e7){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11e2.appendChild(_11e2.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11ed){
this._wsdl=wsdl;
this._operation=_11ed;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11f2){
var _11f3=null;
var _11f4=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11f6=this.resolve(id,_11f2.body);
var _11f7=_11f4.lookup(id);
var _11f8=_11f7.getListedDefinitions();
while(!_11f3&&_11f8.hasNext()){
var def=_11f8.getNext();
var elm=this.resolve(def.name,_11f6);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11f3=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11f3.importNode!=Types.UNDEFINED){
_11f3.appendChild(_11f3.importNode(e,true));
}else{
_11f3.loadXML(DOMSerializer.serialize(e));
}
}else{
_11f3=this._compute(elm,def);
}
}
return _11f3;
};
SOAPDecoder.prototype._compute=function(_11fc,_11fd){
var _11fe=null;
var _11ff=this._wsdl.getSchema();
if(_11fd.isSimpleValue){
_11fe=this._getSimpleValue(_11fc,_11fd.type);
}else{
var _1200=_11ff.lookup(_11fd.type);
if(_1200 instanceof SchemaSimpleType){
_11fe=this._getSimpleValue(_11fc,_1200.restrictionType);
}else{
var defs=_1200.getListedDefinitions();
if(_1200.isArray){
_11fe=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11fc);
while(elms.hasNext()){
var elm=elms.getNext();
_11fe.push(this._compute(elm,def));
}
}else{
_11fe={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11fc);
if(elm){
_11fe[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11fe;
};
SOAPDecoder.prototype._getSimpleValue=function(_1205,type){
var _1207=null;
if(_1205.firstChild&&_1205.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1205.childNodes.length>1){
_1205.normalize();
}
_1207=_1205.firstChild.data;
switch(type){
case Schema.types.STRING:
_1207=_1207;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1207=Number(_1207);
break;
case Schema.types.BOOLEAN:
_1207=_1207=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1207;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1208){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1208);
}
Schema.prototype._parseSchema=function(_1209){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _120a={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1209);
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
_120a[rule.getAttribute("name")]=entry;
}
return _120a;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_120f){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_120f);
}
SchemaDefinition.prototype._parse=function(_1210){
var min=_1210.getAttribute("minOccurs");
var max=_1210.getAttribute("maxOccurs");
var type=_1210.getAttribute("type");
this.name=_1210.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1216=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1216;
}else{
var elm=_1210.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1218,_1219){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1218,_1219);
}
SchemaElementType.prototype._parseListedDefinitions=function(_121a,_121b){
var els=_121a.resolveAll("s:complexType/s:sequence/s:element",_121b);
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
function SchemaComplexType(_121d,_121e){
this._definitions=new List();
this._parseListedDefinitions(_121d,_121e);
this.isArray=_121e.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_121f,_1220){
var els=_121f.resolveAll("s:sequence/s:element",_1220);
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
function SchemaSimpleType(_1223,_1224){
this.restrictionType=null;
this._parse(_1223,_1224);
}
SchemaSimpleType.prototype._parse=function(_1225,_1226){
var _1227=_1225.resolve("s:restriction",_1226);
if(_1227){
this.restrictionType=_1227.getAttribute("base").split(":")[1];
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
var _122a=null;
var _122b=DOMUtil.getXMLHTTPRequest();
_122b.open("get",url,false);
_122b.send(null);
if(_122b.responseXML){
_122a=_122b.responseXML.documentElement;
}else{
alert(_122b.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _122a;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _122c=new List();
var _122d=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_122d.hasEntries()){
while(_122d.hasNext()){
var _122e=_122d.getNext();
var name=_122e.getAttribute("name");
_122c.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _122c;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1231,_1232,_1233){
this.name=name;
this.address=_1231;
this.encoder=_1232;
this.decoder=_1233;
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
var _1237=wsdl.getOperations();
_1237.each(function(_1238){
proxy[_1238.name]=WebServiceProxy.createProxyOperation(_1238);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1239,_123a){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_123a){
var log=_123a instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1239.address+": "+_1239.name+"\n\n";
log+=DOMSerializer.serialize(_123a.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_123c){
return function(){
var _123d=new List(arguments);
var _123e=null;
if(typeof (_123d.getLast())=="function"){
var _123f=_123d.extractLast();
var _1240=_123c.encoder.encode(_123d);
this._log(_123c,_1240);
var self=this;
var _1242=_1240.asyncInvoke(_123c.address,function(_1243){
self._log(_123c,_1243);
if(_1243){
if(_1243.fault){
_123e=SOAPFault.newInstance(_123c,_1243.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_123e,_1240,_1243);
}
}else{
if(WebServiceProxy.isDOMResult){
_123e=_1243.document;
}else{
_123e=_123c.decoder.decode(_1243);
}
}
}
_1240.dispose();
_123f(_123e);
});
}else{
var _1240=_123c.encoder.encode(new List(arguments));
this._log(_123c,_1240);
var _1242=_1240.invoke(_123c.address);
this._log(_123c,_1242);
if(_1242){
if(_1242.fault){
_123e=SOAPFault.newInstance(_123c,_1242.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_123e,_1240,_1242);
}
}else{
if(WebServiceProxy.isDOMResult){
_123e=_1242.document;
}else{
_123e=_123c.decoder.decode(_1242);
}
}
}
_1240.dispose();
return _123e;
}
};
};
WebServiceProxy.handleFault=function(_1244,_1245,_1246){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1244,soapRequest:_1245,soapResponse:_1246});
}
catch(exception){
alert(_1244.getFaultString());
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
var _1247=SystemLogger.getLogger("MessageQueue");
var _1248=null;
var _1249=0;
var _124a=null;
var _124b=new Map();
var _124c=new Map();
var _124d=false;
var _124e=false;
var _124f=false;
var _1250=false;
var _1251={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1248=ConsoleMessageQueueService;
_1249=_1248.GetCurrentSequenceNumber("dummyparam!");
this.index=_1249;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_124d){
if(!MessageQueue._actions.hasEntries()){
var _1252=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_124e=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1252;
_124e=false;
}
}
}
};
this._pokeserver=function(){
if(_124d==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_124e);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_124f){
_1250=true;
}else{
_124f=true;
var self=this;
_1248.GetMessages(Application.CONSOLE_ID,this.index,function(_1254){
if(_1254!=null){
if(Types.isDefined(_1254.CurrentSequenceNumber)){
var _1255=_1254.CurrentSequenceNumber;
if(_1255<self.index){
_1247.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_1255);
}
self.index=_1255;
var _1256=new List(_1254.ConsoleActions);
if(_1256.hasEntries()){
self.evaluate(_1256);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1247.error("No sequencenumber in MessageQueue response!");
}
}
_124f=false;
if(_1250){
_1250=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_1257){
var _1258=new List();
if(_1257.hasEntries()){
_1257.each(function(_1259){
if(this._index[_1259.Id]!=true){
_1258.add(_1259);
}
this._index[_1259.Id]=true;
},this);
if(_1258.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1258);
}else{
this._actions=_1258;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_125a){
var _125b="(No reason)";
if(_125a!=null){
_125b=_125a.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_125b);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_125f){
if(_125f==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1260=null;
if(this._actions.hasEntries()){
var _1261=this._actions.extractFirst();
_1249=_1261.SequenceNumber;
_1247.debug("MessageQueue action: "+_1261.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1249+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1261.ActionType){
case "OpenView":
_1260=_1261.OpenViewParams;
if(_1260.ViewType=="ModalDialog"){
openDialogView(_1260);
}else{
_124a=_1260.ViewId;
openView(_1260);
}
break;
case "CloseView":
_1260=_1261.CloseViewParams;
_124a=_1260.ViewId;
closeView(_1260);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1261.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_124b.countEntries()+"\n";
_124b.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1247.debug(debug);
if(!_124b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1261.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1261.MessageBoxParams);
break;
case "OpenViewDefinition":
_1260=_1261.OpenViewDefinitionParams;
_124a=_1260.Handle;
openViewDefinition(_1260);
break;
case "LogEntry":
logEntry(_1261.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1260=_1261.BroadcastMessageParams;
_1247.debug("Server says: EventBroadcaster.broadcast ( \""+_1260.Name+"\", "+_1260.Value+" )");
EventBroadcaster.broadcast(_1260.Name,_1260.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_124b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1261.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1261.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1261.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1260=_1261.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1260.ViewId,entityToken:_1260.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1260=_1261.OpenGenericViewParams;
openGenericView(_1260);
break;
case "OpenExternalView":
_1260=_1261.OpenExternalViewParams;
openExternalView(_1260);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1261.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_124e);
}
function logEntry(_1264){
var _1265=_1264.Level.toLowerCase();
SystemLogger.getLogger(_1264.SenderId)[_1265](_1264.Message);
}
function openView(_1266){
var list=paramsToList(_1266.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_1266.ViewId);
def.entityToken=_1266.EntityToken;
def.flowHandle=_1266.FlowHandle;
def.position=_1251[_1266.ViewType],def.label=_1266.Label;
def.image=_1266.Image;
def.toolTip=_1266.ToolTip;
def.argument={"url":_1266.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_1266.ViewId,entityToken:_1266.EntityToken,flowHandle:_1266.FlowHandle,position:_1251[_1266.ViewType],url:_1266.Url,label:_1266.Label,image:_1266.Image,toolTip:_1266.ToolTip}));
}
}
function openDialogView(_1269){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1269.ViewId,flowHandle:_1269.FlowHandle,position:Dialog.MODAL,url:_1269.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_126a){
var _126b=_126a.DialogType.toLowerCase();
if(_126b=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_126a.Title+"\n"+_126a.Message);
}else{
Dialog[_126b](_126a.Title,_126a.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_126c){
var map={};
var _126e=false;
new List(_126c.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_126e=true;
});
var proto=ViewDefinitions[_126c.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_126c.ViewId;
}
def.argument=_126e?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1273){
var def=ViewDefinition.clone("Composite.Management.GenericView",_1273.ViewId);
def.label=_1273.Label;
def.toolTip=_1273.ToolTip;
def.image=_1273.Image;
def.argument={"url":_1273.Url,"list":paramsToList(_1273.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_1275){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_1275.ViewId);
def.label=_1275.Label;
def.toolTip=_1275.ToolTip;
def.image=_1275.Image;
def.url=_1275.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_1277){
if(StageBinding.isViewOpen(_1277.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1277.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1278){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1278.ViewId,isSuccess:_1278.Succeeded});
}
this._lockSystem=function(_1279){
var _127a=top.bindingMap.offlinetheatre;
if(_1279){
_127a.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_127a.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_124d=_1279;
};
this.handleBroadcast=function(_127c,arg){
switch(_127c){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_124a!=null&&arg==_124a){
_124a=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_124b.set(arg,true);
}else{
_1247.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_124b.hasEntries()){
_124b.del(arg);
_1247.debug("Refreshed tree: "+arg+"\n("+_124b.countEntries()+" trees left!)");
if(!_124b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_124c.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_124c.hasEntries()==true){
_124c.del(arg);
if(!_124c.hasEntries()){
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
function paramsToList(_127e){
var list=new List();
new List(_127e).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _1281=false;
var _1282=false;
var _1283=null;
var _1284=false;
var _1285=Client.qualifies();
var _1286="admin";
var _1287="123456";
this.fireOnLoad=function(){
if(_1285){
Application.lock(this);
fileEventBroadcasterSubscriptions(true);
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_SHUTDOWN,this);
SetupService=WebServiceProxy.createProxy(Constants.URL_WSDL_SETUPSERVICE);
ReadyService=WebServiceProxy.createProxy(Constants.URL_WSDL_READYSERVICE);
LoginService=WebServiceProxy.createProxy(Constants.URL_WSDL_LOGINSERVICE);
InstallationService=WebServiceProxy.createProxy(Constants.URL_WSDL_INSTALLSERVICE);
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_KICKSTART);
}else{
document.location="unsupported.aspx";
}
};
this.handleBroadcast=function(_1288){
switch(_1288){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1288);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1289=window.bindingMap.appwindow;
_1289.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_128a){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_128b){
if(_128a){
EventBroadcaster.subscribe(_128b,KickStart);
}else{
EventBroadcaster.unsubscribe(_128b,KickStart);
}
});
}
function kickStart(_128c){
switch(_128c){
case BroadcastMessages.AUDIO_INITIALIZED:
_1282=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1281=true;
break;
}
if(_1281&&_1282){
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
DataManager.getDataBinding("username").setValue(_1286);
DataManager.getDataBinding("password").setValue(_1287);
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
this.doLogin=function(_128f,_1290){
var _1291=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1292=false;
var _1293=LoginService.ValidateAndLogin(_128f,_1290);
if(_1293 instanceof SOAPFault){
alert(_1293.getFaultString());
}else{
_1292=_1293;
}
if(_1292){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1291){
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
var _1294=DataManager.getDataBinding("username");
var _1295=DataManager.getDataBinding("password");
_1294.blur();
_1295.blur();
_1294.setValue("");
_1295.setValue("");
_1294.clean();
_1295.clean();
_1294.focus();
document.getElementById("loginerror").style.display="block";
var _1296={handleAction:function(_1297){
document.getElementById("loginerror").style.display="none";
_1297.target.removeActionListener(Binding.ACTION_DIRTY,_1296);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1296);
}
WindowManager.fireOnLoad(this);
if(!_1285){
UpdateManager.isEnabled=false;
}
};

