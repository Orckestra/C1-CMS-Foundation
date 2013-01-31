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
_78=_78.replace(/(<(\w+)[^>]*)\/>/g,"$1></$2>");
}
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
BindingSerializer.prototype.serializeBinding=function(_3e3){
BindingSerializer.activeInstance=this;
_3e3.bindingWindow.ElementIterator.iterate(_3e3.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e4){
var _3e5=false;
var _3e6=_3e4.serialize();
if(_3e6!=false){
_3e5=true;
var _3e7="ui:"+DOMUtil.getLocalName(_3e4.bindingElement);
var _3e8=DOMUtil.createElementNS(Constants.NS_UI,_3e7,this._dom);
this._pointers[_3e4.key]=_3e8;
for(var prop in _3e6){
if(_3e6[prop]!=null){
_3e8.setAttribute(prop,String(_3e6[prop]));
}
}
}
return _3e5;
};
BindingSerializer.prototype.append=function(_3ea,_3eb){
var _3ec=this._pointers[_3ea];
var _3ed=_3eb?this._pointers[_3eb]:this._dom;
_3ed.appendChild(_3ec);
};
function ImageProfile(_3ee){
this._default=_3ee.image;
this._hover=_3ee.imageHover;
this._active=_3ee.imageActive;
this._disabled=_3ee.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3ef){
this._default=_3ef;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3f0){
this._hover=_3f0;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3f1){
this._active=_3f1;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3f2){
this._disabled=_3f2;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3f3,_3f4,_3f5){
var _3f6=null;
if(_3f3.isAttached){
_3f6=new List();
var _3f7=_3f5?_3f3.getChildElementsByLocalName(_3f4):_3f3.getDescendantElementsByLocalName(_3f4);
_3f7.each(function(_3f8){
var _3f9=UserInterface.getBinding(_3f8);
if(_3f9){
_3f6.add(_3f9);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3f3.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f6;
},getAncestorBindingByType:function(_3fb,impl,_3fd){
var _3fe=null;
if(Binding.exists(_3fb)){
var node=_3fb.bindingElement;
while(_3fe==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _400=UserInterface.getBinding(node);
if(_400 instanceof impl){
_3fe=_400;
}
}else{
if(_3fd&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3fe;
},getAncestorBindingByLocalName:function(_402,_403,_404){
var _405=null;
if(_403=="*"){
var node=_402.bindingElement;
while(!_405&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_405=UserInterface.getBinding(node);
}
}
}else{
_405=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_403,_402.bindingElement,_404));
}
return _405;
},getChildElementsByLocalName:function(_407,_408){
var _409=new List();
var _40a=new List(_407.bindingElement.childNodes);
_40a.each(function(_40b){
if(_40b.nodeType==Node.ELEMENT_NODE){
if(_408=="*"||DOMUtil.getLocalName(_40b)==_408){
_409.add(_40b);
}
}
});
return _409;
},getChildBindingByType:function(_40c,impl){
var _40e=null;
_40c.getChildElementsByLocalName("*").each(function(_40f){
var _410=UserInterface.getBinding(_40f);
if(_410!=null&&_410 instanceof impl){
_40e=_410;
return false;
}else{
return true;
}
});
return _40e;
},getDescendantBindingByType:function(_411,impl){
var _413=null;
_411.getDescendantElementsByLocalName("*").each(function(_414){
var _415=UserInterface.getBinding(_414);
if(_415!=null&&_415 instanceof impl){
_413=_415;
return false;
}else{
return true;
}
});
return _413;
},getDescendantBindingsByType:function(_416,impl){
var _418=new List();
_416.getDescendantElementsByLocalName("*").each(function(_419){
var _41a=UserInterface.getBinding(_419);
if(_41a!=null&&_41a instanceof impl){
_418.add(_41a);
}
return true;
});
return _418;
},getNextBindingByLocalName:function(_41b,name){
var _41d=null;
var _41e=_41b.bindingElement;
while((_41e=DOMUtil.getNextElementSibling(_41e))!=null&&DOMUtil.getLocalName(_41e)!=name){
}
if(_41e!=null){
_41d=UserInterface.getBinding(_41e);
}
return _41d;
},getPreviousBindingByLocalName:function(_41f,name){
var _421=null;
var _422=_41f.bindingElement;
while((_422=DOMUtil.getPreviousElementSibling(_422))!=null&&DOMUtil.getLocalName(_422)!=name){
}
if(_422!=null){
_421=UserInterface.getBinding(_422);
}
return _421;
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
},addFilter:function(_423){
this._filters.add(_423);
},removeFilter:function(_424){
var _425=-1;
this._filters.each(function(fil){
_425++;
var _427=true;
if(fil==_424){
_427=false;
}
return _427;
});
if(_425>-1){
this._filters.del(_425);
}
},_applyFilters:function(node,arg){
var _42a=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _42d=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _42e=true;
while(this._filters.hasNext()&&_42e==true){
var _42f=this._filters.getNext();
var res=_42f.call(this,node,arg);
if(res!=null){
_42a=res;
switch(res){
case stop:
case skip:
case skip+_42d:
_42e=false;
break;
}
}
}
return _42a;
},crawl:function(_431,arg){
this.contextDocument=_431.ownerDocument;
this.onCrawlStart();
var _433=this.type==NodeCrawler.TYPE_ASCENDING;
var _434=this._applyFilters(_431,arg);
if(_434!=NodeCrawler.STOP_CRAWLING){
if(_433&&_434==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_433?_431.parentNode:_431;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_436,arg){
var _438=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_438=this._crawlDescending(_436,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_438=this._crawlAscending(_436,arg);
break;
}
return _438;
},_crawlDescending:function(_439,arg){
var skip=NodeCrawler.SKIP_NODE;
var _43c=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _43e=null;
if(_439.hasChildNodes()){
var node=_439.firstChild;
while(node!=null&&_43e!=stop){
this.currentNode=node;
_43e=this._applyFilters(node,arg);
switch(_43e){
case stop:
case _43c:
case skip+_43c:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_43e=stop;
break;
}
}
}
if(_43e!=stop&&_43e!=skip){
this.previousNode=node;
}
break;
}
if(_43e!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _43e;
},_crawlAscending:function(_441,arg){
var _443=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_441!=null){
this.currentNode=_441;
_443=this._applyFilters(_441,arg);
if(_443!=stop){
var next=this.nextNode?this.nextNode:_441.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_441;
_443=this._crawl(next,arg);
}
}
}else{
_443=stop;
}
return _443;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _447 in this){
this[_447]=null;
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
var _44a=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_44a=NodeCrawler.SKIP_NODE;
}
return _44a;
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
this.addFilter(function(_44b,arg){
var _44d=null;
if(!UserInterface.hasBinding(_44b)){
_44d=NodeCrawler.SKIP_NODE;
}
return _44d;
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
this.addFilter(function(_44f,arg){
var _451=null;
var _452=UserInterface.getBinding(_44f);
if(Interfaces.isImplemented(ICrawlerHandler,_452)==true){
self.response=null;
_452.handleCrawler(self);
_451=self.response;
}
return _451;
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
this.addFilter(function(_454,list){
var _456=null;
var _457=UserInterface.getBinding(_454);
if(Interfaces.isImplemented(IFlexible,_457)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_457);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_457.isFlexSuspended==true){
_456=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_457);
}
break;
}
}
return _456;
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
this.addFilter(function(_458,list){
var _45a=null;
var _45b=UserInterface.getBinding(_458);
if(_45b.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_45b)==true){
if(_45b.isFocusable&&_45b.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_45b);
break;
case FocusCrawler.MODE_FOCUS:
if(!_45b.isFocused){
_45b.focus();
}
_45a=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_45b.isFocused==true){
_45b.blur();
_45a=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _45a;
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
this.addFilter(function(_45c,list){
var _45e=null;
var _45f=UserInterface.getBinding(_45c);
if(!_45f.isVisible){
_45e=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _45e;
});
this.addFilter(function(_460,list){
var _462=null;
var _463=UserInterface.getBinding(_460);
if(_463.isAttached){
if(Interfaces.isImplemented(IFit,_463)){
if(!_463.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_463);
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
UpdateAssistant.serialize=function(_464){
_464=_464.cloneNode(true);
_464.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_464.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_464);
};
}
},handleEvent:function(e){
var _466=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_466);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_466);
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
},_beforeUpdate:function(_467){
var _468=(_467==document.documentElement);
if(_468){
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
var _46b=FocusBinding.focusedBinding;
if(_46b!=null){
this._focusID=_46b.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_467.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_467);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_467,false);
break;
}
}
},_afterUpdate:function(_46c){
var _46d=(_46c==document.documentElement);
if(_46d){
var _46e=this._elementsbuffer;
if(_46e.hasEntries()){
_46e.each(function(_46f){
DocumentManager.attachBindings(_46f);
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
var _472=FocusBinding.focusedBinding;
if(_472==null){
var _473=document.getElementById(this._focusID);
if(_473!=null){
var _472=UserInterface.getBinding(_473);
if(_472!=null){
_472.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _474=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _475="NEW DOM: "+document.title+"\n\n"+_474+"\n\n";
_475+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_475);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_46c.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_46c.__isAttached!==false){
this._elementsbuffer.add(_46c);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_46c,true);
break;
}
switch(_46c.id){
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
var _472=UserInterface.getBinding(_46c);
while(_472==null&&_46c!=null){
_472=UserInterface.getBinding(_46c);
_46c=_46c.parentNode;
}
if(_472!=null){
_472.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_477,_478){
var _479=UserInterface.getBinding(_477);
if(_479!=null){
if(_478){
var _47a=this._attributesbuffer;
var map=new Map();
_47a.each(function(name,old){
var now=_477.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_477.attributes).each(function(att){
if(att.specified){
if(!_47a.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_481){
var _482=_479.propertyMethodMap[name];
if(_482!=null){
_482.call(_479,_481);
}
});
}else{
var map=new Map();
new List(_477.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_484,_485){
var _486=window.bindingMap[_484.getAttribute("id")];
if(_486!=null){
return _486.handleElement(_484,_485);
}
},updateElement:function(_487,_488){
var _489=window.bindingMap[_487.getAttribute("id")];
if(_489!=null){
return _489.updateElement(_487,_488);
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
this.addFilter(function(_48b,list){
var _48d=UserInterface.getBinding(_48b);
var _48e=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_48d==null){
UserInterface.registerBinding(_48b);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_48d!=null){
if(!_48d.isAttached){
list.add(_48d);
}
if(_48d.isLazy==true){
_48e=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_48d!=null){
list.add(_48d);
}
break;
}
return _48e;
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
},handleBroadcast:function(_48f,arg){
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
var _492=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_492)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_492!=null){
if(_492.href!=null&&_492.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _493=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_493!=null){
var map={};
var _495=DOMUtil.getElementsByTagName(_493,"bindingmapping");
new List(_495).each(function(_496){
var _497=_496.getAttribute("element");
var _498=_496.getAttribute("binding");
map[_497]=eval(_498);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_499){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_499;
}else{
this.customUserInterfaceMapping.merge(_499);
}
},_registerBindings:function(_49a){
var _49b=new DocumentCrawler();
_49b.mode=DocumentCrawler.MODE_REGISTER;
_49b.crawl(_49a);
_49b.dispose();
},_attachBindings:function(_49c){
var _49d=new DocumentCrawler();
_49d.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_49d.crawl(_49c,list);
var _49f=false;
while(list.hasNext()){
var _4a0=list.getNext();
if(!_4a0.isAttached){
_4a0.onBindingAttach();
if(!_4a0.memberDependencies){
_4a0.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_4a0)){
_49f=true;
}
}
}
if(_49f){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49d.dispose();
list.dispose();
},attachBindings:function(_4a2){
this._registerBindings(_4a2);
this._attachBindings(_4a2);
},detachBindings:function(_4a3,_4a4){
var _4a5=new DocumentCrawler();
_4a5.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a5.crawl(_4a3,list);
if(_4a4==true){
list.extractFirst();
}
var _4a7=false;
list.reverse().each(function(_4a8){
if(Interfaces.isImplemented(IData,_4a8)){
_4a7=true;
}
_4a8.dispose(true);
});
if(_4a7){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a5.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4aa){
return (/textarea|input/.test(DOMUtil.getLocalName(_4aa)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4ab){
this.isDirty=true;
var _4ac=false;
if(_4ab!=null&&!_4ab.isDirty){
_4ab.isDirty=true;
_4ab.dispatchAction(Binding.ACTION_DIRTY);
_4ac=true;
}
return _4ac;
},clean:function(_4ad){
if(_4ad.isDirty){
_4ad.isDirty=false;
}
},registerDataBinding:function(name,_4af){
if(Interfaces.isImplemented(IData,_4af,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4af;
}
}else{
throw "Invalid DataBinding: "+_4af;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4b2=null;
if(this._dataBindings[name]!=null){
_4b2=this._dataBindings[name];
}
return _4b2;
},getAllDataBindings:function(_4b3){
var list=new List();
for(var name in this._dataBindings){
var _4b6=this._dataBindings[name];
list.add(_4b6);
if(_4b3&&_4b6 instanceof WindowBinding){
var _4b7=_4b6.getContentWindow().DataManager;
if(_4b7!=null){
list.merge(_4b7.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4b8=false;
for(var name in this._dataBindings){
_4b8=true;
break;
}
return _4b8;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4bc){
var _4bd=this._dataBindings[name];
if(_4bd!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4bd.setResult(_4bc);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4bd);
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
var _4be=new DataBindingMap();
_4be.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4c0=this._dataBindings[name];
if(_4c0 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4be[name]=_4c0.getValue();
}
return _4be;
},getDataBindingResultMap:function(){
var _4c1=new DataBindingMap();
_4c1.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4c3=this._dataBindings[name];
var res=_4c3.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c6){
_4c1.set(name,_4c6);
});
}else{
_4c1.set(name,res);
}
}
return _4c1;
},getPostBackString:function(){
var _4c7="";
var form=document.forms[0];
if(form!=null){
var _4c9="";
new List(form.elements).each(function(_4ca){
var name=_4ca.name;
var _4cc=encodeURIComponent(_4ca.value);
switch(_4ca.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c7+=name+"="+_4cc+"&";
break;
case "submit":
if(document.activeElement==_4ca){
_4c7+=name+"="+_4cc+"&";
}
break;
case "radio":
if(_4ca.checked){
_4c7+=name+"="+_4cc+"&";
}
break;
case "checkbox":
if(_4ca.checked){
if(_4ca.name==_4c9){
if(_4c7.lastIndexOf("&")==_4c7.length-1){
_4c7=_4c7.substr(0,_4c7.length-1);
}
_4c7+=","+_4cc;
}else{
_4c7+=name+"="+_4ca.value;
}
_4c9=name;
_4c7+="&";
}
break;
}
});
}
return _4c7.substr(0,_4c7.length-1);
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
var _4d5=null;
var _4d6=null;
var _4d7=false;
if(!this._cache[name]){
_4d7=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4d9=DOMUtil.getXMLHTTPRequest();
_4d9.open("get",uri,false);
_4d9.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4d9.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d6=_4d9.responseText;
break;
default:
_4d6=_4d9.responseXML;
break;
}
if(_4d6==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d6;
}
}
_4d6=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d5=_4d6;
break;
case this._modes.MODE_DOCUMENT:
_4d5=DOMUtil.cloneNode(_4d6,true);
break;
case this._modes.MODE_ELEMENT:
_4d5=DOMUtil.cloneNode(_4d6.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d5=DOMSerializer.serialize(_4d6,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d5=DOMSerializer.serialize(_4d6.documentElement,true);
break;
}
if(_4d7&&Application.isDeveloperMode){
}
return _4d5;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4dc){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4dc];
},invoke:function(url,_4de,_4df){
this._logger.error("Not implemented");
},invokeModal:function(url,_4e1,_4e2){
var _4e3=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4e1,argument:_4e2});
StageBinding.presentViewDefinition(_4e3);
return _4e3;
},invokeDefinition:function(_4e4){
if(_4e4 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e4);
}
return _4e4;
},question:function(_4e5,text,_4e7,_4e8){
if(!_4e7){
_4e7=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e5,text,_4e7,_4e8);
},message:function(_4e9,text,_4eb,_4ec){
if(!_4eb){
_4eb=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4e9,text,_4eb,_4ec);
},error:function(_4ed,text,_4ef,_4f0){
if(!_4ef){
_4ef=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4ed,text,_4ef,_4f0);
},warning:function(_4f1,text,_4f3,_4f4){
if(!_4f3){
_4f3=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4f1,text,_4f3,_4f4);
},_standardDialog:function(type,_4f6,text,_4f8,_4f9){
var _4fa=null;
if(!_4f8){
_4fa=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4fa=new List();
new List(_4f8).each(function(_4fb){
var _4fc=null;
switch(typeof _4fb){
case "object":
_4fc=_4fb;
break;
case "string":
var _4fd=false;
if(_4fb.indexOf(":")>-1){
_4fb=_4fb.split(":")[0];
_4fd=true;
}
_4fc=Dialog.dialogButton(_4fb);
if(_4fd){
_4fc.isDefault=true;
}
break;
}
_4fa.add(_4fc);
});
}
var _4fe={title:_4f6,text:text,type:type,image:this._dialogImages[type],buttons:_4fa};
var _4ff=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4f9,argument:_4fe});
StageBinding.presentViewDefinition(_4ff);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_501,arg){
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
},saveAll:function(_504){
var self=this;
var _506=Application.getDirtyDockTabsTabs();
if(_506.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_507,_508){
switch(_507){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_508,_504);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_506);
}else{
if(_504){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_509,_50a){
var _50b=false;
var list=new List();
_509.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_50b=true;
var _50f=list.getLength();
var _510={handleBroadcast:function(_511,tab){
if(--_50f==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_50a){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_510);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _50b;
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
var _515="Composite.Management.Help";
if(!StageBinding.isViewOpen(_515)){
StageBinding.handleViewPresentation(_515);
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
var _517=document.createEvent("Events");
_517.initEvent(type,true,true);
window.dispatchEvent(_517);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function CompositeUrl(url){
var _519=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _51a=_519.exec(url);
if(_51a){
var _51b={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_51b[$1]=$3;
});
this.queryString=_51b;
this.path=url.replace(/\?.*/g,"");
if(_51a[3]=="media"){
this.isMedia=true;
}else{
if(_51a[3]=="page"){
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
CompositeUrl.prototype.setParam=function(key,_523){
this.queryString[key]=_523;
};
CompositeUrl.prototype.toString=function(){
var url=this.path;
var _525=[];
for(var key in this.queryString){
_525.push(key+"="+this.queryString[key]);
}
if(_525.length>0){
url+="?"+_525.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_527,_528){
var _529=null;
var _52a=ViewDefinitions[_527];
if(_52a.isMutable){
var impl=null;
if(_52a instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_528!=null&&impl!=null){
var def=new impl();
for(var prop in _52a){
def[prop]=ViewDefinition.cloneProperty(_52a[prop]);
}
def.handle=_528;
_529=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _529;
};
ViewDefinition.cloneProperty=function(_52e){
if(null==_52e){
return _52e;
}
if(typeof _52e==="object"){
var _52f=(_52e.constructor===Array)?[]:{};
for(var prop in _52e){
_52f[prop]=ViewDefinition.cloneProperty(_52e[prop]);
}
return _52f;
}
return _52e;
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
Binding.evaluate=function(_536,_537){
var _538=null;
var _539=_537.bindingWindow.WindowManager;
if(_539!=null){
var _53a=Binding.parseScriptStatement(_536,_537.key);
_538=_539.evaluate(_53a);
}
return _538;
};
Binding.parseScriptStatement=function(_53b,key){
if(_53b!=null&&key!=null){
var _53d="UserInterface.getBindingByKey ( \""+key+"\" )";
_53b=_53b.replace(/(\W|^)this(,| +|\)|;)/g,_53d);
_53b=_53b.replace(/(\W|^)this(\.)/g,_53d+".");
}
return _53b;
};
Binding.exists=function(_53e){
var _53f=false;
try{
if(_53e&&_53e.bindingElement&&_53e.bindingElement.nodeType&&_53e.isDisposed==false){
_53f=true;
}
}
catch(accessDeniedException){
_53f=false;
}
finally{
return _53f;
}
};
Binding.destroy=function(_540){
if(!_540.isDisposed){
if(_540.acceptor!=null){
_540.acceptor.dispose();
}
if(_540.dragger!=null){
_540.disableDragging();
}
if(_540.boxObject!=null){
_540.boxObject.dispose();
}
if(_540._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_540);
}
for(var _541 in _540.shadowTree){
var _542=_540.shadowTree[_541];
if(_542 instanceof Binding&&Binding.exists(_542)){
_542.dispose(true);
}
_540.shadowTree[_541]=null;
}
_540.isDisposed=true;
_540=null;
}
};
Binding.dotnetify=function(_543,_544){
var _545=_543.getCallBackID();
if(_545!=null){
var _546=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_543.bindingDocument);
_546.type="hidden";
_546.id=_545;
_546.name=_545;
_546.value=_544!=null?_544:"";
_543.bindingElement.appendChild(_546);
_543.shadowTree.dotnetinput=_546;
}else{
throw _543.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_547){
var _548=_547.getProperty("image");
var _549=_547.getProperty("image-hover");
var _54a=_547.getProperty("image-active");
var _54b=_547.getProperty("image-disabled");
if(_547.imageProfile==null){
if(_547.image==null&&_548!=null){
_547.image=_548;
}
if(_547.imageHover==null&&_549!=null){
_547.imageHover=_548;
}
if(_547.imageActive==null&&_54a!=null){
_547.imageActive=_54a;
}
if(_547.imageDisabled==null&&_54b!=null){
_547.imageDisabled=_54b;
}
if(_547.image||_547.imageHover||_547.imageActive||_547.imageDisabled){
_547.imageProfile=new ImageProfile(_547);
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
var _54d=this.dependentBindings[key];
_54d.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_54e){
if(_54e){
this.memberDependencies[_54e.key]=true;
var _54f=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_54f=false;
break;
}
}
if(_54f){
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
Binding.prototype.detachRecursive=function(_551){
if(_551==null){
_551=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_551);
};
Binding.prototype.addMember=function(_552){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_552.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_552.key]=false;
_552.registerDependentBinding(this);
}
}
return _552;
};
Binding.prototype.addMembers=function(_553){
while(_553.hasNext()){
var _554=_553.getNext();
if(!_554.isInitialized){
this.addMember(_554);
}
}
return _553;
};
Binding.prototype.registerDependentBinding=function(_555){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_555.key]=_555;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _556=this.getProperty("persist");
if(_556&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _558=new List(_556.split(" "));
while(_558.hasNext()){
var prop=_558.getNext();
var _55a=Persistance.getPersistedProperty(id,prop);
if(_55a!=null){
this._persist[prop]=_55a;
this.setProperty(prop,_55a);
}else{
_55a=this.getProperty(prop);
if(_55a!=null){
this._persist[prop]=_55a;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _55b=this.getProperty("disabled");
var _55c=this.getProperty("contextmenu");
var _55d=this.getProperty("observes");
var _55e=this.getProperty("onattach");
var _55f=this.getProperty("hidden");
var _560=this.getProperty("blockactionevents");
if(_55f==true&&this.isVisible==true){
this.hide();
}
if(_55b&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_55c){
this.setContextMenu(_55c);
}
if(_55d){
this.observe(this.getBindingForArgument(_55d));
}
if(_560==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_55e!=null){
Binding.evaluate(_55e,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _562=this.getProperty("draggable");
var _563=this.getProperty("dragtype");
var _564=this.getProperty("dragaccept");
var _565=this.getProperty("dragreject");
if(_562!=null){
this.isDraggable=_562;
}
if(_563!=null){
this.dragType=_563;
if(_562!=false){
this.isDraggable=true;
}
}
if(_564!=null){
this.dragAccept=_564;
}
if(_565!=null){
this.dragReject=_565;
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
Binding.prototype._updateBindingMap=function(_566){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _569=null;
if(_566){
_569=map[id];
if(_569!=null&&_569!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_569=map[id];
if(_569!=null&&_569==this){
delete map[id];
}
}
}else{
var _56b=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_566);
if(Application.isDeveloperMode==true){
alert(_56b);
}else{
this.logger.error(_56b);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_56d){
};
Binding.prototype.handleBroadcast=function(_56e,arg){
};
Binding.prototype.handleElement=function(_570){
return false;
};
Binding.prototype.updateElement=function(_571){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _573=null;
switch(typeof arg){
case "object":
_573=arg;
break;
case "string":
_573=this.bindingDocument.getElementById(arg);
if(_573==null){
_573=Binding.evaluate(arg,this);
}
break;
}
if(_573!=null&&_573.nodeType!=null){
_573=UserInterface.getBinding(_573);
}
return _573;
};
Binding.prototype.serialize=function(){
var _574={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_574.id=id;
}
var _576=this.getProperty("binding");
if(_576){
_574.binding=_576;
}
return _574;
};
Binding.prototype.serializeToString=function(){
var _577=null;
if(this.isAttached){
_577=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _577;
};
Binding.prototype.subTreeFromString=function(_578){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_578);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_579){
var _57a=this.bindingElement.getAttribute(_579);
if(_57a){
_57a=Types.castFromString(_57a);
}
return _57a;
};
Binding.prototype.setProperty=function(prop,_57c){
if(_57c!=null){
_57c=_57c.toString();
if(String(this.bindingElement.getAttribute(prop))!=_57c){
this.bindingElement.setAttribute(prop,_57c);
if(this.isAttached==true){
if(Persistance.isEnabled&&_57c!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_57c;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_57c);
}
}
var _57d=this.propertyMethodMap[prop];
if(_57d){
_57d.call(this,this.getProperty(prop));
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
var _57f=null;
if(Binding.exists(this)){
_57f=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _57f;
};
Binding.prototype.attachClassName=function(_580){
CSSUtil.attachClassName(this.bindingElement,_580);
};
Binding.prototype.detachClassName=function(_581){
CSSUtil.detachClassName(this.bindingElement,_581);
};
Binding.prototype.hasClassName=function(_582){
return CSSUtil.hasClassName(this.bindingElement,_582);
};
Binding.prototype.addActionListener=function(type,_584){
_584=_584!=null?_584:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_584)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_584);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_584+")");
}
};
Binding.prototype.removeActionListener=function(type,_586){
_586=_586?_586:this;
if(Action.isValid(type)){
var _587=this.actionListeners[type];
if(_587){
var i=0,_589;
while((_589=_587[i])!=null){
if(_589==_586){
_587.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_58b){
_58b=_58b?_58b:this;
DOMEvents.addEventListener(this.bindingElement,type,_58b);
};
Binding.prototype.removeEventListener=function(type,_58d){
_58d=_58d?_58d:this;
DOMEvents.removeEventListener(this.bindingElement,type,_58d);
};
Binding.prototype.subscribe=function(_58e){
if(!this.hasSubscription(_58e)){
this._subscriptions.set(_58e,true);
EventBroadcaster.subscribe(_58e,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_58e);
}
};
Binding.prototype.unsubscribe=function(_58f){
if(this.hasSubscription(_58f)){
this._subscriptions.del(_58f);
EventBroadcaster.unsubscribe(_58f,this);
}
};
Binding.prototype.hasSubscription=function(_590){
return this._subscriptions.has(_590);
};
Binding.prototype.observe=function(_591,_592){
_591.addObserver(this,_592);
};
Binding.prototype.unObserve=function(_593,_594){
_593.removeObserver(this,_594);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _599={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_599);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_599);
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
var _59b=null;
var _59c=null;
var _59d=false;
if(arg instanceof Action){
_59b=arg;
}else{
if(Action.isValid(arg)){
_59b=new Action(this,arg);
_59d=true;
}
}
if(_59b!=null&&Action.isValid(_59b.type)==true){
if(_59b.isConsumed==true){
_59c=_59b;
}else{
var _59e=this.actionListeners[_59b.type];
if(_59e!=null){
_59b.listener=this;
var i=0,_5a0;
while((_5a0=_59e[i++])!=null){
if(_5a0&&_5a0.handleAction){
_5a0.handleAction(_59b);
}
}
}
var _5a1=true;
if(this.isBlockingActions==true){
switch(_59b.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_59d){
_5a1=false;
}
break;
}
}
if(_5a1){
_59c=this.migrateAction(_59b);
}else{
_59c=_59b;
}
}
}
return _59c;
};
Binding.prototype.migrateAction=function(_5a2){
var _5a3=null;
var _5a4=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_5a3&&node.nodeType!=Node.DOCUMENT_NODE){
_5a3=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_5a3){
_5a4=_5a3.dispatchAction(_5a2);
}else{
_5a4=_5a2;
}
}
return _5a4;
};
Binding.prototype.reflex=function(_5a6){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_5a6);
}
};
Binding.prototype.getMigrationParent=function(){
var _5a7=null;
if(true){
try{
var _5a8=this.bindingElement.parentNode;
if(_5a8!=null){
_5a7=_5a8;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_5a7=null;
}
}
return _5a7;
};
Binding.prototype.add=function(_5a9){
if(_5a9.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_5a9.bindingElement);
}else{
throw "Could not add "+_5a9.toString()+" of different document origin.";
}
return _5a9;
};
Binding.prototype.addFirst=function(_5aa){
if(_5aa.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5aa.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5aa.toString()+" of different document origin.";
}
return _5aa;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5ab,_5ac){
return BindingFinder.getAncestorBindingByLocalName(this,_5ab,_5ac);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5ae){
return BindingFinder.getAncestorBindingByType(this,impl,_5ae);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5b0){
return BindingFinder.getChildElementsByLocalName(this,_5b0);
};
Binding.prototype.getChildElementByLocalName=function(_5b1){
return this.getChildElementsByLocalName(_5b1).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5b2){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5b2));
};
Binding.prototype.getChildBindingsByLocalName=function(_5b3){
return this.getDescendantBindingsByLocalName(_5b3,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5b4){
return this.getChildBindingsByLocalName(_5b4).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5b5,_5b6){
return BindingFinder.getDescendantBindingsByLocalName(this,_5b5,_5b6);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5b7){
return this.getDescendantBindingsByLocalName(_5b7,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5ba){
return BindingFinder.getNextBindingByLocalName(this,_5ba);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5bb){
return BindingFinder.getPreviousBindingByLocalName(this,_5bb);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5bc){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5bc);
};
Binding.prototype.isFirstBinding=function(_5bd){
return (this.getOrdinalPosition(_5bd)==0);
};
Binding.prototype.isLastBinding=function(_5be){
return DOMUtil.isLastElement(this.bindingElement,_5be);
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
Binding.prototype.setCallBackArg=function(_5c0){
this.setProperty(Binding.CALLBACKARG,_5c0);
};
Binding.prototype.dispose=function(_5c1){
if(!this.isDisposed){
if(!_5c1){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5c2=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5c2){
if(Client.isExplorer){
_5c2.outerHTML="";
}else{
_5c2.parentNode.removeChild(_5c2);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5c5){
list.add(_5c5);
});
list.each(function(_5c6){
self.unsubscribe(_5c6);
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
Binding.prototype.wakeUp=function(_5c8,_5c9){
_5c9=_5c9?_5c9:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5c8!==undefined){
self[_5c8]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5c9);
},0);
}
};
Binding.prototype.handleCrawler=function(_5cb){
if(_5cb.response==null&&this.isLazy==true){
if(_5cb.id==DocumentCrawler.ID&&_5cb.mode==DocumentCrawler.MODE_REGISTER){
_5cb.response=NodeCrawler.NORMAL;
}else{
_5cb.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5cb.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5cb.id)){
_5cb.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5cb.response==null){
switch(_5cb.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5cb.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5cc){
var _5cd=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5cc);
return UserInterface.registerBinding(_5cd,Binding);
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
var _5ce=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5ce.each(function(_5cf){
DataBinding.expressions[_5cf.Key]=new RegExp(_5cf.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5d0){
var _5d1=null;
var _5d2=_5d0.getAncestorBindingByLocalName("field");
if(_5d2&&_5d2 instanceof FieldBinding){
var desc=_5d2.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5d1=desc.getLabel();
}
}
return _5d1;
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
var _5d5=this.bindingWindow.DataManager;
_5d5.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5d7=this.bindingWindow.DataManager;
if(_5d7.getDataBinding(name)){
_5d7.unRegisterDataBinding(name);
}
_5d7.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5d8,arg){
RootBinding.superclass.handleBroadcast.call(this,_5d8,arg);
var _5da=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5d8){
case _5da:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5da);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5db){
var _5dc=_5db?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5db!=this.isActivated){
this.isActivated=_5db;
this.dispatchAction(_5dc);
var _5dd=new List();
var self=this;
this._activationawares.each(function(_5df){
if(_5df.isActivationAware){
try{
if(_5db){
if(!_5df.isActivated){
_5df.onActivate();
}
}else{
if(_5df.isActivated){
_5df.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5dd.add(_5df);
}
}
});
_5dd.each(function(_5e0){
this._activationawares.del(_5e0);
});
_5dd.dispose();
}else{
var _5e1="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5e1);
}else{
this.logger.error(_5e1);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5e2,_5e3){
if(Interfaces.isImplemented(IActivationAware,_5e2,true)==true){
if(_5e3==false){
this._activationawares.del(_5e2);
}else{
this._activationawares.add(_5e2);
if(this.isActivated==true){
_5e2.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5e2+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5e4){
var _5e5=this.getMigrationParent();
if(_5e5!=null){
var root=_5e5.ownerDocument.body;
var _5e7=UserInterface.getBinding(root);
if(_5e7!=null){
_5e7.makeActivationAware(this,_5e4);
}
}
};
RootBinding.prototype.handleCrawler=function(_5e8){
RootBinding.superclass.handleCrawler.call(this,_5e8);
if(_5e8.type==NodeCrawler.TYPE_ASCENDING){
_5e8.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5e9=null;
if(this.bindingWindow.parent){
_5e9=this.bindingWindow.frameElement;
}
return _5e9;
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
var _5ea=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5ea.hasNext()){
var cell=_5ea.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5ec){
var _5ed=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5ec.bindingElement);
_5ed=_5ec;
}else{
_5ed=MatrixBinding.superclass.add.call(this,_5ec);
}
return _5ed;
};
MatrixBinding.prototype.addFirst=function(_5ee){
var _5ef=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5f0=this.shadowTree[MatrixBinding.CENTER];
_5f0.insertBefore(_5ee.bindingElement,_5f0.firstChild);
_5ef=_5ee;
}else{
_5ef=MatrixBinding.superclass.addFirst.call(this,_5ee);
}
return _5ee;
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
MatrixBinding.newInstance=function(_5f2){
var _5f3=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5f2);
return UserInterface.registerBinding(_5f3,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5f4,_5f5){
var list=new List();
var _5f7=new FlexBoxCrawler();
_5f7.mode=_5f5?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5f7.startBinding=_5f4;
_5f7.crawl(_5f4.bindingElement,list);
list.each(function(_5f8){
_5f8.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5f9){
if(Binding.exists(_5f9)){
_5f9.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5fa){
if(Binding.exists(_5fa)){
_5fa.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5f7.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5fb){
FlexBoxBinding.superclass.handleAction.call(this,_5fb);
switch(_5fb.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5fc){
var _5fd=0;
var _5fe=new List(this.bindingElement.parentNode.childNodes);
while(_5fe.hasNext()){
var _5ff=_5fe.getNext();
if(_5ff.nodeType==Node.ELEMENT_NODE&&_5ff!=this.bindingElement){
if(!this._isOutOfFlow(_5ff)){
var rect=_5ff.getBoundingClientRect();
if(_5fc){
height+=(rect.right-rect.left);
}else{
_5fd+=(rect.bottom-rect.top);
}
}
}
}
return _5fd;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_601){
var _602=CSSComputer.getPosition(_601);
var _603=CSSComputer.getFloat(_601);
return (_602=="absolute"||_603!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _604=this.bindingElement.parentNode;
var rect=_604.getBoundingClientRect();
var _606=rect.bottom-rect.top;
var _607=CSSComputer.getPadding(_604);
var _608=CSSComputer.getBorder(_604);
_606-=(_607.top+_607.bottom);
_606-=(_608.top+_608.bottom);
return _606;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _609=this.bindingElement.parentNode;
var rect=_609.getBoundingClientRect();
var _60b=rect.right-rect.left;
var _60c=CSSComputer.getPadding(_609);
var _60d=CSSComputer.getBorder(_609);
_60b-=(_60c.left+_60c.right);
_60b-=(_60d.left+_60d.right);
return _60b;
};
FlexBoxBinding.prototype.setFlexibility=function(_60e){
if(_60e!=this.isFlexible){
if(_60e){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_60e;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _60f=this._getSiblingsSpan();
_60f=this._getCalculatedHeight()-_60f;
if(!isNaN(_60f)&&_60f>=0){
if(_60f!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_60f)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_610){
if(!this.isFit||_610){
var _611=0;
new List(this.bindingElement.childNodes).each(function(_612){
if(_612.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_612)){
var rect=_612.getBoundingClientRect();
_611+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_611);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_614){
var _615=CSSComputer.getPadding(this.bindingElement);
var _616=CSSComputer.getBorder(this.bindingElement);
_614+=_615.top+_615.bottom;
_614+=_616.top+_616.bottom;
this.bindingElement.style.height=_614+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_617){
ScrollBoxBinding.superclass.handleAction.call(this,_617);
switch(_617.type){
case BalloonBinding.ACTION_INITIALIZE:
_617.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_618){
this.bindingElement.scrollLeft=_618.x;
this.bindingElement.scrollTop=_618.y;
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
var _619=this._getBuildElement("labeltext");
if(_619){
this.shadowTree.labelText=_619;
this.shadowTree.text=_619.firstChild;
this.hasLabel=true;
}
}else{
var _61a=this.getProperty("label");
var _61b=this.getProperty("image");
var _61c=this.getProperty("tooltip");
if(_61a){
this.setLabel(_61a,false);
}
if(_61b){
this.setImage(_61b,false);
}
if(_61c){
this.setToolTip(_61c);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_61d,_61e){
_61d=_61d!=null?_61d:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_61d);
this.setProperty("label",_61d);
if(!_61e){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_620){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_620){
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
LabelBinding.prototype.setToolTip=function(_623){
this.setProperty("tooltip",_623);
if(_623!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_623));
}
};
LabelBinding.prototype.getToolTip=function(_624){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_625){
_625=_625==null?true:_625;
var _626=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_625;
if(_625){
this.attachClassName(_626);
}else{
this.detachClassName(_626);
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
var _627="textonly";
var _628="imageonly";
var _629="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_627);
this.detachClassName(_628);
this.attachClassName(_629);
}else{
if(this.hasLabel){
this.detachClassName(_629);
this.detachClassName(_628);
this.attachClassName(_627);
}else{
if(this.hasImage){
this.detachClassName(_629);
this.detachClassName(_627);
this.attachClassName(_628);
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
LabelBinding.newInstance=function(_62a){
var _62b=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_62a);
return UserInterface.registerBinding(_62b,LabelBinding);
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
var _62c=this.getProperty("label");
if(!_62c){
_62c=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_62c));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_62e){
this.setProperty("label",_62e);
};
TextBinding.newInstance=function(_62f){
var _630=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_62f);
return UserInterface.registerBinding(_630,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_631,_632){
BroadcasterBinding.superclass.setProperty.call(this,_631,_632);
function update(list){
if(list){
list.each(function(_634){
_634.setProperty(_631,_632);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _635=this._observers[_631];
if(_635){
update(_635);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_636){
BroadcasterBinding.superclass.deleteProperty.call(this,_636);
function update(list){
if(list){
list.each(function(_638){
_638.deleteProperty(_636);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _639=this._observers[_636];
if(_639){
update(_639);
}
};
BroadcasterBinding.prototype.addObserver=function(_63a,_63b){
_63b=_63b?_63b:"*";
_63b=new List(_63b.split(" "));
while(_63b.hasNext()){
var _63c=_63b.getNext();
switch(_63c){
case "*":
this._setAllProperties(_63a);
break;
default:
var _63d=this.getProperty(_63c);
_63a.setProperty(_63c,_63d);
break;
}
if(!this._observers[_63c]){
this._observers[_63c]=new List();
}
this._observers[_63c].add(_63a);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_63e){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _641=att.nodeName;
switch(_641){
case "id":
case "key":
break;
default:
var _642=this.getProperty(_641);
_63e.setProperty(_641,_642);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_643,_644){
_644=_644?_644:"*";
_644=new List(_644.split(" "));
while(_644.hasNext()){
var list=this._observers[_644.getNext()];
if(list){
while(list.hasNext()){
var _646=list.getNext();
if(_646==_643){
list.del(_646);
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
BroadcasterBinding.prototype.setDisabled=function(_647){
this.setProperty("isdisabled",_647);
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
var _649=this.getProperty("width");
var _64a=this.getProperty("label");
var type=this.getProperty("type");
var _64c=this.getProperty("popup");
var _64d=this.getProperty("tooltip");
var _64e=this.getProperty("isdisabled");
var _64f=this.getProperty("response");
var _650=this.getProperty("oncommand");
var _651=this.getProperty("value");
var _652=this.getProperty("ischecked");
var _653=this.getProperty("callbackid");
var _654=this.getProperty("focusable");
var _655=this.getProperty("focused");
var _656=this.getProperty("default");
var url=this.getProperty("url");
var _658=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_658){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_64a!=null){
this.setLabel(_64a);
}
if(type!=null){
this.setType(type);
}
if(_64d!=null){
this.setToolTip(_64d);
}
if(_649!=null){
this.setWidth(_649);
}
if(_64c!=null){
this.setPopup(_64c);
}
if(_64f!=null){
this.response=_64f;
}
if(_652==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_650!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_650,this);
};
}
if(_654||this.isFocusable){
this._makeFocusable();
if(_656||this.isDefault){
this.isDefault=true;
}
if(_655){
this.focus();
}
}
if(_64e==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_653!=null){
this.bindingWindow.DataManager.registerDataBinding(_653,this);
if(_651!=null){
Binding.dotnetify(this,_651);
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
ButtonBinding.prototype.setImage=function(_659){
if(this.isAttached){
this.labelBinding.setImage(_659);
}
this.setProperty("image",_659);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_65a){
if(this.isAttached){
this.labelBinding.setLabel(_65a);
}
this.setProperty("label",_65a);
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
ButtonBinding.prototype.setToolTip=function(_65c){
this.setProperty("tooltip",_65c);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_65c));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_65d){
this.imageProfile=new _65d(this);
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
ButtonBinding.prototype.flip=function(_662){
_662=_662==null?true:_662;
this.isFlipped=_662;
this.setProperty("flip",_662);
if(this.isAttached){
this.labelBinding.flip(_662);
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
ButtonBinding.prototype.check=function(_663){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_663==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_664){
this.isActive=true;
this.isChecked=true;
if(!_664){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_665){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_665==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_666){
this.isActive=false;
this.isChecked=false;
if(!_666){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_667,_668){
if(_667==null){
_667==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_667){
case true:
this.check(_668);
break;
case false:
this.uncheck(_668);
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
var _66a=this.getProperty("tooltip");
if(_66a){
this.setToolTip(_66a);
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
var _66b=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_66b=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _66b;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _66d=this.getEqualSizeWidth();
if(goal>_66d){
var diff=goal-_66d;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _670=null;
if(this.isAttached==true){
var _671=CSSComputer.getPadding(this.bindingElement);
var _672=CSSComputer.getPadding(this.bindingElement);
_670=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_670=_670+_671.left+_671.right;
_670=_670+_672.left+_672.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _670;
};
ButtonBinding.prototype.setWidth=function(_673){
if(this.isAttached==true){
var _674=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _675=CSSComputer.getPadding(this.shadowTree.c);
var _676=_673-_674;
_676=_676-_675.left-_675.right;
this.shadowTree.c.style.width=String(_676)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_676-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_673);
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
ButtonBinding.prototype.setValue=function(_677){
this.shadowTree.dotnetinput.value=_677;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_678){
this.setValue(_678);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_679){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_679;
this.imageProfile=_679.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_67a){
var _67b=_67a?"addEventListener":"removeEventListener";
this.binding[_67b](DOMEvents.MOUSEENTER,this);
this.binding[_67b](DOMEvents.MOUSELEAVE,this);
this.binding[_67b](DOMEvents.MOUSEDOWN,this);
this.binding[_67b](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _67d=false,_67e=false,_67f=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_67f=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_67f=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_67f=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_67f=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_67f==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67d=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_67f=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_67f=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_67f=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_67f=ButtonStateManager.STATE_NORMAL;
var _680=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_680 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_67f=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_67f==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67e=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_67f=ButtonStateManager.STATE_NORMAL;
_67d=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_67f=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_67f=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_67f=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_67f=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_67f==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67d=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_67f=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_67f=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_67f=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_67f=ButtonStateManager.STATE_NORMAL;
_67d=true;
break;
}
}
}
}
}
switch(_67f){
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
if(_67d){
this.binding.fireCommand();
}
if(_67e){
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
var _684=this.imageProfile.getDisabledImage();
if(_684){
this.binding.setImage(_684);
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
ClickButtonBinding.newInstance=function(_685){
var _686=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_685);
return UserInterface.registerBinding(_686,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_687){
var _688=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_687);
return UserInterface.registerBinding(_688,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_689){
var _68a=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_689);
return UserInterface.registerBinding(_68a,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_68b){
this._binding=_68b;
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
var _68c=this.getDescendantBindingsByLocalName("control");
_68c.each(function(_68d){
_68d.setControlType(_68d.controlType);
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
ControlGroupBinding.newInstance=function(_68f){
var _690=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_68f);
return UserInterface.registerBinding(_690,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_693){
ControlBinding.superclass.handleAction.call(this,_693);
switch(_693.type){
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
function ControlImageProfile(_694){
this.binding=_694;
}
ControlImageProfile.prototype._getImage=function(_695){
var _696=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_696=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_696=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_696=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_696=this.constructor.IMAGE_CLOSE;
break;
}
return _696.replace("${string}",_695);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _697=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_697=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _697?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_698){
ControlBoxBinding.superclass.handleAction.call(this,_698);
switch(_698.type){
case ControlBinding.ACTION_COMMAND:
var _699=_698.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_699);
Application.unlock(self);
},0);
_698.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_69b){
switch(_69b.controlType){
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
ControlBoxBinding.prototype.setState=function(_69c){
var _69d=this.getState();
this.setProperty("state",_69c);
this.detachClassName(_69d);
this.attachClassName(_69c);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _69e=this.getProperty("state");
if(!_69e){
_69e=ControlBoxBinding.STATE_NORMAL;
}
return _69e;
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
MenuContainerBinding.prototype.isOpen=function(_69f){
var _6a0=null;
if(!_69f){
_6a0=this._isOpen;
}else{
_6a0=(_69f==this._openElement);
}
return _6a0;
};
MenuContainerBinding.prototype.setOpenElement=function(_6a1){
if(_6a1){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_6a1;
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
var _6a2=this.getChildBindingByLocalName("menupopup");
if(_6a2&&_6a2!=this.menuPopupBinding){
this.menuPopupBinding=_6a2;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6a3=this.getMenuContainerBinding();
_6a3.setOpenElement(this);
var _6a4=this.getMenuPopupBinding();
_6a4.snapTo(this.bindingElement);
_6a4.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6a5){
MenuContainerBinding.superclass.handleAction.call(this,_6a5);
if(_6a5.type==PopupBinding.ACTION_HIDE){
var _6a6=this.getMenuContainerBinding();
_6a6.setOpenElement(false);
this.reset();
_6a5.consume();
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
MenuBarBinding.prototype.handleAction=function(_6a7){
MenuBarBinding.superclass.handleAction.call(this,_6a7);
switch(_6a7.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6a8=_6a7.target;
var _6a9=this.getChildBindingsByLocalName("menu");
while(_6a9.hasNext()){
var menu=_6a9.getNext();
}
switch(_6a8.arrowKey){
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
var _6ab=this.getProperty("image");
var _6ac=this.getProperty("label");
var _6ad=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6ac){
this.setLabel(_6ac);
}
if(_6ab){
this.setImage(_6ab);
}
if(_6ad){
this.setToolTip(_6ad);
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
MenuBinding.prototype.setLabel=function(_6af){
this.setProperty("label",_6af);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6af));
}
};
MenuBinding.prototype.setToolTip=function(_6b0){
this.setProperty("tooltip",_6b0);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6b0));
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
var _6b2=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6b2.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6b2.isOpen()&&!_6b2.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6b2.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6b2.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6b3,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6b3){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6b8){
switch(_6b8.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6b9=null;
var _6ba=true;
self._lastFocused.focus();
self.grabKeyboard();
_6b8.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6bc){
for(var key in this._focused){
if(key!=_6bc.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6bc.key]=_6bc;
this._lastFocused=_6bc;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6bf){
delete this._focused[_6bf.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6c0){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6c0);
}
if(_6c0){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6c3=this.getChildBindingsByLocalName("menugroup");
var _6c4=null;
var _6c5=null;
while(_6c3.hasNext()){
var _6c6=_6c3.getNext();
if(!_6c6.isDefaultContent){
_6c6.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6c4&&_6c6.isVisible){
_6c4=_6c6;
}
if(_6c6.isVisible){
_6c5=_6c6;
}
}
}
if(_6c4&&_6c5){
_6c4.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6c5.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6c7){
MenuBodyBinding.activeInstance=this;
if(_6c7){
var _6c8=this._getMenuItems().getFirst();
if(_6c8){
_6c8.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6c9=this._lastFocused;
if((_6c9!=null)&&(!_6c9.isMenuContainer)){
_6c9.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6cb=this._getMenuItems();
var _6cc=null;
var next=null;
if(this._lastFocused){
_6cc=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6cb.getPreceding(_6cc);
break;
case KeyEventCodes.VK_DOWN:
next=_6cb.getFollowing(_6cc);
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
next=_6cb.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6cf=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6d0){
_6cf=_6d0.getChildBindingsByLocalName("menuitem");
_6cf.each(function(item){
list.add(item);
});
});
_6cf=this.getChildBindingsByLocalName("menuitem");
_6cf.each(function(item){
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
MenuBodyBinding.newInstance=function(_6d3){
var _6d4=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6d3);
return UserInterface.registerBinding(_6d4,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6d5){
switch(_6d5){
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
MenuGroupBinding.newInstance=function(_6d6){
var _6d7=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6d6);
return UserInterface.registerBinding(_6d7,MenuGroupBinding);
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
var _6d8=this.getProperty("image");
var _6d9=this.getProperty("image-hover");
var _6da=this.getProperty("image-active");
var _6db=this.getProperty("image-disabled");
if(!this.image&&_6d8){
this.image=_6d8;
}
if(!this.imageHover&&_6d9){
this.imageHover=_6d8;
}
if(!this.imageActive&&_6da){
this.imageActive=_6da;
}
if(!this.imageDisabled&&_6db){
this.imageDisabled=_6db;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6dc=this.getProperty("label");
var _6dd=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6df=this.getProperty("isdisabled");
var _6e0=this.getProperty("image");
var _6e1=this.getProperty("image-hover");
var _6e2=this.getProperty("image-active");
var _6e3=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6e4=this.getMenuPopupBinding();
if(_6e4){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
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
if(this.image||this.imageHover||this.imageActive||this.imageDisabled){
this.imageProfile=new ImageProfile(this);
}
}
if(this.imageProfile){
this.setImage(this.imageProfile.getDefaultImage());
}else{
this.setImage(null);
}
if(_6dc!=null){
this.setLabel(_6dc);
}
if(_6dd){
this.setToolTip(_6dd);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6df==true){
this.disable();
}
var _6e5=this.getProperty("oncommand");
if(_6e5){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6e5);
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
MenuItemBinding.prototype.setLabel=function(_6e8){
this.setProperty("label",_6e8);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6e8));
}
};
MenuItemBinding.prototype.setToolTip=function(_6e9){
this.setProperty("tooltip",_6e9);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6e9));
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
var _6eb=this.bindingDocument.createElement("div");
_6eb.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6eb.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6ec=this.labelBinding.bindingElement;
_6ec.insertBefore(_6eb,_6ec.firstChild);
_6eb.style.display="none";
this.shadowTree.checkBoxIndicator=_6eb;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6eb=this.bindingDocument.createElement("div");
_6eb.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6eb.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6ec=this.labelBinding.bindingElement;
_6ec.insertBefore(_6eb,_6ec.firstChild);
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
var _6ee=this.imageProfile.getDisabledImage();
if(_6ee){
this.setImage(_6ee);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6ee=this.imageProfile.getDefaultImage();
if(_6ee){
this.setImage(_6ee);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6f0=this.getMenuContainerBinding();
if(_6f0.isOpen()&&!_6f0.isOpen(this)){
_6f0._openElement.hide();
_6f0.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6f0=this.getMenuContainerBinding();
if(!_6f0.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6f2){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6f3=this.getMenuContainerBinding();
if(!_6f3||!_6f3.isOpen(this)||_6f2){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6f4){
this.setChecked(true,_6f4);
};
MenuItemBinding.prototype.uncheck=function(_6f5){
this.setChecked(false,_6f5);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6f6,_6f7){
this.setProperty("ischecked",_6f6);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6f6){
this.isChecked=_6f6;
this.shadowTree.checkBoxIndicator.style.display=_6f6?"block":"none";
if(!_6f7){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6f8){
var _6f9=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6f8);
UserInterface.registerBinding(_6f9,MenuItemBinding);
return UserInterface.getBinding(_6f9);
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
PopupBinding.handleBroadcast=function(_6fa,arg){
switch(_6fa){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6fe=PopupBinding.activeInstances.get(key);
var _6ff=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6fe);
if(!_6ff){
list.add(_6fe);
}
});
list.each(function(_700){
_700.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _702=PopupBinding.activeInstances.get(key);
_702.hide();
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
var _703=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _704=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_703){
this._bodyBinding=UserInterface.getBinding(_703);
}else{
if(_704){
this._bodyBinding=UserInterface.getBinding(_704);
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
var _705=this.getProperty("position");
this.position=_705?_705:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_706){
var _707=null;
if(this._bodyBinding){
this._bodyBinding.add(_706);
_707=_706;
}else{
_707=PopupBinding.superclass.add.call(this,_706);
}
return _707;
};
PopupBinding.prototype.addFirst=function(_708){
var _709=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_708);
_709=_708;
}else{
_709=PopupBinding.superclass.addFirst.call(this,_708);
}
return _709;
};
PopupBinding.prototype.handleAction=function(_70a){
PopupBinding.superclass.handleAction.call(this,_70a);
var _70b=_70a.target;
switch(_70a.type){
case Binding.ACTION_ATTACHED:
if(_70b instanceof MenuItemBinding){
this._count(true);
_70a.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_70b instanceof MenuItemBinding){
this._count(false);
_70a.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_70c){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_70c?1:-1);
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
PopupBinding.prototype.snapTo=function(_70d){
var _70e=this._getElementPosition(_70d);
switch(this.position){
case PopupBinding.POSITION_TOP:
_70e.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_70e.x+=_70d.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_70e.y+=_70d.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_70e.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_70d;
this.bindingElement.style.display="block";
this.setPosition(_70e.x,_70e.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_710){
this.bindingElement.style.display="block";
this.setPosition(_710.x,_710.y);
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
PopupBinding.prototype._getElementPosition=function(_715){
return _715.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_715):DOMUtil.getUniversalPosition(_715);
};
PopupBinding.prototype._getMousePosition=function(e){
var _717=DOMEvents.getTarget(e);
return _717.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_718){
var _719=this.bindingElement;
if(_718){
if(Client.hasTransitions){
_719.style.visibility="visible";
_719.style.opacity="1";
}else{
_719.style.visibility="visible";
}
}else{
_719.style.visibility="hidden";
_719.style.display="none";
if(Client.hasTransitions){
_719.style.opacity="0";
}
}
this.isVisible=_718;
};
PopupBinding.prototype._enableTab=function(_71a){
var self=this;
var _71c=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_71c.each(function(_71d){
_71d.bindingElement.tabIndex=_71a?0:-1;
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
var _725=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_725.y<0){
y=-_725.y;
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
PopupBinding.prototype.grabKeyboard=function(_727){
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
var _72d=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_72d=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _72d;
};
PopupBinding.prototype.clear=function(){
var _72e=this._bodyBinding;
if(_72e){
_72e.detachRecursive();
_72e.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_72f){
var _730=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_72f);
return UserInterface.registerBinding(_730,PopupBinding);
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
PopupBodyBinding.newInstance=function(_732){
var _733=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_732);
return UserInterface.registerBinding(_733,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_734){
return new Point(_734.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_735){
var _736=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_735);
return UserInterface.registerBinding(_736,MenuPopupBinding);
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
var _737=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_737){
this._body=UserInterface.getBinding(_737);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _738=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_738.hasNext()){
var _739=DialogBorderBinding.newInstance(this.bindingDocument);
_739.setType(_738.getNext());
this.add(_739);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _73a=this.getProperty("controls");
if(_73a){
var _73b=new List(_73a.split(" "));
while(_73b.hasNext()){
var type=_73b.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _73d=DialogControlBinding.newInstance(this.bindingDocument);
_73d.setControlType(type);
this._titlebar.addControl(_73d);
this.controlBindings[type]=_73d;
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
var _73e=this.getProperty("image");
var _73f=this.getProperty("label");
var _740=this.getProperty("draggable");
var _741=this.getProperty("resizable");
var _742=this.getProperty("modal");
if(_73e){
this.setImage(_73e);
}
if(_73f){
this.setLabel(_73f);
}
if(_740==false){
this.isDialogDraggable=false;
}
if(_741==false){
this.isPanelResizable=false;
}
if(_742==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_743){
this.isModal=_743;
};
DialogBinding.prototype.setLabel=function(_744){
this.setProperty("label",_744);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_744));
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
DialogBinding.prototype.handleAction=function(_746){
DialogBinding.superclass.handleAction.call(this,_746);
switch(_746.type){
case Binding.ACTION_DRAG:
var _747=_746.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_747.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_747.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_747;
_747.dragger.registerHandler(this);
}
break;
}
}
_746.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_746.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_748,arg){
DialogBinding.superclass.handleBroadcast.call(this,_748,arg);
switch(_748){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_74a){
DialogBinding.superclass.handleInvokedControl.call(this,_74a);
switch(_74a.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_74b){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_74b){
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
var _74d=self.bindingElement;
setTimeout(function(){
_74d.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_74e){
this.bindingElement.style.zIndex=new String(_74e);
};
DialogBinding.prototype.onDragStart=function(_74f){
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
DialogBinding.prototype.setResizable=function(_761){
if(this._isResizable!=_761){
if(_761){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_761;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _762=null;
var _763=this.bindingDocument.body.offsetWidth;
var _764=this.bindingDocument.body.offsetHeight;
_762={x:0.125*_763,y:0.125*_764,w:0.75*_763,h:0.5*_764};
return _762;
};
DialogBinding.prototype.centerOnScreen=function(){
var _765=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_765.w-dim.w),0.5*(_765.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _767=this;
var i=0;
function blink(){
if(i%2==0){
_767.detachClassName("active");
}else{
_767.attachClassName("active");
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
var _76b="";
while(list.hasNext()){
var type=list.getNext();
_76b+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_76b);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_76c){
var _76d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_76c);
return UserInterface.registerBinding(_76d,DialogBinding);
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
DialogHeadBinding.newInstance=function(_76e){
var _76f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_76e);
return UserInterface.registerBinding(_76f,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_772){
var _773=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_772);
return UserInterface.registerBinding(_773,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_774){
var _775=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_774);
return UserInterface.registerBinding(_775,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_776){
DialogSetBinding.superclass.handleAction.call(this,_776);
var _777=_776.target;
switch(_776.type){
case Binding.ACTION_MOVETOTOP:
if(_777 instanceof DialogBinding){
this._moveToTop(_777);
}
break;
case Binding.ACTION_MOVEDONTOP:
_776.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_778){
var _779=0;
var _77a=this.getChildBindingsByLocalName("dialog");
_77a.each(function(_77b){
var _77c=_77b.getZIndex();
_779=_77c>_779?_77c:_779;
});
_778.setZIndex(_779+2);
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
DialogBorderBinding.newInstance=function(_77e){
var _77f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_77e);
return UserInterface.registerBinding(_77f,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_780){
this._dialogBinding=_780;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_782){
DialogCoverBinding.superclass.handleAction.call(this,_782);
var _783=_782.target;
if(this._dialogBinding.isModal){
switch(_782.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_783==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_783.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_784,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_784,arg);
switch(_784){
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
var _787=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_787);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _788=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_788);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_789){
var _78a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_789);
return UserInterface.registerBinding(_78a,DialogCoverBinding);
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
var _78b=this.getProperty("image");
if(_78b){
this.setImage(_78b);
}
var _78c=this.getProperty("label");
if(_78c){
this.setLabel(_78c);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_78d){
if(this.isAttached){
this.labelBinding.setLabel(_78d);
}
this.setProperty("label",_78d);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_78f){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_78f);
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
DialogTitleBarBinding.newInstance=function(_790){
var _791=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_790);
return UserInterface.registerBinding(_791,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_792){
var _793=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_792);
return UserInterface.registerBinding(_793,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_794){
var _795=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_794);
return UserInterface.registerBinding(_795,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_796){
this.binding=_796;
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
var _799=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _79a=node.nodeName.toLowerCase();
switch(_79a){
case "script":
case "style":
case "textarea":
_799=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _799;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a1=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a1=false;
}
return _7a1;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7a2,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7a2,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7a6=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7a6+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7ac){
var _7ad="";
var _7ae="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7af="</span>";
var self=this;
function iterate(_7b1){
var _7b2=-1;
var _7b3=null;
self._map.each(function(key,exp){
var low=_7b1.toLowerCase();
var _7b7=low.search(exp);
if(_7b7>-1){
if(_7b2==-1){
_7b2=_7b7;
}
if(_7b7<=_7b2){
_7b2=_7b7;
_7b3=key;
}
}
});
if(_7b2>-1&&_7b3!=null){
var pre=_7b1.substring(0,_7b2);
var hit=_7b1.substring(_7b2,_7b2+_7b3.length);
var pst=_7b1.substring(_7b2+_7b3.length,_7b1.length);
_7ad+=pre+_7ae+hit+_7af;
iterate(pst);
}else{
_7ad+=_7b1;
}
}
iterate(_7ac);
return _7ad;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7bb){
var _7bc=new List(_7bb.getElementsByTagName("span"));
_7bc.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7bb.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7bf){
var _7c0=null;
if(_7bf.isAttached){
var doc=_7bf.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c0=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c0 instanceof SOAPFault){
_7c0=null;
}
}
}
return _7c0;
};
WindowBinding.highlightKeywords=function(_7c4,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7c4.isAttached){
var doc=_7c4.getContentDocument();
if(doc!=null){
var _7c7=WindowBinding._highlightcrawler;
_7c7.reset(doc.body);
if(list!=null){
_7c7.setKeys(list);
_7c7.crawl(doc.body);
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
var _7c8=WindowBinding.superclass.serialize.call(this);
if(_7c8){
_7c8.url=this.getURL();
}
return _7c8;
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
var _7ca=this.getContentWindow().DocumentManager;
if(_7ca!=null){
_7ca.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7cb){
WindowBinding.superclass.handleAction.call(this,_7cb);
var _7cc=_7cb.target;
switch(_7cb.type){
case RootBinding.ACTION_PHASE_3:
if(_7cc.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7cc);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7cb.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7cd){
if(!this.isFit||_7cd){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7ce){
if(this._pageBinding==null){
if(_7ce.bindingWindow==this.getContentWindow()){
this._pageBinding=_7ce;
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
WindowBinding.prototype._registerOnloadListener=function(_7cf){
var _7d0=this.shadowTree.iframe;
var _7d1=_7cf?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7d4=true;
if(Client.isExplorer){
_7d4=_7d0.readyState=="complete";
}
if(_7d4==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d1](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7d5){
var _7d6=_7d5?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7d6](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7da=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7da=url;
}
return _7da;
};
WindowBinding.prototype.reload=function(_7dc){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7dd=null;
if(this.shadowTree.iframe!=null){
_7dd=this.shadowTree.iframe;
}
return _7dd;
};
WindowBinding.prototype.getContentWindow=function(){
var _7de=null,_7df=this.getFrameElement();
if(_7df!==null){
try{
_7de=_7df.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7de;
};
WindowBinding.prototype.getContentDocument=function(){
var _7e0=null,win=this.getContentWindow();
if(win){
_7e0=win.document;
}
return _7e0;
};
WindowBinding.prototype.getRootBinding=function(){
var _7e2=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7e2=UserInterface.getBinding(doc.body);
}
return _7e2;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7e4){
this.bindingElement.style.height=_7e4+"px";
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
WindowBinding.prototype.handleCrawler=function(_7e5){
WindowBinding.superclass.handleCrawler.call(this,_7e5);
if(_7e5.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7e5.nextNode=root.bindingElement;
}else{
_7e5.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7ea){
var _7eb=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7ea);
var _7ec=UserInterface.registerBinding(_7eb,WindowBinding);
return _7ec;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f0){
_7f0.target.show();
_7f0.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f2){
_7f2.target.show();
_7f2.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7f4){
PreviewWindowBinding.superclass.handleAction.call(this,_7f4);
switch(_7f4.type){
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
var _7f5=null;
this._getRadioButtonBindings().each(function(_7f6){
if(_7f6.getProperty("ischecked")){
_7f5=_7f6;
return false;
}else{
return true;
}
});
if(_7f5){
this._checkedRadioBinding=_7f5;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7f7){
RadioGroupBinding.superclass.handleAction.call(this,_7f7);
var _7f8=_7f7.target;
switch(_7f7.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7f7.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7f8.isRadioButton&&!_7f8.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7f8);
}
this._checkedRadioBinding=_7f8;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7f7.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7f9,_7fa){
if(_7f9 instanceof RadioDataBinding){
_7f9=_7f9.getButton();
}
if(_7f9.isRadioButton){
switch(_7fa){
case true:
this._unCheckRadioBindingsExcept(_7f9);
this._checkedRadioBinding=_7f9;
_7f9.check(true);
break;
default:
_7f9.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7fb){
var _7fc=this._getRadioButtonBindings();
_7fc.each(function(_7fd){
if(_7fd.isChecked&&_7fd!=_7fb){
_7fd.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7fe=new Crawler();
var list=new List();
_7fe.addFilter(function(_800){
var _801=true;
var _802=UserInterface.getBinding(_800);
if(_802 instanceof RadioGroupBinding){
_801=NodeCrawler.SKIP_CHILDREN;
}else{
if(_802 instanceof ButtonBinding&&_802.isRadioButton){
list.add(_802);
}
}
return _801;
});
_7fe.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_803){
var _804=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_803);
return UserInterface.registerBinding(_804,RadioGroupBinding);
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
var _806=this.getProperty("regexrule");
if(_806!=null){
this.expression=new RegExp(_806);
}
var _807=this.getProperty("onbindingblur");
if(_807!=null){
this.onblur=function(){
Binding.evaluate(_807,this);
};
}
var _808=this.getProperty("onvaluechange");
if(_808!=null){
this.onValueChange=function(){
Binding.evaluate(_808,this);
};
}
if(this.error==null&&this.type!=null){
var _809=DataBinding.errors[this.type];
if(_809!=null){
this.error=_809;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _80a=this.getProperty("value");
if(_80a!=null){
this.setValue(String(_80a));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _80c=this.getProperty("isdisabled");
if(_80c==true){
this.setDisabled(true);
}
var _80d=this.getProperty("readonly");
if(_80d==true){
this.setReadOnly(true);
}
var _80e=this.getProperty("autoselect");
if(_80e==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _80f=Localization.currentLang();
if(_80f!=null){
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
var _810=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_810.type=this.isPassword==true?"password":"text";
_810.tabIndex=-1;
return _810;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_813){
if(_813){
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
DataInputBinding.prototype.handleBroadcast=function(_816,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_816,arg);
var self=this;
switch(_816){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _819=DOMEvents.getTarget(arg);
if(_819!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_81a){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_81a){
var self=this,_81c=this.bindingElement,_81d={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_81c,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_81c,DOMEvents.MOUSEUP,_81d);
}else{
this.select();
}
}
this.onfocus();
if(!_81a){
var _81e=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_81e);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _81f=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _820=_81f.createTextRange();
_820.moveStart("character",0);
_820.moveEnd("character",_81f.value.length);
_820.select();
}else{
_81f.setSelectionRange(0,_81f.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_821){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_821){
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
DataInputBinding.prototype.validate=function(_825){
if(_825==true||this._isValid){
var _826=this.isValid();
if(_826!=this._isValid){
this._isValid=_826;
if(!_826){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _827=null;
if(this._isInvalidBecauseRequired==true){
_827=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_827=DataBinding.warnings["minlength"];
_827=_827.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_827=DataBinding.warnings["maxlength"];
_827=_827.replace("${count}",String(this.maxlength));
}else{
_827=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_827!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_827);
}
}else{
this.setValue(_827);
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
var _828=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _829=this.getValue();
if(_829==""){
if(this.isRequired==true){
_828=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _82a=DataBinding.expressions[this.type];
if(!_82a.test(_829)){
_828=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_829)){
_828=false;
}
}
}
}
if(_828&&this.minlength!=null){
if(_829.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_828=false;
}
}
if(_828&&this.maxlength!=null){
if(_829.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_828=false;
}
}
return _828;
};
DataInputBinding.prototype.setDisabled=function(_82b){
if(_82b!=this.isDisabled){
if(_82b){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _82c=this.shadowTree.input;
if(_82b){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_82c,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_82c,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_82b;
this.shadowTree.input.unselectable=_82b?"on":"off";
}
this.isDisabled=_82b;
this.isFocusable=!_82b;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_82e){
if(_82e!=this.isReadOnly){
if(_82e){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_82e;
this.isReadOnly=_82e;
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
DataInputBinding.prototype.handleElement=function(_82f){
return true;
};
DataInputBinding.prototype.updateElement=function(_830){
var _831=_830.getAttribute("value");
var _832=_830.getAttribute("type");
var _833=_830.getAttribute("maxlength");
var _834=_830.getAttribute("minlength");
if(_831==null){
_831="";
}
var _835=this.bindingWindow.UpdateManager;
if(this.getValue()!=_831){
_835.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_831);
}
if(this.type!=_832){
_835.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_832;
}
if(this.maxlength!=_833){
_835.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_833;
}
if(this.minlength!=_834){
_835.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_834;
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
DataInputBinding.prototype.setValue=function(_836){
if(_836===null){
_836="";
}
if(_836!=this.getValue()){
this.setProperty("value",_836);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_836);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _837=null;
if(this.shadowTree.input!=null){
_837=this.shadowTree.input.value;
}else{
_837=this.getProperty("value");
}
return _837;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _839=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_839=Number(_839);
break;
}
return _839;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_83a){
var _83b=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_83a);
return UserInterface.registerBinding(_83b,DataInputBinding);
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
var _83c=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_83c!=null){
this.setValue(_83c.value);
_83c.parentNode.removeChild(_83c);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _83d=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_83d.tabIndex=-1;
return _83d;
};
TextBoxBinding.prototype.handleElement=function(_83e){
return true;
};
TextBoxBinding.prototype.updateElement=function(_83f){
var _840,area=_83f.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_840=DOMUtil.getTextContent(area);
}
if(_840==null){
_840="";
}
var _842=this.bindingWindow.UpdateManager;
if(this.getValue()!=_840){
_842.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_840);
}
var _843=_83f.getAttribute("type");
if(this.type!=_843){
_842.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_843;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_847){
var _848=this.bindingDocument.selection.createRange();
var _849=_848.text=="";
if(_849&&!_847){
_848.text="\t";
}else{
var text="";
var _84b=_848.text.length;
while((_848.moveStart("word",-1)&&_848.text.charAt(1)!="\n")){
}
_848.moveStart("character",1);
var _84c=0;
var i=0,line,_84f=_848.text.split("\n");
while((line=_84f[i++])!=null){
if(_847){
line=line.replace(/^(\s)/mg,"");
_84c++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_84f[i+1]?"\n":"");
}
_848.text=text;
_848.moveStart("character",-_84b);
if(_847){
_848.moveStart("character",2*_84f.length-2);
}
_848.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _850=this.bindingDocument.selection.createRange();
var _851=_850.duplicate();
while((_851.moveStart("word",-1)&&_851.text.indexOf("\n")==-1)){
}
_851.moveStart("character",1);
_850.text="\n"+_851.text.match(/^(\s)*/)[0]+"!";
_850.moveStart("character",-1);
_850.select();
_850.text="";
_850.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_852){
var _853;
var _854;
var oss;
var osy;
var i;
var fnd;
var _859=this._getSelectedText();
var el=this.shadowTree.input;
_853=el.scrollLeft;
_854=el.scrollTop;
if(!_859.match(/\n/)){
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
_859=this._getSelectedText();
if(_852){
ntext=_859.replace(/^(\s)/mg,"");
}else{
ntext=_859.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_859.length);
}
el.scrollLeft=_853;
el.scrollTop=_854;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _85b;
var _85c;
var oss;
var osy;
var el=this.shadowTree.input;
_85b=el.scrollLeft;
_85c=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_85b;
el.scrollTop=_85c;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _863=this.shadowTree.input.value;
var _864=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _863.substr(_864,end-_864);
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
var _866=this.getProperty("isdisabled");
if(this.isDisabled||_866){
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
var _868=this.getProperty("label");
var _869=this.getProperty("value");
var _86a=this.getProperty("width");
var _86b=this.getProperty("onchange");
var _86c=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_868!=null){
this.label=_868;
}
if(!this.value&&_869!=null){
this.value=_869;
}
if(!this.width&&_86a){
this.width=_86a;
}
if(_86c){
this.isRequired=true;
}
if(_86b){
this.onValueChange=function(){
Binding.evaluate(_86b,this);
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
var _86d=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_86d.name=this.getName();
_86d.value=this.getValue();
_86d.type="hidden";
if(this.hasCallBackID()){
_86d.id=this.getCallBackID();
}
this.shadowTree.input=_86d;
this.bindingElement.appendChild(_86d);
};
SelectorBinding.prototype.buildButton=function(){
var _86e=this.BUTTON_IMPLEMENTATION;
var _86f=this.add(_86e.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_86f.imageProfile=this.imageProfile;
}
if(this.width!=null){
_86f.setWidth(this.width);
}
this._buttonBinding=_86f;
this.shadowTree.button=_86f;
_86f.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _871=top.app.bindingMap.selectorpopupset;
var doc=_871.bindingDocument;
var _873=_871.add(PopupBinding.newInstance(doc));
var _874=_873.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_873;
this._menuBodyBinding=_874;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_873.attachClassName("selectorpopup");
_873.addActionListener(PopupBinding.ACTION_SHOW,this);
_873.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_873.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_873);
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
var _877=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_877).each(function(_878){
var _879=_878.getAttribute("label");
var _87a=_878.getAttribute("value");
var _87b=_878.getAttribute("selected");
var _87c=_878.getAttribute("image");
var _87d=_878.getAttribute("image-hover");
var _87e=_878.getAttribute("image-active");
var _87f=_878.getAttribute("image-disabled");
var _880=null;
if(_87c||_87d||_87e||_87f){
_880=new ImageProfile({image:_87c,imageHover:_87d,imageActive:_87e,imageDisabled:_87f});
}
list.add(new SelectorBindingSelection(_879?_879:null,_87a?_87a:null,_87b&&_87b=="true",_880));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _882=null;
while(list.hasNext()){
var _883=list.getNext();
var item=this.addSelection(_883);
if(_883.isSelected){
this.select(item,true);
}
if(!_882){
_882=item;
}
}
if(!this._selectedItemBinding){
this.select(_882,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_885,_886){
var _887=this.MENUITEM_IMPLEMENTATION;
var _888=this._menuBodyBinding;
var _889=_888.bindingDocument;
var _88a=_887.newInstance(_889);
_88a.imageProfile=_885.imageProfile;
_88a.setLabel(_885.label);
if(_885.tooltip!=null){
_88a.setToolTip(_885.tooltip);
}
_88a.selectionValue=_885.value;
_885.menuItemBinding=_88a;
if(_886){
_888.addFirst(_88a);
this.selections.addFirst(_885);
}else{
_888.add(_88a);
this.selections.add(_885);
}
this._isUpToDate=false;
return _88a;
};
SelectorBinding.prototype.addSelectionFirst=function(_88b){
return this.addSelection(_88b,true);
};
SelectorBinding.prototype.clear=function(_88c){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_88c&&this.defaultSelection!=null){
var _88d=this.addSelection(this.defaultSelection);
this.select(_88d,true);
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
SelectorBinding.prototype.setDisabled=function(_88e){
if(this.isAttached==true){
var _88f=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_88e?"none":"block";
_88f.setDisabled(_88e);
}
if(_88e){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_890){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_890);
}
};
SelectorBinding.prototype.handleAction=function(_891){
SelectorBinding.superclass.handleAction.call(this,_891);
switch(_891.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_891.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_891.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_891.target);
_891.consume();
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
_891.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_893){
this.select(_893);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _894=this._buttonBinding.bindingElement.offsetWidth+"px";
var _895=this._popupBinding.bindingElement;
_895.style.minWidth=_894;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _897=Client.isExplorer?e.keyCode:e.which;
if(_897==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _897=Client.isExplorer?e.keyCode:e.which;
if(_897>=32){
this._buttonBinding.check();
var _898=String.fromCharCode(_897);
this._pushSearchSelection(_898);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_899){
this._searchString+=_899.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_89a){
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
var _89b=this._menuBodyBinding;
if(_89b!=null){
var _89c=this.MENUITEM_IMPLEMENTATION;
var _89d=_89b.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _89f=list.getNext();
if(_89f.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_89f);
}
}
}
this._attachSelections();
var _8a0=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8a1=_89b.getDescendantBindingsByType(_89c);
if(_8a1.hasEntries()){
while(_8a1.hasNext()){
var _8a2=_8a1.getNext();
var _8a3=_8a2.labelBinding;
if(_8a3!=null&&_8a3.shadowTree!=null&&_8a3.shadowTree.labelText!=null){
_8a3.shadowTree.labelText.innerHTML=_8a3.shadowTree.labelText.innerHTML.replace(_8a0,"<b>$&</b>");
}
}
_8a1.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8a3=LabelBinding.newInstance(_89d);
_8a3.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_89b.add(_8a3);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _89f=list.getNext();
var item=this.addSelection(_89f);
if(this._selectionValue==_89f.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8a5,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8a5,arg);
switch(_8a5){
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
SelectorBinding.prototype.select=function(_8a8,_8a9){
var _8aa=false;
if(_8a8!=this._selectedItemBinding){
this._selectedItemBinding=_8a8;
_8aa=true;
var _8ab=this._buttonBinding;
this._selectionValue=_8a8.selectionValue;
this._selectionLabel=_8a8.getLabel();
_8ab.setLabel(_8a8.getLabel());
if(_8a8.imageProfile!=null){
_8ab.imageProfile=_8a8.imageProfile;
}
if(_8ab.imageProfile!=null){
_8ab.setImage(this.isDisabled==true?_8ab.imageProfile.getDisabledImage():_8ab.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8a9){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8a9)){
this.validate();
}
}
return _8aa;
};
SelectorBinding.prototype._relate=function(){
var _8ac=this.getProperty("relate");
if(_8ac){
var _8ad=this.bindingDocument.getElementById(_8ac);
if(_8ad){
var _8ae=UserInterface.getBinding(_8ad);
if(_8ae){
if(this.isChecked){
_8ae.show();
}else{
_8ae.hide();
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
SelectorBinding.prototype.selectByValue=function(_8af,_8b0){
var _8b1=false;
var _8b2=this._menuBodyBinding;
var _8b3=_8b2.getDescendantElementsByLocalName("menuitem");
while(_8b3.hasNext()){
var _8b4=UserInterface.getBinding(_8b3.getNext());
if(_8b4.selectionValue==_8af){
_8b1=this.select(_8b4,_8b0);
break;
}
}
return _8b1;
};
SelectorBinding.prototype.getValue=function(){
var _8b5=this._selectionValue;
if(_8b5!=null){
_8b5=String(_8b5);
}
return _8b5;
};
SelectorBinding.prototype.setValue=function(_8b6){
this.selectByValue(String(_8b6),true);
};
SelectorBinding.prototype.getResult=function(){
var _8b7=this._selectionValue;
if(_8b7=="null"){
_8b7=null;
}
if(_8b7){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8b7=Number(_8b7);
break;
}
}
return _8b7;
};
SelectorBinding.prototype.setResult=function(_8b8){
this.selectByValue(_8b8,true);
};
SelectorBinding.prototype.validate=function(){
var _8b9=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8ba=this.getValue();
if(_8ba==this.defaultSelection.value){
_8b9=false;
}
if(_8b9!=this._isValid){
if(_8b9){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8b9;
}
return _8b9;
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
var _8bb=this._popupBinding;
if(!this._isUpToDate){
_8bb.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8bc,_8bd){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8bc));
return true;
};
SelectorBinding.newInstance=function(_8be){
var _8bf=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8be);
return UserInterface.registerBinding(_8bf,SelectorBinding);
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
var _8c2=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8c2){
this.onValueChange=function(){
Binding.evaluate(_8c2,this);
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
SimpleSelectorBinding.prototype.focus=function(_8c5){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8c5){
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
SimpleSelectorBinding.prototype._hack=function(_8c6){
if(Client.isExplorer){
this._select.style.width=_8c6?"auto":this._cachewidth+"px";
if(_8c6){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8c7=true;
if(this.isRequired){
if(this.getValue()==null){
_8c7=false;
}
}
if(_8c7!=this._isValid){
if(_8c7){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8c8=this._select;
var _8c9=_8c8.options[_8c8.selectedIndex];
var text=DOMUtil.getTextContent(_8c9);
_8c8.blur();
_8c8.style.color="#A40000";
_8c8.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8c9,DataBinding.warnings["required"]);
}
_8c8.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8c9,text);
}
};
}
this._isValid=_8c7;
}
return _8c7;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8cb=null;
var _8cc=this._select;
var _8cd=_8cc.options[_8cc.selectedIndex];
var _8ce=true;
if(Client.isExplorer){
var html=_8cd.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8ce=false;
}
}
if(_8ce){
_8cb=_8cd.getAttribute("value");
}
return _8cb;
};
SimpleSelectorBinding.prototype.setValue=function(_8d0){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8d1){
this.setValue(_8d1);
};
SimpleSelectorBinding.newInstance=function(_8d2){
var _8d3=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8d2);
return UserInterface.registerBinding(_8d3,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8d4,_8d5,_8d6,_8d7,_8d8){
this._init(_8d4,_8d5,_8d6,_8d7,_8d8);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8d9,_8da,_8db,_8dc,_8dd){
if(_8d9!=null){
this.label=String(_8d9);
}
if(_8da!=null){
this.value=String(_8da);
}
if(_8dc!=null){
this.imageProfile=_8dc;
}
if(_8dd!=null){
this.tooltip=_8dd;
}
this.isSelected=_8db?true:false;
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
var _8de=this.getProperty("image");
if(_8de){
this.setImage(_8de);
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
var _8e1=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8e1.popupBindingTargetElement=this.shadowTree.input;
_8e1.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8e1.attach();
var self=this;
_8e1.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8e1;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8e4=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8e4).each(function(_8e5){
if(_8e5.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8e6=_8e5.getAttribute("value");
var _8e7=_8e5.getAttribute("selected");
var _8e8=_8e5.getAttribute("tooltip");
list.add({value:_8e6?_8e6:null,toolTip:_8e8?_8e8:null,isSelected:(_8e7&&_8e7=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8ea=this._menuBodyBinding;
var _8eb=_8ea.bindingDocument;
while(_8ea.bindingElement.hasChildNodes()){
var node=_8ea.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8ea.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8ed=this.getProperty("emptyentrylabel");
if(_8ed){
var _8ee=MenuItemBinding.newInstance(_8eb);
_8ee.setLabel(_8ed);
_8ee.selectionValue="";
_8ea.add(_8ee);
}
while(list.hasNext()){
var _8ef=list.getNext();
var _8ee=MenuItemBinding.newInstance(_8eb);
_8ee.setLabel(_8ef.label?_8ef.label:_8ef.value);
_8ee.selectionValue=_8ef.value;
if(_8ef.image){
_8ee.setImage(_8ef.image);
}
if(_8ef.toolTip){
_8ee.setToolTip(_8ef.toolTip);
}
if(_8ef.isSelected){
this.select(_8ee,true);
}
_8ea.add(_8ee);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8f0){
this.select(_8f0);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8f1,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8f1,arg);
switch(_8f1){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8f1,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8f3){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8f3);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8f4){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8f4);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8f5=this.bindingElement.offsetWidth+"px";
var _8f6=this._popupBinding.bindingElement;
_8f6.style.minWidth=_8f5;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8f7=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8f8=this.getValue();
var _8f9=null;
_8f7.each(function(item){
if(item.getLabel()==_8f8){
_8f9=item;
}
});
if(_8f9){
_8f9.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8fc){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8fc){
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
DataInputSelectorBinding.prototype.setValue=function(_8fd){
var _8fe=this.isReadOnly;
var _8ff=null;
if(_8fd!=null&&_8fd!=""){
var _900=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_900.hasNext()){
var item=_900.getNext();
if(item.selectionValue==_8fd){
_8ff=item.getLabel();
break;
}
}
}
if(_8ff!=null){
this.value=_8fd;
this.shadowTree.input.value=_8ff;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_8fd);
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
var _903="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_903);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_903);
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
var _905=ToolBarButtonBinding.newInstance(this.bindingDocument);
_905.setImage("${icon:popup}");
this.addFirst(_905);
_905.attach();
var self=this;
_905.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _907=self.getProperty("handle");
var _908=ViewDefinition.clone(_907,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_908 instanceof DialogViewDefinition){
_908.handler={handleDialogResponse:function(_909,_90a){
self._isButtonClicked=false;
if(_909==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _90b=_90a.getFirst();
self.setValue(_90b);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_908.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_908);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_905.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_905;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _90d=this._dialogButtonBinding;
if(_90d!=null){
_90d.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _90f=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_90f=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _90f;
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
var _912=ToolBarButtonBinding.newInstance(this.bindingDocument);
_912.setImage("${icon:editor-sourceview}");
_912.bindingElement.style.left="-24px";
_912.bindingElement.style.width="24px";
this.addFirst(_912);
_912.attach();
_912.hide();
var self=this;
_912.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_912;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_913){
UrlInputDialogBinding.superclass.setValue.call(this,_913);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_913);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _914=TreeService.GetCompositeUrlLabel(_913);
if(_914!=_913){
this.setLabel(_914);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_915){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_915;
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
var _916=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _917=this.getProperty("image");
if(_917!=null){
_916.setImage(_917);
}else{
_916.setImage("${icon:popup}");
}
this.addFirst(_916);
_916.attach();
var self=this;
_916.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_916;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _919=this._dialogButtonBinding;
if(_919!=null){
_919.oncommand();
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
var _91a=this.getProperty("label");
var _91b=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_91a!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_91a+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_91a);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_91b!=null){
this._buttonBinding.setToolTip(_91b);
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
DataDialogBinding.prototype.handleAction=function(_91d){
DataDialogBinding.superclass.handleAction.call(this,_91d);
var _91e=_91d.target;
var self=this;
switch(_91d.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_920,_921){
if(_920==Dialog.RESPONSE_ACCEPT){
if(_921 instanceof DataBindingMap){
self._map=_921;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_91e==this._buttonBinding){
_91d.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_922,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_922,arg);
switch(_922){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _925=this.getProperty("handle");
var url=this.getURL();
var _927=null;
if(_925!=null||def!=null){
if(def!=null){
_927=def;
}else{
_927=ViewDefinitions[_925];
}
if(_927 instanceof DialogViewDefinition){
_927.handler=this._handler;
if(this._map!=null){
_927.argument=this._map;
}
StageBinding.presentViewDefinition(_927);
}
}else{
if(url!=null){
_927=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_927!=null){
this._dialogViewHandle=_927.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_928){
this.setProperty("label",_928);
if(this.isAttached){
this._buttonBinding.setLabel(_928+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_929){
this.setProperty("image",_929);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_929);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_92a){
this.setProperty("tooltip",_92a);
if(this.isAttached){
this._buttonBinding.setToolTip(_92a);
}
};
DataDialogBinding.prototype.setHandle=function(_92b){
this.setProperty("handle",_92b);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_92d){
this._handler=_92d;
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
DataDialogBinding.newInstance=function(_92f){
var _930=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_92f);
return UserInterface.registerBinding(_930,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_932,_933){
if(_932==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_933);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_934){
_934=new String(_934);
this.dirty();
this.setValue(encodeURIComponent(_934));
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
var _938=this.getValue();
if(_938==null){
_938="";
}
this.shadowTree.dotnetinput.value=_938;
};
PostBackDataDialogBinding.prototype.setValue=function(_939){
this.setProperty("value",_939);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_93a){
};
PostBackDataDialogBinding.newInstance=function(_93b){
var _93c=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_93b);
return UserInterface.registerBinding(_93c,PostBackDataDialogBinding);
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
var _93d=this.getProperty("dialoglabel");
var _93e=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _940=this.getProperty("handle");
var _941=this.getProperty("selectedtoken");
if(_940!=null){
var def=ViewDefinition.clone(_940,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_93d!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_93d;
}
if(_93e!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_93e;
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
if(_941!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_941;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_943){
var _944=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_943);
return UserInterface.registerBinding(_944,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_946){
self._datathing.setValue(_946);
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
var _949=self.getValue();
if(_949==""||_949==null){
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
var _94a=this.getProperty("value");
var _94b=this.getProperty("selectorlabel");
if(_94b==null){
_94b=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_94a==null));
list.add(new SelectorBindingSelection(_94b+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_94a!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _94a=this.getValue();
if(_94a==""||_94a==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_94d){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_94d);
switch(_94d.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_94d.target==this._datathing){
var _94e=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_94e){
self._selector.setLabel(_94e);
}
},500);
_94d.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_950){
this.setProperty("label",_950);
if(this._selector!=null){
this._selector.setLabel(_950);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_951){
this._datathing.setValue(_951);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_952,_953){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_952,_953)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_954){
this._buttonBinding.setLabel(_954);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_955){
this._buttonBinding.setToolTip(_955);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_956){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_956);
switch(_956.type){
case MenuItemBinding.ACTION_COMMAND:
var _957=_956.target;
var _958=this.master;
if(_957.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_957.getLabel());
setTimeout(function(){
_958.action();
},0);
}else{
this.master.setValue("");
}
_958.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_959){
var _95a=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_959);
return UserInterface.registerBinding(_95a,NullPostBackDataDialogSelectorBinding);
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
var _95b=this._dataDialogBinding;
if(_95b!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_95b.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _95c=this.getProperty("editable");
var _95d=this.getProperty("selectable");
var _95e=this.getProperty("display");
if(_95c!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_95d){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_95e){
this._display=_95e;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _95f=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_95f.selections=this.selections;
this.add(_95f);
_95f.attach();
this._dataDialogBinding=_95f;
this.shadowTree.datadialog=_95f;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _961=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _962=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_961=_962.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_961=_962.isSelected!=true;
break;
}
if(_961){
this.shadowTree.box.appendChild(this._getElementForSelection(_962));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_964){
var box=this.shadowTree.box;
var _966=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _967=list.getNext();
if(_964){
_967.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_966=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_966=_967.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_966=_967.isSelected!=true;
break;
}
}
if(_966){
var _968=this._getElementForSelection(_967);
box.insertBefore(_968,box.firstChild);
CSSUtil.attachClassName(_968,"selected");
this._selectionMap.set(_967.value,_968);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_969){
var _96a=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_96a.appendChild(this.bindingDocument.createTextNode(_969.label));
_96a.setAttribute("label",_969.label);
_96a.setAttribute("value",_969.value);
return _96a;
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
var _96c=DOMEvents.getTarget(e);
var _96d=DOMUtil.getLocalName(_96c);
if(_96d=="div"){
this._handleMouseDown(_96c);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_96e){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _96f=this._getElements();
var _970=_96e.getAttribute("value");
var _971=this._lastSelectedElement.getAttribute("value");
var _972=false;
while(_96f.hasNext()){
var el=_96f.getNext();
switch(el.getAttribute("value")){
case _970:
case _971:
_972=!_972;
break;
}
if(_972){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_96e);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_96e)){
this._unhilite(_96e);
}else{
this._hilite(_96e);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_96e){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_96e;
};
MultiSelectorBinding.prototype._hilite=function(_976){
var _977=_976.getAttribute("value");
if(!this._selectionMap.has(_977)){
CSSUtil.attachClassName(_976,"selected");
this._selectionMap.set(_977,_976);
}
};
MultiSelectorBinding.prototype._unhilite=function(_978){
var _979=_978.getAttribute("value");
if(this._selectionMap.has(_979)){
CSSUtil.detachClassName(_978,"selected");
this._selectionMap.del(_979);
}
};
MultiSelectorBinding.prototype._isHilited=function(_97a){
return CSSUtil.hasClassName(_97a,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_97b){
MultiSelectorBinding.superclass.handleAction.call(this,_97b);
var _97c=_97b.target;
switch(_97b.type){
case DataDialogBinding.ACTION_COMMAND:
if(_97c==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_97b.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_97c.result);
this.dirty();
_97c.result=null;
_97b.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _97d=null;
if(this.isSelectable){
_97d=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_97f){
if(self._isHilited(_97f)){
_97f.parentNode.removeChild(_97f);
_97d.add(new SelectorBindingSelection(_97f.getAttribute("label"),_97f.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _97d;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _981=this._getElements();
if(!isUp){
_981.reverse();
}
var _982=true;
while(_982&&_981.hasNext()){
var _983=_981.getNext();
if(this._isHilited(_983)){
switch(isUp){
case true:
if(_983.previousSibling){
_983.parentNode.insertBefore(_983,_983.previousSibling);
}else{
_982=false;
}
break;
case false:
if(_983.nextSibling){
_983.parentNode.insertBefore(_983,_983.nextSibling.nextSibling);
}else{
_982=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _984=new List();
var _985=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_987){
var _988=new SelectorBindingSelection(_987.getAttribute("label"),_987.getAttribute("value"),_985);
_988.isHighlighted=self._isHilited(_987);
_984.add(_988);
});
return _984;
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
var _989=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_989.hasEntries()){
_989.each(function(_98a){
_98a.parentNode.removeChild(_98a);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _98b=this.selections.getNext();
if(_98b.isSelected){
var _98c=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_98c.name=this._name;
_98c.value=_98b.value;
this.bindingElement.appendChild(_98c);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_98d){
alert(_98d);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_98e){
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
var _98f={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _990=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_990.handler=this._handler;
_990.argument=_98f;
StageBinding.presentViewDefinition(_990);
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
var _991={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _993={handleDialogResponse:function(_994,_995){
if(_994==Dialog.RESPONSE_ACCEPT){
self.result=_995;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _996=ViewDefinitions[this._dialogViewHandle];
_996.handler=_993;
_996.argument=_991;
StageBinding.presentViewDefinition(_996);
};
MultiSelectorDataDialogBinding.newInstance=function(_997){
var _998=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_997);
return UserInterface.registerBinding(_998,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_999){
var id=_999.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _99b=_999.bindingDocument.getElementById(id);
if(_99b!=null){
var _99c=UserInterface.getBinding(_99b);
_99c.setResult(true);
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
var _99e=this.bindingDocument.getElementById(id);
if(_99e!=null){
var _99f=UserInterface.getBinding(_99e);
if(_99f&&!_99f.isAttached){
_99f.isLazy=true;
}else{
_99e.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9a0){
this._isLazy=_9a0;
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
var _9a2=this.getProperty("stateprovider");
var _9a3=this.getProperty("handle");
if(_9a2!=null&&_9a3!=null){
url=url.replace("${stateprovider}",_9a2).replace("${handle}",_9a3);
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
EditorDataBinding.prototype._onPageInitialize=function(_9a4){
EditorDataBinding.superclass._onPageInitialize.call(this,_9a4);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9a5){
EditorDataBinding.superclass.handleAction.call(this,_9a5);
switch(_9a5.type){
case Binding.ACTION_DIRTY:
if(_9a5.target!=this){
if(!this.isDirty){
this.dirty();
}
_9a5.consume();
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
EditorDataBinding.prototype.setValue=function(_9a6){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9a7){
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
var _9ac=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9ac=fake.getValue()!="";
}
if(!_9ac&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9ac&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9ac;
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
var _9b0=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9b0!=null){
_9b0.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9b1){
_9b1=_9b1!=null?_9b1:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9b1;
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
var _9b2=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9b3=_9b2.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9b3;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9b3=_9b3.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9b3;
}
var self=this;
var _9b5=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9b5.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9b8=this.getProperty("label");
if(_9b8){
this.setLabel(_9b8);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9b9){
this.setProperty("label",_9b9);
if(this.shadowTree.labelBinding==null){
var _9ba=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9ba.attachClassName("fieldgrouplabel");
cell.insertBefore(_9ba.bindingElement,cell.getElementsByTagName("div").item(1));
_9ba.attach();
this.shadowTree.labelBinding=_9ba;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9b9));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9bc){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9bc.bindingElement);
return _9bc;
};
FieldGroupBinding.prototype.addFirst=function(_9bd){
var _9be=this.shadowTree[FieldGroupBinding.CENTER];
_9be.insertBefore(_9bd.bindingElement,_9be.firstChild);
return _9bd;
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
var _9bf=this.getProperty("relation");
if(_9bf!=null){
this.bindingRelation=_9bf;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9c0,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9c0,arg);
switch(_9c0){
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
FieldBinding.newInstance=function(_9c2){
var _9c3=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9c2);
return UserInterface.registerBinding(_9c3,FieldBinding);
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
var _9c4=this.getDescendantBindingByLocalName("fieldgroup");
if(_9c4!=null){
_9c4.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9c5=true;
var _9c6=this.getDescendantBindingsByLocalName("*");
while(_9c6.hasNext()){
var _9c7=_9c6.getNext();
if(Interfaces.isImplemented(IData,_9c7)){
var _9c8=_9c7.validate();
if(_9c5&&!_9c8){
_9c5=false;
}
}
}
return _9c5;
};
FieldsBinding.prototype.handleAction=function(_9c9){
FieldsBinding.superclass.handleAction.call(this,_9c9);
var _9ca=_9c9.target;
if(_9ca!=this){
switch(_9c9.type){
case Binding.ACTION_INVALID:
var _9cb=DataBinding.getAssociatedLabel(_9ca);
if(_9cb){
this._invalidFieldLabels.set(_9ca.key,_9cb);
}
if(_9ca.error){
if(!_9ca.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9ca.error},_9ca);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9c9.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9ca.key)){
this._invalidFieldLabels.del(_9ca.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9c9.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9cc=null;
if(this._invalidFieldLabels.hasEntries()){
_9cc=this._invalidFieldLabels.toList();
}
return _9cc;
};
FieldsBinding.newInstance=function(_9cd){
var _9ce=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9cd);
return UserInterface.registerBinding(_9ce,FieldsBinding);
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
var _9cf=this.getProperty("image");
if(_9cf){
this.setImage(_9cf);
}
var _9d0=this.getProperty("tooltip");
if(_9d0){
this.setToolTip(_9d0);
}
var _9d1=this.getProperty("label");
if(_9d1){
this.setLabel(_9d1);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9d3=this.getAncestorBindingByLocalName("field");
if(_9d3){
var _9d4=true;
_9d3.getDescendantBindingsByLocalName("*").each(function(_9d5){
if(Interfaces.isImplemented(IData,_9d5)){
_9d5.focus();
_9d4=false;
}
return _9d4;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9d6){
this.setProperty("label",_9d6);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9d6);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9d7=this.getProperty("label");
if(!_9d7){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9d7=node.data;
}
}
return _9d7;
};
FieldDescBinding.prototype.setImage=function(_9d9){
this.setProperty("image",_9d9);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9da){
this.setProperty("tooltip",_9da);
if(this.isAttached){
this.bindingElement.title=_9da;
}
};
FieldDescBinding.newInstance=function(_9db){
var _9dc=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9db);
return UserInterface.registerBinding(_9dc,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9dd){
var _9de=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9dd);
return UserInterface.registerBinding(_9de,FieldDataBinding);
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
var _9df=this._fieldHelpPopupBinding;
if(_9df){
_9df.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9e0=app.bindingMap.fieldhelpopupset;
var doc=_9e0.bindingDocument;
var _9e2=_9e0.add(PopupBinding.newInstance(doc));
var _9e3=_9e2.add(PopupBodyBinding.newInstance(doc));
_9e2.position=PopupBinding.POSITION_RIGHT;
_9e2.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9e3.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9e4=this.getProperty("label");
if(_9e4){
_9e3.bindingElement.innerHTML=Resolver.resolve(_9e4);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9e2;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9e5=this.getAncestorBindingByLocalName("field");
if(_9e5){
_9e5.attachClassName("fieldhelp");
var _9e6=ClickButtonBinding.newInstance(this.bindingDocument);
_9e6.attachClassName("fieldhelp");
_9e6.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9e6);
_9e6.attach();
var self=this;
_9e6.oncommand=function(){
self.attachPopupBinding();
};
_9e6.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9e6;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9e8=this._fieldHelpPopupBinding;
if(_9e8&&!_9e8.isAttached){
_9e8.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9ea){
RadioDataGroupBinding.superclass.handleAction.call(this,_9ea);
switch(_9ea.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9ec,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9ec,arg);
switch(_9ec){
case BroadcastMessages.KEY_ARROW:
var _9ee=null;
var next=null;
var _9f0=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9f0=this.getChildBindingsByLocalName("radio");
while(!_9ee&&_9f0.hasNext()){
var _9f1=_9f0.getNext();
if(_9f1.getProperty("ischecked")){
_9ee=_9f1;
}
}
break;
}
if(_9ee){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9f0.getFollowing(_9ee);
while(next!=null&&next.isDisabled){
next=_9f0.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9f0.getPreceding(_9ee);
while(next!=null&&next.isDisabled){
next=_9f0.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9f2){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9f2){
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
var _9f3=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9f3.type="hidden";
_9f3.name=this._name;
this.bindingElement.appendChild(_9f3);
this.shadowTree.input=_9f3;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9f4=null;
var _9f5=this.getChildBindingsByLocalName("radio");
while(!_9f4&&_9f5.hasNext()){
var _9f6=_9f5.getNext();
if(_9f6.isChecked){
_9f4=_9f6.getProperty("value");
}
}
return _9f4;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9f7){
};
RadioDataGroupBinding.prototype.setResult=function(_9f8){
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
this.propertyMethodMap["checked"]=function(_9f9){
if(_9f9!=this.isChecked){
this.setChecked(_9f9,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9fa=this.getProperty("ischecked");
if(_9fa!=this.isChecked){
this.setChecked(_9fa,true);
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
var _9fb=this.getProperty("relate");
var _9fc=this.getProperty("oncommand");
var _9fd=this.getProperty("isdisabled");
if(_9fb){
this.bindingRelate=_9fb;
this.relate();
}
if(_9fc){
this.oncommand=function(){
Binding.evaluate(_9fc,this);
};
}
if(_9fd==true){
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
var _9ff=this.getCallBackID();
this._buttonBinding.check=function(_a00){
RadioButtonBinding.prototype.check.call(this,_a00);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a01){
RadioButtonBinding.prototype.uncheck.call(this,_a01);
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
RadioDataBinding.prototype.setChecked=function(_a02,_a03){
this._buttonBinding.setChecked(_a02,_a03);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a02);
};
RadioDataBinding.prototype.check=function(_a04){
this.setChecked(true,_a04);
};
RadioDataBinding.prototype.uncheck=function(_a05){
this.setChecked(false,_a05);
};
RadioDataBinding.prototype.setDisabled=function(_a06){
if(_a06!=this.isDisabled){
this.isDisabled=_a06;
this._buttonBinding.setDisabled(_a06);
if(_a06){
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
var _a08=DOMEvents.getTarget(e);
switch(_a08){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a09=this.getProperty("label");
if(_a09){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a09)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a0a){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a0a;
}
this.setProperty("label",_a0a);
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
this.propertyMethodMap["checked"]=function(_a0b){
if(_a0b!=this.isChecked){
this.setChecked(_a0b,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a0c=this.getProperty("ischecked");
if(_a0c!=this.isChecked){
this.setChecked(_a0c,true);
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
var _a0e=DOMEvents.getTarget(e);
switch(_a0e){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a0f,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a0f,arg);
switch(_a0f){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a12){
_a12.consume();
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
var _a14=this.getCallBackID();
this._buttonBinding.check=function(_a15){
ButtonBinding.prototype.check.call(this,_a15);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a15){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a16){
ButtonBinding.prototype.uncheck.call(this,_a16);
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
if(_a14!=null){
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
var _a17=true;
var _a18=this.bindingElement.parentNode;
if(_a18){
var _a19=UserInterface.getBinding(_a18);
if(_a19&&_a19 instanceof CheckBoxGroupBinding){
if(_a19.isRequired){
if(_a19.isValid){
_a17=_a19.validate();
}else{
_a17=false;
}
}
}
}
return _a17;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a1a=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a1a.type="hidden";
_a1a.name=this._name;
_a1a.style.display="none";
this.bindingElement.appendChild(_a1a);
this.shadowTree.input=_a1a;
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
var _a1b=null;
var _a1c=this.getProperty("value");
if(this.isChecked){
_a1b=_a1c?_a1c:"on";
}
return _a1b;
};
CheckBoxBinding.prototype.setValue=function(_a1d){
if(_a1d==this.getValue()||_a1d=="on"){
this.check(true);
}else{
if(_a1d!="on"){
this.setPropety("value",_a1d);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a1e=false;
if(this.isChecked){
_a1e=this._result!=null?this._result:true;
}
return _a1e;
};
CheckBoxBinding.prototype.setResult=function(_a1f){
if(typeof _a1f=="boolean"){
this.setChecked(_a1f,true);
}else{
this._result=_a1f;
}
};
CheckBoxBinding.newInstance=function(_a20){
var _a21=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a20);
return UserInterface.registerBinding(_a21,CheckBoxBinding);
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
var _a22=true;
if(this.isRequired){
var _a23=this.getDescendantBindingsByLocalName("checkbox");
if(_a23.hasEntries()){
_a22=false;
while(_a23.hasNext()&&!_a22){
if(_a23.getNext().isChecked){
_a22=true;
}
}
}
if(_a22==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a22;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a24){
if(_a24){
if(!this._labelBinding){
var _a25=LabelBinding.newInstance(this.bindingDocument);
_a25.attachClassName("invalid");
_a25.setImage("${icon:error}");
_a25.setLabel("Selection required");
this._labelBinding=this.addFirst(_a25);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a26){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a26);
switch(_a26.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a27){
var _a28=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a27);
return UserInterface.registerBinding(_a28,CheckBoxGroupBinding);
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
var _a29=DialogControlBinding.newInstance(this.bindingDocument);
_a29.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a29);
this._controlGroupBinding.attachRecursive();
var _a2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a2a);
var _a2b=this.getLabel();
if(_a2b!=null){
this.setLabel(_a2b);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a2c=this._snapTargetBinding;
if(Binding.exists(_a2c)==true){
_a2c.removeActionListener(Binding.ACTION_BLURRED,this);
_a2c.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a2d){
if(Interfaces.isImplemented(IData,_a2d)){
this._snapTargetBinding=_a2d;
var _a2e=_a2d.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a2e&&_a2e.isConsumed){
this._environmentBinding=_a2e.listener;
}
if(this._environmentBinding){
_a2d.addActionListener(Binding.ACTION_BLURRED,this);
_a2d.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a2d)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a2d.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a30=this._snapTargetBinding;
var _a31=this._environmentBinding;
var root=UserInterface.getBinding(_a30.bindingDocument.body);
if(Binding.exists(_a30)&&Binding.exists(_a31)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a30.isAttached&&_a31.isAttached){
var _a33=_a30.boxObject.getUniversalPosition();
var _a34=_a31.boxObject.getUniversalPosition();
_a34.y+=_a31.bindingElement.scrollTop;
_a34.x+=_a31.bindingElement.scrollLeft;
var tDim=_a30.boxObject.getDimension();
var eDim=_a31.boxObject.getDimension();
var _a37=false;
if(_a33.y+tDim.h<_a34.y){
_a37=true;
}else{
if(_a33.x+tDim.w<_a34.x){
_a37=true;
}else{
if(_a33.y>_a34.y+eDim.h){
_a37=true;
}else{
if(_a33.x>_a34.x+eDim.w){
_a37=true;
}
}
}
}
if(!_a37){
this._setComputedPosition(_a33,_a34,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a38,_a39,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a3e=_a38;
var _a3f=false;
if(_a38.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a3f=true;
}else{
if(_a38.x+tDim.w>=_a39.x+eDim.w){
_a3f=true;
}
}
if(_a3f){
_a3e.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a3e.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a3e.y-=(bDim.h);
_a3e.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a3e);
};
BalloonBinding.prototype.handleBroadcast=function(_a40,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a40,arg);
switch(_a40){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a42){
var _a43=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a42){
_a43=true;
}
}
return _a43;
};
BalloonBinding.prototype._setPosition=function(_a45){
var _a46=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a46=true;
}
}
if(!_a46){
this.bindingElement.style.left=_a45.x+"px";
this.bindingElement.style.top=_a45.y+"px";
this._point=_a45;
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
BalloonBinding.prototype.handleAction=function(_a48){
BalloonBinding.superclass.handleAction.call(this,_a48);
var _a49=_a48.target;
switch(_a48.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a48.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a49==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a49)){
self.dispose();
}else{
if(_a49.validate()){
var _a4b=true;
if(_a48.type==Binding.ACTION_BLURRED){
var root=_a49.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a4b=false;
}
}
if(_a4b){
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
BalloonBinding.prototype.setLabel=function(_a4e){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a4f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a4e);
_a4f.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a4f);
}
this.setProperty("label",_a4e);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a51){
var _a52=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a51);
var _a53=UserInterface.registerBinding(_a52,BalloonBinding);
_a53.hide();
return _a53;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a54,_a55){
if(Interfaces.isImplemented(IData,_a55)==true){
var _a56,_a57=_a55.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a57&&_a57.isConsumed){
switch(_a57.listener.constructor){
case StageBinding:
_a56=false;
break;
case StageDialogBinding:
_a56=true;
break;
}
}
var _a58=_a56?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a59=_a58.add(BalloonBinding.newInstance(top.app.document));
_a59.setLabel(_a54.text);
_a59.snapTo(_a55);
_a59.attach();
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
var _a5a=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a5d=_a5a.getDataBinding(name);
if(_a5d){
ErrorBinding.presentError({text:text},_a5d);
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
FocusBinding.focusElement=function(_a5e){
var _a5f=true;
try{
_a5e.focus();
Application.focused(true);
}
catch(exception){
var _a60=UserInterface.getBinding(_a5e);
var _a61=SystemLogger.getLogger("FocusBinding.focusElement");
_a61.warn("Could not focus "+(_a60?_a60.toString():String(_a5e)));
_a5f=false;
}
return _a5f;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a62){
var win=_a62.bindingWindow;
var id=_a62.bindingElement.id;
return {getBinding:function(){
var _a65=null;
try{
if(Binding.exists(_a62)){
_a65=win.bindingMap[id];
}
}
catch(exception){
}
return _a65;
}};
};
FocusBinding.navigateNext=function(_a66){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a66);
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
var _a67=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a67&&_a67.isConsumed){
if(_a67.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a68){
FocusBinding.superclass.handleAction.call(this,_a68);
var _a69=_a68.target;
var _a6a=null;
if(this._isFocusManager){
switch(_a68.type){
case FocusBinding.ACTION_ATTACHED:
if(_a69!=this){
this._isUpToDate=false;
}
_a68.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a69!=this){
this._isUpToDate=false;
_a68.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a6a=new FocusCrawler();
_a6a.mode=FocusCrawler.MODE_BLUR;
_a6a.crawl(_a69.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a68.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a69!=this){
_a6a=new FocusCrawler();
_a6a.mode=FocusCrawler.MODE_FOCUS;
_a6a.crawl(_a69.bindingElement);
}
_a68.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a69)){
this.claimFocus();
this._onFocusableFocused(_a69);
}
_a68.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a69)){
this._onFocusableBlurred(_a69);
}
_a68.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a6b){
var _a6c=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a6c==null&&list.hasNext()){
var _a6e=list.getNext();
if(this._cachedFocus&&_a6e==this._cachedFocus.getBinding()){
_a6c=_a6e;
}
}
if(_a6c!=null){
if(_a6e.isFocused){
var next=_a6b?list.getPreceding(_a6c):list.getFollowing(_a6c);
if(!next){
next=_a6b?list.getLast():list.getFirst();
}
next.focus();
}else{
_a6c.focus();
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
var _a70=new FocusCrawler();
var list=new List();
_a70.mode=FocusCrawler.MODE_INDEX;
_a70.crawl(this.bindingElement,list);
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
var _a74=this._cachedFocus.getBinding();
if(_a74&&!_a74.isFocused){
_a74.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a75){
if(_a75!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a75;
_a75.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a75);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a76){
_a76.deleteProperty(FocusBinding.MARKER);
if(_a76==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a78){
this.bindingElement.style.left=_a78+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a79){
this.hiddenTabBindings.add(_a79);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a7a=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a7a.getLabel());
item.setImage(_a7a.getImage());
item.associatedTabBinding=_a7a;
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
TabsButtonBinding.prototype.handleAction=function(_a7d){
TabsButtonBinding.superclass.handleAction.call(this,_a7d);
switch(_a7d.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a7e=this.selectedTabBinding;
if(_a7e){
this.containingTabBoxBinding.moveToOrdinalPosition(_a7e,0);
this.containingTabBoxBinding.select(_a7e);
}
_a7d.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a7f){
var _a80=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a7f);
_a80.setAttribute("type","checkbox");
_a80.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a80.className="tabbutton";
return UserInterface.registerBinding(_a80,TabsButtonBinding);
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
var _a81=TabBoxBinding.currentActiveInstance;
if(_a81!=null&&Binding.exists(_a81)){
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
var _a82=this.getTabElements().getLength();
var _a83=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a82!=_a83){
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
var _a84=this.getTabPanelElements();
while(_a84.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a84.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a85=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a86=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a87=_a85>_a86?"tabsbelow":"tabsontop";
this.attachClassName(_a87);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a89=this.getTabPanelElements();
var _a8a=null;
var _a8b=this.getProperty("selectedindex");
if(_a8b!=null){
if(_a8b>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a8c=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a8e=_a89.getNext();
this.registerTabBoxPair(tab,_a8e);
if(_a8b&&_a8c==_a8b){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a8a=tab;
}
}
_a8c++;
}
if(!_a8a){
_a8a=tabs.getFirst();
_a8a.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a8f){
var _a90=null;
var _a91=null;
if(this.isEqualSize){
var _a92=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a94=this.getTabPanelElements();
_a94.each(function(_a95){
max=_a95.offsetHeight>max?_a95.offsetHeight:max;
});
_a91=max+_a92.top+_a92.bottom;
if(_a8f&&this._tabPanelsElement.style.height!=null){
_a90=this._tabPanelsElement.offsetHeight;
}
if(_a90!=null||_a91>_a90){
this._tabPanelsElement.style.height=_a91+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a96){
_a96._invalidCount=0;
_a96.addActionListener(Binding.ACTION_INVALID,this);
_a96.addActionListener(Binding.ACTION_VALID,this);
_a96.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a97){
TabBoxBinding.superclass.handleAction.call(this,_a97);
var _a98=_a97.target;
var _a99=_a97.listener;
switch(_a97.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a98.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a97.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a98.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a99._invalidCount++;
if(_a99._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a99.isSelected){
self._showWarning(_a99,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a99._invalidCount>0){
_a99._invalidCount--;
if(_a99._invalidCount==0){
if(_a99.isSelected){
this._showWarning(_a99,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a99,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a97._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a97._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a9c=DOMEvents.getTarget(e);
if(_a9c==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a9e=this.getTabPanelElements();
tabs.each(function(tab,_aa0){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _aa1=_a9e.get(_aa0);
this.registerTabBoxPair(tab,_aa1);
}
},this);
var _aa2=this._tabBoxPairs;
for(var key in _aa2){
var tab=_aa2[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a9c);
switch(_a9c.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _aa6=_a9c.parentNode;
if(_aa6==this._tabsElement||_aa6==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a9c==this._tabsElement||_a9c==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_aa8){
var _aa9=this.getBindingForArgument(arg);
if(_aa9!=null&&!_aa9.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_aa9.select(_aa8);
this.getTabPanelBinding(_aa9).select(_aa8);
var _aaa=this.getProperty("selectedindex");
if(_aaa!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_aa9.bindingElement,true));
}
this._selectedTabBinding=_aa9;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_aa9.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _aab=this.getTabPanelBinding(_aa9);
this._showBalloon(_aab,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_aad){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_aad.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_aad};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_ab1){
var _ab2=null;
try{
var key=_ab1.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ab4=this._tabBoxPairs[key].tabPanel;
_ab2=UserInterface.getBinding(_ab4);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _ab2;
};
TabBoxBinding.prototype.getTabBinding=function(_ab5){
var key=_ab5.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _ab7=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_ab7);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _ab8=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_ab8);
return _ab8;
};
TabBoxBinding.prototype.appendTabByBindings=function(_ab9,_aba){
var _abb=_ab9.bindingElement;
_ab9.setProperty("selected",true);
var _abc=this.summonTabPanelBinding();
var _abd=_abc.bindingElement;
if(_aba){
_abd.appendChild(_aba instanceof Binding?_aba.bindingElement:_aba);
}
this.registerTabBoxPair(_abb,_abd);
UserInterface.getBinding(this._tabsElement).add(_ab9);
this._tabPanelsElement.appendChild(_abd);
_ab9.attach();
UserInterface.getBinding(_abd).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _ab9;
};
TabBoxBinding.prototype.importTabBinding=function(_abe){
var that=_abe.containingTabBoxBinding;
var _ac0=that.getTabPanelBinding(_abe);
var _ac1=_ac0.getBindingElement();
var _ac2=_abe.getBindingElement();
that.dismissTabBinding(_abe);
this._tabsElement.appendChild(_ac2);
this._tabPanelsElement.appendChild(_ac1);
this.registerTabBoxPair(_ac2,_ac1);
_abe.containingTabBoxBinding=this;
this.select(_abe);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ac3){
var _ac4=null;
if(_ac3.isSelected){
_ac4=this.getBestTab(_ac3);
this._selectedTabBinding=null;
}
var _ac5=this.getTabPanelBinding(_ac3);
this.unRegisterTabBoxPair(_ac3.bindingElement);
_ac3.dispose();
_ac5.dispose();
if(_ac4!=null){
this.select(_ac4);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_ac6){
if(_ac6.isSelected){
this.selectBestTab(_ac6);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ac7){
var _ac8=this.getBestTab(_ac7);
if(_ac8){
this.select(_ac8);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ac9){
var _aca=null;
var _acb=_ac9.getOrdinalPosition(true);
var _acc=this.getTabBindings();
var _acd=_acc.getLength();
var _ace=_acd-1;
if(_acd==1){
_aca=null;
}else{
if(_acb==_ace){
_aca=_acc.get(_acb-1);
}else{
_aca=_acc.get(_acb+1);
}
}
return _aca;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_acf,_ad0){
var _ad1=this.bindingDocument.getElementById(_acf.bindingElement.id);
var tab=this.getTabElements().get(_ad0);
this._tabsElement.insertBefore(_ad1,tab);
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
var _ad3=this._nodename_tab;
var _ad4=new List(this._tabsElement.childNodes);
var _ad5=new List();
while(_ad4.hasNext()){
var _ad6=_ad4.getNext();
if(_ad6.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ad6)==_ad3){
_ad5.add(_ad6);
}
}
return _ad5;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ad7=this._nodename_tabpanel;
var _ad8=new List(this._tabPanelsElement.childNodes);
var _ad9=new List();
_ad8.each(function(_ada){
if(_ada.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ada)==_ad7){
_ad9.add(_ada);
}
});
return _ad9;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _adb=new List();
var _adc=this.getTabElements();
_adc.each(function(_add){
_adb.add(UserInterface.getBinding(_add));
});
return _adb;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _ade=new List();
this.getTabPanelElements().each(function(_adf){
_ade.add(UserInterface.getBinding(_adf));
});
return _ade;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _ae0=null;
if(this._selectedTabBinding){
_ae0=this.getTabPanelBinding(this._selectedTabBinding);
}
return _ae0;
};
TabBoxBinding.prototype._showWarning=function(_ae1,_ae2){
var _ae3=this.getTabBinding(_ae1);
if(_ae2){
if(_ae3.labelBinding.hasImage){
_ae3._backupImage=_ae3.getImage();
}
_ae3.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ae3._backupImage){
_ae3.setImage(_ae3._backupImage);
}else{
_ae3.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ae4,_ae5){
var _ae6=this.getTabBinding(_ae4);
if((_ae5&&!_ae6.isSelected)||!_ae5){
if(_ae6.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ae5){
if(_ae6.labelBinding.hasImage){
_ae6._backupImage=_ae6.getImage();
}
_ae6.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_ae6._backupImage!=null){
_ae6.setImage(_ae6._backupImage);
}else{
_ae6.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_ae7){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _aea=tab.getOrdinalPosition(true);
var next=null;
var _aec=new List();
tabs.each(function(t){
if(t.isVisible){
_aec.add(t);
}
});
if(_aec.getLength()>1){
if(_aea==0&&!_ae7){
next=_aec.getLast();
}else{
if(_aea==_aec.getLength()-1&&_ae7){
next=_aec.getFirst();
}else{
if(_ae7){
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
var _aef=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_aef.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_af0){
TabsBinding.superclass.handleAction.call(this,_af0);
switch(_af0.type){
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
var _af3=self.bindingElement.offsetWidth;
if(_af3!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_af3;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_af4){
if(_af4 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_af4);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _af5=false;
var _af6,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _af9=this.constructor.TABBUTTON_IMPLEMENTATION;
var _afa=this.bindingElement.offsetWidth-_af9.RESERVED_SPACE;
var _afb=null;
var sum=0,_afd=0;
var _afe=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_afe){
tab=tabs.getNext();
_af6=UserInterface.getBinding(tab);
if(!_afb){
_afb=_af6;
}
sum+=tab.offsetWidth;
if(sum>=_afa){
_af5=true;
if(_af6.isSelected){
if(!DOMUtil.isFirstElement(_af6.bindingElement,true)){
this.isManaging=false;
if(_afb){
_afb.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_af6,_afd-1);
_afe=false;
}
}else{
_af6.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_af6);
}
}else{
_af6.show();
_afb=_af6;
_afd++;
}
}
if(_afe){
if(_af5&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _aff=_afb.getBindingElement();
var _b00=_aff.offsetLeft+_aff.offsetWidth;
var _b01=this.tabsButtonBinding;
setTimeout(function(){
_b01.show(_b00+4);
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
var _b02=TabBinding.superclass.serialize.call(this);
if(_b02){
_b02.label=this.getLabel();
_b02.image=this.getImage();
_b02.tooltip=this.getToolTip();
}
return _b02;
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
var _b03=this.bindingElement.getAttribute("image");
var _b04=this.bindingElement.getAttribute("label");
var _b05=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_b04){
this.setLabel(_b04);
}
if(_b03){
this.setImage(_b03);
}
if(_b05){
this.setToolTip(_b05);
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
TabBinding.prototype.setLabel=function(_b07){
if(_b07!=null){
this.setProperty("label",_b07);
if(this.isAttached){
this.labelBinding.setLabel(_b07);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_b08){
if(_b08){
this.setProperty("tooltip",_b08);
if(this.isAttached){
this.labelBinding.setToolTip(_b08);
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
var _b0a=false;
if(Client.isMozilla==true){
}
if(!_b0a){
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
TabBinding.prototype.select=function(_b0b){
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
TabBinding.newInstance=function(_b0c){
var _b0d=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b0c);
return UserInterface.registerBinding(_b0d,TabBinding);
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
var _b0e=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b0e=true;
this._lastKnownDimension=dim1;
}
return _b0e;
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
TabPanelBinding.prototype.select=function(_b11){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b11!=true){
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
TabPanelBinding.prototype.handleAction=function(_b12){
TabPanelBinding.superclass.handleAction.call(this,_b12);
var _b13=_b12.target;
switch(_b12.type){
case BalloonBinding.ACTION_INITIALIZE:
_b12.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b14){
var _b15=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b14);
UserInterface.registerBinding(_b15,TabPanelBinding);
return UserInterface.getBinding(_b15);
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
var _b16=SplitBoxBinding.superclass.serialize.call(this);
if(_b16){
_b16.orient=this.getOrient();
_b16.layout=this.getLayout();
}
return _b16;
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
var _b17=this.getSplitPanelElements();
if(_b17.hasEntries()){
var _b18=new List(this.getLayout().split(":"));
if(_b18.getLength()!=_b17.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b17.each(function(_b19){
_b19.setAttribute("ratio",_b18.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b1a=this.getProperty("orient");
if(_b1a){
this._orient=_b1a;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b1b=this.getSplitterBindings();
while(_b1b.hasNext()){
var _b1c=_b1b.getNext();
if(_b1c&&_b1c.getProperty("collapsed")==true){
_b1c.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b1d){
SplitBoxBinding.superclass.handleAction.call(this,_b1d);
switch(_b1d.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b1d.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b1d.target);
_b1d.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b1d.target);
_b1d.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b1e){
this._getSplitPanelBindingForSplitter(_b1e).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b1f){
this._getSplitPanelBindingForSplitter(_b1f).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b20){
var _b21=DOMUtil.getOrdinalPosition(_b20.bindingElement,true);
var _b22,_b23=this.getSplitPanelElements();
switch(_b20.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b22=_b23.get(_b21);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b22=_b23.get(_b21+1);
break;
}
return UserInterface.getBinding(_b22);
};
SplitBoxBinding.prototype.invokeLayout=function(_b24){
var _b25=this.isHorizontalOrient();
var _b26=this.getSplitPanelBindings();
var _b27=this.getSplitterBindings();
var _b28=new List();
var _b29,sum=0;
var _b2b=0;
_b26.each(function(_b2c){
if(_b2c.isFixed==true){
if(!_b26.hasNext()){
_b2b+=_b2c.getFix();
}
_b28.add(0);
sum+=0;
}else{
_b29=_b2c.getRatio();
_b28.add(_b29);
sum+=_b29;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b28.getLength()!=_b26.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b2d=_b25?this.getInnerWidth():this.getInnerHeight();
_b2d-=_b2b;
_b27.each(function(_b2e){
if(_b2e.isVisible){
_b2d-=SplitterBinding.DIMENSION;
}
});
var unit=_b2d/sum;
var _b30=0;
var self=this;
_b26.each(function(_b32){
var span=0;
var _b34=_b28.getNext();
if(_b32.isFixed){
span=_b32.getFix();
}else{
span=Math.round(unit*_b34);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b30+=span;
while(_b30>_b2d){
_b30--;
span--;
}
if(!_b32.isFixed){
if(_b25){
_b32.setWidth(span);
}else{
_b32.setHeight(span);
}
}
});
}
if(_b24!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b35=this.getLayout();
if(_b35){
this.setProperty("layout",_b35);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b36=this.isHorizontalOrient();
var _b37=this.getSplitPanelBindings();
var _b38=this.getSplitterBindings();
var _b39=null;
var _b3a=null;
var unit=null;
var _b3c=null;
var span=null;
_b37.each(function(_b3e){
if(!unit){
unit=_b36?_b3e.getWidth():_b3e.getHeight();
}
span=_b36?_b3e.getWidth():_b3e.getHeight();
if(_b3c){
span-=_b3c;
_b3c=null;
}
_b39=_b38.getNext();
if(_b39&&_b39.offset){
_b3c=_b39.offset;
span+=_b3c;
}
_b3e.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b3f){
this.logger.debug(_b3f);
this.setProperty("layout",_b3f);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b40="",_b41=this.getSplitPanelBindings();
_b41.each(function(_b42){
_b40+=_b42.getRatio().toString();
_b40+=_b41.hasNext()?":":"";
});
this.setProperty("layout",_b40);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b43=this.getSplitPanelElements();
_b43.each(function(_b44){
layout+="1"+(_b43.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b45){
this.bindingElement.style.width=_b45+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b46){
this.bindingElement.style.height=_b46+"px";
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
SplitBoxBinding.prototype.fit=function(_b47){
if(!this.isFit||_b47){
if(this.isHorizontalOrient()){
var max=0;
var _b49=this.getSplitPanelBindings();
_b49.each(function(_b4a){
var _b4b=_b4a.bindingElement.offsetHeight;
max=_b4b>max?_b4b:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b4c){
var _b4d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b4c);
return UserInterface.registerBinding(_b4d,SplitBoxBinding);
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
var _b50=this.getProperty("hidden");
if(_b50){
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
var _b51=this.getProperty("ratiocache");
if(_b51){
this.setRatio(_b51);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b52){
if(!this.isFixed){
if(_b52!=this.getWidth()){
if(_b52<0){
_b52=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b52+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b52);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b53=null;
if(this.isFixed){
_b53=this.getFix();
}else{
_b53=this.bindingElement.offsetWidth;
}
return _b53;
};
SplitPanelBinding.prototype.setHeight=function(_b54){
if(!this.isFixed){
if(_b54!=this.getHeight()){
try{
this.bindingElement.style.height=_b54+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b55=null;
if(this.isFixed){
_b55=this.getFix();
}else{
_b55=this.bindingElement.offsetHeight;
}
return _b55;
};
SplitPanelBinding.prototype.setRatio=function(_b56){
this.setProperty("ratio",_b56);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b57){
if(_b57){
this._fixedSpan=_b57;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b57);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b57);
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
SplitPanelBinding.newInstance=function(_b58){
var _b59=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b58);
return UserInterface.registerBinding(_b59,SplitPanelBinding);
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
var _b5a=SplitBoxBinding.superclass.serialize.call(this);
if(_b5a){
_b5a.collapse=this.getProperty("collapse");
_b5a.collapsed=this.getProperty("collapsed");
_b5a.disabled=this.getProperty("isdisabled");
}
return _b5a;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b5b=this.getProperty("hidden");
if(_b5b){
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
SplitterBinding.prototype.setCollapseDirection=function(_b5d){
this.setProperty("collapse",_b5d);
this._collapseDirection=_b5d;
};
SplitterBinding.prototype.handleAction=function(_b5e){
SplitterBinding.superclass.handleAction.call(this,_b5e);
switch(_b5e.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b5e.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b60=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b60.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b60.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b61){
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
SplitterBinding.newInstance=function(_b6c){
var _b6d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b6c);
return UserInterface.registerBinding(_b6d,SplitterBinding);
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
var _b6e=this.getProperty("selectedindex");
var _b6f=this.getDeckElements();
if(_b6f.hasEntries()){
var _b70=false;
var _b71=0;
while(_b6f.hasNext()){
var deck=_b6f.getNext();
if(_b6e&&_b71==_b6e){
deck.setAttribute("selected","true");
_b70=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b70=true;
}
}
_b71++;
}
if(!_b70){
_b6f.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b74=this.getBindingForArgument(arg);
if(_b74!=null){
if(_b74!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b74.select();
this._selectedDeckBinding=_b74;
var _b75=this.getProperty("selectedindex");
if(_b75!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b74.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b76=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b76=true;
this._lastKnownDimension=dim1;
}
return _b76;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b79){
var _b7a=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b79);
return UserInterface.registerBinding(_b7a,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b7b){
DeckBinding.superclass.handleAction.call(this,_b7b);
var _b7c=_b7b.target;
switch(_b7b.type){
case BalloonBinding.ACTION_INITIALIZE:
_b7b.consume();
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
DeckBinding.newInstance=function(_b7e){
var _b7f=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b7e);
return UserInterface.registerBinding(_b7f,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b80){
if(_b80 instanceof ToolBarBodyBinding){
if(_b80.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b80;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b80;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b80);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b81=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b81){
this.setImageSize(_b81);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b83=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b83.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b83.isDefaultContent=true;
this.add(_b83);
_b83.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b85=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b85);
}
if(_b85!=null&&_b85.hasClassName("max")){
this._maxToolBarGroup(_b85,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b87){
var _b88=this.boxObject.getDimension().w;
var _b89=CSSComputer.getPadding(this.bindingElement);
_b88-=(_b89.left+_b89.right);
if(_b87!=null){
_b88-=_b87.boxObject.getDimension().w;
if(!Client.isWindows){
_b88-=1;
}
if(Client.isExplorer){
_b88-=15;
}
}
max.bindingElement.style.width=_b88+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b8a){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b8a);
};
ToolBarBinding.prototype.addLeft=function(_b8b,_b8c){
var _b8d=null;
if(this._toolBarBodyLeft!=null){
_b8d=this._toolBarBodyLeft.add(_b8b,_b8c);
}else{
throw new Error("No left toolbarbody");
}
return _b8d;
};
ToolBarBinding.prototype.addLeftFirst=function(_b8e,_b8f){
var _b90=null;
if(this._toolBarBodyLeft){
_b90=this._toolBarBodyLeft.addFirst(_b8e,_b8f);
}else{
throw new Error("No left toolbarbody");
}
return _b90;
};
ToolBarBinding.prototype.addRight=function(_b91){
var _b92=null;
if(this._toolBarBodyRight){
_b92=this._toolBarBodyRight.add(_b91);
}else{
throw new Error("No left toolbarbody");
}
return _b92;
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
ToolBarBinding.newInstance=function(_b95){
var _b96=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b95);
return UserInterface.registerBinding(_b96,ToolBarBinding);
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
var _b97=this.getDescendantBindingsByLocalName("toolbargroup");
var _b98=new List();
var _b99=true;
_b97.each(function(_b9a){
if(_b9a.isVisible&&!_b9a.isDefaultContent){
_b98.add(_b9a);
}
});
while(_b98.hasNext()){
var _b9b=_b98.getNext();
_b9b.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b99){
_b9b.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b99=false;
}
if(!_b98.hasNext()){
_b9b.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b9e=list.getNext();
var _b9f=_b9e.getEqualSizeWidth();
if(_b9f>max){
max=_b9f;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b9e=list.getNext();
_b9e.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_ba0,_ba1){
var _ba2=ToolBarBinding.superclass.add.call(this,_ba0);
if(!_ba1){
if(_ba0 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba2;
};
ToolBarBodyBinding.prototype.addFirst=function(_ba3,_ba4){
var _ba5=ToolBarBinding.superclass.addFirst.call(this,_ba3);
if(!_ba4){
if(_ba3 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _ba5;
};
ToolBarBodyBinding.newInstance=function(_ba6){
var _ba7=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_ba6);
return UserInterface.registerBinding(_ba7,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_ba8){
switch(_ba8){
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
var _ba9=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_ba9)=="toolbarbody"){
UserInterface.getBinding(_ba9).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _baa=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_baa)=="toolbarbody"){
UserInterface.getBinding(_baa).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_bab){
var _bac=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_bab);
return UserInterface.registerBinding(_bac,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_bad){
var _bae=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bad);
return UserInterface.registerBinding(_bae,ToolBarButtonBinding);
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
var _baf=this.getProperty("label");
var _bb0=this.getProperty("image");
if(_baf){
this.setLabel(_baf);
}
if(_bb0){
this.setImage(_bb0);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_bb1,_bb2){
if(this.isAttached){
this._labelBinding.setLabel(_bb1,_bb2);
}
this.setProperty("label",_bb1);
};
ToolBarLabelBinding.prototype.setImage=function(_bb3,_bb4){
if(this.isAttached){
this._labelBinding.setImage(_bb3,_bb4);
}
this.setProperty("image",_bb3);
};
ToolBarLabelBinding.newInstance=function(_bb5){
var _bb6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_bb5);
return UserInterface.registerBinding(_bb6,ToolBarLabelBinding);
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
var _bb7=this.getDescendantBindingsByLocalName("clickbutton");
if(_bb7.hasEntries()){
while(_bb7.hasNext()){
var _bb8=_bb7.getNext();
if(_bb8.isDefault){
this._defaultButton=_bb8;
_bb8.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bb8.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bb7;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bb9,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bb9,arg);
switch(_bb9){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bbb=this.getAncestorBindingByType(DialogBinding,true);
if(_bbb!=null&&_bbb.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bbc){
DialogToolBarBinding.superclass.handleAction.call(this,_bbc);
var _bbd=_bbc.target;
var _bbe=false;
var _bbf=this._buttons.reset();
if(_bbd instanceof ClickButtonBinding){
switch(_bbc.type){
case Binding.ACTION_FOCUSED:
_bbd.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bbd;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bbd.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bbe&&_bbf.hasNext()){
var _bc0=_bbf.getNext();
_bbe=_bc0.isFocused;
}
if(!_bbe){
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
ComboBoxBinding.newInstance=function(_bc2){
var _bc3=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bc2);
return UserInterface.registerBinding(_bc3,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bc4,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bc4,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bc8=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bc8.each(function(_bc9){
var _bca=_bc9.getProperty("oncommand");
_bc9.setProperty("hiddencommand",_bca);
_bc9.deleteProperty("oncommand");
_bc9.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bcb=null;
var _bcc=this.getActiveMenuItemId();
_bc8.reset();
while(_bc8.hasNext()){
var _bcd=_bc8.getNext();
if(_bcd.getProperty("id")==_bcc){
_bcb=_bcd;
break;
}
}
if(_bcb==null&&_bc8.hasEntries()){
_bcb=_bc8.getFirst();
}
if(_bcb!=null){
this.setButton(_bcb);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bce){
if(_bce instanceof MenuItemBinding){
var _bcf=_bce.getProperty("label");
var _bd0=_bce.getProperty("image");
var _bd1=_bce.getProperty("image-hover");
var _bd2=_bce.getProperty("image-active");
var _bd3=_bce.getProperty("image-disabled");
var _bd4=_bce.getProperty("hiddencommand");
this.setLabel(_bcf?_bcf:"");
this.image=_bd0;
this.imageHover=_bd0;
this.imageActive=_bd2;
this.imageDisabled=_bd3;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bd4,this);
};
this.hideActiveItem(_bce);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bd5){
if(_bd5 instanceof MenuItemBinding){
this.setButton(_bd5);
this.setActiveMenuItemId(_bd5.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bd6){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bd7){
if(_bd7==_bd6){
Binding.prototype.hide.call(_bd7);
}else{
Binding.prototype.show.call(_bd7);
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
var _bd9=this._views;
for(var _bda in ViewDefinitions){
var def=ViewDefinitions[_bda];
var key=def.perspective;
if(key!=null){
if(!_bd9.has(key)){
_bd9.set(key,new List());
}
var list=_bd9.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bde,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bde,arg);
switch(_bde){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _be1=this.bindingWindow.bindingMap.toolboxpopupgroup;
_be1.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_be1.add(StageViewMenuItemBinding.newInstance(_be1.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_be1.show();
}else{
_be1.hide();
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
TreeBinding.grid=function(_be5){
var _be6=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_be5);
var _be8=_be5%_be6;
if(_be8>0){
_be5=_be5-_be8+_be6;
}
return _be5+TreeBodyBinding.PADDING_TOP;
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
var _be9=this.getProperty("focusable");
if(_be9!=null){
this._isFocusable=_be9;
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
var _beb=this.getProperty("builder");
if(_beb){
this._buildFromTextArea(_beb);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bec=this.getProperty("selectable");
var _bed=this.getProperty("selectionproperty");
var _bee=this.getProperty("selectionvalue");
if(_bec){
this.setSelectable(true);
if(_bed){
this.setSelectionProperty(_bed);
}
if(_bee){
this.setSelectionValue(_bee);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _bf1=UserInterface.getBinding(area);
var _bf2=this._treeBodyBinding;
function build(){
_bf2.subTreeFromString(area.value);
}
_bf1.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_bf3){
var _bf4=_bf3.getHandle();
if(this._treeNodeBindings.has(_bf4)){
throw "Duplicate treenodehandles registered: "+_bf3.getLabel();
}else{
this._treeNodeBindings.set(_bf4,_bf3);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_bf4)){
_bf3.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_bf6){
this._treeNodeBindings.del(_bf6.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_bf7){
var _bf8=null;
if(this._treeNodeBindings.has(_bf7)){
_bf8=this._treeNodeBindings.get(_bf7);
}else{
throw "No such treenode: "+_bf7;
}
return _bf8;
};
TreeBinding.prototype.handleAction=function(_bf9){
TreeBinding.superclass.handleAction.call(this,_bf9);
var _bfa=_bf9.target;
switch(_bf9.type){
case TreeNodeBinding.ACTION_OPEN:
_bf9.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bfa);
_bf9.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bfa;
this.focusSingleTreeNodeBinding(_bfa);
if(!this.isFocused){
this.focus();
}
_bf9.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bfa;
this.focusSingleTreeNodeBinding(_bfa);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bfa;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bfa;
this.focusSingleTreeNodeBinding(_bfa);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bf9.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bfa.isFocused){
this.blurSelectedTreeNodes();
}
_bf9.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bfb,_bfc){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bfd){
if(_bfd!=null&&!_bfd.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bfd);
_bfd.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_bfe){
this.blurSelectedTreeNodes();
while(_bfe.hasNext()){
var _bff=_bfe.getNext();
this._focusedTreeNodeBindings.add(_bff);
_bff.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _c00=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _c01=false;
var _c02=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _c03=this._focusedTreeNodeBindings.getNext();
var _c04=_c03.getProperty(this._selectionProperty);
if(_c04!=null){
if(!this._selectionValue||this._selectionValue[_c04]){
_c02=(this._selectedTreeNodeBindings[_c03.key]=_c03);
var _c05=_c00[_c03.key];
if(!_c05||_c05!=_c02){
_c01=true;
}
}
}
}
if(_c02){
if(_c01){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_c00){
for(var key in _c00){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _c07=new List();
for(var key in this._selectedTreeNodeBindings){
_c07.add(this._selectedTreeNodeBindings[key]);
}
return _c07;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_c09){
_c09.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_c0a){
var _c0b=_c0a.getDescendantBindingsByLocalName("treenode");
var _c0c=true;
var self=this;
_c0b.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c0c;
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
var _c0f=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c0f!=null){
this.focusSingleTreeNodeBinding(_c0f);
_c0f.callback();
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
TreeBinding.prototype.add=function(_c10){
var _c11=null;
if(this._treeBodyBinding){
_c11=this._treeBodyBinding.add(_c10);
}else{
this._treeNodeBuffer.add(_c10);
_c11=_c10;
}
return _c11;
};
TreeBinding.prototype.addFirst=function(_c12){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c13=this._treeBodyBinding.bindingElement;
_c13.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c14,_c15){
if(_c15.isContainer&&_c15.isOpen){
_c15.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c16){
this._isSelectable=_c16;
if(_c16){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c17){
this._selectionProperty=_c17;
};
TreeBinding.prototype.setSelectionValue=function(_c18){
if(_c18){
var list=new List(_c18.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c1a,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c1a,arg);
switch(_c1a){
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
var _c1c=this.getFocusedTreeNodeBindings();
if(_c1c.hasEntries()){
var node=_c1c.getFirst();
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
var _c1f=this.getFocusedTreeNodeBindings();
if(_c1f.hasEntries()){
var node=_c1f.getFirst();
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
var _c22=null;
while(next==null&&(_c22=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c22!=null){
next=_c22.getNextBindingByLocalName("treenode");
}
node=_c22;
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
var _c24=DOMEvents.getTarget(e);
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
var _c25=new TreeCrawler();
var list=new List();
_c25.mode=TreeCrawler.MODE_GETOPEN;
_c25.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c28=list.getNext();
map.set(_c28.getHandle(),true);
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
var _c2d=this._positionIndicatorBinding;
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
if(y!=_c2d.getPosition().y){
_c2d.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c2d.isVisible){
_c2d.show();
}
}else{
if(_c2d.isVisible){
_c2d.hide();
}
}
}else{
if(_c2d.isVisible){
_c2d.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c30){
this._acceptingTreeNodeBinding=_c30;
this._acceptingPosition=_c30.boxObject.getLocalPosition();
this._acceptingDimension=_c30.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c30);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c31){
var map={};
var _c33=_c31.getChildBindingsByLocalName("treenode");
var _c34,pos,dim,y;
y=TreeBinding.grid(_c31.boxObject.getLocalPosition().y);
map[y]=true;
while(_c33.hasNext()){
_c34=_c33.getNext();
pos=_c34.boxObject.getLocalPosition();
dim=_c34.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c3a in this._acceptingPositions){
if(_c3a==y){
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
TreeBinding.newInstance=function(_c3b){
var _c3c=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c3b);
var _c3d=UserInterface.registerBinding(_c3c,TreeBinding);
_c3d.treeBodyBinding=TreeBodyBinding.newInstance(_c3b);
return _c3d;
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
TreeBodyBinding.prototype.accept=function(_c3e){
if(_c3e instanceof TreeNodeBinding){
this.logger.debug(_c3e);
}
};
TreeBodyBinding.prototype.handleAction=function(_c3f){
TreeBodyBinding.superclass.handleAction.call(this,_c3f);
switch(_c3f.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c3f.target);
_c3f.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c40){
var a=this.boxObject.getDimension().h;
var y=_c40.boxObject.getLocalPosition().y;
var h=_c40.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c46=_c40.labelBinding.bindingElement;
if(y-t<0){
_c46.scrollIntoView(true);
}else{
if(y-t+h>a){
_c46.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c47){
var _c48=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c47);
return UserInterface.registerBinding(_c48,TreeBodyBinding);
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
var _c49=TreeNodeBinding.superclass.serialize.call(this);
if(_c49){
_c49.label=this.getLabel();
_c49.image=this.getImage();
var _c4a=this.getHandle();
if(_c4a&&_c4a!=this.key){
_c49.handle=_c4a;
}
if(this.isOpen){
_c49.open=true;
}
if(this.isDisabled){
_c49.disabled=true;
}
if(this.dragType){
_c49.dragtype=this.dragType;
}
if(this.dragAccept){
_c49.dragaccept=this.dragAccept;
}
}
return _c49;
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
var _c4c=UserInterface.getBinding(node);
if(_c4c&&_c4c.containingTreeBinding){
this.containingTreeBinding=_c4c.containingTreeBinding;
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
var _c4d=this.key;
var _c4e=this.getProperty("handle");
if(_c4e){
_c4d=_c4e;
}
return _c4d;
};
TreeNodeBinding.prototype.setHandle=function(_c4f){
this.setProperty("handle",_c4f);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c51=this.getProperty("label");
var _c52=this.getProperty("tooltip");
var _c53=this.getProperty("oncommand");
var _c54=this.getProperty("onbindingfocus");
var _c55=this.getProperty("onbindingblur");
var _c56=this.getProperty("focused");
var _c57=this.getProperty("callbackid");
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
if(_c51!=null){
this.setLabel(_c51);
}
if(_c52!=null){
this.setToolTip(_c52);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c59=this.bindingWindow.WindowManager;
if(_c53!=null){
this.oncommand=function(){
Binding.evaluate(_c53,this);
};
}
if(_c54!=null){
this.onfocus=function(){
Binding.evaluate(_c54,this);
};
}
if(_c55!=null){
this.onblur=function(){
Binding.evaluate(_c55,this);
};
}
if(_c56==true){
this.focus();
}
if(_c57!=null){
Binding.dotnetify(this,_c57);
}
};
TreeNodeBinding.prototype.handleAction=function(_c5a){
TreeNodeBinding.superclass.handleAction.call(this,_c5a);
switch(_c5a.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c5a.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c5b,_c5c){
var _c5d=true;
if(_c5b instanceof TreeNodeBinding){
var _c5e=false;
var _c5f=this.bindingElement;
var _c60=this.containingTreeBinding.bindingElement;
while(!_c5e&&_c5f!=_c60){
if(_c5f==_c5b.getBindingElement()){
_c5e=true;
}else{
_c5f=_c5f.parentNode;
}
}
if(_c5e){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c5d=false;
}else{
this.acceptTreeNodeBinding(_c5b,_c5c);
}
}else{
_c5d=false;
}
return _c5d;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c61,_c62){
var _c63=_c61.serializeToString();
var _c64=new BindingParser(this.bindingDocument);
var _c65=_c64.parseFromString(_c63).getFirst();
_c62=_c62?_c62:this.containingTreeBinding.getDropIndex();
var _c66=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c65,_c66.get(_c62));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c61.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c67=this.getProperty("image");
var _c68=this.getProperty("image-active");
var _c69=this.getProperty("image-disabled");
_c68=_c68?_c68:this.isContainer?_c67?_c67:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c67?_c67:TreeNodeBinding.DEFAULT_ITEM;
_c69=_c69?_c69:this.isContainer?_c67?_c67:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c67?_c67:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c67=_c67?_c67:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c67,imageHover:null,imageActive:_c68,imageDisabled:_c69});
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
TreeNodeBinding.prototype.setLabel=function(_c6b){
this.setProperty("label",String(_c6b));
if(this.isAttached){
this.labelBinding.setLabel(String(_c6b));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c6c){
this.setProperty("tooltip",String(_c6c));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c6c));
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
var _c6d=this.imageProfile.getDefaultImage();
var _c6e=this.imageProfile.getActiveImage();
_c6e=_c6e?_c6e:_c6d;
return this.isOpen?_c6e:_c6d;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c70=DOMEvents.getTarget(e);
var _c71=this.labelBinding.bindingElement;
var _c72=this.labelBinding.shadowTree.labelBody;
var _c73=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c70){
case _c71:
this._onAction(e);
break;
case _c72:
case _c73:
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
if(_c70.parentNode==this.bindingElement&&_c70.__updateType==Update.TYPE_INSERT){
var _c71=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c70)=="treenode"){
if(_c70==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c70,_c71.nextSibling);
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
switch(_c70){
case _c71:
case _c72:
case _c73:
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
var _c77=true;
if(e.type=="mousedown"){
var _c78=e.button==(e.target?0:1);
if(!_c78){
_c77=false;
}
}
if(_c77){
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
var _c7a=false;
if(e!=null){
_c7a=e.shiftKey;
}
this.dispatchAction(_c7a?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c7d=this.getDescendantBindingsByLocalName("treenode");
_c7d.each(function(_c7e){
_c7e.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c7f){
var _c80=_c7f.getAttribute("focused");
if(_c80=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c81){
var _c82=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c81);
return UserInterface.registerBinding(_c82,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c83){
var _c84=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c83);
return UserInterface.registerBinding(_c84,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c85){
this.bindingElement.style.left=_c85.x+"px";
this.bindingElement.style.top=_c85.y+"px";
this._geometry.x=_c85.x;
this._geometry.y=_c85.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c86){
var _c87=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c86);
return UserInterface.registerBinding(_c87,TreePositionIndicatorBinding);
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
this.addFilter(function(_c89){
var _c8a=UserInterface.getBinding(_c89);
var _c8b=null;
var _c8b=null;
if(!_c8a instanceof TreeNodeBinding){
_c8b=NodeCrawler.SKIP_NODE;
}
return _c8b;
});
this.addFilter(function(_c8c,list){
var _c8e=UserInterface.getBinding(_c8c);
var _c8f=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c8e.isOpen){
list.add(_c8e);
}
break;
}
return _c8f;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c90){
this.binding=_c90;
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
DockTabsButtonBinding.newInstance=function(_c91){
var _c92=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c91);
_c92.setAttribute("type","checkbox");
_c92.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c92.className="tabbutton";
return UserInterface.registerBinding(_c92,DockTabsButtonBinding);
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
var _c93=DockBinding.superclass.serialize.call(this);
if(_c93){
_c93.active=this.isActive?true:null;
_c93.collapsed=this.isCollapsed?true:null;
}
return _c93;
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
var _c94=UserInterface.getBinding(this.bindingElement.parentNode);
var _c95=MatrixBinding.newInstance(this.bindingDocument);
_c95.attachClassName("dockliner");
this.shadowTree.dockLiner=_c95;
_c94.add(_c95);
_c95.attach();
_c95.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c97){
var _c98=this.getSelectedTabPanelBinding();
if(_c98){
_c98.isVisible=_c97;
_c98.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c99){
var _c9a=this._getBindingForDefinition(_c99);
var _c9b=DockTabBinding.newInstance(this.bindingDocument);
_c9b.setHandle(_c99.handle);
_c9b.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c99.label);
_c9b.setImage(_c99.image);
_c9b.setToolTip(_c99.toolTip);
_c9b.setEntityToken(_c99.entityToken);
_c9b.setAssociatedView(_c9a);
this.appendTabByBindings(_c9b,null);
this._setupPageBindingListeners(_c9b);
var _c9c=this.getTabPanelBinding(_c9b);
_c9a.snapToBinding(_c9c);
var _c9d=this.bindingWindow.bindingMap.views;
_c9d.add(_c9a);
if(!this.isActive){
this.activate();
}
_c9a.attach();
};
DockBinding.prototype.prepareOpenView=function(_c9e,_c9f){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c9f.setLabel(_c9e.label);
_c9f.setImage(_c9e.image);
_c9f.setToolTip(_c9e.toolTip);
this._setupPageBindingListeners(_c9f);
var _ca0=this.getTabPanelBinding(_c9f);
var _ca1=this._getBindingForDefinition(_c9e);
_c9f.setAssociatedView(_ca1);
_ca1.snapToBinding(_ca0);
UserInterface.getBinding(this.bindingDocument.body).add(_ca1);
_ca1.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_ca2){
var _ca3=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_ca3.bindingDocument);
view.setDefinition(_ca2);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_ca5){
var _ca6=this.getTabPanelBinding(_ca5);
var self=this;
var _ca8={handleAction:function(_ca9){
var _caa=_ca9.target;
switch(_ca9.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_caa.reflex(true);
var view=_ca5.getAssociatedView();
if(_caa.bindingWindow==view.getContentWindow()){
_ca5.updateDisplay(_caa);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_ca5.onPageInitialize(_caa);
_ca9.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_ca5.updateDisplay(_caa);
_ca9.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_ca5.updateEntityToken(_caa);
_ca9.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_ca5.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_ca5.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_ca5);
_ca9.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_ca5,true);
_ca9.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_ca5);
break;
case Binding.ACTION_FORCE_REFLEX:
_ca6.reflex(true);
_ca9.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_ca5.isDirty){
_ca5.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_cac){
_ca6.addActionListener(_cac,_ca8);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_cad){
DockBinding.superclass.handleAction.call(this,_cad);
var _cae=_cad.target;
switch(_cad.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_cad.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_cae instanceof DockBinding){
if(_cae.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_cae);
if(this.isActive){
_cae.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_cae);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_caf,arg){
DockBinding.superclass.handleBroadcast.call(this,_caf,arg);
switch(_caf){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _cb1=arg;
if(_cb1.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_cb1.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_cb2){
var tabs=this.getTabBindings();
var _cb4=false;
while(tabs.hasNext()&&!_cb4){
var tab=tabs.getNext();
var _cb6=tab.getEntityToken();
if(_cb6!=null&&_cb6==_cb2){
if(!tab.isSelected){
this.select(tab,true);
_cb4=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cb7){
this._handleCollapse(true,_cb7);
};
DockBinding.prototype.unCollapse=function(_cb8){
this._handleCollapse(false,_cb8);
};
DockBinding.prototype._handleCollapse=function(_cb9,_cba){
var _cbb=this.getChildBindingByLocalName("dockpanels");
var _cbc=this.getAncestorBindingByLocalName("splitbox");
if(_cb9){
_cbb.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cba&&_cbc.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cbb.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cba){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cb9);
this.isCollapsed=_cb9;
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
DockBinding.prototype.closeTab=function(_cc1,_cc2){
if(_cc1.isDirty&&!_cc2){
var _cc3=Resolver.resolve(_cc1.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cc3),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cc5){
switch(_cc5){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cc1);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cc1);
break;
}
}});
}else{
this.removeTab(_cc1);
}
};
DockBinding.prototype.closeTabsExcept=function(_cc6){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cc6){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cc9){
var _cca=_cc9.getAssociatedView();
_cca.saveContainedEditor();
var self=this;
var _ccc={handleBroadcast:function(_ccd,arg){
switch(_ccd){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cca.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ccc);
if(arg.isSuccess){
self.removeTab(_cc9);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ccc);
};
DockBinding.prototype.appendTabByBindings=function(_ccf,_cd0){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_ccf,_cd0);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cd1){
_cd1=_cd1?_cd1+"px":"100%";
this.bindingElement.style.width=_cd1;
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
DockBinding.prototype.showControls=function(_cd2){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cd2){
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
var _cd5=DockControlBinding.newInstance(this.bindingDocument);
_cd5.setControlType(type);
return _cd5;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cd7=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cd7)){
_cd7=_cd7>0?_cd7-1:0;
self.bindingElement.style.width=new String(_cd7)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cd8){
DockTabsBinding.superclass.handleCrawler.call(this,_cd8);
switch(_cd8.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
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
};
DockTabsBinding.newInstance=function(_cdb){
var _cdc=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cdb);
return UserInterface.registerBinding(_cdc,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cdd){
this._viewBinding=_cdd;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cde=DockTabBinding.superclass.serialize.call(this);
if(_cde){
_cde.label=null;
_cde.image=null;
_cde.handle=this.getHandle();
}
return _cde;
};
DockTabBinding.prototype.setHandle=function(_cdf){
this.setProperty("handle",_cdf);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_ce0){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_ce0;
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
var _ce1=DialogControlBinding.newInstance(this.bindingDocument);
_ce1.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_ce1);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_ce2){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_ce2){
this.isDirty=_ce2;
if(Binding.exists(this.labelBinding)){
var _ce3=this.labelBinding.getLabel();
if(_ce3!=null){
this.labelBinding.setLabel(_ce2?"*"+_ce3:_ce3.slice(1,_ce3.length));
}else{
this.labelBinding.setLabel(_ce2?"*":"");
}
}
}
var _ce4=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_ce4.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_ce4.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_ce5){
this.setLabel(_ce5.getLabel());
this.setImage(_ce5.getImage());
this.setToolTip(_ce5.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_ce6){
this.setEntityToken(_ce6.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_ce7){
DockTabBinding.superclass.handleAction.call(this,_ce7);
var _ce8=_ce7.target;
switch(_ce7.type){
case ControlBinding.ACTION_COMMAND:
if(_ce8.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_ce7.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_ce8);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_ce9){
var cmd=_ce9.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_ceb){
if(!_ceb){
if(!this.getLabel()){
_ceb=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_ceb=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_ceb);
};
DockTabBinding.prototype.setImage=function(_cec){
if(!_cec){
if(!this.getImage()){
_cec=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cec=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cec);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _cef=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_cef;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_cef;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_cef;
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
var _cf1=this.bindingElement;
setTimeout(function(){
_cf1.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_cf2,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_cf2,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_cf2){
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
DockTabBinding.prototype.select=function(_cf7){
DockTabBinding.superclass.select.call(this,_cf7);
this._updateBroadcasters();
if(_cf7!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cf8=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cf9=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cf9.enable();
if(this.isDirty){
_cf8.enable();
}else{
_cf8.disable();
}
}else{
_cf9.disable();
_cf8.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cfa){
if(this._canUpdateTree||_cfa){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cfb=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cfd=win.bindingMap.savebutton;
if(_cfd!=null){
_cfb=true;
}
}
}
return _cfb;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cfe){
var _cff=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cfe);
return UserInterface.registerBinding(_cff,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_d00){
var _d01=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_d00);
return UserInterface.registerBinding(_d01,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_d02){
DockPanelBinding.superclass.select.call(this,_d02);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_d03){
DockPanelBinding.superclass.handleCrawler.call(this,_d03);
if(_d03.response==null){
if(_d03.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_d03.id==FocusCrawler.ID){
_d03.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_d04){
var _d05=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_d04);
return UserInterface.registerBinding(_d05,DockPanelBinding);
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
DockControlBinding.newInstance=function(_d06){
var _d07=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_d06);
return UserInterface.registerBinding(_d07,DockControlBinding);
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
ViewBinding.getInstance=function(_d08){
var _d09=ViewBinding._instances.get(_d08);
if(!_d09){
var cry="ViewBinding.getInstance: No such instance: "+_d08;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d09;
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
var _d0c=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d0c){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d0d=snap.boxObject.getGlobalPosition();
var _d0e=snap.boxObject.getDimension();
if(!Point.isEqual(_d0d,this._lastknownposition)){
this.setPosition(_d0d);
this._lastknownposition=_d0d;
}
if(!Dimension.isEqual(_d0e,this._lastknowndimension)){
this.setDimension(_d0e);
this._lastknowndimension=_d0e;
var _d0f=_d0e.h-ViewBinding.VERTICAL_ADJUST;
_d0f=_d0f<0?0:_d0f;
this.windowBinding.getBindingElement().style.height=new String(_d0f)+"px";
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
var _d10=this._viewDefinition.flowHandle;
if(_d10!=null){
FlowControllerService.CancelFlow(_d10);
}
}
if(this._viewDefinition!=null){
var _d11=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d11);
this.logger.fine("ViewBinding closed: \""+_d11+"\"");
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
var _d13=null;
if(this._viewDefinition!=null){
_d13=this._viewDefinition.handle;
}
return _d13;
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
ViewBinding.prototype.setDefinition=function(_d14){
this._viewDefinition=_d14;
if(_d14.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d15){
ViewBinding.superclass.handleAction.call(this,_d15);
var _d16=_d15.target;
switch(_d15.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d15.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d16.isActivated){
_d16.onActivate();
}
}
_d15.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d16==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d15.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d16==this._snapBinding){
if(_d16.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d16.getContentWindow().isPostBackDocument){
if(_d15.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d16.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d16==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d16.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d15.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d15.type==WindowBinding.ACTION_ONLOAD){
var win=_d16.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d16);
}
}
}
_d15.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d16.label&&this._viewDefinition.label){
_d16.label=this._viewDefinition.label;
}
if(!_d16.image&&this._viewDefinition.image){
_d16.image=this._viewDefinition.image;
}
if(_d16.bindingWindow==this.getContentWindow()){
this._pageBinding=_d16;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d16.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d16==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d15.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d15.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d1b,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d1b,arg);
switch(_d1b){
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
var _d1f=def.argument;
if(_d1f!=null){
page.setPageArgument(_d1f);
}
var _d20=def.width;
if(_d20!=null){
page.width=_d20;
}
var _d21=def.height;
if(_d21!=null){
page.height=_d21;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d22){
ViewBinding.superclass.handleCrawler.call(this,_d22);
switch(_d22.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d22.id==FocusCrawler.ID){
if(_d22.previousNode!=this._snapBinding.bindingElement){
_d22.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d22.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d23){
_d23.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d23.x+"px";
this.bindingElement.style.top=_d23.y+"px";
};
ViewBinding.prototype.setDimension=function(_d24){
_d24.h-=ViewBinding.VERTICAL_ADJUST;
_d24.w-=ViewBinding.HORIZONTAL_ADJUST;
_d24.w-=1;
if(_d24.h<0){
_d24.h=0;
}
if(_d24.w<0){
_d24.w=0;
}
this.bindingElement.style.width=String(_d24.w)+"px";
this.bindingElement.style.height=String(_d24.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d25){
this.isFlexBoxBehavior=false;
_d25.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d25.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d25.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d25;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d26=null;
if(this.isFreeFloating==true){
_d26=this._snapBinding.getBindingElement();
}else{
_d26=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d26;
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
ViewBinding.prototype.reload=function(_d27){
this._isLoaded=false;
this.windowBinding.reload(_d27);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d28=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d28=true;
}
}
if(!_d28){
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
ViewBinding.newInstance=function(_d2c){
var _d2d=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d2c);
var _d2e=UserInterface.registerBinding(_d2d,ViewBinding);
_d2e.windowBinding=_d2e.add(WindowBinding.newInstance(_d2c));
_d2e.windowBinding.isFlexible=false;
return _d2e;
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
var _d36=this.bindingWindow.__doPostBack;
var _d37=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d37){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d38,_d39){
if(!form.__isSetup){
Application.lock(self);
_d37=true;
}
self.manifestAllDataBindings();
_d36(_d38,_d39);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d3a,list){
var _d3c=this.bindingWindow.bindingMap.__REQUEST;
if(_d3c!=null&&this._isDotNet()){
switch(_d3a){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d3c.postback(_d3a);
}
}
break;
default:
_d3c.postback(_d3a);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d3a,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d3d,list){
var _d3f=this.getDescendantBindingsByType(WindowBinding);
_d3f.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d3d,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d43){
if(_d43.name==null||_d43.name==""){
return;
}
list.add({name:_d43.name,value:_d43.value});
});
var out="";
list.each(function(_d45){
out+=_d45.name+": "+_d45.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d46){
PageBinding.superclass.handleAction.call(this,_d46);
var _d47=_d46.target;
switch(_d46.type){
case RootBinding.ACTION_PHASE_3:
if(_d47==UserInterface.getBinding(this.bindingDocument.body)){
_d47.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d47);
}
_d46.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d48=this.validateAllDataBindings();
if(_d48){
this.doPostBack(_d47);
}
}
_d46.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d46.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d47.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d47.key)){
this._initBlockers.del(_d47.key);
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
var _d4a={handleAction:function(_d4b){
if(_d4b.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d4a);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d4a);
}else{
MessageQueue.udpdate();
}
_d46.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d4c,arg){
PageBinding.superclass.handleBroadcast.call(this,_d4c,arg);
switch(_d4c){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d4e=arg;
if(!this._canPostBack&&!_d4e){
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
PageBinding.prototype.doPostBack=function(_d50){
if(this._canPostBack){
if(_d50!=null&&this._isDotNet()){
var _d51=_d50.getCallBackID();
var _d52=_d50.getCallBackArg();
if(_d51!=null){
_d51=_d51.replace(/_/g,"$");
}else{
_d51="";
}
if(_d52==null){
_d52="";
}
this.bindingWindow.__doPostBack(_d51,_d52);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d53){
var _d54=true;
var _d55=this.bindingWindow.DataManager.getAllDataBindings();
while(_d55.hasNext()&&_d54){
var _d56=_d55.getNext();
if(_d56.isAttached){
var _d57=_d56.validate();
if(_d54&&!_d57){
_d54=false;
this.logger.debug("Invalid DataBinding: "+_d56.toString()+" ("+_d56.getName()+")");
if(_d53){
var _d58=_d56.getAncestorBindingByType(TabPanelBinding);
if(_d58!=null&&!_d58.isVisible){
var _d59=_d58.getAncestorBindingByType(TabBoxBinding);
var _d5a=_d59.getTabBinding(_d58);
_d59.select(_d5a);
}
}
break;
}
}
}
return _d54;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d5c=this.bindingWindow.DataManager.getAllDataBindings();
while(_d5c.hasNext()){
var _d5d=_d5c.getNext();
if(_d5d.isAttached){
var _d5e=_d5d.manifest();
if(_d5e!=null){
list.add(_d5e);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d5f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d5f.hasNext()){
var _d60=_d5f.getNext();
if(_d60.isAttached){
_d60.clean();
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
var _d62=this._cachedFocus.getBinding();
if(_d62){
_d62.blur();
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
var _d63=this.getProperty("width");
if(!_d63){
_d63=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d63;
}
if(this.height==null){
var _d64=this.getProperty("height");
this.height=_d64?_d64:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d65=this.getProperty("minheight");
if(_d65!=null){
this.minheight=_d65;
}
}
if(this.controls==null){
var _d66=this.getProperty("controls");
this.controls=_d66?_d66:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d67=this.getProperty("resizable");
this.isResizable=_d67?_d67:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d68){
if(_d68!=this.isAutoHeightLayoutMode){
if(_d68){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d68;
}
};
DialogPageBinding.prototype.handleAction=function(_d69){
DialogPageBinding.superclass.handleAction.call(this,_d69);
var _d6a=_d69.target;
switch(_d69.type){
case PageBinding.ACTION_ATTACHED:
if(_d6a!=this&&_d6a.isFitAsDialogSubPage){
_d6a.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d69.consume();
if(_d6a.response!=null){
this.response=_d6a.response;
switch(_d6a.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d6b){
var _d6c=this.bindingWindow.bindingMap.buttonAccept;
if(_d6c!=null){
_d6c.setDisabled(_d6b);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d6d){
var _d6e=CSSComputer.getPadding(this.bindingElement);
var _d6f=CSSComputer.getBorder(this.bindingElement);
_d6d+=_d6e.top+_d6e.bottom;
_d6d+=_d6f.top+_d6f.bottom;
if(_d6d>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d6d+"px";
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
EditorPageBinding.prototype.handleAction=function(_d77){
EditorPageBinding.superclass.handleAction.call(this,_d77);
var _d78=_d77.target;
switch(_d77.type){
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
var _d79=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d78.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d79==-1){
_d79=0;
}
}else{
_d79++;
}
return res;
});
if(_d79>-1){
this._messengers.del(_d79);
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
_d77.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d78.key,_d78);
if(_d78 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d78.key);
if(_d78 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d78==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d78.getSelectedTabBinding();
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
_d77.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d78==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d77.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d78==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d77.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d78==this._windowBinding){
if(_d78.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d7e=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d7e);
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
var _d7f=this.bindingWindow.bindingMap.savebutton;
if(_d7f!=null&&!_d7f.isDisabled){
_d7f.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d80=this.bindingWindow.bindingMap.__REQUEST;
if(_d80!=null){
_d80.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d81=this.bindingWindow.bindingMap.__REQUEST;
if(_d81!=null){
_d81.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d82){
this._message=null;
switch(_d82){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d82,this._messengers);
if(!this._messengers.hasEntries()){
if(_d82==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d82;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d82;
EditorPageBinding.superclass.postMessage.call(this,_d82,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d82,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d83,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d83,arg);
switch(_d83){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d85=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d85);
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
var _d86=new List();
this._invalidBindings.each(function(key,_d88){
var list=_d88.getInvalidLabels();
if(list){
list.each(function(_d8a){
_d86.add(_d8a);
});
}
});
if(_d86.hasEntries()){
var _d8b="";
while(_d86.hasNext()){
_d8b+=_d86.getNext().toLowerCase();
if(_d86.hasNext()){
_d8b+=", ";
}else{
_d8b+=".";
}
}
var _d8c=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d8c+" "+_d8b);
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
EditorPageBinding.prototype.enableSave=function(_d8d){
var _d8e=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d8e){
var _d8f=UserInterface.getBinding(_d8e);
if(_d8d){
_d8f.enable();
}else{
_d8f.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d90=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d90!=null){
UserInterface.getBinding(_d90).enable();
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
var _d91=this._windowBinding.getContentDocument().title;
if(_d91==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d92=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d94){
if(_d94.name=="__EVENTTARGET"&&_d92){
_d94.value=_d92;
}
list.add({name:_d94.name,value:_d94.value});
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
WizardPageBinding.prototype.handleAction=function(_d96){
WizardPageBinding.superclass.handleAction.call(this,_d96);
var _d97=_d96.target;
switch(_d96.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d97);
}else{
_d96.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d97);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d96.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d96.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d98){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d9a=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d98);
}
if(_d9a){
_d9a.setDisabled(!_d98);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d9b,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d9b,arg);
var self=this;
switch(_d9b){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d9f){
};
MarkupAwarePageBinding.prototype._activate=function(_da0){
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
var _da1=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_da1.boxObject.getDimension().w;
_da1.hide();
var _da2=this.boxObject.getDimension().h;
this.bindingElement.style.height=_da2+"px";
var self=this;
var _da4=this.bindingWindow.bindingMap.moreactionsbutton;
_da4.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_da5){
self._showMoreActions();
_da5.consume();
}});
var _da6=this.bindingWindow.bindingMap.moreactionspopup;
_da6.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_da7){
var item=_da7.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_da9,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_da9,arg);
switch(_da9){
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
var _dad=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_dad!=null){
_dad.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _dae=this.bindingWindow.WindowManager;
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
var _daf=new String("");
this._actionProfile.each(function(_db0,list){
list.each(function(_db2){
_daf+=_db2.getHandle()+";"+_db2.getKey()+";";
if(_db2.isDisabled()){
_daf+="isDisabled='true';";
}
});
});
return _daf;
};
SystemToolBarBinding.prototype.handleAction=function(_db3){
SystemToolBarBinding.superclass.handleAction.call(this,_db3);
switch(_db3.type){
case ButtonBinding.ACTION_COMMAND:
var _db4=_db3.target;
this._handleSystemAction(_db4.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_db5){
if(_db5!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _db7=list.getFirst();
var _db8=_db7.node;
}
SystemAction.invoke(_db5,_db8);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_dbb,list){
var _dbd=new List();
list.reset();
while(list.hasNext()){
var _dbe=list.getNext();
var _dbf=null;
if(_dbe.isInToolBar()){
if(_dbe.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_dbf=self.getToolBarButtonBinding(_dbe);
}
}
if(_dbf!=null){
_dbd.add(_dbf);
}
}
if(_dbd.hasEntries()){
var _dc0=ToolBarGroupBinding.newInstance(doc);
_dbd.each(function(_dc1){
_dc0.add(_dc1);
});
self.addLeft(_dc0);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _dc2=this.bindingWindow.bindingMap.toolsbutton;
var _dc3=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dc4=_dc2.bindingElement.offsetLeft-this._moreActionsWidth;
var _dc5=0;
var _dc6=new List();
var _dc7,_dc8=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dc7=_dc8.getNext())!=null){
if(!_dc7.isVisible){
_dc7.show();
}
_dc5+=_dc7.boxObject.getDimension().w;
if(_dc5>=_dc4){
_dc6.add(_dc7);
_dc7.hide();
}
}
if(_dc6.hasEntries()){
var _dc9=_dc6.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dc9).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dc7=_dc6.getNext())!=null){
this._moreActions.add(_dc7.associatedSystemAction);
}
_dc3.show();
}else{
this._moreActions=null;
_dc3.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dca=this.bindingWindow.bindingMap.moreactionspopup;
_dca.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dca.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dca.add(item);
}
_dca.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dcc){
var _dcd=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dce=_dcc.getLabel();
var _dcf=_dcc.getToolTip();
var _dd0=_dcc.getImage();
var _dd1=_dcc.isDisabled();
if(_dd0&&_dd0.indexOf("size=")==-1){
_dd0=_dd0+"&size="+this.getImageSize();
_dcd.imageProfile=new ImageProfile({image:_dd0});
}
if(_dce){
_dcd.setLabel(_dce);
}
if(_dcf){
_dcd.setToolTip(_dcf);
}
if(_dcc.isDisabled()){
_dcd.disable();
}
_dcd.associatedSystemAction=_dcc;
return _dcd;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dd2=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dd2!=null){
_dd2.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dd3){
var _dd4=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dd3);
return UserInterface.registerBinding(_dd4,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dd5){
var _dd6=SystemTreeBinding.superclass.add.call(this,_dd5);
if(!this._defaultTreeNode){
if(_dd5 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dd5;
}
}
return _dd6;
};
SystemTreeBinding.prototype.handleAction=function(_dd7){
SystemTreeBinding.superclass.handleAction.call(this,_dd7);
var _dd8=_dd7.target;
switch(_dd7.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_dd8.key);
this._updateFocusedNode();
_dd7.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dd7.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_dd8.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dd7.consume();
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
var _dda=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_dda);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_ddb){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_ddb);
var reg=this._entityTokenRegistry;
var _ddd=_ddb.node.getEntityToken();
if(reg.has(_ddd)){
reg.get(_ddd).add(_ddb);
}else{
reg.set(_ddd,new List([_ddb]));
}
var _dde=null;
if(this.isLockedToEditor){
if(_ddd==StageBinding.entityToken){
if(_ddb.node.isTreeLockEnabled()){
_dde=_ddb;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_ddb.node.getHandle()){
_dde=_ddb;
}
}
}
if(_dde!=null){
this.focusSingleTreeNodeBinding(_dde);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_ddf){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_ddf);
var reg=this._entityTokenRegistry;
var _de1=_ddf.node.getEntityToken();
if(reg.has(_de1)){
var list=reg.get(_de1);
list.del(_ddf);
if(!list.hasEntries()){
reg.del(_de1);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_ddf.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_ddf.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _de5=this._refreshingTreeNodes;
if(_de5.hasEntries()&&_de5.has(key)){
_de5.del(key);
if(!_de5.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _de6=StageBinding.entityToken;
if(_de6!=null){
this._focusTreeNodeByEntityToken(_de6);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _de7=false;
var _de8=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_de7=false;
}else{
if(_de8.hasEntries()){
_de7=true;
while(_de7&&_de8.hasNext()){
var _de9=_de8.getNext();
if(!_de9.isDraggable){
_de7=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_de7;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_dea,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_dea,arg);
switch(_dea){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_dea,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_dea);
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
var self=this,_dee=arg;
setTimeout(function(){
if(_dee!=null){
self._focusTreeNodeByEntityToken(_dee);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _df0=tab.perspectiveNode==null;
if(!_df0){
_df0=tab.perspectiveNode==this.perspectiveNode;
}
if(_df0){
var self=this,_df2=tab.getEntityToken();
setTimeout(function(){
if(_df2==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_df2);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_df3,_df4){
this.isLockFeatureFocus=true;
var _df5=null;
if(this._entityTokenRegistry.has(_df3)){
var list=this._entityTokenRegistry.get(_df3);
list.each(function(tn){
var _df8=true;
if(tn.node.isTreeLockEnabled()){
_df5=tn;
_df8=false;
}
return _df8;
});
if(_df5!=null){
if(!_df5.isFocused){
this.focusSingleTreeNodeBinding(_df5,true);
}else{
_df5.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_df5==null&&_df4!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_df3);
self._focusTreeNodeByEntityToken(_df3,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_dfa){
var _dfb=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _dfc=this.getRootTreeNodeBindings();
while(_dfc.hasNext()){
var _dfd=_dfc.getNext();
_dfb.add(_dfd.node.getEntityToken());
}
}else{
_dfb.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_dfb.hasNext()){
var _dfe=_dfb.getNext();
var _dff=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_dfe,_dfa,_dff);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _e02=this._treeNodeBindings;
var _e03=new Map();
function fix(_e04,list){
if(!_e04.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_e02.has(node.getHandle())){
var _e07=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_e03.set(node.getHandle(),_e07);
_e04.add(_e07);
}
});
_e04.attachRecursive();
}
}
_e04.open(true);
}
map.each(function(_e08,list){
if(_e02.has(_e08)){
var _e0a=_e02.get(_e08);
fix(_e0a,list);
}else{
if(_e03.has(_e08)){
var _e0b=_e03.get(_e08);
fix(_e0b,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e0c,arg){
switch(_e0c){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e0e=arg;
if(_e0e!=null){
this._invokeServerRefresh(_e0e);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e0f=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e0f;
_e0f.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e0f=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e0f;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e10){
if(_e10!=null&&_e10=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e10)){
var list=this._entityTokenRegistry.get(_e10).reset();
this._refreshToken=_e10;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e12=list.getNext();
this._refreshingTreeNodes.set(_e12.key,true);
setTimeout(function(){
_e12.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e13=this.getFocusedTreeNodeBindings().getFirst();
if(_e13){
var _e14=_e13.getLabel();
var _e15=_e13.getAncestorBindingByLocalName("treenode");
if(_e15){
_e13=_e15;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e13.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e16=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e16,[_e14]);
}
_e13.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e17=SystemTreeBinding.clipboard;
if(_e17){
var type=_e17.dragType;
var _e19=this.getFocusedTreeNodeBindings().getFirst();
if(_e19.dragAccept){
if(_e19.acceptor.isAccepting(type)){
this._performPaste(_e19);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e1a){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e1a.node.hasDetailedDropSupport()){
if(_e1a.node.hasChildren()){
var _e1c=_e1a.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e1d,_e1e){
if(_e1d==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e1f=_e1e.get("switch");
var _e20=_e1e.get("sibling");
if(_e1f=="after"){
_e20++;
}
var _e21=_e1a.accept(SystemTreeBinding.clipboard,_e20);
if(_e21){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e1c);
}else{
Application.lock(self);
var _e22=_e1a.accept(SystemTreeBinding.clipboard,0);
if(_e22){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e22=_e1a.accept(SystemTreeBinding.clipboard,0);
if(_e22){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e23=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e23!=null){
this._focusTreeNodeByEntityToken(_e23);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
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
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f04){
if(_f04.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f04);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f06){
switch(_f06.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f06.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f06.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f07){
var _f08=_f07.label;
var _f09=_f07.image;
var _f0a=_f07.width;
var _f0b=_f07.height;
var _f0c=_f07.controls;
var _f0d=_f07.isResizable;
if(_f08){
this.setLabel(_f08);
}
if(_f09){
this.setImage(_f09);
}
if(_f0a||_f0b){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f0a?_f0a:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f0b!=null&&_f0b!="auto")?_f0b:old.h;
this.setDimension(nev);
}
if(_f0c){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f11=new List(_f0c.split(" "));
while((type=_f11.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f0d!=this._isResizable){
this.setResizable(_f0d);
}
if(_f0b=="auto"){
this._fixAutoHeight(_f07);
}
if(_f07==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f12){
var dim=this.getDimension();
var _f14=0;
var _f15=0;
if(_f12.isDialogSubPage){
_f12=this._pageBinding;
}
if(this._isFirstPage){
_f14=_f12.width!=null?_f12.width:dim.w;
}else{
_f14=dim.w;
}
_f15=_f12.bindingElement.offsetHeight;
_f15+=this._titlebar.bindingElement.offsetHeight;
_f15+=4;
if(_f15<dim.h){
_f15=dim.h;
}
if(_f12.minheight!=null){
if(_f15<_f12.minheight){
_f15=_f12.minheight;
}
}
this.setDimension(new Dimension(_f14,_f15));
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
StageDialogBinding.newInstance=function(_f18){
var _f19=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f18);
var _f1a=UserInterface.registerBinding(_f19,StageDialogBinding);
_f1a.setProperty("controls","minimize maximize close");
return _f1a;
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
this.addFilter(function(_f1b,list){
var _f1d=null;
var _f1e=UserInterface.getBinding(_f1b);
if(!_f1e.isVisible){
_f1d=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f1d;
});
this.addFilter(function(_f1f,list){
var _f21=null;
var _f22=UserInterface.getBinding(_f1f);
if(_f22.isAttached){
if(Interfaces.isImplemented(IFit,_f22)){
if(!_f22.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f22);
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
StageDecksBinding.prototype.mountDefinition=function(_f23){
var _f24=StageDeckBinding.newInstance(this.bindingDocument);
_f24.handle=_f23.handle;
_f24.perspectiveNode=_f23.node;
this._decks[_f24.handle]=_f24;
this.add(_f24);
_f24.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f25){
var _f26=this._decks[_f25];
StageBinding.perspectiveNode=_f26.perspectiveNode;
this.select(_f26);
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
StageDeckBinding.prototype.handleAction=function(_f27){
StageDeckBinding.superclass.handleAction.call(this,_f27);
var _f28=_f27.target;
switch(_f27.type){
case WindowBinding.ACTION_LOADED:
if(_f28==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f27.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f28 instanceof DockBinding){
this._dockBindings.set(_f28.reference,_f28);
_f28.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f27.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f27.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f27);
StageDeckBinding.superclass.handleAction.call(this,_f27);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f2a=new StageCrawler();
_f2a.mode=mode;
_f2a.crawl(this.windowBinding.getContentDocument().body);
_f2a.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f2b){
return this._dockBindings.get(_f2b);
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
StageDeckBinding.newInstance=function(_f2d){
var _f2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f2d);
var _f2f=UserInterface.registerBinding(_f2e,StageDeckBinding);
return _f2f;
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
StageSplitBoxBinding.prototype.handleAction=function(_f30){
StageSplitBoxBinding.superclass.handleAction.call(this,_f30);
StageBoxAbstraction.handleAction.call(this,_f30);
var _f31=_f30.target;
var _f32=null;
var _f33=null;
switch(_f30.type){
case DockBinding.ACTION_EMPTIED:
_f33=this.getChildBindingByLocalName("splitter");
if(_f33.isVisible){
_f33.hide();
}
_f32=this.getDescendantBindingsByLocalName("dock");
if(_f32.getFirst().isEmpty&&_f32.getLast().isEmpty){
if(_f32.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f30.consume();
break;
case DockBinding.ACTION_OPENED:
_f32=this.getDescendantBindingsByLocalName("dock");
if(!_f32.getFirst().isEmpty&&!_f32.getLast().isEmpty){
_f33=this.getChildBindingByLocalName("splitter");
if(!_f33.isVisible){
_f33.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f30.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f31!=this){
_f33=this.getChildBindingByLocalName("splitter");
if(_f33.isVisible){
_f33.hide();
}
this.invokeLayout();
_f30.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f31!=this){
var _f34=this.getChildBindingsByLocalName("splitpanel");
if(_f34.getFirst().isVisible&&_f34.getLast().isVisible){
_f33=this.getChildBindingByLocalName("splitter");
if(!_f33.isVisible){
_f33.show();
}
}
this.invokeLayout();
_f30.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f35){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f35);
switch(_f35.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f35.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f36=this.getChildBindingsByLocalName("splitpanel");
return _f36.getFirst().isVisible&&_f36.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f37=this.getChildBindingsByLocalName("splitpanel");
return _f37.getFirst().isFixed&&_f37.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f38){
StageSplitPanelBinding.superclass.handleAction.call(this,_f38);
StageBoxAbstraction.handleAction.call(this,_f38);
switch(_f38.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f38.type==StageSplitBoxBinding.ACTION_HIDE){
_f38.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f38.type==DockBinding.ACTION_EMPTIED){
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
if(_f38.type==StageSplitBoxBinding.ACTION_SHOW){
_f38.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f3b=_f38.target;
if(_f3b!=this&&_f3b.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f3c=_f3b._containingSplitBoxBinding;
if(_f3c.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f3d=_f3c.getChildBindingsByLocalName("splitpanel");
var _f3e=_f3d.getFirst();
var _f3f=_f3d.getLast();
if(this.isFixed==true){
if(!_f3e.isFixed||!_f3f.isFixed||(!_f3c.hasBothPanelsVisible()&&_f3b.isMinimizedForReal)){
this.setFix(false);
_f38.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f3c.hasBothPanelsFixed()||(!_f3c.hasBothPanelsVisible()&&_f3b.isMinimizedForReal)){
this.setFix(_f3b.getContainedDock().getHeight());
_f38.consume();
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
var _f40=this.getContainedDock();
if(_f40){
if(this.isMaximizePrepared==true){
}else{
_f40.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f41=this.getContainedDock();
if(_f41){
if(_f41.type==DockBinding.TYPE_EDITORS){
if(_f41.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f41.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f42=this.getContainedDock();
if(_f42){
_f42.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f42);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f43=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f44=this.getContainedDock();
if(_f44){
_f44.collapse(_f43);
if(!_f43){
this.setFix(_f44.getHeight());
}else{
this.setFix(_f44.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f44&&_f44.isActive){
_f44.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f44);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f45){
var _f46=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f47=this.getContainedDock();
if(_f47){
if(this.isMinimized==true){
_f47.unCollapse(_f46);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f45){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f47){
_f47.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f47);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f48){
var _f49=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f49=false;
}
}
if(_f49==true){
this._invisibilize(_f48);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f4b){
if(_f4b!=this._isInvisibilized){
if(_f4b){
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
StageSplitterBinding.prototype.onDragStart=function(_f4c){
var _f4d=top.app.bindingMap.stagesplittercover;
var _f4e=this._containingSplitBoxBinding.getOrient();
switch(_f4e){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f4d.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f4d.bindingElement.style.cursor="n-resize";
break;
}
_f4d.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f4e);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f54){
this._orient=_f54;
this.attachClassName(_f54);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f56=true;
var _f57=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f57=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f56=false;
break;
}
if(_f56){
this.bindingElement.style.left=pos.x+"px";
}
if(_f57){
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
StageBoxAbstraction.handleAction=function(_f59){
switch(_f59.type){
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
if(_f59.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f59.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f5a=this.bindingElement.style;
_f5a.position="absolute";
_f5a.width="100%";
_f5a.height="100%";
_f5a.top="0";
_f5a.left="0";
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
var _f5b=this.bindingElement.style;
_f5b.position="relative";
_f5b.width="auto";
_f5b.height="auto";
_f5b.top="auto";
_f5b.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f5c,_f5d){
var _f5e=_f5c.bindingElement.style;
var _f5f=_f5c.bindingElement.parentNode;
var box=_f5c._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f5d){
_f5c._unmodifiedFlexMethod=_f5c.flex;
_f5c.flex=function(){
_f5e.width=_f5f.offsetWidth+"px";
_f5e.height=_f5f.offsetHeight+"px";
};
}else{
_f5e.width="100%";
_f5e.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f5e.width="auto";
_f5e.height="auto";
box.reflex(true);
},0);
}
_f5c.flex=_f5c._unmodifiedFlexMethod;
_f5c._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f61){
var _f62=_f61.target;
switch(_f61.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f62 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f61);
_f61.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f61.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f63){
var mode=null;
switch(_f63.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f65){
StageMenuBarBinding.superclass.handleAction.call(this,_f65);
switch(_f65.type){
case MenuItemBinding.ACTION_COMMAND:
var _f66=_f65.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f66){
SystemAction.invoke(_f66,this._rootNode);
}
}
_f65.consume();
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
var _f67=this.getProperty("handle");
if(_f67){
this._handle=_f67;
if(StageBinding.isViewOpen(_f67)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f67);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f69){
this.setProperty("handle",_f69);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f6a,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f6a,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f6a){
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
StageViewMenuItemBinding.newInstance=function(_f6c){
var _f6d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f6c);
UserInterface.registerBinding(_f6d,StageViewMenuItemBinding);
return UserInterface.getBinding(_f6d);
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
StageStatusBarBinding.prototype.setLabel=function(_f6e){
this._label.setLabel(_f6e);
};
StageStatusBarBinding.prototype.setImage=function(_f6f){
this._label.setImage(_f6f);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f70){
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
var _f71=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f72=_f71.getAssociatedView();
var _f73=_f72.getContentWindow().bindingMap.tree;
var _f74=_f73.getFocusedTreeNodeBindings();
if(!_f74.hasEntries()&&StageBinding.treeSelector){
_f74=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f74;
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
ExplorerBinding.prototype.handleAction=function(_f75){
ExplorerBinding.superclass.handleAction.call(this,_f75);
var _f76=_f75.target;
switch(_f75.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f75.consume();
break;
case Binding.ACTION_DRAG:
if(_f76 instanceof ExplorerSplitterBinding){
_f76.dragger.registerHandler(this);
}
_f75.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f78){
this._menuBinding.setSelectionByHandle(_f78);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f79){
if(_f79 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f79);
this._menuBinding.mountDefinition(_f79);
}
};
ExplorerBinding.prototype.onDragStart=function(_f7a){
var _f7b=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f7b.hasEntries()){
var _f7c=_f7b.getFirst();
this._dragStart=_f7c.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f7c.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f80){
if(_f80 instanceof SystemViewDefinition){
var _f81=ViewBinding.newInstance(this.bindingDocument);
_f81.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f81.setDefinition(_f80);
var _f82=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f82.setAssociatedView(_f81);
this._decks[_f80.handle]=_f82;
_f82.add(_f81);
this.add(_f82);
function attach(){
_f82.attach();
_f81.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f83){
var _f84=this._decks[_f83];
this.select(_f84);
};
DecksBinding.prototype.expandBy=function(_f85){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f87=this.bindingElement.offsetHeight+_f85;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f87+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f89){
var _f8a=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f89);
return UserInterface.registerBinding(_f8a,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f8b){
this._viewBinding=_f8b;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f8c=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f8d=this._viewBinding.getDefinition().label;
StatusBar.busy(_f8c,[_f8d]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f8e){
ExplorerDeckBinding.superclass.handleAction.call(this,_f8e);
var _f8f=_f8e.target;
switch(_f8e.type){
case PageBinding.ACTION_INITIALIZED:
if(_f8f instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f8f.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f90,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f90,arg);
switch(_f90){
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
var _f92=null;
if(this._isExplorerDeckBindingInitialized){
_f92=this._viewBinding.getDefinition().label;
}else{
_f92=DockTabBinding.LABEL_TABLOADING;
}
return _f92;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f93=null;
if(this._isExplorerDeckBindingInitialized){
_f93=this._viewBinding.getDefinition().image;
}else{
_f93=DockTabBinding.IMG_TABLOADING;
}
return _f93;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f94=null;
if(this._isExplorerDeckBindingInitialized){
_f94=this._viewBinding.getDefinition().toolTip;
}
return _f94;
};
ExplorerDeckBinding.newInstance=function(_f95){
var _f96=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f95);
return UserInterface.registerBinding(_f96,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f97){
switch(_f97.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f97.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f97.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f97);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f98){
this._maxButtons.set(_f98.handle,this._mountMaxButton(_f98));
this._minButtons.set(_f98.handle,this._mountMinButton(_f98));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f99){
var _f9a=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f9a.setLabel(_f99.label);
_f9a.setToolTip(_f99.toolTip);
_f9a.handle=_f99.handle;
_f9a.node=_f99.node;
this._maxGroup.add(_f9a);
this._maxList.add(_f9a);
_f9a.attach();
return _f9a;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f9b){
var _f9c=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f9c.setLabel(_f9b.label);
_f9c.setToolTip(_f9b.label);
_f9c.handle=_f9b.handle;
_f9c.node=_f9b.node;
this._minGroup.addFirst(_f9c);
this._minList.add(_f9c);
_f9c.attach();
_f9c.hide();
return _f9c;
};
ExplorerMenuBinding.prototype.handleAction=function(_f9d){
ExplorerMenuBinding.superclass.handleAction.call(this,_f9d);
switch(_f9d.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f9e=_f9d.target;
var _f9f=_f9e.getCheckedButtonBinding();
var _fa0=_f9f.handle;
switch(_f9e){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fa0),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fa0),true);
break;
}
this._selectedHandle=_fa0;
this._selectedTag=_f9f.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f9d.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fa1){
var _fa2=this._maxButtons.get(_fa1);
if(_fa2){
_fa2.check();
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
var _fa3=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fa3=true;
}
return _fa3;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fa5=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fa5=true;
}
return _fa5;
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
ExplorerToolBarBinding.newInstance=function(_fa6){
var _fa7=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fa6);
return UserInterface.registerBinding(_fa7,ExplorerToolBarBinding);
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
var _fa8=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _fa9=_fa8?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_fa9);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_faa,_fab){
var _fac=(_fab==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fad=DOMUtil.createElementNS(Constants.NS_UI,_fac,_faa);
var _fae=UserInterface.registerBinding(_fad,ExplorerToolBarButtonBinding);
_fae.explorerToolBarButtonType=_fab;
return _fae;
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
EditorBinding.registerComponent=function(_faf,_fb0){
var _fb1=EditorBinding._components;
var _fb2=EditorBinding._editors;
var key=_fb0.key;
var _fb4=Interfaces.isImplemented(IWysiwygEditorComponent,_faf);
if(!_fb4){
_fb4=Interfaces.isImplemented(ISourceEditorComponent,_faf);
}
if(_fb4){
if(_fb2.has(key)){
_fb2.get(key).initializeEditorComponent(_faf);
}else{
if(!_fb1.has(key)){
_fb1.set(key,new List());
}
_fb1.get(key).add(_faf);
}
}else{
throw "Editor component interface not implemented: "+_faf;
}
};
EditorBinding.claimComponents=function(_fb5,_fb6){
var _fb7=EditorBinding._components;
var _fb8=EditorBinding._editors;
var key=_fb6.key;
_fb8.set(key,_fb5);
var list=null;
if(_fb7.has(key)){
list=_fb7.get(key).copy();
_fb7.del(key);
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
var _fbc=this.getProperty("value");
if(_fbc!=null){
_fbc=decodeURIComponent(_fbc);
this._startContent=_fbc;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fbe=this.bindingWindow.DataManager;
_fbe.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fc0){
var _fc1=EditorBinding.claimComponents(this,_fc0);
if(_fc1!=null){
while(_fc1.hasNext()){
this.initializeEditorComponent(_fc1.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fc3=this.bindingWindow.DataManager;
if(_fc3.getDataBinding(name)){
_fc3.unRegisterDataBinding(name);
}
_fc3.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fc4=this.getEditorDocument();
if(_fc4!=null){
Application.framework(_fc4);
DOMEvents.addEventListener(_fc4,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fc4,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fc4,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fc4,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fc6){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fc6==true){
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
var _fc8=this.getCheckSum();
if(_fc8!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fc8;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fc9=null;
if(Binding.exists(this._pageBinding)){
_fc9=this._pageBinding.getCheckSum(this._checksum);
}
return _fc9;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fcb=DOMEvents.getTarget(e);
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
if(_fcb.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fcd,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fcd,arg);
var _fcf=null;
switch(_fcd){
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
var _fd0=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fd0=false;
}
}
}else{
_fcf=DOMEvents.getTarget(arg);
if(_fcf&&_fcf.ownerDocument==this.getEditorDocument()){
_fd0=false;
}
}
if(_fd0){
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
EditorBinding.prototype._activateEditor=function(_fd1){
if(_fd1!=this._isActivated){
this._isActivated=_fd1;
EditorBinding.isActive=_fd1;
var _fd2=this.getEditorWindow().standardEventHandler;
var _fd3=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fd3!=null){
if(_fd1){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fd3.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fd2.enableNativeKeys(true);
}else{
_fd3.disable();
_fd2.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fd4=this.getEditorDocument().selection.createRange();
_fd4.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fd5=false;
try{
if(!Client.isExplorer){
var _fd6=this.getEditorWindow().getSelection();
if(_fd6!=null){
_fd5=_fd6.toString().length>0;
if(!_fd5){
var _fd7=_fd6.getRangeAt(0);
var frag=_fd7.cloneContents();
var _fd9=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fd9.appendChild(frag.firstChild);
}
var img=_fd9.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fd5=true;
}
}
}
}
}else{
var _fd7=this.getEditorDocument().selection.createRange();
_fd5=(_fd7&&_fd7.text)&&_fd7.text.length>0;
if(_fd7.commonParentElement&&VisualEditorBinding.isImageElement(_fd7.commonParentElement())){
_fd5=true;
}
}
}
catch(exception){
}
return _fd5;
};
EditorBinding.prototype.isCommandEnabled=function(_fdb){
var _fdc=true;
switch(_fdb){
case "Cut":
case "Copy":
case "Paste":
_fdc=this.getEditorDocument().queryCommandEnabled(_fdb);
break;
}
return _fdc;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fe0=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fe1=null;
if(cmd=="Paste"){
_fe1=null;
}else{
_fe1=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fe1);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fe0=true;
}
break;
}
return _fe0;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fe3=this.getContentWindow().bindingMap.toolbar;
var _fe4=_fe3.getButtonForCommand(cmd);
if(!_fe4){
throw "No button for command "+cmd;
}
return _fe4;
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
var _fe7=this.getContentDocument().getElementById("focusableinput");
if(_fe7!=null){
_fe7.style.display="block";
FocusBinding.focusElement(_fe7);
_fe7.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fe8){
EditorBinding.superclass.handleAction.call(this,_fe8);
var _fe9=_fe8.target;
var self=this;
var _feb=this.shadowTree.iframe;
switch(_fe8.type){
case Binding.ACTION_DIRTY:
if(_fe8.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fec){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fec);
};
EditorBinding.prototype.handleElement=function(_fed){
return true;
};
EditorBinding.prototype.updateElement=function(_fee){
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
var _ff1=this._menuGroups[rel];
if(_ff1 instanceof List){
_ff1.each(function(_ff2){
_ff2.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _ff4=this._menuGroups[rel];
if(_ff4 instanceof List){
_ff4.each(function(_ff5){
_ff5.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_ff6){
EditorPopupBinding.superclass.handleAction.call(this,_ff6);
var _ff7=_ff6.target;
if(_ff6.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_ff7.getProperty("cmd");
var gui=_ff7.getProperty("gui");
var val=_ff7.getProperty("val");
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
var _ffb=this.bindingWindow.bindingMap.tinywindow;
var _ffc=this.bindingWindow.bindingMap.codepresswindow;
if(_ffb){
EditorBinding.registerComponent(this,_ffb);
}else{
if(_ffc){
EditorBinding.registerComponent(this,_ffc);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_ffd,_ffe,_fff,theme){
this._editorBinding=_ffd;
this._tinyEngine=_ffe;
this._tinyInstance=_fff;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1001,frame,_1003){
this._editorBinding=_1001;
this._codePressFrame=frame;
this._codePressEngine=_1003;
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
var _1005=this._editorBinding;
if(_1005!=null){
var self=this;
var _1007={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1005.hasBookmark()){
_1005.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1005.hasBookmark()){
_1005.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1007);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1007);
}
};
EditorClickButtonBinding.newInstance=function(_1009){
var _100a=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1009);
return UserInterface.registerBinding(_100a,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_100b){
var _100c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_100b);
return UserInterface.registerBinding(_100c,EditorToolBarButtonBinding);
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
var _100d=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_100d);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_100e,_100f,_1010,theme){
this._editorBinding=_100e;
this._tinyEngine=_100f;
this._tinyInstance=_1010;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1012){
EditorSelectorBinding.superclass.handleAction.call(this,_1012);
switch(_1012.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_1012);
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
EditorMenuItemBinding.newInstance=function(_1015){
var _1016=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1015);
return UserInterface.registerBinding(_1016,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1017){
var i=0,_1019,_101a=[],split=_1017.split(" ");
while((_1019=split[i++])!=null){
if(_1019.length>=3&&_1019.substring(0,3)=="mce"){
continue;
}else{
if(_1019.length>=14&&_1019.substring(0,14)=="compositemedia"){
continue;
}
}
_101a.push(_1019);
}
return _101a.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_101c){
var _101d=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_101c);
if(soap instanceof SOAPFault){
}else{
_101d=soap.XhtmlFragment;
if(!_101d){
_101d="";
}
}
WebServiceProxy.isFaultHandler=true;
return _101d;
};
VisualEditorBinding.getTinyContent=function(_101f,_1020){
var _1021=null;
if(_101f==null||_101f==""){
_101f=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_101f);
if(soap instanceof SOAPFault){
var _1023=soap;
var _1024={handleDialogResponse:function(){
_1020.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1024,_1023);
}else{
_1021=soap.XhtmlFragment;
if(_1021==null){
_1021=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1021;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _1027=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1029=new List(doc.documentElement.childNodes);
var _102a=new List();
_1029.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_102a.add(child);
}
});
var _102c=_102a.get(index);
if(_102c==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_102c.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_102c.hasChildNodes()){
frag.appendChild(_102c.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_1027=DOMSerializer.serialize(doc.documentElement);
_1027=_1027.substring(_1027.indexOf(">")+1,_1027.length);
_1027=_1027.substring(0,_1027.lastIndexOf("<"));
}
}
}
if(_1027==null){
_1027=new String("");
}
return _1027;
};
VisualEditorBinding.isImage=function(_102e){
result=_102e&&_102e.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_102f){
return VisualEditorBinding.isImage(_102f)&&!VisualEditorBinding.isReservedElement(_102f);
};
VisualEditorBinding.isReservedElement=function(_1030){
if(VisualEditorBinding.isFunctionElement(_1030)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1030)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1030)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1031){
return VisualEditorBinding.isImage(_1031)&&CSSUtil.hasClassName(_1031,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1032){
return VisualEditorBinding.isImage(_1032)&&CSSUtil.hasClassName(_1032,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1033){
return VisualEditorBinding.isImage(_1033)&&CSSUtil.hasClassName(_1033,VisualEditorBinding.HTML_CLASSNAME);
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
var _1034=this.getProperty("embedablefieldstypenames");
if(_1034!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1034);
}
var _1035=this.getProperty("formattingconfiguration");
if(_1035!=null){
this._url+="?config="+_1035;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1036,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1036,arg);
var _1038=this.getContentWindow().bindingMap.tinywindow;
var _1039=_1038.getContentWindow();
switch(_1036){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1039){
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
this.initializeEditorComponents(_1038);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_103a){
_103a.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_103b){
VisualEditorBinding.superclass._onPageInitialize.call(this,_103b);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_103e){
var _103f=_103e;
if(!this._isNormalizedDocument(_103e)){
_103f=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_103e);
}
return _103f;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1040){
var _1041=false;
var doc=XMLParser.parse(_1040,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1041=true;
}
}
if(Client.isWebKit){
if(_1040.indexOf("<html")!==0){
_1041=false;
}
}
return _1041;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1046=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1046){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1046=true;
}
return _1046;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1048=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1048);
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
VisualEditorBinding.prototype.setResult=function(_104a){
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
VisualEditorPopupBinding.prototype.configure=function(_104b,_104c,_104d){
var _104e=this.editorBinding.hasSelection();
this.tinyInstance=_104b;
this.tinyEngine=_104c;
this.tinyElement=_104d;
this.hasSelection=_104e;
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
var _1052=false;
if(this.hasSelection){
_1052=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1052=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1052=true;
}
}
}
}
if(_1052){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1053=this.getMenuItemForCommand("compositeInsertLink");
var _1054=this.getMenuItemForCommand("unlink");
var _1055=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1056=this.editorBinding.getButtonForCommand("unlink");
_1054.setDisabled(_1056.isDisabled);
if(_1054.isDisabled){
_1053.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1053.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1057=this.editorBinding.embedableFieldConfiguration;
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
if(_1057){
var _105a=_1057.getGroupNames();
if(_105a.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_105a.each(function(_105e){
var _105f=_1057.getFieldNames(_105e);
_105f.each(function(_1060){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1060);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_105e+":"+_1060);
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
var _1062=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1063=null;
var _1064=null;
if(_1062){
if(_1062.nodeName=="TD"){
_1063=_1062.getAttribute("colspan");
_1064=_1062.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1063=="1"&&_1064=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1062){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1065){
var _1066=VisualEditorFormattingConfiguration._configurations;
if(!_1066.has(_1065)){
_1066.set(_1065,new VisualEditorFormattingConfiguration());
}
return _1066.get(_1065);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1068){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1069){
var _106a=null;
var _106b=VisualEditorFieldGroupConfiguration._configurations;
if(!_106b.has(_1069)){
_106b.set(_1069,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1069)));
}
return _106b.get(_1069);
};
function VisualEditorFieldGroupConfiguration(_106c){
var _106d=new Map();
new List(_106c).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_106d.set(group.GroupName,map);
});
this._groups=_106d;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1071){
return this._groups.get(_1071).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1072,_1073){
return this._groups.get(_1072).get(_1073).xhtml;
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
var _1075=this.getDescendantElementsByLocalName("textarea");
while(_1075.hasNext()){
var _1076=_1075.getNext();
if(_1076.getAttribute("selected")=="true"){
this._startContent=_1076.value;
this._textareaname=_1076.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1078=this.getContentWindow().bindingMap.templatetree;
_1078.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1079){
var _107a=_1078.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_107a.textareaname);
_1079.consume();
}});
_1078.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_107b){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _107c=this.getContentWindow().bindingMap.toolsplitter;
_107c.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _107d=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_107d.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_107d);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_107e){
this._textareas=new Map();
while(_107e.hasNext()){
var _107f=_107e.getNext();
var _1080=_107f.getAttribute("placeholderid");
this._textareas.set(_1080,{placeholderid:_1080,placeholdername:_107f.getAttribute("placeholdername"),placeholdermarkup:_107f.value,textareaelement:_107f,isSelected:_107f.getAttribute("selected")=="true"});
}
var _1081=new Map();
this._textareas.each(function(name,_1083){
var _1084=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1084.setLabel(_1083.placeholdername);
_1084.setImage("${icon:placeholder}");
_1084.setProperty("placeholder",true);
_1084.textareaname=name;
_1081.set(_1083.placeholdername,_1084);
if(_1083.isSelected){
selected=_1084;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1085=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1085.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1086=this.getContentWindow().bindingMap.templatetree;
var _1087=_1086.add(TreeNodeBinding.newInstance(_1086.bindingDocument));
_1087.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1087.setImage("${icon:warning}");
_1087.attach();
var _1088=this.getContentWindow().bindingMap.statusbar;
_1088.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _108a=this._textareas.get(name);
var _108b=_108a.placeholdermarkup;
this.setValue(this.normalizeToDocument(_108b));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_108c){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_108c;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _108d=this.getContentWindow().bindingMap.statusbar;
_108d.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_108c);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1090="";
if(this._heads.has(this._textareaname)){
_1090=this._heads.get(this._textareaname);
if(_1090==null){
_1090=new String("");
}
}
return _1090;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1092){
_1092.textareaelement.value=_1092.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1093,_1094){
var _1095=_1093.getElementsByTagName("div").item(0);
var _1096=_1094.getElementsByTagName("div").item(0);
var _1097=new List(_1095.getElementsByTagName("textarea"));
var _1098=new List(_1096.getElementsByTagName("textarea"));
var _1099=false;
if(_1097.getLength()!=_1098.getLength()){
_1099=true;
}else{
var index=0;
_1097.each(function(_109b,index){
var _109d=_1098.get(index);
var newid=_109b.getAttribute("placeholderid");
var oldid=_109d.getAttribute("placeholderid");
var _10a0=_109b.getAttribute("placeholdername");
var _10a1=_109d.getAttribute("placeholdername");
if(newid!=oldid||_10a0!=_10a1){
_1099=true;
}
return !_1099;
});
}
if(_1099){
var html=null;
if(_1095.innerHTML!=null){
html=_1095.innerHTML;
}else{
html=DOMSerializer.serialize(_1095);
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
var _10a5=this.getDescendantBindingByLocalName("selector");
_10a5.attach();
this._populateTemplateSelector();
var _10a6=this.getContentWindow().bindingMap.templateselector;
_10a6.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10a7=this.getDescendantBindingByLocalName("selector");
var _10a8=this.getContentWindow().bindingMap.templateselector;
_10a7.selections.each(function(_10a9){
_10a9.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10a8.populateFromList(_10a7.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10aa=this.getDescendantBindingByLocalName("selector");
var _10ab=this.getContentWindow().bindingMap.templateselector;
_10aa.selectByValue(_10ab.getValue());
_10aa.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10ac){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10b1,_10b2){
var _10b3=_10b2;
if(old.has(_10b1)){
_10b3=old.get(_10b1).placeholdermarkup;
}
return _10b3;
}
while(_10ac.hasNext()){
var _10b4=_10ac.getNext();
var _10b5=_10b4.getAttribute("placeholderid");
this._textareas.set(_10b5,{placeholderid:_10b5,placeholdername:_10b4.getAttribute("placeholdername"),placeholdermarkup:compute(_10b5,_10b4.value),textareaelement:_10b4,isSelected:_10b4.getAttribute("selected")=="true"});
}
var _10b6=null;
var _10b7=this.getContentWindow().bindingMap.templatetree;
var _10b8=new Map();
this._textareas.each(function(name,_10ba){
var _10bb=_10b7.add(TreeNodeBinding.newInstance(_10b7.bindingDocument));
_10bb.setLabel(_10ba.placeholdername);
_10bb.setImage("${icon:placeholder}");
_10bb.setProperty("placeholder",true);
_10bb.textareaname=name;
_10b8.set(_10ba.placeholdername,_10bb);
if(_10ba.isSelected){
_10b6=_10bb;
}
});
_10b7.attachRecursive();
if(_10b6!=null){
var _10bc=true;
if(this._oldtextareas.hasEntries()){
_10bc=false;
var map=new Map();
this._textareas.each(function(id,_10bf){
map.set(_10bf.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10bc=true;
}
}
if(_10bc){
var _10c0=this._textareas.get(_10b6.textareaname);
this._textareaname=_10b6.textareaname;
this._placeholdername=_10c0.placeholdername;
this._setContentFromPlaceHolder(_10b6.textareaname);
_10b6.focus();
}else{
var _10c1=_10b8.get(this._placeholdername);
this._textareaname=_10c1.textareaname;
_10c1.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10c2,_10c3){
var _10c4=_10c2.getElementsByTagName("ui:selector").item(0);
var _10c5=_10c3.getElementsByTagName("ui:selector").item(0);
var _10c6=false;
if(_10c4!=null&&_10c5!=null){
var _10c7=new List(_10c4.getElementsByTagName("ui:selection"));
var _10c8=new List(_10c5.getElementsByTagName("ui:selection"));
if(_10c7.getLength()!=_10c8.getLength()){
_10c6=true;
}else{
_10c7.each(function(_10c9,index){
var _10cb=_10c9.getAttribute("value");
var _10cc=_10c8.get(index).getAttribute("value");
if(_10cb!=_10cc){
_10c6=true;
}
return !_10c6;
});
}
}
if(_10c6){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10c4);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10c2,_10c3);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10ce,frame,_10d0){
this._editorBinding=_10ce;
this._codePressFrame=frame;
this._codePressEngine=_10d0;
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
var _10d6=this.getProperty("validate");
if(_10d6==true){
this._hasStrictValidation=true;
}
var _10d7=this.getProperty("validator");
if(_10d7!=null){
this._validator=_10d7;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10d8,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10d8,arg);
switch(_10d8){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10da=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10da!=null){
var _10db=_10da.getContentWindow();
if(arg.broadcastWindow==_10db){
this._codemirrorWindow=_10db;
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
this.initializeEditorComponents(_10da);
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
this.unsubscribe(_10d8);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10df){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10df);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10e0){
if(_10e0!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10e0;
EditorBinding.isActive=_10e0;
var _10e1=this.getContentWindow().standardEventHandler;
if(_10e0){
_10e1.enableNativeKeys(true);
}else{
_10e1.disableNativeKeys();
}
var _10e2=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10e2!=null){
if(_10e0){
_10e2.enable();
}else{
_10e2.disable();
}
}
if(_10e0){
this.focus();
var _10e3=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10e7=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10e7;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10e8){
_10e8.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10ea){
if(!this._isFinalized){
if(_10ea!=this._startContent){
this._startContent=_10ea;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10ea);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10eb=this.getContentWindow().bindingMap.editorpage.getContent();
if(_10eb!=null){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10eb=_10eb.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
break;
}
}
return _10eb?_10eb:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10ec){
if(this._pageBinding!=null){
this._pageBinding.cover(_10ec);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10ed){
if(_10ed!=null&&this.shadowTree.dotnetinput!=null){
var value=_10ed.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10ef=true;
var _10f0=this.getContent();
if(this._validator!=null){
_10ef=Validator.validateInformed(_10f0,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10ef=XMLParser.isWellFormedDocument(_10f0,true);
if(_10ef==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10ef=this._isValidHTML(_10f0);
break;
}
}
break;
}
}
return _10ef;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10f2=true;
var doc=XMLParser.parse(xml);
var _10f4=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10f4.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10f4.add("NamespaceURI");
}
var head=null,body=null;
var _10f8=new List(root.childNodes);
while(_10f8.hasNext()){
var child=_10f8.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10f4.add("MultipleHead");
}
if(body!=null){
_10f4.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10f4.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10f4.add("MissingHead");
}
if(body==null){
_10f4.add("MissingBody");
}
}
if(_10f4.hasEntries()){
_10f2=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f4.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f4.getFirst()));
}
}
return _10f2;
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
var _10fa=null;
var page=this._pageBinding;
if(page!=null){
_10fa=page.getCheckSum();
}
return _10fa;
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
ThrobberBinding.prototype.handleBroadcast=function(_10fc,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10fc,arg);
switch(_10fc){
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
ProgressBarBinding.notch=function(_10ff){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10ff);
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
ProgressBarBinding.prototype.notch=function(_1101){
_1101=_1101?_1101:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1101);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1103,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1103,arg);
switch(_1103){
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
StartMenuItemBinding.prototype.setChecked=function(_1105,_1106){
StartMenuItemBinding.superclass.setChecked.call(this,_1105,_1106);
if(!_1106){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_1107){
var _1108=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1107);
UserInterface.registerBinding(_1108,StartMenuItemBinding);
return UserInterface.getBinding(_1108);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_110b,_110c){
var _110d=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_110c,true)==true){
if(_110b!="*"){
_110b=KeySetBinding._sanitizeKeyModifiers(_110b);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_110d[doc]){
_110d[doc]={};
}
if(!_110d[doc][code]){
_110d[doc][code]={};
}
_110d[doc][code][_110b]=_110c;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1111=false;
var code=e.keyCode;
var _1113=KeySetBinding.keyEventHandlers;
if(_1113[doc]&&_1113[doc][code]){
var _1114="[default]";
_1114+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1114+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _1115=_1113[doc][code][_1114];
if(_1115==null){
_1115=_1113[doc][code]["*"];
}
if(_1115!=null){
_1115.handleKeyEvent(e);
_1111=true;
}
}
return _1111;
};
KeySetBinding._sanitizeKeyModifiers=function(_1116){
var _1117="[default]";
var mods={};
if(_1116){
new List(_1116.split(" ")).each(function(_1119){
mods[_1119]=true;
});
function check(_111a){
if(mods[_111a]){
_1117+=" "+_111a;
}
}
check("shift");
check("control");
}
return _1117;
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
var _111e=key.getAttribute("oncommand");
var _111f=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_111f){
DOMEvents.preventDefault(e);
}
var _1121=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_111e,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1122){
if(_1122 instanceof CursorBinding){
_1122.setOpacity(0);
_1122.show();
new Animation({modifier:9,onstep:function(_1123){
_1122.setOpacity(Math.sin(_1123*Math.PI/180));
},onstop:function(){
_1122.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1124){
if(_1124 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1125){
_1124.setOpacity(Math.cos(_1125*Math.PI/180));
},onstop:function(){
_1124.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1126,_1127,_1128){
if(_1126 instanceof CursorBinding){
_1128.x-=16;
_1128.y-=16;
new Animation({modifier:3,onstep:function(_1129){
var tal=Math.sin(_1129*Math.PI/180);
_1126.setPosition(new Point(((1-tal)*_1127.x)+((0+tal)*_1128.x),((1-tal)*_1127.y)+((0+tal)*_1128.y)));
},onstop:function(){
CursorBinding.fadeOut(_1126);
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
CursorBinding.prototype.setOpacity=function(_112f){
this.bindingElement.style.opacity=new String(_112f);
this._opacity=_112f;
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
function setOpacity(_1132){
cover.bindingElement.style.opacity=new String(_1132);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1133){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1133*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1135){
cover.bindingElement.style.MozOpacity=new String(_1135);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1136){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1136*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1138){
if(_1138!=this._isBusy){
if(_1138){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1138;
}
};
CoverBinding.prototype.setTransparent=function(_1139){
if(_1139!=this._isTransparent){
if(_1139){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1139;
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
CoverBinding.prototype.setHeight=function(_113b){
if(_113b>=0){
this.bindingElement.style.height=new String(_113b+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_113c){
var _113d=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_113c);
return UserInterface.registerBinding(_113d,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _113f=UncoverBinding._bindingInstance;
if(Binding.exists(_113f)){
_113f.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1143){
this._isFading=_1143==true;
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
var _1144=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1144.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1144.clearRect(0,0,300,150);
_1144.fillRect(0,0,300,150);
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
var _1146=this._canvas.getContext("2d");
_1146.clearRect(0,0,300,150);
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
var _1147=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1147);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1148=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1148){
this._startcontent=_1148.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1149){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1149);
switch(_1149.type){
case WindowBinding.ACTION_ONLOAD:
if(_1149.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1149.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1149);
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
var _114d=this._transformer.transformToString(doc);
this._inject(_114d);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1150){
this.getContentDocument().body.innerHTML=_1150;
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
var _1158=list.getNext();
var id=_1158.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1158);
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
var _1162=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1162.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1162.appendChild(att);
}
elm.appendChild(_1162);
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
var _116c=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_116c){
doc=XMLParser.parse(_116c);
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
var _1170=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1170;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1171,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1171,arg);
switch(_1171){
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
var _1174=new List();
list.each(function(lang){
_1174.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1174);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1178){
switch(_1178){
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
var _117b=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_117b,root);
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
var _117c=this.getProperty("status");
if(_117c!=null){
switch(_117c){
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
UserInterfaceMapping.prototype.merge=function(_1180){
for(var _1181 in _1180.map){
this.map[_1181]=_1180.getBindingImplementation(_1181);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1182){
var _1183=null;
var name=_1182.nodeName.toLowerCase();
if(this.map[name]){
_1183=this.map[name];
}
return _1183;
};
var UserInterface=new function(){
var _1185=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1186=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1185,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1187=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1189,impl){
var _118b=null;
if(!this.hasBinding(_1189)){
var _118c=DOMUtil.getParentWindow(_1189);
if(DOMUtil.getLocalName(_1189)!="bindingmapping"){
if(!impl&&_1189.getAttribute("binding")!=null){
var _118d=_1189.getAttribute("binding");
impl=_118c[_118d];
if(impl==null){
throw "No such binding in scope: "+_118d;
}
}
if(!impl){
var _118e=_118c.DocumentManager;
if(_118e){
var _118f=_118e.customUserInterfaceMapping;
if(_118f){
impl=_118f.getBindingImplementation(_1189);
}
}
}
if(!impl){
impl=_1186.getBindingImplementation(_1189);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_118b=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_118b){
var key=KeyMaster.getUniqueKey();
_1189.setAttribute("key",key);
_118b.key=key;
if(!_1189.id){
_1189.id=key;
}
keys[key]={element:_1189,binding:_118b};
_118b.onBindingRegister();
}
}
}
return _118b;
};
this.unRegisterBinding=function(_1191){
terminate(_1191);
};
function terminate(_1192){
if(Binding.exists(_1192)==true){
var key=_1192.key;
Binding.destroy(_1192);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1192=null;
}else{
_1187.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1194){
var _1195=null;
if(keys[_1194.key]){
_1195=keys[_1194.key].element;
}
return _1195;
};
this.getBinding=function(_1196){
var _1197=null;
if(_1196&&_1196.nodeType==Node.ELEMENT_NODE){
try{
var key=_1196.getAttribute("key");
if(key&&keys[key]){
_1197=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1196);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1197;
};
this.getBindingByKey=function(key){
var _119a=null;
if(keys[key]){
_119a=keys[key].binding;
}
return _119a;
};
this.hasBinding=function(_119b){
return this.getBinding(_119b)!=null;
};
this.isBindingVisible=function(_119c){
var _119d=Application.isOperational;
if(_119d==true){
var _119e=new Crawler();
_119e.type=NodeCrawler.TYPE_ASCENDING;
_119e.id="visibilitycrawler";
_119e.addFilter(function(_119f){
var b=UserInterface.getBinding(_119f);
var res=0;
if(!b.isVisible){
_119d=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_119e.crawl(_119c.bindingElement);
_119e.dispose();
}
return _119d;
};
var _11a2=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11a2={};
for(var key in keys){
_11a2[key]=true;
}
};
this.getPoint=function(){
var _11a6=null;
if(_11a2){
_11a6=new List();
for(var key in keys){
if(!_11a2[key]){
_11a6.add(key);
}
}
}
return _11a6;
};
this.clearPoint=function(){
_11a2=null;
};
this.trackUndisposedBindings=function(){
var _11a8=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11a8){
_11a8="Bindings illdisposed: ";
}
_11a8+=entry.binding+" ";
}
}
if(_11a8!=null){
_1187.error(_11a8);
}
};
this.autoTrackDisposedBindings=function(_11ab){
if(_11ab){
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
SOAPRequest.newInstance=function(_11ac,_11ad){
var _11ae=_11ac+"/"+_11ad;
var _11af=new SOAPRequest(_11ae);
var _11b0=SOAPRequest.resolver;
_11af.document=Templates.getTemplateDocument("soapenvelope.xml");
_11af.envelope=_11b0.resolve("soap:Envelope",_11af.document);
_11af.header=_11b0.resolve("soap:Header",_11af.envelope);
_11af.body=_11b0.resolve("soap:Body",_11af.envelope);
return _11af;
};
SOAPRequest._parseResponse=function(_11b1){
var _11b2=null;
var _11b3=false;
var doc=_11b1.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11b2=SOAPRequestResponse.newInstance(_11b1.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11b1.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11b3=true;
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
var text=_11b1.responseText;
if(_11b1.status==503||text.indexOf("id=\"offline\"")>-1){
_11b3=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11b1.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11b1.responseText);
}
}
}
}
if(_11b3==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11b2;
};
function SOAPRequest(_11b8){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11b8;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11ba=DOMUtil.getXMLHTTPRequest();
var _11bb=null;
_11ba.open("post",url,false);
_11ba.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11ba.setRequestHeader("SOAPAction",this.action);
try{
_11ba.send(this.document);
_11bb=SOAPRequest._parseResponse(_11ba);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11ba=null;
return _11bb;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11be){
var _11bf=DOMUtil.getXMLHTTPRequest();
_11bf.open("post",url,true);
_11bf.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11bf.setRequestHeader("SOAPAction",this.action);
_11bf.onreadystatechange=function(){
if(_11bf.readyState==4){
var _11c0=SOAPRequest._parseResponse(_11bf);
_11be(_11c0);
_11bf=null;
}
};
_11bf.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11c1 in this){
this[_11c1]=null;
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
var _11c3=null;
if(doc&&doc.documentElement){
_11c3=new SOAPRequestResponse();
var _11c4=SOAPRequestResponse.resolver;
_11c3.document=doc;
_11c3.envelope=_11c4.resolve("soap:Envelope",_11c3.document);
_11c3.header=_11c4.resolve("soap:Header",_11c3.envelope);
_11c3.body=_11c4.resolve("soap:Body",_11c3.envelope);
var fault=_11c4.resolve("soap:Fault",_11c3.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11c3.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11c4.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11c4.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11c3;
};
function SOAPFault(_11c6,_11c7,_11c8){
this._operationName=_11c6;
this._operationAddress=_11c7;
this._faultString=_11c8;
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
SOAPFault.newInstance=function(_11c9,fault){
return new SOAPFault(_11c9.name,_11c9.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11cc){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11cc;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11ce=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11ce.body,this._operation);
var _11d0=this._wsdl.getSchema();
var _11d1=_11d0.lookup(this._operation);
var _11d2=_11d1.getListedDefinitions();
while(_11d2.hasNext()){
var def=_11d2.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11ce;
};
SOAPEncoder.prototype._resolve=function(_11d6,_11d7,value){
var _11d9=this._wsdl.getSchema();
if(_11d7.isSimpleValue){
this._appendText(_11d6,value,_11d7.type=="string");
}else{
var _11da=_11d9.lookup(_11d7.type);
if(_11da instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11da.getListedDefinitions();
if(_11da.isArray){
var _11dc=new List(value);
var def=defs.getNext();
while(_11dc.hasNext()){
var elm=this._appendElement(_11d6,def.name);
var val=_11dc.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11d6,def.name);
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
SOAPEncoder.prototype._appendText=function(_11e3,value,_11e5){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11e8=false;
var i=0,c;
while(c=chars[i++]){
var _11eb=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11eb=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11eb=false;
}
break;
}
if(!_11eb){
safe+=c;
}else{
_11e8=true;
}
}
if(_11e8){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11e3.appendChild(_11e3.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11ee){
this._wsdl=wsdl;
this._operation=_11ee;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11f3){
var _11f4=null;
var _11f5=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11f7=this.resolve(id,_11f3.body);
var _11f8=_11f5.lookup(id);
var _11f9=_11f8.getListedDefinitions();
while(!_11f4&&_11f9.hasNext()){
var def=_11f9.getNext();
var elm=this.resolve(def.name,_11f7);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11f4=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11f4.importNode!=Types.UNDEFINED){
_11f4.appendChild(_11f4.importNode(e,true));
}else{
_11f4.loadXML(DOMSerializer.serialize(e));
}
}else{
_11f4=this._compute(elm,def);
}
}
return _11f4;
};
SOAPDecoder.prototype._compute=function(_11fd,_11fe){
var _11ff=null;
var _1200=this._wsdl.getSchema();
if(_11fe.isSimpleValue){
_11ff=this._getSimpleValue(_11fd,_11fe.type);
}else{
var _1201=_1200.lookup(_11fe.type);
if(_1201 instanceof SchemaSimpleType){
_11ff=this._getSimpleValue(_11fd,_1201.restrictionType);
}else{
var defs=_1201.getListedDefinitions();
if(_1201.isArray){
_11ff=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11fd);
while(elms.hasNext()){
var elm=elms.getNext();
_11ff.push(this._compute(elm,def));
}
}else{
_11ff={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11fd);
if(elm){
_11ff[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11ff;
};
SOAPDecoder.prototype._getSimpleValue=function(_1206,type){
var _1208=null;
if(_1206.firstChild&&_1206.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1206.childNodes.length>1){
_1206.normalize();
}
_1208=_1206.firstChild.data;
switch(type){
case Schema.types.STRING:
_1208=_1208;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1208=Number(_1208);
break;
case Schema.types.BOOLEAN:
_1208=_1208=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1208;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1209){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1209);
}
Schema.prototype._parseSchema=function(_120a){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _120b={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_120a);
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
_120b[rule.getAttribute("name")]=entry;
}
return _120b;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1210){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1210);
}
SchemaDefinition.prototype._parse=function(_1211){
var min=_1211.getAttribute("minOccurs");
var max=_1211.getAttribute("maxOccurs");
var type=_1211.getAttribute("type");
this.name=_1211.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1217=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1217;
}else{
var elm=_1211.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1219,_121a){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1219,_121a);
}
SchemaElementType.prototype._parseListedDefinitions=function(_121b,_121c){
var els=_121b.resolveAll("s:complexType/s:sequence/s:element",_121c);
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
function SchemaComplexType(_121e,_121f){
this._definitions=new List();
this._parseListedDefinitions(_121e,_121f);
this.isArray=_121f.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1220,_1221){
var els=_1220.resolveAll("s:sequence/s:element",_1221);
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
function SchemaSimpleType(_1224,_1225){
this.restrictionType=null;
this._parse(_1224,_1225);
}
SchemaSimpleType.prototype._parse=function(_1226,_1227){
var _1228=_1226.resolve("s:restriction",_1227);
if(_1228){
this.restrictionType=_1228.getAttribute("base").split(":")[1];
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
var _122b=null;
var _122c=DOMUtil.getXMLHTTPRequest();
_122c.open("get",url,false);
_122c.send(null);
if(_122c.responseXML){
_122b=_122c.responseXML.documentElement;
}else{
alert(_122c.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _122b;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _122d=new List();
var _122e=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_122e.hasEntries()){
while(_122e.hasNext()){
var _122f=_122e.getNext();
var name=_122f.getAttribute("name");
_122d.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _122d;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1232,_1233,_1234){
this.name=name;
this.address=_1232;
this.encoder=_1233;
this.decoder=_1234;
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
var _1238=wsdl.getOperations();
_1238.each(function(_1239){
proxy[_1239.name]=WebServiceProxy.createProxyOperation(_1239);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_123a,_123b){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_123b){
var log=_123b instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_123a.address+": "+_123a.name+"\n\n";
log+=DOMSerializer.serialize(_123b.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_123d){
return function(){
var _123e=new List(arguments);
var _123f=null;
if(typeof (_123e.getLast())=="function"){
var _1240=_123e.extractLast();
var _1241=_123d.encoder.encode(_123e);
this._log(_123d,_1241);
var self=this;
var _1243=_1241.asyncInvoke(_123d.address,function(_1244){
self._log(_123d,_1244);
if(_1244){
if(_1244.fault){
_123f=SOAPFault.newInstance(_123d,_1244.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_123f,_1241,_1244);
}
}else{
if(WebServiceProxy.isDOMResult){
_123f=_1244.document;
}else{
_123f=_123d.decoder.decode(_1244);
}
}
}
_1241.dispose();
_1240(_123f);
});
}else{
var _1241=_123d.encoder.encode(new List(arguments));
this._log(_123d,_1241);
var _1243=_1241.invoke(_123d.address);
this._log(_123d,_1243);
if(_1243){
if(_1243.fault){
_123f=SOAPFault.newInstance(_123d,_1243.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_123f,_1241,_1243);
}
}else{
if(WebServiceProxy.isDOMResult){
_123f=_1243.document;
}else{
_123f=_123d.decoder.decode(_1243);
}
}
}
_1241.dispose();
return _123f;
}
};
};
WebServiceProxy.handleFault=function(_1245,_1246,_1247){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1245,soapRequest:_1246,soapResponse:_1247});
}
catch(exception){
alert(_1245.getFaultString());
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
var _1248=SystemLogger.getLogger("MessageQueue");
var _1249=null;
var _124a=0;
var _124b=null;
var _124c=new Map();
var _124d=new Map();
var _124e=false;
var _124f=false;
var _1250=false;
var _1251=false;
var _1252={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1249=ConsoleMessageQueueService;
_124a=_1249.GetCurrentSequenceNumber("dummyparam!");
this.index=_124a;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_124e){
if(!MessageQueue._actions.hasEntries()){
var _1253=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_124f=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1253;
_124f=false;
}
}
}
};
this._pokeserver=function(){
if(_124e==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_124f);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_1250){
_1251=true;
}else{
_1250=true;
var self=this;
_1249.GetMessages(Application.CONSOLE_ID,this.index,function(_1255){
if(_1255!=null){
if(Types.isDefined(_1255.CurrentSequenceNumber)){
var _1256=_1255.CurrentSequenceNumber;
if(_1256<self.index){
_1248.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_1256);
}
self.index=_1256;
var _1257=new List(_1255.ConsoleActions);
if(_1257.hasEntries()){
self.evaluate(_1257);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1248.error("No sequencenumber in MessageQueue response!");
}
}
_1250=false;
if(_1251){
_1251=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_1258){
var _1259=new List();
if(_1258.hasEntries()){
_1258.each(function(_125a){
if(this._index[_125a.Id]!=true){
_1259.add(_125a);
}
this._index[_125a.Id]=true;
},this);
if(_1259.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1259);
}else{
this._actions=_1259;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_125b){
var _125c="(No reason)";
if(_125b!=null){
_125c=_125b.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_125c);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1260){
if(_1260==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1261=null;
if(this._actions.hasEntries()){
var _1262=this._actions.extractFirst();
_124a=_1262.SequenceNumber;
_1248.debug("MessageQueue action: "+_1262.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_124a+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1262.ActionType){
case "OpenView":
_1261=_1262.OpenViewParams;
if(_1261.ViewType=="ModalDialog"){
openDialogView(_1261);
}else{
_124b=_1261.ViewId;
openView(_1261);
}
break;
case "CloseView":
_1261=_1262.CloseViewParams;
_124b=_1261.ViewId;
closeView(_1261);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1262.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_124c.countEntries()+"\n";
_124c.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1248.debug(debug);
if(!_124c.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1262.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1262.MessageBoxParams);
break;
case "OpenViewDefinition":
_1261=_1262.OpenViewDefinitionParams;
_124b=_1261.Handle;
openViewDefinition(_1261);
break;
case "LogEntry":
logEntry(_1262.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1261=_1262.BroadcastMessageParams;
_1248.debug("Server says: EventBroadcaster.broadcast ( \""+_1261.Name+"\", "+_1261.Value+" )");
EventBroadcaster.broadcast(_1261.Name,_1261.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_124c.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1262.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1262.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1262.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1261=_1262.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1261.ViewId,entityToken:_1261.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1261=_1262.OpenGenericViewParams;
openGenericView(_1261);
break;
case "OpenExternalView":
_1261=_1262.OpenExternalViewParams;
openExternalView(_1261);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1262.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_124f);
}
function logEntry(_1265){
var _1266=_1265.Level.toLowerCase();
SystemLogger.getLogger(_1265.SenderId)[_1266](_1265.Message);
}
function openView(_1267){
var list=paramsToList(_1267.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_1267.ViewId);
def.entityToken=_1267.EntityToken;
def.flowHandle=_1267.FlowHandle;
def.position=_1252[_1267.ViewType],def.label=_1267.Label;
def.image=_1267.Image;
def.toolTip=_1267.ToolTip;
def.argument={"url":_1267.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_1267.ViewId,entityToken:_1267.EntityToken,flowHandle:_1267.FlowHandle,position:_1252[_1267.ViewType],url:_1267.Url,label:_1267.Label,image:_1267.Image,toolTip:_1267.ToolTip}));
}
}
function openDialogView(_126a){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_126a.ViewId,flowHandle:_126a.FlowHandle,position:Dialog.MODAL,url:_126a.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_126b){
var _126c=_126b.DialogType.toLowerCase();
if(_126c=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_126b.Title+"\n"+_126b.Message);
}else{
Dialog[_126c](_126b.Title,_126b.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_126d){
var map={};
var _126f=false;
new List(_126d.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_126f=true;
});
var proto=ViewDefinitions[_126d.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_126d.ViewId;
}
def.argument=_126f?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1274){
var def=ViewDefinition.clone("Composite.Management.GenericView",_1274.ViewId);
def.label=_1274.Label;
def.toolTip=_1274.ToolTip;
def.image=_1274.Image;
def.argument={"url":_1274.Url,"list":paramsToList(_1274.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_1276){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_1276.ViewId);
def.label=_1276.Label;
def.toolTip=_1276.ToolTip;
def.image=_1276.Image;
def.url=_1276.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_1278){
if(StageBinding.isViewOpen(_1278.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1278.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1279){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1279.ViewId,isSuccess:_1279.Succeeded});
}
this._lockSystem=function(_127a){
var _127b=top.bindingMap.offlinetheatre;
if(_127a){
_127b.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_127b.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_124e=_127a;
};
this.handleBroadcast=function(_127d,arg){
switch(_127d){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_124b!=null&&arg==_124b){
_124b=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_124c.set(arg,true);
}else{
_1248.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_124c.hasEntries()){
_124c.del(arg);
_1248.debug("Refreshed tree: "+arg+"\n("+_124c.countEntries()+" trees left!)");
if(!_124c.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_124d.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_124d.hasEntries()==true){
_124d.del(arg);
if(!_124d.hasEntries()){
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
function paramsToList(_127f){
var list=new List();
new List(_127f).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _1282=false;
var _1283=false;
var _1284=null;
var _1285=false;
var _1286=Client.qualifies();
var _1287="admin";
var _1288="123456";
if(!_1286){
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
this.handleBroadcast=function(_1289){
switch(_1289){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1289);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _128a=window.bindingMap.appwindow;
_128a.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_128b){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_128c){
if(_128b){
EventBroadcaster.subscribe(_128c,KickStart);
}else{
EventBroadcaster.unsubscribe(_128c,KickStart);
}
});
}
function kickStart(_128d){
switch(_128d){
case BroadcastMessages.AUDIO_INITIALIZED:
_1283=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1282=true;
break;
}
if(_1282&&_1283){
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
DataManager.getDataBinding("username").setValue(_1287);
DataManager.getDataBinding("password").setValue(_1288);
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
this.doLogin=function(_1290,_1291){
var _1292=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1293=false;
var _1294=LoginService.ValidateAndLogin(_1290,_1291);
if(_1294 instanceof SOAPFault){
alert(_1294.getFaultString());
}else{
_1293=_1294;
}
if(_1293){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1292){
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
var _1295=DataManager.getDataBinding("username");
var _1296=DataManager.getDataBinding("password");
_1295.blur();
_1296.blur();
_1295.setValue("");
_1296.setValue("");
_1295.clean();
_1296.clean();
_1295.focus();
document.getElementById("loginerror").style.display="block";
var _1297={handleAction:function(_1298){
document.getElementById("loginerror").style.display="none";
_1298.target.removeActionListener(Binding.ACTION_DIRTY,_1297);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1297);
}
WindowManager.fireOnLoad(this);
if(!_1286){
UpdateManager.isEnabled=false;
}
};

