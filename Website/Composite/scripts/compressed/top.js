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
var Cookies=new _Cookies();
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
var _515=/^(~?\/|(\.\.\/)+|https?:\/\/[\w\d\.:]*\/)media(\(|%28)[\w\d-]+(\)|%29)/;
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
var _67d=false,_67e=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_67e=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_67e=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_67e=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_67e=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_67e==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_67d=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_67e=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_67e=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_67e=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_67e=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_67e==ButtonStateManager.STATE_ACTIVE){
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
_67e=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_67e=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_67e=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_67e=ButtonStateManager.STATE_NORMAL;
_67d=true;
break;
}
}
}
}
switch(_67e){
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
var _682=this.imageProfile.getDisabledImage();
if(_682){
this.binding.setImage(_682);
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
ClickButtonBinding.newInstance=function(_683){
var _684=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_683);
return UserInterface.registerBinding(_684,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_685){
var _686=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_685);
return UserInterface.registerBinding(_686,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_687){
var _688=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_687);
return UserInterface.registerBinding(_688,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_689){
this._binding=_689;
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
var _68a=this.getDescendantBindingsByLocalName("control");
_68a.each(function(_68b){
_68b.setControlType(_68b.controlType);
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
ControlGroupBinding.newInstance=function(_68d){
var _68e=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_68d);
return UserInterface.registerBinding(_68e,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_691){
ControlBinding.superclass.handleAction.call(this,_691);
switch(_691.type){
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
function ControlImageProfile(_692){
this.binding=_692;
}
ControlImageProfile.prototype._getImage=function(_693){
var _694=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_694=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_694=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_694=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_694=this.constructor.IMAGE_CLOSE;
break;
}
return _694.replace("${string}",_693);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _695=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_695=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _695?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_696){
ControlBoxBinding.superclass.handleAction.call(this,_696);
switch(_696.type){
case ControlBinding.ACTION_COMMAND:
var _697=_696.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_697);
Application.unlock(self);
},0);
_696.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_699){
switch(_699.controlType){
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
ControlBoxBinding.prototype.setState=function(_69a){
var _69b=this.getState();
this.setProperty("state",_69a);
this.detachClassName(_69b);
this.attachClassName(_69a);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _69c=this.getProperty("state");
if(!_69c){
_69c=ControlBoxBinding.STATE_NORMAL;
}
return _69c;
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
MenuContainerBinding.prototype.isOpen=function(_69d){
var _69e=null;
if(!_69d){
_69e=this._isOpen;
}else{
_69e=(_69d==this._openElement);
}
return _69e;
};
MenuContainerBinding.prototype.setOpenElement=function(_69f){
if(_69f){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_69f;
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
var _6a0=this.getChildBindingByLocalName("menupopup");
if(_6a0&&_6a0!=this.menuPopupBinding){
this.menuPopupBinding=_6a0;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _6a1=this.getMenuContainerBinding();
_6a1.setOpenElement(this);
var _6a2=this.getMenuPopupBinding();
_6a2.snapTo(this.bindingElement);
_6a2.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_6a3){
MenuContainerBinding.superclass.handleAction.call(this,_6a3);
if(_6a3.type==PopupBinding.ACTION_HIDE){
var _6a4=this.getMenuContainerBinding();
_6a4.setOpenElement(false);
this.reset();
_6a3.consume();
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
MenuBarBinding.prototype.handleAction=function(_6a5){
MenuBarBinding.superclass.handleAction.call(this,_6a5);
switch(_6a5.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _6a6=_6a5.target;
var _6a7=this.getChildBindingsByLocalName("menu");
while(_6a7.hasNext()){
var menu=_6a7.getNext();
}
switch(_6a6.arrowKey){
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
var _6a9=this.getProperty("image");
var _6aa=this.getProperty("label");
var _6ab=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_6aa){
this.setLabel(_6aa);
}
if(_6a9){
this.setImage(_6a9);
}
if(_6ab){
this.setToolTip(_6ab);
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
MenuBinding.prototype.setLabel=function(_6ad){
this.setProperty("label",_6ad);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6ad));
}
};
MenuBinding.prototype.setToolTip=function(_6ae){
this.setProperty("tooltip",_6ae);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6ae));
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
var _6b0=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6b0.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6b0.isOpen()&&!_6b0.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6b0.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6b0.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6b1,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6b1){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6b6){
switch(_6b6.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6b7=null;
var _6b8=true;
self._lastFocused.focus();
self.grabKeyboard();
_6b6.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6ba){
for(var key in this._focused){
if(key!=_6ba.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6ba.key]=_6ba;
this._lastFocused=_6ba;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6bd){
delete this._focused[_6bd.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6be){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6be);
}
if(_6be){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6c1=this.getChildBindingsByLocalName("menugroup");
var _6c2=null;
var _6c3=null;
while(_6c1.hasNext()){
var _6c4=_6c1.getNext();
if(!_6c4.isDefaultContent){
_6c4.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6c2&&_6c4.isVisible){
_6c2=_6c4;
}
if(_6c4.isVisible){
_6c3=_6c4;
}
}
}
if(_6c2&&_6c3){
_6c2.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6c3.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6c5){
MenuBodyBinding.activeInstance=this;
if(_6c5){
var _6c6=this._getMenuItems().getFirst();
if(_6c6){
_6c6.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6c7=this._lastFocused;
if((_6c7!=null)&&(!_6c7.isMenuContainer)){
_6c7.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6c9=this._getMenuItems();
var _6ca=null;
var next=null;
if(this._lastFocused){
_6ca=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6c9.getPreceding(_6ca);
break;
case KeyEventCodes.VK_DOWN:
next=_6c9.getFollowing(_6ca);
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
next=_6c9.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6cd=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6ce){
_6cd=_6ce.getChildBindingsByLocalName("menuitem");
_6cd.each(function(item){
list.add(item);
});
});
_6cd=this.getChildBindingsByLocalName("menuitem");
_6cd.each(function(item){
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
MenuBodyBinding.newInstance=function(_6d2){
var _6d3=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6d2);
return UserInterface.registerBinding(_6d3,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6d4){
switch(_6d4){
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
MenuGroupBinding.newInstance=function(_6d5){
var _6d6=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6d5);
return UserInterface.registerBinding(_6d6,MenuGroupBinding);
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
var _6d7=this.getProperty("image");
var _6d8=this.getProperty("image-hover");
var _6d9=this.getProperty("image-active");
var _6da=this.getProperty("image-disabled");
if(!this.image&&_6d7){
this.image=_6d7;
}
if(!this.imageHover&&_6d8){
this.imageHover=_6d7;
}
if(!this.imageActive&&_6d9){
this.imageActive=_6d9;
}
if(!this.imageDisabled&&_6da){
this.imageDisabled=_6da;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6db=this.getProperty("label");
var _6dc=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6de=this.getProperty("isdisabled");
var _6df=this.getProperty("image");
var _6e0=this.getProperty("image-hover");
var _6e1=this.getProperty("image-active");
var _6e2=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6e3=this.getMenuPopupBinding();
if(_6e3){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6df){
this.image=_6df;
}
if(!this.imageHover&&_6e0){
this.imageHover=_6df;
}
if(!this.imageActive&&_6e1){
this.imageActive=_6e1;
}
if(!this.imageDisabled&&_6e2){
this.imageDisabled=_6e2;
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
if(_6db!=null){
this.setLabel(_6db);
}
if(_6dc){
this.setToolTip(_6dc);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6de==true){
this.disable();
}
var _6e4=this.getProperty("oncommand");
if(_6e4){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6e4);
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
MenuItemBinding.prototype.setLabel=function(_6e7){
this.setProperty("label",_6e7);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6e7));
}
};
MenuItemBinding.prototype.setToolTip=function(_6e8){
this.setProperty("tooltip",_6e8);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6e8));
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
var _6ea=this.bindingDocument.createElement("div");
_6ea.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6ea.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6eb=this.labelBinding.bindingElement;
_6eb.insertBefore(_6ea,_6eb.firstChild);
_6ea.style.display="none";
this.shadowTree.checkBoxIndicator=_6ea;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6ea=this.bindingDocument.createElement("div");
_6ea.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6ea.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6eb=this.labelBinding.bindingElement;
_6eb.insertBefore(_6ea,_6eb.firstChild);
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
var _6ed=this.imageProfile.getDisabledImage();
if(_6ed){
this.setImage(_6ed);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6ed=this.imageProfile.getDefaultImage();
if(_6ed){
this.setImage(_6ed);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6ef=this.getMenuContainerBinding();
if(_6ef.isOpen()&&!_6ef.isOpen(this)){
_6ef._openElement.hide();
_6ef.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6ef=this.getMenuContainerBinding();
if(!_6ef.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6f1){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6f2=this.getMenuContainerBinding();
if(!_6f2||!_6f2.isOpen(this)||_6f1){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6f3){
this.setChecked(true,_6f3);
};
MenuItemBinding.prototype.uncheck=function(_6f4){
this.setChecked(false,_6f4);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6f5,_6f6){
this.setProperty("ischecked",_6f5);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6f5){
this.isChecked=_6f5;
this.shadowTree.checkBoxIndicator.style.display=_6f5?"block":"none";
if(!_6f6){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6f7){
var _6f8=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6f7);
UserInterface.registerBinding(_6f8,MenuItemBinding);
return UserInterface.getBinding(_6f8);
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
PopupBinding.handleBroadcast=function(_6f9,arg){
switch(_6f9){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6fd=PopupBinding.activeInstances.get(key);
var _6fe=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6fd);
if(!_6fe){
list.add(_6fd);
}
});
list.each(function(_6ff){
_6ff.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _701=PopupBinding.activeInstances.get(key);
_701.hide();
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
var _702=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _703=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_702){
this._bodyBinding=UserInterface.getBinding(_702);
}else{
if(_703){
this._bodyBinding=UserInterface.getBinding(_703);
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
var _704=this.getProperty("position");
this.position=_704?_704:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_705){
var _706=null;
if(this._bodyBinding){
this._bodyBinding.add(_705);
_706=_705;
}else{
_706=PopupBinding.superclass.add.call(this,_705);
}
return _706;
};
PopupBinding.prototype.addFirst=function(_707){
var _708=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_707);
_708=_707;
}else{
_708=PopupBinding.superclass.addFirst.call(this,_707);
}
return _708;
};
PopupBinding.prototype.handleAction=function(_709){
PopupBinding.superclass.handleAction.call(this,_709);
var _70a=_709.target;
switch(_709.type){
case Binding.ACTION_ATTACHED:
if(_70a instanceof MenuItemBinding){
this._count(true);
_709.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_70a instanceof MenuItemBinding){
this._count(false);
_709.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_70b){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_70b?1:-1);
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
PopupBinding.prototype.snapTo=function(_70c){
var _70d=this._getElementPosition(_70c);
switch(this.position){
case PopupBinding.POSITION_TOP:
_70d.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_70d.x+=_70c.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_70d.y+=_70c.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_70d.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_70c;
this.bindingElement.style.display="block";
this.setPosition(_70d.x,_70d.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_70f){
this.bindingElement.style.display="block";
this.setPosition(_70f.x,_70f.y);
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
PopupBinding.prototype._getElementPosition=function(_714){
return _714.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_714):DOMUtil.getUniversalPosition(_714);
};
PopupBinding.prototype._getMousePosition=function(e){
var _716=DOMEvents.getTarget(e);
return _716.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_717){
var _718=this.bindingElement;
if(_717){
if(Client.hasTransitions){
_718.style.visibility="visible";
_718.style.opacity="1";
}else{
_718.style.visibility="visible";
}
}else{
_718.style.visibility="hidden";
_718.style.display="none";
if(Client.hasTransitions){
_718.style.opacity="0";
}
}
this.isVisible=_717;
};
PopupBinding.prototype._enableTab=function(_719){
var self=this;
var _71b=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_71b.each(function(_71c){
_71c.bindingElement.tabIndex=_719?0:-1;
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
var _724=DOMUtil.getGlobalPosition(this.targetElement);
if(y+_724.y<0){
y=-_724.y;
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
PopupBinding.prototype.grabKeyboard=function(_726){
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
var _72c=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_72c=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _72c;
};
PopupBinding.prototype.clear=function(){
var _72d=this._bodyBinding;
if(_72d){
_72d.detachRecursive();
_72d.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_72e){
var _72f=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_72e);
return UserInterface.registerBinding(_72f,PopupBinding);
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
PopupBodyBinding.newInstance=function(_731){
var _732=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_731);
return UserInterface.registerBinding(_732,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_733){
return new Point(_733.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_734){
var _735=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_734);
return UserInterface.registerBinding(_735,MenuPopupBinding);
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
var _736=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_736){
this._body=UserInterface.getBinding(_736);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _737=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_737.hasNext()){
var _738=DialogBorderBinding.newInstance(this.bindingDocument);
_738.setType(_737.getNext());
this.add(_738);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _739=this.getProperty("controls");
if(_739){
var _73a=new List(_739.split(" "));
while(_73a.hasNext()){
var type=_73a.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _73c=DialogControlBinding.newInstance(this.bindingDocument);
_73c.setControlType(type);
this._titlebar.addControl(_73c);
this.controlBindings[type]=_73c;
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
var _73d=this.getProperty("image");
var _73e=this.getProperty("label");
var _73f=this.getProperty("draggable");
var _740=this.getProperty("resizable");
var _741=this.getProperty("modal");
if(_73d){
this.setImage(_73d);
}
if(_73e){
this.setLabel(_73e);
}
if(_73f==false){
this.isDialogDraggable=false;
}
if(_740==false){
this.isPanelResizable=false;
}
if(_741==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_742){
this.isModal=_742;
};
DialogBinding.prototype.setLabel=function(_743){
this.setProperty("label",_743);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_743));
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
DialogBinding.prototype.handleAction=function(_745){
DialogBinding.superclass.handleAction.call(this,_745);
switch(_745.type){
case Binding.ACTION_DRAG:
var _746=_745.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_746.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_746.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_746;
_746.dragger.registerHandler(this);
}
break;
}
}
_745.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_745.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_747,arg){
DialogBinding.superclass.handleBroadcast.call(this,_747,arg);
switch(_747){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_749){
DialogBinding.superclass.handleInvokedControl.call(this,_749);
switch(_749.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_74a){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_74a){
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
var _74c=self.bindingElement;
setTimeout(function(){
_74c.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_74d){
this.bindingElement.style.zIndex=new String(_74d);
};
DialogBinding.prototype.onDragStart=function(_74e){
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
DialogBinding.prototype.setResizable=function(_760){
if(this._isResizable!=_760){
if(_760){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_760;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _761=null;
var _762=this.bindingDocument.body.offsetWidth;
var _763=this.bindingDocument.body.offsetHeight;
_761={x:0.125*_762,y:0.125*_763,w:0.75*_762,h:0.5*_763};
return _761;
};
DialogBinding.prototype.centerOnScreen=function(){
var _764=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_764.w-dim.w),0.5*(_764.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _766=this;
var i=0;
function blink(){
if(i%2==0){
_766.detachClassName("active");
}else{
_766.attachClassName("active");
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
var _76a="";
while(list.hasNext()){
var type=list.getNext();
_76a+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_76a);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_76b){
var _76c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_76b);
return UserInterface.registerBinding(_76c,DialogBinding);
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
DialogHeadBinding.newInstance=function(_76d){
var _76e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_76d);
return UserInterface.registerBinding(_76e,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_771){
var _772=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_771);
return UserInterface.registerBinding(_772,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_773){
var _774=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_773);
return UserInterface.registerBinding(_774,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_775){
DialogSetBinding.superclass.handleAction.call(this,_775);
var _776=_775.target;
switch(_775.type){
case Binding.ACTION_MOVETOTOP:
if(_776 instanceof DialogBinding){
this._moveToTop(_776);
}
break;
case Binding.ACTION_MOVEDONTOP:
_775.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_777){
var _778=0;
var _779=this.getChildBindingsByLocalName("dialog");
_779.each(function(_77a){
var _77b=_77a.getZIndex();
_778=_77b>_778?_77b:_778;
});
_777.setZIndex(_778+2);
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
DialogBorderBinding.newInstance=function(_77d){
var _77e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_77d);
return UserInterface.registerBinding(_77e,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_77f){
this._dialogBinding=_77f;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_781){
DialogCoverBinding.superclass.handleAction.call(this,_781);
var _782=_781.target;
if(this._dialogBinding.isModal){
switch(_781.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_782==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_782.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_783,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_783,arg);
switch(_783){
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
var _786=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_786);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _787=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_787);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_788){
var _789=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_788);
return UserInterface.registerBinding(_789,DialogCoverBinding);
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
var _78a=this.getProperty("image");
if(_78a){
this.setImage(_78a);
}
var _78b=this.getProperty("label");
if(_78b){
this.setLabel(_78b);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_78c){
if(this.isAttached){
this.labelBinding.setLabel(_78c);
}
this.setProperty("label",_78c);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_78e){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_78e);
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
DialogTitleBarBinding.newInstance=function(_78f){
var _790=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_78f);
return UserInterface.registerBinding(_790,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_791){
var _792=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_791);
return UserInterface.registerBinding(_792,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_793){
var _794=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_793);
return UserInterface.registerBinding(_794,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_795){
this.binding=_795;
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
var _798=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _799=node.nodeName.toLowerCase();
switch(_799){
case "script":
case "style":
case "textarea":
_798=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _798;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _7a0=true;
if(exp.test(text)){
self._textnodes.add(node);
_7a0=false;
}
return _7a0;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_7a1,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_7a1,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _7a5=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_7a5+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_7ab){
var _7ac="";
var _7ad="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _7ae="</span>";
var self=this;
function iterate(_7b0){
var _7b1=-1;
var _7b2=null;
self._map.each(function(key,exp){
var low=_7b0.toLowerCase();
var _7b6=low.search(exp);
if(_7b6>-1){
if(_7b1==-1){
_7b1=_7b6;
}
if(_7b6<=_7b1){
_7b1=_7b6;
_7b2=key;
}
}
});
if(_7b1>-1&&_7b2!=null){
var pre=_7b0.substring(0,_7b1);
var hit=_7b0.substring(_7b1,_7b1+_7b2.length);
var pst=_7b0.substring(_7b1+_7b2.length,_7b0.length);
_7ac+=pre+_7ad+hit+_7ae;
iterate(pst);
}else{
_7ac+=_7b0;
}
}
iterate(_7ab);
return _7ac;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7ba){
var _7bb=new List(_7ba.getElementsByTagName("span"));
_7bb.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7ba.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7be){
var _7bf=null;
if(_7be.isAttached){
var doc=_7be.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7bf=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7bf instanceof SOAPFault){
_7bf=null;
}
}
}
return _7bf;
};
WindowBinding.highlightKeywords=function(_7c3,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7c3.isAttached){
var doc=_7c3.getContentDocument();
if(doc!=null){
var _7c6=WindowBinding._highlightcrawler;
_7c6.reset(doc.body);
if(list!=null){
_7c6.setKeys(list);
_7c6.crawl(doc.body);
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
var _7c7=WindowBinding.superclass.serialize.call(this);
if(_7c7){
_7c7.url=this.getURL();
}
return _7c7;
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
var _7c9=this.getContentWindow().DocumentManager;
if(_7c9!=null){
_7c9.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7ca){
WindowBinding.superclass.handleAction.call(this,_7ca);
var _7cb=_7ca.target;
switch(_7ca.type){
case RootBinding.ACTION_PHASE_3:
if(_7cb.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7cb);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7ca.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7cc){
if(!this.isFit||_7cc){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7cd){
if(this._pageBinding==null){
if(_7cd.bindingWindow==this.getContentWindow()){
this._pageBinding=_7cd;
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
WindowBinding.prototype._registerOnloadListener=function(_7ce){
var _7cf=this.shadowTree.iframe;
var _7d0=_7ce?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7d3=true;
if(Client.isExplorer){
_7d3=_7cf.readyState=="complete";
}
if(_7d3==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7d0](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7d4){
var _7d5=_7d4?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7d5](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7d9=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7d9=url;
}
return _7d9;
};
WindowBinding.prototype.reload=function(_7db){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7dc=null;
if(this.shadowTree.iframe!=null){
_7dc=this.shadowTree.iframe;
}
return _7dc;
};
WindowBinding.prototype.getContentWindow=function(){
var _7dd=null,_7de=this.getFrameElement();
if(_7de!==null){
try{
_7dd=_7de.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7dd;
};
WindowBinding.prototype.getContentDocument=function(){
var _7df=null,win=this.getContentWindow();
if(win){
_7df=win.document;
}
return _7df;
};
WindowBinding.prototype.getRootBinding=function(){
var _7e1=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7e1=UserInterface.getBinding(doc.body);
}
return _7e1;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7e3){
this.bindingElement.style.height=_7e3+"px";
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
WindowBinding.prototype.handleCrawler=function(_7e4){
WindowBinding.superclass.handleCrawler.call(this,_7e4);
if(_7e4.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7e4.nextNode=root.bindingElement;
}else{
_7e4.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7e9){
var _7ea=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7e9);
var _7eb=UserInterface.registerBinding(_7ea,WindowBinding);
return _7eb;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7ef){
_7ef.target.show();
_7ef.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7f1){
_7f1.target.show();
_7f1.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7f3){
PreviewWindowBinding.superclass.handleAction.call(this,_7f3);
switch(_7f3.type){
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
var _7f4=null;
this._getRadioButtonBindings().each(function(_7f5){
if(_7f5.getProperty("ischecked")){
_7f4=_7f5;
return false;
}else{
return true;
}
});
if(_7f4){
this._checkedRadioBinding=_7f4;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7f6){
RadioGroupBinding.superclass.handleAction.call(this,_7f6);
var _7f7=_7f6.target;
switch(_7f6.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7f6.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7f7.isRadioButton&&!_7f7.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7f7);
}
this._checkedRadioBinding=_7f7;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7f6.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7f8,_7f9){
if(_7f8 instanceof RadioDataBinding){
_7f8=_7f8.getButton();
}
if(_7f8.isRadioButton){
switch(_7f9){
case true:
this._unCheckRadioBindingsExcept(_7f8);
this._checkedRadioBinding=_7f8;
_7f8.check(true);
break;
default:
_7f8.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7fa){
var _7fb=this._getRadioButtonBindings();
_7fb.each(function(_7fc){
if(_7fc.isChecked&&_7fc!=_7fa){
_7fc.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7fd=new Crawler();
var list=new List();
_7fd.addFilter(function(_7ff){
var _800=true;
var _801=UserInterface.getBinding(_7ff);
if(_801 instanceof RadioGroupBinding){
_800=NodeCrawler.SKIP_CHILDREN;
}else{
if(_801 instanceof ButtonBinding&&_801.isRadioButton){
list.add(_801);
}
}
return _800;
});
_7fd.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_802){
var _803=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_802);
return UserInterface.registerBinding(_803,RadioGroupBinding);
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
var _805=this.getProperty("regexrule");
if(_805!=null){
this.expression=new RegExp(_805);
}
var _806=this.getProperty("onbindingblur");
if(_806!=null){
this.onblur=function(){
Binding.evaluate(_806,this);
};
}
var _807=this.getProperty("onvaluechange");
if(_807!=null){
this.onValueChange=function(){
Binding.evaluate(_807,this);
};
}
if(this.error==null&&this.type!=null){
var _808=DataBinding.errors[this.type];
if(_808!=null){
this.error=_808;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _809=this.getProperty("value");
if(_809!=null){
this.setValue(String(_809));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _80b=this.getProperty("isdisabled");
if(_80b==true){
this.setDisabled(true);
}
var _80c=this.getProperty("readonly");
if(_80c==true){
this.setReadOnly(true);
}
var _80d=this.getProperty("autoselect");
if(_80d==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
var _80e=Localization.currentLang();
if(_80e!=null){
this.shadowTree.input.setAttribute("spellcheck","true");
this.shadowTree.input.setAttribute("lang",Localization.currentLang());
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
var _80f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_80f.type=this.isPassword==true?"password":"text";
_80f.tabIndex=-1;
return _80f;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_812){
if(_812){
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
DataInputBinding.prototype.handleBroadcast=function(_815,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_815,arg);
var self=this;
switch(_815){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _818=DOMEvents.getTarget(arg);
if(_818!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_819){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_819){
var self=this,_81b=this.bindingElement,_81c={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_81b,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_81b,DOMEvents.MOUSEUP,_81c);
}else{
this.select();
}
}
this.onfocus();
if(!_819){
var _81d=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_81d);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _81e=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _81f=_81e.createTextRange();
_81f.moveStart("character",0);
_81f.moveEnd("character",_81e.value.length);
_81f.select();
}else{
_81e.setSelectionRange(0,_81e.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_820){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_820){
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
DataInputBinding.prototype.validate=function(_824){
if(_824==true||this._isValid){
var _825=this.isValid();
if(_825!=this._isValid){
this._isValid=_825;
if(!_825){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _826=null;
if(this._isInvalidBecauseRequired==true){
_826=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_826=DataBinding.warnings["minlength"];
_826=_826.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_826=DataBinding.warnings["maxlength"];
_826=_826.replace("${count}",String(this.maxlength));
}else{
_826=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_826!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_826);
}
}else{
this.setValue(_826);
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
var _827=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _828=this.getValue();
if(_828==""){
if(this.isRequired==true){
_827=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _829=DataBinding.expressions[this.type];
if(!_829.test(_828)){
_827=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_828)){
_827=false;
}
}
}
}
if(_827&&this.minlength!=null){
if(_828.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_827=false;
}
}
if(_827&&this.maxlength!=null){
if(_828.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_827=false;
}
}
return _827;
};
DataInputBinding.prototype.setDisabled=function(_82a){
if(_82a!=this.isDisabled){
if(_82a){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _82b=this.shadowTree.input;
if(_82a){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_82b,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_82b,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_82a;
this.shadowTree.input.unselectable=_82a?"on":"off";
}
this.isDisabled=_82a;
this.isFocusable=!_82a;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_82d){
if(_82d!=this.isReadOnly){
if(_82d){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_82d;
this.isReadOnly=_82d;
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
DataInputBinding.prototype.handleElement=function(_82e){
return true;
};
DataInputBinding.prototype.updateElement=function(_82f){
var _830=_82f.getAttribute("value");
var _831=_82f.getAttribute("type");
var _832=_82f.getAttribute("maxlength");
var _833=_82f.getAttribute("minlength");
if(_830==null){
_830="";
}
var _834=this.bindingWindow.UpdateManager;
if(this.getValue()!=_830){
_834.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_830);
}
if(this.type!=_831){
_834.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_831;
}
if(this.maxlength!=_832){
_834.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_832;
}
if(this.minlength!=_833){
_834.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_833;
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
DataInputBinding.prototype.setValue=function(_835){
if(_835===null){
_835="";
}
if(_835!=this.getValue()){
this.setProperty("value",_835);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_835);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _836=null;
if(this.shadowTree.input!=null){
_836=this.shadowTree.input.value;
}else{
_836=this.getProperty("value");
}
return _836;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _838=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_838=Number(_838);
break;
}
return _838;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_839){
var _83a=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_839);
return UserInterface.registerBinding(_83a,DataInputBinding);
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
var _83b=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_83b!=null){
this.setValue(_83b.value);
_83b.parentNode.removeChild(_83b);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
var _83c=Localization.currentLang();
if(_83c!=null){
this.shadowTree.input.setAttribute("spellcheck","true");
this.shadowTree.input.setAttribute("lang",Localization.currentLang());
}else{
this.shadowTree.input.setAttribute("spellcheck","false");
}
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
var _866=this.getProperty("isdisabled");
if(this.isDisabled||_866){
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
if(_885.isSelected){
this.select(_88a,true);
}
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
if(Client.isMozilla==true){
_895.style.minWidth=_894;
}else{
_895.style.width=_894;
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
SelectorBinding.prototype.handleBroadcast=function(_897,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_897,arg);
switch(_897){
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
SelectorBinding.prototype.select=function(_89a,_89b){
var _89c=false;
if(_89a!=this._selectedItemBinding){
this._selectedItemBinding=_89a;
_89c=true;
var _89d=this._buttonBinding;
this._selectionValue=_89a.selectionValue;
_89d.setLabel(_89a.getLabel());
if(_89a.imageProfile!=null){
_89d.imageProfile=_89a.imageProfile;
}
if(_89d.imageProfile!=null){
_89d.setImage(this.isDisabled==true?_89d.imageProfile.getDisabledImage():_89d.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_89b){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_89b)){
this.validate();
}
}
return _89c;
};
SelectorBinding.prototype._relate=function(){
var _89e=this.getProperty("relate");
if(_89e){
var _89f=this.bindingDocument.getElementById(_89e);
if(_89f){
var _8a0=UserInterface.getBinding(_89f);
if(_8a0){
if(this.isChecked){
_8a0.show();
}else{
_8a0.hide();
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
SelectorBinding.prototype.selectByValue=function(_8a1,_8a2){
var _8a3=false;
var _8a4=this._menuBodyBinding;
var _8a5=_8a4.getDescendantElementsByLocalName("menuitem");
while(_8a5.hasNext()){
var _8a6=UserInterface.getBinding(_8a5.getNext());
if(_8a6.selectionValue==_8a1){
_8a3=this.select(_8a6,_8a2);
break;
}
}
return _8a3;
};
SelectorBinding.prototype.getValue=function(){
var _8a7=this._selectionValue;
if(_8a7!=null){
_8a7=String(_8a7);
}
return _8a7;
};
SelectorBinding.prototype.setValue=function(_8a8){
this.selectByValue(String(_8a8),true);
};
SelectorBinding.prototype.getResult=function(){
var _8a9=this._selectionValue;
if(_8a9=="null"){
_8a9=null;
}
if(_8a9){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_8a9=Number(_8a9);
break;
}
}
return _8a9;
};
SelectorBinding.prototype.setResult=function(_8aa){
this.selectByValue(_8aa,true);
};
SelectorBinding.prototype.validate=function(){
var _8ab=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _8ac=this.getValue();
if(_8ac==this.defaultSelection.value){
_8ab=false;
}
if(_8ab!=this._isValid){
if(_8ab){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_8ab;
}
return _8ab;
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
var _8ad=this._popupBinding;
if(!this._isUpToDate){
_8ad.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_8ae,_8af){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_8ae));
return true;
};
SelectorBinding.newInstance=function(_8b0){
var _8b1=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_8b0);
return UserInterface.registerBinding(_8b1,SelectorBinding);
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
var _8b4=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8b4){
this.onValueChange=function(){
Binding.evaluate(_8b4,this);
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
SimpleSelectorBinding.prototype.focus=function(_8b7){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8b7){
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
SimpleSelectorBinding.prototype._hack=function(_8b8){
if(Client.isExplorer){
this._select.style.width=_8b8?"auto":this._cachewidth+"px";
if(_8b8){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8b9=true;
if(this.isRequired){
if(this.getValue()==null){
_8b9=false;
}
}
if(_8b9!=this._isValid){
if(_8b9){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8ba=this._select;
var _8bb=_8ba.options[_8ba.selectedIndex];
var text=DOMUtil.getTextContent(_8bb);
_8ba.blur();
_8ba.style.color="#A40000";
_8ba.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8bb,DataBinding.warnings["required"]);
}
_8ba.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8bb,text);
}
};
}
this._isValid=_8b9;
}
return _8b9;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8bd=null;
var _8be=this._select;
var _8bf=_8be.options[_8be.selectedIndex];
var _8c0=true;
if(Client.isExplorer){
var html=_8bf.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8c0=false;
}
}
if(_8c0){
_8bd=_8bf.getAttribute("value");
}
return _8bd;
};
SimpleSelectorBinding.prototype.setValue=function(_8c2){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8c3){
this.setValue(_8c3);
};
SimpleSelectorBinding.newInstance=function(_8c4){
var _8c5=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8c4);
return UserInterface.registerBinding(_8c5,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8c6,_8c7,_8c8,_8c9,_8ca){
this._init(_8c6,_8c7,_8c8,_8c9,_8ca);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8cb,_8cc,_8cd,_8ce,_8cf){
if(_8cb!=null){
this.label=String(_8cb);
}
if(_8cc!=null){
this.value=String(_8cc);
}
if(_8ce!=null){
this.imageProfile=_8ce;
}
if(_8cf!=null){
this.tooltip=_8cf;
}
this.isSelected=_8cd?true:false;
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
var _8d0=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8d0.popupBindingTargetElement=this.shadowTree.input;
_8d0.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8d0.attach();
var self=this;
_8d0.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8d0;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8d3=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8d3).each(function(_8d4){
if(_8d4.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8d5=_8d4.getAttribute("value");
var _8d6=_8d4.getAttribute("selected");
var _8d7=_8d4.getAttribute("tooltip");
list.add({value:_8d5?_8d5:null,toolTip:_8d7?_8d7:null,isSelected:(_8d6&&_8d6=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8d9=this._menuBodyBinding;
var _8da=_8d9.bindingDocument;
while(_8d9.bindingElement.hasChildNodes()){
var node=_8d9.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8d9.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8dc=list.getNext();
var _8dd=MenuItemBinding.newInstance(_8da);
_8dd.setLabel(_8dc.value);
_8dd.selectionValue=_8dc.value;
if(_8dc.toolTip){
_8dd.setToolTip(_8dc.toolTip);
}
if(_8dc.isSelected){
this.select(_8dd,true);
}
_8d9.add(_8dd);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8de){
this.select(_8de);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8df,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8df,arg);
switch(_8df){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8df,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8e1){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8e1);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8e2){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8e2);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8e3=this.bindingElement.offsetWidth+"px";
var _8e4=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8e4.style.minWidth=_8e3;
}else{
_8e4.style.width=_8e3;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8e5=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8e6=this.getValue();
var _8e7=null;
_8e5.each(function(item){
if(item.getLabel()==_8e6){
_8e7=item;
}
});
if(_8e7){
_8e7.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8ea){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8ea){
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
var _8eb=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8eb.setImage("${icon:popup}");
this.addFirst(_8eb);
_8eb.attach();
var self=this;
_8eb.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8ed=self.getProperty("handle");
var _8ee=ViewDefinitions[_8ed];
if(_8ee instanceof DialogViewDefinition){
_8ee.handler={handleDialogResponse:function(_8ef,_8f0){
self._isButtonClicked=false;
if(_8ef==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8f1=_8f0.getFirst();
self.setValue(_8f1);
self.validate(true);
}
self.focus();
}};
_8ee.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8ee);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8eb.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8eb;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8f3=this._dialogButtonBinding;
if(_8f3!=null){
_8f3.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8f5=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8f5=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8f5;
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
var _8f8=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8f8.setImage("${icon:popup}");
this.addFirst(_8f8);
_8f8.attach();
var self=this;
_8f8.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8fa=ViewDefinitions[self.handle];
if(_8fa instanceof DialogViewDefinition){
_8fa.handler={handleDialogResponse:function(_8fb,_8fc){
self._isButtonClicked=false;
if(_8fb==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into ImageInputDialogBinding#buildButton");
var _8fd=_8fc.getFirst();
self.setValue(_8fd);
self.validate(true);
self.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
}
self.focus();
}};
_8fa.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8fa);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8f8.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8f8;
};
ImageInputDialogBinding.prototype.oncommand=function(){
var _8ff=this._dialogButtonBinding;
if(_8ff!=null){
_8ff.oncommand();
}
};
ImageInputDialogBinding.prototype.onblur=function(){
ImageInputDialogBinding.superclass.onblur.call(this);
this.dispatchAction(ImageInputDialogBinding.IMAGE_SELECTED);
};
ImageInputDialogBinding.prototype.validate=function(arg){
var _901=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_901=ImageInputDialogBinding.superclass.validate.call(this,arg);
}
return _901;
};
ImageInputDialogBinding.prototype.setValue=function(_902){
if(this.isReadOnly){
this.value=_902;
this.shadowTree.input.value=TreeService.GetMediaLabel(_902);
}else{
ImageInputDialogBinding.superclass.setValue.call(this,_902);
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
ImageInputDialogBinding.prototype.setReadOnly=function(_903){
var _904=this.isReadOnly;
ImageInputDialogBinding.superclass.setReadOnly.call(this,_903);
if(_904==true&&_903==false){
ImageInputDialogBinding.superclass.setValue.call(this,this.value);
}
if(_904==false&&_903==true){
this.value=ImageInputDialogBinding.superclass.getValue.call(this);
this.shadowTree.input.value=TreeService.GetMediaLabel(this.value);
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
var _905=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _906=this.getProperty("image");
if(_906!=null){
_905.setImage(_906);
}else{
_905.setImage("${icon:popup}");
}
this.addFirst(_905);
_905.attach();
var self=this;
_905.oncommand=function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
this._dialogButtonBinding=_905;
};
DataInputButtonBinding.prototype.oncommand=function(){
var _908=this._dialogButtonBinding;
if(_908!=null){
_908.oncommand();
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
var _909=this.getProperty("label");
var _90a=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_909!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_909+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_909);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_90a!=null){
this._buttonBinding.setToolTip(_90a);
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
DataDialogBinding.prototype.handleAction=function(_90c){
DataDialogBinding.superclass.handleAction.call(this,_90c);
var _90d=_90c.target;
var self=this;
switch(_90c.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_90f,_910){
if(_90f==Dialog.RESPONSE_ACCEPT){
if(_910 instanceof DataBindingMap){
self._map=_910;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_90d==this._buttonBinding){
_90c.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_911,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_911,arg);
switch(_911){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _914=this.getProperty("handle");
var url=this.getURL();
var _916=null;
if(_914!=null||def!=null){
if(def!=null){
_916=def;
}else{
_916=ViewDefinitions[_914];
}
if(_916 instanceof DialogViewDefinition){
_916.handler=this._handler;
if(this._map!=null){
_916.argument=this._map;
}
StageBinding.presentViewDefinition(_916);
}
}else{
if(url!=null){
_916=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_916!=null){
this._dialogViewHandle=_916.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_917){
this.setProperty("label",_917);
if(this.isAttached){
this._buttonBinding.setLabel(_917+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_918){
this.setProperty("image",_918);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_918);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_919){
this.setProperty("tooltip",_919);
if(this.isAttached){
this._buttonBinding.setToolTip(_919);
}
};
DataDialogBinding.prototype.setHandle=function(_91a){
this.setProperty("handle",_91a);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_91c){
this._handler=_91c;
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
DataDialogBinding.newInstance=function(_91e){
var _91f=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_91e);
return UserInterface.registerBinding(_91f,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_921,_922){
if(_921==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_922);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_923){
_923=new String(_923);
this.dirty();
this.setValue(encodeURIComponent(_923));
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
var _927=this.getValue();
if(_927==null){
_927="";
}
this.shadowTree.dotnetinput.value=_927;
};
PostBackDataDialogBinding.prototype.setValue=function(_928){
this.setProperty("value",_928);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_929){
};
PostBackDataDialogBinding.newInstance=function(_92a){
var _92b=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_92a);
return UserInterface.registerBinding(_92b,PostBackDataDialogBinding);
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
var _92c=this.getProperty("dialoglabel");
var _92d=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _92f=this.getProperty("handle");
if(_92f!=null){
var def=ViewDefinition.clone(_92f,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_92c!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_92c;
}
if(_92d!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_92d;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_931){
var _932=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_931);
return UserInterface.registerBinding(_932,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_934){
self._datathing.setValue(_934);
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
var _937=self.getValue();
if(_937==""||_937==null){
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
var _938=this.getProperty("value");
var _939=this.getProperty("selectorlabel");
if(_939==null){
_939=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_938==null));
list.add(new SelectorBindingSelection(_939+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_938!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _938=this.getValue();
if(_938==""||_938==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_93b){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_93b);
switch(_93b.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_93b.target==this._datathing){
var _93c=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_93c){
self._selector.setLabel(_93c);
}
},500);
_93b.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_93e){
this.setProperty("label",_93e);
if(this._selector!=null){
this._selector.setLabel(_93e);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_93f){
this._datathing.setValue(_93f);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_940,_941){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_940,_941)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_942){
this._buttonBinding.setLabel(_942);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_943){
this._buttonBinding.setToolTip(_943);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_944){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_944);
switch(_944.type){
case MenuItemBinding.ACTION_COMMAND:
var _945=_944.target;
var _946=this.master;
if(_945.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_945.getLabel());
setTimeout(function(){
_946.action();
},0);
}else{
this.master.setValue("");
}
_946.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_947){
var _948=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_947);
return UserInterface.registerBinding(_948,NullPostBackDataDialogSelectorBinding);
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
var _949=this._dataDialogBinding;
if(_949!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_949.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _94a=this.getProperty("editable");
var _94b=this.getProperty("selectable");
var _94c=this.getProperty("display");
if(_94a!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_94b){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_94c){
this._display=_94c;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _94d=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_94d.selections=this.selections;
this.add(_94d);
_94d.attach();
this._dataDialogBinding=_94d;
this.shadowTree.datadialog=_94d;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _94f=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _950=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_94f=_950.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_94f=_950.isSelected!=true;
break;
}
if(_94f){
this.shadowTree.box.appendChild(this._getElementForSelection(_950));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_952){
var box=this.shadowTree.box;
var _954=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _955=list.getNext();
if(_952){
_955.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_954=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_954=_955.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_954=_955.isSelected!=true;
break;
}
}
if(_954){
var _956=this._getElementForSelection(_955);
box.insertBefore(_956,box.firstChild);
CSSUtil.attachClassName(_956,"selected");
this._selectionMap.set(_955.value,_956);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_957){
var _958=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_958.appendChild(this.bindingDocument.createTextNode(_957.label));
_958.setAttribute("label",_957.label);
_958.setAttribute("value",_957.value);
return _958;
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
var _95a=DOMEvents.getTarget(e);
var _95b=DOMUtil.getLocalName(_95a);
if(_95b=="div"){
this._handleMouseDown(_95a);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_95c){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _95d=this._getElements();
var _95e=_95c.getAttribute("value");
var _95f=this._lastSelectedElement.getAttribute("value");
var _960=false;
while(_95d.hasNext()){
var el=_95d.getNext();
switch(el.getAttribute("value")){
case _95e:
case _95f:
_960=!_960;
break;
}
if(_960){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_95c);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_95c)){
this._unhilite(_95c);
}else{
this._hilite(_95c);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_95c){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_95c;
};
MultiSelectorBinding.prototype._hilite=function(_964){
var _965=_964.getAttribute("value");
if(!this._selectionMap.has(_965)){
CSSUtil.attachClassName(_964,"selected");
this._selectionMap.set(_965,_964);
}
};
MultiSelectorBinding.prototype._unhilite=function(_966){
var _967=_966.getAttribute("value");
if(this._selectionMap.has(_967)){
CSSUtil.detachClassName(_966,"selected");
this._selectionMap.del(_967);
}
};
MultiSelectorBinding.prototype._isHilited=function(_968){
return CSSUtil.hasClassName(_968,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_969){
MultiSelectorBinding.superclass.handleAction.call(this,_969);
var _96a=_969.target;
switch(_969.type){
case DataDialogBinding.ACTION_COMMAND:
if(_96a==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_969.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_96a.result);
this.dirty();
_96a.result=null;
_969.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _96b=null;
if(this.isSelectable){
_96b=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_96d){
if(self._isHilited(_96d)){
_96d.parentNode.removeChild(_96d);
_96b.add(new SelectorBindingSelection(_96d.getAttribute("label"),_96d.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _96b;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _96f=this._getElements();
if(!isUp){
_96f.reverse();
}
var _970=true;
while(_970&&_96f.hasNext()){
var _971=_96f.getNext();
if(this._isHilited(_971)){
switch(isUp){
case true:
if(_971.previousSibling){
_971.parentNode.insertBefore(_971,_971.previousSibling);
}else{
_970=false;
}
break;
case false:
if(_971.nextSibling){
_971.parentNode.insertBefore(_971,_971.nextSibling.nextSibling);
}else{
_970=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _972=new List();
var _973=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_975){
var _976=new SelectorBindingSelection(_975.getAttribute("label"),_975.getAttribute("value"),_973);
_976.isHighlighted=self._isHilited(_975);
_972.add(_976);
});
return _972;
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
var _977=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_977.hasEntries()){
_977.each(function(_978){
_978.parentNode.removeChild(_978);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _979=this.selections.getNext();
if(_979.isSelected){
var _97a=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_97a.name=this._name;
_97a.value=_979.value;
this.bindingElement.appendChild(_97a);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_97b){
alert(_97b);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_97c){
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
var _97d={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _97e=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_97e.handler=this._handler;
_97e.argument=_97d;
StageBinding.presentViewDefinition(_97e);
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
var _97f={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _981={handleDialogResponse:function(_982,_983){
if(_982==Dialog.RESPONSE_ACCEPT){
self.result=_983;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _984=ViewDefinitions[this._dialogViewHandle];
_984.handler=_981;
_984.argument=_97f;
StageBinding.presentViewDefinition(_984);
};
MultiSelectorDataDialogBinding.newInstance=function(_985){
var _986=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_985);
return UserInterface.registerBinding(_986,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_987){
var id=_987.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _989=_987.bindingDocument.getElementById(id);
if(_989!=null){
var _98a=UserInterface.getBinding(_989);
_98a.setResult(true);
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
var _98c=this.bindingDocument.getElementById(id);
if(_98c!=null){
var _98d=UserInterface.getBinding(_98c);
if(_98d&&!_98d.isAttached){
_98d.isLazy=true;
}else{
_98c.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_98e){
this._isLazy=_98e;
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
var _990=this.getProperty("stateprovider");
var _991=this.getProperty("handle");
if(_990!=null&&_991!=null){
url=url.replace("${stateprovider}",_990).replace("${handle}",_991);
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
EditorDataBinding.prototype._onPageInitialize=function(_992){
EditorDataBinding.superclass._onPageInitialize.call(this,_992);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_993){
EditorDataBinding.superclass.handleAction.call(this,_993);
switch(_993.type){
case Binding.ACTION_DIRTY:
if(_993.target!=this){
if(!this.isDirty){
this.dirty();
}
_993.consume();
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
EditorDataBinding.prototype.setValue=function(_994){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_995){
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
var _99a=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_99a=fake.getValue()!="";
}
if(!_99a&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_99a&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _99a;
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
var _99e=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_99e!=null){
_99e.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_99f){
_99f=_99f!=null?_99f:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_99f;
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
var _9a0=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _9a1=_9a0.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_9a1;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_9a1=_9a1.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_9a1;
}
var self=this;
var _9a3=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_9a3.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _9a6=this.getProperty("label");
if(_9a6){
this.setLabel(_9a6);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_9a7){
this.setProperty("label",_9a7);
if(this.shadowTree.labelBinding==null){
var _9a8=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_9a8.attachClassName("fieldgrouplabel");
cell.insertBefore(_9a8.bindingElement,cell.getElementsByTagName("div").item(1));
_9a8.attach();
this.shadowTree.labelBinding=_9a8;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_9a7));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_9aa){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_9aa.bindingElement);
return _9aa;
};
FieldGroupBinding.prototype.addFirst=function(_9ab){
var _9ac=this.shadowTree[FieldGroupBinding.CENTER];
_9ac.insertBefore(_9ab.bindingElement,_9ac.firstChild);
return _9ab;
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
var _9ad=this.getProperty("relation");
if(_9ad!=null){
this.bindingRelation=_9ad;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_9ae,arg){
FieldBinding.superclass.handleBroadcast.call(this,_9ae,arg);
switch(_9ae){
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
FieldBinding.newInstance=function(_9b0){
var _9b1=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_9b0);
return UserInterface.registerBinding(_9b1,FieldBinding);
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
var _9b2=this.getDescendantBindingByLocalName("fieldgroup");
if(_9b2!=null){
_9b2.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _9b3=true;
var _9b4=this.getDescendantBindingsByLocalName("*");
while(_9b4.hasNext()){
var _9b5=_9b4.getNext();
if(Interfaces.isImplemented(IData,_9b5)){
var _9b6=_9b5.validate();
if(_9b3&&!_9b6){
_9b3=false;
}
}
}
return _9b3;
};
FieldsBinding.prototype.handleAction=function(_9b7){
FieldsBinding.superclass.handleAction.call(this,_9b7);
var _9b8=_9b7.target;
if(_9b8!=this){
switch(_9b7.type){
case Binding.ACTION_INVALID:
var _9b9=DataBinding.getAssociatedLabel(_9b8);
if(_9b9){
this._invalidFieldLabels.set(_9b8.key,_9b9);
}
if(_9b8.error){
if(!_9b8.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_9b8.error},_9b8);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_9b7.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_9b8.key)){
this._invalidFieldLabels.del(_9b8.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_9b7.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _9ba=null;
if(this._invalidFieldLabels.hasEntries()){
_9ba=this._invalidFieldLabels.toList();
}
return _9ba;
};
FieldsBinding.newInstance=function(_9bb){
var _9bc=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_9bb);
return UserInterface.registerBinding(_9bc,FieldsBinding);
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
var _9bd=this.getProperty("image");
if(_9bd){
this.setImage(_9bd);
}
var _9be=this.getProperty("tooltip");
if(_9be){
this.setToolTip(_9be);
}
var _9bf=this.getProperty("label");
if(_9bf){
this.setLabel(_9bf);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _9c1=this.getAncestorBindingByLocalName("field");
if(_9c1){
var _9c2=true;
_9c1.getDescendantBindingsByLocalName("*").each(function(_9c3){
if(Interfaces.isImplemented(IData,_9c3)){
_9c3.focus();
_9c2=false;
}
return _9c2;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_9c4){
this.setProperty("label",_9c4);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_9c4);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _9c5=this.getProperty("label");
if(!_9c5){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_9c5=node.data;
}
}
return _9c5;
};
FieldDescBinding.prototype.setImage=function(_9c7){
this.setProperty("image",_9c7);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9c8){
this.setProperty("tooltip",_9c8);
if(this.isAttached){
this.bindingElement.title=_9c8;
}
};
FieldDescBinding.newInstance=function(_9c9){
var _9ca=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9c9);
return UserInterface.registerBinding(_9ca,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9cb){
var _9cc=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9cb);
return UserInterface.registerBinding(_9cc,FieldDataBinding);
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
var _9cd=this._fieldHelpPopupBinding;
if(_9cd){
_9cd.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9ce=app.bindingMap.fieldhelpopupset;
var doc=_9ce.bindingDocument;
var _9d0=_9ce.add(PopupBinding.newInstance(doc));
var _9d1=_9d0.add(PopupBodyBinding.newInstance(doc));
_9d0.position=PopupBinding.POSITION_RIGHT;
_9d0.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9d1.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9d2=this.getProperty("label");
if(_9d2){
_9d1.bindingElement.innerHTML=Resolver.resolve(_9d2);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9d0;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9d3=this.getAncestorBindingByLocalName("field");
if(_9d3){
_9d3.attachClassName("fieldhelp");
var _9d4=ClickButtonBinding.newInstance(this.bindingDocument);
_9d4.attachClassName("fieldhelp");
_9d4.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9d4);
_9d4.attach();
var self=this;
_9d4.oncommand=function(){
self.attachPopupBinding();
};
_9d4.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9d4;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9d6=this._fieldHelpPopupBinding;
if(_9d6&&!_9d6.isAttached){
_9d6.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9d8){
RadioDataGroupBinding.superclass.handleAction.call(this,_9d8);
switch(_9d8.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9da,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9da,arg);
switch(_9da){
case BroadcastMessages.KEY_ARROW:
var _9dc=null;
var next=null;
var _9de=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9de=this.getChildBindingsByLocalName("radio");
while(!_9dc&&_9de.hasNext()){
var _9df=_9de.getNext();
if(_9df.getProperty("ischecked")){
_9dc=_9df;
}
}
break;
}
if(_9dc){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9de.getFollowing(_9dc);
while(next!=null&&next.isDisabled){
next=_9de.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9de.getPreceding(_9dc);
while(next!=null&&next.isDisabled){
next=_9de.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9e0){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9e0){
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
var _9e1=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9e1.type="hidden";
_9e1.name=this._name;
this.bindingElement.appendChild(_9e1);
this.shadowTree.input=_9e1;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9e2=null;
var _9e3=this.getChildBindingsByLocalName("radio");
while(!_9e2&&_9e3.hasNext()){
var _9e4=_9e3.getNext();
if(_9e4.isChecked){
_9e2=_9e4.getProperty("value");
}
}
return _9e2;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9e5){
};
RadioDataGroupBinding.prototype.setResult=function(_9e6){
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
this.propertyMethodMap["checked"]=function(_9e7){
if(_9e7!=this.isChecked){
this.setChecked(_9e7,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9e8=this.getProperty("ischecked");
if(_9e8!=this.isChecked){
this.setChecked(_9e8,true);
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
var _9e9=this.getProperty("relate");
var _9ea=this.getProperty("oncommand");
if(_9e9){
this.bindingRelate=_9e9;
this.relate();
}
if(_9ea){
this.oncommand=function(){
Binding.evaluate(_9ea,this);
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
var _9ec=this.getCallBackID();
this._buttonBinding.check=function(_9ed){
RadioButtonBinding.prototype.check.call(this,_9ed);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9ee){
RadioButtonBinding.prototype.uncheck.call(this,_9ee);
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
RadioDataBinding.prototype.setChecked=function(_9ef,_9f0){
this._buttonBinding.setChecked(_9ef,_9f0);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9ef);
};
RadioDataBinding.prototype.check=function(_9f1){
this.setChecked(true,_9f1);
};
RadioDataBinding.prototype.uncheck=function(_9f2){
this.setChecked(false,_9f2);
};
RadioDataBinding.prototype.setDisabled=function(_9f3){
if(_9f3!=this.isDisabled){
this.isDisabled=_9f3;
this._buttonBinding.setDisabled(_9f3);
if(_9f3){
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
var _9f5=DOMEvents.getTarget(e);
switch(_9f5){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9f6=this.getProperty("label");
if(_9f6){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9f6)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9f7){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9f7;
}
this.setProperty("label",_9f7);
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
this.propertyMethodMap["checked"]=function(_9f8){
if(_9f8!=this.isChecked){
this.setChecked(_9f8,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9f9=this.getProperty("ischecked");
if(_9f9!=this.isChecked){
this.setChecked(_9f9,true);
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
var _9fb=DOMEvents.getTarget(e);
switch(_9fb){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9fc,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9fc,arg);
switch(_9fc){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_9ff){
_9ff.consume();
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
var _a01=this.getCallBackID();
this._buttonBinding.check=function(_a02){
ButtonBinding.prototype.check.call(this,_a02);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_a02){
self.focus();
}
};
this._buttonBinding.uncheck=function(_a03){
ButtonBinding.prototype.uncheck.call(this,_a03);
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
if(_a01!=null){
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
var _a04=true;
var _a05=this.bindingElement.parentNode;
if(_a05){
var _a06=UserInterface.getBinding(_a05);
if(_a06&&_a06 instanceof CheckBoxGroupBinding){
if(_a06.isRequired){
if(_a06.isValid){
_a04=_a06.validate();
}else{
_a04=false;
}
}
}
}
return _a04;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _a07=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_a07.type="hidden";
_a07.name=this._name;
_a07.style.display="none";
this.bindingElement.appendChild(_a07);
this.shadowTree.input=_a07;
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
var _a08=null;
var _a09=this.getProperty("value");
if(this.isChecked){
_a08=_a09?_a09:"on";
}
return _a08;
};
CheckBoxBinding.prototype.setValue=function(_a0a){
if(_a0a==this.getValue()||_a0a=="on"){
this.check(true);
}else{
if(_a0a!="on"){
this.setPropety("value",_a0a);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _a0b=false;
if(this.isChecked){
_a0b=this._result!=null?this._result:true;
}
return _a0b;
};
CheckBoxBinding.prototype.setResult=function(_a0c){
if(typeof _a0c=="boolean"){
this.setChecked(_a0c,true);
}else{
this._result=_a0c;
}
};
CheckBoxBinding.newInstance=function(_a0d){
var _a0e=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_a0d);
return UserInterface.registerBinding(_a0e,CheckBoxBinding);
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
var _a0f=true;
if(this.isRequired){
var _a10=this.getDescendantBindingsByLocalName("checkbox");
if(_a10.hasEntries()){
_a0f=false;
while(_a10.hasNext()&&!_a0f){
if(_a10.getNext().isChecked){
_a0f=true;
}
}
}
if(_a0f==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _a0f;
};
CheckBoxGroupBinding.prototype._showWarning=function(_a11){
if(_a11){
if(!this._labelBinding){
var _a12=LabelBinding.newInstance(this.bindingDocument);
_a12.attachClassName("invalid");
_a12.setImage("${icon:error}");
_a12.setLabel("Selection required");
this._labelBinding=this.addFirst(_a12);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_a13){
CheckBoxGroupBinding.superclass.handleAction.call(this,_a13);
switch(_a13.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_a14){
var _a15=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_a14);
return UserInterface.registerBinding(_a15,CheckBoxGroupBinding);
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
var _a16=DialogControlBinding.newInstance(this.bindingDocument);
_a16.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_a16);
this._controlGroupBinding.attachRecursive();
var _a17=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_a17);
var _a18=this.getLabel();
if(_a18!=null){
this.setLabel(_a18);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _a19=this._snapTargetBinding;
if(Binding.exists(_a19)==true){
_a19.removeActionListener(Binding.ACTION_BLURRED,this);
_a19.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_a1a){
if(Interfaces.isImplemented(IData,_a1a)){
this._snapTargetBinding=_a1a;
var _a1b=_a1a.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_a1b&&_a1b.isConsumed){
this._environmentBinding=_a1b.listener;
}
if(this._environmentBinding){
_a1a.addActionListener(Binding.ACTION_BLURRED,this);
_a1a.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_a1a)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_a1a.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _a1d=this._snapTargetBinding;
var _a1e=this._environmentBinding;
var root=UserInterface.getBinding(_a1d.bindingDocument.body);
if(Binding.exists(_a1d)&&Binding.exists(_a1e)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_a1d.isAttached&&_a1e.isAttached){
var _a20=_a1d.boxObject.getUniversalPosition();
var _a21=_a1e.boxObject.getUniversalPosition();
_a21.y+=_a1e.bindingElement.scrollTop;
_a21.x+=_a1e.bindingElement.scrollLeft;
var tDim=_a1d.boxObject.getDimension();
var eDim=_a1e.boxObject.getDimension();
var _a24=false;
if(_a20.y+tDim.h<_a21.y){
_a24=true;
}else{
if(_a20.x+tDim.w<_a21.x){
_a24=true;
}else{
if(_a20.y>_a21.y+eDim.h){
_a24=true;
}else{
if(_a20.x>_a21.x+eDim.w){
_a24=true;
}
}
}
}
if(!_a24){
this._setComputedPosition(_a20,_a21,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_a25,_a26,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a2b=_a25;
var _a2c=false;
if(_a25.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a2c=true;
}else{
if(_a25.x+tDim.w>=_a26.x+eDim.w){
_a2c=true;
}
}
if(_a2c){
_a2b.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a2b.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a2b.y-=(bDim.h);
_a2b.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a2b);
};
BalloonBinding.prototype.handleBroadcast=function(_a2d,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a2d,arg);
switch(_a2d){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a2f){
var _a30=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a2f){
_a30=true;
}
}
return _a30;
};
BalloonBinding.prototype._setPosition=function(_a32){
var _a33=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a33=true;
}
}
if(!_a33){
this.bindingElement.style.left=_a32.x+"px";
this.bindingElement.style.top=_a32.y+"px";
this._point=_a32;
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
BalloonBinding.prototype.handleAction=function(_a35){
BalloonBinding.superclass.handleAction.call(this,_a35);
var _a36=_a35.target;
switch(_a35.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a35.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a36==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a36)){
self.dispose();
}else{
if(_a36.validate()){
var _a38=true;
if(_a35.type==Binding.ACTION_BLURRED){
var root=_a36.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a38=false;
}
}
if(_a38){
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
BalloonBinding.prototype.setLabel=function(_a3b){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a3c=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a3b);
_a3c.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a3c);
}
this.setProperty("label",_a3b);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a3e){
var _a3f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a3e);
var _a40=UserInterface.registerBinding(_a3f,BalloonBinding);
_a40.hide();
return _a40;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a41,_a42){
if(Interfaces.isImplemented(IData,_a42)==true){
var _a43,_a44=_a42.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a44&&_a44.isConsumed){
switch(_a44.listener.constructor){
case StageBinding:
_a43=false;
break;
case StageDialogBinding:
_a43=true;
break;
}
}
var _a45=_a43?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a46=_a45.add(BalloonBinding.newInstance(top.app.document));
_a46.setLabel(_a41.text);
_a46.snapTo(_a42);
_a46.attach();
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
var _a47=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a4a=_a47.getDataBinding(name);
if(_a4a){
ErrorBinding.presentError({text:text},_a4a);
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
FocusBinding.focusElement=function(_a4b){
var _a4c=true;
try{
_a4b.focus();
Application.focused(true);
}
catch(exception){
var _a4d=UserInterface.getBinding(_a4b);
var _a4e=SystemLogger.getLogger("FocusBinding.focusElement");
_a4e.warn("Could not focus "+(_a4d?_a4d.toString():String(_a4b)));
_a4c=false;
}
return _a4c;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a4f){
var win=_a4f.bindingWindow;
var id=_a4f.bindingElement.id;
return {getBinding:function(){
var _a52=null;
try{
if(Binding.exists(_a4f)){
_a52=win.bindingMap[id];
}
}
catch(exception){
}
return _a52;
}};
};
FocusBinding.navigateNext=function(_a53){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a53);
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
var _a54=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a54&&_a54.isConsumed){
if(_a54.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a55){
FocusBinding.superclass.handleAction.call(this,_a55);
var _a56=_a55.target;
var _a57=null;
if(this._isFocusManager){
switch(_a55.type){
case FocusBinding.ACTION_ATTACHED:
if(_a56!=this){
this._isUpToDate=false;
}
_a55.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a56!=this){
this._isUpToDate=false;
_a55.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a57=new FocusCrawler();
_a57.mode=FocusCrawler.MODE_BLUR;
_a57.crawl(_a56.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a55.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a56!=this){
_a57=new FocusCrawler();
_a57.mode=FocusCrawler.MODE_FOCUS;
_a57.crawl(_a56.bindingElement);
}
_a55.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a56)){
this.claimFocus();
this._onFocusableFocused(_a56);
}
_a55.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a56)){
this._onFocusableBlurred(_a56);
}
_a55.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a58){
var _a59=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a59==null&&list.hasNext()){
var _a5b=list.getNext();
if(this._cachedFocus&&_a5b==this._cachedFocus.getBinding()){
_a59=_a5b;
}
}
if(_a59!=null){
if(_a5b.isFocused){
var next=_a58?list.getPreceding(_a59):list.getFollowing(_a59);
if(!next){
next=_a58?list.getLast():list.getFirst();
}
next.focus();
}else{
_a59.focus();
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
var _a5d=new FocusCrawler();
var list=new List();
_a5d.mode=FocusCrawler.MODE_INDEX;
_a5d.crawl(this.bindingElement,list);
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
var _a61=this._cachedFocus.getBinding();
if(_a61&&!_a61.isFocused){
_a61.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a62){
if(_a62!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a62;
_a62.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a62);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a63){
_a63.deleteProperty(FocusBinding.MARKER);
if(_a63==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a65){
this.bindingElement.style.left=_a65+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a66){
this.hiddenTabBindings.add(_a66);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a67=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a67.getLabel());
item.setImage(_a67.getImage());
item.associatedTabBinding=_a67;
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
TabsButtonBinding.prototype.handleAction=function(_a6a){
TabsButtonBinding.superclass.handleAction.call(this,_a6a);
switch(_a6a.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a6b=this.selectedTabBinding;
if(_a6b){
this.containingTabBoxBinding.moveToOrdinalPosition(_a6b,0);
this.containingTabBoxBinding.select(_a6b);
}
_a6a.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a6c){
var _a6d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a6c);
_a6d.setAttribute("type","checkbox");
_a6d.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a6d.className="tabbutton";
return UserInterface.registerBinding(_a6d,TabsButtonBinding);
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
var _a6e=TabBoxBinding.currentActiveInstance;
if(_a6e!=null&&Binding.exists(_a6e)){
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
var _a6f=this.getTabElements().getLength();
var _a70=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a6f!=_a70){
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
var _a71=this.getTabPanelElements();
while(_a71.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a71.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a72=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a73=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a74=_a72>_a73?"tabsbelow":"tabsontop";
this.attachClassName(_a74);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a76=this.getTabPanelElements();
var _a77=null;
var _a78=this.getProperty("selectedindex");
if(_a78!=null){
if(_a78>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a79=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a7b=_a76.getNext();
this.registerTabBoxPair(tab,_a7b);
if(_a78&&_a79==_a78){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a77=tab;
}
}
_a79++;
}
if(!_a77){
_a77=tabs.getFirst();
_a77.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a7c){
var _a7d=null;
var _a7e=null;
if(this.isEqualSize){
var _a7f=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a81=this.getTabPanelElements();
_a81.each(function(_a82){
max=_a82.offsetHeight>max?_a82.offsetHeight:max;
});
_a7e=max+_a7f.top+_a7f.bottom;
if(_a7c&&this._tabPanelsElement.style.height!=null){
_a7d=this._tabPanelsElement.offsetHeight;
}
if(_a7d!=null||_a7e>_a7d){
this._tabPanelsElement.style.height=_a7e+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a83){
_a83._invalidCount=0;
_a83.addActionListener(Binding.ACTION_INVALID,this);
_a83.addActionListener(Binding.ACTION_VALID,this);
_a83.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a84){
TabBoxBinding.superclass.handleAction.call(this,_a84);
var _a85=_a84.target;
var _a86=_a84.listener;
switch(_a84.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a85.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a84.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a85.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a86._invalidCount++;
if(_a86._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a86.isSelected){
self._showWarning(_a86,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a86._invalidCount>0){
_a86._invalidCount--;
if(_a86._invalidCount==0){
if(_a86.isSelected){
this._showWarning(_a86,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a86,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a84._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a84._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a89=DOMEvents.getTarget(e);
if(_a89==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a8b=this.getTabPanelElements();
tabs.each(function(tab,_a8d){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a8e=_a8b.get(_a8d);
this.registerTabBoxPair(tab,_a8e);
}
},this);
var _a8f=this._tabBoxPairs;
for(var key in _a8f){
var tab=_a8f[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a89);
switch(_a89.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a93=_a89.parentNode;
if(_a93==this._tabsElement||_a93==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a89==this._tabsElement||_a89==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a95){
var _a96=this.getBindingForArgument(arg);
if(_a96!=null&&!_a96.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a96.select(_a95);
this.getTabPanelBinding(_a96).select(_a95);
var _a97=this.getProperty("selectedindex");
if(_a97!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a96.bindingElement,true));
}
this._selectedTabBinding=_a96;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a96.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a98=this.getTabPanelBinding(_a96);
this._showBalloon(_a98,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a9a){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a9a.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a9a};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a9e){
var _a9f=null;
try{
var key=_a9e.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aa1=this._tabBoxPairs[key].tabPanel;
_a9f=UserInterface.getBinding(_aa1);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a9f;
};
TabBoxBinding.prototype.getTabBinding=function(_aa2){
var key=_aa2.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _aa4=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_aa4);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _aa5=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_aa5);
return _aa5;
};
TabBoxBinding.prototype.appendTabByBindings=function(_aa6,_aa7){
var _aa8=_aa6.bindingElement;
_aa6.setProperty("selected",true);
var _aa9=this.summonTabPanelBinding();
var _aaa=_aa9.bindingElement;
if(_aa7){
_aaa.appendChild(_aa7 instanceof Binding?_aa7.bindingElement:_aa7);
}
this.registerTabBoxPair(_aa8,_aaa);
UserInterface.getBinding(this._tabsElement).add(_aa6);
this._tabPanelsElement.appendChild(_aaa);
_aa6.attach();
UserInterface.getBinding(_aaa).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _aa6;
};
TabBoxBinding.prototype.importTabBinding=function(_aab){
var that=_aab.containingTabBoxBinding;
var _aad=that.getTabPanelBinding(_aab);
var _aae=_aad.getBindingElement();
var _aaf=_aab.getBindingElement();
that.dismissTabBinding(_aab);
this._tabsElement.appendChild(_aaf);
this._tabPanelsElement.appendChild(_aae);
this.registerTabBoxPair(_aaf,_aae);
_aab.containingTabBoxBinding=this;
this.select(_aab);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_ab0){
var _ab1=null;
if(_ab0.isSelected){
_ab1=this.getBestTab(_ab0);
this._selectedTabBinding=null;
}
var _ab2=this.getTabPanelBinding(_ab0);
this.unRegisterTabBoxPair(_ab0.bindingElement);
_ab0.dispose();
_ab2.dispose();
if(_ab1!=null){
this.select(_ab1);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_ab3){
if(_ab3.isSelected){
this.selectBestTab(_ab3);
}
};
TabBoxBinding.prototype.selectBestTab=function(_ab4){
var _ab5=this.getBestTab(_ab4);
if(_ab5){
this.select(_ab5);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_ab6){
var _ab7=null;
var _ab8=_ab6.getOrdinalPosition(true);
var _ab9=this.getTabBindings();
var _aba=_ab9.getLength();
var _abb=_aba-1;
if(_aba==1){
_ab7=null;
}else{
if(_ab8==_abb){
_ab7=_ab9.get(_ab8-1);
}else{
_ab7=_ab9.get(_ab8+1);
}
}
return _ab7;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_abc,_abd){
var _abe=this.bindingDocument.getElementById(_abc.bindingElement.id);
var tab=this.getTabElements().get(_abd);
this._tabsElement.insertBefore(_abe,tab);
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
var _ac0=this._nodename_tab;
var _ac1=new List(this._tabsElement.childNodes);
var _ac2=new List();
while(_ac1.hasNext()){
var _ac3=_ac1.getNext();
if(_ac3.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ac3)==_ac0){
_ac2.add(_ac3);
}
}
return _ac2;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _ac4=this._nodename_tabpanel;
var _ac5=new List(this._tabPanelsElement.childNodes);
var _ac6=new List();
_ac5.each(function(_ac7){
if(_ac7.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_ac7)==_ac4){
_ac6.add(_ac7);
}
});
return _ac6;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _ac8=new List();
var _ac9=this.getTabElements();
_ac9.each(function(_aca){
_ac8.add(UserInterface.getBinding(_aca));
});
return _ac8;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _acb=new List();
this.getTabPanelElements().each(function(_acc){
_acb.add(UserInterface.getBinding(_acc));
});
return _acb;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _acd=null;
if(this._selectedTabBinding){
_acd=this.getTabPanelBinding(this._selectedTabBinding);
}
return _acd;
};
TabBoxBinding.prototype._showWarning=function(_ace,_acf){
var _ad0=this.getTabBinding(_ace);
if(_acf){
if(_ad0.labelBinding.hasImage){
_ad0._backupImage=_ad0.getImage();
}
_ad0.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_ad0._backupImage){
_ad0.setImage(_ad0._backupImage);
}else{
_ad0.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_ad1,_ad2){
var _ad3=this.getTabBinding(_ad1);
if((_ad2&&!_ad3.isSelected)||!_ad2){
if(_ad3.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_ad2){
if(_ad3.labelBinding.hasImage){
_ad3._backupImage=_ad3.getImage();
}
_ad3.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_ad3._backupImage!=null){
_ad3.setImage(_ad3._backupImage);
}else{
_ad3.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_ad4){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _ad7=tab.getOrdinalPosition(true);
var next=null;
var _ad9=new List();
tabs.each(function(t){
if(t.isVisible){
_ad9.add(t);
}
});
if(_ad9.getLength()>1){
if(_ad7==0&&!_ad4){
next=_ad9.getLast();
}else{
if(_ad7==_ad9.getLength()-1&&_ad4){
next=_ad9.getFirst();
}else{
if(_ad4){
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
var _adc=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_adc.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_add){
TabsBinding.superclass.handleAction.call(this,_add);
switch(_add.type){
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
var _ae0=self.bindingElement.offsetWidth;
if(_ae0!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_ae0;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_ae1){
if(_ae1 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_ae1);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _ae2=false;
var _ae3,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _ae6=this.constructor.TABBUTTON_IMPLEMENTATION;
var _ae7=this.bindingElement.offsetWidth-_ae6.RESERVED_SPACE;
var _ae8=null;
var sum=0,_aea=0;
var _aeb=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_aeb){
tab=tabs.getNext();
_ae3=UserInterface.getBinding(tab);
if(!_ae8){
_ae8=_ae3;
}
sum+=tab.offsetWidth;
if(sum>=_ae7){
_ae2=true;
if(_ae3.isSelected){
if(!DOMUtil.isFirstElement(_ae3.bindingElement,true)){
this.isManaging=false;
if(_ae8){
_ae8.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_ae3,_aea-1);
_aeb=false;
}
}else{
_ae3.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_ae3);
}
}else{
_ae3.show();
_ae8=_ae3;
_aea++;
}
}
if(_aeb){
if(_ae2&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _aec=_ae8.getBindingElement();
var _aed=_aec.offsetLeft+_aec.offsetWidth;
var _aee=this.tabsButtonBinding;
setTimeout(function(){
_aee.show(_aed+4);
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
var _aef=TabBinding.superclass.serialize.call(this);
if(_aef){
_aef.label=this.getLabel();
_aef.image=this.getImage();
_aef.tooltip=this.getToolTip();
}
return _aef;
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
var _af0=this.bindingElement.getAttribute("image");
var _af1=this.bindingElement.getAttribute("label");
var _af2=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_af1){
this.setLabel(_af1);
}
if(_af0){
this.setImage(_af0);
}
if(_af2){
this.setToolTip(_af2);
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
TabBinding.prototype.setLabel=function(_af4){
if(_af4!=null){
this.setProperty("label",_af4);
if(this.isAttached){
this.labelBinding.setLabel(_af4);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_af5){
if(_af5){
this.setProperty("tooltip",_af5);
if(this.isAttached){
this.labelBinding.setToolTip(_af5);
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
var _af7=false;
if(Client.isMozilla==true){
}
if(!_af7){
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
TabBinding.prototype.select=function(_af8){
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
TabBinding.newInstance=function(_af9){
var _afa=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_af9);
return UserInterface.registerBinding(_afa,TabBinding);
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
var _afb=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_afb=true;
this._lastKnownDimension=dim1;
}
return _afb;
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
TabPanelBinding.prototype.select=function(_afe){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_afe!=true){
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
TabPanelBinding.prototype.handleAction=function(_aff){
TabPanelBinding.superclass.handleAction.call(this,_aff);
var _b00=_aff.target;
switch(_aff.type){
case BalloonBinding.ACTION_INITIALIZE:
_aff.consume();
break;
}
};
TabPanelBinding.newInstance=function(_b01){
var _b02=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_b01);
UserInterface.registerBinding(_b02,TabPanelBinding);
return UserInterface.getBinding(_b02);
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
var _b03=SplitBoxBinding.superclass.serialize.call(this);
if(_b03){
_b03.orient=this.getOrient();
_b03.layout=this.getLayout();
}
return _b03;
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
var _b04=this.getSplitPanelElements();
if(_b04.hasEntries()){
var _b05=new List(this.getLayout().split(":"));
if(_b05.getLength()!=_b04.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_b04.each(function(_b06){
_b06.setAttribute("ratio",_b05.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _b07=this.getProperty("orient");
if(_b07){
this._orient=_b07;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _b08=this.getSplitterBindings();
while(_b08.hasNext()){
var _b09=_b08.getNext();
if(_b09&&_b09.getProperty("collapsed")==true){
_b09.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_b0a){
SplitBoxBinding.superclass.handleAction.call(this,_b0a);
switch(_b0a.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_b0a.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_b0a.target);
_b0a.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_b0a.target);
_b0a.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_b0b){
this._getSplitPanelBindingForSplitter(_b0b).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_b0c){
this._getSplitPanelBindingForSplitter(_b0c).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_b0d){
var _b0e=DOMUtil.getOrdinalPosition(_b0d.bindingElement,true);
var _b0f,_b10=this.getSplitPanelElements();
switch(_b0d.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_b0f=_b10.get(_b0e);
break;
case SplitterBinding.COLLAPSE_AFTER:
_b0f=_b10.get(_b0e+1);
break;
}
return UserInterface.getBinding(_b0f);
};
SplitBoxBinding.prototype.invokeLayout=function(_b11){
var _b12=this.isHorizontalOrient();
var _b13=this.getSplitPanelBindings();
var _b14=this.getSplitterBindings();
var _b15=new List();
var _b16,sum=0;
var _b18=0;
_b13.each(function(_b19){
if(_b19.isFixed==true){
if(!_b13.hasNext()){
_b18+=_b19.getFix();
}
_b15.add(0);
sum+=0;
}else{
_b16=_b19.getRatio();
_b15.add(_b16);
sum+=_b16;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_b15.getLength()!=_b13.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _b1a=_b12?this.getWidth():this.getHeight();
_b1a-=_b18;
_b14.each(function(_b1b){
if(_b1b.isVisible){
_b1a-=SplitterBinding.DIMENSION;
}
});
var unit=_b1a/sum;
var _b1d=0;
var self=this;
_b13.each(function(_b1f){
var span=0;
var _b21=_b15.getNext();
if(_b1f.isFixed){
span=_b1f.getFix();
}else{
span=Math.round(unit*_b21);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_b1d+=span;
while(_b1d>_b1a){
_b1d--;
span--;
}
if(!_b1f.isFixed){
if(_b12){
_b1f.setWidth(span);
}else{
_b1f.setHeight(span);
}
}
});
}
if(_b11!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _b22=this.getLayout();
if(_b22){
this.setProperty("layout",_b22);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _b23=this.isHorizontalOrient();
var _b24=this.getSplitPanelBindings();
var _b25=this.getSplitterBindings();
var _b26=null;
var _b27=null;
var unit=null;
var _b29=null;
var span=null;
_b24.each(function(_b2b){
if(!unit){
unit=_b23?_b2b.getWidth():_b2b.getHeight();
}
span=_b23?_b2b.getWidth():_b2b.getHeight();
if(_b29){
span-=_b29;
_b29=null;
}
_b26=_b25.getNext();
if(_b26&&_b26.offset){
_b29=_b26.offset;
span+=_b29;
}
_b2b.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b2c){
this.logger.debug(_b2c);
this.setProperty("layout",_b2c);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b2d="",_b2e=this.getSplitPanelBindings();
_b2e.each(function(_b2f){
_b2d+=_b2f.getRatio().toString();
_b2d+=_b2e.hasNext()?":":"";
});
this.setProperty("layout",_b2d);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b30=this.getSplitPanelElements();
_b30.each(function(_b31){
layout+="1"+(_b30.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b32){
this.bindingElement.style.width=_b32+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b33){
this.bindingElement.style.height=_b33+"px";
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
SplitBoxBinding.prototype.fit=function(_b34){
if(!this.isFit||_b34){
if(this.isHorizontalOrient()){
var max=0;
var _b36=this.getSplitPanelBindings();
_b36.each(function(_b37){
var _b38=_b37.bindingElement.offsetHeight;
max=_b38>max?_b38:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b39){
var _b3a=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b39);
return UserInterface.registerBinding(_b3a,SplitBoxBinding);
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
var _b3d=this.getProperty("hidden");
if(_b3d){
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
var _b3e=this.getProperty("ratiocache");
if(_b3e){
this.setRatio(_b3e);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b3f){
if(!this.isFixed){
if(_b3f!=this.getWidth()){
if(_b3f<0){
_b3f=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b3f+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b3f);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b40=null;
if(this.isFixed){
_b40=this.getFix();
}else{
_b40=this.bindingElement.offsetWidth;
}
return _b40;
};
SplitPanelBinding.prototype.setHeight=function(_b41){
if(!this.isFixed){
if(_b41!=this.getHeight()){
try{
this.bindingElement.style.height=_b41+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b42=null;
if(this.isFixed){
_b42=this.getFix();
}else{
_b42=this.bindingElement.offsetHeight;
}
return _b42;
};
SplitPanelBinding.prototype.setRatio=function(_b43){
this.setProperty("ratio",_b43);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b44){
if(_b44){
this._fixedSpan=_b44;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b44);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b44);
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
SplitPanelBinding.newInstance=function(_b45){
var _b46=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b45);
return UserInterface.registerBinding(_b46,SplitPanelBinding);
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
var _b47=SplitBoxBinding.superclass.serialize.call(this);
if(_b47){
_b47.collapse=this.getProperty("collapse");
_b47.collapsed=this.getProperty("collapsed");
_b47.disabled=this.getProperty("isdisabled");
}
return _b47;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b48=this.getProperty("hidden");
if(_b48){
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
SplitterBinding.prototype.setCollapseDirection=function(_b4a){
this.setProperty("collapse",_b4a);
this._collapseDirection=_b4a;
};
SplitterBinding.prototype.handleAction=function(_b4b){
SplitterBinding.superclass.handleAction.call(this,_b4b);
switch(_b4b.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b4b.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b4d=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b4d.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b4d.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b4e){
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
SplitterBinding.newInstance=function(_b59){
var _b5a=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b59);
return UserInterface.registerBinding(_b5a,SplitterBinding);
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
var _b5b=this.getProperty("selectedindex");
var _b5c=this.getDeckElements();
if(_b5c.hasEntries()){
var _b5d=false;
var _b5e=0;
while(_b5c.hasNext()){
var deck=_b5c.getNext();
if(_b5b&&_b5e==_b5b){
deck.setAttribute("selected","true");
_b5d=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b5d=true;
}
}
_b5e++;
}
if(!_b5d){
_b5c.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b61=this.getBindingForArgument(arg);
if(_b61!=null){
if(_b61!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b61.select();
this._selectedDeckBinding=_b61;
var _b62=this.getProperty("selectedindex");
if(_b62!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b61.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b63=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b63=true;
this._lastKnownDimension=dim1;
}
return _b63;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b66){
var _b67=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b66);
return UserInterface.registerBinding(_b67,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b68){
DeckBinding.superclass.handleAction.call(this,_b68);
var _b69=_b68.target;
switch(_b68.type){
case BalloonBinding.ACTION_INITIALIZE:
_b68.consume();
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
DeckBinding.newInstance=function(_b6b){
var _b6c=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b6b);
return UserInterface.registerBinding(_b6c,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b6d){
if(_b6d instanceof ToolBarBodyBinding){
if(_b6d.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b6d;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b6d;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b6d);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b6e=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b6e){
this.setImageSize(_b6e);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b70=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b70.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b70.isDefaultContent=true;
this.add(_b70);
_b70.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b72=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b72);
}
if(_b72!=null&&_b72.hasClassName("max")){
this._maxToolBarGroup(_b72,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b74){
var _b75=this.boxObject.getDimension().w;
var _b76=CSSComputer.getPadding(this.bindingElement);
_b75-=(_b76.left+_b76.right);
if(_b74!=null){
_b75-=_b74.boxObject.getDimension().w;
if(!Client.isWindows){
_b75-=1;
}
if(Client.isExplorer){
_b75-=15;
}
}
max.bindingElement.style.width=_b75+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b77){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b77);
};
ToolBarBinding.prototype.addLeft=function(_b78,_b79){
var _b7a=null;
if(this._toolBarBodyLeft!=null){
_b7a=this._toolBarBodyLeft.add(_b78,_b79);
}else{
throw new Error("No left toolbarbody");
}
return _b7a;
};
ToolBarBinding.prototype.addLeftFirst=function(_b7b,_b7c){
var _b7d=null;
if(this._toolBarBodyLeft){
_b7d=this._toolBarBodyLeft.addFirst(_b7b,_b7c);
}else{
throw new Error("No left toolbarbody");
}
return _b7d;
};
ToolBarBinding.prototype.addRight=function(_b7e){
var _b7f=null;
if(this._toolBarBodyRight){
_b7f=this._toolBarBodyRight.add(_b7e);
}else{
throw new Error("No left toolbarbody");
}
return _b7f;
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
ToolBarBinding.newInstance=function(_b82){
var _b83=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b82);
return UserInterface.registerBinding(_b83,ToolBarBinding);
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
var _b84=this.getDescendantBindingsByLocalName("toolbargroup");
var _b85=new List();
var _b86=true;
_b84.each(function(_b87){
if(_b87.isVisible&&!_b87.isDefaultContent){
_b85.add(_b87);
}
});
while(_b85.hasNext()){
var _b88=_b85.getNext();
_b88.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b86){
_b88.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b86=false;
}
if(!_b85.hasNext()){
_b88.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b8b=list.getNext();
var _b8c=_b8b.getEqualSizeWidth();
if(_b8c>max){
max=_b8c;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b8b=list.getNext();
_b8b.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b8d,_b8e){
var _b8f=ToolBarBinding.superclass.add.call(this,_b8d);
if(!_b8e){
if(_b8d instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b8f;
};
ToolBarBodyBinding.prototype.addFirst=function(_b90,_b91){
var _b92=ToolBarBinding.superclass.addFirst.call(this,_b90);
if(!_b91){
if(_b90 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b92;
};
ToolBarBodyBinding.newInstance=function(_b93){
var _b94=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b93);
return UserInterface.registerBinding(_b94,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b95){
switch(_b95){
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
var _b96=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b96)=="toolbarbody"){
UserInterface.getBinding(_b96).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b97=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b97)=="toolbarbody"){
UserInterface.getBinding(_b97).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b98){
var _b99=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b98);
return UserInterface.registerBinding(_b99,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b9a){
var _b9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b9a);
return UserInterface.registerBinding(_b9b,ToolBarButtonBinding);
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
var _b9c=this.getProperty("label");
var _b9d=this.getProperty("image");
if(_b9c){
this.setLabel(_b9c);
}
if(_b9d){
this.setImage(_b9d);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b9e,_b9f){
if(this.isAttached){
this._labelBinding.setLabel(_b9e,_b9f);
}
this.setProperty("label",_b9e);
};
ToolBarLabelBinding.prototype.setImage=function(_ba0,_ba1){
if(this.isAttached){
this._labelBinding.setImage(_ba0,_ba1);
}
this.setProperty("image",_ba0);
};
ToolBarLabelBinding.newInstance=function(_ba2){
var _ba3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_ba2);
return UserInterface.registerBinding(_ba3,ToolBarLabelBinding);
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
var _ba4=this.getDescendantBindingsByLocalName("clickbutton");
if(_ba4.hasEntries()){
while(_ba4.hasNext()){
var _ba5=_ba4.getNext();
if(_ba5.isDefault){
this._defaultButton=_ba5;
_ba5.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_ba5.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_ba4;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_ba6,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_ba6,arg);
switch(_ba6){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _ba8=this.getAncestorBindingByType(DialogBinding,true);
if(_ba8!=null&&_ba8.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_ba9){
DialogToolBarBinding.superclass.handleAction.call(this,_ba9);
var _baa=_ba9.target;
var _bab=false;
var _bac=this._buttons.reset();
if(_baa instanceof ClickButtonBinding){
switch(_ba9.type){
case Binding.ACTION_FOCUSED:
_baa.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_baa;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_baa.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_bab&&_bac.hasNext()){
var _bad=_bac.getNext();
_bab=_bad.isFocused;
}
if(!_bab){
this._defaultButton.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
this._focusedButton=null;
}
}
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
var _bae=this._views;
for(var _baf in ViewDefinitions){
var def=ViewDefinitions[_baf];
var key=def.perspective;
if(key!=null){
if(!_bae.has(key)){
_bae.set(key,new List());
}
var list=_bae.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_bb3,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_bb3,arg);
switch(_bb3){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var _bb6=this.bindingWindow.bindingMap.toolboxpopupgroup;
_bb6.empty();
if(this._views.has(tag)){
var list=this._views.get(tag);
list.each(function(def){
var item=_bb6.add(StageViewMenuItemBinding.newInstance(_bb6.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
_bb6.show();
}else{
_bb6.hide();
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
TreeBinding.grid=function(_bba){
var _bbb=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_bba);
var _bbd=_bba%_bbb;
if(_bbd>0){
_bba=_bba-_bbd+_bbb;
}
return _bba+TreeBodyBinding.PADDING_TOP;
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
var _bbe=this.getProperty("focusable");
if(_bbe!=null){
this._isFocusable=_bbe;
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
var _bc0=this.getProperty("builder");
if(_bc0){
this._buildFromTextArea(_bc0);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _bc1=this.getProperty("selectable");
var _bc2=this.getProperty("selectionproperty");
var _bc3=this.getProperty("selectionvalue");
if(_bc1){
this.setSelectable(true);
if(_bc2){
this.setSelectionProperty(_bc2);
}
if(_bc3){
this.setSelectionValue(_bc3);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _bc6=UserInterface.getBinding(area);
var _bc7=this._treeBodyBinding;
function build(){
_bc7.subTreeFromString(area.value);
}
_bc6.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_bc8){
var _bc9=_bc8.getHandle();
if(this._treeNodeBindings.has(_bc9)){
throw "Duplicate treenodehandles registered: "+_bc8.getLabel();
}else{
this._treeNodeBindings.set(_bc9,_bc8);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_bc9)){
_bc8.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_bcb){
this._treeNodeBindings.del(_bcb.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_bcc){
var _bcd=null;
if(this._treeNodeBindings.has(_bcc)){
_bcd=this._treeNodeBindings.get(_bcc);
}else{
throw "No such treenode: "+_bcc;
}
return _bcd;
};
TreeBinding.prototype.handleAction=function(_bce){
TreeBinding.superclass.handleAction.call(this,_bce);
var _bcf=_bce.target;
switch(_bce.type){
case TreeNodeBinding.ACTION_OPEN:
_bce.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_bcf);
_bce.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_bcf;
this.focusSingleTreeNodeBinding(_bcf);
if(!this.isFocused){
this.focus();
}
_bce.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_bcf;
this.focusSingleTreeNodeBinding(_bcf);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_bcf;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_bcf;
this.focusSingleTreeNodeBinding(_bcf);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_bce.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_bcf.isFocused){
this.blurSelectedTreeNodes();
}
_bce.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_bd0,_bd1){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bd2){
if(_bd2!=null&&!_bd2.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bd2);
_bd2.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_bd3){
this.blurSelectedTreeNodes();
while(_bd3.hasNext()){
var _bd4=_bd3.getNext();
this._focusedTreeNodeBindings.add(_bd4);
_bd4.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _bd5=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _bd6=false;
var _bd7=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _bd8=this._focusedTreeNodeBindings.getNext();
var _bd9=_bd8.getProperty(this._selectionProperty);
if(_bd9!=null){
if(!this._selectionValue||this._selectionValue[_bd9]){
_bd7=(this._selectedTreeNodeBindings[_bd8.key]=_bd8);
var _bda=_bd5[_bd8.key];
if(!_bda||_bda!=_bd7){
_bd6=true;
}
}
}
}
if(_bd7){
if(_bd6){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_bd5){
for(var key in _bd5){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _bdc=new List();
for(var key in this._selectedTreeNodeBindings){
_bdc.add(this._selectedTreeNodeBindings[key]);
}
return _bdc;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_bde){
_bde.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_bdf){
var _be0=_bdf.getDescendantBindingsByLocalName("treenode");
var _be1=true;
var self=this;
_be0.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _be1;
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
var _be4=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_be4!=null){
this.focusSingleTreeNodeBinding(_be4);
_be4.callback();
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
TreeBinding.prototype.add=function(_be5){
var _be6=null;
if(this._treeBodyBinding){
_be6=this._treeBodyBinding.add(_be5);
}else{
this._treeNodeBuffer.add(_be5);
_be6=_be5;
}
return _be6;
};
TreeBinding.prototype.addFirst=function(_be7){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _be8=this._treeBodyBinding.bindingElement;
_be8.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_be9,_bea){
if(_bea.isContainer&&_bea.isOpen){
_bea.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_beb){
this._isSelectable=_beb;
if(_beb){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_bec){
this._selectionProperty=_bec;
};
TreeBinding.prototype.setSelectionValue=function(_bed){
if(_bed){
var list=new List(_bed.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_bef,arg){
TreeBinding.superclass.handleBroadcast.call(this,_bef,arg);
switch(_bef){
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
var _bf1=this.getFocusedTreeNodeBindings();
if(_bf1.hasEntries()){
var node=_bf1.getFirst();
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
var _bf4=this.getFocusedTreeNodeBindings();
if(_bf4.hasEntries()){
var node=_bf4.getFirst();
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
var _bf7=null;
while(next==null&&(_bf7=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_bf7!=null){
next=_bf7.getNextBindingByLocalName("treenode");
}
node=_bf7;
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
var _bf9=DOMEvents.getTarget(e);
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
var _bfa=new TreeCrawler();
var list=new List();
_bfa.mode=TreeCrawler.MODE_GETOPEN;
_bfa.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _bfd=list.getNext();
map.set(_bfd.getHandle(),true);
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
var _c02=this._positionIndicatorBinding;
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
if(y!=_c02.getPosition().y){
_c02.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_c02.isVisible){
_c02.show();
}
}else{
if(_c02.isVisible){
_c02.hide();
}
}
}else{
if(_c02.isVisible){
_c02.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_c05){
this._acceptingTreeNodeBinding=_c05;
this._acceptingPosition=_c05.boxObject.getLocalPosition();
this._acceptingDimension=_c05.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_c05);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_c06){
var map={};
var _c08=_c06.getChildBindingsByLocalName("treenode");
var _c09,pos,dim,y;
y=TreeBinding.grid(_c06.boxObject.getLocalPosition().y);
map[y]=true;
while(_c08.hasNext()){
_c09=_c08.getNext();
pos=_c09.boxObject.getLocalPosition();
dim=_c09.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _c0f in this._acceptingPositions){
if(_c0f==y){
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
TreeBinding.newInstance=function(_c10){
var _c11=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_c10);
var _c12=UserInterface.registerBinding(_c11,TreeBinding);
_c12.treeBodyBinding=TreeBodyBinding.newInstance(_c10);
return _c12;
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
TreeBodyBinding.prototype.accept=function(_c13){
if(_c13 instanceof TreeNodeBinding){
this.logger.debug(_c13);
}
};
TreeBodyBinding.prototype.handleAction=function(_c14){
TreeBodyBinding.superclass.handleAction.call(this,_c14);
switch(_c14.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_c14.target);
_c14.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_c15){
var a=this.boxObject.getDimension().h;
var y=_c15.boxObject.getLocalPosition().y;
var h=_c15.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _c1b=_c15.labelBinding.bindingElement;
if(y-t<0){
_c1b.scrollIntoView(true);
}else{
if(y-t+h>a){
_c1b.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_c1c){
var _c1d=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_c1c);
return UserInterface.registerBinding(_c1d,TreeBodyBinding);
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
var _c1e=TreeNodeBinding.superclass.serialize.call(this);
if(_c1e){
_c1e.label=this.getLabel();
_c1e.image=this.getImage();
var _c1f=this.getHandle();
if(_c1f&&_c1f!=this.key){
_c1e.handle=_c1f;
}
if(this.isOpen){
_c1e.open=true;
}
if(this.isDisabled){
_c1e.disabled=true;
}
if(this.dragType){
_c1e.dragtype=this.dragType;
}
if(this.dragAccept){
_c1e.dragaccept=this.dragAccept;
}
}
return _c1e;
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
var _c21=UserInterface.getBinding(node);
if(_c21&&_c21.containingTreeBinding){
this.containingTreeBinding=_c21.containingTreeBinding;
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
var _c22=this.key;
var _c23=this.getProperty("handle");
if(_c23){
_c22=_c23;
}
return _c22;
};
TreeNodeBinding.prototype.setHandle=function(_c24){
this.setProperty("handle",_c24);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c26=this.getProperty("label");
var _c27=this.getProperty("tooltip");
var _c28=this.getProperty("oncommand");
var _c29=this.getProperty("onbindingfocus");
var _c2a=this.getProperty("onbindingblur");
var _c2b=this.getProperty("focused");
var _c2c=this.getProperty("callbackid");
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
if(_c26!=null){
this.setLabel(_c26);
}
if(_c27!=null){
this.setToolTip(_c27);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c2e=this.bindingWindow.WindowManager;
if(_c28!=null){
this.oncommand=function(){
Binding.evaluate(_c28,this);
};
}
if(_c29!=null){
this.onfocus=function(){
Binding.evaluate(_c29,this);
};
}
if(_c2a!=null){
this.onblur=function(){
Binding.evaluate(_c2a,this);
};
}
if(_c2b==true){
this.focus();
}
if(_c2c!=null){
Binding.dotnetify(this,_c2c);
}
};
TreeNodeBinding.prototype.handleAction=function(_c2f){
TreeNodeBinding.superclass.handleAction.call(this,_c2f);
switch(_c2f.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c2f.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c30,_c31){
var _c32=true;
if(_c30 instanceof TreeNodeBinding){
var _c33=false;
var _c34=this.bindingElement;
var _c35=this.containingTreeBinding.bindingElement;
while(!_c33&&_c34!=_c35){
if(_c34==_c30.getBindingElement()){
_c33=true;
}else{
_c34=_c34.parentNode;
}
}
if(_c33){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c32=false;
}else{
this.acceptTreeNodeBinding(_c30,_c31);
}
}else{
_c32=false;
}
return _c32;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c36,_c37){
var _c38=_c36.serializeToString();
var _c39=new BindingParser(this.bindingDocument);
var _c3a=_c39.parseFromString(_c38).getFirst();
_c37=_c37?_c37:this.containingTreeBinding.getDropIndex();
var _c3b=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c3a,_c3b.get(_c37));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c36.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c3c=this.getProperty("image");
var _c3d=this.getProperty("image-active");
var _c3e=this.getProperty("image-disabled");
_c3d=_c3d?_c3d:this.isContainer?_c3c?_c3c:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c3c?_c3c:TreeNodeBinding.DEFAULT_ITEM;
_c3e=_c3e?_c3e:this.isContainer?_c3c?_c3c:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c3c?_c3c:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c3c=_c3c?_c3c:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c3c,imageHover:null,imageActive:_c3d,imageDisabled:_c3e});
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
TreeNodeBinding.prototype.setLabel=function(_c40){
this.setProperty("label",String(_c40));
if(this.isAttached){
this.labelBinding.setLabel(String(_c40));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c41){
this.setProperty("tooltip",String(_c41));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c41));
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
var _c42=this.imageProfile.getDefaultImage();
var _c43=this.imageProfile.getActiveImage();
_c43=_c43?_c43:_c42;
return this.isOpen?_c43:_c42;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c45=DOMEvents.getTarget(e);
var _c46=this.labelBinding.bindingElement;
var _c47=this.labelBinding.shadowTree.labelBody;
var _c48=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c45){
case _c46:
this._onAction(e);
break;
case _c47:
case _c48:
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
if(_c45.parentNode==this.bindingElement&&_c45.__updateType==Update.TYPE_INSERT){
var _c46=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c45)=="treenode"){
if(_c45==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c45,_c46.nextSibling);
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
switch(_c45){
case _c46:
case _c47:
case _c48:
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
var _c4c=true;
if(e.type=="mousedown"){
var _c4d=e.button==(e.target?0:1);
if(!_c4d){
_c4c=false;
}
}
if(_c4c){
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
var _c4f=false;
if(e!=null){
_c4f=e.shiftKey;
}
this.dispatchAction(_c4f?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c52=this.getDescendantBindingsByLocalName("treenode");
_c52.each(function(_c53){
_c53.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c54){
var _c55=_c54.getAttribute("focused");
if(_c55=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c56){
var _c57=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c56);
return UserInterface.registerBinding(_c57,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c58){
var _c59=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c58);
return UserInterface.registerBinding(_c59,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c5a){
this.bindingElement.style.left=_c5a.x+"px";
this.bindingElement.style.top=_c5a.y+"px";
this._geometry.x=_c5a.x;
this._geometry.y=_c5a.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c5b){
var _c5c=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c5b);
return UserInterface.registerBinding(_c5c,TreePositionIndicatorBinding);
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
this.addFilter(function(_c5e){
var _c5f=UserInterface.getBinding(_c5e);
var _c60=null;
var _c60=null;
if(!_c5f instanceof TreeNodeBinding){
_c60=NodeCrawler.SKIP_NODE;
}
return _c60;
});
this.addFilter(function(_c61,list){
var _c63=UserInterface.getBinding(_c61);
var _c64=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c63.isOpen){
list.add(_c63);
}
break;
}
return _c64;
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
ShadowBinding.prototype.shadow=function(_c65){
this.targetBinding=_c65;
_c65.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c65.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c65.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c65.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c65.isVisible){
this.show();
this.setPosition(_c65.getPosition());
this.setDimension(_c65.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c66){
ShadowBinding.superclass.handleAction.call(this,_c66);
var _c67=_c66.target;
if(_c67==this.targetBinding){
switch(_c66.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c66.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c67.isVisible){
this.show();
this.setPosition(_c67.getPosition());
this.setDimension(_c67.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c68){
var _c69=this.offset-this.expand;
this.bindingElement.style.left=new String(_c68.x+_c69)+"px";
this.bindingElement.style.top=new String(_c68.y+_c69)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c6b){
var _c6c=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c6b);
return UserInterface.registerBinding(_c6c,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c6d){
this.binding=_c6d;
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
DockTabsButtonBinding.newInstance=function(_c6e){
var _c6f=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c6e);
_c6f.setAttribute("type","checkbox");
_c6f.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c6f.className="tabbutton";
return UserInterface.registerBinding(_c6f,DockTabsButtonBinding);
};
DockBinding.prototype=new TabBoxBinding;
DockBinding.prototype.constructor=DockBinding;
DockBinding.superclass=TabBoxBinding.prototype;
DockBinding.START="start";
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
var _c70=DockBinding.superclass.serialize.call(this);
if(_c70){
_c70.active=this.isActive?true:null;
_c70.collapsed=this.isCollapsed?true:null;
}
return _c70;
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
var _c71=UserInterface.getBinding(this.bindingElement.parentNode);
var _c72=MatrixBinding.newInstance(this.bindingDocument);
_c72.attachClassName("dockliner");
this.shadowTree.dockLiner=_c72;
_c71.add(_c72);
_c72.attach();
_c72.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c74){
var _c75=this.getSelectedTabPanelBinding();
if(_c75){
_c75.isVisible=_c74;
_c75.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c76){
var _c77=this._getBindingForDefinition(_c76);
var _c78=DockTabBinding.newInstance(this.bindingDocument);
_c78.setHandle(_c76.handle);
_c78.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c76.label);
_c78.setImage(_c76.image);
_c78.setToolTip(_c76.toolTip);
_c78.setEntityToken(_c76.entityToken);
_c78.setAssociatedView(_c77);
this.appendTabByBindings(_c78,null);
this._setupPageBindingListeners(_c78);
var _c79=this.getTabPanelBinding(_c78);
_c77.snapToBinding(_c79);
var _c7a=this.bindingWindow.bindingMap.views;
_c7a.add(_c77);
if(!this.isActive){
this.activate();
}
_c77.attach();
};
DockBinding.prototype.prepareOpenView=function(_c7b,_c7c){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c7c.setLabel(_c7b.label);
_c7c.setImage(_c7b.image);
_c7c.setToolTip(_c7b.toolTip);
this._setupPageBindingListeners(_c7c);
var _c7d=this.getTabPanelBinding(_c7c);
var _c7e=this._getBindingForDefinition(_c7b);
_c7c.setAssociatedView(_c7e);
_c7e.snapToBinding(_c7d);
UserInterface.getBinding(this.bindingDocument.body).add(_c7e);
_c7e.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c7f){
var _c80=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c80.bindingDocument);
view.setDefinition(_c7f);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c82){
var _c83=this.getTabPanelBinding(_c82);
var self=this;
var _c85={handleAction:function(_c86){
var _c87=_c86.target;
switch(_c86.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c87.reflex(true);
var view=_c82.getAssociatedView();
if(_c87.bindingWindow==view.getContentWindow()){
_c82.updateDisplay(_c87);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c82.onPageInitialize(_c87);
_c86.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c82.updateDisplay(_c87);
_c86.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c82.updateEntityToken(_c87);
_c86.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c82.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_c82.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c82);
_c86.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c82,true);
_c86.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c82);
break;
case Binding.ACTION_FORCE_REFLEX:
_c83.reflex(true);
_c86.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c82.isDirty){
_c82.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_c89){
_c83.addActionListener(_c89,_c85);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_c8a){
DockBinding.superclass.handleAction.call(this,_c8a);
var _c8b=_c8a.target;
switch(_c8a.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_c8a.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_c8b instanceof DockBinding){
if(_c8b.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_c8b);
if(this.isActive){
_c8b.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_c8b);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_c8c,arg){
DockBinding.superclass.handleBroadcast.call(this,_c8c,arg);
switch(_c8c){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _c8e=arg;
if(_c8e.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_c8e.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_c8f){
var tabs=this.getTabBindings();
var _c91=false;
while(tabs.hasNext()&&!_c91){
var tab=tabs.getNext();
var _c93=tab.getEntityToken();
if(_c93!=null&&_c93==_c8f){
if(!tab.isSelected){
this.select(tab,true);
_c91=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c94){
this._handleCollapse(true,_c94);
};
DockBinding.prototype.unCollapse=function(_c95){
this._handleCollapse(false,_c95);
};
DockBinding.prototype._handleCollapse=function(_c96,_c97){
var _c98=this.getChildBindingByLocalName("dockpanels");
var _c99=this.getAncestorBindingByLocalName("splitbox");
if(_c96){
_c98.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c97&&_c99.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c98.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c97){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c96);
this.isCollapsed=_c96;
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
DockBinding.prototype.closeTab=function(_c9e,_c9f){
if(_c9e.isDirty&&!_c9f){
var _ca0=Resolver.resolve(_c9e.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_ca0),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_ca2){
switch(_ca2){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c9e);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c9e);
break;
}
}});
}else{
this.removeTab(_c9e);
}
};
DockBinding.prototype.closeTabsExcept=function(_ca3){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_ca3){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_ca6){
var _ca7=_ca6.getAssociatedView();
_ca7.saveContainedEditor();
var self=this;
var _ca9={handleBroadcast:function(_caa,arg){
switch(_caa){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_ca7.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_ca9);
if(arg.isSuccess){
self.removeTab(_ca6);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_ca9);
};
DockBinding.prototype.appendTabByBindings=function(_cac,_cad){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_cac,_cad);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_cae){
_cae=_cae?_cae+"px":"100%";
this.bindingElement.style.width=_cae;
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
DockBinding.prototype.showControls=function(_caf){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_caf){
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
var _cb2=DockControlBinding.newInstance(this.bindingDocument);
_cb2.setControlType(type);
return _cb2;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cb4=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cb4)){
_cb4=_cb4>0?_cb4-1:0;
self.bindingElement.style.width=new String(_cb4)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_cb5){
DockTabsBinding.superclass.handleCrawler.call(this,_cb5);
switch(_cb5.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _cb7=self.containingTabBoxBinding.getWidth();
if(!isNaN(_cb7)){
_cb7=_cb7>0?_cb7-1:0;
self.bindingElement.style.width=new String(_cb7)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_cb8){
var _cb9=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_cb8);
return UserInterface.registerBinding(_cb9,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_cba){
this._viewBinding=_cba;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _cbb=DockTabBinding.superclass.serialize.call(this);
if(_cbb){
_cbb.label=null;
_cbb.image=null;
_cbb.handle=this.getHandle();
}
return _cbb;
};
DockTabBinding.prototype.setHandle=function(_cbc){
this.setProperty("handle",_cbc);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_cbd){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_cbd;
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
var _cbe=DialogControlBinding.newInstance(this.bindingDocument);
_cbe.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_cbe);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_cbf){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_cbf){
this.isDirty=_cbf;
if(Binding.exists(this.labelBinding)){
var _cc0=this.labelBinding.getLabel();
if(_cc0!=null){
this.labelBinding.setLabel(_cbf?"*"+_cc0:_cc0.slice(1,_cc0.length));
}else{
this.labelBinding.setLabel(_cbf?"*":"");
}
}
}
var _cc1=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_cc1.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_cc1.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_cc2){
this.setLabel(_cc2.getLabel());
this.setImage(_cc2.getImage());
this.setToolTip(_cc2.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_cc3){
this.setEntityToken(_cc3.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_cc4){
DockTabBinding.superclass.handleAction.call(this,_cc4);
var _cc5=_cc4.target;
switch(_cc4.type){
case ControlBinding.ACTION_COMMAND:
if(_cc5.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_cc4.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_cc5);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_cc6){
var cmd=_cc6.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_cc8){
if(!_cc8){
if(!this.getLabel()){
_cc8=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_cc8=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_cc8);
};
DockTabBinding.prototype.setImage=function(_cc9){
if(!_cc9){
if(!this.getImage()){
_cc9=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_cc9=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_cc9);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _ccc=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_ccc;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_ccc;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_ccc;
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
var _cce=this.bindingElement;
setTimeout(function(){
_cce.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_ccf,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_ccf,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_ccf){
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
DockTabBinding.prototype.select=function(_cd4){
DockTabBinding.superclass.select.call(this,_cd4);
this._updateBroadcasters();
if(_cd4!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cd5=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cd6=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cd6.enable();
if(this.isDirty){
_cd5.enable();
}else{
_cd5.disable();
}
}else{
_cd6.disable();
_cd5.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cd7){
if(this._canUpdateTree||_cd7){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cd8=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cda=win.bindingMap.savebutton;
if(_cda!=null){
_cd8=true;
}
}
}
return _cd8;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cdb){
var _cdc=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cdb);
return UserInterface.registerBinding(_cdc,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_cdd){
var _cde=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_cdd);
return UserInterface.registerBinding(_cde,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_cdf){
DockPanelBinding.superclass.select.call(this,_cdf);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_ce0){
DockPanelBinding.superclass.handleCrawler.call(this,_ce0);
if(_ce0.response==null){
if(_ce0.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_ce0.id==FocusCrawler.ID){
_ce0.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_ce1){
var _ce2=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_ce1);
return UserInterface.registerBinding(_ce2,DockPanelBinding);
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
DockControlBinding.newInstance=function(_ce3){
var _ce4=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ce3);
return UserInterface.registerBinding(_ce4,DockControlBinding);
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
ViewBinding.getInstance=function(_ce5){
var _ce6=ViewBinding._instances.get(_ce5);
if(!_ce6){
var cry="ViewBinding.getInstance: No such instance: "+_ce5;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _ce6;
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
var _ce9=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_ce9){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _cea=snap.boxObject.getGlobalPosition();
var _ceb=snap.boxObject.getDimension();
if(!Point.isEqual(_cea,this._lastknownposition)){
this.setPosition(_cea);
this._lastknownposition=_cea;
}
if(!Dimension.isEqual(_ceb,this._lastknowndimension)){
this.setDimension(_ceb);
this._lastknowndimension=_ceb;
var _cec=_ceb.h-ViewBinding.VERTICAL_ADJUST;
_cec=_cec<0?0:_cec;
this.windowBinding.getBindingElement().style.height=new String(_cec)+"px";
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
var _ced=this._viewDefinition.flowHandle;
if(_ced!=null){
FlowControllerService.CancelFlow(_ced);
}
}
if(this._viewDefinition!=null){
var _cee=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_cee);
this.logger.fine("ViewBinding closed: \""+_cee+"\"");
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
var _cf0=null;
if(this._viewDefinition!=null){
_cf0=this._viewDefinition.handle;
}
return _cf0;
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
ViewBinding.prototype.setDefinition=function(_cf1){
this._viewDefinition=_cf1;
if(_cf1.position==DockBinding.MAIN){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_cf2){
ViewBinding.superclass.handleAction.call(this,_cf2);
var _cf3=_cf2.target;
switch(_cf2.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_cf2.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_cf3.isActivated){
_cf3.onActivate();
}
}
_cf2.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_cf3==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_cf2.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_cf3==this._snapBinding){
if(_cf3.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_cf3.getContentWindow().isPostBackDocument){
if(_cf2.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_cf3.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_cf3==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_cf3.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_cf2.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_cf2.type==WindowBinding.ACTION_ONLOAD){
var win=_cf3.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_cf3);
}
}
}
_cf2.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_cf3.label&&this._viewDefinition.label){
_cf3.label=this._viewDefinition.label;
}
if(!_cf3.image&&this._viewDefinition.image){
_cf3.image=this._viewDefinition.image;
}
if(_cf3.bindingWindow==this.getContentWindow()){
this._pageBinding=_cf3;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_cf3.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_cf3==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_cf2.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_cf2.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_cf8,arg){
ViewBinding.superclass.handleBroadcast.call(this,_cf8,arg);
switch(_cf8){
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
var _cfc=def.argument;
if(_cfc!=null){
page.setPageArgument(_cfc);
}
var _cfd=def.width;
if(_cfd!=null){
page.width=_cfd;
}
var _cfe=def.height;
if(_cfe!=null){
page.height=_cfe;
}
}
};
ViewBinding.prototype.handleCrawler=function(_cff){
ViewBinding.superclass.handleCrawler.call(this,_cff);
switch(_cff.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_cff.id==FocusCrawler.ID){
if(_cff.previousNode!=this._snapBinding.bindingElement){
_cff.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_cff.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_d00){
_d00.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_d00.x+"px";
this.bindingElement.style.top=_d00.y+"px";
};
ViewBinding.prototype.setDimension=function(_d01){
_d01.h-=ViewBinding.VERTICAL_ADJUST;
_d01.w-=ViewBinding.HORIZONTAL_ADJUST;
_d01.w-=1;
if(_d01.h<0){
_d01.h=0;
}
if(_d01.w<0){
_d01.w=0;
}
this.bindingElement.style.width=String(_d01.w)+"px";
this.bindingElement.style.height=String(_d01.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_d02){
this.isFlexBoxBehavior=false;
_d02.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_d02.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_d02.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_d02.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_d02;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _d03=null;
if(this.isFreeFloating==true){
_d03=this._snapBinding.getBindingElement();
}else{
_d03=ViewBinding.superclass.getMigrationParent.call(this);
}
return _d03;
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
ViewBinding.prototype.reload=function(_d04){
this._isLoaded=false;
this.windowBinding.reload(_d04);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _d05=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_d05=true;
}
}
if(!_d05){
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
ViewBinding.newInstance=function(_d09){
var _d0a=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_d09);
var _d0b=UserInterface.registerBinding(_d0a,ViewBinding);
_d0b.windowBinding=_d0b.add(WindowBinding.newInstance(_d09));
_d0b.windowBinding.isFlexible=false;
return _d0b;
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
var _d13=this.bindingWindow.__doPostBack;
var _d14=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_d14){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_d15,_d16){
if(!form.__isSetup){
Application.lock(self);
_d14=true;
}
self.manifestAllDataBindings();
_d13(_d15,_d16);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_d17,list){
var _d19=this.bindingWindow.bindingMap.__REQUEST;
if(_d19!=null&&this._isDotNet()){
switch(_d17){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_d19.postback(_d17);
}
}
break;
default:
_d19.postback(_d17);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_d17,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_d1a,list){
var _d1c=this.getDescendantBindingsByType(WindowBinding);
_d1c.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_d1a,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d20){
list.add({name:_d20.name,value:_d20.value});
});
var out="";
list.each(function(_d22){
out+=_d22.name+": "+_d22.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_d23){
PageBinding.superclass.handleAction.call(this,_d23);
var _d24=_d23.target;
switch(_d23.type){
case RootBinding.ACTION_PHASE_3:
if(_d24==UserInterface.getBinding(this.bindingDocument.body)){
_d24.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_d24);
}
_d23.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _d25=this.validateAllDataBindings();
if(_d25){
this.doPostBack(_d24);
}
}
_d23.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_d23.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_d24.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_d24.key)){
this._initBlockers.del(_d24.key);
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
var _d27={handleAction:function(_d28){
if(_d28.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d27);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d27);
}else{
MessageQueue.udpdate();
}
_d23.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d29,arg){
PageBinding.superclass.handleBroadcast.call(this,_d29,arg);
switch(_d29){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d2b=arg;
if(!this._canPostBack&&!_d2b){
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
PageBinding.prototype.doPostBack=function(_d2d){
if(this._canPostBack){
if(_d2d!=null&&this._isDotNet()){
var _d2e=_d2d.getCallBackID();
var _d2f=_d2d.getCallBackArg();
if(_d2e!=null){
_d2e=_d2e.replace(/_/g,"$");
}else{
_d2e="";
}
if(_d2f==null){
_d2f="";
}
this.bindingWindow.__doPostBack(_d2e,_d2f);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _d30=true;
var _d31=this.bindingWindow.DataManager.getAllDataBindings();
while(_d31.hasNext()&&_d30){
var _d32=_d31.getNext();
if(_d32.isAttached){
var _d33=_d32.validate();
if(_d30&&!_d33){
_d30=false;
this.logger.debug("Invalid DataBinding: "+_d32.toString()+" ("+_d32.getName()+")");
break;
}
}
}
return _d30;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d35=this.bindingWindow.DataManager.getAllDataBindings();
while(_d35.hasNext()){
var _d36=_d35.getNext();
if(_d36.isAttached){
var _d37=_d36.manifest();
if(_d37!=null){
list.add(_d37);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d38=this.bindingWindow.DataManager.getAllDataBindings();
while(_d38.hasNext()){
var _d39=_d38.getNext();
if(_d39.isAttached){
_d39.clean();
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
var _d3b=this._cachedFocus.getBinding();
if(_d3b){
_d3b.blur();
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
var _d3c=this.getProperty("width");
if(!_d3c){
_d3c=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d3c;
}
if(this.height==null){
var _d3d=this.getProperty("height");
this.height=_d3d?_d3d:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d3e=this.getProperty("minheight");
if(_d3e!=null){
this.minheight=_d3e;
}
}
if(this.controls==null){
var _d3f=this.getProperty("controls");
this.controls=_d3f?_d3f:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d40=this.getProperty("resizable");
this.isResizable=_d40?_d40:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d41){
if(_d41!=this.isAutoHeightLayoutMode){
if(_d41){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d41;
}
};
DialogPageBinding.prototype.handleAction=function(_d42){
DialogPageBinding.superclass.handleAction.call(this,_d42);
var _d43=_d42.target;
switch(_d42.type){
case PageBinding.ACTION_ATTACHED:
if(_d43!=this&&_d43.isFitAsDialogSubPage){
_d43.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d42.consume();
if(_d43.response!=null){
this.response=_d43.response;
switch(_d43.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d44){
var _d45=this.bindingWindow.bindingMap.buttonAccept;
if(_d45!=null){
_d45.setDisabled(_d44);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d46){
var _d47=CSSComputer.getPadding(this.bindingElement);
var _d48=CSSComputer.getBorder(this.bindingElement);
_d46+=_d47.top+_d47.bottom;
_d46+=_d48.top+_d48.bottom;
if(_d46>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d46+"px";
}
};
EditorPageBinding.prototype=new PageBinding;
EditorPageBinding.prototype.constructor=EditorPageBinding;
EditorPageBinding.superclass=PageBinding.prototype;
EditorPageBinding.ACTION_ATTACHED="editorpage attached";
EditorPageBinding.ACTION_DIRTY="editorpage dirty";
EditorPageBinding.ACTION_CLEAN="editorpage clean";
EditorPageBinding.ACTION_SAVE="editorpage save";
EditorPageBinding.ID_SAVEASBUTTON="saveasbutton";
EditorPageBinding.ID_PREVIEWTAB="previewtab";
EditorPageBinding.ID_MAINTABBOX="maintabbox";
EditorPageBinding.ID_PREVIEWWINDOW="previewwindow";
EditorPageBinding.MESSAGE_SAVE="save";
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
EditorPageBinding.prototype.handleAction=function(_d50){
EditorPageBinding.superclass.handleAction.call(this,_d50);
var _d51=_d50.target;
switch(_d50.type){
case EditorPageBinding.ACTION_SAVE:
this.postMessage(EditorPageBinding.MESSAGE_SAVE);
break;
case ResponseBinding.ACTION_OOOOKAY:
if(Application.isDeveloperMode){
}
break;
case ResponseBinding.ACTION_SUCCESS:
if(Application.isDeveloperMode){
}
if(this._messengers.hasEntries()){
var _d52=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d51.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d52==-1){
_d52=0;
}
}else{
_d52++;
}
return res;
});
if(_d52>-1){
this._messengers.del(_d52);
}
if(!this._messengers.hasEntries()){
switch(this._message){
case EditorPageBinding.MESSAGE_SAVE:
this._saveEditorPage();
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
_d50.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d51.key,_d51);
if(_d51 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d51.key);
if(_d51 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d51==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d51.getSelectedTabBinding();
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
_d50.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d51==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d50.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d51==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d50.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d51==this._windowBinding){
if(_d51.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d57=WindowBinding.getMarkup(this._windowBinding);
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d57);
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
var _d58=this.bindingWindow.bindingMap.savebutton;
if(_d58!=null&&!_d58.isDisabled){
_d58.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d59=this.bindingWindow.bindingMap.__REQUEST;
if(_d59!=null){
_d59.postback(EditorPageBinding.MESSAGE_SAVE);
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
EditorPageBinding.prototype.postMessage=function(_d5a){
this._message=null;
switch(_d5a){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d5a,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d5a;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d5a;
EditorPageBinding.superclass.postMessage.call(this,_d5a,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d5a,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d5b,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d5b,arg);
switch(_d5b){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d5d=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d5d);
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
var _d5e=new List();
this._invalidBindings.each(function(key,_d60){
var list=_d60.getInvalidLabels();
if(list){
list.each(function(_d62){
_d5e.add(_d62);
});
}
});
if(_d5e.hasEntries()){
var _d63="";
while(_d5e.hasNext()){
_d63+=_d5e.getNext().toLowerCase();
if(_d5e.hasNext()){
_d63+=", ";
}else{
_d63+=".";
}
}
var _d64=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d64+" "+_d63);
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
EditorPageBinding.prototype.enableSave=function(_d65){
var _d66=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d66){
var _d67=UserInterface.getBinding(_d66);
if(_d65){
_d67.enable();
}else{
_d67.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d68=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d68!=null){
UserInterface.getBinding(_d68).enable();
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
var _d69=this._windowBinding.getContentDocument().title;
if(_d69==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d6a=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d6c){
if(_d6c.name=="__EVENTTARGET"&&_d6a){
_d6c.value=_d6a;
}
list.add({name:_d6c.name,value:_d6c.value});
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
WizardPageBinding.prototype.handleAction=function(_d6e){
WizardPageBinding.superclass.handleAction.call(this,_d6e);
var _d6f=_d6e.target;
switch(_d6e.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d6f);
}else{
_d6e.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d6f);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d6e.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d6e.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d70){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d72=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d70);
}
if(_d72){
_d72.setDisabled(!_d70);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d73,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d73,arg);
var self=this;
switch(_d73){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d77){
};
MarkupAwarePageBinding.prototype._activate=function(_d78){
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
var _d79=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d79.boxObject.getDimension().w;
_d79.hide();
var _d7a=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d7a+"px";
var self=this;
var _d7c=this.bindingWindow.bindingMap.moreactionsbutton;
_d7c.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d7d){
self._showMoreActions();
_d7d.consume();
}});
var _d7e=this.bindingWindow.bindingMap.moreactionspopup;
_d7e.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d7f){
var item=_d7f.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d81,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d81,arg);
switch(_d81){
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
var _d85=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_d85!=null){
_d85.hide();
}
},0);
}
}
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _d86=this.bindingWindow.WindowManager;
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
var _d87=new String("");
this._actionProfile.each(function(_d88,list){
list.each(function(_d8a){
_d87+=_d8a.getHandle()+";"+_d8a.getKey()+";";
if(_d8a.isDisabled()){
_d87+="isDisabled='true';";
}
});
});
return _d87;
};
SystemToolBarBinding.prototype.handleAction=function(_d8b){
SystemToolBarBinding.superclass.handleAction.call(this,_d8b);
switch(_d8b.type){
case ButtonBinding.ACTION_COMMAND:
var _d8c=_d8b.target;
this._handleSystemAction(_d8c.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_d8d){
if(_d8d!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d8f=list.getFirst();
var _d90=_d8f.node;
}
SystemAction.invoke(_d8d,_d90);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_d93,list){
var _d95=new List();
list.reset();
while(list.hasNext()){
var _d96=list.getNext();
var _d97=null;
if(_d96.isInToolBar()){
if(_d96.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_d97=self.getToolBarButtonBinding(_d96);
}
}
if(_d97!=null){
_d95.add(_d97);
}
}
if(_d95.hasEntries()){
var _d98=ToolBarGroupBinding.newInstance(doc);
_d95.each(function(_d99){
_d98.add(_d99);
});
self.addLeft(_d98);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d9a=this.bindingWindow.bindingMap.toolsbutton;
var _d9b=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d9c=_d9a.bindingElement.offsetLeft-this._moreActionsWidth;
var _d9d=0;
var _d9e=new List();
var _d9f,_da0=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d9f=_da0.getNext())!=null){
if(!_d9f.isVisible){
_d9f.show();
}
_d9d+=_d9f.boxObject.getDimension().w;
if(_d9d>=_d9c){
_d9e.add(_d9f);
_d9f.hide();
}
}
if(_d9e.hasEntries()){
var _da1=_d9e.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_da1).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d9f=_d9e.getNext())!=null){
this._moreActions.add(_d9f.associatedSystemAction);
}
_d9b.show();
}else{
this._moreActions=null;
_d9b.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _da2=this.bindingWindow.bindingMap.moreactionspopup;
_da2.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_da2.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_da2.add(item);
}
_da2.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_da4){
var _da5=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _da6=_da4.getLabel();
var _da7=_da4.getToolTip();
var _da8=_da4.getImage();
var _da9=_da4.isDisabled();
if(_da8&&_da8.indexOf("size=")==-1){
_da8=_da8+"&size="+this.getImageSize();
_da5.imageProfile=new ImageProfile({image:_da8});
}
if(_da6){
_da5.setLabel(_da6);
}
if(_da7){
_da5.setToolTip(_da7);
}
if(_da4.isDisabled()){
_da5.disable();
}
_da5.associatedSystemAction=_da4;
return _da5;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _daa=this.getDescendantBindingByLocalName("toolbarbutton");
if(_daa!=null){
_daa.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_dab){
var _dac=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_dab);
return UserInterface.registerBinding(_dac,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_dad){
var _dae=SystemTreeBinding.superclass.add.call(this,_dad);
if(!this._defaultTreeNode){
if(_dad instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_dad;
}
}
return _dae;
};
SystemTreeBinding.prototype.handleAction=function(_daf){
SystemTreeBinding.superclass.handleAction.call(this,_daf);
var _db0=_daf.target;
switch(_daf.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_db0.key);
this._updateFocusedNode();
_daf.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:self._activePosition});
}
},0);
if(_daf.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_db0.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_daf.consume();
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
var _db2=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_db2);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_db3){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_db3);
var reg=this._entityTokenRegistry;
var _db5=_db3.node.getEntityToken();
if(reg.has(_db5)){
reg.get(_db5).add(_db3);
}else{
reg.set(_db5,new List([_db3]));
}
var _db6=null;
if(this.isLockedToEditor){
if(_db5==StageBinding.entityToken){
if(_db3.node.isTreeLockEnabled()){
_db6=_db3;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_db3.node.getHandle()){
_db6=_db3;
}
}
}
if(_db6!=null){
this.focusSingleTreeNodeBinding(_db6);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_db7){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_db7);
var reg=this._entityTokenRegistry;
var _db9=_db7.node.getEntityToken();
if(reg.has(_db9)){
var list=reg.get(_db9);
list.del(_db7);
if(!list.hasEntries()){
reg.del(_db9);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_db7.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_db7.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _dbd=this._refreshingTreeNodes;
if(_dbd.hasEntries()&&_dbd.has(key)){
_dbd.del(key);
if(!_dbd.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._updateFocusedNode=function(){
if(!this._focusedTreeNodeBindings.hasEntries()){
var _dbe=StageBinding.entityToken;
if(_dbe!=null){
this._focusTreeNodeByEntityToken(_dbe);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _dbf=false;
var _dc0=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_dbf=false;
}else{
if(_dc0.hasEntries()){
_dbf=true;
while(_dbf&&_dc0.hasNext()){
var _dc1=_dc0.getNext();
if(!_dc1.isDraggable){
_dbf=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_dbf;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_dc2,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_dc2,arg);
switch(_dc2){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_dc2,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_dc2);
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
var self=this,_dc6=arg;
setTimeout(function(){
if(_dc6!=null){
self._focusTreeNodeByEntityToken(_dc6);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _dc8=tab.perspectiveNode==null;
if(!_dc8){
_dc8=tab.perspectiveNode==this.perspectiveNode;
}
if(_dc8){
var self=this,_dca=tab.getEntityToken();
setTimeout(function(){
if(_dca==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_dca);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_dcb,_dcc){
this.isLockFeatureFocus=true;
var _dcd=null;
if(this._entityTokenRegistry.has(_dcb)){
var list=this._entityTokenRegistry.get(_dcb);
list.each(function(tn){
var _dd0=true;
if(tn.node.isTreeLockEnabled()){
_dcd=tn;
_dd0=false;
}
return _dd0;
});
if(_dcd!=null){
if(!_dcd.isFocused){
this.focusSingleTreeNodeBinding(_dcd,true);
}else{
_dcd.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_dcd==null&&_dcc!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_dcb);
self._focusTreeNodeByEntityToken(_dcb,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_dd2){
var _dd3=StageBinding.perspectiveNode.getEntityToken();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _dd3=this.getRootTreeNodeBindings().getFirst().node.getEntityToken();
}
var _dd4=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_dd3,_dd2,_dd4);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _dd7=this._treeNodeBindings;
var _dd8=new Map();
function fix(_dd9,list){
if(!_dd9.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_dd7.has(node.getHandle())){
var _ddc=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_dd8.set(node.getHandle(),_ddc);
_dd9.add(_ddc);
}
});
_dd9.attachRecursive();
}
}
_dd9.open(true);
}
map.each(function(_ddd,list){
if(_dd7.has(_ddd)){
var _ddf=_dd7.get(_ddd);
fix(_ddf,list);
}else{
if(_dd8.has(_ddd)){
var _de0=_dd8.get(_ddd);
fix(_de0,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_de1,arg){
switch(_de1){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _de3=arg;
if(_de3!=null){
this._invokeServerRefresh(_de3);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _de4=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_de4;
_de4.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _de4=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_de4;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_de5){
if(_de5!=null&&_de5=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_de5)){
var list=this._entityTokenRegistry.get(_de5).reset();
this._refreshToken=_de5;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _de7=list.getNext();
this._refreshingTreeNodes.set(_de7.key,true);
setTimeout(function(){
_de7.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _de8=this.getFocusedTreeNodeBindings().getFirst();
if(_de8){
var _de9=_de8.getLabel();
var _dea=_de8.getAncestorBindingByLocalName("treenode");
if(_dea){
_de8=_dea;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_de8.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _deb=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_deb,[_de9]);
}
_de8.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _dec=SystemTreeBinding.clipboard;
if(_dec){
var type=_dec.dragType;
var _dee=this.getFocusedTreeNodeBindings().getFirst();
if(_dee.dragAccept){
if(_dee.acceptor.isAccepting(type)){
this._performPaste(_dee);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_def){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_def.node.hasDetailedDropSupport()){
if(_def.node.hasChildren()){
var _df1=_def.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_df2,_df3){
if(_df2==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _df4=_df3.get("switch");
var _df5=_df3.get("sibling");
if(_df4=="after"){
_df5++;
}
var _df6=_def.accept(SystemTreeBinding.clipboard,_df5);
if(_df6){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_df1);
}else{
Application.lock(self);
var _df7=_def.accept(SystemTreeBinding.clipboard,0);
if(_df7){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _df7=_def.accept(SystemTreeBinding.clipboard,0);
if(_df7){
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
SystemTreeBinding.prototype.collapse=function(_df8){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,{position:this._activePosition});
if(_df8){
this.blurSelectedTreeNodes();
var _df9=this.getRootTreeNodeBindings();
_df9.each(function(_dfa){
if(_dfa.isContainer&&_dfa.isOpen){
_dfa.close();
_dfa.hasBeenOpened=false;
_dfa.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_dfb){
if(_dfb!=this.isLockedToEditor){
this.isLockedToEditor=_dfb;
if(_dfb){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _dfd=this.getRootTreeNodeBindings();
_dfd.each(function(_dfe){
var _dff=_dfe.getOpenSystemNodes();
if(_dff!=null&&_dff.hasEntries()){
list.merge(_dff);
}else{
if(_dfe.isOpen){
list.add(_dfe.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_e00){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_e00);
if(_e00!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _e02=new Map();
var _e03=this.getFocusedTreeNodeBindings();
var _e04=_e03.getFirst().node.getActionProfile();
var self=this;
_e04.each(function(_e06,list){
var _e08=new List();
list.each(function(_e09){
if(_e09.getActivePositions()&self._activePosition){
_e08.add(_e09);
}
});
if(_e08.hasEntries()){
_e02.set(_e06,_e08);
}
});
_e02.activePosition=this._activePosition;
return _e02;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_e0a,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_e0a,arg);
switch(_e0a){
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
var _e0f=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_e0f.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _e10=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_e10.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_e11){
SystemTreePopupBinding.superclass.handleAction.call(this,_e11);
switch(_e11.type){
case MenuItemBinding.ACTION_COMMAND:
var _e12=_e11.target;
var _e13=_e12.associatedSystemAction;
if(_e13){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _e15=list.getFirst();
var _e16=_e15.node;
}
SystemAction.invoke(_e13,_e16);
}else{
var cmd=_e12.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
this._currentProfileKey=null;
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _e19=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_e19=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_e19=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_e19=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_e19=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_e19){
setTimeout(function(){
EventBroadcaster.broadcast(_e19);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _e1a=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_e1a.hasNext()){
var _e1b=UserInterface.getBinding(_e1a.getNext());
if(!_e1b.getProperty("rel")){
_e1b.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _e1d=new List();
var self=this;
this._actionProfile.each(function(_e1f,list){
var _e21=MenuGroupBinding.newInstance(doc);
list.each(function(_e22){
var _e23=self.getMenuItemBinding(_e22);
_e21.add(_e23);
});
_e1d.add(_e21);
});
_e1d.reverse();
while(_e1d.hasNext()){
this._bodyBinding.addFirst(_e1d.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_e24){
var _e25=MenuItemBinding.newInstance(this.bindingDocument);
var _e26=_e24.getLabel();
var _e27=_e24.getToolTip();
var _e28=_e24.getImage();
var _e29=_e24.getDisabledImage();
var _e2a=_e24.isCheckBox();
if(_e26){
_e25.setLabel(_e26);
}
if(_e27){
_e25.setToolTip(_e27);
}
if(_e28){
_e25.imageProfile=new ImageProfile({image:_e28,imageDisabled:_e29});
}
if(_e2a){
_e25.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_e24.isChecked()){
_e25.check(true);
}
}
if(_e24.isDisabled()){
_e25.disable();
}
_e25.associatedSystemAction=_e24;
return _e25;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e2e=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e2e=UserInterface.getBinding(node);
if(_e2e.isDisabled){
_e2e=null;
}
}
break;
}
if(_e2e!=null&&_e2e.node!=null&&_e2e.node.getActionProfile()!=null){
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
var _e2f=this.node.getLabel();
if(_e2f){
this.setLabel(_e2f);
}
var _e30=this.node.getToolTip();
if(_e30){
this.setToolTip(_e30);
}
var _e31=this.node.getHandle();
if(_e31){
this.setHandle(_e31);
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
var _e34="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e34+=list.getNext();
if(list.hasNext()){
_e34+=" ";
}
}
this.setProperty("dragaccept",_e34);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e36){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e36);
switch(_e36.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e36.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e36.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e37,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e37,arg);
switch(_e37){
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
var _e3a=null;
var _e3b=this.node.getImageProfile();
if(_e3b){
if(this.isOpen){
_e3a=_e3b.getActiveImage();
}else{
_e3a=_e3b.getDefaultImage();
}
}
if(!_e3a){
_e3a=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e3a;
};
SystemTreeNodeBinding.prototype.open=function(_e3c){
var _e3d=this.isContainer&&!this.isOpen;
var _e3e=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e3d&&(_e3e||SystemTreeBinding.HAS_NO_MEMORY)&&_e3c!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e3f=null;
if(this.isContainer){
_e3f=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e3f);
Application.unlock(self);
}else{
Application.unlock(Application,true);
}
StatusBar.clear();
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e41){
if(_e41!=null){
this._refreshBranch(_e41);
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
var _e42=new List();
var _e43=this.node.getChildren();
this.empty();
if(_e43.hasEntries()){
this._insertTreeNodesRegulated(_e43);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e44){
var _e45=0;
var _e46=new List([]);
while(_e44.hasEntries()&&_e45<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e47=SystemTreeNodeBinding.newInstance(_e44.extractFirst(),this.bindingDocument);
_e47.autoExpand=this.autoExpand;
this.add(_e47);
_e47.attach();
_e45++;
if(this.autoExpand){
if(_e45==1&&!_e44.hasEntries()||LastOpenedSystemNodes.isOpen(_e47)){
_e46.add(_e47);
}
}
}
if(_e44.hasEntries()){
this._insertBufferTreeNode(_e44);
}
_e46.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e4a){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e4c=this.node.getDescendantBranch(list);
if(_e4c.hasEntries()){
this.XXX(_e4c);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e4d){
var self=this;
var map=new Map();
this.empty();
_e4d.each(function(key,_e51){
if(_e51.hasEntries()){
_e51.each(function(node){
var _e53=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e53);
if(map.has(key)){
var _e54=map.get(key);
_e54.add(_e53);
_e54.isOpen=true;
_e54.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e53);
}else{
}
}
});
}
});
this.attachRecursive();
_e4d.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e55=new TreeCrawler();
var _e56=new List();
_e55.mode=TreeCrawler.MODE_GETOPEN;
_e55.crawl(this.bindingElement,_e56);
if(_e56.hasEntries()){
_e56.extractFirst();
}
_e55.dispose();
return _e56;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e57=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e57=new List([this.node]);
list.each(function(_e59){
_e57.add(_e59.node);
});
}
return _e57;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e5a,_e5b){
var _e5c=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e5a instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e5a.node.getData(),this.node.getData(),_e5b?_e5b:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e5c);
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
SystemTreeNodeBinding.newInstance=function(node,_e60){
var _e61=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e60);
var _e62=UserInterface.registerBinding(_e61,SystemTreeNodeBinding);
_e62.node=node;
return _e62;
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
SystemPageBinding.prototype.setPageArgument=function(_e63){
this.node=_e63;
SystemPageBinding.superclass.setPageArgument.call(this,_e63);
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
var _e64=this.node.getChildren();
if(_e64.hasEntries()){
while(_e64.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e64.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e66=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e66.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e68=new TreeCrawler();
var _e69=new List();
_e68.mode=TreeCrawler.MODE_GETOPEN;
_e68.crawl(this.bindingElement,_e69);
_e68.dispose();
var list=new List([this.node]);
_e69.each(function(_e6b){
list.add(_e6b.node);
});
this._tree.empty();
var _e6c=this.node.getDescendantBranch(list);
if(_e6c.hasEntries()){
var self=this;
var map=new Map();
_e6c.each(function(key,_e70){
_e70.each(function(node){
var _e72=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e72);
if(map.has(key)){
var _e73=map.get(key);
_e73.add(_e72);
_e73.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e72);
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
SystemPageBinding.prototype.handleAction=function(_e74){
SystemPageBinding.superclass.handleAction.call(this,_e74);
switch(_e74.type){
case ButtonBinding.ACTION_COMMAND:
var _e75=_e74.target;
switch(_e75.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e75.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e76,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e76,arg);
switch(_e76){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e78=arg;
if(this.node&&this.node.getEntityToken()==_e78){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e78);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e78);
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
StageContainerBinding.prototype.handleBroadcast=function(_e7a,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e7a,arg);
var _e7c=this.bindingWindow.WindowManager;
switch(_e7a){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e7c.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e7c.WINDOW_RESIZED_BROADCAST:
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
var _e7e=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e7e.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_e7f){
if(StageBinding.isViewOpen(_e7f)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e7f);
}else{
var _e80=ViewDefinitions[_e7f];
StageBinding.presentViewDefinition(_e80);
}
};
StageBinding.isViewOpen=function(_e81){
return StageBinding.bindingInstance._activeViewDefinitions[_e81]!=null;
};
StageBinding.presentViewDefinition=function(_e82){
if(_e82.label!=null){
var _e83=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e83,[_e82.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e82);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_e85,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _e87=System.getPerspectiveNodes();
if(_e87.hasEntries()){
this._initializeSystemViewDefinitions(_e87);
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
var _e89=null;
if(LocalStore.isEnabled){
_e89=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_e89&&ViewDefinitions[_e89]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_e89));
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
var _e8b=root.getActionProfile();
if(_e8b&&_e8b.hasEntries()){
var _e8c=top.app.bindingMap.toolsmenugroup;
if(_e8c){
_e8b.each(function(_e8d,list){
list.each(function(_e8f){
var item=MenuItemBinding.newInstance(_e8c.bindingDocument);
item.setLabel(_e8f.getLabel());
item.setToolTip(_e8f.getToolTip());
item.setImage(_e8f.getImage());
item.setDisabled(_e8f.isDisabled());
item.associatedSystemAction=_e8f;
var _e91=_e8c;
var tag=_e8f.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_e91=top.app.bindingMap.translationsmenugroup;
break;
}
}
_e91.add(item);
});
});
_e8c.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_e93){
while(_e93.hasNext()){
var node=_e93.getNext();
var _e95=node.getHandle();
ViewDefinitions[_e95]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_e96){
StageBinding.superclass.handleAction.call(this,_e96);
var _e97=_e96.target;
switch(_e96.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_e97;
this._inflateBinding(_e97);
_e96.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_e97;
this._inflateBinding(_e97);
_e96.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_e97);
_e96.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e97 instanceof DockBinding){
switch(_e97.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_e97.reference,_e97);
break;
}
this.handleAttachedDock(_e97);
_e96.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_e97 instanceof DockBinding){
this.handleSelectedDockTab(_e97.getSelectedTabBinding());
_e96.consume();
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
_e96.consume();
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
_e96.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e96);
};
StageBinding.prototype.handleBroadcast=function(_e99,arg){
StageBinding.superclass.handleBroadcast.call(this,_e99,arg);
switch(_e99){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _e9b=arg;
this._dontView(_e9b);
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
StageBinding.prototype._showStart=function(_e9d){
if(_e9d!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _ea0=this.bindingWindow.bindingMap.maindecks;
if(_e9d){
_ea0.select("startdeck");
view.show();
}else{
view.hide();
_ea0.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_e9d;
}
};
StageBinding.prototype._inflateBinding=function(_ea1){
for(var _ea2 in ViewDefinitions){
var _ea3=ViewDefinitions[_ea2];
if(_ea3 instanceof SystemViewDefinition){
_ea1.mountDefinition(_ea3);
}
}
var _ea4=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_ea4){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ea7=new StageCrawler();
_ea7.mode=mode;
_ea7.crawl(this.bindingElement);
_ea7.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_ea8){
var _ea9=_ea8.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_ea9);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_ea9));
}
};
StageBinding.prototype.handleAttachedDock=function(_eaa){
var _eab=_eaa.getTabBindings();
if(_eab.hasEntries()){
while(_eab.hasNext()){
var _eac=_eab.getNext();
var _ead=_eac.getHandle();
if(_ead){
if(_ead=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _eae=ViewDefinitions[_ead];
if(_eae){
this._view(_eaa,_eac,_eae,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_ead+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_eaf){
var _eb0=null;
var _eb1=false;
switch(_eaf.position){
case Dialog.MODAL:
_eb0=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_eb0=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_eaf.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_eb0=this._dockBindings.get(_eaf.position);
break;
default:
var _eb2=this._decksBinding.getSelectedDeckBinding();
_eb0=_eb2.getDockBindingByReference(_eaf.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _eb3=this.bindingWindow.bindingMap.maindecks;
_eb3.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_eb1=true;
}
break;
}
if(!_eb1){
if(_eb0!=null){
this._view(_eb0,null,_eaf,true);
}else{
throw "StageBinding: Could not position view: "+_eaf.handle;
}
}
};
StageBinding.prototype._view=function(_eb4,_eb5,_eb6,_eb7){
var _eb8=_eb6.handle;
if(_eb6.isMutable){
_eb8+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_eb8]){
var _eb9=ViewBinding.getInstance(_eb8);
if(_eb9!=null){
_eb9.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_eb8);
}
}else{
this._activeViewDefinitions[_eb8]=_eb6;
Application.lock(this);
switch(_eb4.constructor){
case DockBinding:
if(_eb7){
_eb4.prepareNewView(_eb6);
}else{
_eb4.prepareOpenView(_eb6,_eb5);
}
break;
case StageDialogBinding:
if(_eb7){
_eb4.prepareNewView(_eb6);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_eba){
if(this._activeViewDefinitions[_eba]!=null){
delete this._activeViewDefinitions[_eba];
}else{
this.logger.debug("Could not unregister active view: "+_eba);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_ebb){
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
this.addFilter(function(_ebd){
var _ebe=UserInterface.getBinding(_ebd);
var _ebf=null;
if(_ebe){
switch(_ebe.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_ebe.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_ebe.handleUnMaximization();
break;
}
break;
case DockBinding:
_ebf=NodeCrawler.SKIP_NODE;
break;
}
}
return _ebf;
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
var _ec0=null;
this._dialogs.each(function(_ec1){
if(!_ec1.isVisible){
_ec0=_ec1;
}
return _ec0!=null;
});
if(!_ec0){
this._newInstance();
_ec0=this._dialogs.getLast();
}
_ec0.setModal(false);
return _ec0;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _ec2=this.getInstance();
_ec2.setModal(true);
return _ec2;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _ec3=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_ec3);
_ec3.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_ec4){
if(_ec4 instanceof DialogViewDefinition){
var _ec5=ViewBinding.newInstance(this.bindingDocument);
_ec5.setDefinition(_ec4);
_ec5.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_ec4.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_ec4.handler)){
this._dialogResponseHandler=_ec4.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_ec5;
this._body.add(_ec5);
_ec5.attach();
_ec5.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_ec6){
StageDialogBinding.superclass.handleAction.call(this,_ec6);
var _ec7=_ec6.target;
switch(_ec6.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ec7);
_ec6.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ec7.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_ec6.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ec7.response){
this._handleDialogPageResponse(_ec7);
}
_ec6.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_ec6.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_ec6.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ec7.dispose();
_ec6.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_ec6.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_ec6.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_ec6.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_ec6.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_ec6.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ec7==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ec8,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ec8,arg);
switch(_ec8){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_eca){
var _ecb=new FitnessCrawler();
var list=new List();
if(_eca){
_ecb.mode=FitnessCrawler.MODE_BRUTAL;
}
_ecb.crawl(this.bindingElement,list);
_ecb.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_ecd){
_ecd.fit(_eca);
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
var _ece=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_ece){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_ed0){
var cmd=_ed0.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_ed2){
if(_ed2.bindingDocument==this._viewBinding.getContentDocument()){
if(_ed2 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_ed2);
}
this._pageBinding=_ed2;
if(_ed2.height=="auto"){
_ed2.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_ed2);
_ed2.enableAutoHeightLayoutMode(false);
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
if(_ed2.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_ed2);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_ed3){
var _ed4=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_ed4){
var _ed5=UserInterface.getBinding(_ed4);
_ed5.setDisabled(_ed3);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_ed6){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_ed6.response,_ed6.result!=null?_ed6.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_ed7){
if(_ed7.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_ed7);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_ed9){
switch(_ed9.type){
case MenuItemBinding.ACTION_COMMAND:
if(_ed9.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_ed9.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_eda){
var _edb=_eda.label;
var _edc=_eda.image;
var _edd=_eda.width;
var _ede=_eda.height;
var _edf=_eda.controls;
var _ee0=_eda.isResizable;
if(_edb){
this.setLabel(_edb);
}
if(_edc){
this.setImage(_edc);
}
if(_edd||_ede){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_edd?_edd:old.w;
}else{
nev.w=old.w;
}
nev.h=(_ede!=null&&_ede!="auto")?_ede:old.h;
this.setDimension(nev);
}
if(_edf){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_ee4=new List(_edf.split(" "));
while((type=_ee4.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_ee0!=this._isResizable){
this.setResizable(_ee0);
}
if(_ede=="auto"){
this._fixAutoHeight(_eda);
}
if(_eda==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_ee5){
var dim=this.getDimension();
var _ee7=0;
var _ee8=0;
if(_ee5.isDialogSubPage){
_ee5=this._pageBinding;
}
if(this._isFirstPage){
_ee7=_ee5.width!=null?_ee5.width:dim.w;
}else{
_ee7=dim.w;
}
_ee8=_ee5.bindingElement.offsetHeight;
_ee8+=this._titlebar.bindingElement.offsetHeight;
_ee8+=4;
if(_ee8<dim.h){
_ee8=dim.h;
}
if(_ee5.minheight!=null){
if(_ee8<_ee5.minheight){
_ee8=_ee5.minheight;
}
}
this.setDimension(new Dimension(_ee7,_ee8));
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
StageDialogBinding.newInstance=function(_eeb){
var _eec=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_eeb);
var _eed=UserInterface.registerBinding(_eec,StageDialogBinding);
_eed.setProperty("controls","minimize maximize close");
return _eed;
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
this.addFilter(function(_eee,list){
var _ef0=null;
var _ef1=UserInterface.getBinding(_eee);
if(!_ef1.isVisible){
_ef0=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _ef0;
});
this.addFilter(function(_ef2,list){
var _ef4=null;
var _ef5=UserInterface.getBinding(_ef2);
if(_ef5.isAttached){
if(Interfaces.isImplemented(IFit,_ef5)){
if(!_ef5.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_ef5);
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
StageDecksBinding.prototype.mountDefinition=function(_ef6){
var _ef7=StageDeckBinding.newInstance(this.bindingDocument);
_ef7.handle=_ef6.handle;
_ef7.perspectiveNode=_ef6.node;
this._decks[_ef7.handle]=_ef7;
this.add(_ef7);
_ef7.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_ef8){
var _ef9=this._decks[_ef8];
StageBinding.perspectiveNode=_ef9.perspectiveNode;
this.select(_ef9);
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
StageDeckBinding.prototype.handleAction=function(_efa){
StageDeckBinding.superclass.handleAction.call(this,_efa);
var _efb=_efa.target;
switch(_efa.type){
case WindowBinding.ACTION_LOADED:
if(_efb==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_efa.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_efb instanceof DockBinding){
this._dockBindings.set(_efb.reference,_efb);
_efb.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_efa.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_efa.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_efa);
StageDeckBinding.superclass.handleAction.call(this,_efa);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _efd=new StageCrawler();
_efd.mode=mode;
_efd.crawl(this.windowBinding.getContentDocument().body);
_efd.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_efe){
return this._dockBindings.get(_efe);
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
StageDeckBinding.newInstance=function(_f00){
var _f01=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_f00);
var _f02=UserInterface.registerBinding(_f01,StageDeckBinding);
return _f02;
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
StageSplitBoxBinding.prototype.handleAction=function(_f03){
StageSplitBoxBinding.superclass.handleAction.call(this,_f03);
StageBoxAbstraction.handleAction.call(this,_f03);
var _f04=_f03.target;
var _f05=null;
var _f06=null;
switch(_f03.type){
case DockBinding.ACTION_EMPTIED:
_f06=this.getChildBindingByLocalName("splitter");
if(_f06.isVisible){
_f06.hide();
}
_f05=this.getDescendantBindingsByLocalName("dock");
if(_f05.getFirst().isEmpty&&_f05.getLast().isEmpty){
if(_f05.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_f03.consume();
break;
case DockBinding.ACTION_OPENED:
_f05=this.getDescendantBindingsByLocalName("dock");
if(!_f05.getFirst().isEmpty&&!_f05.getLast().isEmpty){
_f06=this.getChildBindingByLocalName("splitter");
if(!_f06.isVisible){
_f06.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_f03.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_f04!=this){
_f06=this.getChildBindingByLocalName("splitter");
if(_f06.isVisible){
_f06.hide();
}
this.invokeLayout();
_f03.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_f04!=this){
var _f07=this.getChildBindingsByLocalName("splitpanel");
if(_f07.getFirst().isVisible&&_f07.getLast().isVisible){
_f06=this.getChildBindingByLocalName("splitter");
if(!_f06.isVisible){
_f06.show();
}
}
this.invokeLayout();
_f03.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_f08){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_f08);
switch(_f08.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_f08.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _f09=this.getChildBindingsByLocalName("splitpanel");
return _f09.getFirst().isVisible&&_f09.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _f0a=this.getChildBindingsByLocalName("splitpanel");
return _f0a.getFirst().isFixed&&_f0a.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_f0b){
StageSplitPanelBinding.superclass.handleAction.call(this,_f0b);
StageBoxAbstraction.handleAction.call(this,_f0b);
switch(_f0b.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_f0b.type==StageSplitBoxBinding.ACTION_HIDE){
_f0b.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_f0b.type==DockBinding.ACTION_EMPTIED){
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
if(_f0b.type==StageSplitBoxBinding.ACTION_SHOW){
_f0b.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _f0e=_f0b.target;
if(_f0e!=this&&_f0e.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _f0f=_f0e._containingSplitBoxBinding;
if(_f0f.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _f10=_f0f.getChildBindingsByLocalName("splitpanel");
var _f11=_f10.getFirst();
var _f12=_f10.getLast();
if(this.isFixed==true){
if(!_f11.isFixed||!_f12.isFixed||(!_f0f.hasBothPanelsVisible()&&_f0e.isMinimizedForReal)){
this.setFix(false);
_f0b.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_f0f.hasBothPanelsFixed()||(!_f0f.hasBothPanelsVisible()&&_f0e.isMinimizedForReal)){
this.setFix(_f0e.getContainedDock().getHeight());
_f0b.consume();
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
var _f13=this.getContainedDock();
if(_f13){
if(this.isMaximizePrepared==true){
}else{
_f13.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _f14=this.getContainedDock();
if(_f14){
if(_f14.type==DockBinding.TYPE_EDITORS){
if(_f14.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_f14.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _f15=this.getContainedDock();
if(_f15){
_f15.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_f15);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _f16=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f17=this.getContainedDock();
if(_f17){
_f17.collapse(_f16);
if(!_f16){
this.setFix(_f17.getHeight());
}else{
this.setFix(_f17.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f17&&_f17.isActive){
_f17.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_f17);
}
};
StageSplitPanelBinding.prototype.normalize=function(_f18){
var _f19=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _f1a=this.getContainedDock();
if(_f1a){
if(this.isMinimized==true){
_f1a.unCollapse(_f19);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_f18){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_f1a){
_f1a.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_f1a);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_f1b){
var _f1c=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_f1c=false;
}
}
if(_f1c==true){
this._invisibilize(_f1b);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_f1e){
if(_f1e!=this._isInvisibilized){
if(_f1e){
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
StageSplitterBinding.prototype.onDragStart=function(_f1f){
var _f20=top.app.bindingMap.stagesplittercover;
var _f21=this._containingSplitBoxBinding.getOrient();
switch(_f21){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f20.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f20.bindingElement.style.cursor="n-resize";
break;
}
_f20.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_f21);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f27){
this._orient=_f27;
this.attachClassName(_f27);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f29=true;
var _f2a=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f2a=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f29=false;
break;
}
if(_f29){
this.bindingElement.style.left=pos.x+"px";
}
if(_f2a){
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
StageBoxAbstraction.handleAction=function(_f2c){
switch(_f2c.type){
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
if(_f2c.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f2c.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f2d=this.bindingElement.style;
_f2d.position="absolute";
_f2d.width="100%";
_f2d.height="100%";
_f2d.top="0";
_f2d.left="0";
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
var _f2e=this.bindingElement.style;
_f2e.position="relative";
_f2e.width="auto";
_f2e.height="auto";
_f2e.top="auto";
_f2e.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f2f,_f30){
var _f31=_f2f.bindingElement.style;
var _f32=_f2f.bindingElement.parentNode;
var box=_f2f._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f30){
_f2f._unmodifiedFlexMethod=_f2f.flex;
_f2f.flex=function(){
_f31.width=_f32.offsetWidth+"px";
_f31.height=_f32.offsetHeight+"px";
};
}else{
_f31.width="100%";
_f31.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f31.width="auto";
_f31.height="auto";
box.reflex(true);
},0);
}
_f2f.flex=_f2f._unmodifiedFlexMethod;
_f2f._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f34){
var _f35=_f34.target;
switch(_f34.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f35 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f34);
_f34.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f34.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f36){
var mode=null;
switch(_f36.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f38){
StageMenuBarBinding.superclass.handleAction.call(this,_f38);
switch(_f38.type){
case MenuItemBinding.ACTION_COMMAND:
var _f39=_f38.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f39){
SystemAction.invoke(_f39,this._rootNode);
}
}
_f38.consume();
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
var _f3a=this.getProperty("handle");
if(_f3a){
this._handle=_f3a;
if(StageBinding.isViewOpen(_f3a)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f3a);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f3c){
this.setProperty("handle",_f3c);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f3d,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f3d,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f3d){
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
StageViewMenuItemBinding.newInstance=function(_f3f){
var _f40=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f3f);
UserInterface.registerBinding(_f40,StageViewMenuItemBinding);
return UserInterface.getBinding(_f40);
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
StageStatusBarBinding.prototype.setLabel=function(_f41){
this._label.setLabel(_f41);
};
StageStatusBarBinding.prototype.setImage=function(_f42){
this._label.setImage(_f42);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f43){
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
var _f44=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f45=_f44.getAssociatedView();
var _f46=_f45.getContentWindow().bindingMap.tree;
var _f47=_f46.getFocusedTreeNodeBindings();
if(!_f47.hasEntries()&&StageBinding.treeSelector){
_f47=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f47;
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
ExplorerBinding.prototype.handleAction=function(_f48){
ExplorerBinding.superclass.handleAction.call(this,_f48);
var _f49=_f48.target;
switch(_f48.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f48.consume();
break;
case Binding.ACTION_DRAG:
if(_f49 instanceof ExplorerSplitterBinding){
_f49.dragger.registerHandler(this);
}
_f48.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f4b){
this._menuBinding.setSelectionByHandle(_f4b);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f4c){
if(_f4c instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f4c);
this._menuBinding.mountDefinition(_f4c);
}
};
ExplorerBinding.prototype.onDragStart=function(_f4d){
var _f4e=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f4e.hasEntries()){
var _f4f=_f4e.getFirst();
this._dragStart=_f4f.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f4f.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f53){
if(_f53 instanceof SystemViewDefinition){
var _f54=ViewBinding.newInstance(this.bindingDocument);
_f54.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f54.setDefinition(_f53);
var _f55=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f55.setAssociatedView(_f54);
this._decks[_f53.handle]=_f55;
_f55.add(_f54);
this.add(_f55);
function attach(){
_f55.attach();
_f54.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f56){
var _f57=this._decks[_f56];
this.select(_f57);
};
DecksBinding.prototype.expandBy=function(_f58){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f5a=this.bindingElement.offsetHeight+_f58;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f5a+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f5c){
var _f5d=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f5c);
return UserInterface.registerBinding(_f5d,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f5e){
this._viewBinding=_f5e;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f5f=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f60=this._viewBinding.getDefinition().label;
StatusBar.busy(_f5f,[_f60]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f61){
ExplorerDeckBinding.superclass.handleAction.call(this,_f61);
var _f62=_f61.target;
switch(_f61.type){
case PageBinding.ACTION_INITIALIZED:
if(_f62 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f62.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f63,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f63,arg);
switch(_f63){
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
var _f65=null;
if(this._isExplorerDeckBindingInitialized){
_f65=this._viewBinding.getDefinition().label;
}else{
_f65=DockTabBinding.LABEL_TABLOADING;
}
return _f65;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f66=null;
if(this._isExplorerDeckBindingInitialized){
_f66=this._viewBinding.getDefinition().image;
}else{
_f66=DockTabBinding.IMG_TABLOADING;
}
return _f66;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f67=null;
if(this._isExplorerDeckBindingInitialized){
_f67=this._viewBinding.getDefinition().toolTip;
}
return _f67;
};
ExplorerDeckBinding.newInstance=function(_f68){
var _f69=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f68);
return UserInterface.registerBinding(_f69,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f6a){
switch(_f6a.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f6a.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f6a.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f6a);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f6b){
this._maxButtons.set(_f6b.handle,this._mountMaxButton(_f6b));
this._minButtons.set(_f6b.handle,this._mountMinButton(_f6b));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f6c){
var _f6d=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f6d.setLabel(_f6c.label);
_f6d.setToolTip(_f6c.toolTip);
_f6d.handle=_f6c.handle;
_f6d.node=_f6c.node;
this._maxGroup.add(_f6d);
this._maxList.add(_f6d);
_f6d.attach();
return _f6d;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f6e){
var _f6f=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f6f.setLabel(_f6e.label);
_f6f.setToolTip(_f6e.label);
_f6f.handle=_f6e.handle;
_f6f.node=_f6e.node;
this._minGroup.addFirst(_f6f);
this._minList.add(_f6f);
_f6f.attach();
_f6f.hide();
return _f6f;
};
ExplorerMenuBinding.prototype.handleAction=function(_f70){
ExplorerMenuBinding.superclass.handleAction.call(this,_f70);
switch(_f70.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f71=_f70.target;
var _f72=_f71.getCheckedButtonBinding();
var _f73=_f72.handle;
switch(_f71){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f73),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f73),true);
break;
}
this._selectedHandle=_f73;
this._selectedTag=_f72.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f70.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f74){
var _f75=this._maxButtons.get(_f74);
if(_f75){
_f75.check();
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
var _f76=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f76=true;
}
return _f76;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f78=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f78=true;
}
return _f78;
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
ExplorerToolBarBinding.newInstance=function(_f79){
var _f7a=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f79);
return UserInterface.registerBinding(_f7a,ExplorerToolBarBinding);
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
var _f7b=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f7c=_f7b?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f7c);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f7d,_f7e){
var _f7f=(_f7e==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f80=DOMUtil.createElementNS(Constants.NS_UI,_f7f,_f7d);
var _f81=UserInterface.registerBinding(_f80,ExplorerToolBarButtonBinding);
_f81.explorerToolBarButtonType=_f7e;
return _f81;
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
EditorBinding.registerComponent=function(_f82,_f83){
var _f84=EditorBinding._components;
var _f85=EditorBinding._editors;
var key=_f83.key;
var _f87=Interfaces.isImplemented(IWysiwygEditorComponent,_f82);
if(!_f87){
_f87=Interfaces.isImplemented(ISourceEditorComponent,_f82);
}
if(_f87){
if(_f85.has(key)){
_f85.get(key).initializeEditorComponent(_f82);
}else{
if(!_f84.has(key)){
_f84.set(key,new List());
}
_f84.get(key).add(_f82);
}
}else{
throw "Editor component interface not implemented: "+_f82;
}
};
EditorBinding.claimComponents=function(_f88,_f89){
var _f8a=EditorBinding._components;
var _f8b=EditorBinding._editors;
var key=_f89.key;
_f8b.set(key,_f88);
var list=null;
if(_f8a.has(key)){
list=_f8a.get(key).copy();
_f8a.del(key);
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
var _f8f=this.getProperty("value");
if(_f8f!=null){
_f8f=decodeURIComponent(_f8f);
this._startContent=_f8f;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _f91=this.bindingWindow.DataManager;
_f91.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_f93){
var _f94=EditorBinding.claimComponents(this,_f93);
if(_f94!=null){
while(_f94.hasNext()){
this.initializeEditorComponent(_f94.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _f96=this.bindingWindow.DataManager;
if(_f96.getDataBinding(name)){
_f96.unRegisterDataBinding(name);
}
_f96.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _f97=this.getEditorDocument();
if(_f97!=null){
Application.framework(_f97);
DOMEvents.addEventListener(_f97,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_f97,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_f97,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_f97,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_f99){
if(!this.isDirty||!this.bindingWindow.DataManager.isDirty){
if(_f99==true){
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
var _f9b=this.getCheckSum();
if(_f9b!=this._checksum){
this.bindingWindow.DataManager.dirty(this);
this._checksum=_f9b;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _f9c=null;
if(Binding.exists(this._pageBinding)){
_f9c=this._pageBinding.getCheckSum(this._checksum);
}
return _f9c;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _f9e=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.CONTEXTMENU:
DOMEvents.preventDefault(e);
this._popupBinding.editorBinding=this;
this.handleContextMenu(e);
break;
case DOMEvents.KEYPRESS:
this.checkForDirty();
if(!this._isActivated||this.isFocusable&&!this.isFocused){
this._activateEditor(true);
}
break;
case DOMEvents.MOUSEDOWN:
if(_f9e.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_fa0,arg){
EditorBinding.superclass.handleBroadcast.call(this,_fa0,arg);
var _fa2=null;
switch(_fa0){
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
var _fa3=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_fa3=false;
}
}
}else{
_fa2=DOMEvents.getTarget(arg);
if(_fa2&&_fa2.ownerDocument==this.getEditorDocument()){
_fa3=false;
}
}
if(_fa3){
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
EditorBinding.prototype._activateEditor=function(_fa4){
if(_fa4!=this._isActivated){
this._isActivated=_fa4;
EditorBinding.isActive=_fa4;
var _fa5=this.getEditorWindow().standardEventHandler;
var _fa6=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_fa6!=null){
if(_fa4){
if(this.hasBookmark()){
this.deleteBookmark();
}
_fa6.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_fa5.enableNativeKeys(true);
}else{
_fa6.disable();
_fa5.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _fa7=this.getEditorDocument().selection.createRange();
_fa7.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _fa8=false;
try{
if(!Client.isExplorer){
var _fa9=this.getEditorWindow().getSelection();
if(_fa9!=null){
_fa8=_fa9.toString().length>0;
if(!_fa8){
var _faa=_fa9.getRangeAt(0);
var frag=_faa.cloneContents();
var _fac=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_fac.appendChild(frag.firstChild);
}
var img=_fac.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_fa8=true;
}
}
}
}
}else{
var _faa=this.getEditorDocument().selection.createRange();
_fa8=(_faa&&_faa.text)&&_faa.text.length>0;
if(_faa.commonParentElement&&VisualEditorBinding.isImageElement(_faa.commonParentElement())){
_fa8=true;
}
}
}
catch(exception){
}
return _fa8;
};
EditorBinding.prototype.isCommandEnabled=function(_fae){
var _faf=true;
switch(_fae){
case "Cut":
case "Copy":
case "Paste":
_faf=this.getEditorDocument().queryCommandEnabled(_fae);
break;
}
return _faf;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fb3=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _fb4=null;
if(cmd=="Paste"){
_fb4=null;
}else{
_fb4=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_fb4);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_fb3=true;
}
break;
}
return _fb3;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _fb6=this.getContentWindow().bindingMap.toolbar;
var _fb7=_fb6.getButtonForCommand(cmd);
if(!_fb7){
throw "No button for command "+cmd;
}
return _fb7;
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
var _fba=this.getContentDocument().getElementById("focusableinput");
if(_fba!=null){
_fba.style.display="block";
FocusBinding.focusElement(_fba);
_fba.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_fbb){
EditorBinding.superclass.handleAction.call(this,_fbb);
var _fbc=_fbb.target;
var self=this;
var _fbe=this.shadowTree.iframe;
switch(_fbb.type){
case Binding.ACTION_DIRTY:
if(_fbb.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_fbf){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_fbf);
};
EditorBinding.prototype.handleElement=function(_fc0){
return true;
};
EditorBinding.prototype.updateElement=function(_fc1){
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
this._menuGroups[rel].each(function(_fc4){
_fc4.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_fc6){
_fc6.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_fc7){
EditorPopupBinding.superclass.handleAction.call(this,_fc7);
var _fc8=_fc7.target;
if(_fc7.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_fc8.getProperty("cmd");
var gui=_fc8.getProperty("gui");
var val=_fc8.getProperty("val");
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
var _fcc=this.bindingWindow.bindingMap.tinywindow;
var _fcd=this.bindingWindow.bindingMap.codepresswindow;
if(_fcc){
EditorBinding.registerComponent(this,_fcc);
}else{
if(_fcd){
EditorBinding.registerComponent(this,_fcd);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_fce,_fcf,_fd0,_fd1){
this._editorBinding=_fce;
this._tinyEngine=_fcf;
this._tinyInstance=_fd0;
this._tinyTheme=_fd1;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_fd2,_fd3,_fd4){
this._editorBinding=_fd2;
this._codePressFrame=_fd3;
this._codePressEngine=_fd4;
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
var _fd6=this._editorBinding;
if(_fd6!=null){
var self=this;
var _fd8={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_fd6.hasBookmark()){
_fd6.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_fd6.hasBookmark()){
_fd6.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_fd8);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_fd8);
}
};
EditorClickButtonBinding.newInstance=function(_fda){
var _fdb=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_fda);
return UserInterface.registerBinding(_fdb,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_fdc){
var _fdd=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_fdc);
return UserInterface.registerBinding(_fdd,EditorToolBarButtonBinding);
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
var _fde=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_fde);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_fdf,_fe0,_fe1,_fe2){
this._editorBinding=_fdf;
this._tinyEngine=_fe0;
this._tinyInstance=_fe1;
this._tinyTheme=_fe2;
};
EditorSelectorBinding.prototype.handleAction=function(_fe3){
EditorSelectorBinding.superclass.handleAction.call(this,_fe3);
switch(_fe3.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_fe3);
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
EditorMenuItemBinding.newInstance=function(_fe6){
var _fe7=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_fe6);
return UserInterface.registerBinding(_fe7,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_fe8){
var i=0,_fea,_feb="",_fec=_fe8.split(" ");
while((_fea=_fec[i])!=null){
if(_fea.length>=3&&_fea.substring(0,3)=="mce"){
_fea="";
}else{
if(_fea.length>=14&&_fea.substring(0,14)=="compositemedia"){
_fea="";
}
}
_feb+=_fea;
if(_fec[i+1]){
_feb+=" ";
}
i++;
}
return _feb;
};
VisualEditorBinding.getStructuredContent=function(_fed){
var _fee=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_fed);
if(soap instanceof SOAPFault){
}else{
_fee=soap.XhtmlFragment;
if(!_fee){
_fee="";
}
}
WebServiceProxy.isFaultHandler=true;
return _fee;
};
VisualEditorBinding.getTinyContent=function(_ff0,_ff1){
var _ff2=null;
if(_ff0==null||_ff0==""){
_ff0=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_ff0);
if(soap instanceof SOAPFault){
var _ff4=soap;
var _ff5={handleDialogResponse:function(){
_ff1.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_ff5,_ff4);
}else{
_ff2=soap.XhtmlFragment;
if(_ff2==null){
_ff2=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _ff2;
};
VisualEditorBinding.extractByIndex=function(html,_ff7){
var _ff8=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _ffa=new List(doc.documentElement.childNodes);
var _ffb=new List();
_ffa.each(function(_ffc){
if(_ffc.nodeType==Node.ELEMENT_NODE){
_ffb.add(_ffc);
}
});
var _ffd=_ffb.get(_ff7);
if(_ffd==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_ffd.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_ffd.hasChildNodes()){
frag.appendChild(_ffd.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_ff8=DOMSerializer.serialize(doc.documentElement);
_ff8=_ff8.substring(_ff8.indexOf(">")+1,_ff8.length);
_ff8=_ff8.substring(0,_ff8.lastIndexOf("<"));
}
}
}
if(_ff8==null){
_ff8=new String("");
}
return _ff8;
};
VisualEditorBinding.isImage=function(_fff){
result=_fff&&_fff.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_1000){
return VisualEditorBinding.isImage(_1000)&&!VisualEditorBinding.isReservedElement(_1000);
};
VisualEditorBinding.isReservedElement=function(_1001){
if(VisualEditorBinding.isFunctionElement(_1001)){
return true;
}
if(VisualEditorBinding.isFieldElement(_1001)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_1001)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_1002){
return VisualEditorBinding.isImage(_1002)&&CSSUtil.hasClassName(_1002,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_1003){
return VisualEditorBinding.isImage(_1003)&&CSSUtil.hasClassName(_1003,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_1004){
return VisualEditorBinding.isImage(_1004)&&CSSUtil.hasClassName(_1004,VisualEditorBinding.HTML_CLASSNAME);
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
var _1005=this.getProperty("embedablefieldstypenames");
if(_1005!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_1005);
}
var _1006=this.getProperty("formattingconfiguration");
if(_1006!=null){
this._url+="?config="+_1006;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
this.subscribe(BroadcastMessages.VISUALEDITOR_HACKED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_1007,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_1007,arg);
var _1009=this.getContentWindow().bindingMap.tinywindow;
var _100a=_1009.getContentWindow();
switch(_1007){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_100a){
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
if(arg.broadcastWindow==_100a){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_1009);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_100b){
_100b.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_100c){
VisualEditorBinding.superclass._onPageInitialize.call(this,_100c);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_100f){
var _1010=_100f;
if(!this._isNormalizedDocument(_100f)){
_1010=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_100f);
}
return _1010;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_1011){
var _1012=false;
var doc=XMLParser.parse(_1011,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_1012=true;
}
}
if(Client.isWebKit){
if(_1011.indexOf("<html")!==0){
_1012=false;
}
}
return _1012;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1017=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_1017){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_1017=true;
}
return _1017;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _1019=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_1019);
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
VisualEditorBinding.prototype.setResult=function(_101b){
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
VisualEditorPopupBinding.prototype.configure=function(_101c,_101d,_101e){
var _101f=this.editorBinding.hasSelection();
this.tinyInstance=_101c;
this.tinyEngine=_101d;
this.tinyElement=_101e;
this.hasSelection=_101f;
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
var _1023=false;
if(this.hasSelection){
_1023=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_1023=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_1023=true;
}
}
}
}
if(_1023){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _1024=this.getMenuItemForCommand("compositeInsertLink");
var _1025=this.getMenuItemForCommand("unlink");
var _1026=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1027=this.editorBinding.getButtonForCommand("unlink");
_1025.setDisabled(_1027.isDisabled);
if(_1025.isDisabled){
_1024.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_1024.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1028=this.editorBinding.embedableFieldConfiguration;
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
if(_1028){
var _102b=_1028.getGroupNames();
if(_102b.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_102b.each(function(_102f){
var _1030=_1028.getFieldNames(_102f);
_1030.each(function(_1031){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1031);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_102f+":"+_1031);
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
var _1033=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _1034=null;
var _1035=null;
if(_1033){
if(_1033.nodeName=="TD"){
_1034=_1033.getAttribute("colspan");
_1035=_1033.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_1034=="1"&&_1035=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1033){
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
VisualEditorFormattingConfiguration.getConfiguration=function(_1036){
var _1037=VisualEditorFormattingConfiguration._configurations;
if(!_1037.has(_1036)){
_1037.set(_1036,new VisualEditorFormattingConfiguration());
}
return _1037.get(_1036);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1039){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_103a){
var _103b=null;
var _103c=VisualEditorFieldGroupConfiguration._configurations;
if(!_103c.has(_103a)){
_103c.set(_103a,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_103a)));
}
return _103c.get(_103a);
};
function VisualEditorFieldGroupConfiguration(_103d){
var _103e=new Map();
new List(_103d).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_103e.set(group.GroupName,map);
});
this._groups=_103e;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1042){
return this._groups.get(_1042).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1043,_1044){
return this._groups.get(_1043).get(_1044).xhtml;
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
var _1046=this.getDescendantElementsByLocalName("textarea");
while(_1046.hasNext()){
var _1047=_1046.getNext();
if(_1047.getAttribute("selected")=="true"){
this._startContent=_1047.value;
this._textareaname=_1047.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1049=this.getContentWindow().bindingMap.templatetree;
_1049.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_104a){
var _104b=_1049.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_104b.textareaname);
_104a.consume();
}});
_1049.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_104c){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _104d=this.getContentWindow().bindingMap.toolsplitter;
_104d.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _104e=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_104e.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_104e);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_104f){
this._textareas=new Map();
while(_104f.hasNext()){
var _1050=_104f.getNext();
var _1051=_1050.getAttribute("placeholderid");
this._textareas.set(_1051,{placeholderid:_1051,placeholdername:_1050.getAttribute("placeholdername"),placeholdermarkup:_1050.value,textareaelement:_1050,isSelected:_1050.getAttribute("selected")=="true"});
}
var _1052=new Map();
this._textareas.each(function(name,_1054){
var _1055=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1055.setLabel(_1054.placeholdername);
_1055.setImage("${icon:placeholder}");
_1055.setProperty("placeholder",true);
_1055.textareaname=name;
_1052.set(_1054.placeholdername,_1055);
if(_1054.isSelected){
selected=_1055;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1056=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1056.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1057=this.getContentWindow().bindingMap.templatetree;
var _1058=_1057.add(TreeNodeBinding.newInstance(_1057.bindingDocument));
_1058.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1058.setImage("${icon:warning}");
_1058.attach();
var _1059=this.getContentWindow().bindingMap.statusbar;
_1059.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _105b=this._textareas.get(name);
var _105c=_105b.placeholdermarkup;
this.setValue(this.normalizeToDocument(_105c));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_105d){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_105d;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _105e=this.getContentWindow().bindingMap.statusbar;
_105e.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_105d);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1061="";
if(this._heads.has(this._textareaname)){
_1061=this._heads.get(this._textareaname);
if(_1061==null){
_1061=new String("");
}
}
return _1061;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1063){
_1063.textareaelement.value=_1063.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1064,_1065){
var _1066=_1064.getElementsByTagName("div").item(0);
var _1067=_1065.getElementsByTagName("div").item(0);
var _1068=new List(_1066.getElementsByTagName("textarea"));
var _1069=new List(_1067.getElementsByTagName("textarea"));
var _106a=false;
if(_1068.getLength()!=_1069.getLength()){
_106a=true;
}else{
var index=0;
_1068.each(function(_106c,index){
var _106e=_1069.get(index);
var newid=_106c.getAttribute("placeholderid");
var oldid=_106e.getAttribute("placeholderid");
var _1071=_106c.getAttribute("placeholdername");
var _1072=_106e.getAttribute("placeholdername");
if(newid!=oldid||_1071!=_1072){
_106a=true;
}
return !_106a;
});
}
if(_106a){
var html=null;
if(_1066.innerHTML!=null){
html=_1066.innerHTML;
}else{
html=DOMSerializer.serialize(_1066);
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
var _1076=this.getDescendantBindingByLocalName("selector");
_1076.attach();
this._populateTemplateSelector();
var _1077=this.getContentWindow().bindingMap.templateselector;
_1077.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _1078=this.getDescendantBindingByLocalName("selector");
var _1079=this.getContentWindow().bindingMap.templateselector;
_1078.selections.each(function(_107a){
_107a.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_1079.populateFromList(_1078.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _107b=this.getDescendantBindingByLocalName("selector");
var _107c=this.getContentWindow().bindingMap.templateselector;
_107b.selectByValue(_107c.getValue());
_107b.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_107d){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_1082,_1083){
var _1084=_1083;
if(old.has(_1082)){
_1084=old.get(_1082).placeholdermarkup;
}
return _1084;
}
while(_107d.hasNext()){
var _1085=_107d.getNext();
var _1086=_1085.getAttribute("placeholderid");
this._textareas.set(_1086,{placeholderid:_1086,placeholdername:_1085.getAttribute("placeholdername"),placeholdermarkup:compute(_1086,_1085.value),textareaelement:_1085,isSelected:_1085.getAttribute("selected")=="true"});
}
var _1087=null;
var _1088=this.getContentWindow().bindingMap.templatetree;
var _1089=new Map();
this._textareas.each(function(name,_108b){
var _108c=_1088.add(TreeNodeBinding.newInstance(_1088.bindingDocument));
_108c.setLabel(_108b.placeholdername);
_108c.setImage("${icon:placeholder}");
_108c.setProperty("placeholder",true);
_108c.textareaname=name;
_1089.set(_108b.placeholdername,_108c);
if(_108b.isSelected){
_1087=_108c;
}
});
_1088.attachRecursive();
if(_1087!=null){
var _108d=true;
if(this._oldtextareas.hasEntries()){
_108d=false;
var map=new Map();
this._textareas.each(function(id,_1090){
map.set(_1090.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_108d=true;
}
}
if(_108d){
var _1091=this._textareas.get(_1087.textareaname);
this._textareaname=_1087.textareaname;
this._placeholdername=_1091.placeholdername;
this._setContentFromPlaceHolder(_1087.textareaname);
_1087.focus();
}else{
var _1092=_1089.get(this._placeholdername);
this._textareaname=_1092.textareaname;
_1092.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_1093,_1094){
var _1095=_1093.getElementsByTagName("ui:selector").item(0);
var _1096=_1094.getElementsByTagName("ui:selector").item(0);
var _1097=false;
if(_1095!=null&&_1096!=null){
var _1098=new List(_1095.getElementsByTagName("ui:selection"));
var _1099=new List(_1096.getElementsByTagName("ui:selection"));
if(_1098.getLength()!=_1099.getLength()){
_1097=true;
}else{
_1098.each(function(_109a,index){
var _109c=_109a.getAttribute("value");
var _109d=_1099.get(index).getAttribute("value");
if(_109c!=_109d){
_1097=true;
}
return !_1097;
});
}
}
if(_1097){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_1095);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_1093,_1094);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_109f,frame,_10a1){
this._editorBinding=_109f;
this._codePressFrame=frame;
this._codePressEngine=_10a1;
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
var _10a7=this.getProperty("validate");
if(_10a7==true){
this._hasStrictValidation=true;
}
var _10a8=this.getProperty("validator");
if(_10a8!=null){
this._validator=_10a8;
}
this.syntax=this.getProperty("syntax");
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
this.syntax=CodeMirrorEditorBinding.syntax.HTML;
break;
}
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
CodeMirrorEditorBinding.superclass.onBindingAttach.call(this);
};
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_10a9,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_10a9,arg);
switch(_10a9){
case BroadcastMessages.CODEMIRROR_LOADED:
var _10ab=this.getContentWindow().bindingMap.codemirrorwindow;
if(_10ab!=null){
var _10ac=_10ab.getContentWindow();
if(arg.broadcastWindow==_10ac){
this._codemirrorWindow=_10ac;
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
this.initializeEditorComponents(_10ab);
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
this.unsubscribe(_10a9);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_10b0){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_10b0);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_10b1){
if(_10b1!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_10b1;
EditorBinding.isActive=_10b1;
var _10b2=this.getContentWindow().standardEventHandler;
if(_10b1){
_10b2.enableNativeKeys(true);
}else{
_10b2.disableNativeKeys();
}
var _10b3=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_10b3!=null){
if(_10b1){
_10b3.enable();
}else{
_10b3.disable();
}
}
if(_10b1){
this.focus();
var _10b4=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _10b8=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _10b8;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_10b9){
_10b9.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_10bb){
if(!this._isFinalized){
if(_10bb!=this._startContent){
this._startContent=_10bb;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_10bb);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10bc=this.getContentWindow().bindingMap.editorpage.getContent();
return _10bc?_10bc:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10bd){
if(this._pageBinding!=null){
this._pageBinding.cover(_10bd);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10be){
if(_10be!=null&&this.shadowTree.dotnetinput!=null){
var value=_10be.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10c0=true;
var _10c1=this.getContent();
if(this._validator!=null){
_10c0=Validator.validateInformed(_10c1,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10c0=XMLParser.isWellFormedDocument(_10c1,true);
if(_10c0==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10c0=this._isValidHTML(_10c1);
break;
}
}
break;
}
}
return _10c0;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10c3=true;
var doc=XMLParser.parse(xml);
var _10c5=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10c5.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10c5.add("NamespaceURI");
}
var head=null,body=null;
var _10c9=new List(root.childNodes);
while(_10c9.hasNext()){
var child=_10c9.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10c5.add("MultipleHead");
}
if(body!=null){
_10c5.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10c5.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10c5.add("MissingHead");
}
if(body==null){
_10c5.add("MissingBody");
}
}
if(_10c5.hasEntries()){
_10c3=false;
if(Client.isWebKit){
alert(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10c5.getFirst()));
}else{
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10c5.getFirst()));
}
}
return _10c3;
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
var _10cb=null;
var page=this._pageBinding;
if(page!=null){
_10cb=page.getCheckSum();
}
return _10cb;
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
ThrobberBinding.prototype.handleBroadcast=function(_10cd,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10cd,arg);
switch(_10cd){
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
ProgressBarBinding.notch=function(_10d0){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10d0);
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
ProgressBarBinding.prototype.notch=function(_10d2){
_10d2=_10d2?_10d2:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_10d2);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_10d4,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_10d4,arg);
switch(_10d4){
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
StartMenuItemBinding.prototype.setChecked=function(_10d6,_10d7){
StartMenuItemBinding.superclass.setChecked.call(this,_10d6,_10d7);
if(!_10d7){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
StartMenuItemBinding.newInstance=function(_10d8){
var _10d9=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_10d8);
UserInterface.registerBinding(_10d9,StartMenuItemBinding);
return UserInterface.getBinding(_10d9);
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_10dc,_10dd){
var _10de=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_10dd,true)==true){
if(_10dc!="*"){
_10dc=KeySetBinding._sanitizeKeyModifiers(_10dc);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_10de[doc]){
_10de[doc]={};
}
if(!_10de[doc][code]){
_10de[doc][code]={};
}
_10de[doc][code][_10dc]=_10dd;
}
};
KeySetBinding.handleKey=function(doc,e){
var _10e2=false;
var code=e.keyCode;
var _10e4=KeySetBinding.keyEventHandlers;
if(_10e4[doc]&&_10e4[doc][code]){
var _10e5="[default]";
_10e5+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_10e5+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _10e6=_10e4[doc][code][_10e5];
if(_10e6==null){
_10e6=_10e4[doc][code]["*"];
}
if(_10e6!=null){
_10e6.handleKeyEvent(e);
_10e2=true;
}
}
return _10e2;
};
KeySetBinding._sanitizeKeyModifiers=function(_10e7){
var _10e8="[default]";
var mods={};
if(_10e7){
new List(_10e7.split(" ")).each(function(_10ea){
mods[_10ea]=true;
});
function check(_10eb){
if(mods[_10eb]){
_10e8+=" "+_10eb;
}
}
check("shift");
check("control");
}
return _10e8;
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
var _10ef=key.getAttribute("oncommand");
var _10f0=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_10f0){
DOMEvents.preventDefault(e);
}
var _10f2=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_10ef,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_10f3){
if(_10f3 instanceof CursorBinding){
_10f3.setOpacity(0);
_10f3.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10f4){
_10f3.setOpacity(Math.sin(_10f4*Math.PI/180));
},onstop:function(){
_10f3.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_10f5){
if(_10f5 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10f6){
_10f5.setOpacity(Math.cos(_10f6*Math.PI/180));
},onstop:function(){
_10f5.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_10f7,_10f8,_10f9){
if(_10f7 instanceof CursorBinding){
_10f9.x-=16;
_10f9.y-=16;
new Animation({modifier:3,onstep:function(_10fa){
var tal=Math.sin(_10fa*Math.PI/180);
_10f7.setPosition(new Point(((1-tal)*_10f8.x)+((0+tal)*_10f9.x),((1-tal)*_10f8.y)+((0+tal)*_10f9.y)));
},onstop:function(){
CursorBinding.fadeOut(_10f7);
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
CursorBinding.prototype.setOpacity=function(_1100){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_1100);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1100*100)+")";
}
this._opacity=_1100;
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
function setOpacity(_1103){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_1103);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1103*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_1104){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1104*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_1106){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_1106);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1106*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_1107){
if(Binding.exists(cover)){
setOpacity(Math.sin(_1107*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_1109){
if(_1109!=this._isBusy){
if(_1109){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1109;
}
};
CoverBinding.prototype.setTransparent=function(_110a){
if(_110a!=this._isTransparent){
if(_110a){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_110a;
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
CoverBinding.prototype.setHeight=function(_110c){
if(_110c>=0){
this.bindingElement.style.height=new String(_110c+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_110d){
var _110e=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_110d);
return UserInterface.registerBinding(_110e,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _1110=UncoverBinding._bindingInstance;
if(Binding.exists(_1110)){
_1110.setPosition(pos);
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
TheatreBinding.prototype.play=function(_1114){
this._isFading=_1114==true;
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
var _1115=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_1115.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_1115.clearRect(0,0,300,150);
_1115.fillRect(0,0,300,150);
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
var _1117=this._canvas.getContext("2d");
_1117.clearRect(0,0,300,150);
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
var _1118=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1118);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1119=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1119){
this._startcontent=_1119.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_111a){
SourceCodeViewerBinding.superclass.handleAction.call(this,_111a);
switch(_111a.type){
case WindowBinding.ACTION_ONLOAD:
if(_111a.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_111a.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_111a);
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
var _111e=this._transformer.transformToString(doc);
this._inject(_111e);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1121){
this.getContentDocument().body.innerHTML=_1121;
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
var _1129=list.getNext();
var id=_1129.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1129);
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
var _1133=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1133.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1133.appendChild(att);
}
elm.appendChild(_1133);
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
var _113d=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_113d){
doc=XMLParser.parse(_113d);
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
var _1141=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1141;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1142,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1142,arg);
switch(_1142){
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
var _1145=new List();
list.each(function(lang){
_1145.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1145);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1149){
switch(_1149){
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
var _114c=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_114c,root);
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
var _114d=this.getProperty("status");
if(_114d!=null){
switch(_114d){
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
UserInterfaceMapping.prototype.merge=function(_1150){
for(var _1151 in _1150.map){
this.map[_1151]=_1150.getBindingImplementation(_1151);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1152){
var _1153=null;
var name=_1152.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_1153=this.map[name];
}
return _1153;
};
var UserInterface=new function(){
var _1156=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1157=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:imageinputdialog":ImageInputDialogBinding,"ui:datainputbutton":DataInputButtonBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1156,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1158=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_115a,impl){
var _115c=null;
if(!this.hasBinding(_115a)){
var _115d=DOMUtil.getParentWindow(_115a);
if(DOMUtil.getLocalName(_115a)!="bindingmapping"){
if(!impl&&_115a.getAttribute("binding")!=null){
var _115e=_115a.getAttribute("binding");
impl=_115d[_115e];
if(impl==null){
throw "No such binding in scope: "+_115e;
}
}
if(!impl){
var _115f=_115d.DocumentManager;
if(_115f){
var _1160=_115f.customUserInterfaceMapping;
if(_1160){
impl=_1160.getBindingImplementation(_115a);
}
}
}
if(!impl){
impl=_1157.getBindingImplementation(_115a);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_115c=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_115c){
var key=KeyMaster.getUniqueKey();
_115a.setAttribute("key",key);
_115c.key=key;
if(!_115a.id){
_115a.id=key;
}
keys[key]={element:_115a,binding:_115c};
_115c.onBindingRegister();
}
}
}
return _115c;
};
this.unRegisterBinding=function(_1162){
terminate(_1162);
};
function terminate(_1163){
if(Binding.exists(_1163)==true){
var key=_1163.key;
Binding.destroy(_1163);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1163=null;
}else{
_1158.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1165){
var _1166=null;
if(keys[_1165.key]){
_1166=keys[_1165.key].element;
}
return _1166;
};
this.getBinding=function(_1167){
var _1168=null;
if(_1167&&_1167.nodeType==Node.ELEMENT_NODE){
try{
var key=_1167.getAttribute("key");
if(key&&keys[key]){
_1168=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1167);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1168;
};
this.getBindingByKey=function(key){
var _116b=null;
if(keys[key]){
_116b=keys[key].binding;
}
return _116b;
};
this.hasBinding=function(_116c){
return this.getBinding(_116c)!=null;
};
this.isBindingVisible=function(_116d){
var _116e=Application.isOperational;
if(_116e==true){
var _116f=new Crawler();
_116f.type=NodeCrawler.TYPE_ASCENDING;
_116f.id="visibilitycrawler";
_116f.addFilter(function(_1170){
var b=UserInterface.getBinding(_1170);
var res=0;
if(!b.isVisible){
_116e=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_116f.crawl(_116d.bindingElement);
_116f.dispose();
}
return _116e;
};
var _1173=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_1173={};
for(var key in keys){
_1173[key]=true;
}
};
this.getPoint=function(){
var _1177=null;
if(_1173){
_1177=new List();
for(var key in keys){
if(!_1173[key]){
_1177.add(key);
}
}
}
return _1177;
};
this.clearPoint=function(){
_1173=null;
};
this.trackUndisposedBindings=function(){
var _1179=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1179){
_1179="Bindings illdisposed: ";
}
_1179+=entry.binding+" ";
}
}
if(_1179!=null){
_1158.error(_1179);
}
};
this.autoTrackDisposedBindings=function(_117c){
if(_117c){
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
SOAPRequest.newInstance=function(_117d,_117e){
var _117f=_117d+"/"+_117e;
var _1180=new SOAPRequest(_117f);
var _1181=SOAPRequest.resolver;
_1180.document=Templates.getTemplateDocument("soapenvelope.xml");
_1180.envelope=_1181.resolve("soap:Envelope",_1180.document);
_1180.header=_1181.resolve("soap:Header",_1180.envelope);
_1180.body=_1181.resolve("soap:Body",_1180.envelope);
return _1180;
};
SOAPRequest._parseResponse=function(_1182){
var _1183=null;
var _1184=false;
var doc=_1182.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1183=SOAPRequestResponse.newInstance(_1182.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1182.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1184=true;
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
var text=_1182.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_1184=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1182.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1182.responseText);
}
}
}
}
if(_1184==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1183;
};
function SOAPRequest(_1189){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1189;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _118b=DOMUtil.getXMLHTTPRequest();
var _118c=null;
_118b.open("post",url,false);
_118b.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_118b.setRequestHeader("SOAPAction",this.action);
try{
_118b.send(this.document);
_118c=SOAPRequest._parseResponse(_118b);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_118b=null;
return _118c;
};
SOAPRequest.prototype.asyncInvoke=function(url,_118f){
var _1190=DOMUtil.getXMLHTTPRequest();
_1190.open("post",url,true);
_1190.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1190.setRequestHeader("SOAPAction",this.action);
_1190.onreadystatechange=function(){
if(_1190.readyState==4){
var _1191=SOAPRequest._parseResponse(_1190);
_118f(_1191);
_1190=null;
}
};
_1190.send(this.document);
};
SOAPRequest.prototype.dispose=function(){
for(var _1192 in this){
this[_1192]=null;
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
var _1194=null;
if(doc&&doc.documentElement){
_1194=new SOAPRequestResponse();
var _1195=SOAPRequestResponse.resolver;
_1194.document=doc;
_1194.envelope=_1195.resolve("soap:Envelope",_1194.document);
_1194.header=_1195.resolve("soap:Header",_1194.envelope);
_1194.body=_1195.resolve("soap:Body",_1194.envelope);
var fault=_1195.resolve("soap:Fault",_1194.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1194.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1195.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1195.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1194;
};
function SOAPFault(_1197,_1198,_1199){
this._operationName=_1197;
this._operationAddress=_1198;
this._faultString=_1199;
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
SOAPFault.newInstance=function(_119a,fault){
return new SOAPFault(_119a.name,_119a.address,fault.faultString);
};
function SOAPEncoder(wsdl,_119d){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_119d;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _119f=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_119f.body,this._operation);
var _11a1=this._wsdl.getSchema();
var _11a2=_11a1.lookup(this._operation);
var _11a3=_11a2.getListedDefinitions();
while(_11a3.hasNext()){
var def=_11a3.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _119f;
};
SOAPEncoder.prototype._resolve=function(_11a7,_11a8,value){
var _11aa=this._wsdl.getSchema();
if(_11a8.isSimpleValue){
this._appendText(_11a7,value,_11a8.type=="string");
}else{
var _11ab=_11aa.lookup(_11a8.type);
if(_11ab instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_11ab.getListedDefinitions();
if(_11ab.isArray){
var _11ad=new List(value);
var def=defs.getNext();
while(_11ad.hasNext()){
var elm=this._appendElement(_11a7,def.name);
var val=_11ad.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_11a7,def.name);
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
SOAPEncoder.prototype._appendText=function(_11b4,value,_11b6){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _11b9=false;
var i=0,c;
while(c=chars[i++]){
var _11bc=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_11bc=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_11bc=false;
}
break;
}
if(!_11bc){
safe+=c;
}else{
_11b9=true;
}
}
if(_11b9){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_11b4.appendChild(_11b4.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_11bf){
this._wsdl=wsdl;
this._operation=_11bf;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11c4){
var _11c5=null;
var _11c6=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11c8=this.resolve(id,_11c4.body);
var _11c9=_11c6.lookup(id);
var _11ca=_11c9.getListedDefinitions();
while(!_11c5&&_11ca.hasNext()){
var def=_11ca.getNext();
var elm=this.resolve(def.name,_11c8);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11c5=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11c5.importNode!=Types.UNDEFINED){
_11c5.appendChild(_11c5.importNode(e,true));
}else{
_11c5.loadXML(DOMSerializer.serialize(e));
}
}else{
_11c5=this._compute(elm,def);
}
}
return _11c5;
};
SOAPDecoder.prototype._compute=function(_11ce,_11cf){
var _11d0=null;
var _11d1=this._wsdl.getSchema();
if(_11cf.isSimpleValue){
_11d0=this._getSimpleValue(_11ce,_11cf.type);
}else{
var _11d2=_11d1.lookup(_11cf.type);
if(_11d2 instanceof SchemaSimpleType){
_11d0=this._getSimpleValue(_11ce,_11d2.restrictionType);
}else{
var defs=_11d2.getListedDefinitions();
if(_11d2.isArray){
_11d0=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11ce);
while(elms.hasNext()){
var elm=elms.getNext();
_11d0.push(this._compute(elm,def));
}
}else{
_11d0={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11ce);
if(elm){
_11d0[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11d0;
};
SOAPDecoder.prototype._getSimpleValue=function(_11d7,type){
var _11d9=null;
if(_11d7.firstChild&&_11d7.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_11d7.childNodes.length>1){
_11d7.normalize();
}
_11d9=_11d7.firstChild.data;
switch(type){
case Schema.types.STRING:
_11d9=_11d9;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_11d9=Number(_11d9);
break;
case Schema.types.BOOLEAN:
_11d9=_11d9=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _11d9;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_11da){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_11da);
}
Schema.prototype._parseSchema=function(_11db){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _11dc={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_11db);
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
_11dc[rule.getAttribute("name")]=entry;
}
return _11dc;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_11e1){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_11e1);
}
SchemaDefinition.prototype._parse=function(_11e2){
var min=_11e2.getAttribute("minOccurs");
var max=_11e2.getAttribute("maxOccurs");
var type=_11e2.getAttribute("type");
this.name=_11e2.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _11e8=split[1];
this.isSimpleValue=sort!="tns";
this.type=_11e8;
}else{
var elm=_11e2.getElementsByTagName("*").item(0);
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
function SchemaElementType(_11ea,_11eb){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_11ea,_11eb);
}
SchemaElementType.prototype._parseListedDefinitions=function(_11ec,_11ed){
var els=_11ec.resolveAll("s:complexType/s:sequence/s:element",_11ed);
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
function SchemaComplexType(_11ef,_11f0){
this._definitions=new List();
this._parseListedDefinitions(_11ef,_11f0);
this.isArray=_11f0.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_11f1,_11f2){
var els=_11f1.resolveAll("s:sequence/s:element",_11f2);
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
function SchemaSimpleType(_11f5,_11f6){
this.restrictionType=null;
this._parse(_11f5,_11f6);
}
SchemaSimpleType.prototype._parse=function(_11f7,_11f8){
var _11f9=_11f7.resolve("s:restriction",_11f8);
if(_11f9){
this.restrictionType=_11f9.getAttribute("base").split(":")[1];
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
var _11fc=null;
var _11fd=DOMUtil.getXMLHTTPRequest();
_11fd.open("get",url,false);
_11fd.send(null);
if(_11fd.responseXML){
_11fc=_11fd.responseXML.documentElement;
}else{
alert(_11fd.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _11fc;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _11fe=new List();
var _11ff=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_11ff.hasEntries()){
while(_11ff.hasNext()){
var _1200=_11ff.getNext();
var name=_1200.getAttribute("name");
_11fe.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _11fe;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_1203,_1204,_1205){
this.name=name;
this.address=_1203;
this.encoder=_1204;
this.decoder=_1205;
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
var _1209=wsdl.getOperations();
_1209.each(function(_120a){
proxy[_120a.name]=WebServiceProxy.createProxyOperation(_120a);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_120b,_120c){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_120c){
var log=_120c instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_120b.address+": "+_120b.name+"\n\n";
log+=DOMSerializer.serialize(_120c.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_120e){
return function(){
var _120f=new List(arguments);
var _1210=null;
if(typeof (_120f.getLast())=="function"){
var _1211=_120f.extractLast();
var _1212=_120e.encoder.encode(_120f);
this._log(_120e,_1212);
var self=this;
var _1214=_1212.asyncInvoke(_120e.address,function(_1215){
self._log(_120e,_1215);
if(_1215){
if(_1215.fault){
_1210=SOAPFault.newInstance(_120e,_1215.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1210,_1212,_1215);
}
}else{
if(WebServiceProxy.isDOMResult){
_1210=_1215.document;
}else{
_1210=_120e.decoder.decode(_1215);
}
}
}
_1212.dispose();
_1211(_1210);
});
}else{
var _1212=_120e.encoder.encode(new List(arguments));
this._log(_120e,_1212);
var _1214=_1212.invoke(_120e.address);
this._log(_120e,_1214);
if(_1214){
if(_1214.fault){
_1210=SOAPFault.newInstance(_120e,_1214.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1210,_1212,_1214);
}
}else{
if(WebServiceProxy.isDOMResult){
_1210=_1214.document;
}else{
_1210=_120e.decoder.decode(_1214);
}
}
}
_1212.dispose();
return _1210;
}
};
};
WebServiceProxy.handleFault=function(_1216,_1217,_1218){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_1216,soapRequest:_1217,soapResponse:_1218});
}
catch(exception){
alert(_1216.getFaultString());
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
var _1219=SystemLogger.getLogger("MessageQueue");
var _121a=null;
var _121b=0;
var _121c=null;
var _121d=new Map();
var _121e=new Map();
var _121f=false;
var _1220=false;
var _1221={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_121a=ConsoleMessageQueueService;
_121b=_121a.GetCurrentSequenceNumber("dummyparam!");
this.index=_121b;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_121f){
if(!MessageQueue._actions.hasEntries()){
var _1222=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1220=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1222;
_1220=false;
}
}
}
};
this._pokeserver=function(){
if(_121f==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1220);
var _1223=_121a.GetMessages(Application.CONSOLE_ID,this.index);
if(_1223!=null){
if(Types.isDefined(_1223.CurrentSequenceNumber)){
var _1224=_1223.CurrentSequenceNumber;
if(_1224<this.index){
_1219.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_1224);
}
this.index=_1224;
var _1225=new List(_1223.ConsoleActions);
if(_1225.hasEntries()){
this.evaluate(_1225);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_1219.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_1226){
var _1227=new List();
if(_1226.hasEntries()){
_1226.each(function(_1228){
if(this._index[_1228.Id]!=true){
_1227.add(_1228);
}
this._index[_1228.Id]=true;
},this);
if(_1227.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1227);
}else{
this._actions=_1227;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1229){
var _122a="(No reason)";
if(_1229!=null){
_122a=_1229.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_122a);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_122e){
if(_122e==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _122f=null;
if(this._actions.hasEntries()){
var _1230=this._actions.extractFirst();
_121b=_1230.SequenceNumber;
_1219.debug("MessageQueue action: "+_1230.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_121b+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1230.ActionType){
case "OpenView":
_122f=_1230.OpenViewParams;
if(_122f.ViewType=="ModalDialog"){
openDialogView(_122f);
}else{
_121c=_122f.ViewId;
openView(_122f);
}
break;
case "CloseView":
_122f=_1230.CloseViewParams;
_121c=_122f.ViewId;
closeView(_122f);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1230.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_121d.countEntries()+"\n";
_121d.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_1219.debug(debug);
if(!_121d.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1230.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1230.MessageBoxParams);
break;
case "OpenViewDefinition":
_122f=_1230.OpenViewDefinitionParams;
_121c=_122f.Handle;
openViewDefinition(_122f);
break;
case "LogEntry":
logEntry(_1230.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_122f=_1230.BroadcastMessageParams;
_1219.debug("Server says: EventBroadcaster.broadcast ( \""+_122f.Name+"\", "+_122f.Value+" )");
EventBroadcaster.broadcast(_122f.Name,_122f.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_121d.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1230.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1230.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1230.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_122f=_1230.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_122f.ViewId,entityToken:_122f.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_122f=_1230.OpenGenericViewParams;
openGenericView(_122f);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1230.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1220);
}
function logEntry(_1233){
var _1234=_1233.Level.toLowerCase();
SystemLogger.getLogger(_1233.SenderId)[_1234](_1233.Message);
}
function openView(_1235){
var list=paramsToList(_1235.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_1235.ViewId);
def.entityToken=_1235.EntityToken;
def.flowHandle=_1235.FlowHandle;
def.position=_1221[_1235.ViewType],def.label=_1235.Label;
def.image=_1235.Image;
def.toolTip=_1235.ToolTip;
def.argument={"url":_1235.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_1235.ViewId,entityToken:_1235.EntityToken,flowHandle:_1235.FlowHandle,position:_1221[_1235.ViewType],url:_1235.Url,label:_1235.Label,image:_1235.Image,toolTip:_1235.ToolTip}));
}
}
function openDialogView(_1238){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1238.ViewId,flowHandle:_1238.FlowHandle,position:Dialog.MODAL,url:_1238.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1239){
var _123a=_1239.DialogType.toLowerCase();
if(_123a=="question"){
throw "Not supported!";
}else{
Dialog[_123a](_1239.Title,_1239.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_123b){
var map={};
var _123d=false;
new List(_123b.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_123d=true;
});
var proto=ViewDefinitions[_123b.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_123b.ViewId;
}
def.argument=_123d?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1242){
var def=ViewBinding.clone("Composite.Management.GenericView",_1242.ViewId);
def.label=_1242.Label;
def.toolTip=_1242.ToolTip;
def.image=_1242.Image;
def.argument={"url":_1242.Url,"list":paramsToList(_1242.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_1244){
if(StageBinding.isViewOpen(_1244.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1244.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1245){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1245.ViewId,isSuccess:_1245.Succeeded});
}
this._lockSystem=function(_1246){
var _1247=top.bindingMap.offlinetheatre;
if(_1246){
_1247.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1247.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_121f=_1246;
};
this.handleBroadcast=function(_1249,arg){
switch(_1249){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_121c!=null&&arg==_121c){
_121c=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_121d.set(arg,true);
}else{
_1219.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_121d.hasEntries()){
_121d.del(arg);
_1219.debug("Refreshed tree: "+arg+"\n("+_121d.countEntries()+" trees left!)");
if(!_121d.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_121e.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_121e.hasEntries()==true){
_121e.del(arg);
if(!_121e.hasEntries()){
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
function paramsToList(_124b){
var list=new List();
new List(_124b).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREEACTIONSELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.VisualEditorFunctions"}]}})};
var KickStart=new function(){
var _124e=false;
var _124f=false;
var _1250=null;
var _1251=false;
var _1252=Client.qualifies();
var _1253="admin";
var _1254="123456";
this.fireOnLoad=function(){
if(_1252){
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
this.handleBroadcast=function(_1255){
switch(_1255){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1255);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1256=window.bindingMap.appwindow;
_1256.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1257){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1258){
if(_1257){
EventBroadcaster.subscribe(_1258,KickStart);
}else{
EventBroadcaster.unsubscribe(_1258,KickStart);
}
});
}
function kickStart(_1259){
switch(_1259){
case BroadcastMessages.AUDIO_INITIALIZED:
_124f=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_124e=true;
break;
}
if(_124e&&_124f){
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
DataManager.getDataBinding("username").setValue(_1253);
DataManager.getDataBinding("password").setValue(_1254);
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
this.doLogin=function(_125c,_125d){
var _125e=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _125f=false;
var _1260=LoginService.ValidateAndLogin(_125c,_125d);
if(_1260 instanceof SOAPFault){
alert(_1260.getFaultString());
}else{
_125f=_1260;
}
if(_125f){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_125e){
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
var _1261=DataManager.getDataBinding("username");
var _1262=DataManager.getDataBinding("password");
_1261.blur();
_1262.blur();
_1261.setValue("");
_1262.setValue("");
_1261.clean();
_1262.clean();
_1261.focus();
document.getElementById("loginerror").style.display="block";
var _1263={handleAction:function(_1264){
document.getElementById("loginerror").style.display="none";
_1264.target.removeActionListener(Binding.ACTION_DIRTY,_1263);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1263);
}
WindowManager.fireOnLoad(this);
if(!_1252){
UpdateManager.isEnabled=false;
}
};

