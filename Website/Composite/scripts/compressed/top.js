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
var _12f=this._getAction(_129);
if(_12a[_12f]){
switch(_12b){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_12b=_12b==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_12a[_12f](_12b,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_12c.handleEvent(e);
}
}},_12d?true:false);
break;
default:
_12a[_12f](_12b,_12c,_12d?true:false);
break;
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_132){
var _133=null;
switch(_132){
case true:
_133="addEventListener";
break;
case false:
_133="removeEventListener";
break;
}
return _133;
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_135){
var _136=null;
var _137=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_137=node.documentElement;
}
if(_137.xml!=null){
return _137.xml;
}else{
if(this._serializer!=null){
if(_135==true){
_137=_137.cloneNode(true);
_137=DOMFormatter.format(_137,DOMFormatter.INDENTED_TYPE_RESULT);
}
_136=this._serializer.serializeToString(_137);
}
}
return _136;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _13a=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_13b){
var doc=_13b.ownerDocument;
var _13d=function(node,_13f){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _140="",i=0;
while(i++<_13f){
_140+=TAB;
}
var _142=node.firstChild;
while(_142){
switch(_142.nodeType){
case Node.ELEMENT_NODE:
if(_142==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_140));
}
node.insertBefore(doc.createTextNode(NEW+_140+TAB),_142);
_13d(_142,_13f+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_140+TAB),_142);
break;
}
if(_142.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_142,_140+TAB);
}
}
_142=_142.nextSibling;
}
}
};
_13d(_13b,0);
}
function strip(_143){
var _144=[];
var _145={acceptNode:function(_146){
return (!_13a.test(_146.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _147=_143.ownerDocument.createTreeWalker(_143,NodeFilter.SHOW_TEXT,_145,true);
while(_147.nextNode()){
_144.push(_147.currentNode);
}
var i=0,_149;
while((_149=_144[i++])!=null){
_149.parentNode.removeChild(_149);
}
}
function formatCDATASection(node,_14b){
if(node.textContent.indexOf(NEW)>-1){
var _14c=node.textContent.split(NEW);
var _14d="",line,_14f=0,_150=true;
while((line=_14c.shift())!=null){
if(_14f==0&&line.charAt(0)==TAB){
while(line.charAt(_14f++)==TAB){
}
}
line=line.substring(_14f,line.length);
if(_14c.length>0){
_14d+=_14b+TAB+line;
_14d+=_150?"":"\n";
}else{
_14d+=_14b+line;
_14b=_14b.slice(1,_14b.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_14b));
}
_150=false;
}
node.textContent=_14d;
}
}
this.format=function(_151,_152){
var _153=1;
if(document.createTreeWalker&&!Client.isExplorer){
try{
strip(_151);
if(_152!=_153){
indent(_151);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_151);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_154){
var sig,_156=null,_157=this.MSXML_MAXVERSION;
while(!_156&&_157>=this.MSXML_MINVERSION){
try{
sig=_154.replace("{$version}",_157);
_156=new ActiveXObject(sig);
}
catch(exception){
}
_157--;
}
return _156;
},getXMLHTTPRequest:function(){
var _158=null;
if(Client.isExplorer){
_158=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_158=new XMLHttpRequest();
}
return _158;
},getDOMDocument:function(_159){
var _15a=null;
if(Client.isExplorer){
_15a=this.getMSComponent(_159?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_15a=doc;
}
return _15a;
},getMSXMLXSLTemplate:function(){
var _15c=null;
if(Client.isExplorer){
_15c=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _15c;
},getLocalName:function(_15d){
var _15e=null;
if(_15d.localName){
_15e=_15d.localName.replace("ui:","");
}else{
if(_15d.baseName){
_15e=_15d.baseName;
}else{
_15e=_15d.nodeName.toLowerCase();
}
}
return _15e;
},getComputedStyle:function(_15f,_160){
var _161=null;
if(Client.isExplorer){
if(_15f.currentStyle!=null){
_161=_15f.currentStyle[_160];
}else{
this._logger.error("Could not compute style for element "+_15f.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _162=_15f.ownerDocument.defaultView.getComputedStyle(_15f,null);
if(_162!=null){
_161=_162.getPropertyValue(_160);
}else{
this._logger.error("Could not compute style for element "+_15f.nodeName);
SystemDebug.stack(arguments);
}
}
return _161;
},getMaxIndex:function(doc){
var max=0,_165=new List(doc.getElementsByTagName("*"));
_165.each(function(_166){
var _167=CSSComputer.getZIndex(_166);
if(_167>max){
max=_167;
}
});
return max;
},getOrdinalPosition:function(_168,_169){
var _16a=null;
var _16b=-1;
var _16c=this.getLocalName(_168);
var _16d=new List(_168.parentNode.childNodes);
while(_16d.hasNext()){
var _16e=_16d.getNext();
if(_16e.nodeType==Node.ELEMENT_NODE){
if(!_169||this.getLocalName(_16e)==_16c){
_16b++;
if(_16e==_168||(_16e.id!=""&&_16e.id==_168.id)){
_16a=_16b;
break;
}
}
}
}
return _16a;
},isFirstElement:function(_16f,_170){
return (this.getOrdinalPosition(_16f,_170)==0);
},isLastElement:function(_171,_172){
var _173=_171.parentNode.getElementsByTagName(_172?this.getLocalName(_171):"*");
return (this.getOrdinalPosition(_171)==_173.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _177=null;
if(node.textContent){
_177=node.textContent;
}else{
if(node.text){
_177=node.text;
}else{
_177=node.innerText;
}
}
return _177;
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
},getAncestorByLocalName:function(_17a,node,_17c){
var _17d=null;
while(_17d==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_17c==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_17a){
_17d=node;
}
}
return _17d;
},contains:function(_17f,node){
return _17f.contains?_17f!=node&&_17f.contains(node):!!(_17f.compareDocumentPosition(node)&16);
},createElementNS:function(_181,_182,_183){
var _184=null;
if(_183==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_184=_183.createElementNS(_181,_182);
}else{
if(_183.xml!=null){
_184=_183.createNode(Node.ELEMENT_NODE,_182,_181);
}else{
_184=_183.createElement(_182.replace("ui:",""));
}
}
}
return _184;
},getElementsByTagName:function(node,_186){
var _187=null;
if(Client.isMozilla){
_187=node.getElementsByTagNameNS(Constants.NS_XHTML,_186);
}else{
_187=node.getElementsByTagName(_186);
}
return _187;
},getNextElementSibling:function(_188){
return Client.isExplorer?_188.nextSibling:_188.nextElementSibling;
},getPreviousElementSibling:function(_189){
return Client.isExplorer?_189.previousSibling:_189.previousElementSibling;
},cloneNode:function(node){
var _18b=null;
if(Client.isMozilla==true){
_18b=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_18b=node.cloneNode(true);
}
return _18b;
},getLocalPosition:function(_18c){
var _18d=new Point(_18c.offsetLeft,_18c.offsetTop);
if(Client.isExplorer&&_18c.parentNode&&_18c.parentNode.currentStyle){
if(_18c.parentNode.currentStyle.position=="static"){
var _18e=this.getLocalPosition(_18c.parentNode);
_18d.x+=_18e.x;
_18d.y+=_18e.y;
}
}
return _18d;
},getGlobalPosition:function(_18f){
return this._getPosition(_18f,false);
},getUniversalPosition:function(_190){
return this._getPosition(_190,true);
},_getPosition:function(_191,_192){
var _193=null;
if(typeof _191.getBoundingClientRect!=Types.UNDEFINED){
var rect=_191.getBoundingClientRect();
_193={x:rect.left,y:rect.top};
if(Client.isMozilla){
_193.x-=_191.scrollLeft;
_193.y-=_191.scrollTop;
}
}else{
_193={x:_191.offsetLeft-_191.scrollLeft,y:_191.offsetTop-_191.scrollTop};
while(_191.offsetParent){
_191=_191.offsetParent;
_193.x+=(_191.offsetLeft-_191.scrollLeft);
_193.y+=(_191.offsetTop-_191.scrollTop);
}
}
if(_192){
var win=DOMUtil.getParentWindow(_191);
if(win){
var _196=win.frameElement;
if(_196){
var add=DOMUtil.getUniversalPosition(_196);
_193.x+=add.x;
_193.y+=add.y;
}
}
}
return new Point(_193.x,_193.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_19b){
var _19c=DOMEvents.getTarget(e);
var _19d={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_19c.ownerDocument;
var win=this.getParentWindow(doc);
_19d.x-=win.pageXOffset;
_19d.y-=win.pageYOffset;
}
if(_19b){
var _1a0=this.getParentWindow(_19c).frameElement;
if(_1a0){
var add=this.getUniversalPosition(_1a0);
_19d.x+=add.x;
_19d.y+=add.y;
}
}
return _19d;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1a3){
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
if(!_1a3){
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
if(!_1a3){
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
},isWellFormedDocument:function(xml,_1a6){
var _1a7=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1a9=SourceValidationService.IsWellFormedDocument(xml);
if(_1a9!="True"){
_1a7=false;
if(_1a6==true){
this._illFormedDialog(_1a9);
}
}
return _1a7;
},isWellFormedFragment:function(xml,_1ab){
var _1ac=true;
var _1ad=SourceValidationService.IsWellFormedFragment(xml);
if(_1ad!="True"){
_1ac=false;
if(_1ab==true){
this._illFormedDialog(_1ad);
}
}
return _1ac;
},_illFormedDialog:function(_1ae){
setTimeout(function(){
if(Client.isWebKit){
alert(_1ae);
}else{
Dialog.error("Not well-formed",_1ae);
}
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1af){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1b0){
return _1af[_1b0];
}};
}else{
this._nsResolver=_1af;
}
};
XPathResolver.prototype.resolve=function(_1b1,node,_1b3){
var _1b4=null;
try{
if(this._evaluator){
_1b4=this._evaluateDOMXpath(_1b1,node,_1b3?true:false);
}else{
_1b4=this._evaluateMSXpath(_1b1,node,_1b3?true:false);
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
return _1b4;
};
XPathResolver.prototype.resolveAll=function(_1b5,node){
return this.resolve(_1b5,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1b7,node,_1b9){
var _1ba=null;
if(node){
var _1ba=this._evaluator.evaluate(_1b7,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1b9){
var list=new List();
while((node=_1ba.iterateNext())!=null){
list.add(node);
}
_1ba=list;
}else{
_1ba=_1ba.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1ba;
};
XPathResolver.prototype._evaluateMSXpath=function(_1bd,node,_1bf){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1c1="";
for(var _1c2 in this._nsResolver){
_1c1+="xmlns:"+_1c2+"=\""+this._nsResolver[_1c2]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1c1);
if(_1bf){
var list=new List();
var i=0,_1c5=node.selectNodes(_1bd);
while(i<_1c5.length){
list.add(_1c5.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1bd);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1c7=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1c7);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1c7;
}
};
XSLTransformer.prototype._import=function(url){
var _1c9=null;
if(Client.isMozilla){
var _1ca=DOMUtil.getXMLHTTPRequest();
_1ca.open("get",Resolver.resolve(url),false);
_1ca.send(null);
_1c9=_1ca.responseXML;
}else{
var _1c9=DOMUtil.getDOMDocument(true);
_1c9.async=false;
_1c9.load(url);
}
return _1c9;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1cc=null;
if(Client.isMozilla){
_1cc=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1cc;
};
XSLTransformer.prototype.transformToString=function(dom,_1ce){
var _1cf=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1cf=DOMSerializer.serialize(doc,_1ce);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1cf=proc.output;
}
return _1cf;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1d2){
var _1d3=_1d2.style?_1d2.className:_1d2.getAttribute("class");
_1d3=_1d3?_1d3:"";
return _1d3;
},_contains:function(_1d4,sub){
return _1d4.indexOf(sub)>-1;
},_attach:function(_1d6,sub){
return _1d6+(_1d6==""?"":" ")+sub;
},_detach:function(_1d8,sub){
if(this._contains(_1d8," "+sub)){
sub=" "+sub;
}
return _1d8.replace(sub,"");
},attachClassName:function(_1da,_1db){
if(_1da.classList!=null){
if(!_1da.classList.contains(_1db)){
_1da.classList.add(_1db);
}
}else{
var _1dc=this._getCurrent(_1da);
if(!this._contains(_1dc,_1db)){
_1dc=this._attach(_1dc,_1db);
}
if(_1da.style!=null){
_1da.className=_1dc;
}else{
_1da.setAttribute("class",_1dc);
}
}
},detachClassName:function(_1dd,_1de){
if(_1dd.classList!=null){
if(_1dd.classList.contains(_1de)){
_1dd.classList.remove(_1de);
}
}else{
var _1df=this._getCurrent(_1dd);
if(this._contains(_1df,_1de)){
_1df=this._detach(_1df,_1de);
}
if(_1dd.style!=null){
_1dd.className=_1df;
}else{
if(_1df==""){
_1dd.removeAttribute("class");
}else{
_1dd.setAttribute("class",_1df);
}
}
}
},hasClassName:function(_1e0,_1e1){
var _1e2=false;
if(_1e0.classList!=null){
_1e2=_1e0.classList.contains(_1e1);
}else{
_1e2=this._contains(this._getCurrent(_1e0),_1e1);
}
return _1e2;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1e3,_1e4){
var _1e5={};
for(var _1e6 in _1e3){
var ent=parseInt(DOMUtil.getComputedStyle(_1e4,_1e3[_1e6]));
_1e5[_1e6]=isNaN(ent)?0:ent;
}
return _1e5;
},_getMargin:function(_1e8){
return this._getComplexResult(this._margins,_1e8);
},getPadding:function(_1e9){
return this._getComplexResult(this._paddings,_1e9);
},getBorder:function(_1ea){
return this._getComplexResult(this._borders,_1ea);
},getPosition:function(_1eb){
return DOMUtil.getComputedStyle(_1eb,"position");
},getFloat:function(_1ec){
return DOMUtil.getComputedStyle(_1ec,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1ed){
return parseInt(DOMUtil.getComputedStyle(_1ed,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1ee){
return DOMUtil.getComputedStyle(_1ee,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1ef=SystemLogger.getLogger("System");
var root=null;
var _1f1=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_1f2){
if(_1f1==null){
_1f1={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_1f3){
_1f1[_1f3.Key]=_1f3.Value;
});
}
return _1f1[_1f2];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1f4=new List();
var _1f5=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1f5);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1f7){
_1f4.add(new SystemNode(_1f7));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1f4;
};
this.getChildNodes=function(node,_1f9){
var _1fa=new List();
var _1fb=null;
if(_1f9){
if(SearchTokens.hasToken(_1f9)){
_1f9=SearchTokens.getToken(_1f9);
}
_1fb=TreeService.GetElementsBySearchToken(node.getData(),_1f9);
}else{
_1fb=TreeService.GetElements(node.getData());
}
new List(_1fb).each(function(_1fc){
var _1fd=new SystemNode(_1fc);
if(_1f9){
_1fd.searchToken=_1f9;
}
_1fa.add(_1fd);
});
return _1fa;
};
this.getDescendantBranch=function(_1fe){
var map=new Map();
var arg=[];
_1fe.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _202=TreeService.GetMultipleChildren(arg);
var _203=new List(_202);
while(_203.hasNext()){
this._listNodesInMap(_203.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_204,_205,_206){
var map=new Map();
var arg=[];
_206.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _20a=TreeService.FindEntityToken(_204,_205,arg);
if(_20a instanceof SOAPFault){
_1ef.error(_20a.getFaultString());
if(Application.isDeveloperMode){
alert(_20a.getFaultString());
}
map=null;
}else{
var _20b=new List(_20a);
while(_20b.hasNext()){
this._listNodesInMap(_20b.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_20c,map){
var list=new List();
var key=_20c.ElementKey;
var _210=new List(_20c.ClientElements);
map.set(key,list);
while(_210.hasNext()){
var _211=_210.getNext();
list.add(new SystemNode(_211));
}
};
this.getChildNodesBySearchToken=function(node,_213){
return this.getChildNodes(node,_213);
};
this.getNamedRoots=function(key,_215){
var _216=new List();
var _217=null;
if(_215){
if(SearchTokens.hasToken(_215)){
_215=SearchTokens.getToken(_215);
}
_217=TreeService.GetNamedRootsBySearchToken(key,_215);
}else{
_217=TreeService.GetNamedRoots(key);
}
new List(_217).each(function(_218){
var node=new SystemNode(_218);
if(_215){
node.searchToken=_215;
}
_216.add(node);
});
return _216;
};
this.getNamedRootsBySearchToken=function(key,_21b){
return this.getNamedRoots(key,_21b);
};
function compileActionList(node,_21d,_21e){
var _21f=_21d.ClientElementActionGroupId;
if(_21f!=null){
var _220=_21e.get(_21f).ClientElementActionGroupItems;
if(_220&&_220.length>0){
node.setActionList(new List(_220));
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
new List(self._data.Actions).each(function(_226){
var _227=_226.ActionCategory.Name;
if(SystemAction.hasCategory(_227)){
var _228=new SystemAction(_226);
SystemAction.actionMap.set(_226.ActionKey,_228);
}else{
throw "No such action category: "+_227;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _229=null;
if(this.searchToken){
_229=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_229=System.getChildNodes(this);
}
return _229;
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
var _22b=this._data.Piggybag;
if(_22b==null){
_22b="";
}
return _22b;
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
var _22d=null;
if(typeof this._data.ToolTip!="undefined"){
_22d=this._data.ToolTip;
}
return _22d;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_22f){
map[_22f.Key]=_22f.Value;
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
var _233=SystemAction.actionMap.get(key);
var _234=true;
if(_233.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_234=false;
}
}
if(_234){
var id=_233.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_233);
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
SystemAction.invoke=function(_237,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_237.logger.debug("Execute \""+_237.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_237.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_23a,_23b){
action=SystemAction.taggedActions.get(_23a);
node=SystemNode.taggedNodes.get(_23b);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_23c){
return SystemAction.categories[_23c]?true:false;
};
function SystemAction(_23d){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_23d;
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
var _23e=null;
if(this.isInFolder()){
_23e=this._data.ActionCategory.FolderName;
}
return _23e;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _23f=null;
if(typeof this._data.TagValue!="undefined"){
_23f=this._data.TagValue;
}
return _23f;
};
SystemAction.prototype.isChecked=function(){
var _240=null;
if(this.isCheckBox()){
_240=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _240;
};
function _UpdateManager(){
var _241=null;
if(!window.UpdateManager){
this._construct();
_241=this;
}
return _241;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_242){
var root=document.documentElement;
var _244=root.namespaceURI;
if(_244==null){
_244=new String(root.getAttribute("xmlns"));
}
if(_244=="http://www.w3.org/1999/xhtml"){
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
var _245=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_245);
}else{
throw new TypeError();
}
}else{
var _246=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_246.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _248=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_248=true;
}
},this);
return _248;
},_setupForm:function(form){
var _24b=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_24b.isEnabled){
_24b._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_24c,type){
if(_24c.addEventListener!=null){
_24c.addEventListener(type,this,false);
}else{
var _24e=this;
_24c.attachEvent("on"+type,function(){
_24e.handleEvent(window.event);
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
var _253=UpdateAssistant.getUpdateZones(dom);
var _254=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_253.forEach(function(_255,_256){
var _257=_254[_256];
this._crawl(_255,_257);
},this);
this._updates.forEach(function(_258,_259){
_258.update();
_258.dispose();
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
},_crawl:function(_25b,_25c,_25d,id){
var _25f=true;
var _260=_25c.getAttribute("class");
if(_260==null||_260.indexOf(this.CLASSNAME_GONE)==-1){
if(_25c.nodeType==Node.ELEMENT_NODE){
var _261=_25c.getAttribute("id");
if(_261!=null){
_25d=_25b;
id=_261;
}
}
if(_25f=this._check(_25b,_25c,_25d,id)){
var _262=_25b.firstChild;
var _263=_25c.firstChild;
while(_262!=null&&_263!=null&&!this._replaced[id]){
switch(_262.nodeType){
case Node.TEXT_NODE:
_25f=this._check(_262,_263,_25d,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_25f=this._crawl(_262,_263,_25d,id);
break;
}
if(this._replaced[id]){
_25f=false;
}else{
_262=_262.nextSibling;
_263=_263.nextSibling;
}
}
}
}
return _25f;
},_check:function(_264,_265,_266,id){
var _268=true;
var _269=null;
var _26a=false;
var _26b=false;
if((_264!=null&&_265==null)||(_264==null&&_265!=null)){
_268=false;
}else{
if(_268=_264.nodeType==_265.nodeType){
switch(_265.nodeType){
case Node.ELEMENT_NODE:
if(_264.namespaceURI!=_265.namespaceURI||_264.nodeName!=_265.nodeName){
_268=false;
}else{
if(_268=(_264.nodeName==_265.nodeName)){
var _26c=_265.getAttribute("id");
var _26d=_264.getAttribute("id");
if(_26c!=null&&_26d!=null){
if(_26c!=_26d){
_268=false;
}else{
if((_269=this._getPlugin(_264,_265))!=null){
if(_269.updateElement(_264,_265)){
_26b=true;
_268=false;
}
}
}
}
if(_268){
if(_268=this._checkAttributes(_264,_265)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_264)&&this._hasSoftChildren(_265)){
if(this._validateSoftChildren(_264,_265)){
this._updateSoftChildren(_264,_265);
_26a=true;
}
_268=false;
}else{
_268=_264.childNodes.length==_265.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_264.data.trim()!=_265.data.trim()){
_268=false;
}
break;
}
}
}
if(_268==false&&!_26a&&!_26b){
if(id!=null&&_266!=null){
this.addUpdate(new ReplaceUpdate(id,_266));
}
}
return _268;
},_checkAttributes:function(_26e,_26f){
var _270=true;
var _271=false;
var _272=_26e.attributes;
var _273=_26f.attributes;
if(_272.length!=_273.length){
_271=true;
}else{
_271=!Array.every(_272,function(att1,i){
var att2=_273.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_271){
var _277=_26e.getAttribute("id");
var _278=_26f.getAttribute("id");
if(this.hasSoftAttributes&&_277!=null&&_277==_278){
this.addUpdate(new AttributesUpdate(_278,_26e,_26f));
}else{
_270=false;
}
}
return _270;
},_hasSoftChildren:function(_279){
var _27a=true;
if(_279.hasChildNodes()){
_27a=Array.every(_279.childNodes,function(node){
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
return _27a;
},_validateSoftChildren:function(_27d,_27e){
var _27f=true;
var _280=-1;
var _281=-1;
var _282=-1;
var news=this._toMap(_27d.childNodes,true);
var olds=this._toMap(_27e.childNodes,true);
for(var id in olds){
if(_27f){
var _286=olds[id];
_27f=_286>=_280;
if(news[id]!=null){
_282=news[id];
_27f=_282>=_281;
}
}
_280=_286;
if(_282>-1){
_281=_282;
}
}
return _27f;
},_updateSoftChildren:function(_287,_288){
var news=this._toMap(_287.childNodes);
var olds=this._toMap(_288.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _28c=null;
for(id in news){
if(olds[id]==null){
var _28d=news[id];
if(_28c==null){
var _28e=_288.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_28e,_28d,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_28c,_28d,false));
}
}
_28c=id;
}
},addUpdate:function(_28f){
this._updates.push(_28f);
if(_28f instanceof ReplaceUpdate){
this._replaced[_28f.id]=true;
}
},_getPlugin:function(_290,_291){
var _292=null;
this.plugins.every(function(_293){
if(_293.handleElement(_290,_291)){
_292=_293;
}
return _292==null;
});
return _292;
},_toMap:function(_294,_295){
var _296={};
Array.forEach(_294,function(node,_298){
if(node.nodeType==Node.ELEMENT_NODE){
_296[node.getAttribute("id")]=_295?_298:node;
}
});
return _296;
},_getPost:function(form){
var _29a=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_29c){
if(_29c.name==null||_29c.name==""){
return;
}
var name=_29c.name;
var _29e=encodeURIComponent(_29c.value);
switch(_29c.type){
case "button":
case "submit":
var _29f=UpdateAssistant.getActiveElement();
if(_29c==_29f&&name!=""){
_29a+=name+"="+_29e+"&";
}
break;
case "radio":
if(_29c.checked){
_29a+=name+"="+_29e+"&";
}
break;
case "checkbox":
if(_29c.checked){
if(_29c.name==last){
if(_29a.lastIndexOf("&")==_29a.length-1){
_29a=_29a.substr(0,_29a.length-1);
}
_29a+=","+_29e;
}else{
_29a+=name+"="+_29c.value;
}
last=name;
_29a+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_29a+=name+"="+_29e+"&";
break;
}
});
}
return _29a.substr(0,_29a.length-1);
},_postRequest:function(form){
var _2a1=form.method!=""?form.method:"get";
var _2a2=form.action!=""?form.action:window.location.toString();
var _2a3=this._getPost(form);
if(_2a1=="get"){
if(_2a2.indexOf("?")>-1){
_2a2=_2a2+"&"+_2a3;
}else{
_2a2+"?"+_2a3;
}
}
var _2a4=this;
var _2a5=UpdateAssistant.getXMLHttpRequest(_2a1,_2a2,this);
if(_2a1=="post"){
_2a5.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2a5.send(_2a1=="post"?_2a3:null);
},_fixdotnet:function(dom,id){
var _2a8=document.getElementById(id);
if(_2a8!=null){
var _2a9=UpdateAssistant.getElementById(dom,id);
if(_2a9!=null){
var _2aa=_2a9.getAttribute("value");
if(_2aa!==_2a8.value){
_2a8.value=_2aa;
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
},report:function(_2ad){
this.summary+=_2ad+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2ae=null;
if(!window.UpdateAssistant){
this._construct();
_2ae=this;
}
return _2ae;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2af,fun){
var _2b1=true;
var len=_2af.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2b3=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2af[i]!="undefined"){
if(!fun.call(_2b3,_2af[i],i,_2af)){
_2b1=false;
break;
}
}
}
}
return _2b1;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2b6=arguments[1];
return Array.every(this,fun,_2b6);
};
}
if(!Array.forEach){
Array.forEach=function(_2b7,fun){
var len=_2b7.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2ba=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b7[i]!="undefined"){
fun.call(_2ba,_2b7[i],i,_2b7);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2bd=arguments[1];
Array.forEach(this,fun,_2bd);
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
},getXMLHttpRequest:function(_2bf,_2c0,_2c1){
var _2c2=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2c2!=null){
_2c2.open(_2bf,_2c0,(_2c1!=null?true:false));
if(_2c1!=null){
function action(){
if(_2c2.readyState==4){
var text=_2c2.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2c1.handleResponse(dom);
}
}
}
if(_2c2.addEventListener!=null){
_2c2.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2c2.onreadystatechange=action;
}
}
}
return _2c2;
},dispatchEvent:function(_2c5,name){
var _2c7=true;
var _2c8=document.createEvent("UIEvents");
_2c8.initEvent(name,true,true);
_2c7=_2c5.dispatchEvent(_2c8);
return _2c7;
},getUpdateZones:function(dom){
var _2ca="//*[@id and contains(@class,'updatezone')]";
var _2cb=[];
var _2cc=null;
var _2cd=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2cc=dom.evaluate(_2ca,dom,null,type,null);
while((_2cd=_2cc.iterateNext())!=null){
_2cb.push(_2cd);
}
}else{
_2cc=dom.documentElement.selectNodes(_2ca);
Array.forEach(_2cc,function(_2cf){
_2cb.push(_2cf);
});
}
return _2cb;
},getElementById:function(dom,id){
var _2d2="//*[@id='"+id+"']";
var _2d3=null;
var _2d4=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2d3=dom.evaluate(_2d2,dom,null,type,null);
_2d4=_2d3.singleNodeValue;
}else{
_2d4=dom.documentElement.selectNodes(_2d2)[0];
}
return _2d4;
},_getIds:function(dom){
var _2d7="//*[@id]";
var _2d8=null;
var _2d9=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d8=dom.evaluate(_2d7,dom,null,type,null);
while((element=_2d8.iterateNext())!=null){
_2d9.push(element.getAttribute("id"));
}
}else{
_2d8=dom.documentElement.selectNodes(_2d7);
Array.forEach(_2d8,function(_2db){
_2d9.push(_2db.getAttribute("id"));
});
}
return _2d9;
},toHTMLElement:function(_2dc){
var _2dd=this.serialize(_2dc);
var temp=document.createElement("temp");
temp.innerHTML=_2dd;
return temp.firstChild;
},getActiveElement:function(){
var _2df=document.activeElement;
if(_2df==null||_2df==document.body){
_2df=this._activeElement;
}
return _2df;
},serialize:function(_2e0){
var _2e1=null;
if(_2e0.xml!=null){
_2e1=_2e0.xml;
}else{
if(this._serializer!=null){
_2e1=this._serializer.serializeToString(_2e0);
}
}
return _2e1;
},hasDifferences:function(_2e2,_2e3){
var s1=null;
var s2=null;
if(_2e2.xml!=null){
s1=_2e2.xml;
s2=_2e3.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2e2);
s2=this._serializer.serializeToString(_2e3);
}
}
return s1!=s2;
},parse:function(_2e6){
var _2e7=null;
if(this._parser!=null&&window.XPathResult!=null){
_2e7=this._parser.parseFromString(_2e6,"text/xml");
}else{
_2e7=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2e7.setProperty("SelectionLanguage","XPath");
_2e7.loadXML(_2e6);
}
return this._validate(_2e7);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2ea=dom.getElementsByTagName("parsererror").item(0);
if(_2ea!=null){
out=_2ea.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2ee=!has[id];
has[id]=true;
if(!_2ee){
out="Element \""+id+"\" encountered twice.";
}
return _2ee;
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
this.handleElement=function(_2ef,_2f0){
var _2f1=false;
switch(_2ef.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2ef.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2f1=false;
break;
}
break;
}
return _2f1;
};
this.updateElement=function(_2f2,_2f3){
var id=_2f2.getAttribute("id");
var _2f5=document.getElementById(id);
if(_2f5!=null){
var _2f6=null;
switch(_2f5.nodeName.toLowerCase()){
case "input":
_2f6=_2f2.getAttribute("value");
break;
case "textarea":
_2f6=_2f2.textContent?_2f2.textContent:_2f2.text;
break;
}
if(_2f6==null){
_2f6="";
}
if(_2f6!=_2f5.value){
_2f5.value=_2f6;
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
},_beforeUpdate:function(_2f7){
var _2f8=true;
if(_2f7!=null){
_2f7.__updateType=this.type;
_2f8=UpdateAssistant.dispatchEvent(_2f7,Update.EVENT_BEFOREUPDATE);
}
return _2f8;
},_afterUpdate:function(_2f9){
var _2fa=true;
if(_2f9!=null){
_2f9.__updateType=this.type;
_2fa=UpdateAssistant.dispatchEvent(_2f9,Update.EVENT_AFTERUPDATE);
}
return _2fa;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_2fc){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_2fc;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _2fd,_2fe,_2ff=UpdateAssistant.toHTMLElement(this.element);
if((_2fd=document.getElementById(this.id))!=null){
if((_2fe=_2fd.parentNode)!=null){
var _300=UserInterface.getBinding(_2fd);
if(_300!=null){
_2ff.__isAttached=_300.isAttached;
}
if(this._beforeUpdate(_2fd)){
_2fe.replaceChild(_2ff,_2fd);
this._afterUpdate(_2ff);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_301){
var _302=ReplaceUpdate.superclass._afterUpdate.call(this,_301);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_301.nodeName=="form"||_301.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _302;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_305,_306){
this.type=type;
this.id=id;
this.element=_305;
this.isFirst=_306;
return this;
}
SiblingUpdate.prototype.update=function(){
var _307=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_307);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_307);
break;
}
};
SiblingUpdate.prototype._remove=function(_308){
var _309=_308.parentNode;
if(_309!=null){
if(this._beforeUpdate(_308)){
_309.removeChild(_308);
this._afterUpdate(_309);
}
}
};
SiblingUpdate.prototype._insert=function(_30a,_30b){
var _30c=UpdateAssistant.toHTMLElement(_30a);
if(this.isFirst){
var _30d=_30b;
if(_30d!=null){
if(this._beforeUpdate(_30d)){
_30d.insertBefore(_30c,_30d.firstChild);
this._afterUpdate(_30c);
}
}
}else{
var _30d=_30b.parentNode;
if(_30d!=null){
if(this._beforeUpdate(_30d)){
_30d.insertBefore(_30c,_30b.nextSibling);
this._afterUpdate(_30c);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_30e){
var _30f=SiblingUpdate.superclass._beforeUpdate.call(this,_30e);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_30e.id+"\"");
}
return _30f;
};
SiblingUpdate.prototype._afterUpdate=function(_310){
var _311=true;
if(_310!=null){
_311=SiblingUpdate.superclass._afterUpdate.call(this,_310);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_310.id+"\"");
if(_310.nodeName=="form"||_310.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _311;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_313,_314){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_313;
this.currentElement=_314;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _315=document.getElementById(this.id);
if(this._beforeUpdate(_315)){
this._updateAttributes(_315);
this._afterUpdate(_315);
}
};
AttributesUpdate.prototype._updateAttributes=function(_316){
Array.forEach(this.element.attributes,function(_317){
var _318=this.currentElement.getAttribute(_317.nodeName);
if(_318==null||_318!=_317.nodeValue){
this._setAttribute(_316,_317.nodeName,_317.nodeValue);
this._summary.push("@"+_317.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_319){
if(this.element.getAttribute(_319.nodeName)==null){
this._setAttribute(_316,_319.nodeName,null);
this._summary.push("@"+_319.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_31a,name,_31c){
if(_31a==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_31c);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _31d=(_31c==null);
if(_31d){
_31a.removeAttribute(name);
}else{
_31a.setAttribute(name,_31c);
}
if(document.all!=null){
if(_31d){
_31c="";
}
switch(name.toLowerCase()){
case "class":
_31a.className=_31c;
break;
case "disabled":
_31a.disabled=!_31d;
break;
case "checked":
_31a.checked=!_31d;
break;
case "readonly":
_31a.readOnly=!_31d;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_31e){
AttributesUpdate.superclass._afterUpdate.call(this,_31e);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_31f,key){
return _31f.replace("${windowkey}",document.location+":"+key);
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
var _323=this._newDimensions.w!=this._currentDimensions.w;
var _324=this._newDimensions.h!=this._currentDimensions.h;
if(_323||_324){
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
},fireOnDOM:function(_326){
if(Interfaces.isImplemented(IDOMHandler,_326,true)){
this._ondomstatements.add(_326);
}
},fireOnLoad:function(_327){
if(Interfaces.isImplemented(ILoadHandler,_327,true)){
this._onloadstatements.add(_327);
}
},fireOnResize:function(_328){
if(Interfaces.isImplemented(IResizeHandler,_328,true)){
this._onresizestatements.add(_328);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_329){
return eval(_329);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_32a,_32b){
SystemLogger.unsuspend(_32b);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_32c,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _32f=top.app.bindingMap.broadcasterHasDirtyTabs;
_32f.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_330,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _333=top.app.bindingMap.broadcasterHasDirtyTabs;
_333.disable();
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
var _334=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_334=LoginService.Logout(true);
if(!_334){
alert("Logout failed.");
}
}
return _334;
},lock:function(_335){
if(_335!=null){
this._lockthings[_335]=true;
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
},unlock:function(_336,_337){
if(_336!=null){
delete this._lockthings[_336];
if(top.bindingMap.mastercover!=null){
if(_337||this._lockers>0){
if(_337){
var out="Unlocked by "+new String(_336)+"\n";
for(var _339 in this._lockthings){
out+="Locked by "+new String(_339)+". ";
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
},hasLock:function(_33a){
return this._lockthings[_33a]==true;
},activate:function(_33b){
var _33c=this._activeBinding;
this._activeBinding=_33b;
this._activatedBindings.add(_33b);
if(_33c&&_33c.isActive){
_33c.deActivate();
}
},deActivate:function(_33d){
var _33e=null;
var _33f=null;
if(_33d==this._activeBinding){
while(!_33f&&this._activatedBindings.hasEntries()){
_33e=this._activatedBindings.extractLast();
if(_33e!=_33d&&_33e.isActivatable){
_33f=_33e;
}
}
if(!_33f){
_33f=app.bindingMap.explorerdock;
}
_33f.activate();
}
},focused:function(_340){
this.isFocused=_340;
if(_340){
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
},handleAction:function(_345){
switch(_345.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _347=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_349){
var src=_349.src;
if(src.indexOf(_347)>-1){
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
var _34e=false;
if(this._isMousePositionTracking){
_34e=true;
if(Client.isExplorer&&e.button!=1){
_34e=false;
}
if(_34e){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _34e;
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
},onDragStart:function(_350){
var _351=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_351,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_351.getImage());
this._cursorStartPoint=_350;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_351.showDrag){
_351.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_351.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _353=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_353);
}
},onDragStop:function(diff){
if(this._isDragging){
var _355=BindingDragger.draggedBinding;
if(_355.hideDrag){
_355.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_355.dragType);
this._isDragging=false;
_355=BindingAcceptor.acceptingBinding;
if(_355!=null){
if(Interfaces.isImplemented(IAcceptable,_355,true)==true){
_355.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_355);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_356){
if(this.isDeveloperMode||_356){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_357){
if(_357==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_358){
switch(_358){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_35a){
switch(_35a.Key){
case "ProductVersion":
this.versionString=_35a.Value;
break;
case "ProductTitle":
this.versionPrettyString=_35a.Value;
break;
case "InstallationId":
this.installationID=_35a.Value;
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
},initialize:function(_35d){
if(!this.isInitialized){
this.isInitialized=true;
if(_35d){
this._audio=_35d;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _35f=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_35f=true;
}
return _35f;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _360=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _361={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _362=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_362){
for(var key in _362){
_361[key]=_362[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_361);
}
}});
this.getPref=function(key){
var _365=null;
if(key){
_365=_361[key];
}else{
throw "No such preference.";
}
return _365;
};
this.setPref=function(key,_367){
if(key){
_361[key]=_367;
}else{
throw "No such preference.";
}
};
function debug(_368){
var _369=_368?"Persisted preferences":"No persisted preferences. Using defaults";
_369+=":\n";
for(var key in _361){
var pref=_361[key];
_369+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_360.fine(_369);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _36e=null;
if(this.isInitialized==true){
if(this._persistance){
var _36f=this._persistance[id];
if(_36f){
_36e=_36f[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _36e;
},setPersistedProperty:function(id,prop,_372){
if(this.isInitialized==true){
if(this._persistance){
if(_372!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_372);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_373){
switch(_373){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _374=top.bindingMap.persistance;
_374.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _375=top.bindingMap.persistance;
var map=_375.getPersistanceMap();
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
function StandardEventHandler(doc,_378){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_378;
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
var _37c={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_37c);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_37c);
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
var _383=UserInterface.getBinding(node);
if(_383!=null){
_383.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_383!=null?null:node.parentNode;
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
var _386=Application.trackMousePosition(e);
if(_386){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_388){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_388){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_388=true;
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
var _389=KeySetBinding.handleKey(this._contextDocument,e);
if(!_389){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _38a=this._contextWindow.frameElement;
if(_38a!=null){
var _38b=DOMUtil.getParentWindow(_38a);
if(_38b.standardEventHandler!=null){
_38b.standardEventHandler._handleKeyDown(e,_388);
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
var _38e=false;
var _38f=DOMEvents.getTarget(e);
var name=_38f.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_38e=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_38e;
}
if(_38e){
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
StandardEventHandler.prototype.enableNativeKeys=function(_392){
this._isAllowTabs=(_392==true?true:false);
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
function Action(_395,type){
this.target=_395;
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
function Animation(_397){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _398 in _397){
this[_398]=_397[_398];
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
Animation.prototype.onstart=function(_39c){
};
Animation.prototype.onstep=function(_39d){
};
Animation.prototype.onstop=function(_39e){
};
Point.isEqual=function(p1,p2){
var _3a1=false;
if(p1&&p2){
_3a1=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a1;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3a6=false;
if(dim1&&dim2){
_3a6=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3a6;
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
function BindingAcceptor(_3ad){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3ad;
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
var _3ae=new List(this._binding.dragAccept.split(" "));
while(_3ae.hasNext()){
var type=_3ae.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3b0,arg){
var type=arg;
try{
switch(_3b0){
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
function BindingBoxObject(_3b5){
this._domElement=_3b5.getBindingElement();
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
function BindingDragger(_3b7){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3b7;
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
BindingDragger.prototype.registerHandler=function(_3b9){
if(Interfaces.isImplemented(IDragHandler,_3b9)==true){
this.handler=_3b9;
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
var _3bc=e.button==(e.target?0:1);
if(_3bc){
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
var _3be=Application.getMousePosition();
var dx=_3be.x-this.startPoint.x;
var dy=_3be.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c1,e){
switch(_3c1){
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
function BindingParser(_3c3){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3c3;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3c4){
var _3c5=new List();
var xml=BindingParser.XML.replace("${markup}",_3c4);
var doc=XMLParser.parse(_3c4);
if(doc){
var _3c8=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3c8);
var node=_3c8.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3c5.add(node);
}
node=node.nextSibling;
}
}
return _3c5;
};
BindingParser.prototype._iterate=function(_3ca,_3cb){
var _3cc=null;
switch(_3ca.nodeType){
case Node.ELEMENT_NODE:
_3cc=this._cloneElement(_3ca);
UserInterface.registerBinding(_3cc);
break;
case Node.TEXT_NODE:
_3cc=this._ownerDocument.createTextNode(_3ca.nodeValue);
break;
}
if(_3cc){
_3cb.appendChild(_3cc);
}
if(_3cc&&_3ca.hasChildNodes()){
var _3cd=_3ca.firstChild;
while(_3cd){
this._iterate(_3cd,_3cc);
_3cd=_3cd.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3ce){
var _3cf=DOMUtil.createElementNS(_3ce.namespaceURI?_3ce.namespaceURI:Constants.NS_XHTML,_3ce.nodeName,this._ownerDocument);
var i=0;
while(i<_3ce.attributes.length){
var attr=_3ce.attributes.item(i++);
_3cf.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3cf;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3d2){
var _3d3=null;
var _3d4=false;
var _3d5=_3d2.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d2)){
var _3d6=UserInterface.getBinding(_3d2);
_3d4=BindingSerializer.activeInstance.indexBinding(_3d6);
if(_3d4){
_3d3=_3d6.key;
_3d2.setAttribute(BindingSerializer.KEYPOINTER,_3d3);
}
}
_3d3=_3d3?_3d3:_3d5;
var _3d7=new List(_3d2.childNodes);
_3d7.each(function(_3d8){
if(_3d8.nodeType==Node.ELEMENT_NODE){
_3d8.setAttribute(BindingSerializer.KEYPOINTER,_3d3);
}
});
if(_3d4){
BindingSerializer.activeInstance.append(_3d3,_3d5);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3d9){
BindingSerializer.activeInstance=this;
_3d9.bindingWindow.ElementIterator.iterate(_3d9.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3da){
var _3db=false;
var _3dc=_3da.serialize();
if(_3dc!=false){
_3db=true;
var _3dd="ui:"+DOMUtil.getLocalName(_3da.bindingElement);
var _3de=DOMUtil.createElementNS(Constants.NS_UI,_3dd,this._dom);
this._pointers[_3da.key]=_3de;
for(var prop in _3dc){
if(_3dc[prop]!=null){
_3de.setAttribute(prop,String(_3dc[prop]));
}
}
}
return _3db;
};
BindingSerializer.prototype.append=function(_3e0,_3e1){
var _3e2=this._pointers[_3e0];
var _3e3=_3e1?this._pointers[_3e1]:this._dom;
_3e3.appendChild(_3e2);
};
function ImageProfile(_3e4){
this._default=_3e4.image;
this._hover=_3e4.imageHover;
this._active=_3e4.imageActive;
this._disabled=_3e4.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3e5){
this._default=_3e5;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3e6){
this._hover=_3e6;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3e7){
this._active=_3e7;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3e8){
this._disabled=_3e8;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3e9,_3ea,_3eb){
var _3ec=null;
if(_3e9.isAttached){
_3ec=new List();
var _3ed=_3eb?_3e9.getChildElementsByLocalName(_3ea):_3e9.getDescendantElementsByLocalName(_3ea);
_3ed.each(function(_3ee){
var _3ef=UserInterface.getBinding(_3ee);
if(_3ef){
_3ec.add(_3ef);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3e9.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3ec;
},getAncestorBindingByType:function(_3f1,impl,_3f3){
var _3f4=null;
if(Binding.exists(_3f1)){
var node=_3f1.bindingElement;
while(_3f4==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3f6=UserInterface.getBinding(node);
if(_3f6 instanceof impl){
_3f4=_3f6;
}
}else{
if(_3f3&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3f4;
},getAncestorBindingByLocalName:function(_3f8,_3f9,_3fa){
var _3fb=null;
if(_3f9=="*"){
var node=_3f8.bindingElement;
while(!_3fb&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3fb=UserInterface.getBinding(node);
}
}
}else{
_3fb=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3f9,_3f8.bindingElement,_3fa));
}
return _3fb;
},getChildElementsByLocalName:function(_3fd,_3fe){
var _3ff=new List();
var _400=new List(_3fd.bindingElement.childNodes);
_400.each(function(_401){
if(_401.nodeType==Node.ELEMENT_NODE){
if(_3fe=="*"||DOMUtil.getLocalName(_401)==_3fe){
_3ff.add(_401);
}
}
});
return _3ff;
},getChildBindingByType:function(_402,impl){
var _404=null;
_402.getChildElementsByLocalName("*").each(function(_405){
var _406=UserInterface.getBinding(_405);
if(_406!=null&&_406 instanceof impl){
_404=_406;
return false;
}else{
return true;
}
});
return _404;
},getDescendantBindingByType:function(_407,impl){
var _409=null;
_407.getDescendantElementsByLocalName("*").each(function(_40a){
var _40b=UserInterface.getBinding(_40a);
if(_40b!=null&&_40b instanceof impl){
_409=_40b;
return false;
}else{
return true;
}
});
return _409;
},getDescendantBindingsByType:function(_40c,impl){
var _40e=new List();
_40c.getDescendantElementsByLocalName("*").each(function(_40f){
var _410=UserInterface.getBinding(_40f);
if(_410!=null&&_410 instanceof impl){
_40e.add(_410);
}
return true;
});
return _40e;
},getNextBindingByLocalName:function(_411,name){
var _413=null;
var _414=_411.bindingElement;
while((_414=DOMUtil.getNextElementSibling(_414))!=null&&DOMUtil.getLocalName(_414)!=name){
}
if(_414!=null){
_413=UserInterface.getBinding(_414);
}
return _413;
},getPreviousBindingByLocalName:function(_415,name){
var _417=null;
var _418=_415.bindingElement;
while((_418=DOMUtil.getPreviousElementSibling(_418))!=null&&DOMUtil.getLocalName(_418)!=name){
}
if(_418!=null){
_417=UserInterface.getBinding(_418);
}
return _417;
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
},addFilter:function(_419){
this._filters.add(_419);
},removeFilter:function(_41a){
var _41b=-1;
this._filters.each(function(fil){
_41b++;
var _41d=true;
if(fil==_41a){
_41d=false;
}
return _41d;
});
if(_41b>-1){
this._filters.del(_41b);
}
},_applyFilters:function(node,arg){
var _420=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _423=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _424=true;
while(this._filters.hasNext()&&_424==true){
var _425=this._filters.getNext();
var res=_425.call(this,node,arg);
if(res!=null){
_420=res;
switch(res){
case stop:
case skip:
case skip+_423:
_424=false;
break;
}
}
}
return _420;
},crawl:function(_427,arg){
this.contextDocument=_427.ownerDocument;
this.onCrawlStart();
var _429=this.type==NodeCrawler.TYPE_ASCENDING;
var _42a=this._applyFilters(_427,arg);
if(_42a!=NodeCrawler.STOP_CRAWLING){
if(_429&&_42a==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_429?_427.parentNode:_427;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_42c,arg){
var _42e=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_42e=this._crawlDescending(_42c,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_42e=this._crawlAscending(_42c,arg);
break;
}
return _42e;
},_crawlDescending:function(_42f,arg){
var skip=NodeCrawler.SKIP_NODE;
var _432=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _434=null;
if(_42f.hasChildNodes()){
var node=_42f.firstChild;
while(node!=null&&_434!=stop){
this.currentNode=node;
_434=this._applyFilters(node,arg);
switch(_434){
case stop:
case _432:
case skip+_432:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_434=stop;
break;
}
}
}
if(_434!=stop&&_434!=skip){
this.previousNode=node;
}
break;
}
if(_434!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _434;
},_crawlAscending:function(_437,arg){
var _439=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_437!=null){
this.currentNode=_437;
_439=this._applyFilters(_437,arg);
if(_439!=stop){
var next=this.nextNode?this.nextNode:_437.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_437;
_439=this._crawl(next,arg);
}
}
}else{
_439=stop;
}
return _439;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _43d in this){
this[_43d]=null;
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
var _440=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_440=NodeCrawler.SKIP_NODE;
}
return _440;
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
this.addFilter(function(_441,arg){
var _443=null;
if(!UserInterface.hasBinding(_441)){
_443=NodeCrawler.SKIP_NODE;
}
return _443;
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
this.addFilter(function(_445,arg){
var _447=null;
var _448=UserInterface.getBinding(_445);
if(Interfaces.isImplemented(ICrawlerHandler,_448)==true){
self.response=null;
_448.handleCrawler(self);
_447=self.response;
}
return _447;
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
this.addFilter(function(_44a,list){
var _44c=null;
var _44d=UserInterface.getBinding(_44a);
if(Interfaces.isImplemented(IFlexible,_44d)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_44d);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_44d.isFlexSuspended==true){
_44c=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_44d);
}
break;
}
}
return _44c;
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
this.addFilter(function(_44e,list){
var _450=null;
var _451=UserInterface.getBinding(_44e);
if(_451.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_451)==true){
if(_451.isFocusable&&_451.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_451);
break;
case FocusCrawler.MODE_FOCUS:
if(!_451.isFocused){
_451.focus();
}
_450=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_451.isFocused==true){
_451.blur();
_450=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _450;
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
this.addFilter(function(_452,list){
var _454=null;
var _455=UserInterface.getBinding(_452);
if(!_455.isVisible){
_454=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _454;
});
this.addFilter(function(_456,list){
var _458=null;
var _459=UserInterface.getBinding(_456);
if(_459.isAttached){
if(Interfaces.isImplemented(IFit,_459)){
if(!_459.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_459);
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
UpdateAssistant.serialize=function(_45a){
_45a=_45a.cloneNode(true);
_45a.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_45a.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_45a);
};
}
},handleEvent:function(e){
var _45c=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_45c);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_45c);
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
},_beforeUpdate:function(_45d){
var _45e=(_45d==document.documentElement);
if(_45e){
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
var _461=FocusBinding.focusedBinding;
if(_461!=null){
this._focusID=_461.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_45d.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_45d);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_45d,false);
break;
}
}
},_afterUpdate:function(_462){
var _463=(_462==document.documentElement);
if(_463){
var _464=this._elementsbuffer;
if(_464.hasEntries()){
_464.each(function(_465){
DocumentManager.attachBindings(_465);
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
var _468=FocusBinding.focusedBinding;
if(_468==null){
var _469=document.getElementById(this._focusID);
if(_469!=null){
var _468=UserInterface.getBinding(_469);
if(_468!=null){
_468.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _46a=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _46b="NEW DOM: "+document.title+"\n\n"+_46a+"\n\n";
_46b+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_46b);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_462.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_462.__isAttached!==false){
this._elementsbuffer.add(_462);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_462,true);
break;
}
switch(_462.id){
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
var _468=UserInterface.getBinding(_462);
while(_468==null&&_462!=null){
_468=UserInterface.getBinding(_462);
_462=_462.parentNode;
}
if(_468!=null){
_468.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_46d,_46e){
var _46f=UserInterface.getBinding(_46d);
if(_46f!=null){
if(_46e){
var _470=this._attributesbuffer;
var map=new Map();
_470.each(function(name,old){
var now=_46d.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_46d.attributes).each(function(att){
if(att.specified){
if(!_470.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_477){
var _478=_46f.propertyMethodMap[name];
if(_478!=null){
_478.call(_46f,_477);
}
});
}else{
var map=new Map();
new List(_46d.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_47a,_47b){
var _47c=window.bindingMap[_47a.getAttribute("id")];
if(_47c!=null){
return _47c.handleElement(_47a,_47b);
}
},updateElement:function(_47d,_47e){
var _47f=window.bindingMap[_47d.getAttribute("id")];
if(_47f!=null){
return _47f.updateElement(_47d,_47e);
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
this.addFilter(function(_481,list){
var _483=UserInterface.getBinding(_481);
var _484=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_483==null){
UserInterface.registerBinding(_481);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_483!=null){
if(!_483.isAttached){
list.add(_483);
}
if(_483.isLazy==true){
_484=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_483!=null){
list.add(_483);
}
break;
}
return _484;
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
},handleBroadcast:function(_485,arg){
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
var _488=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_488)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_488!=null){
if(_488.href!=null&&_488.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _489=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_489!=null){
var map={};
var _48b=DOMUtil.getElementsByTagName(_489,"bindingmapping");
new List(_48b).each(function(_48c){
var _48d=_48c.getAttribute("element");
var _48e=_48c.getAttribute("binding");
map[_48d]=eval(_48e);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_48f){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_48f;
}else{
this.customUserInterfaceMapping.merge(_48f);
}
},_registerBindings:function(_490){
var _491=new DocumentCrawler();
_491.mode=DocumentCrawler.MODE_REGISTER;
_491.crawl(_490);
_491.dispose();
},_attachBindings:function(_492){
var _493=new DocumentCrawler();
_493.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_493.crawl(_492,list);
var _495=false;
while(list.hasNext()){
var _496=list.getNext();
if(!_496.isAttached){
_496.onBindingAttach();
if(!_496.memberDependencies){
_496.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_496)){
_495=true;
}
}
}
if(_495){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_493.dispose();
list.dispose();
},attachBindings:function(_498){
this._registerBindings(_498);
this._attachBindings(_498);
},detachBindings:function(_499,_49a){
var _49b=new DocumentCrawler();
_49b.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_49b.crawl(_499,list);
if(_49a==true){
list.extractFirst();
}
var _49d=false;
list.reverse().each(function(_49e){
if(Interfaces.isImplemented(IData,_49e)){
_49d=true;
}
_49e.dispose(true);
});
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
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4a0){
return (/textarea|input/.test(DOMUtil.getLocalName(_4a0)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a1){
this.isDirty=true;
var _4a2=false;
if(_4a1!=null&&!_4a1.isDirty){
_4a1.isDirty=true;
_4a1.dispatchAction(Binding.ACTION_DIRTY);
_4a2=true;
}
return _4a2;
},clean:function(_4a3){
if(_4a3.isDirty){
_4a3.isDirty=false;
}
},registerDataBinding:function(name,_4a5){
if(Interfaces.isImplemented(IData,_4a5,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4a5;
}
}else{
throw "Invalid DataBinding: "+_4a5;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4a8=null;
if(this._dataBindings[name]!=null){
_4a8=this._dataBindings[name];
}
return _4a8;
},getAllDataBindings:function(_4a9){
var list=new List();
for(var name in this._dataBindings){
var _4ac=this._dataBindings[name];
list.add(_4ac);
if(_4a9&&_4ac instanceof WindowBinding){
var _4ad=_4ac.getContentWindow().DataManager;
if(_4ad!=null){
list.merge(_4ad.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4ae=false;
for(var name in this._dataBindings){
_4ae=true;
break;
}
return _4ae;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4b2){
var _4b3=this._dataBindings[name];
if(_4b3!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4b3.setResult(_4b2);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4b3);
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
var _4b4=new DataBindingMap();
_4b4.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4b6=this._dataBindings[name];
if(_4b6 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4b4[name]=_4b6.getValue();
}
return _4b4;
},getDataBindingResultMap:function(){
var _4b7=new DataBindingMap();
_4b7.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4b9=this._dataBindings[name];
var res=_4b9.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4bc){
_4b7.set(name,_4bc);
});
}else{
_4b7.set(name,res);
}
}
return _4b7;
},getPostBackString:function(){
var _4bd="";
var form=document.forms[0];
if(form!=null){
var _4bf="";
new List(form.elements).each(function(_4c0){
var name=_4c0.name;
var _4c2=encodeURIComponent(_4c0.value);
switch(_4c0.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4bd+=name+"="+_4c2+"&";
break;
case "submit":
if(document.activeElement==_4c0){
_4bd+=name+"="+_4c2+"&";
}
break;
case "radio":
if(_4c0.checked){
_4bd+=name+"="+_4c2+"&";
}
break;
case "checkbox":
if(_4c0.checked){
if(_4c0.name==_4bf){
if(_4bd.lastIndexOf("&")==_4bd.length-1){
_4bd=_4bd.substr(0,_4bd.length-1);
}
_4bd+=","+_4c2;
}else{
_4bd+=name+"="+_4c0.value;
}
_4bf=name;
_4bd+="&";
}
break;
}
});
}
return _4bd.substr(0,_4bd.length-1);
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
var _4cb=null;
var _4cc=null;
var _4cd=false;
if(!this._cache[name]){
_4cd=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4cf=DOMUtil.getXMLHTTPRequest();
_4cf.open("get",uri,false);
_4cf.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4cf.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4cc=_4cf.responseText;
break;
default:
_4cc=_4cf.responseXML;
break;
}
if(_4cc==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4cc;
}
}
_4cc=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4cb=_4cc;
break;
case this._modes.MODE_DOCUMENT:
_4cb=DOMUtil.cloneNode(_4cc,true);
break;
case this._modes.MODE_ELEMENT:
_4cb=DOMUtil.cloneNode(_4cc.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4cb=DOMSerializer.serialize(_4cc,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4cb=DOMSerializer.serialize(_4cc.documentElement,true);
break;
}
if(_4cd&&Application.isDeveloperMode){
}
return _4cb;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4d2){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4d2];
},invoke:function(url,_4d4,_4d5){
this._logger.error("Not implemented");
},invokeModal:function(url,_4d7,_4d8){
var _4d9=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4d7,argument:_4d8});
StageBinding.presentViewDefinition(_4d9);
return _4d9;
},invokeDefinition:function(_4da){
if(_4da instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4da);
}
return _4da;
},question:function(_4db,text,_4dd,_4de){
if(!_4dd){
_4dd=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4db,text,_4dd,_4de);
},message:function(_4df,text,_4e1,_4e2){
if(!_4e1){
_4e1=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4df,text,_4e1,_4e2);
},error:function(_4e3,text,_4e5,_4e6){
if(!_4e5){
_4e5=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4e3,text,_4e5,_4e6);
},warning:function(_4e7,text,_4e9,_4ea){
if(!_4e9){
_4e9=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4e7,text,_4e9,_4ea);
},_standardDialog:function(type,_4ec,text,_4ee,_4ef){
var _4f0=null;
if(!_4ee){
_4f0=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4f0=new List();
new List(_4ee).each(function(_4f1){
var _4f2=null;
switch(typeof _4f1){
case "object":
_4f2=_4f1;
break;
case "string":
var _4f3=false;
if(_4f1.indexOf(":")>-1){
_4f1=_4f1.split(":")[0];
_4f3=true;
}
_4f2=Dialog.dialogButton(_4f1);
if(_4f3){
_4f2.isDefault=true;
}
break;
}
_4f0.add(_4f2);
});
}
var _4f4={title:_4ec,text:text,type:type,image:this._dialogImages[type],buttons:_4f0};
var _4f5=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4ef,argument:_4f4});
StageBinding.presentViewDefinition(_4f5);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4f7,arg){
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
},saveAll:function(_4fa){
var self=this;
var _4fc=Application.getDirtyDockTabsTabs();
if(_4fc.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_4fd,_4fe){
switch(_4fd){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_4fe,_4fa);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_4fc);
}else{
if(_4fa){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_4ff,_500){
var _501=false;
var list=new List();
_4ff.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_501=true;
var _505=list.getLength();
var _506={handleBroadcast:function(_507,tab){
if(--_505==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_500){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_506);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _501;
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
var _50b="Composite.Management.Help";
if(!StageBinding.isViewOpen(_50b)){
StageBinding.handleViewPresentation(_50b);
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
var _50d=document.createEvent("Events");
_50d.initEvent(type,true,true);
window.dispatchEvent(_50d);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function CompositeUrl(url){
var _50f=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)(media|page)(\(|%28)[\w\d-\:]+(\)|%29)/;
var _510=_50f.exec(url);
if(_510){
var _511={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_511[$1]=$3;
});
this.queryString=_511;
this.path=url.replace(/\?.*/g,"");
if(_510[3]=="media"){
this.isMedia=true;
}else{
if(_510[3]=="page"){
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
CompositeUrl.prototype.setParam=function(key,_519){
this.queryString[key]=_519;
};
CompositeUrl.prototype.toString=function(){
var url=this.path;
var _51b=[];
for(var key in this.queryString){
_51b.push(key+"="+this.queryString[key]);
}
if(_51b.length>0){
url+="?"+_51b.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_51d,_51e){
var _51f=null;
var _520=ViewDefinitions[_51d];
if(_520.isMutable){
var impl=null;
if(_520 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_51e!=null&&impl!=null){
var def=new impl();
for(var prop in _520){
def[prop]=ViewDefinition.cloneProperty(_520[prop]);
}
def.handle=_51e;
_51f=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _51f;
};
ViewDefinition.cloneProperty=function(_524){
if(null==_524){
return _524;
}
if(typeof _524==="object"){
var _525=(_524.constructor===Array)?[]:{};
for(var prop in _524){
_525[prop]=ViewDefinition.cloneProperty(_524[prop]);
}
return _525;
}
return _524;
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
Binding.evaluate=function(_52c,_52d){
var _52e=null;
var _52f=_52d.bindingWindow.WindowManager;
if(_52f!=null){
var _530=Binding.parseScriptStatement(_52c,_52d.key);
_52e=_52f.evaluate(_530);
}
return _52e;
};
Binding.parseScriptStatement=function(_531,key){
if(_531!=null&&key!=null){
var _533="UserInterface.getBindingByKey ( \""+key+"\" )";
_531=_531.replace(/(\W|^)this(,| +|\)|;)/g,_533);
_531=_531.replace(/(\W|^)this(\.)/g,_533+".");
}
return _531;
};
Binding.exists=function(_534){
var _535=false;
try{
if(_534&&_534.bindingElement&&_534.bindingElement.nodeType&&_534.isDisposed==false){
_535=true;
}
}
catch(accessDeniedException){
_535=false;
}
finally{
return _535;
}
};
Binding.destroy=function(_536){
if(!_536.isDisposed){
if(_536.acceptor!=null){
_536.acceptor.dispose();
}
if(_536.dragger!=null){
_536.disableDragging();
}
if(_536.boxObject!=null){
_536.boxObject.dispose();
}
for(var _537 in _536.shadowTree){
var _538=_536.shadowTree[_537];
if(_538 instanceof Binding&&Binding.exists(_538)){
_538.dispose(true);
}
_536.shadowTree[_537]=null;
}
_536.isDisposed=true;
_536=null;
}
};
Binding.dotnetify=function(_539,_53a){
var _53b=_539.getCallBackID();
if(_53b!=null){
var _53c=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_539.bindingDocument);
_53c.type="hidden";
_53c.id=_53b;
_53c.name=_53b;
_53c.value=_53a!=null?_53a:"";
_539.bindingElement.appendChild(_53c);
_539.shadowTree.dotnetinput=_53c;
}else{
throw _539.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_53d){
var _53e=_53d.getProperty("image");
var _53f=_53d.getProperty("image-hover");
var _540=_53d.getProperty("image-active");
var _541=_53d.getProperty("image-disabled");
if(_53d.imageProfile==null){
if(_53d.image==null&&_53e!=null){
_53d.image=_53e;
}
if(_53d.imageHover==null&&_53f!=null){
_53d.imageHover=_53e;
}
if(_53d.imageActive==null&&_540!=null){
_53d.imageActive=_540;
}
if(_53d.imageDisabled==null&&_541!=null){
_53d.imageDisabled=_541;
}
if(_53d.image||_53d.imageHover||_53d.imageActive||_53d.imageDisabled){
_53d.imageProfile=new ImageProfile(_53d);
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
var _543=this.dependentBindings[key];
_543.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_544){
if(_544){
this.memberDependencies[_544.key]=true;
var _545=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_545=false;
break;
}
}
if(_545){
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
Binding.prototype.detachRecursive=function(_547){
if(_547==null){
_547=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_547);
};
Binding.prototype.addMember=function(_548){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_548.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_548.key]=false;
_548.registerDependentBinding(this);
}
}
return _548;
};
Binding.prototype.addMembers=function(_549){
while(_549.hasNext()){
var _54a=_549.getNext();
if(!_54a.isInitialized){
this.addMember(_54a);
}
}
return _549;
};
Binding.prototype.registerDependentBinding=function(_54b){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_54b.key]=_54b;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _54c=this.getProperty("persist");
if(_54c&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _54e=new List(_54c.split(" "));
while(_54e.hasNext()){
var prop=_54e.getNext();
var _550=Persistance.getPersistedProperty(id,prop);
if(_550!=null){
this._persist[prop]=_550;
this.setProperty(prop,_550);
}else{
_550=this.getProperty(prop);
if(_550!=null){
this._persist[prop]=_550;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _551=this.getProperty("disabled");
var _552=this.getProperty("contextmenu");
var _553=this.getProperty("observes");
var _554=this.getProperty("onattach");
var _555=this.getProperty("hidden");
var _556=this.getProperty("blockactionevents");
if(_555==true&&this.isVisible==true){
this.hide();
}
if(_551&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_552){
this.setContextMenu(_552);
}
if(_553){
this.observe(this.getBindingForArgument(_553));
}
if(_556==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_554!=null){
Binding.evaluate(_554,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _558=this.getProperty("draggable");
var _559=this.getProperty("dragtype");
var _55a=this.getProperty("dragaccept");
var _55b=this.getProperty("dragreject");
if(_558!=null){
this.isDraggable=_558;
}
if(_559!=null){
this.dragType=_559;
if(_558!=false){
this.isDraggable=true;
}
}
if(_55a!=null){
this.dragAccept=_55a;
}
if(_55b!=null){
this.dragReject=_55b;
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
Binding.prototype._updateBindingMap=function(_55c){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _55f=null;
if(_55c){
_55f=map[id];
if(_55f!=null&&_55f!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_55f=map[id];
if(_55f!=null&&_55f==this){
delete map[id];
}
}
}else{
var _561=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_55c);
if(Application.isDeveloperMode==true){
alert(_561);
}else{
this.logger.error(_561);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_563){
};
Binding.prototype.handleBroadcast=function(_564,arg){
};
Binding.prototype.handleElement=function(_566){
return false;
};
Binding.prototype.updateElement=function(_567){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _569=null;
switch(typeof arg){
case "object":
_569=arg;
break;
case "string":
_569=this.bindingDocument.getElementById(arg);
if(_569==null){
_569=Binding.evaluate(arg,this);
}
break;
}
if(_569!=null&&_569.nodeType!=null){
_569=UserInterface.getBinding(_569);
}
return _569;
};
Binding.prototype.serialize=function(){
var _56a={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_56a.id=id;
}
var _56c=this.getProperty("binding");
if(_56c){
_56a.binding=_56c;
}
return _56a;
};
Binding.prototype.serializeToString=function(){
var _56d=null;
if(this.isAttached){
_56d=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _56d;
};
Binding.prototype.subTreeFromString=function(_56e){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_56e);
this.attachRecursive();
};
Binding.prototype.getProperty=function(_56f){
var _570=this.bindingElement.getAttribute(_56f);
if(_570){
_570=Types.castFromString(_570);
}
return _570;
};
Binding.prototype.setProperty=function(prop,_572){
if(_572!=null){
_572=_572.toString();
if(String(this.bindingElement.getAttribute(prop))!=_572){
this.bindingElement.setAttribute(prop,_572);
if(this.isAttached==true){
if(Persistance.isEnabled&&_572!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_572;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_572);
}
}
var _573=this.propertyMethodMap[prop];
if(_573){
_573.call(this,this.getProperty(prop));
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
var _575=null;
if(Binding.exists(this)){
_575=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _575;
};
Binding.prototype.attachClassName=function(_576){
CSSUtil.attachClassName(this.bindingElement,_576);
};
Binding.prototype.detachClassName=function(_577){
CSSUtil.detachClassName(this.bindingElement,_577);
};
Binding.prototype.hasClassName=function(_578){
return CSSUtil.hasClassName(this.bindingElement,_578);
};
Binding.prototype.addActionListener=function(type,_57a){
_57a=_57a!=null?_57a:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_57a)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_57a);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_57a+")");
}
};
Binding.prototype.removeActionListener=function(type,_57c){
_57c=_57c?_57c:this;
if(Action.isValid(type)){
var _57d=this.actionListeners[type];
if(_57d){
var i=0,_57f;
while((_57f=_57d[i])!=null){
if(_57f==_57c){
_57d.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_581){
_581=_581?_581:this;
DOMEvents.addEventListener(this.bindingElement,type,_581);
};
Binding.prototype.removeEventListener=function(type,_583){
_583=_583?_583:this;
DOMEvents.removeEventListener(this.bindingElement,type,_583);
};
Binding.prototype.subscribe=function(_584){
if(!this.hasSubscription(_584)){
this._subscriptions.set(_584,true);
EventBroadcaster.subscribe(_584,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_584);
}
};
Binding.prototype.unsubscribe=function(_585){
if(this.hasSubscription(_585)){
this._subscriptions.del(_585);
EventBroadcaster.unsubscribe(_585,this);
}
};
Binding.prototype.hasSubscription=function(_586){
return this._subscriptions.has(_586);
};
Binding.prototype.observe=function(_587,_588){
_587.addObserver(this,_588);
};
Binding.prototype.unObserve=function(_589,_58a){
_589.removeObserver(this,_58a);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _58f={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_58f);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_58f);
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
var _591=null;
var _592=null;
var _593=false;
if(arg instanceof Action){
_591=arg;
}else{
if(Action.isValid(arg)){
_591=new Action(this,arg);
_593=true;
}
}
if(_591!=null&&Action.isValid(_591.type)==true){
if(_591.isConsumed==true){
_592=_591;
}else{
var _594=this.actionListeners[_591.type];
if(_594!=null){
_591.listener=this;
var i=0,_596;
while((_596=_594[i++])!=null){
if(_596&&_596.handleAction){
_596.handleAction(_591);
}
}
}
var _597=true;
if(this.isBlockingActions==true){
switch(_591.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_593){
_597=false;
}
break;
}
}
if(_597){
_592=this.migrateAction(_591);
}else{
_592=_591;
}
}
}
return _592;
};
Binding.prototype.migrateAction=function(_598){
var _599=null;
var _59a=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_599&&node.nodeType!=Node.DOCUMENT_NODE){
_599=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_599){
_59a=_599.dispatchAction(_598);
}else{
_59a=_598;
}
}
return _59a;
};
Binding.prototype.reflex=function(_59c){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_59c);
}
};
Binding.prototype.getMigrationParent=function(){
var _59d=null;
if(true){
try{
var _59e=this.bindingElement.parentNode;
if(_59e!=null){
_59d=_59e;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_59d=null;
}
}
return _59d;
};
Binding.prototype.add=function(_59f){
if(_59f.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_59f.bindingElement);
}else{
throw "Could not add "+_59f.toString()+" of different document origin.";
}
return _59f;
};
Binding.prototype.addFirst=function(_5a0){
if(_5a0.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_5a0.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_5a0.toString()+" of different document origin.";
}
return _5a0;
};
Binding.prototype.getAncestorBindingByLocalName=function(_5a1,_5a2){
return BindingFinder.getAncestorBindingByLocalName(this,_5a1,_5a2);
};
Binding.prototype.getAncestorBindingByType=function(impl,_5a4){
return BindingFinder.getAncestorBindingByType(this,impl,_5a4);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5a6){
return BindingFinder.getChildElementsByLocalName(this,_5a6);
};
Binding.prototype.getChildElementByLocalName=function(_5a7){
return this.getChildElementsByLocalName(_5a7).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5a8){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5a8));
};
Binding.prototype.getChildBindingsByLocalName=function(_5a9){
return this.getDescendantBindingsByLocalName(_5a9,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5aa){
return this.getChildBindingsByLocalName(_5aa).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5ab,_5ac){
return BindingFinder.getDescendantBindingsByLocalName(this,_5ab,_5ac);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5ad){
return this.getDescendantBindingsByLocalName(_5ad,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5b0){
return BindingFinder.getNextBindingByLocalName(this,_5b0);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5b1){
return BindingFinder.getPreviousBindingByLocalName(this,_5b1);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5b2){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5b2);
};
Binding.prototype.isFirstBinding=function(_5b3){
return (this.getOrdinalPosition(_5b3)==0);
};
Binding.prototype.isLastBinding=function(_5b4){
return DOMUtil.isLastElement(this.bindingElement,_5b4);
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
Binding.prototype.setCallBackArg=function(_5b6){
this.setProperty(Binding.CALLBACKARG,_5b6);
};
Binding.prototype.dispose=function(_5b7){
if(!this.isDisposed){
if(!_5b7){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5b8=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5b8){
if(Client.isExplorer){
_5b8.outerHTML="";
}else{
_5b8.parentNode.removeChild(_5b8);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5bb){
list.add(_5bb);
});
list.each(function(_5bc){
self.unsubscribe(_5bc);
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
Binding.prototype.wakeUp=function(_5be,_5bf){
_5bf=_5bf?_5bf:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5be!==undefined){
self[_5be]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5bf);
},0);
}
};
Binding.prototype.handleCrawler=function(_5c1){
if(_5c1.response==null&&this.isLazy==true){
if(_5c1.id==DocumentCrawler.ID&&_5c1.mode==DocumentCrawler.MODE_REGISTER){
_5c1.response=NodeCrawler.NORMAL;
}else{
_5c1.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5c1.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5c1.id)){
_5c1.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5c1.response==null){
switch(_5c1.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5c1.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5c2){
var _5c3=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5c2);
return UserInterface.registerBinding(_5c3,Binding);
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
var _5c4=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5c4.each(function(_5c5){
DataBinding.expressions[_5c5.Key]=new RegExp(_5c5.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z, 0-9 and '_' are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9, '_' and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5c6){
var _5c7=null;
var _5c8=_5c6.getAncestorBindingByLocalName("field");
if(_5c8&&_5c8 instanceof FieldBinding){
var desc=_5c8.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5c7=desc.getLabel();
}
}
return _5c7;
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
var _5cb=this.bindingWindow.DataManager;
_5cb.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5cd=this.bindingWindow.DataManager;
if(_5cd.getDataBinding(name)){
_5cd.unRegisterDataBinding(name);
}
_5cd.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5ce,arg){
RootBinding.superclass.handleBroadcast.call(this,_5ce,arg);
var _5d0=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5ce){
case _5d0:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5d0);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5d1){
var _5d2=_5d1?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5d1!=this.isActivated){
this.isActivated=_5d1;
this.dispatchAction(_5d2);
var _5d3=new List();
var self=this;
this._activationawares.each(function(_5d5){
if(_5d5.isActivationAware){
try{
if(_5d1){
if(!_5d5.isActivated){
_5d5.onActivate();
}
}else{
if(_5d5.isActivated){
_5d5.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5d3.add(_5d5);
}
}
});
_5d3.each(function(_5d6){
this._activationawares.del(_5d6);
});
_5d3.dispose();
}else{
var _5d7="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5d7);
}else{
this.logger.error(_5d7);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5d8,_5d9){
if(Interfaces.isImplemented(IActivationAware,_5d8,true)==true){
if(_5d9==false){
this._activationawares.del(_5d8);
}else{
this._activationawares.add(_5d8);
if(this.isActivated==true){
_5d8.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5d8+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5da){
var _5db=this.getMigrationParent();
if(_5db!=null){
var root=_5db.ownerDocument.body;
var _5dd=UserInterface.getBinding(root);
if(_5dd!=null){
_5dd.makeActivationAware(this,_5da);
}
}
};
RootBinding.prototype.handleCrawler=function(_5de){
RootBinding.superclass.handleCrawler.call(this,_5de);
if(_5de.type==NodeCrawler.TYPE_ASCENDING){
_5de.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5df=null;
if(this.bindingWindow.parent){
_5df=this.bindingWindow.frameElement;
}
return _5df;
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
var _5e0=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5e0.hasNext()){
var cell=_5e0.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5e2){
var _5e3=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5e2.bindingElement);
_5e3=_5e2;
}else{
_5e3=MatrixBinding.superclass.add.call(this,_5e2);
}
return _5e3;
};
MatrixBinding.prototype.addFirst=function(_5e4){
var _5e5=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5e6=this.shadowTree[MatrixBinding.CENTER];
_5e6.insertBefore(_5e4.bindingElement,_5e6.firstChild);
_5e5=_5e4;
}else{
_5e5=MatrixBinding.superclass.addFirst.call(this,_5e4);
}
return _5e4;
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
MatrixBinding.newInstance=function(_5e8){
var _5e9=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5e8);
return UserInterface.registerBinding(_5e9,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5ea,_5eb){
var list=new List();
var _5ed=new FlexBoxCrawler();
_5ed.mode=_5eb?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5ed.startBinding=_5ea;
_5ed.crawl(_5ea.bindingElement,list);
list.each(function(_5ee){
_5ee.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5ef){
if(Binding.exists(_5ef)){
_5ef.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5f0){
if(Binding.exists(_5f0)){
_5f0.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5ed.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5f1){
FlexBoxBinding.superclass.handleAction.call(this,_5f1);
switch(_5f1.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5f2){
var _5f3=0;
var _5f4=new List(this.bindingElement.parentNode.childNodes);
while(_5f4.hasNext()){
var _5f5=_5f4.getNext();
if(_5f5.nodeType==Node.ELEMENT_NODE&&_5f5!=this.bindingElement){
if(!this._isOutOfFlow(_5f5)){
var rect=_5f5.getBoundingClientRect();
if(_5f2){
height+=(rect.right-rect.left);
}else{
_5f3+=(rect.bottom-rect.top);
}
}
}
}
return _5f3;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5f7){
var _5f8=CSSComputer.getPosition(_5f7);
var _5f9=CSSComputer.getFloat(_5f7);
return (_5f8=="absolute"||_5f9!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5fa=this.bindingElement.parentNode;
var rect=_5fa.getBoundingClientRect();
var _5fc=rect.bottom-rect.top;
var _5fd=CSSComputer.getPadding(_5fa);
var _5fe=CSSComputer.getBorder(_5fa);
_5fc-=(_5fd.top+_5fd.bottom);
_5fc-=(_5fe.top+_5fe.bottom);
return _5fc;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5ff=this.bindingElement.parentNode;
var rect=_5ff.getBoundingClientRect();
var _601=rect.right-rect.left;
var _602=CSSComputer.getPadding(_5ff);
var _603=CSSComputer.getBorder(_5ff);
_601-=(_602.left+_602.right);
_601-=(_603.left+_603.right);
return _601;
};
FlexBoxBinding.prototype.setFlexibility=function(_604){
if(_604!=this.isFlexible){
if(_604){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_604;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _605=this._getSiblingsSpan();
_605=this._getCalculatedHeight()-_605;
if(!isNaN(_605)&&_605>=0){
if(_605!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_605)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_606){
if(!this.isFit||_606){
var _607=0;
new List(this.bindingElement.childNodes).each(function(_608){
if(_608.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_608)){
var rect=_608.getBoundingClientRect();
_607+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_607);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_60a){
var _60b=CSSComputer.getPadding(this.bindingElement);
var _60c=CSSComputer.getBorder(this.bindingElement);
_60a+=_60b.top+_60b.bottom;
_60a+=_60c.top+_60c.bottom;
this.bindingElement.style.height=_60a+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_60d){
ScrollBoxBinding.superclass.handleAction.call(this,_60d);
switch(_60d.type){
case BalloonBinding.ACTION_INITIALIZE:
_60d.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_60e){
this.bindingElement.scrollLeft=_60e.x;
this.bindingElement.scrollTop=_60e.y;
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
var _60f=this._getBuildElement("labeltext");
if(_60f){
this.shadowTree.labelText=_60f;
this.shadowTree.text=_60f.firstChild;
this.hasLabel=true;
}
}else{
var _610=this.getProperty("label");
var _611=this.getProperty("image");
var _612=this.getProperty("tooltip");
if(_610){
this.setLabel(_610,false);
}
if(_611){
this.setImage(_611,false);
}
if(_612){
this.setToolTip(_612);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_613,_614){
_613=_613!=null?_613:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_613);
this.setProperty("label",_613);
if(!_614){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_616){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_616){
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
LabelBinding.prototype.setToolTip=function(_619){
this.setProperty("tooltip",_619);
if(_619!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_619));
}
};
LabelBinding.prototype.getToolTip=function(_61a){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_61b){
_61b=_61b==null?true:_61b;
var _61c=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_61b;
if(_61b){
this.attachClassName(_61c);
}else{
this.detachClassName(_61c);
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
var _61d="textonly";
var _61e="imageonly";
var _61f="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_61d);
this.detachClassName(_61e);
this.attachClassName(_61f);
}else{
if(this.hasLabel){
this.detachClassName(_61f);
this.detachClassName(_61e);
this.attachClassName(_61d);
}else{
if(this.hasImage){
this.detachClassName(_61f);
this.detachClassName(_61d);
this.attachClassName(_61e);
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
LabelBinding.newInstance=function(_620){
var _621=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_620);
return UserInterface.registerBinding(_621,LabelBinding);
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
var _622=this.getProperty("label");
if(!_622){
_622=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_622));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_624){
this.setProperty("label",_624);
};
TextBinding.newInstance=function(_625){
var _626=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_625);
return UserInterface.registerBinding(_626,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_627,_628){
BroadcasterBinding.superclass.setProperty.call(this,_627,_628);
function update(list){
if(list){
list.each(function(_62a){
_62a.setProperty(_627,_628);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _62b=this._observers[_627];
if(_62b){
update(_62b);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_62c){
BroadcasterBinding.superclass.deleteProperty.call(this,_62c);
function update(list){
if(list){
list.each(function(_62e){
_62e.deleteProperty(_62c);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _62f=this._observers[_62c];
if(_62f){
update(_62f);
}
};
BroadcasterBinding.prototype.addObserver=function(_630,_631){
_631=_631?_631:"*";
_631=new List(_631.split(" "));
while(_631.hasNext()){
var _632=_631.getNext();
switch(_632){
case "*":
this._setAllProperties(_630);
break;
default:
var _633=this.getProperty(_632);
_630.setProperty(_632,_633);
break;
}
if(!this._observers[_632]){
this._observers[_632]=new List();
}
this._observers[_632].add(_630);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_634){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _637=att.nodeName;
switch(_637){
case "id":
case "key":
break;
default:
var _638=this.getProperty(_637);
_634.setProperty(_637,_638);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_639,_63a){
_63a=_63a?_63a:"*";
_63a=new List(_63a.split(" "));
while(_63a.hasNext()){
var list=this._observers[_63a.getNext()];
if(list){
while(list.hasNext()){
var _63c=list.getNext();
if(_63c==_639){
list.del(_63c);
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
BroadcasterBinding.prototype.setDisabled=function(_63d){
this.setProperty("isdisabled",_63d);
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
var _63f=this.getProperty("width");
var _640=this.getProperty("label");
var type=this.getProperty("type");
var _642=this.getProperty("popup");
var _643=this.getProperty("tooltip");
var _644=this.getProperty("isdisabled");
var _645=this.getProperty("response");
var _646=this.getProperty("oncommand");
var _647=this.getProperty("value");
var _648=this.getProperty("ischecked");
var _649=this.getProperty("callbackid");
var _64a=this.getProperty("focusable");
var _64b=this.getProperty("focused");
var _64c=this.getProperty("default");
var url=this.getProperty("url");
var _64e=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_64e){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_640!=null){
this.setLabel(_640);
}
if(type!=null){
this.setType(type);
}
if(_643!=null){
this.setToolTip(_643);
}
if(_63f!=null){
this.setWidth(_63f);
}
if(_642!=null){
this.setPopup(_642);
}
if(_645!=null){
this.response=_645;
}
if(_648==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_646!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_646,this);
};
}
if(_64a||this.isFocusable){
this._makeFocusable();
if(_64c||this.isDefault){
this.isDefault=true;
}
if(_64b){
this.focus();
}
}
if(_644==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_649!=null){
this.bindingWindow.DataManager.registerDataBinding(_649,this);
if(_647!=null){
Binding.dotnetify(this,_647);
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
ButtonBinding.prototype.setImage=function(_64f){
if(this.isAttached){
this.labelBinding.setImage(_64f);
}
this.setProperty("image",_64f);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_650){
if(this.isAttached){
this.labelBinding.setLabel(_650);
}
this.setProperty("label",_650);
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
ButtonBinding.prototype.setToolTip=function(_652){
this.setProperty("tooltip",_652);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_652));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_653){
this.imageProfile=new _653(this);
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
ButtonBinding.prototype.flip=function(_658){
_658=_658==null?true:_658;
this.isFlipped=_658;
this.setProperty("flip",_658);
if(this.isAttached){
this.labelBinding.flip(_658);
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
ButtonBinding.prototype.check=function(_659){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_659==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_65a){
this.isActive=true;
this.isChecked=true;
if(!_65a){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_65b){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_65b==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_65c){
this.isActive=false;
this.isChecked=false;
if(!_65c){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_65d,_65e){
if(_65d==null){
_65d==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_65d){
case true:
this.check(_65e);
break;
case false:
this.uncheck(_65e);
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
var _660=this.getProperty("tooltip");
if(_660){
this.setToolTip(_660);
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
var _661=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_661=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _661;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _663=this.getEqualSizeWidth();
if(goal>_663){
var diff=goal-_663;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _666=null;
if(this.isAttached==true){
var _667=CSSComputer.getPadding(this.bindingElement);
var _668=CSSComputer.getPadding(this.bindingElement);
_666=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_666=_666+_667.left+_667.right;
_666=_666+_668.left+_668.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _666;
};
ButtonBinding.prototype.setWidth=function(_669){
if(this.isAttached==true){
var _66a=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _66b=CSSComputer.getPadding(this.shadowTree.c);
var _66c=_669-_66a;
_66c=_66c-_66b.left-_66b.right;
this.shadowTree.c.style.width=String(_66c)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_66c-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_669);
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
ButtonBinding.prototype.setValue=function(_66d){
this.shadowTree.dotnetinput.value=_66d;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_66e){
this.setValue(_66e);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_66f){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_66f;
this.imageProfile=_66f.imageProfile;
this.assignDOMEvents(true);
return this;
}
ButtonStateManager.prototype.assignDOMEvents=function(_670){
var _671=_670?"addEventListener":"removeEventListener";
this.binding[_671](DOMEvents.MOUSEENTER,this);
this.binding[_671](DOMEvents.MOUSELEAVE,this);
this.binding[_671](DOMEvents.MOUSEDOWN,this);
this.binding[_671](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _673=false,_674=false,_675=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_675=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_675=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_675=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_675=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_675==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_673=true;
break;
}
}else{
if(this.binding.isComboButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_675=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_675=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_675=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_675=ButtonStateManager.STATE_NORMAL;
var _676=UserInterface.getBinding(e.target?e.target:e.srcElement);
if(_676 instanceof ComboBoxBinding){
this.binding.isChecked=!this.binding.isChecked;
_675=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_675==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_674=true;
}else{
if(this.binding.isChecked){
this.binding._uncheck(true);
}
_675=ButtonStateManager.STATE_NORMAL;
_673=true;
}
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_675=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_675=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_675=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_675=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_675==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_673=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_675=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_675=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_675=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_675=ButtonStateManager.STATE_NORMAL;
_673=true;
break;
}
}
}
}
}
switch(_675){
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
if(_673){
this.binding.fireCommand();
}
if(_674){
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
var _67a=this.imageProfile.getDisabledImage();
if(_67a){
this.binding.setImage(_67a);
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
ClickButtonBinding.newInstance=function(_67b){
var _67c=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_67b);
return UserInterface.registerBinding(_67c,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_67d){
var _67e=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_67d);
return UserInterface.registerBinding(_67e,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_67f){
var _680=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_67f);
return UserInterface.registerBinding(_680,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_681){
this._binding=_681;
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
var _682=this.getDescendantBindingsByLocalName("control");
_682.each(function(_683){
_683.setControlType(_683.controlType);
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
ControlGroupBinding.newInstance=function(_685){
var _686=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_685);
return UserInterface.registerBinding(_686,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_689){
ControlBinding.superclass.handleAction.call(this,_689);
switch(_689.type){
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
function ControlImageProfile(_68a){
this.binding=_68a;
}
ControlImageProfile.prototype._getImage=function(_68b){
var _68c=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_68c=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_68c=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_68c=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_68c=this.constructor.IMAGE_CLOSE;
break;
}
return _68c.replace("${string}",_68b);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _68d=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_68d=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _68d?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_68e){
ControlBoxBinding.superclass.handleAction.call(this,_68e);
switch(_68e.type){
case ControlBinding.ACTION_COMMAND:
var _68f=_68e.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_68f);
Application.unlock(self);
},0);
_68e.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_691){
switch(_691.controlType){
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
ControlBoxBinding.prototype.setState=function(_692){
var _693=this.getState();
this.setProperty("state",_692);
this.detachClassName(_693);
this.attachClassName(_692);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _694=this.getProperty("state");
if(!_694){
_694=ControlBoxBinding.STATE_NORMAL;
}
return _694;
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
MenuContainerBinding.prototype.isOpen=function(_695){
var _696=null;
if(!_695){
_696=this._isOpen;
}else{
_696=(_695==this._openElement);
}
return _696;
};
MenuContainerBinding.prototype.setOpenElement=function(_697){
if(_697){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_697;
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
var _698=this.getChildBindingByLocalName("menupopup");
if(_698&&_698!=this.menuPopupBinding){
this.menuPopupBinding=_698;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _699=this.getMenuContainerBinding();
_699.setOpenElement(this);
var _69a=this.getMenuPopupBinding();
_69a.snapTo(this.bindingElement);
_69a.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_69b){
MenuContainerBinding.superclass.handleAction.call(this,_69b);
if(_69b.type==PopupBinding.ACTION_HIDE){
var _69c=this.getMenuContainerBinding();
_69c.setOpenElement(false);
this.reset();
_69b.consume();
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
MenuBarBinding.prototype.handleAction=function(_69d){
MenuBarBinding.superclass.handleAction.call(this,_69d);
switch(_69d.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _69e=_69d.target;
var _69f=this.getChildBindingsByLocalName("menu");
while(_69f.hasNext()){
var menu=_69f.getNext();
}
switch(_69e.arrowKey){
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
var _6a1=this.getProperty("image");
var _6a2=this.getProperty("label");
var _6a3=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6a2){
this.setLabel(_6a2);
}
if(_6a1){
this.setImage(_6a1);
}
if(_6a3){
this.setToolTip(_6a3);
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
MenuBinding.prototype.setLabel=function(_6a5){
this.setProperty("label",_6a5);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6a5));
}
};
MenuBinding.prototype.setToolTip=function(_6a6){
this.setProperty("tooltip",_6a6);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6a6));
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
var _6a8=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6a8.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6a8.isOpen()&&!_6a8.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6a8.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6a8.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6a9,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6a9){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6ae){
switch(_6ae.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6af=null;
var _6b0=true;
self._lastFocused.focus();
self.grabKeyboard();
_6ae.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6b2){
for(var key in this._focused){
if(key!=_6b2.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6b2.key]=_6b2;
this._lastFocused=_6b2;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6b5){
delete this._focused[_6b5.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6b6){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6b6);
}
if(_6b6){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6b9=this.getChildBindingsByLocalName("menugroup");
var _6ba=null;
var _6bb=null;
while(_6b9.hasNext()){
var _6bc=_6b9.getNext();
if(!_6bc.isDefaultContent){
_6bc.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6ba&&_6bc.isVisible){
_6ba=_6bc;
}
if(_6bc.isVisible){
_6bb=_6bc;
}
}
}
if(_6ba&&_6bb){
_6ba.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6bb.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6bd){
MenuBodyBinding.activeInstance=this;
if(_6bd){
var _6be=this._getMenuItems().getFirst();
if(_6be){
_6be.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6bf=this._lastFocused;
if((_6bf!=null)&&(!_6bf.isMenuContainer)){
_6bf.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6c1=this._getMenuItems();
var _6c2=null;
var next=null;
if(this._lastFocused){
_6c2=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6c1.getPreceding(_6c2);
break;
case KeyEventCodes.VK_DOWN:
next=_6c1.getFollowing(_6c2);
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
next=_6c1.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6c5=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6c6){
_6c5=_6c6.getChildBindingsByLocalName("menuitem");
_6c5.each(function(item){
list.add(item);
});
});
_6c5=this.getChildBindingsByLocalName("menuitem");
_6c5.each(function(item){
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
MenuBodyBinding.newInstance=function(_6c9){
var _6ca=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6c9);
return UserInterface.registerBinding(_6ca,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6cb){
switch(_6cb){
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
MenuGroupBinding.newInstance=function(_6cc){
var _6cd=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6cc);
return UserInterface.registerBinding(_6cd,MenuGroupBinding);
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
var _6ce=this.getProperty("image");
var _6cf=this.getProperty("image-hover");
var _6d0=this.getProperty("image-active");
var _6d1=this.getProperty("image-disabled");
if(!this.image&&_6ce){
this.image=_6ce;
}
if(!this.imageHover&&_6cf){
this.imageHover=_6ce;
}
if(!this.imageActive&&_6d0){
this.imageActive=_6d0;
}
if(!this.imageDisabled&&_6d1){
this.imageDisabled=_6d1;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6d2=this.getProperty("label");
var _6d3=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6d5=this.getProperty("isdisabled");
var _6d6=this.getProperty("image");
var _6d7=this.getProperty("image-hover");
var _6d8=this.getProperty("image-active");
var _6d9=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6da=this.getMenuPopupBinding();
if(_6da){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6d6){
this.image=_6d6;
}
if(!this.imageHover&&_6d7){
this.imageHover=_6d6;
}
if(!this.imageActive&&_6d8){
this.imageActive=_6d8;
}
if(!this.imageDisabled&&_6d9){
this.imageDisabled=_6d9;
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
if(_6d2!=null){
this.setLabel(_6d2);
}
if(_6d3){
this.setToolTip(_6d3);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6d5==true){
this.disable();
}
var _6db=this.getProperty("oncommand");
if(_6db){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6db);
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
MenuItemBinding.prototype.setLabel=function(_6de){
this.setProperty("label",_6de);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6de));
}
};
MenuItemBinding.prototype.setToolTip=function(_6df){
this.setProperty("tooltip",_6df);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6df));
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
var _6e1=this.bindingDocument.createElement("div");
_6e1.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6e1.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6e2=this.labelBinding.bindingElement;
_6e2.insertBefore(_6e1,_6e2.firstChild);
_6e1.style.display="none";
this.shadowTree.checkBoxIndicator=_6e1;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6e1=this.bindingDocument.createElement("div");
_6e1.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6e1.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6e2=this.labelBinding.bindingElement;
_6e2.insertBefore(_6e1,_6e2.firstChild);
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
var _6e4=this.imageProfile.getDisabledImage();
if(_6e4){
this.setImage(_6e4);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6e4=this.imageProfile.getDefaultImage();
if(_6e4){
this.setImage(_6e4);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6e6=this.getMenuContainerBinding();
if(_6e6.isOpen()&&!_6e6.isOpen(this)){
_6e6._openElement.hide();
_6e6.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6e6=this.getMenuContainerBinding();
if(!_6e6.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6e8){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6e9=this.getMenuContainerBinding();
if(!_6e9||!_6e9.isOpen(this)||_6e8){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6ea){
this.setChecked(true,_6ea);
};
MenuItemBinding.prototype.uncheck=function(_6eb){
this.setChecked(false,_6eb);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6ec,_6ed){
this.setProperty("ischecked",_6ec);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6ec){
this.isChecked=_6ec;
this.shadowTree.checkBoxIndicator.style.display=_6ec?"block":"none";
if(!_6ed){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6ee){
var _6ef=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6ee);
UserInterface.registerBinding(_6ef,MenuItemBinding);
return UserInterface.getBinding(_6ef);
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
PopupBinding.handleBroadcast=function(_6f0,arg){
switch(_6f0){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6f4=PopupBinding.activeInstances.get(key);
var _6f5=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6f4);
if(!_6f5){
list.add(_6f4);
}
});
list.each(function(_6f6){
_6f6.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6f8=PopupBinding.activeInstances.get(key);
_6f8.hide();
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
var _6f9=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6fa=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6f9){
this._bodyBinding=UserInterface.getBinding(_6f9);
}else{
if(_6fa){
this._bodyBinding=UserInterface.getBinding(_6fa);
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
var _6fb=this.getProperty("position");
this.position=_6fb?_6fb:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_6fc){
var _6fd=null;
if(this._bodyBinding){
this._bodyBinding.add(_6fc);
_6fd=_6fc;
}else{
_6fd=PopupBinding.superclass.add.call(this,_6fc);
}
return _6fd;
};
PopupBinding.prototype.addFirst=function(_6fe){
var _6ff=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6fe);
_6ff=_6fe;
}else{
_6ff=PopupBinding.superclass.addFirst.call(this,_6fe);
}
return _6ff;
};
PopupBinding.prototype.handleAction=function(_700){
PopupBinding.superclass.handleAction.call(this,_700);
var _701=_700.target;
switch(_700.type){
case Binding.ACTION_ATTACHED:
if(_701 instanceof MenuItemBinding){
this._count(true);
_700.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_701 instanceof MenuItemBinding){
this._count(false);
_700.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_702){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_702?1:-1);
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
PopupBinding.prototype.snapTo=function(_703){
var _704=this._getElementPosition(_703);
switch(this.position){
case PopupBinding.POSITION_TOP:
_704.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_704.x+=_703.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_704.y+=_703.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_704.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_703;
this.bindingElement.style.display="block";
this.setPosition(_704.x,_704.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_706){
this.bindingElement.style.display="block";
this.setPosition(_706.x,_706.y);
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
PopupBinding.prototype._getElementPosition=function(_70b){
return _70b.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_70b):DOMUtil.getUniversalPosition(_70b);
};
PopupBinding.prototype._getMousePosition=function(e){
var _70d=DOMEvents.getTarget(e);
return _70d.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_70e){
var _70f=this.bindingElement;
if(_70e){
if(Client.hasTransitions){
_70f.style.visibility="visible";
_70f.style.opacity="1";
}else{
_70f.style.visibility="visible";
}
}else{
_70f.style.visibility="hidden";
_70f.style.display="none";
if(Client.hasTransitions){
_70f.style.opacity="0";
}
}
this.isVisible=_70e;
};
PopupBinding.prototype._enableTab=function(_710){
var self=this;
var _712=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_712.each(function(_713){
_713.bindingElement.tabIndex=_710?0:-1;
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
var _71b=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_71b.y<0){
y=-_71b.y;
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
PopupBinding.prototype.grabKeyboard=function(_71d){
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
var _723=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_723=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _723;
};
PopupBinding.prototype.clear=function(){
var _724=this._bodyBinding;
if(_724){
_724.detachRecursive();
_724.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_725){
var _726=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_725);
return UserInterface.registerBinding(_726,PopupBinding);
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
PopupBodyBinding.newInstance=function(_728){
var _729=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_728);
return UserInterface.registerBinding(_729,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_72a){
return new Point(_72a.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_72b){
var _72c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_72b);
return UserInterface.registerBinding(_72c,MenuPopupBinding);
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
var _72d=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_72d){
this._body=UserInterface.getBinding(_72d);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _72e=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_72e.hasNext()){
var _72f=DialogBorderBinding.newInstance(this.bindingDocument);
_72f.setType(_72e.getNext());
this.add(_72f);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _730=this.getProperty("controls");
if(_730){
var _731=new List(_730.split(" "));
while(_731.hasNext()){
var type=_731.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _733=DialogControlBinding.newInstance(this.bindingDocument);
_733.setControlType(type);
this._titlebar.addControl(_733);
this.controlBindings[type]=_733;
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
var _734=this.getProperty("image");
var _735=this.getProperty("label");
var _736=this.getProperty("draggable");
var _737=this.getProperty("resizable");
var _738=this.getProperty("modal");
if(_734){
this.setImage(_734);
}
if(_735){
this.setLabel(_735);
}
if(_736==false){
this.isDialogDraggable=false;
}
if(_737==false){
this.isPanelResizable=false;
}
if(_738==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_739){
this.isModal=_739;
};
DialogBinding.prototype.setLabel=function(_73a){
this.setProperty("label",_73a);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_73a));
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
DialogBinding.prototype.handleAction=function(_73c){
DialogBinding.superclass.handleAction.call(this,_73c);
switch(_73c.type){
case Binding.ACTION_DRAG:
var _73d=_73c.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_73d.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_73d.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_73d;
_73d.dragger.registerHandler(this);
}
break;
}
}
_73c.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_73c.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_73e,arg){
DialogBinding.superclass.handleBroadcast.call(this,_73e,arg);
switch(_73e){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_740){
DialogBinding.superclass.handleInvokedControl.call(this,_740);
switch(_740.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_741){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_741){
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
var _743=self.bindingElement;
setTimeout(function(){
_743.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_744){
this.bindingElement.style.zIndex=new String(_744);
};
DialogBinding.prototype.onDragStart=function(_745){
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
DialogBinding.prototype.setResizable=function(_757){
if(this._isResizable!=_757){
if(_757){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_757;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _758=null;
var _759=this.bindingDocument.body.offsetWidth;
var _75a=this.bindingDocument.body.offsetHeight;
_758={x:0.125*_759,y:0.125*_75a,w:0.75*_759,h:0.5*_75a};
return _758;
};
DialogBinding.prototype.centerOnScreen=function(){
var _75b=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_75b.w-dim.w),0.5*(_75b.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _75d=this;
var i=0;
function blink(){
if(i%2==0){
_75d.detachClassName("active");
}else{
_75d.attachClassName("active");
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
var _761="";
while(list.hasNext()){
var type=list.getNext();
_761+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_761);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_762){
var _763=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_762);
return UserInterface.registerBinding(_763,DialogBinding);
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
DialogHeadBinding.newInstance=function(_764){
var _765=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_764);
return UserInterface.registerBinding(_765,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_768){
var _769=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_768);
return UserInterface.registerBinding(_769,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_76a){
var _76b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_76a);
return UserInterface.registerBinding(_76b,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_76c){
DialogSetBinding.superclass.handleAction.call(this,_76c);
var _76d=_76c.target;
switch(_76c.type){
case Binding.ACTION_MOVETOTOP:
if(_76d instanceof DialogBinding){
this._moveToTop(_76d);
}
break;
case Binding.ACTION_MOVEDONTOP:
_76c.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_76e){
var _76f=0;
var _770=this.getChildBindingsByLocalName("dialog");
_770.each(function(_771){
var _772=_771.getZIndex();
_76f=_772>_76f?_772:_76f;
});
_76e.setZIndex(_76f+2);
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
DialogBorderBinding.newInstance=function(_774){
var _775=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_774);
return UserInterface.registerBinding(_775,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_776){
this._dialogBinding=_776;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_778){
DialogCoverBinding.superclass.handleAction.call(this,_778);
var _779=_778.target;
if(this._dialogBinding.isModal){
switch(_778.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_779==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_779.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_77a,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_77a,arg);
switch(_77a){
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
var _77d=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_77d);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _77e=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_77e);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_77f){
var _780=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_77f);
return UserInterface.registerBinding(_780,DialogCoverBinding);
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
var _781=this.getProperty("image");
if(_781){
this.setImage(_781);
}
var _782=this.getProperty("label");
if(_782){
this.setLabel(_782);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_783){
if(this.isAttached){
this.labelBinding.setLabel(_783);
}
this.setProperty("label",_783);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_785){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_785);
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
DialogTitleBarBinding.newInstance=function(_786){
var _787=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_786);
return UserInterface.registerBinding(_787,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_788){
var _789=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_788);
return UserInterface.registerBinding(_789,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_78a){
var _78b=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_78a);
return UserInterface.registerBinding(_78b,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_78c){
this.binding=_78c;
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
var _78f=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _790=node.nodeName.toLowerCase();
switch(_790){
case "script":
case "style":
case "textarea":
_78f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _78f;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _797=true;
if(exp.test(text)){
self._textnodes.add(node);
_797=false;
}
return _797;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_798,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_798,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _79c=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_79c+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7a2){
var _7a3="";
var _7a4="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7a5="</span>";
var self=this;
function iterate(_7a7){
var _7a8=-1;
var _7a9=null;
self._map.each(function(key,exp){
var low=_7a7.toLowerCase();
var _7ad=low.search(exp);
if(_7ad>-1){
if(_7a8==-1){
_7a8=_7ad;
}
if(_7ad<=_7a8){
_7a8=_7ad;
_7a9=key;
}
}
});
if(_7a8>-1&&_7a9!=null){
var pre=_7a7.substring(0,_7a8);
var hit=_7a7.substring(_7a8,_7a8+_7a9.length);
var pst=_7a7.substring(_7a8+_7a9.length,_7a7.length);
_7a3+=pre+_7a4+hit+_7a5;
iterate(pst);
}else{
_7a3+=_7a7;
}
}
iterate(_7a2);
return _7a3;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7b1){
var _7b2=new List(_7b1.getElementsByTagName("span"));
_7b2.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7b1.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7b5){
var _7b6=null;
if(_7b5.isAttached){
var doc=_7b5.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7b6=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7b6 instanceof SOAPFault){
_7b6=null;
}
}
}
return _7b6;
};
WindowBinding.highlightKeywords=function(_7ba,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7ba.isAttached){
var doc=_7ba.getContentDocument();
if(doc!=null){
var _7bd=WindowBinding._highlightcrawler;
_7bd.reset(doc.body);
if(list!=null){
_7bd.setKeys(list);
_7bd.crawl(doc.body);
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
var _7be=WindowBinding.superclass.serialize.call(this);
if(_7be){
_7be.url=this.getURL();
}
return _7be;
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
var _7c0=this.getContentWindow().DocumentManager;
if(_7c0!=null){
_7c0.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7c1){
WindowBinding.superclass.handleAction.call(this,_7c1);
var _7c2=_7c1.target;
switch(_7c1.type){
case RootBinding.ACTION_PHASE_3:
if(_7c2.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7c2);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7c1.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7c3){
if(!this.isFit||_7c3){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7c4){
if(this._pageBinding==null){
if(_7c4.bindingWindow==this.getContentWindow()){
this._pageBinding=_7c4;
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
WindowBinding.prototype._registerOnloadListener=function(_7c5){
var _7c6=this.shadowTree.iframe;
var _7c7=_7c5?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7ca=true;
if(Client.isExplorer){
_7ca=_7c6.readyState=="complete";
}
if(_7ca==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7c7](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7cb){
var _7cc=_7cb?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7cc](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7d0=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7d0=url;
}
return _7d0;
};
WindowBinding.prototype.reload=function(_7d2){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7d3=null;
if(this.shadowTree.iframe!=null){
_7d3=this.shadowTree.iframe;
}
return _7d3;
};
WindowBinding.prototype.getContentWindow=function(){
var _7d4=null,_7d5=this.getFrameElement();
if(_7d5!==null){
try{
_7d4=_7d5.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7d4;
};
WindowBinding.prototype.getContentDocument=function(){
var _7d6=null,win=this.getContentWindow();
if(win){
_7d6=win.document;
}
return _7d6;
};
WindowBinding.prototype.getRootBinding=function(){
var _7d8=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7d8=UserInterface.getBinding(doc.body);
}
return _7d8;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7da){
this.bindingElement.style.height=_7da+"px";
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
WindowBinding.prototype.handleCrawler=function(_7db){
WindowBinding.superclass.handleCrawler.call(this,_7db);
if(_7db.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7db.nextNode=root.bindingElement;
}else{
_7db.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7e0){
var _7e1=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7e0);
var _7e2=UserInterface.registerBinding(_7e1,WindowBinding);
return _7e2;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7e6){
_7e6.target.show();
_7e6.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7e8){
_7e8.target.show();
_7e8.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7ea){
PreviewWindowBinding.superclass.handleAction.call(this,_7ea);
switch(_7ea.type){
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
var _7eb=null;
this._getRadioButtonBindings().each(function(_7ec){
if(_7ec.getProperty("ischecked")){
_7eb=_7ec;
return false;
}else{
return true;
}
});
if(_7eb){
this._checkedRadioBinding=_7eb;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7ed){
RadioGroupBinding.superclass.handleAction.call(this,_7ed);
var _7ee=_7ed.target;
switch(_7ed.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7ed.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7ee.isRadioButton&&!_7ee.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7ee);
}
this._checkedRadioBinding=_7ee;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7ed.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7ef,_7f0){
if(_7ef instanceof RadioDataBinding){
_7ef=_7ef.getButton();
}
if(_7ef.isRadioButton){
switch(_7f0){
case true:
this._unCheckRadioBindingsExcept(_7ef);
this._checkedRadioBinding=_7ef;
_7ef.check(true);
break;
default:
_7ef.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7f1){
var _7f2=this._getRadioButtonBindings();
_7f2.each(function(_7f3){
if(_7f3.isChecked&&_7f3!=_7f1){
_7f3.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7f4=new Crawler();
var list=new List();
_7f4.addFilter(function(_7f6){
var _7f7=true;
var _7f8=UserInterface.getBinding(_7f6);
if(_7f8 instanceof RadioGroupBinding){
_7f7=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7f8 instanceof ButtonBinding&&_7f8.isRadioButton){
list.add(_7f8);
}
}
return _7f7;
});
_7f4.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7f9){
var _7fa=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7f9);
return UserInterface.registerBinding(_7fa,RadioGroupBinding);
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
var _7fc=this.getProperty("regexrule");
if(_7fc!=null){
this.expression=new RegExp(_7fc);
}
var _7fd=this.getProperty("onbindingblur");
if(_7fd!=null){
this.onblur=function(){
Binding.evaluate(_7fd,this);
};
}
var _7fe=this.getProperty("onvaluechange");
if(_7fe!=null){
this.onValueChange=function(){
Binding.evaluate(_7fe,this);
};
}
if(this.error==null&&this.type!=null){
var _7ff=DataBinding.errors[this.type];
if(_7ff!=null){
this.error=_7ff;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _800=this.getProperty("value");
if(_800!=null){
this.setValue(String(_800));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _802=this.getProperty("isdisabled");
if(_802==true){
this.setDisabled(true);
}
var _803=this.getProperty("readonly");
if(_803==true){
this.setReadOnly(true);
}
var _804=this.getProperty("autoselect");
if(_804==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _805=Localization.currentLang();
if(_805!=null){
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
var _806=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_806.type=this.isPassword==true?"password":"text";
_806.tabIndex=-1;
return _806;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_809){
if(_809){
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
DataInputBinding.prototype.handleBroadcast=function(_80c,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_80c,arg);
var self=this;
switch(_80c){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _80f=DOMEvents.getTarget(arg);
if(_80f!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_810){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_810){
var self=this,_812=this.bindingElement,_813={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_812,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_812,DOMEvents.MOUSEUP,_813);
}else{
this.select();
}
}
this.onfocus();
if(!_810){
var _814=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_814);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _815=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _816=_815.createTextRange();
_816.moveStart("character",0);
_816.moveEnd("character",_815.value.length);
_816.select();
}else{
_815.setSelectionRange(0,_815.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_817){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_817){
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
DataInputBinding.prototype.validate=function(_81b){
if(_81b==true||this._isValid){
var _81c=this.isValid();
if(_81c!=this._isValid){
this._isValid=_81c;
if(!_81c){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _81d=null;
if(this._isInvalidBecauseRequired==true){
_81d=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_81d=DataBinding.warnings["minlength"];
_81d=_81d.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_81d=DataBinding.warnings["maxlength"];
_81d=_81d.replace("${count}",String(this.maxlength));
}else{
_81d=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_81d!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_81d);
}
}else{
this.setValue(_81d);
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
var _81e=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _81f=this.getValue();
if(_81f==""){
if(this.isRequired==true){
_81e=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _820=DataBinding.expressions[this.type];
if(!_820.test(_81f)){
_81e=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_81f)){
_81e=false;
}
}
}
}
if(_81e&&this.minlength!=null){
if(_81f.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_81e=false;
}
}
if(_81e&&this.maxlength!=null){
if(_81f.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_81e=false;
}
}
return _81e;
};
DataInputBinding.prototype.setDisabled=function(_821){
if(_821!=this.isDisabled){
if(_821){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _822=this.shadowTree.input;
if(_821){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_822,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_822,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_821;
this.shadowTree.input.unselectable=_821?"on":"off";
}
this.isDisabled=_821;
this.isFocusable=!_821;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_824){
if(_824!=this.isReadOnly){
if(_824){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_824;
this.isReadOnly=_824;
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
DataInputBinding.prototype.handleElement=function(_825){
return true;
};
DataInputBinding.prototype.updateElement=function(_826){
var _827=_826.getAttribute("value");
var _828=_826.getAttribute("type");
var _829=_826.getAttribute("maxlength");
var _82a=_826.getAttribute("minlength");
if(_827==null){
_827="";
}
var _82b=this.bindingWindow.UpdateManager;
if(this.getValue()!=_827){
_82b.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_827);
}
if(this.type!=_828){
_82b.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_828;
}
if(this.maxlength!=_829){
_82b.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_829;
}
if(this.minlength!=_82a){
_82b.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_82a;
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
DataInputBinding.prototype.setValue=function(_82c){
if(_82c===null){
_82c="";
}
if(_82c!=this.getValue()){
this.setProperty("value",_82c);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_82c);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _82d=null;
if(this.shadowTree.input!=null){
_82d=this.shadowTree.input.value;
}else{
_82d=this.getProperty("value");
}
return _82d;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _82f=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_82f=Number(_82f);
break;
}
return _82f;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_830){
var _831=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_830);
return UserInterface.registerBinding(_831,DataInputBinding);
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
var _832=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_832!=null){
this.setValue(_832.value);
_832.parentNode.removeChild(_832);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _833=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_833.tabIndex=-1;
return _833;
};
TextBoxBinding.prototype.handleElement=function(_834){
return true;
};
TextBoxBinding.prototype.updateElement=function(_835){
var _836,area=_835.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_836=DOMUtil.getTextContent(area);
}
if(_836==null){
_836="";
}
var _838=this.bindingWindow.UpdateManager;
if(this.getValue()!=_836){
_838.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_836);
}
var _839=_835.getAttribute("type");
if(this.type!=_839){
_838.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_839;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_83d){
var _83e=this.bindingDocument.selection.createRange();
var _83f=_83e.text=="";
if(_83f&&!_83d){
_83e.text="\t";
}else{
var text="";
var _841=_83e.text.length;
while((_83e.moveStart("word",-1)&&_83e.text.charAt(1)!="\n")){
}
_83e.moveStart("character",1);
var _842=0;
var i=0,line,_845=_83e.text.split("\n");
while((line=_845[i++])!=null){
if(_83d){
line=line.replace(/^(\s)/mg,"");
_842++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_845[i+1]?"\n":"");
}
_83e.text=text;
_83e.moveStart("character",-_841);
if(_83d){
_83e.moveStart("character",2*_845.length-2);
}
_83e.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _846=this.bindingDocument.selection.createRange();
var _847=_846.duplicate();
while((_847.moveStart("word",-1)&&_847.text.indexOf("\n")==-1)){
}
_847.moveStart("character",1);
_846.text="\n"+_847.text.match(/^(\s)*/)[0]+"!";
_846.moveStart("character",-1);
_846.select();
_846.text="";
_846.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_848){
var _849;
var _84a;
var oss;
var osy;
var i;
var fnd;
var _84f=this._getSelectedText();
var el=this.shadowTree.input;
_849=el.scrollLeft;
_84a=el.scrollTop;
if(!_84f.match(/\n/)){
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
_84f=this._getSelectedText();
if(_848){
ntext=_84f.replace(/^(\s)/mg,"");
}else{
ntext=_84f.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_84f.length);
}
el.scrollLeft=_849;
el.scrollTop=_84a;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _851;
var _852;
var oss;
var osy;
var el=this.shadowTree.input;
_851=el.scrollLeft;
_852=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_851;
el.scrollTop=_852;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _859=this.shadowTree.input.value;
var _85a=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _859.substr(_85a,end-_85a);
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
var _85c=this.getProperty("isdisabled");
if(this.isDisabled||_85c){
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
var _85e=this.getProperty("label");
var _85f=this.getProperty("value");
var _860=this.getProperty("width");
var _861=this.getProperty("onchange");
var _862=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_85e!=null){
this.label=_85e;
}
if(!this.value&&_85f!=null){
this.value=_85f;
}
if(!this.width&&_860){
this.width=_860;
}
if(_862){
this.isRequired=true;
}
if(_861){
this.onValueChange=function(){
Binding.evaluate(_861,this);
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
var _863=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_863.name=this.getName();
_863.value=this.getValue();
_863.type="hidden";
if(this.hasCallBackID()){
_863.id=this.getCallBackID();
}
this.shadowTree.input=_863;
this.bindingElement.appendChild(_863);
};
SelectorBinding.prototype.buildButton=function(){
var _864=this.BUTTON_IMPLEMENTATION;
var _865=this.add(_864.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_865.imageProfile=this.imageProfile;
}
if(this.width!=null){
_865.setWidth(this.width);
}
this._buttonBinding=_865;
this.shadowTree.button=_865;
_865.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _867=top.app.bindingMap.selectorpopupset;
var doc=_867.bindingDocument;
var _869=_867.add(PopupBinding.newInstance(doc));
var _86a=_869.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_869;
this._menuBodyBinding=_86a;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_869.attachClassName("selectorpopup");
_869.addActionListener(PopupBinding.ACTION_SHOW,this);
_869.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_869.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_869);
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
var _86d=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_86d).each(function(_86e){
var _86f=_86e.getAttribute("label");
var _870=_86e.getAttribute("value");
var _871=_86e.getAttribute("selected");
var _872=_86e.getAttribute("image");
var _873=_86e.getAttribute("image-hover");
var _874=_86e.getAttribute("image-active");
var _875=_86e.getAttribute("image-disabled");
var _876=null;
if(_872||_873||_874||_875){
_876=new ImageProfile({image:_872,imageHover:_873,imageActive:_874,imageDisabled:_875});
}
list.add(new SelectorBindingSelection(_86f?_86f:null,_870?_870:null,_871&&_871=="true",_876));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _878=null;
while(list.hasNext()){
var _879=list.getNext();
var item=this.addSelection(_879);
if(_879.isSelected){
this.select(item,true);
}
if(!_878){
_878=item;
}
}
if(!this._selectedItemBinding){
this.select(_878,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_87b,_87c){
var _87d=this.MENUITEM_IMPLEMENTATION;
var _87e=this._menuBodyBinding;
var _87f=_87e.bindingDocument;
var _880=_87d.newInstance(_87f);
_880.imageProfile=_87b.imageProfile;
_880.setLabel(_87b.label);
if(_87b.tooltip!=null){
_880.setToolTip(_87b.tooltip);
}
_880.selectionValue=_87b.value;
_87b.menuItemBinding=_880;
if(_87c){
_87e.addFirst(_880);
this.selections.addFirst(_87b);
}else{
_87e.add(_880);
this.selections.add(_87b);
}
this._isUpToDate=false;
return _880;
};
SelectorBinding.prototype.addSelectionFirst=function(_881){
return this.addSelection(_881,true);
};
SelectorBinding.prototype.clear=function(_882){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_882&&this.defaultSelection!=null){
var _883=this.addSelection(this.defaultSelection);
this.select(_883,true);
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
SelectorBinding.prototype.setDisabled=function(_884){
if(this.isAttached==true){
var _885=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_884?"none":"block";
_885.setDisabled(_884);
}
if(_884){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_886){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_886);
}
};
SelectorBinding.prototype.handleAction=function(_887){
SelectorBinding.superclass.handleAction.call(this,_887);
switch(_887.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_887.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_887.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_887.target);
_887.consume();
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
_887.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_889){
this.select(_889);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _88a=this._buttonBinding.bindingElement.offsetWidth+"px";
var _88b=this._popupBinding.bindingElement;
_88b.style.minWidth=_88a;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _88d=Client.isExplorer?e.keyCode:e.which;
if(_88d==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _88d=Client.isExplorer?e.keyCode:e.which;
if(_88d>=32){
this._buttonBinding.check();
var _88e=String.fromCharCode(_88d);
this._pushSearchSelection(_88e);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_88f){
this._searchString+=_88f.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_890){
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
var _891=this._menuBodyBinding;
if(_891!=null){
var _892=this.MENUITEM_IMPLEMENTATION;
var _893=_891.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _895=list.getNext();
if(_895.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_895);
}
}
}
this._attachSelections();
var _896=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _897=_891.getDescendantBindingsByType(_892);
if(_897.hasEntries()){
while(_897.hasNext()){
var _898=_897.getNext();
var _899=_898.labelBinding;
if(_899!=null&&_899.shadowTree!=null&&_899.shadowTree.labelText!=null){
_899.shadowTree.labelText.innerHTML=_899.shadowTree.labelText.innerHTML.replace(_896,"<b>$&</b>");
}
}
_897.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_899=LabelBinding.newInstance(_893);
_899.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_891.add(_899);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _895=list.getNext();
var item=this.addSelection(_895);
if(this._selectionValue==_895.value){
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
SelectorBinding.prototype.handleBroadcast=function(_89b,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_89b,arg);
switch(_89b){
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
SelectorBinding.prototype.select=function(_89e,_89f){
var _8a0=false;
if(_89e!=this._selectedItemBinding){
this._selectedItemBinding=_89e;
_8a0=true;
var _8a1=this._buttonBinding;
this._selectionValue=_89e.selectionValue;
this._selectionLabel=_89e.getLabel();
_8a1.setLabel(_89e.getLabel());
if(_89e.imageProfile!=null){
_8a1.imageProfile=_89e.imageProfile;
}
if(_8a1.imageProfile!=null){
_8a1.setImage(this.isDisabled==true?_8a1.imageProfile.getDisabledImage():_8a1.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_89f){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_89f)){
this.validate();
}
}
return _8a0;
};
SelectorBinding.prototype._relate=function(){
var _8a2=this.getProperty("relate");
if(_8a2){
var _8a3=this.bindingDocument.getElementById(_8a2);
if(_8a3){
var _8a4=UserInterface.getBinding(_8a3);
if(_8a4){
if(this.isChecked){
_8a4.show();
}else{
_8a4.hide();
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
SelectorBinding.prototype.selectByValue=function(_8a5,_8a6){
var _8a7=false;
var _8a8=this._menuBodyBinding;
var _8a9=_8a8.getDescendantElementsByLocalName("menuitem");
while(_8a9.hasNext()){
var _8aa=UserInterface.getBinding(_8a9.getNext());
if(_8aa.selectionValue==_8a5){
_8a7=this.select(_8aa,_8a6);
break;
}
}
return _8a7;
};
SelectorBinding.prototype.getValue=function(){
var _8ab=this._selectionValue;
if(_8ab!=null){
_8ab=String(_8ab);
}
return _8ab;
};
SelectorBinding.prototype.setValue=function(_8ac){
this.selectByValue(String(_8ac),true);
};
SelectorBinding.prototype.getResult=function(){
var _8ad=this._selectionValue;
if(_8ad=="null"){
_8ad=null;
}
if(_8ad){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8ad=Number(_8ad);
break;
}
}
return _8ad;
};
SelectorBinding.prototype.setResult=function(_8ae){
this.selectByValue(_8ae,true);
};
SelectorBinding.prototype.validate=function(){
var _8af=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8b0=this.getValue();
if(_8b0==this.defaultSelection.value){
_8af=false;
}
if(_8af!=this._isValid){
if(_8af){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8af;
}
return _8af;
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
var _8b1=this._popupBinding;
if(!this._isUpToDate){
_8b1.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8b2,_8b3){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8b2));
return true;
};
SelectorBinding.newInstance=function(_8b4){
var _8b5=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8b4);
return UserInterface.registerBinding(_8b5,SelectorBinding);
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
var _8b8=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8b8){
this.onValueChange=function(){
Binding.evaluate(_8b8,this);
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
SimpleSelectorBinding.prototype.focus=function(_8bb){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8bb){
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
SimpleSelectorBinding.prototype._hack=function(_8bc){
if(Client.isExplorer){
this._select.style.width=_8bc?"auto":this._cachewidth+"px";
if(_8bc){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8bd=true;
if(this.isRequired){
if(this.getValue()==null){
_8bd=false;
}
}
if(_8bd!=this._isValid){
if(_8bd){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8be=this._select;
var _8bf=_8be.options[_8be.selectedIndex];
var text=DOMUtil.getTextContent(_8bf);
_8be.blur();
_8be.style.color="#A40000";
_8be.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8bf,DataBinding.warnings["required"]);
}
_8be.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8bf,text);
}
};
}
this._isValid=_8bd;
}
return _8bd;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8c1=null;
var _8c2=this._select;
var _8c3=_8c2.options[_8c2.selectedIndex];
var _8c4=true;
if(Client.isExplorer){
var html=_8c3.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8c4=false;
}
}
if(_8c4){
_8c1=_8c3.getAttribute("value");
}
return _8c1;
};
SimpleSelectorBinding.prototype.setValue=function(_8c6){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8c7){
this.setValue(_8c7);
};
SimpleSelectorBinding.newInstance=function(_8c8){
var _8c9=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8c8);
return UserInterface.registerBinding(_8c9,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8ca,_8cb,_8cc,_8cd,_8ce){
this._init(_8ca,_8cb,_8cc,_8cd,_8ce);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8cf,_8d0,_8d1,_8d2,_8d3){
if(_8cf!=null){
this.label=String(_8cf);
}
if(_8d0!=null){
this.value=String(_8d0);
}
if(_8d2!=null){
this.imageProfile=_8d2;
}
if(_8d3!=null){
this.tooltip=_8d3;
}
this.isSelected=_8d1?true:false;
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
var _8d4=this.getProperty("image");
if(_8d4){
this.setImage(_8d4);
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
var _8d7=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8d7.popupBindingTargetElement=this.shadowTree.input;
_8d7.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8d7.attach();
var self=this;
_8d7.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8d7;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8da=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8da).each(function(_8db){
if(_8db.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8dc=_8db.getAttribute("value");
var _8dd=_8db.getAttribute("selected");
var _8de=_8db.getAttribute("tooltip");
list.add({value:_8dc?_8dc:null,toolTip:_8de?_8de:null,isSelected:(_8dd&&_8dd=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8e0=this._menuBodyBinding;
var _8e1=_8e0.bindingDocument;
while(_8e0.bindingElement.hasChildNodes()){
var node=_8e0.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8e0.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8e3=this.getProperty("emptyentrylabel");
if(_8e3){
var _8e4=MenuItemBinding.newInstance(_8e1);
_8e4.setLabel(_8e3);
_8e4.selectionValue="";
_8e0.add(_8e4);
}
while(list.hasNext()){
var _8e5=list.getNext();
var _8e4=MenuItemBinding.newInstance(_8e1);
_8e4.setLabel(_8e5.label?_8e5.label:_8e5.value);
_8e4.selectionValue=_8e5.value;
if(_8e5.image){
_8e4.setImage(_8e5.image);
}
if(_8e5.toolTip){
_8e4.setToolTip(_8e5.toolTip);
}
if(_8e5.isSelected){
this.select(_8e4,true);
}
_8e0.add(_8e4);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8e6){
this.select(_8e6);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8e7,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8e7,arg);
switch(_8e7){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8e7,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8e9){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8e9);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8ea){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8ea);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8eb=this.bindingElement.offsetWidth+"px";
var _8ec=this._popupBinding.bindingElement;
_8ec.style.minWidth=_8eb;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8ed=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8ee=this.getValue();
var _8ef=null;
_8ed.each(function(item){
if(item.getLabel()==_8ee){
_8ef=item;
}
});
if(_8ef){
_8ef.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8f2){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8f2){
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
DataInputSelectorBinding.prototype.setValue=function(_8f3){
var _8f4=this.isReadOnly;
var _8f5=null;
if(_8f3!=null&&_8f3!=""){
var _8f6=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_8f6.hasNext()){
var item=_8f6.getNext();
if(item.selectionValue==_8f3){
_8f5=item.getLabel();
break;
}
}
}
if(_8f5!=null){
this.value=_8f3;
this.shadowTree.input.value=_8f5;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_8f3);
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
var _8f9="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_8f9);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_8f9);
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
var _8fb=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8fb.setImage("${icon:popup}");
this.addFirst(_8fb);
_8fb.attach();
var self=this;
_8fb.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8fd=self.getProperty("handle");
var _8fe=ViewDefinition.clone(_8fd,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_8fe instanceof DialogViewDefinition){
_8fe.handler={handleDialogResponse:function(_8ff,_900){
self._isButtonClicked=false;
if(_8ff==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _901=_900.getFirst();
self.setValue(_901);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_8fe.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8fe);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8fb.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8fb;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _903=this._dialogButtonBinding;
if(_903!=null){
_903.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _905=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_905=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _905;
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
var _908=ToolBarButtonBinding.newInstance(this.bindingDocument);
_908.setImage("${icon:editor-sourceview}");
_908.bindingElement.style.left="-24px";
_908.bindingElement.style.width="24px";
this.addFirst(_908);
_908.attach();
_908.hide();
var self=this;
_908.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_908;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_909){
UrlInputDialogBinding.superclass.setValue.call(this,_909);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_909);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _90a=TreeService.GetCompositeUrlLabel(_909);
if(_90a!=_909){
this.setLabel(_90a);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_90b){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_90b;
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
var _90c=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _90d=this.getProperty("image");
if(_90d!=null){
_90c.setImage(_90d);
}else{
_90c.setImage("${icon:popup}");
}
this.addFirst(_90c);
_90c.attach();
var self=this;
_90c.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_90c;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _90f=this._dialogButtonBinding;
if(_90f!=null){
_90f.oncommand();
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
var _910=this.getProperty("label");
var _911=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_910!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_910+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_910);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_911!=null){
this._buttonBinding.setToolTip(_911);
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
DataDialogBinding.prototype.handleAction=function(_913){
DataDialogBinding.superclass.handleAction.call(this,_913);
var _914=_913.target;
var self=this;
switch(_913.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_916,_917){
if(_916==Dialog.RESPONSE_ACCEPT){
if(_917 instanceof DataBindingMap){
self._map=_917;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_914==this._buttonBinding){
_913.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_918,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_918,arg);
switch(_918){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _91b=this.getProperty("handle");
var url=this.getURL();
var _91d=null;
if(_91b!=null||def!=null){
if(def!=null){
_91d=def;
}else{
_91d=ViewDefinitions[_91b];
}
if(_91d instanceof DialogViewDefinition){
_91d.handler=this._handler;
if(this._map!=null){
_91d.argument=this._map;
}
StageBinding.presentViewDefinition(_91d);
}
}else{
if(url!=null){
_91d=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_91d!=null){
this._dialogViewHandle=_91d.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_91e){
this.setProperty("label",_91e);
if(this.isAttached){
this._buttonBinding.setLabel(_91e+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_91f){
this.setProperty("image",_91f);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_91f);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_920){
this.setProperty("tooltip",_920);
if(this.isAttached){
this._buttonBinding.setToolTip(_920);
}
};
DataDialogBinding.prototype.setHandle=function(_921){
this.setProperty("handle",_921);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_923){
this._handler=_923;
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
DataDialogBinding.newInstance=function(_925){
var _926=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_925);
return UserInterface.registerBinding(_926,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_928,_929){
if(_928==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_929);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_92a){
_92a=new String(_92a);
this.dirty();
this.setValue(encodeURIComponent(_92a));
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
var _92e=this.getValue();
if(_92e==null){
_92e="";
}
this.shadowTree.dotnetinput.value=_92e;
};
PostBackDataDialogBinding.prototype.setValue=function(_92f){
this.setProperty("value",_92f);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_930){
};
PostBackDataDialogBinding.newInstance=function(_931){
var _932=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_931);
return UserInterface.registerBinding(_932,PostBackDataDialogBinding);
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
var _933=this.getProperty("dialoglabel");
var _934=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _936=this.getProperty("handle");
var _937=this.getProperty("selectedtoken");
if(_936!=null){
var def=ViewDefinition.clone(_936,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_933!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_933;
}
if(_934!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_934;
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
if(_937!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_937;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_939){
var _93a=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_939);
return UserInterface.registerBinding(_93a,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_93c){
self._datathing.setValue(_93c);
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
var _93f=self.getValue();
if(_93f==""||_93f==null){
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
var _940=this.getProperty("value");
var _941=this.getProperty("selectorlabel");
if(_941==null){
_941=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_940==null));
list.add(new SelectorBindingSelection(_941+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_940!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _940=this.getValue();
if(_940==""||_940==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_943){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_943);
switch(_943.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_943.target==this._datathing){
var _944=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_944){
self._selector.setLabel(_944);
}
},500);
_943.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_946){
this.setProperty("label",_946);
if(this._selector!=null){
this._selector.setLabel(_946);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_947){
this._datathing.setValue(_947);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_948,_949){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_948,_949)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_94a){
this._buttonBinding.setLabel(_94a);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_94b){
this._buttonBinding.setToolTip(_94b);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_94c){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_94c);
switch(_94c.type){
case MenuItemBinding.ACTION_COMMAND:
var _94d=_94c.target;
var _94e=this.master;
if(_94d.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_94d.getLabel());
setTimeout(function(){
_94e.action();
},0);
}else{
this.master.setValue("");
}
_94e.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_94f){
var _950=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_94f);
return UserInterface.registerBinding(_950,NullPostBackDataDialogSelectorBinding);
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
var _951=this._dataDialogBinding;
if(_951!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_951.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _952=this.getProperty("editable");
var _953=this.getProperty("selectable");
var _954=this.getProperty("display");
if(_952!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_953){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_954){
this._display=_954;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _955=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_955.selections=this.selections;
this.add(_955);
_955.attach();
this._dataDialogBinding=_955;
this.shadowTree.datadialog=_955;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _957=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _958=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_957=_958.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_957=_958.isSelected!=true;
break;
}
if(_957){
this.shadowTree.box.appendChild(this._getElementForSelection(_958));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_95a){
var box=this.shadowTree.box;
var _95c=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _95d=list.getNext();
if(_95a){
_95d.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_95c=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_95c=_95d.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_95c=_95d.isSelected!=true;
break;
}
}
if(_95c){
var _95e=this._getElementForSelection(_95d);
box.insertBefore(_95e,box.firstChild);
CSSUtil.attachClassName(_95e,"selected");
this._selectionMap.set(_95d.value,_95e);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_95f){
var _960=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_960.appendChild(this.bindingDocument.createTextNode(_95f.label));
_960.setAttribute("label",_95f.label);
_960.setAttribute("value",_95f.value);
return _960;
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
var _962=DOMEvents.getTarget(e);
var _963=DOMUtil.getLocalName(_962);
if(_963=="div"){
this._handleMouseDown(_962);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_964){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _965=this._getElements();
var _966=_964.getAttribute("value");
var _967=this._lastSelectedElement.getAttribute("value");
var _968=false;
while(_965.hasNext()){
var el=_965.getNext();
switch(el.getAttribute("value")){
case _966:
case _967:
_968=!_968;
break;
}
if(_968){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_964);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_964)){
this._unhilite(_964);
}else{
this._hilite(_964);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_964){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_964;
};
MultiSelectorBinding.prototype._hilite=function(_96c){
var _96d=_96c.getAttribute("value");
if(!this._selectionMap.has(_96d)){
CSSUtil.attachClassName(_96c,"selected");
this._selectionMap.set(_96d,_96c);
}
};
MultiSelectorBinding.prototype._unhilite=function(_96e){
var _96f=_96e.getAttribute("value");
if(this._selectionMap.has(_96f)){
CSSUtil.detachClassName(_96e,"selected");
this._selectionMap.del(_96f);
}
};
MultiSelectorBinding.prototype._isHilited=function(_970){
return CSSUtil.hasClassName(_970,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_971){
MultiSelectorBinding.superclass.handleAction.call(this,_971);
var _972=_971.target;
switch(_971.type){
case DataDialogBinding.ACTION_COMMAND:
if(_972==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_971.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_972.result);
this.dirty();
_972.result=null;
_971.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _973=null;
if(this.isSelectable){
_973=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_975){
if(self._isHilited(_975)){
_975.parentNode.removeChild(_975);
_973.add(new SelectorBindingSelection(_975.getAttribute("label"),_975.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _973;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _977=this._getElements();
if(!isUp){
_977.reverse();
}
var _978=true;
while(_978&&_977.hasNext()){
var _979=_977.getNext();
if(this._isHilited(_979)){
switch(isUp){
case true:
if(_979.previousSibling){
_979.parentNode.insertBefore(_979,_979.previousSibling);
}else{
_978=false;
}
break;
case false:
if(_979.nextSibling){
_979.parentNode.insertBefore(_979,_979.nextSibling.nextSibling);
}else{
_978=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _97a=new List();
var _97b=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_97d){
var _97e=new SelectorBindingSelection(_97d.getAttribute("label"),_97d.getAttribute("value"),_97b);
_97e.isHighlighted=self._isHilited(_97d);
_97a.add(_97e);
});
return _97a;
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
var _97f=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_97f.hasEntries()){
_97f.each(function(_980){
_980.parentNode.removeChild(_980);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _981=this.selections.getNext();
if(_981.isSelected){
var _982=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_982.name=this._name;
_982.value=_981.value;
this.bindingElement.appendChild(_982);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_983){
alert(_983);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_984){
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
var _985={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _986=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_986.handler=this._handler;
_986.argument=_985;
StageBinding.presentViewDefinition(_986);
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
var _987={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _989={handleDialogResponse:function(_98a,_98b){
if(_98a==Dialog.RESPONSE_ACCEPT){
self.result=_98b;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _98c=ViewDefinitions[this._dialogViewHandle];
_98c.handler=_989;
_98c.argument=_987;
StageBinding.presentViewDefinition(_98c);
};
MultiSelectorDataDialogBinding.newInstance=function(_98d){
var _98e=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_98d);
return UserInterface.registerBinding(_98e,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_98f){
var id=_98f.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _991=_98f.bindingDocument.getElementById(id);
if(_991!=null){
var _992=UserInterface.getBinding(_991);
_992.setResult(true);
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
var _994=this.bindingDocument.getElementById(id);
if(_994!=null){
var _995=UserInterface.getBinding(_994);
if(_995&&!_995.isAttached){
_995.isLazy=true;
}else{
_994.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_996){
this._isLazy=_996;
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
var _998=this.getProperty("stateprovider");
var _999=this.getProperty("handle");
if(_998!=null&&_999!=null){
url=url.replace("${stateprovider}",_998).replace("${handle}",_999);
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
EditorDataBinding.prototype._onPageInitialize=function(_99a){
EditorDataBinding.superclass._onPageInitialize.call(this,_99a);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_99b){
EditorDataBinding.superclass.handleAction.call(this,_99b);
switch(_99b.type){
case Binding.ACTION_DIRTY:
if(_99b.target!=this){
if(!this.isDirty){
this.dirty();
}
_99b.consume();
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
EditorDataBinding.prototype.setValue=function(_99c){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_99d){
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
var _9a2=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9a2=fake.getValue()!="";
}
if(!_9a2&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9a2&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9a2;
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
var _9a6=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9a6!=null){
_9a6.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9a7){
_9a7=_9a7!=null?_9a7:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9a7;
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
var _9a8=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9a9=_9a8.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9a9;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9a9=_9a9.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9a9;
}
var self=this;
var _9ab=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9ab.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9ae=this.getProperty("label");
if(_9ae){
this.setLabel(_9ae);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9af){
this.setProperty("label",_9af);
if(this.shadowTree.labelBinding==null){
var _9b0=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9b0.attachClassName("fieldgrouplabel");
cell.insertBefore(_9b0.bindingElement,cell.getElementsByTagName("div").item(1));
_9b0.attach();
this.shadowTree.labelBinding=_9b0;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9af));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9b2){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9b2.bindingElement);
return _9b2;
};
FieldGroupBinding.prototype.addFirst=function(_9b3){
var _9b4=this.shadowTree[FieldGroupBinding.CENTER];
_9b4.insertBefore(_9b3.bindingElement,_9b4.firstChild);
return _9b3;
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
var _9b5=this.getProperty("relation");
if(_9b5!=null){
this.bindingRelation=_9b5;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9b6,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9b6,arg);
switch(_9b6){
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
FieldBinding.newInstance=function(_9b8){
var _9b9=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9b8);
return UserInterface.registerBinding(_9b9,FieldBinding);
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
var _9ba=this.getDescendantBindingByLocalName("fieldgroup");
if(_9ba!=null){
_9ba.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9bb=true;
var _9bc=this.getDescendantBindingsByLocalName("*");
while(_9bc.hasNext()){
var _9bd=_9bc.getNext();
if(Interfaces.isImplemented(IData,_9bd)){
var _9be=_9bd.validate();
if(_9bb&&!_9be){
_9bb=false;
}
}
}
return _9bb;
};
FieldsBinding.prototype.handleAction=function(_9bf){
FieldsBinding.superclass.handleAction.call(this,_9bf);
var _9c0=_9bf.target;
if(_9c0!=this){
switch(_9bf.type){
case Binding.ACTION_INVALID:
var _9c1=DataBinding.getAssociatedLabel(_9c0);
if(_9c1){
this._invalidFieldLabels.set(_9c0.key,_9c1);
}
if(_9c0.error){
if(!_9c0.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9c0.error},_9c0);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9bf.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9c0.key)){
this._invalidFieldLabels.del(_9c0.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9bf.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9c2=null;
if(this._invalidFieldLabels.hasEntries()){
_9c2=this._invalidFieldLabels.toList();
}
return _9c2;
};
FieldsBinding.newInstance=function(_9c3){
var _9c4=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9c3);
return UserInterface.registerBinding(_9c4,FieldsBinding);
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
var _9c5=this.getProperty("image");
if(_9c5){
this.setImage(_9c5);
}
var _9c6=this.getProperty("tooltip");
if(_9c6){
this.setToolTip(_9c6);
}
var _9c7=this.getProperty("label");
if(_9c7){
this.setLabel(_9c7);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9c9=this.getAncestorBindingByLocalName("field");
if(_9c9){
var _9ca=true;
_9c9.getDescendantBindingsByLocalName("*").each(function(_9cb){
if(Interfaces.isImplemented(IData,_9cb)){
_9cb.focus();
_9ca=false;
}
return _9ca;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9cc){
this.setProperty("label",_9cc);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9cc);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9cd=this.getProperty("label");
if(!_9cd){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9cd=node.data;
}
}
return _9cd;
};
FieldDescBinding.prototype.setImage=function(_9cf){
this.setProperty("image",_9cf);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9d0){
this.setProperty("tooltip",_9d0);
if(this.isAttached){
this.bindingElement.title=_9d0;
}
};
FieldDescBinding.newInstance=function(_9d1){
var _9d2=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9d1);
return UserInterface.registerBinding(_9d2,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9d3){
var _9d4=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9d3);
return UserInterface.registerBinding(_9d4,FieldDataBinding);
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
var _9d5=this._fieldHelpPopupBinding;
if(_9d5){
_9d5.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9d6=app.bindingMap.fieldhelpopupset;
var doc=_9d6.bindingDocument;
var _9d8=_9d6.add(PopupBinding.newInstance(doc));
var _9d9=_9d8.add(PopupBodyBinding.newInstance(doc));
_9d8.position=PopupBinding.POSITION_RIGHT;
_9d8.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9d9.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9da=this.getProperty("label");
if(_9da){
_9d9.bindingElement.innerHTML=Resolver.resolve(_9da);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9d8;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9db=this.getAncestorBindingByLocalName("field");
if(_9db){
_9db.attachClassName("fieldhelp");
var _9dc=ClickButtonBinding.newInstance(this.bindingDocument);
_9dc.attachClassName("fieldhelp");
_9dc.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9dc);
_9dc.attach();
var self=this;
_9dc.oncommand=function(){
self.attachPopupBinding();
};
_9dc.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9dc;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9de=this._fieldHelpPopupBinding;
if(_9de&&!_9de.isAttached){
_9de.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9e0){
RadioDataGroupBinding.superclass.handleAction.call(this,_9e0);
switch(_9e0.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9e2,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9e2,arg);
switch(_9e2){
case BroadcastMessages.KEY_ARROW:
var _9e4=null;
var next=null;
var _9e6=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9e6=this.getChildBindingsByLocalName("radio");
while(!_9e4&&_9e6.hasNext()){
var _9e7=_9e6.getNext();
if(_9e7.getProperty("ischecked")){
_9e4=_9e7;
}
}
break;
}
if(_9e4){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9e6.getFollowing(_9e4);
while(next!=null&&next.isDisabled){
next=_9e6.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9e6.getPreceding(_9e4);
while(next!=null&&next.isDisabled){
next=_9e6.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9e8){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9e8){
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
var _9e9=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9e9.type="hidden";
_9e9.name=this._name;
this.bindingElement.appendChild(_9e9);
this.shadowTree.input=_9e9;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9ea=null;
var _9eb=this.getChildBindingsByLocalName("radio");
while(!_9ea&&_9eb.hasNext()){
var _9ec=_9eb.getNext();
if(_9ec.isChecked){
_9ea=_9ec.getProperty("value");
}
}
return _9ea;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9ed){
};
RadioDataGroupBinding.prototype.setResult=function(_9ee){
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
this.propertyMethodMap["checked"]=function(_9ef){
if(_9ef!=this.isChecked){
this.setChecked(_9ef,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9f0=this.getProperty("ischecked");
if(_9f0!=this.isChecked){
this.setChecked(_9f0,true);
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
var _9f1=this.getProperty("relate");
var _9f2=this.getProperty("oncommand");
var _9f3=this.getProperty("isdisabled");
if(_9f1){
this.bindingRelate=_9f1;
this.relate();
}
if(_9f2){
this.oncommand=function(){
Binding.evaluate(_9f2,this);
};
}
if(_9f3==true){
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
var _9f5=this.getCallBackID();
this._buttonBinding.check=function(_9f6){
RadioButtonBinding.prototype.check.call(this,_9f6);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9f7){
RadioButtonBinding.prototype.uncheck.call(this,_9f7);
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
RadioDataBinding.prototype.setChecked=function(_9f8,_9f9){
this._buttonBinding.setChecked(_9f8,_9f9);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9f8);
};
RadioDataBinding.prototype.check=function(_9fa){
this.setChecked(true,_9fa);
};
RadioDataBinding.prototype.uncheck=function(_9fb){
this.setChecked(false,_9fb);
};
RadioDataBinding.prototype.setDisabled=function(_9fc){
if(_9fc!=this.isDisabled){
this.isDisabled=_9fc;
this._buttonBinding.setDisabled(_9fc);
if(_9fc){
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
var _9fe=DOMEvents.getTarget(e);
switch(_9fe){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9ff=this.getProperty("label");
if(_9ff){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9ff)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a00){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a00;
}
this.setProperty("label",_a00);
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
this.propertyMethodMap["checked"]=function(_a01){
if(_a01!=this.isChecked){
this.setChecked(_a01,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a02=this.getProperty("ischecked");
if(_a02!=this.isChecked){
this.setChecked(_a02,true);
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
var _a04=DOMEvents.getTarget(e);
switch(_a04){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a05,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a05,arg);
switch(_a05){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a08){
_a08.consume();
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
var _a0a=this.getCallBackID();
this._buttonBinding.check=function(_a0b){
ButtonBinding.prototype.check.call(this,_a0b);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a0b){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a0c){
ButtonBinding.prototype.uncheck.call(this,_a0c);
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
if(_a0a!=null){
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
var _a0d=true;
var _a0e=this.bindingElement.parentNode;
if(_a0e){
var _a0f=UserInterface.getBinding(_a0e);
if(_a0f&&_a0f instanceof CheckBoxGroupBinding){
if(_a0f.isRequired){
if(_a0f.isValid){
_a0d=_a0f.validate();
}else{
_a0d=false;
}
}
}
}
return _a0d;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a10=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a10.type="hidden";
_a10.name=this._name;
_a10.style.display="none";
this.bindingElement.appendChild(_a10);
this.shadowTree.input=_a10;
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
var _a11=null;
var _a12=this.getProperty("value");
if(this.isChecked){
_a11=_a12?_a12:"on";
}
return _a11;
};
CheckBoxBinding.prototype.setValue=function(_a13){
if(_a13==this.getValue()||_a13=="on"){
this.check(true);
}else{
if(_a13!="on"){
this.setPropety("value",_a13);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a14=false;
if(this.isChecked){
_a14=this._result!=null?this._result:true;
}
return _a14;
};
CheckBoxBinding.prototype.setResult=function(_a15){
if(typeof _a15=="boolean"){
this.setChecked(_a15,true);
}else{
this._result=_a15;
}
};
CheckBoxBinding.newInstance=function(_a16){
var _a17=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a16);
return UserInterface.registerBinding(_a17,CheckBoxBinding);
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
var _a18=true;
if(this.isRequired){
var _a19=this.getDescendantBindingsByLocalName("checkbox");
if(_a19.hasEntries()){
_a18=false;
while(_a19.hasNext()&&!_a18){
if(_a19.getNext().isChecked){
_a18=true;
}
}
}
if(_a18==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a18;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a1a){
if(_a1a){
if(!this._labelBinding){
var _a1b=LabelBinding.newInstance(this.bindingDocument);
_a1b.attachClassName("invalid");
_a1b.setImage("${icon:error}");
_a1b.setLabel("Selection required");
this._labelBinding=this.addFirst(_a1b);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a1c){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a1c);
switch(_a1c.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a1d){
var _a1e=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a1d);
return UserInterface.registerBinding(_a1e,CheckBoxGroupBinding);
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
var _a1f=DialogControlBinding.newInstance(this.bindingDocument);
_a1f.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a1f);
this._controlGroupBinding.attachRecursive();
var _a20=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a20);
var _a21=this.getLabel();
if(_a21!=null){
this.setLabel(_a21);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a22=this._snapTargetBinding;
if(Binding.exists(_a22)==true){
_a22.removeActionListener(Binding.ACTION_BLURRED,this);
_a22.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a23){
if(Interfaces.isImplemented(IData,_a23)){
this._snapTargetBinding=_a23;
var _a24=_a23.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a24&&_a24.isConsumed){
this._environmentBinding=_a24.listener;
}
if(this._environmentBinding){
_a23.addActionListener(Binding.ACTION_BLURRED,this);
_a23.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a23)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a23.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a26=this._snapTargetBinding;
var _a27=this._environmentBinding;
var root=UserInterface.getBinding(_a26.bindingDocument.body);
if(Binding.exists(_a26)&&Binding.exists(_a27)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a26.isAttached&&_a27.isAttached){
var _a29=_a26.boxObject.getUniversalPosition();
var _a2a=_a27.boxObject.getUniversalPosition();
_a2a.y+=_a27.bindingElement.scrollTop;
_a2a.x+=_a27.bindingElement.scrollLeft;
var tDim=_a26.boxObject.getDimension();
var eDim=_a27.boxObject.getDimension();
var _a2d=false;
if(_a29.y+tDim.h<_a2a.y){
_a2d=true;
}else{
if(_a29.x+tDim.w<_a2a.x){
_a2d=true;
}else{
if(_a29.y>_a2a.y+eDim.h){
_a2d=true;
}else{
if(_a29.x>_a2a.x+eDim.w){
_a2d=true;
}
}
}
}
if(!_a2d){
this._setComputedPosition(_a29,_a2a,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a2e,_a2f,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a34=_a2e;
var _a35=false;
if(_a2e.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a35=true;
}else{
if(_a2e.x+tDim.w>=_a2f.x+eDim.w){
_a35=true;
}
}
if(_a35){
_a34.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a34.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a34.y-=(bDim.h);
_a34.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a34);
};
BalloonBinding.prototype.handleBroadcast=function(_a36,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a36,arg);
switch(_a36){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a38){
var _a39=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a38){
_a39=true;
}
}
return _a39;
};
BalloonBinding.prototype._setPosition=function(_a3b){
var _a3c=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a3c=true;
}
}
if(!_a3c){
this.bindingElement.style.left=_a3b.x+"px";
this.bindingElement.style.top=_a3b.y+"px";
this._point=_a3b;
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
BalloonBinding.prototype.handleAction=function(_a3e){
BalloonBinding.superclass.handleAction.call(this,_a3e);
var _a3f=_a3e.target;
switch(_a3e.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a3e.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a3f==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a3f)){
self.dispose();
}else{
if(_a3f.validate()){
var _a41=true;
if(_a3e.type==Binding.ACTION_BLURRED){
var root=_a3f.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a41=false;
}
}
if(_a41){
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
BalloonBinding.prototype.setLabel=function(_a44){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a45=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a44);
_a45.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a45);
}
this.setProperty("label",_a44);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a47){
var _a48=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a47);
var _a49=UserInterface.registerBinding(_a48,BalloonBinding);
_a49.hide();
return _a49;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a4a,_a4b){
if(Interfaces.isImplemented(IData,_a4b)==true){
var _a4c,_a4d=_a4b.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a4d&&_a4d.isConsumed){
switch(_a4d.listener.constructor){
case StageBinding:
_a4c=false;
break;
case StageDialogBinding:
_a4c=true;
break;
}
}
var _a4e=_a4c?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a4f=_a4e.add(BalloonBinding.newInstance(top.app.document));
_a4f.setLabel(_a4a.text);
_a4f.snapTo(_a4b);
_a4f.attach();
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
var _a50=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a53=_a50.getDataBinding(name);
if(_a53){
ErrorBinding.presentError({text:text},_a53);
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
FocusBinding.focusElement=function(_a54){
var _a55=true;
try{
_a54.focus();
Application.focused(true);
}
catch(exception){
var _a56=UserInterface.getBinding(_a54);
var _a57=SystemLogger.getLogger("FocusBinding.focusElement");
_a57.warn("Could not focus "+(_a56?_a56.toString():String(_a54)));
_a55=false;
}
return _a55;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a58){
var win=_a58.bindingWindow;
var id=_a58.bindingElement.id;
return {getBinding:function(){
var _a5b=null;
try{
if(Binding.exists(_a58)){
_a5b=win.bindingMap[id];
}
}
catch(exception){
}
return _a5b;
}};
};
FocusBinding.navigateNext=function(_a5c){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a5c);
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
var _a5d=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a5d&&_a5d.isConsumed){
if(_a5d.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a5e){
FocusBinding.superclass.handleAction.call(this,_a5e);
var _a5f=_a5e.target;
var _a60=null;
if(this._isFocusManager){
switch(_a5e.type){
case FocusBinding.ACTION_ATTACHED:
if(_a5f!=this){
this._isUpToDate=false;
}
_a5e.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a5f!=this){
this._isUpToDate=false;
_a5e.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a60=new FocusCrawler();
_a60.mode=FocusCrawler.MODE_BLUR;
_a60.crawl(_a5f.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a5e.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a5f!=this){
_a60=new FocusCrawler();
_a60.mode=FocusCrawler.MODE_FOCUS;
_a60.crawl(_a5f.bindingElement);
}
_a5e.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a5f)){
this.claimFocus();
this._onFocusableFocused(_a5f);
}
_a5e.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a5f)){
this._onFocusableBlurred(_a5f);
}
_a5e.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a61){
var _a62=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a62==null&&list.hasNext()){
var _a64=list.getNext();
if(this._cachedFocus&&_a64==this._cachedFocus.getBinding()){
_a62=_a64;
}
}
if(_a62!=null){
if(_a64.isFocused){
var next=_a61?list.getPreceding(_a62):list.getFollowing(_a62);
if(!next){
next=_a61?list.getLast():list.getFirst();
}
next.focus();
}else{
_a62.focus();
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
var _a66=new FocusCrawler();
var list=new List();
_a66.mode=FocusCrawler.MODE_INDEX;
_a66.crawl(this.bindingElement,list);
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
var _a69=this._cachedFocus.getBinding();
if(_a69&&!_a69.isFocused){
_a69.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a6a){
if(_a6a!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a6a;
_a6a.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a6a);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a6b){
_a6b.deleteProperty(FocusBinding.MARKER);
if(_a6b==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a6d){
this.bindingElement.style.left=_a6d+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a6e){
this.hiddenTabBindings.add(_a6e);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a6f=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a6f.getLabel());
item.setImage(_a6f.getImage());
item.associatedTabBinding=_a6f;
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
TabsButtonBinding.prototype.handleAction=function(_a72){
TabsButtonBinding.superclass.handleAction.call(this,_a72);
switch(_a72.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a73=this.selectedTabBinding;
if(_a73){
this.containingTabBoxBinding.moveToOrdinalPosition(_a73,0);
this.containingTabBoxBinding.select(_a73);
}
_a72.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a74){
var _a75=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a74);
_a75.setAttribute("type","checkbox");
_a75.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a75.className="tabbutton";
return UserInterface.registerBinding(_a75,TabsButtonBinding);
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
var _a76=TabBoxBinding.currentActiveInstance;
if(_a76!=null&&Binding.exists(_a76)){
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
var _a77=this.getTabElements().getLength();
var _a78=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a77!=_a78){
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
var _a79=this.getTabPanelElements();
while(_a79.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a79.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a7a=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a7b=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a7c=_a7a>_a7b?"tabsbelow":"tabsontop";
this.attachClassName(_a7c);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a7e=this.getTabPanelElements();
var _a7f=null;
var _a80=this.getProperty("selectedindex");
if(_a80!=null){
if(_a80>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a81=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a83=_a7e.getNext();
this.registerTabBoxPair(tab,_a83);
if(_a80&&_a81==_a80){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a7f=tab;
}
}
_a81++;
}
if(!_a7f){
_a7f=tabs.getFirst();
_a7f.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a84){
var _a85=null;
var _a86=null;
if(this.isEqualSize){
var _a87=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a89=this.getTabPanelElements();
_a89.each(function(_a8a){
max=_a8a.offsetHeight>max?_a8a.offsetHeight:max;
});
_a86=max+_a87.top+_a87.bottom;
if(_a84&&this._tabPanelsElement.style.height!=null){
_a85=this._tabPanelsElement.offsetHeight;
}
if(_a85!=null||_a86>_a85){
this._tabPanelsElement.style.height=_a86+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a8b){
_a8b._invalidCount=0;
_a8b.addActionListener(Binding.ACTION_INVALID,this);
_a8b.addActionListener(Binding.ACTION_VALID,this);
_a8b.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a8c){
TabBoxBinding.superclass.handleAction.call(this,_a8c);
var _a8d=_a8c.target;
var _a8e=_a8c.listener;
switch(_a8c.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a8d.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a8c.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a8d.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a8e._invalidCount++;
if(_a8e._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a8e.isSelected){
self._showWarning(_a8e,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a8e._invalidCount>0){
_a8e._invalidCount--;
if(_a8e._invalidCount==0){
if(_a8e.isSelected){
this._showWarning(_a8e,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a8e,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a8c._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a8c._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a91=DOMEvents.getTarget(e);
if(_a91==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a93=this.getTabPanelElements();
tabs.each(function(tab,_a95){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a96=_a93.get(_a95);
this.registerTabBoxPair(tab,_a96);
}
},this);
var _a97=this._tabBoxPairs;
for(var key in _a97){
var tab=_a97[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a91);
switch(_a91.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a9b=_a91.parentNode;
if(_a9b==this._tabsElement||_a9b==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a91==this._tabsElement||_a91==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a9d){
var _a9e=this.getBindingForArgument(arg);
if(_a9e!=null&&!_a9e.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a9e.select(_a9d);
this.getTabPanelBinding(_a9e).select(_a9d);
var _a9f=this.getProperty("selectedindex");
if(_a9f!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a9e.bindingElement,true));
}
this._selectedTabBinding=_a9e;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a9e.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _aa0=this.getTabPanelBinding(_a9e);
this._showBalloon(_aa0,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_aa2){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_aa2.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_aa2};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_aa6){
var _aa7=null;
try{
var key=_aa6.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aa9=this._tabBoxPairs[key].tabPanel;
_aa7=UserInterface.getBinding(_aa9);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _aa7;
};
TabBoxBinding.prototype.getTabBinding=function(_aaa){
var key=_aaa.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aac=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_aac);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _aad=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_aad);
return _aad;
};
TabBoxBinding.prototype.appendTabByBindings=function(_aae,_aaf){
var _ab0=_aae.bindingElement;
_aae.setProperty("selected",true);
var _ab1=this.summonTabPanelBinding();
var _ab2=_ab1.bindingElement;
if(_aaf){
_ab2.appendChild(_aaf instanceof Binding?_aaf.bindingElement:_aaf);
}
this.registerTabBoxPair(_ab0,_ab2);
UserInterface.getBinding(this._tabsElement).add(_aae);
this._tabPanelsElement.appendChild(_ab2);
_aae.attach();
UserInterface.getBinding(_ab2).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _aae;
};
TabBoxBinding.prototype.importTabBinding=function(_ab3){
var that=_ab3.containingTabBoxBinding;
var _ab5=that.getTabPanelBinding(_ab3);
var _ab6=_ab5.getBindingElement();
var _ab7=_ab3.getBindingElement();
that.dismissTabBinding(_ab3);
this._tabsElement.appendChild(_ab7);
this._tabPanelsElement.appendChild(_ab6);
this.registerTabBoxPair(_ab7,_ab6);
_ab3.containingTabBoxBinding=this;
this.select(_ab3);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ab8){
var _ab9=null;
if(_ab8.isSelected){
_ab9=this.getBestTab(_ab8);
this._selectedTabBinding=null;
}
var _aba=this.getTabPanelBinding(_ab8);
this.unRegisterTabBoxPair(_ab8.bindingElement);
_ab8.dispose();
_aba.dispose();
if(_ab9!=null){
this.select(_ab9);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_abb){
if(_abb.isSelected){
this.selectBestTab(_abb);
}
};
TabBoxBinding.prototype.selectBestTab=function(_abc){
var _abd=this.getBestTab(_abc);
if(_abd){
this.select(_abd);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_abe){
var _abf=null;
var _ac0=_abe.getOrdinalPosition(true);
var _ac1=this.getTabBindings();
var _ac2=_ac1.getLength();
var _ac3=_ac2-1;
if(_ac2==1){
_abf=null;
}else{
if(_ac0==_ac3){
_abf=_ac1.get(_ac0-1);
}else{
_abf=_ac1.get(_ac0+1);
}
}
return _abf;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_ac4,_ac5){
var _ac6=this.bindingDocument.getElementById(_ac4.bindingElement.id);
var tab=this.getTabElements().get(_ac5);
this._tabsElement.insertBefore(_ac6,tab);
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
var _ac8=this._nodename_tab;
var _ac9=new List(this._tabsElement.childNodes);
var _aca=new List();
while(_ac9.hasNext()){
var _acb=_ac9.getNext();
if(_acb.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_acb)==_ac8){
_aca.add(_acb);
}
}
return _aca;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _acc=this._nodename_tabpanel;
var _acd=new List(this._tabPanelsElement.childNodes);
var _ace=new List();
_acd.each(function(_acf){
if(_acf.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_acf)==_acc){
_ace.add(_acf);
}
});
return _ace;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _ad0=new List();
var _ad1=this.getTabElements();
_ad1.each(function(_ad2){
_ad0.add(UserInterface.getBinding(_ad2));
});
return _ad0;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _ad3=new List();
this.getTabPanelElements().each(function(_ad4){
_ad3.add(UserInterface.getBinding(_ad4));
});
return _ad3;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _ad5=null;
if(this._selectedTabBinding){
_ad5=this.getTabPanelBinding(this._selectedTabBinding);
}
return _ad5;
};
TabBoxBinding.prototype._showWarning=function(_ad6,_ad7){
var _ad8=this.getTabBinding(_ad6);
if(_ad7){
if(_ad8.labelBinding.hasImage){
_ad8._backupImage=_ad8.getImage();
}
_ad8.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ad8._backupImage){
_ad8.setImage(_ad8._backupImage);
}else{
_ad8.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ad9,_ada){
var _adb=this.getTabBinding(_ad9);
if((_ada&&!_adb.isSelected)||!_ada){
if(_adb.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ada){
if(_adb.labelBinding.hasImage){
_adb._backupImage=_adb.getImage();
}
_adb.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_adb._backupImage!=null){
_adb.setImage(_adb._backupImage);
}else{
_adb.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_adc){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _adf=tab.getOrdinalPosition(true);
var next=null;
var _ae1=new List();
tabs.each(function(t){
if(t.isVisible){
_ae1.add(t);
}
});
if(_ae1.getLength()>1){
if(_adf==0&&!_adc){
next=_ae1.getLast();
}else{
if(_adf==_ae1.getLength()-1&&_adc){
next=_ae1.getFirst();
}else{
if(_adc){
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
var _ae4=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_ae4.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_ae5){
TabsBinding.superclass.handleAction.call(this,_ae5);
switch(_ae5.type){
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
var _ae8=self.bindingElement.offsetWidth;
if(_ae8!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_ae8;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_ae9){
if(_ae9 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_ae9);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _aea=false;
var _aeb,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _aee=this.constructor.TABBUTTON_IMPLEMENTATION;
var _aef=this.bindingElement.offsetWidth-_aee.RESERVED_SPACE;
var _af0=null;
var sum=0,_af2=0;
var _af3=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_af3){
tab=tabs.getNext();
_aeb=UserInterface.getBinding(tab);
if(!_af0){
_af0=_aeb;
}
sum+=tab.offsetWidth;
if(sum>=_aef){
_aea=true;
if(_aeb.isSelected){
if(!DOMUtil.isFirstElement(_aeb.bindingElement,true)){
this.isManaging=false;
if(_af0){
_af0.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_aeb,_af2-1);
_af3=false;
}
}else{
_aeb.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_aeb);
}
}else{
_aeb.show();
_af0=_aeb;
_af2++;
}
}
if(_af3){
if(_aea&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _af4=_af0.getBindingElement();
var _af5=_af4.offsetLeft+_af4.offsetWidth;
var _af6=this.tabsButtonBinding;
setTimeout(function(){
_af6.show(_af5+4);
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
var _af7=TabBinding.superclass.serialize.call(this);
if(_af7){
_af7.label=this.getLabel();
_af7.image=this.getImage();
_af7.tooltip=this.getToolTip();
}
return _af7;
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
var _af8=this.bindingElement.getAttribute("image");
var _af9=this.bindingElement.getAttribute("label");
var _afa=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_af9){
this.setLabel(_af9);
}
if(_af8){
this.setImage(_af8);
}
if(_afa){
this.setToolTip(_afa);
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
TabBinding.prototype.setLabel=function(_afc){
if(_afc!=null){
this.setProperty("label",_afc);
if(this.isAttached){
this.labelBinding.setLabel(_afc);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_afd){
if(_afd){
this.setProperty("tooltip",_afd);
if(this.isAttached){
this.labelBinding.setToolTip(_afd);
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
var _aff=false;
if(Client.isMozilla==true){
}
if(!_aff){
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
TabBinding.prototype.select=function(_b00){
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
TabBinding.newInstance=function(_b01){
var _b02=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_b01);
return UserInterface.registerBinding(_b02,TabBinding);
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
var _b03=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_b03=true;
this._lastKnownDimension=dim1;
}
return _b03;
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
TabPanelBinding.prototype.select=function(_b06){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b06!=true){
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
TabPanelBinding.prototype.handleAction=function(_b07){
TabPanelBinding.superclass.handleAction.call(this,_b07);
var _b08=_b07.target;
switch(_b07.type){
case BalloonBinding.ACTION_INITIALIZE:
_b07.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b09){
var _b0a=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b09);
UserInterface.registerBinding(_b0a,TabPanelBinding);
return UserInterface.getBinding(_b0a);
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
var _b0b=SplitBoxBinding.superclass.serialize.call(this);
if(_b0b){
_b0b.orient=this.getOrient();
_b0b.layout=this.getLayout();
}
return _b0b;
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
var _b0c=this.getSplitPanelElements();
if(_b0c.hasEntries()){
var _b0d=new List(this.getLayout().split(":"));
if(_b0d.getLength()!=_b0c.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b0c.each(function(_b0e){
_b0e.setAttribute("ratio",_b0d.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b0f=this.getProperty("orient");
if(_b0f){
this._orient=_b0f;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b10=this.getSplitterBindings();
while(_b10.hasNext()){
var _b11=_b10.getNext();
if(_b11&&_b11.getProperty("collapsed")==true){
_b11.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b12){
SplitBoxBinding.superclass.handleAction.call(this,_b12);
switch(_b12.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b12.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b12.target);
_b12.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b12.target);
_b12.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b13){
this._getSplitPanelBindingForSplitter(_b13).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b14){
this._getSplitPanelBindingForSplitter(_b14).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b15){
var _b16=DOMUtil.getOrdinalPosition(_b15.bindingElement,true);
var _b17,_b18=this.getSplitPanelElements();
switch(_b15.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b17=_b18.get(_b16);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b17=_b18.get(_b16+1);
break;
}
return UserInterface.getBinding(_b17);
};
SplitBoxBinding.prototype.invokeLayout=function(_b19){
var _b1a=this.isHorizontalOrient();
var _b1b=this.getSplitPanelBindings();
var _b1c=this.getSplitterBindings();
var _b1d=new List();
var _b1e,sum=0;
var _b20=0;
_b1b.each(function(_b21){
if(_b21.isFixed==true){
if(!_b1b.hasNext()){
_b20+=_b21.getFix();
}
_b1d.add(0);
sum+=0;
}else{
_b1e=_b21.getRatio();
_b1d.add(_b1e);
sum+=_b1e;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b1d.getLength()!=_b1b.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b22=_b1a?this.getInnerWidth():this.getInnerHeight();
_b22-=_b20;
_b1c.each(function(_b23){
if(_b23.isVisible){
_b22-=SplitterBinding.DIMENSION;
}
});
var unit=_b22/sum;
var _b25=0;
var self=this;
_b1b.each(function(_b27){
var span=0;
var _b29=_b1d.getNext();
if(_b27.isFixed){
span=_b27.getFix();
}else{
span=Math.round(unit*_b29);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b25+=span;
while(_b25>_b22){
_b25--;
span--;
}
if(!_b27.isFixed){
if(_b1a){
_b27.setWidth(span);
}else{
_b27.setHeight(span);
}
}
});
}
if(_b19!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b2a=this.getLayout();
if(_b2a){
this.setProperty("layout",_b2a);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b2b=this.isHorizontalOrient();
var _b2c=this.getSplitPanelBindings();
var _b2d=this.getSplitterBindings();
var _b2e=null;
var _b2f=null;
var unit=null;
var _b31=null;
var span=null;
_b2c.each(function(_b33){
if(!unit){
unit=_b2b?_b33.getWidth():_b33.getHeight();
}
span=_b2b?_b33.getWidth():_b33.getHeight();
if(_b31){
span-=_b31;
_b31=null;
}
_b2e=_b2d.getNext();
if(_b2e&&_b2e.offset){
_b31=_b2e.offset;
span+=_b31;
}
_b33.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b34){
this.logger.debug(_b34);
this.setProperty("layout",_b34);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b35="",_b36=this.getSplitPanelBindings();
_b36.each(function(_b37){
_b35+=_b37.getRatio().toString();
_b35+=_b36.hasNext()?":":"";
});
this.setProperty("layout",_b35);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b38=this.getSplitPanelElements();
_b38.each(function(_b39){
layout+="1"+(_b38.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b3a){
this.bindingElement.style.width=_b3a+"px";
};
SplitBoxBinding.prototype.getInnerWidth=function(){
if(Client.isFirefox){
return Math.floor(this.bindingElement.getBoundingClientRect().width);
}
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b3b){
this.bindingElement.style.height=_b3b+"px";
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
SplitBoxBinding.prototype.fit=function(_b3c){
if(!this.isFit||_b3c){
if(this.isHorizontalOrient()){
var max=0;
var _b3e=this.getSplitPanelBindings();
_b3e.each(function(_b3f){
var _b40=_b3f.bindingElement.offsetHeight;
max=_b40>max?_b40:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b41){
var _b42=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b41);
return UserInterface.registerBinding(_b42,SplitBoxBinding);
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
var _b45=this.getProperty("hidden");
if(_b45){
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
var _b46=this.getProperty("ratiocache");
if(_b46){
this.setRatio(_b46);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b47){
if(!this.isFixed){
if(_b47!=this.getWidth()){
if(_b47<0){
_b47=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b47+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b47);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b48=null;
if(this.isFixed){
_b48=this.getFix();
}else{
_b48=this.bindingElement.offsetWidth;
}
return _b48;
};
SplitPanelBinding.prototype.setHeight=function(_b49){
if(!this.isFixed){
if(_b49!=this.getHeight()){
try{
this.bindingElement.style.height=_b49+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b4a=null;
if(this.isFixed){
_b4a=this.getFix();
}else{
_b4a=this.bindingElement.offsetHeight;
}
return _b4a;
};
SplitPanelBinding.prototype.setRatio=function(_b4b){
this.setProperty("ratio",_b4b);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b4c){
if(_b4c){
this._fixedSpan=_b4c;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b4c);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b4c);
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
SplitPanelBinding.newInstance=function(_b4d){
var _b4e=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b4d);
return UserInterface.registerBinding(_b4e,SplitPanelBinding);
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
var _b4f=SplitBoxBinding.superclass.serialize.call(this);
if(_b4f){
_b4f.collapse=this.getProperty("collapse");
_b4f.collapsed=this.getProperty("collapsed");
_b4f.disabled=this.getProperty("isdisabled");
}
return _b4f;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b50=this.getProperty("hidden");
if(_b50){
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
SplitterBinding.prototype.setCollapseDirection=function(_b52){
this.setProperty("collapse",_b52);
this._collapseDirection=_b52;
};
SplitterBinding.prototype.handleAction=function(_b53){
SplitterBinding.superclass.handleAction.call(this,_b53);
switch(_b53.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b53.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b55=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b55.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b55.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b56){
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
SplitterBinding.newInstance=function(_b61){
var _b62=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b61);
return UserInterface.registerBinding(_b62,SplitterBinding);
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
var _b63=this.getProperty("selectedindex");
var _b64=this.getDeckElements();
if(_b64.hasEntries()){
var _b65=false;
var _b66=0;
while(_b64.hasNext()){
var deck=_b64.getNext();
if(_b63&&_b66==_b63){
deck.setAttribute("selected","true");
_b65=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b65=true;
}
}
_b66++;
}
if(!_b65){
_b64.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b69=this.getBindingForArgument(arg);
if(_b69!=null){
if(_b69!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b69.select();
this._selectedDeckBinding=_b69;
var _b6a=this.getProperty("selectedindex");
if(_b6a!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b69.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b6b=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b6b=true;
this._lastKnownDimension=dim1;
}
return _b6b;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b6e){
var _b6f=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b6e);
return UserInterface.registerBinding(_b6f,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b70){
DeckBinding.superclass.handleAction.call(this,_b70);
var _b71=_b70.target;
switch(_b70.type){
case BalloonBinding.ACTION_INITIALIZE:
_b70.consume();
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
DeckBinding.newInstance=function(_b73){
var _b74=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b73);
return UserInterface.registerBinding(_b74,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b75){
if(_b75 instanceof ToolBarBodyBinding){
if(_b75.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b75;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b75;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b75);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b76=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b76){
this.setImageSize(_b76);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b78=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b78.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b78.isDefaultContent=true;
this.add(_b78);
_b78.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b7a=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b7a);
}
if(_b7a!=null&&_b7a.hasClassName("max")){
this._maxToolBarGroup(_b7a,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b7c){
var _b7d=this.boxObject.getDimension().w;
var _b7e=CSSComputer.getPadding(this.bindingElement);
_b7d-=(_b7e.left+_b7e.right);
if(_b7c!=null){
_b7d-=_b7c.boxObject.getDimension().w;
if(!Client.isWindows){
_b7d-=1;
}
if(Client.isExplorer){
_b7d-=15;
}
}
max.bindingElement.style.width=_b7d+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b7f){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b7f);
};
ToolBarBinding.prototype.addLeft=function(_b80,_b81){
var _b82=null;
if(this._toolBarBodyLeft!=null){
_b82=this._toolBarBodyLeft.add(_b80,_b81);
}else{
throw new Error("No left toolbarbody");
}
return _b82;
};
ToolBarBinding.prototype.addLeftFirst=function(_b83,_b84){
var _b85=null;
if(this._toolBarBodyLeft){
_b85=this._toolBarBodyLeft.addFirst(_b83,_b84);
}else{
throw new Error("No left toolbarbody");
}
return _b85;
};
ToolBarBinding.prototype.addRight=function(_b86){
var _b87=null;
if(this._toolBarBodyRight){
_b87=this._toolBarBodyRight.add(_b86);
}else{
throw new Error("No left toolbarbody");
}
return _b87;
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
ToolBarBinding.newInstance=function(_b8a){
var _b8b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b8a);
return UserInterface.registerBinding(_b8b,ToolBarBinding);
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
var _b8c=this.getDescendantBindingsByLocalName("toolbargroup");
var _b8d=new List();
var _b8e=true;
_b8c.each(function(_b8f){
if(_b8f.isVisible&&!_b8f.isDefaultContent){
_b8d.add(_b8f);
}
});
while(_b8d.hasNext()){
var _b90=_b8d.getNext();
_b90.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b8e){
_b90.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b8e=false;
}
if(!_b8d.hasNext()){
_b90.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b93=list.getNext();
var _b94=_b93.getEqualSizeWidth();
if(_b94>max){
max=_b94;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b93=list.getNext();
_b93.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b95,_b96){
var _b97=ToolBarBinding.superclass.add.call(this,_b95);
if(!_b96){
if(_b95 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b97;
};
ToolBarBodyBinding.prototype.addFirst=function(_b98,_b99){
var _b9a=ToolBarBinding.superclass.addFirst.call(this,_b98);
if(!_b99){
if(_b98 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b9a;
};
ToolBarBodyBinding.newInstance=function(_b9b){
var _b9c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b9b);
return UserInterface.registerBinding(_b9c,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b9d){
switch(_b9d){
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
var _b9e=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b9e)=="toolbarbody"){
UserInterface.getBinding(_b9e).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b9f=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b9f)=="toolbarbody"){
UserInterface.getBinding(_b9f).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_ba0){
var _ba1=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_ba0);
return UserInterface.registerBinding(_ba1,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_ba2){
var _ba3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ba2);
return UserInterface.registerBinding(_ba3,ToolBarButtonBinding);
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
var _ba4=this.getProperty("label");
var _ba5=this.getProperty("image");
if(_ba4){
this.setLabel(_ba4);
}
if(_ba5){
this.setImage(_ba5);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_ba6,_ba7){
if(this.isAttached){
this._labelBinding.setLabel(_ba6,_ba7);
}
this.setProperty("label",_ba6);
};
ToolBarLabelBinding.prototype.setImage=function(_ba8,_ba9){
if(this.isAttached){
this._labelBinding.setImage(_ba8,_ba9);
}
this.setProperty("image",_ba8);
};
ToolBarLabelBinding.newInstance=function(_baa){
var _bab=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_baa);
return UserInterface.registerBinding(_bab,ToolBarLabelBinding);
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
var _bac=this.getDescendantBindingsByLocalName("clickbutton");
if(_bac.hasEntries()){
while(_bac.hasNext()){
var _bad=_bac.getNext();
if(_bad.isDefault){
this._defaultButton=_bad;
_bad.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_bad.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_bac;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_bae,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_bae,arg);
switch(_bae){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _bb0=this.getAncestorBindingByType(DialogBinding,true);
if(_bb0!=null&&_bb0.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bb1){
DialogToolBarBinding.superclass.handleAction.call(this,_bb1);
var _bb2=_bb1.target;
var _bb3=false;
var _bb4=this._buttons.reset();
if(_bb2 instanceof ClickButtonBinding){
switch(_bb1.type){
case Binding.ACTION_FOCUSED:
_bb2.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bb2;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bb2.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bb3&&_bb4.hasNext()){
var _bb5=_bb4.getNext();
_bb3=_bb5.isFocused;
}
if(!_bb3){
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
ComboBoxBinding.newInstance=function(_bb7){
var _bb8=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bb7);
return UserInterface.registerBinding(_bb8,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bb9,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bb9,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bbd=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bbd.each(function(_bbe){
var _bbf=_bbe.getProperty("oncommand");
_bbe.setProperty("hiddencommand",_bbf);
_bbe.deleteProperty("oncommand");
_bbe.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bc0=null;
var _bc1=this.getActiveMenuItemId();
_bbd.reset();
while(_bbd.hasNext()){
var _bc2=_bbd.getNext();
if(_bc2.getProperty("id")==_bc1){
_bc0=_bc2;
break;
}
}
if(_bc0==null&&_bbd.hasEntries()){
_bc0=_bbd.getFirst();
}
if(_bc0!=null){
this.setButton(_bc0);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bc3){
if(_bc3 instanceof MenuItemBinding){
var _bc4=_bc3.getProperty("label");
var _bc5=_bc3.getProperty("image");
var _bc6=_bc3.getProperty("image-hover");
var _bc7=_bc3.getProperty("image-active");
var _bc8=_bc3.getProperty("image-disabled");
var _bc9=_bc3.getProperty("hiddencommand");
this.setLabel(_bc4?_bc4:"");
this.image=_bc5;
this.imageHover=_bc5;
this.imageActive=_bc7;
this.imageDisabled=_bc8;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bc9,this);
};
this.hideActiveItem(_bc3);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bca){
if(_bca instanceof MenuItemBinding){
this.setButton(_bca);
this.setActiveMenuItemId(_bca.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bcb){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bcc){
if(_bcc==_bcb){
Binding.prototype.hide.call(_bcc);
}else{
Binding.prototype.show.call(_bcc);
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
var _bce=this._views;
for(var _bcf in ViewDefinitions){
var def=ViewDefinitions[_bcf];
var key=def.perspective;
if(key!=null){
if(!_bce.has(key)){
_bce.set(key,new List());
}
var list=_bce.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bd3,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bd3,arg);
switch(_bd3){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bd6=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bd6.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bd6.add(StageViewMenuItemBinding.newInstance(_bd6.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bd6.show();
}else{
_bd6.hide();
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
TreeBinding.grid=function(_bda){
var _bdb=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bda);
var _bdd=_bda%_bdb;
if(_bdd>0){
_bda=_bda-_bdd+_bdb;
}
return _bda+TreeBodyBinding.PADDING_TOP;
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
var _bde=this.getProperty("focusable");
if(_bde!=null){
this._isFocusable=_bde;
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
var _be0=this.getProperty("builder");
if(_be0){
this._buildFromTextArea(_be0);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _be1=this.getProperty("selectable");
var _be2=this.getProperty("selectionproperty");
var _be3=this.getProperty("selectionvalue");
if(_be1){
this.setSelectable(true);
if(_be2){
this.setSelectionProperty(_be2);
}
if(_be3){
this.setSelectionValue(_be3);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _be6=UserInterface.getBinding(area);
var _be7=this._treeBodyBinding;
function build(){
_be7.subTreeFromString(area.value);
}
_be6.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_be8){
var _be9=_be8.getHandle();
if(this._treeNodeBindings.has(_be9)){
throw "Duplicate treenodehandles registered: "+_be8.getLabel();
}else{
this._treeNodeBindings.set(_be9,_be8);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_be9)){
_be8.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_beb){
this._treeNodeBindings.del(_beb.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_bec){
var _bed=null;
if(this._treeNodeBindings.has(_bec)){
_bed=this._treeNodeBindings.get(_bec);
}else{
throw "No such treenode: "+_bec;
}
return _bed;
};
TreeBinding.prototype.handleAction=function(_bee){
TreeBinding.superclass.handleAction.call(this,_bee);
var _bef=_bee.target;
switch(_bee.type){
case TreeNodeBinding.ACTION_OPEN:
_bee.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bef);
_bee.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bef;
this.focusSingleTreeNodeBinding(_bef);
if(!this.isFocused){
this.focus();
}
_bee.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bef;
this.focusSingleTreeNodeBinding(_bef);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bef;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bef;
this.focusSingleTreeNodeBinding(_bef);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bee.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bef.isFocused){
this.blurSelectedTreeNodes();
}
_bee.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bf0,_bf1){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bf2){
if(_bf2!=null&&!_bf2.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bf2);
_bf2.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_bf3){
this.blurSelectedTreeNodes();
while(_bf3.hasNext()){
var _bf4=_bf3.getNext();
this._focusedTreeNodeBindings.add(_bf4);
_bf4.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _bf5=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _bf6=false;
var _bf7=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _bf8=this._focusedTreeNodeBindings.getNext();
var _bf9=_bf8.getProperty(this._selectionProperty);
if(_bf9!=null){
if(!this._selectionValue||this._selectionValue[_bf9]){
_bf7=(this._selectedTreeNodeBindings[_bf8.key]=_bf8);
var _bfa=_bf5[_bf8.key];
if(!_bfa||_bfa!=_bf7){
_bf6=true;
}
}
}
}
if(_bf7){
if(_bf6){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_bf5){
for(var key in _bf5){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _bfc=new List();
for(var key in this._selectedTreeNodeBindings){
_bfc.add(this._selectedTreeNodeBindings[key]);
}
return _bfc;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_bfe){
_bfe.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_bff){
var _c00=_bff.getDescendantBindingsByLocalName("treenode");
var _c01=true;
var self=this;
_c00.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _c01;
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
var _c04=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_c04!=null){
this.focusSingleTreeNodeBinding(_c04);
_c04.callback();
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
TreeBinding.prototype.add=function(_c05){
var _c06=null;
if(this._treeBodyBinding){
_c06=this._treeBodyBinding.add(_c05);
}else{
this._treeNodeBuffer.add(_c05);
_c06=_c05;
}
return _c06;
};
TreeBinding.prototype.addFirst=function(_c07){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c08=this._treeBodyBinding.bindingElement;
_c08.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c09,_c0a){
if(_c0a.isContainer&&_c0a.isOpen){
_c0a.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c0b){
this._isSelectable=_c0b;
if(_c0b){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c0c){
this._selectionProperty=_c0c;
};
TreeBinding.prototype.setSelectionValue=function(_c0d){
if(_c0d){
var list=new List(_c0d.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c0f,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c0f,arg);
switch(_c0f){
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
var _c11=this.getFocusedTreeNodeBindings();
if(_c11.hasEntries()){
var node=_c11.getFirst();
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
var _c14=this.getFocusedTreeNodeBindings();
if(_c14.hasEntries()){
var node=_c14.getFirst();
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
var _c17=null;
while(next==null&&(_c17=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c17!=null){
next=_c17.getNextBindingByLocalName("treenode");
}
node=_c17;
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
var _c19=DOMEvents.getTarget(e);
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
var _c1a=new TreeCrawler();
var list=new List();
_c1a.mode=TreeCrawler.MODE_GETOPEN;
_c1a.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c1d=list.getNext();
map.set(_c1d.getHandle(),true);
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
var _c22=this._positionIndicatorBinding;
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
if(y!=_c22.getPosition().y){
_c22.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c22.isVisible){
_c22.show();
}
}else{
if(_c22.isVisible){
_c22.hide();
}
}
}else{
if(_c22.isVisible){
_c22.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c25){
this._acceptingTreeNodeBinding=_c25;
this._acceptingPosition=_c25.boxObject.getLocalPosition();
this._acceptingDimension=_c25.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c25);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c26){
var map={};
var _c28=_c26.getChildBindingsByLocalName("treenode");
var _c29,pos,dim,y;
y=TreeBinding.grid(_c26.boxObject.getLocalPosition().y);
map[y]=true;
while(_c28.hasNext()){
_c29=_c28.getNext();
pos=_c29.boxObject.getLocalPosition();
dim=_c29.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c2f in this._acceptingPositions){
if(_c2f==y){
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
TreeBinding.newInstance=function(_c30){
var _c31=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c30);
var _c32=UserInterface.registerBinding(_c31,TreeBinding);
_c32.treeBodyBinding=TreeBodyBinding.newInstance(_c30);
return _c32;
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
TreeBodyBinding.prototype.accept=function(_c33){
if(_c33 instanceof TreeNodeBinding){
this.logger.debug(_c33);
}
};
TreeBodyBinding.prototype.handleAction=function(_c34){
TreeBodyBinding.superclass.handleAction.call(this,_c34);
switch(_c34.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c34.target);
_c34.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c35){
var a=this.boxObject.getDimension().h;
var y=_c35.boxObject.getLocalPosition().y;
var h=_c35.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c3b=_c35.labelBinding.bindingElement;
if(y-t<0){
_c3b.scrollIntoView(true);
}else{
if(y-t+h>a){
_c3b.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c3c){
var _c3d=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c3c);
return UserInterface.registerBinding(_c3d,TreeBodyBinding);
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
var _c3e=TreeNodeBinding.superclass.serialize.call(this);
if(_c3e){
_c3e.label=this.getLabel();
_c3e.image=this.getImage();
var _c3f=this.getHandle();
if(_c3f&&_c3f!=this.key){
_c3e.handle=_c3f;
}
if(this.isOpen){
_c3e.open=true;
}
if(this.isDisabled){
_c3e.disabled=true;
}
if(this.dragType){
_c3e.dragtype=this.dragType;
}
if(this.dragAccept){
_c3e.dragaccept=this.dragAccept;
}
}
return _c3e;
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
var _c41=UserInterface.getBinding(node);
if(_c41&&_c41.containingTreeBinding){
this.containingTreeBinding=_c41.containingTreeBinding;
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
var _c42=this.key;
var _c43=this.getProperty("handle");
if(_c43){
_c42=_c43;
}
return _c42;
};
TreeNodeBinding.prototype.setHandle=function(_c44){
this.setProperty("handle",_c44);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c46=this.getProperty("label");
var _c47=this.getProperty("tooltip");
var _c48=this.getProperty("oncommand");
var _c49=this.getProperty("onbindingfocus");
var _c4a=this.getProperty("onbindingblur");
var _c4b=this.getProperty("focused");
var _c4c=this.getProperty("callbackid");
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
if(_c46!=null){
this.setLabel(_c46);
}
if(_c47!=null){
this.setToolTip(_c47);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c4e=this.bindingWindow.WindowManager;
if(_c48!=null){
this.oncommand=function(){
Binding.evaluate(_c48,this);
};
}
if(_c49!=null){
this.onfocus=function(){
Binding.evaluate(_c49,this);
};
}
if(_c4a!=null){
this.onblur=function(){
Binding.evaluate(_c4a,this);
};
}
if(_c4b==true){
this.focus();
}
if(_c4c!=null){
Binding.dotnetify(this,_c4c);
}
};
TreeNodeBinding.prototype.handleAction=function(_c4f){
TreeNodeBinding.superclass.handleAction.call(this,_c4f);
switch(_c4f.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c4f.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c50,_c51){
var _c52=true;
if(_c50 instanceof TreeNodeBinding){
var _c53=false;
var _c54=this.bindingElement;
var _c55=this.containingTreeBinding.bindingElement;
while(!_c53&&_c54!=_c55){
if(_c54==_c50.getBindingElement()){
_c53=true;
}else{
_c54=_c54.parentNode;
}
}
if(_c53){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c52=false;
}else{
this.acceptTreeNodeBinding(_c50,_c51);
}
}else{
_c52=false;
}
return _c52;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c56,_c57){
var _c58=_c56.serializeToString();
var _c59=new BindingParser(this.bindingDocument);
var _c5a=_c59.parseFromString(_c58).getFirst();
_c57=_c57?_c57:this.containingTreeBinding.getDropIndex();
var _c5b=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c5a,_c5b.get(_c57));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c56.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c5c=this.getProperty("image");
var _c5d=this.getProperty("image-active");
var _c5e=this.getProperty("image-disabled");
_c5d=_c5d?_c5d:this.isContainer?_c5c?_c5c:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c5c?_c5c:TreeNodeBinding.DEFAULT_ITEM;
_c5e=_c5e?_c5e:this.isContainer?_c5c?_c5c:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c5c?_c5c:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c5c=_c5c?_c5c:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c5c,imageHover:null,imageActive:_c5d,imageDisabled:_c5e});
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
TreeNodeBinding.prototype.setLabel=function(_c60){
this.setProperty("label",String(_c60));
if(this.isAttached){
this.labelBinding.setLabel(String(_c60));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c61){
this.setProperty("tooltip",String(_c61));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c61));
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
var _c62=this.imageProfile.getDefaultImage();
var _c63=this.imageProfile.getActiveImage();
_c63=_c63?_c63:_c62;
return this.isOpen?_c63:_c62;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c65=DOMEvents.getTarget(e);
var _c66=this.labelBinding.bindingElement;
var _c67=this.labelBinding.shadowTree.labelBody;
var _c68=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c65){
case _c66:
this._onAction(e);
break;
case _c67:
case _c68:
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
if(_c65.parentNode==this.bindingElement&&_c65.__updateType==Update.TYPE_INSERT){
var _c66=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c65)=="treenode"){
if(_c65==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c65,_c66.nextSibling);
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
switch(_c65){
case _c66:
case _c67:
case _c68:
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
var _c6c=true;
if(e.type=="mousedown"){
var _c6d=e.button==(e.target?0:1);
if(!_c6d){
_c6c=false;
}
}
if(_c6c){
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
var _c6f=false;
if(e!=null){
_c6f=e.shiftKey;
}
this.dispatchAction(_c6f?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c72=this.getDescendantBindingsByLocalName("treenode");
_c72.each(function(_c73){
_c73.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c74){
var _c75=_c74.getAttribute("focused");
if(_c75=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c76){
var _c77=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c76);
return UserInterface.registerBinding(_c77,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c78){
var _c79=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c78);
return UserInterface.registerBinding(_c79,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c7a){
this.bindingElement.style.left=_c7a.x+"px";
this.bindingElement.style.top=_c7a.y+"px";
this._geometry.x=_c7a.x;
this._geometry.y=_c7a.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c7b){
var _c7c=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c7b);
return UserInterface.registerBinding(_c7c,TreePositionIndicatorBinding);
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
this.addFilter(function(_c7e){
var _c7f=UserInterface.getBinding(_c7e);
var _c80=null;
var _c80=null;
if(!_c7f instanceof TreeNodeBinding){
_c80=NodeCrawler.SKIP_NODE;
}
return _c80;
});
this.addFilter(function(_c81,list){
var _c83=UserInterface.getBinding(_c81);
var _c84=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c83.isOpen){
list.add(_c83);
}
break;
}
return _c84;
});
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c85){
this.binding=_c85;
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
DockTabsButtonBinding.newInstance=function(_c86){
var _c87=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c86);
_c87.setAttribute("type","checkbox");
_c87.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c87.className="tabbutton";
return UserInterface.registerBinding(_c87,DockTabsButtonBinding);
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
var _c88=DockBinding.superclass.serialize.call(this);
if(_c88){
_c88.active=this.isActive?true:null;
_c88.collapsed=this.isCollapsed?true:null;
}
return _c88;
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
var _c89=UserInterface.getBinding(this.bindingElement.parentNode);
var _c8a=MatrixBinding.newInstance(this.bindingDocument);
_c8a.attachClassName("dockliner");
this.shadowTree.dockLiner=_c8a;
_c89.add(_c8a);
_c8a.attach();
_c8a.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c8c){
var _c8d=this.getSelectedTabPanelBinding();
if(_c8d){
_c8d.isVisible=_c8c;
_c8d.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c8e){
var _c8f=this._getBindingForDefinition(_c8e);
var _c90=DockTabBinding.newInstance(this.bindingDocument);
_c90.setHandle(_c8e.handle);
_c90.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c8e.label);
_c90.setImage(_c8e.image);
_c90.setToolTip(_c8e.toolTip);
_c90.setEntityToken(_c8e.entityToken);
_c90.setAssociatedView(_c8f);
this.appendTabByBindings(_c90,null);
this._setupPageBindingListeners(_c90);
var _c91=this.getTabPanelBinding(_c90);
_c8f.snapToBinding(_c91);
var _c92=this.bindingWindow.bindingMap.views;
_c92.add(_c8f);
if(!this.isActive){
this.activate();
}
_c8f.attach();
};
DockBinding.prototype.prepareOpenView=function(_c93,_c94){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c94.setLabel(_c93.label);
_c94.setImage(_c93.image);
_c94.setToolTip(_c93.toolTip);
this._setupPageBindingListeners(_c94);
var _c95=this.getTabPanelBinding(_c94);
var _c96=this._getBindingForDefinition(_c93);
_c94.setAssociatedView(_c96);
_c96.snapToBinding(_c95);
UserInterface.getBinding(this.bindingDocument.body).add(_c96);
_c96.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c97){
var _c98=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c98.bindingDocument);
view.setDefinition(_c97);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c9a){
var _c9b=this.getTabPanelBinding(_c9a);
var self=this;
var _c9d={handleAction:function(_c9e){
var _c9f=_c9e.target;
switch(_c9e.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c9f.reflex(true);
var view=_c9a.getAssociatedView();
if(_c9f.bindingWindow==view.getContentWindow()){
_c9a.updateDisplay(_c9f);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c9a.onPageInitialize(_c9f);
_c9e.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c9a.updateDisplay(_c9f);
_c9e.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c9a.updateEntityToken(_c9f);
_c9e.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c9a.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_c9a.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c9a);
_c9e.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c9a,true);
_c9e.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c9a);
break;
case Binding.ACTION_FORCE_REFLEX:
_c9b.reflex(true);
_c9e.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c9a.isDirty){
_c9a.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_ca1){
_c9b.addActionListener(_ca1,_c9d);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_ca2){
DockBinding.superclass.handleAction.call(this,_ca2);
var _ca3=_ca2.target;
switch(_ca2.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_ca2.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_ca3 instanceof DockBinding){
if(_ca3.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_ca3);
if(this.isActive){
_ca3.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_ca3);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_ca4,arg){
DockBinding.superclass.handleBroadcast.call(this,_ca4,arg);
switch(_ca4){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _ca6=arg;
if(_ca6.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_ca6.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_ca7){
var tabs=this.getTabBindings();
var _ca9=false;
while(tabs.hasNext()&&!_ca9){
var tab=tabs.getNext();
var _cab=tab.getEntityToken();
if(_cab!=null&&_cab==_ca7){
if(!tab.isSelected){
this.select(tab,true);
_ca9=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cac){
this._handleCollapse(true,_cac);
};
DockBinding.prototype.unCollapse=function(_cad){
this._handleCollapse(false,_cad);
};
DockBinding.prototype._handleCollapse=function(_cae,_caf){
var _cb0=this.getChildBindingByLocalName("dockpanels");
var _cb1=this.getAncestorBindingByLocalName("splitbox");
if(_cae){
_cb0.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_caf&&_cb1.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cb0.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_caf){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cae);
this.isCollapsed=_cae;
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
DockBinding.prototype.closeTab=function(_cb6,_cb7){
if(_cb6.isDirty&&!_cb7){
var _cb8=Resolver.resolve(_cb6.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cb8),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cba){
switch(_cba){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cb6);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cb6);
break;
}
}});
}else{
this.removeTab(_cb6);
}
};
DockBinding.prototype.closeTabsExcept=function(_cbb){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cbb){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cbe){
var _cbf=_cbe.getAssociatedView();
_cbf.saveContainedEditor();
var self=this;
var _cc1={handleBroadcast:function(_cc2,arg){
switch(_cc2){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cbf.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cc1);
if(arg.isSuccess){
self.removeTab(_cbe);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cc1);
};
DockBinding.prototype.appendTabByBindings=function(_cc4,_cc5){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cc4,_cc5);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cc6){
_cc6=_cc6?_cc6+"px":"100%";
this.bindingElement.style.width=_cc6;
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
DockBinding.prototype.showControls=function(_cc7){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cc7){
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
var _cca=DockControlBinding.newInstance(this.bindingDocument);
_cca.setControlType(type);
return _cca;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _ccc=self.containingTabBoxBinding.getWidth();
if(!isNaN(_ccc)){
_ccc=_ccc>0?_ccc-1:0;
self.bindingElement.style.width=new String(_ccc)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ccd){
DockTabsBinding.superclass.handleCrawler.call(this,_ccd);
switch(_ccd.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
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
};
DockTabsBinding.newInstance=function(_cd0){
var _cd1=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cd0);
return UserInterface.registerBinding(_cd1,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cd2){
this._viewBinding=_cd2;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cd3=DockTabBinding.superclass.serialize.call(this);
if(_cd3){
_cd3.label=null;
_cd3.image=null;
_cd3.handle=this.getHandle();
}
return _cd3;
};
DockTabBinding.prototype.setHandle=function(_cd4){
this.setProperty("handle",_cd4);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cd5){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cd5;
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
var _cd6=DialogControlBinding.newInstance(this.bindingDocument);
_cd6.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cd6);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cd7){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cd7){
this.isDirty=_cd7;
if(Binding.exists(this.labelBinding)){
var _cd8=this.labelBinding.getLabel();
if(_cd8!=null){
this.labelBinding.setLabel(_cd7?"*"+_cd8:_cd8.slice(1,_cd8.length));
}else{
this.labelBinding.setLabel(_cd7?"*":"");
}
}
}
var _cd9=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cd9.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cd9.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cda){
this.setLabel(_cda.getLabel());
this.setImage(_cda.getImage());
this.setToolTip(_cda.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cdb){
this.setEntityToken(_cdb.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cdc){
DockTabBinding.superclass.handleAction.call(this,_cdc);
var _cdd=_cdc.target;
switch(_cdc.type){
case ControlBinding.ACTION_COMMAND:
if(_cdd.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cdc.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cdd);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cde){
var cmd=_cde.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_ce0){
if(!_ce0){
if(!this.getLabel()){
_ce0=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_ce0=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_ce0);
};
DockTabBinding.prototype.setImage=function(_ce1){
if(!_ce1){
if(!this.getImage()){
_ce1=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_ce1=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_ce1);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _ce4=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_ce4;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_ce4;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_ce4;
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
var _ce6=this.bindingElement;
setTimeout(function(){
_ce6.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_ce7,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_ce7,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_ce7){
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
DockTabBinding.prototype.select=function(_cec){
DockTabBinding.superclass.select.call(this,_cec);
this._updateBroadcasters();
if(_cec!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _ced=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cee=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cee.enable();
if(this.isDirty){
_ced.enable();
}else{
_ced.disable();
}
}else{
_cee.disable();
_ced.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cef){
if(this._canUpdateTree||_cef){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cf0=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cf2=win.bindingMap.savebutton;
if(_cf2!=null){
_cf0=true;
}
}
}
return _cf0;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cf3){
var _cf4=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cf3);
return UserInterface.registerBinding(_cf4,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_cf5){
var _cf6=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_cf5);
return UserInterface.registerBinding(_cf6,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_cf7){
DockPanelBinding.superclass.select.call(this,_cf7);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_cf8){
DockPanelBinding.superclass.handleCrawler.call(this,_cf8);
if(_cf8.response==null){
if(_cf8.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_cf8.id==FocusCrawler.ID){
_cf8.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_cf9){
var _cfa=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_cf9);
return UserInterface.registerBinding(_cfa,DockPanelBinding);
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
DockControlBinding.newInstance=function(_cfb){
var _cfc=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cfb);
return UserInterface.registerBinding(_cfc,DockControlBinding);
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
ViewBinding.getInstance=function(_cfd){
var _cfe=ViewBinding._instances.get(_cfd);
if(!_cfe){
var cry="ViewBinding.getInstance: No such instance: "+_cfd;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _cfe;
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
var _d01=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d01){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d02=snap.boxObject.getGlobalPosition();
var _d03=snap.boxObject.getDimension();
if(!Point.isEqual(_d02,this._lastknownposition)){
this.setPosition(_d02);
this._lastknownposition=_d02;
}
if(!Dimension.isEqual(_d03,this._lastknowndimension)){
this.setDimension(_d03);
this._lastknowndimension=_d03;
var _d04=_d03.h-ViewBinding.VERTICAL_ADJUST;
_d04=_d04<0?0:_d04;
this.windowBinding.getBindingElement().style.height=new String(_d04)+"px";
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
var _d05=this._viewDefinition.flowHandle;
if(_d05!=null){
FlowControllerService.CancelFlow(_d05);
}
}
if(this._viewDefinition!=null){
var _d06=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d06);
this.logger.fine("ViewBinding closed: \""+_d06+"\"");
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
var _d08=null;
if(this._viewDefinition!=null){
_d08=this._viewDefinition.handle;
}
return _d08;
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
ViewBinding.prototype.setDefinition=function(_d09){
this._viewDefinition=_d09;
if(_d09.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d0a){
ViewBinding.superclass.handleAction.call(this,_d0a);
var _d0b=_d0a.target;
switch(_d0a.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d0a.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d0b.isActivated){
_d0b.onActivate();
}
}
_d0a.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d0b==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d0a.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d0b==this._snapBinding){
if(_d0b.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d0b.getContentWindow().isPostBackDocument){
if(_d0a.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d0b.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d0b==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d0b.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d0a.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d0a.type==WindowBinding.ACTION_ONLOAD){
var win=_d0b.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d0b);
}
}
}
_d0a.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d0b.label&&this._viewDefinition.label){
_d0b.label=this._viewDefinition.label;
}
if(!_d0b.image&&this._viewDefinition.image){
_d0b.image=this._viewDefinition.image;
}
if(_d0b.bindingWindow==this.getContentWindow()){
this._pageBinding=_d0b;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d0b.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d0b==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d0a.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d0a.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d10,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d10,arg);
switch(_d10){
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
var _d14=def.argument;
if(_d14!=null){
page.setPageArgument(_d14);
}
var _d15=def.width;
if(_d15!=null){
page.width=_d15;
}
var _d16=def.height;
if(_d16!=null){
page.height=_d16;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d17){
ViewBinding.superclass.handleCrawler.call(this,_d17);
switch(_d17.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d17.id==FocusCrawler.ID){
if(_d17.previousNode!=this._snapBinding.bindingElement){
_d17.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d17.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d18){
_d18.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d18.x+"px";
this.bindingElement.style.top=_d18.y+"px";
};
ViewBinding.prototype.setDimension=function(_d19){
_d19.h-=ViewBinding.VERTICAL_ADJUST;
_d19.w-=ViewBinding.HORIZONTAL_ADJUST;
_d19.w-=1;
if(_d19.h<0){
_d19.h=0;
}
if(_d19.w<0){
_d19.w=0;
}
this.bindingElement.style.width=String(_d19.w)+"px";
this.bindingElement.style.height=String(_d19.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d1a){
this.isFlexBoxBehavior=false;
_d1a.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d1a.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d1a.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d1a;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d1b=null;
if(this.isFreeFloating==true){
_d1b=this._snapBinding.getBindingElement();
}else{
_d1b=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d1b;
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
ViewBinding.prototype.reload=function(_d1c){
this._isLoaded=false;
this.windowBinding.reload(_d1c);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d1d=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d1d=true;
}
}
if(!_d1d){
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
ViewBinding.newInstance=function(_d21){
var _d22=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d21);
var _d23=UserInterface.registerBinding(_d22,ViewBinding);
_d23.windowBinding=_d23.add(WindowBinding.newInstance(_d21));
_d23.windowBinding.isFlexible=false;
return _d23;
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
var _d2b=this.bindingWindow.__doPostBack;
var _d2c=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d2c){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d2d,_d2e){
if(!form.__isSetup){
Application.lock(self);
_d2c=true;
}
self.manifestAllDataBindings();
_d2b(_d2d,_d2e);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d2f,list){
var _d31=this.bindingWindow.bindingMap.__REQUEST;
if(_d31!=null&&this._isDotNet()){
switch(_d2f){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d31.postback(_d2f);
}
}
break;
default:
_d31.postback(_d2f);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d2f,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d32,list){
var _d34=this.getDescendantBindingsByType(WindowBinding);
_d34.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d32,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d38){
if(_d38.name==null||_d38.name==""){
return;
}
list.add({name:_d38.name,value:_d38.value});
});
var out="";
list.each(function(_d3a){
out+=_d3a.name+": "+_d3a.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d3b){
PageBinding.superclass.handleAction.call(this,_d3b);
var _d3c=_d3b.target;
switch(_d3b.type){
case RootBinding.ACTION_PHASE_3:
if(_d3c==UserInterface.getBinding(this.bindingDocument.body)){
_d3c.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d3c);
}
_d3b.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d3d=this.validateAllDataBindings();
if(_d3d){
this.doPostBack(_d3c);
}
}
_d3b.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d3b.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d3c.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d3c.key)){
this._initBlockers.del(_d3c.key);
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
var _d3f={handleAction:function(_d40){
if(_d40.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d3f);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d3f);
}else{
MessageQueue.udpdate();
}
_d3b.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d41,arg){
PageBinding.superclass.handleBroadcast.call(this,_d41,arg);
switch(_d41){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d43=arg;
if(!this._canPostBack&&!_d43){
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
PageBinding.prototype.doPostBack=function(_d45){
if(this._canPostBack){
if(_d45!=null&&this._isDotNet()){
var _d46=_d45.getCallBackID();
var _d47=_d45.getCallBackArg();
if(_d46!=null){
_d46=_d46.replace(/_/g,"$");
}else{
_d46="";
}
if(_d47==null){
_d47="";
}
this.bindingWindow.__doPostBack(_d46,_d47);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(_d48){
var _d49=true;
var _d4a=this.bindingWindow.DataManager.getAllDataBindings();
while(_d4a.hasNext()&&_d49){
var _d4b=_d4a.getNext();
if(_d4b.isAttached){
var _d4c=_d4b.validate();
if(_d49&&!_d4c){
_d49=false;
this.logger.debug("Invalid DataBinding: "+_d4b.toString()+" ("+_d4b.getName()+")");
if(_d48){
var _d4d=_d4b.getAncestorBindingByType(TabPanelBinding);
if(_d4d!=null&&!_d4d.isVisible){
var _d4e=_d4d.getAncestorBindingByType(TabBoxBinding);
var _d4f=_d4e.getTabBinding(_d4d);
_d4e.select(_d4f);
}
}
break;
}
}
}
return _d49;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d51=this.bindingWindow.DataManager.getAllDataBindings();
while(_d51.hasNext()){
var _d52=_d51.getNext();
if(_d52.isAttached){
var _d53=_d52.manifest();
if(_d53!=null){
list.add(_d53);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d54=this.bindingWindow.DataManager.getAllDataBindings();
while(_d54.hasNext()){
var _d55=_d54.getNext();
if(_d55.isAttached){
_d55.clean();
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
var _d58=this._cachedFocus.getBinding();
if(_d58){
_d58.blur();
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
var _d59=this.getProperty("width");
if(!_d59){
_d59=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d59;
}
if(this.height==null){
var _d5a=this.getProperty("height");
this.height=_d5a?_d5a:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d5b=this.getProperty("minheight");
if(_d5b!=null){
this.minheight=_d5b;
}
}
if(this.controls==null){
var _d5c=this.getProperty("controls");
this.controls=_d5c?_d5c:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d5d=this.getProperty("resizable");
this.isResizable=_d5d?_d5d:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d5e){
if(_d5e!=this.isAutoHeightLayoutMode){
if(_d5e){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d5e;
}
};
DialogPageBinding.prototype.handleAction=function(_d5f){
DialogPageBinding.superclass.handleAction.call(this,_d5f);
var _d60=_d5f.target;
switch(_d5f.type){
case PageBinding.ACTION_ATTACHED:
if(_d60!=this&&_d60.isFitAsDialogSubPage){
_d60.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d5f.consume();
if(_d60.response!=null){
this.response=_d60.response;
switch(_d60.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d61){
var _d62=this.bindingWindow.bindingMap.buttonAccept;
if(_d62!=null){
_d62.setDisabled(_d61);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d63){
var _d64=CSSComputer.getPadding(this.bindingElement);
var _d65=CSSComputer.getBorder(this.bindingElement);
_d63+=_d64.top+_d64.bottom;
_d63+=_d65.top+_d65.bottom;
if(_d63>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d63+"px";
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
EditorPageBinding.prototype.handleAction=function(_d6d){
EditorPageBinding.superclass.handleAction.call(this,_d6d);
var _d6e=_d6d.target;
switch(_d6d.type){
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
var _d6f=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d6e.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d6f==-1){
_d6f=0;
}
}else{
_d6f++;
}
return res;
});
if(_d6f>-1){
this._messengers.del(_d6f);
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
_d6d.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d6e.key,_d6e);
if(_d6e instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d6e.key);
if(_d6e instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d6e==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d6e.getSelectedTabBinding();
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
_d6d.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d6e==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d6d.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d6e==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d6d.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d6e==this._windowBinding){
if(_d6e.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d74=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d74);
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
var _d75=this.bindingWindow.bindingMap.savebutton;
if(_d75!=null&&!_d75.isDisabled){
_d75.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d76=this.bindingWindow.bindingMap.__REQUEST;
if(_d76!=null){
_d76.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d77=this.bindingWindow.bindingMap.__REQUEST;
if(_d77!=null){
_d77.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d78){
this._message=null;
switch(_d78){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d78,this._messengers);
if(!this._messengers.hasEntries()){
if(_d78==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
}else{
this._message=_d78;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d78;
EditorPageBinding.superclass.postMessage.call(this,_d78,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d78,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d79,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d79,arg);
switch(_d79){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d7b=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d7b);
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
var _d7c=new List();
this._invalidBindings.each(function(key,_d7e){
var list=_d7e.getInvalidLabels();
if(list){
list.each(function(_d80){
_d7c.add(_d80);
});
}
});
if(_d7c.hasEntries()){
var _d81="";
while(_d7c.hasNext()){
_d81+=_d7c.getNext().toLowerCase();
if(_d7c.hasNext()){
_d81+=", ";
}else{
_d81+=".";
}
}
var _d82=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d82+" "+_d81);
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
EditorPageBinding.prototype.enableSave=function(_d83){
var _d84=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d84){
var _d85=UserInterface.getBinding(_d84);
if(_d83){
_d85.enable();
}else{
_d85.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d86=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d86!=null){
UserInterface.getBinding(_d86).enable();
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
var _d87=this._windowBinding.getContentDocument().title;
if(_d87==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d88=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d8a){
if(_d8a.name=="__EVENTTARGET"&&_d88){
_d8a.value=_d88;
}
list.add({name:_d8a.name,value:_d8a.value});
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
WizardPageBinding.prototype.handleAction=function(_d8c){
WizardPageBinding.superclass.handleAction.call(this,_d8c);
var _d8d=_d8c.target;
switch(_d8c.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d8d);
}else{
_d8c.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d8d);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d8c.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d8c.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d8e){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d90=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d8e);
}
if(_d90){
_d90.setDisabled(!_d8e);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d91,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d91,arg);
var self=this;
switch(_d91){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d95){
};
MarkupAwarePageBinding.prototype._activate=function(_d96){
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
var _d97=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d97.boxObject.getDimension().w;
_d97.hide();
var _d98=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d98+"px";
var self=this;
var _d9a=this.bindingWindow.bindingMap.moreactionsbutton;
_d9a.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d9b){
self._showMoreActions();
_d9b.consume();
}});
var _d9c=this.bindingWindow.bindingMap.moreactionspopup;
_d9c.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d9d){
var item=_d9d.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d9f,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d9f,arg);
switch(_d9f){
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
var _da3=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_da3!=null){
_da3.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _da4=this.bindingWindow.WindowManager;
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
var _da5=new String("");
this._actionProfile.each(function(_da6,list){
list.each(function(_da8){
_da5+=_da8.getHandle()+";"+_da8.getKey()+";";
if(_da8.isDisabled()){
_da5+="isDisabled='true';";
}
});
});
return _da5;
};
SystemToolBarBinding.prototype.handleAction=function(_da9){
SystemToolBarBinding.superclass.handleAction.call(this,_da9);
switch(_da9.type){
case ButtonBinding.ACTION_COMMAND:
var _daa=_da9.target;
this._handleSystemAction(_daa.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_dab){
if(_dab!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dad=list.getFirst();
var _dae=_dad.node;
}
SystemAction.invoke(_dab,_dae);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_db1,list){
var _db3=new List();
list.reset();
while(list.hasNext()){
var _db4=list.getNext();
var _db5=null;
if(_db4.isInToolBar()){
if(_db4.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_db5=self.getToolBarButtonBinding(_db4);
}
}
if(_db5!=null){
_db3.add(_db5);
}
}
if(_db3.hasEntries()){
var _db6=ToolBarGroupBinding.newInstance(doc);
_db3.each(function(_db7){
_db6.add(_db7);
});
self.addLeft(_db6);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _db8=this.bindingWindow.bindingMap.toolsbutton;
var _db9=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _dba=_db8.bindingElement.offsetLeft-this._moreActionsWidth;
var _dbb=0;
var _dbc=new List();
var _dbd,_dbe=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_dbd=_dbe.getNext())!=null){
if(!_dbd.isVisible){
_dbd.show();
}
_dbb+=_dbd.boxObject.getDimension().w;
if(_dbb>=_dba){
_dbc.add(_dbd);
_dbd.hide();
}
}
if(_dbc.hasEntries()){
var _dbf=_dbc.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_dbf).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_dbd=_dbc.getNext())!=null){
this._moreActions.add(_dbd.associatedSystemAction);
}
_db9.show();
}else{
this._moreActions=null;
_db9.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _dc0=this.bindingWindow.bindingMap.moreactionspopup;
_dc0.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_dc0.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_dc0.add(item);
}
_dc0.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_dc2){
var _dc3=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _dc4=_dc2.getLabel();
var _dc5=_dc2.getToolTip();
var _dc6=_dc2.getImage();
var _dc7=_dc2.isDisabled();
if(_dc6&&_dc6.indexOf("size=")==-1){
_dc6=_dc6+"&size="+this.getImageSize();
_dc3.imageProfile=new ImageProfile({image:_dc6});
}
if(_dc4){
_dc3.setLabel(_dc4);
}
if(_dc5){
_dc3.setToolTip(_dc5);
}
if(_dc2.isDisabled()){
_dc3.disable();
}
_dc3.associatedSystemAction=_dc2;
return _dc3;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _dc8=this.getDescendantBindingByLocalName("toolbarbutton");
if(_dc8!=null){
_dc8.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dc9){
var _dca=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dc9);
return UserInterface.registerBinding(_dca,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dcb){
var _dcc=SystemTreeBinding.superclass.add.call(this,_dcb);
if(!this._defaultTreeNode){
if(_dcb instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dcb;
}
}
return _dcc;
};
SystemTreeBinding.prototype.handleAction=function(_dcd){
SystemTreeBinding.superclass.handleAction.call(this,_dcd);
var _dce=_dcd.target;
switch(_dcd.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_dce.key);
this._updateFocusedNode();
_dcd.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_dcd.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_dce.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_dcd.consume();
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
var _dd0=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_dd0);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_dd1){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_dd1);
var reg=this._entityTokenRegistry;
var _dd3=_dd1.node.getEntityToken();
if(reg.has(_dd3)){
reg.get(_dd3).add(_dd1);
}else{
reg.set(_dd3,new List([_dd1]));
}
var _dd4=null;
if(this.isLockedToEditor){
if(_dd3==StageBinding.entityToken){
if(_dd1.node.isTreeLockEnabled()){
_dd4=_dd1;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_dd1.node.getHandle()){
_dd4=_dd1;
}
}
}
if(_dd4!=null){
this.focusSingleTreeNodeBinding(_dd4);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_dd5){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_dd5);
var reg=this._entityTokenRegistry;
var _dd7=_dd5.node.getEntityToken();
if(reg.has(_dd7)){
var list=reg.get(_dd7);
list.del(_dd5);
if(!list.hasEntries()){
reg.del(_dd7);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_dd5.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_dd5.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _ddb=this._refreshingTreeNodes;
if(_ddb.hasEntries()&&_ddb.has(key)){
_ddb.del(key);
if(!_ddb.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()&&this._activePosition!=SystemAction.activePositions.SelectorTree){
var _ddc=StageBinding.entityToken;
if(_ddc!=null){
this._focusTreeNodeByEntityToken(_ddc);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _ddd=false;
var _dde=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_ddd=false;
}else{
if(_dde.hasEntries()){
_ddd=true;
while(_ddd&&_dde.hasNext()){
var _ddf=_dde.getNext();
if(!_ddf.isDraggable){
_ddd=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_ddd;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_de0,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_de0,arg);
switch(_de0){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_de0,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_de0);
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
var self=this,_de4=arg;
setTimeout(function(){
if(_de4!=null){
self._focusTreeNodeByEntityToken(_de4);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _de6=tab.perspectiveNode==null;
if(!_de6){
_de6=tab.perspectiveNode==this.perspectiveNode;
}
if(_de6){
var self=this,_de8=tab.getEntityToken();
setTimeout(function(){
if(_de8==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_de8);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_de9,_dea){
this.isLockFeatureFocus=true;
var _deb=null;
if(this._entityTokenRegistry.has(_de9)){
var list=this._entityTokenRegistry.get(_de9);
list.each(function(tn){
var _dee=true;
if(tn.node.isTreeLockEnabled()){
_deb=tn;
_dee=false;
}
return _dee;
});
if(_deb!=null){
if(!_deb.isFocused){
this.focusSingleTreeNodeBinding(_deb,true);
}else{
_deb.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_deb==null&&_dea!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_de9);
self._focusTreeNodeByEntityToken(_de9,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_df0){
var _df1=new List();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _df2=this.getRootTreeNodeBindings();
while(_df2.hasNext()){
var _df3=_df2.getNext();
_df1.add(_df3.node.getEntityToken());
}
}else{
_df1.add(StageBinding.perspectiveNode.getEntityToken());
}
while(_df1.hasNext()){
var _df4=_df1.getNext();
var _df5=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_df4,_df0,_df5);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _df8=this._treeNodeBindings;
var _df9=new Map();
function fix(_dfa,list){
if(!_dfa.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_df8.has(node.getHandle())){
var _dfd=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_df9.set(node.getHandle(),_dfd);
_dfa.add(_dfd);
}
});
_dfa.attachRecursive();
}
}
_dfa.open(true);
}
map.each(function(_dfe,list){
if(_df8.has(_dfe)){
var _e00=_df8.get(_dfe);
fix(_e00,list);
}else{
if(_df9.has(_dfe)){
var _e01=_df9.get(_dfe);
fix(_e01,list);
}else{
}
}
});
}
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_e02,arg){
switch(_e02){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e04=arg;
if(_e04!=null){
this._invokeServerRefresh(_e04);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e05=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e05;
_e05.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e05=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e05;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e06){
if(_e06!=null&&_e06=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e06)){
var list=this._entityTokenRegistry.get(_e06).reset();
this._refreshToken=_e06;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e08=list.getNext();
this._refreshingTreeNodes.set(_e08.key,true);
setTimeout(function(){
_e08.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e09=this.getFocusedTreeNodeBindings().getFirst();
if(_e09){
var _e0a=_e09.getLabel();
var _e0b=_e09.getAncestorBindingByLocalName("treenode");
if(_e0b){
_e09=_e0b;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e09.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e0c=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e0c,[_e0a]);
}
_e09.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e0d=SystemTreeBinding.clipboard;
if(_e0d){
var type=_e0d.dragType;
var _e0f=this.getFocusedTreeNodeBindings().getFirst();
if(_e0f.dragAccept){
if(_e0f.acceptor.isAccepting(type)){
this._performPaste(_e0f);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e10){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e10.node.hasDetailedDropSupport()){
if(_e10.node.hasChildren()){
var _e12=_e10.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e13,_e14){
if(_e13==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e15=_e14.get("switch");
var _e16=_e14.get("sibling");
if(_e15=="after"){
_e16++;
}
var _e17=_e10.accept(SystemTreeBinding.clipboard,_e16);
if(_e17){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e12);
}else{
Application.lock(self);
var _e18=_e10.accept(SystemTreeBinding.clipboard,0);
if(_e18){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e18=_e10.accept(SystemTreeBinding.clipboard,0);
if(_e18){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
}
update();
}
};
SystemTreeBinding.prototype.selectDefault=function(){
var _e19=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e19!=null){
this._focusTreeNodeByEntityToken(_e19);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e1a){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e1a){
this.blurSelectedTreeNodes();
var _e1b=this.getRootTreeNodeBindings();
_e1b.each(function(_e1c){
if(_e1c.isContainer&&_e1c.isOpen){
_e1c.close();
_e1c.hasBeenOpened=false;
_e1c.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e1d){
if(_e1d!=this.isLockedToEditor){
this.isLockedToEditor=_e1d;
if(_e1d){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e1f=this.getRootTreeNodeBindings();
_e1f.each(function(_e20){
var _e21=_e20.getOpenSystemNodes();
if(_e21!=null&&_e21.hasEntries()){
list.merge(_e21);
}else{
if(_e20.isOpen){
list.add(_e20.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e22){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e22);
if(_e22!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e24=new Map();
var _e25=this.getFocusedTreeNodeBindings();
var _e26=_e25.getFirst().node.getActionProfile();
var self=this;
_e26.each(function(_e28,list){
var _e2a=new List();
list.each(function(_e2b){
if(_e2b.getActivePositions()&self._activePosition){
_e2a.add(_e2b);
}
});
if(_e2a.hasEntries()){
_e24.set(_e28,_e2a);
}
});
_e24.activePosition=this._activePosition;
return _e24;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e2c,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e2c,arg);
switch(_e2c){
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
var _e31=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e31.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e32=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e32.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e33){
SystemTreePopupBinding.superclass.handleAction.call(this,_e33);
switch(_e33.type){
case MenuItemBinding.ACTION_COMMAND:
var _e34=_e33.target;
var _e35=_e34.associatedSystemAction;
if(_e35){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e37=list.getFirst();
var _e38=_e37.node;
}
SystemAction.invoke(_e35,_e38);
}else{
var cmd=_e34.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e3b=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e3b=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e3b=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e3b=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e3b=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e3b){
setTimeout(function(){
EventBroadcaster.broadcast(_e3b);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e3c=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e3c.hasNext()){
var _e3d=UserInterface.getBinding(_e3c.getNext());
if(!_e3d.getProperty("rel")){
_e3d.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e3f=new List();
var self=this;
this._actionProfile.each(function(_e41,list){
var _e43=MenuGroupBinding.newInstance(doc);
list.each(function(_e44){
var _e45=self.getMenuItemBinding(_e44);
_e43.add(_e45);
});
_e3f.add(_e43);
});
_e3f.reverse();
while(_e3f.hasNext()){
this._bodyBinding.addFirst(_e3f.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e46){
var _e47=MenuItemBinding.newInstance(this.bindingDocument);
var _e48=_e46.getLabel();
var _e49=_e46.getToolTip();
var _e4a=_e46.getImage();
var _e4b=_e46.getDisabledImage();
var _e4c=_e46.isCheckBox();
if(_e48){
_e47.setLabel(_e48);
}
if(_e49){
_e47.setToolTip(_e49);
}
if(_e4a){
_e47.imageProfile=new ImageProfile({image:_e4a,imageDisabled:_e4b});
}
if(_e4c){
_e47.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e46.isChecked()){
_e47.check(true);
}
}
if(_e46.isDisabled()){
_e47.disable();
}
_e47.associatedSystemAction=_e46;
return _e47;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e50=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e50=UserInterface.getBinding(node);
if(_e50.isDisabled){
_e50=null;
}
}
break;
}
if(_e50!=null&&_e50.node!=null&&_e50.node.getActionProfile()!=null){
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
var _e51=this.node.getLabel();
if(_e51){
this.setLabel(_e51);
}
var _e52=this.node.getToolTip();
if(_e52){
this.setToolTip(_e52);
}
var _e53=this.node.getHandle();
if(_e53){
this.setHandle(_e53);
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
var _e56="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e56+=list.getNext();
if(list.hasNext()){
_e56+=" ";
}
}
this.setProperty("dragaccept",_e56);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e58){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e58);
switch(_e58.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e58.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e58.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e59,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e59,arg);
switch(_e59){
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
var _e5c=null;
var _e5d=this.node.getImageProfile();
if(_e5d){
if(this.isOpen){
_e5c=_e5d.getActiveImage();
}else{
_e5c=_e5d.getDefaultImage();
}
}
if(!_e5c){
_e5c=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e5c;
};
SystemTreeNodeBinding.prototype.open=function(_e5e){
var _e5f=this.isContainer&&!this.isOpen;
var _e60=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e5f&&(_e60||SystemTreeBinding.HAS_NO_MEMORY)&&_e5e!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e61=null;
if(this.isContainer){
_e61=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e61);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e63){
if(_e63!=null){
this._refreshBranch(_e63);
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
var _e64=new List();
var _e65=this.node.getChildren();
this.empty();
if(_e65.hasEntries()){
this._insertTreeNodesRegulated(_e65);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e66){
var _e67=0;
var _e68=new List([]);
while(_e66.hasEntries()&&_e67<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e69=SystemTreeNodeBinding.newInstance(_e66.extractFirst(),this.bindingDocument);
_e69.autoExpand=this.autoExpand;
this.add(_e69);
_e69.attach();
_e67++;
if(this.autoExpand){
if(_e67==1&&!_e66.hasEntries()||LastOpenedSystemNodes.isOpen(_e69)){
_e68.add(_e69);
}
}
}
if(_e66.hasEntries()){
this._insertBufferTreeNode(_e66);
}
_e68.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e6c){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e6e=this.node.getDescendantBranch(list);
if(_e6e.hasEntries()){
this.XXX(_e6e);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e6f){
var self=this;
var map=new Map();
this.empty();
_e6f.each(function(key,_e73){
if(_e73.hasEntries()){
_e73.each(function(node){
var _e75=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e75);
if(map.has(key)){
var _e76=map.get(key);
_e76.add(_e75);
_e76.isOpen=true;
_e76.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e75);
}else{
}
}
});
}
});
this.attachRecursive();
_e6f.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e77=new TreeCrawler();
var _e78=new List();
_e77.mode=TreeCrawler.MODE_GETOPEN;
_e77.crawl(this.bindingElement,_e78);
if(_e78.hasEntries()){
_e78.extractFirst();
}
_e77.dispose();
return _e78;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e79=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e79=new List([this.node]);
list.each(function(_e7b){
_e79.add(_e7b.node);
});
}
return _e79;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e7c,_e7d){
var _e7e=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e7c instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e7c.node.getData(),this.node.getData(),_e7d?_e7d:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e7e);
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
SystemTreeNodeBinding.newInstance=function(node,_e82){
var _e83=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e82);
var _e84=UserInterface.registerBinding(_e83,SystemTreeNodeBinding);
_e84.node=node;
return _e84;
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
SystemPageBinding.prototype.setPageArgument=function(_e85){
this.node=_e85;
SystemPageBinding.superclass.setPageArgument.call(this,_e85);
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
var _e86=this.node.getChildren();
if(_e86.hasEntries()){
while(_e86.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e86.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e88=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e88.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e8a=new TreeCrawler();
var _e8b=new List();
_e8a.mode=TreeCrawler.MODE_GETOPEN;
_e8a.crawl(this.bindingElement,_e8b);
_e8a.dispose();
var list=new List([this.node]);
_e8b.each(function(_e8d){
list.add(_e8d.node);
});
this._tree.empty();
var _e8e=this.node.getDescendantBranch(list);
if(_e8e.hasEntries()){
var self=this;
var map=new Map();
_e8e.each(function(key,_e92){
_e92.each(function(node){
var _e94=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e94);
if(map.has(key)){
var _e95=map.get(key);
_e95.add(_e94);
_e95.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e94);
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
SystemPageBinding.prototype.handleAction=function(_e96){
SystemPageBinding.superclass.handleAction.call(this,_e96);
switch(_e96.type){
case ButtonBinding.ACTION_COMMAND:
var _e97=_e96.target;
switch(_e97.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e97.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e98,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e98,arg);
switch(_e98){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e9a=arg;
if(this.node&&this.node.getEntityToken()==_e9a){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e9a);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e9a);
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
StageContainerBinding.prototype.handleBroadcast=function(_e9c,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e9c,arg);
var _e9e=this.bindingWindow.WindowManager;
switch(_e9c){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e9e.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e9e.WINDOW_RESIZED_BROADCAST:
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
var _ea0=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_ea0.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_ea1){
if(StageBinding.isViewOpen(_ea1)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_ea1);
}else{
var _ea2=ViewDefinitions[_ea1];
StageBinding.presentViewDefinition(_ea2);
}
};
StageBinding.isViewOpen=function(_ea3){
return StageBinding.bindingInstance._activeViewDefinitions[_ea3]!=null;
};
StageBinding.presentViewDefinition=function(_ea4){
if(_ea4.label!=null){
var _ea5=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ea5,[_ea4.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_ea4);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ea7,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ea9=System.getPerspectiveNodes();
if(_ea9.hasEntries()){
this._initializeSystemViewDefinitions(_ea9);
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
var _eab=null;
if(LocalStore.isEnabled){
_eab=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_eab&&ViewDefinitions[_eab]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_eab));
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
var _ead=root.getActionProfile();
if(_ead&&_ead.hasEntries()){
var _eae=top.app.bindingMap.toolsmenugroup;
if(_eae){
_ead.each(function(_eaf,list){
list.each(function(_eb1){
var item=MenuItemBinding.newInstance(_eae.bindingDocument);
item.setLabel(_eb1.getLabel());
item.setToolTip(_eb1.getToolTip());
item.setImage(_eb1.getImage());
item.setDisabled(_eb1.isDisabled());
item.associatedSystemAction=_eb1;
var _eb3=_eae;
var tag=_eb1.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_eb3=top.app.bindingMap.translationsmenugroup;
break;
}
}
_eb3.add(item);
});
});
_eae.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_eb5){
while(_eb5.hasNext()){
var node=_eb5.getNext();
var _eb7=node.getHandle();
ViewDefinitions[_eb7]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_eb8){
StageBinding.superclass.handleAction.call(this,_eb8);
var _eb9=_eb8.target;
switch(_eb8.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_eb9;
this._inflateBinding(_eb9);
_eb8.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_eb9;
this._inflateBinding(_eb9);
_eb8.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_eb9);
_eb8.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_eb9 instanceof DockBinding){
switch(_eb9.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_eb9.reference,_eb9);
break;
}
this.handleAttachedDock(_eb9);
_eb8.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_eb9 instanceof DockBinding){
this.handleSelectedDockTab(_eb9.getSelectedTabBinding());
_eb8.consume();
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
_eb8.consume();
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
_eb8.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_eb8);
};
StageBinding.prototype.handleBroadcast=function(_ebb,arg){
StageBinding.superclass.handleBroadcast.call(this,_ebb,arg);
switch(_ebb){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ebd=arg;
this._dontView(_ebd);
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
StageBinding.prototype._showStart=function(_ebf){
if(_ebf!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ec2=this.bindingWindow.bindingMap.maindecks;
if(_ebf){
_ec2.select("startdeck");
view.show();
}else{
view.hide();
_ec2.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_ebf;
}
};
StageBinding.prototype._inflateBinding=function(_ec3){
for(var _ec4 in ViewDefinitions){
var _ec5=ViewDefinitions[_ec4];
if(_ec5 instanceof SystemViewDefinition){
_ec3.mountDefinition(_ec5);
}
}
var _ec6=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ec6){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ec9=new StageCrawler();
_ec9.mode=mode;
_ec9.crawl(this.bindingElement);
_ec9.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_eca){
var _ecb=_eca.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ecb);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ecb));
}
};
StageBinding.prototype.handleAttachedDock=function(_ecc){
var _ecd=_ecc.getTabBindings();
if(_ecd.hasEntries()){
while(_ecd.hasNext()){
var _ece=_ecd.getNext();
var _ecf=_ece.getHandle();
if(_ecf){
if(_ecf=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ed0=ViewDefinitions[_ecf];
if(_ed0){
this._view(_ecc,_ece,_ed0,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ecf+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ed1){
var _ed2=null;
var _ed3=false;
switch(_ed1.position){
case Dialog.MODAL:
_ed2=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ed2=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ed1.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ed2=this._dockBindings.get(_ed1.position);
break;
case DockBinding.EXTERNAL:
window.open(_ed1.url);
_ed3=true;
break;
default:
var _ed4=this._decksBinding.getSelectedDeckBinding();
_ed2=_ed4.getDockBindingByReference(_ed1.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ed5=this.bindingWindow.bindingMap.maindecks;
_ed5.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ed3=true;
}
break;
}
if(!_ed3){
if(_ed2!=null){
this._view(_ed2,null,_ed1,true);
}else{
throw "StageBinding: Could not position view: "+_ed1.handle;
}
}
};
StageBinding.prototype._view=function(_ed6,_ed7,_ed8,_ed9){
var _eda=_ed8.handle;
if(_ed8.isMutable){
_eda+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_eda]){
var _edb=ViewBinding.getInstance(_eda);
if(_edb!=null){
_edb.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_eda);
}
}else{
this._activeViewDefinitions[_eda]=_ed8;
Application.lock(this);
switch(_ed6.constructor){
case DockBinding:
if(_ed9){
_ed6.prepareNewView(_ed8);
}else{
_ed6.prepareOpenView(_ed8,_ed7);
}
break;
case StageDialogBinding:
if(_ed9){
_ed6.prepareNewView(_ed8);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_edc){
if(this._activeViewDefinitions[_edc]!=null){
delete this._activeViewDefinitions[_edc];
}else{
this.logger.debug("Could not unregister active view: "+_edc);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_edd){
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
this.addFilter(function(_edf){
var _ee0=UserInterface.getBinding(_edf);
var _ee1=null;
if(_ee0){
switch(_ee0.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_ee0.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_ee0.handleUnMaximization();
break;
}
break;
case DockBinding:
_ee1=NodeCrawler.SKIP_NODE;
break;
}
}
return _ee1;
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
var _ee2=null;
this._dialogs.each(function(_ee3){
if(!_ee3.isVisible){
_ee2=_ee3;
}
return _ee2!=null;
});
if(!_ee2){
this._newInstance();
_ee2=this._dialogs.getLast();
}
_ee2.setModal(false);
return _ee2;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _ee4=this.getInstance();
_ee4.setModal(true);
return _ee4;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _ee5=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_ee5);
_ee5.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ee6){
if(_ee6 instanceof DialogViewDefinition){
var _ee7=ViewBinding.newInstance(this.bindingDocument);
_ee7.setDefinition(_ee6);
_ee7.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ee6.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ee6.handler)){
this._dialogResponseHandler=_ee6.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ee7;
this._body.add(_ee7);
_ee7.attach();
_ee7.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ee8){
StageDialogBinding.superclass.handleAction.call(this,_ee8);
var _ee9=_ee8.target;
switch(_ee8.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ee9);
_ee8.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ee9.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ee8.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ee9.response){
this._handleDialogPageResponse(_ee9);
}
_ee8.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ee8.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ee8.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ee9.dispose();
_ee8.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ee8.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ee8.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ee8.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ee8.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ee8.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ee9==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_eea,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_eea,arg);
switch(_eea){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_eec){
var _eed=new FitnessCrawler();
var list=new List();
if(_eec){
_eed.mode=FitnessCrawler.MODE_BRUTAL;
}
_eed.crawl(this.bindingElement,list);
_eed.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_eef){
_eef.fit(_eec);
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
var _ef0=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_ef0){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_ef2){
var cmd=_ef2.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_ef4){
if(_ef4.bindingDocument==this._viewBinding.getContentDocument()){
if(_ef4 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_ef4);
}
this._pageBinding=_ef4;
if(_ef4.height=="auto"){
_ef4.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_ef4);
_ef4.enableAutoHeightLayoutMode(false);
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
if(_ef4.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_ef4);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_ef5){
var _ef6=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_ef6){
var _ef7=UserInterface.getBinding(_ef6);
_ef7.setDisabled(_ef5);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_ef8){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_ef8.response,_ef8.result!=null?_ef8.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_efa){
if(_efa.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_efa);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_efc){
switch(_efc.type){
case MenuItemBinding.ACTION_COMMAND:
if(_efc.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_efc.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_efd){
var _efe=_efd.label;
var _eff=_efd.image;
var _f00=_efd.width;
var _f01=_efd.height;
var _f02=_efd.controls;
var _f03=_efd.isResizable;
if(_efe){
this.setLabel(_efe);
}
if(_eff){
this.setImage(_eff);
}
if(_f00||_f01){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f00?_f00:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f01!=null&&_f01!="auto")?_f01:old.h;
this.setDimension(nev);
}
if(_f02){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f07=new List(_f02.split(" "));
while((type=_f07.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f03!=this._isResizable){
this.setResizable(_f03);
}
if(_f01=="auto"){
this._fixAutoHeight(_efd);
}
if(_efd==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f08){
var dim=this.getDimension();
var _f0a=0;
var _f0b=0;
if(_f08.isDialogSubPage){
_f08=this._pageBinding;
}
if(this._isFirstPage){
_f0a=_f08.width!=null?_f08.width:dim.w;
}else{
_f0a=dim.w;
}
_f0b=_f08.bindingElement.offsetHeight;
_f0b+=this._titlebar.bindingElement.offsetHeight;
_f0b+=4;
if(_f0b<dim.h){
_f0b=dim.h;
}
if(_f08.minheight!=null){
if(_f0b<_f08.minheight){
_f0b=_f08.minheight;
}
}
this.setDimension(new Dimension(_f0a,_f0b));
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
StageDialogBinding.newInstance=function(_f0e){
var _f0f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f0e);
var _f10=UserInterface.registerBinding(_f0f,StageDialogBinding);
_f10.setProperty("controls","minimize maximize close");
return _f10;
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
this.addFilter(function(_f11,list){
var _f13=null;
var _f14=UserInterface.getBinding(_f11);
if(!_f14.isVisible){
_f13=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f13;
});
this.addFilter(function(_f15,list){
var _f17=null;
var _f18=UserInterface.getBinding(_f15);
if(_f18.isAttached){
if(Interfaces.isImplemented(IFit,_f18)){
if(!_f18.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f18);
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
StageDecksBinding.prototype.mountDefinition=function(_f19){
var _f1a=StageDeckBinding.newInstance(this.bindingDocument);
_f1a.handle=_f19.handle;
_f1a.perspectiveNode=_f19.node;
this._decks[_f1a.handle]=_f1a;
this.add(_f1a);
_f1a.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f1b){
var _f1c=this._decks[_f1b];
StageBinding.perspectiveNode=_f1c.perspectiveNode;
this.select(_f1c);
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
StageDeckBinding.prototype.handleAction=function(_f1d){
StageDeckBinding.superclass.handleAction.call(this,_f1d);
var _f1e=_f1d.target;
switch(_f1d.type){
case WindowBinding.ACTION_LOADED:
if(_f1e==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f1d.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f1e instanceof DockBinding){
this._dockBindings.set(_f1e.reference,_f1e);
_f1e.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f1d.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f1d.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f1d);
StageDeckBinding.superclass.handleAction.call(this,_f1d);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f20=new StageCrawler();
_f20.mode=mode;
_f20.crawl(this.windowBinding.getContentDocument().body);
_f20.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f21){
return this._dockBindings.get(_f21);
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
StageDeckBinding.newInstance=function(_f23){
var _f24=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f23);
var _f25=UserInterface.registerBinding(_f24,StageDeckBinding);
return _f25;
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
StageSplitBoxBinding.prototype.handleAction=function(_f26){
StageSplitBoxBinding.superclass.handleAction.call(this,_f26);
StageBoxAbstraction.handleAction.call(this,_f26);
var _f27=_f26.target;
var _f28=null;
var _f29=null;
switch(_f26.type){
case DockBinding.ACTION_EMPTIED:
_f29=this.getChildBindingByLocalName("splitter");
if(_f29.isVisible){
_f29.hide();
}
_f28=this.getDescendantBindingsByLocalName("dock");
if(_f28.getFirst().isEmpty&&_f28.getLast().isEmpty){
if(_f28.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f26.consume();
break;
case DockBinding.ACTION_OPENED:
_f28=this.getDescendantBindingsByLocalName("dock");
if(!_f28.getFirst().isEmpty&&!_f28.getLast().isEmpty){
_f29=this.getChildBindingByLocalName("splitter");
if(!_f29.isVisible){
_f29.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f26.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f27!=this){
_f29=this.getChildBindingByLocalName("splitter");
if(_f29.isVisible){
_f29.hide();
}
this.invokeLayout();
_f26.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f27!=this){
var _f2a=this.getChildBindingsByLocalName("splitpanel");
if(_f2a.getFirst().isVisible&&_f2a.getLast().isVisible){
_f29=this.getChildBindingByLocalName("splitter");
if(!_f29.isVisible){
_f29.show();
}
}
this.invokeLayout();
_f26.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f2b){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f2b);
switch(_f2b.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f2b.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f2c=this.getChildBindingsByLocalName("splitpanel");
return _f2c.getFirst().isVisible&&_f2c.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f2d=this.getChildBindingsByLocalName("splitpanel");
return _f2d.getFirst().isFixed&&_f2d.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f2e){
StageSplitPanelBinding.superclass.handleAction.call(this,_f2e);
StageBoxAbstraction.handleAction.call(this,_f2e);
switch(_f2e.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f2e.type==StageSplitBoxBinding.ACTION_HIDE){
_f2e.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f2e.type==DockBinding.ACTION_EMPTIED){
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
if(_f2e.type==StageSplitBoxBinding.ACTION_SHOW){
_f2e.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f31=_f2e.target;
if(_f31!=this&&_f31.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f32=_f31._containingSplitBoxBinding;
if(_f32.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f33=_f32.getChildBindingsByLocalName("splitpanel");
var _f34=_f33.getFirst();
var _f35=_f33.getLast();
if(this.isFixed==true){
if(!_f34.isFixed||!_f35.isFixed||(!_f32.hasBothPanelsVisible()&&_f31.isMinimizedForReal)){
this.setFix(false);
_f2e.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f32.hasBothPanelsFixed()||(!_f32.hasBothPanelsVisible()&&_f31.isMinimizedForReal)){
this.setFix(_f31.getContainedDock().getHeight());
_f2e.consume();
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
var _f36=this.getContainedDock();
if(_f36){
if(this.isMaximizePrepared==true){
}else{
_f36.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f37=this.getContainedDock();
if(_f37){
if(_f37.type==DockBinding.TYPE_EDITORS){
if(_f37.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f37.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f38=this.getContainedDock();
if(_f38){
_f38.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f38);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f39=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f3a=this.getContainedDock();
if(_f3a){
_f3a.collapse(_f39);
if(!_f39){
this.setFix(_f3a.getHeight());
}else{
this.setFix(_f3a.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f3a&&_f3a.isActive){
_f3a.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f3a);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f3b){
var _f3c=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f3d=this.getContainedDock();
if(_f3d){
if(this.isMinimized==true){
_f3d.unCollapse(_f3c);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f3b){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f3d){
_f3d.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f3d);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f3e){
var _f3f=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f3f=false;
}
}
if(_f3f==true){
this._invisibilize(_f3e);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f41){
if(_f41!=this._isInvisibilized){
if(_f41){
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
StageSplitterBinding.prototype.onDragStart=function(_f42){
var _f43=top.app.bindingMap.stagesplittercover;
var _f44=this._containingSplitBoxBinding.getOrient();
switch(_f44){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f43.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f43.bindingElement.style.cursor="n-resize";
break;
}
_f43.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f44);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f4a){
this._orient=_f4a;
this.attachClassName(_f4a);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f4c=true;
var _f4d=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f4d=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f4c=false;
break;
}
if(_f4c){
this.bindingElement.style.left=pos.x+"px";
}
if(_f4d){
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
StageBoxAbstraction.handleAction=function(_f4f){
switch(_f4f.type){
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
if(_f4f.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f4f.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f50=this.bindingElement.style;
_f50.position="absolute";
_f50.width="100%";
_f50.height="100%";
_f50.top="0";
_f50.left="0";
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
var _f51=this.bindingElement.style;
_f51.position="relative";
_f51.width="auto";
_f51.height="auto";
_f51.top="auto";
_f51.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f52,_f53){
var _f54=_f52.bindingElement.style;
var _f55=_f52.bindingElement.parentNode;
var box=_f52._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f53){
_f52._unmodifiedFlexMethod=_f52.flex;
_f52.flex=function(){
_f54.width=_f55.offsetWidth+"px";
_f54.height=_f55.offsetHeight+"px";
};
}else{
_f54.width="100%";
_f54.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f54.width="auto";
_f54.height="auto";
box.reflex(true);
},0);
}
_f52.flex=_f52._unmodifiedFlexMethod;
_f52._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f57){
var _f58=_f57.target;
switch(_f57.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f58 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f57);
_f57.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f57.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f59){
var mode=null;
switch(_f59.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f5b){
StageMenuBarBinding.superclass.handleAction.call(this,_f5b);
switch(_f5b.type){
case MenuItemBinding.ACTION_COMMAND:
var _f5c=_f5b.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f5c){
SystemAction.invoke(_f5c,this._rootNode);
}
}
_f5b.consume();
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
var _f5d=this.getProperty("handle");
if(_f5d){
this._handle=_f5d;
if(StageBinding.isViewOpen(_f5d)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f5d);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f5f){
this.setProperty("handle",_f5f);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f60,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f60,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f60){
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
StageViewMenuItemBinding.newInstance=function(_f62){
var _f63=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f62);
UserInterface.registerBinding(_f63,StageViewMenuItemBinding);
return UserInterface.getBinding(_f63);
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
StageStatusBarBinding.prototype.setLabel=function(_f64){
this._label.setLabel(_f64);
};
StageStatusBarBinding.prototype.setImage=function(_f65){
this._label.setImage(_f65);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f66){
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
var _f67=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f68=_f67.getAssociatedView();
var _f69=_f68.getContentWindow().bindingMap.tree;
var _f6a=_f69.getFocusedTreeNodeBindings();
if(!_f6a.hasEntries()&&StageBinding.treeSelector){
_f6a=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f6a;
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
ExplorerBinding.prototype.handleAction=function(_f6b){
ExplorerBinding.superclass.handleAction.call(this,_f6b);
var _f6c=_f6b.target;
switch(_f6b.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f6b.consume();
break;
case Binding.ACTION_DRAG:
if(_f6c instanceof ExplorerSplitterBinding){
_f6c.dragger.registerHandler(this);
}
_f6b.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f6e){
this._menuBinding.setSelectionByHandle(_f6e);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f6f){
if(_f6f instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f6f);
this._menuBinding.mountDefinition(_f6f);
}
};
ExplorerBinding.prototype.onDragStart=function(_f70){
var _f71=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f71.hasEntries()){
var _f72=_f71.getFirst();
this._dragStart=_f72.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f72.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f76){
if(_f76 instanceof SystemViewDefinition){
var _f77=ViewBinding.newInstance(this.bindingDocument);
_f77.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f77.setDefinition(_f76);
var _f78=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f78.setAssociatedView(_f77);
this._decks[_f76.handle]=_f78;
_f78.add(_f77);
this.add(_f78);
function attach(){
_f78.attach();
_f77.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f79){
var _f7a=this._decks[_f79];
this.select(_f7a);
};
DecksBinding.prototype.expandBy=function(_f7b){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f7d=this.bindingElement.offsetHeight+_f7b;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f7d+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f7f){
var _f80=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f7f);
return UserInterface.registerBinding(_f80,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f81){
this._viewBinding=_f81;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f82=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f83=this._viewBinding.getDefinition().label;
StatusBar.busy(_f82,[_f83]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f84){
ExplorerDeckBinding.superclass.handleAction.call(this,_f84);
var _f85=_f84.target;
switch(_f84.type){
case PageBinding.ACTION_INITIALIZED:
if(_f85 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f85.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f86,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f86,arg);
switch(_f86){
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
var _f88=null;
if(this._isExplorerDeckBindingInitialized){
_f88=this._viewBinding.getDefinition().label;
}else{
_f88=DockTabBinding.LABEL_TABLOADING;
}
return _f88;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f89=null;
if(this._isExplorerDeckBindingInitialized){
_f89=this._viewBinding.getDefinition().image;
}else{
_f89=DockTabBinding.IMG_TABLOADING;
}
return _f89;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f8a=null;
if(this._isExplorerDeckBindingInitialized){
_f8a=this._viewBinding.getDefinition().toolTip;
}
return _f8a;
};
ExplorerDeckBinding.newInstance=function(_f8b){
var _f8c=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f8b);
return UserInterface.registerBinding(_f8c,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f8d){
switch(_f8d.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f8d.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f8d.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f8d);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f8e){
this._maxButtons.set(_f8e.handle,this._mountMaxButton(_f8e));
this._minButtons.set(_f8e.handle,this._mountMinButton(_f8e));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f8f){
var _f90=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f90.setLabel(_f8f.label);
_f90.setToolTip(_f8f.toolTip);
_f90.handle=_f8f.handle;
_f90.node=_f8f.node;
this._maxGroup.add(_f90);
this._maxList.add(_f90);
_f90.attach();
return _f90;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f91){
var _f92=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f92.setLabel(_f91.label);
_f92.setToolTip(_f91.label);
_f92.handle=_f91.handle;
_f92.node=_f91.node;
this._minGroup.addFirst(_f92);
this._minList.add(_f92);
_f92.attach();
_f92.hide();
return _f92;
};
ExplorerMenuBinding.prototype.handleAction=function(_f93){
ExplorerMenuBinding.superclass.handleAction.call(this,_f93);
switch(_f93.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f94=_f93.target;
var _f95=_f94.getCheckedButtonBinding();
var _f96=_f95.handle;
switch(_f94){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f96),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f96),true);
break;
}
this._selectedHandle=_f96;
this._selectedTag=_f95.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f93.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f97){
var _f98=this._maxButtons.get(_f97);
if(_f98){
_f98.check();
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
var _f99=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f99=true;
}
return _f99;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f9b=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f9b=true;
}
return _f9b;
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
ExplorerToolBarBinding.newInstance=function(_f9c){
var _f9d=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f9c);
return UserInterface.registerBinding(_f9d,ExplorerToolBarBinding);
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
var _f9e=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f9f=_f9e?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f9f);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fa0,_fa1){
var _fa2=(_fa1==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fa3=DOMUtil.createElementNS(Constants.NS_UI,_fa2,_fa0);
var _fa4=UserInterface.registerBinding(_fa3,ExplorerToolBarButtonBinding);
_fa4.explorerToolBarButtonType=_fa1;
return _fa4;
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
EditorBinding.registerComponent=function(_fa5,_fa6){
var _fa7=EditorBinding._components;
var _fa8=EditorBinding._editors;
var key=_fa6.key;
var _faa=Interfaces.isImplemented(IWysiwygEditorComponent,_fa5);
if(!_faa){
_faa=Interfaces.isImplemented(ISourceEditorComponent,_fa5);
}
if(_faa){
if(_fa8.has(key)){
_fa8.get(key).initializeEditorComponent(_fa5);
}else{
if(!_fa7.has(key)){
_fa7.set(key,new List());
}
_fa7.get(key).add(_fa5);
}
}else{
throw "Editor component interface not implemented: "+_fa5;
}
};
EditorBinding.claimComponents=function(_fab,_fac){
var _fad=EditorBinding._components;
var _fae=EditorBinding._editors;
var key=_fac.key;
_fae.set(key,_fab);
var list=null;
if(_fad.has(key)){
list=_fad.get(key).copy();
_fad.del(key);
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
var _fb2=this.getProperty("value");
if(_fb2!=null){
_fb2=decodeURIComponent(_fb2);
this._startContent=_fb2;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fb4=this.bindingWindow.DataManager;
_fb4.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fb6){
var _fb7=EditorBinding.claimComponents(this,_fb6);
if(_fb7!=null){
while(_fb7.hasNext()){
this.initializeEditorComponent(_fb7.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fb9=this.bindingWindow.DataManager;
if(_fb9.getDataBinding(name)){
_fb9.unRegisterDataBinding(name);
}
_fb9.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fba=this.getEditorDocument();
if(_fba!=null){
Application.framework(_fba);
DOMEvents.addEventListener(_fba,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fba,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fba,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fba,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fbc){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fbc==true){
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
var _fbe=this.getCheckSum();
if(_fbe!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fbe;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fbf=null;
if(Binding.exists(this._pageBinding)){
_fbf=this._pageBinding.getCheckSum(this._checksum);
}
return _fbf;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fc1=DOMEvents.getTarget(e);
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
if(_fc1.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fc3,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fc3,arg);
var _fc5=null;
switch(_fc3){
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
var _fc6=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fc6=false;
}
}
}else{
_fc5=DOMEvents.getTarget(arg);
if(_fc5&&_fc5.ownerDocument==this.getEditorDocument()){
_fc6=false;
}
}
if(_fc6){
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
EditorBinding.prototype._activateEditor=function(_fc7){
if(_fc7!=this._isActivated){
this._isActivated=_fc7;
EditorBinding.isActive=_fc7;
var _fc8=this.getEditorWindow().standardEventHandler;
var _fc9=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fc9!=null){
if(_fc7){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fc9.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fc8.enableNativeKeys(true);
}else{
_fc9.disable();
_fc8.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fca=this.getEditorDocument().selection.createRange();
_fca.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fcb=false;
try{
if(!Client.isExplorer){
var _fcc=this.getEditorWindow().getSelection();
if(_fcc!=null){
_fcb=_fcc.toString().length>0;
if(!_fcb){
var _fcd=_fcc.getRangeAt(0);
var frag=_fcd.cloneContents();
var _fcf=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fcf.appendChild(frag.firstChild);
}
var img=_fcf.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fcb=true;
}
}
}
}
}else{
var _fcd=this.getEditorDocument().selection.createRange();
_fcb=(_fcd&&_fcd.text)&&_fcd.text.length>0;
if(_fcd.commonParentElement&&VisualEditorBinding.isImageElement(_fcd.commonParentElement())){
_fcb=true;
}
}
}
catch(exception){
}
return _fcb;
};
EditorBinding.prototype.isCommandEnabled=function(_fd1){
var _fd2=true;
switch(_fd1){
case "Cut":
case "Copy":
case "Paste":
_fd2=this.getEditorDocument().queryCommandEnabled(_fd1);
break;
}
return _fd2;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fd6=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fd7=null;
if(cmd=="Paste"){
_fd7=null;
}else{
_fd7=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fd7);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fd6=true;
}
break;
}
return _fd6;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fd9=this.getContentWindow().bindingMap.toolbar;
var _fda=_fd9.getButtonForCommand(cmd);
if(!_fda){
throw "No button for command "+cmd;
}
return _fda;
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
var _fdd=this.getContentDocument().getElementById("focusableinput");
if(_fdd!=null){
_fdd.style.display="block";
FocusBinding.focusElement(_fdd);
_fdd.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fde){
EditorBinding.superclass.handleAction.call(this,_fde);
var _fdf=_fde.target;
var self=this;
var _fe1=this.shadowTree.iframe;
switch(_fde.type){
case Binding.ACTION_DIRTY:
if(_fde.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fe2){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fe2);
};
EditorBinding.prototype.handleElement=function(_fe3){
return true;
};
EditorBinding.prototype.updateElement=function(_fe4){
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
var _fe7=this._menuGroups[rel];
if(_fe7 instanceof List){
_fe7.each(function(_fe8){
_fe8.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _fea=this._menuGroups[rel];
if(_fea instanceof List){
_fea.each(function(_feb){
_feb.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_fec){
EditorPopupBinding.superclass.handleAction.call(this,_fec);
var _fed=_fec.target;
if(_fec.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_fed.getProperty("cmd");
var gui=_fed.getProperty("gui");
var val=_fed.getProperty("val");
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
var _ff1=this.bindingWindow.bindingMap.tinywindow;
var _ff2=this.bindingWindow.bindingMap.codepresswindow;
if(_ff1){
EditorBinding.registerComponent(this,_ff1);
}else{
if(_ff2){
EditorBinding.registerComponent(this,_ff2);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_ff3,_ff4,_ff5,_ff6){
this._editorBinding=_ff3;
this._tinyEngine=_ff4;
this._tinyInstance=_ff5;
this._tinyTheme=_ff6;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_ff7,_ff8,_ff9){
this._editorBinding=_ff7;
this._codePressFrame=_ff8;
this._codePressEngine=_ff9;
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
var _ffc=this._editorBinding;
if(_ffc!=null){
var self=this;
var _ffe={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_ffc.hasBookmark()){
_ffc.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_ffc.hasBookmark()){
_ffc.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_ffe);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_ffe);
}
};
EditorClickButtonBinding.newInstance=function(_1000){
var _1001=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_1000);
return UserInterface.registerBinding(_1001,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_1002){
var _1003=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_1002);
return UserInterface.registerBinding(_1003,EditorToolBarButtonBinding);
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
var _1004=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_1004);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_1005,_1006,_1007,theme){
this._editorBinding=_1005;
this._tinyEngine=_1006;
this._tinyInstance=_1007;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1009){
EditorSelectorBinding.superclass.handleAction.call(this,_1009);
switch(_1009.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_1009);
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
EditorMenuItemBinding.newInstance=function(_100d){
var _100e=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_100d);
return UserInterface.registerBinding(_100e,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_100f){
var i=0,_1011,_1012=[],split=_100f.split(" ");
while((_1011=split[i++])!=null){
if(_1011.length>=3&&_1011.substring(0,3)=="mce"){
continue;
}else{
if(_1011.length>=14&&_1011.substring(0,14)=="compositemedia"){
continue;
}
}
_1012.push(_1011);
}
return _1012.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_1014){
var _1015=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_1014);
if(soap instanceof SOAPFault){
}else{
_1015=soap.XhtmlFragment;
if(!_1015){
_1015="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1015;
};
VisualEditorBinding.getTinyContent=function(_1017,_1018){
var _1019=null;
if(_1017==null||_1017==""){
_1017=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_1017);
if(soap instanceof SOAPFault){
var _101b=soap;
var _101c={handleDialogResponse:function(){
_1018.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_101c,_101b);
}else{
_1019=soap.XhtmlFragment;
if(_1019==null){
_1019=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1019;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _101f=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1021=new List(doc.documentElement.childNodes);
var _1022=new List();
_1021.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_1022.add(child);
}
});
var _1024=_1022.get(index);
if(_1024==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_1024.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_1024.hasChildNodes()){
frag.appendChild(_1024.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_101f=DOMSerializer.serialize(doc.documentElement);
_101f=_101f.substring(_101f.indexOf(">")+1,_101f.length);
_101f=_101f.substring(0,_101f.lastIndexOf("<"));
}
}
}
if(_101f==null){
_101f=new String("");
}
return _101f;
};
VisualEditorBinding.isImage=function(_1026){
result=_1026&&_1026.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_1027){
return VisualEditorBinding.isImage(_1027)&&!VisualEditorBinding.isReservedElement(_1027);
};
VisualEditorBinding.isReservedElement=function(_1028){
if(VisualEditorBinding.isFunctionElement(_1028)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1028)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1028)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1029){
return VisualEditorBinding.isImage(_1029)&&CSSUtil.hasClassName(_1029,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_102a){
return VisualEditorBinding.isImage(_102a)&&CSSUtil.hasClassName(_102a,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_102b){
return VisualEditorBinding.isImage(_102b)&&CSSUtil.hasClassName(_102b,VisualEditorBinding.HTML_CLASSNAME);
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
var _102c=this.getProperty("embedablefieldstypenames");
if(_102c!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_102c);
}
var _102d=this.getProperty("formattingconfiguration");
if(_102d!=null){
this._url+="?config="+_102d;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_102e,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_102e,arg);
var _1030=this.getContentWindow().bindingMap.tinywindow;
var _1031=_1030.getContentWindow();
switch(_102e){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_1031){
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
this.initializeEditorComponents(_1030);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1032){
_1032.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1033){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1033);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_1036){
var _1037=_1036;
if(!this._isNormalizedDocument(_1036)){
_1037=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_1036);
}
return _1037;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1038){
var _1039=false;
var doc=XMLParser.parse(_1038,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1039=true;
}
}
if(Client.isWebKit){
if(_1038.indexOf("<html")!==0){
_1039=false;
}
}
return _1039;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _103e=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_103e){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_103e=true;
}
return _103e;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1040=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1040);
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
VisualEditorBinding.prototype.setResult=function(_1042){
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
VisualEditorPopupBinding.prototype.configure=function(_1043,_1044,_1045){
var _1046=this.editorBinding.hasSelection();
this.tinyInstance=_1043;
this.tinyEngine=_1044;
this.tinyElement=_1045;
this.hasSelection=_1046;
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
var _104a=false;
if(this.hasSelection){
_104a=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_104a=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_104a=true;
}
}
}
}
if(_104a){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _104b=this.getMenuItemForCommand("compositeInsertLink");
var _104c=this.getMenuItemForCommand("unlink");
var _104d=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _104e=this.editorBinding.getButtonForCommand("unlink");
_104c.setDisabled(_104e.isDisabled);
if(_104c.isDisabled){
_104b.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_104b.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _104f=this.editorBinding.embedableFieldConfiguration;
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
if(_104f){
var _1052=_104f.getGroupNames();
if(_1052.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1052.each(function(_1056){
var _1057=_104f.getFieldNames(_1056);
_1057.each(function(_1058){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1058);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1056+":"+_1058);
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
var _105a=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _105b=null;
var _105c=null;
if(_105a){
if(_105a.nodeName=="TD"){
_105b=_105a.getAttribute("colspan");
_105c=_105a.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_105b=="1"&&_105c=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_105a){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_105d){
var _105e=VisualEditorFormattingConfiguration._configurations;
if(!_105e.has(_105d)){
_105e.set(_105d,new VisualEditorFormattingConfiguration());
}
return _105e.get(_105d);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1060){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1061){
var _1062=null;
var _1063=VisualEditorFieldGroupConfiguration._configurations;
if(!_1063.has(_1061)){
_1063.set(_1061,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1061)));
}
return _1063.get(_1061);
};
function VisualEditorFieldGroupConfiguration(_1064){
var _1065=new Map();
new List(_1064).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1065.set(group.GroupName,map);
});
this._groups=_1065;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1069){
return this._groups.get(_1069).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_106a,_106b){
return this._groups.get(_106a).get(_106b).xhtml;
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
var _106d=this.getDescendantElementsByLocalName("textarea");
while(_106d.hasNext()){
var _106e=_106d.getNext();
if(_106e.getAttribute("selected")=="true"){
this._startContent=_106e.value;
this._textareaname=_106e.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1070=this.getContentWindow().bindingMap.templatetree;
_1070.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1071){
var _1072=_1070.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1072.textareaname);
_1071.consume();
}});
_1070.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1073){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1074=this.getContentWindow().bindingMap.toolsplitter;
_1074.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1075=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1075.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1075);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1076){
this._textareas=new Map();
while(_1076.hasNext()){
var _1077=_1076.getNext();
var _1078=_1077.getAttribute("placeholderid");
this._textareas.set(_1078,{placeholderid:_1078,placeholdername:_1077.getAttribute("placeholdername"),placeholdermarkup:_1077.value,textareaelement:_1077,isSelected:_1077.getAttribute("selected")=="true"});
}
var _1079=new Map();
this._textareas.each(function(name,_107b){
var _107c=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_107c.setLabel(_107b.placeholdername);
_107c.setImage("${icon:placeholder}");
_107c.setProperty("placeholder",true);
_107c.textareaname=name;
_1079.set(_107b.placeholdername,_107c);
if(_107b.isSelected){
selected=_107c;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _107d=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_107d.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _107e=this.getContentWindow().bindingMap.templatetree;
var _107f=_107e.add(TreeNodeBinding.newInstance(_107e.bindingDocument));
_107f.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_107f.setImage("${icon:warning}");
_107f.attach();
var _1080=this.getContentWindow().bindingMap.statusbar;
_1080.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1082=this._textareas.get(name);
var _1083=_1082.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1083));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1084){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1084;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1085=this.getContentWindow().bindingMap.statusbar;
_1085.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1084);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1088="";
if(this._heads.has(this._textareaname)){
_1088=this._heads.get(this._textareaname);
if(_1088==null){
_1088=new String("");
}
}
return _1088;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_108a){
_108a.textareaelement.value=_108a.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_108b,_108c){
var _108d=_108b.getElementsByTagName("div").item(0);
var _108e=_108c.getElementsByTagName("div").item(0);
var _108f=new List(_108d.getElementsByTagName("textarea"));
var _1090=new List(_108e.getElementsByTagName("textarea"));
var _1091=false;
if(_108f.getLength()!=_1090.getLength()){
_1091=true;
}else{
var index=0;
_108f.each(function(_1093,index){
var _1095=_1090.get(index);
var newid=_1093.getAttribute("placeholderid");
var oldid=_1095.getAttribute("placeholderid");
var _1098=_1093.getAttribute("placeholdername");
var _1099=_1095.getAttribute("placeholdername");
if(newid!=oldid||_1098!=_1099){
_1091=true;
}
return !_1091;
});
}
if(_1091){
var html=null;
if(_108d.innerHTML!=null){
html=_108d.innerHTML;
}else{
html=DOMSerializer.serialize(_108d);
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
var _109d=this.getDescendantBindingByLocalName("selector");
_109d.attach();
this._populateTemplateSelector();
var _109e=this.getContentWindow().bindingMap.templateselector;
_109e.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _109f=this.getDescendantBindingByLocalName("selector");
var _10a0=this.getContentWindow().bindingMap.templateselector;
_109f.selections.each(function(_10a1){
_10a1.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10a0.populateFromList(_109f.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10a2=this.getDescendantBindingByLocalName("selector");
var _10a3=this.getContentWindow().bindingMap.templateselector;
_10a2.selectByValue(_10a3.getValue());
_10a2.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10a4){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10a9,_10aa){
var _10ab=_10aa;
if(old.has(_10a9)){
_10ab=old.get(_10a9).placeholdermarkup;
}
return _10ab;
}
while(_10a4.hasNext()){
var _10ac=_10a4.getNext();
var _10ad=_10ac.getAttribute("placeholderid");
this._textareas.set(_10ad,{placeholderid:_10ad,placeholdername:_10ac.getAttribute("placeholdername"),placeholdermarkup:compute(_10ad,_10ac.value),textareaelement:_10ac,isSelected:_10ac.getAttribute("selected")=="true"});
}
var _10ae=null;
var _10af=this.getContentWindow().bindingMap.templatetree;
var _10b0=new Map();
this._textareas.each(function(name,_10b2){
var _10b3=_10af.add(TreeNodeBinding.newInstance(_10af.bindingDocument));
_10b3.setLabel(_10b2.placeholdername);
_10b3.setImage("${icon:placeholder}");
_10b3.setProperty("placeholder",true);
_10b3.textareaname=name;
_10b0.set(_10b2.placeholdername,_10b3);
if(_10b2.isSelected){
_10ae=_10b3;
}
});
_10af.attachRecursive();
if(_10ae!=null){
var _10b4=true;
if(this._oldtextareas.hasEntries()){
_10b4=false;
var map=new Map();
this._textareas.each(function(id,_10b7){
map.set(_10b7.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10b4=true;
}
}
if(_10b4){
var _10b8=this._textareas.get(_10ae.textareaname);
this._textareaname=_10ae.textareaname;
this._placeholdername=_10b8.placeholdername;
this._setContentFromPlaceHolder(_10ae.textareaname);
_10ae.focus();
}else{
var _10b9=_10b0.get(this._placeholdername);
this._textareaname=_10b9.textareaname;
_10b9.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10ba,_10bb){
var _10bc=_10ba.getElementsByTagName("ui:selector").item(0);
var _10bd=_10bb.getElementsByTagName("ui:selector").item(0);
var _10be=false;
if(_10bc!=null&&_10bd!=null){
var _10bf=new List(_10bc.getElementsByTagName("ui:selection"));
var _10c0=new List(_10bd.getElementsByTagName("ui:selection"));
if(_10bf.getLength()!=_10c0.getLength()){
_10be=true;
}else{
_10bf.each(function(_10c1,index){
var _10c3=_10c1.getAttribute("value");
var _10c4=_10c0.get(index).getAttribute("value");
if(_10c3!=_10c4){
_10be=true;
}
return !_10be;
});
}
}
if(_10be){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10bc);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10ba,_10bb);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10c6,frame,_10c8){
this._editorBinding=_10c6;
this._codePressFrame=frame;
this._codePressEngine=_10c8;
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
var _10ce=this.getProperty("validate");
if(_10ce==true){
this._hasStrictValidation=true;
}
var _10cf=this.getProperty("validator");
if(_10cf!=null){
this._validator=_10cf;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10d0,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10d0,arg);
switch(_10d0){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10d2=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10d2!=null){
var _10d3=_10d2.getContentWindow();
if(arg.broadcastWindow==_10d3){
this._codemirrorWindow=_10d3;
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
this.initializeEditorComponents(_10d2);
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
this.unsubscribe(_10d0);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10d7){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10d7);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10d8){
if(_10d8!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10d8;
EditorBinding.isActive=_10d8;
var _10d9=this.getContentWindow().standardEventHandler;
if(_10d8){
_10d9.enableNativeKeys(true);
}else{
_10d9.disableNativeKeys();
}
var _10da=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10da!=null){
if(_10d8){
_10da.enable();
}else{
_10da.disable();
}
}
if(_10d8){
this.focus();
var _10db=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10df=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10df;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10e0){
_10e0.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10e2){
if(!this._isFinalized){
if(_10e2!=this._startContent){
this._startContent=_10e2;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10e2);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10e3=this.getContentWindow().bindingMap.editorpage.getContent();
if(_10e3!=null){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10e3=_10e3.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
break;
}
}
return _10e3?_10e3:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
this._codemirrorEditor.clearHistory();
};
CodeMirrorEditorBinding.prototype.cover=function(_10e4){
if(this._pageBinding!=null){
this._pageBinding.cover(_10e4);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10e5){
if(_10e5!=null&&this.shadowTree.dotnetinput!=null){
var value=_10e5.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10e7=true;
var _10e8=this.getContent();
if(this._validator!=null){
_10e7=Validator.validateInformed(_10e8,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10e7=XMLParser.isWellFormedDocument(_10e8,true);
if(_10e7==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10e7=this._isValidHTML(_10e8);
break;
}
}
break;
}
}
return _10e7;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10ea=true;
var doc=XMLParser.parse(xml);
var _10ec=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10ec.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10ec.add("NamespaceURI");
}
var head=null,body=null;
var _10f0=new List(root.childNodes);
while(_10f0.hasNext()){
var child=_10f0.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10ec.add("MultipleHead");
}
if(body!=null){
_10ec.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10ec.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10ec.add("MissingHead");
}
if(body==null){
_10ec.add("MissingBody");
}
}
if(_10ec.hasEntries()){
_10ea=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10ec.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10ec.getFirst()));
}
}
return _10ea;
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
var _10f2=null;
var page=this._pageBinding;
if(page!=null){
_10f2=page.getCheckSum();
}
return _10f2;
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
ThrobberBinding.prototype.handleBroadcast=function(_10f4,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10f4,arg);
switch(_10f4){
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
ProgressBarBinding.notch=function(_10f7){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10f7);
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
ProgressBarBinding.prototype.notch=function(_10f9){
_10f9=_10f9?_10f9:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_10f9);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_10fb,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_10fb,arg);
switch(_10fb){
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
StartMenuItemBinding.prototype.setChecked=function(_10fd,_10fe){
StartMenuItemBinding.superclass.setChecked.call(this,_10fd,_10fe);
if(!_10fe){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_10ff){
var _1100=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_10ff);
UserInterface.registerBinding(_1100,StartMenuItemBinding);
return UserInterface.getBinding(_1100);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_1103,_1104){
var _1105=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1104,true)==true){
if(_1103!="*"){
_1103=KeySetBinding._sanitizeKeyModifiers(_1103);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1105[doc]){
_1105[doc]={};
}
if(!_1105[doc][code]){
_1105[doc][code]={};
}
_1105[doc][code][_1103]=_1104;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1109=false;
var code=e.keyCode;
var _110b=KeySetBinding.keyEventHandlers;
if(_110b[doc]&&_110b[doc][code]){
var _110c="[default]";
_110c+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_110c+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _110d=_110b[doc][code][_110c];
if(_110d==null){
_110d=_110b[doc][code]["*"];
}
if(_110d!=null){
_110d.handleKeyEvent(e);
_1109=true;
}
}
return _1109;
};
KeySetBinding._sanitizeKeyModifiers=function(_110e){
var _110f="[default]";
var mods={};
if(_110e){
new List(_110e.split(" ")).each(function(_1111){
mods[_1111]=true;
});
function check(_1112){
if(mods[_1112]){
_110f+=" "+_1112;
}
}
check("shift");
check("control");
}
return _110f;
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
var _1116=key.getAttribute("oncommand");
var _1117=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1117){
DOMEvents.preventDefault(e);
}
var _1119=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1116,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_111a){
if(_111a instanceof CursorBinding){
_111a.setOpacity(0);
_111a.show();
new Animation({modifier:9,onstep:function(_111b){
_111a.setOpacity(Math.sin(_111b*Math.PI/180));
},onstop:function(){
_111a.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_111c){
if(_111c instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_111d){
_111c.setOpacity(Math.cos(_111d*Math.PI/180));
},onstop:function(){
_111c.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_111e,_111f,_1120){
if(_111e instanceof CursorBinding){
_1120.x-=16;
_1120.y-=16;
new Animation({modifier:3,onstep:function(_1121){
var tal=Math.sin(_1121*Math.PI/180);
_111e.setPosition(new Point(((1-tal)*_111f.x)+((0+tal)*_1120.x),((1-tal)*_111f.y)+((0+tal)*_1120.y)));
},onstop:function(){
CursorBinding.fadeOut(_111e);
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
CursorBinding.prototype.setOpacity=function(_1127){
this.bindingElement.style.opacity=new String(_1127);
this._opacity=_1127;
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
function setOpacity(_112a){
cover.bindingElement.style.opacity=new String(_112a);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_112b){
if(Binding.exists(cover)){
setOpacity(Math.cos(_112b*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_112d){
cover.bindingElement.style.MozOpacity=new String(_112d);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_112e){
if(Binding.exists(cover)){
setOpacity(Math.sin(_112e*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1130){
if(_1130!=this._isBusy){
if(_1130){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1130;
}
};
CoverBinding.prototype.setTransparent=function(_1131){
if(_1131!=this._isTransparent){
if(_1131){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1131;
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
CoverBinding.prototype.setHeight=function(_1133){
if(_1133>=0){
this.bindingElement.style.height=new String(_1133+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1134){
var _1135=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1134);
return UserInterface.registerBinding(_1135,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1137=UncoverBinding._bindingInstance;
if(Binding.exists(_1137)){
_1137.setPosition(pos);
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
TheatreBinding.prototype.play=function(_113b){
this._isFading=_113b==true;
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
var _113c=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_113c.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_113c.clearRect(0,0,300,150);
_113c.fillRect(0,0,300,150);
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
var _113e=this._canvas.getContext("2d");
_113e.clearRect(0,0,300,150);
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
var _113f=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_113f);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1140=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1140){
this._startcontent=_1140.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1141){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1141);
switch(_1141.type){
case WindowBinding.ACTION_ONLOAD:
if(_1141.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1141.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1141);
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
var _1145=this._transformer.transformToString(doc);
this._inject(_1145);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1148){
this.getContentDocument().body.innerHTML=_1148;
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
var _1150=list.getNext();
var id=_1150.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1150);
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
var _115a=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_115a.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_115a.appendChild(att);
}
elm.appendChild(_115a);
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
var _1164=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1164){
doc=XMLParser.parse(_1164);
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
var _1168=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1168;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1169,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1169,arg);
switch(_1169){
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
var _116c=new List();
list.each(function(lang){
_116c.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_116c);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1170){
switch(_1170){
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
var _1173=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1173,root);
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
var _1174=this.getProperty("status");
if(_1174!=null){
switch(_1174){
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
UserInterfaceMapping.prototype.merge=function(_1178){
for(var _1179 in _1178.map){
this.map[_1179]=_1178.getBindingImplementation(_1179);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_117a){
var _117b=null;
var name=_117a.nodeName.toLowerCase();
if(this.map[name]){
_117b=this.map[name];
}
return _117b;
};
var UserInterface=new function(){
var _117d=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _117e=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_117d,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _117f=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1181,impl){
var _1183=null;
if(!this.hasBinding(_1181)){
var _1184=DOMUtil.getParentWindow(_1181);
if(DOMUtil.getLocalName(_1181)!="bindingmapping"){
if(!impl&&_1181.getAttribute("binding")!=null){
var _1185=_1181.getAttribute("binding");
impl=_1184[_1185];
if(impl==null){
throw "No such binding in scope: "+_1185;
}
}
if(!impl){
var _1186=_1184.DocumentManager;
if(_1186){
var _1187=_1186.customUserInterfaceMapping;
if(_1187){
impl=_1187.getBindingImplementation(_1181);
}
}
}
if(!impl){
impl=_117e.getBindingImplementation(_1181);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1183=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1183){
var key=KeyMaster.getUniqueKey();
_1181.setAttribute("key",key);
_1183.key=key;
if(!_1181.id){
_1181.id=key;
}
keys[key]={element:_1181,binding:_1183};
_1183.onBindingRegister();
}
}
}
return _1183;
};
this.unRegisterBinding=function(_1189){
terminate(_1189);
};
function terminate(_118a){
if(Binding.exists(_118a)==true){
var key=_118a.key;
Binding.destroy(_118a);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_118a=null;
}else{
_117f.error("URGH: "+key);
}
}
}
}
this.getElement=function(_118c){
var _118d=null;
if(keys[_118c.key]){
_118d=keys[_118c.key].element;
}
return _118d;
};
this.getBinding=function(_118e){
var _118f=null;
if(_118e&&_118e.nodeType==Node.ELEMENT_NODE){
try{
var key=_118e.getAttribute("key");
if(key&&keys[key]){
_118f=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_118e);
if(exception.stack){
alert(exception.stack);
}
}
}
return _118f;
};
this.getBindingByKey=function(key){
var _1192=null;
if(keys[key]){
_1192=keys[key].binding;
}
return _1192;
};
this.hasBinding=function(_1193){
return this.getBinding(_1193)!=null;
};
this.isBindingVisible=function(_1194){
var _1195=Application.isOperational;
if(_1195==true){
var _1196=new Crawler();
_1196.type=NodeCrawler.TYPE_ASCENDING;
_1196.id="visibilitycrawler";
_1196.addFilter(function(_1197){
var b=UserInterface.getBinding(_1197);
var res=0;
if(!b.isVisible){
_1195=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_1196.crawl(_1194.bindingElement);
_1196.dispose();
}
return _1195;
};
var _119a=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_119a={};
for(var key in keys){
_119a[key]=true;
}
};
this.getPoint=function(){
var _119e=null;
if(_119a){
_119e=new List();
for(var key in keys){
if(!_119a[key]){
_119e.add(key);
}
}
}
return _119e;
};
this.clearPoint=function(){
_119a=null;
};
this.trackUndisposedBindings=function(){
var _11a0=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11a0){
_11a0="Bindings illdisposed: ";
}
_11a0+=entry.binding+" ";
}
}
if(_11a0!=null){
_117f.error(_11a0);
}
};
this.autoTrackDisposedBindings=function(_11a3){
if(_11a3){
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
SOAPRequest.newInstance=function(_11a4,_11a5){
var _11a6=_11a4+"/"+_11a5;
var _11a7=new SOAPRequest(_11a6);
var _11a8=SOAPRequest.resolver;
_11a7.document=Templates.getTemplateDocument("soapenvelope.xml");
_11a7.envelope=_11a8.resolve("soap:Envelope",_11a7.document);
_11a7.header=_11a8.resolve("soap:Header",_11a7.envelope);
_11a7.body=_11a8.resolve("soap:Body",_11a7.envelope);
return _11a7;
};
SOAPRequest._parseResponse=function(_11a9){
var _11aa=null;
var _11ab=false;
var doc=_11a9.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11aa=SOAPRequestResponse.newInstance(_11a9.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11a9.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11ab=true;
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
var text=_11a9.responseText;
if(_11a9.status==503||text.indexOf("id=\"offline\"")>-1){
_11ab=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11a9.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11a9.responseText);
}
}
}
}
if(_11ab==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11aa;
};
function SOAPRequest(_11b0){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11b0;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11b2=DOMUtil.getXMLHTTPRequest();
var _11b3=null;
_11b2.open("post",url,false);
_11b2.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11b2.setRequestHeader("SOAPAction",this.action);
try{
_11b2.send(this.document);
_11b3=SOAPRequest._parseResponse(_11b2);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11b2=null;
return _11b3;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11b6){
var _11b7=DOMUtil.getXMLHTTPRequest();
_11b7.open("post",url,true);
_11b7.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11b7.setRequestHeader("SOAPAction",this.action);
_11b7.onreadystatechange=function(){
if(_11b7.readyState==4){
var _11b8=SOAPRequest._parseResponse(_11b7);
_11b6(_11b8);
_11b7=null;
}
};
_11b7.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11b9 in this){
this[_11b9]=null;
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
var _11bb=null;
if(doc&&doc.documentElement){
_11bb=new SOAPRequestResponse();
var _11bc=SOAPRequestResponse.resolver;
_11bb.document=doc;
_11bb.envelope=_11bc.resolve("soap:Envelope",_11bb.document);
_11bb.header=_11bc.resolve("soap:Header",_11bb.envelope);
_11bb.body=_11bc.resolve("soap:Body",_11bb.envelope);
var fault=_11bc.resolve("soap:Fault",_11bb.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11bb.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11bc.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11bc.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11bb;
};
function SOAPFault(_11be,_11bf,_11c0){
this._operationName=_11be;
this._operationAddress=_11bf;
this._faultString=_11c0;
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
SOAPFault.newInstance=function(_11c1,fault){
return new SOAPFault(_11c1.name,_11c1.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11c4){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11c4;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11c6=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11c6.body,this._operation);
var _11c8=this._wsdl.getSchema();
var _11c9=_11c8.lookup(this._operation);
var _11ca=_11c9.getListedDefinitions();
while(_11ca.hasNext()){
var def=_11ca.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11c6;
};
SOAPEncoder.prototype._resolve=function(_11ce,_11cf,value){
var _11d1=this._wsdl.getSchema();
if(_11cf.isSimpleValue){
this._appendText(_11ce,value,_11cf.type=="string");
}else{
var _11d2=_11d1.lookup(_11cf.type);
if(_11d2 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11d2.getListedDefinitions();
if(_11d2.isArray){
var _11d4=new List(value);
var def=defs.getNext();
while(_11d4.hasNext()){
var elm=this._appendElement(_11ce,def.name);
var val=_11d4.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11ce,def.name);
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
SOAPEncoder.prototype._appendText=function(_11db,value,_11dd){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11e0=false;
var i=0,c;
while(c=chars[i++]){
var _11e3=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11e3=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11e3=false;
}
break;
}
if(!_11e3){
safe+=c;
}else{
_11e0=true;
}
}
if(_11e0){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11db.appendChild(_11db.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11e6){
this._wsdl=wsdl;
this._operation=_11e6;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11eb){
var _11ec=null;
var _11ed=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11ef=this.resolve(id,_11eb.body);
var _11f0=_11ed.lookup(id);
var _11f1=_11f0.getListedDefinitions();
while(!_11ec&&_11f1.hasNext()){
var def=_11f1.getNext();
var elm=this.resolve(def.name,_11ef);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11ec=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11ec.importNode!=Types.UNDEFINED){
_11ec.appendChild(_11ec.importNode(e,true));
}else{
_11ec.loadXML(DOMSerializer.serialize(e));
}
}else{
_11ec=this._compute(elm,def);
}
}
return _11ec;
};
SOAPDecoder.prototype._compute=function(_11f5,_11f6){
var _11f7=null;
var _11f8=this._wsdl.getSchema();
if(_11f6.isSimpleValue){
_11f7=this._getSimpleValue(_11f5,_11f6.type);
}else{
var _11f9=_11f8.lookup(_11f6.type);
if(_11f9 instanceof SchemaSimpleType){
_11f7=this._getSimpleValue(_11f5,_11f9.restrictionType);
}else{
var defs=_11f9.getListedDefinitions();
if(_11f9.isArray){
_11f7=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11f5);
while(elms.hasNext()){
var elm=elms.getNext();
_11f7.push(this._compute(elm,def));
}
}else{
_11f7={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11f5);
if(elm){
_11f7[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11f7;
};
SOAPDecoder.prototype._getSimpleValue=function(_11fe,type){
var _1200=null;
if(_11fe!=null&&_11fe.firstChild&&_11fe.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_11fe.childNodes.length>1){
_11fe.normalize();
}
_1200=_11fe.firstChild.data;
switch(type){
case Schema.types.STRING:
_1200=_1200;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1200=Number(_1200);
break;
case Schema.types.BOOLEAN:
_1200=_1200=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1200;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1201){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1201);
}
Schema.prototype._parseSchema=function(_1202){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1203={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1202);
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
_1203[rule.getAttribute("name")]=entry;
}
return _1203;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1208){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1208);
}
SchemaDefinition.prototype._parse=function(_1209){
var min=_1209.getAttribute("minOccurs");
var max=_1209.getAttribute("maxOccurs");
var type=_1209.getAttribute("type");
this.name=_1209.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _120f=split[1];
this.isSimpleValue=sort!="tns";
this.type=_120f;
}else{
var elm=_1209.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1211,_1212){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1211,_1212);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1213,_1214){
var els=_1213.resolveAll("s:complexType/s:sequence/s:element",_1214);
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
function SchemaComplexType(_1216,_1217){
this._definitions=new List();
this._parseListedDefinitions(_1216,_1217);
this.isArray=_1217.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1218,_1219){
var els=_1218.resolveAll("s:sequence/s:element",_1219);
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
function SchemaSimpleType(_121c,_121d){
this.restrictionType=null;
this._parse(_121c,_121d);
}
SchemaSimpleType.prototype._parse=function(_121e,_121f){
var _1220=_121e.resolve("s:restriction",_121f);
if(_1220){
this.restrictionType=_1220.getAttribute("base").split(":")[1];
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
var _1223=null;
var _1224=DOMUtil.getXMLHTTPRequest();
_1224.open("get",url,false);
_1224.send(null);
if(_1224.responseXML){
_1223=_1224.responseXML.documentElement;
}else{
alert(_1224.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1223;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1225=new List();
var _1226=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1226.hasEntries()){
while(_1226.hasNext()){
var _1227=_1226.getNext();
var name=_1227.getAttribute("name");
_1225.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1225;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_122a,_122b,_122c){
this.name=name;
this.address=_122a;
this.encoder=_122b;
this.decoder=_122c;
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
var _1230=wsdl.getOperations();
_1230.each(function(_1231){
proxy[_1231.name]=WebServiceProxy.createProxyOperation(_1231);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1232,_1233){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1233){
var log=_1233 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1232.address+": "+_1232.name+"\n\n";
log+=DOMSerializer.serialize(_1233.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1235){
return function(){
var _1236=new List(arguments);
var _1237=null;
if(typeof (_1236.getLast())=="function"){
var _1238=_1236.extractLast();
var _1239=_1235.encoder.encode(_1236);
this._log(_1235,_1239);
var self=this;
var _123b=_1239.asyncInvoke(_1235.address,function(_123c){
self._log(_1235,_123c);
if(_123c){
if(_123c.fault){
_1237=SOAPFault.newInstance(_1235,_123c.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1237,_1239,_123c);
}
}else{
if(WebServiceProxy.isDOMResult){
_1237=_123c.document;
}else{
_1237=_1235.decoder.decode(_123c);
}
}
}
_1239.dispose();
_1238(_1237);
});
}else{
var _1239=_1235.encoder.encode(new List(arguments));
this._log(_1235,_1239);
var _123b=_1239.invoke(_1235.address);
this._log(_1235,_123b);
if(_123b){
if(_123b.fault){
_1237=SOAPFault.newInstance(_1235,_123b.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1237,_1239,_123b);
}
}else{
if(WebServiceProxy.isDOMResult){
_1237=_123b.document;
}else{
_1237=_1235.decoder.decode(_123b);
}
}
}
_1239.dispose();
return _1237;
}
};
};
WebServiceProxy.handleFault=function(_123d,_123e,_123f){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_123d,soapRequest:_123e,soapResponse:_123f});
}
catch(exception){
alert(_123d.getFaultString());
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
var _1240=SystemLogger.getLogger("MessageQueue");
var _1241=null;
var _1242=0;
var _1243=null;
var _1244=new Map();
var _1245=new Map();
var _1246=false;
var _1247=false;
var _1248=false;
var _1249=false;
var _124a={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1241=ConsoleMessageQueueService;
_1242=_1241.GetCurrentSequenceNumber("dummyparam!");
this.index=_1242;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1246){
if(!MessageQueue._actions.hasEntries()){
var _124b=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1247=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_124b;
_1247=false;
}
}
}
};
this._pokeserver=function(){
if(_1246==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1247);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_1248){
_1249=true;
}else{
_1248=true;
var self=this;
_1241.GetMessages(Application.CONSOLE_ID,this.index,function(_124d){
if(_124d!=null){
if(Types.isDefined(_124d.CurrentSequenceNumber)){
var _124e=_124d.CurrentSequenceNumber;
if(_124e<self.index){
_1240.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_124e);
}
self.index=_124e;
var _124f=new List(_124d.ConsoleActions);
if(_124f.hasEntries()){
self.evaluate(_124f);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1240.error("No sequencenumber in MessageQueue response!");
}
}
_1248=false;
if(_1249){
_1249=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_1250){
var _1251=new List();
if(_1250.hasEntries()){
_1250.each(function(_1252){
if(this._index[_1252.Id]!=true){
_1251.add(_1252);
}
this._index[_1252.Id]=true;
},this);
if(_1251.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1251);
}else{
this._actions=_1251;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1253){
var _1254="(No reason)";
if(_1253!=null){
_1254=_1253.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1254);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1258){
if(_1258==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1259=null;
if(this._actions.hasEntries()){
var _125a=this._actions.extractFirst();
_1242=_125a.SequenceNumber;
_1240.debug("MessageQueue action: "+_125a.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1242+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_125a.ActionType){
case "OpenView":
_1259=_125a.OpenViewParams;
if(_1259.ViewType=="ModalDialog"){
openDialogView(_1259);
}else{
_1243=_1259.ViewId;
openView(_1259);
}
break;
case "CloseView":
_1259=_125a.CloseViewParams;
_1243=_1259.ViewId;
closeView(_1259);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_125a.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_1244.countEntries()+"\n";
_1244.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1240.debug(debug);
if(!_1244.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_125a.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_125a.MessageBoxParams);
break;
case "OpenViewDefinition":
_1259=_125a.OpenViewDefinitionParams;
_1243=_1259.Handle;
openViewDefinition(_1259);
break;
case "LogEntry":
logEntry(_125a.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1259=_125a.BroadcastMessageParams;
_1240.debug("Server says: EventBroadcaster.broadcast ( \""+_1259.Name+"\", "+_1259.Value+" )");
EventBroadcaster.broadcast(_1259.Name,_1259.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1244.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_125a.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_125a.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_125a.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1259=_125a.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1259.ViewId,entityToken:_1259.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1259=_125a.OpenGenericViewParams;
openGenericView(_1259);
break;
case "OpenExternalView":
_1259=_125a.OpenExternalViewParams;
openExternalView(_1259);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_125a.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1247);
}
function logEntry(_125d){
var _125e=_125d.Level.toLowerCase();
SystemLogger.getLogger(_125d.SenderId)[_125e](_125d.Message);
}
function openView(_125f){
var list=paramsToList(_125f.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_125f.ViewId);
def.entityToken=_125f.EntityToken;
def.flowHandle=_125f.FlowHandle;
def.position=_124a[_125f.ViewType],def.label=_125f.Label;
def.image=_125f.Image;
def.toolTip=_125f.ToolTip;
def.argument={"url":_125f.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_125f.ViewId,entityToken:_125f.EntityToken,flowHandle:_125f.FlowHandle,position:_124a[_125f.ViewType],url:_125f.Url,label:_125f.Label,image:_125f.Image,toolTip:_125f.ToolTip}));
}
}
function openDialogView(_1262){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1262.ViewId,flowHandle:_1262.FlowHandle,position:Dialog.MODAL,url:_1262.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1263){
var _1264=_1263.DialogType.toLowerCase();
if(_1264=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_1263.Title+"\n"+_1263.Message);
}else{
Dialog[_1264](_1263.Title,_1263.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_1265){
var map={};
var _1267=false;
new List(_1265.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1267=true;
});
var proto=ViewDefinitions[_1265.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1265.ViewId;
}
def.argument=_1267?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_126c){
var def=ViewDefinition.clone("Composite.Management.GenericView",_126c.ViewId);
def.label=_126c.Label;
def.toolTip=_126c.ToolTip;
def.image=_126c.Image;
def.argument={"url":_126c.Url,"list":paramsToList(_126c.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_126e){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_126e.ViewId);
def.label=_126e.Label;
def.toolTip=_126e.ToolTip;
def.image=_126e.Image;
def.url=_126e.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_1270){
if(StageBinding.isViewOpen(_1270.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1270.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1271){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1271.ViewId,isSuccess:_1271.Succeeded});
}
this._lockSystem=function(_1272){
var _1273=top.bindingMap.offlinetheatre;
if(_1272){
_1273.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1273.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1246=_1272;
};
this.handleBroadcast=function(_1275,arg){
switch(_1275){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1243!=null&&arg==_1243){
_1243=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_1244.set(arg,true);
}else{
_1240.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1244.hasEntries()){
_1244.del(arg);
_1240.debug("Refreshed tree: "+arg+"\n("+_1244.countEntries()+" trees left!)");
if(!_1244.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1245.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1245.hasEntries()==true){
_1245.del(arg);
if(!_1245.hasEntries()){
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
function paramsToList(_1277){
var list=new List();
new List(_1277).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _127a=false;
var _127b=false;
var _127c=null;
var _127d=false;
var _127e=Client.qualifies();
var _127f="admin";
var _1280="123456";
if(!_127e){
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
this.handleBroadcast=function(_1281){
switch(_1281){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1281);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1282=window.bindingMap.appwindow;
_1282.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1283){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1284){
if(_1283){
EventBroadcaster.subscribe(_1284,KickStart);
}else{
EventBroadcaster.unsubscribe(_1284,KickStart);
}
});
}
function kickStart(_1285){
switch(_1285){
case BroadcastMessages.AUDIO_INITIALIZED:
_127b=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_127a=true;
break;
}
if(_127a&&_127b){
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
DataManager.getDataBinding("username").setValue(_127f);
DataManager.getDataBinding("password").setValue(_1280);
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
this.doLogin=function(_1288,_1289){
var _128a=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _128b=false;
var _128c=LoginService.ValidateAndLogin(_1288,_1289);
if(_128c instanceof SOAPFault){
alert(_128c.getFaultString());
}else{
_128b=_128c;
}
if(_128b){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_128a){
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
var _128d=DataManager.getDataBinding("username");
var _128e=DataManager.getDataBinding("password");
_128d.blur();
_128e.blur();
_128d.setValue("");
_128e.setValue("");
_128d.clean();
_128e.clean();
_128d.focus();
document.getElementById("loginerror").style.display="block";
var _128f={handleAction:function(_1290){
document.getElementById("loginerror").style.display="none";
_1290.target.removeActionListener(Binding.ACTION_DIRTY,_128f);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_128f);
}
WindowManager.fireOnLoad(this);
if(!_127e){
UpdateManager.isEnabled=false;
}
};

