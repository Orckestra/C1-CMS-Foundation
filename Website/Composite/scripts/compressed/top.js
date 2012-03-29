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
var _6d=typeof document.createTreeWalker!="undefined";
var _6e=_6d&&(_6b.indexOf("webrunner")>-1||_6b.indexOf("prism")>-1);
var _6f=history.pushState!=null;
this.isMozilla=_6d;
this.isFirefox=_6b.indexOf("firefox")>-1;
this.isWebKit=_6b.indexOf("webkit")>-1;
this.isExplorer=!_6d;
this.isExplorer6=this.isExplorer&&(_6b.indexOf("msie 6.0")>-1||_6b.indexOf("msie 6.1")>-1);
this.isExplorer8=this.isExplorer&&window.XDomainRequest!=null;
this.isPrism=_6e;
this.isWindows=_6c.indexOf("win")>-1;
this.isVista=this.isWindows&&_6b.indexOf("windows nt 6")>-1;
var _70=this._getFlashVersion();
this.hasFlash=(_70&&_70>=9);
this.hasTransitions=_6f;
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
if(window.opera!=null||_77||this.isExplorer6){
_76=false;
}
return _76;
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
function SystemLogger(_78){
this.identifier=_78;
}
SystemLogger.prototype.info=function(_79){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_INFO,_79);
};
SystemLogger.prototype.debug=function(_7a){
if(_7a=="page"){
alert(arguments.caller.callee);
}
SystemLogger.log(this.identifier,SystemLogger.LEVEL_DEBUG,_7a);
};
SystemLogger.prototype.error=function(_7b){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_ERROR,_7b);
};
SystemLogger.prototype.warn=function(_7c){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_WARN,_7c);
};
SystemLogger.prototype.fatal=function(_7d){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FATAL,_7d);
};
SystemLogger.prototype.fine=function(_7e){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FINE,_7e);
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
SystemLogger.getLogger=function(_80){
var _81=SystemLogger.loggers[_80];
if(!_81){
_81=new SystemLogger(_80);
SystemLogger.loggers[_80]=_81;
}
return _81;
};
SystemLogger.flushBuffer=function(){
SystemLogger.buffer.reset();
SystemLogger.isFlushing=true;
if(SystemLogger.buffer.hasEntries()){
while(SystemLogger.buffer.hasNext()){
var _82=SystemLogger.buffer.getNext();
this.log(_82.identifier,_82.level,_82.message);
}
}
SystemLogger.isFlushing=false;
};
SystemLogger.bufferLog=function(_83,_84,_85){
if(Application.isDeveloperMode){
_85=String(_85);
SystemLogger.buffer.add({identifier:_83,level:_84,message:_85});
}
};
SystemLogger.outputLog=function(_86,_87,_88){
_88=String(_88);
if(!SystemLogger.isFlushing){
SystemLogger.bufferLog(_86,_87,_88);
}
var win=SystemLogger.outputWindow;
var doc=SystemLogger.outputDocument;
var elm=SystemLogger.outputElement;
var div=doc.createElement("div");
var _8d=doc.createElement("span");
var pre=doc.createElement("pre");
if(Client.isExplorer){
_88=_88.replace(/</g,"&lt;");
_88=_88.replace(/>/g,"&gt;");
_88=_88.replace(/\n/g,"<br/>");
_88=_88.replace(/\t/g,SystemLogger.TAB_SEQUENCE);
pre.innerHTML=_88;
}else{
pre.textContent=_88;
}
div.className=_87;
_8d.innerHTML=_86;
div.appendChild(_8d);
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
SystemTimer.getTimer=function(_90){
return new SystemTimer(_90.toString());
};
function SystemTimer(id){
this.logger=SystemLogger.getLogger("SystemTimer");
this._id=id;
this._time=new Date().getTime();
}
SystemTimer.prototype.reset=function(){
this._time=new Date().getTime();
};
SystemTimer.prototype.report=function(_92){
this.logger.debug(this._id+": "+this.getTime()+(_92?": "+_92:""));
};
SystemTimer.prototype.getTime=function(){
return new Date().getTime()-this._time;
};
function _SystemDebug(){
}
_SystemDebug.prototype={_logger:SystemLogger.getLogger("SystemDebug"),_stacklength:parseInt(5),stack:function(_93,_94){
this._stackMozilla(_93,_94);
},_stackMozilla:function(_95,_96){
_96=_96?_96:this._stacklength;
if(Client.isMozilla&&_95.callee||_95.caller){
var _97=Client.isMozilla?_95.callee.caller:_95.caller.callee;
var _98="";
var i=0;
while(_97!=null&&i++<_96){
_98+="\n#"+i+"\n";
_98+=_97.toString();
_97=_97.caller;
_98+="\n";
}
this._logger.error(_98);
}else{
this._logger.error("(Error stack unreachable!)");
}
}};
var SystemDebug=new _SystemDebug;
function _Interfaces(){
var _9a=SystemLogger.getLogger("Interfaces");
this.isImplemented=function(_9b,_9c,_9d){
var _9e=true;
for(var _9f in _9b){
if(typeof _9c[_9f]==Types.UNDEFINED){
_9e=false;
}else{
if(typeof _9b[_9f]!=typeof _9c[_9f]){
_9e=false;
}
}
if(!_9e){
break;
}
}
if(!_9e){
if(_9d){
_9a.fine(_9c+" invalid. Interface check abandoned at: "+_9f);
}
}
return _9e;
};
}
var Interfaces=new _Interfaces;
function _Types(){
}
_Types.prototype={_logger:SystemLogger.getLogger("Types"),BOOLEAN:"boolean",STRING:"string",NUMBER:"number",FUNCTION:"function",UNDEFINED:"undefined",castFromString:function(_a0){
var _a1=_a0;
if(parseInt(_a1).toString()===_a1){
_a1=parseInt(_a1);
}else{
if(parseFloat(_a1).toString()===_a1){
_a1=parseFloat(_a1);
}else{
if(_a1==="true"||_a1==="false"){
_a1=(_a1==="true");
}
}
}
return _a1;
},isDefined:function(arg){
return typeof arg!=Types.UNDEFINED;
},isFunction:function(arg){
return typeof arg==Types.FUNCTION;
}};
var Types=new _Types();
var MimeTypes={JPG:"image/jpeg",GIF:"image/gif",PNG:"image/png",CSS:"text/css",JAVASCRIPT:"text/javascript",TEXT:"text/plain",HTML:"text/html",XHTML:"applcication/xhtml+xml",FLASH:"application/x-shockwave-flash",QUICKTIME:"video/quicktime",SHOCKWAVE:"application/x-director",WINMEDIA:"application/x-mplayer2",COMPOSITEPAGES:"application/x-composite-page",COMPOSITEFUNCTION:"application/x-composite-function"};
window.SearchTokens=new function(){
var _a4={"MediaFileElementProvider.WebImages":null,"MediaFileElementProvider.EmbeddableMedia":null,"AllFunctionsElementProvider.VisualEditorFunctions":null,"AllFunctionsElementProvider.XsltFunctionCall":null};
this.getToken=function(key){
var _a6=null;
if(this.hasToken(key)){
_a6=_a4[key];
}else{
throw "Unknown search token key: "+key;
}
return _a6;
};
this.hasToken=function(key){
return typeof _a4[key]!=Types.UNDEFINED;
};
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
new List(TreeService.GetSearchTokens(true)).each(function(_a8){
if(SearchTokens.hasToken(_a8.Key)){
_a4[_a8.Key]=_a8.Value;
}else{
alert("SearchTokens need updating!");
}
});
}});
};
window.StringBundle=new function(){
var _a9=SystemLogger.getLogger("StringBundle");
this.UI="Composite.Management";
var _aa={};
function resolve(_ab,_ac){
var _ad=new List(StringService.GetLocalisation(_ab));
if(_ad.hasEntries()){
_ad.each(function(_ae){
_ac[_ae.Key]=_ae.Value;
});
}else{
throw "No strings from provider: "+_ab;
}
}
this.getString=function(_af,_b0){
var _b1=null;
if(window.StringService!=null){
try{
if(_af=="ui"){
_af=StringBundle.UI;
}
if(!_aa[_af]){
var _b2=_aa[_af]={};
resolve(_af,_b2);
}
if(_aa[_af]){
_b1=_aa[_af][_b0];
}
if(!_b1){
throw "No such string: "+_b0;
}
}
catch(exception){
var cry="StringBundle exception in string "+_af+":"+_b0;
_a9.error(cry);
if(Application.isDeveloperMode){
alert(cry);
}
}
}
return _b1;
};
};
window.LastOpenedSystemNodes=new function(){
var _b4=new List([]);
this.clear=function(){
_b4.clear();
};
this.add=function(_b5){
var _b6=_b5.getHandle();
_b4.add(_b6);
};
this.isOpen=function(_b7){
var _b8=_b7.getHandle();
return _b4.has(_b8);
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
var _bb=false;
if(this._uniqueKeys[key]){
_bb=true;
}
return _bb;
}};
var KeyMaster=new _KeyMaster();
function _ImageProvider(){
}
_ImageProvider.prototype={_logger:SystemLogger.getLogger("ImageProvider"),SERVICE_URL:"services/Icon/GetIcon.ashx",UI:"Composite.Icons",getImageURL:function(_bc,_bd){
var _be=null;
var url=Constants.APPROOT+"/"+this.SERVICE_URL+"?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
var _c0=_bc.ResourceNamespace;
var _c1=_bc.ResourceName;
_bd=_bd?_bd:"DEFAULT";
if(_c1!=null&&_c0!=null){
_be=url.replace("${name}",_c1).replace("${hash}",_c0).replace("${size}",_bd);
if(_bd=="DEFAULT"){
_be=_be.split("&size=DEFAULT")[0];
}
}else{
throw "Could not compute image URL.";
}
return _be;
},toGrayScaleURL:function(_c2){
var _c3=document.createElement("canvas");
var ctx=_c3.getContext("2d");
var _c2=new Image();
var _c5=_c2.width;
var _c6=_c2.height;
_c3.width=_c5;
_c3.height=_c6;
ctx.drawImage(_c2,0,0);
var _c7=ctx.getImageData(0,0,_c5,_c6);
for(j=0;j<_c7.height;i++){
for(i=0;i<_c7.width;j++){
var _c8=(i*4)*_c7.width+(j*4);
var red=_c7.data[_c8];
var _ca=_c7.data[_c8+1];
var _cb=_c7.data[_c8+2];
var _cc=_c7.data[_c8+3];
var _cd=(red+_ca+_cb)/3;
_c7.data[_c8]=_cd;
_c7.data[_c8+1]=_cd;
_c7.data[_c8+2]=_cd;
_c7.data[_c8+3]=_cc;
}
}
return _c3.toDataURL();
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_ce){
if(typeof _ce!=Types.UNDEFINED){
_ce=String(_ce);
_ce=_ce.replace("${root}",Constants.APPROOT);
_ce=_ce.replace("${skin}",Constants.SKINROOT);
_ce=_ce.replace("${tinymce}",Constants.TINYMCEROOT);
_ce=_ce.replace("${tiny}",Constants.TINYROOT);
if(_ce.indexOf("${icon:")>-1){
_ce=this._resolveImage(_ce);
}else{
if(_ce.indexOf("${string:")>-1){
_ce=this._resolveString(_ce);
}
}
}
return _ce;
},resolveVars:function(_cf,_d0){
var i=0;
while(i<_d0.length){
_cf=_cf.replace("{"+i+"}",_d0[i]);
i++;
}
return _cf;
},_resolveString:function(_d2){
var _d3=null;
var _d4=null;
var key=_d2.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_d4=key.split(":")[0];
key=key.split(":")[1];
}else{
_d4=StringBundle.UI;
}
_d3=StringBundle.getString(_d4,key);
if(!_d3){
_d3="(?)";
}
return _d3;
},_resolveImage:function(_d6){
var _d7=null;
var _d8=null;
var _d9=null;
var _da=null;
_d9=_d6.split("${icon:")[1].split("}")[0];
if(_d9.indexOf(":")>-1){
_d8=_d9.split(":")[0];
_d9=_d9.split(":")[1];
}else{
_d8=ImageProvider.UI;
}
if(_d9.indexOf("(")>-1){
_da=_d9.split("(")[1].split(")")[0];
_d9=_d9.split("(")[0];
}
_d7=ImageProvider.getImageURL({ResourceNamespace:_d8,ResourceName:_d9},_da);
return _d7;
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
_Cookies.prototype={createCookie:function(_dd,_de,_df){
var _e0="";
if(_df){
var _e1=new Date();
_e1.setTime(_e1.getTime()+(_df*24*60*60*1000));
_e0="; expires="+_e1.toGMTString();
}
document.cookie=_dd+"="+escape(_de)+_e0+"; path=/";
return this.readCookie(_dd);
},readCookie:function(_e2){
var _e3=null;
var _e4=_e2+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_e4)==0){
_e3=unescape(c.substring(_e4.length,c.length));
}
}
return _e3;
},eraseCookie:function(_e8){
this.createCookie(_e8,"",-1);
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
var _e9=SystemLogger.getLogger("StatusBar");
var _ea=null;
var _eb="${icon:error}";
var _ec="${icon:warning}";
var _ed="${icon:loading}";
var _ee="${icon:message}";
var _ef=null;
var _f0=null;
var _f1=null;
var _f2=null;
this.initialize=function(_f3){
_ef=StringBundle.getString("ui","Website.App.StatusBar.Error");
_f0=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_f1=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_f2=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_ea=_f3;
this.document=_f3.bindingDocument;
};
this.error=function(_f4,_f5){
this.state=StatusBar.ERROR;
_f4=_f4?_f4:_ef;
show(_f4,_eb,_f5,false);
};
this.warn=function(_f6,_f7){
this.state=StatusBar.WARN;
_f6=_f6?_f6:_f0;
show(_f6,_ec,_f7,false);
};
this.busy=function(_f8,_f9){
this.state=StatusBar.BUSY;
_f8=_f8?_f8:_f1;
show(_f8,_ed,_f9,false);
};
this.ready=function(_fa,_fb){
this.state=StatusBar.READY;
_fa=_fa?_fa:_f2;
show(_fa,_ee,_fb,true);
};
this.report=function(_fc,_fd,_fe,_ff){
this.state=null;
show(_fc,_fd,_fe,_ff);
};
this.clear=function(){
this.state=null;
if(_ea){
_ea.clear();
}
};
function show(_100,icon,vars,_103){
if(vars){
_100=Resolver.resolveVars(_100,vars);
}
if(_ea){
_ea.setLabel(_100);
_ea.setImage(icon);
if(_103){
_ea.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_e9.error("Message not initialized for display: "+_100);
}
}
this.addToGroup=function(name,_105){
if(!this._groups.has(name)){
this._groups.set(name,_ea.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(name).add(_105);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.TOLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,handleBroadcast:function(_106,arg){
switch(_106){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
case BroadcastMessages.TOLANGUAGE_UPDATED:
var _108=LocalizationService.GetActiveLocales(true);
if(_108.length>=1){
this.languages=new List(_108);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_106){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _109=LocalizationService.GetLocales(true);
this.source=_109.ForeignLocaleName;
this.target=_109.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_109.ForeignLocaleName,target:_109.ActiveLocaleName});
break;
}
},currentLang:function(){
if(this.languages!=null){
var _10a=this.languages.copy();
while(_10a.hasNext()){
var lang=_10a.getNext();
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
_Validator.prototype={validate:function(_10c,key,_10e){
var _10f=true;
var _110=SourceValidationService.ValidateSource(_10c,key);
if(_110!="True"){
if(_10e==true){
this._dialog(_110);
}
_10f=false;
}
return _10f;
},validateInformed:function(_111,key){
return this.validate(_111,key,true);
},_dialog:function(_113){
setTimeout(function(){
Dialog.error("Source Invalid",_113);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",DRAGOVER:"dragover",DROP:"drop",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_114,_115,_116,_117){
this._count++;
this._eventListener(true,_114,_115,_116,_117);
if(_114&&typeof _114.nodeType!=Types.UNDEFINED){
if(_114.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_114);
if(win){
var _119={handleEvent:function(){
DOMEvents.removeEventListener(_114,_115,_116,_117);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_119);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_119);
}
}
}
},removeEventListener:function(_11a,_11b,_11c,_11d){
this._count--;
this._eventListener(false,_11a,_11b,_11c,_11d);
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
},cleanupEventListeners:function(_122){
this._deleteWrappedHandler(_122);
},isCurrentTarget:function(e){
var _124=false;
if(Client.isMozilla==true){
_124=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_125,_126){
var _127=true;
if(_125==_126){
_127=false;
}
if(_127==true){
while(_126!=null&&_126.nodeType!=Node.DOCUMENT_NODE&&_126!=_125){
_126=_126.parentNode;
}
_127=(_126==_125);
}
return _127;
},_eventListener:function(_128,_129,_12a,_12b,_12c,_12d){
if(Interfaces.isImplemented(IEventListener,_12b,true)){
if(typeof _12a!=Types.UNDEFINED){
if(Client.isExplorer==true){
_12b=this._getWrappedHandler(_129,_12a,_12b,_12d);
_129[this._getAction(_128)]("on"+_12a,_12b);
}else{
switch(_12a){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_12a=_12a==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_129[this._getAction(_128)](_12a,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_12b.handleEvent(e);
}
}},_12c?true:false);
break;
default:
_129[this._getAction(_128)](_12a,_12b,_12c?true:false);
break;
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_130){
var _131=null;
switch(_130){
case true:
_131=Client.isMozilla==true?"addEventListener":"attachEvent";
break;
case false:
_131=Client.isMozilla==true?"removeEventListener":"detachEvent";
break;
}
return _131;
},_getWrappedHandler:function(_132,_133,_134,_135){
var _136=null;
try{
if(!_134._domEventHandlers){
_134._domEventHandlers={};
}
if(!_134._domEventHandlers[_132]){
_134._domEventHandlers[_132]={};
}
if(!_134._domEventHandlers[_132][_133]){
var win=_132.nodeType?DOMUtil.getParentWindow(_132):_132;
if(win){
_134._domEventHandlers[_132][_133]=function(){
if(win.event!=null&&_134!=null){
_134.handleEvent(win.event);
}
};
}
}
_136=_134._domEventHandlers[_132][_133];
}
catch(exception){
this._report(_132,_133,_134,_135);
}
return _136;
},_deleteWrappedHandler:function(_138){
for(var _139 in _138._domEventHandlers){
if(_139){
for(var _13a in _138._domEventHandlers[_139]){
if(_13a){
delete _138._domEventHandlers[_139][_13a];
}
}
}
delete _138._domEventHandlers[_139];
}
},_report:function(_13b,_13c,_13d,_13e){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_13b?_13b.nodeName:_13b)+"\n"+"\tevent: "+_13c+"\n"+"\thandler: "+_13d+"\n\n"+"Offending invoker: "+(_13e.callee?_13e.callee.toString():_13e.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(Client.isMozilla?new XMLSerializer():null),serialize:function(node,_140){
var _141=null;
var _142=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_142=node.documentElement;
}
if(Client.isMozilla==true){
if(_140==true){
_142=_142.cloneNode(true);
_142=DOMFormatter.format(_142,DOMFormatter.INDENTED_TYPE_RESULT);
}
_141=this._serializer.serializeToString(_142);
}else{
_141=_142.xml;
}
return _141;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _145=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_146){
var doc=_146.ownerDocument;
var _148=function(node,_14a){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _14b="",i=0;
while(i++<_14a){
_14b+=TAB;
}
var _14d=node.firstChild;
while(_14d){
switch(_14d.nodeType){
case Node.ELEMENT_NODE:
if(_14d==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_14b));
}
node.insertBefore(doc.createTextNode(NEW+_14b+TAB),_14d);
_148(_14d,_14a+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_14b+TAB),_14d);
break;
}
if(_14d.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_14d,_14b+TAB);
}
}
_14d=_14d.nextSibling;
}
}
};
_148(_146,0);
}
function strip(_14e){
var _14f=[];
var _150={acceptNode:function(_151){
return (!_145.test(_151.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _152=_14e.ownerDocument.createTreeWalker(_14e,NodeFilter.SHOW_TEXT,_150,true);
while(_152.nextNode()){
_14f.push(_152.currentNode);
}
var i=0,_154;
while((_154=_14f[i++])!=null){
_154.parentNode.removeChild(_154);
}
}
function formatCDATASection(node,_156){
if(node.textContent.indexOf(NEW)>-1){
var _157=node.textContent.split(NEW);
var _158="",line,_15a=0,_15b=true;
while((line=_157.shift())!=null){
if(_15a==0&&line.charAt(0)==TAB){
while(line.charAt(_15a++)==TAB){
}
}
line=line.substring(_15a,line.length);
if(_157.length>0){
_158+=_156+TAB+line;
_158+=_15b?"":"\n";
}else{
_158+=_156+line;
_156=_156.slice(1,_156.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_156));
}
_15b=false;
}
node.textContent=_158;
}
}
this.format=function(_15c,_15d){
var _15e=1;
if(document.createTreeWalker){
try{
strip(_15c);
if(_15d!=_15e){
indent(_15c);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_15c);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_15f){
var sig,_161=null,_162=this.MSXML_MAXVERSION;
while(!_161&&_162>=this.MSXML_MINVERSION){
try{
sig=_15f.replace("{$version}",_162);
_161=new ActiveXObject(sig);
}
catch(exception){
}
_162--;
}
return _161;
},getXMLHTTPRequest:function(){
var _163=null;
if(Client.isExplorer){
_163=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_163=new XMLHttpRequest();
}
return _163;
},getDOMDocument:function(_164){
var _165=null;
if(Client.isExplorer){
_165=this.getMSComponent(_164?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_165=doc;
}
return _165;
},getMSXMLXSLTemplate:function(){
var _167=null;
if(Client.isExplorer){
_167=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _167;
},getLocalName:function(_168){
var _169=null;
if(_168.localName){
_169=_168.localName;
}else{
if(_168.baseName){
_169=_168.baseName;
}else{
_169=_168.nodeName.toLowerCase();
}
}
return _169;
},getComputedStyle:function(_16a,_16b){
var _16c=null;
if(Client.isExplorer){
if(_16a.currentStyle!=null){
_16c=_16a.currentStyle[_16b];
}else{
this._logger.error("Could not compute style for element "+_16a.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _16d=_16a.ownerDocument.defaultView.getComputedStyle(_16a,null);
if(_16d!=null){
_16c=_16d.getPropertyValue(_16b);
}else{
this._logger.error("Could not compute style for element "+_16a.nodeName);
SystemDebug.stack(arguments);
}
}
return _16c;
},getMaxIndex:function(doc){
var max=0,_170=new List(doc.getElementsByTagName("*"));
_170.each(function(_171){
var _172=CSSComputer.getZIndex(_171);
if(_172>max){
max=_172;
}
});
return max;
},getOrdinalPosition:function(_173,_174){
var _175=null;
var _176=-1;
var _177=this.getLocalName(_173);
var _178=new List(_173.parentNode.childNodes);
while(_178.hasNext()){
var _179=_178.getNext();
if(_179.nodeType==Node.ELEMENT_NODE){
if(!_174||this.getLocalName(_179)==_177){
_176++;
if(_179==_173||(_179.id!=""&&_179.id==_173.id)){
_175=_176;
break;
}
}
}
}
return _175;
},isFirstElement:function(_17a,_17b){
return (this.getOrdinalPosition(_17a,_17b)==0);
},isLastElement:function(_17c,_17d){
var _17e=_17c.parentNode.getElementsByTagName(_17d?this.getLocalName(_17c):"*");
return (this.getOrdinalPosition(_17c)==_17e.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _182=null;
if(node.textContent){
_182=node.textContent;
}else{
if(node.text){
_182=node.text;
}else{
_182=node.innerText;
}
}
return _182;
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
},getAncestorByLocalName:function(_185,node,_187){
var _188=null;
while(_188==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_187==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_185){
_188=node;
}
}
return _188;
},contains:function(_18a,node){
return _18a.contains?_18a!=node&&_18a.contains(node):!!(_18a.compareDocumentPosition(node)&16);
},createElementNS:function(_18c,_18d,_18e){
var _18f=null;
if(_18e==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_18f=_18e.createElementNS(_18c,_18d);
}else{
if(_18e.xml!=null){
_18f=_18e.createNode(Node.ELEMENT_NODE,_18d,_18c);
}else{
_18f=_18e.createElement(_18d);
}
}
}
return _18f;
},getElementsByTagName:function(node,_191){
var _192=null;
if(Client.isMozilla){
_192=node.getElementsByTagNameNS(Constants.NS_XHTML,_191);
}else{
_192=node.getElementsByTagName(_191);
}
return _192;
},getNextElementSibling:function(_193){
return Client.isExplorer?_193.nextSibling:_193.nextElementSibling;
},getPreviousElementSibling:function(_194){
return Client.isExplorer?_194.previousSibling:_194.previousElementSibling;
},cloneNode:function(node){
var _196=null;
if(Client.isMozilla==true){
_196=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_196=node.cloneNode(true);
}
return _196;
},getLocalPosition:function(_197){
var _198=new Point(_197.offsetLeft,_197.offsetTop);
if(Client.isExplorer&&_197.parentNode&&_197.parentNode.currentStyle){
if(_197.parentNode.currentStyle.position=="static"){
var _199=this.getLocalPosition(_197.parentNode);
_198.x+=_199.x;
_198.y+=_199.y;
}
}
return _198;
},getGlobalPosition:function(_19a){
return this._getPosition(_19a,false);
},getUniversalPosition:function(_19b){
return this._getPosition(_19b,true);
},_getPosition:function(_19c,_19d){
var _19e=null;
if(typeof _19c.getBoundingClientRect!=Types.UNDEFINED){
var rect=_19c.getBoundingClientRect();
_19e={x:rect.left,y:rect.top};
if(Client.isMozilla){
_19e.x-=_19c.scrollLeft;
_19e.y-=_19c.scrollTop;
}
}else{
_19e={x:_19c.offsetLeft-_19c.scrollLeft,y:_19c.offsetTop-_19c.scrollTop};
while(_19c.offsetParent){
_19c=_19c.offsetParent;
_19e.x+=(_19c.offsetLeft-_19c.scrollLeft);
_19e.y+=(_19c.offsetTop-_19c.scrollTop);
}
}
if(_19d){
var win=DOMUtil.getParentWindow(_19c);
if(win){
var _1a1=win.frameElement;
if(_1a1){
var add=DOMUtil.getUniversalPosition(_1a1);
_19e.x+=add.x;
_19e.y+=add.y;
}
}
}
return new Point(_19e.x,_19e.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1a6){
var _1a7=DOMEvents.getTarget(e);
var _1a8={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_1a7.ownerDocument;
var win=this.getParentWindow(doc);
_1a8.x-=win.pageXOffset;
_1a8.y-=win.pageYOffset;
}
if(_1a6){
var _1ab=this.getParentWindow(_1a7).frameElement;
if(_1ab){
var add=this.getUniversalPosition(_1ab);
_1a8.x+=add.x;
_1a8.y+=add.y;
}
}
return _1a8;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null?new DOMParser():null),parse:function(xml,_1ae){
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
if(!_1ae){
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
if(!_1ae){
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
},isWellFormedDocument:function(xml,_1b1){
var _1b2=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1b4=SourceValidationService.IsWellFormedDocument(xml);
if(_1b4!="True"){
_1b2=false;
if(_1b1==true){
this._illFormedDialog(_1b4);
}
}
return _1b2;
},isWellFormedFragment:function(xml,_1b6){
var _1b7=true;
var _1b8=SourceValidationService.IsWellFormedFragment(xml);
if(_1b8!="True"){
_1b7=false;
if(_1b6==true){
this._illFormedDialog(_1b8);
}
}
return _1b7;
},_illFormedDialog:function(_1b9){
setTimeout(function(){
if(Client.isWebKit){
alert(_1b9);
}else{
Dialog.error("Not well-formed",_1b9);
}
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1ba){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1bb){
return _1ba[_1bb];
}};
}else{
this._nsResolver=_1ba;
}
};
XPathResolver.prototype.resolve=function(_1bc,node,_1be){
var _1bf=null;
try{
if(this._evaluator){
_1bf=this._evaluateDOMXpath(_1bc,node,_1be?true:false);
}else{
_1bf=this._evaluateMSXpath(_1bc,node,_1be?true:false);
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
return _1bf;
};
XPathResolver.prototype.resolveAll=function(_1c0,node){
return this.resolve(_1c0,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1c2,node,_1c4){
var _1c5=null;
if(node){
var _1c5=this._evaluator.evaluate(_1c2,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1c4){
var list=new List();
while((node=_1c5.iterateNext())!=null){
list.add(node);
}
_1c5=list;
}else{
_1c5=_1c5.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1c5;
};
XPathResolver.prototype._evaluateMSXpath=function(_1c8,node,_1ca){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1cc="";
for(var _1cd in this._nsResolver){
_1cc+="xmlns:"+_1cd+"=\""+this._nsResolver[_1cd]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1cc);
if(_1ca){
var list=new List();
var i=0,_1d0=node.selectNodes(_1c8);
while(i<_1d0.length){
list.add(_1d0.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1c8);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1d2=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1d2);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1d2;
}
};
XSLTransformer.prototype._import=function(url){
var _1d4=null;
if(Client.isMozilla){
var _1d5=DOMUtil.getXMLHTTPRequest();
_1d5.open("get",Resolver.resolve(url),false);
_1d5.send(null);
_1d4=_1d5.responseXML;
}else{
var _1d4=DOMUtil.getDOMDocument(true);
_1d4.async=false;
_1d4.load(url);
}
return _1d4;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1d7=null;
if(Client.isMozilla){
_1d7=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1d7;
};
XSLTransformer.prototype.transformToString=function(dom,_1d9){
var _1da=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1da=DOMSerializer.serialize(doc,_1d9);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1da=proc.output;
}
return _1da;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1dd){
var _1de=_1dd.style?_1dd.className:_1dd.getAttribute("class");
_1de=_1de?_1de:"";
return _1de;
},_contains:function(_1df,sub){
return _1df.indexOf(sub)>-1;
},_attach:function(_1e1,sub){
return _1e1+(_1e1==""?"":" ")+sub;
},_detach:function(_1e3,sub){
if(this._contains(_1e3," "+sub)){
sub=" "+sub;
}
return _1e3.replace(sub,"");
},attachClassName:function(_1e5,_1e6){
if(_1e5.classList!=null){
if(!_1e5.classList.contains(_1e6)){
_1e5.classList.add(_1e6);
}
}else{
var _1e7=this._getCurrent(_1e5);
if(!this._contains(_1e7,_1e6)){
_1e7=this._attach(_1e7,_1e6);
}
if(_1e5.style!=null){
_1e5.className=_1e7;
}else{
_1e5.setAttribute("class",_1e7);
}
}
},detachClassName:function(_1e8,_1e9){
if(_1e8.classList!=null){
if(_1e8.classList.contains(_1e9)){
_1e8.classList.remove(_1e9);
}
}else{
var _1ea=this._getCurrent(_1e8);
if(this._contains(_1ea,_1e9)){
_1ea=this._detach(_1ea,_1e9);
}
if(_1e8.style!=null){
_1e8.className=_1ea;
}else{
if(_1ea==""){
_1e8.removeAttribute("class");
}else{
_1e8.setAttribute("class",_1ea);
}
}
}
},hasClassName:function(_1eb,_1ec){
var _1ed=false;
if(_1eb.classList!=null){
_1ed=_1eb.classList.contains(_1ec);
}else{
_1ed=this._contains(this._getCurrent(_1eb),_1ec);
}
return _1ed;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1ee,_1ef){
var _1f0={};
for(var _1f1 in _1ee){
var ent=parseInt(DOMUtil.getComputedStyle(_1ef,_1ee[_1f1]));
_1f0[_1f1]=isNaN(ent)?0:ent;
}
return _1f0;
},_getMargin:function(_1f3){
return this._getComplexResult(this._margins,_1f3);
},getPadding:function(_1f4){
return this._getComplexResult(this._paddings,_1f4);
},getBorder:function(_1f5){
return this._getComplexResult(this._borders,_1f5);
},getPosition:function(_1f6){
return DOMUtil.getComputedStyle(_1f6,"position");
},getFloat:function(_1f7){
return DOMUtil.getComputedStyle(_1f7,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1f8){
return parseInt(DOMUtil.getComputedStyle(_1f8,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1f9){
return DOMUtil.getComputedStyle(_1f9,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1fa=SystemLogger.getLogger("System");
var root=null;
this.hasActivePerspectives=false;
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1fc=new List();
var _1fd=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1fd);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1ff){
_1fc.add(new SystemNode(_1ff));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1fc;
};
this.getChildNodes=function(node,_201){
var _202=new List();
var _203=null;
if(_201){
if(SearchTokens.hasToken(_201)){
_201=SearchTokens.getToken(_201);
}
_203=TreeService.GetElementsBySearchToken(node.getData(),_201);
}else{
_203=TreeService.GetElements(node.getData());
}
new List(_203).each(function(_204){
var _205=new SystemNode(_204);
if(_201){
_205.searchToken=_201;
}
_202.add(_205);
});
return _202;
};
this.getDescendantBranch=function(_206){
var map=new Map();
var arg=[];
_206.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _20a=TreeService.GetMultipleChildren(arg);
var _20b=new List(_20a);
while(_20b.hasNext()){
this._listNodesInMap(_20b.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_20c,_20d,_20e){
var map=new Map();
var arg=[];
_20e.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _212=TreeService.FindEntityToken(_20c,_20d,arg);
if(_212 instanceof SOAPFault){
_1fa.error(_212.getFaultString());
if(Application.isDeveloperMode){
alert(_212.getFaultString());
}
map=null;
}else{
var _213=new List(_212);
while(_213.hasNext()){
this._listNodesInMap(_213.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_214,map){
var list=new List();
var key=_214.ElementKey;
var _218=new List(_214.ClientElements);
map.set(key,list);
while(_218.hasNext()){
var _219=_218.getNext();
list.add(new SystemNode(_219));
}
};
this.getChildNodesBySearchToken=function(node,_21b){
return this.getChildNodes(node,_21b);
};
this.getNamedRoots=function(key,_21d){
var _21e=new List();
var _21f=null;
if(_21d){
if(SearchTokens.hasToken(_21d)){
_21d=SearchTokens.getToken(_21d);
}
_21f=TreeService.GetNamedRootsBySearchToken(key,_21d);
}else{
_21f=TreeService.GetNamedRoots(key);
}
new List(_21f).each(function(_220){
var node=new SystemNode(_220);
if(_21d){
node.searchToken=_21d;
}
_21e.add(node);
});
return _21e;
};
this.getNamedRootsBySearchToken=function(key,_223){
return this.getNamedRoots(key,_223);
};
function compileActionList(node,_225,_226){
var _227=_225.ClientElementActionGroupId;
if(_227!=null){
var _228=_226.get(_227).ClientElementActionGroupItems;
if(_228&&_228.length>0){
node.setActionList(new List(_228));
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
new List(self._data.Actions).each(function(_22e){
var _22f=_22e.ActionCategory.Name;
if(SystemAction.hasCategory(_22f)){
var _230=new SystemAction(_22e);
SystemAction.actionMap.set(_22e.ActionKey,_230);
}else{
throw "No such action category: "+_22f;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _231=null;
if(this.searchToken){
_231=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_231=System.getChildNodes(this);
}
return _231;
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
var _233=this._data.Piggybag;
if(_233==null){
_233="";
}
return _233;
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
var _235=null;
if(typeof this._data.ToolTip!="undefined"){
_235=this._data.ToolTip;
}
return _235;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_237){
map[_237.Key]=_237.Value;
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
var _23b=SystemAction.actionMap.get(key);
var _23c=true;
if(_23b.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_23c=false;
}
}
if(_23c){
var id=_23b.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_23b);
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
SystemAction.invoke=function(_23f,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_23f.logger.debug("Execute \""+_23f.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_23f.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_242,_243){
action=SystemAction.taggedActions.get(_242);
node=SystemNode.taggedNodes.get(_243);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_244){
return SystemAction.categories[_244]?true:false;
};
function SystemAction(_245){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_245;
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
var _246=null;
if(this.isInFolder()){
_246=this._data.ActionCategory.FolderName;
}
return _246;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _247=null;
if(typeof this._data.TagValue!="undefined"){
_247=this._data.TagValue;
}
return _247;
};
SystemAction.prototype.isChecked=function(){
var _248=null;
if(this.isCheckBox()){
_248=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _248;
};
function _UpdateManager(){
var _249=null;
if(!window.UpdateManager){
this._construct();
_249=this;
}
return _249;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_24a){
var root=document.documentElement;
var _24c=root.namespaceURI;
if(_24c==null){
_24c=new String(root.getAttribute("xmlns"));
}
if(_24c=="http://www.w3.org/1999/xhtml"){
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
var _24d=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_24d);
}else{
throw new TypeError();
}
}else{
var _24e=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_24e.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _250=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_250=true;
}
},this);
return _250;
},_setupForm:function(form){
var _253=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_253.isEnabled){
_253._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_254,type){
if(_254.addEventListener!=null){
_254.addEventListener(type,this,false);
}else{
var _256=this;
_254.attachEvent("on"+type,function(){
_256.handleEvent(window.event);
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
var _25b=UpdateAssistant.getUpdateZones(dom);
var _25c=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_25b.forEach(function(_25d,_25e){
var _25f=_25c[_25e];
this._crawl(_25d,_25f);
},this);
this._updates.forEach(function(_260,_261){
_260.update();
_260.dispose();
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
},_crawl:function(_263,_264,_265,id){
var _267=true;
var _268=_264.getAttribute("class");
if(_268==null||_268.indexOf(this.CLASSNAME_GONE)==-1){
if(_264.nodeType==Node.ELEMENT_NODE){
var _269=_264.getAttribute("id");
if(_269!=null){
_265=_263;
id=_269;
}
}
if(_267=this._check(_263,_264,_265,id)){
var _26a=_263.firstChild;
var _26b=_264.firstChild;
while(_26a!=null&&_26b!=null&&!this._replaced[id]){
switch(_26a.nodeType){
case Node.TEXT_NODE:
_267=this._check(_26a,_26b,_265,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_267=this._crawl(_26a,_26b,_265,id);
break;
}
if(this._replaced[id]){
_267=false;
}else{
_26a=_26a.nextSibling;
_26b=_26b.nextSibling;
}
}
}
}
return _267;
},_check:function(_26c,_26d,_26e,id){
var _270=true;
var _271=null;
var _272=false;
var _273=false;
if((_26c!=null&&_26d==null)||(_26c==null&&_26d!=null)){
_270=false;
}else{
if(_270=_26c.nodeType==_26d.nodeType){
switch(_26d.nodeType){
case Node.ELEMENT_NODE:
if(_26c.namespaceURI!=_26d.namespaceURI||_26c.nodeName!=_26d.nodeName){
_270=false;
}else{
if(_270=(_26c.nodeName==_26d.nodeName)){
var _274=_26d.getAttribute("id");
var _275=_26c.getAttribute("id");
if(_274!=null&&_275!=null){
if(_274!=_275){
_270=false;
}else{
if((_271=this._getPlugin(_26c,_26d))!=null){
if(_271.updateElement(_26c,_26d)){
_273=true;
_270=false;
}
}
}
}
if(_270){
if(_270=this._checkAttributes(_26c,_26d)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_26c)&&this._hasSoftChildren(_26d)){
if(this._validateSoftChildren(_26c,_26d)){
this._updateSoftChildren(_26c,_26d);
_272=true;
}
_270=false;
}else{
_270=_26c.childNodes.length==_26d.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_26c.data.trim()!=_26d.data.trim()){
_270=false;
}
break;
}
}
}
if(_270==false&&!_272&&!_273){
if(id!=null&&_26e!=null){
this.addUpdate(new ReplaceUpdate(id,_26e));
}
}
return _270;
},_checkAttributes:function(_276,_277){
var _278=true;
var _279=false;
var _27a=_276.attributes;
var _27b=_277.attributes;
if(_27a.length!=_27b.length){
_279=true;
}else{
_279=!Array.every(_27a,function(att1,i){
var att2=_27b.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_279){
var _27f=_276.getAttribute("id");
var _280=_277.getAttribute("id");
if(this.hasSoftAttributes&&_27f!=null&&_27f==_280){
this.addUpdate(new AttributesUpdate(_280,_276,_277));
}else{
_278=false;
}
}
return _278;
},_hasSoftChildren:function(_281){
var _282=true;
if(_281.hasChildNodes()){
_282=Array.every(_281.childNodes,function(node){
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
return _282;
},_validateSoftChildren:function(_285,_286){
var _287=true;
var _288=-1;
var _289=-1;
var _28a=-1;
var news=this._toMap(_285.childNodes,true);
var olds=this._toMap(_286.childNodes,true);
for(var id in olds){
if(_287){
var _28e=olds[id];
_287=_28e>=_288;
if(news[id]!=null){
_28a=news[id];
_287=_28a>=_289;
}
}
_288=_28e;
if(_28a>-1){
_289=_28a;
}
}
return _287;
},_updateSoftChildren:function(_28f,_290){
var news=this._toMap(_28f.childNodes);
var olds=this._toMap(_290.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _294=null;
for(id in news){
if(olds[id]==null){
var _295=news[id];
if(_294==null){
var _296=_290.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_296,_295,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_294,_295,false));
}
}
_294=id;
}
},addUpdate:function(_297){
this._updates.push(_297);
if(_297 instanceof ReplaceUpdate){
this._replaced[_297.id]=true;
}
},_getPlugin:function(_298,_299){
var _29a=null;
this.plugins.every(function(_29b){
if(_29b.handleElement(_298,_299)){
_29a=_29b;
}
return _29a==null;
});
return _29a;
},_toMap:function(_29c,_29d){
var _29e={};
Array.forEach(_29c,function(node,_2a0){
if(node.nodeType==Node.ELEMENT_NODE){
_29e[node.getAttribute("id")]=_29d?_2a0:node;
}
});
return _29e;
},_getPost:function(form){
var _2a2=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2a4){
var name=_2a4.name;
var _2a6=encodeURIComponent(_2a4.value);
switch(_2a4.type){
case "button":
case "submit":
var _2a7=UpdateAssistant.getActiveElement();
if(_2a4==_2a7&&name!=""){
_2a2+=name+"="+_2a6+"&";
}
break;
case "radio":
if(_2a4.checked){
_2a2+=name+"="+_2a6+"&";
}
break;
case "checkbox":
if(_2a4.checked){
if(_2a4.name==last){
if(_2a2.lastIndexOf("&")==_2a2.length-1){
_2a2=_2a2.substr(0,_2a2.length-1);
}
_2a2+=","+_2a6;
}else{
_2a2+=name+"="+_2a4.value;
}
last=name;
_2a2+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2a2+=name+"="+_2a6+"&";
break;
}
});
}
return _2a2.substr(0,_2a2.length-1);
},_postRequest:function(form){
var _2a9=form.method!=""?form.method:"get";
var _2aa=form.action!=""?form.action:window.location.toString();
var _2ab=this._getPost(form);
if(_2a9=="get"){
if(_2aa.indexOf("?")>-1){
_2aa=_2aa+"&"+_2ab;
}else{
_2aa+"?"+_2ab;
}
}
var _2ac=this;
var _2ad=UpdateAssistant.getXMLHttpRequest(_2a9,_2aa,this);
if(_2a9=="post"){
_2ad.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2ad.send(_2a9=="post"?_2ab:null);
},_fixdotnet:function(dom,id){
var _2b0=document.getElementById(id);
if(_2b0!=null){
var _2b1=UpdateAssistant.getElementById(dom,id);
if(_2b1!=null){
var _2b2=_2b1.getAttribute("value");
if(_2b2!==_2b0.value){
_2b0.value=_2b2;
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
},report:function(_2b5){
this.summary+=_2b5+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2b6=null;
if(!window.UpdateAssistant){
this._construct();
_2b6=this;
}
return _2b6;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2b7,fun){
var _2b9=true;
var len=_2b7.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2bb=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b7[i]!="undefined"){
if(!fun.call(_2bb,_2b7[i],i,_2b7)){
_2b9=false;
break;
}
}
}
}
return _2b9;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2be=arguments[1];
return Array.every(this,fun,_2be);
};
}
if(!Array.forEach){
Array.forEach=function(_2bf,fun){
var len=_2bf.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c2=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2bf[i]!="undefined"){
fun.call(_2c2,_2bf[i],i,_2bf);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2c5=arguments[1];
Array.forEach(this,fun,_2c5);
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
},getXMLHttpRequest:function(_2c7,_2c8,_2c9){
var _2ca=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2ca!=null){
_2ca.open(_2c7,_2c8,(_2c9!=null?true:false));
if(_2c9!=null){
function action(){
if(_2ca.readyState==4){
var text=_2ca.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2c9.handleResponse(dom);
}
}
}
if(_2ca.addEventListener!=null){
_2ca.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2ca.onreadystatechange=action;
}
}
}
return _2ca;
},dispatchEvent:function(_2cd,name){
var _2cf=true;
if(_2cd.fireEvent!=null){
_2cf=_2cd.fireEvent("on"+name);
}else{
var _2d0=document.createEvent("UIEvents");
_2d0.initEvent(name,true,true);
_2cf=_2cd.dispatchEvent(_2d0);
}
return _2cf;
},getUpdateZones:function(dom){
var _2d2="//*[@id and contains(@class,'updatezone')]";
var _2d3=[];
var _2d4=null;
var _2d5=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d4=dom.evaluate(_2d2,dom,null,type,null);
while((_2d5=_2d4.iterateNext())!=null){
_2d3.push(_2d5);
}
}else{
_2d4=dom.documentElement.selectNodes(_2d2);
Array.forEach(_2d4,function(_2d7){
_2d3.push(_2d7);
});
}
return _2d3;
},getElementById:function(dom,id){
var _2da="//*[@id='"+id+"']";
var _2db=null;
var _2dc=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2db=dom.evaluate(_2da,dom,null,type,null);
_2dc=_2db.singleNodeValue;
}else{
_2dc=dom.documentElement.selectNodes(_2da)[0];
}
return _2dc;
},_getIds:function(dom){
var _2df="//*[@id]";
var _2e0=null;
var _2e1=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2e0=dom.evaluate(_2df,dom,null,type,null);
while((element=_2e0.iterateNext())!=null){
_2e1.push(element.getAttribute("id"));
}
}else{
_2e0=dom.documentElement.selectNodes(_2df);
Array.forEach(_2e0,function(_2e3){
_2e1.push(_2e3.getAttribute("id"));
});
}
return _2e1;
},toHTMLElement:function(_2e4){
var _2e5=this.serialize(_2e4);
var temp=document.createElement("temp");
temp.innerHTML=_2e5;
return temp.firstChild;
},getActiveElement:function(){
var _2e7=document.activeElement;
if(_2e7==null||_2e7==document.body){
_2e7=this._activeElement;
}
return _2e7;
},serialize:function(_2e8){
var _2e9=null;
if(this._serializer!=null){
_2e9=this._serializer.serializeToString(_2e8);
}else{
_2e9=_2e8.xml;
}
return _2e9;
},hasDifferences:function(_2ea,_2eb){
var s1=null;
var s2=null;
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2ea);
s2=this._serializer.serializeToString(_2eb);
}else{
s1=_2ea.xml;
s2=_2eb.xml;
}
return s1!=s2;
},parse:function(_2ee){
var _2ef=null;
if(this._parser!=null){
_2ef=this._parser.parseFromString(_2ee,"text/xml");
}else{
_2ef=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2ef.setProperty("SelectionLanguage","XPath");
_2ef.loadXML(_2ee);
}
return this._validate(_2ef);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f2=dom.getElementsByTagName("parsererror").item(0);
if(_2f2!=null){
out=_2f2.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2f6=!has[id];
has[id]=true;
if(!_2f6){
out="Element \""+id+"\" encountered twice.";
}
return _2f6;
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
this.handleElement=function(_2f7,_2f8){
var _2f9=false;
switch(_2f7.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2f7.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2f9=false;
break;
}
break;
}
return _2f9;
};
this.updateElement=function(_2fa,_2fb){
var id=_2fa.getAttribute("id");
var _2fd=document.getElementById(id);
if(_2fd!=null){
var _2fe=null;
switch(_2fd.nodeName.toLowerCase()){
case "input":
_2fe=_2fa.getAttribute("value");
break;
case "textarea":
_2fe=_2fa.textContent?_2fa.textContent:_2fa.text;
break;
}
if(_2fe==null){
_2fe="";
}
if(_2fe!=_2fd.value){
_2fd.value=_2fe;
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
},_beforeUpdate:function(_2ff){
var _300=true;
if(_2ff!=null){
_2ff.__updateType=this.type;
_300=UpdateAssistant.dispatchEvent(_2ff,Update.EVENT_BEFOREUPDATE);
}
return _300;
},_afterUpdate:function(_301){
var _302=true;
if(_301!=null){
_301.__updateType=this.type;
_302=UpdateAssistant.dispatchEvent(_301,Update.EVENT_AFTERUPDATE);
}
return _302;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_304){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_304;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _305,_306,_307=UpdateAssistant.toHTMLElement(this.element);
if((_305=document.getElementById(this.id))!=null){
if((_306=_305.parentNode)!=null){
if(this._beforeUpdate(_305)){
_306.replaceChild(_307,_305);
this._afterUpdate(_307);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_308){
var _309=ReplaceUpdate.superclass._afterUpdate.call(this,_308);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_308.nodeName=="form"||_308.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _309;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_30c,_30d){
this.type=type;
this.id=id;
this.element=_30c;
this.isFirst=_30d;
return this;
}
SiblingUpdate.prototype.update=function(){
var _30e=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_30e);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_30e);
break;
}
};
SiblingUpdate.prototype._remove=function(_30f){
var _310=_30f.parentNode;
if(_310!=null){
if(this._beforeUpdate(_30f)){
_310.removeChild(_30f);
this._afterUpdate(_310);
}
}
};
SiblingUpdate.prototype._insert=function(_311,_312){
var _313=UpdateAssistant.toHTMLElement(_311);
if(this.isFirst){
var _314=_312;
if(_314!=null){
if(this._beforeUpdate(_314)){
_314.insertBefore(_313,_314.firstChild);
this._afterUpdate(_313);
}
}
}else{
var _314=_312.parentNode;
if(_314!=null){
if(this._beforeUpdate(_314)){
_314.insertBefore(_313,_312.nextSibling);
this._afterUpdate(_313);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_315){
var _316=SiblingUpdate.superclass._beforeUpdate.call(this,_315);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_315.id+"\"");
}
return _316;
};
SiblingUpdate.prototype._afterUpdate=function(_317){
var _318=true;
if(_317!=null){
_318=SiblingUpdate.superclass._afterUpdate.call(this,_317);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_317.id+"\"");
if(_317.nodeName=="form"||_317.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _318;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_31a,_31b){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_31a;
this.currentElement=_31b;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _31c=document.getElementById(this.id);
if(this._beforeUpdate(_31c)){
this._updateAttributes(_31c);
this._afterUpdate(_31c);
}
};
AttributesUpdate.prototype._updateAttributes=function(_31d){
Array.forEach(this.element.attributes,function(_31e){
var _31f=this.currentElement.getAttribute(_31e.nodeName);
if(_31f==null||_31f!=_31e.nodeValue){
this._setAttribute(_31d,_31e.nodeName,_31e.nodeValue);
this._summary.push("@"+_31e.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_320){
if(this.element.getAttribute(_320.nodeName)==null){
this._setAttribute(_31d,_320.nodeName,null);
this._summary.push("@"+_320.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_321,name,_323){
if(_321==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_323);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _324=(_323==null);
if(_324){
_321.removeAttribute(name);
}else{
_321.setAttribute(name,_323);
}
if(document.all!=null){
if(_324){
_323="";
}
switch(name.toLowerCase()){
case "class":
_321.className=_323;
break;
case "disabled":
_321.disabled=!_324;
break;
case "checked":
_321.checked=!_324;
break;
case "readonly":
_321.readOnly=!_324;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_325){
AttributesUpdate.superclass._afterUpdate.call(this,_325);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_326,key){
return _326.replace("${windowkey}",document.location+":"+key);
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
var _32a=this._newDimensions.w!=this._currentDimensions.w;
var _32b=this._newDimensions.h!=this._currentDimensions.h;
if(_32a||_32b){
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
},fireOnDOM:function(_32d){
if(Interfaces.isImplemented(IDOMHandler,_32d,true)){
this._ondomstatements.add(_32d);
}
},fireOnLoad:function(_32e){
if(Interfaces.isImplemented(ILoadHandler,_32e,true)){
this._onloadstatements.add(_32e);
}
},fireOnResize:function(_32f){
if(Interfaces.isImplemented(IResizeHandler,_32f,true)){
this._onresizestatements.add(_32f);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_330){
return eval(_330);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_331,_332){
SystemLogger.unsuspend(_332);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_333,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _336=top.app.bindingMap.broadcasterHasDirtyTabs;
_336.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_337,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _33a=top.app.bindingMap.broadcasterHasDirtyTabs;
_33a.disable();
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
var _33b=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_33b=LoginService.Logout(true);
if(!_33b){
alert("Logout failed.");
}
}
return _33b;
},lock:function(_33c){
if(_33c!=null){
this._lockthings[_33c]=true;
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
},unlock:function(_33d,_33e){
if(_33d!=null){
delete this._lockthings[_33d];
if(top.bindingMap.mastercover!=null){
if(_33e||this._lockers>0){
if(_33e){
var out="Unlocked by "+new String(_33d)+"\n";
for(var _340 in this._lockthings){
out+="Locked by "+new String(_340)+". ";
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
},hasLock:function(_341){
return this._lockthings[_341]==true;
},activate:function(_342){
var _343=this._activeBinding;
this._activeBinding=_342;
this._activatedBindings.add(_342);
if(_343&&_343.isActive){
_343.deActivate();
}
},deActivate:function(_344){
var _345=null;
var _346=null;
if(_344==this._activeBinding){
while(!_346&&this._activatedBindings.hasEntries()){
_345=this._activatedBindings.extractLast();
if(_345!=_344&&_345.isActivatable){
_346=_345;
}
}
if(!_346){
_346=app.bindingMap.explorerdock;
}
_346.activate();
}
},focused:function(_347){
this.isFocused=_347;
if(_347){
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
},handleAction:function(_34c){
switch(_34c.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _34e=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_350){
var src=_350.src;
if(src.indexOf(_34e)>-1){
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
var _355=false;
if(this._isMousePositionTracking){
_355=true;
if(Client.isExplorer&&e.button!=1){
_355=false;
}
if(_355){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _355;
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
},onDragStart:function(_357){
var _358=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_358,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_358.getImage());
this._cursorStartPoint=_357;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_358.showDrag){
_358.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_358.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _35a=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_35a);
}
},onDragStop:function(diff){
if(this._isDragging){
var _35c=BindingDragger.draggedBinding;
if(_35c.hideDrag){
_35c.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_35c.dragType);
this._isDragging=false;
_35c=BindingAcceptor.acceptingBinding;
if(_35c!=null){
if(Interfaces.isImplemented(IAcceptable,_35c,true)==true){
_35c.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_35c);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_35d){
if(this.isDeveloperMode||_35d){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_35e){
if(_35e==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_35f){
switch(_35f){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_361){
switch(_361.Key){
case "ProductVersion":
this.versionString=_361.Value;
break;
case "ProductTitle":
this.versionPrettyString=_361.Value;
break;
case "InstallationId":
this.installationID=_361.Value;
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
},initialize:function(_364){
if(!this.isInitialized){
this.isInitialized=true;
if(_364){
this._audio=_364;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _366=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_366=true;
}
return _366;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _367=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _368={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _369=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_369){
for(var key in _369){
_368[key]=_369[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_368);
}
}});
this.getPref=function(key){
var _36c=null;
if(key){
_36c=_368[key];
}else{
throw "No such preference.";
}
return _36c;
};
this.setPref=function(key,_36e){
if(key){
_368[key]=_36e;
}else{
throw "No such preference.";
}
};
function debug(_36f){
var _370=_36f?"Persisted preferences":"No persisted preferences. Using defaults";
_370+=":\n";
for(var key in _368){
var pref=_368[key];
_370+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_367.fine(_370);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _375=null;
if(this.isInitialized==true){
if(this._persistance){
var _376=this._persistance[id];
if(_376){
_375=_376[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _375;
},setPersistedProperty:function(id,prop,_379){
if(this.isInitialized==true){
if(this._persistance){
if(_379!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_379);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_37a){
switch(_37a){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _37b=top.bindingMap.persistance;
_37b.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _37c=top.bindingMap.persistance;
var map=_37c.getPersistanceMap();
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
function StandardEventHandler(doc,_37f){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_37f;
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
var _381={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_381);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_381);
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
var _388=UserInterface.getBinding(node);
if(_388!=null){
_388.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_388!=null?null:node.parentNode;
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
var _38b=Application.trackMousePosition(e);
if(_38b){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_38d){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_38d){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_38d=true;
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
var _38e=KeySetBinding.handleKey(this._contextDocument,e);
if(!_38e){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _38f=this._contextWindow.frameElement;
if(_38f!=null){
var _390=DOMUtil.getParentWindow(_38f);
if(_390.standardEventHandler!=null){
_390.standardEventHandler._handleKeyDown(e,_38d);
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
var _393=false;
var _394=DOMEvents.getTarget(e);
var name=_394.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_393=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_393;
}
if(_393){
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
StandardEventHandler.prototype.enableNativeKeys=function(_397){
this._isAllowTabs=(_397==true?true:false);
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
function Action(_39a,type){
this.target=_39a;
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
function Animation(_39c){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _39d in _39c){
this[_39d]=_39c[_39d];
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
Animation.prototype.onstart=function(_3a1){
};
Animation.prototype.onstep=function(_3a2){
};
Animation.prototype.onstop=function(_3a3){
};
Point.isEqual=function(p1,p2){
var _3a6=false;
if(p1&&p2){
_3a6=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a6;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3ab=false;
if(dim1&&dim2){
_3ab=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3ab;
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
function BindingAcceptor(_3b2){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b2;
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
var _3b3=new List(this._binding.dragAccept.split(" "));
while(_3b3.hasNext()){
var type=_3b3.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3b5,arg){
var type=arg;
try{
switch(_3b5){
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
function BindingBoxObject(_3ba){
this._domElement=_3ba.getBindingElement();
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
function BindingDragger(_3bc){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3bc;
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
BindingDragger.prototype.registerHandler=function(_3be){
if(Interfaces.isImplemented(IDragHandler,_3be)==true){
this.handler=_3be;
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
var _3c1=e.button==(e.target?0:1);
if(_3c1){
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
var _3c3=Application.getMousePosition();
var dx=_3c3.x-this.startPoint.x;
var dy=_3c3.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c6,e){
switch(_3c6){
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
function BindingParser(_3c8){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3c8;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3c9){
var _3ca=new List();
var xml=BindingParser.XML.replace("${markup}",_3c9);
var doc=XMLParser.parse(_3c9);
if(doc){
var _3cd=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3cd);
var node=_3cd.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3ca.add(node);
}
node=node.nextSibling;
}
}
return _3ca;
};
BindingParser.prototype._iterate=function(_3cf,_3d0){
var _3d1=null;
switch(_3cf.nodeType){
case Node.ELEMENT_NODE:
_3d1=this._cloneElement(_3cf);
UserInterface.registerBinding(_3d1);
break;
case Node.TEXT_NODE:
_3d1=this._ownerDocument.createTextNode(_3cf.nodeValue);
break;
}
if(_3d1){
_3d0.appendChild(_3d1);
}
if(_3d1&&_3cf.hasChildNodes()){
var _3d2=_3cf.firstChild;
while(_3d2){
this._iterate(_3d2,_3d1);
_3d2=_3d2.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3d3){
var _3d4=DOMUtil.createElementNS(_3d3.namespaceURI?_3d3.namespaceURI:Constants.NS_XHTML,_3d3.nodeName,this._ownerDocument);
var i=0;
while(i<_3d3.attributes.length){
var attr=_3d3.attributes.item(i++);
_3d4.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3d4;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3d7){
var _3d8=null;
var _3d9=false;
var _3da=_3d7.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d7)){
var _3db=UserInterface.getBinding(_3d7);
_3d9=BindingSerializer.activeInstance.indexBinding(_3db);
if(_3d9){
_3d8=_3db.key;
_3d7.setAttribute(BindingSerializer.KEYPOINTER,_3d8);
}
}
_3d8=_3d8?_3d8:_3da;
var _3dc=new List(_3d7.childNodes);
_3dc.each(function(_3dd){
if(_3dd.nodeType==Node.ELEMENT_NODE){
_3dd.setAttribute(BindingSerializer.KEYPOINTER,_3d8);
}
});
if(_3d9){
BindingSerializer.activeInstance.append(_3d8,_3da);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3de,_3df){
BindingSerializer.includeShadowTreeBindings=_3df?true:false;
BindingSerializer.activeInstance=this;
_3de.bindingWindow.ElementIterator.iterate(_3de.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3e0){
var _3e1=false;
var _3e2=_3e0.serialize();
if(_3e2!=false){
_3e1=true;
var _3e3="ui:"+DOMUtil.getLocalName(_3e0.bindingElement);
var _3e4=DOMUtil.createElementNS(Constants.NS_UI,_3e3,this._dom);
this._pointers[_3e0.key]=_3e4;
for(var prop in _3e2){
if(_3e2[prop]!=null){
_3e4.setAttribute(prop,String(_3e2[prop]));
}
}
}
return _3e1;
};
BindingSerializer.prototype.append=function(_3e6,_3e7){
var _3e8=this._pointers[_3e6];
var _3e9=_3e7?this._pointers[_3e7]:this._dom;
_3e9.appendChild(_3e8);
};
function ImageProfile(_3ea){
this._default=_3ea.image;
this._hover=_3ea.imageHover;
this._active=_3ea.imageActive;
this._disabled=_3ea.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3eb){
this._default=_3eb;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3ec){
this._hover=_3ec;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3ed){
this._active=_3ed;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3ee){
this._disabled=_3ee;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3ef,_3f0,_3f1){
var _3f2=null;
if(_3ef.isAttached){
_3f2=new List();
var _3f3=_3f1?_3ef.getChildElementsByLocalName(_3f0):_3ef.getDescendantElementsByLocalName(_3f0);
_3f3.each(function(_3f4){
var _3f5=UserInterface.getBinding(_3f4);
if(_3f5){
_3f2.add(_3f5);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3ef.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f2;
},getAncestorBindingByType:function(_3f7,impl,_3f9){
var _3fa=null;
if(Binding.exists(_3f7)){
var node=_3f7.bindingElement;
while(_3fa==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3fc=UserInterface.getBinding(node);
if(_3fc instanceof impl){
_3fa=_3fc;
}
}else{
if(_3f9&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3fa;
},getAncestorBindingByLocalName:function(_3fe,_3ff,_400){
var _401=null;
if(_3ff=="*"){
var node=_3fe.bindingElement;
while(!_401&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_401=UserInterface.getBinding(node);
}
}
}else{
_401=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3ff,_3fe.bindingElement,_400));
}
return _401;
},getChildElementsByLocalName:function(_403,_404){
var _405=new List();
var _406=new List(_403.bindingElement.childNodes);
_406.each(function(_407){
if(_407.nodeType==Node.ELEMENT_NODE){
if(_404=="*"||DOMUtil.getLocalName(_407)==_404){
_405.add(_407);
}
}
});
return _405;
},getChildBindingByType:function(_408,impl){
var _40a=null;
_408.getChildElementsByLocalName("*").each(function(_40b){
var _40c=UserInterface.getBinding(_40b);
if(_40c!=null&&_40c instanceof impl){
_40a=_40c;
return false;
}else{
return true;
}
});
return _40a;
},getDescendantBindingByType:function(_40d,impl){
var _40f=null;
_40d.getDescendantElementsByLocalName("*").each(function(_410){
var _411=UserInterface.getBinding(_410);
if(_411!=null&&_411 instanceof impl){
_40f=_411;
return false;
}else{
return true;
}
});
return _40f;
},getDescendantBindingsByType:function(_412,impl){
var _414=new List();
_412.getDescendantElementsByLocalName("*").each(function(_415){
var _416=UserInterface.getBinding(_415);
if(_416!=null&&_416 instanceof impl){
_414.add(_416);
}
return true;
});
return _414;
},getNextBindingByLocalName:function(_417,name){
var _419=null;
var _41a=_417.bindingElement;
while((_41a=DOMUtil.getNextElementSibling(_41a))!=null&&DOMUtil.getLocalName(_41a)!=name){
}
if(_41a!=null){
_419=UserInterface.getBinding(_41a);
}
return _419;
},getPreviousBindingByLocalName:function(_41b,name){
var _41d=null;
var _41e=_41b.bindingElement;
while((_41e=DOMUtil.getPreviousElementSibling(_41e))!=null&&DOMUtil.getLocalName(_41e)!=name){
}
if(_41e!=null){
_41d=UserInterface.getBinding(_41e);
}
return _41d;
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
},addFilter:function(_41f){
this._filters.add(_41f);
},removeFilter:function(_420){
var _421=-1;
this._filters.each(function(fil){
_421++;
var _423=true;
if(fil==_420){
_423=false;
}
return _423;
});
if(_421>-1){
this._filters.del(_421);
}
},_applyFilters:function(node,arg){
var _426=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _429=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _42a=true;
while(this._filters.hasNext()&&_42a==true){
var _42b=this._filters.getNext();
var res=_42b.call(this,node,arg);
if(res!=null){
_426=res;
switch(res){
case stop:
case skip:
case skip+_429:
_42a=false;
break;
}
}
}
return _426;
},crawl:function(_42d,arg){
this.contextDocument=_42d.ownerDocument;
this.onCrawlStart();
var _42f=this.type==NodeCrawler.TYPE_ASCENDING;
var _430=this._applyFilters(_42d,arg);
if(_430!=NodeCrawler.STOP_CRAWLING){
if(_42f&&_430==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_42f?_42d.parentNode:_42d;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_432,arg){
var _434=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_434=this._crawlDescending(_432,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_434=this._crawlAscending(_432,arg);
break;
}
return _434;
},_crawlDescending:function(_435,arg){
var skip=NodeCrawler.SKIP_NODE;
var _438=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _43a=null;
if(_435.hasChildNodes()){
var node=_435.firstChild;
while(node!=null&&_43a!=stop){
this.currentNode=node;
_43a=this._applyFilters(node,arg);
switch(_43a){
case stop:
case _438:
case skip+_438:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_43a=stop;
break;
}
}
}
if(_43a!=stop&&_43a!=skip){
this.previousNode=node;
}
break;
}
if(_43a!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _43a;
},_crawlAscending:function(_43d,arg){
var _43f=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_43d!=null){
this.currentNode=_43d;
_43f=this._applyFilters(_43d,arg);
if(_43f!=stop){
var next=this.nextNode?this.nextNode:_43d.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_43d;
_43f=this._crawl(next,arg);
}
}
}else{
_43f=stop;
}
return _43f;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _443 in this){
this[_443]=null;
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
var _446=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_446=NodeCrawler.SKIP_NODE;
}
return _446;
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
this.addFilter(function(_447,arg){
var _449=null;
if(!UserInterface.hasBinding(_447)){
_449=NodeCrawler.SKIP_NODE;
}
return _449;
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
this.addFilter(function(_44b,arg){
var _44d=null;
var _44e=UserInterface.getBinding(_44b);
if(Interfaces.isImplemented(ICrawlerHandler,_44e)==true){
self.response=null;
_44e.handleCrawler(self);
_44d=self.response;
}
return _44d;
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
this.addFilter(function(_450,list){
var _452=null;
var _453=UserInterface.getBinding(_450);
if(Interfaces.isImplemented(IFlexible,_453)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_453);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_453.isFlexSuspended==true){
_452=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_453);
}
break;
}
}
return _452;
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
this.addFilter(function(_454,list){
var _456=null;
var _457=UserInterface.getBinding(_454);
if(_457.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_457)==true){
if(_457.isFocusable&&_457.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_457);
break;
case FocusCrawler.MODE_FOCUS:
if(!_457.isFocused){
_457.focus();
}
_456=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_457.isFocused==true){
_457.blur();
_456=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _456;
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
this.addFilter(function(_458,list){
var _45a=null;
var _45b=UserInterface.getBinding(_458);
if(!_45b.isVisible){
_45a=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _45a;
});
this.addFilter(function(_45c,list){
var _45e=null;
var _45f=UserInterface.getBinding(_45c);
if(_45f.isAttached){
if(Interfaces.isImplemented(IFit,_45f)){
if(!_45f.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_45f);
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
UpdateAssistant.serialize=function(_460){
_460=_460.cloneNode(true);
_460.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_460.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_460);
};
}
},handleEvent:function(e){
var _462=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_462);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_462);
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
},_beforeUpdate:function(_463){
var _464=(_463==document.documentElement);
if(_464){
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
var _467=FocusBinding.focusedBinding;
if(_467!=null){
this._focusID=_467.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_463.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_463);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_463,false);
break;
}
}
},_afterUpdate:function(_468){
var _469=(_468==document.documentElement);
if(_469){
var _46a=this._elementsbuffer;
if(_46a.hasEntries()){
_46a.each(function(_46b){
DocumentManager.attachBindings(_46b);
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
var _46e=FocusBinding.focusedBinding;
if(_46e==null){
var _46f=document.getElementById(this._focusID);
if(_46f!=null){
var _46e=UserInterface.getBinding(_46f);
if(_46e!=null){
_46e.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _470=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _471="NEW DOM: "+document.title+"\n\n"+_470+"\n\n";
_471+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_471);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_468.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_468);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_468,true);
break;
}
switch(_468.id){
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
var _46e=UserInterface.getBinding(_468);
while(_46e==null&&_468!=null){
_46e=UserInterface.getBinding(_468);
_468=_468.parentNode;
}
if(_46e!=null){
_46e.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_473,_474){
var _475=UserInterface.getBinding(_473);
if(_475!=null){
if(_474){
var _476=this._attributesbuffer;
var map=new Map();
_476.each(function(name,old){
var now=_473.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_473.attributes).each(function(att){
if(att.specified){
if(!_476.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_47d){
var _47e=_475.propertyMethodMap[name];
if(_47e!=null){
_47e.call(_475,_47d);
}
});
}else{
var map=new Map();
new List(_473.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_480,_481){
var _482=window.bindingMap[_480.getAttribute("id")];
if(_482!=null){
return _482.handleElement(_480,_481);
}
},updateElement:function(_483,_484){
var _485=window.bindingMap[_483.getAttribute("id")];
if(_485!=null){
return _485.updateElement(_483,_484);
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
this.addFilter(function(_487,list){
var _489=UserInterface.getBinding(_487);
var _48a=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_489==null){
UserInterface.registerBinding(_487);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_489!=null){
if(!_489.isAttached){
list.add(_489);
}
if(_489.isLazy==true){
_48a=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_489!=null){
list.add(_489);
}
break;
}
return _48a;
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
},handleBroadcast:function(_48b,arg){
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
var _48e=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_48e)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_48e!=null){
if(_48e.href!=null&&_48e.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _48f=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_48f!=null){
var map={};
var _491=DOMUtil.getElementsByTagName(_48f,"bindingmapping");
new List(_491).each(function(_492){
var _493=_492.getAttribute("element");
var _494=_492.getAttribute("binding");
map[_493]=eval(_494);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_495){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_495;
}else{
this.customUserInterfaceMapping.merge(_495);
}
},_registerBindings:function(_496){
var _497=new DocumentCrawler();
_497.mode=DocumentCrawler.MODE_REGISTER;
_497.crawl(_496);
_497.dispose();
},_attachBindings:function(_498){
var _499=new DocumentCrawler();
_499.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_499.crawl(_498,list);
var _49b=false;
while(list.hasNext()){
var _49c=list.getNext();
if(!_49c.isAttached){
_49c.onBindingAttach();
if(!_49c.memberDependencies){
_49c.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_49c)){
_49b=true;
}
}
}
if(_49b){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_499.dispose();
list.dispose();
},attachBindings:function(_49e){
this._registerBindings(_49e);
this._attachBindings(_49e);
},detachBindings:function(_49f,_4a0){
var _4a1=new DocumentCrawler();
_4a1.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_4a1.crawl(_49f,list);
if(_4a0==true){
list.extractFirst();
}
var _4a3=false;
list.reverse().each(function(_4a4){
if(Interfaces.isImplemented(IData,_4a4)){
_4a3=true;
}
_4a4.dispose(true);
});
if(_4a3){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_4a1.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4a6){
return (/textarea|input/.test(DOMUtil.getLocalName(_4a6)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a7){
this.isDirty=true;
var _4a8=false;
if(_4a7!=null&&!_4a7.isDirty){
_4a7.isDirty=true;
_4a7.dispatchAction(Binding.ACTION_DIRTY);
_4a8=true;
}
return _4a8;
},clean:function(_4a9){
if(_4a9.isDirty){
_4a9.isDirty=false;
}
},registerDataBinding:function(name,_4ab){
if(Interfaces.isImplemented(IData,_4ab,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4ab;
}
}else{
throw "Invalid DataBinding: "+_4ab;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4ae=null;
if(this._dataBindings[name]!=null){
_4ae=this._dataBindings[name];
}
return _4ae;
},getAllDataBindings:function(_4af){
var list=new List();
for(var name in this._dataBindings){
var _4b2=this._dataBindings[name];
list.add(_4b2);
if(_4af&&_4b2 instanceof WindowBinding){
var _4b3=_4b2.getContentWindow().DataManager;
if(_4b3!=null){
list.merge(_4b3.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4b4=false;
for(var name in this._dataBindings){
_4b4=true;
break;
}
return _4b4;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4b8){
var _4b9=this._dataBindings[name];
if(_4b9!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4b9.setResult(_4b8);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4b9);
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
var _4ba=new DataBindingMap();
_4ba.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4bc=this._dataBindings[name];
if(_4bc instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4ba[name]=_4bc.getValue();
}
return _4ba;
},getDataBindingResultMap:function(){
var _4bd=new DataBindingMap();
_4bd.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4bf=this._dataBindings[name];
var res=_4bf.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c2){
_4bd.set(name,_4c2);
});
}else{
_4bd.set(name,res);
}
}
return _4bd;
},getPostBackString:function(){
var _4c3="";
var form=document.forms[0];
if(form!=null){
var _4c5="";
new List(form.elements).each(function(_4c6){
var name=_4c6.name;
var _4c8=encodeURIComponent(_4c6.value);
switch(_4c6.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c3+=name+"="+_4c8+"&";
break;
case "submit":
if(document.activeElement==_4c6){
_4c3+=name+"="+_4c8+"&";
}
break;
case "radio":
if(_4c6.checked){
_4c3+=name+"="+_4c8+"&";
}
break;
case "checkbox":
if(_4c6.checked){
if(_4c6.name==_4c5){
if(_4c3.lastIndexOf("&")==_4c3.length-1){
_4c3=_4c3.substr(0,_4c3.length-1);
}
_4c3+=","+_4c8;
}else{
_4c3+=name+"="+_4c6.value;
}
_4c5=name;
_4c3+="&";
}
break;
}
});
}
return _4c3.substr(0,_4c3.length-1);
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
var _4d1=null;
var _4d2=null;
var _4d3=false;
if(!this._cache[name]){
_4d3=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4d5=DOMUtil.getXMLHTTPRequest();
_4d5.open("get",uri,false);
_4d5.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4d5.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d2=_4d5.responseText;
break;
default:
_4d2=_4d5.responseXML;
break;
}
if(_4d2==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d2;
}
}
_4d2=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d1=_4d2;
break;
case this._modes.MODE_DOCUMENT:
_4d1=DOMUtil.cloneNode(_4d2,true);
break;
case this._modes.MODE_ELEMENT:
_4d1=DOMUtil.cloneNode(_4d2.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4d1=DOMSerializer.serialize(_4d2,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4d1=DOMSerializer.serialize(_4d2.documentElement,true);
break;
}
if(_4d3&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4d1));
}
return _4d1;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_TREEACTIONSELECTOR:"${root}/content/dialogs/treeselector/special/treeactionselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4d8){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4d8];
},invoke:function(url,_4da,_4db){
this._logger.error("Not implemented");
},invokeModal:function(url,_4dd,_4de){
var _4df=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4dd,argument:_4de});
StageBinding.presentViewDefinition(_4df);
return _4df;
},invokeDefinition:function(_4e0){
if(_4e0 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4e0);
}
return _4e0;
},question:function(_4e1,text,_4e3,_4e4){
if(!_4e3){
_4e3=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4e1,text,_4e3,_4e4);
},message:function(_4e5,text,_4e7,_4e8){
if(!_4e7){
_4e7=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4e5,text,_4e7,_4e8);
},error:function(_4e9,text,_4eb,_4ec){
if(!_4eb){
_4eb=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4e9,text,_4eb,_4ec);
},warning:function(_4ed,text,_4ef,_4f0){
if(!_4ef){
_4ef=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4ed,text,_4ef,_4f0);
},_standardDialog:function(type,_4f2,text,_4f4,_4f5){
var _4f6=null;
if(!_4f4){
_4f6=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4f6=new List();
new List(_4f4).each(function(_4f7){
var _4f8=null;
switch(typeof _4f7){
case "object":
_4f8=_4f7;
break;
case "string":
var _4f9=false;
if(_4f7.indexOf(":")>-1){
_4f7=_4f7.split(":")[0];
_4f9=true;
}
_4f8=Dialog.dialogButton(_4f7);
if(_4f9){
_4f8.isDefault=true;
}
break;
}
_4f6.add(_4f8);
});
}
var _4fa={title:_4f2,text:text,type:type,image:this._dialogImages[type],buttons:_4f6};
var _4fb=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4f5,argument:_4fa});
StageBinding.presentViewDefinition(_4fb);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4fd,arg){
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
},saveAll:function(_500){
var self=this;
var _502=Application.getDirtyDockTabsTabs();
if(_502.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_503,_504){
switch(_503){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_504,_500);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_502);
}else{
if(_500){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_505,_506){
var _507=false;
var list=new List();
_505.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_507=true;
var _50b=list.getLength();
var _50c={handleBroadcast:function(_50d,tab){
if(--_50b==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_506){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_50c);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _507;
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
var _511="Composite.Management.Help";
if(!StageBinding.isViewOpen(_511)){
StageBinding.handleViewPresentation(_511);
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
var _513=document.createEvent("Events");
_513.initEvent(type,true,true);
window.dispatchEvent(_513);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
function MediaUrl(url){
var _515=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)media(\(|%28)[\w\d-\:]+(\)|%29)/;
if(_515.test(url)){
var _516={};
url.replace(/^[^\?]*/g,"").replace(/([^?=&]+)(=([^&]*))?/g,function($0,$1,$2,$3){
_516[$1]=$3;
});
this.queryString=_516;
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
MediaUrl.prototype.setParam=function(key,_51e){
this.queryString[key]=_51e;
};
MediaUrl.prototype.toString=function(){
var url=this.path;
var _520=[];
for(var key in this.queryString){
_520.push(key+"="+this.queryString[key]);
}
if(_520.length>0){
url+="?"+_520.join("&");
}
return url;
};
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_522,_523){
var _524=null;
var _525=ViewDefinitions[_522];
if(_525.isMutable){
var impl=null;
if(_525 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_523!=null&&impl!=null){
var def=new impl();
for(var prop in _525){
def[prop]=ViewDefinition.cloneProperty(_525[prop]);
}
def.handle=_523;
_524=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _524;
};
ViewDefinition.cloneProperty=function(_529){
if(null==_529){
return _529;
}
if(typeof _529==="object"){
var _52a=(_529.constructor===Array)?[]:{};
for(var prop in _529){
_52a[prop]=ViewDefinition.cloneProperty(_529[prop]);
}
return _52a;
}
return _529;
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
Binding.evaluate=function(_531,_532){
var _533=null;
var _534=_532.bindingWindow.WindowManager;
if(_534!=null){
var _535=Binding.parseScriptStatement(_531,_532.key);
_533=_534.evaluate(_535);
}
return _533;
};
Binding.parseScriptStatement=function(_536,key){
if(_536!=null&&key!=null){
var _538="UserInterface.getBindingByKey ( \""+key+"\" )";
_536=_536.replace(/(\W|^)this(,| +|\)|;)/g,_538);
_536=_536.replace(/(\W|^)this(\.)/g,_538+".");
}
return _536;
};
Binding.exists=function(_539){
var _53a=false;
try{
if(_539&&_539.bindingElement&&_539.bindingElement.nodeType&&_539.isDisposed==false){
_53a=true;
}
}
catch(accessDeniedException){
_53a=false;
}
finally{
return _53a;
}
};
Binding.destroy=function(_53b){
if(!_53b.isDisposed){
if(_53b.acceptor!=null){
_53b.acceptor.dispose();
}
if(_53b.dragger!=null){
_53b.disableDragging();
}
if(_53b.boxObject!=null){
_53b.boxObject.dispose();
}
if(_53b._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_53b);
}
for(var _53c in _53b.shadowTree){
var _53d=_53b.shadowTree[_53c];
if(_53d instanceof Binding&&Binding.exists(_53d)){
_53d.dispose(true);
}
_53b.shadowTree[_53c]=null;
}
_53b.isDisposed=true;
_53b=null;
}
};
Binding.dotnetify=function(_53e,_53f){
var _540=_53e.getCallBackID();
if(_540!=null){
var _541=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_53e.bindingDocument);
_541.type="hidden";
_541.id=_540;
_541.name=_540;
_541.value=_53f!=null?_53f:"";
_53e.bindingElement.appendChild(_541);
_53e.shadowTree.dotnetinput=_541;
}else{
throw _53e.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_542){
var _543=_542.getProperty("image");
var _544=_542.getProperty("image-hover");
var _545=_542.getProperty("image-active");
var _546=_542.getProperty("image-disabled");
if(_542.imageProfile==null){
if(_542.image==null&&_543!=null){
_542.image=_543;
}
if(_542.imageHover==null&&_544!=null){
_542.imageHover=_543;
}
if(_542.imageActive==null&&_545!=null){
_542.imageActive=_545;
}
if(_542.imageDisabled==null&&_546!=null){
_542.imageDisabled=_546;
}
if(_542.image||_542.imageHover||_542.imageActive||_542.imageDisabled){
_542.imageProfile=new ImageProfile(_542);
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
var _548=this.dependentBindings[key];
_548.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_549){
if(_549){
this.memberDependencies[_549.key]=true;
var _54a=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_54a=false;
break;
}
}
if(_54a){
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
Binding.prototype.detachRecursive=function(_54c){
if(_54c==null){
_54c=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_54c);
};
Binding.prototype.addMember=function(_54d){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_54d.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_54d.key]=false;
_54d.registerDependentBinding(this);
}
}
return _54d;
};
Binding.prototype.addMembers=function(_54e){
while(_54e.hasNext()){
var _54f=_54e.getNext();
if(!_54f.isInitialized){
this.addMember(_54f);
}
}
return _54e;
};
Binding.prototype.registerDependentBinding=function(_550){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_550.key]=_550;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _551=this.getProperty("persist");
if(_551&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _553=new List(_551.split(" "));
while(_553.hasNext()){
var prop=_553.getNext();
var _555=Persistance.getPersistedProperty(id,prop);
if(_555!=null){
this._persist[prop]=_555;
this.setProperty(prop,_555);
}else{
_555=this.getProperty(prop);
if(_555!=null){
this._persist[prop]=_555;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _556=this.getProperty("disabled");
var _557=this.getProperty("contextmenu");
var _558=this.getProperty("observes");
var _559=this.getProperty("onattach");
var _55a=this.getProperty("hidden");
var _55b=this.getProperty("blockactionevents");
if(_55a==true&&this.isVisible==true){
this.hide();
}
if(_556&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_557){
this.setContextMenu(_557);
}
if(_558){
this.observe(this.getBindingForArgument(_558));
}
if(_55b==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_559!=null){
Binding.evaluate(_559,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _55d=this.getProperty("draggable");
var _55e=this.getProperty("dragtype");
var _55f=this.getProperty("dragaccept");
var _560=this.getProperty("dragreject");
if(_55d!=null){
this.isDraggable=_55d;
}
if(_55e!=null){
this.dragType=_55e;
if(_55d!=false){
this.isDraggable=true;
}
}
if(_55f!=null){
this.dragAccept=_55f;
}
if(_560!=null){
this.dragReject=_560;
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
Binding.prototype._updateBindingMap=function(_561){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _564=null;
if(_561){
_564=map[id];
if(_564!=null&&_564!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_564=map[id];
if(_564!=null&&_564==this){
delete map[id];
}
}
}else{
var _566=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_561);
if(Application.isDeveloperMode==true){
alert(_566);
}else{
this.logger.error(_566);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_568){
};
Binding.prototype.handleBroadcast=function(_569,arg){
};
Binding.prototype.handleElement=function(_56b){
return false;
};
Binding.prototype.updateElement=function(_56c){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _56e=null;
switch(typeof arg){
case "object":
_56e=arg;
break;
case "string":
_56e=this.bindingDocument.getElementById(arg);
if(_56e==null){
_56e=Binding.evaluate(arg,this);
}
break;
}
if(_56e!=null&&_56e.nodeType!=null){
_56e=UserInterface.getBinding(_56e);
}
return _56e;
};
Binding.prototype.serialize=function(){
var _56f={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_56f.id=id;
}
var _571=this.getProperty("binding");
if(_571){
_56f.binding=_571;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _572=this.getAncestorBindingByLocalName("*");
if(_572){
if(_572.isShadowBinding){
this.isShadowBinding=true;
_56f=false;
}else{
var tree=_572.shadowTree;
for(var key in tree){
var _575=tree[key];
if(_575==this){
this.isShadowBinding=true;
_56f=false;
}
}
}
}
}
return _56f;
};
Binding.prototype.serializeToString=function(_576){
var _577=null;
if(this.isAttached){
_577=new BindingSerializer().serializeBinding(this,_576);
}else{
throw "cannot serialize unattached binding";
}
return _577;
};
Binding.prototype.subTreeFromString=function(_578){
this.detachRecursive();
this.bindingElement.innerHTML=_578;
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
if(this.bindingElement.hasChildNodes()){
throw new Error("MatrixBinding: No support for childnodes!");
}else{
this.bindingElement.innerHTML=Templates.getTemplateElementText(this.template);
this.shadowTree.table=this.bindingElement.firstChild;
}
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
MenuBodyBinding.prototype.setDimension=function(dim){
this.getBindingElement().style.width=new String(dim.w)+"px";
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
var _704=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _705=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_704){
this._bodyBinding=UserInterface.getBinding(_704);
}else{
if(_705){
this._bodyBinding=UserInterface.getBinding(_705);
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
var _706=this.getProperty("position");
this.position=_706?_706:PopupBinding.POSITION_BOTTOM;
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
if(Client.isExplorer){
this._bodyBinding.setDimension(this.getDimension());
}
this._enableTab(true);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
this.dispatchAction(Binding.ACTION_POSITIONCHANGED);
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
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
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
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
if(self.shadowBinding!=null){
self.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
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
if(this.spellcheck&&Client.isFirefox){
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
var _867=this.getProperty("isdisabled");
if(this.isDisabled||_867){
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
if(_886.isSelected){
this.select(_88b,true);
}
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
if(Client.isMozilla==true){
_896.style.minWidth=_895;
}else{
_896.style.width=_895;
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
SelectorBinding.prototype.handleBroadcast=function(_898,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_898,arg);
switch(_898){
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
SelectorBinding.prototype.select=function(_89b,_89c){
var _89d=false;
if(_89b!=this._selectedItemBinding){
this._selectedItemBinding=_89b;
_89d=true;
var _89e=this._buttonBinding;
this._selectionValue=_89b.selectionValue;
_89e.setLabel(_89b.getLabel());
if(_89b.imageProfile!=null){
_89e.imageProfile=_89b.imageProfile;
}
if(_89e.imageProfile!=null){
_89e.setImage(this.isDisabled==true?_89e.imageProfile.getDisabledImage():_89e.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_89c){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_89c)){
this.validate();
}
}
return _89d;
};
SelectorBinding.prototype._relate=function(){
var _89f=this.getProperty("relate");
if(_89f){
var _8a0=this.bindingDocument.getElementById(_89f);
if(_8a0){
var _8a1=UserInterface.getBinding(_8a0);
if(_8a1){
if(this.isChecked){
_8a1.show();
}else{
_8a1.hide();
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
SelectorBinding.prototype.selectByValue=function(_8a2,_8a3){
var _8a4=false;
var _8a5=this._menuBodyBinding;
var _8a6=_8a5.getDescendantElementsByLocalName("menuitem");
while(_8a6.hasNext()){
var _8a7=UserInterface.getBinding(_8a6.getNext());
if(_8a7.selectionValue==_8a2){
_8a4=this.select(_8a7,_8a3);
break;
}
}
return _8a4;
};
SelectorBinding.prototype.getValue=function(){
var _8a8=this._selectionValue;
if(_8a8!=null){
_8a8=String(_8a8);
}
return _8a8;
};
SelectorBinding.prototype.setValue=function(_8a9){
this.selectByValue(String(_8a9),true);
};
SelectorBinding.prototype.getResult=function(){
var _8aa=this._selectionValue;
if(_8aa=="null"){
_8aa=null;
}
if(_8aa){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8aa=Number(_8aa);
break;
}
}
return _8aa;
};
SelectorBinding.prototype.setResult=function(_8ab){
this.selectByValue(_8ab,true);
};
SelectorBinding.prototype.validate=function(){
var _8ac=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8ad=this.getValue();
if(_8ad==this.defaultSelection.value){
_8ac=false;
}
if(_8ac!=this._isValid){
if(_8ac){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8ac;
}
return _8ac;
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
var _8ae=this._popupBinding;
if(!this._isUpToDate){
_8ae.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8af,_8b0){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8af));
return true;
};
SelectorBinding.newInstance=function(_8b1){
var _8b2=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8b1);
return UserInterface.registerBinding(_8b2,SelectorBinding);
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
var _8b5=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8b5){
this.onValueChange=function(){
Binding.evaluate(_8b5,this);
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
SimpleSelectorBinding.prototype.focus=function(_8b8){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8b8){
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
SimpleSelectorBinding.prototype._hack=function(_8b9){
if(Client.isExplorer){
this._select.style.width=_8b9?"auto":this._cachewidth+"px";
if(_8b9){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8ba=true;
if(this.isRequired){
if(this.getValue()==null){
_8ba=false;
}
}
if(_8ba!=this._isValid){
if(_8ba){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8bb=this._select;
var _8bc=_8bb.options[_8bb.selectedIndex];
var text=DOMUtil.getTextContent(_8bc);
_8bb.blur();
_8bb.style.color="#A40000";
_8bb.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8bc,DataBinding.warnings["required"]);
}
_8bb.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8bc,text);
}
};
}
this._isValid=_8ba;
}
return _8ba;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8be=null;
var _8bf=this._select;
var _8c0=_8bf.options[_8bf.selectedIndex];
var _8c1=true;
if(Client.isExplorer){
var html=_8c0.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8c1=false;
}
}
if(_8c1){
_8be=_8c0.getAttribute("value");
}
return _8be;
};
SimpleSelectorBinding.prototype.setValue=function(_8c3){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8c4){
this.setValue(_8c4);
};
SimpleSelectorBinding.newInstance=function(_8c5){
var _8c6=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8c5);
return UserInterface.registerBinding(_8c6,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8c7,_8c8,_8c9,_8ca,_8cb){
this._init(_8c7,_8c8,_8c9,_8ca,_8cb);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8cc,_8cd,_8ce,_8cf,_8d0){
if(_8cc!=null){
this.label=String(_8cc);
}
if(_8cd!=null){
this.value=String(_8cd);
}
if(_8cf!=null){
this.imageProfile=_8cf;
}
if(_8d0!=null){
this.tooltip=_8d0;
}
this.isSelected=_8ce?true:false;
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
var _8d1=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8d1.popupBindingTargetElement=this.shadowTree.input;
_8d1.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8d1.attach();
var self=this;
_8d1.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8d1;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8d4=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8d4).each(function(_8d5){
if(_8d5.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8d6=_8d5.getAttribute("value");
var _8d7=_8d5.getAttribute("selected");
var _8d8=_8d5.getAttribute("tooltip");
list.add({value:_8d6?_8d6:null,toolTip:_8d8?_8d8:null,isSelected:(_8d7&&_8d7=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8da=this._menuBodyBinding;
var _8db=_8da.bindingDocument;
while(_8da.bindingElement.hasChildNodes()){
var node=_8da.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8da.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8dd=list.getNext();
var _8de=MenuItemBinding.newInstance(_8db);
_8de.setLabel(_8dd.value);
_8de.selectionValue=_8dd.value;
if(_8dd.toolTip){
_8de.setToolTip(_8dd.toolTip);
}
if(_8dd.isSelected){
this.select(_8de,true);
}
_8da.add(_8de);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8df){
this.select(_8df);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8e0,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8e0,arg);
switch(_8e0){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8e0,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8e2){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8e2);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8e3){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8e3);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8e4=this.bindingElement.offsetWidth+"px";
var _8e5=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8e5.style.minWidth=_8e4;
}else{
_8e5.style.width=_8e4;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8e6=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8e7=this.getValue();
var _8e8=null;
_8e6.each(function(item){
if(item.getLabel()==_8e7){
_8e8=item;
}
});
if(_8e8){
_8e8.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8eb){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8eb){
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
var _8ec=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8ec.setImage("${icon:popup}");
this.addFirst(_8ec);
_8ec.attach();
var self=this;
_8ec.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8ee=self.getProperty("handle");
var _8ef=ViewDefinitions[_8ee];
if(_8ef instanceof DialogViewDefinition){
_8ef.handler={handleDialogResponse:function(_8f0,_8f1){
self._isButtonClicked=false;
if(_8f0==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8f2=_8f1.getFirst();
self.setValue(_8f2);
self.validate(true);
}
self.focus();
}};
_8ef.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8ef);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8ec.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8ec;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8f4=this._dialogButtonBinding;
if(_8f4!=null){
_8f4.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8f6=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8f6=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8f6;
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
var _8fb=ViewDefinitions[self.handle];
if(_8fb instanceof DialogViewDefinition){
_8fb.handler={handleDialogResponse:function(_8fc,_8fd){
self._isButtonClicked=false;
if(_8fc==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into ImageInputDialogBinding#buildButton");
var _8fe=_8fd.getFirst();
self.setValue(_8fe);
self.validate(true);
self.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
}
self.focus();
}};
_8fb.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8fb);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8f9.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8f9;
};
ImageInputDialogBinding.prototype.oncommand=function(){
var _900=this._dialogButtonBinding;
if(_900!=null){
_900.oncommand();
}
};
ImageInputDialogBinding.prototype.onblur=function(){
ImageInputDialogBinding.superclass.onblur.call(this);
this.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
};
ImageInputDialogBinding.prototype.validate=function(arg){
var _902=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_902=ImageInputDialogBinding.superclass.validate.call(this,arg);
}
return _902;
};
ImageInputDialogBinding.prototype.setValue=function(_903){
if(this.isReadOnly){
this.value=_903;
this.shadowTree.input.value=TreeService.GetMediaLabel(_903);
}else{
ImageInputDialogBinding.superclass.setValue.call(this,_903);
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
ImageInputDialogBinding.prototype.setReadOnly=function(_904){
var _905=this.isReadOnly;
ImageInputDialogBinding.superclass.setReadOnly.call(this,_904);
if(_905==true&&_904==false){
ImageInputDialogBinding.superclass.setValue.call(this,this.value);
}
if(_905==false&&_904==true){
this.value=ImageInputDialogBinding.superclass.getValue.call(this);
var _906=TreeService.GetMediaLabel(this.value);
this.shadowTree.input.value=_906;
this.shadowTree.input.title=_906;
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
var _907=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _908=this.getProperty("image");
if(_908!=null){
_907.setImage(_908);
}else{
_907.setImage("${icon:popup}");
}
this.addFirst(_907);
_907.attach();
var self=this;
_907.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_907;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _90a=this._dialogButtonBinding;
if(_90a!=null){
_90a.oncommand();
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
var _90b=this.getProperty("label");
var _90c=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_90b!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_90b+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_90b);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_90c!=null){
this._buttonBinding.setToolTip(_90c);
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
DataDialogBinding.prototype.handleAction=function(_90e){
DataDialogBinding.superclass.handleAction.call(this,_90e);
var _90f=_90e.target;
var self=this;
switch(_90e.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_911,_912){
if(_911==Dialog.RESPONSE_ACCEPT){
if(_912 instanceof DataBindingMap){
self._map=_912;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_90f==this._buttonBinding){
_90e.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_913,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_913,arg);
switch(_913){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _916=this.getProperty("handle");
var url=this.getURL();
var _918=null;
if(_916!=null||def!=null){
if(def!=null){
_918=def;
}else{
_918=ViewDefinitions[_916];
}
if(_918 instanceof DialogViewDefinition){
_918.handler=this._handler;
if(this._map!=null){
_918.argument=this._map;
}
StageBinding.presentViewDefinition(_918);
}
}else{
if(url!=null){
_918=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_918!=null){
this._dialogViewHandle=_918.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_919){
this.setProperty("label",_919);
if(this.isAttached){
this._buttonBinding.setLabel(_919+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_91a){
this.setProperty("image",_91a);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_91a);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_91b){
this.setProperty("tooltip",_91b);
if(this.isAttached){
this._buttonBinding.setToolTip(_91b);
}
};
DataDialogBinding.prototype.setHandle=function(_91c){
this.setProperty("handle",_91c);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_91e){
this._handler=_91e;
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
DataDialogBinding.newInstance=function(_920){
var _921=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_920);
return UserInterface.registerBinding(_921,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_923,_924){
if(_923==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_924);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_925){
_925=new String(_925);
this.dirty();
this.setValue(encodeURIComponent(_925));
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
var _929=this.getValue();
if(_929==null){
_929="";
}
this.shadowTree.dotnetinput.value=_929;
};
PostBackDataDialogBinding.prototype.setValue=function(_92a){
this.setProperty("value",_92a);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_92b){
};
PostBackDataDialogBinding.newInstance=function(_92c){
var _92d=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_92c);
return UserInterface.registerBinding(_92d,PostBackDataDialogBinding);
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
var _92e=this.getProperty("dialoglabel");
var _92f=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _931=this.getProperty("handle");
if(_931!=null){
var def=ViewDefinition.clone(_931,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_92e!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_92e;
}
if(_92f!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_92f;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_933){
var _934=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_933);
return UserInterface.registerBinding(_934,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_936){
self._datathing.setValue(_936);
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
var _939=self.getValue();
if(_939==""||_939==null){
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
var _93a=this.getProperty("value");
var _93b=this.getProperty("selectorlabel");
if(_93b==null){
_93b=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_93a==null));
list.add(new SelectorBindingSelection(_93b+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_93a!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _93a=this.getValue();
if(_93a==""||_93a==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_93d){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_93d);
switch(_93d.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_93d.target==this._datathing){
var _93e=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_93e){
self._selector.setLabel(_93e);
}
},500);
_93d.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_940){
this.setProperty("label",_940);
if(this._selector!=null){
this._selector.setLabel(_940);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_941){
this._datathing.setValue(_941);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_942,_943){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_942,_943)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_944){
this._buttonBinding.setLabel(_944);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_945){
this._buttonBinding.setToolTip(_945);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_946){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_946);
switch(_946.type){
case MenuItemBinding.ACTION_COMMAND:
var _947=_946.target;
var _948=this.master;
if(_947.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_947.getLabel());
setTimeout(function(){
_948.action();
},0);
}else{
this.master.setValue("");
}
_948.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_949){
var _94a=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_949);
return UserInterface.registerBinding(_94a,NullPostBackDataDialogSelectorBinding);
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
var _94b=this._dataDialogBinding;
if(_94b!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_94b.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _94c=this.getProperty("editable");
var _94d=this.getProperty("selectable");
var _94e=this.getProperty("display");
if(_94c!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_94d){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_94e){
this._display=_94e;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _94f=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_94f.selections=this.selections;
this.add(_94f);
_94f.attach();
this._dataDialogBinding=_94f;
this.shadowTree.datadialog=_94f;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _951=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _952=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_951=_952.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_951=_952.isSelected!=true;
break;
}
if(_951){
this.shadowTree.box.appendChild(this._getElementForSelection(_952));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_954){
var box=this.shadowTree.box;
var _956=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _957=list.getNext();
if(_954){
_957.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_956=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_956=_957.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_956=_957.isSelected!=true;
break;
}
}
if(_956){
var _958=this._getElementForSelection(_957);
box.insertBefore(_958,box.firstChild);
CSSUtil.attachClassName(_958,"selected");
this._selectionMap.set(_957.value,_958);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_959){
var _95a=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_95a.appendChild(this.bindingDocument.createTextNode(_959.label));
_95a.setAttribute("label",_959.label);
_95a.setAttribute("value",_959.value);
return _95a;
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
var _95c=DOMEvents.getTarget(e);
var _95d=DOMUtil.getLocalName(_95c);
if(_95d=="div"){
this._handleMouseDown(_95c);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_95e){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _95f=this._getElements();
var _960=_95e.getAttribute("value");
var _961=this._lastSelectedElement.getAttribute("value");
var _962=false;
while(_95f.hasNext()){
var el=_95f.getNext();
switch(el.getAttribute("value")){
case _960:
case _961:
_962=!_962;
break;
}
if(_962){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_95e);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_95e)){
this._unhilite(_95e);
}else{
this._hilite(_95e);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_95e){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_95e;
};
MultiSelectorBinding.prototype._hilite=function(_966){
var _967=_966.getAttribute("value");
if(!this._selectionMap.has(_967)){
CSSUtil.attachClassName(_966,"selected");
this._selectionMap.set(_967,_966);
}
};
MultiSelectorBinding.prototype._unhilite=function(_968){
var _969=_968.getAttribute("value");
if(this._selectionMap.has(_969)){
CSSUtil.detachClassName(_968,"selected");
this._selectionMap.del(_969);
}
};
MultiSelectorBinding.prototype._isHilited=function(_96a){
return CSSUtil.hasClassName(_96a,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_96b){
MultiSelectorBinding.superclass.handleAction.call(this,_96b);
var _96c=_96b.target;
switch(_96b.type){
case DataDialogBinding.ACTION_COMMAND:
if(_96c==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_96b.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_96c.result);
this.dirty();
_96c.result=null;
_96b.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _96d=null;
if(this.isSelectable){
_96d=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_96f){
if(self._isHilited(_96f)){
_96f.parentNode.removeChild(_96f);
_96d.add(new SelectorBindingSelection(_96f.getAttribute("label"),_96f.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _96d;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _971=this._getElements();
if(!isUp){
_971.reverse();
}
var _972=true;
while(_972&&_971.hasNext()){
var _973=_971.getNext();
if(this._isHilited(_973)){
switch(isUp){
case true:
if(_973.previousSibling){
_973.parentNode.insertBefore(_973,_973.previousSibling);
}else{
_972=false;
}
break;
case false:
if(_973.nextSibling){
_973.parentNode.insertBefore(_973,_973.nextSibling.nextSibling);
}else{
_972=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _974=new List();
var _975=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_977){
var _978=new SelectorBindingSelection(_977.getAttribute("label"),_977.getAttribute("value"),_975);
_978.isHighlighted=self._isHilited(_977);
_974.add(_978);
});
return _974;
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
var _979=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_979.hasEntries()){
_979.each(function(_97a){
_97a.parentNode.removeChild(_97a);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _97b=this.selections.getNext();
if(_97b.isSelected){
var _97c=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_97c.name=this._name;
_97c.value=_97b.value;
this.bindingElement.appendChild(_97c);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_97d){
alert(_97d);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_97e){
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
var _97f={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _980=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_980.handler=this._handler;
_980.argument=_97f;
StageBinding.presentViewDefinition(_980);
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
var _981={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _983={handleDialogResponse:function(_984,_985){
if(_984==Dialog.RESPONSE_ACCEPT){
self.result=_985;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _986=ViewDefinitions[this._dialogViewHandle];
_986.handler=_983;
_986.argument=_981;
StageBinding.presentViewDefinition(_986);
};
MultiSelectorDataDialogBinding.newInstance=function(_987){
var _988=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_987);
return UserInterface.registerBinding(_988,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_989){
var id=_989.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _98b=_989.bindingDocument.getElementById(id);
if(_98b!=null){
var _98c=UserInterface.getBinding(_98b);
_98c.setResult(true);
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
var _98e=this.bindingDocument.getElementById(id);
if(_98e!=null){
var _98f=UserInterface.getBinding(_98e);
if(_98f&&!_98f.isAttached){
_98f.isLazy=true;
}else{
_98e.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_990){
this._isLazy=_990;
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
var _992=this.getProperty("stateprovider");
var _993=this.getProperty("handle");
if(_992!=null&&_993!=null){
url=url.replace("${stateprovider}",_992).replace("${handle}",_993);
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
EditorDataBinding.prototype._onPageInitialize=function(_994){
EditorDataBinding.superclass._onPageInitialize.call(this,_994);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_995){
EditorDataBinding.superclass.handleAction.call(this,_995);
switch(_995.type){
case Binding.ACTION_DIRTY:
if(_995.target!=this){
if(!this.isDirty){
this.dirty();
}
_995.consume();
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
EditorDataBinding.prototype.setValue=function(_996){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_997){
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
var _99c=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_99c=fake.getValue()!="";
}
if(!_99c&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_99c&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _99c;
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
var _9a0=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_9a0!=null){
_9a0.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_9a1){
_9a1=_9a1!=null?_9a1:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_9a1;
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
var _9a2=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9a3=_9a2.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9a3;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9a3=_9a3.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9a3;
}
var self=this;
var _9a5=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9a5.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9a8=this.getProperty("label");
if(_9a8){
this.setLabel(_9a8);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9a9){
this.setProperty("label",_9a9);
if(this.shadowTree.labelBinding==null){
var _9aa=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9aa.attachClassName("fieldgrouplabel");
cell.insertBefore(_9aa.bindingElement,cell.getElementsByTagName("div").item(1));
_9aa.attach();
this.shadowTree.labelBinding=_9aa;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9a9));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9ac){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9ac.bindingElement);
return _9ac;
};
FieldGroupBinding.prototype.addFirst=function(_9ad){
var _9ae=this.shadowTree[FieldGroupBinding.CENTER];
_9ae.insertBefore(_9ad.bindingElement,_9ae.firstChild);
return _9ad;
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
var _9af=this.getProperty("relation");
if(_9af!=null){
this.bindingRelation=_9af;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9b0,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9b0,arg);
switch(_9b0){
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
FieldBinding.newInstance=function(_9b2){
var _9b3=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9b2);
return UserInterface.registerBinding(_9b3,FieldBinding);
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
var _9b4=this.getDescendantBindingByLocalName("fieldgroup");
if(_9b4!=null){
_9b4.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9b5=true;
var _9b6=this.getDescendantBindingsByLocalName("*");
while(_9b6.hasNext()){
var _9b7=_9b6.getNext();
if(Interfaces.isImplemented(IData,_9b7)){
var _9b8=_9b7.validate();
if(_9b5&&!_9b8){
_9b5=false;
}
}
}
return _9b5;
};
FieldsBinding.prototype.handleAction=function(_9b9){
FieldsBinding.superclass.handleAction.call(this,_9b9);
var _9ba=_9b9.target;
if(_9ba!=this){
switch(_9b9.type){
case Binding.ACTION_INVALID:
var _9bb=DataBinding.getAssociatedLabel(_9ba);
if(_9bb){
this._invalidFieldLabels.set(_9ba.key,_9bb);
}
if(_9ba.error){
if(!_9ba.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9ba.error},_9ba);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9b9.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9ba.key)){
this._invalidFieldLabels.del(_9ba.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9b9.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9bc=null;
if(this._invalidFieldLabels.hasEntries()){
_9bc=this._invalidFieldLabels.toList();
}
return _9bc;
};
FieldsBinding.newInstance=function(_9bd){
var _9be=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9bd);
return UserInterface.registerBinding(_9be,FieldsBinding);
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
var _9bf=this.getProperty("image");
if(_9bf){
this.setImage(_9bf);
}
var _9c0=this.getProperty("tooltip");
if(_9c0){
this.setToolTip(_9c0);
}
var _9c1=this.getProperty("label");
if(_9c1){
this.setLabel(_9c1);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9c3=this.getAncestorBindingByLocalName("field");
if(_9c3){
var _9c4=true;
_9c3.getDescendantBindingsByLocalName("*").each(function(_9c5){
if(Interfaces.isImplemented(IData,_9c5)){
_9c5.focus();
_9c4=false;
}
return _9c4;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9c6){
this.setProperty("label",_9c6);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9c6);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9c7=this.getProperty("label");
if(!_9c7){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9c7=node.data;
}
}
return _9c7;
};
FieldDescBinding.prototype.setImage=function(_9c9){
this.setProperty("image",_9c9);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9ca){
this.setProperty("tooltip",_9ca);
if(this.isAttached){
this.bindingElement.title=_9ca;
}
};
FieldDescBinding.newInstance=function(_9cb){
var _9cc=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9cb);
return UserInterface.registerBinding(_9cc,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9cd){
var _9ce=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9cd);
return UserInterface.registerBinding(_9ce,FieldDataBinding);
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
var _9cf=this._fieldHelpPopupBinding;
if(_9cf){
_9cf.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9d0=app.bindingMap.fieldhelpopupset;
var doc=_9d0.bindingDocument;
var _9d2=_9d0.add(PopupBinding.newInstance(doc));
var _9d3=_9d2.add(PopupBodyBinding.newInstance(doc));
_9d2.position=PopupBinding.POSITION_RIGHT;
_9d2.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9d3.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9d4=this.getProperty("label");
if(_9d4){
_9d3.bindingElement.innerHTML=Resolver.resolve(_9d4);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9d2;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9d5=this.getAncestorBindingByLocalName("field");
if(_9d5){
_9d5.attachClassName("fieldhelp");
var _9d6=ClickButtonBinding.newInstance(this.bindingDocument);
_9d6.attachClassName("fieldhelp");
_9d6.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9d6);
_9d6.attach();
var self=this;
_9d6.oncommand=function(){
self.attachPopupBinding();
};
_9d6.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9d6;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9d8=this._fieldHelpPopupBinding;
if(_9d8&&!_9d8.isAttached){
_9d8.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9da){
RadioDataGroupBinding.superclass.handleAction.call(this,_9da);
switch(_9da.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9dc,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9dc,arg);
switch(_9dc){
case BroadcastMessages.KEY_ARROW:
var _9de=null;
var next=null;
var _9e0=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9e0=this.getChildBindingsByLocalName("radio");
while(!_9de&&_9e0.hasNext()){
var _9e1=_9e0.getNext();
if(_9e1.getProperty("ischecked")){
_9de=_9e1;
}
}
break;
}
if(_9de){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9e0.getFollowing(_9de);
while(next!=null&&next.isDisabled){
next=_9e0.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9e0.getPreceding(_9de);
while(next!=null&&next.isDisabled){
next=_9e0.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9e2){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9e2){
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
var _9e3=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9e3.type="hidden";
_9e3.name=this._name;
this.bindingElement.appendChild(_9e3);
this.shadowTree.input=_9e3;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9e4=null;
var _9e5=this.getChildBindingsByLocalName("radio");
while(!_9e4&&_9e5.hasNext()){
var _9e6=_9e5.getNext();
if(_9e6.isChecked){
_9e4=_9e6.getProperty("value");
}
}
return _9e4;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9e7){
};
RadioDataGroupBinding.prototype.setResult=function(_9e8){
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
this.propertyMethodMap["checked"]=function(_9e9){
if(_9e9!=this.isChecked){
this.setChecked(_9e9,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9ea=this.getProperty("ischecked");
if(_9ea!=this.isChecked){
this.setChecked(_9ea,true);
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
var _9eb=this.getProperty("relate");
var _9ec=this.getProperty("oncommand");
if(_9eb){
this.bindingRelate=_9eb;
this.relate();
}
if(_9ec){
this.oncommand=function(){
Binding.evaluate(_9ec,this);
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
var _9ee=this.getCallBackID();
this._buttonBinding.check=function(_9ef){
RadioButtonBinding.prototype.check.call(this,_9ef);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9f0){
RadioButtonBinding.prototype.uncheck.call(this,_9f0);
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
RadioDataBinding.prototype.setChecked=function(_9f1,_9f2){
this._buttonBinding.setChecked(_9f1,_9f2);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9f1);
};
RadioDataBinding.prototype.check=function(_9f3){
this.setChecked(true,_9f3);
};
RadioDataBinding.prototype.uncheck=function(_9f4){
this.setChecked(false,_9f4);
};
RadioDataBinding.prototype.setDisabled=function(_9f5){
if(_9f5!=this.isDisabled){
this.isDisabled=_9f5;
this._buttonBinding.setDisabled(_9f5);
if(_9f5){
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
var _9f7=DOMEvents.getTarget(e);
switch(_9f7){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9f8=this.getProperty("label");
if(_9f8){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9f8)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9f9){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9f9;
}
this.setProperty("label",_9f9);
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
var _9fd=DOMEvents.getTarget(e);
switch(_9fd){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9fe,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9fe,arg);
switch(_9fe){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_a01){
_a01.consume();
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
var _a03=this.getCallBackID();
this._buttonBinding.check=function(_a04){
ButtonBinding.prototype.check.call(this,_a04);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a04){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a05){
ButtonBinding.prototype.uncheck.call(this,_a05);
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
if(_a03!=null){
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
var _a06=true;
var _a07=this.bindingElement.parentNode;
if(_a07){
var _a08=UserInterface.getBinding(_a07);
if(_a08&&_a08 instanceof CheckBoxGroupBinding){
if(_a08.isRequired){
if(_a08.isValid){
_a06=_a08.validate();
}else{
_a06=false;
}
}
}
}
return _a06;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a09=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a09.type="hidden";
_a09.name=this._name;
_a09.style.display="none";
this.bindingElement.appendChild(_a09);
this.shadowTree.input=_a09;
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
var _a0a=null;
var _a0b=this.getProperty("value");
if(this.isChecked){
_a0a=_a0b?_a0b:"on";
}
return _a0a;
};
CheckBoxBinding.prototype.setValue=function(_a0c){
if(_a0c==this.getValue()||_a0c=="on"){
this.check(true);
}else{
if(_a0c!="on"){
this.setPropety("value",_a0c);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a0d=false;
if(this.isChecked){
_a0d=this._result!=null?this._result:true;
}
return _a0d;
};
CheckBoxBinding.prototype.setResult=function(_a0e){
if(typeof _a0e=="boolean"){
this.setChecked(_a0e,true);
}else{
this._result=_a0e;
}
};
CheckBoxBinding.newInstance=function(_a0f){
var _a10=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a0f);
return UserInterface.registerBinding(_a10,CheckBoxBinding);
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
var _a11=true;
if(this.isRequired){
var _a12=this.getDescendantBindingsByLocalName("checkbox");
if(_a12.hasEntries()){
_a11=false;
while(_a12.hasNext()&&!_a11){
if(_a12.getNext().isChecked){
_a11=true;
}
}
}
if(_a11==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a11;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a13){
if(_a13){
if(!this._labelBinding){
var _a14=LabelBinding.newInstance(this.bindingDocument);
_a14.attachClassName("invalid");
_a14.setImage("${icon:error}");
_a14.setLabel("Selection required");
this._labelBinding=this.addFirst(_a14);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a15){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a15);
switch(_a15.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a16){
var _a17=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a16);
return UserInterface.registerBinding(_a17,CheckBoxGroupBinding);
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
var _a18=DialogControlBinding.newInstance(this.bindingDocument);
_a18.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a18);
this._controlGroupBinding.attachRecursive();
var _a19=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a19);
var _a1a=this.getLabel();
if(_a1a!=null){
this.setLabel(_a1a);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a1b=this._snapTargetBinding;
if(Binding.exists(_a1b)==true){
_a1b.removeActionListener(Binding.ACTION_BLURRED,this);
_a1b.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a1c){
if(Interfaces.isImplemented(IData,_a1c)){
this._snapTargetBinding=_a1c;
var _a1d=_a1c.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a1d&&_a1d.isConsumed){
this._environmentBinding=_a1d.listener;
}
if(this._environmentBinding){
_a1c.addActionListener(Binding.ACTION_BLURRED,this);
_a1c.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a1c)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a1c.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a1f=this._snapTargetBinding;
var _a20=this._environmentBinding;
var root=UserInterface.getBinding(_a1f.bindingDocument.body);
if(Binding.exists(_a1f)&&Binding.exists(_a20)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a1f.isAttached&&_a20.isAttached){
var _a22=_a1f.boxObject.getUniversalPosition();
var _a23=_a20.boxObject.getUniversalPosition();
_a23.y+=_a20.bindingElement.scrollTop;
_a23.x+=_a20.bindingElement.scrollLeft;
var tDim=_a1f.boxObject.getDimension();
var eDim=_a20.boxObject.getDimension();
var _a26=false;
if(_a22.y+tDim.h<_a23.y){
_a26=true;
}else{
if(_a22.x+tDim.w<_a23.x){
_a26=true;
}else{
if(_a22.y>_a23.y+eDim.h){
_a26=true;
}else{
if(_a22.x>_a23.x+eDim.w){
_a26=true;
}
}
}
}
if(!_a26){
this._setComputedPosition(_a22,_a23,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a27,_a28,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a2d=_a27;
var _a2e=false;
if(_a27.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a2e=true;
}else{
if(_a27.x+tDim.w>=_a28.x+eDim.w){
_a2e=true;
}
}
if(_a2e){
_a2d.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a2d.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a2d.y-=(bDim.h);
_a2d.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a2d);
};
BalloonBinding.prototype.handleBroadcast=function(_a2f,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a2f,arg);
switch(_a2f){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a31){
var _a32=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a31){
_a32=true;
}
}
return _a32;
};
BalloonBinding.prototype._setPosition=function(_a34){
var _a35=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a35=true;
}
}
if(!_a35){
this.bindingElement.style.left=_a34.x+"px";
this.bindingElement.style.top=_a34.y+"px";
this._point=_a34;
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
BalloonBinding.prototype.handleAction=function(_a37){
BalloonBinding.superclass.handleAction.call(this,_a37);
var _a38=_a37.target;
switch(_a37.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a37.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a38==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a38)){
self.dispose();
}else{
if(_a38.validate()){
var _a3a=true;
if(_a37.type==Binding.ACTION_BLURRED){
var root=_a38.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a3a=false;
}
}
if(_a3a){
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
BalloonBinding.prototype.setLabel=function(_a3d){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a3d);
_a3e.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a3e);
}
this.setProperty("label",_a3d);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a40){
var _a41=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a40);
var _a42=UserInterface.registerBinding(_a41,BalloonBinding);
_a42.hide();
return _a42;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a43,_a44){
if(Interfaces.isImplemented(IData,_a44)==true){
var _a45,_a46=_a44.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a46&&_a46.isConsumed){
switch(_a46.listener.constructor){
case StageBinding:
_a45=false;
break;
case StageDialogBinding:
_a45=true;
break;
}
}
var _a47=_a45?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a48=_a47.add(BalloonBinding.newInstance(top.app.document));
_a48.setLabel(_a43.text);
_a48.snapTo(_a44);
_a48.attach();
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
var _a49=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a4c=_a49.getDataBinding(name);
if(_a4c){
ErrorBinding.presentError({text:text},_a4c);
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
FocusBinding.focusElement=function(_a4d){
var _a4e=true;
try{
_a4d.focus();
Application.focused(true);
}
catch(exception){
var _a4f=UserInterface.getBinding(_a4d);
var _a50=SystemLogger.getLogger("FocusBinding.focusElement");
_a50.warn("Could not focus "+(_a4f?_a4f.toString():String(_a4d)));
_a4e=false;
}
return _a4e;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a51){
var win=_a51.bindingWindow;
var id=_a51.bindingElement.id;
return {getBinding:function(){
var _a54=null;
try{
if(Binding.exists(_a51)){
_a54=win.bindingMap[id];
}
}
catch(exception){
}
return _a54;
}};
};
FocusBinding.navigateNext=function(_a55){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a55);
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
var _a56=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a56&&_a56.isConsumed){
if(_a56.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a57){
FocusBinding.superclass.handleAction.call(this,_a57);
var _a58=_a57.target;
var _a59=null;
if(this._isFocusManager){
switch(_a57.type){
case FocusBinding.ACTION_ATTACHED:
if(_a58!=this){
this._isUpToDate=false;
}
_a57.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a58!=this){
this._isUpToDate=false;
_a57.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a59=new FocusCrawler();
_a59.mode=FocusCrawler.MODE_BLUR;
_a59.crawl(_a58.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a57.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a58!=this){
_a59=new FocusCrawler();
_a59.mode=FocusCrawler.MODE_FOCUS;
_a59.crawl(_a58.bindingElement);
}
_a57.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a58)){
this.claimFocus();
this._onFocusableFocused(_a58);
}
_a57.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a58)){
this._onFocusableBlurred(_a58);
}
_a57.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a5a){
var _a5b=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a5b==null&&list.hasNext()){
var _a5d=list.getNext();
if(this._cachedFocus&&_a5d==this._cachedFocus.getBinding()){
_a5b=_a5d;
}
}
if(_a5b!=null){
if(_a5d.isFocused){
var next=_a5a?list.getPreceding(_a5b):list.getFollowing(_a5b);
if(!next){
next=_a5a?list.getLast():list.getFirst();
}
next.focus();
}else{
_a5b.focus();
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
var _a5f=new FocusCrawler();
var list=new List();
_a5f.mode=FocusCrawler.MODE_INDEX;
_a5f.crawl(this.bindingElement,list);
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
var _a63=this._cachedFocus.getBinding();
if(_a63&&!_a63.isFocused){
_a63.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a64){
if(_a64!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a64;
_a64.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a64);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a65){
_a65.deleteProperty(FocusBinding.MARKER);
if(_a65==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a67){
this.bindingElement.style.left=_a67+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a68){
this.hiddenTabBindings.add(_a68);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a69=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a69.getLabel());
item.setImage(_a69.getImage());
item.associatedTabBinding=_a69;
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
TabsButtonBinding.prototype.handleAction=function(_a6c){
TabsButtonBinding.superclass.handleAction.call(this,_a6c);
switch(_a6c.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a6d=this.selectedTabBinding;
if(_a6d){
this.containingTabBoxBinding.moveToOrdinalPosition(_a6d,0);
this.containingTabBoxBinding.select(_a6d);
}
_a6c.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a6e){
var _a6f=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a6e);
_a6f.setAttribute("type","checkbox");
_a6f.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a6f.className="tabbutton";
return UserInterface.registerBinding(_a6f,TabsButtonBinding);
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
var _a70=TabBoxBinding.currentActiveInstance;
if(_a70!=null&&Binding.exists(_a70)){
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
var _a71=this.getTabElements().getLength();
var _a72=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a71!=_a72){
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
var _a73=this.getTabPanelElements();
while(_a73.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a73.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a74=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a75=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a76=_a74>_a75?"tabsbelow":"tabsontop";
this.attachClassName(_a76);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a78=this.getTabPanelElements();
var _a79=null;
var _a7a=this.getProperty("selectedindex");
if(_a7a!=null){
if(_a7a>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a7b=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a7d=_a78.getNext();
this.registerTabBoxPair(tab,_a7d);
if(_a7a&&_a7b==_a7a){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a79=tab;
}
}
_a7b++;
}
if(!_a79){
_a79=tabs.getFirst();
_a79.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a7e){
var _a7f=null;
var _a80=null;
if(this.isEqualSize){
var _a81=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a83=this.getTabPanelElements();
_a83.each(function(_a84){
max=_a84.offsetHeight>max?_a84.offsetHeight:max;
});
_a80=max+_a81.top+_a81.bottom;
if(_a7e&&this._tabPanelsElement.style.height!=null){
_a7f=this._tabPanelsElement.offsetHeight;
}
if(_a7f!=null||_a80>_a7f){
this._tabPanelsElement.style.height=_a80+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a85){
_a85._invalidCount=0;
_a85.addActionListener(Binding.ACTION_INVALID,this);
_a85.addActionListener(Binding.ACTION_VALID,this);
_a85.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a86){
TabBoxBinding.superclass.handleAction.call(this,_a86);
var _a87=_a86.target;
var _a88=_a86.listener;
switch(_a86.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a87.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a86.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a87.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a88._invalidCount++;
if(_a88._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a88.isSelected){
self._showWarning(_a88,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a88._invalidCount>0){
_a88._invalidCount--;
if(_a88._invalidCount==0){
if(_a88.isSelected){
this._showWarning(_a88,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a88,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a86._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a86._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a8b=DOMEvents.getTarget(e);
if(_a8b==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a8d=this.getTabPanelElements();
tabs.each(function(tab,_a8f){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a90=_a8d.get(_a8f);
this.registerTabBoxPair(tab,_a90);
}
},this);
var _a91=this._tabBoxPairs;
for(var key in _a91){
var tab=_a91[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a8b);
switch(_a8b.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a95=_a8b.parentNode;
if(_a95==this._tabsElement||_a95==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a8b==this._tabsElement||_a8b==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a97){
var _a98=this.getBindingForArgument(arg);
if(_a98!=null&&!_a98.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a98.select(_a97);
this.getTabPanelBinding(_a98).select(_a97);
var _a99=this.getProperty("selectedindex");
if(_a99!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a98.bindingElement,true));
}
this._selectedTabBinding=_a98;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a98.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a9a=this.getTabPanelBinding(_a98);
this._showBalloon(_a9a,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a9c){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a9c.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a9c};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_aa0){
var _aa1=null;
try{
var key=_aa0.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aa3=this._tabBoxPairs[key].tabPanel;
_aa1=UserInterface.getBinding(_aa3);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _aa1;
};
TabBoxBinding.prototype.getTabBinding=function(_aa4){
var key=_aa4.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aa6=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_aa6);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _aa7=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_aa7);
return _aa7;
};
TabBoxBinding.prototype.appendTabByBindings=function(_aa8,_aa9){
var _aaa=_aa8.bindingElement;
_aa8.setProperty("selected",true);
var _aab=this.summonTabPanelBinding();
var _aac=_aab.bindingElement;
if(_aa9){
_aac.appendChild(_aa9 instanceof Binding?_aa9.bindingElement:_aa9);
}
this.registerTabBoxPair(_aaa,_aac);
UserInterface.getBinding(this._tabsElement).add(_aa8);
this._tabPanelsElement.appendChild(_aac);
_aa8.attach();
UserInterface.getBinding(_aac).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _aa8;
};
TabBoxBinding.prototype.importTabBinding=function(_aad){
var that=_aad.containingTabBoxBinding;
var _aaf=that.getTabPanelBinding(_aad);
var _ab0=_aaf.getBindingElement();
var _ab1=_aad.getBindingElement();
that.dismissTabBinding(_aad);
this._tabsElement.appendChild(_ab1);
this._tabPanelsElement.appendChild(_ab0);
this.registerTabBoxPair(_ab1,_ab0);
_aad.containingTabBoxBinding=this;
this.select(_aad);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ab2){
var _ab3=null;
if(_ab2.isSelected){
_ab3=this.getBestTab(_ab2);
this._selectedTabBinding=null;
}
var _ab4=this.getTabPanelBinding(_ab2);
this.unRegisterTabBoxPair(_ab2.bindingElement);
_ab2.dispose();
_ab4.dispose();
if(_ab3!=null){
this.select(_ab3);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_ab5){
if(_ab5.isSelected){
this.selectBestTab(_ab5);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ab6){
var _ab7=this.getBestTab(_ab6);
if(_ab7){
this.select(_ab7);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ab8){
var _ab9=null;
var _aba=_ab8.getOrdinalPosition(true);
var _abb=this.getTabBindings();
var _abc=_abb.getLength();
var _abd=_abc-1;
if(_abc==1){
_ab9=null;
}else{
if(_aba==_abd){
_ab9=_abb.get(_aba-1);
}else{
_ab9=_abb.get(_aba+1);
}
}
return _ab9;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_abe,_abf){
var _ac0=this.bindingDocument.getElementById(_abe.bindingElement.id);
var tab=this.getTabElements().get(_abf);
this._tabsElement.insertBefore(_ac0,tab);
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
var _ac2=this._nodename_tab;
var _ac3=new List(this._tabsElement.childNodes);
var _ac4=new List();
while(_ac3.hasNext()){
var _ac5=_ac3.getNext();
if(_ac5.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ac5)==_ac2){
_ac4.add(_ac5);
}
}
return _ac4;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ac6=this._nodename_tabpanel;
var _ac7=new List(this._tabPanelsElement.childNodes);
var _ac8=new List();
_ac7.each(function(_ac9){
if(_ac9.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ac9)==_ac6){
_ac8.add(_ac9);
}
});
return _ac8;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _aca=new List();
var _acb=this.getTabElements();
_acb.each(function(_acc){
_aca.add(UserInterface.getBinding(_acc));
});
return _aca;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _acd=new List();
this.getTabPanelElements().each(function(_ace){
_acd.add(UserInterface.getBinding(_ace));
});
return _acd;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _acf=null;
if(this._selectedTabBinding){
_acf=this.getTabPanelBinding(this._selectedTabBinding);
}
return _acf;
};
TabBoxBinding.prototype._showWarning=function(_ad0,_ad1){
var _ad2=this.getTabBinding(_ad0);
if(_ad1){
if(_ad2.labelBinding.hasImage){
_ad2._backupImage=_ad2.getImage();
}
_ad2.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ad2._backupImage){
_ad2.setImage(_ad2._backupImage);
}else{
_ad2.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ad3,_ad4){
var _ad5=this.getTabBinding(_ad3);
if((_ad4&&!_ad5.isSelected)||!_ad4){
if(_ad5.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ad4){
if(_ad5.labelBinding.hasImage){
_ad5._backupImage=_ad5.getImage();
}
_ad5.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_ad5._backupImage!=null){
_ad5.setImage(_ad5._backupImage);
}else{
_ad5.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_ad6){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _ad9=tab.getOrdinalPosition(true);
var next=null;
var _adb=new List();
tabs.each(function(t){
if(t.isVisible){
_adb.add(t);
}
});
if(_adb.getLength()>1){
if(_ad9==0&&!_ad6){
next=_adb.getLast();
}else{
if(_ad9==_adb.getLength()-1&&_ad6){
next=_adb.getFirst();
}else{
if(_ad6){
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
var _ade=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_ade.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_adf){
TabsBinding.superclass.handleAction.call(this,_adf);
switch(_adf.type){
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
var _ae2=self.bindingElement.offsetWidth;
if(_ae2!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_ae2;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_ae3){
if(_ae3 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_ae3);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _ae4=false;
var _ae5,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _ae8=this.constructor.TABBUTTON_IMPLEMENTATION;
var _ae9=this.bindingElement.offsetWidth-_ae8.RESERVED_SPACE;
var _aea=null;
var sum=0,_aec=0;
var _aed=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_aed){
tab=tabs.getNext();
_ae5=UserInterface.getBinding(tab);
if(!_aea){
_aea=_ae5;
}
sum+=tab.offsetWidth;
if(sum>=_ae9){
_ae4=true;
if(_ae5.isSelected){
if(!DOMUtil.isFirstElement(_ae5.bindingElement,true)){
this.isManaging=false;
if(_aea){
_aea.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_ae5,_aec-1);
_aed=false;
}
}else{
_ae5.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_ae5);
}
}else{
_ae5.show();
_aea=_ae5;
_aec++;
}
}
if(_aed){
if(_ae4&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _aee=_aea.getBindingElement();
var _aef=_aee.offsetLeft+_aee.offsetWidth;
var _af0=this.tabsButtonBinding;
setTimeout(function(){
_af0.show(_aef+4);
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
var _af1=TabBinding.superclass.serialize.call(this);
if(_af1){
_af1.label=this.getLabel();
_af1.image=this.getImage();
_af1.tooltip=this.getToolTip();
}
return _af1;
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
var _af2=this.bindingElement.getAttribute("image");
var _af3=this.bindingElement.getAttribute("label");
var _af4=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_af3){
this.setLabel(_af3);
}
if(_af2){
this.setImage(_af2);
}
if(_af4){
this.setToolTip(_af4);
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
TabBinding.prototype.setLabel=function(_af6){
if(_af6!=null){
this.setProperty("label",_af6);
if(this.isAttached){
this.labelBinding.setLabel(_af6);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_af7){
if(_af7){
this.setProperty("tooltip",_af7);
if(this.isAttached){
this.labelBinding.setToolTip(_af7);
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
var _af9=false;
if(Client.isMozilla==true){
}
if(!_af9){
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
TabBinding.prototype.select=function(_afa){
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
TabBinding.newInstance=function(_afb){
var _afc=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_afb);
return UserInterface.registerBinding(_afc,TabBinding);
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
var _afd=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_afd=true;
this._lastKnownDimension=dim1;
}
return _afd;
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
TabPanelBinding.prototype.select=function(_b00){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_b00!=true){
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
TabPanelBinding.prototype.handleAction=function(_b01){
TabPanelBinding.superclass.handleAction.call(this,_b01);
var _b02=_b01.target;
switch(_b01.type){
case BalloonBinding.ACTION_INITIALIZE:
_b01.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b03){
var _b04=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b03);
UserInterface.registerBinding(_b04,TabPanelBinding);
return UserInterface.getBinding(_b04);
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
var _b05=SplitBoxBinding.superclass.serialize.call(this);
if(_b05){
_b05.orient=this.getOrient();
_b05.layout=this.getLayout();
}
return _b05;
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
var _b06=this.getSplitPanelElements();
if(_b06.hasEntries()){
var _b07=new List(this.getLayout().split(":"));
if(_b07.getLength()!=_b06.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b06.each(function(_b08){
_b08.setAttribute("ratio",_b07.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b09=this.getProperty("orient");
if(_b09){
this._orient=_b09;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b0a=this.getSplitterBindings();
while(_b0a.hasNext()){
var _b0b=_b0a.getNext();
if(_b0b&&_b0b.getProperty("collapsed")==true){
_b0b.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b0c){
SplitBoxBinding.superclass.handleAction.call(this,_b0c);
switch(_b0c.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b0c.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b0c.target);
_b0c.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b0c.target);
_b0c.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b0d){
this._getSplitPanelBindingForSplitter(_b0d).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b0e){
this._getSplitPanelBindingForSplitter(_b0e).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b0f){
var _b10=DOMUtil.getOrdinalPosition(_b0f.bindingElement,true);
var _b11,_b12=this.getSplitPanelElements();
switch(_b0f.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b11=_b12.get(_b10);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b11=_b12.get(_b10+1);
break;
}
return UserInterface.getBinding(_b11);
};
SplitBoxBinding.prototype.invokeLayout=function(_b13){
var _b14=this.isHorizontalOrient();
var _b15=this.getSplitPanelBindings();
var _b16=this.getSplitterBindings();
var _b17=new List();
var _b18,sum=0;
var _b1a=0;
_b15.each(function(_b1b){
if(_b1b.isFixed==true){
if(!_b15.hasNext()){
_b1a+=_b1b.getFix();
}
_b17.add(0);
sum+=0;
}else{
_b18=_b1b.getRatio();
_b17.add(_b18);
sum+=_b18;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b17.getLength()!=_b15.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b1c=_b14?this.getWidth():this.getHeight();
_b1c-=_b1a;
_b16.each(function(_b1d){
if(_b1d.isVisible){
_b1c-=SplitterBinding.DIMENSION;
}
});
var unit=_b1c/sum;
var _b1f=0;
var self=this;
_b15.each(function(_b21){
var span=0;
var _b23=_b17.getNext();
if(_b21.isFixed){
span=_b21.getFix();
}else{
span=Math.round(unit*_b23);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b1f+=span;
while(_b1f>_b1c){
_b1f--;
span--;
}
if(!_b21.isFixed){
if(_b14){
_b21.setWidth(span);
}else{
_b21.setHeight(span);
}
}
});
}
if(_b13!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b24=this.getLayout();
if(_b24){
this.setProperty("layout",_b24);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b25=this.isHorizontalOrient();
var _b26=this.getSplitPanelBindings();
var _b27=this.getSplitterBindings();
var _b28=null;
var _b29=null;
var unit=null;
var _b2b=null;
var span=null;
_b26.each(function(_b2d){
if(!unit){
unit=_b25?_b2d.getWidth():_b2d.getHeight();
}
span=_b25?_b2d.getWidth():_b2d.getHeight();
if(_b2b){
span-=_b2b;
_b2b=null;
}
_b28=_b27.getNext();
if(_b28&&_b28.offset){
_b2b=_b28.offset;
span+=_b2b;
}
_b2d.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b2e){
this.logger.debug(_b2e);
this.setProperty("layout",_b2e);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b2f="",_b30=this.getSplitPanelBindings();
_b30.each(function(_b31){
_b2f+=_b31.getRatio().toString();
_b2f+=_b30.hasNext()?":":"";
});
this.setProperty("layout",_b2f);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b32=this.getSplitPanelElements();
_b32.each(function(_b33){
layout+="1"+(_b32.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b34){
this.bindingElement.style.width=_b34+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b35){
this.bindingElement.style.height=_b35+"px";
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
SplitBoxBinding.prototype.fit=function(_b36){
if(!this.isFit||_b36){
if(this.isHorizontalOrient()){
var max=0;
var _b38=this.getSplitPanelBindings();
_b38.each(function(_b39){
var _b3a=_b39.bindingElement.offsetHeight;
max=_b3a>max?_b3a:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b3b){
var _b3c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b3b);
return UserInterface.registerBinding(_b3c,SplitBoxBinding);
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
var _b3f=this.getProperty("hidden");
if(_b3f){
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
var _b40=this.getProperty("ratiocache");
if(_b40){
this.setRatio(_b40);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b41){
if(!this.isFixed){
if(_b41!=this.getWidth()){
if(_b41<0){
_b41=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b41+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b41);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b42=null;
if(this.isFixed){
_b42=this.getFix();
}else{
_b42=this.bindingElement.offsetWidth;
}
return _b42;
};
SplitPanelBinding.prototype.setHeight=function(_b43){
if(!this.isFixed){
if(_b43!=this.getHeight()){
try{
this.bindingElement.style.height=_b43+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b44=null;
if(this.isFixed){
_b44=this.getFix();
}else{
_b44=this.bindingElement.offsetHeight;
}
return _b44;
};
SplitPanelBinding.prototype.setRatio=function(_b45){
this.setProperty("ratio",_b45);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b46){
if(_b46){
this._fixedSpan=_b46;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b46);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b46);
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
SplitPanelBinding.newInstance=function(_b47){
var _b48=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b47);
return UserInterface.registerBinding(_b48,SplitPanelBinding);
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
var _b49=SplitBoxBinding.superclass.serialize.call(this);
if(_b49){
_b49.collapse=this.getProperty("collapse");
_b49.collapsed=this.getProperty("collapsed");
_b49.disabled=this.getProperty("isdisabled");
}
return _b49;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b4a=this.getProperty("hidden");
if(_b4a){
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
SplitterBinding.prototype.setCollapseDirection=function(_b4c){
this.setProperty("collapse",_b4c);
this._collapseDirection=_b4c;
};
SplitterBinding.prototype.handleAction=function(_b4d){
SplitterBinding.superclass.handleAction.call(this,_b4d);
switch(_b4d.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b4d.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b4f=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b4f.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b4f.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b50){
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
SplitterBinding.newInstance=function(_b5b){
var _b5c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b5b);
return UserInterface.registerBinding(_b5c,SplitterBinding);
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
var _b5d=this.getProperty("selectedindex");
var _b5e=this.getDeckElements();
if(_b5e.hasEntries()){
var _b5f=false;
var _b60=0;
while(_b5e.hasNext()){
var deck=_b5e.getNext();
if(_b5d&&_b60==_b5d){
deck.setAttribute("selected","true");
_b5f=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b5f=true;
}
}
_b60++;
}
if(!_b5f){
_b5e.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b63=this.getBindingForArgument(arg);
if(_b63!=null){
if(_b63!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b63.select();
this._selectedDeckBinding=_b63;
var _b64=this.getProperty("selectedindex");
if(_b64!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b63.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b65=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b65=true;
this._lastKnownDimension=dim1;
}
return _b65;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b68){
var _b69=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b68);
return UserInterface.registerBinding(_b69,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b6a){
DeckBinding.superclass.handleAction.call(this,_b6a);
var _b6b=_b6a.target;
switch(_b6a.type){
case BalloonBinding.ACTION_INITIALIZE:
_b6a.consume();
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
DeckBinding.newInstance=function(_b6d){
var _b6e=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b6d);
return UserInterface.registerBinding(_b6e,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b6f){
if(_b6f instanceof ToolBarBodyBinding){
if(_b6f.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b6f;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b6f;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b6f);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b70=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b70){
this.setImageSize(_b70);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b72=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b72.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b72.isDefaultContent=true;
this.add(_b72);
_b72.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b74=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b74);
}
if(_b74!=null&&_b74.hasClassName("max")){
this._maxToolBarGroup(_b74,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b76){
var _b77=this.boxObject.getDimension().w;
var _b78=CSSComputer.getPadding(this.bindingElement);
_b77-=(_b78.left+_b78.right);
if(_b76!=null){
_b77-=_b76.boxObject.getDimension().w;
if(!Client.isWindows){
_b77-=1;
}
if(Client.isExplorer){
_b77-=15;
}
}
max.bindingElement.style.width=_b77+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b79){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b79);
};
ToolBarBinding.prototype.addLeft=function(_b7a,_b7b){
var _b7c=null;
if(this._toolBarBodyLeft!=null){
_b7c=this._toolBarBodyLeft.add(_b7a,_b7b);
}else{
throw new Error("No left toolbarbody");
}
return _b7c;
};
ToolBarBinding.prototype.addLeftFirst=function(_b7d,_b7e){
var _b7f=null;
if(this._toolBarBodyLeft){
_b7f=this._toolBarBodyLeft.addFirst(_b7d,_b7e);
}else{
throw new Error("No left toolbarbody");
}
return _b7f;
};
ToolBarBinding.prototype.addRight=function(_b80){
var _b81=null;
if(this._toolBarBodyRight){
_b81=this._toolBarBodyRight.add(_b80);
}else{
throw new Error("No left toolbarbody");
}
return _b81;
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
ToolBarBinding.newInstance=function(_b84){
var _b85=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b84);
return UserInterface.registerBinding(_b85,ToolBarBinding);
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
var _b86=this.getDescendantBindingsByLocalName("toolbargroup");
var _b87=new List();
var _b88=true;
_b86.each(function(_b89){
if(_b89.isVisible&&!_b89.isDefaultContent){
_b87.add(_b89);
}
});
while(_b87.hasNext()){
var _b8a=_b87.getNext();
_b8a.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b88){
_b8a.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b88=false;
}
if(!_b87.hasNext()){
_b8a.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b8d=list.getNext();
var _b8e=_b8d.getEqualSizeWidth();
if(_b8e>max){
max=_b8e;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b8d=list.getNext();
_b8d.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b8f,_b90){
var _b91=ToolBarBinding.superclass.add.call(this,_b8f);
if(!_b90){
if(_b8f instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b91;
};
ToolBarBodyBinding.prototype.addFirst=function(_b92,_b93){
var _b94=ToolBarBinding.superclass.addFirst.call(this,_b92);
if(!_b93){
if(_b92 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b94;
};
ToolBarBodyBinding.newInstance=function(_b95){
var _b96=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b95);
return UserInterface.registerBinding(_b96,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b97){
switch(_b97){
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
var _b98=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b98)=="toolbarbody"){
UserInterface.getBinding(_b98).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b99=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b99)=="toolbarbody"){
UserInterface.getBinding(_b99).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b9a){
var _b9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b9a);
return UserInterface.registerBinding(_b9b,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b9c){
var _b9d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b9c);
return UserInterface.registerBinding(_b9d,ToolBarButtonBinding);
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
var _b9e=this.getProperty("label");
var _b9f=this.getProperty("image");
if(_b9e){
this.setLabel(_b9e);
}
if(_b9f){
this.setImage(_b9f);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_ba0,_ba1){
if(this.isAttached){
this._labelBinding.setLabel(_ba0,_ba1);
}
this.setProperty("label",_ba0);
};
ToolBarLabelBinding.prototype.setImage=function(_ba2,_ba3){
if(this.isAttached){
this._labelBinding.setImage(_ba2,_ba3);
}
this.setProperty("image",_ba2);
};
ToolBarLabelBinding.newInstance=function(_ba4){
var _ba5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_ba4);
return UserInterface.registerBinding(_ba5,ToolBarLabelBinding);
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
var _ba6=this.getDescendantBindingsByLocalName("clickbutton");
if(_ba6.hasEntries()){
while(_ba6.hasNext()){
var _ba7=_ba6.getNext();
if(_ba7.isDefault){
this._defaultButton=_ba7;
_ba7.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_ba7.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_ba6;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_ba8,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_ba8,arg);
switch(_ba8){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _baa=this.getAncestorBindingByType(DialogBinding,true);
if(_baa!=null&&_baa.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_bab){
DialogToolBarBinding.superclass.handleAction.call(this,_bab);
var _bac=_bab.target;
var _bad=false;
var _bae=this._buttons.reset();
if(_bac instanceof ClickButtonBinding){
switch(_bab.type){
case Binding.ACTION_FOCUSED:
_bac.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_bac;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_bac.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bad&&_bae.hasNext()){
var _baf=_bae.getNext();
_bad=_baf.isFocused;
}
if(!_bad){
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
ComboBoxBinding.newInstance=function(_bb1){
var _bb2=DOMUtil.createElementNS(Constants.NS_UI,"ui:combobox",_bb1);
return UserInterface.registerBinding(_bb2,ComboBoxBinding);
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
ToolBarComboButtonBinding.prototype.handleBroadcast=function(_bb3,arg){
ToolBarComboButtonBinding.superclass.handleBroadcast.call(this,_bb3,arg);
};
ToolBarComboButtonBinding.prototype.setPopup=function(arg){
ToolBarComboButtonBinding.superclass.setPopup.call(this,arg);
var self=this;
var _bb7=this.popupBinding.getDescendantBindingsByType(MenuItemBinding);
_bb7.each(function(_bb8){
var _bb9=_bb8.getProperty("oncommand");
_bb8.setProperty("hiddencommand",_bb9);
_bb8.deleteProperty("oncommand");
_bb8.oncommand=function(){
self.setAndFireButton(this);
};
});
var _bba=null;
var _bbb=this.getActiveMenuItemId();
_bb7.reset();
while(_bb7.hasNext()){
var _bbc=_bb7.getNext();
if(_bbc.getProperty("id")==_bbb){
_bba=_bbc;
break;
}
}
if(_bba==null&&_bb7.hasEntries()){
_bba=_bb7.getFirst();
}
if(_bba!=null){
this.setButton(_bba);
}
};
ToolBarComboButtonBinding.prototype.setButton=function(_bbd){
if(_bbd instanceof MenuItemBinding){
var _bbe=_bbd.getProperty("label");
var _bbf=_bbd.getProperty("image");
var _bc0=_bbd.getProperty("image-hover");
var _bc1=_bbd.getProperty("image-active");
var _bc2=_bbd.getProperty("image-disabled");
var _bc3=_bbd.getProperty("hiddencommand");
this.setLabel(_bbe?_bbe:"");
this.image=_bbf;
this.imageHover=_bbf;
this.imageActive=_bc1;
this.imageDisabled=_bc2;
this.imageProfile=new ImageProfile(this);
this._stateManager.imageProfile=this.imageProfile;
this.setImage(this.imageProfile.getDefaultImage());
this.oncommand=function(){
Binding.evaluate(_bc3,this);
};
this.hideActiveItem(_bbd);
}
};
ToolBarComboButtonBinding.prototype.setAndFireButton=function(_bc4){
if(_bc4 instanceof MenuItemBinding){
this.setButton(_bc4);
this.setActiveMenuItemId(_bc4.getProperty("id"));
this.fireCommand();
}
};
ToolBarComboButtonBinding.prototype.hideActiveItem=function(_bc5){
this.popupBinding.getDescendantBindingsByType(MenuItemBinding).each(function(_bc6){
if(_bc6==_bc5){
Binding.prototype.hide.call(_bc6);
}else{
Binding.prototype.show.call(_bc6);
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
var _bc8=this._views;
for(var _bc9 in ViewDefinitions){
var def=ViewDefinitions[_bc9];
var key=def.perspective;
if(key!=null){
if(!_bc8.has(key)){
_bc8.set(key,new List());
}
var list=_bc8.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bcd,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bcd,arg);
switch(_bcd){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bd0=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bd0.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bd0.add(StageViewMenuItemBinding.newInstance(_bd0.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bd0.show();
}else{
_bd0.hide();
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
TreeBinding.grid=function(_bd4){
var _bd5=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bd4);
var _bd7=_bd4%_bd5;
if(_bd7>0){
_bd4=_bd4-_bd7+_bd5;
}
return _bd4+TreeBodyBinding.PADDING_TOP;
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
var _bd8=this.getProperty("focusable");
if(_bd8!=null){
this._isFocusable=_bd8;
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
var _bda=this.getProperty("builder");
if(_bda){
this._buildFromTextArea(_bda);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bdb=this.getProperty("selectable");
var _bdc=this.getProperty("selectionproperty");
var _bdd=this.getProperty("selectionvalue");
if(_bdb){
this.setSelectable(true);
if(_bdc){
this.setSelectionProperty(_bdc);
}
if(_bdd){
this.setSelectionValue(_bdd);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _be0=UserInterface.getBinding(area);
var _be1=this._treeBodyBinding;
function build(){
_be1.subTreeFromString(area.value);
}
_be0.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_be2){
var _be3=_be2.getHandle();
if(this._treeNodeBindings.has(_be3)){
throw "Duplicate treenodehandles registered: "+_be2.getLabel();
}else{
this._treeNodeBindings.set(_be3,_be2);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_be3)){
_be2.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_be5){
this._treeNodeBindings.del(_be5.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_be6){
var _be7=null;
if(this._treeNodeBindings.has(_be6)){
_be7=this._treeNodeBindings.get(_be6);
}else{
throw "No such treenode: "+_be6;
}
return _be7;
};
TreeBinding.prototype.handleAction=function(_be8){
TreeBinding.superclass.handleAction.call(this,_be8);
var _be9=_be8.target;
switch(_be8.type){
case TreeNodeBinding.ACTION_OPEN:
_be8.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_be9);
_be8.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_be9;
this.focusSingleTreeNodeBinding(_be9);
if(!this.isFocused){
this.focus();
}
_be8.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_be9;
this.focusSingleTreeNodeBinding(_be9);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_be9;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_be9;
this.focusSingleTreeNodeBinding(_be9);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_be8.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_be9.isFocused){
this.blurSelectedTreeNodes();
}
_be8.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bea,_beb){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bec){
if(_bec!=null&&!_bec.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bec);
_bec.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_bed){
this.blurSelectedTreeNodes();
while(_bed.hasNext()){
var _bee=_bed.getNext();
this._focusedTreeNodeBindings.add(_bee);
_bee.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _bef=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _bf0=false;
var _bf1=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _bf2=this._focusedTreeNodeBindings.getNext();
var _bf3=_bf2.getProperty(this._selectionProperty);
if(_bf3!=null){
if(!this._selectionValue||this._selectionValue[_bf3]){
_bf1=(this._selectedTreeNodeBindings[_bf2.key]=_bf2);
var _bf4=_bef[_bf2.key];
if(!_bf4||_bf4!=_bf1){
_bf0=true;
}
}
}
}
if(_bf1){
if(_bf0){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_bef){
for(var key in _bef){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _bf6=new List();
for(var key in this._selectedTreeNodeBindings){
_bf6.add(this._selectedTreeNodeBindings[key]);
}
return _bf6;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_bf8){
_bf8.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_bf9){
var _bfa=_bf9.getDescendantBindingsByLocalName("treenode");
var _bfb=true;
var self=this;
_bfa.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _bfb;
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
var _bfe=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_bfe!=null){
this.focusSingleTreeNodeBinding(_bfe);
_bfe.callback();
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
TreeBinding.prototype.add=function(_bff){
var _c00=null;
if(this._treeBodyBinding){
_c00=this._treeBodyBinding.add(_bff);
}else{
this._treeNodeBuffer.add(_bff);
_c00=_bff;
}
return _c00;
};
TreeBinding.prototype.addFirst=function(_c01){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _c02=this._treeBodyBinding.bindingElement;
_c02.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_c03,_c04){
if(_c04.isContainer&&_c04.isOpen){
_c04.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_c05){
this._isSelectable=_c05;
if(_c05){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_c06){
this._selectionProperty=_c06;
};
TreeBinding.prototype.setSelectionValue=function(_c07){
if(_c07){
var list=new List(_c07.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_c09,arg){
TreeBinding.superclass.handleBroadcast.call(this,_c09,arg);
switch(_c09){
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
var _c0b=this.getFocusedTreeNodeBindings();
if(_c0b.hasEntries()){
var node=_c0b.getFirst();
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
var _c0e=this.getFocusedTreeNodeBindings();
if(_c0e.hasEntries()){
var node=_c0e.getFirst();
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
var _c11=null;
while(next==null&&(_c11=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_c11!=null){
next=_c11.getNextBindingByLocalName("treenode");
}
node=_c11;
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
var _c13=DOMEvents.getTarget(e);
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
var _c14=new TreeCrawler();
var list=new List();
_c14.mode=TreeCrawler.MODE_GETOPEN;
_c14.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _c17=list.getNext();
map.set(_c17.getHandle(),true);
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
var _c1c=this._positionIndicatorBinding;
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
if(y!=_c1c.getPosition().y){
_c1c.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c1c.isVisible){
_c1c.show();
}
}else{
if(_c1c.isVisible){
_c1c.hide();
}
}
}else{
if(_c1c.isVisible){
_c1c.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c1f){
this._acceptingTreeNodeBinding=_c1f;
this._acceptingPosition=_c1f.boxObject.getLocalPosition();
this._acceptingDimension=_c1f.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c1f);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c20){
var map={};
var _c22=_c20.getChildBindingsByLocalName("treenode");
var _c23,pos,dim,y;
y=TreeBinding.grid(_c20.boxObject.getLocalPosition().y);
map[y]=true;
while(_c22.hasNext()){
_c23=_c22.getNext();
pos=_c23.boxObject.getLocalPosition();
dim=_c23.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c29 in this._acceptingPositions){
if(_c29==y){
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
TreeBinding.newInstance=function(_c2a){
var _c2b=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c2a);
var _c2c=UserInterface.registerBinding(_c2b,TreeBinding);
_c2c.treeBodyBinding=TreeBodyBinding.newInstance(_c2a);
return _c2c;
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
TreeBodyBinding.prototype.accept=function(_c2d){
if(_c2d instanceof TreeNodeBinding){
this.logger.debug(_c2d);
}
};
TreeBodyBinding.prototype.handleAction=function(_c2e){
TreeBodyBinding.superclass.handleAction.call(this,_c2e);
switch(_c2e.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c2e.target);
_c2e.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c2f){
var a=this.boxObject.getDimension().h;
var y=_c2f.boxObject.getLocalPosition().y;
var h=_c2f.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c35=_c2f.labelBinding.bindingElement;
if(y-t<0){
_c35.scrollIntoView(true);
}else{
if(y-t+h>a){
_c35.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c36){
var _c37=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c36);
return UserInterface.registerBinding(_c37,TreeBodyBinding);
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
var _c38=TreeNodeBinding.superclass.serialize.call(this);
if(_c38){
_c38.label=this.getLabel();
_c38.image=this.getImage();
var _c39=this.getHandle();
if(_c39&&_c39!=this.key){
_c38.handle=_c39;
}
if(this.isOpen){
_c38.open=true;
}
if(this.isDisabled){
_c38.disabled=true;
}
if(this.dragType){
_c38.dragtype=this.dragType;
}
if(this.dragAccept){
_c38.dragaccept=this.dragAccept;
}
}
return _c38;
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
var _c3b=UserInterface.getBinding(node);
if(_c3b&&_c3b.containingTreeBinding){
this.containingTreeBinding=_c3b.containingTreeBinding;
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
var _c3c=this.key;
var _c3d=this.getProperty("handle");
if(_c3d){
_c3c=_c3d;
}
return _c3c;
};
TreeNodeBinding.prototype.setHandle=function(_c3e){
this.setProperty("handle",_c3e);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c40=this.getProperty("label");
var _c41=this.getProperty("tooltip");
var _c42=this.getProperty("oncommand");
var _c43=this.getProperty("onbindingfocus");
var _c44=this.getProperty("onbindingblur");
var _c45=this.getProperty("focused");
var _c46=this.getProperty("callbackid");
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
if(_c40!=null){
this.setLabel(_c40);
}
if(_c41!=null){
this.setToolTip(_c41);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c48=this.bindingWindow.WindowManager;
if(_c42!=null){
this.oncommand=function(){
Binding.evaluate(_c42,this);
};
}
if(_c43!=null){
this.onfocus=function(){
Binding.evaluate(_c43,this);
};
}
if(_c44!=null){
this.onblur=function(){
Binding.evaluate(_c44,this);
};
}
if(_c45==true){
this.focus();
}
if(_c46!=null){
Binding.dotnetify(this,_c46);
}
};
TreeNodeBinding.prototype.handleAction=function(_c49){
TreeNodeBinding.superclass.handleAction.call(this,_c49);
switch(_c49.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c49.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c4a,_c4b){
var _c4c=true;
if(_c4a instanceof TreeNodeBinding){
var _c4d=false;
var _c4e=this.bindingElement;
var _c4f=this.containingTreeBinding.bindingElement;
while(!_c4d&&_c4e!=_c4f){
if(_c4e==_c4a.getBindingElement()){
_c4d=true;
}else{
_c4e=_c4e.parentNode;
}
}
if(_c4d){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c4c=false;
}else{
this.acceptTreeNodeBinding(_c4a,_c4b);
}
}else{
_c4c=false;
}
return _c4c;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c50,_c51){
var _c52=_c50.serializeToString();
var _c53=new BindingParser(this.bindingDocument);
var _c54=_c53.parseFromString(_c52).getFirst();
_c51=_c51?_c51:this.containingTreeBinding.getDropIndex();
var _c55=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c54,_c55.get(_c51));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c50.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c56=this.getProperty("image");
var _c57=this.getProperty("image-active");
var _c58=this.getProperty("image-disabled");
_c57=_c57?_c57:this.isContainer?_c56?_c56:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c56?_c56:TreeNodeBinding.DEFAULT_ITEM;
_c58=_c58?_c58:this.isContainer?_c56?_c56:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c56?_c56:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c56=_c56?_c56:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c56,imageHover:null,imageActive:_c57,imageDisabled:_c58});
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
TreeNodeBinding.prototype.setLabel=function(_c5a){
this.setProperty("label",String(_c5a));
if(this.isAttached){
this.labelBinding.setLabel(String(_c5a));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c5b){
this.setProperty("tooltip",String(_c5b));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c5b));
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
var _c5c=this.imageProfile.getDefaultImage();
var _c5d=this.imageProfile.getActiveImage();
_c5d=_c5d?_c5d:_c5c;
return this.isOpen?_c5d:_c5c;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c5f=DOMEvents.getTarget(e);
var _c60=this.labelBinding.bindingElement;
var _c61=this.labelBinding.shadowTree.labelBody;
var _c62=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c5f){
case _c60:
this._onAction(e);
break;
case _c61:
case _c62:
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
if(_c5f.parentNode==this.bindingElement&&_c5f.__updateType==Update.TYPE_INSERT){
var _c60=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c5f)=="treenode"){
if(_c5f==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c5f,_c60.nextSibling);
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
switch(_c5f){
case _c60:
case _c61:
case _c62:
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
var _c66=true;
if(e.type=="mousedown"){
var _c67=e.button==(e.target?0:1);
if(!_c67){
_c66=false;
}
}
if(_c66){
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
var _c69=false;
if(e!=null){
_c69=e.shiftKey;
}
this.dispatchAction(_c69?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c6c=this.getDescendantBindingsByLocalName("treenode");
_c6c.each(function(_c6d){
_c6d.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c6e){
var _c6f=_c6e.getAttribute("focused");
if(_c6f=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c70){
var _c71=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c70);
return UserInterface.registerBinding(_c71,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c72){
var _c73=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c72);
return UserInterface.registerBinding(_c73,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c74){
this.bindingElement.style.left=_c74.x+"px";
this.bindingElement.style.top=_c74.y+"px";
this._geometry.x=_c74.x;
this._geometry.y=_c74.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c75){
var _c76=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c75);
return UserInterface.registerBinding(_c76,TreePositionIndicatorBinding);
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
this.addFilter(function(_c78){
var _c79=UserInterface.getBinding(_c78);
var _c7a=null;
var _c7a=null;
if(!_c79 instanceof TreeNodeBinding){
_c7a=NodeCrawler.SKIP_NODE;
}
return _c7a;
});
this.addFilter(function(_c7b,list){
var _c7d=UserInterface.getBinding(_c7b);
var _c7e=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c7d.isOpen){
list.add(_c7d);
}
break;
}
return _c7e;
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
ShadowBinding.prototype.shadow=function(_c7f){
this.targetBinding=_c7f;
_c7f.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c7f.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c7f.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c7f.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c7f.isVisible){
this.show();
this.setPosition(_c7f.getPosition());
this.setDimension(_c7f.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c80){
ShadowBinding.superclass.handleAction.call(this,_c80);
var _c81=_c80.target;
if(_c81==this.targetBinding){
switch(_c80.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c80.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c81.isVisible){
this.show();
this.setPosition(_c81.getPosition());
this.setDimension(_c81.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c82){
var _c83=this.offset-this.expand;
this.bindingElement.style.left=new String(_c82.x+_c83)+"px";
this.bindingElement.style.top=new String(_c82.y+_c83)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c85){
var _c86=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c85);
return UserInterface.registerBinding(_c86,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c87){
this.binding=_c87;
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
DockTabsButtonBinding.newInstance=function(_c88){
var _c89=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c88);
_c89.setAttribute("type","checkbox");
_c89.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c89.className="tabbutton";
return UserInterface.registerBinding(_c89,DockTabsButtonBinding);
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
var _c8a=DockBinding.superclass.serialize.call(this);
if(_c8a){
_c8a.active=this.isActive?true:null;
_c8a.collapsed=this.isCollapsed?true:null;
}
return _c8a;
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
var _c8b=UserInterface.getBinding(this.bindingElement.parentNode);
var _c8c=MatrixBinding.newInstance(this.bindingDocument);
_c8c.attachClassName("dockliner");
this.shadowTree.dockLiner=_c8c;
_c8b.add(_c8c);
_c8c.attach();
_c8c.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c8e){
var _c8f=this.getSelectedTabPanelBinding();
if(_c8f){
_c8f.isVisible=_c8e;
_c8f.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c90){
var _c91=this._getBindingForDefinition(_c90);
var _c92=DockTabBinding.newInstance(this.bindingDocument);
_c92.setHandle(_c90.handle);
_c92.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c90.label);
_c92.setImage(_c90.image);
_c92.setToolTip(_c90.toolTip);
_c92.setEntityToken(_c90.entityToken);
_c92.setAssociatedView(_c91);
this.appendTabByBindings(_c92,null);
this._setupPageBindingListeners(_c92);
var _c93=this.getTabPanelBinding(_c92);
_c91.snapToBinding(_c93);
var _c94=this.bindingWindow.bindingMap.views;
_c94.add(_c91);
if(!this.isActive){
this.activate();
}
_c91.attach();
};
DockBinding.prototype.prepareOpenView=function(_c95,_c96){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c96.setLabel(_c95.label);
_c96.setImage(_c95.image);
_c96.setToolTip(_c95.toolTip);
this._setupPageBindingListeners(_c96);
var _c97=this.getTabPanelBinding(_c96);
var _c98=this._getBindingForDefinition(_c95);
_c96.setAssociatedView(_c98);
_c98.snapToBinding(_c97);
UserInterface.getBinding(this.bindingDocument.body).add(_c98);
_c98.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c99){
var _c9a=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c9a.bindingDocument);
view.setDefinition(_c99);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c9c){
var _c9d=this.getTabPanelBinding(_c9c);
var self=this;
var _c9f={handleAction:function(_ca0){
var _ca1=_ca0.target;
switch(_ca0.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_ca1.reflex(true);
var view=_c9c.getAssociatedView();
if(_ca1.bindingWindow==view.getContentWindow()){
_c9c.updateDisplay(_ca1);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c9c.onPageInitialize(_ca1);
_ca0.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c9c.updateDisplay(_ca1);
_ca0.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c9c.updateEntityToken(_ca1);
_ca0.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c9c.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
case EditorPageBinding.ACTION_SAVE_AND_PUBLISH:
_c9c.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c9c);
_ca0.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c9c,true);
_ca0.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c9c);
break;
case Binding.ACTION_FORCE_REFLEX:
_c9d.reflex(true);
_ca0.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c9c.isDirty){
_c9c.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,EditorPageBinding.ACTION_SAVE_AND_PUBLISH,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_ca3){
_c9d.addActionListener(_ca3,_c9f);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_ca4){
DockBinding.superclass.handleAction.call(this,_ca4);
var _ca5=_ca4.target;
switch(_ca4.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_ca4.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_ca5 instanceof DockBinding){
if(_ca5.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_ca5);
if(this.isActive){
_ca5.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_ca5);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_ca6,arg){
DockBinding.superclass.handleBroadcast.call(this,_ca6,arg);
switch(_ca6){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _ca8=arg;
if(_ca8.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_ca8.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_ca9){
var tabs=this.getTabBindings();
var _cab=false;
while(tabs.hasNext()&&!_cab){
var tab=tabs.getNext();
var _cad=tab.getEntityToken();
if(_cad!=null&&_cad==_ca9){
if(!tab.isSelected){
this.select(tab,true);
_cab=true;
}
}
}
};
DockBinding.prototype.collapse=function(_cae){
this._handleCollapse(true,_cae);
};
DockBinding.prototype.unCollapse=function(_caf){
this._handleCollapse(false,_caf);
};
DockBinding.prototype._handleCollapse=function(_cb0,_cb1){
var _cb2=this.getChildBindingByLocalName("dockpanels");
var _cb3=this.getAncestorBindingByLocalName("splitbox");
if(_cb0){
_cb2.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_cb1&&_cb3.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_cb2.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_cb1){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_cb0);
this.isCollapsed=_cb0;
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
DockBinding.prototype.closeTab=function(_cb8,_cb9){
if(_cb8.isDirty&&!_cb9){
var _cba=Resolver.resolve(_cb8.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_cba),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_cbc){
switch(_cbc){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_cb8);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_cb8);
break;
}
}});
}else{
this.removeTab(_cb8);
}
};
DockBinding.prototype.closeTabsExcept=function(_cbd){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_cbd){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_cc0){
var _cc1=_cc0.getAssociatedView();
_cc1.saveContainedEditor();
var self=this;
var _cc3={handleBroadcast:function(_cc4,arg){
switch(_cc4){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_cc1.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_cc3);
if(arg.isSuccess){
self.removeTab(_cc0);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_cc3);
};
DockBinding.prototype.appendTabByBindings=function(_cc6,_cc7){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cc6,_cc7);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cc8){
_cc8=_cc8?_cc8+"px":"100%";
this.bindingElement.style.width=_cc8;
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
DockBinding.prototype.showControls=function(_cc9){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_cc9){
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
var _ccc=DockControlBinding.newInstance(this.bindingDocument);
_ccc.setControlType(type);
return _ccc;
};
DockTabsBinding.prototype.flex=function(){
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
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_ccf){
DockTabsBinding.superclass.handleCrawler.call(this,_ccf);
switch(_ccf.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cd1=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cd1)){
_cd1=_cd1>0?_cd1-1:0;
self.bindingElement.style.width=new String(_cd1)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cd2){
var _cd3=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cd2);
return UserInterface.registerBinding(_cd3,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cd4){
this._viewBinding=_cd4;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cd5=DockTabBinding.superclass.serialize.call(this);
if(_cd5){
_cd5.label=null;
_cd5.image=null;
_cd5.handle=this.getHandle();
}
return _cd5;
};
DockTabBinding.prototype.setHandle=function(_cd6){
this.setProperty("handle",_cd6);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cd7){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cd7;
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
var _cd8=DialogControlBinding.newInstance(this.bindingDocument);
_cd8.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cd8);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cd9){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cd9){
this.isDirty=_cd9;
if(Binding.exists(this.labelBinding)){
var _cda=this.labelBinding.getLabel();
if(_cda!=null){
this.labelBinding.setLabel(_cd9?"*"+_cda:_cda.slice(1,_cda.length));
}else{
this.labelBinding.setLabel(_cd9?"*":"");
}
}
}
var _cdb=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cdb.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cdb.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cdc){
this.setLabel(_cdc.getLabel());
this.setImage(_cdc.getImage());
this.setToolTip(_cdc.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cdd){
this.setEntityToken(_cdd.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cde){
DockTabBinding.superclass.handleAction.call(this,_cde);
var _cdf=_cde.target;
switch(_cde.type){
case ControlBinding.ACTION_COMMAND:
if(_cdf.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cde.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cdf);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_ce0){
var cmd=_ce0.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_ce2){
if(!_ce2){
if(!this.getLabel()){
_ce2=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_ce2=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
if(this.isDirty){
_ce2="*"+_ce2;
}
DockTabBinding.superclass.setLabel.call(this,_ce2);
};
DockTabBinding.prototype.setImage=function(_ce3){
if(!_ce3){
if(!this.getImage()){
_ce3=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_ce3=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_ce3);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _ce6=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_ce6;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_ce6;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_ce6;
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
var _ce8=this.bindingElement;
setTimeout(function(){
_ce8.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_ce9,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_ce9,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_ce9){
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
DockTabBinding.prototype.select=function(_cee){
DockTabBinding.superclass.select.call(this,_cee);
this._updateBroadcasters();
if(_cee!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cef=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cf0=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cf0.enable();
if(this.isDirty){
_cef.enable();
}else{
_cef.disable();
}
}else{
_cf0.disable();
_cef.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cf1){
if(this._canUpdateTree||_cf1){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cf2=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cf4=win.bindingMap.savebutton;
if(_cf4!=null){
_cf2=true;
}
}
}
return _cf2;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cf5){
var _cf6=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cf5);
return UserInterface.registerBinding(_cf6,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_cf7){
var _cf8=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_cf7);
return UserInterface.registerBinding(_cf8,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_cf9){
DockPanelBinding.superclass.select.call(this,_cf9);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_cfa){
DockPanelBinding.superclass.handleCrawler.call(this,_cfa);
if(_cfa.response==null){
if(_cfa.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_cfa.id==FocusCrawler.ID){
_cfa.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_cfb){
var _cfc=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_cfb);
return UserInterface.registerBinding(_cfc,DockPanelBinding);
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
DockControlBinding.newInstance=function(_cfd){
var _cfe=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cfd);
return UserInterface.registerBinding(_cfe,DockControlBinding);
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
ViewBinding.getInstance=function(_cff){
var _d00=ViewBinding._instances.get(_cff);
if(!_d00){
var cry="ViewBinding.getInstance: No such instance: "+_cff;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _d00;
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
var _d03=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_d03){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _d04=snap.boxObject.getGlobalPosition();
var _d05=snap.boxObject.getDimension();
if(!Point.isEqual(_d04,this._lastknownposition)){
this.setPosition(_d04);
this._lastknownposition=_d04;
}
if(!Dimension.isEqual(_d05,this._lastknowndimension)){
this.setDimension(_d05);
this._lastknowndimension=_d05;
var _d06=_d05.h-ViewBinding.VERTICAL_ADJUST;
_d06=_d06<0?0:_d06;
this.windowBinding.getBindingElement().style.height=new String(_d06)+"px";
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
var _d07=this._viewDefinition.flowHandle;
if(_d07!=null){
FlowControllerService.CancelFlow(_d07);
}
}
if(this._viewDefinition!=null){
var _d08=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_d08);
this.logger.fine("ViewBinding closed: \""+_d08+"\"");
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
var _d0a=null;
if(this._viewDefinition!=null){
_d0a=this._viewDefinition.handle;
}
return _d0a;
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
ViewBinding.prototype.setDefinition=function(_d0b){
this._viewDefinition=_d0b;
if(_d0b.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_d0c){
ViewBinding.superclass.handleAction.call(this,_d0c);
var _d0d=_d0c.target;
switch(_d0c.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_d0c.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_d0d.isActivated){
_d0d.onActivate();
}
}
_d0c.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_d0d==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_d0c.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_d0d==this._snapBinding){
if(_d0d.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_d0d.getContentWindow().isPostBackDocument){
if(_d0c.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_d0d.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_d0d==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_d0d.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_d0c.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_d0c.type==WindowBinding.ACTION_ONLOAD){
var win=_d0d.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_d0d);
}
}
}
_d0c.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_d0d.label&&this._viewDefinition.label){
_d0d.label=this._viewDefinition.label;
}
if(!_d0d.image&&this._viewDefinition.image){
_d0d.image=this._viewDefinition.image;
}
if(_d0d.bindingWindow==this.getContentWindow()){
this._pageBinding=_d0d;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_d0d.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_d0d==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_d0c.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_d0c.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_d12,arg){
ViewBinding.superclass.handleBroadcast.call(this,_d12,arg);
switch(_d12){
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
var _d16=def.argument;
if(_d16!=null){
page.setPageArgument(_d16);
}
var _d17=def.width;
if(_d17!=null){
page.width=_d17;
}
var _d18=def.height;
if(_d18!=null){
page.height=_d18;
}
}
};
ViewBinding.prototype.handleCrawler=function(_d19){
ViewBinding.superclass.handleCrawler.call(this,_d19);
switch(_d19.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_d19.id==FocusCrawler.ID){
if(_d19.previousNode!=this._snapBinding.bindingElement){
_d19.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_d19.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d1a){
_d1a.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d1a.x+"px";
this.bindingElement.style.top=_d1a.y+"px";
};
ViewBinding.prototype.setDimension=function(_d1b){
_d1b.h-=ViewBinding.VERTICAL_ADJUST;
_d1b.w-=ViewBinding.HORIZONTAL_ADJUST;
_d1b.w-=1;
if(_d1b.h<0){
_d1b.h=0;
}
if(_d1b.w<0){
_d1b.w=0;
}
this.bindingElement.style.width=String(_d1b.w)+"px";
this.bindingElement.style.height=String(_d1b.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d1c){
this.isFlexBoxBehavior=false;
_d1c.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d1c.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_d1c.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d1c.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d1c;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d1d=null;
if(this.isFreeFloating==true){
_d1d=this._snapBinding.getBindingElement();
}else{
_d1d=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d1d;
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
ViewBinding.prototype.reload=function(_d1e){
this._isLoaded=false;
this.windowBinding.reload(_d1e);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d1f=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d1f=true;
}
}
if(!_d1f){
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
ViewBinding.newInstance=function(_d23){
var _d24=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d23);
var _d25=UserInterface.registerBinding(_d24,ViewBinding);
_d25.windowBinding=_d25.add(WindowBinding.newInstance(_d23));
_d25.windowBinding.isFlexible=false;
return _d25;
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
var _d2d=this.bindingWindow.__doPostBack;
var _d2e=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d2e){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d2f,_d30){
if(!form.__isSetup){
Application.lock(self);
_d2e=true;
}
self.manifestAllDataBindings();
_d2d(_d2f,_d30);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d31,list){
var _d33=this.bindingWindow.bindingMap.__REQUEST;
if(_d33!=null&&this._isDotNet()){
switch(_d31){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d33.postback(_d31);
}
}
break;
default:
_d33.postback(_d31);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d31,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d34,list){
var _d36=this.getDescendantBindingsByType(WindowBinding);
_d36.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d34,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d3a){
list.add({name:_d3a.name,value:_d3a.value});
});
var out="";
list.each(function(_d3c){
out+=_d3c.name+": "+_d3c.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d3d){
PageBinding.superclass.handleAction.call(this,_d3d);
var _d3e=_d3d.target;
switch(_d3d.type){
case RootBinding.ACTION_PHASE_3:
if(_d3e==UserInterface.getBinding(this.bindingDocument.body)){
_d3e.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d3e);
}
_d3d.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d3f=this.validateAllDataBindings();
if(_d3f){
this.doPostBack(_d3e);
}
}
_d3d.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d3d.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d3e.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d3e.key)){
this._initBlockers.del(_d3e.key);
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
var _d41={handleAction:function(_d42){
if(_d42.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d41);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d41);
}else{
MessageQueue.udpdate();
}
_d3d.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d43,arg){
PageBinding.superclass.handleBroadcast.call(this,_d43,arg);
switch(_d43){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d45=arg;
if(!this._canPostBack&&!_d45){
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
PageBinding.prototype.doPostBack=function(_d47){
if(this._canPostBack){
if(_d47!=null&&this._isDotNet()){
var _d48=_d47.getCallBackID();
var _d49=_d47.getCallBackArg();
if(_d48!=null){
_d48=_d48.replace(/_/g,"$");
}else{
_d48="";
}
if(_d49==null){
_d49="";
}
this.bindingWindow.__doPostBack(_d48,_d49);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _d4a=true;
var _d4b=this.bindingWindow.DataManager.getAllDataBindings();
while(_d4b.hasNext()&&_d4a){
var _d4c=_d4b.getNext();
if(_d4c.isAttached){
var _d4d=_d4c.validate();
if(_d4a&&!_d4d){
_d4a=false;
this.logger.debug("Invalid DataBinding: "+_d4c.toString()+" ("+_d4c.getName()+")");
break;
}
}
}
return _d4a;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d4f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d4f.hasNext()){
var _d50=_d4f.getNext();
if(_d50.isAttached){
var _d51=_d50.manifest();
if(_d51!=null){
list.add(_d51);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d52=this.bindingWindow.DataManager.getAllDataBindings();
while(_d52.hasNext()){
var _d53=_d52.getNext();
if(_d53.isAttached){
_d53.clean();
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
var _d55=this._cachedFocus.getBinding();
if(_d55){
_d55.blur();
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
var _d56=this.getProperty("width");
if(!_d56){
_d56=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d56;
}
if(this.height==null){
var _d57=this.getProperty("height");
this.height=_d57?_d57:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d58=this.getProperty("minheight");
if(_d58!=null){
this.minheight=_d58;
}
}
if(this.controls==null){
var _d59=this.getProperty("controls");
this.controls=_d59?_d59:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d5a=this.getProperty("resizable");
this.isResizable=_d5a?_d5a:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d5b){
if(_d5b!=this.isAutoHeightLayoutMode){
if(_d5b){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d5b;
}
};
DialogPageBinding.prototype.handleAction=function(_d5c){
DialogPageBinding.superclass.handleAction.call(this,_d5c);
var _d5d=_d5c.target;
switch(_d5c.type){
case PageBinding.ACTION_ATTACHED:
if(_d5d!=this&&_d5d.isFitAsDialogSubPage){
_d5d.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d5c.consume();
if(_d5d.response!=null){
this.response=_d5d.response;
switch(_d5d.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d5e){
var _d5f=this.bindingWindow.bindingMap.buttonAccept;
if(_d5f!=null){
_d5f.setDisabled(_d5e);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d60){
var _d61=CSSComputer.getPadding(this.bindingElement);
var _d62=CSSComputer.getBorder(this.bindingElement);
_d60+=_d61.top+_d61.bottom;
_d60+=_d62.top+_d62.bottom;
if(_d60>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d60+"px";
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
EditorPageBinding.prototype.handleAction=function(_d6a){
EditorPageBinding.superclass.handleAction.call(this,_d6a);
var _d6b=_d6a.target;
switch(_d6a.type){
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
var _d6c=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d6b.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d6c==-1){
_d6c=0;
}
}else{
_d6c++;
}
return res;
});
if(_d6c>-1){
this._messengers.del(_d6c);
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
_d6a.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d6b.key,_d6b);
if(_d6b instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d6b.key);
if(_d6b instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d6b==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d6b.getSelectedTabBinding();
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
_d6a.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d6b==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d6a.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d6b==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d6a.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d6b==this._windowBinding){
if(_d6b.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d71=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d71);
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
var _d72=this.bindingWindow.bindingMap.savebutton;
if(_d72!=null&&!_d72.isDisabled){
_d72.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d73=this.bindingWindow.bindingMap.__REQUEST;
if(_d73!=null){
_d73.postback(EditorPageBinding.MESSAGE_SAVE);
}else{
this.logger.error("Save aborted: Could not locate RequestBinding");
}
}
};
EditorPageBinding.prototype._saveAndPublishEditorPage=function(){
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d74=this.bindingWindow.bindingMap.__REQUEST;
if(_d74!=null){
_d74.postback(EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH);
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
EditorPageBinding.prototype.postMessage=function(_d75){
this._message=null;
switch(_d75){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d75,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d75;
}
break;
case EditorPageBinding.MESSAGE_SAVE_AND_PUBLISH:
this._postMessageToDescendants(_d75,this._messengers);
if(!this._messengers.hasEntries()){
this._saveAndPublishEditorPage();
}else{
this._message=_d75;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d75;
EditorPageBinding.superclass.postMessage.call(this,_d75,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d75,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d76,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d76,arg);
switch(_d76){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d78=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d78);
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
var _d79=new List();
this._invalidBindings.each(function(key,_d7b){
var list=_d7b.getInvalidLabels();
if(list){
list.each(function(_d7d){
_d79.add(_d7d);
});
}
});
if(_d79.hasEntries()){
var _d7e="";
while(_d79.hasNext()){
_d7e+=_d79.getNext().toLowerCase();
if(_d79.hasNext()){
_d7e+=", ";
}else{
_d7e+=".";
}
}
var _d7f=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d7f+" "+_d7e);
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
EditorPageBinding.prototype.enableSave=function(_d80){
var _d81=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d81){
var _d82=UserInterface.getBinding(_d81);
if(_d80){
_d82.enable();
}else{
_d82.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d83=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d83!=null){
UserInterface.getBinding(_d83).enable();
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
var _d84=this._windowBinding.getContentDocument().title;
if(_d84==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d85=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d87){
if(_d87.name=="__EVENTTARGET"&&_d85){
_d87.value=_d85;
}
list.add({name:_d87.name,value:_d87.value});
});
var url=String(this.bindingDocument.location);
this._windowBinding.getContentWindow().submit(list,url);
this._latestPostbackList=list.reset();
}else{
this.handleInvalidData();
}
}
};
EditorPageBinding.prototype.handleElement=function(_d89){
return true;
};
EditorPageBinding.prototype.updateElement=function(_d8a){
this.label=_d8a.getAttribute("label");
this.image=_d8a.getAttribute("image");
this.tooltip=_d8a.getAttribute("tooltip");
this.dispatchAction(DockTabBinding.ACTION_UPDATE_VISUAL);
return false;
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
if(arg.actionProfile!=null){
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
if(!this._focusedTreeNodeBindings.hasEntries()){
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
var _df0=StageBinding.perspectiveNode.getEntityToken();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _df0=this.getRootTreeNodeBindings().getFirst().node.getEntityToken();
}
var _df1=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_df0,_def,_df1);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _df4=this._treeNodeBindings;
var _df5=new Map();
function fix(_df6,list){
if(!_df6.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_df4.has(node.getHandle())){
var _df9=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_df5.set(node.getHandle(),_df9);
_df6.add(_df9);
}
});
_df6.attachRecursive();
}
}
_df6.open(true);
}
map.each(function(_dfa,list){
if(_df4.has(_dfa)){
var _dfc=_df4.get(_dfa);
fix(_dfc,list);
}else{
if(_df5.has(_dfa)){
var _dfd=_df5.get(_dfa);
fix(_dfd,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_dfe,arg){
switch(_dfe){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e00=arg;
if(_e00!=null){
this._invokeServerRefresh(_e00);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _e01=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_e01;
_e01.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _e01=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_e01;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_e02){
if(_e02!=null&&_e02=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_e02)){
var list=this._entityTokenRegistry.get(_e02).reset();
this._refreshToken=_e02;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _e04=list.getNext();
this._refreshingTreeNodes.set(_e04.key,true);
setTimeout(function(){
_e04.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _e05=this.getFocusedTreeNodeBindings().getFirst();
if(_e05){
var _e06=_e05.getLabel();
var _e07=_e05.getAncestorBindingByLocalName("treenode");
if(_e07){
_e05=_e07;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_e05.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _e08=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_e08,[_e06]);
}
_e05.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _e09=SystemTreeBinding.clipboard;
if(_e09){
var type=_e09.dragType;
var _e0b=this.getFocusedTreeNodeBindings().getFirst();
if(_e0b.dragAccept){
if(_e0b.acceptor.isAccepting(type)){
this._performPaste(_e0b);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_e0c){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_e0c.node.hasDetailedDropSupport()){
if(_e0c.node.hasChildren()){
var _e0e=_e0c.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_e0f,_e10){
if(_e0f==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _e11=_e10.get("switch");
var _e12=_e10.get("sibling");
if(_e11=="after"){
_e12++;
}
var _e13=_e0c.accept(SystemTreeBinding.clipboard,_e12);
if(_e13){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_e0e);
}else{
Application.lock(self);
var _e14=_e0c.accept(SystemTreeBinding.clipboard,0);
if(_e14){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _e14=_e0c.accept(SystemTreeBinding.clipboard,0);
if(_e14){
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
SystemTreeBinding.prototype.collapse=function(_e15){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_e15){
this.blurSelectedTreeNodes();
var _e16=this.getRootTreeNodeBindings();
_e16.each(function(_e17){
if(_e17.isContainer&&_e17.isOpen){
_e17.close();
_e17.hasBeenOpened=false;
_e17.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_e18){
if(_e18!=this.isLockedToEditor){
this.isLockedToEditor=_e18;
if(_e18){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _e1a=this.getRootTreeNodeBindings();
_e1a.each(function(_e1b){
var _e1c=_e1b.getOpenSystemNodes();
if(_e1c!=null&&_e1c.hasEntries()){
list.merge(_e1c);
}else{
if(_e1b.isOpen){
list.add(_e1b.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e1d){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e1d);
if(_e1d!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e1f=new Map();
var _e20=this.getFocusedTreeNodeBindings();
var _e21=_e20.getFirst().node.getActionProfile();
var self=this;
_e21.each(function(_e23,list){
var _e25=new List();
list.each(function(_e26){
if(_e26.getActivePositions()&self._activePosition){
_e25.add(_e26);
}
});
if(_e25.hasEntries()){
_e1f.set(_e23,_e25);
}
});
_e1f.activePosition=this._activePosition;
return _e1f;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e27,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e27,arg);
switch(_e27){
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
var _e2c=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e2c.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e2d=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e2d.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e2e){
SystemTreePopupBinding.superclass.handleAction.call(this,_e2e);
switch(_e2e.type){
case MenuItemBinding.ACTION_COMMAND:
var _e2f=_e2e.target;
var _e30=_e2f.associatedSystemAction;
if(_e30){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e32=list.getFirst();
var _e33=_e32.node;
}
SystemAction.invoke(_e30,_e33);
}else{
var cmd=_e2f.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e36=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e36=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e36=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e36=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e36=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e36){
setTimeout(function(){
EventBroadcaster.broadcast(_e36);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e37=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e37.hasNext()){
var _e38=UserInterface.getBinding(_e37.getNext());
if(!_e38.getProperty("rel")){
_e38.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e3a=new List();
var self=this;
this._actionProfile.each(function(_e3c,list){
var _e3e=MenuGroupBinding.newInstance(doc);
list.each(function(_e3f){
var _e40=self.getMenuItemBinding(_e3f);
_e3e.add(_e40);
});
_e3a.add(_e3e);
});
_e3a.reverse();
while(_e3a.hasNext()){
this._bodyBinding.addFirst(_e3a.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e41){
var _e42=MenuItemBinding.newInstance(this.bindingDocument);
var _e43=_e41.getLabel();
var _e44=_e41.getToolTip();
var _e45=_e41.getImage();
var _e46=_e41.getDisabledImage();
var _e47=_e41.isCheckBox();
if(_e43){
_e42.setLabel(_e43);
}
if(_e44){
_e42.setToolTip(_e44);
}
if(_e45){
_e42.imageProfile=new ImageProfile({image:_e45,imageDisabled:_e46});
}
if(_e47){
_e42.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e41.isChecked()){
_e42.check(true);
}
}
if(_e41.isDisabled()){
_e42.disable();
}
_e42.associatedSystemAction=_e41;
return _e42;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e4b=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e4b=UserInterface.getBinding(node);
if(_e4b.isDisabled){
_e4b=null;
}
}
break;
}
if(_e4b!=null&&_e4b.node!=null&&_e4b.node.getActionProfile()!=null){
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
var _e4c=this.node.getLabel();
if(_e4c){
this.setLabel(_e4c);
}
var _e4d=this.node.getToolTip();
if(_e4d){
this.setToolTip(_e4d);
}
var _e4e=this.node.getHandle();
if(_e4e){
this.setHandle(_e4e);
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
var _e51="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e51+=list.getNext();
if(list.hasNext()){
_e51+=" ";
}
}
this.setProperty("dragaccept",_e51);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e53){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e53);
switch(_e53.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e53.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e53.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e54,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e54,arg);
switch(_e54){
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
var _e57=null;
var _e58=this.node.getImageProfile();
if(_e58){
if(this.isOpen){
_e57=_e58.getActiveImage();
}else{
_e57=_e58.getDefaultImage();
}
}
if(!_e57){
_e57=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e57;
};
SystemTreeNodeBinding.prototype.open=function(_e59){
var _e5a=this.isContainer&&!this.isOpen;
var _e5b=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e5a&&(_e5b||SystemTreeBinding.HAS_NO_MEMORY)&&_e59!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e5c=null;
if(this.isContainer){
_e5c=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e5c);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e5e){
if(_e5e!=null){
this._refreshBranch(_e5e);
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
var _e5f=new List();
var _e60=this.node.getChildren();
this.empty();
if(_e60.hasEntries()){
this._insertTreeNodesRegulated(_e60);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e61){
var _e62=0;
var _e63=new List([]);
while(_e61.hasEntries()&&_e62<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e64=SystemTreeNodeBinding.newInstance(_e61.extractFirst(),this.bindingDocument);
_e64.autoExpand=this.autoExpand;
this.add(_e64);
_e64.attach();
_e62++;
if(this.autoExpand){
if(_e62==1&&!_e61.hasEntries()||LastOpenedSystemNodes.isOpen(_e64)){
_e63.add(_e64);
}
}
}
if(_e61.hasEntries()){
this._insertBufferTreeNode(_e61);
}
_e63.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e67){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e69=this.node.getDescendantBranch(list);
if(_e69.hasEntries()){
this.XXX(_e69);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e6a){
var self=this;
var map=new Map();
this.empty();
_e6a.each(function(key,_e6e){
if(_e6e.hasEntries()){
_e6e.each(function(node){
var _e70=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e70);
if(map.has(key)){
var _e71=map.get(key);
_e71.add(_e70);
_e71.isOpen=true;
_e71.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e70);
}else{
}
}
});
}
});
this.attachRecursive();
_e6a.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e72=new TreeCrawler();
var _e73=new List();
_e72.mode=TreeCrawler.MODE_GETOPEN;
_e72.crawl(this.bindingElement,_e73);
if(_e73.hasEntries()){
_e73.extractFirst();
}
_e72.dispose();
return _e73;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e74=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e74=new List([this.node]);
list.each(function(_e76){
_e74.add(_e76.node);
});
}
return _e74;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e77,_e78){
var _e79=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e77 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e77.node.getData(),this.node.getData(),_e78?_e78:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e79);
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
SystemTreeNodeBinding.newInstance=function(node,_e7d){
var _e7e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e7d);
var _e7f=UserInterface.registerBinding(_e7e,SystemTreeNodeBinding);
_e7f.node=node;
return _e7f;
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
SystemPageBinding.prototype.setPageArgument=function(_e80){
this.node=_e80;
SystemPageBinding.superclass.setPageArgument.call(this,_e80);
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
var _e81=this.node.getChildren();
if(_e81.hasEntries()){
while(_e81.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e81.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e83=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e83.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e85=new TreeCrawler();
var _e86=new List();
_e85.mode=TreeCrawler.MODE_GETOPEN;
_e85.crawl(this.bindingElement,_e86);
_e85.dispose();
var list=new List([this.node]);
_e86.each(function(_e88){
list.add(_e88.node);
});
this._tree.empty();
var _e89=this.node.getDescendantBranch(list);
if(_e89.hasEntries()){
var self=this;
var map=new Map();
_e89.each(function(key,_e8d){
_e8d.each(function(node){
var _e8f=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e8f);
if(map.has(key)){
var _e90=map.get(key);
_e90.add(_e8f);
_e90.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e8f);
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
SystemPageBinding.prototype.handleAction=function(_e91){
SystemPageBinding.superclass.handleAction.call(this,_e91);
switch(_e91.type){
case ButtonBinding.ACTION_COMMAND:
var _e92=_e91.target;
switch(_e92.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e92.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e93,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e93,arg);
switch(_e93){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e95=arg;
if(this.node&&this.node.getEntityToken()==_e95){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e95);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e95);
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
StageContainerBinding.prototype.handleBroadcast=function(_e97,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e97,arg);
var _e99=this.bindingWindow.WindowManager;
switch(_e97){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e99.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e99.WINDOW_RESIZED_BROADCAST:
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
var _e9b=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e9b.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_e9c){
if(StageBinding.isViewOpen(_e9c)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e9c);
}else{
var _e9d=ViewDefinitions[_e9c];
StageBinding.presentViewDefinition(_e9d);
}
};
StageBinding.isViewOpen=function(_e9e){
return StageBinding.bindingInstance._activeViewDefinitions[_e9e]!=null;
};
StageBinding.presentViewDefinition=function(_e9f){
if(_e9f.label!=null){
var _ea0=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ea0,[_e9f.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e9f);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ea2,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ea4=System.getPerspectiveNodes();
if(_ea4.hasEntries()){
this._initializeSystemViewDefinitions(_ea4);
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
var _ea6=null;
if(LocalStore.isEnabled){
_ea6=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_ea6&&ViewDefinitions[_ea6]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_ea6));
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
var _ea8=root.getActionProfile();
if(_ea8&&_ea8.hasEntries()){
var _ea9=top.app.bindingMap.toolsmenugroup;
if(_ea9){
_ea8.each(function(_eaa,list){
list.each(function(_eac){
var item=MenuItemBinding.newInstance(_ea9.bindingDocument);
item.setLabel(_eac.getLabel());
item.setToolTip(_eac.getToolTip());
item.setImage(_eac.getImage());
item.setDisabled(_eac.isDisabled());
item.associatedSystemAction=_eac;
var _eae=_ea9;
var tag=_eac.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_eae=top.app.bindingMap.translationsmenugroup;
break;
}
}
_eae.add(item);
});
});
_ea9.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_eb0){
while(_eb0.hasNext()){
var node=_eb0.getNext();
var _eb2=node.getHandle();
ViewDefinitions[_eb2]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_eb3){
StageBinding.superclass.handleAction.call(this,_eb3);
var _eb4=_eb3.target;
switch(_eb3.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_eb4;
this._inflateBinding(_eb4);
_eb3.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_eb4;
this._inflateBinding(_eb4);
_eb3.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_eb4);
_eb3.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_eb4 instanceof DockBinding){
switch(_eb4.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_eb4.reference,_eb4);
break;
}
this.handleAttachedDock(_eb4);
_eb3.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_eb4 instanceof DockBinding){
this.handleSelectedDockTab(_eb4.getSelectedTabBinding());
_eb3.consume();
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
_eb3.consume();
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
_eb3.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_eb3);
};
StageBinding.prototype.handleBroadcast=function(_eb6,arg){
StageBinding.superclass.handleBroadcast.call(this,_eb6,arg);
switch(_eb6){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _eb8=arg;
this._dontView(_eb8);
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
StageBinding.prototype._showStart=function(_eba){
if(_eba!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ebd=this.bindingWindow.bindingMap.maindecks;
if(_eba){
_ebd.select("startdeck");
view.show();
}else{
view.hide();
_ebd.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_eba;
}
};
StageBinding.prototype._inflateBinding=function(_ebe){
for(var _ebf in ViewDefinitions){
var _ec0=ViewDefinitions[_ebf];
if(_ec0 instanceof SystemViewDefinition){
_ebe.mountDefinition(_ec0);
}
}
var _ec1=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ec1){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ec4=new StageCrawler();
_ec4.mode=mode;
_ec4.crawl(this.bindingElement);
_ec4.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ec5){
var _ec6=_ec5.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ec6);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ec6));
}
};
StageBinding.prototype.handleAttachedDock=function(_ec7){
var _ec8=_ec7.getTabBindings();
if(_ec8.hasEntries()){
while(_ec8.hasNext()){
var _ec9=_ec8.getNext();
var _eca=_ec9.getHandle();
if(_eca){
if(_eca=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _ecb=ViewDefinitions[_eca];
if(_ecb){
this._view(_ec7,_ec9,_ecb,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_eca+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_ecc){
var _ecd=null;
var _ece=false;
switch(_ecc.position){
case Dialog.MODAL:
_ecd=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_ecd=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_ecc.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_ecd=this._dockBindings.get(_ecc.position);
break;
case DockBinding.EXTERNAL:
window.open(_ecc.url);
_ece=true;
break;
default:
var _ecf=this._decksBinding.getSelectedDeckBinding();
_ecd=_ecf.getDockBindingByReference(_ecc.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _ed0=this.bindingWindow.bindingMap.maindecks;
_ed0.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_ece=true;
}
break;
}
if(!_ece){
if(_ecd!=null){
this._view(_ecd,null,_ecc,true);
}else{
throw "StageBinding: Could not position view: "+_ecc.handle;
}
}
};
StageBinding.prototype._view=function(_ed1,_ed2,_ed3,_ed4){
var _ed5=_ed3.handle;
if(_ed3.isMutable){
_ed5+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_ed5]){
var _ed6=ViewBinding.getInstance(_ed5);
if(_ed6!=null){
_ed6.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_ed5);
}
}else{
this._activeViewDefinitions[_ed5]=_ed3;
Application.lock(this);
switch(_ed1.constructor){
case DockBinding:
if(_ed4){
_ed1.prepareNewView(_ed3);
}else{
_ed1.prepareOpenView(_ed3,_ed2);
}
break;
case StageDialogBinding:
if(_ed4){
_ed1.prepareNewView(_ed3);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_ed7){
if(this._activeViewDefinitions[_ed7]!=null){
delete this._activeViewDefinitions[_ed7];
}else{
this.logger.debug("Could not unregister active view: "+_ed7);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ed8){
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
this.addFilter(function(_eda){
var _edb=UserInterface.getBinding(_eda);
var _edc=null;
if(_edb){
switch(_edb.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_edb.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_edb.handleUnMaximization();
break;
}
break;
case DockBinding:
_edc=NodeCrawler.SKIP_NODE;
break;
}
}
return _edc;
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
var _edd=null;
this._dialogs.each(function(_ede){
if(!_ede.isVisible){
_edd=_ede;
}
return _edd!=null;
});
if(!_edd){
this._newInstance();
_edd=this._dialogs.getLast();
}
_edd.setModal(false);
return _edd;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _edf=this.getInstance();
_edf.setModal(true);
return _edf;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _ee0=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_ee0);
_ee0.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ee1){
if(_ee1 instanceof DialogViewDefinition){
var _ee2=ViewBinding.newInstance(this.bindingDocument);
_ee2.setDefinition(_ee1);
_ee2.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ee1.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ee1.handler)){
this._dialogResponseHandler=_ee1.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ee2;
this._body.add(_ee2);
_ee2.attach();
_ee2.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ee3){
StageDialogBinding.superclass.handleAction.call(this,_ee3);
var _ee4=_ee3.target;
switch(_ee3.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ee4);
_ee3.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ee4.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ee3.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ee4.response){
this._handleDialogPageResponse(_ee4);
}
_ee3.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ee3.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ee3.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ee4.dispose();
_ee3.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ee3.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ee3.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ee3.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ee3.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ee3.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ee4==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ee5,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ee5,arg);
switch(_ee5){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_ee7){
var _ee8=new FitnessCrawler();
var list=new List();
if(_ee7){
_ee8.mode=FitnessCrawler.MODE_BRUTAL;
}
_ee8.crawl(this.bindingElement,list);
_ee8.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_eea){
_eea.fit(_ee7);
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
var _eeb=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_eeb){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_eed){
var cmd=_eed.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_eef){
if(_eef.bindingDocument==this._viewBinding.getContentDocument()){
if(_eef instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_eef);
}
this._pageBinding=_eef;
if(_eef.height=="auto"){
_eef.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_eef);
_eef.enableAutoHeightLayoutMode(false);
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
if(_eef.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_eef);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_ef0){
var _ef1=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_ef1){
var _ef2=UserInterface.getBinding(_ef1);
_ef2.setDisabled(_ef0);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_ef3){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_ef3.response,_ef3.result!=null?_ef3.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_ef4){
if(_ef4.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_ef4);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_ef6){
switch(_ef6.type){
case MenuItemBinding.ACTION_COMMAND:
if(_ef6.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_ef6.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_ef7){
var _ef8=_ef7.label;
var _ef9=_ef7.image;
var _efa=_ef7.width;
var _efb=_ef7.height;
var _efc=_ef7.controls;
var _efd=_ef7.isResizable;
if(_ef8){
this.setLabel(_ef8);
}
if(_ef9){
this.setImage(_ef9);
}
if(_efa||_efb){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_efa?_efa:old.w;
}else{
nev.w=old.w;
}
nev.h=(_efb!=null&&_efb!="auto")?_efb:old.h;
this.setDimension(nev);
}
if(_efc){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_f01=new List(_efc.split(" "));
while((type=_f01.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_efd!=this._isResizable){
this.setResizable(_efd);
}
if(_efb=="auto"){
this._fixAutoHeight(_ef7);
}
if(_ef7==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_f02){
var dim=this.getDimension();
var _f04=0;
var _f05=0;
if(_f02.isDialogSubPage){
_f02=this._pageBinding;
}
if(this._isFirstPage){
_f04=_f02.width!=null?_f02.width:dim.w;
}else{
_f04=dim.w;
}
_f05=_f02.bindingElement.offsetHeight;
_f05+=this._titlebar.bindingElement.offsetHeight;
_f05+=4;
if(_f05<dim.h){
_f05=dim.h;
}
if(_f02.minheight!=null){
if(_f05<_f02.minheight){
_f05=_f02.minheight;
}
}
this.setDimension(new Dimension(_f04,_f05));
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
StageDialogBinding.newInstance=function(_f08){
var _f09=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_f08);
var _f0a=UserInterface.registerBinding(_f09,StageDialogBinding);
_f0a.setProperty("controls","minimize maximize close");
return _f0a;
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
this.addFilter(function(_f0b,list){
var _f0d=null;
var _f0e=UserInterface.getBinding(_f0b);
if(!_f0e.isVisible){
_f0d=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _f0d;
});
this.addFilter(function(_f0f,list){
var _f11=null;
var _f12=UserInterface.getBinding(_f0f);
if(_f12.isAttached){
if(Interfaces.isImplemented(IFit,_f12)){
if(!_f12.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_f12);
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
StageDecksBinding.prototype.mountDefinition=function(_f13){
var _f14=StageDeckBinding.newInstance(this.bindingDocument);
_f14.handle=_f13.handle;
_f14.perspectiveNode=_f13.node;
this._decks[_f14.handle]=_f14;
this.add(_f14);
_f14.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_f15){
var _f16=this._decks[_f15];
StageBinding.perspectiveNode=_f16.perspectiveNode;
this.select(_f16);
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
StageDeckBinding.prototype.handleAction=function(_f17){
StageDeckBinding.superclass.handleAction.call(this,_f17);
var _f18=_f17.target;
switch(_f17.type){
case WindowBinding.ACTION_LOADED:
if(_f18==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_f17.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_f18 instanceof DockBinding){
this._dockBindings.set(_f18.reference,_f18);
_f18.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_f17.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_f17.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_f17);
StageDeckBinding.superclass.handleAction.call(this,_f17);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _f1a=new StageCrawler();
_f1a.mode=mode;
_f1a.crawl(this.windowBinding.getContentDocument().body);
_f1a.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_f1b){
return this._dockBindings.get(_f1b);
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
StageDeckBinding.newInstance=function(_f1d){
var _f1e=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f1d);
var _f1f=UserInterface.registerBinding(_f1e,StageDeckBinding);
return _f1f;
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
StageSplitBoxBinding.prototype.handleAction=function(_f20){
StageSplitBoxBinding.superclass.handleAction.call(this,_f20);
StageBoxAbstraction.handleAction.call(this,_f20);
var _f21=_f20.target;
var _f22=null;
var _f23=null;
switch(_f20.type){
case DockBinding.ACTION_EMPTIED:
_f23=this.getChildBindingByLocalName("splitter");
if(_f23.isVisible){
_f23.hide();
}
_f22=this.getDescendantBindingsByLocalName("dock");
if(_f22.getFirst().isEmpty&&_f22.getLast().isEmpty){
if(_f22.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f20.consume();
break;
case DockBinding.ACTION_OPENED:
_f22=this.getDescendantBindingsByLocalName("dock");
if(!_f22.getFirst().isEmpty&&!_f22.getLast().isEmpty){
_f23=this.getChildBindingByLocalName("splitter");
if(!_f23.isVisible){
_f23.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f20.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f21!=this){
_f23=this.getChildBindingByLocalName("splitter");
if(_f23.isVisible){
_f23.hide();
}
this.invokeLayout();
_f20.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f21!=this){
var _f24=this.getChildBindingsByLocalName("splitpanel");
if(_f24.getFirst().isVisible&&_f24.getLast().isVisible){
_f23=this.getChildBindingByLocalName("splitter");
if(!_f23.isVisible){
_f23.show();
}
}
this.invokeLayout();
_f20.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f25){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f25);
switch(_f25.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f25.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f26=this.getChildBindingsByLocalName("splitpanel");
return _f26.getFirst().isVisible&&_f26.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f27=this.getChildBindingsByLocalName("splitpanel");
return _f27.getFirst().isFixed&&_f27.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f28){
StageSplitPanelBinding.superclass.handleAction.call(this,_f28);
StageBoxAbstraction.handleAction.call(this,_f28);
switch(_f28.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f28.type==StageSplitBoxBinding.ACTION_HIDE){
_f28.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f28.type==DockBinding.ACTION_EMPTIED){
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
if(_f28.type==StageSplitBoxBinding.ACTION_SHOW){
_f28.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f2b=_f28.target;
if(_f2b!=this&&_f2b.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f2c=_f2b._containingSplitBoxBinding;
if(_f2c.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f2d=_f2c.getChildBindingsByLocalName("splitpanel");
var _f2e=_f2d.getFirst();
var _f2f=_f2d.getLast();
if(this.isFixed==true){
if(!_f2e.isFixed||!_f2f.isFixed||(!_f2c.hasBothPanelsVisible()&&_f2b.isMinimizedForReal)){
this.setFix(false);
_f28.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f2c.hasBothPanelsFixed()||(!_f2c.hasBothPanelsVisible()&&_f2b.isMinimizedForReal)){
this.setFix(_f2b.getContainedDock().getHeight());
_f28.consume();
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
var _f30=this.getContainedDock();
if(_f30){
if(this.isMaximizePrepared==true){
}else{
_f30.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f31=this.getContainedDock();
if(_f31){
if(_f31.type==DockBinding.TYPE_EDITORS){
if(_f31.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f31.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f32=this.getContainedDock();
if(_f32){
_f32.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f32);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f33=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f34=this.getContainedDock();
if(_f34){
_f34.collapse(_f33);
if(!_f33){
this.setFix(_f34.getHeight());
}else{
this.setFix(_f34.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f34&&_f34.isActive){
_f34.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f34);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f35){
var _f36=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f37=this.getContainedDock();
if(_f37){
if(this.isMinimized==true){
_f37.unCollapse(_f36);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f35){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f37){
_f37.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f37);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f38){
var _f39=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f39=false;
}
}
if(_f39==true){
this._invisibilize(_f38);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f3b){
if(_f3b!=this._isInvisibilized){
if(_f3b){
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
StageSplitterBinding.prototype.onDragStart=function(_f3c){
var _f3d=top.app.bindingMap.stagesplittercover;
var _f3e=this._containingSplitBoxBinding.getOrient();
switch(_f3e){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f3d.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f3d.bindingElement.style.cursor="n-resize";
break;
}
_f3d.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f3e);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f44){
this._orient=_f44;
this.attachClassName(_f44);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f46=true;
var _f47=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f47=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f46=false;
break;
}
if(_f46){
this.bindingElement.style.left=pos.x+"px";
}
if(_f47){
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
StageBoxAbstraction.handleAction=function(_f49){
switch(_f49.type){
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
if(_f49.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f49.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f4a=this.bindingElement.style;
_f4a.position="absolute";
_f4a.width="100%";
_f4a.height="100%";
_f4a.top="0";
_f4a.left="0";
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
var _f4b=this.bindingElement.style;
_f4b.position="relative";
_f4b.width="auto";
_f4b.height="auto";
_f4b.top="auto";
_f4b.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f4c,_f4d){
var _f4e=_f4c.bindingElement.style;
var _f4f=_f4c.bindingElement.parentNode;
var box=_f4c._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f4d){
_f4c._unmodifiedFlexMethod=_f4c.flex;
_f4c.flex=function(){
_f4e.width=_f4f.offsetWidth+"px";
_f4e.height=_f4f.offsetHeight+"px";
};
}else{
_f4e.width="100%";
_f4e.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f4e.width="auto";
_f4e.height="auto";
box.reflex(true);
},0);
}
_f4c.flex=_f4c._unmodifiedFlexMethod;
_f4c._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f51){
var _f52=_f51.target;
switch(_f51.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f52 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f51);
_f51.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f51.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f53){
var mode=null;
switch(_f53.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f55){
StageMenuBarBinding.superclass.handleAction.call(this,_f55);
switch(_f55.type){
case MenuItemBinding.ACTION_COMMAND:
var _f56=_f55.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f56){
SystemAction.invoke(_f56,this._rootNode);
}
}
_f55.consume();
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
var _f57=this.getProperty("handle");
if(_f57){
this._handle=_f57;
if(StageBinding.isViewOpen(_f57)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f57);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f59){
this.setProperty("handle",_f59);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f5a,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f5a,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f5a){
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
StageViewMenuItemBinding.newInstance=function(_f5c){
var _f5d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f5c);
UserInterface.registerBinding(_f5d,StageViewMenuItemBinding);
return UserInterface.getBinding(_f5d);
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
StageStatusBarBinding.prototype.setLabel=function(_f5e){
this._label.setLabel(_f5e);
};
StageStatusBarBinding.prototype.setImage=function(_f5f){
this._label.setImage(_f5f);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f60){
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
var _f61=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f62=_f61.getAssociatedView();
var _f63=_f62.getContentWindow().bindingMap.tree;
var _f64=_f63.getFocusedTreeNodeBindings();
if(!_f64.hasEntries()&&StageBinding.treeSelector){
_f64=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f64;
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
ExplorerBinding.prototype.handleAction=function(_f65){
ExplorerBinding.superclass.handleAction.call(this,_f65);
var _f66=_f65.target;
switch(_f65.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f65.consume();
break;
case Binding.ACTION_DRAG:
if(_f66 instanceof ExplorerSplitterBinding){
_f66.dragger.registerHandler(this);
}
_f65.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f68){
this._menuBinding.setSelectionByHandle(_f68);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f69){
if(_f69 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f69);
this._menuBinding.mountDefinition(_f69);
}
};
ExplorerBinding.prototype.onDragStart=function(_f6a){
var _f6b=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f6b.hasEntries()){
var _f6c=_f6b.getFirst();
this._dragStart=_f6c.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f6c.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f70){
if(_f70 instanceof SystemViewDefinition){
var _f71=ViewBinding.newInstance(this.bindingDocument);
_f71.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f71.setDefinition(_f70);
var _f72=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f72.setAssociatedView(_f71);
this._decks[_f70.handle]=_f72;
_f72.add(_f71);
this.add(_f72);
function attach(){
_f72.attach();
_f71.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f73){
var _f74=this._decks[_f73];
this.select(_f74);
};
DecksBinding.prototype.expandBy=function(_f75){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f77=this.bindingElement.offsetHeight+_f75;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f77+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f79){
var _f7a=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f79);
return UserInterface.registerBinding(_f7a,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f7b){
this._viewBinding=_f7b;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f7c=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f7d=this._viewBinding.getDefinition().label;
StatusBar.busy(_f7c,[_f7d]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f7e){
ExplorerDeckBinding.superclass.handleAction.call(this,_f7e);
var _f7f=_f7e.target;
switch(_f7e.type){
case PageBinding.ACTION_INITIALIZED:
if(_f7f instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f7f.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f80,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f80,arg);
switch(_f80){
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
var _f82=null;
if(this._isExplorerDeckBindingInitialized){
_f82=this._viewBinding.getDefinition().label;
}else{
_f82=DockTabBinding.LABEL_TABLOADING;
}
return _f82;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f83=null;
if(this._isExplorerDeckBindingInitialized){
_f83=this._viewBinding.getDefinition().image;
}else{
_f83=DockTabBinding.IMG_TABLOADING;
}
return _f83;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f84=null;
if(this._isExplorerDeckBindingInitialized){
_f84=this._viewBinding.getDefinition().toolTip;
}
return _f84;
};
ExplorerDeckBinding.newInstance=function(_f85){
var _f86=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f85);
return UserInterface.registerBinding(_f86,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f87){
switch(_f87.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f87.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f87.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f87);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f88){
this._maxButtons.set(_f88.handle,this._mountMaxButton(_f88));
this._minButtons.set(_f88.handle,this._mountMinButton(_f88));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f89){
var _f8a=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f8a.setLabel(_f89.label);
_f8a.setToolTip(_f89.toolTip);
_f8a.handle=_f89.handle;
_f8a.node=_f89.node;
this._maxGroup.add(_f8a);
this._maxList.add(_f8a);
_f8a.attach();
return _f8a;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f8b){
var _f8c=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f8c.setLabel(_f8b.label);
_f8c.setToolTip(_f8b.label);
_f8c.handle=_f8b.handle;
_f8c.node=_f8b.node;
this._minGroup.addFirst(_f8c);
this._minList.add(_f8c);
_f8c.attach();
_f8c.hide();
return _f8c;
};
ExplorerMenuBinding.prototype.handleAction=function(_f8d){
ExplorerMenuBinding.superclass.handleAction.call(this,_f8d);
switch(_f8d.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f8e=_f8d.target;
var _f8f=_f8e.getCheckedButtonBinding();
var _f90=_f8f.handle;
switch(_f8e){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f90),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f90),true);
break;
}
this._selectedHandle=_f90;
this._selectedTag=_f8f.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f8d.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f91){
var _f92=this._maxButtons.get(_f91);
if(_f92){
_f92.check();
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
var _f93=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f93=true;
}
return _f93;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f95=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f95=true;
}
return _f95;
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
ExplorerToolBarBinding.newInstance=function(_f96){
var _f97=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f96);
return UserInterface.registerBinding(_f97,ExplorerToolBarBinding);
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
var _f98=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f99=_f98?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f99);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f9a,_f9b){
var _f9c=(_f9b==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f9d=DOMUtil.createElementNS(Constants.NS_UI,_f9c,_f9a);
var _f9e=UserInterface.registerBinding(_f9d,ExplorerToolBarButtonBinding);
_f9e.explorerToolBarButtonType=_f9b;
return _f9e;
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
EditorBinding.registerComponent=function(_f9f,_fa0){
var _fa1=EditorBinding._components;
var _fa2=EditorBinding._editors;
var key=_fa0.key;
var _fa4=Interfaces.isImplemented(IWysiwygEditorComponent,_f9f);
if(!_fa4){
_fa4=Interfaces.isImplemented(ISourceEditorComponent,_f9f);
}
if(_fa4){
if(_fa2.has(key)){
_fa2.get(key).initializeEditorComponent(_f9f);
}else{
if(!_fa1.has(key)){
_fa1.set(key,new List());
}
_fa1.get(key).add(_f9f);
}
}else{
throw "Editor component interface not implemented: "+_f9f;
}
};
EditorBinding.claimComponents=function(_fa5,_fa6){
var _fa7=EditorBinding._components;
var _fa8=EditorBinding._editors;
var key=_fa6.key;
_fa8.set(key,_fa5);
var list=null;
if(_fa7.has(key)){
list=_fa7.get(key).copy();
_fa7.del(key);
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
var _fac=this.getProperty("value");
if(_fac!=null){
_fac=decodeURIComponent(_fac);
this._startContent=_fac;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _fae=this.bindingWindow.DataManager;
_fae.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_fb0){
var _fb1=EditorBinding.claimComponents(this,_fb0);
if(_fb1!=null){
while(_fb1.hasNext()){
this.initializeEditorComponent(_fb1.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _fb3=this.bindingWindow.DataManager;
if(_fb3.getDataBinding(name)){
_fb3.unRegisterDataBinding(name);
}
_fb3.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _fb4=this.getEditorDocument();
if(_fb4!=null){
Application.framework(_fb4);
DOMEvents.addEventListener(_fb4,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_fb4,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_fb4,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_fb4,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_fb6){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_fb6==true){
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
var _fb8=this.getCheckSum();
if(_fb8!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_fb8;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _fb9=null;
if(Binding.exists(this._pageBinding)){
_fb9=this._pageBinding.getCheckSum(this._checksum);
}
return _fb9;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _fbb=DOMEvents.getTarget(e);
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
if(_fbb.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fbd,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fbd,arg);
var _fbf=null;
switch(_fbd){
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
var _fc0=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fc0=false;
}
}
}else{
_fbf=DOMEvents.getTarget(arg);
if(_fbf&&_fbf.ownerDocument==this.getEditorDocument()){
_fc0=false;
}
}
if(_fc0){
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
EditorBinding.prototype._activateEditor=function(_fc1){
if(_fc1!=this._isActivated){
this._isActivated=_fc1;
EditorBinding.isActive=_fc1;
var _fc2=this.getEditorWindow().standardEventHandler;
var _fc3=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fc3!=null){
if(_fc1){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fc3.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fc2.enableNativeKeys(true);
}else{
_fc3.disable();
_fc2.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fc4=this.getEditorDocument().selection.createRange();
_fc4.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fc5=false;
try{
if(!Client.isExplorer){
var _fc6=this.getEditorWindow().getSelection();
if(_fc6!=null){
_fc5=_fc6.toString().length>0;
if(!_fc5){
var _fc7=_fc6.getRangeAt(0);
var frag=_fc7.cloneContents();
var _fc9=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fc9.appendChild(frag.firstChild);
}
var img=_fc9.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fc5=true;
}
}
}
}
}else{
var _fc7=this.getEditorDocument().selection.createRange();
_fc5=(_fc7&&_fc7.text)&&_fc7.text.length>0;
if(_fc7.commonParentElement&&VisualEditorBinding.isImageElement(_fc7.commonParentElement())){
_fc5=true;
}
}
}
catch(exception){
}
return _fc5;
};
EditorBinding.prototype.isCommandEnabled=function(_fcb){
var _fcc=true;
switch(_fcb){
case "Cut":
case "Copy":
case "Paste":
_fcc=this.getEditorDocument().queryCommandEnabled(_fcb);
break;
}
return _fcc;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fd0=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fd1=null;
if(cmd=="Paste"){
_fd1=null;
}else{
_fd1=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fd1);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fd0=true;
}
break;
}
return _fd0;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fd3=this.getContentWindow().bindingMap.toolbar;
var _fd4=_fd3.getButtonForCommand(cmd);
if(!_fd4){
throw "No button for command "+cmd;
}
return _fd4;
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
var _fd7=this.getContentDocument().getElementById("focusableinput");
if(_fd7!=null){
_fd7.style.display="block";
FocusBinding.focusElement(_fd7);
_fd7.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fd8){
EditorBinding.superclass.handleAction.call(this,_fd8);
var _fd9=_fd8.target;
var self=this;
var _fdb=this.shadowTree.iframe;
switch(_fd8.type){
case Binding.ACTION_DIRTY:
if(_fd8.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fdc){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fdc);
};
EditorBinding.prototype.handleElement=function(_fdd){
return true;
};
EditorBinding.prototype.updateElement=function(_fde){
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
this._menuGroups[rel].each(function(_fe1){
_fe1.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_fe3){
_fe3.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_fe4){
EditorPopupBinding.superclass.handleAction.call(this,_fe4);
var _fe5=_fe4.target;
if(_fe4.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_fe5.getProperty("cmd");
var gui=_fe5.getProperty("gui");
var val=_fe5.getProperty("val");
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
var _fe9=this.bindingWindow.bindingMap.tinywindow;
var _fea=this.bindingWindow.bindingMap.codepresswindow;
if(_fe9){
EditorBinding.registerComponent(this,_fe9);
}else{
if(_fea){
EditorBinding.registerComponent(this,_fea);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_feb,_fec,_fed,_fee){
this._editorBinding=_feb;
this._tinyEngine=_fec;
this._tinyInstance=_fed;
this._tinyTheme=_fee;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_fef,_ff0,_ff1){
this._editorBinding=_fef;
this._codePressFrame=_ff0;
this._codePressEngine=_ff1;
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
var _ff3=this._editorBinding;
if(_ff3!=null){
var self=this;
var _ff5={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_ff3.hasBookmark()){
_ff3.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_ff3.hasBookmark()){
_ff3.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_ff5);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_ff5);
}
};
EditorClickButtonBinding.newInstance=function(_ff7){
var _ff8=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_ff7);
return UserInterface.registerBinding(_ff8,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_ff9){
var _ffa=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ff9);
return UserInterface.registerBinding(_ffa,EditorToolBarButtonBinding);
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
var _ffb=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_ffb);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_ffc,_ffd,_ffe,_fff){
this._editorBinding=_ffc;
this._tinyEngine=_ffd;
this._tinyInstance=_ffe;
this._tinyTheme=_fff;
};
EditorSelectorBinding.prototype.handleAction=function(_1000){
EditorSelectorBinding.superclass.handleAction.call(this,_1000);
switch(_1000.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_1000);
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
EditorMenuItemBinding.newInstance=function(_1003){
var _1004=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_1003);
return UserInterface.registerBinding(_1004,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_1005){
var i=0,_1007,_1008="",split=_1005.split(" ");
while((_1007=split[i])!=null){
if(_1007.length>=3&&_1007.substring(0,3)=="mce"){
_1007="";
}else{
if(_1007.length>=14&&_1007.substring(0,14)=="compositemedia"){
_1007="";
}
}
_1008+=_1007;
if(split[i+1]){
_1008+=" ";
}
i++;
}
return _1008;
};
VisualEditorBinding.getStructuredContent=function(_100a){
var _100b=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_100a);
if(soap instanceof SOAPFault){
}else{
_100b=soap.XhtmlFragment;
if(!_100b){
_100b="";
}
}
WebServiceProxy.isFaultHandler=true;
return _100b;
};
VisualEditorBinding.getTinyContent=function(_100d,_100e){
var _100f=null;
if(_100d==null||_100d==""){
_100d=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_100d);
if(soap instanceof SOAPFault){
var _1011=soap;
var _1012={handleDialogResponse:function(){
_100e.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_1012,_1011);
}else{
_100f=soap.XhtmlFragment;
if(_100f==null){
_100f=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _100f;
};
VisualEditorBinding.extractByIndex=function(html,index){
var _1015=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _1017=new List(doc.documentElement.childNodes);
var _1018=new List();
_1017.each(function(child){
if(child.nodeType==Node.ELEMENT_NODE){
_1018.add(child);
}
});
var _101a=_1018.get(index);
if(_101a==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_101a.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_101a.hasChildNodes()){
frag.appendChild(_101a.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_1015=DOMSerializer.serialize(doc.documentElement);
_1015=_1015.substring(_1015.indexOf(">")+1,_1015.length);
_1015=_1015.substring(0,_1015.lastIndexOf("<"));
}
}
}
if(_1015==null){
_1015=new String("");
}
return _1015;
};
VisualEditorBinding.isImage=function(_101c){
result=_101c&&_101c.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_101d){
return VisualEditorBinding.isImage(_101d)&&!VisualEditorBinding.isReservedElement(_101d);
};
VisualEditorBinding.isReservedElement=function(_101e){
if(VisualEditorBinding.isFunctionElement(_101e)){
return true;
}
if(VisualEditorBinding.isFieldElement(_101e)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_101e)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_101f){
return VisualEditorBinding.isImage(_101f)&&CSSUtil.hasClassName(_101f,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1020){
return VisualEditorBinding.isImage(_1020)&&CSSUtil.hasClassName(_1020,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1021){
return VisualEditorBinding.isImage(_1021)&&CSSUtil.hasClassName(_1021,VisualEditorBinding.HTML_CLASSNAME);
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
var _1022=this.getProperty("embedablefieldstypenames");
if(_1022!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1022);
}
var _1023=this.getProperty("formattingconfiguration");
if(_1023!=null){
this._url+="?config="+_1023;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
this.subscribe(BroadcastMessages.VISUALEDITOR_HACKED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1024,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1024,arg);
var _1026=this.getContentWindow().bindingMap.tinywindow;
var _1027=_1026.getContentWindow();
switch(_1024){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_1027){
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
if(arg.broadcastWindow==_1027){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1026);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_1028){
_1028.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_1029){
VisualEditorBinding.superclass._onPageInitialize.call(this,_1029);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_102c){
var _102d=_102c;
if(!this._isNormalizedDocument(_102c)){
_102d=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_102c);
}
return _102d;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_102e){
var _102f=false;
var doc=XMLParser.parse(_102e,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_102f=true;
}
}
if(Client.isWebKit){
if(_102e.indexOf("<html")!==0){
_102f=false;
}
}
return _102f;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1034=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1034){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1034=true;
}
return _1034;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1036=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1036);
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
VisualEditorBinding.prototype.setResult=function(_1038){
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
VisualEditorPopupBinding.prototype.configure=function(_1039,_103a,_103b){
var _103c=this.editorBinding.hasSelection();
this.tinyInstance=_1039;
this.tinyEngine=_103a;
this.tinyElement=_103b;
this.hasSelection=_103c;
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
}
};
VisualEditorPopupBinding.prototype._configureLinkGroup=function(){
var _1040=false;
if(this.hasSelection){
_1040=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1040=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1040=true;
}
}
}
}
if(_1040){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1041=this.getMenuItemForCommand("compositeInsertLink");
var _1042=this.getMenuItemForCommand("unlink");
var _1043=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1044=this.editorBinding.getButtonForCommand("unlink");
_1042.setDisabled(_1044.isDisabled);
if(_1042.isDisabled){
_1041.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1041.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1045=this.editorBinding.embedableFieldConfiguration;
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
if(_1045){
var _1048=_1045.getGroupNames();
if(_1048.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1048.each(function(_104c){
var _104d=_1045.getFieldNames(_104c);
_104d.each(function(_104e){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_104e);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_104c+":"+_104e);
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
var _1050=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1051=null;
var _1052=null;
if(_1050){
if(_1050.nodeName=="TD"){
_1051=_1050.getAttribute("colspan");
_1052=_1050.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1051=="1"&&_1052=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1050){
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
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_1053){
var _1054=VisualEditorFormattingConfiguration._configurations;
if(!_1054.has(_1053)){
_1054.set(_1053,new VisualEditorFormattingConfiguration());
}
return _1054.get(_1053);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1056){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1057){
var _1058=null;
var _1059=VisualEditorFieldGroupConfiguration._configurations;
if(!_1059.has(_1057)){
_1059.set(_1057,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1057)));
}
return _1059.get(_1057);
};
function VisualEditorFieldGroupConfiguration(_105a){
var _105b=new Map();
new List(_105a).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_105b.set(group.GroupName,map);
});
this._groups=_105b;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_105f){
return this._groups.get(_105f).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1060,_1061){
return this._groups.get(_1060).get(_1061).xhtml;
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
var _1063=this.getDescendantElementsByLocalName("textarea");
while(_1063.hasNext()){
var _1064=_1063.getNext();
if(_1064.getAttribute("selected")=="true"){
this._startContent=_1064.value;
this._textareaname=_1064.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1066=this.getContentWindow().bindingMap.templatetree;
_1066.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1067){
var _1068=_1066.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1068.textareaname);
_1067.consume();
}});
_1066.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1069){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _106a=this.getContentWindow().bindingMap.toolsplitter;
_106a.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _106b=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_106b.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_106b);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_106c){
this._textareas=new Map();
while(_106c.hasNext()){
var _106d=_106c.getNext();
var _106e=_106d.getAttribute("placeholderid");
this._textareas.set(_106e,{placeholderid:_106e,placeholdername:_106d.getAttribute("placeholdername"),placeholdermarkup:_106d.value,textareaelement:_106d,isSelected:_106d.getAttribute("selected")=="true"});
}
var _106f=new Map();
this._textareas.each(function(name,_1071){
var _1072=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1072.setLabel(_1071.placeholdername);
_1072.setImage("${icon:placeholder}");
_1072.setProperty("placeholder",true);
_1072.textareaname=name;
_106f.set(_1071.placeholdername,_1072);
if(_1071.isSelected){
selected=_1072;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1073=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1073.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1074=this.getContentWindow().bindingMap.templatetree;
var _1075=_1074.add(TreeNodeBinding.newInstance(_1074.bindingDocument));
_1075.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1075.setImage("${icon:warning}");
_1075.attach();
var _1076=this.getContentWindow().bindingMap.statusbar;
_1076.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1078=this._textareas.get(name);
var _1079=_1078.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1079));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_107a){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_107a;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _107b=this.getContentWindow().bindingMap.statusbar;
_107b.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_107a);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _107e="";
if(this._heads.has(this._textareaname)){
_107e=this._heads.get(this._textareaname);
if(_107e==null){
_107e=new String("");
}
}
return _107e;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1080){
_1080.textareaelement.value=_1080.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1081,_1082){
var _1083=_1081.getElementsByTagName("div").item(0);
var _1084=_1082.getElementsByTagName("div").item(0);
var _1085=new List(_1083.getElementsByTagName("textarea"));
var _1086=new List(_1084.getElementsByTagName("textarea"));
var _1087=false;
if(_1085.getLength()!=_1086.getLength()){
_1087=true;
}else{
var index=0;
_1085.each(function(_1089,index){
var _108b=_1086.get(index);
var newid=_1089.getAttribute("placeholderid");
var oldid=_108b.getAttribute("placeholderid");
var _108e=_1089.getAttribute("placeholdername");
var _108f=_108b.getAttribute("placeholdername");
if(newid!=oldid||_108e!=_108f){
_1087=true;
}
return !_1087;
});
}
if(_1087){
var html=null;
if(_1083.innerHTML!=null){
html=_1083.innerHTML;
}else{
html=DOMSerializer.serialize(_1083);
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
var _1093=this.getDescendantBindingByLocalName("selector");
_1093.attach();
this._populateTemplateSelector();
var _1094=this.getContentWindow().bindingMap.templateselector;
_1094.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _1095=this.getDescendantBindingByLocalName("selector");
var _1096=this.getContentWindow().bindingMap.templateselector;
_1095.selections.each(function(_1097){
_1097.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_1096.populateFromList(_1095.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _1098=this.getDescendantBindingByLocalName("selector");
var _1099=this.getContentWindow().bindingMap.templateselector;
_1098.selectByValue(_1099.getValue());
_1098.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_109a){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_109f,_10a0){
var _10a1=_10a0;
if(old.has(_109f)){
_10a1=old.get(_109f).placeholdermarkup;
}
return _10a1;
}
while(_109a.hasNext()){
var _10a2=_109a.getNext();
var _10a3=_10a2.getAttribute("placeholderid");
this._textareas.set(_10a3,{placeholderid:_10a3,placeholdername:_10a2.getAttribute("placeholdername"),placeholdermarkup:compute(_10a3,_10a2.value),textareaelement:_10a2,isSelected:_10a2.getAttribute("selected")=="true"});
}
var _10a4=null;
var _10a5=this.getContentWindow().bindingMap.templatetree;
var _10a6=new Map();
this._textareas.each(function(name,_10a8){
var _10a9=_10a5.add(TreeNodeBinding.newInstance(_10a5.bindingDocument));
_10a9.setLabel(_10a8.placeholdername);
_10a9.setImage("${icon:placeholder}");
_10a9.setProperty("placeholder",true);
_10a9.textareaname=name;
_10a6.set(_10a8.placeholdername,_10a9);
if(_10a8.isSelected){
_10a4=_10a9;
}
});
_10a5.attachRecursive();
if(_10a4!=null){
var _10aa=true;
if(this._oldtextareas.hasEntries()){
_10aa=false;
var map=new Map();
this._textareas.each(function(id,_10ad){
map.set(_10ad.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_10aa=true;
}
}
if(_10aa){
var _10ae=this._textareas.get(_10a4.textareaname);
this._textareaname=_10a4.textareaname;
this._placeholdername=_10ae.placeholdername;
this._setContentFromPlaceHolder(_10a4.textareaname);
_10a4.focus();
}else{
var _10af=_10a6.get(this._placeholdername);
this._textareaname=_10af.textareaname;
_10af.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_10b0,_10b1){
var _10b2=_10b0.getElementsByTagName("ui:selector").item(0);
var _10b3=_10b1.getElementsByTagName("ui:selector").item(0);
var _10b4=false;
if(_10b2!=null&&_10b3!=null){
var _10b5=new List(_10b2.getElementsByTagName("ui:selection"));
var _10b6=new List(_10b3.getElementsByTagName("ui:selection"));
if(_10b5.getLength()!=_10b6.getLength()){
_10b4=true;
}else{
_10b5.each(function(_10b7,index){
var _10b9=_10b7.getAttribute("value");
var _10ba=_10b6.get(index).getAttribute("value");
if(_10b9!=_10ba){
_10b4=true;
}
return !_10b4;
});
}
}
if(_10b4){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_10b2);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_10b0,_10b1);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_10bc,frame,_10be){
this._editorBinding=_10bc;
this._codePressFrame=frame;
this._codePressEngine=_10be;
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
var _10c4=this.getProperty("validate");
if(_10c4==true){
this._hasStrictValidation=true;
}
var _10c5=this.getProperty("validator");
if(_10c5!=null){
this._validator=_10c5;
}
this.syntax=this.getProperty("syntax");
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10c6,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10c6,arg);
switch(_10c6){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10c8=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10c8!=null){
var _10c9=_10c8.getContentWindow();
if(arg.broadcastWindow==_10c9){
this._codemirrorWindow=_10c9;
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
this.initializeEditorComponents(_10c8);
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
this.unsubscribe(_10c6);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10cd){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10cd);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10ce){
if(_10ce!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10ce;
EditorBinding.isActive=_10ce;
var _10cf=this.getContentWindow().standardEventHandler;
if(_10ce){
_10cf.enableNativeKeys(true);
}else{
_10cf.disableNativeKeys();
}
var _10d0=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10d0!=null){
if(_10ce){
_10d0.enable();
}else{
_10d0.disable();
}
}
if(_10ce){
this.focus();
var _10d1=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10d5=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10d5;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10d6){
_10d6.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10d8){
if(!this._isFinalized){
if(_10d8!=this._startContent){
this._startContent=_10d8;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10d8);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10d9=this.getContentWindow().bindingMap.editorpage.getContent();
return _10d9?_10d9:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10da){
if(this._pageBinding!=null){
this._pageBinding.cover(_10da);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10db){
if(_10db!=null&&this.shadowTree.dotnetinput!=null){
var value=_10db.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10dd=true;
var _10de=this.getContent();
if(this._validator!=null){
_10dd=Validator.validateInformed(_10de,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10dd=XMLParser.isWellFormedDocument(_10de,true);
if(_10dd==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10dd=this._isValidHTML(_10de);
break;
}
}
break;
}
}
return _10dd;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10e0=true;
var doc=XMLParser.parse(xml);
var _10e2=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10e2.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10e2.add("NamespaceURI");
}
var head=null,body=null;
var _10e6=new List(root.childNodes);
while(_10e6.hasNext()){
var child=_10e6.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10e2.add("MultipleHead");
}
if(body!=null){
_10e2.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10e2.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10e2.add("MissingHead");
}
if(body==null){
_10e2.add("MissingBody");
}
}
if(_10e2.hasEntries()){
_10e0=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10e2.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10e2.getFirst()));
}
}
return _10e0;
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
var _10e8=null;
var page=this._pageBinding;
if(page!=null){
_10e8=page.getCheckSum();
}
return _10e8;
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
ThrobberBinding.prototype.handleBroadcast=function(_10ea,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10ea,arg);
switch(_10ea){
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
ProgressBarBinding.notch=function(_10ed){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10ed);
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
ProgressBarBinding.prototype.notch=function(_10ef){
_10ef=_10ef?_10ef:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_10ef);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_10f1,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_10f1,arg);
switch(_10f1){
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
StartMenuItemBinding.prototype.setChecked=function(_10f3,_10f4){
StartMenuItemBinding.superclass.setChecked.call(this,_10f3,_10f4);
if(!_10f4){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_10f5){
var _10f6=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_10f5);
UserInterface.registerBinding(_10f6,StartMenuItemBinding);
return UserInterface.getBinding(_10f6);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_10f9,_10fa){
var _10fb=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_10fa,true)==true){
if(_10f9!="*"){
_10f9=KeySetBinding._sanitizeKeyModifiers(_10f9);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_10fb[doc]){
_10fb[doc]={};
}
if(!_10fb[doc][code]){
_10fb[doc][code]={};
}
_10fb[doc][code][_10f9]=_10fa;
}
};
KeySetBinding.handleKey=function(doc,e){
var _10ff=false;
var code=e.keyCode;
var _1101=KeySetBinding.keyEventHandlers;
if(_1101[doc]&&_1101[doc][code]){
var _1102="[default]";
_1102+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1102+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _1103=_1101[doc][code][_1102];
if(_1103==null){
_1103=_1101[doc][code]["*"];
}
if(_1103!=null){
_1103.handleKeyEvent(e);
_10ff=true;
}
}
return _10ff;
};
KeySetBinding._sanitizeKeyModifiers=function(_1104){
var _1105="[default]";
var mods={};
if(_1104){
new List(_1104.split(" ")).each(function(_1107){
mods[_1107]=true;
});
function check(_1108){
if(mods[_1108]){
_1105+=" "+_1108;
}
}
check("shift");
check("control");
}
return _1105;
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
var _110c=key.getAttribute("oncommand");
var _110d=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_110d){
DOMEvents.preventDefault(e);
}
var _110f=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_110c,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1110){
if(_1110 instanceof CursorBinding){
_1110.setOpacity(0);
_1110.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_1111){
_1110.setOpacity(Math.sin(_1111*Math.PI/180));
},onstop:function(){
_1110.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1112){
if(_1112 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_1113){
_1112.setOpacity(Math.cos(_1113*Math.PI/180));
},onstop:function(){
_1112.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1114,_1115,_1116){
if(_1114 instanceof CursorBinding){
_1116.x-=16;
_1116.y-=16;
new Animation({modifier:3,onstep:function(_1117){
var tal=Math.sin(_1117*Math.PI/180);
_1114.setPosition(new Point(((1-tal)*_1115.x)+((0+tal)*_1116.x),((1-tal)*_1115.y)+((0+tal)*_1116.y)));
},onstop:function(){
CursorBinding.fadeOut(_1114);
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
CursorBinding.prototype.setOpacity=function(_111d){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_111d);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_111d*100)+")";
}
this._opacity=_111d;
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
function setOpacity(_1120){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_1120);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1120*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_1121){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1121*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1123){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_1123);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1123*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1124){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1124*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1126){
if(_1126!=this._isBusy){
if(_1126){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1126;
}
};
CoverBinding.prototype.setTransparent=function(_1127){
if(_1127!=this._isTransparent){
if(_1127){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1127;
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
CoverBinding.prototype.setHeight=function(_1129){
if(_1129>=0){
this.bindingElement.style.height=new String(_1129+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_112a){
var _112b=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_112a);
return UserInterface.registerBinding(_112b,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _112d=UncoverBinding._bindingInstance;
if(Binding.exists(_112d)){
_112d.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1131){
this._isFading=_1131==true;
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
var _1132=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1132.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1132.clearRect(0,0,300,150);
_1132.fillRect(0,0,300,150);
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
var _1134=this._canvas.getContext("2d");
_1134.clearRect(0,0,300,150);
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
var _1135=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1135);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1136=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1136){
this._startcontent=_1136.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1137){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1137);
switch(_1137.type){
case WindowBinding.ACTION_ONLOAD:
if(_1137.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1137.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1137);
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
var _113b=this._transformer.transformToString(doc);
this._inject(_113b);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_113e){
this.getContentDocument().body.innerHTML=_113e;
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
var _1146=list.getNext();
var id=_1146.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1146);
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
var _1150=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1150.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1150.appendChild(att);
}
elm.appendChild(_1150);
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
var _115a=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_115a){
doc=XMLParser.parse(_115a);
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
var _115e=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_115e;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_115f,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_115f,arg);
switch(_115f){
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
var _1162=new List();
list.each(function(lang){
_1162.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1162);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1166){
switch(_1166){
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
var _1169=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1169,root);
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
var _116a=this.getProperty("status");
if(_116a!=null){
switch(_116a){
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
UserInterfaceMapping.prototype.merge=function(_116d){
for(var _116e in _116d.map){
this.map[_116e]=_116d.getBindingImplementation(_116e);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_116f){
var _1170=null;
var name=_116f.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_1170=this.map[name];
}
return _1170;
};
var UserInterface=new function(){
var _1173=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1174=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:imageinputdialog":ImageInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1173,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1175=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1177,impl){
var _1179=null;
if(!this.hasBinding(_1177)){
var _117a=DOMUtil.getParentWindow(_1177);
if(DOMUtil.getLocalName(_1177)!="bindingmapping"){
if(!impl&&_1177.getAttribute("binding")!=null){
var _117b=_1177.getAttribute("binding");
impl=_117a[_117b];
if(impl==null){
throw "No such binding in scope: "+_117b;
}
}
if(!impl){
var _117c=_117a.DocumentManager;
if(_117c){
var _117d=_117c.customUserInterfaceMapping;
if(_117d){
impl=_117d.getBindingImplementation(_1177);
}
}
}
if(!impl){
impl=_1174.getBindingImplementation(_1177);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1179=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1179){
var key=KeyMaster.getUniqueKey();
_1177.setAttribute("key",key);
_1179.key=key;
if(!_1177.id){
_1177.id=key;
}
keys[key]={element:_1177,binding:_1179};
_1179.onBindingRegister();
}
}
}
return _1179;
};
this.unRegisterBinding=function(_117f){
terminate(_117f);
};
function terminate(_1180){
if(Binding.exists(_1180)==true){
var key=_1180.key;
Binding.destroy(_1180);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1180=null;
}else{
_1175.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1182){
var _1183=null;
if(keys[_1182.key]){
_1183=keys[_1182.key].element;
}
return _1183;
};
this.getBinding=function(_1184){
var _1185=null;
if(_1184&&_1184.nodeType==Node.ELEMENT_NODE){
try{
var key=_1184.getAttribute("key");
if(key&&keys[key]){
_1185=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1184);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1185;
};
this.getBindingByKey=function(key){
var _1188=null;
if(keys[key]){
_1188=keys[key].binding;
}
return _1188;
};
this.hasBinding=function(_1189){
return this.getBinding(_1189)!=null;
};
this.isBindingVisible=function(_118a){
var _118b=Application.isOperational;
if(_118b==true){
var _118c=new Crawler();
_118c.type=NodeCrawler.TYPE_ASCENDING;
_118c.id="visibilitycrawler";
_118c.addFilter(function(_118d){
var b=UserInterface.getBinding(_118d);
var res=0;
if(!b.isVisible){
_118b=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_118c.crawl(_118a.bindingElement);
_118c.dispose();
}
return _118b;
};
var _1190=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_1190={};
for(var key in keys){
_1190[key]=true;
}
};
this.getPoint=function(){
var _1194=null;
if(_1190){
_1194=new List();
for(var key in keys){
if(!_1190[key]){
_1194.add(key);
}
}
}
return _1194;
};
this.clearPoint=function(){
_1190=null;
};
this.trackUndisposedBindings=function(){
var _1196=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1196){
_1196="Bindings illdisposed: ";
}
_1196+=entry.binding+" ";
}
}
if(_1196!=null){
_1175.error(_1196);
}
};
this.autoTrackDisposedBindings=function(_1199){
if(_1199){
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
SOAPRequest.newInstance=function(_119a,_119b){
var _119c=_119a+"/"+_119b;
var _119d=new SOAPRequest(_119c);
var _119e=SOAPRequest.resolver;
_119d.document=Templates.getTemplateDocument("soapenvelope.xml");
_119d.envelope=_119e.resolve("soap:Envelope",_119d.document);
_119d.header=_119e.resolve("soap:Header",_119d.envelope);
_119d.body=_119e.resolve("soap:Body",_119d.envelope);
return _119d;
};
SOAPRequest._parseResponse=function(_119f){
var _11a0=null;
var _11a1=false;
var doc=_119f.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_11a0=SOAPRequestResponse.newInstance(_119f.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_119f.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_11a1=true;
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
var text=_119f.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_11a1=true;
}else{
var cry="Invalid SOAP response: \n\n"+_119f.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_119f.responseText);
}
}
}
}
if(_11a1==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _11a0;
};
function SOAPRequest(_11a6){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_11a6;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _11a8=DOMUtil.getXMLHTTPRequest();
var _11a9=null;
_11a8.open("post",url,false);
_11a8.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11a8.setRequestHeader("SOAPAction",this.action);
try{
_11a8.send(this.document);
_11a9=SOAPRequest._parseResponse(_11a8);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_11a8=null;
return _11a9;
};
SOAPRequest.prototype.asyncInvoke=function(url,_11ac){
var _11ad=DOMUtil.getXMLHTTPRequest();
_11ad.open("post",url,true);
_11ad.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_11ad.setRequestHeader("SOAPAction",this.action);
_11ad.onreadystatechange=function(){
if(_11ad.readyState==4){
var _11ae=SOAPRequest._parseResponse(_11ad);
_11ac(_11ae);
_11ad=null;
}
};
_11ad.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _11af in this){
this[_11af]=null;
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
var _11b1=null;
if(doc&&doc.documentElement){
_11b1=new SOAPRequestResponse();
var _11b2=SOAPRequestResponse.resolver;
_11b1.document=doc;
_11b1.envelope=_11b2.resolve("soap:Envelope",_11b1.document);
_11b1.header=_11b2.resolve("soap:Header",_11b1.envelope);
_11b1.body=_11b2.resolve("soap:Body",_11b1.envelope);
var fault=_11b2.resolve("soap:Fault",_11b1.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_11b1.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_11b2.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_11b2.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _11b1;
};
function SOAPFault(_11b4,_11b5,_11b6){
this._operationName=_11b4;
this._operationAddress=_11b5;
this._faultString=_11b6;
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
SOAPFault.newInstance=function(_11b7,fault){
return new SOAPFault(_11b7.name,_11b7.address,fault.faultString);
};
function SOAPEncoder(wsdl,_11ba){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_11ba;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _11bc=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_11bc.body,this._operation);
var _11be=this._wsdl.getSchema();
var _11bf=_11be.lookup(this._operation);
var _11c0=_11bf.getListedDefinitions();
while(_11c0.hasNext()){
var def=_11c0.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _11bc;
};
SOAPEncoder.prototype._resolve=function(_11c4,_11c5,value){
var _11c7=this._wsdl.getSchema();
if(_11c5.isSimpleValue){
this._appendText(_11c4,value,_11c5.type=="string");
}else{
var _11c8=_11c7.lookup(_11c5.type);
if(_11c8 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11c8.getListedDefinitions();
if(_11c8.isArray){
var _11ca=new List(value);
var def=defs.getNext();
while(_11ca.hasNext()){
var elm=this._appendElement(_11c4,def.name);
var val=_11ca.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11c4,def.name);
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
SOAPEncoder.prototype._appendText=function(_11d1,value,_11d3){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11d6=false;
var i=0,c;
while(c=chars[i++]){
var _11d9=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11d9=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11d9=false;
}
break;
}
if(!_11d9){
safe+=c;
}else{
_11d6=true;
}
}
if(_11d6){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11d1.appendChild(_11d1.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11dc){
this._wsdl=wsdl;
this._operation=_11dc;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11e1){
var _11e2=null;
var _11e3=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11e5=this.resolve(id,_11e1.body);
var _11e6=_11e3.lookup(id);
var _11e7=_11e6.getListedDefinitions();
while(!_11e2&&_11e7.hasNext()){
var def=_11e7.getNext();
var elm=this.resolve(def.name,_11e5);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11e2=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11e2.importNode!=Types.UNDEFINED){
_11e2.appendChild(_11e2.importNode(e,true));
}else{
_11e2.loadXML(DOMSerializer.serialize(e));
}
}else{
_11e2=this._compute(elm,def);
}
}
return _11e2;
};
SOAPDecoder.prototype._compute=function(_11eb,_11ec){
var _11ed=null;
var _11ee=this._wsdl.getSchema();
if(_11ec.isSimpleValue){
_11ed=this._getSimpleValue(_11eb,_11ec.type);
}else{
var _11ef=_11ee.lookup(_11ec.type);
if(_11ef instanceof SchemaSimpleType){
_11ed=this._getSimpleValue(_11eb,_11ef.restrictionType);
}else{
var defs=_11ef.getListedDefinitions();
if(_11ef.isArray){
_11ed=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11eb);
while(elms.hasNext()){
var elm=elms.getNext();
_11ed.push(this._compute(elm,def));
}
}else{
_11ed={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11eb);
if(elm){
_11ed[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11ed;
};
SOAPDecoder.prototype._getSimpleValue=function(_11f4,type){
var _11f6=null;
if(_11f4.firstChild&&_11f4.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_11f4.childNodes.length>1){
_11f4.normalize();
}
_11f6=_11f4.firstChild.data;
switch(type){
case Schema.types.STRING:
_11f6=_11f6;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_11f6=Number(_11f6);
break;
case Schema.types.BOOLEAN:
_11f6=_11f6=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _11f6;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_11f7){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_11f7);
}
Schema.prototype._parseSchema=function(_11f8){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _11f9={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_11f8);
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
_11f9[rule.getAttribute("name")]=entry;
}
return _11f9;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_11fe){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_11fe);
}
SchemaDefinition.prototype._parse=function(_11ff){
var min=_11ff.getAttribute("minOccurs");
var max=_11ff.getAttribute("maxOccurs");
var type=_11ff.getAttribute("type");
this.name=_11ff.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1205=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1205;
}else{
var elm=_11ff.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1207,_1208){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1207,_1208);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1209,_120a){
var els=_1209.resolveAll("s:complexType/s:sequence/s:element",_120a);
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
function SchemaComplexType(_120c,_120d){
this._definitions=new List();
this._parseListedDefinitions(_120c,_120d);
this.isArray=_120d.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_120e,_120f){
var els=_120e.resolveAll("s:sequence/s:element",_120f);
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
function SchemaSimpleType(_1212,_1213){
this.restrictionType=null;
this._parse(_1212,_1213);
}
SchemaSimpleType.prototype._parse=function(_1214,_1215){
var _1216=_1214.resolve("s:restriction",_1215);
if(_1216){
this.restrictionType=_1216.getAttribute("base").split(":")[1];
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
var _1219=null;
var _121a=DOMUtil.getXMLHTTPRequest();
_121a.open("get",url,false);
_121a.send(null);
if(_121a.responseXML){
_1219=_121a.responseXML.documentElement;
}else{
alert(_121a.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1219;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _121b=new List();
var _121c=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_121c.hasEntries()){
while(_121c.hasNext()){
var _121d=_121c.getNext();
var name=_121d.getAttribute("name");
_121b.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _121b;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1220,_1221,_1222){
this.name=name;
this.address=_1220;
this.encoder=_1221;
this.decoder=_1222;
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
var _1226=wsdl.getOperations();
_1226.each(function(_1227){
proxy[_1227.name]=WebServiceProxy.createProxyOperation(_1227);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1228,_1229){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1229){
var log=_1229 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1228.address+": "+_1228.name+"\n\n";
log+=DOMSerializer.serialize(_1229.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_122b){
return function(){
var _122c=new List(arguments);
var _122d=null;
if(typeof (_122c.getLast())=="function"){
var _122e=_122c.extractLast();
var _122f=_122b.encoder.encode(_122c);
this._log(_122b,_122f);
var self=this;
var _1231=_122f.asyncInvoke(_122b.address,function(_1232){
self._log(_122b,_1232);
if(_1232){
if(_1232.fault){
_122d=SOAPFault.newInstance(_122b,_1232.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_122d,_122f,_1232);
}
}else{
if(WebServiceProxy.isDOMResult){
_122d=_1232.document;
}else{
_122d=_122b.decoder.decode(_1232);
}
}
}
_122f.dispose();
_122e(_122d);
});
}else{
var _122f=_122b.encoder.encode(new List(arguments));
this._log(_122b,_122f);
var _1231=_122f.invoke(_122b.address);
this._log(_122b,_1231);
if(_1231){
if(_1231.fault){
_122d=SOAPFault.newInstance(_122b,_1231.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_122d,_122f,_1231);
}
}else{
if(WebServiceProxy.isDOMResult){
_122d=_1231.document;
}else{
_122d=_122b.decoder.decode(_1231);
}
}
}
_122f.dispose();
return _122d;
}
};
};
WebServiceProxy.handleFault=function(_1233,_1234,_1235){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1233,soapRequest:_1234,soapResponse:_1235});
}
catch(exception){
alert(_1233.getFaultString());
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
var _1236=SystemLogger.getLogger("MessageQueue");
var _1237=null;
var _1238=0;
var _1239=null;
var _123a=new Map();
var _123b=new Map();
var _123c=false;
var _123d=false;
var _123e={"Main":DockBinding.MAIN,"External":DockBinding.EXTERNAL,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_1237=ConsoleMessageQueueService;
_1238=_1237.GetCurrentSequenceNumber("dummyparam!");
this.index=_1238;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_123c){
if(!MessageQueue._actions.hasEntries()){
var _123f=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_123d=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_123f;
_123d=false;
}
}
}
};
this._pokeserver=function(){
if(_123c==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_123d);
var _1240=_1237.GetMessages(Application.CONSOLE_ID,this.index);
if(_1240!=null){
if(Types.isDefined(_1240.CurrentSequenceNumber)){
var _1241=_1240.CurrentSequenceNumber;
if(_1241<this.index){
_1236.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_1241);
}
this.index=_1241;
var _1242=new List(_1240.ConsoleActions);
if(_1242.hasEntries()){
this.evaluate(_1242);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1236.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_1243){
var _1244=new List();
if(_1243.hasEntries()){
_1243.each(function(_1245){
if(this._index[_1245.Id]!=true){
_1244.add(_1245);
}
this._index[_1245.Id]=true;
},this);
if(_1244.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1244);
}else{
this._actions=_1244;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1246){
var _1247="(No reason)";
if(_1246!=null){
_1247=_1246.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1247);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_124b){
if(_124b==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _124c=null;
if(this._actions.hasEntries()){
var _124d=this._actions.extractFirst();
_1238=_124d.SequenceNumber;
_1236.debug("MessageQueue action: "+_124d.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_1238+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_124d.ActionType){
case "OpenView":
_124c=_124d.OpenViewParams;
if(_124c.ViewType=="ModalDialog"){
openDialogView(_124c);
}else{
_1239=_124c.ViewId;
openView(_124c);
}
break;
case "CloseView":
_124c=_124d.CloseViewParams;
_1239=_124c.ViewId;
closeView(_124c);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_124d.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_123a.countEntries()+"\n";
_123a.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1236.debug(debug);
if(!_123a.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_124d.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_124d.MessageBoxParams);
break;
case "OpenViewDefinition":
_124c=_124d.OpenViewDefinitionParams;
_1239=_124c.Handle;
openViewDefinition(_124c);
break;
case "LogEntry":
logEntry(_124d.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_124c=_124d.BroadcastMessageParams;
_1236.debug("Server says: EventBroadcaster.broadcast ( \""+_124c.Name+"\", "+_124c.Value+" )");
EventBroadcaster.broadcast(_124c.Name,_124c.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_123a.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_124d.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_124d.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_124d.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_124c=_124d.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_124c.ViewId,entityToken:_124c.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_124c=_124d.OpenGenericViewParams;
openGenericView(_124c);
break;
case "OpenExternalView":
_124c=_124d.OpenExternalViewParams;
openExternalView(_124c);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_124d.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_123d);
}
function logEntry(_1250){
var _1251=_1250.Level.toLowerCase();
SystemLogger.getLogger(_1250.SenderId)[_1251](_1250.Message);
}
function openView(_1252){
var list=paramsToList(_1252.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_1252.ViewId);
def.entityToken=_1252.EntityToken;
def.flowHandle=_1252.FlowHandle;
def.position=_123e[_1252.ViewType],def.label=_1252.Label;
def.image=_1252.Image;
def.toolTip=_1252.ToolTip;
def.argument={"url":_1252.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_1252.ViewId,entityToken:_1252.EntityToken,flowHandle:_1252.FlowHandle,position:_123e[_1252.ViewType],url:_1252.Url,label:_1252.Label,image:_1252.Image,toolTip:_1252.ToolTip}));
}
}
function openDialogView(_1255){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1255.ViewId,flowHandle:_1255.FlowHandle,position:Dialog.MODAL,url:_1255.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1256){
var _1257=_1256.DialogType.toLowerCase();
if(_1257=="question"){
throw "Not supported!";
}else{
Dialog[_1257](_1256.Title,_1256.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_1258){
var map={};
var _125a=false;
new List(_1258.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_125a=true;
});
var proto=ViewDefinitions[_1258.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1258.ViewId;
}
def.argument=_125a?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_125f){
var def=ViewDefinition.clone("Composite.Management.GenericView",_125f.ViewId);
def.label=_125f.Label;
def.toolTip=_125f.ToolTip;
def.image=_125f.Image;
def.argument={"url":_125f.Url,"list":paramsToList(_125f.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function openExternalView(_1261){
var def=ViewDefinition.clone("Composite.Management.ExternalView",_1261.ViewId);
def.label=_1261.Label;
def.toolTip=_1261.ToolTip;
def.image=_1261.Image;
def.url=_1261.Url,StageBinding.presentViewDefinition(def);
}
function closeView(_1263){
if(StageBinding.isViewOpen(_1263.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1263.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1264){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1264.ViewId,isSuccess:_1264.Succeeded});
}
this._lockSystem=function(_1265){
var _1266=top.bindingMap.offlinetheatre;
if(_1265){
_1266.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1266.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_123c=_1265;
};
this.handleBroadcast=function(_1268,arg){
switch(_1268){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1239!=null&&arg==_1239){
_1239=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_123a.set(arg,true);
}else{
_1236.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_123a.hasEntries()){
_123a.del(arg);
_1236.debug("Refreshed tree: "+arg+"\n("+_123a.countEntries()+" trees left!)");
if(!_123a.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_123b.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_123b.hasEntries()==true){
_123b.del(arg);
if(!_123b.hasEntries()){
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
function paramsToList(_126a){
var list=new List();
new List(_126a).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.ExternalView":new HostedViewDefinition({handle:"Composite.Management.ExternalView",isMutable:true,position:DockBinding.EXTERNAL,url:null,label:null,image:null,toolTip:null}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _126d=false;
var _126e=false;
var _126f=null;
var _1270=false;
var _1271=Client.qualifies();
var _1272="admin";
var _1273="123456";
this.fireOnLoad=function(){
if(_1271){
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
this.handleBroadcast=function(_1274){
switch(_1274){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1274);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1275=window.bindingMap.appwindow;
_1275.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1276){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1277){
if(_1276){
EventBroadcaster.subscribe(_1277,KickStart);
}else{
EventBroadcaster.unsubscribe(_1277,KickStart);
}
});
}
function kickStart(_1278){
switch(_1278){
case BroadcastMessages.AUDIO_INITIALIZED:
_126e=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_126d=true;
break;
}
if(_126d&&_126e){
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
DataManager.getDataBinding("username").setValue(_1272);
DataManager.getDataBinding("password").setValue(_1273);
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
this.doLogin=function(_127b,_127c){
var _127d=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _127e=false;
var _127f=LoginService.ValidateAndLogin(_127b,_127c);
if(_127f instanceof SOAPFault){
alert(_127f.getFaultString());
}else{
_127e=_127f;
}
if(_127e){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_127d){
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
var _1280=DataManager.getDataBinding("username");
var _1281=DataManager.getDataBinding("password");
_1280.blur();
_1281.blur();
_1280.setValue("");
_1281.setValue("");
_1280.clean();
_1281.clean();
_1280.focus();
document.getElementById("loginerror").style.display="block";
var _1282={handleAction:function(_1283){
document.getElementById("loginerror").style.display="none";
_1283.target.removeActionListener(Binding.ACTION_DIRTY,_1282);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1282);
}
WindowManager.fireOnLoad(this);
if(!_1271){
UpdateManager.isEnabled=false;
}
};

