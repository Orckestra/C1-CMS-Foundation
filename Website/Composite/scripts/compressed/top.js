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
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_116,_117,_118,_119){
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
if(Client.isExplorer==true){
_12d=this._getWrappedHandler(_12b,_12c,_12d,_12f);
_12b[this._getAction(_12a)]("on"+_12c,_12d);
}else{
switch(_12c){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_12c=_12c==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_12b[this._getAction(_12a)](_12c,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_12d.handleEvent(e);
}
}},_12e?true:false);
break;
default:
_12b[this._getAction(_12a)](_12c,_12d,_12e?true:false);
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
_133=Client.isMozilla==true?"addEventListener":"attachEvent";
break;
case false:
_133=Client.isMozilla==true?"removeEventListener":"detachEvent";
break;
}
return _133;
},_getWrappedHandler:function(_134,_135,_136,_137){
var _138=null;
try{
if(!_136._domEventHandlers){
_136._domEventHandlers={};
}
if(!_136._domEventHandlers[_134]){
_136._domEventHandlers[_134]={};
}
if(!_136._domEventHandlers[_134][_135]){
var win=_134.nodeType?DOMUtil.getParentWindow(_134):_134;
if(win){
_136._domEventHandlers[_134][_135]=function(){
if(win.event!=null&&_136!=null){
_136.handleEvent(win.event);
}
};
}
}
_138=_136._domEventHandlers[_134][_135];
}
catch(exception){
this._report(_134,_135,_136,_137);
}
return _138;
},_deleteWrappedHandler:function(_13a){
for(var _13b in _13a._domEventHandlers){
if(_13b){
for(var _13c in _13a._domEventHandlers[_13b]){
if(_13c){
delete _13a._domEventHandlers[_13b][_13c];
}
}
}
delete _13a._domEventHandlers[_13b];
}
},_report:function(_13d,_13e,_13f,_140){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_13d?_13d.nodeName:_13d)+"\n"+"\tevent: "+_13e+"\n"+"\thandler: "+_13f+"\n\n"+"Offending invoker: "+(_140.callee?_140.callee.toString():_140.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(window.XMLSerializer?new XMLSerializer():null),serialize:function(node,_142){
var _143=null;
var _144=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_144=node.documentElement;
}
if(_144.xml!=null){
return _144.xml;
}else{
if(this._serializer!=null){
if(_142==true){
_144=_144.cloneNode(true);
_144=DOMFormatter.format(_144,DOMFormatter.INDENTED_TYPE_RESULT);
}
_143=this._serializer.serializeToString(_144);
}
}
return _143;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _147=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_148){
var doc=_148.ownerDocument;
var _14a=function(node,_14c){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _14d="",i=0;
while(i++<_14c){
_14d+=TAB;
}
var _14f=node.firstChild;
while(_14f){
switch(_14f.nodeType){
case Node.ELEMENT_NODE:
if(_14f==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_14d));
}
node.insertBefore(doc.createTextNode(NEW+_14d+TAB),_14f);
_14a(_14f,_14c+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_14d+TAB),_14f);
break;
}
if(_14f.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_14f,_14d+TAB);
}
}
_14f=_14f.nextSibling;
}
}
};
_14a(_148,0);
}
function strip(_150){
var _151=[];
var _152={acceptNode:function(_153){
return (!_147.test(_153.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _154=_150.ownerDocument.createTreeWalker(_150,NodeFilter.SHOW_TEXT,_152,true);
while(_154.nextNode()){
_151.push(_154.currentNode);
}
var i=0,_156;
while((_156=_151[i++])!=null){
_156.parentNode.removeChild(_156);
}
}
function formatCDATASection(node,_158){
if(node.textContent.indexOf(NEW)>-1){
var _159=node.textContent.split(NEW);
var _15a="",line,_15c=0,_15d=true;
while((line=_159.shift())!=null){
if(_15c==0&&line.charAt(0)==TAB){
while(line.charAt(_15c++)==TAB){
}
}
line=line.substring(_15c,line.length);
if(_159.length>0){
_15a+=_158+TAB+line;
_15a+=_15d?"":"\n";
}else{
_15a+=_158+line;
_158=_158.slice(1,_158.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_158));
}
_15d=false;
}
node.textContent=_15a;
}
}
this.format=function(_15e,_15f){
var _160=1;
if(document.createTreeWalker&&!Client.isExplorer){
try{
strip(_15e);
if(_15f!=_160){
indent(_15e);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_15e);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_161){
var sig,_163=null,_164=this.MSXML_MAXVERSION;
while(!_163&&_164>=this.MSXML_MINVERSION){
try{
sig=_161.replace("{$version}",_164);
_163=new ActiveXObject(sig);
}
catch(exception){
}
_164--;
}
return _163;
},getXMLHTTPRequest:function(){
var _165=null;
if(Client.isExplorer){
_165=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_165=new XMLHttpRequest();
}
return _165;
},getDOMDocument:function(_166){
var _167=null;
if(Client.isExplorer){
_167=this.getMSComponent(_166?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_167=doc;
}
return _167;
},getMSXMLXSLTemplate:function(){
var _169=null;
if(Client.isExplorer){
_169=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _169;
},getLocalName:function(_16a){
var _16b=null;
if(_16a.localName){
_16b=_16a.localName.replace("ui:","");
}else{
if(_16a.baseName){
_16b=_16a.baseName;
}else{
_16b=_16a.nodeName.toLowerCase();
}
}
return _16b;
},getComputedStyle:function(_16c,_16d){
var _16e=null;
if(Client.isExplorer){
if(_16c.currentStyle!=null){
_16e=_16c.currentStyle[_16d];
}else{
this._logger.error("Could not compute style for element "+_16c.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _16f=_16c.ownerDocument.defaultView.getComputedStyle(_16c,null);
if(_16f!=null){
_16e=_16f.getPropertyValue(_16d);
}else{
this._logger.error("Could not compute style for element "+_16c.nodeName);
SystemDebug.stack(arguments);
}
}
return _16e;
},getMaxIndex:function(doc){
var max=0,_172=new List(doc.getElementsByTagName("*"));
_172.each(function(_173){
var _174=CSSComputer.getZIndex(_173);
if(_174>max){
max=_174;
}
});
return max;
},getOrdinalPosition:function(_175,_176){
var _177=null;
var _178=-1;
var _179=this.getLocalName(_175);
var _17a=new List(_175.parentNode.childNodes);
while(_17a.hasNext()){
var _17b=_17a.getNext();
if(_17b.nodeType==Node.ELEMENT_NODE){
if(!_176||this.getLocalName(_17b)==_179){
_178++;
if(_17b==_175||(_17b.id!=""&&_17b.id==_175.id)){
_177=_178;
break;
}
}
}
}
return _177;
},isFirstElement:function(_17c,_17d){
return (this.getOrdinalPosition(_17c,_17d)==0);
},isLastElement:function(_17e,_17f){
var _180=_17e.parentNode.getElementsByTagName(_17f?this.getLocalName(_17e):"*");
return (this.getOrdinalPosition(_17e)==_180.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _184=null;
if(node.textContent){
_184=node.textContent;
}else{
if(node.text){
_184=node.text;
}else{
_184=node.innerText;
}
}
return _184;
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
},getAncestorByLocalName:function(_187,node,_189){
var _18a=null;
while(_18a==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_189==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_187){
_18a=node;
}
}
return _18a;
},contains:function(_18c,node){
return _18c.contains?_18c!=node&&_18c.contains(node):!!(_18c.compareDocumentPosition(node)&16);
},createElementNS:function(_18e,_18f,_190){
var _191=null;
if(_190==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_191=_190.createElementNS(_18e,_18f);
}else{
if(_190.xml!=null){
_191=_190.createNode(Node.ELEMENT_NODE,_18f,_18e);
}else{
_191=_190.createElement(_18f.replace("ui:",""));
}
}
}
return _191;
},getElementsByTagName:function(node,_193){
var _194=null;
if(Client.isMozilla){
_194=node.getElementsByTagNameNS(Constants.NS_XHTML,_193);
}else{
_194=node.getElementsByTagName(_193);
}
return _194;
},getNextElementSibling:function(_195){
return Client.isExplorer?_195.nextSibling:_195.nextElementSibling;
},getPreviousElementSibling:function(_196){
return Client.isExplorer?_196.previousSibling:_196.previousElementSibling;
},cloneNode:function(node){
var _198=null;
if(Client.isMozilla==true){
_198=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_198=node.cloneNode(true);
}
return _198;
},getLocalPosition:function(_199){
var _19a=new Point(_199.offsetLeft,_199.offsetTop);
if(Client.isExplorer&&_199.parentNode&&_199.parentNode.currentStyle){
if(_199.parentNode.currentStyle.position=="static"){
var _19b=this.getLocalPosition(_199.parentNode);
_19a.x+=_19b.x;
_19a.y+=_19b.y;
}
}
return _19a;
},getGlobalPosition:function(_19c){
return this._getPosition(_19c,false);
},getUniversalPosition:function(_19d){
return this._getPosition(_19d,true);
},_getPosition:function(_19e,_19f){
var _1a0=null;
if(typeof _19e.getBoundingClientRect!=Types.UNDEFINED){
var rect=_19e.getBoundingClientRect();
_1a0={x:rect.left,y:rect.top};
if(Client.isMozilla){
_1a0.x-=_19e.scrollLeft;
_1a0.y-=_19e.scrollTop;
}
}else{
_1a0={x:_19e.offsetLeft-_19e.scrollLeft,y:_19e.offsetTop-_19e.scrollTop};
while(_19e.offsetParent){
_19e=_19e.offsetParent;
_1a0.x+=(_19e.offsetLeft-_19e.scrollLeft);
_1a0.y+=(_19e.offsetTop-_19e.scrollTop);
}
}
if(_19f){
var win=DOMUtil.getParentWindow(_19e);
if(win){
var _1a3=win.frameElement;
if(_1a3){
var add=DOMUtil.getUniversalPosition(_1a3);
_1a0.x+=add.x;
_1a0.y+=add.y;
}
}
}
return new Point(_1a0.x,_1a0.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1a8){
var _1a9=DOMEvents.getTarget(e);
var _1aa={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_1a9.ownerDocument;
var win=this.getParentWindow(doc);
_1aa.x-=win.pageXOffset;
_1aa.y-=win.pageYOffset;
}
if(_1a8){
var _1ad=this.getParentWindow(_1a9).frameElement;
if(_1ad){
var add=this.getUniversalPosition(_1ad);
_1aa.x+=add.x;
_1aa.y+=add.y;
}
}
return _1aa;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null&&window.XPathResult!=null?new DOMParser():null),parse:function(xml,_1b0){
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
if(!_1b0){
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
if(!_1b0){
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
},isWellFormedDocument:function(xml,_1b3){
var _1b4=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1b6=SourceValidationService.IsWellFormedDocument(xml);
if(_1b6!="True"){
_1b4=false;
if(_1b3==true){
this._illFormedDialog(_1b6);
}
}
return _1b4;
},isWellFormedFragment:function(xml,_1b8){
var _1b9=true;
var _1ba=SourceValidationService.IsWellFormedFragment(xml);
if(_1ba!="True"){
_1b9=false;
if(_1b8==true){
this._illFormedDialog(_1ba);
}
}
return _1b9;
},_illFormedDialog:function(_1bb){
setTimeout(function(){
if(Client.isWebKit){
alert(_1bb);
}else{
Dialog.error("Not well-formed",_1bb);
}
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1bc){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1bd){
return _1bc[_1bd];
}};
}else{
this._nsResolver=_1bc;
}
};
XPathResolver.prototype.resolve=function(_1be,node,_1c0){
var _1c1=null;
try{
if(this._evaluator){
_1c1=this._evaluateDOMXpath(_1be,node,_1c0?true:false);
}else{
_1c1=this._evaluateMSXpath(_1be,node,_1c0?true:false);
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
return _1c1;
};
XPathResolver.prototype.resolveAll=function(_1c2,node){
return this.resolve(_1c2,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1c4,node,_1c6){
var _1c7=null;
if(node){
var _1c7=this._evaluator.evaluate(_1c4,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1c6){
var list=new List();
while((node=_1c7.iterateNext())!=null){
list.add(node);
}
_1c7=list;
}else{
_1c7=_1c7.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1c7;
};
XPathResolver.prototype._evaluateMSXpath=function(_1ca,node,_1cc){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1ce="";
for(var _1cf in this._nsResolver){
_1ce+="xmlns:"+_1cf+"=\""+this._nsResolver[_1cf]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1ce);
if(_1cc){
var list=new List();
var i=0,_1d2=node.selectNodes(_1ca);
while(i<_1d2.length){
list.add(_1d2.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1ca);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1d4=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1d4);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1d4;
}
};
XSLTransformer.prototype._import=function(url){
var _1d6=null;
if(Client.isMozilla){
var _1d7=DOMUtil.getXMLHTTPRequest();
_1d7.open("get",Resolver.resolve(url),false);
_1d7.send(null);
_1d6=_1d7.responseXML;
}else{
var _1d6=DOMUtil.getDOMDocument(true);
_1d6.async=false;
_1d6.load(url);
}
return _1d6;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1d9=null;
if(Client.isMozilla){
_1d9=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1d9;
};
XSLTransformer.prototype.transformToString=function(dom,_1db){
var _1dc=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1dc=DOMSerializer.serialize(doc,_1db);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1dc=proc.output;
}
return _1dc;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1df){
var _1e0=_1df.style?_1df.className:_1df.getAttribute("class");
_1e0=_1e0?_1e0:"";
return _1e0;
},_contains:function(_1e1,sub){
return _1e1.indexOf(sub)>-1;
},_attach:function(_1e3,sub){
return _1e3+(_1e3==""?"":" ")+sub;
},_detach:function(_1e5,sub){
if(this._contains(_1e5," "+sub)){
sub=" "+sub;
}
return _1e5.replace(sub,"");
},attachClassName:function(_1e7,_1e8){
if(_1e7.classList!=null){
if(!_1e7.classList.contains(_1e8)){
_1e7.classList.add(_1e8);
}
}else{
var _1e9=this._getCurrent(_1e7);
if(!this._contains(_1e9,_1e8)){
_1e9=this._attach(_1e9,_1e8);
}
if(_1e7.style!=null){
_1e7.className=_1e9;
}else{
_1e7.setAttribute("class",_1e9);
}
}
},detachClassName:function(_1ea,_1eb){
if(_1ea.classList!=null){
if(_1ea.classList.contains(_1eb)){
_1ea.classList.remove(_1eb);
}
}else{
var _1ec=this._getCurrent(_1ea);
if(this._contains(_1ec,_1eb)){
_1ec=this._detach(_1ec,_1eb);
}
if(_1ea.style!=null){
_1ea.className=_1ec;
}else{
if(_1ec==""){
_1ea.removeAttribute("class");
}else{
_1ea.setAttribute("class",_1ec);
}
}
}
},hasClassName:function(_1ed,_1ee){
var _1ef=false;
if(_1ed.classList!=null){
_1ef=_1ed.classList.contains(_1ee);
}else{
_1ef=this._contains(this._getCurrent(_1ed),_1ee);
}
return _1ef;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1f0,_1f1){
var _1f2={};
for(var _1f3 in _1f0){
var ent=parseInt(DOMUtil.getComputedStyle(_1f1,_1f0[_1f3]));
_1f2[_1f3]=isNaN(ent)?0:ent;
}
return _1f2;
},_getMargin:function(_1f5){
return this._getComplexResult(this._margins,_1f5);
},getPadding:function(_1f6){
return this._getComplexResult(this._paddings,_1f6);
},getBorder:function(_1f7){
return this._getComplexResult(this._borders,_1f7);
},getPosition:function(_1f8){
return DOMUtil.getComputedStyle(_1f8,"position");
},getFloat:function(_1f9){
return DOMUtil.getComputedStyle(_1f9,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1fa){
return parseInt(DOMUtil.getComputedStyle(_1fa,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1fb){
return DOMUtil.getComputedStyle(_1fb,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1fc=SystemLogger.getLogger("System");
var root=null;
var _1fe=null;
this.hasActivePerspectives=false;
this.getDefaultEntityToken=function(_1ff){
if(_1fe==null){
_1fe={};
new List(TreeService.GetDefaultEntityTokens(true)).each(function(_200){
_1fe[_200.Key]=_200.Value;
});
}
return _1fe[_1ff];
};
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _201=new List();
var _202=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_202);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_204){
_201.add(new SystemNode(_204));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _201;
};
this.getChildNodes=function(node,_206){
var _207=new List();
var _208=null;
if(_206){
if(SearchTokens.hasToken(_206)){
_206=SearchTokens.getToken(_206);
}
_208=TreeService.GetElementsBySearchToken(node.getData(),_206);
}else{
_208=TreeService.GetElements(node.getData());
}
new List(_208).each(function(_209){
var _20a=new SystemNode(_209);
if(_206){
_20a.searchToken=_206;
}
_207.add(_20a);
});
return _207;
};
this.getDescendantBranch=function(_20b){
var map=new Map();
var arg=[];
_20b.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _20f=TreeService.GetMultipleChildren(arg);
var _210=new List(_20f);
while(_210.hasNext()){
this._listNodesInMap(_210.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_211,_212,_213){
var map=new Map();
var arg=[];
_213.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _217=TreeService.FindEntityToken(_211,_212,arg);
if(_217 instanceof SOAPFault){
_1fc.error(_217.getFaultString());
if(Application.isDeveloperMode){
alert(_217.getFaultString());
}
map=null;
}else{
var _218=new List(_217);
while(_218.hasNext()){
this._listNodesInMap(_218.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_219,map){
var list=new List();
var key=_219.ElementKey;
var _21d=new List(_219.ClientElements);
map.set(key,list);
while(_21d.hasNext()){
var _21e=_21d.getNext();
list.add(new SystemNode(_21e));
}
};
this.getChildNodesBySearchToken=function(node,_220){
return this.getChildNodes(node,_220);
};
this.getNamedRoots=function(key,_222){
var _223=new List();
var _224=null;
if(_222){
if(SearchTokens.hasToken(_222)){
_222=SearchTokens.getToken(_222);
}
_224=TreeService.GetNamedRootsBySearchToken(key,_222);
}else{
_224=TreeService.GetNamedRoots(key);
}
new List(_224).each(function(_225){
var node=new SystemNode(_225);
if(_222){
node.searchToken=_222;
}
_223.add(node);
});
return _223;
};
this.getNamedRootsBySearchToken=function(key,_228){
return this.getNamedRoots(key,_228);
};
function compileActionList(node,_22a,_22b){
var _22c=_22a.ClientElementActionGroupId;
if(_22c!=null){
var _22d=_22b.get(_22c).ClientElementActionGroupItems;
if(_22d&&_22d.length>0){
node.setActionList(new List(_22d));
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
new List(self._data.Actions).each(function(_233){
var _234=_233.ActionCategory.Name;
if(SystemAction.hasCategory(_234)){
var _235=new SystemAction(_233);
SystemAction.actionMap.set(_233.ActionKey,_235);
}else{
throw "No such action category: "+_234;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _236=null;
if(this.searchToken){
_236=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_236=System.getChildNodes(this);
}
return _236;
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
var _238=this._data.Piggybag;
if(_238==null){
_238="";
}
return _238;
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
var _23a=null;
if(typeof this._data.ToolTip!="undefined"){
_23a=this._data.ToolTip;
}
return _23a;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_23c){
map[_23c.Key]=_23c.Value;
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
var _240=SystemAction.actionMap.get(key);
var _241=true;
if(_240.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_241=false;
}
}
if(_241){
var id=_240.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_240);
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
SystemAction.invoke=function(_244,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_244.logger.debug("Execute \""+_244.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_244.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_247,_248){
action=SystemAction.taggedActions.get(_247);
node=SystemNode.taggedNodes.get(_248);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_249){
return SystemAction.categories[_249]?true:false;
};
function SystemAction(_24a){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_24a;
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
var _24b=null;
if(this.isInFolder()){
_24b=this._data.ActionCategory.FolderName;
}
return _24b;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _24c=null;
if(typeof this._data.TagValue!="undefined"){
_24c=this._data.TagValue;
}
return _24c;
};
SystemAction.prototype.isChecked=function(){
var _24d=null;
if(this.isCheckBox()){
_24d=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _24d;
};
function _UpdateManager(){
var _24e=null;
if(!window.UpdateManager){
this._construct();
_24e=this;
}
return _24e;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_24f){
var root=document.documentElement;
var _251=root.namespaceURI;
if(_251==null){
_251=new String(root.getAttribute("xmlns"));
}
if(_251=="http://www.w3.org/1999/xhtml"){
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
var _252=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_252);
}else{
throw new TypeError();
}
}else{
var _253=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_253.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _255=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_255=true;
}
},this);
return _255;
},_setupForm:function(form){
var _258=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_258.isEnabled){
_258._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_259,type){
if(_259.addEventListener!=null){
_259.addEventListener(type,this,false);
}else{
var _25b=this;
_259.attachEvent("on"+type,function(){
_25b.handleEvent(window.event);
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
var _260=UpdateAssistant.getUpdateZones(dom);
var _261=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_260.forEach(function(_262,_263){
var _264=_261[_263];
this._crawl(_262,_264);
},this);
this._updates.forEach(function(_265,_266){
_265.update();
_265.dispose();
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
},_crawl:function(_268,_269,_26a,id){
var _26c=true;
var _26d=_269.getAttribute("class");
if(_26d==null||_26d.indexOf(this.CLASSNAME_GONE)==-1){
if(_269.nodeType==Node.ELEMENT_NODE){
var _26e=_269.getAttribute("id");
if(_26e!=null){
_26a=_268;
id=_26e;
}
}
if(_26c=this._check(_268,_269,_26a,id)){
var _26f=_268.firstChild;
var _270=_269.firstChild;
while(_26f!=null&&_270!=null&&!this._replaced[id]){
switch(_26f.nodeType){
case Node.TEXT_NODE:
_26c=this._check(_26f,_270,_26a,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_26c=this._crawl(_26f,_270,_26a,id);
break;
}
if(this._replaced[id]){
_26c=false;
}else{
_26f=_26f.nextSibling;
_270=_270.nextSibling;
}
}
}
}
return _26c;
},_check:function(_271,_272,_273,id){
var _275=true;
var _276=null;
var _277=false;
var _278=false;
if((_271!=null&&_272==null)||(_271==null&&_272!=null)){
_275=false;
}else{
if(_275=_271.nodeType==_272.nodeType){
switch(_272.nodeType){
case Node.ELEMENT_NODE:
if(_271.namespaceURI!=_272.namespaceURI||_271.nodeName!=_272.nodeName){
_275=false;
}else{
if(_275=(_271.nodeName==_272.nodeName)){
var _279=_272.getAttribute("id");
var _27a=_271.getAttribute("id");
if(_279!=null&&_27a!=null){
if(_279!=_27a){
_275=false;
}else{
if((_276=this._getPlugin(_271,_272))!=null){
if(_276.updateElement(_271,_272)){
_278=true;
_275=false;
}
}
}
}
if(_275){
if(_275=this._checkAttributes(_271,_272)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_271)&&this._hasSoftChildren(_272)){
if(this._validateSoftChildren(_271,_272)){
this._updateSoftChildren(_271,_272);
_277=true;
}
_275=false;
}else{
_275=_271.childNodes.length==_272.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_271.data.trim()!=_272.data.trim()){
_275=false;
}
break;
}
}
}
if(_275==false&&!_277&&!_278){
if(id!=null&&_273!=null){
this.addUpdate(new ReplaceUpdate(id,_273));
}
}
return _275;
},_checkAttributes:function(_27b,_27c){
var _27d=true;
var _27e=false;
var _27f=_27b.attributes;
var _280=_27c.attributes;
if(_27f.length!=_280.length){
_27e=true;
}else{
_27e=!Array.every(_27f,function(att1,i){
var att2=_280.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_27e){
var _284=_27b.getAttribute("id");
var _285=_27c.getAttribute("id");
if(this.hasSoftAttributes&&_284!=null&&_284==_285){
this.addUpdate(new AttributesUpdate(_285,_27b,_27c));
}else{
_27d=false;
}
}
return _27d;
},_hasSoftChildren:function(_286){
var _287=true;
if(_286.hasChildNodes()){
_287=Array.every(_286.childNodes,function(node){
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
return _287;
},_validateSoftChildren:function(_28a,_28b){
var _28c=true;
var _28d=-1;
var _28e=-1;
var _28f=-1;
var news=this._toMap(_28a.childNodes,true);
var olds=this._toMap(_28b.childNodes,true);
for(var id in olds){
if(_28c){
var _293=olds[id];
_28c=_293>=_28d;
if(news[id]!=null){
_28f=news[id];
_28c=_28f>=_28e;
}
}
_28d=_293;
if(_28f>-1){
_28e=_28f;
}
}
return _28c;
},_updateSoftChildren:function(_294,_295){
var news=this._toMap(_294.childNodes);
var olds=this._toMap(_295.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _299=null;
for(id in news){
if(olds[id]==null){
var _29a=news[id];
if(_299==null){
var _29b=_295.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_29b,_29a,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_299,_29a,false));
}
}
_299=id;
}
},addUpdate:function(_29c){
this._updates.push(_29c);
if(_29c instanceof ReplaceUpdate){
this._replaced[_29c.id]=true;
}
},_getPlugin:function(_29d,_29e){
var _29f=null;
this.plugins.every(function(_2a0){
if(_2a0.handleElement(_29d,_29e)){
_29f=_2a0;
}
return _29f==null;
});
return _29f;
},_toMap:function(_2a1,_2a2){
var _2a3={};
Array.forEach(_2a1,function(node,_2a5){
if(node.nodeType==Node.ELEMENT_NODE){
_2a3[node.getAttribute("id")]=_2a2?_2a5:node;
}
});
return _2a3;
},_getPost:function(form){
var _2a7=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2a9){
if(_2a9.name==null||_2a9.name==""){
return;
}
var name=_2a9.name;
var _2ab=encodeURIComponent(_2a9.value);
switch(_2a9.type){
case "button":
case "submit":
var _2ac=UpdateAssistant.getActiveElement();
if(_2a9==_2ac&&name!=""){
_2a7+=name+"="+_2ab+"&";
}
break;
case "radio":
if(_2a9.checked){
_2a7+=name+"="+_2ab+"&";
}
break;
case "checkbox":
if(_2a9.checked){
if(_2a9.name==last){
if(_2a7.lastIndexOf("&")==_2a7.length-1){
_2a7=_2a7.substr(0,_2a7.length-1);
}
_2a7+=","+_2ab;
}else{
_2a7+=name+"="+_2a9.value;
}
last=name;
_2a7+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2a7+=name+"="+_2ab+"&";
break;
}
});
}
return _2a7.substr(0,_2a7.length-1);
},_postRequest:function(form){
var _2ae=form.method!=""?form.method:"get";
var _2af=form.action!=""?form.action:window.location.toString();
var _2b0=this._getPost(form);
if(_2ae=="get"){
if(_2af.indexOf("?")>-1){
_2af=_2af+"&"+_2b0;
}else{
_2af+"?"+_2b0;
}
}
var _2b1=this;
var _2b2=UpdateAssistant.getXMLHttpRequest(_2ae,_2af,this);
if(_2ae=="post"){
_2b2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2b2.send(_2ae=="post"?_2b0:null);
},_fixdotnet:function(dom,id){
var _2b5=document.getElementById(id);
if(_2b5!=null){
var _2b6=UpdateAssistant.getElementById(dom,id);
if(_2b6!=null){
var _2b7=_2b6.getAttribute("value");
if(_2b7!==_2b5.value){
_2b5.value=_2b7;
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
},report:function(_2ba){
this.summary+=_2ba+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2bb=null;
if(!window.UpdateAssistant){
this._construct();
_2bb=this;
}
return _2bb;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2bc,fun){
var _2be=true;
var len=_2bc.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c0=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2bc[i]!="undefined"){
if(!fun.call(_2c0,_2bc[i],i,_2bc)){
_2be=false;
break;
}
}
}
}
return _2be;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2c3=arguments[1];
return Array.every(this,fun,_2c3);
};
}
if(!Array.forEach){
Array.forEach=function(_2c4,fun){
var len=_2c4.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c7=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2c4[i]!="undefined"){
fun.call(_2c7,_2c4[i],i,_2c4);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2ca=arguments[1];
Array.forEach(this,fun,_2ca);
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
},getXMLHttpRequest:function(_2cc,_2cd,_2ce){
var _2cf=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2cf!=null){
_2cf.open(_2cc,_2cd,(_2ce!=null?true:false));
if(_2ce!=null){
function action(){
if(_2cf.readyState==4){
var text=_2cf.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2ce.handleResponse(dom);
}
}
}
if(_2cf.addEventListener!=null){
_2cf.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2cf.onreadystatechange=action;
}
}
}
return _2cf;
},dispatchEvent:function(_2d2,name){
var _2d4=true;
if(_2d2.fireEvent!=null){
_2d4=_2d2.fireEvent("on"+name);
}else{
var _2d5=document.createEvent("UIEvents");
_2d5.initEvent(name,true,true);
_2d4=_2d2.dispatchEvent(_2d5);
}
return _2d4;
},getUpdateZones:function(dom){
var _2d7="//*[@id and contains(@class,'updatezone')]";
var _2d8=[];
var _2d9=null;
var _2da=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d9=dom.evaluate(_2d7,dom,null,type,null);
while((_2da=_2d9.iterateNext())!=null){
_2d8.push(_2da);
}
}else{
_2d9=dom.documentElement.selectNodes(_2d7);
Array.forEach(_2d9,function(_2dc){
_2d8.push(_2dc);
});
}
return _2d8;
},getElementById:function(dom,id){
var _2df="//*[@id='"+id+"']";
var _2e0=null;
var _2e1=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2e0=dom.evaluate(_2df,dom,null,type,null);
_2e1=_2e0.singleNodeValue;
}else{
_2e1=dom.documentElement.selectNodes(_2df)[0];
}
return _2e1;
},_getIds:function(dom){
var _2e4="//*[@id]";
var _2e5=null;
var _2e6=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e5=dom.evaluate(_2e4,dom,null,type,null);
while((element=_2e5.iterateNext())!=null){
_2e6.push(element.getAttribute("id"));
}
}else{
_2e5=dom.documentElement.selectNodes(_2e4);
Array.forEach(_2e5,function(_2e8){
_2e6.push(_2e8.getAttribute("id"));
});
}
return _2e6;
},toHTMLElement:function(_2e9){
var _2ea=this.serialize(_2e9);
var temp=document.createElement("temp");
temp.innerHTML=_2ea;
return temp.firstChild;
},getActiveElement:function(){
var _2ec=document.activeElement;
if(_2ec==null||_2ec==document.body){
_2ec=this._activeElement;
}
return _2ec;
},serialize:function(_2ed){
var _2ee=null;
if(_2ed.xml!=null){
_2ee=_2ed.xml;
}else{
if(this._serializer!=null){
_2ee=this._serializer.serializeToString(_2ed);
}
}
return _2ee;
},hasDifferences:function(_2ef,_2f0){
var s1=null;
var s2=null;
if(_2ef.xml!=null){
s1=_2ef.xml;
s2=_2f0.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2ef);
s2=this._serializer.serializeToString(_2f0);
}
}
return s1!=s2;
},parse:function(_2f3){
var _2f4=null;
if(this._parser!=null&&window.XPathResult!=null){
_2f4=this._parser.parseFromString(_2f3,"text/xml");
}else{
_2f4=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2f4.setProperty("SelectionLanguage","XPath");
_2f4.loadXML(_2f3);
}
return this._validate(_2f4);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f7=dom.getElementsByTagName("parsererror").item(0);
if(_2f7!=null){
out=_2f7.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2fb=!has[id];
has[id]=true;
if(!_2fb){
out="Element \""+id+"\" encountered twice.";
}
return _2fb;
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
this.handleElement=function(_2fc,_2fd){
var _2fe=false;
switch(_2fc.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2fc.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2fe=false;
break;
}
break;
}
return _2fe;
};
this.updateElement=function(_2ff,_300){
var id=_2ff.getAttribute("id");
var _302=document.getElementById(id);
if(_302!=null){
var _303=null;
switch(_302.nodeName.toLowerCase()){
case "input":
_303=_2ff.getAttribute("value");
break;
case "textarea":
_303=_2ff.textContent?_2ff.textContent:_2ff.text;
break;
}
if(_303==null){
_303="";
}
if(_303!=_302.value){
_302.value=_303;
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
},_beforeUpdate:function(_304){
var _305=true;
if(_304!=null){
_304.__updateType=this.type;
_305=UpdateAssistant.dispatchEvent(_304,Update.EVENT_BEFOREUPDATE);
}
return _305;
},_afterUpdate:function(_306){
var _307=true;
if(_306!=null){
_306.__updateType=this.type;
_307=UpdateAssistant.dispatchEvent(_306,Update.EVENT_AFTERUPDATE);
}
return _307;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_309){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_309;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _30a,_30b,_30c=UpdateAssistant.toHTMLElement(this.element);
if((_30a=document.getElementById(this.id))!=null){
if((_30b=_30a.parentNode)!=null){
var _30d=UserInterface.getBinding(_30a);
if(_30d!=null){
_30c.__isAttached=_30d.isAttached;
}
if(this._beforeUpdate(_30a)){
_30b.replaceChild(_30c,_30a);
this._afterUpdate(_30c);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_30e){
var _30f=ReplaceUpdate.superclass._afterUpdate.call(this,_30e);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_30e.nodeName=="form"||_30e.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _30f;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_312,_313){
this.type=type;
this.id=id;
this.element=_312;
this.isFirst=_313;
return this;
}
SiblingUpdate.prototype.update=function(){
var _314=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_314);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_314);
break;
}
};
SiblingUpdate.prototype._remove=function(_315){
var _316=_315.parentNode;
if(_316!=null){
if(this._beforeUpdate(_315)){
_316.removeChild(_315);
this._afterUpdate(_316);
}
}
};
SiblingUpdate.prototype._insert=function(_317,_318){
var _319=UpdateAssistant.toHTMLElement(_317);
if(this.isFirst){
var _31a=_318;
if(_31a!=null){
if(this._beforeUpdate(_31a)){
_31a.insertBefore(_319,_31a.firstChild);
this._afterUpdate(_319);
}
}
}else{
var _31a=_318.parentNode;
if(_31a!=null){
if(this._beforeUpdate(_31a)){
_31a.insertBefore(_319,_318.nextSibling);
this._afterUpdate(_319);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_31b){
var _31c=SiblingUpdate.superclass._beforeUpdate.call(this,_31b);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_31b.id+"\"");
}
return _31c;
};
SiblingUpdate.prototype._afterUpdate=function(_31d){
var _31e=true;
if(_31d!=null){
_31e=SiblingUpdate.superclass._afterUpdate.call(this,_31d);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_31d.id+"\"");
if(_31d.nodeName=="form"||_31d.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _31e;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_320,_321){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_320;
this.currentElement=_321;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _322=document.getElementById(this.id);
if(this._beforeUpdate(_322)){
this._updateAttributes(_322);
this._afterUpdate(_322);
}
};
AttributesUpdate.prototype._updateAttributes=function(_323){
Array.forEach(this.element.attributes,function(_324){
var _325=this.currentElement.getAttribute(_324.nodeName);
if(_325==null||_325!=_324.nodeValue){
this._setAttribute(_323,_324.nodeName,_324.nodeValue);
this._summary.push("@"+_324.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_326){
if(this.element.getAttribute(_326.nodeName)==null){
this._setAttribute(_323,_326.nodeName,null);
this._summary.push("@"+_326.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_327,name,_329){
if(_327==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_329);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _32a=(_329==null);
if(_32a){
_327.removeAttribute(name);
}else{
_327.setAttribute(name,_329);
}
if(document.all!=null){
if(_32a){
_329="";
}
switch(name.toLowerCase()){
case "class":
_327.className=_329;
break;
case "disabled":
_327.disabled=!_32a;
break;
case "checked":
_327.checked=!_32a;
break;
case "readonly":
_327.readOnly=!_32a;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_32b){
AttributesUpdate.superclass._afterUpdate.call(this,_32b);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_32c,key){
return _32c.replace("${windowkey}",document.location+":"+key);
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
var _330=this._newDimensions.w!=this._currentDimensions.w;
var _331=this._newDimensions.h!=this._currentDimensions.h;
if(_330||_331){
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
},fireOnDOM:function(_333){
if(Interfaces.isImplemented(IDOMHandler,_333,true)){
this._ondomstatements.add(_333);
}
},fireOnLoad:function(_334){
if(Interfaces.isImplemented(ILoadHandler,_334,true)){
this._onloadstatements.add(_334);
}
},fireOnResize:function(_335){
if(Interfaces.isImplemented(IResizeHandler,_335,true)){
this._onresizestatements.add(_335);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_336){
return eval(_336);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_337,_338){
SystemLogger.unsuspend(_338);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_339,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _33c=top.app.bindingMap.broadcasterHasDirtyTabs;
_33c.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_33d,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _340=top.app.bindingMap.broadcasterHasDirtyTabs;
_340.disable();
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
var _341=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_341=LoginService.Logout(true);
if(!_341){
alert("Logout failed.");
}
}
return _341;
},lock:function(_342){
if(_342!=null){
this._lockthings[_342]=true;
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
},unlock:function(_343,_344){
if(_343!=null){
delete this._lockthings[_343];
if(top.bindingMap.mastercover!=null){
if(_344||this._lockers>0){
if(_344){
var out="Unlocked by "+new String(_343)+"\n";
for(var _346 in this._lockthings){
out+="Locked by "+new String(_346)+". ";
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
},hasLock:function(_347){
return this._lockthings[_347]==true;
},activate:function(_348){
var _349=this._activeBinding;
this._activeBinding=_348;
this._activatedBindings.add(_348);
if(_349&&_349.isActive){
_349.deActivate();
}
},deActivate:function(_34a){
var _34b=null;
var _34c=null;
if(_34a==this._activeBinding){
while(!_34c&&this._activatedBindings.hasEntries()){
_34b=this._activatedBindings.extractLast();
if(_34b!=_34a&&_34b.isActivatable){
_34c=_34b;
}
}
if(!_34c){
_34c=app.bindingMap.explorerdock;
}
_34c.activate();
}
},focused:function(_34d){
this.isFocused=_34d;
if(_34d){
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
},handleAction:function(_352){
switch(_352.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _354=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_356){
var src=_356.src;
if(src.indexOf(_354)>-1){
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
var _35b=false;
if(this._isMousePositionTracking){
_35b=true;
if(Client.isExplorer&&e.button!=1){
_35b=false;
}
if(_35b){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _35b;
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
},onDragStart:function(_35d){
var _35e=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_35e,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_35e.getImage());
this._cursorStartPoint=_35d;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_35e.showDrag){
_35e.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_35e.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _360=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_360);
}
},onDragStop:function(diff){
if(this._isDragging){
var _362=BindingDragger.draggedBinding;
if(_362.hideDrag){
_362.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_362.dragType);
this._isDragging=false;
_362=BindingAcceptor.acceptingBinding;
if(_362!=null){
if(Interfaces.isImplemented(IAcceptable,_362,true)==true){
_362.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_362);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_363){
if(this.isDeveloperMode||_363){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_364){
if(_364==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_365){
switch(_365){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_367){
switch(_367.Key){
case "ProductVersion":
this.versionString=_367.Value;
break;
case "ProductTitle":
this.versionPrettyString=_367.Value;
break;
case "InstallationId":
this.installationID=_367.Value;
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
},initialize:function(_36a){
if(!this.isInitialized){
this.isInitialized=true;
if(_36a){
this._audio=_36a;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _36c=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_36c=true;
}
return _36c;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _36d=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _36e={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _36f=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_36f){
for(var key in _36f){
_36e[key]=_36f[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_36e);
}
}});
this.getPref=function(key){
var _372=null;
if(key){
_372=_36e[key];
}else{
throw "No such preference.";
}
return _372;
};
this.setPref=function(key,_374){
if(key){
_36e[key]=_374;
}else{
throw "No such preference.";
}
};
function debug(_375){
var _376=_375?"Persisted preferences":"No persisted preferences. Using defaults";
_376+=":\n";
for(var key in _36e){
var pref=_36e[key];
_376+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_36d.fine(_376);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _37b=null;
if(this.isInitialized==true){
if(this._persistance){
var _37c=this._persistance[id];
if(_37c){
_37b=_37c[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _37b;
},setPersistedProperty:function(id,prop,_37f){
if(this.isInitialized==true){
if(this._persistance){
if(_37f!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_37f);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_380){
switch(_380){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _381=top.bindingMap.persistance;
_381.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _382=top.bindingMap.persistance;
var map=_382.getPersistanceMap();
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
function StandardEventHandler(doc,_385){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_385;
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
var _387={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_387);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_387);
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
var _38e=UserInterface.getBinding(node);
if(_38e!=null){
_38e.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_38e!=null?null:node.parentNode;
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
var _391=Application.trackMousePosition(e);
if(_391){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_393){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_393){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_393=true;
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
var _394=KeySetBinding.handleKey(this._contextDocument,e);
if(!_394){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _395=this._contextWindow.frameElement;
if(_395!=null){
var _396=DOMUtil.getParentWindow(_395);
if(_396.standardEventHandler!=null){
_396.standardEventHandler._handleKeyDown(e,_393);
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
var _399=false;
var _39a=DOMEvents.getTarget(e);
var name=_39a.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_399=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_399;
}
if(_399){
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
StandardEventHandler.prototype.enableNativeKeys=function(_39d){
this._isAllowTabs=(_39d==true?true:false);
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
function Action(_3a0,type){
this.target=_3a0;
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
function Animation(_3a2){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _3a3 in _3a2){
this[_3a3]=_3a2[_3a3];
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
Animation.prototype.onstart=function(_3a7){
};
Animation.prototype.onstep=function(_3a8){
};
Animation.prototype.onstop=function(_3a9){
};
Point.isEqual=function(p1,p2){
var _3ac=false;
if(p1&&p2){
_3ac=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3ac;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3b1=false;
if(dim1&&dim2){
_3b1=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3b1;
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
function BindingAcceptor(_3b8){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b8;
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
var _3b9=new List(this._binding.dragAccept.split(" "));
while(_3b9.hasNext()){
var type=_3b9.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3bb,arg){
var type=arg;
try{
switch(_3bb){
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
function BindingBoxObject(_3c0){
this._domElement=_3c0.getBindingElement();
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
function BindingDragger(_3c2){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3c2;
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
BindingDragger.prototype.registerHandler=function(_3c4){
if(Interfaces.isImplemented(IDragHandler,_3c4)==true){
this.handler=_3c4;
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
var _3c7=e.button==(e.target?0:1);
if(_3c7){
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
var _3c9=Application.getMousePosition();
var dx=_3c9.x-this.startPoint.x;
var dy=_3c9.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3cc,e){
switch(_3cc){
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
function BindingParser(_3ce){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3ce;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3cf){
var _3d0=new List();
var xml=BindingParser.XML.replace("${markup}",_3cf);
var doc=XMLParser.parse(_3cf);
if(doc){
var _3d3=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3d3);
var node=_3d3.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3d0.add(node);
}
node=node.nextSibling;
}
}
return _3d0;
};
BindingParser.prototype._iterate=function(_3d5,_3d6){
var _3d7=null;
switch(_3d5.nodeType){
case Node.ELEMENT_NODE:
_3d7=this._cloneElement(_3d5);
UserInterface.registerBinding(_3d7);
break;
case Node.TEXT_NODE:
_3d7=this._ownerDocument.createTextNode(_3d5.nodeValue);
break;
}
if(_3d7){
_3d6.appendChild(_3d7);
}
if(_3d7&&_3d5.hasChildNodes()){
var _3d8=_3d5.firstChild;
while(_3d8){
this._iterate(_3d8,_3d7);
_3d8=_3d8.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3d9){
var _3da=DOMUtil.createElementNS(_3d9.namespaceURI?_3d9.namespaceURI:Constants.NS_XHTML,_3d9.nodeName,this._ownerDocument);
var i=0;
while(i<_3d9.attributes.length){
var attr=_3d9.attributes.item(i++);
_3da.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3da;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.filter=function(_3dd){
var _3de=null;
var _3df=false;
var _3e0=_3dd.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3dd)){
var _3e1=UserInterface.getBinding(_3dd);
_3df=BindingSerializer.activeInstance.indexBinding(_3e1);
if(_3df){
_3de=_3e1.key;
_3dd.setAttribute(BindingSerializer.KEYPOINTER,_3de);
}
}
_3de=_3de?_3de:_3e0;
var _3e2=new List(_3dd.childNodes);
_3e2.each(function(_3e3){
if(_3e3.nodeType==Node.ELEMENT_NODE){
_3e3.setAttribute(BindingSerializer.KEYPOINTER,_3de);
}
});
if(_3df){
BindingSerializer.activeInstance.append(_3de,_3e0);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3e4){
BindingSerializer.activeInstance=this;
_3e4.bindingWindow.ElementIterator.iterate(_3e4.bindingElement,BindingSerializer.filter);
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
return _575;
};
Binding.prototype.serializeToString=function(){
var _578=null;
if(this.isAttached){
_578=new BindingSerializer().serializeBinding(this);
}else{
throw "cannot serialize unattached binding";
}
return _578;
};
Binding.prototype.subTreeFromString=function(_579){
this.detachRecursive();
this.bindingElement.innerHTML=Client.fixUI(_579);
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
DataBinding.CLASSNAME_INFOBOX="infobox";
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
this.bindingElement.innerHTML=Templates.getTemplateElementText(this.template);
this.shadowTree.table=this.bindingElement.firstChild;
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
if(this.isFlexible){
this.attachClassName(FlexBoxBinding.CLASSNAME);
}
};
FlexBoxBinding.prototype.onBindingAttach=function(){
FlexBoxBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_UPDATED);
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
MenuBodyBinding.newInstance=function(_6d4){
var _6d5=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6d4);
return UserInterface.registerBinding(_6d5,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6d6){
switch(_6d6){
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
MenuGroupBinding.newInstance=function(_6d7){
var _6d8=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6d7);
return UserInterface.registerBinding(_6d8,MenuGroupBinding);
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
var _6d9=this.getProperty("image");
var _6da=this.getProperty("image-hover");
var _6db=this.getProperty("image-active");
var _6dc=this.getProperty("image-disabled");
if(!this.image&&_6d9){
this.image=_6d9;
}
if(!this.imageHover&&_6da){
this.imageHover=_6d9;
}
if(!this.imageActive&&_6db){
this.imageActive=_6db;
}
if(!this.imageDisabled&&_6dc){
this.imageDisabled=_6dc;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6dd=this.getProperty("label");
var _6de=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6e0=this.getProperty("isdisabled");
var _6e1=this.getProperty("image");
var _6e2=this.getProperty("image-hover");
var _6e3=this.getProperty("image-active");
var _6e4=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6e5=this.getMenuPopupBinding();
if(_6e5){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6e1){
this.image=_6e1;
}
if(!this.imageHover&&_6e2){
this.imageHover=_6e1;
}
if(!this.imageActive&&_6e3){
this.imageActive=_6e3;
}
if(!this.imageDisabled&&_6e4){
this.imageDisabled=_6e4;
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
if(_6dd!=null){
this.setLabel(_6dd);
}
if(_6de){
this.setToolTip(_6de);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6e0==true){
this.disable();
}
var _6e6=this.getProperty("oncommand");
if(_6e6){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6e6);
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
MenuItemBinding.prototype.setLabel=function(_6e9){
this.setProperty("label",_6e9);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6e9));
}
};
MenuItemBinding.prototype.setToolTip=function(_6ea){
this.setProperty("tooltip",_6ea);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6ea));
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
var _6ec=this.bindingDocument.createElement("div");
_6ec.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6ec.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6ed=this.labelBinding.bindingElement;
_6ed.insertBefore(_6ec,_6ed.firstChild);
_6ec.style.display="none";
this.shadowTree.checkBoxIndicator=_6ec;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6ec=this.bindingDocument.createElement("div");
_6ec.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6ec.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6ed=this.labelBinding.bindingElement;
_6ed.insertBefore(_6ec,_6ed.firstChild);
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
var _6ef=this.imageProfile.getDisabledImage();
if(_6ef){
this.setImage(_6ef);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6ef=this.imageProfile.getDefaultImage();
if(_6ef){
this.setImage(_6ef);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6f1=this.getMenuContainerBinding();
if(_6f1.isOpen()&&!_6f1.isOpen(this)){
_6f1._openElement.hide();
_6f1.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6f1=this.getMenuContainerBinding();
if(!_6f1.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6f3){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6f4=this.getMenuContainerBinding();
if(!_6f4||!_6f4.isOpen(this)||_6f3){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6f5){
this.setChecked(true,_6f5);
};
MenuItemBinding.prototype.uncheck=function(_6f6){
this.setChecked(false,_6f6);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6f7,_6f8){
this.setProperty("ischecked",_6f7);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6f7){
this.isChecked=_6f7;
this.shadowTree.checkBoxIndicator.style.display=_6f7?"block":"none";
if(!_6f8){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6f9){
var _6fa=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6f9);
UserInterface.registerBinding(_6fa,MenuItemBinding);
return UserInterface.getBinding(_6fa);
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
PopupBinding.handleBroadcast=function(_6fb,arg){
switch(_6fb){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6ff=PopupBinding.activeInstances.get(key);
var _700=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6ff);
if(!_700){
list.add(_6ff);
}
});
list.each(function(_701){
_701.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _703=PopupBinding.activeInstances.get(key);
_703.hide();
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
var _704=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _705=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_704){
this._bodyBinding=UserInterface.getBinding(_704);
}else{
if(_705){
this._bodyBinding=UserInterface.getBinding(_705);
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
var _706=this.getProperty("position");
this.position=_706?_706:PopupBinding.POSITION_BOTTOM;
}
};
PopupBinding.prototype.assignDOMEvents=function(){
this.addEventListener(DOMEvents.MOUSEDOWN);
this.addEventListener(DOMEvents.MOUSEUP);
};
PopupBinding.prototype.add=function(_707){
var _708=null;
if(this._bodyBinding){
this._bodyBinding.add(_707);
_708=_707;
}else{
_708=PopupBinding.superclass.add.call(this,_707);
}
return _708;
};
PopupBinding.prototype.addFirst=function(_709){
var _70a=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_709);
_70a=_709;
}else{
_70a=PopupBinding.superclass.addFirst.call(this,_709);
}
return _70a;
};
PopupBinding.prototype.handleAction=function(_70b){
PopupBinding.superclass.handleAction.call(this,_70b);
var _70c=_70b.target;
switch(_70b.type){
case Binding.ACTION_ATTACHED:
if(_70c instanceof MenuItemBinding){
this._count(true);
_70b.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_70c instanceof MenuItemBinding){
this._count(false);
_70b.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_70d){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_70d?1:-1);
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
PopupBinding.prototype.snapTo=function(_70e){
var _70f=this._getElementPosition(_70e);
switch(this.position){
case PopupBinding.POSITION_TOP:
_70f.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_70f.x+=_70e.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_70f.y+=_70e.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_70f.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_70e;
this.bindingElement.style.display="block";
this.setPosition(_70f.x,_70f.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_711){
this.bindingElement.style.display="block";
this.setPosition(_711.x,_711.y);
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
PopupBinding.prototype._getElementPosition=function(_716){
return _716.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_716):DOMUtil.getUniversalPosition(_716);
};
PopupBinding.prototype._getMousePosition=function(e){
var _718=DOMEvents.getTarget(e);
return _718.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_719){
var _71a=this.bindingElement;
if(_719){
if(Client.hasTransitions){
_71a.style.visibility="visible";
_71a.style.opacity="1";
}else{
_71a.style.visibility="visible";
}
}else{
_71a.style.visibility="hidden";
_71a.style.display="none";
if(Client.hasTransitions){
_71a.style.opacity="0";
}
}
this.isVisible=_719;
};
PopupBinding.prototype._enableTab=function(_71b){
var self=this;
var _71d=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_71d.each(function(_71e){
_71e.bindingElement.tabIndex=_71b?0:-1;
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
var _726=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_726.y<0){
y=-_726.y;
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
PopupBinding.prototype.grabKeyboard=function(_728){
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
var _72e=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_72e=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _72e;
};
PopupBinding.prototype.clear=function(){
var _72f=this._bodyBinding;
if(_72f){
_72f.detachRecursive();
_72f.bindingElement.innerHTML="";
}
this.bindingElement.style.height="auto";
this.detachClassName(PopupBinding.CLASSNAME_OVERFLOW);
this._isOverflow=false;
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_730){
var _731=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_730);
return UserInterface.registerBinding(_731,PopupBinding);
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
PopupBodyBinding.newInstance=function(_733){
var _734=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_733);
return UserInterface.registerBinding(_734,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_735){
return new Point(_735.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_736){
var _737=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_736);
return UserInterface.registerBinding(_737,MenuPopupBinding);
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
var _738=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_738){
this._body=UserInterface.getBinding(_738);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _739=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_739.hasNext()){
var _73a=DialogBorderBinding.newInstance(this.bindingDocument);
_73a.setType(_739.getNext());
this.add(_73a);
}
};
DialogBinding.prototype.buildControlBindings=function(){
var _73b=this.getProperty("controls");
if(_73b){
var _73c=new List(_73b.split(" "));
while(_73c.hasNext()){
var type=_73c.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _73e=DialogControlBinding.newInstance(this.bindingDocument);
_73e.setControlType(type);
this._titlebar.addControl(_73e);
this.controlBindings[type]=_73e;
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
var _73f=this.getProperty("image");
var _740=this.getProperty("label");
var _741=this.getProperty("draggable");
var _742=this.getProperty("resizable");
var _743=this.getProperty("modal");
if(_73f){
this.setImage(_73f);
}
if(_740){
this.setLabel(_740);
}
if(_741==false){
this.isDialogDraggable=false;
}
if(_742==false){
this.isPanelResizable=false;
}
if(_743==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_744){
this.isModal=_744;
};
DialogBinding.prototype.setLabel=function(_745){
this.setProperty("label",_745);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_745));
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
DialogBinding.prototype.handleAction=function(_747){
DialogBinding.superclass.handleAction.call(this,_747);
switch(_747.type){
case Binding.ACTION_DRAG:
var _748=_747.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_748.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_748.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_748;
_748.dragger.registerHandler(this);
}
break;
}
}
_747.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_747.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_749,arg){
DialogBinding.superclass.handleBroadcast.call(this,_749,arg);
switch(_749){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_74b){
DialogBinding.superclass.handleInvokedControl.call(this,_74b);
switch(_74b.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_74c){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_74c){
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
var _74e=self.bindingElement;
setTimeout(function(){
_74e.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_74f){
this.bindingElement.style.zIndex=new String(_74f);
};
DialogBinding.prototype.onDragStart=function(_750){
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
DialogBinding.prototype.setResizable=function(_762){
if(this._isResizable!=_762){
if(_762){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_762;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _763=null;
var _764=this.bindingDocument.body.offsetWidth;
var _765=this.bindingDocument.body.offsetHeight;
_763={x:0.125*_764,y:0.125*_765,w:0.75*_764,h:0.5*_765};
return _763;
};
DialogBinding.prototype.centerOnScreen=function(){
var _766=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_766.w-dim.w),0.5*(_766.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _768=this;
var i=0;
function blink(){
if(i%2==0){
_768.detachClassName("active");
}else{
_768.attachClassName("active");
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
var _76c="";
while(list.hasNext()){
var type=list.getNext();
_76c+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_76c);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_76d){
var _76e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_76d);
return UserInterface.registerBinding(_76e,DialogBinding);
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
DialogHeadBinding.newInstance=function(_76f){
var _770=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_76f);
return UserInterface.registerBinding(_770,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_773){
var _774=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_773);
return UserInterface.registerBinding(_774,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_775){
var _776=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_775);
return UserInterface.registerBinding(_776,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_777){
DialogSetBinding.superclass.handleAction.call(this,_777);
var _778=_777.target;
switch(_777.type){
case Binding.ACTION_MOVETOTOP:
if(_778 instanceof DialogBinding){
this._moveToTop(_778);
}
break;
case Binding.ACTION_MOVEDONTOP:
_777.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_779){
var _77a=0;
var _77b=this.getChildBindingsByLocalName("dialog");
_77b.each(function(_77c){
var _77d=_77c.getZIndex();
_77a=_77d>_77a?_77d:_77a;
});
_779.setZIndex(_77a+2);
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
DialogBorderBinding.newInstance=function(_77f){
var _780=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_77f);
return UserInterface.registerBinding(_780,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_781){
this._dialogBinding=_781;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_783){
DialogCoverBinding.superclass.handleAction.call(this,_783);
var _784=_783.target;
if(this._dialogBinding.isModal){
switch(_783.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_784==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_784.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_785,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_785,arg);
switch(_785){
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
var _788=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_788);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _789=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_789);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_78a){
var _78b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_78a);
return UserInterface.registerBinding(_78b,DialogCoverBinding);
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
var _78c=this.getProperty("image");
if(_78c){
this.setImage(_78c);
}
var _78d=this.getProperty("label");
if(_78d){
this.setLabel(_78d);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_78e){
if(this.isAttached){
this.labelBinding.setLabel(_78e);
}
this.setProperty("label",_78e);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_790){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_790);
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
DialogTitleBarBinding.newInstance=function(_791){
var _792=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_791);
return UserInterface.registerBinding(_792,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_793){
var _794=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_793);
return UserInterface.registerBinding(_794,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_795){
var _796=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_795);
return UserInterface.registerBinding(_796,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_797){
this.binding=_797;
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
var _79a=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _79b=node.nodeName.toLowerCase();
switch(_79b){
case "script":
case "style":
case "textarea":
_79a=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _79a;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a2=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a2=false;
}
return _7a2;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7a3,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7a3,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7a7=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7a7+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7ad){
var _7ae="";
var _7af="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7b0="</span>";
var self=this;
function iterate(_7b2){
var _7b3=-1;
var _7b4=null;
self._map.each(function(key,exp){
var low=_7b2.toLowerCase();
var _7b8=low.search(exp);
if(_7b8>-1){
if(_7b3==-1){
_7b3=_7b8;
}
if(_7b8<=_7b3){
_7b3=_7b8;
_7b4=key;
}
}
});
if(_7b3>-1&&_7b4!=null){
var pre=_7b2.substring(0,_7b3);
var hit=_7b2.substring(_7b3,_7b3+_7b4.length);
var pst=_7b2.substring(_7b3+_7b4.length,_7b2.length);
_7ae+=pre+_7af+hit+_7b0;
iterate(pst);
}else{
_7ae+=_7b2;
}
}
iterate(_7ad);
return _7ae;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7bc){
var _7bd=new List(_7bc.getElementsByTagName("span"));
_7bd.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7bc.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7c0){
var _7c1=null;
if(_7c0.isAttached){
var doc=_7c0.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7c1=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7c1 instanceof SOAPFault){
_7c1=null;
}
}
}
return _7c1;
};
WindowBinding.highlightKeywords=function(_7c5,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7c5.isAttached){
var doc=_7c5.getContentDocument();
if(doc!=null){
var _7c8=WindowBinding._highlightcrawler;
_7c8.reset(doc.body);
if(list!=null){
_7c8.setKeys(list);
_7c8.crawl(doc.body);
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
var _7c9=WindowBinding.superclass.serialize.call(this);
if(_7c9){
_7c9.url=this.getURL();
}
return _7c9;
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
var _7cb=this.getContentWindow().DocumentManager;
if(_7cb!=null){
_7cb.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7cc){
WindowBinding.superclass.handleAction.call(this,_7cc);
var _7cd=_7cc.target;
switch(_7cc.type){
case RootBinding.ACTION_PHASE_3:
if(_7cd.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7cd);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7cc.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7ce){
if(!this.isFit||_7ce){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7cf){
if(this._pageBinding==null){
if(_7cf.bindingWindow==this.getContentWindow()){
this._pageBinding=_7cf;
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
WindowBinding.prototype._registerOnloadListener=function(_7d0){
var _7d1=this.shadowTree.iframe;
var _7d2=_7d0?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7d5=true;
if(Client.isExplorer){
_7d5=_7d1.readyState=="complete";
}
if(_7d5==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d2](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7d6){
var _7d7=_7d6?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7d7](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7db=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7db=url;
}
return _7db;
};
WindowBinding.prototype.reload=function(_7dd){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7de=null;
if(this.shadowTree.iframe!=null){
_7de=this.shadowTree.iframe;
}
return _7de;
};
WindowBinding.prototype.getContentWindow=function(){
var _7df=null,_7e0=this.getFrameElement();
if(_7e0!==null){
try{
_7df=_7e0.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7df;
};
WindowBinding.prototype.getContentDocument=function(){
var _7e1=null,win=this.getContentWindow();
if(win){
_7e1=win.document;
}
return _7e1;
};
WindowBinding.prototype.getRootBinding=function(){
var _7e3=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7e3=UserInterface.getBinding(doc.body);
}
return _7e3;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7e5){
this.bindingElement.style.height=_7e5+"px";
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
WindowBinding.prototype.handleCrawler=function(_7e6){
WindowBinding.superclass.handleCrawler.call(this,_7e6);
if(_7e6.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7e6.nextNode=root.bindingElement;
}else{
_7e6.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7eb){
var _7ec=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7eb);
var _7ed=UserInterface.registerBinding(_7ec,WindowBinding);
return _7ed;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f1){
_7f1.target.show();
_7f1.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f3){
_7f3.target.show();
_7f3.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7f5){
PreviewWindowBinding.superclass.handleAction.call(this,_7f5);
switch(_7f5.type){
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
var _7f6=null;
this._getRadioButtonBindings().each(function(_7f7){
if(_7f7.getProperty("ischecked")){
_7f6=_7f7;
return false;
}else{
return true;
}
});
if(_7f6){
this._checkedRadioBinding=_7f6;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7f8){
RadioGroupBinding.superclass.handleAction.call(this,_7f8);
var _7f9=_7f8.target;
switch(_7f8.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7f8.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7f9.isRadioButton&&!_7f9.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7f9);
}
this._checkedRadioBinding=_7f9;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7f8.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7fa,_7fb){
if(_7fa instanceof RadioDataBinding){
_7fa=_7fa.getButton();
}
if(_7fa.isRadioButton){
switch(_7fb){
case true:
this._unCheckRadioBindingsExcept(_7fa);
this._checkedRadioBinding=_7fa;
_7fa.check(true);
break;
default:
_7fa.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7fc){
var _7fd=this._getRadioButtonBindings();
_7fd.each(function(_7fe){
if(_7fe.isChecked&&_7fe!=_7fc){
_7fe.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7ff=new Crawler();
var list=new List();
_7ff.addFilter(function(_801){
var _802=true;
var _803=UserInterface.getBinding(_801);
if(_803 instanceof RadioGroupBinding){
_802=NodeCrawler.SKIP_CHILDREN;
}else{
if(_803 instanceof ButtonBinding&&_803.isRadioButton){
list.add(_803);
}
}
return _802;
});
_7ff.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_804){
var _805=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_804);
return UserInterface.registerBinding(_805,RadioGroupBinding);
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
var _807=this.getProperty("regexrule");
if(_807!=null){
this.expression=new RegExp(_807);
}
var _808=this.getProperty("onbindingblur");
if(_808!=null){
this.onblur=function(){
Binding.evaluate(_808,this);
};
}
var _809=this.getProperty("onvaluechange");
if(_809!=null){
this.onValueChange=function(){
Binding.evaluate(_809,this);
};
}
if(this.error==null&&this.type!=null){
var _80a=DataBinding.errors[this.type];
if(_80a!=null){
this.error=_80a;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _80b=this.getProperty("value");
if(_80b!=null){
this.setValue(String(_80b));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _80d=this.getProperty("isdisabled");
if(_80d==true){
this.setDisabled(true);
}
var _80e=this.getProperty("readonly");
if(_80e==true){
this.setReadOnly(true);
}
var _80f=this.getProperty("autoselect");
if(_80f==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.spellcheck&&Client.hasSpellcheck){
var _810=Localization.currentLang();
if(_810!=null){
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
var _811=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_811.type=this.isPassword==true?"password":"text";
_811.tabIndex=-1;
return _811;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_814){
if(_814){
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
DataInputBinding.prototype.handleBroadcast=function(_817,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_817,arg);
var self=this;
switch(_817){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _81a=DOMEvents.getTarget(arg);
if(_81a!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_81b){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_81b){
var self=this,_81d=this.bindingElement,_81e={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_81d,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_81d,DOMEvents.MOUSEUP,_81e);
}else{
this.select();
}
}
this.onfocus();
if(!_81b){
var _81f=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_81f);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _820=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _821=_820.createTextRange();
_821.moveStart("character",0);
_821.moveEnd("character",_820.value.length);
_821.select();
}else{
_820.setSelectionRange(0,_820.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_822){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_822){
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
DataInputBinding.prototype.validate=function(_826){
if(_826==true||this._isValid){
var _827=this.isValid();
if(_827!=this._isValid){
this._isValid=_827;
if(!_827){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _828=null;
if(this._isInvalidBecauseRequired==true){
_828=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_828=DataBinding.warnings["minlength"];
_828=_828.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_828=DataBinding.warnings["maxlength"];
_828=_828.replace("${count}",String(this.maxlength));
}else{
_828=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_828!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_828);
}
}else{
this.setValue(_828);
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
var _829=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _82a=this.getValue();
if(_82a==""){
if(this.isRequired==true){
_829=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _82b=DataBinding.expressions[this.type];
if(!_82b.test(_82a)){
_829=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_82a)){
_829=false;
}
}
}
}
if(_829&&this.minlength!=null){
if(_82a.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_829=false;
}
}
if(_829&&this.maxlength!=null){
if(_82a.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_829=false;
}
}
return _829;
};
DataInputBinding.prototype.setDisabled=function(_82c){
if(_82c!=this.isDisabled){
if(_82c){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _82d=this.shadowTree.input;
if(_82c){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_82d,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_82d,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_82c;
this.shadowTree.input.unselectable=_82c?"on":"off";
}
this.isDisabled=_82c;
this.isFocusable=!_82c;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_82f){
if(_82f!=this.isReadOnly){
if(_82f){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_82f;
this.isReadOnly=_82f;
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
DataInputBinding.prototype.handleElement=function(_830){
return true;
};
DataInputBinding.prototype.updateElement=function(_831){
var _832=_831.getAttribute("value");
var _833=_831.getAttribute("type");
var _834=_831.getAttribute("maxlength");
var _835=_831.getAttribute("minlength");
if(_832==null){
_832="";
}
var _836=this.bindingWindow.UpdateManager;
if(this.getValue()!=_832){
_836.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_832);
}
if(this.type!=_833){
_836.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_833;
}
if(this.maxlength!=_834){
_836.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_834;
}
if(this.minlength!=_835){
_836.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_835;
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
DataInputBinding.prototype.setValue=function(_837){
if(_837===null){
_837="";
}
if(_837!=this.getValue()){
this.setProperty("value",_837);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_837);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _838=null;
if(this.shadowTree.input!=null){
_838=this.shadowTree.input.value;
}else{
_838=this.getProperty("value");
}
return _838;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _83a=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_83a=Number(_83a);
break;
}
return _83a;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_83b){
var _83c=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_83b);
return UserInterface.registerBinding(_83c,DataInputBinding);
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
var _83d=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_83d!=null){
this.setValue(_83d.value);
_83d.parentNode.removeChild(_83d);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _83e=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_83e.tabIndex=-1;
return _83e;
};
TextBoxBinding.prototype.handleElement=function(_83f){
return true;
};
TextBoxBinding.prototype.updateElement=function(_840){
var _841,area=_840.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_841=DOMUtil.getTextContent(area);
}
if(_841==null){
_841="";
}
var _843=this.bindingWindow.UpdateManager;
if(this.getValue()!=_841){
_843.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_841);
}
var _844=_840.getAttribute("type");
if(this.type!=_844){
_843.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_844;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_848){
var _849=this.bindingDocument.selection.createRange();
var _84a=_849.text=="";
if(_84a&&!_848){
_849.text="\t";
}else{
var text="";
var _84c=_849.text.length;
while((_849.moveStart("word",-1)&&_849.text.charAt(1)!="\n")){
}
_849.moveStart("character",1);
var _84d=0;
var i=0,line,_850=_849.text.split("\n");
while((line=_850[i++])!=null){
if(_848){
line=line.replace(/^(\s)/mg,"");
_84d++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_850[i+1]?"\n":"");
}
_849.text=text;
_849.moveStart("character",-_84c);
if(_848){
_849.moveStart("character",2*_850.length-2);
}
_849.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _851=this.bindingDocument.selection.createRange();
var _852=_851.duplicate();
while((_852.moveStart("word",-1)&&_852.text.indexOf("\n")==-1)){
}
_852.moveStart("character",1);
_851.text="\n"+_852.text.match(/^(\s)*/)[0]+"!";
_851.moveStart("character",-1);
_851.select();
_851.text="";
_851.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_853){
var _854;
var _855;
var oss;
var osy;
var i;
var fnd;
var _85a=this._getSelectedText();
var el=this.shadowTree.input;
_854=el.scrollLeft;
_855=el.scrollTop;
if(!_85a.match(/\n/)){
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
_85a=this._getSelectedText();
if(_853){
ntext=_85a.replace(/^(\s)/mg,"");
}else{
ntext=_85a.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_85a.length);
}
el.scrollLeft=_854;
el.scrollTop=_855;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _85c;
var _85d;
var oss;
var osy;
var el=this.shadowTree.input;
_85c=el.scrollLeft;
_85d=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_85c;
el.scrollTop=_85d;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _864=this.shadowTree.input.value;
var _865=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _864.substr(_865,end-_865);
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
var _867=this.getProperty("isdisabled");
if(this.isDisabled||_867){
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
var _869=this.getProperty("label");
var _86a=this.getProperty("value");
var _86b=this.getProperty("width");
var _86c=this.getProperty("onchange");
var _86d=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_869!=null){
this.label=_869;
}
if(!this.value&&_86a!=null){
this.value=_86a;
}
if(!this.width&&_86b){
this.width=_86b;
}
if(_86d){
this.isRequired=true;
}
if(_86c){
this.onValueChange=function(){
Binding.evaluate(_86c,this);
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
var _86e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_86e.name=this.getName();
_86e.value=this.getValue();
_86e.type="hidden";
if(this.hasCallBackID()){
_86e.id=this.getCallBackID();
}
this.shadowTree.input=_86e;
this.bindingElement.appendChild(_86e);
};
SelectorBinding.prototype.buildButton=function(){
var _86f=this.BUTTON_IMPLEMENTATION;
var _870=this.add(_86f.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_870.imageProfile=this.imageProfile;
}
if(this.width!=null){
_870.setWidth(this.width);
}
this._buttonBinding=_870;
this.shadowTree.button=_870;
_870.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _872=top.app.bindingMap.selectorpopupset;
var doc=_872.bindingDocument;
var _874=_872.add(PopupBinding.newInstance(doc));
var _875=_874.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_874;
this._menuBodyBinding=_875;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_874.attachClassName("selectorpopup");
_874.addActionListener(PopupBinding.ACTION_SHOW,this);
_874.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_874.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_874);
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
var _878=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_878).each(function(_879){
var _87a=_879.getAttribute("label");
var _87b=_879.getAttribute("value");
var _87c=_879.getAttribute("selected");
var _87d=_879.getAttribute("image");
var _87e=_879.getAttribute("image-hover");
var _87f=_879.getAttribute("image-active");
var _880=_879.getAttribute("image-disabled");
var _881=null;
if(_87d||_87e||_87f||_880){
_881=new ImageProfile({image:_87d,imageHover:_87e,imageActive:_87f,imageDisabled:_880});
}
list.add(new SelectorBindingSelection(_87a?_87a:null,_87b?_87b:null,_87c&&_87c=="true",_881));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _883=null;
while(list.hasNext()){
var _884=list.getNext();
var item=this.addSelection(_884);
if(_884.isSelected){
this.select(item,true);
}
if(!_883){
_883=item;
}
}
if(!this._selectedItemBinding){
this.select(_883,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_886,_887){
var _888=this.MENUITEM_IMPLEMENTATION;
var _889=this._menuBodyBinding;
var _88a=_889.bindingDocument;
var _88b=_888.newInstance(_88a);
_88b.imageProfile=_886.imageProfile;
_88b.setLabel(_886.label);
if(_886.tooltip!=null){
_88b.setToolTip(_886.tooltip);
}
_88b.selectionValue=_886.value;
_886.menuItemBinding=_88b;
if(_887){
_889.addFirst(_88b);
this.selections.addFirst(_886);
}else{
_889.add(_88b);
this.selections.add(_886);
}
this._isUpToDate=false;
return _88b;
};
SelectorBinding.prototype.addSelectionFirst=function(_88c){
return this.addSelection(_88c,true);
};
SelectorBinding.prototype.clear=function(_88d){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_88d&&this.defaultSelection!=null){
var _88e=this.addSelection(this.defaultSelection);
this.select(_88e,true);
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
SelectorBinding.prototype.setDisabled=function(_88f){
if(this.isAttached==true){
var _890=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_88f?"none":"block";
_890.setDisabled(_88f);
}
if(_88f){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_891){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_891);
}
};
SelectorBinding.prototype.handleAction=function(_892){
SelectorBinding.superclass.handleAction.call(this,_892);
switch(_892.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_892.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_892.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_892.target);
_892.consume();
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
_892.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_894){
this.select(_894);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _895=this._buttonBinding.bindingElement.offsetWidth+"px";
var _896=this._popupBinding.bindingElement;
_896.style.minWidth=_895;
};
SelectorBinding.prototype.handleEvent=function(e){
SelectorBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.FOCUS:
this.focus();
break;
case DOMEvents.KEYDOWN:
var _898=Client.isExplorer?e.keyCode:e.which;
if(_898==8){
this._popSearchSelection();
}
break;
case DOMEvents.KEYPRESS:
var _898=Client.isExplorer?e.keyCode:e.which;
if(_898>=32){
this._buttonBinding.check();
var _899=String.fromCharCode(_898);
this._pushSearchSelection(_899);
}
break;
}
};
SelectorBinding.prototype._pushSearchSelection=function(_89a){
this._searchString+=_89a.toLowerCase();
this._applySearchSelection();
};
SelectorBinding.prototype._popSearchSelection=function(_89b){
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
var _89c=this._menuBodyBinding;
if(_89c!=null){
var _89d=this.MENUITEM_IMPLEMENTATION;
var _89e=_89c.bindingDocument;
var list=this._getSelectionsList();
if(this._searchString!=null&&this._searchString!=""){
this._popupBinding.clear();
this._buttonBinding.setLabel(this._searchString);
if(list.hasEntries()){
while(list.hasNext()){
var _8a0=list.getNext();
if(_8a0.label.toLowerCase().indexOf(this._searchString)>-1){
this.addSelection(_8a0);
}
}
}
this._attachSelections();
var _8a1=new RegExp(this._searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");
var _8a2=_89c.getDescendantBindingsByType(_89d);
if(_8a2.hasEntries()){
while(_8a2.hasNext()){
var _8a3=_8a2.getNext();
var _8a4=_8a3.labelBinding;
if(_8a4!=null&&_8a4.shadowTree!=null&&_8a4.shadowTree.labelText!=null){
_8a4.shadowTree.labelText.innerHTML=_8a4.shadowTree.labelText.innerHTML.replace(_8a1,"<b>$&</b>");
}
}
_8a2.getFirst().focus();
this.attachClassName(DataBinding.CLASSNAME_INFOBOX);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
_8a4=LabelBinding.newInstance(_89e);
_8a4.setLabel(StringBundle.getString("ui","AspNetUiControl.Selector.NoMatchesFor").replace("{0}",this._searchString));
_89c.add(_8a4);
this._attachSelections();
this.detachClassName(DataBinding.CLASSNAME_INFOBOX);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
}
}else{
this._popupBinding.clear();
this._buttonBinding.setLabel(this._selectionLabel);
if(list.hasEntries()){
while(list.hasNext()){
var _8a0=list.getNext();
var item=this.addSelection(_8a0);
if(this._selectionValue==_8a0.value){
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
SelectorBinding.prototype.handleBroadcast=function(_8a6,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_8a6,arg);
switch(_8a6){
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
SelectorBinding.prototype.select=function(_8a9,_8aa){
var _8ab=false;
if(_8a9!=this._selectedItemBinding){
this._selectedItemBinding=_8a9;
_8ab=true;
var _8ac=this._buttonBinding;
this._selectionValue=_8a9.selectionValue;
this._selectionLabel=_8a9.getLabel();
_8ac.setLabel(_8a9.getLabel());
if(_8a9.imageProfile!=null){
_8ac.imageProfile=_8a9.imageProfile;
}
if(_8ac.imageProfile!=null){
_8ac.setImage(this.isDisabled==true?_8ac.imageProfile.getDisabledImage():_8ac.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_8aa){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_8aa)){
this.validate();
}
}
return _8ab;
};
SelectorBinding.prototype._relate=function(){
var _8ad=this.getProperty("relate");
if(_8ad){
var _8ae=this.bindingDocument.getElementById(_8ad);
if(_8ae){
var _8af=UserInterface.getBinding(_8ae);
if(_8af){
if(this.isChecked){
_8af.show();
}else{
_8af.hide();
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
SelectorBinding.prototype.selectByValue=function(_8b0,_8b1){
var _8b2=false;
var _8b3=this._menuBodyBinding;
var _8b4=_8b3.getDescendantElementsByLocalName("menuitem");
while(_8b4.hasNext()){
var _8b5=UserInterface.getBinding(_8b4.getNext());
if(_8b5.selectionValue==_8b0){
_8b2=this.select(_8b5,_8b1);
break;
}
}
return _8b2;
};
SelectorBinding.prototype.getValue=function(){
var _8b6=this._selectionValue;
if(_8b6!=null){
_8b6=String(_8b6);
}
return _8b6;
};
SelectorBinding.prototype.setValue=function(_8b7){
this.selectByValue(String(_8b7),true);
};
SelectorBinding.prototype.getResult=function(){
var _8b8=this._selectionValue;
if(_8b8=="null"){
_8b8=null;
}
if(_8b8){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8b8=Number(_8b8);
break;
}
}
return _8b8;
};
SelectorBinding.prototype.setResult=function(_8b9){
this.selectByValue(_8b9,true);
};
SelectorBinding.prototype.validate=function(){
var _8ba=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8bb=this.getValue();
if(_8bb==this.defaultSelection.value){
_8ba=false;
}
if(_8ba!=this._isValid){
if(_8ba){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8ba;
}
return _8ba;
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
var _8bc=this._popupBinding;
if(!this._isUpToDate){
_8bc.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8bd,_8be){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8bd));
return true;
};
SelectorBinding.newInstance=function(_8bf){
var _8c0=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8bf);
return UserInterface.registerBinding(_8c0,SelectorBinding);
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
var _8c3=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8c3){
this.onValueChange=function(){
Binding.evaluate(_8c3,this);
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
SimpleSelectorBinding.prototype.focus=function(_8c6){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8c6){
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
SimpleSelectorBinding.prototype._hack=function(_8c7){
if(Client.isExplorer){
this._select.style.width=_8c7?"auto":this._cachewidth+"px";
if(_8c7){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8c8=true;
if(this.isRequired){
if(this.getValue()==null){
_8c8=false;
}
}
if(_8c8!=this._isValid){
if(_8c8){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8c9=this._select;
var _8ca=_8c9.options[_8c9.selectedIndex];
var text=DOMUtil.getTextContent(_8ca);
_8c9.blur();
_8c9.style.color="#A40000";
_8c9.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8ca,DataBinding.warnings["required"]);
}
_8c9.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8ca,text);
}
};
}
this._isValid=_8c8;
}
return _8c8;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8cc=null;
var _8cd=this._select;
var _8ce=_8cd.options[_8cd.selectedIndex];
var _8cf=true;
if(Client.isExplorer){
var html=_8ce.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8cf=false;
}
}
if(_8cf){
_8cc=_8ce.getAttribute("value");
}
return _8cc;
};
SimpleSelectorBinding.prototype.setValue=function(_8d1){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8d2){
this.setValue(_8d2);
};
SimpleSelectorBinding.newInstance=function(_8d3){
var _8d4=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8d3);
return UserInterface.registerBinding(_8d4,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8d5,_8d6,_8d7,_8d8,_8d9){
this._init(_8d5,_8d6,_8d7,_8d8,_8d9);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8da,_8db,_8dc,_8dd,_8de){
if(_8da!=null){
this.label=String(_8da);
}
if(_8db!=null){
this.value=String(_8db);
}
if(_8dd!=null){
this.imageProfile=_8dd;
}
if(_8de!=null){
this.tooltip=_8de;
}
this.isSelected=_8dc?true:false;
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
var _8df=this.getProperty("image");
if(_8df){
this.setImage(_8df);
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
var _8e2=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8e2.popupBindingTargetElement=this.shadowTree.input;
_8e2.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8e2.attach();
var self=this;
_8e2.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8e2;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8e5=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8e5).each(function(_8e6){
if(_8e6.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8e7=_8e6.getAttribute("value");
var _8e8=_8e6.getAttribute("selected");
var _8e9=_8e6.getAttribute("tooltip");
list.add({value:_8e7?_8e7:null,toolTip:_8e9?_8e9:null,isSelected:(_8e8&&_8e8=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8eb=this._menuBodyBinding;
var _8ec=_8eb.bindingDocument;
while(_8eb.bindingElement.hasChildNodes()){
var node=_8eb.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8eb.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
var _8ee=this.getProperty("emptyentrylabel");
if(_8ee){
var _8ef=MenuItemBinding.newInstance(_8ec);
_8ef.setLabel(_8ee);
_8ef.selectionValue="";
_8eb.add(_8ef);
}
while(list.hasNext()){
var _8f0=list.getNext();
var _8ef=MenuItemBinding.newInstance(_8ec);
_8ef.setLabel(_8f0.label?_8f0.label:_8f0.value);
_8ef.selectionValue=_8f0.value;
if(_8f0.image){
_8ef.setImage(_8f0.image);
}
if(_8f0.toolTip){
_8ef.setToolTip(_8f0.toolTip);
}
if(_8f0.isSelected){
this.select(_8ef,true);
}
_8eb.add(_8ef);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8f1){
this.select(_8f1);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8f2,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8f2,arg);
switch(_8f2){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8f2,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8f4){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8f4);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8f5){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8f5);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8f6=this.bindingElement.offsetWidth+"px";
var _8f7=this._popupBinding.bindingElement;
_8f7.style.minWidth=_8f6;
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8f8=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8f9=this.getValue();
var _8fa=null;
_8f8.each(function(item){
if(item.getLabel()==_8f9){
_8fa=item;
}
});
if(_8fa){
_8fa.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8fd){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8fd){
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
DataInputSelectorBinding.prototype.setValue=function(_8fe){
var _8ff=this.isReadOnly;
var _900=null;
if(_8fe!=null&&_8fe!=""){
var _901=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
while(_901.hasNext()){
var item=_901.getNext();
if(item.selectionValue==_8fe){
_900=item.getLabel();
break;
}
}
}
if(_900!=null){
this.value=_8fe;
this.shadowTree.input.value=_900;
if(!this.isReadOnly){
this.setReadOnly(true);
}
}else{
DataInputSelectorBinding.superclass.setValue.call(this,_8fe);
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
var _904="imagesizenormal";
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
this.attachClassName(_904);
}else{
this.setAlphaTransparentBackdrop(false);
this.deleteProperty("image");
this.hasImage=false;
this.detachClassName(_904);
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
var _908=self.getProperty("handle");
var _909=ViewDefinition.clone(_908,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_909 instanceof DialogViewDefinition){
_909.handler={handleDialogResponse:function(_90a,_90b){
self._isButtonClicked=false;
if(_90a==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _90c=_90b.getFirst();
self.setValue(_90c);
self.validate(true);
self.checkDirty();
}
self.focus();
}};
_909.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_909);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_906.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_906;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _90e=this._dialogButtonBinding;
if(_90e!=null){
_90e.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _910=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_910=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _910;
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
var _913=ToolBarButtonBinding.newInstance(this.bindingDocument);
_913.setImage("${icon:editor-sourceview}");
_913.bindingElement.style.left="-24px";
_913.bindingElement.style.width="24px";
this.addFirst(_913);
_913.attach();
_913.hide();
var self=this;
_913.oncommand=function(){
self.clearLabel();
self.focus();
};
this.editButtonBinding=_913;
}
};
UrlInputDialogBinding.prototype.onblur=function(){
UrlInputDialogBinding.superclass.onblur.call(this);
this.setValue(this.getValue());
};
UrlInputDialogBinding.prototype.setValue=function(_914){
UrlInputDialogBinding.superclass.setValue.call(this,_914);
if(this.shadowTree.labelText==null){
this.buildButtonAndLabel();
}
this.compositeUrl=new CompositeUrl(_914);
if(this.compositeUrl.isMedia||this.compositeUrl.isPage){
var _915=TreeService.GetCompositeUrlLabel(_914);
if(_915!=_914){
this.setLabel(_915);
}
}else{
this.clearLabel();
}
this.dispatchAction(UrlInputDialogBinding.URL_SELECTED);
};
UrlInputDialogBinding.prototype.setLabel=function(_916){
this.setReadOnly(true);
this.editButtonBinding.show();
this.shadowTree.input.style.display="none";
this.shadowTree.labelInput.style.display="block";
this.shadowTree.labelInput.value=_916;
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
var _917=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _918=this.getProperty("image");
if(_918!=null){
_917.setImage(_918);
}else{
_917.setImage("${icon:popup}");
}
this.addFirst(_917);
_917.attach();
var self=this;
_917.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_917;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _91a=this._dialogButtonBinding;
if(_91a!=null){
_91a.oncommand();
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
var _91b=this.getProperty("label");
var _91c=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_91b!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_91b+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_91b);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_91c!=null){
this._buttonBinding.setToolTip(_91c);
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
DataDialogBinding.prototype.handleAction=function(_91e){
DataDialogBinding.superclass.handleAction.call(this,_91e);
var _91f=_91e.target;
var self=this;
switch(_91e.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_921,_922){
if(_921==Dialog.RESPONSE_ACCEPT){
if(_922 instanceof DataBindingMap){
self._map=_922;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_91f==this._buttonBinding){
_91e.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_923,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_923,arg);
switch(_923){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _926=this.getProperty("handle");
var url=this.getURL();
var _928=null;
if(_926!=null||def!=null){
if(def!=null){
_928=def;
}else{
_928=ViewDefinitions[_926];
}
if(_928 instanceof DialogViewDefinition){
_928.handler=this._handler;
if(this._map!=null){
_928.argument=this._map;
}
StageBinding.presentViewDefinition(_928);
}
}else{
if(url!=null){
_928=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_928!=null){
this._dialogViewHandle=_928.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_929){
this.setProperty("label",_929);
if(this.isAttached){
this._buttonBinding.setLabel(_929+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_92a){
this.setProperty("image",_92a);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_92a);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_92b){
this.setProperty("tooltip",_92b);
if(this.isAttached){
this._buttonBinding.setToolTip(_92b);
}
};
DataDialogBinding.prototype.setHandle=function(_92c){
this.setProperty("handle",_92c);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_92e){
this._handler=_92e;
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
DataDialogBinding.newInstance=function(_930){
var _931=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_930);
return UserInterface.registerBinding(_931,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_933,_934){
if(_933==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_934);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_935){
_935=new String(_935);
this.dirty();
this.setValue(encodeURIComponent(_935));
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
var _939=this.getValue();
if(_939==null){
_939="";
}
this.shadowTree.dotnetinput.value=_939;
};
PostBackDataDialogBinding.prototype.setValue=function(_93a){
this.setProperty("value",_93a);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_93b){
};
PostBackDataDialogBinding.newInstance=function(_93c){
var _93d=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_93c);
return UserInterface.registerBinding(_93d,PostBackDataDialogBinding);
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
var _93e=this.getProperty("dialoglabel");
var _93f=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _941=this.getProperty("handle");
var _942=this.getProperty("selectedtoken");
if(_941!=null){
var def=ViewDefinition.clone(_941,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_93e!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_93e;
}
if(_93f!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_93f;
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
if(_942!=null){
if(def.argument==null){
def.argument={};
}
def.argument.selectedToken=_942;
}
ViewDefinitionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
}else{
throw "Attribute \"handle\" required.";
}
};
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_944){
var _945=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_944);
return UserInterface.registerBinding(_945,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_947){
self._datathing.setValue(_947);
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
var _94a=self.getValue();
if(_94a==""||_94a==null){
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
var _94b=this.getProperty("value");
var _94c=this.getProperty("selectorlabel");
if(_94c==null){
_94c=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_94b==null));
list.add(new SelectorBindingSelection(_94c+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_94b!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _94b=this.getValue();
if(_94b==""||_94b==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_94e){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_94e);
switch(_94e.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_94e.target==this._datathing){
var _94f=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_94f){
self._selector.setLabel(_94f);
}
},500);
_94e.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_951){
this.setProperty("label",_951);
if(this._selector!=null){
this._selector.setLabel(_951);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_952){
this._datathing.setValue(_952);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_953,_954){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_953,_954)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_955){
this._buttonBinding.setLabel(_955);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_956){
this._buttonBinding.setToolTip(_956);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_957){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_957);
switch(_957.type){
case MenuItemBinding.ACTION_COMMAND:
var _958=_957.target;
var _959=this.master;
if(_958.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_958.getLabel());
setTimeout(function(){
_959.action();
},0);
}else{
this.master.setValue("");
}
_959.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_95a){
var _95b=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_95a);
return UserInterface.registerBinding(_95b,NullPostBackDataDialogSelectorBinding);
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
var _95c=this._dataDialogBinding;
if(_95c!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_95c.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _95d=this.getProperty("editable");
var _95e=this.getProperty("selectable");
var _95f=this.getProperty("display");
if(_95d!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_95e){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_95f){
this._display=_95f;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _960=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_960.selections=this.selections;
this.add(_960);
_960.attach();
this._dataDialogBinding=_960;
this.shadowTree.datadialog=_960;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _962=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _963=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_962=_963.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_962=_963.isSelected!=true;
break;
}
if(_962){
this.shadowTree.box.appendChild(this._getElementForSelection(_963));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_965){
var box=this.shadowTree.box;
var _967=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _968=list.getNext();
if(_965){
_968.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_967=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_967=_968.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_967=_968.isSelected!=true;
break;
}
}
if(_967){
var _969=this._getElementForSelection(_968);
box.insertBefore(_969,box.firstChild);
CSSUtil.attachClassName(_969,"selected");
this._selectionMap.set(_968.value,_969);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_96a){
var _96b=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_96b.appendChild(this.bindingDocument.createTextNode(_96a.label));
_96b.setAttribute("label",_96a.label);
_96b.setAttribute("value",_96a.value);
return _96b;
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
var _96d=DOMEvents.getTarget(e);
var _96e=DOMUtil.getLocalName(_96d);
if(_96e=="div"){
this._handleMouseDown(_96d);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_96f){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _970=this._getElements();
var _971=_96f.getAttribute("value");
var _972=this._lastSelectedElement.getAttribute("value");
var _973=false;
while(_970.hasNext()){
var el=_970.getNext();
switch(el.getAttribute("value")){
case _971:
case _972:
_973=!_973;
break;
}
if(_973){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_96f);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_96f)){
this._unhilite(_96f);
}else{
this._hilite(_96f);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_96f){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_96f;
};
MultiSelectorBinding.prototype._hilite=function(_977){
var _978=_977.getAttribute("value");
if(!this._selectionMap.has(_978)){
CSSUtil.attachClassName(_977,"selected");
this._selectionMap.set(_978,_977);
}
};
MultiSelectorBinding.prototype._unhilite=function(_979){
var _97a=_979.getAttribute("value");
if(this._selectionMap.has(_97a)){
CSSUtil.detachClassName(_979,"selected");
this._selectionMap.del(_97a);
}
};
MultiSelectorBinding.prototype._isHilited=function(_97b){
return CSSUtil.hasClassName(_97b,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_97c){
MultiSelectorBinding.superclass.handleAction.call(this,_97c);
var _97d=_97c.target;
switch(_97c.type){
case DataDialogBinding.ACTION_COMMAND:
if(_97d==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_97c.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_97d.result);
this.dirty();
_97d.result=null;
_97c.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _97e=null;
if(this.isSelectable){
_97e=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_980){
if(self._isHilited(_980)){
_980.parentNode.removeChild(_980);
_97e.add(new SelectorBindingSelection(_980.getAttribute("label"),_980.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _97e;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _982=this._getElements();
if(!isUp){
_982.reverse();
}
var _983=true;
while(_983&&_982.hasNext()){
var _984=_982.getNext();
if(this._isHilited(_984)){
switch(isUp){
case true:
if(_984.previousSibling){
_984.parentNode.insertBefore(_984,_984.previousSibling);
}else{
_983=false;
}
break;
case false:
if(_984.nextSibling){
_984.parentNode.insertBefore(_984,_984.nextSibling.nextSibling);
}else{
_983=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _985=new List();
var _986=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_988){
var _989=new SelectorBindingSelection(_988.getAttribute("label"),_988.getAttribute("value"),_986);
_989.isHighlighted=self._isHilited(_988);
_985.add(_989);
});
return _985;
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
var _98a=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_98a.hasEntries()){
_98a.each(function(_98b){
_98b.parentNode.removeChild(_98b);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _98c=this.selections.getNext();
if(_98c.isSelected){
var _98d=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_98d.name=this._name;
_98d.value=_98c.value;
this.bindingElement.appendChild(_98d);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_98e){
alert(_98e);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_98f){
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
var _990={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _991=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_991.handler=this._handler;
_991.argument=_990;
StageBinding.presentViewDefinition(_991);
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
var _992={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _994={handleDialogResponse:function(_995,_996){
if(_995==Dialog.RESPONSE_ACCEPT){
self.result=_996;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _997=ViewDefinitions[this._dialogViewHandle];
_997.handler=_994;
_997.argument=_992;
StageBinding.presentViewDefinition(_997);
};
MultiSelectorDataDialogBinding.newInstance=function(_998){
var _999=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_998);
return UserInterface.registerBinding(_999,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_99a){
var id=_99a.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _99c=_99a.bindingDocument.getElementById(id);
if(_99c!=null){
var _99d=UserInterface.getBinding(_99c);
_99d.setResult(true);
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
var _99f=this.bindingDocument.getElementById(id);
if(_99f!=null){
var _9a0=UserInterface.getBinding(_99f);
if(_9a0&&!_9a0.isAttached){
_9a0.isLazy=true;
}else{
_99f.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_9a1){
this._isLazy=_9a1;
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
var _9a3=this.getProperty("stateprovider");
var _9a4=this.getProperty("handle");
if(_9a3!=null&&_9a4!=null){
url=url.replace("${stateprovider}",_9a3).replace("${handle}",_9a4);
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
EditorDataBinding.prototype._onPageInitialize=function(_9a5){
EditorDataBinding.superclass._onPageInitialize.call(this,_9a5);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_9a6){
EditorDataBinding.superclass.handleAction.call(this,_9a6);
switch(_9a6.type){
case Binding.ACTION_DIRTY:
if(_9a6.target!=this){
if(!this.isDirty){
this.dirty();
}
_9a6.consume();
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
EditorDataBinding.prototype.setValue=function(_9a7){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_9a8){
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
var _9ad=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_9ad=fake.getValue()!="";
}
if(!_9ad&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_9ad&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _9ad;
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
var _9b1=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9b1!=null){
_9b1.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9b2){
_9b2=_9b2!=null?_9b2:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9b2;
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
var _9b3=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9b4=_9b3.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9b4;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9b4=_9b4.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9b4;
}
var self=this;
var _9b6=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9b6.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9b9=this.getProperty("label");
if(_9b9){
this.setLabel(_9b9);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9ba){
this.setProperty("label",_9ba);
if(this.shadowTree.labelBinding==null){
var _9bb=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9bb.attachClassName("fieldgrouplabel");
cell.insertBefore(_9bb.bindingElement,cell.getElementsByTagName("div").item(1));
_9bb.attach();
this.shadowTree.labelBinding=_9bb;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9ba));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9bd){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9bd.bindingElement);
return _9bd;
};
FieldGroupBinding.prototype.addFirst=function(_9be){
var _9bf=this.shadowTree[FieldGroupBinding.CENTER];
_9bf.insertBefore(_9be.bindingElement,_9bf.firstChild);
return _9be;
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
var _9c0=this.getProperty("relation");
if(_9c0!=null){
this.bindingRelation=_9c0;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9c1,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9c1,arg);
switch(_9c1){
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
FieldBinding.newInstance=function(_9c3){
var _9c4=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9c3);
return UserInterface.registerBinding(_9c4,FieldBinding);
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
var _9c5=this.getDescendantBindingByLocalName("fieldgroup");
if(_9c5!=null){
_9c5.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9c6=true;
var _9c7=this.getDescendantBindingsByLocalName("*");
while(_9c7.hasNext()){
var _9c8=_9c7.getNext();
if(Interfaces.isImplemented(IData,_9c8)){
var _9c9=_9c8.validate();
if(_9c6&&!_9c9){
_9c6=false;
}
}
}
return _9c6;
};
FieldsBinding.prototype.handleAction=function(_9ca){
FieldsBinding.superclass.handleAction.call(this,_9ca);
var _9cb=_9ca.target;
if(_9cb!=this){
switch(_9ca.type){
case Binding.ACTION_INVALID:
var _9cc=DataBinding.getAssociatedLabel(_9cb);
if(_9cc){
this._invalidFieldLabels.set(_9cb.key,_9cc);
}
if(_9cb.error){
if(!_9cb.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9cb.error},_9cb);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9ca.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9cb.key)){
this._invalidFieldLabels.del(_9cb.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9ca.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9cd=null;
if(this._invalidFieldLabels.hasEntries()){
_9cd=this._invalidFieldLabels.toList();
}
return _9cd;
};
FieldsBinding.newInstance=function(_9ce){
var _9cf=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9ce);
return UserInterface.registerBinding(_9cf,FieldsBinding);
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
var _9d0=this.getProperty("image");
if(_9d0){
this.setImage(_9d0);
}
var _9d1=this.getProperty("tooltip");
if(_9d1){
this.setToolTip(_9d1);
}
var _9d2=this.getProperty("label");
if(_9d2){
this.setLabel(_9d2);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9d4=this.getAncestorBindingByLocalName("field");
if(_9d4){
var _9d5=true;
_9d4.getDescendantBindingsByLocalName("*").each(function(_9d6){
if(Interfaces.isImplemented(IData,_9d6)){
_9d6.focus();
_9d5=false;
}
return _9d5;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9d7){
this.setProperty("label",_9d7);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9d7);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9d8=this.getProperty("label");
if(!_9d8){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9d8=node.data;
}
}
return _9d8;
};
FieldDescBinding.prototype.setImage=function(_9da){
this.setProperty("image",_9da);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9db){
this.setProperty("tooltip",_9db);
if(this.isAttached){
this.bindingElement.title=_9db;
}
};
FieldDescBinding.newInstance=function(_9dc){
var _9dd=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9dc);
return UserInterface.registerBinding(_9dd,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9de){
var _9df=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9de);
return UserInterface.registerBinding(_9df,FieldDataBinding);
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
var _9e0=this._fieldHelpPopupBinding;
if(_9e0){
_9e0.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9e1=app.bindingMap.fieldhelpopupset;
var doc=_9e1.bindingDocument;
var _9e3=_9e1.add(PopupBinding.newInstance(doc));
var _9e4=_9e3.add(PopupBodyBinding.newInstance(doc));
_9e3.position=PopupBinding.POSITION_RIGHT;
_9e3.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9e4.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9e5=this.getProperty("label");
if(_9e5){
_9e4.bindingElement.innerHTML=Resolver.resolve(_9e5);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9e3;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9e6=this.getAncestorBindingByLocalName("field");
if(_9e6){
_9e6.attachClassName("fieldhelp");
var _9e7=ClickButtonBinding.newInstance(this.bindingDocument);
_9e7.attachClassName("fieldhelp");
_9e7.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9e7);
_9e7.attach();
var self=this;
_9e7.oncommand=function(){
self.attachPopupBinding();
};
_9e7.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9e7;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9e9=this._fieldHelpPopupBinding;
if(_9e9&&!_9e9.isAttached){
_9e9.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9eb){
RadioDataGroupBinding.superclass.handleAction.call(this,_9eb);
switch(_9eb.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9ed,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9ed,arg);
switch(_9ed){
case BroadcastMessages.KEY_ARROW:
var _9ef=null;
var next=null;
var _9f1=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9f1=this.getChildBindingsByLocalName("radio");
while(!_9ef&&_9f1.hasNext()){
var _9f2=_9f1.getNext();
if(_9f2.getProperty("ischecked")){
_9ef=_9f2;
}
}
break;
}
if(_9ef){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9f1.getFollowing(_9ef);
while(next!=null&&next.isDisabled){
next=_9f1.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9f1.getPreceding(_9ef);
while(next!=null&&next.isDisabled){
next=_9f1.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9f3){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9f3){
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
var _9f4=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9f4.type="hidden";
_9f4.name=this._name;
this.bindingElement.appendChild(_9f4);
this.shadowTree.input=_9f4;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9f5=null;
var _9f6=this.getChildBindingsByLocalName("radio");
while(!_9f5&&_9f6.hasNext()){
var _9f7=_9f6.getNext();
if(_9f7.isChecked){
_9f5=_9f7.getProperty("value");
}
}
return _9f5;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9f8){
};
RadioDataGroupBinding.prototype.setResult=function(_9f9){
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
this.propertyMethodMap["checked"]=function(_9fa){
if(_9fa!=this.isChecked){
this.setChecked(_9fa,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9fb=this.getProperty("ischecked");
if(_9fb!=this.isChecked){
this.setChecked(_9fb,true);
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
var _9fc=this.getProperty("relate");
var _9fd=this.getProperty("oncommand");
var _9fe=this.getProperty("isdisabled");
if(_9fc){
this.bindingRelate=_9fc;
this.relate();
}
if(_9fd){
this.oncommand=function(){
Binding.evaluate(_9fd,this);
};
}
if(_9fe==true){
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
var _a00=this.getCallBackID();
this._buttonBinding.check=function(_a01){
RadioButtonBinding.prototype.check.call(this,_a01);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_a02){
RadioButtonBinding.prototype.uncheck.call(this,_a02);
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
RadioDataBinding.prototype.setChecked=function(_a03,_a04){
this._buttonBinding.setChecked(_a03,_a04);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_a03);
};
RadioDataBinding.prototype.check=function(_a05){
this.setChecked(true,_a05);
};
RadioDataBinding.prototype.uncheck=function(_a06){
this.setChecked(false,_a06);
};
RadioDataBinding.prototype.setDisabled=function(_a07){
if(_a07!=this.isDisabled){
this.isDisabled=_a07;
this._buttonBinding.setDisabled(_a07);
if(_a07){
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
var _a09=DOMEvents.getTarget(e);
switch(_a09){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _a0a=this.getProperty("label");
if(_a0a){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_a0a)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_a0b){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_a0b;
}
this.setProperty("label",_a0b);
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
this.propertyMethodMap["checked"]=function(_a0c){
if(_a0c!=this.isChecked){
this.setChecked(_a0c,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _a0d=this.getProperty("ischecked");
if(_a0d!=this.isChecked){
this.setChecked(_a0d,true);
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
var _a0f=DOMEvents.getTarget(e);
switch(_a0f){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_a10,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_a10,arg);
switch(_a10){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a13){
_a13.consume();
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
var _a15=this.getCallBackID();
this._buttonBinding.check=function(_a16){
ButtonBinding.prototype.check.call(this,_a16);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a16){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a17){
ButtonBinding.prototype.uncheck.call(this,_a17);
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
if(_a15!=null){
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
var _a18=true;
var _a19=this.bindingElement.parentNode;
if(_a19){
var _a1a=UserInterface.getBinding(_a19);
if(_a1a&&_a1a instanceof CheckBoxGroupBinding){
if(_a1a.isRequired){
if(_a1a.isValid){
_a18=_a1a.validate();
}else{
_a18=false;
}
}
}
}
return _a18;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a1b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a1b.type="hidden";
_a1b.name=this._name;
_a1b.style.display="none";
this.bindingElement.appendChild(_a1b);
this.shadowTree.input=_a1b;
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
var _a1c=null;
var _a1d=this.getProperty("value");
if(this.isChecked){
_a1c=_a1d?_a1d:"on";
}
return _a1c;
};
CheckBoxBinding.prototype.setValue=function(_a1e){
if(_a1e==this.getValue()||_a1e=="on"){
this.check(true);
}else{
if(_a1e!="on"){
this.setPropety("value",_a1e);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a1f=false;
if(this.isChecked){
_a1f=this._result!=null?this._result:true;
}
return _a1f;
};
CheckBoxBinding.prototype.setResult=function(_a20){
if(typeof _a20=="boolean"){
this.setChecked(_a20,true);
}else{
this._result=_a20;
}
};
CheckBoxBinding.newInstance=function(_a21){
var _a22=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a21);
return UserInterface.registerBinding(_a22,CheckBoxBinding);
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
var _a23=true;
if(this.isRequired){
var _a24=this.getDescendantBindingsByLocalName("checkbox");
if(_a24.hasEntries()){
_a23=false;
while(_a24.hasNext()&&!_a23){
if(_a24.getNext().isChecked){
_a23=true;
}
}
}
if(_a23==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a23;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a25){
if(_a25){
if(!this._labelBinding){
var _a26=LabelBinding.newInstance(this.bindingDocument);
_a26.attachClassName("invalid");
_a26.setImage("${icon:error}");
_a26.setLabel("Selection required");
this._labelBinding=this.addFirst(_a26);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a27){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a27);
switch(_a27.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a28){
var _a29=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a28);
return UserInterface.registerBinding(_a29,CheckBoxGroupBinding);
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
var _a2a=DialogControlBinding.newInstance(this.bindingDocument);
_a2a.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a2a);
this._controlGroupBinding.attachRecursive();
var _a2b=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a2b);
var _a2c=this.getLabel();
if(_a2c!=null){
this.setLabel(_a2c);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a2d=this._snapTargetBinding;
if(Binding.exists(_a2d)==true){
_a2d.removeActionListener(Binding.ACTION_BLURRED,this);
_a2d.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a2e){
if(Interfaces.isImplemented(IData,_a2e)){
this._snapTargetBinding=_a2e;
var _a2f=_a2e.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a2f&&_a2f.isConsumed){
this._environmentBinding=_a2f.listener;
}
if(this._environmentBinding){
_a2e.addActionListener(Binding.ACTION_BLURRED,this);
_a2e.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a2e)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a2e.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a31=this._snapTargetBinding;
var _a32=this._environmentBinding;
var root=UserInterface.getBinding(_a31.bindingDocument.body);
if(Binding.exists(_a31)&&Binding.exists(_a32)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a31.isAttached&&_a32.isAttached){
var _a34=_a31.boxObject.getUniversalPosition();
var _a35=_a32.boxObject.getUniversalPosition();
_a35.y+=_a32.bindingElement.scrollTop;
_a35.x+=_a32.bindingElement.scrollLeft;
var tDim=_a31.boxObject.getDimension();
var eDim=_a32.boxObject.getDimension();
var _a38=false;
if(_a34.y+tDim.h<_a35.y){
_a38=true;
}else{
if(_a34.x+tDim.w<_a35.x){
_a38=true;
}else{
if(_a34.y>_a35.y+eDim.h){
_a38=true;
}else{
if(_a34.x>_a35.x+eDim.w){
_a38=true;
}
}
}
}
if(!_a38){
this._setComputedPosition(_a34,_a35,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a39,_a3a,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a3f=_a39;
var _a40=false;
if(_a39.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a40=true;
}else{
if(_a39.x+tDim.w>=_a3a.x+eDim.w){
_a40=true;
}
}
if(_a40){
_a3f.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a3f.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a3f.y-=(bDim.h);
_a3f.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a3f);
};
BalloonBinding.prototype.handleBroadcast=function(_a41,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a41,arg);
switch(_a41){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a43){
var _a44=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a43){
_a44=true;
}
}
return _a44;
};
BalloonBinding.prototype._setPosition=function(_a46){
var _a47=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a47=true;
}
}
if(!_a47){
this.bindingElement.style.left=_a46.x+"px";
this.bindingElement.style.top=_a46.y+"px";
this._point=_a46;
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
BalloonBinding.prototype.handleAction=function(_a49){
BalloonBinding.superclass.handleAction.call(this,_a49);
var _a4a=_a49.target;
switch(_a49.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a49.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a4a==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a4a)){
self.dispose();
}else{
if(_a4a.validate()){
var _a4c=true;
if(_a49.type==Binding.ACTION_BLURRED){
var root=_a4a.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a4c=false;
}
}
if(_a4c){
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
BalloonBinding.prototype.setLabel=function(_a4f){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a50=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a4f);
_a50.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a50);
}
this.setProperty("label",_a4f);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a52){
var _a53=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a52);
var _a54=UserInterface.registerBinding(_a53,BalloonBinding);
_a54.hide();
return _a54;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a55,_a56){
if(Interfaces.isImplemented(IData,_a56)==true){
var _a57,_a58=_a56.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a58&&_a58.isConsumed){
switch(_a58.listener.constructor){
case StageBinding:
_a57=false;
break;
case StageDialogBinding:
_a57=true;
break;
}
}
var _a59=_a57?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a5a=_a59.add(BalloonBinding.newInstance(top.app.document));
_a5a.setLabel(_a55.text);
_a5a.snapTo(_a56);
_a5a.attach();
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
var _a5b=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a5e=_a5b.getDataBinding(name);
if(_a5e){
ErrorBinding.presentError({text:text},_a5e);
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
FocusBinding.focusElement=function(_a5f){
var _a60=true;
try{
_a5f.focus();
Application.focused(true);
}
catch(exception){
var _a61=UserInterface.getBinding(_a5f);
var _a62=SystemLogger.getLogger("FocusBinding.focusElement");
_a62.warn("Could not focus "+(_a61?_a61.toString():String(_a5f)));
_a60=false;
}
return _a60;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a63){
var win=_a63.bindingWindow;
var id=_a63.bindingElement.id;
return {getBinding:function(){
var _a66=null;
try{
if(Binding.exists(_a63)){
_a66=win.bindingMap[id];
}
}
catch(exception){
}
return _a66;
}};
};
FocusBinding.navigateNext=function(_a67){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a67);
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
var _a68=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a68&&_a68.isConsumed){
if(_a68.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a69){
FocusBinding.superclass.handleAction.call(this,_a69);
var _a6a=_a69.target;
var _a6b=null;
if(this._isFocusManager){
switch(_a69.type){
case FocusBinding.ACTION_ATTACHED:
if(_a6a!=this){
this._isUpToDate=false;
}
_a69.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a6a!=this){
this._isUpToDate=false;
_a69.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a6b=new FocusCrawler();
_a6b.mode=FocusCrawler.MODE_BLUR;
_a6b.crawl(_a6a.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a69.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a6a!=this){
_a6b=new FocusCrawler();
_a6b.mode=FocusCrawler.MODE_FOCUS;
_a6b.crawl(_a6a.bindingElement);
}
_a69.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a6a)){
this.claimFocus();
this._onFocusableFocused(_a6a);
}
_a69.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a6a)){
this._onFocusableBlurred(_a6a);
}
_a69.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a6c){
var _a6d=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a6d==null&&list.hasNext()){
var _a6f=list.getNext();
if(this._cachedFocus&&_a6f==this._cachedFocus.getBinding()){
_a6d=_a6f;
}
}
if(_a6d!=null){
if(_a6f.isFocused){
var next=_a6c?list.getPreceding(_a6d):list.getFollowing(_a6d);
if(!next){
next=_a6c?list.getLast():list.getFirst();
}
next.focus();
}else{
_a6d.focus();
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
var _a71=new FocusCrawler();
var list=new List();
_a71.mode=FocusCrawler.MODE_INDEX;
_a71.crawl(this.bindingElement,list);
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
if(this.validateAllDataBindings(true)){
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
if(this.validateAllDataBindings(true)){
this.bindingWindow.DataManager.isDirty=false;
var _d82=this.bindingWindow.bindingMap.__REQUEST;
if(_d82!=null){
_d82.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d83){
this._message=null;
switch(_d83){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d83,this._messengers);
if(!this._messengers.hasEntries()){
if(_d83==EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH){
this._saveAndPublishEditorPage();
}else{
this._saveEditorPage();
}
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
var _e24=System.getDefaultEntityToken(this.perspectiveNode.getEntityToken());
if(_e24!=null){
this._focusTreeNodeByEntityToken(_e24);
}else{
if(this._defaultTreeNode){
this._defaultTreeNode.focus();
this._defaultTreeNode=null;
}
}
};
SystemTreeBinding.prototype.collapse=function(_e25){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e25){
this.blurSelectedTreeNodes();
var _e26=this.getRootTreeNodeBindings();
_e26.each(function(_e27){
if(_e27.isContainer&&_e27.isOpen){
_e27.close();
_e27.hasBeenOpened=false;
_e27.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e28){
if(_e28!=this.isLockedToEditor){
this.isLockedToEditor=_e28;
if(_e28){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e2a=this.getRootTreeNodeBindings();
_e2a.each(function(_e2b){
var _e2c=_e2b.getOpenSystemNodes();
if(_e2c!=null&&_e2c.hasEntries()){
list.merge(_e2c);
}else{
if(_e2b.isOpen){
list.add(_e2b.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e2d){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e2d);
if(_e2d!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e2f=new Map();
var _e30=this.getFocusedTreeNodeBindings();
var _e31=_e30.getFirst().node.getActionProfile();
var self=this;
_e31.each(function(_e33,list){
var _e35=new List();
list.each(function(_e36){
if(_e36.getActivePositions()&self._activePosition){
_e35.add(_e36);
}
});
if(_e35.hasEntries()){
_e2f.set(_e33,_e35);
}
});
_e2f.activePosition=this._activePosition;
return _e2f;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e37,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e37,arg);
switch(_e37){
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
var _e3c=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e3c.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e3d=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e3d.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e3e){
SystemTreePopupBinding.superclass.handleAction.call(this,_e3e);
switch(_e3e.type){
case MenuItemBinding.ACTION_COMMAND:
var _e3f=_e3e.target;
var _e40=_e3f.associatedSystemAction;
if(_e40){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e42=list.getFirst();
var _e43=_e42.node;
}
SystemAction.invoke(_e40,_e43);
}else{
var cmd=_e3f.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e46=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e46=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e46=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e46=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e46=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e46){
setTimeout(function(){
EventBroadcaster.broadcast(_e46);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e47=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e47.hasNext()){
var _e48=UserInterface.getBinding(_e47.getNext());
if(!_e48.getProperty("rel")){
_e48.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e4a=new List();
var self=this;
this._actionProfile.each(function(_e4c,list){
var _e4e=MenuGroupBinding.newInstance(doc);
list.each(function(_e4f){
var _e50=self.getMenuItemBinding(_e4f);
_e4e.add(_e50);
});
_e4a.add(_e4e);
});
_e4a.reverse();
while(_e4a.hasNext()){
this._bodyBinding.addFirst(_e4a.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e51){
var _e52=MenuItemBinding.newInstance(this.bindingDocument);
var _e53=_e51.getLabel();
var _e54=_e51.getToolTip();
var _e55=_e51.getImage();
var _e56=_e51.getDisabledImage();
var _e57=_e51.isCheckBox();
if(_e53){
_e52.setLabel(_e53);
}
if(_e54){
_e52.setToolTip(_e54);
}
if(_e55){
_e52.imageProfile=new ImageProfile({image:_e55,imageDisabled:_e56});
}
if(_e57){
_e52.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e51.isChecked()){
_e52.check(true);
}
}
if(_e51.isDisabled()){
_e52.disable();
}
_e52.associatedSystemAction=_e51;
return _e52;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e5b=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e5b=UserInterface.getBinding(node);
if(_e5b.isDisabled){
_e5b=null;
}
}
break;
}
if(_e5b!=null&&_e5b.node!=null&&_e5b.node.getActionProfile()!=null){
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
var _e5c=this.node.getLabel();
if(_e5c){
this.setLabel(_e5c);
}
var _e5d=this.node.getToolTip();
if(_e5d){
this.setToolTip(_e5d);
}
var _e5e=this.node.getHandle();
if(_e5e){
this.setHandle(_e5e);
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
var _e61="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e61+=list.getNext();
if(list.hasNext()){
_e61+=" ";
}
}
this.setProperty("dragaccept",_e61);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e63){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e63);
switch(_e63.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e63.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e63.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e64,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e64,arg);
switch(_e64){
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
var _e67=null;
var _e68=this.node.getImageProfile();
if(_e68){
if(this.isOpen){
_e67=_e68.getActiveImage();
}else{
_e67=_e68.getDefaultImage();
}
}
if(!_e67){
_e67=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e67;
};
SystemTreeNodeBinding.prototype.open=function(_e69){
var _e6a=this.isContainer&&!this.isOpen;
var _e6b=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e6a&&(_e6b||SystemTreeBinding.HAS_NO_MEMORY)&&_e69!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e6c=null;
if(this.isContainer){
_e6c=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e6c);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e6e){
if(_e6e!=null){
this._refreshBranch(_e6e);
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
var _e6f=new List();
var _e70=this.node.getChildren();
this.empty();
if(_e70.hasEntries()){
this._insertTreeNodesRegulated(_e70);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e71){
var _e72=0;
var _e73=new List([]);
while(_e71.hasEntries()&&_e72<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e74=SystemTreeNodeBinding.newInstance(_e71.extractFirst(),this.bindingDocument);
_e74.autoExpand=this.autoExpand;
this.add(_e74);
_e74.attach();
_e72++;
if(this.autoExpand){
if(_e72==1&&!_e71.hasEntries()||LastOpenedSystemNodes.isOpen(_e74)){
_e73.add(_e74);
}
}
}
if(_e71.hasEntries()){
this._insertBufferTreeNode(_e71);
}
_e73.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e77){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e79=this.node.getDescendantBranch(list);
if(_e79.hasEntries()){
this.XXX(_e79);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e7a){
var self=this;
var map=new Map();
this.empty();
_e7a.each(function(key,_e7e){
if(_e7e.hasEntries()){
_e7e.each(function(node){
var _e80=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e80);
if(map.has(key)){
var _e81=map.get(key);
_e81.add(_e80);
_e81.isOpen=true;
_e81.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e80);
}else{
}
}
});
}
});
this.attachRecursive();
_e7a.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e82=new TreeCrawler();
var _e83=new List();
_e82.mode=TreeCrawler.MODE_GETOPEN;
_e82.crawl(this.bindingElement,_e83);
if(_e83.hasEntries()){
_e83.extractFirst();
}
_e82.dispose();
return _e83;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e84=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e84=new List([this.node]);
list.each(function(_e86){
_e84.add(_e86.node);
});
}
return _e84;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e87,_e88){
var _e89=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e87 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e87.node.getData(),this.node.getData(),_e88?_e88:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e89);
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
SystemTreeNodeBinding.newInstance=function(node,_e8d){
var _e8e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e8d);
var _e8f=UserInterface.registerBinding(_e8e,SystemTreeNodeBinding);
_e8f.node=node;
return _e8f;
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
SystemPageBinding.prototype.setPageArgument=function(_e90){
this.node=_e90;
SystemPageBinding.superclass.setPageArgument.call(this,_e90);
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
var _e91=this.node.getChildren();
if(_e91.hasEntries()){
while(_e91.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e91.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e93=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e93.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e95=new TreeCrawler();
var _e96=new List();
_e95.mode=TreeCrawler.MODE_GETOPEN;
_e95.crawl(this.bindingElement,_e96);
_e95.dispose();
var list=new List([this.node]);
_e96.each(function(_e98){
list.add(_e98.node);
});
this._tree.empty();
var _e99=this.node.getDescendantBranch(list);
if(_e99.hasEntries()){
var self=this;
var map=new Map();
_e99.each(function(key,_e9d){
_e9d.each(function(node){
var _e9f=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e9f);
if(map.has(key)){
var _ea0=map.get(key);
_ea0.add(_e9f);
_ea0.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e9f);
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
SystemPageBinding.prototype.handleAction=function(_ea1){
SystemPageBinding.superclass.handleAction.call(this,_ea1);
switch(_ea1.type){
case ButtonBinding.ACTION_COMMAND:
var _ea2=_ea1.target;
switch(_ea2.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_ea2.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_ea3,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_ea3,arg);
switch(_ea3){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _ea5=arg;
if(this.node&&this.node.getEntityToken()==_ea5){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_ea5);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_ea5);
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
StageContainerBinding.prototype.handleBroadcast=function(_ea7,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_ea7,arg);
var _ea9=this.bindingWindow.WindowManager;
switch(_ea7){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_ea9.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _ea9.WINDOW_RESIZED_BROADCAST:
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
var _eab=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_eab.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_eac){
if(StageBinding.isViewOpen(_eac)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_eac);
}else{
var _ead=ViewDefinitions[_eac];
StageBinding.presentViewDefinition(_ead);
}
};
StageBinding.isViewOpen=function(_eae){
return StageBinding.bindingInstance._activeViewDefinitions[_eae]!=null;
};
StageBinding.presentViewDefinition=function(_eaf){
if(_eaf.label!=null){
var _eb0=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_eb0,[_eaf.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_eaf);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_eb2,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _eb4=System.getPerspectiveNodes();
if(_eb4.hasEntries()){
this._initializeSystemViewDefinitions(_eb4);
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
var _eb6=null;
if(LocalStore.isEnabled){
_eb6=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_eb6&&ViewDefinitions[_eb6]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_eb6));
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
var _eb8=root.getActionProfile();
if(_eb8&&_eb8.hasEntries()){
var _eb9=top.app.bindingMap.toolsmenugroup;
if(_eb9){
_eb8.each(function(_eba,list){
list.each(function(_ebc){
var item=MenuItemBinding.newInstance(_eb9.bindingDocument);
item.setLabel(_ebc.getLabel());
item.setToolTip(_ebc.getToolTip());
item.setImage(_ebc.getImage());
item.setDisabled(_ebc.isDisabled());
item.associatedSystemAction=_ebc;
var _ebe=_eb9;
var tag=_ebc.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_ebe=top.app.bindingMap.translationsmenugroup;
break;
}
}
_ebe.add(item);
});
});
_eb9.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_ec0){
while(_ec0.hasNext()){
var node=_ec0.getNext();
var _ec2=node.getHandle();
ViewDefinitions[_ec2]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_ec3){
StageBinding.superclass.handleAction.call(this,_ec3);
var _ec4=_ec3.target;
switch(_ec3.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_ec4;
this._inflateBinding(_ec4);
_ec3.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_ec4;
this._inflateBinding(_ec4);
_ec3.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_ec4);
_ec3.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ec4 instanceof DockBinding){
switch(_ec4.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_ec4.reference,_ec4);
break;
}
this.handleAttachedDock(_ec4);
_ec3.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_ec4 instanceof DockBinding){
this.handleSelectedDockTab(_ec4.getSelectedTabBinding());
_ec3.consume();
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
_ec3.consume();
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
_ec3.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ec3);
};
StageBinding.prototype.handleBroadcast=function(_ec6,arg){
StageBinding.superclass.handleBroadcast.call(this,_ec6,arg);
switch(_ec6){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _ec8=arg;
this._dontView(_ec8);
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
StageBinding.prototype._showStart=function(_eca){
if(_eca!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ecd=this.bindingWindow.bindingMap.maindecks;
if(_eca){
_ecd.select("startdeck");
view.show();
}else{
view.hide();
_ecd.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_eca;
}
};
StageBinding.prototype._inflateBinding=function(_ece){
for(var _ecf in ViewDefinitions){
var _ed0=ViewDefinitions[_ecf];
if(_ed0 instanceof SystemViewDefinition){
_ece.mountDefinition(_ed0);
}
}
var _ed1=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ed1){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ed4=new StageCrawler();
_ed4.mode=mode;
_ed4.crawl(this.bindingElement);
_ed4.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ed5){
var _ed6=_ed5.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ed6);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ed6));
}
};
StageBinding.prototype.handleAttachedDock=function(_ed7){
var _ed8=_ed7.getTabBindings();
if(_ed8.hasEntries()){
while(_ed8.hasNext()){
var _ed9=_ed8.getNext();
var _eda=_ed9.getHandle();
if(_eda){
if(_eda=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _edb=ViewDefinitions[_eda];
if(_edb){
this._view(_ed7,_ed9,_edb,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_eda+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_edc){
var _edd=null;
var _ede=false;
switch(_edc.position){
case Dialog.MODAL:
_edd=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_edd=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_edc.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_edd=this._dockBindings.get(_edc.position);
break;
case DockBinding.EXTERNAL:
window.open(_edc.url);
_ede=true;
break;
default:
var _edf=this._decksBinding.getSelectedDeckBinding();
_edd=_edf.getDockBindingByReference(_edc.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ee0=this.bindingWindow.bindingMap.maindecks;
_ee0.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ede=true;
}
break;
}
if(!_ede){
if(_edd!=null){
this._view(_edd,null,_edc,true);
}else{
throw "StageBinding: Could not position view: "+_edc.handle;
}
}
};
StageBinding.prototype._view=function(_ee1,_ee2,_ee3,_ee4){
var _ee5=_ee3.handle;
if(_ee3.isMutable){
_ee5+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ee5]){
var _ee6=ViewBinding.getInstance(_ee5);
if(_ee6!=null){
_ee6.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ee5);
}
}else{
this._activeViewDefinitions[_ee5]=_ee3;
Application.lock(this);
switch(_ee1.constructor){
case DockBinding:
if(_ee4){
_ee1.prepareNewView(_ee3);
}else{
_ee1.prepareOpenView(_ee3,_ee2);
}
break;
case StageDialogBinding:
if(_ee4){
_ee1.prepareNewView(_ee3);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ee7){
if(this._activeViewDefinitions[_ee7]!=null){
delete this._activeViewDefinitions[_ee7];
}else{
this.logger.debug("Could not unregister active view: "+_ee7);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ee8){
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
this.addFilter(function(_eea){
var _eeb=UserInterface.getBinding(_eea);
var _eec=null;
if(_eeb){
switch(_eeb.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_eeb.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_eeb.handleUnMaximization();
break;
}
break;
case DockBinding:
_eec=NodeCrawler.SKIP_NODE;
break;
}
}
return _eec;
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
var _eed=null;
this._dialogs.each(function(_eee){
if(!_eee.isVisible){
_eed=_eee;
}
return _eed!=null;
});
if(!_eed){
this._newInstance();
_eed=this._dialogs.getLast();
}
_eed.setModal(false);
return _eed;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _eef=this.getInstance();
_eef.setModal(true);
return _eef;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _ef0=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_ef0);
_ef0.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ef1){
if(_ef1 instanceof DialogViewDefinition){
var _ef2=ViewBinding.newInstance(this.bindingDocument);
_ef2.setDefinition(_ef1);
_ef2.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ef1.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ef1.handler)){
this._dialogResponseHandler=_ef1.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ef2;
this._body.add(_ef2);
_ef2.attach();
_ef2.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ef3){
StageDialogBinding.superclass.handleAction.call(this,_ef3);
var _ef4=_ef3.target;
switch(_ef3.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ef4);
_ef3.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ef4.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ef3.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ef4.response){
this._handleDialogPageResponse(_ef4);
}
_ef3.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ef3.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ef3.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ef4.dispose();
_ef3.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ef3.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ef3.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ef3.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ef3.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ef3.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ef4==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ef5,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ef5,arg);
switch(_ef5){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_ef7){
var _ef8=new FitnessCrawler();
var list=new List();
if(_ef7){
_ef8.mode=FitnessCrawler.MODE_BRUTAL;
}
_ef8.crawl(this.bindingElement,list);
_ef8.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_efa){
_efa.fit(_ef7);
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
var _efb=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_efb){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_efd){
var cmd=_efd.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_eff){
if(_eff.bindingDocument==this._viewBinding.getContentDocument()){
if(_eff instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_eff);
}
this._pageBinding=_eff;
if(_eff.height=="auto"){
_eff.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_eff);
_eff.enableAutoHeightLayoutMode(false);
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
if(_eff.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_eff);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_f00){
var _f01=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_f01){
var _f02=UserInterface.getBinding(_f01);
_f02.setDisabled(_f00);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_f03){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_f03.response,_f03.result!=null?_f03.result:null);
}
var self=this;
setTimeout(function(){
self.close();
},0);
};
StageDialogBinding.prototype.handleInvokedControl=function(_f05){
if(_f05.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_f05);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_f07){
switch(_f07.type){
case MenuItemBinding.ACTION_COMMAND:
if(_f07.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_f07.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_f08){
var _f09=_f08.label;
var _f0a=_f08.image;
var _f0b=_f08.width;
var _f0c=_f08.height;
var _f0d=_f08.controls;
var _f0e=_f08.isResizable;
if(_f09){
this.setLabel(_f09);
}
if(_f0a){
this.setImage(_f0a);
}
if(_f0b||_f0c){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_f0b?_f0b:old.w;
}else{
nev.w=old.w;
}
nev.h=(_f0c!=null&&_f0c!="auto")?_f0c:old.h;
this.setDimension(nev);
}
if(_f0d){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f12=new List(_f0d.split(" "));
while((type=_f12.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_f0e!=this._isResizable){
this.setResizable(_f0e);
}
if(_f0c=="auto"){
this._fixAutoHeight(_f08);
}
if(_f08==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f13){
var dim=this.getDimension();
var _f15=0;
var _f16=0;
if(_f13.isDialogSubPage){
_f13=this._pageBinding;
}
if(this._isFirstPage){
_f15=_f13.width!=null?_f13.width:dim.w;
}else{
_f15=dim.w;
}
_f16=_f13.bindingElement.offsetHeight;
_f16+=this._titlebar.bindingElement.offsetHeight;
_f16+=4;
if(_f16<dim.h){
_f16=dim.h;
}
if(_f13.minheight!=null){
if(_f16<_f13.minheight){
_f16=_f13.minheight;
}
}
this.setDimension(new Dimension(_f15,_f16));
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
StageDialogBinding.newInstance=function(_f19){
var _f1a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f19);
var _f1b=UserInterface.registerBinding(_f1a,StageDialogBinding);
_f1b.setProperty("controls","minimize maximize close");
return _f1b;
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
this.addFilter(function(_f1c,list){
var _f1e=null;
var _f1f=UserInterface.getBinding(_f1c);
if(!_f1f.isVisible){
_f1e=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f1e;
});
this.addFilter(function(_f20,list){
var _f22=null;
var _f23=UserInterface.getBinding(_f20);
if(_f23.isAttached){
if(Interfaces.isImplemented(IFit,_f23)){
if(!_f23.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f23);
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
StageDecksBinding.prototype.mountDefinition=function(_f24){
var _f25=StageDeckBinding.newInstance(this.bindingDocument);
_f25.handle=_f24.handle;
_f25.perspectiveNode=_f24.node;
this._decks[_f25.handle]=_f25;
this.add(_f25);
_f25.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f26){
var _f27=this._decks[_f26];
StageBinding.perspectiveNode=_f27.perspectiveNode;
this.select(_f27);
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
StageDeckBinding.prototype.handleAction=function(_f28){
StageDeckBinding.superclass.handleAction.call(this,_f28);
var _f29=_f28.target;
switch(_f28.type){
case WindowBinding.ACTION_LOADED:
if(_f29==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f28.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f29 instanceof DockBinding){
this._dockBindings.set(_f29.reference,_f29);
_f29.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f28.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f28.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f28);
StageDeckBinding.superclass.handleAction.call(this,_f28);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f2b=new StageCrawler();
_f2b.mode=mode;
_f2b.crawl(this.windowBinding.getContentDocument().body);
_f2b.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f2c){
return this._dockBindings.get(_f2c);
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
StageDeckBinding.newInstance=function(_f2e){
var _f2f=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f2e);
var _f30=UserInterface.registerBinding(_f2f,StageDeckBinding);
return _f30;
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
StageSplitBoxBinding.prototype.handleAction=function(_f31){
StageSplitBoxBinding.superclass.handleAction.call(this,_f31);
StageBoxAbstraction.handleAction.call(this,_f31);
var _f32=_f31.target;
var _f33=null;
var _f34=null;
switch(_f31.type){
case DockBinding.ACTION_EMPTIED:
_f34=this.getChildBindingByLocalName("splitter");
if(_f34.isVisible){
_f34.hide();
}
_f33=this.getDescendantBindingsByLocalName("dock");
if(_f33.getFirst().isEmpty&&_f33.getLast().isEmpty){
if(_f33.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f31.consume();
break;
case DockBinding.ACTION_OPENED:
_f33=this.getDescendantBindingsByLocalName("dock");
if(!_f33.getFirst().isEmpty&&!_f33.getLast().isEmpty){
_f34=this.getChildBindingByLocalName("splitter");
if(!_f34.isVisible){
_f34.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f31.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f32!=this){
_f34=this.getChildBindingByLocalName("splitter");
if(_f34.isVisible){
_f34.hide();
}
this.invokeLayout();
_f31.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f32!=this){
var _f35=this.getChildBindingsByLocalName("splitpanel");
if(_f35.getFirst().isVisible&&_f35.getLast().isVisible){
_f34=this.getChildBindingByLocalName("splitter");
if(!_f34.isVisible){
_f34.show();
}
}
this.invokeLayout();
_f31.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f36){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f36);
switch(_f36.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f36.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f37=this.getChildBindingsByLocalName("splitpanel");
return _f37.getFirst().isVisible&&_f37.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f38=this.getChildBindingsByLocalName("splitpanel");
return _f38.getFirst().isFixed&&_f38.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f39){
StageSplitPanelBinding.superclass.handleAction.call(this,_f39);
StageBoxAbstraction.handleAction.call(this,_f39);
switch(_f39.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f39.type==StageSplitBoxBinding.ACTION_HIDE){
_f39.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f39.type==DockBinding.ACTION_EMPTIED){
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
if(_f39.type==StageSplitBoxBinding.ACTION_SHOW){
_f39.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f3c=_f39.target;
if(_f3c!=this&&_f3c.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f3d=_f3c._containingSplitBoxBinding;
if(_f3d.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f3e=_f3d.getChildBindingsByLocalName("splitpanel");
var _f3f=_f3e.getFirst();
var _f40=_f3e.getLast();
if(this.isFixed==true){
if(!_f3f.isFixed||!_f40.isFixed||(!_f3d.hasBothPanelsVisible()&&_f3c.isMinimizedForReal)){
this.setFix(false);
_f39.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f3d.hasBothPanelsFixed()||(!_f3d.hasBothPanelsVisible()&&_f3c.isMinimizedForReal)){
this.setFix(_f3c.getContainedDock().getHeight());
_f39.consume();
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
var _f41=this.getContainedDock();
if(_f41){
if(this.isMaximizePrepared==true){
}else{
_f41.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f42=this.getContainedDock();
if(_f42){
if(_f42.type==DockBinding.TYPE_EDITORS){
if(_f42.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f42.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f43=this.getContainedDock();
if(_f43){
_f43.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f43);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f44=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f45=this.getContainedDock();
if(_f45){
_f45.collapse(_f44);
if(!_f44){
this.setFix(_f45.getHeight());
}else{
this.setFix(_f45.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f45&&_f45.isActive){
_f45.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f45);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f46){
var _f47=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f48=this.getContainedDock();
if(_f48){
if(this.isMinimized==true){
_f48.unCollapse(_f47);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f46){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f48){
_f48.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f48);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f49){
var _f4a=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f4a=false;
}
}
if(_f4a==true){
this._invisibilize(_f49);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f4c){
if(_f4c!=this._isInvisibilized){
if(_f4c){
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
StageSplitterBinding.prototype.onDragStart=function(_f4d){
var _f4e=top.app.bindingMap.stagesplittercover;
var _f4f=this._containingSplitBoxBinding.getOrient();
switch(_f4f){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f4e.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f4e.bindingElement.style.cursor="n-resize";
break;
}
_f4e.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f4f);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f55){
this._orient=_f55;
this.attachClassName(_f55);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f57=true;
var _f58=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f58=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f57=false;
break;
}
if(_f57){
this.bindingElement.style.left=pos.x+"px";
}
if(_f58){
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
StageBoxAbstraction.handleAction=function(_f5a){
switch(_f5a.type){
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
if(_f5a.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f5a.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f5b=this.bindingElement.style;
_f5b.position="absolute";
_f5b.width="100%";
_f5b.height="100%";
_f5b.top="0";
_f5b.left="0";
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
var _f5c=this.bindingElement.style;
_f5c.position="relative";
_f5c.width="auto";
_f5c.height="auto";
_f5c.top="auto";
_f5c.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f5d,_f5e){
var _f5f=_f5d.bindingElement.style;
var _f60=_f5d.bindingElement.parentNode;
var box=_f5d._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f5e){
_f5d._unmodifiedFlexMethod=_f5d.flex;
_f5d.flex=function(){
_f5f.width=_f60.offsetWidth+"px";
_f5f.height=_f60.offsetHeight+"px";
};
}else{
_f5f.width="100%";
_f5f.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f5f.width="auto";
_f5f.height="auto";
box.reflex(true);
},0);
}
_f5d.flex=_f5d._unmodifiedFlexMethod;
_f5d._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f62){
var _f63=_f62.target;
switch(_f62.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f63 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f62);
_f62.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f62.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f64){
var mode=null;
switch(_f64.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f66){
StageMenuBarBinding.superclass.handleAction.call(this,_f66);
switch(_f66.type){
case MenuItemBinding.ACTION_COMMAND:
var _f67=_f66.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f67){
SystemAction.invoke(_f67,this._rootNode);
}
}
_f66.consume();
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
var _f68=this.getProperty("handle");
if(_f68){
this._handle=_f68;
if(StageBinding.isViewOpen(_f68)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f68);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f6a){
this.setProperty("handle",_f6a);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f6b,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f6b,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f6b){
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
StageViewMenuItemBinding.newInstance=function(_f6d){
var _f6e=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f6d);
UserInterface.registerBinding(_f6e,StageViewMenuItemBinding);
return UserInterface.getBinding(_f6e);
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
StageStatusBarBinding.prototype.setLabel=function(_f6f){
this._label.setLabel(_f6f);
};
StageStatusBarBinding.prototype.setImage=function(_f70){
this._label.setImage(_f70);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f71){
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
var _f72=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f73=_f72.getAssociatedView();
var _f74=_f73.getContentWindow().bindingMap.tree;
var _f75=_f74.getFocusedTreeNodeBindings();
if(!_f75.hasEntries()&&StageBinding.treeSelector){
_f75=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f75;
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
ExplorerBinding.prototype.handleAction=function(_f76){
ExplorerBinding.superclass.handleAction.call(this,_f76);
var _f77=_f76.target;
switch(_f76.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f76.consume();
break;
case Binding.ACTION_DRAG:
if(_f77 instanceof ExplorerSplitterBinding){
_f77.dragger.registerHandler(this);
}
_f76.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f79){
this._menuBinding.setSelectionByHandle(_f79);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f7a){
if(_f7a instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f7a);
this._menuBinding.mountDefinition(_f7a);
}
};
ExplorerBinding.prototype.onDragStart=function(_f7b){
var _f7c=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f7c.hasEntries()){
var _f7d=_f7c.getFirst();
this._dragStart=_f7d.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f7d.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f81){
if(_f81 instanceof SystemViewDefinition){
var _f82=ViewBinding.newInstance(this.bindingDocument);
_f82.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f82.setDefinition(_f81);
var _f83=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f83.setAssociatedView(_f82);
this._decks[_f81.handle]=_f83;
_f83.add(_f82);
this.add(_f83);
function attach(){
_f83.attach();
_f82.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f84){
var _f85=this._decks[_f84];
this.select(_f85);
};
DecksBinding.prototype.expandBy=function(_f86){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f88=this.bindingElement.offsetHeight+_f86;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f88+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f8a){
var _f8b=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f8a);
return UserInterface.registerBinding(_f8b,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f8c){
this._viewBinding=_f8c;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f8d=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f8e=this._viewBinding.getDefinition().label;
StatusBar.busy(_f8d,[_f8e]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f8f){
ExplorerDeckBinding.superclass.handleAction.call(this,_f8f);
var _f90=_f8f.target;
switch(_f8f.type){
case PageBinding.ACTION_INITIALIZED:
if(_f90 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f90.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f91,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f91,arg);
switch(_f91){
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
var _f93=null;
if(this._isExplorerDeckBindingInitialized){
_f93=this._viewBinding.getDefinition().label;
}else{
_f93=DockTabBinding.LABEL_TABLOADING;
}
return _f93;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f94=null;
if(this._isExplorerDeckBindingInitialized){
_f94=this._viewBinding.getDefinition().image;
}else{
_f94=DockTabBinding.IMG_TABLOADING;
}
return _f94;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f95=null;
if(this._isExplorerDeckBindingInitialized){
_f95=this._viewBinding.getDefinition().toolTip;
}
return _f95;
};
ExplorerDeckBinding.newInstance=function(_f96){
var _f97=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f96);
return UserInterface.registerBinding(_f97,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f98){
switch(_f98.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f98.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f98.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f98);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f99){
this._maxButtons.set(_f99.handle,this._mountMaxButton(_f99));
this._minButtons.set(_f99.handle,this._mountMinButton(_f99));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f9a){
var _f9b=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f9b.setLabel(_f9a.label);
_f9b.setToolTip(_f9a.toolTip);
_f9b.handle=_f9a.handle;
_f9b.node=_f9a.node;
this._maxGroup.add(_f9b);
this._maxList.add(_f9b);
_f9b.attach();
return _f9b;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f9c){
var _f9d=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f9d.setLabel(_f9c.label);
_f9d.setToolTip(_f9c.label);
_f9d.handle=_f9c.handle;
_f9d.node=_f9c.node;
this._minGroup.addFirst(_f9d);
this._minList.add(_f9d);
_f9d.attach();
_f9d.hide();
return _f9d;
};
ExplorerMenuBinding.prototype.handleAction=function(_f9e){
ExplorerMenuBinding.superclass.handleAction.call(this,_f9e);
switch(_f9e.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f9f=_f9e.target;
var _fa0=_f9f.getCheckedButtonBinding();
var _fa1=_fa0.handle;
switch(_f9f){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_fa1),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_fa1),true);
break;
}
this._selectedHandle=_fa1;
this._selectedTag=_fa0.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f9e.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_fa2){
var _fa3=this._maxButtons.get(_fa2);
if(_fa3){
_fa3.check();
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
var _fa4=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_fa4=true;
}
return _fa4;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _fa6=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_fa6=true;
}
return _fa6;
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
ExplorerToolBarBinding.newInstance=function(_fa7){
var _fa8=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_fa7);
return UserInterface.registerBinding(_fa8,ExplorerToolBarBinding);
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
var _fa9=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _faa=_fa9?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_faa);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_fab,_fac){
var _fad=(_fac==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _fae=DOMUtil.createElementNS(Constants.NS_UI,_fad,_fab);
var _faf=UserInterface.registerBinding(_fae,ExplorerToolBarButtonBinding);
_faf.explorerToolBarButtonType=_fac;
return _faf;
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
EditorBinding.registerComponent=function(_fb0,_fb1){
var _fb2=EditorBinding._components;
var _fb3=EditorBinding._editors;
var key=_fb1.key;
var _fb5=Interfaces.isImplemented(IWysiwygEditorComponent,_fb0);
if(!_fb5){
_fb5=Interfaces.isImplemented(ISourceEditorComponent,_fb0);
}
if(_fb5){
if(_fb3.has(key)){
_fb3.get(key).initializeEditorComponent(_fb0);
}else{
if(!_fb2.has(key)){
_fb2.set(key,new List());
}
_fb2.get(key).add(_fb0);
}
}else{
throw "Editor component interface not implemented: "+_fb0;
}
};
EditorBinding.claimComponents=function(_fb6,_fb7){
var _fb8=EditorBinding._components;
var _fb9=EditorBinding._editors;
var key=_fb7.key;
_fb9.set(key,_fb6);
var list=null;
if(_fb8.has(key)){
list=_fb8.get(key).copy();
_fb8.del(key);
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
var _fbd=this.getProperty("value");
if(_fbd!=null){
_fbd=decodeURIComponent(_fbd);
this._startContent=_fbd;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fbf=this.bindingWindow.DataManager;
_fbf.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fc1){
var _fc2=EditorBinding.claimComponents(this,_fc1);
if(_fc2!=null){
while(_fc2.hasNext()){
this.initializeEditorComponent(_fc2.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fc4=this.bindingWindow.DataManager;
if(_fc4.getDataBinding(name)){
_fc4.unRegisterDataBinding(name);
}
_fc4.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fc5=this.getEditorDocument();
if(_fc5!=null){
Application.framework(_fc5);
DOMEvents.addEventListener(_fc5,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fc5,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fc5,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fc5,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fc7){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fc7==true){
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
var _fc9=this.getCheckSum();
if(_fc9!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fc9;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fca=null;
if(Binding.exists(this._pageBinding)){
_fca=this._pageBinding.getCheckSum(this._checksum);
}
return _fca;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fcc=DOMEvents.getTarget(e);
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
if(_fcc.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fce,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fce,arg);
var _fd0=null;
switch(_fce){
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
var _fd1=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fd1=false;
}
}
}else{
_fd0=DOMEvents.getTarget(arg);
if(_fd0&&_fd0.ownerDocument==this.getEditorDocument()){
_fd1=false;
}
}
if(_fd1){
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
EditorBinding.prototype._activateEditor=function(_fd2){
if(_fd2!=this._isActivated){
this._isActivated=_fd2;
EditorBinding.isActive=_fd2;
var _fd3=this.getEditorWindow().standardEventHandler;
var _fd4=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fd4!=null){
if(_fd2){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fd4.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fd3.enableNativeKeys(true);
}else{
_fd4.disable();
_fd3.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fd5=this.getEditorDocument().selection.createRange();
_fd5.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fd6=false;
try{
if(!Client.isExplorer){
var _fd7=this.getEditorWindow().getSelection();
if(_fd7!=null){
_fd6=_fd7.toString().length>0;
if(!_fd6){
var _fd8=_fd7.getRangeAt(0);
var frag=_fd8.cloneContents();
var _fda=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fda.appendChild(frag.firstChild);
}
var img=_fda.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fd6=true;
}
}
}
}
}else{
var _fd8=this.getEditorDocument().selection.createRange();
_fd6=(_fd8&&_fd8.text)&&_fd8.text.length>0;
if(_fd8.commonParentElement&&VisualEditorBinding.isImageElement(_fd8.commonParentElement())){
_fd6=true;
}
}
}
catch(exception){
}
return _fd6;
};
EditorBinding.prototype.isCommandEnabled=function(_fdc){
var _fdd=true;
switch(_fdc){
case "Cut":
case "Copy":
case "Paste":
_fdd=this.getEditorDocument().queryCommandEnabled(_fdc);
break;
}
return _fdd;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fe1=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fe2=null;
if(cmd=="Paste"){
_fe2=null;
}else{
_fe2=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fe2);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fe1=true;
}
break;
}
return _fe1;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fe4=this.getContentWindow().bindingMap.toolbar;
var _fe5=_fe4.getButtonForCommand(cmd);
if(!_fe5){
throw "No button for command "+cmd;
}
return _fe5;
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
var _fe8=this.getContentDocument().getElementById("focusableinput");
if(_fe8!=null){
_fe8.style.display="block";
FocusBinding.focusElement(_fe8);
_fe8.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fe9){
EditorBinding.superclass.handleAction.call(this,_fe9);
var _fea=_fe9.target;
var self=this;
var _fec=this.shadowTree.iframe;
switch(_fe9.type){
case Binding.ACTION_DIRTY:
if(_fe9.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fed){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fed);
};
EditorBinding.prototype.handleElement=function(_fee){
return true;
};
EditorBinding.prototype.updateElement=function(_fef){
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
var _ff2=this._menuGroups[rel];
if(_ff2 instanceof List){
_ff2.each(function(_ff3){
_ff3.show();
});
}
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
var _ff5=this._menuGroups[rel];
if(_ff5 instanceof List){
_ff5.each(function(_ff6){
_ff6.hide();
});
}
};
EditorPopupBinding.prototype.handleAction=function(_ff7){
EditorPopupBinding.superclass.handleAction.call(this,_ff7);
var _ff8=_ff7.target;
if(_ff7.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_ff8.getProperty("cmd");
var gui=_ff8.getProperty("gui");
var val=_ff8.getProperty("val");
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
var _ffc=this.bindingWindow.bindingMap.tinywindow;
var _ffd=this.bindingWindow.bindingMap.codepresswindow;
if(_ffc){
EditorBinding.registerComponent(this,_ffc);
}else{
if(_ffd){
EditorBinding.registerComponent(this,_ffd);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_ffe,_fff,_1000,theme){
this._editorBinding=_ffe;
this._tinyEngine=_fff;
this._tinyInstance=_1000;
this._tinyTheme=theme;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_1002,frame,_1004){
this._editorBinding=_1002;
this._codePressFrame=frame;
this._codePressEngine=_1004;
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
var _1007=this._editorBinding;
if(_1007!=null){
var self=this;
var _1009={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_1007.hasBookmark()){
_1007.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_1007.hasBookmark()){
_1007.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_1009);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_1009);
}
};
EditorClickButtonBinding.newInstance=function(_100b){
var _100c=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_100b);
return UserInterface.registerBinding(_100c,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_100d){
var _100e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_100d);
return UserInterface.registerBinding(_100e,EditorToolBarButtonBinding);
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
var _100f=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_100f);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_1010,_1011,_1012,theme){
this._editorBinding=_1010;
this._tinyEngine=_1011;
this._tinyInstance=_1012;
this._tinyTheme=theme;
};
EditorSelectorBinding.prototype.handleAction=function(_1014){
EditorSelectorBinding.superclass.handleAction.call(this,_1014);
switch(_1014.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_1014);
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
EditorMenuItemBinding.newInstance=function(_1018){
var _1019=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1018);
return UserInterface.registerBinding(_1019,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_101a){
var i=0,_101c,_101d=[],split=_101a.split(" ");
while((_101c=split[i++])!=null){
if(_101c.length>=3&&_101c.substring(0,3)=="mce"){
continue;
}else{
if(_101c.length>=14&&_101c.substring(0,14)=="compositemedia"){
continue;
}
}
_101d.push(_101c);
}
return _101d.join(" ");
};
VisualEditorBinding.getStructuredContent=function(_101f){
var _1020=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_101f);
if(soap instanceof SOAPFault){
}else{
_1020=soap.XhtmlFragment;
if(!_1020){
_1020="";
}
}
WebServiceProxy.isFaultHandler=true;
return _1020;
};
VisualEditorBinding.getTinyContent=function(_1022,_1023){
var _1024=null;
if(_1022==null||_1022==""){
_1022=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_1022);
if(soap instanceof SOAPFault){
var _1026=soap;
var _1027={handleDialogResponse:function(){
_1023.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1027,_1026);
}else{
_1024=soap.XhtmlFragment;
if(_1024==null){
_1024=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _1024;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _102a=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _102c=new List(doc.documentElement.childNodes);
var _102d=new List();
_102c.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_102d.add(child);
}
});
var _102f=_102d.get(index);
if(_102f==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_102f.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_102f.hasChildNodes()){
frag.appendChild(_102f.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_102a=DOMSerializer.serialize(doc.documentElement);
_102a=_102a.substring(_102a.indexOf(">")+1,_102a.length);
_102a=_102a.substring(0,_102a.lastIndexOf("<"));
}
}
}
if(_102a==null){
_102a=new String("");
}
return _102a;
};
VisualEditorBinding.isImage=function(_1031){
result=_1031&&_1031.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_1032){
return VisualEditorBinding.isImage(_1032)&&!VisualEditorBinding.isReservedElement(_1032);
};
VisualEditorBinding.isReservedElement=function(_1033){
if(VisualEditorBinding.isFunctionElement(_1033)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1033)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1033)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1034){
return VisualEditorBinding.isImage(_1034)&&CSSUtil.hasClassName(_1034,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1035){
return VisualEditorBinding.isImage(_1035)&&CSSUtil.hasClassName(_1035,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1036){
return VisualEditorBinding.isImage(_1036)&&CSSUtil.hasClassName(_1036,VisualEditorBinding.HTML_CLASSNAME);
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
var _1037=this.getProperty("embedablefieldstypenames");
if(_1037!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1037);
}
var _1038=this.getProperty("formattingconfiguration");
if(_1038!=null){
this._url+="?config="+_1038;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1039,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1039,arg);
var _103b=this.getContentWindow().bindingMap.tinywindow;
var _103c=_103b.getContentWindow();
switch(_1039){
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_103c){
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
this.initializeEditorComponents(_103b);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_103d){
_103d.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_103e){
VisualEditorBinding.superclass._onPageInitialize.call(this,_103e);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_1041){
var _1042=_1041;
if(!this._isNormalizedDocument(_1041)){
_1042=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_1041);
}
return _1042;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1043){
var _1044=false;
var doc=XMLParser.parse(_1043,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1044=true;
}
}
if(Client.isWebKit){
if(_1043.indexOf("<html")!==0){
_1044=false;
}
}
return _1044;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1049=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1049){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1049=true;
}
return _1049;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _104b=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_104b);
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
VisualEditorBinding.prototype.setResult=function(_104d){
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
VisualEditorPopupBinding.prototype.configure=function(_104e,_104f,_1050){
var _1051=this.editorBinding.hasSelection();
this.tinyInstance=_104e;
this.tinyEngine=_104f;
this.tinyElement=_1050;
this.hasSelection=_1051;
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
var _1055=false;
if(this.hasSelection){
_1055=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1055=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1055=true;
}
}
}
}
if(_1055){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1056=this.getMenuItemForCommand("compositeInsertLink");
var _1057=this.getMenuItemForCommand("unlink");
var _1058=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1059=this.editorBinding.getButtonForCommand("unlink");
_1057.setDisabled(_1059.isDisabled);
if(_1057.isDisabled){
_1056.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1056.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _105a=this.editorBinding.embedableFieldConfiguration;
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
if(_105a){
var _105d=_105a.getGroupNames();
if(_105d.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_105d.each(function(_1061){
var _1062=_105a.getFieldNames(_1061);
_1062.each(function(_1063){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1063);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1061+":"+_1063);
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
var _1065=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1066=null;
var _1067=null;
if(_1065){
if(_1065.nodeName=="TD"){
_1066=_1065.getAttribute("colspan");
_1067=_1065.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1066=="1"&&_1067=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1065){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1068){
var _1069=VisualEditorFormattingConfiguration._configurations;
if(!_1069.has(_1068)){
_1069.set(_1068,new VisualEditorFormattingConfiguration());
}
return _1069.get(_1068);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_106b){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_106c){
var _106d=null;
var _106e=VisualEditorFieldGroupConfiguration._configurations;
if(!_106e.has(_106c)){
_106e.set(_106c,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_106c)));
}
return _106e.get(_106c);
};
function VisualEditorFieldGroupConfiguration(_106f){
var _1070=new Map();
new List(_106f).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1070.set(group.GroupName,map);
});
this._groups=_1070;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1074){
return this._groups.get(_1074).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1075,_1076){
return this._groups.get(_1075).get(_1076).xhtml;
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
var _1078=this.getDescendantElementsByLocalName("textarea");
while(_1078.hasNext()){
var _1079=_1078.getNext();
if(_1079.getAttribute("selected")=="true"){
this._startContent=_1079.value;
this._textareaname=_1079.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _107b=this.getContentWindow().bindingMap.templatetree;
_107b.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_107c){
var _107d=_107b.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_107d.textareaname);
_107c.consume();
}});
_107b.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_107e){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _107f=this.getContentWindow().bindingMap.toolsplitter;
_107f.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1080=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1080.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1080);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1081){
this._textareas=new Map();
while(_1081.hasNext()){
var _1082=_1081.getNext();
var _1083=_1082.getAttribute("placeholderid");
this._textareas.set(_1083,{placeholderid:_1083,placeholdername:_1082.getAttribute("placeholdername"),placeholdermarkup:_1082.value,textareaelement:_1082,isSelected:_1082.getAttribute("selected")=="true"});
}
var _1084=new Map();
this._textareas.each(function(name,_1086){
var _1087=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1087.setLabel(_1086.placeholdername);
_1087.setImage("${icon:placeholder}");
_1087.setProperty("placeholder",true);
_1087.textareaname=name;
_1084.set(_1086.placeholdername,_1087);
if(_1086.isSelected){
selected=_1087;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1088=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1088.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1089=this.getContentWindow().bindingMap.templatetree;
var _108a=_1089.add(TreeNodeBinding.newInstance(_1089.bindingDocument));
_108a.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_108a.setImage("${icon:warning}");
_108a.attach();
var _108b=this.getContentWindow().bindingMap.statusbar;
_108b.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _108d=this._textareas.get(name);
var _108e=_108d.placeholdermarkup;
this.setValue(this.normalizeToDocument(_108e));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_108f){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_108f;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1090=this.getContentWindow().bindingMap.statusbar;
_1090.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_108f);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1093="";
if(this._heads.has(this._textareaname)){
_1093=this._heads.get(this._textareaname);
if(_1093==null){
_1093=new String("");
}
}
return _1093;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1095){
_1095.textareaelement.value=_1095.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1096,_1097){
var _1098=_1096.getElementsByTagName("div").item(0);
var _1099=_1097.getElementsByTagName("div").item(0);
var _109a=new List(_1098.getElementsByTagName("textarea"));
var _109b=new List(_1099.getElementsByTagName("textarea"));
var _109c=false;
if(_109a.getLength()!=_109b.getLength()){
_109c=true;
}else{
var index=0;
_109a.each(function(_109e,index){
var _10a0=_109b.get(index);
var newid=_109e.getAttribute("placeholderid");
var oldid=_10a0.getAttribute("placeholderid");
var _10a3=_109e.getAttribute("placeholdername");
var _10a4=_10a0.getAttribute("placeholdername");
if(newid!=oldid||_10a3!=_10a4){
_109c=true;
}
return !_109c;
});
}
if(_109c){
var html=null;
if(_1098.innerHTML!=null){
html=_1098.innerHTML;
}else{
html=DOMSerializer.serialize(_1098);
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
var _10a8=this.getDescendantBindingByLocalName("selector");
_10a8.attach();
this._populateTemplateSelector();
var _10a9=this.getContentWindow().bindingMap.templateselector;
_10a9.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _10aa=this.getDescendantBindingByLocalName("selector");
var _10ab=this.getContentWindow().bindingMap.templateselector;
_10aa.selections.each(function(_10ac){
_10ac.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_10ab.populateFromList(_10aa.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _10ad=this.getDescendantBindingByLocalName("selector");
var _10ae=this.getContentWindow().bindingMap.templateselector;
_10ad.selectByValue(_10ae.getValue());
_10ad.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_10af){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_10b4,_10b5){
var _10b6=_10b5;
if(old.has(_10b4)){
_10b6=old.get(_10b4).placeholdermarkup;
}
return _10b6;
}
while(_10af.hasNext()){
var _10b7=_10af.getNext();
var _10b8=_10b7.getAttribute("placeholderid");
this._textareas.set(_10b8,{placeholderid:_10b8,placeholdername:_10b7.getAttribute("placeholdername"),placeholdermarkup:compute(_10b8,_10b7.value),textareaelement:_10b7,isSelected:_10b7.getAttribute("selected")=="true"});
}
var _10b9=null;
var _10ba=this.getContentWindow().bindingMap.templatetree;
var _10bb=new Map();
this._textareas.each(function(name,_10bd){
var _10be=_10ba.add(TreeNodeBinding.newInstance(_10ba.bindingDocument));
_10be.setLabel(_10bd.placeholdername);
_10be.setImage("${icon:placeholder}");
_10be.setProperty("placeholder",true);
_10be.textareaname=name;
_10bb.set(_10bd.placeholdername,_10be);
if(_10bd.isSelected){
_10b9=_10be;
}
});
_10ba.attachRecursive();
if(_10b9!=null){
var _10bf=true;
if(this._oldtextareas.hasEntries()){
_10bf=false;
var map=new Map();
this._textareas.each(function(id,_10c2){
map.set(_10c2.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10bf=true;
}
}
if(_10bf){
var _10c3=this._textareas.get(_10b9.textareaname);
this._textareaname=_10b9.textareaname;
this._placeholdername=_10c3.placeholdername;
this._setContentFromPlaceHolder(_10b9.textareaname);
_10b9.focus();
}else{
var _10c4=_10bb.get(this._placeholdername);
this._textareaname=_10c4.textareaname;
_10c4.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10c5,_10c6){
var _10c7=_10c5.getElementsByTagName("ui:selector").item(0);
var _10c8=_10c6.getElementsByTagName("ui:selector").item(0);
var _10c9=false;
if(_10c7!=null&&_10c8!=null){
var _10ca=new List(_10c7.getElementsByTagName("ui:selection"));
var _10cb=new List(_10c8.getElementsByTagName("ui:selection"));
if(_10ca.getLength()!=_10cb.getLength()){
_10c9=true;
}else{
_10ca.each(function(_10cc,index){
var _10ce=_10cc.getAttribute("value");
var _10cf=_10cb.get(index).getAttribute("value");
if(_10ce!=_10cf){
_10c9=true;
}
return !_10c9;
});
}
}
if(_10c9){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10c7);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10c5,_10c6);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10d1,frame,_10d3){
this._editorBinding=_10d1;
this._codePressFrame=frame;
this._codePressEngine=_10d3;
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
var _10d9=this.getProperty("validate");
if(_10d9==true){
this._hasStrictValidation=true;
}
var _10da=this.getProperty("validator");
if(_10da!=null){
this._validator=_10da;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10db,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10db,arg);
switch(_10db){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10dd=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10dd!=null){
var _10de=_10dd.getContentWindow();
if(arg.broadcastWindow==_10de){
this._codemirrorWindow=_10de;
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
this.initializeEditorComponents(_10dd);
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
this.unsubscribe(_10db);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10e2){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10e2);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10e3){
if(_10e3!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10e3;
EditorBinding.isActive=_10e3;
var _10e4=this.getContentWindow().standardEventHandler;
if(_10e3){
_10e4.enableNativeKeys(true);
}else{
_10e4.disableNativeKeys();
}
var _10e5=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10e5!=null){
if(_10e3){
_10e5.enable();
}else{
_10e5.disable();
}
}
if(_10e3){
this.focus();
var _10e6=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10ea=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10ea;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10eb){
_10eb.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10ed){
if(!this._isFinalized){
if(_10ed!=this._startContent){
this._startContent=_10ed;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10ed);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10ee=this.getContentWindow().bindingMap.editorpage.getContent();
if(_10ee!=null){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10ee=_10ee.replace("&nbsp;","&#160;").replace("&copy;","&#169;").replace("<!doctype","<!DOCTYPE");
break;
}
}
return _10ee?_10ee:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10ef){
if(this._pageBinding!=null){
this._pageBinding.cover(_10ef);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10f0){
if(_10f0!=null&&this.shadowTree.dotnetinput!=null){
var value=_10f0.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10f2=true;
var _10f3=this.getContent();
if(this._validator!=null){
_10f2=Validator.validateInformed(_10f3,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10f2=XMLParser.isWellFormedDocument(_10f3,true);
if(_10f2==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10f2=this._isValidHTML(_10f3);
break;
}
}
break;
}
}
return _10f2;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10f5=true;
var doc=XMLParser.parse(xml);
var _10f7=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10f7.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10f7.add("NamespaceURI");
}
var head=null,body=null;
var _10fb=new List(root.childNodes);
while(_10fb.hasNext()){
var child=_10fb.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10f7.add("MultipleHead");
}
if(body!=null){
_10f7.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10f7.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10f7.add("MissingHead");
}
if(body==null){
_10f7.add("MissingBody");
}
}
if(_10f7.hasEntries()){
_10f5=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f7.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10f7.getFirst()));
}
}
return _10f5;
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
var _10fd=null;
var page=this._pageBinding;
if(page!=null){
_10fd=page.getCheckSum();
}
return _10fd;
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
ThrobberBinding.prototype.handleBroadcast=function(_10ff,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10ff,arg);
switch(_10ff){
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
ProgressBarBinding.notch=function(_1102){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1102);
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
ProgressBarBinding.prototype.notch=function(_1104){
_1104=_1104?_1104:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1104);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1106,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1106,arg);
switch(_1106){
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
StartMenuItemBinding.prototype.setChecked=function(_1108,_1109){
StartMenuItemBinding.superclass.setChecked.call(this,_1108,_1109);
if(!_1109){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_110a){
var _110b=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_110a);
UserInterface.registerBinding(_110b,StartMenuItemBinding);
return UserInterface.getBinding(_110b);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_110e,_110f){
var _1110=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_110f,true)==true){
if(_110e!="*"){
_110e=KeySetBinding._sanitizeKeyModifiers(_110e);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1110[doc]){
_1110[doc]={};
}
if(!_1110[doc][code]){
_1110[doc][code]={};
}
_1110[doc][code][_110e]=_110f;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1114=false;
var code=e.keyCode;
var _1116=KeySetBinding.keyEventHandlers;
if(_1116[doc]&&_1116[doc][code]){
var _1117="[default]";
_1117+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1117+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _1118=_1116[doc][code][_1117];
if(_1118==null){
_1118=_1116[doc][code]["*"];
}
if(_1118!=null){
_1118.handleKeyEvent(e);
_1114=true;
}
}
return _1114;
};
KeySetBinding._sanitizeKeyModifiers=function(_1119){
var _111a="[default]";
var mods={};
if(_1119){
new List(_1119.split(" ")).each(function(_111c){
mods[_111c]=true;
});
function check(_111d){
if(mods[_111d]){
_111a+=" "+_111d;
}
}
check("shift");
check("control");
}
return _111a;
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
var _1121=key.getAttribute("oncommand");
var _1122=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_1122){
DOMEvents.preventDefault(e);
}
var _1124=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_1121,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1125){
if(_1125 instanceof CursorBinding){
_1125.setOpacity(0);
_1125.show();
new Animation({modifier:9,onstep:function(_1126){
_1125.setOpacity(Math.sin(_1126*Math.PI/180));
},onstop:function(){
_1125.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1127){
if(_1127 instanceof CursorBinding){
new Animation({modifier:9,onstep:function(_1128){
_1127.setOpacity(Math.cos(_1128*Math.PI/180));
},onstop:function(){
_1127.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1129,_112a,_112b){
if(_1129 instanceof CursorBinding){
_112b.x-=16;
_112b.y-=16;
new Animation({modifier:3,onstep:function(_112c){
var tal=Math.sin(_112c*Math.PI/180);
_1129.setPosition(new Point(((1-tal)*_112a.x)+((0+tal)*_112b.x),((1-tal)*_112a.y)+((0+tal)*_112b.y)));
},onstop:function(){
CursorBinding.fadeOut(_1129);
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
CursorBinding.prototype.setOpacity=function(_1132){
this.bindingElement.style.opacity=new String(_1132);
this._opacity=_1132;
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
function setOpacity(_1135){
cover.bindingElement.style.opacity=new String(_1135);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstep:function(_1136){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1136*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1138){
cover.bindingElement.style.MozOpacity=new String(_1138);
}
if(cover instanceof CoverBinding){
new Animation({modifier:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1139){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1139*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_113b){
if(_113b!=this._isBusy){
if(_113b){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_113b;
}
};
CoverBinding.prototype.setTransparent=function(_113c){
if(_113c!=this._isTransparent){
if(_113c){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_113c;
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
CoverBinding.prototype.setHeight=function(_113e){
if(_113e>=0){
this.bindingElement.style.height=new String(_113e+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_113f){
var _1140=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_113f);
return UserInterface.registerBinding(_1140,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1142=UncoverBinding._bindingInstance;
if(Binding.exists(_1142)){
_1142.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1146){
this._isFading=_1146==true;
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
var _1147=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1147.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1147.clearRect(0,0,300,150);
_1147.fillRect(0,0,300,150);
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
var _1149=this._canvas.getContext("2d");
_1149.clearRect(0,0,300,150);
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
var _114a=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_114a);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _114b=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_114b){
this._startcontent=_114b.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_114c){
SourceCodeViewerBinding.superclass.handleAction.call(this,_114c);
switch(_114c.type){
case WindowBinding.ACTION_ONLOAD:
if(_114c.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_114c.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_114c);
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
var _1150=this._transformer.transformToString(doc);
this._inject(_1150);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1153){
this.getContentDocument().body.innerHTML=_1153;
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
var _115b=list.getNext();
var id=_115b.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_115b);
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
var _1165=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1165.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1165.appendChild(att);
}
elm.appendChild(_1165);
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
var _116f=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_116f){
doc=XMLParser.parse(_116f);
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
var _1173=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1173;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1174,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1174,arg);
switch(_1174){
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
var _1177=new List();
list.each(function(lang){
_1177.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1177);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_117b){
switch(_117b){
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
var _117e=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_117e,root);
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
var _117f=this.getProperty("status");
if(_117f!=null){
switch(_117f){
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
UserInterfaceMapping.prototype.merge=function(_1183){
for(var _1184 in _1183.map){
this.map[_1184]=_1183.getBindingImplementation(_1184);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1185){
var _1186=null;
var name=_1185.nodeName.toLowerCase();
if(this.map[name]){
_1186=this.map[name];
}
return _1186;
};
var UserInterface=new function(){
var _1188=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1189=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:urlinputdialog":UrlInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1188,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _118a=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_118c,impl){
var _118e=null;
if(!this.hasBinding(_118c)){
var _118f=DOMUtil.getParentWindow(_118c);
if(DOMUtil.getLocalName(_118c)!="bindingmapping"){
if(!impl&&_118c.getAttribute("binding")!=null){
var _1190=_118c.getAttribute("binding");
impl=_118f[_1190];
if(impl==null){
throw "No such binding in scope: "+_1190;
}
}
if(!impl){
var _1191=_118f.DocumentManager;
if(_1191){
var _1192=_1191.customUserInterfaceMapping;
if(_1192){
impl=_1192.getBindingImplementation(_118c);
}
}
}
if(!impl){
impl=_1189.getBindingImplementation(_118c);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_118e=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_118e){
var key=KeyMaster.getUniqueKey();
_118c.setAttribute("key",key);
_118e.key=key;
if(!_118c.id){
_118c.id=key;
}
keys[key]={element:_118c,binding:_118e};
_118e.onBindingRegister();
}
}
}
return _118e;
};
this.unRegisterBinding=function(_1194){
terminate(_1194);
};
function terminate(_1195){
if(Binding.exists(_1195)==true){
var key=_1195.key;
Binding.destroy(_1195);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1195=null;
}else{
_118a.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1197){
var _1198=null;
if(keys[_1197.key]){
_1198=keys[_1197.key].element;
}
return _1198;
};
this.getBinding=function(_1199){
var _119a=null;
if(_1199&&_1199.nodeType==Node.ELEMENT_NODE){
try{
var key=_1199.getAttribute("key");
if(key&&keys[key]){
_119a=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1199);
if(exception.stack){
alert(exception.stack);
}
}
}
return _119a;
};
this.getBindingByKey=function(key){
var _119d=null;
if(keys[key]){
_119d=keys[key].binding;
}
return _119d;
};
this.hasBinding=function(_119e){
return this.getBinding(_119e)!=null;
};
this.isBindingVisible=function(_119f){
var _11a0=Application.isOperational;
if(_11a0==true){
var _11a1=new Crawler();
_11a1.type=NodeCrawler.TYPE_ASCENDING;
_11a1.id="visibilitycrawler";
_11a1.addFilter(function(_11a2){
var b=UserInterface.getBinding(_11a2);
var res=0;
if(!b.isVisible){
_11a0=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_11a1.crawl(_119f.bindingElement);
_11a1.dispose();
}
return _11a0;
};
var _11a5=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_11a5={};
for(var key in keys){
_11a5[key]=true;
}
};
this.getPoint=function(){
var _11a9=null;
if(_11a5){
_11a9=new List();
for(var key in keys){
if(!_11a5[key]){
_11a9.add(key);
}
}
}
return _11a9;
};
this.clearPoint=function(){
_11a5=null;
};
this.trackUndisposedBindings=function(){
var _11ab=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_11ab){
_11ab="Bindings illdisposed: ";
}
_11ab+=entry.binding+" ";
}
}
if(_11ab!=null){
_118a.error(_11ab);
}
};
this.autoTrackDisposedBindings=function(_11ae){
if(_11ae){
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
SOAPRequest.newInstance=function(_11af,_11b0){
var _11b1=_11af+"/"+_11b0;
var _11b2=new SOAPRequest(_11b1);
var _11b3=SOAPRequest.resolver;
_11b2.document=Templates.getTemplateDocument("soapenvelope.xml");
_11b2.envelope=_11b3.resolve("soap:Envelope",_11b2.document);
_11b2.header=_11b3.resolve("soap:Header",_11b2.envelope);
_11b2.body=_11b3.resolve("soap:Body",_11b2.envelope);
return _11b2;
};
SOAPRequest._parseResponse=function(_11b4){
var _11b5=null;
var _11b6=false;
var doc=_11b4.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11b5=SOAPRequestResponse.newInstance(_11b4.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_11b4.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11b6=true;
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
var text=_11b4.responseText;
if(_11b4.status==503||text.indexOf("id=\"offline\"")>-1){
_11b6=true;
}else{
var cry="Invalid SOAP response: \n\n"+_11b4.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_11b4.responseText);
}
}
}
}
if(_11b6==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11b5;
};
function SOAPRequest(_11bb){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11bb;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11bd=DOMUtil.getXMLHTTPRequest();
var _11be=null;
_11bd.open("post",url,false);
_11bd.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11bd.setRequestHeader("SOAPAction",this.action);
try{
_11bd.send(this.document);
_11be=SOAPRequest._parseResponse(_11bd);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11bd=null;
return _11be;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11c1){
var _11c2=DOMUtil.getXMLHTTPRequest();
_11c2.open("post",url,true);
_11c2.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11c2.setRequestHeader("SOAPAction",this.action);
_11c2.onreadystatechange=function(){
if(_11c2.readyState==4){
var _11c3=SOAPRequest._parseResponse(_11c2);
_11c1(_11c3);
_11c2=null;
}
};
_11c2.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11c4 in this){
this[_11c4]=null;
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
var _11c6=null;
if(doc&&doc.documentElement){
_11c6=new SOAPRequestResponse();
var _11c7=SOAPRequestResponse.resolver;
_11c6.document=doc;
_11c6.envelope=_11c7.resolve("soap:Envelope",_11c6.document);
_11c6.header=_11c7.resolve("soap:Header",_11c6.envelope);
_11c6.body=_11c7.resolve("soap:Body",_11c6.envelope);
var fault=_11c7.resolve("soap:Fault",_11c6.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11c6.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11c7.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11c7.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11c6;
};
function SOAPFault(_11c9,_11ca,_11cb){
this._operationName=_11c9;
this._operationAddress=_11ca;
this._faultString=_11cb;
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
SOAPFault.newInstance=function(_11cc,fault){
return new SOAPFault(_11cc.name,_11cc.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11cf){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11cf;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11d1=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11d1.body,this._operation);
var _11d3=this._wsdl.getSchema();
var _11d4=_11d3.lookup(this._operation);
var _11d5=_11d4.getListedDefinitions();
while(_11d5.hasNext()){
var def=_11d5.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11d1;
};
SOAPEncoder.prototype._resolve=function(_11d9,_11da,value){
var _11dc=this._wsdl.getSchema();
if(_11da.isSimpleValue){
this._appendText(_11d9,value,_11da.type=="string");
}else{
var _11dd=_11dc.lookup(_11da.type);
if(_11dd instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11dd.getListedDefinitions();
if(_11dd.isArray){
var _11df=new List(value);
var def=defs.getNext();
while(_11df.hasNext()){
var elm=this._appendElement(_11d9,def.name);
var val=_11df.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11d9,def.name);
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
SOAPEncoder.prototype._appendText=function(_11e6,value,_11e8){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11eb=false;
var i=0,c;
while(c=chars[i++]){
var _11ee=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11ee=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11ee=false;
}
break;
}
if(!_11ee){
safe+=c;
}else{
_11eb=true;
}
}
if(_11eb){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11e6.appendChild(_11e6.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11f1){
this._wsdl=wsdl;
this._operation=_11f1;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11f6){
var _11f7=null;
var _11f8=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11fa=this.resolve(id,_11f6.body);
var _11fb=_11f8.lookup(id);
var _11fc=_11fb.getListedDefinitions();
while(!_11f7&&_11fc.hasNext()){
var def=_11fc.getNext();
var elm=this.resolve(def.name,_11fa);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11f7=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11f7.importNode!=Types.UNDEFINED){
_11f7.appendChild(_11f7.importNode(e,true));
}else{
_11f7.loadXML(DOMSerializer.serialize(e));
}
}else{
_11f7=this._compute(elm,def);
}
}
return _11f7;
};
SOAPDecoder.prototype._compute=function(_1200,_1201){
var _1202=null;
var _1203=this._wsdl.getSchema();
if(_1201.isSimpleValue){
_1202=this._getSimpleValue(_1200,_1201.type);
}else{
var _1204=_1203.lookup(_1201.type);
if(_1204 instanceof SchemaSimpleType){
_1202=this._getSimpleValue(_1200,_1204.restrictionType);
}else{
var defs=_1204.getListedDefinitions();
if(_1204.isArray){
_1202=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1200);
while(elms.hasNext()){
var elm=elms.getNext();
_1202.push(this._compute(elm,def));
}
}else{
_1202={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1200);
if(elm){
_1202[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1202;
};
SOAPDecoder.prototype._getSimpleValue=function(_1209,type){
var _120b=null;
if(_1209!=null&&_1209.firstChild&&_1209.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1209.childNodes.length>1){
_1209.normalize();
}
_120b=_1209.firstChild.data;
switch(type){
case Schema.types.STRING:
_120b=_120b;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_120b=Number(_120b);
break;
case Schema.types.BOOLEAN:
_120b=_120b=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _120b;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_120c){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_120c);
}
Schema.prototype._parseSchema=function(_120d){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _120e={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_120d);
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
_120e[rule.getAttribute("name")]=entry;
}
return _120e;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1213){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1213);
}
SchemaDefinition.prototype._parse=function(_1214){
var min=_1214.getAttribute("minOccurs");
var max=_1214.getAttribute("maxOccurs");
var type=_1214.getAttribute("type");
this.name=_1214.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _121a=split[1];
this.isSimpleValue=sort!="tns";
this.type=_121a;
}else{
var elm=_1214.getElementsByTagName("*").item(0);
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
function SchemaElementType(_121c,_121d){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_121c,_121d);
}
SchemaElementType.prototype._parseListedDefinitions=function(_121e,_121f){
var els=_121e.resolveAll("s:complexType/s:sequence/s:element",_121f);
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
function SchemaComplexType(_1221,_1222){
this._definitions=new List();
this._parseListedDefinitions(_1221,_1222);
this.isArray=_1222.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1223,_1224){
var els=_1223.resolveAll("s:sequence/s:element",_1224);
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
function SchemaSimpleType(_1227,_1228){
this.restrictionType=null;
this._parse(_1227,_1228);
}
SchemaSimpleType.prototype._parse=function(_1229,_122a){
var _122b=_1229.resolve("s:restriction",_122a);
if(_122b){
this.restrictionType=_122b.getAttribute("base").split(":")[1];
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
var _122e=null;
var _122f=DOMUtil.getXMLHTTPRequest();
_122f.open("get",url,false);
_122f.send(null);
if(_122f.responseXML){
_122e=_122f.responseXML.documentElement;
}else{
alert(_122f.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _122e;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1230=new List();
var _1231=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1231.hasEntries()){
while(_1231.hasNext()){
var _1232=_1231.getNext();
var name=_1232.getAttribute("name");
_1230.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1230;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1235,_1236,_1237){
this.name=name;
this.address=_1235;
this.encoder=_1236;
this.decoder=_1237;
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
var _123b=wsdl.getOperations();
_123b.each(function(_123c){
proxy[_123c.name]=WebServiceProxy.createProxyOperation(_123c);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_123d,_123e){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_123e){
var log=_123e instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_123d.address+": "+_123d.name+"\n\n";
log+=DOMSerializer.serialize(_123e.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1240){
return function(){
var _1241=new List(arguments);
var _1242=null;
if(typeof (_1241.getLast())=="function"){
var _1243=_1241.extractLast();
var _1244=_1240.encoder.encode(_1241);
this._log(_1240,_1244);
var self=this;
var _1246=_1244.asyncInvoke(_1240.address,function(_1247){
self._log(_1240,_1247);
if(_1247){
if(_1247.fault){
_1242=SOAPFault.newInstance(_1240,_1247.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1242,_1244,_1247);
}
}else{
if(WebServiceProxy.isDOMResult){
_1242=_1247.document;
}else{
_1242=_1240.decoder.decode(_1247);
}
}
}
_1244.dispose();
_1243(_1242);
});
}else{
var _1244=_1240.encoder.encode(new List(arguments));
this._log(_1240,_1244);
var _1246=_1244.invoke(_1240.address);
this._log(_1240,_1246);
if(_1246){
if(_1246.fault){
_1242=SOAPFault.newInstance(_1240,_1246.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1242,_1244,_1246);
}
}else{
if(WebServiceProxy.isDOMResult){
_1242=_1246.document;
}else{
_1242=_1240.decoder.decode(_1246);
}
}
}
_1244.dispose();
return _1242;
}
};
};
WebServiceProxy.handleFault=function(_1248,_1249,_124a){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1248,soapRequest:_1249,soapResponse:_124a});
}
catch(exception){
alert(_1248.getFaultString());
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
var _124b=SystemLogger.getLogger("MessageQueue");
var _124c=null;
var _124d=0;
var _124e=null;
var _124f=new Map();
var _1250=new Map();
var _1251=false;
var _1252=false;
var _1253=false;
var _1254=false;
var _1255={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_124c=ConsoleMessageQueueService;
_124d=_124c.GetCurrentSequenceNumber("dummyparam!");
this.index=_124d;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1251){
if(!MessageQueue._actions.hasEntries()){
var _1256=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1252=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1256;
_1252=false;
}
}
}
};
this._pokeserver=function(){
if(_1251==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1252);
this._updateMessages();
}
};
this._updateMessages=function(){
if(_1253){
_1254=true;
}else{
_1253=true;
var self=this;
_124c.GetMessages(Application.CONSOLE_ID,this.index,function(_1258){
if(_1258!=null){
if(Types.isDefined(_1258.CurrentSequenceNumber)){
var _1259=_1258.CurrentSequenceNumber;
if(_1259<self.index){
_124b.debug("SERVER WAS RESTARTED! old messagequeue index: "+self.index+", new messagequeue index: "+_1259);
}
self.index=_1259;
var _125a=new List(_1258.ConsoleActions);
if(_125a.hasEntries()){
self.evaluate(_125a);
}else{
if(!self._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_124b.error("No sequencenumber in MessageQueue response!");
}
}
_1253=false;
if(_1254){
_1254=false;
self._updateMessages();
}
});
}
};
this.evaluate=function(_125b){
var _125c=new List();
if(_125b.hasEntries()){
_125b.each(function(_125d){
if(this._index[_125d.Id]!=true){
_125c.add(_125d);
}
this._index[_125d.Id]=true;
},this);
if(_125c.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_125c);
}else{
this._actions=_125c;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_125e){
var _125f="(No reason)";
if(_125e!=null){
_125f=_125e.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_125f);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1263){
if(_1263==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1264=null;
if(this._actions.hasEntries()){
var _1265=this._actions.extractFirst();
_124d=_1265.SequenceNumber;
_124b.debug("MessageQueue action: "+_1265.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_124d+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1265.ActionType){
case "OpenView":
_1264=_1265.OpenViewParams;
if(_1264.ViewType=="ModalDialog"){
openDialogView(_1264);
}else{
_124e=_1264.ViewId;
openView(_1264);
}
break;
case "CloseView":
_1264=_1265.CloseViewParams;
_124e=_1264.ViewId;
closeView(_1264);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1265.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_124f.countEntries()+"\n";
_124f.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_124b.debug(debug);
if(!_124f.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1265.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1265.MessageBoxParams);
break;
case "OpenViewDefinition":
_1264=_1265.OpenViewDefinitionParams;
_124e=_1264.Handle;
openViewDefinition(_1264);
break;
case "LogEntry":
logEntry(_1265.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1264=_1265.BroadcastMessageParams;
_124b.debug("Server says: EventBroadcaster.broadcast ( \""+_1264.Name+"\", "+_1264.Value+" )");
EventBroadcaster.broadcast(_1264.Name,_1264.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_124f.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1265.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1265.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1265.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1264=_1265.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1264.ViewId,entityToken:_1264.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1264=_1265.OpenGenericViewParams;
openGenericView(_1264);
break;
case "OpenExternalView":
_1264=_1265.OpenExternalViewParams;
openExternalView(_1264);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1265.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1252);
}
function logEntry(_1268){
var _1269=_1268.Level.toLowerCase();
SystemLogger.getLogger(_1268.SenderId)[_1269](_1268.Message);
}
function openView(_126a){
var list=paramsToList(_126a.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_126a.ViewId);
def.entityToken=_126a.EntityToken;
def.flowHandle=_126a.FlowHandle;
def.position=_1255[_126a.ViewType],def.label=_126a.Label;
def.image=_126a.Image;
def.toolTip=_126a.ToolTip;
def.argument={"url":_126a.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_126a.ViewId,entityToken:_126a.EntityToken,flowHandle:_126a.FlowHandle,position:_1255[_126a.ViewType],url:_126a.Url,label:_126a.Label,image:_126a.Image,toolTip:_126a.ToolTip}));
}
}
function openDialogView(_126d){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_126d.ViewId,flowHandle:_126d.FlowHandle,position:Dialog.MODAL,url:_126d.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_126e){
var _126f=_126e.DialogType.toLowerCase();
if(_126f=="question"){
throw "Not supported!";
}else{
if(Client.isWebKit){
alert(_126e.Title+"\n"+_126e.Message);
}else{
Dialog[_126f](_126e.Title,_126e.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
}
function openViewDefinition(_1270){
var map={};
var _1272=false;
new List(_1270.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1272=true;
});
var proto=ViewDefinitions[_1270.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1270.ViewId;
}
def.argument=_1272?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1277){
var def=ViewDefinition.clone("Composite.Management.GenericView",_1277.ViewId);
def.label=_1277.Label;
def.toolTip=_1277.ToolTip;
def.image=_1277.Image;
def.argument={"url":_1277.Url,"list":paramsToList(_1277.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_1279){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_1279.ViewId);
def.label=_1279.Label;
def.toolTip=_1279.ToolTip;
def.image=_1279.Image;
def.url=_1279.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_127b){
if(StageBinding.isViewOpen(_127b.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_127b.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_127c){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_127c.ViewId,isSuccess:_127c.Succeeded});
}
this._lockSystem=function(_127d){
var _127e=top.bindingMap.offlinetheatre;
if(_127d){
_127e.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_127e.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1251=_127d;
};
this.handleBroadcast=function(_1280,arg){
switch(_1280){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_124e!=null&&arg==_124e){
_124e=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_124f.set(arg,true);
}else{
_124b.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_124f.hasEntries()){
_124f.del(arg);
_124b.debug("Refreshed tree: "+arg+"\n("+_124f.countEntries()+" trees left!)");
if(!_124f.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1250.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1250.hasEntries()==true){
_1250.del(arg);
if(!_1250.hasEntries()){
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
function paramsToList(_1282){
var list=new List();
new List(_1282).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}],width:480}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _1285=false;
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
};
this.handleBroadcast=function(_128c){
switch(_128c){
case BroadcastMessages.AUDIO_INITIALIZED:
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
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_128f){
if(_128e){
EventBroadcaster.subscribe(_128f,KickStart);
}else{
EventBroadcaster.unsubscribe(_128f,KickStart);
}
});
}
function kickStart(_1290){
switch(_1290){
case BroadcastMessages.AUDIO_INITIALIZED:
_1286=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1285=true;
break;
}
if(_1285&&_1286){
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

