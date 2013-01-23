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
_68.handleBroadcast(_62,_63);
i++;
}
if(_67.hasEntries()){
_67.each(function(_69){
EventBroadcaster.unsubscribe(_62,_69);
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
var _6a=navigator.userAgent.toLowerCase();
var _6b=navigator.platform.toLowerCase();
var _6c=navigator.appName=="Microsoft Internet Explorer";
var _6d=!_6c&&typeof document.createTreeWalker!="undefined";
var _6e=_6d&&(_6a.indexOf("webrunner")>-1||_6a.indexOf("prism")>-1);
var _6f=history.pushState!=null;
this.isMozilla=_6d;
this.isFirefox=_6a.indexOf("firefox")>-1;
this.isWebKit=_6a.indexOf("webkit")>-1;
this.isExplorer=_6c;
this.isExplorer6=this.isExplorer&&(_6a.indexOf("msie 6.0")>-1||_6a.indexOf("msie 6.1")>-1);
this.isExplorer8=this.isExplorer&&window.XDomainRequest!=null;
this.isPrism=_6e;
this.isWindows=_6b.indexOf("win")>-1;
this.isVista=this.isWindows&&_6a.indexOf("windows nt 6")>-1;
var _70=this._getFlashVersion();
this.hasFlash=(_70&&_70>=9);
this.hasTransitions=_6f;
this.canvas=!!document.createElement("canvas").getContext;
this.hasSpellcheck=this.isFirefox||this.isExplorer&&document.documentElement.spellcheck;
return this;
}
_Client.prototype={isExplorer:false,isMozilla:false,isPrism:false,hasFlash:false,isWindows:false,isVista:false,hasTransitions:false,_getFlashVersion:function(){
var _71=null;
var _72=10;
try{
if(this.isMozilla==true){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _73=navigator.plugins["Shockwave Flash"];
if(_73){
var _74=_73.description;
if(_74!=null){
_71=_74.charAt(_74.indexOf(".")-1);
}
}
}
}else{
for(var i=2;i<=_72;i++){
try{
new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
_71=i;
}
catch(exception){
continue;
}
}
}
}
catch(exception){
}
return _71;
},qualifies:function(){
var _76=true;
var _77=false;
if(this.isMozilla&&!this.isWebKit){
_77=(document.documentElement.mozMatchesSelector===undefined);
}
if(window.opera!=null||_77||this.isExplorer&&!this.canvas){
_76=false;
}
return _76;
},fixUI:function(_78){
if(Client.isExplorer){
_78=_78.replace(/<ui:/g,"<").replace(/<\/ui:/g,"</");
}
_78=_78.replace(/(<(\w+)[^>]*)\/>/g,"$1></$2>");
return _78;
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
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_141){
var _142=null;
var _143=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_143=node.documentElement;
}
if(_143.xml!=null){
return _143.xml;
}else{
if(this._serializer!=null){
if(_141==true){
_143=_143.cloneNode(true);
_143=DOMFormatter.format(_143,DOMFormatter.INDENTED_TYPE_RESULT);
}
_142=this._serializer.serializeToString(_143);
}
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
if(document.createTreeWalker&&!Client.isExplorer){
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
_16a=_169.localName.replace("ui:","");
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
_190=_18f.createElement(_18e.replace("ui:",""));
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
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1af){
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
var _1fd=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_1fe){
if(_1fd==null){
_1fd={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_1ff){
_1fd[_1ff.Key]=_1ff.Value;
});
}
return _1fd[_1fe];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _200=new List();
var _201=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_201);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_203){
_200.add(new SystemNode(_203));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _200;
};
this.getChildNodes=function(node,_205){
var _206=new List();
var _207=null;
if(_205){
if(SearchTokens.hasToken(_205)){
_205=SearchTokens.getToken(_205);
}
_207=TreeService.GetElementsBySearchToken(node.getData(),_205);
}else{
_207=TreeService.GetElements(node.getData());
}
new List(_207).each(function(_208){
var _209=new SystemNode(_208);
if(_205){
_209.searchToken=_205;
}
_206.add(_209);
});
return _206;
};
this.getDescendantBranch=function(_20a){
var map=new Map();
var arg=[];
_20a.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _20e=TreeService.GetMultipleChildren(arg);
var _20f=new List(_20e);
while(_20f.hasNext()){
this._listNodesInMap(_20f.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_210,_211,_212){
var map=new Map();
var arg=[];
_212.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _216=TreeService.FindEntityToken(_210,_211,arg);
if(_216 instanceof SOAPFault){
_1fb.error(_216.getFaultString());
if(Application.isDeveloperMode){
alert(_216.getFaultString());
}
map=null;
}else{
var _217=new List(_216);
while(_217.hasNext()){
this._listNodesInMap(_217.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_218,map){
var list=new List();
var key=_218.ElementKey;
var _21c=new List(_218.ClientElements);
map.set(key,list);
while(_21c.hasNext()){
var _21d=_21c.getNext();
list.add(new SystemNode(_21d));
}
};
this.getChildNodesBySearchToken=function(node,_21f){
return this.getChildNodes(node,_21f);
};
this.getNamedRoots=function(key,_221){
var _222=new List();
var _223=null;
if(_221){
if(SearchTokens.hasToken(_221)){
_221=SearchTokens.getToken(_221);
}
_223=TreeService.GetNamedRootsBySearchToken(key,_221);
}else{
_223=TreeService.GetNamedRoots(key);
}
new List(_223).each(function(_224){
var node=new SystemNode(_224);
if(_221){
node.searchToken=_221;
}
_222.add(node);
});
return _222;
};
this.getNamedRootsBySearchToken=function(key,_227){
return this.getNamedRoots(key,_227);
};
function compileActionList(node,_229,_22a){
var _22b=_229.ClientElementActionGroupId;
if(_22b!=null){
var _22c=_22a.get(_22b).ClientElementActionGroupItems;
if(_22c&&_22c.length>0){
node.setActionList(new List(_22c));
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
new List(self._data.Actions).each(function(_232){
var _233=_232.ActionCategory.Name;
if(SystemAction.hasCategory(_233)){
var _234=new SystemAction(_232);
SystemAction.actionMap.set(_232.ActionKey,_234);
}else{
throw "No such action category: "+_233;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _235=null;
if(this.searchToken){
_235=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_235=System.getChildNodes(this);
}
return _235;
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
var _237=this._data.Piggybag;
if(_237==null){
_237="";
}
return _237;
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
var _239=null;
if(typeof this._data.ToolTip!="undefined"){
_239=this._data.ToolTip;
}
return _239;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_23b){
map[_23b.Key]=_23b.Value;
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
var _23f=SystemAction.actionMap.get(key);
var _240=true;
if(_23f.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_240=false;
}
}
if(_240){
var id=_23f.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_23f);
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
SystemAction.invoke=function(_243,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_243.logger.debug("Execute \""+_243.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_243.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_246,_247){
action=SystemAction.taggedActions.get(_246);
node=SystemNode.taggedNodes.get(_247);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_248){
return SystemAction.categories[_248]?true:false;
};
function SystemAction(_249){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_249;
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
var _24a=null;
if(this.isInFolder()){
_24a=this._data.ActionCategory.FolderName;
}
return _24a;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _24b=null;
if(typeof this._data.TagValue!="undefined"){
_24b=this._data.TagValue;
}
return _24b;
};
SystemAction.prototype.isChecked=function(){
var _24c=null;
if(this.isCheckBox()){
_24c=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _24c;
};
function _UpdateManager(){
var _24d=null;
if(!window.UpdateManager){
this._construct();
_24d=this;
}
return _24d;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_24e){
var root=document.documentElement;
var _250=root.namespaceURI;
if(_250==null){
_250=new String(root.getAttribute("xmlns"));
}
if(_250=="http://www.w3.org/1999/xhtml"){
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
var _251=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_251);
}else{
throw new TypeError();
}
}else{
var _252=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_252.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _254=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_254=true;
}
},this);
return _254;
},_setupForm:function(form){
var _257=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_257.isEnabled){
_257._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_258,type){
if(_258.addEventListener!=null){
_258.addEventListener(type,this,false);
}else{
var _25a=this;
_258.attachEvent("on"+type,function(){
_25a.handleEvent(window.event);
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
var _25f=UpdateAssistant.getUpdateZones(dom);
var _260=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_25f.forEach(function(_261,_262){
var _263=_260[_262];
this._crawl(_261,_263);
},this);
this._updates.forEach(function(_264,_265){
_264.update();
_264.dispose();
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
},_crawl:function(_267,_268,_269,id){
var _26b=true;
var _26c=_268.getAttribute("class");
if(_26c==null||_26c.indexOf(this.CLASSNAME_GONE)==-1){
if(_268.nodeType==Node.ELEMENT_NODE){
var _26d=_268.getAttribute("id");
if(_26d!=null){
_269=_267;
id=_26d;
}
}
if(_26b=this._check(_267,_268,_269,id)){
var _26e=_267.firstChild;
var _26f=_268.firstChild;
while(_26e!=null&&_26f!=null&&!this._replaced[id]){
switch(_26e.nodeType){
case Node.TEXT_NODE:
_26b=this._check(_26e,_26f,_269,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_26b=this._crawl(_26e,_26f,_269,id);
break;
}
if(this._replaced[id]){
_26b=false;
}else{
_26e=_26e.nextSibling;
_26f=_26f.nextSibling;
}
}
}
}
return _26b;
},_check:function(_270,_271,_272,id){
var _274=true;
var _275=null;
var _276=false;
var _277=false;
if((_270!=null&&_271==null)||(_270==null&&_271!=null)){
_274=false;
}else{
if(_274=_270.nodeType==_271.nodeType){
switch(_271.nodeType){
case Node.ELEMENT_NODE:
if(_270.namespaceURI!=_271.namespaceURI||_270.nodeName!=_271.nodeName){
_274=false;
}else{
if(_274=(_270.nodeName==_271.nodeName)){
var _278=_271.getAttribute("id");
var _279=_270.getAttribute("id");
if(_278!=null&&_279!=null){
if(_278!=_279){
_274=false;
}else{
if((_275=this._getPlugin(_270,_271))!=null){
if(_275.updateElement(_270,_271)){
_277=true;
_274=false;
}
}
}
}
if(_274){
if(_274=this._checkAttributes(_270,_271)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_270)&&this._hasSoftChildren(_271)){
if(this._validateSoftChildren(_270,_271)){
this._updateSoftChildren(_270,_271);
_276=true;
}
_274=false;
}else{
_274=_270.childNodes.length==_271.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_270.data.trim()!=_271.data.trim()){
_274=false;
}
break;
}
}
}
if(_274==false&&!_276&&!_277){
if(id!=null&&_272!=null){
this.addUpdate(new ReplaceUpdate(id,_272));
}
}
return _274;
},_checkAttributes:function(_27a,_27b){
var _27c=true;
var _27d=false;
var _27e=_27a.attributes;
var _27f=_27b.attributes;
if(_27e.length!=_27f.length){
_27d=true;
}else{
_27d=!Array.every(_27e,function(att1,i){
var att2=_27f.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_27d){
var _283=_27a.getAttribute("id");
var _284=_27b.getAttribute("id");
if(this.hasSoftAttributes&&_283!=null&&_283==_284){
this.addUpdate(new AttributesUpdate(_284,_27a,_27b));
}else{
_27c=false;
}
}
return _27c;
},_hasSoftChildren:function(_285){
var _286=true;
if(_285.hasChildNodes()){
_286=Array.every(_285.childNodes,function(node){
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
return _286;
},_validateSoftChildren:function(_289,_28a){
var _28b=true;
var _28c=-1;
var _28d=-1;
var _28e=-1;
var news=this._toMap(_289.childNodes,true);
var olds=this._toMap(_28a.childNodes,true);
for(var id in olds){
if(_28b){
var _292=olds[id];
_28b=_292>=_28c;
if(news[id]!=null){
_28e=news[id];
_28b=_28e>=_28d;
}
}
_28c=_292;
if(_28e>-1){
_28d=_28e;
}
}
return _28b;
},_updateSoftChildren:function(_293,_294){
var news=this._toMap(_293.childNodes);
var olds=this._toMap(_294.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _298=null;
for(id in news){
if(olds[id]==null){
var _299=news[id];
if(_298==null){
var _29a=_294.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29a,_299,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_298,_299,false));
}
}
_298=id;
}
},addUpdate:function(_29b){
this._updates.push(_29b);
if(_29b instanceof ReplaceUpdate){
this._replaced[_29b.id]=true;
}
},_getPlugin:function(_29c,_29d){
var _29e=null;
this.plugins.every(function(_29f){
if(_29f.handleElement(_29c,_29d)){
_29e=_29f;
}
return _29e==null;
});
return _29e;
},_toMap:function(_2a0,_2a1){
var _2a2={};
Array.forEach(_2a0,function(node,_2a4){
if(node.nodeType==Node.ELEMENT_NODE){
_2a2[node.getAttribute("id")]=_2a1?_2a4:node;
}
});
return _2a2;
},_getPost:function(form){
var _2a6=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2a8){
if(_2a8.name==null||_2a8.name==""){
return;
}
var name=_2a8.name;
var _2aa=encodeURIComponent(_2a8.value);
switch(_2a8.type){
case "button":
case "submit":
var _2ab=UpdateAssistant.getActiveElement();
if(_2a8==_2ab&&name!=""){
_2a6+=name+"="+_2aa+"&";
}
break;
case "radio":
if(_2a8.checked){
_2a6+=name+"="+_2aa+"&";
}
break;
case "checkbox":
if(_2a8.checked){
if(_2a8.name==last){
if(_2a6.lastIndexOf("&")==_2a6.length-1){
_2a6=_2a6.substr(0,_2a6.length-1);
}
_2a6+=","+_2aa;
}else{
_2a6+=name+"="+_2a8.value;
}
last=name;
_2a6+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2a6+=name+"="+_2aa+"&";
break;
}
});
}
return _2a6.substr(0,_2a6.length-1);
},_postRequest:function(form){
var _2ad=form.method!=""?form.method:"get";
var _2ae=form.action!=""?form.action:window.location.toString();
var _2af=this._getPost(form);
if(_2ad=="get"){
if(_2ae.indexOf("?")>-1){
_2ae=_2ae+"&"+_2af;
}else{
_2ae+"?"+_2af;
}
}
var _2b0=this;
var _2b1=UpdateAssistant.getXMLHttpRequest(_2ad,_2ae,this);
if(_2ad=="post"){
_2b1.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2b1.send(_2ad=="post"?_2af:null);
},_fixdotnet:function(dom,id){
var _2b4=document.getElementById(id);
if(_2b4!=null){
var _2b5=UpdateAssistant.getElementById(dom,id);
if(_2b5!=null){
var _2b6=_2b5.getAttribute("value");
if(_2b6!==_2b4.value){
_2b4.value=_2b6;
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
},report:function(_2b9){
this.summary+=_2b9+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2ba=null;
if(!window.UpdateAssistant){
this._construct();
_2ba=this;
}
return _2ba;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2bb,fun){
var _2bd=true;
var len=_2bb.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2bf=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2bb[i]!="undefined"){
if(!fun.call(_2bf,_2bb[i],i,_2bb)){
_2bd=false;
break;
}
}
}
}
return _2bd;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2c2=arguments[1];
return Array.every(this,fun,_2c2);
};
}
if(!Array.forEach){
Array.forEach=function(_2c3,fun){
var len=_2c3.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c6=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c3[i]!="undefined"){
fun.call(_2c6,_2c3[i],i,_2c3);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2c9=arguments[1];
Array.forEach(this,fun,_2c9);
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
},getXMLHttpRequest:function(_2cb,_2cc,_2cd){
var _2ce=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2ce!=null){
_2ce.open(_2cb,_2cc,(_2cd!=null?true:false));
if(_2cd!=null){
function action(){
if(_2ce.readyState==4){
var text=_2ce.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2cd.handleResponse(dom);
}
}
}
if(_2ce.addEventListener!=null){
_2ce.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2ce.onreadystatechange=action;
}
}
}
return _2ce;
},dispatchEvent:function(_2d1,name){
var _2d3=true;
if(_2d1.fireEvent!=null){
_2d3=_2d1.fireEvent("on"+name);
}else{
var _2d4=document.createEvent("UIEvents");
_2d4.initEvent(name,true,true);
_2d3=_2d1.dispatchEvent(_2d4);
}
return _2d3;
},getUpdateZones:function(dom){
var _2d6="//*[@id and contains(@class,'updatezone')]";
var _2d7=[];
var _2d8=null;
var _2d9=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d8=dom.evaluate(_2d6,dom,null,type,null);
while((_2d9=_2d8.iterateNext())!=null){
_2d7.push(_2d9);
}
}else{
_2d8=dom.documentElement.selectNodes(_2d6);
Array.forEach(_2d8,function(_2db){
_2d7.push(_2db);
});
}
return _2d7;
},getElementById:function(dom,id){
var _2de="//*[@id='"+id+"']";
var _2df=null;
var _2e0=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2df=dom.evaluate(_2de,dom,null,type,null);
_2e0=_2df.singleNodeValue;
}else{
_2e0=dom.documentElement.selectNodes(_2de)[0];
}
return _2e0;
},_getIds:function(dom){
var _2e3="//*[@id]";
var _2e4=null;
var _2e5=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e4=dom.evaluate(_2e3,dom,null,type,null);
while((element=_2e4.iterateNext())!=null){
_2e5.push(element.getAttribute("id"));
}
}else{
_2e4=dom.documentElement.selectNodes(_2e3);
Array.forEach(_2e4,function(_2e7){
_2e5.push(_2e7.getAttribute("id"));
});
}
return _2e5;
},toHTMLElement:function(_2e8){
var _2e9=this.serialize(_2e8);
var temp=document.createElement("temp");
temp.innerHTML=_2e9;
return temp.firstChild;
},getActiveElement:function(){
var _2eb=document.activeElement;
if(_2eb==null||_2eb==document.body){
_2eb=this._activeElement;
}
return _2eb;
},serialize:function(_2ec){
var _2ed=null;
if(_2ec.xml!=null){
_2ed=_2ec.xml;
}else{
if(this._serializer!=null){
_2ed=this._serializer.serializeToString(_2ec);
}
}
return _2ed;
},hasDifferences:function(_2ee,_2ef){
var s1=null;
var s2=null;
if(_2ee.xml!=null){
s1=_2ee.xml;
s2=_2ef.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2ee);
s2=this._serializer.serializeToString(_2ef);
}
}
return s1!=s2;
},parse:function(_2f2){
var _2f3=null;
if(this._parser!=null&&window.XPathResult!=null){
_2f3=this._parser.parseFromString(_2f2,"text/xml");
}else{
_2f3=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2f3.setProperty("SelectionLanguage","XPath");
_2f3.loadXML(_2f2);
}
return this._validate(_2f3);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f6=dom.getElementsByTagName("parsererror").item(0);
if(_2f6!=null){
out=_2f6.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2fa=!has[id];
has[id]=true;
if(!_2fa){
out="Element \""+id+"\" encountered twice.";
}
return _2fa;
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
this.handleElement=function(_2fb,_2fc){
var _2fd=false;
switch(_2fb.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2fb.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2fd=false;
break;
}
break;
}
return _2fd;
};
this.updateElement=function(_2fe,_2ff){
var id=_2fe.getAttribute("id");
var _301=document.getElementById(id);
if(_301!=null){
var _302=null;
switch(_301.nodeName.toLowerCase()){
case "input":
_302=_2fe.getAttribute("value");
break;
case "textarea":
_302=_2fe.textContent?_2fe.textContent:_2fe.text;
break;
}
if(_302==null){
_302="";
}
if(_302!=_301.value){
_301.value=_302;
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
},_beforeUpdate:function(_303){
var _304=true;
if(_303!=null){
_303.__updateType=this.type;
_304=UpdateAssistant.dispatchEvent(_303,Update.EVENT_BEFOREUPDATE);
}
return _304;
},_afterUpdate:function(_305){
var _306=true;
if(_305!=null){
_305.__updateType=this.type;
_306=UpdateAssistant.dispatchEvent(_305,Update.EVENT_AFTERUPDATE);
}
return _306;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_308){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_308;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _309,_30a,_30b=UpdateAssistant.toHTMLElement(this.element);
if((_309=document.getElementById(this.id))!=null){
if((_30a=_309.parentNode)!=null){
var _30c=UserInterface.getBinding(_309);
if(_30c!=null){
_30b.__isAttached=_30c.isAttached;
}
if(this._beforeUpdate(_309)){
_30a.replaceChild(_30b,_309);
this._afterUpdate(_30b);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_30d){
var _30e=ReplaceUpdate.superclass._afterUpdate.call(this,_30d);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_30d.nodeName=="form"||_30d.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _30e;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_311,_312){
this.type=type;
this.id=id;
this.element=_311;
this.isFirst=_312;
return this;
}
SiblingUpdate.prototype.update=function(){
var _313=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_313);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_313);
break;
}
};
SiblingUpdate.prototype._remove=function(_314){
var _315=_314.parentNode;
if(_315!=null){
if(this._beforeUpdate(_314)){
_315.removeChild(_314);
this._afterUpdate(_315);
}
}
};
SiblingUpdate.prototype._insert=function(_316,_317){
var _318=UpdateAssistant.toHTMLElement(_316);
if(this.isFirst){
var _319=_317;
if(_319!=null){
if(this._beforeUpdate(_319)){
_319.insertBefore(_318,_319.firstChild);
this._afterUpdate(_318);
}
}
}else{
var _319=_317.parentNode;
if(_319!=null){
if(this._beforeUpdate(_319)){
_319.insertBefore(_318,_317.nextSibling);
this._afterUpdate(_318);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_31a){
var _31b=SiblingUpdate.superclass._beforeUpdate.call(this,_31a);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_31a.id+"\"");
}
return _31b;
};
SiblingUpdate.prototype._afterUpdate=function(_31c){
var _31d=true;
if(_31c!=null){
_31d=SiblingUpdate.superclass._afterUpdate.call(this,_31c);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_31c.id+"\"");
if(_31c.nodeName=="form"||_31c.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _31d;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_31f,_320){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_31f;
this.currentElement=_320;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _321=document.getElementById(this.id);
if(this._beforeUpdate(_321)){
this._updateAttributes(_321);
this._afterUpdate(_321);
}
};
AttributesUpdate.prototype._updateAttributes=function(_322){
Array.forEach(this.element.attributes,function(_323){
var _324=this.currentElement.getAttribute(_323.nodeName);
if(_324==null||_324!=_323.nodeValue){
this._setAttribute(_322,_323.nodeName,_323.nodeValue);
this._summary.push("@"+_323.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_325){
if(this.element.getAttribute(_325.nodeName)==null){
this._setAttribute(_322,_325.nodeName,null);
this._summary.push("@"+_325.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_326,name,_328){
if(_326==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_328);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _329=(_328==null);
if(_329){
_326.removeAttribute(name);
}else{
_326.setAttribute(name,_328);
}
if(document.all!=null){
if(_329){
_328="";
}
switch(name.toLowerCase()){
case "class":
_326.className=_328;
break;
case "disabled":
_326.disabled=!_329;
break;
case "checked":
_326.checked=!_329;
break;
case "readonly":
_326.readOnly=!_329;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_32a){
AttributesUpdate.superclass._afterUpdate.call(this,_32a);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_32b,key){
return _32b.replace("${windowkey}",document.location+":"+key);
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
var _32f=this._newDimensions.w!=this._currentDimensions.w;
var _330=this._newDimensions.h!=this._currentDimensions.h;
if(_32f||_330){
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
},fireOnDOM:function(_332){
if(Interfaces.isImplemented(IDOMHandler,_332,true)){
this._ondomstatements.add(_332);
}
},fireOnLoad:function(_333){
if(Interfaces.isImplemented(ILoadHandler,_333,true)){
this._onloadstatements.add(_333);
}
},fireOnResize:function(_334){
if(Interfaces.isImplemented(IResizeHandler,_334,true)){
this._onresizestatements.add(_334);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_335){
return eval(_335);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_336,_337){
SystemLogger.unsuspend(_337);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_338,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _33b=top.app.bindingMap.broadcasterHasDirtyTabs;
_33b.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_33c,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _33f=top.app.bindingMap.broadcasterHasDirtyTabs;
_33f.disable();
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
var _340=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_340=LoginService.Logout(true);
if(!_340){
alert("Logout failed.");
}
}
return _340;
},lock:function(_341){
if(_341!=null){
this._lockthings[_341]=true;
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
},unlock:function(_342,_343){
if(_342!=null){
delete this._lockthings[_342];
if(top.bindingMap.mastercover!=null){
if(_343||this._lockers>0){
if(_343){
var out="Unlocked by "+new String(_342)+"\n";
for(var _345 in this._lockthings){
out+="Locked by "+new String(_345)+". ";
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
},hasLock:function(_346){
return this._lockthings[_346]==true;
},activate:function(_347){
var _348=this._activeBinding;
this._activeBinding=_347;
this._activatedBindings.add(_347);
if(_348&&_348.isActive){
_348.deActivate();
}
},deActivate:function(_349){
var _34a=null;
var _34b=null;
if(_349==this._activeBinding){
while(!_34b&&this._activatedBindings.hasEntries()){
_34a=this._activatedBindings.extractLast();
if(_34a!=_349&&_34a.isActivatable){
_34b=_34a;
}
}
if(!_34b){
_34b=app.bindingMap.explorerdock;
}
_34b.activate();
}
},focused:function(_34c){
this.isFocused=_34c;
if(_34c){
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
},handleAction:function(_351){
switch(_351.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _353=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_355){
var src=_355.src;
if(src.indexOf(_353)>-1){
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
var _35a=false;
if(this._isMousePositionTracking){
_35a=true;
if(Client.isExplorer&&e.button!=1){
_35a=false;
}
if(_35a){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _35a;
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
},onDragStart:function(_35c){
var _35d=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_35d,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_35d.getImage());
this._cursorStartPoint=_35c;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_35d.showDrag){
_35d.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_35d.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _35f=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_35f);
}
},onDragStop:function(diff){
if(this._isDragging){
var _361=BindingDragger.draggedBinding;
if(_361.hideDrag){
_361.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_361.dragType);
this._isDragging=false;
_361=BindingAcceptor.acceptingBinding;
if(_361!=null){
if(Interfaces.isImplemented(IAcceptable,_361,true)==true){
_361.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_361);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_362){
if(this.isDeveloperMode||_362){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_363){
if(_363==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_364){
switch(_364){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_366){
switch(_366.Key){
case "ProductVersion":
this.versionString=_366.Value;
break;
case "ProductTitle":
this.versionPrettyString=_366.Value;
break;
case "InstallationId":
this.installationID=_366.Value;
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
},initialize:function(_369){
if(!this.isInitialized){
this.isInitialized=true;
if(_369){
this._audio=_369;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _36b=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_36b=true;
}
return _36b;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _36c=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _36d={"audio":true,"login":true};
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
var _386={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_386);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_386);
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
var _38d=UserInterface.getBinding(node);
if(_38d!=null){
_38d.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_38d!=null?null:node.parentNode;
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
var _390=Application.trackMousePosition(e);
if(_390){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_392){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_392){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_392=true;
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
var _393=KeySetBinding.handleKey(this._contextDocument,e);
if(!_393){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _394=this._contextWindow.frameElement;
if(_394!=null){
var _395=DOMUtil.getParentWindow(_394);
if(_395.standardEventHandler!=null){
_395.standardEventHandler._handleKeyDown(e,_392);
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
var _398=false;
var _399=DOMEvents.getTarget(e);
var name=_399.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_398=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_398;
}
if(_398){
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
StandardEventHandler.prototype.enableNativeKeys=function(_39c){
this._isAllowTabs=(_39c==true?true:false);
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
function Action(_39f,type){
this.target=_39f;
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
function Animation(_3a1){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3a2 in _3a1){
this[_3a2]=_3a1[_3a2];
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
Animation.prototype.onstart=function(_3a6){
};
Animation.prototype.onstep=function(_3a7){
};
Animation.prototype.onstop=function(_3a8){
};
Point.isEqual=function(p1,p2){
var _3ab=false;
if(p1&&p2){
_3ab=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3ab;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3b0=false;
if(dim1&&dim2){
_3b0=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3b0;
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
function BindingAcceptor(_3b7){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b7;
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
var _3b8=new List(this._binding.dragAccept.split(" "));
while(_3b8.hasNext()){
var type=_3b8.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3ba,arg){
var type=arg;
try{
switch(_3ba){
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
function BindingBoxObject(_3bf){
this._domElement=_3bf.getBindingElement();
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
function BindingDragger(_3c1){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3c1;
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
BindingDragger.prototype.registerHandler=function(_3c3){
if(Interfaces.isImplemented(IDragHandler,_3c3)==true){
this.handler=_3c3;
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
var _3c6=e.button==(e.target?0:1);
if(_3c6){
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
var _3c8=Application.getMousePosition();
var dx=_3c8.x-this.startPoint.x;
var dy=_3c8.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3cb,e){
switch(_3cb){
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
function BindingParser(_3cd){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3cd;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3ce){
var _3cf=new List();
var xml=BindingParser.XML.replace("${markup}",_3ce);
var doc=XMLParser.parse(_3ce);
if(doc){
var _3d2=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3d2);
var node=_3d2.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3cf.add(node);
}
node=node.nextSibling;
}
}
return _3cf;
};
BindingParser.prototype._iterate=function(_3d4,_3d5){
var _3d6=null;
switch(_3d4.nodeType){
case Node.ELEMENT_NODE:
_3d6=this._cloneElement(_3d4);
UserInterface.registerBinding(_3d6);
break;
case Node.TEXT_NODE:
_3d6=this._ownerDocument.createTextNode(_3d4.nodeValue);
break;
}
if(_3d6){
_3d5.appendChild(_3d6);
}
if(_3d6&&_3d4.hasChildNodes()){
var _3d7=_3d4.firstChild;
while(_3d7){
this._iterate(_3d7,_3d6);
_3d7=_3d7.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3d8){
var _3d9=DOMUtil.createElementNS(_3d8.namespaceURI?_3d8.namespaceURI:Constants.NS_XHTML,_3d8.nodeName,this._ownerDocument);
var i=0;
while(i<_3d8.attributes.length){
var attr=_3d8.attributes.item(i++);
_3d9.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3d9;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3dc){
var _3dd=null;
var _3de=false;
var _3df=_3dc.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3dc)){
var _3e0=UserInterface.getBinding(_3dc);
_3de=BindingSerializer.activeInstance.indexBinding(_3e0);
if(_3de){
_3dd=_3e0.key;
_3dc.setAttribute(BindingSerializer.KEYPOINTER,_3dd);
}
}
_3dd=_3dd?_3dd:_3df;
var _3e1=new List(_3dc.childNodes);
_3e1.each(function(_3e2){
if(_3e2.nodeType==Node.ELEMENT_NODE){
_3e2.setAttribute(BindingSerializer.KEYPOINTER,_3dd);
}
});
if(_3de){
BindingSerializer.activeInstance.append(_3dd,_3df);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3e3,_3e4){
BindingSerializer.includeShadowTreeBindings=_3e4?true:false;
BindingSerializer.activeInstance=this;
_3e3.bindingWindow.ElementIterator.iterate(_3e3.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e5){
var _3e6=false;
var _3e7=_3e5.serialize();
if(_3e7!=false){
_3e6=true;
var _3e8="ui:"+DOMUtil.getLocalName(_3e5.bindingElement);
var _3e9=DOMUtil.createElementNS(Constants.NS_UI,_3e8,this._dom);
this._pointers[_3e5.key]=_3e9;
for(var prop in _3e7){
if(_3e7[prop]!=null){
_3e9.setAttribute(prop,String(_3e7[prop]));
}
}
}
return _3e6;
};
BindingSerializer.prototype.append=function(_3eb,_3ec){
var _3ed=this._pointers[_3eb];
var _3ee=_3ec?this._pointers[_3ec]:this._dom;
_3ee.appendChild(_3ed);
};
function ImageProfile(_3ef){
this._default=_3ef.image;
this._hover=_3ef.imageHover;
this._active=_3ef.imageActive;
this._disabled=_3ef.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3f0){
this._default=_3f0;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3f1){
this._hover=_3f1;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3f2){
this._active=_3f2;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3f3){
this._disabled=_3f3;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f4,_3f5,_3f6){
var _3f7=null;
if(_3f4.isAttached){
_3f7=new List();
var _3f8=_3f6?_3f4.getChildElementsByLocalName(_3f5):_3f4.getDescendantElementsByLocalName(_3f5);
_3f8.each(function(_3f9){
var _3fa=UserInterface.getBinding(_3f9);
if(_3fa){
_3f7.add(_3fa);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f4.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f7;
},getAncestorBindingByType:function(_3fc,impl,_3fe){
var _3ff=null;
if(Binding.exists(_3fc)){
var node=_3fc.bindingElement;
while(_3ff==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _401=UserInterface.getBinding(node);
if(_401 instanceof impl){
_3ff=_401;
}
}else{
if(_3fe&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3ff;
},getAncestorBindingByLocalName:function(_403,_404,_405){
var _406=null;
if(_404=="*"){
var node=_403.bindingElement;
while(!_406&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_406=UserInterface.getBinding(node);
}
}
}else{
_406=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_404,_403.bindingElement,_405));
}
return _406;
},getChildElementsByLocalName:function(_408,_409){
var _40a=new List();
var _40b=new List(_408.bindingElement.childNodes);
_40b.each(function(_40c){
if(_40c.nodeType==Node.ELEMENT_NODE){
if(_409=="*"||DOMUtil.getLocalName(_40c)==_409){
_40a.add(_40c);
}
}
});
return _40a;
},getChildBindingByType:function(_40d,impl){
var _40f=null;
_40d.getChildElementsByLocalName("*").each(function(_410){
var _411=UserInterface.getBinding(_410);
if(_411!=null&&_411 instanceof impl){
_40f=_411;
return false;
}else{
return true;
}
});
return _40f;
},getDescendantBindingByType:function(_412,impl){
var _414=null;
_412.getDescendantElementsByLocalName("*").each(function(_415){
var _416=UserInterface.getBinding(_415);
if(_416!=null&&_416 instanceof impl){
_414=_416;
return false;
}else{
return true;
}
});
return _414;
},getDescendantBindingsByType:function(_417,impl){
var _419=new List();
_417.getDescendantElementsByLocalName("*").each(function(_41a){
var _41b=UserInterface.getBinding(_41a);
if(_41b!=null&&_41b instanceof impl){
_419.add(_41b);
}
return true;
});
return _419;
},getNextBindingByLocalName:function(_41c,name){
var _41e=null;
var _41f=_41c.bindingElement;
while((_41f=DOMUtil.getNextElementSibling(_41f))!=null&&DOMUtil.getLocalName(_41f)!=name){
}
if(_41f!=null){
_41e=UserInterface.getBinding(_41f);
}
return _41e;
},getPreviousBindingByLocalName:function(_420,name){
var _422=null;
var _423=_420.bindingElement;
while((_423=DOMUtil.getPreviousElementSibling(_423))!=null&&DOMUtil.getLocalName(_423)!=name){
}
if(_423!=null){
_422=UserInterface.getBinding(_423);
}
return _422;
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
},addFilter:function(_424){
this._filters.add(_424);
},removeFilter:function(_425){
var _426=-1;
this._filters.each(function(fil){
_426++;
var _428=true;
if(fil==_425){
_428=false;
}
return _428;
});
if(_426>-1){
this._filters.del(_426);
}
},_applyFilters:function(node,arg){
var _42b=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _42e=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _42f=true;
while(this._filters.hasNext()&&_42f==true){
var _430=this._filters.getNext();
var res=_430.call(this,node,arg);
if(res!=null){
_42b=res;
switch(res){
case stop:
case skip:
case skip+_42e:
_42f=false;
break;
}
}
}
return _42b;
},crawl:function(_432,arg){
this.contextDocument=_432.ownerDocument;
this.onCrawlStart();
var _434=this.type==NodeCrawler.TYPE_ASCENDING;
var _435=this._applyFilters(_432,arg);
if(_435!=NodeCrawler.STOP_CRAWLING){
if(_434&&_435==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_434?_432.parentNode:_432;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_437,arg){
var _439=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_439=this._crawlDescending(_437,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_439=this._crawlAscending(_437,arg);
break;
}
return _439;
},_crawlDescending:function(_43a,arg){
var skip=NodeCrawler.SKIP_NODE;
var _43d=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _43f=null;
if(_43a.hasChildNodes()){
var node=_43a.firstChild;
while(node!=null&&_43f!=stop){
this.currentNode=node;
_43f=this._applyFilters(node,arg);
switch(_43f){
case stop:
case _43d:
case skip+_43d:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_43f=stop;
break;
}
}
}
if(_43f!=stop&&_43f!=skip){
this.previousNode=node;
}
break;
}
if(_43f!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _43f;
},_crawlAscending:function(_442,arg){
var _444=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_442!=null){
this.currentNode=_442;
_444=this._applyFilters(_442,arg);
if(_444!=stop){
var next=this.nextNode?this.nextNode:_442.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_442;
_444=this._crawl(next,arg);
}
}
}else{
_444=stop;
}
return _444;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _448 in this){
this[_448]=null;
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
var _44b=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_44b=NodeCrawler.SKIP_NODE;
}
return _44b;
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
this.addFilter(function(_44c,arg){
var _44e=null;
if(!UserInterface.hasBinding(_44c)){
_44e=NodeCrawler.SKIP_NODE;
}
return _44e;
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
this.addFilter(function(_450,arg){
var _452=null;
var _453=UserInterface.getBinding(_450);
if(Interfaces.isImplemented(ICrawlerHandler,_453)==true){
self.response=null;
_453.handleCrawler(self);
_452=self.response;
}
return _452;
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
this.addFilter(function(_455,list){
var _457=null;
var _458=UserInterface.getBinding(_455);
if(Interfaces.isImplemented(IFlexible,_458)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_458);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_458.isFlexSuspended==true){
_457=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_458);
}
break;
}
}
return _457;
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
this.addFilter(function(_459,list){
var _45b=null;
var _45c=UserInterface.getBinding(_459);
if(_45c.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_45c)==true){
if(_45c.isFocusable&&_45c.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_45c);
break;
case FocusCrawler.MODE_FOCUS:
if(!_45c.isFocused){
_45c.focus();
}
_45b=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_45c.isFocused==true){
_45c.blur();
_45b=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _45b;
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
this.addFilter(function(_45d,list){
var _45f=null;
var _460=UserInterface.getBinding(_45d);
if(!_460.isVisible){
_45f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _45f;
});
this.addFilter(function(_461,list){
var _463=null;
var _464=UserInterface.getBinding(_461);
if(_464.isAttached){
if(Interfaces.isImplemented(IFit,_464)){
if(!_464.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_464);
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
UpdateAssistant.serialize=function(_465){
_465=_465.cloneNode(true);
_465.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_465.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_465);
};
}
},handleEvent:function(e){
var _467=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_467);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_467);
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
},_beforeUpdate:function(_468){
var _469=(_468==document.documentElement);
if(_469){
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
var _46c=FocusBinding.focusedBinding;
if(_46c!=null){
this._focusID=_46c.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_468.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_468);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_468,false);
break;
}
}
},_afterUpdate:function(_46d){
var _46e=(_46d==document.documentElement);
if(_46e){
var _46f=this._elementsbuffer;
if(_46f.hasEntries()){
_46f.each(function(_470){
DocumentManager.attachBindings(_470);
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
var _473=FocusBinding.focusedBinding;
if(_473==null){
var _474=document.getElementById(this._focusID);
if(_474!=null){
var _473=UserInterface.getBinding(_474);
if(_473!=null){
_473.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _475=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _476="NEW DOM: "+document.title+"\n\n"+_475+"\n\n";
_476+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_476);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_46d.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_46d.__isAttached!==false){
this._elementsbuffer.add(_46d);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46d,true);
break;
}
switch(_46d.id){
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
var _473=UserInterface.getBinding(_46d);
while(_473==null&&_46d!=null){
_473=UserInterface.getBinding(_46d);
_46d=_46d.parentNode;
}
if(_473!=null){
_473.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_478,_479){
var _47a=UserInterface.getBinding(_478);
if(_47a!=null){
if(_479){
var _47b=this._attributesbuffer;
var map=new Map();
_47b.each(function(name,old){
var now=_478.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_478.attributes).each(function(att){
if(att.specified){
if(!_47b.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_482){
var _483=_47a.propertyMethodMap[name];
if(_483!=null){
_483.call(_47a,_482);
}
});
}else{
var map=new Map();
new List(_478.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_485,_486){
var _487=window.bindingMap[_485.getAttribute("id")];
if(_487!=null){
return _487.handleElement(_485,_486);
}
},updateElement:function(_488,_489){
var _48a=window.bindingMap[_488.getAttribute("id")];
if(_48a!=null){
return _48a.updateElement(_488,_489);
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
this.addFilter(function(_48c,list){
var _48e=UserInterface.getBinding(_48c);
var _48f=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_48e==null){
UserInterface.registerBinding(_48c);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_48e!=null){
if(!_48e.isAttached){
list.add(_48e);
}
if(_48e.isLazy==true){
_48f=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_48e!=null){
list.add(_48e);
}
break;
}
return _48f;
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
},handleBroadcast:function(_490,arg){
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
var _493=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_493)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_493!=null){
if(_493.href!=null&&_493.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _494=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_494!=null){
var map={};
var _496=DOMUtil.getElementsByTagName(_494,"bindingmapping");
new List(_496).each(function(_497){
var _498=_497.getAttribute("element");
var _499=_497.getAttribute("binding");
map[_498]=eval(_499);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_49a){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_49a;
}else{
this.customUserInterfaceMapping.merge(_49a);
}
},_registerBindings:function(_49b){
var _49c=new DocumentCrawler();
_49c.mode=DocumentCrawler.MODE_REGISTER;
_49c.crawl(_49b);
_49c.dispose();
},_attachBindings:function(_49d){
var _49e=new DocumentCrawler();
_49e.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_49e.crawl(_49d,list);
var _4a0=false;
while(list.hasNext()){
var _4a1=list.getNext();
if(!_4a1.isAttached){
_4a1.onBindingAttach();
if(!_4a1.memberDependencies){
_4a1.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4a1)){
_4a0=true;
}
}
}
if(_4a0){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49e.dispose();
list.dispose();
},attachBindings:function(_4a3){
this._registerBindings(_4a3);
this._attachBindings(_4a3);
},detachBindings:function(_4a4,_4a5){
var _4a6=new DocumentCrawler();
_4a6.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a6.crawl(_4a4,list);
if(_4a5==true){
list.extractFirst();
}
var _4a8=false;
list.reverse().each(function(_4a9){
if(Interfaces.isImplemented(IData,_4a9)){
_4a8=true;
}
_4a9.dispose(true);
});
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
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4ab){
return (/textarea|input/.test(DOMUtil.getLocalName(_4ab)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4ac){
this.isDirty=true;
var _4ad=false;
if(_4ac!=null&&!_4ac.isDirty){
_4ac.isDirty=true;
_4ac.dispatchAction(Binding.ACTION_DIRTY);
_4ad=true;
}
return _4ad;
},clean:function(_4ae){
if(_4ae.isDirty){
_4ae.isDirty=false;
}
},registerDataBinding:function(name,_4b0){
if(Interfaces.isImplemented(IData,_4b0,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4b0;
}
}else{
throw "Invalid DataBinding: "+_4b0;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4b3=null;
if(this._dataBindings[name]!=null){
_4b3=this._dataBindings[name];
}
return _4b3;
},getAllDataBindings:function(_4b4){
var list=new List();
for(var name in this._dataBindings){
var _4b7=this._dataBindings[name];
list.add(_4b7);
if(_4b4&&_4b7 instanceof WindowBinding){
var _4b8=_4b7.getContentWindow().DataManager;
if(_4b8!=null){
list.merge(_4b8.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4b9=false;
for(var name in this._dataBindings){
_4b9=true;
break;
}
return _4b9;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4bd){
var _4be=this._dataBindings[name];
if(_4be!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4be.setResult(_4bd);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4be);
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
var _4bf=new DataBindingMap();
_4bf.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4c1=this._dataBindings[name];
if(_4c1 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4bf[name]=_4c1.getValue();
}
return _4bf;
},getDataBindingResultMap:function(){
var _4c2=new DataBindingMap();
_4c2.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c4=this._dataBindings[name];
var res=_4c4.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c7){
_4c2.set(name,_4c7);
});
}else{
_4c2.set(name,res);
}
}
return _4c2;
},getPostBackString:function(){
var _4c8="";
var form=document.forms[0];
if(form!=null){
var _4ca="";
new List(form.elements).each(function(_4cb){
var name=_4cb.name;
var _4cd=encodeURIComponent(_4cb.value);
switch(_4cb.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c8+=name+"="+_4cd+"&";
break;
case "submit":
if(document.activeElement==_4cb){
_4c8+=name+"="+_4cd+"&";
}
break;
case "radio":
if(_4cb.checked){
_4c8+=name+"="+_4cd+"&";
}
break;
case "checkbox":
if(_4cb.checked){
if(_4cb.name==_4ca){
if(_4c8.lastIndexOf("&")==_4c8.length-1){
_4c8=_4c8.substr(0,_4c8.length-1);
}
_4c8+=","+_4cd;
}else{
_4c8+=name+"="+_4cb.value;
}
_4ca=name;
_4c8+="&";
}
break;
}
});
}
return _4c8.substr(0,_4c8.length-1);
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
var _4d6=null;
var _4d7=null;
var _4d8=false;
if(!this._cache[name]){
_4d8=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4da=DOMUtil.getXMLHTTPRequest();
_4da.open("get",uri,false);
_4da.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4da.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d7=_4da.responseText;
break;
default:
_4d7=_4da.responseXML;
break;
}
if(_4d7==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d7;
}
}
_4d7=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d6=_4d7;
break;
case this._modes.MODE_DOCUMENT:
_4d6=DOMUtil.cloneNode(_4d7,true);
break;
case this._modes.MODE_ELEMENT:
_4d6=DOMUtil.cloneNode(_4d7.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d6=DOMSerializer.serialize(_4d7,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d6=DOMSerializer.serialize(_4d7.documentElement,true);
break;
}
if(_4d8&&Application.isDeveloperMode){
}
return _4d6;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4dd){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4dd];
},invoke:function(url,_4df,_4e0){
this._logger.error("Not implemented");
},invokeModal:function(url,_4e2,_4e3){
var _4e4=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4e2,argument:_4e3});
StageBinding.presentViewDefinition(_4e4);
return _4e4;
},invokeDefinition:function(_4e5){
if(_4e5 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e5);
}
return _4e5;
},question:function(_4e6,text,_4e8,_4e9){
if(!_4e8){
_4e8=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e6,text,_4e8,_4e9);
},message:function(_4ea,text,_4ec,_4ed){
if(!_4ec){
_4ec=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4ea,text,_4ec,_4ed);
},error:function(_4ee,text,_4f0,_4f1){
if(!_4f0){
_4f0=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4ee,text,_4f0,_4f1);
},warning:function(_4f2,text,_4f4,_4f5){
if(!_4f4){
_4f4=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4f2,text,_4f4,_4f5);
},_standardDialog:function(type,_4f7,text,_4f9,_4fa){
var _4fb=null;
if(!_4f9){
_4fb=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4fb=new List();
new List(_4f9).each(function(_4fc){
var _4fd=null;
switch(typeof _4fc){
case "object":
_4fd=_4fc;
break;
case "string":
var _4fe=false;
if(_4fc.indexOf(":")>-1){
_4fc=_4fc.split(":")[0];
_4fe=true;
}
_4fd=Dialog.dialogButton(_4fc);
if(_4fe){
_4fd.isDefault=true;
}
break;
}
_4fb.add(_4fd);
});
}
var _4ff={title:_4f7,text:text,type:type,image:this._dialogImages[type],buttons:_4fb};
var _500=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4fa,argument:_4ff});
StageBinding.presentViewDefinition(_500);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_502,arg){
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
},saveAll:function(_505){
var self=this;
var _507=Application.getDirtyDockTabsTabs();
if(_507.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_508,_509){
switch(_508){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_509,_505);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_507);
}else{
if(_505){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_50a,_50b){
var _50c=false;
var list=new List();
_50a.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_50c=true;
var _510=list.getLength();
var _511={handleBroadcast:function(_512,tab){
if(--_510==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_50b){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_511);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _50c;
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
var _516="Composite.Management.Help";
if(!StageBinding.isViewOpen(_516)){
StageBinding.handleViewPresentation(_516);
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
var _518=document.createEvent("Events");
_518.initEvent(type,true,true);
window.dispatchEvent(_518);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function CompositeUrl(url){
var _51a=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _51b=_51a.exec(url);
if(_51b){
var _51c={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_51c[$1]=$3;
});
this.queryString=_51c;
this.path=url.replace(/\?.*/g,"");
if(_51b[3]=="media"){
this.isMedia=true;
}else{
if(_51b[3]=="page"){
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
CompositeUrl.prototype.setParam=function(key,_524){
this.queryString[key]=_524;
};
CompositeUrl.prototype.toString=function(){
var url=this.path;
var _526=[];
for(var key in this.queryString){
_526.push(key+"="+this.queryString[key]);
}
if(_526.length>0){
url+="?"+_526.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_528,_529){
var _52a=null;
var _52b=ViewDefinitions[_528];
if(_52b.isMutable){
var impl=null;
if(_52b instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_529!=null&&impl!=null){
var def=new impl();
for(var prop in _52b){
def[prop]=ViewDefinition.cloneProperty(_52b[prop]);
}
def.handle=_529;
_52a=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _52a;
};
ViewDefinition.cloneProperty=function(_52f){
if(null==_52f){
return _52f;
}
if(typeof _52f==="object"){
var _530=(_52f.constructor===Array)?[]:{};
for(var prop in _52f){
_530[prop]=ViewDefinition.cloneProperty(_52f[prop]);
}
return _530;
}
return _52f;
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
Binding.evaluate=function(_537,_538){
var _539=null;
var _53a=_538.bindingWindow.WindowManager;
if(_53a!=null){
var _53b=Binding.parseScriptStatement(_537,_538.key);
_539=_53a.evaluate(_53b);
}
return _539;
};
Binding.parseScriptStatement=function(_53c,key){
if(_53c!=null&&key!=null){
var _53e="UserInterface.getBindingByKey ( \""+key+"\" )";
_53c=_53c.replace(/(\W|^)this(,| +|\)|;)/g,_53e);
_53c=_53c.replace(/(\W|^)this(\.)/g,_53e+".");
}
return _53c;
};
Binding.exists=function(_53f){
var _540=false;
try{
if(_53f&&_53f.bindingElement&&_53f.bindingElement.nodeType&&_53f.isDisposed==false){
_540=true;
}
}
catch(accessDeniedException){
_540=false;
}
finally{
return _540;
}
};
Binding.destroy=function(_541){
if(!_541.isDisposed){
if(_541.acceptor!=null){
_541.acceptor.dispose();
}
if(_541.dragger!=null){
_541.disableDragging();
}
if(_541.boxObject!=null){
_541.boxObject.dispose();
}
if(_541._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_541);
}
for(var _542 in _541.shadowTree){
var _543=_541.shadowTree[_542];
if(_543 instanceof Binding&&Binding.exists(_543)){
_543.dispose(true);
}
_541.shadowTree[_542]=null;
}
_541.isDisposed=true;
_541=null;
}
};
Binding.dotnetify=function(_544,_545){
var _546=_544.getCallBackID();
if(_546!=null){
var _547=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_544.bindingDocument);
_547.type="hidden";
_547.id=_546;
_547.name=_546;
_547.value=_545!=null?_545:"";
_544.bindingElement.appendChild(_547);
_544.shadowTree.dotnetinput=_547;
}else{
throw _544.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_548){
var _549=_548.getProperty("image");
var _54a=_548.getProperty("image-hover");
var _54b=_548.getProperty("image-active");
var _54c=_548.getProperty("image-disabled");
if(_548.imageProfile==null){
if(_548.image==null&&_549!=null){
_548.image=_549;
}
if(_548.imageHover==null&&_54a!=null){
_548.imageHover=_549;
}
if(_548.imageActive==null&&_54b!=null){
_548.imageActive=_54b;
}
if(_548.imageDisabled==null&&_54c!=null){
_548.imageDisabled=_54c;
}
if(_548.image||_548.imageHover||_548.imageActive||_548.imageDisabled){
_548.imageProfile=new ImageProfile(_548);
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
var _54e=this.dependentBindings[key];
_54e.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_54f){
if(_54f){
this.memberDependencies[_54f.key]=true;
var _550=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_550=false;
break;
}
}
if(_550){
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
Binding.prototype.detachRecursive=function(_552){
if(_552==null){
_552=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_552);
};
Binding.prototype.addMember=function(_553){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_553.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_553.key]=false;
_553.registerDependentBinding(this);
}
}
return _553;
};
Binding.prototype.addMembers=function(_554){
while(_554.hasNext()){
var _555=_554.getNext();
if(!_555.isInitialized){
this.addMember(_555);
}
}
return _554;
};
Binding.prototype.registerDependentBinding=function(_556){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_556.key]=_556;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _557=this.getProperty("persist");
if(_557&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _559=new List(_557.split(" "));
while(_559.hasNext()){
var prop=_559.getNext();
var _55b=Persistance.getPersistedProperty(id,prop);
if(_55b!=null){
this._persist[prop]=_55b;
this.setProperty(prop,_55b);
}else{
_55b=this.getProperty(prop);
if(_55b!=null){
this._persist[prop]=_55b;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _55c=this.getProperty("disabled");
var _55d=this.getProperty("contextmenu");
var _55e=this.getProperty("observes");
var _55f=this.getProperty("onattach");
var _560=this.getProperty("hidden");
var _561=this.getProperty("blockactionevents");
if(_560==true&&this.isVisible==true){
this.hide();
}
if(_55c&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_55d){
this.setContextMenu(_55d);
}
if(_55e){
this.observe(this.getBindingForArgument(_55e));
}
if(_561==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_55f!=null){
Binding.evaluate(_55f,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _563=this.getProperty("draggable");
var _564=this.getProperty("dragtype");
var _565=this.getProperty("dragaccept");
var _566=this.getProperty("dragreject");
if(_563!=null){
this.isDraggable=_563;
}
if(_564!=null){
this.dragType=_564;
if(_563!=false){
this.isDraggable=true;
}
}
if(_565!=null){
this.dragAccept=_565;
}
if(_566!=null){
this.dragReject=_566;
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
Binding.prototype._updateBindingMap=function(_567){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _56a=null;
if(_567){
_56a=map[id];
if(_56a!=null&&_56a!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_56a=map[id];
if(_56a!=null&&_56a==this){
delete map[id];
}
}
}else{
var _56c=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_567);
if(Application.isDeveloperMode==true){
alert(_56c);
}else{
this.logger.error(_56c);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_56e){
};
Binding.prototype.handleBroadcast=function(_56f,arg){
};
Binding.prototype.handleElement=function(_571){
return false;
};
Binding.prototype.updateElement=function(_572){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _574=null;
switch(typeof arg){
case "object":
_574=arg;
break;
case "string":
_574=this.bindingDocument.getElementById(arg);
if(_574==null){
_574=Binding.evaluate(arg,this);
}
break;
}
if(_574!=null&&_574.nodeType!=null){
_574=UserInterface.getBinding(_574);
}
return _574;
};
Binding.prototype.serialize=function(){
var _575={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_575.id=id;
}
var _577=this.getProperty("binding");
if(_577){
_575.binding=_577;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _578=this.getAncestorBindingByLocalName("*");
if(_578){
if(_578.isShadowBinding){
this.isShadowBinding=true;
_575=false;
}else{
var tree=_578.shadowTree;
for(var key in tree){
var _57b=tree[key];
if(_57b==this){
this.isShadowBinding=true;
_575=false;
}
}
}
}
}
return _575;
};
Binding.prototype.serializeToString=function(_57c){
var _57d=null;
if(this.isAttached){
_57d=new BindingSerializer().serializeBinding(this,_57c);
}else{
throw "cannot serialize unattached binding";
}
return _57d;
};
Binding.prototype.subTreeFromString=function(_57e){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_57e);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_57f){
var _580=this.bindingElement.getAttribute(_57f);
if(_580){
_580=Types.castFromString(_580);
}
return _580;
};
Binding.prototype.setProperty=function(prop,_582){
if(_582!=null){
_582=_582.toString();
if(String(this.bindingElement.getAttribute(prop))!=_582){
this.bindingElement.setAttribute(prop,_582);
if(this.isAttached==true){
if(Persistance.isEnabled&&_582!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_582;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_582);
}
}
var _583=this.propertyMethodMap[prop];
if(_583){
_583.call(this,this.getProperty(prop));
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
var _585=null;
if(Binding.exists(this)){
_585=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _585;
};
Binding.prototype.attachClassName=function(_586){
CSSUtil.attachClassName(this.bindingElement,_586);
};
Binding.prototype.detachClassName=function(_587){
CSSUtil.detachClassName(this.bindingElement,_587);
};
Binding.prototype.hasClassName=function(_588){
return CSSUtil.hasClassName(this.bindingElement,_588);
};
Binding.prototype.addActionListener=function(type,_58a){
_58a=_58a!=null?_58a:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_58a)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_58a);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_58a+")");
}
};
Binding.prototype.removeActionListener=function(type,_58c){
_58c=_58c?_58c:this;
if(Action.isValid(type)){
var _58d=this.actionListeners[type];
if(_58d){
var i=0,_58f;
while((_58f=_58d[i])!=null){
if(_58f==_58c){
_58d.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_591){
_591=_591?_591:this;
DOMEvents.addEventListener(this.bindingElement,type,_591);
};
Binding.prototype.removeEventListener=function(type,_593){
_593=_593?_593:this;
DOMEvents.removeEventListener(this.bindingElement,type,_593);
};
Binding.prototype.subscribe=function(_594){
if(!this.hasSubscription(_594)){
this._subscriptions.set(_594,true);
EventBroadcaster.subscribe(_594,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_594);
}
};
Binding.prototype.unsubscribe=function(_595){
if(this.hasSubscription(_595)){
this._subscriptions.del(_595);
EventBroadcaster.unsubscribe(_595,this);
}
};
Binding.prototype.hasSubscription=function(_596){
return this._subscriptions.has(_596);
};
Binding.prototype.observe=function(_597,_598){
_597.addObserver(this,_598);
};
Binding.prototype.unObserve=function(_599,_59a){
_599.removeObserver(this,_59a);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _59f={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_59f);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_59f);
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
var _5a1=null;
var _5a2=null;
var _5a3=false;
if(arg instanceof Action){
_5a1=arg;
}else{
if(Action.isValid(arg)){
_5a1=new Action(this,arg);
_5a3=true;
}
}
if(_5a1!=null&&Action.isValid(_5a1.type)==true){
if(_5a1.isConsumed==true){
_5a2=_5a1;
}else{
var _5a4=this.actionListeners[_5a1.type];
if(_5a4!=null){
_5a1.listener=this;
var i=0,_5a6;
while((_5a6=_5a4[i++])!=null){
if(_5a6&&_5a6.handleAction){
_5a6.handleAction(_5a1);
}
}
}
var _5a7=true;
if(this.isBlockingActions==true){
switch(_5a1.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_5a3){
_5a7=false;
}
break;
}
}
if(_5a7){
_5a2=this.migrateAction(_5a1);
}else{
_5a2=_5a1;
}
}
}
return _5a2;
};
Binding.prototype.migrateAction=function(_5a8){
var _5a9=null;
var _5aa=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5a9&&node.nodeType!=Node.DOCUMENT_NODE){
_5a9=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5a9){
_5aa=_5a9.dispatchAction(_5a8);
}else{
_5aa=_5a8;
}
}
return _5aa;
};
Binding.prototype.reflex=function(_5ac){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5ac);
}
};
Binding.prototype.getMigrationParent=function(){
var _5ad=null;
if(true){
try{
var _5ae=this.bindingElement.parentNode;
if(_5ae!=null){
_5ad=_5ae;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5ad=null;
}
}
return _5ad;
};
Binding.prototype.add=function(_5af){
if(_5af.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5af.bindingElement);
}else{
throw "Could not add "+_5af.toString()+" of different document origin.";
}
return _5af;
};
Binding.prototype.addFirst=function(_5b0){
if(_5b0.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5b0.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5b0.toString()+" of different document origin.";
}
return _5b0;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5b1,_5b2){
return BindingFinder.getAncestorBindingByLocalName(this,_5b1,_5b2);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5b4){
return BindingFinder.getAncestorBindingByType(this,impl,_5b4);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b6){
return BindingFinder.getChildElementsByLocalName(this,_5b6);
};
Binding.prototype.getChildElementByLocalName=function(_5b7){
return this.getChildElementsByLocalName(_5b7).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5b8){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5b8));
};
Binding.prototype.getChildBindingsByLocalName=function(_5b9){
return this.getDescendantBindingsByLocalName(_5b9,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5ba){
return this.getChildBindingsByLocalName(_5ba).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5bb,_5bc){
return BindingFinder.getDescendantBindingsByLocalName(this,_5bb,_5bc);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5bd){
return this.getDescendantBindingsByLocalName(_5bd,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5c0){
return BindingFinder.getNextBindingByLocalName(this,_5c0);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5c1){
return BindingFinder.getPreviousBindingByLocalName(this,_5c1);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5c2){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5c2);
};
Binding.prototype.isFirstBinding=function(_5c3){
return (this.getOrdinalPosition(_5c3)==0);
};
Binding.prototype.isLastBinding=function(_5c4){
return DOMUtil.isLastElement(this.bindingElement,_5c4);
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
Binding.prototype.setCallBackArg=function(_5c6){
this.setProperty(Binding.CALLBACKARG,_5c6);
};
Binding.prototype.dispose=function(_5c7){
if(!this.isDisposed){
if(!_5c7){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5c8=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5c8){
if(Client.isExplorer){
_5c8.outerHTML="";
}else{
_5c8.parentNode.removeChild(_5c8);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5cb){
list.add(_5cb);
});
list.each(function(_5cc){
self.unsubscribe(_5cc);
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
Binding.prototype.wakeUp=function(_5ce,_5cf){
_5cf=_5cf?_5cf:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5ce!==undefined){
self[_5ce]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5cf);
},0);
}
};
Binding.prototype.handleCrawler=function(_5d1){
if(_5d1.response==null&&this.isLazy==true){
if(_5d1.id==DocumentCrawler.ID&&_5d1.mode==DocumentCrawler.MODE_REGISTER){
_5d1.response=NodeCrawler.NORMAL;
}else{
_5d1.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d1.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5d1.id)){
_5d1.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5d1.response==null){
switch(_5d1.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5d1.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5d2){
var _5d3=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5d2);
return UserInterface.registerBinding(_5d3,Binding);
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
var _5d4=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5d4.each(function(_5d5){
DataBinding.expressions[_5d5.Key]=new RegExp(_5d5.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d6){
var _5d7=null;
var _5d8=_5d6.getAncestorBindingByLocalName("field");
if(_5d8&&_5d8 instanceof FieldBinding){
var desc=_5d8.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d7=desc.getLabel();
}
}
return _5d7;
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
var _5db=this.bindingWindow.DataManager;
_5db.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5dd=this.bindingWindow.DataManager;
if(_5dd.getDataBinding(name)){
_5dd.unRegisterDataBinding(name);
}
_5dd.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5de,arg){
RootBinding.superclass.handleBroadcast.call(this,_5de,arg);
var _5e0=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5de){
case _5e0:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5e0);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5e1){
var _5e2=_5e1?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5e1!=this.isActivated){
this.isActivated=_5e1;
this.dispatchAction(_5e2);
var _5e3=new List();
var self=this;
this._activationawares.each(function(_5e5){
if(_5e5.isActivationAware){
try{
if(_5e1){
if(!_5e5.isActivated){
_5e5.onActivate();
}
}else{
if(_5e5.isActivated){
_5e5.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5e3.add(_5e5);
}
}
});
_5e3.each(function(_5e6){
this._activationawares.del(_5e6);
});
_5e3.dispose();
}else{
var _5e7="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e7);
}else{
this.logger.error(_5e7);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5e8,_5e9){
if(Interfaces.isImplemented(IActivationAware,_5e8,true)==true){
if(_5e9==false){
this._activationawares.del(_5e8);
}else{
this._activationawares.add(_5e8);
if(this.isActivated==true){
_5e8.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5e8+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5ea){
var _5eb=this.getMigrationParent();
if(_5eb!=null){
var root=_5eb.ownerDocument.body;
var _5ed=UserInterface.getBinding(root);
if(_5ed!=null){
_5ed.makeActivationAware(this,_5ea);
}
}
};
RootBinding.prototype.handleCrawler=function(_5ee){
RootBinding.superclass.handleCrawler.call(this,_5ee);
if(_5ee.type==NodeCrawler.TYPE_ASCENDING){
_5ee.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5ef=null;
if(this.bindingWindow.parent){
_5ef=this.bindingWindow.frameElement;
}
return _5ef;
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
var _5f0=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5f0.hasNext()){
var cell=_5f0.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5f2){
var _5f3=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5f2.bindingElement);
_5f3=_5f2;
}else{
_5f3=MatrixBinding.superclass.add.call(this,_5f2);
}
return _5f3;
};
MatrixBinding.prototype.addFirst=function(_5f4){
var _5f5=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5f6=this.shadowTree[MatrixBinding.CENTER];
_5f6.insertBefore(_5f4.bindingElement,_5f6.firstChild);
_5f5=_5f4;
}else{
_5f5=MatrixBinding.superclass.addFirst.call(this,_5f4);
}
return _5f4;
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
MatrixBinding.newInstance=function(_5f8){
var _5f9=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5f8);
return UserInterface.registerBinding(_5f9,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5fa,_5fb){
var list=new List();
var _5fd=new FlexBoxCrawler();
_5fd.mode=_5fb?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5fd.startBinding=_5fa;
_5fd.crawl(_5fa.bindingElement,list);
list.each(function(_5fe){
_5fe.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5ff){
if(Binding.exists(_5ff)){
_5ff.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_600){
if(Binding.exists(_600)){
_600.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5fd.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_601){
FlexBoxBinding.superclass.handleAction.call(this,_601);
switch(_601.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_602){
var _603=0;
var _604=new List(this.bindingElement.parentNode.childNodes);
while(_604.hasNext()){
var _605=_604.getNext();
if(_605.nodeType==Node.ELEMENT_NODE&&_605!=this.bindingElement){
if(!this._isOutOfFlow(_605)){
var rect=_605.getBoundingClientRect();
if(_602){
height+=(rect.right-rect.left);
}else{
_603+=(rect.bottom-rect.top);
}
}
}
}
return _603;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_607){
var _608=CSSComputer.getPosition(_607);
var _609=CSSComputer.getFloat(_607);
return (_608=="absolute"||_609!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _60a=this.bindingElement.parentNode;
var rect=_60a.getBoundingClientRect();
var _60c=rect.bottom-rect.top;
var _60d=CSSComputer.getPadding(_60a);
var _60e=CSSComputer.getBorder(_60a);
_60c-=(_60d.top+_60d.bottom);
_60c-=(_60e.top+_60e.bottom);
return _60c;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _60f=this.bindingElement.parentNode;
var rect=_60f.getBoundingClientRect();
var _611=rect.right-rect.left;
var _612=CSSComputer.getPadding(_60f);
var _613=CSSComputer.getBorder(_60f);
_611-=(_612.left+_612.right);
_611-=(_613.left+_613.right);
return _611;
};
FlexBoxBinding.prototype.setFlexibility=function(_614){
if(_614!=this.isFlexible){
if(_614){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_614;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _615=this._getSiblingsSpan();
_615=this._getCalculatedHeight()-_615;
if(!isNaN(_615)&&_615>=0){
if(_615!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_615)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_616){
if(!this.isFit||_616){
var _617=0;
new List(this.bindingElement.childNodes).each(function(_618){
if(_618.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_618)){
var rect=_618.getBoundingClientRect();
_617+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_617);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_61a){
var _61b=CSSComputer.getPadding(this.bindingElement);
var _61c=CSSComputer.getBorder(this.bindingElement);
_61a+=_61b.top+_61b.bottom;
_61a+=_61c.top+_61c.bottom;
this.bindingElement.style.height=_61a+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_61d){
ScrollBoxBinding.superclass.handleAction.call(this,_61d);
switch(_61d.type){
case BalloonBinding.ACTION_INITIALIZE:
_61d.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_61e){
this.bindingElement.scrollLeft=_61e.x;
this.bindingElement.scrollTop=_61e.y;
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
var _61f=this._getBuildElement("labeltext");
if(_61f){
this.shadowTree.labelText=_61f;
this.shadowTree.text=_61f.firstChild;
this.hasLabel=true;
}
}else{
var _620=this.getProperty("label");
var _621=this.getProperty("image");
var _622=this.getProperty("tooltip");
if(_620){
this.setLabel(_620,false);
}
if(_621){
this.setImage(_621,false);
}
if(_622){
this.setToolTip(_622);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_623,_624){
_623=_623!=null?_623:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_623);
this.setProperty("label",_623);
if(!_624){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_626){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_626){
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
LabelBinding.prototype.setToolTip=function(_629){
this.setProperty("tooltip",_629);
if(_629!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_629));
}
};
LabelBinding.prototype.getToolTip=function(_62a){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_62b){
_62b=_62b==null?true:_62b;
var _62c=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_62b;
if(_62b){
this.attachClassName(_62c);
}else{
this.detachClassName(_62c);
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
var _62d="textonly";
var _62e="imageonly";
var _62f="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_62d);
this.detachClassName(_62e);
this.attachClassName(_62f);
}else{
if(this.hasLabel){
this.detachClassName(_62f);
this.detachClassName(_62e);
this.attachClassName(_62d);
}else{
if(this.hasImage){
this.detachClassName(_62f);
this.detachClassName(_62d);
this.attachClassName(_62e);
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
LabelBinding.newInstance=function(_630){
var _631=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_630);
return UserInterface.registerBinding(_631,LabelBinding);
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
var _632=this.getProperty("label");
if(!_632){
_632=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_632));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_634){
this.setProperty("label",_634);
};
TextBinding.newInstance=function(_635){
var _636=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_635);
return UserInterface.registerBinding(_636,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_637,_638){
BroadcasterBinding.superclass.setProperty.call(this,_637,_638);
function update(list){
if(list){
list.each(function(_63a){
_63a.setProperty(_637,_638);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _63b=this._observers[_637];
if(_63b){
update(_63b);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_63c){
BroadcasterBinding.superclass.deleteProperty.call(this,_63c);
function update(list){
if(list){
list.each(function(_63e){
_63e.deleteProperty(_63c);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _63f=this._observers[_63c];
if(_63f){
update(_63f);
}
};
BroadcasterBinding.prototype.addObserver=function(_640,_641){
_641=_641?_641:"*";
_641=new List(_641.split(" "));
while(_641.hasNext()){
var _642=_641.getNext();
switch(_642){
case "*":
this._setAllProperties(_640);
break;
default:
var _643=this.getProperty(_642);
_640.setProperty(_642,_643);
break;
}
if(!this._observers[_642]){
this._observers[_642]=new List();
}
this._observers[_642].add(_640);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_644){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _647=att.nodeName;
switch(_647){
case "id":
case "key":
break;
default:
var _648=this.getProperty(_647);
_644.setProperty(_647,_648);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_649,_64a){
_64a=_64a?_64a:"*";
_64a=new List(_64a.split(" "));
while(_64a.hasNext()){
var list=this._observers[_64a.getNext()];
if(list){
while(list.hasNext()){
var _64c=list.getNext();
if(_64c==_649){
list.del(_64c);
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
BroadcasterBinding.prototype.setDisabled=function(_64d){
this.setProperty("isdisabled",_64d);
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
var _64f=this.getProperty("width");
var _650=this.getProperty("label");
var type=this.getProperty("type");
var _652=this.getProperty("popup");
var _653=this.getProperty("tooltip");
var _654=this.getProperty("isdisabled");
var _655=this.getProperty("response");
var _656=this.getProperty("oncommand");
var _657=this.getProperty("value");
var _658=this.getProperty("ischecked");
var _659=this.getProperty("callbackid");
var _65a=this.getProperty("focusable");
var _65b=this.getProperty("focused");
var _65c=this.getProperty("default");
var url=this.getProperty("url");
var _65e=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_65e){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_650!=null){
this.setLabel(_650);
}
if(type!=null){
this.setType(type);
}
if(_653!=null){
this.setToolTip(_653);
}
if(_64f!=null){
this.setWidth(_64f);
}
if(_652!=null){
this.setPopup(_652);
}
if(_655!=null){
this.response=_655;
}
if(_658==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_656!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_656,this);
};
}
if(_65a||this.isFocusable){
this._makeFocusable();
if(_65c||this.isDefault){
this.isDefault=true;
}
if(_65b){
this.focus();
}
}
if(_654==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_659!=null){
this.bindingWindow.DataManager.registerDataBinding(_659,this);
if(_657!=null){
Binding.dotnetify(this,_657);
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
ButtonBinding.prototype.setImage=function(_65f){
if(this.isAttached){
this.labelBinding.setImage(_65f);
}
this.setProperty("image",_65f);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_660){
if(this.isAttached){
this.labelBinding.setLabel(_660);
}
this.setProperty("label",_660);
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
ButtonBinding.prototype.setToolTip=function(_662){
this.setProperty("tooltip",_662);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_662));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_663){
this.imageProfile=new _663(this);
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
ButtonBinding.prototype.flip=function(_668){
_668=_668==null?true:_668;
this.isFlipped=_668;
this.setProperty("flip",_668);
if(this.isAttached){
this.labelBinding.flip(_668);
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
ButtonBinding.prototype.check=function(_669){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_669==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_66a){
this.isActive=true;
this.isChecked=true;
if(!_66a){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_66b){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_66b==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_66c){
this.isActive=false;
this.isChecked=false;
if(!_66c){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_66d,_66e){
if(_66d==null){
_66d==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_66d){
case true:
this.check(_66e);
break;
case false:
this.uncheck(_66e);
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
var _670=this.getProperty("tooltip");
if(_670){
this.setToolTip(_670);
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
var _671=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_671=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _671;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _673=this.getEqualSizeWidth();
if(goal>_673){
var diff=goal-_673;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _676=null;
if(this.isAttached==true){
var _677=CSSComputer.getPadding(this.bindingElement);
var _678=CSSComputer.getPadding(this.bindingElement);
_676=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_676=_676+_677.left+_677.right;
_676=_676+_678.left+_678.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _676;
};
ButtonBinding.prototype.setWidth=function(_679){
if(this.isAttached==true){
var _67a=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _67b=CSSComputer.getPadding(this.shadowTree.c);
var _67c=_679-_67a;
_67c=_67c-_67b.left-_67b.right;
this.shadowTree.c.style.width=String(_67c)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_67c-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_679);
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
ButtonBinding.prototype.setValue=function(_67d){
this.shadowTree.dotnetinput.value=_67d;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_67e){
this.setValue(_67e);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_67f){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_67f;
this.imageProfile=_67f.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_680){
var _681=_680?"addEventListener":"removeEventListener";
this.binding[_681](DOMEvents.MOUSEENTER,this);
this.binding[_681](DOMEvents.MOUSELEAVE,this);
this.binding[_681](DOMEvents.MOUSEDOWN,this);
this.binding[_681](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _683=false,_684=false,_685=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_685=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_685=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_685=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_685=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_685==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_683=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_685=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_685=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_685=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_685=ButtonStateManager.STATE_NORMAL;
var _686=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_686 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_685=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_685==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_684=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_685=ButtonStateManager.STATE_NORMAL;
_683=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_685=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_685=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_685=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_685=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_685==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_683=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_685=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_685=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_685=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_685=ButtonStateManager.STATE_NORMAL;
_683=true;
break;
}
}
}
}
}
switch(_685){
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
if(_683){
this.binding.fireCommand();
}
if(_684){
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
var _68a=this.imageProfile.getDisabledImage();
if(_68a){
this.binding.setImage(_68a);
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
ClickButtonBinding.newInstance=function(_68b){
var _68c=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_68b);
return UserInterface.registerBinding(_68c,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_68d){
var _68e=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_68d);
return UserInterface.registerBinding(_68e,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_68f){
var _690=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_68f);
return UserInterface.registerBinding(_690,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_691){
this._binding=_691;
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
var _692=this.getDescendantBindingsByLocalName("control");
_692.each(function(_693){
_693.setControlType(_693.controlType);
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
ControlGroupBinding.newInstance=function(_695){
var _696=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_695);
return UserInterface.registerBinding(_696,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_699){
ControlBinding.superclass.handleAction.call(this,_699);
switch(_699.type){
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
function ControlImageProfile(_69a){
this.binding=_69a;
}
ControlImageProfile.prototype._getImage=function(_69b){
var _69c=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_69c=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_69c=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_69c=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_69c=this.constructor.IMAGE_CLOSE;
break;
}
return _69c.replace("${string}",_69b);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _69d=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_69d=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _69d?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_69e){
ControlBoxBinding.superclass.handleAction.call(this,_69e);
switch(_69e.type){
case ControlBinding.ACTION_COMMAND:
var _69f=_69e.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_69f);
Application.unlock(self);
},0);
_69e.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_6a1){
switch(_6a1.controlType){
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
ControlBoxBinding.prototype.setState=function(_6a2){
var _6a3=this.getState();
this.setProperty("state",_6a2);
this.detachClassName(_6a3);
this.attachClassName(_6a2);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _6a4=this.getProperty("state");
if(!_6a4){
_6a4=ControlBoxBinding.STATE_NORMAL;
}
return _6a4;
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
MenuContainerBinding.prototype.isOpen=function(_6a5){
var _6a6=null;
if(!_6a5){
_6a6=this._isOpen;
}else{
_6a6=(_6a5==this._openElement);
}
return _6a6;
};
MenuContainerBinding.prototype.setOpenElement=function(_6a7){
if(_6a7){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6a7;
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
var _6a8=this.getChildBindingByLocalName("menupopup");
if(_6a8&&_6a8!=this.menuPopupBinding){
this.menuPopupBinding=_6a8;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6a9=this.getMenuContainerBinding();
_6a9.setOpenElement(this);
var _6aa=this.getMenuPopupBinding();
_6aa.snapTo(this.bindingElement);
_6aa.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6ab){
MenuContainerBinding.superclass.handleAction.call(this,_6ab);
if(_6ab.type==PopupBinding.ACTION_HIDE){
var _6ac=this.getMenuContainerBinding();
_6ac.setOpenElement(false);
this.reset();
_6ab.consume();
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
MenuBarBinding.prototype.handleAction=function(_6ad){
MenuBarBinding.superclass.handleAction.call(this,_6ad);
switch(_6ad.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6ae=_6ad.target;
var _6af=this.getChildBindingsByLocalName("menu");
while(_6af.hasNext()){
var menu=_6af.getNext();
}
switch(_6ae.arrowKey){
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
var _6b1=this.getProperty("image");
var _6b2=this.getProperty("label");
var _6b3=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6b2){
this.setLabel(_6b2);
}
if(_6b1){
this.setImage(_6b1);
}
if(_6b3){
this.setToolTip(_6b3);
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
MenuBinding.prototype.setLabel=function(_6b5){
this.setProperty("label",_6b5);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6b5));
}
};
MenuBinding.prototype.setToolTip=function(_6b6){
this.setProperty("tooltip",_6b6);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6b6));
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
var _6b8=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6b8.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6b8.isOpen()&&!_6b8.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6b8.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6b8.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6b9,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6b9){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6be){
switch(_6be.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6bf=null;
var _6c0=true;
self._lastFocused.focus();
self.grabKeyboard();
_6be.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6c2){
for(var key in this._focused){
if(key!=_6c2.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6c2.key]=_6c2;
this._lastFocused=_6c2;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6c5){
delete this._focused[_6c5.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6c6){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6c6);
}
if(_6c6){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6c9=this.getChildBindingsByLocalName("menugroup");
var _6ca=null;
var _6cb=null;
while(_6c9.hasNext()){
var _6cc=_6c9.getNext();
if(!_6cc.isDefaultContent){
_6cc.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6ca&&_6cc.isVisible){
_6ca=_6cc;
}
if(_6cc.isVisible){
_6cb=_6cc;
}
}
}
if(_6ca&&_6cb){
_6ca.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6cb.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6cd){
MenuBodyBinding.activeInstance=this;
if(_6cd){
var _6ce=this._getMenuItems().getFirst();
if(_6ce){
_6ce.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6cf=this._lastFocused;
if((_6cf!=null)&&(!_6cf.isMenuContainer)){
_6cf.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6d1=this._getMenuItems();
var _6d2=null;
var next=null;
if(this._lastFocused){
_6d2=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6d1.getPreceding(_6d2);
break;
case KeyEventCodes.VK_DOWN:
next=_6d1.getFollowing(_6d2);
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
next=_6d1.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6d5=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6d6){
_6d5=_6d6.getChildBindingsByLocalName("menuitem");
_6d5.each(function(item){
list.add(item);
});
});
_6d5=this.getChildBindingsByLocalName("menuitem");
_6d5.each(function(item){
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
MenuBodyBinding.newInstance=function(_6d9){
var _6da=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6d9);
return UserInterface.registerBinding(_6da,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6db){
switch(_6db){
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
MenuGroupBinding.newInstance=function(_6dc){
var _6dd=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6dc);
return UserInterface.registerBinding(_6dd,MenuGroupBinding);
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
var _6de=this.getProperty("image");
var _6df=this.getProperty("image-hover");
var _6e0=this.getProperty("image-active");
var _6e1=this.getProperty("image-disabled");
if(!this.image&&_6de){
this.image=_6de;
}
if(!this.imageHover&&_6df){
this.imageHover=_6de;
}
if(!this.imageActive&&_6e0){
this.imageActive=_6e0;
}
if(!this.imageDisabled&&_6e1){
this.imageDisabled=_6e1;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6e2=this.getProperty("label");
var _6e3=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6e5=this.getProperty("isdisabled");
var _6e6=this.getProperty("image");
var _6e7=this.getProperty("image-hover");
var _6e8=this.getProperty("image-active");
var _6e9=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6ea=this.getMenuPopupBinding();
if(_6ea){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6e6){
this.image=_6e6;
}
if(!this.imageHover&&_6e7){
this.imageHover=_6e6;
}
if(!this.imageActive&&_6e8){
this.imageActive=_6e8;
}
if(!this.imageDisabled&&_6e9){
this.imageDisabled=_6e9;
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
if(_6e2!=null){
this.setLabel(_6e2);
}
if(_6e3){
this.setToolTip(_6e3);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6e5==true){
this.disable();
}
var _6eb=this.getProperty("oncommand");
if(_6eb){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6eb);
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
MenuItemBinding.prototype.setLabel=function(_6ee){
this.setProperty("label",_6ee);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6ee));
}
};
MenuItemBinding.prototype.setToolTip=function(_6ef){
this.setProperty("tooltip",_6ef);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6ef));
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
var _6f1=this.bindingDocument.createElement("div");
_6f1.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6f1.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6f2=this.labelBinding.bindingElement;
_6f2.insertBefore(_6f1,_6f2.firstChild);
_6f1.style.display="none";
this.shadowTree.checkBoxIndicator=_6f1;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6f1=this.bindingDocument.createElement("div");
_6f1.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6f1.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6f2=this.labelBinding.bindingElement;
_6f2.insertBefore(_6f1,_6f2.firstChild);
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
var _6f4=this.imageProfile.getDisabledImage();
if(_6f4){
this.setImage(_6f4);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6f4=this.imageProfile.getDefaultImage();
if(_6f4){
this.setImage(_6f4);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6f6=this.getMenuContainerBinding();
if(_6f6.isOpen()&&!_6f6.isOpen(this)){
_6f6._openElement.hide();
_6f6.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6f6=this.getMenuContainerBinding();
if(!_6f6.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6f8){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6f9=this.getMenuContainerBinding();
if(!_6f9||!_6f9.isOpen(this)||_6f8){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6fa){
this.setChecked(true,_6fa);
};
MenuItemBinding.prototype.uncheck=function(_6fb){
this.setChecked(false,_6fb);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6fc,_6fd){
this.setProperty("ischecked",_6fc);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6fc){
this.isChecked=_6fc;
this.shadowTree.checkBoxIndicator.style.display=_6fc?"block":"none";
if(!_6fd){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6fe){
var _6ff=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6fe);
UserInterface.registerBinding(_6ff,MenuItemBinding);
return UserInterface.getBinding(_6ff);
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
PopupBinding.handleBroadcast=function(_700,arg){
switch(_700){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _704=PopupBinding.activeInstances.get(key);
var _705=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_704);
if(!_705){
list.add(_704);
}
});
list.each(function(_706){
_706.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _708=PopupBinding.activeInstances.get(key);
_708.hide();
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
var _709=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _70a=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_709){
this._bodyBinding=UserInterface.getBinding(_709);
}else{
if(_70a){
this._bodyBinding=UserInterface.getBinding(_70a);
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
var _70b=this.getProperty("position");
this.position=_70b?_70b:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_70c){
var _70d=null;
if(this._bodyBinding){
this._bodyBinding.add(_70c);
_70d=_70c;
}else{
_70d=PopupBinding.superclass.add.call(this,_70c);
}
return _70d;
};
PopupBinding.prototype.addFirst=function(_70e){
var _70f=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_70e);
_70f=_70e;
}else{
_70f=PopupBinding.superclass.addFirst.call(this,_70e);
}
return _70f;
};
PopupBinding.prototype.handleAction=function(_710){
PopupBinding.superclass.handleAction.call(this,_710);
var _711=_710.target;
switch(_710.type){
case Binding.ACTION_ATTACHED:
if(_711 instanceof MenuItemBinding){
this._count(true);
_710.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_711 instanceof MenuItemBinding){
this._count(false);
_710.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_712){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_712?1:-1);
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
PopupBinding.prototype.snapTo=function(_713){
var _714=this._getElementPosition(_713);
switch(this.position){
case PopupBinding.POSITION_TOP:
_714.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_714.x+=_713.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_714.y+=_713.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_714.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_713;
this.bindingElement.style.display="block";
this.setPosition(_714.x,_714.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_716){
this.bindingElement.style.display="block";
this.setPosition(_716.x,_716.y);
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
PopupBinding.prototype._getElementPosition=function(_71b){
return _71b.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_71b):DOMUtil.getUniversalPosition(_71b);
};
PopupBinding.prototype._getMousePosition=function(e){
var _71d=DOMEvents.getTarget(e);
return _71d.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
this.dispatchAction(Binding.ACTION_POSITIONCHANGED);
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
}
};
PopupBinding.prototype._makeVisible=function(_71e){
var _71f=this.bindingElement;
if(_71e){
if(Client.hasTransitions){
_71f.style.visibility="visible";
_71f.style.opacity="1";
}else{
_71f.style.visibility="visible";
}
}else{
_71f.style.visibility="hidden";
_71f.style.display="none";
if(Client.hasTransitions){
_71f.style.opacity="0";
}
}
this.isVisible=_71e;
};
PopupBinding.prototype._enableTab=function(_720){
var self=this;
var _722=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_722.each(function(_723){
_723.bindingElement.tabIndex=_720?0:-1;
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
var _72b=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_72b.y<0){
y=-_72b.y;
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
PopupBinding.prototype.grabKeyboard=function(_72d){
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
var _733=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_733=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _733;
};
PopupBinding.prototype.clear=function(){
var _734=this._bodyBinding;
if(_734){
_734.detachRecursive();
_734.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_735){
var _736=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_735);
return UserInterface.registerBinding(_736,PopupBinding);
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
PopupBodyBinding.newInstance=function(_738){
var _739=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_738);
return UserInterface.registerBinding(_739,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_73a){
return new Point(_73a.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_73b){
var _73c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_73b);
return UserInterface.registerBinding(_73c,MenuPopupBinding);
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
var _73d=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_73d){
this._body=UserInterface.getBinding(_73d);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _73e=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_73e.hasNext()){
var _73f=DialogBorderBinding.newInstance(this.bindingDocument);
_73f.setType(_73e.getNext());
this.add(_73f);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _740=this.getProperty("controls");
if(_740){
var _741=new List(_740.split(" "));
while(_741.hasNext()){
var type=_741.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _743=DialogControlBinding.newInstance(this.bindingDocument);
_743.setControlType(type);
this._titlebar.addControl(_743);
this.controlBindings[type]=_743;
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
var _744=this.getProperty("image");
var _745=this.getProperty("label");
var _746=this.getProperty("draggable");
var _747=this.getProperty("resizable");
var _748=this.getProperty("modal");
if(_744){
this.setImage(_744);
}
if(_745){
this.setLabel(_745);
}
if(_746==false){
this.isDialogDraggable=false;
}
if(_747==false){
this.isPanelResizable=false;
}
if(_748==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_749){
this.isModal=_749;
};
DialogBinding.prototype.setLabel=function(_74a){
this.setProperty("label",_74a);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_74a));
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
DialogBinding.prototype.handleAction=function(_74c){
DialogBinding.superclass.handleAction.call(this,_74c);
switch(_74c.type){
case Binding.ACTION_DRAG:
var _74d=_74c.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_74d.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_74d.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_74d;
_74d.dragger.registerHandler(this);
}
break;
}
}
_74c.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_74c.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_74e,arg){
DialogBinding.superclass.handleBroadcast.call(this,_74e,arg);
switch(_74e){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_750){
DialogBinding.superclass.handleInvokedControl.call(this,_750);
switch(_750.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_751){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_751){
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
var _753=self.bindingElement;
setTimeout(function(){
_753.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_754){
this.bindingElement.style.zIndex=new String(_754);
};
DialogBinding.prototype.onDragStart=function(_755){
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
DialogBinding.prototype.setResizable=function(_767){
if(this._isResizable!=_767){
if(_767){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_767;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _768=null;
var _769=this.bindingDocument.body.offsetWidth;
var _76a=this.bindingDocument.body.offsetHeight;
_768={x:0.125*_769,y:0.125*_76a,w:0.75*_769,h:0.5*_76a};
return _768;
};
DialogBinding.prototype.centerOnScreen=function(){
var _76b=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_76b.w-dim.w),0.5*(_76b.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _76d=this;
var i=0;
function blink(){
if(i%2==0){
_76d.detachClassName("active");
}else{
_76d.attachClassName("active");
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
var _771="";
while(list.hasNext()){
var type=list.getNext();
_771+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_771);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_772){
var _773=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_772);
return UserInterface.registerBinding(_773,DialogBinding);
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
DialogHeadBinding.newInstance=function(_774){
var _775=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_774);
return UserInterface.registerBinding(_775,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_778){
var _779=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_778);
return UserInterface.registerBinding(_779,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_77a){
var _77b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_77a);
return UserInterface.registerBinding(_77b,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_77c){
DialogSetBinding.superclass.handleAction.call(this,_77c);
var _77d=_77c.target;
switch(_77c.type){
case Binding.ACTION_MOVETOTOP:
if(_77d instanceof DialogBinding){
this._moveToTop(_77d);
}
break;
case Binding.ACTION_MOVEDONTOP:
_77c.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_77e){
var _77f=0;
var _780=this.getChildBindingsByLocalName("dialog");
_780.each(function(_781){
var _782=_781.getZIndex();
_77f=_782>_77f?_782:_77f;
});
_77e.setZIndex(_77f+2);
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
DialogBorderBinding.newInstance=function(_784){
var _785=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_784);
return UserInterface.registerBinding(_785,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_786){
this._dialogBinding=_786;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_788){
DialogCoverBinding.superclass.handleAction.call(this,_788);
var _789=_788.target;
if(this._dialogBinding.isModal){
switch(_788.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_789==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_789.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_78a,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_78a,arg);
switch(_78a){
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
var _78d=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_78d);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _78e=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_78e);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_78f){
var _790=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_78f);
return UserInterface.registerBinding(_790,DialogCoverBinding);
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
var _791=this.getProperty("image");
if(_791){
this.setImage(_791);
}
var _792=this.getProperty("label");
if(_792){
this.setLabel(_792);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_793){
if(this.isAttached){
this.labelBinding.setLabel(_793);
}
this.setProperty("label",_793);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_795){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_795);
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
DialogTitleBarBinding.newInstance=function(_796){
var _797=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_796);
return UserInterface.registerBinding(_797,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_798){
var _799=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_798);
return UserInterface.registerBinding(_799,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_79a){
var _79b=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_79a);
return UserInterface.registerBinding(_79b,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_79c){
this.binding=_79c;
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
var _79f=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _7a0=node.nodeName.toLowerCase();
switch(_7a0){
case "script":
case "style":
case "textarea":
_79f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _79f;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a7=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a7=false;
}
return _7a7;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7a8,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7a8,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7ac=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7ac+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7b2){
var _7b3="";
var _7b4="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b5="</span>";
var self=this;
function iterate(_7b7){
var _7b8=-1;
var _7b9=null;
self._map.each(function(key,exp){
var low=_7b7.toLowerCase();
var _7bd=low.search(exp);
if(_7bd>-1){
if(_7b8==-1){
_7b8=_7bd;
}
if(_7bd<=_7b8){
_7b8=_7bd;
_7b9=key;
}
}
});
if(_7b8>-1&&_7b9!=null){
var pre=_7b7.substring(0,_7b8);
var hit=_7b7.substring(_7b8,_7b8+_7b9.length);
var pst=_7b7.substring(_7b8+_7b9.length,_7b7.length);
_7b3+=pre+_7b4+hit+_7b5;
iterate(pst);
}else{
_7b3+=_7b7;
}
}
iterate(_7b2);
return _7b3;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7c1){
var _7c2=new List(_7c1.getElementsByTagName("span"));
_7c2.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7c1.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c5){
var _7c6=null;
if(_7c5.isAttached){
var doc=_7c5.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c6=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c6 instanceof SOAPFault){
_7c6=null;
}
}
}
return _7c6;
};
WindowBinding.highlightKeywords=function(_7ca,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7ca.isAttached){
var doc=_7ca.getContentDocument();
if(doc!=null){
var _7cd=WindowBinding._highlightcrawler;
_7cd.reset(doc.body);
if(list!=null){
_7cd.setKeys(list);
_7cd.crawl(doc.body);
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
var _7ce=WindowBinding.superclass.serialize.call(this);
if(_7ce){
_7ce.url=this.getURL();
}
return _7ce;
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
var _7d0=this.getContentWindow().DocumentManager;
if(_7d0!=null){
_7d0.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7d1){
WindowBinding.superclass.handleAction.call(this,_7d1);
var _7d2=_7d1.target;
switch(_7d1.type){
case RootBinding.ACTION_PHASE_3:
if(_7d2.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7d2);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7d1.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7d3){
if(!this.isFit||_7d3){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7d4){
if(this._pageBinding==null){
if(_7d4.bindingWindow==this.getContentWindow()){
this._pageBinding=_7d4;
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
WindowBinding.prototype._registerOnloadListener=function(_7d5){
var _7d6=this.shadowTree.iframe;
var _7d7=_7d5?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7da=true;
if(Client.isExplorer){
_7da=_7d6.readyState=="complete";
}
if(_7da==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d7](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7db){
var _7dc=_7db?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7dc](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7e0=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7e0=url;
}
return _7e0;
};
WindowBinding.prototype.reload=function(_7e2){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7e3=null;
if(this.shadowTree.iframe!=null){
_7e3=this.shadowTree.iframe;
}
return _7e3;
};
WindowBinding.prototype.getContentWindow=function(){
var _7e4=null,_7e5=this.getFrameElement();
if(_7e5!==null){
try{
_7e4=_7e5.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7e4;
};
WindowBinding.prototype.getContentDocument=function(){
var _7e6=null,win=this.getContentWindow();
if(win){
_7e6=win.document;
}
return _7e6;
};
WindowBinding.prototype.getRootBinding=function(){
var _7e8=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7e8=UserInterface.getBinding(doc.body);
}
return _7e8;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7ea){
this.bindingElement.style.height=_7ea+"px";
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
WindowBinding.prototype.handleCrawler=function(_7eb){
WindowBinding.superclass.handleCrawler.call(this,_7eb);
if(_7eb.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7eb.nextNode=root.bindingElement;
}else{
_7eb.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7f0){
var _7f1=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7f0);
var _7f2=UserInterface.registerBinding(_7f1,WindowBinding);
return _7f2;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f6){
_7f6.target.show();
_7f6.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f8){
_7f8.target.show();
_7f8.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7fa){
PreviewWindowBinding.superclass.handleAction.call(this,_7fa);
switch(_7fa.type){
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
var _7fb=null;
this._getRadioButtonBindings().each(function(_7fc){
if(_7fc.getProperty("ischecked")){
_7fb=_7fc;
return false;
}else{
return true;
}
});
if(_7fb){
this._checkedRadioBinding=_7fb;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7fd){
RadioGroupBinding.superclass.handleAction.call(this,_7fd);
var _7fe=_7fd.target;
switch(_7fd.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7fd.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7fe.isRadioButton&&!_7fe.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7fe);
}
this._checkedRadioBinding=_7fe;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7fd.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7ff,_800){
if(_7ff instanceof RadioDataBinding){
_7ff=_7ff.getButton();
}
if(_7ff.isRadioButton){
switch(_800){
case true:
this._unCheckRadioBindingsExcept(_7ff);
this._checkedRadioBinding=_7ff;
_7ff.check(true);
break;
default:
_7ff.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_801){
var _802=this._getRadioButtonBindings();
_802.each(function(_803){
if(_803.isChecked&&_803!=_801){
_803.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _804=new Crawler();
var list=new List();
_804.addFilter(function(_806){
var _807=true;
var _808=UserInterface.getBinding(_806);
if(_808 instanceof RadioGroupBinding){
_807=NodeCrawler.SKIP_CHILDREN;
}else{
if(_808 instanceof ButtonBinding&&_808.isRadioButton){
list.add(_808);
}
}
return _807;
});
_804.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_809){
var _80a=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_809);
return UserInterface.registerBinding(_80a,RadioGroupBinding);
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
var _80c=this.getProperty("regexrule");
if(_80c!=null){
this.expression=new RegExp(_80c);
}
var _80d=this.getProperty("onbindingblur");
if(_80d!=null){
this.onblur=function(){
Binding.evaluate(_80d,this);
};
}
var _80e=this.getProperty("onvaluechange");
if(_80e!=null){
this.onValueChange=function(){
Binding.evaluate(_80e,this);
};
}
if(this.error==null&&this.type!=null){
var _80f=DataBinding.errors[this.type];
if(_80f!=null){
this.error=_80f;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _810=this.getProperty("value");
if(_810!=null){
this.setValue(String(_810));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _812=this.getProperty("isdisabled");
if(_812==true){
this.setDisabled(true);
}
var _813=this.getProperty("readonly");
if(_813==true){
this.setReadOnly(true);
}
var _814=this.getProperty("autoselect");
if(_814==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _815=Localization.currentLang();
if(_815!=null){
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
var _816=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_816.type=this.isPassword==true?"password":"text";
_816.tabIndex=-1;
return _816;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_819){
if(_819){
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
DataInputBinding.prototype.handleBroadcast=function(_81c,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_81c,arg);
var self=this;
switch(_81c){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _81f=DOMEvents.getTarget(arg);
if(_81f!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_820){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_820){
var self=this,_822=this.bindingElement,_823={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_822,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_822,DOMEvents.MOUSEUP,_823);
}else{
this.select();
}
}
this.onfocus();
if(!_820){
var _824=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_824);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _825=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _826=_825.createTextRange();
_826.moveStart("character",0);
_826.moveEnd("character",_825.value.length);
_826.select();
}else{
_825.setSelectionRange(0,_825.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_827){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_827){
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
DataInputBinding.prototype.validate=function(_82b){
if(_82b==true||this._isValid){
var _82c=this.isValid();
if(_82c!=this._isValid){
this._isValid=_82c;
if(!_82c){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _82d=null;
if(this._isInvalidBecauseRequired==true){
_82d=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_82d=DataBinding.warnings["minlength"];
_82d=_82d.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_82d=DataBinding.warnings["maxlength"];
_82d=_82d.replace("${count}",String(this.maxlength));
}else{
_82d=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_82d!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_82d);
}
}else{
this.setValue(_82d);
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
var _82e=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _82f=this.getValue();
if(_82f==""){
if(this.isRequired==true){
_82e=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _830=DataBinding.expressions[this.type];
if(!_830.test(_82f)){
_82e=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_82f)){
_82e=false;
}
}
}
}
if(_82e&&this.minlength!=null){
if(_82f.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_82e=false;
}
}
if(_82e&&this.maxlength!=null){
if(_82f.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_82e=false;
}
}
return _82e;
};
DataInputBinding.prototype.setDisabled=function(_831){
if(_831!=this.isDisabled){
if(_831){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _832=this.shadowTree.input;
if(_831){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_832,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_832,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_831;
this.shadowTree.input.unselectable=_831?"on":"off";
}
this.isDisabled=_831;
this.isFocusable=!_831;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_834){
if(_834!=this.isReadOnly){
if(_834){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_834;
this.isReadOnly=_834;
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
DataInputBinding.prototype.handleElement=function(_835){
return true;
};
DataInputBinding.prototype.updateElement=function(_836){
var _837=_836.getAttribute("value");
var _838=_836.getAttribute("type");
var _839=_836.getAttribute("maxlength");
var _83a=_836.getAttribute("minlength");
if(_837==null){
_837="";
}
var _83b=this.bindingWindow.UpdateManager;
if(this.getValue()!=_837){
_83b.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_837);
}
if(this.type!=_838){
_83b.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_838;
}
if(this.maxlength!=_839){
_83b.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_839;
}
if(this.minlength!=_83a){
_83b.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_83a;
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
DataInputBinding.prototype.setValue=function(_83c){
if(_83c===null){
_83c="";
}
if(_83c!=this.getValue()){
this.setProperty("value",_83c);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_83c);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _83d=null;
if(this.shadowTree.input!=null){
_83d=this.shadowTree.input.value;
}else{
_83d=this.getProperty("value");
}
return _83d;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _83f=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_83f=Number(_83f);
break;
}
return _83f;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_840){
var _841=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_840);
return UserInterface.registerBinding(_841,DataInputBinding);
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
var _842=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_842!=null){
this.setValue(_842.value);
_842.parentNode.removeChild(_842);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _843=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_843.tabIndex=-1;
return _843;
};
TextBoxBinding.prototype.handleElement=function(_844){
return true;
};
TextBoxBinding.prototype.updateElement=function(_845){
var _846,area=_845.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_846=DOMUtil.getTextContent(area);
}
if(_846==null){
_846="";
}
var _848=this.bindingWindow.UpdateManager;
if(this.getValue()!=_846){
_848.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_846);
}
var _849=_845.getAttribute("type");
if(this.type!=_849){
_848.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_849;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_84d){
var _84e=this.bindingDocument.selection.createRange();
var _84f=_84e.text=="";
if(_84f&&!_84d){
_84e.text="\t";
}else{
var text="";
var _851=_84e.text.length;
while((_84e.moveStart("word",-1)&&_84e.text.charAt(1)!="\n")){
}
_84e.moveStart("character",1);
var _852=0;
var i=0,line,_855=_84e.text.split("\n");
while((line=_855[i++])!=null){
if(_84d){
line=line.replace(/^(\s)/mg,"");
_852++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_855[i+1]?"\n":"");
}
_84e.text=text;
_84e.moveStart("character",-_851);
if(_84d){
_84e.moveStart("character",2*_855.length-2);
}
_84e.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _856=this.bindingDocument.selection.createRange();
var _857=_856.duplicate();
while((_857.moveStart("word",-1)&&_857.text.indexOf("\n")==-1)){
}
_857.moveStart("character",1);
_856.text="\n"+_857.text.match(/^(\s)*/)[0]+"!";
_856.moveStart("character",-1);
_856.select();
_856.text="";
_856.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_858){
var _859;
var _85a;
var oss;
var osy;
var i;
var fnd;
var _85f=this._getSelectedText();
var el=this.shadowTree.input;
_859=el.scrollLeft;
_85a=el.scrollTop;
if(!_85f.match(/\n/)){
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
_85f=this._getSelectedText();
if(_858){
ntext=_85f.replace(/^(\s)/mg,"");
}else{
ntext=_85f.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_85f.length);
}
el.scrollLeft=_859;
el.scrollTop=_85a;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _861;
var _862;
var oss;
var osy;
var el=this.shadowTree.input;
_861=el.scrollLeft;
_862=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_861;
el.scrollTop=_862;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _869=this.shadowTree.input.value;
var _86a=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _869.substr(_86a,end-_86a);
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
var _86c=this.getProperty("isdisabled");
if(this.isDisabled||_86c){
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
var _86e=this.getProperty("label");
var _86f=this.getProperty("value");
var _870=this.getProperty("width");
var _871=this.getProperty("onchange");
var _872=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_86e!=null){
this.label=_86e;
}
if(!this.value&&_86f!=null){
this.value=_86f;
}
if(!this.width&&_870){
this.width=_870;
}
if(_872){
this.isRequired=true;
}
if(_871){
this.onValueChange=function(){
Binding.evaluate(_871,this);
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
var _873=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_873.name=this.getName();
_873.value=this.getValue();
_873.type="hidden";
if(this.hasCallBackID()){
_873.id=this.getCallBackID();
}
this.shadowTree.input=_873;
this.bindingElement.appendChild(_873);
};
SelectorBinding.prototype.buildButton=function(){
var _874=this.BUTTON_IMPLEMENTATION;
var _875=this.add(_874.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_875.imageProfile=this.imageProfile;
}
if(this.width!=null){
_875.setWidth(this.width);
}
this._buttonBinding=_875;
this.shadowTree.button=_875;
_875.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _877=top.app.bindingMap.selectorpopupset;
var doc=_877.bindingDocument;
var _879=_877.add(PopupBinding.newInstance(doc));
var _87a=_879.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_879;
this._menuBodyBinding=_87a;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_879.attachClassName("selectorpopup");
_879.addActionListener(PopupBinding.ACTION_SHOW,this);
_879.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_879.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_879);
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
var _87d=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_87d).each(function(_87e){
var _87f=_87e.getAttribute("label");
var _880=_87e.getAttribute("value");
var _881=_87e.getAttribute("selected");
var _882=_87e.getAttribute("image");
var _883=_87e.getAttribute("image-hover");
var _884=_87e.getAttribute("image-active");
var _885=_87e.getAttribute("image-disabled");
var _886=null;
if(_882||_883||_884||_885){
_886=new ImageProfile({image:_882,imageHover:_883,imageActive:_884,imageDisabled:_885});
}
list.add(new SelectorBindingSelection(_87f?_87f:null,_880?_880:null,_881&&_881=="true",_886));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _888=null;
while(list.hasNext()){
var _889=list.getNext();
var item=this.addSelection(_889);
if(_889.isSelected){
this.select(item,true);
}
if(!_888){
_888=item;
}
}
if(!this._selectedItemBinding){
this.select(_888,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_88b,_88c){
var _88d=this.MENUITEM_IMPLEMENTATION;
var _88e=this._menuBodyBinding;
var _88f=_88e.bindingDocument;
var _890=_88d.newInstance(_88f);
_890.imageProfile=_88b.imageProfile;
_890.setLabel(_88b.label);
if(_88b.tooltip!=null){
_890.setToolTip(_88b.tooltip);
}
_890.selectionValue=_88b.value;
_88b.menuItemBinding=_890;
if(_88c){
_88e.addFirst(_890);
this.selections.addFirst(_88b);
}else{
_88e.add(_890);
this.selections.add(_88b);
}
this._isUpToDate=false;
return _890;
};
SelectorBinding.prototype.addSelectionFirst=function(_891){
return this.addSelection(_891,true);
};
SelectorBinding.prototype.clear=function(_892){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_892&&this.defaultSelection!=null){
var _893=this.addSelection(this.defaultSelection);
this.select(_893,true);
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
SelectorBinding.prototype.setDisabled=function(_894){
if(this.isAttached==true){
var _895=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_894?"none":"block";
_895.setDisabled(_894);
}
if(_894){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_896){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_896);
}
};
SelectorBinding.prototype.handleAction=function(_897){
SelectorBinding.superclass.handleAction.call(this,_897);
switch(_897.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_897.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_897.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_897.target);
_897.consume();
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
_897.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_899){
this.select(_899);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _89a=this._buttonBinding.bindingElement.offsetWidth+"px";
var _89b=this._popupBinding.bindingElement;
_89b.style.minWidth=_89a;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _89d=Client.isExplorer?e.keyCode:e.which;
if(_89d==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _89d=Client.isExplorer?e.keyCode:e.which;
if(_89d>=32){
this._buttonBinding.check();
var _89e=String.fromCharCode(_89d);
this._pushSearchSelection(_89e);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_89f){
this._searchString+=_89f.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_8a0){
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
var _8a1=this._menuBodyBinding;
if(_8a1!=null){
var _8a2=this.MENUITEM_IMPLEMENTATION;
var _8a3=_8a1.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8a5=list.getNext();
if(_8a5.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8a5);
}
}
}
this._attachSelections();
var _8a6=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8a7=_8a1.getDescendantBindingsByType(_8a2);
if(_8a7.hasEntries()){
while(_8a7.hasNext()){
var _8a8=_8a7.getNext();
var _8a9=_8a8.labelBinding;
if(_8a9!=null&&_8a9.shadowTree!=null&&_8a9.shadowTree.labelText!=null){
_8a9.shadowTree.labelText.innerHTML=_8a9.shadowTree.labelText.innerHTML.replace(_8a6,"<b>$&</b>");
}
}
_8a7.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8a9=LabelBinding.newInstance(_8a3);
_8a9.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_8a1.add(_8a9);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8a5=list.getNext();
var item=this.addSelection(_8a5);
if(this._selectionValue==_8a5.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8ab,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8ab,arg);
switch(_8ab){
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
SelectorBinding.prototype.select=function(_8ae,_8af){
var _8b0=false;
if(_8ae!=this._selectedItemBinding){
this._selectedItemBinding=_8ae;
_8b0=true;
var _8b1=this._buttonBinding;
this._selectionValue=_8ae.selectionValue;
this._selectionLabel=_8ae.getLabel();
_8b1.setLabel(_8ae.getLabel());
if(_8ae.imageProfile!=null){
_8b1.imageProfile=_8ae.imageProfile;
}
if(_8b1.imageProfile!=null){
_8b1.setImage(this.isDisabled==true?_8b1.imageProfile.getDisabledImage():_8b1.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8af){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8af)){
this.validate();
}
}
return _8b0;
};
SelectorBinding.prototype._relate=function(){
var _8b2=this.getProperty("relate");
if(_8b2){
var _8b3=this.bindingDocument.getElementById(_8b2);
if(_8b3){
var _8b4=UserInterface.getBinding(_8b3);
if(_8b4){
if(this.isChecked){
_8b4.show();
}else{
_8b4.hide();
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
SelectorBinding.prototype.selectByValue=function(_8b5,_8b6){
var _8b7=false;
var _8b8=this._menuBodyBinding;
var _8b9=_8b8.getDescendantElementsByLocalName("menuitem");
while(_8b9.hasNext()){
var _8ba=UserInterface.getBinding(_8b9.getNext());
if(_8ba.selectionValue==_8b5){
_8b7=this.select(_8ba,_8b6);
break;
}
}
return _8b7;
};
SelectorBinding.prototype.getValue=function(){
var _8bb=this._selectionValue;
if(_8bb!=null){
_8bb=String(_8bb);
}
return _8bb;
};
SelectorBinding.prototype.setValue=function(_8bc){
this.selectByValue(String(_8bc),true);
};
SelectorBinding.prototype.getResult=function(){
var _8bd=this._selectionValue;
if(_8bd=="null"){
_8bd=null;
}
if(_8bd){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8bd=Number(_8bd);
break;
}
}
return _8bd;
};
SelectorBinding.prototype.setResult=function(_8be){
this.selectByValue(_8be,true);
};
SelectorBinding.prototype.validate=function(){
var _8bf=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8c0=this.getValue();
if(_8c0==this.defaultSelection.value){
_8bf=false;
}
if(_8bf!=this._isValid){
if(_8bf){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8bf;
}
return _8bf;
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
var _8c1=this._popupBinding;
if(!this._isUpToDate){
_8c1.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8c2,_8c3){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8c2));
return true;
};
SelectorBinding.newInstance=function(_8c4){
var _8c5=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8c4);
return UserInterface.registerBinding(_8c5,SelectorBinding);
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
var _8c8=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8c8){
this.onValueChange=function(){
Binding.evaluate(_8c8,this);
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
SimpleSelectorBinding.prototype.focus=function(_8cb){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8cb){
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
SimpleSelectorBinding.prototype._hack=function(_8cc){
if(Client.isExplorer){
this._select.style.width=_8cc?"auto":this._cachewidth+"px";
if(_8cc){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8cd=true;
if(this.isRequired){
if(this.getValue()==null){
_8cd=false;
}
}
if(_8cd!=this._isValid){
if(_8cd){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8ce=this._select;
var _8cf=_8ce.options[_8ce.selectedIndex];
var text=DOMUtil.getTextContent(_8cf);
_8ce.blur();
_8ce.style.color="#A40000";
_8ce.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8cf,DataBinding.warnings["required"]);
}
_8ce.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8cf,text);
}
};
}
this._isValid=_8cd;
}
return _8cd;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8d1=null;
var _8d2=this._select;
var _8d3=_8d2.options[_8d2.selectedIndex];
var _8d4=true;
if(Client.isExplorer){
var html=_8d3.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8d4=false;
}
}
if(_8d4){
_8d1=_8d3.getAttribute("value");
}
return _8d1;
};
SimpleSelectorBinding.prototype.setValue=function(_8d6){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8d7){
this.setValue(_8d7);
};
SimpleSelectorBinding.newInstance=function(_8d8){
var _8d9=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8d8);
return UserInterface.registerBinding(_8d9,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8da,_8db,_8dc,_8dd,_8de){
this._init(_8da,_8db,_8dc,_8dd,_8de);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8df,_8e0,_8e1,_8e2,_8e3){
if(_8df!=null){
this.label=String(_8df);
}
if(_8e0!=null){
this.value=String(_8e0);
}
if(_8e2!=null){
this.imageProfile=_8e2;
}
if(_8e3!=null){
this.tooltip=_8e3;
}
this.isSelected=_8e1?true:false;
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
var _8e4=this.getProperty("image");
if(_8e4){
this.setImage(_8e4);
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
var _8e7=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8e7.popupBindingTargetElement=this.shadowTree.input;
_8e7.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8e7.attach();
var self=this;
_8e7.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8e7;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8ea=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8ea).each(function(_8eb){
if(_8eb.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8ec=_8eb.getAttribute("value");
var _8ed=_8eb.getAttribute("selected");
var _8ee=_8eb.getAttribute("tooltip");
list.add({value:_8ec?_8ec:null,toolTip:_8ee?_8ee:null,isSelected:(_8ed&&_8ed=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8f0=this._menuBodyBinding;
var _8f1=_8f0.bindingDocument;
while(_8f0.bindingElement.hasChildNodes()){
var node=_8f0.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8f0.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8f3=this.getProperty("emptyentrylabel");
if(_8f3){
var _8f4=MenuItemBinding.newInstance(_8f1);
_8f4.setLabel(_8f3);
_8f4.selectionValue="";
_8f0.add(_8f4);
}
while(list.hasNext()){
var _8f5=list.getNext();
var _8f4=MenuItemBinding.newInstance(_8f1);
_8f4.setLabel(_8f5.label?_8f5.label:_8f5.value);
_8f4.selectionValue=_8f5.value;
if(_8f5.image){
_8f4.setImage(_8f5.image);
}
if(_8f5.toolTip){
_8f4.setToolTip(_8f5.toolTip);
}
if(_8f5.isSelected){
this.select(_8f4,true);
}
_8f0.add(_8f4);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8f6){
this.select(_8f6);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8f7,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8f7,arg);
switch(_8f7){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8f7,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8f9){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8f9);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8fa){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8fa);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8fb=this.bindingElement.offsetWidth+"px";
var _8fc=this._popupBinding.bindingElement;
_8fc.style.minWidth=_8fb;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8fd=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8fe=this.getValue();
var _8ff=null;
_8fd.each(function(item){
if(item.getLabel()==_8fe){
_8ff=item;
}
});
if(_8ff){
_8ff.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_902){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_902){
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
DataInputSelectorBinding.prototype.setValue=function(_903){
var _904=this.isReadOnly;
var _905=null;
if(_903!=null&&_903!=""){
var _906=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_906.hasNext()){
var item=_906.getNext();
if(item.selectionValue==_903){
_905=item.getLabel();
break;
}
}
}
if(_905!=null){
this.value=_903;
this.shadowTree.input.value=_905;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_903);
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
var _909="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_909);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_909);
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
var _90b=ToolBarButtonBinding.newInstance(this.bindingDocument);
_90b.setImage("${icon:popup}");
this.addFirst(_90b);
_90b.attach();
var self=this;
_90b.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _90d=self.getProperty("handle");
var _90e=ViewDefinition.clone(_90d,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_90e instanceof DialogViewDefinition){
_90e.handler={handleDialogResponse:function(_90f,_910){
self._isButtonClicked=false;
if(_90f==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _911=_910.getFirst();
self.setValue(_911);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_90e.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_90e);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_90b.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_90b;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _913=this._dialogButtonBinding;
if(_913!=null){
_913.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _915=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_915=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _915;
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
var _918=ToolBarButtonBinding.newInstance(this.bindingDocument);
_918.setImage("${icon:editor-sourceview}");
_918.bindingElement.style.left="-24px";
_918.bindingElement.style.width="24px";
this.addFirst(_918);
_918.attach();
_918.hide();
var self=this;
_918.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_918;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_919){
UrlInputDialogBinding.superclass.setValue.call(this,_919);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_919);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _91a=TreeService.GetCompositeUrlLabel(_919);
if(_91a!=_919){
this.setLabel(_91a);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_91b){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_91b;
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
var _91c=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _91d=this.getProperty("image");
if(_91d!=null){
_91c.setImage(_91d);
}else{
_91c.setImage("${icon:popup}");
}
this.addFirst(_91c);
_91c.attach();
var self=this;
_91c.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_91c;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _91f=this._dialogButtonBinding;
if(_91f!=null){
_91f.oncommand();
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
var _920=this.getProperty("label");
var _921=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_920!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_920+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_920);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_921!=null){
this._buttonBinding.setToolTip(_921);
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
DataDialogBinding.prototype.handleAction=function(_923){
DataDialogBinding.superclass.handleAction.call(this,_923);
var _924=_923.target;
var self=this;
switch(_923.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_926,_927){
if(_926==Dialog.RESPONSE_ACCEPT){
if(_927 instanceof DataBindingMap){
self._map=_927;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_924==this._buttonBinding){
_923.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_928,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_928,arg);
switch(_928){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _92b=this.getProperty("handle");
var url=this.getURL();
var _92d=null;
if(_92b!=null||def!=null){
if(def!=null){
_92d=def;
}else{
_92d=ViewDefinitions[_92b];
}
if(_92d instanceof DialogViewDefinition){
_92d.handler=this._handler;
if(this._map!=null){
_92d.argument=this._map;
}
StageBinding.presentViewDefinition(_92d);
}
}else{
if(url!=null){
_92d=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_92d!=null){
this._dialogViewHandle=_92d.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_92e){
this.setProperty("label",_92e);
if(this.isAttached){
this._buttonBinding.setLabel(_92e+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_92f){
this.setProperty("image",_92f);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_92f);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_930){
this.setProperty("tooltip",_930);
if(this.isAttached){
this._buttonBinding.setToolTip(_930);
}
};
DataDialogBinding.prototype.setHandle=function(_931){
this.setProperty("handle",_931);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_933){
this._handler=_933;
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
DataDialogBinding.newInstance=function(_935){
var _936=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_935);
return UserInterface.registerBinding(_936,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_938,_939){
if(_938==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_939);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_93a){
_93a=new String(_93a);
this.dirty();
this.setValue(encodeURIComponent(_93a));
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
var _93e=this.getValue();
if(_93e==null){
_93e="";
}
this.shadowTree.dotnetinput.value=_93e;
};
PostBackDataDialogBinding.prototype.setValue=function(_93f){
this.setProperty("value",_93f);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_940){
};
PostBackDataDialogBinding.newInstance=function(_941){
var _942=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_941);
return UserInterface.registerBinding(_942,PostBackDataDialogBinding);
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
var _943=this.getProperty("dialoglabel");
var _944=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _946=this.getProperty("handle");
var _947=this.getProperty("selectedtoken");
if(_946!=null){
var def=ViewDefinition.clone(_946,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_943!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_943;
}
if(_944!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_944;
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
if(_947!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_947;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_949){
var _94a=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_949);
return UserInterface.registerBinding(_94a,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_94c){
self._datathing.setValue(_94c);
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
var _94f=self.getValue();
if(_94f==""||_94f==null){
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
var _950=this.getProperty("value");
var _951=this.getProperty("selectorlabel");
if(_951==null){
_951=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_950==null));
list.add(new SelectorBindingSelection(_951+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_950!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _950=this.getValue();
if(_950==""||_950==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_953){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_953);
switch(_953.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_953.target==this._datathing){
var _954=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_954){
self._selector.setLabel(_954);
}
},500);
_953.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_956){
this.setProperty("label",_956);
if(this._selector!=null){
this._selector.setLabel(_956);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_957){
this._datathing.setValue(_957);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_958,_959){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_958,_959)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_95a){
this._buttonBinding.setLabel(_95a);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_95b){
this._buttonBinding.setToolTip(_95b);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_95c){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_95c);
switch(_95c.type){
case MenuItemBinding.ACTION_COMMAND:
var _95d=_95c.target;
var _95e=this.master;
if(_95d.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_95d.getLabel());
setTimeout(function(){
_95e.action();
},0);
}else{
this.master.setValue("");
}
_95e.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_95f){
var _960=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_95f);
return UserInterface.registerBinding(_960,NullPostBackDataDialogSelectorBinding);
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
var _961=this._dataDialogBinding;
if(_961!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_961.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _962=this.getProperty("editable");
var _963=this.getProperty("selectable");
var _964=this.getProperty("display");
if(_962!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_963){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_964){
this._display=_964;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _965=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_965.selections=this.selections;
this.add(_965);
_965.attach();
this._dataDialogBinding=_965;
this.shadowTree.datadialog=_965;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _967=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _968=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_967=_968.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_967=_968.isSelected!=true;
break;
}
if(_967){
this.shadowTree.box.appendChild(this._getElementForSelection(_968));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_96a){
var box=this.shadowTree.box;
var _96c=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _96d=list.getNext();
if(_96a){
_96d.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_96c=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_96c=_96d.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_96c=_96d.isSelected!=true;
break;
}
}
if(_96c){
var _96e=this._getElementForSelection(_96d);
box.insertBefore(_96e,box.firstChild);
CSSUtil.attachClassName(_96e,"selected");
this._selectionMap.set(_96d.value,_96e);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_96f){
var _970=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_970.appendChild(this.bindingDocument.createTextNode(_96f.label));
_970.setAttribute("label",_96f.label);
_970.setAttribute("value",_96f.value);
return _970;
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
var _972=DOMEvents.getTarget(e);
var _973=DOMUtil.getLocalName(_972);
if(_973=="div"){
this._handleMouseDown(_972);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_974){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _975=this._getElements();
var _976=_974.getAttribute("value");
var _977=this._lastSelectedElement.getAttribute("value");
var _978=false;
while(_975.hasNext()){
var el=_975.getNext();
switch(el.getAttribute("value")){
case _976:
case _977:
_978=!_978;
break;
}
if(_978){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_974);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_974)){
this._unhilite(_974);
}else{
this._hilite(_974);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_974){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_974;
};
MultiSelectorBinding.prototype._hilite=function(_97c){
var _97d=_97c.getAttribute("value");
if(!this._selectionMap.has(_97d)){
CSSUtil.attachClassName(_97c,"selected");
this._selectionMap.set(_97d,_97c);
}
};
MultiSelectorBinding.prototype._unhilite=function(_97e){
var _97f=_97e.getAttribute("value");
if(this._selectionMap.has(_97f)){
CSSUtil.detachClassName(_97e,"selected");
this._selectionMap.del(_97f);
}
};
MultiSelectorBinding.prototype._isHilited=function(_980){
return CSSUtil.hasClassName(_980,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_981){
MultiSelectorBinding.superclass.handleAction.call(this,_981);
var _982=_981.target;
switch(_981.type){
case DataDialogBinding.ACTION_COMMAND:
if(_982==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_981.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_982.result);
this.dirty();
_982.result=null;
_981.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _983=null;
if(this.isSelectable){
_983=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_985){
if(self._isHilited(_985)){
_985.parentNode.removeChild(_985);
_983.add(new SelectorBindingSelection(_985.getAttribute("label"),_985.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _983;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _987=this._getElements();
if(!isUp){
_987.reverse();
}
var _988=true;
while(_988&&_987.hasNext()){
var _989=_987.getNext();
if(this._isHilited(_989)){
switch(isUp){
case true:
if(_989.previousSibling){
_989.parentNode.insertBefore(_989,_989.previousSibling);
}else{
_988=false;
}
break;
case false:
if(_989.nextSibling){
_989.parentNode.insertBefore(_989,_989.nextSibling.nextSibling);
}else{
_988=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _98a=new List();
var _98b=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_98d){
var _98e=new SelectorBindingSelection(_98d.getAttribute("label"),_98d.getAttribute("value"),_98b);
_98e.isHighlighted=self._isHilited(_98d);
_98a.add(_98e);
});
return _98a;
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
var _98f=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_98f.hasEntries()){
_98f.each(function(_990){
_990.parentNode.removeChild(_990);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _991=this.selections.getNext();
if(_991.isSelected){
var _992=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_992.name=this._name;
_992.value=_991.value;
this.bindingElement.appendChild(_992);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_993){
alert(_993);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_994){
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
var _995={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _996=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_996.handler=this._handler;
_996.argument=_995;
StageBinding.presentViewDefinition(_996);
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
var _997={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _999={handleDialogResponse:function(_99a,_99b){
if(_99a==Dialog.RESPONSE_ACCEPT){
self.result=_99b;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _99c=ViewDefinitions[this._dialogViewHandle];
_99c.handler=_999;
_99c.argument=_997;
StageBinding.presentViewDefinition(_99c);
};
MultiSelectorDataDialogBinding.newInstance=function(_99d){
var _99e=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_99d);
return UserInterface.registerBinding(_99e,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_99f){
var id=_99f.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _9a1=_99f.bindingDocument.getElementById(id);
if(_9a1!=null){
var _9a2=UserInterface.getBinding(_9a1);
_9a2.setResult(true);
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
var _9a4=this.bindingDocument.getElementById(id);
if(_9a4!=null){
var _9a5=UserInterface.getBinding(_9a4);
if(_9a5&&!_9a5.isAttached){
_9a5.isLazy=true;
}else{
_9a4.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9a6){
this._isLazy=_9a6;
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
var _9a8=this.getProperty("stateprovider");
var _9a9=this.getProperty("handle");
if(_9a8!=null&&_9a9!=null){
url=url.replace("${stateprovider}",_9a8).replace("${handle}",_9a9);
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
EditorDataBinding.prototype._onPageInitialize=function(_9aa){
EditorDataBinding.superclass._onPageInitialize.call(this,_9aa);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9ab){
EditorDataBinding.superclass.handleAction.call(this,_9ab);
switch(_9ab.type){
case Binding.ACTION_DIRTY:
if(_9ab.target!=this){
if(!this.isDirty){
this.dirty();
}
_9ab.consume();
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
EditorDataBinding.prototype.setValue=function(_9ac){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9ad){
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
var _9b2=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9b2=fake.getValue()!="";
}
if(!_9b2&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9b2&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9b2;
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
var _9b6=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9b6!=null){
_9b6.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9b7){
_9b7=_9b7!=null?_9b7:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9b7;
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
var _9b8=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9b9=_9b8.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9b9;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9b9=_9b9.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9b9;
}
var self=this;
var _9bb=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9bb.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9be=this.getProperty("label");
if(_9be){
this.setLabel(_9be);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9bf){
this.setProperty("label",_9bf);
if(this.shadowTree.labelBinding==null){
var _9c0=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9c0.attachClassName("fieldgrouplabel");
cell.insertBefore(_9c0.bindingElement,cell.getElementsByTagName("div").item(1));
_9c0.attach();
this.shadowTree.labelBinding=_9c0;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9bf));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9c2){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9c2.bindingElement);
return _9c2;
};
FieldGroupBinding.prototype.addFirst=function(_9c3){
var _9c4=this.shadowTree[FieldGroupBinding.CENTER];
_9c4.insertBefore(_9c3.bindingElement,_9c4.firstChild);
return _9c3;
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
var _9c5=this.getProperty("relation");
if(_9c5!=null){
this.bindingRelation=_9c5;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9c6,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9c6,arg);
switch(_9c6){
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
FieldBinding.newInstance=function(_9c8){
var _9c9=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9c8);
return UserInterface.registerBinding(_9c9,FieldBinding);
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
var _9ca=this.getDescendantBindingByLocalName("fieldgroup");
if(_9ca!=null){
_9ca.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9cb=true;
var _9cc=this.getDescendantBindingsByLocalName("*");
while(_9cc.hasNext()){
var _9cd=_9cc.getNext();
if(Interfaces.isImplemented(IData,_9cd)){
var _9ce=_9cd.validate();
if(_9cb&&!_9ce){
_9cb=false;
}
}
}
return _9cb;
};
FieldsBinding.prototype.handleAction=function(_9cf){
FieldsBinding.superclass.handleAction.call(this,_9cf);
var _9d0=_9cf.target;
if(_9d0!=this){
switch(_9cf.type){
case Binding.ACTION_INVALID:
var _9d1=DataBinding.getAssociatedLabel(_9d0);
if(_9d1){
this._invalidFieldLabels.set(_9d0.key,_9d1);
}
if(_9d0.error){
if(!_9d0.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9d0.error},_9d0);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9cf.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9d0.key)){
this._invalidFieldLabels.del(_9d0.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9cf.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9d2=null;
if(this._invalidFieldLabels.hasEntries()){
_9d2=this._invalidFieldLabels.toList();
}
return _9d2;
};
FieldsBinding.newInstance=function(_9d3){
var _9d4=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9d3);
return UserInterface.registerBinding(_9d4,FieldsBinding);
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
var _9d5=this.getProperty("image");
if(_9d5){
this.setImage(_9d5);
}
var _9d6=this.getProperty("tooltip");
if(_9d6){
this.setToolTip(_9d6);
}
var _9d7=this.getProperty("label");
if(_9d7){
this.setLabel(_9d7);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9d9=this.getAncestorBindingByLocalName("field");
if(_9d9){
var _9da=true;
_9d9.getDescendantBindingsByLocalName("*").each(function(_9db){
if(Interfaces.isImplemented(IData,_9db)){
_9db.focus();
_9da=false;
}
return _9da;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9dc){
this.setProperty("label",_9dc);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9dc);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9dd=this.getProperty("label");
if(!_9dd){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9dd=node.data;
}
}
return _9dd;
};
FieldDescBinding.prototype.setImage=function(_9df){
this.setProperty("image",_9df);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9e0){
this.setProperty("tooltip",_9e0);
if(this.isAttached){
this.bindingElement.title=_9e0;
}
};
FieldDescBinding.newInstance=function(_9e1){
var _9e2=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9e1);
return UserInterface.registerBinding(_9e2,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9e3){
var _9e4=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9e3);
return UserInterface.registerBinding(_9e4,FieldDataBinding);
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
var _9e5=this._fieldHelpPopupBinding;
if(_9e5){
_9e5.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9e6=app.bindingMap.fieldhelpopupset;
var doc=_9e6.bindingDocument;
var _9e8=_9e6.add(PopupBinding.newInstance(doc));
var _9e9=_9e8.add(PopupBodyBinding.newInstance(doc));
_9e8.position=PopupBinding.POSITION_RIGHT;
_9e8.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9e9.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9ea=this.getProperty("label");
if(_9ea){
_9e9.bindingElement.innerHTML=Resolver.resolve(_9ea);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9e8;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9eb=this.getAncestorBindingByLocalName("field");
if(_9eb){
_9eb.attachClassName("fieldhelp");
var _9ec=ClickButtonBinding.newInstance(this.bindingDocument);
_9ec.attachClassName("fieldhelp");
_9ec.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9ec);
_9ec.attach();
var self=this;
_9ec.oncommand=function(){
self.attachPopupBinding();
};
_9ec.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9ec;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9ee=this._fieldHelpPopupBinding;
if(_9ee&&!_9ee.isAttached){
_9ee.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9f0){
RadioDataGroupBinding.superclass.handleAction.call(this,_9f0);
switch(_9f0.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9f2,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9f2,arg);
switch(_9f2){
case BroadcastMessages.KEY_ARROW:
var _9f4=null;
var next=null;
var _9f6=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9f6=this.getChildBindingsByLocalName("radio");
while(!_9f4&&_9f6.hasNext()){
var _9f7=_9f6.getNext();
if(_9f7.getProperty("ischecked")){
_9f4=_9f7;
}
}
break;
}
if(_9f4){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9f6.getFollowing(_9f4);
while(next!=null&&next.isDisabled){
next=_9f6.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9f6.getPreceding(_9f4);
while(next!=null&&next.isDisabled){
next=_9f6.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9f8){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9f8){
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
var _9f9=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9f9.type="hidden";
_9f9.name=this._name;
this.bindingElement.appendChild(_9f9);
this.shadowTree.input=_9f9;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9fa=null;
var _9fb=this.getChildBindingsByLocalName("radio");
while(!_9fa&&_9fb.hasNext()){
var _9fc=_9fb.getNext();
if(_9fc.isChecked){
_9fa=_9fc.getProperty("value");
}
}
return _9fa;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9fd){
};
RadioDataGroupBinding.prototype.setResult=function(_9fe){
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
this.propertyMethodMap["checked"]=function(_9ff){
if(_9ff!=this.isChecked){
this.setChecked(_9ff,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a00=this.getProperty("ischecked");
if(_a00!=this.isChecked){
this.setChecked(_a00,true);
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
var _a01=this.getProperty("relate");
var _a02=this.getProperty("oncommand");
var _a03=this.getProperty("isdisabled");
if(_a01){
this.bindingRelate=_a01;
this.relate();
}
if(_a02){
this.oncommand=function(){
Binding.evaluate(_a02,this);
};
}
if(_a03==true){
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
var _a05=this.getCallBackID();
this._buttonBinding.check=function(_a06){
RadioButtonBinding.prototype.check.call(this,_a06);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a07){
RadioButtonBinding.prototype.uncheck.call(this,_a07);
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
RadioDataBinding.prototype.setChecked=function(_a08,_a09){
this._buttonBinding.setChecked(_a08,_a09);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a08);
};
RadioDataBinding.prototype.check=function(_a0a){
this.setChecked(true,_a0a);
};
RadioDataBinding.prototype.uncheck=function(_a0b){
this.setChecked(false,_a0b);
};
RadioDataBinding.prototype.setDisabled=function(_a0c){
if(_a0c!=this.isDisabled){
this.isDisabled=_a0c;
this._buttonBinding.setDisabled(_a0c);
if(_a0c){
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
var _a0e=DOMEvents.getTarget(e);
switch(_a0e){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a0f=this.getProperty("label");
if(_a0f){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a0f)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a10){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a10;
}
this.setProperty("label",_a10);
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
this.propertyMethodMap["checked"]=function(_a11){
if(_a11!=this.isChecked){
this.setChecked(_a11,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a12=this.getProperty("ischecked");
if(_a12!=this.isChecked){
this.setChecked(_a12,true);
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
var _a14=DOMEvents.getTarget(e);
switch(_a14){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a15,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a15,arg);
switch(_a15){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a18){
_a18.consume();
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
var _a1a=this.getCallBackID();
this._buttonBinding.check=function(_a1b){
ButtonBinding.prototype.check.call(this,_a1b);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a1b){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a1c){
ButtonBinding.prototype.uncheck.call(this,_a1c);
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
if(_a1a!=null){
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
var _a1d=true;
var _a1e=this.bindingElement.parentNode;
if(_a1e){
var _a1f=UserInterface.getBinding(_a1e);
if(_a1f&&_a1f instanceof CheckBoxGroupBinding){
if(_a1f.isRequired){
if(_a1f.isValid){
_a1d=_a1f.validate();
}else{
_a1d=false;
}
}
}
}
return _a1d;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a20=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a20.type="hidden";
_a20.name=this._name;
_a20.style.display="none";
this.bindingElement.appendChild(_a20);
this.shadowTree.input=_a20;
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
var _a21=null;
var _a22=this.getProperty("value");
if(this.isChecked){
_a21=_a22?_a22:"on";
}
return _a21;
};
CheckBoxBinding.prototype.setValue=function(_a23){
if(_a23==this.getValue()||_a23=="on"){
this.check(true);
}else{
if(_a23!="on"){
this.setPropety("value",_a23);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a24=false;
if(this.isChecked){
_a24=this._result!=null?this._result:true;
}
return _a24;
};
CheckBoxBinding.prototype.setResult=function(_a25){
if(typeof _a25=="boolean"){
this.setChecked(_a25,true);
}else{
this._result=_a25;
}
};
CheckBoxBinding.newInstance=function(_a26){
var _a27=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a26);
return UserInterface.registerBinding(_a27,CheckBoxBinding);
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
var _a28=true;
if(this.isRequired){
var _a29=this.getDescendantBindingsByLocalName("checkbox");
if(_a29.hasEntries()){
_a28=false;
while(_a29.hasNext()&&!_a28){
if(_a29.getNext().isChecked){
_a28=true;
}
}
}
if(_a28==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a28;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a2a){
if(_a2a){
if(!this._labelBinding){
var _a2b=LabelBinding.newInstance(this.bindingDocument);
_a2b.attachClassName("invalid");
_a2b.setImage("${icon:error}");
_a2b.setLabel("Selection required");
this._labelBinding=this.addFirst(_a2b);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a2c){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a2c);
switch(_a2c.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a2d){
var _a2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a2d);
return UserInterface.registerBinding(_a2e,CheckBoxGroupBinding);
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
var _a2f=DialogControlBinding.newInstance(this.bindingDocument);
_a2f.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a2f);
this._controlGroupBinding.attachRecursive();
var _a30=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a30);
var _a31=this.getLabel();
if(_a31!=null){
this.setLabel(_a31);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a32=this._snapTargetBinding;
if(Binding.exists(_a32)==true){
_a32.removeActionListener(Binding.ACTION_BLURRED,this);
_a32.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a33){
if(Interfaces.isImplemented(IData,_a33)){
this._snapTargetBinding=_a33;
var _a34=_a33.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a34&&_a34.isConsumed){
this._environmentBinding=_a34.listener;
}
if(this._environmentBinding){
_a33.addActionListener(Binding.ACTION_BLURRED,this);
_a33.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a33)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a33.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a36=this._snapTargetBinding;
var _a37=this._environmentBinding;
var root=UserInterface.getBinding(_a36.bindingDocument.body);
if(Binding.exists(_a36)&&Binding.exists(_a37)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a36.isAttached&&_a37.isAttached){
var _a39=_a36.boxObject.getUniversalPosition();
var _a3a=_a37.boxObject.getUniversalPosition();
_a3a.y+=_a37.bindingElement.scrollTop;
_a3a.x+=_a37.bindingElement.scrollLeft;
var tDim=_a36.boxObject.getDimension();
var eDim=_a37.boxObject.getDimension();
var _a3d=false;
if(_a39.y+tDim.h<_a3a.y){
_a3d=true;
}else{
if(_a39.x+tDim.w<_a3a.x){
_a3d=true;
}else{
if(_a39.y>_a3a.y+eDim.h){
_a3d=true;
}else{
if(_a39.x>_a3a.x+eDim.w){
_a3d=true;
}
}
}
}
if(!_a3d){
this._setComputedPosition(_a39,_a3a,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a3e,_a3f,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a44=_a3e;
var _a45=false;
if(_a3e.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a45=true;
}else{
if(_a3e.x+tDim.w>=_a3f.x+eDim.w){
_a45=true;
}
}
if(_a45){
_a44.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a44.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a44.y-=(bDim.h);
_a44.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a44);
};
BalloonBinding.prototype.handleBroadcast=function(_a46,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a46,arg);
switch(_a46){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a48){
var _a49=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a48){
_a49=true;
}
}
return _a49;
};
BalloonBinding.prototype._setPosition=function(_a4b){
var _a4c=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a4c=true;
}
}
if(!_a4c){
this.bindingElement.style.left=_a4b.x+"px";
this.bindingElement.style.top=_a4b.y+"px";
this._point=_a4b;
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
BalloonBinding.prototype.handleAction=function(_a4e){
BalloonBinding.superclass.handleAction.call(this,_a4e);
var _a4f=_a4e.target;
switch(_a4e.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a4e.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a4f==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a4f)){
self.dispose();
}else{
if(_a4f.validate()){
var _a51=true;
if(_a4e.type==Binding.ACTION_BLURRED){
var root=_a4f.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a51=false;
}
}
if(_a51){
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
BalloonBinding.prototype.setLabel=function(_a54){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a55=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a54);
_a55.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a55);
}
this.setProperty("label",_a54);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a57){
var _a58=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a57);
var _a59=UserInterface.registerBinding(_a58,BalloonBinding);
_a59.hide();
return _a59;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a5a,_a5b){
if(Interfaces.isImplemented(IData,_a5b)==true){
var _a5c,_a5d=_a5b.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a5d&&_a5d.isConsumed){
switch(_a5d.listener.constructor){
case StageBinding:
_a5c=false;
break;
case StageDialogBinding:
_a5c=true;
break;
}
}
var _a5e=_a5c?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a5f=_a5e.add(BalloonBinding.newInstance(top.app.document));
_a5f.setLabel(_a5a.text);
_a5f.snapTo(_a5b);
_a5f.attach();
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
var _a60=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a63=_a60.getDataBinding(name);
if(_a63){
ErrorBinding.presentError({text:text},_a63);
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
FocusBinding.focusElement=function(_a64){
var _a65=true;
try{
_a64.focus();
Application.focused(true);
}
catch(exception){
var _a66=UserInterface.getBinding(_a64);
var _a67=SystemLogger.getLogger("FocusBinding.focusElement");
_a67.warn("Could not focus "+(_a66?_a66.toString():String(_a64)));
_a65=false;
}
return _a65;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a68){
var win=_a68.bindingWindow;
var id=_a68.bindingElement.id;
return {getBinding:function(){
var _a6b=null;
try{
if(Binding.exists(_a68)){
_a6b=win.bindingMap[id];
}
}
catch(exception){
}
return _a6b;
}};
};
FocusBinding.navigateNext=function(_a6c){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a6c);
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
var _a6d=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a6d&&_a6d.isConsumed){
if(_a6d.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a6e){
FocusBinding.superclass.handleAction.call(this,_a6e);
var _a6f=_a6e.target;
var _a70=null;
if(this._isFocusManager){
switch(_a6e.type){
case FocusBinding.ACTION_ATTACHED:
if(_a6f!=this){
this._isUpToDate=false;
}
_a6e.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a6f!=this){
this._isUpToDate=false;
_a6e.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a70=new FocusCrawler();
_a70.mode=FocusCrawler.MODE_BLUR;
_a70.crawl(_a6f.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a6e.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a6f!=this){
_a70=new FocusCrawler();
_a70.mode=FocusCrawler.MODE_FOCUS;
_a70.crawl(_a6f.bindingElement);
}
_a6e.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a6f)){
this.claimFocus();
this._onFocusableFocused(_a6f);
}
_a6e.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a6f)){
this._onFocusableBlurred(_a6f);
}
_a6e.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a71){
var _a72=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a72==null&&list.hasNext()){
var _a74=list.getNext();
if(this._cachedFocus&&_a74==this._cachedFocus.getBinding()){
_a72=_a74;
}
}
if(_a72!=null){
if(_a74.isFocused){
var next=_a71?list.getPreceding(_a72):list.getFollowing(_a72);
if(!next){
next=_a71?list.getLast():list.getFirst();
}
next.focus();
}else{
_a72.focus();
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
var _a76=new FocusCrawler();
var list=new List();
_a76.mode=FocusCrawler.MODE_INDEX;
_a76.crawl(this.bindingElement,list);
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
var _a7a=this._cachedFocus.getBinding();
if(_a7a&&!_a7a.isFocused){
_a7a.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a7b){
if(_a7b!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a7b;
_a7b.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a7b);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a7c){
_a7c.deleteProperty(FocusBinding.MARKER);
if(_a7c==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a7e){
this.bindingElement.style.left=_a7e+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a7f){
this.hiddenTabBindings.add(_a7f);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a80=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a80.getLabel());
item.setImage(_a80.getImage());
item.associatedTabBinding=_a80;
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
TabsButtonBinding.prototype.handleAction=function(_a83){
TabsButtonBinding.superclass.handleAction.call(this,_a83);
switch(_a83.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a84=this.selectedTabBinding;
if(_a84){
this.containingTabBoxBinding.moveToOrdinalPosition(_a84,0);
this.containingTabBoxBinding.select(_a84);
}
_a83.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a85){
var _a86=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a85);
_a86.setAttribute("type","checkbox");
_a86.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a86.className="tabbutton";
return UserInterface.registerBinding(_a86,TabsButtonBinding);
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
var _a87=TabBoxBinding.currentActiveInstance;
if(_a87!=null&&Binding.exists(_a87)){
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
var _a88=this.getTabElements().getLength();
var _a89=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a88!=_a89){
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
var _a8a=this.getTabPanelElements();
while(_a8a.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a8a.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a8b=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a8c=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a8d=_a8b>_a8c?"tabsbelow":"tabsontop";
this.attachClassName(_a8d);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a8f=this.getTabPanelElements();
var _a90=null;
var _a91=this.getProperty("selectedindex");
if(_a91!=null){
if(_a91>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a92=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a94=_a8f.getNext();
this.registerTabBoxPair(tab,_a94);
if(_a91&&_a92==_a91){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a90=tab;
}
}
_a92++;
}
if(!_a90){
_a90=tabs.getFirst();
_a90.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a95){
var _a96=null;
var _a97=null;
if(this.isEqualSize){
var _a98=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a9a=this.getTabPanelElements();
_a9a.each(function(_a9b){
max=_a9b.offsetHeight>max?_a9b.offsetHeight:max;
});
_a97=max+_a98.top+_a98.bottom;
if(_a95&&this._tabPanelsElement.style.height!=null){
_a96=this._tabPanelsElement.offsetHeight;
}
if(_a96!=null||_a97>_a96){
this._tabPanelsElement.style.height=_a97+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a9c){
_a9c._invalidCount=0;
_a9c.addActionListener(Binding.ACTION_INVALID,this);
_a9c.addActionListener(Binding.ACTION_VALID,this);
_a9c.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a9d){
TabBoxBinding.superclass.handleAction.call(this,_a9d);
var _a9e=_a9d.target;
var _a9f=_a9d.listener;
switch(_a9d.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a9e.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a9d.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a9e.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a9f._invalidCount++;
if(_a9f._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a9f.isSelected){
self._showWarning(_a9f,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a9f._invalidCount>0){
_a9f._invalidCount--;
if(_a9f._invalidCount==0){
if(_a9f.isSelected){
this._showWarning(_a9f,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a9f,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a9d._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a9d._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _aa2=DOMEvents.getTarget(e);
if(_aa2==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _aa4=this.getTabPanelElements();
tabs.each(function(tab,_aa6){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _aa7=_aa4.get(_aa6);
this.registerTabBoxPair(tab,_aa7);
}
},this);
var _aa8=this._tabBoxPairs;
for(var key in _aa8){
var tab=_aa8[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_aa2);
switch(_aa2.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _aac=_aa2.parentNode;
if(_aac==this._tabsElement||_aac==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_aa2==this._tabsElement||_aa2==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_aae){
var _aaf=this.getBindingForArgument(arg);
if(_aaf!=null&&!_aaf.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_aaf.select(_aae);
this.getTabPanelBinding(_aaf).select(_aae);
var _ab0=this.getProperty("selectedindex");
if(_ab0!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_aaf.bindingElement,true));
}
this._selectedTabBinding=_aaf;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_aaf.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _ab1=this.getTabPanelBinding(_aaf);
this._showBalloon(_ab1,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_ab3){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_ab3.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_ab3};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ab7){
var _ab8=null;
try{
var key=_ab7.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aba=this._tabBoxPairs[key].tabPanel;
_ab8=UserInterface.getBinding(_aba);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ab8;
};
TabBoxBinding.prototype.getTabBinding=function(_abb){
var key=_abb.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _abd=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_abd);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _abe=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_abe);
return _abe;
};
TabBoxBinding.prototype.appendTabByBindings=function(_abf,_ac0){
var _ac1=_abf.bindingElement;
_abf.setProperty("selected",true);
var _ac2=this.summonTabPanelBinding();
var _ac3=_ac2.bindingElement;
if(_ac0){
_ac3.appendChild(_ac0 instanceof Binding?_ac0.bindingElement:_ac0);
}
this.registerTabBoxPair(_ac1,_ac3);
UserInterface.getBinding(this._tabsElement).add(_abf);
this._tabPanelsElement.appendChild(_ac3);
_abf.attach();
UserInterface.getBinding(_ac3).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _abf;
};
TabBoxBinding.prototype.importTabBinding=function(_ac4){
var that=_ac4.containingTabBoxBinding;
var _ac6=that.getTabPanelBinding(_ac4);
var _ac7=_ac6.getBindingElement();
var _ac8=_ac4.getBindingElement();
that.dismissTabBinding(_ac4);
this._tabsElement.appendChild(_ac8);
this._tabPanelsElement.appendChild(_ac7);
this.registerTabBoxPair(_ac8,_ac7);
_ac4.containingTabBoxBinding=this;
this.select(_ac4);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ac9){
var _aca=null;
if(_ac9.isSelected){
_aca=this.getBestTab(_ac9);
this._selectedTabBinding=null;
}
var _acb=this.getTabPanelBinding(_ac9);
this.unRegisterTabBoxPair(_ac9.bindingElement);
_ac9.dispose();
_acb.dispose();
if(_aca!=null){
this.select(_aca);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_acc){
if(_acc.isSelected){
this.selectBestTab(_acc);
}
};
TabBoxBinding.prototype.selectBestTab=function(_acd){
var _ace=this.getBestTab(_acd);
if(_ace){
this.select(_ace);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_acf){
var _ad0=null;
var _ad1=_acf.getOrdinalPosition(true);
var _ad2=this.getTabBindings();
var _ad3=_ad2.getLength();
var _ad4=_ad3-1;
if(_ad3==1){
_ad0=null;
}else{
if(_ad1==_ad4){
_ad0=_ad2.get(_ad1-1);
}else{
_ad0=_ad2.get(_ad1+1);
}
}
return _ad0;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ad5,_ad6){
var _ad7=this.bindingDocument.getElementById(_ad5.bindingElement.id);
var tab=this.getTabElements().get(_ad6);
this._tabsElement.insertBefore(_ad7,tab);
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
var _ad9=this._nodename_tab;
var _ada=new List(this._tabsElement.childNodes);
var _adb=new List();
while(_ada.hasNext()){
var _adc=_ada.getNext();
if(_adc.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_adc)==_ad9){
_adb.add(_adc);
}
}
return _adb;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _add=this._nodename_tabpanel;
var _ade=new List(this._tabPanelsElement.childNodes);
var _adf=new List();
_ade.each(function(_ae0){
if(_ae0.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ae0)==_add){
_adf.add(_ae0);
}
});
return _adf;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _ae1=new List();
var _ae2=this.getTabElements();
_ae2.each(function(_ae3){
_ae1.add(UserInterface.getBinding(_ae3));
});
return _ae1;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _ae4=new List();
this.getTabPanelElements().each(function(_ae5){
_ae4.add(UserInterface.getBinding(_ae5));
});
return _ae4;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _ae6=null;
if(this._selectedTabBinding){
_ae6=this.getTabPanelBinding(this._selectedTabBinding);
}
return _ae6;
};
TabBoxBinding.prototype._showWarning=function(_ae7,_ae8){
var _ae9=this.getTabBinding(_ae7);
if(_ae8){
if(_ae9.labelBinding.hasImage){
_ae9._backupImage=_ae9.getImage();
}
_ae9.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ae9._backupImage){
_ae9.setImage(_ae9._backupImage);
}else{
_ae9.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_aea,_aeb){
var _aec=this.getTabBinding(_aea);
if((_aeb&&!_aec.isSelected)||!_aeb){
if(_aec.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_aeb){
if(_aec.labelBinding.hasImage){
_aec._backupImage=_aec.getImage();
}
_aec.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_aec._backupImage!=null){
_aec.setImage(_aec._backupImage);
}else{
_aec.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_aed){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _af0=tab.getOrdinalPosition(true);
var next=null;
var _af2=new List();
tabs.each(function(t){
if(t.isVisible){
_af2.add(t);
}
});
if(_af2.getLength()>1){
if(_af0==0&&!_aed){
next=_af2.getLast();
}else{
if(_af0==_af2.getLength()-1&&_aed){
next=_af2.getFirst();
}else{
if(_aed){
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
var _af5=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_af5.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_af6){
TabsBinding.superclass.handleAction.call(this,_af6);
switch(_af6.type){
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
var _af9=self.bindingElement.offsetWidth;
if(_af9!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_af9;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_afa){
if(_afa instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_afa);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _afb=false;
var _afc,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _aff=this.constructor.TABBUTTON_IMPLEMENTATION;
var _b00=this.bindingElement.offsetWidth-_aff.RESERVED_SPACE;
var _b01=null;
var sum=0,_b03=0;
var _b04=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_b04){
tab=tabs.getNext();
_afc=UserInterface.getBinding(tab);
if(!_b01){
_b01=_afc;
}
sum+=tab.offsetWidth;
if(sum>=_b00){
_afb=true;
if(_afc.isSelected){
if(!DOMUtil.isFirstElement(_afc.bindingElement,true)){
this.isManaging=false;
if(_b01){
_b01.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_afc,_b03-1);
_b04=false;
}
}else{
_afc.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_afc);
}
}else{
_afc.show();
_b01=_afc;
_b03++;
}
}
if(_b04){
if(_afb&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _b05=_b01.getBindingElement();
var _b06=_b05.offsetLeft+_b05.offsetWidth;
var _b07=this.tabsButtonBinding;
setTimeout(function(){
_b07.show(_b06+4);
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
var _b08=TabBinding.superclass.serialize.call(this);
if(_b08){
_b08.label=this.getLabel();
_b08.image=this.getImage();
_b08.tooltip=this.getToolTip();
}
return _b08;
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
var _b09=this.bindingElement.getAttribute("image");
var _b0a=this.bindingElement.getAttribute("label");
var _b0b=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b0a){
this.setLabel(_b0a);
}
if(_b09){
this.setImage(_b09);
}
if(_b0b){
this.setToolTip(_b0b);
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
TabBinding.prototype.setLabel=function(_b0d){
if(_b0d!=null){
this.setProperty("label",_b0d);
if(this.isAttached){
this.labelBinding.setLabel(_b0d);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b0e){
if(_b0e){
this.setProperty("tooltip",_b0e);
if(this.isAttached){
this.labelBinding.setToolTip(_b0e);
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
var _b10=false;
if(Client.isMozilla==true){
}
if(!_b10){
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
TabBinding.prototype.select=function(_b11){
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
TabBinding.newInstance=function(_b12){
var _b13=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b12);
return UserInterface.registerBinding(_b13,TabBinding);
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
var _b14=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b14=true;
this._lastKnownDimension=dim1;
}
return _b14;
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
TabPanelBinding.prototype.select=function(_b17){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b17!=true){
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
TabPanelBinding.prototype.handleAction=function(_b18){
TabPanelBinding.superclass.handleAction.call(this,_b18);
var _b19=_b18.target;
switch(_b18.type){
case BalloonBinding.ACTION_INITIALIZE:
_b18.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b1a){
var _b1b=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b1a);
UserInterface.registerBinding(_b1b,TabPanelBinding);
return UserInterface.getBinding(_b1b);
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
var _b1c=SplitBoxBinding.superclass.serialize.call(this);
if(_b1c){
_b1c.orient=this.getOrient();
_b1c.layout=this.getLayout();
}
return _b1c;
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
var _b1d=this.getSplitPanelElements();
if(_b1d.hasEntries()){
var _b1e=new List(this.getLayout().split(":"));
if(_b1e.getLength()!=_b1d.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b1d.each(function(_b1f){
_b1f.setAttribute("ratio",_b1e.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b20=this.getProperty("orient");
if(_b20){
this._orient=_b20;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b21=this.getSplitterBindings();
while(_b21.hasNext()){
var _b22=_b21.getNext();
if(_b22&&_b22.getProperty("collapsed")==true){
_b22.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b23){
SplitBoxBinding.superclass.handleAction.call(this,_b23);
switch(_b23.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b23.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b23.target);
_b23.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b23.target);
_b23.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b24){
this._getSplitPanelBindingForSplitter(_b24).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b25){
this._getSplitPanelBindingForSplitter(_b25).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b26){
var _b27=DOMUtil.getOrdinalPosition(_b26.bindingElement,true);
var _b28,_b29=this.getSplitPanelElements();
switch(_b26.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b28=_b29.get(_b27);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b28=_b29.get(_b27+1);
break;
}
return UserInterface.getBinding(_b28);
};
SplitBoxBinding.prototype.invokeLayout=function(_b2a){
var _b2b=this.isHorizontalOrient();
var _b2c=this.getSplitPanelBindings();
var _b2d=this.getSplitterBindings();
var _b2e=new List();
var _b2f,sum=0;
var _b31=0;
_b2c.each(function(_b32){
if(_b32.isFixed==true){
if(!_b2c.hasNext()){
_b31+=_b32.getFix();
}
_b2e.add(0);
sum+=0;
}else{
_b2f=_b32.getRatio();
_b2e.add(_b2f);
sum+=_b2f;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b2e.getLength()!=_b2c.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b33=_b2b?this.getInnerWidth():this.getInnerHeight();
_b33-=_b31;
_b2d.each(function(_b34){
if(_b34.isVisible){
_b33-=SplitterBinding.DIMENSION;
}
});
var unit=_b33/sum;
var _b36=0;
var self=this;
_b2c.each(function(_b38){
var span=0;
var _b3a=_b2e.getNext();
if(_b38.isFixed){
span=_b38.getFix();
}else{
span=Math.round(unit*_b3a);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b36+=span;
while(_b36>_b33){
_b36--;
span--;
}
if(!_b38.isFixed){
if(_b2b){
_b38.setWidth(span);
}else{
_b38.setHeight(span);
}
}
});
}
if(_b2a!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b3b=this.getLayout();
if(_b3b){
this.setProperty("layout",_b3b);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b3c=this.isHorizontalOrient();
var _b3d=this.getSplitPanelBindings();
var _b3e=this.getSplitterBindings();
var _b3f=null;
var _b40=null;
var unit=null;
var _b42=null;
var span=null;
_b3d.each(function(_b44){
if(!unit){
unit=_b3c?_b44.getWidth():_b44.getHeight();
}
span=_b3c?_b44.getWidth():_b44.getHeight();
if(_b42){
span-=_b42;
_b42=null;
}
_b3f=_b3e.getNext();
if(_b3f&&_b3f.offset){
_b42=_b3f.offset;
span+=_b42;
}
_b44.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b45){
this.logger.debug(_b45);
this.setProperty("layout",_b45);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b46="",_b47=this.getSplitPanelBindings();
_b47.each(function(_b48){
_b46+=_b48.getRatio().toString();
_b46+=_b47.hasNext()?":":"";
});
this.setProperty("layout",_b46);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b49=this.getSplitPanelElements();
_b49.each(function(_b4a){
layout+="1"+(_b49.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b4b){
this.bindingElement.style.width=_b4b+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b4c){
this.bindingElement.style.height=_b4c+"px";
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
SplitBoxBinding.prototype.fit=function(_b4d){
if(!this.isFit||_b4d){
if(this.isHorizontalOrient()){
var max=0;
var _b4f=this.getSplitPanelBindings();
_b4f.each(function(_b50){
var _b51=_b50.bindingElement.offsetHeight;
max=_b51>max?_b51:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b52){
var _b53=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b52);
return UserInterface.registerBinding(_b53,SplitBoxBinding);
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
var _b56=this.getProperty("hidden");
if(_b56){
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
var _b57=this.getProperty("ratiocache");
if(_b57){
this.setRatio(_b57);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b58){
if(!this.isFixed){
if(_b58!=this.getWidth()){
if(_b58<0){
_b58=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b58+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b58);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b59=null;
if(this.isFixed){
_b59=this.getFix();
}else{
_b59=this.bindingElement.offsetWidth;
}
return _b59;
};
SplitPanelBinding.prototype.setHeight=function(_b5a){
if(!this.isFixed){
if(_b5a!=this.getHeight()){
try{
this.bindingElement.style.height=_b5a+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b5b=null;
if(this.isFixed){
_b5b=this.getFix();
}else{
_b5b=this.bindingElement.offsetHeight;
}
return _b5b;
};
SplitPanelBinding.prototype.setRatio=function(_b5c){
this.setProperty("ratio",_b5c);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b5d){
if(_b5d){
this._fixedSpan=_b5d;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b5d);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b5d);
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
SplitPanelBinding.newInstance=function(_b5e){
var _b5f=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b5e);
return UserInterface.registerBinding(_b5f,SplitPanelBinding);
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
var _b60=SplitBoxBinding.superclass.serialize.call(this);
if(_b60){
_b60.collapse=this.getProperty("collapse");
_b60.collapsed=this.getProperty("collapsed");
_b60.disabled=this.getProperty("isdisabled");
}
return _b60;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b61=this.getProperty("hidden");
if(_b61){
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
SplitterBinding.prototype.setCollapseDirection=function(_b63){
this.setProperty("collapse",_b63);
this._collapseDirection=_b63;
};
SplitterBinding.prototype.handleAction=function(_b64){
SplitterBinding.superclass.handleAction.call(this,_b64);
switch(_b64.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b64.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b66=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b66.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b66.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b67){
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
SplitterBinding.newInstance=function(_b72){
var _b73=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b72);
return UserInterface.registerBinding(_b73,SplitterBinding);
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
var _b74=this.getProperty("selectedindex");
var _b75=this.getDeckElements();
if(_b75.hasEntries()){
var _b76=false;
var _b77=0;
while(_b75.hasNext()){
var deck=_b75.getNext();
if(_b74&&_b77==_b74){
deck.setAttribute("selected","true");
_b76=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b76=true;
}
}
_b77++;
}
if(!_b76){
_b75.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b7a=this.getBindingForArgument(arg);
if(_b7a!=null){
if(_b7a!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b7a.select();
this._selectedDeckBinding=_b7a;
var _b7b=this.getProperty("selectedindex");
if(_b7b!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b7a.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b7c=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b7c=true;
this._lastKnownDimension=dim1;
}
return _b7c;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b7f){
var _b80=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b7f);
return UserInterface.registerBinding(_b80,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b81){
DeckBinding.superclass.handleAction.call(this,_b81);
var _b82=_b81.target;
switch(_b81.type){
case BalloonBinding.ACTION_INITIALIZE:
_b81.consume();
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
DeckBinding.newInstance=function(_b84){
var _b85=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b84);
return UserInterface.registerBinding(_b85,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b86){
if(_b86 instanceof ToolBarBodyBinding){
if(_b86.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b86;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b86;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b86);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b87=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b87){
this.setImageSize(_b87);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b89=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b89.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b89.isDefaultContent=true;
this.add(_b89);
_b89.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b8b=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b8b);
}
if(_b8b!=null&&_b8b.hasClassName("max")){
this._maxToolBarGroup(_b8b,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b8d){
var _b8e=this.boxObject.getDimension().w;
var _b8f=CSSComputer.getPadding(this.bindingElement);
_b8e-=(_b8f.left+_b8f.right);
if(_b8d!=null){
_b8e-=_b8d.boxObject.getDimension().w;
if(!Client.isWindows){
_b8e-=1;
}
if(Client.isExplorer){
_b8e-=15;
}
}
max.bindingElement.style.width=_b8e+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b90){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b90);
};
ToolBarBinding.prototype.addLeft=function(_b91,_b92){
var _b93=null;
if(this._toolBarBodyLeft!=null){
_b93=this._toolBarBodyLeft.add(_b91,_b92);
}else{
throw new Error("No left toolbarbody");
}
return _b93;
};
ToolBarBinding.prototype.addLeftFirst=function(_b94,_b95){
var _b96=null;
if(this._toolBarBodyLeft){
_b96=this._toolBarBodyLeft.addFirst(_b94,_b95);
}else{
throw new Error("No left toolbarbody");
}
return _b96;
};
ToolBarBinding.prototype.addRight=function(_b97){
var _b98=null;
if(this._toolBarBodyRight){
_b98=this._toolBarBodyRight.add(_b97);
}else{
throw new Error("No left toolbarbody");
}
return _b98;
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
ToolBarBinding.newInstance=function(_b9b){
var _b9c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b9b);
return UserInterface.registerBinding(_b9c,ToolBarBinding);
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
var _b9d=this.getDescendantBindingsByLocalName("toolbargroup");
var _b9e=new List();
var _b9f=true;
_b9d.each(function(_ba0){
if(_ba0.isVisible&&!_ba0.isDefaultContent){
_b9e.add(_ba0);
}
});
while(_b9e.hasNext()){
var _ba1=_b9e.getNext();
_ba1.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b9f){
_ba1.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b9f=false;
}
if(!_b9e.hasNext()){
_ba1.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _ba4=list.getNext();
var _ba5=_ba4.getEqualSizeWidth();
if(_ba5>max){
max=_ba5;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _ba4=list.getNext();
_ba4.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_ba6,_ba7){
var _ba8=ToolBarBinding.superclass.add.call(this,_ba6);
if(!_ba7){
if(_ba6 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba8;
};
ToolBarBodyBinding.prototype.addFirst=function(_ba9,_baa){
var _bab=ToolBarBinding.superclass.addFirst.call(this,_ba9);
if(!_baa){
if(_ba9 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _bab;
};
ToolBarBodyBinding.newInstance=function(_bac){
var _bad=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_bac);
return UserInterface.registerBinding(_bad,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_bae){
switch(_bae){
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
var _baf=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_baf)=="toolbarbody"){
UserInterface.getBinding(_baf).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _bb0=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_bb0)=="toolbarbody"){
UserInterface.getBinding(_bb0).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bb1){
var _bb2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bb1);
return UserInterface.registerBinding(_bb2,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bb3){
var _bb4=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bb3);
return UserInterface.registerBinding(_bb4,ToolBarButtonBinding);
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
var _bb5=this.getProperty("label");
var _bb6=this.getProperty("image");
if(_bb5){
this.setLabel(_bb5);
}
if(_bb6){
this.setImage(_bb6);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bb7,_bb8){
if(this.isAttached){
this._labelBinding.setLabel(_bb7,_bb8);
}
this.setProperty("label",_bb7);
};
ToolBarLabelBinding.prototype.setImage=function(_bb9,_bba){
if(this.isAttached){
this._labelBinding.setImage(_bb9,_bba);
}
this.setProperty("image",_bb9);
};
ToolBarLabelBinding.newInstance=function(_bbb){
var _bbc=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bbb);
return UserInterface.registerBinding(_bbc,ToolBarLabelBinding);
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
var _bbd=this.getDescendantBindingsByLocalName("clickbutton");
if(_bbd.hasEntries()){
while(_bbd.hasNext()){
var _bbe=_bbd.getNext();
if(_bbe.isDefault){
this._defaultButton=_bbe;
_bbe.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bbe.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bbd;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bbf,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bbf,arg);
switch(_bbf){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bc1=this.getAncestorBindingByType(DialogBinding,true);
if(_bc1!=null&&_bc1.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bc2){
DialogToolBarBinding.superclass.handleAction.call(this,_bc2);
var _bc3=_bc2.target;
var _bc4=false;
var _bc5=this._buttons.reset();
if(_bc3 instanceof ClickButtonBinding){
switch(_bc2.type){
case Binding.ACTION_FOCUSED:
_bc3.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bc3;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bc3.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bc4&&_bc5.hasNext()){
var _bc6=_bc5.getNext();
_bc4=_bc6.isFocused;
}
if(!_bc4){
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
ComboBoxBinding.newInstance=function(_bc8){
var _bc9=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bc8);
return UserInterface.registerBinding(_bc9,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bca,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bca,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bce=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bce.each(function(_bcf){
var _bd0=_bcf.getProperty("oncommand");
_bcf.setProperty("hiddencommand",_bd0);
_bcf.deleteProperty("oncommand");
_bcf.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bd1=null;
var _bd2=this.getActiveMenuItemId();
_bce.reset();
while(_bce.hasNext()){
var _bd3=_bce.getNext();
if(_bd3.getProperty("id")==_bd2){
_bd1=_bd3;
break;
}
}
if(_bd1==null&&_bce.hasEntries()){
_bd1=_bce.getFirst();
}
if(_bd1!=null){
this.setButton(_bd1);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bd4){
if(_bd4 instanceof MenuItemBinding){
var _bd5=_bd4.getProperty("label");
var _bd6=_bd4.getProperty("image");
var _bd7=_bd4.getProperty("image-hover");
var _bd8=_bd4.getProperty("image-active");
var _bd9=_bd4.getProperty("image-disabled");
var _bda=_bd4.getProperty("hiddencommand");
this.setLabel(_bd5?_bd5:"");
this.image=_bd6;
this.imageHover=_bd6;
this.imageActive=_bd8;
this.imageDisabled=_bd9;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bda,this);
};
this.hideActiveItem(_bd4);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bdb){
if(_bdb instanceof MenuItemBinding){
this.setButton(_bdb);
this.setActiveMenuItemId(_bdb.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bdc){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bdd){
if(_bdd==_bdc){
Binding.prototype.hide.call(_bdd);
}else{
Binding.prototype.show.call(_bdd);
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
var _bdf=this._views;
for(var _be0 in ViewDefinitions){
var def=ViewDefinitions[_be0];
var key=def.perspective;
if(key!=null){
if(!_bdf.has(key)){
_bdf.set(key,new List());
}
var list=_bdf.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_be4,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_be4,arg);
switch(_be4){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _be7=this.bindingWindow.bindingMap.toolboxpopupgroup;
_be7.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_be7.add(StageViewMenuItemBinding.newInstance(_be7.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_be7.show();
}else{
_be7.hide();
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
TreeBinding.grid=function(_beb){
var _bec=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_beb);
var _bee=_beb%_bec;
if(_bee>0){
_beb=_beb-_bee+_bec;
}
return _beb+TreeBodyBinding.PADDING_TOP;
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
var _bef=this.getProperty("focusable");
if(_bef!=null){
this._isFocusable=_bef;
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
var _bf1=this.getProperty("builder");
if(_bf1){
this._buildFromTextArea(_bf1);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bf2=this.getProperty("selectable");
var _bf3=this.getProperty("selectionproperty");
var _bf4=this.getProperty("selectionvalue");
if(_bf2){
this.setSelectable(true);
if(_bf3){
this.setSelectionProperty(_bf3);
}
if(_bf4){
this.setSelectionValue(_bf4);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _bf7=UserInterface.getBinding(area);
var _bf8=this._treeBodyBinding;
function build(){
_bf8.subTreeFromString(area.value);
}
_bf7.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_bf9){
var _bfa=_bf9.getHandle();
if(this._treeNodeBindings.has(_bfa)){
throw "Duplicate treenodehandles registered: "+_bf9.getLabel();
}else{
this._treeNodeBindings.set(_bfa,_bf9);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_bfa)){
_bf9.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_bfc){
this._treeNodeBindings.del(_bfc.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_bfd){
var _bfe=null;
if(this._treeNodeBindings.has(_bfd)){
_bfe=this._treeNodeBindings.get(_bfd);
}else{
throw "No such treenode: "+_bfd;
}
return _bfe;
};
TreeBinding.prototype.handleAction=function(_bff){
TreeBinding.superclass.handleAction.call(this,_bff);
var _c00=_bff.target;
switch(_bff.type){
case TreeNodeBinding.ACTION_OPEN:
_bff.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_c00);
_bff.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_c00;
this.focusSingleTreeNodeBinding(_c00);
if(!this.isFocused){
this.focus();
}
_bff.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_c00;
this.focusSingleTreeNodeBinding(_c00);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_c00;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_c00;
this.focusSingleTreeNodeBinding(_c00);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bff.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_c00.isFocused){
this.blurSelectedTreeNodes();
}
_bff.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_c01,_c02){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_c03){
if(_c03!=null&&!_c03.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_c03);
_c03.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_c04){
this.blurSelectedTreeNodes();
while(_c04.hasNext()){
var _c05=_c04.getNext();
this._focusedTreeNodeBindings.add(_c05);
_c05.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c06=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c07=false;
var _c08=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c09=this._focusedTreeNodeBindings.getNext();
var _c0a=_c09.getProperty(this._selectionProperty);
if(_c0a!=null){
if(!this._selectionValue||this._selectionValue[_c0a]){
_c08=(this._selectedTreeNodeBindings[_c09.key]=_c09);
var _c0b=_c06[_c09.key];
if(!_c0b||_c0b!=_c08){
_c07=true;
}
}
}
}
if(_c08){
if(_c07){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c06){
for(var key in _c06){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c0d=new List();
for(var key in this._selectedTreeNodeBindings){
_c0d.add(this._selectedTreeNodeBindings[key]);
}
return _c0d;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c0f){
_c0f.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c10){
var _c11=_c10.getDescendantBindingsByLocalName("treenode");
var _c12=true;
var self=this;
_c11.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c12;
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
var _c15=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c15!=null){
this.focusSingleTreeNodeBinding(_c15);
_c15.callback();
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
TreeBinding.prototype.add=function(_c16){
var _c17=null;
if(this._treeBodyBinding){
_c17=this._treeBodyBinding.add(_c16);
}else{
this._treeNodeBuffer.add(_c16);
_c17=_c16;
}
return _c17;
};
TreeBinding.prototype.addFirst=function(_c18){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c19=this._treeBodyBinding.bindingElement;
_c19.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c1a,_c1b){
if(_c1b.isContainer&&_c1b.isOpen){
_c1b.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c1c){
this._isSelectable=_c1c;
if(_c1c){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c1d){
this._selectionProperty=_c1d;
};
TreeBinding.prototype.setSelectionValue=function(_c1e){
if(_c1e){
var list=new List(_c1e.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c20,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c20,arg);
switch(_c20){
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
var _c22=this.getFocusedTreeNodeBindings();
if(_c22.hasEntries()){
var node=_c22.getFirst();
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
var _c25=this.getFocusedTreeNodeBindings();
if(_c25.hasEntries()){
var node=_c25.getFirst();
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
var _c28=null;
while(next==null&&(_c28=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c28!=null){
next=_c28.getNextBindingByLocalName("treenode");
}
node=_c28;
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
var _c2a=DOMEvents.getTarget(e);
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
var _c2b=new TreeCrawler();
var list=new List();
_c2b.mode=TreeCrawler.MODE_GETOPEN;
_c2b.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c2e=list.getNext();
map.set(_c2e.getHandle(),true);
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
var _c33=this._positionIndicatorBinding;
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
if(y!=_c33.getPosition().y){
_c33.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c33.isVisible){
_c33.show();
}
}else{
if(_c33.isVisible){
_c33.hide();
}
}
}else{
if(_c33.isVisible){
_c33.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c36){
this._acceptingTreeNodeBinding=_c36;
this._acceptingPosition=_c36.boxObject.getLocalPosition();
this._acceptingDimension=_c36.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c36);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c37){
var map={};
var _c39=_c37.getChildBindingsByLocalName("treenode");
var _c3a,pos,dim,y;
y=TreeBinding.grid(_c37.boxObject.getLocalPosition().y);
map[y]=true;
while(_c39.hasNext()){
_c3a=_c39.getNext();
pos=_c3a.boxObject.getLocalPosition();
dim=_c3a.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c40 in this._acceptingPositions){
if(_c40==y){
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
TreeBinding.newInstance=function(_c41){
var _c42=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c41);
var _c43=UserInterface.registerBinding(_c42,TreeBinding);
_c43.treeBodyBinding=TreeBodyBinding.newInstance(_c41);
return _c43;
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
TreeBodyBinding.prototype.accept=function(_c44){
if(_c44 instanceof TreeNodeBinding){
this.logger.debug(_c44);
}
};
TreeBodyBinding.prototype.handleAction=function(_c45){
TreeBodyBinding.superclass.handleAction.call(this,_c45);
switch(_c45.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c45.target);
_c45.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c46){
var a=this.boxObject.getDimension().h;
var y=_c46.boxObject.getLocalPosition().y;
var h=_c46.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c4c=_c46.labelBinding.bindingElement;
if(y-t<0){
_c4c.scrollIntoView(true);
}else{
if(y-t+h>a){
_c4c.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c4d){
var _c4e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c4d);
return UserInterface.registerBinding(_c4e,TreeBodyBinding);
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
var _c4f=TreeNodeBinding.superclass.serialize.call(this);
if(_c4f){
_c4f.label=this.getLabel();
_c4f.image=this.getImage();
var _c50=this.getHandle();
if(_c50&&_c50!=this.key){
_c4f.handle=_c50;
}
if(this.isOpen){
_c4f.open=true;
}
if(this.isDisabled){
_c4f.disabled=true;
}
if(this.dragType){
_c4f.dragtype=this.dragType;
}
if(this.dragAccept){
_c4f.dragaccept=this.dragAccept;
}
}
return _c4f;
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
var _c52=UserInterface.getBinding(node);
if(_c52&&_c52.containingTreeBinding){
this.containingTreeBinding=_c52.containingTreeBinding;
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
var _c53=this.key;
var _c54=this.getProperty("handle");
if(_c54){
_c53=_c54;
}
return _c53;
};
TreeNodeBinding.prototype.setHandle=function(_c55){
this.setProperty("handle",_c55);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c57=this.getProperty("label");
var _c58=this.getProperty("tooltip");
var _c59=this.getProperty("oncommand");
var _c5a=this.getProperty("onbindingfocus");
var _c5b=this.getProperty("onbindingblur");
var _c5c=this.getProperty("focused");
var _c5d=this.getProperty("callbackid");
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
if(_c57!=null){
this.setLabel(_c57);
}
if(_c58!=null){
this.setToolTip(_c58);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c5f=this.bindingWindow.WindowManager;
if(_c59!=null){
this.oncommand=function(){
Binding.evaluate(_c59,this);
};
}
if(_c5a!=null){
this.onfocus=function(){
Binding.evaluate(_c5a,this);
};
}
if(_c5b!=null){
this.onblur=function(){
Binding.evaluate(_c5b,this);
};
}
if(_c5c==true){
this.focus();
}
if(_c5d!=null){
Binding.dotnetify(this,_c5d);
}
};
TreeNodeBinding.prototype.handleAction=function(_c60){
TreeNodeBinding.superclass.handleAction.call(this,_c60);
switch(_c60.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c60.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c61,_c62){
var _c63=true;
if(_c61 instanceof TreeNodeBinding){
var _c64=false;
var _c65=this.bindingElement;
var _c66=this.containingTreeBinding.bindingElement;
while(!_c64&&_c65!=_c66){
if(_c65==_c61.getBindingElement()){
_c64=true;
}else{
_c65=_c65.parentNode;
}
}
if(_c64){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c63=false;
}else{
this.acceptTreeNodeBinding(_c61,_c62);
}
}else{
_c63=false;
}
return _c63;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c67,_c68){
var _c69=_c67.serializeToString();
var _c6a=new BindingParser(this.bindingDocument);
var _c6b=_c6a.parseFromString(_c69).getFirst();
_c68=_c68?_c68:this.containingTreeBinding.getDropIndex();
var _c6c=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c6b,_c6c.get(_c68));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c67.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c6d=this.getProperty("image");
var _c6e=this.getProperty("image-active");
var _c6f=this.getProperty("image-disabled");
_c6e=_c6e?_c6e:this.isContainer?_c6d?_c6d:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c6d?_c6d:TreeNodeBinding.DEFAULT_ITEM;
_c6f=_c6f?_c6f:this.isContainer?_c6d?_c6d:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c6d?_c6d:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c6d=_c6d?_c6d:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c6d,imageHover:null,imageActive:_c6e,imageDisabled:_c6f});
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
TreeNodeBinding.prototype.setLabel=function(_c71){
this.setProperty("label",String(_c71));
if(this.isAttached){
this.labelBinding.setLabel(String(_c71));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c72){
this.setProperty("tooltip",String(_c72));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c72));
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
var _c73=this.imageProfile.getDefaultImage();
var _c74=this.imageProfile.getActiveImage();
_c74=_c74?_c74:_c73;
return this.isOpen?_c74:_c73;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c76=DOMEvents.getTarget(e);
var _c77=this.labelBinding.bindingElement;
var _c78=this.labelBinding.shadowTree.labelBody;
var _c79=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c76){
case _c77:
this._onAction(e);
break;
case _c78:
case _c79:
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
if(_c76.parentNode==this.bindingElement&&_c76.__updateType==Update.TYPE_INSERT){
var _c77=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c76)=="treenode"){
if(_c76==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c76,_c77.nextSibling);
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
switch(_c76){
case _c77:
case _c78:
case _c79:
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
var _c7d=true;
if(e.type=="mousedown"){
var _c7e=e.button==(e.target?0:1);
if(!_c7e){
_c7d=false;
}
}
if(_c7d){
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
var _c80=false;
if(e!=null){
_c80=e.shiftKey;
}
this.dispatchAction(_c80?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c83=this.getDescendantBindingsByLocalName("treenode");
_c83.each(function(_c84){
_c84.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c85){
var _c86=_c85.getAttribute("focused");
if(_c86=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c87){
var _c88=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c87);
return UserInterface.registerBinding(_c88,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c89){
var _c8a=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c89);
return UserInterface.registerBinding(_c8a,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c8b){
this.bindingElement.style.left=_c8b.x+"px";
this.bindingElement.style.top=_c8b.y+"px";
this._geometry.x=_c8b.x;
this._geometry.y=_c8b.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c8c){
var _c8d=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c8c);
return UserInterface.registerBinding(_c8d,TreePositionIndicatorBinding);
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
this.addFilter(function(_c8f){
var _c90=UserInterface.getBinding(_c8f);
var _c91=null;
var _c91=null;
if(!_c90 instanceof TreeNodeBinding){
_c91=NodeCrawler.SKIP_NODE;
}
return _c91;
});
this.addFilter(function(_c92,list){
var _c94=UserInterface.getBinding(_c92);
var _c95=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c94.isOpen){
list.add(_c94);
}
break;
}
return _c95;
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
ShadowBinding.prototype.shadow=function(_c96){
this.targetBinding=_c96;
_c96.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c96.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c96.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c96.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c96.isVisible){
this.show();
this.setPosition(_c96.getPosition());
this.setDimension(_c96.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c97){
ShadowBinding.superclass.handleAction.call(this,_c97);
var _c98=_c97.target;
if(_c98==this.targetBinding){
switch(_c97.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c97.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c98.isVisible){
this.show();
this.setPosition(_c98.getPosition());
this.setDimension(_c98.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c99){
var _c9a=this.offset-this.expand;
this.bindingElement.style.left=new String(_c99.x+_c9a)+"px";
this.bindingElement.style.top=new String(_c99.y+_c9a)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c9c){
var _c9d=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c9c);
return UserInterface.registerBinding(_c9d,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c9e){
this.binding=_c9e;
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
DockTabsButtonBinding.newInstance=function(_c9f){
var _ca0=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c9f);
_ca0.setAttribute("type","checkbox");
_ca0.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_ca0.className="tabbutton";
return UserInterface.registerBinding(_ca0,DockTabsButtonBinding);
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
var _ca1=DockBinding.superclass.serialize.call(this);
if(_ca1){
_ca1.active=this.isActive?true:null;
_ca1.collapsed=this.isCollapsed?true:null;
}
return _ca1;
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
var _ca2=UserInterface.getBinding(this.bindingElement.parentNode);
var _ca3=MatrixBinding.newInstance(this.bindingDocument);
_ca3.attachClassName("dockliner");
this.shadowTree.dockLiner=_ca3;
_ca2.add(_ca3);
_ca3.attach();
_ca3.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_ca5){
var _ca6=this.getSelectedTabPanelBinding();
if(_ca6){
_ca6.isVisible=_ca5;
_ca6.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_ca7){
var _ca8=this._getBindingForDefinition(_ca7);
var _ca9=DockTabBinding.newInstance(this.bindingDocument);
_ca9.setHandle(_ca7.handle);
_ca9.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_ca7.label);
_ca9.setImage(_ca7.image);
_ca9.setToolTip(_ca7.toolTip);
_ca9.setEntityToken(_ca7.entityToken);
_ca9.setAssociatedView(_ca8);
this.appendTabByBindings(_ca9,null);
this._setupPageBindingListeners(_ca9);
var _caa=this.getTabPanelBinding(_ca9);
_ca8.snapToBinding(_caa);
var _cab=this.bindingWindow.bindingMap.views;
_cab.add(_ca8);
if(!this.isActive){
this.activate();
}
_ca8.attach();
};
DockBinding.prototype.prepareOpenView=function(_cac,_cad){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_cad.setLabel(_cac.label);
_cad.setImage(_cac.image);
_cad.setToolTip(_cac.toolTip);
this._setupPageBindingListeners(_cad);
var _cae=this.getTabPanelBinding(_cad);
var _caf=this._getBindingForDefinition(_cac);
_cad.setAssociatedView(_caf);
_caf.snapToBinding(_cae);
UserInterface.getBinding(this.bindingDocument.body).add(_caf);
_caf.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_cb0){
var _cb1=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_cb1.bindingDocument);
view.setDefinition(_cb0);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_cb3){
var _cb4=this.getTabPanelBinding(_cb3);
var self=this;
var _cb6={handleAction:function(_cb7){
var _cb8=_cb7.target;
switch(_cb7.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_cb8.reflex(true);
var view=_cb3.getAssociatedView();
if(_cb8.bindingWindow==view.getContentWindow()){
_cb3.updateDisplay(_cb8);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_cb3.onPageInitialize(_cb8);
_cb7.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_cb3.updateDisplay(_cb8);
_cb7.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_cb3.updateEntityToken(_cb8);
_cb7.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_cb3.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_cb3.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_cb3);
_cb7.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_cb3,true);
_cb7.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_cb3);
break;
case Binding.ACTION_FORCE_REFLEX:
_cb4.reflex(true);
_cb7.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_cb3.isDirty){
_cb3.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cba){
_cb4.addActionListener(_cba,_cb6);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cbb){
DockBinding.superclass.handleAction.call(this,_cbb);
var _cbc=_cbb.target;
switch(_cbb.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cbb.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cbc instanceof DockBinding){
if(_cbc.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cbc);
if(this.isActive){
_cbc.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cbc);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_cbd,arg){
DockBinding.superclass.handleBroadcast.call(this,_cbd,arg);
switch(_cbd){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cbf=arg;
if(_cbf.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cbf.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cc0){
var tabs=this.getTabBindings();
var _cc2=false;
while(tabs.hasNext()&&!_cc2){
var tab=tabs.getNext();
var _cc4=tab.getEntityToken();
if(_cc4!=null&&_cc4==_cc0){
if(!tab.isSelected){
this.select(tab,true);
_cc2=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cc5){
this._handleCollapse(true,_cc5);
};
DockBinding.prototype.unCollapse=function(_cc6){
this._handleCollapse(false,_cc6);
};
DockBinding.prototype._handleCollapse=function(_cc7,_cc8){
var _cc9=this.getChildBindingByLocalName("dockpanels");
var _cca=this.getAncestorBindingByLocalName("splitbox");
if(_cc7){
_cc9.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cc8&&_cca.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cc9.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cc8){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cc7);
this.isCollapsed=_cc7;
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
DockBinding.prototype.closeTab=function(_ccf,_cd0){
if(_ccf.isDirty&&!_cd0){
var _cd1=Resolver.resolve(_ccf.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cd1),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cd3){
switch(_cd3){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_ccf);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_ccf);
break;
}
}});
}else{
this.removeTab(_ccf);
}
};
DockBinding.prototype.closeTabsExcept=function(_cd4){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cd4){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cd7){
var _cd8=_cd7.getAssociatedView();
_cd8.saveContainedEditor();
var self=this;
var _cda={handleBroadcast:function(_cdb,arg){
switch(_cdb){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cd8.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cda);
if(arg.isSuccess){
self.removeTab(_cd7);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cda);
};
DockBinding.prototype.appendTabByBindings=function(_cdd,_cde){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cdd,_cde);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cdf){
_cdf=_cdf?_cdf+"px":"100%";
this.bindingElement.style.width=_cdf;
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
DockBinding.prototype.showControls=function(_ce0){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_ce0){
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
var _ce3=DockControlBinding.newInstance(this.bindingDocument);
_ce3.setControlType(type);
return _ce3;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ce5=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ce5)){
_ce5=_ce5>0?_ce5-1:0;
self.bindingElement.style.width=new String(_ce5)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ce6){
DockTabsBinding.superclass.handleCrawler.call(this,_ce6);
switch(_ce6.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ce8=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ce8)){
_ce8=_ce8>0?_ce8-1:0;
self.bindingElement.style.width=new String(_ce8)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_ce9){
var _cea=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_ce9);
return UserInterface.registerBinding(_cea,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_ceb){
this._viewBinding=_ceb;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cec=DockTabBinding.superclass.serialize.call(this);
if(_cec){
_cec.label=null;
_cec.image=null;
_cec.handle=this.getHandle();
}
return _cec;
};
DockTabBinding.prototype.setHandle=function(_ced){
this.setProperty("handle",_ced);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cee){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cee;
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
var _cef=DialogControlBinding.newInstance(this.bindingDocument);
_cef.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cef);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cf0){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cf0){
this.isDirty=_cf0;
if(Binding.exists(this.labelBinding)){
var _cf1=this.labelBinding.getLabel();
if(_cf1!=null){
this.labelBinding.setLabel(_cf0?"*"+_cf1:_cf1.slice(1,_cf1.length));
}else{
this.labelBinding.setLabel(_cf0?"*":"");
}
}
}
var _cf2=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cf2.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cf2.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cf3){
this.setLabel(_cf3.getLabel());
this.setImage(_cf3.getImage());
this.setToolTip(_cf3.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cf4){
this.setEntityToken(_cf4.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cf5){
DockTabBinding.superclass.handleAction.call(this,_cf5);
var _cf6=_cf5.target;
switch(_cf5.type){
case ControlBinding.ACTION_COMMAND:
if(_cf6.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cf5.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cf6);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cf7){
var cmd=_cf7.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cf9){
if(!_cf9){
if(!this.getLabel()){
_cf9=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cf9=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_cf9);
};
DockTabBinding.prototype.setImage=function(_cfa){
if(!_cfa){
if(!this.getImage()){
_cfa=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cfa=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cfa);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cfd=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cfd;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cfd;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cfd;
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
var _cff=this.bindingElement;
setTimeout(function(){
_cff.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_d00,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_d00,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_d00){
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
DockTabBinding.prototype.select=function(_d05){
DockTabBinding.superclass.select.call(this,_d05);
this._updateBroadcasters();
if(_d05!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _d06=top.app.bindingMap.broadcasterCurrentTabDirty;
var _d07=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_d07.enable();
if(this.isDirty){
_d06.enable();
}else{
_d06.disable();
}
}else{
_d07.disable();
_d06.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_d08){
if(this._canUpdateTree||_d08){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _d09=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _d0b=win.bindingMap.savebutton;
if(_d0b!=null){
_d09=true;
}
}
}
return _d09;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_d0c){
var _d0d=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_d0c);
return UserInterface.registerBinding(_d0d,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d0e){
var _d0f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d0e);
return UserInterface.registerBinding(_d0f,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d10){
DockPanelBinding.superclass.select.call(this,_d10);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d11){
DockPanelBinding.superclass.handleCrawler.call(this,_d11);
if(_d11.response==null){
if(_d11.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d11.id==FocusCrawler.ID){
_d11.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d12){
var _d13=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d12);
return UserInterface.registerBinding(_d13,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d14){
var _d15=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d14);
return UserInterface.registerBinding(_d15,DockControlBinding);
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
ViewBinding.getInstance=function(_d16){
var _d17=ViewBinding._instances.get(_d16);
if(!_d17){
var cry="ViewBinding.getInstance: No such instance: "+_d16;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d17;
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
var _d1a=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d1a){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d1b=snap.boxObject.getGlobalPosition();
var _d1c=snap.boxObject.getDimension();
if(!Point.isEqual(_d1b,this._lastknownposition)){
this.setPosition(_d1b);
this._lastknownposition=_d1b;
}
if(!Dimension.isEqual(_d1c,this._lastknowndimension)){
this.setDimension(_d1c);
this._lastknowndimension=_d1c;
var _d1d=_d1c.h-ViewBinding.VERTICAL_ADJUST;
_d1d=_d1d<0?0:_d1d;
this.windowBinding.getBindingElement().style.height=new String(_d1d)+"px";
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
var _d1e=this._viewDefinition.flowHandle;
if(_d1e!=null){
FlowControllerService.CancelFlow(_d1e);
}
}
if(this._viewDefinition!=null){
var _d1f=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d1f);
this.logger.fine("ViewBinding closed: \""+_d1f+"\"");
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
var _d21=null;
if(this._viewDefinition!=null){
_d21=this._viewDefinition.handle;
}
return _d21;
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
ViewBinding.prototype.setDefinition=function(_d22){
this._viewDefinition=_d22;
if(_d22.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d23){
ViewBinding.superclass.handleAction.call(this,_d23);
var _d24=_d23.target;
switch(_d23.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d23.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d24.isActivated){
_d24.onActivate();
}
}
_d23.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d24==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d23.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d24==this._snapBinding){
if(_d24.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d24.getContentWindow().isPostBackDocument){
if(_d23.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d24.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d24==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d24.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d23.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d23.type==WindowBinding.ACTION_ONLOAD){
var win=_d24.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d24);
}
}
}
_d23.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d24.label&&this._viewDefinition.label){
_d24.label=this._viewDefinition.label;
}
if(!_d24.image&&this._viewDefinition.image){
_d24.image=this._viewDefinition.image;
}
if(_d24.bindingWindow==this.getContentWindow()){
this._pageBinding=_d24;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d24.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d24==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d23.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d23.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d29,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d29,arg);
switch(_d29){
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
var _d2d=def.argument;
if(_d2d!=null){
page.setPageArgument(_d2d);
}
var _d2e=def.width;
if(_d2e!=null){
page.width=_d2e;
}
var _d2f=def.height;
if(_d2f!=null){
page.height=_d2f;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d30){
ViewBinding.superclass.handleCrawler.call(this,_d30);
switch(_d30.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d30.id==FocusCrawler.ID){
if(_d30.previousNode!=this._snapBinding.bindingElement){
_d30.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d30.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d31){
_d31.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d31.x+"px";
this.bindingElement.style.top=_d31.y+"px";
};
ViewBinding.prototype.setDimension=function(_d32){
_d32.h-=ViewBinding.VERTICAL_ADJUST;
_d32.w-=ViewBinding.HORIZONTAL_ADJUST;
_d32.w-=1;
if(_d32.h<0){
_d32.h=0;
}
if(_d32.w<0){
_d32.w=0;
}
this.bindingElement.style.width=String(_d32.w)+"px";
this.bindingElement.style.height=String(_d32.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d33){
this.isFlexBoxBehavior=false;
_d33.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d33.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_d33.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d33.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d33;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d34=null;
if(this.isFreeFloating==true){
_d34=this._snapBinding.getBindingElement();
}else{
_d34=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d34;
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
ViewBinding.prototype.reload=function(_d35){
this._isLoaded=false;
this.windowBinding.reload(_d35);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d36=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d36=true;
}
}
if(!_d36){
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
ViewBinding.newInstance=function(_d3a){
var _d3b=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d3a);
var _d3c=UserInterface.registerBinding(_d3b,ViewBinding);
_d3c.windowBinding=_d3c.add(WindowBinding.newInstance(_d3a));
_d3c.windowBinding.isFlexible=false;
return _d3c;
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
var _d44=this.bindingWindow.__doPostBack;
var _d45=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d45){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d46,_d47){
if(!form.__isSetup){
Application.lock(self);
_d45=true;
}
self.manifestAllDataBindings();
_d44(_d46,_d47);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d48,list){
var _d4a=this.bindingWindow.bindingMap.__REQUEST;
if(_d4a!=null&&this._isDotNet()){
switch(_d48){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d4a.postback(_d48);
}
}
break;
default:
_d4a.postback(_d48);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d48,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d4b,list){
var _d4d=this.getDescendantBindingsByType(WindowBinding);
_d4d.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d4b,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d51){
if(_d51.name==null||_d51.name==""){
return;
}
list.add({name:_d51.name,value:_d51.value});
});
var out="";
list.each(function(_d53){
out+=_d53.name+": "+_d53.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d54){
PageBinding.superclass.handleAction.call(this,_d54);
var _d55=_d54.target;
switch(_d54.type){
case RootBinding.ACTION_PHASE_3:
if(_d55==UserInterface.getBinding(this.bindingDocument.body)){
_d55.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d55);
}
_d54.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d56=this.validateAllDataBindings();
if(_d56){
this.doPostBack(_d55);
}
}
_d54.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d54.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d55.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d55.key)){
this._initBlockers.del(_d55.key);
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
var _d58={handleAction:function(_d59){
if(_d59.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d58);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d58);
}else{
MessageQueue.udpdate();
}
_d54.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d5a,arg){
PageBinding.superclass.handleBroadcast.call(this,_d5a,arg);
switch(_d5a){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d5c=arg;
if(!this._canPostBack&&!_d5c){
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
PageBinding.prototype.doPostBack=function(_d5e){
if(this._canPostBack){
if(_d5e!=null&&this._isDotNet()){
var _d5f=_d5e.getCallBackID();
var _d60=_d5e.getCallBackArg();
if(_d5f!=null){
_d5f=_d5f.replace(/_/g,"$");
}else{
_d5f="";
}
if(_d60==null){
_d60="";
}
this.bindingWindow.__doPostBack(_d5f,_d60);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d61){
var _d62=true;
var _d63=this.bindingWindow.DataManager.getAllDataBindings();
while(_d63.hasNext()&&_d62){
var _d64=_d63.getNext();
if(_d64.isAttached){
var _d65=_d64.validate();
if(_d62&&!_d65){
_d62=false;
this.logger.debug("Invalid DataBinding: "+_d64.toString()+" ("+_d64.getName()+")");
if(_d61){
var _d66=_d64.getAncestorBindingByType(TabPanelBinding);
if(_d66!=null&&!_d66.isVisible){
var _d67=_d66.getAncestorBindingByType(TabBoxBinding);
var _d68=_d67.getTabBinding(_d66);
_d67.select(_d68);
}
}
break;
}
}
}
return _d62;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d6a=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6a.hasNext()){
var _d6b=_d6a.getNext();
if(_d6b.isAttached){
var _d6c=_d6b.manifest();
if(_d6c!=null){
list.add(_d6c);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d6d=this.bindingWindow.DataManager.getAllDataBindings();
while(_d6d.hasNext()){
var _d6e=_d6d.getNext();
if(_d6e.isAttached){
_d6e.clean();
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
var _d70=this._cachedFocus.getBinding();
if(_d70){
_d70.blur();
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
var _d71=this.getProperty("width");
if(!_d71){
_d71=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d71;
}
if(this.height==null){
var _d72=this.getProperty("height");
this.height=_d72?_d72:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d73=this.getProperty("minheight");
if(_d73!=null){
this.minheight=_d73;
}
}
if(this.controls==null){
var _d74=this.getProperty("controls");
this.controls=_d74?_d74:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d75=this.getProperty("resizable");
this.isResizable=_d75?_d75:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d76){
if(_d76!=this.isAutoHeightLayoutMode){
if(_d76){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d76;
}
};
DialogPageBinding.prototype.handleAction=function(_d77){
DialogPageBinding.superclass.handleAction.call(this,_d77);
var _d78=_d77.target;
switch(_d77.type){
case PageBinding.ACTION_ATTACHED:
if(_d78!=this&&_d78.isFitAsDialogSubPage){
_d78.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d77.consume();
if(_d78.response!=null){
this.response=_d78.response;
switch(_d78.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d79){
var _d7a=this.bindingWindow.bindingMap.buttonAccept;
if(_d7a!=null){
_d7a.setDisabled(_d79);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d7b){
var _d7c=CSSComputer.getPadding(this.bindingElement);
var _d7d=CSSComputer.getBorder(this.bindingElement);
_d7b+=_d7c.top+_d7c.bottom;
_d7b+=_d7d.top+_d7d.bottom;
if(_d7b>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d7b+"px";
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
EditorPageBinding.prototype.handleAction=function(_d85){
EditorPageBinding.superclass.handleAction.call(this,_d85);
var _d86=_d85.target;
switch(_d85.type){
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
var _d87=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d86.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d87==-1){
_d87=0;
}
}else{
_d87++;
}
return res;
});
if(_d87>-1){
this._messengers.del(_d87);
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
_d85.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d86.key,_d86);
if(_d86 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d86.key);
if(_d86 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d86==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d86.getSelectedTabBinding();
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
_d85.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d86==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d85.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d86==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d85.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d86==this._windowBinding){
if(_d86.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d8c=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d8c);
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
var _d8d=this.bindingWindow.bindingMap.savebutton;
if(_d8d!=null&&!_d8d.isDisabled){
_d8d.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d8e=this.bindingWindow.bindingMap.__REQUEST;
if(_d8e!=null){
_d8e.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d8f=this.bindingWindow.bindingMap.__REQUEST;
if(_d8f!=null){
_d8f.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d90){
this._message=null;
switch(_d90){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d90,this._messengers);
if(!this._messengers.hasEntries()){
if(_d90==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d90;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d90;
EditorPageBinding.superclass.postMessage.call(this,_d90,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d90,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d91,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d91,arg);
switch(_d91){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d93=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d93);
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
var _d94=new List();
this._invalidBindings.each(function(key,_d96){
var list=_d96.getInvalidLabels();
if(list){
list.each(function(_d98){
_d94.add(_d98);
});
}
});
if(_d94.hasEntries()){
var _d99="";
while(_d94.hasNext()){
_d99+=_d94.getNext().toLowerCase();
if(_d94.hasNext()){
_d99+=", ";
}else{
_d99+=".";
}
}
var _d9a=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d9a+" "+_d99);
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
EditorPageBinding.prototype.enableSave=function(_d9b){
var _d9c=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d9c){
var _d9d=UserInterface.getBinding(_d9c);
if(_d9b){
_d9d.enable();
}else{
_d9d.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d9e=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d9e!=null){
UserInterface.getBinding(_d9e).enable();
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
var _d9f=this._windowBinding.getContentDocument().title;
if(_d9f==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _da0=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_da2){
if(_da2.name=="__EVENTTARGET"&&_da0){
_da2.value=_da0;
}
list.add({name:_da2.name,value:_da2.value});
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
WizardPageBinding.prototype.handleAction=function(_da4){
WizardPageBinding.superclass.handleAction.call(this,_da4);
var _da5=_da4.target;
switch(_da4.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_da5);
}else{
_da4.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_da5);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_da4.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_da4.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_da6){
var next=this.bindingWindow.bindingMap.nextbutton;
var _da8=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_da6);
}
if(_da8){
_da8.setDisabled(!_da6);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_da9,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_da9,arg);
var self=this;
switch(_da9){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_dad){
};
MarkupAwarePageBinding.prototype._activate=function(_dae){
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
var _daf=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_daf.boxObject.getDimension().w;
_daf.hide();
var _db0=this.boxObject.getDimension().h;
this.bindingElement.style.height=_db0+"px";
var self=this;
var _db2=this.bindingWindow.bindingMap.moreactionsbutton;
_db2.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_db3){
self._showMoreActions();
_db3.consume();
}});
var _db4=this.bindingWindow.bindingMap.moreactionspopup;
_db4.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_db5){
var item=_db5.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_db7,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_db7,arg);
switch(_db7){
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
var _dbb=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dbb!=null){
_dbb.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dbc=this.bindingWindow.WindowManager;
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
var _dbd=new String("");
this._actionProfile.each(function(_dbe,list){
list.each(function(_dc0){
_dbd+=_dc0.getHandle()+";"+_dc0.getKey()+";";
if(_dc0.isDisabled()){
_dbd+="isDisabled='true';";
}
});
});
return _dbd;
};
SystemToolBarBinding.prototype.handleAction=function(_dc1){
SystemToolBarBinding.superclass.handleAction.call(this,_dc1);
switch(_dc1.type){
case ButtonBinding.ACTION_COMMAND:
var _dc2=_dc1.target;
this._handleSystemAction(_dc2.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dc3){
if(_dc3!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dc5=list.getFirst();
var _dc6=_dc5.node;
}
SystemAction.invoke(_dc3,_dc6);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dc9,list){
var _dcb=new List();
list.reset();
while(list.hasNext()){
var _dcc=list.getNext();
var _dcd=null;
if(_dcc.isInToolBar()){
if(_dcc.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dcd=self.getToolBarButtonBinding(_dcc);
}
}
if(_dcd!=null){
_dcb.add(_dcd);
}
}
if(_dcb.hasEntries()){
var _dce=ToolBarGroupBinding.newInstance(doc);
_dcb.each(function(_dcf){
_dce.add(_dcf);
});
self.addLeft(_dce);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dd0=this.bindingWindow.bindingMap.toolsbutton;
var _dd1=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dd2=_dd0.bindingElement.offsetLeft-this._moreActionsWidth;
var _dd3=0;
var _dd4=new List();
var _dd5,_dd6=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dd5=_dd6.getNext())!=null){
if(!_dd5.isVisible){
_dd5.show();
}
_dd3+=_dd5.boxObject.getDimension().w;
if(_dd3>=_dd2){
_dd4.add(_dd5);
_dd5.hide();
}
}
if(_dd4.hasEntries()){
var _dd7=_dd4.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dd7).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dd5=_dd4.getNext())!=null){
this._moreActions.add(_dd5.associatedSystemAction);
}
_dd1.show();
}else{
this._moreActions=null;
_dd1.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dd8=this.bindingWindow.bindingMap.moreactionspopup;
_dd8.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dd8.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dd8.add(item);
}
_dd8.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dda){
var _ddb=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _ddc=_dda.getLabel();
var _ddd=_dda.getToolTip();
var _dde=_dda.getImage();
var _ddf=_dda.isDisabled();
if(_dde&&_dde.indexOf("size=")==-1){
_dde=_dde+"&size="+this.getImageSize();
_ddb.imageProfile=new ImageProfile({image:_dde});
}
if(_ddc){
_ddb.setLabel(_ddc);
}
if(_ddd){
_ddb.setToolTip(_ddd);
}
if(_dda.isDisabled()){
_ddb.disable();
}
_ddb.associatedSystemAction=_dda;
return _ddb;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _de0=this.getDescendantBindingByLocalName("toolbarbutton");
if(_de0!=null){
_de0.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_de1){
var _de2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_de1);
return UserInterface.registerBinding(_de2,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_de3){
var _de4=SystemTreeBinding.superclass.add.call(this,_de3);
if(!this._defaultTreeNode){
if(_de3 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_de3;
}
}
return _de4;
};
SystemTreeBinding.prototype.handleAction=function(_de5){
SystemTreeBinding.superclass.handleAction.call(this,_de5);
var _de6=_de5.target;
switch(_de5.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_de6.key);
this._updateFocusedNode();
_de5.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_de5.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_de6.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_de5.consume();
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
var _de8=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_de8);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_de9){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_de9);
var reg=this._entityTokenRegistry;
var _deb=_de9.node.getEntityToken();
if(reg.has(_deb)){
reg.get(_deb).add(_de9);
}else{
reg.set(_deb,new List([_de9]));
}
var _dec=null;
if(this.isLockedToEditor){
if(_deb==StageBinding.entityToken){
if(_de9.node.isTreeLockEnabled()){
_dec=_de9;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_de9.node.getHandle()){
_dec=_de9;
}
}
}
if(_dec!=null){
this.focusSingleTreeNodeBinding(_dec);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_ded){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_ded);
var reg=this._entityTokenRegistry;
var _def=_ded.node.getEntityToken();
if(reg.has(_def)){
var list=reg.get(_def);
list.del(_ded);
if(!list.hasEntries()){
reg.del(_def);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_ded.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_ded.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _df3=this._refreshingTreeNodes;
if(_df3.hasEntries()&&_df3.has(key)){
_df3.del(key);
if(!_df3.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _df4=StageBinding.entityToken;
if(_df4!=null){
this._focusTreeNodeByEntityToken(_df4);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _df5=false;
var _df6=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_df5=false;
}else{
if(_df6.hasEntries()){
_df5=true;
while(_df5&&_df6.hasNext()){
var _df7=_df6.getNext();
if(!_df7.isDraggable){
_df5=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_df5;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_df8,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_df8,arg);
switch(_df8){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_df8,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_df8);
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
var self=this,_dfc=arg;
setTimeout(function(){
if(_dfc!=null){
self._focusTreeNodeByEntityToken(_dfc);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _dfe=tab.perspectiveNode==null;
if(!_dfe){
_dfe=tab.perspectiveNode==this.perspectiveNode;
}
if(_dfe){
var self=this,_e00=tab.getEntityToken();
setTimeout(function(){
if(_e00==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_e00);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_e01,_e02){
this.isLockFeatureFocus=true;
var _e03=null;
if(this._entityTokenRegistry.has(_e01)){
var list=this._entityTokenRegistry.get(_e01);
list.each(function(tn){
var _e06=true;
if(tn.node.isTreeLockEnabled()){
_e03=tn;
_e06=false;
}
return _e06;
});
if(_e03!=null){
if(!_e03.isFocused){
this.focusSingleTreeNodeBinding(_e03,true);
}else{
_e03.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_e03==null&&_e02!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_e01);
self._focusTreeNodeByEntityToken(_e01,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_e08){
var _e09=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _e0a=this.getRootTreeNodeBindings();
while(_e0a.hasNext()){
var _e0b=_e0a.getNext();
_e09.add(_e0b.node.getEntityToken());
}
}else{
_e09.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_e09.hasNext()){
var _e0c=_e09.getNext();
var _e0d=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_e0c,_e08,_e0d);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e10=this._treeNodeBindings;
var _e11=new Map();
function fix(_e12,list){
if(!_e12.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e10.has(node.getHandle())){
var _e15=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e11.set(node.getHandle(),_e15);
_e12.add(_e15);
}
});
_e12.attachRecursive();
}
}
_e12.open(true);
}
map.each(function(_e16,list){
if(_e10.has(_e16)){
var _e18=_e10.get(_e16);
fix(_e18,list);
}else{
if(_e11.has(_e16)){
var _e19=_e11.get(_e16);
fix(_e19,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e1a,arg){
switch(_e1a){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e1c=arg;
if(_e1c!=null){
this._invokeServerRefresh(_e1c);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e1d=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e1d;
_e1d.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e1d=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e1d;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e1e){
if(_e1e!=null&&_e1e=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e1e)){
var list=this._entityTokenRegistry.get(_e1e).reset();
this._refreshToken=_e1e;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e20=list.getNext();
this._refreshingTreeNodes.set(_e20.key,true);
setTimeout(function(){
_e20.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e21=this.getFocusedTreeNodeBindings().getFirst();
if(_e21){
var _e22=_e21.getLabel();
var _e23=_e21.getAncestorBindingByLocalName("treenode");
if(_e23){
_e21=_e23;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e21.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e24=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e24,[_e22]);
}
_e21.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e25=SystemTreeBinding.clipboard;
if(_e25){
var type=_e25.dragType;
var _e27=this.getFocusedTreeNodeBindings().getFirst();
if(_e27.dragAccept){
if(_e27.acceptor.isAccepting(type)){
this._performPaste(_e27);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e28){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e28.node.hasDetailedDropSupport()){
if(_e28.node.hasChildren()){
var _e2a=_e28.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e2b,_e2c){
if(_e2b==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e2d=_e2c.get("switch");
var _e2e=_e2c.get("sibling");
if(_e2d=="after"){
_e2e++;
}
var _e2f=_e28.accept(SystemTreeBinding.clipboard,_e2e);
if(_e2f){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e2a);
}else{
Application.lock(self);
var _e30=_e28.accept(SystemTreeBinding.clipboard,0);
if(_e30){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e30=_e28.accept(SystemTreeBinding.clipboard,0);
if(_e30){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e31=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e31!=null){
this._focusTreeNodeByEntityToken(_e31);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e32){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e32){
this.blurSelectedTreeNodes();
var _e33=this.getRootTreeNodeBindings();
_e33.each(function(_e34){
if(_e34.isContainer&&_e34.isOpen){
_e34.close();
_e34.hasBeenOpened=false;
_e34.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e35){
if(_e35!=this.isLockedToEditor){
this.isLockedToEditor=_e35;
if(_e35){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e37=this.getRootTreeNodeBindings();
_e37.each(function(_e38){
var _e39=_e38.getOpenSystemNodes();
if(_e39!=null&&_e39.hasEntries()){
list.merge(_e39);
}else{
if(_e38.isOpen){
list.add(_e38.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e3a){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e3a);
if(_e3a!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e3c=new Map();
var _e3d=this.getFocusedTreeNodeBindings();
var _e3e=_e3d.getFirst().node.getActionProfile();
var self=this;
_e3e.each(function(_e40,list){
var _e42=new List();
list.each(function(_e43){
if(_e43.getActivePositions()&self._activePosition){
_e42.add(_e43);
}
});
if(_e42.hasEntries()){
_e3c.set(_e40,_e42);
}
});
_e3c.activePosition=this._activePosition;
return _e3c;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e44,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e44,arg);
switch(_e44){
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
var _e49=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e49.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e4a=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e4a.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e4b){
SystemTreePopupBinding.superclass.handleAction.call(this,_e4b);
switch(_e4b.type){
case MenuItemBinding.ACTION_COMMAND:
var _e4c=_e4b.target;
var _e4d=_e4c.associatedSystemAction;
if(_e4d){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e4f=list.getFirst();
var _e50=_e4f.node;
}
SystemAction.invoke(_e4d,_e50);
}else{
var cmd=_e4c.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e53=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e53=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e53=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e53=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e53=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e53){
setTimeout(function(){
EventBroadcaster.broadcast(_e53);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e54=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e54.hasNext()){
var _e55=UserInterface.getBinding(_e54.getNext());
if(!_e55.getProperty("rel")){
_e55.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e57=new List();
var self=this;
this._actionProfile.each(function(_e59,list){
var _e5b=MenuGroupBinding.newInstance(doc);
list.each(function(_e5c){
var _e5d=self.getMenuItemBinding(_e5c);
_e5b.add(_e5d);
});
_e57.add(_e5b);
});
_e57.reverse();
while(_e57.hasNext()){
this._bodyBinding.addFirst(_e57.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e5e){
var _e5f=MenuItemBinding.newInstance(this.bindingDocument);
var _e60=_e5e.getLabel();
var _e61=_e5e.getToolTip();
var _e62=_e5e.getImage();
var _e63=_e5e.getDisabledImage();
var _e64=_e5e.isCheckBox();
if(_e60){
_e5f.setLabel(_e60);
}
if(_e61){
_e5f.setToolTip(_e61);
}
if(_e62){
_e5f.imageProfile=new ImageProfile({image:_e62,imageDisabled:_e63});
}
if(_e64){
_e5f.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e5e.isChecked()){
_e5f.check(true);
}
}
if(_e5e.isDisabled()){
_e5f.disable();
}
_e5f.associatedSystemAction=_e5e;
return _e5f;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e68=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e68=UserInterface.getBinding(node);
if(_e68.isDisabled){
_e68=null;
}
}
break;
}
if(_e68!=null&&_e68.node!=null&&_e68.node.getActionProfile()!=null){
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
var _e69=this.node.getLabel();
if(_e69){
this.setLabel(_e69);
}
var _e6a=this.node.getToolTip();
if(_e6a){
this.setToolTip(_e6a);
}
var _e6b=this.node.getHandle();
if(_e6b){
this.setHandle(_e6b);
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
var _e6e="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e6e+=list.getNext();
if(list.hasNext()){
_e6e+=" ";
}
}
this.setProperty("dragaccept",_e6e);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e70){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e70);
switch(_e70.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e70.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e70.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e71,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e71,arg);
switch(_e71){
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
var _e74=null;
var _e75=this.node.getImageProfile();
if(_e75){
if(this.isOpen){
_e74=_e75.getActiveImage();
}else{
_e74=_e75.getDefaultImage();
}
}
if(!_e74){
_e74=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e74;
};
SystemTreeNodeBinding.prototype.open=function(_e76){
var _e77=this.isContainer&&!this.isOpen;
var _e78=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e77&&(_e78||SystemTreeBinding.HAS_NO_MEMORY)&&_e76!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e79=null;
if(this.isContainer){
_e79=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e79);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e7b){
if(_e7b!=null){
this._refreshBranch(_e7b);
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
var _e7c=new List();
var _e7d=this.node.getChildren();
this.empty();
if(_e7d.hasEntries()){
this._insertTreeNodesRegulated(_e7d);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e7e){
var _e7f=0;
var _e80=new List([]);
while(_e7e.hasEntries()&&_e7f<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e81=SystemTreeNodeBinding.newInstance(_e7e.extractFirst(),this.bindingDocument);
_e81.autoExpand=this.autoExpand;
this.add(_e81);
_e81.attach();
_e7f++;
if(this.autoExpand){
if(_e7f==1&&!_e7e.hasEntries()||LastOpenedSystemNodes.isOpen(_e81)){
_e80.add(_e81);
}
}
}
if(_e7e.hasEntries()){
this._insertBufferTreeNode(_e7e);
}
_e80.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e84){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e86=this.node.getDescendantBranch(list);
if(_e86.hasEntries()){
this.XXX(_e86);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e87){
var self=this;
var map=new Map();
this.empty();
_e87.each(function(key,_e8b){
if(_e8b.hasEntries()){
_e8b.each(function(node){
var _e8d=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e8d);
if(map.has(key)){
var _e8e=map.get(key);
_e8e.add(_e8d);
_e8e.isOpen=true;
_e8e.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e8d);
}else{
}
}
});
}
});
this.attachRecursive();
_e87.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e8f=new TreeCrawler();
var _e90=new List();
_e8f.mode=TreeCrawler.MODE_GETOPEN;
_e8f.crawl(this.bindingElement,_e90);
if(_e90.hasEntries()){
_e90.extractFirst();
}
_e8f.dispose();
return _e90;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e91=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e91=new List([this.node]);
list.each(function(_e93){
_e91.add(_e93.node);
});
}
return _e91;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e94,_e95){
var _e96=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e94 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e94.node.getData(),this.node.getData(),_e95?_e95:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e96);
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
SystemTreeNodeBinding.newInstance=function(node,_e9a){
var _e9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e9a);
var _e9c=UserInterface.registerBinding(_e9b,SystemTreeNodeBinding);
_e9c.node=node;
return _e9c;
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
SystemPageBinding.prototype.setPageArgument=function(_e9d){
this.node=_e9d;
SystemPageBinding.superclass.setPageArgument.call(this,_e9d);
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
var _e9e=this.node.getChildren();
if(_e9e.hasEntries()){
while(_e9e.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e9e.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _ea0=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_ea0.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _ea2=new TreeCrawler();
var _ea3=new List();
_ea2.mode=TreeCrawler.MODE_GETOPEN;
_ea2.crawl(this.bindingElement,_ea3);
_ea2.dispose();
var list=new List([this.node]);
_ea3.each(function(_ea5){
list.add(_ea5.node);
});
this._tree.empty();
var _ea6=this.node.getDescendantBranch(list);
if(_ea6.hasEntries()){
var self=this;
var map=new Map();
_ea6.each(function(key,_eaa){
_eaa.each(function(node){
var _eac=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_eac);
if(map.has(key)){
var _ead=map.get(key);
_ead.add(_eac);
_ead.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_eac);
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
SystemPageBinding.prototype.handleAction=function(_eae){
SystemPageBinding.superclass.handleAction.call(this,_eae);
switch(_eae.type){
case ButtonBinding.ACTION_COMMAND:
var _eaf=_eae.target;
switch(_eaf.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_eaf.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_eb0,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_eb0,arg);
switch(_eb0){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _eb2=arg;
if(this.node&&this.node.getEntityToken()==_eb2){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_eb2);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_eb2);
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
StageContainerBinding.prototype.handleBroadcast=function(_eb4,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_eb4,arg);
var _eb6=this.bindingWindow.WindowManager;
switch(_eb4){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_eb6.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _eb6.WINDOW_RESIZED_BROADCAST:
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
var _eb8=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eb8.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_eb9){
if(StageBinding.isViewOpen(_eb9)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_eb9);
}else{
var _eba=ViewDefinitions[_eb9];
StageBinding.presentViewDefinition(_eba);
}
};
StageBinding.isViewOpen=function(_ebb){
return StageBinding.bindingInstance._activeViewDefinitions[_ebb]!=null;
};
StageBinding.presentViewDefinition=function(_ebc){
if(_ebc.label!=null){
var _ebd=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ebd,[_ebc.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ebc);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ebf,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ec1=System.getPerspectiveNodes();
if(_ec1.hasEntries()){
this._initializeSystemViewDefinitions(_ec1);
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
var _ec3=null;
if(LocalStore.isEnabled){
_ec3=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ec3&&ViewDefinitions[_ec3]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ec3));
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
var _ec5=root.getActionProfile();
if(_ec5&&_ec5.hasEntries()){
var _ec6=top.app.bindingMap.toolsmenugroup;
if(_ec6){
_ec5.each(function(_ec7,list){
list.each(function(_ec9){
var item=MenuItemBinding.newInstance(_ec6.bindingDocument);
item.setLabel(_ec9.getLabel());
item.setToolTip(_ec9.getToolTip());
item.setImage(_ec9.getImage());
item.setDisabled(_ec9.isDisabled());
item.associatedSystemAction=_ec9;
var _ecb=_ec6;
var tag=_ec9.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ecb=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ecb.add(item);
});
});
_ec6.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ecd){
while(_ecd.hasNext()){
var node=_ecd.getNext();
var _ecf=node.getHandle();
ViewDefinitions[_ecf]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ed0){
StageBinding.superclass.handleAction.call(this,_ed0);
var _ed1=_ed0.target;
switch(_ed0.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ed1;
this._inflateBinding(_ed1);
_ed0.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ed1;
this._inflateBinding(_ed1);
_ed0.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ed1);
_ed0.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ed1 instanceof DockBinding){
switch(_ed1.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ed1.reference,_ed1);
break;
}
this.handleAttachedDock(_ed1);
_ed0.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ed1 instanceof DockBinding){
this.handleSelectedDockTab(_ed1.getSelectedTabBinding());
_ed0.consume();
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
_ed0.consume();
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
_ed0.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ed0);
};
StageBinding.prototype.handleBroadcast=function(_ed3,arg){
StageBinding.superclass.handleBroadcast.call(this,_ed3,arg);
switch(_ed3){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ed5=arg;
this._dontView(_ed5);
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
StageBinding.prototype._showStart=function(_ed7){
if(_ed7!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _eda=this.bindingWindow.bindingMap.maindecks;
if(_ed7){
_eda.select("startdeck");
view.show();
}else{
view.hide();
_eda.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ed7;
}
};
StageBinding.prototype._inflateBinding=function(_edb){
for(var _edc in ViewDefinitions){
var _edd=ViewDefinitions[_edc];
if(_edd instanceof SystemViewDefinition){
_edb.mountDefinition(_edd);
}
}
var _ede=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ede){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ee1=new StageCrawler();
_ee1.mode=mode;
_ee1.crawl(this.bindingElement);
_ee1.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ee2){
var _ee3=_ee2.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ee3);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ee3));
}
};
StageBinding.prototype.handleAttachedDock=function(_ee4){
var _ee5=_ee4.getTabBindings();
if(_ee5.hasEntries()){
while(_ee5.hasNext()){
var _ee6=_ee5.getNext();
var _ee7=_ee6.getHandle();
if(_ee7){
if(_ee7=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ee8=ViewDefinitions[_ee7];
if(_ee8){
this._view(_ee4,_ee6,_ee8,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ee7+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ee9){
var _eea=null;
var _eeb=false;
switch(_ee9.position){
case Dialog.MODAL:
_eea=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_eea=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ee9.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_eea=this._dockBindings.get(_ee9.position);
break;
case DockBinding.EXTERNAL:
window.open(_ee9.url);
_eeb=true;
break;
default:
var _eec=this._decksBinding.getSelectedDeckBinding();
_eea=_eec.getDockBindingByReference(_ee9.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _eed=this.bindingWindow.bindingMap.maindecks;
_eed.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_eeb=true;
}
break;
}
if(!_eeb){
if(_eea!=null){
this._view(_eea,null,_ee9,true);
}else{
throw "StageBinding: Could not position view: "+_ee9.handle;
}
}
};
StageBinding.prototype._view=function(_eee,_eef,_ef0,_ef1){
var _ef2=_ef0.handle;
if(_ef0.isMutable){
_ef2+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ef2]){
var _ef3=ViewBinding.getInstance(_ef2);
if(_ef3!=null){
_ef3.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ef2);
}
}else{
this._activeViewDefinitions[_ef2]=_ef0;
Application.lock(this);
switch(_eee.constructor){
case DockBinding:
if(_ef1){
_eee.prepareNewView(_ef0);
}else{
_eee.prepareOpenView(_ef0,_eef);
}
break;
case StageDialogBinding:
if(_ef1){
_eee.prepareNewView(_ef0);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ef4){
if(this._activeViewDefinitions[_ef4]!=null){
delete this._activeViewDefinitions[_ef4];
}else{
this.logger.debug("Could not unregister active view: "+_ef4);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ef5){
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
this.addFilter(function(_ef7){
var _ef8=UserInterface.getBinding(_ef7);
var _ef9=null;
if(_ef8){
switch(_ef8.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_ef8.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_ef8.handleUnMaximization();
break;
}
break;
case DockBinding:
_ef9=NodeCrawler.SKIP_NODE;
break;
}
}
return _ef9;
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
var _efa=null;
this._dialogs.each(function(_efb){
if(!_efb.isVisible){
_efa=_efb;
}
return _efa!=null;
});
if(!_efa){
this._newInstance();
_efa=this._dialogs.getLast();
}
_efa.setModal(false);
return _efa;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _efc=this.getInstance();
_efc.setModal(true);
return _efc;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _efd=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_efd);
_efd.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_efe){
if(_efe instanceof DialogViewDefinition){
var _eff=ViewBinding.newInstance(this.bindingDocument);
_eff.setDefinition(_efe);
_eff.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_efe.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_efe.handler)){
this._dialogResponseHandler=_efe.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_eff;
this._body.add(_eff);
_eff.attach();
_eff.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_f00){
StageDialogBinding.superclass.handleAction.call(this,_f00);
var _f01=_f00.target;
switch(_f00.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_f01);
_f00.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_f01.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_f00.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_f01.response){
this._handleDialogPageResponse(_f01);
}
_f00.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_f00.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_f00.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_f01.dispose();
_f00.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_f00.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_f00.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_f00.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_f00.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_f00.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_f01==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_f02,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_f02,arg);
switch(_f02){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_f04){
var _f05=new FitnessCrawler();
var list=new List();
if(_f04){
_f05.mode=FitnessCrawler.MODE_BRUTAL;
}
_f05.crawl(this.bindingElement,list);
_f05.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_f07){
_f07.fit(_f04);
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
var _f08=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_f08){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_f0a){
var cmd=_f0a.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_f0c){
if(_f0c.bindingDocument==this._viewBinding.getContentDocument()){
if(_f0c instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_f0c);
}
this._pageBinding=_f0c;
if(_f0c.height=="auto"){
_f0c.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f0c);
_f0c.enableAutoHeightLayoutMode(false);
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
if(_f0c.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_f0c);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f0d){
var _f0e=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f0e){
var _f0f=UserInterface.getBinding(_f0e);
_f0f.setDisabled(_f0d);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f10){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f10.response,_f10.result!=null?_f10.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_f11){
if(_f11.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f11);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f13){
switch(_f13.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f13.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f13.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f14){
var _f15=_f14.label;
var _f16=_f14.image;
var _f17=_f14.width;
var _f18=_f14.height;
var _f19=_f14.controls;
var _f1a=_f14.isResizable;
if(_f15){
this.setLabel(_f15);
}
if(_f16){
this.setImage(_f16);
}
if(_f17||_f18){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f17?_f17:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f18!=null&&_f18!="auto")?_f18:old.h;
this.setDimension(nev);
}
if(_f19){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f1e=new List(_f19.split(" "));
while((type=_f1e.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f1a!=this._isResizable){
this.setResizable(_f1a);
}
if(_f18=="auto"){
this._fixAutoHeight(_f14);
}
if(_f14==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f1f){
var dim=this.getDimension();
var _f21=0;
var _f22=0;
if(_f1f.isDialogSubPage){
_f1f=this._pageBinding;
}
if(this._isFirstPage){
_f21=_f1f.width!=null?_f1f.width:dim.w;
}else{
_f21=dim.w;
}
_f22=_f1f.bindingElement.offsetHeight;
_f22+=this._titlebar.bindingElement.offsetHeight;
_f22+=4;
if(_f22<dim.h){
_f22=dim.h;
}
if(_f1f.minheight!=null){
if(_f22<_f1f.minheight){
_f22=_f1f.minheight;
}
}
this.setDimension(new Dimension(_f21,_f22));
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
StageDialogBinding.newInstance=function(_f25){
var _f26=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f25);
var _f27=UserInterface.registerBinding(_f26,StageDialogBinding);
_f27.setProperty("controls","minimize maximize close");
return _f27;
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
this.addFilter(function(_f28,list){
var _f2a=null;
var _f2b=UserInterface.getBinding(_f28);
if(!_f2b.isVisible){
_f2a=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f2a;
});
this.addFilter(function(_f2c,list){
var _f2e=null;
var _f2f=UserInterface.getBinding(_f2c);
if(_f2f.isAttached){
if(Interfaces.isImplemented(IFit,_f2f)){
if(!_f2f.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f2f);
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
StageDecksBinding.prototype.mountDefinition=function(_f30){
var _f31=StageDeckBinding.newInstance(this.bindingDocument);
_f31.handle=_f30.handle;
_f31.perspectiveNode=_f30.node;
this._decks[_f31.handle]=_f31;
this.add(_f31);
_f31.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f32){
var _f33=this._decks[_f32];
StageBinding.perspectiveNode=_f33.perspectiveNode;
this.select(_f33);
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
StageDeckBinding.prototype.handleAction=function(_f34){
StageDeckBinding.superclass.handleAction.call(this,_f34);
var _f35=_f34.target;
switch(_f34.type){
case WindowBinding.ACTION_LOADED:
if(_f35==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f34.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f35 instanceof DockBinding){
this._dockBindings.set(_f35.reference,_f35);
_f35.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f34.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f34.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f34);
StageDeckBinding.superclass.handleAction.call(this,_f34);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f37=new StageCrawler();
_f37.mode=mode;
_f37.crawl(this.windowBinding.getContentDocument().body);
_f37.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f38){
return this._dockBindings.get(_f38);
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
StageDeckBinding.newInstance=function(_f3a){
var _f3b=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f3a);
var _f3c=UserInterface.registerBinding(_f3b,StageDeckBinding);
return _f3c;
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
StageSplitBoxBinding.prototype.handleAction=function(_f3d){
StageSplitBoxBinding.superclass.handleAction.call(this,_f3d);
StageBoxAbstraction.handleAction.call(this,_f3d);
var _f3e=_f3d.target;
var _f3f=null;
var _f40=null;
switch(_f3d.type){
case DockBinding.ACTION_EMPTIED:
_f40=this.getChildBindingByLocalName("splitter");
if(_f40.isVisible){
_f40.hide();
}
_f3f=this.getDescendantBindingsByLocalName("dock");
if(_f3f.getFirst().isEmpty&&_f3f.getLast().isEmpty){
if(_f3f.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f3d.consume();
break;
case DockBinding.ACTION_OPENED:
_f3f=this.getDescendantBindingsByLocalName("dock");
if(!_f3f.getFirst().isEmpty&&!_f3f.getLast().isEmpty){
_f40=this.getChildBindingByLocalName("splitter");
if(!_f40.isVisible){
_f40.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f3d.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f3e!=this){
_f40=this.getChildBindingByLocalName("splitter");
if(_f40.isVisible){
_f40.hide();
}
this.invokeLayout();
_f3d.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f3e!=this){
var _f41=this.getChildBindingsByLocalName("splitpanel");
if(_f41.getFirst().isVisible&&_f41.getLast().isVisible){
_f40=this.getChildBindingByLocalName("splitter");
if(!_f40.isVisible){
_f40.show();
}
}
this.invokeLayout();
_f3d.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f42){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f42);
switch(_f42.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f42.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f43=this.getChildBindingsByLocalName("splitpanel");
return _f43.getFirst().isVisible&&_f43.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f44=this.getChildBindingsByLocalName("splitpanel");
return _f44.getFirst().isFixed&&_f44.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f45){
StageSplitPanelBinding.superclass.handleAction.call(this,_f45);
StageBoxAbstraction.handleAction.call(this,_f45);
switch(_f45.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f45.type==StageSplitBoxBinding.ACTION_HIDE){
_f45.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f45.type==DockBinding.ACTION_EMPTIED){
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
if(_f45.type==StageSplitBoxBinding.ACTION_SHOW){
_f45.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f48=_f45.target;
if(_f48!=this&&_f48.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f49=_f48._containingSplitBoxBinding;
if(_f49.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f4a=_f49.getChildBindingsByLocalName("splitpanel");
var _f4b=_f4a.getFirst();
var _f4c=_f4a.getLast();
if(this.isFixed==true){
if(!_f4b.isFixed||!_f4c.isFixed||(!_f49.hasBothPanelsVisible()&&_f48.isMinimizedForReal)){
this.setFix(false);
_f45.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f49.hasBothPanelsFixed()||(!_f49.hasBothPanelsVisible()&&_f48.isMinimizedForReal)){
this.setFix(_f48.getContainedDock().getHeight());
_f45.consume();
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
var _f4d=this.getContainedDock();
if(_f4d){
if(this.isMaximizePrepared==true){
}else{
_f4d.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f4e=this.getContainedDock();
if(_f4e){
if(_f4e.type==DockBinding.TYPE_EDITORS){
if(_f4e.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f4e.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f4f=this.getContainedDock();
if(_f4f){
_f4f.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f4f);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f50=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f51=this.getContainedDock();
if(_f51){
_f51.collapse(_f50);
if(!_f50){
this.setFix(_f51.getHeight());
}else{
this.setFix(_f51.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f51&&_f51.isActive){
_f51.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f51);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f52){
var _f53=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f54=this.getContainedDock();
if(_f54){
if(this.isMinimized==true){
_f54.unCollapse(_f53);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f52){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f54){
_f54.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f54);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f55){
var _f56=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f56=false;
}
}
if(_f56==true){
this._invisibilize(_f55);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f58){
if(_f58!=this._isInvisibilized){
if(_f58){
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
StageSplitterBinding.prototype.onDragStart=function(_f59){
var _f5a=top.app.bindingMap.stagesplittercover;
var _f5b=this._containingSplitBoxBinding.getOrient();
switch(_f5b){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f5a.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f5a.bindingElement.style.cursor="n-resize";
break;
}
_f5a.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f5b);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f61){
this._orient=_f61;
this.attachClassName(_f61);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f63=true;
var _f64=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f64=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f63=false;
break;
}
if(_f63){
this.bindingElement.style.left=pos.x+"px";
}
if(_f64){
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
StageBoxAbstraction.handleAction=function(_f66){
switch(_f66.type){
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
if(_f66.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f66.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f67=this.bindingElement.style;
_f67.position="absolute";
_f67.width="100%";
_f67.height="100%";
_f67.top="0";
_f67.left="0";
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
var _f68=this.bindingElement.style;
_f68.position="relative";
_f68.width="auto";
_f68.height="auto";
_f68.top="auto";
_f68.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f69,_f6a){
var _f6b=_f69.bindingElement.style;
var _f6c=_f69.bindingElement.parentNode;
var box=_f69._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f6a){
_f69._unmodifiedFlexMethod=_f69.flex;
_f69.flex=function(){
_f6b.width=_f6c.offsetWidth+"px";
_f6b.height=_f6c.offsetHeight+"px";
};
}else{
_f6b.width="100%";
_f6b.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f6b.width="auto";
_f6b.height="auto";
box.reflex(true);
},0);
}
_f69.flex=_f69._unmodifiedFlexMethod;
_f69._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f6e){
var _f6f=_f6e.target;
switch(_f6e.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f6f instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f6e);
_f6e.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f6e.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f70){
var mode=null;
switch(_f70.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f72){
StageMenuBarBinding.superclass.handleAction.call(this,_f72);
switch(_f72.type){
case MenuItemBinding.ACTION_COMMAND:
var _f73=_f72.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f73){
SystemAction.invoke(_f73,this._rootNode);
}
}
_f72.consume();
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
var _f74=this.getProperty("handle");
if(_f74){
this._handle=_f74;
if(StageBinding.isViewOpen(_f74)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f74);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f76){
this.setProperty("handle",_f76);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f77,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f77,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f77){
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
StageViewMenuItemBinding.newInstance=function(_f79){
var _f7a=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f79);
UserInterface.registerBinding(_f7a,StageViewMenuItemBinding);
return UserInterface.getBinding(_f7a);
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
StageStatusBarBinding.prototype.setLabel=function(_f7b){
this._label.setLabel(_f7b);
};
StageStatusBarBinding.prototype.setImage=function(_f7c){
this._label.setImage(_f7c);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f7d){
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
var _f7e=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f7f=_f7e.getAssociatedView();
var _f80=_f7f.getContentWindow().bindingMap.tree;
var _f81=_f80.getFocusedTreeNodeBindings();
if(!_f81.hasEntries()&&StageBinding.treeSelector){
_f81=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f81;
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
ExplorerBinding.prototype.handleAction=function(_f82){
ExplorerBinding.superclass.handleAction.call(this,_f82);
var _f83=_f82.target;
switch(_f82.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f82.consume();
break;
case Binding.ACTION_DRAG:
if(_f83 instanceof ExplorerSplitterBinding){
_f83.dragger.registerHandler(this);
}
_f82.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f85){
this._menuBinding.setSelectionByHandle(_f85);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f86){
if(_f86 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f86);
this._menuBinding.mountDefinition(_f86);
}
};
ExplorerBinding.prototype.onDragStart=function(_f87){
var _f88=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f88.hasEntries()){
var _f89=_f88.getFirst();
this._dragStart=_f89.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f89.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f8d){
if(_f8d instanceof SystemViewDefinition){
var _f8e=ViewBinding.newInstance(this.bindingDocument);
_f8e.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f8e.setDefinition(_f8d);
var _f8f=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f8f.setAssociatedView(_f8e);
this._decks[_f8d.handle]=_f8f;
_f8f.add(_f8e);
this.add(_f8f);
function attach(){
_f8f.attach();
_f8e.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f90){
var _f91=this._decks[_f90];
this.select(_f91);
};
DecksBinding.prototype.expandBy=function(_f92){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f94=this.bindingElement.offsetHeight+_f92;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f94+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f96){
var _f97=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f96);
return UserInterface.registerBinding(_f97,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f98){
this._viewBinding=_f98;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f99=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f9a=this._viewBinding.getDefinition().label;
StatusBar.busy(_f99,[_f9a]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f9b){
ExplorerDeckBinding.superclass.handleAction.call(this,_f9b);
var _f9c=_f9b.target;
switch(_f9b.type){
case PageBinding.ACTION_INITIALIZED:
if(_f9c instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f9c.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f9d,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f9d,arg);
switch(_f9d){
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
var _f9f=null;
if(this._isExplorerDeckBindingInitialized){
_f9f=this._viewBinding.getDefinition().label;
}else{
_f9f=DockTabBinding.LABEL_TABLOADING;
}
return _f9f;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _fa0=null;
if(this._isExplorerDeckBindingInitialized){
_fa0=this._viewBinding.getDefinition().image;
}else{
_fa0=DockTabBinding.IMG_TABLOADING;
}
return _fa0;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _fa1=null;
if(this._isExplorerDeckBindingInitialized){
_fa1=this._viewBinding.getDefinition().toolTip;
}
return _fa1;
};
ExplorerDeckBinding.newInstance=function(_fa2){
var _fa3=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_fa2);
return UserInterface.registerBinding(_fa3,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_fa4){
switch(_fa4.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_fa4.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_fa4.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_fa4);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_fa5){
this._maxButtons.set(_fa5.handle,this._mountMaxButton(_fa5));
this._minButtons.set(_fa5.handle,this._mountMinButton(_fa5));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_fa6){
var _fa7=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_fa7.setLabel(_fa6.label);
_fa7.setToolTip(_fa6.toolTip);
_fa7.handle=_fa6.handle;
_fa7.node=_fa6.node;
this._maxGroup.add(_fa7);
this._maxList.add(_fa7);
_fa7.attach();
return _fa7;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_fa8){
var _fa9=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_fa9.setLabel(_fa8.label);
_fa9.setToolTip(_fa8.label);
_fa9.handle=_fa8.handle;
_fa9.node=_fa8.node;
this._minGroup.addFirst(_fa9);
this._minList.add(_fa9);
_fa9.attach();
_fa9.hide();
return _fa9;
};
ExplorerMenuBinding.prototype.handleAction=function(_faa){
ExplorerMenuBinding.superclass.handleAction.call(this,_faa);
switch(_faa.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _fab=_faa.target;
var _fac=_fab.getCheckedButtonBinding();
var _fad=_fac.handle;
switch(_fab){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fad),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fad),true);
break;
}
this._selectedHandle=_fad;
this._selectedTag=_fac.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_faa.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fae){
var _faf=this._maxButtons.get(_fae);
if(_faf){
_faf.check();
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
var _fb0=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fb0=true;
}
return _fb0;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fb2=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fb2=true;
}
return _fb2;
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
ExplorerToolBarBinding.newInstance=function(_fb3){
var _fb4=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fb3);
return UserInterface.registerBinding(_fb4,ExplorerToolBarBinding);
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
var _fb5=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fb6=_fb5?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fb6);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fb7,_fb8){
var _fb9=(_fb8==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fba=DOMUtil.createElementNS(Constants.NS_UI,_fb9,_fb7);
var _fbb=UserInterface.registerBinding(_fba,ExplorerToolBarButtonBinding);
_fbb.explorerToolBarButtonType=_fb8;
return _fbb;
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
EditorBinding.registerComponent=function(_fbc,_fbd){
var _fbe=EditorBinding._components;
var _fbf=EditorBinding._editors;
var key=_fbd.key;
var _fc1=Interfaces.isImplemented(IWysiwygEditorComponent,_fbc);
if(!_fc1){
_fc1=Interfaces.isImplemented(ISourceEditorComponent,_fbc);
}
if(_fc1){
if(_fbf.has(key)){
_fbf.get(key).initializeEditorComponent(_fbc);
}else{
if(!_fbe.has(key)){
_fbe.set(key,new List());
}
_fbe.get(key).add(_fbc);
}
}else{
throw "Editor component interface not implemented: "+_fbc;
}
};
EditorBinding.claimComponents=function(_fc2,_fc3){
var _fc4=EditorBinding._components;
var _fc5=EditorBinding._editors;
var key=_fc3.key;
_fc5.set(key,_fc2);
var list=null;
if(_fc4.has(key)){
list=_fc4.get(key).copy();
_fc4.del(key);
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
var _fc9=this.getProperty("value");
if(_fc9!=null){
_fc9=decodeURIComponent(_fc9);
this._startContent=_fc9;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fcb=this.bindingWindow.DataManager;
_fcb.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fcd){
var _fce=EditorBinding.claimComponents(this,_fcd);
if(_fce!=null){
while(_fce.hasNext()){
this.initializeEditorComponent(_fce.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fd0=this.bindingWindow.DataManager;
if(_fd0.getDataBinding(name)){
_fd0.unRegisterDataBinding(name);
}
_fd0.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fd1=this.getEditorDocument();
if(_fd1!=null){
Application.framework(_fd1);
DOMEvents.addEventListener(_fd1,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fd1,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fd1,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fd1,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fd3){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fd3==true){
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
var _fd5=this.getCheckSum();
if(_fd5!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fd5;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fd6=null;
if(Binding.exists(this._pageBinding)){
_fd6=this._pageBinding.getCheckSum(this._checksum);
}
return _fd6;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fd8=DOMEvents.getTarget(e);
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
if(_fd8.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fda,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fda,arg);
var _fdc=null;
switch(_fda){
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
var _fdd=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fdd=false;
}
}
}else{
_fdc=DOMEvents.getTarget(arg);
if(_fdc&&_fdc.ownerDocument==this.getEditorDocument()){
_fdd=false;
}
}
if(_fdd){
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
EditorBinding.prototype._activateEditor=function(_fde){
if(_fde!=this._isActivated){
this._isActivated=_fde;
EditorBinding.isActive=_fde;
var _fdf=this.getEditorWindow().standardEventHandler;
var _fe0=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fe0!=null){
if(_fde){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fe0.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fdf.enableNativeKeys(true);
}else{
_fe0.disable();
_fdf.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fe1=this.getEditorDocument().selection.createRange();
_fe1.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fe2=false;
try{
if(!Client.isExplorer){
var _fe3=this.getEditorWindow().getSelection();
if(_fe3!=null){
_fe2=_fe3.toString().length>0;
if(!_fe2){
var _fe4=_fe3.getRangeAt(0);
var frag=_fe4.cloneContents();
var _fe6=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fe6.appendChild(frag.firstChild);
}
var img=_fe6.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fe2=true;
}
}
}
}
}else{
var _fe4=this.getEditorDocument().selection.createRange();
_fe2=(_fe4&&_fe4.text)&&_fe4.text.length>0;
if(_fe4.commonParentElement&&VisualEditorBinding.isImageElement(_fe4.commonParentElement())){
_fe2=true;
}
}
}
catch(exception){
}
return _fe2;
};
EditorBinding.prototype.isCommandEnabled=function(_fe8){
var _fe9=true;
switch(_fe8){
case "Cut":
case "Copy":
case "Paste":
_fe9=this.getEditorDocument().queryCommandEnabled(_fe8);
break;
}
return _fe9;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fed=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fee=null;
if(cmd=="Paste"){
_fee=null;
}else{
_fee=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fee);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fed=true;
}
break;
}
return _fed;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _ff0=this.getContentWindow().bindingMap.toolbar;
var _ff1=_ff0.getButtonForCommand(cmd);
if(!_ff1){
throw "No button for command "+cmd;
}
return _ff1;
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
var _ff4=this.getContentDocument().getElementById("focusableinput");
if(_ff4!=null){
_ff4.style.display="block";
FocusBinding.focusElement(_ff4);
_ff4.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_ff5){
EditorBinding.superclass.handleAction.call(this,_ff5);
var _ff6=_ff5.target;
var self=this;
var _ff8=this.shadowTree.iframe;
switch(_ff5.type){
case Binding.ACTION_DIRTY:
if(_ff5.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_ff9){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_ff9);
};
EditorBinding.prototype.handleElement=function(_ffa){
return true;
};
EditorBinding.prototype.updateElement=function(_ffb){
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
var _ffe=this._menuGroups[rel];
if(_ffe instanceof List){
_ffe.each(function(_fff){
_fff.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _1001=this._menuGroups[rel];
if(_1001 instanceof List){
_1001.each(function(group){
group.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_1003){
EditorPopupBinding.superclass.handleAction.call(this,_1003);
var _1004=_1003.target;
if(_1003.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_1004.getProperty("cmd");
var gui=_1004.getProperty("gui");
var val=_1004.getProperty("val");
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
var _1008=this.bindingWindow.bindingMap.tinywindow;
var _1009=this.bindingWindow.bindingMap.codepresswindow;
if(_1008){
EditorBinding.registerComponent(this,_1008);
}else{
if(_1009){
EditorBinding.registerComponent(this,_1009);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_100a,_100b,_100c,theme){
this._editorBinding=_100a;
this._tinyEngine=_100b;
this._tinyInstance=_100c;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_100e,frame,_1010){
this._editorBinding=_100e;
this._codePressFrame=frame;
this._codePressEngine=_1010;
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
var _1012=this._editorBinding;
if(_1012!=null){
var self=this;
var _1014={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1012.hasBookmark()){
_1012.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1012.hasBookmark()){
_1012.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1014);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1014);
}
};
EditorClickButtonBinding.newInstance=function(_1016){
var _1017=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1016);
return UserInterface.registerBinding(_1017,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1018){
var _1019=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1018);
return UserInterface.registerBinding(_1019,EditorToolBarButtonBinding);
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
var _101a=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_101a);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_101b,_101c,_101d,theme){
this._editorBinding=_101b;
this._tinyEngine=_101c;
this._tinyInstance=_101d;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_101f){
EditorSelectorBinding.superclass.handleAction.call(this,_101f);
switch(_101f.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_101f);
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
EditorMenuItemBinding.newInstance=function(_1022){
var _1023=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1022);
return UserInterface.registerBinding(_1023,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1024){
var i=0,_1026,_1027=[],split=_1024.split(" ");
while((_1026=split[i++])!=null){
if(_1026.length>=3&&_1026.substring(0,3)=="mce"){
continue;
}else{
if(_1026.length>=14&&_1026.substring(0,14)=="compositemedia"){
continue;
}
}
_1027.push(_1026);
}
return _1027.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1029){
var _102a=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1029);
if(soap instanceof SOAPFault){
}else{
_102a=soap.XhtmlFragment;
if(!_102a){
_102a="";
}
}
WebServiceProxy.isFaultHandler=true;
return _102a;
};
VisualEditorBinding.getTinyContent=function(_102c,_102d){
var _102e=null;
if(_102c==null||_102c==""){
_102c=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_102c);
if(soap instanceof SOAPFault){
var _1030=soap;
var _1031={handleDialogResponse:function(){
_102d.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1031,_1030);
}else{
_102e=soap.XhtmlFragment;
if(_102e==null){
_102e=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _102e;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _1034=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1036=new List(doc.documentElement.childNodes);
var _1037=new List();
_1036.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_1037.add(child);
}
});
var _1039=_1037.get(index);
if(_1039==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_1039.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_1039.hasChildNodes()){
frag.appendChild(_1039.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_1034=DOMSerializer.serialize(doc.documentElement);
_1034=_1034.substring(_1034.indexOf(">")+1,_1034.length);
_1034=_1034.substring(0,_1034.lastIndexOf("<"));
}
}
}
if(_1034==null){
_1034=new String("");
}
return _1034;
};
VisualEditorBinding.isImage=function(_103b){
result=_103b&&_103b.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_103c){
return VisualEditorBinding.isImage(_103c)&&!VisualEditorBinding.isReservedElement(_103c);
};
VisualEditorBinding.isReservedElement=function(_103d){
if(VisualEditorBinding.isFunctionElement(_103d)){
return true;
}
if(VisualEditorBinding.isFieldElement(_103d)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_103d)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_103e){
return VisualEditorBinding.isImage(_103e)&&CSSUtil.hasClassName(_103e,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_103f){
return VisualEditorBinding.isImage(_103f)&&CSSUtil.hasClassName(_103f,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1040){
return VisualEditorBinding.isImage(_1040)&&CSSUtil.hasClassName(_1040,VisualEditorBinding.HTML_CLASSNAME);
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
var _1041=this.getProperty("embedablefieldstypenames");
if(_1041!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1041);
}
var _1042=this.getProperty("formattingconfiguration");
if(_1042!=null){
this._url+="?config="+_1042;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1043,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1043,arg);
var _1045=this.getContentWindow().bindingMap.tinywindow;
var _1046=_1045.getContentWindow();
switch(_1043){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1046){
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
this.initializeEditorComponents(_1045);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1047){
_1047.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1048){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1048);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_104b){
var _104c=_104b;
if(!this._isNormalizedDocument(_104b)){
_104c=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_104b);
}
return _104c;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_104d){
var _104e=false;
var doc=XMLParser.parse(_104d,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_104e=true;
}
}
if(Client.isWebKit){
if(_104d.indexOf("<html")!==0){
_104e=false;
}
}
return _104e;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1053=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1053){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1053=true;
}
return _1053;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1055=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1055);
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
VisualEditorBinding.prototype.setResult=function(_1057){
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
VisualEditorPopupBinding.prototype.configure=function(_1058,_1059,_105a){
var _105b=this.editorBinding.hasSelection();
this.tinyInstance=_1058;
this.tinyEngine=_1059;
this.tinyElement=_105a;
this.hasSelection=_105b;
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
var _105f=false;
if(this.hasSelection){
_105f=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_105f=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_105f=true;
}
}
}
}
if(_105f){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1060=this.getMenuItemForCommand("compositeInsertLink");
var _1061=this.getMenuItemForCommand("unlink");
var _1062=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1063=this.editorBinding.getButtonForCommand("unlink");
_1061.setDisabled(_1063.isDisabled);
if(_1061.isDisabled){
_1060.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1060.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1064=this.editorBinding.embedableFieldConfiguration;
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
if(_1064){
var _1067=_1064.getGroupNames();
if(_1067.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1067.each(function(_106b){
var _106c=_1064.getFieldNames(_106b);
_106c.each(function(_106d){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_106d);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_106b+":"+_106d);
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
var _106f=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1070=null;
var _1071=null;
if(_106f){
if(_106f.nodeName=="TD"){
_1070=_106f.getAttribute("colspan");
_1071=_106f.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1070=="1"&&_1071=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_106f){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1072){
var _1073=VisualEditorFormattingConfiguration._configurations;
if(!_1073.has(_1072)){
_1073.set(_1072,new VisualEditorFormattingConfiguration());
}
return _1073.get(_1072);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1075){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1076){
var _1077=null;
var _1078=VisualEditorFieldGroupConfiguration._configurations;
if(!_1078.has(_1076)){
_1078.set(_1076,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1076)));
}
return _1078.get(_1076);
};
function VisualEditorFieldGroupConfiguration(_1079){
var _107a=new Map();
new List(_1079).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_107a.set(group.GroupName,map);
});
this._groups=_107a;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_107e){
return this._groups.get(_107e).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_107f,_1080){
return this._groups.get(_107f).get(_1080).xhtml;
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
var _1082=this.getDescendantElementsByLocalName("textarea");
while(_1082.hasNext()){
var _1083=_1082.getNext();
if(_1083.getAttribute("selected")=="true"){
this._startContent=_1083.value;
this._textareaname=_1083.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1085=this.getContentWindow().bindingMap.templatetree;
_1085.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1086){
var _1087=_1085.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1087.textareaname);
_1086.consume();
}});
_1085.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1088){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1089=this.getContentWindow().bindingMap.toolsplitter;
_1089.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _108a=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_108a.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_108a);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_108b){
this._textareas=new Map();
while(_108b.hasNext()){
var _108c=_108b.getNext();
var _108d=_108c.getAttribute("placeholderid");
this._textareas.set(_108d,{placeholderid:_108d,placeholdername:_108c.getAttribute("placeholdername"),placeholdermarkup:_108c.value,textareaelement:_108c,isSelected:_108c.getAttribute("selected")=="true"});
}
var _108e=new Map();
this._textareas.each(function(name,_1090){
var _1091=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1091.setLabel(_1090.placeholdername);
_1091.setImage("${icon:placeholder}");
_1091.setProperty("placeholder",true);
_1091.textareaname=name;
_108e.set(_1090.placeholdername,_1091);
if(_1090.isSelected){
selected=_1091;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1092=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1092.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1093=this.getContentWindow().bindingMap.templatetree;
var _1094=_1093.add(TreeNodeBinding.newInstance(_1093.bindingDocument));
_1094.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1094.setImage("${icon:warning}");
_1094.attach();
var _1095=this.getContentWindow().bindingMap.statusbar;
_1095.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1097=this._textareas.get(name);
var _1098=_1097.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1098));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1099){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1099;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _109a=this.getContentWindow().bindingMap.statusbar;
_109a.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1099);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _109d="";
if(this._heads.has(this._textareaname)){
_109d=this._heads.get(this._textareaname);
if(_109d==null){
_109d=new String("");
}
}
return _109d;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_109f){
_109f.textareaelement.value=_109f.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_10a0,_10a1){
var _10a2=_10a0.getElementsByTagName("div").item(0);
var _10a3=_10a1.getElementsByTagName("div").item(0);
var _10a4=new List(_10a2.getElementsByTagName("textarea"));
var _10a5=new List(_10a3.getElementsByTagName("textarea"));
var _10a6=false;
if(_10a4.getLength()!=_10a5.getLength()){
_10a6=true;
}else{
var index=0;
_10a4.each(function(_10a8,index){
var _10aa=_10a5.get(index);
var newid=_10a8.getAttribute("placeholderid");
var oldid=_10aa.getAttribute("placeholderid");
var _10ad=_10a8.getAttribute("placeholdername");
var _10ae=_10aa.getAttribute("placeholdername");
if(newid!=oldid||_10ad!=_10ae){
_10a6=true;
}
return !_10a6;
});
}
if(_10a6){
var html=null;
if(_10a2.innerHTML!=null){
html=_10a2.innerHTML;
}else{
html=DOMSerializer.serialize(_10a2);
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
var _10b2=this.getDescendantBindingByLocalName("selector");
_10b2.attach();
this._populateTemplateSelector();
var _10b3=this.getContentWindow().bindingMap.templateselector;
_10b3.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10b4=this.getDescendantBindingByLocalName("selector");
var _10b5=this.getContentWindow().bindingMap.templateselector;
_10b4.selections.each(function(_10b6){
_10b6.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10b5.populateFromList(_10b4.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10b7=this.getDescendantBindingByLocalName("selector");
var _10b8=this.getContentWindow().bindingMap.templateselector;
_10b7.selectByValue(_10b8.getValue());
_10b7.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10b9){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10be,_10bf){
var _10c0=_10bf;
if(old.has(_10be)){
_10c0=old.get(_10be).placeholdermarkup;
}
return _10c0;
}
while(_10b9.hasNext()){
var _10c1=_10b9.getNext();
var _10c2=_10c1.getAttribute("placeholderid");
this._textareas.set(_10c2,{placeholderid:_10c2,placeholdername:_10c1.getAttribute("placeholdername"),placeholdermarkup:compute(_10c2,_10c1.value),textareaelement:_10c1,isSelected:_10c1.getAttribute("selected")=="true"});
}
var _10c3=null;
var _10c4=this.getContentWindow().bindingMap.templatetree;
var _10c5=new Map();
this._textareas.each(function(name,_10c7){
var _10c8=_10c4.add(TreeNodeBinding.newInstance(_10c4.bindingDocument));
_10c8.setLabel(_10c7.placeholdername);
_10c8.setImage("${icon:placeholder}");
_10c8.setProperty("placeholder",true);
_10c8.textareaname=name;
_10c5.set(_10c7.placeholdername,_10c8);
if(_10c7.isSelected){
_10c3=_10c8;
}
});
_10c4.attachRecursive();
if(_10c3!=null){
var _10c9=true;
if(this._oldtextareas.hasEntries()){
_10c9=false;
var map=new Map();
this._textareas.each(function(id,_10cc){
map.set(_10cc.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10c9=true;
}
}
if(_10c9){
var _10cd=this._textareas.get(_10c3.textareaname);
this._textareaname=_10c3.textareaname;
this._placeholdername=_10cd.placeholdername;
this._setContentFromPlaceHolder(_10c3.textareaname);
_10c3.focus();
}else{
var _10ce=_10c5.get(this._placeholdername);
this._textareaname=_10ce.textareaname;
_10ce.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10cf,_10d0){
var _10d1=_10cf.getElementsByTagName("ui:selector").item(0);
var _10d2=_10d0.getElementsByTagName("ui:selector").item(0);
var _10d3=false;
if(_10d1!=null&&_10d2!=null){
var _10d4=new List(_10d1.getElementsByTagName("ui:selection"));
var _10d5=new List(_10d2.getElementsByTagName("ui:selection"));
if(_10d4.getLength()!=_10d5.getLength()){
_10d3=true;
}else{
_10d4.each(function(_10d6,index){
var _10d8=_10d6.getAttribute("value");
var _10d9=_10d5.get(index).getAttribute("value");
if(_10d8!=_10d9){
_10d3=true;
}
return !_10d3;
});
}
}
if(_10d3){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10d1);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10cf,_10d0);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10db,frame,_10dd){
this._editorBinding=_10db;
this._codePressFrame=frame;
this._codePressEngine=_10dd;
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
var _10e3=this.getProperty("validate");
if(_10e3==true){
this._hasStrictValidation=true;
}
var _10e4=this.getProperty("validator");
if(_10e4!=null){
this._validator=_10e4;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10e5,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10e5,arg);
switch(_10e5){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10e7=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10e7!=null){
var _10e8=_10e7.getContentWindow();
if(arg.broadcastWindow==_10e8){
this._codemirrorWindow=_10e8;
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
this.initializeEditorComponents(_10e7);
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
this.unsubscribe(_10e5);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10ec){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10ec);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10ed){
if(_10ed!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10ed;
EditorBinding.isActive=_10ed;
var _10ee=this.getContentWindow().standardEventHandler;
if(_10ed){
_10ee.enableNativeKeys(true);
}else{
_10ee.disableNativeKeys();
}
var _10ef=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10ef!=null){
if(_10ed){
_10ef.enable();
}else{
_10ef.disable();
}
}
if(_10ed){
this.focus();
var _10f0=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10f4=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10f4;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10f5){
_10f5.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10f7){
if(!this._isFinalized){
if(_10f7!=this._startContent){
this._startContent=_10f7;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10f7);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10f8=this.getContentWindow().bindingMap.editorpage.getContent();
if(_10f8!=null){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10f8=_10f8.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
break;
}
}
return _10f8?_10f8:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10f9){
if(this._pageBinding!=null){
this._pageBinding.cover(_10f9);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10fa){
if(_10fa!=null&&this.shadowTree.dotnetinput!=null){
var value=_10fa.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10fc=true;
var _10fd=this.getContent();
if(this._validator!=null){
_10fc=Validator.validateInformed(_10fd,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10fc=XMLParser.isWellFormedDocument(_10fd,true);
if(_10fc==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10fc=this._isValidHTML(_10fd);
break;
}
}
break;
}
}
return _10fc;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10ff=true;
var doc=XMLParser.parse(xml);
var _1101=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1101.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1101.add("NamespaceURI");
}
var head=null,body=null;
var _1105=new List(root.childNodes);
while(_1105.hasNext()){
var child=_1105.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1101.add("MultipleHead");
}
if(body!=null){
_1101.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1101.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_1101.add("MissingHead");
}
if(body==null){
_1101.add("MissingBody");
}
}
if(_1101.hasEntries()){
_10ff=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1101.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1101.getFirst()));
}
}
return _10ff;
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
var _1107=null;
var page=this._pageBinding;
if(page!=null){
_1107=page.getCheckSum();
}
return _1107;
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
ThrobberBinding.prototype.handleBroadcast=function(_1109,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1109,arg);
switch(_1109){
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
ProgressBarBinding.notch=function(_110c){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_110c);
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
ProgressBarBinding.prototype.notch=function(_110e){
_110e=_110e?_110e:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_110e);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1110,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1110,arg);
switch(_1110){
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
StartMenuItemBinding.prototype.setChecked=function(_1112,_1113){
StartMenuItemBinding.superclass.setChecked.call(this,_1112,_1113);
if(!_1113){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1114){
var _1115=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1114);
UserInterface.registerBinding(_1115,StartMenuItemBinding);
return UserInterface.getBinding(_1115);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1118,_1119){
var _111a=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1119,true)==true){
if(_1118!="*"){
_1118=KeySetBinding._sanitizeKeyModifiers(_1118);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_111a[doc]){
_111a[doc]={};
}
if(!_111a[doc][code]){
_111a[doc][code]={};
}
_111a[doc][code][_1118]=_1119;
}
};
KeySetBinding.handleKey=function(doc,e){
var _111e=false;
var code=e.keyCode;
var _1120=KeySetBinding.keyEventHandlers;
if(_1120[doc]&&_1120[doc][code]){
var _1121="[default]";
_1121+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1121+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _1122=_1120[doc][code][_1121];
if(_1122==null){
_1122=_1120[doc][code]["*"];
}
if(_1122!=null){
_1122.handleKeyEvent(e);
_111e=true;
}
}
return _111e;
};
KeySetBinding._sanitizeKeyModifiers=function(_1123){
var _1124="[default]";
var mods={};
if(_1123){
new List(_1123.split(" ")).each(function(_1126){
mods[_1126]=true;
});
function check(_1127){
if(mods[_1127]){
_1124+=" "+_1127;
}
}
check("shift");
check("control");
}
return _1124;
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
var _112b=key.getAttribute("oncommand");
var _112c=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_112c){
DOMEvents.preventDefault(e);
}
var _112e=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_112b,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_112f){
if(_112f instanceof CursorBinding){
_112f.setOpacity(0);
_112f.show();
new Animation({modifier:9,onstep:function(_1130){
_112f.setOpacity(Math.sin(_1130*Math.PI/180));
},onstop:function(){
_112f.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1131){
if(_1131 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1132){
_1131.setOpacity(Math.cos(_1132*Math.PI/180));
},onstop:function(){
_1131.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1133,_1134,_1135){
if(_1133 instanceof CursorBinding){
_1135.x-=16;
_1135.y-=16;
new Animation({modifier:3,onstep:function(_1136){
var tal=Math.sin(_1136*Math.PI/180);
_1133.setPosition(new Point(((1-tal)*_1134.x)+((0+tal)*_1135.x),((1-tal)*_1134.y)+((0+tal)*_1135.y)));
},onstop:function(){
CursorBinding.fadeOut(_1133);
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
CursorBinding.prototype.setOpacity=function(_113c){
this.bindingElement.style.opacity=new String(_113c);
this._opacity=_113c;
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
function setOpacity(_113f){
cover.bindingElement.style.opacity=new String(_113f);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1140){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1140*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1142){
cover.bindingElement.style.MozOpacity=new String(_1142);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1143){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1143*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1145){
if(_1145!=this._isBusy){
if(_1145){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1145;
}
};
CoverBinding.prototype.setTransparent=function(_1146){
if(_1146!=this._isTransparent){
if(_1146){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1146;
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
CoverBinding.prototype.setHeight=function(_1148){
if(_1148>=0){
this.bindingElement.style.height=new String(_1148+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1149){
var _114a=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1149);
return UserInterface.registerBinding(_114a,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _114c=UncoverBinding._bindingInstance;
if(Binding.exists(_114c)){
_114c.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1150){
this._isFading=_1150==true;
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
var _1151=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1151.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1151.clearRect(0,0,300,150);
_1151.fillRect(0,0,300,150);
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
var _1153=this._canvas.getContext("2d");
_1153.clearRect(0,0,300,150);
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
var _1154=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1154);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1155=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1155){
this._startcontent=_1155.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1156){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1156);
switch(_1156.type){
case WindowBinding.ACTION_ONLOAD:
if(_1156.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1156.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1156);
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
var _115a=this._transformer.transformToString(doc);
this._inject(_115a);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_115d){
this.getContentDocument().body.innerHTML=_115d;
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
var _1165=list.getNext();
var id=_1165.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1165);
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
var _116f=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_116f.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_116f.appendChild(att);
}
elm.appendChild(_116f);
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
var _1179=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1179){
doc=XMLParser.parse(_1179);
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
var _117d=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_117d;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_117e,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_117e,arg);
switch(_117e){
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
var _1181=new List();
list.each(function(lang){
_1181.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1181);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1185){
switch(_1185){
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
var _1188=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1188,root);
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
var _1189=this.getProperty("status");
if(_1189!=null){
switch(_1189){
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
UserInterfaceMapping.prototype.merge=function(_118d){
for(var _118e in _118d.map){
this.map[_118e]=_118d.getBindingImplementation(_118e);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_118f){
var _1190=null;
var name=_118f.nodeName.toLowerCase();
if(this.map[name]){
_1190=this.map[name];
}
return _1190;
};
var UserInterface=new function(){
var _1192=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1193=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1192,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1194=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1196,impl){
var _1198=null;
if(!this.hasBinding(_1196)){
var _1199=DOMUtil.getParentWindow(_1196);
if(DOMUtil.getLocalName(_1196)!="bindingmapping"){
if(!impl&&_1196.getAttribute("binding")!=null){
var _119a=_1196.getAttribute("binding");
impl=_1199[_119a];
if(impl==null){
throw "No such binding in scope: "+_119a;
}
}
if(!impl){
var _119b=_1199.DocumentManager;
if(_119b){
var _119c=_119b.customUserInterfaceMapping;
if(_119c){
impl=_119c.getBindingImplementation(_1196);
}
}
}
if(!impl){
impl=_1193.getBindingImplementation(_1196);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1198=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1198){
var key=KeyMaster.getUniqueKey();
_1196.setAttribute("key",key);
_1198.key=key;
if(!_1196.id){
_1196.id=key;
}
keys[key]={element:_1196,binding:_1198};
_1198.onBindingRegister();
}
}
}
return _1198;
};
this.unRegisterBinding=function(_119e){
terminate(_119e);
};
function terminate(_119f){
if(Binding.exists(_119f)==true){
var key=_119f.key;
Binding.destroy(_119f);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_119f=null;
}else{
_1194.error("URGH: "+key);
}
}
}
}
this.getElement=function(_11a1){
var _11a2=null;
if(keys[_11a1.key]){
_11a2=keys[_11a1.key].element;
}
return _11a2;
};
this.getBinding=function(_11a3){
var _11a4=null;
if(_11a3&&_11a3.nodeType==Node.ELEMENT_NODE){
try{
var key=_11a3.getAttribute("key");
if(key&&keys[key]){
_11a4=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_11a3);
if(exception.stack){
alert(exception.stack);
}
}
}
return _11a4;
};
this.getBindingByKey=function(key){
var _11a7=null;
if(keys[key]){
_11a7=keys[key].binding;
}
return _11a7;
};
this.hasBinding=function(_11a8){
return this.getBinding(_11a8)!=null;
};
this.isBindingVisible=function(_11a9){
var _11aa=Application.isOperational;
if(_11aa==true){
var _11ab=new Crawler();
_11ab.type=NodeCrawler.TYPE_ASCENDING;
_11ab.id="visibilitycrawler";
_11ab.addFilter(function(_11ac){
var b=UserInterface.getBinding(_11ac);
var res=0;
if(!b.isVisible){
_11aa=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11ab.crawl(_11a9.bindingElement);
_11ab.dispose();
}
return _11aa;
};
var _11af=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11af={};
for(var key in keys){
_11af[key]=true;
}
};
this.getPoint=function(){
var _11b3=null;
if(_11af){
_11b3=new List();
for(var key in keys){
if(!_11af[key]){
_11b3.add(key);
}
}
}
return _11b3;
};
this.clearPoint=function(){
_11af=null;
};
this.trackUndisposedBindings=function(){
var _11b5=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11b5){
_11b5="Bindings illdisposed: ";
}
_11b5+=entry.binding+" ";
}
}
if(_11b5!=null){
_1194.error(_11b5);
}
};
this.autoTrackDisposedBindings=function(_11b8){
if(_11b8){
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
SOAPRequest.newInstance=function(_11b9,_11ba){
var _11bb=_11b9+"/"+_11ba;
var _11bc=new SOAPRequest(_11bb);
var _11bd=SOAPRequest.resolver;
_11bc.document=Templates.getTemplateDocument("soapenvelope.xml");
_11bc.envelope=_11bd.resolve("soap:Envelope",_11bc.document);
_11bc.header=_11bd.resolve("soap:Header",_11bc.envelope);
_11bc.body=_11bd.resolve("soap:Body",_11bc.envelope);
return _11bc;
};
SOAPRequest._parseResponse=function(_11be){
var _11bf=null;
var _11c0=false;
var doc=_11be.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11bf=SOAPRequestResponse.newInstance(_11be.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11be.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11c0=true;
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
var text=_11be.responseText;
if(_11be.status==503||text.indexOf("id=\"offline\"")>-1){
_11c0=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11be.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11be.responseText);
}
}
}
}
if(_11c0==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11bf;
};
function SOAPRequest(_11c5){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11c5;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11c7=DOMUtil.getXMLHTTPRequest();
var _11c8=null;
_11c7.open("post",url,false);
_11c7.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11c7.setRequestHeader("SOAPAction",this.action);
try{
_11c7.send(this.document);
_11c8=SOAPRequest._parseResponse(_11c7);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11c7=null;
return _11c8;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11cb){
var _11cc=DOMUtil.getXMLHTTPRequest();
_11cc.open("post",url,true);
_11cc.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11cc.setRequestHeader("SOAPAction",this.action);
_11cc.onreadystatechange=function(){
if(_11cc.readyState==4){
var _11cd=SOAPRequest._parseResponse(_11cc);
_11cb(_11cd);
_11cc=null;
}
};
_11cc.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11ce in this){
this[_11ce]=null;
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
var _11d0=null;
if(doc&&doc.documentElement){
_11d0=new SOAPRequestResponse();
var _11d1=SOAPRequestResponse.resolver;
_11d0.document=doc;
_11d0.envelope=_11d1.resolve("soap:Envelope",_11d0.document);
_11d0.header=_11d1.resolve("soap:Header",_11d0.envelope);
_11d0.body=_11d1.resolve("soap:Body",_11d0.envelope);
var fault=_11d1.resolve("soap:Fault",_11d0.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11d0.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11d1.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11d1.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11d0;
};
function SOAPFault(_11d3,_11d4,_11d5){
this._operationName=_11d3;
this._operationAddress=_11d4;
this._faultString=_11d5;
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
SOAPFault.newInstance=function(_11d6,fault){
return new SOAPFault(_11d6.name,_11d6.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11d9){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11d9;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11db=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11db.body,this._operation);
var _11dd=this._wsdl.getSchema();
var _11de=_11dd.lookup(this._operation);
var _11df=_11de.getListedDefinitions();
while(_11df.hasNext()){
var def=_11df.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11db;
};
SOAPEncoder.prototype._resolve=function(_11e3,_11e4,value){
var _11e6=this._wsdl.getSchema();
if(_11e4.isSimpleValue){
this._appendText(_11e3,value,_11e4.type=="string");
}else{
var _11e7=_11e6.lookup(_11e4.type);
if(_11e7 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11e7.getListedDefinitions();
if(_11e7.isArray){
var _11e9=new List(value);
var def=defs.getNext();
while(_11e9.hasNext()){
var elm=this._appendElement(_11e3,def.name);
var val=_11e9.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11e3,def.name);
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
SOAPEncoder.prototype._appendText=function(_11f0,value,_11f2){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11f5=false;
var i=0,c;
while(c=chars[i++]){
var _11f8=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11f8=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11f8=false;
}
break;
}
if(!_11f8){
safe+=c;
}else{
_11f5=true;
}
}
if(_11f5){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11f0.appendChild(_11f0.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11fb){
this._wsdl=wsdl;
this._operation=_11fb;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1200){
var _1201=null;
var _1202=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1204=this.resolve(id,_1200.body);
var _1205=_1202.lookup(id);
var _1206=_1205.getListedDefinitions();
while(!_1201&&_1206.hasNext()){
var def=_1206.getNext();
var elm=this.resolve(def.name,_1204);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1201=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _1201.importNode!=Types.UNDEFINED){
_1201.appendChild(_1201.importNode(e,true));
}else{
_1201.loadXML(DOMSerializer.serialize(e));
}
}else{
_1201=this._compute(elm,def);
}
}
return _1201;
};
SOAPDecoder.prototype._compute=function(_120a,_120b){
var _120c=null;
var _120d=this._wsdl.getSchema();
if(_120b.isSimpleValue){
_120c=this._getSimpleValue(_120a,_120b.type);
}else{
var _120e=_120d.lookup(_120b.type);
if(_120e instanceof SchemaSimpleType){
_120c=this._getSimpleValue(_120a,_120e.restrictionType);
}else{
var defs=_120e.getListedDefinitions();
if(_120e.isArray){
_120c=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_120a);
while(elms.hasNext()){
var elm=elms.getNext();
_120c.push(this._compute(elm,def));
}
}else{
_120c={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_120a);
if(elm){
_120c[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _120c;
};
SOAPDecoder.prototype._getSimpleValue=function(_1213,type){
var _1215=null;
if(_1213.firstChild&&_1213.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1213.childNodes.length>1){
_1213.normalize();
}
_1215=_1213.firstChild.data;
switch(type){
case Schema.types.STRING:
_1215=_1215;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1215=Number(_1215);
break;
case Schema.types.BOOLEAN:
_1215=_1215=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1215;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1216){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1216);
}
Schema.prototype._parseSchema=function(_1217){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1218={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1217);
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
_1218[rule.getAttribute("name")]=entry;
}
return _1218;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_121d){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_121d);
}
SchemaDefinition.prototype._parse=function(_121e){
var min=_121e.getAttribute("minOccurs");
var max=_121e.getAttribute("maxOccurs");
var type=_121e.getAttribute("type");
this.name=_121e.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1224=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1224;
}else{
var elm=_121e.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1226,_1227){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1226,_1227);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1228,_1229){
var els=_1228.resolveAll("s:complexType/s:sequence/s:element",_1229);
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
function SchemaComplexType(_122b,_122c){
this._definitions=new List();
this._parseListedDefinitions(_122b,_122c);
this.isArray=_122c.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_122d,_122e){
var els=_122d.resolveAll("s:sequence/s:element",_122e);
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
function SchemaSimpleType(_1231,_1232){
this.restrictionType=null;
this._parse(_1231,_1232);
}
SchemaSimpleType.prototype._parse=function(_1233,_1234){
var _1235=_1233.resolve("s:restriction",_1234);
if(_1235){
this.restrictionType=_1235.getAttribute("base").split(":")[1];
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
var _1238=null;
var _1239=DOMUtil.getXMLHTTPRequest();
_1239.open("get",url,false);
_1239.send(null);
if(_1239.responseXML){
_1238=_1239.responseXML.documentElement;
}else{
alert(_1239.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1238;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _123a=new List();
var _123b=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_123b.hasEntries()){
while(_123b.hasNext()){
var _123c=_123b.getNext();
var name=_123c.getAttribute("name");
_123a.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _123a;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_123f,_1240,_1241){
this.name=name;
this.address=_123f;
this.encoder=_1240;
this.decoder=_1241;
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
var _1245=wsdl.getOperations();
_1245.each(function(_1246){
proxy[_1246.name]=WebServiceProxy.createProxyOperation(_1246);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1247,_1248){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1248){
var log=_1248 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1247.address+": "+_1247.name+"\n\n";
log+=DOMSerializer.serialize(_1248.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_124a){
return function(){
var _124b=new List(arguments);
var _124c=null;
if(typeof (_124b.getLast())=="function"){
var _124d=_124b.extractLast();
var _124e=_124a.encoder.encode(_124b);
this._log(_124a,_124e);
var self=this;
var _1250=_124e.asyncInvoke(_124a.address,function(_1251){
self._log(_124a,_1251);
if(_1251){
if(_1251.fault){
_124c=SOAPFault.newInstance(_124a,_1251.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_124c,_124e,_1251);
}
}else{
if(WebServiceProxy.isDOMResult){
_124c=_1251.document;
}else{
_124c=_124a.decoder.decode(_1251);
}
}
}
_124e.dispose();
_124d(_124c);
});
}else{
var _124e=_124a.encoder.encode(new List(arguments));
this._log(_124a,_124e);
var _1250=_124e.invoke(_124a.address);
this._log(_124a,_1250);
if(_1250){
if(_1250.fault){
_124c=SOAPFault.newInstance(_124a,_1250.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_124c,_124e,_1250);
}
}else{
if(WebServiceProxy.isDOMResult){
_124c=_1250.document;
}else{
_124c=_124a.decoder.decode(_1250);
}
}
}
_124e.dispose();
return _124c;
}
};
};
WebServiceProxy.handleFault=function(_1252,_1253,_1254){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1252,soapRequest:_1253,soapResponse:_1254});
}
catch(exception){
alert(_1252.getFaultString());
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
var _1255=SystemLogger.getLogger("MessageQueue");
var _1256=null;
var _1257=0;
var _1258=null;
var _1259=new Map();
var _125a=new Map();
var _125b=false;
var _125c=false;
var _125d=false;
var _125e=false;
var _125f={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1256=ConsoleMessageQueueService;
_1257=_1256.GetCurrentSequenceNumber("dummyparam!");
this.index=_1257;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_125b){
if(!MessageQueue._actions.hasEntries()){
var _1260=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_125c=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1260;
_125c=false;
}
}
}
};
this._pokeserver=function(){
if(_125b==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_125c);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_125d){
_125e=true;
}else{
_125d=true;
var self=this;
_1256.GetMessages(Application.CONSOLE_ID,this.index,function(_1262){
if(_1262!=null){
if(Types.isDefined(_1262.CurrentSequenceNumber)){
var _1263=_1262.CurrentSequenceNumber;
if(_1263<self.index){
_1255.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_1263);
}
self.index=_1263;
var _1264=new List(_1262.ConsoleActions);
if(_1264.hasEntries()){
self.evaluate(_1264);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1255.error("No sequencenumber in MessageQueue response!");
}
}
_125d=false;
if(_125e){
_125e=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_1265){
var _1266=new List();
if(_1265.hasEntries()){
_1265.each(function(_1267){
if(this._index[_1267.Id]!=true){
_1266.add(_1267);
}
this._index[_1267.Id]=true;
},this);
if(_1266.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1266);
}else{
this._actions=_1266;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1268){
var _1269="(No reason)";
if(_1268!=null){
_1269=_1268.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1269);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_126d){
if(_126d==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _126e=null;
if(this._actions.hasEntries()){
var _126f=this._actions.extractFirst();
_1257=_126f.SequenceNumber;
_1255.debug("MessageQueue action: "+_126f.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1257+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_126f.ActionType){
case "OpenView":
_126e=_126f.OpenViewParams;
if(_126e.ViewType=="ModalDialog"){
openDialogView(_126e);
}else{
_1258=_126e.ViewId;
openView(_126e);
}
break;
case "CloseView":
_126e=_126f.CloseViewParams;
_1258=_126e.ViewId;
closeView(_126e);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_126f.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_1259.countEntries()+"\n";
_1259.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1255.debug(debug);
if(!_1259.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_126f.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_126f.MessageBoxParams);
break;
case "OpenViewDefinition":
_126e=_126f.OpenViewDefinitionParams;
_1258=_126e.Handle;
openViewDefinition(_126e);
break;
case "LogEntry":
logEntry(_126f.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_126e=_126f.BroadcastMessageParams;
_1255.debug("Server says: EventBroadcaster.broadcast ( \""+_126e.Name+"\", "+_126e.Value+" )");
EventBroadcaster.broadcast(_126e.Name,_126e.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1259.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_126f.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_126f.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_126f.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_126e=_126f.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_126e.ViewId,entityToken:_126e.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_126e=_126f.OpenGenericViewParams;
openGenericView(_126e);
break;
case "OpenExternalView":
_126e=_126f.OpenExternalViewParams;
openExternalView(_126e);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_126f.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_125c);
}
function logEntry(_1272){
var _1273=_1272.Level.toLowerCase();
SystemLogger.getLogger(_1272.SenderId)[_1273](_1272.Message);
}
function openView(_1274){
var list=paramsToList(_1274.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_1274.ViewId);
def.entityToken=_1274.EntityToken;
def.flowHandle=_1274.FlowHandle;
def.position=_125f[_1274.ViewType],def.label=_1274.Label;
def.image=_1274.Image;
def.toolTip=_1274.ToolTip;
def.argument={"url":_1274.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_1274.ViewId,entityToken:_1274.EntityToken,flowHandle:_1274.FlowHandle,position:_125f[_1274.ViewType],url:_1274.Url,label:_1274.Label,image:_1274.Image,toolTip:_1274.ToolTip}));
}
}
function openDialogView(_1277){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1277.ViewId,flowHandle:_1277.FlowHandle,position:Dialog.MODAL,url:_1277.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1278){
var _1279=_1278.DialogType.toLowerCase();
if(_1279=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_1278.Title+"\n"+_1278.Message);
}else{
Dialog[_1279](_1278.Title,_1278.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_127a){
var map={};
var _127c=false;
new List(_127a.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_127c=true;
});
var proto=ViewDefinitions[_127a.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_127a.ViewId;
}
def.argument=_127c?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1281){
var def=ViewDefinition.clone("Composite.Management.GenericView",_1281.ViewId);
def.label=_1281.Label;
def.toolTip=_1281.ToolTip;
def.image=_1281.Image;
def.argument={"url":_1281.Url,"list":paramsToList(_1281.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_1283){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_1283.ViewId);
def.label=_1283.Label;
def.toolTip=_1283.ToolTip;
def.image=_1283.Image;
def.url=_1283.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_1285){
if(StageBinding.isViewOpen(_1285.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1285.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1286){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1286.ViewId,isSuccess:_1286.Succeeded});
}
this._lockSystem=function(_1287){
var _1288=top.bindingMap.offlinetheatre;
if(_1287){
_1288.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1288.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_125b=_1287;
};
this.handleBroadcast=function(_128a,arg){
switch(_128a){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1258!=null&&arg==_1258){
_1258=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_1259.set(arg,true);
}else{
_1255.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1259.hasEntries()){
_1259.del(arg);
_1255.debug("Refreshed tree: "+arg+"\n("+_1259.countEntries()+" trees left!)");
if(!_1259.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_125a.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_125a.hasEntries()==true){
_125a.del(arg);
if(!_125a.hasEntries()){
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
function paramsToList(_128c){
var list=new List();
new List(_128c).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _128f=false;
var _1290=false;
var _1291=null;
var _1292=false;
var _1293=Client.qualifies();
var _1294="admin";
var _1295="123456";
if(!_1293){
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
this.handleBroadcast=function(_1296){
switch(_1296){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1296);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1297=window.bindingMap.appwindow;
_1297.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1298){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1299){
if(_1298){
EventBroadcaster.subscribe(_1299,KickStart);
}else{
EventBroadcaster.unsubscribe(_1299,KickStart);
}
});
}
function kickStart(_129a){
switch(_129a){
case BroadcastMessages.AUDIO_INITIALIZED:
_1290=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_128f=true;
break;
}
if(_128f&&_1290){
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
DataManager.getDataBinding("username").setValue(_1294);
DataManager.getDataBinding("password").setValue(_1295);
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
this.doLogin=function(_129d,_129e){
var _129f=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _12a0=false;
var _12a1=LoginService.ValidateAndLogin(_129d,_129e);
if(_12a1 instanceof SOAPFault){
alert(_12a1.getFaultString());
}else{
_12a0=_12a1;
}
if(_12a0){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_129f){
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
var _12a2=DataManager.getDataBinding("username");
var _12a3=DataManager.getDataBinding("password");
_12a2.blur();
_12a3.blur();
_12a2.setValue("");
_12a3.setValue("");
_12a2.clean();
_12a3.clean();
_12a2.focus();
document.getElementById("loginerror").style.display="block";
var _12a4={handleAction:function(_12a5){
document.getElementById("loginerror").style.display="none";
_12a5.target.removeActionListener(Binding.ACTION_DIRTY,_12a4);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_12a4);
}
WindowManager.fireOnLoad(this);
if(!_1293){
UpdateManager.isEnabled=false;
}
};

