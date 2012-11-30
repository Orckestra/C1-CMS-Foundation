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
if(_2a5.name==null||_2a5.name==""){
return;
}
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
var _309=UserInterface.getBinding(_306);
if(_309!=null){
_308.__isAttached=_309.isAttached;
}
if(this._beforeUpdate(_306)){
_307.replaceChild(_308,_306);
this._afterUpdate(_308);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_30a){
var _30b=ReplaceUpdate.superclass._afterUpdate.call(this,_30a);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_30a.nodeName=="form"||_30a.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _30b;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_30e,_30f){
this.type=type;
this.id=id;
this.element=_30e;
this.isFirst=_30f;
return this;
}
SiblingUpdate.prototype.update=function(){
var _310=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_310);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_310);
break;
}
};
SiblingUpdate.prototype._remove=function(_311){
var _312=_311.parentNode;
if(_312!=null){
if(this._beforeUpdate(_311)){
_312.removeChild(_311);
this._afterUpdate(_312);
}
}
};
SiblingUpdate.prototype._insert=function(_313,_314){
var _315=UpdateAssistant.toHTMLElement(_313);
if(this.isFirst){
var _316=_314;
if(_316!=null){
if(this._beforeUpdate(_316)){
_316.insertBefore(_315,_316.firstChild);
this._afterUpdate(_315);
}
}
}else{
var _316=_314.parentNode;
if(_316!=null){
if(this._beforeUpdate(_316)){
_316.insertBefore(_315,_314.nextSibling);
this._afterUpdate(_315);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_317){
var _318=SiblingUpdate.superclass._beforeUpdate.call(this,_317);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_317.id+"\"");
}
return _318;
};
SiblingUpdate.prototype._afterUpdate=function(_319){
var _31a=true;
if(_319!=null){
_31a=SiblingUpdate.superclass._afterUpdate.call(this,_319);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_319.id+"\"");
if(_319.nodeName=="form"||_319.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _31a;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_31c,_31d){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_31c;
this.currentElement=_31d;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _31e=document.getElementById(this.id);
if(this._beforeUpdate(_31e)){
this._updateAttributes(_31e);
this._afterUpdate(_31e);
}
};
AttributesUpdate.prototype._updateAttributes=function(_31f){
Array.forEach(this.element.attributes,function(_320){
var _321=this.currentElement.getAttribute(_320.nodeName);
if(_321==null||_321!=_320.nodeValue){
this._setAttribute(_31f,_320.nodeName,_320.nodeValue);
this._summary.push("@"+_320.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_322){
if(this.element.getAttribute(_322.nodeName)==null){
this._setAttribute(_31f,_322.nodeName,null);
this._summary.push("@"+_322.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_323,name,_325){
if(_323==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_325);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _326=(_325==null);
if(_326){
_323.removeAttribute(name);
}else{
_323.setAttribute(name,_325);
}
if(document.all!=null){
if(_326){
_325="";
}
switch(name.toLowerCase()){
case "class":
_323.className=_325;
break;
case "disabled":
_323.disabled=!_326;
break;
case "checked":
_323.checked=!_326;
break;
case "readonly":
_323.readOnly=!_326;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_327){
AttributesUpdate.superclass._afterUpdate.call(this,_327);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_328,key){
return _328.replace("${windowkey}",document.location+":"+key);
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
var _32c=this._newDimensions.w!=this._currentDimensions.w;
var _32d=this._newDimensions.h!=this._currentDimensions.h;
if(_32c||_32d){
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
},fireOnDOM:function(_32f){
if(Interfaces.isImplemented(IDOMHandler,_32f,true)){
this._ondomstatements.add(_32f);
}
},fireOnLoad:function(_330){
if(Interfaces.isImplemented(ILoadHandler,_330,true)){
this._onloadstatements.add(_330);
}
},fireOnResize:function(_331){
if(Interfaces.isImplemented(IResizeHandler,_331,true)){
this._onresizestatements.add(_331);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_332){
return eval(_332);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_333,_334){
SystemLogger.unsuspend(_334);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_335,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _338=top.app.bindingMap.broadcasterHasDirtyTabs;
_338.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_339,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _33c=top.app.bindingMap.broadcasterHasDirtyTabs;
_33c.disable();
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
var _33d=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_33d=LoginService.Logout(true);
if(!_33d){
alert("Logout failed.");
}
}
return _33d;
},lock:function(_33e){
if(_33e!=null){
this._lockthings[_33e]=true;
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
},unlock:function(_33f,_340){
if(_33f!=null){
delete this._lockthings[_33f];
if(top.bindingMap.mastercover!=null){
if(_340||this._lockers>0){
if(_340){
var out="Unlocked by "+new String(_33f)+"\n";
for(var _342 in this._lockthings){
out+="Locked by "+new String(_342)+". ";
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
},hasLock:function(_343){
return this._lockthings[_343]==true;
},activate:function(_344){
var _345=this._activeBinding;
this._activeBinding=_344;
this._activatedBindings.add(_344);
if(_345&&_345.isActive){
_345.deActivate();
}
},deActivate:function(_346){
var _347=null;
var _348=null;
if(_346==this._activeBinding){
while(!_348&&this._activatedBindings.hasEntries()){
_347=this._activatedBindings.extractLast();
if(_347!=_346&&_347.isActivatable){
_348=_347;
}
}
if(!_348){
_348=app.bindingMap.explorerdock;
}
_348.activate();
}
},focused:function(_349){
this.isFocused=_349;
if(_349){
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
},handleAction:function(_34e){
switch(_34e.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _350=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_352){
var src=_352.src;
if(src.indexOf(_350)>-1){
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
var _357=false;
if(this._isMousePositionTracking){
_357=true;
if(Client.isExplorer&&e.button!=1){
_357=false;
}
if(_357){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _357;
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
},onDragStart:function(_359){
var _35a=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_35a,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_35a.getImage());
this._cursorStartPoint=_359;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_35a.showDrag){
_35a.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_35a.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _35c=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_35c);
}
},onDragStop:function(diff){
if(this._isDragging){
var _35e=BindingDragger.draggedBinding;
if(_35e.hideDrag){
_35e.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_35e.dragType);
this._isDragging=false;
_35e=BindingAcceptor.acceptingBinding;
if(_35e!=null){
if(Interfaces.isImplemented(IAcceptable,_35e,true)==true){
_35e.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_35e);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_35f){
if(this.isDeveloperMode||_35f){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_360){
if(_360==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_361){
switch(_361){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_363){
switch(_363.Key){
case "ProductVersion":
this.versionString=_363.Value;
break;
case "ProductTitle":
this.versionPrettyString=_363.Value;
break;
case "InstallationId":
this.installationID=_363.Value;
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
},initialize:function(_366){
if(!this.isInitialized){
this.isInitialized=true;
if(_366){
this._audio=_366;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _368=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_368=true;
}
return _368;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _369=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _36a={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _36b=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_36b){
for(var key in _36b){
_36a[key]=_36b[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_36a);
}
}});
this.getPref=function(key){
var _36e=null;
if(key){
_36e=_36a[key];
}else{
throw "No such preference.";
}
return _36e;
};
this.setPref=function(key,_370){
if(key){
_36a[key]=_370;
}else{
throw "No such preference.";
}
};
function debug(_371){
var _372=_371?"Persisted preferences":"No persisted preferences. Using defaults";
_372+=":\n";
for(var key in _36a){
var pref=_36a[key];
_372+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_369.fine(_372);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _377=null;
if(this.isInitialized==true){
if(this._persistance){
var _378=this._persistance[id];
if(_378){
_377=_378[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _377;
},setPersistedProperty:function(id,prop,_37b){
if(this.isInitialized==true){
if(this._persistance){
if(_37b!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_37b);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_37c){
switch(_37c){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _37d=top.bindingMap.persistance;
_37d.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _37e=top.bindingMap.persistance;
var map=_37e.getPersistanceMap();
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
function StandardEventHandler(doc,_381){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_381;
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
var _383={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_383);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_383);
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
var _38a=UserInterface.getBinding(node);
if(_38a!=null){
_38a.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_38a!=null?null:node.parentNode;
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
var _38d=Application.trackMousePosition(e);
if(_38d){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_38f){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_38f){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_38f=true;
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
var _390=KeySetBinding.handleKey(this._contextDocument,e);
if(!_390){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _391=this._contextWindow.frameElement;
if(_391!=null){
var _392=DOMUtil.getParentWindow(_391);
if(_392.standardEventHandler!=null){
_392.standardEventHandler._handleKeyDown(e,_38f);
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
var _395=false;
var _396=DOMEvents.getTarget(e);
var name=_396.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_395=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_395;
}
if(_395){
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
StandardEventHandler.prototype.enableNativeKeys=function(_399){
this._isAllowTabs=(_399==true?true:false);
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
function Action(_39c,type){
this.target=_39c;
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
function Animation(_39e){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _39f in _39e){
this[_39f]=_39e[_39f];
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
Animation.prototype.onstart=function(_3a3){
};
Animation.prototype.onstep=function(_3a4){
};
Animation.prototype.onstop=function(_3a5){
};
Point.isEqual=function(p1,p2){
var _3a8=false;
if(p1&&p2){
_3a8=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a8;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3ad=false;
if(dim1&&dim2){
_3ad=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3ad;
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
function BindingAcceptor(_3b4){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b4;
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
var _3b5=new List(this._binding.dragAccept.split(" "));
while(_3b5.hasNext()){
var type=_3b5.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3b7,arg){
var type=arg;
try{
switch(_3b7){
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
function BindingBoxObject(_3bc){
this._domElement=_3bc.getBindingElement();
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
function BindingDragger(_3be){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3be;
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
BindingDragger.prototype.registerHandler=function(_3c0){
if(Interfaces.isImplemented(IDragHandler,_3c0)==true){
this.handler=_3c0;
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
var _3c3=e.button==(e.target?0:1);
if(_3c3){
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
var _3c5=Application.getMousePosition();
var dx=_3c5.x-this.startPoint.x;
var dy=_3c5.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c8,e){
switch(_3c8){
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
function BindingParser(_3ca){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3ca;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3cb){
var _3cc=new List();
var xml=BindingParser.XML.replace("${markup}",_3cb);
var doc=XMLParser.parse(_3cb);
if(doc){
var _3cf=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3cf);
var node=_3cf.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3cc.add(node);
}
node=node.nextSibling;
}
}
return _3cc;
};
BindingParser.prototype._iterate=function(_3d1,_3d2){
var _3d3=null;
switch(_3d1.nodeType){
case Node.ELEMENT_NODE:
_3d3=this._cloneElement(_3d1);
UserInterface.registerBinding(_3d3);
break;
case Node.TEXT_NODE:
_3d3=this._ownerDocument.createTextNode(_3d1.nodeValue);
break;
}
if(_3d3){
_3d2.appendChild(_3d3);
}
if(_3d3&&_3d1.hasChildNodes()){
var _3d4=_3d1.firstChild;
while(_3d4){
this._iterate(_3d4,_3d3);
_3d4=_3d4.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3d5){
var _3d6=DOMUtil.createElementNS(_3d5.namespaceURI?_3d5.namespaceURI:Constants.NS_XHTML,_3d5.nodeName,this._ownerDocument);
var i=0;
while(i<_3d5.attributes.length){
var attr=_3d5.attributes.item(i++);
_3d6.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3d6;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3d9){
var _3da=null;
var _3db=false;
var _3dc=_3d9.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d9)){
var _3dd=UserInterface.getBinding(_3d9);
_3db=BindingSerializer.activeInstance.indexBinding(_3dd);
if(_3db){
_3da=_3dd.key;
_3d9.setAttribute(BindingSerializer.KEYPOINTER,_3da);
}
}
_3da=_3da?_3da:_3dc;
var _3de=new List(_3d9.childNodes);
_3de.each(function(_3df){
if(_3df.nodeType==Node.ELEMENT_NODE){
_3df.setAttribute(BindingSerializer.KEYPOINTER,_3da);
}
});
if(_3db){
BindingSerializer.activeInstance.append(_3da,_3dc);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3e0,_3e1){
BindingSerializer.includeShadowTreeBindings=_3e1?true:false;
BindingSerializer.activeInstance=this;
_3e0.bindingWindow.ElementIterator.iterate(_3e0.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e2){
var _3e3=false;
var _3e4=_3e2.serialize();
if(_3e4!=false){
_3e3=true;
var _3e5="ui:"+DOMUtil.getLocalName(_3e2.bindingElement);
var _3e6=DOMUtil.createElementNS(Constants.NS_UI,_3e5,this._dom);
this._pointers[_3e2.key]=_3e6;
for(var prop in _3e4){
if(_3e4[prop]!=null){
_3e6.setAttribute(prop,String(_3e4[prop]));
}
}
}
return _3e3;
};
BindingSerializer.prototype.append=function(_3e8,_3e9){
var _3ea=this._pointers[_3e8];
var _3eb=_3e9?this._pointers[_3e9]:this._dom;
_3eb.appendChild(_3ea);
};
function ImageProfile(_3ec){
this._default=_3ec.image;
this._hover=_3ec.imageHover;
this._active=_3ec.imageActive;
this._disabled=_3ec.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3ed){
this._default=_3ed;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3ee){
this._hover=_3ee;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3ef){
this._active=_3ef;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3f0){
this._disabled=_3f0;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f1,_3f2,_3f3){
var _3f4=null;
if(_3f1.isAttached){
_3f4=new List();
var _3f5=_3f3?_3f1.getChildElementsByLocalName(_3f2):_3f1.getDescendantElementsByLocalName(_3f2);
_3f5.each(function(_3f6){
var _3f7=UserInterface.getBinding(_3f6);
if(_3f7){
_3f4.add(_3f7);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f1.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f4;
},getAncestorBindingByType:function(_3f9,impl,_3fb){
var _3fc=null;
if(Binding.exists(_3f9)){
var node=_3f9.bindingElement;
while(_3fc==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3fe=UserInterface.getBinding(node);
if(_3fe instanceof impl){
_3fc=_3fe;
}
}else{
if(_3fb&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3fc;
},getAncestorBindingByLocalName:function(_400,_401,_402){
var _403=null;
if(_401=="*"){
var node=_400.bindingElement;
while(!_403&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_403=UserInterface.getBinding(node);
}
}
}else{
_403=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_401,_400.bindingElement,_402));
}
return _403;
},getChildElementsByLocalName:function(_405,_406){
var _407=new List();
var _408=new List(_405.bindingElement.childNodes);
_408.each(function(_409){
if(_409.nodeType==Node.ELEMENT_NODE){
if(_406=="*"||DOMUtil.getLocalName(_409)==_406){
_407.add(_409);
}
}
});
return _407;
},getChildBindingByType:function(_40a,impl){
var _40c=null;
_40a.getChildElementsByLocalName("*").each(function(_40d){
var _40e=UserInterface.getBinding(_40d);
if(_40e!=null&&_40e instanceof impl){
_40c=_40e;
return false;
}else{
return true;
}
});
return _40c;
},getDescendantBindingByType:function(_40f,impl){
var _411=null;
_40f.getDescendantElementsByLocalName("*").each(function(_412){
var _413=UserInterface.getBinding(_412);
if(_413!=null&&_413 instanceof impl){
_411=_413;
return false;
}else{
return true;
}
});
return _411;
},getDescendantBindingsByType:function(_414,impl){
var _416=new List();
_414.getDescendantElementsByLocalName("*").each(function(_417){
var _418=UserInterface.getBinding(_417);
if(_418!=null&&_418 instanceof impl){
_416.add(_418);
}
return true;
});
return _416;
},getNextBindingByLocalName:function(_419,name){
var _41b=null;
var _41c=_419.bindingElement;
while((_41c=DOMUtil.getNextElementSibling(_41c))!=null&&DOMUtil.getLocalName(_41c)!=name){
}
if(_41c!=null){
_41b=UserInterface.getBinding(_41c);
}
return _41b;
},getPreviousBindingByLocalName:function(_41d,name){
var _41f=null;
var _420=_41d.bindingElement;
while((_420=DOMUtil.getPreviousElementSibling(_420))!=null&&DOMUtil.getLocalName(_420)!=name){
}
if(_420!=null){
_41f=UserInterface.getBinding(_420);
}
return _41f;
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
},addFilter:function(_421){
this._filters.add(_421);
},removeFilter:function(_422){
var _423=-1;
this._filters.each(function(fil){
_423++;
var _425=true;
if(fil==_422){
_425=false;
}
return _425;
});
if(_423>-1){
this._filters.del(_423);
}
},_applyFilters:function(node,arg){
var _428=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _42b=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _42c=true;
while(this._filters.hasNext()&&_42c==true){
var _42d=this._filters.getNext();
var res=_42d.call(this,node,arg);
if(res!=null){
_428=res;
switch(res){
case stop:
case skip:
case skip+_42b:
_42c=false;
break;
}
}
}
return _428;
},crawl:function(_42f,arg){
this.contextDocument=_42f.ownerDocument;
this.onCrawlStart();
var _431=this.type==NodeCrawler.TYPE_ASCENDING;
var _432=this._applyFilters(_42f,arg);
if(_432!=NodeCrawler.STOP_CRAWLING){
if(_431&&_432==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_431?_42f.parentNode:_42f;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_434,arg){
var _436=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_436=this._crawlDescending(_434,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_436=this._crawlAscending(_434,arg);
break;
}
return _436;
},_crawlDescending:function(_437,arg){
var skip=NodeCrawler.SKIP_NODE;
var _43a=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _43c=null;
if(_437.hasChildNodes()){
var node=_437.firstChild;
while(node!=null&&_43c!=stop){
this.currentNode=node;
_43c=this._applyFilters(node,arg);
switch(_43c){
case stop:
case _43a:
case skip+_43a:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_43c=stop;
break;
}
}
}
if(_43c!=stop&&_43c!=skip){
this.previousNode=node;
}
break;
}
if(_43c!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _43c;
},_crawlAscending:function(_43f,arg){
var _441=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_43f!=null){
this.currentNode=_43f;
_441=this._applyFilters(_43f,arg);
if(_441!=stop){
var next=this.nextNode?this.nextNode:_43f.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_43f;
_441=this._crawl(next,arg);
}
}
}else{
_441=stop;
}
return _441;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _445 in this){
this[_445]=null;
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
var _448=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_448=NodeCrawler.SKIP_NODE;
}
return _448;
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
this.addFilter(function(_449,arg){
var _44b=null;
if(!UserInterface.hasBinding(_449)){
_44b=NodeCrawler.SKIP_NODE;
}
return _44b;
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
this.addFilter(function(_44d,arg){
var _44f=null;
var _450=UserInterface.getBinding(_44d);
if(Interfaces.isImplemented(ICrawlerHandler,_450)==true){
self.response=null;
_450.handleCrawler(self);
_44f=self.response;
}
return _44f;
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
this.addFilter(function(_452,list){
var _454=null;
var _455=UserInterface.getBinding(_452);
if(Interfaces.isImplemented(IFlexible,_455)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_455);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_455.isFlexSuspended==true){
_454=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_455);
}
break;
}
}
return _454;
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
this.addFilter(function(_456,list){
var _458=null;
var _459=UserInterface.getBinding(_456);
if(_459.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_459)==true){
if(_459.isFocusable&&_459.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_459);
break;
case FocusCrawler.MODE_FOCUS:
if(!_459.isFocused){
_459.focus();
}
_458=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_459.isFocused==true){
_459.blur();
_458=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _458;
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
this.addFilter(function(_45a,list){
var _45c=null;
var _45d=UserInterface.getBinding(_45a);
if(!_45d.isVisible){
_45c=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _45c;
});
this.addFilter(function(_45e,list){
var _460=null;
var _461=UserInterface.getBinding(_45e);
if(_461.isAttached){
if(Interfaces.isImplemented(IFit,_461)){
if(!_461.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_461);
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
UpdateAssistant.serialize=function(_462){
_462=_462.cloneNode(true);
_462.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_462.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_462);
};
}
},handleEvent:function(e){
var _464=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_464);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_464);
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
},_beforeUpdate:function(_465){
var _466=(_465==document.documentElement);
if(_466){
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
var _469=FocusBinding.focusedBinding;
if(_469!=null){
this._focusID=_469.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_465.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_465);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_465,false);
break;
}
}
},_afterUpdate:function(_46a){
var _46b=(_46a==document.documentElement);
if(_46b){
var _46c=this._elementsbuffer;
if(_46c.hasEntries()){
_46c.each(function(_46d){
DocumentManager.attachBindings(_46d);
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
var _470=FocusBinding.focusedBinding;
if(_470==null){
var _471=document.getElementById(this._focusID);
if(_471!=null){
var _470=UserInterface.getBinding(_471);
if(_470!=null){
_470.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _472=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _473="NEW DOM: "+document.title+"\n\n"+_472+"\n\n";
_473+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_473);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_46a.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_46a.__isAttached!==false){
this._elementsbuffer.add(_46a);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46a,true);
break;
}
switch(_46a.id){
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
var _470=UserInterface.getBinding(_46a);
while(_470==null&&_46a!=null){
_470=UserInterface.getBinding(_46a);
_46a=_46a.parentNode;
}
if(_470!=null){
_470.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_475,_476){
var _477=UserInterface.getBinding(_475);
if(_477!=null){
if(_476){
var _478=this._attributesbuffer;
var map=new Map();
_478.each(function(name,old){
var now=_475.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_475.attributes).each(function(att){
if(att.specified){
if(!_478.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_47f){
var _480=_477.propertyMethodMap[name];
if(_480!=null){
_480.call(_477,_47f);
}
});
}else{
var map=new Map();
new List(_475.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_482,_483){
var _484=window.bindingMap[_482.getAttribute("id")];
if(_484!=null){
return _484.handleElement(_482,_483);
}
},updateElement:function(_485,_486){
var _487=window.bindingMap[_485.getAttribute("id")];
if(_487!=null){
return _487.updateElement(_485,_486);
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
this.addFilter(function(_489,list){
var _48b=UserInterface.getBinding(_489);
var _48c=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_48b==null){
UserInterface.registerBinding(_489);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_48b!=null){
if(!_48b.isAttached){
list.add(_48b);
}
if(_48b.isLazy==true){
_48c=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_48b!=null){
list.add(_48b);
}
break;
}
return _48c;
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
},handleBroadcast:function(_48d,arg){
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
var _490=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_490)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_490!=null){
if(_490.href!=null&&_490.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _491=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_491!=null){
var map={};
var _493=DOMUtil.getElementsByTagName(_491,"bindingmapping");
new List(_493).each(function(_494){
var _495=_494.getAttribute("element");
var _496=_494.getAttribute("binding");
map[_495]=eval(_496);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_497){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_497;
}else{
this.customUserInterfaceMapping.merge(_497);
}
},_registerBindings:function(_498){
var _499=new DocumentCrawler();
_499.mode=DocumentCrawler.MODE_REGISTER;
_499.crawl(_498);
_499.dispose();
},_attachBindings:function(_49a){
var _49b=new DocumentCrawler();
_49b.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_49b.crawl(_49a,list);
var _49d=false;
while(list.hasNext()){
var _49e=list.getNext();
if(!_49e.isAttached){
_49e.onBindingAttach();
if(!_49e.memberDependencies){
_49e.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_49e)){
_49d=true;
}
}
}
if(_49d){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49b.dispose();
list.dispose();
},attachBindings:function(_4a0){
this._registerBindings(_4a0);
this._attachBindings(_4a0);
},detachBindings:function(_4a1,_4a2){
var _4a3=new DocumentCrawler();
_4a3.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a3.crawl(_4a1,list);
if(_4a2==true){
list.extractFirst();
}
var _4a5=false;
list.reverse().each(function(_4a6){
if(Interfaces.isImplemented(IData,_4a6)){
_4a5=true;
}
_4a6.dispose(true);
});
if(_4a5){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a3.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4a8){
return (/textarea|input/.test(DOMUtil.getLocalName(_4a8)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a9){
this.isDirty=true;
var _4aa=false;
if(_4a9!=null&&!_4a9.isDirty){
_4a9.isDirty=true;
_4a9.dispatchAction(Binding.ACTION_DIRTY);
_4aa=true;
}
return _4aa;
},clean:function(_4ab){
if(_4ab.isDirty){
_4ab.isDirty=false;
}
},registerDataBinding:function(name,_4ad){
if(Interfaces.isImplemented(IData,_4ad,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4ad;
}
}else{
throw "Invalid DataBinding: "+_4ad;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4b0=null;
if(this._dataBindings[name]!=null){
_4b0=this._dataBindings[name];
}
return _4b0;
},getAllDataBindings:function(_4b1){
var list=new List();
for(var name in this._dataBindings){
var _4b4=this._dataBindings[name];
list.add(_4b4);
if(_4b1&&_4b4 instanceof WindowBinding){
var _4b5=_4b4.getContentWindow().DataManager;
if(_4b5!=null){
list.merge(_4b5.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4b6=false;
for(var name in this._dataBindings){
_4b6=true;
break;
}
return _4b6;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4ba){
var _4bb=this._dataBindings[name];
if(_4bb!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4bb.setResult(_4ba);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4bb);
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
var _4bc=new DataBindingMap();
_4bc.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4be=this._dataBindings[name];
if(_4be instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4bc[name]=_4be.getValue();
}
return _4bc;
},getDataBindingResultMap:function(){
var _4bf=new DataBindingMap();
_4bf.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c1=this._dataBindings[name];
var res=_4c1.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c4){
_4bf.set(name,_4c4);
});
}else{
_4bf.set(name,res);
}
}
return _4bf;
},getPostBackString:function(){
var _4c5="";
var form=document.forms[0];
if(form!=null){
var _4c7="";
new List(form.elements).each(function(_4c8){
var name=_4c8.name;
var _4ca=encodeURIComponent(_4c8.value);
switch(_4c8.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c5+=name+"="+_4ca+"&";
break;
case "submit":
if(document.activeElement==_4c8){
_4c5+=name+"="+_4ca+"&";
}
break;
case "radio":
if(_4c8.checked){
_4c5+=name+"="+_4ca+"&";
}
break;
case "checkbox":
if(_4c8.checked){
if(_4c8.name==_4c7){
if(_4c5.lastIndexOf("&")==_4c5.length-1){
_4c5=_4c5.substr(0,_4c5.length-1);
}
_4c5+=","+_4ca;
}else{
_4c5+=name+"="+_4c8.value;
}
_4c7=name;
_4c5+="&";
}
break;
}
});
}
return _4c5.substr(0,_4c5.length-1);
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
var _4d3=null;
var _4d4=null;
var _4d5=false;
if(!this._cache[name]){
_4d5=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4d7=DOMUtil.getXMLHTTPRequest();
_4d7.open("get",uri,false);
_4d7.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4d7.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d4=_4d7.responseText;
break;
default:
_4d4=_4d7.responseXML;
break;
}
if(_4d4==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d4;
}
}
_4d4=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d3=_4d4;
break;
case this._modes.MODE_DOCUMENT:
_4d3=DOMUtil.cloneNode(_4d4,true);
break;
case this._modes.MODE_ELEMENT:
_4d3=DOMUtil.cloneNode(_4d4.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d3=DOMSerializer.serialize(_4d4,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d3=DOMSerializer.serialize(_4d4.documentElement,true);
break;
}
if(_4d5&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4d3));
}
return _4d3;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4da){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4da];
},invoke:function(url,_4dc,_4dd){
this._logger.error("Not implemented");
},invokeModal:function(url,_4df,_4e0){
var _4e1=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4df,argument:_4e0});
StageBinding.presentViewDefinition(_4e1);
return _4e1;
},invokeDefinition:function(_4e2){
if(_4e2 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e2);
}
return _4e2;
},question:function(_4e3,text,_4e5,_4e6){
if(!_4e5){
_4e5=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e3,text,_4e5,_4e6);
},message:function(_4e7,text,_4e9,_4ea){
if(!_4e9){
_4e9=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4e7,text,_4e9,_4ea);
},error:function(_4eb,text,_4ed,_4ee){
if(!_4ed){
_4ed=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4eb,text,_4ed,_4ee);
},warning:function(_4ef,text,_4f1,_4f2){
if(!_4f1){
_4f1=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4ef,text,_4f1,_4f2);
},_standardDialog:function(type,_4f4,text,_4f6,_4f7){
var _4f8=null;
if(!_4f6){
_4f8=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4f8=new List();
new List(_4f6).each(function(_4f9){
var _4fa=null;
switch(typeof _4f9){
case "object":
_4fa=_4f9;
break;
case "string":
var _4fb=false;
if(_4f9.indexOf(":")>-1){
_4f9=_4f9.split(":")[0];
_4fb=true;
}
_4fa=Dialog.dialogButton(_4f9);
if(_4fb){
_4fa.isDefault=true;
}
break;
}
_4f8.add(_4fa);
});
}
var _4fc={title:_4f4,text:text,type:type,image:this._dialogImages[type],buttons:_4f8};
var _4fd=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4f7,argument:_4fc});
StageBinding.presentViewDefinition(_4fd);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4ff,arg){
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
},saveAll:function(_502){
var self=this;
var _504=Application.getDirtyDockTabsTabs();
if(_504.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_505,_506){
switch(_505){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_506,_502);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_504);
}else{
if(_502){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_507,_508){
var _509=false;
var list=new List();
_507.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_509=true;
var _50d=list.getLength();
var _50e={handleBroadcast:function(_50f,tab){
if(--_50d==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_508){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_50e);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _509;
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
var _513="Composite.Management.Help";
if(!StageBinding.isViewOpen(_513)){
StageBinding.handleViewPresentation(_513);
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
var _515=document.createEvent("Events");
_515.initEvent(type,true,true);
window.dispatchEvent(_515);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function CompositeUrl(url){
var _517=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _518=_517.exec(url);
if(_518){
var _519={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_519[$1]=$3;
});
this.queryString=_519;
this.path=url.replace(/\?.*/g,"");
if(_518[3]=="media"){
this.isMedia=true;
}else{
if(_518[3]=="page"){
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
CompositeUrl.prototype.setParam=function(key,_521){
this.queryString[key]=_521;
};
CompositeUrl.prototype.toString=function(){
var url=this.path;
var _523=[];
for(var key in this.queryString){
_523.push(key+"="+this.queryString[key]);
}
if(_523.length>0){
url+="?"+_523.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_525,_526){
var _527=null;
var _528=ViewDefinitions[_525];
if(_528.isMutable){
var impl=null;
if(_528 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_526!=null&&impl!=null){
var def=new impl();
for(var prop in _528){
def[prop]=ViewDefinition.cloneProperty(_528[prop]);
}
def.handle=_526;
_527=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _527;
};
ViewDefinition.cloneProperty=function(_52c){
if(null==_52c){
return _52c;
}
if(typeof _52c==="object"){
var _52d=(_52c.constructor===Array)?[]:{};
for(var prop in _52c){
_52d[prop]=ViewDefinition.cloneProperty(_52c[prop]);
}
return _52d;
}
return _52c;
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
Binding.evaluate=function(_534,_535){
var _536=null;
var _537=_535.bindingWindow.WindowManager;
if(_537!=null){
var _538=Binding.parseScriptStatement(_534,_535.key);
_536=_537.evaluate(_538);
}
return _536;
};
Binding.parseScriptStatement=function(_539,key){
if(_539!=null&&key!=null){
var _53b="UserInterface.getBindingByKey ( \""+key+"\" )";
_539=_539.replace(/(\W|^)this(,| +|\)|;)/g,_53b);
_539=_539.replace(/(\W|^)this(\.)/g,_53b+".");
}
return _539;
};
Binding.exists=function(_53c){
var _53d=false;
try{
if(_53c&&_53c.bindingElement&&_53c.bindingElement.nodeType&&_53c.isDisposed==false){
_53d=true;
}
}
catch(accessDeniedException){
_53d=false;
}
finally{
return _53d;
}
};
Binding.destroy=function(_53e){
if(!_53e.isDisposed){
if(_53e.acceptor!=null){
_53e.acceptor.dispose();
}
if(_53e.dragger!=null){
_53e.disableDragging();
}
if(_53e.boxObject!=null){
_53e.boxObject.dispose();
}
if(_53e._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_53e);
}
for(var _53f in _53e.shadowTree){
var _540=_53e.shadowTree[_53f];
if(_540 instanceof Binding&&Binding.exists(_540)){
_540.dispose(true);
}
_53e.shadowTree[_53f]=null;
}
_53e.isDisposed=true;
_53e=null;
}
};
Binding.dotnetify=function(_541,_542){
var _543=_541.getCallBackID();
if(_543!=null){
var _544=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_541.bindingDocument);
_544.type="hidden";
_544.id=_543;
_544.name=_543;
_544.value=_542!=null?_542:"";
_541.bindingElement.appendChild(_544);
_541.shadowTree.dotnetinput=_544;
}else{
throw _541.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_545){
var _546=_545.getProperty("image");
var _547=_545.getProperty("image-hover");
var _548=_545.getProperty("image-active");
var _549=_545.getProperty("image-disabled");
if(_545.imageProfile==null){
if(_545.image==null&&_546!=null){
_545.image=_546;
}
if(_545.imageHover==null&&_547!=null){
_545.imageHover=_546;
}
if(_545.imageActive==null&&_548!=null){
_545.imageActive=_548;
}
if(_545.imageDisabled==null&&_549!=null){
_545.imageDisabled=_549;
}
if(_545.image||_545.imageHover||_545.imageActive||_545.imageDisabled){
_545.imageProfile=new ImageProfile(_545);
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
var _54b=this.dependentBindings[key];
_54b.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_54c){
if(_54c){
this.memberDependencies[_54c.key]=true;
var _54d=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_54d=false;
break;
}
}
if(_54d){
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
Binding.prototype.detachRecursive=function(_54f){
if(_54f==null){
_54f=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_54f);
};
Binding.prototype.addMember=function(_550){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_550.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_550.key]=false;
_550.registerDependentBinding(this);
}
}
return _550;
};
Binding.prototype.addMembers=function(_551){
while(_551.hasNext()){
var _552=_551.getNext();
if(!_552.isInitialized){
this.addMember(_552);
}
}
return _551;
};
Binding.prototype.registerDependentBinding=function(_553){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_553.key]=_553;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _554=this.getProperty("persist");
if(_554&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _556=new List(_554.split(" "));
while(_556.hasNext()){
var prop=_556.getNext();
var _558=Persistance.getPersistedProperty(id,prop);
if(_558!=null){
this._persist[prop]=_558;
this.setProperty(prop,_558);
}else{
_558=this.getProperty(prop);
if(_558!=null){
this._persist[prop]=_558;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _559=this.getProperty("disabled");
var _55a=this.getProperty("contextmenu");
var _55b=this.getProperty("observes");
var _55c=this.getProperty("onattach");
var _55d=this.getProperty("hidden");
var _55e=this.getProperty("blockactionevents");
if(_55d==true&&this.isVisible==true){
this.hide();
}
if(_559&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_55a){
this.setContextMenu(_55a);
}
if(_55b){
this.observe(this.getBindingForArgument(_55b));
}
if(_55e==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_55c!=null){
Binding.evaluate(_55c,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _560=this.getProperty("draggable");
var _561=this.getProperty("dragtype");
var _562=this.getProperty("dragaccept");
var _563=this.getProperty("dragreject");
if(_560!=null){
this.isDraggable=_560;
}
if(_561!=null){
this.dragType=_561;
if(_560!=false){
this.isDraggable=true;
}
}
if(_562!=null){
this.dragAccept=_562;
}
if(_563!=null){
this.dragReject=_563;
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
Binding.prototype._updateBindingMap=function(_564){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _567=null;
if(_564){
_567=map[id];
if(_567!=null&&_567!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_567=map[id];
if(_567!=null&&_567==this){
delete map[id];
}
}
}else{
var _569=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_564);
if(Application.isDeveloperMode==true){
alert(_569);
}else{
this.logger.error(_569);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_56b){
};
Binding.prototype.handleBroadcast=function(_56c,arg){
};
Binding.prototype.handleElement=function(_56e){
return false;
};
Binding.prototype.updateElement=function(_56f){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _571=null;
switch(typeof arg){
case "object":
_571=arg;
break;
case "string":
_571=this.bindingDocument.getElementById(arg);
if(_571==null){
_571=Binding.evaluate(arg,this);
}
break;
}
if(_571!=null&&_571.nodeType!=null){
_571=UserInterface.getBinding(_571);
}
return _571;
};
Binding.prototype.serialize=function(){
var _572={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_572.id=id;
}
var _574=this.getProperty("binding");
if(_574){
_572.binding=_574;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _575=this.getAncestorBindingByLocalName("*");
if(_575){
if(_575.isShadowBinding){
this.isShadowBinding=true;
_572=false;
}else{
var tree=_575.shadowTree;
for(var key in tree){
var _578=tree[key];
if(_578==this){
this.isShadowBinding=true;
_572=false;
}
}
}
}
}
return _572;
};
Binding.prototype.serializeToString=function(_579){
var _57a=null;
if(this.isAttached){
_57a=new BindingSerializer().serializeBinding(this,_579);
}else{
throw "cannot serialize unattached binding";
}
return _57a;
};
Binding.prototype.subTreeFromString=function(_57b){
this.detachRecursive();
this.bindingElement.innerHTML=_57b;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_57c){
var _57d=this.bindingElement.getAttribute(_57c);
if(_57d){
_57d=Types.castFromString(_57d);
}
return _57d;
};
Binding.prototype.setProperty=function(prop,_57f){
if(_57f!=null){
_57f=_57f.toString();
if(String(this.bindingElement.getAttribute(prop))!=_57f){
this.bindingElement.setAttribute(prop,_57f);
if(this.isAttached==true){
if(Persistance.isEnabled&&_57f!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_57f;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_57f);
}
}
var _580=this.propertyMethodMap[prop];
if(_580){
_580.call(this,this.getProperty(prop));
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
var _582=null;
if(Binding.exists(this)){
_582=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _582;
};
Binding.prototype.attachClassName=function(_583){
CSSUtil.attachClassName(this.bindingElement,_583);
};
Binding.prototype.detachClassName=function(_584){
CSSUtil.detachClassName(this.bindingElement,_584);
};
Binding.prototype.hasClassName=function(_585){
return CSSUtil.hasClassName(this.bindingElement,_585);
};
Binding.prototype.addActionListener=function(type,_587){
_587=_587!=null?_587:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_587)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_587);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_587+")");
}
};
Binding.prototype.removeActionListener=function(type,_589){
_589=_589?_589:this;
if(Action.isValid(type)){
var _58a=this.actionListeners[type];
if(_58a){
var i=0,_58c;
while((_58c=_58a[i])!=null){
if(_58c==_589){
_58a.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_58e){
_58e=_58e?_58e:this;
DOMEvents.addEventListener(this.bindingElement,type,_58e);
};
Binding.prototype.removeEventListener=function(type,_590){
_590=_590?_590:this;
DOMEvents.removeEventListener(this.bindingElement,type,_590);
};
Binding.prototype.subscribe=function(_591){
if(!this.hasSubscription(_591)){
this._subscriptions.set(_591,true);
EventBroadcaster.subscribe(_591,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_591);
}
};
Binding.prototype.unsubscribe=function(_592){
if(this.hasSubscription(_592)){
this._subscriptions.del(_592);
EventBroadcaster.unsubscribe(_592,this);
}
};
Binding.prototype.hasSubscription=function(_593){
return this._subscriptions.has(_593);
};
Binding.prototype.observe=function(_594,_595){
_594.addObserver(this,_595);
};
Binding.prototype.unObserve=function(_596,_597){
_596.removeObserver(this,_597);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _59c={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_59c);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_59c);
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
var _59e=null;
var _59f=null;
var _5a0=false;
if(arg instanceof Action){
_59e=arg;
}else{
if(Action.isValid(arg)){
_59e=new Action(this,arg);
_5a0=true;
}
}
if(_59e!=null&&Action.isValid(_59e.type)==true){
if(_59e.isConsumed==true){
_59f=_59e;
}else{
var _5a1=this.actionListeners[_59e.type];
if(_5a1!=null){
_59e.listener=this;
var i=0,_5a3;
while((_5a3=_5a1[i++])!=null){
if(_5a3&&_5a3.handleAction){
_5a3.handleAction(_59e);
}
}
}
var _5a4=true;
if(this.isBlockingActions==true){
switch(_59e.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a0){
_5a4=false;
}
break;
}
}
if(_5a4){
_59f=this.migrateAction(_59e);
}else{
_59f=_59e;
}
}
}
return _59f;
};
Binding.prototype.migrateAction=function(_5a5){
var _5a6=null;
var _5a7=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5a6&&node.nodeType!=Node.DOCUMENT_NODE){
_5a6=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5a6){
_5a7=_5a6.dispatchAction(_5a5);
}else{
_5a7=_5a5;
}
}
return _5a7;
};
Binding.prototype.reflex=function(_5a9){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5a9);
}
};
Binding.prototype.getMigrationParent=function(){
var _5aa=null;
if(true){
try{
var _5ab=this.bindingElement.parentNode;
if(_5ab!=null){
_5aa=_5ab;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5aa=null;
}
}
return _5aa;
};
Binding.prototype.add=function(_5ac){
if(_5ac.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5ac.bindingElement);
}else{
throw "Could not add "+_5ac.toString()+" of different document origin.";
}
return _5ac;
};
Binding.prototype.addFirst=function(_5ad){
if(_5ad.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5ad.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5ad.toString()+" of different document origin.";
}
return _5ad;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5ae,_5af){
return BindingFinder.getAncestorBindingByLocalName(this,_5ae,_5af);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b1){
return BindingFinder.getAncestorBindingByType(this,impl,_5b1);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b3){
return BindingFinder.getChildElementsByLocalName(this,_5b3);
};
Binding.prototype.getChildElementByLocalName=function(_5b4){
return this.getChildElementsByLocalName(_5b4).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5b5){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5b5));
};
Binding.prototype.getChildBindingsByLocalName=function(_5b6){
return this.getDescendantBindingsByLocalName(_5b6,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5b7){
return this.getChildBindingsByLocalName(_5b7).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5b8,_5b9){
return BindingFinder.getDescendantBindingsByLocalName(this,_5b8,_5b9);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5ba){
return this.getDescendantBindingsByLocalName(_5ba,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5bd){
return BindingFinder.getNextBindingByLocalName(this,_5bd);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5be){
return BindingFinder.getPreviousBindingByLocalName(this,_5be);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5bf){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5bf);
};
Binding.prototype.isFirstBinding=function(_5c0){
return (this.getOrdinalPosition(_5c0)==0);
};
Binding.prototype.isLastBinding=function(_5c1){
return DOMUtil.isLastElement(this.bindingElement,_5c1);
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
Binding.prototype.setCallBackArg=function(_5c3){
this.setProperty(Binding.CALLBACKARG,_5c3);
};
Binding.prototype.dispose=function(_5c4){
if(!this.isDisposed){
if(!_5c4){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5c5=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5c5){
if(Client.isExplorer){
_5c5.outerHTML="";
}else{
_5c5.parentNode.removeChild(_5c5);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5c8){
list.add(_5c8);
});
list.each(function(_5c9){
self.unsubscribe(_5c9);
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
Binding.prototype.wakeUp=function(_5cb,_5cc){
_5cc=_5cc?_5cc:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5cb!==undefined){
self[_5cb]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5cc);
},0);
}
};
Binding.prototype.handleCrawler=function(_5ce){
if(_5ce.response==null&&this.isLazy==true){
if(_5ce.id==DocumentCrawler.ID&&_5ce.mode==DocumentCrawler.MODE_REGISTER){
_5ce.response=NodeCrawler.NORMAL;
}else{
_5ce.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5ce.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5ce.id)){
_5ce.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5ce.response==null){
switch(_5ce.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5ce.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5cf){
var _5d0=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5cf);
return UserInterface.registerBinding(_5d0,Binding);
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
var _5d1=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d1.each(function(_5d2){
DataBinding.expressions[_5d2.Key]=new RegExp(_5d2.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d3){
var _5d4=null;
var _5d5=_5d3.getAncestorBindingByLocalName("field");
if(_5d5&&_5d5 instanceof FieldBinding){
var desc=_5d5.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d4=desc.getLabel();
}
}
return _5d4;
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
var _5d8=this.bindingWindow.DataManager;
_5d8.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5da=this.bindingWindow.DataManager;
if(_5da.getDataBinding(name)){
_5da.unRegisterDataBinding(name);
}
_5da.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5db,arg){
RootBinding.superclass.handleBroadcast.call(this,_5db,arg);
var _5dd=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5db){
case _5dd:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5dd);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5de){
var _5df=_5de?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5de!=this.isActivated){
this.isActivated=_5de;
this.dispatchAction(_5df);
var _5e0=new List();
var self=this;
this._activationawares.each(function(_5e2){
if(_5e2.isActivationAware){
try{
if(_5de){
if(!_5e2.isActivated){
_5e2.onActivate();
}
}else{
if(_5e2.isActivated){
_5e2.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e0.add(_5e2);
}
}
});
_5e0.each(function(_5e3){
this._activationawares.del(_5e3);
});
_5e0.dispose();
}else{
var _5e4="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e4);
}else{
this.logger.error(_5e4);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5e5,_5e6){
if(Interfaces.isImplemented(IActivationAware,_5e5,true)==true){
if(_5e6==false){
this._activationawares.del(_5e5);
}else{
this._activationawares.add(_5e5);
if(this.isActivated==true){
_5e5.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5e5+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5e7){
var _5e8=this.getMigrationParent();
if(_5e8!=null){
var root=_5e8.ownerDocument.body;
var _5ea=UserInterface.getBinding(root);
if(_5ea!=null){
_5ea.makeActivationAware(this,_5e7);
}
}
};
RootBinding.prototype.handleCrawler=function(_5eb){
RootBinding.superclass.handleCrawler.call(this,_5eb);
if(_5eb.type==NodeCrawler.TYPE_ASCENDING){
_5eb.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5ec=null;
if(this.bindingWindow.parent){
_5ec=this.bindingWindow.frameElement;
}
return _5ec;
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
var _5ed=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5ed.hasNext()){
var cell=_5ed.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5ef){
var _5f0=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5ef.bindingElement);
_5f0=_5ef;
}else{
_5f0=MatrixBinding.superclass.add.call(this,_5ef);
}
return _5f0;
};
MatrixBinding.prototype.addFirst=function(_5f1){
var _5f2=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5f3=this.shadowTree[MatrixBinding.CENTER];
_5f3.insertBefore(_5f1.bindingElement,_5f3.firstChild);
_5f2=_5f1;
}else{
_5f2=MatrixBinding.superclass.addFirst.call(this,_5f1);
}
return _5f1;
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
MatrixBinding.newInstance=function(_5f5){
var _5f6=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5f5);
return UserInterface.registerBinding(_5f6,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5f7,_5f8){
var list=new List();
var _5fa=new FlexBoxCrawler();
_5fa.mode=_5f8?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5fa.startBinding=_5f7;
_5fa.crawl(_5f7.bindingElement,list);
list.each(function(_5fb){
_5fb.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5fc){
if(Binding.exists(_5fc)){
_5fc.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5fd){
if(Binding.exists(_5fd)){
_5fd.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5fa.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5fe){
FlexBoxBinding.superclass.handleAction.call(this,_5fe);
switch(_5fe.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5ff){
var _600=0;
var _601=new List(this.bindingElement.parentNode.childNodes);
while(_601.hasNext()){
var _602=_601.getNext();
if(_602.nodeType==Node.ELEMENT_NODE&&_602!=this.bindingElement){
if(!this._isOutOfFlow(_602)){
var rect=_602.getBoundingClientRect();
if(_5ff){
height+=(rect.right-rect.left);
}else{
_600+=(rect.bottom-rect.top);
}
}
}
}
return _600;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_604){
var _605=CSSComputer.getPosition(_604);
var _606=CSSComputer.getFloat(_604);
return (_605=="absolute"||_606!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _607=this.bindingElement.parentNode;
var rect=_607.getBoundingClientRect();
var _609=rect.bottom-rect.top;
var _60a=CSSComputer.getPadding(_607);
var _60b=CSSComputer.getBorder(_607);
_609-=(_60a.top+_60a.bottom);
_609-=(_60b.top+_60b.bottom);
return _609;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _60c=this.bindingElement.parentNode;
var rect=_60c.getBoundingClientRect();
var _60e=rect.right-rect.left;
var _60f=CSSComputer.getPadding(_60c);
var _610=CSSComputer.getBorder(_60c);
_60e-=(_60f.left+_60f.right);
_60e-=(_610.left+_610.right);
return _60e;
};
FlexBoxBinding.prototype.setFlexibility=function(_611){
if(_611!=this.isFlexible){
if(_611){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_611;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _612=this._getSiblingsSpan();
_612=this._getCalculatedHeight()-_612;
if(!isNaN(_612)&&_612>=0){
if(_612!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_612)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_613){
if(!this.isFit||_613){
var _614=0;
new List(this.bindingElement.childNodes).each(function(_615){
if(_615.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_615)){
var rect=_615.getBoundingClientRect();
_614+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_614);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_617){
var _618=CSSComputer.getPadding(this.bindingElement);
var _619=CSSComputer.getBorder(this.bindingElement);
_617+=_618.top+_618.bottom;
_617+=_619.top+_619.bottom;
this.bindingElement.style.height=_617+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_61a){
ScrollBoxBinding.superclass.handleAction.call(this,_61a);
switch(_61a.type){
case BalloonBinding.ACTION_INITIALIZE:
_61a.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_61b){
this.bindingElement.scrollLeft=_61b.x;
this.bindingElement.scrollTop=_61b.y;
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
var _61c=this._getBuildElement("labeltext");
if(_61c){
this.shadowTree.labelText=_61c;
this.shadowTree.text=_61c.firstChild;
this.hasLabel=true;
}
}else{
var _61d=this.getProperty("label");
var _61e=this.getProperty("image");
var _61f=this.getProperty("tooltip");
if(_61d){
this.setLabel(_61d,false);
}
if(_61e){
this.setImage(_61e,false);
}
if(_61f){
this.setToolTip(_61f);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_620,_621){
_620=_620!=null?_620:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_620);
this.setProperty("label",_620);
if(!_621){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_623){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_623){
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
LabelBinding.prototype.setToolTip=function(_626){
this.setProperty("tooltip",_626);
if(_626!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_626));
}
};
LabelBinding.prototype.getToolTip=function(_627){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_628){
_628=_628==null?true:_628;
var _629=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_628;
if(_628){
this.attachClassName(_629);
}else{
this.detachClassName(_629);
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
var _62a="textonly";
var _62b="imageonly";
var _62c="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_62a);
this.detachClassName(_62b);
this.attachClassName(_62c);
}else{
if(this.hasLabel){
this.detachClassName(_62c);
this.detachClassName(_62b);
this.attachClassName(_62a);
}else{
if(this.hasImage){
this.detachClassName(_62c);
this.detachClassName(_62a);
this.attachClassName(_62b);
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
LabelBinding.newInstance=function(_62d){
var _62e=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_62d);
return UserInterface.registerBinding(_62e,LabelBinding);
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
var _62f=this.getProperty("label");
if(!_62f){
_62f=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_62f));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_631){
this.setProperty("label",_631);
};
TextBinding.newInstance=function(_632){
var _633=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_632);
return UserInterface.registerBinding(_633,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_634,_635){
BroadcasterBinding.superclass.setProperty.call(this,_634,_635);
function update(list){
if(list){
list.each(function(_637){
_637.setProperty(_634,_635);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _638=this._observers[_634];
if(_638){
update(_638);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_639){
BroadcasterBinding.superclass.deleteProperty.call(this,_639);
function update(list){
if(list){
list.each(function(_63b){
_63b.deleteProperty(_639);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _63c=this._observers[_639];
if(_63c){
update(_63c);
}
};
BroadcasterBinding.prototype.addObserver=function(_63d,_63e){
_63e=_63e?_63e:"*";
_63e=new List(_63e.split(" "));
while(_63e.hasNext()){
var _63f=_63e.getNext();
switch(_63f){
case "*":
this._setAllProperties(_63d);
break;
default:
var _640=this.getProperty(_63f);
_63d.setProperty(_63f,_640);
break;
}
if(!this._observers[_63f]){
this._observers[_63f]=new List();
}
this._observers[_63f].add(_63d);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_641){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _644=att.nodeName;
switch(_644){
case "id":
case "key":
break;
default:
var _645=this.getProperty(_644);
_641.setProperty(_644,_645);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_646,_647){
_647=_647?_647:"*";
_647=new List(_647.split(" "));
while(_647.hasNext()){
var list=this._observers[_647.getNext()];
if(list){
while(list.hasNext()){
var _649=list.getNext();
if(_649==_646){
list.del(_649);
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
BroadcasterBinding.prototype.setDisabled=function(_64a){
this.setProperty("isdisabled",_64a);
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
var _64c=this.getProperty("width");
var _64d=this.getProperty("label");
var type=this.getProperty("type");
var _64f=this.getProperty("popup");
var _650=this.getProperty("tooltip");
var _651=this.getProperty("isdisabled");
var _652=this.getProperty("response");
var _653=this.getProperty("oncommand");
var _654=this.getProperty("value");
var _655=this.getProperty("ischecked");
var _656=this.getProperty("callbackid");
var _657=this.getProperty("focusable");
var _658=this.getProperty("focused");
var _659=this.getProperty("default");
var url=this.getProperty("url");
var _65b=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_65b){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_64d!=null){
this.setLabel(_64d);
}
if(type!=null){
this.setType(type);
}
if(_650!=null){
this.setToolTip(_650);
}
if(_64c!=null){
this.setWidth(_64c);
}
if(_64f!=null){
this.setPopup(_64f);
}
if(_652!=null){
this.response=_652;
}
if(_655==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_653!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_653,this);
};
}
if(_657||this.isFocusable){
this._makeFocusable();
if(_659||this.isDefault){
this.isDefault=true;
}
if(_658){
this.focus();
}
}
if(_651==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_656!=null){
this.bindingWindow.DataManager.registerDataBinding(_656,this);
if(_654!=null){
Binding.dotnetify(this,_654);
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
ButtonBinding.prototype.setImage=function(_65c){
if(this.isAttached){
this.labelBinding.setImage(_65c);
}
this.setProperty("image",_65c);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_65d){
if(this.isAttached){
this.labelBinding.setLabel(_65d);
}
this.setProperty("label",_65d);
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
ButtonBinding.prototype.setToolTip=function(_65f){
this.setProperty("tooltip",_65f);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_65f));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_660){
this.imageProfile=new _660(this);
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
ButtonBinding.prototype.flip=function(_665){
_665=_665==null?true:_665;
this.isFlipped=_665;
this.setProperty("flip",_665);
if(this.isAttached){
this.labelBinding.flip(_665);
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
ButtonBinding.prototype.check=function(_666){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_666==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_667){
this.isActive=true;
this.isChecked=true;
if(!_667){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_668){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_668==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_669){
this.isActive=false;
this.isChecked=false;
if(!_669){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_66a,_66b){
if(_66a==null){
_66a==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_66a){
case true:
this.check(_66b);
break;
case false:
this.uncheck(_66b);
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
var _66d=this.getProperty("tooltip");
if(_66d){
this.setToolTip(_66d);
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
var _66e=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_66e=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _66e;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _670=this.getEqualSizeWidth();
if(goal>_670){
var diff=goal-_670;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _673=null;
if(this.isAttached==true){
var _674=CSSComputer.getPadding(this.bindingElement);
var _675=CSSComputer.getPadding(this.bindingElement);
_673=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_673=_673+_674.left+_674.right;
_673=_673+_675.left+_675.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _673;
};
ButtonBinding.prototype.setWidth=function(_676){
if(this.isAttached==true){
var _677=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _678=CSSComputer.getPadding(this.shadowTree.c);
var _679=_676-_677;
_679=_679-_678.left-_678.right;
this.shadowTree.c.style.width=String(_679)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_679-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_676);
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
ButtonBinding.prototype.setValue=function(_67a){
this.shadowTree.dotnetinput.value=_67a;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_67b){
this.setValue(_67b);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_67c){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_67c;
this.imageProfile=_67c.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_67d){
var _67e=_67d?"addEventListener":"removeEventListener";
this.binding[_67e](DOMEvents.MOUSEENTER,this);
this.binding[_67e](DOMEvents.MOUSELEAVE,this);
this.binding[_67e](DOMEvents.MOUSEDOWN,this);
this.binding[_67e](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _680=false,_681=false,_682=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_682=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_682=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_682=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_682=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_682==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_680=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_682=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_682=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_682=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_682=ButtonStateManager.STATE_NORMAL;
var _683=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_683 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_682=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_682==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_681=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_682=ButtonStateManager.STATE_NORMAL;
_680=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_682=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_682=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_682=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_682=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_682==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_680=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_682=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_682=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_682=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_682=ButtonStateManager.STATE_NORMAL;
_680=true;
break;
}
}
}
}
}
switch(_682){
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
if(_680){
this.binding.fireCommand();
}
if(_681){
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
var _687=this.imageProfile.getDisabledImage();
if(_687){
this.binding.setImage(_687);
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
ClickButtonBinding.newInstance=function(_688){
var _689=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_688);
return UserInterface.registerBinding(_689,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_68a){
var _68b=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_68a);
return UserInterface.registerBinding(_68b,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_68c){
var _68d=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_68c);
return UserInterface.registerBinding(_68d,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_68e){
this._binding=_68e;
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
var _68f=this.getDescendantBindingsByLocalName("control");
_68f.each(function(_690){
_690.setControlType(_690.controlType);
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
ControlGroupBinding.newInstance=function(_692){
var _693=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_692);
return UserInterface.registerBinding(_693,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_696){
ControlBinding.superclass.handleAction.call(this,_696);
switch(_696.type){
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
function ControlImageProfile(_697){
this.binding=_697;
}
ControlImageProfile.prototype._getImage=function(_698){
var _699=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_699=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_699=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_699=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_699=this.constructor.IMAGE_CLOSE;
break;
}
return _699.replace("${string}",_698);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _69a=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_69a=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _69a?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_69b){
ControlBoxBinding.superclass.handleAction.call(this,_69b);
switch(_69b.type){
case ControlBinding.ACTION_COMMAND:
var _69c=_69b.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_69c);
Application.unlock(self);
},0);
_69b.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_69e){
switch(_69e.controlType){
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
ControlBoxBinding.prototype.setState=function(_69f){
var _6a0=this.getState();
this.setProperty("state",_69f);
this.detachClassName(_6a0);
this.attachClassName(_69f);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6a1=this.getProperty("state");
if(!_6a1){
_6a1=ControlBoxBinding.STATE_NORMAL;
}
return _6a1;
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
MenuContainerBinding.prototype.isOpen=function(_6a2){
var _6a3=null;
if(!_6a2){
_6a3=this._isOpen;
}else{
_6a3=(_6a2==this._openElement);
}
return _6a3;
};
MenuContainerBinding.prototype.setOpenElement=function(_6a4){
if(_6a4){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6a4;
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
var _6a5=this.getChildBindingByLocalName("menupopup");
if(_6a5&&_6a5!=this.menuPopupBinding){
this.menuPopupBinding=_6a5;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6a6=this.getMenuContainerBinding();
_6a6.setOpenElement(this);
var _6a7=this.getMenuPopupBinding();
_6a7.snapTo(this.bindingElement);
_6a7.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6a8){
MenuContainerBinding.superclass.handleAction.call(this,_6a8);
if(_6a8.type==PopupBinding.ACTION_HIDE){
var _6a9=this.getMenuContainerBinding();
_6a9.setOpenElement(false);
this.reset();
_6a8.consume();
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
MenuBarBinding.prototype.handleAction=function(_6aa){
MenuBarBinding.superclass.handleAction.call(this,_6aa);
switch(_6aa.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6ab=_6aa.target;
var _6ac=this.getChildBindingsByLocalName("menu");
while(_6ac.hasNext()){
var menu=_6ac.getNext();
}
switch(_6ab.arrowKey){
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
var _6ae=this.getProperty("image");
var _6af=this.getProperty("label");
var _6b0=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6af){
this.setLabel(_6af);
}
if(_6ae){
this.setImage(_6ae);
}
if(_6b0){
this.setToolTip(_6b0);
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
MenuBinding.prototype.setLabel=function(_6b2){
this.setProperty("label",_6b2);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6b2));
}
};
MenuBinding.prototype.setToolTip=function(_6b3){
this.setProperty("tooltip",_6b3);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6b3));
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
var _6b5=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6b5.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6b5.isOpen()&&!_6b5.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6b5.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6b5.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6b6,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6b6){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6bb){
switch(_6bb.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6bc=null;
var _6bd=true;
self._lastFocused.focus();
self.grabKeyboard();
_6bb.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6bf){
for(var key in this._focused){
if(key!=_6bf.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6bf.key]=_6bf;
this._lastFocused=_6bf;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6c2){
delete this._focused[_6c2.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6c3){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6c3);
}
if(_6c3){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6c6=this.getChildBindingsByLocalName("menugroup");
var _6c7=null;
var _6c8=null;
while(_6c6.hasNext()){
var _6c9=_6c6.getNext();
if(!_6c9.isDefaultContent){
_6c9.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6c7&&_6c9.isVisible){
_6c7=_6c9;
}
if(_6c9.isVisible){
_6c8=_6c9;
}
}
}
if(_6c7&&_6c8){
_6c7.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6c8.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6ca){
MenuBodyBinding.activeInstance=this;
if(_6ca){
var _6cb=this._getMenuItems().getFirst();
if(_6cb){
_6cb.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6cc=this._lastFocused;
if((_6cc!=null)&&(!_6cc.isMenuContainer)){
_6cc.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6ce=this._getMenuItems();
var _6cf=null;
var next=null;
if(this._lastFocused){
_6cf=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6ce.getPreceding(_6cf);
break;
case KeyEventCodes.VK_DOWN:
next=_6ce.getFollowing(_6cf);
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
next=_6ce.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6d2=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6d3){
_6d2=_6d3.getChildBindingsByLocalName("menuitem");
_6d2.each(function(item){
list.add(item);
});
});
_6d2=this.getChildBindingsByLocalName("menuitem");
_6d2.each(function(item){
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
MenuBodyBinding.newInstance=function(_6d7){
var _6d8=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6d7);
return UserInterface.registerBinding(_6d8,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6d9){
switch(_6d9){
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
MenuGroupBinding.newInstance=function(_6da){
var _6db=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6da);
return UserInterface.registerBinding(_6db,MenuGroupBinding);
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
var _6dc=this.getProperty("image");
var _6dd=this.getProperty("image-hover");
var _6de=this.getProperty("image-active");
var _6df=this.getProperty("image-disabled");
if(!this.image&&_6dc){
this.image=_6dc;
}
if(!this.imageHover&&_6dd){
this.imageHover=_6dc;
}
if(!this.imageActive&&_6de){
this.imageActive=_6de;
}
if(!this.imageDisabled&&_6df){
this.imageDisabled=_6df;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6e0=this.getProperty("label");
var _6e1=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6e3=this.getProperty("isdisabled");
var _6e4=this.getProperty("image");
var _6e5=this.getProperty("image-hover");
var _6e6=this.getProperty("image-active");
var _6e7=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6e8=this.getMenuPopupBinding();
if(_6e8){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6e4){
this.image=_6e4;
}
if(!this.imageHover&&_6e5){
this.imageHover=_6e4;
}
if(!this.imageActive&&_6e6){
this.imageActive=_6e6;
}
if(!this.imageDisabled&&_6e7){
this.imageDisabled=_6e7;
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
if(_6e0!=null){
this.setLabel(_6e0);
}
if(_6e1){
this.setToolTip(_6e1);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6e3==true){
this.disable();
}
var _6e9=this.getProperty("oncommand");
if(_6e9){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6e9);
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
MenuItemBinding.prototype.setLabel=function(_6ec){
this.setProperty("label",_6ec);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6ec));
}
};
MenuItemBinding.prototype.setToolTip=function(_6ed){
this.setProperty("tooltip",_6ed);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6ed));
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
var _6ef=this.bindingDocument.createElement("div");
_6ef.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6ef.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6f0=this.labelBinding.bindingElement;
_6f0.insertBefore(_6ef,_6f0.firstChild);
_6ef.style.display="none";
this.shadowTree.checkBoxIndicator=_6ef;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6ef=this.bindingDocument.createElement("div");
_6ef.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6ef.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6f0=this.labelBinding.bindingElement;
_6f0.insertBefore(_6ef,_6f0.firstChild);
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
var _6f2=this.imageProfile.getDisabledImage();
if(_6f2){
this.setImage(_6f2);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6f2=this.imageProfile.getDefaultImage();
if(_6f2){
this.setImage(_6f2);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6f4=this.getMenuContainerBinding();
if(_6f4.isOpen()&&!_6f4.isOpen(this)){
_6f4._openElement.hide();
_6f4.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6f4=this.getMenuContainerBinding();
if(!_6f4.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6f6){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6f7=this.getMenuContainerBinding();
if(!_6f7||!_6f7.isOpen(this)||_6f6){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6f8){
this.setChecked(true,_6f8);
};
MenuItemBinding.prototype.uncheck=function(_6f9){
this.setChecked(false,_6f9);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6fa,_6fb){
this.setProperty("ischecked",_6fa);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6fa){
this.isChecked=_6fa;
this.shadowTree.checkBoxIndicator.style.display=_6fa?"block":"none";
if(!_6fb){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6fc){
var _6fd=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6fc);
UserInterface.registerBinding(_6fd,MenuItemBinding);
return UserInterface.getBinding(_6fd);
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
PopupBinding.handleBroadcast=function(_6fe,arg){
switch(_6fe){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _702=PopupBinding.activeInstances.get(key);
var _703=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_702);
if(!_703){
list.add(_702);
}
});
list.each(function(_704){
_704.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _706=PopupBinding.activeInstances.get(key);
_706.hide();
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
var _707=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _708=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_707){
this._bodyBinding=UserInterface.getBinding(_707);
}else{
if(_708){
this._bodyBinding=UserInterface.getBinding(_708);
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
var _709=this.getProperty("position");
this.position=_709?_709:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_70a){
var _70b=null;
if(this._bodyBinding){
this._bodyBinding.add(_70a);
_70b=_70a;
}else{
_70b=PopupBinding.superclass.add.call(this,_70a);
}
return _70b;
};
PopupBinding.prototype.addFirst=function(_70c){
var _70d=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_70c);
_70d=_70c;
}else{
_70d=PopupBinding.superclass.addFirst.call(this,_70c);
}
return _70d;
};
PopupBinding.prototype.handleAction=function(_70e){
PopupBinding.superclass.handleAction.call(this,_70e);
var _70f=_70e.target;
switch(_70e.type){
case Binding.ACTION_ATTACHED:
if(_70f instanceof MenuItemBinding){
this._count(true);
_70e.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_70f instanceof MenuItemBinding){
this._count(false);
_70e.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_710){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_710?1:-1);
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
PopupBinding.prototype.snapTo=function(_711){
var _712=this._getElementPosition(_711);
switch(this.position){
case PopupBinding.POSITION_TOP:
_712.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_712.x+=_711.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_712.y+=_711.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_712.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_711;
this.bindingElement.style.display="block";
this.setPosition(_712.x,_712.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_714){
this.bindingElement.style.display="block";
this.setPosition(_714.x,_714.y);
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
PopupBinding.prototype._getElementPosition=function(_719){
return _719.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_719):DOMUtil.getUniversalPosition(_719);
};
PopupBinding.prototype._getMousePosition=function(e){
var _71b=DOMEvents.getTarget(e);
return _71b.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_71c){
var _71d=this.bindingElement;
if(_71c){
if(Client.hasTransitions){
_71d.style.visibility="visible";
_71d.style.opacity="1";
}else{
_71d.style.visibility="visible";
}
}else{
_71d.style.visibility="hidden";
_71d.style.display="none";
if(Client.hasTransitions){
_71d.style.opacity="0";
}
}
this.isVisible=_71c;
};
PopupBinding.prototype._enableTab=function(_71e){
var self=this;
var _720=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_720.each(function(_721){
_721.bindingElement.tabIndex=_71e?0:-1;
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
var _729=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_729.y<0){
y=-_729.y;
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
PopupBinding.prototype.grabKeyboard=function(_72b){
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
var _731=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_731=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _731;
};
PopupBinding.prototype.clear=function(){
var _732=this._bodyBinding;
if(_732){
_732.detachRecursive();
_732.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_733){
var _734=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_733);
return UserInterface.registerBinding(_734,PopupBinding);
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
PopupBodyBinding.newInstance=function(_736){
var _737=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_736);
return UserInterface.registerBinding(_737,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_738){
return new Point(_738.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_739){
var _73a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_739);
return UserInterface.registerBinding(_73a,MenuPopupBinding);
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
var _73b=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_73b){
this._body=UserInterface.getBinding(_73b);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _73c=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_73c.hasNext()){
var _73d=DialogBorderBinding.newInstance(this.bindingDocument);
_73d.setType(_73c.getNext());
this.add(_73d);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _73e=this.getProperty("controls");
if(_73e){
var _73f=new List(_73e.split(" "));
while(_73f.hasNext()){
var type=_73f.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _741=DialogControlBinding.newInstance(this.bindingDocument);
_741.setControlType(type);
this._titlebar.addControl(_741);
this.controlBindings[type]=_741;
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
var _742=this.getProperty("image");
var _743=this.getProperty("label");
var _744=this.getProperty("draggable");
var _745=this.getProperty("resizable");
var _746=this.getProperty("modal");
if(_742){
this.setImage(_742);
}
if(_743){
this.setLabel(_743);
}
if(_744==false){
this.isDialogDraggable=false;
}
if(_745==false){
this.isPanelResizable=false;
}
if(_746==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_747){
this.isModal=_747;
};
DialogBinding.prototype.setLabel=function(_748){
this.setProperty("label",_748);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_748));
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
DialogBinding.prototype.handleAction=function(_74a){
DialogBinding.superclass.handleAction.call(this,_74a);
switch(_74a.type){
case Binding.ACTION_DRAG:
var _74b=_74a.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_74b.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_74b.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_74b;
_74b.dragger.registerHandler(this);
}
break;
}
}
_74a.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_74a.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_74c,arg){
DialogBinding.superclass.handleBroadcast.call(this,_74c,arg);
switch(_74c){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_74e){
DialogBinding.superclass.handleInvokedControl.call(this,_74e);
switch(_74e.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_74f){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_74f){
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
var _751=self.bindingElement;
setTimeout(function(){
_751.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_752){
this.bindingElement.style.zIndex=new String(_752);
};
DialogBinding.prototype.onDragStart=function(_753){
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
DialogBinding.prototype.setResizable=function(_765){
if(this._isResizable!=_765){
if(_765){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_765;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _766=null;
var _767=this.bindingDocument.body.offsetWidth;
var _768=this.bindingDocument.body.offsetHeight;
_766={x:0.125*_767,y:0.125*_768,w:0.75*_767,h:0.5*_768};
return _766;
};
DialogBinding.prototype.centerOnScreen=function(){
var _769=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_769.w-dim.w),0.5*(_769.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _76b=this;
var i=0;
function blink(){
if(i%2==0){
_76b.detachClassName("active");
}else{
_76b.attachClassName("active");
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
var _76f="";
while(list.hasNext()){
var type=list.getNext();
_76f+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_76f);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_770){
var _771=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_770);
return UserInterface.registerBinding(_771,DialogBinding);
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
DialogHeadBinding.newInstance=function(_772){
var _773=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_772);
return UserInterface.registerBinding(_773,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_776){
var _777=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_776);
return UserInterface.registerBinding(_777,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_778){
var _779=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_778);
return UserInterface.registerBinding(_779,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_77a){
DialogSetBinding.superclass.handleAction.call(this,_77a);
var _77b=_77a.target;
switch(_77a.type){
case Binding.ACTION_MOVETOTOP:
if(_77b instanceof DialogBinding){
this._moveToTop(_77b);
}
break;
case Binding.ACTION_MOVEDONTOP:
_77a.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_77c){
var _77d=0;
var _77e=this.getChildBindingsByLocalName("dialog");
_77e.each(function(_77f){
var _780=_77f.getZIndex();
_77d=_780>_77d?_780:_77d;
});
_77c.setZIndex(_77d+2);
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
DialogBorderBinding.newInstance=function(_782){
var _783=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_782);
return UserInterface.registerBinding(_783,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_784){
this._dialogBinding=_784;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_786){
DialogCoverBinding.superclass.handleAction.call(this,_786);
var _787=_786.target;
if(this._dialogBinding.isModal){
switch(_786.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_787==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_787.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_788,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_788,arg);
switch(_788){
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
var _78b=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_78b);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _78c=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_78c);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_78d){
var _78e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_78d);
return UserInterface.registerBinding(_78e,DialogCoverBinding);
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
var _78f=this.getProperty("image");
if(_78f){
this.setImage(_78f);
}
var _790=this.getProperty("label");
if(_790){
this.setLabel(_790);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_791){
if(this.isAttached){
this.labelBinding.setLabel(_791);
}
this.setProperty("label",_791);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_793){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_793);
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
DialogTitleBarBinding.newInstance=function(_794){
var _795=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_794);
return UserInterface.registerBinding(_795,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_796){
var _797=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_796);
return UserInterface.registerBinding(_797,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_798){
var _799=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_798);
return UserInterface.registerBinding(_799,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_79a){
this.binding=_79a;
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
var _79d=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _79e=node.nodeName.toLowerCase();
switch(_79e){
case "script":
case "style":
case "textarea":
_79d=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _79d;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a5=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a5=false;
}
return _7a5;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7a6,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7a6,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7aa=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7aa+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b0){
var _7b1="";
var _7b2="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b3="</span>";
var self=this;
function iterate(_7b5){
var _7b6=-1;
var _7b7=null;
self._map.each(function(key,exp){
var low=_7b5.toLowerCase();
var _7bb=low.search(exp);
if(_7bb>-1){
if(_7b6==-1){
_7b6=_7bb;
}
if(_7bb<=_7b6){
_7b6=_7bb;
_7b7=key;
}
}
});
if(_7b6>-1&&_7b7!=null){
var pre=_7b5.substring(0,_7b6);
var hit=_7b5.substring(_7b6,_7b6+_7b7.length);
var pst=_7b5.substring(_7b6+_7b7.length,_7b5.length);
_7b1+=pre+_7b2+hit+_7b3;
iterate(pst);
}else{
_7b1+=_7b5;
}
}
iterate(_7b0);
return _7b1;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7bf){
var _7c0=new List(_7bf.getElementsByTagName("span"));
_7c0.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7bf.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c3){
var _7c4=null;
if(_7c3.isAttached){
var doc=_7c3.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c4=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c4 instanceof SOAPFault){
_7c4=null;
}
}
}
return _7c4;
};
WindowBinding.highlightKeywords=function(_7c8,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7c8.isAttached){
var doc=_7c8.getContentDocument();
if(doc!=null){
var _7cb=WindowBinding._highlightcrawler;
_7cb.reset(doc.body);
if(list!=null){
_7cb.setKeys(list);
_7cb.crawl(doc.body);
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
var _7cc=WindowBinding.superclass.serialize.call(this);
if(_7cc){
_7cc.url=this.getURL();
}
return _7cc;
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
var _7ce=this.getContentWindow().DocumentManager;
if(_7ce!=null){
_7ce.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7cf){
WindowBinding.superclass.handleAction.call(this,_7cf);
var _7d0=_7cf.target;
switch(_7cf.type){
case RootBinding.ACTION_PHASE_3:
if(_7d0.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d0);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7cf.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7d1){
if(!this.isFit||_7d1){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7d2){
if(this._pageBinding==null){
if(_7d2.bindingWindow==this.getContentWindow()){
this._pageBinding=_7d2;
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
WindowBinding.prototype._registerOnloadListener=function(_7d3){
var _7d4=this.shadowTree.iframe;
var _7d5=_7d3?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7d8=true;
if(Client.isExplorer){
_7d8=_7d4.readyState=="complete";
}
if(_7d8==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d5](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7d9){
var _7da=_7d9?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7da](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7de=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7de=url;
}
return _7de;
};
WindowBinding.prototype.reload=function(_7e0){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7e1=null;
if(this.shadowTree.iframe!=null){
_7e1=this.shadowTree.iframe;
}
return _7e1;
};
WindowBinding.prototype.getContentWindow=function(){
var _7e2=null,_7e3=this.getFrameElement();
if(_7e3!==null){
try{
_7e2=_7e3.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7e2;
};
WindowBinding.prototype.getContentDocument=function(){
var _7e4=null,win=this.getContentWindow();
if(win){
_7e4=win.document;
}
return _7e4;
};
WindowBinding.prototype.getRootBinding=function(){
var _7e6=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7e6=UserInterface.getBinding(doc.body);
}
return _7e6;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7e8){
this.bindingElement.style.height=_7e8+"px";
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
WindowBinding.prototype.handleCrawler=function(_7e9){
WindowBinding.superclass.handleCrawler.call(this,_7e9);
if(_7e9.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7e9.nextNode=root.bindingElement;
}else{
_7e9.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7ee){
var _7ef=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7ee);
var _7f0=UserInterface.registerBinding(_7ef,WindowBinding);
return _7f0;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f4){
_7f4.target.show();
_7f4.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f6){
_7f6.target.show();
_7f6.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7f8){
PreviewWindowBinding.superclass.handleAction.call(this,_7f8);
switch(_7f8.type){
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
var _7f9=null;
this._getRadioButtonBindings().each(function(_7fa){
if(_7fa.getProperty("ischecked")){
_7f9=_7fa;
return false;
}else{
return true;
}
});
if(_7f9){
this._checkedRadioBinding=_7f9;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7fb){
RadioGroupBinding.superclass.handleAction.call(this,_7fb);
var _7fc=_7fb.target;
switch(_7fb.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7fb.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7fc.isRadioButton&&!_7fc.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7fc);
}
this._checkedRadioBinding=_7fc;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7fb.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7fd,_7fe){
if(_7fd instanceof RadioDataBinding){
_7fd=_7fd.getButton();
}
if(_7fd.isRadioButton){
switch(_7fe){
case true:
this._unCheckRadioBindingsExcept(_7fd);
this._checkedRadioBinding=_7fd;
_7fd.check(true);
break;
default:
_7fd.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7ff){
var _800=this._getRadioButtonBindings();
_800.each(function(_801){
if(_801.isChecked&&_801!=_7ff){
_801.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _802=new Crawler();
var list=new List();
_802.addFilter(function(_804){
var _805=true;
var _806=UserInterface.getBinding(_804);
if(_806 instanceof RadioGroupBinding){
_805=NodeCrawler.SKIP_CHILDREN;
}else{
if(_806 instanceof ButtonBinding&&_806.isRadioButton){
list.add(_806);
}
}
return _805;
});
_802.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_807){
var _808=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_807);
return UserInterface.registerBinding(_808,RadioGroupBinding);
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
var _80a=this.getProperty("regexrule");
if(_80a!=null){
this.expression=new RegExp(_80a);
}
var _80b=this.getProperty("onbindingblur");
if(_80b!=null){
this.onblur=function(){
Binding.evaluate(_80b,this);
};
}
var _80c=this.getProperty("onvaluechange");
if(_80c!=null){
this.onValueChange=function(){
Binding.evaluate(_80c,this);
};
}
if(this.error==null&&this.type!=null){
var _80d=DataBinding.errors[this.type];
if(_80d!=null){
this.error=_80d;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _80e=this.getProperty("value");
if(_80e!=null){
this.setValue(String(_80e));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _810=this.getProperty("isdisabled");
if(_810==true){
this.setDisabled(true);
}
var _811=this.getProperty("readonly");
if(_811==true){
this.setReadOnly(true);
}
var _812=this.getProperty("autoselect");
if(_812==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _813=Localization.currentLang();
if(_813!=null){
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
var _814=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_814.type=this.isPassword==true?"password":"text";
_814.tabIndex=-1;
return _814;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_817){
if(_817){
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
DataInputBinding.prototype.handleBroadcast=function(_81a,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_81a,arg);
var self=this;
switch(_81a){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _81d=DOMEvents.getTarget(arg);
if(_81d!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_81e){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_81e){
var self=this,_820=this.bindingElement,_821={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_820,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_820,DOMEvents.MOUSEUP,_821);
}else{
this.select();
}
}
this.onfocus();
if(!_81e){
var _822=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_822);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _823=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _824=_823.createTextRange();
_824.moveStart("character",0);
_824.moveEnd("character",_823.value.length);
_824.select();
}else{
_823.setSelectionRange(0,_823.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_825){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_825){
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
DataInputBinding.prototype.validate=function(_829){
if(_829==true||this._isValid){
var _82a=this.isValid();
if(_82a!=this._isValid){
this._isValid=_82a;
if(!_82a){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _82b=null;
if(this._isInvalidBecauseRequired==true){
_82b=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_82b=DataBinding.warnings["minlength"];
_82b=_82b.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_82b=DataBinding.warnings["maxlength"];
_82b=_82b.replace("${count}",String(this.maxlength));
}else{
_82b=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_82b!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_82b);
}
}else{
this.setValue(_82b);
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
var _82c=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _82d=this.getValue();
if(_82d==""){
if(this.isRequired==true){
_82c=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _82e=DataBinding.expressions[this.type];
if(!_82e.test(_82d)){
_82c=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_82d)){
_82c=false;
}
}
}
}
if(_82c&&this.minlength!=null){
if(_82d.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_82c=false;
}
}
if(_82c&&this.maxlength!=null){
if(_82d.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_82c=false;
}
}
return _82c;
};
DataInputBinding.prototype.setDisabled=function(_82f){
if(_82f!=this.isDisabled){
if(_82f){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _830=this.shadowTree.input;
if(_82f){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_830,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_830,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_82f;
this.shadowTree.input.unselectable=_82f?"on":"off";
}
this.isDisabled=_82f;
this.isFocusable=!_82f;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_832){
if(_832!=this.isReadOnly){
if(_832){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_832;
this.isReadOnly=_832;
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
DataInputBinding.prototype.handleElement=function(_833){
return true;
};
DataInputBinding.prototype.updateElement=function(_834){
var _835=_834.getAttribute("value");
var _836=_834.getAttribute("type");
var _837=_834.getAttribute("maxlength");
var _838=_834.getAttribute("minlength");
if(_835==null){
_835="";
}
var _839=this.bindingWindow.UpdateManager;
if(this.getValue()!=_835){
_839.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_835);
}
if(this.type!=_836){
_839.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_836;
}
if(this.maxlength!=_837){
_839.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_837;
}
if(this.minlength!=_838){
_839.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_838;
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
DataInputBinding.prototype.setValue=function(_83a){
if(_83a===null){
_83a="";
}
if(_83a!=this.getValue()){
this.setProperty("value",_83a);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_83a);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _83b=null;
if(this.shadowTree.input!=null){
_83b=this.shadowTree.input.value;
}else{
_83b=this.getProperty("value");
}
return _83b;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _83d=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_83d=Number(_83d);
break;
}
return _83d;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_83e){
var _83f=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_83e);
return UserInterface.registerBinding(_83f,DataInputBinding);
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
var _840=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_840!=null){
this.setValue(_840.value);
_840.parentNode.removeChild(_840);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _841=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_841.tabIndex=-1;
return _841;
};
TextBoxBinding.prototype.handleElement=function(_842){
return true;
};
TextBoxBinding.prototype.updateElement=function(_843){
var _844,area=_843.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_844=DOMUtil.getTextContent(area);
}
if(_844==null){
_844="";
}
var _846=this.bindingWindow.UpdateManager;
if(this.getValue()!=_844){
_846.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_844);
}
var _847=_843.getAttribute("type");
if(this.type!=_847){
_846.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_847;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_84b){
var _84c=this.bindingDocument.selection.createRange();
var _84d=_84c.text=="";
if(_84d&&!_84b){
_84c.text="\t";
}else{
var text="";
var _84f=_84c.text.length;
while((_84c.moveStart("word",-1)&&_84c.text.charAt(1)!="\n")){
}
_84c.moveStart("character",1);
var _850=0;
var i=0,line,_853=_84c.text.split("\n");
while((line=_853[i++])!=null){
if(_84b){
line=line.replace(/^(\s)/mg,"");
_850++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_853[i+1]?"\n":"");
}
_84c.text=text;
_84c.moveStart("character",-_84f);
if(_84b){
_84c.moveStart("character",2*_853.length-2);
}
_84c.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _854=this.bindingDocument.selection.createRange();
var _855=_854.duplicate();
while((_855.moveStart("word",-1)&&_855.text.indexOf("\n")==-1)){
}
_855.moveStart("character",1);
_854.text="\n"+_855.text.match(/^(\s)*/)[0]+"!";
_854.moveStart("character",-1);
_854.select();
_854.text="";
_854.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_856){
var _857;
var _858;
var oss;
var osy;
var i;
var fnd;
var _85d=this._getSelectedText();
var el=this.shadowTree.input;
_857=el.scrollLeft;
_858=el.scrollTop;
if(!_85d.match(/\n/)){
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
_85d=this._getSelectedText();
if(_856){
ntext=_85d.replace(/^(\s)/mg,"");
}else{
ntext=_85d.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_85d.length);
}
el.scrollLeft=_857;
el.scrollTop=_858;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _85f;
var _860;
var oss;
var osy;
var el=this.shadowTree.input;
_85f=el.scrollLeft;
_860=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_85f;
el.scrollTop=_860;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _867=this.shadowTree.input.value;
var _868=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _867.substr(_868,end-_868);
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
this.isSearchSelectionEnabled=false;
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
var _86a=this.getProperty("isdisabled");
if(this.isDisabled||_86a){
this.disable();
}
this.isSearchSelectionEnabled=true;
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
var _86c=this.getProperty("label");
var _86d=this.getProperty("value");
var _86e=this.getProperty("width");
var _86f=this.getProperty("onchange");
var _870=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_86c!=null){
this.label=_86c;
}
if(!this.value&&_86d!=null){
this.value=_86d;
}
if(!this.width&&_86e){
this.width=_86e;
}
if(_870){
this.isRequired=true;
}
if(_86f){
this.onValueChange=function(){
Binding.evaluate(_86f,this);
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
var _871=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_871.name=this.getName();
_871.value=this.getValue();
_871.type="hidden";
if(this.hasCallBackID()){
_871.id=this.getCallBackID();
}
this.shadowTree.input=_871;
this.bindingElement.appendChild(_871);
};
SelectorBinding.prototype.buildButton=function(){
var _872=this.BUTTON_IMPLEMENTATION;
var _873=this.add(_872.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_873.imageProfile=this.imageProfile;
}
if(this.width!=null){
_873.setWidth(this.width);
}
this._buttonBinding=_873;
this.shadowTree.button=_873;
_873.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _875=top.app.bindingMap.selectorpopupset;
var doc=_875.bindingDocument;
var _877=_875.add(PopupBinding.newInstance(doc));
var _878=_877.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_877;
this._menuBodyBinding=_878;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_877.attachClassName("selectorpopup");
_877.addActionListener(PopupBinding.ACTION_SHOW,this);
_877.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_877.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_877);
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
var _87b=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_87b).each(function(_87c){
var _87d=_87c.getAttribute("label");
var _87e=_87c.getAttribute("value");
var _87f=_87c.getAttribute("selected");
var _880=_87c.getAttribute("image");
var _881=_87c.getAttribute("image-hover");
var _882=_87c.getAttribute("image-active");
var _883=_87c.getAttribute("image-disabled");
var _884=null;
if(_880||_881||_882||_883){
_884=new ImageProfile({image:_880,imageHover:_881,imageActive:_882,imageDisabled:_883});
}
list.add(new SelectorBindingSelection(_87d?_87d:null,_87e?_87e:null,_87f&&_87f=="true",_884));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _886=null;
while(list.hasNext()){
var _887=list.getNext();
var item=this.addSelection(_887);
if(_887.isSelected){
this.select(item,true);
}
if(!_886){
_886=item;
}
}
if(!this._selectedItemBinding){
this.select(_886,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_889,_88a){
var _88b=this.MENUITEM_IMPLEMENTATION;
var _88c=this._menuBodyBinding;
var _88d=_88c.bindingDocument;
var _88e=_88b.newInstance(_88d);
_88e.imageProfile=_889.imageProfile;
_88e.setLabel(_889.label);
if(_889.tooltip!=null){
_88e.setToolTip(_889.tooltip);
}
_88e.selectionValue=_889.value;
_889.menuItemBinding=_88e;
if(_88a){
_88c.addFirst(_88e);
this.selections.addFirst(_889);
}else{
_88c.add(_88e);
this.selections.add(_889);
}
this._isUpToDate=false;
return _88e;
};
SelectorBinding.prototype.addSelectionFirst=function(_88f){
return this.addSelection(_88f,true);
};
SelectorBinding.prototype.clear=function(_890){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_890&&this.defaultSelection!=null){
var _891=this.addSelection(this.defaultSelection);
this.select(_891,true);
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
SelectorBinding.prototype.setDisabled=function(_892){
if(this.isAttached==true){
var _893=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_892?"none":"block";
_893.setDisabled(_892);
}
if(_892){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_894){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_894);
}
};
SelectorBinding.prototype.handleAction=function(_895){
SelectorBinding.superclass.handleAction.call(this,_895);
switch(_895.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_895.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_895.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_895.target);
_895.consume();
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
_895.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_897){
this.select(_897);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _898=this._buttonBinding.bindingElement.offsetWidth+"px";
var _899=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_899.style.minWidth=_898;
}else{
_899.style.width=_898;
}
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _89b=Client.isExplorer?e.keyCode:e.which;
if(_89b==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _89b=Client.isExplorer?e.keyCode:e.which;
if(_89b>=32){
this._buttonBinding.check();
var _89c=String.fromCharCode(_89b);
this._pushSearchSelection(_89c);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_89d){
this._searchString+=_89d.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_89e){
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
var _89f=this._menuBodyBinding;
if(_89f!=null){
var _8a0=this.MENUITEM_IMPLEMENTATION;
var _8a1=_89f.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8a3=list.getNext();
if(_8a3.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8a3);
}
}
}
this._attachSelections();
var _8a4=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8a5=_89f.getDescendantBindingsByType(_8a0);
if(_8a5.hasEntries()){
while(_8a5.hasNext()){
var _8a6=_8a5.getNext();
var _8a7=_8a6.labelBinding;
if(_8a7!=null&&_8a7.shadowTree!=null&&_8a7.shadowTree.labelText!=null){
_8a7.shadowTree.labelText.innerHTML=_8a7.shadowTree.labelText.innerHTML.replace(_8a4,"<b>$&</b>");
}
}
_8a5.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8a7=LabelBinding.newInstance(_8a1);
_8a7.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_89f.add(_8a7);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8a3=list.getNext();
var item=this.addSelection(_8a3);
if(this._selectionValue==_8a3.value){
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
this._popupBinding.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
this._popupBinding.dispatchAction(Binding.ACTION_POSITIONCHANGED);
this._popupBinding.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
}
}
};
SelectorBinding.prototype.handleBroadcast=function(_8a9,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8a9,arg);
switch(_8a9){
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
SelectorBinding.prototype.select=function(_8ac,_8ad){
var _8ae=false;
if(_8ac!=this._selectedItemBinding){
this._selectedItemBinding=_8ac;
_8ae=true;
var _8af=this._buttonBinding;
this._selectionValue=_8ac.selectionValue;
this._selectionLabel=_8ac.getLabel();
_8af.setLabel(_8ac.getLabel());
if(_8ac.imageProfile!=null){
_8af.imageProfile=_8ac.imageProfile;
}
if(_8af.imageProfile!=null){
_8af.setImage(this.isDisabled==true?_8af.imageProfile.getDisabledImage():_8af.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8ad){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8ad)){
this.validate();
}
}
return _8ae;
};
SelectorBinding.prototype._relate=function(){
var _8b0=this.getProperty("relate");
if(_8b0){
var _8b1=this.bindingDocument.getElementById(_8b0);
if(_8b1){
var _8b2=UserInterface.getBinding(_8b1);
if(_8b2){
if(this.isChecked){
_8b2.show();
}else{
_8b2.hide();
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
SelectorBinding.prototype.selectByValue=function(_8b3,_8b4){
var _8b5=false;
var _8b6=this._menuBodyBinding;
var _8b7=_8b6.getDescendantElementsByLocalName("menuitem");
while(_8b7.hasNext()){
var _8b8=UserInterface.getBinding(_8b7.getNext());
if(_8b8.selectionValue==_8b3){
_8b5=this.select(_8b8,_8b4);
break;
}
}
return _8b5;
};
SelectorBinding.prototype.getValue=function(){
var _8b9=this._selectionValue;
if(_8b9!=null){
_8b9=String(_8b9);
}
return _8b9;
};
SelectorBinding.prototype.setValue=function(_8ba){
this.selectByValue(String(_8ba),true);
};
SelectorBinding.prototype.getResult=function(){
var _8bb=this._selectionValue;
if(_8bb=="null"){
_8bb=null;
}
if(_8bb){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8bb=Number(_8bb);
break;
}
}
return _8bb;
};
SelectorBinding.prototype.setResult=function(_8bc){
this.selectByValue(_8bc,true);
};
SelectorBinding.prototype.validate=function(){
var _8bd=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8be=this.getValue();
if(_8be==this.defaultSelection.value){
_8bd=false;
}
if(_8bd!=this._isValid){
if(_8bd){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8bd;
}
return _8bd;
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
var _8bf=this._popupBinding;
if(!this._isUpToDate){
_8bf.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8c0,_8c1){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8c0));
return true;
};
SelectorBinding.newInstance=function(_8c2){
var _8c3=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8c2);
return UserInterface.registerBinding(_8c3,SelectorBinding);
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
var _8c6=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8c6){
this.onValueChange=function(){
Binding.evaluate(_8c6,this);
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
SimpleSelectorBinding.prototype.focus=function(_8c9){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8c9){
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
SimpleSelectorBinding.prototype._hack=function(_8ca){
if(Client.isExplorer){
this._select.style.width=_8ca?"auto":this._cachewidth+"px";
if(_8ca){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8cb=true;
if(this.isRequired){
if(this.getValue()==null){
_8cb=false;
}
}
if(_8cb!=this._isValid){
if(_8cb){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8cc=this._select;
var _8cd=_8cc.options[_8cc.selectedIndex];
var text=DOMUtil.getTextContent(_8cd);
_8cc.blur();
_8cc.style.color="#A40000";
_8cc.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8cd,DataBinding.warnings["required"]);
}
_8cc.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8cd,text);
}
};
}
this._isValid=_8cb;
}
return _8cb;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8cf=null;
var _8d0=this._select;
var _8d1=_8d0.options[_8d0.selectedIndex];
var _8d2=true;
if(Client.isExplorer){
var html=_8d1.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8d2=false;
}
}
if(_8d2){
_8cf=_8d1.getAttribute("value");
}
return _8cf;
};
SimpleSelectorBinding.prototype.setValue=function(_8d4){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8d5){
this.setValue(_8d5);
};
SimpleSelectorBinding.newInstance=function(_8d6){
var _8d7=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8d6);
return UserInterface.registerBinding(_8d7,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8d8,_8d9,_8da,_8db,_8dc){
this._init(_8d8,_8d9,_8da,_8db,_8dc);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8dd,_8de,_8df,_8e0,_8e1){
if(_8dd!=null){
this.label=String(_8dd);
}
if(_8de!=null){
this.value=String(_8de);
}
if(_8e0!=null){
this.imageProfile=_8e0;
}
if(_8e1!=null){
this.tooltip=_8e1;
}
this.isSelected=_8df?true:false;
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
var _8e2=this.getProperty("image");
if(_8e2){
this.setImage(_8e2);
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
var _8e5=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8e5.popupBindingTargetElement=this.shadowTree.input;
_8e5.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8e5.attach();
var self=this;
_8e5.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8e5;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8e8=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8e8).each(function(_8e9){
if(_8e9.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8ea=_8e9.getAttribute("value");
var _8eb=_8e9.getAttribute("selected");
var _8ec=_8e9.getAttribute("tooltip");
list.add({value:_8ea?_8ea:null,toolTip:_8ec?_8ec:null,isSelected:(_8eb&&_8eb=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8ee=this._menuBodyBinding;
var _8ef=_8ee.bindingDocument;
while(_8ee.bindingElement.hasChildNodes()){
var node=_8ee.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8ee.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8f1=this.getProperty("emptyentrylabel");
if(_8f1){
var _8f2=MenuItemBinding.newInstance(_8ef);
_8f2.setLabel(_8f1);
_8f2.selectionValue="";
_8ee.add(_8f2);
}
while(list.hasNext()){
var _8f3=list.getNext();
var _8f2=MenuItemBinding.newInstance(_8ef);
_8f2.setLabel(_8f3.label?_8f3.label:_8f3.value);
_8f2.selectionValue=_8f3.value;
if(_8f3.image){
_8f2.setImage(_8f3.image);
}
if(_8f3.toolTip){
_8f2.setToolTip(_8f3.toolTip);
}
if(_8f3.isSelected){
this.select(_8f2,true);
}
_8ee.add(_8f2);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8f4){
this.select(_8f4);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8f5,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8f5,arg);
switch(_8f5){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8f5,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8f7){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8f7);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8f8){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8f8);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8f9=this.bindingElement.offsetWidth+"px";
var _8fa=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8fa.style.minWidth=_8f9;
}else{
_8fa.style.width=_8f9;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8fb=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8fc=this.getValue();
var _8fd=null;
_8fb.each(function(item){
if(item.getLabel()==_8fc){
_8fd=item;
}
});
if(_8fd){
_8fd.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_900){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_900){
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
DataInputSelectorBinding.prototype.setValue=function(_901){
var _902=this.isReadOnly;
var _903=null;
if(_901!=null&&_901!=""){
var _904=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_904.hasNext()){
var item=_904.getNext();
if(item.selectionValue==_901){
_903=item.getLabel();
break;
}
}
}
if(_903!=null){
this.value=_901;
this.shadowTree.input.value=_903;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_901);
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
var _907="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_907);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_907);
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
var _909=ToolBarButtonBinding.newInstance(this.bindingDocument);
_909.setImage("${icon:popup}");
this.addFirst(_909);
_909.attach();
var self=this;
_909.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _90b=self.getProperty("handle");
var _90c=ViewDefinition.clone(_90b,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_90c instanceof DialogViewDefinition){
_90c.handler={handleDialogResponse:function(_90d,_90e){
self._isButtonClicked=false;
if(_90d==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _90f=_90e.getFirst();
self.setValue(_90f);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_90c.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_90c);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_909.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_909;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _911=this._dialogButtonBinding;
if(_911!=null){
_911.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _913=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_913=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _913;
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
this.shadowTree.labelInput.readonly=true;
var self=this;
DOMEvents.addEventListener(this.shadowTree.labelInput,DOMEvents.DOUBLECLICK,{handleEvent:function(e){
self.clearLabel();
self.focus();
}});
}
if(this.editButtonBinding==null){
var _916=ToolBarButtonBinding.newInstance(this.bindingDocument);
_916.setImage("${icon:editor-sourceview}");
_916.bindingElement.style.left="-24px";
_916.bindingElement.style.width="24px";
this.addFirst(_916);
_916.attach();
_916.hide();
var self=this;
_916.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_916;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_917){
UrlInputDialogBinding.superclass.setValue.call(this,_917);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_917);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _918=TreeService.GetCompositeUrlLabel(_917);
if(_918!=_917){
this.setLabel(_918);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_919){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_919;
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
var _91a=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _91b=this.getProperty("image");
if(_91b!=null){
_91a.setImage(_91b);
}else{
_91a.setImage("${icon:popup}");
}
this.addFirst(_91a);
_91a.attach();
var self=this;
_91a.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_91a;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _91d=this._dialogButtonBinding;
if(_91d!=null){
_91d.oncommand();
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
var _91e=this.getProperty("label");
var _91f=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_91e!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_91e+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_91e);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_91f!=null){
this._buttonBinding.setToolTip(_91f);
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
DataDialogBinding.prototype.handleAction=function(_921){
DataDialogBinding.superclass.handleAction.call(this,_921);
var _922=_921.target;
var self=this;
switch(_921.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_924,_925){
if(_924==Dialog.RESPONSE_ACCEPT){
if(_925 instanceof DataBindingMap){
self._map=_925;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_922==this._buttonBinding){
_921.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_926,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_926,arg);
switch(_926){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _929=this.getProperty("handle");
var url=this.getURL();
var _92b=null;
if(_929!=null||def!=null){
if(def!=null){
_92b=def;
}else{
_92b=ViewDefinitions[_929];
}
if(_92b instanceof DialogViewDefinition){
_92b.handler=this._handler;
if(this._map!=null){
_92b.argument=this._map;
}
StageBinding.presentViewDefinition(_92b);
}
}else{
if(url!=null){
_92b=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_92b!=null){
this._dialogViewHandle=_92b.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_92c){
this.setProperty("label",_92c);
if(this.isAttached){
this._buttonBinding.setLabel(_92c+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_92d){
this.setProperty("image",_92d);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_92d);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_92e){
this.setProperty("tooltip",_92e);
if(this.isAttached){
this._buttonBinding.setToolTip(_92e);
}
};
DataDialogBinding.prototype.setHandle=function(_92f){
this.setProperty("handle",_92f);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_931){
this._handler=_931;
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
DataDialogBinding.newInstance=function(_933){
var _934=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_933);
return UserInterface.registerBinding(_934,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_936,_937){
if(_936==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_937);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_938){
_938=new String(_938);
this.dirty();
this.setValue(encodeURIComponent(_938));
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
var _93c=this.getValue();
if(_93c==null){
_93c="";
}
this.shadowTree.dotnetinput.value=_93c;
};
PostBackDataDialogBinding.prototype.setValue=function(_93d){
this.setProperty("value",_93d);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_93e){
};
PostBackDataDialogBinding.newInstance=function(_93f){
var _940=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_93f);
return UserInterface.registerBinding(_940,PostBackDataDialogBinding);
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
var _941=this.getProperty("dialoglabel");
var _942=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _944=this.getProperty("handle");
var _945=this.getProperty("selectedtoken");
if(_944!=null){
var def=ViewDefinition.clone(_944,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_941!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_941;
}
if(_942!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_942;
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
if(_945!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_945;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_947){
var _948=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_947);
return UserInterface.registerBinding(_948,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_94a){
self._datathing.setValue(_94a);
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
var _94d=self.getValue();
if(_94d==""||_94d==null){
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
var _94e=this.getProperty("value");
var _94f=this.getProperty("selectorlabel");
if(_94f==null){
_94f=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_94e==null));
list.add(new SelectorBindingSelection(_94f+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_94e!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _94e=this.getValue();
if(_94e==""||_94e==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_951){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_951);
switch(_951.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_951.target==this._datathing){
var _952=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_952){
self._selector.setLabel(_952);
}
},500);
_951.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_954){
this.setProperty("label",_954);
if(this._selector!=null){
this._selector.setLabel(_954);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_955){
this._datathing.setValue(_955);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_956,_957){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_956,_957)){
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
this.master.setValue("");
}
_95c.dirty();
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
ShadowBinding.prototype.shadow=function(_c94){
this.targetBinding=_c94;
_c94.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c94.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c94.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c94.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c94.isVisible){
this.show();
this.setPosition(_c94.getPosition());
this.setDimension(_c94.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c95){
ShadowBinding.superclass.handleAction.call(this,_c95);
var _c96=_c95.target;
if(_c96==this.targetBinding){
switch(_c95.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c95.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c96.isVisible){
this.show();
this.setPosition(_c96.getPosition());
this.setDimension(_c96.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c97){
var _c98=this.offset-this.expand;
this.bindingElement.style.left=new String(_c97.x+_c98)+"px";
this.bindingElement.style.top=new String(_c97.y+_c98)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c9a){
var _c9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c9a);
return UserInterface.registerBinding(_c9b,ShadowBinding);
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
_ca7.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_ca5.label);
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
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cb8){
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
_d31.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_d31.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d31.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
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
_d3a.windowBinding.isFlexible=false;
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
var _d6e=this._cachedFocus.getBinding();
if(_d6e){
_d6e.blur();
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
var _d6f=this.getProperty("width");
if(!_d6f){
_d6f=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d6f;
}
if(this.height==null){
var _d70=this.getProperty("height");
this.height=_d70?_d70:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d71=this.getProperty("minheight");
if(_d71!=null){
this.minheight=_d71;
}
}
if(this.controls==null){
var _d72=this.getProperty("controls");
this.controls=_d72?_d72:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d73=this.getProperty("resizable");
this.isResizable=_d73?_d73:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d74){
if(_d74!=this.isAutoHeightLayoutMode){
if(_d74){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d74;
}
};
DialogPageBinding.prototype.handleAction=function(_d75){
DialogPageBinding.superclass.handleAction.call(this,_d75);
var _d76=_d75.target;
switch(_d75.type){
case PageBinding.ACTION_ATTACHED:
if(_d76!=this&&_d76.isFitAsDialogSubPage){
_d76.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d75.consume();
if(_d76.response!=null){
this.response=_d76.response;
switch(_d76.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d77){
var _d78=this.bindingWindow.bindingMap.buttonAccept;
if(_d78!=null){
_d78.setDisabled(_d77);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d79){
var _d7a=CSSComputer.getPadding(this.bindingElement);
var _d7b=CSSComputer.getBorder(this.bindingElement);
_d79+=_d7a.top+_d7a.bottom;
_d79+=_d7b.top+_d7b.bottom;
if(_d79>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d79+"px";
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
EditorPageBinding.prototype.handleAction=function(_d83){
EditorPageBinding.superclass.handleAction.call(this,_d83);
var _d84=_d83.target;
switch(_d83.type){
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
var _d85=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d84.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d85==-1){
_d85=0;
}
}else{
_d85++;
}
return res;
});
if(_d85>-1){
this._messengers.del(_d85);
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
_d83.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d84.key,_d84);
if(_d84 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d84.key);
if(_d84 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d84==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d84.getSelectedTabBinding();
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
_d83.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d84==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d83.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d84==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d83.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d84==this._windowBinding){
if(_d84.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d8a=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d8a);
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
var _d8b=this.bindingWindow.bindingMap.savebutton;
if(_d8b!=null&&!_d8b.isDisabled){
_d8b.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d8c=this.bindingWindow.bindingMap.__REQUEST;
if(_d8c!=null){
_d8c.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d8d=this.bindingWindow.bindingMap.__REQUEST;
if(_d8d!=null){
_d8d.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d8e){
this._message=null;
switch(_d8e){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d8e,this._messengers);
if(!this._messengers.hasEntries()){
if(_d8e==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d8e;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d8e;
EditorPageBinding.superclass.postMessage.call(this,_d8e,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d8e,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d8f,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d8f,arg);
switch(_d8f){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d91=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d91);
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
var _d92=new List();
this._invalidBindings.each(function(key,_d94){
var list=_d94.getInvalidLabels();
if(list){
list.each(function(_d96){
_d92.add(_d96);
});
}
});
if(_d92.hasEntries()){
var _d97="";
while(_d92.hasNext()){
_d97+=_d92.getNext().toLowerCase();
if(_d92.hasNext()){
_d97+=", ";
}else{
_d97+=".";
}
}
var _d98=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d98+" "+_d97);
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
EditorPageBinding.prototype.enableSave=function(_d99){
var _d9a=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d9a){
var _d9b=UserInterface.getBinding(_d9a);
if(_d99){
_d9b.enable();
}else{
_d9b.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d9c=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d9c!=null){
UserInterface.getBinding(_d9c).enable();
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
var _d9d=this._windowBinding.getContentDocument().title;
if(_d9d==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d9e=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_da0){
if(_da0.name=="__EVENTTARGET"&&_d9e){
_da0.value=_d9e;
}
list.add({name:_da0.name,value:_da0.value});
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
WizardPageBinding.prototype.handleAction=function(_da2){
WizardPageBinding.superclass.handleAction.call(this,_da2);
var _da3=_da2.target;
switch(_da2.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_da3);
}else{
_da2.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_da3);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_da2.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_da2.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_da4){
var next=this.bindingWindow.bindingMap.nextbutton;
var _da6=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_da4);
}
if(_da6){
_da6.setDisabled(!_da4);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_da7,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_da7,arg);
var self=this;
switch(_da7){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dab){
};
MarkupAwarePageBinding.prototype._activate=function(_dac){
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
var _dad=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_dad.boxObject.getDimension().w;
_dad.hide();
var _dae=this.boxObject.getDimension().h;
this.bindingElement.style.height=_dae+"px";
var self=this;
var _db0=this.bindingWindow.bindingMap.moreactionsbutton;
_db0.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_db1){
self._showMoreActions();
_db1.consume();
}});
var _db2=this.bindingWindow.bindingMap.moreactionspopup;
_db2.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_db3){
var item=_db3.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_db5,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_db5,arg);
switch(_db5){
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
var _db9=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_db9!=null){
_db9.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dba=this.bindingWindow.WindowManager;
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
var _dbb=new String("");
this._actionProfile.each(function(_dbc,list){
list.each(function(_dbe){
_dbb+=_dbe.getHandle()+";"+_dbe.getKey()+";";
if(_dbe.isDisabled()){
_dbb+="isDisabled='true';";
}
});
});
return _dbb;
};
SystemToolBarBinding.prototype.handleAction=function(_dbf){
SystemToolBarBinding.superclass.handleAction.call(this,_dbf);
switch(_dbf.type){
case ButtonBinding.ACTION_COMMAND:
var _dc0=_dbf.target;
this._handleSystemAction(_dc0.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dc1){
if(_dc1!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dc3=list.getFirst();
var _dc4=_dc3.node;
}
SystemAction.invoke(_dc1,_dc4);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dc7,list){
var _dc9=new List();
list.reset();
while(list.hasNext()){
var _dca=list.getNext();
var _dcb=null;
if(_dca.isInToolBar()){
if(_dca.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dcb=self.getToolBarButtonBinding(_dca);
}
}
if(_dcb!=null){
_dc9.add(_dcb);
}
}
if(_dc9.hasEntries()){
var _dcc=ToolBarGroupBinding.newInstance(doc);
_dc9.each(function(_dcd){
_dcc.add(_dcd);
});
self.addLeft(_dcc);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dce=this.bindingWindow.bindingMap.toolsbutton;
var _dcf=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dd0=_dce.bindingElement.offsetLeft-this._moreActionsWidth;
var _dd1=0;
var _dd2=new List();
var _dd3,_dd4=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dd3=_dd4.getNext())!=null){
if(!_dd3.isVisible){
_dd3.show();
}
_dd1+=_dd3.boxObject.getDimension().w;
if(_dd1>=_dd0){
_dd2.add(_dd3);
_dd3.hide();
}
}
if(_dd2.hasEntries()){
var _dd5=_dd2.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dd5).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dd3=_dd2.getNext())!=null){
this._moreActions.add(_dd3.associatedSystemAction);
}
_dcf.show();
}else{
this._moreActions=null;
_dcf.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dd6=this.bindingWindow.bindingMap.moreactionspopup;
_dd6.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dd6.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dd6.add(item);
}
_dd6.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dd8){
var _dd9=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dda=_dd8.getLabel();
var _ddb=_dd8.getToolTip();
var _ddc=_dd8.getImage();
var _ddd=_dd8.isDisabled();
if(_ddc&&_ddc.indexOf("size=")==-1){
_ddc=_ddc+"&size="+this.getImageSize();
_dd9.imageProfile=new ImageProfile({image:_ddc});
}
if(_dda){
_dd9.setLabel(_dda);
}
if(_ddb){
_dd9.setToolTip(_ddb);
}
if(_dd8.isDisabled()){
_dd9.disable();
}
_dd9.associatedSystemAction=_dd8;
return _dd9;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dde=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dde!=null){
_dde.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_ddf){
var _de0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_ddf);
return UserInterface.registerBinding(_de0,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_de1){
var _de2=SystemTreeBinding.superclass.add.call(this,_de1);
if(!this._defaultTreeNode){
if(_de1 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_de1;
}
}
return _de2;
};
SystemTreeBinding.prototype.handleAction=function(_de3){
SystemTreeBinding.superclass.handleAction.call(this,_de3);
var _de4=_de3.target;
switch(_de3.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_de4.key);
this._updateFocusedNode();
_de3.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_de3.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_de4.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_de3.consume();
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
var _de6=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_de6);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_de7){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_de7);
var reg=this._entityTokenRegistry;
var _de9=_de7.node.getEntityToken();
if(reg.has(_de9)){
reg.get(_de9).add(_de7);
}else{
reg.set(_de9,new List([_de7]));
}
var _dea=null;
if(this.isLockedToEditor){
if(_de9==StageBinding.entityToken){
if(_de7.node.isTreeLockEnabled()){
_dea=_de7;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_de7.node.getHandle()){
_dea=_de7;
}
}
}
if(_dea!=null){
this.focusSingleTreeNodeBinding(_dea);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_deb){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_deb);
var reg=this._entityTokenRegistry;
var _ded=_deb.node.getEntityToken();
if(reg.has(_ded)){
var list=reg.get(_ded);
list.del(_deb);
if(!list.hasEntries()){
reg.del(_ded);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_deb.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_deb.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _df1=this._refreshingTreeNodes;
if(_df1.hasEntries()&&_df1.has(key)){
_df1.del(key);
if(!_df1.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _df2=StageBinding.entityToken;
if(_df2!=null){
this._focusTreeNodeByEntityToken(_df2);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _df3=false;
var _df4=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_df3=false;
}else{
if(_df4.hasEntries()){
_df3=true;
while(_df3&&_df4.hasNext()){
var _df5=_df4.getNext();
if(!_df5.isDraggable){
_df3=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_df3;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_df6,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_df6,arg);
switch(_df6){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_df6,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_df6);
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
var self=this,_dfa=arg;
setTimeout(function(){
if(_dfa!=null){
self._focusTreeNodeByEntityToken(_dfa);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _dfc=tab.perspectiveNode==null;
if(!_dfc){
_dfc=tab.perspectiveNode==this.perspectiveNode;
}
if(_dfc){
var self=this,_dfe=tab.getEntityToken();
setTimeout(function(){
if(_dfe==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_dfe);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_dff,_e00){
this.isLockFeatureFocus=true;
var _e01=null;
if(this._entityTokenRegistry.has(_dff)){
var list=this._entityTokenRegistry.get(_dff);
list.each(function(tn){
var _e04=true;
if(tn.node.isTreeLockEnabled()){
_e01=tn;
_e04=false;
}
return _e04;
});
if(_e01!=null){
if(!_e01.isFocused){
this.focusSingleTreeNodeBinding(_e01,true);
}else{
_e01.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e01==null&&_e00!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_dff);
self._focusTreeNodeByEntityToken(_dff,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e06){
var _e07=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e08=this.getRootTreeNodeBindings();
while(_e08.hasNext()){
var _e09=_e08.getNext();
_e07.add(_e09.node.getEntityToken());
}
}else{
_e07.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e07.hasNext()){
var _e0a=_e07.getNext();
var _e0b=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e0a,_e06,_e0b);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e0e=this._treeNodeBindings;
var _e0f=new Map();
function fix(_e10,list){
if(!_e10.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e0e.has(node.getHandle())){
var _e13=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e0f.set(node.getHandle(),_e13);
_e10.add(_e13);
}
});
_e10.attachRecursive();
}
}
_e10.open(true);
}
map.each(function(_e14,list){
if(_e0e.has(_e14)){
var _e16=_e0e.get(_e14);
fix(_e16,list);
}else{
if(_e0f.has(_e14)){
var _e17=_e0f.get(_e14);
fix(_e17,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e18,arg){
switch(_e18){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e1a=arg;
if(_e1a!=null){
this._invokeServerRefresh(_e1a);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e1b=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e1b;
_e1b.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e1b=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e1b;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e1c){
if(_e1c!=null&&_e1c=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e1c)){
var list=this._entityTokenRegistry.get(_e1c).reset();
this._refreshToken=_e1c;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e1e=list.getNext();
this._refreshingTreeNodes.set(_e1e.key,true);
setTimeout(function(){
_e1e.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e1f=this.getFocusedTreeNodeBindings().getFirst();
if(_e1f){
var _e20=_e1f.getLabel();
var _e21=_e1f.getAncestorBindingByLocalName("treenode");
if(_e21){
_e1f=_e21;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e1f.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e22=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e22,[_e20]);
}
_e1f.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e23=SystemTreeBinding.clipboard;
if(_e23){
var type=_e23.dragType;
var _e25=this.getFocusedTreeNodeBindings().getFirst();
if(_e25.dragAccept){
if(_e25.acceptor.isAccepting(type)){
this._performPaste(_e25);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e26){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e26.node.hasDetailedDropSupport()){
if(_e26.node.hasChildren()){
var _e28=_e26.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e29,_e2a){
if(_e29==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e2b=_e2a.get("switch");
var _e2c=_e2a.get("sibling");
if(_e2b=="after"){
_e2c++;
}
var _e2d=_e26.accept(SystemTreeBinding.clipboard,_e2c);
if(_e2d){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e28);
}else{
Application.lock(self);
var _e2e=_e26.accept(SystemTreeBinding.clipboard,0);
if(_e2e){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e2e=_e26.accept(SystemTreeBinding.clipboard,0);
if(_e2e){
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
SystemTreeBinding.prototype.collapse=function(_e2f){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e2f){
this.blurSelectedTreeNodes();
var _e30=this.getRootTreeNodeBindings();
_e30.each(function(_e31){
if(_e31.isContainer&&_e31.isOpen){
_e31.close();
_e31.hasBeenOpened=false;
_e31.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e32){
if(_e32!=this.isLockedToEditor){
this.isLockedToEditor=_e32;
if(_e32){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e34=this.getRootTreeNodeBindings();
_e34.each(function(_e35){
var _e36=_e35.getOpenSystemNodes();
if(_e36!=null&&_e36.hasEntries()){
list.merge(_e36);
}else{
if(_e35.isOpen){
list.add(_e35.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e37){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e37);
if(_e37!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e39=new Map();
var _e3a=this.getFocusedTreeNodeBindings();
var _e3b=_e3a.getFirst().node.getActionProfile();
var self=this;
_e3b.each(function(_e3d,list){
var _e3f=new List();
list.each(function(_e40){
if(_e40.getActivePositions()&self._activePosition){
_e3f.add(_e40);
}
});
if(_e3f.hasEntries()){
_e39.set(_e3d,_e3f);
}
});
_e39.activePosition=this._activePosition;
return _e39;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e41,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e41,arg);
switch(_e41){
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
var _e46=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e46.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e47=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e47.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e48){
SystemTreePopupBinding.superclass.handleAction.call(this,_e48);
switch(_e48.type){
case MenuItemBinding.ACTION_COMMAND:
var _e49=_e48.target;
var _e4a=_e49.associatedSystemAction;
if(_e4a){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e4c=list.getFirst();
var _e4d=_e4c.node;
}
SystemAction.invoke(_e4a,_e4d);
}else{
var cmd=_e49.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e50=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e50=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e50=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e50=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e50=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e50){
setTimeout(function(){
EventBroadcaster.broadcast(_e50);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e51=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e51.hasNext()){
var _e52=UserInterface.getBinding(_e51.getNext());
if(!_e52.getProperty("rel")){
_e52.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e54=new List();
var self=this;
this._actionProfile.each(function(_e56,list){
var _e58=MenuGroupBinding.newInstance(doc);
list.each(function(_e59){
var _e5a=self.getMenuItemBinding(_e59);
_e58.add(_e5a);
});
_e54.add(_e58);
});
_e54.reverse();
while(_e54.hasNext()){
this._bodyBinding.addFirst(_e54.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e5b){
var _e5c=MenuItemBinding.newInstance(this.bindingDocument);
var _e5d=_e5b.getLabel();
var _e5e=_e5b.getToolTip();
var _e5f=_e5b.getImage();
var _e60=_e5b.getDisabledImage();
var _e61=_e5b.isCheckBox();
if(_e5d){
_e5c.setLabel(_e5d);
}
if(_e5e){
_e5c.setToolTip(_e5e);
}
if(_e5f){
_e5c.imageProfile=new ImageProfile({image:_e5f,imageDisabled:_e60});
}
if(_e61){
_e5c.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e5b.isChecked()){
_e5c.check(true);
}
}
if(_e5b.isDisabled()){
_e5c.disable();
}
_e5c.associatedSystemAction=_e5b;
return _e5c;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e65=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e65=UserInterface.getBinding(node);
if(_e65.isDisabled){
_e65=null;
}
}
break;
}
if(_e65!=null&&_e65.node!=null&&_e65.node.getActionProfile()!=null){
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
var _e66=this.node.getLabel();
if(_e66){
this.setLabel(_e66);
}
var _e67=this.node.getToolTip();
if(_e67){
this.setToolTip(_e67);
}
var _e68=this.node.getHandle();
if(_e68){
this.setHandle(_e68);
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
var _e6b="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e6b+=list.getNext();
if(list.hasNext()){
_e6b+=" ";
}
}
this.setProperty("dragaccept",_e6b);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e6d){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e6d);
switch(_e6d.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e6d.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e6d.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e6e,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e6e,arg);
switch(_e6e){
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
var _e71=null;
var _e72=this.node.getImageProfile();
if(_e72){
if(this.isOpen){
_e71=_e72.getActiveImage();
}else{
_e71=_e72.getDefaultImage();
}
}
if(!_e71){
_e71=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e71;
};
SystemTreeNodeBinding.prototype.open=function(_e73){
var _e74=this.isContainer&&!this.isOpen;
var _e75=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e74&&(_e75||SystemTreeBinding.HAS_NO_MEMORY)&&_e73!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e76=null;
if(this.isContainer){
_e76=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e76);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e78){
if(_e78!=null){
this._refreshBranch(_e78);
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
var _e79=new List();
var _e7a=this.node.getChildren();
this.empty();
if(_e7a.hasEntries()){
this._insertTreeNodesRegulated(_e7a);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e7b){
var _e7c=0;
var _e7d=new List([]);
while(_e7b.hasEntries()&&_e7c<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e7e=SystemTreeNodeBinding.newInstance(_e7b.extractFirst(),this.bindingDocument);
_e7e.autoExpand=this.autoExpand;
this.add(_e7e);
_e7e.attach();
_e7c++;
if(this.autoExpand){
if(_e7c==1&&!_e7b.hasEntries()||LastOpenedSystemNodes.isOpen(_e7e)){
_e7d.add(_e7e);
}
}
}
if(_e7b.hasEntries()){
this._insertBufferTreeNode(_e7b);
}
_e7d.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e81){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e83=this.node.getDescendantBranch(list);
if(_e83.hasEntries()){
this.XXX(_e83);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e84){
var self=this;
var map=new Map();
this.empty();
_e84.each(function(key,_e88){
if(_e88.hasEntries()){
_e88.each(function(node){
var _e8a=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e8a);
if(map.has(key)){
var _e8b=map.get(key);
_e8b.add(_e8a);
_e8b.isOpen=true;
_e8b.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e8a);
}else{
}
}
});
}
});
this.attachRecursive();
_e84.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e8c=new TreeCrawler();
var _e8d=new List();
_e8c.mode=TreeCrawler.MODE_GETOPEN;
_e8c.crawl(this.bindingElement,_e8d);
if(_e8d.hasEntries()){
_e8d.extractFirst();
}
_e8c.dispose();
return _e8d;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e8e=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e8e=new List([this.node]);
list.each(function(_e90){
_e8e.add(_e90.node);
});
}
return _e8e;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e91,_e92){
var _e93=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e91 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e91.node.getData(),this.node.getData(),_e92?_e92:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e93);
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
SystemTreeNodeBinding.newInstance=function(node,_e97){
var _e98=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e97);
var _e99=UserInterface.registerBinding(_e98,SystemTreeNodeBinding);
_e99.node=node;
return _e99;
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
SystemPageBinding.prototype.setPageArgument=function(_e9a){
this.node=_e9a;
SystemPageBinding.superclass.setPageArgument.call(this,_e9a);
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
var _e9b=this.node.getChildren();
if(_e9b.hasEntries()){
while(_e9b.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e9b.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e9d=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e9d.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e9f=new TreeCrawler();
var _ea0=new List();
_e9f.mode=TreeCrawler.MODE_GETOPEN;
_e9f.crawl(this.bindingElement,_ea0);
_e9f.dispose();
var list=new List([this.node]);
_ea0.each(function(_ea2){
list.add(_ea2.node);
});
this._tree.empty();
var _ea3=this.node.getDescendantBranch(list);
if(_ea3.hasEntries()){
var self=this;
var map=new Map();
_ea3.each(function(key,_ea7){
_ea7.each(function(node){
var _ea9=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_ea9);
if(map.has(key)){
var _eaa=map.get(key);
_eaa.add(_ea9);
_eaa.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_ea9);
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
SystemPageBinding.prototype.handleAction=function(_eab){
SystemPageBinding.superclass.handleAction.call(this,_eab);
switch(_eab.type){
case ButtonBinding.ACTION_COMMAND:
var _eac=_eab.target;
switch(_eac.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eac.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ead,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ead,arg);
switch(_ead){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _eaf=arg;
if(this.node&&this.node.getEntityToken()==_eaf){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_eaf);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_eaf);
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
StageContainerBinding.prototype.handleBroadcast=function(_eb1,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_eb1,arg);
var _eb3=this.bindingWindow.WindowManager;
switch(_eb1){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_eb3.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _eb3.WINDOW_RESIZED_BROADCAST:
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
var _eb5=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eb5.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_eb6){
if(StageBinding.isViewOpen(_eb6)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_eb6);
}else{
var _eb7=ViewDefinitions[_eb6];
StageBinding.presentViewDefinition(_eb7);
}
};
StageBinding.isViewOpen=function(_eb8){
return StageBinding.bindingInstance._activeViewDefinitions[_eb8]!=null;
};
StageBinding.presentViewDefinition=function(_eb9){
if(_eb9.label!=null){
var _eba=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_eba,[_eb9.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_eb9);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ebc,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ebe=System.getPerspectiveNodes();
if(_ebe.hasEntries()){
this._initializeSystemViewDefinitions(_ebe);
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
var _ec0=null;
if(LocalStore.isEnabled){
_ec0=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ec0&&ViewDefinitions[_ec0]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ec0));
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
var _ec2=root.getActionProfile();
if(_ec2&&_ec2.hasEntries()){
var _ec3=top.app.bindingMap.toolsmenugroup;
if(_ec3){
_ec2.each(function(_ec4,list){
list.each(function(_ec6){
var item=MenuItemBinding.newInstance(_ec3.bindingDocument);
item.setLabel(_ec6.getLabel());
item.setToolTip(_ec6.getToolTip());
item.setImage(_ec6.getImage());
item.setDisabled(_ec6.isDisabled());
item.associatedSystemAction=_ec6;
var _ec8=_ec3;
var tag=_ec6.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ec8=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ec8.add(item);
});
});
_ec3.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_eca){
while(_eca.hasNext()){
var node=_eca.getNext();
var _ecc=node.getHandle();
ViewDefinitions[_ecc]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ecd){
StageBinding.superclass.handleAction.call(this,_ecd);
var _ece=_ecd.target;
switch(_ecd.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ece;
this._inflateBinding(_ece);
_ecd.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ece;
this._inflateBinding(_ece);
_ecd.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ece);
_ecd.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ece instanceof DockBinding){
switch(_ece.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ece.reference,_ece);
break;
}
this.handleAttachedDock(_ece);
_ecd.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ece instanceof DockBinding){
this.handleSelectedDockTab(_ece.getSelectedTabBinding());
_ecd.consume();
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
_ecd.consume();
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
_ecd.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ecd);
};
StageBinding.prototype.handleBroadcast=function(_ed0,arg){
StageBinding.superclass.handleBroadcast.call(this,_ed0,arg);
switch(_ed0){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ed2=arg;
this._dontView(_ed2);
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
StageBinding.prototype._showStart=function(_ed4){
if(_ed4!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ed7=this.bindingWindow.bindingMap.maindecks;
if(_ed4){
_ed7.select("startdeck");
view.show();
}else{
view.hide();
_ed7.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ed4;
}
};
StageBinding.prototype._inflateBinding=function(_ed8){
for(var _ed9 in ViewDefinitions){
var _eda=ViewDefinitions[_ed9];
if(_eda instanceof SystemViewDefinition){
_ed8.mountDefinition(_eda);
}
}
var _edb=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_edb){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ede=new StageCrawler();
_ede.mode=mode;
_ede.crawl(this.bindingElement);
_ede.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_edf){
var _ee0=_edf.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ee0);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ee0));
}
};
StageBinding.prototype.handleAttachedDock=function(_ee1){
var _ee2=_ee1.getTabBindings();
if(_ee2.hasEntries()){
while(_ee2.hasNext()){
var _ee3=_ee2.getNext();
var _ee4=_ee3.getHandle();
if(_ee4){
if(_ee4=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ee5=ViewDefinitions[_ee4];
if(_ee5){
this._view(_ee1,_ee3,_ee5,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ee4+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ee6){
var _ee7=null;
var _ee8=false;
switch(_ee6.position){
case Dialog.MODAL:
_ee7=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ee7=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ee6.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ee7=this._dockBindings.get(_ee6.position);
break;
case DockBinding.EXTERNAL:
window.open(_ee6.url);
_ee8=true;
break;
default:
var _ee9=this._decksBinding.getSelectedDeckBinding();
_ee7=_ee9.getDockBindingByReference(_ee6.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _eea=this.bindingWindow.bindingMap.maindecks;
_eea.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ee8=true;
}
break;
}
if(!_ee8){
if(_ee7!=null){
this._view(_ee7,null,_ee6,true);
}else{
throw "StageBinding: Could not position view: "+_ee6.handle;
}
}
};
StageBinding.prototype._view=function(_eeb,_eec,_eed,_eee){
var _eef=_eed.handle;
if(_eed.isMutable){
_eef+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_eef]){
var _ef0=ViewBinding.getInstance(_eef);
if(_ef0!=null){
_ef0.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_eef);
}
}else{
this._activeViewDefinitions[_eef]=_eed;
Application.lock(this);
switch(_eeb.constructor){
case DockBinding:
if(_eee){
_eeb.prepareNewView(_eed);
}else{
_eeb.prepareOpenView(_eed,_eec);
}
break;
case StageDialogBinding:
if(_eee){
_eeb.prepareNewView(_eed);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ef1){
if(this._activeViewDefinitions[_ef1]!=null){
delete this._activeViewDefinitions[_ef1];
}else{
this.logger.debug("Could not unregister active view: "+_ef1);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ef2){
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
this.addFilter(function(_ef4){
var _ef5=UserInterface.getBinding(_ef4);
var _ef6=null;
if(_ef5){
switch(_ef5.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_ef5.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_ef5.handleUnMaximization();
break;
}
break;
case DockBinding:
_ef6=NodeCrawler.SKIP_NODE;
break;
}
}
return _ef6;
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
var _ef7=null;
this._dialogs.each(function(_ef8){
if(!_ef8.isVisible){
_ef7=_ef8;
}
return _ef7!=null;
});
if(!_ef7){
this._newInstance();
_ef7=this._dialogs.getLast();
}
_ef7.setModal(false);
return _ef7;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _ef9=this.getInstance();
_ef9.setModal(true);
return _ef9;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _efa=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_efa);
_efa.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_efb){
if(_efb instanceof DialogViewDefinition){
var _efc=ViewBinding.newInstance(this.bindingDocument);
_efc.setDefinition(_efb);
_efc.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_efb.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_efb.handler)){
this._dialogResponseHandler=_efb.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_efc;
this._body.add(_efc);
_efc.attach();
_efc.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_efd){
StageDialogBinding.superclass.handleAction.call(this,_efd);
var _efe=_efd.target;
switch(_efd.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_efe);
_efd.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_efe.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_efd.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_efe.response){
this._handleDialogPageResponse(_efe);
}
_efd.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_efd.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_efd.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_efe.dispose();
_efd.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_efd.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_efd.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_efd.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_efd.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_efd.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_efe==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_eff,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_eff,arg);
switch(_eff){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f01){
var _f02=new FitnessCrawler();
var list=new List();
if(_f01){
_f02.mode=FitnessCrawler.MODE_BRUTAL;
}
_f02.crawl(this.bindingElement,list);
_f02.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f04){
_f04.fit(_f01);
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
var _f05=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f05){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f07){
var cmd=_f07.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f09){
if(_f09.bindingDocument==this._viewBinding.getContentDocument()){
if(_f09 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f09);
}
this._pageBinding=_f09;
if(_f09.height=="auto"){
_f09.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f09);
_f09.enableAutoHeightLayoutMode(false);
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
if(_f09.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f09);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f0a){
var _f0b=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f0b){
var _f0c=UserInterface.getBinding(_f0b);
_f0c.setDisabled(_f0a);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f0d){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f0d.response,_f0d.result!=null?_f0d.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_f0e){
if(_f0e.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f0e);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f10){
switch(_f10.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f10.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f10.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f11){
var _f12=_f11.label;
var _f13=_f11.image;
var _f14=_f11.width;
var _f15=_f11.height;
var _f16=_f11.controls;
var _f17=_f11.isResizable;
if(_f12){
this.setLabel(_f12);
}
if(_f13){
this.setImage(_f13);
}
if(_f14||_f15){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f14?_f14:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f15!=null&&_f15!="auto")?_f15:old.h;
this.setDimension(nev);
}
if(_f16){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f1b=new List(_f16.split(" "));
while((type=_f1b.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f17!=this._isResizable){
this.setResizable(_f17);
}
if(_f15=="auto"){
this._fixAutoHeight(_f11);
}
if(_f11==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f1c){
var dim=this.getDimension();
var _f1e=0;
var _f1f=0;
if(_f1c.isDialogSubPage){
_f1c=this._pageBinding;
}
if(this._isFirstPage){
_f1e=_f1c.width!=null?_f1c.width:dim.w;
}else{
_f1e=dim.w;
}
_f1f=_f1c.bindingElement.offsetHeight;
_f1f+=this._titlebar.bindingElement.offsetHeight;
_f1f+=4;
if(_f1f<dim.h){
_f1f=dim.h;
}
if(_f1c.minheight!=null){
if(_f1f<_f1c.minheight){
_f1f=_f1c.minheight;
}
}
this.setDimension(new Dimension(_f1e,_f1f));
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
StageDialogBinding.newInstance=function(_f22){
var _f23=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f22);
var _f24=UserInterface.registerBinding(_f23,StageDialogBinding);
_f24.setProperty("controls","minimize maximize close");
return _f24;
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
this.addFilter(function(_f25,list){
var _f27=null;
var _f28=UserInterface.getBinding(_f25);
if(!_f28.isVisible){
_f27=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f27;
});
this.addFilter(function(_f29,list){
var _f2b=null;
var _f2c=UserInterface.getBinding(_f29);
if(_f2c.isAttached){
if(Interfaces.isImplemented(IFit,_f2c)){
if(!_f2c.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f2c);
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
StageDecksBinding.prototype.mountDefinition=function(_f2d){
var _f2e=StageDeckBinding.newInstance(this.bindingDocument);
_f2e.handle=_f2d.handle;
_f2e.perspectiveNode=_f2d.node;
this._decks[_f2e.handle]=_f2e;
this.add(_f2e);
_f2e.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f2f){
var _f30=this._decks[_f2f];
StageBinding.perspectiveNode=_f30.perspectiveNode;
this.select(_f30);
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
StageDeckBinding.prototype.handleAction=function(_f31){
StageDeckBinding.superclass.handleAction.call(this,_f31);
var _f32=_f31.target;
switch(_f31.type){
case WindowBinding.ACTION_LOADED:
if(_f32==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f31.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f32 instanceof DockBinding){
this._dockBindings.set(_f32.reference,_f32);
_f32.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f31.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f31.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f31);
StageDeckBinding.superclass.handleAction.call(this,_f31);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f34=new StageCrawler();
_f34.mode=mode;
_f34.crawl(this.windowBinding.getContentDocument().body);
_f34.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f35){
return this._dockBindings.get(_f35);
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
StageDeckBinding.newInstance=function(_f37){
var _f38=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f37);
var _f39=UserInterface.registerBinding(_f38,StageDeckBinding);
return _f39;
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
StageSplitBoxBinding.prototype.handleAction=function(_f3a){
StageSplitBoxBinding.superclass.handleAction.call(this,_f3a);
StageBoxAbstraction.handleAction.call(this,_f3a);
var _f3b=_f3a.target;
var _f3c=null;
var _f3d=null;
switch(_f3a.type){
case DockBinding.ACTION_EMPTIED:
_f3d=this.getChildBindingByLocalName("splitter");
if(_f3d.isVisible){
_f3d.hide();
}
_f3c=this.getDescendantBindingsByLocalName("dock");
if(_f3c.getFirst().isEmpty&&_f3c.getLast().isEmpty){
if(_f3c.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f3a.consume();
break;
case DockBinding.ACTION_OPENED:
_f3c=this.getDescendantBindingsByLocalName("dock");
if(!_f3c.getFirst().isEmpty&&!_f3c.getLast().isEmpty){
_f3d=this.getChildBindingByLocalName("splitter");
if(!_f3d.isVisible){
_f3d.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f3a.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f3b!=this){
_f3d=this.getChildBindingByLocalName("splitter");
if(_f3d.isVisible){
_f3d.hide();
}
this.invokeLayout();
_f3a.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f3b!=this){
var _f3e=this.getChildBindingsByLocalName("splitpanel");
if(_f3e.getFirst().isVisible&&_f3e.getLast().isVisible){
_f3d=this.getChildBindingByLocalName("splitter");
if(!_f3d.isVisible){
_f3d.show();
}
}
this.invokeLayout();
_f3a.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f3f){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f3f);
switch(_f3f.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f3f.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f40=this.getChildBindingsByLocalName("splitpanel");
return _f40.getFirst().isVisible&&_f40.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f41=this.getChildBindingsByLocalName("splitpanel");
return _f41.getFirst().isFixed&&_f41.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f42){
StageSplitPanelBinding.superclass.handleAction.call(this,_f42);
StageBoxAbstraction.handleAction.call(this,_f42);
switch(_f42.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f42.type==StageSplitBoxBinding.ACTION_HIDE){
_f42.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f42.type==DockBinding.ACTION_EMPTIED){
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
if(_f42.type==StageSplitBoxBinding.ACTION_SHOW){
_f42.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f45=_f42.target;
if(_f45!=this&&_f45.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f46=_f45._containingSplitBoxBinding;
if(_f46.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f47=_f46.getChildBindingsByLocalName("splitpanel");
var _f48=_f47.getFirst();
var _f49=_f47.getLast();
if(this.isFixed==true){
if(!_f48.isFixed||!_f49.isFixed||(!_f46.hasBothPanelsVisible()&&_f45.isMinimizedForReal)){
this.setFix(false);
_f42.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f46.hasBothPanelsFixed()||(!_f46.hasBothPanelsVisible()&&_f45.isMinimizedForReal)){
this.setFix(_f45.getContainedDock().getHeight());
_f42.consume();
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
var _f4a=this.getContainedDock();
if(_f4a){
if(this.isMaximizePrepared==true){
}else{
_f4a.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f4b=this.getContainedDock();
if(_f4b){
if(_f4b.type==DockBinding.TYPE_EDITORS){
if(_f4b.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f4b.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f4c=this.getContainedDock();
if(_f4c){
_f4c.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f4c);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f4d=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f4e=this.getContainedDock();
if(_f4e){
_f4e.collapse(_f4d);
if(!_f4d){
this.setFix(_f4e.getHeight());
}else{
this.setFix(_f4e.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f4e&&_f4e.isActive){
_f4e.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f4e);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f4f){
var _f50=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f51=this.getContainedDock();
if(_f51){
if(this.isMinimized==true){
_f51.unCollapse(_f50);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f4f){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f51){
_f51.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f51);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f52){
var _f53=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f53=false;
}
}
if(_f53==true){
this._invisibilize(_f52);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f55){
if(_f55!=this._isInvisibilized){
if(_f55){
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
StageSplitterBinding.prototype.onDragStart=function(_f56){
var _f57=top.app.bindingMap.stagesplittercover;
var _f58=this._containingSplitBoxBinding.getOrient();
switch(_f58){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f57.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f57.bindingElement.style.cursor="n-resize";
break;
}
_f57.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f58);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f5e){
this._orient=_f5e;
this.attachClassName(_f5e);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f60=true;
var _f61=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f61=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f60=false;
break;
}
if(_f60){
this.bindingElement.style.left=pos.x+"px";
}
if(_f61){
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
StageBoxAbstraction.handleAction=function(_f63){
switch(_f63.type){
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
if(_f63.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f63.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f64=this.bindingElement.style;
_f64.position="absolute";
_f64.width="100%";
_f64.height="100%";
_f64.top="0";
_f64.left="0";
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
var _f65=this.bindingElement.style;
_f65.position="relative";
_f65.width="auto";
_f65.height="auto";
_f65.top="auto";
_f65.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f66,_f67){
var _f68=_f66.bindingElement.style;
var _f69=_f66.bindingElement.parentNode;
var box=_f66._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f67){
_f66._unmodifiedFlexMethod=_f66.flex;
_f66.flex=function(){
_f68.width=_f69.offsetWidth+"px";
_f68.height=_f69.offsetHeight+"px";
};
}else{
_f68.width="100%";
_f68.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f68.width="auto";
_f68.height="auto";
box.reflex(true);
},0);
}
_f66.flex=_f66._unmodifiedFlexMethod;
_f66._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f6b){
var _f6c=_f6b.target;
switch(_f6b.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f6c instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f6b);
_f6b.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f6b.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f6d){
var mode=null;
switch(_f6d.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f6f){
StageMenuBarBinding.superclass.handleAction.call(this,_f6f);
switch(_f6f.type){
case MenuItemBinding.ACTION_COMMAND:
var _f70=_f6f.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f70){
SystemAction.invoke(_f70,this._rootNode);
}
}
_f6f.consume();
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
var _f71=this.getProperty("handle");
if(_f71){
this._handle=_f71;
if(StageBinding.isViewOpen(_f71)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f71);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f73){
this.setProperty("handle",_f73);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f74,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f74,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f74){
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
StageViewMenuItemBinding.newInstance=function(_f76){
var _f77=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f76);
UserInterface.registerBinding(_f77,StageViewMenuItemBinding);
return UserInterface.getBinding(_f77);
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
StageStatusBarBinding.prototype.setLabel=function(_f78){
this._label.setLabel(_f78);
};
StageStatusBarBinding.prototype.setImage=function(_f79){
this._label.setImage(_f79);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f7a){
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
var _f7b=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f7c=_f7b.getAssociatedView();
var _f7d=_f7c.getContentWindow().bindingMap.tree;
var _f7e=_f7d.getFocusedTreeNodeBindings();
if(!_f7e.hasEntries()&&StageBinding.treeSelector){
_f7e=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f7e;
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
ExplorerBinding.prototype.handleAction=function(_f7f){
ExplorerBinding.superclass.handleAction.call(this,_f7f);
var _f80=_f7f.target;
switch(_f7f.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f7f.consume();
break;
case Binding.ACTION_DRAG:
if(_f80 instanceof ExplorerSplitterBinding){
_f80.dragger.registerHandler(this);
}
_f7f.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f82){
this._menuBinding.setSelectionByHandle(_f82);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f83){
if(_f83 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f83);
this._menuBinding.mountDefinition(_f83);
}
};
ExplorerBinding.prototype.onDragStart=function(_f84){
var _f85=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f85.hasEntries()){
var _f86=_f85.getFirst();
this._dragStart=_f86.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f86.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f8a){
if(_f8a instanceof SystemViewDefinition){
var _f8b=ViewBinding.newInstance(this.bindingDocument);
_f8b.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f8b.setDefinition(_f8a);
var _f8c=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f8c.setAssociatedView(_f8b);
this._decks[_f8a.handle]=_f8c;
_f8c.add(_f8b);
this.add(_f8c);
function attach(){
_f8c.attach();
_f8b.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f8d){
var _f8e=this._decks[_f8d];
this.select(_f8e);
};
DecksBinding.prototype.expandBy=function(_f8f){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f91=this.bindingElement.offsetHeight+_f8f;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f91+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f93){
var _f94=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f93);
return UserInterface.registerBinding(_f94,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f95){
this._viewBinding=_f95;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f96=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f97=this._viewBinding.getDefinition().label;
StatusBar.busy(_f96,[_f97]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f98){
ExplorerDeckBinding.superclass.handleAction.call(this,_f98);
var _f99=_f98.target;
switch(_f98.type){
case PageBinding.ACTION_INITIALIZED:
if(_f99 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f99.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f9a,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f9a,arg);
switch(_f9a){
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
var _f9c=null;
if(this._isExplorerDeckBindingInitialized){
_f9c=this._viewBinding.getDefinition().label;
}else{
_f9c=DockTabBinding.LABEL_TABLOADING;
}
return _f9c;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f9d=null;
if(this._isExplorerDeckBindingInitialized){
_f9d=this._viewBinding.getDefinition().image;
}else{
_f9d=DockTabBinding.IMG_TABLOADING;
}
return _f9d;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f9e=null;
if(this._isExplorerDeckBindingInitialized){
_f9e=this._viewBinding.getDefinition().toolTip;
}
return _f9e;
};
ExplorerDeckBinding.newInstance=function(_f9f){
var _fa0=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f9f);
return UserInterface.registerBinding(_fa0,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fa1){
switch(_fa1.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fa1.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fa1.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fa1);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fa2){
this._maxButtons.set(_fa2.handle,this._mountMaxButton(_fa2));
this._minButtons.set(_fa2.handle,this._mountMinButton(_fa2));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fa3){
var _fa4=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fa4.setLabel(_fa3.label);
_fa4.setToolTip(_fa3.toolTip);
_fa4.handle=_fa3.handle;
_fa4.node=_fa3.node;
this._maxGroup.add(_fa4);
this._maxList.add(_fa4);
_fa4.attach();
return _fa4;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fa5){
var _fa6=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fa6.setLabel(_fa5.label);
_fa6.setToolTip(_fa5.label);
_fa6.handle=_fa5.handle;
_fa6.node=_fa5.node;
this._minGroup.addFirst(_fa6);
this._minList.add(_fa6);
_fa6.attach();
_fa6.hide();
return _fa6;
};
ExplorerMenuBinding.prototype.handleAction=function(_fa7){
ExplorerMenuBinding.superclass.handleAction.call(this,_fa7);
switch(_fa7.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fa8=_fa7.target;
var _fa9=_fa8.getCheckedButtonBinding();
var _faa=_fa9.handle;
switch(_fa8){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_faa),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_faa),true);
break;
}
this._selectedHandle=_faa;
this._selectedTag=_fa9.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_fa7.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fab){
var _fac=this._maxButtons.get(_fab);
if(_fac){
_fac.check();
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
var _fad=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fad=true;
}
return _fad;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _faf=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_faf=true;
}
return _faf;
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
ExplorerToolBarBinding.newInstance=function(_fb0){
var _fb1=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fb0);
return UserInterface.registerBinding(_fb1,ExplorerToolBarBinding);
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
var _fb2=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fb3=_fb2?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fb3);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fb4,_fb5){
var _fb6=(_fb5==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fb7=DOMUtil.createElementNS(Constants.NS_UI,_fb6,_fb4);
var _fb8=UserInterface.registerBinding(_fb7,ExplorerToolBarButtonBinding);
_fb8.explorerToolBarButtonType=_fb5;
return _fb8;
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
EditorBinding.registerComponent=function(_fb9,_fba){
var _fbb=EditorBinding._components;
var _fbc=EditorBinding._editors;
var key=_fba.key;
var _fbe=Interfaces.isImplemented(IWysiwygEditorComponent,_fb9);
if(!_fbe){
_fbe=Interfaces.isImplemented(ISourceEditorComponent,_fb9);
}
if(_fbe){
if(_fbc.has(key)){
_fbc.get(key).initializeEditorComponent(_fb9);
}else{
if(!_fbb.has(key)){
_fbb.set(key,new List());
}
_fbb.get(key).add(_fb9);
}
}else{
throw "Editor component interface not implemented: "+_fb9;
}
};
EditorBinding.claimComponents=function(_fbf,_fc0){
var _fc1=EditorBinding._components;
var _fc2=EditorBinding._editors;
var key=_fc0.key;
_fc2.set(key,_fbf);
var list=null;
if(_fc1.has(key)){
list=_fc1.get(key).copy();
_fc1.del(key);
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
var _fc6=this.getProperty("value");
if(_fc6!=null){
_fc6=decodeURIComponent(_fc6);
this._startContent=_fc6;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fc8=this.bindingWindow.DataManager;
_fc8.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fca){
var _fcb=EditorBinding.claimComponents(this,_fca);
if(_fcb!=null){
while(_fcb.hasNext()){
this.initializeEditorComponent(_fcb.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fcd=this.bindingWindow.DataManager;
if(_fcd.getDataBinding(name)){
_fcd.unRegisterDataBinding(name);
}
_fcd.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fce=this.getEditorDocument();
if(_fce!=null){
Application.framework(_fce);
DOMEvents.addEventListener(_fce,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fce,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fce,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fce,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fd0){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fd0==true){
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
var _fd2=this.getCheckSum();
if(_fd2!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fd2;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fd3=null;
if(Binding.exists(this._pageBinding)){
_fd3=this._pageBinding.getCheckSum(this._checksum);
}
return _fd3;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fd5=DOMEvents.getTarget(e);
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
if(_fd5.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fd7,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fd7,arg);
var _fd9=null;
switch(_fd7){
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
var _fda=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fda=false;
}
}
}else{
_fd9=DOMEvents.getTarget(arg);
if(_fd9&&_fd9.ownerDocument==this.getEditorDocument()){
_fda=false;
}
}
if(_fda){
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
EditorBinding.prototype._activateEditor=function(_fdb){
if(_fdb!=this._isActivated){
this._isActivated=_fdb;
EditorBinding.isActive=_fdb;
var _fdc=this.getEditorWindow().standardEventHandler;
var _fdd=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fdd!=null){
if(_fdb){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fdd.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fdc.enableNativeKeys(true);
}else{
_fdd.disable();
_fdc.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fde=this.getEditorDocument().selection.createRange();
_fde.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fdf=false;
try{
if(!Client.isExplorer){
var _fe0=this.getEditorWindow().getSelection();
if(_fe0!=null){
_fdf=_fe0.toString().length>0;
if(!_fdf){
var _fe1=_fe0.getRangeAt(0);
var frag=_fe1.cloneContents();
var _fe3=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fe3.appendChild(frag.firstChild);
}
var img=_fe3.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fdf=true;
}
}
}
}
}else{
var _fe1=this.getEditorDocument().selection.createRange();
_fdf=(_fe1&&_fe1.text)&&_fe1.text.length>0;
if(_fe1.commonParentElement&&VisualEditorBinding.isImageElement(_fe1.commonParentElement())){
_fdf=true;
}
}
}
catch(exception){
}
return _fdf;
};
EditorBinding.prototype.isCommandEnabled=function(_fe5){
var _fe6=true;
switch(_fe5){
case "Cut":
case "Copy":
case "Paste":
_fe6=this.getEditorDocument().queryCommandEnabled(_fe5);
break;
}
return _fe6;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fea=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _feb=null;
if(cmd=="Paste"){
_feb=null;
}else{
_feb=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_feb);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fea=true;
}
break;
}
return _fea;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fed=this.getContentWindow().bindingMap.toolbar;
var _fee=_fed.getButtonForCommand(cmd);
if(!_fee){
throw "No button for command "+cmd;
}
return _fee;
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
var _ff1=this.getContentDocument().getElementById("focusableinput");
if(_ff1!=null){
_ff1.style.display="block";
FocusBinding.focusElement(_ff1);
_ff1.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_ff2){
EditorBinding.superclass.handleAction.call(this,_ff2);
var _ff3=_ff2.target;
var self=this;
var _ff5=this.shadowTree.iframe;
switch(_ff2.type){
case Binding.ACTION_DIRTY:
if(_ff2.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_ff6){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_ff6);
};
EditorBinding.prototype.handleElement=function(_ff7){
return true;
};
EditorBinding.prototype.updateElement=function(_ff8){
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
var _ffb=this._menuGroups[rel];
if(_ffb instanceof List){
_ffb.each(function(_ffc){
_ffc.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _ffe=this._menuGroups[rel];
if(_ffe instanceof List){
_ffe.each(function(_fff){
_fff.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1000){
EditorPopupBinding.superclass.handleAction.call(this,_1000);
var _1001=_1000.target;
if(_1000.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1001.getProperty("cmd");
var gui=_1001.getProperty("gui");
var val=_1001.getProperty("val");
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
var _1005=this.bindingWindow.bindingMap.tinywindow;
var _1006=this.bindingWindow.bindingMap.codepresswindow;
if(_1005){
EditorBinding.registerComponent(this,_1005);
}else{
if(_1006){
EditorBinding.registerComponent(this,_1006);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_1007,_1008,_1009,theme){
this._editorBinding=_1007;
this._tinyEngine=_1008;
this._tinyInstance=_1009;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_100b,frame,_100d){
this._editorBinding=_100b;
this._codePressFrame=frame;
this._codePressEngine=_100d;
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
var _100f=this._editorBinding;
if(_100f!=null){
var self=this;
var _1011={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_100f.hasBookmark()){
_100f.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_100f.hasBookmark()){
_100f.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1011);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1011);
}
};
EditorClickButtonBinding.newInstance=function(_1013){
var _1014=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1013);
return UserInterface.registerBinding(_1014,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1015){
var _1016=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1015);
return UserInterface.registerBinding(_1016,EditorToolBarButtonBinding);
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
var _1017=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1017);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_1018,_1019,_101a,theme){
this._editorBinding=_1018;
this._tinyEngine=_1019;
this._tinyInstance=_101a;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_101c){
EditorSelectorBinding.superclass.handleAction.call(this,_101c);
switch(_101c.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_101c);
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
EditorMenuItemBinding.newInstance=function(_101f){
var _1020=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_101f);
return UserInterface.registerBinding(_1020,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1021){
var i=0,_1023,_1024=[],split=_1021.split(" ");
while((_1023=split[i++])!=null){
if(_1023.length>=3&&_1023.substring(0,3)=="mce"){
continue;
}else{
if(_1023.length>=14&&_1023.substring(0,14)=="compositemedia"){
continue;
}
}
_1024.push(_1023);
}
return _1024.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1026){
var _1027=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1026);
if(soap instanceof SOAPFault){
}else{
_1027=soap.XhtmlFragment;
if(!_1027){
_1027="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1027;
};
VisualEditorBinding.getTinyContent=function(_1029,_102a){
var _102b=null;
if(_1029==null||_1029==""){
_1029=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_1029);
if(soap instanceof SOAPFault){
var _102d=soap;
var _102e={handleDialogResponse:function(){
_102a.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_102e,_102d);
}else{
_102b=soap.XhtmlFragment;
if(_102b==null){
_102b=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _102b;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _1031=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1033=new List(doc.documentElement.childNodes);
var _1034=new List();
_1033.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_1034.add(child);
}
});
var _1036=_1034.get(index);
if(_1036==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_1036.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_1036.hasChildNodes()){
frag.appendChild(_1036.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_1031=DOMSerializer.serialize(doc.documentElement);
_1031=_1031.substring(_1031.indexOf(">")+1,_1031.length);
_1031=_1031.substring(0,_1031.lastIndexOf("<"));
}
}
}
if(_1031==null){
_1031=new String("");
}
return _1031;
};
VisualEditorBinding.isImage=function(_1038){
result=_1038&&_1038.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_1039){
return VisualEditorBinding.isImage(_1039)&&!VisualEditorBinding.isReservedElement(_1039);
};
VisualEditorBinding.isReservedElement=function(_103a){
if(VisualEditorBinding.isFunctionElement(_103a)){
return true;
}
if(VisualEditorBinding.isFieldElement(_103a)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_103a)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_103b){
return VisualEditorBinding.isImage(_103b)&&CSSUtil.hasClassName(_103b,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_103c){
return VisualEditorBinding.isImage(_103c)&&CSSUtil.hasClassName(_103c,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_103d){
return VisualEditorBinding.isImage(_103d)&&CSSUtil.hasClassName(_103d,VisualEditorBinding.HTML_CLASSNAME);
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
var _103e=this.getProperty("embedablefieldstypenames");
if(_103e!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_103e);
}
var _103f=this.getProperty("formattingconfiguration");
if(_103f!=null){
this._url+="?config="+_103f;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1040,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1040,arg);
var _1042=this.getContentWindow().bindingMap.tinywindow;
var _1043=_1042.getContentWindow();
switch(_1040){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1043){
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
this.initializeEditorComponents(_1042);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1044){
_1044.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1045){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1045);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_1048){
var _1049=_1048;
if(!this._isNormalizedDocument(_1048)){
_1049=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_1048);
}
return _1049;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_104a){
var _104b=false;
var doc=XMLParser.parse(_104a,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_104b=true;
}
}
if(Client.isWebKit){
if(_104a.indexOf("<html")!==0){
_104b=false;
}
}
return _104b;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1050=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1050){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1050=true;
}
return _1050;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1052=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1052);
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
VisualEditorBinding.prototype.setResult=function(_1054){
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
VisualEditorPopupBinding.prototype.configure=function(_1055,_1056,_1057){
var _1058=this.editorBinding.hasSelection();
this.tinyInstance=_1055;
this.tinyEngine=_1056;
this.tinyElement=_1057;
this.hasSelection=_1058;
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
var _105c=false;
if(this.hasSelection){
_105c=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_105c=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_105c=true;
}
}
}
}
if(_105c){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _105d=this.getMenuItemForCommand("compositeInsertLink");
var _105e=this.getMenuItemForCommand("unlink");
var _105f=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1060=this.editorBinding.getButtonForCommand("unlink");
_105e.setDisabled(_1060.isDisabled);
if(_105e.isDisabled){
_105d.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_105d.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1061=this.editorBinding.embedableFieldConfiguration;
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
if(_1061){
var _1064=_1061.getGroupNames();
if(_1064.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1064.each(function(_1068){
var _1069=_1061.getFieldNames(_1068);
_1069.each(function(_106a){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_106a);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1068+":"+_106a);
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
var _106c=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _106d=null;
var _106e=null;
if(_106c){
if(_106c.nodeName=="TD"){
_106d=_106c.getAttribute("colspan");
_106e=_106c.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_106d=="1"&&_106e=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_106c){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_106f){
var _1070=VisualEditorFormattingConfiguration._configurations;
if(!_1070.has(_106f)){
_1070.set(_106f,new VisualEditorFormattingConfiguration());
}
return _1070.get(_106f);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1072){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1073){
var _1074=null;
var _1075=VisualEditorFieldGroupConfiguration._configurations;
if(!_1075.has(_1073)){
_1075.set(_1073,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1073)));
}
return _1075.get(_1073);
};
function VisualEditorFieldGroupConfiguration(_1076){
var _1077=new Map();
new List(_1076).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1077.set(group.GroupName,map);
});
this._groups=_1077;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_107b){
return this._groups.get(_107b).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_107c,_107d){
return this._groups.get(_107c).get(_107d).xhtml;
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
var _107f=this.getDescendantElementsByLocalName("textarea");
while(_107f.hasNext()){
var _1080=_107f.getNext();
if(_1080.getAttribute("selected")=="true"){
this._startContent=_1080.value;
this._textareaname=_1080.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1082=this.getContentWindow().bindingMap.templatetree;
_1082.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1083){
var _1084=_1082.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1084.textareaname);
_1083.consume();
}});
_1082.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1085){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1086=this.getContentWindow().bindingMap.toolsplitter;
_1086.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1087=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1087.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1087);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1088){
this._textareas=new Map();
while(_1088.hasNext()){
var _1089=_1088.getNext();
var _108a=_1089.getAttribute("placeholderid");
this._textareas.set(_108a,{placeholderid:_108a,placeholdername:_1089.getAttribute("placeholdername"),placeholdermarkup:_1089.value,textareaelement:_1089,isSelected:_1089.getAttribute("selected")=="true"});
}
var _108b=new Map();
this._textareas.each(function(name,_108d){
var _108e=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_108e.setLabel(_108d.placeholdername);
_108e.setImage("${icon:placeholder}");
_108e.setProperty("placeholder",true);
_108e.textareaname=name;
_108b.set(_108d.placeholdername,_108e);
if(_108d.isSelected){
selected=_108e;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _108f=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_108f.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1090=this.getContentWindow().bindingMap.templatetree;
var _1091=_1090.add(TreeNodeBinding.newInstance(_1090.bindingDocument));
_1091.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1091.setImage("${icon:warning}");
_1091.attach();
var _1092=this.getContentWindow().bindingMap.statusbar;
_1092.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1094=this._textareas.get(name);
var _1095=_1094.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1095));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1096){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1096;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1097=this.getContentWindow().bindingMap.statusbar;
_1097.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1096);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _109a="";
if(this._heads.has(this._textareaname)){
_109a=this._heads.get(this._textareaname);
if(_109a==null){
_109a=new String("");
}
}
return _109a;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_109c){
_109c.textareaelement.value=_109c.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_109d,_109e){
var _109f=_109d.getElementsByTagName("div").item(0);
var _10a0=_109e.getElementsByTagName("div").item(0);
var _10a1=new List(_109f.getElementsByTagName("textarea"));
var _10a2=new List(_10a0.getElementsByTagName("textarea"));
var _10a3=false;
if(_10a1.getLength()!=_10a2.getLength()){
_10a3=true;
}else{
var index=0;
_10a1.each(function(_10a5,index){
var _10a7=_10a2.get(index);
var newid=_10a5.getAttribute("placeholderid");
var oldid=_10a7.getAttribute("placeholderid");
var _10aa=_10a5.getAttribute("placeholdername");
var _10ab=_10a7.getAttribute("placeholdername");
if(newid!=oldid||_10aa!=_10ab){
_10a3=true;
}
return !_10a3;
});
}
if(_10a3){
var html=null;
if(_109f.innerHTML!=null){
html=_109f.innerHTML;
}else{
html=DOMSerializer.serialize(_109f);
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
var _10af=this.getDescendantBindingByLocalName("selector");
_10af.attach();
this._populateTemplateSelector();
var _10b0=this.getContentWindow().bindingMap.templateselector;
_10b0.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10b1=this.getDescendantBindingByLocalName("selector");
var _10b2=this.getContentWindow().bindingMap.templateselector;
_10b1.selections.each(function(_10b3){
_10b3.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10b2.populateFromList(_10b1.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10b4=this.getDescendantBindingByLocalName("selector");
var _10b5=this.getContentWindow().bindingMap.templateselector;
_10b4.selectByValue(_10b5.getValue());
_10b4.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10b6){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10bb,_10bc){
var _10bd=_10bc;
if(old.has(_10bb)){
_10bd=old.get(_10bb).placeholdermarkup;
}
return _10bd;
}
while(_10b6.hasNext()){
var _10be=_10b6.getNext();
var _10bf=_10be.getAttribute("placeholderid");
this._textareas.set(_10bf,{placeholderid:_10bf,placeholdername:_10be.getAttribute("placeholdername"),placeholdermarkup:compute(_10bf,_10be.value),textareaelement:_10be,isSelected:_10be.getAttribute("selected")=="true"});
}
var _10c0=null;
var _10c1=this.getContentWindow().bindingMap.templatetree;
var _10c2=new Map();
this._textareas.each(function(name,_10c4){
var _10c5=_10c1.add(TreeNodeBinding.newInstance(_10c1.bindingDocument));
_10c5.setLabel(_10c4.placeholdername);
_10c5.setImage("${icon:placeholder}");
_10c5.setProperty("placeholder",true);
_10c5.textareaname=name;
_10c2.set(_10c4.placeholdername,_10c5);
if(_10c4.isSelected){
_10c0=_10c5;
}
});
_10c1.attachRecursive();
if(_10c0!=null){
var _10c6=true;
if(this._oldtextareas.hasEntries()){
_10c6=false;
var map=new Map();
this._textareas.each(function(id,_10c9){
map.set(_10c9.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10c6=true;
}
}
if(_10c6){
var _10ca=this._textareas.get(_10c0.textareaname);
this._textareaname=_10c0.textareaname;
this._placeholdername=_10ca.placeholdername;
this._setContentFromPlaceHolder(_10c0.textareaname);
_10c0.focus();
}else{
var _10cb=_10c2.get(this._placeholdername);
this._textareaname=_10cb.textareaname;
_10cb.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10cc,_10cd){
var _10ce=_10cc.getElementsByTagName("ui:selector").item(0);
var _10cf=_10cd.getElementsByTagName("ui:selector").item(0);
var _10d0=false;
if(_10ce!=null&&_10cf!=null){
var _10d1=new List(_10ce.getElementsByTagName("ui:selection"));
var _10d2=new List(_10cf.getElementsByTagName("ui:selection"));
if(_10d1.getLength()!=_10d2.getLength()){
_10d0=true;
}else{
_10d1.each(function(_10d3,index){
var _10d5=_10d3.getAttribute("value");
var _10d6=_10d2.get(index).getAttribute("value");
if(_10d5!=_10d6){
_10d0=true;
}
return !_10d0;
});
}
}
if(_10d0){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10ce);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10cc,_10cd);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10d8,frame,_10da){
this._editorBinding=_10d8;
this._codePressFrame=frame;
this._codePressEngine=_10da;
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
var _10e0=this.getProperty("validate");
if(_10e0==true){
this._hasStrictValidation=true;
}
var _10e1=this.getProperty("validator");
if(_10e1!=null){
this._validator=_10e1;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10e2,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10e2,arg);
switch(_10e2){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10e4=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10e4!=null){
var _10e5=_10e4.getContentWindow();
if(arg.broadcastWindow==_10e5){
this._codemirrorWindow=_10e5;
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
this.initializeEditorComponents(_10e4);
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
this.unsubscribe(_10e2);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10e9){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10e9);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10ea){
if(_10ea!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10ea;
EditorBinding.isActive=_10ea;
var _10eb=this.getContentWindow().standardEventHandler;
if(_10ea){
_10eb.enableNativeKeys(true);
}else{
_10eb.disableNativeKeys();
}
var _10ec=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10ec!=null){
if(_10ea){
_10ec.enable();
}else{
_10ec.disable();
}
}
if(_10ea){
this.focus();
var _10ed=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10f1=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10f1;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10f2){
_10f2.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10f4){
if(!this._isFinalized){
if(_10f4!=this._startContent){
this._startContent=_10f4;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10f4);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10f5=this.getContentWindow().bindingMap.editorpage.getContent();
if(_10f5!=null){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10f5=_10f5.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
break;
}
}
return _10f5?_10f5:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10f6){
if(this._pageBinding!=null){
this._pageBinding.cover(_10f6);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10f7){
if(_10f7!=null&&this.shadowTree.dotnetinput!=null){
var value=_10f7.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10f9=true;
var _10fa=this.getContent();
if(this._validator!=null){
_10f9=Validator.validateInformed(_10fa,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10f9=XMLParser.isWellFormedDocument(_10fa,true);
if(_10f9==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10f9=this._isValidHTML(_10fa);
break;
}
}
break;
}
}
return _10f9;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10fc=true;
var doc=XMLParser.parse(xml);
var _10fe=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10fe.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10fe.add("NamespaceURI");
}
var head=null,body=null;
var _1102=new List(root.childNodes);
while(_1102.hasNext()){
var child=_1102.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10fe.add("MultipleHead");
}
if(body!=null){
_10fe.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10fe.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10fe.add("MissingHead");
}
if(body==null){
_10fe.add("MissingBody");
}
}
if(_10fe.hasEntries()){
_10fc=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10fe.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10fe.getFirst()));
}
}
return _10fc;
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
var _1104=null;
var page=this._pageBinding;
if(page!=null){
_1104=page.getCheckSum();
}
return _1104;
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
ThrobberBinding.prototype.handleBroadcast=function(_1106,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1106,arg);
switch(_1106){
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
ProgressBarBinding.notch=function(_1109){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1109);
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
ProgressBarBinding.prototype.notch=function(_110b){
_110b=_110b?_110b:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_110b);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_110d,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_110d,arg);
switch(_110d){
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
StartMenuItemBinding.prototype.setChecked=function(_110f,_1110){
StartMenuItemBinding.superclass.setChecked.call(this,_110f,_1110);
if(!_1110){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1111){
var _1112=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1111);
UserInterface.registerBinding(_1112,StartMenuItemBinding);
return UserInterface.getBinding(_1112);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1115,_1116){
var _1117=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1116,true)==true){
if(_1115!="*"){
_1115=KeySetBinding._sanitizeKeyModifiers(_1115);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1117[doc]){
_1117[doc]={};
}
if(!_1117[doc][code]){
_1117[doc][code]={};
}
_1117[doc][code][_1115]=_1116;
}
};
KeySetBinding.handleKey=function(doc,e){
var _111b=false;
var code=e.keyCode;
var _111d=KeySetBinding.keyEventHandlers;
if(_111d[doc]&&_111d[doc][code]){
var _111e="[default]";
_111e+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_111e+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _111f=_111d[doc][code][_111e];
if(_111f==null){
_111f=_111d[doc][code]["*"];
}
if(_111f!=null){
_111f.handleKeyEvent(e);
_111b=true;
}
}
return _111b;
};
KeySetBinding._sanitizeKeyModifiers=function(_1120){
var _1121="[default]";
var mods={};
if(_1120){
new List(_1120.split(" ")).each(function(_1123){
mods[_1123]=true;
});
function check(_1124){
if(mods[_1124]){
_1121+=" "+_1124;
}
}
check("shift");
check("control");
}
return _1121;
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
var _1128=key.getAttribute("oncommand");
var _1129=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1129){
DOMEvents.preventDefault(e);
}
var _112b=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1128,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_112c){
if(_112c instanceof CursorBinding){
_112c.setOpacity(0);
_112c.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_112d){
_112c.setOpacity(Math.sin(_112d*Math.PI/180));
},onstop:function(){
_112c.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_112e){
if(_112e instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_112f){
_112e.setOpacity(Math.cos(_112f*Math.PI/180));
},onstop:function(){
_112e.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1130,_1131,_1132){
if(_1130 instanceof CursorBinding){
_1132.x-=16;
_1132.y-=16;
new Animation({modifier:3,onstep:function(_1133){
var tal=Math.sin(_1133*Math.PI/180);
_1130.setPosition(new Point(((1-tal)*_1131.x)+((0+tal)*_1132.x),((1-tal)*_1131.y)+((0+tal)*_1132.y)));
},onstop:function(){
CursorBinding.fadeOut(_1130);
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
CursorBinding.prototype.setOpacity=function(_1139){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_1139);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1139*100)+")";
}
this._opacity=_1139;
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
function setOpacity(_113c){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_113c);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_113c*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_113d){
if(Binding.exists(cover)){
setOpacity(Math.cos(_113d*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_113f){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_113f);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_113f*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1140){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1140*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1142){
if(_1142!=this._isBusy){
if(_1142){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1142;
}
};
CoverBinding.prototype.setTransparent=function(_1143){
if(_1143!=this._isTransparent){
if(_1143){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1143;
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
CoverBinding.prototype.setHeight=function(_1145){
if(_1145>=0){
this.bindingElement.style.height=new String(_1145+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1146){
var _1147=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1146);
return UserInterface.registerBinding(_1147,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1149=UncoverBinding._bindingInstance;
if(Binding.exists(_1149)){
_1149.setPosition(pos);
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
TheatreBinding.prototype.play=function(_114d){
this._isFading=_114d==true;
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
var _114e=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_114e.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_114e.clearRect(0,0,300,150);
_114e.fillRect(0,0,300,150);
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
var _1150=this._canvas.getContext("2d");
_1150.clearRect(0,0,300,150);
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
var _1151=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1151);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1152=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1152){
this._startcontent=_1152.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1153){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1153);
switch(_1153.type){
case WindowBinding.ACTION_ONLOAD:
if(_1153.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1153.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1153);
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
var _1157=this._transformer.transformToString(doc);
this._inject(_1157);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_115a){
this.getContentDocument().body.innerHTML=_115a;
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
var _1162=list.getNext();
var id=_1162.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1162);
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
var _116c=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_116c.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_116c.appendChild(att);
}
elm.appendChild(_116c);
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
var _1176=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1176){
doc=XMLParser.parse(_1176);
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
var _117a=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_117a;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_117b,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_117b,arg);
switch(_117b){
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
var _117e=new List();
list.each(function(lang){
_117e.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_117e);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1182){
switch(_1182){
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
var _1185=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1185,root);
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
var _1186=this.getProperty("status");
if(_1186!=null){
switch(_1186){
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
UserInterfaceMapping.prototype.merge=function(_1189){
for(var _118a in _1189.map){
this.map[_118a]=_1189.getBindingImplementation(_118a);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_118b){
var _118c=null;
var name=_118b.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_118c=this.map[name];
}
return _118c;
};
var UserInterface=new function(){
var _118f=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1190=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_118f,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1191=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1193,impl){
var _1195=null;
if(!this.hasBinding(_1193)){
var _1196=DOMUtil.getParentWindow(_1193);
if(DOMUtil.getLocalName(_1193)!="bindingmapping"){
if(!impl&&_1193.getAttribute("binding")!=null){
var _1197=_1193.getAttribute("binding");
impl=_1196[_1197];
if(impl==null){
throw "No such binding in scope: "+_1197;
}
}
if(!impl){
var _1198=_1196.DocumentManager;
if(_1198){
var _1199=_1198.customUserInterfaceMapping;
if(_1199){
impl=_1199.getBindingImplementation(_1193);
}
}
}
if(!impl){
impl=_1190.getBindingImplementation(_1193);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1195=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1195){
var key=KeyMaster.getUniqueKey();
_1193.setAttribute("key",key);
_1195.key=key;
if(!_1193.id){
_1193.id=key;
}
keys[key]={element:_1193,binding:_1195};
_1195.onBindingRegister();
}
}
}
return _1195;
};
this.unRegisterBinding=function(_119b){
terminate(_119b);
};
function terminate(_119c){
if(Binding.exists(_119c)==true){
var key=_119c.key;
Binding.destroy(_119c);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_119c=null;
}else{
_1191.error("URGH: "+key);
}
}
}
}
this.getElement=function(_119e){
var _119f=null;
if(keys[_119e.key]){
_119f=keys[_119e.key].element;
}
return _119f;
};
this.getBinding=function(_11a0){
var _11a1=null;
if(_11a0&&_11a0.nodeType==Node.ELEMENT_NODE){
try{
var key=_11a0.getAttribute("key");
if(key&&keys[key]){
_11a1=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_11a0);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11a1;
};
this.getBindingByKey=function(key){
var _11a4=null;
if(keys[key]){
_11a4=keys[key].binding;
}
return _11a4;
};
this.hasBinding=function(_11a5){
return this.getBinding(_11a5)!=null;
};
this.isBindingVisible=function(_11a6){
var _11a7=Application.isOperational;
if(_11a7==true){
var _11a8=new Crawler();
_11a8.type=NodeCrawler.TYPE_ASCENDING;
_11a8.id="visibilitycrawler";
_11a8.addFilter(function(_11a9){
var b=UserInterface.getBinding(_11a9);
var res=0;
if(!b.isVisible){
_11a7=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11a8.crawl(_11a6.bindingElement);
_11a8.dispose();
}
return _11a7;
};
var _11ac=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11ac={};
for(var key in keys){
_11ac[key]=true;
}
};
this.getPoint=function(){
var _11b0=null;
if(_11ac){
_11b0=new List();
for(var key in keys){
if(!_11ac[key]){
_11b0.add(key);
}
}
}
return _11b0;
};
this.clearPoint=function(){
_11ac=null;
};
this.trackUndisposedBindings=function(){
var _11b2=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11b2){
_11b2="Bindings illdisposed: ";
}
_11b2+=entry.binding+" ";
}
}
if(_11b2!=null){
_1191.error(_11b2);
}
};
this.autoTrackDisposedBindings=function(_11b5){
if(_11b5){
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
SOAPRequest.newInstance=function(_11b6,_11b7){
var _11b8=_11b6+"/"+_11b7;
var _11b9=new SOAPRequest(_11b8);
var _11ba=SOAPRequest.resolver;
_11b9.document=Templates.getTemplateDocument("soapenvelope.xml");
_11b9.envelope=_11ba.resolve("soap:Envelope",_11b9.document);
_11b9.header=_11ba.resolve("soap:Header",_11b9.envelope);
_11b9.body=_11ba.resolve("soap:Body",_11b9.envelope);
return _11b9;
};
SOAPRequest._parseResponse=function(_11bb){
var _11bc=null;
var _11bd=false;
var doc=_11bb.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11bc=SOAPRequestResponse.newInstance(_11bb.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11bb.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11bd=true;
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
var text=_11bb.responseText;
if(_11bb.status==503||text.indexOf("id=\"offline\"")>-1){
_11bd=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11bb.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11bb.responseText);
}
}
}
}
if(_11bd==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11bc;
};
function SOAPRequest(_11c2){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11c2;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11c4=DOMUtil.getXMLHTTPRequest();
var _11c5=null;
_11c4.open("post",url,false);
_11c4.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11c4.setRequestHeader("SOAPAction",this.action);
try{
_11c4.send(this.document);
_11c5=SOAPRequest._parseResponse(_11c4);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11c4=null;
return _11c5;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11c8){
var _11c9=DOMUtil.getXMLHTTPRequest();
_11c9.open("post",url,true);
_11c9.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11c9.setRequestHeader("SOAPAction",this.action);
_11c9.onreadystatechange=function(){
if(_11c9.readyState==4){
var _11ca=SOAPRequest._parseResponse(_11c9);
_11c8(_11ca);
_11c9=null;
}
};
_11c9.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11cb in this){
this[_11cb]=null;
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
var _11cd=null;
if(doc&&doc.documentElement){
_11cd=new SOAPRequestResponse();
var _11ce=SOAPRequestResponse.resolver;
_11cd.document=doc;
_11cd.envelope=_11ce.resolve("soap:Envelope",_11cd.document);
_11cd.header=_11ce.resolve("soap:Header",_11cd.envelope);
_11cd.body=_11ce.resolve("soap:Body",_11cd.envelope);
var fault=_11ce.resolve("soap:Fault",_11cd.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11cd.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11ce.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11ce.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11cd;
};
function SOAPFault(_11d0,_11d1,_11d2){
this._operationName=_11d0;
this._operationAddress=_11d1;
this._faultString=_11d2;
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
SOAPFault.newInstance=function(_11d3,fault){
return new SOAPFault(_11d3.name,_11d3.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11d6){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11d6;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11d8=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11d8.body,this._operation);
var _11da=this._wsdl.getSchema();
var _11db=_11da.lookup(this._operation);
var _11dc=_11db.getListedDefinitions();
while(_11dc.hasNext()){
var def=_11dc.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11d8;
};
SOAPEncoder.prototype._resolve=function(_11e0,_11e1,value){
var _11e3=this._wsdl.getSchema();
if(_11e1.isSimpleValue){
this._appendText(_11e0,value,_11e1.type=="string");
}else{
var _11e4=_11e3.lookup(_11e1.type);
if(_11e4 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11e4.getListedDefinitions();
if(_11e4.isArray){
var _11e6=new List(value);
var def=defs.getNext();
while(_11e6.hasNext()){
var elm=this._appendElement(_11e0,def.name);
var val=_11e6.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11e0,def.name);
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
SOAPEncoder.prototype._appendText=function(_11ed,value,_11ef){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11f2=false;
var i=0,c;
while(c=chars[i++]){
var _11f5=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11f5=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11f5=false;
}
break;
}
if(!_11f5){
safe+=c;
}else{
_11f2=true;
}
}
if(_11f2){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11ed.appendChild(_11ed.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11f8){
this._wsdl=wsdl;
this._operation=_11f8;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11fd){
var _11fe=null;
var _11ff=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1201=this.resolve(id,_11fd.body);
var _1202=_11ff.lookup(id);
var _1203=_1202.getListedDefinitions();
while(!_11fe&&_1203.hasNext()){
var def=_1203.getNext();
var elm=this.resolve(def.name,_1201);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11fe=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11fe.importNode!=Types.UNDEFINED){
_11fe.appendChild(_11fe.importNode(e,true));
}else{
_11fe.loadXML(DOMSerializer.serialize(e));
}
}else{
_11fe=this._compute(elm,def);
}
}
return _11fe;
};
SOAPDecoder.prototype._compute=function(_1207,_1208){
var _1209=null;
var _120a=this._wsdl.getSchema();
if(_1208.isSimpleValue){
_1209=this._getSimpleValue(_1207,_1208.type);
}else{
var _120b=_120a.lookup(_1208.type);
if(_120b instanceof SchemaSimpleType){
_1209=this._getSimpleValue(_1207,_120b.restrictionType);
}else{
var defs=_120b.getListedDefinitions();
if(_120b.isArray){
_1209=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1207);
while(elms.hasNext()){
var elm=elms.getNext();
_1209.push(this._compute(elm,def));
}
}else{
_1209={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1207);
if(elm){
_1209[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1209;
};
SOAPDecoder.prototype._getSimpleValue=function(_1210,type){
var _1212=null;
if(_1210.firstChild&&_1210.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1210.childNodes.length>1){
_1210.normalize();
}
_1212=_1210.firstChild.data;
switch(type){
case Schema.types.STRING:
_1212=_1212;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1212=Number(_1212);
break;
case Schema.types.BOOLEAN:
_1212=_1212=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1212;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1213){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1213);
}
Schema.prototype._parseSchema=function(_1214){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1215={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1214);
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
_1215[rule.getAttribute("name")]=entry;
}
return _1215;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_121a){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_121a);
}
SchemaDefinition.prototype._parse=function(_121b){
var min=_121b.getAttribute("minOccurs");
var max=_121b.getAttribute("maxOccurs");
var type=_121b.getAttribute("type");
this.name=_121b.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1221=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1221;
}else{
var elm=_121b.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1223,_1224){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1223,_1224);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1225,_1226){
var els=_1225.resolveAll("s:complexType/s:sequence/s:element",_1226);
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
function SchemaComplexType(_1228,_1229){
this._definitions=new List();
this._parseListedDefinitions(_1228,_1229);
this.isArray=_1229.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_122a,_122b){
var els=_122a.resolveAll("s:sequence/s:element",_122b);
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
function SchemaSimpleType(_122e,_122f){
this.restrictionType=null;
this._parse(_122e,_122f);
}
SchemaSimpleType.prototype._parse=function(_1230,_1231){
var _1232=_1230.resolve("s:restriction",_1231);
if(_1232){
this.restrictionType=_1232.getAttribute("base").split(":")[1];
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
var _1235=null;
var _1236=DOMUtil.getXMLHTTPRequest();
_1236.open("get",url,false);
_1236.send(null);
if(_1236.responseXML){
_1235=_1236.responseXML.documentElement;
}else{
alert(_1236.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1235;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1237=new List();
var _1238=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1238.hasEntries()){
while(_1238.hasNext()){
var _1239=_1238.getNext();
var name=_1239.getAttribute("name");
_1237.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1237;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_123c,_123d,_123e){
this.name=name;
this.address=_123c;
this.encoder=_123d;
this.decoder=_123e;
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
var _1242=wsdl.getOperations();
_1242.each(function(_1243){
proxy[_1243.name]=WebServiceProxy.createProxyOperation(_1243);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1244,_1245){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1245){
var log=_1245 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1244.address+": "+_1244.name+"\n\n";
log+=DOMSerializer.serialize(_1245.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1247){
return function(){
var _1248=new List(arguments);
var _1249=null;
if(typeof (_1248.getLast())=="function"){
var _124a=_1248.extractLast();
var _124b=_1247.encoder.encode(_1248);
this._log(_1247,_124b);
var self=this;
var _124d=_124b.asyncInvoke(_1247.address,function(_124e){
self._log(_1247,_124e);
if(_124e){
if(_124e.fault){
_1249=SOAPFault.newInstance(_1247,_124e.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1249,_124b,_124e);
}
}else{
if(WebServiceProxy.isDOMResult){
_1249=_124e.document;
}else{
_1249=_1247.decoder.decode(_124e);
}
}
}
_124b.dispose();
_124a(_1249);
});
}else{
var _124b=_1247.encoder.encode(new List(arguments));
this._log(_1247,_124b);
var _124d=_124b.invoke(_1247.address);
this._log(_1247,_124d);
if(_124d){
if(_124d.fault){
_1249=SOAPFault.newInstance(_1247,_124d.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1249,_124b,_124d);
}
}else{
if(WebServiceProxy.isDOMResult){
_1249=_124d.document;
}else{
_1249=_1247.decoder.decode(_124d);
}
}
}
_124b.dispose();
return _1249;
}
};
};
WebServiceProxy.handleFault=function(_124f,_1250,_1251){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_124f,soapRequest:_1250,soapResponse:_1251});
}
catch(exception){
alert(_124f.getFaultString());
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
var _1252=SystemLogger.getLogger("MessageQueue");
var _1253=null;
var _1254=0;
var _1255=null;
var _1256=new Map();
var _1257=new Map();
var _1258=false;
var _1259=false;
var _125a=false;
var _125b=false;
var _125c={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1253=ConsoleMessageQueueService;
_1254=_1253.GetCurrentSequenceNumber("dummyparam!");
this.index=_1254;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1258){
if(!MessageQueue._actions.hasEntries()){
var _125d=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1259=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_125d;
_1259=false;
}
}
}
};
this._pokeserver=function(){
if(_1258==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1259);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_125a){
_125b=true;
}else{
_125a=true;
var self=this;
_1253.GetMessages(Application.CONSOLE_ID,this.index,function(_125f){
if(_125f!=null){
if(Types.isDefined(_125f.CurrentSequenceNumber)){
var _1260=_125f.CurrentSequenceNumber;
if(_1260<self.index){
_1252.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_1260);
}
self.index=_1260;
var _1261=new List(_125f.ConsoleActions);
if(_1261.hasEntries()){
self.evaluate(_1261);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1252.error("No sequencenumber in MessageQueue response!");
}
}
_125a=false;
if(_125b){
_125b=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_1262){
var _1263=new List();
if(_1262.hasEntries()){
_1262.each(function(_1264){
if(this._index[_1264.Id]!=true){
_1263.add(_1264);
}
this._index[_1264.Id]=true;
},this);
if(_1263.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1263);
}else{
this._actions=_1263;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1265){
var _1266="(No reason)";
if(_1265!=null){
_1266=_1265.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1266);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_126a){
if(_126a==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _126b=null;
if(this._actions.hasEntries()){
var _126c=this._actions.extractFirst();
_1254=_126c.SequenceNumber;
_1252.debug("MessageQueue action: "+_126c.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1254+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_126c.ActionType){
case "OpenView":
_126b=_126c.OpenViewParams;
if(_126b.ViewType=="ModalDialog"){
openDialogView(_126b);
}else{
_1255=_126b.ViewId;
openView(_126b);
}
break;
case "CloseView":
_126b=_126c.CloseViewParams;
_1255=_126b.ViewId;
closeView(_126b);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_126c.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_1256.countEntries()+"\n";
_1256.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1252.debug(debug);
if(!_1256.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_126c.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_126c.MessageBoxParams);
break;
case "OpenViewDefinition":
_126b=_126c.OpenViewDefinitionParams;
_1255=_126b.Handle;
openViewDefinition(_126b);
break;
case "LogEntry":
logEntry(_126c.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_126b=_126c.BroadcastMessageParams;
_1252.debug("Server says: EventBroadcaster.broadcast ( \""+_126b.Name+"\", "+_126b.Value+" )");
EventBroadcaster.broadcast(_126b.Name,_126b.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1256.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_126c.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_126c.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_126c.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_126b=_126c.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_126b.ViewId,entityToken:_126b.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_126b=_126c.OpenGenericViewParams;
openGenericView(_126b);
break;
case "OpenExternalView":
_126b=_126c.OpenExternalViewParams;
openExternalView(_126b);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_126c.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1259);
}
function logEntry(_126f){
var _1270=_126f.Level.toLowerCase();
SystemLogger.getLogger(_126f.SenderId)[_1270](_126f.Message);
}
function openView(_1271){
var list=paramsToList(_1271.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_1271.ViewId);
def.entityToken=_1271.EntityToken;
def.flowHandle=_1271.FlowHandle;
def.position=_125c[_1271.ViewType],def.label=_1271.Label;
def.image=_1271.Image;
def.toolTip=_1271.ToolTip;
def.argument={"url":_1271.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_1271.ViewId,entityToken:_1271.EntityToken,flowHandle:_1271.FlowHandle,position:_125c[_1271.ViewType],url:_1271.Url,label:_1271.Label,image:_1271.Image,toolTip:_1271.ToolTip}));
}
}
function openDialogView(_1274){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1274.ViewId,flowHandle:_1274.FlowHandle,position:Dialog.MODAL,url:_1274.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1275){
var _1276=_1275.DialogType.toLowerCase();
if(_1276=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_1275.Title+"\n"+_1275.Message);
}else{
Dialog[_1276](_1275.Title,_1275.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_1277){
var map={};
var _1279=false;
new List(_1277.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1279=true;
});
var proto=ViewDefinitions[_1277.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1277.ViewId;
}
def.argument=_1279?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_127e){
var def=ViewDefinition.clone("Composite.Management.GenericView",_127e.ViewId);
def.label=_127e.Label;
def.toolTip=_127e.ToolTip;
def.image=_127e.Image;
def.argument={"url":_127e.Url,"list":paramsToList(_127e.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_1280){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_1280.ViewId);
def.label=_1280.Label;
def.toolTip=_1280.ToolTip;
def.image=_1280.Image;
def.url=_1280.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_1282){
if(StageBinding.isViewOpen(_1282.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1282.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1283){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1283.ViewId,isSuccess:_1283.Succeeded});
}
this._lockSystem=function(_1284){
var _1285=top.bindingMap.offlinetheatre;
if(_1284){
_1285.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1285.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1258=_1284;
};
this.handleBroadcast=function(_1287,arg){
switch(_1287){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1255!=null&&arg==_1255){
_1255=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_1256.set(arg,true);
}else{
_1252.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1256.hasEntries()){
_1256.del(arg);
_1252.debug("Refreshed tree: "+arg+"\n("+_1256.countEntries()+" trees left!)");
if(!_1256.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1257.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1257.hasEntries()==true){
_1257.del(arg);
if(!_1257.hasEntries()){
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
function paramsToList(_1289){
var list=new List();
new List(_1289).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _128c=false;
var _128d=false;
var _128e=null;
var _128f=false;
var _1290=Client.qualifies();
var _1291="admin";
var _1292="123456";
this.fireOnLoad=function(){
if(_1290){
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
this.handleBroadcast=function(_1293){
switch(_1293){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1293);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1294=window.bindingMap.appwindow;
_1294.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1295){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1296){
if(_1295){
EventBroadcaster.subscribe(_1296,KickStart);
}else{
EventBroadcaster.unsubscribe(_1296,KickStart);
}
});
}
function kickStart(_1297){
switch(_1297){
case BroadcastMessages.AUDIO_INITIALIZED:
_128d=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_128c=true;
break;
}
if(_128c&&_128d){
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
DataManager.getDataBinding("username").setValue(_1291);
DataManager.getDataBinding("password").setValue(_1292);
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
this.doLogin=function(_129a,_129b){
var _129c=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _129d=false;
var _129e=LoginService.ValidateAndLogin(_129a,_129b);
if(_129e instanceof SOAPFault){
alert(_129e.getFaultString());
}else{
_129d=_129e;
}
if(_129d){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_129c){
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
var _129f=DataManager.getDataBinding("username");
var _12a0=DataManager.getDataBinding("password");
_129f.blur();
_12a0.blur();
_129f.setValue("");
_12a0.setValue("");
_129f.clean();
_12a0.clean();
_129f.focus();
document.getElementById("loginerror").style.display="block";
var _12a1={handleAction:function(_12a2){
document.getElementById("loginerror").style.display="none";
_12a2.target.removeActionListener(Binding.ACTION_DIRTY,_12a1);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12a1);
}
WindowManager.fireOnLoad(this);
if(!_1290){
UpdateManager.isEnabled=false;
}
};

