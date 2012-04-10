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
_BroadcastMessages.prototype={APPLICATION_STARTUP:"application startup",APPLICATION_LOGIN:"application login",APPLICATION_LOGOUT:"application logout",APPLICATION_OPERATIONAL:"application operational",APPLICATION_ONSHUTDOWN:"application onshutdown",APPLICATION_SHUTDOWN:"application shutdown",APPLICATION_ERROR:"application error",APPLICATION_BLURRED:"application blurred",APPLICATION_FOCUSED:"application focused",APPLICATION_KICKSTART:"application kickstart",CODEMIRROR_LOADED:"codemirror loaded",MOUSEEVENT_MOUSEDOWN:"mouseevent mousedown",MOUSEEVENT_MOUSEUP:"mouseevent mouseup",MOUSEEVENT_MOUSEMOVE:"mouseevent mousemove",$WINKEY_LOADED:"${windowkey} loaded",$WINKEY_UNLOADED:"${windowkey} unloaded",$WINKEY_EVALUATED:"${windowkey} evaluated",$WINKEY_RESIZED:"${windowkey} resized",$WINKEY_HRESIZED:"${windowkey} horizontally resized",$WINKEY_VRESIZED:"${windowkey} vertically resized",LOADED_NAVIGATOR:"navigator loaded",LOADED_MAINSTAGE:"mainstage loaded",LOCALSTORE_INITIALIZED:"localstore initialized",PERSISTANCE_INITIALIZED:"persistance initialized",AUDIO_INITIALIZED:"audio initialized",STAGE_INITIALIZED:"stage initialized",KEY_SHIFT_DOWN:"shiftkeydown",KEY_SHIFT_UP:"shiftkeyup",KEY_CONTROL_DOWN:"controlkeydown",KEY_CONTROL_UP:"controlkeyup",KEY_ARROW:"arrowkey",KEY_ENTER:"enterkeydown",KEY_ESCAPE:"escapekeydown",KEY_SPACE:"spacekeydown",KEY_TAB:"tabkeydown",KEY_ALT:"altkeydown",KEY_CONTROLTAB:"controltabkeysdown",TYPEDRAG_START:"typedrag start",TYPEDRAG_STOP:"typedrag stop",TYPEDRAG_PAUSE:"typedrag pause",DOCK_MAXIMIZED:"dockmaximized",DOCK_MINIMIZED:"dockminimized",DOCK_NORMALIZED:"docknormalized",DOCKTABBINDING_SELECT:"docktab select",SYSTEMTREEBINDING_REFRESH:"systemtree refresh",SYSTEMTREEBINDING_REFRESHALL:"systemtree refresh all",SYSTEMTREEBINDING_REFRESHING:"systemtree refreshing",SYSTEMTREEBINDING_REFRESHED:"systemtree refreshed",SYSTEMTREEBINDING_FOCUS:"systemtree focus",SYSTEMTREEBINDING_CUT:"systemtree cut",SYSTEMTREEBINDING_COPY:"systemtree copy",SYSTEMTREEBINDING_PASTE:"systemtree paste",SYSTEMTREEBINDING_COLLAPSEALL:"systemtree collapse all",SYSTEMTREENODEBINDING_FOCUS:"systemtreenode focus",SYSTEMTREEBINDING_LOCKTOEDITOR:"systemtreenode lock to editor",SYSTEMTREENODEBINDING_FORCE_OPEN:"systemtreenode force open",SYSTEMTREENODEBINDING_FORCING_OPEN:"systemtreenode forcing open",SYSTEMTREENODEBINDING_FORCED_OPEN:"systemtreenode forced open",START_COMPOSITE:"startcomposite",STOP_COMPOSITE:"stopcomposite",COMPOSITE_START:"compositestart",COMPOSITE_STOP:"compositestop",VIEW_OPENING:"view opening",VIEW_OPENED:"view opened",VIEW_COMPLETED:"view completed",CLOSE_VIEW:"close view",CLOSE_VIEWS:"close views",VIEW_CLOSED:"view closed",TINYMCE_INITIALIZED:"tinymce initialized",CODEPRESS_INITIALIZED:"codepress initialized",VISUALEDITOR_FOCUSED:"visualeditor focused",VISUALEDITOR_BLURRED:"visualditor blurred",VISUALEDITOR_HACKED:"visualeditor hacked",PERSPECTIVE_CHANGED:"perspective changed",PERSPECTIVES_NONE:"no perspectives",SYSTEMLOG_OPENED:"systemlog opened",SYSTEMLOG_CLOSED:"systemlog closed",SYSTEMACTION_INVOKE:"systemaction invoke",SYSTEMACTION_INVOKED:"systemaction invoked",SYSTEM_ACTIONPROFILE_PUBLISHED:"system actionprofile published",NAVIGATOR_TREENODE_SELECTED:"navigator treenode selected",MODAL_DIALOG_OPENED:"modal dialog invoked",MODAL_DIALOG_CLOSED:"modal dialog closed",COVERBINDING_MOUSEDOWN:"userinterfacecoverbinding mousedown",SERVER_OFFLINE:"server offline",SERVER_ONLINE:"server online",OFFLINE_FLASH_INITIALIZED:"offline flash initialized",CLOSE_CURRENT:"close current",CLOSE_ALL:"close all",CLOSE_ALL_DONE:"close all done",SAVE_CURRENT:"save current",CURRENT_SAVED:"current saved",SAVE_ALL:"save all",SAVE_ALL_DONE:"save all done",DOCKTAB_DIRTY:"docktab dirty",DOCKTAB_CLEAN:"docktab clean",BINDING_RELATE:"binding relate",LOCALIZATION_CHANGED:"localization changed",XHTML_MARKUP_ON:"xhtml markup on",XHTML_MARKUP_OFF:"xhtml markup off",XHTML_MARKUP_ACTIVATE:"xhtml markup activate",XHTML_MARKUP_DEACTIVATE:"xhtml markup deactivate",HIGHLIGHT_KEYWORDS:"highlight keywords",BIND_TOKEN_TO_VIEW:"bind entitytoken to view",STAGEDIALOG_OPENED:"stage dialog opened",INVOKE_DEFAULT_ACTION:"invoke default action",LANGUAGES_UPDATED:"LocalesUpdated",FROMLANGUAGE_UPDATED:"ForeignLocaleChanged",TOLANGUAGE_UPDATED:"ActiveLocaleChanged",MESSAGEQUEUE_REQUESTED:"messagequeue requested",MESSAGEQUEUE_EVALUATED:"messagequeue evaluated",UPDATE_LANGUAGES:"update languages"};
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
DataInputSelectorBinding.prototype.buildButton=function(){
var _8d2=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8d2.popupBindingTargetElement=this.shadowTree.input;
_8d2.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8d2.attach();
var self=this;
_8d2.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8d2;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8d5=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8d5).each(function(_8d6){
if(_8d6.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8d7=_8d6.getAttribute("value");
var _8d8=_8d6.getAttribute("selected");
var _8d9=_8d6.getAttribute("tooltip");
list.add({value:_8d7?_8d7:null,toolTip:_8d9?_8d9:null,isSelected:(_8d8&&_8d8=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8db=this._menuBodyBinding;
var _8dc=_8db.bindingDocument;
while(_8db.bindingElement.hasChildNodes()){
var node=_8db.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8db.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8de=list.getNext();
var _8df=MenuItemBinding.newInstance(_8dc);
_8df.setLabel(_8de.value);
_8df.selectionValue=_8de.value;
if(_8de.toolTip){
_8df.setToolTip(_8de.toolTip);
}
if(_8de.isSelected){
this.select(_8df,true);
}
_8db.add(_8df);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8e0){
this.select(_8e0);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8e1,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8e1,arg);
switch(_8e1){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8e1,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8e3){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8e3);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8e4){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8e4);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8e5=this.bindingElement.offsetWidth+"px";
var _8e6=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8e6.style.minWidth=_8e5;
}else{
_8e6.style.width=_8e5;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8e7=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8e8=this.getValue();
var _8e9=null;
_8e7.each(function(item){
if(item.getLabel()==_8e8){
_8e9=item;
}
});
if(_8e9){
_8e9.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8ec){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8ec){
this.dirty();
this.dispatchAction(DataInputSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
this.shadowTree.input.focus();
};
DataInputSelectorBinding.prototype._attachSelections=SelectorBinding.prototype._attachSelections;
DataInputSelectorBinding.prototype.setResult=DataInputSelectorBinding.prototype.setValue;
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
var _8ed=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8ed.setImage("${icon:popup}");
this.addFirst(_8ed);
_8ed.attach();
var self=this;
_8ed.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8ef=self.getProperty("handle");
var _8f0=ViewDefinitions[_8ef];
if(_8f0 instanceof DialogViewDefinition){
_8f0.handler={handleDialogResponse:function(_8f1,_8f2){
self._isButtonClicked=false;
if(_8f1==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8f3=_8f2.getFirst();
self.setValue(_8f3);
self.validate(true);
}
self.focus();
}};
_8f0.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8f0);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8ed.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8ed;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8f5=this._dialogButtonBinding;
if(_8f5!=null){
_8f5.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8f7=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8f7=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8f7;
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
var _8fc=ViewDefinitions[self.handle];
if(_8fc instanceof DialogViewDefinition){
_8fc.handler={handleDialogResponse:function(_8fd,_8fe){
self._isButtonClicked=false;
if(_8fd==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into ImageInputDialogBinding#buildButton");
var _8ff=_8fe.getFirst();
self.setValue(_8ff);
self.validate(true);
self.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
}
self.focus();
}};
_8fc.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8fc);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8fa.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8fa;
};
ImageInputDialogBinding.prototype.oncommand=function(){
var _901=this._dialogButtonBinding;
if(_901!=null){
_901.oncommand();
}
};
ImageInputDialogBinding.prototype.onblur=function(){
ImageInputDialogBinding.superclass.onblur.call(this);
this.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
};
ImageInputDialogBinding.prototype.validate=function(arg){
var _903=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_903=ImageInputDialogBinding.superclass.validate.call(this,arg);
}
return _903;
};
ImageInputDialogBinding.prototype.setValue=function(_904){
if(this.isReadOnly){
this.value=_904;
this.shadowTree.input.value=TreeService.GetMediaLabel(_904);
}else{
ImageInputDialogBinding.superclass.setValue.call(this,_904);
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
ImageInputDialogBinding.prototype.setReadOnly=function(_905){
var _906=this.isReadOnly;
ImageInputDialogBinding.superclass.setReadOnly.call(this,_905);
if(_906==true&&_905==false){
ImageInputDialogBinding.superclass.setValue.call(this,this.value);
}
if(_906==false&&_905==true){
this.value=ImageInputDialogBinding.superclass.getValue.call(this);
var _907=TreeService.GetMediaLabel(this.value);
this.shadowTree.input.value=_907;
this.shadowTree.input.title=_907;
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
var _908=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _909=this.getProperty("image");
if(_909!=null){
_908.setImage(_909);
}else{
_908.setImage("${icon:popup}");
}
this.addFirst(_908);
_908.attach();
var self=this;
_908.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_908;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _90b=this._dialogButtonBinding;
if(_90b!=null){
_90b.oncommand();
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
var _90c=this.getProperty("label");
var _90d=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_90c!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_90c+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_90c);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_90d!=null){
this._buttonBinding.setToolTip(_90d);
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
DataDialogBinding.prototype.handleAction=function(_90f){
DataDialogBinding.superclass.handleAction.call(this,_90f);
var _910=_90f.target;
var self=this;
switch(_90f.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_912,_913){
if(_912==Dialog.RESPONSE_ACCEPT){
if(_913 instanceof DataBindingMap){
self._map=_913;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_910==this._buttonBinding){
_90f.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_914,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_914,arg);
switch(_914){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _917=this.getProperty("handle");
var url=this.getURL();
var _919=null;
if(_917!=null||def!=null){
if(def!=null){
_919=def;
}else{
_919=ViewDefinitions[_917];
}
if(_919 instanceof DialogViewDefinition){
_919.handler=this._handler;
if(this._map!=null){
_919.argument=this._map;
}
StageBinding.presentViewDefinition(_919);
}
}else{
if(url!=null){
_919=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_919!=null){
this._dialogViewHandle=_919.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_91a){
this.setProperty("label",_91a);
if(this.isAttached){
this._buttonBinding.setLabel(_91a+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_91b){
this.setProperty("image",_91b);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_91b);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_91c){
this.setProperty("tooltip",_91c);
if(this.isAttached){
this._buttonBinding.setToolTip(_91c);
}
};
DataDialogBinding.prototype.setHandle=function(_91d){
this.setProperty("handle",_91d);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_91f){
this._handler=_91f;
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
DataDialogBinding.newInstance=function(_921){
var _922=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_921);
return UserInterface.registerBinding(_922,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_924,_925){
if(_924==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_925);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_926){
_926=new String(_926);
this.dirty();
this.setValue(encodeURIComponent(_926));
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
var _92a=this.getValue();
if(_92a==null){
_92a="";
}
this.shadowTree.dotnetinput.value=_92a;
};
PostBackDataDialogBinding.prototype.setValue=function(_92b){
this.setProperty("value",_92b);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_92c){
};
PostBackDataDialogBinding.newInstance=function(_92d){
var _92e=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_92d);
return UserInterface.registerBinding(_92e,PostBackDataDialogBinding);
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
var _92f=this.getProperty("dialoglabel");
var _930=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _932=this.getProperty("handle");
if(_932!=null){
var def=ViewDefinition.clone(_932,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_92f!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_92f;
}
if(_930!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_930;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_934){
var _935=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_934);
return UserInterface.registerBinding(_935,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_937){
self._datathing.setValue(_937);
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
var _93a=self.getValue();
if(_93a==""||_93a==null){
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
var _93b=this.getProperty("value");
var _93c=this.getProperty("selectorlabel");
if(_93c==null){
_93c=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_93b==null));
list.add(new SelectorBindingSelection(_93c+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_93b!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _93b=this.getValue();
if(_93b==""||_93b==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_93e){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_93e);
switch(_93e.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_93e.target==this._datathing){
var _93f=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_93f){
self._selector.setLabel(_93f);
}
},500);
_93e.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_941){
this.setProperty("label",_941);
if(this._selector!=null){
this._selector.setLabel(_941);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_942){
this._datathing.setValue(_942);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_943,_944){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_943,_944)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_945){
this._buttonBinding.setLabel(_945);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_946){
this._buttonBinding.setToolTip(_946);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_947){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_947);
switch(_947.type){
case MenuItemBinding.ACTION_COMMAND:
var _948=_947.target;
var _949=this.master;
if(_948.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_948.getLabel());
setTimeout(function(){
_949.action();
},0);
}else{
this.master.setValue("");
}
_949.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_94a){
var _94b=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_94a);
return UserInterface.registerBinding(_94b,NullPostBackDataDialogSelectorBinding);
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
var _94c=this._dataDialogBinding;
if(_94c!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_94c.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _94d=this.getProperty("editable");
var _94e=this.getProperty("selectable");
var _94f=this.getProperty("display");
if(_94d!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_94e){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_94f){
this._display=_94f;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _950=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_950.selections=this.selections;
this.add(_950);
_950.attach();
this._dataDialogBinding=_950;
this.shadowTree.datadialog=_950;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _952=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _953=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_952=_953.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_952=_953.isSelected!=true;
break;
}
if(_952){
this.shadowTree.box.appendChild(this._getElementForSelection(_953));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_955){
var box=this.shadowTree.box;
var _957=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _958=list.getNext();
if(_955){
_958.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_957=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_957=_958.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_957=_958.isSelected!=true;
break;
}
}
if(_957){
var _959=this._getElementForSelection(_958);
box.insertBefore(_959,box.firstChild);
CSSUtil.attachClassName(_959,"selected");
this._selectionMap.set(_958.value,_959);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_95a){
var _95b=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_95b.appendChild(this.bindingDocument.createTextNode(_95a.label));
_95b.setAttribute("label",_95a.label);
_95b.setAttribute("value",_95a.value);
return _95b;
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
var _95d=DOMEvents.getTarget(e);
var _95e=DOMUtil.getLocalName(_95d);
if(_95e=="div"){
this._handleMouseDown(_95d);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_95f){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _960=this._getElements();
var _961=_95f.getAttribute("value");
var _962=this._lastSelectedElement.getAttribute("value");
var _963=false;
while(_960.hasNext()){
var el=_960.getNext();
switch(el.getAttribute("value")){
case _961:
case _962:
_963=!_963;
break;
}
if(_963){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_95f);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_95f)){
this._unhilite(_95f);
}else{
this._hilite(_95f);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_95f){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_95f;
};
MultiSelectorBinding.prototype._hilite=function(_967){
var _968=_967.getAttribute("value");
if(!this._selectionMap.has(_968)){
CSSUtil.attachClassName(_967,"selected");
this._selectionMap.set(_968,_967);
}
};
MultiSelectorBinding.prototype._unhilite=function(_969){
var _96a=_969.getAttribute("value");
if(this._selectionMap.has(_96a)){
CSSUtil.detachClassName(_969,"selected");
this._selectionMap.del(_96a);
}
};
MultiSelectorBinding.prototype._isHilited=function(_96b){
return CSSUtil.hasClassName(_96b,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_96c){
MultiSelectorBinding.superclass.handleAction.call(this,_96c);
var _96d=_96c.target;
switch(_96c.type){
case DataDialogBinding.ACTION_COMMAND:
if(_96d==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_96c.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_96d.result);
this.dirty();
_96d.result=null;
_96c.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _96e=null;
if(this.isSelectable){
_96e=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_970){
if(self._isHilited(_970)){
_970.parentNode.removeChild(_970);
_96e.add(new SelectorBindingSelection(_970.getAttribute("label"),_970.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _96e;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _972=this._getElements();
if(!isUp){
_972.reverse();
}
var _973=true;
while(_973&&_972.hasNext()){
var _974=_972.getNext();
if(this._isHilited(_974)){
switch(isUp){
case true:
if(_974.previousSibling){
_974.parentNode.insertBefore(_974,_974.previousSibling);
}else{
_973=false;
}
break;
case false:
if(_974.nextSibling){
_974.parentNode.insertBefore(_974,_974.nextSibling.nextSibling);
}else{
_973=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _975=new List();
var _976=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_978){
var _979=new SelectorBindingSelection(_978.getAttribute("label"),_978.getAttribute("value"),_976);
_979.isHighlighted=self._isHilited(_978);
_975.add(_979);
});
return _975;
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
var _97a=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_97a.hasEntries()){
_97a.each(function(_97b){
_97b.parentNode.removeChild(_97b);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _97c=this.selections.getNext();
if(_97c.isSelected){
var _97d=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_97d.name=this._name;
_97d.value=_97c.value;
this.bindingElement.appendChild(_97d);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_97e){
alert(_97e);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_97f){
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
var _980={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _981=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_981.handler=this._handler;
_981.argument=_980;
StageBinding.presentViewDefinition(_981);
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
var _982={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _984={handleDialogResponse:function(_985,_986){
if(_985==Dialog.RESPONSE_ACCEPT){
self.result=_986;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _987=ViewDefinitions[this._dialogViewHandle];
_987.handler=_984;
_987.argument=_982;
StageBinding.presentViewDefinition(_987);
};
MultiSelectorDataDialogBinding.newInstance=function(_988){
var _989=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_988);
return UserInterface.registerBinding(_989,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_98a){
var id=_98a.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _98c=_98a.bindingDocument.getElementById(id);
if(_98c!=null){
var _98d=UserInterface.getBinding(_98c);
_98d.setResult(true);
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
var _98f=this.bindingDocument.getElementById(id);
if(_98f!=null){
var _990=UserInterface.getBinding(_98f);
if(_990&&!_990.isAttached){
_990.isLazy=true;
}else{
_98f.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_991){
this._isLazy=_991;
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
var _993=this.getProperty("stateprovider");
var _994=this.getProperty("handle");
if(_993!=null&&_994!=null){
url=url.replace("${stateprovider}",_993).replace("${handle}",_994);
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
EditorDataBinding.prototype._onPageInitialize=function(_995){
EditorDataBinding.superclass._onPageInitialize.call(this,_995);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_996){
EditorDataBinding.superclass.handleAction.call(this,_996);
switch(_996.type){
case Binding.ACTION_DIRTY:
if(_996.target!=this){
if(!this.isDirty){
this.dirty();
}
_996.consume();
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
EditorDataBinding.prototype.setValue=function(_997){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_998){
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
var _99d=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_99d=fake.getValue()!="";
}
if(!_99d&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_99d&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _99d;
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
var _9a1=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9a1!=null){
_9a1.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9a2){
_9a2=_9a2!=null?_9a2:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9a2;
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
var _9a3=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9a4=_9a3.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9a4;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9a4=_9a4.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9a4;
}
var self=this;
var _9a6=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9a6.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9a9=this.getProperty("label");
if(_9a9){
this.setLabel(_9a9);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9aa){
this.setProperty("label",_9aa);
if(this.shadowTree.labelBinding==null){
var _9ab=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9ab.attachClassName("fieldgrouplabel");
cell.insertBefore(_9ab.bindingElement,cell.getElementsByTagName("div").item(1));
_9ab.attach();
this.shadowTree.labelBinding=_9ab;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9aa));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9ad){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9ad.bindingElement);
return _9ad;
};
FieldGroupBinding.prototype.addFirst=function(_9ae){
var _9af=this.shadowTree[FieldGroupBinding.CENTER];
_9af.insertBefore(_9ae.bindingElement,_9af.firstChild);
return _9ae;
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
var _9b0=this.getProperty("relation");
if(_9b0!=null){
this.bindingRelation=_9b0;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9b1,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9b1,arg);
switch(_9b1){
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
FieldBinding.newInstance=function(_9b3){
var _9b4=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9b3);
return UserInterface.registerBinding(_9b4,FieldBinding);
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
var _9b5=this.getDescendantBindingByLocalName("fieldgroup");
if(_9b5!=null){
_9b5.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9b6=true;
var _9b7=this.getDescendantBindingsByLocalName("*");
while(_9b7.hasNext()){
var _9b8=_9b7.getNext();
if(Interfaces.isImplemented(IData,_9b8)){
var _9b9=_9b8.validate();
if(_9b6&&!_9b9){
_9b6=false;
}
}
}
return _9b6;
};
FieldsBinding.prototype.handleAction=function(_9ba){
FieldsBinding.superclass.handleAction.call(this,_9ba);
var _9bb=_9ba.target;
if(_9bb!=this){
switch(_9ba.type){
case Binding.ACTION_INVALID:
var _9bc=DataBinding.getAssociatedLabel(_9bb);
if(_9bc){
this._invalidFieldLabels.set(_9bb.key,_9bc);
}
if(_9bb.error){
if(!_9bb.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9bb.error},_9bb);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9ba.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9bb.key)){
this._invalidFieldLabels.del(_9bb.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9ba.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9bd=null;
if(this._invalidFieldLabels.hasEntries()){
_9bd=this._invalidFieldLabels.toList();
}
return _9bd;
};
FieldsBinding.newInstance=function(_9be){
var _9bf=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9be);
return UserInterface.registerBinding(_9bf,FieldsBinding);
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
var _9c0=this.getProperty("image");
if(_9c0){
this.setImage(_9c0);
}
var _9c1=this.getProperty("tooltip");
if(_9c1){
this.setToolTip(_9c1);
}
var _9c2=this.getProperty("label");
if(_9c2){
this.setLabel(_9c2);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9c4=this.getAncestorBindingByLocalName("field");
if(_9c4){
var _9c5=true;
_9c4.getDescendantBindingsByLocalName("*").each(function(_9c6){
if(Interfaces.isImplemented(IData,_9c6)){
_9c6.focus();
_9c5=false;
}
return _9c5;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9c7){
this.setProperty("label",_9c7);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9c7);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9c8=this.getProperty("label");
if(!_9c8){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9c8=node.data;
}
}
return _9c8;
};
FieldDescBinding.prototype.setImage=function(_9ca){
this.setProperty("image",_9ca);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9cb){
this.setProperty("tooltip",_9cb);
if(this.isAttached){
this.bindingElement.title=_9cb;
}
};
FieldDescBinding.newInstance=function(_9cc){
var _9cd=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9cc);
return UserInterface.registerBinding(_9cd,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9ce){
var _9cf=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9ce);
return UserInterface.registerBinding(_9cf,FieldDataBinding);
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
var _9d0=this._fieldHelpPopupBinding;
if(_9d0){
_9d0.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9d1=app.bindingMap.fieldhelpopupset;
var doc=_9d1.bindingDocument;
var _9d3=_9d1.add(PopupBinding.newInstance(doc));
var _9d4=_9d3.add(PopupBodyBinding.newInstance(doc));
_9d3.position=PopupBinding.POSITION_RIGHT;
_9d3.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9d4.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9d5=this.getProperty("label");
if(_9d5){
_9d4.bindingElement.innerHTML=Resolver.resolve(_9d5);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9d3;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9d6=this.getAncestorBindingByLocalName("field");
if(_9d6){
_9d6.attachClassName("fieldhelp");
var _9d7=ClickButtonBinding.newInstance(this.bindingDocument);
_9d7.attachClassName("fieldhelp");
_9d7.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9d7);
_9d7.attach();
var self=this;
_9d7.oncommand=function(){
self.attachPopupBinding();
};
_9d7.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9d7;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9d9=this._fieldHelpPopupBinding;
if(_9d9&&!_9d9.isAttached){
_9d9.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9db){
RadioDataGroupBinding.superclass.handleAction.call(this,_9db);
switch(_9db.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9dd,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9dd,arg);
switch(_9dd){
case BroadcastMessages.KEY_ARROW:
var _9df=null;
var next=null;
var _9e1=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9e1=this.getChildBindingsByLocalName("radio");
while(!_9df&&_9e1.hasNext()){
var _9e2=_9e1.getNext();
if(_9e2.getProperty("ischecked")){
_9df=_9e2;
}
}
break;
}
if(_9df){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9e1.getFollowing(_9df);
while(next!=null&&next.isDisabled){
next=_9e1.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9e1.getPreceding(_9df);
while(next!=null&&next.isDisabled){
next=_9e1.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9e3){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9e3){
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
var _9e4=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9e4.type="hidden";
_9e4.name=this._name;
this.bindingElement.appendChild(_9e4);
this.shadowTree.input=_9e4;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9e5=null;
var _9e6=this.getChildBindingsByLocalName("radio");
while(!_9e5&&_9e6.hasNext()){
var _9e7=_9e6.getNext();
if(_9e7.isChecked){
_9e5=_9e7.getProperty("value");
}
}
return _9e5;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9e8){
};
RadioDataGroupBinding.prototype.setResult=function(_9e9){
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
this.propertyMethodMap["checked"]=function(_9ea){
if(_9ea!=this.isChecked){
this.setChecked(_9ea,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9eb=this.getProperty("ischecked");
if(_9eb!=this.isChecked){
this.setChecked(_9eb,true);
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
var _9ec=this.getProperty("relate");
var _9ed=this.getProperty("oncommand");
if(_9ec){
this.bindingRelate=_9ec;
this.relate();
}
if(_9ed){
this.oncommand=function(){
Binding.evaluate(_9ed,this);
};
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
var _9ef=this.getCallBackID();
this._buttonBinding.check=function(_9f0){
RadioButtonBinding.prototype.check.call(this,_9f0);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9f1){
RadioButtonBinding.prototype.uncheck.call(this,_9f1);
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
RadioDataBinding.prototype.setChecked=function(_9f2,_9f3){
this._buttonBinding.setChecked(_9f2,_9f3);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9f2);
};
RadioDataBinding.prototype.check=function(_9f4){
this.setChecked(true,_9f4);
};
RadioDataBinding.prototype.uncheck=function(_9f5){
this.setChecked(false,_9f5);
};
RadioDataBinding.prototype.setDisabled=function(_9f6){
if(_9f6!=this.isDisabled){
this.isDisabled=_9f6;
this._buttonBinding.setDisabled(_9f6);
if(_9f6){
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
var _9f8=DOMEvents.getTarget(e);
switch(_9f8){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9f9=this.getProperty("label");
if(_9f9){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9f9)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9fa){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9fa;
}
this.setProperty("label",_9fa);
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
this.propertyMethodMap["checked"]=function(_9fb){
if(_9fb!=this.isChecked){
this.setChecked(_9fb,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9fc=this.getProperty("ischecked");
if(_9fc!=this.isChecked){
this.setChecked(_9fc,true);
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
var _9fe=DOMEvents.getTarget(e);
switch(_9fe){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9ff,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9ff,arg);
switch(_9ff){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a02){
_a02.consume();
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
var _a04=this.getCallBackID();
this._buttonBinding.check=function(_a05){
ButtonBinding.prototype.check.call(this,_a05);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a05){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a06){
ButtonBinding.prototype.uncheck.call(this,_a06);
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
if(_a04!=null){
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
var _a07=true;
var _a08=this.bindingElement.parentNode;
if(_a08){
var _a09=UserInterface.getBinding(_a08);
if(_a09&&_a09 instanceof CheckBoxGroupBinding){
if(_a09.isRequired){
if(_a09.isValid){
_a07=_a09.validate();
}else{
_a07=false;
}
}
}
}
return _a07;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a0a=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a0a.type="hidden";
_a0a.name=this._name;
_a0a.style.display="none";
this.bindingElement.appendChild(_a0a);
this.shadowTree.input=_a0a;
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
var _a0b=null;
var _a0c=this.getProperty("value");
if(this.isChecked){
_a0b=_a0c?_a0c:"on";
}
return _a0b;
};
CheckBoxBinding.prototype.setValue=function(_a0d){
if(_a0d==this.getValue()||_a0d=="on"){
this.check(true);
}else{
if(_a0d!="on"){
this.setPropety("value",_a0d);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a0e=false;
if(this.isChecked){
_a0e=this._result!=null?this._result:true;
}
return _a0e;
};
CheckBoxBinding.prototype.setResult=function(_a0f){
if(typeof _a0f=="boolean"){
this.setChecked(_a0f,true);
}else{
this._result=_a0f;
}
};
CheckBoxBinding.newInstance=function(_a10){
var _a11=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a10);
return UserInterface.registerBinding(_a11,CheckBoxBinding);
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
var _a12=true;
if(this.isRequired){
var _a13=this.getDescendantBindingsByLocalName("checkbox");
if(_a13.hasEntries()){
_a12=false;
while(_a13.hasNext()&&!_a12){
if(_a13.getNext().isChecked){
_a12=true;
}
}
}
if(_a12==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a12;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a14){
if(_a14){
if(!this._labelBinding){
var _a15=LabelBinding.newInstance(this.bindingDocument);
_a15.attachClassName("invalid");
_a15.setImage("${icon:error}");
_a15.setLabel("Selection required");
this._labelBinding=this.addFirst(_a15);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a16){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a16);
switch(_a16.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a17){
var _a18=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a17);
return UserInterface.registerBinding(_a18,CheckBoxGroupBinding);
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
var _a19=DialogControlBinding.newInstance(this.bindingDocument);
_a19.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a19);
this._controlGroupBinding.attachRecursive();
var _a1a=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a1a);
var _a1b=this.getLabel();
if(_a1b!=null){
this.setLabel(_a1b);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a1c=this._snapTargetBinding;
if(Binding.exists(_a1c)==true){
_a1c.removeActionListener(Binding.ACTION_BLURRED,this);
_a1c.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a1d){
if(Interfaces.isImplemented(IData,_a1d)){
this._snapTargetBinding=_a1d;
var _a1e=_a1d.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a1e&&_a1e.isConsumed){
this._environmentBinding=_a1e.listener;
}
if(this._environmentBinding){
_a1d.addActionListener(Binding.ACTION_BLURRED,this);
_a1d.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a1d)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a1d.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a20=this._snapTargetBinding;
var _a21=this._environmentBinding;
var root=UserInterface.getBinding(_a20.bindingDocument.body);
if(Binding.exists(_a20)&&Binding.exists(_a21)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a20.isAttached&&_a21.isAttached){
var _a23=_a20.boxObject.getUniversalPosition();
var _a24=_a21.boxObject.getUniversalPosition();
_a24.y+=_a21.bindingElement.scrollTop;
_a24.x+=_a21.bindingElement.scrollLeft;
var tDim=_a20.boxObject.getDimension();
var eDim=_a21.boxObject.getDimension();
var _a27=false;
if(_a23.y+tDim.h<_a24.y){
_a27=true;
}else{
if(_a23.x+tDim.w<_a24.x){
_a27=true;
}else{
if(_a23.y>_a24.y+eDim.h){
_a27=true;
}else{
if(_a23.x>_a24.x+eDim.w){
_a27=true;
}
}
}
}
if(!_a27){
this._setComputedPosition(_a23,_a24,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a28,_a29,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a2e=_a28;
var _a2f=false;
if(_a28.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a2f=true;
}else{
if(_a28.x+tDim.w>=_a29.x+eDim.w){
_a2f=true;
}
}
if(_a2f){
_a2e.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a2e.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a2e.y-=(bDim.h);
_a2e.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a2e);
};
BalloonBinding.prototype.handleBroadcast=function(_a30,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a30,arg);
switch(_a30){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a32){
var _a33=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a32){
_a33=true;
}
}
return _a33;
};
BalloonBinding.prototype._setPosition=function(_a35){
var _a36=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a36=true;
}
}
if(!_a36){
this.bindingElement.style.left=_a35.x+"px";
this.bindingElement.style.top=_a35.y+"px";
this._point=_a35;
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
BalloonBinding.prototype.handleAction=function(_a38){
BalloonBinding.superclass.handleAction.call(this,_a38);
var _a39=_a38.target;
switch(_a38.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a38.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a39==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a39)){
self.dispose();
}else{
if(_a39.validate()){
var _a3b=true;
if(_a38.type==Binding.ACTION_BLURRED){
var root=_a39.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a3b=false;
}
}
if(_a3b){
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
BalloonBinding.prototype.setLabel=function(_a3e){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a3f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a3e);
_a3f.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a3f);
}
this.setProperty("label",_a3e);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a41){
var _a42=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a41);
var _a43=UserInterface.registerBinding(_a42,BalloonBinding);
_a43.hide();
return _a43;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a44,_a45){
if(Interfaces.isImplemented(IData,_a45)==true){
var _a46,_a47=_a45.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a47&&_a47.isConsumed){
switch(_a47.listener.constructor){
case StageBinding:
_a46=false;
break;
case StageDialogBinding:
_a46=true;
break;
}
}
var _a48=_a46?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a49=_a48.add(BalloonBinding.newInstance(top.app.document));
_a49.setLabel(_a44.text);
_a49.snapTo(_a45);
_a49.attach();
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
var _a4a=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a4d=_a4a.getDataBinding(name);
if(_a4d){
ErrorBinding.presentError({text:text},_a4d);
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
FocusBinding.focusElement=function(_a4e){
var _a4f=true;
try{
_a4e.focus();
Application.focused(true);
}
catch(exception){
var _a50=UserInterface.getBinding(_a4e);
var _a51=SystemLogger.getLogger("FocusBinding.focusElement");
_a51.warn("Could not focus "+(_a50?_a50.toString():String(_a4e)));
_a4f=false;
}
return _a4f;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a52){
var win=_a52.bindingWindow;
var id=_a52.bindingElement.id;
return {getBinding:function(){
var _a55=null;
try{
if(Binding.exists(_a52)){
_a55=win.bindingMap[id];
}
}
catch(exception){
}
return _a55;
}};
};
FocusBinding.navigateNext=function(_a56){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a56);
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
var _a57=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a57&&_a57.isConsumed){
if(_a57.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a58){
FocusBinding.superclass.handleAction.call(this,_a58);
var _a59=_a58.target;
var _a5a=null;
if(this._isFocusManager){
switch(_a58.type){
case FocusBinding.ACTION_ATTACHED:
if(_a59!=this){
this._isUpToDate=false;
}
_a58.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a59!=this){
this._isUpToDate=false;
_a58.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a5a=new FocusCrawler();
_a5a.mode=FocusCrawler.MODE_BLUR;
_a5a.crawl(_a59.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a58.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a59!=this){
_a5a=new FocusCrawler();
_a5a.mode=FocusCrawler.MODE_FOCUS;
_a5a.crawl(_a59.bindingElement);
}
_a58.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a59)){
this.claimFocus();
this._onFocusableFocused(_a59);
}
_a58.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a59)){
this._onFocusableBlurred(_a59);
}
_a58.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a5b){
var _a5c=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a5c==null&&list.hasNext()){
var _a5e=list.getNext();
if(this._cachedFocus&&_a5e==this._cachedFocus.getBinding()){
_a5c=_a5e;
}
}
if(_a5c!=null){
if(_a5e.isFocused){
var next=_a5b?list.getPreceding(_a5c):list.getFollowing(_a5c);
if(!next){
next=_a5b?list.getLast():list.getFirst();
}
next.focus();
}else{
_a5c.focus();
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
var _a60=new FocusCrawler();
var list=new List();
_a60.mode=FocusCrawler.MODE_INDEX;
_a60.crawl(this.bindingElement,list);
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
var _a64=this._cachedFocus.getBinding();
if(_a64&&!_a64.isFocused){
_a64.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a65){
if(_a65!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a65;
_a65.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a65);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a66){
_a66.deleteProperty(FocusBinding.MARKER);
if(_a66==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a68){
this.bindingElement.style.left=_a68+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a69){
this.hiddenTabBindings.add(_a69);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a6a=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a6a.getLabel());
item.setImage(_a6a.getImage());
item.associatedTabBinding=_a6a;
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
TabsButtonBinding.prototype.handleAction=function(_a6d){
TabsButtonBinding.superclass.handleAction.call(this,_a6d);
switch(_a6d.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a6e=this.selectedTabBinding;
if(_a6e){
this.containingTabBoxBinding.moveToOrdinalPosition(_a6e,0);
this.containingTabBoxBinding.select(_a6e);
}
_a6d.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a6f){
var _a70=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a6f);
_a70.setAttribute("type","checkbox");
_a70.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a70.className="tabbutton";
return UserInterface.registerBinding(_a70,TabsButtonBinding);
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
var _a71=TabBoxBinding.currentActiveInstance;
if(_a71!=null&&Binding.exists(_a71)){
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
var _a72=this.getTabElements().getLength();
var _a73=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a72!=_a73){
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
var _a74=this.getTabPanelElements();
while(_a74.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a74.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a75=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a76=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a77=_a75>_a76?"tabsbelow":"tabsontop";
this.attachClassName(_a77);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a79=this.getTabPanelElements();
var _a7a=null;
var _a7b=this.getProperty("selectedindex");
if(_a7b!=null){
if(_a7b>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a7c=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a7e=_a79.getNext();
this.registerTabBoxPair(tab,_a7e);
if(_a7b&&_a7c==_a7b){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a7a=tab;
}
}
_a7c++;
}
if(!_a7a){
_a7a=tabs.getFirst();
_a7a.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a7f){
var _a80=null;
var _a81=null;
if(this.isEqualSize){
var _a82=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a84=this.getTabPanelElements();
_a84.each(function(_a85){
max=_a85.offsetHeight>max?_a85.offsetHeight:max;
});
_a81=max+_a82.top+_a82.bottom;
if(_a7f&&this._tabPanelsElement.style.height!=null){
_a80=this._tabPanelsElement.offsetHeight;
}
if(_a80!=null||_a81>_a80){
this._tabPanelsElement.style.height=_a81+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a86){
_a86._invalidCount=0;
_a86.addActionListener(Binding.ACTION_INVALID,this);
_a86.addActionListener(Binding.ACTION_VALID,this);
_a86.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a87){
TabBoxBinding.superclass.handleAction.call(this,_a87);
var _a88=_a87.target;
var _a89=_a87.listener;
switch(_a87.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a88.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a87.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a88.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a89._invalidCount++;
if(_a89._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a89.isSelected){
self._showWarning(_a89,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a89._invalidCount>0){
_a89._invalidCount--;
if(_a89._invalidCount==0){
if(_a89.isSelected){
this._showWarning(_a89,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a89,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a87._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a87._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a8c=DOMEvents.getTarget(e);
if(_a8c==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a8e=this.getTabPanelElements();
tabs.each(function(tab,_a90){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a91=_a8e.get(_a90);
this.registerTabBoxPair(tab,_a91);
}
},this);
var _a92=this._tabBoxPairs;
for(var key in _a92){
var tab=_a92[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a8c);
switch(_a8c.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a96=_a8c.parentNode;
if(_a96==this._tabsElement||_a96==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a8c==this._tabsElement||_a8c==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a98){
var _a99=this.getBindingForArgument(arg);
if(_a99!=null&&!_a99.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a99.select(_a98);
this.getTabPanelBinding(_a99).select(_a98);
var _a9a=this.getProperty("selectedindex");
if(_a9a!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a99.bindingElement,true));
}
this._selectedTabBinding=_a99;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a99.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a9b=this.getTabPanelBinding(_a99);
this._showBalloon(_a9b,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a9d){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a9d.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a9d};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_aa1){
var _aa2=null;
try{
var key=_aa1.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aa4=this._tabBoxPairs[key].tabPanel;
_aa2=UserInterface.getBinding(_aa4);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _aa2;
};
TabBoxBinding.prototype.getTabBinding=function(_aa5){
var key=_aa5.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aa7=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_aa7);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _aa8=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_aa8);
return _aa8;
};
TabBoxBinding.prototype.appendTabByBindings=function(_aa9,_aaa){
var _aab=_aa9.bindingElement;
_aa9.setProperty("selected",true);
var _aac=this.summonTabPanelBinding();
var _aad=_aac.bindingElement;
if(_aaa){
_aad.appendChild(_aaa instanceof Binding?_aaa.bindingElement:_aaa);
}
this.registerTabBoxPair(_aab,_aad);
UserInterface.getBinding(this._tabsElement).add(_aa9);
this._tabPanelsElement.appendChild(_aad);
_aa9.attach();
UserInterface.getBinding(_aad).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _aa9;
};
TabBoxBinding.prototype.importTabBinding=function(_aae){
var that=_aae.containingTabBoxBinding;
var _ab0=that.getTabPanelBinding(_aae);
var _ab1=_ab0.getBindingElement();
var _ab2=_aae.getBindingElement();
that.dismissTabBinding(_aae);
this._tabsElement.appendChild(_ab2);
this._tabPanelsElement.appendChild(_ab1);
this.registerTabBoxPair(_ab2,_ab1);
_aae.containingTabBoxBinding=this;
this.select(_aae);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ab3){
var _ab4=null;
if(_ab3.isSelected){
_ab4=this.getBestTab(_ab3);
this._selectedTabBinding=null;
}
var _ab5=this.getTabPanelBinding(_ab3);
this.unRegisterTabBoxPair(_ab3.bindingElement);
_ab3.dispose();
_ab5.dispose();
if(_ab4!=null){
this.select(_ab4);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_ab6){
if(_ab6.isSelected){
this.selectBestTab(_ab6);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ab7){
var _ab8=this.getBestTab(_ab7);
if(_ab8){
this.select(_ab8);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ab9){
var _aba=null;
var _abb=_ab9.getOrdinalPosition(true);
var _abc=this.getTabBindings();
var _abd=_abc.getLength();
var _abe=_abd-1;
if(_abd==1){
_aba=null;
}else{
if(_abb==_abe){
_aba=_abc.get(_abb-1);
}else{
_aba=_abc.get(_abb+1);
}
}
return _aba;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_abf,_ac0){
var _ac1=this.bindingDocument.getElementById(_abf.bindingElement.id);
var tab=this.getTabElements().get(_ac0);
this._tabsElement.insertBefore(_ac1,tab);
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
var _ac3=this._nodename_tab;
var _ac4=new List(this._tabsElement.childNodes);
var _ac5=new List();
while(_ac4.hasNext()){
var _ac6=_ac4.getNext();
if(_ac6.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ac6)==_ac3){
_ac5.add(_ac6);
}
}
return _ac5;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ac7=this._nodename_tabpanel;
var _ac8=new List(this._tabPanelsElement.childNodes);
var _ac9=new List();
_ac8.each(function(_aca){
if(_aca.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aca)==_ac7){
_ac9.add(_aca);
}
});
return _ac9;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _acb=new List();
var _acc=this.getTabElements();
_acc.each(function(_acd){
_acb.add(UserInterface.getBinding(_acd));
});
return _acb;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _ace=new List();
this.getTabPanelElements().each(function(_acf){
_ace.add(UserInterface.getBinding(_acf));
});
return _ace;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _ad0=null;
if(this._selectedTabBinding){
_ad0=this.getTabPanelBinding(this._selectedTabBinding);
}
return _ad0;
};
TabBoxBinding.prototype._showWarning=function(_ad1,_ad2){
var _ad3=this.getTabBinding(_ad1);
if(_ad2){
if(_ad3.labelBinding.hasImage){
_ad3._backupImage=_ad3.getImage();
}
_ad3.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ad3._backupImage){
_ad3.setImage(_ad3._backupImage);
}else{
_ad3.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ad4,_ad5){
var _ad6=this.getTabBinding(_ad4);
if((_ad5&&!_ad6.isSelected)||!_ad5){
if(_ad6.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ad5){
if(_ad6.labelBinding.hasImage){
_ad6._backupImage=_ad6.getImage();
}
_ad6.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_ad6._backupImage!=null){
_ad6.setImage(_ad6._backupImage);
}else{
_ad6.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_ad7){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _ada=tab.getOrdinalPosition(true);
var next=null;
var _adc=new List();
tabs.each(function(t){
if(t.isVisible){
_adc.add(t);
}
});
if(_adc.getLength()>1){
if(_ada==0&&!_ad7){
next=_adc.getLast();
}else{
if(_ada==_adc.getLength()-1&&_ad7){
next=_adc.getFirst();
}else{
if(_ad7){
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
var _adf=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_adf.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_ae0){
TabsBinding.superclass.handleAction.call(this,_ae0);
switch(_ae0.type){
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
var _ae3=self.bindingElement.offsetWidth;
if(_ae3!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_ae3;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_ae4){
if(_ae4 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_ae4);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _ae5=false;
var _ae6,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _ae9=this.constructor.TABBUTTON_IMPLEMENTATION;
var _aea=this.bindingElement.offsetWidth-_ae9.RESERVED_SPACE;
var _aeb=null;
var sum=0,_aed=0;
var _aee=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_aee){
tab=tabs.getNext();
_ae6=UserInterface.getBinding(tab);
if(!_aeb){
_aeb=_ae6;
}
sum+=tab.offsetWidth;
if(sum>=_aea){
_ae5=true;
if(_ae6.isSelected){
if(!DOMUtil.isFirstElement(_ae6.bindingElement,true)){
this.isManaging=false;
if(_aeb){
_aeb.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_ae6,_aed-1);
_aee=false;
}
}else{
_ae6.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_ae6);
}
}else{
_ae6.show();
_aeb=_ae6;
_aed++;
}
}
if(_aee){
if(_ae5&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _aef=_aeb.getBindingElement();
var _af0=_aef.offsetLeft+_aef.offsetWidth;
var _af1=this.tabsButtonBinding;
setTimeout(function(){
_af1.show(_af0+4);
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
var _af2=TabBinding.superclass.serialize.call(this);
if(_af2){
_af2.label=this.getLabel();
_af2.image=this.getImage();
_af2.tooltip=this.getToolTip();
}
return _af2;
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
var _af3=this.bindingElement.getAttribute("image");
var _af4=this.bindingElement.getAttribute("label");
var _af5=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_af4){
this.setLabel(_af4);
}
if(_af3){
this.setImage(_af3);
}
if(_af5){
this.setToolTip(_af5);
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
TabBinding.prototype.setLabel=function(_af7){
if(_af7!=null){
this.setProperty("label",_af7);
if(this.isAttached){
this.labelBinding.setLabel(_af7);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_af8){
if(_af8){
this.setProperty("tooltip",_af8);
if(this.isAttached){
this.labelBinding.setToolTip(_af8);
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
var _afa=false;
if(Client.isMozilla==true){
}
if(!_afa){
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
TabBinding.prototype.select=function(_afb){
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
TabBinding.newInstance=function(_afc){
var _afd=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_afc);
return UserInterface.registerBinding(_afd,TabBinding);
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
var _afe=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_afe=true;
this._lastKnownDimension=dim1;
}
return _afe;
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
TabPanelBinding.prototype.select=function(_b01){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b01!=true){
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
TabPanelBinding.prototype.handleAction=function(_b02){
TabPanelBinding.superclass.handleAction.call(this,_b02);
var _b03=_b02.target;
switch(_b02.type){
case BalloonBinding.ACTION_INITIALIZE:
_b02.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b04){
var _b05=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b04);
UserInterface.registerBinding(_b05,TabPanelBinding);
return UserInterface.getBinding(_b05);
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
var _b06=SplitBoxBinding.superclass.serialize.call(this);
if(_b06){
_b06.orient=this.getOrient();
_b06.layout=this.getLayout();
}
return _b06;
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
var _b07=this.getSplitPanelElements();
if(_b07.hasEntries()){
var _b08=new List(this.getLayout().split(":"));
if(_b08.getLength()!=_b07.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b07.each(function(_b09){
_b09.setAttribute("ratio",_b08.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b0a=this.getProperty("orient");
if(_b0a){
this._orient=_b0a;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b0b=this.getSplitterBindings();
while(_b0b.hasNext()){
var _b0c=_b0b.getNext();
if(_b0c&&_b0c.getProperty("collapsed")==true){
_b0c.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b0d){
SplitBoxBinding.superclass.handleAction.call(this,_b0d);
switch(_b0d.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b0d.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b0d.target);
_b0d.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b0d.target);
_b0d.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b0e){
this._getSplitPanelBindingForSplitter(_b0e).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b0f){
this._getSplitPanelBindingForSplitter(_b0f).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b10){
var _b11=DOMUtil.getOrdinalPosition(_b10.bindingElement,true);
var _b12,_b13=this.getSplitPanelElements();
switch(_b10.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b12=_b13.get(_b11);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b12=_b13.get(_b11+1);
break;
}
return UserInterface.getBinding(_b12);
};
SplitBoxBinding.prototype.invokeLayout=function(_b14){
var _b15=this.isHorizontalOrient();
var _b16=this.getSplitPanelBindings();
var _b17=this.getSplitterBindings();
var _b18=new List();
var _b19,sum=0;
var _b1b=0;
_b16.each(function(_b1c){
if(_b1c.isFixed==true){
if(!_b16.hasNext()){
_b1b+=_b1c.getFix();
}
_b18.add(0);
sum+=0;
}else{
_b19=_b1c.getRatio();
_b18.add(_b19);
sum+=_b19;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b18.getLength()!=_b16.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b1d=_b15?this.getWidth():this.getHeight();
_b1d-=_b1b;
_b17.each(function(_b1e){
if(_b1e.isVisible){
_b1d-=SplitterBinding.DIMENSION;
}
});
var unit=_b1d/sum;
var _b20=0;
var self=this;
_b16.each(function(_b22){
var span=0;
var _b24=_b18.getNext();
if(_b22.isFixed){
span=_b22.getFix();
}else{
span=Math.round(unit*_b24);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b20+=span;
while(_b20>_b1d){
_b20--;
span--;
}
if(!_b22.isFixed){
if(_b15){
_b22.setWidth(span);
}else{
_b22.setHeight(span);
}
}
});
}
if(_b14!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b25=this.getLayout();
if(_b25){
this.setProperty("layout",_b25);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b26=this.isHorizontalOrient();
var _b27=this.getSplitPanelBindings();
var _b28=this.getSplitterBindings();
var _b29=null;
var _b2a=null;
var unit=null;
var _b2c=null;
var span=null;
_b27.each(function(_b2e){
if(!unit){
unit=_b26?_b2e.getWidth():_b2e.getHeight();
}
span=_b26?_b2e.getWidth():_b2e.getHeight();
if(_b2c){
span-=_b2c;
_b2c=null;
}
_b29=_b28.getNext();
if(_b29&&_b29.offset){
_b2c=_b29.offset;
span+=_b2c;
}
_b2e.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b2f){
this.logger.debug(_b2f);
this.setProperty("layout",_b2f);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b30="",_b31=this.getSplitPanelBindings();
_b31.each(function(_b32){
_b30+=_b32.getRatio().toString();
_b30+=_b31.hasNext()?":":"";
});
this.setProperty("layout",_b30);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b33=this.getSplitPanelElements();
_b33.each(function(_b34){
layout+="1"+(_b33.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b35){
this.bindingElement.style.width=_b35+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b36){
this.bindingElement.style.height=_b36+"px";
};
SplitBoxBinding.prototype.getHeight=function(){
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
SplitBoxBinding.prototype.fit=function(_b37){
if(!this.isFit||_b37){
if(this.isHorizontalOrient()){
var max=0;
var _b39=this.getSplitPanelBindings();
_b39.each(function(_b3a){
var _b3b=_b3a.bindingElement.offsetHeight;
max=_b3b>max?_b3b:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b3c){
var _b3d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b3c);
return UserInterface.registerBinding(_b3d,SplitBoxBinding);
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
var _b40=this.getProperty("hidden");
if(_b40){
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
var _b41=this.getProperty("ratiocache");
if(_b41){
this.setRatio(_b41);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b42){
if(!this.isFixed){
if(_b42!=this.getWidth()){
if(_b42<0){
_b42=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b42+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b42);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b43=null;
if(this.isFixed){
_b43=this.getFix();
}else{
_b43=this.bindingElement.offsetWidth;
}
return _b43;
};
SplitPanelBinding.prototype.setHeight=function(_b44){
if(!this.isFixed){
if(_b44!=this.getHeight()){
try{
this.bindingElement.style.height=_b44+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b45=null;
if(this.isFixed){
_b45=this.getFix();
}else{
_b45=this.bindingElement.offsetHeight;
}
return _b45;
};
SplitPanelBinding.prototype.setRatio=function(_b46){
this.setProperty("ratio",_b46);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b47){
if(_b47){
this._fixedSpan=_b47;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b47);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b47);
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
SplitPanelBinding.newInstance=function(_b48){
var _b49=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b48);
return UserInterface.registerBinding(_b49,SplitPanelBinding);
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
var _b4a=SplitBoxBinding.superclass.serialize.call(this);
if(_b4a){
_b4a.collapse=this.getProperty("collapse");
_b4a.collapsed=this.getProperty("collapsed");
_b4a.disabled=this.getProperty("isdisabled");
}
return _b4a;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b4b=this.getProperty("hidden");
if(_b4b){
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
SplitterBinding.prototype.setCollapseDirection=function(_b4d){
this.setProperty("collapse",_b4d);
this._collapseDirection=_b4d;
};
SplitterBinding.prototype.handleAction=function(_b4e){
SplitterBinding.superclass.handleAction.call(this,_b4e);
switch(_b4e.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b4e.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b50=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b50.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b50.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b51){
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
SplitterBinding.newInstance=function(_b5c){
var _b5d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b5c);
return UserInterface.registerBinding(_b5d,SplitterBinding);
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
var _b5e=this.getProperty("selectedindex");
var _b5f=this.getDeckElements();
if(_b5f.hasEntries()){
var _b60=false;
var _b61=0;
while(_b5f.hasNext()){
var deck=_b5f.getNext();
if(_b5e&&_b61==_b5e){
deck.setAttribute("selected","true");
_b60=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b60=true;
}
}
_b61++;
}
if(!_b60){
_b5f.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b64=this.getBindingForArgument(arg);
if(_b64!=null){
if(_b64!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b64.select();
this._selectedDeckBinding=_b64;
var _b65=this.getProperty("selectedindex");
if(_b65!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b64.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b66=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b66=true;
this._lastKnownDimension=dim1;
}
return _b66;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b69){
var _b6a=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b69);
return UserInterface.registerBinding(_b6a,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b6b){
DeckBinding.superclass.handleAction.call(this,_b6b);
var _b6c=_b6b.target;
switch(_b6b.type){
case BalloonBinding.ACTION_INITIALIZE:
_b6b.consume();
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
DeckBinding.newInstance=function(_b6e){
var _b6f=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b6e);
return UserInterface.registerBinding(_b6f,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b70){
if(_b70 instanceof ToolBarBodyBinding){
if(_b70.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b70;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b70;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b70);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b71=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b71){
this.setImageSize(_b71);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b73=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b73.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b73.isDefaultContent=true;
this.add(_b73);
_b73.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b75=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b75);
}
if(_b75!=null&&_b75.hasClassName("max")){
this._maxToolBarGroup(_b75,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b77){
var _b78=this.boxObject.getDimension().w;
var _b79=CSSComputer.getPadding(this.bindingElement);
_b78-=(_b79.left+_b79.right);
if(_b77!=null){
_b78-=_b77.boxObject.getDimension().w;
if(!Client.isWindows){
_b78-=1;
}
if(Client.isExplorer){
_b78-=15;
}
}
max.bindingElement.style.width=_b78+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b7a){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b7a);
};
ToolBarBinding.prototype.addLeft=function(_b7b,_b7c){
var _b7d=null;
if(this._toolBarBodyLeft!=null){
_b7d=this._toolBarBodyLeft.add(_b7b,_b7c);
}else{
throw new Error("No left toolbarbody");
}
return _b7d;
};
ToolBarBinding.prototype.addLeftFirst=function(_b7e,_b7f){
var _b80=null;
if(this._toolBarBodyLeft){
_b80=this._toolBarBodyLeft.addFirst(_b7e,_b7f);
}else{
throw new Error("No left toolbarbody");
}
return _b80;
};
ToolBarBinding.prototype.addRight=function(_b81){
var _b82=null;
if(this._toolBarBodyRight){
_b82=this._toolBarBodyRight.add(_b81);
}else{
throw new Error("No left toolbarbody");
}
return _b82;
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
ToolBarBinding.newInstance=function(_b85){
var _b86=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b85);
return UserInterface.registerBinding(_b86,ToolBarBinding);
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
var _b87=this.getDescendantBindingsByLocalName("toolbargroup");
var _b88=new List();
var _b89=true;
_b87.each(function(_b8a){
if(_b8a.isVisible&&!_b8a.isDefaultContent){
_b88.add(_b8a);
}
});
while(_b88.hasNext()){
var _b8b=_b88.getNext();
_b8b.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b89){
_b8b.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b89=false;
}
if(!_b88.hasNext()){
_b8b.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b8e=list.getNext();
var _b8f=_b8e.getEqualSizeWidth();
if(_b8f>max){
max=_b8f;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b8e=list.getNext();
_b8e.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b90,_b91){
var _b92=ToolBarBinding.superclass.add.call(this,_b90);
if(!_b91){
if(_b90 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b92;
};
ToolBarBodyBinding.prototype.addFirst=function(_b93,_b94){
var _b95=ToolBarBinding.superclass.addFirst.call(this,_b93);
if(!_b94){
if(_b93 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b95;
};
ToolBarBodyBinding.newInstance=function(_b96){
var _b97=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b96);
return UserInterface.registerBinding(_b97,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b98){
switch(_b98){
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
var _b99=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b99)=="toolbarbody"){
UserInterface.getBinding(_b99).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b9a=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b9a)=="toolbarbody"){
UserInterface.getBinding(_b9a).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b9b){
var _b9c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b9b);
return UserInterface.registerBinding(_b9c,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b9d){
var _b9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b9d);
return UserInterface.registerBinding(_b9e,ToolBarButtonBinding);
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
var _b9f=this.getProperty("label");
var _ba0=this.getProperty("image");
if(_b9f){
this.setLabel(_b9f);
}
if(_ba0){
this.setImage(_ba0);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_ba1,_ba2){
if(this.isAttached){
this._labelBinding.setLabel(_ba1,_ba2);
}
this.setProperty("label",_ba1);
};
ToolBarLabelBinding.prototype.setImage=function(_ba3,_ba4){
if(this.isAttached){
this._labelBinding.setImage(_ba3,_ba4);
}
this.setProperty("image",_ba3);
};
ToolBarLabelBinding.newInstance=function(_ba5){
var _ba6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_ba5);
return UserInterface.registerBinding(_ba6,ToolBarLabelBinding);
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
var _ba7=this.getDescendantBindingsByLocalName("clickbutton");
if(_ba7.hasEntries()){
while(_ba7.hasNext()){
var _ba8=_ba7.getNext();
if(_ba8.isDefault){
this._defaultButton=_ba8;
_ba8.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_ba8.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_ba7;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_ba9,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_ba9,arg);
switch(_ba9){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bab=this.getAncestorBindingByType(DialogBinding,true);
if(_bab!=null&&_bab.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bac){
DialogToolBarBinding.superclass.handleAction.call(this,_bac);
var _bad=_bac.target;
var _bae=false;
var _baf=this._buttons.reset();
if(_bad instanceof ClickButtonBinding){
switch(_bac.type){
case Binding.ACTION_FOCUSED:
_bad.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bad;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bad.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bae&&_baf.hasNext()){
var _bb0=_baf.getNext();
_bae=_bb0.isFocused;
}
if(!_bae){
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
ComboBoxBinding.newInstance=function(_bb2){
var _bb3=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bb2);
return UserInterface.registerBinding(_bb3,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bb4,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bb4,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bb8=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bb8.each(function(_bb9){
var _bba=_bb9.getProperty("oncommand");
_bb9.setProperty("hiddencommand",_bba);
_bb9.deleteProperty("oncommand");
_bb9.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bbb=null;
var _bbc=this.getActiveMenuItemId();
_bb8.reset();
while(_bb8.hasNext()){
var _bbd=_bb8.getNext();
if(_bbd.getProperty("id")==_bbc){
_bbb=_bbd;
break;
}
}
if(_bbb==null&&_bb8.hasEntries()){
_bbb=_bb8.getFirst();
}
if(_bbb!=null){
this.setButton(_bbb);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bbe){
if(_bbe instanceof MenuItemBinding){
var _bbf=_bbe.getProperty("label");
var _bc0=_bbe.getProperty("image");
var _bc1=_bbe.getProperty("image-hover");
var _bc2=_bbe.getProperty("image-active");
var _bc3=_bbe.getProperty("image-disabled");
var _bc4=_bbe.getProperty("hiddencommand");
this.setLabel(_bbf?_bbf:"");
this.image=_bc0;
this.imageHover=_bc0;
this.imageActive=_bc2;
this.imageDisabled=_bc3;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bc4,this);
};
this.hideActiveItem(_bbe);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bc5){
if(_bc5 instanceof MenuItemBinding){
this.setButton(_bc5);
this.setActiveMenuItemId(_bc5.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bc6){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bc7){
if(_bc7==_bc6){
Binding.prototype.hide.call(_bc7);
}else{
Binding.prototype.show.call(_bc7);
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
var _bc9=this._views;
for(var _bca in ViewDefinitions){
var def=ViewDefinitions[_bca];
var key=def.perspective;
if(key!=null){
if(!_bc9.has(key)){
_bc9.set(key,new List());
}
var list=_bc9.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bce,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bce,arg);
switch(_bce){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bd1=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bd1.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bd1.add(StageViewMenuItemBinding.newInstance(_bd1.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bd1.show();
}else{
_bd1.hide();
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
TreeBinding.grid=function(_bd5){
var _bd6=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bd5);
var _bd8=_bd5%_bd6;
if(_bd8>0){
_bd5=_bd5-_bd8+_bd6;
}
return _bd5+TreeBodyBinding.PADDING_TOP;
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
var _bd9=this.getProperty("focusable");
if(_bd9!=null){
this._isFocusable=_bd9;
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
var _bdb=this.getProperty("builder");
if(_bdb){
this._buildFromTextArea(_bdb);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bdc=this.getProperty("selectable");
var _bdd=this.getProperty("selectionproperty");
var _bde=this.getProperty("selectionvalue");
if(_bdc){
this.setSelectable(true);
if(_bdd){
this.setSelectionProperty(_bdd);
}
if(_bde){
this.setSelectionValue(_bde);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _be1=UserInterface.getBinding(area);
var _be2=this._treeBodyBinding;
function build(){
_be2.subTreeFromString(area.value);
}
_be1.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_be3){
var _be4=_be3.getHandle();
if(this._treeNodeBindings.has(_be4)){
throw "Duplicate treenodehandles registered: "+_be3.getLabel();
}else{
this._treeNodeBindings.set(_be4,_be3);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_be4)){
_be3.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_be6){
this._treeNodeBindings.del(_be6.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_be7){
var _be8=null;
if(this._treeNodeBindings.has(_be7)){
_be8=this._treeNodeBindings.get(_be7);
}else{
throw "No such treenode: "+_be7;
}
return _be8;
};
TreeBinding.prototype.handleAction=function(_be9){
TreeBinding.superclass.handleAction.call(this,_be9);
var _bea=_be9.target;
switch(_be9.type){
case TreeNodeBinding.ACTION_OPEN:
_be9.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bea);
_be9.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bea;
this.focusSingleTreeNodeBinding(_bea);
if(!this.isFocused){
this.focus();
}
_be9.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bea;
this.focusSingleTreeNodeBinding(_bea);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bea;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bea;
this.focusSingleTreeNodeBinding(_bea);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_be9.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bea.isFocused){
this.blurSelectedTreeNodes();
}
_be9.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_beb,_bec){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bed){
if(_bed!=null&&!_bed.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bed);
_bed.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_bee){
this.blurSelectedTreeNodes();
while(_bee.hasNext()){
var _bef=_bee.getNext();
this._focusedTreeNodeBindings.add(_bef);
_bef.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _bf0=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _bf1=false;
var _bf2=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _bf3=this._focusedTreeNodeBindings.getNext();
var _bf4=_bf3.getProperty(this._selectionProperty);
if(_bf4!=null){
if(!this._selectionValue||this._selectionValue[_bf4]){
_bf2=(this._selectedTreeNodeBindings[_bf3.key]=_bf3);
var _bf5=_bf0[_bf3.key];
if(!_bf5||_bf5!=_bf2){
_bf1=true;
}
}
}
}
if(_bf2){
if(_bf1){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_bf0){
for(var key in _bf0){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _bf7=new List();
for(var key in this._selectedTreeNodeBindings){
_bf7.add(this._selectedTreeNodeBindings[key]);
}
return _bf7;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_bf9){
_bf9.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_bfa){
var _bfb=_bfa.getDescendantBindingsByLocalName("treenode");
var _bfc=true;
var self=this;
_bfb.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _bfc;
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
var _bff=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_bff!=null){
this.focusSingleTreeNodeBinding(_bff);
_bff.callback();
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
TreeBinding.prototype.add=function(_c00){
var _c01=null;
if(this._treeBodyBinding){
_c01=this._treeBodyBinding.add(_c00);
}else{
this._treeNodeBuffer.add(_c00);
_c01=_c00;
}
return _c01;
};
TreeBinding.prototype.addFirst=function(_c02){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c03=this._treeBodyBinding.bindingElement;
_c03.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c04,_c05){
if(_c05.isContainer&&_c05.isOpen){
_c05.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c06){
this._isSelectable=_c06;
if(_c06){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c07){
this._selectionProperty=_c07;
};
TreeBinding.prototype.setSelectionValue=function(_c08){
if(_c08){
var list=new List(_c08.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c0a,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c0a,arg);
switch(_c0a){
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
var _c0c=this.getFocusedTreeNodeBindings();
if(_c0c.hasEntries()){
var node=_c0c.getFirst();
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
var _c0f=this.getFocusedTreeNodeBindings();
if(_c0f.hasEntries()){
var node=_c0f.getFirst();
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
var _c12=null;
while(next==null&&(_c12=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c12!=null){
next=_c12.getNextBindingByLocalName("treenode");
}
node=_c12;
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
var _c14=DOMEvents.getTarget(e);
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
var _c15=new TreeCrawler();
var list=new List();
_c15.mode=TreeCrawler.MODE_GETOPEN;
_c15.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c18=list.getNext();
map.set(_c18.getHandle(),true);
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
var _c1d=this._positionIndicatorBinding;
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
if(y!=_c1d.getPosition().y){
_c1d.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c1d.isVisible){
_c1d.show();
}
}else{
if(_c1d.isVisible){
_c1d.hide();
}
}
}else{
if(_c1d.isVisible){
_c1d.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c20){
this._acceptingTreeNodeBinding=_c20;
this._acceptingPosition=_c20.boxObject.getLocalPosition();
this._acceptingDimension=_c20.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c20);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c21){
var map={};
var _c23=_c21.getChildBindingsByLocalName("treenode");
var _c24,pos,dim,y;
y=TreeBinding.grid(_c21.boxObject.getLocalPosition().y);
map[y]=true;
while(_c23.hasNext()){
_c24=_c23.getNext();
pos=_c24.boxObject.getLocalPosition();
dim=_c24.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c2a in this._acceptingPositions){
if(_c2a==y){
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
TreeBinding.newInstance=function(_c2b){
var _c2c=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c2b);
var _c2d=UserInterface.registerBinding(_c2c,TreeBinding);
_c2d.treeBodyBinding=TreeBodyBinding.newInstance(_c2b);
return _c2d;
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
TreeBodyBinding.prototype.accept=function(_c2e){
if(_c2e instanceof TreeNodeBinding){
this.logger.debug(_c2e);
}
};
TreeBodyBinding.prototype.handleAction=function(_c2f){
TreeBodyBinding.superclass.handleAction.call(this,_c2f);
switch(_c2f.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c2f.target);
_c2f.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c30){
var a=this.boxObject.getDimension().h;
var y=_c30.boxObject.getLocalPosition().y;
var h=_c30.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c36=_c30.labelBinding.bindingElement;
if(y-t<0){
_c36.scrollIntoView(true);
}else{
if(y-t+h>a){
_c36.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c37){
var _c38=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c37);
return UserInterface.registerBinding(_c38,TreeBodyBinding);
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
var _c39=TreeNodeBinding.superclass.serialize.call(this);
if(_c39){
_c39.label=this.getLabel();
_c39.image=this.getImage();
var _c3a=this.getHandle();
if(_c3a&&_c3a!=this.key){
_c39.handle=_c3a;
}
if(this.isOpen){
_c39.open=true;
}
if(this.isDisabled){
_c39.disabled=true;
}
if(this.dragType){
_c39.dragtype=this.dragType;
}
if(this.dragAccept){
_c39.dragaccept=this.dragAccept;
}
}
return _c39;
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
var _c3c=UserInterface.getBinding(node);
if(_c3c&&_c3c.containingTreeBinding){
this.containingTreeBinding=_c3c.containingTreeBinding;
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
var _c3d=this.key;
var _c3e=this.getProperty("handle");
if(_c3e){
_c3d=_c3e;
}
return _c3d;
};
TreeNodeBinding.prototype.setHandle=function(_c3f){
this.setProperty("handle",_c3f);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c41=this.getProperty("label");
var _c42=this.getProperty("tooltip");
var _c43=this.getProperty("oncommand");
var _c44=this.getProperty("onbindingfocus");
var _c45=this.getProperty("onbindingblur");
var _c46=this.getProperty("focused");
var _c47=this.getProperty("callbackid");
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
if(_c41!=null){
this.setLabel(_c41);
}
if(_c42!=null){
this.setToolTip(_c42);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c49=this.bindingWindow.WindowManager;
if(_c43!=null){
this.oncommand=function(){
Binding.evaluate(_c43,this);
};
}
if(_c44!=null){
this.onfocus=function(){
Binding.evaluate(_c44,this);
};
}
if(_c45!=null){
this.onblur=function(){
Binding.evaluate(_c45,this);
};
}
if(_c46==true){
this.focus();
}
if(_c47!=null){
Binding.dotnetify(this,_c47);
}
};
TreeNodeBinding.prototype.handleAction=function(_c4a){
TreeNodeBinding.superclass.handleAction.call(this,_c4a);
switch(_c4a.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c4a.target!=this){
if(this.isContainer&&!this.isOpen){
this.open();
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
TreeNodeBinding.prototype.accept=function(_c4b,_c4c){
var _c4d=true;
if(_c4b instanceof TreeNodeBinding){
var _c4e=false;
var _c4f=this.bindingElement;
var _c50=this.containingTreeBinding.bindingElement;
while(!_c4e&&_c4f!=_c50){
if(_c4f==_c4b.getBindingElement()){
_c4e=true;
}else{
_c4f=_c4f.parentNode;
}
}
if(_c4e){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c4d=false;
}else{
this.acceptTreeNodeBinding(_c4b,_c4c);
}
}else{
_c4d=false;
}
return _c4d;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c51,_c52){
var _c53=_c51.serializeToString();
var _c54=new BindingParser(this.bindingDocument);
var _c55=_c54.parseFromString(_c53).getFirst();
_c52=_c52?_c52:this.containingTreeBinding.getDropIndex();
var _c56=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c55,_c56.get(_c52));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c51.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c57=this.getProperty("image");
var _c58=this.getProperty("image-active");
var _c59=this.getProperty("image-disabled");
_c58=_c58?_c58:this.isContainer?_c57?_c57:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c57?_c57:TreeNodeBinding.DEFAULT_ITEM;
_c59=_c59?_c59:this.isContainer?_c57?_c57:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c57?_c57:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c57=_c57?_c57:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c57,imageHover:null,imageActive:_c58,imageDisabled:_c59});
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
TreeNodeBinding.prototype.setLabel=function(_c5b){
this.setProperty("label",String(_c5b));
if(this.isAttached){
this.labelBinding.setLabel(String(_c5b));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c5c){
this.setProperty("tooltip",String(_c5c));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c5c));
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
var _c5d=this.imageProfile.getDefaultImage();
var _c5e=this.imageProfile.getActiveImage();
_c5e=_c5e?_c5e:_c5d;
return this.isOpen?_c5e:_c5d;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c60=DOMEvents.getTarget(e);
var _c61=this.labelBinding.bindingElement;
var _c62=this.labelBinding.shadowTree.labelBody;
var _c63=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c60){
case _c61:
this._onAction(e);
break;
case _c62:
case _c63:
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
if(_c60.parentNode==this.bindingElement&&_c60.__updateType==Update.TYPE_INSERT){
var _c61=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c60)=="treenode"){
if(_c60==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c60,_c61.nextSibling);
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
switch(_c60){
case _c61:
case _c62:
case _c63:
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
var _c67=true;
if(e.type=="mousedown"){
var _c68=e.button==(e.target?0:1);
if(!_c68){
_c67=false;
}
}
if(_c67){
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
var _c6a=false;
if(e!=null){
_c6a=e.shiftKey;
}
this.dispatchAction(_c6a?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c6d=this.getDescendantBindingsByLocalName("treenode");
_c6d.each(function(_c6e){
_c6e.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c6f){
var _c70=_c6f.getAttribute("focused");
if(_c70=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c71){
var _c72=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c71);
return UserInterface.registerBinding(_c72,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c73){
var _c74=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c73);
return UserInterface.registerBinding(_c74,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c75){
this.bindingElement.style.left=_c75.x+"px";
this.bindingElement.style.top=_c75.y+"px";
this._geometry.x=_c75.x;
this._geometry.y=_c75.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c76){
var _c77=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c76);
return UserInterface.registerBinding(_c77,TreePositionIndicatorBinding);
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
this.addFilter(function(_c79){
var _c7a=UserInterface.getBinding(_c79);
var _c7b=null;
var _c7b=null;
if(!_c7a instanceof TreeNodeBinding){
_c7b=NodeCrawler.SKIP_NODE;
}
return _c7b;
});
this.addFilter(function(_c7c,list){
var _c7e=UserInterface.getBinding(_c7c);
var _c7f=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c7e.isOpen){
list.add(_c7e);
}
break;
}
return _c7f;
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
ShadowBinding.prototype.shadow=function(_c80){
this.targetBinding=_c80;
_c80.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c80.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c80.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c80.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c80.isVisible){
this.show();
this.setPosition(_c80.getPosition());
this.setDimension(_c80.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c81){
ShadowBinding.superclass.handleAction.call(this,_c81);
var _c82=_c81.target;
if(_c82==this.targetBinding){
switch(_c81.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c81.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c82.isVisible){
this.show();
this.setPosition(_c82.getPosition());
this.setDimension(_c82.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c83){
var _c84=this.offset-this.expand;
this.bindingElement.style.left=new String(_c83.x+_c84)+"px";
this.bindingElement.style.top=new String(_c83.y+_c84)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c86){
var _c87=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c86);
return UserInterface.registerBinding(_c87,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c88){
this.binding=_c88;
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
DockTabsButtonBinding.newInstance=function(_c89){
var _c8a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c89);
_c8a.setAttribute("type","checkbox");
_c8a.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c8a.className="tabbutton";
return UserInterface.registerBinding(_c8a,DockTabsButtonBinding);
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
var _c8b=DockBinding.superclass.serialize.call(this);
if(_c8b){
_c8b.active=this.isActive?true:null;
_c8b.collapsed=this.isCollapsed?true:null;
}
return _c8b;
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
var _c8c=UserInterface.getBinding(this.bindingElement.parentNode);
var _c8d=MatrixBinding.newInstance(this.bindingDocument);
_c8d.attachClassName("dockliner");
this.shadowTree.dockLiner=_c8d;
_c8c.add(_c8d);
_c8d.attach();
_c8d.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c8f){
var _c90=this.getSelectedTabPanelBinding();
if(_c90){
_c90.isVisible=_c8f;
_c90.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c91){
var _c92=this._getBindingForDefinition(_c91);
var _c93=DockTabBinding.newInstance(this.bindingDocument);
_c93.setHandle(_c91.handle);
_c93.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c91.label);
_c93.setImage(_c91.image);
_c93.setToolTip(_c91.toolTip);
_c93.setEntityToken(_c91.entityToken);
_c93.setAssociatedView(_c92);
this.appendTabByBindings(_c93,null);
this._setupPageBindingListeners(_c93);
var _c94=this.getTabPanelBinding(_c93);
_c92.snapToBinding(_c94);
var _c95=this.bindingWindow.bindingMap.views;
_c95.add(_c92);
if(!this.isActive){
this.activate();
}
_c92.attach();
};
DockBinding.prototype.prepareOpenView=function(_c96,_c97){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c97.setLabel(_c96.label);
_c97.setImage(_c96.image);
_c97.setToolTip(_c96.toolTip);
this._setupPageBindingListeners(_c97);
var _c98=this.getTabPanelBinding(_c97);
var _c99=this._getBindingForDefinition(_c96);
_c97.setAssociatedView(_c99);
_c99.snapToBinding(_c98);
UserInterface.getBinding(this.bindingDocument.body).add(_c99);
_c99.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c9a){
var _c9b=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c9b.bindingDocument);
view.setDefinition(_c9a);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c9d){
var _c9e=this.getTabPanelBinding(_c9d);
var self=this;
var _ca0={handleAction:function(_ca1){
var _ca2=_ca1.target;
switch(_ca1.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_ca2.reflex(true);
var view=_c9d.getAssociatedView();
if(_ca2.bindingWindow==view.getContentWindow()){
_c9d.updateDisplay(_ca2);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c9d.onPageInitialize(_ca2);
_ca1.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c9d.updateDisplay(_ca2);
_ca1.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c9d.updateEntityToken(_ca2);
_ca1.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c9d.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_c9d.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c9d);
_ca1.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c9d,true);
_ca1.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c9d);
break;
case Binding.ACTION_FORCE_REFLEX:
_c9e.reflex(true);
_ca1.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c9d.isDirty){
_c9d.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_ca4){
_c9e.addActionListener(_ca4,_ca0);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_ca5){
DockBinding.superclass.handleAction.call(this,_ca5);
var _ca6=_ca5.target;
switch(_ca5.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_ca5.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_ca6 instanceof DockBinding){
if(_ca6.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_ca6);
if(this.isActive){
_ca6.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_ca6);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_ca7,arg){
DockBinding.superclass.handleBroadcast.call(this,_ca7,arg);
switch(_ca7){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _ca9=arg;
if(_ca9.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_ca9.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_caa){
var tabs=this.getTabBindings();
var _cac=false;
while(tabs.hasNext()&&!_cac){
var tab=tabs.getNext();
var _cae=tab.getEntityToken();
if(_cae!=null&&_cae==_caa){
if(!tab.isSelected){
this.select(tab,true);
_cac=true;
}
}
}
};
DockBinding.prototype.collapse=function(_caf){
this._handleCollapse(true,_caf);
};
DockBinding.prototype.unCollapse=function(_cb0){
this._handleCollapse(false,_cb0);
};
DockBinding.prototype._handleCollapse=function(_cb1,_cb2){
var _cb3=this.getChildBindingByLocalName("dockpanels");
var _cb4=this.getAncestorBindingByLocalName("splitbox");
if(_cb1){
_cb3.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cb2&&_cb4.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cb3.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cb2){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cb1);
this.isCollapsed=_cb1;
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
DockBinding.prototype.closeTab=function(_cb9,_cba){
if(_cb9.isDirty&&!_cba){
var _cbb=Resolver.resolve(_cb9.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cbb),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cbd){
switch(_cbd){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cb9);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cb9);
break;
}
}});
}else{
this.removeTab(_cb9);
}
};
DockBinding.prototype.closeTabsExcept=function(_cbe){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cbe){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cc1){
var _cc2=_cc1.getAssociatedView();
_cc2.saveContainedEditor();
var self=this;
var _cc4={handleBroadcast:function(_cc5,arg){
switch(_cc5){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cc2.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cc4);
if(arg.isSuccess){
self.removeTab(_cc1);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cc4);
};
DockBinding.prototype.appendTabByBindings=function(_cc7,_cc8){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cc7,_cc8);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cc9){
_cc9=_cc9?_cc9+"px":"100%";
this.bindingElement.style.width=_cc9;
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
DockBinding.prototype.showControls=function(_cca){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cca){
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
var _ccd=DockControlBinding.newInstance(this.bindingDocument);
_ccd.setControlType(type);
return _ccd;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ccf=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ccf)){
_ccf=_ccf>0?_ccf-1:0;
self.bindingElement.style.width=new String(_ccf)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cd0){
DockTabsBinding.superclass.handleCrawler.call(this,_cd0);
switch(_cd0.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cd2=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cd2)){
_cd2=_cd2>0?_cd2-1:0;
self.bindingElement.style.width=new String(_cd2)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cd3){
var _cd4=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cd3);
return UserInterface.registerBinding(_cd4,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cd5){
this._viewBinding=_cd5;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cd6=DockTabBinding.superclass.serialize.call(this);
if(_cd6){
_cd6.label=null;
_cd6.image=null;
_cd6.handle=this.getHandle();
}
return _cd6;
};
DockTabBinding.prototype.setHandle=function(_cd7){
this.setProperty("handle",_cd7);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cd8){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cd8;
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
var _cd9=DialogControlBinding.newInstance(this.bindingDocument);
_cd9.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cd9);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cda){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cda){
this.isDirty=_cda;
if(Binding.exists(this.labelBinding)){
var _cdb=this.labelBinding.getLabel();
if(_cdb!=null){
this.labelBinding.setLabel(_cda?"*"+_cdb:_cdb.slice(1,_cdb.length));
}else{
this.labelBinding.setLabel(_cda?"*":"");
}
}
}
var _cdc=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cdc.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cdc.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cdd){
this.setLabel(_cdd.getLabel());
this.setImage(_cdd.getImage());
this.setToolTip(_cdd.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cde){
this.setEntityToken(_cde.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cdf){
DockTabBinding.superclass.handleAction.call(this,_cdf);
var _ce0=_cdf.target;
switch(_cdf.type){
case ControlBinding.ACTION_COMMAND:
if(_ce0.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cdf.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_ce0);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_ce1){
var cmd=_ce1.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_ce3){
if(!_ce3){
if(!this.getLabel()){
_ce3=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_ce3=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_ce3);
};
DockTabBinding.prototype.setImage=function(_ce4){
if(!_ce4){
if(!this.getImage()){
_ce4=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_ce4=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_ce4);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _ce7=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_ce7;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_ce7;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_ce7;
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
var _ce9=this.bindingElement;
setTimeout(function(){
_ce9.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cea,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cea,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cea){
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
DockTabBinding.prototype.select=function(_cef){
DockTabBinding.superclass.select.call(this,_cef);
this._updateBroadcasters();
if(_cef!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cf0=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cf1=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cf1.enable();
if(this.isDirty){
_cf0.enable();
}else{
_cf0.disable();
}
}else{
_cf1.disable();
_cf0.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cf2){
if(this._canUpdateTree||_cf2){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cf3=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cf5=win.bindingMap.savebutton;
if(_cf5!=null){
_cf3=true;
}
}
}
return _cf3;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cf6){
var _cf7=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cf6);
return UserInterface.registerBinding(_cf7,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_cf8){
var _cf9=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_cf8);
return UserInterface.registerBinding(_cf9,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_cfa){
DockPanelBinding.superclass.select.call(this,_cfa);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_cfb){
DockPanelBinding.superclass.handleCrawler.call(this,_cfb);
if(_cfb.response==null){
if(_cfb.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_cfb.id==FocusCrawler.ID){
_cfb.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_cfc){
var _cfd=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_cfc);
return UserInterface.registerBinding(_cfd,DockPanelBinding);
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
DockControlBinding.newInstance=function(_cfe){
var _cff=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cfe);
return UserInterface.registerBinding(_cff,DockControlBinding);
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
ViewBinding.getInstance=function(_d00){
var _d01=ViewBinding._instances.get(_d00);
if(!_d01){
var cry="ViewBinding.getInstance: No such instance: "+_d00;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d01;
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
var _d04=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d04){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d05=snap.boxObject.getGlobalPosition();
var _d06=snap.boxObject.getDimension();
if(!Point.isEqual(_d05,this._lastknownposition)){
this.setPosition(_d05);
this._lastknownposition=_d05;
}
if(!Dimension.isEqual(_d06,this._lastknowndimension)){
this.setDimension(_d06);
this._lastknowndimension=_d06;
var _d07=_d06.h-ViewBinding.VERTICAL_ADJUST;
_d07=_d07<0?0:_d07;
this.windowBinding.getBindingElement().style.height=new String(_d07)+"px";
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
var _d08=this._viewDefinition.flowHandle;
if(_d08!=null){
FlowControllerService.CancelFlow(_d08);
}
}
if(this._viewDefinition!=null){
var _d09=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d09);
this.logger.fine("ViewBinding closed: \""+_d09+"\"");
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
var _d0b=null;
if(this._viewDefinition!=null){
_d0b=this._viewDefinition.handle;
}
return _d0b;
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
ViewBinding.prototype.setDefinition=function(_d0c){
this._viewDefinition=_d0c;
if(_d0c.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d0d){
ViewBinding.superclass.handleAction.call(this,_d0d);
var _d0e=_d0d.target;
switch(_d0d.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d0d.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d0e.isActivated){
_d0e.onActivate();
}
}
_d0d.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d0e==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d0d.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d0e==this._snapBinding){
if(_d0e.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d0e.getContentWindow().isPostBackDocument){
if(_d0d.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d0e.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d0e==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d0e.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d0d.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d0d.type==WindowBinding.ACTION_ONLOAD){
var win=_d0e.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d0e);
}
}
}
_d0d.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d0e.label&&this._viewDefinition.label){
_d0e.label=this._viewDefinition.label;
}
if(!_d0e.image&&this._viewDefinition.image){
_d0e.image=this._viewDefinition.image;
}
if(_d0e.bindingWindow==this.getContentWindow()){
this._pageBinding=_d0e;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d0e.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d0e==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d0d.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d0d.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d13,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d13,arg);
switch(_d13){
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
var _d17=def.argument;
if(_d17!=null){
page.setPageArgument(_d17);
}
var _d18=def.width;
if(_d18!=null){
page.width=_d18;
}
var _d19=def.height;
if(_d19!=null){
page.height=_d19;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d1a){
ViewBinding.superclass.handleCrawler.call(this,_d1a);
switch(_d1a.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d1a.id==FocusCrawler.ID){
if(_d1a.previousNode!=this._snapBinding.bindingElement){
_d1a.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d1a.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d1b){
_d1b.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d1b.x+"px";
this.bindingElement.style.top=_d1b.y+"px";
};
ViewBinding.prototype.setDimension=function(_d1c){
_d1c.h-=ViewBinding.VERTICAL_ADJUST;
_d1c.w-=ViewBinding.HORIZONTAL_ADJUST;
_d1c.w-=1;
if(_d1c.h<0){
_d1c.h=0;
}
if(_d1c.w<0){
_d1c.w=0;
}
this.bindingElement.style.width=String(_d1c.w)+"px";
this.bindingElement.style.height=String(_d1c.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d1d){
this.isFlexBoxBehavior=false;
_d1d.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d1d.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_d1d.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d1d.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d1d;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d1e=null;
if(this.isFreeFloating==true){
_d1e=this._snapBinding.getBindingElement();
}else{
_d1e=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d1e;
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
ViewBinding.prototype.reload=function(_d1f){
this._isLoaded=false;
this.windowBinding.reload(_d1f);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d20=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d20=true;
}
}
if(!_d20){
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
ViewBinding.newInstance=function(_d24){
var _d25=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d24);
var _d26=UserInterface.registerBinding(_d25,ViewBinding);
_d26.windowBinding=_d26.add(WindowBinding.newInstance(_d24));
_d26.windowBinding.isFlexible=false;
return _d26;
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
var _d2e=this.bindingWindow.__doPostBack;
var _d2f=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d2f){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d30,_d31){
if(!form.__isSetup){
Application.lock(self);
_d2f=true;
}
self.manifestAllDataBindings();
_d2e(_d30,_d31);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d32,list){
var _d34=this.bindingWindow.bindingMap.__REQUEST;
if(_d34!=null&&this._isDotNet()){
switch(_d32){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d34.postback(_d32);
}
}
break;
default:
_d34.postback(_d32);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d32,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d35,list){
var _d37=this.getDescendantBindingsByType(WindowBinding);
_d37.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d35,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d3b){
list.add({name:_d3b.name,value:_d3b.value});
});
var out="";
list.each(function(_d3d){
out+=_d3d.name+": "+_d3d.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d3e){
PageBinding.superclass.handleAction.call(this,_d3e);
var _d3f=_d3e.target;
switch(_d3e.type){
case RootBinding.ACTION_PHASE_3:
if(_d3f==UserInterface.getBinding(this.bindingDocument.body)){
_d3f.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d3f);
}
_d3e.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d40=this.validateAllDataBindings();
if(_d40){
this.doPostBack(_d3f);
}
}
_d3e.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d3e.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d3f.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d3f.key)){
this._initBlockers.del(_d3f.key);
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
var _d42={handleAction:function(_d43){
if(_d43.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d42);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d42);
}else{
MessageQueue.udpdate();
}
_d3e.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d44,arg){
PageBinding.superclass.handleBroadcast.call(this,_d44,arg);
switch(_d44){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d46=arg;
if(!this._canPostBack&&!_d46){
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
PageBinding.prototype.doPostBack=function(_d48){
if(this._canPostBack){
if(_d48!=null&&this._isDotNet()){
var _d49=_d48.getCallBackID();
var _d4a=_d48.getCallBackArg();
if(_d49!=null){
_d49=_d49.replace(/_/g,"$");
}else{
_d49="";
}
if(_d4a==null){
_d4a="";
}
this.bindingWindow.__doPostBack(_d49,_d4a);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _d4b=true;
var _d4c=this.bindingWindow.DataManager.getAllDataBindings();
while(_d4c.hasNext()&&_d4b){
var _d4d=_d4c.getNext();
if(_d4d.isAttached){
var _d4e=_d4d.validate();
if(_d4b&&!_d4e){
_d4b=false;
this.logger.debug("Invalid DataBinding: "+_d4d.toString()+" ("+_d4d.getName()+")");
break;
}
}
}
return _d4b;
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
var _d56=this._cachedFocus.getBinding();
if(_d56){
_d56.blur();
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
var _d57=this.getProperty("width");
if(!_d57){
_d57=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d57;
}
if(this.height==null){
var _d58=this.getProperty("height");
this.height=_d58?_d58:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d59=this.getProperty("minheight");
if(_d59!=null){
this.minheight=_d59;
}
}
if(this.controls==null){
var _d5a=this.getProperty("controls");
this.controls=_d5a?_d5a:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d5b=this.getProperty("resizable");
this.isResizable=_d5b?_d5b:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d5c){
if(_d5c!=this.isAutoHeightLayoutMode){
if(_d5c){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d5c;
}
};
DialogPageBinding.prototype.handleAction=function(_d5d){
DialogPageBinding.superclass.handleAction.call(this,_d5d);
var _d5e=_d5d.target;
switch(_d5d.type){
case PageBinding.ACTION_ATTACHED:
if(_d5e!=this&&_d5e.isFitAsDialogSubPage){
_d5e.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d5d.consume();
if(_d5e.response!=null){
this.response=_d5e.response;
switch(_d5e.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d5f){
var _d60=this.bindingWindow.bindingMap.buttonAccept;
if(_d60!=null){
_d60.setDisabled(_d5f);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d61){
var _d62=CSSComputer.getPadding(this.bindingElement);
var _d63=CSSComputer.getBorder(this.bindingElement);
_d61+=_d62.top+_d62.bottom;
_d61+=_d63.top+_d63.bottom;
if(_d61>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d61+"px";
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
EditorPageBinding.prototype.handleAction=function(_d6b){
EditorPageBinding.superclass.handleAction.call(this,_d6b);
var _d6c=_d6b.target;
switch(_d6b.type){
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
var _d6d=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d6c.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d6d==-1){
_d6d=0;
}
}else{
_d6d++;
}
return res;
});
if(_d6d>-1){
this._messengers.del(_d6d);
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
_d6b.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d6c.key,_d6c);
if(_d6c instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d6c.key);
if(_d6c instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d6c==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d6c.getSelectedTabBinding();
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
_d6b.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d6c==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d6b.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d6c==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d6b.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d6c==this._windowBinding){
if(_d6c.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d72=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d72);
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
var _d73=this.bindingWindow.bindingMap.savebutton;
if(_d73!=null&&!_d73.isDisabled){
_d73.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d74=this.bindingWindow.bindingMap.__REQUEST;
if(_d74!=null){
_d74.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d75=this.bindingWindow.bindingMap.__REQUEST;
if(_d75!=null){
_d75.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d76){
this._message=null;
switch(_d76){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d76,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d76;
}
break;
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d76,this._messengers);
if(!this._messengers.hasEntries()){
this._saveAndPublishEditorPage();
}else{
this._message=_d76;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d76;
EditorPageBinding.superclass.postMessage.call(this,_d76,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d76,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d77,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d77,arg);
switch(_d77){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d79=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d79);
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
var _d7a=new List();
this._invalidBindings.each(function(key,_d7c){
var list=_d7c.getInvalidLabels();
if(list){
list.each(function(_d7e){
_d7a.add(_d7e);
});
}
});
if(_d7a.hasEntries()){
var _d7f="";
while(_d7a.hasNext()){
_d7f+=_d7a.getNext().toLowerCase();
if(_d7a.hasNext()){
_d7f+=", ";
}else{
_d7f+=".";
}
}
var _d80=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d80+" "+_d7f);
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
EditorPageBinding.prototype.enableSave=function(_d81){
var _d82=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d82){
var _d83=UserInterface.getBinding(_d82);
if(_d81){
_d83.enable();
}else{
_d83.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d84=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d84!=null){
UserInterface.getBinding(_d84).enable();
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
var _d85=this._windowBinding.getContentDocument().title;
if(_d85==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d86=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d88){
if(_d88.name=="__EVENTTARGET"&&_d86){
_d88.value=_d86;
}
list.add({name:_d88.name,value:_d88.value});
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
WizardPageBinding.prototype.handleAction=function(_d8a){
WizardPageBinding.superclass.handleAction.call(this,_d8a);
var _d8b=_d8a.target;
switch(_d8a.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d8b);
}else{
_d8a.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d8b);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d8a.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d8a.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d8c){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d8e=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d8c);
}
if(_d8e){
_d8e.setDisabled(!_d8c);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d8f,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d8f,arg);
var self=this;
switch(_d8f){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d93){
};
MarkupAwarePageBinding.prototype._activate=function(_d94){
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
var _d95=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d95.boxObject.getDimension().w;
_d95.hide();
var _d96=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d96+"px";
var self=this;
var _d98=this.bindingWindow.bindingMap.moreactionsbutton;
_d98.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d99){
self._showMoreActions();
_d99.consume();
}});
var _d9a=this.bindingWindow.bindingMap.moreactionspopup;
_d9a.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d9b){
var item=_d9b.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d9d,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d9d,arg);
switch(_d9d){
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
var _da1=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_da1!=null){
_da1.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _da2=this.bindingWindow.WindowManager;
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
var _da3=new String("");
this._actionProfile.each(function(_da4,list){
list.each(function(_da6){
_da3+=_da6.getHandle()+";"+_da6.getKey()+";";
if(_da6.isDisabled()){
_da3+="isDisabled='true';";
}
});
});
return _da3;
};
SystemToolBarBinding.prototype.handleAction=function(_da7){
SystemToolBarBinding.superclass.handleAction.call(this,_da7);
switch(_da7.type){
case ButtonBinding.ACTION_COMMAND:
var _da8=_da7.target;
this._handleSystemAction(_da8.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_da9){
if(_da9!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dab=list.getFirst();
var _dac=_dab.node;
}
SystemAction.invoke(_da9,_dac);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_daf,list){
var _db1=new List();
list.reset();
while(list.hasNext()){
var _db2=list.getNext();
var _db3=null;
if(_db2.isInToolBar()){
if(_db2.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_db3=self.getToolBarButtonBinding(_db2);
}
}
if(_db3!=null){
_db1.add(_db3);
}
}
if(_db1.hasEntries()){
var _db4=ToolBarGroupBinding.newInstance(doc);
_db1.each(function(_db5){
_db4.add(_db5);
});
self.addLeft(_db4);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _db6=this.bindingWindow.bindingMap.toolsbutton;
var _db7=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _db8=_db6.bindingElement.offsetLeft-this._moreActionsWidth;
var _db9=0;
var _dba=new List();
var _dbb,_dbc=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dbb=_dbc.getNext())!=null){
if(!_dbb.isVisible){
_dbb.show();
}
_db9+=_dbb.boxObject.getDimension().w;
if(_db9>=_db8){
_dba.add(_dbb);
_dbb.hide();
}
}
if(_dba.hasEntries()){
var _dbd=_dba.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dbd).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dbb=_dba.getNext())!=null){
this._moreActions.add(_dbb.associatedSystemAction);
}
_db7.show();
}else{
this._moreActions=null;
_db7.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dbe=this.bindingWindow.bindingMap.moreactionspopup;
_dbe.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dbe.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dbe.add(item);
}
_dbe.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dc0){
var _dc1=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dc2=_dc0.getLabel();
var _dc3=_dc0.getToolTip();
var _dc4=_dc0.getImage();
var _dc5=_dc0.isDisabled();
if(_dc4&&_dc4.indexOf("size=")==-1){
_dc4=_dc4+"&size="+this.getImageSize();
_dc1.imageProfile=new ImageProfile({image:_dc4});
}
if(_dc2){
_dc1.setLabel(_dc2);
}
if(_dc3){
_dc1.setToolTip(_dc3);
}
if(_dc0.isDisabled()){
_dc1.disable();
}
_dc1.associatedSystemAction=_dc0;
return _dc1;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dc6=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dc6!=null){
_dc6.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dc7){
var _dc8=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dc7);
return UserInterface.registerBinding(_dc8,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dc9){
var _dca=SystemTreeBinding.superclass.add.call(this,_dc9);
if(!this._defaultTreeNode){
if(_dc9 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dc9;
}
}
return _dca;
};
SystemTreeBinding.prototype.handleAction=function(_dcb){
SystemTreeBinding.superclass.handleAction.call(this,_dcb);
var _dcc=_dcb.target;
switch(_dcb.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_dcc.key);
this._updateFocusedNode();
_dcb.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dcb.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_dcc.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dcb.consume();
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
var _dce=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_dce);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_dcf){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_dcf);
var reg=this._entityTokenRegistry;
var _dd1=_dcf.node.getEntityToken();
if(reg.has(_dd1)){
reg.get(_dd1).add(_dcf);
}else{
reg.set(_dd1,new List([_dcf]));
}
var _dd2=null;
if(this.isLockedToEditor){
if(_dd1==StageBinding.entityToken){
if(_dcf.node.isTreeLockEnabled()){
_dd2=_dcf;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_dcf.node.getHandle()){
_dd2=_dcf;
}
}
}
if(_dd2!=null){
this.focusSingleTreeNodeBinding(_dd2);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_dd3){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_dd3);
var reg=this._entityTokenRegistry;
var _dd5=_dd3.node.getEntityToken();
if(reg.has(_dd5)){
var list=reg.get(_dd5);
list.del(_dd3);
if(!list.hasEntries()){
reg.del(_dd5);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_dd3.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_dd3.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _dd9=this._refreshingTreeNodes;
if(_dd9.hasEntries()&&_dd9.has(key)){
_dd9.del(key);
if(!_dd9.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()){
var _dda=StageBinding.entityToken;
if(_dda!=null){
this._focusTreeNodeByEntityToken(_dda);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _ddb=false;
var _ddc=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_ddb=false;
}else{
if(_ddc.hasEntries()){
_ddb=true;
while(_ddb&&_ddc.hasNext()){
var _ddd=_ddc.getNext();
if(!_ddd.isDraggable){
_ddb=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_ddb;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_dde,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_dde,arg);
switch(_dde){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_dde,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_dde);
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
var self=this,_de2=arg;
setTimeout(function(){
if(_de2!=null){
self._focusTreeNodeByEntityToken(_de2);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _de4=tab.perspectiveNode==null;
if(!_de4){
_de4=tab.perspectiveNode==this.perspectiveNode;
}
if(_de4){
var self=this,_de6=tab.getEntityToken();
setTimeout(function(){
if(_de6==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_de6);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_de7,_de8){
this.isLockFeatureFocus=true;
var _de9=null;
if(this._entityTokenRegistry.has(_de7)){
var list=this._entityTokenRegistry.get(_de7);
list.each(function(tn){
var _dec=true;
if(tn.node.isTreeLockEnabled()){
_de9=tn;
_dec=false;
}
return _dec;
});
if(_de9!=null){
if(!_de9.isFocused){
this.focusSingleTreeNodeBinding(_de9,true);
}else{
_de9.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_de9==null&&_de8!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_de7);
self._focusTreeNodeByEntityToken(_de7,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_dee){
var _def=StageBinding.perspectiveNode.getEntityToken();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _def=this.getRootTreeNodeBindings().getFirst().node.getEntityToken();
}
var _df0=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_def,_dee,_df0);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _df3=this._treeNodeBindings;
var _df4=new Map();
function fix(_df5,list){
if(!_df5.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_df3.has(node.getHandle())){
var _df8=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_df4.set(node.getHandle(),_df8);
_df5.add(_df8);
}
});
_df5.attachRecursive();
}
}
_df5.open(true);
}
map.each(function(_df9,list){
if(_df3.has(_df9)){
var _dfb=_df3.get(_df9);
fix(_dfb,list);
}else{
if(_df4.has(_df9)){
var _dfc=_df4.get(_df9);
fix(_dfc,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_dfd,arg){
switch(_dfd){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _dff=arg;
if(_dff!=null){
this._invokeServerRefresh(_dff);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e00=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e00;
_e00.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e00=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e00;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e01){
if(_e01!=null&&_e01=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e01)){
var list=this._entityTokenRegistry.get(_e01).reset();
this._refreshToken=_e01;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e03=list.getNext();
this._refreshingTreeNodes.set(_e03.key,true);
setTimeout(function(){
_e03.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e04=this.getFocusedTreeNodeBindings().getFirst();
if(_e04){
var _e05=_e04.getLabel();
var _e06=_e04.getAncestorBindingByLocalName("treenode");
if(_e06){
_e04=_e06;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e04.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e07=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e07,[_e05]);
}
_e04.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e08=SystemTreeBinding.clipboard;
if(_e08){
var type=_e08.dragType;
var _e0a=this.getFocusedTreeNodeBindings().getFirst();
if(_e0a.dragAccept){
if(_e0a.acceptor.isAccepting(type)){
this._performPaste(_e0a);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e0b){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e0b.node.hasDetailedDropSupport()){
if(_e0b.node.hasChildren()){
var _e0d=_e0b.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e0e,_e0f){
if(_e0e==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e10=_e0f.get("switch");
var _e11=_e0f.get("sibling");
if(_e10=="after"){
_e11++;
}
var _e12=_e0b.accept(SystemTreeBinding.clipboard,_e11);
if(_e12){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e0d);
}else{
Application.lock(self);
var _e13=_e0b.accept(SystemTreeBinding.clipboard,0);
if(_e13){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e13=_e0b.accept(SystemTreeBinding.clipboard,0);
if(_e13){
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
SystemTreeBinding.prototype.collapse=function(_e14){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e14){
this.blurSelectedTreeNodes();
var _e15=this.getRootTreeNodeBindings();
_e15.each(function(_e16){
if(_e16.isContainer&&_e16.isOpen){
_e16.close();
_e16.hasBeenOpened=false;
_e16.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e17){
if(_e17!=this.isLockedToEditor){
this.isLockedToEditor=_e17;
if(_e17){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e19=this.getRootTreeNodeBindings();
_e19.each(function(_e1a){
var _e1b=_e1a.getOpenSystemNodes();
if(_e1b!=null&&_e1b.hasEntries()){
list.merge(_e1b);
}else{
if(_e1a.isOpen){
list.add(_e1a.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e1c){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e1c);
if(_e1c!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e1e=new Map();
var _e1f=this.getFocusedTreeNodeBindings();
var _e20=_e1f.getFirst().node.getActionProfile();
var self=this;
_e20.each(function(_e22,list){
var _e24=new List();
list.each(function(_e25){
if(_e25.getActivePositions()&self._activePosition){
_e24.add(_e25);
}
});
if(_e24.hasEntries()){
_e1e.set(_e22,_e24);
}
});
_e1e.activePosition=this._activePosition;
return _e1e;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e26,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e26,arg);
switch(_e26){
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
var _e2b=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e2b.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e2c=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e2c.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e2d){
SystemTreePopupBinding.superclass.handleAction.call(this,_e2d);
switch(_e2d.type){
case MenuItemBinding.ACTION_COMMAND:
var _e2e=_e2d.target;
var _e2f=_e2e.associatedSystemAction;
if(_e2f){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e31=list.getFirst();
var _e32=_e31.node;
}
SystemAction.invoke(_e2f,_e32);
}else{
var cmd=_e2e.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e35=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e35=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e35=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e35=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e35=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e35){
setTimeout(function(){
EventBroadcaster.broadcast(_e35);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e36=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e36.hasNext()){
var _e37=UserInterface.getBinding(_e36.getNext());
if(!_e37.getProperty("rel")){
_e37.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e39=new List();
var self=this;
this._actionProfile.each(function(_e3b,list){
var _e3d=MenuGroupBinding.newInstance(doc);
list.each(function(_e3e){
var _e3f=self.getMenuItemBinding(_e3e);
_e3d.add(_e3f);
});
_e39.add(_e3d);
});
_e39.reverse();
while(_e39.hasNext()){
this._bodyBinding.addFirst(_e39.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e40){
var _e41=MenuItemBinding.newInstance(this.bindingDocument);
var _e42=_e40.getLabel();
var _e43=_e40.getToolTip();
var _e44=_e40.getImage();
var _e45=_e40.getDisabledImage();
var _e46=_e40.isCheckBox();
if(_e42){
_e41.setLabel(_e42);
}
if(_e43){
_e41.setToolTip(_e43);
}
if(_e44){
_e41.imageProfile=new ImageProfile({image:_e44,imageDisabled:_e45});
}
if(_e46){
_e41.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e40.isChecked()){
_e41.check(true);
}
}
if(_e40.isDisabled()){
_e41.disable();
}
_e41.associatedSystemAction=_e40;
return _e41;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e4a=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e4a=UserInterface.getBinding(node);
if(_e4a.isDisabled){
_e4a=null;
}
}
break;
}
if(_e4a!=null&&_e4a.node!=null&&_e4a.node.getActionProfile()!=null){
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
var _e4b=this.node.getLabel();
if(_e4b){
this.setLabel(_e4b);
}
var _e4c=this.node.getToolTip();
if(_e4c){
this.setToolTip(_e4c);
}
var _e4d=this.node.getHandle();
if(_e4d){
this.setHandle(_e4d);
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
var _e50="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e50+=list.getNext();
if(list.hasNext()){
_e50+=" ";
}
}
this.setProperty("dragaccept",_e50);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e52){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e52);
switch(_e52.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e52.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e52.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e53,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e53,arg);
switch(_e53){
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
var _e56=null;
var _e57=this.node.getImageProfile();
if(_e57){
if(this.isOpen){
_e56=_e57.getActiveImage();
}else{
_e56=_e57.getDefaultImage();
}
}
if(!_e56){
_e56=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e56;
};
SystemTreeNodeBinding.prototype.open=function(_e58){
var _e59=this.isContainer&&!this.isOpen;
var _e5a=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e59&&(_e5a||SystemTreeBinding.HAS_NO_MEMORY)&&_e58!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e5b=null;
if(this.isContainer){
_e5b=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e5b);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e5d){
if(_e5d!=null){
this._refreshBranch(_e5d);
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
var _e5e=new List();
var _e5f=this.node.getChildren();
this.empty();
if(_e5f.hasEntries()){
this._insertTreeNodesRegulated(_e5f);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e60){
var _e61=0;
var _e62=new List([]);
while(_e60.hasEntries()&&_e61<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e63=SystemTreeNodeBinding.newInstance(_e60.extractFirst(),this.bindingDocument);
_e63.autoExpand=this.autoExpand;
this.add(_e63);
_e63.attach();
_e61++;
if(this.autoExpand){
if(_e61==1&&!_e60.hasEntries()||LastOpenedSystemNodes.isOpen(_e63)){
_e62.add(_e63);
}
}
}
if(_e60.hasEntries()){
this._insertBufferTreeNode(_e60);
}
_e62.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e66){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e68=this.node.getDescendantBranch(list);
if(_e68.hasEntries()){
this.XXX(_e68);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e69){
var self=this;
var map=new Map();
this.empty();
_e69.each(function(key,_e6d){
if(_e6d.hasEntries()){
_e6d.each(function(node){
var _e6f=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e6f);
if(map.has(key)){
var _e70=map.get(key);
_e70.add(_e6f);
_e70.isOpen=true;
_e70.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e6f);
}else{
}
}
});
}
});
this.attachRecursive();
_e69.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e71=new TreeCrawler();
var _e72=new List();
_e71.mode=TreeCrawler.MODE_GETOPEN;
_e71.crawl(this.bindingElement,_e72);
if(_e72.hasEntries()){
_e72.extractFirst();
}
_e71.dispose();
return _e72;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e73=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e73=new List([this.node]);
list.each(function(_e75){
_e73.add(_e75.node);
});
}
return _e73;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e76,_e77){
var _e78=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e76 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e76.node.getData(),this.node.getData(),_e77?_e77:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e78);
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
SystemTreeNodeBinding.newInstance=function(node,_e7c){
var _e7d=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e7c);
var _e7e=UserInterface.registerBinding(_e7d,SystemTreeNodeBinding);
_e7e.node=node;
return _e7e;
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
SystemPageBinding.prototype.setPageArgument=function(_e7f){
this.node=_e7f;
SystemPageBinding.superclass.setPageArgument.call(this,_e7f);
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
var _e80=this.node.getChildren();
if(_e80.hasEntries()){
while(_e80.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e80.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e82=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e82.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e84=new TreeCrawler();
var _e85=new List();
_e84.mode=TreeCrawler.MODE_GETOPEN;
_e84.crawl(this.bindingElement,_e85);
_e84.dispose();
var list=new List([this.node]);
_e85.each(function(_e87){
list.add(_e87.node);
});
this._tree.empty();
var _e88=this.node.getDescendantBranch(list);
if(_e88.hasEntries()){
var self=this;
var map=new Map();
_e88.each(function(key,_e8c){
_e8c.each(function(node){
var _e8e=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e8e);
if(map.has(key)){
var _e8f=map.get(key);
_e8f.add(_e8e);
_e8f.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e8e);
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
SystemPageBinding.prototype.handleAction=function(_e90){
SystemPageBinding.superclass.handleAction.call(this,_e90);
switch(_e90.type){
case ButtonBinding.ACTION_COMMAND:
var _e91=_e90.target;
switch(_e91.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e91.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e92,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e92,arg);
switch(_e92){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e94=arg;
if(this.node&&this.node.getEntityToken()==_e94){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e94);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e94);
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
StageContainerBinding.prototype.handleBroadcast=function(_e96,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e96,arg);
var _e98=this.bindingWindow.WindowManager;
switch(_e96){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e98.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e98.WINDOW_RESIZED_BROADCAST:
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
var _e9a=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e9a.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_e9b){
if(StageBinding.isViewOpen(_e9b)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e9b);
}else{
var _e9c=ViewDefinitions[_e9b];
StageBinding.presentViewDefinition(_e9c);
}
};
StageBinding.isViewOpen=function(_e9d){
return StageBinding.bindingInstance._activeViewDefinitions[_e9d]!=null;
};
StageBinding.presentViewDefinition=function(_e9e){
if(_e9e.label!=null){
var _e9f=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e9f,[_e9e.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e9e);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ea1,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ea3=System.getPerspectiveNodes();
if(_ea3.hasEntries()){
this._initializeSystemViewDefinitions(_ea3);
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
var _ea5=null;
if(LocalStore.isEnabled){
_ea5=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ea5&&ViewDefinitions[_ea5]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ea5));
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
var _ea7=root.getActionProfile();
if(_ea7&&_ea7.hasEntries()){
var _ea8=top.app.bindingMap.toolsmenugroup;
if(_ea8){
_ea7.each(function(_ea9,list){
list.each(function(_eab){
var item=MenuItemBinding.newInstance(_ea8.bindingDocument);
item.setLabel(_eab.getLabel());
item.setToolTip(_eab.getToolTip());
item.setImage(_eab.getImage());
item.setDisabled(_eab.isDisabled());
item.associatedSystemAction=_eab;
var _ead=_ea8;
var tag=_eab.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ead=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ead.add(item);
});
});
_ea8.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_eaf){
while(_eaf.hasNext()){
var node=_eaf.getNext();
var _eb1=node.getHandle();
ViewDefinitions[_eb1]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_eb2){
StageBinding.superclass.handleAction.call(this,_eb2);
var _eb3=_eb2.target;
switch(_eb2.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_eb3;
this._inflateBinding(_eb3);
_eb2.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_eb3;
this._inflateBinding(_eb3);
_eb2.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_eb3);
_eb2.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_eb3 instanceof DockBinding){
switch(_eb3.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_eb3.reference,_eb3);
break;
}
this.handleAttachedDock(_eb3);
_eb2.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_eb3 instanceof DockBinding){
this.handleSelectedDockTab(_eb3.getSelectedTabBinding());
_eb2.consume();
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
_eb2.consume();
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
_eb2.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_eb2);
};
StageBinding.prototype.handleBroadcast=function(_eb5,arg){
StageBinding.superclass.handleBroadcast.call(this,_eb5,arg);
switch(_eb5){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _eb7=arg;
this._dontView(_eb7);
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
StageBinding.prototype._showStart=function(_eb9){
if(_eb9!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ebc=this.bindingWindow.bindingMap.maindecks;
if(_eb9){
_ebc.select("startdeck");
view.show();
}else{
view.hide();
_ebc.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_eb9;
}
};
StageBinding.prototype._inflateBinding=function(_ebd){
for(var _ebe in ViewDefinitions){
var _ebf=ViewDefinitions[_ebe];
if(_ebf instanceof SystemViewDefinition){
_ebd.mountDefinition(_ebf);
}
}
var _ec0=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ec0){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ec3=new StageCrawler();
_ec3.mode=mode;
_ec3.crawl(this.bindingElement);
_ec3.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ec4){
var _ec5=_ec4.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ec5);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ec5));
}
};
StageBinding.prototype.handleAttachedDock=function(_ec6){
var _ec7=_ec6.getTabBindings();
if(_ec7.hasEntries()){
while(_ec7.hasNext()){
var _ec8=_ec7.getNext();
var _ec9=_ec8.getHandle();
if(_ec9){
if(_ec9=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _eca=ViewDefinitions[_ec9];
if(_eca){
this._view(_ec6,_ec8,_eca,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ec9+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ecb){
var _ecc=null;
var _ecd=false;
switch(_ecb.position){
case Dialog.MODAL:
_ecc=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ecc=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ecb.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ecc=this._dockBindings.get(_ecb.position);
break;
case DockBinding.EXTERNAL:
window.open(_ecb.url);
_ecd=true;
break;
default:
var _ece=this._decksBinding.getSelectedDeckBinding();
_ecc=_ece.getDockBindingByReference(_ecb.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ecf=this.bindingWindow.bindingMap.maindecks;
_ecf.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ecd=true;
}
break;
}
if(!_ecd){
if(_ecc!=null){
this._view(_ecc,null,_ecb,true);
}else{
throw "StageBinding: Could not position view: "+_ecb.handle;
}
}
};
StageBinding.prototype._view=function(_ed0,_ed1,_ed2,_ed3){
var _ed4=_ed2.handle;
if(_ed2.isMutable){
_ed4+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ed4]){
var _ed5=ViewBinding.getInstance(_ed4);
if(_ed5!=null){
_ed5.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ed4);
}
}else{
this._activeViewDefinitions[_ed4]=_ed2;
Application.lock(this);
switch(_ed0.constructor){
case DockBinding:
if(_ed3){
_ed0.prepareNewView(_ed2);
}else{
_ed0.prepareOpenView(_ed2,_ed1);
}
break;
case StageDialogBinding:
if(_ed3){
_ed0.prepareNewView(_ed2);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ed6){
if(this._activeViewDefinitions[_ed6]!=null){
delete this._activeViewDefinitions[_ed6];
}else{
this.logger.debug("Could not unregister active view: "+_ed6);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ed7){
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
this.addFilter(function(_ed9){
var _eda=UserInterface.getBinding(_ed9);
var _edb=null;
if(_eda){
switch(_eda.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_eda.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_eda.handleUnMaximization();
break;
}
break;
case DockBinding:
_edb=NodeCrawler.SKIP_NODE;
break;
}
}
return _edb;
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
var _edc=null;
this._dialogs.each(function(_edd){
if(!_edd.isVisible){
_edc=_edd;
}
return _edc!=null;
});
if(!_edc){
this._newInstance();
_edc=this._dialogs.getLast();
}
_edc.setModal(false);
return _edc;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _ede=this.getInstance();
_ede.setModal(true);
return _ede;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _edf=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_edf);
_edf.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ee0){
if(_ee0 instanceof DialogViewDefinition){
var _ee1=ViewBinding.newInstance(this.bindingDocument);
_ee1.setDefinition(_ee0);
_ee1.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ee0.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ee0.handler)){
this._dialogResponseHandler=_ee0.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ee1;
this._body.add(_ee1);
_ee1.attach();
_ee1.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ee2){
StageDialogBinding.superclass.handleAction.call(this,_ee2);
var _ee3=_ee2.target;
switch(_ee2.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ee3);
_ee2.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ee3.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ee2.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ee3.response){
this._handleDialogPageResponse(_ee3);
}
_ee2.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ee2.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ee2.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ee3.dispose();
_ee2.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ee2.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ee2.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ee2.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ee2.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ee2.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ee3==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ee4,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ee4,arg);
switch(_ee4){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_ee6){
var _ee7=new FitnessCrawler();
var list=new List();
if(_ee6){
_ee7.mode=FitnessCrawler.MODE_BRUTAL;
}
_ee7.crawl(this.bindingElement,list);
_ee7.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_ee9){
_ee9.fit(_ee6);
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
var _eea=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_eea){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_eec){
var cmd=_eec.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_eee){
if(_eee.bindingDocument==this._viewBinding.getContentDocument()){
if(_eee instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_eee);
}
this._pageBinding=_eee;
if(_eee.height=="auto"){
_eee.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_eee);
_eee.enableAutoHeightLayoutMode(false);
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
if(_eee.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_eee);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_eef){
var _ef0=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_ef0){
var _ef1=UserInterface.getBinding(_ef0);
_ef1.setDisabled(_eef);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_ef2){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_ef2.response,_ef2.result!=null?_ef2.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_ef3){
if(_ef3.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_ef3);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_ef5){
switch(_ef5.type){
case MenuItemBinding.ACTION_COMMAND:
if(_ef5.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_ef5.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_ef6){
var _ef7=_ef6.label;
var _ef8=_ef6.image;
var _ef9=_ef6.width;
var _efa=_ef6.height;
var _efb=_ef6.controls;
var _efc=_ef6.isResizable;
if(_ef7){
this.setLabel(_ef7);
}
if(_ef8){
this.setImage(_ef8);
}
if(_ef9||_efa){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_ef9?_ef9:old.w;
}else{
nev.w=old.w;
}
nev.h=(_efa!=null&&_efa!="auto")?_efa:old.h;
this.setDimension(nev);
}
if(_efb){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f00=new List(_efb.split(" "));
while((type=_f00.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_efc!=this._isResizable){
this.setResizable(_efc);
}
if(_efa=="auto"){
this._fixAutoHeight(_ef6);
}
if(_ef6==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f01){
var dim=this.getDimension();
var _f03=0;
var _f04=0;
if(_f01.isDialogSubPage){
_f01=this._pageBinding;
}
if(this._isFirstPage){
_f03=_f01.width!=null?_f01.width:dim.w;
}else{
_f03=dim.w;
}
_f04=_f01.bindingElement.offsetHeight;
_f04+=this._titlebar.bindingElement.offsetHeight;
_f04+=4;
if(_f04<dim.h){
_f04=dim.h;
}
if(_f01.minheight!=null){
if(_f04<_f01.minheight){
_f04=_f01.minheight;
}
}
this.setDimension(new Dimension(_f03,_f04));
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
StageDialogBinding.newInstance=function(_f07){
var _f08=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f07);
var _f09=UserInterface.registerBinding(_f08,StageDialogBinding);
_f09.setProperty("controls","minimize maximize close");
return _f09;
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
this.addFilter(function(_f0a,list){
var _f0c=null;
var _f0d=UserInterface.getBinding(_f0a);
if(!_f0d.isVisible){
_f0c=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f0c;
});
this.addFilter(function(_f0e,list){
var _f10=null;
var _f11=UserInterface.getBinding(_f0e);
if(_f11.isAttached){
if(Interfaces.isImplemented(IFit,_f11)){
if(!_f11.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f11);
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
StageDecksBinding.prototype.mountDefinition=function(_f12){
var _f13=StageDeckBinding.newInstance(this.bindingDocument);
_f13.handle=_f12.handle;
_f13.perspectiveNode=_f12.node;
this._decks[_f13.handle]=_f13;
this.add(_f13);
_f13.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f14){
var _f15=this._decks[_f14];
StageBinding.perspectiveNode=_f15.perspectiveNode;
this.select(_f15);
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
StageDeckBinding.prototype.handleAction=function(_f16){
StageDeckBinding.superclass.handleAction.call(this,_f16);
var _f17=_f16.target;
switch(_f16.type){
case WindowBinding.ACTION_LOADED:
if(_f17==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f16.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f17 instanceof DockBinding){
this._dockBindings.set(_f17.reference,_f17);
_f17.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f16.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f16.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f16);
StageDeckBinding.superclass.handleAction.call(this,_f16);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f19=new StageCrawler();
_f19.mode=mode;
_f19.crawl(this.windowBinding.getContentDocument().body);
_f19.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f1a){
return this._dockBindings.get(_f1a);
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
StageDeckBinding.newInstance=function(_f1c){
var _f1d=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f1c);
var _f1e=UserInterface.registerBinding(_f1d,StageDeckBinding);
return _f1e;
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
StageSplitBoxBinding.prototype.handleAction=function(_f1f){
StageSplitBoxBinding.superclass.handleAction.call(this,_f1f);
StageBoxAbstraction.handleAction.call(this,_f1f);
var _f20=_f1f.target;
var _f21=null;
var _f22=null;
switch(_f1f.type){
case DockBinding.ACTION_EMPTIED:
_f22=this.getChildBindingByLocalName("splitter");
if(_f22.isVisible){
_f22.hide();
}
_f21=this.getDescendantBindingsByLocalName("dock");
if(_f21.getFirst().isEmpty&&_f21.getLast().isEmpty){
if(_f21.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f1f.consume();
break;
case DockBinding.ACTION_OPENED:
_f21=this.getDescendantBindingsByLocalName("dock");
if(!_f21.getFirst().isEmpty&&!_f21.getLast().isEmpty){
_f22=this.getChildBindingByLocalName("splitter");
if(!_f22.isVisible){
_f22.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f1f.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f20!=this){
_f22=this.getChildBindingByLocalName("splitter");
if(_f22.isVisible){
_f22.hide();
}
this.invokeLayout();
_f1f.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f20!=this){
var _f23=this.getChildBindingsByLocalName("splitpanel");
if(_f23.getFirst().isVisible&&_f23.getLast().isVisible){
_f22=this.getChildBindingByLocalName("splitter");
if(!_f22.isVisible){
_f22.show();
}
}
this.invokeLayout();
_f1f.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f24){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f24);
switch(_f24.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f24.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f25=this.getChildBindingsByLocalName("splitpanel");
return _f25.getFirst().isVisible&&_f25.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f26=this.getChildBindingsByLocalName("splitpanel");
return _f26.getFirst().isFixed&&_f26.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f27){
StageSplitPanelBinding.superclass.handleAction.call(this,_f27);
StageBoxAbstraction.handleAction.call(this,_f27);
switch(_f27.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f27.type==StageSplitBoxBinding.ACTION_HIDE){
_f27.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f27.type==DockBinding.ACTION_EMPTIED){
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
if(_f27.type==StageSplitBoxBinding.ACTION_SHOW){
_f27.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f2a=_f27.target;
if(_f2a!=this&&_f2a.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f2b=_f2a._containingSplitBoxBinding;
if(_f2b.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f2c=_f2b.getChildBindingsByLocalName("splitpanel");
var _f2d=_f2c.getFirst();
var _f2e=_f2c.getLast();
if(this.isFixed==true){
if(!_f2d.isFixed||!_f2e.isFixed||(!_f2b.hasBothPanelsVisible()&&_f2a.isMinimizedForReal)){
this.setFix(false);
_f27.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f2b.hasBothPanelsFixed()||(!_f2b.hasBothPanelsVisible()&&_f2a.isMinimizedForReal)){
this.setFix(_f2a.getContainedDock().getHeight());
_f27.consume();
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
var _f2f=this.getContainedDock();
if(_f2f){
if(this.isMaximizePrepared==true){
}else{
_f2f.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f30=this.getContainedDock();
if(_f30){
if(_f30.type==DockBinding.TYPE_EDITORS){
if(_f30.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f30.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f31=this.getContainedDock();
if(_f31){
_f31.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f31);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f32=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f33=this.getContainedDock();
if(_f33){
_f33.collapse(_f32);
if(!_f32){
this.setFix(_f33.getHeight());
}else{
this.setFix(_f33.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f33&&_f33.isActive){
_f33.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f33);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f34){
var _f35=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f36=this.getContainedDock();
if(_f36){
if(this.isMinimized==true){
_f36.unCollapse(_f35);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f34){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f36){
_f36.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f36);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f37){
var _f38=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f38=false;
}
}
if(_f38==true){
this._invisibilize(_f37);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f3a){
if(_f3a!=this._isInvisibilized){
if(_f3a){
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
StageSplitterBinding.prototype.onDragStart=function(_f3b){
var _f3c=top.app.bindingMap.stagesplittercover;
var _f3d=this._containingSplitBoxBinding.getOrient();
switch(_f3d){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f3c.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f3c.bindingElement.style.cursor="n-resize";
break;
}
_f3c.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f3d);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f43){
this._orient=_f43;
this.attachClassName(_f43);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f45=true;
var _f46=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f46=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f45=false;
break;
}
if(_f45){
this.bindingElement.style.left=pos.x+"px";
}
if(_f46){
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
StageBoxAbstraction.handleAction=function(_f48){
switch(_f48.type){
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
if(_f48.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f48.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f49=this.bindingElement.style;
_f49.position="absolute";
_f49.width="100%";
_f49.height="100%";
_f49.top="0";
_f49.left="0";
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
var _f4a=this.bindingElement.style;
_f4a.position="relative";
_f4a.width="auto";
_f4a.height="auto";
_f4a.top="auto";
_f4a.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f4b,_f4c){
var _f4d=_f4b.bindingElement.style;
var _f4e=_f4b.bindingElement.parentNode;
var box=_f4b._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f4c){
_f4b._unmodifiedFlexMethod=_f4b.flex;
_f4b.flex=function(){
_f4d.width=_f4e.offsetWidth+"px";
_f4d.height=_f4e.offsetHeight+"px";
};
}else{
_f4d.width="100%";
_f4d.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f4d.width="auto";
_f4d.height="auto";
box.reflex(true);
},0);
}
_f4b.flex=_f4b._unmodifiedFlexMethod;
_f4b._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f50){
var _f51=_f50.target;
switch(_f50.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f51 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f50);
_f50.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f50.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f52){
var mode=null;
switch(_f52.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f54){
StageMenuBarBinding.superclass.handleAction.call(this,_f54);
switch(_f54.type){
case MenuItemBinding.ACTION_COMMAND:
var _f55=_f54.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f55){
SystemAction.invoke(_f55,this._rootNode);
}
}
_f54.consume();
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
var _f56=this.getProperty("handle");
if(_f56){
this._handle=_f56;
if(StageBinding.isViewOpen(_f56)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f56);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f58){
this.setProperty("handle",_f58);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f59,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f59,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f59){
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
StageViewMenuItemBinding.newInstance=function(_f5b){
var _f5c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f5b);
UserInterface.registerBinding(_f5c,StageViewMenuItemBinding);
return UserInterface.getBinding(_f5c);
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
StageStatusBarBinding.prototype.setLabel=function(_f5d){
this._label.setLabel(_f5d);
};
StageStatusBarBinding.prototype.setImage=function(_f5e){
this._label.setImage(_f5e);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f5f){
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
var _f60=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f61=_f60.getAssociatedView();
var _f62=_f61.getContentWindow().bindingMap.tree;
var _f63=_f62.getFocusedTreeNodeBindings();
if(!_f63.hasEntries()&&StageBinding.treeSelector){
_f63=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f63;
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
ExplorerBinding.prototype.handleAction=function(_f64){
ExplorerBinding.superclass.handleAction.call(this,_f64);
var _f65=_f64.target;
switch(_f64.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f64.consume();
break;
case Binding.ACTION_DRAG:
if(_f65 instanceof ExplorerSplitterBinding){
_f65.dragger.registerHandler(this);
}
_f64.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f67){
this._menuBinding.setSelectionByHandle(_f67);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f68){
if(_f68 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f68);
this._menuBinding.mountDefinition(_f68);
}
};
ExplorerBinding.prototype.onDragStart=function(_f69){
var _f6a=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f6a.hasEntries()){
var _f6b=_f6a.getFirst();
this._dragStart=_f6b.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f6b.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f6f){
if(_f6f instanceof SystemViewDefinition){
var _f70=ViewBinding.newInstance(this.bindingDocument);
_f70.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f70.setDefinition(_f6f);
var _f71=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f71.setAssociatedView(_f70);
this._decks[_f6f.handle]=_f71;
_f71.add(_f70);
this.add(_f71);
function attach(){
_f71.attach();
_f70.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f72){
var _f73=this._decks[_f72];
this.select(_f73);
};
DecksBinding.prototype.expandBy=function(_f74){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f76=this.bindingElement.offsetHeight+_f74;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f76+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f78){
var _f79=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f78);
return UserInterface.registerBinding(_f79,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f7a){
this._viewBinding=_f7a;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f7b=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f7c=this._viewBinding.getDefinition().label;
StatusBar.busy(_f7b,[_f7c]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f7d){
ExplorerDeckBinding.superclass.handleAction.call(this,_f7d);
var _f7e=_f7d.target;
switch(_f7d.type){
case PageBinding.ACTION_INITIALIZED:
if(_f7e instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f7e.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f7f,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f7f,arg);
switch(_f7f){
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
var _f81=null;
if(this._isExplorerDeckBindingInitialized){
_f81=this._viewBinding.getDefinition().label;
}else{
_f81=DockTabBinding.LABEL_TABLOADING;
}
return _f81;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f82=null;
if(this._isExplorerDeckBindingInitialized){
_f82=this._viewBinding.getDefinition().image;
}else{
_f82=DockTabBinding.IMG_TABLOADING;
}
return _f82;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f83=null;
if(this._isExplorerDeckBindingInitialized){
_f83=this._viewBinding.getDefinition().toolTip;
}
return _f83;
};
ExplorerDeckBinding.newInstance=function(_f84){
var _f85=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f84);
return UserInterface.registerBinding(_f85,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f86){
switch(_f86.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f86.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f86.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f86);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f87){
this._maxButtons.set(_f87.handle,this._mountMaxButton(_f87));
this._minButtons.set(_f87.handle,this._mountMinButton(_f87));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f88){
var _f89=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f89.setLabel(_f88.label);
_f89.setToolTip(_f88.toolTip);
_f89.handle=_f88.handle;
_f89.node=_f88.node;
this._maxGroup.add(_f89);
this._maxList.add(_f89);
_f89.attach();
return _f89;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f8a){
var _f8b=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f8b.setLabel(_f8a.label);
_f8b.setToolTip(_f8a.label);
_f8b.handle=_f8a.handle;
_f8b.node=_f8a.node;
this._minGroup.addFirst(_f8b);
this._minList.add(_f8b);
_f8b.attach();
_f8b.hide();
return _f8b;
};
ExplorerMenuBinding.prototype.handleAction=function(_f8c){
ExplorerMenuBinding.superclass.handleAction.call(this,_f8c);
switch(_f8c.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f8d=_f8c.target;
var _f8e=_f8d.getCheckedButtonBinding();
var _f8f=_f8e.handle;
switch(_f8d){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f8f),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f8f),true);
break;
}
this._selectedHandle=_f8f;
this._selectedTag=_f8e.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f8c.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f90){
var _f91=this._maxButtons.get(_f90);
if(_f91){
_f91.check();
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
var _f92=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f92=true;
}
return _f92;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f94=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f94=true;
}
return _f94;
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
ExplorerToolBarBinding.newInstance=function(_f95){
var _f96=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f95);
return UserInterface.registerBinding(_f96,ExplorerToolBarBinding);
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
var _f97=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f98=_f97?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f98);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f99,_f9a){
var _f9b=(_f9a==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f9c=DOMUtil.createElementNS(Constants.NS_UI,_f9b,_f99);
var _f9d=UserInterface.registerBinding(_f9c,ExplorerToolBarButtonBinding);
_f9d.explorerToolBarButtonType=_f9a;
return _f9d;
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
EditorBinding.registerComponent=function(_f9e,_f9f){
var _fa0=EditorBinding._components;
var _fa1=EditorBinding._editors;
var key=_f9f.key;
var _fa3=Interfaces.isImplemented(IWysiwygEditorComponent,_f9e);
if(!_fa3){
_fa3=Interfaces.isImplemented(ISourceEditorComponent,_f9e);
}
if(_fa3){
if(_fa1.has(key)){
_fa1.get(key).initializeEditorComponent(_f9e);
}else{
if(!_fa0.has(key)){
_fa0.set(key,new List());
}
_fa0.get(key).add(_f9e);
}
}else{
throw "Editor component interface not implemented: "+_f9e;
}
};
EditorBinding.claimComponents=function(_fa4,_fa5){
var _fa6=EditorBinding._components;
var _fa7=EditorBinding._editors;
var key=_fa5.key;
_fa7.set(key,_fa4);
var list=null;
if(_fa6.has(key)){
list=_fa6.get(key).copy();
_fa6.del(key);
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
var _fab=this.getProperty("value");
if(_fab!=null){
_fab=decodeURIComponent(_fab);
this._startContent=_fab;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fad=this.bindingWindow.DataManager;
_fad.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_faf){
var _fb0=EditorBinding.claimComponents(this,_faf);
if(_fb0!=null){
while(_fb0.hasNext()){
this.initializeEditorComponent(_fb0.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fb2=this.bindingWindow.DataManager;
if(_fb2.getDataBinding(name)){
_fb2.unRegisterDataBinding(name);
}
_fb2.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fb3=this.getEditorDocument();
if(_fb3!=null){
Application.framework(_fb3);
DOMEvents.addEventListener(_fb3,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fb3,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fb3,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fb3,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fb5){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fb5==true){
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
var _fb7=this.getCheckSum();
if(_fb7!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fb7;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fb8=null;
if(Binding.exists(this._pageBinding)){
_fb8=this._pageBinding.getCheckSum(this._checksum);
}
return _fb8;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fba=DOMEvents.getTarget(e);
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
if(_fba.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fbc,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fbc,arg);
var _fbe=null;
switch(_fbc){
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
var _fbf=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fbf=false;
}
}
}else{
_fbe=DOMEvents.getTarget(arg);
if(_fbe&&_fbe.ownerDocument==this.getEditorDocument()){
_fbf=false;
}
}
if(_fbf){
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
EditorBinding.prototype._activateEditor=function(_fc0){
if(_fc0!=this._isActivated){
this._isActivated=_fc0;
EditorBinding.isActive=_fc0;
var _fc1=this.getEditorWindow().standardEventHandler;
var _fc2=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fc2!=null){
if(_fc0){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fc2.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fc1.enableNativeKeys(true);
}else{
_fc2.disable();
_fc1.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fc3=this.getEditorDocument().selection.createRange();
_fc3.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fc4=false;
try{
if(!Client.isExplorer){
var _fc5=this.getEditorWindow().getSelection();
if(_fc5!=null){
_fc4=_fc5.toString().length>0;
if(!_fc4){
var _fc6=_fc5.getRangeAt(0);
var frag=_fc6.cloneContents();
var _fc8=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fc8.appendChild(frag.firstChild);
}
var img=_fc8.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fc4=true;
}
}
}
}
}else{
var _fc6=this.getEditorDocument().selection.createRange();
_fc4=(_fc6&&_fc6.text)&&_fc6.text.length>0;
if(_fc6.commonParentElement&&VisualEditorBinding.isImageElement(_fc6.commonParentElement())){
_fc4=true;
}
}
}
catch(exception){
}
return _fc4;
};
EditorBinding.prototype.isCommandEnabled=function(_fca){
var _fcb=true;
switch(_fca){
case "Cut":
case "Copy":
case "Paste":
_fcb=this.getEditorDocument().queryCommandEnabled(_fca);
break;
}
return _fcb;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fcf=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fd0=null;
if(cmd=="Paste"){
_fd0=null;
}else{
_fd0=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fd0);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fcf=true;
}
break;
}
return _fcf;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fd2=this.getContentWindow().bindingMap.toolbar;
var _fd3=_fd2.getButtonForCommand(cmd);
if(!_fd3){
throw "No button for command "+cmd;
}
return _fd3;
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
var _fd6=this.getContentDocument().getElementById("focusableinput");
if(_fd6!=null){
_fd6.style.display="block";
FocusBinding.focusElement(_fd6);
_fd6.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fd7){
EditorBinding.superclass.handleAction.call(this,_fd7);
var _fd8=_fd7.target;
var self=this;
var _fda=this.shadowTree.iframe;
switch(_fd7.type){
case Binding.ACTION_DIRTY:
if(_fd7.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fdb){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fdb);
};
EditorBinding.prototype.handleElement=function(_fdc){
return true;
};
EditorBinding.prototype.updateElement=function(_fdd){
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
var _fe0=this._menuGroups[rel];
if(_fe0 instanceof List){
_fe0.each(function(_fe1){
_fe1.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _fe3=this._menuGroups[rel];
if(_fe3 instanceof List){
_fe3.each(function(_fe4){
_fe4.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_fe5){
EditorPopupBinding.superclass.handleAction.call(this,_fe5);
var _fe6=_fe5.target;
if(_fe5.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_fe6.getProperty("cmd");
var gui=_fe6.getProperty("gui");
var val=_fe6.getProperty("val");
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
var _fea=this.bindingWindow.bindingMap.tinywindow;
var _feb=this.bindingWindow.bindingMap.codepresswindow;
if(_fea){
EditorBinding.registerComponent(this,_fea);
}else{
if(_feb){
EditorBinding.registerComponent(this,_feb);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_fec,_fed,_fee,_fef){
this._editorBinding=_fec;
this._tinyEngine=_fed;
this._tinyInstance=_fee;
this._tinyTheme=_fef;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_ff0,_ff1,_ff2){
this._editorBinding=_ff0;
this._codePressFrame=_ff1;
this._codePressEngine=_ff2;
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
var _ff4=this._editorBinding;
if(_ff4!=null){
var self=this;
var _ff6={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_ff4.hasBookmark()){
_ff4.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_ff4.hasBookmark()){
_ff4.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_ff6);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_ff6);
}
};
EditorClickButtonBinding.newInstance=function(_ff8){
var _ff9=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_ff8);
return UserInterface.registerBinding(_ff9,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_ffa){
var _ffb=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ffa);
return UserInterface.registerBinding(_ffb,EditorToolBarButtonBinding);
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
var _ffc=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_ffc);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_ffd,_ffe,_fff,theme){
this._editorBinding=_ffd;
this._tinyEngine=_ffe;
this._tinyInstance=_fff;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1001){
EditorSelectorBinding.superclass.handleAction.call(this,_1001);
switch(_1001.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_1001);
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
EditorMenuItemBinding.newInstance=function(_1004){
var _1005=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1004);
return UserInterface.registerBinding(_1005,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1006){
var i=0,_1008,_1009="",split=_1006.split(" ");
while((_1008=split[i])!=null){
if(_1008.length>=3&&_1008.substring(0,3)=="mce"){
_1008="";
}else{
if(_1008.length>=14&&_1008.substring(0,14)=="compositemedia"){
_1008="";
}
}
_1009+=_1008;
if(split[i+1]){
_1009+=" ";
}
i++;
}
return _1009;
};
VisualEditorBinding.getStructuredContent=function(_100b){
var _100c=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_100b);
if(soap instanceof SOAPFault){
}else{
_100c=soap.XhtmlFragment;
if(!_100c){
_100c="";
}
}
WebServiceProxy.isFaultHandler=true;
return _100c;
};
VisualEditorBinding.getTinyContent=function(_100e,_100f){
var _1010=null;
if(_100e==null||_100e==""){
_100e=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_100e);
if(soap instanceof SOAPFault){
var _1012=soap;
var _1013={handleDialogResponse:function(){
_100f.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1013,_1012);
}else{
_1010=soap.XhtmlFragment;
if(_1010==null){
_1010=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1010;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _1016=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1018=new List(doc.documentElement.childNodes);
var _1019=new List();
_1018.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_1019.add(child);
}
});
var _101b=_1019.get(index);
if(_101b==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_101b.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_101b.hasChildNodes()){
frag.appendChild(_101b.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_1016=DOMSerializer.serialize(doc.documentElement);
_1016=_1016.substring(_1016.indexOf(">")+1,_1016.length);
_1016=_1016.substring(0,_1016.lastIndexOf("<"));
}
}
}
if(_1016==null){
_1016=new String("");
}
return _1016;
};
VisualEditorBinding.isImage=function(_101d){
result=_101d&&_101d.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_101e){
return VisualEditorBinding.isImage(_101e)&&!VisualEditorBinding.isReservedElement(_101e);
};
VisualEditorBinding.isReservedElement=function(_101f){
if(VisualEditorBinding.isFunctionElement(_101f)){
return true;
}
if(VisualEditorBinding.isFieldElement(_101f)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_101f)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1020){
return VisualEditorBinding.isImage(_1020)&&CSSUtil.hasClassName(_1020,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1021){
return VisualEditorBinding.isImage(_1021)&&CSSUtil.hasClassName(_1021,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1022){
return VisualEditorBinding.isImage(_1022)&&CSSUtil.hasClassName(_1022,VisualEditorBinding.HTML_CLASSNAME);
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
var _1023=this.getProperty("embedablefieldstypenames");
if(_1023!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1023);
}
var _1024=this.getProperty("formattingconfiguration");
if(_1024!=null){
this._url+="?config="+_1024;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
this.subscribe(BroadcastMessages.VISUALEDITOR_HACKED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1025,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1025,arg);
var _1027=this.getContentWindow().bindingMap.tinywindow;
var _1028=_1027.getContentWindow();
switch(_1025){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_1028){
if(this._startContent==" "){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
this._startContent=this.normalizeToDocument(this._startContent);
this.extractHead(this._startContent);
this._startContent=this.extractBody(this._startContent);
arg.textareaElement.value=VisualEditorBinding.getTinyContent(this._startContent);
this.unsubscribe(BroadcastMessages.VISUALEDITOR_HACKED);
}
break;
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1028){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1027);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1029){
_1029.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_102a){
VisualEditorBinding.superclass._onPageInitialize.call(this,_102a);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_102d){
var _102e=_102d;
if(!this._isNormalizedDocument(_102d)){
_102e=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_102d);
}
return _102e;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_102f){
var _1030=false;
var doc=XMLParser.parse(_102f,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1030=true;
}
}
if(Client.isWebKit){
if(_102f.indexOf("<html")!==0){
_1030=false;
}
}
return _1030;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1035=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1035){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1035=true;
}
return _1035;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1037=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1037);
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
VisualEditorBinding.prototype.setResult=function(_1039){
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
VisualEditorPopupBinding.prototype.configure=function(_103a,_103b,_103c){
var _103d=this.editorBinding.hasSelection();
this.tinyInstance=_103a;
this.tinyEngine=_103b;
this.tinyElement=_103c;
this.hasSelection=_103d;
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
var _1041=false;
if(this.hasSelection){
_1041=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1041=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1041=true;
}
}
}
}
if(_1041){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1042=this.getMenuItemForCommand("compositeInsertLink");
var _1043=this.getMenuItemForCommand("unlink");
var _1044=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1045=this.editorBinding.getButtonForCommand("unlink");
_1043.setDisabled(_1045.isDisabled);
if(_1043.isDisabled){
_1042.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1042.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1046=this.editorBinding.embedableFieldConfiguration;
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
if(_1046){
var _1049=_1046.getGroupNames();
if(_1049.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1049.each(function(_104d){
var _104e=_1046.getFieldNames(_104d);
_104e.each(function(_104f){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_104f);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_104d+":"+_104f);
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
var _1051=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1052=null;
var _1053=null;
if(_1051){
if(_1051.nodeName=="TD"){
_1052=_1051.getAttribute("colspan");
_1053=_1051.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1052=="1"&&_1053=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1051){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1054){
var _1055=VisualEditorFormattingConfiguration._configurations;
if(!_1055.has(_1054)){
_1055.set(_1054,new VisualEditorFormattingConfiguration());
}
return _1055.get(_1054);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1057){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1058){
var _1059=null;
var _105a=VisualEditorFieldGroupConfiguration._configurations;
if(!_105a.has(_1058)){
_105a.set(_1058,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1058)));
}
return _105a.get(_1058);
};
function VisualEditorFieldGroupConfiguration(_105b){
var _105c=new Map();
new List(_105b).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_105c.set(group.GroupName,map);
});
this._groups=_105c;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1060){
return this._groups.get(_1060).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1061,_1062){
return this._groups.get(_1061).get(_1062).xhtml;
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
var _1064=this.getDescendantElementsByLocalName("textarea");
while(_1064.hasNext()){
var _1065=_1064.getNext();
if(_1065.getAttribute("selected")=="true"){
this._startContent=_1065.value;
this._textareaname=_1065.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1067=this.getContentWindow().bindingMap.templatetree;
_1067.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1068){
var _1069=_1067.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1069.textareaname);
_1068.consume();
}});
_1067.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_106a){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _106b=this.getContentWindow().bindingMap.toolsplitter;
_106b.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _106c=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_106c.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_106c);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_106d){
this._textareas=new Map();
while(_106d.hasNext()){
var _106e=_106d.getNext();
var _106f=_106e.getAttribute("placeholderid");
this._textareas.set(_106f,{placeholderid:_106f,placeholdername:_106e.getAttribute("placeholdername"),placeholdermarkup:_106e.value,textareaelement:_106e,isSelected:_106e.getAttribute("selected")=="true"});
}
var _1070=new Map();
this._textareas.each(function(name,_1072){
var _1073=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1073.setLabel(_1072.placeholdername);
_1073.setImage("${icon:placeholder}");
_1073.setProperty("placeholder",true);
_1073.textareaname=name;
_1070.set(_1072.placeholdername,_1073);
if(_1072.isSelected){
selected=_1073;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1074=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1074.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1075=this.getContentWindow().bindingMap.templatetree;
var _1076=_1075.add(TreeNodeBinding.newInstance(_1075.bindingDocument));
_1076.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1076.setImage("${icon:warning}");
_1076.attach();
var _1077=this.getContentWindow().bindingMap.statusbar;
_1077.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1079=this._textareas.get(name);
var _107a=_1079.placeholdermarkup;
this.setValue(this.normalizeToDocument(_107a));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_107b){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_107b;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _107c=this.getContentWindow().bindingMap.statusbar;
_107c.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_107b);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _107f="";
if(this._heads.has(this._textareaname)){
_107f=this._heads.get(this._textareaname);
if(_107f==null){
_107f=new String("");
}
}
return _107f;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1081){
_1081.textareaelement.value=_1081.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1082,_1083){
var _1084=_1082.getElementsByTagName("div").item(0);
var _1085=_1083.getElementsByTagName("div").item(0);
var _1086=new List(_1084.getElementsByTagName("textarea"));
var _1087=new List(_1085.getElementsByTagName("textarea"));
var _1088=false;
if(_1086.getLength()!=_1087.getLength()){
_1088=true;
}else{
var index=0;
_1086.each(function(_108a,index){
var _108c=_1087.get(index);
var newid=_108a.getAttribute("placeholderid");
var oldid=_108c.getAttribute("placeholderid");
var _108f=_108a.getAttribute("placeholdername");
var _1090=_108c.getAttribute("placeholdername");
if(newid!=oldid||_108f!=_1090){
_1088=true;
}
return !_1088;
});
}
if(_1088){
var html=null;
if(_1084.innerHTML!=null){
html=_1084.innerHTML;
}else{
html=DOMSerializer.serialize(_1084);
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
var _1094=this.getDescendantBindingByLocalName("selector");
_1094.attach();
this._populateTemplateSelector();
var _1095=this.getContentWindow().bindingMap.templateselector;
_1095.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _1096=this.getDescendantBindingByLocalName("selector");
var _1097=this.getContentWindow().bindingMap.templateselector;
_1096.selections.each(function(_1098){
_1098.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_1097.populateFromList(_1096.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _1099=this.getDescendantBindingByLocalName("selector");
var _109a=this.getContentWindow().bindingMap.templateselector;
_1099.selectByValue(_109a.getValue());
_1099.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_109b){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10a0,_10a1){
var _10a2=_10a1;
if(old.has(_10a0)){
_10a2=old.get(_10a0).placeholdermarkup;
}
return _10a2;
}
while(_109b.hasNext()){
var _10a3=_109b.getNext();
var _10a4=_10a3.getAttribute("placeholderid");
this._textareas.set(_10a4,{placeholderid:_10a4,placeholdername:_10a3.getAttribute("placeholdername"),placeholdermarkup:compute(_10a4,_10a3.value),textareaelement:_10a3,isSelected:_10a3.getAttribute("selected")=="true"});
}
var _10a5=null;
var _10a6=this.getContentWindow().bindingMap.templatetree;
var _10a7=new Map();
this._textareas.each(function(name,_10a9){
var _10aa=_10a6.add(TreeNodeBinding.newInstance(_10a6.bindingDocument));
_10aa.setLabel(_10a9.placeholdername);
_10aa.setImage("${icon:placeholder}");
_10aa.setProperty("placeholder",true);
_10aa.textareaname=name;
_10a7.set(_10a9.placeholdername,_10aa);
if(_10a9.isSelected){
_10a5=_10aa;
}
});
_10a6.attachRecursive();
if(_10a5!=null){
var _10ab=true;
if(this._oldtextareas.hasEntries()){
_10ab=false;
var map=new Map();
this._textareas.each(function(id,_10ae){
map.set(_10ae.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10ab=true;
}
}
if(_10ab){
var _10af=this._textareas.get(_10a5.textareaname);
this._textareaname=_10a5.textareaname;
this._placeholdername=_10af.placeholdername;
this._setContentFromPlaceHolder(_10a5.textareaname);
_10a5.focus();
}else{
var _10b0=_10a7.get(this._placeholdername);
this._textareaname=_10b0.textareaname;
_10b0.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10b1,_10b2){
var _10b3=_10b1.getElementsByTagName("ui:selector").item(0);
var _10b4=_10b2.getElementsByTagName("ui:selector").item(0);
var _10b5=false;
if(_10b3!=null&&_10b4!=null){
var _10b6=new List(_10b3.getElementsByTagName("ui:selection"));
var _10b7=new List(_10b4.getElementsByTagName("ui:selection"));
if(_10b6.getLength()!=_10b7.getLength()){
_10b5=true;
}else{
_10b6.each(function(_10b8,index){
var _10ba=_10b8.getAttribute("value");
var _10bb=_10b7.get(index).getAttribute("value");
if(_10ba!=_10bb){
_10b5=true;
}
return !_10b5;
});
}
}
if(_10b5){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10b3);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10b1,_10b2);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10bd,frame,_10bf){
this._editorBinding=_10bd;
this._codePressFrame=frame;
this._codePressEngine=_10bf;
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
var _10c5=this.getProperty("validate");
if(_10c5==true){
this._hasStrictValidation=true;
}
var _10c6=this.getProperty("validator");
if(_10c6!=null){
this._validator=_10c6;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10c7,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10c7,arg);
switch(_10c7){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10c9=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10c9!=null){
var _10ca=_10c9.getContentWindow();
if(arg.broadcastWindow==_10ca){
this._codemirrorWindow=_10ca;
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
this.initializeEditorComponents(_10c9);
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
this.unsubscribe(_10c7);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10ce){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10ce);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10cf){
if(_10cf!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10cf;
EditorBinding.isActive=_10cf;
var _10d0=this.getContentWindow().standardEventHandler;
if(_10cf){
_10d0.enableNativeKeys(true);
}else{
_10d0.disableNativeKeys();
}
var _10d1=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10d1!=null){
if(_10cf){
_10d1.enable();
}else{
_10d1.disable();
}
}
if(_10cf){
this.focus();
var _10d2=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10d6=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10d6;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10d7){
_10d7.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10d9){
if(!this._isFinalized){
if(_10d9!=this._startContent){
this._startContent=_10d9;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10d9);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10da=this.getContentWindow().bindingMap.editorpage.getContent();
return _10da?_10da:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10db){
if(this._pageBinding!=null){
this._pageBinding.cover(_10db);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10dc){
if(_10dc!=null&&this.shadowTree.dotnetinput!=null){
var value=_10dc.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10de=true;
var _10df=this.getContent();
if(this._validator!=null){
_10de=Validator.validateInformed(_10df,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10de=XMLParser.isWellFormedDocument(_10df,true);
if(_10de==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10de=this._isValidHTML(_10df);
break;
}
}
break;
}
}
return _10de;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10e1=true;
var doc=XMLParser.parse(xml);
var _10e3=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10e3.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10e3.add("NamespaceURI");
}
var head=null,body=null;
var _10e7=new List(root.childNodes);
while(_10e7.hasNext()){
var child=_10e7.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10e3.add("MultipleHead");
}
if(body!=null){
_10e3.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10e3.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10e3.add("MissingHead");
}
if(body==null){
_10e3.add("MissingBody");
}
}
if(_10e3.hasEntries()){
_10e1=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10e3.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10e3.getFirst()));
}
}
return _10e1;
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
var _10e9=null;
var page=this._pageBinding;
if(page!=null){
_10e9=page.getCheckSum();
}
return _10e9;
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
ThrobberBinding.prototype.handleBroadcast=function(_10eb,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10eb,arg);
switch(_10eb){
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
ProgressBarBinding.notch=function(_10ee){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10ee);
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
ProgressBarBinding.prototype.notch=function(_10f0){
_10f0=_10f0?_10f0:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_10f0);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_10f2,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_10f2,arg);
switch(_10f2){
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
StartMenuItemBinding.prototype.setChecked=function(_10f4,_10f5){
StartMenuItemBinding.superclass.setChecked.call(this,_10f4,_10f5);
if(!_10f5){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_10f6){
var _10f7=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_10f6);
UserInterface.registerBinding(_10f7,StartMenuItemBinding);
return UserInterface.getBinding(_10f7);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_10fa,_10fb){
var _10fc=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_10fb,true)==true){
if(_10fa!="*"){
_10fa=KeySetBinding._sanitizeKeyModifiers(_10fa);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_10fc[doc]){
_10fc[doc]={};
}
if(!_10fc[doc][code]){
_10fc[doc][code]={};
}
_10fc[doc][code][_10fa]=_10fb;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1100=false;
var code=e.keyCode;
var _1102=KeySetBinding.keyEventHandlers;
if(_1102[doc]&&_1102[doc][code]){
var _1103="[default]";
_1103+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1103+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _1104=_1102[doc][code][_1103];
if(_1104==null){
_1104=_1102[doc][code]["*"];
}
if(_1104!=null){
_1104.handleKeyEvent(e);
_1100=true;
}
}
return _1100;
};
KeySetBinding._sanitizeKeyModifiers=function(_1105){
var _1106="[default]";
var mods={};
if(_1105){
new List(_1105.split(" ")).each(function(_1108){
mods[_1108]=true;
});
function check(_1109){
if(mods[_1109]){
_1106+=" "+_1109;
}
}
check("shift");
check("control");
}
return _1106;
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
var _110d=key.getAttribute("oncommand");
var _110e=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_110e){
DOMEvents.preventDefault(e);
}
var _1110=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_110d,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1111){
if(_1111 instanceof CursorBinding){
_1111.setOpacity(0);
_1111.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_1112){
_1111.setOpacity(Math.sin(_1112*Math.PI/180));
},onstop:function(){
_1111.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1113){
if(_1113 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_1114){
_1113.setOpacity(Math.cos(_1114*Math.PI/180));
},onstop:function(){
_1113.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1115,_1116,_1117){
if(_1115 instanceof CursorBinding){
_1117.x-=16;
_1117.y-=16;
new Animation({modifier:3,onstep:function(_1118){
var tal=Math.sin(_1118*Math.PI/180);
_1115.setPosition(new Point(((1-tal)*_1116.x)+((0+tal)*_1117.x),((1-tal)*_1116.y)+((0+tal)*_1117.y)));
},onstop:function(){
CursorBinding.fadeOut(_1115);
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
CursorBinding.prototype.setOpacity=function(_111e){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_111e);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_111e*100)+")";
}
this._opacity=_111e;
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
function setOpacity(_1121){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_1121);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1121*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_1122){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1122*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1124){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_1124);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1124*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1125){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1125*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1127){
if(_1127!=this._isBusy){
if(_1127){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1127;
}
};
CoverBinding.prototype.setTransparent=function(_1128){
if(_1128!=this._isTransparent){
if(_1128){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1128;
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
CoverBinding.prototype.setHeight=function(_112a){
if(_112a>=0){
this.bindingElement.style.height=new String(_112a+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_112b){
var _112c=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_112b);
return UserInterface.registerBinding(_112c,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _112e=UncoverBinding._bindingInstance;
if(Binding.exists(_112e)){
_112e.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1132){
this._isFading=_1132==true;
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
var _1133=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1133.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1133.clearRect(0,0,300,150);
_1133.fillRect(0,0,300,150);
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
var _1135=this._canvas.getContext("2d");
_1135.clearRect(0,0,300,150);
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
var _1136=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1136);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1137=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1137){
this._startcontent=_1137.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1138){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1138);
switch(_1138.type){
case WindowBinding.ACTION_ONLOAD:
if(_1138.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1138.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1138);
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
var _113c=this._transformer.transformToString(doc);
this._inject(_113c);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_113f){
this.getContentDocument().body.innerHTML=_113f;
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
var _1147=list.getNext();
var id=_1147.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1147);
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
var _1151=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1151.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1151.appendChild(att);
}
elm.appendChild(_1151);
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
var _115b=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_115b){
doc=XMLParser.parse(_115b);
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
var _115f=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_115f;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1160,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1160,arg);
switch(_1160){
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
var _1163=new List();
list.each(function(lang){
_1163.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1163);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1167){
switch(_1167){
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
var _116a=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_116a,root);
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
var _116b=this.getProperty("status");
if(_116b!=null){
switch(_116b){
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
UserInterfaceMapping.prototype.merge=function(_116e){
for(var _116f in _116e.map){
this.map[_116f]=_116e.getBindingImplementation(_116f);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1170){
var _1171=null;
var name=_1170.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_1171=this.map[name];
}
return _1171;
};
var UserInterface=new function(){
var _1174=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1175=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:imageinputdialog":ImageInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1174,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1176=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1178,impl){
var _117a=null;
if(!this.hasBinding(_1178)){
var _117b=DOMUtil.getParentWindow(_1178);
if(DOMUtil.getLocalName(_1178)!="bindingmapping"){
if(!impl&&_1178.getAttribute("binding")!=null){
var _117c=_1178.getAttribute("binding");
impl=_117b[_117c];
if(impl==null){
throw "No such binding in scope: "+_117c;
}
}
if(!impl){
var _117d=_117b.DocumentManager;
if(_117d){
var _117e=_117d.customUserInterfaceMapping;
if(_117e){
impl=_117e.getBindingImplementation(_1178);
}
}
}
if(!impl){
impl=_1175.getBindingImplementation(_1178);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_117a=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_117a){
var key=KeyMaster.getUniqueKey();
_1178.setAttribute("key",key);
_117a.key=key;
if(!_1178.id){
_1178.id=key;
}
keys[key]={element:_1178,binding:_117a};
_117a.onBindingRegister();
}
}
}
return _117a;
};
this.unRegisterBinding=function(_1180){
terminate(_1180);
};
function terminate(_1181){
if(Binding.exists(_1181)==true){
var key=_1181.key;
Binding.destroy(_1181);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1181=null;
}else{
_1176.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1183){
var _1184=null;
if(keys[_1183.key]){
_1184=keys[_1183.key].element;
}
return _1184;
};
this.getBinding=function(_1185){
var _1186=null;
if(_1185&&_1185.nodeType==Node.ELEMENT_NODE){
try{
var key=_1185.getAttribute("key");
if(key&&keys[key]){
_1186=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1185);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1186;
};
this.getBindingByKey=function(key){
var _1189=null;
if(keys[key]){
_1189=keys[key].binding;
}
return _1189;
};
this.hasBinding=function(_118a){
return this.getBinding(_118a)!=null;
};
this.isBindingVisible=function(_118b){
var _118c=Application.isOperational;
if(_118c==true){
var _118d=new Crawler();
_118d.type=NodeCrawler.TYPE_ASCENDING;
_118d.id="visibilitycrawler";
_118d.addFilter(function(_118e){
var b=UserInterface.getBinding(_118e);
var res=0;
if(!b.isVisible){
_118c=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_118d.crawl(_118b.bindingElement);
_118d.dispose();
}
return _118c;
};
var _1191=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_1191={};
for(var key in keys){
_1191[key]=true;
}
};
this.getPoint=function(){
var _1195=null;
if(_1191){
_1195=new List();
for(var key in keys){
if(!_1191[key]){
_1195.add(key);
}
}
}
return _1195;
};
this.clearPoint=function(){
_1191=null;
};
this.trackUndisposedBindings=function(){
var _1197=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1197){
_1197="Bindings illdisposed: ";
}
_1197+=entry.binding+" ";
}
}
if(_1197!=null){
_1176.error(_1197);
}
};
this.autoTrackDisposedBindings=function(_119a){
if(_119a){
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
SOAPRequest.newInstance=function(_119b,_119c){
var _119d=_119b+"/"+_119c;
var _119e=new SOAPRequest(_119d);
var _119f=SOAPRequest.resolver;
_119e.document=Templates.getTemplateDocument("soapenvelope.xml");
_119e.envelope=_119f.resolve("soap:Envelope",_119e.document);
_119e.header=_119f.resolve("soap:Header",_119e.envelope);
_119e.body=_119f.resolve("soap:Body",_119e.envelope);
return _119e;
};
SOAPRequest._parseResponse=function(_11a0){
var _11a1=null;
var _11a2=false;
var doc=_11a0.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11a1=SOAPRequestResponse.newInstance(_11a0.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11a0.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11a2=true;
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
var text=_11a0.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_11a2=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11a0.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11a0.responseText);
}
}
}
}
if(_11a2==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11a1;
};
function SOAPRequest(_11a7){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11a7;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11a9=DOMUtil.getXMLHTTPRequest();
var _11aa=null;
_11a9.open("post",url,false);
_11a9.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11a9.setRequestHeader("SOAPAction",this.action);
try{
_11a9.send(this.document);
_11aa=SOAPRequest._parseResponse(_11a9);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11a9=null;
return _11aa;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11ad){
var _11ae=DOMUtil.getXMLHTTPRequest();
_11ae.open("post",url,true);
_11ae.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11ae.setRequestHeader("SOAPAction",this.action);
_11ae.onreadystatechange=function(){
if(_11ae.readyState==4){
var _11af=SOAPRequest._parseResponse(_11ae);
_11ad(_11af);
_11ae=null;
}
};
_11ae.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11b0 in this){
this[_11b0]=null;
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
var _11b2=null;
if(doc&&doc.documentElement){
_11b2=new SOAPRequestResponse();
var _11b3=SOAPRequestResponse.resolver;
_11b2.document=doc;
_11b2.envelope=_11b3.resolve("soap:Envelope",_11b2.document);
_11b2.header=_11b3.resolve("soap:Header",_11b2.envelope);
_11b2.body=_11b3.resolve("soap:Body",_11b2.envelope);
var fault=_11b3.resolve("soap:Fault",_11b2.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11b2.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11b3.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11b3.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11b2;
};
function SOAPFault(_11b5,_11b6,_11b7){
this._operationName=_11b5;
this._operationAddress=_11b6;
this._faultString=_11b7;
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
SOAPFault.newInstance=function(_11b8,fault){
return new SOAPFault(_11b8.name,_11b8.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11bb){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11bb;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11bd=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11bd.body,this._operation);
var _11bf=this._wsdl.getSchema();
var _11c0=_11bf.lookup(this._operation);
var _11c1=_11c0.getListedDefinitions();
while(_11c1.hasNext()){
var def=_11c1.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11bd;
};
SOAPEncoder.prototype._resolve=function(_11c5,_11c6,value){
var _11c8=this._wsdl.getSchema();
if(_11c6.isSimpleValue){
this._appendText(_11c5,value,_11c6.type=="string");
}else{
var _11c9=_11c8.lookup(_11c6.type);
if(_11c9 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11c9.getListedDefinitions();
if(_11c9.isArray){
var _11cb=new List(value);
var def=defs.getNext();
while(_11cb.hasNext()){
var elm=this._appendElement(_11c5,def.name);
var val=_11cb.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11c5,def.name);
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
SOAPEncoder.prototype._appendText=function(_11d2,value,_11d4){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11d7=false;
var i=0,c;
while(c=chars[i++]){
var _11da=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11da=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11da=false;
}
break;
}
if(!_11da){
safe+=c;
}else{
_11d7=true;
}
}
if(_11d7){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11d2.appendChild(_11d2.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11dd){
this._wsdl=wsdl;
this._operation=_11dd;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11e2){
var _11e3=null;
var _11e4=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11e6=this.resolve(id,_11e2.body);
var _11e7=_11e4.lookup(id);
var _11e8=_11e7.getListedDefinitions();
while(!_11e3&&_11e8.hasNext()){
var def=_11e8.getNext();
var elm=this.resolve(def.name,_11e6);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11e3=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11e3.importNode!=Types.UNDEFINED){
_11e3.appendChild(_11e3.importNode(e,true));
}else{
_11e3.loadXML(DOMSerializer.serialize(e));
}
}else{
_11e3=this._compute(elm,def);
}
}
return _11e3;
};
SOAPDecoder.prototype._compute=function(_11ec,_11ed){
var _11ee=null;
var _11ef=this._wsdl.getSchema();
if(_11ed.isSimpleValue){
_11ee=this._getSimpleValue(_11ec,_11ed.type);
}else{
var _11f0=_11ef.lookup(_11ed.type);
if(_11f0 instanceof SchemaSimpleType){
_11ee=this._getSimpleValue(_11ec,_11f0.restrictionType);
}else{
var defs=_11f0.getListedDefinitions();
if(_11f0.isArray){
_11ee=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11ec);
while(elms.hasNext()){
var elm=elms.getNext();
_11ee.push(this._compute(elm,def));
}
}else{
_11ee={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11ec);
if(elm){
_11ee[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11ee;
};
SOAPDecoder.prototype._getSimpleValue=function(_11f5,type){
var _11f7=null;
if(_11f5.firstChild&&_11f5.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_11f5.childNodes.length>1){
_11f5.normalize();
}
_11f7=_11f5.firstChild.data;
switch(type){
case Schema.types.STRING:
_11f7=_11f7;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_11f7=Number(_11f7);
break;
case Schema.types.BOOLEAN:
_11f7=_11f7=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _11f7;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_11f8){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_11f8);
}
Schema.prototype._parseSchema=function(_11f9){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _11fa={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_11f9);
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
_11fa[rule.getAttribute("name")]=entry;
}
return _11fa;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_11ff){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_11ff);
}
SchemaDefinition.prototype._parse=function(_1200){
var min=_1200.getAttribute("minOccurs");
var max=_1200.getAttribute("maxOccurs");
var type=_1200.getAttribute("type");
this.name=_1200.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1206=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1206;
}else{
var elm=_1200.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1208,_1209){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1208,_1209);
}
SchemaElementType.prototype._parseListedDefinitions=function(_120a,_120b){
var els=_120a.resolveAll("s:complexType/s:sequence/s:element",_120b);
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
function SchemaComplexType(_120d,_120e){
this._definitions=new List();
this._parseListedDefinitions(_120d,_120e);
this.isArray=_120e.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_120f,_1210){
var els=_120f.resolveAll("s:sequence/s:element",_1210);
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
function SchemaSimpleType(_1213,_1214){
this.restrictionType=null;
this._parse(_1213,_1214);
}
SchemaSimpleType.prototype._parse=function(_1215,_1216){
var _1217=_1215.resolve("s:restriction",_1216);
if(_1217){
this.restrictionType=_1217.getAttribute("base").split(":")[1];
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
var _121a=null;
var _121b=DOMUtil.getXMLHTTPRequest();
_121b.open("get",url,false);
_121b.send(null);
if(_121b.responseXML){
_121a=_121b.responseXML.documentElement;
}else{
alert(_121b.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _121a;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _121c=new List();
var _121d=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_121d.hasEntries()){
while(_121d.hasNext()){
var _121e=_121d.getNext();
var name=_121e.getAttribute("name");
_121c.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _121c;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1221,_1222,_1223){
this.name=name;
this.address=_1221;
this.encoder=_1222;
this.decoder=_1223;
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
var _1227=wsdl.getOperations();
_1227.each(function(_1228){
proxy[_1228.name]=WebServiceProxy.createProxyOperation(_1228);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1229,_122a){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_122a){
var log=_122a instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1229.address+": "+_1229.name+"\n\n";
log+=DOMSerializer.serialize(_122a.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_122c){
return function(){
var _122d=new List(arguments);
var _122e=null;
if(typeof (_122d.getLast())=="function"){
var _122f=_122d.extractLast();
var _1230=_122c.encoder.encode(_122d);
this._log(_122c,_1230);
var self=this;
var _1232=_1230.asyncInvoke(_122c.address,function(_1233){
self._log(_122c,_1233);
if(_1233){
if(_1233.fault){
_122e=SOAPFault.newInstance(_122c,_1233.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_122e,_1230,_1233);
}
}else{
if(WebServiceProxy.isDOMResult){
_122e=_1233.document;
}else{
_122e=_122c.decoder.decode(_1233);
}
}
}
_1230.dispose();
_122f(_122e);
});
}else{
var _1230=_122c.encoder.encode(new List(arguments));
this._log(_122c,_1230);
var _1232=_1230.invoke(_122c.address);
this._log(_122c,_1232);
if(_1232){
if(_1232.fault){
_122e=SOAPFault.newInstance(_122c,_1232.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_122e,_1230,_1232);
}
}else{
if(WebServiceProxy.isDOMResult){
_122e=_1232.document;
}else{
_122e=_122c.decoder.decode(_1232);
}
}
}
_1230.dispose();
return _122e;
}
};
};
WebServiceProxy.handleFault=function(_1234,_1235,_1236){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1234,soapRequest:_1235,soapResponse:_1236});
}
catch(exception){
alert(_1234.getFaultString());
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
var _1237=SystemLogger.getLogger("MessageQueue");
var _1238=null;
var _1239=0;
var _123a=null;
var _123b=new Map();
var _123c=new Map();
var _123d=false;
var _123e=false;
var _123f={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1238=ConsoleMessageQueueService;
_1239=_1238.GetCurrentSequenceNumber("dummyparam!");
this.index=_1239;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_123d){
if(!MessageQueue._actions.hasEntries()){
var _1240=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_123e=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1240;
_123e=false;
}
}
}
};
this._pokeserver=function(){
if(_123d==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_123e);
var _1241=_1238.GetMessages(Application.CONSOLE_ID,this.index);
if(_1241!=null){
if(Types.isDefined(_1241.CurrentSequenceNumber)){
var _1242=_1241.CurrentSequenceNumber;
if(_1242<this.index){
_1237.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_1242);
}
this.index=_1242;
var _1243=new List(_1241.ConsoleActions);
if(_1243.hasEntries()){
this.evaluate(_1243);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1237.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_1244){
var _1245=new List();
if(_1244.hasEntries()){
_1244.each(function(_1246){
if(this._index[_1246.Id]!=true){
_1245.add(_1246);
}
this._index[_1246.Id]=true;
},this);
if(_1245.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1245);
}else{
this._actions=_1245;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1247){
var _1248="(No reason)";
if(_1247!=null){
_1248=_1247.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1248);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_124c){
if(_124c==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _124d=null;
if(this._actions.hasEntries()){
var _124e=this._actions.extractFirst();
_1239=_124e.SequenceNumber;
_1237.debug("MessageQueue action: "+_124e.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1239+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_124e.ActionType){
case "OpenView":
_124d=_124e.OpenViewParams;
if(_124d.ViewType=="ModalDialog"){
openDialogView(_124d);
}else{
_123a=_124d.ViewId;
openView(_124d);
}
break;
case "CloseView":
_124d=_124e.CloseViewParams;
_123a=_124d.ViewId;
closeView(_124d);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_124e.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_123b.countEntries()+"\n";
_123b.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1237.debug(debug);
if(!_123b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_124e.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_124e.MessageBoxParams);
break;
case "OpenViewDefinition":
_124d=_124e.OpenViewDefinitionParams;
_123a=_124d.Handle;
openViewDefinition(_124d);
break;
case "LogEntry":
logEntry(_124e.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_124d=_124e.BroadcastMessageParams;
_1237.debug("Server says: EventBroadcaster.broadcast ( \""+_124d.Name+"\", "+_124d.Value+" )");
EventBroadcaster.broadcast(_124d.Name,_124d.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_123b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_124e.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_124e.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_124e.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_124d=_124e.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_124d.ViewId,entityToken:_124d.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_124d=_124e.OpenGenericViewParams;
openGenericView(_124d);
break;
case "OpenExternalView":
_124d=_124e.OpenExternalViewParams;
openExternalView(_124d);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_124e.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_123e);
}
function logEntry(_1251){
var _1252=_1251.Level.toLowerCase();
SystemLogger.getLogger(_1251.SenderId)[_1252](_1251.Message);
}
function openView(_1253){
var list=paramsToList(_1253.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_1253.ViewId);
def.entityToken=_1253.EntityToken;
def.flowHandle=_1253.FlowHandle;
def.position=_123f[_1253.ViewType],def.label=_1253.Label;
def.image=_1253.Image;
def.toolTip=_1253.ToolTip;
def.argument={"url":_1253.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_1253.ViewId,entityToken:_1253.EntityToken,flowHandle:_1253.FlowHandle,position:_123f[_1253.ViewType],url:_1253.Url,label:_1253.Label,image:_1253.Image,toolTip:_1253.ToolTip}));
}
}
function openDialogView(_1256){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1256.ViewId,flowHandle:_1256.FlowHandle,position:Dialog.MODAL,url:_1256.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1257){
var _1258=_1257.DialogType.toLowerCase();
if(_1258=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_1257.Title+"\n"+_1257.Message);
}else{
Dialog[_1258](_1257.Title,_1257.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_1259){
var map={};
var _125b=false;
new List(_1259.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_125b=true;
});
var proto=ViewDefinitions[_1259.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1259.ViewId;
}
def.argument=_125b?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1260){
var def=ViewDefinition.clone("Composite.Management.GenericView",_1260.ViewId);
def.label=_1260.Label;
def.toolTip=_1260.ToolTip;
def.image=_1260.Image;
def.argument={"url":_1260.Url,"list":paramsToList(_1260.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_1262){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_1262.ViewId);
def.label=_1262.Label;
def.toolTip=_1262.ToolTip;
def.image=_1262.Image;
def.url=_1262.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_1264){
if(StageBinding.isViewOpen(_1264.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1264.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1265){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1265.ViewId,isSuccess:_1265.Succeeded});
}
this._lockSystem=function(_1266){
var _1267=top.bindingMap.offlinetheatre;
if(_1266){
_1267.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1267.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_123d=_1266;
};
this.handleBroadcast=function(_1269,arg){
switch(_1269){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_123a!=null&&arg==_123a){
_123a=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_123b.set(arg,true);
}else{
_1237.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_123b.hasEntries()){
_123b.del(arg);
_1237.debug("Refreshed tree: "+arg+"\n("+_123b.countEntries()+" trees left!)");
if(!_123b.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_123c.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_123c.hasEntries()==true){
_123c.del(arg);
if(!_123c.hasEntries()){
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
function paramsToList(_126b){
var list=new List();
new List(_126b).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _126e=false;
var _126f=false;
var _1270=null;
var _1271=false;
var _1272=Client.qualifies();
var _1273="admin";
var _1274="123456";
this.fireOnLoad=function(){
if(_1272){
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
this.handleBroadcast=function(_1275){
switch(_1275){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1275);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1276=window.bindingMap.appwindow;
_1276.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1277){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1278){
if(_1277){
EventBroadcaster.subscribe(_1278,KickStart);
}else{
EventBroadcaster.unsubscribe(_1278,KickStart);
}
});
}
function kickStart(_1279){
switch(_1279){
case BroadcastMessages.AUDIO_INITIALIZED:
_126f=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_126e=true;
break;
}
if(_126e&&_126f){
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
DataManager.getDataBinding("username").setValue(_1273);
DataManager.getDataBinding("password").setValue(_1274);
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
this.doLogin=function(_127c,_127d){
var _127e=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _127f=false;
var _1280=LoginService.ValidateAndLogin(_127c,_127d);
if(_1280 instanceof SOAPFault){
alert(_1280.getFaultString());
}else{
_127f=_1280;
}
if(_127f){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_127e){
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
var _1281=DataManager.getDataBinding("username");
var _1282=DataManager.getDataBinding("password");
_1281.blur();
_1282.blur();
_1281.setValue("");
_1282.setValue("");
_1281.clean();
_1282.clean();
_1281.focus();
document.getElementById("loginerror").style.display="block";
var _1283={handleAction:function(_1284){
document.getElementById("loginerror").style.display="none";
_1284.target.removeActionListener(Binding.ACTION_DIRTY,_1283);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1283);
}
WindowManager.fireOnLoad(this);
if(!_1272){
UpdateManager.isEnabled=false;
}
};

