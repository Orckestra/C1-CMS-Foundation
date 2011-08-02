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
_85=String(_85);
SystemLogger.buffer.add({identifier:_83,level:_84,message:_85});
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
var _a4={"MediaFileElementProvider.WebImages":null,"MediaFileElementProvider.EmbeddableMedia":null,"AllFunctionsElementProvider.XhtmlDocument":null,"AllFunctionsElementProvider.XsltFunctionCall":null};
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
}
_Localization.prototype={languages:null,source:null,target:null,handleBroadcast:function(_106,arg){
switch(_106){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
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
}};
var Localization=new _Localization();
function _Validator(){
}
_Validator.prototype={validate:function(_10a,key,_10c){
var _10d=true;
var _10e=SourceValidationService.ValidateSource(_10a,key);
if(_10e!="True"){
if(_10c==true){
this._dialog(_10e);
}
_10d=false;
}
return _10d;
},validateInformed:function(_10f,key){
return this.validate(_10f,key,true);
},_dialog:function(_111){
setTimeout(function(){
Dialog.error("Source Invalid",_111);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_112,_113,_114,_115){
this._count++;
this._eventListener(true,_112,_113,_114,_115);
if(_112&&typeof _112.nodeType!=Types.UNDEFINED){
if(_112.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_112);
if(win){
var _117={handleEvent:function(){
DOMEvents.removeEventListener(_112,_113,_114,_115);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_117);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_117);
}
}
}
},removeEventListener:function(_118,_119,_11a,_11b){
this._count--;
this._eventListener(false,_118,_119,_11a,_11b);
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
},cleanupEventListeners:function(_120){
this._deleteWrappedHandler(_120);
},isCurrentTarget:function(e){
var _122=false;
if(Client.isMozilla==true){
_122=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_123,_124){
var _125=true;
if(_123==_124){
_125=false;
}
if(_125==true){
while(_124!=null&&_124.nodeType!=Node.DOCUMENT_NODE&&_124!=_123){
_124=_124.parentNode;
}
_125=(_124==_123);
}
return _125;
},_eventListener:function(_126,_127,_128,_129,_12a,_12b){
if(Interfaces.isImplemented(IEventListener,_129,true)){
if(typeof _128!=Types.UNDEFINED){
if(Client.isExplorer==true){
_129=this._getWrappedHandler(_127,_128,_129,_12b);
_127[this._getAction(_126)]("on"+_128,_129);
}else{
switch(_128){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_128=_128==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_127[this._getAction(_126)](_128,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_129.handleEvent(e);
}
}},_12a?true:false);
break;
default:
_127[this._getAction(_126)](_128,_129,_12a?true:false);
break;
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_12e){
var _12f=null;
switch(_12e){
case true:
_12f=Client.isMozilla==true?"addEventListener":"attachEvent";
break;
case false:
_12f=Client.isMozilla==true?"removeEventListener":"detachEvent";
break;
}
return _12f;
},_getWrappedHandler:function(_130,_131,_132,_133){
var _134=null;
try{
if(!_132._domEventHandlers){
_132._domEventHandlers={};
}
if(!_132._domEventHandlers[_130]){
_132._domEventHandlers[_130]={};
}
if(!_132._domEventHandlers[_130][_131]){
var win=_130.nodeType?DOMUtil.getParentWindow(_130):_130;
if(win){
_132._domEventHandlers[_130][_131]=function(){
if(win.event!=null&&_132!=null){
_132.handleEvent(win.event);
}
};
}
}
_134=_132._domEventHandlers[_130][_131];
}
catch(exception){
this._report(_130,_131,_132,_133);
}
return _134;
},_deleteWrappedHandler:function(_136){
for(var _137 in _136._domEventHandlers){
if(_137){
for(var _138 in _136._domEventHandlers[_137]){
if(_138){
delete _136._domEventHandlers[_137][_138];
}
}
}
delete _136._domEventHandlers[_137];
}
},_report:function(_139,_13a,_13b,_13c){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_139?_139.nodeName:_139)+"\n"+"\tevent: "+_13a+"\n"+"\thandler: "+_13b+"\n\n"+"Offending invoker: "+(_13c.callee?_13c.callee.toString():_13c.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(Client.isMozilla?new XMLSerializer():null),serialize:function(node,_13e){
var _13f=null;
var _140=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_140=node.documentElement;
}
if(Client.isMozilla==true){
if(_13e==true){
_140=_140.cloneNode(true);
_140=DOMFormatter.format(_140,DOMFormatter.INDENTED_TYPE_RESULT);
}
_13f=this._serializer.serializeToString(_140);
}else{
_13f=_140.xml;
}
return _13f;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _143=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_144){
var doc=_144.ownerDocument;
var _146=function(node,_148){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _149="",i=0;
while(i++<_148){
_149+=TAB;
}
var _14b=node.firstChild;
while(_14b){
switch(_14b.nodeType){
case Node.ELEMENT_NODE:
if(_14b==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_149));
}
node.insertBefore(doc.createTextNode(NEW+_149+TAB),_14b);
_146(_14b,_148+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_149+TAB),_14b);
break;
}
if(_14b.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_14b,_149+TAB);
}
}
_14b=_14b.nextSibling;
}
}
};
_146(_144,0);
}
function strip(_14c){
var _14d=[];
var _14e={acceptNode:function(_14f){
return (!_143.test(_14f.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _150=_14c.ownerDocument.createTreeWalker(_14c,NodeFilter.SHOW_TEXT,_14e,true);
while(_150.nextNode()){
_14d.push(_150.currentNode);
}
var i=0,_152;
while((_152=_14d[i++])!=null){
_152.parentNode.removeChild(_152);
}
}
function formatCDATASection(node,_154){
if(node.textContent.indexOf(NEW)>-1){
var _155=node.textContent.split(NEW);
var _156="",line,_158=0,_159=true;
while((line=_155.shift())!=null){
if(_158==0&&line.charAt(0)==TAB){
while(line.charAt(_158++)==TAB){
}
}
line=line.substring(_158,line.length);
if(_155.length>0){
_156+=_154+TAB+line;
_156+=_159?"":"\n";
}else{
_156+=_154+line;
_154=_154.slice(1,_154.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_154));
}
_159=false;
}
node.textContent=_156;
}
}
this.format=function(_15a,_15b){
var _15c=1;
if(document.createTreeWalker){
try{
strip(_15a);
if(_15b!=_15c){
indent(_15a);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_15a);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_15d){
var sig,_15f=null,_160=this.MSXML_MAXVERSION;
while(!_15f&&_160>=this.MSXML_MINVERSION){
try{
sig=_15d.replace("{$version}",_160);
_15f=new ActiveXObject(sig);
}
catch(exception){
}
_160--;
}
return _15f;
},getXMLHTTPRequest:function(){
var _161=null;
if(Client.isExplorer){
_161=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_161=new XMLHttpRequest();
}
return _161;
},getDOMDocument:function(_162){
var _163=null;
if(Client.isExplorer){
_163=this.getMSComponent(_162?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_163=doc;
}
return _163;
},getMSXMLXSLTemplate:function(){
var _165=null;
if(Client.isExplorer){
_165=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _165;
},getLocalName:function(_166){
var _167=null;
if(_166.localName){
_167=_166.localName;
}else{
if(_166.baseName){
_167=_166.baseName;
}else{
_167=_166.nodeName.toLowerCase();
}
}
return _167;
},getComputedStyle:function(_168,_169){
var _16a=null;
if(Client.isExplorer){
if(_168.currentStyle!=null){
_16a=_168.currentStyle[_169];
}else{
this._logger.error("Could not compute style for element "+_168.nodeName);
SystemDebug.stack(arguments);
}
}else{
var _16b=_168.ownerDocument.defaultView.getComputedStyle(_168,null);
if(_16b!=null){
_16a=_16b.getPropertyValue(_169);
}else{
this._logger.error("Could not compute style for element "+_168.nodeName);
SystemDebug.stack(arguments);
}
}
return _16a;
},getMaxIndex:function(doc){
var max=0,_16e=new List(doc.getElementsByTagName("*"));
_16e.each(function(_16f){
var _170=CSSComputer.getZIndex(_16f);
if(_170>max){
max=_170;
}
});
return max;
},getOrdinalPosition:function(_171,_172){
var _173=null;
var _174=-1;
var _175=this.getLocalName(_171);
var _176=new List(_171.parentNode.childNodes);
while(_176.hasNext()){
var _177=_176.getNext();
if(_177.nodeType==Node.ELEMENT_NODE){
if(!_172||this.getLocalName(_177)==_175){
_174++;
if(_177==_171||(_177.id!=""&&_177.id==_171.id)){
_173=_174;
break;
}
}
}
}
return _173;
},isFirstElement:function(_178,_179){
return (this.getOrdinalPosition(_178,_179)==0);
},isLastElement:function(_17a,_17b){
var _17c=_17a.parentNode.getElementsByTagName(_17b?this.getLocalName(_17a):"*");
return (this.getOrdinalPosition(_17a)==_17c.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _180=null;
if(node.textContent){
_180=node.textContent;
}else{
if(node.text){
_180=node.text;
}else{
_180=node.innerText;
}
}
return _180;
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
},getAncestorByLocalName:function(_183,node,_185){
var _186=null;
while(_186==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_185==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_183){
_186=node;
}
}
return _186;
},contains:function(_188,node){
return _188.contains?_188!=node&&_188.contains(node):!!(_188.compareDocumentPosition(node)&16);
},createElementNS:function(_18a,_18b,_18c){
var _18d=null;
if(_18c==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_18d=_18c.createElementNS(_18a,_18b);
}else{
if(_18c.xml!=null){
_18d=_18c.createNode(Node.ELEMENT_NODE,_18b,_18a);
}else{
_18d=_18c.createElement(_18b);
}
}
}
return _18d;
},getElementsByTagName:function(node,_18f){
var _190=null;
if(Client.isMozilla){
_190=node.getElementsByTagNameNS(Constants.NS_XHTML,_18f);
}else{
_190=node.getElementsByTagName(_18f);
}
return _190;
},getNextElementSibling:function(_191){
return Client.isExplorer?_191.nextSibling:_191.nextElementSibling;
},getPreviousElementSibling:function(_192){
return Client.isExplorer?_192.previousSibling:_192.previousElementSibling;
},cloneNode:function(node){
var _194=null;
if(Client.isMozilla==true){
_194=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_194=node.cloneNode(true);
}
return _194;
},getLocalPosition:function(_195){
var _196=new Point(_195.offsetLeft,_195.offsetTop);
if(Client.isExplorer&&_195.parentNode&&_195.parentNode.currentStyle){
if(_195.parentNode.currentStyle.position=="static"){
var _197=this.getLocalPosition(_195.parentNode);
_196.x+=_197.x;
_196.y+=_197.y;
}
}
return _196;
},getGlobalPosition:function(_198){
return this._getPosition(_198,false);
},getUniversalPosition:function(_199){
return this._getPosition(_199,true);
},_getPosition:function(_19a,_19b){
var _19c=null;
if(typeof _19a.getBoundingClientRect!=Types.UNDEFINED){
var rect=_19a.getBoundingClientRect();
_19c={x:rect.left,y:rect.top};
if(Client.isMozilla){
_19c.x-=_19a.scrollLeft;
_19c.y-=_19a.scrollTop;
}
}else{
_19c={x:_19a.offsetLeft-_19a.scrollLeft,y:_19a.offsetTop-_19a.scrollTop};
while(_19a.offsetParent){
_19a=_19a.offsetParent;
_19c.x+=(_19a.offsetLeft-_19a.scrollLeft);
_19c.y+=(_19a.offsetTop-_19a.scrollTop);
}
}
if(_19b){
var win=DOMUtil.getParentWindow(_19a);
if(win){
var _19f=win.frameElement;
if(_19f){
var add=DOMUtil.getUniversalPosition(_19f);
_19c.x+=add.x;
_19c.y+=add.y;
}
}
}
return new Point(_19c.x,_19c.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_1a4){
var _1a5=DOMEvents.getTarget(e);
var _1a6={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_1a5.ownerDocument;
var win=this.getParentWindow(doc);
_1a6.x-=win.pageXOffset;
_1a6.y-=win.pageYOffset;
}
if(_1a4){
var _1a9=this.getParentWindow(_1a5).frameElement;
if(_1a9){
var add=this.getUniversalPosition(_1a9);
_1a6.x+=add.x;
_1a6.y+=add.y;
}
}
return _1a6;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null?new DOMParser():null),parse:function(xml,_1ac){
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
if(!_1ac){
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
if(!_1ac){
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
},isWellFormedDocument:function(xml,_1af){
var _1b0=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1b2=SourceValidationService.IsWellFormedDocument(xml);
if(_1b2!="True"){
_1b0=false;
if(_1af==true){
this._illFormedDialog(_1b2);
}
}
return _1b0;
},isWellFormedFragment:function(xml,_1b4){
var _1b5=true;
var _1b6=SourceValidationService.IsWellFormedFragment(xml);
if(_1b6!="True"){
_1b5=false;
if(_1b4==true){
this._illFormedDialog(_1b6);
}
}
return _1b5;
},_illFormedDialog:function(_1b7){
setTimeout(function(){
Dialog.error("Not well-formed",_1b7);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1b8){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1b9){
return _1b8[_1b9];
}};
}else{
this._nsResolver=_1b8;
}
};
XPathResolver.prototype.resolve=function(_1ba,node,_1bc){
var _1bd=null;
try{
if(this._evaluator){
_1bd=this._evaluateDOMXpath(_1ba,node,_1bc?true:false);
}else{
_1bd=this._evaluateMSXpath(_1ba,node,_1bc?true:false);
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
return _1bd;
};
XPathResolver.prototype.resolveAll=function(_1be,node){
return this.resolve(_1be,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1c0,node,_1c2){
var _1c3=null;
if(node){
var _1c3=this._evaluator.evaluate(_1c0,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1c2){
var list=new List();
while((node=_1c3.iterateNext())!=null){
list.add(node);
}
_1c3=list;
}else{
_1c3=_1c3.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1c3;
};
XPathResolver.prototype._evaluateMSXpath=function(_1c6,node,_1c8){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1ca="";
for(var _1cb in this._nsResolver){
_1ca+="xmlns:"+_1cb+"=\""+this._nsResolver[_1cb]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1ca);
if(_1c8){
var list=new List();
var i=0,_1ce=node.selectNodes(_1c6);
while(i<_1ce.length){
list.add(_1ce.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1c6);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1d0=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1d0);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1d0;
}
};
XSLTransformer.prototype._import=function(url){
var _1d2=null;
if(Client.isMozilla){
var _1d3=DOMUtil.getXMLHTTPRequest();
_1d3.open("get",Resolver.resolve(url),false);
_1d3.send(null);
_1d2=_1d3.responseXML;
}else{
var _1d2=DOMUtil.getDOMDocument(true);
_1d2.async=false;
_1d2.load(url);
}
return _1d2;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1d5=null;
if(Client.isMozilla){
_1d5=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1d5;
};
XSLTransformer.prototype.transformToString=function(dom,_1d7){
var _1d8=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1d8=DOMSerializer.serialize(doc,_1d7);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1d8=proc.output;
}
return _1d8;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1db){
var _1dc=_1db.style?_1db.className:_1db.getAttribute("class");
_1dc=_1dc?_1dc:"";
return _1dc;
},_contains:function(_1dd,sub){
return _1dd.indexOf(sub)>-1;
},_attach:function(_1df,sub){
return _1df+(_1df==""?"":" ")+sub;
},_detach:function(_1e1,sub){
if(this._contains(_1e1," "+sub)){
sub=" "+sub;
}
return _1e1.replace(sub,"");
},attachClassName:function(_1e3,_1e4){
if(_1e3.classList!=null){
if(!_1e3.classList.contains(_1e4)){
_1e3.classList.add(_1e4);
}
}else{
var _1e5=this._getCurrent(_1e3);
if(!this._contains(_1e5,_1e4)){
_1e5=this._attach(_1e5,_1e4);
}
if(_1e3.style!=null){
_1e3.className=_1e5;
}else{
_1e3.setAttribute("class",_1e5);
}
}
},detachClassName:function(_1e6,_1e7){
if(_1e6.classList!=null){
if(_1e6.classList.contains(_1e7)){
_1e6.classList.remove(_1e7);
}
}else{
var _1e8=this._getCurrent(_1e6);
if(this._contains(_1e8,_1e7)){
_1e8=this._detach(_1e8,_1e7);
}
if(_1e6.style!=null){
_1e6.className=_1e8;
}else{
if(_1e8==""){
_1e6.removeAttribute("class");
}else{
_1e6.setAttribute("class",_1e8);
}
}
}
},hasClassName:function(_1e9,_1ea){
var _1eb=false;
if(_1e9.classList!=null){
_1eb=_1e9.classList.contains(_1ea);
}else{
_1eb=this._contains(this._getCurrent(_1e9),_1ea);
}
return _1eb;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1ec,_1ed){
var _1ee={};
for(var _1ef in _1ec){
var ent=parseInt(DOMUtil.getComputedStyle(_1ed,_1ec[_1ef]));
_1ee[_1ef]=isNaN(ent)?0:ent;
}
return _1ee;
},_getMargin:function(_1f1){
return this._getComplexResult(this._margins,_1f1);
},getPadding:function(_1f2){
return this._getComplexResult(this._paddings,_1f2);
},getBorder:function(_1f3){
return this._getComplexResult(this._borders,_1f3);
},getPosition:function(_1f4){
return DOMUtil.getComputedStyle(_1f4,"position");
},getFloat:function(_1f5){
return DOMUtil.getComputedStyle(_1f5,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1f6){
return parseInt(DOMUtil.getComputedStyle(_1f6,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1f7){
return DOMUtil.getComputedStyle(_1f7,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1f8=SystemLogger.getLogger("System");
var root=null;
this.hasActivePerspectives=false;
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1fa=new List();
var _1fb=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1fb);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1fd){
_1fa.add(new SystemNode(_1fd));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1fa;
};
this.getChildNodes=function(node,_1ff){
var _200=new List();
var _201=null;
if(_1ff){
if(SearchTokens.hasToken(_1ff)){
_1ff=SearchTokens.getToken(_1ff);
}
_201=TreeService.GetElementsBySearchToken(node.getData(),_1ff);
}else{
_201=TreeService.GetElements(node.getData());
}
new List(_201).each(function(_202){
var _203=new SystemNode(_202);
if(_1ff){
_203.searchToken=_1ff;
}
_200.add(_203);
});
return _200;
};
this.getDescendantBranch=function(_204){
var map=new Map();
var arg=[];
_204.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _208=TreeService.GetMultipleChildren(arg);
var _209=new List(_208);
while(_209.hasNext()){
this._listNodesInMap(_209.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_20a,_20b,_20c){
var map=new Map();
var arg=[];
_20c.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _210=TreeService.FindEntityToken(_20a,_20b,arg);
if(_210 instanceof SOAPFault){
_1f8.error(_210.getFaultString());
if(Application.isDeveloperMode){
alert(_210.getFaultString());
}
map=null;
}else{
var _211=new List(_210);
while(_211.hasNext()){
this._listNodesInMap(_211.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_212,map){
var list=new List();
var key=_212.ElementKey;
var _216=new List(_212.ClientElements);
map.set(key,list);
while(_216.hasNext()){
var _217=_216.getNext();
list.add(new SystemNode(_217));
}
};
this.getChildNodesBySearchToken=function(node,_219){
return this.getChildNodes(node,_219);
};
this.getNamedRoots=function(key,_21b){
var _21c=new List();
var _21d=null;
if(_21b){
if(SearchTokens.hasToken(_21b)){
_21b=SearchTokens.getToken(_21b);
}
_21d=TreeService.GetNamedRootsBySearchToken(key,_21b);
}else{
_21d=TreeService.GetNamedRoots(key);
}
new List(_21d).each(function(_21e){
var node=new SystemNode(_21e);
if(_21b){
node.searchToken=_21b;
}
_21c.add(node);
});
return _21c;
};
this.getNamedRootsBySearchToken=function(key,_221){
return this.getNamedRoots(key,_221);
};
function compileActionList(node,_223,_224){
var _225=_223.ClientElementActionGroupId;
if(_225!=null){
var _226=_224.get(_225).ClientElementActionGroupItems;
if(_226&&_226.length>0){
node.setActionList(new List(_226));
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
new List(self._data.Actions).each(function(_22c){
var _22d=_22c.ActionCategory.Name;
if(SystemAction.hasCategory(_22d)){
var _22e=new SystemAction(_22c);
SystemAction.actionMap.set(_22c.ActionKey,_22e);
}else{
throw "No such action category: "+_22d;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _22f=null;
if(this.searchToken){
_22f=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_22f=System.getChildNodes(this);
}
return _22f;
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
var _231=this._data.Piggybag;
if(_231==null){
_231="";
}
return _231;
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
var _233=null;
if(typeof this._data.ToolTip!="undefined"){
_233=this._data.ToolTip;
}
return _233;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_235){
map[_235.Key]=_235.Value;
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
var _239=SystemAction.actionMap.get(key);
var _23a=true;
if(_239.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_23a=false;
}
}
if(_23a){
var id=_239.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_239);
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
SystemAction.invoke=function(_23d,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_23d.logger.debug("Execute \""+_23d.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_23d.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_240,_241){
action=SystemAction.taggedActions.get(_240);
node=SystemNode.taggedNodes.get(_241);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_242){
return SystemAction.categories[_242]?true:false;
};
function SystemAction(_243){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_243;
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
var _244=null;
if(this.isInFolder()){
_244=this._data.ActionCategory.FolderName;
}
return _244;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _245=null;
if(typeof this._data.TagValue!="undefined"){
_245=this._data.TagValue;
}
return _245;
};
SystemAction.prototype.isChecked=function(){
var _246=null;
if(this.isCheckBox()){
_246=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _246;
};
function _UpdateManager(){
var _247=null;
if(!window.UpdateManager){
this._construct();
_247=this;
}
return _247;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_248){
var root=document.documentElement;
var _24a=root.namespaceURI;
if(_24a==null){
_24a=new String(root.getAttribute("xmlns"));
}
if(_24a=="http://www.w3.org/1999/xhtml"){
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
var _24b=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_24b);
}else{
throw new TypeError();
}
}else{
var _24c=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_24c.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _24e=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_24e=true;
}
},this);
return _24e;
},_setupForm:function(form){
var _251=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_251.isEnabled){
_251._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_252,type){
if(_252.addEventListener!=null){
_252.addEventListener(type,this,false);
}else{
var _254=this;
_252.attachEvent("on"+type,function(){
_254.handleEvent(window.event);
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
var _259=UpdateAssistant.getUpdateZones(dom);
var _25a=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_259.forEach(function(_25b,_25c){
var _25d=_25a[_25c];
this._crawl(_25b,_25d);
},this);
this._updates.forEach(function(_25e,_25f){
_25e.update();
_25e.dispose();
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
},_crawl:function(_261,_262,_263,id){
var _265=true;
var _266=_262.getAttribute("class");
if(_266==null||_266.indexOf(this.CLASSNAME_GONE)==-1){
if(_262.nodeType==Node.ELEMENT_NODE){
var _267=_262.getAttribute("id");
if(_267!=null){
_263=_261;
id=_267;
}
}
if(_265=this._check(_261,_262,_263,id)){
var _268=_261.firstChild;
var _269=_262.firstChild;
while(_268!=null&&_269!=null&&!this._replaced[id]){
switch(_268.nodeType){
case Node.TEXT_NODE:
_265=this._check(_268,_269,_263,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_265=this._crawl(_268,_269,_263,id);
break;
}
if(this._replaced[id]){
_265=false;
}else{
_268=_268.nextSibling;
_269=_269.nextSibling;
}
}
}
}
return _265;
},_check:function(_26a,_26b,_26c,id){
var _26e=true;
var _26f=null;
var _270=false;
var _271=false;
if((_26a!=null&&_26b==null)||(_26a==null&&_26b!=null)){
_26e=false;
}else{
if(_26e=_26a.nodeType==_26b.nodeType){
switch(_26b.nodeType){
case Node.ELEMENT_NODE:
if(_26a.namespaceURI!=_26b.namespaceURI||_26a.nodeName!=_26b.nodeName){
_26e=false;
}else{
if(_26e=(_26a.nodeName==_26b.nodeName)){
var _272=_26b.getAttribute("id");
var _273=_26a.getAttribute("id");
if(_272!=null&&_273!=null){
if(_272!=_273){
_26e=false;
}else{
if((_26f=this._getPlugin(_26a,_26b))!=null){
if(_26f.updateElement(_26a,_26b)){
_271=true;
_26e=false;
}
}
}
}
if(_26e){
if(_26e=this._checkAttributes(_26a,_26b)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_26a)&&this._hasSoftChildren(_26b)){
if(this._validateSoftChildren(_26a,_26b)){
this._updateSoftChildren(_26a,_26b);
_270=true;
}
_26e=false;
}else{
_26e=_26a.childNodes.length==_26b.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_26a.data.trim()!=_26b.data.trim()){
_26e=false;
}
break;
}
}
}
if(_26e==false&&!_270&&!_271){
if(id!=null&&_26c!=null){
this.addUpdate(new ReplaceUpdate(id,_26c));
}
}
return _26e;
},_checkAttributes:function(_274,_275){
var _276=true;
var _277=false;
var _278=_274.attributes;
var _279=_275.attributes;
if(_278.length!=_279.length){
_277=true;
}else{
_277=!Array.every(_278,function(att1,i){
var att2=_279.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_277){
var _27d=_274.getAttribute("id");
var _27e=_275.getAttribute("id");
if(this.hasSoftAttributes&&_27d!=null&&_27d==_27e){
this.addUpdate(new AttributesUpdate(_27e,_274,_275));
}else{
_276=false;
}
}
return _276;
},_hasSoftChildren:function(_27f){
var _280=true;
if(_27f.hasChildNodes()){
_280=Array.every(_27f.childNodes,function(node){
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
return _280;
},_validateSoftChildren:function(_283,_284){
var _285=true;
var _286=-1;
var _287=-1;
var _288=-1;
var news=this._toMap(_283.childNodes,true);
var olds=this._toMap(_284.childNodes,true);
for(var id in olds){
if(_285){
var _28c=olds[id];
_285=_28c>=_286;
if(news[id]!=null){
_288=news[id];
_285=_288>=_287;
}
}
_286=_28c;
if(_288>-1){
_287=_288;
}
}
return _285;
},_updateSoftChildren:function(_28d,_28e){
var news=this._toMap(_28d.childNodes);
var olds=this._toMap(_28e.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _292=null;
for(id in news){
if(olds[id]==null){
var _293=news[id];
if(_292==null){
var _294=_28e.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_294,_293,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_292,_293,false));
}
}
_292=id;
}
},addUpdate:function(_295){
this._updates.push(_295);
if(_295 instanceof ReplaceUpdate){
this._replaced[_295.id]=true;
}
},_getPlugin:function(_296,_297){
var _298=null;
this.plugins.every(function(_299){
if(_299.handleElement(_296,_297)){
_298=_299;
}
return _298==null;
});
return _298;
},_toMap:function(_29a,_29b){
var _29c={};
Array.forEach(_29a,function(node,_29e){
if(node.nodeType==Node.ELEMENT_NODE){
_29c[node.getAttribute("id")]=_29b?_29e:node;
}
});
return _29c;
},_getPost:function(form){
var _2a0=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_2a2){
var name=_2a2.name;
var _2a4=encodeURIComponent(_2a2.value);
switch(_2a2.type){
case "button":
case "submit":
var _2a5=UpdateAssistant.getActiveElement();
if(_2a2==_2a5&&name!=""){
_2a0+=name+"="+_2a4+"&";
}
break;
case "radio":
if(_2a2.checked){
_2a0+=name+"="+_2a4+"&";
}
break;
case "checkbox":
if(_2a2.checked){
if(_2a2.name==last){
if(_2a0.lastIndexOf("&")==_2a0.length-1){
_2a0=_2a0.substr(0,_2a0.length-1);
}
_2a0+=","+_2a4;
}else{
_2a0+=name+"="+_2a2.value;
}
last=name;
_2a0+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_2a0+=name+"="+_2a4+"&";
break;
}
});
}
return _2a0.substr(0,_2a0.length-1);
},_postRequest:function(form){
var _2a7=form.method!=""?form.method:"get";
var _2a8=form.action!=""?form.action:window.location.toString();
var _2a9=this._getPost(form);
if(_2a7=="get"){
if(_2a8.indexOf("?")>-1){
_2a8=_2a8+"&"+_2a9;
}else{
_2a8+"?"+_2a9;
}
}
var _2aa=this;
var _2ab=UpdateAssistant.getXMLHttpRequest(_2a7,_2a8,this);
if(_2a7=="post"){
_2ab.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2ab.send(_2a7=="post"?_2a9:null);
},_fixdotnet:function(dom,id){
var _2ae=document.getElementById(id);
if(_2ae!=null){
var _2af=UpdateAssistant.getElementById(dom,id);
if(_2af!=null){
var _2b0=_2af.getAttribute("value");
if(_2b0!==_2ae.value){
_2ae.value=_2b0;
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
},report:function(_2b3){
this.summary+=_2b3+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2b4=null;
if(!window.UpdateAssistant){
this._construct();
_2b4=this;
}
return _2b4;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2b5,fun){
var _2b7=true;
var len=_2b5.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2b9=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b5[i]!="undefined"){
if(!fun.call(_2b9,_2b5[i],i,_2b5)){
_2b7=false;
break;
}
}
}
}
return _2b7;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2bc=arguments[1];
return Array.every(this,fun,_2bc);
};
}
if(!Array.forEach){
Array.forEach=function(_2bd,fun){
var len=_2bd.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2c0=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2bd[i]!="undefined"){
fun.call(_2c0,_2bd[i],i,_2bd);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2c3=arguments[1];
Array.forEach(this,fun,_2c3);
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
},getXMLHttpRequest:function(_2c5,_2c6,_2c7){
var _2c8=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2c8!=null){
_2c8.open(_2c5,_2c6,(_2c7!=null?true:false));
if(_2c7!=null){
function action(){
if(_2c8.readyState==4){
var text=_2c8.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2c7.handleResponse(dom);
}
}
}
if(_2c8.addEventListener!=null){
_2c8.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2c8.onreadystatechange=action;
}
}
}
return _2c8;
},dispatchEvent:function(_2cb,name){
var _2cd=true;
if(_2cb.fireEvent!=null){
_2cd=_2cb.fireEvent("on"+name);
}else{
var _2ce=document.createEvent("UIEvents");
_2ce.initEvent(name,true,true);
_2cd=_2cb.dispatchEvent(_2ce);
}
return _2cd;
},getUpdateZones:function(dom){
var _2d0="//*[@id and contains(@class,'updatezone')]";
var _2d1=[];
var _2d2=null;
var _2d3=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d2=dom.evaluate(_2d0,dom,null,type,null);
while((_2d3=_2d2.iterateNext())!=null){
_2d1.push(_2d3);
}
}else{
_2d2=dom.documentElement.selectNodes(_2d0);
Array.forEach(_2d2,function(_2d5){
_2d1.push(_2d5);
});
}
return _2d1;
},getElementById:function(dom,id){
var _2d8="//*[@id='"+id+"']";
var _2d9=null;
var _2da=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2d9=dom.evaluate(_2d8,dom,null,type,null);
_2da=_2d9.singleNodeValue;
}else{
_2da=dom.documentElement.selectNodes(_2d8)[0];
}
return _2da;
},_getIds:function(dom){
var _2dd="//*[@id]";
var _2de=null;
var _2df=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2de=dom.evaluate(_2dd,dom,null,type,null);
while((element=_2de.iterateNext())!=null){
_2df.push(element.getAttribute("id"));
}
}else{
_2de=dom.documentElement.selectNodes(_2dd);
Array.forEach(_2de,function(_2e1){
_2df.push(_2e1.getAttribute("id"));
});
}
return _2df;
},toHTMLElement:function(_2e2){
var _2e3=this.serialize(_2e2);
var temp=document.createElement("temp");
temp.innerHTML=_2e3;
return temp.firstChild;
},getActiveElement:function(){
var _2e5=document.activeElement;
if(_2e5==null||_2e5==document.body){
_2e5=this._activeElement;
}
return _2e5;
},serialize:function(_2e6){
var _2e7=null;
if(this._serializer!=null){
_2e7=this._serializer.serializeToString(_2e6);
}else{
_2e7=_2e6.xml;
}
return _2e7;
},hasDifferences:function(_2e8,_2e9){
var s1=null;
var s2=null;
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2e8);
s2=this._serializer.serializeToString(_2e9);
}else{
s1=_2e8.xml;
s2=_2e9.xml;
}
return s1!=s2;
},parse:function(_2ec){
var _2ed=null;
if(this._parser!=null){
_2ed=this._parser.parseFromString(_2ec,"text/xml");
}else{
_2ed=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2ed.setProperty("SelectionLanguage","XPath");
_2ed.loadXML(_2ec);
}
return this._validate(_2ed);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2f0=dom.getElementsByTagName("parsererror").item(0);
if(_2f0!=null){
out=_2f0.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2f4=!has[id];
has[id]=true;
if(!_2f4){
out="Element \""+id+"\" encountered twice.";
}
return _2f4;
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
this.handleElement=function(_2f5,_2f6){
var _2f7=false;
switch(_2f5.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2f5.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2f7=false;
break;
}
break;
}
return _2f7;
};
this.updateElement=function(_2f8,_2f9){
var id=_2f8.getAttribute("id");
var _2fb=document.getElementById(id);
if(_2fb!=null){
var _2fc=null;
switch(_2fb.nodeName.toLowerCase()){
case "input":
_2fc=_2f8.getAttribute("value");
break;
case "textarea":
_2fc=_2f8.textContent?_2f8.textContent:_2f8.text;
break;
}
if(_2fc==null){
_2fc="";
}
if(_2fc!=_2fb.value){
_2fb.value=_2fc;
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
},_beforeUpdate:function(_2fd){
var _2fe=true;
if(_2fd!=null){
_2fd.__updateType=this.type;
_2fe=UpdateAssistant.dispatchEvent(_2fd,Update.EVENT_BEFOREUPDATE);
}
return _2fe;
},_afterUpdate:function(_2ff){
var _300=true;
if(_2ff!=null){
_2ff.__updateType=this.type;
_300=UpdateAssistant.dispatchEvent(_2ff,Update.EVENT_AFTERUPDATE);
}
return _300;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_302){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_302;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _303,_304,_305=UpdateAssistant.toHTMLElement(this.element);
if((_303=document.getElementById(this.id))!=null){
if((_304=_303.parentNode)!=null){
if(this._beforeUpdate(_303)){
_304.replaceChild(_305,_303);
this._afterUpdate(_305);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_306){
var _307=ReplaceUpdate.superclass._afterUpdate.call(this,_306);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_306.nodeName=="form"||_306.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _307;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_30a,_30b){
this.type=type;
this.id=id;
this.element=_30a;
this.isFirst=_30b;
return this;
}
SiblingUpdate.prototype.update=function(){
var _30c=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_30c);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_30c);
break;
}
};
SiblingUpdate.prototype._remove=function(_30d){
var _30e=_30d.parentNode;
if(_30e!=null){
if(this._beforeUpdate(_30d)){
_30e.removeChild(_30d);
this._afterUpdate(_30e);
}
}
};
SiblingUpdate.prototype._insert=function(_30f,_310){
var _311=UpdateAssistant.toHTMLElement(_30f);
if(this.isFirst){
var _312=_310;
if(_312!=null){
if(this._beforeUpdate(_312)){
_312.insertBefore(_311,_312.firstChild);
this._afterUpdate(_311);
}
}
}else{
var _312=_310.parentNode;
if(_312!=null){
if(this._beforeUpdate(_312)){
_312.insertBefore(_311,_310.nextSibling);
this._afterUpdate(_311);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_313){
var _314=SiblingUpdate.superclass._beforeUpdate.call(this,_313);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_313.id+"\"");
}
return _314;
};
SiblingUpdate.prototype._afterUpdate=function(_315){
var _316=true;
if(_315!=null){
_316=SiblingUpdate.superclass._afterUpdate.call(this,_315);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_315.id+"\"");
if(_315.nodeName=="form"||_315.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _316;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_318,_319){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_318;
this.currentElement=_319;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _31a=document.getElementById(this.id);
if(this._beforeUpdate(_31a)){
this._updateAttributes(_31a);
this._afterUpdate(_31a);
}
};
AttributesUpdate.prototype._updateAttributes=function(_31b){
Array.forEach(this.element.attributes,function(_31c){
var _31d=this.currentElement.getAttribute(_31c.nodeName);
if(_31d==null||_31d!=_31c.nodeValue){
this._setAttribute(_31b,_31c.nodeName,_31c.nodeValue);
this._summary.push("@"+_31c.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_31e){
if(this.element.getAttribute(_31e.nodeName)==null){
this._setAttribute(_31b,_31e.nodeName,null);
this._summary.push("@"+_31e.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_31f,name,_321){
if(_31f==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_321);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _322=(_321==null);
if(_322){
_31f.removeAttribute(name);
}else{
_31f.setAttribute(name,_321);
}
if(document.all!=null){
if(_322){
_321="";
}
switch(name.toLowerCase()){
case "class":
_31f.className=_321;
break;
case "disabled":
_31f.disabled=!_322;
break;
case "checked":
_31f.checked=!_322;
break;
case "readonly":
_31f.readOnly=!_322;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_323){
AttributesUpdate.superclass._afterUpdate.call(this,_323);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_324,key){
return _324.replace("${windowkey}",document.location+":"+key);
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
var _328=this._newDimensions.w!=this._currentDimensions.w;
var _329=this._newDimensions.h!=this._currentDimensions.h;
if(_328||_329){
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
},fireOnDOM:function(_32b){
if(Interfaces.isImplemented(IDOMHandler,_32b,true)){
this._ondomstatements.add(_32b);
}
},fireOnLoad:function(_32c){
if(Interfaces.isImplemented(ILoadHandler,_32c,true)){
this._onloadstatements.add(_32c);
}
},fireOnResize:function(_32d){
if(Interfaces.isImplemented(IResizeHandler,_32d,true)){
this._onresizestatements.add(_32d);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_32e){
return eval(_32e);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_32f,_330){
SystemLogger.unsuspend(_330);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_331,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _334=top.app.bindingMap.broadcasterHasDirtyTabs;
_334.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_335,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _338=top.app.bindingMap.broadcasterHasDirtyTabs;
_338.disable();
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
var _339=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_339=LoginService.Logout(true);
if(!_339){
alert("Logout failed.");
}
}
return _339;
},lock:function(_33a){
if(_33a!=null){
this._lockthings[_33a]=true;
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
},unlock:function(_33b,_33c){
if(_33b!=null){
delete this._lockthings[_33b];
if(top.bindingMap.mastercover!=null){
if(_33c||this._lockers>0){
if(_33c){
var out="Unlocked by "+new String(_33b)+"\n";
for(var _33e in this._lockthings){
out+="Locked by "+new String(_33e)+". ";
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
},hasLock:function(_33f){
return this._lockthings[_33f]==true;
},activate:function(_340){
var _341=this._activeBinding;
this._activeBinding=_340;
this._activatedBindings.add(_340);
if(_341&&_341.isActive){
_341.deActivate();
}
},deActivate:function(_342){
var _343=null;
var _344=null;
if(_342==this._activeBinding){
while(!_344&&this._activatedBindings.hasEntries()){
_343=this._activatedBindings.extractLast();
if(_343!=_342&&_343.isActivatable){
_344=_343;
}
}
if(!_344){
_344=app.bindingMap.explorerdock;
}
_344.activate();
}
},focused:function(_345){
this.isFocused=_345;
if(_345){
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
},handleAction:function(_34a){
switch(_34a.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _34c=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_34e){
var src=_34e.src;
if(src.indexOf(_34c)>-1){
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
var _353=false;
if(this._isMousePositionTracking){
_353=true;
if(Client.isExplorer&&e.button!=1){
_353=false;
}
if(_353){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _353;
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
},onDragStart:function(_355){
var _356=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_356,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_356.getImage());
this._cursorStartPoint=_355;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_356.showDrag){
_356.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_356.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _358=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_358);
}
},onDragStop:function(diff){
if(this._isDragging){
var _35a=BindingDragger.draggedBinding;
if(_35a.hideDrag){
_35a.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_35a.dragType);
this._isDragging=false;
_35a=BindingAcceptor.acceptingBinding;
if(_35a!=null){
if(Interfaces.isImplemented(IAcceptable,_35a,true)==true){
_35a.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_35a);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_35b){
if(this.isDeveloperMode||_35b){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_35c){
if(_35c==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_35d){
switch(_35d){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_35f){
switch(_35f.Key){
case "ProductVersion":
this.versionString=_35f.Value;
break;
case "ProductTitle":
this.versionPrettyString=_35f.Value;
break;
case "InstallationId":
this.installationID=_35f.Value;
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
},initialize:function(_362){
if(!this.isInitialized){
this.isInitialized=true;
if(_362){
this._audio=_362;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _364=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_364=true;
}
return _364;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _365=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _366={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _367=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_367){
for(var key in _367){
_366[key]=_367[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_366);
}
}});
this.getPref=function(key){
var _36a=null;
if(key){
_36a=_366[key];
}else{
throw "No such preference.";
}
return _36a;
};
this.setPref=function(key,_36c){
if(key){
_366[key]=_36c;
}else{
throw "No such preference.";
}
};
function debug(_36d){
var _36e=_36d?"Persisted preferences":"No persisted preferences. Using defaults";
_36e+=":\n";
for(var key in _366){
var pref=_366[key];
_36e+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_365.fine(_36e);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _373=null;
if(this.isInitialized==true){
if(this._persistance){
var _374=this._persistance[id];
if(_374){
_373=_374[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _373;
},setPersistedProperty:function(id,prop,_377){
if(this.isInitialized==true){
if(this._persistance){
if(_377!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_377);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_378){
switch(_378){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _379=top.bindingMap.persistance;
_379.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _37a=top.bindingMap.persistance;
var map=_37a.getPersistanceMap();
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
function StandardEventHandler(doc,_37d){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_37d;
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
var _37f={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_37f);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_37f);
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
var _386=UserInterface.getBinding(node);
if(_386!=null){
_386.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_386!=null?null:node.parentNode;
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
var _389=Application.trackMousePosition(e);
if(_389){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_38b){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_38b){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_38b=true;
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
var _38c=KeySetBinding.handleKey(this._contextDocument,e);
if(!_38c){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _38d=this._contextWindow.frameElement;
if(_38d!=null){
var _38e=DOMUtil.getParentWindow(_38d);
if(_38e.standardEventHandler!=null){
_38e.standardEventHandler._handleKeyDown(e,_38b);
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
var _391=false;
var _392=DOMEvents.getTarget(e);
var name=_392.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_391=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_391;
}
if(_391){
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
StandardEventHandler.prototype.enableNativeKeys=function(_395){
this._isAllowTabs=(_395==true?true:false);
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
function Action(_398,type){
this.target=_398;
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
function Animation(_39a){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _39b in _39a){
this[_39b]=_39a[_39b];
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
Animation.prototype.onstart=function(_39f){
};
Animation.prototype.onstep=function(_3a0){
};
Animation.prototype.onstop=function(_3a1){
};
Point.isEqual=function(p1,p2){
var _3a4=false;
if(p1&&p2){
_3a4=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a4;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3a9=false;
if(dim1&&dim2){
_3a9=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3a9;
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
function BindingAcceptor(_3b0){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3b0;
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
var _3b1=new List(this._binding.dragAccept.split(" "));
while(_3b1.hasNext()){
var type=_3b1.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3b3,arg){
var type=arg;
try{
switch(_3b3){
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
function BindingBoxObject(_3b8){
this._domElement=_3b8.getBindingElement();
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
function BindingDragger(_3ba){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3ba;
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
BindingDragger.prototype.registerHandler=function(_3bc){
if(Interfaces.isImplemented(IDragHandler,_3bc)==true){
this.handler=_3bc;
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
var _3bf=e.button==(e.target?0:1);
if(_3bf){
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
var _3c1=Application.getMousePosition();
var dx=_3c1.x-this.startPoint.x;
var dy=_3c1.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c4,e){
switch(_3c4){
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
function BindingParser(_3c6){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3c6;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3c7){
var _3c8=new List();
var xml=BindingParser.XML.replace("${markup}",_3c7);
var doc=XMLParser.parse(_3c7);
if(doc){
var _3cb=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3cb);
var node=_3cb.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3c8.add(node);
}
node=node.nextSibling;
}
}
return _3c8;
};
BindingParser.prototype._iterate=function(_3cd,_3ce){
var _3cf=null;
switch(_3cd.nodeType){
case Node.ELEMENT_NODE:
_3cf=this._cloneElement(_3cd);
UserInterface.registerBinding(_3cf);
break;
case Node.TEXT_NODE:
_3cf=this._ownerDocument.createTextNode(_3cd.nodeValue);
break;
}
if(_3cf){
_3ce.appendChild(_3cf);
}
if(_3cf&&_3cd.hasChildNodes()){
var _3d0=_3cd.firstChild;
while(_3d0){
this._iterate(_3d0,_3cf);
_3d0=_3d0.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3d1){
var _3d2=DOMUtil.createElementNS(_3d1.namespaceURI?_3d1.namespaceURI:Constants.NS_XHTML,_3d1.nodeName,this._ownerDocument);
var i=0;
while(i<_3d1.attributes.length){
var attr=_3d1.attributes.item(i++);
_3d2.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3d2;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3d5){
var _3d6=null;
var _3d7=false;
var _3d8=_3d5.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d5)){
var _3d9=UserInterface.getBinding(_3d5);
_3d7=BindingSerializer.activeInstance.indexBinding(_3d9);
if(_3d7){
_3d6=_3d9.key;
_3d5.setAttribute(BindingSerializer.KEYPOINTER,_3d6);
}
}
_3d6=_3d6?_3d6:_3d8;
var _3da=new List(_3d5.childNodes);
_3da.each(function(_3db){
if(_3db.nodeType==Node.ELEMENT_NODE){
_3db.setAttribute(BindingSerializer.KEYPOINTER,_3d6);
}
});
if(_3d7){
BindingSerializer.activeInstance.append(_3d6,_3d8);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3dc,_3dd){
BindingSerializer.includeShadowTreeBindings=_3dd?true:false;
BindingSerializer.activeInstance=this;
_3dc.bindingWindow.ElementIterator.iterate(_3dc.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3de){
var _3df=false;
var _3e0=_3de.serialize();
if(_3e0!=false){
_3df=true;
var _3e1="ui:"+DOMUtil.getLocalName(_3de.bindingElement);
var _3e2=DOMUtil.createElementNS(Constants.NS_UI,_3e1,this._dom);
this._pointers[_3de.key]=_3e2;
for(var prop in _3e0){
if(_3e0[prop]!=null){
_3e2.setAttribute(prop,String(_3e0[prop]));
}
}
}
return _3df;
};
BindingSerializer.prototype.append=function(_3e4,_3e5){
var _3e6=this._pointers[_3e4];
var _3e7=_3e5?this._pointers[_3e5]:this._dom;
_3e7.appendChild(_3e6);
};
function ImageProfile(_3e8){
this._default=_3e8.image;
this._hover=_3e8.imageHover;
this._active=_3e8.imageActive;
this._disabled=_3e8.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3e9){
this._default=_3e9;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3ea){
this._hover=_3ea;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3eb){
this._active=_3eb;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3ec){
this._disabled=_3ec;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3ed,_3ee,_3ef){
var _3f0=null;
if(_3ed.isAttached){
_3f0=new List();
var _3f1=_3ef?_3ed.getChildElementsByLocalName(_3ee):_3ed.getDescendantElementsByLocalName(_3ee);
_3f1.each(function(_3f2){
var _3f3=UserInterface.getBinding(_3f2);
if(_3f3){
_3f0.add(_3f3);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3ed.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3f0;
},getAncestorBindingByType:function(_3f5,impl,_3f7){
var _3f8=null;
if(Binding.exists(_3f5)){
var node=_3f5.bindingElement;
while(_3f8==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3fa=UserInterface.getBinding(node);
if(_3fa instanceof impl){
_3f8=_3fa;
}
}else{
if(_3f7&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3f8;
},getAncestorBindingByLocalName:function(_3fc,_3fd,_3fe){
var _3ff=null;
if(_3fd=="*"){
var node=_3fc.bindingElement;
while(!_3ff&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3ff=UserInterface.getBinding(node);
}
}
}else{
_3ff=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3fd,_3fc.bindingElement,_3fe));
}
return _3ff;
},getChildElementsByLocalName:function(_401,_402){
var _403=new List();
var _404=new List(_401.bindingElement.childNodes);
_404.each(function(_405){
if(_405.nodeType==Node.ELEMENT_NODE){
if(_402=="*"||DOMUtil.getLocalName(_405)==_402){
_403.add(_405);
}
}
});
return _403;
},getChildBindingByType:function(_406,impl){
var _408=null;
_406.getChildElementsByLocalName("*").each(function(_409){
var _40a=UserInterface.getBinding(_409);
if(_40a!=null&&_40a instanceof impl){
_408=_40a;
return false;
}else{
return true;
}
});
return _408;
},getDescendantBindingByType:function(_40b,impl){
var _40d=null;
_40b.getDescendantElementsByLocalName("*").each(function(_40e){
var _40f=UserInterface.getBinding(_40e);
if(_40f!=null&&_40f instanceof impl){
_40d=_40f;
return false;
}else{
return true;
}
});
return _40d;
},getDescendantBindingsByType:function(_410,impl){
var _412=new List();
_410.getDescendantElementsByLocalName("*").each(function(_413){
var _414=UserInterface.getBinding(_413);
if(_414!=null&&_414 instanceof impl){
_412.add(_414);
}
return true;
});
return _412;
},getNextBindingByLocalName:function(_415,name){
var _417=null;
var _418=_415.bindingElement;
while((_418=DOMUtil.getNextElementSibling(_418))!=null&&DOMUtil.getLocalName(_418)!=name){
}
if(_418!=null){
_417=UserInterface.getBinding(_418);
}
return _417;
},getPreviousBindingByLocalName:function(_419,name){
var _41b=null;
var _41c=_419.bindingElement;
while((_41c=DOMUtil.getPreviousElementSibling(_41c))!=null&&DOMUtil.getLocalName(_41c)!=name){
}
if(_41c!=null){
_41b=UserInterface.getBinding(_41c);
}
return _41b;
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
},addFilter:function(_41d){
this._filters.add(_41d);
},removeFilter:function(_41e){
var _41f=-1;
this._filters.each(function(fil){
_41f++;
var _421=true;
if(fil==_41e){
_421=false;
}
return _421;
});
if(_41f>-1){
this._filters.del(_41f);
}
},_applyFilters:function(node,arg){
var _424=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _427=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _428=true;
while(this._filters.hasNext()&&_428==true){
var _429=this._filters.getNext();
var res=_429.call(this,node,arg);
if(res!=null){
_424=res;
switch(res){
case stop:
case skip:
case skip+_427:
_428=false;
break;
}
}
}
return _424;
},crawl:function(_42b,arg){
this.contextDocument=_42b.ownerDocument;
this.onCrawlStart();
var _42d=this.type==NodeCrawler.TYPE_ASCENDING;
var _42e=this._applyFilters(_42b,arg);
if(_42e!=NodeCrawler.STOP_CRAWLING){
if(_42d&&_42e==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_42d?_42b.parentNode:_42b;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_430,arg){
var _432=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_432=this._crawlDescending(_430,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_432=this._crawlAscending(_430,arg);
break;
}
return _432;
},_crawlDescending:function(_433,arg){
var skip=NodeCrawler.SKIP_NODE;
var _436=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _438=null;
if(_433.hasChildNodes()){
var node=_433.firstChild;
while(node!=null&&_438!=stop){
this.currentNode=node;
_438=this._applyFilters(node,arg);
switch(_438){
case stop:
case _436:
case skip+_436:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_438=stop;
break;
}
}
}
if(_438!=stop&&_438!=skip){
this.previousNode=node;
}
break;
}
if(_438!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _438;
},_crawlAscending:function(_43b,arg){
var _43d=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_43b!=null){
this.currentNode=_43b;
_43d=this._applyFilters(_43b,arg);
if(_43d!=stop){
var next=this.nextNode?this.nextNode:_43b.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_43b;
_43d=this._crawl(next,arg);
}
}
}else{
_43d=stop;
}
return _43d;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _441 in this){
this[_441]=null;
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
var _444=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_444=NodeCrawler.SKIP_NODE;
}
return _444;
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
this.addFilter(function(_445,arg){
var _447=null;
if(!UserInterface.hasBinding(_445)){
_447=NodeCrawler.SKIP_NODE;
}
return _447;
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
this.addFilter(function(_449,arg){
var _44b=null;
var _44c=UserInterface.getBinding(_449);
if(Interfaces.isImplemented(ICrawlerHandler,_44c)==true){
self.response=null;
_44c.handleCrawler(self);
_44b=self.response;
}
return _44b;
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
this.addFilter(function(_44e,list){
var _450=null;
var _451=UserInterface.getBinding(_44e);
if(Interfaces.isImplemented(IFlexible,_451)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_451);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_451.isFlexSuspended==true){
_450=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_451);
}
break;
}
}
return _450;
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
this.addFilter(function(_452,list){
var _454=null;
var _455=UserInterface.getBinding(_452);
if(_455.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_455)==true){
if(_455.isFocusable&&_455.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_455);
break;
case FocusCrawler.MODE_FOCUS:
if(!_455.isFocused){
_455.focus();
}
_454=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_455.isFocused==true){
_455.blur();
_454=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _454;
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
this.addFilter(function(_456,list){
var _458=null;
var _459=UserInterface.getBinding(_456);
if(!_459.isVisible){
_458=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _458;
});
this.addFilter(function(_45a,list){
var _45c=null;
var _45d=UserInterface.getBinding(_45a);
if(_45d.isAttached){
if(Interfaces.isImplemented(IFit,_45d)){
if(!_45d.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_45d);
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
UpdateAssistant.serialize=function(_45e){
_45e=_45e.cloneNode(true);
_45e.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_45e.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_45e);
};
}
},handleEvent:function(e){
var _460=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_460);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_460);
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
},_beforeUpdate:function(_461){
var _462=(_461==document.documentElement);
if(_462){
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
var _465=FocusBinding.focusedBinding;
if(_465!=null){
this._focusID=_465.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_461.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_461);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_461,false);
break;
}
}
},_afterUpdate:function(_466){
var _467=(_466==document.documentElement);
if(_467){
var _468=this._elementsbuffer;
if(_468.hasEntries()){
_468.each(function(_469){
DocumentManager.attachBindings(_469);
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
var _46c=FocusBinding.focusedBinding;
if(_46c==null){
var _46d=document.getElementById(this._focusID);
if(_46d!=null){
var _46c=UserInterface.getBinding(_46d);
if(_46c!=null){
_46c.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _46e=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _46f="NEW DOM: "+document.title+"\n\n"+_46e+"\n\n";
_46f+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_46f);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_466.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_466);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_466,true);
break;
}
switch(_466.id){
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
var _46c=UserInterface.getBinding(_466);
while(_46c==null&&_466!=null){
_46c=UserInterface.getBinding(_466);
_466=_466.parentNode;
}
if(_46c!=null){
_46c.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_471,_472){
var _473=UserInterface.getBinding(_471);
if(_473!=null){
if(_472){
var _474=this._attributesbuffer;
var map=new Map();
_474.each(function(name,old){
var now=_471.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_471.attributes).each(function(att){
if(att.specified){
if(!_474.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_47b){
var _47c=_473.propertyMethodMap[name];
if(_47c!=null){
_47c.call(_473,_47b);
}
});
}else{
var map=new Map();
new List(_471.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_47e,_47f){
var _480=window.bindingMap[_47e.getAttribute("id")];
if(_480!=null){
return _480.handleElement(_47e,_47f);
}
},updateElement:function(_481,_482){
var _483=window.bindingMap[_481.getAttribute("id")];
if(_483!=null){
return _483.updateElement(_481,_482);
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
this.addFilter(function(_485,list){
var _487=UserInterface.getBinding(_485);
var _488=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_487==null){
UserInterface.registerBinding(_485);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_487!=null){
if(!_487.isAttached){
list.add(_487);
}
if(_487.isLazy==true){
_488=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_487!=null){
list.add(_487);
}
break;
}
return _488;
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
},handleBroadcast:function(_489,arg){
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
var _48c=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_48c)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_48c!=null){
if(_48c.href!=null&&_48c.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _48d=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_48d!=null){
var map={};
var _48f=DOMUtil.getElementsByTagName(_48d,"bindingmapping");
new List(_48f).each(function(_490){
var _491=_490.getAttribute("element");
var _492=_490.getAttribute("binding");
map[_491]=eval(_492);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_493){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_493;
}else{
this.customUserInterfaceMapping.merge(_493);
}
},_registerBindings:function(_494){
var _495=new DocumentCrawler();
_495.mode=DocumentCrawler.MODE_REGISTER;
_495.crawl(_494);
_495.dispose();
},_attachBindings:function(_496){
var _497=new DocumentCrawler();
_497.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_497.crawl(_496,list);
var _499=false;
while(list.hasNext()){
var _49a=list.getNext();
if(!_49a.isAttached){
_49a.onBindingAttach();
if(!_49a.memberDependencies){
_49a.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_49a)){
_499=true;
}
}
}
if(_499){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_497.dispose();
list.dispose();
},attachBindings:function(_49c){
this._registerBindings(_49c);
this._attachBindings(_49c);
},detachBindings:function(_49d,_49e){
var _49f=new DocumentCrawler();
_49f.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_49f.crawl(_49d,list);
if(_49e==true){
list.extractFirst();
}
var _4a1=false;
list.reverse().each(function(_4a2){
if(Interfaces.isImplemented(IData,_4a2)){
_4a1=true;
}
_4a2.dispose(true);
});
if(_4a1){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49f.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4a4){
return (/textarea|input/.test(DOMUtil.getLocalName(_4a4)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a5){
this.isDirty=true;
var _4a6=false;
if(_4a5!=null&&!_4a5.isDirty){
_4a5.isDirty=true;
_4a5.dispatchAction(Binding.ACTION_DIRTY);
_4a6=true;
}
return _4a6;
},clean:function(_4a7){
if(_4a7.isDirty){
_4a7.isDirty=false;
}
},registerDataBinding:function(name,_4a9){
if(Interfaces.isImplemented(IData,_4a9,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4a9;
}
}else{
throw "Invalid DataBinding: "+_4a9;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4ac=null;
if(this._dataBindings[name]!=null){
_4ac=this._dataBindings[name];
}
return _4ac;
},getAllDataBindings:function(_4ad){
var list=new List();
for(var name in this._dataBindings){
var _4b0=this._dataBindings[name];
list.add(_4b0);
if(_4ad&&_4b0 instanceof WindowBinding){
var _4b1=_4b0.getContentWindow().DataManager;
if(_4b1!=null){
list.merge(_4b1.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4b2=false;
for(var name in this._dataBindings){
_4b2=true;
break;
}
return _4b2;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4b6){
var _4b7=this._dataBindings[name];
if(_4b7!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4b7.setResult(_4b6);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4b7);
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
var _4b8=new DataBindingMap();
_4b8.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4ba=this._dataBindings[name];
if(_4ba instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4b8[name]=_4ba.getValue();
}
return _4b8;
},getDataBindingResultMap:function(){
var _4bb=new DataBindingMap();
_4bb.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4bd=this._dataBindings[name];
var res=_4bd.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4c0){
_4bb.set(name,_4c0);
});
}else{
_4bb.set(name,res);
}
}
return _4bb;
},getPostBackString:function(){
var _4c1="";
var form=document.forms[0];
if(form!=null){
var _4c3="";
new List(form.elements).each(function(_4c4){
var name=_4c4.name;
var _4c6=encodeURIComponent(_4c4.value);
switch(_4c4.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4c1+=name+"="+_4c6+"&";
break;
case "submit":
if(document.activeElement==_4c4){
_4c1+=name+"="+_4c6+"&";
}
break;
case "radio":
if(_4c4.checked){
_4c1+=name+"="+_4c6+"&";
}
break;
case "checkbox":
if(_4c4.checked){
if(_4c4.name==_4c3){
if(_4c1.lastIndexOf("&")==_4c1.length-1){
_4c1=_4c1.substr(0,_4c1.length-1);
}
_4c1+=","+_4c6;
}else{
_4c1+=name+"="+_4c4.value;
}
_4c3=name;
_4c1+="&";
}
break;
}
});
}
return _4c1.substr(0,_4c1.length-1);
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
var _4cf=null;
var _4d0=null;
var _4d1=false;
if(!this._cache[name]){
_4d1=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4d3=DOMUtil.getXMLHTTPRequest();
_4d3.open("get",uri,false);
_4d3.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4d3.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4d0=_4d3.responseText;
break;
default:
_4d0=_4d3.responseXML;
break;
}
if(_4d0==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4d0;
}
}
_4d0=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4cf=_4d0;
break;
case this._modes.MODE_DOCUMENT:
_4cf=DOMUtil.cloneNode(_4d0,true);
break;
case this._modes.MODE_ELEMENT:
_4cf=DOMUtil.cloneNode(_4d0.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4cf=DOMSerializer.serialize(_4d0,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4cf=DOMSerializer.serialize(_4d0.documentElement,true);
break;
}
if(_4d1&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4cf));
}
return _4cf;
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
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},dialogButton:function(_4d6){
if(this._dialogButtons==undefined){
this._dialogButtons={"yes":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelYes"),response:this.RESPONSE_YES}),"no":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelNo"),response:this.RESPONSE_NO}),"accept":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelAccept"),response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:StringBundle.getString("ui","Website.Dialogs.LabelCancel"),response:this.RESPONSE_CANCEL})};
}
return Dialog._dialogButtons[_4d6];
},invoke:function(url,_4d8,_4d9){
this._logger.error("Not implemented");
},invokeModal:function(url,_4db,_4dc){
var _4dd=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4db,argument:_4dc});
StageBinding.presentViewDefinition(_4dd);
return _4dd;
},invokeDefinition:function(_4de){
if(_4de instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4de);
}
return _4de;
},question:function(_4df,text,_4e1,_4e2){
if(!_4e1){
_4e1=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4df,text,_4e1,_4e2);
},message:function(_4e3,text,_4e5,_4e6){
if(!_4e5){
_4e5=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4e3,text,_4e5,_4e6);
},error:function(_4e7,text,_4e9,_4ea){
if(!_4e9){
_4e9=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4e7,text,_4e9,_4ea);
},warning:function(_4eb,text,_4ed,_4ee){
if(!_4ed){
_4ed=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4eb,text,_4ed,_4ee);
},_standardDialog:function(type,_4f0,text,_4f2,_4f3){
var _4f4=null;
if(!_4f2){
_4f4=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4f4=new List();
new List(_4f2).each(function(_4f5){
var _4f6=null;
switch(typeof _4f5){
case "object":
_4f6=_4f5;
break;
case "string":
var _4f7=false;
if(_4f5.indexOf(":")>-1){
_4f5=_4f5.split(":")[0];
_4f7=true;
}
_4f6=Dialog.dialogButton(_4f5);
if(_4f7){
_4f6.isDefault=true;
}
break;
}
_4f4.add(_4f6);
});
}
var _4f8={title:_4f0,text:text,type:type,image:this._dialogImages[type],buttons:_4f4};
var _4f9=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4f3,argument:_4f8});
StageBinding.presentViewDefinition(_4f9);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4fb,arg){
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
},saveAll:function(_4fe){
var self=this;
var _500=Application.getDirtyDockTabsTabs();
if(_500.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_501,_502){
switch(_501){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_502,_4fe);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_500);
}else{
if(_4fe){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_503,_504){
var _505=false;
var list=new List();
_503.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_505=true;
var _509=list.getLength();
var _50a={handleBroadcast:function(_50b,tab){
if(--_509==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_504){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_50a);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _505;
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
var _50f="Composite.Management.Help";
if(!StageBinding.isViewOpen(_50f)){
StageBinding.handleViewPresentation(_50f);
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
var _511=document.createEvent("Events");
_511.initEvent(type,true,true);
window.dispatchEvent(_511);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_512,_513){
var _514=null;
var _515=ViewDefinitions[_512];
if(_515.isMutable){
var impl=null;
if(_515 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_513!=null&&impl!=null){
var def=new impl();
for(var prop in _515){
def[prop]=ViewDefinition.cloneProperty(_515[prop]);
}
def.handle=_513;
_514=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _514;
};
ViewDefinition.cloneProperty=function(_519){
if(null==_519){
return _519;
}
if(typeof _519==="object"){
var _51a=(_519.constructor===Array)?[]:{};
for(var prop in _519){
_51a[prop]=ViewDefinition.cloneProperty(_519[prop]);
}
return _51a;
}
return _519;
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
Binding.evaluate=function(_521,_522){
var _523=null;
var _524=_522.bindingWindow.WindowManager;
if(_524!=null){
var _525=Binding.parseScriptStatement(_521,_522.key);
_523=_524.evaluate(_525);
}
return _523;
};
Binding.parseScriptStatement=function(_526,key){
if(_526!=null&&key!=null){
var _528="UserInterface.getBindingByKey ( \""+key+"\" )";
_526=_526.replace(/(\W|^)this(,| +|\)|;)/g,_528);
_526=_526.replace(/(\W|^)this(\.)/g,_528+".");
}
return _526;
};
Binding.exists=function(_529){
var _52a=false;
try{
if(_529&&_529.bindingElement&&_529.bindingElement.nodeType&&_529.isDisposed==false){
_52a=true;
}
}
catch(accessDeniedException){
_52a=false;
}
finally{
return _52a;
}
};
Binding.destroy=function(_52b){
if(!_52b.isDisposed){
if(_52b.acceptor!=null){
_52b.acceptor.dispose();
}
if(_52b.dragger!=null){
_52b.disableDragging();
}
if(_52b.boxObject!=null){
_52b.boxObject.dispose();
}
if(_52b._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_52b);
}
for(var _52c in _52b.shadowTree){
var _52d=_52b.shadowTree[_52c];
if(_52d instanceof Binding&&Binding.exists(_52d)){
_52d.dispose(true);
}
_52b.shadowTree[_52c]=null;
}
_52b.isDisposed=true;
_52b=null;
}
};
Binding.dotnetify=function(_52e,_52f){
var _530=_52e.getCallBackID();
if(_530!=null){
var _531=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_52e.bindingDocument);
_531.type="hidden";
_531.id=_530;
_531.name=_530;
_531.value=_52f!=null?_52f:"";
_52e.bindingElement.appendChild(_531);
_52e.shadowTree.dotnetinput=_531;
}else{
throw _52e.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_532){
var _533=_532.getProperty("image");
var _534=_532.getProperty("image-hover");
var _535=_532.getProperty("image-active");
var _536=_532.getProperty("image-disabled");
if(_532.imageProfile==null){
if(_532.image==null&&_533!=null){
_532.image=_533;
}
if(_532.imageHover==null&&_534!=null){
_532.imageHover=_533;
}
if(_532.imageActive==null&&_535!=null){
_532.imageActive=_535;
}
if(_532.imageDisabled==null&&_536!=null){
_532.imageDisabled=_536;
}
if(_532.image||_532.imageHover||_532.imageActive||_532.imageDisabled){
_532.imageProfile=new ImageProfile(_532);
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
var _538=this.dependentBindings[key];
_538.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_539){
if(_539){
this.memberDependencies[_539.key]=true;
var _53a=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_53a=false;
break;
}
}
if(_53a){
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
Binding.prototype.detachRecursive=function(_53c){
if(_53c==null){
_53c=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_53c);
};
Binding.prototype.addMember=function(_53d){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_53d.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_53d.key]=false;
_53d.registerDependentBinding(this);
}
}
return _53d;
};
Binding.prototype.addMembers=function(_53e){
while(_53e.hasNext()){
var _53f=_53e.getNext();
if(!_53f.isInitialized){
this.addMember(_53f);
}
}
return _53e;
};
Binding.prototype.registerDependentBinding=function(_540){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_540.key]=_540;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _541=this.getProperty("persist");
if(_541&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _543=new List(_541.split(" "));
while(_543.hasNext()){
var prop=_543.getNext();
var _545=Persistance.getPersistedProperty(id,prop);
if(_545!=null){
this._persist[prop]=_545;
this.setProperty(prop,_545);
}else{
_545=this.getProperty(prop);
if(_545!=null){
this._persist[prop]=_545;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _546=this.getProperty("disabled");
var _547=this.getProperty("contextmenu");
var _548=this.getProperty("observes");
var _549=this.getProperty("onattach");
var _54a=this.getProperty("hidden");
var _54b=this.getProperty("blockactionevents");
if(_54a==true&&this.isVisible==true){
this.hide();
}
if(_546&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_547){
this.setContextMenu(_547);
}
if(_548){
this.observe(this.getBindingForArgument(_548));
}
if(_54b==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_549!=null){
Binding.evaluate(_549,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _54d=this.getProperty("draggable");
var _54e=this.getProperty("dragtype");
var _54f=this.getProperty("dragaccept");
var _550=this.getProperty("dragreject");
if(_54d!=null){
this.isDraggable=_54d;
}
if(_54e!=null){
this.dragType=_54e;
if(_54d!=false){
this.isDraggable=true;
}
}
if(_54f!=null){
this.dragAccept=_54f;
}
if(_550!=null){
this.dragReject=_550;
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
Binding.prototype._updateBindingMap=function(_551){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _554=null;
if(_551){
_554=map[id];
if(_554!=null&&_554!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_554=map[id];
if(_554!=null&&_554==this){
delete map[id];
}
}
}else{
var _556=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_551);
if(Application.isDeveloperMode==true){
alert(_556);
}else{
this.logger.error(_556);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_558){
};
Binding.prototype.handleBroadcast=function(_559,arg){
};
Binding.prototype.handleElement=function(_55b){
return false;
};
Binding.prototype.updateElement=function(_55c){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _55e=null;
switch(typeof arg){
case "object":
_55e=arg;
break;
case "string":
_55e=this.bindingDocument.getElementById(arg);
if(_55e==null){
_55e=Binding.evaluate(arg,this);
}
break;
}
if(_55e!=null&&_55e.nodeType!=null){
_55e=UserInterface.getBinding(_55e);
}
return _55e;
};
Binding.prototype.serialize=function(){
var _55f={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_55f.id=id;
}
var _561=this.getProperty("binding");
if(_561){
_55f.binding=_561;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _562=this.getAncestorBindingByLocalName("*");
if(_562){
if(_562.isShadowBinding){
this.isShadowBinding=true;
_55f=false;
}else{
var tree=_562.shadowTree;
for(var key in tree){
var _565=tree[key];
if(_565==this){
this.isShadowBinding=true;
_55f=false;
}
}
}
}
}
return _55f;
};
Binding.prototype.serializeToString=function(_566){
var _567=null;
if(this.isAttached){
_567=new BindingSerializer().serializeBinding(this,_566);
}else{
throw "cannot serialize unattached binding";
}
return _567;
};
Binding.prototype.subTreeFromString=function(_568){
this.detachRecursive();
this.bindingElement.innerHTML=_568;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_569){
var _56a=this.bindingElement.getAttribute(_569);
if(_56a){
_56a=Types.castFromString(_56a);
}
return _56a;
};
Binding.prototype.setProperty=function(prop,_56c){
if(_56c!=null){
_56c=_56c.toString();
if(String(this.bindingElement.getAttribute(prop))!=_56c){
this.bindingElement.setAttribute(prop,_56c);
if(this.isAttached==true){
if(Persistance.isEnabled&&_56c!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_56c;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_56c);
}
}
var _56d=this.propertyMethodMap[prop];
if(_56d){
_56d.call(this,this.getProperty(prop));
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
var _56f=null;
if(Binding.exists(this)){
_56f=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _56f;
};
Binding.prototype.attachClassName=function(_570){
CSSUtil.attachClassName(this.bindingElement,_570);
};
Binding.prototype.detachClassName=function(_571){
CSSUtil.detachClassName(this.bindingElement,_571);
};
Binding.prototype.hasClassName=function(_572){
return CSSUtil.hasClassName(this.bindingElement,_572);
};
Binding.prototype.addActionListener=function(type,_574){
_574=_574!=null?_574:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_574)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_574);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_574+")");
}
};
Binding.prototype.removeActionListener=function(type,_576){
_576=_576?_576:this;
if(Action.isValid(type)){
var _577=this.actionListeners[type];
if(_577){
var i=0,_579;
while((_579=_577[i])!=null){
if(_579==_576){
_577.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_57b){
_57b=_57b?_57b:this;
DOMEvents.addEventListener(this.bindingElement,type,_57b);
};
Binding.prototype.removeEventListener=function(type,_57d){
_57d=_57d?_57d:this;
DOMEvents.removeEventListener(this.bindingElement,type,_57d);
};
Binding.prototype.subscribe=function(_57e){
if(!this.hasSubscription(_57e)){
this._subscriptions.set(_57e,true);
EventBroadcaster.subscribe(_57e,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_57e);
}
};
Binding.prototype.unsubscribe=function(_57f){
if(this.hasSubscription(_57f)){
this._subscriptions.del(_57f);
EventBroadcaster.unsubscribe(_57f,this);
}
};
Binding.prototype.hasSubscription=function(_580){
return this._subscriptions.has(_580);
};
Binding.prototype.observe=function(_581,_582){
_581.addObserver(this,_582);
};
Binding.prototype.unObserve=function(_583,_584){
_583.removeObserver(this,_584);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _589={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_589);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_589);
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
var _58b=null;
var _58c=null;
var _58d=false;
if(arg instanceof Action){
_58b=arg;
}else{
if(Action.isValid(arg)){
_58b=new Action(this,arg);
_58d=true;
}
}
if(_58b!=null&&Action.isValid(_58b.type)==true){
if(_58b.isConsumed==true){
_58c=_58b;
}else{
var _58e=this.actionListeners[_58b.type];
if(_58e!=null){
_58b.listener=this;
var i=0,_590;
while((_590=_58e[i++])!=null){
if(_590&&_590.handleAction){
_590.handleAction(_58b);
}
}
}
var _591=true;
if(this.isBlockingActions==true){
switch(_58b.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_58d){
_591=false;
}
break;
}
}
if(_591){
_58c=this.migrateAction(_58b);
}else{
_58c=_58b;
}
}
}
return _58c;
};
Binding.prototype.migrateAction=function(_592){
var _593=null;
var _594=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_593&&node.nodeType!=Node.DOCUMENT_NODE){
_593=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_593){
_594=_593.dispatchAction(_592);
}else{
_594=_592;
}
}
return _594;
};
Binding.prototype.reflex=function(_596){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_596);
}
};
Binding.prototype.getMigrationParent=function(){
var _597=null;
if(true){
try{
var _598=this.bindingElement.parentNode;
if(_598!=null){
_597=_598;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_597=null;
}
}
return _597;
};
Binding.prototype.add=function(_599){
if(_599.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_599.bindingElement);
}else{
throw "Could not add "+_599.toString()+" of different document origin.";
}
return _599;
};
Binding.prototype.addFirst=function(_59a){
if(_59a.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_59a.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_59a.toString()+" of different document origin.";
}
return _59a;
};
Binding.prototype.getAncestorBindingByLocalName=function(_59b,_59c){
return BindingFinder.getAncestorBindingByLocalName(this,_59b,_59c);
};
Binding.prototype.getAncestorBindingByType=function(impl,_59e){
return BindingFinder.getAncestorBindingByType(this,impl,_59e);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_5a0){
return BindingFinder.getChildElementsByLocalName(this,_5a0);
};
Binding.prototype.getChildElementByLocalName=function(_5a1){
return this.getChildElementsByLocalName(_5a1).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_5a2){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_5a2));
};
Binding.prototype.getChildBindingsByLocalName=function(_5a3){
return this.getDescendantBindingsByLocalName(_5a3,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5a4){
return this.getChildBindingsByLocalName(_5a4).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5a5,_5a6){
return BindingFinder.getDescendantBindingsByLocalName(this,_5a5,_5a6);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5a7){
return this.getDescendantBindingsByLocalName(_5a7,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5aa){
return BindingFinder.getNextBindingByLocalName(this,_5aa);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5ab){
return BindingFinder.getPreviousBindingByLocalName(this,_5ab);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5ac){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5ac);
};
Binding.prototype.isFirstBinding=function(_5ad){
return (this.getOrdinalPosition(_5ad)==0);
};
Binding.prototype.isLastBinding=function(_5ae){
return DOMUtil.isLastElement(this.bindingElement,_5ae);
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
Binding.prototype.setCallBackArg=function(_5b0){
this.setProperty(Binding.CALLBACKARG,_5b0);
};
Binding.prototype.dispose=function(_5b1){
if(!this.isDisposed){
if(!_5b1){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5b2=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5b2){
if(Client.isExplorer){
_5b2.outerHTML="";
}else{
_5b2.parentNode.removeChild(_5b2);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5b5){
list.add(_5b5);
});
list.each(function(_5b6){
self.unsubscribe(_5b6);
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
Binding.prototype.wakeUp=function(_5b8,_5b9){
_5b9=_5b9?_5b9:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5b8!==undefined){
self[_5b8]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5b9);
},0);
}
};
Binding.prototype.handleCrawler=function(_5bb){
if(_5bb.response==null&&this.isLazy==true){
if(_5bb.id==DocumentCrawler.ID&&_5bb.mode==DocumentCrawler.MODE_REGISTER){
_5bb.response=NodeCrawler.NORMAL;
}else{
_5bb.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5bb.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5bb.id)){
_5bb.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5bb.response==null){
switch(_5bb.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5bb.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5bc){
var _5bd=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5bc);
return UserInterface.registerBinding(_5bd,Binding);
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
var _5be=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5be.each(function(_5bf){
DataBinding.expressions[_5bf.Key]=new RegExp(_5bf.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z and 0-9 are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9 and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5c0){
var _5c1=null;
var _5c2=_5c0.getAncestorBindingByLocalName("field");
if(_5c2&&_5c2 instanceof FieldBinding){
var desc=_5c2.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5c1=desc.getLabel();
}
}
return _5c1;
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
var _5c5=this.bindingWindow.DataManager;
_5c5.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5c7=this.bindingWindow.DataManager;
if(_5c7.getDataBinding(name)){
_5c7.unRegisterDataBinding(name);
}
_5c7.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5c8,arg){
RootBinding.superclass.handleBroadcast.call(this,_5c8,arg);
var _5ca=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5c8){
case _5ca:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5ca);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5cb){
var _5cc=_5cb?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5cb!=this.isActivated){
this.isActivated=_5cb;
this.dispatchAction(_5cc);
var _5cd=new List();
var self=this;
this._activationawares.each(function(_5cf){
if(_5cf.isActivationAware){
try{
if(_5cb){
if(!_5cf.isActivated){
_5cf.onActivate();
}
}else{
if(_5cf.isActivated){
_5cf.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5cd.add(_5cf);
}
}
});
_5cd.each(function(_5d0){
this._activationawares.del(_5d0);
});
_5cd.dispose();
}else{
var _5d1="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5d1);
}else{
this.logger.error(_5d1);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5d2,_5d3){
if(Interfaces.isImplemented(IActivationAware,_5d2,true)==true){
if(_5d3==false){
this._activationawares.del(_5d2);
}else{
this._activationawares.add(_5d2);
if(this.isActivated==true){
_5d2.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5d2+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5d4){
var _5d5=this.getMigrationParent();
if(_5d5!=null){
var root=_5d5.ownerDocument.body;
var _5d7=UserInterface.getBinding(root);
if(_5d7!=null){
_5d7.makeActivationAware(this,_5d4);
}
}
};
RootBinding.prototype.handleCrawler=function(_5d8){
RootBinding.superclass.handleCrawler.call(this,_5d8);
if(_5d8.type==NodeCrawler.TYPE_ASCENDING){
_5d8.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5d9=null;
if(this.bindingWindow.parent){
_5d9=this.bindingWindow.frameElement;
}
return _5d9;
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
var _5da=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5da.hasNext()){
var cell=_5da.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5dc){
var _5dd=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5dc.bindingElement);
_5dd=_5dc;
}else{
_5dd=MatrixBinding.superclass.add.call(this,_5dc);
}
return _5dd;
};
MatrixBinding.prototype.addFirst=function(_5de){
var _5df=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5e0=this.shadowTree[MatrixBinding.CENTER];
_5e0.insertBefore(_5de.bindingElement,_5e0.firstChild);
_5df=_5de;
}else{
_5df=MatrixBinding.superclass.addFirst.call(this,_5de);
}
return _5de;
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
MatrixBinding.newInstance=function(_5e2){
var _5e3=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5e2);
return UserInterface.registerBinding(_5e3,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5e4,_5e5){
var list=new List();
var _5e7=new FlexBoxCrawler();
_5e7.mode=_5e5?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5e7.startBinding=_5e4;
_5e7.crawl(_5e4.bindingElement,list);
list.each(function(_5e8){
_5e8.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5e9){
if(Binding.exists(_5e9)){
_5e9.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5ea){
if(Binding.exists(_5ea)){
_5ea.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5e7.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5eb){
FlexBoxBinding.superclass.handleAction.call(this,_5eb);
switch(_5eb.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5ec){
var _5ed=0;
var _5ee=new List(this.bindingElement.parentNode.childNodes);
while(_5ee.hasNext()){
var _5ef=_5ee.getNext();
if(_5ef.nodeType==Node.ELEMENT_NODE&&_5ef!=this.bindingElement){
if(!this._isOutOfFlow(_5ef)){
var rect=_5ef.getBoundingClientRect();
if(_5ec){
height+=(rect.right-rect.left);
}else{
_5ed+=(rect.bottom-rect.top);
}
}
}
}
return _5ed;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5f1){
var _5f2=CSSComputer.getPosition(_5f1);
var _5f3=CSSComputer.getFloat(_5f1);
return (_5f2=="absolute"||_5f3!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5f4=this.bindingElement.parentNode;
var rect=_5f4.getBoundingClientRect();
var _5f6=rect.bottom-rect.top;
var _5f7=CSSComputer.getPadding(_5f4);
var _5f8=CSSComputer.getBorder(_5f4);
_5f6-=(_5f7.top+_5f7.bottom);
_5f6-=(_5f8.top+_5f8.bottom);
return _5f6;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5f9=this.bindingElement.parentNode;
var rect=_5f9.getBoundingClientRect();
var _5fb=rect.right-rect.left;
var _5fc=CSSComputer.getPadding(_5f9);
var _5fd=CSSComputer.getBorder(_5f9);
_5fb-=(_5fc.left+_5fc.right);
_5fb-=(_5fd.left+_5fd.right);
return _5fb;
};
FlexBoxBinding.prototype.setFlexibility=function(_5fe){
if(_5fe!=this.isFlexible){
if(_5fe){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_5fe;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _5ff=this._getSiblingsSpan();
_5ff=this._getCalculatedHeight()-_5ff;
if(!isNaN(_5ff)&&_5ff>=0){
if(_5ff!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_5ff)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_600){
if(!this.isFit||_600){
var _601=0;
new List(this.bindingElement.childNodes).each(function(_602){
if(_602.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_602)){
var rect=_602.getBoundingClientRect();
_601+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_601);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_604){
var _605=CSSComputer.getPadding(this.bindingElement);
var _606=CSSComputer.getBorder(this.bindingElement);
_604+=_605.top+_605.bottom;
_604+=_606.top+_606.bottom;
this.bindingElement.style.height=_604+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_607){
ScrollBoxBinding.superclass.handleAction.call(this,_607);
switch(_607.type){
case BalloonBinding.ACTION_INITIALIZE:
_607.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_608){
this.bindingElement.scrollLeft=_608.x;
this.bindingElement.scrollTop=_608.y;
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
var _609=this._getBuildElement("labeltext");
if(_609){
this.shadowTree.labelText=_609;
this.shadowTree.text=_609.firstChild;
this.hasLabel=true;
}
}else{
var _60a=this.getProperty("label");
var _60b=this.getProperty("image");
var _60c=this.getProperty("tooltip");
if(_60a){
this.setLabel(_60a,false);
}
if(_60b){
this.setImage(_60b,false);
}
if(_60c){
this.setToolTip(_60c);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_60d,_60e){
_60d=_60d?_60d:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_60d);
this.setProperty("label",_60d);
if(!_60e){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_610){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_610){
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
this.shadowTree.labelBody.style.backgroundImage="url("+url+")";
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
LabelBinding.prototype.setToolTip=function(_613){
this.setProperty("tooltip",_613);
if(_613!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_613));
}
};
LabelBinding.prototype.getToolTip=function(_614){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_615){
_615=_615==null?true:_615;
var _616=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_615;
if(_615){
this.attachClassName(_616);
}else{
this.detachClassName(_616);
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
var _617="textonly";
var _618="imageonly";
var _619="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_617);
this.detachClassName(_618);
this.attachClassName(_619);
}else{
if(this.hasLabel){
this.detachClassName(_619);
this.detachClassName(_618);
this.attachClassName(_617);
}else{
if(this.hasImage){
this.detachClassName(_619);
this.detachClassName(_617);
this.attachClassName(_618);
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
LabelBinding.newInstance=function(_61a){
var _61b=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_61a);
return UserInterface.registerBinding(_61b,LabelBinding);
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
var _61c=this.getProperty("label");
if(!_61c){
_61c=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_61c));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_61e){
this.setProperty("label",_61e);
};
TextBinding.newInstance=function(_61f){
var _620=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_61f);
return UserInterface.registerBinding(_620,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_621,_622){
BroadcasterBinding.superclass.setProperty.call(this,_621,_622);
function update(list){
if(list){
list.each(function(_624){
_624.setProperty(_621,_622);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _625=this._observers[_621];
if(_625){
update(_625);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_626){
BroadcasterBinding.superclass.deleteProperty.call(this,_626);
function update(list){
if(list){
list.each(function(_628){
_628.deleteProperty(_626);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _629=this._observers[_626];
if(_629){
update(_629);
}
};
BroadcasterBinding.prototype.addObserver=function(_62a,_62b){
_62b=_62b?_62b:"*";
_62b=new List(_62b.split(" "));
while(_62b.hasNext()){
var _62c=_62b.getNext();
switch(_62c){
case "*":
this._setAllProperties(_62a);
break;
default:
var _62d=this.getProperty(_62c);
_62a.setProperty(_62c,_62d);
break;
}
if(!this._observers[_62c]){
this._observers[_62c]=new List();
}
this._observers[_62c].add(_62a);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_62e){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _631=att.nodeName;
switch(_631){
case "id":
case "key":
break;
default:
var _632=this.getProperty(_631);
_62e.setProperty(_631,_632);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_633,_634){
_634=_634?_634:"*";
_634=new List(_634.split(" "));
while(_634.hasNext()){
var list=this._observers[_634.getNext()];
if(list){
while(list.hasNext()){
var _636=list.getNext();
if(_636==_633){
list.del(_636);
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
BroadcasterBinding.prototype.setDisabled=function(_637){
this.setProperty("isdisabled",_637);
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
var _639=this.getProperty("width");
var _63a=this.getProperty("label");
var type=this.getProperty("type");
var _63c=this.getProperty("popup");
var _63d=this.getProperty("tooltip");
var _63e=this.getProperty("isdisabled");
var _63f=this.getProperty("response");
var _640=this.getProperty("oncommand");
var _641=this.getProperty("value");
var _642=this.getProperty("ischecked");
var _643=this.getProperty("callbackid");
var _644=this.getProperty("focusable");
var _645=this.getProperty("focused");
var _646=this.getProperty("default");
var url=this.getProperty("url");
var _648=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_648){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_63a!=null){
this.setLabel(_63a);
}
if(type!=null){
this.setType(type);
}
if(_63d!=null){
this.setToolTip(_63d);
}
if(_639!=null){
this.setWidth(_639);
}
if(_63c!=null){
this.setPopup(_63c);
}
if(_63f!=null){
this.response=_63f;
}
if(_642==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_640!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_640,this);
};
}
if(_644||this.isFocusable){
this._makeFocusable();
if(_646||this.isDefault){
this.isDefault=true;
}
if(_645){
this.focus();
}
}
if(_63e==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_643!=null){
this.bindingWindow.DataManager.registerDataBinding(_643,this);
if(_641!=null){
Binding.dotnetify(this,_641);
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
ButtonBinding.prototype.setImage=function(_649){
if(this.isAttached){
this.labelBinding.setImage(_649);
}
this.setProperty("image",_649);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_64a){
if(this.isAttached){
this.labelBinding.setLabel(_64a);
}
this.setProperty("label",_64a);
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
ButtonBinding.prototype.setToolTip=function(_64c){
this.setProperty("tooltip",_64c);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_64c));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_64d){
this.imageProfile=new _64d(this);
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
ButtonBinding.prototype.flip=function(_652){
_652=_652==null?true:_652;
this.isFlipped=_652;
this.setProperty("flip",_652);
if(this.isAttached){
this.labelBinding.flip(_652);
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
ButtonBinding.prototype.check=function(_653){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_653==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_654){
this.isActive=true;
this.isChecked=true;
if(!_654){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_655){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_655==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_656){
this.isActive=false;
this.isChecked=false;
if(!_656){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_657,_658){
if(_657==null){
_657==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_657){
case true:
this.check(_658);
break;
case false:
this.uncheck(_658);
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
var _65a=this.getProperty("tooltip");
if(_65a){
this.setToolTip(_65a);
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
var _65b=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_65b=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _65b;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _65d=this.getEqualSizeWidth();
if(goal>_65d){
var diff=goal-_65d;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _660=null;
if(this.isAttached==true){
var _661=CSSComputer.getPadding(this.bindingElement);
var _662=CSSComputer.getPadding(this.bindingElement);
_660=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_660=_660+_661.left+_661.right;
_660=_660+_662.left+_662.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _660;
};
ButtonBinding.prototype.setWidth=function(_663){
if(this.isAttached==true){
var _664=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _665=CSSComputer.getPadding(this.shadowTree.c);
var _666=_663-_664;
_666=_666-_665.left-_665.right;
this.shadowTree.c.style.width=String(_666)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_666-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_663);
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
ButtonBinding.prototype.setValue=function(_667){
this.shadowTree.dotnetinput.value=_667;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_668){
this.setValue(_668);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_669){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_669;
this.imageProfile=_669.imageProfile;
this.assignDOMEvents(true);
}
ButtonStateManager.prototype.assignDOMEvents=function(_66a){
var _66b=_66a?"addEventListener":"removeEventListener";
this.binding[_66b](DOMEvents.MOUSEENTER,this);
this.binding[_66b](DOMEvents.MOUSELEAVE,this);
this.binding[_66b](DOMEvents.MOUSEDOWN,this);
this.binding[_66b](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _66d=false,_66e=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_66e=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_66e=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_66e=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_66e=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_66e==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_66d=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_66e=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_66e=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_66e=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_66e=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_66e==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_66d=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_66e=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_66e=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_66e=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_66e=ButtonStateManager.STATE_NORMAL;
_66d=true;
break;
}
}
}
}
switch(_66e){
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
if(_66d){
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
var _672=this.imageProfile.getDisabledImage();
if(_672){
this.binding.setImage(_672);
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
ClickButtonBinding.newInstance=function(_673){
var _674=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_673);
return UserInterface.registerBinding(_674,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_675){
var _676=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_675);
return UserInterface.registerBinding(_676,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_677){
var _678=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_677);
return UserInterface.registerBinding(_678,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_679){
this._binding=_679;
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
var _67a=this.getDescendantBindingsByLocalName("control");
_67a.each(function(_67b){
_67b.setControlType(_67b.controlType);
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
ControlGroupBinding.newInstance=function(_67d){
var _67e=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_67d);
return UserInterface.registerBinding(_67e,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_681){
ControlBinding.superclass.handleAction.call(this,_681);
switch(_681.type){
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
function ControlImageProfile(_682){
this.binding=_682;
}
ControlImageProfile.prototype._getImage=function(_683){
var _684=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_684=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_684=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_684=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_684=this.constructor.IMAGE_CLOSE;
break;
}
return _684.replace("${string}",_683);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _685=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_685=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _685?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_686){
ControlBoxBinding.superclass.handleAction.call(this,_686);
switch(_686.type){
case ControlBinding.ACTION_COMMAND:
var _687=_686.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_687);
Application.unlock(self);
},0);
_686.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_689){
switch(_689.controlType){
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
ControlBoxBinding.prototype.setState=function(_68a){
var _68b=this.getState();
this.setProperty("state",_68a);
this.detachClassName(_68b);
this.attachClassName(_68a);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _68c=this.getProperty("state");
if(!_68c){
_68c=ControlBoxBinding.STATE_NORMAL;
}
return _68c;
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
MenuContainerBinding.prototype.isOpen=function(_68d){
var _68e=null;
if(!_68d){
_68e=this._isOpen;
}else{
_68e=(_68d==this._openElement);
}
return _68e;
};
MenuContainerBinding.prototype.setOpenElement=function(_68f){
if(_68f){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_68f;
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
var _690=this.getChildBindingByLocalName("menupopup");
if(_690&&_690!=this.menuPopupBinding){
this.menuPopupBinding=_690;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _691=this.getMenuContainerBinding();
_691.setOpenElement(this);
var _692=this.getMenuPopupBinding();
_692.snapTo(this.bindingElement);
_692.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_693){
MenuContainerBinding.superclass.handleAction.call(this,_693);
if(_693.type==PopupBinding.ACTION_HIDE){
var _694=this.getMenuContainerBinding();
_694.setOpenElement(false);
this.reset();
_693.consume();
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
MenuBarBinding.prototype.handleAction=function(_695){
MenuBarBinding.superclass.handleAction.call(this,_695);
switch(_695.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _696=_695.target;
var _697=this.getChildBindingsByLocalName("menu");
while(_697.hasNext()){
var menu=_697.getNext();
}
switch(_696.arrowKey){
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
var _699=this.getProperty("image");
var _69a=this.getProperty("label");
var _69b=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_69a){
this.setLabel(_69a);
}
if(_699){
this.setImage(_699);
}
if(_69b){
this.setToolTip(_69b);
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
MenuBinding.prototype.setLabel=function(_69d){
this.setProperty("label",_69d);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_69d));
}
};
MenuBinding.prototype.setToolTip=function(_69e){
this.setProperty("tooltip",_69e);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_69e));
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
var _6a0=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_6a0.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_6a0.isOpen()&&!_6a0.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_6a0.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_6a0.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_6a1,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_6a1){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6a6){
switch(_6a6.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6a7=null;
var _6a8=true;
self._lastFocused.focus();
self.grabKeyboard();
_6a6.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6aa){
for(var key in this._focused){
if(key!=_6aa.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6aa.key]=_6aa;
this._lastFocused=_6aa;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6ad){
delete this._focused[_6ad.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6ae){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6ae);
}
if(_6ae){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6b1=this.getChildBindingsByLocalName("menugroup");
var _6b2=null;
var _6b3=null;
while(_6b1.hasNext()){
var _6b4=_6b1.getNext();
if(!_6b4.isDefaultContent){
_6b4.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6b2&&_6b4.isVisible){
_6b2=_6b4;
}
if(_6b4.isVisible){
_6b3=_6b4;
}
}
}
if(_6b2&&_6b3){
_6b2.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6b3.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6b5){
MenuBodyBinding.activeInstance=this;
if(_6b5){
var _6b6=this._getMenuItems().getFirst();
if(_6b6){
_6b6.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6b7=this._lastFocused;
if((_6b7!=null)&&(!_6b7.isMenuContainer)){
_6b7.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6b9=this._getMenuItems();
var _6ba=null;
var next=null;
if(this._lastFocused){
_6ba=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6b9.getPreceding(_6ba);
break;
case KeyEventCodes.VK_DOWN:
next=_6b9.getFollowing(_6ba);
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
next=_6b9.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6bd=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6be){
_6bd=_6be.getChildBindingsByLocalName("menuitem");
_6bd.each(function(item){
list.add(item);
});
});
_6bd=this.getChildBindingsByLocalName("menuitem");
_6bd.each(function(item){
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
MenuBodyBinding.newInstance=function(_6c2){
var _6c3=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6c2);
return UserInterface.registerBinding(_6c3,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6c4){
switch(_6c4){
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
MenuGroupBinding.newInstance=function(_6c5){
var _6c6=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6c5);
return UserInterface.registerBinding(_6c6,MenuGroupBinding);
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
var _6c7=this.getProperty("image");
var _6c8=this.getProperty("image-hover");
var _6c9=this.getProperty("image-active");
var _6ca=this.getProperty("image-disabled");
if(!this.image&&_6c7){
this.image=_6c7;
}
if(!this.imageHover&&_6c8){
this.imageHover=_6c7;
}
if(!this.imageActive&&_6c9){
this.imageActive=_6c9;
}
if(!this.imageDisabled&&_6ca){
this.imageDisabled=_6ca;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6cb=this.getProperty("label");
var _6cc=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6ce=this.getProperty("isdisabled");
var _6cf=this.getProperty("image");
var _6d0=this.getProperty("image-hover");
var _6d1=this.getProperty("image-active");
var _6d2=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6d3=this.getMenuPopupBinding();
if(_6d3){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6cf){
this.image=_6cf;
}
if(!this.imageHover&&_6d0){
this.imageHover=_6cf;
}
if(!this.imageActive&&_6d1){
this.imageActive=_6d1;
}
if(!this.imageDisabled&&_6d2){
this.imageDisabled=_6d2;
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
if(_6cb){
this.setLabel(_6cb);
}
if(_6cc){
this.setToolTip(_6cc);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6ce==true){
this.disable();
}
var _6d4=this.getProperty("oncommand");
if(_6d4){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6d4);
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
MenuItemBinding.prototype.setLabel=function(_6d7){
this.setProperty("label",_6d7);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6d7));
}
};
MenuItemBinding.prototype.setToolTip=function(_6d8){
this.setProperty("tooltip",_6d8);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6d8));
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
var _6da=this.bindingDocument.createElement("div");
_6da.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6da.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6db=this.labelBinding.bindingElement;
_6db.insertBefore(_6da,_6db.firstChild);
_6da.style.display="none";
this.shadowTree.checkBoxIndicator=_6da;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6da=this.bindingDocument.createElement("div");
_6da.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6da.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6db=this.labelBinding.bindingElement;
_6db.insertBefore(_6da,_6db.firstChild);
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
var _6dd=this.imageProfile.getDisabledImage();
if(_6dd){
this.setImage(_6dd);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6dd=this.imageProfile.getDefaultImage();
if(_6dd){
this.setImage(_6dd);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6df=this.getMenuContainerBinding();
if(_6df.isOpen()&&!_6df.isOpen(this)){
_6df._openElement.hide();
_6df.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6df=this.getMenuContainerBinding();
if(!_6df.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6e1){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6e2=this.getMenuContainerBinding();
if(!_6e2||!_6e2.isOpen(this)||_6e1){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6e3){
this.setChecked(true,_6e3);
};
MenuItemBinding.prototype.uncheck=function(_6e4){
this.setChecked(false,_6e4);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6e5,_6e6){
this.setProperty("ischecked",_6e5);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6e5){
this.isChecked=_6e5;
this.shadowTree.checkBoxIndicator.style.display=_6e5?"block":"none";
if(!_6e6){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6e7){
var _6e8=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6e7);
UserInterface.registerBinding(_6e8,MenuItemBinding);
return UserInterface.getBinding(_6e8);
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
PopupBinding.handleBroadcast=function(_6e9,arg){
switch(_6e9){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6ed=PopupBinding.activeInstances.get(key);
var _6ee=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6ed);
if(!_6ee){
list.add(_6ed);
}
});
list.each(function(_6ef){
_6ef.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6f1=PopupBinding.activeInstances.get(key);
_6f1.hide();
});
}
break;
}
};
EventBroadcaster.subscribe(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,PopupBinding);
EventBroadcaster.subscribe(BroadcastMessages.MOUSEEVENT_MOUSEUP,PopupBinding);
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
var _6f2=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6f3=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6f2){
this._bodyBinding=UserInterface.getBinding(_6f2);
}else{
if(_6f3){
this._bodyBinding=UserInterface.getBinding(_6f3);
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
var _6f4=this.getProperty("position");
this.position=_6f4?_6f4:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_6f5){
var _6f6=null;
if(this._bodyBinding){
this._bodyBinding.add(_6f5);
_6f6=_6f5;
}else{
_6f6=PopupBinding.superclass.add.call(this,_6f5);
}
return _6f6;
};
PopupBinding.prototype.addFirst=function(_6f7){
var _6f8=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6f7);
_6f8=_6f7;
}else{
_6f8=PopupBinding.superclass.addFirst.call(this,_6f7);
}
return _6f8;
};
PopupBinding.prototype.handleAction=function(_6f9){
PopupBinding.superclass.handleAction.call(this,_6f9);
var _6fa=_6f9.target;
switch(_6f9.type){
case Binding.ACTION_ATTACHED:
if(_6fa instanceof MenuItemBinding){
this._count(true);
_6f9.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_6fa instanceof MenuItemBinding){
this._count(false);
_6f9.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_6fb){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_6fb?1:-1);
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
PopupBinding.prototype.snapTo=function(_6fc){
var _6fd=this._getElementPosition(_6fc);
switch(this.position){
case PopupBinding.POSITION_TOP:
_6fd.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_6fd.x+=_6fc.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_6fd.y+=_6fc.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_6fd.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_6fc;
this.bindingElement.style.display="block";
this.setPosition(_6fd.x,_6fd.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_6ff){
this.bindingElement.style.display="block";
this.setPosition(_6ff.x,_6ff.y);
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
PopupBinding.prototype._getElementPosition=function(_704){
return _704.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_704):DOMUtil.getUniversalPosition(_704);
};
PopupBinding.prototype._getMousePosition=function(e){
var _706=DOMEvents.getTarget(e);
return _706.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_707){
var _708=this.bindingElement;
if(_707){
if(Client.hasTransitions){
_708.style.visibility="visible";
_708.style.opacity="1";
}else{
_708.style.visibility="visible";
}
}else{
_708.style.visibility="hidden";
_708.style.display="none";
if(Client.hasTransitions){
_708.style.opacity="0";
}
}
this.isVisible=_707;
};
PopupBinding.prototype._enableTab=function(_709){
var self=this;
var _70b=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_70b.each(function(_70c){
_70c.bindingElement.tabIndex=_709?0:-1;
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
var pos=this.boxObject.getUniversalPosition();
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
PopupBinding.prototype.grabKeyboard=function(_715){
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
var _71b=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_71b=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _71b;
};
PopupBinding.prototype.clear=function(){
var _71c=this._bodyBinding;
if(_71c){
_71c.detachRecursive();
_71c.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_71d){
var _71e=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_71d);
return UserInterface.registerBinding(_71e,PopupBinding);
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
PopupBodyBinding.newInstance=function(_720){
var _721=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_720);
return UserInterface.registerBinding(_721,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_722){
return new Point(_722.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_723){
var _724=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_723);
return UserInterface.registerBinding(_724,MenuPopupBinding);
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
var _725=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_725){
this._body=UserInterface.getBinding(_725);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _726=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_726.hasNext()){
var _727=DialogBorderBinding.newInstance(this.bindingDocument);
_727.setType(_726.getNext());
this.add(_727);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _728=this.getProperty("controls");
if(_728){
var _729=new List(_728.split(" "));
while(_729.hasNext()){
var type=_729.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _72b=DialogControlBinding.newInstance(this.bindingDocument);
_72b.setControlType(type);
this._titlebar.addControl(_72b);
this.controlBindings[type]=_72b;
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
var _72c=this.getProperty("image");
var _72d=this.getProperty("label");
var _72e=this.getProperty("draggable");
var _72f=this.getProperty("resizable");
var _730=this.getProperty("modal");
if(_72c){
this.setImage(_72c);
}
if(_72d){
this.setLabel(_72d);
}
if(_72e==false){
this.isDialogDraggable=false;
}
if(_72f==false){
this.isPanelResizable=false;
}
if(_730==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_731){
this.isModal=_731;
};
DialogBinding.prototype.setLabel=function(_732){
this.setProperty("label",_732);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_732));
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
DialogBinding.prototype.handleAction=function(_734){
DialogBinding.superclass.handleAction.call(this,_734);
switch(_734.type){
case Binding.ACTION_DRAG:
var _735=_734.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_735.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_735.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_735;
_735.dragger.registerHandler(this);
}
break;
}
}
_734.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_734.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_736,arg){
DialogBinding.superclass.handleBroadcast.call(this,_736,arg);
switch(_736){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_738){
DialogBinding.superclass.handleInvokedControl.call(this,_738);
switch(_738.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_739){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_739){
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
var _73b=self.bindingElement;
setTimeout(function(){
_73b.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_73c){
this.bindingElement.style.zIndex=new String(_73c);
};
DialogBinding.prototype.onDragStart=function(_73d){
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
DialogBinding.prototype.setResizable=function(_74f){
if(this._isResizable!=_74f){
if(_74f){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_74f;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _750=null;
var _751=this.bindingDocument.body.offsetWidth;
var _752=this.bindingDocument.body.offsetHeight;
_750={x:0.125*_751,y:0.125*_752,w:0.75*_751,h:0.5*_752};
return _750;
};
DialogBinding.prototype.centerOnScreen=function(){
var _753=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_753.w-dim.w),0.5*(_753.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _755=this;
var i=0;
function blink(){
if(i%2==0){
_755.detachClassName("active");
}else{
_755.attachClassName("active");
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
var _759="";
while(list.hasNext()){
var type=list.getNext();
_759+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_759);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_75a){
var _75b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_75a);
return UserInterface.registerBinding(_75b,DialogBinding);
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
DialogHeadBinding.newInstance=function(_75c){
var _75d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_75c);
return UserInterface.registerBinding(_75d,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_760){
var _761=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_760);
return UserInterface.registerBinding(_761,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_762){
var _763=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_762);
return UserInterface.registerBinding(_763,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_764){
DialogSetBinding.superclass.handleAction.call(this,_764);
var _765=_764.target;
switch(_764.type){
case Binding.ACTION_MOVETOTOP:
if(_765 instanceof DialogBinding){
this._moveToTop(_765);
}
break;
case Binding.ACTION_MOVEDONTOP:
_764.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_766){
var _767=0;
var _768=this.getChildBindingsByLocalName("dialog");
_768.each(function(_769){
var _76a=_769.getZIndex();
_767=_76a>_767?_76a:_767;
});
_766.setZIndex(_767+2);
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
DialogBorderBinding.newInstance=function(_76c){
var _76d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_76c);
return UserInterface.registerBinding(_76d,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_76e){
this._dialogBinding=_76e;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_770){
DialogCoverBinding.superclass.handleAction.call(this,_770);
var _771=_770.target;
if(this._dialogBinding.isModal){
switch(_770.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_771==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_771.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_772,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_772,arg);
switch(_772){
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
var _775=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_775);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _776=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_776);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_777){
var _778=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_777);
return UserInterface.registerBinding(_778,DialogCoverBinding);
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
var _779=this.getProperty("image");
if(_779){
this.setImage(_779);
}
var _77a=this.getProperty("label");
if(_77a){
this.setLabel(_77a);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_77b){
if(this.isAttached){
this.labelBinding.setLabel(_77b);
}
this.setProperty("label",_77b);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_77d){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_77d);
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
DialogTitleBarBinding.newInstance=function(_77e){
var _77f=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_77e);
return UserInterface.registerBinding(_77f,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_780){
var _781=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_780);
return UserInterface.registerBinding(_781,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_782){
var _783=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_782);
return UserInterface.registerBinding(_783,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_784){
this.binding=_784;
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
var _787=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _788=node.nodeName.toLowerCase();
switch(_788){
case "script":
case "style":
case "textarea":
_787=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _787;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _78f=true;
if(exp.test(text)){
self._textnodes.add(node);
_78f=false;
}
return _78f;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_790,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_790,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _794=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_794+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_79a){
var _79b="";
var _79c="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _79d="</span>";
var self=this;
function iterate(_79f){
var _7a0=-1;
var _7a1=null;
self._map.each(function(key,exp){
var low=_79f.toLowerCase();
var _7a5=low.search(exp);
if(_7a5>-1){
if(_7a0==-1){
_7a0=_7a5;
}
if(_7a5<=_7a0){
_7a0=_7a5;
_7a1=key;
}
}
});
if(_7a0>-1&&_7a1!=null){
var pre=_79f.substring(0,_7a0);
var hit=_79f.substring(_7a0,_7a0+_7a1.length);
var pst=_79f.substring(_7a0+_7a1.length,_79f.length);
_79b+=pre+_79c+hit+_79d;
iterate(pst);
}else{
_79b+=_79f;
}
}
iterate(_79a);
return _79b;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7a9){
var _7aa=new List(_7a9.getElementsByTagName("span"));
_7aa.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7a9.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7ad){
var _7ae=null;
if(_7ad.isAttached){
var doc=_7ad.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7ae=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7ae instanceof SOAPFault){
_7ae=null;
}
}
}
return _7ae;
};
WindowBinding.highlightKeywords=function(_7b2,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7b2.isAttached){
var doc=_7b2.getContentDocument();
if(doc!=null){
var _7b5=WindowBinding._highlightcrawler;
_7b5.reset(doc.body);
if(list!=null){
_7b5.setKeys(list);
_7b5.crawl(doc.body);
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
var _7b6=WindowBinding.superclass.serialize.call(this);
if(_7b6){
_7b6.url=this.getURL();
}
return _7b6;
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
var _7b8=this.getContentWindow().DocumentManager;
if(_7b8!=null){
_7b8.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7b9){
WindowBinding.superclass.handleAction.call(this,_7b9);
var _7ba=_7b9.target;
switch(_7b9.type){
case RootBinding.ACTION_PHASE_3:
if(_7ba.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7ba);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7b9.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7bb){
if(!this.isFit||_7bb){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7bc){
if(this._pageBinding==null){
if(_7bc.bindingWindow==this.getContentWindow()){
this._pageBinding=_7bc;
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
WindowBinding.prototype._registerOnloadListener=function(_7bd){
var _7be=this.shadowTree.iframe;
var _7bf=_7bd?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7c2=true;
if(Client.isExplorer){
_7c2=_7be.readyState=="complete";
}
if(_7c2==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7bf](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7c3){
var _7c4=_7c3?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7c4](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7c8=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7c8=url;
}
return _7c8;
};
WindowBinding.prototype.reload=function(_7ca){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7cb=null;
if(this.shadowTree.iframe!=null){
_7cb=this.shadowTree.iframe;
}
return _7cb;
};
WindowBinding.prototype.getContentWindow=function(){
var _7cc=null,_7cd=this.getFrameElement();
if(_7cd!==null){
try{
_7cc=_7cd.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7cc;
};
WindowBinding.prototype.getContentDocument=function(){
var _7ce=null,win=this.getContentWindow();
if(win){
_7ce=win.document;
}
return _7ce;
};
WindowBinding.prototype.getRootBinding=function(){
var _7d0=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7d0=UserInterface.getBinding(doc.body);
}
return _7d0;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7d2){
this.bindingElement.style.height=_7d2+"px";
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
WindowBinding.prototype.handleCrawler=function(_7d3){
WindowBinding.superclass.handleCrawler.call(this,_7d3);
if(_7d3.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7d3.nextNode=root.bindingElement;
}else{
_7d3.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7d8){
var _7d9=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7d8);
var _7da=UserInterface.registerBinding(_7d9,WindowBinding);
return _7da;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7de){
_7de.target.show();
_7de.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7e0){
_7e0.target.show();
_7e0.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7e2){
PreviewWindowBinding.superclass.handleAction.call(this,_7e2);
switch(_7e2.type){
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
var _7e3=null;
this._getRadioButtonBindings().each(function(_7e4){
if(_7e4.getProperty("ischecked")){
_7e3=_7e4;
return false;
}else{
return true;
}
});
if(_7e3){
this._checkedRadioBinding=_7e3;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7e5){
RadioGroupBinding.superclass.handleAction.call(this,_7e5);
var _7e6=_7e5.target;
switch(_7e5.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7e5.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7e6.isRadioButton&&!_7e6.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7e6);
}
this._checkedRadioBinding=_7e6;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7e5.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7e7,_7e8){
if(_7e7 instanceof RadioDataBinding){
_7e7=_7e7.getButton();
}
if(_7e7.isRadioButton){
switch(_7e8){
case true:
this._unCheckRadioBindingsExcept(_7e7);
this._checkedRadioBinding=_7e7;
_7e7.check(true);
break;
default:
_7e7.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7e9){
var _7ea=this._getRadioButtonBindings();
_7ea.each(function(_7eb){
if(_7eb.isChecked&&_7eb!=_7e9){
_7eb.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7ec=new Crawler();
var list=new List();
_7ec.addFilter(function(_7ee){
var _7ef=true;
var _7f0=UserInterface.getBinding(_7ee);
if(_7f0 instanceof RadioGroupBinding){
_7ef=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7f0 instanceof ButtonBinding&&_7f0.isRadioButton){
list.add(_7f0);
}
}
return _7ef;
});
_7ec.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7f1){
var _7f2=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7f1);
return UserInterface.registerBinding(_7f2,RadioGroupBinding);
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
var _7f4=this.getProperty("regexrule");
if(_7f4!=null){
this.expression=new RegExp(_7f4);
}
var _7f5=this.getProperty("onbindingblur");
if(_7f5!=null){
this.onblur=function(){
Binding.evaluate(_7f5,this);
};
}
var _7f6=this.getProperty("onvaluechange");
if(_7f6!=null){
this.onValueChange=function(){
Binding.evaluate(_7f6,this);
};
}
if(this.error==null&&this.type!=null){
var _7f7=DataBinding.errors[this.type];
if(_7f7!=null){
this.error=_7f7;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7f8=this.getProperty("value");
if(_7f8!=null){
this.setValue(String(_7f8));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _7fa=this.getProperty("isdisabled");
if(_7fa==true){
this.setDisabled(true);
}
var _7fb=this.getProperty("readonly");
if(_7fb==true){
this.setReadOnly(true);
}
var _7fc=this.getProperty("autoselect");
if(_7fc==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
this.shadowTree.input.setAttribute("spellcheck","false");
if(this.hasCallBackID()){
}else{
if(this._isAutoPost){
this.logger.warn("Autopost "+this.toString()+" without a callbackid?");
}
}
};
DataInputBinding.prototype._getInputElement=function(){
var _7fd=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_7fd.type=this.isPassword==true?"password":"text";
_7fd.tabIndex=-1;
return _7fd;
};
DataInputBinding.prototype._attachDOMEvents=function(){
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.FOCUS,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.BLUR,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.KEYDOWN,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.KEYPRESS,this);
};
DataInputBinding.prototype.handleEvent=function(e){
DataInputBinding.superclass.handleEvent.call(this,e);
if(this.isFocusable==true){
switch(e.type){
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
DataInputBinding.prototype._handleFocusAndBlur=function(_800){
if(_800){
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
DataInputBinding.prototype.handleBroadcast=function(_803,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_803,arg);
var self=this;
switch(_803){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _806=DOMEvents.getTarget(arg);
if(_806!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_807){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_807){
var self=this,_809=this.bindingElement,_80a={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_809,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_809,DOMEvents.MOUSEUP,_80a);
}else{
this.select();
}
}
this.onfocus();
if(!_807){
var _80b=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_80b);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _80c=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _80d=_80c.createTextRange();
_80d.moveStart("character",0);
_80d.moveEnd("character",_80c.value.length);
_80d.select();
}else{
_80c.setSelectionRange(0,_80c.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_80e){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_80e){
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
DataInputBinding.prototype.validate=function(_812){
if(_812==true||this._isValid){
var _813=this.isValid();
if(_813!=this._isValid){
this._isValid=_813;
if(!_813){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _814=null;
if(this._isInvalidBecauseRequired==true){
_814=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_814=DataBinding.warnings["minlength"];
_814=_814.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_814=DataBinding.warnings["maxlength"];
_814=_814.replace("${count}",String(this.maxlength));
}else{
_814=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_814!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_814);
}else{
alert(_814);
}
}else{
this.setValue(_814);
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
var _815=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _816=this.getValue();
if(_816==""){
if(this.isRequired==true){
_815=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _817=DataBinding.expressions[this.type];
if(!_817.test(_816)){
_815=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_816)){
_815=false;
}
}
}
}
if(_815&&this.minlength!=null){
if(_816.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_815=false;
}
}
if(_815&&this.maxlength!=null){
if(_816.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_815=false;
}
}
return _815;
};
DataInputBinding.prototype.setDisabled=function(_818){
if(_818!=this.isDisabled){
if(_818){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _819=this.shadowTree.input;
if(_818){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_819,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_819,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_818;
this.shadowTree.input.unselectable=_818?"on":"off";
}
this.isDisabled=_818;
this.isFocusable=!_818;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_81b){
if(_81b!=this.isReadOnly){
if(_81b){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_81b;
this.isReadOnly=_81b;
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
DataInputBinding.prototype.handleElement=function(_81c){
return true;
};
DataInputBinding.prototype.updateElement=function(_81d){
var _81e=_81d.getAttribute("value");
var _81f=_81d.getAttribute("type");
var _820=_81d.getAttribute("maxlength");
var _821=_81d.getAttribute("minlength");
if(_81e==null){
_81e="";
}
var _822=this.bindingWindow.UpdateManager;
if(this.getValue()!=_81e){
_822.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_81e);
}
if(this.type!=_81f){
_822.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_81f;
}
if(this.maxlength!=_820){
_822.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_820;
}
if(this.minlength!=_821){
_822.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_821;
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
DataInputBinding.prototype.setValue=function(_823){
if(_823===null){
_823="";
}
if(_823!=this.getValue()){
this.setProperty("value",_823);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_823);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _824=null;
if(this.shadowTree.input!=null){
_824=this.shadowTree.input.value;
}else{
_824=this.getProperty("value");
}
return _824;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _826=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_826=Number(_826);
break;
}
return _826;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_827){
var _828=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_827);
return UserInterface.registerBinding(_828,DataInputBinding);
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
var _829=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_829!=null){
this.setValue(_829.value);
_829.parentNode.removeChild(_829);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
this.shadowTree.input.setAttribute("spellcheck","false");
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _82a=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_82a.tabIndex=-1;
return _82a;
};
TextBoxBinding.prototype.handleElement=function(_82b){
return true;
};
TextBoxBinding.prototype.updateElement=function(_82c){
var _82d,area=_82c.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_82d=DOMUtil.getTextContent(area);
}
if(_82d==null){
_82d="";
}
var _82f=this.bindingWindow.UpdateManager;
if(this.getValue()!=_82d){
_82f.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_82d);
}
var _830=_82c.getAttribute("type");
if(this.type!=_830){
_82f.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_830;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_834){
var _835=this.bindingDocument.selection.createRange();
var _836=_835.text=="";
if(_836&&!_834){
_835.text="\t";
}else{
var text="";
var _838=_835.text.length;
while((_835.moveStart("word",-1)&&_835.text.charAt(1)!="\n")){
}
_835.moveStart("character",1);
var _839=0;
var i=0,line,_83c=_835.text.split("\n");
while((line=_83c[i++])!=null){
if(_834){
line=line.replace(/^(\s)/mg,"");
_839++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_83c[i+1]?"\n":"");
}
_835.text=text;
_835.moveStart("character",-_838);
if(_834){
_835.moveStart("character",2*_83c.length-2);
}
_835.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _83d=this.bindingDocument.selection.createRange();
var _83e=_83d.duplicate();
while((_83e.moveStart("word",-1)&&_83e.text.indexOf("\n")==-1)){
}
_83e.moveStart("character",1);
_83d.text="\n"+_83e.text.match(/^(\s)*/)[0]+"!";
_83d.moveStart("character",-1);
_83d.select();
_83d.text="";
_83d.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_83f){
var _840;
var _841;
var oss;
var osy;
var i;
var fnd;
var _846=this._getSelectedText();
var el=this.shadowTree.input;
_840=el.scrollLeft;
_841=el.scrollTop;
if(!_846.match(/\n/)){
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
_846=this._getSelectedText();
if(_83f){
ntext=_846.replace(/^(\s)/mg,"");
}else{
ntext=_846.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_846.length);
}
el.scrollLeft=_840;
el.scrollTop=_841;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _848;
var _849;
var oss;
var osy;
var el=this.shadowTree.input;
_848=el.scrollLeft;
_849=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_848;
el.scrollTop=_849;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _850=this.shadowTree.input.value;
var _851=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _850.substr(_851,end-_851);
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
var _853=this.getProperty("isdisabled");
if(this.isDisabled||_853){
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
var _855=this.getProperty("label");
var _856=this.getProperty("value");
var _857=this.getProperty("width");
var _858=this.getProperty("onchange");
var _859=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_855!=null){
this.label=_855;
}
if(!this.value&&_856!=null){
this.value=_856;
}
if(!this.width&&_857){
this.width=_857;
}
if(_859){
this.isRequired=true;
}
if(_858){
this.onValueChange=function(){
Binding.evaluate(_858,this);
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
var _85a=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_85a.name=this.getName();
_85a.value=this.getValue();
_85a.type="hidden";
if(this.hasCallBackID()){
_85a.id=this.getCallBackID();
}
this.shadowTree.input=_85a;
this.bindingElement.appendChild(_85a);
};
SelectorBinding.prototype.buildButton=function(){
var _85b=this.BUTTON_IMPLEMENTATION;
var _85c=this.add(_85b.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_85c.imageProfile=this.imageProfile;
}
if(this.width!=null){
_85c.setWidth(this.width);
}
this._buttonBinding=_85c;
this.shadowTree.button=_85c;
_85c.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _85e=top.app.bindingMap.selectorpopupset;
var doc=_85e.bindingDocument;
var _860=_85e.add(PopupBinding.newInstance(doc));
var _861=_860.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_860;
this._menuBodyBinding=_861;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_860.attachClassName("selectorpopup");
_860.addActionListener(PopupBinding.ACTION_SHOW,this);
_860.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_860.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_860);
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
var _864=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_864).each(function(_865){
var _866=_865.getAttribute("label");
var _867=_865.getAttribute("value");
var _868=_865.getAttribute("selected");
var _869=_865.getAttribute("image");
var _86a=_865.getAttribute("image-hover");
var _86b=_865.getAttribute("image-active");
var _86c=_865.getAttribute("image-disabled");
var _86d=null;
if(_869||_86a||_86b||_86c){
_86d=new ImageProfile({image:_869,imageHover:_86a,imageActive:_86b,imageDisabled:_86c});
}
list.add(new SelectorBindingSelection(_866?_866:null,_867?_867:null,_868&&_868=="true",_86d));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _86f=null;
while(list.hasNext()){
var _870=list.getNext();
var item=this.addSelection(_870);
if(!_86f){
_86f=item;
}
}
if(!this._selectedItemBinding){
this.select(_86f,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_872,_873){
var _874=this.MENUITEM_IMPLEMENTATION;
var _875=this._menuBodyBinding;
var _876=_875.bindingDocument;
var _877=_874.newInstance(_876);
_877.imageProfile=_872.imageProfile;
_877.setLabel(_872.label);
if(_872.tooltip!=null){
_877.setToolTip(_872.tooltip);
}
_877.selectionValue=_872.value;
if(_872.isSelected){
this.select(_877,true);
}
_872.menuItemBinding=_877;
if(_873){
_875.addFirst(_877);
this.selections.addFirst(_872);
}else{
_875.add(_877);
this.selections.add(_872);
}
this._isUpToDate=false;
return _877;
};
SelectorBinding.prototype.addSelectionFirst=function(_878){
return this.addSelection(_878,true);
};
SelectorBinding.prototype.clear=function(_879){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_879&&this.defaultSelection!=null){
var _87a=this.addSelection(this.defaultSelection);
this.select(_87a,true);
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
SelectorBinding.prototype.setDisabled=function(_87b){
if(this.isAttached==true){
var _87c=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_87b?"none":"block";
_87c.setDisabled(_87b);
}
if(_87b){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_87d){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_87d);
}
};
SelectorBinding.prototype.handleAction=function(_87e){
SelectorBinding.superclass.handleAction.call(this,_87e);
switch(_87e.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_87e.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_87e.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_87e.target);
_87e.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
_87e.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_880){
this.select(_880);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _881=this._buttonBinding.bindingElement.offsetWidth+"px";
var _882=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_882.style.minWidth=_881;
}else{
_882.style.width=_881;
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
SelectorBinding.prototype.handleBroadcast=function(_884,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_884,arg);
switch(_884){
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
SelectorBinding.prototype.select=function(_887,_888){
var _889=false;
if(_887!=this._selectedItemBinding){
this._selectedItemBinding=_887;
_889=true;
var _88a=this._buttonBinding;
this._selectionValue=_887.selectionValue;
_88a.setLabel(_887.getLabel());
if(_887.imageProfile!=null){
_88a.imageProfile=_887.imageProfile;
}
if(_88a.imageProfile!=null){
_88a.setImage(this.isDisabled==true?_88a.imageProfile.getDisabledImage():_88a.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_888){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_888)){
this.validate();
}
}
return _889;
};
SelectorBinding.prototype._relate=function(){
var _88b=this.getProperty("relate");
if(_88b){
var _88c=this.bindingDocument.getElementById(_88b);
if(_88c){
var _88d=UserInterface.getBinding(_88c);
if(_88d){
if(this.isChecked){
_88d.show();
}else{
_88d.hide();
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
SelectorBinding.prototype.selectByValue=function(_88e,_88f){
var _890=false;
var _891=this._menuBodyBinding;
var _892=_891.getDescendantElementsByLocalName("menuitem");
while(_892.hasNext()){
var _893=UserInterface.getBinding(_892.getNext());
if(_893.selectionValue==_88e){
_890=this.select(_893,_88f);
break;
}
}
return _890;
};
SelectorBinding.prototype.getValue=function(){
var _894=this._selectionValue;
if(_894!=null){
_894=String(_894);
}
return _894;
};
SelectorBinding.prototype.setValue=function(_895){
this.selectByValue(String(_895),true);
};
SelectorBinding.prototype.getResult=function(){
var _896=this._selectionValue;
if(_896=="null"){
_896=null;
}
if(_896){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_896=Number(_896);
break;
}
}
return _896;
};
SelectorBinding.prototype.setResult=function(_897){
this.selectByValue(_897,true);
};
SelectorBinding.prototype.validate=function(){
var _898=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _899=this.getValue();
if(_899==this.defaultSelection.value){
_898=false;
}
if(_898!=this._isValid){
if(_898){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_898;
}
return _898;
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
var _89a=this._popupBinding;
if(!this._isUpToDate){
_89a.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_89b,_89c){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_89b));
return true;
};
SelectorBinding.newInstance=function(_89d){
var _89e=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_89d);
return UserInterface.registerBinding(_89e,SelectorBinding);
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
var _8a1=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_8a1){
this.onValueChange=function(){
Binding.evaluate(_8a1,this);
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
SimpleSelectorBinding.prototype.focus=function(_8a4){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8a4){
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
SimpleSelectorBinding.prototype._hack=function(_8a5){
if(Client.isExplorer){
this._select.style.width=_8a5?"auto":this._cachewidth+"px";
if(_8a5){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8a6=true;
if(this.isRequired){
if(this.getValue()==null){
_8a6=false;
}
}
if(_8a6!=this._isValid){
if(_8a6){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8a7=this._select;
var _8a8=_8a7.options[_8a7.selectedIndex];
var text=DOMUtil.getTextContent(_8a8);
_8a7.blur();
_8a7.style.color="#A40000";
_8a7.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8a8,DataBinding.warnings["required"]);
}
_8a7.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8a8,text);
}
};
}
this._isValid=_8a6;
}
return _8a6;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8aa=null;
var _8ab=this._select;
var _8ac=_8ab.options[_8ab.selectedIndex];
var _8ad=true;
if(Client.isExplorer){
var html=_8ac.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8ad=false;
}
}
if(_8ad){
_8aa=_8ac.getAttribute("value");
}
return _8aa;
};
SimpleSelectorBinding.prototype.setValue=function(_8af){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8b0){
this.setValue(_8b0);
};
SimpleSelectorBinding.newInstance=function(_8b1){
var _8b2=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8b1);
return UserInterface.registerBinding(_8b2,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8b3,_8b4,_8b5,_8b6,_8b7){
this._init(_8b3,_8b4,_8b5,_8b6,_8b7);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8b8,_8b9,_8ba,_8bb,_8bc){
if(_8b8!=null){
this.label=String(_8b8);
}
if(_8b9!=null){
this.value=String(_8b9);
}
if(_8bb!=null){
this.imageProfile=_8bb;
}
if(_8bc!=null){
this.tooltip=_8bc;
}
this.isSelected=_8ba?true:false;
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
var _8bd=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8bd.popupBindingTargetElement=this.shadowTree.input;
_8bd.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8bd.attach();
var self=this;
_8bd.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8bd;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8c0=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8c0).each(function(_8c1){
if(_8c1.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8c2=_8c1.getAttribute("value");
var _8c3=_8c1.getAttribute("selected");
var _8c4=_8c1.getAttribute("tooltip");
list.add({value:_8c2?_8c2:null,toolTip:_8c4?_8c4:null,isSelected:(_8c3&&_8c3=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8c6=this._menuBodyBinding;
var _8c7=_8c6.bindingDocument;
while(_8c6.bindingElement.hasChildNodes()){
var node=_8c6.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8c6.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8c9=list.getNext();
var _8ca=MenuItemBinding.newInstance(_8c7);
_8ca.setLabel(_8c9.value);
_8ca.selectionValue=_8c9.value;
if(_8c9.toolTip){
_8ca.setToolTip(_8c9.toolTip);
}
if(_8c9.isSelected){
this.select(_8ca,true);
}
_8c6.add(_8ca);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8cb){
this.select(_8cb);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8cc,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8cc,arg);
switch(_8cc){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8cc,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8ce){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8ce);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8cf){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8cf);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8d0=this.bindingElement.offsetWidth+"px";
var _8d1=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8d1.style.minWidth=_8d0;
}else{
_8d1.style.width=_8d0;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8d2=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8d3=this.getValue();
var _8d4=null;
_8d2.each(function(item){
if(item.getLabel()==_8d3){
_8d4=item;
}
});
if(_8d4){
_8d4.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8d7){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8d7){
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
var _8d8=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8d8.setImage("${icon:popup}");
this.addFirst(_8d8);
_8d8.attach();
var self=this;
_8d8.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8da=self.getProperty("handle");
var _8db=ViewDefinitions[_8da];
if(_8db instanceof DialogViewDefinition){
_8db.handler={handleDialogResponse:function(_8dc,_8dd){
self._isButtonClicked=false;
if(_8dc==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8de=_8dd.getFirst();
self.setValue(_8de);
self.validate(true);
}
self.focus();
}};
_8db.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8db);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8d8.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8d8;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8e0=this._dialogButtonBinding;
if(_8e0!=null){
_8e0.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8e2=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8e2=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8e2;
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
var _8e3=this.getProperty("label");
var _8e4=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_8e3!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_8e3+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_8e3);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_8e4!=null){
this._buttonBinding.setToolTip(_8e4);
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
DataDialogBinding.prototype.handleAction=function(_8e6){
DataDialogBinding.superclass.handleAction.call(this,_8e6);
var _8e7=_8e6.target;
var self=this;
switch(_8e6.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_8e9,_8ea){
if(_8e9==Dialog.RESPONSE_ACCEPT){
if(_8ea instanceof DataBindingMap){
self._map=_8ea;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_8e7==this._buttonBinding){
_8e6.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_8eb,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_8eb,arg);
switch(_8eb){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _8ee=this.getProperty("handle");
var url=this.getURL();
var _8f0=null;
if(_8ee!=null||def!=null){
if(def!=null){
_8f0=def;
}else{
_8f0=ViewDefinitions[_8ee];
}
if(_8f0 instanceof DialogViewDefinition){
_8f0.handler=this._handler;
if(this._map!=null){
_8f0.argument=this._map;
}
StageBinding.presentViewDefinition(_8f0);
}
}else{
if(url!=null){
_8f0=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_8f0!=null){
this._dialogViewHandle=_8f0.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_8f1){
this.setProperty("label",_8f1);
if(this.isAttached){
this._buttonBinding.setLabel(_8f1+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_8f2){
this.setProperty("image",_8f2);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_8f2);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_8f3){
this.setProperty("tooltip",_8f3);
if(this.isAttached){
this._buttonBinding.setToolTip(_8f3);
}
};
DataDialogBinding.prototype.setHandle=function(_8f4){
this.setProperty("handle",_8f4);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_8f6){
this._handler=_8f6;
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
DataDialogBinding.newInstance=function(_8f8){
var _8f9=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_8f8);
return UserInterface.registerBinding(_8f9,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_8fb,_8fc){
if(_8fb==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_8fc);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_8fd){
_8fd=new String(_8fd);
this.dirty();
this.setValue(encodeURIComponent(_8fd));
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
var _901=this.getValue();
if(_901==null){
_901="";
}
this.shadowTree.dotnetinput.value=_901;
};
PostBackDataDialogBinding.prototype.setValue=function(_902){
this.setProperty("value",_902);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_903){
};
PostBackDataDialogBinding.newInstance=function(_904){
var _905=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_904);
return UserInterface.registerBinding(_905,PostBackDataDialogBinding);
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
var _906=this.getProperty("dialoglabel");
var _907=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _909=this.getProperty("handle");
if(_909!=null){
var def=ViewDefinition.clone(_909,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_906!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_906;
}
if(_907!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_907;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_90b){
var _90c=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_90b);
return UserInterface.registerBinding(_90c,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_90e){
self._datathing.setValue(_90e);
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
var _911=self.getValue();
if(_911==""||_911==null){
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
var _912=this.getProperty("value");
var _913=this.getProperty("selectorlabel");
if(_913==null){
_913=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_912==null));
list.add(new SelectorBindingSelection(_913+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_912!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _912=this.getValue();
if(_912==""||_912==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_915){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_915);
switch(_915.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_915.target==this._datathing){
var _916=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_916){
self._selector.setLabel(_916);
}
},500);
_915.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_918){
this.setProperty("label",_918);
if(this._selector!=null){
this._selector.setLabel(_918);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_919){
this._datathing.setValue(_919);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_91a,_91b){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_91a,_91b)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_91c){
this._buttonBinding.setLabel(_91c);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_91d){
this._buttonBinding.setToolTip(_91d);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_91e){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_91e);
switch(_91e.type){
case MenuItemBinding.ACTION_COMMAND:
var _91f=_91e.target;
var _920=this.master;
if(_91f.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_91f.getLabel());
setTimeout(function(){
_920.action();
},0);
}else{
this.master.setValue("");
}
_920.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_921){
var _922=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_921);
return UserInterface.registerBinding(_922,NullPostBackDataDialogSelectorBinding);
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
var _923=this._dataDialogBinding;
if(_923!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_923.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _924=this.getProperty("editable");
var _925=this.getProperty("selectable");
var _926=this.getProperty("display");
if(_924!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_925){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_926){
this._display=_926;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _927=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_927.selections=this.selections;
this.add(_927);
_927.attach();
this._dataDialogBinding=_927;
this.shadowTree.datadialog=_927;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _929=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _92a=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_929=_92a.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_929=_92a.isSelected!=true;
break;
}
if(_929){
this.shadowTree.box.appendChild(this._getElementForSelection(_92a));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_92c){
var box=this.shadowTree.box;
var _92e=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _92f=list.getNext();
if(_92c){
_92f.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_92e=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_92e=_92f.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_92e=_92f.isSelected!=true;
break;
}
}
if(_92e){
var _930=this._getElementForSelection(_92f);
box.insertBefore(_930,box.firstChild);
CSSUtil.attachClassName(_930,"selected");
this._selectionMap.set(_92f.value,_930);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_931){
var _932=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_932.appendChild(this.bindingDocument.createTextNode(_931.label));
_932.setAttribute("label",_931.label);
_932.setAttribute("value",_931.value);
return _932;
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
var _934=DOMEvents.getTarget(e);
var _935=DOMUtil.getLocalName(_934);
if(_935=="div"){
this._handleMouseDown(_934);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_936){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _937=this._getElements();
var _938=_936.getAttribute("value");
var _939=this._lastSelectedElement.getAttribute("value");
var _93a=false;
while(_937.hasNext()){
var el=_937.getNext();
switch(el.getAttribute("value")){
case _938:
case _939:
_93a=!_93a;
break;
}
if(_93a){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_936);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_936)){
this._unhilite(_936);
}else{
this._hilite(_936);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_936){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_936;
};
MultiSelectorBinding.prototype._hilite=function(_93e){
var _93f=_93e.getAttribute("value");
if(!this._selectionMap.has(_93f)){
CSSUtil.attachClassName(_93e,"selected");
this._selectionMap.set(_93f,_93e);
}
};
MultiSelectorBinding.prototype._unhilite=function(_940){
var _941=_940.getAttribute("value");
if(this._selectionMap.has(_941)){
CSSUtil.detachClassName(_940,"selected");
this._selectionMap.del(_941);
}
};
MultiSelectorBinding.prototype._isHilited=function(_942){
return CSSUtil.hasClassName(_942,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_943){
MultiSelectorBinding.superclass.handleAction.call(this,_943);
var _944=_943.target;
switch(_943.type){
case DataDialogBinding.ACTION_COMMAND:
if(_944==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_943.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_944.result);
this.dirty();
_944.result=null;
_943.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _945=null;
if(this.isSelectable){
_945=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_947){
if(self._isHilited(_947)){
_947.parentNode.removeChild(_947);
_945.add(new SelectorBindingSelection(_947.getAttribute("label"),_947.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _945;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _949=this._getElements();
if(!isUp){
_949.reverse();
}
var _94a=true;
while(_94a&&_949.hasNext()){
var _94b=_949.getNext();
if(this._isHilited(_94b)){
switch(isUp){
case true:
if(_94b.previousSibling){
_94b.parentNode.insertBefore(_94b,_94b.previousSibling);
}else{
_94a=false;
}
break;
case false:
if(_94b.nextSibling){
_94b.parentNode.insertBefore(_94b,_94b.nextSibling.nextSibling);
}else{
_94a=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _94c=new List();
var _94d=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_94f){
var _950=new SelectorBindingSelection(_94f.getAttribute("label"),_94f.getAttribute("value"),_94d);
_950.isHighlighted=self._isHilited(_94f);
_94c.add(_950);
});
return _94c;
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
var _951=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_951.hasEntries()){
_951.each(function(_952){
_952.parentNode.removeChild(_952);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _953=this.selections.getNext();
if(_953.isSelected){
var _954=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_954.name=this._name;
_954.value=_953.value;
this.bindingElement.appendChild(_954);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_955){
alert(_955);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_956){
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
var _957={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _958=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_958.handler=this._handler;
_958.argument=_957;
StageBinding.presentViewDefinition(_958);
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
var _959={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _95b={handleDialogResponse:function(_95c,_95d){
if(_95c==Dialog.RESPONSE_ACCEPT){
self.result=_95d;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _95e=ViewDefinitions[this._dialogViewHandle];
_95e.handler=_95b;
_95e.argument=_959;
StageBinding.presentViewDefinition(_95e);
};
MultiSelectorDataDialogBinding.newInstance=function(_95f){
var _960=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_95f);
return UserInterface.registerBinding(_960,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_961){
var id=_961.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _963=_961.bindingDocument.getElementById(id);
if(_963!=null){
var _964=UserInterface.getBinding(_963);
_964.setResult(true);
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
var _966=this.bindingDocument.getElementById(id);
if(_966!=null){
var _967=UserInterface.getBinding(_966);
if(_967&&!_967.isAttached){
_967.isLazy=true;
}else{
_966.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_968){
this._isLazy=_968;
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
var _96a=this.getProperty("stateprovider");
var _96b=this.getProperty("handle");
if(_96a!=null&&_96b!=null){
url=url.replace("${stateprovider}",_96a).replace("${handle}",_96b);
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
EditorDataBinding.prototype._onPageInitialize=function(_96c){
EditorDataBinding.superclass._onPageInitialize.call(this,_96c);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_96d){
EditorDataBinding.superclass.handleAction.call(this,_96d);
switch(_96d.type){
case Binding.ACTION_DIRTY:
if(_96d.target!=this){
if(!this.isDirty){
this.dirty();
}
_96d.consume();
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
EditorDataBinding.prototype.setValue=function(_96e){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_96f){
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
var _974=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_974=fake.getValue()!="";
}
if(!_974&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_974&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _974;
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
var _978=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_978!=null){
_978.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_979){
_979=_979!=null?_979:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_979;
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
var _97a=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _97b=_97a.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_97b;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_97b=_97b.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_97b;
}
var self=this;
var _97d=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_97d.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _980=this.getProperty("label");
if(_980){
this.setLabel(_980);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_981){
this.setProperty("label",_981);
if(this.shadowTree.labelBinding==null){
var _982=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_982.attachClassName("fieldgrouplabel");
cell.insertBefore(_982.bindingElement,cell.getElementsByTagName("div").item(1));
_982.attach();
this.shadowTree.labelBinding=_982;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_981));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_984){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_984.bindingElement);
return _984;
};
FieldGroupBinding.prototype.addFirst=function(_985){
var _986=this.shadowTree[FieldGroupBinding.CENTER];
_986.insertBefore(_985.bindingElement,_986.firstChild);
return _985;
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
var _987=this.getProperty("relation");
if(_987!=null){
this.bindingRelation=_987;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_988,arg){
FieldBinding.superclass.handleBroadcast.call(this,_988,arg);
switch(_988){
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
FieldBinding.newInstance=function(_98a){
var _98b=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_98a);
return UserInterface.registerBinding(_98b,FieldBinding);
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
var _98c=this.getDescendantBindingByLocalName("fieldgroup");
if(_98c!=null){
_98c.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _98d=true;
var _98e=this.getDescendantBindingsByLocalName("*");
while(_98e.hasNext()){
var _98f=_98e.getNext();
if(Interfaces.isImplemented(IData,_98f)){
var _990=_98f.validate();
if(_98d&&!_990){
_98d=false;
}
}
}
return _98d;
};
FieldsBinding.prototype.handleAction=function(_991){
FieldsBinding.superclass.handleAction.call(this,_991);
var _992=_991.target;
if(_992!=this){
switch(_991.type){
case Binding.ACTION_INVALID:
var _993=DataBinding.getAssociatedLabel(_992);
if(_993){
this._invalidFieldLabels.set(_992.key,_993);
}
if(_992.error){
if(!_992.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_992.error},_992);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_991.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_992.key)){
this._invalidFieldLabels.del(_992.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_991.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _994=null;
if(this._invalidFieldLabels.hasEntries()){
_994=this._invalidFieldLabels.toList();
}
return _994;
};
FieldsBinding.newInstance=function(_995){
var _996=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_995);
return UserInterface.registerBinding(_996,FieldsBinding);
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
var _997=this.getProperty("image");
if(_997){
this.setImage(_997);
}
var _998=this.getProperty("tooltip");
if(_998){
this.setToolTip(_998);
}
var _999=this.getProperty("label");
if(_999){
this.setLabel(_999);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _99b=this.getAncestorBindingByLocalName("field");
if(_99b){
var _99c=true;
_99b.getDescendantBindingsByLocalName("*").each(function(_99d){
if(Interfaces.isImplemented(IData,_99d)){
_99d.focus();
_99c=false;
}
return _99c;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_99e){
this.setProperty("label",_99e);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_99e);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _99f=this.getProperty("label");
if(!_99f){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_99f=node.data;
}
}
return _99f;
};
FieldDescBinding.prototype.setImage=function(_9a1){
this.setProperty("image",_9a1);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_9a2){
this.setProperty("tooltip",_9a2);
if(this.isAttached){
this.bindingElement.title=_9a2;
}
};
FieldDescBinding.newInstance=function(_9a3){
var _9a4=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9a3);
return UserInterface.registerBinding(_9a4,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9a5){
var _9a6=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9a5);
return UserInterface.registerBinding(_9a6,FieldDataBinding);
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
var _9a7=this._fieldHelpPopupBinding;
if(_9a7){
_9a7.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9a8=app.bindingMap.fieldhelpopupset;
var doc=_9a8.bindingDocument;
var _9aa=_9a8.add(PopupBinding.newInstance(doc));
var _9ab=_9aa.add(PopupBodyBinding.newInstance(doc));
_9aa.position=PopupBinding.POSITION_RIGHT;
_9aa.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9ab.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9ac=this.getProperty("label");
if(_9ac){
_9ab.bindingElement.innerHTML=Resolver.resolve(_9ac);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9aa;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9ad=this.getAncestorBindingByLocalName("field");
if(_9ad){
_9ad.attachClassName("fieldhelp");
var _9ae=ClickButtonBinding.newInstance(this.bindingDocument);
_9ae.attachClassName("fieldhelp");
_9ae.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9ae);
_9ae.attach();
var self=this;
_9ae.oncommand=function(){
self.attachPopupBinding();
};
_9ae.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9ae;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9b0=this._fieldHelpPopupBinding;
if(_9b0&&!_9b0.isAttached){
_9b0.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9b2){
RadioDataGroupBinding.superclass.handleAction.call(this,_9b2);
switch(_9b2.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9b4,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9b4,arg);
switch(_9b4){
case BroadcastMessages.KEY_ARROW:
var _9b6=null;
var next=null;
var _9b8=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9b8=this.getChildBindingsByLocalName("radio");
while(!_9b6&&_9b8.hasNext()){
var _9b9=_9b8.getNext();
if(_9b9.getProperty("ischecked")){
_9b6=_9b9;
}
}
break;
}
if(_9b6){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9b8.getFollowing(_9b6);
while(next!=null&&next.isDisabled){
next=_9b8.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9b8.getPreceding(_9b6);
while(next!=null&&next.isDisabled){
next=_9b8.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9ba){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9ba){
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
var _9bb=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9bb.type="hidden";
_9bb.name=this._name;
this.bindingElement.appendChild(_9bb);
this.shadowTree.input=_9bb;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9bc=null;
var _9bd=this.getChildBindingsByLocalName("radio");
while(!_9bc&&_9bd.hasNext()){
var _9be=_9bd.getNext();
if(_9be.isChecked){
_9bc=_9be.getProperty("value");
}
}
return _9bc;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9bf){
};
RadioDataGroupBinding.prototype.setResult=function(_9c0){
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
this.propertyMethodMap["checked"]=function(_9c1){
if(_9c1!=this.isChecked){
this.setChecked(_9c1,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9c2=this.getProperty("ischecked");
if(_9c2!=this.isChecked){
this.setChecked(_9c2,true);
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
var _9c3=this.getProperty("relate");
var _9c4=this.getProperty("oncommand");
if(_9c3){
this.bindingRelate=_9c3;
this.relate();
}
if(_9c4){
this.oncommand=function(){
Binding.evaluate(_9c4,this);
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
var _9c6=this.getCallBackID();
this._buttonBinding.check=function(_9c7){
RadioButtonBinding.prototype.check.call(this,_9c7);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9c8){
RadioButtonBinding.prototype.uncheck.call(this,_9c8);
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
RadioDataBinding.prototype.setChecked=function(_9c9,_9ca){
this._buttonBinding.setChecked(_9c9,_9ca);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9c9);
};
RadioDataBinding.prototype.check=function(_9cb){
this.setChecked(true,_9cb);
};
RadioDataBinding.prototype.uncheck=function(_9cc){
this.setChecked(false,_9cc);
};
RadioDataBinding.prototype.setDisabled=function(_9cd){
if(_9cd!=this.isDisabled){
this.isDisabled=_9cd;
this._buttonBinding.setDisabled(_9cd);
if(_9cd){
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
var _9cf=DOMEvents.getTarget(e);
switch(_9cf){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9d0=this.getProperty("label");
if(_9d0){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9d0)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9d1){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9d1;
}
this.setProperty("label",_9d1);
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
this.propertyMethodMap["checked"]=function(_9d2){
if(_9d2!=this.isChecked){
this.setChecked(_9d2,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9d3=this.getProperty("ischecked");
if(_9d3!=this.isChecked){
this.setChecked(_9d3,true);
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
var _9d5=DOMEvents.getTarget(e);
switch(_9d5){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9d6,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9d6,arg);
switch(_9d6){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_9d9){
_9d9.consume();
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
var _9db=this.getCallBackID();
this._buttonBinding.check=function(_9dc){
ButtonBinding.prototype.check.call(this,_9dc);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_9dc){
self.focus();
}
};
this._buttonBinding.uncheck=function(_9dd){
ButtonBinding.prototype.uncheck.call(this,_9dd);
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
if(_9db!=null){
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
var _9de=true;
var _9df=this.bindingElement.parentNode;
if(_9df){
var _9e0=UserInterface.getBinding(_9df);
if(_9e0&&_9e0 instanceof CheckBoxGroupBinding){
if(_9e0.isRequired){
if(_9e0.isValid){
_9de=_9e0.validate();
}else{
_9de=false;
}
}
}
}
return _9de;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _9e1=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9e1.type="hidden";
_9e1.name=this._name;
_9e1.style.display="none";
this.bindingElement.appendChild(_9e1);
this.shadowTree.input=_9e1;
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
var _9e2=null;
var _9e3=this.getProperty("value");
if(this.isChecked){
_9e2=_9e3?_9e3:"on";
}
return _9e2;
};
CheckBoxBinding.prototype.setValue=function(_9e4){
if(_9e4==this.getValue()||_9e4=="on"){
this.check(true);
}else{
if(_9e4!="on"){
this.setPropety("value",_9e4);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _9e5=false;
if(this.isChecked){
_9e5=this._result!=null?this._result:true;
}
return _9e5;
};
CheckBoxBinding.prototype.setResult=function(_9e6){
if(typeof _9e6=="boolean"){
this.setChecked(_9e6,true);
}else{
this._result=_9e6;
}
};
CheckBoxBinding.newInstance=function(_9e7){
var _9e8=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_9e7);
return UserInterface.registerBinding(_9e8,CheckBoxBinding);
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
var _9e9=true;
if(this.isRequired){
var _9ea=this.getDescendantBindingsByLocalName("checkbox");
if(_9ea.hasEntries()){
_9e9=false;
while(_9ea.hasNext()&&!_9e9){
if(_9ea.getNext().isChecked){
_9e9=true;
}
}
}
if(_9e9==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _9e9;
};
CheckBoxGroupBinding.prototype._showWarning=function(_9eb){
if(_9eb){
if(!this._labelBinding){
var _9ec=LabelBinding.newInstance(this.bindingDocument);
_9ec.attachClassName("invalid");
_9ec.setImage("${icon:error}");
_9ec.setLabel("Selection required");
this._labelBinding=this.addFirst(_9ec);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_9ed){
CheckBoxGroupBinding.superclass.handleAction.call(this,_9ed);
switch(_9ed.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_9ee){
var _9ef=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_9ee);
return UserInterface.registerBinding(_9ef,CheckBoxGroupBinding);
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
var _9f0=DialogControlBinding.newInstance(this.bindingDocument);
_9f0.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_9f0);
this._controlGroupBinding.attachRecursive();
var _9f1=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_9f1);
var _9f2=this.getLabel();
if(_9f2!=null){
this.setLabel(_9f2);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _9f3=this._snapTargetBinding;
if(Binding.exists(_9f3)==true){
_9f3.removeActionListener(Binding.ACTION_BLURRED,this);
_9f3.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_9f4){
if(Interfaces.isImplemented(IData,_9f4)){
this._snapTargetBinding=_9f4;
var _9f5=_9f4.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_9f5&&_9f5.isConsumed){
this._environmentBinding=_9f5.listener;
}
if(this._environmentBinding){
_9f4.addActionListener(Binding.ACTION_BLURRED,this);
_9f4.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_9f4)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_9f4.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _9f7=this._snapTargetBinding;
var _9f8=this._environmentBinding;
var root=UserInterface.getBinding(_9f7.bindingDocument.body);
if(Binding.exists(_9f7)&&Binding.exists(_9f8)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_9f7.isAttached&&_9f8.isAttached){
var _9fa=_9f7.boxObject.getUniversalPosition();
var _9fb=_9f8.boxObject.getUniversalPosition();
_9fb.y+=_9f8.bindingElement.scrollTop;
_9fb.x+=_9f8.bindingElement.scrollLeft;
var tDim=_9f7.boxObject.getDimension();
var eDim=_9f8.boxObject.getDimension();
var _9fe=false;
if(_9fa.y+tDim.h<_9fb.y){
_9fe=true;
}else{
if(_9fa.x+tDim.w<_9fb.x){
_9fe=true;
}else{
if(_9fa.y>_9fb.y+eDim.h){
_9fe=true;
}else{
if(_9fa.x>_9fb.x+eDim.w){
_9fe=true;
}
}
}
}
if(!_9fe){
this._setComputedPosition(_9fa,_9fb,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_9ff,_a00,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a05=_9ff;
var _a06=false;
if(_9ff.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a06=true;
}else{
if(_9ff.x+tDim.w>=_a00.x+eDim.w){
_a06=true;
}
}
if(_a06){
_a05.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a05.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a05.y-=(bDim.h);
_a05.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a05);
};
BalloonBinding.prototype.handleBroadcast=function(_a07,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a07,arg);
switch(_a07){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a09){
var _a0a=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a09){
_a0a=true;
}
}
return _a0a;
};
BalloonBinding.prototype._setPosition=function(_a0c){
var _a0d=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a0d=true;
}
}
if(!_a0d){
this.bindingElement.style.left=_a0c.x+"px";
this.bindingElement.style.top=_a0c.y+"px";
this._point=_a0c;
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
BalloonBinding.prototype.handleAction=function(_a0f){
BalloonBinding.superclass.handleAction.call(this,_a0f);
var _a10=_a0f.target;
switch(_a0f.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a0f.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a10==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a10)){
self.dispose();
}else{
if(_a10.validate()){
var _a12=true;
if(_a0f.type==Binding.ACTION_BLURRED){
var root=_a10.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a12=false;
}
}
if(_a12){
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
BalloonBinding.prototype.setLabel=function(_a15){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a16=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a15);
_a16.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a16);
}
this.setProperty("label",_a15);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a18){
var _a19=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a18);
var _a1a=UserInterface.registerBinding(_a19,BalloonBinding);
_a1a.hide();
return _a1a;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a1b,_a1c){
if(Interfaces.isImplemented(IData,_a1c)==true){
var _a1d,_a1e=_a1c.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a1e&&_a1e.isConsumed){
switch(_a1e.listener.constructor){
case StageBinding:
_a1d=false;
break;
case StageDialogBinding:
_a1d=true;
break;
}
}
var _a1f=_a1d?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a20=_a1f.add(BalloonBinding.newInstance(top.app.document));
_a20.setLabel(_a1b.text);
_a20.snapTo(_a1c);
_a20.attach();
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
var _a21=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a24=_a21.getDataBinding(name);
if(_a24){
ErrorBinding.presentError({text:text},_a24);
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
FocusBinding.focusElement=function(_a25){
var _a26=true;
try{
_a25.focus();
Application.focused(true);
}
catch(exception){
var _a27=UserInterface.getBinding(_a25);
var _a28=SystemLogger.getLogger("FocusBinding.focusElement");
_a28.warn("Could not focus "+(_a27?_a27.toString():String(_a25)));
_a26=false;
}
return _a26;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a29){
var win=_a29.bindingWindow;
var id=_a29.bindingElement.id;
return {getBinding:function(){
var _a2c=null;
try{
if(Binding.exists(_a29)){
_a2c=win.bindingMap[id];
}
}
catch(exception){
}
return _a2c;
}};
};
FocusBinding.navigateNext=function(_a2d){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a2d);
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
var _a2e=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a2e&&_a2e.isConsumed){
if(_a2e.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a2f){
FocusBinding.superclass.handleAction.call(this,_a2f);
var _a30=_a2f.target;
var _a31=null;
if(this._isFocusManager){
switch(_a2f.type){
case FocusBinding.ACTION_ATTACHED:
if(_a30!=this){
this._isUpToDate=false;
}
_a2f.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a30!=this){
this._isUpToDate=false;
_a2f.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a31=new FocusCrawler();
_a31.mode=FocusCrawler.MODE_BLUR;
_a31.crawl(_a30.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a2f.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a30!=this){
_a31=new FocusCrawler();
_a31.mode=FocusCrawler.MODE_FOCUS;
_a31.crawl(_a30.bindingElement);
}
_a2f.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a30)){
this.claimFocus();
this._onFocusableFocused(_a30);
}
_a2f.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a30)){
this._onFocusableBlurred(_a30);
}
_a2f.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a32){
var _a33=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a33==null&&list.hasNext()){
var _a35=list.getNext();
if(this._cachedFocus&&_a35==this._cachedFocus.getBinding()){
_a33=_a35;
}
}
if(_a33!=null){
if(_a35.isFocused){
var next=_a32?list.getPreceding(_a33):list.getFollowing(_a33);
if(!next){
next=_a32?list.getLast():list.getFirst();
}
next.focus();
}else{
_a33.focus();
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
var _a37=new FocusCrawler();
var list=new List();
_a37.mode=FocusCrawler.MODE_INDEX;
_a37.crawl(this.bindingElement,list);
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
var _a3b=this._cachedFocus.getBinding();
if(_a3b&&!_a3b.isFocused){
_a3b.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a3c){
if(_a3c!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a3c;
_a3c.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a3c);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a3d){
_a3d.deleteProperty(FocusBinding.MARKER);
if(_a3d==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a3f){
this.bindingElement.style.left=_a3f+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a40){
this.hiddenTabBindings.add(_a40);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a41=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a41.getLabel());
item.setImage(_a41.getImage());
item.associatedTabBinding=_a41;
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
TabsButtonBinding.prototype.handleAction=function(_a44){
TabsButtonBinding.superclass.handleAction.call(this,_a44);
switch(_a44.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a45=this.selectedTabBinding;
if(_a45){
this.containingTabBoxBinding.moveToOrdinalPosition(_a45,0);
this.containingTabBoxBinding.select(_a45);
}
_a44.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a46){
var _a47=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a46);
_a47.setAttribute("type","checkbox");
_a47.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a47.className="tabbutton";
return UserInterface.registerBinding(_a47,TabsButtonBinding);
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
var _a48=TabBoxBinding.currentActiveInstance;
if(_a48!=null&&Binding.exists(_a48)){
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
var _a49=this.getTabElements().getLength();
var _a4a=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a49!=_a4a){
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
var _a4b=this.getTabPanelElements();
while(_a4b.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a4b.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a4c=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a4d=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a4e=_a4c>_a4d?"tabsbelow":"tabsontop";
this.attachClassName(_a4e);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a50=this.getTabPanelElements();
var _a51=null;
var _a52=this.getProperty("selectedindex");
if(_a52!=null){
if(_a52>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a53=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a55=_a50.getNext();
this.registerTabBoxPair(tab,_a55);
if(_a52&&_a53==_a52){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a51=tab;
}
}
_a53++;
}
if(!_a51){
_a51=tabs.getFirst();
_a51.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a56){
var _a57=null;
var _a58=null;
if(this.isEqualSize){
var _a59=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a5b=this.getTabPanelElements();
_a5b.each(function(_a5c){
max=_a5c.offsetHeight>max?_a5c.offsetHeight:max;
});
_a58=max+_a59.top+_a59.bottom;
if(_a56&&this._tabPanelsElement.style.height!=null){
_a57=this._tabPanelsElement.offsetHeight;
}
if(_a57!=null||_a58>_a57){
this._tabPanelsElement.style.height=_a58+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a5d){
_a5d._invalidCount=0;
_a5d.addActionListener(Binding.ACTION_INVALID,this);
_a5d.addActionListener(Binding.ACTION_VALID,this);
_a5d.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a5e){
TabBoxBinding.superclass.handleAction.call(this,_a5e);
var _a5f=_a5e.target;
var _a60=_a5e.listener;
switch(_a5e.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a5f.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a5e.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a5f.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a60._invalidCount++;
if(_a60._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a60.isSelected){
self._showWarning(_a60,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a60._invalidCount>0){
_a60._invalidCount--;
if(_a60._invalidCount==0){
if(_a60.isSelected){
this._showWarning(_a60,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a60,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a5e._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a5e._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a63=DOMEvents.getTarget(e);
if(_a63==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a65=this.getTabPanelElements();
tabs.each(function(tab,_a67){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a68=_a65.get(_a67);
this.registerTabBoxPair(tab,_a68);
}
},this);
var _a69=this._tabBoxPairs;
for(var key in _a69){
var tab=_a69[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a63);
switch(_a63.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a6d=_a63.parentNode;
if(_a6d==this._tabsElement||_a6d==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a63==this._tabsElement||_a63==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a6f){
var _a70=this.getBindingForArgument(arg);
if(_a70!=null&&!_a70.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a70.select(_a6f);
this.getTabPanelBinding(_a70).select(_a6f);
var _a71=this.getProperty("selectedindex");
if(_a71!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a70.bindingElement,true));
}
this._selectedTabBinding=_a70;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a70.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a72=this.getTabPanelBinding(_a70);
this._showBalloon(_a72,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a74){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a74.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a74};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a78){
var _a79=null;
try{
var key=_a78.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a7b=this._tabBoxPairs[key].tabPanel;
_a79=UserInterface.getBinding(_a7b);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a79;
};
TabBoxBinding.prototype.getTabBinding=function(_a7c){
var key=_a7c.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a7e=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_a7e);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _a7f=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_a7f);
return _a7f;
};
TabBoxBinding.prototype.appendTabByBindings=function(_a80,_a81){
var _a82=_a80.bindingElement;
_a80.setProperty("selected",true);
var _a83=this.summonTabPanelBinding();
var _a84=_a83.bindingElement;
if(_a81){
_a84.appendChild(_a81 instanceof Binding?_a81.bindingElement:_a81);
}
this.registerTabBoxPair(_a82,_a84);
UserInterface.getBinding(this._tabsElement).add(_a80);
this._tabPanelsElement.appendChild(_a84);
_a80.attach();
UserInterface.getBinding(_a84).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _a80;
};
TabBoxBinding.prototype.importTabBinding=function(_a85){
var that=_a85.containingTabBoxBinding;
var _a87=that.getTabPanelBinding(_a85);
var _a88=_a87.getBindingElement();
var _a89=_a85.getBindingElement();
that.dismissTabBinding(_a85);
this._tabsElement.appendChild(_a89);
this._tabPanelsElement.appendChild(_a88);
this.registerTabBoxPair(_a89,_a88);
_a85.containingTabBoxBinding=this;
this.select(_a85);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_a8a){
var _a8b=null;
if(_a8a.isSelected){
_a8b=this.getBestTab(_a8a);
this._selectedTabBinding=null;
}
var _a8c=this.getTabPanelBinding(_a8a);
this.unRegisterTabBoxPair(_a8a.bindingElement);
_a8a.dispose();
_a8c.dispose();
if(_a8b!=null){
this.select(_a8b);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_a8d){
if(_a8d.isSelected){
this.selectBestTab(_a8d);
}
};
TabBoxBinding.prototype.selectBestTab=function(_a8e){
var _a8f=this.getBestTab(_a8e);
if(_a8f){
this.select(_a8f);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_a90){
var _a91=null;
var _a92=_a90.getOrdinalPosition(true);
var _a93=this.getTabBindings();
var _a94=_a93.getLength();
var _a95=_a94-1;
if(_a94==1){
_a91=null;
}else{
if(_a92==_a95){
_a91=_a93.get(_a92-1);
}else{
_a91=_a93.get(_a92+1);
}
}
return _a91;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_a96,_a97){
var _a98=this.bindingDocument.getElementById(_a96.bindingElement.id);
var tab=this.getTabElements().get(_a97);
this._tabsElement.insertBefore(_a98,tab);
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
var _a9a=this._nodename_tab;
var _a9b=new List(this._tabsElement.childNodes);
var _a9c=new List();
while(_a9b.hasNext()){
var _a9d=_a9b.getNext();
if(_a9d.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a9d)==_a9a){
_a9c.add(_a9d);
}
}
return _a9c;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _a9e=this._nodename_tabpanel;
var _a9f=new List(this._tabPanelsElement.childNodes);
var _aa0=new List();
_a9f.each(function(_aa1){
if(_aa1.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_aa1)==_a9e){
_aa0.add(_aa1);
}
});
return _aa0;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _aa2=new List();
var _aa3=this.getTabElements();
_aa3.each(function(_aa4){
_aa2.add(UserInterface.getBinding(_aa4));
});
return _aa2;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _aa5=new List();
this.getTabPanelElements().each(function(_aa6){
_aa5.add(UserInterface.getBinding(_aa6));
});
return _aa5;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _aa7=null;
if(this._selectedTabBinding){
_aa7=this.getTabPanelBinding(this._selectedTabBinding);
}
return _aa7;
};
TabBoxBinding.prototype._showWarning=function(_aa8,_aa9){
var _aaa=this.getTabBinding(_aa8);
if(_aa9){
if(_aaa.labelBinding.hasImage){
_aaa._backupImage=_aaa.getImage();
}
_aaa.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_aaa._backupImage){
_aaa.setImage(_aaa._backupImage);
}else{
_aaa.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_aab,_aac){
var _aad=this.getTabBinding(_aab);
if((_aac&&!_aad.isSelected)||!_aac){
if(_aad.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_aac){
if(_aad.labelBinding.hasImage){
_aad._backupImage=_aad.getImage();
}
_aad.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_aad._backupImage!=null){
_aad.setImage(_aad._backupImage);
}else{
_aad.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_aae){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _ab1=tab.getOrdinalPosition(true);
var next=null;
var _ab3=new List();
tabs.each(function(t){
if(t.isVisible){
_ab3.add(t);
}
});
if(_ab3.getLength()>1){
if(_ab1==0&&!_aae){
next=_ab3.getLast();
}else{
if(_ab1==_ab3.getLength()-1&&_aae){
next=_ab3.getFirst();
}else{
if(_aae){
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
var _ab6=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_ab6.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_ab7){
TabsBinding.superclass.handleAction.call(this,_ab7);
switch(_ab7.type){
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
var _aba=self.bindingElement.offsetWidth;
if(_aba!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_aba;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_abb){
if(_abb instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_abb);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _abc=false;
var _abd,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _ac0=this.constructor.TABBUTTON_IMPLEMENTATION;
var _ac1=this.bindingElement.offsetWidth-_ac0.RESERVED_SPACE;
var _ac2=null;
var sum=0,_ac4=0;
var _ac5=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_ac5){
tab=tabs.getNext();
_abd=UserInterface.getBinding(tab);
if(!_ac2){
_ac2=_abd;
}
sum+=tab.offsetWidth;
if(sum>=_ac1){
_abc=true;
if(_abd.isSelected){
if(!DOMUtil.isFirstElement(_abd.bindingElement,true)){
this.isManaging=false;
if(_ac2){
_ac2.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_abd,_ac4-1);
_ac5=false;
}
}else{
_abd.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_abd);
}
}else{
_abd.show();
_ac2=_abd;
_ac4++;
}
}
if(_ac5){
if(_abc&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _ac6=_ac2.getBindingElement();
var _ac7=_ac6.offsetLeft+_ac6.offsetWidth;
var _ac8=this.tabsButtonBinding;
setTimeout(function(){
_ac8.show(_ac7+4);
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
var _ac9=TabBinding.superclass.serialize.call(this);
if(_ac9){
_ac9.label=this.getLabel();
_ac9.image=this.getImage();
_ac9.tooltip=this.getToolTip();
}
return _ac9;
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
var _aca=this.bindingElement.getAttribute("image");
var _acb=this.bindingElement.getAttribute("label");
var _acc=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_acb){
this.setLabel(_acb);
}
if(_aca){
this.setImage(_aca);
}
if(_acc){
this.setToolTip(_acc);
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
TabBinding.prototype.setLabel=function(_ace){
if(_ace!=null){
this.setProperty("label",_ace);
if(this.isAttached){
this.labelBinding.setLabel(_ace);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_acf){
if(_acf){
this.setProperty("tooltip",_acf);
if(this.isAttached){
this.labelBinding.setToolTip(_acf);
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
var _ad1=false;
if(Client.isMozilla==true){
}
if(!_ad1){
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
TabBinding.prototype.select=function(_ad2){
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
TabBinding.newInstance=function(_ad3){
var _ad4=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_ad3);
return UserInterface.registerBinding(_ad4,TabBinding);
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
var _ad5=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_ad5=true;
this._lastKnownDimension=dim1;
}
return _ad5;
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
TabPanelBinding.prototype.select=function(_ad8){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_ad8!=true){
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
TabPanelBinding.prototype.handleAction=function(_ad9){
TabPanelBinding.superclass.handleAction.call(this,_ad9);
var _ada=_ad9.target;
switch(_ad9.type){
case BalloonBinding.ACTION_INITIALIZE:
_ad9.consume();
break;
}
};
TabPanelBinding.newInstance=function(_adb){
var _adc=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_adb);
UserInterface.registerBinding(_adc,TabPanelBinding);
return UserInterface.getBinding(_adc);
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
var _add=SplitBoxBinding.superclass.serialize.call(this);
if(_add){
_add.orient=this.getOrient();
_add.layout=this.getLayout();
}
return _add;
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
var _ade=this.getSplitPanelElements();
if(_ade.hasEntries()){
var _adf=new List(this.getLayout().split(":"));
if(_adf.getLength()!=_ade.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_ade.each(function(_ae0){
_ae0.setAttribute("ratio",_adf.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _ae1=this.getProperty("orient");
if(_ae1){
this._orient=_ae1;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _ae2=this.getSplitterBindings();
while(_ae2.hasNext()){
var _ae3=_ae2.getNext();
if(_ae3&&_ae3.getProperty("collapsed")==true){
_ae3.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_ae4){
SplitBoxBinding.superclass.handleAction.call(this,_ae4);
switch(_ae4.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_ae4.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_ae4.target);
_ae4.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_ae4.target);
_ae4.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_ae5){
this._getSplitPanelBindingForSplitter(_ae5).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_ae6){
this._getSplitPanelBindingForSplitter(_ae6).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_ae7){
var _ae8=DOMUtil.getOrdinalPosition(_ae7.bindingElement,true);
var _ae9,_aea=this.getSplitPanelElements();
switch(_ae7.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_ae9=_aea.get(_ae8);
break;
case SplitterBinding.COLLAPSE_AFTER:
_ae9=_aea.get(_ae8+1);
break;
}
return UserInterface.getBinding(_ae9);
};
SplitBoxBinding.prototype.invokeLayout=function(_aeb){
var _aec=this.isHorizontalOrient();
var _aed=this.getSplitPanelBindings();
var _aee=this.getSplitterBindings();
var _aef=new List();
var _af0,sum=0;
var _af2=0;
_aed.each(function(_af3){
if(_af3.isFixed==true){
if(!_aed.hasNext()){
_af2+=_af3.getFix();
}
_aef.add(0);
sum+=0;
}else{
_af0=_af3.getRatio();
_aef.add(_af0);
sum+=_af0;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_aef.getLength()!=_aed.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _af4=_aec?this.getWidth():this.getHeight();
_af4-=_af2;
_aee.each(function(_af5){
if(_af5.isVisible){
_af4-=SplitterBinding.DIMENSION;
}
});
var unit=_af4/sum;
var _af7=0;
var self=this;
_aed.each(function(_af9){
var span=0;
var _afb=_aef.getNext();
if(_af9.isFixed){
span=_af9.getFix();
}else{
span=Math.round(unit*_afb);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_af7+=span;
while(_af7>_af4){
_af7--;
span--;
}
if(!_af9.isFixed){
if(_aec){
_af9.setWidth(span);
}else{
_af9.setHeight(span);
}
}
});
}
if(_aeb!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _afc=this.getLayout();
if(_afc){
this.setProperty("layout",_afc);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _afd=this.isHorizontalOrient();
var _afe=this.getSplitPanelBindings();
var _aff=this.getSplitterBindings();
var _b00=null;
var _b01=null;
var unit=null;
var _b03=null;
var span=null;
_afe.each(function(_b05){
if(!unit){
unit=_afd?_b05.getWidth():_b05.getHeight();
}
span=_afd?_b05.getWidth():_b05.getHeight();
if(_b03){
span-=_b03;
_b03=null;
}
_b00=_aff.getNext();
if(_b00&&_b00.offset){
_b03=_b00.offset;
span+=_b03;
}
_b05.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b06){
this.logger.debug(_b06);
this.setProperty("layout",_b06);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b07="",_b08=this.getSplitPanelBindings();
_b08.each(function(_b09){
_b07+=_b09.getRatio().toString();
_b07+=_b08.hasNext()?":":"";
});
this.setProperty("layout",_b07);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b0a=this.getSplitPanelElements();
_b0a.each(function(_b0b){
layout+="1"+(_b0a.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b0c){
this.bindingElement.style.width=_b0c+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b0d){
this.bindingElement.style.height=_b0d+"px";
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
SplitBoxBinding.prototype.fit=function(_b0e){
if(!this.isFit||_b0e){
if(this.isHorizontalOrient()){
var max=0;
var _b10=this.getSplitPanelBindings();
_b10.each(function(_b11){
var _b12=_b11.bindingElement.offsetHeight;
max=_b12>max?_b12:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b13){
var _b14=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b13);
return UserInterface.registerBinding(_b14,SplitBoxBinding);
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
var _b17=this.getProperty("hidden");
if(_b17){
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
var _b18=this.getProperty("ratiocache");
if(_b18){
this.setRatio(_b18);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b19){
if(!this.isFixed){
if(_b19!=this.getWidth()){
if(_b19<0){
_b19=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b19+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b19);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b1a=null;
if(this.isFixed){
_b1a=this.getFix();
}else{
_b1a=this.bindingElement.offsetWidth;
}
return _b1a;
};
SplitPanelBinding.prototype.setHeight=function(_b1b){
if(!this.isFixed){
if(_b1b!=this.getHeight()){
try{
this.bindingElement.style.height=_b1b+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b1c=null;
if(this.isFixed){
_b1c=this.getFix();
}else{
_b1c=this.bindingElement.offsetHeight;
}
return _b1c;
};
SplitPanelBinding.prototype.setRatio=function(_b1d){
this.setProperty("ratio",_b1d);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b1e){
if(_b1e){
this._fixedSpan=_b1e;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b1e);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b1e);
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
SplitPanelBinding.newInstance=function(_b1f){
var _b20=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b1f);
return UserInterface.registerBinding(_b20,SplitPanelBinding);
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
var _b21=SplitBoxBinding.superclass.serialize.call(this);
if(_b21){
_b21.collapse=this.getProperty("collapse");
_b21.collapsed=this.getProperty("collapsed");
_b21.disabled=this.getProperty("isdisabled");
}
return _b21;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b22=this.getProperty("hidden");
if(_b22){
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
SplitterBinding.prototype.setCollapseDirection=function(_b24){
this.setProperty("collapse",_b24);
this._collapseDirection=_b24;
};
SplitterBinding.prototype.handleAction=function(_b25){
SplitterBinding.superclass.handleAction.call(this,_b25);
switch(_b25.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b25.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b27=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b27.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b27.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b28){
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
SplitterBinding.newInstance=function(_b33){
var _b34=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b33);
return UserInterface.registerBinding(_b34,SplitterBinding);
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
var _b35=this.getProperty("selectedindex");
var _b36=this.getDeckElements();
if(_b36.hasEntries()){
var _b37=false;
var _b38=0;
while(_b36.hasNext()){
var deck=_b36.getNext();
if(_b35&&_b38==_b35){
deck.setAttribute("selected","true");
_b37=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b37=true;
}
}
_b38++;
}
if(!_b37){
_b36.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b3b=this.getBindingForArgument(arg);
if(_b3b!=null){
if(_b3b!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b3b.select();
this._selectedDeckBinding=_b3b;
var _b3c=this.getProperty("selectedindex");
if(_b3c!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b3b.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b3d=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b3d=true;
this._lastKnownDimension=dim1;
}
return _b3d;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b40){
var _b41=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b40);
return UserInterface.registerBinding(_b41,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b42){
DeckBinding.superclass.handleAction.call(this,_b42);
var _b43=_b42.target;
switch(_b42.type){
case BalloonBinding.ACTION_INITIALIZE:
_b42.consume();
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
DeckBinding.newInstance=function(_b45){
var _b46=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b45);
return UserInterface.registerBinding(_b46,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b47){
if(_b47 instanceof ToolBarBodyBinding){
if(_b47.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b47;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b47;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b47);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b48=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b48){
this.setImageSize(_b48);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b4a=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b4a.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b4a.isDefaultContent=true;
this.add(_b4a);
_b4a.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b4c=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b4c);
}
if(_b4c!=null&&_b4c.hasClassName("max")){
this._maxToolBarGroup(_b4c,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b4e){
var _b4f=this.boxObject.getDimension().w;
var _b50=CSSComputer.getPadding(this.bindingElement);
_b4f-=(_b50.left+_b50.right);
if(_b4e!=null){
_b4f-=_b4e.boxObject.getDimension().w;
if(!Client.isWindows){
_b4f-=1;
}
if(Client.isExplorer){
_b4f-=15;
}
}
max.bindingElement.style.width=_b4f+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b51){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b51);
};
ToolBarBinding.prototype.addLeft=function(_b52,_b53){
var _b54=null;
if(this._toolBarBodyLeft!=null){
_b54=this._toolBarBodyLeft.add(_b52,_b53);
}else{
throw new Error("No left toolbarbody");
}
return _b54;
};
ToolBarBinding.prototype.addLeftFirst=function(_b55,_b56){
var _b57=null;
if(this._toolBarBodyLeft){
_b57=this._toolBarBodyLeft.addFirst(_b55,_b56);
}else{
throw new Error("No left toolbarbody");
}
return _b57;
};
ToolBarBinding.prototype.addRight=function(_b58){
var _b59=null;
if(this._toolBarBodyRight){
_b59=this._toolBarBodyRight.add(_b58);
}else{
throw new Error("No left toolbarbody");
}
return _b59;
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
ToolBarBinding.newInstance=function(_b5c){
var _b5d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b5c);
return UserInterface.registerBinding(_b5d,ToolBarBinding);
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
var _b5e=this.getDescendantBindingsByLocalName("toolbargroup");
var _b5f=new List();
var _b60=true;
_b5e.each(function(_b61){
if(_b61.isVisible&&!_b61.isDefaultContent){
_b5f.add(_b61);
}
});
while(_b5f.hasNext()){
var _b62=_b5f.getNext();
_b62.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b60){
_b62.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b60=false;
}
if(!_b5f.hasNext()){
_b62.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b65=list.getNext();
var _b66=_b65.getEqualSizeWidth();
if(_b66>max){
max=_b66;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b65=list.getNext();
_b65.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b67,_b68){
var _b69=ToolBarBinding.superclass.add.call(this,_b67);
if(!_b68){
if(_b67 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b69;
};
ToolBarBodyBinding.prototype.addFirst=function(_b6a,_b6b){
var _b6c=ToolBarBinding.superclass.addFirst.call(this,_b6a);
if(!_b6b){
if(_b6a instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b6c;
};
ToolBarBodyBinding.newInstance=function(_b6d){
var _b6e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b6d);
return UserInterface.registerBinding(_b6e,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b6f){
switch(_b6f){
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
var _b70=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b70)=="toolbarbody"){
UserInterface.getBinding(_b70).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b71=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b71)=="toolbarbody"){
UserInterface.getBinding(_b71).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b72){
var _b73=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b72);
return UserInterface.registerBinding(_b73,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b74){
var _b75=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b74);
return UserInterface.registerBinding(_b75,ToolBarButtonBinding);
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
var _b76=this.getProperty("label");
var _b77=this.getProperty("image");
if(_b76){
this.setLabel(_b76);
}
if(_b77){
this.setImage(_b77);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b78,_b79){
if(this.isAttached){
this._labelBinding.setLabel(_b78,_b79);
}
this.setProperty("label",_b78);
};
ToolBarLabelBinding.prototype.setImage=function(_b7a,_b7b){
if(this.isAttached){
this._labelBinding.setImage(_b7a,_b7b);
}
this.setProperty("image",_b7a);
};
ToolBarLabelBinding.newInstance=function(_b7c){
var _b7d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_b7c);
return UserInterface.registerBinding(_b7d,ToolBarLabelBinding);
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
var _b7e=this.getDescendantBindingsByLocalName("clickbutton");
if(_b7e.hasEntries()){
while(_b7e.hasNext()){
var _b7f=_b7e.getNext();
if(_b7f.isDefault){
this._defaultButton=_b7f;
_b7f.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_b7f.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_b7e;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_b80,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_b80,arg);
switch(_b80){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _b82=this.getAncestorBindingByType(DialogBinding,true);
if(_b82!=null&&_b82.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_b83){
DialogToolBarBinding.superclass.handleAction.call(this,_b83);
var _b84=_b83.target;
var _b85=false;
var _b86=this._buttons.reset();
if(_b84 instanceof ClickButtonBinding){
switch(_b83.type){
case Binding.ACTION_FOCUSED:
_b84.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_b84;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_b84.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_b85&&_b86.hasNext()){
var _b87=_b86.getNext();
_b85=_b87.isFocused;
}
if(!_b85){
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
var _b88=this._views;
for(var _b89 in ViewDefinitions){
var def=ViewDefinitions[_b89];
var key=def.perspective;
if(key!=null){
if(!_b88.has(key)){
_b88.set(key,new List());
}
var list=_b88.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_b8d,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_b8d,arg);
switch(_b8d){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(this._views.has(tag)){
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var list=this._views.get(tag);
var _b91=this.bindingWindow.bindingMap.toolboxpopup;
_b91.empty();
list.each(function(def){
var item=_b91.add(StageViewMenuItemBinding.newInstance(_b91.bindingDocument));
item.setType(MenuItemBinding.TYPE_CHECKBOX);
item.setHandle(def.handle);
item.setLabel(def.label);
item.setImage(def.image);
item.setToolTip(def.toolTip);
item.attach();
});
}
this.enable();
}else{
this.disable();
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
TreeBinding.grid=function(_b94){
var _b95=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_b94);
var _b97=_b94%_b95;
if(_b97>0){
_b94=_b94-_b97+_b95;
}
return _b94+TreeBodyBinding.PADDING_TOP;
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
var _b98=this.getProperty("focusable");
if(_b98!=null){
this._isFocusable=_b98;
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
var _b9a=this.getProperty("builder");
if(_b9a){
this._buildFromTextArea(_b9a);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _b9b=this.getProperty("selectable");
var _b9c=this.getProperty("selectionproperty");
var _b9d=this.getProperty("selectionvalue");
if(_b9b){
this.setSelectable(true);
if(_b9c){
this.setSelectionProperty(_b9c);
}
if(_b9d){
this.setSelectionValue(_b9d);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _ba0=UserInterface.getBinding(area);
var _ba1=this._treeBodyBinding;
function build(){
_ba1.subTreeFromString(area.value);
}
_ba0.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_ba2){
var _ba3=_ba2.getHandle();
if(this._treeNodeBindings.has(_ba3)){
throw "Duplicate treenodehandles registered: "+_ba2.getLabel();
}else{
this._treeNodeBindings.set(_ba3,_ba2);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_ba3)){
_ba2.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_ba5){
this._treeNodeBindings.del(_ba5.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_ba6){
var _ba7=null;
if(this._treeNodeBindings.has(_ba6)){
_ba7=this._treeNodeBindings.get(_ba6);
}else{
throw "No such treenode: "+_ba6;
}
return _ba7;
};
TreeBinding.prototype.handleAction=function(_ba8){
TreeBinding.superclass.handleAction.call(this,_ba8);
var _ba9=_ba8.target;
switch(_ba8.type){
case TreeNodeBinding.ACTION_OPEN:
_ba8.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_ba9);
_ba8.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_ba9;
this.focusSingleTreeNodeBinding(_ba9);
if(!this.isFocused){
this.focus();
}
_ba8.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_ba9;
this.focusSingleTreeNodeBinding(_ba9);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_ba9;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_ba9;
this.focusSingleTreeNodeBinding(_ba9);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_ba8.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_ba9.isFocused){
this.blurSelectedTreeNodes();
}
_ba8.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_baa,_bab){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_bac){
if(_bac!=null&&!_bac.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_bac);
_bac.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_bad){
this.blurSelectedTreeNodes();
while(_bad.hasNext()){
var _bae=_bad.getNext();
this._focusedTreeNodeBindings.add(_bae);
_bae.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _baf=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _bb0=false;
var _bb1=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _bb2=this._focusedTreeNodeBindings.getNext();
var _bb3=_bb2.getProperty(this._selectionProperty);
if(_bb3!=null){
if(!this._selectionValue||this._selectionValue[_bb3]){
_bb1=(this._selectedTreeNodeBindings[_bb2.key]=_bb2);
var _bb4=_baf[_bb2.key];
if(!_bb4||_bb4!=_bb1){
_bb0=true;
}
}
}
}
if(_bb1){
if(_bb0){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_baf){
for(var key in _baf){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _bb6=new List();
for(var key in this._selectedTreeNodeBindings){
_bb6.add(this._selectedTreeNodeBindings[key]);
}
return _bb6;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_bb8){
_bb8.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_bb9){
var _bba=_bb9.getDescendantBindingsByLocalName("treenode");
var _bbb=true;
var self=this;
_bba.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _bbb;
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
var _bbe=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_bbe!=null){
this.focusSingleTreeNodeBinding(_bbe);
_bbe.callback();
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
TreeBinding.prototype.add=function(_bbf){
var _bc0=null;
if(this._treeBodyBinding){
_bc0=this._treeBodyBinding.add(_bbf);
}else{
this._treeNodeBuffer.add(_bbf);
_bc0=_bbf;
}
return _bc0;
};
TreeBinding.prototype.addFirst=function(_bc1){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _bc2=this._treeBodyBinding.bindingElement;
_bc2.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_bc3,_bc4){
if(_bc4.isContainer&&_bc4.isOpen){
_bc4.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_bc5){
this._isSelectable=_bc5;
if(_bc5){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_bc6){
this._selectionProperty=_bc6;
};
TreeBinding.prototype.setSelectionValue=function(_bc7){
if(_bc7){
var list=new List(_bc7.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_bc9,arg){
TreeBinding.superclass.handleBroadcast.call(this,_bc9,arg);
switch(_bc9){
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
var _bcb=this.getFocusedTreeNodeBindings();
if(_bcb.hasEntries()){
var node=_bcb.getFirst();
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
var _bce=this.getFocusedTreeNodeBindings();
if(_bce.hasEntries()){
var node=_bce.getFirst();
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
var _bd1=null;
while(next==null&&(_bd1=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_bd1!=null){
next=_bd1.getNextBindingByLocalName("treenode");
}
node=_bd1;
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
var _bd3=DOMEvents.getTarget(e);
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
var _bd4=new TreeCrawler();
var list=new List();
_bd4.mode=TreeCrawler.MODE_GETOPEN;
_bd4.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _bd7=list.getNext();
map.set(_bd7.getHandle(),true);
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
var _bdc=this._positionIndicatorBinding;
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
if(y!=_bdc.getPosition().y){
_bdc.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_bdc.isVisible){
_bdc.show();
}
}else{
if(_bdc.isVisible){
_bdc.hide();
}
}
}else{
if(_bdc.isVisible){
_bdc.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_bdf){
this._acceptingTreeNodeBinding=_bdf;
this._acceptingPosition=_bdf.boxObject.getLocalPosition();
this._acceptingDimension=_bdf.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_bdf);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_be0){
var map={};
var _be2=_be0.getChildBindingsByLocalName("treenode");
var _be3,pos,dim,y;
y=TreeBinding.grid(_be0.boxObject.getLocalPosition().y);
map[y]=true;
while(_be2.hasNext()){
_be3=_be2.getNext();
pos=_be3.boxObject.getLocalPosition();
dim=_be3.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _be9 in this._acceptingPositions){
if(_be9==y){
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
TreeBinding.newInstance=function(_bea){
var _beb=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_bea);
var _bec=UserInterface.registerBinding(_beb,TreeBinding);
_bec.treeBodyBinding=TreeBodyBinding.newInstance(_bea);
return _bec;
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
TreeBodyBinding.prototype.accept=function(_bed){
if(_bed instanceof TreeNodeBinding){
this.logger.debug(_bed);
}
};
TreeBodyBinding.prototype.handleAction=function(_bee){
TreeBodyBinding.superclass.handleAction.call(this,_bee);
switch(_bee.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_bee.target);
_bee.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_bef){
var a=this.boxObject.getDimension().h;
var y=_bef.boxObject.getLocalPosition().y;
var h=_bef.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _bf5=_bef.labelBinding.bindingElement;
if(y-t<0){
_bf5.scrollIntoView(true);
}else{
if(y-t+h>a){
_bf5.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_bf6){
var _bf7=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_bf6);
return UserInterface.registerBinding(_bf7,TreeBodyBinding);
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
var _bf8=TreeNodeBinding.superclass.serialize.call(this);
if(_bf8){
_bf8.label=this.getLabel();
_bf8.image=this.getImage();
var _bf9=this.getHandle();
if(_bf9&&_bf9!=this.key){
_bf8.handle=_bf9;
}
if(this.isOpen){
_bf8.open=true;
}
if(this.isDisabled){
_bf8.disabled=true;
}
if(this.dragType){
_bf8.dragtype=this.dragType;
}
if(this.dragAccept){
_bf8.dragaccept=this.dragAccept;
}
}
return _bf8;
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
var _bfb=UserInterface.getBinding(node);
if(_bfb&&_bfb.containingTreeBinding){
this.containingTreeBinding=_bfb.containingTreeBinding;
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
var _bfc=this.key;
var _bfd=this.getProperty("handle");
if(_bfd){
_bfc=_bfd;
}
return _bfc;
};
TreeNodeBinding.prototype.setHandle=function(_bfe){
this.setProperty("handle",_bfe);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _c00=this.getProperty("label");
var _c01=this.getProperty("tooltip");
var _c02=this.getProperty("oncommand");
var _c03=this.getProperty("onbindingfocus");
var _c04=this.getProperty("onbindingblur");
var _c05=this.getProperty("focused");
var _c06=this.getProperty("callbackid");
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
if(_c00!=null){
this.setLabel(_c00);
}
if(_c01!=null){
this.setToolTip(_c01);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c08=this.bindingWindow.WindowManager;
if(_c02!=null){
this.oncommand=function(){
Binding.evaluate(_c02,this);
};
}
if(_c03!=null){
this.onfocus=function(){
Binding.evaluate(_c03,this);
};
}
if(_c04!=null){
this.onblur=function(){
Binding.evaluate(_c04,this);
};
}
if(_c05==true){
this.focus();
}
if(_c06!=null){
Binding.dotnetify(this,_c06);
}
};
TreeNodeBinding.prototype.handleAction=function(_c09){
TreeNodeBinding.superclass.handleAction.call(this,_c09);
switch(_c09.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c09.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c0a,_c0b){
var _c0c=true;
if(_c0a instanceof TreeNodeBinding){
var _c0d=false;
var _c0e=this.bindingElement;
var _c0f=this.containingTreeBinding.bindingElement;
while(!_c0d&&_c0e!=_c0f){
if(_c0e==_c0a.getBindingElement()){
_c0d=true;
}else{
_c0e=_c0e.parentNode;
}
}
if(_c0d){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c0c=false;
}else{
this.acceptTreeNodeBinding(_c0a,_c0b);
}
}else{
_c0c=false;
}
return _c0c;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c10,_c11){
var _c12=_c10.serializeToString();
var _c13=new BindingParser(this.bindingDocument);
var _c14=_c13.parseFromString(_c12).getFirst();
_c11=_c11?_c11:this.containingTreeBinding.getDropIndex();
var _c15=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c14,_c15.get(_c11));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c10.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c16=this.getProperty("image");
var _c17=this.getProperty("image-active");
var _c18=this.getProperty("image-disabled");
_c17=_c17?_c17:this.isContainer?_c16?_c16:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c16?_c16:TreeNodeBinding.DEFAULT_ITEM;
_c18=_c18?_c18:this.isContainer?_c16?_c16:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c16?_c16:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c16=_c16?_c16:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c16,imageHover:null,imageActive:_c17,imageDisabled:_c18});
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
TreeNodeBinding.prototype.setLabel=function(_c1a){
this.setProperty("label",String(_c1a));
if(this.isAttached){
this.labelBinding.setLabel(String(_c1a));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c1b){
this.setProperty("tooltip",String(_c1b));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c1b));
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
var _c1c=this.imageProfile.getDefaultImage();
var _c1d=this.imageProfile.getActiveImage();
_c1d=_c1d?_c1d:_c1c;
return this.isOpen?_c1d:_c1c;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c1f=DOMEvents.getTarget(e);
var _c20=this.labelBinding.bindingElement;
var _c21=this.labelBinding.shadowTree.labelBody;
var _c22=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c1f){
case _c20:
this._onAction(e);
break;
case _c21:
case _c22:
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
if(_c1f.parentNode==this.bindingElement&&_c1f.__updateType==Update.TYPE_INSERT){
var _c20=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c1f)=="treenode"){
if(_c1f==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c1f,_c20.nextSibling);
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
switch(_c1f){
case _c20:
case _c21:
case _c22:
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
var _c26=true;
if(e.type=="mousedown"){
var _c27=e.button==(e.target?0:1);
if(!_c27){
_c26=false;
}
}
if(_c26){
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
var _c29=false;
if(e!=null){
_c29=e.shiftKey;
}
this.dispatchAction(_c29?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c2c=this.getDescendantBindingsByLocalName("treenode");
_c2c.each(function(_c2d){
_c2d.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c2e){
var _c2f=_c2e.getAttribute("focused");
if(_c2f=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c30){
var _c31=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c30);
return UserInterface.registerBinding(_c31,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c32){
var _c33=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c32);
return UserInterface.registerBinding(_c33,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c34){
this.bindingElement.style.left=_c34.x+"px";
this.bindingElement.style.top=_c34.y+"px";
this._geometry.x=_c34.x;
this._geometry.y=_c34.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c35){
var _c36=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c35);
return UserInterface.registerBinding(_c36,TreePositionIndicatorBinding);
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
this.addFilter(function(_c38){
var _c39=UserInterface.getBinding(_c38);
var _c3a=null;
var _c3a=null;
if(!_c39 instanceof TreeNodeBinding){
_c3a=NodeCrawler.SKIP_NODE;
}
return _c3a;
});
this.addFilter(function(_c3b,list){
var _c3d=UserInterface.getBinding(_c3b);
var _c3e=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c3d.isOpen){
list.add(_c3d);
}
break;
}
return _c3e;
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
ShadowBinding.prototype.shadow=function(_c3f){
this.targetBinding=_c3f;
_c3f.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c3f.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c3f.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c3f.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c3f.isVisible){
this.show();
this.setPosition(_c3f.getPosition());
this.setDimension(_c3f.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c40){
ShadowBinding.superclass.handleAction.call(this,_c40);
var _c41=_c40.target;
if(_c41==this.targetBinding){
switch(_c40.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c40.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c41.isVisible){
this.show();
this.setPosition(_c41.getPosition());
this.setDimension(_c41.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c42){
var _c43=this.offset-this.expand;
this.bindingElement.style.left=new String(_c42.x+_c43)+"px";
this.bindingElement.style.top=new String(_c42.y+_c43)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c45){
var _c46=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c45);
return UserInterface.registerBinding(_c46,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c47){
this.binding=_c47;
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
DockTabsButtonBinding.newInstance=function(_c48){
var _c49=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c48);
_c49.setAttribute("type","checkbox");
_c49.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c49.className="tabbutton";
return UserInterface.registerBinding(_c49,DockTabsButtonBinding);
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
var _c4a=DockBinding.superclass.serialize.call(this);
if(_c4a){
_c4a.active=this.isActive?true:null;
_c4a.collapsed=this.isCollapsed?true:null;
}
return _c4a;
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
var _c4b=UserInterface.getBinding(this.bindingElement.parentNode);
var _c4c=MatrixBinding.newInstance(this.bindingDocument);
_c4c.attachClassName("dockliner");
this.shadowTree.dockLiner=_c4c;
_c4b.add(_c4c);
_c4c.attach();
_c4c.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c4e){
var _c4f=this.getSelectedTabPanelBinding();
if(_c4f){
_c4f.isVisible=_c4e;
_c4f.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c50){
var _c51=this._getBindingForDefinition(_c50);
var _c52=DockTabBinding.newInstance(this.bindingDocument);
_c52.setHandle(_c50.handle);
_c52.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c50.label);
_c52.setImage(_c50.image);
_c52.setToolTip(_c50.toolTip);
_c52.setEntityToken(_c50.entityToken);
_c52.setAssociatedView(_c51);
this.appendTabByBindings(_c52,null);
this._setupPageBindingListeners(_c52);
var _c53=this.getTabPanelBinding(_c52);
_c51.snapToBinding(_c53);
var _c54=this.bindingWindow.bindingMap.views;
_c54.add(_c51);
if(!this.isActive){
this.activate();
}
_c51.attach();
};
DockBinding.prototype.prepareOpenView=function(_c55,_c56){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c56.setLabel(_c55.label);
_c56.setImage(_c55.image);
_c56.setToolTip(_c55.toolTip);
this._setupPageBindingListeners(_c56);
var _c57=this.getTabPanelBinding(_c56);
var _c58=this._getBindingForDefinition(_c55);
_c56.setAssociatedView(_c58);
_c58.snapToBinding(_c57);
UserInterface.getBinding(this.bindingDocument.body).add(_c58);
_c58.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c59){
var _c5a=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c5a.bindingDocument);
view.setDefinition(_c59);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c5c){
var _c5d=this.getTabPanelBinding(_c5c);
var self=this;
var _c5f={handleAction:function(_c60){
var _c61=_c60.target;
switch(_c60.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c61.reflex(true);
var view=_c5c.getAssociatedView();
if(_c61.bindingWindow==view.getContentWindow()){
_c5c.updateDisplay(_c61);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c5c.onPageInitialize(_c61);
_c60.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c5c.updateDisplay(_c61);
_c60.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c5c.updateEntityToken(_c61);
_c60.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c5c.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_c5c.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c5c);
_c60.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c5c,true);
_c60.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c5c);
break;
case Binding.ACTION_FORCE_REFLEX:
_c5d.reflex(true);
_c60.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c5c.isDirty){
_c5c.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_c63){
_c5d.addActionListener(_c63,_c5f);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_c64){
DockBinding.superclass.handleAction.call(this,_c64);
var _c65=_c64.target;
switch(_c64.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_c64.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_c65 instanceof DockBinding){
if(_c65.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_c65);
if(this.isActive){
_c65.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_c65);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_c66,arg){
DockBinding.superclass.handleBroadcast.call(this,_c66,arg);
switch(_c66){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _c68=arg;
if(_c68.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_c68.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_c69){
var tabs=this.getTabBindings();
var _c6b=false;
while(tabs.hasNext()&&!_c6b){
var tab=tabs.getNext();
var _c6d=tab.getEntityToken();
if(_c6d!=null&&_c6d==_c69){
if(!tab.isSelected){
this.select(tab,true);
_c6b=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c6e){
this._handleCollapse(true,_c6e);
};
DockBinding.prototype.unCollapse=function(_c6f){
this._handleCollapse(false,_c6f);
};
DockBinding.prototype._handleCollapse=function(_c70,_c71){
var _c72=this.getChildBindingByLocalName("dockpanels");
var _c73=this.getAncestorBindingByLocalName("splitbox");
if(_c70){
_c72.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c71&&_c73.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c72.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c71){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c70);
this.isCollapsed=_c70;
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
DockBinding.prototype.closeTab=function(_c78,_c79){
if(_c78.isDirty&&!_c79){
var _c7a=Resolver.resolve(_c78.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_c7a),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_c7c){
switch(_c7c){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c78);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c78);
break;
}
}});
}else{
this.removeTab(_c78);
}
};
DockBinding.prototype.closeTabsExcept=function(_c7d){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_c7d){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_c80){
var _c81=_c80.getAssociatedView();
_c81.saveContainedEditor();
var self=this;
var _c83={handleBroadcast:function(_c84,arg){
switch(_c84){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_c81.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_c83);
if(arg.isSuccess){
self.removeTab(_c80);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_c83);
};
DockBinding.prototype.appendTabByBindings=function(_c86,_c87){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_c86,_c87);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_c88){
_c88=_c88?_c88+"px":"100%";
this.bindingElement.style.width=_c88;
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
DockBinding.prototype.showControls=function(_c89){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_c89){
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
var _c8c=DockControlBinding.newInstance(this.bindingDocument);
_c8c.setControlType(type);
return _c8c;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c8e=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c8e)){
_c8e=_c8e>0?_c8e-1:0;
self.bindingElement.style.width=new String(_c8e)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_c8f){
DockTabsBinding.superclass.handleCrawler.call(this,_c8f);
switch(_c8f.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c91=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c91)){
_c91=_c91>0?_c91-1:0;
self.bindingElement.style.width=new String(_c91)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_c92){
var _c93=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_c92);
return UserInterface.registerBinding(_c93,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_c94){
this._viewBinding=_c94;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _c95=DockTabBinding.superclass.serialize.call(this);
if(_c95){
_c95.label=null;
_c95.image=null;
_c95.handle=this.getHandle();
}
return _c95;
};
DockTabBinding.prototype.setHandle=function(_c96){
this.setProperty("handle",_c96);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_c97){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_c97;
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
var _c98=DialogControlBinding.newInstance(this.bindingDocument);
_c98.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_c98);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_c99){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_c99){
this.isDirty=_c99;
if(Binding.exists(this.labelBinding)){
var _c9a=this.labelBinding.getLabel();
if(_c9a!=null){
this.labelBinding.setLabel(_c99?"*"+_c9a:_c9a.slice(1,_c9a.length));
}else{
this.labelBinding.setLabel(_c99?"*":"");
}
}
}
var _c9b=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_c9b.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_c9b.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_c9c){
this.setLabel(_c9c.getLabel());
this.setImage(_c9c.getImage());
this.setToolTip(_c9c.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_c9d){
this.setEntityToken(_c9d.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_c9e){
DockTabBinding.superclass.handleAction.call(this,_c9e);
var _c9f=_c9e.target;
switch(_c9e.type){
case ControlBinding.ACTION_COMMAND:
if(_c9f.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_c9e.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_c9f);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_ca0){
var cmd=_ca0.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_ca2){
if(!_ca2){
if(!this.getLabel()){
_ca2=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_ca2=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_ca2);
};
DockTabBinding.prototype.setImage=function(_ca3){
if(!_ca3){
if(!this.getImage()){
_ca3=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_ca3=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_ca3);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _ca6=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_ca6;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_ca6;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_ca6;
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
var _ca8=this.bindingElement;
setTimeout(function(){
_ca8.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_ca9,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_ca9,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_ca9){
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
DockTabBinding.prototype.select=function(_cae){
DockTabBinding.superclass.select.call(this,_cae);
this._updateBroadcasters();
if(_cae!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _caf=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cb0=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cb0.enable();
if(this.isDirty){
_caf.enable();
}else{
_caf.disable();
}
}else{
_cb0.disable();
_caf.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cb1){
if(this._canUpdateTree||_cb1){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _cb2=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cb4=win.bindingMap.savebutton;
if(_cb4!=null){
_cb2=true;
}
}
}
return _cb2;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cb5){
var _cb6=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cb5);
return UserInterface.registerBinding(_cb6,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_cb7){
var _cb8=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_cb7);
return UserInterface.registerBinding(_cb8,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_cb9){
DockPanelBinding.superclass.select.call(this,_cb9);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_cba){
DockPanelBinding.superclass.handleCrawler.call(this,_cba);
if(_cba.response==null){
if(_cba.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_cba.id==FocusCrawler.ID){
_cba.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_cbb){
var _cbc=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_cbb);
return UserInterface.registerBinding(_cbc,DockPanelBinding);
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
DockControlBinding.newInstance=function(_cbd){
var _cbe=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cbd);
return UserInterface.registerBinding(_cbe,DockControlBinding);
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
ViewBinding.getInstance=function(_cbf){
var _cc0=ViewBinding._instances.get(_cbf);
if(!_cc0){
var cry="ViewBinding.getInstance: No such instance: "+_cbf;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _cc0;
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
var _cc3=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_cc3){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _cc4=snap.boxObject.getGlobalPosition();
var _cc5=snap.boxObject.getDimension();
if(!Point.isEqual(_cc4,this._lastknownposition)){
this.setPosition(_cc4);
this._lastknownposition=_cc4;
}
if(!Dimension.isEqual(_cc5,this._lastknowndimension)){
this.setDimension(_cc5);
this._lastknowndimension=_cc5;
var _cc6=_cc5.h-ViewBinding.VERTICAL_ADJUST;
_cc6=_cc6<0?0:_cc6;
this.windowBinding.getBindingElement().style.height=new String(_cc6)+"px";
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
var _cc7=this._viewDefinition.flowHandle;
if(_cc7!=null){
FlowControllerService.CancelFlow(_cc7);
}
}
if(this._viewDefinition!=null){
var _cc8=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_cc8);
this.logger.fine("ViewBinding closed: \""+_cc8+"\"");
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
var _cca=null;
if(this._viewDefinition!=null){
_cca=this._viewDefinition.handle;
}
return _cca;
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
ViewBinding.prototype.setDefinition=function(_ccb){
this._viewDefinition=_ccb;
if(_ccb.flowHandle!=null){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_ccc){
ViewBinding.superclass.handleAction.call(this,_ccc);
var _ccd=_ccc.target;
switch(_ccc.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_ccc.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_ccd.isActivated){
_ccd.onActivate();
}
}
_ccc.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_ccd==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_ccc.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_ccd==this._snapBinding){
if(_ccd.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_ccd.getContentWindow().isPostBackDocument){
if(_ccc.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_ccd.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_ccd==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_ccd.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_ccc.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_ccc.type==WindowBinding.ACTION_ONLOAD){
var win=_ccd.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_ccd);
}
}
}
_ccc.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_ccd.label&&this._viewDefinition.label){
_ccd.label=this._viewDefinition.label;
}
if(!_ccd.image&&this._viewDefinition.image){
_ccd.image=this._viewDefinition.image;
}
if(_ccd.bindingWindow==this.getContentWindow()){
this._pageBinding=_ccd;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_ccd.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_ccd==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_ccc.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_ccc.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_cd2,arg){
ViewBinding.superclass.handleBroadcast.call(this,_cd2,arg);
switch(_cd2){
case BroadcastMessages.CLOSE_VIEW:
if(arg==this._viewDefinition.handle){
this.dispatchAction(ViewBinding.ACTION_ONCLOSE);
}
break;
case BroadcastMessages.CLOSE_VIEWS:
if(this._viewDefinition.flowHandle!=null){
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
var _cd6=def.argument;
if(_cd6!=null){
page.setPageArgument(_cd6);
}
var _cd7=def.width;
if(_cd7!=null){
page.width=_cd7;
}
var _cd8=def.height;
if(_cd8!=null){
page.height=_cd8;
}
}
};
ViewBinding.prototype.handleCrawler=function(_cd9){
ViewBinding.superclass.handleCrawler.call(this,_cd9);
switch(_cd9.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_cd9.id==FocusCrawler.ID){
if(_cd9.previousNode!=this._snapBinding.bindingElement){
_cd9.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_cd9.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_cda){
_cda.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_cda.x+"px";
this.bindingElement.style.top=_cda.y+"px";
};
ViewBinding.prototype.setDimension=function(_cdb){
_cdb.h-=ViewBinding.VERTICAL_ADJUST;
_cdb.w-=ViewBinding.HORIZONTAL_ADJUST;
_cdb.w-=1;
if(_cdb.h<0){
_cdb.h=0;
}
if(_cdb.w<0){
_cdb.w=0;
}
this.bindingElement.style.width=String(_cdb.w)+"px";
this.bindingElement.style.height=String(_cdb.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_cdc){
this.isFlexBoxBehavior=false;
_cdc.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_cdc.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_cdc.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_cdc.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_cdc;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _cdd=null;
if(this.isFreeFloating==true){
_cdd=this._snapBinding.getBindingElement();
}else{
_cdd=ViewBinding.superclass.getMigrationParent.call(this);
}
return _cdd;
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
ViewBinding.prototype.reload=function(_cde){
this._isLoaded=false;
this.windowBinding.reload(_cde);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _cdf=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_cdf=true;
}
}
if(!_cdf){
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
ViewBinding.newInstance=function(_ce3){
var _ce4=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_ce3);
var _ce5=UserInterface.registerBinding(_ce4,ViewBinding);
_ce5.windowBinding=_ce5.add(WindowBinding.newInstance(_ce3));
_ce5.windowBinding.isFlexible=false;
return _ce5;
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
var _ced=this.bindingWindow.__doPostBack;
var _cee=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_cee){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_cef,_cf0){
if(!form.__isSetup){
Application.lock(self);
_cee=true;
}
self.manifestAllDataBindings();
_ced(_cef,_cf0);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_cf1,list){
var _cf3=this.bindingWindow.bindingMap.__REQUEST;
if(_cf3!=null&&this._isDotNet()){
switch(_cf1){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_cf3.postback(_cf1);
}
}
break;
default:
_cf3.postback(_cf1);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_cf1,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_cf4,list){
var _cf6=this.getDescendantBindingsByType(WindowBinding);
_cf6.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_cf4,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_cfa){
list.add({name:_cfa.name,value:_cfa.value});
});
var out="";
list.each(function(_cfc){
out+=_cfc.name+": "+_cfc.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_cfd){
PageBinding.superclass.handleAction.call(this,_cfd);
var _cfe=_cfd.target;
switch(_cfd.type){
case RootBinding.ACTION_PHASE_3:
if(_cfe==UserInterface.getBinding(this.bindingDocument.body)){
_cfe.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_cfe);
}
_cfd.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _cff=this.validateAllDataBindings();
if(_cff){
this.doPostBack(_cfe);
}
}
_cfd.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_cfd.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_cfe.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_cfe.key)){
this._initBlockers.del(_cfe.key);
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
var _d01={handleAction:function(_d02){
if(_d02.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_d01);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_d01);
}else{
MessageQueue.udpdate();
}
_cfd.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d03,arg){
PageBinding.superclass.handleBroadcast.call(this,_d03,arg);
switch(_d03){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d05=arg;
if(!this._canPostBack&&!_d05){
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
PageBinding.prototype.doPostBack=function(_d07){
if(this._canPostBack){
if(_d07!=null&&this._isDotNet()){
var _d08=_d07.getCallBackID();
var _d09=_d07.getCallBackArg();
if(_d08!=null){
_d08=_d08.replace(/_/g,"$");
}else{
_d08="";
}
if(_d09==null){
_d09="";
}
this.bindingWindow.__doPostBack(_d08,_d09);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _d0a=true;
var _d0b=this.bindingWindow.DataManager.getAllDataBindings();
while(_d0b.hasNext()&&_d0a){
var _d0c=_d0b.getNext();
if(_d0c.isAttached){
var _d0d=_d0c.validate();
if(_d0a&&!_d0d){
_d0a=false;
this.logger.debug("Invalid DataBinding: "+_d0c.toString()+" ("+_d0c.getName()+")");
break;
}
}
}
return _d0a;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d0f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d0f.hasNext()){
var _d10=_d0f.getNext();
if(_d10.isAttached){
var _d11=_d10.manifest();
if(_d11!=null){
list.add(_d11);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d12=this.bindingWindow.DataManager.getAllDataBindings();
while(_d12.hasNext()){
var _d13=_d12.getNext();
if(_d13.isAttached){
_d13.clean();
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
var _d15=this._cachedFocus.getBinding();
if(_d15){
_d15.blur();
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
var _d16=this.getProperty("width");
if(!_d16){
_d16=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d16;
}
if(this.height==null){
var _d17=this.getProperty("height");
this.height=_d17?_d17:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d18=this.getProperty("minheight");
if(_d18!=null){
this.minheight=_d18;
}
}
if(this.controls==null){
var _d19=this.getProperty("controls");
this.controls=_d19?_d19:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d1a=this.getProperty("resizable");
this.isResizable=_d1a?_d1a:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d1b){
if(_d1b!=this.isAutoHeightLayoutMode){
if(_d1b){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d1b;
}
};
DialogPageBinding.prototype.handleAction=function(_d1c){
DialogPageBinding.superclass.handleAction.call(this,_d1c);
var _d1d=_d1c.target;
switch(_d1c.type){
case PageBinding.ACTION_ATTACHED:
if(_d1d!=this&&_d1d.isFitAsDialogSubPage){
_d1d.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d1c.consume();
if(_d1d.response!=null){
this.response=_d1d.response;
switch(_d1d.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d1e){
var _d1f=this.bindingWindow.bindingMap.buttonAccept;
if(_d1f!=null){
_d1f.setDisabled(_d1e);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d20){
var _d21=CSSComputer.getPadding(this.bindingElement);
var _d22=CSSComputer.getBorder(this.bindingElement);
_d20+=_d21.top+_d21.bottom;
_d20+=_d22.top+_d22.bottom;
if(_d20>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d20+"px";
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
EditorPageBinding.prototype.handleAction=function(_d2a){
EditorPageBinding.superclass.handleAction.call(this,_d2a);
var _d2b=_d2a.target;
switch(_d2a.type){
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
var _d2c=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d2b.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d2c==-1){
_d2c=0;
}
}else{
_d2c++;
}
return res;
});
if(_d2c>-1){
this._messengers.del(_d2c);
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
_d2a.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d2b.key,_d2b);
if(_d2b instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d2b.key);
if(_d2b instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d2b==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d2b.getSelectedTabBinding();
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
_d2a.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d2b==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d2a.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d2b==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d2a.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d2b==this._windowBinding){
if(_d2b.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d31=WindowBinding.getMarkup(this._windowBinding);
if(_d31!=null){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d31);
}
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
var _d32=this.bindingWindow.bindingMap.savebutton;
if(_d32!=null&&!_d32.isDisabled){
_d32.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d33=this.bindingWindow.bindingMap.__REQUEST;
if(_d33!=null){
_d33.postback(EditorPageBinding.MESSAGE_SAVE);
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
EditorPageBinding.prototype.postMessage=function(_d34){
this._message=null;
switch(_d34){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d34,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d34;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d34;
EditorPageBinding.superclass.postMessage.call(this,_d34,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d34,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d35,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d35,arg);
switch(_d35){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d37=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d37);
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
var _d38=new List();
this._invalidBindings.each(function(key,_d3a){
var list=_d3a.getInvalidLabels();
if(list){
list.each(function(_d3c){
_d38.add(_d3c);
});
}
});
if(_d38.hasEntries()){
var _d3d="";
while(_d38.hasNext()){
_d3d+=_d38.getNext().toLowerCase();
if(_d38.hasNext()){
_d3d+=", ";
}else{
_d3d+=".";
}
}
var _d3e=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d3e+" "+_d3d);
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
EditorPageBinding.prototype.enableSave=function(_d3f){
var _d40=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d40){
var _d41=UserInterface.getBinding(_d40);
if(_d3f){
_d41.enable();
}else{
_d41.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d42=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d42!=null){
UserInterface.getBinding(_d42).enable();
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
var _d43=this._windowBinding.getContentDocument().title;
if(_d43==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d44=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d46){
if(_d46.name=="__EVENTTARGET"&&_d44){
_d46.value=_d44;
}
list.add({name:_d46.name,value:_d46.value});
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
WizardPageBinding.prototype.handleAction=function(_d48){
WizardPageBinding.superclass.handleAction.call(this,_d48);
var _d49=_d48.target;
switch(_d48.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d49);
}else{
_d48.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d49);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d48.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d48.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d4a){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d4c=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d4a);
}
if(_d4c){
_d4c.setDisabled(!_d4a);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d4d,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d4d,arg);
var self=this;
switch(_d4d){
case BroadcastMessages.XHTML_MARKUP_ON:
this._activate(true);
if(arg!=null){
this._handleMarkup(arg);
}
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d51){
};
MarkupAwarePageBinding.prototype._activate=function(_d52){
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
var _d53=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d53.boxObject.getDimension().w;
_d53.hide();
var _d54=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d54+"px";
var self=this;
var _d56=this.bindingWindow.bindingMap.moreactionsbutton;
_d56.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d57){
self._showMoreActions();
_d57.consume();
}});
var _d58=this.bindingWindow.bindingMap.moreactionspopup;
_d58.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d59){
var item=_d59.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d5b,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d5b,arg);
switch(_d5b){
case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:
var self=this;
if(arg!=null&&arg.activePosition==this.getActivePosition()){
this._actionProfile=arg;
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
var _d5f=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_d5f!=null){
_d5f.hide();
}
},0);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _d60=this.bindingWindow.WindowManager;
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
var _d61=new String("");
this._actionProfile.each(function(_d62,list){
list.each(function(_d64){
_d61+=_d64.getHandle()+";"+_d64.getKey()+";";
if(_d64.isDisabled()){
_d61+="isDisabled='true';";
}
});
});
return _d61;
};
SystemToolBarBinding.prototype.handleAction=function(_d65){
SystemToolBarBinding.superclass.handleAction.call(this,_d65);
switch(_d65.type){
case ButtonBinding.ACTION_COMMAND:
var _d66=_d65.target;
this._handleSystemAction(_d66.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_d67){
if(_d67!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d69=list.getFirst();
var _d6a=_d69.node;
}
SystemAction.invoke(_d67,_d6a);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_d6d,list){
var _d6f=new List();
list.reset();
while(list.hasNext()){
var _d70=list.getNext();
var _d71=null;
if(_d70.isInToolBar()){
if(_d70.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_d71=self.getToolBarButtonBinding(_d70);
}
}
if(_d71!=null){
_d6f.add(_d71);
}
}
if(_d6f.hasEntries()){
var _d72=ToolBarGroupBinding.newInstance(doc);
_d6f.each(function(_d73){
_d72.add(_d73);
});
self.addLeft(_d72);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d74=this.bindingWindow.bindingMap.toolsbutton;
var _d75=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d76=_d74.bindingElement.offsetLeft-this._moreActionsWidth;
var _d77=0;
var _d78=new List();
var _d79,_d7a=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d79=_d7a.getNext())!=null){
if(!_d79.isVisible){
_d79.show();
}
_d77+=_d79.boxObject.getDimension().w;
if(_d77>=_d76){
_d78.add(_d79);
_d79.hide();
}
}
if(_d78.hasEntries()){
var _d7b=_d78.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_d7b).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d79=_d78.getNext())!=null){
this._moreActions.add(_d79.associatedSystemAction);
}
_d75.show();
}else{
this._moreActions=null;
_d75.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _d7c=this.bindingWindow.bindingMap.moreactionspopup;
_d7c.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_d7c.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_d7c.add(item);
}
_d7c.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_d7e){
var _d7f=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _d80=_d7e.getLabel();
var _d81=_d7e.getToolTip();
var _d82=_d7e.getImage();
var _d83=_d7e.isDisabled();
if(_d82&&_d82.indexOf("size=")==-1){
_d82=_d82+"&size="+this.getImageSize();
_d7f.imageProfile=new ImageProfile({image:_d82});
}
if(_d80){
_d7f.setLabel(_d80);
}
if(_d81){
_d7f.setToolTip(_d81);
}
if(_d7e.isDisabled()){
_d7f.disable();
}
_d7f.associatedSystemAction=_d7e;
return _d7f;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _d84=this.getDescendantBindingByLocalName("toolbarbutton");
if(_d84!=null){
_d84.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_d85){
var _d86=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_d85);
return UserInterface.registerBinding(_d86,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_d87){
var _d88=SystemTreeBinding.superclass.add.call(this,_d87);
if(!this._defaultTreeNode){
if(_d87 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_d87;
}
}
return _d88;
};
SystemTreeBinding.prototype.handleAction=function(_d89){
SystemTreeBinding.superclass.handleAction.call(this,_d89);
var _d8a=_d89.target;
switch(_d89.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_d8a.key);
_d89.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
},0);
if(_d89.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_d8a.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_d89.consume();
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
var _d8c=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_d8c);
}
this._restorableFocusHandle=null;
};
SystemTreeBinding.prototype._handleSystemTreeFocus=function(){
if(this.getFocusedTreeNodeBindings().hasEntries()){
this._computeClipboardSetup();
this._computeRefreshSetup();
if(this._isActionProfileAware){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,this.getCompiledActionProfile());
}
}
};
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_d8d){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_d8d);
var reg=this._entityTokenRegistry;
var _d8f=_d8d.node.getEntityToken();
if(reg.has(_d8f)){
reg.get(_d8f).add(_d8d);
}else{
reg.set(_d8f,new List([_d8d]));
}
var _d90=null;
if(this.isLockedToEditor){
if(_d8f==StageBinding.entityToken){
if(_d8d.node.isTreeLockEnabled()){
_d90=_d8d;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_d8d.node.getHandle()){
_d90=_d8d;
}
}
}
if(_d90!=null){
this.focusSingleTreeNodeBinding(_d90);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_d91){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_d91);
var reg=this._entityTokenRegistry;
var _d93=_d91.node.getEntityToken();
if(reg.has(_d93)){
var list=reg.get(_d93);
list.del(_d91);
if(!list.hasEntries()){
reg.del(_d93);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(_d91.isRefreshing){
this._updateRefreshingTrees(binding.key);
}
if(!this.isLockedToEditor){
if(_d91.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_d91.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _d97=this._refreshingTreeNodes;
if(_d97.hasEntries()&&_d97.has(key)){
_d97.del(key);
if(!_d97.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _d98=false;
var _d99=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_d98=false;
}else{
if(_d99.hasEntries()){
_d98=true;
while(_d98&&_d99.hasNext()){
var _d9a=_d99.getNext();
if(!_d9a.isDraggable){
_d98=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_d98;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_d9b,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_d9b,arg);
switch(_d9b){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_d9b,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_d9b);
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
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_FOCUS:
var self=this,_d9f=arg;
setTimeout(function(){
if(_d9f!=null){
self._focusTreeNodeByEntityToken(_d9f);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _da1=tab.perspectiveNode==null;
if(!_da1){
_da1=tab.perspectiveNode==this.perspectiveNode;
}
if(_da1){
var self=this,_da3=tab.getEntityToken();
setTimeout(function(){
if(_da3==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_da3);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_da4,_da5){
this.isLockFeatureFocus=true;
var _da6=null;
if(this._entityTokenRegistry.has(_da4)){
var list=this._entityTokenRegistry.get(_da4);
list.each(function(tn){
var _da9=true;
if(tn.node.isTreeLockEnabled()){
_da6=tn;
_da9=false;
}
return _da9;
});
if(_da6!=null){
if(!_da6.isFocused){
this.focusSingleTreeNodeBinding(_da6,true);
}else{
_da6.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_da6==null&&_da5!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_da4);
self._focusTreeNodeByEntityToken(_da4,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_dab){
var _dac=StageBinding.perspectiveNode.getEntityToken();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _dac=this.getRootTreeNodeBindings().getFirst().node.getEntityToken();
}
var _dad=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_dac,_dab,_dad);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _db0=this._treeNodeBindings;
var _db1=new Map();
function fix(_db2,list){
if(!_db2.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_db0.has(node.getHandle())){
var _db5=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_db1.set(node.getHandle(),_db5);
_db2.add(_db5);
}
});
_db2.attachRecursive();
}
}
_db2.open(true);
}
map.each(function(_db6,list){
if(_db0.has(_db6)){
var _db8=_db0.get(_db6);
fix(_db8,list);
}else{
if(_db1.has(_db6)){
var _db9=_db1.get(_db6);
fix(_db9,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_dba,arg){
switch(_dba){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _dbc=arg;
if(_dbc!=null){
this._invokeServerRefresh(_dbc);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _dbd=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_dbd;
_dbd.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _dbd=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_dbd;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_dbe){
if(_dbe!=null&&_dbe=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_dbe)){
var list=this._entityTokenRegistry.get(_dbe).reset();
this._refreshToken=_dbe;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _dc0=list.getNext();
this._refreshingTreeNodes.set(_dc0.key,true);
setTimeout(function(){
_dc0.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _dc1=this.getFocusedTreeNodeBindings().getFirst();
if(_dc1){
var _dc2=_dc1.getLabel();
var _dc3=_dc1.getAncestorBindingByLocalName("treenode");
if(_dc3){
_dc1=_dc3;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_dc1.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _dc4=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_dc4,[_dc2]);
}
_dc1.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _dc5=SystemTreeBinding.clipboard;
if(_dc5){
var type=_dc5.dragType;
var _dc7=this.getFocusedTreeNodeBindings().getFirst();
if(_dc7.dragAccept){
if(_dc7.acceptor.isAccepting(type)){
this._performPaste(_dc7);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_dc8){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_dc8.node.hasDetailedDropSupport()){
if(_dc8.node.hasChildren()){
var _dca=_dc8.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_dcb,_dcc){
if(_dcb==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _dcd=_dcc.get("switch");
var _dce=_dcc.get("sibling");
if(_dcd=="after"){
_dce++;
}
var _dcf=_dc8.accept(SystemTreeBinding.clipboard,_dce);
if(_dcf){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_dca);
}else{
Application.lock(self);
var _dd0=_dc8.accept(SystemTreeBinding.clipboard,0);
if(_dd0){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _dd0=_dc8.accept(SystemTreeBinding.clipboard,0);
if(_dd0){
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
SystemTreeBinding.prototype.collapse=function(_dd1){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
if(_dd1){
this.blurSelectedTreeNodes();
var _dd2=this.getRootTreeNodeBindings();
_dd2.each(function(_dd3){
if(_dd3.isContainer&&_dd3.isOpen){
_dd3.close();
_dd3.hasBeenOpened=false;
_dd3.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_dd4){
if(_dd4!=this.isLockedToEditor){
this.isLockedToEditor=_dd4;
if(_dd4){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _dd6=this.getRootTreeNodeBindings();
_dd6.each(function(_dd7){
var _dd8=_dd7.getOpenSystemNodes();
if(_dd8!=null&&_dd8.hasEntries()){
list.merge(_dd8);
}else{
if(_dd7.isOpen){
list.add(_dd7.node);
}
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_dd9){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_dd9);
if(_dd9!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _ddb=new Map();
var _ddc=this.getFocusedTreeNodeBindings();
var _ddd=_ddc.getFirst().node.getActionProfile();
var self=this;
_ddd.each(function(_ddf,list){
var _de1=new List();
list.each(function(_de2){
if(_de2.getActivePositions()&self._activePosition){
_de1.add(_de2);
}
});
if(_de1.hasEntries()){
_ddb.set(_ddf,_de1);
}
});
_ddb.activePosition=this._activePosition;
return _ddb;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_de3,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_de3,arg);
switch(_de3){
case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:
if(arg!=null){
this._actionProfile=arg;
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
var _de8=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_de8.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _de9=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_de9.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_dea){
SystemTreePopupBinding.superclass.handleAction.call(this,_dea);
switch(_dea.type){
case MenuItemBinding.ACTION_COMMAND:
var _deb=_dea.target;
var _dec=_deb.associatedSystemAction;
if(_dec){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dee=list.getFirst();
var _def=_dee.node;
}
SystemAction.invoke(_dec,_def);
}else{
var cmd=_deb.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _df2=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_df2=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_df2=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_df2=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_df2=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_df2){
setTimeout(function(){
EventBroadcaster.broadcast(_df2);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _df3=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_df3.hasNext()){
var _df4=UserInterface.getBinding(_df3.getNext());
if(!_df4.getProperty("rel")){
_df4.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _df6=new List();
var self=this;
this._actionProfile.each(function(_df8,list){
var _dfa=MenuGroupBinding.newInstance(doc);
list.each(function(_dfb){
var _dfc=self.getMenuItemBinding(_dfb);
_dfa.add(_dfc);
});
_df6.add(_dfa);
});
_df6.reverse();
while(_df6.hasNext()){
this._bodyBinding.addFirst(_df6.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_dfd){
var _dfe=MenuItemBinding.newInstance(this.bindingDocument);
var _dff=_dfd.getLabel();
var _e00=_dfd.getToolTip();
var _e01=_dfd.getImage();
var _e02=_dfd.getDisabledImage();
var _e03=_dfd.isCheckBox();
if(_dff){
_dfe.setLabel(_dff);
}
if(_e00){
_dfe.setToolTip(_e00);
}
if(_e01){
_dfe.imageProfile=new ImageProfile({image:_e01,imageDisabled:_e02});
}
if(_e03){
_dfe.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_dfd.isChecked()){
_dfe.check(true);
}
}
if(_dfd.isDisabled()){
_dfe.disable();
}
_dfe.associatedSystemAction=_dfd;
return _dfe;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e07=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e07=UserInterface.getBinding(node);
if(_e07.isDisabled){
_e07=null;
}
}
break;
}
if(_e07!=null&&_e07.node!=null&&_e07.node.getActionProfile()!=null){
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
var _e08=this.node.getLabel();
if(_e08){
this.setLabel(_e08);
}
var _e09=this.node.getToolTip();
if(_e09){
this.setToolTip(_e09);
}
var _e0a=this.node.getHandle();
if(_e0a){
this.setHandle(_e0a);
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
var _e0d="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e0d+=list.getNext();
if(list.hasNext()){
_e0d+=" ";
}
}
this.setProperty("dragaccept",_e0d);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e0f){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e0f);
switch(_e0f.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e0f.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e0f.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e10,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e10,arg);
switch(_e10){
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
var _e13=null;
var _e14=this.node.getImageProfile();
if(_e14){
if(this.isOpen){
_e13=_e14.getActiveImage();
}else{
_e13=_e14.getDefaultImage();
}
}
if(!_e13){
_e13=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e13;
};
SystemTreeNodeBinding.prototype.open=function(_e15){
var _e16=this.isContainer&&!this.isOpen;
var _e17=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e16&&(_e17||SystemTreeBinding.HAS_NO_MEMORY)&&_e15!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e18=null;
if(this.isContainer){
_e18=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e18);
Application.unlock(self);
StatusBar.clear();
}
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e1a){
if(_e1a!=null){
this._refreshBranch(_e1a);
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
var _e1b=new List();
var _e1c=this.node.getChildren();
this.empty();
if(_e1c.hasEntries()){
this._insertTreeNodesRegulated(_e1c);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e1d){
var _e1e=0;
var _e1f=new List([]);
while(_e1d.hasEntries()&&_e1e<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e20=SystemTreeNodeBinding.newInstance(_e1d.extractFirst(),this.bindingDocument);
_e20.autoExpand=this.autoExpand;
this.add(_e20);
_e20.attach();
_e1e++;
if(this.autoExpand){
if(_e1e==1&&!_e1d.hasEntries()||LastOpenedSystemNodes.isOpen(_e20)){
_e1f.add(_e20);
}
}
}
if(_e1d.hasEntries()){
this._insertBufferTreeNode(_e1d);
}
_e1f.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e23){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e25=this.node.getDescendantBranch(list);
if(_e25.hasEntries()){
this.XXX(_e25);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e26){
var self=this;
var map=new Map();
this.empty();
_e26.each(function(key,_e2a){
if(_e2a.hasEntries()){
_e2a.each(function(node){
var _e2c=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e2c);
if(map.has(key)){
var _e2d=map.get(key);
_e2d.add(_e2c);
_e2d.isOpen=true;
_e2d.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e2c);
}else{
}
}
});
}
});
this.attachRecursive();
_e26.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e2e=new TreeCrawler();
var _e2f=new List();
_e2e.mode=TreeCrawler.MODE_GETOPEN;
_e2e.crawl(this.bindingElement,_e2f);
if(_e2f.hasEntries()){
_e2f.extractFirst();
}
_e2e.dispose();
return _e2f;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e30=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e30=new List([this.node]);
list.each(function(_e32){
_e30.add(_e32.node);
});
}
return _e30;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e33,_e34){
var _e35=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e33 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e33.node.getData(),this.node.getData(),_e34?_e34:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e35);
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
SystemTreeNodeBinding.newInstance=function(node,_e39){
var _e3a=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e39);
var _e3b=UserInterface.registerBinding(_e3a,SystemTreeNodeBinding);
_e3b.node=node;
return _e3b;
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
SystemPageBinding.prototype.setPageArgument=function(_e3c){
this.node=_e3c;
SystemPageBinding.superclass.setPageArgument.call(this,_e3c);
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
var _e3d=this.node.getChildren();
if(_e3d.hasEntries()){
while(_e3d.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e3d.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e3f=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e3f.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e41=new TreeCrawler();
var _e42=new List();
_e41.mode=TreeCrawler.MODE_GETOPEN;
_e41.crawl(this.bindingElement,_e42);
_e41.dispose();
var list=new List([this.node]);
_e42.each(function(_e44){
list.add(_e44.node);
});
this._tree.empty();
var _e45=this.node.getDescendantBranch(list);
if(_e45.hasEntries()){
var self=this;
var map=new Map();
_e45.each(function(key,_e49){
_e49.each(function(node){
var _e4b=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e4b);
if(map.has(key)){
var _e4c=map.get(key);
_e4c.add(_e4b);
_e4c.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e4b);
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
SystemPageBinding.prototype.handleAction=function(_e4d){
SystemPageBinding.superclass.handleAction.call(this,_e4d);
switch(_e4d.type){
case ButtonBinding.ACTION_COMMAND:
var _e4e=_e4d.target;
switch(_e4e.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e4e.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e4f,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e4f,arg);
switch(_e4f){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e51=arg;
if(this.node&&this.node.getEntityToken()==_e51){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e51);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e51);
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
StageContainerBinding.prototype.handleBroadcast=function(_e53,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e53,arg);
var _e55=this.bindingWindow.WindowManager;
switch(_e53){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e55.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e55.WINDOW_RESIZED_BROADCAST:
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
var _e57=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e57.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_e58){
if(StageBinding.isViewOpen(_e58)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e58);
}else{
var _e59=ViewDefinitions[_e58];
StageBinding.presentViewDefinition(_e59);
}
};
StageBinding.isViewOpen=function(_e5a){
return StageBinding.bindingInstance._activeViewDefinitions[_e5a]!=null;
};
StageBinding.presentViewDefinition=function(_e5b){
if(_e5b.label!=null){
var _e5c=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e5c,[_e5b.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e5b);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_e5e,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _e60=System.getPerspectiveNodes();
if(_e60.hasEntries()){
this._initializeSystemViewDefinitions(_e60);
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
var _e62=null;
if(LocalStore.isEnabled){
_e62=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_e62&&ViewDefinitions[_e62]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_e62));
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
var _e64=root.getActionProfile();
if(_e64&&_e64.hasEntries()){
var _e65=top.app.bindingMap.toolsmenugroup;
if(_e65){
_e64.each(function(_e66,list){
list.each(function(_e68){
var item=MenuItemBinding.newInstance(_e65.bindingDocument);
item.setLabel(_e68.getLabel());
item.setToolTip(_e68.getToolTip());
item.setImage(_e68.getImage());
item.setDisabled(_e68.isDisabled());
item.associatedSystemAction=_e68;
var _e6a=_e65;
var tag=_e68.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_e6a=top.app.bindingMap.translationsmenugroup;
break;
}
}
_e6a.add(item);
});
});
_e65.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_e6c){
while(_e6c.hasNext()){
var node=_e6c.getNext();
var _e6e=node.getHandle();
ViewDefinitions[_e6e]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_e6f){
StageBinding.superclass.handleAction.call(this,_e6f);
var _e70=_e6f.target;
switch(_e6f.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_e70;
this._inflateBinding(_e70);
_e6f.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_e70;
this._inflateBinding(_e70);
_e6f.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_e70);
_e6f.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e70 instanceof DockBinding){
switch(_e70.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_e70.reference,_e70);
break;
}
this.handleAttachedDock(_e70);
_e6f.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_e70 instanceof DockBinding){
this.handleSelectedDockTab(_e70.getSelectedTabBinding());
_e6f.consume();
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
_e6f.consume();
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
_e6f.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e6f);
};
StageBinding.prototype.handleBroadcast=function(_e72,arg){
StageBinding.superclass.handleBroadcast.call(this,_e72,arg);
switch(_e72){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _e74=arg;
this._dontView(_e74);
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
StageBinding.prototype._showStart=function(_e76){
if(_e76!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _e79=this.bindingWindow.bindingMap.maindecks;
if(_e76){
_e79.select("startdeck");
view.show();
}else{
view.hide();
_e79.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_e76;
}
};
StageBinding.prototype._inflateBinding=function(_e7a){
for(var _e7b in ViewDefinitions){
var _e7c=ViewDefinitions[_e7b];
if(_e7c instanceof SystemViewDefinition){
_e7a.mountDefinition(_e7c);
}
}
var _e7d=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_e7d){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _e80=new StageCrawler();
_e80.mode=mode;
_e80.crawl(this.bindingElement);
_e80.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_e81){
var _e82=_e81.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_e82);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_e82));
}
};
StageBinding.prototype.handleAttachedDock=function(_e83){
var _e84=_e83.getTabBindings();
if(_e84.hasEntries()){
while(_e84.hasNext()){
var _e85=_e84.getNext();
var _e86=_e85.getHandle();
if(_e86){
if(_e86=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _e87=ViewDefinitions[_e86];
if(_e87){
this._view(_e83,_e85,_e87,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_e86+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_e88){
var _e89=null;
var _e8a=false;
switch(_e88.position){
case Dialog.MODAL:
_e89=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_e89=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_e88.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_e89=this._dockBindings.get(_e88.position);
break;
default:
var _e8b=this._decksBinding.getSelectedDeckBinding();
_e89=_e8b.getDockBindingByReference(_e88.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _e8c=this.bindingWindow.bindingMap.maindecks;
_e8c.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_e8a=true;
}
break;
}
if(!_e8a){
if(_e89!=null){
this._view(_e89,null,_e88,true);
}else{
throw "StageBinding: Could not position view: "+_e88.handle;
}
}
};
StageBinding.prototype._view=function(_e8d,_e8e,_e8f,_e90){
var _e91=_e8f.handle;
if(_e8f.isMutable){
_e91+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_e91]){
var _e92=ViewBinding.getInstance(_e91);
if(_e92!=null){
_e92.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_e91);
}
}else{
this._activeViewDefinitions[_e91]=_e8f;
Application.lock(this);
switch(_e8d.constructor){
case DockBinding:
if(_e90){
_e8d.prepareNewView(_e8f);
}else{
_e8d.prepareOpenView(_e8f,_e8e);
}
break;
case StageDialogBinding:
if(_e90){
_e8d.prepareNewView(_e8f);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_e93){
if(this._activeViewDefinitions[_e93]!=null){
delete this._activeViewDefinitions[_e93];
}else{
this.logger.debug("Could not unregister active view: "+_e93);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_e94){
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
this.addFilter(function(_e96){
var _e97=UserInterface.getBinding(_e96);
var _e98=null;
if(_e97){
switch(_e97.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_e97.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_e97.handleUnMaximization();
break;
}
break;
case DockBinding:
_e98=NodeCrawler.SKIP_NODE;
break;
}
}
return _e98;
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
var _e99=null;
this._dialogs.each(function(_e9a){
if(!_e9a.isVisible){
_e99=_e9a;
}
return _e99!=null;
});
if(!_e99){
this._newInstance();
_e99=this._dialogs.getLast();
}
_e99.setModal(false);
return _e99;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _e9b=this.getInstance();
_e9b.setModal(true);
return _e9b;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _e9c=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_e9c);
_e9c.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_e9d){
if(_e9d instanceof DialogViewDefinition){
var _e9e=ViewBinding.newInstance(this.bindingDocument);
_e9e.setDefinition(_e9d);
_e9e.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_e9d.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_e9d.handler)){
this._dialogResponseHandler=_e9d.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_e9e;
this._body.add(_e9e);
_e9e.attach();
_e9e.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_e9f){
StageDialogBinding.superclass.handleAction.call(this,_e9f);
var _ea0=_e9f.target;
switch(_e9f.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_ea0);
_e9f.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_ea0.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_e9f.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_ea0.response){
this._handleDialogPageResponse(_ea0);
}
_e9f.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_e9f.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_e9f.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_ea0.dispose();
_e9f.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_e9f.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_e9f.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_e9f.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_e9f.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_e9f.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_ea0==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_ea1,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_ea1,arg);
switch(_ea1){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_ea3){
var _ea4=new FitnessCrawler();
var list=new List();
if(_ea3){
_ea4.mode=FitnessCrawler.MODE_BRUTAL;
}
_ea4.crawl(this.bindingElement,list);
_ea4.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_ea6){
_ea6.fit(_ea3);
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
var _ea7=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_ea7){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_ea9){
var cmd=_ea9.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_eab){
if(_eab.bindingDocument==this._viewBinding.getContentDocument()){
if(_eab instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_eab);
}
this._pageBinding=_eab;
if(_eab.height=="auto"){
_eab.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_eab);
_eab.enableAutoHeightLayoutMode(false);
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
if(_eab.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_eab);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_eac){
var _ead=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_ead){
var _eae=UserInterface.getBinding(_ead);
_eae.setDisabled(_eac);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_eaf){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_eaf.response,_eaf.result!=null?_eaf.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_eb0){
if(_eb0.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_eb0);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_eb2){
switch(_eb2.type){
case MenuItemBinding.ACTION_COMMAND:
if(_eb2.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_eb2.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_eb3){
var _eb4=_eb3.label;
var _eb5=_eb3.image;
var _eb6=_eb3.width;
var _eb7=_eb3.height;
var _eb8=_eb3.controls;
var _eb9=_eb3.isResizable;
if(_eb4){
this.setLabel(_eb4);
}
if(_eb5){
this.setImage(_eb5);
}
if(_eb6||_eb7){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_eb6?_eb6:old.w;
}else{
nev.w=old.w;
}
nev.h=(_eb7!=null&&_eb7!="auto")?_eb7:old.h;
this.setDimension(nev);
}
if(_eb8){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_ebd=new List(_eb8.split(" "));
while((type=_ebd.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_eb9!=this._isResizable){
this.setResizable(_eb9);
}
if(_eb7=="auto"){
this._fixAutoHeight(_eb3);
}
if(_eb3==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_ebe){
var dim=this.getDimension();
var _ec0=0;
var _ec1=0;
if(_ebe.isDialogSubPage){
_ebe=this._pageBinding;
}
if(this._isFirstPage){
_ec0=_ebe.width!=null?_ebe.width:dim.w;
}else{
_ec0=dim.w;
}
_ec1=_ebe.bindingElement.offsetHeight;
_ec1+=this._titlebar.bindingElement.offsetHeight;
_ec1+=4;
if(_ec1<dim.h){
_ec1=dim.h;
}
if(_ebe.minheight!=null){
if(_ec1<_ebe.minheight){
_ec1=_ebe.minheight;
}
}
this.setDimension(new Dimension(_ec0,_ec1));
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
if(!Client.isWindows){
dim.w-=6;
}
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
StageDialogBinding.newInstance=function(_ec4){
var _ec5=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_ec4);
var _ec6=UserInterface.registerBinding(_ec5,StageDialogBinding);
_ec6.setProperty("controls","minimize maximize close");
return _ec6;
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
this.addFilter(function(_ec7,list){
var _ec9=null;
var _eca=UserInterface.getBinding(_ec7);
if(!_eca.isVisible){
_ec9=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _ec9;
});
this.addFilter(function(_ecb,list){
var _ecd=null;
var _ece=UserInterface.getBinding(_ecb);
if(_ece.isAttached){
if(Interfaces.isImplemented(IFit,_ece)){
if(!_ece.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_ece);
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
StageDecksBinding.prototype.mountDefinition=function(_ecf){
var _ed0=StageDeckBinding.newInstance(this.bindingDocument);
_ed0.handle=_ecf.handle;
_ed0.perspectiveNode=_ecf.node;
this._decks[_ed0.handle]=_ed0;
this.add(_ed0);
_ed0.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_ed1){
var _ed2=this._decks[_ed1];
StageBinding.perspectiveNode=_ed2.perspectiveNode;
this.select(_ed2);
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
StageDeckBinding.prototype.handleAction=function(_ed3){
StageDeckBinding.superclass.handleAction.call(this,_ed3);
var _ed4=_ed3.target;
switch(_ed3.type){
case WindowBinding.ACTION_LOADED:
if(_ed4==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_ed3.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ed4 instanceof DockBinding){
this._dockBindings.set(_ed4.reference,_ed4);
_ed4.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_ed3.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_ed3.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ed3);
StageDeckBinding.superclass.handleAction.call(this,_ed3);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ed6=new StageCrawler();
_ed6.mode=mode;
_ed6.crawl(this.windowBinding.getContentDocument().body);
_ed6.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_ed7){
return this._dockBindings.get(_ed7);
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
StageDeckBinding.newInstance=function(_ed9){
var _eda=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_ed9);
var _edb=UserInterface.registerBinding(_eda,StageDeckBinding);
return _edb;
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
StageSplitBoxBinding.prototype.handleAction=function(_edc){
StageSplitBoxBinding.superclass.handleAction.call(this,_edc);
StageBoxAbstraction.handleAction.call(this,_edc);
var _edd=_edc.target;
var _ede=null;
var _edf=null;
switch(_edc.type){
case DockBinding.ACTION_EMPTIED:
_edf=this.getChildBindingByLocalName("splitter");
if(_edf.isVisible){
_edf.hide();
}
_ede=this.getDescendantBindingsByLocalName("dock");
if(_ede.getFirst().isEmpty&&_ede.getLast().isEmpty){
if(_ede.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_edc.consume();
break;
case DockBinding.ACTION_OPENED:
_ede=this.getDescendantBindingsByLocalName("dock");
if(!_ede.getFirst().isEmpty&&!_ede.getLast().isEmpty){
_edf=this.getChildBindingByLocalName("splitter");
if(!_edf.isVisible){
_edf.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_edc.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_edd!=this){
_edf=this.getChildBindingByLocalName("splitter");
if(_edf.isVisible){
_edf.hide();
}
this.invokeLayout();
_edc.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_edd!=this){
var _ee0=this.getChildBindingsByLocalName("splitpanel");
if(_ee0.getFirst().isVisible&&_ee0.getLast().isVisible){
_edf=this.getChildBindingByLocalName("splitter");
if(!_edf.isVisible){
_edf.show();
}
}
this.invokeLayout();
_edc.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_ee1){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_ee1);
switch(_ee1.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_ee1.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _ee2=this.getChildBindingsByLocalName("splitpanel");
return _ee2.getFirst().isVisible&&_ee2.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _ee3=this.getChildBindingsByLocalName("splitpanel");
return _ee3.getFirst().isFixed&&_ee3.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_ee4){
StageSplitPanelBinding.superclass.handleAction.call(this,_ee4);
StageBoxAbstraction.handleAction.call(this,_ee4);
switch(_ee4.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_ee4.type==StageSplitBoxBinding.ACTION_HIDE){
_ee4.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_ee4.type==DockBinding.ACTION_EMPTIED){
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
if(_ee4.type==StageSplitBoxBinding.ACTION_SHOW){
_ee4.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _ee7=_ee4.target;
if(_ee7!=this&&_ee7.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _ee8=_ee7._containingSplitBoxBinding;
if(_ee8.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _ee9=_ee8.getChildBindingsByLocalName("splitpanel");
var _eea=_ee9.getFirst();
var _eeb=_ee9.getLast();
if(this.isFixed==true){
if(!_eea.isFixed||!_eeb.isFixed||(!_ee8.hasBothPanelsVisible()&&_ee7.isMinimizedForReal)){
this.setFix(false);
_ee4.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_ee8.hasBothPanelsFixed()||(!_ee8.hasBothPanelsVisible()&&_ee7.isMinimizedForReal)){
this.setFix(_ee7.getContainedDock().getHeight());
_ee4.consume();
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
var _eec=this.getContainedDock();
if(_eec){
if(this.isMaximizePrepared==true){
}else{
_eec.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _eed=this.getContainedDock();
if(_eed){
if(_eed.type==DockBinding.TYPE_EDITORS){
if(_eed.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_eed.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _eee=this.getContainedDock();
if(_eee){
_eee.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_eee);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _eef=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ef0=this.getContainedDock();
if(_ef0){
_ef0.collapse(_eef);
if(!_eef){
this.setFix(_ef0.getHeight());
}else{
this.setFix(_ef0.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ef0&&_ef0.isActive){
_ef0.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_ef0);
}
};
StageSplitPanelBinding.prototype.normalize=function(_ef1){
var _ef2=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ef3=this.getContainedDock();
if(_ef3){
if(this.isMinimized==true){
_ef3.unCollapse(_ef2);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_ef1){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ef3){
_ef3.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_ef3);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_ef4){
var _ef5=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_ef5=false;
}
}
if(_ef5==true){
this._invisibilize(_ef4);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_ef7){
if(_ef7!=this._isInvisibilized){
if(_ef7){
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
StageSplitterBinding.prototype.onDragStart=function(_ef8){
var _ef9=top.app.bindingMap.stagesplittercover;
var _efa=this._containingSplitBoxBinding.getOrient();
switch(_efa){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ef9.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ef9.bindingElement.style.cursor="n-resize";
break;
}
_ef9.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_efa);
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
StageSplitterBodyBinding.prototype.setOrient=function(_f00){
this._orient=_f00;
this.attachClassName(_f00);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _f02=true;
var _f03=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f03=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_f02=false;
break;
}
if(_f02){
this.bindingElement.style.left=pos.x+"px";
}
if(_f03){
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
StageBoxAbstraction.handleAction=function(_f05){
switch(_f05.type){
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
if(_f05.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f05.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f06=this.bindingElement.style;
_f06.position="absolute";
_f06.width="100%";
_f06.height="100%";
_f06.top="0";
_f06.left="0";
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
var _f07=this.bindingElement.style;
_f07.position="relative";
_f07.width="auto";
_f07.height="auto";
_f07.top="auto";
_f07.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f08,_f09){
var _f0a=_f08.bindingElement.style;
var _f0b=_f08.bindingElement.parentNode;
var box=_f08._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f09){
_f08._unmodifiedFlexMethod=_f08.flex;
_f08.flex=function(){
_f0a.width=_f0b.offsetWidth+"px";
_f0a.height=_f0b.offsetHeight+"px";
};
}else{
_f0a.width="100%";
_f0a.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f0a.width="auto";
_f0a.height="auto";
box.reflex(true);
},0);
}
_f08.flex=_f08._unmodifiedFlexMethod;
_f08._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f0d){
var _f0e=_f0d.target;
switch(_f0d.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f0e instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f0d);
_f0d.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f0d.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f0f){
var mode=null;
switch(_f0f.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f11){
StageMenuBarBinding.superclass.handleAction.call(this,_f11);
switch(_f11.type){
case MenuItemBinding.ACTION_COMMAND:
var _f12=_f11.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f12){
SystemAction.invoke(_f12,this._rootNode);
}
}
_f11.consume();
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
var _f13=this.getProperty("handle");
if(_f13){
this._handle=_f13;
if(StageBinding.isViewOpen(_f13)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f13);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f15){
this.setProperty("handle",_f15);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f16,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f16,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f16){
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
StageViewMenuItemBinding.newInstance=function(_f18){
var _f19=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f18);
UserInterface.registerBinding(_f19,StageViewMenuItemBinding);
return UserInterface.getBinding(_f19);
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
StageStatusBarBinding.prototype.setLabel=function(_f1a){
this._label.setLabel(_f1a);
};
StageStatusBarBinding.prototype.setImage=function(_f1b){
this._label.setImage(_f1b);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f1c){
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
var _f1d=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f1e=_f1d.getAssociatedView();
var _f1f=_f1e.getContentWindow().bindingMap.tree;
var _f20=_f1f.getFocusedTreeNodeBindings();
if(!_f20.hasEntries()&&StageBinding.treeSelector){
_f20=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f20;
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
ExplorerBinding.prototype.handleAction=function(_f21){
ExplorerBinding.superclass.handleAction.call(this,_f21);
var _f22=_f21.target;
switch(_f21.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f21.consume();
break;
case Binding.ACTION_DRAG:
if(_f22 instanceof ExplorerSplitterBinding){
_f22.dragger.registerHandler(this);
}
_f21.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f24){
this._menuBinding.setSelectionByHandle(_f24);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f25){
if(_f25 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f25);
this._menuBinding.mountDefinition(_f25);
}
};
ExplorerBinding.prototype.onDragStart=function(_f26){
var _f27=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f27.hasEntries()){
var _f28=_f27.getFirst();
this._dragStart=_f28.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f28.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f2c){
if(_f2c instanceof SystemViewDefinition){
var _f2d=ViewBinding.newInstance(this.bindingDocument);
_f2d.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f2d.setDefinition(_f2c);
var _f2e=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f2e.setAssociatedView(_f2d);
this._decks[_f2c.handle]=_f2e;
_f2e.add(_f2d);
this.add(_f2e);
function attach(){
_f2e.attach();
_f2d.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f2f){
var _f30=this._decks[_f2f];
this.select(_f30);
};
DecksBinding.prototype.expandBy=function(_f31){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f33=this.bindingElement.offsetHeight+_f31;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f33+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f35){
var _f36=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f35);
return UserInterface.registerBinding(_f36,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f37){
this._viewBinding=_f37;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f38=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f39=this._viewBinding.getDefinition().label;
StatusBar.busy(_f38,[_f39]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f3a){
ExplorerDeckBinding.superclass.handleAction.call(this,_f3a);
var _f3b=_f3a.target;
switch(_f3a.type){
case PageBinding.ACTION_INITIALIZED:
if(_f3b instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f3b.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f3c,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f3c,arg);
switch(_f3c){
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
var _f3e=null;
if(this._isExplorerDeckBindingInitialized){
_f3e=this._viewBinding.getDefinition().label;
}else{
_f3e=DockTabBinding.LABEL_TABLOADING;
}
return _f3e;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f3f=null;
if(this._isExplorerDeckBindingInitialized){
_f3f=this._viewBinding.getDefinition().image;
}else{
_f3f=DockTabBinding.IMG_TABLOADING;
}
return _f3f;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f40=null;
if(this._isExplorerDeckBindingInitialized){
_f40=this._viewBinding.getDefinition().toolTip;
}
return _f40;
};
ExplorerDeckBinding.newInstance=function(_f41){
var _f42=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f41);
return UserInterface.registerBinding(_f42,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f43){
switch(_f43.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f43.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f43.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f43);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f44){
this._maxButtons.set(_f44.handle,this._mountMaxButton(_f44));
this._minButtons.set(_f44.handle,this._mountMinButton(_f44));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f45){
var _f46=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f46.setLabel(_f45.label);
_f46.setToolTip(_f45.toolTip);
_f46.handle=_f45.handle;
_f46.node=_f45.node;
this._maxGroup.add(_f46);
this._maxList.add(_f46);
_f46.attach();
return _f46;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f47){
var _f48=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f48.setLabel(_f47.label);
_f48.setToolTip(_f47.label);
_f48.handle=_f47.handle;
_f48.node=_f47.node;
this._minGroup.addFirst(_f48);
this._minList.add(_f48);
_f48.attach();
_f48.hide();
return _f48;
};
ExplorerMenuBinding.prototype.handleAction=function(_f49){
ExplorerMenuBinding.superclass.handleAction.call(this,_f49);
switch(_f49.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f4a=_f49.target;
var _f4b=_f4a.getCheckedButtonBinding();
var _f4c=_f4b.handle;
switch(_f4a){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f4c),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f4c),true);
break;
}
this._selectedHandle=_f4c;
this._selectedTag=_f4b.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f49.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f4d){
var _f4e=this._maxButtons.get(_f4d);
if(_f4e){
_f4e.check();
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
var _f4f=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f4f=true;
}
return _f4f;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f51=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f51=true;
}
return _f51;
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
ExplorerToolBarBinding.newInstance=function(_f52){
var _f53=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f52);
return UserInterface.registerBinding(_f53,ExplorerToolBarBinding);
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
var _f54=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f55=_f54?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f55);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f56,_f57){
var _f58=(_f57==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f59=DOMUtil.createElementNS(Constants.NS_UI,_f58,_f56);
var _f5a=UserInterface.registerBinding(_f59,ExplorerToolBarButtonBinding);
_f5a.explorerToolBarButtonType=_f57;
return _f5a;
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
EditorBinding.registerComponent=function(_f5b,_f5c){
var _f5d=EditorBinding._components;
var _f5e=EditorBinding._editors;
var key=_f5c.key;
var _f60=Interfaces.isImplemented(IWysiwygEditorComponent,_f5b);
if(!_f60){
_f60=Interfaces.isImplemented(ISourceEditorComponent,_f5b);
}
if(_f60){
if(_f5e.has(key)){
_f5e.get(key).initializeEditorComponent(_f5b);
}else{
if(!_f5d.has(key)){
_f5d.set(key,new List());
}
_f5d.get(key).add(_f5b);
}
}else{
throw "Editor component interface not implemented: "+_f5b;
}
};
EditorBinding.claimComponents=function(_f61,_f62){
var _f63=EditorBinding._components;
var _f64=EditorBinding._editors;
var key=_f62.key;
_f64.set(key,_f61);
var list=null;
if(_f63.has(key)){
list=_f63.get(key).copy();
_f63.del(key);
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
var _f68=this.getProperty("value");
if(_f68!=null){
_f68=decodeURIComponent(_f68);
this._startContent=_f68;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _f6a=this.bindingWindow.DataManager;
_f6a.unRegisterDataBinding(name);
}
};
EditorBinding.prototype._initialize=function(){
this.subscribe(BroadcastMessages.APPLICATION_BLURRED);
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
EditorBinding.prototype.initializeEditorComponents=function(_f6c){
var _f6d=EditorBinding.claimComponents(this,_f6c);
if(_f6d!=null){
while(_f6d.hasNext()){
this.initializeEditorComponent(_f6d.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _f6f=this.bindingWindow.DataManager;
if(_f6f.getDataBinding(name)){
_f6f.unRegisterDataBinding(name);
}
_f6f.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _f70=this.getEditorDocument();
if(_f70!=null){
Application.framework(_f70);
DOMEvents.addEventListener(_f70,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_f70,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_f70,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_f70,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_f72){
if(!this.isDirty){
if(_f72==true){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
}else{
var self=this;
setTimeout(function(){
self._checkForRealDirty();
},0);
}
}
};
EditorBinding.prototype._checkForRealDirty=function(){
var _f74=this.getCheckSum();
if(_f74!=this._checksum){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
this._checksum=_f74;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _f75=null;
if(Binding.exists(this._pageBinding)){
_f75=this._pageBinding.getCheckSum(this._checksum);
}
return _f75;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _f77=DOMEvents.getTarget(e);
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
if(_f77.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_f79,arg){
EditorBinding.superclass.handleBroadcast.call(this,_f79,arg);
var _f7b=null;
switch(_f79){
case BroadcastMessages.APPLICATION_BLURRED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _f7c=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_f7c=false;
}
}
}else{
_f7b=DOMEvents.getTarget(arg);
if(_f7b&&_f7b.ownerDocument==this.getEditorDocument()){
_f7c=false;
}
}
if(_f7c){
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
EditorBinding.prototype._activateEditor=function(_f7d){
if(_f7d!=this._isActivated){
this._isActivated=_f7d;
EditorBinding.isActive=_f7d;
var _f7e=this.getEditorWindow().standardEventHandler;
var _f7f=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_f7f!=null){
if(_f7d){
if(this.hasBookmark()){
this.deleteBookmark();
}
_f7f.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_f7e.enableNativeKeys(true);
}else{
_f7f.disable();
_f7e.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _f80=this.getEditorDocument().selection.createRange();
_f80.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _f81=false;
try{
if(!Client.isExplorer){
var _f82=this.getEditorWindow().getSelection();
if(_f82!=null){
_f81=_f82.toString().length>0;
if(!_f81){
var _f83=_f82.getRangeAt(0);
var frag=_f83.cloneContents();
var _f85=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_f85.appendChild(frag.firstChild);
}
var img=_f85.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_f81=true;
}
}
}
}
}else{
var _f83=this.getEditorDocument().selection.createRange();
_f81=(_f83&&_f83.text)&&_f83.text.length>0;
}
}
catch(exception){
}
return _f81;
};
EditorBinding.prototype.isCommandEnabled=function(_f87){
var _f88=true;
switch(_f87){
case "Cut":
case "Copy":
case "Paste":
_f88=this.getEditorDocument().queryCommandEnabled(_f87);
break;
}
return _f88;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f8c=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _f8d=null;
if(cmd=="Paste"){
_f8d=null;
}else{
_f8d=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_f8d);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_f8c=true;
}
break;
}
return _f8c;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _f8f=this.getContentWindow().bindingMap.toolbar;
var _f90=_f8f.getButtonForCommand(cmd);
if(!_f90){
throw "No button for command "+cmd;
}
return _f90;
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
var _f93=this.getContentDocument().getElementById("focusableinput");
if(_f93!=null){
_f93.style.display="block";
FocusBinding.focusElement(_f93);
_f93.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_f94){
EditorBinding.superclass.handleAction.call(this,_f94);
var _f95=_f94.target;
var self=this;
var _f97=this.shadowTree.iframe;
switch(_f94.type){
case Binding.ACTION_DIRTY:
if(_f94.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_f98){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_f98);
};
EditorBinding.prototype.handleElement=function(_f99){
return true;
};
EditorBinding.prototype.updateElement=function(_f9a){
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
this._menuGroups[rel].each(function(_f9d){
_f9d.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_f9f){
_f9f.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_fa0){
EditorPopupBinding.superclass.handleAction.call(this,_fa0);
var _fa1=_fa0.target;
if(_fa0.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_fa1.getProperty("cmd");
var gui=_fa1.getProperty("gui");
var val=_fa1.getProperty("val");
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
var _fa5=this.bindingWindow.bindingMap.tinywindow;
var _fa6=this.bindingWindow.bindingMap.codepresswindow;
if(_fa5){
EditorBinding.registerComponent(this,_fa5);
}else{
if(_fa6){
EditorBinding.registerComponent(this,_fa6);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_fa7,_fa8,_fa9,_faa){
this._editorBinding=_fa7;
this._tinyEngine=_fa8;
this._tinyInstance=_fa9;
this._tinyTheme=_faa;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_fab,_fac,_fad){
this._editorBinding=_fab;
this._codePressFrame=_fac;
this._codePressEngine=_fad;
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
var _faf=this._editorBinding;
if(_faf!=null){
var self=this;
var _fb1={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_faf.hasBookmark()){
_faf.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_faf.hasBookmark()){
_faf.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_fb1);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_fb1);
}
};
EditorClickButtonBinding.newInstance=function(_fb3){
var _fb4=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_fb3);
return UserInterface.registerBinding(_fb4,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_fb5){
var _fb6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_fb5);
return UserInterface.registerBinding(_fb6,EditorToolBarButtonBinding);
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
var _fb7=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_fb7);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_fb8,_fb9,_fba,_fbb){
this._editorBinding=_fb8;
this._tinyEngine=_fb9;
this._tinyInstance=_fba;
this._tinyTheme=_fbb;
};
EditorSelectorBinding.prototype.handleAction=function(_fbc){
EditorSelectorBinding.superclass.handleAction.call(this,_fbc);
switch(_fbc.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_fbc);
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
EditorMenuItemBinding.newInstance=function(_fbf){
var _fc0=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_fbf);
return UserInterface.registerBinding(_fc0,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_fc1){
var i=0,_fc3,_fc4="",_fc5=_fc1.split(" ");
while((_fc3=_fc5[i])!=null){
if(_fc3.length>=3&&_fc3.substring(0,3)=="mce"){
_fc3="";
}else{
if(_fc3.length>=14&&_fc3.substring(0,14)=="compositemedia"){
_fc3="";
}
}
_fc4+=_fc3;
if(_fc5[i+1]){
_fc4+=" ";
}
i++;
}
return _fc4;
};
VisualEditorBinding.getStructuredContent=function(_fc6){
var _fc7=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_fc6);
if(soap instanceof SOAPFault){
}else{
_fc7=soap.XhtmlFragment;
if(!_fc7){
_fc7="";
}
}
WebServiceProxy.isFaultHandler=true;
return _fc7;
};
VisualEditorBinding.getTinyContent=function(_fc9,_fca){
var _fcb=null;
if(_fc9==null||_fc9==""){
_fc9=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_fc9);
if(soap instanceof SOAPFault){
var _fcd=soap;
var _fce={handleDialogResponse:function(){
_fca.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_fce,_fcd);
}else{
_fcb=soap.XhtmlFragment;
if(_fcb==null){
_fcb=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _fcb;
};
VisualEditorBinding.extractByIndex=function(html,_fd0){
var _fd1=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _fd3=new List(doc.documentElement.childNodes);
var _fd4=new List();
_fd3.each(function(_fd5){
if(_fd5.nodeType==Node.ELEMENT_NODE){
_fd4.add(_fd5);
}
});
var _fd6=_fd4.get(_fd0);
if(_fd6==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_fd6.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_fd6.hasChildNodes()){
frag.appendChild(_fd6.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_fd1=DOMSerializer.serialize(doc.documentElement);
_fd1=_fd1.substring(_fd1.indexOf(">")+1,_fd1.length);
_fd1=_fd1.substring(0,_fd1.lastIndexOf("<"));
}
}
}
if(_fd1==null){
_fd1=new String("");
}
return _fd1;
};
VisualEditorBinding.isImage=function(_fd8){
result=_fd8&&_fd8.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_fd9){
return VisualEditorBinding.isImage(_fd9)&&!VisualEditorBinding.isReservedElement(_fd9);
};
VisualEditorBinding.isReservedElement=function(_fda){
if(VisualEditorBinding.isFunctionElement(_fda)){
return true;
}
if(VisualEditorBinding.isFieldElement(_fda)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_fda)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_fdb){
return VisualEditorBinding.isImage(_fdb)&&CSSUtil.hasClassName(_fdb,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_fdc){
return VisualEditorBinding.isImage(_fdc)&&CSSUtil.hasClassName(_fdc,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_fdd){
return VisualEditorBinding.isImage(_fdd)&&CSSUtil.hasClassName(_fdd,VisualEditorBinding.HTML_CLASSNAME);
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
var _fde=this.getProperty("embedablefieldstypenames");
if(_fde!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_fde);
}
var _fdf=this.getProperty("formattingconfiguration");
if(_fdf!=null){
this._url+="?config="+_fdf;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
this.subscribe(BroadcastMessages.VISUALEDITOR_HACKED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_fe0,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_fe0,arg);
var _fe2=this.getContentWindow().bindingMap.tinywindow;
var _fe3=_fe2.getContentWindow();
switch(_fe0){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_fe3){
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
if(arg.broadcastWindow==_fe3){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_fe2);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_fe4){
_fe4.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_fe5){
VisualEditorBinding.superclass._onPageInitialize.call(this,_fe5);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_fe8){
var _fe9=_fe8;
if(!this._isNormalizedDocument(_fe8)){
_fe9=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_fe8);
}
return _fe9;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_fea){
var _feb=false;
var doc=XMLParser.parse(_fea,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_feb=true;
}
}
if(Client.isWebKit){
if(_fea.indexOf("<html")!==0){
_feb=false;
}
}
return _feb;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _ff0=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_ff0){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_ff0=true;
}
return _ff0;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _ff2=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_ff2);
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
VisualEditorBinding.prototype.setValue=function(_ff3){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(_ff3);
}
}else{
if(this._startContent==null){
this._startContent=_ff3;
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
VisualEditorBinding.prototype.setResult=function(_ff4){
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
VisualEditorPopupBinding.prototype.configure=function(_ff5,_ff6,_ff7){
var _ff8=this.editorBinding.hasSelection();
this.tinyInstance=_ff5;
this.tinyEngine=_ff6;
this.tinyElement=_ff7;
this.hasSelection=_ff8;
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
var _ffc=false;
if(this.hasSelection){
_ffc=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_ffc=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_ffc=true;
}
}
}
}
if(_ffc){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _ffd=this.getMenuItemForCommand("compositeInsertLink");
var _ffe=this.getMenuItemForCommand("unlink");
var _fff=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _1000=this.editorBinding.getButtonForCommand("unlink");
_ffe.setDisabled(_1000.isDisabled);
if(_ffe.isDisabled){
_ffd.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_ffd.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _1001=this.editorBinding.embedableFieldConfiguration;
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
if(_1001){
var _1004=_1001.getGroupNames();
if(_1004.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1004.each(function(_1008){
var _1009=_1001.getFieldNames(_1008);
_1009.each(function(_100a){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_100a);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1008+":"+_100a);
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
var _100c=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _100d=null;
var _100e=null;
if(_100c){
if(_100c.nodeName=="TD"){
_100d=_100c.getAttribute("colspan");
_100e=_100c.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_100d=="1"&&_100e=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_100c){
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
VisualEditorElementClassConfiguration._configurations=new Map();
VisualEditorElementClassConfiguration.getConfiguration=function(_100f){
var _1010=VisualEditorElementClassConfiguration._configurations;
if(!_1010.has(_100f)){
_1010.set(_100f,new VisualEditorElementClassConfiguration(EditorConfigurationService.GetElementClassConfiguration(_100f)));
}
return _1010.get(_100f);
};
function VisualEditorElementClassConfiguration(doc){
this.logger=SystemLogger.getLogger("VisualEditorElementClassConfiguration");
this._elements={};
var _1012=new XPathResolver();
var _1013=_1012.resolveAll("elements/element",doc);
while(_1013.hasNext()){
var _1014=_1013.getNext();
var _1015=_1014.getAttribute("name");
this._elements[_1015]=new List();
var _1016=_1012.resolveAll("class",_1014);
while(_1016.hasNext()){
var _1017=_1016.getNext().getAttribute("name");
this._elements[_1015].add(_1017);
}
}
}
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement=function(name){
var _1019=null;
if(this._elements[name]){
_1019=this._elements[name].copy();
}else{
_1019=new List();
}
return _1019;
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_101a){
var _101b=VisualEditorFormattingConfiguration._configurations;
if(!_101b.has(_101a)){
_101b.set(_101a,new VisualEditorFormattingConfiguration());
}
return _101b.get(_101a);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_101d){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_101e){
var _101f=null;
var _1020=VisualEditorFieldGroupConfiguration._configurations;
if(!_1020.has(_101e)){
_1020.set(_101e,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_101e)));
}
return _1020.get(_101e);
};
function VisualEditorFieldGroupConfiguration(_1021){
var _1022=new Map();
new List(_1021).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_1022.set(group.GroupName,map);
});
this._groups=_1022;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1026){
return this._groups.get(_1026).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1027,_1028){
return this._groups.get(_1027).get(_1028).xhtml;
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
var _102a=this.getDescendantElementsByLocalName("textarea");
while(_102a.hasNext()){
var _102b=_102a.getNext();
if(_102b.getAttribute("selected")=="true"){
this._startContent=_102b.value;
this._textareaname=_102b.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _102d=this.getContentWindow().bindingMap.templatetree;
_102d.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_102e){
var _102f=_102d.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_102f.textareaname);
_102e.consume();
}});
_102d.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1030){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1031=this.getContentWindow().bindingMap.toolsplitter;
_1031.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1032=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1032.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1032);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1033){
this._textareas=new Map();
while(_1033.hasNext()){
var _1034=_1033.getNext();
var _1035=_1034.getAttribute("placeholderid");
this._textareas.set(_1035,{placeholderid:_1035,placeholdername:_1034.getAttribute("placeholdername"),placeholdermarkup:_1034.value,textareaelement:_1034,isSelected:_1034.getAttribute("selected")=="true"});
}
var _1036=new Map();
this._textareas.each(function(name,_1038){
var _1039=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1039.setLabel(_1038.placeholdername);
_1039.setImage("${icon:placeholder}");
_1039.setProperty("placeholder",true);
_1039.textareaname=name;
_1036.set(_1038.placeholdername,_1039);
if(_1038.isSelected){
selected=_1039;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _103a=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_103a.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _103b=this.getContentWindow().bindingMap.templatetree;
var _103c=_103b.add(TreeNodeBinding.newInstance(_103b.bindingDocument));
_103c.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_103c.setImage("${icon:warning}");
_103c.attach();
var _103d=this.getContentWindow().bindingMap.statusbar;
_103d.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _103f=this._textareas.get(name);
var _1040=_103f.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1040));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1041){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1041;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1042=this.getContentWindow().bindingMap.statusbar;
_1042.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1041);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1045="";
if(this._heads.has(this._textareaname)){
_1045=this._heads.get(this._textareaname);
if(_1045==null){
_1045=new String("");
}
}
return _1045;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1047){
_1047.textareaelement.value=_1047.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1048,_1049){
var _104a=_1048.getElementsByTagName("div").item(0);
var _104b=_1049.getElementsByTagName("div").item(0);
var _104c=new List(_104a.getElementsByTagName("textarea"));
var _104d=new List(_104b.getElementsByTagName("textarea"));
var _104e=false;
if(_104c.getLength()!=_104d.getLength()){
_104e=true;
}else{
var index=0;
_104c.each(function(_1050,index){
var _1052=_104d.get(index);
var newid=_1050.getAttribute("placeholderid");
var oldid=_1052.getAttribute("placeholderid");
var _1055=_1050.getAttribute("placeholdername");
var _1056=_1052.getAttribute("placeholdername");
if(newid!=oldid||_1055!=_1056){
_104e=true;
}
return !_104e;
});
}
if(_104e){
var html=null;
if(_104a.innerHTML!=null){
html=_104a.innerHTML;
}else{
html=DOMSerializer.serialize(_104a);
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
var _105a=this.getDescendantBindingByLocalName("selector");
_105a.attach();
this._populateTemplateSelector();
var _105b=this.getContentWindow().bindingMap.templateselector;
_105b.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _105c=this.getDescendantBindingByLocalName("selector");
var _105d=this.getContentWindow().bindingMap.templateselector;
_105c.selections.each(function(_105e){
_105e.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_105d.populateFromList(_105c.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _105f=this.getDescendantBindingByLocalName("selector");
var _1060=this.getContentWindow().bindingMap.templateselector;
_105f.selectByValue(_1060.getValue());
_105f.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_1061){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_1066,_1067){
var _1068=_1067;
if(old.has(_1066)){
_1068=old.get(_1066).placeholdermarkup;
}
return _1068;
}
while(_1061.hasNext()){
var _1069=_1061.getNext();
var _106a=_1069.getAttribute("placeholderid");
this._textareas.set(_106a,{placeholderid:_106a,placeholdername:_1069.getAttribute("placeholdername"),placeholdermarkup:compute(_106a,_1069.value),textareaelement:_1069,isSelected:_1069.getAttribute("selected")=="true"});
}
var _106b=null;
var _106c=this.getContentWindow().bindingMap.templatetree;
var _106d=new Map();
this._textareas.each(function(name,_106f){
var _1070=_106c.add(TreeNodeBinding.newInstance(_106c.bindingDocument));
_1070.setLabel(_106f.placeholdername);
_1070.setImage("${icon:placeholder}");
_1070.setProperty("placeholder",true);
_1070.textareaname=name;
_106d.set(_106f.placeholdername,_1070);
if(_106f.isSelected){
_106b=_1070;
}
});
_106c.attachRecursive();
if(_106b!=null){
var _1071=true;
if(this._oldtextareas.hasEntries()){
_1071=false;
var map=new Map();
this._textareas.each(function(id,_1074){
map.set(_1074.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_1071=true;
}
}
if(_1071){
var _1075=this._textareas.get(_106b.textareaname);
this._textareaname=_106b.textareaname;
this._placeholdername=_1075.placeholdername;
this._setContentFromPlaceHolder(_106b.textareaname);
_106b.focus();
}else{
var _1076=_106d.get(this._placeholdername);
this._textareaname=_1076.textareaname;
_1076.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_1077,_1078){
var _1079=_1077.getElementsByTagName("ui:selector").item(0);
var _107a=_1078.getElementsByTagName("ui:selector").item(0);
var _107b=false;
if(_1079!=null&&_107a!=null){
var _107c=new List(_1079.getElementsByTagName("ui:selection"));
var _107d=new List(_107a.getElementsByTagName("ui:selection"));
if(_107c.getLength()!=_107d.getLength()){
_107b=true;
}else{
_107c.each(function(_107e,index){
var _1080=_107e.getAttribute("value");
var _1081=_107d.get(index).getAttribute("value");
if(_1080!=_1081){
_107b=true;
}
return !_107b;
});
}
}
if(_107b){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_1079);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_1077,_1078);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1083,frame,_1085){
this._editorBinding=_1083;
this._codePressFrame=frame;
this._codePressEngine=_1085;
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
CodeMirrorEditorBinding.syntax={TEXT:"text",XML:"xml",XSL:"xsl",HTML:"html",CSS:"css",JAVASCRIPT:"js",CSHARP:"cs",SQL:"sql"};
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
var _108b=this.getProperty("validate");
if(_108b==true){
this._hasStrictValidation=true;
}
var _108c=this.getProperty("validator");
if(_108c!=null){
this._validator=_108c;
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
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_108d,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_108d,arg);
switch(_108d){
case BroadcastMessages.CODEMIRROR_LOADED:
var _108f=this.getContentWindow().bindingMap.codemirrorwindow;
if(_108f!=null){
var _1090=_108f.getContentWindow();
if(arg.broadcastWindow==_1090){
this._codemirrorWindow=_1090;
this._codemirrorEditor=arg.codemirrorEditor;
this._codemirrorWrapperElement=arg.codemirrorEditor.getWrapperElement();
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
this._codemirrorEditor.setOption("mode","xml");
break;
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
this._codemirrorEditor.setOption("mode","htmlmixed");
break;
case CodeMirrorEditorBinding.syntax.CSS:
this._codemirrorEditor.setOption("mode","css");
break;
case CodeMirrorEditorBinding.syntax.CSHARP:
this._codemirrorEditor.setOption("mode","clike");
break;
case CodeMirrorEditorBinding.syntax.JAVASCRIPT:
this._codemirrorEditor.setOption("mode","javascript");
break;
case CodeMirrorEditorBinding.syntax.SQL:
this._codemirrorEditor.setOption("mode","");
case CodeMirrorEditorBinding.syntax.TEXT:
this._codemirrorEditor.setOption("mode","");
break;
}
this.initializeEditorComponents(_108f);
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
this.unsubscribe(_108d);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1094){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1094);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1095){
if(_1095!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1095;
EditorBinding.isActive=_1095;
var _1096=this.getContentWindow().standardEventHandler;
if(_1095){
_1096.enableNativeKeys(true);
}else{
_1096.disableNativeKeys();
}
var _1097=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1097!=null){
if(_1095){
_1097.enable();
}else{
_1097.disable();
}
}
if(_1095){
this.focus();
var _1098=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _109c=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _109c;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_109d){
_109d.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_109f){
if(!this._isFinalized){
if(_109f!=this._startContent){
this._startContent=_109f;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_109f);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _10a0=this.getContentWindow().bindingMap.editorpage.getContent();
return _10a0?_10a0:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_10a1){
if(this._pageBinding!=null){
this._pageBinding.cover(_10a1);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_10a2){
if(_10a2!=null&&this.shadowTree.dotnetinput!=null){
var value=_10a2.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10a4=true;
var _10a5=this.getContent();
if(this._validator!=null){
_10a4=Validator.validateInformed(_10a5,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10a4=XMLParser.isWellFormedDocument(_10a5,true);
if(_10a4==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10a4=this._isValidHTML(_10a5);
break;
}
}
break;
}
}
return _10a4;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10a7=true;
var doc=XMLParser.parse(xml);
var _10a9=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10a9.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10a9.add("NamespaceURI");
}
var head=null,body=null;
var _10ad=new List(root.childNodes);
while(_10ad.hasNext()){
var child=_10ad.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10a9.add("MultipleHead");
}
if(body!=null){
_10a9.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10a9.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10a9.add("MissingHead");
}
if(body==null){
_10a9.add("MissingBody");
}
}
if(_10a9.hasEntries()){
_10a7=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10a9.getFirst()));
}
return _10a7;
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
var _10af=null;
var page=this._pageBinding;
if(page!=null){
_10af=page.getCheckSum();
}
return _10af;
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
ThrobberBinding.prototype.handleBroadcast=function(_10b1,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10b1,arg);
switch(_10b1){
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
ProgressBarBinding.notch=function(_10b4){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10b4);
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
ProgressBarBinding.prototype.notch=function(_10b6){
_10b6=_10b6?_10b6:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_10b6);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_10b8,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_10b8,arg);
switch(_10b8){
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
StartMenuItemBinding.prototype.setChecked=function(_10ba,_10bb){
StartMenuItemBinding.superclass.setChecked.call(this,_10ba,_10bb);
if(!_10bb){
if(this.isChecked){
EventBroadcaster.broadcast(BroadcastMessages.START_COMPOSITE);
}else{
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}
}
};
KeySetBinding.prototype=new Binding;
KeySetBinding.prototype.constructor=KeySetBinding;
KeySetBinding.superclass=Binding.prototype;
KeySetBinding.keyEventHandlers={};
KeySetBinding.registerKeyEventHandler=function(doc,key,_10be,_10bf){
var _10c0=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_10bf,true)==true){
if(_10be!="*"){
_10be=KeySetBinding._sanitizeKeyModifiers(_10be);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_10c0[doc]){
_10c0[doc]={};
}
if(!_10c0[doc][code]){
_10c0[doc][code]={};
}
_10c0[doc][code][_10be]=_10bf;
}
};
KeySetBinding.handleKey=function(doc,e){
var _10c4=false;
var code=e.keyCode;
var _10c6=KeySetBinding.keyEventHandlers;
if(_10c6[doc]&&_10c6[doc][code]){
var _10c7="[default]";
_10c7+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_10c7+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _10c8=_10c6[doc][code][_10c7];
if(_10c8==null){
_10c8=_10c6[doc][code]["*"];
}
if(_10c8!=null){
_10c8.handleKeyEvent(e);
_10c4=true;
}
}
return _10c4;
};
KeySetBinding._sanitizeKeyModifiers=function(_10c9){
var _10ca="[default]";
var mods={};
if(_10c9){
new List(_10c9.split(" ")).each(function(_10cc){
mods[_10cc]=true;
});
function check(_10cd){
if(mods[_10cd]){
_10ca+=" "+_10cd;
}
}
check("shift");
check("control");
}
return _10ca;
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
var _10d1=key.getAttribute("oncommand");
var _10d2=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_10d2){
DOMEvents.preventDefault(e);
}
var _10d4=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_10d1,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_10d5){
if(_10d5 instanceof CursorBinding){
_10d5.setOpacity(0);
_10d5.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10d6){
_10d5.setOpacity(Math.sin(_10d6*Math.PI/180));
},onstop:function(){
_10d5.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_10d7){
if(_10d7 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10d8){
_10d7.setOpacity(Math.cos(_10d8*Math.PI/180));
},onstop:function(){
_10d7.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_10d9,_10da,_10db){
if(_10d9 instanceof CursorBinding){
_10db.x-=16;
_10db.y-=16;
new Animation({modifier:3,onstep:function(_10dc){
var tal=Math.sin(_10dc*Math.PI/180);
_10d9.setPosition(new Point(((1-tal)*_10da.x)+((0+tal)*_10db.x),((1-tal)*_10da.y)+((0+tal)*_10db.y)));
},onstop:function(){
CursorBinding.fadeOut(_10d9);
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
CursorBinding.prototype.setOpacity=function(_10e2){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_10e2);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10e2*100)+")";
}
this._opacity=_10e2;
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
function setOpacity(_10e5){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_10e5);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10e5*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_10e6){
if(Binding.exists(cover)){
setOpacity(Math.cos(_10e6*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_10e8){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_10e8);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10e8*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_10e9){
if(Binding.exists(cover)){
setOpacity(Math.sin(_10e9*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_10eb){
if(_10eb!=this._isBusy){
if(_10eb){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_10eb;
}
};
CoverBinding.prototype.setTransparent=function(_10ec){
if(_10ec!=this._isTransparent){
if(_10ec){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_10ec;
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
CoverBinding.prototype.setHeight=function(_10ee){
if(_10ee>=0){
this.bindingElement.style.height=new String(_10ee+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_10ef){
var _10f0=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_10ef);
return UserInterface.registerBinding(_10f0,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _10f2=UncoverBinding._bindingInstance;
if(Binding.exists(_10f2)){
_10f2.setPosition(pos);
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
TheatreBinding.prototype.play=function(_10f6){
this._isFading=_10f6==true;
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
var _10f7=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_10f7.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_10f7.clearRect(0,0,300,150);
_10f7.fillRect(0,0,300,150);
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
var _10f9=this._canvas.getContext("2d");
_10f9.clearRect(0,0,300,150);
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
var _10fa=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_10fa);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _10fb=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_10fb){
this._startcontent=_10fb.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_10fc){
SourceCodeViewerBinding.superclass.handleAction.call(this,_10fc);
switch(_10fc.type){
case WindowBinding.ACTION_ONLOAD:
if(_10fc.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_10fc.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_10fc);
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
var _1100=this._transformer.transformToString(doc);
this._inject(_1100);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1103){
this.getContentDocument().body.innerHTML=_1103;
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
var _110b=list.getNext();
var id=_110b.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_110b);
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
var _1115=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1115.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1115.appendChild(att);
}
elm.appendChild(_1115);
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
var _111f=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_111f){
doc=XMLParser.parse(_111f);
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
var _1123=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1123;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1124,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1124,arg);
switch(_1124){
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
var _1127=new List();
list.each(function(lang){
_1127.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1127);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_112b){
switch(_112b){
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
var _112e=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_112e,root);
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
var _112f=this.getProperty("status");
if(_112f!=null){
switch(_112f){
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
UserInterfaceMapping.prototype.merge=function(_1132){
for(var _1133 in _1132.map){
this.map[_1133]=_1132.getBindingImplementation(_1133);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1134){
var _1135=null;
var name=_1134.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_1135=this.map[name];
}
return _1135;
};
var UserInterface=new function(){
var _1138=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1139=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1138,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _113a=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_113c,impl){
var _113e=null;
if(!this.hasBinding(_113c)){
var _113f=DOMUtil.getParentWindow(_113c);
if(DOMUtil.getLocalName(_113c)!="bindingmapping"){
if(!impl&&_113c.getAttribute("binding")!=null){
var _1140=_113c.getAttribute("binding");
impl=_113f[_1140];
if(impl==null){
throw "No such binding in scope: "+_1140;
}
}
if(!impl){
var _1141=_113f.DocumentManager;
if(_1141){
var _1142=_1141.customUserInterfaceMapping;
if(_1142){
impl=_1142.getBindingImplementation(_113c);
}
}
}
if(!impl){
impl=_1139.getBindingImplementation(_113c);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_113e=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_113e){
var key=KeyMaster.getUniqueKey();
_113c.setAttribute("key",key);
_113e.key=key;
if(!_113c.id){
_113c.id=key;
}
keys[key]={element:_113c,binding:_113e};
_113e.onBindingRegister();
}
}
}
return _113e;
};
this.unRegisterBinding=function(_1144){
terminate(_1144);
};
function terminate(_1145){
if(Binding.exists(_1145)==true){
var key=_1145.key;
Binding.destroy(_1145);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1145=null;
}else{
_113a.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1147){
var _1148=null;
if(keys[_1147.key]){
_1148=keys[_1147.key].element;
}
return _1148;
};
this.getBinding=function(_1149){
var _114a=null;
if(_1149&&_1149.nodeType==Node.ELEMENT_NODE){
try{
var key=_1149.getAttribute("key");
if(key&&keys[key]){
_114a=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1149);
if(exception.stack){
alert(exception.stack);
}
}
}
return _114a;
};
this.getBindingByKey=function(key){
var _114d=null;
if(keys[key]){
_114d=keys[key].binding;
}
return _114d;
};
this.hasBinding=function(_114e){
return this.getBinding(_114e)!=null;
};
this.isBindingVisible=function(_114f){
var _1150=Application.isOperational;
if(_1150==true){
var _1151=new Crawler();
_1151.type=NodeCrawler.TYPE_ASCENDING;
_1151.id="visibilitycrawler";
_1151.addFilter(function(_1152){
var b=UserInterface.getBinding(_1152);
var res=0;
if(!b.isVisible){
_1150=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_1151.crawl(_114f.bindingElement);
_1151.dispose();
}
return _1150;
};
var _1155=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_1155={};
for(var key in keys){
_1155[key]=true;
}
};
this.getPoint=function(){
var _1159=null;
if(_1155){
_1159=new List();
for(var key in keys){
if(!_1155[key]){
_1159.add(key);
}
}
}
return _1159;
};
this.clearPoint=function(){
_1155=null;
};
this.trackUndisposedBindings=function(){
var _115b=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_115b){
_115b="Bindings illdisposed: ";
}
_115b+=entry.binding+" ";
}
}
if(_115b!=null){
_113a.error(_115b);
}
};
this.autoTrackDisposedBindings=function(_115e){
if(_115e){
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
SOAPRequest.newInstance=function(_115f,_1160){
var _1161=_115f+"/"+_1160;
var _1162=new SOAPRequest(_1161);
var _1163=SOAPRequest.resolver;
_1162.document=Templates.getTemplateDocument("soapenvelope.xml");
_1162.envelope=_1163.resolve("soap:Envelope",_1162.document);
_1162.header=_1163.resolve("soap:Header",_1162.envelope);
_1162.body=_1163.resolve("soap:Body",_1162.envelope);
return _1162;
};
SOAPRequest._parseResponse=function(_1164){
var _1165=null;
var _1166=false;
var doc=_1164.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1165=SOAPRequestResponse.newInstance(_1164.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1164.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1166=true;
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
var text=_1164.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_1166=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1164.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1164.responseText);
}
}
}
}
if(_1166==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1165;
};
function SOAPRequest(_116b){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_116b;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _116d=DOMUtil.getXMLHTTPRequest();
var _116e=null;
_116d.open("post",url,false);
_116d.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_116d.setRequestHeader("SOAPAction",this.action);
try{
_116d.send(this.document);
_116e=SOAPRequest._parseResponse(_116d);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_116d=null;
return _116e;
};
SOAPRequest.prototype.dispose=function(){
for(var _1170 in this){
this[_1170]=null;
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
var _1172=null;
if(doc&&doc.documentElement){
_1172=new SOAPRequestResponse();
var _1173=SOAPRequestResponse.resolver;
_1172.document=doc;
_1172.envelope=_1173.resolve("soap:Envelope",_1172.document);
_1172.header=_1173.resolve("soap:Header",_1172.envelope);
_1172.body=_1173.resolve("soap:Body",_1172.envelope);
var fault=_1173.resolve("soap:Fault",_1172.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1172.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1173.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1173.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1172;
};
function SOAPFault(_1175,_1176,_1177){
this._operationName=_1175;
this._operationAddress=_1176;
this._faultString=_1177;
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
SOAPFault.newInstance=function(_1178,fault){
return new SOAPFault(_1178.name,_1178.address,fault.faultString);
};
function SOAPEncoder(wsdl,_117b){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_117b;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _117d=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_117d.body,this._operation);
var _117f=this._wsdl.getSchema();
var _1180=_117f.lookup(this._operation);
var _1181=_1180.getListedDefinitions();
while(_1181.hasNext()){
var def=_1181.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _117d;
};
SOAPEncoder.prototype._resolve=function(_1185,_1186,value){
var _1188=this._wsdl.getSchema();
if(_1186.isSimpleValue){
this._appendText(_1185,value,_1186.type=="string");
}else{
var _1189=_1188.lookup(_1186.type);
if(_1189 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1189.getListedDefinitions();
if(_1189.isArray){
var _118b=new List(value);
var def=defs.getNext();
while(_118b.hasNext()){
var elm=this._appendElement(_1185,def.name);
var val=_118b.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1185,def.name);
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
SOAPEncoder.prototype._appendText=function(_1192,value,_1194){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1197=false;
var i=0,c;
while(c=chars[i++]){
var _119a=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_119a=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_119a=false;
}
break;
}
if(!_119a){
safe+=c;
}else{
_1197=true;
}
}
if(_1197){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1192.appendChild(_1192.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_119d){
this._wsdl=wsdl;
this._operation=_119d;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_11a2){
var _11a3=null;
var _11a4=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11a6=this.resolve(id,_11a2.body);
var _11a7=_11a4.lookup(id);
var _11a8=_11a7.getListedDefinitions();
while(!_11a3&&_11a8.hasNext()){
var def=_11a8.getNext();
var elm=this.resolve(def.name,_11a6);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11a3=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11a3.importNode!=Types.UNDEFINED){
_11a3.appendChild(_11a3.importNode(e,true));
}else{
_11a3.loadXML(DOMSerializer.serialize(e));
}
}else{
_11a3=this._compute(elm,def);
}
}
return _11a3;
};
SOAPDecoder.prototype._compute=function(_11ac,_11ad){
var _11ae=null;
var _11af=this._wsdl.getSchema();
if(_11ad.isSimpleValue){
_11ae=this._getSimpleValue(_11ac,_11ad.type);
}else{
var _11b0=_11af.lookup(_11ad.type);
if(_11b0 instanceof SchemaSimpleType){
_11ae=this._getSimpleValue(_11ac,_11b0.restrictionType);
}else{
var defs=_11b0.getListedDefinitions();
if(_11b0.isArray){
_11ae=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11ac);
while(elms.hasNext()){
var elm=elms.getNext();
_11ae.push(this._compute(elm,def));
}
}else{
_11ae={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11ac);
if(elm){
_11ae[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11ae;
};
SOAPDecoder.prototype._getSimpleValue=function(_11b5,type){
var _11b7=null;
if(_11b5.firstChild&&_11b5.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_11b5.childNodes.length>1){
_11b5.normalize();
}
_11b7=_11b5.firstChild.data;
switch(type){
case Schema.types.STRING:
_11b7=_11b7;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_11b7=Number(_11b7);
break;
case Schema.types.BOOLEAN:
_11b7=_11b7=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _11b7;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_11b8){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_11b8);
}
Schema.prototype._parseSchema=function(_11b9){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _11ba={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_11b9);
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
_11ba[rule.getAttribute("name")]=entry;
}
return _11ba;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_11bf){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_11bf);
}
SchemaDefinition.prototype._parse=function(_11c0){
var min=_11c0.getAttribute("minOccurs");
var max=_11c0.getAttribute("maxOccurs");
var type=_11c0.getAttribute("type");
this.name=_11c0.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _11c6=split[1];
this.isSimpleValue=sort!="tns";
this.type=_11c6;
}else{
var elm=_11c0.getElementsByTagName("*").item(0);
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
function SchemaElementType(_11c8,_11c9){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_11c8,_11c9);
}
SchemaElementType.prototype._parseListedDefinitions=function(_11ca,_11cb){
var els=_11ca.resolveAll("s:complexType/s:sequence/s:element",_11cb);
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
function SchemaComplexType(_11cd,_11ce){
this._definitions=new List();
this._parseListedDefinitions(_11cd,_11ce);
this.isArray=_11ce.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_11cf,_11d0){
var els=_11cf.resolveAll("s:sequence/s:element",_11d0);
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
function SchemaSimpleType(_11d3,_11d4){
this.restrictionType=null;
this._parse(_11d3,_11d4);
}
SchemaSimpleType.prototype._parse=function(_11d5,_11d6){
var _11d7=_11d5.resolve("s:restriction",_11d6);
if(_11d7){
this.restrictionType=_11d7.getAttribute("base").split(":")[1];
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
var _11da=null;
var _11db=DOMUtil.getXMLHTTPRequest();
_11db.open("get",url,false);
_11db.send(null);
if(_11db.responseXML){
_11da=_11db.responseXML.documentElement;
}else{
alert(_11db.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _11da;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _11dc=new List();
var _11dd=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_11dd.hasEntries()){
while(_11dd.hasNext()){
var _11de=_11dd.getNext();
var name=_11de.getAttribute("name");
_11dc.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _11dc;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_11e1,_11e2,_11e3){
this.name=name;
this.address=_11e1;
this.encoder=_11e2;
this.decoder=_11e3;
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
var _11e7=wsdl.getOperations();
_11e7.each(function(_11e8){
proxy[_11e8.name]=WebServiceProxy.createProxyOperation(_11e8);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_11e9,_11ea){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_11ea){
var log=_11ea instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_11e9.address+": "+_11e9.name+"\n\n";
log+=DOMSerializer.serialize(_11ea.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_11ec){
return function(){
var _11ed=null,_11ee=_11ec.encoder.encode(new List(arguments));
this._log(_11ec,_11ee);
var _11ef=_11ee.invoke(_11ec.address);
this._log(_11ec,_11ef);
if(_11ef){
if(_11ef.fault){
_11ed=SOAPFault.newInstance(_11ec,_11ef.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_11ed,_11ee,_11ef);
}
}else{
if(WebServiceProxy.isDOMResult){
_11ed=_11ef.document;
}else{
_11ed=_11ec.decoder.decode(_11ef);
}
}
}
_11ee.dispose();
return _11ed;
};
};
WebServiceProxy.handleFault=function(_11f0,_11f1,_11f2){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_11f0,soapRequest:_11f1,soapResponse:_11f2});
}
catch(exception){
alert(_11f0.getFaultString());
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
this.INTERVAL_ONLINE=15*1000;
this.INTERVAL_OFFLINE=4*1000;
this._actions=new List();
this._index={};
this.index=0;
var _11f3=SystemLogger.getLogger("MessageQueue");
var _11f4=null;
var _11f5=0;
var _11f6=null;
var _11f7=new Map();
var _11f8=new Map();
var _11f9=false;
var _11fa=false;
var _11fb={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_11f4=ConsoleMessageQueueService;
_11f5=_11f4.GetCurrentSequenceNumber("dummyparam!");
this.index=_11f5;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_11f9){
if(!MessageQueue._actions.hasEntries()){
var _11fc=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_11fa=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_11fc;
_11fa=false;
}
}
}
};
this._pokeserver=function(){
if(_11f9==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_11fa);
var _11fd=_11f4.GetMessages(Application.CONSOLE_ID,this.index);
if(_11fd!=null){
if(Types.isDefined(_11fd.CurrentSequenceNumber)){
var _11fe=_11fd.CurrentSequenceNumber;
if(_11fe<this.index){
_11f3.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_11fe);
}
this.index=_11fe;
var _11ff=new List(_11fd.ConsoleActions);
if(_11ff.hasEntries()){
this.evaluate(_11ff);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_11f3.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_1200){
var _1201=new List();
if(_1200.hasEntries()){
_1200.each(function(_1202){
if(this._index[_1202.Id]!=true){
_1201.add(_1202);
}
this._index[_1202.Id]=true;
},this);
if(_1201.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_1201);
}else{
this._actions=_1201;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1203){
var _1204="(No reason)";
if(_1203!=null){
_1204=_1203.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1204);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1208){
if(_1208==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1209=null;
if(this._actions.hasEntries()){
var _120a=this._actions.extractFirst();
_11f5=_120a.SequenceNumber;
_11f3.debug("MessageQueue action: "+_120a.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_11f5+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_120a.ActionType){
case "OpenView":
_1209=_120a.OpenViewParams;
if(_1209.ViewType=="ModalDialog"){
openDialogView(_1209);
}else{
_11f6=_1209.ViewId;
openView(_1209);
}
break;
case "CloseView":
_1209=_120a.CloseViewParams;
_11f6=_1209.ViewId;
closeView(_1209);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_120a.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_11f7.countEntries()+"\n";
_11f7.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_11f3.debug(debug);
if(!_11f7.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_120a.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_120a.MessageBoxParams);
break;
case "OpenViewDefinition":
_1209=_120a.OpenViewDefinitionParams;
_11f6=_1209.Handle;
openViewDefinition(_1209);
break;
case "LogEntry":
logEntry(_120a.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1209=_120a.BroadcastMessageParams;
_11f3.debug("Server says: EventBroadcaster.broadcast ( \""+_1209.Name+"\", "+_1209.Value+" )");
EventBroadcaster.broadcast(_1209.Name,_1209.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_11f7.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_120a.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_120a.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_120a.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1209=_120a.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1209.ViewId,entityToken:_1209.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1209=_120a.OpenGenericViewParams;
openGenericView(_1209);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_120a.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_11fa);
}
function logEntry(_120d){
var _120e=_120d.Level.toLowerCase();
SystemLogger.getLogger(_120d.SenderId)[_120e](_120d.Message);
}
function openView(_120f){
var list=paramsToList(_120f.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_120f.ViewId);
def.entityToken=_120f.EntityToken;
def.flowHandle=_120f.FlowHandle;
def.position=_11fb[_120f.ViewType],def.label=_120f.Label;
def.image=_120f.Image;
def.toolTip=_120f.ToolTip;
def.argument={"url":_120f.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_120f.ViewId,entityToken:_120f.EntityToken,flowHandle:_120f.FlowHandle,position:_11fb[_120f.ViewType],url:_120f.Url,label:_120f.Label,image:_120f.Image,toolTip:_120f.ToolTip}));
}
}
function openDialogView(_1212){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1212.ViewId,flowHandle:_1212.FlowHandle,position:Dialog.MODAL,url:_1212.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1213){
var _1214=_1213.DialogType.toLowerCase();
if(_1214=="question"){
throw "Not supported!";
}else{
Dialog[_1214](_1213.Title,_1213.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_1215){
var map={};
var _1217=false;
new List(_1215.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1217=true;
});
var proto=ViewDefinitions[_1215.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1215.ViewId;
}
def.argument=_1217?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_121c){
var def=ViewBinding.clone("Composite.Management.GenericView",_121c.ViewId);
def.label=_121c.Label;
def.toolTip=_121c.ToolTip;
def.image=_121c.Image;
def.argument={"url":_121c.Url,"list":paramsToList(_121c.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_121e){
if(StageBinding.isViewOpen(_121e.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_121e.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_121f){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_121f.ViewId,isSuccess:_121f.Succeeded});
}
this._lockSystem=function(_1220){
var _1221=top.bindingMap.offlinetheatre;
if(_1220){
_1221.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1221.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_11f9=_1220;
};
this.handleBroadcast=function(_1223,arg){
switch(_1223){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_11f6!=null&&arg==_11f6){
_11f6=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_11f7.set(arg,true);
}else{
_11f3.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_11f7.hasEntries()){
_11f7.del(arg);
_11f3.debug("Refreshed tree: "+arg+"\n("+_11f7.countEntries()+" trees left!)");
if(!_11f7.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_11f8.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_11f8.hasEntries()==true){
_11f8.del(arg);
if(!_11f8.hasEntries()){
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
function paramsToList(_1225){
var list=new List();
new List(_1225).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.XhtmlDocument"}]}})};
var KickStart=new function(){
var _1228=false;
var _1229=false;
var _122a=null;
var _122b=false;
var _122c=Client.qualifies();
var _122d="admin";
var _122e="123456";
this.fireOnLoad=function(){
if(_122c){
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
this.handleBroadcast=function(_122f){
switch(_122f){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_122f);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1230=window.bindingMap.appwindow;
_1230.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1231){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1232){
if(_1231){
EventBroadcaster.subscribe(_1232,KickStart);
}else{
EventBroadcaster.unsubscribe(_1232,KickStart);
}
});
}
function kickStart(_1233){
switch(_1233){
case BroadcastMessages.AUDIO_INITIALIZED:
_1229=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1228=true;
break;
}
if(_1228&&_1229){
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
DataManager.getDataBinding("username").setValue(_122d);
DataManager.getDataBinding("password").setValue(_122e);
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
this.doLogin=function(_1236,_1237){
var _1238=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1239=false;
var _123a=LoginService.ValidateAndLogin(_1236,_1237);
if(_123a instanceof SOAPFault){
alert(_123a.getFaultString());
}else{
_1239=_123a;
}
if(_1239){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1238){
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
var _123b=DataManager.getDataBinding("username");
var _123c=DataManager.getDataBinding("password");
_123b.blur();
_123c.blur();
_123b.setValue("");
_123c.setValue("");
_123b.clean();
_123c.clean();
_123b.focus();
document.getElementById("loginerror").style.display="block";
var _123d={handleAction:function(_123e){
document.getElementById("loginerror").style.display="none";
_123e.target.removeActionListener(Binding.ACTION_DIRTY,_123d);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_123d);
}
WindowManager.fireOnLoad(this);
if(!_122c){
UpdateManager.isEnabled=false;
}
};

